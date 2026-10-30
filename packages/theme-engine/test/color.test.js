import { test } from 'node:test';
import assert from 'node:assert/strict';
import { hexToOklch, oklchToHex, contrast, apca, maxChroma, inGamut } from '../src/color.js';

test('hex survives a round trip through OKLCH', () => {
  for (const hex of ['#000000', '#ffffff', '#ff2e25', '#30aa94', '#8a8984', '#ffa300']) {
    assert.equal(oklchToHex(hexToOklch(hex)), hex);
  }
});

test('known OKLCH values', () => {
  const white = hexToOklch('#ffffff');
  assert.ok(Math.abs(white.l - 1) < 1e-3 && white.c < 1e-3);
  const red = hexToOklch('#ff0000');
  assert.ok(Math.abs(red.l - 0.628) < 2e-3 && Math.abs(red.c - 0.2577) < 2e-3 && Math.abs(red.h - 29.23) < 0.5);
});

test('out-of-gamut colours lose chroma, not lightness or hue', () => {
  const lch = { l: 0.9, c: 0.3, h: 145 };
  assert.equal(inGamut(lch), false);
  const back = hexToOklch(oklchToHex(lch));
  assert.ok(Math.abs(back.l - 0.9) < 0.01);
  assert.ok(Math.abs(back.h - 145) < 2);
  assert.ok(back.c <= maxChroma(0.9, 145) + 0.005);
});

test('WCAG contrast', () => {
  assert.equal(contrast('#000000', '#ffffff').toFixed(2), '21.00');
  assert.equal(contrast('#777777', '#ffffff').toFixed(2), '4.48');
  assert.equal(contrast('#ffffff', '#ffffff'), 1);
});

test('APCA polarity and scale', () => {
  assert.ok(Math.abs(apca('#000000', '#ffffff') - 106) < 1);
  assert.ok(apca('#ffffff', '#000000') < -100);
  assert.equal(apca('#888888', '#888888'), 0);
});
