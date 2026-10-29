# 16. Breadcrumb

The trail of ancestors of the current page: a line of links ending in the current page. The breadcrumb lays out the trail and draws the separators; type comes from a text atom on the list, and the links are `.link` atoms. The audit is in `docs/audit/wayfinding.md`.

- **Current page** is the last item, with `aria-current="page"`. It is plain text in the foreground colour (not bold, so the trail keeps its width), or a link when the page links to itself.
- **Links** are plain `.link`s. The breadcrumb sets `--link-prominence: plain`: link colour, underlined on hover and focus.
- **Separators** are generated after every item but the last, with empty alternative text (`content: "/" / ""`), so screen readers skip them. Change the character with `--breadcrumb-separator`.
- **Type:** put a text atom on the list, usually `.small-text`. The breadcrumb sets none.
- **Not a stepper:** a trail has no order of tasks.

## A. Trail
```html
<nav class="breadcrumb" aria-label="Breadcrumb">
  <ol class="small-text">
    <li><a class="link" href="/topics">Topics</a></li>
    <li><a class="link" href="/topics/visual-design">Visual design</a></li>
    <li aria-current="page">Modular scale</li>
  </ol>
</nav>
```

## B. Current Page as a Link
```html
<li><a class="link" href="/settings/team/permissions" aria-current="page">Permissions</a></li>
```

## C. Another Separator
```html
<nav class="breadcrumb" aria-label="Breadcrumb" style="--breadcrumb-separator: '›';">…</nav>
```
