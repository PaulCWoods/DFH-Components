# 2. Dialog (Native `<dialog class="dialog">` holding a `.card`)

A modal shell: top-layer placement, size, backdrop, motion and the page's scroll lock. The surface is the `.card` inside it. The dialog makes the card strong (raised) and gives it the dialog's radius and shadow through card flags. Every button in it is an ordinary `.button` with its own classes. The audit is in `docs/audit/dialog.md`.

| Axis | Values |
| :--- | :--- |
| Placement | centred (default); `.dialog--drawer` (inline end); `.dialog--drawer.dialog--start` (inline start) |
| Scroll | `.card__body--scrollable` (the body scrolls between a pinned header and footer); `.dialog--scrollable` (the whole card scrolls, with a plain `.card__body`) |

Hooks: `--dialog-width` (36rem) and `--dialog-drawer-width` (24rem), set on one dialog or a region. There are no size modifiers.

- **Classes only.** A bare `<dialog>` keeps its browser rendering; put `.dialog` on it.
- **Modal only.** Open it with `command="show-modal"` or `showModal()`. A non-modal floating panel is a `.popover` (§3), not a dialog opened with `show()`.
- **Closing.**
  - The header's close button is `.button.button--plain.button--icon` with a hidden label and `commandfor="{id}" command="close"`.
  - Footer actions are submit buttons in a `form method="dialog"`; the chosen button's `value` becomes the dialog's `returnValue`.
  - In a form dialog the card is the form, and Cancel is a close command, so Enter in a field submits rather than cancels.
  - Escape closes it (native).
  - `closedby="any"` adds light dismiss (a click on the backdrop) where supported; elsewhere Escape and the buttons still work. Leave it off a dialog holding unsaved input.
- **Focus.**
  - The first focusable element takes focus, or the one marked `autofocus`: the first field in a form dialog, the safe action in a destructive confirmation.
  - Focus returns to the opener on close (native).
- **Semantics.**
  - Name it with `aria-labelledby`.
  - A confirmation that interrupts to ask for a decision takes `role="alertdialog"` and `aria-describedby` on its message.
  - No `aria-modal`: `showModal()` makes the rest of the page inert.
  - `aria-haspopup="dialog"` on the opener is optional.
- **Scroll lock.** While a modal is open the page neither scrolls nor shifts sideways (`:root:has(.dialog:modal)`).
- **Drawers** are full height and follow the text direction. Use the end side for settings and details and the start side for navigation. On a narrow screen a drawer leaves a 3rem strip of the page beside it.
- **Motion.** It fades and moves in over `--duration-sm`, and exit mirrors entry. Reduced motion keeps the fade only; more contrast drops the backdrop blur.
- **Without a card** (an image, a video), the dialog draws a card's surface itself.
- **Scrolling bodies** are focusable and named (§10).

## A. Dialog
```html
<button type="button" class="button" commandfor="rules-dialog" command="show-modal">
  <span>Read the rules</span>
</button>

<dialog id="rules-dialog" class="dialog" aria-labelledby="rules-title">
  <div class="card">
    <header class="card__header">
      <h2 id="rules-title" class="card__title small-heading">Site rules</h2>
      <button type="button" class="button button--plain button--icon" commandfor="rules-dialog" command="close">
        <span class="sr-only">Close</span>
        <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Close"/></svg>
      </button>
    </header>
    <div class="card__body card__body--scrollable" tabindex="0" aria-label="Site rules">…</div>
    <footer class="card__footer justify-end">
      <form method="dialog" class="button-group">
        <button type="submit" value="cancel" class="button"><span>Cancel</span></button>
        <button type="submit" value="agree" class="button button--strong button--accent"><span>Agree</span></button>
      </form>
    </footer>
  </div>
</dialog>
```

## B. Confirmation
```html
<dialog id="delete-dialog" class="dialog" role="alertdialog" aria-labelledby="delete-title" aria-describedby="delete-message" style="--dialog-width: 28rem;">
  <div class="card">
    <header class="card__header">
      <h2 id="delete-title" class="card__title small-heading">Delete plot A-14?</h2>
    </header>
    <div class="card__body">
      <p id="delete-message" class="text">Its sowing records and rota weeks go too. This can't be undone.</p>
    </div>
    <footer class="card__footer justify-end">
      <form method="dialog" class="button-group">
        <button type="submit" value="cancel" class="button" autofocus><span>Keep plot</span></button>
        <button type="submit" value="delete" class="button button--strong button--danger">
          <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Delete"/></svg>
          <span>Delete plot</span>
        </button>
      </form>
    </footer>
  </div>
</dialog>
```

## C. Form dialog
```html
<dialog id="rename-dialog" class="dialog" aria-labelledby="rename-title">
  <form method="dialog" class="card">
    <header class="card__header">
      <h2 id="rename-title" class="card__title small-heading">Rename plot</h2>
      <!-- close button as in A -->
    </header>
    <div class="card__body">
      <div class="field">
        <label for="plot-name" class="field__label label">Plot name</label>
        <input id="plot-name" name="name" class="input" value="A-14" required autofocus />
      </div>
    </div>
    <footer class="card__footer justify-end">
      <div class="button-group">
        <button type="button" class="button" commandfor="rename-dialog" command="close"><span>Cancel</span></button>
        <button type="submit" value="save" class="button button--strong button--accent"><span>Save</span></button>
      </div>
    </footer>
  </form>
</dialog>
```

## D. Drawers
```html
<!-- Settings: inline end -->
<dialog id="settings-drawer" class="dialog dialog--drawer" aria-labelledby="settings-title">
  <div class="card">
    <header class="card__header">
      <h2 id="settings-title" class="card__title small-heading">Settings</h2>
      <!-- close button as in A -->
    </header>
    <div class="card__body card__body--scrollable" tabindex="0" aria-label="Settings">…</div>
  </div>
</dialog>

<!-- Navigation: inline start, opened by a menu button -->
<button type="button" class="button button--plain button--icon" commandfor="nav-drawer" command="show-modal" aria-haspopup="dialog">
  <span class="sr-only">Menu</span>
  <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Navigation"/></svg>
</button>

<dialog id="nav-drawer" class="dialog dialog--drawer dialog--start" aria-labelledby="nav-title">
  <div class="card">
    <header class="card__header">
      <h2 id="nav-title" class="card__title small-heading">Allotment</h2>
      <!-- close button as in A -->
    </header>
    <div class="card__body card__body--scrollable">
      <nav class="navigation-tree" aria-labelledby="nav-title">…</nav>
    </div>
  </div>
</dialog>
```

## E. Whole card scrolls, light dismiss, no card
```html
<dialog id="terms-dialog" class="dialog dialog--scrollable" aria-labelledby="terms-title">
  <div class="card" tabindex="0" aria-label="Terms">…</div>
</dialog>

<dialog id="rota-dialog" class="dialog" aria-labelledby="rota-title" closedby="any">…</dialog>

<dialog id="plan-dialog" class="dialog" aria-labelledby="plan-title" closedby="any">
  <figure class="stack">
    <figcaption id="plan-title" class="small-heading">Site plan</figcaption>
    <img src="site-plan.svg" alt="Three rows of plots, A to C, with the tool locker by the gate" />
  </figure>
</dialog>
```
