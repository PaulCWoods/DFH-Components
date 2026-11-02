/* ==========================================================================
   Mixes: the colours made from another colour
   --------------------------------------------------------------------------
   Reads the `mixes` section of tokens/theme.json and writes the Tier 2 tints
   the roles can't name: quiet lines, the backdrop, translucent surfaces. Each
   names a colour and how transparent it goes, for light and for dark:
   { "light": { "color": "currentColor", "transparent": 50 }, "dark": … }.
   A colour is currentColor, a palette colour (hue.step, white, black) or
   another token (color.muted, surface.inverted). Transparent 0 is the colour
   as it is; any other value is a translucency step.
   ========================================================================== */

import { contrast, hexToRgb, rgbToHex } from './color.js';
import { applyRoles, colourExists } from './roles.js';
import { resolver } from './gate.js';

export const MIX_TOKENS = ['color.muted', 'color.quiet', 'color.focus', 'color.backdrop', 'color.overlay', 'surface.layer', 'surface.translucent', 'surface.translucent-strong', 'surface.shade', 'border.color.default', 'border.color.muted', 'border.color.quiet', 'border.color.control'];
export const MIX_BASES = ['currentColor', 'color.muted', 'color.quiet', 'surface.default', 'surface.inverted'];

/* What can't be seen fails: a control's edge (WCAG 1.4.11), the focus ring (2.4.11) */
const AT_LEAST_3 = ['border.color.control', 'color.focus'];
const BACKGROUNDS = ['surface.default', 'surface.card'];

const isToken = (color) => /^(color|surface)\./.test(color);
const get = (obj, path) => path.split('.').reduce((o, k) => (o == null ? undefined : o[k]), obj);

const baseRef = (color) => (color === 'currentColor' ? color : isToken(color) ? `{${color.replace(/\.default$/, '')}}` : `{color.${color}}`);
const mix = ({ color, transparent }) => (transparent ? `color-mix(in srgb, ${baseRef(color)}, transparent {translucency.${transparent}})` : baseRef(color));

/** The $value a mix takes: one colour when both modes match, light-dark() otherwise. */
export const mixValue = ({ light, dark }) => (mix(light) === mix(dark) ? mix(light) : `light-dark(${mix(light)}, ${mix(dark)})`);

export const applyMixes = (semantic, mixes = {}) => {
  const out = structuredClone(semantic);
  for (const [path, entry] of Object.entries(mixes)) get(out, path).$value = mixValue(entry);
  if (mixes['surface.layer']) out['surface-layer'].translucency.$value = `{translucency.${mixes['surface.layer'].light.transparent}}`;
  return out;
};

const blend = (top, bottom, transparent) => {
  const a = hexToRgb(top);
  const b = hexToRgb(bottom);
  return rgbToHex(a.map((v, i) => v + (b[i] - v) * (transparent / 100)));
};

export const mixGate = (mixes = {}, { semantic, global, palette, roles } = {}) => {
  const rows = [];
  const fail = (style, message) => rows.push({ level: 'fail', rule: 'mix', style, message });
  const steps = Object.keys(global?.translucency ?? {}).filter((k) => !k.startsWith('$'));
  const valid = (color) => MIX_BASES.includes(color) || (!isToken(color) && colourExists(color, palette, global));

  for (const path of MIX_TOKENS) {
    if (!mixes[path]) fail(path, 'is missing');
    else {
      for (const mode of ['light', 'dark']) {
        const { color, transparent } = mixes[path][mode];
        if (!valid(color)) fail(path, `${color} in ${mode} mode isn't a colour`);
        if (transparent && !steps.includes(String(transparent))) fail(path, `${transparent}% in ${mode} mode isn't a translucency step`);
        /* color.* tokens are what the others are made from, so they can't read each other */
        if (path.startsWith('color.') && /^color\./.test(color)) fail(path, `can't be made from ${color}`);
        if (path === color) fail(path, "can't be made from itself");
      }
    }
  }
  if (rows.length || !palette) return { rows, failures: rows, reports: [] };

  const resolve = resolver({ semantic: applyRoles(semantic, roles), global, palette });
  const hexOf = (path, mode, background) => {
    const { color, transparent } = mixes[path][mode];
    const base = color === 'currentColor' ? resolve('foreground.default', mode) : mixes[color] ? hexOf(color, mode, background) : resolve(isToken(color) ? color : `color.${color}`, mode);
    return base && transparent ? blend(base, background, transparent) : base;
  };
  for (const path of AT_LEAST_3) {
    for (const mode of ['light', 'dark']) {
      for (const on of BACKGROUNDS) {
        const background = resolve(on, mode);
        const hex = background && hexOf(path, mode, background);
        const ratio = hex ? contrast(hex, background) : 3;
        if (ratio < 3) fail(path, `${ratio.toFixed(2)}:1 on ${on} in ${mode} mode, under 3:1`);
      }
    }
  }
  return { rows, failures: rows, reports: [] };
};

/* The preview's custom properties. hexOf turns a palette colour into a value. */
export const mixCssVars = (mixes, hexOf) => {
  const name = (path) => `--${path.replaceAll('.', '-').replace(/-default$/, '')}`;
  const base = (color) => (color === 'currentColor' ? color : isToken(color) ? `var(${name(color)})` : hexOf(color));
  const css = ({ color, transparent }) => (transparent ? `color-mix(in srgb, ${base(color)}, transparent ${transparent}%)` : base(color));
  return Object.fromEntries(Object.entries(mixes).map(([path, { light, dark }]) => [name(path), `light-dark(${css(light)}, ${css(dark)})`]));
};
