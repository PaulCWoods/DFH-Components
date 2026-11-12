---
title: Card
tier: molecule
summary: A surface with named parts, such as a header, a body and a footer, for one thing a person can read, compare or act on.
tokens: card
storybook: molecules-card
related: [modal-dialog, popover, thumbnail]
---

# 10. Card
```html playground width=md
<article class="card" data-axes>
  <header class="card__header"><h2 class="card__title heading">Shade borders</h2></header>
  <div class="card__body"><p class="text" data-label>Ferns, hostas and hellebores under trees.</p></div>
  <footer class="card__footer"><a href="#when-to-use" class="link small-text">Plant list</a></footer>
</article>
---
Prominence: Default, Strong=card--strong, Subtle=card--subtle, Plain=card--plain
Chrome: Default, Flat=card--flat, Bordered=card--bordered
Intent: Neutral, Accent=card--accent "Selected: ferns, hostas and hellebores.", Danger=card--danger "Failed: the ferns did not survive the frost.", Warning=card--warning "At risk: a late frost is forecast.", Success=card--success "Planted: every bed is finished.", Info=card--info "Note: this border faces north."
Density: Default, Compact=card--compact
```

## Purpose
A Card says that what's inside is one thing, which stands alone and can be compared with others. That is the only reason to draw a box. Content comes first, so most sections of a page need space and a heading, not a Card.

The Card draws a frame and lays out its parts, and nothing else. Type comes from the text atoms, so a Card's title is the same heading as any other, and whatever goes in the body is ordinary content.

Because it is only a surface with parts, Dialog and Popover are built on it. Learn its parts once and you know the inside of all three.

## When to use
- **For one thing among several:** an article in a list, a product, a setting, a dashboard panel. Each Card stands alone and can be compared with the others.
- **Not for every box on a page.** Sections of one page are separated by space and [headings](20-text-heading.md), not Cards. A Card inside a Card usually means one of them should be space instead.
- **Not for a message** (a [Banner](11-banner.md)) **or a modal** (a [Dialog](02-modal-dialog.md), which holds a Card).

## Rules
- **Structure:** parts (`__thumb` or `__canvas` for media, `__header`, `__band`, `__body`, `__footer`) are direct children of `.card`, and each pads itself. `.card__content` wraps parts only beside the media in a row Card (`--card-dir: row`), where the media takes half the width (`--card-thumb-size`) and the parts the rest.
- **Typography:** use text atoms on titles and body copy (`.heading`, `.text`, `.small-text`). The Card hooks never set type.

- **Intent** marks a Card's state: live, selected, current, at risk. The whole border takes the intent colour and a ring outside it doubles the edge, so it reads at a glance; the ring doesn't take space, so a Card changing state doesn't move its content. Wherever the Card has a shadow (`--strong`, a linked Card on hover) the shadow takes the intent colour too, the raised stack mixed 75% towards transparent (`--card-intent-shadow-transparency`); a default Card gains no shadow, and increased contrast drops it as usual. It draws the border at any prominence or chrome (`.card--flat.card--accent` keeps square corners). It is never colour alone (WCAG 1.4.1): the Card says the state in words too, usually with a status of the same intent in the header. Intent is a state, not decoration, so it has no responsive versions.
- **Linked Card:** a `.link.link--plain.link--stretched` in the title makes the whole Card the target. The focus ring is drawn on the Card's perimeter and other controls are lifted above the Link.
- **Scrolling:** `.card__body--scrollable` scrolls the body between a pinned header and footer (the Card fills a definite container height). `.card--scrollable` scrolls the whole Card. Make the scroll region focusable (`tabindex="0"`) and name it.
- **Loading:** a Card with `aria-busy="true"`, a `role="status"` message and [Skeleton shapes](26-skeleton.md).

## Linked Card with media
```html live width=md
<article class="card">
  <div class="card__thumb">
    <img src="/examples/cover.svg" alt="" loading="lazy" />
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

## Keyboard and screen readers
- **A linked Card is one Tab stop:** the Link in its title. Enter follows it. Clicking anywhere on the Card follows it too, but only the title is the Link's name, so a screen reader announces "Article headline, link", not the whole Card.
- **Other controls in a linked Card** are separate Tab stops after the Link, in reading order. Keep them few; each one is a stop on every Card in a grid.
- **Don't wrap the Card in an `<a>`.** Its whole text becomes the link's name, and nothing inside can be a control.
- **A scrolling part** (`__body--scrollable`, `--scrollable`) takes `tabindex="0"` and a name, so keyboard users can reach it and scroll it with the arrow keys.
- **A Card in a list** is an `<li>` or an `<article>` in one, so a screen reader says how many there are.

## Status and action in the header
The title takes the space and pushes what follows it to the end. A one-line title sits on the centre line of a taller action beside it; a longer title or a heading group lines up with the top of the action.

```html live width=md
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

The title takes the free space but never shrinks below its longest word. In a narrow Card the Status or action wraps to the next line instead of running over the title. A `.truncate` title keeps shrinking.

## Do and don't
| Do | Don't |
| :--- | :--- |
| Make the whole Card the Link with one stretched link in the title. | Wrap the Card in an `<a>`, or add a second "Read more" link to the same place. |
| Say a Card's state in words (a Status in the header) as well as its intent colour. | Mark a Card as live or at risk by its border colour alone. |
| Give a Card's image `alt=""` when the title says what it shows. | Repeat the title in the image's `alt`. |
| Use text atoms for the title and body (`.heading`, `.text`). | Size type with the Card's own classes or utilities. |
| Use space and headings to separate sections of one page. | Box every section in a Card. |

## Reference
A surface with named parts. The Card draws its frame and the geometry of its parts; typography comes from the text atoms, and whatever goes in the body is content. Card is a molecule: Dialog and Popover compose it.

## Options
| Axis | Values | Flag |
| :--- | :--- | :--- |
| Prominence | default (Card surface and quiet border), `--strong` (raised: shadow, for floating Cards), `--subtle` (tint, no border), `--plain` (no surface, border or shadow; keeps padding) | `--card-prominence` |
| Chrome | default (the prominence's own edge), `--flat` (no border, corners or shadow; keeps the fill), `--bordered` (a border at any prominence) | `--card-chrome` |
| Intent | neutral (default), `--accent`, `--danger`, `--warning`, `--success`, `--info` (the whole border in the intent colour, with a ring outside it) | `--card-intent` |
| Padding | default, `--flush` (no padding at the Card's edges) | |
| Density | default, `--compact` | `--ui-sizing: compact` |

### Further rules
- **One modifier per axis:** prominence sets the fill, chrome the edge, flush the padding, so they combine: `.card--plain.card--bordered` is an outline, `.card--subtle.card--flat` a square tint, `.card--plain.card--flush` the content alone. Don't put `--flat` and `--bordered` on one Card; they are two values of one axis.
- **Flat** is for a Card that sits in a layout as a panel (a Sidebar pane, a tool column) where an edge and corners would box it in. Under increased contrast it gains a 2px border, like every Card but a plain one.
- **Flush** drops the padding at the Card's edges for content that brings its own (a Table, an image, a nested layout). The gaps between parts stay. A single part can go flush instead with `__body--flush` and the like.
- **Material:** `--translucent` combines with any prominence that has a fill. It turns solid when the user asks for more contrast or reduced transparency.
- **Canvas:** `.card__canvas` takes `.card__thumb`'s place for media that isn't one image: a carousel, a demo, a chart. It sits on the Card's surface with the Card's padding, so its content needs no frame of its own; `p-0` lets the content run to the edge. Put a carousel's own label and keyboard access on the scrolling element inside it.
- **Bleed:** `.card__bleed`, a direct child of `__header`, `__band`, `__body` or `__footer`, or of the Card itself (with or without parts), runs a row to the Card's edges while its content starts in line with the rest of the Card (it takes the Card's padding out at each side and puts it back inside). Add `--scrollable` for a row that scrolls sideways (filters, swatches, thumbnails): it scrolls with the shared scroll fade, and pads itself above and below so small controls' hit areas aren't clipped. A scrolling row of things that can't take focus is a `role="region"` with `tabindex="0"` and a name, so keyboard users can scroll it. Put a list inside the bleed rather than the class on the list: a list in a [Cluster](22-stack-inline-cluster.md) resets its own margin and padding, which would cancel the bleed. In print the row wraps. In a flush part it does nothing, since there's no padding to reach past.
- **Rules and bands:** `--ruled` rules between parts, bands included. `.card__band` is a full-width strip between parts; `--subtle` tints it.
- **Flush parts:** `__header--flush`, `__body--flush`, `__footer--flush` drop the part's padding. A flush body hands the Card's padding to a flush Tab List.
- **Flags** are set on a container, never on the Card. Dialog and Popover set `--card-prominence: strong`; `--card-chrome: flat` or `bordered` sets the edge of every Card inside, `--card-intent` their intent. A Card resets the flags for Cards nested inside it. A modifier on the Card beats a flag on its own axis only: `--card-intent: danger` still draws its border on a `.card--plain`. `--card-scroll: all` scrolls every Card inside, as `--scrollable` does one.
- **Width:** a Card is a size container, so it has no width of its own. A Card in a column [Stack](22-stack-inline-cluster.md) stays full width even when it's aligned (`self-start`, `--align-items`); give it a `max-inline-size` to narrow it. Anywhere else an aligned Card needs a width, or it shrinks to nothing.
- **Responsive:** `@max-2xl:` (below 42rem) and `@max-md:` (below 28rem) versions of `--plain`, `--flat`, `--bordered` and `--flush` apply while the nearest size container is narrow: `@max-md:card--flat @max-md:card--flush` lets a Card run edge to edge on a phone. They need an ancestor with `container-type: inline-size`: `.main`, `.app__workspace`, `.split`, `.sidebar` or `.container-inline`. Without one the Card keeps its look.
- **Sticky header and footer:** in a `.card--scrollable.container-inline-scroll`, `.sticky-shadow` on `__header` and `__footer` pins them, with a shadow only while there is content behind them. It can't work with `.card__body--scrollable`: those parts sit beside the scroller, and a query can't see a sibling's scroll position. Set `scroll-padding-block` on the Card to the parts' height, so a focused element isn't hidden behind them (WCAG 2.4.11).

## Prominence, chrome, intent, padding, density and material
```html
<article class="card">…</article>
<article class="card card--strong">…</article>
<article class="card card--subtle">…</article>
<article class="card card--plain">…</article>
<article class="card card--compact card--ruled">…</article>
<article class="card card--strong card--translucent">…</article>

<!-- Chrome and padding: one modifier per axis -->
<article class="card card--flat">…</article>
<article class="card card--plain card--bordered">…</article>
<article class="card card--plain card--flush">…</article>

<!-- Intent: the state in words too -->
<section class="card card--success" aria-labelledby="deck-a">
  <header class="card__header">
    <h2 id="deck-a" class="card__title heading">Deck A</h2>
    <span class="status status--success"><span class="status__text">On air</span></span>
  </header>
  …
</section>

<!-- Every card in a list, set once on the container -->
<ul class="grid" role="list" style="--card-prominence: subtle;">…</ul>

<!-- Plain while its container is narrow; flat and flush on a phone-width container -->
<div class="container-inline">
  <article class="card @max-2xl:card--plain">…</article>
  <article class="card @max-md:card--flat @max-md:card--flush">…</article>
</div>
```

## Band
```html live width=md
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

## Bleed
A row that scrolls sideways runs to the Card's edges, so it's clear there's more, while its first item lines up with the title.

```html live width=sm
<article class="card">
  <header class="card__header">
    <h3 class="card__title heading">Plants</h3>
    <div class="card__bleed card__bleed--scrollable cluster flex-nowrap buttons-sm" role="group" aria-label="Filter plants">
      <button type="button" class="button" aria-pressed="true"><span>All</span></button>
      <button type="button" class="button" aria-pressed="false"><span>Perennials</span></button>
      <button type="button" class="button" aria-pressed="false"><span>Ferns</span></button>
      <button type="button" class="button" aria-pressed="false"><span>Grasses</span></button>
      <button type="button" class="button" aria-pressed="false"><span>Climbers</span></button>
      <button type="button" class="button" aria-pressed="false"><span>Bulbs</span></button>
    </div>
  </header>
  <div class="card__body"><p class="text">214 plants in stock.</p></div>
</article>
```

## Header with a second line
```html live width=md
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
  <div class="card__body"><p class="text">The queue, below the search.</p></div>
</article>
```

## Panel with a scrolling body
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

## Media row
```html
<article class="card" style="--card-dir: row;">
  <div class="card__thumb"><img src="/examples/thumb.svg" alt="" /></div>
  <div class="card__content">
    <header class="card__header"><h3 class="card__title heading">Beside the media</h3></header>
    <div class="card__body"><p class="text">Parts beside a thumbnail sit in <code>.card__content</code>.</p></div>
  </div>
</article>
```

## Canvas
```html
<article class="card">
  <div class="card__canvas">
    <ul class="grid grid--carousel" role="list" tabindex="0" aria-label="Garden photos">
      <li><img class="thumbnail thumbnail--stretch" style="--thumbnail-aspect: 4 / 3;" src="/examples/thumb.svg" alt="The walled garden in May" /></li>
      <li><img class="thumbnail thumbnail--stretch" style="--thumbnail-aspect: 4 / 3;" src="/examples/thumb.svg" alt="The orchard after pruning" /></li>
    </ul>
  </div>
  <header class="card__header"><h3 class="card__title heading">Where the media is more than an image</h3></header>
  <div class="card__body"><p class="text">The canvas sits where a thumb would and takes any content.</p></div>
</article>
```

## Card Grid
```html live
<ul class="grid grid--auto-fit grid--xs" role="list">
  <li role="listitem" class="contents">
    <article class="card">
      <header class="card__header">
        <h3 class="card__title heading"><a href="/post-1" class="link link--plain link--stretched">Shade borders</a></h3>
      </header>
      <div class="card__body"><p class="text">Ferns, hostas and hellebores under trees.</p></div>
    </article>
  </li>
  <li role="listitem" class="contents">
    <article class="card">
      <header class="card__header">
        <h3 class="card__title heading"><a href="/post-2" class="link link--plain link--stretched">Dry gravel</a></h3>
      </header>
      <div class="card__body"><p class="text">Plants that thrive on a sunny, free-draining slope.</p></div>
    </article>
  </li>
  <li role="listitem" class="contents">
    <article class="card">
      <header class="card__header">
        <h3 class="card__title heading"><a href="/post-3" class="link link--plain link--stretched">Pond edges</a></h3>
      </header>
      <div class="card__body"><p class="text">Marginals for wet, heavy soil.</p></div>
    </article>
  </li>
</ul>
```

## Sticky Header and Footer
```html live width=md
<article class="card card--scrollable container-inline-scroll card--ruled max-h-xs" tabindex="0" aria-label="Sowing notes">
  <header class="card__header sticky-shadow"><h3 class="card__title heading">Sowing notes</h3></header>
  <div class="card__body stack">
    <p class="text">Sow hardy annuals in autumn, in a sheltered spot, and thin them in spring.</p>
    <p class="text">Sow half-hardy annuals under cover in early spring, and plant them out after the last frost.</p>
    <p class="text">Sow perennials as soon as the seed is ripe. Many need a cold winter before they germinate.</p>
    <p class="text">Sow salad leaves little and often, from spring to early autumn, for a steady supply.</p>
  </div>
  <footer class="card__footer sticky-shadow"><span class="small-text text-muted">Updated in September</span></footer>
</article>
```
