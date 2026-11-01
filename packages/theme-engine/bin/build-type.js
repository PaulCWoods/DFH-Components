#!/usr/bin/env node
/* ==========================================================================
   npm run build:type [-- --write] [-- --migrate]
   Builds the type scale and text styles from the `type` section of
   tokens/theme.json, prints them and runs the type gate. --write replaces
   the typography block of tokens/1-global.json, the fluid type steps and
   the text styles in tokens/2-semantic.json, and only when nothing fails
   the gate (reports don't block it), and writes fonts.css and the font
   links in the Storybook and docs heads. --migrate reads today's tokens into
   a new `type` section of theme.json, once, before the first --write.
   ========================================================================== */

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { writeFontFiles } from '../src/font-files.js';
import { styleLeading, migrateType, typeGlobal, fluidBlock, applyTypeStyles, scaleSteps, fluidSteps, fontLinks, stepKey, typeGate } from '../src/index.js';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');
const read = (p) => JSON.parse(readFileSync(resolve(root, p), 'utf8'));
const args = new Set(process.argv.slice(2));

const theme = read('tokens/theme.json');
const global = read('tokens/1-global.json');
const semantic = read('tokens/2-semantic.json');

if (args.has('--migrate')) {
  if (theme.type && !args.has('--force')) {
    console.error('theme.json already has a type section. Pass --force to replace it from the tokens.');
    process.exit(1);
  }
  theme.type = migrateType(global, semantic);
  writeFileSync(resolve(root, 'tokens/theme.json'), JSON.stringify(theme, null, 2) + '\n');
  console.log('Wrote the type section of tokens/theme.json from today\'s tokens.');
}

const type = theme.type;
if (!type) {
  console.error('tokens/theme.json has no type section. Run npm run build:type -- --migrate first.');
  process.exit(1);
}

/* The scale: each step fixed, and at both ends of the fluid range */
const px = (r) => `${(r * 16).toFixed(1)}px`;
const fixed = scaleSteps(type);
const fluid = fluidSteps(type);
const [minVp, maxVp] = type.fluid.viewports;
console.log(`\nScale: ${type.scale.base} × ${type.scale.ratio}ⁿ. Fluid from ${minVp} to ${maxVp}.\n`);
console.log('step      fixed            fluid (smallest → largest)');
for (const n of Object.keys(fixed).map(Number).sort((a, b) => a - b)) {
  const [lo, hi] = fluid[n];
  console.log(`${stepKey(n).padEnd(9)} ${`${fixed[n]}rem`.padEnd(9)}${px(fixed[n]).padStart(7)}   ${px(lo)} → ${px(hi)}`);
}

/* The styles */
console.log('\nstyle            size  compact  grows to  line height');
for (const [name, s] of Object.entries(type.styles)) {
  if (s.size === undefined) continue;
  const grows = s.fluid === false ? 'fixed' : String(s.growTo ?? s.size);
  console.log(`${name.padEnd(16)} ${String(s.size).padStart(4)}  ${String(s.compact ?? '').padStart(7)}  ${grows.padStart(8)}  ${styleLeading(type, s) ?? '(inherits)'}${s.leading !== undefined ? ` (step ${s.leading})` : ''}`);
}

/* What a product puts in its page head */
const links = fontLinks(type);
if (links.length) console.log(`\nFont links for the page head:\n${links.join('\n')}`);

/* The gate. Fails block --write; reports are for a person to judge. */
const { failures, reports } = typeGate(type, { semantic, global });
const line = (r) => `  ${(r.style ?? 'scale').padEnd(15)} ${r.message}`;
if (reports.length) {
  console.log(`\nReported, not gated (${reports.length}):`);
  reports.forEach((r) => console.log(line(r)));
}
if (failures.length) {
  console.log(`\nFailing (${failures.length}):`);
  failures.forEach((r) => console.log(line(r)));
} else {
  console.log('\nNothing fails the type gate.');
}

if (args.has('--write')) {
  if (failures.length) {
    console.error('\nNot written: fix the failures first.');
    process.exit(1);
  }
  global.typography = typeGlobal(type, global.typography);
  global.fluid = { ...global.fluid, typography: fluidBlock(type, global.fluid?.typography) };
  writeFileSync(resolve(root, 'tokens/1-global.json'), JSON.stringify(global, null, 2));
  writeFileSync(resolve(root, 'tokens/2-semantic.json'), JSON.stringify(applyTypeStyles(semantic, type, { global }), null, 2));
  const fontFiles = writeFontFiles(root, type);
  console.log(`\nWrote the typography of tokens/1-global.json, the text styles in tokens/2-semantic.json and ${fontFiles.join(', ')}. Run npm run build:tokens and npm run export:figma.`);
}

process.exit(failures.length ? 1 : 0);
