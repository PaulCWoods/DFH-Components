/* ==========================================================================
   The markup docs (docs/markup/NN-*.md) as component pages
   --------------------------------------------------------------------------
   A markup doc becomes a page once its frontmatter names a tier. Shared by
   the content collection (src/content.config.ts), the routes and the remark
   plugin (which rewrites links between markup docs), so it is plain JS that
   astro.config.mjs can import.
   ========================================================================== */
import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

export const markupDir = fileURLToPath(new URL('../../../../docs/markup/', import.meta.url));

/* Each tier's folder under /docs/components/, and its heading in the nav */
export const TIERS = {
  atom: { folder: 'atoms', label: 'Atoms' },
  molecule: { folder: 'molecules', label: 'Molecules' },
  organism: { folder: 'organisms', label: 'Organisms' },
  layout: { folder: 'layout', label: 'Layout' },
  utility: { folder: 'utilities', label: 'Utilities' },
};

/* "07b-form-composition.md" → "form-composition" */
export const slugOfFile = (file) => file.replace(/\.md$/, '').replace(/^\d+[a-z]?-/, '');
export const hrefFor = (tier, slug) => `/docs/components/${TIERS[tier].folder}/${slug}/`;

/* The two frontmatter fields the links need, read without a YAML parser */
const field = (front, name) => front.match(new RegExp(`^${name}:\\s*(.+?)\\s*$`, 'm'))?.[1].replace(/^["']|["']$/g, '');

/* file name → { slug, tier, href } for every doc that is a page */
export const readMarkupIndex = () => {
  const index = {};
  for (const file of readdirSync(markupDir).filter((f) => f.endsWith('.md'))) {
    const front = readFileSync(markupDir + file, 'utf8').match(/^---\n([\s\S]*?)\n---/)?.[1];
    const tier = front && field(front, 'tier');
    if (!tier || !TIERS[tier]) continue;
    const slug = field(front, 'slug') ?? slugOfFile(file);
    index[file] = { slug, tier, href: hrefFor(tier, slug) };
  }
  return index;
};
