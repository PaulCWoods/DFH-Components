# Header

Covers `.header`: the band at the top of a page or app that holds the brand, the main navigation and global actions, usually the page's banner landmark. The last of the remaining organisms, after accordion, combobox and empty state.

Counts cover Storybook stories, the docs site and `docs/markup/` (together, "Library") and the blog templates. Rendering was checked in headless Chrome against `packages/css/src/index.css`.

## The CSS

| File | Lines | What it does |
| :--- | ---: | :--- |
| `organisms/header.css` | 177 | Sets `--header-height` on `:root` (60px, 80px from a 1024px media query); a full-width flex column with a minimum height, safe-area padding, a card surface and a bottom border; palette and scheme private variables; an inline-size container; `.header-container` for stacked headers; `--sticky` with a shadow from both a scroll-state query on the `.app` container and a scroll-driven animation; `--translucent` (a colour-mixed surface and a backdrop blur); `--borderless`; `--flush`; more-contrast (2px border, no translucency) and reduced motion. |

Tier 3: `header.*`, 3 tokens (border width, colour, style, from `app.*`). Tier 2 holds `header.mobile-height` and `header.desktop-height`. The CSS reads 10 more `--header-*` hooks that aren't tokens.

There is no markup doc for the header: it isn't in `docs/markup/` or the AGENTS table.

## Usage

| Pattern | Library | Blog |
| :--- | ---: | ---: |
| `.header` | 37 (stories, 6 recipes, layout stories, the docs site) | 2 (overview) |
| `--sticky` / `--translucent` | 22 / 20 | 1 / 1 |
| `--borderless` / `--flush` | 5 / 4 | 2 / 0 |
| `.header-container` (stacked headers) | 5 | 0 |
| A layout inside it (`.wrapper.flex…`, `.inline--between`, inline flex styles) | almost every use | 2 |
| Padding utilities on it (`padding-block-*`, `py-*`, `px-*`) | 16 | 2 |
| Inline styles in the header stories | 91 | – |

The blog's own site header is blog code (`dfh/`), not `.header`; the blog uses `.header` only in the overview.

## Measurements and checks

- **The sticky shadow never shows.** It is `var(--header-shadow, var(--card-layer-shadow))`, and neither exists, so scrolling 400px leaves `box-shadow` at none (checked at 800 and 1200px wide). Two mechanisms try to set it: a scroll-state query on the `app` container (`.app` doesn't scroll, so it never matches) and a scroll-driven animation.
- **A component sets a global.** `:root { --header-height }` with a hard 1024px breakpoint lives in the header file. Nothing reads it except the sidebar's sticky offset; the header's height is really set by whatever is inside it plus utilities.
- **It has no layout of its own.** It is a column with a minimum height; every use builds the row inside (`.wrapper.flex.justify-content-between.align-items-center`, `.inline--between`, inline flex). Brand, navigation and actions sit wherever each author puts them, with different gaps and widths. 16 uses add padding utilities, because the header has inline padding but no block padding.
- **Stacked headers nest landmarks wrongly.** `.header-container` is a `<header>` holding two `.header` `<div>`s; the sticky behaviour sits on the container and the surfaces on the children.
- **Focus can hide behind it.** Nothing stops a sticky header covering an element that receives focus while tabbing up the page (WCAG 2.2 2.4.11 Focus Not Obscured, AA): there is no `scroll-padding`.
- **Several landmarks.** The variant stories put several `<header>`s in one page, each a banner (axe: `landmark-no-duplicate-banner`, `landmark-unique` in 3 stories, light and dark). The real-world story fails `color-contrast` twice (light).
- **Naming:** `--borderless` and `--flush` predate the prominence axis (`--plain`). `--translucent` matches card, menu and banner.
- **Dead or duplicate hooks:** palette and scheme private variables (`.color-palette-*` and `.color-scheme-*` utilities do this), `--header-contained-height`, `--header-container-gap`, `--header-bg` and `--header-shadow` (not tokens), the `inherit` colour scheme.
- **Stories** simulate states with inline styles (a "focused" button drawn with an inline outline, a "high contrast" header with an inline border).

## Problems found

1. A sticky shadow that never appears, set two ways.
2. No row layout: every use rebuilds brand / navigation / actions and its padding.
3. A global height token set from a component file, with a raw breakpoint.
4. Stacked headers as nested landmarks.
5. Nothing protects focus from being hidden under a sticky header.
6. Legacy modifier names, dead hooks, undefined tokens; no markup doc; inline-styled stories.

## Where it ends

The header is a band (surface, border, sticky, translucency) holding one or more rows. A row lays out what's in it: brand, navigation, actions. The navigation is a tab list or button group, the brand a lockup or link, the actions buttons; each styles itself. Opening a mobile menu is the product's script (or a popover or dialog the library already styles).

## Questions

1. **Header stays an organism.** It composes molecules (tab list, lockup, button group, breadcrumb, combobox) into a region. It stays in `organisms/header.css`. *Recommended: yes.*

2. **Rows.**
   - `.header` is the band: surface, bottom border, sticky, translucency, safe-area padding. It is always full width.
   - `.header__bar` is a row inside it: a flex row, centred vertically, with block and inline padding, a gap, and at least the target height plus padding. Its width is capped by `--header-max-width` (default: the site width) and centred, so content lines up with `.wrapper`.
   - `.header__nav` takes the free space and can shrink (so a scrollable tab list works); anything after it sits at the end. Without a nav, the last child is pushed to the end.
   - Two rows (a bar and a breadcrumb bar) are two `__bar`s in one `<header>`, with a rule between them. Remove `.header-container`.

   *Recommended: yes.*

3. **Height and density.**
   - Remove the `:root` `--header-height` rule and the Tier 2 `header.mobile-height` / `desktop-height` tokens. The header is as tall as its bar.
   - `--compact` sets `--ui-sizing: compact`: the bar's padding steps down, and so do the buttons and text inside.
   - `--header-height` stays as a hook the product sets when something needs the header's height (the sidebar's sticky offset, scroll padding).

   *Recommended: yes.*

4. **Prominence.**
   - Default: card surface and a bottom border.
   - `--plain`: no surface, no border (replaces `--borderless`).
   - `--translucent`: a translucent surface with a backdrop blur, as on card, menu and banner; solid under more contrast.
   - Remove `--flush` (set `--header-padding-inline`), and the palette and scheme variables: use `.color-scheme-dark` or a `.color-palette-*` utility on the header.

   *Recommended: yes.*

5. **Sticky.**
   - `--sticky` pins the header to the top. Its shadow shows only when it is stuck, through a `scroll-state(stuck: top)` query on the header itself, drawn by a pseudo-element (checked: this works without `.app`). Browsers without scroll-state queries keep the border.
   - Remove the scroll-driven animation and the `app` container query. The shadow comes from a `header.shadow` token (`{shadow.md}`); none under more contrast.
   - **Focus Not Obscured (2.4.11):** while a sticky header is on the page, `:root` gets `scroll-padding-block-start` of `--header-height` (default 4rem), so a focused element scrolls clear of it. The product sets `--header-height` if its header is taller.

   *Recommended: yes.*

6. **Semantics, documented.**
   - A `<header>` that is a direct child of `<body>` (or `.app`) is the banner landmark: one per page, no `aria-label` needed. A `<header>` inside `<main>`, `<article>` or `<section>` isn't a landmark.
   - The skip link comes first, before the header.
   - Navigation inside is a `<nav aria-label>`; the current page has `aria-current="page"`.
   - A menu button for small screens has `aria-expanded` and `aria-controls`, or opens a popover or dialog.

   *Recommended: yes.*

7. **Tokens.** `header.*` becomes: `bg`, `border-width`, `border-color`, `border-style`, `padding-block`, `padding-inline`, `compact-padding-block`, `gap`, `max-width`, `shadow`, `translucency`, `filter`, `z-index`, all pointed at semantic tokens. Remove the Tier 2 heights. *Recommended: yes.*

8. **Footer stays out.** `.footer` / `.app__footer` lives in `layout/app.css` and mirrors the header's border. Leave it for an app-shell pass. *Recommended: yes.*

9. **Stories, docs and the blog.**
   - Rewrite the stories, without inline styles:
     - a playground;
     - a site header with brand, navigation and actions;
     - a small-screen menu button;
     - two rows;
     - sticky in a scrolling page, showing the stuck shadow and focus clearing the header;
     - plain and translucent;
     - a compact app header;
     - a dark header;
     - right to left.
   - One banner per story, so axe's landmark rules pass.
   - Migrate the recipes (app header, filter sidebar, cadence, tally-sprout), the app, sidebar and responsive-helper layout stories, the docs site header, `19-wrapper.md` and `32-recipes.md`.
   - Write `docs/markup/33-header.md` and add it to the AGENTS table.
   - Blog: `_header.scss`, `_tier3.scss`, and the overview's two examples.

   *Recommended: yes.*

## Migration done

All recommendations taken.

- **Tokens:** `header.*` is 13 tokens; the Tier 2 `header.mobile-height` / `desktop-height` are gone.
- **CSS:**
  - `.header` is the band: a container (`header`, inline size and scroll state), with safe-area padding, surface and bottom border.
  - `.header__bar` is a row: flex, capped at `--header-max-width` and centred, at least the target size tall plus padding (the small target when compact), with a rule between two bars. Checked: its content lines up with `.wrapper`.
  - `.header__nav` takes the free space; the last part sits at the end.
  - `--plain`, `--translucent`, `--compact` (a compact bar is 42px with 32px buttons), `--sticky`.
  - The stuck shadow is a `::after` shown by `scroll-state(stuck: top)`. Checked: none at rest, shown once stuck, with or without `.app`.
  - `:root:has(.header--sticky)` sets `scroll-padding-block-start: var(--header-height, 4rem)`.
- **Found while verifying:**
  - **A hidden nav broke the end alignment.** The docs site hides its nav below `xl` with a utility, which `:has(> .header__nav)` can't see. The last part now always takes `margin-inline-start: auto`, which is zero while a visible nav fills the row.
  - **The docs site's layout is full width**, so its header sets `--header-max-width: none`.
- **Usage migrated:**
  - recipes: app header (the stacked header is one `<header>` with two bars), filter sidebar, cadence, tally-sprout;
  - stories: the app, sidebar and responsive-helper stories;
  - the docs site header; `19-wrapper.md`, `32-recipes.md`;
  - `layout/app.css` no longer places `.header-container`.
- **Stories:** rewritten (7: playground, site header, two rows, sticky, prominence, compact app header, right to left), with no inline styles and one banner each. Axe passes on all of them in light and dark. Remaining failures in the layout stories belong to the app shell and sidebar (several app shells in one story, so duplicate landmarks; sidebar headers with hard-coded backgrounds failing contrast in dark), noted in HANDOVER.
- **Blog:** `_header.scss` mirrored with `sync:blog`, the `_app.scss` selector fixed by hand (the rest of that file waits for a full sync), header tokens added to `_tier3.scss` (none were there), and the overview's section rewritten with three examples as `<div class="header">`. The blog's own site header (`dfh/`) is untouched.
