import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { applySpaceRoles, spaceCssVars, spaceFluidBlock, spaceGate, spaceSteps } from '../src/index.js';

const theme = JSON.parse(readFileSync(new URL('../../../tokens/theme.json', import.meta.url)));
const semantic = JSON.parse(readFileSync(new URL('../../../tokens/2-semantic.json', import.meta.url)));

test('each role grows from its start to base × ratio^step', () => {
  assert.deepEqual(spaceSteps(theme.space), {
    'breathe-sm': [0.75, 1],
    breathe: [1, 1.3333],
    cushion: [1, 1.7778],
    'cushion-lg': [1, 2.3704],
  });
});

test('the tokens are fluid() steps, and the roles point at them', () => {
  assert.equal(spaceFluidBlock(theme.space).breathe.$value, 'fluid(1rem, 1.3333rem)');
  const out = applySpaceRoles(semantic, theme.space);
  assert.equal(out.spacing.cushion.$value, '{fluid.spacing.cushion}');
  assert.equal(out.spacing['cq-cushion'].$value, '{fluid.spacing.cq.cushion}');
  assert.equal(out.spacing.cushion.$description, semantic.spacing.cushion.$description);
});

test('the preview clamps match what the compiler wrote before (vi and cqi)', () => {
  const vars = spaceCssVars(theme.space);
  assert.equal(vars['--fluid-spacing-breathe'], 'clamp(1rem, 0.85rem + 0.61vi, 1.3333rem)');
  assert.equal(vars['--fluid-spacing-cq-cushion'], 'clamp(1rem, 0.65rem + 1.41cqi, 1.7778rem)');
});

test('today\'s spacing passes; a shrinking or out-of-order role fails', () => {
  assert.deepEqual(spaceGate(theme.space).failures, []);
  const space = structuredClone(theme.space);
  space.roles.breathe.from = '2rem';
  const rules = spaceGate(space).failures.map((f) => f.style).sort();
  assert.deepEqual(rules, ['breathe', 'cushion']);
});
