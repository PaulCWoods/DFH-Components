#!/usr/bin/env node
/* ==========================================================================
   npm run build:themes
   Builds every theme in tokens/themes. The default (tokens/themes.json)
   writes the library's own tokens: tokens/1-global.json, 2-semantic.json,
   packages/css/src/component-theme.css and fonts.css, then variables.css.
   Every other theme compiles the same way off to one side and writes
   packages/css/src/themes/<name>.css: only what it changes, in the tokens
   layer, so it's linked after the library. A theme with "extends" is a
   sub-brand: merged over its parent, checked whole, and written as the
   difference from its parent, scoped to .theme-<name> (sub-brand.js). A
   theme that fails a gate writes nothing, and the command fails. The page
   heads load the site theme's fonts.
   ========================================================================== */

import { execFileSync } from 'node:child_process';
import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildTheme, changedTokens, componentCss, componentValue, cssDiff, fontLinks, fontsCss, resolveTheme, scopeCss, scopeClass } from '../src/index.js';
import { readTheme, themeConfig, themeNames } from '../src/theme-files.js';
import { writeHeadLinks } from '../src/font-files.js';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');
const at = (p) => resolve(root, p);
const read = (p) => JSON.parse(readFileSync(at(p), 'utf8'));
const write = (p, data) => {
  mkdirSync(dirname(at(p)), { recursive: true });
  writeFileSync(at(p), typeof data === 'string' ? data : JSON.stringify(data, null, 2));
};
const compile = (tokens, out) => execFileSync('node', [at('packages/figma-sync/compile-tokens.js'), ...(tokens ? ['--tokens', tokens, '--out', out] : [])], { stdio: 'ignore' });

const config = themeConfig(root);
const component = read('tokens/3-component.json');
let failed = false;
const build = (name, base, theme = readTheme(root, name)) => {
  try {
    return buildTheme(theme, { ...base, component });
  } catch (error) {
    console.error(`✖ ${name}: ${error.message}. Nothing written for it.`);
    failed = true;
    return null;
  }
};

/* The default: the library's own tokens */
const defaultTheme = readTheme(root, config.default);
const base = build(config.default, { global: read('tokens/1-global.json'), semantic: read('tokens/2-semantic.json') });
if (!base) process.exit(1);
write('tokens/1-global.json', base.global);
write('tokens/2-semantic.json', base.semantic);
write('packages/css/src/component-theme.css', base.componentCss);
write('packages/css/src/fonts.css', fontsCss(defaultTheme.type));
compile();
const variables = readFileSync(at('packages/css/src/variables.css'), 'utf8');
console.log(`✔ ${config.default} (the default): tokens/*.json and variables.css`);

/* Every other theme, parents before their sub-brands */
const files = Object.fromEntries(themeNames(root).map((name) => [name, readTheme(root, name)]));
const readFile = (name) => {
  if (!files[name]) throw new Error(`there's no theme called ${name}`);
  return files[name];
};
if (files[config.default].extends) {
  console.error(`✖ ${config.default}: the default theme can't extend another`);
  process.exit(1);
}
const order = [];
const visit = (name, seen = []) => {
  if (order.includes(name) || seen.includes(name)) return;
  if (files[name]?.extends) visit(files[name].extends, [...seen, name]);
  order.push(name);
};
Object.keys(files).forEach((name) => visit(name));

const stripComment = (css) => css.replace(/^\/\*[\s\S]*?\*\/\s*/, '');
/* A Tier 3 token the default customises and this theme doesn't goes back to its own default */
const tier3Default = (path) => path.split('.').reduce((node, key) => node[key], component).$value;
const effectiveComponents = (theme) => {
  const reset = Object.fromEntries(
    Object.keys(defaultTheme.components ?? {})
      .filter((path) => !(path in (theme.components ?? {})))
      .map((path) => [path, tier3Default(path)]),
  );
  return { ...reset, ...(theme.components ?? {}) };
};
const themeComponents = (theme) => stripComment(componentCss(effectiveComponents(theme), component));
/* A sub-brand's: only what differs from its parent, or reads a token the
   sub-brand changes (the parent's value was worked out on :root) */
const subBrandComponents = (theme, parentTheme, changedNames) => {
  const own = effectiveComponents(theme);
  const parent = effectiveComponents(parentTheme);
  const reads = (value) => [...componentValue(value).matchAll(/var\((--[\w-]+)/g)].some(([, name]) => changedNames.has(name));
  const paths = [...new Set([...Object.keys(own), ...Object.keys(parent)])];
  const value = (set, path) => set[path] ?? tier3Default(path);
  const differs = Object.fromEntries(paths.filter((p) => value(own, p) !== value(parent, p) || reads(value(own, p))).map((p) => [p, value(own, p)]));
  return stripComment(componentCss(differs, component));
};
const compiled = { [config.default]: variables };
const resolvedThemes = { [config.default]: defaultTheme };

for (const name of order.filter((n) => n !== config.default)) {
  const parent = files[name].extends;
  let theme;
  try {
    theme = resolveTheme(name, readFile).theme;
  } catch (error) {
    console.error(`✖ ${name}: ${error.message}. Nothing written for it.`);
    failed = true;
    continue;
  }
  if (parent && !compiled[parent]) {
    console.error(`✖ ${name}: its parent, ${parent}, didn't build. Nothing written for it.`);
    failed = true;
    continue;
  }
  const built = build(name, { global: base.global, semantic: base.semantic }, theme);
  if (!built) continue;
  const dir = at(`node_modules/.cache/dfh-themes/${name}`);
  mkdirSync(dir, { recursive: true });
  writeFileSync(resolve(dir, '1-global.json'), JSON.stringify(built.global, null, 2));
  writeFileSync(resolve(dir, '2-semantic.json'), JSON.stringify(built.semantic, null, 2));
  copyFileSync(at('tokens/3-component.json'), resolve(dir, '3-component.json'));
  compile(dir, resolve(dir, 'variables.css'));
  compiled[name] = readFileSync(resolve(dir, 'variables.css'), 'utf8');
  resolvedThemes[name] = theme;
  const components = themeComponents(theme);
  const fonts = stripComment(fontsCss(theme.type));
  const links = fontLinks(theme.type);
  const fontNote = links.length ? `\n   Its fonts also need, in the page head:\n${links.map((l) => `   ${l}`).join('\n')}` : '';
  let body, head;
  if (!parent) {
    const diff = cssDiff(variables, compiled[name]);
    head = `/* ${name}: generated from tokens/themes/${name}.json by npm run build:themes. Do not edit.\n   Link it after the library's CSS. It holds only what the theme changes.${fontNote} */`;
    /* The font faces, and the roles pointed at them, come after the diff so they win */
    body = [diff, fonts, components];
  } else {
    /* Its fonts, when they differ from its parent's: the faces are global, the roles scoped */
    const ownFonts = fonts === stripComment(fontsCss(resolvedThemes[parent].type)) ? '' : fonts;
    const faces = (ownFonts.match(/@font-face\s*\{[^}]*\}/g) ?? []).join('\n');
    const roles = ownFonts.replace(/@font-face\s*\{[^}]*\}/g, '');
    let scoped;
    try {
      const ownComponents = subBrandComponents(theme, resolvedThemes[parent], changedTokens(compiled[parent], compiled[name], roles));
      scoped = scopeCss(name, compiled[parent], compiled[name], `${roles}\n${ownComponents}`);
    } catch (error) {
      console.error(`✖ ${name}: ${error.message}. Nothing written for it.`);
      failed = true;
      continue;
    }
    head = `/* ${name}: a sub-brand of ${parent}, generated from tokens/themes/${name}.json by npm run build:themes. Do not edit.\n   Link it after ${parent === config.default ? "the library's CSS" : `themes/${parent}.css`}, and put class="${scopeClass(name).slice(1)}" on a region, or on <html> for a whole page.\n   It holds only what the sub-brand changes.${ownFonts ? fontNote : ''} */`;
    body = [faces, scoped];
  }
  const css = [head, '@layer tokens {', body.filter((s) => s.trim()).join('\n\n').replace(/^(?=.)/gm, '  '), '}', ''].join('\n');
  write(`packages/css/src/themes/${name}.css`, css);
  console.log(`✔ ${name}: packages/css/src/themes/${name}.css (${css.split('\n').length} lines${parent ? `, a sub-brand of ${parent}` : ''})`);
}

const heads = writeHeadLinks(root, readTheme(root, config.site).type);
if (heads.length) console.log(`  Page heads now load ${config.site}'s fonts: ${heads.join(', ')}`);
process.exit(failed ? 1 : 0);
