# 23. Tooltip

A short line of plain text about a control, shown while the control is hovered or focused. Anything richer, or anything with a link or button in it, is a popover opened with `interestfor` (a hovercard, §3). The audit is in `docs/audit/floating-layers.md`.

| Option | Values | Flag |
| :--- | :--- | :--- |
| Placement | default (above, centred), `--bottom`, `--start`, `--end` | `--tooltip-placement` |
| Arrow | default, `--no-arrow` | |

- **`interestfor` only.** Never `popovertarget`: a click would close the tooltip and announce the button as a toggle. Tooltips appear in Chromium browsers and nowhere else, so a tooltip never holds the only copy of what it says. Products that want them elsewhere can load the `interestfor` polyfill; the library ships no script.
- **Label or description:**
  - a tooltip that repeats the control's accessible name (icon buttons) takes `aria-hidden="true"`; the name stays in the button, and a shortcut goes in `aria-keyshortcuts`;
  - a tooltip that adds information is pointed to with `aria-describedby`, so screen readers get it in every browser.
- **No `role="tooltip"`.** Triggers are buttons and links; `interestfor` does nothing on other elements.
- **WCAG 1.4.13:** the pointer can move onto the tooltip without it closing, and Escape closes it.
- **Anchoring is automatic**, as with popover. Placement is logical and flips when it doesn't fit; the arrow follows.
- **Type** is the small-text step, so it follows `--font-sizing`.

## A. Label
```html
<button type="button" class="button button--icon" interestfor="tip-bold" aria-keyshortcuts="Meta+B">
  <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Bold"/></svg>
  <span class="sr-only">Bold</span>
</button>
<div id="tip-bold" popover="hint" class="tooltip" aria-hidden="true">Bold ⌘B</div>
```

## B. Description
```html
<button type="button" class="button" interestfor="tip-publish" aria-describedby="tip-publish">
  <span>Publish</span>
</button>
<div id="tip-publish" popover="hint" class="tooltip">Sends the post to all 1,204 subscribers</div>
```

## C. Placement
```html
<div popover="hint" class="tooltip tooltip--bottom">…</div>
<div popover="hint" class="tooltip tooltip--start">…</div>
<div popover="hint" class="tooltip tooltip--end tooltip--no-arrow">…</div>

<!-- Every tooltip in a region, set once -->
<div role="group" aria-label="Formatting" style="--tooltip-placement: bottom;">…</div>
```
