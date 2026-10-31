---
title: Sidebar
tier: organism
summary: A side panel beside the main content, for section navigation, filters or tools.
tokens: sidebar
storybook: organisms-sidebar
related: [navigation-tree, app-shell, modal-dialog, header, tabs]
---

# 34. Sidebar
```html playground width=md
<div class="sidebar" data-axes>
  <div class="sidebar__header"><h2 id="default-groups" class="micro-heading">Garden areas</h2></div>
  <div class="sidebar__body">
    <nav class="navigation-tree" aria-labelledby="default-groups">
      <ul role="list">
        <li><a href="/perennials" class="button" aria-current="page"><span>Perennials</span></a></li>
        <li><a href="/ferns" class="button"><span>Ferns</span></a></li>
      </ul>
    </nav>
  </div>
  <div class="sidebar__footer"><a href="/suggest" class="link small-text">Suggest a plant</a></div>
</div>
---
Prominence: Default, Subtle=sidebar--subtle, Plain=sidebar--plain, Floating=sidebar--floating
Density: Default, Compact=sidebar--compact
Placement: Start, End=sidebar--end
Rules: None, Between parts=sidebar--ruled
```

## Why it exists
Some things should stay in reach while someone works through a section: its pages, a set of filters, a tool. A Sidebar holds them beside the content, and scrolls them separately when it has a height of its own.

It only draws the panel and lays out its parts. What goes inside styles itself, so section navigation is a [Navigation Tree](16b-navigation-tree.md) and a filter is an ordinary [Field](07b-form-composition.md).

It never turns into a drawer by itself. A panel slid off screen still holds links that focus can reach, and a drawer needs focus handled properly. So on a small screen it either stacks above the main, or the same navigation goes in a [Dialog](02-modal-dialog.md), which the browser makes modal for free.

## When to use
- **For section navigation, filters or tools** that stay beside the main content.
- **In an [App Shell's workspace](19d-app-shell.md)**, which places it and stacks it on small screens.
- **Not for a side pane in a page's content:** that is a [Split](19c-split.md).
- **Not for a drawer:** a Sidebar never becomes one; use a [`.dialog--drawer`](02-modal-dialog.md).

## Rules
- **Semantics:** navigation goes in a `<nav>` labelled by the Sidebar's heading (or a `<nav class="sidebar" aria-label>` when there is no heading). A filter or tool panel is an `<aside aria-label>` or a `<div>`. Don't nest a `<nav>` in a `<nav>`.
- **Rail:** icon Buttons, each with an accessible name; the current one has `aria-current="page"`.
- **Sticky:** pinned beside the scrolling page, as tall as the screen. Below a sticky header it is offset by `--header-height` (4rem by default); set `--header-height` on `:root` if the Header is taller.
- **Two copies, two sets of ids.** The same navigation in a Sidebar and a drawer needs different ids in each.

## Keyboard and screen readers
The Sidebar adds no behaviour of its own, and needs no script.
- **Tab** moves through what's inside in source order. A Sidebar placed before the main comes before it, so the [Skip Link](07-skip-link.md) is what gets people past it.
- **A scrolling body** scrolls as focus moves through its Links. If it holds nothing focusable, give `__body` `tabindex="0"` and a name, so a keyboard can scroll it.
- **A screen reader** names the `<nav>` from the Sidebar's heading and announces the current page from `aria-current="page"`. A rail's names come from each Button's hidden text.
- **In a drawer,** the Dialog provides the rest: focus moves in, the page behind is inert, and Escape closes it and returns focus to the menu Button.

## Beside the Main
In the page, beside the one `<main>`:

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

## On Small Screens: Stack, or a Drawer
The Sidebar never becomes a drawer on its own. Either:
- leave it in the workspace, where it stacks above the main below 48rem; or
- hide it there (`max-md:hide`) and put the same navigation in a `.dialog--drawer` opened by a menu Button in the Header, with `md:hide` on the Button (left off here so that it shows at every width):

```html live cluster
<button type="button" class="button button--plain button--icon" commandfor="plant-nav" command="show-modal" aria-haspopup="dialog">
  <span class="sr-only">Plant groups</span><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Navigation"/></svg>
</button>

<dialog id="plant-nav" class="dialog dialog--drawer dialog--start" aria-labelledby="drawer-groups">
  <article class="card">
    <header class="card__header">
      <h3 id="drawer-groups" class="card__title small-heading">Plant groups</h3>
      <button type="button" class="button button--plain button--icon" commandfor="plant-nav" command="close"><span class="sr-only">Close</span><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Close"/></svg></button>
    </header>
    <div class="card__body card__body--scrollable">
      <nav class="navigation-tree" aria-labelledby="drawer-groups">
        <ul role="list">
          <li><a href="/perennials" class="button" aria-current="page"><span>Perennials</span></a></li>
          <li><a href="/ferns" class="button"><span>Ferns</span></a></li>
        </ul>
      </nav>
    </div>
  </article>
</dialog>
```
The Dialog is modal, keeps focus inside and closes with Escape, with no script. Ids inside the two copies must differ.

## A Rail of Icons
```html live width=md
<nav class="sidebar sidebar--rail" aria-label="Tools, rail example">
  <div class="sidebar__body">
    <ul class="stack gap-xs" role="list">
      <li><a href="/home" class="button button--plain button--icon" aria-current="page"><span class="sr-only">Home</span><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Home"/></svg></a></li>
      <li><a href="/settings" class="button button--plain button--icon"><span class="sr-only">Settings</span><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Settings"/></svg></a></li>
    </ul>
  </div>
</nav>
```

## Do and Don't
| Do | Don't |
| :--- | :--- |
| Label a navigation Sidebar's `<nav>` by its heading. | Nest a `<nav>` in a `<nav>`. |
| Put the same navigation in a `.dialog--drawer` on small screens. | Expect the Sidebar to turn into a drawer. |
| Give the two copies different ids. | Reuse ids between the Sidebar and the drawer. |
| Give each rail Button an accessible name. | Leave a rail of bare icons. |
| Set `--header-height` on `:root` when the Header is taller. | Set a sticky offset on the Sidebar itself. |

## Reference
A side panel beside the main content: section navigation, filters, tools. An organism (`organisms/sidebar.css`): the Sidebar draws the panel (surface, edge, sticky) and lays out its parts; what's in them (a Navigation Tree, a Tab List, fields) styles itself.

## Options
| Axis | Modifiers | Flag |
| :--- | :--- | :--- |
| Prominence | default (surface and an edge), `--subtle` (a tint, no edge), `--plain` (no surface, no edge), `--floating` (inset, rounded, raised) | none |
| Density | default, `--compact` | `--ui-sizing: compact` |
| Placement | start (default), `--end`; in flow, `--sticky` | none |
| Width | default (`--sidebar-width`, 18rem, at least `--sidebar-min-width`), `--rail` (`--sidebar-rail-width`, 4.5rem) | none |

### Further rules
- **Prominence:** `--subtle` sets a panel apart without an edge. `--plain` is for secondary content that needs no panel, such as an "On this page" list. More contrast gives `--subtle` an edge.
- **Tokens:** `sidebar.bg`, `subtle-bg`, `border-width`, `border-color`, `border-style`, `padding`, `width`, `min-width`, `rail-width`.

## Parts
```html live width=md
<div class="sidebar sidebar--subtle sidebar--ruled">
  <div class="sidebar__header"><h3 id="parts-groups" class="micro-heading">Plant types</h3></div>
  <div class="sidebar__band">
    <div class="field">
      <label for="parts-filter" class="field__label label">Filter</label>
      <input id="parts-filter" type="search" class="input" />
    </div>
  </div>
  <div class="sidebar__body">
    <nav class="navigation-tree" aria-labelledby="parts-groups">
      <ul role="list">
        <li><a href="/grasses" class="button"><span>Grasses</span></a></li>
        <li><a href="/bulbs" class="button"><span>Bulbs</span></a></li>
      </ul>
    </nav>
  </div>
  <div class="sidebar__footer"><a href="/suggest" class="link small-text">Suggest a plant</a></div>
</div>
```
- **`__header`**, **`__band`** (a filter field, a segmented Tab List), **`__body`**, **`__footer`** (at the bottom). Parts next to each other share the padding between them.
- **`__body`** scrolls when the Sidebar has a height (`--sticky`, or in an `.app--viewport` shell), and holds its scroll (`overscroll-behavior: contain`).
- **`__body--flush`** takes the body's inline padding off, so a `.tab-list--flush` runs edge to edge with its labels lined up with the Header.
- **`--ruled`** draws a rule between the parts.
