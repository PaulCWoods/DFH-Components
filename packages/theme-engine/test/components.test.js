import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { applyComponents, buildPalette, COMPONENT_GROUPS, componentCss, componentGate, componentTokens, componentValue, tokenOptions } from '../src/index.js';

const read = (file) => JSON.parse(readFileSync(new URL(`../../../tokens/${file}`, import.meta.url)));
const theme = read('themes/starter.json');
const global = read('1-global.json');
const semantic = read('2-semantic.json');
const component = read('3-component.json');
const ctx = { component, semantic, global, palette: buildPalette(theme) };
const token = (path) => componentTokens(component).find((t) => t.path === path);

test('every component with tokens is in exactly one group', () => {
  const names = Object.keys(component).filter((k) => !k.startsWith('$')).sort();
  assert.deepEqual(Object.values(COMPONENT_GROUPS).flat().sort(), names);
});

test('every list offers only values that exist, and every token has a list or a typed value', () => {
  for (const t of componentTokens(component)) {
    const { options, custom } = tokenOptions(t, { semantic, global });
    assert.ok(options.length || custom, `${t.path} offers nothing`);
    for (const option of options) {
      const missing = componentGate({ [t.path]: option }, { component, semantic, global }).failures.filter((f) => !/under 4\.5:1/.test(f.message));
      assert.deepEqual(missing, [], `${t.path} ${option}`);
    }
  }
});

test('lists fit the token', () => {
  const options = (path) => tokenOptions(token(path), { semantic, global }).options;
  assert.ok(options('card.radius').includes('{radius.lg}'));
  assert.ok(!options('card.radius').includes('{spacing.md}'));
  assert.ok(options('card.border-width').includes('{border.width.thin}'));
  assert.ok(options('card.bg').includes('{surface.muted}'));
  assert.ok(options('card.padding').includes('{spacing.16}'));
  assert.ok(options('card.strong-shadow').includes('{shadow.lg}'));
  assert.ok(options('divider.style').includes('dashed'));
  assert.equal(tokenOptions(token('sidebar.width'), { semantic, global }).custom, true);
  assert.equal(tokenOptions(token('card.radius'), { semantic, global }).custom, false);
});

test('a list with roles and Tier 1 steps says which is which', () => {
  const both = tokenOptions(token('card.padding'), { semantic, global });
  assert.ok(both.semanticOptions.includes('{spacing.md}'));
  assert.ok(both.globalOptions.includes('{spacing.16}'));
  assert.ok(!both.semanticOptions.includes('{spacing.16}'));
  assert.deepEqual([...both.semanticOptions, ...both.globalOptions, ...both.keywords].sort(), [...both.options].sort());
  assert.deepEqual(tokenOptions(token('card.radius'), { semantic, global }).globalOptions, []);
});

test('an empty theme writes nothing but the note', () => {
  assert.doesNotMatch(componentCss({}, component), /--/);
});

test('customised tokens reach the CSS, again where the roles they read change', () => {
  const css = componentCss({ 'card.radius': '{radius.lg}', 'card.bg': '{surface.muted}', 'card.padding': '{spacing.lg}' }, component);
  assert.match(css, /:root \{\n {2}--card-bg: var\(--surface-muted\);\n {2}--card-padding: var\(--spacing-lg\);\n {2}--card-radius: var\(--radius-lg\);\n\}/);
  const inverted = css.slice(css.indexOf('.color-palette-inverted'), css.indexOf('.ui-compact'));
  assert.match(inverted, /--card-bg/);
  assert.doesNotMatch(inverted, /--card-radius|--card-padding/);
  const compact = css.slice(css.indexOf('.ui-compact'));
  assert.match(compact, /--card-padding/);
  assert.doesNotMatch(compact, /--card-bg|--card-radius/);
});

test('defaults keep the names the compiler writes', () => {
  assert.equal(componentValue('{radius}'), 'var(--radius)');
  assert.equal(componentValue('calc({spacing} * 1.5)'), 'calc(var(--spacing) * 1.5)');
});

test('the custom properties written exist in the compiled tokens', () => {
  const css = readFileSync(new URL('../../css/src/variables.css', import.meta.url), 'utf8');
  for (const t of componentTokens(component)) {
    for (const option of tokenOptions(t, { semantic, global }).options) {
      for (const [, name] of componentValue(option).matchAll(/var\((--[\w-]+)\)/g)) assert.ok(css.includes(`${name}:`), `${t.path}: ${name} isn't compiled`);
    }
  }
});

test('Figma gets every default, with the customised values over them', () => {
  const out = applyComponents(component, { 'card.radius': '{radius.lg}', 'button.sm.min-size': '{spacing.16}' });
  assert.equal(out.card.radius.$value, '{radius.lg}');
  assert.equal(out.button.sm['min-size'].$value, '{spacing.16}');
  assert.equal(out.card.bg.$value, component.card.bg.$value);
  assert.notEqual(component.card.radius.$value, '{radius.lg}');
});

test('the gate fails an unknown token, a missing reference and a value that escapes', () => {
  const styles = (o) => componentGate(o, ctx).failures.map((f) => f.style);
  assert.deepEqual(styles({ 'card.nope': '{radius}' }), ['card.nope']);
  assert.deepEqual(styles({ 'card.radius': '{radius.huge}' }), ['card.radius']);
  assert.deepEqual(styles({ 'sidebar.width': '1rem; color: red' }), ['sidebar.width']);
  assert.deepEqual(styles({ 'sidebar.width': 'calc(1rem' }), ['sidebar.width']);
  assert.deepEqual(styles({ 'card.radius': '{radius.lg}', 'sidebar.width': '20rem' }), []);
});

test("a part's text and background under 4.5:1 fail, in either order", () => {
  const pair = componentTokens(component).find((t) => /(^|-)bg$/.test(t.key) && component[t.component][t.key.replace(/bg$/, 'color')]);
  const color = `${pair.component}.${pair.key.replace(/bg$/, 'color')}`;
  const fail = componentGate({ [pair.path]: '{foreground}', [color]: '{foreground}' }, ctx).failures;
  assert.ok(fail.length >= 2, JSON.stringify(fail));
  assert.match(fail[0].message, /under 4\.5:1/);
  assert.deepEqual(componentGate({ [pair.path]: '{surface}', [color]: '{foreground}' }, ctx).failures, []);
});

test('a lone colour is only warned about', () => {
  const { failures, warnings } = componentGate({ 'card.bg': '{foreground}' }, ctx);
  assert.deepEqual(failures, []);
  assert.ok(warnings.length);
});
