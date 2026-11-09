import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { applySpaceRoles, spaceCssVars, spaceFluidBlock, spaceGate, spaceSteps } from '../src/index.js';

const theme = JSON.parse(readFileSync(new URL('../../../tokens/themes/starter.json', import.meta.url)));
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

test('the site width and targets write their tokens and preview values', () => {
  const space = { ...structuredClone(theme.space), 'site-width': '80rem', targets: { sm: 32, default: 48, lg: 64 } };
  const out = applySpaceRoles(semantic, space);
  assert.equal(out.spacing['site-width'].$value, '80rem');
  assert.equal(out.spacing.target.$value, '{spacing.48}');
  assert.equal(out.spacing['target-sm'].$value, '{spacing.32}');
  assert.equal(out.spacing.target.$description, semantic.spacing.target.$description);
  const vars = spaceCssVars(space);
  assert.equal(vars['--spacing-site-width'], '80rem');
  assert.equal(vars['--spacing-target-lg'], '4rem');
});

test('a theme without them leaves the tokens as they are', () => {
  const space = structuredClone(theme.space);
  delete space['site-width'];
  delete space.targets;
  const out = applySpaceRoles(semantic, space);
  assert.deepEqual(out.spacing.target, semantic.spacing.target);
  assert.deepEqual(out.spacing['site-width'], semantic.spacing['site-width']);
});

test('a site width that isn\'t a length, and targets off the scale, too small or out of order, fail', () => {
  const steps = [0, 1, 2, 4, 8, 16, 24, 32, 48, 64, 128, 192, 288];
  const rules = (patch) => spaceGate({ ...structuredClone(theme.space), ...patch }, { steps }).failures.map((f) => f.style).sort();
  assert.deepEqual(rules({ 'site-width': 'wide' }), ['site-width']);
  assert.deepEqual(rules({ 'site-width': '72rem' }), []);
  assert.deepEqual(rules({ targets: { sm: 40, default: 48, lg: 64 } }), ['target sm']);
  assert.deepEqual(rules({ targets: { sm: 16, default: 48, lg: 64 } }), ['target sm']);
  assert.deepEqual(rules({ targets: { sm: 24, default: 32, lg: 64 } }), ['target default']);
  assert.deepEqual(rules({ targets: { sm: 32, default: 64, lg: 48 } }), ['target lg']);
});

test('the app sizes write the app group, a role as a fluid reference', () => {
  const space = { ...structuredClone(theme.space), app: { 'padding-inline': 'breathe', 'sidebar-width': 256, 'sidebar-compact-width': 192 } };
  const out = applySpaceRoles(semantic, space);
  assert.equal(out.app['padding-inline'].$value, '{spacing.breathe}');
  assert.equal(out.app['sidebar-width'].$value, '{spacing.256}');
  assert.equal(out.app['padding-inline'].$description, semantic.app['padding-inline'].$description);
  const vars = spaceCssVars(space);
  assert.equal(vars['--app-padding-inline'], 'var(--spacing-breathe)');
  assert.equal(vars['--app-sidebar-compact-width'], '12rem');
  space.app['padding-inline'] = 16;
  assert.equal(applySpaceRoles(semantic, space).app['padding-inline'].$value, '{spacing.16}');
});

test('app sizes off the scale, a compact column wider than the sidebar, or padding that crowds it, fail', () => {
  const steps = [0, 1, 2, 4, 8, 16, 24, 32, 48, 64, 128, 192, 256, 288];
  const app = (patch) => ({ app: { 'padding-inline': 'cushion', 'sidebar-width': 288, 'sidebar-compact-width': 192, ...patch } });
  const rules = (patch) => spaceGate({ ...structuredClone(theme.space), ...app(patch) }, { steps }).failures.map((f) => f.style).sort();
  assert.deepEqual(rules({}), []);
  assert.deepEqual(rules({ 'sidebar-width': 300 }), ['sidebar-width']);
  assert.deepEqual(rules({ 'sidebar-compact-width': 288, 'sidebar-width': 256 }), ['sidebar-compact-width']);
  assert.deepEqual(rules({ 'padding-inline': 'roomy' }), ['padding-inline']);
  assert.deepEqual(rules({ 'padding-inline': 64 }), ['padding-inline']);
  assert.deepEqual(rules({ 'padding-inline': 24 }), []);
});
