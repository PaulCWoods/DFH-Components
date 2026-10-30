/* ==========================================================================
   Type: the scale, fluid sizes, font sources and text styles
   --------------------------------------------------------------------------
   Reads the `type` section of tokens/theme.json and writes the typography
   block of 1-global.json and the text styles of 2-semantic.json, the way
   applyRoles writes the colour roles.

   The system sets five values: the base size and scale ratio (the fixed
   scale), the ratio at the smallest viewport (with the base size, the small
   end of fluid type) and the base size and ratio at the largest viewport.
   A style's fluid size runs from its step on the small scale to the same
   step on the large one, or to another step (growTo) for a bigger change.
   ========================================================================== */

/* Step names as the tokens spell them: 2, minus-1 (Tier 1), -1 (cq) */
export const stepKey = (n) => (n < 0 ? `minus-${-n}` : String(n));
const cqKey = (n) => String(n);
const rangeKey = (from, to, key) => (to === undefined || to === from ? key(from) : `${from}-${to}`);

const rem = (v) => parseFloat(v);
const round = (n, places = 4) => +n.toFixed(places);

/* The fixed scale, -2 to 8 by default: base × ratio^n */
export const scaleSteps = (type) => {
  const [lo, hi] = type.scale.steps ?? [-2, 8];
  const base = rem(type.scale.base);
  const out = {};
  for (let n = lo; n <= hi; n++) out[n] = round(base * type.scale.ratio ** n);
  return out;
};

/* Each step's size at the smallest and largest viewport */
export const fluidSteps = (type) => {
  const [lo, hi] = type.scale.steps ?? [-2, 8];
  const base = rem(type.scale.base);
  const minRatio = type.fluid.min.ratio ?? type.scale.ratio;
  const maxBase = rem(type.fluid.max.base);
  const out = {};
  for (let n = lo; n <= hi; n++) out[n] = [round(base * minRatio ** n), round(maxBase * type.fluid.max.ratio ** n)];
  return out;
};

/* A font's CSS family list: its name, quoted, then its fallback stack */
const quote = (name) => `"${name}"`;
export const fontStack = (font) => [font.family && quote(font.family), font.fallback].filter(Boolean).join(', ');

/* The <link> a product puts in its page head for the web fonts, by source */
export const fontLinks = (type) => {
  const fonts = Object.values(type.fonts ?? {});
  const google = fonts.filter((f) => f.source === 'google');
  const adobe = [...new Set(fonts.filter((f) => f.source === 'adobe').map((f) => f.kit))];
  const links = [];
  if (google.length) {
    const families = google
      .map((f) => {
        const weights = [...(f.weights ?? [400])].sort((a, b) => a - b);
        const name = f.family.replace(/ /g, '+');
        return f.italic
          ? `family=${name}:ital,wght@${[0, 1].flatMap((i) => weights.map((w) => `${i},${w}`)).join(';')}`
          : `family=${name}:wght@${weights.join(';')}`;
      })
      .join('&');
    links.push('<link rel="preconnect" href="https://fonts.googleapis.com" />');
    links.push('<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />');
    links.push(`<link rel="stylesheet" href="https://fonts.googleapis.com/css2?${families}&display=swap" />`);
  }
  for (const kit of adobe) links.push(`<link rel="stylesheet" href="https://use.typekit.net/${kit}.css" />`);
  return links;
};

/* @font-face rules for fonts stored in the project */
export const fontFaces = (type, { base = '' } = {}) =>
  Object.values(type.fonts ?? {})
    .filter((f) => f.source === 'local')
    .flatMap((f) =>
      (f.files ?? []).map(
        (file) =>
          `@font-face {\n  font-family: ${quote(f.family)};\n  src: url("${base}${file.path}") format("${file.path.endsWith('.woff2') ? 'woff2' : 'woff'}");\n  font-weight: ${file.weight ?? 400};\n  font-style: ${file.style ?? 'normal'};\n  font-display: swap;\n}`,
      ),
    )
    .join('\n\n');

/* --------------------------------------------------------------------------
   Tier 1: the typography block
   -------------------------------------------------------------------------- */
const setValue = (node, value, extra = {}) => {
  if (node && typeof node === 'object' && '$value' in node) return { ...node, $value: value };
  return { $value: value, ...extra };
};

export const typeGlobal = (type, typography = {}) => {
  const out = structuredClone(typography);

  /* Fonts, then the family roles that point at them */
  out['font-family'] = out['font-family'] ?? { $type: 'fontFamily' };
  for (const [name, font] of Object.entries(type.fonts ?? {})) {
    out['font-family'][name] = setValue(out['font-family'][name], fontStack(font));
  }
  for (const [role, family] of Object.entries(type.families ?? {})) {
    out['font-family'][role] = setValue(out['font-family'][role], `{typography.font-family.${family.font}}`);
  }

  /* The scale, and the fluid settings the compiler reads */
  out['font-size-base'] = setValue(out['font-size-base'], type.scale.base, { $type: 'dimension' });
  out.ratio = setValue(out.ratio, type.scale.ratio, { $type: 'number' });
  const fluid = (out['fluid-scale'] = out['fluid-scale'] ?? {});
  fluid['mobile-base'] = setValue(fluid['mobile-base'], type.scale.base);
  fluid['mobile-ratio'] = setValue(fluid['mobile-ratio'], type.fluid.min.ratio ?? type.scale.ratio);
  fluid['desktop-base'] = setValue(fluid['desktop-base'], type.fluid.max.base);
  fluid['desktop-ratio'] = setValue(fluid['desktop-ratio'], type.fluid.max.ratio);
  const [minVp, maxVp] = type.fluid.viewports ?? ['25rem', '80rem'];
  fluid['min-viewport'] = setValue(fluid['min-viewport'], minVp, { $type: 'dimension', $description: 'Fluid type starts growing at this viewport (and container) width' });
  fluid['max-viewport'] = setValue(fluid['max-viewport'], maxVp, { $type: 'dimension', $description: 'Fluid type stops growing at this viewport (and container) width' });

  out['font-size'] = out['font-size'] ?? { $type: 'dimension' };
  for (const [n, size] of Object.entries(scaleSteps(type))) {
    out['font-size'][stepKey(+n)] = setValue(out['font-size'][stepKey(+n)], `${size}rem`);
  }
  return out;
};

/* The fluid block: each step from the small scale to the large one */
export const fluidBlock = (type, current = {}) => {
  const out = structuredClone(current);
  out['font-size'] = out['font-size'] ?? { $type: 'dimension' };
  for (const [n, [min, max]] of Object.entries(fluidSteps(type))) {
    const node = setValue(out['font-size'][stepKey(+n)], `fluid(${min}rem, ${max}rem)`);
    node.$description = `Fluid font size step ${n} (${min}rem / ${Math.round(min * 16)}px Mobile to ${max}rem / ${Math.round(max * 16)}px Desktop)`;
    out['font-size'][stepKey(+n)] = node;
  }
  return out;
};

/* --------------------------------------------------------------------------
   Tier 2: the text styles
   A style writes only what it sets; a style without a family or weight
   takes the body's through the CSS, as today.
   -------------------------------------------------------------------------- */
const put = (semantic, group, key, value, type) => {
  semantic[group] = semantic[group] ?? {};
  const node = semantic[group][key];
  semantic[group][key] = node && typeof node === 'object' ? { ...node, $value: value } : { $value: value, ...(type ? { $type: type } : {}) };
};

export const styleTokens = (name, style) => {
  const out = [];
  if (style.family) out.push([name, 'font-family', `{typography.font-family.${style.family}}`, 'fontFamily']);
  if (style.weight) out.push([name, 'font-weight', `{font-weight.${style.weight}}`, 'fontWeight']);
  if (style.lineHeight !== undefined) out.push([name, 'line-height', style.lineHeight, 'number']);
  if (style.letterSpacing) out.push([name, 'letter-spacing', `{typography.spacing.${style.letterSpacing}}`, 'dimension']);
  if (style.case) out.push([name, 'text-transform', style.case, 'string']);

  if (style.size !== undefined) {
    /* label keeps its size on the style itself; the rest use -fixed */
    const fixed = style.sizeOnStyle ? [name, 'font-size'] : [`${name}-fixed`, 'font-size'];
    out.push([...fixed, `{typography.font-size.${stepKey(style.size)}}`, 'dimension']);
  }
  if (style.compact !== undefined) out.push([`${name}-compact`, 'font-size', `{typography.font-size.${stepKey(style.compact)}}`, 'dimension']);
  if (style.fluid !== false && style.size !== undefined) {
    const from = style.size;
    const to = style.growTo;
    out.push([`${name}-fluid`, 'font-size', `{fluid.typography.font-size.${rangeKey(from, to, stepKey)}}`, 'dimension']);
    const cq = style.cq ?? { from, to };
    out.push([`${name}-cq`, 'font-size', `{typography.font-size.cq.${rangeKey(cq.from, cq.to, cqKey)}}`, 'dimension']);
  }
  return out;
};

/* A token that already resolves to the style's value is left as written,
   so links between styles (subheading takes heading's family) survive */
const sameValue = (a, b) => {
  if (a === b) return true;
  const x = evalCalc(a);
  const y = evalCalc(b);
  return Number.isFinite(x) && Number.isFinite(y) && Math.abs(x - y) < 0.0005;
};

export const applyTypeStyles = (semantic, type, { global = {} } = {}) => {
  const out = structuredClone(semantic);
  for (const [name, style] of Object.entries(type.styles ?? {})) {
    for (const [group, key, value, tokenType] of styleTokens(name, style)) {
      const current = out[group]?.[key];
      if (current !== undefined) {
        const files = [out, global];
        const want = refOf(value) ? resolveToken(refOf(value), files) : value;
        if (sameValue(resolveToken(`${group}.${key}`, files), want)) continue;
      }
      put(out, group, key, value, tokenType);
    }
  }
  return out;
};

/* --------------------------------------------------------------------------
   Migration: today's tokens into a `type` theme
   -------------------------------------------------------------------------- */
const get = (obj, path) => path.split('.').reduce((o, k) => (o == null ? o : o[k]), obj);
const refOf = (v) => (typeof v === 'string' && /^\{[^}]+\}$/.test(v) ? v.slice(1, -1) : null);

/* Follows {refs} through both files to a final value */
export const resolveToken = (path, files) => {
  for (let i = 0, p = path; i < 20; i++) {
    const node = files.map((f) => get(f, p)).find((n) => n !== undefined);
    const value = node?.$value ?? node;
    const ref = refOf(value);
    if (!ref) return value;
    p = ref;
  }
  throw new Error(`Reference loop at ${path}`);
};

/* calc(1.6 * pow(1.125, -3)) and the like, as a number */
export const evalCalc = (v) => {
  if (typeof v === 'number') return v;
  let expr = String(v).trim();
  if (expr.startsWith('calc(') && expr.endsWith(')')) expr = expr.slice(5, -1);
  expr = expr.replace(/pow\(\s*([^,]+?)\s*,\s*([^)]+?)\s*\)/g, '(($1) ** ($2))');
  if (!/^[\d\s.*+\-/()]+$/.test(expr)) return Number(v);
  return Function(`"use strict"; return (${expr});`)();
};

const stepOf = (ref) => {
  const m = /font-size\.(?:cq\.)?(minus-\d+|-?\d+)(?:-(-?\d+))?$/.exec(ref ?? '');
  if (!m) return null;
  const from = m[1].startsWith('minus-') ? -Number(m[1].slice(6)) : Number(m[1]);
  return { from, to: m[2] !== undefined ? Number(m[2]) : undefined };
};

const lastKey = (ref, prefix) => (ref?.startsWith(prefix) ? ref.slice(prefix.length) : undefined);

export const STYLE_NAMES = ['display-title', 'title', 'heading', 'subheading', 'small-heading', 'micro-heading', 'body-lg', 'body', 'body-sm', 'body-xs', 'label', 'code', 'body-alt', 'body-strong'];

export const migrateType = (global, semantic) => {
  const files = [semantic, global];
  const typo = global.typography;

  /* Fonts: the named stacks, split into the font and its fallback */
  const roles = ['sans', 'serif', 'mono', 'display'];
  const fonts = {};
  for (const [name, node] of Object.entries(typo['font-family'])) {
    if (name.startsWith('$') || roles.includes(name)) continue;
    const parts = node.$value.split(',').map((s) => s.trim());
    const family = parts[0].replace(/^"|"$/g, '');
    const google = { inter: [400, 500, 600, 700], 'jetbrains-mono': [400, 500, 700], 'plus-jakarta-sans': [600, 700, 800] }[name];
    fonts[name] = google
      ? { source: 'google', family, weights: google, fallback: parts.slice(1).join(', ') }
      : { source: 'system', family, fallback: parts.slice(1).join(', ') };
  }
  const families = Object.fromEntries(roles.map((r) => [r, { font: lastKey(refOf(typo['font-family'][r].$value), 'typography.font-family.') }]));

  /* Styles: what each one sets today */
  const styles = {};
  for (const name of STYLE_NAMES) {
    const own = semantic[name] ?? {};
    const style = {};
    const famRef = refOf(own['font-family']?.$value);
    if (famRef) style.family = lastKey(resolveRef(famRef, files, 'typography.font-family.'), 'typography.font-family.');
    const weightRef = refOf(own['font-weight']?.$value);
    if (weightRef) style.weight = lastKey(resolveRef(weightRef, files, 'font-weight.'), 'font-weight.');
    if (own['line-height']) style.lineHeight = round(evalCalc(resolveToken(`${name}.line-height`, files)), 3);
    const lsRef = refOf(own['letter-spacing']?.$value);
    if (lsRef) style.letterSpacing = lastKey(resolveRef(lsRef, files, 'typography.spacing.'), 'typography.spacing.');
    if (own['text-transform']) style.case = resolveToken(`${name}.text-transform`, files);

    const fixedRef = refOf(semantic[`${name}-fixed`]?.['font-size']?.$value) ?? (name === 'label' ? refOf(own['font-size']?.$value) : null);
    if (fixedRef) {
      style.size = stepOf(fixedRef).from;
      if (name === 'label') style.sizeOnStyle = true;
    }
    const compactRef = refOf(semantic[`${name}-compact`]?.['font-size']?.$value);
    if (compactRef) style.compact = stepOf(compactRef).from;
    const fluidRef = refOf(semantic[`${name}-fluid`]?.['font-size']?.$value);
    const cqRef = refOf(semantic[`${name}-cq`]?.['font-size']?.$value);
    if (style.size !== undefined && !fluidRef && !cqRef) style.fluid = false;
    if (fluidRef) {
      const f = stepOf(fluidRef);
      if (f.to !== undefined && f.to !== f.from) style.growTo = f.to;
    }
    if (cqRef) {
      const c = stepOf(cqRef);
      const expected = { from: style.size, to: style.growTo };
      if (c.from !== expected.from || (c.to ?? c.from) !== (expected.to ?? expected.from)) style.cq = c.to === undefined ? { from: c.from } : c;
    }
    if (Object.keys(style).length) styles[name] = style;
  }

  return {
    fonts,
    families,
    scale: { base: typo['font-size-base'].$value, ratio: Number(typo.ratio.$value), steps: [-2, 8] },
    fluid: {
      viewports: [typo['fluid-scale']['min-viewport']?.$value ?? '25rem', typo['fluid-scale']['max-viewport']?.$value ?? '80rem'],
      min: { ratio: Number(typo['fluid-scale']['mobile-ratio'].$value) },
      max: { base: typo['fluid-scale']['desktop-base'].$value, ratio: Number(typo['fluid-scale']['desktop-ratio'].$value) },
    },
    styles,
  };
};

/* Follows a ref until it lands under `prefix` (a family, weight or spacing) */
const resolveRef = (ref, files, prefix) => {
  for (let i = 0, p = ref; i < 20; i++) {
    if (p.startsWith(prefix)) return p;
    const node = files.map((f) => get(f, p)).find((n) => n !== undefined);
    const next = refOf(node?.$value ?? node);
    if (!next) return p;
    p = next;
  }
  return ref;
};

/* --------------------------------------------------------------------------
   Preview: the custom properties a theme sets, for a live page
   Same names and clamp() maths as compile-tokens.js, so a page that loads
   the library and then these values shows the theme without a rebuild.
   -------------------------------------------------------------------------- */
export const fluidClamp = (min, max, [minVp, maxVp], unit = 'vi') => {
  const slope = (max - min) / (rem(maxVp) - rem(minVp));
  const intersection = +(min - rem(minVp) * slope).toFixed(2);
  return `clamp(${min}rem, ${intersection}rem + ${+(slope * 100).toFixed(2)}${unit}, ${max}rem)`;
};

export const typeCssVars = (type) => {
  const vars = {};
  for (const [name, font] of Object.entries(type.fonts ?? {})) vars[`--typography-font-family-${name}`] = fontStack(font);
  for (const [role, family] of Object.entries(type.families ?? {})) {
    if (family.font) vars[`--typography-font-family-${role}`] = `var(--typography-font-family-${family.font})`;
  }
  const viewports = type.fluid.viewports ?? ['25rem', '80rem'];
  const fluid = fluidSteps(type);
  for (const [n, size] of Object.entries(scaleSteps(type))) vars[`--typography-font-size-${n}`] = `${size}rem`;
  for (const [n, [min, max]] of Object.entries(fluid)) {
    vars[`--fluid-typography-font-size-${n}`] = fluidClamp(min, max, viewports);
    vars[`--typography-font-size-fluid-${n}`] = fluidClamp(min, max, viewports);
    vars[`--typography-font-size-cq-${n}`] = fluidClamp(min, max, viewports, 'cqi');
  }
  /* The ranges styles grow through (5-8), for both modes */
  for (const style of Object.values(type.styles ?? {})) {
    const ranges = [[style.size, style.growTo], [style.cq?.from, style.cq?.to]];
    for (const [from, to] of ranges) {
      if (from === undefined || to === undefined || to === from || !fluid[from] || !fluid[to]) continue;
      vars[`--typography-font-size-fluid-${from}-${to}`] = fluidClamp(fluid[from][0], fluid[to][1], viewports);
      vars[`--typography-font-size-cq-${from}-${to}`] = fluidClamp(fluid[from][0], fluid[to][1], viewports, 'cqi');
    }
  }
  return vars;
};
