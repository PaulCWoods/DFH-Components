# 30. Stepper

The steps of one task: which are done, which is current, which are left. An ordered list of steps, each with an indicator, a title and an optional description; type comes from text atoms on the parts. The audit is in `docs/audit/wayfinding.md`.

| Option | Values |
| :--- | :--- |
| Orientation | default (a row joined by a track), `--vertical` (a column, for sidebars and drawers) |
| Prominence | default (the number or icon in a circle), `--plain` (no circle; the number or icon takes the state colour). Flag: `--stepper-prominence` |
| Density | `--compact` (sets `--ui-sizing: compact`; smaller indicators) |

- **Structure:** `<ol class="stepper">` > `<li class="stepper__item">` > `.stepper__step`, which holds `__indicator`, `__title` and an optional `__description`.
- **Step element:** a `<div>`; an `<a>` when the step is a page the user may revisit; a `<button>` in an in-page wizard (disable steps not yet reachable). Wrap the list in a `<nav>` only when its steps are links. Interactive steps have the focus ring and at least a 48px target.
- **State:** `aria-current="step"` on the current item; `.is-complete` and `.is-invalid` on others. No `.is-active`.
- **Never colour alone (WCAG 1.4.1):** the indicator is `aria-hidden`, so each title starts with its state in hidden text ("Completed: ", "Current: ", "Needs attention: "). The indicator shows a check for complete and a warning icon for invalid; numbers otherwise, with `.micro-heading`.
- **Narrow rows** (below 34rem) hide the descriptions; the titles keep the state. Density never hides content.
- **Not a breadcrumb** (ancestors of a page) and **not pagination** (pages of one list).

## A. Progress
```html
<ol class="stepper" aria-label="Registration">
  <li class="stepper__item is-complete">
    <div class="stepper__step">
      <span class="stepper__indicator" aria-hidden="true">
        <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Check"/></svg>
      </span>
      <span class="stepper__title small-heading"><span class="sr-only">Completed: </span>Details</span>
      <span class="stepper__description small-text">Verified</span>
    </div>
  </li>
  <li class="stepper__item" aria-current="step">
    <div class="stepper__step">
      <span class="stepper__indicator micro-heading" aria-hidden="true">2</span>
      <span class="stepper__title small-heading"><span class="sr-only">Current: </span>Agreement</span>
      <span class="stepper__description small-text">Sign the plot terms</span>
    </div>
  </li>
  <li class="stepper__item">
    <div class="stepper__step">
      <span class="stepper__indicator micro-heading" aria-hidden="true">3</span>
      <span class="stepper__title small-heading">Payment</span>
      <span class="stepper__description small-text">Sliding scale</span>
    </div>
  </li>
</ol>
```

## B. Invalid Step
```html
<li class="stepper__item is-invalid">
  <div class="stepper__step">
    <span class="stepper__indicator" aria-hidden="true">
      <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Warning"/></svg>
    </span>
    <span class="stepper__title small-heading"><span class="sr-only">Needs attention: </span>Soil agreement</span>
    <span class="stepper__description small-text">Signature missing</span>
  </div>
</li>
```

## C. Linked Steps
```html
<nav aria-label="Checkout">
  <ol class="stepper" aria-label="Checkout steps">
    <li class="stepper__item is-complete">
      <a class="stepper__step" href="/checkout/shipping">
        <span class="stepper__indicator" aria-hidden="true"><svg class="icon" …><use href="#Check"/></svg></span>
        <span class="stepper__title small-heading"><span class="sr-only">Completed: </span>Shipping</span>
      </a>
    </li>
    <li class="stepper__item" aria-current="step">
      <a class="stepper__step" href="/checkout/payment">…</a>
    </li>
    <li class="stepper__item">
      <div class="stepper__step">…</div>
    </li>
  </ol>
</nav>
```

## D. Vertical, Compact and Plain
```html
<ol class="stepper stepper--vertical" aria-label="Set-up guide">…</ol>
<ol class="stepper stepper--compact" aria-label="Registration steps">…</ol>
<ol class="stepper stepper--plain" aria-label="Registration steps">…</ol>
```
