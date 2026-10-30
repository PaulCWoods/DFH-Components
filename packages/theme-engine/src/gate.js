/* ==========================================================================
   Contrast gate
   Resolves the Tier 2 colour roles against a palette, in light and dark, and
   measures every pairing the library relies on. WCAG 2 decides pass or fail
   for gated pairings; APCA is reported alongside as a second opinion.
   ========================================================================== */

import { contrast, apca } from './color.js';
import { applyRoles } from './roles.js';

export const INTENTS = ['accent', 'complementary', 'danger', 'warning', 'success', 'info'];

const get = (obj, path) => path.split('.').reduce((o, k) => (o == null ? undefined : o[k]), obj);
const isHex = (v) => typeof v === 'string' && /^#[0-9a-f]{3}([0-9a-f]{3})?$/i.test(v);

/* Splits light-dark(a, b) at its top-level comma */
const pickMode = (str, mode) => {
  const m = /^light-dark\((.*)\)$/s.exec(str.trim());
  if (!m) return str.trim();
  let depth = 0;
  let i = 0;
  for (; i < m[1].length; i++) {
    const ch = m[1][i];
    if (ch === '(') depth++;
    else if (ch === ')') depth--;
    else if (ch === ',' && depth === 0) break;
  }
  return (mode === 'light' ? m[1].slice(0, i) : m[1].slice(i + 1)).trim();
};

/**
 * Returns resolve(path, mode) -> hex or null. Palette steps replace the
 * Tier 1 ramps; other Tier 1 colours (black, white) come from `global`.
 */
export const resolver = ({ semantic, global, palette }) => {
  const resolve = (path, mode, seen = new Set()) => {
    if (seen.has(path)) return null;
    seen.add(path);
    const [head, hue, step] = path.split('.');
    if (head === 'color' && palette?.[hue]?.[step]) return palette[hue][step].hex;
    let v = get(semantic, path) ?? get(global, path);
    if (v && typeof v === 'object' && '$value' in v) v = v.$value;
    if (typeof v !== 'string') return null;
    const expanded = pickMode(
      v.replace(/\{([^}]+)\}/g, (_, ref) => resolve(ref, mode, new Set(seen)) ?? `?{${ref}}`),
      mode,
    );
    return isHex(expanded) ? expanded : null;
  };
  return resolve;
};

/** The pairings the library relies on: [label, foreground, background, minimum, gated]. */
export const pairings = (intents = INTENTS) => {
  const list = [];
  const canvases = ['surface.default', 'surface.card', 'surface.muted'];
  for (const fg of ['foreground.default', 'foreground.muted'])
    for (const bg of canvases) list.push([fg, bg, 4.5, true]);
  for (const i of intents) {
    for (const bg of [...canvases, `surface.${i}`]) list.push([`foreground.${i}`, bg, 4.5, true]);
    for (const state of ['hover', 'pressed'])
      for (const bg of ['surface.default', 'surface.card']) list.push([`foreground.${i}-${state}`, bg, 4.5, true]);
    list.push(['foreground.inverted', `surface.${i}-strong`, 4.5, true]);
    /* Intent borders sit beside text that carries the meaning: reported, not gated */
    list.push([`border.color.${i}`, 'surface.default', 3, false]);
    list.push([`border.color.${i}`, `surface.${i}`, 3, false]);
  }
  return list;
};

/**
 * Measures every pairing in both modes. `roles` (from the theme) override
 * the semantic file's role values first.
 * @returns {{ rows: object[], failures: object[] }}
 */
export const check = ({ semantic, global, palette, roles, intents = INTENTS }) => {
  const resolve = resolver({ semantic: roles ? applyRoles(semantic, roles) : semantic, global, palette });
  const rows = [];
  for (const mode of ['light', 'dark']) {
    for (const [fg, bg, min, gated] of pairings(intents)) {
      const f = resolve(fg, mode);
      const b = resolve(bg, mode);
      if (!f || !b) continue;
      const ratio = contrast(f, b);
      rows.push({ mode, fg, bg, fgHex: f, bgHex: b, ratio, apca: Math.abs(apca(f, b)), min, gated, pass: ratio >= min });
    }
  }
  return { rows, failures: rows.filter((r) => r.gated && !r.pass) };
};
