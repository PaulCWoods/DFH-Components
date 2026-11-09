#!/usr/bin/env node
/* ==========================================================================
   check:print
   --------------------------------------------------------------------------
   Loads stories from the built Storybook in headless Chrome with print
   media emulated, at the width of an A4 or Letter page less its margins,
   and reports what wouldn't survive on paper:

   - fixed or sticky: an element still fixed or sticky in print, which
     prints once, over other content;
   - cut off: an element that hides or scrolls its overflow with content
     beyond its edge, which paper can't scroll to (text deliberately
     truncated with an ellipsis is left alone);
   - too wide: the page is wider than the paper.

   Usage:
     npm run build:storybook
     npm run check:print                     # every story
     npm run check:print -- 'organisms-'     # stories whose id matches
   Set CHROME_PATH if Chrome isn't in the default macOS location
   (scripts/lib/storybook-chrome.mjs).

   Exits 1 when it finds a problem, so it can gate a pass.
   ========================================================================== */
import { openStorybook, progress, progressDone, wait } from './lib/storybook-chrome.mjs';

const filter = new RegExp(process.argv[2] || '^(layout-|recipes-|atoms-|molecules-|organisms-)');
/* A4 is 794px wide at 96dpi; with the browser's default margins about 720px
   is left for the page */
const [width, height] = [720, 1000];
const tolerance = 16;

/* Known problems, each waiting for its component's pass: reported, but they
   don't fail the run. Take one off when its pass fixes it. */
const known = new Map(Object.entries({
}));

const sb = await openStorybook('check:print');

/* Runs in the page with print media: what wouldn't survive on paper. Open
   dialogs are skipped: a modal is a moment on screen, not page content. */
const probe = `(() => {
  const out = [];
  const name = (el) => el.id ? '#' + el.id : el.tagName.toLowerCase() + [...el.classList].slice(0, 3).map((c) => '.' + c).join('');
  const shown = (el) => !el.closest('[hidden], [aria-hidden="true"], .sr-only, dialog, [popover]');
  /* Storybook's own frames (demo viewports, inline-styled scrollers) aren't library markup */
  const scaffold = (el) => el.matches('[class*="sb-demo"], [style*="overflow"]');
  for (const el of document.querySelectorAll('body *')) {
    if (!shown(el) || scaffold(el)) continue;
    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden') continue;
    const r = el.getBoundingClientRect();
    if (!r.width || !r.height) continue;
    if (cs.position === 'fixed' || cs.position === 'sticky') {
      out.push(cs.position + ' ' + name(el));
      continue;
    }
    if (cs.textOverflow === 'ellipsis') continue;
    const hides = (v) => v !== 'visible';
    const cutY = hides(cs.overflowY) && el.clientHeight > 64 && el.scrollHeight - el.clientHeight > ${tolerance};
    const cutX = hides(cs.overflowX) && el.clientWidth > 64 && el.scrollWidth - el.clientWidth > ${tolerance};
    if (cutY || cutX) out.push('cut off ' + name(el) + ' (' + el.scrollWidth + 'x' + el.scrollHeight + ' in ' + el.clientWidth + 'x' + el.clientHeight + ', overflow ' + cs.overflowX + ' ' + cs.overflowY + ')');
  }
  const d = document.scrollingElement;
  if (d.scrollWidth > d.clientWidth + 1) out.push('too wide: ' + d.scrollWidth + 'px on a ' + d.clientWidth + 'px page');
  return out;
})()`;

const ids = sb.ids(filter);
const problems = [];

const started = Date.now();
for (const [n, id] of ids.entries()) {
  progress(`${n + 1}/${ids.length} ${id}`);
  await sb.load(id, { width, height });
  /* A real print renders at once: no transition holds the screen state (an
     element fading out with display still shows while it fades) */
  await sb.evaluate(`document.head.insertAdjacentHTML('beforeend', '<style>*, *::before, *::after { transition: none !important; }</style>')`);
  await sb.send('Emulation.setEmulatedMedia', { media: 'print' });
  await wait(150);
  for (const p of (await sb.evaluate(probe)) || []) {
    const line = `${id}: ${p}`;
    if (known.has(id)) {
      console.log(`${line} (known: ${known.get(id)})`);
      continue;
    }
    problems.push(line);
    console.log(line);
  }
  await sb.send('Emulation.setEmulatedMedia', { media: '' });
}

sb.close();
progressDone();
const took = Math.round((Date.now() - started) / 1000);
if (problems.length) {
  console.log(`\ncheck:print: ${problems.length} problem(s) in ${ids.length} stories (${took}s).`);
  process.exit(1);
}
console.log(`check:print: ${ids.length} stories printed at ${width}px, nothing fixed, sticky, cut off or too wide${known.size ? ` (${known.size} known, waiting for their pass)` : ''} (${took}s).`);
