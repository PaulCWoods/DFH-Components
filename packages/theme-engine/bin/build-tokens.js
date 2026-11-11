#!/usr/bin/env node
/* ==========================================================================
   npm run build:tokens
   --------------------------------------------------------------------------
   Compiles Tier 1 and Tier 2 of tokens/*.json (W3C DTCG) into CSS custom
   properties in packages/css/src/variables.css. The compiler is
   src/compile.js; this reads the token files and writes what it returns.
   ========================================================================== */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { compileTokens } from '../src/compile.js';

const here = path.dirname(fileURLToPath(import.meta.url));

// Paths configuration: the library's tokens and variables.css, or another
// theme's with --tokens <dir> --out <file> (build:themes)
const arg = (name) => { const i = process.argv.indexOf(name); return i > 0 ? path.resolve(process.argv[i + 1]) : null; };
const TOKENS_DIR = arg('--tokens') ?? path.join(here, '../../../tokens');
const OUTPUT_FILE = arg('--out') ?? path.join(here, '../../css/src/variables.css');

const readTokens = (file) => {
  const filePath = path.join(TOKENS_DIR, file);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, 'utf8').trim();
  return raw ? JSON.parse(raw) : {};
};

try {
  console.log('🔄 Compiling design tokens...');
  const { css, global, scaleChanged } = compileTokens(
    { global: readTokens('1-global.json'), semantic: readTokens('2-semantic.json'), component: readTokens('3-component.json') },
    { log: console.log },
  );
  // The type scale follows its ratio and bases: keep 1-global.json in step
  if (scaleChanged) fs.writeFileSync(path.join(TOKENS_DIR, '1-global.json'), JSON.stringify(global, null, 2) + '\n', 'utf8');
  fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, css, 'utf8');
  console.log(`✅ Successfully compiled tokens to ${path.relative(process.cwd(), OUTPUT_FILE)}`);
} catch (error) {
  console.error('❌ Error compiling tokens:', error);
  process.exit(1);
}
