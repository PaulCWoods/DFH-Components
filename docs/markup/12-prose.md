# 12. Prose Primitive (Rich Text & Editorial Layout)

## A. Standard Article Prose
```html
<article class="prose">
  <h1>Main Article Title</h1>
  <p>Editorial paragraph formatted with balanced line-lengths and proportional numbers.</p>
  
  <h2>Section Heading</h2>
  <p>Paragraph containing an <a href="/guide">accessible hyperlink</a> and inline <code>code sample</code>.</p>
  
  <blockquote>
    <p>A memorable editorial blockquote with inset leading accent border.</p>
  </blockquote>

  <ul>
    <li>First key takeaway item</li>
    <li>Second key takeaway item</li>
  </ul>
</article>
```

## B. Code Syntax Block inside Prose
```html
<div class="prose">
  <pre><code>:where(textarea) {
  field-sizing: content;
  min-block-size: 3lh;
}</code></pre>
</div>
```

## C. Figure with Caption
```html
<div class="prose">
  <figure>
    <img src="https://example.com/figure.jpg" alt="Descriptive accessible text" loading="lazy" />
    <figcaption>
      <p>Figure 1: Token architecture and responsive layout.</p>
    </figcaption>
  </figure>
</div>
```

## D. Default Fixed Scale Prose
```html
<!-- By default, .prose enforces fixed scale steps and a locked 1rem vertical rhythm -->
<article class="prose">
  <h1>Fixed Title (Size 5)</h1>
  <p>Body paragraphs fixed to 1rem with locked vertical rhythm.</p>
  <h2>Fixed Section Heading (Size 3)</h2>
  <h3>Fixed Subheading (Size 1)</h3>
</article>
```

## E. Fluid & Container-Adaptive Prose via Sizing Utilities
```html
<!-- Fluid scaling via font-sizing-fluid utility -->
<div class="font-sizing-fluid">
  <article class="prose">
    <h2>Fluid Responsive Section</h2>
    <p>Body copy scales smoothly across viewports via clamp().</p>
  </article>
</div>

<!-- Container-adaptive scaling via font-sizing-cq utility -->
<div class="font-sizing-cq" style="container-type: inline-size;">
  <article class="prose">
    <h2>Container-Adaptive Section</h2>
    <p>Body copy scales seamlessly according to container width via cqi units.</p>
  </article>
</div>
```

## F. Scoped Prose Boundary & Cancellation (`.prose-end`)
```html
<!-- .prose styles children using @scope (:where(.prose)) to (:where(.prose-end)) -->
<!-- Placing .prose-end on any sub-tree cancels prose typography, allowing custom embedded UI -->
<article class="prose">
  <h2>Editorial Section</h2>
  <p>Standard editorial copy formatted by prose.</p>

  <!-- Embedded widget opting out of prose styling -->
  <div class="prose-end">
    <div class="card">
      <p>Content inside .prose-end is free from prose paragraph margins and heading styles.</p>
    </div>
  </div>

  <p>Prose styling resumes for subsequent editorial children.</p>
</article>
```

