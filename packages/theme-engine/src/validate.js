/* ==========================================================================
   Checking a theme against its format
   --------------------------------------------------------------------------
   A small JSON Schema checker, for the parts of the 2020-12 draft the theme
   schema uses: type, const, enum, pattern, minimum and maximum, items,
   minItems and maxItems, properties, propertyNames, additionalProperties,
   required, anyOf, if/then/else and $ref within the schema. No dependencies, so it runs
   in Node and in the Designer's browser alike.

   Each problem names where it is and what was expected:
   "type.fonts.adapter-sans.italicAxes.slnt must be a number".
   ========================================================================== */

import { THEME_SCHEMA_URL, THEME_VERSION, themeSchema } from './theme-schema.js';

const kind = (v) => (v === null ? 'null' : Array.isArray(v) ? 'array' : Number.isInteger(v) ? 'integer' : typeof v);
const fits = (type, v) => type === kind(v) || (type === 'number' && kind(v) === 'integer');
const A = { string: 'text', number: 'a number', integer: 'a whole number', boolean: 'true or false', object: 'an object', array: 'a list', null: 'null' };
const article = (t) => (t === 'string' ? 'text' : A[t] ?? t);
const show = (v) => (typeof v === 'string' ? `"${v}"` : JSON.stringify(v));

/* What a schema expects, in words */
const expects = (schema, root) => {
  const s = schema.$ref ? resolve(schema.$ref, root) : schema;
  if (s.description && !s.properties && !s.additionalProperties) return s.description;
  if ('const' in s) return show(s.const);
  if (s.enum) return `one of ${s.enum.map(show).join(', ')}`;
  if (s.anyOf) return s.anyOf.map((b) => expects(b, root)).join(', or ');
  const types = [].concat(s.type ?? []);
  return types.map(article).join(' or ') || 'something else';
};

const resolve = (ref, root) => ref.replace(/^#\//, '').split('/').reduce((node, key) => node?.[key], root);

/**
 * Checks a value against a schema. Returns a list of problems: { path, message }.
 * `partial` (a sub-brand) needs nothing and lets null remove a value.
 */
export const validate = (value, schema = themeSchema, { partial = false, root = schema, at = '' } = {}) => {
  const problems = [];
  const where = at || 'the theme';
  const fail = (message) => problems.push({ path: at, message: `${where} ${message}` });
  if (schema.$ref) return validate(value, resolve(schema.$ref, root), { partial, root, at });
  if (partial && value === null) return problems;

  if (schema.anyOf) {
    if (!schema.anyOf.some((b) => !validate(value, b, { partial, root, at }).length)) fail(`must be ${expects(schema, root)}`);
    return problems;
  }
  if ('const' in schema && value !== schema.const) fail(`must be ${show(schema.const)}`);
  if (schema.enum && !schema.enum.includes(value)) fail(`must be one of ${schema.enum.map(show).join(', ')}, not ${show(value)}`);
  const types = [].concat(schema.type ?? []);
  if (types.length && !types.some((t) => fits(t, value))) {
    fail(`must be ${schema.description && !schema.properties && !schema.additionalProperties ? schema.description : types.map(article).join(' or ')}, not ${show(value)}`);
    return problems;
  }
  if (problems.length) return problems;
  if (schema.if) {
    const branch = validate(value, schema.if, { root }).length ? schema.else : schema.then;
    if (branch) problems.push(...validate(value, branch, { partial, root, at }));
  }

  if (typeof value === 'string' && schema.pattern && !new RegExp(schema.pattern).test(value)) fail(`must be ${schema.description ?? `text matching ${schema.pattern}`}, not ${show(value)}`);
  if (typeof value === 'number') {
    if (schema.minimum !== undefined && value < schema.minimum) fail(`must be ${schema.minimum} or more, not ${value}`);
    if (schema.maximum !== undefined && value > schema.maximum) fail(`must be ${schema.maximum} or less, not ${value}`);
    if (schema.exclusiveMinimum !== undefined && value <= schema.exclusiveMinimum) fail(`must be more than ${schema.exclusiveMinimum}, not ${value}`);
  }

  if (Array.isArray(value)) {
    if (schema.minItems !== undefined && schema.minItems === schema.maxItems && value.length !== schema.minItems) fail(`must be a list of ${schema.minItems}, not ${value.length}`);
    else {
      if (schema.minItems !== undefined && value.length < schema.minItems) fail(`must have at least ${schema.minItems} items`);
      if (schema.maxItems !== undefined && value.length > schema.maxItems) fail(`must have at most ${schema.maxItems} items`);
    }
    if (schema.items) value.forEach((item, i) => problems.push(...validate(item, schema.items, { partial, root, at: `${at}[${i}]` })));
  }

  if (kind(value) === 'object') {
    const join = (key) => (at ? `${at}.${key}` : key);
    if (!partial) for (const key of schema.required ?? []) if (!(key in value)) fail(`needs ${key}`);
    for (const [key, item] of Object.entries(value)) {
      const own = schema.properties?.[key];
      if (own) {
        problems.push(...validate(item, own, { partial, root, at: join(key) }));
        continue;
      }
      if (schema.propertyNames?.pattern && !new RegExp(schema.propertyNames.pattern).test(key)) {
        problems.push({ path: join(key), message: `${join(key)} isn't a name ${where} can have` });
        continue;
      }
      if (schema.additionalProperties === false) problems.push({ path: join(key), message: `${join(key)} isn't part of ${at ? where : 'a theme'}` });
      else if (schema.additionalProperties) problems.push(...validate(item, schema.additionalProperties, { partial, root, at: join(key) }));
    }
  }
  return problems;
};

/* --------------------------------------------------------------------------
   Versions
   -------------------------------------------------------------------------- */

/* Brings a theme file to the current format. A file without a version is
   from before the format had one, and is version 1. */
export const upgradeTheme = (theme) => {
  if (!theme || typeof theme !== 'object' || Array.isArray(theme)) throw new Error('A theme is a JSON object');
  const version = theme.version ?? 1;
  if (!Number.isInteger(version) || version < 1) throw new Error(`version must be a whole number from 1, not ${show(theme.version)}`);
  if (version > THEME_VERSION) throw new Error(`This theme is format version ${version}, from a newer version of the library: this one reads up to version ${THEME_VERSION}`);
  /* Later versions add their steps here, oldest first */
  return { $schema: THEME_SCHEMA_URL, version: THEME_VERSION, ...theme, ...(theme.version ? {} : { version: THEME_VERSION }) };
};

/* The problems in a theme file: a sub-brand's file is checked as a partial */
export const themeProblems = (theme) => validate(theme, themeSchema, { partial: !!theme?.extends });

/* Upgrades and checks a theme file, and throws with every problem listed */
export const checkTheme = (theme, label = 'theme') => {
  const upgraded = upgradeTheme(theme);
  const problems = themeProblems(upgraded);
  if (problems.length) throw new Error(`${label} doesn't match the theme format:\n${problems.map((p) => `  - ${p.message}`).join('\n')}`);
  return upgraded;
};
