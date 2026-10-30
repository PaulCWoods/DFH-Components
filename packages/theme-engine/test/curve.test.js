import { test } from 'node:test';
import assert from 'node:assert/strict';
import { easing, parseCurve, PRESETS } from '../src/curve.js';

test('linear is the identity', () => {
  const f = easing('linear');
  for (const x of [0, 0.25, 0.5, 1]) assert.equal(f(x), x);
});

test('every preset runs from 0 to 1 and is monotonic', () => {
  for (const name of Object.keys(PRESETS)) {
    const f = easing(name);
    assert.equal(f(0), 0);
    assert.equal(f(1), 1);
    let prev = 0;
    for (let i = 1; i <= 20; i++) {
      const y = f(i / 20);
      assert.ok(y >= prev - 1e-9, `${name} falls at ${i / 20}`);
      prev = y;
    }
  }
});

test('an S is gentle at the ends and steep in the middle', () => {
  const f = easing('s');
  assert.ok(f(0.1) < 0.1 && f(0.9) > 0.9);
  assert.ok(f(0.55) - f(0.45) > 0.1);
});

test('symmetric curves pass through the middle', () => {
  for (const name of ['s', 'soft-s', 'reverse-s']) assert.ok(Math.abs(easing(name)(0.5) - 0.5) < 1e-6);
});

test('bad curves are refused', () => {
  assert.throws(() => parseCurve('wobbly'));
  assert.throws(() => parseCurve('cubic-bezier(1.5, 0, 0.5, 1)'));
  assert.throws(() => parseCurve('cubic-bezier(0, 0, 1)'));
});
