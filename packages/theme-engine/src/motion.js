/* ==========================================================================
   Motion: durations and easings
   --------------------------------------------------------------------------
   Reads the `motion` section of tokens/theme.json and writes the duration and
   ease roles of 2-semantic.json, adding the Tier 1 duration steps they point
   at to 1-global.json (steps are added, never removed). duration.none stays 0,
   and prefers-reduced-motion still takes every duration to it.
   ========================================================================== */

export const DURATION_ROLES = ['sm', 'md', 'lg', 'xl'];
export const EASE_ROLES = ['in-out', 'in', 'out', 'bounce'];
export const DURATION_CHOICES = [0.1, 0.15, 0.2, 0.25, 0.3, 0.4, 0.5, 0.75, 1, 1.5, 2, 3];

/* Tier 1 names a step by its seconds without the point: 0.2s is 02 */
const stepKey = (seconds) => String(seconds).replace('.', '');
const BEZIER = /^cubic-bezier\(\s*(-?[\d.]+)\s*,\s*(-?[\d.]+)\s*,\s*(-?[\d.]+)\s*,\s*(-?[\d.]+)\s*\)$/;

export const motionGlobal = (global, motion) => {
  const out = structuredClone(global);
  for (const r of DURATION_ROLES) out.duration[stepKey(motion.duration[r])] ??= { $value: `${motion.duration[r]}s` };
  return out;
};

export const applyMotion = (semantic, motion) => {
  const out = structuredClone(semantic);
  for (const r of DURATION_ROLES) out.duration[r].$value = `{duration.${stepKey(motion.duration[r])}}`;
  for (const r of EASE_ROLES) out.ease[r].$value = motion.ease[r];
  return out;
};

export const motionGate = (motion) => {
  const rows = [];
  const fail = (style, message) => rows.push({ level: 'fail', rule: 'motion', style, message });
  DURATION_ROLES.forEach((r, i) => {
    const v = motion.duration[r];
    if (!Number.isFinite(v) || v <= 0) fail(`duration ${r}`, `${v}s isn't a length of time`);
    else if (i && v < motion.duration[DURATION_ROLES[i - 1]]) fail(`duration ${r}`, `shorter than ${DURATION_ROLES[i - 1]}`);
  });
  for (const r of EASE_ROLES) {
    const m = BEZIER.exec(motion.ease[r] ?? '');
    if (!m) fail(`ease ${r}`, "isn't a cubic-bezier(x1, y1, x2, y2)");
    else if ([m[1], m[3]].some((x) => +x < 0 || +x > 1)) fail(`ease ${r}`, 'its x values have to be from 0 to 1');
  }
  return { rows, failures: rows, reports: [] };
};

export const motionCssVars = (motion) => ({
  ...Object.fromEntries(DURATION_ROLES.map((r) => [`--duration-${r}`, `${motion.duration[r]}s`])),
  ...Object.fromEntries(EASE_ROLES.map((r) => [`--ease-${r}`, motion.ease[r]])),
});
