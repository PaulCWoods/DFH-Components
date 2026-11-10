/* ==========================================================================
   Type: the scale, fluid sizes, font sources and text styles
   --------------------------------------------------------------------------
   Reads the `type` section of tokens/theme.json and writes the typography
   block of 1-global.json and the text styles of 2-semantic.json, the way
   applyRoles writes the colour roles.

   The system sets four values: the base size and scale ratio (the fixed
   scale, which is also the small end of fluid type) and the base size and
   ratio at the largest viewport.
   A style's fluid size runs from its fixed size (its step on the small
   scale) to the same step on the large one, or to another step (growTo) for
   a bigger change. Container (cq) sizes run the same way, with the
   container's width for the viewport's.
   Three limits keep the scale readable, each a length a theme can change:
   the floor (scale.min, 0.75rem) raises every step below it, at both ends;
   the lower ceiling (scale.ceiling.lower, 3rem) holds every size at the
   small end (fixed, compact, fluid's start) at or under it, so large text
   still reflows on a narrow screen; the upper ceiling (scale.ceiling.upper,
   6rem) does the same at the large end.
   ========================================================================== */

/* Step names as the tokens spell them: 2, minus-1 (Tier 1), -1 (cq) */
export const stepKey = (n) => (n < 0 ? `minus-${-n}` : String(n));
const cqKey = (n) => String(n);
const rangeKey = (from, to, key) => (to === undefined || to === from ? key(from) : `${from}-${to}`);

const rem = (v) => parseFloat(v);
const round = (n, places = 4) => +n.toFixed(places);

/* The smallest size the scale may reach (scale.min: 0.75rem or 12px), in
   rem; 0 when the theme sets none. Steps below it are raised to it. */
export const MIN_LENGTH = /^(\d*\.?\d+)(rem|px)$/;
export const minSize = (type) => {
  const m = String(type.scale.min ?? '').trim().match(MIN_LENGTH);
  return m ? +m[1] / (m[2] === 'px' ? 16 : 1) : 0;
};

/* The ceilings, in rem: the largest a size may be at the small end (lower)
   and at the large end (upper). A theme that sets none gets the defaults;
   0 sets none (Infinity). Sizes above one are brought down to it. */
export const CEILINGS = { lower: '3rem', upper: '6rem' };
export const ceilingSize = (type, end) => {
  const value = type.scale.ceiling?.[end] ?? CEILINGS[end];
  const m = String(value).trim().match(MIN_LENGTH);
  return m && +m[1] > 0 ? +m[1] / (m[2] === 'px' ? 16 : 1) : Infinity;
};
/* A size between the floor and a ceiling */
const limit = (v, min, max) => Math.min(max, Math.max(min, v));

/* The fixed scale, -2 to 8 by default: base × ratio^n, never under the minimum */
export const scaleSteps = (type) => {
  const [lo, hi] = type.scale.steps ?? [-2, 8];
  const base = rem(type.scale.base);
  const min = minSize(type);
  const lower = ceilingSize(type, 'lower');
  const out = {};
  for (let n = lo; n <= hi; n++) out[n] = round(limit(base * type.scale.ratio ** n, min, lower));
  return out;
};

/* The line-height scale: base × ratio^n, -5 to 1 by default. A style picks a
   step (leading: -3); tighter steps for larger type. */
export const leadingSteps = (type) => {
  const { base = 1.6, ratio = 1.125, steps: [lo, hi] = [-5, 1] } = type.leading ?? {};
  const out = {};
  for (let n = lo; n <= hi; n++) out[n] = round(base * ratio ** n, 3);
  return out;
};
/* The CSS a step's token holds: 1.6, calc(1.6 * 1.125), calc(1.6 * pow(1.125, -3)) */
const leadingCalc = ({ base = 1.6, ratio = 1.125 } = {}, n) => (n === 0 ? String(base) : n === 1 ? `calc(${base} * ${ratio})` : `calc(${base} * pow(${ratio}, ${n}))`);
/* A style's line height as a number: its step's, or a number written in the theme */
export const styleLeading = (type, style) => (style?.leading !== undefined ? leadingSteps(type)[style.leading] : style?.lineHeight);

/* Each step's size at the smallest and largest viewport */
export const fluidSteps = (type) => {
  const [lo, hi] = type.scale.steps ?? [-2, 8];
  const base = rem(type.scale.base);
  /* The small scale is the fixed one: the base size and the scale's ratio */
  const minRatio = type.scale.ratio;
  const maxBase = rem(type.fluid.max.base);
  const min = minSize(type);
  const [lower, upper] = [ceilingSize(type, 'lower'), ceilingSize(type, 'upper')];
  const out = {};
  for (let n = lo; n <= hi; n++) out[n] = [round(limit(base * minRatio ** n, min, lower)), round(limit(maxBase * type.fluid.max.ratio ** n, min, upper))];
  return out;
};

/* The sizes each step would be with no ceilings, to report what they hold */
export const unlimitedSteps = (type) => fluidSteps({ ...type, scale: { ...type.scale, ceiling: { lower: 0, upper: 0 } } });

/* A font's CSS family list: its name, quoted, then its fallback stack */
const quote = (name) => `"${name}"`;
export const fontStack = (font) => [font.family && quote(font.family), font.fallback].filter(Boolean).join(', ');

/* A variable font lists its axes as ranges, { wght: [100, 900], opsz: [14, 32] },
   in place of a list of weights. Google wants the axes in its URL sorted
   lower case first (ital, opsz, wght), then upper case (GRAD), each tuple
   in that order. */
const axisOrder = (a, b) => {
  const [la, lb] = [a === a.toLowerCase(), b === b.toLowerCase()];
  if (la !== lb) return la ? -1 : 1;
  return a < b ? -1 : a > b ? 1 : 0;
};
const googleFamily = (f) => {
  const name = f.family.replace(/ /g, '+');
  const axes = Object.entries(f.axes ?? {});
  if (axes.length) {
    const tags = [...(f.italic ? ['ital'] : []), ...axes.map(([t]) => t)].sort(axisOrder);
    const tuple = (ital) => tags.map((t) => (t === 'ital' ? ital : `${f.axes[t][0]}..${f.axes[t][1]}`)).join(',');
    return `family=${name}:${tags.join(',')}@${f.italic ? `${tuple(0)};${tuple(1)}` : tuple()}`;
  }
  const weights = [...(f.weights ?? [400])].sort((a, b) => a - b);
  return f.italic
    ? `family=${name}:ital,wght@${[0, 1].flatMap((i) => weights.map((w) => `${i},${w}`)).join(';')}`
    : `family=${name}:wght@${weights.join(';')}`;
};

/* The weights a font has loaded: a range for a variable font, else a list.
   A system font's weights aren't known, so it covers any. */
export const fontWeights = (font) => {
  if (!font || font.source === 'system') return null;
  if (font.axes?.wght) return { range: font.axes.wght };
  if (font.source === 'local') return { list: [...new Set((font.files ?? []).map((f) => f.weight ?? 400))].sort((a, b) => a - b) };
  return { list: [...(font.weights ?? [400])].sort((a, b) => a - b) };
};
export const fontCovers = (font, weight) => {
  const w = fontWeights(font);
  if (!w) return true;
  return w.range ? weight >= w.range[0] && weight <= w.range[1] : w.list.includes(weight);
};

/* --------------------------------------------------------------------------
   Family roles. A role names a font ({ font: 'inter' }), shares another
   role's ({ use: 'sans' }: one font fewer to load), or takes a system stack
   ({ system: 'monospace' }: nothing to load).
   -------------------------------------------------------------------------- */
export const SYSTEM_STACKS = {
  'sans-serif': 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  serif: 'Georgia, Cambria, "Times New Roman", Times, serif',
  monospace: 'ui-monospace, Menlo, Monaco, Consolas, "Courier New", monospace',
};

/* The font key a role ends on, following `use`; null for a system stack or a loop */
export const roleFontKey = (type, role, seen = new Set()) => {
  const f = type.families?.[role];
  if (!f || seen.has(role)) return null;
  seen.add(role);
  return f.use ? roleFontKey(type, f.use, seen) : f.font ?? null;
};
export const roleFont = (type, role) => type.fonts?.[roleFontKey(type, role)] ?? null;

/* The CSS stack a role gives, for samples */
export const roleStack = (type, role, seen = new Set()) => {
  const f = type.families?.[role];
  if (!f || seen.has(role)) return '';
  seen.add(role);
  if (f.use) return roleStack(type, f.use, seen);
  if (f.system) return SYSTEM_STACKS[f.system] ?? '';
  return type.fonts?.[f.font] ? fontStack(type.fonts[f.font]) : '';
};

/* --------------------------------------------------------------------------
   System by default (PRINCIPLES §4). The published role tokens name system
   stacks, so the library is complete without a web font. The theme's web
   fonts reach a page through fonts.css: its @font-face rules and a :root
   block that points each role at its font. Figma and the designer's preview
   take the theme's fonts directly.
   -------------------------------------------------------------------------- */
const GENERIC = { serif: 'serif', monospace: 'monospace' };
const genericOf = (font) => GENERIC[(font?.fallback ?? '').split(',').at(-1).trim()] ?? 'sans-serif';
const isWeb = (font) => font && font.source !== 'system';

/* The role token's value: a reference, a system font's stack or a system stack */
export const roleToken = (type, role) => {
  const f = type.families?.[role] ?? {};
  if (f.use) return `{typography.font-family.${f.use}}`;
  if (f.system) return SYSTEM_STACKS[f.system];
  const font = type.fonts?.[f.font];
  return isWeb(font) ? SYSTEM_STACKS[genericOf(font)] : `{typography.font-family.${f.font}}`;
};

/* Each role that names a web font, and the stack that puts the font first */
export const roleOverrides = (type) =>
  Object.fromEntries(
    Object.entries(type.families ?? {})
      .filter(([, f]) => !f.use && !f.system && isWeb(type.fonts?.[f.font]))
      .map(([role, f]) => [role, fontStack(type.fonts[f.font])]),
  );

/* --------------------------------------------------------------------------
   Italic through axes. font-style: italic sets a variable font's ital axis
   and oblique its slnt axis, one or the other, and only when the font's
   @font-face says it covers that style. A font whose italic needs both, or
   whose host declares only an upright face (an Adobe kit), lists the axes
   its italic sets: "italicAxes": { "ital": 1, "slnt": -10 }. The library
   sets them, with font-style, wherever it sets italic. One value serves every
   font on the page: an axis a font lacks does nothing to it, and a value
   past its range stops at the end. Body text's font comes first.
   -------------------------------------------------------------------------- */
export const italicAxes = (type) => {
  const roles = Object.keys(type.families ?? {});
  const body = type.styles?.body?.family;
  const order = [...new Set([body, 'sans', ...roles].filter((r) => roles.includes(r)))];
  const axes = {};
  for (const key of new Set(order.map((r) => roleFontKey(type, r)))) {
    const font = type.fonts?.[key];
    if (!isWeb(font)) continue;
    for (const [tag, value] of Object.entries(font.italicAxes ?? {})) if (!(tag in axes)) axes[tag] = value;
  }
  return axes;
};
export const italicSettings = (type) =>
  Object.entries(italicAxes(type))
    .map(([tag, value]) => `"${tag}" ${value}`)
    .join(', ');

/* fonts.css: what a page links (with the font <link>s) to use the theme's fonts */
export const fontsCss = (type, { base = '' } = {}) => {
  const overrides = Object.entries(roleOverrides(type)).map(([role, stack]) => [`typography-font-family-${role}`, stack]);
  const italic = italicSettings(type);
  if (italic) overrides.push(['typography-font-italic-settings', italic]);
  const faces = fontFaces(type, { base });
  return [
    "/* Generated from the default theme by npm run build:themes (or Publish). Not imported by index.css:\n   a page that loads the theme's fonts links this too. Without it, the font tokens use system stacks. */",
    faces,
    overrides.length ? `:root {\n${overrides.map(([name, value]) => `  --${name}: ${value};`).join('\n')}\n}` : '',
  ]
    .filter(Boolean)
    .join('\n\n') + '\n';
};

/* The fonts some role ends on: only these are loaded */
export const usedFonts = (type) => {
  if (!type.families) return new Set(Object.keys(type.fonts ?? {}));
  return new Set(Object.keys(type.families).map((r) => roleFontKey(type, r)).filter(Boolean));
};
const loadedFonts = (type) => {
  const used = usedFonts(type);
  return Object.entries(type.fonts ?? {}).filter(([k]) => used.has(k)).map(([, f]) => f);
};

/* The two weights to tick first: those nearest 400 and 700 that the family has */
export const pickWeights = (available, want = [400, 700]) => {
  if (!available?.length) return want;
  const nearest = (t, from) => from.reduce((a, b) => (Math.abs(b - t) < Math.abs(a - t) ? b : a));
  const first = nearest(want[0], available);
  const rest = available.filter((w) => w !== first);
  return rest.length ? [first, nearest(want[1], rest)].sort((a, b) => a - b) : [first];
};

/* A font stylesheet that doesn't hold up the first paint: preloaded at high
   priority and applied when it arrives (the fonts swap in, as they would
   anyway), with a plain link for pages without JavaScript */
const fontStylesheet = (href) => [
  `<link rel="preload" as="style" href="${href}" onload="this.onload=null;this.rel='stylesheet'" />`,
  `<noscript><link rel="stylesheet" href="${href}" /></noscript>`,
];

/* The <link> a product puts in its page head for the web fonts, by source */
export const fontLinks = (type) => {
  const fonts = loadedFonts(type);
  const google = fonts.filter((f) => f.source === 'google');
  const adobe = [...new Set(fonts.filter((f) => f.source === 'adobe').map((f) => f.kit))];
  const links = [];
  if (google.length) {
    const families = google.map(googleFamily).join('&');
    links.push('<link rel="preconnect" href="https://fonts.googleapis.com" />');
    links.push('<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />');
    links.push(...fontStylesheet(`https://fonts.googleapis.com/css2?${families}&display=swap`));
  }
  if (adobe.length) {
    /* The kit's font files come from use.typekit.net in CORS mode, and its CSS imports p.typekit.net */
    links.push('<link rel="preconnect" href="https://use.typekit.net" crossorigin />');
    links.push('<link rel="preconnect" href="https://p.typekit.net" />');
  }
  for (const kit of adobe) links.push(...fontStylesheet(`https://use.typekit.net/${kit}.css`));
  return links;
};

/* @font-face rules for fonts stored in the project */
export const fontFaces = (type, { base = '' } = {}) =>
  loadedFonts(type)
    .filter((f) => f.source === 'local')
    .flatMap((f) =>
      (f.files ?? []).map(
        (file) =>
          `@font-face {\n  font-family: ${quote(f.family)};\n  src: url("${base}${file.path}") format("${file.path.endsWith('.woff2') ? 'woff2' : 'woff'}");\n  font-weight: ${f.axes?.wght ? f.axes.wght.join(' ') : file.weight ?? 400};\n  font-style: ${file.style ?? 'normal'};\n  font-display: swap;\n}`,
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

  /* Fonts, then the family roles that point at them. Exactly the theme's:
     a font an earlier default theme had goes, so it doesn't linger in the
     CSS and Figma */
  out['font-family'] = out['font-family'] ?? { $type: 'fontFamily' };
  const keep = new Set([...Object.keys(type.fonts ?? {}), ...Object.keys(type.families ?? {})]);
  for (const name of Object.keys(out['font-family'])) {
    if (!name.startsWith('$') && !keep.has(name)) delete out['font-family'][name];
  }
  for (const [name, font] of Object.entries(type.fonts ?? {})) {
    out['font-family'][name] = setValue(out['font-family'][name], fontStack(font));
  }
  for (const [role, family] of Object.entries(type.families ?? {})) {
    out['font-family'][role] = setValue(out['font-family'][role], roleToken(type, role));
  }

  /* The scale, and the fluid settings the compiler reads */
  out['font-size-base'] = setValue(out['font-size-base'], type.scale.base, { $type: 'dimension' });
  out['font-size-min'] = setValue(out['font-size-min'], `${minSize(type)}rem`, { $type: 'dimension', $description: 'The smallest a step of the scale may be: smaller steps are raised to it, fixed and fluid. 0 sets no minimum' });
  /* The ceilings; with none set, no token, so the CSS reads no limit */
  for (const [end, key, text] of [['lower', 'font-size-max-small', 'at the small end (fixed, compact, fluid at its start)'], ['upper', 'font-size-max-large', 'at the large end of fluid and container sizes']]) {
    const size = ceilingSize(type, end);
    if (Number.isFinite(size)) out[key] = setValue(out[key], `${size}rem`, { $type: 'dimension', $description: `The largest a size may be ${text}: larger ones are brought down to it` });
    else delete out[key];
  }
  out.ratio = setValue(out.ratio, type.scale.ratio, { $type: 'number' });
  const fluid = (out['fluid-scale'] = out['fluid-scale'] ?? {});
  fluid['mobile-base'] = setValue(fluid['mobile-base'], type.scale.base);
  fluid['mobile-ratio'] = setValue(fluid['mobile-ratio'], type.scale.ratio);
  fluid['desktop-base'] = setValue(fluid['desktop-base'], type.fluid.max.base);
  fluid['desktop-ratio'] = setValue(fluid['desktop-ratio'], type.fluid.max.ratio);
  const [minVp, maxVp] = type.fluid.viewports ?? ['25rem', '80rem'];
  fluid['min-viewport'] = setValue(fluid['min-viewport'], minVp, { $type: 'dimension', $description: 'Fluid type starts growing at this viewport (and container) width' });
  fluid['max-viewport'] = setValue(fluid['max-viewport'], maxVp, { $type: 'dimension', $description: 'Fluid type stops growing at this viewport (and container) width' });

  out['font-size'] = out['font-size'] ?? { $type: 'dimension' };
  for (const [n, size] of Object.entries(scaleSteps(type))) {
    out['font-size'][stepKey(+n)] = setValue(out['font-size'][stepKey(+n)], `${size}rem`);
  }

  /* The line-height scale */
  if (type.leading) {
    out['line-height'] = out['line-height'] ?? { $type: 'number' };
    for (const n of Object.keys(leadingSteps(type)).map(Number)) {
      out['line-height'][stepKey(n)] = setValue(out['line-height'][stepKey(n)], leadingCalc(type.leading, n));
    }
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
  if (style.leading !== undefined) out.push([name, 'line-height', `{typography.line-height.${stepKey(style.leading)}}`, 'number']);
  else if (style.lineHeight !== undefined) out.push([name, 'line-height', style.lineHeight, 'number']);
  if (style.letterSpacing) out.push([name, 'letter-spacing', `{typography.spacing.${style.letterSpacing}}`, 'dimension']);
  if (style.case) out.push([name, 'text-transform', style.case, 'string']);

  if (style.size !== undefined) {
    /* label keeps its size on the style itself; the rest use -fixed */
    const fixed = style.sizeOnStyle ? [name, 'font-size'] : [`${name}-fixed`, 'font-size'];
    out.push([...fixed, `{typography.font-size.${stepKey(style.size)}}`, 'dimension']);
  }
  if (style.compact !== undefined) out.push([`${name}-compact`, 'font-size', `{typography.font-size.${stepKey(style.compact)}}`, 'dimension']);
  if (style.fluid !== false && style.size !== undefined) {
    const [from, to] = [style.size, style.growTo];
    out.push([`${name}-fluid`, 'font-size', `{fluid.typography.font-size.${rangeKey(from, to, stepKey)}}`, 'dimension']);
    out.push([`${name}-cq`, 'font-size', `{typography.font-size.cq.${rangeKey(from, to, cqKey)}}`, 'dimension']);
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
        const have = resolveToken(`${group}.${key}`, files);
        /* cq steps exist only in the compiled CSS: compare those as written */
        if (want === undefined || have === undefined ? current.$value === value : sameValue(have, want)) continue;
      }
      put(out, group, key, value, tokenType);
    }
  }
  /* The type inside buttons and fields: a step and a line height for each size */
  for (const [name, { size, leading }] of Object.entries(type.controls ?? {})) {
    out[name]['font-size'].$value = `{typography.font-size.${stepKey(size)}}`;
    out[name]['line-height'].$value = `{typography.line-height.${stepKey(leading)}}`;
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
  const families = Object.fromEntries(
    roles.map((r) => {
      const value = typo['font-family'][r].$value;
      const target = lastKey(refOf(value), 'typography.font-family.');
      if (roles.includes(target)) return [r, { use: target }];
      const system = Object.keys(SYSTEM_STACKS).find((k) => SYSTEM_STACKS[k] === value);
      return [r, system && !target ? { system } : { font: target }];
    }),
  );

  /* Styles: what each one sets today */
  const styles = {};
  for (const name of STYLE_NAMES) {
    const own = semantic[name] ?? {};
    const style = {};
    const famRef = refOf(own['font-family']?.$value);
    if (famRef) style.family = lastKey(resolveRef(famRef, files, 'typography.font-family.'), 'typography.font-family.');
    const weightRef = refOf(own['font-weight']?.$value);
    if (weightRef) style.weight = lastKey(resolveRef(weightRef, files, 'font-weight.'), 'font-weight.');
    if (own['line-height']) {
      const lhRef = resolveRef(refOf(own['line-height'].$value) ?? '', files, 'typography.line-height.');
      const key = lastKey(lhRef, 'typography.line-height.');
      if (key !== undefined) style.leading = key.startsWith('minus-') ? -Number(key.slice(6)) : Number(key);
      else style.lineHeight = round(evalCalc(resolveToken(`${name}.line-height`, files)), 3);
    }
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
    /* Fluid starts at the fixed size and cq follows fluid: only where it ends is the style's */
    if (fluidRef) {
      const f = stepOf(fluidRef);
      if (f.to !== undefined && f.to !== f.from) style.growTo = f.to;
    }
    if (Object.keys(style).length) styles[name] = style;
  }

  return {
    fonts,
    families,
    scale: { base: typo['font-size-base'].$value, ...(parseFloat(typo['font-size-min']?.$value) ? { min: typo['font-size-min'].$value } : {}), ...migratedCeiling(typo), ratio: Number(typo.ratio.$value), steps: [-2, 8] },
    leading: (() => {
      const lh = typo['line-height'];
      const keys = Object.keys(lh).filter((k) => !k.startsWith('$')).map((k) => (k.startsWith('minus-') ? -Number(k.slice(6)) : Number(k)));
      const base = evalCalc(lh['0'].$value);
      return { base, ratio: round(evalCalc(lh['1'].$value) / base, 4), steps: [Math.min(...keys), Math.max(...keys)] };
    })(),
    fluid: {
      viewports: [typo['fluid-scale']['min-viewport']?.$value ?? '25rem', typo['fluid-scale']['max-viewport']?.$value ?? '80rem'],
      max: { base: typo['fluid-scale']['desktop-base'].$value, ratio: Number(typo['fluid-scale']['desktop-ratio'].$value) },
    },
    styles,
  };
};

/* The ceilings the tokens hold, where they aren't the defaults: none
   written means no ceiling, the defaults mean the theme needs no setting */
const migratedCeiling = (typo) => {
  const ceiling = {};
  for (const [end, key] of [['lower', 'font-size-max-small'], ['upper', 'font-size-max-large']]) {
    const value = typo[key]?.$value ?? 0;
    if (value !== CEILINGS[end]) ceiling[end] = value;
  }
  return Object.keys(ceiling).length ? { ceiling } : {};
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
   Same names and clamp() maths as build-tokens.js, so a page that loads
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
    if (family.use) vars[`--typography-font-family-${role}`] = `var(--typography-font-family-${family.use})`;
    else if (family.system) vars[`--typography-font-family-${role}`] = SYSTEM_STACKS[family.system] ?? '';
    else if (family.font) vars[`--typography-font-family-${role}`] = `var(--typography-font-family-${family.font})`;
  }
  vars['--typography-font-italic-settings'] = italicSettings(type) || 'normal';
  for (const [name, { size, leading }] of Object.entries(type.controls ?? {})) {
    vars[`--${name}-font-size`] = `${scaleSteps(type)[size]}rem`;
    vars[`--${name}-line-height`] = String(leadingSteps(type)[leading]);
  }
  const viewports = type.fluid.viewports ?? ['25rem', '80rem'];
  const fluid = fluidSteps(type);
  vars['--typography-font-size-min'] = `${minSize(type)}rem`;
  for (const [end, name] of [['lower', 'small'], ['upper', 'large']]) {
    const size = ceilingSize(type, end);
    vars[`--typography-font-size-max-${name}`] = Number.isFinite(size) ? `${size}rem` : '1000rem';
  }
  for (const [n, size] of Object.entries(scaleSteps(type))) vars[`--typography-font-size-${n}`] = `${size}rem`;
  if (type.leading) for (const n of Object.keys(leadingSteps(type))) vars[`--typography-line-height-${n}`] = leadingCalc(type.leading, +n);
  for (const [n, [min, max]] of Object.entries(fluid)) {
    vars[`--fluid-typography-font-size-${n}`] = fluidClamp(min, max, viewports);
    vars[`--typography-font-size-fluid-${n}`] = fluidClamp(min, max, viewports);
    vars[`--typography-font-size-cq-${n}`] = fluidClamp(min, max, viewports, 'cqi');
  }
  /* The ranges styles grow through (5-8), for both modes */
  for (const style of Object.values(type.styles ?? {})) {
    const [from, to] = [style.size, style.growTo];
    if (from === undefined || to === undefined || to === from || !fluid[from] || !fluid[to]) continue;
    vars[`--typography-font-size-fluid-${from}-${to}`] = fluidClamp(fluid[from][0], fluid[to][1], viewports);
    vars[`--typography-font-size-cq-${from}-${to}`] = fluidClamp(fluid[from][0], fluid[to][1], viewports, 'cqi');
  }
  /* The text styles: each token the style sets, as the compiler names it */
  for (const [name, style] of Object.entries(type.styles ?? {})) {
    for (const [group, key, value] of styleTokens(name, style)) vars[`--${group}-${key}`] = refVar(value);
  }
  return vars;
};

/* {fluid.typography.font-size.2-3} -> var(--typography-font-size-fluid-2-3),
   {typography.font-size.minus-1} -> var(--typography-font-size--1) */
export const refVar = (value) => {
  const ref = refOf(value);
  if (!ref) return String(value);
  const path = ref.replace(/^fluid\.typography\.font-size\./, 'typography.font-size.fluid.');
  return `var(--${path.replace(/minus-/g, '-').replace(/\./g, '-')})`;
};

/* --------------------------------------------------------------------------
   Figma: the text styles, as Tokens Studio typography tokens
   Built from the published Tier 2 tokens, so Figma mirrors what the CSS
   uses. Every style twice: at its fixed size, and under compact/ at its
   compact size. Fluid and cq sizes are web only: Figma has one size per
   style. Each property follows its references down to a Tier 1 token (or a
   Tier 2 weight), since the Tokens Studio sets don't carry every text group.
   A style missing a property takes body's, as the CSS does.
   -------------------------------------------------------------------------- */
const CASE = { none: 'none', uppercase: 'uppercase', lowercase: 'lowercase', capitalize: 'capitalize' };

export const figmaTextStyles = (semantic, { names = STYLE_NAMES } = {}) => {
  const has = (group, key) => semantic[group]?.[key] !== undefined;
  /* {heading.font-family} -> {body.font-family} -> {typography.font-family.sans} */
  const settle = (value) => {
    for (let i = 0, v = value; i < 20; i++) {
      const ref = refOf(v);
      if (!ref || ref.startsWith('font-weight.') || get(semantic, ref) === undefined) return v;
      const node = get(semantic, ref);
      v = node?.$value ?? node;
    }
    return value;
  };
  const prop = (name, key) => settle((has(name, key) ? semantic[name][key] : semantic.body?.[key])?.$value);
  const size = (name, mode) => {
    const group = mode === 'compact' ? `${name}-compact` : has(`${name}-fixed`, 'font-size') ? `${name}-fixed` : name;
    return settle(semantic[group]?.['font-size']?.$value);
  };
  const percent = (v) => `${+(Number(v) * 100).toFixed(2)}%`;
  const em = (v) => (typeof v === 'string' && v.endsWith('em') ? `${+(parseFloat(v) * 100).toFixed(2)}%` : v);

  const styles = { compact: {} };
  for (const name of names) {
    if (!semantic[name] && !semantic[`${name}-fixed`]) continue;
    /* A style without a size of its own (code) is set at body's */
    const sized = size(name, 'fixed') ? name : 'body';
    const lineHeight = prop(name, 'line-height');
    const letterSpacing = prop(name, 'letter-spacing');
    const textCase = CASE[prop(name, 'text-transform')] ?? 'none';
    const base = {
      fontFamily: prop(name, 'font-family'),
      fontWeight: prop(name, 'font-weight'),
      lineHeight: refOf(lineHeight) ? lineHeight : percent(lineHeight),
      ...(letterSpacing !== undefined ? { letterSpacing: em(letterSpacing) } : {}),
      textCase,
    };
    for (const mode of ['fixed', 'compact']) {
      const fontSize = size(sized, mode) ?? size(sized, 'fixed');
      const token = {
        $type: 'typography',
        $value: { ...base, fontSize },
        $description: `${name}${mode === 'compact' ? ', compact' : ''}${sized !== name ? " (body's size)" : ''}. Fluid and container sizes are web only.`,
      };
      if (mode === 'fixed') styles[name] = token;
      else styles.compact[name] = token;
    }
  }
  return styles;
};
