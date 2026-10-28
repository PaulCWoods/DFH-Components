# Skeleton: usage inventory

Covers the skeleton atom (`atoms/skeleton.css`, 363 lines): the shapes, the companion modifier on other atoms, the animation modes and the accessibility rules.

Counts are class attributes in Storybook stories, the docs site, AGENTS.md and the blog templates. Skeletons appear in the Skeleton stories, four recipes (command palette, tally sprout, cadence dashboard, filter sidebar) and the blog overview page. The docs site doesn't use them.

## The CSS

| Section | What |
| :--- | :--- |
| Base `.skeleton` | Muted fill and a white shimmer sweep. Hides its text and children with `!important`. `pointer-events: none` with `cursor: wait`. |
| Shapes | `--inline` (and any bare `span.skeleton`), `--text`, `--heading` / `--title`, `--avatar` / `--circle` / `--round`, `--button`, `--input`, `--badge` / `--chip`, `--media` / `--rect` |
| Widths | `--w-25`, `--w-33`, `--w-40`, `--w-50`, `--w-60`, `--w-66`, `--w-75`, `--w-90`, plus `--sm`, `--md`, `--lg` as aliases |
| Companions | `.avatar.skeleton`, `.button.skeleton`, `.input` / `.textarea` / `.select.skeleton`, `.badge` / `.chip` / `.status` / `.kbd.skeleton`, `.card.skeleton` / `.card--skeleton` |
| Animation | Shimmer (default), `--pulse`, `--static`; container flag `--skeleton-animation: pulse \| static` |
| Media queries | Reduced motion (no animation, opacity 0.85), forced colours (Canvas fill, ButtonBorder outline), increased contrast (a border) |
| Tokens | Tier 3 `skeleton.bg` (`surface.muted`), `shimmer` (white mixes, Tier 1 `color.white`), `radius`, `radius-round`, `duration` (1.6s) |

## Usage

| Class | Stories | Docs | AGENTS | Blog |
| :--- | ---: | ---: | ---: | ---: |
| `.skeleton` | 144 | 0 | 18 | 16 |
| `--text` | 55 | 0 | 5 | 6 |
| `--heading` | 22 | 0 | 2 | 2 |
| `--badge` | 24 | 0 | 2 | 1 |
| `--button` | 11 | 0 | 2 | 1 |
| `--avatar` | 10 | 0 | 2 | 1 |
| `--media` | 6 | 0 | 2 | 1 |
| `--input` | 1 | 0 | 0 | 1 |
| `--circle` | 1 | 0 | 0 | 0 |
| `--w-50`, `--w-75` | 17, 14 | 0 | 0, 3 | 0, 3 |
| `--w-25/33/40/60/66/90` | few | 0 | 1 (`--w-40`) | few |
| `--pulse`, `--static` | 4 each | 0 | 0 | 0 |
| `--skeleton-animation: pulse` | 2 | 0 | 0 | 0 |
| Companions: avatar, button, input, status, badge, card | 6, 6, 2, 3, 1, 1 | 0 | 1 each (avatar, button, status) | 0 |
| **Unused** | `--title`, `--inline`, `--round`, `--chip`, `--rect`, `--sm`, `--md`, `--lg`, `.card--skeleton` | | | |
| `aria-busy="true"` on a region | 13 | | | |
| A text announcement of loading (`role="status"` or visually hidden text) | **0** | | | |

## Measurements

Fill contrast against what it sits on (320px container):

| Case | Light | Dark |
| :--- | ---: | ---: |
| Shape on the page | **1.17** | 1.30 |
| Shape on a card | 1.27 | 1.62 |
| `.avatar.skeleton` | **1.09** | 1.25 |
| Reduced motion (opacity 0.85) | lower still | |
| Increased contrast | 1.27 (no border shows) | |

Shapes:

| Shape | Size | Radius |
| :--- | :--- | :--- |
| `--text` | 100% × 14px, 5.6px margins (25px a line, against a 24px `.text` line) | 2px |
| `--heading` | 80% × 22px, 7px margins | 2px |
| `--avatar` | 48 × 48 | round |
| `--button` | 128 × 48 | 4px |
| `--input` | 100% × 48 | 4px |
| `--badge` | 72 × 24 | round |
| `--media` | 100% at 16:9 | 4px |

Companions, against the atom without `.skeleton`:

| Companion | Result |
| :--- | :--- |
| `.button.skeleton` | **320 × 48, full width; radius 2px**: the button's size and corners are lost. Opacity 0.5 from `disabled`. |
| `.status.skeleton` | **54 × 35, block**: taller than the status (24px) and no longer a pill. |
| `.input.skeleton` | Radius 2px instead of the input's. |
| `.avatar.skeleton` | Keeps its shape; fill 1.09:1. |

## Problems found

1. **Companions break the shape they are meant to keep.** The base `.skeleton` sets `display: block`, `inline-size: 100%` and its own radius. The companion rules then only recolour. A skeleton button fills the row, a status grows to 35px and loses its pill, and every companion takes a 2px corner. That is layout shift, the one thing a skeleton exists to prevent.
2. **`.card.skeleton` hides the card.** The base rule hides every child and fills the card, so a "loading card" is one grey block. The card stories don't use it that way: they put shapes inside an `aria-busy` card, which works.
3. **Barely visible.** The fill is 1.17:1 on the page in light mode (1.09 for avatars). Reduced motion lowers it with `opacity: 0.85`. A skeleton is decorative and hidden from assistive technology, so 1.4.11 doesn't strictly apply, but at this level many people with low vision see an empty page, not a loading one. Because the fill is `surface-muted`, it also depends on what it sits on (1.27 on a card).
4. **Loading is never announced.** Thirteen regions carry `aria-busy="true"` and every shape is `aria-hidden`, but nothing says "Loading". `aria-busy` tells assistive technology to wait, not that the page is loading; a screen reader user hears an empty region. No story or example has a status message.
5. **Increased contrast does nothing.** It adds a border, but the base rule's `border-color: transparent !important` hides it. If it did show, it would add 2px and shift the layout.
6. **Synonyms.** `--title` = `--heading`; `--circle` and `--round` = `--avatar`; `--chip` = `--badge`; `--rect` = `--media`; `--sm`, `--md`, `--lg` = `--w-25`, `--w-50`, `--w-75`; `.card--skeleton` = `.card.skeleton`. None of the aliases is used.
7. **Eleven width classes.** Eight percentages and three aliases for one property. A paragraph skeleton only needs a few lengths; any other width is one custom property.
8. **Token rules broken.**
   - Tier 1 in component CSS: `--color-white`, `--spacing-40`, `--spacing-24`, `--radius-full`.
   - Hex and literal fallbacks: `#ffffff`, `9999px`, `0.25rem`, `0.375rem`, `2.5rem`, `3rem`, `8rem`, `4.5rem`, `1.6s`.
   - The Tier 3 shimmer token references Tier 1 `color.white`.
9. **`!important` everywhere** (24), and `[class*="skeleton--"]` attribute selectors in the media queries and the bare-span rule. Class-substring matching is fragile and slow.
10. **Dead declarations.** `cursor: wait` does nothing under `pointer-events: none`. The companion rules repeat `pointer-events`, `cursor` and `color`.
11. **Three animation modes for one job.** Shimmer, pulse and static, each with a class and a container flag, plus reduced motion. The flag `--skeleton-animation` isn't a PRINCIPLES axis.

What already works:
- `aria-hidden="true"` on every shape in the examples, and `aria-busy` on the region;
- reduced motion stops the animation;
- forced colours draws an outline in a system colour;
- `--avatar` follows `--avatar-size`, `--button` follows `--button-min-size`.

## Questions

1. **Shapes.** Keep `--text`, `--heading`, `--avatar`, `--button`, `--input`, `--badge` and `--media`; remove the synonyms (`--title`, `--circle`, `--round`, `--chip`, `--rect`, `--inline`, `.card--skeleton`) and the bare-`span` rule. A bare `.skeleton` is a block that takes its size from the element or from `--skeleton-width` and `--skeleton-height`. *Recommended: yes.*
2. **Text lines size from the text atom.** `--text` and `--heading` are one line box high (`1lh`) with the bar drawn at cap height in the middle, so a skeleton inside `.text`, `.heading` or any other atom is exactly one of its lines, in every sizing mode, with no margins to guess:
   ```html
   <h3 class="small-heading"><span class="skeleton skeleton--heading"></span></h3>
   <p class="text"><span class="skeleton skeleton--text"></span></p>
   ```
   `--heading` and `--text` then differ only in default width (60% and 100%). *Recommended: yes.* The alternative keeps fixed em heights and margins.
3. **Widths.** Replace the eleven width classes with `--skeleton-width` (any length) and keep three classes for paragraph rhythm: `--w-50`, `--w-75`, `--w-90`. Or keep all eight percentages. *Recommended: three plus the property.* In the stories, `--w-25/33/40/60/66` (13 uses) become the nearest of the three or an inline `--skeleton-width`.
4. **Companions.** On another atom, `.skeleton` keeps that atom's box (display, size, radius, padding) and only replaces the paint: fill, hidden content, no border colour, no pointer events. It no longer sets `display`, size or radius there, so a skeleton button is the same size as the button. `.card.skeleton` goes; a loading card is a card with `aria-busy` and shapes inside. *Recommended: yes.*
5. **Fill.** Make the fill a mix of the text colour (`--skeleton-color`, about 12%) instead of `surface-muted`, so it shows the same on the page, a card or a band, and lands near 1.5:1 in both schemes. Increased contrast raises the mix (about 25%) instead of adding a border. *Recommended: yes.*
6. **Animation.** Keep shimmer (default) and pulse as the two motions, and drop `--static` as a class: reduced motion already makes every skeleton static, and a product that wants no motion sets the flag. Rename the flag to `--skeleton-motion: shimmer | pulse | none`. Reduced motion stops the animation without lowering the opacity. *Recommended: yes.* The alternative keeps the three classes.
7. **Announcing.** Require a status message with every loading region and show it in every example:
   ```html
   <section aria-busy="true" aria-labelledby="feed-title">
     <p class="visually-hidden" role="status">Loading activity…</p>
     …shapes with aria-hidden="true"…
   </section>
   ```
   When loading finishes, set `aria-busy="false"` and change the status text ("Activity loaded") or remove it. *Recommended: yes.*

### Fixes that need no decision

- Tier 3 `skeleton` tokens: `color` (the mix), `shimmer` built from a Tier 2 colour, `radius`, `radius-round`, `duration`. No Tier 1, hex or literal fallbacks in the CSS; sizes come from the atom tokens (`--avatar-size`, `--button-min-size`, `--input-min-size`, `--status-*`).
- Remove every `!important` and `[class*=]` selector; companions win by being in the skeleton rule, which loads after the atoms.
- Remove the dead `cursor: wait`.
- Forced colours: draw the shape so it still shows. (Done as a `GrayText` fill: an outline would be clipped on text lines.)
- Stories: rebuild around shapes, text in atoms, companions, motion and the loading pattern; announce loading in the recipe skeletons.
- AGENTS §26 and the blog overview: new markup.
- Blog: port.

## Migration done

Decisions: text lines size from the text atom they sit in; three width classes plus `--skeleton-width`; the fill mixes the text colour; shimmer and pulse, with `--skeleton-motion`. The recommended answers to the other questions also went in: synonyms removed, companions keep their atom's box, and every loading region announces itself.

### Changes

- **`atoms/skeleton.css`** rewritten (363 → 221 lines, no `!important`, no `[class*=]`):
  - **Paint** applies to every skeleton: fill, shimmer, hidden content, transparent border, no pointer events.
  - **Box** applies only when `.skeleton` isn't on another atom, so companions keep their own display, size, padding and radius. The avatar, which loads later, is recoloured through `--avatar-bg` and `--avatar-border-color`.
  - `--text` and `--heading` are `1lh` high and clipped to a cap-height band with `clip-path: inset(… round …)`.
  - `--avatar` follows `--avatar-size`, `--button` follows `--button-min-size` and `--button-radius`, `--input` follows `--input-min-size` and `--input-radius`, and `--badge` is a status pill's height (cap height plus `--status-padding-block`).
  - `--skeleton-width` and `--skeleton-height` are registered with `inherits: false`, so they apply per element.
  - Motion: shimmer, `--pulse`, `--skeleton-motion: pulse | none`. Reduced motion stops it at full strength; increased contrast uses `--skeleton-color-strong`; forced colours fill in `GrayText`.
- **Removed:** `--title`, `--circle`, `--round`, `--chip`, `--rect`, `--inline`, `--static`, `--sm`, `--md`, `--lg`, `--w-25`, `--w-33`, `--w-40`, `--w-60`, `--w-66`, `.card.skeleton`, `.card--skeleton`, `--skeleton-animation`, `--skeleton-bg`, the bare-`span` rule and every Tier 1, hex and literal fallback.
- **Tokens:** Tier 3 `skeleton.color` (`{foreground}` at 20%), `color-strong` (35%), `shimmer` (`{surface}` at 60%), `radius`, `radius-round`, `duration`.
- **Compiler:** the inverted-palette block now also inverts composite values (such as `color-mix()`) whose references all have an inverted counterpart. Only the skeleton tokens changed.
- **Markup migrated:**
  - inline `inline-size` and `block-size` on skeletons became `--skeleton-width` and `--skeleton-height`;
  - `--text` lines that set their own height became bare `.skeleton` blocks;
  - the removed widths became `--skeleton-width` percentages.
- **Loading announced:** `role="status"` messages added to the command palette, cadence dashboard, filter sidebar and Tally Sprout loading states; the cadence skeletons gained `aria-hidden`.
- **Heading placeholders** use the atom class on a `div` (`<div class="small-heading">`), because an `h3` holding only a hidden skeleton is an empty heading.
- **AGENTS:** §26 rewritten; legacy row added.
- **Stories:** Skeleton rebuilt as Playground, Shapes, TextInAtoms, Companions, Motion and LoadingCard. Old IDs (`--default`, `--shape-variants`, `--card-composite-skeleton`, `--companion-modifier`, `--animation-modes`, `--container-style-query`) are gone.
- **Blog:**
  - `_skeleton.scss` regenerated;
  - Tier 3 tokens and both inverted blocks updated;
  - the overview's skeleton section rewritten (text in atoms, shapes beside real companions, a loading card with a status message).

### Measurements after

Fill contrast against what it sits on:

| Case | Light | Dark |
| :--- | ---: | ---: |
| Shape on the page | 1.36 | 1.85 |
| Shape on a card | 1.37 | 1.82 |
| Increased contrast | 1.92 | |
| Reduced motion | 1.36 (no opacity drop) | |

Size against the real thing:

| Case | Skeleton | Real |
| :--- | :--- | :--- |
| A `.text` line | 320 × 26 | 320 × 26 |
| A `.heading` line | 26 high | 26 |
| `.button.skeleton` | 91 × 48, 4px radius | 91 × 48, 4px |
| `.status.skeleton` | 60 × 28 | 60 × 28 |
| `.input.skeleton` | 223 × 48, 4px radius | 223 × 48, 4px |
| Blog `.text` / `.subheading` line | 30 / 39 high | 30 / 39 |

### Checks

- Axe: the Skeleton stories are clean, light and dark.
- Two failures in the recipe loading states are older: the command palette combobox misses `aria-expanded`, and the Tally Sprout loading table has empty header cells. Both are logged in HANDOVER.
- The docs site builds and the blog compiles.
