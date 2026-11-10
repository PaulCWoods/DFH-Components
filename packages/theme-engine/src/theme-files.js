/* ==========================================================================
   Theme files (Node only)
   --------------------------------------------------------------------------
   tokens/themes/<name>.json are the themes. tokens/themes.json names the
   default, which builds the library's own tokens (tokens/*.json and
   variables.css), and the site theme, which the docs and Storybook load.
   Reading a theme brings it to the current format and checks it against
   the schema, so a broken file fails before any gate, with each problem
   named.
   ========================================================================== */

import { readdirSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { checkTheme } from './validate.js';

export const themeConfig = (root) => JSON.parse(readFileSync(resolve(root, 'tokens/themes.json'), 'utf8'));
export const themeNames = (root) => readdirSync(resolve(root, 'tokens/themes')).filter((f) => f.endsWith('.json')).map((f) => f.slice(0, -5)).sort();
export const themePath = (root, name = themeConfig(root).default) => resolve(root, `tokens/themes/${name}.json`);
export const readTheme = (root, name = themeConfig(root).default) => {
  const file = themePath(root, name);
  let json;
  try {
    json = JSON.parse(readFileSync(file, 'utf8'));
  } catch (error) {
    throw new Error(`tokens/themes/${name}.json isn't valid JSON: ${error.message}`);
  }
  return checkTheme(json, `tokens/themes/${name}.json`);
};
