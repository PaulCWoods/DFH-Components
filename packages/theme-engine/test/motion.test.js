import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { applyMotion, motionCssVars, motionGate, motionGlobal } from '../src/index.js';

const read = (file) => JSON.parse(readFileSync(new URL(`../../../tokens/${file}`, import.meta.url)));
const theme = read('theme.json');
const global = read('1-global.json');
const semantic = read('2-semantic.json');

test("today's theme writes the tokens as they are", () => {
  assert.deepEqual(applyMotion(semantic, theme.motion), semantic);
  assert.deepEqual(motionGlobal(global, theme.motion), global);
  assert.deepEqual(motionGate(theme.motion).failures, []);
});

test('a new duration adds its Tier 1 step and keeps the others', () => {
  const motion = structuredClone(theme.motion);
  motion.duration.sm = 0.15;
  assert.equal(motionGlobal(global, motion).duration['015'].$value, '0.15s');
  assert.equal(motionGlobal(global, motion).duration['02'].$value, '0.2s');
  assert.equal(applyMotion(semantic, motion).duration.sm.$value, '{duration.015}');
  assert.equal(applyMotion(semantic, motion).duration.none.$value, '{duration.0}');
  assert.equal(motionCssVars(motion)['--duration-sm'], '0.15s');
});

test('the gate fails durations out of order and a curve CSS would drop', () => {
  const styles = (change) => {
    const motion = structuredClone(theme.motion);
    change(motion);
    return motionGate(motion).failures.map((f) => f.style);
  };
  assert.deepEqual(styles((m) => (m.duration.md = 3)), ['duration lg']);
  assert.deepEqual(styles((m) => (m.ease.in = 'quick')), ['ease in']);
  assert.deepEqual(styles((m) => (m.ease.in = 'cubic-bezier(1.2, 0, 0, 1)')), ['ease in']);
});
