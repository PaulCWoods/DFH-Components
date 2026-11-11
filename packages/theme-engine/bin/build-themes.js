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
   heads load the site theme's fonts. Every theme file is checked against
   the theme format first, and the format's schema is published with the
   docs (packages/docs/public/schema/), where a theme's $schema points.
   ========================================================================== */

import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildTheme, compileTokens, themeSchema, validate, THEME_VERSION, fontsCss, resolveTheme, themeStylesheet } from '../src/index.js';
import { readTheme, themeConfig, themeNames } from '../src/theme-files.js';
import { writeHeadLinks } from '../src/font-files.js';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');
const at = (p) => resolve(root, p);
const read = (p) => JSON.parse(readFileSync(at(p), 'utf8'));
const write = (p, data) => {
  mkdirSync(dirname(at(p)), { recursive: true });
  writeFileSync(at(p), typeof data === 'string' ? data : JSON.stringify(data, null, 2));
};
/* variables.css from a theme's built tokens (src/compile.js), and its
   global tokens with the type scale worked out */
const compile = (built) => compileTokens({ global: built.global, semantic: built.semantic, component });

const config = themeConfig(root);
/* Every theme file, read and checked against the format before anything is built */
const files = {};
for (const name of themeNames(root)) {
  try {
    files[name] = readTheme(root, name);
  } catch (error) {
    console.error(`✖ ${error.message}\nNothing written.`);
    process.exit(1);
  }
}
const component = read('tokens/3-component.json');
let failed = false;
const build = (name, base, theme = readTheme(root, name)) => {
  try {
    /* A sub-brand's file was checked as a partial; the theme it makes is checked whole */
    const problems = validate(theme, themeSchema);
    if (problems.length) throw new Error(`the theme it makes doesn't match the theme format:\n${problems.map((p) => `  - ${p.message}`).join('\n')}\n `);
    return buildTheme(theme, { ...base, component });
  } catch (error) {
    console.error(`✖ ${name}: ${error.message}. Nothing written for it.`);
    failed = true;
    return null;
  }
};

/* The default: the library's own tokens */
const defaultTheme = files[config.default];
const base = build(config.default, { global: read('tokens/1-global.json'), semantic: read('tokens/2-semantic.json') }, defaultTheme);
if (!base) process.exit(1);
write('tokens/1-global.json', base.global);
write('tokens/2-semantic.json', base.semantic);
write('packages/css/src/component-theme.css', base.componentCss);
write('packages/css/src/fonts.css', fontsCss(defaultTheme.type));
const { css: variables, global: scaled, scaleChanged } = compile(base);
if (scaleChanged) write('tokens/1-global.json', JSON.stringify(scaled, null, 2) + '\n');
write('packages/css/src/variables.css', variables);
console.log(`✔ ${config.default} (the default): tokens/*.json and variables.css`);

/* Every other theme, parents before their sub-brands */
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
  const { css: themeVariables, global: themeGlobal, scaleChanged: themeScaled } = compile(built);
  compiled[name] = themeVariables;
  resolvedThemes[name] = theme;
  /* The Figma export (private) reads each theme's tokens and CSS from here */
  const dir = at(`node_modules/.cache/dfh-themes/${name}`);
  mkdirSync(dir, { recursive: true });
  writeFileSync(resolve(dir, '1-global.json'), JSON.stringify(themeGlobal, null, 2) + (themeScaled ? '\n' : ''));
  writeFileSync(resolve(dir, '2-semantic.json'), JSON.stringify(built.semantic, null, 2));
  copyFileSync(at('tokens/3-component.json'), resolve(dir, '3-component.json'));
  writeFileSync(resolve(dir, 'variables.css'), compiled[name]);
  let css;
  try {
    css = themeStylesheet({
      name,
      theme,
      compiled: compiled[name],
      parent: parent && { name: parent, theme: resolvedThemes[parent], compiled: compiled[parent], isDefault: parent === config.default },
      defaultTheme,
      libraryCss: variables,
      component,
    });
  } catch (error) {
    console.error(`✖ ${name}: ${error.message}. Nothing written for it.`);
    failed = true;
    continue;
  }
  write(`packages/css/src/themes/${name}.css`, css);
  console.log(`✔ ${name}: packages/css/src/themes/${name}.css (${css.split('\n').length} lines${parent ? `, a sub-brand of ${parent}` : ''})`);
}

const heads = writeHeadLinks(root, files[config.site].type);
write(`packages/docs/public/schema/theme-v${THEME_VERSION}.schema.json`, JSON.stringify(themeSchema, null, 2) + '\n');
if (heads.length) console.log(`  Page heads now load ${config.site}'s fonts: ${heads.join(', ')}`);
process.exit(failed ? 1 : 0);
