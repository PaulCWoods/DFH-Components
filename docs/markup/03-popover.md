---
title: Popover
tier: molecule
summary: A layer anchored to the control that opens it, holding a Card or a Menu.
tokens: popover
storybook: molecules-popover
related: [menu, card, tooltip, modal-dialog]
---

# 3. Popover
```html playground cluster
<button type="button" class="button" popovertarget="default-popover">
  <span>Delivery details</span>
  <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#ChevronDown"/></svg>
</button>

<div id="default-popover" popover class="popover" data-axes>
  <div class="card card--compact">
    <div class="card__body">
      <p class="text">Orders placed before noon leave the same day.</p>
    </div>
  </div>
</div>
---
Placement: Below, Above=popover--top, End aligned=popover--end-aligned, Start=popover--start, End=popover--end
```

## Why it exists
Some things belong to one control and only matter for a moment: the actions behind a Button, a short form, a preview of a person. A Popover holds them next to that control and leaves the rest of the page usable, which is what separates it from a [Dialog](02-modal-dialog.md).

It uses the native `popover` attribute. The browser puts it in the top layer, closes it on Escape or a click outside, and tells assistive technology whether it is open. The control that opens it is its anchor, so the markup doesn't wire them together, and it flips to the other side when it doesn't fit. None of that needs a script.

It has no surface of its own. What's inside is a [Card](10-card.md) or a [Menu](03b-menu.md), built the way they are everywhere else, and the Popover only decides where they go.

## When to use
- **For a Card or a Menu that belongs to one control:** actions, a short form, a preview.
- **Not for a short line of plain text about a control:** that is a [Tooltip](23-tooltip.md).
- **Not for a task that must block the page:** that is a [modal Dialog](02-modal-dialog.md).
- **Not for a message about the page or a result:** that is a [Banner](11-banner.md) or a [Toast](18-toast.md).

## Rules
- **Opening.** `popovertarget` opens it on click. `interestfor` opens it on hover and focus, as a Hovercard; that works in Chromium only, so a Hovercard never holds the only way to reach something. Escape and a click outside close it.
- **Content** is a Card or a Menu, nothing else. A tall Card shrinks to the screen; give it `.card__body--scrollable`, [focusable and named](10-card.md).
- **A Card with a `<header>` is an `<article>`.** In a `<div>`, that header can become the page's banner landmark.
- **Roles.** The Popover takes no role and its invoker no `aria-haspopup`; `popovertarget` already exposes the expanded state. A Popover holding a Form or several controls under a title may take `role="dialog"` with `aria-labelledby`, and its invoker then says `aria-haspopup="dialog"`. A list of actions is a [Menu](03b-menu.md).

## Keyboard and screen readers
The browser provides all of this for a Popover opened with `popovertarget`. Script only what the controls inside it do.
- **Enter and Space** on the Button open and close it.
- **Focus** stays on the Button when it opens, unless something inside has `autofocus`.
- **Tab** moves on from the Button. Keep the Popover right after its Button in the source, as these examples do, so Tab goes straight into it.
- **Escape** closes it and returns focus to the Button if focus was inside. A click outside closes it too.
- **A screen reader** hears the Button as expanded or collapsed. Opening a Popover announces nothing else, so it needs a Button label that says what it opens.
- **A control inside doesn't close it.** Give a closing Button `popovertarget` and `popovertargetaction="hide"`, or call `hidePopover()` from the script that does the work.

## A few actions under a title
```html live cluster
<button type="button" class="button" popovertarget="doc-actions">
  <span>Actions</span>
  <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#ChevronDown"/></svg>
</button>

<div id="doc-actions" popover class="popover">
  <article class="card card--compact card--ruled">
    <header class="card__header"><h3 class="card__title heading">Document</h3></header>
    <div class="card__body stack" style="--button-prominence: subtle;">
      <button type="button" class="button"><span>Duplicate</span></button>
      <button type="button" class="button"><span>Export JSON</span></button>
      <button type="button" class="button button--danger"><span>Delete</span></button>
    </div>
  </article>
</div>
```
A Card suits a few actions that need a title. For a longer list, with headings and shortcuts, use a [Menu](03b-menu.md).

## A Form Under a Title
```html live cluster
<button type="button" class="button" popovertarget="prefs" aria-haspopup="dialog"><span>Settings</span></button>

<div id="prefs" popover class="popover" role="dialog" aria-labelledby="prefs-title">
  <article class="card card--compact card--ruled">
    <header class="card__header"><h3 class="card__title heading" id="prefs-title">Preferences</h3></header>
    <div class="card__body stack">
      <div class="field">
        <label for="prefs-name" class="field__label label">Display name</label>
        <input id="prefs-name" type="text" class="input" />
      </div>
    </div>
    <footer class="card__footer">
      <button type="button" class="button button--strong button--accent button--sm" popovertarget="prefs" popovertargetaction="hide"><span>Done</span></button>
    </footer>
  </article>
</div>
```
A Form is more than a list of actions, so this one is a labelled Dialog to assistive technology, without being modal. Its Done Button closes it with `popovertargetaction="hide"`.

## A preview on hover and focus
```html live cluster
<a class="link" href="/people/jordan" interestfor="hc-jordan">Jordan Lee</a>

<div id="hc-jordan" popover class="popover">
  <article class="card">
    <header class="card__header">
      <hgroup class="card__hgroup">
        <h3 class="card__title heading">Jordan Lee</h3>
        <p class="card__subtitle small-text">Accessibility lead</p>
      </hgroup>
    </header>
    <footer class="card__footer"><a class="link" href="/people/jordan">View profile</a></footer>
  </article>
</div>
```
The Link still goes to the profile, so someone in a browser without `interestfor`, or on a touch screen, only misses the preview.

## Do and Don't
| Do | Don't |
| :--- | :--- |
| Put a Card or a Menu in a Popover. | Put bare text or a Banner in one. |
| Let the invoker be the anchor. | Add `anchor-name` or `position-anchor` to the markup. |
| Keep another way to reach what a Hovercard holds. | Put the only route to something in `interestfor`, which works in Chromium only. |
| Add `role="dialog"` and `aria-labelledby` for a Form under a title. | Add `aria-haspopup` to a Popover that isn't a Dialog. |
| Use a [Tooltip](23-tooltip.md) for a short line about a control. | Use a Popover for it. |

## Reference
A layer anchored to the control that opens it. It holds a [Card](10-card.md) or a [Menu](03b-menu.md) and draws no surface, padding or type of its own. A short line of plain text about a control is a [Tooltip](23-tooltip.md).

## Options
| Option | Values | Flag |
| :--- | :--- | :--- |
| Placement | default (below, aligned to the start edge), `--top`, `--end-aligned`, `--start`, `--end` | `--popover-placement` |
| Width | the content's: at least the invoker's, at most 24rem | `--popover-max-width` |

### Further rules
- **Anchoring is automatic.** The invoker is the anchor: no `anchor-name` or `position-anchor`. A Popover opened by script passes its anchor with `showPopover({ source: button })`. Without anchor positioning, the Popover opens centred.
- **Placement** is logical and flips when it doesn't fit, so it works in right-to-left text.

## Placement and Width
```html live cluster
<button type="button" class="button" popovertarget="place-top"><span>Above</span></button>
<div id="place-top" popover class="popover popover--top">
  <div class="card card--compact"><div class="card__body"><p class="text">Opens above its button.</p></div></div>
</div>

<button type="button" class="button" popovertarget="place-end"><span>End aligned</span></button>
<div id="place-end" popover class="popover popover--end-aligned">
  <div class="card card--compact"><div class="card__body"><p class="text">Lines up with the button's end edge.</p></div></div>
</div>

<button type="button" class="button" popovertarget="place-wide"><span>Wider</span></button>
<div id="place-wide" popover class="popover" style="--popover-max-width: 36rem;">
  <div class="card card--compact"><div class="card__body"><p class="text">This popover may grow to 36rem, for content that needs a longer line than the default width allows.</p></div></div>
</div>

<!-- Every popover in a region, set once -->
<nav aria-label="Popover placement example" style="--popover-placement: end-aligned;">
  <button type="button" class="button" popovertarget="place-region"><span>In a region</span></button>
  <div id="place-region" popover class="popover">
    <div class="card card--compact"><div class="card__body"><p class="text">Placed by the flag on the region.</p></div></div>
  </div>
</nav>
```
