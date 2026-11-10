#!/usr/bin/env node
/* ==========================================================================
   npm run build:motion [-- --write]
   Prints the durations and easings in the `motion` section of
   the default theme (tokens/themes.json) and runs the motion gate. --write (only when nothing
   fails) adds any new Tier 1 steps to tokens/1-global.json and replaces those
   roles in tokens/2-semantic.json.
   ========================================================================== */

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { applyMotion, DURATION_ROLES, EASE_ROLES, motionGate, motionGlobal } from '../src/index.js';
import { readTheme } from '../src/theme-files.js';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');
const read = (p) => JSON.parse(readFileSync(resolve(root, p), 'utf8'));
const { motion } = readTheme(root);

console.log(`\nDurations: ${DURATION_ROLES.map((r) => `${r} ${motion.duration[r]}s`).join(', ')}.`);
EASE_ROLES.forEach((r) => console.log(`Ease ${r.padEnd(7)} ${motion.ease[r]}`));

const { failures } = motionGate(motion);
if (failures.length) {
  console.log(`\nFailing (${failures.length}):`);
  failures.forEach((r) => console.log(`  ${r.style.padEnd(16)} ${r.message}`));
} else console.log('\nNothing fails the motion gate.');

if (process.argv.includes('--write')) {
  if (failures.length) {
    console.error('\nNot written: fix the failures first.');
    process.exit(1);
  }
  writeFileSync(resolve(root, 'tokens/1-global.json'), JSON.stringify(motionGlobal(read('tokens/1-global.json'), motion), null, 2));
  writeFileSync(resolve(root, 'tokens/2-semantic.json'), JSON.stringify(applyMotion(read('tokens/2-semantic.json'), motion), null, 2));
  console.log('\nWrote the motion tokens to tokens/1-global.json and tokens/2-semantic.json. Run npm run build:tokens and npm run export:figma.');
}
process.exit(failures.length ? 1 : 0);
