import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { styleSizes, typeGate } from '../src/index.js';
import { useFixtureFonts } from './fonts-fixture.js';

const read = (p) => JSON.parse(readFileSync(new URL(`../../../tokens/${p}`, import.meta.url)));
const semantic = read('2-semantic.json');
const global = read('1-global.json');
const theme = read('themes/starter.json');
const files = { semantic, global };

const edit = (fn) => {
  const type = structuredClone(theme.type);
  fn(type);
  return typeGate(type, files);
};
const rules = (rows) => rows.map((r) => `${r.rule}:${r.style}`);

test('today\'s theme passes; anything it reports names a style and why', () => {
  /* Reports follow the theme's design (a small size, a cq range that starts lower), so they aren't pinned here */
  const { failures, reports } = typeGate(theme.type, files);
  assert.deepEqual(failures, []);
  for (const r of reports) assert.ok(r.rule && r.style && r.message, JSON.stringify(r));
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
  assert.deepEqual(rules(failures.filter((f) => f.rule === 'growth')), ['growth:heading']);
});

test('a style\'s sizes follow the system unless it grows to another step', () => {
  /* A style of its own, so the test follows the rules rather than the theme's choices */
  const style = { family: 'sans', weight: 'bold', size: 5, compact: 4, leading: 0 };
  const sizes = styleSizes(theme.type, style);
  assert.equal(sizes.fixed, Number((theme.type.scale.ratio ** 5).toFixed(4)));
  assert.ok(sizes.compact < sizes.fixed);
  assert.equal(sizes.fluid[0], sizes.fixed);
  assert.ok(sizes.fluid[1] > sizes.fixed);
  assert.deepEqual(sizes.cq, sizes.fluid);
  const grows = styleSizes(theme.type, { ...style, growTo: 6 });
  assert.equal(grows.fluid[0], sizes.fluid[0]);
  assert.ok(grows.fluid[1] > sizes.fluid[1]);
  assert.deepEqual(grows.cq, grows.fluid);
  assert.equal(styleSizes(theme.type, { ...style, fluid: false }).fluid, undefined);
  /* Fluid always starts at the fixed size, and cq always follows it: the old settings do nothing */
  assert.deepEqual(styleSizes(theme.type, { ...style, fluidFrom: 6, cq: { from: 3 } }), sizes);
});

test('the ceilings hold large sizes down and say so; 0 lifts one', () => {
  const big = edit(() => {});
  const display = styleSizes(theme.type, theme.type.styles['display-title']);
  assert.equal(display.fixed, 3);
  assert.equal(display.fluid[1], 6);
  assert.ok(big.reports.some((r) => r.rule === 'ceiling' && r.style === 'display-title' && /lower/.test(r.message)));
  assert.ok(big.reports.some((r) => r.rule === 'ceiling' && r.style === 'display-title' && /upper/.test(r.message)));
  const off = structuredClone(theme.type);
  off.scale.ceiling = { lower: 0, upper: 0 };
  assert.ok(styleSizes(off, off.styles['display-title']).fixed > 3);
  assert.ok(!typeGate(off, files).reports.some((r) => r.rule === 'ceiling'));
  /* A narrow display font can take a higher lower ceiling */
  const narrow = structuredClone(theme.type);
  narrow.scale.ceiling = { lower: '4rem' };
  assert.equal(styleSizes(narrow, narrow.styles['display-title']).fixed, 4);
});

test('ceilings out of order fail', () => {
  const rules = (fn) => edit(fn).failures.filter((f) => f.rule === 'scale').map((f) => f.message);
  assert.ok(rules((t) => (t.scale.ceiling = { lower: '0.5rem' })).some((m) => /lower ceiling/.test(m)));
  assert.ok(rules((t) => (t.scale.ceiling = { lower: '4rem', upper: '3rem' })).some((m) => /upper ceiling/.test(m)));
  assert.ok(rules((t) => (t.scale.ceiling = { lower: 'big' })).some((m) => /isn't a length/.test(m)));
});

test('a tight line height is reported on reading text, not on small text', () => {
  const { reports } = edit((t) => {
    for (const name of ['body', 'body-sm', 'body-xs']) if (t.styles[name]) t.styles[name].leading = -3;
  });
  const tight = rules(reports.filter((r) => r.rule === 'line-height' && /below 1.5/.test(r.message)));
  assert.ok(tight.includes('line-height:body'));
  assert.ok(!tight.includes('line-height:body-sm') && !tight.includes('line-height:body-xs'));
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
  const { reports } = edit((t) => (useFixtureFonts(t).fonts['plus-jakarta-sans'].weights = [600, 700]));
  assert.ok(reports.some((r) => r.rule === 'weight' && r.style === 'display-title'));
  const variable = edit((t) => {
    useFixtureFonts(t);
    delete t.fonts['plus-jakarta-sans'].weights;
    t.fonts['plus-jakarta-sans'].axes = { wght: [200, 800] };
  });
  assert.ok(!variable.reports.some((r) => r.rule === 'weight'));
});

test('a shared family takes its font\'s weights; a missing or looping one fails', () => {
  const { reports } = edit((t) => {
    useFixtureFonts(t);
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

test('steps at the minimum may be equal; a bad or too large minimum fails', () => {
  const flat = edit((t) => {
    t.scale.ratio = 1.1;
    t.scale.min = '0.92rem';
  });
  assert.deepEqual(flat.failures.filter((r) => r.rule === 'scale'), []);
  assert.ok(flat.reports.some((r) => r.rule === 'floor' && r.style === 'scale'));
  assert.ok(!flat.reports.some((r) => r.rule === 'floor' && r.style !== 'scale'));
  assert.ok(edit((t) => (t.scale.min = '12')).failures.some((r) => r.rule === 'scale'));
  assert.ok(edit((t) => (t.scale.min = '1.5rem')).failures.some((r) => r.rule === 'scale'));
});

test('a style at the floor in a regular or lighter weight is reported, a heavier one isn\'t', () => {
  const floorWeight = (fn) => edit(fn).reports.filter((r) => r.rule === 'floor-weight').map((r) => r.style);
  const regular = floorWeight((t) => (t.styles['body-xs'].weight = 'regular'));
  assert.ok(regular.includes('body-xs'));
  const bold = floorWeight((t) => (t.styles['body-xs'].weight = 'bold'));
  assert.ok(!bold.includes('body-xs'));
});
