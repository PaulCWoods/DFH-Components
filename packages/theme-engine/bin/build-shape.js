#!/usr/bin/env node
/* ==========================================================================
   npm run build:shape [-- --write]
   Builds the radius and border roles and the shadows from the `shape` section
   of the default theme (tokens/themes.json), prints them and runs the shape gate. --write (only
   when nothing fails) adds any new Tier 1 steps to tokens/1-global.json and
   replaces those roles and shadows in tokens/2-semantic.json.
   ========================================================================== */

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { applyShape, BORDER_ROLES, buildPalette, RADIUS_ROLES, spacingSteps, shadowReach, shapeGate, shapeGlobal } from '../src/index.js';
import { readTheme } from '../src/theme-files.js';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');
const read = (p) => JSON.parse(readFileSync(resolve(root, p), 'utf8'));
const theme = readTheme(root);
const global = read('tokens/1-global.json');
const semantic = read('tokens/2-semantic.json');

const shape = theme.shape;
if (!shape) {
  console.error('the default theme (tokens/themes.json) has no shape section.');
  process.exit(1);
}

const list = (values, order) => order.map((r) => `${r} ${values[r]}px`).join(', ');
console.log(`\nRadius: ${list(shape.radius, RADIUS_ROLES)}. Default ${shape.radius.default}.`);
console.log(`Border: ${list(shape.border, BORDER_ROLES)}. Default ${shape.border.default}.`);
console.log('Shadows, by how far each reaches:');
for (const [name, level] of Object.entries(shape.shadow.levels)) console.log(`  ${name.padEnd(6)} ${shadowReach(level)}px`);

const colors = [...Object.entries(buildPalette(theme)).flatMap(([hue, ramp]) => Object.keys(ramp).map((step) => `${hue}.${step}`)), 'white', 'black'];
const { failures } = shapeGate(shape, { translucency: global.translucency, colors, steps: spacingSteps(global) });
if (failures.length) {
  console.log(`\nFailing (${failures.length}):`);
  failures.forEach((r) => console.log(`  ${r.style.padEnd(16)} ${r.message}`));
} else console.log('\nNothing fails the shape gate.');

if (process.argv.includes('--write')) {
  if (failures.length) {
    console.error('\nNot written: fix the failures first.');
    process.exit(1);
  }
  writeFileSync(resolve(root, 'tokens/1-global.json'), JSON.stringify(shapeGlobal(global, shape), null, 2));
  writeFileSync(resolve(root, 'tokens/2-semantic.json'), JSON.stringify(applyShape(semantic, shape), null, 2));
  console.log('\nWrote the shape tokens to tokens/1-global.json and tokens/2-semantic.json. Run npm run build:tokens.');
}
process.exit(failures.length ? 1 : 0);
