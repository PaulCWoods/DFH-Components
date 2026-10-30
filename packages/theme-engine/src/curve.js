/* ==========================================================================
   Lightness curves, written as CSS easing functions.
   'linear', a preset name, or 'cubic-bezier(x1, y1, x2, y2)'. The curve maps
   a step's position along the ramp (0 = lightest, 1 = darkest) to how far its
   lightness has travelled between the two ends.
   ========================================================================== */

export const PRESETS = {
  /* Even steps */
  linear: 'linear',
  /* Gentle at both ends, steeper in the middle */
  s: 'cubic-bezier(0.45, 0, 0.55, 1)',
  /* A softer S: keeps the darkest steps apart */
  'soft-s': 'cubic-bezier(0.3, 0.05, 0.7, 0.95)',
  /* Steeper at both ends, gentle in the middle */
  'reverse-s': 'cubic-bezier(0, 0.45, 1, 0.55)',
  /* Gentle in the light steps, steeper in the dark */
  'ease-in': 'cubic-bezier(0.42, 0, 1, 1)',
  /* Steeper in the light steps, gentle in the dark */
  'ease-out': 'cubic-bezier(0, 0, 0.58, 1)',
};

/** Parses a curve into [x1, y1, x2, y2], or null for linear. */
export const parseCurve = (curve = 'linear') => {
  const value = PRESETS[curve] ?? curve;
  if (value === 'linear') return null;
  const m = /^cubic-bezier\(\s*([^)]+)\)$/.exec(value);
  if (!m) throw new Error(`Unknown curve: ${curve}`);
  const p = m[1].split(',').map(Number);
  if (p.length !== 4 || p.some(Number.isNaN)) throw new Error(`Bad cubic-bezier: ${curve}`);
  if (p[0] < 0 || p[0] > 1 || p[2] < 0 || p[2] > 1) throw new Error(`cubic-bezier x values must be 0..1: ${curve}`);
  return p;
};

const bezier = (t, a, b) => 3 * a * t * (1 - t) ** 2 + 3 * b * t ** 2 * (1 - t) + t ** 3;

/** Returns f(x) for the curve, x and f(x) in 0..1. */
export const easing = (curve) => {
  const p = parseCurve(curve);
  if (!p) return (x) => x;
  const [x1, y1, x2, y2] = p;
  return (x) => {
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    /* Solve bezierX(t) = x by bisection; x(t) is monotonic for x1, x2 in 0..1 */
    let lo = 0;
    let hi = 1;
    for (let i = 0; i < 40; i++) {
      const mid = (lo + hi) / 2;
      if (bezier(mid, x1, x2) < x) lo = mid;
      else hi = mid;
    }
    return bezier((lo + hi) / 2, y1, y2);
  };
};
