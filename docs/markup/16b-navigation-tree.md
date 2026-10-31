---
title: Navigation Tree
tier: molecule
summary: Nested links to the sections of a site or a page, such as a docs Sidebar or a table of contents.
tokens: navigation-tree
storybook: molecules-navigation-tree
related: [button, menu, tabs, sidebar, breadcrumb]
---

# 16b. Navigation Tree
```html playground width=md
<nav class="navigation-tree" data-axes aria-label="Documentation">
  <ol>
    <li class="navigation-tree__heading"><h2 class="micro-heading">Guides</h2></li>
    <li><a href="/start" class="button"><span>Getting started</span></a></li>
    <li>
      <a href="/tokens" class="button" aria-current="page"><span>Tokens</span></a>
      <ol>
        <li><a href="/tokens/global" class="button"><span>Global</span></a></li>
        <li><a href="/tokens/semantic" class="button"><span>Semantic</span></a></li>
      </ol>
    </li>
  </ol>
</nav>
---
Guide lines: None, Ruled=navigation-tree--ruled
Density: Default, Compact=navigation-tree--compact
```

## Why it exists
A long site or a long page needs a map that stays put. A Navigation Tree shows the sections, how they nest, and where you are now.

It is links in real nested lists, so the hierarchy is in the markup and a screen reader can follow it. Its items are [Buttons](01-button.md), so they bring their 48px targets and focus ring. The current location has three signs, bold text, a tint and a rail, so it never rests on colour.

Despite the name, it takes no `role="tree"`, which promises arrow-key handling that needs a script. Tab moves through its links like any others.

## When to use
- **For the sections of a site or a page:** a docs Sidebar, a table of contents.
- **Not a Menu:** actions, usually in a Popover, are a [Menu](03b-menu.md).
- **Not a Tab List:** views of one thing are [Tabs](24-tabs.md).
- **Not for the trail above a page:** that is a [Breadcrumb](16-breadcrumb.md).

## Rules
- **Current location:** `aria-current` on the Link: `page` in site navigation, `location` (or `true`) in a table of contents. It shows bold text in the foreground colour, a tint, and a rail inside the Button's inline start. The rail is `--navigation-tree-rail-width` (4px) or the Button's radius, whichever is greater, and its start corners follow the Button's, so it sits flush in the curve. No class.
- **Nesting** is a nested `<ol>` or `<ul>` inside the item's `<li>`. Don't fake depth with classes.
- **Collapsible branches** are not supported yet.

## Keyboard and screen readers
The links behave as links, so the browser provides all of this.
- **Tab** moves through every link in order, and **Enter** follows one. Arrow keys do nothing here.
- **A screen reader** finds the `<nav>` by its name, hears the nested lists as levels, and hears `aria-current` as the current page or location.
- **`aria-current` doesn't move by itself.** The product sets it on the page it renders, or by script if a table of contents follows the scroll.

## Table of Contents
The links in a real table of contents are fragments on the same page (`href="#overview"`).
```html live width=md
<nav class="navigation-tree navigation-tree--ruled navigation-tree--compact" aria-labelledby="example-toc-heading">
  <ol>
    <li class="navigation-tree__heading"><h3 id="example-toc-heading" class="micro-heading">Contents</h3></li>
    <li><a href="/guide#overview" class="button"><span>Overview</span></a></li>
    <li>
      <a href="/guide#markup" class="button" aria-current="location"><span>Markup</span></a>
      <ol>
        <li><a href="/guide#nesting" class="button"><span>Nesting</span></a></li>
      </ol>
    </li>
  </ol>
</nav>
```
Use `location` here because every link goes to a place on one page, and `page` when each link goes to its own page.

## A count on an item
```html live width=md
<nav class="navigation-tree" aria-label="Settings">
  <ol>
    <li>
      <a href="/settings/notifications" class="button">
        <span>Notifications</span>
        <span class="badge badge--sm" aria-hidden="true"><span class="badge__text">3</span></span>
        <span class="sr-only">, 3 unread</span>
      </a>
    </li>
  </ol>
</nav>
```
The Badge is hidden from screen readers, so the count is said in hidden text as well.

## Do and Don't
| Do | Don't |
| :--- | :--- |
| Mark the current item with `aria-current` on its Link. | Add an active class. |
| Nest a real list inside the item's `<li>`. | Fake depth with classes or padding. |
| Put a heading in `.navigation-tree__heading`, holding a text atom. | Give headings an inset of their own. |
| Use a Menu for actions. | Put actions in a Navigation Tree. |
| Say a trailing count in hidden text too. | Leave a count to a Badge hidden from screen readers. |

## Reference
Nested links to the sections of a site or a page: a docs Sidebar, a table of contents. Its items are Buttons, as in the [Menu](03b-menu.md); the tree makes them plain and full width, with their content at the start, and adds nesting, guide lines and the current location.

## Options
| Option | Values |
| :--- | :--- |
| Guide lines | `--ruled` (a line beside each nested list, under the parent's label) |
| Density | `--compact` (sets `--ui-sizing: compact`): 32px rows that keep the Button's 48px hit area unless the product opts into fine-pointer targets |

### Further rules
- **Items** are `<a class="button">` in `<li>`, in regular weight and the muted colour (`--navigation-tree-color`). They keep the Button's targets (48px, or 32px compact or with fine-pointer targets), focus ring and wrapping. A trailing Badge or status sits at the end.
- **Alignment:** everything lines up on the item label's inset (the Button's border and padding). A nested list starts under its parent's label, a ruled tree draws its line there, and headings use the same inset.
- **Headings:** `<li class="navigation-tree__heading">` holding a text atom, as in the Menu, so it lines up with the item labels. A heading that names the whole tree goes there too, with `aria-labelledby` on the `<nav>`.

## Site Navigation
```html live width=md
<nav class="navigation-tree" aria-label="Site navigation example">
  <ol>
    <li class="navigation-tree__heading"><h3 class="micro-heading">Guides</h3></li>
    <li><a href="/start" class="button"><span>Getting started</span></a></li>
    <li>
      <a href="/tokens" class="button" aria-current="page"><span>Tokens</span></a>
      <ol>
        <li><a href="/tokens/global" class="button"><span>Global</span></a></li>
        <li><a href="/tokens/semantic" class="button"><span>Semantic</span></a></li>
      </ol>
    </li>
  </ol>
</nav>
```
