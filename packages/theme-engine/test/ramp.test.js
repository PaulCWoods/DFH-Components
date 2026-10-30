import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildRamp, buildPalette, lightnesses, STEPS } from '../src/ramp.js';
import { hexToOklch } from '../src/color.js';

const base = { curve: 'soft-s', ends: { light: 0.97, dark: 0.27 }, chroma: { light: 0.2, dark: 0.65 } };

test('lightness runs from the light end to the dark end', () => {
  const ls = lightnesses(base);
  assert.equal(ls.length, STEPS.length);
  assert.ok(Math.abs(ls[0] - 0.97) < 1e-9 && Math.abs(ls.at(-1) - 0.27) < 1e-9);
  for (let i = 1; i < ls.length; i++) assert.ok(ls[i] < ls[i - 1]);
});

test('every hue has the same lightness at the same step', () => {
  const a = buildRamp({ ...base, seed: '#ff2e25' });
  const b = buildRamp({ ...base, seed: '#30aa94' });
  for (const s of STEPS) assert.ok(Math.abs(hexToOklch(a[s].hex).l - hexToOklch(b[s].hex).l) < 0.01, s);
});

test('the 500 keeps the picked hue', () => {
  for (const seed of ['#ad77e1', '#379fd7', '#56a900']) {
    const ramp = buildRamp({ ...base, seed });
    assert.ok(Math.abs(hexToOklch(ramp['500'].hex).h - hexToOklch(seed).h) < 3, seed);
  }
});

test('steps outside the curve follow the ends', () => {
  const outside = { '000': 0.02, '1000': 0.04 };
  const ramp = buildRamp({ ...base, seed: '#8a8984', outside });
  assert.ok(ramp['000'].l > ramp['100'].l && ramp['1000'].l < ramp['900'].l);
  const moved = buildRamp({ ...base, seed: '#8a8984', outside, ends: { light: 0.9, dark: 0.35 } });
  assert.ok(Math.abs(moved['000'].l - 0.92) < 1e-9 && Math.abs(moved['1000'].l - 0.31) < 1e-9);
  assert.equal(buildRamp({ ...base, seed: '#8a8984', outside: { '000': 0.5 } })['000'].l, 1);
});

test('exact keeps the picked colour as the 500', () => {
  const curved = buildRamp({ ...base, seed: '#ad77e1' });
  const exact = buildRamp({ ...base, seed: '#AD77E1', exact: true });
  assert.notEqual(curved['500'].hex, '#ad77e1');
  assert.equal(exact['500'].hex, '#ad77e1');
  assert.equal(exact['100'].hex, curved['100'].hex);
  assert.equal(exact['900'].hex, curved['900'].hex);
});

test('an exact 500 bends the curve through the picked lightness', () => {
  const ramp = buildRamp({ ...base, seed: '#ad77e1', exact: true });
  const ls = STEPS.map((s) => ramp[s].l);
  assert.ok(Math.abs(ls[4] - hexToOklch('#ad77e1').l) < 1e-6);
  ls.slice(1).forEach((l, i) => assert.ok(l < ls[i], `step ${STEPS[i + 1]} is darker than ${STEPS[i]}`));
  // A pick lighter than the light end is held inside it, so the steps still run light to dark
  const pale = buildRamp({ ...base, seed: '#fdfbff', exact: true });
  STEPS.slice(1, 4).forEach((s, i) => assert.ok(pale[s].l < pale[STEPS[i]].l));
});

test('a theme must keep neutral, red, amber and green', () => {
  const hues = { neutral: { seed: '#8a8984' }, red: { seed: '#ff2e25' }, amber: { seed: '#ffa300' } };
  assert.throws(() => buildPalette({ ...base, hues }), /green/);
  assert.ok(buildPalette({ ...base, hues: { ...hues, green: { seed: '#56a900' }, sea: { seed: '#30aa94' } } }).sea);
  assert.throws(() => buildPalette({ ...base, hues: { ...hues, green: { seed: '#56a900' }, 'Sea Blue': { seed: '#30aa94' } } }));
});
