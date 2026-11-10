#!/usr/bin/env node
/* ==========================================================================
   npm run build:components [-- --write]
   Prints the Tier 3 tokens the `components` section of the default theme (tokens/themes.json)
   customises and runs the component gate. --write (only when nothing fails)
   writes packages/css/src/component-theme.css.
   ========================================================================== */

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildPalette, componentCss, componentGate } from '../src/index.js';
import { readTheme } from '../src/theme-files.js';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');
const read = (p) => JSON.parse(readFileSync(resolve(root, p), 'utf8'));
const theme = readTheme(root);
const component = read('tokens/3-component.json');
const overrides = theme.components ?? {};

const entries = Object.entries(overrides);
console.log(entries.length ? `\nCustomised (${entries.length}):` : '\nNothing customised.');
entries.forEach(([path, value]) => console.log(`  ${path.padEnd(36)} ${value}`));

const { failures, warnings } = componentGate(overrides, { component, semantic: read('tokens/2-semantic.json'), global: read('tokens/1-global.json'), palette: buildPalette(theme) });
if (warnings.length) {
  console.log(`\nTo check (${warnings.length}):`);
  warnings.forEach((r) => console.log(`  ${r.style.padEnd(36)} ${r.message}`));
}
if (failures.length) {
  console.log(`\nFailing (${failures.length}):`);
  failures.forEach((r) => console.log(`  ${r.style.padEnd(36)} ${r.message}`));
} else console.log('\nNothing fails the component gate.');

if (process.argv.includes('--write')) {
  if (failures.length) {
    console.error('\nNot written: fix the failures first.');
    process.exit(1);
  }
  writeFileSync(resolve(root, 'packages/css/src/component-theme.css'), componentCss(overrides, component));
  console.log('\nWrote packages/css/src/component-theme.css.');
}
process.exit(failures.length ? 1 : 0);
