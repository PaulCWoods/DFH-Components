const fs = require('fs');
const path = require('path');

// Paths configuration
const TOKENS_DIR = path.join(__dirname, '../../tokens');
const OUTPUT_FILE = path.join(__dirname, '../css/src/variables.css');

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

  const minVpRem = 25; // 400px / 16
  const maxVpRem = 80; // 1280px / 16
  const vpDiffRem = 55; // 80 - 25

  const slope = (maxRem - minRem) / vpDiffRem;
  const viSlope = +(slope * 100).toFixed(2);
  const intersection = +(minRem - minVpRem * slope).toFixed(2);

  return `clamp(${minRem}rem, ${intersection}rem + ${viSlope}vi, ${maxRem}rem)`;
}

/**
 * The inverted palette (.color-palette-inverted): every Tier 2 surface,
 * foreground and border colour written as light-dark(a, b) swaps to
 * light-dark(b, a), so an inverted region takes the other mode's colours.
 * Filled from 2-semantic.json by buildInvertedRoles(); Tier 3 tokens that
 * reference these roles are inverted through the same map.
 */
const TIER2_INVERTED_MAPPINGS = {};
const invertedTier2Vars = [];

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

function buildInvertedRoles(semanticJson) {
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
      TIER2_INVERTED_MAPPINGS[`{${next.join('.')}}`] = css;
      if (key === 'default') TIER2_INVERTED_MAPPINGS[`{${path.join('.')}}`] = css;
      invertedTier2Vars.push(`  --${name}: ${css};`);
    }
  };
  for (const group of ['surface', 'foreground']) if (semanticJson?.[group]) walk(semanticJson[group], [group]);
  if (semanticJson?.border?.color) walk(semanticJson.border.color, ['border', 'color']);
}

/**
 * Recursively flattens nested token objects into CSS variable paths.
 * E.g., { color: { surface: { value: '#ffffff' } } } -> --color-surface: #ffffff;
 */
function flattenTokens(obj, prefix = '', globalTokens = null, isTier3 = false, invertedVars = null) {
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

      // When compiling Tier 3 component tokens, capture any references to Tier 2 tokens for the inverted palette block
      if (isTier3 && invertedVars && typeof rawVal === 'string') {
        const trimmed = rawVal.trim();
        if (TIER2_INVERTED_MAPPINGS[trimmed]) {
          invertedVars.push(`  --${baseName}: ${TIER2_INVERTED_MAPPINGS[trimmed]};`);
        } else if (trimmed.includes('{')) {
          // A composite value (such as color-mix()) is inverted when every
          // reference inside it has an inverted counterpart.
          const swapped = trimmed.replace(/\{[^}]+\}/g, (ref) => TIER2_INVERTED_MAPPINGS[ref] ?? ref);
          if (swapped !== trimmed && !swapped.includes('{')) {
            invertedVars.push(`  --${baseName}: ${swapped};`);
          }
        }
      }

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
      cssVariables = cssVariables.concat(flattenTokens(value, name, globalTokens, isTier3, invertedVars));
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
function syncGlobalTypographyScale(globalJson, globalPath) {
  if (!globalJson || !globalJson.typography) return null;
  const typo = globalJson.typography;

  const baseRem = parseFloat(typo['font-size-base']?.$value || typo['font-size-base']?.value || '1rem') || 1.0;
  const ratio = parseFloat(typo.ratio?.$value !== undefined ? typo.ratio.$value : typo.ratio?.value !== undefined ? typo.ratio.value : 1.25) || 1.25;

  const fluidScale = typo['fluid-scale'] || {};
  const mobileBase = parseFloat(fluidScale['mobile-base']?.$value || fluidScale['mobile-base']?.value || '1rem') || 1.0;
  const mobileRatio = parseFloat(fluidScale['mobile-ratio']?.$value !== undefined ? fluidScale['mobile-ratio'].$value : 1.2) || 1.2;
  const desktopBase = parseFloat(fluidScale['desktop-base']?.$value || fluidScale['desktop-base']?.value || '1.5rem') || 1.5;
  const desktopRatio = parseFloat(fluidScale['desktop-ratio']?.$value !== undefined ? fluidScale['desktop-ratio'].$value : 1.25) || 1.25;

  let changed = false;

  // 1. Recalculate static font-size steps: -2 through 8
  if (!typo['font-size']) typo['font-size'] = { $type: 'dimension' };
  const steps = [-2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8];

  steps.forEach(step => {
    const key = step < 0 ? `minus-${Math.abs(step)}` : `${step}`;
    const calculatedRem = +(baseRem * Math.pow(ratio, step)).toFixed(4);
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
    const minRem = +(mobileBase * Math.pow(mobileRatio, step)).toFixed(4);
    const maxRem = +(desktopBase * Math.pow(desktopRatio, step)).toFixed(4);
    const expectedVal = `fluid(${minRem}rem, ${maxRem}rem)`;
    const expectedDesc = `Fluid font size step ${step} (${minRem}rem / ${Math.round(minRem * 16)}px Mobile to ${maxRem}rem / ${Math.round(maxRem * 16)}px Desktop)`;

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

  if (changed && globalPath) {
    fs.writeFileSync(globalPath, JSON.stringify(globalJson, null, 2) + '\n', 'utf8');
    console.log(`✨ Recalculated 1-global.json font sizes (ratio: ${ratio}, mobile: ${mobileRatio}, desktop: ${desktopRatio})`);
  }

  return {
    baseRem,
    ratio,
    mobileBase,
    mobileRatio,
    desktopBase,
    desktopRatio
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
function generateFluidSystem(globalTokens, discoveredSteps = new Set(), scaleParams = null) {
  const minVp = 400; // 400px
  const maxVp = 1280; // 1280px
  const minVpRem = minVp / 16; // 25rem
  const maxVpRem = maxVp / 16; // 80rem
  const vpDiffRem = maxVpRem - minVpRem; // 55rem

  function calculateClamp(minRem, maxRem, unit = 'vi') {
    const slope = (maxRem - minRem) / vpDiffRem;
    const slopeUnit = +(slope * 100).toFixed(2);
    const intersection = +(minRem - minVpRem * slope).toFixed(2);
    return `clamp(${minRem}rem, ${intersection}rem + ${slopeUnit}${unit}, ${maxRem}rem)`;
  }

  // Spacing scale parameters matching blog site (space-scale: 1.333333 / 4/3):
  const spaceRatio = 4 / 3;
  const baseSpacingRem = 1.0;

  const spacingDefs = [
    {
      name: 'spacing-fluid',
      factor: 1,
      min: baseSpacingRem,
      max: +(baseSpacingRem * Math.pow(spaceRatio, 1)).toFixed(4),
      baseVar: 'var(--spacing-16)'
    },
    {
      name: 'spacing-fluid-x2',
      factor: 2,
      min: baseSpacingRem,
      max: +(baseSpacingRem * Math.pow(spaceRatio, 2)).toFixed(4),
      baseVar: 'var(--spacing-16)'
    },
    {
      name: 'spacing-fluid-x3',
      factor: 3,
      min: baseSpacingRem,
      max: +(baseSpacingRem * Math.pow(spaceRatio, 3)).toFixed(4),
      baseVar: 'var(--spacing-16)'
    },
  ];

  const spacingCqDefs = [
    {
      name: 'spacing-cq',
      factor: 1,
      min: baseSpacingRem,
      max: +(baseSpacingRem * Math.pow(spaceRatio, 1)).toFixed(4),
      baseVar: 'var(--spacing-16)'
    },
    {
      name: 'spacing-cq-x2',
      factor: 2,
      min: baseSpacingRem,
      max: +(baseSpacingRem * Math.pow(spaceRatio, 2)).toFixed(4),
      baseVar: 'var(--spacing-16)'
    },
    {
      name: 'spacing-cq-x3',
      factor: 3,
      min: baseSpacingRem,
      max: +(baseSpacingRem * Math.pow(spaceRatio, 3)).toFixed(4),
      baseVar: 'var(--spacing-16)'
    },
  ];

  // Fluid typography scale parameters derived from 1-global.json
  const mobileBase = scaleParams?.mobileBase || 1.0;
  const mobileRatio = scaleParams?.mobileRatio || 1.2;
  const desktopBase = scaleParams?.desktopBase || 1.5;
  const desktopRatio = scaleParams?.desktopRatio || 1.25;

  const baseSteps = [-2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8];
  const allStepDefs = new Map();

  // 1. Add standard single-integer scale steps
  baseSteps.forEach(step => {
    const key = String(step);
    const minRem = +(mobileBase * Math.pow(mobileRatio, step)).toFixed(4);
    const maxRem = +(desktopBase * Math.pow(desktopRatio, step)).toFixed(4);
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
      const minRem = +(mobileBase * Math.pow(mobileRatio, parsed.minStep)).toFixed(4);
      const maxRem = +(desktopBase * Math.pow(desktopRatio, parsed.maxStep)).toFixed(4);
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
      console.log(`✨ Synthesized on-demand fluid step: ${key} (${minRem}rem -> ${maxRem}rem)`);
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
    '  /* Fluid Spacing (Standard clamp fallbacks: vi units) */',
    ...spacingDefs.map(s => `  --${s.name}: ${calculateClamp(s.min, s.max, 'vi')};`),
    '',
    '  /* Container Fluid Spacing (Container Query: cqi units) */',
    ...spacingCqDefs.map(s => `  --${s.name}: ${calculateClamp(s.min, s.max, 'cqi')};`),
    '',
    '  /* Fluid Typography (Viewport: vi units) */',
    ...fontDefs.map(f => `  --${f.name}: ${f.clampVi};`),
    '',
    '  /* Container Fluid Typography (Container Query: cqi units) */',
    ...fontDefs.map(f => `  --${f.nameCq}: ${f.clampCq};`)
  ];

  const progressiveVars = [
    '    /* Fluid Spacing using progress(), pow(), and round() */',
    ...spacingDefs.map(s => `    --${s.name}: round(${s.baseVar} + var(--_progress) * (${s.baseVar} * pow(var(--_space-ratio), ${s.factor}) - ${s.baseVar}), var(--_interval));`),
    '',
    '    /* Container Fluid Spacing using progress(), pow(), and round() */',
    ...spacingCqDefs.map(s => `    --${s.name}: round(${s.baseVar} + var(--_progress-cq) * (${s.baseVar} * pow(var(--_space-ratio), ${s.factor}) - ${s.baseVar}), var(--_interval));`),
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
    --_space-ratio: 1.333333;

${progressiveVars.join('\n')}
  }
}`;

  // CSS Level 5 @function definitions for spacing and typography
  const functionDefs = [
    `@function --spacing-fluid(--size, --factor: 1) {
  result: round(var(--size) + var(--_progress) * (var(--size) * pow(var(--_space-ratio), var(--factor)) - var(--size)), var(--_interval));
}`,
    `@function --spacing-cq(--size, --factor: 1) {
  result: round(var(--size) + var(--_progress-cq) * (var(--size) * pow(var(--_space-ratio), var(--factor)) - var(--size)), var(--_interval));
}`,
    `@function --type-size(--n) {
  result: round(calc(var(--font-size-base) * pow(var(--font-size-ratio), var(--n))), var(--_interval));
}`,
    `@function --type-size-fluid(--n, --n2: false) {
  --_mn: calc(var(--_min-font-size) * pow(var(--_min-ratio), var(--n)));
  --_mx: calc(var(--_max-font-size) * pow(var(--_max-ratio), if(style(--n2: false): var(--n); else: var(--n2))));
  result: round(var(--_mn) + var(--_progress) * (var(--_mx) - var(--_mn)), var(--_interval));
}`,
    `@function --type-size-cq(--n, --n2: false) {
  --_mn: calc(var(--_min-font-size) * pow(var(--_min-ratio), var(--n)));
  --_mx: calc(var(--_max-font-size) * pow(var(--_max-ratio), if(style(--n2: false): var(--n); else: var(--n2))));
  result: round(var(--_mn) + var(--_progress-cq) * (var(--_mx) - var(--_mn)), var(--_interval));
}`,
    `@function --line-height(--n) {
  result: round(calc(var(--_line-height, 1.6) * pow(var(--_line-height-ratio, 1.125), var(--n))), 0.01);
}`
  ];

  const supportsMapping = [
    '    /* Fluid Spacing Functions */',
    '    --spacing-fluid: --spacing-fluid(var(--spacing-16), 1);',
    '    --spacing-fluid-x2: --spacing-fluid(var(--spacing-16), 2);',
    '    --spacing-fluid-x3: --spacing-fluid(var(--spacing-16), 3);',
    '',
    '    /* Container Fluid Spacing Functions */',
    '    --spacing-cq: --spacing-cq(var(--spacing-16), 1);',
    '    --spacing-cq-x2: --spacing-cq(var(--spacing-16), 2);',
    '    --spacing-cq-x3: --spacing-cq(var(--spacing-16), 3);',
    '',
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

function compileTokens() {
  try {
    console.log('🔄 Compiling design tokens...');

    // Read token files in sequence (Global -> Semantic -> Component)
    const tokenFiles = ['1-global.json', '2-semantic.json', '3-component.json'];
    let allCssLines = [];
    let allConditionals = [];
    let invertedTier3Vars = [];
    const globalPath = path.join(TOKENS_DIR, '1-global.json');
    let globalJson = fs.existsSync(globalPath) ? JSON.parse(fs.readFileSync(globalPath, 'utf8').trim()) : null;

    // 1. Sync & recalculate global modular scale if ratio or base sizes changed
    const scaleParams = syncGlobalTypographyScale(globalJson, globalPath);
    if (globalPath && fs.existsSync(globalPath)) {
      globalJson = JSON.parse(fs.readFileSync(globalPath, 'utf8').trim());
    }

    const semanticPath = path.join(TOKENS_DIR, '2-semantic.json');
    const semanticJson = fs.existsSync(semanticPath) ? JSON.parse(fs.readFileSync(semanticPath, 'utf8').trim()) : null;

    const componentPath = path.join(TOKENS_DIR, '3-component.json');
    const componentJson = fs.existsSync(componentPath) ? JSON.parse(fs.readFileSync(componentPath, 'utf8').trim()) : null;

    // 2. Discover any compound or custom fluid steps in 2-semantic.json / 3-component.json
    const discoveredFluidSteps = discoverFluidStepReferences([semanticJson, componentJson]);

    // 3. Generate fluid system with dynamic compound steps
    buildInvertedRoles(semanticJson);
    const fluidSystem = generateFluidSystem(globalJson, discoveredFluidSteps, scaleParams);
    const shadowSystem = generateShadowSystem(semanticJson);

    tokenFiles.forEach(file => {
      const filePath = path.join(TOKENS_DIR, file);
      if (fs.existsSync(filePath)) {
        const rawData = fs.readFileSync(filePath, 'utf8').trim();
        const json = rawData ? JSON.parse(rawData) : {};

        const isTier3 = file === '3-component.json';
        const flattened = flattenTokens(json, '', globalJson, isTier3, isTier3 ? invertedTier3Vars : null);
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

    // Append fluid system progressive enhancement block
    if (fluidSystem) {
      conditionalBlocks.push(fluidSystem.progressiveBlock);
    }

    // Build unified CSS Level 5 @function block
    const allFunctionDefs = [
      ...(shadowSystem ? shadowSystem.functionDefs : []),
      ...(fluidSystem ? fluidSystem.functionDefs : [])
    ];
    const allSupportsMappings = [
      ...(shadowSystem ? shadowSystem.supportsMapping : []),
      ...(fluidSystem ? fluidSystem.supportsMapping : [])
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

    // Build the inverted palette blocks: Tier 2 roles, then the Tier 3 tokens that read them
    const invertedVars = [...invertedTier2Vars, ...invertedTier3Vars];
    let invertedBlock = '';
    if (invertedVars.length > 0) {
      invertedBlock = `
/* ==========================================================================
   Inverted Palette Blocks (Tier 2 roles and the Tier 3 tokens that read them)
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

    // Ensure output directory exists
    fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });

    // Write file
    fs.writeFileSync(OUTPUT_FILE, cssOutput, 'utf8');
    console.log(`✅ Successfully compiled tokens to ${path.relative(process.cwd(), OUTPUT_FILE)}`);
  } catch (error) {
    console.error('❌ Error compiling tokens:', error);
    process.exit(1);
  }
}

compileTokens();