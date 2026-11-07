#!/usr/bin/env node
/* ==========================================================================
   check:layout
   --------------------------------------------------------------------------
   Loads stories from the built Storybook in headless Chrome at a grid of
   screen sizes and reports layouts that strand content:

   - clipped: an element that hides its overflow (overflow hidden or clip)
     with something visible inside it beyond its edge, and no scroller in
     between, so that content can't be reached;
   - page overflow: the page is wider than the screen (a sideways scroll).

   Layout and recipe stories run at a grid of 12 sizes. Component stories
   (atoms, molecules, organisms) run at 320px, where WCAG 1.4.10 asks
   content to reflow, and at a desktop width.

   Usage:
     npm run build:storybook
     npm run check:layout                    # every story
     npm run check:layout -- 'organisms-'    # stories whose id matches
   Set CHROME_PATH if Chrome isn't in the default macOS location
   (scripts/lib/storybook-chrome.mjs).

   Exits 1 when it finds a problem, so it can gate a pass.
   ========================================================================== */
import { openStorybook, progress, progressDone } from './lib/storybook-chrome.mjs';

const filter = new RegExp(process.argv[2] || '^(layout-|recipes-|atoms-|molecules-|organisms-)');
const grid = [320, 375, 768, 1024, 1280, 1600].flatMap((w) => [600, 900].map((h) => [w, h]));
const component = [[320, 640], [1280, 900]];
const sizesFor = (id) => (/^(atoms|molecules|organisms)-/.test(id) ? component : grid);
const tolerance = 16;

/* Known problems, each waiting for its component's pass: reported, but they
   don't fail the run. Take one off when its pass fixes it. */
const known = new Map(Object.entries({
  'molecules-pagination--joined': 'navigation: eight joined 48px targets need 384px, and a joined row can\'t wrap',
  'organisms-header--over-a-sidebar': 'navigation: a three-column split that never wraps has no phone layout',
}));

const sb = await openStorybook('check:layout');

/* Runs in the page: what's out of reach at this size. A clipping element is
   only a problem when something visible inside it sits beyond its edge with
   no scroller in between (content in a nested scroller can be reached). */
const probe = `(() => {
  const out = [];
  const name = (el) => el.id ? '#' + el.id : el.tagName.toLowerCase() + [...el.classList].slice(0, 3).map((c) => '.' + c).join('');
  const scrolls = (el) => /auto|scroll/.test(getComputedStyle(el).overflowY + getComputedStyle(el).overflowX);
  const shown = (el) => !el.closest('[hidden], [aria-hidden="true"], .sr-only, dialog:not([open]), [popover]:not(:popover-open)');
  for (const el of document.querySelectorAll('body *')) {
    if (!shown(el)) continue;
    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden') continue;
    const clipY = /hidden|clip/.test(cs.overflowY) && el.clientHeight > 64 && el.scrollHeight - el.clientHeight > ${tolerance};
    const clipX = /hidden|clip/.test(cs.overflowX) && el.clientWidth > 64 && el.scrollWidth - el.clientWidth > ${tolerance};
    if (!clipY && !clipX) continue;
    const box = el.getBoundingClientRect();
    const stranded = [...el.querySelectorAll('*')].find((d) => {
      if (!shown(d) || d.matches('svg *')) return false;
      const r = d.getBoundingClientRect();
      if (!r.width || !r.height || getComputedStyle(d).visibility === 'hidden') return false;
      for (let a = d.parentElement; a && a !== el; a = a.parentElement) if (scrolls(a)) return false;
      return (clipY && (r.bottom > box.bottom + ${tolerance} || r.top < box.top - ${tolerance}))
        || (clipX && (r.right > box.right + ${tolerance} || r.left < box.left - ${tolerance}));
    });
    if (stranded) out.push('clipped ' + name(el) + ' (' + el.scrollWidth + 'x' + el.scrollHeight + ' in ' + el.clientWidth + 'x' + el.clientHeight + '): ' + name(stranded) + ' is out of reach');
  }
  const d = document.scrollingElement;
  if (d.scrollWidth > d.clientWidth + 1) out.push('page overflow ' + d.scrollWidth + 'px wide in ' + d.clientWidth + 'px');
  return out;
})()`;

const ids = sb.ids(filter);
const problems = [];

const started = Date.now();
for (const [n, id] of ids.entries()) {
  progress(`${n + 1}/${ids.length} ${id}`);
  const sizes = sizesFor(id);
  await sb.load(id, { width: 1600, height: 900 });
  for (const [w, h] of sizes) {
    await sb.size(w, h);
    for (const p of (await sb.evaluate(probe)) || []) {
      const line = `${id} @ ${w}x${h}: ${p}`;
      if (known.has(id)) {
        console.log(`${line} (known: ${known.get(id)})`);
        continue;
      }
      problems.push(line);
      console.log(line);
    }
  }
}

sb.close();
progressDone();
const took = Math.round((Date.now() - started) / 1000);
if (problems.length) {
  console.log(`\ncheck:layout: ${problems.length} problem(s) in ${ids.length} stories (${took}s).`);
  process.exit(1);
}
console.log(`check:layout: ${ids.length} stories (layouts and recipes at ${grid.length} sizes, components at ${component.length}), nothing out of reach${known.size ? ` (${known.size} known, waiting for their pass)` : ''} (${took}s).`);
