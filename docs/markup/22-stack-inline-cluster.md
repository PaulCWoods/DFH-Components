# 22. Stack, Inline & Cluster
One-dimensional flows. Layout primitives (`layout/stack.css`, `layout/inline.css`, `layout/cluster.css`): children don't set their own margins; the flow spaces them.

| Primitive | Direction | Wraps | Cross-axis default |
| :--- | :--- | :--- | :--- |
| `.stack` | Column | – | Stretch |
| `.inline` | Row | No | Centre |
| `.cluster` | Row | Yes | Centre |
| `.inline-responsive--{size}` | Column, a row once its container reaches the size (`xs` 20rem … `7xl` 80rem, the container scale) | No | Stretch, then centre |

| Modifier | On | Effect |
| :--- | :--- | :--- |
| `--tight` | all | No gap |
| `--cushioned` | all | The cushion step |
| `--ruled` | all | A rule in each gap, where `rule` is supported |
| `--between` | inline, cluster | The first and last items at the two ends |
| `--end` | inline, cluster | Items packed to the end |

## A. Markup
```html
<div class="stack">…</div>

<p class="inline gap-xs"><svg class="icon" …></svg><span>Part shade</span></p>

<div class="inline inline--between">
  <h2 class="small-heading">Shade border</h2>
  <button type="button" class="button">Edit</button>
</div>

<ul class="cluster" role="list">
  <li><span class="chip"><span class="chip__text">Shade</span></span></li>
</ul>

<div class="cluster cluster--end">
  <button type="button" class="button">Cancel</button>
  <button type="button" class="button button--strong button--accent">Save</button>
</div>

<div class="container-inline">
  <div class="inline-responsive inline-responsive--2xl">…</div>
</div>
```

## B. Rules
- **Inline or cluster:** `.inline` never wraps, so its last item must be able to shrink (text, a scrolling tab list). Anything that should wrap at narrow widths or large text (actions, tags) is a `.cluster`.
- **Hooks:** `--gap`, `--align-items`, `--justify-content`, set on the element itself. They don't reach nested layouts, so `style="--gap: 0"` on an outer stack leaves an inner stack alone. A gap utility (`gap-xs`) also works and wins.
- **Density:** inside a compact region the gap steps down: the default to the compact step (`spacing.compact`), `--cushioned` to the default.
- **Responsive inline** needs a container ancestor (`.container-inline`, a card, the header, a split); without one it stays a column.
- **Lists:** a list stack, inline or cluster loses its markers, so give it `role="list"`.
- **Rules elsewhere:** `--ruled` is for the primitives. For any other flex or grid container (a button group, a card body), use the `.rule` utility, or `.column-rule` / `.row-rule` for one axis. Gap decorations are progressive enhancement (not yet in Safari or Firefox): the gap alone must still separate the content.
- **Cluster** is `display: flex` and fills its parent; it was `inline-flex`.
- **Removed:** `--display`, `--flex-wrap`, `--direction` and `--justify` hooks; `.inline--between` no longer sets a width (a flex row already fills its parent).
