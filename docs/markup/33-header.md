# 33. Header
The band at the top of a page or app that holds the brand, the main navigation and global actions. An organism: the header draws the band (surface, border, sticky, translucency) and lays out its rows; what's in a row (a lockup, a tab list, buttons, a breadcrumb) styles itself. The audit is in `docs/audit/header.md`.

| Axis | Modifiers (on `.header`) | Flag |
| :--- | :--- | :--- |
| Prominence | default (surface and bottom border), `--plain`, `--translucent` | none |
| Density | default, `--compact` | `--ui-sizing: compact` |
| Placement | in flow, `--sticky` | none |

## A. Markup
```html
<a href="#main" class="skip-link">Skip to content</a>
<header class="header header--sticky">
  <div class="header__bar">
    <a href="/" class="link link--plain small-heading">Woodland Plants</a>
    <nav class="header__nav tab-list tab-list--plain tab-list--scrollable @max-3xl:hide" aria-label="Main">
      <ul>
        <li><a href="/plants" class="tab" aria-current="page"><span class="tab__text">Plants</span></a></li>
        <li><a href="/borders" class="tab"><span class="tab__text">Borders</span></a></li>
      </ul>
    </nav>
    <div class="cluster gap-xs">
      <button type="button" class="button button--strong button--accent @max-3xl:hide">Sign in</button>
      <button type="button" class="button button--plain button--icon @3xl:hide" popovertarget="menu" aria-label="Menu">…</button>
    </div>
  </div>
</header>
<main id="main">…</main>
```
- **`.header`** is the band: always full width, with the safe-area insets as padding.
- **`.header__bar`** is a row. Its content is capped at `--header-max-width` (the site width) and centred, so it lines up with `.wrapper`. It is at least the target size tall, plus its padding.
- **`.header__nav`** takes the free space and can shrink, so a scrollable tab list fits. The bar's last part always sits at the end.
- **Narrow widths:** the header is a container, so `@max-3xl:hide` and `@3xl:hide` swap the navigation for a menu button by the header's own width. The menu button opens a popover (`.popover` with a `.menu` of links) or a dialog, or sets `aria-expanded` and `aria-controls` on a panel the product's script shows.

## B. Two Rows
```html
<header class="header">
  <div class="header__bar">…brand, nav, actions…</div>
  <div class="header__bar">
    <nav class="breadcrumb" aria-label="Breadcrumb">…</nav>
    <button type="button" class="button button--sm">Edit</button>
  </div>
</header>
```
Two bars in one `<header>`, with a rule between them. One landmark, one band.

## C. Sticky
- `--sticky` pins the header to the top of the scrolling page. Its shadow shows only while it is stuck (a scroll-state query); browsers without one keep the border.
- **Focus Not Obscured (WCAG 2.4.11):** while a sticky header is on the page, the page's `scroll-padding-block-start` is `--header-height` (4rem by default), so a focused element scrolls clear of it. If the header is taller (two rows), set `--header-height` on `:root`. The sidebar reads the same hook for its sticky offset.

## D. Prominence, Density and Colour
- `--plain`: no surface and no border, for a header over a hero or a page that draws its own edge.
- `--translucent`: the content scrolls under a see-through surface with a blur. Solid under more contrast.
- `--compact`: the bar's padding steps down, and so do the buttons and text inside (an app toolbar).
- A dark header is `.color-scheme-dark` on the band; a branded one is a `.color-palette-*` utility.

## E. Semantics
- A `<header>` that is a direct child of `<body>` (or `.app`) is the banner landmark. Use one per page; it needs no `aria-label`. A `<header>` inside `<main>`, `<article>` or `<section>` isn't a landmark.
- The skip link comes first, before the header.
- Navigation is a `<nav>` with an `aria-label`; the current page has `aria-current="page"`.
- A gallery of headers on one page uses `<div class="header">` so there is still only one banner.

## F. Rules
- **Removed:** `.header-container` (use two `__bar`s); `--borderless` (use `--plain`); `--flush` (set `--header-padding-inline`); the global `--header-height` rule and the Tier 2 `header.mobile-height` / `desktop-height` tokens; the palette and scheme variables (use the utilities); `--header-contained-height`, `--header-container-gap`; the scroll-driven shadow animation and the `app` container query; a layout built inside the header (`.wrapper.flex.justify-content-between`, `.inline--between`) and padding utilities on it.
