/* ==========================================================================
   Font files: writes what the theme's fonts need outside the tokens
   --------------------------------------------------------------------------
   Node only (build:type and the designer's Publish). Writes
   packages/css/src/fonts.css, and the font <link>s between the
   "theme fonts" markers in the Storybook and docs page heads, so the
   heads always load what the theme names.
   ========================================================================== */

import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fontLinks, fontsCss } from './type.js';

const HEADS = ['packages/storybook/.storybook/preview-head.html', 'packages/docs/src/layouts/BaseLayout.astro'];
/* Each marker on a line of its own, so a comment that mentions one isn't
   taken for it */
const MARKS = /^([ \t]*)<!-- theme fonts -->[ \t]*$[\s\S]*?^[ \t]*<!-- \/theme fonts -->[ \t]*$/m;

export const writeFontFiles = (root, type, headType = type) => {
  const written = ['packages/css/src/fonts.css'];
  writeFileSync(resolve(root, written[0]), fontsCss(type));
  return [...written, ...writeHeadLinks(root, headType)];
};

/* The heads load the site theme's fonts (tokens/themes.json) */
export const writeHeadLinks = (root, type) => {
  const written = [];
  for (const head of HEADS) {
    const path = resolve(root, head);
    if (!existsSync(path)) continue;
    const html = readFileSync(path, 'utf8');
    const next = html.replace(MARKS, (_, indent) =>
      [`${indent}<!-- theme fonts -->`, ...fontLinks(type).map((l) => `${indent}${l}`), `${indent}<!-- /theme fonts -->`].join('\n'),
    );
    if (next !== html) {
      writeFileSync(path, next);
      written.push(head);
    }
  }
  return written;
};
