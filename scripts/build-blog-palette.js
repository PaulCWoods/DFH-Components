#!/usr/bin/env node
/**
 * Blog Palette Builder
 * -----------------------------------------------------------------------------
 * Builds the blog's _color-palette.scss from the blog's own tokens, the way
 * build:tokens builds the library's inverted palette into variables.css:
 *
 *   1. Every colour role in the blog's Tier 2 (a --surface-*, --foreground-*
 *      or --border-color-* written as light-dark(a, b)) swaps to
 *      light-dark(b, a), so an inverted region takes the other mode's colours.
 *   2. Every Tier 3 token (library/theme/_tier3.scss, then dfh/theme/_tier3.scss)
 *      that reads only those roles, or other Tier 3 tokens already inverted,
 *      takes the inverted value with the references written out. A token that
 *      also reads anything else (a translucency, a size) is left alone.
 *   3. The library's utilities/color-palette.css follows, as it is.
 *
 * Only declarations straight inside a top-level :root count: the
 * prefers-contrast and prefers-color-scheme overrides are left out, as in
 * the library. Values with Sass interpolation are skipped and reported.
 *
 * Usage:
 *   npm run build:blog-palette              Say whether the blog file is current
 *   npm run build:blog-palette -- --write   Write it and recompile the blog CSS
 *
 * sync:blog and watch:blog hand color-palette.css to this script.
 * The blog repo defaults to ../designforhumans-blog; set DFH_BLOG to change it.
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT_DIR = path.resolve(__dirname, '..');
const BLOG_DIR = path.resolve(process.env.DFH_BLOG || path.join(ROOT_DIR, '../designforhumans-blog'));
const SCSS = path.join(BLOG_DIR, 'web/styles/scss');
const TIER2 = [path.join(SCSS, 'library/theme/_tier2.scss'), path.join(SCSS, 'dfh/theme/_tier2.scss')];
const TIER3 = [path.join(SCSS, 'library/theme/_tier3.scss'), path.join(SCSS, 'dfh/theme/_tier3.scss')];
const UTILITIES = path.join(ROOT_DIR, 'packages/css/src/utilities/color-palette.css');
const OUT = path.join(SCSS, 'library/utilities/_color-palette.scss');
const SASS_BUILDS = [
  ['web/styles/scss/dfh-shared.scss', 'web/styles/css/dfh-shared.css'],
  ['web/styles/scss/dfh-blog.scss', 'web/styles/css/dfh-blog.css'],
];

/* --------------------------------------------------------------------------
   Reading the blog's tokens
   -------------------------------------------------------------------------- */

/* The custom properties declared straight inside a top-level :root, in order */
function rootDeclarations(scss) {
  const src = scss.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:])\/\/.*$/gm, '$1');
  const decls = [];
  const stack = [];
  let buffer = '';
  let parens = 0;
  let interpolation = 0;
  for (let i = 0; i < src.length; i++) {
    const ch = src[i];
    if (ch === '#' && src[i + 1] === '{') {
      interpolation++;
      buffer += '#{';
      i++;
      continue;
    }
    if (interpolation) {
      if (ch === '}') interpolation--;
      buffer += ch;
      continue;
    }
    if (ch === '(') parens++;
    if (ch === ')') parens--;
    if (ch === '{' && !parens) {
      stack.push(buffer.trim());
      buffer = '';
    } else if (ch === '}' && !parens) {
      stack.pop();
      buffer = '';
    } else if (ch === ';' && !parens) {
      const m = /^\s*(--[\w-]+)\s*:\s*([\s\S]*)$/.exec(buffer);
      if (m && stack.length === 1 && stack[0] === ':root') decls.push([m[1], m[2].replace(/\s+/g, ' ').trim()]);
      buffer = '';
    } else buffer += ch;
  }
  return decls;
}

/* Splits light-dark(a, b) at its top-level comma; null for any other value */
function splitLightDark(value) {
  const m = /^light-dark\((.*)\)$/s.exec(value.trim());
  if (!m) return null;
  let depth = 0;
  for (let i = 0; i < m[1].length; i++) {
    const ch = m[1][i];
    if (ch === '(') depth++;
    else if (ch === ')') depth--;
    else if (ch === ',' && depth === 0) return [m[1].slice(0, i).trim(), m[1].slice(i + 1).trim()];
  }
  return null;
}

/* Replaces each var(--name[, fallback]) whose name is in `map` with its value.
   Returns null when the value reads any other custom property. */
function invertReferences(value, map) {
  let out = '';
  let replaced = false;
  for (let i = 0; i < value.length; ) {
    const m = /^var\(\s*(--[\w-]+)/.exec(value.slice(i));
    if (!m) {
      out += value[i++];
      continue;
    }
    if (!map.has(m[1])) return null;
    let depth = 0;
    let end = i;
    for (; end < value.length; end++) {
      if (value[end] === '(') depth++;
      else if (value[end] === ')' && --depth === 0) break;
    }
    out += map.get(m[1]);
    replaced = true;
    i = end + 1;
  }
  return replaced ? out : null;
}

/* --------------------------------------------------------------------------
   Building
   -------------------------------------------------------------------------- */
function build() {
  const read = (file) => (fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '');
  const skipped = [];
  const inverted = new Map();

  for (const [name, value] of TIER2.flatMap((f) => rootDeclarations(read(f)))) {
    if (!/^--(surface|foreground|border-color)(-|$)/.test(name)) continue;
    const parts = splitLightDark(value);
    if (parts) inverted.set(name, `light-dark(${parts[1]}, ${parts[0]})`);
    else inverted.delete(name);
  }
  const roles = inverted.size;

  for (const [name, value] of TIER3.flatMap((f) => rootDeclarations(read(f)))) {
    if (value.includes('#{')) {
      skipped.push(name);
      continue;
    }
    const swapped = invertReferences(value, inverted);
    if (swapped) inverted.set(name, swapped);
    else inverted.delete(name);
  }

  const lines = [...inverted].map(([name, value]) => `  ${name}: ${value};`).join('\n');
  const utilities = fs.readFileSync(UTILITIES, 'utf8');
  const scss = `// =============================================================================
// Design For Humans: Color Palette Utilities (blog)
// -----------------------------------------------------------------------------
// Generated by DFH-Components (npm run build:blog-palette -- --write) from the
// blog's own Tier 2 and Tier 3 tokens: each colour role's light-dark() swapped,
// and the Tier 3 tokens that read only those roles. The utilities after the
// blocks are the library's utilities/color-palette.css. Don't edit this file;
// edit the tokens and run the script again.
// =============================================================================

/* ==========================================================================
   Inverted Palette Blocks (Tier 2 roles and the Tier 3 tokens that read them)
   ========================================================================== */
:where(.color-palette-inverted, .colors-inverted) {
${lines}
}

* {
  @container style(--color-palette: inverted) {
${lines}
  }
}

${utilities}`;
  return { scss, roles, tokens: inverted.size - roles, skipped };
}

function compile() {
  const sassBin = ['/opt/homebrew/bin/sass', '/usr/local/bin/sass'].find((p) => fs.existsSync(p)) || 'sass';
  for (const [from, to] of SASS_BUILDS) execFileSync(sassBin, [from, to], { cwd: BLOG_DIR, stdio: ['ignore', 'ignore', 'inherit'] });
}

/* Writes the file when it has changed; true when it did */
function write() {
  const { scss } = build();
  if (fs.existsSync(OUT) && fs.readFileSync(OUT, 'utf8') === scss) return false;
  fs.writeFileSync(OUT, scss);
  return true;
}

module.exports = { build, write, OUT };

if (require.main === module) {
  if (!fs.existsSync(SCSS)) {
    console.error(`❌ Blog SCSS not found at: ${SCSS}`);
    process.exit(1);
  }
  const rel = path.relative(path.dirname(ROOT_DIR), OUT);
  const { scss, roles, tokens, skipped } = build();
  const current = fs.existsSync(OUT) && fs.readFileSync(OUT, 'utf8') === scss;
  console.log(`🎨 ${roles} roles and ${tokens} Tier 3 tokens inverted.`);
  if (skipped.length) console.log(`⏭️  Skipped (Sass interpolation): ${skipped.join(', ')}`);
  if (!process.argv.includes('--write')) {
    console.log(current ? `✅ ${rel} is current.` : `• ${rel} is out of date. Add -- --write to rebuild it.`);
    process.exit(current ? 0 : 1);
  }
  if (current) console.log(`✅ ${rel} is already current.`);
  else {
    fs.writeFileSync(OUT, scss);
    console.log(`✅ ${rel} written.`);
    compile();
    console.log('🎨 Blog CSS compiled.');
  }
}
