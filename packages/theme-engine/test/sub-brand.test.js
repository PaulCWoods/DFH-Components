import { test } from 'node:test';
import assert from 'node:assert/strict';
import { cssDiff, mergeTheme, resolveTheme, scopeCss, themeOverrides } from '../src/index.js';

test('a sub-brand merges over its parent: objects merge, the rest replaces, null removes', () => {
  const parent = { roles: { a: { light: 'blue.500', dark: 'blue.300' }, b: { light: 'red.500', dark: 'red.300' } }, list: [1, 2], gone: 1 };
  const out = mergeTheme(parent, { roles: { a: { light: 'aqua.500' } }, list: [3], gone: null });
  assert.deepEqual(out, { roles: { a: { light: 'aqua.500', dark: 'blue.300' }, b: { light: 'red.500', dark: 'red.300' } }, list: [3] });
  assert.equal(parent.roles.a.light, 'blue.500');
});

test('a chain resolves from the top, and a loop fails', () => {
  const files = { base: { x: 1, y: 1 }, mid: { extends: 'base', y: 2 }, leaf: { extends: 'mid', z: 3 }, a: { extends: 'b' }, b: { extends: 'a' } };
  const { theme, chain } = resolveTheme('leaf', (n) => files[n]);
  assert.deepEqual(theme, { x: 1, y: 2, z: 3 });
  assert.deepEqual(chain, ['base', 'mid', 'leaf']);
  assert.throws(() => resolveTheme('a', (n) => files[n]), /extends itself/);
});

const parent = `:root {
  --accent: blue;
  --focus: var(--accent);
  --ring: var(--focus);
  --other: red;
}
@media (prefers-contrast: more) {
  :root { --accent: navy; }
}
:where(.color-palette-inverted) { --accent: skyblue; }
* {
  @container style(--color-palette: inverted) { --accent: skyblue; }
}`;
const next = parent.replace('--accent: blue', '--accent: aqua').replace('--accent: navy', '--accent: teal').replaceAll('skyblue', 'aquamarine');

test('the scope holds what changed, and every :root token that reads it', () => {
  const css = scopeCss('x', parent, next);
  const root = css.slice(0, css.indexOf('}'));
  assert.match(root, /^\.theme-x \{/);
  assert.match(root, /--accent: aqua/);
  assert.match(root, /--focus: var\(--accent\)/);
  assert.match(root, /--ring: var\(--focus\)/);
  assert.doesNotMatch(css, /--other/);
  assert.match(css, /@media \(prefers-contrast: more\) \{\n {2}\.theme-x \{\n {4}--accent: teal;/);
});

test('inverted regions are scoped on and inside the class, in their order', () => {
  const css = scopeCss('x', parent, next);
  assert.match(css, /:is\(\.theme-x:is\(:where\(\.color-palette-inverted\)\), \.theme-x :is\(:where\(\.color-palette-inverted\)\)\) \{\n {2}--accent: aquamarine;/);
  assert.match(css, /:is\(\.theme-x, \.theme-x \*\) \{\n {2}@container style\(--color-palette: inverted\)/);
  assert.ok(css.indexOf('@media') < css.indexOf(':is('));
});

test("the sub-brand's own CSS comes after, and what reads it comes too", () => {
  const css = scopeCss('x', parent, parent, ':root { --other: green; }');
  assert.doesNotMatch(css, /--accent/);
  assert.match(css, /\.theme-x \{\n {2}--other: green;/);
  const reads = scopeCss('x', parent.replace('--ring: var(--focus)', '--ring: var(--other)'), parent.replace('--ring: var(--focus)', '--ring: var(--other)'), ':root { --other: green; }');
  assert.match(reads, /--ring: var\(--other\)/);
});

test('a sub-brand that changes a function fails', () => {
  const fn = (n) => `@function --size(--n) { result: calc(var(--n) * ${n}); }\n:root { --a: 1; }`;
  assert.throws(() => scopeCss('x', fn(1), fn(2)), /--size/);
});

test('blocks with the same prelude stay apart and in order', () => {
  const base = '@media (x) { :root { --a: 1; } }\n.inv { --a: 2; }\n@media (x) { .inv { --a: 3; } }';
  const css = cssDiff(base, base.replace('--a: 1', '--a: 4').replace('--a: 2', '--a: 5').replace('--a: 3', '--a: 6'));
  assert.ok(css.indexOf('--a: 4') < css.indexOf('--a: 5') && css.indexOf('--a: 5') < css.indexOf('--a: 6'), css);
});

test('overrides are the inverse of the merge', () => {
  const parent = { a: { b: 1, c: 2 }, d: [1], e: 'x' };
  const theme = { a: { b: 1, c: 3 }, d: [1, 2], f: true };
  const over = themeOverrides(parent, theme);
  assert.deepEqual(over, { a: { c: 3 }, d: [1, 2], e: null, f: true });
  assert.deepEqual(mergeTheme(parent, over), theme);
  assert.deepEqual(themeOverrides(parent, parent), {});
});
