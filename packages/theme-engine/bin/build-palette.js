#!/usr/bin/env node
/* ==========================================================================
   npm run build:palette [-- --write] [-- --all]
   Builds the ramps from the default theme (tokens/themes.json), checks every Tier 2 pairing in
   light and dark, and prints the result. --write replaces the `color` block
   of tokens/1-global.json and the colour roles in tokens/2-semantic.json,
   and only when no gated pairing fails. --all lists
   every pairing, not just failures and reported ones.
   ========================================================================== */

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildPalette, check, colorBlock, applyRoles, applyMixes, applyContrast, contrastGate, contrastRoles, mixGate, withFixed } from '../src/index.js';
import { readTheme } from '../src/theme-files.js';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');
const read = (p) => JSON.parse(readFileSync(resolve(root, p), 'utf8'));
const args = new Set(process.argv.slice(2));

const theme = readTheme(root);
const global = withFixed(read('tokens/1-global.json'), theme);
const semantic = read('tokens/2-semantic.json');

const palette = buildPalette(theme);
const { rows, failures: pairingFailures } = check({ semantic, global, palette, roles: theme.roles });
const mixFailures = mixGate(theme.mixes, { semantic, global, palette, roles: theme.roles }).failures;
const high = contrastGate(theme, { semantic, global, palette });
const failures = [...pairingFailures, ...mixFailures, ...high.failures];

/* Ramps */
const hues = Object.keys(palette);
const steps = [...new Set(hues.flatMap((h) => Object.keys(palette[h])))].sort((a, b) => Number(a) - Number(b));
console.log('\nRamps (hex, OKLCH lightness; * = chroma capped to stay in sRGB)\n');
console.log('step  ' + hues.map((h) => h.padEnd(14)).join(''));
for (const s of steps) {
  console.log(
    s.padEnd(6) +
      hues
        .map((h) => {
          const sw = palette[h][s];
          return (sw ? `${sw.hex} ${Math.round(sw.l * 100)}${sw.capped ? '*' : ''}` : '').padEnd(14);
        })
        .join(''),
  );
}

/* Pairings */
const line = (r) =>
  `  ${r.mode.padEnd(5)} ${`${r.fg} on ${r.bg}`.padEnd(58)} ${r.ratio.toFixed(2).padStart(5)}:1  Lc ${r.apca.toFixed(0).padStart(3)}  (needs ${r.min})`;
const reported = rows.filter((r) => !r.gated && !r.pass);
console.log(`\n${rows.length} pairings checked in light and dark.`);
if (args.has('--all')) rows.forEach((r) => console.log(line(r)));
if (reported.length) {
  console.log(`\nReported, not gated (${reported.length}):`);
  reported.forEach((r) => console.log(line(r)));
}
if (failures.length) {
  console.log(`\nFailing (${failures.length}):`);
  pairingFailures.forEach((r) => console.log(line(r)));
  [...mixFailures, ...high.failures].forEach((r) => console.log(`  ${r.style.padEnd(30)} ${r.message}`));
} else {
  console.log('\nEvery gated pairing passes.');
}

console.log(`\nHigh contrast (${theme.contrast?.steps ?? 1} step): ${Object.keys(contrastRoles(theme, { palette, global })).length} roles move, no pairing drops${high.failures.length ? ' except the failures above' : ''}; ${high.reports.length} text pairings under 7:1.`);
high.reports.forEach((r) => console.log(`  ${r.style.padEnd(58)} ${r.message}`));

if (args.has('--write')) {
  if (failures.length) {
    console.error('\nNot written: fix the failing pairings first.');
    process.exit(1);
  }
  global.color = colorBlock(palette, global.color);
  writeFileSync(resolve(root, 'tokens/1-global.json'), JSON.stringify(global, null, 2));
  writeFileSync(resolve(root, 'tokens/2-semantic.json'), JSON.stringify(applyContrast(applyMixes(applyRoles(semantic, theme.roles, { palette, global }), theme.mixes), theme, { palette, global }), null, 2));
  console.log('\nWrote the color block of tokens/1-global.json and the roles in tokens/2-semantic.json. Run npm run build:tokens.');
}

process.exit(failures.length ? 1 : 0);
