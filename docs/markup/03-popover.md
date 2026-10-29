# 3. Popover

A layer anchored to the control that opens it. It holds a card or a menu (§10, §3b) and draws no surface, padding or type of its own. A short line of plain text about a control is a tooltip (§23). The audit is in `docs/audit/floating-layers.md`.

| Option | Values | Flag |
| :--- | :--- | :--- |
| Placement | default (below, aligned to the start edge), `--top`, `--end-aligned`, `--start`, `--end` | `--popover-placement` |
| Width | the content's: at least the invoker's, at most 24rem | `--popover-max-width` |

- **Opening.** `popovertarget` opens it on click. `interestfor` opens it on hover and focus, as a hovercard; that works in Chromium only, so a hovercard never holds the only way to reach something. Escape and a click outside close it.
- **Anchoring is automatic.** The invoker is the anchor: no `anchor-name` or `position-anchor`. A popover opened by script passes its anchor with `showPopover({ source: button })`. Without anchor positioning, the popover opens centred.
- **Placement** is logical and flips when it doesn't fit, so it works in right-to-left text.
- **Content** is a card or a menu, nothing else. A tall card shrinks to the screen; give it `.card__body--scrollable`, focusable and named (§10).
- **Roles.** The popover takes no role and its invoker no `aria-haspopup`; `popovertarget` already exposes the expanded state. A popover holding a form or several controls under a title may take `role="dialog"` with `aria-labelledby`, and its invoker then says `aria-haspopup="dialog"`. Menus are covered in §3b.

## A. Actions
```html
<button type="button" class="button" popovertarget="doc-actions">
  <span>Actions</span>
  <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#ChevronDown"/></svg>
</button>

<div id="doc-actions" popover class="popover">
  <div class="card card--compact card--ruled">
    <header class="card__header"><h3 class="card__title heading">Document</h3></header>
    <div class="card__body stack" style="--button-prominence: subtle;">
      <button type="button" class="button"><span>Duplicate</span></button>
      <button type="button" class="button"><span>Export JSON</span></button>
      <button type="button" class="button button--danger"><span>Delete</span></button>
    </div>
  </div>
</div>
```

## B. A Form Under a Title
```html
<button type="button" class="button" popovertarget="prefs" aria-haspopup="dialog"><span>Settings</span></button>

<div id="prefs" popover class="popover" role="dialog" aria-labelledby="prefs-title">
  <div class="card card--compact card--ruled">
    <header class="card__header"><h3 class="card__title heading" id="prefs-title">Preferences</h3></header>
    <div class="card__body stack">…</div>
    <footer class="card__footer">
      <button type="button" class="button button--strong button--accent button--sm" popovertarget="prefs" popovertargetaction="hide"><span>Done</span></button>
    </footer>
  </div>
</div>
```

## C. Hovercard
```html
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

## D. Placement and Width
```html
<div popover class="popover popover--top">…</div>
<div popover class="popover popover--end-aligned">…</div>
<div popover class="popover" style="--popover-max-width: 36rem;">…</div>

<!-- Every popover in a region, set once -->
<nav style="--popover-placement: end-aligned;">…</nav>
```
