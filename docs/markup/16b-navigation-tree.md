# 16b. Navigation Tree

Nested links to the sections of a site or a page: a docs sidebar, a table of contents. Its items are buttons, as in the menu (§3b); the tree makes them plain and full width, with their content at the start, and adds nesting, guide lines and the current location. The audit is in `docs/audit/wayfinding.md`.

| Option | Values |
| :--- | :--- |
| Guide lines | `--ruled` (a line beside each nested list, under the parent's label) |
| Density | `--compact` (sets `--ui-sizing: compact`): 32px rows that keep the button's 48px hit area unless the product opts into fine-pointer targets |

- **Items** are `<a class="button">` in `<li>`, in regular weight and the muted colour (`--navigation-tree-color`). They keep the button's targets (48px, or 32px compact or with fine-pointer targets), focus ring and wrapping. A trailing badge or status sits at the end.
- **Alignment:** everything lines up on the item label's inset (the button's border and padding). A nested list starts under its parent's label, a ruled tree draws its line there, and headings use the same inset.
- **Current location:** `aria-current` on the link: `page` in site navigation, `location` (or `true`) in a table of contents. It shows bold text in the foreground colour, a tint, and a rail inside the button's inline start. The rail is `--navigation-tree-rail-width` (4px) or the button's radius, whichever is greater, and its start corners follow the button's, so it sits flush in the curve. No class.
- **Nesting** is a nested `<ol>` or `<ul>` inside the item's `<li>`. Don't fake depth with classes.
- **Headings:** `<li class="navigation-tree__heading">` holding a text atom, as in the menu, so it lines up with the item labels. A heading that names the whole tree goes there too, with `aria-labelledby` on the `<nav>`.
- **Not a menu** (actions, usually in a popover) and **not a tab list** (views of one thing).
- **Collapsible branches** are not supported yet.

## A. Site Navigation
```html
<nav class="navigation-tree" aria-label="Documentation">
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
```

## B. Table of Contents
```html
<nav class="navigation-tree navigation-tree--ruled navigation-tree--compact" aria-labelledby="toc-heading">
  <ol>
    <li class="navigation-tree__heading"><h2 id="toc-heading" class="micro-heading">On this page</h2></li>
    <li><a href="#overview" class="button"><span>Overview</span></a></li>
    <li>
      <a href="#markup" class="button" aria-current="location"><span>Markup</span></a>
      <ol>
        <li><a href="#nesting" class="button"><span>Nesting</span></a></li>
      </ol>
    </li>
  </ol>
</nav>
```

## C. Trailing Status or Count
```html
<li>
  <a href="/settings/notifications" class="button">
    <span>Notifications</span>
    <span class="badge badge--sm" aria-hidden="true"><span class="badge__text">3</span></span>
    <span class="visually-hidden">, 3 unread</span>
  </a>
</li>
```
