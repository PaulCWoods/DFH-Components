/* ==========================================================================
   Component design: Tier 3 choices
   A theme's `components` section holds only what it customises, as
   { "card.radius": "{radius.lg}" }. Every other Tier 3 token keeps its
   default, the fallback where the CSS reads it. These customised tokens are
   all that reach the CSS; Figma gets every Tier 3 value, with these over the
   defaults.
   ========================================================================== */

import { contrast } from './color.js';
import { resolver } from './gate.js';

/* Logical groups for the designer. A new component must join one (a test checks) */
export const COMPONENT_GROUPS = {
  Actions: ['button', 'button-group', 'link', 'block-link', 'menu', 'batch-actions', 'skip-link'],
  Forms: ['input', 'textarea', 'select', 'check', 'switch', 'range', 'range-lockup', 'input-frame', 'combobox', 'field', 'fieldset', 'choice', 'choices', 'form'],
  Surfaces: ['card', 'poster', 'dialog', 'popover', 'tooltip', 'accordion', 'divider'],
  Messages: ['banner', 'banner-dock', 'toast', 'empty-state'],
  Indicators: ['status', 'badge', 'progress', 'meter', 'skeleton', 'spinner'],
  Navigation: ['header', 'footer', 'sidebar', 'navigation-tree', 'breadcrumb', 'pagination', 'stepper', 'tab', 'tab-list', 'tabbed-content'],
  Content: ['prose', 'list', 'table', 'code-block', 'telemetry', 'kbd', 'chip', 'wrapper'],
  Identity: ['avatar', 'thumbnail', 'brand', 'lockup', 'icon', 'icon-box'],
};

const leaves = (node, path = [], type) => {
  if (!node || typeof node !== 'object') return [];
  const here = node.$type ?? type;
  if ('$value' in node) return [{ path: path.join('.'), type: here, value: node.$value, description: node.$description }];
  return Object.entries(node).flatMap(([k, v]) => (k.startsWith('$') ? [] : leaves(v, [...path, k], here)));
};

/* A token's custom property, as the compiler writes it */
export const tokenVar = (path) => `--${path.replace(/\./g, '-').replace(/minus-(\d+)/g, '-$1').replace(/-default(-|$)/, '$1')}`;

/* Every Tier 3 token: its component, the rest of its name, type and default */
export const componentTokens = (component) =>
  Object.entries(component)
    .filter(([k]) => !k.startsWith('$'))
    .flatMap(([name, tree]) => leaves(tree, [name]).map((t) => ({ ...t, component: name, key: t.path.slice(name.length + 1), name: tokenVar(t.path) })));

/* A component's tokens in groups, in a set order: its own look by kind
   (colour, edge, space, type, motion), then its sizes and density. A
   token's group comes from its key; within a group they keep their order. */
export const TOKEN_GROUPS = [
  ['color', 'Colour and surface'],
  ['edge', 'Border, corners and shadow'],
  ['space', 'Space and size'],
  ['type', 'Type'],
  ['motion', 'Motion'],
  ['other', 'Other'],
  ['sm', 'Small'],
  ['lg', 'Large'],
  ['compact', 'Compact'],
];
const groupOf = (key) => {
  if (/(^|[.-])compact([.-]|$)/.test(key)) return 'compact';
  /* A table's column widths are named by size but aren't size variants */
  if (!/(^|-)col-/.test(key) && /(^|[.-])sm([.-]|$)/.test(key)) return 'sm';
  if (!/(^|-)col-/.test(key) && /(^|[.-])lg([.-]|$)/.test(key)) return 'lg';
  if (/transition|timefunc|duration/.test(key)) return 'motion';
  if (/font|line-height|letter-spacing|text-transform|hyphens/.test(key)) return 'type';
  if (key === 'hover-style') return 'color';
  if (/border|radius|ring|rule|shadow|underline|separator|rail|(^|-)style$/.test(key)) return 'edge';
  if (/bg|background|color|(^|-)text$|tint|translucency|filter|scrim|shimmer|hover-style/.test(key)) return 'color';
  if (/padding|gap|size|width|height|inset|offset|indent|space|cushion|aspect|max|min|gutter|target|overlap|lines|margin/.test(key)) return 'space';
  return 'other';
};
export const tokenGroups = (tokens) =>
  TOKEN_GROUPS.map(([id, label]) => ({ id, label, tokens: tokens.filter((t) => groupOf(t.key) === id) })).filter((g) => g.tokens.length);

const isRef = (v) => typeof v === 'string' && /^\{[^{}]+\}$/.test(v);
/* A plain number above 0, never a unit or a reference */
const isNumber = (v) => /^\s*\d*\.?\d+\s*$/.test(String(v)) && Number(v) > 0;
const NUMBER_REFS = ['{icon.base-size}'];
const refOf = (path) => `{${path.replace(/\.default$/, '')}}`;

/* What a token can be set to. Each list holds Tier 2 roles, and Tier 1 steps
   for spacing; `custom` offers a typed value where no list covers the token */
const LISTS = {
  stroke: ['solid', 'dashed', 'dotted', 'double', 'none', '{rule.style}', '{panel.border-style}', '{app.border-style}'],
  textTransform: ['none', 'uppercase', 'lowercase', 'capitalize'],
  hyphens: ['none', 'manual', 'auto'],
  hoverStyle: ['fill', 'tint'],
};
const kindOf = (t) => {
  const key = t.key;
  const def = String(t.value);
  if (t.type === 'color') return 'color';
  if (t.type === 'strokeStyle') return 'stroke';
  if (t.type === 'shadow') return 'shadow';
  if (t.type === 'duration') return 'duration';
  if (t.type === 'fontWeight') return 'weight';
  if (t.type === 'fontFamily' || t.type === 'fontFamilies') return 'family';
  if (t.type === 'border') return 'border';
  if (/text-transform/.test(key)) return 'textTransform';
  if (/hyphens/.test(key)) return 'hyphens';
  if (/hover-style$/.test(key)) return 'hoverStyle';
  if (/line-height/.test(key)) return 'lineHeight';
  if (/z-index/.test(key)) return 'zIndex';
  if (/^\{ease\b/.test(def) || /timing|easing/.test(key)) return 'easing';
  /* A plain number (an icon's size in ems, a count of lines) is typed in,
     as is one that follows another (a Button's icon size, the Icon's) */
  if (t.type === 'number' && (isNumber(t.value) || NUMBER_REFS.includes(def))) return 'number';
  if (t.type === 'dimension') {
    if (/radius/.test(key)) return 'radius';
    if (/font-size/.test(key)) return 'fontSize';
    if (/letter-spacing/.test(key)) return null;
    if (/^\{(border\.width|rule\.width|panel\.border-width|app\.border-width|control\.border-width)/.test(def) || /border-width|thickness/.test(key)) return 'borderWidth';
    return 'space';
  }
  return null;
};

export const tokenOptions = (token, { semantic, global }) => {
  const roles = leaves(semantic);
  const pick = (test) => roles.filter(test).map((r) => refOf(r.path));
  const kind = kindOf(token);
  const lists = {
    color: () => [...pick((r) => r.type === 'color' && !/^shadow\./.test(r.path)), 'transparent', 'currentColor'],
    shadow: () => pick((r) => /^shadow\.(none|sm|md|lg|inner|sm-light|md-light|lg-light|inner-light|raised)$/.test(r.path)),
    duration: () => pick((r) => r.type === 'duration'),
    weight: () => pick((r) => /^font-weight\./.test(r.path)),
    family: () => pick((r) => /\.font-family$/.test(r.path)),
    border: () => pick((r) => r.type === 'border' && /^border\./.test(r.path)),
    radius: () => [...pick((r) => /^radius\./.test(r.path)), '{panel.radius}'],
    borderWidth: () => [...pick((r) => /^border\.width\./.test(r.path)), '{rule.width}', '{panel.border-width}', '{control.border-width}', '{app.border-width}'],
    fontSize: () => pick((r) => /(-fixed|^label|^control(-sm|-lg)?)\b.*\.font-size$/.test(r.path)),
    lineHeight: () => pick((r) => /\.line-height$/.test(r.path)),
    zIndex: () => pick((r) => /^z-index\./.test(r.path)),
    easing: () => pick((r) => /^ease\./.test(r.path)),
    space: () => [
      ...pick((r) => /^spacing\./.test(r.path) && !/^spacing\.\d/.test(r.path)),
      /* App-level sizes: the sidebar column */
      ...pick((r) => /^app\./.test(r.path) && r.type === 'dimension' && !/border/.test(r.path)),
      ...Object.keys(global?.spacing ?? {})
        .filter((k) => !k.startsWith('$'))
        .map((k) => `{spacing.${k}}`),
    ],
  };
  const options = kind && lists[kind] ? lists[kind]() : (LISTS[kind] ?? []);
  /* A default that no list holds (18rem, a calc) may need another typed value;
     a number is always typed */
  const custom = kind !== 'number' && (!options.length || !isRef(token.value));
  /* Roles and Tier 1 steps are told apart where a list has both */
  const unique = [...new Set(options)];
  const isTier1 = (v) => /^\{spacing\.\d/.test(v);
  const isRole = (v) => isRef(v) && !isTier1(v);
  const semanticOptions = unique.filter(isRole);
  const globalOptions = unique.filter(isTier1);
  const keywords = unique.filter((v) => !isRef(v));
  const groups = kind === 'color' ? colorGroups(token, unique) : semanticOptions.length && globalOptions.length ? [{ label: 'Semantic', options: semanticOptions }, { label: 'Global', options: globalOptions }, { label: '', options: keywords }] : [{ label: '', options: unique }];
  return { kind, options: unique, custom, semanticOptions, globalOptions, keywords, groups };
};

/* Colour roles by family, the family the token's name asks for first: a
   border's lines, a background's surfaces, everything else's text */
const COLOR_FAMILIES = [
  { label: 'Text', test: (v) => /^\{foreground\./.test(v) },
  { label: 'Surfaces', test: (v) => /^\{surface\./.test(v) },
  { label: 'Borders and lines', test: (v) => /^\{(border|control|app|panel|rule|underline)\./.test(v) },
  { label: 'Other colours', test: (v) => /^\{color\./.test(v) },
];
const colorGroups = (token, options) => {
  const key = token.key.split('.').pop();
  const first = /border|rule|separator|ring|outline|underline/.test(key) ? 'Borders and lines' : /bg|background|tint|track|shimmer|backdrop|fill/.test(key) ? 'Surfaces' : 'Text';
  const families = [...COLOR_FAMILIES].sort((a, b) => (b.label === first) - (a.label === first));
  const groups = families.map(({ label, test }) => ({ label, options: options.filter(test) }));
  const rest = options.filter((v) => !COLOR_FAMILIES.some(({ test }) => test(v)));
  return [...groups, { label: '', options: rest }].filter((g) => g.options.length);
};

/* A token's value as CSS: references become custom properties */
export const componentValue = (value) => String(value).replace(/\{([^{}]+)\}/g, (_, ref) => `var(${tokenVar(ref)})`);

const readsColor = (t, value) => t?.type === 'color' || t?.type === 'shadow' || t?.type === 'border' || /\{(surface|foreground|border\.color|color|rule\.color|panel\.border-color|app\.border-color|control\.border-color|shadow)\b/.test(String(value));
const readsSpace = (value) => /\{spacing\b/.test(String(value));

/* The stylesheet: customised tokens on :root, then again wherever the roles
   they read change, since a value resolved on :root wouldn't follow them */
export const componentCss = (overrides = {}, component = {}) => {
  const tokens = new Map(componentTokens(component).map((t) => [t.path, t]));
  const entries = Object.entries(overrides).sort(([a], [b]) => a.localeCompare(b));
  const decl = (list, pad) => list.map(([path, value]) => `${pad}${tokenVar(path)}: ${componentValue(value)};`).join('\n');
  const head = '/* Generated from the components section of the default theme by npm run build:themes (or Publish). Do not edit. */\n';
  if (!entries.length) return head;
  const colors = entries.filter(([p, v]) => readsColor(tokens.get(p), v));
  const sizes = entries.filter(([, v]) => readsSpace(v));
  const parts = [`:root {\n${decl(entries, '  ')}\n}`];
  if (colors.length) parts.push(`:where(.color-palette-inverted, .colors-inverted) {\n${decl(colors, '  ')}\n}\n\n* {\n  @container style(--color-palette: inverted) {\n${decl(colors, '    ')}\n  }\n}`);
  if (sizes.length) parts.push(`:where(.ui-compact, .fine\\:ui-compact) {\n${decl(sizes, '  ')}\n}\n\n* {\n  @container style(--ui-sizing: compact) {\n${decl(sizes, '    ')}\n  }\n}`);
  return `${head}\n${parts.join('\n\n')}\n`;
};

/* Tier 3 for Figma: every default, with the customised values over them */
export const applyComponents = (component, overrides = {}) => {
  const out = structuredClone(component);
  for (const [path, value] of Object.entries(overrides)) {
    const node = path.split('.').reduce((o, k) => o?.[k], out);
    if (node && '$value' in node) node.$value = value;
  }
  return out;
};

const exists = (ref, trees) =>
  trees.some((tree) => {
    const node = ref.split('.').reduce((o, k) => o?.[k], tree);
    return node && typeof node === 'object' && ('$value' in node || '$value' in (node.default ?? {}));
  });

/* The text a background carries, and the background a text colour sits on.
   Names that aren't text (borders, rings, tracks, markers) aren't measured. */
const NOT_TEXT = /border|ring|rule|track|indicator|shadow|underline|backdrop|separator|shimmer|skeleton|^color-strong|rail|on-color|off-color|optimum|critical/;
const isBg = (key) => /(^|-)(bg|background-color)$/.test(key) && !NOT_TEXT.test(key);
const isText = (key) => /(^|-)color$/.test(key) && !isBg(key) && !NOT_TEXT.test(key);
const siblings = (t, values, test) => {
  const prefix = t.key.replace(/(bg|background-color|color)$/, '');
  return ['color', 'text-color', 'bg', 'background-color'].map((s) => `${t.component}.${prefix}${s}`).filter((p) => p !== t.path && values.has(p) && test(p.slice(t.component.length + 1)));
};

/* Fails: a token that doesn't exist, a reference to nothing, a number that
   isn't a plain positive number, a value that could break out of its
   declaration, a text and background pair of the same part
   under 4.5:1. Warns: a colour measured only against the page's own text or
   surface, since the real pairing isn't in the token's name. */
export const componentGate = (overrides = {}, { component, semantic, global, palette } = {}) => {
  const failures = [];
  const warnings = [];
  const tokens = componentTokens(component);
  const known = new Map(tokens.map((t) => [t.path, t]));
  const values = new Map(tokens.map((t) => [t.path, t.value]));
  for (const [path, value] of Object.entries(overrides)) values.set(path, value);
  const resolve = semantic ? resolver({ semantic, global, palette }) : null;
  /* A value as hex in a mode, through any Tier 3 references; null when it isn't a plain colour */
  const hex = (value, mode, seen = 0) => {
    if (!isRef(value) || seen > 8) return null;
    const ref = value.slice(1, -1);
    if (values.has(ref)) return hex(values.get(ref), mode, seen + 1);
    return resolve(ref, mode) ?? resolve(`${ref}.default`, mode);
  };
  const measure = (a, b, mode) => {
    const [x, y] = [hex(a, mode), hex(b, mode)];
    return x && y ? contrast(x, y) : null;
  };
  for (const [path, value] of Object.entries(overrides)) {
    const token = known.get(path);
    if (!token) {
      failures.push({ style: path, message: "isn't a Tier 3 token" });
      continue;
    }
    const text = String(value);
    if (kindOf(token) === 'number') {
      if (!isNumber(text)) failures.push({ style: path, message: `must be a plain number above 0, with no unit: ${text}` });
      continue;
    }
    if (!text.trim() || /[;<>]/.test(text.replace(/\{[^{}]+\}/g, '')) || /[{}]/.test(text.replace(/\{[^{}]+\}/g, '')) || (text.match(/\(/g) ?? []).length !== (text.match(/\)/g) ?? []).length) {
      failures.push({ style: path, message: `can't be used as a value: ${text}` });
      continue;
    }
    for (const [, ref] of text.matchAll(/\{([^{}]+)\}/g)) {
      if (!exists(ref, [semantic, global, component].filter(Boolean))) failures.push({ style: path, message: `reads {${ref}}, which doesn't exist` });
    }
    if (!resolve || (!isBg(token.key) && !isText(token.key))) continue;
    const bg = isBg(token.key);
    /* A pair that isn't a plain colour (transparent) shows the page through */
    const pairs = siblings(token, values, (k) => (bg ? isText(k) : isBg(k))).filter((p) => hex(values.get(p), 'light') !== null);
    for (const mode of ['light', 'dark']) {
      if (pairs.length) {
        for (const pair of pairs) {
          const ratio = measure(value, values.get(pair), mode);
          if (ratio !== null && ratio < 4.5) failures.push({ style: path, message: `on ${tokenVar(pair)} is ${ratio.toFixed(2)}:1 in ${mode} mode, under 4.5:1` });
        }
      } else {
        const against = bg ? '{foreground}' : '{surface}';
        const ratio = measure(value, against, mode);
        if (ratio !== null && ratio < 4.5) warnings.push({ style: path, message: `against ${against} is ${ratio.toFixed(2)}:1 in ${mode} mode. Check what it sits with.` });
      }
    }
  }
  return { failures, warnings };
};
