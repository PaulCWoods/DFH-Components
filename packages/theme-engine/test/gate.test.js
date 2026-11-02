import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { buildPalette, check, resolver } from '../src/index.js';

const read = (p) => JSON.parse(readFileSync(new URL(`../../../tokens/${p}`, import.meta.url)));
const semantic = read('2-semantic.json');
const global = read('1-global.json');
const theme = read('themes/starter.json');

test('roles resolve per mode through light-dark()', () => {
  const resolve = resolver({ semantic, global, palette: buildPalette(theme) });
  const light = resolve('surface.default', 'light');
  const dark = resolve('surface.default', 'dark');
  assert.match(light, /^#/);
  assert.notEqual(light, dark);
});

test('the shipped theme passes every gated pairing', () => {
  const { failures, rows } = check({ semantic, global, palette: buildPalette(theme) });
  assert.ok(rows.length > 100);
  assert.deepEqual(failures.map((f) => `${f.mode} ${f.fg} on ${f.bg}`), []);
});

test('a failing theme is caught', () => {
  const pale = { ...theme, ends: { light: 0.97, dark: 0.6 } };
  assert.ok(check({ semantic, global, palette: buildPalette(pale) }).failures.length > 0);
});
