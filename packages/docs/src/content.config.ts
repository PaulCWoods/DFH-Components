/* ==========================================================================
   Content collections
   docs: the written pages (src/content/docs), one MDX file each. A file's
   folder is its section; index.mdx is the section's overview.
   markup: docs/markup/NN-*.md, the canonical markup and rules. A doc whose
   frontmatter names a tier is a component page (lib/markup.mjs); the rest
   wait for theirs, so every field is optional here.
   ========================================================================== */
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const docs = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/docs' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    /* Place within its section; the overview (index) comes first */
    order: z.number().default(100),
  }),
});

const list = z.union([z.string(), z.array(z.string())]).transform((v) => (Array.isArray(v) ? v : [v]));

const markup = defineCollection({
  loader: glob({ pattern: '*.md', base: '../../docs/markup' }),
  schema: z.object({
    title: z.string().optional(),
    tier: z.enum(['atom', 'molecule', 'organism', 'layout', 'utility']).optional(),
    summary: z.string().optional(),
    slug: z.string().optional(),
    /* Keys in tokens/3-component.json, linked to their Storybook table */
    tokens: list.optional(),
    /* Storybook ids ("atoms-button"), linked; the site ships Storybook at /storybook/ */
    storybook: list.optional(),
    /* Slugs of related component pages */
    related: z.array(z.string()).optional(),
  }),
});

export const collections = { docs, markup };
