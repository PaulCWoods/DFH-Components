#!/usr/bin/env node
/* ==========================================================================
   check:targets
   --------------------------------------------------------------------------
   Loads stories from the built Storybook in headless Chrome and checks what
   a touch screen or Windows High Contrast user would meet (PRINCIPLES §1, §2):

   - target: a control whose hit area is smaller than the target for the
     pointer mode, read from its own --spacing-target-min: 48px with touch
     targets (the default), 32px with fine-pointer targets. Native fields
     (text, select, colour, range, file) and choice rows may be 32px in
     either mode, since an input can't take a buffer. Overlapping a neighbouring
     control's hit area is allowed; the later one wins.
   - text links meet WCAG 2.5.8 (AA) instead: 24px, or no other control
     within 12px of the centre. Links in running text are exempt.
   - spill: a control's hit area reaches past the bar that holds it (a
     header, tab list, batch actions, pagination or code block's bar), so it
     covers the page beside the bar or is clipped. A bar is never shorter
     than its targets.
   - forced colours: a control whose boundary (a border or fill) disappears
     in forced colours, or a selected or current item that looks the same as
     its neighbours there.

   Hit areas are measured the way a finger meets them: points around the
   control's centre, at half the target size, must land on the control (or
   its label, or its ::after buffer).

   Usage:
     npm run build:storybook
     npm run check:targets                    # every component and recipe story
     npm run check:targets -- 'organisms-'    # stories whose id matches
     ROOT_STYLE='--header-compact-bar-min-size: 2rem' npm run check:targets
                                             # try tokens without a rebuild
   Set CHROME_PATH if Chrome isn't in the default macOS location.

   Exits 1 when it finds a problem, so it can gate a pass.
   ========================================================================== */
import { openStorybook, progress, progressDone } from './lib/storybook-chrome.mjs';

const filter = new RegExp(process.argv[2] || '^(atoms-|molecules-|organisms-|recipes-)');
const sizes = [[1280, 900], [390, 844]];

const sb = await openStorybook('check:targets');

/* Shared by both probes */
const helpers = `
  const name = (el) => el.id ? '#' + el.id : el.tagName.toLowerCase() + [...el.classList].slice(0, 3).map((c) => '.' + c).join('');
  const label = (el) => (el.getAttribute('aria-label') || el.textContent || el.value || '').trim().replace(/\\s+/g, ' ').slice(0, 24);
  const shown = (el) => !el.closest('[hidden], [inert], [aria-hidden="true"], .sr-only, dialog:not([open]), [popover]:not(:popover-open), details:not([open]) > :not(summary)');
  const controls = 'a[href], button, input:not([type="hidden"]), select, textarea, summary, [tabindex]:not([tabindex="-1"])';
  const visible = (el) => {
    if (!shown(el)) return false;
    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden' || +cs.opacity === 0) return false;
    const r = el.getBoundingClientRect();
    return r.width >= 2 && r.height >= 2;
  };
`;

/* Runs in the page: targets that are too small, and hit areas that spill
   past their bar. */
const targetProbe = (fine) => `(() => {
  ${helpers}
  const out = [];
  const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
  const px = (v) => v.endsWith('rem') ? parseFloat(v) * rem : parseFloat(v);
  /* The pointer mode's target where the control is: a region can opt in */
  const needAt = (el) => px(getComputedStyle(el).getPropertyValue('--spacing-target-min').trim() || '48px') || ${fine ? 32 : 48};
  const textLink = 'a:not(.button, .block-link, .brand, .tab, .chip, .avatar, .thumbnail, .skip-link)';
  /* Native fields can't take a ::after buffer, so --sm is 32px */
  const textField = 'input:not([type="checkbox"], [type="radio"], [type="button"], [type="submit"], [type="reset"]), select, textarea';
  const choice = 'input[type="checkbox"], input[type="radio"]';
  const bars = '.header, .tab-list, .batch-actions, .pagination, .code-block__bar';
  const owns = (el, hit) => !!hit && (el === hit || el.contains(hit) || [...(el.labels || [])].some((l) => l.contains(hit)));
  const inView = (x, y) => x >= 0 && y >= 0 && x < innerWidth && y < innerHeight;
  /* A sticky or fixed bar the control has scrolled under, not part of it */
  const overlay = (el, hit) => {
    for (let a = hit; a; a = a.parentElement) {
      if (/sticky|fixed/.test(getComputedStyle(a).position)) return !a.contains(el);
    }
    return false;
  };
  const running = (el) => {
    if (!el.matches('a') || getComputedStyle(el).display !== 'inline') return false;
    const block = el.parentElement?.closest('p, li, dd, td, th, blockquote, figcaption, legend, label, .text, .small-text, .large-text');
    return !!block && block.textContent.trim().length > el.textContent.trim().length + 8;
  };

  for (const el of document.querySelectorAll(controls)) {
    if (!visible(el) || running(el)) continue;
    let box = el.getBoundingClientRect();
    /* A checkbox or radio's target is its row: the box and its label */
    if (el.matches(choice) && el.labels?.length) {
      const rs = [box, ...[...el.labels].map((l) => l.getBoundingClientRect())];
      box = { left: Math.min(...rs.map((r) => r.left)), top: Math.min(...rs.map((r) => r.top)), right: Math.max(...rs.map((r) => r.right)), bottom: Math.max(...rs.map((r) => r.bottom)) };
    }
    const cx = (box.left + box.right) / 2;
    const cy = (box.top + box.bottom) / 2;
    /* Covered, or scrolled out of its scroller: not reachable here */
    if (!inView(cx, cy) || !owns(el, document.elementFromPoint(cx, cy))) continue;

    const need = needAt(el);
    const link = el.matches(textLink);
    const min = link ? 24 : el.matches(textField + ', ' + choice) ? Math.min(need, 32) : need;
    const half = min / 2 - 1;
    const short = [];
    for (const [dx, dy, side] of [[-half, 0, 'start'], [half, 0, 'end'], [0, -half, 'top'], [0, half, 'bottom']]) {
      const x = cx + dx, y = cy + dy;
      if (!inView(x, y)) continue;
      const hit = document.elementFromPoint(x, y);
      if (owns(el, hit) || overlay(el, hit)) continue;
      /* A neighbouring control, not one around this one (a focusable
         scrolling region) */
      const other = hit?.closest(controls);
      const neighbour = !!other && other !== el && !other.contains(el);
      /* A text link only needs space around it (the spacing exception) */
      if (link) { if (neighbour) short.push(side); continue; }
      /* Overlapping a neighbour is allowed; the later control wins */
      if (neighbour) continue;
      short.push(side);
    }
    if (short.length) {
      out.push('target ' + name(el) + ' "' + label(el) + '" ' + Math.round(box.right - box.left) + 'x' + Math.round(box.bottom - box.top) + (link ? ', under 24px with a control within 12px (' : ', hit area under ' + min + 'px (') + short.join(', ') + ')');
      continue;
    }
    const bar = el.parentElement?.closest(bars);
    if (bar) {
      const b = bar.getBoundingClientRect();
      /* The control owns a point just outside the bar */
      const outside = [[cx, b.top - 1], [cx, b.bottom + 1], [b.left - 1, cy], [b.right + 1, cy]];
      if (outside.some(([x, y]) => inView(x, y) && owns(el, document.elementFromPoint(x, y)))) {
        out.push('spill ' + name(el) + ' "' + label(el) + '": its ' + min + 'px hit area reaches past ' + name(bar) + ' (' + Math.round(b.height) + 'px tall)');
      }
    }
  }
  return out;
})()`;

/* Runs in the page before forced colours: which controls have a boundary,
   and what selected items look like. */
const boundary = `
  /* A faint tint is no boundary: count colours at least half opaque */
  const alpha = (c) => { const m = c.match(/\\/\\s*([\\d.]+)\\)$/) || c.match(/^rgba\\([^)]*,\\s*([\\d.]+)\\)$/); return m ? +m[1] : 1; };
  const opaque = (c) => !!c && c !== 'transparent' && alpha(c) >= 0.5;
  const fillOf = (el) => { for (let a = el.parentElement; a; a = a.parentElement) { const c = getComputedStyle(a).backgroundColor; if (opaque(c)) return c; } return 'rgb(255, 255, 255)'; };
  const edged = (cs) => ['Top', 'Right', 'Bottom', 'Left'].some((s) => parseFloat(cs['border' + s + 'Width']) > 0 && cs['border' + s + 'Style'] !== 'none' && opaque(cs['border' + s + 'Color']));
  const hasBoundary = (el) => { const cs = getComputedStyle(el); return edged(cs) || (opaque(cs.backgroundColor) && cs.backgroundColor !== fillOf(el)); };
  const stateSel = '[aria-current]:not([aria-current="false"]), [aria-selected="true"], [aria-pressed="true"]';
  /* The item, its pseudo-elements and its descendants: a state is often
     drawn on a part (a stepper's indicator) */
  const look = (el) => {
    const parts = [el, ...[...el.querySelectorAll('*')].slice(0, 30)].flatMap((n) => [[n], [n, '::before'], [n, '::after']]);
    return parts.map(([n, p]) => {
      const cs = getComputedStyle(n, p);
      return [cs.content, cs.borderTopWidth, cs.borderBottomWidth, cs.borderInlineStartWidth, cs.borderTopStyle, cs.borderBottomStyle, cs.borderInlineStartStyle, cs.borderTopColor, cs.outlineStyle, cs.outlineWidth, cs.textDecorationLine, cs.fontWeight, cs.forcedColorAdjust === 'none' ? cs.backgroundColor + cs.color : ''].join('|');
    }).join('/');
  };
  const peer = (el) => {
    const group = el.closest('ul, ol, menu, nav, [role="tablist"], [role="group"], .tab-list, .button-group, .pagination') || el.parentElement;
    return [...group.querySelectorAll(el.tagName)].find((p) => p !== el && !p.matches(stateSel) && p.className === el.className && visible(p));
  };
`;

const forcedBefore = `(() => {
  ${helpers}
  ${boundary}
  const els = [...document.querySelectorAll(controls)].filter(visible);
  window.__forced = els.map((el) => ({ el, edge: hasBoundary(el) }));
  return els.length;
})()`;

const forcedAfter = `(() => {
  ${helpers}
  ${boundary}
  const out = [];
  for (const { el, edge } of window.__forced || []) {
    if (edge && !hasBoundary(el)) out.push('forced colours ' + name(el) + ' "' + label(el) + '": its border or fill disappears');
  }
  for (const el of document.querySelectorAll(stateSel)) {
    if (!visible(el)) continue;
    const p = peer(el);
    if (p && look(el) === look(p)) out.push('forced colours ' + name(el) + ' "' + label(el) + '": selected or current, but looks like ' + name(p));
  }
  return out;
})()`;

const ids = sb.ids(filter);
const problems = new Map();
const note = (id, where, line) => {
  const key = `${id}: ${line}`;
  if (!problems.has(key)) problems.set(key, []);
  problems.get(key).push(where);
};

const started = Date.now();
for (const [n, id] of ids.entries()) {
  progress(`${n + 1}/${ids.length} ${id}`);
  await sb.load(id, { width: sizes[0][0], height: sizes[0][1] });
  if (process.env.ROOT_STYLE) await sb.evaluate(`document.documentElement.style.cssText += ${JSON.stringify(';' + process.env.ROOT_STYLE)}`);

  for (const fine of [false, true]) {
    await sb.evaluate(`document.documentElement.style${fine ? ".setProperty('--spacing-target-min', 'var(--spacing-target-sm)')" : ".removeProperty('--spacing-target-min')"}`);
    for (const [w, h] of sizes) {
      await sb.size(w, h);
      for (const p of (await sb.evaluate(targetProbe(fine))) || []) note(id, `${fine ? 'fine' : 'touch'} ${w}`, p);
    }
  }
  await sb.evaluate(`document.documentElement.style.removeProperty('--spacing-target-min')`);

  await sb.size(...sizes[0]);
  await sb.evaluate(forcedBefore);
  await sb.media([{ name: 'forced-colors', value: 'active' }]);
  for (const p of (await sb.evaluate(forcedAfter)) || []) note(id, 'forced', p);
  await sb.media([]);
}

sb.close();
progressDone();
const took = Math.round((Date.now() - started) / 1000);
for (const [line, where] of problems) console.log(`${line} [${where.join('; ')}]`);
if (problems.size) {
  console.log(`\ncheck:targets: ${problems.size} problem(s) in ${ids.length} stories (${took}s).`);
  process.exit(1);
}
console.log(`check:targets: ${ids.length} stories in touch, fine and forced colours, no problems (${took}s).`);
