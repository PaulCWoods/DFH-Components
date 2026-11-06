import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { applyRoles, buildPalette, check, groupRoles, resolver, roleValue, tokenPaths } from '../src/index.js';

const read = (p) => JSON.parse(readFileSync(new URL(`../../../tokens/${p}`, import.meta.url)));
const semantic = read('2-semantic.json');
const global = read('1-global.json');
const theme = read('themes/starter.json');
const palette = buildPalette(theme);

test('a role is one reference when both modes match, light-dark() otherwise', () => {
  assert.equal(roleValue({ light: 'black', dark: 'black' }), '{color.black}');
  assert.equal(roleValue({ light: 'neutral.800', dark: 'neutral.000' }), 'light-dark({color.neutral.800}, {color.neutral.000})');
});

test('the semantic file already says what the theme says', () => {
  assert.deepEqual(applyRoles(semantic, theme.roles), semantic);
});

test('the semantic file has no bridge colours', () => {
  for (const group of ['surface-color', 'foreground-color', 'border-color']) assert.equal(semantic[group], undefined);
});

test('changing a role changes what the gate measures', () => {
  const roles = { ...theme.roles, 'foreground.muted': { light: 'neutral.300', dark: 'neutral.700' } };
  const resolve = resolver({ semantic: applyRoles(semantic, roles), global, palette });
  assert.equal(resolve('foreground.muted', 'light'), palette.neutral['300'].hex);
  assert.ok(check({ semantic, global, palette, roles }).failures.some((f) => f.fg === 'foreground.muted'));
});

test('unknown roles and colours are refused', () => {
  assert.throws(() => applyRoles(semantic, { 'surface.nope': { light: 'white', dark: 'black' } }), /Unknown role/);
  assert.throws(() => applyRoles(semantic, { 'surface.card': { light: 'mauve.500', dark: 'black' } }, { palette, global }), /no colour/);
});

test('roles group into surface, foreground and border', () => {
  assert.deepEqual(groupRoles(theme.roles).map((g) => g.label), ['Surface', 'Foreground', 'Border']);
  const semanticOrder = tokenPaths(semantic);
  for (const g of groupRoles(theme.roles, semantic)) {
    const at = g.roles.map((p) => semanticOrder.indexOf(p));
    assert.deepEqual(at, [...at].sort((x, y) => x - y), `${g.label} follows the semantic file`);
  }
});
