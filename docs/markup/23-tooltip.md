---
title: Tooltip
tier: molecule
summary: A short line of plain text about a control, shown while the control is hovered or focused.
tokens: tooltip
storybook: molecules-tooltip
related: [popover, button, icon-icon-box]
---

# 23. Tooltip
```html playground cluster
<button type="button" class="button button--icon" interestfor="tip-default">
  <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Copy"/></svg>
  <span class="sr-only">Copy</span>
</button>
<div id="tip-default" popover="hint" class="tooltip" data-axes aria-hidden="true">Copy</div>
---
Placement: Above, Below=tooltip--bottom, Start=tooltip--start, End=tooltip--end
Arrow: Shown, None=tooltip--no-arrow
```

## Purpose
An icon Button saves space but asks people to guess. A Tooltip gives its name to anyone who hovers or tabs to it, for the moment they need it.

It is the browser's own: `interestfor` opens it and `popover="hint"` places it above the page, so showing it on hover and focus and closing it on Escape need no script. For now only Chromium browsers show it, which sets the rule for everything else here. A Tooltip is an extra and never holds the only copy of anything, and a control's name stays in the control.

It holds a short line of plain text. It goes away when attention moves on, so a Link or Button inside would be hard to reach, and that content belongs in a [Popover](03-popover.md).

## When to use
- **To name an icon Button** on hover and focus, or to show its shortcut.
- **To add a short description** that is also available some other way.
- **Not for rich content, or anything with a Link or Button in it:** that is a Popover opened with `interestfor` (a [Hovercard](03-popover.md)).
- **Not for the only copy of something:** Tooltips don't appear in every browser. Put it in the page.

## Rules
- **`interestfor` only.** Never `popovertarget`: a click would close the Tooltip and announce the Button as a toggle. Tooltips appear in Chromium browsers and nowhere else, so a Tooltip never holds the only copy of what it says. Products that want them elsewhere can load the `interestfor` polyfill; the library ships no script.
- **Label or description:**
  - a Tooltip that repeats the control's accessible name (icon Buttons) takes `aria-hidden="true"`; the name stays in the Button, and a shortcut goes in `aria-keyshortcuts`;
  - a Tooltip that adds information is pointed to with `aria-describedby`, so screen readers get it in every browser.
- **No `role="tooltip"`.** Triggers are Buttons and links; `interestfor` does nothing on other elements.

## Keyboard and screen readers
The browser provides all of this where `interestfor` is supported. There's nothing to script.
- **Tab** to the control shows the Tooltip, and moving on hides it.
- **Escape** closes it, with focus staying on the control.
- **The pointer** can move onto the Tooltip without it closing (WCAG 1.4.13).
- **A screen reader** reads the control's own name. A Tooltip with `aria-hidden="true"` isn't read a second time, and one named by `aria-describedby` is read as the description, whether or not it can appear.

## Label
```html live cluster
<button type="button" class="button button--icon" interestfor="tip-bold" aria-keyshortcuts="Meta+B">
  <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Bold"/></svg>
  <span class="sr-only">Bold</span>
</button>
<div id="tip-bold" popover="hint" class="tooltip" aria-hidden="true">Bold ⌘B</div>
```

## Description
```html live cluster
<button type="button" class="button" interestfor="tip-publish" aria-describedby="tip-publish">
  <span>Publish</span>
</button>
<div id="tip-publish" popover="hint" class="tooltip">Sends the post to all 1,204 subscribers</div>
```

## Do and Don't
| Do | Don't |
| :--- | :--- |
| Open a Tooltip with `interestfor`. | Use `popovertarget`, which makes the Button a toggle. |
| Keep the name in the Button and put `aria-hidden="true"` on a Tooltip that repeats it. | Leave the name to the Tooltip alone. |
| Point `aria-describedby` at a Tooltip that adds information. | Add `role="tooltip"`. |
| Use a Popover for a Link, a Button or rich content. | Put a Card or a control in a Tooltip. |
| Say anything essential in the page as well. | Keep the only copy in a Tooltip, which appears in Chromium browsers only. |

## Reference
A short line of plain text about a control, shown while the control is hovered or focused. Anything richer, or anything with a Link or Button in it, is a Popover opened with `interestfor` (a [Hovercard](03-popover.md)).

## Options
| Option | Values | Flag |
| :--- | :--- | :--- |
| Placement | default (above, centred), `--bottom`, `--start`, `--end` | `--tooltip-placement` |
| Arrow | default, `--no-arrow` | |

### Further rules
- **WCAG 1.4.13:** the pointer can move onto the Tooltip without it closing, and Escape closes it.
- **Anchoring is automatic**, as with Popover. Placement is logical and flips when it doesn't fit; the arrow follows.
- **Type** is the small-text step, so it follows `--font-sizing`.

## Placement
```html live cluster
<button type="button" class="button" interestfor="tip-bottom"><span>Bottom</span></button>
<div id="tip-bottom" popover="hint" class="tooltip tooltip--bottom" aria-hidden="true">Bottom</div>

<button type="button" class="button" interestfor="tip-start"><span>Start</span></button>
<div id="tip-start" popover="hint" class="tooltip tooltip--start" aria-hidden="true">Start</div>

<button type="button" class="button" interestfor="tip-end"><span>End</span></button>
<div id="tip-end" popover="hint" class="tooltip tooltip--end tooltip--no-arrow" aria-hidden="true">End, no arrow</div>

<!-- Every tooltip in a region, set once -->
<div class="cluster" role="group" aria-label="Formatting" style="--tooltip-placement: bottom;">
  <button type="button" class="button button--icon" interestfor="tip-italic">
    <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Italic"/></svg>
    <span class="sr-only">Italic</span>
  </button>
  <div id="tip-italic" popover="hint" class="tooltip" aria-hidden="true">Italic</div>
  <button type="button" class="button button--icon" interestfor="tip-underline">
    <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Underline"/></svg>
    <span class="sr-only">Underline</span>
  </button>
  <div id="tip-underline" popover="hint" class="tooltip" aria-hidden="true">Underline</div>
</div>
```
