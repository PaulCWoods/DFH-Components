#!/usr/bin/env node

/**
 * Design For Humans — Blog Style Synchronization Script
 *
 * Mirrors library component CSS into the blog's SCSS and recompiles it:
 *   packages/css/src/<tier>/<name>.css
 *     -> designforhumans-blog/web/styles/scss/library/<tier>/_<name>.scss
 * for the tiers atoms, molecules, organisms, layout and utilities.
 *
 * Usage:
 *   npm run watch:blog                 Watch and mirror on every save
 *   npm run sync:blog                  Mirror files that differ only in comments
 *                                      or formatting; list the rest
 *   npm run sync:blog -- --check       List the files that differ; write nothing
 *   npm run sync:blog -- card.css      Mirror the named files, overwriting
 *
 * A blog file whose code differs may hold blog-only edits, so it is only
 * overwritten when named. Watch mode follows the files that were in step
 * when it started (or that were synced since) and reports the others.
 *
 * What it does not do:
 * - Tokens: the blog's Tier 3 (theme/_tier3.scss) is kept in step by hand and
 *   carries deliberate differences. Use npm run build:tokens for the library.
 * - Files with no blog twin are reported, not created: a new component also
 *   needs a @forward in the tier's _index.scss.
 * - Blog-only files (dfh/, blog/) are never touched.
 * - utilities/color-palette.css: the blog's _color-palette.scss is built from
 *   the blog's own tokens by build-blog-palette.js, which this script runs.
 *
 * Blog files written in Sass (@use, @include, $variables, #{} interpolation)
 * are never overwritten; they are reported for a hand port.
 *
 * Conversion: block comments become // lines (section rules normalised to
 * 77 characters), and indentation is scaled to the unit the blog file
 * already uses (2 or 4 spaces), so diffs stay small.
 *
 * The blog repo defaults to ../designforhumans-blog; set DFH_BLOG to change it.
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const palette = require('./build-blog-palette.js');

const ROOT_DIR = path.resolve(__dirname, '..');
const SRC_DIR = path.join(ROOT_DIR, 'packages/css/src');
const BLOG_DIR = path.resolve(process.env.DFH_BLOG || path.join(ROOT_DIR, '../designforhumans-blog'));
const BLOG_LIB = path.join(BLOG_DIR, 'web/styles/scss/library');
const TIERS = ['atoms', 'molecules', 'organisms', 'layout', 'utilities'];
const SASS_BUILDS = [
  ['web/styles/scss/dfh-shared.scss', 'web/styles/css/dfh-shared.css'],
  ['web/styles/scss/dfh-blog.scss', 'web/styles/css/dfh-blog.css'],
];

if (!fs.existsSync(BLOG_LIB)) {
  console.error(`❌ Blog library SCSS not found at: ${BLOG_LIB}`);
  process.exit(1);
}

const rel = (p) => path.relative(path.dirname(ROOT_DIR), p);

/* --------------------------------------------------------------------------
   Conversion
   -------------------------------------------------------------------------- */
const convertComments = (css) =>
  css.replace(/\/\*[\s\S]*?\*\//g, (match, offset) => {
    const lineStart = css.lastIndexOf('\n', offset - 1) + 1;
    const indent = css.slice(lineStart, offset).match(/^[ \t]*/)[0];
    const lines = match.slice(2, -2).replace(/^\n+|\n+$/g, '').split('\n').map((l) => l.trim());
    return lines
      .map((l, i) => {
        if (/^[=-]{5,}$/.test(l)) l = l[0].repeat(77);
        const line = `// ${l}`.trimEnd();
        return i === 0 ? line : indent + line;
      })
      .join('\n');
  });

// A file's indent unit: 4 if its shallowest indent is 4, else 2
const indentUnit = (text) => {
  const depths = text.split('\n').map((l) => l.match(/^ */)[0].length).filter((n) => n > 0);
  return depths.length && Math.min(...depths) >= 4 ? 4 : 2;
};

const toScss = (css, unit) => {
  const scale = unit / indentUnit(css);
  return convertComments(css)
    .split('\n')
    .map((l) => l.replace(/^ +/, (s) => ' '.repeat(s.length * scale)))
    .join('\n');
};

/* --------------------------------------------------------------------------
   Mapping and mirroring
   -------------------------------------------------------------------------- */
const twinOf = (cssFile) => {
  const [tier, name] = path.relative(SRC_DIR, cssFile).split(path.sep);
  if (!TIERS.includes(tier) || !name?.endsWith('.css')) return null;
  return path.join(BLOG_LIB, tier, `_${name.replace(/\.css$/, '')}.scss`);
};

const libraryFiles = () =>
  TIERS.flatMap((tier) => {
    const dir = path.join(SRC_DIR, tier);
    return fs.existsSync(dir)
      ? fs.readdirSync(dir).filter((f) => f.endsWith('.css')).map((f) => path.join(dir, f))
      : [];
  });

// Code lines (comments and whitespace ignored) in one file but not the other
const codeLines = (scss) =>
  scss.split('\n').map((l) => l.replace(/\s+/g, '')).filter((l) => l && !l.startsWith('//'));

const codeDifference = (a, b) => {
  const counts = new Map();
  codeLines(a).forEach((l) => counts.set(l, (counts.get(l) || 0) + 1));
  codeLines(b).forEach((l) => counts.set(l, (counts.get(l) || 0) - 1));
  return [...counts.values()].reduce((sum, n) => sum + Math.abs(n), 0);
};

const changes = new Map();

// Blog files written in Sass (mixins, variables, interpolation) are kept by hand
const isSassAuthored = (scss) => /^\s*@(use|include|mixin|each|for|if)\b|#\{|\$[a-z]/m.test(scss);

// Returns 'written', 'same', 'formatting' or 'differs' (not written), 'sass',
// 'no-twin' or 'gone'. Without force, a twin whose code differs is left alone.
const mirror = (cssFile, { check = false, force = false } = {}) => {
  const twin = twinOf(cssFile);
  if (!twin) return null;
  if (!fs.existsSync(cssFile)) return 'gone';
  if (!fs.existsSync(twin)) return 'no-twin';
  // The blog's colour palette is built from its own tokens, not copied
  if (twin === palette.OUT) {
    if (check) return fs.readFileSync(twin, 'utf8') === palette.build().scss ? 'same' : 'generated';
    return palette.write() ? 'written' : 'same';
  }
  const current = fs.readFileSync(twin, 'utf8');
  if (isSassAuthored(current)) return 'sass';
  const next = toScss(fs.readFileSync(cssFile, 'utf8'), indentUnit(current));
  if (next === current) return 'same';
  changes.set(cssFile, codeDifference(current, next));
  if (check || (!force && changes.get(cssFile))) return 'differs';
  fs.writeFileSync(twin, next);
  return 'written';
};

const report = (cssFile, result) => {
  const twin = twinOf(cssFile);
  const messages = {
    written: `✅ ${rel(cssFile)} -> ${rel(twin)}`,
    differs: changes.get(cssFile)
      ? `• ${rel(cssFile)}: ${changes.get(cssFile)} code lines differ. The blog may have its own edits; name the file to overwrite.`
      : `• ${rel(cssFile)}: comments or formatting only`,
    sass: `⏭️  ${rel(twin)} is written in Sass; port ${rel(cssFile)} by hand.`,
    generated: `• ${rel(twin)} is out of date; npm run build:blog-palette -- --write rebuilds it.`,
    'no-twin': `⚠️  ${rel(cssFile)} has no blog twin. Add ${rel(twin)} and @forward it in its _index.scss.`,
    gone: `⚠️  ${rel(cssFile)} was removed. Remove ${rel(twin)} and its @forward by hand.`,
  };
  if (messages[result]) console.log(messages[result]);
};

/* --------------------------------------------------------------------------
   Sass
   -------------------------------------------------------------------------- */
const sassBin = ['/opt/homebrew/bin/sass', '/usr/local/bin/sass'].find((p) => fs.existsSync(p)) || 'sass';

const compile = () => {
  const started = Date.now();
  try {
    for (const [from, to] of SASS_BUILDS) {
      execFileSync(sassBin, [from, to], { cwd: BLOG_DIR, stdio: ['ignore', 'ignore', 'pipe'] });
    }
    console.log(`🎨 Blog CSS compiled (${Date.now() - started}ms)`);
    return true;
  } catch (error) {
    console.error(`❌ Sass failed:\n${error.stderr?.toString() || error.message}`);
    return false;
  }
};

/* --------------------------------------------------------------------------
   Modes
   -------------------------------------------------------------------------- */
const args = process.argv.slice(2);
const watch = args.includes('--watch');
const check = args.includes('--check');
const named = args.filter((a) => !a.startsWith('--'));

const resolveNamed = (name) => {
  const matches = libraryFiles().filter((f) => f.endsWith(`${path.sep}${name}`) || f === path.resolve(name));
  if (!matches.length) console.error(`❌ No library file matches ${name}`);
  return matches;
};

if (watch) {
  const pending = new Set();
  let timer = null;

  // A twin in step when watching starts (or after a mirror) follows every
  // save. One that already differed has blog edits of its own: it is only
  // reported, until it is synced by name.
  const inStep = new Set(
    libraryFiles().filter((file) => {
      mirror(file, { check: true });
      return !changes.get(file);
    }),
  );

  const flush = () => {
    const results = [...pending].map((file) => {
      const result = mirror(file, { force: inStep.has(file) });
      if (result === 'written' || result === 'same') inStep.add(file);
      return [file, result];
    });
    pending.clear();
    results.forEach(([file, result]) => report(file, result));
    if (results.some(([, result]) => result === 'written')) compile();
  };

  fs.watch(SRC_DIR, { recursive: true }, (_event, filename) => {
    if (!filename?.endsWith('.css')) return;
    const file = path.join(SRC_DIR, filename);
    if (!twinOf(file)) return;
    pending.add(file);
    clearTimeout(timer);
    timer = setTimeout(flush, 250);
  });

  console.log(`👀 Watching ${rel(SRC_DIR)} -> ${rel(BLOG_LIB)} (Ctrl+C to stop)`);
  console.log(`   ${inStep.size} files in step; the rest are reported on save, not written.`);
} else {
  const files = named.length ? named.flatMap(resolveNamed) : libraryFiles();
  const results = files.map((file) => [file, mirror(file, { check, force: named.length > 0 })]);
  results.forEach(([file, result]) => report(file, result));

  const count = (r) => results.filter(([, result]) => result === r).length;
  if (check) {
    console.log(`\n${count('differs')} differ, ${count('same')} match, ${count('sass')} kept by hand, ${count('no-twin')} have no blog twin.`);
    process.exit(count('differs') ? 1 : 0);
  }
  console.log(`\n${count('written')} written, ${count('same')} already match, ${count('sass')} kept by hand, ${count('no-twin')} have no blog twin.`);
  if (count('written') && !compile()) process.exit(1);
}
