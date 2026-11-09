---
title: Stepper
tier: molecule
summary: The steps of one task, showing which are done, which is current and which are left.
tokens: stepper
storybook: molecules-stepper
related: [breadcrumb, pagination-page-count, navigation-tree, progress-meter]
---

# 30. Stepper
```html playground
<ol class="stepper" data-axes aria-label="Plot application">
  <li class="stepper__item is-complete">
    <div class="stepper__step">
      <span class="stepper__indicator" aria-hidden="true"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Check"/></svg></span>
      <span class="stepper__title small-heading"><span class="sr-only">Completed: </span>Details</span>
    </div>
  </li>
  <li class="stepper__item" aria-current="step">
    <div class="stepper__step">
      <span class="stepper__indicator micro-heading" aria-hidden="true">2</span>
      <span class="stepper__title small-heading"><span class="sr-only">Current: </span>Agreement</span>
    </div>
  </li>
  <li class="stepper__item">
    <div class="stepper__step">
      <span class="stepper__indicator micro-heading" aria-hidden="true">3</span>
      <span class="stepper__title small-heading">Payment</span>
    </div>
  </li>
</ol>
---
Orientation: Row, Vertical=stepper--vertical
Prominence: Default, Plain=stepper--plain
Density: Default, Compact=stepper--compact
```

## Purpose
A long task is easier to finish when you can see where you are and how much is left. A Stepper shows that and nothing more. It doesn't run the task, keep track of it or decide what's allowed next.

It is an ordered list, because the order is what it means. Its look says which steps are done, but the indicator is hidden from assistive technology, so each title starts with its state in words. The check and warning icons do the same job on screen, so state is never colour alone.

A step is only a Link or Button if someone can really go there. Most steps can't be revisited, so a Stepper is plain text unless you say otherwise, and it only becomes navigation when its steps are links.

## When to use
- **For the steps of one task,** such as a checkout, a registration or a set-up guide.
- **Not a Breadcrumb** (ancestors of a page): that is a [Breadcrumb](16-breadcrumb.md).
- **Not Pagination** (pages of one list): that is [Pagination](17-pagination-page-count.md).
- **Not for a bare percentage:** a [progress bar](25-progress-meter.md) says how far a task has got without naming its steps.

## Rules
- **Step element:** a `<div>`; an `<a>` when the step is a page the user may revisit; a `<button>` in an in-page wizard (disable steps not yet reachable). Wrap the list in a `<nav>` only when its steps are links. Interactive steps have the focus ring and at least a 48px target.
- **State:** `aria-current="step"` on the current item; `.is-complete` and `.is-invalid` on others. No `.is-active`.
- **Never colour alone (WCAG 1.4.1):** the indicator is `aria-hidden`, so each title starts with its state in hidden text ("Completed: ", "Current: ", "Needs attention: "). The indicator shows a check for complete and a warning icon for invalid; numbers otherwise, with `.micro-heading`.

## Keyboard and screen readers
The browser provides all of this. Moving between wizard steps is the product's script.
- **Plain steps** can't be focused, since there's nothing to operate.
- **Tab** reaches linked steps and enabled `<button>` steps. **Enter** follows a link, and **Enter or Space** presses a Button.
- **A disabled `<button>` step** can't be focused, so a keyboard user passes over it.
- **A screen reader** reads each title with its state, from the hidden text, and takes the current step from `aria-current="step"`.

## Progress
```html live
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

## Say which step needs attention
```html live
<ol class="stepper" aria-label="Plot agreement">
  <li class="stepper__item is-complete">
    <div class="stepper__step">
      <span class="stepper__indicator" aria-hidden="true"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Check"/></svg></span>
      <span class="stepper__title small-heading"><span class="sr-only">Completed: </span>Details</span>
      <span class="stepper__description small-text">Verified</span>
    </div>
  </li>
  <li class="stepper__item is-invalid">
    <div class="stepper__step">
      <span class="stepper__indicator" aria-hidden="true"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Warning"/></svg></span>
      <span class="stepper__title small-heading"><span class="sr-only">Needs attention: </span>Soil agreement</span>
      <span class="stepper__description small-text">Signature missing</span>
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

## Link only the steps people can revisit
```html live
<nav aria-label="Checkout">
  <ol class="stepper" aria-label="Checkout steps">
    <li class="stepper__item is-complete">
      <a class="stepper__step" href="/checkout/shipping">
        <span class="stepper__indicator" aria-hidden="true"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Check"/></svg></span>
        <span class="stepper__title small-heading"><span class="sr-only">Completed: </span>Shipping</span>
      </a>
    </li>
    <li class="stepper__item" aria-current="step">
      <a class="stepper__step" href="/checkout/payment">
        <span class="stepper__indicator micro-heading" aria-hidden="true">2</span>
        <span class="stepper__title small-heading"><span class="sr-only">Current: </span>Payment</span>
      </a>
    </li>
    <li class="stepper__item">
      <div class="stepper__step">
        <span class="stepper__indicator micro-heading" aria-hidden="true">3</span>
        <span class="stepper__title small-heading">Review</span>
      </div>
    </li>
  </ol>
</nav>
```

## Do and don't
| Do | Don't |
| :--- | :--- |
| Start each title with its state in hidden text. | Leave state to colour or the hidden indicator. |
| Use `aria-current="step"` on the current item. | Add `.is-active`. |
| Use an `<a>` for a page the user may revisit, in a `<nav>`. | Wrap a list of plain steps in a `<nav>`. |
| Disable `<button>` steps not yet reachable. | Let people jump to a step they can't complete. |
| Use `--vertical` in Sidebars and drawers. | Squeeze a row into a narrow column and expect descriptions to show. |

## Reference
The steps of one task: which are done, which is current, which are left. An ordered list of steps, each with an indicator, a title and an optional description; type comes from text atoms on the parts.

## Options
| Option | Values |
| :--- | :--- |
| Orientation | default (a row joined by a track), `--vertical` (a column, for Sidebars and drawers) |
| Prominence | default (the number or icon in a circle), `--plain` (no circle; the number or icon takes the state colour). Flag: `--stepper-prominence` |
| Density | `--compact` (sets `--ui-sizing: compact`; smaller indicators) |

### Further rules
- **Structure:** `<ol class="stepper">` > `<li class="stepper__item">` > `.stepper__step`, which holds `__indicator`, `__title` and an optional `__description`.
- **Narrow rows** (below 34rem) hide the descriptions; the titles keep the state. Density never hides content.

## Vertical, compact and plain
```html live
<ol class="stepper stepper--vertical" aria-label="Set-up guide">
  <li class="stepper__item is-complete">
    <div class="stepper__step">
      <span class="stepper__indicator" aria-hidden="true"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Check"/></svg></span>
      <span class="stepper__title small-heading"><span class="sr-only">Completed: </span>Create an account</span>
    </div>
  </li>
  <li class="stepper__item" aria-current="step">
    <div class="stepper__step">
      <span class="stepper__indicator micro-heading" aria-hidden="true">2</span>
      <span class="stepper__title small-heading"><span class="sr-only">Current: </span>Add your plot</span>
    </div>
  </li>
  <li class="stepper__item">
    <div class="stepper__step">
      <span class="stepper__indicator micro-heading" aria-hidden="true">3</span>
      <span class="stepper__title small-heading">Invite a neighbour</span>
    </div>
  </li>
</ol>

<ol class="stepper stepper--compact" aria-label="Registration steps">
  <li class="stepper__item is-complete">
    <div class="stepper__step">
      <span class="stepper__indicator" aria-hidden="true"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Check"/></svg></span>
      <span class="stepper__title small-heading"><span class="sr-only">Completed: </span>Details</span>
    </div>
  </li>
  <li class="stepper__item" aria-current="step">
    <div class="stepper__step">
      <span class="stepper__indicator micro-heading" aria-hidden="true">2</span>
      <span class="stepper__title small-heading"><span class="sr-only">Current: </span>Agreement</span>
    </div>
  </li>
  <li class="stepper__item">
    <div class="stepper__step">
      <span class="stepper__indicator micro-heading" aria-hidden="true">3</span>
      <span class="stepper__title small-heading">Payment</span>
    </div>
  </li>
</ol>

<ol class="stepper stepper--plain" aria-label="Renewal steps">
  <li class="stepper__item is-complete">
    <div class="stepper__step">
      <span class="stepper__indicator" aria-hidden="true"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Check"/></svg></span>
      <span class="stepper__title small-heading"><span class="sr-only">Completed: </span>Details</span>
    </div>
  </li>
  <li class="stepper__item" aria-current="step">
    <div class="stepper__step">
      <span class="stepper__indicator micro-heading" aria-hidden="true">2</span>
      <span class="stepper__title small-heading"><span class="sr-only">Current: </span>Agreement</span>
    </div>
  </li>
  <li class="stepper__item">
    <div class="stepper__step">
      <span class="stepper__indicator micro-heading" aria-hidden="true">3</span>
      <span class="stepper__title small-heading">Payment</span>
    </div>
  </li>
</ol>
```
