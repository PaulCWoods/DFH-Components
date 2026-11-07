---
title: Tabs
tier: molecule
summary: A row of Tabs for moving between sections of a site or switching the view of one panel.
tokens: [tab, tab-list, tabbed-content]
storybook: [atoms-tab, molecules-tab-list, organisms-tabbed-content]
related: [button, badge-status-chip-kbd, sidebar, card]
---

# 24. Tabs (Tab Atom, Tab List Molecule & Tabbed Content Organism)
```html playground
<div class="tabbed-content">
  <div class="tab-list" data-axes role="tablist" aria-label="Plant details">
    <button type="button" role="tab" id="default-tab-1" class="tab" aria-selected="true" aria-controls="default-panel-1">
      <span class="tab__text">Care</span>
    </button>
    <button type="button" role="tab" id="default-tab-2" class="tab" aria-selected="false" aria-controls="default-panel-2" tabindex="-1">
      <span class="tab__text">Planting</span>
    </button>
  </div>
  <div id="default-panel-1" role="tabpanel" class="tab-panel" aria-labelledby="default-tab-1" tabindex="0">
    <p>Water weekly in summer and keep out of full sun.</p>
  </div>
  <div id="default-panel-2" role="tabpanel" class="tab-panel" aria-labelledby="default-tab-2" tabindex="0" hidden>
    <p>Plant in autumn, 40cm apart.</p>
  </div>
</div>
---
Style: Underline, Segmented=tab-list--segmented
Prominence: Default, Plain=tab-list--plain
Size: Small=tab-list--sm, Default*
Corners: Rounded, Round=tab-list--round
```

## Purpose
Tabs show one thing at a time and keep the others a click away. They cover two jobs that look alike and behave differently. Moving between pages is a list of links in a `<nav>`, which the browser already handles. Switching panels on one page is `role="tablist"`, which promises arrow keys, and the library ships no script for them. Pick by which job you have, since the look won't tell you.

Selection lives in `aria-selected` or `aria-current`, with no class. What a screen reader announces and what the eye sees come from the same attribute, so they can't disagree.

Every axis sits on the list, because Tabs in a row should match each other. The list draws one indicator and slides it to the selected Tab, so a change of Tab reads as one movement.

## When to use
- **`.tab-list` of links for navigation:** site sections, a sub-nav or a floating dock, where each Tab is a page.
- **`.tabbed-content` for panels of one page,** when people need only one at a time.
- **Not for steps in order:** that is a [Stepper](30-stepper.md).
- **Not for reading several sections together:** an [Accordion](04-accordion.md) keeps them open at once, and plain headings let people scan.
- **Not for an action:** something that changes data is a [Button](01-button.md).

## Rules
- **Selected state is ARIA only:** `aria-selected="true"` in a tablist, `aria-current` (any value but `"false"`) in navigation. No class.
- **Underline is for navigation and sections; segmented switches a view.**
- **Icon-only Tabs:** `.tab--icon`, with the label kept in `.tab__text`. `.hide-labels` on the list, or `--ui-labels: hidden` on a container, collapses labels to icons.
- **Counts:** hide a Badge from assistive technology and spell the count out in visually hidden text.

## Keyboard and screen readers
**Navigation lists of links need none of this.** The browser gives each link its place in the tab order, Enter follows it, and `aria-current` is announced.

For `role="tablist"`, the product supplies the WAI-ARIA Tabs pattern. The examples on this page run a demo of it:
- **Tab** enters the list on the selected Tab only (roving `tabindex`), then moves on to its panel. Each panel has `tabindex="0"`.
- **Left and Right arrows** move between Tabs, or **Up and Down** when vertical.
- **Home and End** go to the first and last Tab.
- **A screen reader** announces each as a Tab, selected or not, from its role and `aria-selected`.

## Navigation
```html live
<nav class="tab-list" aria-label="Repository sections">
  <a href="/repo/code" class="tab" aria-current="page"><span class="tab__text">Code</span></a>
  <a href="/repo/issues" class="tab">
    <span class="tab__text">Issues</span>
    <span class="badge badge--sm" aria-hidden="true"><span class="badge__text">14</span></span>
    <span class="sr-only">, 14 open</span>
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

## Tabbed Content
```html live
<div class="tabbed-content">
  <div class="tab-list" role="tablist" aria-label="Account settings">
    <button type="button" role="tab" id="tab-1" class="tab" aria-selected="true" aria-controls="panel-1">
      <span class="tab__text">Overview</span>
    </button>
    <button type="button" role="tab" id="tab-2" class="tab" aria-selected="false" aria-controls="panel-2" tabindex="-1">
      <span class="tab__text">Security</span>
    </button>
  </div>
  <div id="panel-1" role="tabpanel" class="tab-panel" aria-labelledby="tab-1" tabindex="0">
    <p>Your name, email address and plan.</p>
  </div>
  <div id="panel-2" role="tabpanel" class="tab-panel" aria-labelledby="tab-2" tabindex="0" hidden>
    <p>Your password and signed-in devices.</p>
  </div>
</div>

<!-- Beside the panels: the list becomes vertical -->
<div class="tabbed-content tabbed-content--vertical">
  <div class="tab-list" role="tablist" aria-label="Profile settings">
    <button type="button" role="tab" id="side-tab-1" class="tab" aria-selected="true" aria-controls="side-panel-1">
      <span class="tab__text">Profile</span>
    </button>
    <button type="button" role="tab" id="side-tab-2" class="tab" aria-selected="false" aria-controls="side-panel-2" tabindex="-1">
      <span class="tab__text">Notifications</span>
    </button>
  </div>
  <div id="side-panel-1" role="tabpanel" class="tab-panel" aria-labelledby="side-tab-1" tabindex="0">
    <p>Your photo and a short bio.</p>
  </div>
  <div id="side-panel-2" role="tabpanel" class="tab-panel" aria-labelledby="side-tab-2" tabindex="0" hidden>
    <p>Which emails you receive.</p>
  </div>
</div>
```

## Segmented
```html live
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

## Do and Don't
| Do | Don't |
| :--- | :--- |
| Mark the selected tab with `aria-selected` or `aria-current`. | Add a selected class. |
| Set axes on the list, or a flag on a container. | Put style or size modifiers on a Tab. |
| Supply roving `tabindex` and arrow keys for `role="tablist"`. | Ship a tablist with no keyboard script. |
| Use links in a `<nav>` when each Tab is a page. | Use `role="tablist"` for site navigation. |
| Keep the label in `.tab__text` on an icon-only tab. | Leave an icon tab with no name. |
| Hide a count Badge and spell the count out in hidden text. | Leave a bare number to be read out. |

## Reference
Three tiers that work as one.
1. **`.tab` (atom):** one Tab: a `<button role="tab">` in a tablist, or an `<a>` in navigation. Its only modifier is `.tab--icon`.
2. **`.tab-list` (molecule):** owns every axis of its Tabs and draws one selection indicator that slides to the selected tab (anchor positioning, scoped to the list). It works on its own as site navigation, a sub-nav or a floating dock.
3. **`.tabbed-content` (organism):** lays out a Tab List and its `.tab-panel`s.

## Options
| Axis | List modifiers | Flag |
| :--- | :--- | :--- |
| Style | (underline), `--segmented` | `--tab-list-style` |
| Prominence | (default), `--subtle` (segmented only), `--plain` | `--tab-list-prominence` |
| Size | (default), `--sm` | `--tab-list-size`; a compact container steps to `--sm` |
| Corners | (default), `--round` | `--tab-list-corners` |

Layout modifiers: `--vertical`, `--end` (vertical, on the inline end), `--scrollable` (one row that scrolls, each edge fading while there is more that way; lists wrap by default. The fade is the shared scroll fade, `utilities/scroll-fade.css`, and needs scroll-driven animations; without them the row still scrolls), `--fill`, `--floating` (a layered bar whose corners are concentric with its Tabs: the Tab's corner plus the bar's padding and border; with `--round`, half the Tab height plus the padding and border, never a full pill, so a tall, wrapped or vertical bar keeps gentle corners), `--docked` (fixed to the bottom of the viewport), `--flush`, `--tight`. Organism: `.tabbed-content--vertical` and `--end` put the list beside the panels and make it vertical.

### Further rules
- **Every variant marks the selected tab at 3:1 or more** with a line (underline) or a fill (segmented), plus bold. Plain lists have no rule or border, so the selected tab also takes the accent colour.
- **Hover changes the surface, never the text colour.**
- **Size:** Tabs are 48px in every orientation. `--sm` is 32px with a 48px hit area, unless the product opts into fine-pointer targets. A horizontal list's band is never shorter than the pointer's minimum target, so those hit areas stay inside it: underline Tabs stretch to the band (the indicator still meets the rule), and segmented Tabs sit centred in it. With fine-pointer targets the band is 32px too.
- **Flush:** in a flush Card body or flush Sidebar, `--flush` runs Tabs edge to edge and lines their labels up with the content through `--tab-list-inset`, which those containers set.

## Container Flags
```html live
<!-- Every tab list inside follows; a modifier on a list beats the flag -->
<div style="--tab-list-style: segmented; --tab-list-size: sm;">
  <nav class="tab-list" aria-label="Toolbar views">
    <a href="/board" class="tab" aria-current="page"><span class="tab__text">Board</span></a>
    <a href="/calendar" class="tab"><span class="tab__text">Calendar</span></a>
  </nav>
</div>
```

## Layout
```html live
<!-- One row that scrolls, edges fading while there is more -->
<nav class="tab-list tab-list--scrollable" aria-label="Filters">
  <a href="/plants/all" class="tab" aria-current="page"><span class="tab__text">All plants</span></a>
  <a href="/plants/perennials" class="tab"><span class="tab__text">Perennials</span></a>
  <a href="/plants/ferns" class="tab"><span class="tab__text">Ferns</span></a>
  <a href="/plants/grasses" class="tab"><span class="tab__text">Grasses</span></a>
  <a href="/plants/climbers" class="tab"><span class="tab__text">Climbers</span></a>
  <a href="/plants/bulbs" class="tab"><span class="tab__text">Bulbs</span></a>
</nav>

<!-- Vertical -->
<nav class="tab-list tab-list--vertical" aria-label="Settings pages">
  <a href="/settings/profile" class="tab" aria-current="page"><span class="tab__text">Profile</span></a>
  <a href="/settings/billing" class="tab"><span class="tab__text">Billing</span></a>
</nav>

<!-- Floating bar -->
<nav class="tab-list tab-list--segmented tab-list--round tab-list--floating" aria-label="App sections">
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

## Flush and Docked
```html
<!-- Vertical, flush in a flush sidebar body -->
<div class="sidebar">
  <div class="sidebar__body sidebar__body--flush">
    <nav class="tab-list tab-list--vertical tab-list--flush" aria-label="Settings sections">…</nav>
  </div>
</div>

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
