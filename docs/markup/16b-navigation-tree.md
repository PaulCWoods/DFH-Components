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

## Purpose
A long site or a long page needs a map that stays put. A Navigation Tree shows the sections, how they nest, and where you are now.

It is links in real nested lists, so the hierarchy is in the markup and a screen reader can follow it. Its items are [Buttons](01-button.md), so they bring their 48px targets and focus ring. The current location has three signs, bold text, a tint and a rail, so it never rests on colour.

Despite the name, it takes no `role="tree"`, which promises arrow-key handling that needs a script. Tab moves through its links like any others.

## When to use
- **For the sections of a site or a page:** a docs Sidebar, a table of contents.
- **Not a Menu:** actions, usually in a Popover, are a [Menu](03b-menu.md).
- **Not a Tab List:** views of one thing are [Tabs](24-tabs.md).
- **Not for the trail above a page:** that is a [Breadcrumb](16-breadcrumb.md).

## Rules
- **Current location:** `aria-current` on the Link: `page` in site navigation, `location` (or `true`) in a table of contents. It shows bold text in the foreground colour, a tint, and a rail inside the Button's inline start. The rail is square, `--navigation-tree-rail-width` (4px) wide, since the tree's items have square corners. No class.
- **Nesting** is a nested `<ol>` or `<ul>` inside the item's `<li>`. Don't fake depth with classes.
- **Collapsible groups:** put the nested list in a `<details>` inside the item, with `open` on the group that holds the current item.
- **Dividers** between groups of items are `<li role="separator" class="divider">`.

## Keyboard and screen readers
The links behave as links, so the browser provides all of this.
- **Tab** moves through every link in order, and **Enter** follows one. Arrow keys do nothing here.
- **A group's summary** opens and closes it with **Enter** or **Space**, and a screen reader hears whether it's expanded. The browser provides both.
- **A screen reader** finds the `<nav>` by its name, hears the nested lists as levels, and hears `aria-current` as the current page or location.
- **`aria-current` doesn't move by itself.** The product sets it on the page it renders, or by script if a table of contents follows the scroll.

## Table of contents
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

## Collapsible groups and dividers
```html live width=md
<nav class="navigation-tree navigation-tree--compact" aria-label="Course lessons">
  <ol>
    <li>
      <a href="/lessons/basics" class="button"><span>Basics</span></a>
      <details open>
        <summary class="button"><span class="sr-only">Lessons in Basics</span></summary>
        <ol>
          <li><a href="/lessons/basics/headings" class="button" aria-current="page"><span>Headings</span></a></li>
          <li><a href="/lessons/basics/links" class="button"><span>Links</span></a></li>
        </ol>
      </details>
    </li>
    <li role="separator" class="divider"></li>
    <li>
      <details>
        <summary class="button"><span>Forms</span></summary>
        <ol>
          <li><a href="/lessons/forms/labels" class="button"><span>Labels</span></a></li>
          <li><a href="/lessons/forms/errors" class="button"><span>Errors</span></a></li>
        </ol>
      </details>
    </li>
  </ol>
</nav>
```
A group with a page of its own keeps its link, and the summary after it is the toggle alone, at the end of the link's row and named in hidden text. A group without a page uses its summary as its item. Open the group that holds the current page, so it's never hidden. A Divider separates groups of items across the tree's width.

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

## Do and don't
| Do | Don't |
| :--- | :--- |
| Mark the current item with `aria-current` on its Link. | Add an active class. |
| Nest a real list inside the item's `<li>`. | Fake depth with classes or padding. |
| Put a heading in `.navigation-tree__heading`, holding a text atom. | Give headings an inset of their own. |
| Use a Menu for actions. | Put actions in a Navigation Tree. |
| Say a trailing count in hidden text too. | Leave a count to a Badge hidden from screen readers. |
| Open the group that holds the current item. | Hide the current item in a closed group. |
| Name a toggle after a link in hidden text ("Lessons in Basics"). | Leave the toggle unnamed, or put the link inside the summary. |

## Reference
Nested links to the sections of a site or a page: a docs Sidebar, a table of contents. Its items are Buttons, as in the [Menu](03b-menu.md); the tree makes them plain and full width, with their content at the start, and adds nesting, guide lines and the current location.

## Options
| Option | Values |
| :--- | :--- |
| Guide lines | `--ruled` (a line beside each nested list, under the parent's label) |
| Density | `--compact` (sets `--ui-sizing: compact`): 32px rows that keep the Button's 48px hit area unless the product opts into fine-pointer targets |
| Parts | `<li role="separator" class="divider">` between groups; `<details>` around a nested list for a collapsible group |

### Further rules
- **Items** are `<a class="button">` in `<li>`, in regular weight and the foreground colour (`--navigation-tree-color`). They keep the Button's targets (48px, or 32px compact or with fine-pointer targets), focus ring and wrapping. A trailing Badge or status sits at the end.
- **Items that aren't links** take the muted colour (`--navigation-tree-muted-color`): a `<span class="button">` for text in the list, such as a course plan shown to someone who can't open it yet, and an unavailable link, `<a role="link" class="button" aria-disabled="true">`, which the Button also dims. Say why it's unavailable in its text, with an icon and hidden text, or nearby.
- **Alignment:** everything lines up on the item label's inset (the Button's border and padding). A nested list starts under its parent's label, a ruled tree draws its line there, and headings use the same inset. In a Card or Sidebar body the tree reaches out to their edges, so the rows span the full width; the inset is never more than their padding, and every item's padding follows it, so the tree never overflows them.
- **Dividers:** the tree places the [Divider](15-divider.md) between its items, with half the label inset above and below, across its width (in a Card or Sidebar, to their edges). Inside a nested list it spans that list.
- **Collapsible groups:** the `<summary class="button">` is a plain item with a plus that closes into a minus at its end, as in the [Accordion](04-accordion.md). After a link (`<li><a class="button">…</a><details>…`), it is a square toggle at the end of the link's row; the link leaves it room. Its name is hidden text that says what it opens. Never put a link inside a summary.
- **Headings:** `<li class="navigation-tree__heading">` holding a text atom, as in the Menu, so it lines up with the item labels. A heading that names the whole tree goes there too, with `aria-labelledby` on the `<nav>`.

## Site navigation
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
