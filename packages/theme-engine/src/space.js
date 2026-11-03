/* ==========================================================================
   Space: the fluid spacing roles
   --------------------------------------------------------------------------
   Reads the `space` section of tokens/theme.json and writes the fluid
   spacing steps of 1-global.json (fluid.spacing) and the spacing roles of
   2-semantic.json (spacing.breathe and the rest), the way type.js writes
   the type scale.

   A role grows from its `from` size (the base, 1rem, unless it says) at the
   smallest width to base × ratio^step at the largest, across the fluid type
   range. Every role has a cq twin that grows with its container instead.
   Spacing is fluid everywhere; compact regions set the roles to --spacing.

   Two fixed sizes live here too, both optional (a theme without them keeps
   the tokens as they are):
   - `site-width`: the page's content width (spacing.site-width), any CSS
     length the designer types, such as 75rem.
   - `targets`: the target sizes (spacing.target-sm, spacing.target,
     spacing.target-lg), each a Tier 1 spacing step in pixels. The default
     is the touch target every control keeps; sm is the fine-pointer target
     a product can opt into; lg is for a control that needs more.
   ========================================================================== */

import { fluidClamp } from './type.js';

/* The roles, smallest first: each at least as large as the one before */
export const SPACE_ROLES = ['breathe-sm', 'breathe', 'cushion', 'cushion-lg'];
/* The target sizes, smallest first, and the token each writes */
export const TARGETS = { sm: 'target-sm', default: 'target', lg: 'target-lg' };
/* A length a page width can be: a positive number and a unit */
const LENGTH = /^(\d+(\.\d+)?|\.\d+)(rem|em|px|ch)$/;

const rem = (v) => parseFloat(v);
const round = (n, places = 4) => +n.toFixed(places);
const roles = (space) => SPACE_ROLES.filter((r) => space.roles?.[r]).concat(Object.keys(space.roles ?? {}).filter((r) => !SPACE_ROLES.includes(r)));

/* Each role's size at the smallest and largest width, in rem */
export const spaceSteps = (space) => {
  const base = rem(space.base);
  return Object.fromEntries(
    roles(space).map((r) => {
      const role = space.roles[r];
      return [r, [round(role.from !== undefined ? rem(role.from) : base), round(base * space.ratio ** role.step)]];
    }),
  );
};

const px = (r) => `${round(r * 16, 1)}px`;
const describe = (r, [min, max]) => `Fluid ${r} space (${min}rem / ${px(min)} at the smallest width to ${max}rem / ${px(max)} at the largest)`;

/* Tier 1: fluid.spacing, one fluid() step per role */
export const spaceFluidBlock = (space) => {
  const out = { $type: 'dimension' };
  for (const [r, [min, max]] of Object.entries(spaceSteps(space))) {
    out[r] = { $value: `fluid(${min}rem, ${max}rem)`, $description: describe(r, [min, max]) };
  }
  return out;
};

/* Tier 2: spacing.<role> grows with the viewport, spacing.cq-<role> with
   the container. Descriptions already written are kept. */
const ROLE_TEXT = {
  'breathe-sm': 'A smaller breathing space, for tighter groups',
  breathe: 'Fluid breathing space between major container sections',
  cushion: 'Fluid cushion space for outer page and hero margins',
  'cushion-lg': 'A larger cushion, for page sections and heroes',
};
export const applySpaceRoles = (semantic, space) => {
  const out = structuredClone(semantic);
  out.spacing = out.spacing ?? {};
  const set = (key, value, text) => {
    const node = out.spacing[key];
    out.spacing[key] = node && typeof node === 'object' ? { ...node, $value: value } : { $value: value, $description: text };
  };
  for (const r of Object.keys(spaceSteps(space))) {
    set(r, `{fluid.spacing.${r}}`, ROLE_TEXT[r] ?? `Fluid ${r} space`);
    set(`cq-${r}`, `{fluid.spacing.cq.${r}}`, `${ROLE_TEXT[r] ?? `Fluid ${r} space`}, growing with its container (cqi)`);
  }
  if (space['site-width']) set('site-width', space['site-width'], "The page's content width: the Wrapper's cap, and the Header and Footer bars'");
  for (const [k, token] of Object.entries(TARGETS)) if (space.targets?.[k] !== undefined) set(token, `{spacing.${space.targets[k]}}`, `Target size ${k}`);
  return out;
};

/* The gate: positive sizes, none shrinking as it grows, roles in order; a
   site width that is a length; targets on the spacing scale (scale: the
   Tier 1 steps), in order, and large enough */
export const spaceGate = (space, { steps: scale } = {}) => {
  const rows = [];
  const fail = (role, message) => rows.push({ level: 'fail', rule: 'space', style: role, message });
  if (!(rem(space.base) > 0)) fail(null, `base ${space.base} isn't a positive size`);
  if (!(space.ratio > 1)) fail(null, `ratio ${space.ratio} isn't above 1`);
  const steps = Object.entries(spaceSteps(space));
  for (const [r, [min, max]] of steps) {
    if (!(min > 0)) fail(r, `starts at ${min}rem`);
    if (max < min) fail(r, `shrinks from ${px(min)} to ${px(max)} as the width grows`);
  }
  for (let i = 1; i < steps.length; i++) {
    const [[a, sa], [b, sb]] = [steps[i - 1], steps[i]];
    if (sb[0] < sa[0] || sb[1] < sa[1]) fail(b, `smaller than ${a} at the ${sb[0] < sa[0] ? 'smallest' : 'largest'} width`);
  }
  const width = space['site-width'];
  if (width !== undefined && !(LENGTH.test(String(width).trim()) && parseFloat(width) > 0)) fail('site-width', `${width} isn't a positive length in rem, em, px or ch`);
  if (space.targets) {
    const sizes = Object.keys(TARGETS).map((k) => [k, space.targets[k]]);
    for (const [k, v] of sizes) {
      if (!Number.isInteger(v) || v <= 0) fail(`target ${k}`, `${v}px isn't a whole number of pixels`);
      else if (scale && !scale.includes(v)) fail(`target ${k}`, `${v}px isn't a spacing step`);
      /* WCAG 2.5.8: no target under 24px */
      else if (v < 24) fail(`target ${k}`, `${v}px is under the 24px minimum (WCAG 2.5.8)`);
    }
    /* WCAG 2.5.5: the touch target every control keeps is at least 44px */
    if (space.targets.default < 44) fail('target default', `${space.targets.default}px is under 44px (WCAG 2.5.5); controls keep it on touch screens`);
    sizes.slice(1).forEach(([k, v], i) => v < sizes[i][1] && fail(`target ${k}`, `smaller than ${sizes[i][0]}`));
  }
  return { rows, failures: rows.filter((r) => r.level === 'fail'), reports: rows.filter((r) => r.level === 'report') };
};

/* The preview's custom properties, as the compiler names them */
export const spaceCssVars = (space, viewports = ['25rem', '80rem']) => {
  const vars = {};
  for (const [r, [min, max]] of Object.entries(spaceSteps(space))) {
    vars[`--fluid-spacing-${r}`] = fluidClamp(min, max, viewports);
    vars[`--fluid-spacing-cq-${r}`] = fluidClamp(min, max, viewports, 'cqi');
    vars[`--spacing-${r}`] = `var(--fluid-spacing-${r})`;
    vars[`--spacing-cq-${r}`] = `var(--fluid-spacing-cq-${r})`;
  }
  if (space['site-width']) vars['--spacing-site-width'] = space['site-width'];
  for (const [k, token] of Object.entries(TARGETS)) if (space.targets?.[k] !== undefined) vars[`--spacing-${token}`] = `${space.targets[k] / 16}rem`;
  return vars;
};
