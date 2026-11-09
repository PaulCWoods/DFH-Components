---
title: Telemetry
tier: molecule
summary: A labelled value, such as uptime or listeners, built on a description list.
tokens: telemetry
storybook: molecules-telemetry
related: [badge-status-chip-kbd, card, lockup, progress-meter]
---

# 30. Telemetry
```html playground cluster
<dl class="telemetry" data-axes>
  <dt class="small-text text-muted">Uptime</dt>
  <dd class="small-heading">99.98%</dd>
</dl>
---
Prominence: Default, Subtle=telemetry--subtle, Plain=telemetry--plain
Corners: Rounded, Round=telemetry--round
Layout: Stacked, Inline=telemetry--inline
Density: Default, Compact=telemetry--compact
```

## Purpose
A number means little without its label. HTML already has a structure for that pairing, the description list, so a screen reader keeps each value with its name. Telemetry uses it and adds a surface and a layout, and the type comes from text atoms.

These values often change while someone is looking at them, which is why Telemetry refuses to be a live region. A figure that ticks over every second would talk over everything else. The product announces only the changes that matter.

It stays small on purpose. A large stat with a description is a [Card](10-card.md) holding a Telemetry, so there's no separate KPI component to learn.

## When to use
- **For a labelled value** or a row of them: a dashboard, a status strip, a player's stats.
- **Not for a large stat with a description:** that is a [`.card`](10-card.md) holding a Telemetry.
- **Not for a value within a known range that needs a bar:** a [Meter](25-progress-meter.md) draws it.
- **Not for a Status on its own, with no label:** that is a [status](05-badge-status-chip-kbd.md).

## Rules
- **Not a live region.** Values that tick over every second would flood a screen reader. If a change matters, announce it in a separate `role="status"`.
- **Label** (`dt`): a text atom, with an optional leading icon.
- **Value** (`dd`): a text atom; a unit is a smaller atom inside it. Values use tabular figures.

## Label each value
```html live
<dl class="telemetry-group" aria-label="Station">
  <div class="telemetry">
    <dt class="small-text text-muted">
      <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#User"/></svg>
      Listeners
    </dt>
    <dd class="small-heading">14,820</dd>
  </div>
  <div class="telemetry">
    <dt class="small-text text-muted">Latency</dt>
    <dd class="small-heading">42<span class="small-text">ms</span></dd>
  </div>
</dl>

<!-- One metric -->
<dl class="telemetry">
  <dt class="small-text text-muted">Bitrate</dt>
  <dd class="small-heading">320<span class="small-text">kbps</span></dd>
</dl>

<!-- Items that grow to share the row -->
<dl class="telemetry-group telemetry-group--fill" aria-label="Network">
  <div class="telemetry">
    <dt class="small-text text-muted">Uptime</dt>
    <dd class="small-heading">99.98%</dd>
  </div>
  <div class="telemetry">
    <dt class="small-text text-muted">Errors</dt>
    <dd class="small-heading">3</dd>
  </div>
</dl>

<!-- The icon in a gutter at the start of the box -->
<dl class="telemetry-group" aria-label="Audience">
  <div class="telemetry telemetry--icon-start">
    <dt class="small-text text-muted">
      <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#User"/></svg>
      Followers
    </dt>
    <dd class="small-heading">2,310</dd>
  </div>
</dl>
```

## Trends and states
A trend or state is a plain status in the value, with an icon and signed text, so it is never colour alone. It sits a little apart from the figure (`--telemetry-trend-gap`); a unit stays against it.
```html live
<dl class="telemetry-group" aria-label="Listening">
  <div class="telemetry">
    <dt class="small-text text-muted">Listen hours</dt>
    <dd class="heading">
      128,450
      <span class="status status--plain status--success">
        <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#TrendUp"/></svg>
        +18.2%
      </span>
    </dd>
  </div>
</dl>
```
Pick the intent by meaning, not direction: a rising drop-off rate is `--danger`. Where the sign isn't enough, add hidden text: `<span class="sr-only">up</span>` or "up 12.4% on last week".

## Do and don't
| Do | Don't |
| :--- | :--- |
| Use a description list: `dt` for the label, `dd` for the value. | Rebuild it with `div`s and label classes. |
| Pair a trend with an icon and signed text. | Show a trend in colour alone. |
| Pick the intent by meaning: a rising drop-off rate is `--danger`. | Pick the intent by direction. |
| Announce a change that matters in a separate `role="status"`. | Make a ticking value a live region. |
| Put a large stat with a description in a `.card`. | Look for a KPI Card variant. |

## Reference
A labelled value: "Uptime 99.98%". A molecule built on a description list, so each label is a term and its value the description. The Telemetry draws the surface and lays out the parts; type comes from text atoms.

## Options
| Block | Options | Container flags |
| :--- | :--- | :--- |
| `.telemetry` | `--icon-start`, `--inline`, `--subtle`, `--plain`, `--round`, `--compact` | `--telemetry-icon-placement: start`, `--telemetry-prominence: subtle` or `plain`, `--telemetry-corners: round`, `--ui-sizing: compact` |
| `.telemetry-group` | `--fill` | |

### Further rules
- **No KPI Cards.** A large stat with a description is a `.card` holding a Telemetry.
- **Prominence:** bordered by default; `--subtle` is a tint with no border (the muted surface other subtle components use; under increased contrast and in forced colours it gains its border back); `--plain` has no surface, border or padding.
- **One metric:** `<dl class="telemetry">` with its `dt` and `dd` directly inside.
- **`--fill`** on the group grows each item to share the row, as a Tab List's `--fill` does. Items still wrap when the row is too narrow.
- **`--icon-start`** moves the label's icon into a gutter at the start of the box: 24px (`--telemetry-lead-icon-size`), centred on the label and value. The markup is unchanged; the icon stays in the `dt`, because a `<dl>` item may only hold terms and descriptions. Items without an icon get no gutter. Set `--telemetry-icon-placement: start` on a group or region to do the same for every item in it.

## Prominence and corners
```html live
<dl class="telemetry-group" aria-label="Prominence and corners">
  <div class="telemetry telemetry--subtle">
    <dt class="small-text text-muted">
      Subtle
    </dt>
    <dd class="small-heading">128</dd>
  </div>
  <div class="telemetry telemetry--plain">
    <dt class="small-text text-muted">
      Plain
    </dt>
    <dd class="small-heading">64</dd>
  </div>
  <div class="telemetry telemetry--round">
    <dt class="small-text text-muted">
      Round
    </dt>
    <dd class="small-heading">32</dd>
  </div>
  <div class="telemetry telemetry--compact">
    <dt class="small-text text-muted">
      Compact
    </dt>
    <dd class="small-heading">16</dd>
  </div>
</dl>
```

## Inline
```html live
<div class="header">
  <div class="header__bar">
    <a href="/" class="brand"><span class="brand__name">Station</span></a>
    <dl class="telemetry-group" aria-label="Station, right now">
      <div class="telemetry telemetry--inline telemetry--plain">
        <dt class="small-text text-muted">Listeners</dt>
        <dd class="small-text font-bold">14,820</dd>
      </div>
      <div class="telemetry telemetry--inline telemetry--plain">
        <dt class="small-text text-muted">Latency</dt>
        <dd class="small-text font-bold">42ms</dd>
      </div>
    </dl>
  </div>
</div>
```
`--inline` puts the label beside its value, for when the space calls for it: a site header, a toolbar, a narrow strip. It wraps if it has to. Where there is room, keep the label above the value, which is easier to scan down a set.
