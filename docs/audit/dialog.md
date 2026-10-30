# Dialog

Covers `.dialog`: the native `<dialog>` shell that holds a `.card`, opened as a modal, and its drawer form. The surfaces pass settled the shell (classes only, the card draws the surface, `--scrollable`, `--drawer`). This pass finishes it and adds a drawer from the start side.

Counts cover Storybook stories, the docs site and `docs/markup/` (together, "Library") and the blog templates. Behaviour was checked in headless Chrome against `packages/css/src/index.css`, at 1200px and 360px wide, in left-to-right and right-to-left text.

## The CSS

| File | Lines | What it does |
| :--- | ---: | :--- |
| `organisms/dialog.css` | 189 | A fixed, centred, inline-size container (`--font-sizing: cq`); hidden until `[open]`; fades and scales in and out with `@starting-style` and discrete transitions on `display` and `overlay`; a backdrop with colour and blur. The card inside is made strong, given the dialog's radius and shadow, and fills the dialog. A dialog without a card draws a card's surface itself. A lone button in a `form[method="dialog"]` becomes subtle and small. `--scrollable` scrolls the whole card. `--drawer` is a full-height panel on the inline end, sliding in from that side. Reduced motion drops the movement; more contrast drops the blur. |

Tier 3 `dialog.*`: 10 tokens (transition, timing function, shadow, padding, radius, max height, backdrop colour and filter, width, drawer width).

## Usage

| Pattern | Library | Blog |
| :--- | ---: | ---: |
| `<dialog>` | 39 | 3 |
| `.dialog--drawer` / `--scrollable` | 23 / 13 | 1 / 1 |
| Opened with `command="show-modal"` / `showModal()` in a script | 21 / 15 | 2 / 2 |
| Closed with `form method="dialog"` | 31 | 4 |
| `aria-haspopup="dialog"` on the opener | 23 | 3 |
| `role="alertdialog"`, `closedby`, `autofocus` | 0, 0, 4 | 0 |
| Inline styles in the dialog stories | 9 | – |

Drawers appear in the docs site (the navigation on narrow screens), the sidebar stories and three recipes. The docs navigation sits on the start side of the page but its drawer opens from the end.

## Measurements and checks

- **The lone-button rule catches the wrong button.** `form[method="dialog"]:has(.button:only-child)` is meant for a close button in the header. A footer whose form holds one action (an "Accept" or "Done") matches too: the probe's strong accent "Accept" rendered at the small size (32px tall, 13px text). Guessing the job from the markup is fragile, and it restyles an atom from outside.
- **The page scrolls behind the modal.** With a dialog open, the page under the backdrop still scrolled (probe: `scrollY` 500). `overscroll-behavior: contain` only stops scroll chaining from inside the dialog.
- **Motion is slow.** The transition is `--duration-md`, 0.5s, in and out. Dialogs usually take 150–250ms; half a second delays every confirmation.
- **The drawer can't fill a phone.** The browser caps a modal dialog at `100% - 2em - 6px`, so at 360px the drawer is 322px wide, with a 38px strip of page beside it that no rule chose.
- **Drawer side.** The drawer only opens from the inline end. Navigation drawers open from the start, where the navigation lives on a wide screen (the docs site gets this wrong today).
- **Closing.**
  - The header close button is a submit button in a `form method="dialog"`. That works everywhere, but the library already opens dialogs with invoker commands (`command="show-modal"`), which can also close one (`command="close"`, `command="request-close"`).
  - Nothing documents light dismiss (`closedby="any"`: clicking the backdrop closes it), `returnValue`, or that Escape is native.
- **Semantics not documented:**
  - `role="alertdialog"` for a confirmation that interrupts;
  - `autofocus` for the element that should take focus first (the probe's first focus was the close button, which is right for most dialogs and wrong for a form);
  - `aria-describedby` for the message;
  - that `aria-modal` isn't needed with `showModal()`;
  - that a non-modal panel is a popover, not `.dialog` opened with `show()`.
- **Tokens:**
  - `dialog.padding` is never read. The CSS reads `--dialog-cushion` (the space kept between the dialog and the screen edge), which isn't a token.
  - `dialog.max-height` and the CSS both subtract the cushion, in different ways.
- **Size:** one width (`--dialog-width`, 36rem). Products need a narrow confirmation and a wide editor. PRINCIPLES gives containers no size modifier.
- **Stories:**
  - 6 stories with 9 inline styles;
  - no open-state story, so axe never checks a dialog's contents;
  - no right-to-left story, and no start-side drawer.

## Problems found

1. A heuristic that shrinks the wrong button.
2. The page scrolls behind a modal.
3. Slow motion.
4. Drawers only from the end, and capped short of the screen edge on phones.
5. Closing, focus and alert semantics undocumented; the close button uses a form where an invoker command would do.
6. A dead token, an undeclared hook, one width, stories that never show an open dialog.

## Where it ends

The dialog is a modal shell: placement, size, backdrop, motion and scroll lock. The card inside is the surface and lays out the content. Every button in it is an ordinary `.button` with its own classes. A drawer is the same shell pinned to an edge.

## Questions

1. **Dialog stays an organism**, a shell around a card, modal only. A non-modal floating panel is a `.popover`. *Recommended: yes.*

2. **No guessing at buttons.**
   - Remove the lone-button rule.
   - The header close button is written as `.button.button--plain.button--icon` with a hidden label, and closes with `commandfor="{id}" command="close"`.
   - Footer actions stay in a `form method="dialog"`, so the dialog's `returnValue` says which was chosen.
   - Remove `--dialog-close-button-prominence` / `-size`.

   *Recommended: yes.*

3. **Scroll lock.** While a `.dialog` is open as a modal, `:root` gets `overflow: hidden` with `scrollbar-gutter: stable`, so the page neither scrolls nor shifts sideways. CSS only, through `:root:has(.dialog:modal)`. *Recommended: yes.*

4. **Motion.**
   - `dialog.transition` moves to `{duration.sm}` (0.2s). The drawer keeps the same duration.
   - Exit mirrors entry. Reduced motion keeps the fade and drops the movement (as now).

   *Recommended: yes.*

5. **Drawers.**
   - `.dialog--drawer` opens from the inline end (as now). `.dialog--start` with it opens from the inline start, for navigation. The names match the popover's `--start` / `--end`.
   - Both follow the text direction.
   - On a narrow screen a drawer leaves a strip the target size wide (3rem) beside it, rather than the browser's arbitrary 38px, so the page stays in view and the backdrop can be tapped when light dismiss is on.
   - No bottom sheet in v1.
   - Migrate the docs site navigation to `--start`.

   *Recommended: yes.*

6. **Size.** One width token, `--dialog-width` (36rem). A product or a single dialog sets it (`style="--dialog-width: 28rem"` or a product class). There are no size modifiers, following PRINCIPLES. The drawer has `--dialog-drawer-width`. *Recommended: yes.*

7. **Closing and focus, documented.**
   - Escape closes (native).
   - `closedby="any"` adds light dismiss where supported (Chrome and Firefox; Safari ignores it and keeps Escape and the buttons). Don't use it on a dialog holding unsaved input.
   - `autofocus` on the element that should take focus first: the first field in a form dialog, the safest action in a destructive confirmation. Otherwise the first focusable element takes focus.
   - Focus returns to the opener on close (native).

   *Recommended: yes.*

8. **Semantics, documented.**
   - `aria-labelledby` on the title, always;
   - `aria-describedby` on the message in a confirmation;
   - `role="alertdialog"` for one that interrupts to ask for a decision;
   - no `aria-modal` (implied by `showModal()`);
   - `aria-haspopup="dialog"` on the opener stays optional.

   *Recommended: yes.*

9. **Tokens.** `dialog.*` becomes: `width`, `drawer-width`, `cushion` (replaces the unread `padding`), `max-height` (`100dvb` less two cushions, read once), `radius`, `shadow`, `backdrop-color`, `backdrop-filter`, `transition`, `timefunc`. *Recommended: yes.*

10. **A dialog without a card** keeps drawing a card's surface, as a fallback for content that isn't a card (a single image, a video). *Recommended: yes.*

11. **Stories, docs and the blog.**
    - Rewrite the stories without inline styles:
      - a playground;
      - a confirmation (`alertdialog`, focus on the safe action);
      - a form dialog (`autofocus`, `returnValue`);
      - a scrolling body;
      - whole-card scroll;
      - drawers from the end and the start;
      - right to left;
      - light dismiss;
      - without a card.
    - Stories that open the dialog on load, so axe checks the contents.
    - Migrate the close buttons and lone-button footers in the recipes, the sidebar stories, the docs site (`Sidebar.astro`, `CommandPalette.astro`) and the markup docs (`02`, `32`, `34`).
    - Rewrite `docs/markup/02-modal-dialog.md`.
    - Blog: `_dialog.scss`, `_tier3.scss`, the overview's examples.

    *Recommended: yes.*

## Migration done

All eleven recommendations were approved and are in place.

- **CSS** (`organisms/dialog.css`):
  - The lone-button rule is gone.
  - `:root:has(.dialog:modal)` locks the page's scroll and keeps its scrollbar gutter.
  - The UA's `max-inline-size` cap is overridden: a centred dialog is `min(--dialog-width, 100dvi − 2 cushions)`, and a drawer is `min(--dialog-drawer-width, 100dvi − 3rem)`.
  - `.dialog--drawer.dialog--start` opens from the inline start. The slide offset is `translateX(100% × side × direction)`, so both sides follow `:dir(rtl)`.
  - The closed transform is one private variable that reduced motion sets to `none`.
- **Tokens:** `dialog.cushion` replaces the unread `padding`; `max-height` is `100dvb` less two cushions; `transition` is `{duration.sm}`.
- **Close buttons:** 11 header close forms became `.button.button--plain.button--icon` with `commandfor` and `command="close"`, across:
  - the recipes (app header, Tally Sprout, Cadence, command palette);
  - the sidebar story and `§34`;
  - the docs navigation and command palette;
  - `§32`;
  - the blog overview.

  Footer Cancel buttons that carried a close command inside a `form method="dialog"` now submit `value="cancel"`. The blog overview's footer submit buttons lost the `onclick="….close()"` that ran before the form and emptied `returnValue`.
- **Drawers:** the docs navigation and the sidebar story's navigation moved to `--start`; settings and equipment drawers stay at the end.
- **Stories:** rewritten with 11 stories:
  - Playground;
  - Confirmation (`alertdialog`, `autofocus` on the safe action, a narrowed `--dialog-width`);
  - Form dialog (the card is the form; Cancel is a close command so Enter saves; `returnValue` shown);
  - Scrolling body;
  - Whole card scrolls;
  - Drawer end and Drawer start;
  - Right to left;
  - Light dismiss;
  - Without a card.

  Each opens its dialog in a `play` function, so axe checks the contents on the canvas. The only inline style is the width token.
- **Docs:** `§2` rewritten; AGENTS legacy row; HANDOVER row Done, and the Cadence submenu note points at `--start`.
- **Blog:** `_dialog.scss` synced; `_tier3.scss` gains `--dialog-cushion`, takes `--duration-sm` and `dvb`; the overview's dialogs migrated.
