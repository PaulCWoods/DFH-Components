# 30. Telemetry
A labelled value: "Uptime 99.98%". A molecule built on a description list, so each label is a term and its value the description. The telemetry draws the surface and lays out the parts; type comes from text atoms. The audit is in `docs/audit/identity-values.md`.

| Block | Options | Container flags |
| :--- | :--- | :--- |
| `.telemetry` | `--icon-start`, `--inline`, `--plain`, `--round`, `--compact` | `--telemetry-icon-placement: start`, `--telemetry-prominence: plain`, `--telemetry-corners: round`, `--ui-sizing: compact` |
| `.telemetry-group` | `--ruled` | |

## A. Group
```html
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
```
- **Label** (`dt`): a text atom, with an optional leading icon.
- **Value** (`dd`): a text atom; a unit is a smaller atom inside it. Values use tabular figures.
- **One metric:** `<dl class="telemetry">` with its `dt` and `dd` directly inside.
- **`--ruled`** on the group makes one bordered strip with a divider between items.
- **`--icon-start`** moves the label's icon into a gutter at the start of the box: 24px (`--telemetry-lead-icon-size`), centred on the label and value. The markup is unchanged; the icon stays in the `dt`, because a `<dl>` item may only hold terms and descriptions. Items without an icon get no gutter. Set `--telemetry-icon-placement: start` on a group or region to do the same for every item in it.

## B. Trends and States
A trend or state is a plain status in the value, with an icon and signed text, so it is never colour alone.
```html
<div class="telemetry">
  <dt class="small-text text-muted">Listen hours</dt>
  <dd class="heading">
    128,450
    <span class="status status--plain status--success">
      <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#ArrowUp"/></svg>
      +18.2%
    </span>
  </dd>
</div>
```
Pick the intent by meaning, not direction: a rising drop-off rate is `--danger`. Where the sign isn't enough, add hidden text: `<span class="sr-only">up</span>` or "up 12.4% on last week".

## C. Rules
- **Not a live region.** Values that tick over every second would flood a screen reader. If a change matters, announce it in a separate `role="status"`.
- **No KPI cards.** A large stat with a description is a `.card` holding a telemetry.
- **Removed:** `.telemetry__icon`, `__content`, `__label`, `__value`, `__unit`, `__trend`, `__status`, `[data-trend]`, `[data-status]`, the telemetry intents; `--pill` (use `--round`), `--subtle` (use `--plain`), `--bordered` (the default), `--sm` (use `--compact`), `--stacked` (the default), `--icon-end`, `--card`; `--telemetry-variation`, `--telemetry-density`; `.telemetry-strip` (use `.telemetry-group--ruled`); `.stat-pill`.
