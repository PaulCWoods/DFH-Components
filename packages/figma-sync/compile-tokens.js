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
      let tokenVal = rawVal;
      if (typeof rawVal === 'string' && rawVal.trim().startsWith('fluid(') && rawVal.trim().endsWith(')')) {
        tokenVal = compileFluidValue(rawVal, globalTokens);
      } else if (Array.isArray(rawVal) && rawVal.length > 0 && typeof rawVal[0] === 'object') {
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

      if (name.includes('-default-') || name.endsWith('-default')) {
        const baseName = name.replace(/-default-/, '-').replace(/-default$/, '');
        cssVariables.push(`  --${baseName}: ${tokenVal};`);
      } else {
        cssVariables.push(`  --${name}: ${tokenVal};`);
      }
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
function generateFluidSystem(globalTokens) {
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
      baseVar: 'var(--spacing-1)'
    },
    {
      name: 'spacing-fluid-x2',
      factor: 2,
      min: baseSpacingRem,
      max: +(baseSpacingRem * Math.pow(spaceRatio, 2)).toFixed(4),
      baseVar: 'var(--spacing-1)'
    },
    {
      name: 'spacing-fluid-x3',
      factor: 3,
      min: baseSpacingRem,
      max: +(baseSpacingRem * Math.pow(spaceRatio, 3)).toFixed(4),
      baseVar: 'var(--spacing-1)'
    },
  ];

  const spacingCqDefs = [
    {
      name: 'spacing-cq',
      factor: 1,
      min: baseSpacingRem,
      max: +(baseSpacingRem * Math.pow(spaceRatio, 1)).toFixed(4),
      baseVar: 'var(--spacing-1)'
    },
    {
      name: 'spacing-cq-x2',
      factor: 2,
      min: baseSpacingRem,
      max: +(baseSpacingRem * Math.pow(spaceRatio, 2)).toFixed(4),
      baseVar: 'var(--spacing-1)'
    },
    {
      name: 'spacing-cq-x3',
      factor: 3,
      min: baseSpacingRem,
      max: +(baseSpacingRem * Math.pow(spaceRatio, 3)).toFixed(4),
      baseVar: 'var(--spacing-1)'
    },
  ];

  // Fluid typography scale parameters:
  // Mobile: Minor Third (1.2 ratio), base 1rem (16px) at 400px viewport
  // Desktop: Major Third (1.25 ratio), base 1.5rem (24px) at 1280px viewport
  const minFs = 1.0;
  const maxFs = 1.5;
  const minRatio = 1.2;
  const maxRatio = 1.25;
  const steps = [-2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8];

  const fontDefs = steps.map(step => {
    const minRem = +(minFs * Math.pow(minRatio, step)).toFixed(4);
    const maxRem = +(maxFs * Math.pow(maxRatio, step)).toFixed(4);
    const stepStr = String(step);
    return {
      step: stepStr,
      name: `typography-font-size-fluid-${stepStr}`,
      nameCq: `typography-font-size-cq-${stepStr}`,
      minRem,
      maxRem,
      clampVi: calculateClamp(minRem, maxRem, 'vi'),
      clampCq: calculateClamp(minRem, maxRem, 'cqi')
    };
  });

  const fallbackVars = [
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

  return {
    fallbackVars,
    progressiveBlock
  };
}

function compileTokens() {
  try {
    console.log('🔄 Compiling design tokens...');

    // Read token files in sequence (Global -> Semantic -> Component)
    const tokenFiles = ['1-global.json', '2-semantic.json', '3-component.json'];
    let allCssLines = [];
    let allConditionals = [];
    const globalPath = path.join(TOKENS_DIR, '1-global.json');
    const globalJson = fs.existsSync(globalPath) ? JSON.parse(fs.readFileSync(globalPath, 'utf8').trim()) : null;

    tokenFiles.forEach(file => {
      const filePath = path.join(TOKENS_DIR, file);
      if (fs.existsSync(filePath)) {
        const rawData = fs.readFileSync(filePath, 'utf8').trim();
        const json = rawData ? JSON.parse(rawData) : {};

        const flattened = flattenTokens(json, '', globalJson);
        const conditionals = extractConditionals(json);

        allCssLines.push(`  /* Source: ${file} */`);
        allCssLines = allCssLines.concat(flattened);

        // After global tokens, inject the automated fluid spacing and typography clamp fallbacks
        if (file === '1-global.json' && globalJson) {
          const fluidSystem = generateFluidSystem(globalJson);
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
    if (globalJson) {
      const fluidSystem = generateFluidSystem(globalJson);
      conditionalBlocks.push(fluidSystem.progressiveBlock);
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
${conditionalBlocks.length > 0 ? '\n' + conditionalBlocks.join('\n\n') + '\n' : ''}`;

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