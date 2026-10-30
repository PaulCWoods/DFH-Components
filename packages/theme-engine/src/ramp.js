/* ==========================================================================
   Ramps
   A ramp starts from a picked colour. Its hue and chroma make the 500 step;
   its lightness gives way to the curve. One lightness curve, shared by every
   hue, runs from the light end (100) to the dark end (900), so every hue has
   the same lightness at the same step. Chroma peaks at 500 and tapers towards
   the ends; each step is capped to stay in sRGB.
   A hue set to `exact` keeps the picked colour itself as its 500, and its
   curve bends to pass through the picked lightness there: each half keeps
   the curve's shape, squeezed or stretched to meet it.
   ========================================================================== */

import { easing } from './curve.js';
import { hexToOklch, maxChroma, oklchToHex, formatOklch } from './color.js';

export const STEPS = ['100', '200', '300', '400', '500', '600', '700', '800', '900'];

/* The names roles depend on: surfaces and text, danger, warning, success */
export const FIXED_HUES = ['neutral', 'red', 'amber', 'green'];

const smooth = (x) => x * x * (3 - 2 * x);

/** Share of the picked chroma a step keeps: 1 at 500, `light` at 100, `dark` at 900. */
export const chromaShare = (t, { light = 0.2, dark = 0.65 } = {}) =>
  t <= 0.5 ? light + (1 - light) * smooth(t / 0.5) : dark + (1 - dark) * smooth((1 - t) / 0.5);

/* How far a pinned 500 may sit from either end, as a share of the range */
const PIN_MARGIN = 0.05;

/**
 * The curve's position (0 at 100, 1 at 900) for each point along it. With
 * `pin` (a lightness), the curve passes through the pin at the middle (500):
 * the light half is scaled to end there and the dark half to start there. A
 * pin beyond the ends is held just inside them.
 */
export const bentEasing = ({ curve = 'linear', ends = { light: 0.97, dark: 0.27 }, pin } = {}) => {
  const f = easing(curve);
  if (pin == null) return f;
  const m = f(0.5);
  const target = Math.min(1 - PIN_MARGIN, Math.max(PIN_MARGIN, (ends.light - pin) / (ends.light - ends.dark)));
  return (t) => {
    const y = f(t);
    return t <= 0.5 ? (m > 0 ? (y / m) * target : target * 2 * t) : m < 1 ? target + ((y - m) / (1 - m)) * (1 - target) : target + (1 - target) * (2 * t - 1);
  };
};

/** The lightness of each step for a curve and its two ends, bent through `pin` at 500 when set. */
export const lightnesses = ({ curve = 'linear', ends = { light: 0.97, dark: 0.27 }, pin } = {}) => {
  const f = bentEasing({ curve, ends, pin });
  return STEPS.map((_, i) => ends.light + (ends.dark - ends.light) * f(i / (STEPS.length - 1)));
};

const swatch = (l, c, h) => {
  const fit = Math.min(c, maxChroma(l, h));
  return { hex: oklchToHex({ l, c: fit, h }), oklch: formatOklch({ l, c: fit, h }), l, c: fit, h, capped: fit < c - 1e-4 };
};

/**
 * Builds one ramp.
 * @param {object} o
 * @param {string} o.seed     The picked colour (hex).
 * @param {string} o.curve    The shared lightness curve.
 * @param {object} o.ends     { light, dark } lightness at 100 and 900.
 * @param {object} o.chroma   { light, dark } chroma share at 100 and 900.
 * @param {object} [o.outside] Extra steps beyond the curve's ends, by how much lighter than 100 (000)
 *   or darker than 900 (1000) they are: { '000': 0.02, '1000': 0.04 }. They follow the ends, and
 *   stay within 0 and 1.
 * @param {boolean} [o.exact] Keep the picked colour itself as the 500, and bend the
 *   curve through its lightness so the other steps lead to it.
 * @returns {Record<string, {hex, oklch, l, c, h, capped}>}
 */
export const buildRamp = ({ seed, curve, ends, chroma, outside = {}, exact = false }) => {
  const picked = hexToOklch(seed);
  const { c, h } = picked;
  const ls = lightnesses({ curve, ends, pin: exact ? picked.l : undefined });
  const ramp = {};
  STEPS.forEach((step, i) => {
    ramp[step] = swatch(ls[i], c * chromaShare(i / (STEPS.length - 1), chroma), h);
  });
  if (exact) {
    ramp['500'] = { hex: seed.toLowerCase(), oklch: formatOklch(picked), ...picked, capped: false };
  }
  for (const [step, by] of Object.entries(outside)) {
    const light = Number(step) < Number(STEPS[0]);
    const l = light ? Math.min(1, ends.light + by) : Math.max(0, ends.dark - by);
    ramp[step] = swatch(l, c * (light ? (chroma?.light ?? 0.2) : (chroma?.dark ?? 0.65)), h);
  }
  return ramp;
};

/**
 * Builds every ramp in a theme. Each hue takes the theme's curve, ends and
 * chroma unless it sets its own; `exact` is the hue's alone.
 */
export const buildPalette = (theme) => {
  const missing = FIXED_HUES.filter((n) => !theme.hues?.[n]);
  if (missing.length) throw new Error(`The theme must define: ${missing.join(', ')}`);
  const palette = {};
  for (const [name, hue] of Object.entries(theme.hues)) {
    if (!/^[a-z][a-z0-9-]*$/.test(name)) throw new Error(`Hue names are lower-case words: ${name}`);
    palette[name] = buildRamp({
      seed: hue.seed,
      curve: hue.curve ?? theme.curve,
      ends: { ...theme.ends, ...hue.ends },
      chroma: { ...theme.chroma, ...hue.chroma },
      outside: hue.outside,
      exact: hue.exact ?? false,
    });
  }
  return palette;
};
