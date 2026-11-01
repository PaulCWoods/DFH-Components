---
title: Dialog
tier: organism
summary: A modal window on top of the page, for a decision, a short form or a drawer of settings.
tokens: dialog
storybook: organisms-dialog
related: [card, popover, button, form-composition, sidebar]
---

# 2. Dialog (Native `<dialog class="dialog">` holding a `.card`)
```html playground cluster
<button type="button" class="button" commandfor="default-dialog" command="show-modal"><span>Open dialog</span></button>

<dialog id="default-dialog" class="dialog" aria-labelledby="default-dialog-title" data-axes>
  <article class="card">
    <header class="card__header">
      <h2 id="default-dialog-title" class="card__title heading">Watering rota</h2>
      <button type="button" class="button button--plain button--icon button--sm" commandfor="default-dialog" command="close">
        <span class="sr-only">Close</span>
        <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Close"/></svg>
      </button>
    </header>
    <div class="card__body">
      <p class="text">Bed 3 is yours this week. Water it in the evening.</p>
    </div>
  </article>
</dialog>
---
Placement: Centred, Top=dialog--top, Drawer at the end=dialog--drawer, Drawer at the start=dialog--drawer dialog--start
```

## Why it exists
A Dialog stops someone mid-task, which is a big ask, so it should be saved for what can't wait or can't happen on the page.

It is the native `<dialog>`, opened as a modal. The browser then moves focus in, returns it on close, handles Escape, puts the Dialog above everything and makes the rest of the page inert. Hand-built modals have to recreate all of that, and that's where they tend to fail people. So the library adds no script and no focus trap.

The Dialog is only the shell: placement, backdrop and motion. The surface is a Card, so what's inside is built the way it is everywhere else.

## When to use
- **To interrupt for a decision** the page can't go on without, such as a confirmation.
- **For a short, focused task** that keeps the page behind it, such as renaming something.
- **As a drawer** for settings, details or [navigation on a small screen](34-sidebar.md).
- **Not for a non-modal floating panel:** that is a [Popover](03-popover.md).
- **Not for a passing message:** that is a [Toast](18-toast.md) or a [Banner](11-banner.md).

## Rules
- **Modal only.** Open it with `command="show-modal"` or `showModal()`. A non-modal floating panel is a [`.popover`](03-popover.md), not a Dialog opened with `show()`.
- **Closing.**
  - The header's close Button is `.button.button--plain.button--icon` with a hidden label and `commandfor="{id}" command="close"`.
  - Footer actions are submit Buttons in a `form method="dialog"`; the chosen Button's `value` becomes the Dialog's `returnValue`.
  - In a Form Dialog the Card is the Form, and Cancel is a close command, so Enter in a Field submits rather than cancels.
  - Escape closes it (native).
  - `closedby="any"` adds light dismiss (a click on the backdrop) where supported; elsewhere Escape and the Buttons still work. Leave it off a Dialog holding unsaved input.
- **Focus.**
  - The first focusable element takes focus, or the one marked `autofocus`: the first field in a Form Dialog, the safe action in a destructive confirmation.
  - Focus returns to the opener on close (native).
- **Semantics.**
  - Name it with `aria-labelledby`.
  - A confirmation that interrupts to ask for a decision takes `role="alertdialog"` and `aria-describedby` on its message.
  - No `aria-modal`: `showModal()` makes the rest of the page inert.
  - `aria-haspopup="dialog"` on the opener is optional.
- **Scrolling bodies** are [focusable and named](10-card.md).

## Keyboard and screen readers
The browser provides all of this for a modal `<dialog>`. There's nothing to script.
- **Opening** moves focus into the Dialog: to the first focusable element, or the one marked `autofocus`.
- **Tab** moves through the Dialog's controls. The page behind is inert, so it can't be reached.
- **Escape** closes it, and focus returns to the control that opened it.
- **A screen reader** announces it as a dialog with the name from `aria-labelledby`, and can't read the inert page behind it. A confirmation also reads its message, through `aria-describedby`.

## Confirmation
```html live cluster
<button type="button" class="button" commandfor="delete-dialog" command="show-modal"><span>Delete plot</span></button>

<dialog id="delete-dialog" class="dialog" role="alertdialog" aria-labelledby="delete-title" aria-describedby="delete-message" style="--dialog-width: 28rem;">
  <article class="card">
    <header class="card__header">
      <h3 id="delete-title" class="card__title heading">Delete plot A-14?</h3>
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
  </article>
</dialog>
```

## Form dialog
```html live cluster
<button type="button" class="button" commandfor="rename-dialog" command="show-modal"><span>Rename plot</span></button>

<dialog id="rename-dialog" class="dialog" aria-labelledby="rename-title">
  <form method="dialog" class="card">
    <header class="card__header">
      <h3 id="rename-title" class="card__title heading">Rename plot</h3>
      <button type="button" class="button button--plain button--icon button--sm" commandfor="rename-dialog" command="close">
        <span class="sr-only">Close</span>
        <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Close"/></svg>
      </button>
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

## Drawers
```html live cluster
<!-- Settings: inline end -->
<button type="button" class="button" commandfor="settings-drawer" command="show-modal"><span>Settings</span></button>

<dialog id="settings-drawer" class="dialog dialog--drawer" aria-labelledby="settings-title">
  <article class="card">
    <header class="card__header">
      <h3 id="settings-title" class="card__title heading">Settings</h3>
      <button type="button" class="button button--plain button--icon button--sm" commandfor="settings-drawer" command="close">
        <span class="sr-only">Close</span>
        <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Close"/></svg>
      </button>
    </header>
    <div class="card__body card__body--scrollable" tabindex="0" aria-label="Settings">
      <p class="text">Reminders go out on Sunday evenings.</p>
    </div>
  </article>
</dialog>

<!-- Navigation: inline start, opened by a menu button -->
<button type="button" class="button button--plain button--icon button--sm" commandfor="nav-drawer" command="show-modal" aria-haspopup="dialog">
  <span class="sr-only">Open allotment navigation</span>
  <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Navigation"/></svg>
</button>

<dialog id="nav-drawer" class="dialog dialog--drawer dialog--start" aria-labelledby="nav-title">
  <article class="card">
    <header class="card__header">
      <h3 id="nav-title" class="card__title heading">Allotment</h3>
      <button type="button" class="button button--plain button--icon button--sm" commandfor="nav-drawer" command="close">
        <span class="sr-only">Close</span>
        <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Close"/></svg>
      </button>
    </header>
    <div class="card__body card__body--scrollable">
      <nav class="navigation-tree" aria-labelledby="nav-title">
        <ul role="list">
          <li><a href="/plots" class="button" aria-current="page"><span>Plots</span></a></li>
          <li><a href="/rota" class="button"><span>Rota</span></a></li>
        </ul>
      </nav>
    </div>
  </article>
</dialog>
```

## Typing on a Phone
iOS doesn't resize the page for its on-screen keyboard, and `dvb` ignores it, so a centred Dialog can end up behind the keyboard, and the page pans to find the field. `.dialog--top` keeps a field near the top of the screen, and the Dialog stays still as its content grows.

```html live cluster
<button type="button" class="button" commandfor="find-dialog" command="show-modal"><span>Find a plant</span></button>

<dialog id="find-dialog" class="dialog dialog--top" aria-labelledby="find-title">
  <article class="card">
    <header class="card__header">
      <h3 id="find-title" class="card__title heading">Find a plant</h3>
      <button type="button" class="button button--plain button--icon button--sm" commandfor="find-dialog" command="close">
        <span class="sr-only">Close</span>
        <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Close"/></svg>
      </button>
    </header>
    <div class="card__body">
      <div class="field">
        <label for="find-input" class="field__label label">Plant name</label>
        <input id="find-input" type="search" class="input" autofocus />
      </div>
    </div>
  </article>
</dialog>
```

If the Dialog can grow taller than the space above the keyboard, as search results do, the product also fits it to what is visible. Multiplying by the scale keeps pinch zoom from squashing it.

```js
const viewport = window.visualViewport;
viewport?.addEventListener('resize', () => {
  dialog.style.setProperty('--dialog-max-height', `calc(${viewport.height * viewport.scale}px - var(--dialog-cushion) * 2)`);
});
```

## Do and Don't
| Do | Don't |
| :--- | :--- |
| Open it with `command="show-modal"` or `showModal()`. | Open a `.dialog` with `show()`; use a `.popover`. |
| Name it with `aria-labelledby`. | Add `aria-modal`; the rest of the page is already inert. |
| Put `autofocus` on the safe action in a destructive confirmation. | Focus the destructive Button first. |
| Make Cancel a close command in a Form Dialog. | Make Cancel a submit Button in a Form that Enter submits. |
| Leave `closedby="any"` off a Dialog holding unsaved input. | Let a stray click throw away someone's typing. |
| Use `.dialog--drawer.dialog--start` for navigation. | Build a drawer from a `div` and a script. |

## Reference
A modal shell: top-layer placement, size, backdrop, motion and the page's scroll lock. The surface is the `.card` inside it. The Dialog makes the Card strong (raised) and gives it the Dialog's radius and shadow through Card flags. Every Button in it is an ordinary `.button` with its own classes.

## Options
| Axis | Values |
| :--- | :--- |
| Placement | centred (default); `.dialog--top`; `.dialog--drawer` (inline end); `.dialog--drawer.dialog--start` (inline start) |
| Scroll | `.card__body--scrollable` (the body scrolls between a pinned header and footer); `.dialog--scrollable` (the whole Card scrolls, with a plain `.card__body`) |

Hooks: `--dialog-width` (36rem) and `--dialog-drawer-width` (24rem), set on one Dialog or a region; `--dialog-cushion` (the space kept from the screen edge) and `--dialog-max-height`. There are no size modifiers.

### Further rules
- **Classes only.** A bare `<dialog>` keeps its browser rendering; put `.dialog` on it.
- **Scroll lock.** While a modal is open the page neither scrolls nor shifts sideways (`:root:has(.dialog:modal)`).
- **Drawers** are full height and follow the text direction. Use the end side for settings and details and the start side for navigation. On a narrow screen a drawer leaves a 3rem strip of the page beside it.
- **Motion.** It fades and moves in over `--duration-sm`, and exit mirrors entry. Reduced motion keeps the fade only; more contrast drops the backdrop blur.
- **Without a Card** (an image, a video), the Dialog draws a Card's surface itself.

## Dialog
```html live cluster
<button type="button" class="button" commandfor="rules-dialog" command="show-modal">
  <span>Read the rules</span>
</button>

<dialog id="rules-dialog" class="dialog" aria-labelledby="rules-title">
  <article class="card">
    <header class="card__header">
      <h3 id="rules-title" class="card__title heading">Site rules</h3>
      <button type="button" class="button button--plain button--icon button--sm" commandfor="rules-dialog" command="close">
        <span class="sr-only">Close</span>
        <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Close"/></svg>
      </button>
    </header>
    <div class="card__body card__body--scrollable" tabindex="0" aria-label="Site rules">
      <p class="text">Keep the paths clear, shut the gate behind you and take your cuttings home.</p>
    </div>
    <footer class="card__footer justify-end">
      <form method="dialog" class="button-group">
        <button type="submit" value="cancel" class="button"><span>Cancel</span></button>
        <button type="submit" value="agree" class="button button--strong button--accent"><span>Agree</span></button>
      </form>
    </footer>
  </article>
</dialog>
```

## Whole card scrolls, light dismiss, no card
```html live cluster
<button type="button" class="button" commandfor="terms-dialog" command="show-modal"><span>Terms</span></button>

<dialog id="terms-dialog" class="dialog dialog--scrollable" aria-labelledby="terms-title">
  <article class="card" tabindex="0" aria-label="Terms">
    <header class="card__header">
      <h3 id="terms-title" class="card__title heading">Terms</h3>
      <button type="button" class="button button--plain button--icon button--sm" commandfor="terms-dialog" command="close">
        <span class="sr-only">Close</span>
        <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Close"/></svg>
      </button>
    </header>
    <div class="card__body">
      <p class="text">Rent falls due on the first of April. A plot left untended for a season goes back on the list.</p>
    </div>
  </article>
</dialog>

<button type="button" class="button" commandfor="rota-dialog" command="show-modal"><span>Rota</span></button>

<dialog id="rota-dialog" class="dialog" aria-labelledby="rota-title" closedby="any">
  <article class="card">
    <header class="card__header">
      <h3 id="rota-title" class="card__title heading">Rota</h3>
      <button type="button" class="button button--plain button--icon button--sm" commandfor="rota-dialog" command="close">
        <span class="sr-only">Close</span>
        <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Close"/></svg>
      </button>
    </header>
    <div class="card__body">
      <p class="text">Click the backdrop to close this one.</p>
    </div>
  </article>
</dialog>

<button type="button" class="button" commandfor="plan-dialog" command="show-modal"><span>Site plan</span></button>

<dialog id="plan-dialog" class="dialog" aria-labelledby="plan-title" closedby="any">
  <figure class="stack">
    <figcaption id="plan-title" class="small-heading">Site plan</figcaption>
    <img src="/examples/cover.svg" alt="Abstract artwork standing in for the plan of the plots" />
  </figure>
</dialog>
```
