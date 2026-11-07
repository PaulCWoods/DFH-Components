#!/usr/bin/env node
/* ==========================================================================
   check:targets
   --------------------------------------------------------------------------
   Loads stories from the built Storybook in headless Chrome and checks what
   a touch screen or Windows High Contrast user would meet (PRINCIPLES §1, §2):

   - target: a control whose hit area is smaller than the target for the
     pointer mode, read from its own --spacing-target-min: 48px with touch
     targets (the default), 32px with fine-pointer targets. Native fields
     (text, select, colour, file) and choice rows may be 32px in either
     mode, since an input can't take a buffer. A range is its own target,
     so it meets the full size. Where neighbours meet before the full
     size, each owning its half of the gap, the target is what's left
     (PRINCIPLES §2 accepts it; CROWDED=1 lists them). That includes a
     control at the end of a wrapped line, which its group caps for an item
     CSS can't see has moved to the next line.
   - covered: a neighbour's hit area reaches over part of a control's drawn
     box, so a tap on what looks like one control activates another.
   - text links meet WCAG 2.5.8 (AA) instead: 24px, or no other control
     within 12px of the centre. Links in running text are exempt.
   - spill: a control's hit area reaches past the bar that holds it (a
     header, tab list, batch actions, pagination or code block's bar), so it
     covers the page beside the bar or is clipped. A bar is never shorter
     than its targets.
   - edge: a text field (or the control drawn around it) with no visible
     edge, at least half opaque, under prefers-contrast: more and in forced
     colours. In normal colours a field may go without one (subtle): WCAG
     1.4.11 doesn't ask a field for a boundary. --flush is exempt: its
     container draws the edge.
   - forced colours: a control whose boundary (a border or fill) disappears
     in forced colours, or a selected, current or checked item that looks
     the same as its neighbours there (a checked input the browser draws
     itself is left to the browser).

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
  const textField = 'input:not([type="checkbox"], [type="radio"], [type="range"], [type="button"], [type="submit"], [type="reset"]), select, textarea';
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
  /* Whether a point is outside the visible box of a scroller that the
     control itself (or the label around it) is partly scrolled out of: it
     comes into view with focus. A control wholly inside still needs its buffer inside. */
  const scrolledOut = (el, x, y) => {
    /* A box inside a label is measured by the label it fills (a choice row) */
    const label = el.labels?.[0];
    const box = (label && label.contains(el) ? label : el).getBoundingClientRect();
    for (let a = el.parentElement; a && a !== document.body; a = a.parentElement) {
      const cs = getComputedStyle(a);
      if (!/auto|scroll/.test(cs.overflowX + cs.overflowY)) continue;
      const r = a.getBoundingClientRect();
      const cut = box.left < r.left || box.right > r.right || box.top < r.top || box.bottom > r.bottom;
      if (cut && (x < r.left || x > r.right || y < r.top || y > r.bottom)) return true;
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

    /* Its drawn box is its own: points just inside each edge and corner
       don't land on a neighbour's buffer */
    const neighbourAt = (x, y) => {
      if (!inView(x, y) || scrolledOut(el, x, y)) return null;
      const hit = document.elementFromPoint(x, y);
      if (owns(el, hit) || overlay(el, hit)) return null;
      const other = hit?.closest(controls);
      return other && other !== el && !other.contains(el) && !el.contains(other) ? other : null;
    };
    const e = 4;
    const covering = [[box.left + e, cy], [box.right - e, cy], [cx, box.top + e], [cx, box.bottom - e], [box.left + e, box.top + e], [box.right - e, box.top + e], [box.left + e, box.bottom - e], [box.right - e, box.bottom - e]]
      .map(([x, y]) => neighbourAt(x, y)).find(Boolean);
    if (covering) {
      out.push('covered ' + name(el) + ' "' + label(el) + '": ' + name(covering) + ' "' + label(covering) + '" reaches over its box');
      continue;
    }

    const need = needAt(el);
    const link = el.matches(textLink);
    const min = link ? 24 : el.matches(textField + ', ' + choice) ? Math.min(need, 32) : need;
    const half = min / 2 - 1;
    const short = [];
    for (const [dx, dy, side] of [[-half, 0, 'start'], [half, 0, 'end'], [0, -half, 'top'], [0, half, 'bottom']]) {
      const x = cx + dx, y = cy + dy;
      if (!inView(x, y) || scrolledOut(el, x, y)) continue;
      const hit = document.elementFromPoint(x, y);
      if (owns(el, hit) || overlay(el, hit)) continue;
      /* A neighbouring control, not one around this one (a focusable
         scrolling region) */
      const other = hit?.closest(controls);
      const neighbour = !!other && other !== el && !other.contains(el);
      /* A text link only needs space around it (the spacing exception) */
      if (link) { if (neighbour) short.push(side); continue; }
      /* Neighbours meet before the full size, each owning half the gap. A
         neighbouring item that holds a control (the next chip, holding its
         remove button) counts as one. */
      const holds = (h) => { for (let a = h; a && !a.contains(el); a = a.parentElement) if (a.matches(controls) || a.querySelector(controls)) return true; return false; };
      let crowded = neighbour || holds(hit);
      /* Or the point is in the empty half of a gap, with the next item
         further along: the hit area stopped halfway to it. A group can't
         tell whether its next item is interactive, so any item counts. */
      const item = (h) => !!h && !h.contains(el) && !el.contains(h);
      for (let t = 2; !crowded && t <= half; t += 2) {
        const fx = x + Math.sign(dx) * t, fy = y + Math.sign(dy) * t;
        if (inView(fx, fy)) crowded = item(document.elementFromPoint(fx, fy));
      }
      /* Or the control ends a line of a row that wraps: the group caps it
         for the next item, which CSS can't see has moved to the next line */
      if (!crowded && dx) {
        for (let a = el; a?.parentElement; a = a.parentElement) {
          const p = getComputedStyle(a.parentElement);
          if (!/flex/.test(p.display) || p.flexWrap !== 'wrap') continue;
          const next = dx > 0 ? a.nextElementSibling : a.previousElementSibling;
          const r = a.getBoundingClientRect(), n = next?.getBoundingClientRect();
          /* The last item ends a line too, unless it is on the first */
          const first = a.parentElement.firstElementChild.getBoundingClientRect();
          crowded = n ? (dx > 0 ? n.top >= r.bottom - 1 : n.bottom <= r.top + 1) : dx > 0 && first.bottom <= r.top + 1;
          break;
        }
      }
      if (crowded) { if (${process.env.CROWDED ? 'true' : 'false'}) out.push('crowded ' + name(el) + ' "' + label(el) + '" ' + Math.round(box.right - box.left) + 'x' + Math.round(box.bottom - box.top) + ' (' + side + ')'); continue; }
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

/* Before forced colours: which controls have a boundary to keep */
const forcedBefore = `(() => {
  ${helpers}
  ${boundary}
  window.__forced = [...document.querySelectorAll(controls)].filter(visible).map((el) => ({ el, edge: hasBoundary(el) }));
})()`;

/* Under high contrast and forced colours: every text field, or the control
   drawn around it (a combobox), has an edge. --flush is the exception, for
   a container that draws the edge itself. */
const edgeProbe = `(() => {
  ${helpers}
  ${boundary}
  const out = [];
  const typed = 'input:not([type]), input[type="text"], input[type="email"], input[type="search"], input[type="tel"], input[type="url"], input[type="password"], input[type="number"], input[type="date"], input[type="time"], input[type="datetime-local"], input[type="month"], input[type="week"], select, textarea';
  for (const el of document.querySelectorAll(typed)) {
    if (!visible(el) || el.closest('[class*="--flush"]')) continue;
    const box = el.getBoundingClientRect();
    let edged_ = hasBoundary(el);
    for (let a = el.parentElement, i = 0; !edged_ && a && i < 3; a = a.parentElement, i++) {
      const r = a.getBoundingClientRect();
      if (r.height <= box.height + 32 && hasBoundary(a)) edged_ = true;
    }
    if (!edged_) out.push('edge ' + name(el) + ' "' + label(el) + '": a text field with no edge');
  }
  return out;
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
  /* A checked input the library draws (appearance: none, as a Switch's):
     compare what draws it with an unchecked one of the same kind */
  const host = (el) => el.closest('.switch__control, label') || el;
  for (const el of document.querySelectorAll('input:checked')) {
    if (getComputedStyle(el).appearance !== 'none' || !visible(host(el))) continue;
    const p = [...document.querySelectorAll('input[type="' + el.type + '"]:not(:checked)')].find((q) => q.className === el.className && getComputedStyle(q).appearance === 'none' && host(q) !== host(el) && host(q).className === host(el).className && visible(host(q)));
    if (p && look(host(el)) === look(host(p))) out.push('forced colours ' + name(el) + ' "' + label(el) + '": checked, but looks like an unchecked one');
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
  await sb.media([{ name: 'prefers-contrast', value: 'more' }]);
  for (const p of (await sb.evaluate(edgeProbe)) || []) note(id, 'high contrast', p);
  await sb.media([{ name: 'forced-colors', value: 'active' }]);
  for (const p of (await sb.evaluate(edgeProbe)) || []) note(id, 'forced', p);
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
