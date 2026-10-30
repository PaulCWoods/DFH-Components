import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { leadingSteps, SYSTEM_STACKS, fontsCss, roleFont, roleStack, applyTypeStyles, evalCalc, figmaTextStyles, fontCovers, pickWeights, fluidBlock, fluidSteps, fontFaces, fontLinks, fontStack, migrateType, refVar, scaleSteps, styleTokens, typeCssVars, typeGlobal } from '../src/index.js';
import { useFixtureFonts } from './fonts-fixture.js';

const read = (p) => JSON.parse(readFileSync(new URL(`../../../tokens/${p}`, import.meta.url)));
const semantic = read('2-semantic.json');
const global = read('1-global.json');
const theme = read('theme.json');

test('the scale is base × ratio to the power of the step', () => {
  const steps = scaleSteps({ scale: { base: '1rem', ratio: 1.25, steps: [-1, 2] } });
  assert.deepEqual(steps, { '-1': 0.8, 0: 1, 1: 1.25, 2: 1.5625 });
});

test('a fluid step runs from the small scale to the large one', () => {
  const steps = fluidSteps({ scale: { base: '1rem', ratio: 1.2, steps: [0, 1] }, fluid: { max: { base: '1.2rem', ratio: 1.25 } } });
  assert.deepEqual(steps, { 0: [1, 1.2], 1: [1.2, 1.5] });
});

test('the tokens already say what the theme says', () => {
  assert.deepEqual(typeGlobal(theme.type, global.typography), global.typography);
  assert.deepEqual(fluidBlock(theme.type, global.fluid.typography), global.fluid.typography);
  assert.deepEqual(applyTypeStyles(semantic, theme.type, { global }), semantic);
});

test('migrating today\'s tokens gives the scale and styles back', () => {
  /* The role tokens now name system stacks and the fonts sit in fonts.css,
     so migration (a one-off, before the theme existed) can't recover them */
  const { scale, fluid, styles } = migrateType(global, semantic);
  assert.deepEqual({ scale, fluid, styles }, { scale: theme.type.scale, fluid: theme.type.fluid, styles: theme.type.styles });
});

test('role tokens name system stacks; fonts.css points them at the theme\'s fonts', () => {
  const type = useFixtureFonts(structuredClone(theme.type));
  type.fonts.georgia = { source: 'system', family: 'Georgia', fallback: 'serif' };
  type.families.serif = { font: 'georgia' };
  type.families.display = { use: 'sans' };
  const typo = typeGlobal(type, global.typography);
  assert.equal(typo['font-family'].sans.$value, SYSTEM_STACKS['sans-serif']);
  assert.equal(typo['font-family'].mono.$value, SYSTEM_STACKS.monospace);
  assert.equal(typo['font-family'].serif.$value, '{typography.font-family.georgia}');
  assert.equal(typo['font-family'].display.$value, '{typography.font-family.sans}');
  const css = fontsCss(type);
  assert.match(css, /--typography-font-family-sans: "Inter", /);
  assert.ok(!css.includes('font-family-serif') && !css.includes('font-family-display'));
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

test('a style\'s line height is a step on the line-height scale; an equal one keeps its reference', () => {
  const type = structuredClone(theme.type);
  type.styles.heading.leading = -2;
  const out = applyTypeStyles(semantic, type, { global });
  assert.equal(out.heading['line-height'].$value, '{typography.line-height.minus-2}');
  /* display-title points at title's line height, the same step: left as written */
  assert.equal(out['display-title']['line-height'].$value, semantic['display-title']['line-height'].$value);
  assert.deepEqual(leadingSteps(type), { '-5': 0.888, '-4': 0.999, '-3': 1.124, '-2': 1.264, '-1': 1.422, 0: 1.6, 1: 1.8 });
});

test('changing the line-height scale rewrites its steps', () => {
  const type = structuredClone(theme.type);
  type.leading.base = 1.5;
  const typo = typeGlobal(type, global.typography);
  assert.equal(typo['line-height']['0'].$value, '1.5');
  assert.equal(typo['line-height']['minus-3'].$value, 'calc(1.5 * pow(1.125, -3))');
});

test('a change to a cq step is written, though cq steps exist only in the CSS', () => {
  const type = structuredClone(theme.type);
  type.styles.heading.cq = { from: 1, to: 2 };
  assert.equal(applyTypeStyles(semantic, type, { global })['heading-cq']['font-size'].$value, '{typography.font-size.cq.1-2}');
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
  const compiled = (name) => css.split('\n').find((l) => l.trim().startsWith(`${name}:`))?.trim().slice(name.length + 1, -1).trim();
  for (const [name, value] of Object.entries(typeCssVars(theme.type))) {
    /* Scale and families exactly; a text style's value may point another way
       (heading's family is var(--body-font-family) in the CSS) but must exist */
    /* A role on a web font is a system stack in the CSS; fonts.css gives the preview's value */
    if (/^--typography-font-family-(sans|serif|mono|display)$/.test(name)) assert.ok(compiled(name) !== undefined, name);
    else if (name.startsWith('--typography-') || name.startsWith('--fluid-')) assert.equal(compiled(name), value, name);
    else assert.ok(compiled(name) !== undefined, `${name} is compiled`);
  }
  /* Every var() a style points at is a compiled property */
  for (const value of Object.values(typeCssVars(theme.type))) {
    const inner = /^var\((--[\w-]+)\)$/.exec(value)?.[1];
    if (inner) assert.ok(compiled(inner) !== undefined, `${inner} is compiled`);
  }
});

test('references become the compiler\'s property names', () => {
  assert.equal(refVar('{fluid.typography.font-size.2-3}'), 'var(--typography-font-size-fluid-2-3)');
  assert.equal(refVar('{typography.font-size.minus-1}'), 'var(--typography-font-size--1)');
  assert.equal(refVar('{typography.font-size.cq.-2}'), 'var(--typography-font-size-cq--2)');
  assert.equal(refVar('{font-weight.bold}'), 'var(--font-weight-bold)');
  assert.equal(refVar(1.6), '1.6');
});

test('Figma gets every style, fixed and compact, on tokens that exist', () => {
  const styles = figmaTextStyles(semantic);
  const { compact, ...fixed } = styles;
  assert.equal(Object.keys(fixed).length, 14);
  assert.deepEqual(Object.keys(compact), Object.keys(fixed));
  const exists = (ref) => [global, semantic].some((f) => ref.slice(1, -1).split('.').reduce((o, k) => o?.[k], f) !== undefined);
  for (const token of [...Object.values(fixed), ...Object.values(compact)]) {
    for (const value of Object.values(token.$value)) if (String(value).startsWith('{')) assert.ok(exists(value), value);
  }
  assert.deepEqual(fixed.heading.$value, {
    fontFamily: '{typography.font-family.sans}',
    fontWeight: '{font-weight.bold}',
    lineHeight: '{typography.line-height.minus-3}',
    letterSpacing: '{typography.spacing.normal}',
    textCase: 'none',
    fontSize: '{typography.font-size.2}',
  });
  assert.equal(compact.heading.$value.fontSize, '{typography.font-size.1}');
  assert.equal(fixed['micro-heading'].$value.textCase, 'uppercase');
  /* code has no size of its own: body's */
  assert.equal(fixed.code.$value.fontSize, '{typography.font-size.0}');
});

test('a line height written as a number becomes a percentage for Figma', () => {
  const edited = structuredClone(semantic);
  edited.heading['line-height'].$value = 1.2;
  assert.equal(figmaTextStyles(edited).heading.$value.lineHeight, '120%');
});

test('a variable Google font asks for its axes as ranges, in Google\'s order', () => {
  const [, , link] = fontLinks({
    fonts: {
      inter: { source: 'google', family: 'Inter', axes: { wght: [100, 900], opsz: [14, 32] }, italic: true },
      flex: { source: 'google', family: 'Roboto Flex', axes: { wght: [100, 1000], GRAD: [-200, 150], wdth: [25, 151] } },
    },
  });
  assert.ok(link.includes('family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900'));
  assert.ok(link.includes('family=Roboto+Flex:wdth,wght,GRAD@25..151,100..1000,-200..150'));
});

test('a variable stored font gets a weight range in @font-face', () => {
  const faces = fontFaces({ fonts: { v: { source: 'local', family: 'House', axes: { wght: [200, 800] }, files: [{ path: 'fonts/house.woff2' }] } } });
  assert.match(faces, /font-weight: 200 800;/);
});

test('the first weights ticked are those nearest 400 and 700', () => {
  assert.deepEqual(pickWeights([100, 200, 300, 400, 500, 600, 700, 800, 900]), [400, 700]);
  assert.deepEqual(pickWeights([600, 700, 800]), [600, 700]);
  assert.deepEqual(pickWeights([400]), [400]);
  assert.deepEqual(pickWeights([]), [400, 700]);
});

test('a font covers the weights it loads, a variable font its whole range', () => {
  assert.ok(fontCovers({ source: 'google', weights: [400, 700] }, 700));
  assert.ok(!fontCovers({ source: 'google', weights: [400, 700] }, 800));
  assert.ok(fontCovers({ source: 'adobe', axes: { wght: [100, 900] } }, 650));
  assert.ok(fontCovers({ source: 'system' }, 800));
});

test('a family can share another\'s font or take a system stack, and loads nothing of its own', () => {
  const type = useFixtureFonts(structuredClone(theme.type));
  type.families.display = { use: 'sans' };
  type.families.mono = { system: 'monospace' };
  const links = fontLinks(type).join('\n');
  assert.ok(links.includes('family=Inter'));
  assert.ok(!links.includes('Plus+Jakarta') && !links.includes('JetBrains'));
  const typo = typeGlobal(type, global.typography);
  assert.equal(typo['font-family'].display.$value, '{typography.font-family.sans}');
  assert.equal(typo['font-family'].mono.$value, SYSTEM_STACKS.monospace);
  const vars = typeCssVars(type);
  assert.equal(vars['--typography-font-family-display'], 'var(--typography-font-family-sans)');
  assert.equal(roleFont(type, 'display').family, 'Inter');
  assert.equal(roleStack(type, 'mono'), SYSTEM_STACKS.monospace);
});
