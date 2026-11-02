import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { applyShape, shapeCssVars, shapeGate, shapeGlobal, spacingSteps } from '../src/index.js';

const read = (file) => JSON.parse(readFileSync(new URL(`../../../tokens/${file}`, import.meta.url)));
const theme = read('theme.json');
const global = read('1-global.json');
const semantic = read('2-semantic.json');

test("today's theme writes the tokens as they are", () => {
  assert.deepEqual(applyShape(semantic, theme.shape), semantic);
  assert.deepEqual(shapeGlobal(global, theme.shape), global);
});

test('a new value adds its Tier 1 step and keeps the others', () => {
  const shape = structuredClone(theme.shape);
  shape.radius.md = 6;
  const out = shapeGlobal(global, shape);
  assert.equal(out.radius[6].$value, '6px');
  assert.equal(out.radius[4].$value, '4px');
  assert.equal(applyShape(semantic, shape).radius.md.$value, '{radius.6}');
});

test('a shadow level writes its light twin in the lighter colour', () => {
  const shape = structuredClone(theme.shape);
  shape.shadow.levels.md.layers[0].blur = 5;
  const out = applyShape(semantic, shape);
  assert.equal(out.shadow.md.$value[0].blur, '5px');
  assert.equal(out.shadow['md-light'].$value[0].blur, '5px');
  assert.equal(out.shadow['md-light'].$value[0].color, '{shadow.color-light}');
});

test('lines write their roles, and none stays 0', () => {
  const shape = structuredClone(theme.shape);
  shape.lines.rule.width = 'none';
  shape.lines.rule.color = 'border.color.default';
  shape.lines.panel.radius = 'default';
  shape.border.thin = 3;
  const out = applyShape(semantic, shape);
  assert.equal(out.rule.width.$value, '{border.width.none}');
  assert.equal(out.rule.color.$value, '{border.color}');
  assert.equal(out.panel.radius.$value, '{radius}');
  assert.equal(out.border.width.none.$value, '{border.width.0}');
  assert.equal(shapeCssVars(shape, () => '#000')['--rule-color'], 'var(--border-color)');
});

test('the default radius can be none, and none stays 0', () => {
  const shape = structuredClone(theme.shape);
  shape.radius.default = 'none';
  shape.radius.sm = 3;
  assert.deepEqual(shapeGate(shape).failures, []);
  const out = applyShape(semantic, shape);
  assert.equal(out.radius.default.$value, '{radius.none}');
  assert.equal(out.radius.none.$value, '{radius.0}');
  assert.equal(shapeCssVars(shape, () => '#000')['--radius'], 'var(--radius-none)');
});

test("what has to show can't be none, and a focus ring is at least 2px", () => {
  const styles = (change) => {
    const shape = structuredClone(theme.shape);
    change(shape);
    return shapeGate(shape).failures.map((f) => f.style);
  };
  assert.deepEqual(styles((s) => (s.lines.rule.width = 'none')), []);
  assert.deepEqual(styles((s) => (s.lines.control.width = 'none')), ['control width']);
  assert.deepEqual(styles((s) => (s.lines.underline.width = 'none')), ['underline width']);
  assert.deepEqual(styles((s) => (s.lines['focus-ring'].width = 'thin')), ['focus-ring width']);
  assert.deepEqual(styles((s) => (s.lines.rule.color = 'surface.card')), ['rule color']);
});

test("today's shape passes", () => {
  assert.deepEqual(shapeGate(theme.shape, { translucency: global.translucency }).failures, []);
});

test('the gate fails out-of-order roles, an unseen border, a missing default and a level that does not rise', () => {
  const styles = (change) => {
    const shape = structuredClone(theme.shape);
    change(shape);
    return shapeGate(shape).failures.map((f) => f.style);
  };
  assert.deepEqual(styles((s) => (s.radius.md = 1)), ['radius md']);
  assert.deepEqual(styles((s) => (s.border.thin = 0)), ['border thin']);
  assert.deepEqual(styles((s) => (s.radius.default = 'huge')), ['radius default']);
  assert.deepEqual(styles((s) => (s.shadow.levels.lg = s.shadow.levels.md)), ['shadow lg']);
});

test('every size is a spacing step; one off the scale fails', () => {
  const steps = spacingSteps(global);
  assert.deepEqual(shapeGate(theme.shape, { steps }).failures, []);
  const shape = structuredClone(theme.shape);
  shape.radius.md = 5;
  shape.shadow.levels.sm.layers[0].blur = 3;
  assert.deepEqual(shapeGate(shape, { steps }).failures.map((f) => f.style), ['radius md', 'shadow sm']);
});

test('a shadow colour outside the palette fails', () => {
  const failures = shapeGate(theme.shape, { colors: ['neutral.800', 'black'] }).failures.map((f) => f.message);
  assert.deepEqual(failures, ["neutral.900 in light mode isn't in the palette"]);
});

test('Tier 3 points at the border and radius roles, so it follows them as the CSS does', () => {
  const component = readFileSync(new URL('../../../tokens/3-component.json', import.meta.url), 'utf8');
  assert.deepEqual(component.match(/\{(border[-.]width|radius)\.\d+\}/g), null);
});

test('the preview properties use the names the compiler writes', () => {
  const css = readFileSync(new URL('../../css/src/variables.css', import.meta.url), 'utf8');
  for (const name of Object.keys(shapeCssVars(theme.shape, () => 'red'))) assert.ok(css.includes(`${name}:`), `${name} is compiled`);
});
