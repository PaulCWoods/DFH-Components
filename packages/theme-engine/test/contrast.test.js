import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { applyContrast, buildPalette, CONTRAST_QUERY, contrastGate, contrastMixes, contrastRoles, withFixed } from '../src/index.js';

const read = (file) => JSON.parse(readFileSync(new URL(`../../../tokens/${file}`, import.meta.url)));
const theme = read('themes/starter.json');
const semantic = read('2-semantic.json');
const global = withFixed(read('1-global.json'), theme);
const palette = buildPalette(theme);
const ctx = { global, palette };

test("today's theme writes the block as it is, and passes", () => {
  assert.deepEqual(applyContrast(semantic, theme, ctx), semantic);
  assert.deepEqual(contrastGate(theme, { semantic, ...ctx }).failures, []);
});

test('text moves away from its surface, surfaces away from their text, in each mode', () => {
  const moved = contrastRoles(theme, ctx);
  assert.deepEqual(moved['foreground.default'], { light: 'neutral.900', dark: 'white' });
  assert.deepEqual(moved['surface.muted'], { light: 'neutral.000', dark: 'neutral.1000' });
  /* An inverted role goes the other way: light text on dark gets lighter */
  assert.equal(moved['foreground.inverted'].light, 'white');
  assert.equal(moved['surface.inverted'].light, 'black');
});

test('more steps move further, and none writes an empty block', () => {
  const two = contrastRoles({ ...theme, contrast: { steps: 2 } }, ctx);
  assert.equal(two['foreground.muted'].light, 'neutral.800');
  const off = { ...theme, contrast: { steps: 0 } };
  assert.deepEqual(applyContrast(semantic, off, ctx).$media[CONTRAST_QUERY], {});
});

test('each mix gets one translucency step more solid, and a solid one stays', () => {
  const mixes = contrastMixes(theme, ctx);
  assert.equal(mixes['color.quiet'].light.transparent, 50);
  assert.equal(mixes['surface.layer'].light.transparent, 0);
  assert.equal(mixes['color.focus'], undefined);
});
