import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { THEME_SCHEMA_URL, THEME_VERSION, checkTheme, themeProblems, upgradeTheme, validate, themeSchema } from '../src/index.js';

const dir = new URL('../../../tokens/themes/', import.meta.url);
const themes = Object.fromEntries(readdirSync(dir).filter((f) => f.endsWith('.json')).map((f) => [f.slice(0, -5), JSON.parse(readFileSync(new URL(f, dir)))]));
const starter = themes.starter;
const messages = (theme) => themeProblems(theme).map((p) => p.message);

test('every theme matches the format and names it', () => {
  for (const [name, theme] of Object.entries(themes)) {
    assert.deepEqual(themeProblems(theme), [], name);
    assert.equal(theme.$schema, THEME_SCHEMA_URL, name);
    assert.equal(theme.version, THEME_VERSION, name);
  }
});

test('a problem says where it is and what was expected', () => {
  const theme = structuredClone(starter);
  theme.type.fonts.x = { source: 'adobe', family: 'pe', axes: { wght: [100, 900] }, italicAxes: { slnt: '-10' } };
  theme.space.base = '16';
  theme.hues.blue.seed = 'blue';
  theme.shape.radius.default = true;
  assert.deepEqual(messages(theme), [
    'hues.blue.seed must be a hex colour, such as #0055ff, not "blue"',
    'type.fonts.x.italicAxes.slnt must be a number, not "-10"',
    'space.base must be a length in rem, px, em or ch, such as 1rem, not "16"',
    'shape.radius.default must be a number or text, not true',
  ]);
});

test('an unknown key or a misspelt one is named', () => {
  const theme = structuredClone(starter);
  theme.colour = {};
  theme.type.scale.ration = 1.2;
  theme.type.styles['Body Large'] = { size: 1 };
  assert.deepEqual(messages(theme).sort(), ['colour isn\'t part of a theme', 'type.scale.ration isn\'t part of type.scale', 'type.styles.Body Large isn\'t a name type.styles can have']);
});

test('a full theme needs its colours; a sub-brand needs nothing and null removes', () => {
  const { hues, ...noHues } = starter;
  assert.deepEqual(messages(noHues), ['the theme needs hues']);
  assert.deepEqual(themeProblems({ version: 1, extends: 'dfh', type: { scale: { min: null } }, components: { 'card.radius': null } }), []);
  /* null isn't allowed in a full theme */
  assert.deepEqual(messages({ ...starter, curve: null }), ['curve must be linear, a preset (soft-s) or a cubic-bezier(), not null']);
});

test('a file without a version is version 1; a newer one is refused', () => {
  const { version, $schema, ...old } = starter;
  const upgraded = upgradeTheme(old);
  assert.equal(upgraded.version, 1);
  assert.equal(upgraded.$schema, THEME_SCHEMA_URL);
  assert.deepEqual(Object.keys(upgraded).slice(0, 2), ['$schema', 'version']);
  assert.throws(() => upgradeTheme({ ...starter, version: THEME_VERSION + 1 }), /newer version of the library/);
  assert.throws(() => upgradeTheme([]), /JSON object/);
});

test('checkTheme lists every problem in one error', () => {
  assert.throws(() => checkTheme({ ...starter, curve: 3, colour: {} }, 'tokens/themes/x.json'), (error) => {
    assert.match(error.message, /^tokens\/themes\/x\.json doesn't match the theme format:/);
    assert.match(error.message, /- curve must be/);
    assert.match(error.message, /- colour isn't part of a theme/);
    return true;
  });
});

test('the checker reads anyOf, if/else and $ref as JSON Schema does', () => {
  assert.deepEqual(validate('', themeSchema.$defs.type.properties.scale.properties.min, { root: themeSchema }), []);
  assert.equal(validate('1', themeSchema.$defs.type.properties.scale.properties.min, { root: themeSchema }).length, 1);
  assert.deepEqual(validate({ version: 1, extends: 'dfh' }, themeSchema), []);
  assert.deepEqual(validate({ version: 1 }, themeSchema).map((p) => p.message), ['the theme needs hues', 'the theme needs roles']);
});
