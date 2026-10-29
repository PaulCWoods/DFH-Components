# 19b. Grid & Grid Carousel Primitives (`.grid`, `.grid--carousel`)

## A. Standard Auto-Fill / Auto-Fit Grid
```html
<!-- Fluid Auto-Fit Grid with token min-width (2xs = 8rem, xs = 16rem, sm = 24rem, md = 30rem) -->
<div class="grid grid--auto-fit grid--2xs">
  <div class="card card--compact">Card 1</div>
  <div class="card card--compact">Card 2</div>
  <div class="card card--compact">Card 3</div>
  <div class="card card--compact">Card 4</div>
</div>
```

## B. Grid Carousel (`.grid--carousel` / `.grid-carousel`)
Single-row horizontal scroll-snapping card carousel powered by `display: grid` and `grid-auto-flow: column`. Cards automatically maintain equal height and peek into view to invite horizontal swipe/scroll interaction without breaking to new lines.
```html
<!-- Always-On Snap Carousel -->
<div class="grid grid--carousel">
  <div class="card card--compact card--ruled">Card 1</div>
  <div class="card card--compact card--ruled">Card 2</div>
  <div class="card card--compact card--ruled">Card 3</div>
</div>
```

## C. Responsive Carousel Mode (`max-md:grid--carousel`)
Switches to horizontal snap-scroller below `md` (<= 768px), while expanding into fluid auto-fit wrapping grid on desktop (> 768px).
```html
<div class="grid grid--auto-fit grid--2xs max-md:grid--carousel">
  <div class="card card--compact card--ruled">Metric 1</div>
  <div class="card card--compact card--ruled">Metric 2</div>
  <div class="card card--compact card--ruled">Metric 3</div>
  <div class="card card--compact card--ruled">Metric 4</div>
</div>
```

