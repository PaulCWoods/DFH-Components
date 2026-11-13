---
title: Spinner
tier: atom
summary: An Icon that turns, for work in progress whose result can't be shown yet.
tokens: spinner
storybook: atoms-spinner
related: [icon-icon-box, button, skeleton, progress-meter]
---

# 38. Spinner
```html playground cluster
<svg class="icon spinner" data-axes width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#loader-circle"/></svg>
<p class="text" role="status">Loading plants…</p>
---
Size: Small=icon--sm, Default*, Large=icon--lg
Intent: Default, Accent=icon--accent
```

## Purpose
Some waits can't show what's coming. A search hasn't returned, so nobody knows how many results there will be or what shape they take. A save hasn't finished, so nobody knows yet whether it worked. A Spinner shows that something is happening without promising what.

It's an [Icon](09-icon-icon-box.md) that turns, so it takes the size and colour of the text or control it sits in, and it matches the rest of the icon set.

## When to use
- **For a wait whose result can't be shown yet:** a search, a save, a check.
- **Inside a Button** whose action is in progress: see [Button](01-button.md#show-an-action-in-progress).
- **Not when the layout of what's coming is known:** that is a [Skeleton](26-skeleton.md), which holds the space so nothing moves.
- **Not when the amount left is known:** that is a [Progress](25-progress-meter.md) bar.

## Rules
- **It says nothing.** A Spinner is always `aria-hidden="true"`. Words in a `role="status"` region say what is happening ("Saving…") and how it ended ("Saved"), because a screen reader can't see the turn (WCAG 4.1.3 Status Messages).
- **Reduced motion slows it, never stops it.** A still Spinner looks broken, so it keeps turning slowly. It's small, turns in place and never moves across the page.
- **One per wait.** Several Spinners on one screen say nothing about which wait matters; put one beside the thing that's loading.

## Keyboard and screen readers
- **A screen reader** ignores the Spinner and announces the `role="status"` text when it changes. Put the status region in the page before the wait starts, then change its text, so the change is announced.
- **A region whose content is reloading** takes `aria-busy="true"` until it's done, so a screen reader waits for the update. It recedes while busy, unless it holds Skeletons or a Spinner that already stand in for its content.

## Waiting for content
```html live width=md
<section class="card" aria-busy="true" aria-labelledby="results-title">
  <header class="card__header">
    <h2 id="results-title" class="small-heading">Search results</h2>
  </header>
  <div class="card__body cluster">
    <svg class="icon icon--lg spinner" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#loader-circle"/></svg>
    <p class="text" role="status">Searching the catalogue…</p>
  </div>
</section>
```

## Reloading what's there
The content stays in place and recedes; the status line, outside the busy region, says why.

```html live width=md
<p class="small-text cluster">
  <svg class="icon spinner" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#loader-circle"/></svg>
  <span role="status">Updating watering times…</span>
</p>
<section class="card" aria-busy="true" aria-labelledby="watering-title">
  <header class="card__header">
    <h2 id="watering-title" class="small-heading">Watering</h2>
  </header>
  <div class="card__body">
    <p class="text">Monstera: every 7 days. Fiddle-leaf fig: every 10 days.</p>
  </div>
</section>
```

## Do and don't
| Do | Don't |
| :--- | :--- |
| Say what's happening in a `role="status"` line. | Rely on the Spinner to say anything. |
| Use a Skeleton when you know the layout that's coming. | Spin over a space the content will then push around. |
| Put the Spinner in a busy Button. | Swap the Button's label for a Spinner. |
| Set `aria-busy="false"` and update the status when it's done. | Leave a region busy, or a status that still says "Loading…". |

## Reference
An atom: `.spinner` on an [Icon](09-icon-icon-box.md) holding the `loader-circle` symbol.

## Options
| Block | Options | Tokens |
| :--- | :--- | :--- |
| `.spinner` (on `.icon`) | The Icon's: `--sm`, `--lg`, `--icon-size`, an intent | `--spinner-duration` (one turn), `--spinner-reduced-duration` (one turn under reduced motion) |

### Further rules
- **Turns with `rotate`,** so the Icon's mirroring still applies and the turn runs on the compositor.
- **Its speed reads Tier 1 duration steps,** not the motion roles, because the roles go to 0 under reduced motion.
- **Forced colours:** it is `currentColor`, so it takes the system text colour.
- **In a Button:** hidden until the Button has `.is-busy`, then centred over the Button's contents.
- **Busy regions** (`[aria-busy="true"]`) take `--opacity-muted` and a progress cursor, unless they hold a Skeleton or a Spinner outside a Button.
