/* ==========================================================================
   Build: a whole theme into tokens
   --------------------------------------------------------------------------
   Runs every gate on a theme, and when nothing fails, writes its colours,
   type, spacing, shape, mixes, high contrast and motion into copies of
   1-global.json and 2-semantic.json, and its customised Tier 3 tokens into
   CSS. The same steps as the separate build:* scripts, in one place, for
   build:themes and the designer's Publish.
   ========================================================================== */

import { buildPalette } from './ramp.js';
import { check } from './gate.js';
import { applyRoles } from './roles.js';
import { colorBlock, withFixed } from './tokens.js';
import { applyTypeStyles, fluidBlock, typeGlobal } from './type.js';
import { typeGate } from './type-gate.js';
import { applySpaceRoles, spaceFluidBlock, spaceGate } from './space.js';
import { applyShape, shapeGate, shapeGlobal, spacingSteps } from './shape.js';
import { applyMixes, mixGate } from './mix.js';
import { applyContrast, contrastGate } from './contrast.js';
import { applyMotion, motionGate, motionGlobal } from './motion.js';
import { componentCss, componentGate } from './components.js';

/* Every gate's failures, by gate */
export const themeFailures = (theme, { global: baseGlobal, semantic, component }) => {
  const palette = buildPalette(theme);
  const global = withFixed(baseGlobal, theme);
  const colors = [...Object.entries(palette).flatMap(([hue, ramp]) => Object.keys(ramp).map((step) => `${hue}.${step}`)), 'white', 'black'];
  const ctx = { semantic, global, palette, roles: theme.roles };
  return {
    pairing: check(ctx).failures,
    mixes: theme.mixes ? mixGate(theme.mixes, ctx).failures : [],
    'high contrast': contrastGate(theme, ctx).failures,
    type: theme.type ? typeGate(theme.type, { semantic, global }).failures : [],
    spacing: theme.space ? spaceGate(theme.space, { steps: spacingSteps(global) }).failures : [],
    shape: theme.shape ? shapeGate(theme.shape, { translucency: global.translucency, steps: spacingSteps(global), colors }).failures : [],
    motion: theme.motion ? motionGate(theme.motion).failures : [],
    components: componentGate(theme.components ?? {}, { component, semantic, global, palette }).failures,
  };
};

/* The theme's tokens. Throws when a gate fails, naming each. */
export const buildTheme = (theme, { global: baseGlobal, semantic: baseSemantic, component }) => {
  const failing = Object.entries(themeFailures(theme, { global: baseGlobal, semantic: baseSemantic, component })).filter(([, f]) => f.length);
  if (failing.length) throw new Error(failing.map(([gate, f]) => `${f.length} ${gate} check${f.length > 1 ? 's' : ''} fail`).join(', '));
  const palette = buildPalette(theme);
  const global = withFixed(structuredClone(baseGlobal), theme);
  global.color = colorBlock(palette, global.color);
  let semantic = applyRoles(baseSemantic, theme.roles, { palette, global });
  if (theme.type) {
    global.typography = typeGlobal(theme.type, global.typography);
    global.fluid = { ...global.fluid, typography: fluidBlock(theme.type, global.fluid?.typography) };
    semantic = applyTypeStyles(semantic, theme.type, { global });
  }
  if (theme.space) {
    global.fluid = { ...global.fluid, spacing: spaceFluidBlock(theme.space) };
    semantic = applySpaceRoles(semantic, theme.space);
  }
  if (theme.shape) {
    Object.assign(global, shapeGlobal(global, theme.shape));
    semantic = applyShape(semantic, theme.shape);
  }
  if (theme.mixes) semantic = applyMixes(semantic, theme.mixes);
  semantic = applyContrast(semantic, theme, { palette, global });
  if (theme.motion) {
    Object.assign(global, motionGlobal(global, theme.motion));
    semantic = applyMotion(semantic, theme.motion);
  }
  return { global, semantic, componentCss: componentCss(theme.components ?? {}, component) };
};
