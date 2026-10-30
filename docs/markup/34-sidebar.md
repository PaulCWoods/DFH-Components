# 34. Sidebar
A side panel beside the main content: section navigation, filters, tools. An organism (`organisms/sidebar.css`): the sidebar draws the panel (surface, edge, sticky) and lays out its parts; what's in them (a navigation tree, a tab list, fields) styles itself.

| Axis | Modifiers | Flag |
| :--- | :--- | :--- |
| Prominence | default (surface and an edge), `--floating` (inset, rounded, raised) | none |
| Placement | start (default), `--end`; in flow, `--sticky` | none |
| Width | default (`--sidebar-width`, 18rem, at least `--sidebar-min-width`), `--rail` (`--sidebar-rail-width`, 4.5rem) | none |

## A. Markup
```html
<div class="app__workspace">
  <div class="sidebar sidebar--sticky sidebar--ruled">
    <div class="sidebar__header"><h2 id="groups" class="micro-heading">Plant groups</h2></div>
    <div class="sidebar__body">
      <nav class="navigation-tree" aria-labelledby="groups">
        <ul role="list">
          <li><a href="/perennials" class="button" aria-current="page">Perennials</a></li>
          <li><a href="/ferns" class="button">Ferns</a></li>
        </ul>
      </nav>
    </div>
    <div class="sidebar__footer"><a href="/suggest" class="link small-text">Suggest a plant</a></div>
  </div>
  <main id="main" class="main">…</main>
</div>
```

## B. Parts
- **`__header`**, **`__band`** (a filter field, a segmented tab list), **`__body`**, **`__footer`** (at the bottom). Parts next to each other share the padding between them.
- **`__body`** scrolls when the sidebar has a height (`--sticky`, or in an `.app--viewport` shell), and holds its scroll (`overscroll-behavior: contain`).
- **`__body--flush`** takes the body's inline padding off, so a `.tab-list--flush` runs edge to edge with its labels lined up with the header.
- **`--ruled`** draws a rule between the parts.

## C. Small Screens
The sidebar never becomes a drawer on its own. Either:
- leave it in the workspace, where it stacks above the main below 48em; or
- hide it there (`max-md:hide`) and put the same navigation in a `.dialog--drawer` opened by a menu button in the header:

```html
<button type="button" class="button button--plain button--icon md:hide" commandfor="plant-nav" command="show-modal" aria-haspopup="dialog">
  <span class="sr-only">Plant groups</span><svg class="icon" …><use href="#Navigation"/></svg>
</button>

<dialog id="plant-nav" class="dialog dialog--drawer dialog--start" aria-labelledby="drawer-groups">
  <article class="card">
    <header class="card__header">
      <h2 id="drawer-groups" class="card__title small-heading">Plant groups</h2>
      <button type="button" class="button button--plain button--icon" commandfor="plant-nav" command="close"><span class="sr-only">Close</span>…</button>
    </header>
    <div class="card__body card__body--scrollable">…the same navigation…</div>
  </article>
</dialog>
```
The dialog is modal, keeps focus inside and closes with Escape, with no script. Ids inside the two copies must differ.

## D. Rules
- **Sticky:** pinned beside the scrolling page, as tall as the screen. Below a sticky header it is offset by `--header-height` (4rem by default); set `--header-height` on `:root` if the header is taller.
- **Semantics:** navigation goes in a `<nav>` labelled by the sidebar's heading (or a `<nav class="sidebar" aria-label>` when there is no heading). A filter or tool panel is an `<aside aria-label>` or a `<div>`. Don't nest a `<nav>` in a `<nav>`.
- **Rail:** icon buttons, each with an accessible name; the current one has `aria-current="page"`.
- **Tokens:** `sidebar.bg`, `border-width`, `border-color`, `border-style`, `padding`, `width`, `min-width`, `rail-width`.
- **Removed:** the automatic off-canvas drawer below 48em and `.is-open`; `.sidebar__scroller` (use `__body`); `--flush` (use `__body--flush`); `--right` (use `--end`); `.app__sidebar`; `--site-header-height` and `--sidebar-header-height` (use `--header-height`); its z-index (a sticky sidebar overlaps nothing).
