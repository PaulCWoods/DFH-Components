/* ==========================================================================
   Theme files (Node only)
   --------------------------------------------------------------------------
   tokens/themes/<name>.json are the themes. tokens/themes.json names the
   default, which builds the library's own tokens (tokens/*.json and
   variables.css), and the site theme, which the docs and Storybook load.
   ========================================================================== */

import { readdirSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

export const themeConfig = (root) => JSON.parse(readFileSync(resolve(root, 'tokens/themes.json'), 'utf8'));
export const themeNames = (root) => readdirSync(resolve(root, 'tokens/themes')).filter((f) => f.endsWith('.json')).map((f) => f.slice(0, -5)).sort();
export const themePath = (root, name = themeConfig(root).default) => resolve(root, `tokens/themes/${name}.json`);
export const readTheme = (root, name) => JSON.parse(readFileSync(themePath(root, name), 'utf8'));
