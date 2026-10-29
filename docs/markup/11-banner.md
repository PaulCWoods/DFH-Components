# 11. Banner

One message with an intent, in one row: an optional icon, the body and optional actions. A banner with media, or with a title, body and footer of controls, is a card. An alert is a role on a banner, not a component. `.banner-dock` pins a banner to the page edge (§21) and `.toast` floats one in a corner (§18). The audit is in `docs/audit/announcements.md`.

| Axis | Values | Flag |
| :--- | :--- | :--- |
| Prominence | default (tint and intent border), `--subtle` (tint, no border), `--strong` (filled, inverted text), `--plain` (icon and text only, no padding) | `--banner-prominence` |
| Intent | neutral, `--accent`, `--info`, `--success`, `--warning`, `--danger` | `--banner-intent` |
| Density | default, `--compact` | `--ui-sizing: compact` |
| Corners | default, `--round` (round buttons, frame concentric with them; never a pill) | `--banner-corners: round` |

- **Intent is never colour alone.** A banner with a non-neutral intent starts with an icon, or states its intent in the text.
- **Icon box:** the icon sits in an `.icon-box` (`aria-hidden="true"`). Inside a banner the box is the size of the banner's small buttons, and both align to the start of the row (`--banner-align`; a dock centres them).
- **Structure:** icon, `.banner__body`, then `.banner__action` on one button or on a `.cluster` of them. No other parts.
- **Typography** comes from text atoms: `.text` or `.small-text` for the message, `.text.font-bold` for a title. The banner sets no type.
- **Buttons** inside are small and subtle by default; mark the main one `--strong --accent` if it needs weight.
- **Material:** `--translucent` (opt-in) combines with any prominence that has a fill.
- **Roles:** an in-flow banner takes no role and no `aria-label`. Put `role="status"` (polite) or `role="alert"` (urgent) on a region that is in the page before its message arrives, and insert the banner into it.
- **Dismiss** by setting `hidden`; the banner fades out (at once with reduced motion).

## A. Banner with an Intent and Dismiss
```html
<div class="banner banner--warning">
  <span class="icon-box" aria-hidden="true"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Warning"/></svg></span>
  <div class="banner__body">
    <p class="text">Scheduled maintenance begins tonight at 22:00 UTC.</p>
  </div>
  <button type="button" class="button button--icon banner__action">
    <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Close"/></svg>
    <span class="visually-hidden">Dismiss</span>
  </button>
</div>
```

## B. Neutral
```html
<div class="banner">
  <div class="banner__body"><p class="text">A neutral message needs no icon.</p></div>
</div>
```

## C. Title, Message and Actions
```html
<div class="banner banner--accent">
  <span class="icon-box" aria-hidden="true"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Info"/></svg></span>
  <div class="banner__body">
    <p class="text font-bold">Design system v2.4 is available</p>
    <p class="small-text">Updated tokens and native anchor positioning.</p>
  </div>
  <div class="cluster banner__action">
    <button type="button" class="button"><span>Later</span></button>
    <button type="button" class="button button--strong button--accent"><span>Update</span></button>
  </div>
</div>
```

## D. Prominence, Density, Corners and Material
```html
<div class="banner banner--subtle banner--info">…</div>
<div class="banner banner--strong banner--danger">…</div>
<div class="banner banner--plain banner--warning">…</div>   <!-- inside a card or form -->
<div class="banner banner--compact banner--info">…</div>
<div class="banner banner--round">…</div>
<div class="banner banner--translucent banner--info">…</div>

<!-- Every banner in a region, set once -->
<div class="stack" style="--banner-prominence: subtle; --banner-intent: info;">…</div>
```

## E. A Live Message
```html
<!-- In the page from the start -->
<div role="status" aria-label="Upload status" id="upload-status"></div>

<!-- Inserted when the upload finishes -->
<div class="banner banner--success">
  <span class="icon-box" aria-hidden="true"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Check"/></svg></span>
  <div class="banner__body"><p class="text">Upload complete.</p></div>
</div>
```
