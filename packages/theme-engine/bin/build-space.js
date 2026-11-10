#!/usr/bin/env node
/* ==========================================================================
   npm run build:space [-- --write]
   Builds the fluid spacing roles from the `space` section of
   the default theme (tokens/themes.json), prints each role at both ends of the fluid range and
   runs the space gate. --write (only when nothing fails) replaces
   fluid.spacing in tokens/1-global.json and points the spacing roles of
   tokens/2-semantic.json at it, with the site width, target sizes and the
   app's sizes (landmark padding, sidebar column).
   ========================================================================== */

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { applySpaceRoles, spaceFluidBlock, spaceGate, spaceSteps, spacingSteps } from '../src/index.js';
import { readTheme } from '../src/theme-files.js';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');
const read = (p) => JSON.parse(readFileSync(resolve(root, p), 'utf8'));
const theme = readTheme(root);
const global = read('tokens/1-global.json');
const semantic = read('tokens/2-semantic.json');

const space = theme.space;
if (!space) {
  console.error('the default theme (tokens/themes.json) has no space section.');
  process.exit(1);
}

const px = (r) => `${(r * 16).toFixed(1)}px`;
const [minVp, maxVp] = [global.typography?.['fluid-scale']?.['min-viewport']?.$value ?? '25rem', global.typography?.['fluid-scale']?.['max-viewport']?.$value ?? '80rem'];
console.log(`\nSpace: ${space.base} × ${space.ratio}ⁿ at the largest width. Fluid from ${minVp} to ${maxVp} (the type range).\n`);
console.log('role          smallest   largest');
for (const [role, [min, max]] of Object.entries(spaceSteps(space))) console.log(`${role.padEnd(13)} ${px(min).padStart(8)}  ${px(max).padStart(8)}`);

if (space['site-width']) console.log(`\nSite width: ${space['site-width']}`);
if (space.targets) console.log(`Targets: ${Object.entries(space.targets).map(([k, v]) => `${k} ${v}px`).join(', ')}`);
if (space.app) console.log(`App: ${Object.entries(space.app).map(([k, v]) => `${k} ${typeof v === 'number' ? `${v}px` : v}`).join(', ')}`);

const { failures } = spaceGate(space, { steps: spacingSteps(global) });
if (failures.length) {
  console.log(`\nFailing (${failures.length}):`);
  failures.forEach((r) => console.log(`  ${(r.style ?? 'scale').padEnd(12)} ${r.message}`));
} else console.log('\nNothing fails the space gate.');

if (process.argv.includes('--write')) {
  if (failures.length) {
    console.error('\nNot written: fix the failures first.');
    process.exit(1);
  }
  global.fluid = { ...global.fluid, spacing: spaceFluidBlock(space) };
  writeFileSync(resolve(root, 'tokens/1-global.json'), JSON.stringify(global, null, 2));
  writeFileSync(resolve(root, 'tokens/2-semantic.json'), JSON.stringify(applySpaceRoles(semantic, space), null, 2));
  console.log('\nWrote fluid.spacing in tokens/1-global.json and the spacing roles, site width, targets and app sizes in tokens/2-semantic.json. Run npm run build:tokens.');
}
process.exit(failures.length ? 1 : 0);
