/* ==========================================================================
   Theme engine: the token compiler
   Turns the token tiers (W3C DTCG JSON) into the library's CSS custom
   properties: variables.css, with fluid type and spacing three ways (clamp(),
   progress(), @function), the shadow functions, the inverted palette and the
   high-contrast and other conditional blocks. Pure: it reads and writes no
   files, so it runs in Node (bin/build-tokens.js) and in the browser.
   ========================================================================== */

/**
 * Resolves token references inside any string expression.
 * E.g., "{color.neutral.000}" -> "var(--color-neutral-100)"
 * Or "light-dark({color.muted.100}, {color.muted.900})" -> "light-dark(var(--color-muted-100), var(--color-muted-900))"
 */
function resolveReferences(val) {
  if (typeof val !== 'string') return val;
  return val.replace(/\{([^}]+)\}/g, (_, match) => {
    let varName = match.replace(/\./g, '-').replace(/minus-(\d+)/g, '-$1');
    if (varName.startsWith('fluid-typography-font-size-')) {
      varName = varName.replace('fluid-typography-font-size-', 'typography-font-size-fluid-');
    }
    return `var(--${varName})`;
  });
}

const FONT_WEIGHT_CSS_MAP = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
  black: '900'
};

/**
 * Look up token value in globalTokens by dot-path or {dot-path}.
 */
function lookupGlobalToken(globalTokens, ref) {
  if (!globalTokens || typeof ref !== 'string') return null;
  let cleanRef = ref.replace(/[{}]/g, '');
  if (cleanRef.startsWith('global.')) cleanRef = cleanRef.slice('global.'.length);
  const parts = cleanRef.split('.');
  let current = globalTokens.global || globalTokens;
  for (let i = 0; i < parts.length; i++) {
    if (!current || typeof current !== 'object') return null;
    let part = parts[i];
    if (current[part] === undefined) {
      if (part.startsWith('minus-')) {
        const alt = `-${part.slice('minus-'.length)}`;
        if (current[alt] !== undefined) part = alt;
      } else if (part.startsWith('-')) {
        const alt = `minus-${part.slice(1)}`;
        if (current[alt] !== undefined) part = alt;
      }
    }
    const remaining = parts.slice(i).join('.');
    if (current[remaining] !== undefined) {
      current = current[remaining];
      break;
    }
    if (i + 1 < parts.length && current[`${parts[i]}.${parts[i + 1]}`] !== undefined) {
      current = current[`${parts[i]}.${parts[i + 1]}`];
      i++;
      continue;
    }
    if (i + 1 < parts.length && current[`${parts[i]}-${parts[i + 1]}`] !== undefined) {
      current = current[`${parts[i]}-${parts[i + 1]}`];
      i++;
      continue;
    }
    current = current[part];
  }
  if (current && typeof current === 'object') {
    const val = current.$value !== undefined ? current.$value : current.value;
    if (typeof val === 'string' && val.startsWith('{') && val.endsWith('}')) {
      return lookupGlobalToken(globalTokens, val);
    }
    return val;
  }
  return current;
}

/**
 * Resolves fluid(min, max) expressions into responsive clamp() CSS calculations.
 * Supports rem, px, and token references: e.g. fluid({spacing.1}, 1.333rem)
 */
/**
 * The fluid range: where fluid type starts and stops growing, in rem.
 * Read from typography.fluid-scale.min-viewport / max-viewport (written by
 * the type engine), 25rem (400px) to 80rem (1280px) when they are absent.
 */
function fluidViewports(globalTokens) {
  const scale = globalTokens?.typography?.['fluid-scale'] || {};
  const toRem = (node, fallback) => {
    const v = String(node?.$value ?? '').trim();
    if (v.endsWith('rem')) return parseFloat(v);
    if (v.endsWith('px')) return parseFloat(v) / 16;
    return fallback;
  };
  return { minVpRem: toRem(scale['min-viewport'], 25), maxVpRem: toRem(scale['max-viewport'], 80) };
}

function compileFluidValue(val, globalTokens = null) {
  if (typeof val !== 'string') return val;
  const trimmed = val.trim();
  if (!trimmed.startsWith('fluid(') || !trimmed.endsWith(')')) return val;

  const inner = trimmed.slice('fluid('.length, -1);
  let depth = 0;
  let splitIndex = -1;
  for (let i = 0; i < inner.length; i++) {
    const c = inner[i];
    if (c === '(') depth++;
    else if (c === ')') depth--;
    else if (c === ',' && depth === 0) {
      splitIndex = i;
      break;
    }
  }
  if (splitIndex === -1) return val;

  const minStr = inner.slice(0, splitIndex).trim();
  const maxStr = inner.slice(splitIndex + 1).trim();

  function resolveToRem(s, targetMode = 'min') {
    if (typeof s === 'number') return s;
    let str = String(s).trim();
    if (str.startsWith('{') && str.endsWith('}') && globalTokens) {
      const cleanRef = str.slice(1, -1);
      const lookedUp = lookupGlobalToken(globalTokens, cleanRef);
      if (lookedUp) return resolveToRem(lookedUp, targetMode);
    }
    if (str.startsWith('fluid(') && str.endsWith(')')) {
      const innerFluid = str.slice(6, -1);
      const parts = innerFluid.split(',').map(p => p.trim());
      const chosen = targetMode === 'max' ? parts[1] || parts[0] : parts[0];
      return resolveToRem(chosen, targetMode);
    }
    if (str.endsWith('rem')) return parseFloat(str);
    if (str.endsWith('px')) return parseFloat(str) / 16;
    const n = parseFloat(str);
    return isNaN(n) ? 1 : n;
  }

  const minRem = resolveToRem(minStr, 'min');
  const maxRem = resolveToRem(maxStr, 'max');

  const { minVpRem, maxVpRem } = fluidViewports(globalTokens);
  const vpDiffRem = maxVpRem - minVpRem;

  const slope = (maxRem - minRem) / vpDiffRem;
  const viSlope = +(slope * 100).toFixed(2);
  const intersection = +(minRem - minVpRem * slope).toFixed(2);

  return `clamp(${minRem}rem, ${intersection}rem + ${viSlope}vi, ${maxRem}rem)`;
}

/**
 * The inverted palette (.color-palette-inverted): every Tier 2 surface,
 * foreground and border colour written as light-dark(a, b) swaps to
 * light-dark(b, a), so an inverted region takes the other mode's colours.
 * Filled from 2-semantic.json by buildInvertedRoles().
 */
const invertedTier2Vars = [];
/* The same swap for the high-contrast roles, so an inverted region keeps them */
const invertedContrastVars = [];

/* Splits light-dark(a, b) at its top-level comma; null for any other value */
function splitLightDark(val) {
  const m = /^light-dark\((.*)\)$/s.exec(val.trim());
  if (!m) return null;
  let depth = 0;
  for (let i = 0; i < m[1].length; i++) {
    const ch = m[1][i];
    if (ch === '(') depth++;
    else if (ch === ')') depth--;
    else if (ch === ',' && depth === 0) return [m[1].slice(0, i).trim(), m[1].slice(i + 1).trim()];
  }
  return null;
}

function buildInvertedRoles(semanticJson, into = invertedTier2Vars) {
  const walk = (obj, path) => {
    for (const [key, value] of Object.entries(obj)) {
      if (key.startsWith('$') || !value || typeof value !== 'object') continue;
      const next = [...path, key];
      if (!('$value' in value)) {
        walk(value, next);
        continue;
      }
      const parts = typeof value.$value === 'string' ? splitLightDark(value.$value) : null;
      if (!parts) continue;
      const css = resolveReferences(`light-dark(${parts[1]}, ${parts[0]})`);
      const name = next.join('-').replace(/-default$/, '');
      into.push(`  --${name}: ${css};`);
    }
  };
  for (const group of ['surface', 'foreground']) if (semanticJson?.[group]) walk(semanticJson[group], [group]);
  if (semanticJson?.border?.color) walk(semanticJson.border.color, ['border', 'color']);
}

/**
 * Recursively flattens nested token objects into CSS variable paths.
 * E.g., { color: { surface: { value: '#ffffff' } } } -> --color-surface: #ffffff;
 */
function flattenTokens(obj, prefix = '', globalTokens = null) {
  let cssVariables = [];

  for (const [key, value] of Object.entries(obj)) {
    // Skip metadata keys or non-token properties ($type, $description, $media, $supports)
    if (key.startsWith('$')) continue;

    const safeKey = key.replace(/\./g, '-');
    let name = prefix ? `${prefix}-${safeKey}` : safeKey;
    name = name.replace(/minus-(\d+)/g, '-$1');

    if (value && typeof value === 'object' && ('$value' in value || 'value' in value)) {
      // This is a token leaf node (supports W3C DTCG $value and legacy value)
      const rawVal = value.$value !== undefined ? value.$value : value.value;
      const baseName = (name.includes('-default-') || name.endsWith('-default'))
        ? name.replace(/-default-/, '-').replace(/-default$/, '')
        : name;

      let tokenVal = rawVal;
      if (typeof rawVal === 'string' && rawVal.trim().startsWith('fluid(') && rawVal.trim().endsWith(')')) {
        tokenVal = compileFluidValue(rawVal, globalTokens);
      } else if (Array.isArray(rawVal) && rawVal.length > 0 && typeof rawVal[0] === 'object') {
        const isShadowPreset = baseName.startsWith('shadow-');
        const isLightShadow = baseName.endsWith('-light') && isShadowPreset;
        const shadowPresetName = isShadowPreset
          ? (isLightShadow ? baseName.replace(/^shadow-/, '').replace(/-light$/, '') : baseName.replace(/^shadow-/, ''))
          : '';
        const isSupportedPreset = ['sm', 'md', 'lg', 'inner'].includes(shadowPresetName);

        if (isSupportedPreset) {
          const colorVar = isLightShadow ? 'var(--shadow-color-light)' : 'var(--shadow-color)';
          tokenVal = '\n    ' + rawVal.map((_, idx) => `var(--_shadow-${shadowPresetName}-layer-${idx + 1}) ${colorVar}`).join(',\n    ');
        } else {
          const formatShadowLayer = (layer) => {
            if (typeof layer === 'string') return resolveReferences(layer);
            if (!layer || typeof layer !== 'object') return '';
            const isInset = layer.type === 'innerShadow' || layer.inset;
            const x = layer.x || '0';
            const y = layer.y || '0';
            const blur = layer.blur || '0';
            const spread = layer.spread || '0';
            const col = resolveReferences(layer.color || '{shadow.color}');
            return `${isInset ? 'inset ' : ''}${x} ${y} ${blur} ${spread} ${col}`.trim();
          };
          tokenVal = '\n    ' + rawVal.map(formatShadowLayer).join(',\n    ');
        }
      } else if (rawVal && typeof rawVal === 'object' && ('x' in rawVal || 'y' in rawVal || 'blur' in rawVal)) {
        const isInset = rawVal.type === 'innerShadow' || rawVal.inset;
        const x = rawVal.x || '0';
        const y = rawVal.y || '0';
        const blur = rawVal.blur || '0';
        const spread = rawVal.spread || '0';
        const col = resolveReferences(rawVal.color || '{shadow.color}');
        tokenVal = `${isInset ? 'inset ' : ''}${x} ${y} ${blur} ${spread} ${col}`.trim();
      } else {
        tokenVal = resolveReferences(rawVal);
      }
      // Map named font-weight strings (Regular, Bold, etc.) to valid CSS numeric weights
      if (name.includes('font-weight') && typeof rawVal === 'string' && FONT_WEIGHT_CSS_MAP[rawVal.trim().toLowerCase()]) {
        tokenVal = FONT_WEIGHT_CSS_MAP[rawVal.trim().toLowerCase()];
      }

      cssVariables.push(`  --${baseName}: ${tokenVal};`);
    } else if (value && typeof value === 'object') {
      // Recurse deeper into nested categories
      cssVariables = cssVariables.concat(flattenTokens(value, name, globalTokens));
    }
  }

  return cssVariables;
}

/**
 * Extracts conditional media/supports query blocks from tokens ($media, $supports).
 */
function extractConditionals(json) {
  const conditionals = [];
  if (json && typeof json === 'object') {
    if (json.$media) {
      for (const [query, tokens] of Object.entries(json.$media)) {
        conditionals.push({
          type: 'media',
          condition: query,
          variables: flattenTokens(tokens)
        });
      }
    }
    if (json.$supports) {
      for (const [query, tokens] of Object.entries(json.$supports)) {
        conditionals.push({
          type: 'supports',
          condition: query,
          variables: flattenTokens(tokens)
        });
      }
    }
  }
  return conditionals;
}

/**
 * Generates fluid clamp fallbacks and progressive enhancement progress() rules
 * based on fluid parameters.
 */
function parseStepKey(key) {
  if (typeof key !== 'string') return null;
  const normalized = key.replace(/minus-(\d+)/g, '-$1');
  const compoundMatch = normalized.match(/^(-?\d+)-(-?\d+)$/);
  if (compoundMatch) {
    return {
      isCompound: true,
      minStep: parseInt(compoundMatch[1], 10),
      maxStep: parseInt(compoundMatch[2], 10),
      stepKey: key
    };
  }
  const singleMatch = normalized.match(/^(-?\d+)$/);
  if (singleMatch) {
    const s = parseInt(singleMatch[1], 10);
    return {
      isCompound: false,
      minStep: s,
      maxStep: s,
      stepKey: key
    };
  }
  return null;
}

/**
 * Automatically recalculates 1-global.json typography font sizes and fluid values
 * whenever typography.ratio, typography.font-size-base, or fluid-scale ratios are defined or modified.
 */
function syncGlobalTypographyScale(globalJson, log) {
  if (!globalJson || !globalJson.typography) return null;
  const typo = globalJson.typography;

  const baseRem = parseFloat(typo['font-size-base']?.$value || typo['font-size-base']?.value || '1rem') || 1.0;
  const ratio = parseFloat(typo.ratio?.$value !== undefined ? typo.ratio.$value : typo.ratio?.value !== undefined ? typo.ratio.value : 1.25) || 1.25;

  const fluidScale = typo['fluid-scale'] || {};
  const mobileBase = parseFloat(fluidScale['mobile-base']?.$value || fluidScale['mobile-base']?.value || '1rem') || 1.0;
  const mobileRatio = parseFloat(fluidScale['mobile-ratio']?.$value !== undefined ? fluidScale['mobile-ratio'].$value : 1.2) || 1.2;
  const desktopBase = parseFloat(fluidScale['desktop-base']?.$value || fluidScale['desktop-base']?.value || '1.5rem') || 1.5;
  const desktopRatio = parseFloat(fluidScale['desktop-ratio']?.$value !== undefined ? fluidScale['desktop-ratio'].$value : 1.25) || 1.25;
  // The smallest a step may be: smaller steps are raised to it (0: no minimum)
  const minRem = parseFloat(typo['font-size-min']?.$value || '0') || 0;
  // The ceilings: the largest a size may be at the small end and at the
  // large end (no token: no ceiling)
  const maxSmallRem = parseFloat(typo['font-size-max-small']?.$value) || Infinity;
  const maxLargeRem = parseFloat(typo['font-size-max-large']?.$value) || Infinity;

  let changed = false;

  // 1. Recalculate static font-size steps: -2 through 8
  if (!typo['font-size']) typo['font-size'] = { $type: 'dimension' };
  const steps = [-2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8];

  steps.forEach(step => {
    const key = step < 0 ? `minus-${Math.abs(step)}` : `${step}`;
    const calculatedRem = +Math.min(maxSmallRem, Math.max(minRem, baseRem * Math.pow(ratio, step))).toFixed(4);
    const expectedVal = `${calculatedRem}rem`;

    if (!typo['font-size'][key]) {
      typo['font-size'][key] = { $value: expectedVal };
      changed = true;
    } else {
      const currentVal = typo['font-size'][key].$value !== undefined ? typo['font-size'][key].$value : typo['font-size'][key].value;
      if (currentVal !== expectedVal) {
        if (typo['font-size'][key].$value !== undefined) typo['font-size'][key].$value = expectedVal;
        else typo['font-size'][key].value = expectedVal;
        changed = true;
      }
    }
  });

  // 2. Recalculate global fluid.typography.font-size base steps: -2 through 8
  if (!globalJson.fluid) globalJson.fluid = {};
  if (!globalJson.fluid.typography) globalJson.fluid.typography = {};
  if (!globalJson.fluid.typography['font-size']) globalJson.fluid.typography['font-size'] = { $type: 'dimension' };

  steps.forEach(step => {
    const key = step < 0 ? `minus-${Math.abs(step)}` : `${step}`;
    const lowRem = +Math.min(maxSmallRem, Math.max(minRem, mobileBase * Math.pow(mobileRatio, step))).toFixed(4);
    const highRem = +Math.min(maxLargeRem, Math.max(minRem, desktopBase * Math.pow(desktopRatio, step))).toFixed(4);
    const expectedVal = `fluid(${lowRem}rem, ${highRem}rem)`;
    const expectedDesc = `Fluid font size step ${step} (${lowRem}rem / ${Math.round(lowRem * 16)}px Mobile to ${highRem}rem / ${Math.round(highRem * 16)}px Desktop)`;

    const existing = globalJson.fluid.typography['font-size'][key];
    if (!existing) {
      globalJson.fluid.typography['font-size'][key] = {
        $value: expectedVal,
        $description: expectedDesc
      };
      changed = true;
    } else {
      const currentVal = existing.$value !== undefined ? existing.$value : existing.value;
      if (currentVal !== expectedVal) {
        if (existing.$value !== undefined) existing.$value = expectedVal;
        else existing.value = expectedVal;
        existing.$description = expectedDesc;
        changed = true;
      }
    }
  });

  if (changed) log(`✨ Recalculated 1-global.json font sizes (ratio: ${ratio}, mobile: ${mobileRatio}, desktop: ${desktopRatio})`);

  return {
    changed,
    baseRem,
    ratio,
    mobileBase,
    mobileRatio,
    desktopBase,
    desktopRatio,
    minRem,
    maxSmallRem,
    maxLargeRem
  };
}

/**
 * Recursively scans token objects to find any fluid step references like:
 * {fluid.typography.font-size.2-4} or {typography.font-size.cq.4-7}
 */
function discoverFluidStepReferences(tokenObjects) {
  const referencedSteps = new Set();
  const pattern = /\{(?:fluid\.typography\.font-size|typography\.font-size\.cq|typography\.font-size\.fluid)\.([a-zA-Z0-9_-]+)\}/g;

  function scan(val) {
    if (typeof val === 'string') {
      let m;
      while ((m = pattern.exec(val)) !== null) {
        referencedSteps.add(m[1]);
      }
    } else if (Array.isArray(val)) {
      val.forEach(scan);
    } else if (val && typeof val === 'object') {
      for (const k of Object.keys(val)) {
        if (k.startsWith('$') && k !== '$value') continue;
        scan(val[k]);
      }
    }
  }

  tokenObjects.forEach(obj => {
    if (obj) scan(obj);
  });

  return referencedSteps;
}

/**
 * Generates automated fluid spacing and fluid typography clamp() fallbacks,
 * modern round() + progress() progressive enhancements, and Level 5 @function rules.
 */
function generateFluidSystem(globalTokens, discoveredSteps = new Set(), scaleParams = null, log = () => {}) {
  const { minVpRem, maxVpRem } = fluidViewports(globalTokens);
  const minVp = minVpRem * 16; // px, for progress()
  const maxVp = maxVpRem * 16;
  const vpDiffRem = maxVpRem - minVpRem; // 55rem

  function calculateClamp(minRem, maxRem, unit = 'vi') {
    const slope = (maxRem - minRem) / vpDiffRem;
    const slopeUnit = +(slope * 100).toFixed(2);
    const intersection = +(minRem - minVpRem * slope).toFixed(2);
    return `clamp(${minRem}rem, ${intersection}rem + ${slopeUnit}${unit}, ${maxRem}rem)`;
  }

  // Fluid spacing: one fluid(min, max) step per role in fluid.spacing (written
  // from tokens/theme.json by npm run build:space). The token walk writes each
  // role's viewport clamp (--fluid-spacing-<role>); this adds its container
  // twin (--fluid-spacing-cq-<role>) and both progress() versions.
  const toRem = (v) => {
    const str = String(v).trim();
    if (str.startsWith('{')) return toRem(lookupGlobalToken(globalTokens, str.slice(1, -1)));
    return str.endsWith('px') ? parseFloat(str) / 16 : parseFloat(str);
  };
  const spacingDefs = Object.entries(globalTokens.fluid?.spacing ?? {})
    .filter(([key, node]) => !key.startsWith('$') && typeof node?.$value === 'string' && node.$value.startsWith('fluid('))
    .map(([key, node]) => {
      const [min, max] = node.$value.slice(6, -1).split(',').map(toRem);
      return { name: `fluid-spacing-${key}`, nameCq: `fluid-spacing-cq-${key}`, min, max };
    });

  // Fluid typography scale parameters derived from 1-global.json
  const mobileBase = scaleParams?.mobileBase || 1.0;
  const mobileRatio = scaleParams?.mobileRatio || 1.2;
  const desktopBase = scaleParams?.desktopBase || 1.5;
  const desktopRatio = scaleParams?.desktopRatio || 1.25;
  const floorRem = scaleParams?.minRem || 0;
  const lowCap = scaleParams?.maxSmallRem ?? Infinity;
  const highCap = scaleParams?.maxLargeRem ?? Infinity;
  const low = (rem) => +Math.min(lowCap, Math.max(floorRem, rem)).toFixed(4);
  const high = (rem) => +Math.min(highCap, Math.max(floorRem, rem)).toFixed(4);

  const baseSteps = [-2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8];
  const allStepDefs = new Map();

  // 1. Add standard single-integer scale steps
  baseSteps.forEach(step => {
    const key = String(step);
    const minRem = low(mobileBase * Math.pow(mobileRatio, step));
    const maxRem = high(desktopBase * Math.pow(desktopRatio, step));
    allStepDefs.set(key, {
      key,
      isCompound: false,
      minStep: step,
      maxStep: step,
      minRem,
      maxRem,
      name: `typography-font-size-fluid-${key}`,
      nameCq: `typography-font-size-cq-${key}`,
      clampVi: calculateClamp(minRem, maxRem, 'vi'),
      clampCq: calculateClamp(minRem, maxRem, 'cqi')
    });
  });

  // 2. Add dynamically discovered compound steps from 2-semantic.json (e.g. 2-4, 4-7)
  discoveredSteps.forEach(rawKey => {
    const parsed = parseStepKey(rawKey);
    if (!parsed) return;
    const key = parsed.isCompound ? `${parsed.minStep}-${parsed.maxStep}` : String(parsed.minStep);
    if (!allStepDefs.has(key)) {
      const minRem = low(mobileBase * Math.pow(mobileRatio, parsed.minStep));
      const maxRem = high(desktopBase * Math.pow(desktopRatio, parsed.maxStep));
      allStepDefs.set(key, {
        key,
        isCompound: parsed.isCompound,
        minStep: parsed.minStep,
        maxStep: parsed.maxStep,
        minRem,
        maxRem,
        name: `typography-font-size-fluid-${key}`,
        nameCq: `typography-font-size-cq-${key}`,
        clampVi: calculateClamp(minRem, maxRem, 'vi'),
        clampCq: calculateClamp(minRem, maxRem, 'cqi')
      });
      log(`✨ Synthesized on-demand fluid step: ${key} (${minRem}rem -> ${maxRem}rem)`);
    }
  });

  const fontDefs = Array.from(allStepDefs.values());

  const fallbackVars = [
    '  /* Modular Typography Scale Parameters */',
    `  --font-size-base: ${mobileBase}rem;`,
    `  --font-size-ratio: ${mobileRatio};`,
    '  --_min-font-size: var(--font-size-base);',
    '  --_min-ratio: var(--font-size-ratio);',
    `  --_max-font-size: ${desktopBase}rem;`,
    `  --_max-ratio: ${desktopRatio};`,
    '',
    '  /* Container Fluid Spacing (Container Query: cqi units) */',
    ...spacingDefs.map(s => `  --${s.nameCq}: ${calculateClamp(s.min, s.max, 'cqi')};`),
    '',
    '  /* Fluid Typography (Viewport: vi units) */',
    ...fontDefs.map(f => `  --${f.name}: ${f.clampVi};`),
    '',
    '  /* Container Fluid Typography (Container Query: cqi units) */',
    ...fontDefs.map(f => `  --${f.nameCq}: ${f.clampCq};`)
  ];

  const progressiveVars = [
    '    /* Fluid Spacing using progress() and round() */',
    ...spacingDefs.map(s => `    --${s.name}: round(${s.min}rem + var(--_progress) * (${s.max}rem - ${s.min}rem), var(--_interval));`),
    '',
    '    /* Container Fluid Spacing using progress() and round() */',
    ...spacingDefs.map(s => `    --${s.nameCq}: round(${s.min}rem + var(--_progress-cq) * (${s.max}rem - ${s.min}rem), var(--_interval));`),
    '',
    '    /* Fluid Typography using progress() and round() (Option A precomputed) */',
    ...fontDefs.map(f => `    --${f.name}: round(${f.minRem}rem + var(--_progress) * (${f.maxRem}rem - ${f.minRem}rem), var(--_interval));`),
    '',
    '    /* Container Fluid Typography using progress() and round() */',
    ...fontDefs.map(f => `    --${f.nameCq}: round(${f.minRem}rem + var(--_progress-cq) * (${f.maxRem}rem - ${f.minRem}rem), var(--_interval));`)
  ];

  const progressiveBlock = `@supports (opacity: progress(1px, 0px, 1px)) {
  :root {
    --_min-viewport: ${minVp}px;
    --_max-viewport: ${maxVp}px;
    --_interval: 1px;
    --_progress: progress(100 * var(--_progressunit, 1vi), var(--_min-viewport), var(--_max-viewport));
    --_progress-cq: progress(100 * var(--_progressunit, 1cqi), var(--_min-viewport), var(--_max-viewport));
    --_pg: var(--_progress);
    --_pgcq: var(--_progress-cq);

${progressiveVars.join('\n')}
  }
}`;

  // CSS Level 5 @function definitions for spacing and typography
  const functionDefs = [
    `@function --type-size(--n) {
  result: round(min(var(--typography-font-size-max-small, 1000rem), max(var(--typography-font-size-min, 0rem), var(--font-size-base) * pow(var(--font-size-ratio), var(--n)))), var(--_interval));
}`,
    `@function --type-size-fluid(--n, --n2: false) {
  --_mn: min(var(--typography-font-size-max-small, 1000rem), max(var(--typography-font-size-min, 0rem), var(--_min-font-size) * pow(var(--_min-ratio), var(--n))));
  --_mx: min(var(--typography-font-size-max-large, 1000rem), max(var(--typography-font-size-min, 0rem), var(--_max-font-size) * pow(var(--_max-ratio), if(style(--n2: false): var(--n); else: var(--n2)))));
  result: round(var(--_mn) + var(--_progress) * (var(--_mx) - var(--_mn)), var(--_interval));
}`,
    `@function --type-size-cq(--n, --n2: false) {
  --_mn: min(var(--typography-font-size-max-small, 1000rem), max(var(--typography-font-size-min, 0rem), var(--_min-font-size) * pow(var(--_min-ratio), var(--n))));
  --_mx: min(var(--typography-font-size-max-large, 1000rem), max(var(--typography-font-size-min, 0rem), var(--_max-font-size) * pow(var(--_max-ratio), if(style(--n2: false): var(--n); else: var(--n2)))));
  result: round(var(--_mn) + var(--_progress-cq) * (var(--_mx) - var(--_mn)), var(--_interval));
}`,
    `@function --line-height(--n) {
  result: round(calc(var(--_line-height, 1.6) * pow(var(--_line-height-ratio, 1.125), var(--n))), 0.01);
}`
  ];

  const supportsMapping = [
    '    /* Fluid Typography Functions */',
    ...fontDefs.map(f => f.isCompound
      ? `    --${f.name}: --type-size-fluid(${f.minStep}, ${f.maxStep});`
      : `    --${f.name}: --type-size-fluid(${f.minStep});`
    ),
    '',
    '    /* Container Fluid Typography Functions */',
    ...fontDefs.map(f => f.isCompound
      ? `    --${f.nameCq}: --type-size-cq(${f.minStep}, ${f.maxStep});`
      : `    --${f.nameCq}: --type-size-cq(${f.minStep});`
    )
  ];

  return {
    fallbackVars,
    progressiveBlock,
    functionDefs,
    supportsMapping
  };
}

/**
 * Generates decomposed shadow geometry layers, CSS Level 5 @function rules,
 * and @supports at-rule(@function) progressive enhancement mappings.
 */
function generateShadowSystem(semanticJson) {
  if (!semanticJson || !semanticJson.shadow) return null;
  const shadowObj = semanticJson.shadow;

  const presets = ['sm', 'md', 'lg', 'inner'];
  const layerVars = [];
  const functionDefs = [];
  const supportsMapping = [];

  layerVars.push('  /* Shadow Geometry Layers */');

  presets.forEach(name => {
    const token = shadowObj[name];
    if (!token) return;
    const rawVal = token.$value !== undefined ? token.$value : token.value;
    if (Array.isArray(rawVal) && rawVal.length > 0) {
      rawVal.forEach((layer, idx) => {
        const layerIdx = idx + 1;
        const isInset = layer.type === 'innerShadow' || layer.inset;
        const x = layer.x || '0';
        const y = layer.y || '0';
        const blur = layer.blur || '0';
        const spread = layer.spread || '0';
        const geom = `${isInset ? 'inset ' : ''}${x} ${y} ${blur} ${spread}`.trim();
        layerVars.push(`  --_shadow-${name}-layer-${layerIdx}: ${geom};`);
      });

      const functionLayers = rawVal
        .map((_, idx) => `var(--_shadow-${name}-layer-${idx + 1}) var(--color)`)
        .join(',\n    ');

      functionDefs.push(`@function --shadow-${name}(--color: black) {
  result: ${functionLayers};
}`);

      supportsMapping.push(`    --shadow-${name}: --shadow-${name}(var(--shadow-color));`);
      supportsMapping.push(`    --shadow-${name}-light: --shadow-${name}(var(--shadow-color-light));`);
    }
  });

  return {
    layerVars,
    functionDefs,
    supportsMapping
  };
}

/* --------------------------------------------------------------------------
   compileTokens: Tier 1 and Tier 2 (W3C DTCG) into variables.css
   --------------------------------------------------------------------------
   Tier 3 stays out of the CSS: each default is the fallback where the
   component reads its hook, and check:tokens keeps those fallbacks equal to
   3-component.json, which Figma reads (here only for its fluid steps).
   Returns the CSS, and the global tokens with the type scale worked out from
   their ratio and bases (scaleChanged says whether that changed them). The
   tokens passed in are left as they are. log() hears what was recalculated.
   -------------------------------------------------------------------------- */
export function compileTokens({ global, semantic, component } = {}, { log = () => {} } = {}) {
  invertedTier2Vars.length = 0;
  invertedContrastVars.length = 0;
  const globalJson = global ? structuredClone(global) : null;
  const semanticJson = semantic ? structuredClone(semantic) : null;
  let allCssLines = [];
  let allConditionals = [];

  // 1. Recalculate the global modular scale from its ratio and base sizes
  const scaleParams = syncGlobalTypographyScale(globalJson, log);

  // 2. Discover any compound or custom fluid steps in 2-semantic.json / 3-component.json
  const discoveredFluidSteps = discoverFluidStepReferences([semanticJson, component ?? null]);

  // 3. Generate fluid system with dynamic compound steps
  buildInvertedRoles(semanticJson);
  const contrastJson = semanticJson?.$media?.['(prefers-contrast: more)'];
  if (contrastJson) buildInvertedRoles(contrastJson, invertedContrastVars);
  const fluidSystem = generateFluidSystem(globalJson, discoveredFluidSteps, scaleParams, log);
  const shadowSystem = generateShadowSystem(semanticJson);

  // Global, then Semantic, each as it stands after the scale is worked out
  [['1-global.json', globalJson], ['2-semantic.json', semantic]].forEach(([file, tokens]) => {
    if (!tokens) return;
    const json = structuredClone(tokens);

    const flattened = flattenTokens(json, '', globalJson);
    const conditionals = extractConditionals(json);

    allCssLines.push(`  /* Source: ${file} */`);
    if (file === '2-semantic.json' && shadowSystem) {
      allCssLines = allCssLines.concat(shadowSystem.layerVars);
      allCssLines.push('');
    }
    allCssLines = allCssLines.concat(flattened);

    // After global tokens, inject the automated fluid spacing and typography clamp fallbacks
    if (file === '1-global.json' && fluidSystem) {
      allCssLines.push('');
      allCssLines = allCssLines.concat(fluidSystem.fallbackVars);
    }

    allCssLines.push(''); // Empty line between files

    if (conditionals.length > 0) {
      allConditionals = allConditionals.concat(conditionals);
    }
  });

    // Merge conditionals with matching conditions
    const mergedConditionals = {};
    allConditionals.forEach(cond => {
      const key = `${cond.type}:${cond.condition}`;
      if (!mergedConditionals[key]) {
        mergedConditionals[key] = {
          type: cond.type,
          condition: cond.condition,
          variables: []
        };
      }
      mergedConditionals[key].variables = mergedConditionals[key].variables.concat(cond.variables);
    });

    let conditionalBlocks = [];
    Object.values(mergedConditionals).forEach(cond => {
      const atRule = cond.type === 'media' ? `@media ${cond.condition}` : `@supports ${cond.condition}`;
      conditionalBlocks.push(`${atRule} {
  :root {
${cond.variables.join('\n')}
  }
}`);
    });

    // Fluid type, oldest method first so each newer one wins where it's supported:
    // clamp() (in :root above), then progress(), then @function with progress().
    // When a method is Baseline Widely Available, the one before it can go.
    if (fluidSystem) {
      conditionalBlocks.push(fluidSystem.progressiveBlock);
      conditionalBlocks.push(`@supports at-rule(@function) and (opacity: progress(1px, 0px, 1px)) {
  :root {
${fluidSystem.supportsMapping.join('\n')}
  }
}`);
    }

    // Build unified CSS Level 5 @function block
    const allFunctionDefs = [
      ...(shadowSystem ? shadowSystem.functionDefs : []),
      ...(fluidSystem ? fluidSystem.functionDefs : [])
    ];
    const allSupportsMappings = [
      ...(shadowSystem ? shadowSystem.supportsMapping : [])
    ];

    let functionsBlock = '';
    if (allFunctionDefs.length > 0) {
      functionsBlock = `/* ==========================================================================
   Functions (CSS Values and Units Level 5 @function)
   --------------------------------------------------------------------------
   Dynamic color-parameterized shadows, fluid scaling, and typography calculations.
   ========================================================================== */

${allFunctionDefs.join('\n\n')}

@supports at-rule(@function) {
  :root {
${allSupportsMappings.join('\n')}
  }
}`;
    }

    // Build the inverted palette blocks. Tier 3 defaults read these roles where they're used, so they follow
    const invertedVars = invertedTier2Vars;
    let invertedBlock = '';
    if (invertedVars.length > 0) {
      invertedBlock = `
/* ==========================================================================
   Inverted Palette Blocks (Tier 2 roles)
   ========================================================================== */
:where(.color-palette-inverted, .colors-inverted) {
${invertedVars.join('\n')}
}

* {
  @container style(--color-palette: inverted) {
${invertedVars.join('\n')}
  }
}`;
    }
    if (invertedContrastVars.length > 0) {
      invertedBlock += `

@media (prefers-contrast: more) {
  :where(.color-palette-inverted, .colors-inverted) {
${invertedContrastVars.join('\n')}
  }

  * {
    @container style(--color-palette: inverted) {
${invertedContrastVars.join('\n')}
    }
  }
}`;
    }

    // The fluid spacing roles and the sidebar column as :root sets them, for .sizing-default: a
    // region inside a compact one (.ui-compact) takes them back. Here rather than in the utility, as they read Tier 1.
    const spacingRoles = allCssLines.filter((line) => /^\s*--(spacing-(cq-)?(breathe|cushion)(-sm|-lg)?|app-sidebar-width):/.test(line));
    if (spacingRoles.length > 0) {
      invertedBlock += `

/* ==========================================================================
   Default Sizing (.sizing-default): the spacing roles and sidebar column, back from compact
   ========================================================================== */
:where(.sizing-default) {
${spacingRoles.join('\n')}
}`;
    }

    // Wrap in :root selector with modern defaults
    const cssOutput = `/**
 * Do not edit directly. This file is auto-generated from W3C token JSONs.
 * Run your token compilation script to update.
 */

:root {
  color-scheme: light dark;
  interpolate-size: allow-keywords;

${allCssLines.join('\n')}
}
${functionsBlock ? '\n' + functionsBlock + '\n' : ''}${conditionalBlocks.length > 0 ? '\n' + conditionalBlocks.join('\n\n') + '\n' : ''}${invertedBlock ? '\n' + invertedBlock + '\n' : ''}`;

  return { css: cssOutput, global: globalJson, scaleChanged: !!scaleParams?.changed };
}
