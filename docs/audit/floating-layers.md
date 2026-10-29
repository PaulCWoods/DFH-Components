# Floating layers: popover and tooltip

Covers the two components that float content over the page in the top layer:
- the popover molecule (`.popover`), which positions a card or a menu next to the control that opens it;
- the tooltip (`.tooltip`), a short line of text shown while a control has the pointer over it or has focus.

Both use the native `popover` attribute and CSS anchor positioning. The question for this pass is where each stops: what the layer owns (placement, entry and exit, the arrow, how it reaches the top layer) and what it leaves to its content.

Counts cover Storybook stories, the docs site, `docs/markup/` (together, "Library") and the blog templates. Behaviour was tested in headless Chrome 156 with the library CSS; the results are under "Tested in Chrome".

## The CSS

| File | Lines | Selectors |
| :--- | ---: | :--- |
| `molecules/popover.css` | 241 | `.popover`, `[popover].popover`, and every `[popover]` that isn't a tooltip, toast stack or hint; sizes `--lg`, `--xl`, `--full`, `--full-width`, `--full-height`; placements `--anchored`, `--top`, `--start`/`--left`, `--end`/`--right`, `--bottom-end`/`--bottom-left`; `[popover][data-anchor]` |
| `molecules/tooltip.css` | 382 | `.tooltip`, `[popover].tooltip`, every `[popover="hint"]`; placements `--bottom`, `--start`/`--left`, `--end`/`--right`; `--no-arrow`; `.has-tooltip` (CSS-only hover pattern) |

Tier 3: `popover.*` (8 tokens), `tooltip.*` (13). The CSS also reads 13 popover names and 11 tooltip names that have no tokens (`--popover-font-*`, `--popover-lg-max-width`, `--popover-max-size`, `--tooltip-min-width`, `--tooltip-z-index`, and others).

## Usage

| Pattern | Library | Blog |
| :--- | ---: | ---: |
| `.popover` | 35 | 3 |
| `.popover--anchored` | 27 | 3 |
| `.popover--lg`, `--xl` | 10, 4 | 1, 0 |
| `.popover--top`, `--end`, `--bottom-end` | 4, 3, 4 | 0 |
| `.popover--start`, `--left`, `--right`, `--bottom-left`, `--full*` | 0 | 0 |
| Content of a popover: card, menu, banner, bare text | 15, 11, 2, 1 | |
| `popover="hint"` (tooltips) | 27 | 5 |
| `.tooltip--bottom`, `--left`, `--right`, `--no-arrow`, `--anchored` | 5, 3, 3, 4, 1 | 1, 1, 1, 0, 0 |
| `.has-tooltip` | 2 | 0 |
| Inline `anchor-name: --…` / `position-anchor: --…` | 47 / 53 | 9 / 9 |
| Tooltip invokers with both `interestfor` and `popovertarget` | 17 | 5 |
| `aria-haspopup="dialog"` outside the dialog stories | 18 | 4 |
| Static previews that undo the closed state inline (`position: static; opacity: 1; …`) | 13 | 0 |

Of the inline anchor names, 6 are on the combobox listbox, which is opened by script; that belongs to the combobox pass.

## Tested in Chrome

| Test | Result |
| :--- | :--- |
| Popover opened by `popovertarget` with no `anchor-name` or `position-anchor` | Anchored under its button. The invoker is the implicit anchor, so the 100+ inline anchor styles do nothing. |
| `.popover` without `--anchored` | Opens at the top-left corner of the viewport (0, 0). The base rule removes the UA centring and puts nothing in its place. |
| Tooltip on hover (`interestfor`) | Opens after the interest delay. |
| Tooltip on keyboard focus (Tab) | Opens. Escape closes it. |
| Clicking a tooltip's button when it also has `popovertarget` | Closes the tooltip it just showed. The button is also exposed as a collapsed/expanded toggle (`expanded: false`) for a tooltip. |
| Pointer moved from the button onto the tooltip | The tooltip closes: `pointer-events: none` means the pointer is never over it. With `pointer-events: auto` it stays open. WCAG 1.4.13 requires that it stays. |
| Accessible description from `interestfor` | While a plain-text hint is open, Chrome gives the button that text as its description. Closed, or with rich content, there is none. |
| Icon button whose tooltip repeats its name | Announced "Bold, button, Bold". `aria-hidden="true"` on the tooltip removes the repeat. |
| Explicit `aria-describedby` to the tooltip | One description, open or closed. No duplicate in Chrome. |
| `interestfor` to a `popover` (auto) holding a card | Opens on hover, like a hovercard. |
| `interestfor` and `popovertarget` on a `<span>` (the "audit status" story) | Never opens. Both attributes only work on buttons and links. |
| Tooltip flipped at the top edge | Flips below; the arrow flips with it (`container-type: anchored`). |
| `dir="rtl"`, `.popover--anchored` | Extends to the right of its button, past it. In RTL it should line up with the button's right edge and extend left. |
| `dir="rtl"`, `.tooltip--start` | Opens on the left. Start is the right in RTL. |

Browser support: `interestfor` is Chromium only (Chrome and Edge 142+, Chrome for Android 150+). Firefox and Safari don't support it, and WebKit has objected to it for tooltips because touch screens have no reliable way to reach them. `popover="hint"` has the same reach. In those browsers no tooltip appears.

## Measurements

| | Light | Dark |
| :--- | ---: | ---: |
| Tooltip text on tooltip | 14.35 | 16.43 |
| Tooltip against the page | 13.17 | 13.17 |

The tooltip is 13.3px, weight 500, from Tier 1 `--typography-font-size--1`.

## Problems found

### Popover
- **It styles every popover on the page.** The selector includes `[popover]:not(.tooltip, .toast-stack, [popover="hint"])`, so any product popover (a combobox list, a third-party widget) gets the closed-state opacity, transform and pointer-events. The exclusion list grows every time a component uses `popover`.
- **Unanchored popovers land at 0, 0** (tested). The default should be anchored to the invoker; `--anchored` is a class for what every popover in the library already does.
- **Inline anchor names are noise** (tested): the invoker is the implicit anchor.
- **Physical placements.** `position-area: bottom span-right`, `left`, `right` are physical, so placements are wrong in RTL (tested). `--left`, `--right` and `--bottom-left` are aliases of logical names.
- **Dead fallback.** The `@supports not (position-area)` branch uses `anchor()`, which no browser supports without `position-area`. Without anchor positioning the popover should keep the UA's centred box.
- **Sizes on a container.** `--lg`, `--xl` and the three `--full*` modifiers set a width. Size belongs to atoms and controls (PRINCIPLES §2); a popover's width comes from its content. `--full*` has no uses.
- **Typography.** The no-card fallback sets font family, size and line height, which the composition law forbids. It also reads the Tier 1 `--typography-font-family-sans`, `--spacing-8` and `--spacing-16`.
- **Overflow.** `overflow: visible` with a `max-block-size`, so a tall card spills off the screen instead of scrolling.
- **Roles.** Popover invokers say `aria-haspopup="dialog"` (up to 18 in the library and 4 in the blog; a few of those open real dialogs), but the popover isn't a dialog (Chrome exposes it as a generic). `popovertarget` already exposes the expanded state and the relationship.
- **Content.** `:has(.card, .banner, .menu)` decides whether to draw a surface. A banner in a popover (2 uses) is a card's job: a banner is an in-flow message, and the floating banner is a toast.
- **Demo state in the library.** `.\:popover-open` is a class that fakes the open state, and stories still undo the closed state inline (13 times).

### Tooltip
- **`popovertarget` beside `interestfor`** (22 invokers) makes a click close the tooltip and announces the button as a toggle (tested).
- **Not hoverable** (tested): `pointer-events: none` fails WCAG 1.4.13.
- **Names repeated.** Icon buttons with a visually hidden name and a tooltip saying the same thing are read twice in Chrome (tested).
- **Rich tooltips.** Two stories put a card (with an avatar and a link) in a `popover="hint"`. Interactive content in a hint can't be reached by keyboard, since the hint closes when focus leaves the button. A card shown on hover is a popover opened with `interestfor` (tested: it works).
- **`.has-tooltip`** shows a tooltip with `:hover` and `:focus-within`. It isn't in the top layer (clipped by overflow), and Escape can't dismiss it (WCAG 1.4.13). It's the only pattern that works outside Chromium, which is the case for keeping it, but it fails the criterion it is meant to meet.
- **Roles.** `role="tooltip"` on the `.has-tooltip` examples (2), and `role="status"` on a `<span>` used as a tooltip's trigger.
- **Physical placements** (`left`, `right`; tested in RTL). `--left`/`--right` alias `--start`/`--end`. `--anchored` has no CSS.
- **Tokens.** 11 hex literals (`#1a1a1a`, `#ffffff`). Tier 1 reaches: `--spacing-4`, `--spacing-8`, `--typography-font-size--1`, `--typography-line-height--1`. `max-width` is a literal `18rem`. `z-index` and `position: relative` do nothing in the top layer. `--tooltip-min-width` is read but never applied. `--no-arrow` uses `!important`.
- **Arrow in RTL.** The arrow is centred with `inset-inline-start: 50%` and a physical `translate: -50%`, which puts it 3px off-centre in RTL.
- **Fallback branch.** The same dead `anchor()` branch as popover, here 50 lines.

## Where popover ends and tooltip begins

A **tooltip** is a short line of plain text about a control: its name or a description. It appears while the control is hovered or focused, has nothing in it to click, and is never the only place the information lives (PRINCIPLES §2: tooltips don't work on touch).

A **popover** holds anything else: a card or a menu, with controls in it. It opens on click (`popovertarget`), or on hover and focus (`interestfor`) as a hovercard. Either way it's reachable by keyboard and can be dismissed.

Both are positioned the same way, so they can share the placement rules.

## Questions

1. **Scope the popover to its class.** `.popover` styles only elements with the class. Bare `[popover]` keeps the UA styles, and the exclusions for tooltip, toast stack and hint go. *Recommended: yes.*

2. **Anchoring is the default.** A popover is anchored to its invoker with no class and no inline styles. Inline `anchor-name`/`position-anchor` are removed from all markup (about 90 library and 18 blog uses, leaving the combobox), except where a script opens the popover without an invoker (`showPopover({ source })` sets the anchor too). `--anchored` goes. Without anchor positioning, the popover keeps the UA's centred box. The dead `anchor()` branches go from both files. *Recommended: yes.*

3. **One placement vocabulary, logical, for both.** Placement is a position-area value, set by a class or a flag (`--popover-placement`, `--tooltip-placement`).

   | | Popover | Tooltip |
   | :--- | :--- | :--- |
   | Default | below, aligned to the start edge (`block-end span-inline-end`) | above, centred |
   | `--top` | above, start edge | (default) |
   | `--bottom` | (default) | below |
   | `--end-aligned` | below, aligned to the end edge (was `--bottom-end`) | |
   | `--start`, `--end` | beside, on that side | beside, on that side |

   `--left`, `--right`, `--bottom-left`, `--bottom-end` go. All flip when they don't fit. *Recommended: yes.*

4. **Popover width.** Choose one:
   - **(a)** Remove `--lg`, `--xl` and `--full*`. A popover is as wide as its content, at least as wide as its invoker (`anchor-size()`), and no wider than `--popover-max-width` (one token, 24rem, set by a product or a container where it needs more). The 14 `--lg`/`--xl` uses lose their modifier; the ones that need the width set the flag.
   - **(b)** Keep `--lg` and `--xl` as the one exception to "size is for atoms".

   *Recommended: (a).*

5. **What goes in a popover.** A card or a menu. The popover owns no surface, padding or type. Bare text in a popover goes in a card (1 use); the no-card fallback and its typography go. The 2 banners in popovers become cards. The popover passes its height limit on, so a tall card's `.card__body--scrollable` scrolls instead of spilling. *Recommended: yes.*

6. **Popover roles.** Drop `aria-haspopup="dialog"` from popover invokers; buttons that open a real `<dialog>` keep it. The popover takes no role. A popover holding a form or several controls under a title may take `role="dialog"` and `aria-labelledby` that title, and then its invoker says `aria-haspopup="dialog"`. Menus are settled in the action-sets pass. *Recommended: yes.*

7. **Tooltips: `interestfor` only.** `popovertarget` comes off every tooltip invoker (22). Tooltips stay a Chromium enhancement. The library ships no script; the markup file names the `interestfor` polyfill for products that want tooltips elsewhere. Because of this, a tooltip never holds the only copy of what it says. *Recommended: yes.*

8. **Tooltip semantics.** Two kinds, by what the text is:
   - **Label:** the tooltip repeats the control's accessible name (icon buttons). The name stays in the button (`.visually-hidden`), and the tooltip takes `aria-hidden="true"`.
   - **Description:** extra text. The invoker takes `aria-describedby` pointing at the tooltip, so the description is there in every browser, with or without the tooltip showing.

   No `role="tooltip"`. Tooltips go only on buttons and links; the status story's `<span>` trigger gets a button or loses its tooltip. *Recommended: yes.*

9. **Tooltips are plain text.** Rich content (cards, avatars, links) is a popover opened with `interestfor`: a hovercard. The 2 card tooltips become hovercards, and the `:has(.card, .banner)` rules leave tooltip. *Recommended: yes.*

10. **Hoverable and dismissible (WCAG 1.4.13).** The tooltip takes `pointer-events: auto`, so the pointer can move onto it, and Escape closes it (native). `.has-tooltip` goes, because it can't be dismissed and isn't in the top layer. *Recommended: yes.*

11. **Tooltip type and tokens.** The tooltip's text uses the small-text sizes (`--body-sm-*`), so it follows `--font-sizing` like any text atom. Hex literals and Tier 1 reaches go. `max-width` becomes a spacing token. `z-index`, `position: relative` and `--tooltip-min-width` go. `--no-arrow` stays, without `!important`, and the arrow is centred with logical properties. *Recommended: yes.*

12. **Shared base.** Popover and tooltip share the entry and exit transitions and the flip rules, but are positioned differently. Keep two files and match the patterns, rather than extracting a shared `floating` layer that only these two would use. The fake open-state class `.\:popover-open` goes; stories open real popovers. *Recommended: yes.*

All approved as recommended, with one correction during migration: `.\:popover-open` is the class the popover polyfill adds, not a demo-only state (question 12). Without it, a browser lacking `:popover-open` drops the whole open-state rule, so a popover opened through the polyfill would stay invisible. Both files keep it, paired with `:popover-open` in `:where()`.

## Migration done

### CSS and tokens
- **`molecules/popover.css`** (241 lines down to 184):
  - Styles `.popover` only. It draws no surface, padding or type, and holds a card or a menu.
  - Anchored to its invoker by default, with logical `self-` placements: default, `--top`, `--end-aligned`, `--start`, `--end`. The `--popover-placement` flag is declared before the classes.
  - Width is the content's: at least the invoker's (`anchor-size()`), at most `--popover-max-width`. A card inside drops its inline-size container, since a size container contributes no width of its own.
  - Fallbacks flip when the popover doesn't fit. Content taller than either side fills the preferred side through `@position-try --popover-fill`, and the card's scrollable body takes the rest.
  - Open, it is a flex column, so a tall card shrinks. Entry and exit use opacity and scale, with reduced motion handled.
  - Removed: the size modifiers, `--anchored`, the physical and alias placements, the no-card fallback and its typography, and the dead `anchor()` branch.
- **`molecules/tooltip.css`** (382 lines down to 266):
  - Styles `.tooltip` only. Plain text on the inverted surface, in the small-text step (follows `--font-sizing`).
  - Hoverable: the pointer can move onto it.
  - Logical `self-` placements: default (above), `--bottom`, `--start`, `--end`, and the `--tooltip-placement` flag. Each placement is one map of area, offset side, alignment and arrow position, including where the arrow goes when a fallback flips the tooltip.
  - `--no-arrow` without `!important`. In high contrast the tooltip gets a visible border and loses its arrow.
  - Removed: `.has-tooltip`, card and banner support, `--left`, `--right`, `--anchored`, the hex literals and Tier 1 reaches, `z-index`, and the dead `anchor()` branch.
- **`reset.css`:** `[popover]` gets back the UA's fixed, centred box (position, inset, margin, size, overflow), which `all: unset` had removed. Without anchor positioning a popover now opens centred, not at the top-left corner.
- **Tier 3:** `popover.*` is down to `max-width`, `offset`, `transition`, `timefunc`. `tooltip.*` drops `font-size` and `line-height`, and adds `arrow-size`; `max-width` is a spacing token.

### Found while testing
- **`position-area` keywords:** plain logical keywords (`block-end`, `span-inline-end`) resolve against the viewport's writing mode, so they were still wrong in right-to-left text. The `self-` forms resolve against the element's own.
- **Width:** a card is an inline-size container, so it contributes no width and the popover collapsed to its invoker's width. The popover turns that off for its card.
- **`@position-try` sizing:** a percentage `max-block-size` inside `@position-try` is ignored in Chrome 156, and the UA's `height: fit-content` blocks stretching. The fill fallback stretches with `inset-block: 0` and `block-size: auto` instead.
- **Accessible description:** the guidance in `modern-web-guidance` says not to add `aria-describedby`, because `interestfor` links the tooltip. In Chrome that link exists only while the tooltip is open, and other browsers have no `interestfor`. The explicit `aria-describedby` gave a single description in Chrome, with no repeat, so description tooltips keep it.

### Markup
- **Stories:** popover and tooltip stories are rewritten with real popovers and tooltips, with no static previews or inline anchors.
  - Popover: Playground (click or hover), Placements (left to right and right to left), Content (actions, and a form with `role="dialog"`), Hovercard, Width, Scrolling.
  - Tooltip: Playground, Label and description, Placements (including right to left, a flag and no arrow), In context.
- **By script:** menu, app-header and cadence lost their inline anchors, `--anchored` and `aria-haspopup="dialog"` on popover invokers, and `--bottom-end` became `--end-aligned`. `aria-haspopup="menu"` stays for the action-sets pass. Buttons that open real dialogs keep `aria-haspopup="dialog"`, and the combobox listbox keeps its anchor name.
- **Docs:** `03-popover.md` and `23-tooltip.md` are rewritten. The examples in `03b-menu.md`, `32-recipes.md` and the recipe-composition skill are migrated. Card's markup, its story and PRINCIPLES no longer say tooltips compose a card. PRINCIPLES records where tooltip ends and popover begins, and AGENTS records the removed names.
- **Blog:**
  - `_popover.scss` and `_tooltip.scss` are regenerated, `_reset.scss` gains the popover block, and the Tier 3 popover and tooltip tokens are rewritten. `--spacing-6` is added to Tier 1.
  - The Popover and Tooltips sections of `_component-library.twig` are rewritten (actions, a dialog-role form, a hovercard, label and description tooltips, placements). The menu demo lost its inline anchors.
  - Compiles.

### Checks
- **Chrome 156:**
  - Every popover and tooltip placement, a flag placement, and right to left. Popovers line up with the invoker's end edge in RTL, and `--start` opens on the right.
  - Flips at the top and bottom edges, with the arrow following.
  - A tall card fills the larger side without covering its button.
  - A bare `[popover]` opens centred.
- **Axe:**
  - The 10 popover and tooltip stories pass in light and dark, with every popover open. The scrolling story's body was made focusable and named, as card requires.
  - Menu and app-header stories, with their popovers open, show only the known menu-role and landmark findings (action-sets and header passes).
- **Screenshots:** actions, a dialog form, a hovercard, a scrolling card, label and description tooltips, and RTL tooltips, in light and dark.

### Left for later
- `aria-haspopup="menu"` and `role="menu"` belong to the action-sets pass.
- The anchor-positioning polyfill doesn't support `position-area` or implicit anchors. Without native anchor positioning a popover opens centred, which is the intended fallback.
