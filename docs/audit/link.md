# Link and skip link: usage inventory

Covers three atoms in two files: the inline link (`.link`), the block link (`.block-link`, a full-width navigational callout with an arrow) and the skip link (`.skip-link`, with the `.skip-links` group). Links inside `.prose`, breadcrumbs and the navigation tree are styled by those molecules and get their own passes; they are noted where they depend on these atoms.

Counts cover Storybook stories, the docs site and AGENTS.md ("library"), and the blog templates ("blog").

## The CSS

| File | Lines | Selector |
| :--- | ---: | :--- |
| `atoms/link.css` | 360 | `.link`, `a.link`; `.block-link`, `a.block-link`, `.block-link__arrow` |
| `atoms/skip-link.css` | 180 | `.skip-link`, `.skip-link--floating`, `.skip-links` |
| `reset.css` §5 | 12 | every `a`: no underline, underline on hover and focus |

## Usage

| Class | Stories | Docs site | AGENTS | Blog |
| :--- | ---: | ---: | ---: | ---: |
| `.link` | 110 | 5 | 8 | 56 |
| `.link--subtle` | 8 | 0 | 1 | 1 |
| `.link--plain` | 0 | 5 | 0 | 1 |
| `.link--muted` | 0 | 3 | 0 | 1 |
| `.link--stretched` | 0 | 1 | 0 | 0 |
| `.link--accent`, `--danger`, `--success`, `--sm`, `--lg`, `--inline-flex` | 0 | 0 | 0 | 1 each (2 for sizes), overview page only |
| `.link--inverted`, `.link--on-dark` | 0 | 0 | 1 each | 0 |
| `.block-link` | 14 | 1 | 2 | 5 |
| `.block-link--subtle`, `--compact` | 0 | 0 | 0 | 2 each, overview page only |
| `.block-link--icon`, `--plain` | 0 | 1 each | 0 | 0 |
| `.skip-link` | 24 | 1 | 6 | 5 |
| `.skip-link--floating` | 2 | 0 | 1 | 1 |
| `.skip-links` | 2 | 0 | 1 | 1 |
| Bare `<a href>` with no class | 3 (prose) | – | – | 16 (11 in `index_old.twig`; TOC, topic and tag lists) |

`.link--inverted` and `.link--on-dark` are documented in AGENTS §8 but **don't exist** in the CSS. Defined but unused anywhere: `.link--underline(d)`, `.link--stretch`, `.block-link--ghost`, `--inline`, `--sm`, `--flex`.

## Measurements

Light and dark, against the page background (`rgb(247 245 240)` / `rgb(43 42 39)`):

| | Light | Dark |
| :--- | ---: | ---: |
| Link text (accent) | 4.94 | 9.55 |
| **Link text on hover** | **3.47** | 11.89 |
| Link text pressed | 8.28 | 6.80 |
| Link danger, success, muted | 5.67, 5.30, 5.70 | 8.31, 9.38, 6.83 |
| **Link colour against body text** | **1.55** | **1.38** |
| **Underline as drawn (50% of the link colour)** | **2.04** | 3.54 |
| Skip link text on its background | 4.94 | 5.54 |
| **Focus ring against the skip link background** | **1.55** | **1.38** |
| Block link text on hover (inverted on accent) | 4.94 | 5.54 |

Axe (14 link and skip-link stories, light and dark): the hover state at 3.47:1 (state matrix story), and a skip link at 3.97:1 in dark mode caused by an inline style in the story.

## Problems found

1. **Hover fails text contrast.** In light mode the hover colour (`--foreground-accent-hover`) is 3.47:1 against the page, under the 4.5:1 that text needs in every state.
2. **The underline is the only cue, and it is faint.** Link colour is 1.55:1 against body text, so colour alone doesn't mark a link (WCAG 1.4.1); the underline does. It is drawn at 50% of the link colour, 2.04:1 against the page in light mode.
3. **`--plain` removes the underline everywhere, even on hover and focus.** It explicitly sets `text-decoration-line: none` on hover. In running text that fails 1.4.1. In navigation it leaves only the colour shift (and, in light mode, a failing hover colour).
4. **The reset strips every bare link.** `reset.css` sets `text-decoration: none` on `a` and `all: unset` leaves the colour inherited, so a bare link in body copy looks exactly like text until hovered. 16 blog links are bare (TOC, topic and tag lists, the old index); prose re-styles its own.
5. **Intent on a link is off-axis.** `--danger` and `--success` treat a link like an action with consequences; links navigate, and consequence belongs on buttons. `--accent` repeats the default; `--muted` is a colour, not a prominence. All are used only on the overview page, except `--muted` (3 in the docs header).
6. **Size on a link is typography's job.** `--sm` and `--lg` set font size; an inline link should take the size of the text it sits in. Overview page only.
7. **Documented classes that don't exist.** AGENTS §8 shows `.link--inverted` and `.link--on-dark`. Neither is defined, so a link on a dark band keeps light-scheme accent colours. The library already has `.color-scheme-dark`, which flips every `light-dark()` token inside it.
8. **Block link axes don't match button.** Its `--subtle` is a quieter border (button's subtle is a tinted fill with no border), it has no `--strong`, `--compact` and `--sm` are aliases (one is a density name on an atom), and `--sm` is 32px with no hit-area buffer (WCAG 2.5.8 rule in PRINCIPLES). `--icon` and `--inline` duplicate `.button--icon` and an inline `.button`.
9. **Skip link focus ring is invisible on its own background.** The ring is inset and uses the focus colour, 1.55:1 (light) and 1.38:1 (dark) against the skip link's accent fill. A single skip link is fine (it appears on focus), but tabbing through `.skip-links` shows almost no change between items (WCAG 2.4.7, 2.4.13).
10. **The external-link pattern underlines a stray space.** In `<span>text</span> <svg>` the space before the icon is part of the link and gets underlined.
11. **Token rules broken.** Hex fallbacks throughout both files, an `rgba()` shadow stack in the floating skip link, Tier 1 references (`--spacing-4`, `--spacing-12`, `--spacing-16`, `--duration-sm`, `--typography-font-size--1`), and five `!important`s in the reduced-motion blocks.
12. **Block link arrow uses `[dir="rtl"]`** rather than `:dir(rtl)`, so it ignores direction set any other way.

What already works: links are underlined by default; the subtle link keeps its underline; the skip link expands to a 48px target on focus, honours safe-area insets and has a forced-colours rule; the floating skip link doesn't shift the page.

## Questions

1. **Hover and underline.** Keep the link colour on hover (no separate hover colour) and make the underline the state cue:
   - at rest, the underline at full link colour and 1px (4.94:1 light, 9.55:1 dark);
   - on hover, the underline thickens to 2px.

   This fixes problems 1 and 2 in every palette, because nothing depends on a second colour. The alternative, a softer underline at rest (a mix that measures at least 3:1), would need checking per palette. *Recommended: full colour at rest, thicker on hover.* `--link-hover-color` and `--link-active-color` tokens go.
2. **Link prominence.** Default (accent, underlined), `--subtle` (inherits the text colour, underlined), `--plain` (no underline at rest, underline on hover and focus). `--plain` is for links whose context marks them already (navigation, a list of links, a card title), never in running text; PRINCIPLES records that. *Recommended: yes.* `--muted` folds into `--subtle` (put it on muted text).
3. **No intent or size on links.** Remove `--accent`, `--danger`, `--success`, `--sm`, `--lg`. A destructive action is a `.button--danger`; size comes from the surrounding text. *Recommended: yes.*
4. **Links on dark bands.** Don't add `--inverted` or `--on-dark`; put `.color-scheme-dark` (or `-light`) on the band and every token, links included, flips. AGENTS §8 changes to show that. *Recommended: yes.*
5. **Bare links.** Change the reset so a bare `a` keeps an underline and inherits the text colour (like `--subtle`), instead of having no underline. Readable and on-brand, and it passes 1.4.1 without a class. The alternative is `all: revert` (browser blue and purple), as for form fields. *Recommended: underline and inherit.*
6. **Block link.** Keep it as its own atom (a full-width navigational callout with a wrapping label and an arrow, which button doesn't do), and align it with button's axes:
   - prominence: default outline, `--strong`, `--subtle` (tinted fill, no border), `--plain`;
   - size: default and `--sm`, where `--sm` keeps a 48px hit area through `::after` unless the product opts into fine-pointer targets; compact steps it to `--sm`;
   - remove `--compact` (use `--sm`), `--ghost`, `--icon` and `--inline` (use `.button` on an `<a>`), and `--flex`.

   *Recommended: yes.* The alternative is removing block link and using `.button` with a full-width modifier, but buttons don't wrap their label.
7. **`--stretched`.** Keep `.link--stretched` (a link whose `::after` covers its nearest positioned ancestor, for whole-card links outside `.card`) and remove its `--stretch` alias. *Recommended: yes.*

### Fixes that need no decision

- Skip link focus ring in the skip link's text colour (`--foreground-inverted`, 4.94:1 and 5.54:1 against its fill), so moving through `.skip-links` is visible.
- External-link pattern: no whitespace between text and icon, and the icon gets its own spacing; update AGENTS §8.
- Remove hex and `rgba()` fallbacks, Tier 1 references (add Tier 3 tokens where a component needs a value) and the `!important`s.
- Block link arrow: `:dir(rtl)` instead of `[dir="rtl"]`.
- AGENTS §8: remove `--inverted` and `--on-dark`; show `.color-scheme-dark`. AGENTS §7 (skip link): note that the target should be a landmark such as `<main id="main">`.
- Stories: drop the inline style that makes the 3.97:1 skip link; rebuild the link and skip-link stories to the new API.
- Docs site: `ComponentHeader.astro` and `Header.astro` move off `--muted`, `block-link--icon` and `block-link--plain`.
- Blog: port both files, update `_reset.scss` and `_component-library.twig`.

## Migration done

All seven recommendations were accepted.

### Changes

- **`.link`**: the underline is the cue. At rest it is drawn at the full link colour, 1px; on hover and focus it thickens to 2px (`--link-hover-underline-thickness`). There is no hover or pressed colour; `--link-hover-color` and `--link-active-color` are gone.
- **Prominence**: default (accent), `--subtle` (text colour), `--plain` (no underline at rest; underlined on hover and focus). Flag: `--link-prominence`.
- **Removed**: `--accent`, `--danger`, `--destructive`, `--success`, `--muted`, `--sm`, `--lg`, `--inline-flex`, `--underline(d)`, `--stretch`. AGENTS no longer documents `--inverted` or `--on-dark`; dark bands use `.color-scheme-dark`.
- **`.link--stretched`** is kept. An icon directly inside a link gets `margin-inline-start: 0.25em`, so the external-link pattern needs no space.
- **Block link** follows button's axes:
  - prominence: outline (default), `--strong`, `--subtle`, `--plain`, with the flag `--block-link-prominence`;
  - size: `--sm`, with the flag `--block-link-size`; compact steps to `--sm`, and an `::after` hit area keeps it at least 48px;
  - the arrow moves with `translate` and `:dir(rtl)`.
  - Removed: `--compact`, `--ghost`, `--icon`, `--inline`, `--flex`.
- **Block link on a tint**: `--subtle` and the hover and pressed states of `--subtle` and `--plain` use `--foreground-accent-pressed` for the text. The accent measured 4.497:1 on `--surface-translucent` and 4.08:1 on `--surface-translucent-strong` in light mode.
- **Skip link**:
  - the focus ring is drawn in the link's text colour;
  - the floating variant moves with `translate` and opacity, with an outset focus ring;
  - `.skip-links` opens every link while one has focus;
  - Tier 3 tokens added for padding, radius and the floating inset;
  - no hex, `rgba()`, Tier 1 references or `!important`.
- **Reset**: a bare `a` with no class is underlined and takes the surrounding text colour, thickening on hover. Classed links are left to their component.
- **Docs site**: the header Storybook link is a plain icon button; breadcrumb links use `.link--plain`.
- **Blog**:
  - `_link.scss`, `_skip-link.scss` and `_reset.scss` ported;
  - Tier 3 link, block link and skip link tokens added; `--link-decoration-line: none` removed, so blog `.link`s are now underlined;
  - overview page rewritten.

### Measurements after

| | Light | Dark |
| :--- | ---: | ---: |
| Link text and underline | 4.94 | 9.55 |
| Subtle link text and underline | 7.65 | 13.17 |
| Link on a `.color-scheme-dark` band | 12.46 | 12.46 |
| Block link outline, plain | 4.94 | 9.55 |
| Block link strong | 4.94 | 5.54 |
| Block link subtle (rest / hover) | 7.54 / 6.84 | 5.89 / 5.02 |
| Skip link text and focus ring against its fill | 4.94 | 5.54 |
| Skip links in an open group | 48px each | |
| Block link `--sm` | 37px visual, ≥48px hit area | |

Axe: 13 stories (link, skip link, and the choices story with links), light and dark, no violations.

### Caveats

- Prose links (`.prose a`) still draw their own underline at 50% and use the hover colour; they belong to the prose pass. Breadcrumb, banner and table still set `--link-hover-color`, which nothing reads now; they get cleaned in their own passes.
- **Button has the same tint problem.** `.button--subtle.button--accent` puts accent text on `--surface-translucent` (4.497:1 in light) and switches to `--foreground-accent-hover` on hover (3.16:1). To revisit in a button follow-up, or by darkening the light-mode accent.
- Firefox and Safari not tested.
