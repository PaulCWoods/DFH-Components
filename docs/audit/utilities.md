# Utilities

Covers `packages/css/src/utilities/`: single-purpose classes that set one property (or a tight group) on the element they sit on, plus the mode classes (appearance modes, colour scheme, palette, container type) and the responsive visibility helpers that live beside them. The utilities layer comes last before overrides, so a utility beats any component by layer.

Counts cover Storybook stories, the docs site, `docs/markup/` and AGENTS (together, "Library") and the blog templates. Names were read from the CSS by script; usage counts class tokens in markup.

## The CSS

| File | Lines | Names | Declarations | Names used |
| :--- | ---: | ---: | ---: | ---: |
| `responsive-helpers.css` | 2,886 | 1,053 | 374 | 24 |
| `spacing.css` | 859 | 641 | 206 | 66 |
| `spacing-blocks.css` | 298 | 58 | 47 | 20 |
| `border.css` | 293 | 171 | 57 | 25 |
| `accessibility.css` | 275 | 91 | 15 | 4 |
| `typography.css` | 264 | 121 | 54 | 22 |
| `color.css` | 210 | 89 | 41 | 42 |
| `layout-helpers.css` | 190 | 57 | 37 | 16 |
| `flex.css` | 161 | 75 | 35 | 22 |
| `color-palette.css` | 151 | 2 | 1 | 1 |
| `appearance-modes.css` | 104 | 17 | 16 | 9 |
| `focus-helpers.css` | 92 | 14 | 3 | 6 |
| `shadow.css` | 83 | 25 | 14 | 14 |
| `scroll-fade.css` | 73 | 1 | 1 | 0 (components build it in) |
| `container.css`, `display.css`, `color-scheme.css` | 60 | 28 | 11 | 5 |
| **Total** | **5,999** | **2,443** | **~910** | **276** |

The utilities are 6,000 of the library's CSS lines; the responsive helpers alone are 2,886. There is no markup doc for utilities except §31 (responsive visibility), and no docs-site page.

## Usage

| Pattern | Library | Blog |
| :--- | ---: | ---: |
| Utility classes in markup | ~3,000 | 638 in the overview, 16 in the site's own templates |
| Most used | `text-muted` 375, `align-items-center` 339, `font-size-xs` 183, `visually-hidden` 216, `gap-sm` 163, `padding` 152, `gap-xs` 139, `font-weight-bold` 120 | – |
| `align-items-center` on an `.inline` or `.cluster` (which already centre) | 276 | – |
| `justify-content-between` on an `.inline` (now `.inline--between`) | 87 | – |
| `font-size-*` with no text atom on the element | 337 (290 in the utility stories, the rest in recipes) | – |
| `font-weight-bold` / `font-bold` with no text atom | 118 | – |
| Inline styles in the 10 utility stories | 226 | – |

The blog's own templates use almost none of the utilities (16 classes); the blog pays for all of them in `dfh-shared.css` (558 KB).

## Measurements and checks

- **Names per declaration.** PRINCIPLES allows two (verbose and Tailwind's shorthand). The utilities average close to three, and many have more:
  - spacing: `.margin`, `.margin-md`, `.mg`, `.mg-md`, `.m-md` (five names for one margin); `.margin-block-start`, `-md`, `.margin-top`, `-md`, `.mt`, `.mt-md` (six);
  - typography: `.font-family-mono`, `.font-family-monospace`, `.font-mono`, `.mono`; `.font-size-xs`, `.font-size--2`, `.fs-xs`; `.font-weight-700`, `.fw-700`, `.font-weight-bold`, `.font-bold`, `.bold`;
  - visibility: up to eight names per condition (`md:hide`, `md:hidden`, `min-md:hide`, `min-md:hidden`, `hide--md`, `hide--above-md`, `max-md:show`, `md-max:show`);
  - containers: `.container-type-inline-size`, `.container-inline`, `.cq`, `.cq-inline`.
- **Bare single words** that PRINCIPLES forbids: 70 of them, including `.bold`, `.mono`, `.pre`, `.sr`, `.bg`, `.cq`, `.mg`, `.pd`, `.bd`, `.rd`, `.round`, `.squared`, `.regular`, `.roman`, `.sans`, `.serif`, `.nowrap`, `.backdrop`. `.block` is defined twice, as `display: block` and as a block size in `spacing-blocks.css`; `.hide` and `.hidden` are defined in both `display.css` and `responsive-helpers.css`.
- **Physical names on logical properties.** `.margin-left`, `.ml`, `.border-left`, `.bl`, `.rounded-l`, `.text-left` and their right-hand twins set the *start* (or end) side. In right-to-left text `.ml` sets the right margin, so the name lies, and it differs from Tailwind, where `ml` is the left margin.
- **Tailwind names with another meaning:**
  - `.text-nowrap` sets `white-space` (Tailwind: `text-wrap`);
  - `.p-md`, `.m-md`, `.gap-sm` use the library's step names; Tailwind uses numbers;
  - `lg:` is 60em here and 64rem in Tailwind.
- **Utilities that do a component's job:**
  - `font-size-*` and `line-height-*` set a size with no line height, outside the text atoms, so they ignore `--font-sizing` (fluid, cq, compact).
  - `width-dialog`, `width-popover`, `width-sidebar`, `width-prose`, `width-shell` restate component widths.
  - `.backdrop` is a fixed overlay with a literal `rgba()` fallback and its own z-index; `<dialog>` has `::backdrop`.
  - `align-items-center` and `justify-content-between` restate what the layout primitives now do.
- **Tokens:**
  - Spacing utilities read Tier 1 directly (127 references to `--spacing-2` … `--spacing-128`), with their own step map (`2xs` 2px, `xs` 4px, `sm` 8px, `md` 16px, `lg` 32px, `xl` 48px, `2xl` 64px, `3xl` 128px). Designers have no named step to match them in Figma.
  - The shadow colour utilities read Tier 1 palette colours (`shadow-aqua`, `-amber`, `-teal`, `-green`, `-red`).
  - Two literal fallbacks: `rgb(55, 13, 13)` and `rgba(0, 0, 0, 0.45)`.
- **Numeric scales beside role scales:** `z-0` … `z-50` beside `z-sticky`, `z-popover` and the rest; `bg-effect-translucent-10` … `-90` beside `-subtle`, `-strong`; `font-weight-100` … `-900` beside the named weights.
- **Responsive helpers:**
  - 1,053 names, of which 24 are used.
  - Conditions: 7 viewport widths, 7 viewport heights, 7 container widths, each in both directions; the app shell's lock condition.
  - Actions: hide, show, hide labels, hide decorations, `sr-only`, `flex-auto`.
  - `show` restates `hide` with the opposite condition (`max-md:show` is `md:hide`).
- **Unused mode classes:** `ui-dense` (the legacy density flag), `spacing-mode-fixed`, `spacing-mode-cq`, `font-sizing-compact--on-desk`, `viewport-fit-cover`.
- **`!important`:** only in the focus helpers, to drop a nested ring inside a focus-within container. `.focus-none` drops the ring anywhere; all 10 uses are inside a `.focus-within` container, which already does that.
- **The `hidden` attribute:** the reset's `:where([hidden]) { display: none !important }` holds against a component's `display`, but it also hides `hidden="until-found"`, which must stay rendered for find-in-page.
- **Stories:** 226 inline styles; the axe failures noted in HANDOVER (two banners, heading order, a scroll area with nothing focusable, demo contrast).

## Problems found

1. Too many names: 2,443 for about 910 declarations, against a limit of two each; bare words; duplicate definitions.
2. Physical names that set logical properties, so they lie in right-to-left text.
3. Utilities that compete with the text atoms, the layout primitives and component sizing.
4. Spacing utilities on Tier 1 with a private step map, invisible to designers.
5. A responsive file of 2,886 lines in which 24 names are used.
6. Unused modes, `!important` that isn't needed, a `[hidden]` rule that breaks `until-found`, no docs, stories that fail axe.

## Where it ends

A utility sets one property to one value on the element it is on, from a token where one exists. It never restates a component: type size belongs to the text atoms, arrangement to the layout primitives, widths and surfaces to components. Mode classes set a flag that components read (`--ui-sizing`, `--font-sizing`, `--controls-*`, the colour scheme). Responsive helpers hide or show by a condition.

## Questions

1. **Names.**
   - Each utility has at most two names: the verbose name, which is the *logical* property and the value (`.padding-inline-sm`, `.text-align-start`, `.border-block-end`), and Tailwind's shorthand where it has one with the same meaning (`.px-sm`, `.text-start`, `.border-b`).
   - Spacing keeps Tailwind's prefixes (`p`, `px`, `py`, `pt`, `pb`, `ps`, `pe`, the same for `m`) with the library's step names (`p-sm`), since Tailwind's numbers map to nothing here. This is the one recorded exception to "same meaning".
   - `t`/`b` (top, bottom) stay as block start and end shorthands, as in Tailwind for horizontal text. The left/right names (`ml`, `pr`, `border-l`, `rounded-r`, `text-left`) go; use start/end (`ms`, `pe`, `border-s`, `rounded-e`, `text-start`), as Tailwind v4 does.
   - Valueless names go where Tailwind has none (`.padding`, `.margin`, `.gap`, `.mg`, `.pd`). They stay where Tailwind has the same default (`.border`, `.rounded`, `.shadow`).
   - Bare words go unless they are Tailwind's name for the same declaration and clash with nothing: keep `flex`, `hidden`, `block`, `contents`, `relative`, `absolute`, `fixed`, `sticky`, `static`, `isolate`, `truncate`, `italic`, `uppercase`, `lowercase`, `capitalize`, `grow`, `shrink`. Remove `bold`, `mono`, `pre`, `sr`, `bg`, `cq`, `round`, `squared`, `regular`, `roman`, `sans`, `serif`, `nowrap`, `backdrop` and the second `.block`.
   - `.text-nowrap` becomes `text-wrap: nowrap` (Tailwind's meaning); `white-space: nowrap` is `.white-space-nowrap` alone.

   *Recommended: yes.*

2. **A semantic spacing scale.** Add Tier 2 `space.2xs` … `space.3xl` (the current steps: 2, 4, 8, 16, 32, 48, 64, 128px), plus `space.breathe` and `space.cushion`. Utilities read only these. Designers see the same step names in Figma, and a theme can retune the scale in one place. *Recommended: yes.*

3. **Utilities stop doing components' jobs.**
   - Remove `font-size-*` and `line-height-*`; use a text atom (`.small-text`, `.text`, `.small-heading` …), which carries its line height and follows `--font-sizing`. Keep weight, style, family and wrapping utilities.
   - Remove `width-dialog`, `width-popover`, `width-sidebar`, `width-prose`, `width-shell` and `width-wide`. Components size themselves from their tokens; a product sets the token. Keep the width scale.
   - Remove `.backdrop`.
   - Migrate `align-items-center` off `.inline` and `.cluster` (276) and `inline justify-content-between` to `inline--between` (87).

   *Recommended: yes.*

4. **One scale per job.**
   - z-index: role names only (`z-base`, `z-sticky`, `z-popover`, `z-dialog`, `z-toast`, `z-tooltip`). Remove `z-0` … `z-50`.
   - Translucency: `bg-translucent-subtle`, `bg-translucent`, `bg-translucent-strong`, matching the components' `--translucent`. Remove the percentages and the `bg-effect-*` names; blur follows the surface token.
   - Font weight: the named weights only (`normal`, `medium`, `semibold`, `bold`). Remove `100` … `900`.
   - Shadow colour: the intents only (`shadow-accent`, `-danger`, `-warning`, `-success`), from Tier 2. Remove the palette names.
   - Text colour: the roles (`text-muted`, `text-strong`, `text-accent`, `text-danger` …). An intent colour on text still needs an icon or words (WCAG 1.4.1), as on components.

   *Recommended: yes.*

5. **Responsive helpers.**
   - One name per condition, in Tailwind's form: `md:hide`, `max-md:hide`, `@md:hide`, `@max-md:hide`.
   - Remove `show` (write `hide` with the other condition) and every synonym in §31D.
   - Keep the width steps `sm`, `md`, `lg`, `xl`, and their container forms. Remove `2xs`, `xs` and `2xl` (two uses between them).
   - Keep the library's values (`lg` is 60em). They come from the tokens and the layout already relies on them; §31 says so.
   - Keep `hide-labels` and `visually-hidden` (`sr-only`) in the same conditions. Remove `hide-decor` and `flex-auto` (no uses).
   - Height: keep only `short:hide` and `tall:hide` (below or above 36em tall).
   - Keep `app-locked:hide` and `app-unlocked:hide`, which follow `.app--viewport`'s lock condition.
   - The file drops from 2,886 lines to about 400.

   *Recommended: yes.*

6. **Visibility and focus.**
   - Narrow the reset's rule to `[hidden]:not([hidden="until-found"])`, so a component's `display` still can't undo the attribute and `until-found` works. `.hidden` (`display-none`) stays for classes.
   - `.visually-hidden` with `.sr-only` (Tailwind) as its shorthand; remove `.sr`.
   - Remove `.focus-none`: the focus-within container already drops nested rings. Keep `.focus-within` and `.focus-within--input`, one name each.

   *Recommended: yes.*

7. **Mode classes.**
   - Keep `ui-compact`, `fine:ui-compact`, `font-sizing-*`, `controls-*`, `color-scheme-*`, `color-palette-*`, `container-inline` (with `container-type-inline-size`).
   - Remove `ui-dense`, `ui-default`, `spacing-mode-*`, `font-sizing-compact--on-desk` and `viewport-fit-cover` (no uses).
   - Document them as modes (they set a flag), apart from the property utilities.

   *Recommended: yes.*

8. **A check.** Add `npm run check:utilities`, a Node script that reads the utility CSS and fails when:
   - a declaration has more than two names;
   - a name is a bare word outside the allow-list;
   - a name uses left/right;
   - a utility reads a Tier 1 token.

   *Recommended: yes.*

9. **Docs, stories, migration and the blog.**
   - Write `docs/markup/36-utilities.md` (names, scales, modes, what isn't a utility) and rewrite §31.
   - Rewrite the 10 utility stories without inline styles, fixing their axe failures.
   - Migrate every removed name in stories, the docs site, the markup docs and the recipes by script. AGENTS gets a legacy row.
   - Blog:
     - convert the Sass-authored `_accessibility.scss` and `_responsive-helpers.scss` to plain CSS so `sync:blog` mirrors them;
     - sync the rest;
     - migrate the overview;
     - check the site's 16 utility uses.

   *Recommended: yes.*

## Migration done

All recommendations taken, with one change from the answers: sizes are Tailwind's. Viewport `sm` 40rem, `md` 48rem, `lg` 64rem (was 60em), `xl` 80rem, `2xl` 96rem. Containers use Tailwind's container scale, `@xs` 20rem through `@7xl` 80rem. That replaces Q5's "keep the library's values" and its removal of `2xl`.

- **Tokens:**
  - Tier 2 spacing steps `--spacing-2xs` … `--spacing-3xl`. They sit in the existing `spacing` group, so they are named `spacing.*`, not `space.*`.
  - `--translucency-faint`, for the palette utility, which read Tier 1.
- **CSS:**
  - All utilities are generated from one name scheme, and every rule has at most two names. Files:
    - spacing, border, typography, colour, display, flex;
    - sizing (`utilities/sizing.css`, which replaces `spacing-blocks.css`);
    - position, overflow and stacking; shadow; focus; accessibility; responsive helpers; container.
  - 650 rules, down from 2,370 names. The responsive helpers went from 2,886 lines to 887: 5 viewport and 11 container sizes, each in both directions, plus height and the app-lock conditions, each with three actions.
  - Font families read Tier 2 (`--body-font-family`, `--body-alt-font-family`, `--code-font-family`, `--title-font-family`).
  - The accessibility and responsive helpers are imported last, so hiding wins over the other utilities.
  - The reset's `[hidden]` rule leaves `hidden="until-found"` rendered.
  - The grid's container counts, `.inline-responsive--{size}` and card's `@max-*:card--plain` moved to the container scale. `app` and `main` read 48rem and 36rem.
- **Found while verifying:**
  - **Intent shadows never tinted anything.** The shadow tokens resolve on `:root`, so a `--shadow-color` set on an element changed nothing. A colour class now resolves `--shadow-sm` … `--shadow-inner` again with its own colour. Checked: `.shadow-md.shadow-accent` draws an accent shadow.
  - **`.color-scheme-dark` didn't switch the text colour.** The colour a region inherits was resolved for the scheme above it, so text kept its light-scheme colour (axe: 1.72:1). The scheme classes now set `color: var(--foreground)` again.
  - **`.border` was 2px.** `--border-width` is the medium width. `.border` now draws 1px, like Tailwind's; `.border-md` is 2px.
- **Check:** `npm run check:utilities` (`scripts/check-utilities.js`). It passes on the new CSS. On the old CSS it reported 886 problems: 394 rules with more than two names, 208 bare words, 116 left/right names and 168 Tier 1 reads.
- **Migration:**
  - A script rewrote class attributes in stories, the docs site, `docs/markup`, AGENTS and the blog templates, 97 files in all:
    - removed names became their replacements;
    - verbose names became shorthands;
    - `font-size-*` became a text atom, or was dropped where the element already had one (341);
    - `align-items-center` came off `.inline` and `.cluster` (310);
    - `justify-content-between` became `inline--between` or `cluster--between` (92);
    - old container sizes moved to the new scale;
    - `border-muted` and `border-quiet` gained `.border` where they stood alone.
  - Prose mentions and JS-built class names were fixed by hand.
  - A first run broke template literals by de-duplicating tokens. It was restored from a backup and re-run with in-place replacement. Every migrated file keeps its counts of backticks, quotes and braces.
- **Stories:** the 10 utility stories were rewritten with no inline styles: spacing, border, typography, colour, display and flex, sizing, position/overflow/stacking, shadow, focus, and responsive helpers.
- **Docs:**
  - `docs/markup/36-utilities.md` is new, and §31 is rewritten.
  - AGENTS: a legacy row and the utilities rule.
  - PRINCIPLES: the spacing-prefix exception, logical sides, Tier 2 only, and the size scale.
- **Blog:**
  - `_accessibility.scss` and `_responsive-helpers.scss` are now plain CSS twins.
  - `_spacing-blocks.scss` and `_container-type.scss` became `_sizing.scss` and `_container.scss`, and the forwards were updated.
  - All utilities, plus grid, inline, app, main and card, were synced.
  - `_tier2` gained the spacing steps and `--translucency-faint`; the reset was updated; `$bp-lg` is now 64em.
  - The overview and two site templates were migrated (`visually-hidden` became `sr-only`, `font-size-sm` became `small-text`).
