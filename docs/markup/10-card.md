# 10. Card

A surface with named parts. The card draws its frame and the geometry of its parts; typography comes from the text atoms, and whatever goes in the body is content. Card is a molecule: dialog and popover compose it. The audit is in `docs/audit/surfaces.md`.

| Axis | Values | Flag |
| :--- | :--- | :--- |
| Prominence | default (card surface and quiet border), `--strong` (raised: shadow, for floating cards), `--subtle` (tint, no border), `--plain` (no surface, border or shadow; keeps padding) | `--card-prominence` |
| Density | default, `--compact` | `--ui-sizing: compact` |

- **Structure:** parts (`__thumb`, `__header`, `__band`, `__body`, `__footer`) are direct children of `.card`, and each pads itself. `.card__content` wraps parts only beside a `__thumb` in a row card (`--card-dir: row`).
- **Material:** `--translucent` combines with any prominence that has a fill.
- **Rules and bands:** `--ruled` rules between parts, bands included. `.card__band` is a full-width strip between parts; `--subtle` tints it.
- **Flush parts:** `__header--flush`, `__body--flush`, `__footer--flush` drop the part's padding. A flush body hands the card's padding to a flush tab list.
- **Flags** are set on a container, never on the card. Dialog and popover set `--card-prominence: strong`. A card resets the flag for cards nested inside it; a modifier on the card beats the flag.
- **Responsive:** `@max-2xl:card--plain` (below 42rem) and `@max-md:card--plain` (below 28rem) drop the frame while the nearest size container is narrow. They need an ancestor with `container-type: inline-size` (`.container-inline`, `.split`, `.sidebar`); without one the card keeps its look.
- **Linked card:** a `.link.link--plain.link--stretched` in the title makes the whole card the target. The focus ring is drawn on the card's perimeter and other controls are lifted above the link.
- **Scrolling:** `.card__body--scrollable` scrolls the body between a pinned header and footer (the card fills a definite container height). `.card--scrollable` scrolls the whole card. Make the scroll region focusable (`tabindex="0"`) and name it.
- **Loading:** a card with `aria-busy="true"`, a `role="status"` message and skeleton shapes (§26).
- **Typography:** use text atoms on titles and body copy (`.heading`, `.text`, `.small-text`). The card hooks never set type.

## A. Linked Card with Media
```html
<article class="card">
  <div class="card__thumb">
    <img src="https://example.com/cover.jpg" alt="" loading="lazy" />
  </div>
  <header class="card__header">
    <hgroup class="card__hgroup">
      <h3 class="card__title heading">
        <a href="/articles/my-post" class="link link--plain link--stretched">Article headline</a>
      </h3>
      <p class="card__subtitle small-text">Supporting subtitle</p>
    </hgroup>
  </header>
  <div class="card__body">
    <p class="text">Short summary describing the content.</p>
  </div>
  <footer class="card__footer">
    <time class="small-text text-muted" datetime="2026-09-30">30 September 2026</time>
  </footer>
</article>
```

## B. Prominence, Density and Material
```html
<article class="card">…</article>
<article class="card card--strong">…</article>
<article class="card card--subtle">…</article>
<article class="card card--plain">…</article>
<article class="card card--compact card--ruled">…</article>
<article class="card card--strong card--translucent">…</article>

<!-- Every card in a list, set once on the container -->
<ul class="grid list-none" style="--card-prominence: subtle;">…</ul>

<!-- Plain while its container is narrow -->
<div class="container-inline">
  <article class="card @max-2xl:card--plain">…</article>
</div>
```

## C. Status and Action in the Header
```html
<article class="card">
  <header class="card__header">
    <hgroup class="card__hgroup">
      <h3 class="card__title heading">Security settings</h3>
      <p class="card__subtitle small-text">Two-factor authentication</p>
    </hgroup>
    <span class="status status--success"><span class="status__text">Active</span></span>
  </header>
  <div class="card__body">
    <p class="text">Manage passkeys, hardware tokens and two-factor authentication.</p>
  </div>
  <footer class="card__footer">
    <span class="small-text text-muted">Updated 2 days ago</span>
    <button type="button" class="button button--subtle"><span>Configure</span></button>
  </footer>
</article>
```

The title takes the free space but never shrinks below its longest word. In a narrow card the status or action wraps to the next line instead of running over the title. A `.truncate` title keeps shrinking.

## D. Band
```html
<article class="card card--ruled">
  <header class="card__header">
    <h3 class="card__title heading">Project setup</h3>
  </header>
  <div class="card__band card__band--subtle">
    <span class="status status--accent status--round"><span class="status__text">Step 2 of 4</span></span>
    <div class="button-group buttons-sm buttons-subtle">
      <button type="button" class="button"><span>Back</span></button>
      <button type="button" class="button button--strong button--accent"><span>Proceed</span></button>
    </div>
  </div>
  <div class="card__body">
    <p class="text">Body copy below the band.</p>
  </div>
</article>
```

## E. Header with a Second Line
```html
<article class="card">
  <header class="card__header">
    <hgroup class="card__hgroup">
      <h3 class="card__title heading">Queue and schedule</h3>
      <p class="card__subtitle small-text">8 items queued</p>
    </hgroup>
    <button type="button" class="button button--sm"><span>Auto-balance</span></button>
    <div class="card__header-line cluster cluster--between">
      <input type="search" class="input input--sm" placeholder="Search queued items" aria-label="Search items" />
    </div>
  </header>
  <div class="card__body">…</div>
</article>
```

## F. Panel with a Scrolling Body
```html
<!-- The card fills a definite height (a grid cell, a split pane); only the body scrolls -->
<article class="card card--ruled">
  <header class="card__header"><h2 class="card__title heading">Broadcast queue</h2></header>
  <div class="card__body card__body--flush card__body--scrollable" tabindex="0" aria-label="Queue">
    <div class="table-container">…</div>
  </div>
  <footer class="card__footer">…</footer>
</article>
```

## G. Media Row
```html
<article class="card" style="--card-dir: row;">
  <div class="card__thumb"><img src="https://example.com/thumb.jpg" alt="" /></div>
  <div class="card__content">
    <header class="card__header"><h3 class="card__title heading">Beside the media</h3></header>
    <div class="card__body"><p class="text">Parts beside a thumbnail sit in <code>.card__content</code>.</p></div>
  </div>
</article>
```

## H. Card Grid
```html
<ul class="grid grid--auto-fit grid--xs list-none">
  <li>
    <article class="card">
      <header class="card__header">
        <h3 class="card__title heading"><a href="/post-1" class="link link--plain link--stretched">Card title</a></h3>
      </header>
      <div class="card__body"><p class="text">Card body copy.</p></div>
    </article>
  </li>
</ul>
```
