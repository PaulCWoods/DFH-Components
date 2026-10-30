#!/usr/bin/env node

/**
 * Design For Humans — Utility Name Check (PRINCIPLES §3)
 *
 * Reads packages/css/src/utilities/*.css and fails when:
 * - a rule gives one declaration more than two names (verbose + shorthand);
 * - a name is a bare word outside the allow-list;
 * - a name uses left or right (use start and end);
 * - a utility reads a Tier 1 token (tokens/1-global.json).
 *
 * Usage: npm run check:utilities
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const UTILITIES_DIR = path.join(ROOT_DIR, 'packages/css/src/utilities');
const TIER_1 = path.join(ROOT_DIR, 'tokens/1-global.json');

// Tailwind's names for the same declaration, plus the valueless defaults
const BARE_WORDS = new Set([
  'flex', 'hidden', 'block', 'contents', 'static', 'relative', 'absolute', 'fixed', 'sticky',
  'isolate', 'truncate', 'italic', 'uppercase', 'lowercase', 'capitalize', 'grow', 'shrink',
  'border', 'rounded', 'shadow', 'rule',
]);

// Elements a utility targets inside itself, not utility names
const TARGETS = new Set(['ui-label', 'focus-target']);

const LEFT_RIGHT = /(^|[-:])(left|right)($|-)|^(m|p)[lr]-|^(border|rounded)-[lr]($|-)|^text-(left|right)$/;

function tierOneNames() {
  const names = new Set();
  const walk = (node, prefix) => {
    for (const [key, value] of Object.entries(node)) {
      if (key.startsWith('$') || typeof value !== 'object' || value === null) continue;
      const name = prefix ? `${prefix}-${key}` : key;
      if ('$value' in value) names.add(`--${name}`);
      else walk(value, name);
    }
  };
  walk(JSON.parse(fs.readFileSync(TIER_1, 'utf8')), '');
  return names;
}

function unescape(name) {
  return name.replace(/\\3(\d) /g, '$1').replace(/\\/g, '');
}

function lineOf(source, index) {
  return source.slice(0, index).split('\n').length;
}

const tierOne = tierOneNames();
const problems = [];
let ruleCount = 0;

for (const file of fs.readdirSync(UTILITIES_DIR).filter((f) => f.endsWith('.css')).sort()) {
  const source = fs.readFileSync(path.join(UTILITIES_DIR, file), 'utf8');
  const css = source.replace(/\/\*[\s\S]*?\*\//g, (c) => c.replace(/[^\n]/g, ' '));
  const report = (index, message) => problems.push(`${file}:${lineOf(css, index)}  ${message}`);

  for (const match of css.matchAll(/:where\(([^()]*)\)/g)) {
    const names = [...match[1].matchAll(/\.((?:\\3\d |\\.|[\w-])+)/g)].map((m) => unescape(m[1]));
    if (!names.length) continue;
    ruleCount += 1;
    if (names.length > 2) report(match.index, `${names.length} names for one rule: ${names.join(', ')}`);
    for (const name of names) {
      if (TARGETS.has(name)) continue;
      const word = name.replace(/^@?[\w-]+:/, '');
      // A responsive helper's action may be a bare word after its condition (md:hide)
      const conditional = word !== name;
      if (!/[-]/.test(word) && !BARE_WORDS.has(word) && !(conditional && word === 'hide')) report(match.index, `bare word: .${name}`);
      if (LEFT_RIGHT.test(name)) report(match.index, `left/right in a name: .${name} (use start/end)`);
    }
  }

  for (const match of css.matchAll(/var\((--[\w-]+)/g)) {
    if (tierOne.has(match[1])) report(match.index, `reads a Tier 1 token: ${match[1]}`);
  }
}

if (problems.length) {
  console.error(`check:utilities found ${problems.length} problem(s):\n`);
  for (const problem of problems) console.error(`  ${problem}`);
  process.exit(1);
}

console.log(`check:utilities: ${ruleCount} rules, no problems.`);
