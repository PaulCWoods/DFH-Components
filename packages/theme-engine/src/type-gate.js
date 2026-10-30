/* ==========================================================================
   Type gate: checks a `type` theme before it is written
   --------------------------------------------------------------------------
   Fails block --write and Publish; reports are shown but don't block.

   Fail:   a reference to a step, family, font, weight or letter spacing
           that doesn't exist; a scale that doesn't increase step to step;
           a hierarchy out of order in any mode; a compact size larger than
           the fixed one; a fluid or cq size whose largest value is more
           than 2.5 times its smallest (zoom to 200% couldn't double it,
           WCAG 1.4.4).
   Report: a size below 12px; body text line height below 1.5 (WCAG
           1.4.8); a heading line height above body's; a cq size that
           differs from the fluid one; two styles of the same kind that
           differ only in weight or case at the same size; a style whose
           weight its font doesn't load (the browser fakes it or falls back).
   ========================================================================== */

import { SYSTEM_STACKS, fluidSteps, fontCovers, fontWeights, leadingSteps, resolveToken, roleFont, scaleSteps, styleLeading } from './type.js';

export const HIERARCHY = ['display-title', 'title', 'heading', 'subheading', 'small-heading'];
export const HEADINGS = [...HIERARCHY, 'micro-heading'];
export const BODY = ['body-lg', 'body', 'body-sm', 'body-xs'];
export const FLUID_LIMIT = 2.5;
export const FLOOR_PX = 12;

const names = (group) => Object.keys(group ?? {}).filter((k) => !k.startsWith('$'));
const px = (r) => +(r * 16).toFixed(1);

/* A style's sizes in rem, per mode. Fluid and cq are [smallest, largest]. */
export const styleSizes = (type, style) => {
  if (style.size === undefined) return null;
  const fixed = scaleSteps(type);
  const fluid = fluidSteps(type);
  const range = (from, to = from) => (fluid[from] && fluid[to] ? [fluid[from][0], fluid[to][1]] : null);
  const out = { fixed: fixed[style.size], compact: fixed[style.compact ?? style.size] };
  if (style.fluid !== false) {
    out.fluid = range(style.size, style.growTo);
    const cq = style.cq ?? { from: style.size, to: style.growTo };
    out.cq = range(cq.from, cq.to);
  }
  return out;
};

export const typeGate = (type, { semantic = {}, global = {} } = {}) => {
  const rows = [];
  const fail = (rule, style, message) => rows.push({ level: 'fail', rule, style, message });
  const report = (rule, style, message) => rows.push({ level: 'report', rule, style, message });
  const styles = type.styles ?? {};
  const [lo, hi] = type.scale.steps ?? [-2, 8];
  const inScale = (n) => Number.isInteger(n) && n >= lo && n <= hi;

  /* References. A style with a step off the scale has no sizes to check. */
  const offScale = new Set();
  const fonts = names(type.fonts);
  for (const [role, family] of Object.entries(type.families ?? {})) {
    if (family.font != null && !fonts.includes(family.font)) fail('reference', role, `family ${role} uses font "${family.font}", which isn't in fonts`);
    if (family.system && !SYSTEM_STACKS[family.system]) fail('reference', role, `family ${role} uses system stack "${family.system}", which isn't one of ${Object.keys(SYSTEM_STACKS).join(', ')}`);
    if (family.use) {
      if (!type.families[family.use]) fail('reference', role, `family ${role} uses family "${family.use}", which doesn't exist`);
      for (let r = role, seen = new Set(); type.families[r]?.use; r = type.families[r].use) {
        if (seen.has(r)) {
          fail('reference', role, `family ${role} goes round in a loop of "same as" families`);
          break;
        }
        seen.add(r);
      }
    }
  }
  const families = names(type.families);
  const weights = names(semantic['font-weight']);
  const spacings = names(global.typography?.spacing);
  for (const [name, s] of Object.entries(styles)) {
    if (s.family && !families.includes(s.family)) fail('reference', name, `family "${s.family}" isn't one of ${families.join(', ')}`);
    if (s.weight && weights.length && !weights.includes(s.weight)) fail('reference', name, `weight "${s.weight}" isn't one of ${weights.join(', ')}`);
    if (s.letterSpacing && spacings.length && !spacings.includes(s.letterSpacing)) fail('reference', name, `letter spacing "${s.letterSpacing}" isn't one of ${spacings.join(', ')}`);
    for (const [field, n] of [['size', s.size], ['compact', s.compact], ['growTo', s.growTo], ['cq from', s.cq?.from], ['cq to', s.cq?.to]]) {
      if (n !== undefined && !inScale(n)) {
        fail('reference', name, `${field} step ${n} is outside the scale (${lo} to ${hi})`);
        offScale.add(name);
      }
    }
    if (s.lineHeight !== undefined && !(s.lineHeight > 0)) fail('reference', name, `line height ${s.lineHeight} isn't a positive number`);
    if (s.leading !== undefined && leadingSteps(type)[s.leading] === undefined) fail('reference', name, `line height step ${s.leading} isn't on the line-height scale`);
  }

  /* The line-height scale tightens step by step downward */
  if (type.leading && !(type.leading.ratio > 1)) fail('scale', null, `line-height ratio ${type.leading.ratio} isn't above 1`);

  /* The scale increases step to step, fixed and at both ends of the range */
  const fixed = scaleSteps(type);
  const fluid = fluidSteps(type);
  for (let n = lo + 1; n <= hi; n++) {
    if (!(fixed[n] > fixed[n - 1])) fail('scale', null, `fixed step ${n} (${px(fixed[n])}px) isn't larger than step ${n - 1}`);
    if (!(fluid[n][0] > fluid[n - 1][0])) fail('scale', null, `step ${n} at the smallest viewport isn't larger than step ${n - 1}`);
    if (!(fluid[n][1] > fluid[n - 1][1])) fail('scale', null, `step ${n} at the largest viewport isn't larger than step ${n - 1}`);
  }

  /* Each style's sizes: compact, fluid growth and the floor */
  const sizes = Object.fromEntries(Object.entries(styles).filter(([name]) => !offScale.has(name)).map(([name, s]) => [name, styleSizes(type, s)]).filter(([, v]) => v));
  for (const [name, sz] of Object.entries(sizes)) {
    if (sz.compact > sz.fixed) fail('compact', name, `compact (${px(sz.compact)}px) is larger than fixed (${px(sz.fixed)}px)`);
    for (const mode of ['fluid', 'cq']) {
      const r = sz[mode];
      if (!r) continue;
      const growth = r[1] / r[0];
      if (growth > FLUID_LIMIT) fail('growth', name, `${mode} grows ${growth.toFixed(2)}× (${px(r[0])} to ${px(r[1])}px), more than ${FLUID_LIMIT}×`);
    }
    const smallest = Math.min(sz.fixed, sz.compact, ...(sz.fluid ?? []), ...(sz.cq ?? []));
    if (px(smallest) < FLOOR_PX) {
      const modes = ['fixed', 'compact', 'fluid', 'cq'].filter((m) => (Array.isArray(sz[m]) ? sz[m][0] : sz[m]) === smallest);
      report('floor', name, `${px(smallest)}px (${modes.join(', ')}), below ${FLOOR_PX}px`);
    }
  }

  /* Hierarchy: each heading at least as large as the next, in every mode */
  const at = (sz, mode, end) => (mode === 'fixed' || mode === 'compact' ? sz[mode] : sz[mode]?.[end] ?? sz.fixed);
  const ordered = HIERARCHY.filter((n) => sizes[n]);
  const checks = [['fixed'], ['compact'], ['fluid', 0], ['fluid', 1], ['cq', 0], ['cq', 1]];
  for (let i = 1; i < ordered.length; i++) {
    const [big, small] = [ordered[i - 1], ordered[i]];
    for (const [mode, end] of checks) {
      const a = at(sizes[big], mode, end);
      const b = at(sizes[small], mode, end);
      if (a < b) {
        const where = end === undefined ? mode : `${mode} at the ${end ? 'largest' : 'smallest'} width`;
        fail('hierarchy', small, `larger than ${big} in ${where} (${px(b)}px against ${px(a)}px)`);
      }
    }
  }

  /* Line heights: body text at least 1.5; headings no looser than body */
  const own = (name) => styleLeading(type, styles[name]);
  const lineHeight = (name) => own(name) ?? (BODY.includes(name) ? own('body') : undefined);
  const bodyLh = lineHeight('body');
  for (const name of BODY.filter((n) => styles[n])) {
    const lh = lineHeight(name);
    if (lh !== undefined && lh < 1.5) report('line-height', name, `line height ${lh} is below 1.5 for body text`);
  }
  for (const name of HEADINGS.filter((n) => styles[n])) {
    const lh = lineHeight(name);
    if (lh !== undefined && bodyLh !== undefined && lh > bodyLh) report('line-height', name, `line height ${lh} is looser than body's ${bodyLh}`);
  }

  /* cq follows fluid unless a style says otherwise */
  for (const [name, sz] of Object.entries(sizes)) {
    if (sz.fluid && sz.cq && (sz.fluid[0] !== sz.cq[0] || sz.fluid[1] !== sz.cq[1])) {
      report('modes', name, `cq runs ${px(sz.cq[0])} to ${px(sz.cq[1])}px but fluid runs ${px(sz.fluid[0])} to ${px(sz.fluid[1])}px`);
    }
  }

  /* Same kind, same size: only weight or case tells them apart */
  const look = (name) => ({ family: styles[name].family ?? styles.body?.family, spacing: styles[name].letterSpacing ?? 'normal' });
  for (const group of [HEADINGS, BODY]) {
    const present = group.filter((n) => sizes[n]);
    for (let i = 0; i < present.length; i++) {
      for (let j = i + 1; j < present.length; j++) {
        const [a, b] = [present[i], present[j]];
        const [la, lb] = [look(a), look(b)];
        if (sizes[a].fixed === sizes[b].fixed && la.family === lb.family && la.spacing === lb.spacing) {
          report('distinct', b, `same size and family as ${a} (${px(sizes[a].fixed)}px); only weight or case sets them apart`);
        }
      }
    }
  }

  /* Weights: each style's weight is one its font loads */
  for (const [name, s] of Object.entries(styles)) {
    const weight = s.weight ?? styles.body?.weight;
    const role = s.family ?? styles.body?.family;
    const font = roleFont(type, role);
    if (!weight || !font || !weights.includes(weight)) continue;
    const value = Number(resolveToken(`font-weight.${weight}`, [semantic, global]));
    if (!Number.isFinite(value) || fontCovers(font, value)) continue;
    const w = fontWeights(font);
    report('weight', name, `uses ${weight} (${value}); ${font.family} loads ${w.range ? `${w.range[0]} to ${w.range[1]}` : w.list.join(', ')}`);
  }

  return { rows, failures: rows.filter((r) => r.level === 'fail'), reports: rows.filter((r) => r.level === 'report') };
};
