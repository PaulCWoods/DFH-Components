# 2. Dialog (Native `<dialog class="dialog">` holding a `.card`)

The dialog is a shell: top-layer placement, size, backdrop and transitions. The surface is the `.card` inside it, which the dialog makes strong (raised) and gives its own radius and shadow through card flags. The audit is in `docs/audit/surfaces.md`.

- **Classes only.** A bare `<dialog>` keeps its browser rendering; put `.dialog` on it.
- **Scrolling:** put `.card__body--scrollable` on the body so it scrolls between a pinned header and footer. `.dialog--scrollable` scrolls the whole card instead (use a plain `.card__body`).
- `.dialog--drawer` is a full-height panel on the inline end; it slides in from the correct side in right-to-left text.
- A dialog without a card draws a card's surface itself.
- Open with `command="show-modal"` (or `showModal()`), name it with `aria-labelledby`. Escape and focus handling are native.

```html
<button type="button" class="button button--strong button--accent" commandfor="my-dialog" command="show-modal" aria-haspopup="dialog">
  <span>Open dialog</span>
</button>

<dialog id="my-dialog" class="dialog" aria-labelledby="dialog-title" aria-describedby="dialog-desc">
  <article class="card">
    <header class="card__header">
      <hgroup class="card__hgroup">
        <h2 id="dialog-title" class="card__title small-heading">Dialog title</h2>
        <p class="card__subtitle small-text">Supporting subtitle</p>
      </hgroup>
      <form method="dialog">
        <button type="submit" class="button button--icon">
          <span class="visually-hidden">Close dialog</span>
          <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Close"/></svg>
        </button>
      </form>
    </header>
    <div class="card__body card__body--scrollable">
      <p id="dialog-desc" class="text">Dialog body copy describing the decision clearly.</p>
    </div>
    <footer class="card__footer">
      <form method="dialog" class="cluster justify-content-end">
        <button type="submit" class="button"><span>Cancel</span></button>
        <button type="submit" value="confirm" class="button button--strong button--accent"><span>Confirm</span></button>
      </form>
    </footer>
  </article>
</dialog>

<!-- The whole card scrolls as one -->
<dialog id="terms-dialog" class="dialog dialog--scrollable" aria-labelledby="terms-title">
  <article class="card">
    <header class="card__header">
      <h2 id="terms-title" class="card__title small-heading">Terms and conditions</h2>
    </header>
    <div class="card__body">
      <p class="text">Header, body and footer scroll together.</p>
    </div>
    <footer class="card__footer">
      <form method="dialog"><button type="submit" class="button button--strong button--accent"><span>Accept</span></button></form>
    </footer>
  </article>
</dialog>

<!-- Drawer -->
<dialog id="settings-drawer" class="dialog dialog--drawer" aria-labelledby="drawer-title">
  <article class="card">
    <header class="card__header"><h2 id="drawer-title" class="card__title small-heading">Settings</h2></header>
    <div class="card__body card__body--scrollable">…</div>
  </article>
</dialog>
```
