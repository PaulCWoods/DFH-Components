import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  site: 'https://components.designforhumans.blog',
  trailingSlash: 'always',
  integrations: [mdx()],
  /* Code takes the library's prose styling; no highlighter colours of its own */
  markdown: { syntaxHighlight: false },
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
