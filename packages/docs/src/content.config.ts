/* ==========================================================================
   Content collections
   docs: the written pages (src/content/docs), one MDX file each. A file's
   folder is its section; index.mdx is the section's overview.
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

export const collections = { docs };
