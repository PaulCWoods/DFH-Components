# 22. Stack, Inline & Cluster Primitives (1D Layout Flows)

## A. Vertical Stack (.stack)
```html
<div class="stack">
  <div class="card">First Card</div>
  <div class="card">Second Card</div>
</div>
```

## B. Horizontal Inline Flow (.inline / .stack--inline)
```html
<div class="inline">
  <button type="button" class="button">Option 1</button>
  <button type="button" class="button">Option 2</button>
  <button type="button" class="button">Option 3</button>
</div>
```

## C. Cluster Primitive (.cluster)
```html
<div class="cluster">
  <span class="chip"><span class="chip__text">Design Tokens</span></span>
  <span class="status status--success"><span class="status__text">WCAG AAA</span></span>
  <span class="chip chip--subtle"><span class="chip__text">v2.0</span></span>
</div>
```

## D. Modifiers (--tight, --nowrap)
```html
<!-- Zero gap stack -->
<div class="stack stack--tight">
  <div>Item 1</div>
  <div>Item 2</div>
</div>

<!-- Non-wrapping inline row -->
<div class="inline inline--nowrap">
  <span>Tag 1</span>
  <span>Tag 2</span>
</div>
```

