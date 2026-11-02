/* ==========================================================================
   High contrast (prefers-contrast: more)
   --------------------------------------------------------------------------
   Writes the $media "(prefers-contrast: more)" block of 2-semantic.json from
   the theme, so it follows the palette. Each colour role moves `steps` steps
   along its ramp, away from what it's paired with: text and borders away
   from the surfaces they sit on, surfaces away from the text on them. On a
   light page that's text darker and surfaces lighter, the other way in
   dark mode, and an inverted role goes its own way. A neutral that runs off
   its ramp becomes white or black; other hues stop at their ends. Each mix
   loses one translucency step per step. `extra` adds anything else as
   written ({ "opacity.muted": "{opacity.90}" }).
   ========================================================================== */

import { contrast, luminance } from './color.js';
import { check, pairings } from './gate.js';
import { roleValue } from './roles.js';
import { mixValue } from './mix.js';

export const CONTRAST_QUERY = '(prefers-contrast: more)';
const MODES = ['light', 'dark'];
const get = (obj, path) => path.split('.').reduce((o, k) => (o == null ? undefined : o[k]), obj);

const hexer = ({ palette, global }) => (colour) => {
  const [hue, step] = colour.split('.');
  return step ? palette[hue]?.[step]?.hex : get(global, `color.${hue}`)?.$value;
};

/* Each ramp's steps, lightest first */
const ordered = (palette) => Object.fromEntries(Object.entries(palette).map(([hue, ramp]) => [hue, Object.keys(ramp).sort((a, b) => luminance(ramp[b].hex) - luminance(ramp[a].hex))]));

const shift = (colour, lighter, steps, order) => {
  const [hue, step] = colour.split('.');
  if (!step || !order[hue]) return colour;
  const i = order[hue].indexOf(step) + (lighter ? -steps : steps);
  if (i < 0) return hue === 'neutral' ? 'white' : `${hue}.${order[hue][0]}`;
  if (i >= order[hue].length) return hue === 'neutral' ? 'black' : `${hue}.${order[hue].at(-1)}`;
  return `${hue}.${order[hue][i]}`;
};

/* What each role is measured against: its pairings, or else the page for
   text and borders, and for a surface whichever of the page's text and the
   inverted text reads better on it */
const counterparts = (path, mode, theme, hex) => {
  const out = pairings().flatMap(([fg, bg]) => (fg === path ? [bg] : bg === path ? [fg] : []));
  if (out.length) return [...new Set(out)];
  if (!path.startsWith('surface.')) return ['surface.default'];
  const own = hex(theme.roles[path][mode]);
  const reads = (p) => contrast(own, hex(theme.roles[p][mode]));
  return [reads('foreground.default') >= reads('foreground.inverted') ? 'foreground.default' : 'foreground.inverted'];
};

/** The roles that move: { path: { light, dark } } */
export const contrastRoles = (theme, { global, palette }) => {
  const steps = theme.contrast?.steps ?? 1;
  if (!steps) return {};
  const hex = hexer({ palette, global });
  const order = ordered(palette);
  const out = {};
  for (const [path, role] of Object.entries(theme.roles)) {
    const moved = {};
    for (const mode of MODES) {
      const own = hex(role[mode]);
      const others = counterparts(path, mode, theme, hex).map((p) => theme.roles[p]?.[mode]).filter(Boolean).map(hex).filter(Boolean);
      const lighter = others.length ? luminance(own) >= others.reduce((s, h) => s + luminance(h), 0) / others.length : luminance(own) > 0.18;
      moved[mode] = shift(role[mode], lighter, steps, order);
    }
    if (moved.light !== role.light || moved.dark !== role.dark) out[path] = moved;
  }
  return out;
};

/** The mixes that change: one translucency step more solid per step */
export const contrastMixes = (theme, { global }) => {
  const steps = theme.contrast?.steps ?? 1;
  const scale = [0, ...Object.keys(global.translucency).filter((k) => /^\d+$/.test(k)).map(Number).sort((a, b) => a - b)];
  const out = {};
  for (const [path, entry] of Object.entries(theme.mixes ?? {})) {
    const moved = Object.fromEntries(MODES.map((mode) => [mode, { ...entry[mode], transparent: scale[Math.max(0, scale.indexOf(entry[mode].transparent) - steps)] }]));
    if (MODES.some((m) => moved[m].transparent !== entry[m].transparent)) out[path] = moved;
  }
  return out;
};

const put = (obj, path, value) => {
  const keys = path.split('.');
  let node = obj;
  for (const k of keys.slice(0, -1)) node = node[k] ??= {};
  node[keys.at(-1)] = { $value: value };
};

/** 2-semantic.json with the high-contrast block written from the theme */
export const applyContrast = (semantic, theme, ctx) => {
  const out = structuredClone(semantic);
  const block = {};
  for (const [path, role] of Object.entries(contrastRoles(theme, ctx))) put(block, path, roleValue(role));
  for (const [path, entry] of Object.entries(contrastMixes(theme, ctx))) put(block, path, mixValue(entry));
  for (const [path, value] of Object.entries(theme.contrast?.extra ?? {})) put(block, path, value);
  out.$media = { ...out.$media, [CONTRAST_QUERY]: block };
  return out;
};

/* The gate: high contrast never lowers a pairing; text under 7:1 (AAA) is reported */
export const contrastGate = (theme, { semantic, global, palette }) => {
  const before = check({ semantic, global, palette, roles: theme.roles }).rows;
  const after = check({ semantic, global, palette, roles: { ...theme.roles, ...contrastRoles(theme, { global, palette }) } }).rows;
  const key = (r) => `${r.mode} ${r.fg} ${r.bg}`;
  const was = new Map(before.map((r) => [key(r), r.ratio]));
  const rows = [];
  for (const r of after) {
    const style = `${r.fg} on ${r.bg}`;
    if (r.ratio < was.get(key(r)) - 0.005) rows.push({ level: 'fail', rule: 'contrast', mode: r.mode, style, message: `drops from ${was.get(key(r)).toFixed(2)}:1 to ${r.ratio.toFixed(2)}:1 in ${r.mode} mode` });
    else if (r.gated && r.min >= 4.5 && r.ratio < 7) rows.push({ level: 'report', rule: 'contrast', mode: r.mode, style, message: `${r.ratio.toFixed(2)}:1 in ${r.mode} mode, under 7:1 (AAA)` });
  }
  return { rows, after, failures: rows.filter((r) => r.level === 'fail'), reports: rows.filter((r) => r.level === 'report') };
};


