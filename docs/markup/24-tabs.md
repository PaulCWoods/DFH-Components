# 24. Tabs (Tab Atom, Tab List Molecule & Tabbed Content Organism)
Three tiers that work as one. The audit is in `docs/audit/tab.md`.
1. **`.tab` (atom):** one tab: a `<button role="tab">` in a tablist, or an `<a>` in navigation. Its only modifier is `.tab--icon`.
2. **`.tab-list` (molecule):** owns every axis of its tabs and draws one selection indicator that slides to the selected tab (anchor positioning, scoped to the list). It works on its own as site navigation, a sub-nav or a floating dock.
3. **`.tabbed-content` (organism):** lays out a tab list and its `.tab-panel`s.

| Axis | List modifiers | Flag |
| :--- | :--- | :--- |
| Style | (underline), `--segmented` | `--tab-list-style` |
| Prominence | (default), `--subtle` (segmented only), `--plain` | `--tab-list-prominence` |
| Size | (default), `--sm` | `--tab-list-size`; a compact container steps to `--sm` |
| Corners | (default), `--round` | `--tab-list-corners` |

Layout modifiers: `--vertical`, `--end` (vertical, on the inline end), `--scrollable` (one row that scrolls; lists wrap by default), `--fill`, `--floating`, `--docked` (fixed to the bottom of the viewport), `--flush`, `--tight`. Organism: `.tabbed-content--vertical` and `--end` put the list beside the panels and make it vertical.

- **Selected state is ARIA only:** `aria-selected="true"` in a tablist, `aria-current` (any value but `"false"`) in navigation. No class.
- **Every variant marks the selected tab at 3:1 or more** with a line (underline) or a fill (segmented), plus bold. Plain lists have no rule or border, so the selected tab also takes the accent colour.
- **Underline is for navigation and sections; segmented switches a view.**
- **Hover changes the surface, never the text colour.**
- **Size:** tabs are 48px in every orientation. `--sm` is 32px with a 48px hit area, unless the product opts into fine-pointer targets.
- **Flush:** in a flush card body or flush sidebar, `--flush` runs tabs edge to edge and lines their labels up with the content through `--tab-list-inset`, which those containers set.
- **Keyboard:** for `role="tablist"`, the product supplies the WAI-ARIA tabs pattern: roving `tabindex` (only the selected tab is in the tab order), arrow keys between tabs (up and down when vertical), Home and End. Each panel has `tabindex="0"`. Navigation lists of links need none of this.
- **Icon-only tabs:** `.tab--icon`, with the label kept in `.tab__text`. `.hide-labels` on the list, or `--ui-labels: hidden` on a container, collapses labels to icons.
- **Counts:** hide a badge from assistive technology and spell the count out in visually hidden text.

## A. Navigation
```html
<nav class="tab-list" aria-label="Repository sections">
  <a href="/repo/code" class="tab" aria-current="page"><span class="tab__text">Code</span></a>
  <a href="/repo/issues" class="tab">
    <span class="tab__text">Issues</span>
    <span class="badge badge--sm" aria-hidden="true"><span class="badge__text">14</span></span>
    <span class="visually-hidden">, 14 open</span>
  </a>
  <a href="/repo/pulls" class="tab"><span class="tab__text">Pull requests</span></a>
</nav>

<!-- As a list: <ul> and <li> take display: contents -->
<nav class="tab-list tab-list--plain" aria-label="Site">
  <ul>
    <li><a href="/docs" class="tab" aria-current="page"><span class="tab__text">Docs</span></a></li>
    <li><a href="/components" class="tab"><span class="tab__text">Components</span></a></li>
  </ul>
</nav>
```

## B. Tabbed Content
```html
<div class="tabbed-content">
  <div class="tab-list" role="tablist" aria-label="Account settings">
    <button type="button" role="tab" id="tab-1" class="tab" aria-selected="true" aria-controls="panel-1">
      <span class="tab__text">Overview</span>
    </button>
    <button type="button" role="tab" id="tab-2" class="tab" aria-selected="false" aria-controls="panel-2" tabindex="-1">
      <span class="tab__text">Security</span>
    </button>
  </div>
  <div id="panel-1" role="tabpanel" class="tab-panel" aria-labelledby="tab-1" tabindex="0">…</div>
  <div id="panel-2" role="tabpanel" class="tab-panel" aria-labelledby="tab-2" tabindex="0" hidden>…</div>
</div>

<!-- Beside the panels: the list becomes vertical -->
<div class="tabbed-content tabbed-content--vertical">…</div>
```

## C. Segmented
```html
<div class="tab-list tab-list--segmented tab-list--subtle tab-list--round" role="tablist" aria-label="Billing period">
  <button type="button" role="tab" class="tab" aria-selected="true">
    <span class="tab__text">Monthly</span>
  </button>
  <button type="button" role="tab" class="tab" aria-selected="false" tabindex="-1">
    <span class="tab__text">Annual</span>
    <span class="status status--accent status--sm"><span class="status__text">Save 20%</span></span>
  </button>
</div>

<!-- Icon-only -->
<div class="tab-list tab-list--segmented tab-list--round" role="tablist" aria-label="Editor view">
  <button type="button" role="tab" class="tab tab--icon" aria-selected="true">
    <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Code"/></svg>
    <span class="tab__text">Code</span>
  </button>
  <button type="button" role="tab" class="tab tab--icon" aria-selected="false" tabindex="-1">
    <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Edit"/></svg>
    <span class="tab__text">Design</span>
  </button>
</div>
```

## D. Container Flags
```html
<!-- Every tab list inside follows; a modifier on a list beats the flag -->
<aside class="toolbar" style="--tab-list-style: segmented; --tab-list-size: sm;">…</aside>
```

## E. Layout
```html
<!-- One row that scrolls, edges fading while there is more -->
<nav class="tab-list tab-list--scrollable" aria-label="Filters">…</nav>

<!-- Vertical, flush in a flush sidebar -->
<aside class="sidebar sidebar--flush" aria-label="Settings">
  <div class="sidebar__scroller">
    <nav class="tab-list tab-list--vertical tab-list--flush" aria-label="Settings sections">…</nav>
  </div>
</aside>

<!-- Floating bar docked to the bottom of the viewport -->
<nav class="tab-list tab-list--segmented tab-list--round tab-list--floating tab-list--docked md:hide" aria-label="App">
  <a href="/" class="tab tab--icon" aria-current="page">
    <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Home"/></svg>
    <span class="tab__text">Home</span>
  </a>
  <a href="/search" class="tab tab--icon">
    <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Search"/></svg>
    <span class="tab__text">Search</span>
  </a>
</nav>
```

