/* ==========================================================================
   Theme data
   The Foundations pages read the theme at build time, so they can't drift
   from it. They describe the site theme (tokens/themes.json), the one these
   docs wear, so a swatch drawn from its custom property and the numbers
   beside it always agree.
   ========================================================================== */
import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { buildPalette, check, withFixed, tokenVar, scaleSteps, fluidSteps, styleSizes, styleLeading, minSize, ceilingSize, spaceSteps } from '@design-for-humans/theme-engine';
import { readTheme, themeConfig } from '@design-for-humans/theme-engine/theme-files';

/* The repo root: the nearest folder above the build that holds the themes */
const findRoot = (dir = process.cwd()) => (existsSync(resolve(dir, 'tokens/themes.json')) || dir === dirname(dir) ? dir : findRoot(dirname(dir)));
const root = findRoot();
const json = (p) => JSON.parse(readFileSync(resolve(root, p), 'utf8'));

export const themeName = themeConfig(root).site;
export const theme = readTheme(root, themeName);
const global = withFixed(json('tokens/1-global.json'), theme);
const semantic = json('tokens/2-semantic.json');
const palette = buildPalette(theme);

/* Each hue's steps, light to dark: [{ step, name, l }] */
export const ramps = Object.entries(palette).map(([hue, steps]) => ({
  hue,
  steps: Object.entries(steps)
    .sort(([a], [b]) => Number(a) - Number(b))
    .map(([step, sw]) => ({ step, name: `--color-${hue}-${step}`, l: Math.round(sw.l * 100) })),
}));
export const stepNames = [...new Set(ramps.flatMap((r) => r.steps.map((s) => s.step)))].sort((a, b) => Number(a) - Number(b));

/* Every pairing the gate measures, with its light and dark ratios */
const { rows } = check({ semantic, global, palette, roles: theme.roles });
const byPair = new Map();
for (const r of rows) {
  const key = `${r.fg} on ${r.bg}`;
  const pair = byPair.get(key) ?? { fg: tokenVar(r.fg), bg: tokenVar(r.bg), border: r.fg.startsWith('border.'), min: r.min, gated: r.gated };
  pair[r.mode] = Math.round(r.ratio * 10) / 10;
  byPair.set(key, pair);
}
export const pairs = [...byPair.values()];
export const highContrastSteps = theme.contrast?.steps ?? 1;

/* Type: the scale's steps in px, fixed and at both ends of the fluid range */
const type = theme.type;
const px = (rem) => Math.round(rem * 16);
const fixed = scaleSteps(type);
const fluid = fluidSteps(type);
export const typeScale = {
  base: px(parseFloat(type.scale.base)),
  ratio: type.scale.ratio,
  fluidRatio: type.fluid?.max?.ratio,
  viewports: (type.fluid?.viewports ?? []).map((v) => px(parseFloat(v))),
  floor: px(minSize(type)),
  ceilings: { lower: px(ceilingSize(type, 'lower')), upper: px(ceilingSize(type, 'upper')) },
  steps: Object.keys(fixed).map(Number).sort((a, b) => b - a).map((n) => ({ n, fixed: px(fixed[n]), fluid: fluid[n]?.map(px), rem: fixed[n], fluidRem: fluid[n] })),
};

/* Each text style: its atom, its sizes in px and its line height */
const ATOMS = { 'display-title': 'display-title', title: 'title', heading: 'heading', subheading: 'subheading', 'small-heading': 'small-heading', 'micro-heading': 'micro-heading', 'body-lg': 'large-text', body: 'text', 'body-sm': 'small-text', 'body-xs': 'micro-text', label: 'label' };
export const textStyles = Object.entries(ATOMS).map(([name, atom]) => {
  const style = type.styles[name];
  const sizes = styleSizes(type, style);
  const leading = styleLeading(type, style) ?? styleLeading(type, type.styles.body);
  return { name, atom, fixed: px(sizes.fixed), compact: px(sizes.compact), fluid: sizes.fluid?.map(px), leading: Math.round(leading * 100) / 100 };
});
export const fontRoles = Object.entries(type.families ?? {}).map(([role, { font }]) => ({ role, family: type.fonts?.[font]?.figma ?? type.fonts?.[font]?.family ?? font }));

/* Space: the fixed steps (Tier 1 names are their size in px), the fluid
   roles at both ends of their range, targets, page width and the app */
const space = theme.space;
const stepPx = (ref) => Number(/\{spacing\.(\d+)\}/.exec(ref)?.[1]);
export const fixedSpace = ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'].map((k) => ({ name: `--spacing-${k}`, px: stepPx(semantic.spacing[k].$value) }));
export const fluidSpace = Object.entries(spaceSteps(space)).map(([role, [min, max]]) => ({ role, name: `--spacing-${role}`, min: px(min), max: px(max) }));
export const spaceRange = [400, 1280];
export const targets = space.targets;
export const siteWidth = space['site-width'];
export const app = { padding: space.app?.['padding-inline'], sidebar: space.app?.['sidebar-width'], compactSidebar: space.app?.['sidebar-compact-width'] };

/* Shape: radius and border roles in px, the lines, and each shadow level's
   three layers */
const shape = theme.shape;
const roleList = (group) => Object.entries(group).filter(([k]) => k !== 'default').map(([k, v]) => ({ role: k, px: v }));
export const radii = { roles: roleList(shape.radius), default: shape.radius.default };
export const borders = { roles: roleList(shape.border), default: shape.border.default };
export const lines = Object.entries(shape.lines).map(([line, v]) => ({ line, ...v }));
export const shadows = Object.entries(shape.shadow.levels).map(([level, v]) => ({
  level,
  inset: !!v.inset,
  layers: v.layers.map((l) => `${l.y}px down, ${l.blur}px blur${l.spread ? `, ${l.spread}px spread` : ''}`),
}));

/* Motion: durations in seconds and the easing curves, with each curve's
   control points for drawing */
const motion = theme.motion;
export const durations = Object.entries(motion.duration).map(([role, sec]) => ({ role, sec }));
export const eases = Object.entries(motion.ease).map(([role, value]) => ({ role, value, points: (/cubic-bezier\(([^)]+)\)/.exec(value)?.[1] ?? '').split(',').map(Number) }));
