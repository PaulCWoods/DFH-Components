---
title: Field, Fieldset and Form
tier: molecule
summary: What goes around form controls, such as labels, hints, errors, groups of choices and the Form's actions.
tokens: [field, fieldset, choice, choices, form]
storybook: [molecules-field, molecules-fieldset, molecules-choices, organisms-form]
related: [form-controls, button, button-group]
---

# 7b. Form composition: Field, Fieldset, Choices & Form
```html playground
<form class="form" data-axes>
  <div class="field">
    <label for="pg-name" class="field__label label">Your name</label>
    <input id="pg-name" type="text" class="input" autocomplete="name" />
  </div>
  <div class="field">
    <label for="pg-email" class="field__label label">Email address</label>
    <p id="pg-email-hint" class="field__hint small-text">We only use it to reply.</p>
    <input id="pg-email" type="email" class="input" autocomplete="email" aria-describedby="pg-email-hint" />
  </div>
  <fieldset class="fieldset">
    <legend class="fieldset__legend label">How should we reply?</legend>
    <div class="choices">
      <label class="choice"><input type="radio" class="radio-input" name="pg-reply" value="email" checked /><span>By email</span></label>
      <label class="choice"><input type="radio" class="radio-input" name="pg-reply" value="post" /><span>By post</span></label>
    </div>
  </fieldset>
  <div class="form__actions button-group">
    <button type="submit" class="button button--strong button--accent"><span>Send</span></button>
  </div>
</form>
---
Labels: Above, Beside=form--aligned
Density: Default, Compact=form--compact
```

## Purpose
A form is where a misunderstanding costs someone their time, so the words around a control matter as much as the control: what's being asked, why, and how to put it right. These parts give those words a fixed place, in the same order every time.

That order is label, hint, error, control, and it is the order a screen-reader user hears them in. An error comes before its control, so it is heard before the Field is reached, and someone using a magnifier sees it beside the label.

Nothing here writes words for you. "(optional)" goes in the label, written by whoever knows which case is rarer, and an error says how to fix the problem. The Fieldset's legend is the question, so it is read out when someone enters the group.

## When to use
- **A Field** for one control with its label, and its hint or error if it has them. Every text control, select and range sits in one.
- **A Fieldset** for a group answered together: a set of checkboxes or radios, or an address. Its legend is the question.
- **Choices** for the checkboxes or radios in a Fieldset.
- **A Form** for the column of fields and Fieldsets, with its actions at the end.

## Rules
- **Required and optional are written, never generated.** Mark the fewer case in the label, usually `<span class="text-muted">(optional)</span>`. Required controls keep `required`, which screen readers announce.
- **Errors are not alerts.** Link an error to its control with `aria-describedby` and set `aria-invalid="true"`. A script that inserts an error after the page loads may add `role="alert"`; server-rendered errors take no role. Every error starts with a Warning icon, so it is never colour alone.
- **One way to validate.** Either let the browser check the Form (`required`, `type`, `pattern`) and show its own messages, or put `novalidate` on the Form and show the library's errors with an error summary. Never both, or people meet two different messages for one mistake.
- **A failed submit gets an error summary** when the Form has more than one Field: a danger Banner at the top of the Form that counts the problems and links to each Field. Focus moves to it, and the page title starts with "Error:".

## Keyboard and screen readers
The browser provides all of this for native controls. Script only what it can't know, such as where to send focus after a failed submit.
- **Tab** moves between controls. A set of radios is one stop.
- **Space** toggles a Checkbox. **Arrow keys** move between radios and select as they go.
- **Enter** in a single-line Field submits the Form.
- **A screen reader** hears the label, "required" from `required`, the hint and error from `aria-describedby`, and "invalid" from `aria-invalid`. It hears the legend on entering a Fieldset.
- **After a failed submit,** move focus to the error summary (it has `tabindex="-1"`), or to the invalid control when there is only one. Moving focus reads the summary out, so it takes no `role="alert"`. Its links take people to each Field.

## Field
Order: label, hint, error, control. The error comes before the control, so a screen-reader user hears it before reaching the Field and a magnifier user sees it beside the label.
```html live
<div class="field">
  <label for="email" class="field__label label">Email address</label>
  <p id="email-hint" class="field__hint small-text">We only use it to reply.</p>
  <input id="email" type="email" class="input" autocomplete="email" aria-describedby="email-hint" />
</div>

<!-- Error -->
<div class="field">
  <label for="plot" class="field__label label">Plot number</label>
  <p id="plot-error" class="field__error small-text">
    <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Warning"/></svg>
    Enter a plot number, like A-14
  </p>
  <input id="plot" class="input" aria-describedby="plot-error" aria-invalid="true" />
</div>

<!-- Optional -->
<div class="field">
  <label for="phone" class="field__label label">Phone <span class="text-muted">(optional)</span></label>
  <input id="phone" type="tel" class="input" autocomplete="tel" />
</div>

<!-- Header: the label with an output or a link at the other end -->
<div class="field">
  <div class="field__header">
    <label for="reminder" class="field__label label">Watering reminder</label>
    <output for="reminder" class="small-text">Every 3 days</output>
  </div>
  <input id="reminder" type="range" class="range" min="1" max="7" value="3" />
</div>

<!-- Inline: the label beside its control; hint and error drop below -->
<div class="field field--inline">
  <label for="packets" class="field__label label">Seed packets</label>
  <input id="packets" type="number" class="input" min="1" value="2" />
</div>
```

## Fieldset
```html live
<fieldset class="fieldset" aria-describedby="contact-hint">
  <legend class="fieldset__legend label">How should we contact you?</legend>
  <p id="contact-hint" class="fieldset__hint small-text">Choose all that apply.</p>
  <div class="choices">
    <label class="choice"><input type="checkbox" class="checkbox-input" name="contact" value="email" /><span>Email</span></label>
    <label class="choice"><input type="checkbox" class="checkbox-input" name="contact" value="post" /><span>Post</span></label>
  </div>
</fieldset>
```
- A boxed group is a Fieldset inside a `.card`; the Fieldset has no border option.

## Choices
Each `.choice` is a `<label>` holding the box and its text; the whole row is the target. Rows are at least `--spacing-target-min` tall (48px; 32px when the product opts into fine-pointer targets) and only as wide as their text. The box sits centred on the first line.
```html live
<fieldset class="fieldset">
  <legend class="fieldset__legend label">Notifications</legend>
  <div class="choices">
    <label class="choice">
      <input type="checkbox" class="checkbox-input" name="notify" value="email" checked />
      <span class="choice__label">
        Email
        <span class="small-text text-muted">A weekly digest</span>
      </span>
    </label>
    <label class="choice">
      <input type="checkbox" class="checkbox-input" name="notify" value="text" />
      <span>Text message</span>
    </label>
  </div>
</fieldset>

<fieldset class="fieldset">
  <legend class="fieldset__legend label">Delivery</legend>
  <div class="choices choices--inline">
    <label class="choice"><input type="radio" class="radio-input" name="delivery" value="standard" checked /><span>Standard</span></label>
    <label class="choice"><input type="radio" class="radio-input" name="delivery" value="express" /><span>Express</span></label>
  </div>
</fieldset>
```

## Form
```html live
<form class="form">
  <div class="field">
    <label for="reg-name" class="field__label label">Full name</label>
    <input id="reg-name" class="input" autocomplete="name" required />
  </div>
  <div class="field">
    <label for="reg-email" class="field__label label">Email address</label>
    <input id="reg-email" type="email" class="input" autocomplete="email" required />
  </div>
  <fieldset class="fieldset">
    <legend class="fieldset__legend label">Plot size</legend>
    <div class="choices choices--inline">
      <label class="choice"><input type="radio" class="radio-input" name="plot-size" value="half" checked /><span>Half</span></label>
      <label class="choice"><input type="radio" class="radio-input" name="plot-size" value="full" /><span>Full</span></label>
    </div>
  </fieldset>
  <div class="form__actions button-group">
    <button type="submit" class="button button--strong button--accent"><span>Register</span></button>
    <button type="reset" class="button button--subtle"><span>Clear</span></button>
  </div>
</form>
```
- The actions are a Button Group; align them with a `justify-*` utility. In an aligned form they line up with the controls.

## Summarise errors at the top
After a failed submit, a summary at the top of the Form says how many things need fixing and links to each one. Focus moves to it, so a screen reader reads it out and a keyboard user starts from it. Each error is also shown beside its Field, in the same words.
```html live width=md
<form class="form" novalidate>
  <div id="plot-errors" class="banner banner--danger" tabindex="-1" aria-labelledby="plot-errors-title">
    <span class="icon-box" aria-hidden="true"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Warning"/></svg></span>
    <div class="banner__body">
      <h2 id="plot-errors-title" class="text font-bold">There are 2 problems with your application</h2>
      <ul class="list">
        <li><a class="link" href="#plot-name">Enter your full name</a></li>
        <li><a class="link" href="#plot-number">Enter a plot number, like A-14</a></li>
      </ul>
    </div>
  </div>
  <div class="field">
    <label for="plot-name" class="field__label label">Full name</label>
    <p id="plot-name-error" class="field__error small-text"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Warning"/></svg>Enter your full name</p>
    <input id="plot-name" class="input" autocomplete="name" aria-invalid="true" aria-describedby="plot-name-error" />
  </div>
  <div class="field">
    <label for="plot-number" class="field__label label">Plot number</label>
    <p id="plot-number-error" class="field__error small-text"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Warning"/></svg>Enter a plot number, like A-14</p>
    <input id="plot-number" class="input" aria-invalid="true" aria-describedby="plot-number-error" value="14" />
  </div>
  <div class="form__actions button-group">
    <button type="submit" class="button button--strong button--accent"><span>Apply</span></button>
  </div>
</form>
```
- On submit, the product's script fills the summary, shows it, sets `document.title` to start with "Error: " and calls `focus()` on it. Server-rendered pages do the same on load.
- Each link's `href` is the control's `id`, so following it moves focus into the Field.

## Do and don't
| Do | Don't |
| :--- | :--- |
| Keep a visible label on every control. | Use the placeholder as the label; it vanishes as people type. |
| Write "(optional)" on the few optional fields. | Mark every required field with an asterisk and a legend explaining it. |
| Say how to fix an error: "Enter a plot number, like A-14". | Say only that it's wrong: "Invalid input". |
| Link the hint and error to the control with `aria-describedby`. | Leave the hint as nearby text that screen readers skip. |
| Ask a group question with a Fieldset and legend. | Put a heading above loose checkboxes. |
| Show errors after someone has had a go at a Field. | Show errors on a Form nobody has touched yet. |
| Move focus to an error summary after a failed submit. | Leave people at the submit button, unaware anything went wrong. |

## Reference
What goes around the [form controls](07-form-controls.md).

```html live width=md
<div class="field">
  <label for="default-name" class="field__label label">Your name</label>
  <input id="default-name" type="text" class="input" autocomplete="name" />
</div>
```

## Options
| Block | Parts | Options |
| :--- | :--- | :--- |
| `.field` | `__header`, `__label`, `__hint`, `__error` | `--inline` |
| `.fieldset` | `__legend`, `__hint` | `--compact` |
| `.choices`, `.choice` | `.choice__label` | `--inline` (flag `--choices-layout: inline`) |
| `.form` | `__actions` | `--compact`, `--aligned` |

### Further rules
- **Type comes from text atoms.** Labels and legends take `.label` (16px bold, one step down in compact); hints and errors take `.small-text`. The molecules set spacing and colour only.
- **Density:** `--compact` on a Form or Fieldset, or `.ui-compact` on any region, sets `--ui-sizing: compact`. Fields and choices follow their container; they have no size or density modifiers. [Compact choice rows](#choices) are 32px.

### Field
- A disabled control dims its label and itself. The hint, error and output keep full contrast: a hint often says why the control is disabled, so it must stay readable (WCAG 1.4.3 exempts only the inactive control and its label).
- `.field__error` can be a `<ul>` when one Field has several messages. It may also sit in a Fieldset, for an error about the whole group.

### Fieldset
- The Fieldset stays `display: block`. The legend floats, so it sits inside any padding instead of in the border; Safari drops that float in a flex or grid Fieldset, so never make one either.
- A disabled Fieldset dims everything in it.

## Choices: inline, as a list, size and density
```html
<!-- Inline -->
<div class="choices choices--inline">…</div>

<!-- A list works too; its items step aside -->
<ul class="choices">
  <li><label class="choice">…</label></li>
</ul>
```
- **Size** follows the box: `checkbox-input--lg` / `radio-input--lg`, or the `--check-size: lg` flag, widens the gap beside it.
- **Text** matches the text controls beside it (`--choice-font-size`, from `--control-font-size`). The choice sets it because the row is part of the control; a description takes `.small-text`.
- **Compact:** in a compact form, Fieldset or `.ui-compact` region, rows are 32px, the text steps to the small-control size and the box to 16px, so choices sit with the compact fields around them. Like a small text control, the row is its own target: above 24px (WCAG 2.5.8), below 48px.

## Form: aligned, and in rows
```html
<form class="form">
  <div class="field">…</div>
  <fieldset class="fieldset">…</fieldset>
  <div class="form__actions button-group">
    <button type="submit" class="button button--strong button--accent"><span>Register</span></button>
    <button type="reset" class="button button--subtle"><span>Clear</span></button>
  </div>
</form>

<!-- Aligned: labels in one column beside their controls once the form is wider than 32rem.
     Each hint sits beneath its label; each error beneath its control, except a Fieldset's, which stays above its controls. -->
<form class="form form--aligned">…</form>

<!-- Fields side by side: a grid -->
<div class="grid grid--xs">
  <div class="field">…</div>
  <div class="field">…</div>
</div>

<!-- A row of fields and a button: a cluster -->
<form class="cluster" role="search">
  <div class="field field--inline">
    <label for="find" class="field__label label">Find a plot</label>
    <input id="find" type="search" class="input" />
  </div>
  <button type="submit" class="button button--subtle"><span>Search</span></button>
</form>
```
