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
const MARKS = /([ \t]*)<!-- theme fonts -->[\s\S]*?<!-- \/theme fonts -->/;

export const writeFontFiles = (root, type) => {
  const written = ['packages/css/src/fonts.css'];
  writeFileSync(resolve(root, written[0]), fontsCss(type));
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
