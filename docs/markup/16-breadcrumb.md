---
title: Breadcrumb
tier: molecule
summary: The trail of pages above the current one, as a line of links.
tokens: breadcrumb
storybook: molecules-breadcrumb
related: [link-block-link, navigation-tree, pagination-page-count, stepper]
---

# 16. Breadcrumb
```html live
<nav class="breadcrumb" aria-label="Breadcrumb">
  <ol class="small-text">
    <li><a class="link" href="/topics">Topics</a></li>
    <li><a class="link" href="/topics/visual-design">Visual design</a></li>
    <li aria-current="page">Modular scale</li>
  </ol>
</nav>
```

## Why it exists
People land deep in a site from a search or a shared link, with no idea where they are. A Breadcrumb answers that at a glance: it shows where the page sits and gives a way up each level.

It is an ordered list of links in a `<nav>`, because that is what a trail is, and a screen reader can find the landmark and follow the order. The separators are generated with empty alternative text, so nobody has to hear "slash" between links.

There's little to change, so it has no modifiers. The current page isn't bold, which keeps the trail's width steady, and type comes from a text atom on the list.

## When to use
- **On pages deep in a hierarchy,** to show where a page sits and to go back up.
- **Not a Stepper:** a trail has no order of tasks. Steps in a task are a [Stepper](30-stepper.md).
- **Not for moving through one list:** that is [Pagination](17-pagination-page-count.md).
- **Not for moving around a site or a page:** that is a [Navigation Tree](16b-navigation-tree.md).

## Rules
- **Current page** is the last item, with `aria-current="page"`. It is plain text in the foreground colour (not bold, so the trail keeps its width), or a Link when the page links to itself.
- **Separators** are generated after every item but the last, with empty alternative text (`content: "/" / ""`), so screen readers skip them. Change the character with `--breadcrumb-separator`.

## Keyboard and screen readers
The links behave as links, so there's nothing to script.
- **Tab** moves through the links in order, and **Enter** follows one. A current page in plain text isn't a stop.
- **A screen reader** finds the `<nav>` by its `aria-label`, hears "current page" from `aria-current`, and skips the separators.

## Current Page as a Link
```html live
<nav class="breadcrumb" aria-label="Breadcrumb with a linked current page">
  <ol class="small-text">
    <li><a class="link" href="/settings">Settings</a></li>
    <li><a class="link" href="/settings/team">Team</a></li>
    <li><a class="link" href="/settings/team/permissions" aria-current="page">Permissions</a></li>
  </ol>
</nav>
```
A page that links to itself keeps the same `aria-current`, and gives people a way to reload it.

## Another Separator
```html live
<nav class="breadcrumb" aria-label="Breadcrumb with another separator" style="--breadcrumb-separator: '›';">
  <ol class="small-text">
    <li><a class="link" href="/topics">Topics</a></li>
    <li aria-current="page">Colour</li>
  </ol>
</nav>
```

## Do and Don't
| Do | Don't |
| :--- | :--- |
| Mark the last item with `aria-current="page"`. | Show the current page in bold, or with `.is-current`. |
| Put a text atom on the list. | Set a font size on the Breadcrumb. |
| Change the character with `--breadcrumb-separator`. | Type separators into the markup, where screen readers read them. |
| Use a Stepper for the stages of a task. | Use a trail where the order is a sequence of tasks. |

## Reference
The trail of ancestors of the current page: a line of links ending in the current page. The Breadcrumb lays out the trail and draws the separators; type comes from a text atom on the list, and the links are `.link` atoms.

## Options
| Block | Options | Hooks |
| :--- | :--- | :--- |
| `.breadcrumb` | No modifiers. Type comes from a text atom on the list | `--breadcrumb-separator` |

### Further rules
- **Links** are plain `.link`s. The Breadcrumb sets `--link-prominence: plain`: link colour, underlined on hover and focus.
- **Type:** put a text atom on the list, usually `.small-text`. The Breadcrumb sets none.

## Trail
```html live
<nav class="breadcrumb" aria-label="Breadcrumb trail">
  <ol class="small-text">
    <li><a class="link" href="/topics">Topics</a></li>
    <li><a class="link" href="/topics/visual-design">Visual design</a></li>
    <li aria-current="page">Modular scale</li>
  </ol>
</nav>
```
