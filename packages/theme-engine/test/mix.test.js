import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { applyMixes, buildPalette, MIX_TOKENS, mixCssVars, mixGate, mixValue } from '../src/index.js';

const read = (file) => JSON.parse(readFileSync(new URL(`../../../tokens/${file}`, import.meta.url)));
const theme = read('theme.json');
const global = read('1-global.json');
const semantic = read('2-semantic.json');
const ctx = { semantic, global, palette: buildPalette(theme), roles: theme.roles };
const failing = (change) => {
  const mixes = structuredClone(theme.mixes);
  change(mixes);
  return mixGate(mixes, ctx).failures.map((f) => f.style);
};

test("today's theme writes the tokens as they are, and passes", () => {
  assert.deepEqual(applyMixes(semantic, theme.mixes), semantic);
  assert.deepEqual(mixGate(theme.mixes, ctx).failures, []);
  assert.deepEqual(Object.keys(theme.mixes).sort(), [...MIX_TOKENS].sort());
});

test('one value when both modes match, and a colour as it is at 0', () => {
  const same = { color: 'neutral.900', transparent: 50 };
  assert.equal(mixValue({ light: same, dark: same }), 'color-mix(in srgb, {color.neutral.900}, transparent {translucency.50})');
  assert.equal(mixValue({ light: { color: 'white', transparent: 0 }, dark: { color: 'color.muted', transparent: 0 } }), 'light-dark({color.white}, {color.muted})');
  assert.equal(mixCssVars({ 'surface.layer': { light: same, dark: { color: 'surface.default', transparent: 0 } } }, () => '#000')['--surface-layer'], 'light-dark(color-mix(in srgb, #000, transparent 50%), var(--surface))');
});

test('the gate fails what would break or disappear', () => {
  assert.deepEqual(failing((m) => (m['color.quiet'].light.color = 'nope.500')), ['color.quiet']);
  assert.deepEqual(failing((m) => (m['color.quiet'].light.transparent = 12)), ['color.quiet']);
  assert.deepEqual(failing((m) => (m['color.quiet'].light.color = 'color.muted')), ['color.quiet']);
  assert.ok(failing((m) => (m['border.color.control'].light.transparent = 95)).includes('border.color.control'));
  assert.ok(failing((m) => (m['color.focus'].dark = { color: 'black', transparent: 0 })).includes('color.focus'));
});
