#!/usr/bin/env node
/* ==========================================================================
   check:tokens: Tier 3 defaults live in the component CSS
   --------------------------------------------------------------------------
   A Tier 3 token is a hook: the CSS reads it with a fallback that is its
   default, and tokens/3-component.json records the same default for Figma.
   This fails when the two disagree, with Tier 3 taken as unset (as it is in
   variables.css), so a fallback can't lean on another component's token.

   Fails on: a token whose JSON value differs from a fallback the CSS gives it,
   a token the CSS reads with no fallback, a token nothing reads, and a token
   that names a Tier 2 token ({app.border-width}) whose fallback doesn't
   read it: the value matches today, but a theme that changes that token
   would reach Figma and not the CSS.
   -- --json prints the findings instead.
   ========================================================================== */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const src = join(root, 'packages/css/src');

/* Tier 3 names and values, from the JSON */
const tier3 = new Map();
/* A token's custom property name, as compile-tokens.js writes it */
const nameOf = (path) => `--${path.replace(/\./g, '-').replace(/minus-(\d+)/g, '-$1').replace(/-default(-|$)/, '$1')}`;
const weights = { thin: '100', light: '300', regular: '400', normal: '400', medium: '500', semibold: '600', bold: '700', black: '900' };
const walk = (node, path) => {
  if (!node || typeof node !== 'object') return;
  if ('$value' in node) {
    const value = String(node.$value);
    const weight = path.includes('font-weight') || path.at(-1).includes('font-weight') ? weights[value.trim().toLowerCase()] : null;
    return void tier3.set(nameOf(path.join('.')), weight ?? value);
  }
  for (const [key, value] of Object.entries(node)) if (!key.startsWith('$')) walk(value, [...path, key]);
};
walk(JSON.parse(readFileSync(join(root, 'tokens/3-component.json'), 'utf8')), []);

/* Everything else the page defines: Tier 1, Tier 2 and the theme's fonts */
const defined = new Map();
const readDefined = (file) => {
  for (const m of readFileSync(file, 'utf8').matchAll(/^\s*(--[\w-]+):\s*([^;]+);/gm)) {
    if (!defined.has(m[1]) && !tier3.has(m[1])) defined.set(m[1], m[2].trim());
  }
};
readDefined(join(src, 'variables.css'));

/* Splits var(--name, fallback) at a position */
const readVar = (text, start) => {
  let depth = 0;
  let comma = -1;
  let end = start + 3;
  for (; end < text.length; end++) {
    if (text[end] === '(') depth++;
    else if (text[end] === ')') {
      if (--depth === 0) break;
    } else if (text[end] === ',' && depth === 1 && comma < 0) comma = end;
  }
  return {
    name: text.slice(start + 4, comma > 0 ? comma : end).trim(),
    fallback: comma > 0 ? text.slice(comma + 1, end).trim() : null,
    end,
  };
};

const formatNumber = (n) => String(Math.round(n * 10000) / 10000);

/* The same value written two ways reads the same */
const normalise = (value) => {
  let v = value.replace(/\s+/g, ' ').replace(/\s*,\s*/g, ', ').trim().toLowerCase();
  v = v.replace(/(^|[\s(,])(-?[\d.]+)px\b/g, (_, pre, n) => `${pre}${formatNumber(n / 16)}rem`);
  v = v.replace(/calc\((-?[\d.]+)rem \* (-?[\d.]+)\)/g, (_, a, b) => `${formatNumber(a * b)}rem`);
  v = v.replace(/calc\((-?[\d.]+)rem \/ (-?[\d.]+)\)/g, (_, a, b) => `${formatNumber(a / b)}rem`);
  v = v.replace(/(^|[\s(,])-?0(rem|em)\b/g, '$10');
  v = v.replace(/(^|[\s(,])(-?\d*\.\d+)rem\b/g, (_, pre, n) => `${pre}${formatNumber(Number(n))}rem`);
  if (v === 'bold') return '700';
  if (v === 'normal') return v;
  return v;
};

/* Follows a value down to what the browser would use with Tier 3 unset */
const resolve = (value, privates, depth = 0) => {
  let out = value;
  if (depth > 25) return out;
  for (let i = out.indexOf('var(--'); i !== -1; i = out.indexOf('var(--')) {
    const { name, fallback, end } = readVar(out, i);
    const next = defined.get(name) ?? privates.get(name) ?? fallback ?? `unset(${name})`;
    out = out.slice(0, i) + resolve(next, privates, depth + 1) + out.slice(end + 1);
  }
  return normalise(out);
};

/* The token's own value: a reference to another Tier 3 token follows its value */
const toCss = (value) => value.replace(/\{([^}]+)\}/g, (_, ref) => `var(${nameOf(ref)})`);
const tokenValue = (value) => {
  const follow = (text, depth = 0) => {
    let out = text;
    if (depth > 25) return out;
    for (let i = out.indexOf('var(--'); i !== -1; i = out.indexOf('var(--')) {
      const { name, fallback, end } = readVar(out, i);
      const known = tier3.has(name) ? toCss(tier3.get(name)) : defined.get(name);
      out = out.slice(0, i) + follow(known ?? fallback ?? `unset(${name})`, depth + 1) + out.slice(end + 1);
    }
    return out;
  };
  return normalise(follow(toCss(value)));
};

/* Every read of a Tier 3 token in the component CSS */
const files = [];
const collect = (dir) => {
  for (const file of readdirSync(dir)) {
    const path = join(dir, file);
    if (statSync(path).isDirectory()) collect(path);
    else if (path.endsWith('.css')) files.push(path);
  }
};
['atoms', 'molecules', 'organisms', 'layout', 'utilities'].forEach((dir) => collect(join(src, dir)));
files.push(join(src, 'reset.css'));

const reads = new Map();
for (const file of files) {
  const css = readFileSync(file, 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
  /* A private variable counts as its first declaration, the file's manifest */
  const privates = new Map();
  for (const m of css.matchAll(/(--_[\w-]+):\s*([^;]+);/g)) if (!privates.has(m[1])) privates.set(m[1], m[2].trim());
  for (let i = css.indexOf('var(--'); i !== -1; i = css.indexOf('var(--', i + 1)) {
    const { name, fallback } = readVar(css, i);
    if (!tier3.has(name)) continue;
    if (!reads.has(name)) reads.set(name, []);
    reads.get(name).push({ fallback, privates, file: relative(src, file) });
  }
}

/* Tier 1 names: a Tier 3 default may name a step that a Tier 2 role in the
   CSS means, so only Tier 2 names must be read by name */
const tier1 = new Set();
const walk1 = (node, path) => {
  if (!node || typeof node !== 'object') return;
  if ('$value' in node) return void tier1.add(nameOf(path.join('.')));
  for (const [key, value] of Object.entries(node)) if (!key.startsWith('$')) walk1(value, [...path, key]);
};
walk1(JSON.parse(readFileSync(join(root, 'tokens/1-global.json'), 'utf8')), []);

/* Whether a fallback reads a token, through the file's private variables */
const reads_ = (text, privates, name, depth = 0) => {
  if (depth > 25) return false;
  if (new RegExp(`var\\(${name}\\s*[,)]`).test(text)) return true;
  for (const m of text.matchAll(/var\((--_[\w-]+)/g)) if (privates.has(m[1]) && reads_(privates.get(m[1]), privates, name, depth + 1)) return true;
  return false;
};

const findings = { differ: [], noFallback: [], unread: [], unnamed: [] };
for (const [name, value] of tier3) {
  const uses = reads.get(name);
  if (!uses) {
    findings.unread.push({ name, value });
    continue;
  }
  const want = tokenValue(value);
  for (const use of uses) {
    if (use.fallback === null) findings.noFallback.push({ name, value, file: use.file });
    else if (resolve(use.fallback, use.privates) !== want) findings.differ.push({ name, value, want, fallback: use.fallback, got: resolve(use.fallback, use.privates), file: use.file });
    else {
      const ref = /^\{([^{}]+)\}$/.exec(value.trim())?.[1];
      const target = ref && nameOf(ref);
      if (target && defined.has(target) && !tier1.has(target) && !reads_(use.fallback, use.privates, target)) findings.unnamed.push({ name, target, file: use.file });
    }
  }
}

if (process.argv.includes('--json')) {
  console.log(JSON.stringify(findings, null, 1));
  process.exit(0);
}

const total = findings.differ.length + findings.noFallback.length + findings.unread.length + findings.unnamed.length;
for (const f of findings.differ) console.log(`${f.file}: ${f.name} is ${f.want} in the tokens and ${f.got} in the CSS`);
for (const f of findings.noFallback) console.log(`${f.file}: ${f.name} has no fallback in the CSS`);
for (const f of findings.unread) console.log(`${f.name}: nothing reads it`);
for (const f of findings.unnamed) console.log(`${f.file}: ${f.name}'s fallback doesn't read ${f.target}, which the tokens name`);
console.log(`check:tokens: ${tier3.size} Tier 3 tokens, ${total ? `${total} problems` : 'no problems'}.`);
process.exit(total ? 1 : 0);
