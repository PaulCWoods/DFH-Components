---
title: Banner
tier: molecule
summary: One message with an intent, in one row, with an optional icon and actions.
tokens: banner
storybook: molecules-banner
related: [banner-dock, toast, card, icon-icon-box]
---

# 11. Banner
```html playground
<div class="banner" data-axes>
  <span class="icon-box" aria-hidden="true"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Info"/></svg></span>
  <div class="banner__body">
    <p class="text" data-label>Your changes are saved automatically.</p>
  </div>
  <button type="button" class="button button--icon banner__action">
    <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Close"/></svg>
    <span class="sr-only">Dismiss</span>
  </button>
</div>
---
Intent: Neutral, Accent=banner--accent "New: your plan now includes shared beds.", Info=banner--info "Note: your changes are saved automatically.", Success=banner--success "Saved: every change is safe.", Warning=banner--warning "Warning: maintenance begins tonight at 22:00.", Danger=banner--danger "Failed: your payment did not go through."
Prominence: Default, Subtle=banner--subtle, Strong=banner--strong, Plain=banner--plain
Density: Default, Compact=banner--compact
Corners: Default, Round=banner--round
```

## Why it exists
A page sometimes has to say something about itself: a problem, a change, something about to happen. A Banner says one such thing, in the flow of the page, where it can be read in context.

One message is the limit, and it keeps the Banner honest. Once something needs media, or a title, body and footer of controls, it is a [Card](10-card.md).

An alert isn't a component. What makes a message urgent is how it is announced, and that takes a live region already in the page, so urgency is a role on that region. One Banner serves every case, and a [Banner Dock](21-banner-dock.md) or a [Toast](18-toast.md) only decides where it sits.

## When to use
- **For one message in the flow of a page:** a warning above a Form, a notice in a Card.
- **Not for a site announcement pinned to the page edge:** that is a [Banner Dock](21-banner-dock.md).
- **Not for a passing confirmation in a corner:** that is a [Toast](18-toast.md).
- **Not for media, or a title, body and footer of controls:** that is a [Card](10-card.md).
- **Not for a Field's error:** that is [`.field__error`](07b-form-composition.md).

## Rules
- **Intent is never colour alone.** A Banner with a non-neutral intent starts with an icon, or states its intent in the text.
- **Structure:** icon, `.banner__body`, then `.banner__action` on one Button or on a `.cluster` of them. Actions can instead go in a `.cluster` at the end of the body, under the message. No other parts.
- **Roles:** an in-flow Banner takes no role and no `aria-label`. Put `role="status"` (polite) or `role="alert"` (urgent) on a region that is in the page before its message arrives, and insert the Banner into it.
- **Dismiss** by setting `hidden`; the Banner fades out (at once with reduced motion).

## Keyboard and screen readers
A Banner is static, so the browser has nothing to do until a message arrives or someone dismisses one. Both are the product's script.
- **A live message** is announced only if its region was in the page before the message arrived. `role="status"` waits its turn, and `role="alert"` interrupts.
- **A Banner already in the page** isn't announced. It is read in order, like the rest of the content.
- **Tab** reaches the Buttons in it, in order.
- **Dismissing** hides the Button that has focus, so move focus somewhere sensible first.

## An intent and a way to dismiss it
```html live
<div class="banner banner--warning">
  <span class="icon-box" aria-hidden="true"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Warning"/></svg></span>
  <div class="banner__body">
    <p class="text">Scheduled maintenance begins tonight at 22:00 UTC.</p>
  </div>
  <button type="button" class="button button--icon banner__action">
    <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Close"/></svg>
    <span class="sr-only">Dismiss</span>
  </button>
</div>
```
The icon carries the warning for anyone who can't rely on the colour, and the Dismiss Button keeps a hidden label.

## A title and more than one action
```html live
<div class="banner banner--accent">
  <span class="icon-box" aria-hidden="true"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Info"/></svg></span>
  <div class="banner__body">
    <p class="text font-bold">Design system v2.4 is available</p>
    <p class="small-text">Updated tokens and native anchor positioning.</p>
    <div class="cluster mt-sm">
      <button type="button" class="button"><span>Later</span></button>
      <button type="button" class="button button--strong button--accent"><span>Update</span></button>
    </div>
  </div>
</div>
```
A title is `.text.font-bold`, because the Banner sets no type. Mark the main Button `--strong --accent` only if it needs the weight.

Several actions in the body sit under the message, where they can wrap and the message keeps its width on a small screen. At the side, with `.banner__action`, suits one action, a dismiss Button, or a short message with a pair of icon Buttons.

## A Live Message
```html live
<!-- In the page from the start -->
<div role="status" aria-label="Upload status" id="upload-status"></div>

<!-- Inserted when the upload finishes -->
<div class="banner banner--success">
  <span class="icon-box" aria-hidden="true"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Check"/></svg></span>
  <div class="banner__body"><p class="text">Upload complete.</p></div>
</div>
```
Both parts are shown here at once. In use, the script inserts the Banner into the region.

## Do and Don't
| Do | Don't |
| :--- | :--- |
| Put several actions in the body when the Banner can reach a small screen. | Line several text Buttons up at the side, where they squeeze the message. |
| Start a non-neutral Banner with an icon, or state the intent in the text. | Leave colour to carry the intent. |
| Put the message in a text atom. | Expect the Banner to set type. |
| Put `role="status"` or `role="alert"` on a region already in the page. | Put a role or `aria-label` on an in-flow Banner. |
| Dismiss by setting `hidden`. | Remove it with a dismissing class. |
| Use a Card for media, or a title, body and footer of controls. | Add other parts to a Banner. |

## Reference
One message with an intent, in one row: an optional icon, the body and optional actions. A Banner with media, or with a title, body and footer of controls, is a Card. An alert is a role on a Banner, not a component. `.banner-dock` pins a Banner to the [page edge](21-banner-dock.md) and `.toast` floats one in a [corner](18-toast.md).

## Options
| Axis | Values | Flag |
| :--- | :--- | :--- |
| Prominence | default (tint and intent border), `--subtle` (tint, no border), `--strong` (filled, inverted text), `--plain` (icon and text only, no padding) | `--banner-prominence` |
| Intent | neutral, `--accent`, `--info`, `--success`, `--warning`, `--danger` | `--banner-intent` |
| Density | default, `--compact` | `--ui-sizing: compact` |
| Corners | default, `--round` (round Buttons, frame concentric with them; never a pill) | `--banner-corners: round` |

### Further rules
- **Icon box:** the icon sits in an `.icon-box` (`aria-hidden="true"`). Inside a Banner the box is the size of the Banner's small Buttons, and both align to the start of the row (`--banner-align`; a dock centres them).
- **Typography** comes from text atoms: `.text` or `.small-text` for the message, `.text.font-bold` for a title. The Banner sets no type.
- **Buttons** inside are small and subtle by default; mark the main one `--strong --accent` if it needs weight.
- **Material:** `--translucent` (opt-in) combines with any prominence that has a fill.

## Neutral
```html live
<div class="banner">
  <div class="banner__body"><p class="text">A neutral message needs no icon.</p></div>
</div>
```

## Prominence, Density, Corners and Material
```html live
<div class="banner banner--subtle banner--info">
  <span class="icon-box" aria-hidden="true"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Info"/></svg></span>
  <div class="banner__body"><p class="text">Subtle: a tint with no border.</p></div>
</div>
<div class="banner banner--strong banner--danger">
  <span class="icon-box" aria-hidden="true"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Error"/></svg></span>
  <div class="banner__body"><p class="text">Strong: payment failed, and this needs attention.</p></div>
</div>

<!-- Plain: inside a card or form -->
<div class="banner banner--plain banner--warning">
  <span class="icon-box" aria-hidden="true"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Warning"/></svg></span>
  <div class="banner__body"><p class="text">Plain: icon and text only.</p></div>
</div>

<div class="banner banner--compact banner--info">
  <span class="icon-box" aria-hidden="true"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Info"/></svg></span>
  <div class="banner__body"><p class="text">Compact: less padding and smaller text.</p></div>
</div>
<div class="banner banner--round">
  <div class="banner__body"><p class="text">Round: the frame is concentric with its round buttons.</p></div>
  <button type="button" class="button banner__action"><span>Undo</span></button>
</div>
<div class="banner banner--translucent banner--info">
  <span class="icon-box" aria-hidden="true"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Info"/></svg></span>
  <div class="banner__body"><p class="text">Translucent: the page shows through the fill.</p></div>
</div>

<!-- Every banner in a region, set once -->
<div class="stack" style="--banner-prominence: subtle; --banner-intent: info;">
  <div class="banner">
    <span class="icon-box" aria-hidden="true"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Info"/></svg></span>
    <div class="banner__body"><p class="text">Subtle and info, from the flags on the region.</p></div>
  </div>
</div>
```
