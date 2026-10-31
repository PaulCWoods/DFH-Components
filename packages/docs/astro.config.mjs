import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import remarkDocs from './src/lib/remark-docs.mjs';
import rehypeDocs from './src/lib/rehype-docs.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  site: 'https://components.designforhumans.blog',
  trailingSlash: 'always',
  integrations: [mdx()],
  /* Code takes the library's prose styling; no highlighter colours of its own */
  markdown: { syntaxHighlight: false, remarkPlugins: [remarkDocs], rehypePlugins: [rehypeDocs] },
  vite: {
    build: {
      cssMinify: 'esbuild',
    },
    resolve: {
      alias: {
        '@tokens': path.resolve(__dirname, '../../tokens'),
      },
    },
  },
  server: {
    port: 4321,
  },
});
