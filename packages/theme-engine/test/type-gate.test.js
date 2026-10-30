import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { styleSizes, typeGate } from '../src/index.js';

const read = (p) => JSON.parse(readFileSync(new URL(`../../../tokens/${p}`, import.meta.url)));
const semantic = read('2-semantic.json');
const global = read('1-global.json');
const theme = read('theme.json');
const files = { semantic, global };

const edit = (fn) => {
  const type = structuredClone(theme.type);
  fn(type);
  return typeGate(type, files);
};
const rules = (rows) => rows.map((r) => `${r.rule}:${r.style}`);

test('today\'s theme passes, with the known reports', () => {
  const { failures, reports } = typeGate(theme.type, files);
  assert.deepEqual(failures, []);
  /* Weight reports depend on the fonts the theme loads, so they aren't pinned here */
  assert.deepEqual(rules(reports.filter((r) => r.rule !== 'weight')).sort(), [
    'floor:body-sm', 'floor:body-xs', 'floor:micro-heading',
    'line-height:body-sm', 'line-height:body-xs',
  ]);
});

test('a missing family, font, weight, spacing or step fails', () => {
  const { failures } = edit((t) => {
    t.styles.heading.family = 'slab';
    t.families.mono.font = 'courier';
    t.styles.body.weight = 'hairline';
    t.styles.title.letterSpacing = 'airy';
    t.styles['display-title'].growTo = 9;
  });
  assert.deepEqual(rules(failures).sort(), ['reference:body', 'reference:display-title', 'reference:heading', 'reference:mono', 'reference:title']);
});

test('a ratio of 1 or less fails the scale', () => {
  const { failures } = edit((t) => (t.scale.ratio = 1));
  assert.ok(failures.some((f) => f.rule === 'scale'));
});

test('a heading larger than the one above it fails in that mode', () => {
  const { failures } = edit((t) => (t.styles.subheading.compact = 2));
  const hierarchy = failures.filter((f) => f.rule === 'hierarchy');
  assert.equal(hierarchy.length, 1);
  assert.equal(hierarchy[0].style, 'subheading');
  assert.match(hierarchy[0].message, /compact/);
});

test('compact larger than fixed fails', () => {
  const { failures } = edit((t) => (t.styles.body.compact = 1));
  assert.ok(failures.some((f) => f.rule === 'compact' && f.style === 'body'));
});

test('growing more than 2.5 times fails (WCAG 1.4.4)', () => {
  const { failures } = edit((t) => (t.styles.heading.growTo = 8));
  assert.deepEqual(rules(failures.filter((f) => f.rule === 'growth')), ['growth:heading', 'growth:heading']);
});

test('a style\'s sizes follow the system unless it grows to another step', () => {
  const sizes = styleSizes(theme.type, theme.type.styles['display-title']);
  assert.equal(sizes.fixed, 2.4883);
  assert.deepEqual(sizes.fluid, [2.4883, 5.1598]);
  assert.deepEqual(sizes.cq, sizes.fluid);
  assert.equal(styleSizes(theme.type, theme.type.styles.label).fluid, undefined);
});

test('a heading looser than body, and two look-alike styles, are reported', () => {
  const { failures, reports } = edit((t) => {
    t.styles.heading.leading = 1;
    t.styles['body-lg'].size = 0;
  });
  assert.deepEqual(failures, []);
  assert.ok(reports.some((r) => r.rule === 'line-height' && r.style === 'heading'));
  assert.ok(reports.some((r) => r.rule === 'distinct' && r.style === 'body'));
});

test('a style whose weight its font doesn\'t load is reported; a variable range covers it', () => {
  const { reports } = edit((t) => (t.fonts['plus-jakarta-sans'].weights = [600, 700]));
  assert.ok(reports.some((r) => r.rule === 'weight' && r.style === 'display-title'));
  const variable = edit((t) => {
    delete t.fonts['plus-jakarta-sans'].weights;
    t.fonts['plus-jakarta-sans'].axes = { wght: [200, 800] };
  });
  assert.ok(!variable.reports.some((r) => r.rule === 'weight'));
});

test('a shared family takes its font\'s weights; a missing or looping one fails', () => {
  const { reports } = edit((t) => {
    t.families.display = { use: 'sans' };
    delete t.fonts.inter.axes;
    t.fonts.inter.weights = [400, 700];
  });
  assert.ok(reports.some((r) => r.rule === 'weight' && r.style === 'display-title'));
  const { failures } = edit((t) => {
    t.families.display = { use: 'serif' };
    t.families.serif = { use: 'display' };
    t.families.mono = { system: 'typewriter' };
  });
  assert.deepEqual(rules(failures).sort(), ['reference:display', 'reference:mono', 'reference:serif']);
});
