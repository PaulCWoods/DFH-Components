#!/usr/bin/env node
/* ==========================================================================
   check:focus
   --------------------------------------------------------------------------
   Tabs through every component and recipe story in the built Storybook, in
   headless Chrome, and fails on a stop where nothing visibly changes when
   it takes focus (WCAG 2.4.7). At each stop it reads the outline, box
   shadow, border and background of the focused element, its ::before and
   ::after (unless it is visually hidden), and the nearest visible elements
   around it (a label drawing the ring of the hidden input inside it, or a
   part of that label, such as a Switch's track), focused and then blurred.
   Where those read the same, it compares screenshots of the element's box
   instead (Chrome doesn't report a range thumb's style). A stop whose
   element is out of sight (scrolled off in a scroller, under a popover) is
   still compared: the ring must be there when it comes into view.

   Usage:
     npm run build:storybook
     npm run check:focus                   # every component and recipe story
     npm run check:focus -- 'molecules-'   # stories whose id matches
   Set CHROME_PATH if Chrome isn't in the default macOS location
   (scripts/lib/storybook-chrome.mjs).

   Exits 1 when it finds a problem, so it can gate a pass.
   ========================================================================== */
import { openStorybook, progress, progressDone, wait } from './lib/storybook-chrome.mjs';

const filter = new RegExp(process.argv[2] || '^(atoms-|molecules-|organisms-|layout-|recipes-)');
const stops = 30;

const sb = await openStorybook('check:focus');

/* Installed in the page once per story: what focus looks like on the
   element that has it, and on what draws it */
const helpers = `(() => {
  /* Only what shows: an outline or border that isn't drawn doesn't count,
     whatever its colour or offset */
  const read = (el, pseudo) => {
    const cs = getComputedStyle(el, pseudo);
    if (/::(before|after)/.test(pseudo || '') && cs.content === 'none') return '';
    const outline = cs.outlineStyle === 'none' || parseFloat(cs.outlineWidth) === 0 ? 'none' : [cs.outlineStyle, cs.outlineWidth, cs.outlineColor, cs.outlineOffset].join(' ');
    const borders = ['Top', 'Right', 'Bottom', 'Left'].map((s) => (cs['border' + s + 'Style'] === 'none' || parseFloat(cs['border' + s + 'Width']) === 0 ? 'none' : [cs['border' + s + 'Width'], cs['border' + s + 'Color']].join(' ')));
    return [outline, cs.boxShadow, ...borders, cs.backgroundColor, cs.textDecorationLine].join('|');
  };
  /* Something a person could see: not a 1px, clipped, visually hidden box */
  const visible = (el) => {
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    return r.width > 4 && r.height > 4 && cs.clip === 'auto' && !/inset\(50%\)/.test(cs.clipPath);
  };
  /* The element, if it can be seen, and up to three visible ancestors: a
     hidden input's ring is drawn by the label around it */
  const drawers = (el) => {
    const out = visible(el) ? [el] : [];
    for (let a = el.parentElement; a && out.length < 4 && a.id !== 'storybook-root'; a = a.parentElement) {
      if (visible(a)) out.push(a);
    }
    return out;
  };
  /* A hidden input's ring may be drawn by a part beside it in its label
     (a Switch's track), and a range's on its thumb */
  const parts = (el) => {
    const label = el.labels?.[0] || el.closest('label');
    if (visible(el) || !label) return [];
    return [...label.querySelectorAll('*')].filter((d) => d !== el && visible(d)).slice(0, 30);
  };
  const look = (d) => read(d) + read(d, '::before') + read(d, '::after');
  window.__focusLook = (el) => [
    ...drawers(el).map(look),
    ...parts(el).map(look),
    el.matches('input[type="range"]') ? read(el, '::-webkit-slider-thumb') : '',
  ].join('#');
  window.__focusName = (el) => {
    const label = (el.getAttribute('aria-label') || el.labels?.[0]?.textContent || el.textContent || el.value || '').trim().replace(/\\s+/g, ' ').slice(0, 30);
    return el.tagName.toLowerCase() + [...el.classList].slice(0, 3).map((c) => '.' + c).join('') + (label ? ' "' + label + '"' : '');
  };
})()`;

/* The focused element's look, focused and blurred; then focus goes back,
   so the next Tab carries on from it */
const compare = `(() => {
  const el = document.activeElement;
  const root = document.getElementById('storybook-root');
  if (!el || el === document.body || !root || !root.contains(el)) return { out: true };
  if (el.closest('[inert]')) return { skip: true };
  const name = window.__focusName(el);
  window.__last = el;
  const focused = window.__focusLook(el);
  el.blur();
  const blurred = window.__focusLook(el);
  el.focus({ preventScroll: true });
  /* The box a ring could be drawn in, for a screenshot when the styles
     read the same (Chrome doesn't report a range thumb's) */
  const r = el.getBoundingClientRect();
  const pad = 12;
  const clip = { x: Math.max(0, r.left - pad), y: Math.max(0, r.top - pad), width: r.width + pad * 2, height: r.height + pad * 2, scale: 1 };
  return { name, same: focused === blurred, clip, key: name + '@' + [...root.querySelectorAll('*')].indexOf(el) };
})()`;

/* Whether the element's box looks different focused and blurred */
const looksDifferent = async (clip) => {
  if (!clip.width || !clip.height) return false;
  const shot = async () => (await sb.send('Page.captureScreenshot', { format: 'png', clip })).result?.data;
  const focused = await shot();
  await sb.evaluate(`document.activeElement.blur()`);
  await wait(180);
  const blurred = await shot();
  await sb.evaluate(`window.__last?.focus({ preventScroll: true })`);
  return focused !== blurred;
};

const tab = async () => {
  await sb.send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 });
  await sb.send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 });
  await wait(30);
};

const ids = sb.ids(filter);
const problems = [];
const started = Date.now();

for (const [n, id] of ids.entries()) {
  progress(`${n + 1}/${ids.length} ${id}`);
  await sb.load(id, { width: 1280, height: 900 });
  await sb.evaluate(helpers);
  /* Start before the story, so the first Tab lands on its first stop */
  await sb.evaluate(`document.activeElement?.blur(); document.body.focus();`);
  const seen = new Set();
  for (let i = 0; i < stops; i++) {
    await tab();
    /* Transitions settle before the look is read */
    await wait(180);
    const r = await sb.evaluate(compare);
    if (!r || r.out) break;
    if (r.skip) continue;
    if (seen.has(r.key)) break;
    seen.add(r.key);
    if (r.same && !(await looksDifferent(r.clip))) {
      const line = `${id}: ${r.name} shows no focus indicator`;
      problems.push(line);
      console.log(line);
    }
  }
}

sb.close();
progressDone();
const took = Math.round((Date.now() - started) / 1000);
if (problems.length) {
  console.log(`\ncheck:focus: ${problems.length} stop(s) with no visible focus in ${ids.length} stories (${took}s).`);
  process.exit(1);
}
console.log(`check:focus: ${ids.length} stories, every focus stop visible (${took}s).`);
