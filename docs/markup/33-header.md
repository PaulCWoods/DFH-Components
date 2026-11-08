---
title: Header
tier: organism
summary: The band at the top of a page or app, holding the Brand, the main navigation and global actions.
tokens: header
storybook: organisms-header
related: [brand, tabs, breadcrumb, skip-link, footer, app-shell, responsive-visibility]
---

# 33. Header
```html playground
<div class="header" data-axes>
  <div class="header__bar">
    <a href="/" class="brand"><span class="brand__name">Woodland Plants</span></a>
    <nav class="header__nav tab-list tab-list--plain tab-list--scrollable @max-3xl:hide" aria-label="Main, example">
      <ul>
        <li><a href="/plants" class="tab" aria-current="page"><span class="tab__text">Plants</span></a></li>
        <li><a href="/borders" class="tab"><span class="tab__text">Borders</span></a></li>
      </ul>
    </nav>
    <div class="cluster gap-xs">
      <button type="button" class="button button--strong button--accent @max-3xl:hide">Sign in</button>
      <button type="button" class="button button--plain button--icon @3xl:hide" popovertarget="default-header-menu" aria-label="Open site menu">
        <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Navigation"/></svg>
      </button>
      <div id="default-header-menu" popover class="popover">
        <menu class="menu" aria-label="Site menu">
          <li><a href="/plants" class="button" aria-current="page"><span>Plants</span></a></li>
          <li><a href="/borders" class="button"><span>Borders</span></a></li>
          <li><a href="/sign-in" class="button"><span>Sign in</span></a></li>
        </menu>
      </div>
    </div>
  </div>
</div>
---
Prominence: Default, Plain=header--plain, Translucent=header--translucent
Density: Default, Compact=header--compact
```

## Purpose
The top of the page is where people expect to find out where they are and how to get elsewhere. A Header gives that one consistent place, as a real `<header>`, so screen reader users can jump to it as the banner landmark.

It draws the band and lays out its rows, and everything in a row styles itself. So a Brand, a Tab List or a Button looks the same here as anywhere, and the Header's only opinions are about the band. Its bars share the site width with [Wrapper](19-wrapper.md), so the Header lines up with the page.

It ships no script and no mobile menu. Because the Header is a container, a menu Button can replace the navigation by the Header's own width, and that menu is a [Popover](03-popover.md) or a [Dialog](02-modal-dialog.md), which already handle focus and Escape.

## When to use
- **Once per page,** at the top, for the Brand, the main navigation and global actions.
- **As an app toolbar,** with `--compact`.
- **Not for a section's own heading and actions:** that is a [Card header](10-card.md) or a [row in the page](22-stack-inline-cluster.md).
- **Not for a site-wide announcement:** that is a [Banner Dock](21-banner-dock.md).
- **Not for section navigation:** that goes in a [Sidebar](34-sidebar.md).

## Rules
- **One banner:** a `<header>` that is a direct child of `<body>` (or `.app`) is the banner landmark. Use one per page; it needs no `aria-label`. A `<header>` inside `<main>`, `<article>` or `<section>` isn't a landmark.
- **The [Skip Link](07-skip-link.md) comes first,** before the Header.
- **Navigation** is a `<nav>` with an `aria-label`; the current page has `aria-current="page"`.
- **Narrow widths:** the Header is a container, so `@max-3xl:hide` and `@3xl:hide` swap the navigation for a menu Button by the Header's own width. The menu Button opens a Popover (`.popover` with a `.menu` of links) or a Dialog, or sets `aria-expanded` and `aria-controls` on a panel the product's script shows.
- **Touch targets:** a compact Header keeps its bar as tall as the pointer's minimum target, so on a touch screen its Buttons' hit areas never reach past the band into the page below. Only fine-pointer targets make it shorter.
- **Focus Not Obscured (WCAG 2.4.11):** while a sticky header is on the page, the page's `scroll-padding-block-start` is `--header-height` (a target-sized bar, its padding and border), so a focused element scrolls clear of it. If the Header is taller (two rows), set `--header-height` on `:root`. The Sidebar reads the same hook for its sticky offset.

## Keyboard and screen readers
The Header adds no behaviour of its own. Links, Buttons and landmarks do this natively.
- **Tab** reaches the Skip Link first, then the Brand, the navigation and the actions, in source order.
- **A scrollable Tab List** scrolls each Link into view as it takes focus.
- **Enter or Space** on a `popovertarget` menu Button opens the Popover, and the browser exposes its expanded state. The next **Tab** moves into the Popover.
- **Escape** closes the Popover, and focus returns to the Button.
- **A menu built with a script** is the product's to make: it sets `aria-expanded` and `aria-controls` on the Button, and manages its own focus and Escape.
- **A screen reader** finds the Header as the banner, names the navigation from its `aria-label` and announces the current page from `aria-current="page"`.

## The Whole Page's Header
A real `<header>`, so it can't be shown live on this page, which has its own.

```html
<a href="#main" class="skip-link">Skip to content</a>
<header class="header header--sticky">
  <div class="header__bar">
    <a href="/" class="brand"><span class="brand__name">Woodland Plants</span></a>
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

## Two Rows
```html live
<div class="header">
  <div class="header__bar">
    <a href="/" class="brand"><span class="brand__name">Woodland Plants</span></a>
    <nav class="header__nav tab-list tab-list--plain tab-list--scrollable @max-3xl:hide" aria-label="Main, two rows example">
      <ul>
        <li><a href="/plants" class="tab" aria-current="page"><span class="tab__text">Plants</span></a></li>
        <li><a href="/borders" class="tab"><span class="tab__text">Borders</span></a></li>
      </ul>
    </nav>
    <button type="button" class="button">Sign in</button>
  </div>
  <div class="header__bar">
    <nav class="breadcrumb" aria-label="Breadcrumb, example">
      <ol class="small-text">
        <li><a class="link" href="/plants">Plants</a></li>
        <li aria-current="page">Ferns</li>
      </ol>
    </nav>
    <button type="button" class="button button--sm">Edit</button>
  </div>
</div>
```
Two bars in one `<header>`, with a rule between them. One landmark, one band.

## Three Columns over a Sidebar
```html live
<div class="header header--flush header--stretch">
  <div class="header__bar">
    <div class="split split--three @3xl:split--sidebar">
      <a href="/" class="brand"><span class="brand__name">Woodland Plants</span></a>
      <form role="search" aria-label="Plants, three columns example">
        <input type="search" class="input input--subtle inline-size-full" placeholder="Search plants" aria-label="Search plants">
      </form>
      <div class="cluster cluster--end">
        <button type="button" class="button">Sign in</button>
      </div>
    </div>
  </div>
</div>
```
In an app with a [Sidebar](34-sidebar.md), the ends of the bar can be as wide as the Sidebar and the centre as wide as the main, so the search or navigation sits over the content it serves. `--flush` takes away the band's inline padding (the safe areas stay) and the bar's block padding (its height stays), and the [Split](19c-split.md)'s end panes pad like the Sidebar instead, so the Brand lines up with the Sidebar's content. `@3xl:split--sidebar` gives the ends the app's sidebar column from 48em, where the Sidebar sits beside the main; narrower, the Split wraps as usual. A compact region narrows the Sidebar and the ends together, so put the density on the region (`.fine:ui-compact` on the app), not `--compact` on the Header alone.

## Do and Don't
| Do | Don't |
| :--- | :--- |
| Use one `<header>` per page, with the Skip Link before it. | Label the banner with `aria-label`. |
| Use two `__bar`s for two rows. | Add a second header, or a wrapper around the bars. |
| Raise `--header-bar-min-size` for a taller header. | Size the Header from `--header-height`. |
| Swap the navigation for a menu Button with `@max-3xl:hide` and `@3xl:hide`. | Hide the navigation with nothing in its place. |
| Put `.color-scheme-dark` on the band for a dark header. | Build a layout inside it with a Wrapper and padding utilities. |

## Reference
The band at the top of a page or app that holds the Brand, the main navigation and global actions. An organism: the Header draws the band (surface, border, sticky, translucency) and lays out its rows; what's in a row (a Brand, a Tab List, Buttons, a Breadcrumb) styles itself.

## Options
| Axis | Modifiers (on `.header`) | Flag |
| :--- | :--- | :--- |
| Prominence | default (surface and bottom border), `--plain`, `--translucent` | none |
| Density | default, `--compact`, `max-md:header--compact` | `--ui-sizing: compact` |
| Placement | in flow, `--sticky` | none |
| Width | bars capped at the site width (default), `--stretch` (no cap) | none |
| Inset | padded (default), `--flush` (no inline padding but the safe areas, no block padding on the bars) | none |

### Further rules
- **`.header`** is the band: always full width. Its inline padding (`--header-padding-inline`, plus the safe-area insets) keeps the bars off the screen edge, the way a Wrapper's gutter does.
- **`.header__bar`** is a row. It is capped at `--header-max-width` (the site width) and centred, so its content lines up with a `.wrapper`'s. Its content is at least `--header-bar-min-size` tall (the target size, which fine-pointer targets don't change; `--header-compact-bar-min-size` when compact), plus its block padding. Raise `--header-bar-min-size` for a taller header: `--header-height` is built from it, so the offsets follow. Never size the Header from `--header-height`; that is the height things that clear the Header read, and a script that measures the Header into it would loop.
- **The Brand** is a [`.brand`](06d-brand.md): the mark and name, as a Link home.
- **`.header__nav`** takes the free space and can shrink, so a scrollable Tab List fits. The bar's last part always sits at the end.
- **A Split in a bar** takes the whole bar, with its panes centred on the block axis. In a `--flush` Header its first and last panes pad by the cushion, as the Sidebar does.
- `--sticky` pins the Header to the top of the scrolling page. Its shadow shows only while it is stuck (a scroll-state query); browsers without one keep the border.
- A gallery of headers on one page uses `<div class="header">` so there is still only one banner.

## Prominence, Density and Colour
```html live
<div class="header header--plain">
  <div class="header__bar">
    <a href="/" class="brand"><span class="brand__name">Plain</span></a>
    <button type="button" class="button">Sign in</button>
  </div>
</div>

<div class="header header--translucent">
  <div class="header__bar">
    <a href="/" class="brand"><span class="brand__name">Translucent</span></a>
    <button type="button" class="button">Sign in</button>
  </div>
</div>

<div class="header header--compact">
  <div class="header__bar">
    <a href="/" class="brand"><span class="brand__name">Compact</span></a>
    <button type="button" class="button">Sign in</button>
  </div>
</div>
```
- `--plain`: no surface and no border, for a Header over a hero or a page that draws its own edge.
- `--translucent`: the content scrolls under a see-through surface with a blur. Solid under more contrast.
- `--compact`: the bar's padding steps down, and it sets `--ui-sizing: compact`, so the Buttons and text inside step down too (an app toolbar). The bar stays at least `--header-compact-bar-min-size` tall, the pointer's minimum target, so the Buttons' 48px hit areas stay inside the band on a touch screen: 56px instead of 64px. It is shorter only where the product has opted into fine-pointer targets (`--spacing-target-min: var(--spacing-target-sm)` on `:root` inside `@media (pointer: fine)`), where the band is 40px. `max-md:header--compact` does the same below 48rem only, for a Header that tightens on a phone.
- A sticky compact header sets `--header-height` to `--header-compact-height`, so scroll padding and sticky panes follow. (A product that loads its tokens in a later cascade layer than its components repeats that rule in the tokens' layer.)
- A dark header is `.color-scheme-dark` on the band; an inverted one is `.color-palette-inverted`.
