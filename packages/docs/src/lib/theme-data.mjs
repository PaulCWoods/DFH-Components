/* ==========================================================================
   Theme data
   The Foundations pages read the theme at build time, so they can't drift
   from it. They describe the site theme (tokens/themes.json), the one these
   docs wear, so a swatch drawn from its custom property and the numbers
   beside it always agree.
   ========================================================================== */
import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { buildPalette, check, withFixed, tokenVar } from '../../../theme-engine/src/index.js';
import { readTheme, themeConfig } from '../../../theme-engine/src/theme-files.js';

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
