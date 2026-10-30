import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { applyTypeStyles, evalCalc, fluidBlock, fluidSteps, fontFaces, fontLinks, fontStack, migrateType, scaleSteps, styleTokens, typeCssVars, typeGlobal } from '../src/index.js';

const read = (p) => JSON.parse(readFileSync(new URL(`../../../tokens/${p}`, import.meta.url)));
const semantic = read('2-semantic.json');
const global = read('1-global.json');
const theme = read('theme.json');

test('the scale is base × ratio to the power of the step', () => {
  const steps = scaleSteps({ scale: { base: '1rem', ratio: 1.25, steps: [-1, 2] } });
  assert.deepEqual(steps, { '-1': 0.8, 0: 1, 1: 1.25, 2: 1.5625 });
});

test('a fluid step runs from the small scale to the large one', () => {
  const steps = fluidSteps({ scale: { base: '1rem', ratio: 1.2, steps: [0, 1] }, fluid: { min: { ratio: 1.2 }, max: { base: '1.2rem', ratio: 1.25 } } });
  assert.deepEqual(steps, { 0: [1, 1.2], 1: [1.2, 1.5] });
});

test('the tokens already say what the theme says', () => {
  assert.deepEqual(typeGlobal(theme.type, global.typography), global.typography);
  assert.deepEqual(fluidBlock(theme.type, global.fluid.typography), global.fluid.typography);
  assert.deepEqual(applyTypeStyles(semantic, theme.type, { global }), semantic);
});

test('migrating today\'s tokens gives the theme back', () => {
  assert.deepEqual(migrateType(global, semantic), theme.type);
});

test('a style that grows to another step points at that range', () => {
  const tokens = styleTokens('display-title', { size: 5, compact: 4, growTo: 8 });
  const sizes = Object.fromEntries(tokens.map(([group, , value]) => [group, value]));
  assert.equal(sizes['display-title-fixed'], '{typography.font-size.5}');
  assert.equal(sizes['display-title-compact'], '{typography.font-size.4}');
  assert.equal(sizes['display-title-fluid'], '{fluid.typography.font-size.5-8}');
  assert.equal(sizes['display-title-cq'], '{typography.font-size.cq.5-8}');
});

test('a fixed style has no fluid or cq size', () => {
  const groups = styleTokens('label', { size: 0, compact: -1, fluid: false, sizeOnStyle: true }).map(([group, key]) => `${group}.${key}`);
  assert.deepEqual(groups, ['label.font-size', 'label-compact.font-size']);
});

test('changing a line height writes the number; an equal one keeps its reference', () => {
  const type = structuredClone(theme.type);
  type.styles.heading.lineHeight = 1.2;
  const out = applyTypeStyles(semantic, type, { global });
  assert.equal(out.heading['line-height'].$value, 1.2);
  assert.equal(out.body['line-height'].$value, semantic.body['line-height'].$value);
});

test('a family is its quoted name, then the fallback', () => {
  assert.equal(fontStack({ family: 'Inter', fallback: 'system-ui, sans-serif' }), '"Inter", system-ui, sans-serif');
  assert.equal(fontStack({ fallback: 'Georgia, serif' }), 'Georgia, serif');
});

test('font sources give the page-head links and @font-face rules', () => {
  const type = {
    fonts: {
      a: { source: 'google', family: 'Plus Jakarta Sans', weights: [700, 400] },
      b: { source: 'adobe', kit: 'abc1234', family: 'freight-sans-pro' },
      c: { source: 'local', family: 'House Serif', files: [{ path: 'fonts/house-400.woff2', weight: 400 }] },
    },
  };
  const links = fontLinks(type);
  assert.ok(links.some((l) => l.includes('family=Plus+Jakarta+Sans:wght@400;700')));
  assert.ok(links.includes('<link rel="stylesheet" href="https://use.typekit.net/abc1234.css" />'));
  const faces = fontFaces(type, { base: '/' });
  assert.match(faces, /font-family: "House Serif";/);
  assert.match(faces, /src: url\("\/fonts\/house-400\.woff2"\) format\("woff2"\);/);
});

test('calc() line heights evaluate to numbers', () => {
  assert.equal(evalCalc('calc(1.6 * pow(1.125, 0))'), 1.6);
  assert.ok(Math.abs(evalCalc('calc(1.6 * pow(1.125, -4))') - 0.9989) < 0.0001);
});

test('the preview properties match the compiled CSS', () => {
  const css = readFileSync(new URL('../../css/src/variables.css', import.meta.url), 'utf8');
  for (const [name, value] of Object.entries(typeCssVars(theme.type))) {
    const line = css.split('\n').find((l) => l.trim().startsWith(`${name}:`));
    assert.equal(line?.trim(), `${name}: ${value};`, name);
  }
});
