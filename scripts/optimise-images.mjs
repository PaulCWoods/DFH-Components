#!/usr/bin/env node
/* ==========================================================================
   npm run images -- <input> [output] [--widths=640,1280,1920] [--sizes="..."]
   Turns an image, or a folder of them, into AVIF, WebP and a JPEG fallback
   at each width, for a <picture> with a srcset:
   - <name>-<width>.avif, .webp and .jpg in the output folder (by default
     the input folder's "optimised" folder)
   - a width larger than the original is left out, and the original's own
     width is added in its place, so nothing is ever scaled up
   - each image's <picture> markup is printed, with its width and height
     so the page keeps its space while the image loads
   Screenshots (PNG) keep their sharp text: AVIF and WebP are encoded at a
   higher quality than photos need. Alpha is flattened onto white for the
   JPEG only.
   ========================================================================== */

import sharp from 'sharp';
import { existsSync, mkdirSync, readdirSync, statSync } from 'node:fs';
import { basename, extname, join, relative, resolve } from 'node:path';

const args = process.argv.slice(2);
const flag = (name) => args.find((a) => a.startsWith(`--${name}=`))?.split('=').slice(1).join('=');
const [input, output] = args.filter((a) => !a.startsWith('--'));

if (!input || !existsSync(input)) {
  console.error('Usage: npm run images -- <image or folder> [output folder] [--widths=640,1280,1920] [--sizes="(min-width: 64rem) 50vw, 100vw"]');
  process.exit(1);
}

const widths = (flag('widths') ?? '640,1280,1920').split(',').map(Number).filter((w) => w > 0).sort((a, b) => a - b);
const sizes = flag('sizes') ?? '100vw';
const isDir = statSync(input).isDirectory();
const outDir = resolve(output ?? join(isDir ? input : resolve(input, '..'), 'optimised'));
const files = isDir
  ? readdirSync(input).filter((f) => /\.(png|jpe?g|webp|avif|tiff?)$/i.test(f)).map((f) => join(input, f))
  : [input];

/* Photos compress hard; screenshots need more to keep text crisp */
const quality = (screenshot) => ({
  avif: { quality: screenshot ? 65 : 50, effort: 6 },
  webp: { quality: screenshot ? 85 : 78, effort: 6 },
  jpg: { quality: screenshot ? 85 : 78, mozjpeg: true },
});

mkdirSync(outDir, { recursive: true });
const publicPath = (file) => {
  /* A file under the docs site's public folder is served from its root */
  const pub = resolve('packages/docs/public');
  return file.startsWith(pub) ? '/' + relative(pub, file) : relative(process.cwd(), file);
};
const kb = (bytes) => `${Math.round(bytes / 1024)} KB`;

for (const file of files) {
  const name = basename(file, extname(file));
  const meta = await sharp(file).metadata();
  const screenshot = /\.png$/i.test(file);
  const q = quality(screenshot);
  const steps = [...new Set([...widths.filter((w) => w < meta.width), Math.min(meta.width, widths.at(-1))])].sort((a, b) => a - b);
  const made = { avif: [], webp: [], jpg: [] };

  for (const w of steps) {
    const resized = sharp(file).resize({ width: w, withoutEnlargement: true });
    for (const format of ['avif', 'webp', 'jpg']) {
      const target = join(outDir, `${name}-${w}.${format}`);
      const pipeline = format === 'jpg' ? resized.clone().flatten({ background: '#ffffff' }).jpeg(q.jpg) : resized.clone()[format](q[format]);
      const info = await pipeline.toFile(target);
      made[format].push({ w, target, size: info.size });
    }
  }

  const largest = made.jpg.at(-1);
  const height = Math.round((meta.height / meta.width) * largest.w);
  const srcset = (format) => made[format].map((m) => `${publicPath(m.target)} ${m.w}w`).join(', ');
  const original = statSync(file).size;
  const smallest = Math.min(...['avif', 'webp', 'jpg'].map((f) => made[f].at(-1).size));

  console.log(`\n${basename(file)}: ${meta.width}×${meta.height}, ${kb(original)} → largest AVIF ${kb(made.avif.at(-1).size)}, WebP ${kb(made.webp.at(-1).size)}, JPEG ${kb(largest.size)} (${Math.round((1 - smallest / original) * 100)}% smaller)`);
  console.log(`<picture>
  <source type="image/avif" srcset="${srcset('avif')}" sizes="${sizes}" />
  <source type="image/webp" srcset="${srcset('webp')}" sizes="${sizes}" />
  <img src="${publicPath(largest.target)}" srcset="${srcset('jpg')}" sizes="${sizes}" width="${largest.w}" height="${height}" alt="" loading="lazy" decoding="async" />
</picture>`);
}

console.log(`\n${files.length} image${files.length === 1 ? '' : 's'} written to ${relative(process.cwd(), outDir) || '.'}`);
