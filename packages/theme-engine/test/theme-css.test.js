import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { compileTheme, compileTokens, resolveTheme, themeStylesheet } from '../src/index.js';

/* The library's own files, as build:themes last wrote them */
const at = (path) => new URL(`../../../${path}`, import.meta.url);
const json = (path) => JSON.parse(readFileSync(at(path), 'utf8'));
const text = (path) => readFileSync(at(path), 'utf8');
const tiers = { global: json('tokens/1-global.json'), semantic: json('tokens/2-semantic.json'), component: json('tokens/3-component.json') };
const theme = (name) => json(`tokens/themes/${name}.json`);
const resolved = (name) => resolveTheme(name, theme).theme;
const libraryCss = text('packages/css/src/variables.css');

test('compileTokens makes variables.css from the token tiers', () => {
  assert.equal(compileTokens(tiers).css, libraryCss);
});

test('compileTokens leaves its tokens alone and gives the same CSS each time', () => {
  const before = JSON.stringify(tiers);
  const first = compileTokens(tiers).css;
  assert.equal(compileTokens(tiers).css, first);
  assert.equal(JSON.stringify(tiers), before);
});

test('compileTokens works out the type scale from its ratio and says when that changed it', () => {
  const global = structuredClone(tiers.global);
  global.typography.ratio.$value = 1.5;
  const out = compileTokens({ ...tiers, global });
  assert.equal(out.scaleChanged, true);
  assert.notEqual(out.global.typography['font-size']['2'].$value, tiers.global.typography['font-size']['2'].$value);
  assert.equal(compileTokens(tiers).scaleChanged, false);
});

test('a full theme makes the stylesheet build:themes writes', () => {
  const { css } = compileTheme(resolved('eden'), tiers);
  const sheet = themeStylesheet({ name: 'eden', theme: resolved('eden'), compiled: css, defaultTheme: theme('starter'), libraryCss, component: tiers.component });
  assert.equal(sheet, text('packages/css/src/themes/eden.css'));
});

test('a sub-brand makes the stylesheet build:themes writes, scoped to its class', () => {
  const dfh = compileTheme(resolved('dfh'), tiers).css;
  const { css } = compileTheme(resolved('blog'), tiers);
  const sheet = themeStylesheet({
    name: 'blog',
    theme: resolved('blog'),
    compiled: css,
    parent: { name: 'dfh', theme: resolved('dfh'), compiled: dfh, isDefault: false },
    defaultTheme: theme('starter'),
    libraryCss,
    component: tiers.component,
  });
  assert.equal(sheet, text('packages/css/src/themes/blog.css'));
  assert.match(sheet, /\.theme-blog/);
});

test('the header names where a stylesheet came from', () => {
  const { css } = compileTheme(resolved('eden'), tiers);
  const sheet = themeStylesheet({ name: 'eden', theme: resolved('eden'), compiled: css, defaultTheme: theme('starter'), libraryCss, component: tiers.component, source: 'eden.json by the Token Designer' });
  assert.match(sheet, /^\/\* eden: generated from eden\.json by the Token Designer\. Do not edit\./);
});
