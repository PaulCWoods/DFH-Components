# 7b. Form Composition: Field, Fieldset, Choices & Form
What goes around the form controls (§7). The audit is in `docs/audit/form-composition.md`.

- **Type comes from text atoms.** Labels and legends take `.label` (16px bold, one step down in compact); hints and errors take `.small-text`. The molecules set spacing and colour only.
- **Required and optional are written, never generated.** Mark the fewer case in the label, usually `<span class="text-muted">(optional)</span>`. Required controls keep `required`, which screen readers announce.
- **Errors are not alerts.** Link an error to its control with `aria-describedby` and set `aria-invalid="true"`. A script that inserts an error after the page loads may add `role="alert"`; server-rendered errors take no role. Every error starts with a Warning icon, so it is never colour alone.
- **Density:** `--compact` on a form or fieldset, or `.ui-compact` on any region, sets `--ui-sizing: compact`. Fields and choices follow their container; they have no size or density modifiers. Compact choice rows are 32px (§C).

| Block | Parts | Options |
| :--- | :--- | :--- |
| `.field` | `__header`, `__label`, `__hint`, `__error` | `--inline` |
| `.fieldset` | `__legend`, `__hint` | `--compact` |
| `.choices`, `.choice` | `.choice__label` | `--inline` (flag `--choices-layout: inline`) |
| `.form` | `__actions` | `--compact`, `--aligned` |

## A. Field
Order: label, hint, error, control. The error comes before the control, so a screen-reader user hears it before reaching the field and a magnifier user sees it beside the label.
```html
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
- A disabled control dims its label and itself. The hint, error and output keep full contrast: a hint often says why the control is disabled, so it must stay readable (WCAG 1.4.3 exempts only the inactive control and its label).
- `.field__error` can be a `<ul>` when one field has several messages. It may also sit in a fieldset, for an error about the whole group.

## B. Fieldset
```html
<fieldset class="fieldset" aria-describedby="contact-hint">
  <legend class="fieldset__legend label">How should we contact you?</legend>
  <p id="contact-hint" class="fieldset__hint small-text">Choose all that apply.</p>
  <div class="choices">…</div>
</fieldset>
```
- The legend floats, so it joins the column instead of sitting in the border.
- A disabled fieldset dims everything in it.
- A boxed group is a fieldset inside a `.card`; the fieldset has no border option.

## C. Choices
Each `.choice` is a `<label>` holding the box and its text; the whole row is the target. Rows are at least `--spacing-target-min` tall (48px; 32px when the product opts into fine-pointer targets) and only as wide as their text. The box sits centred on the first line.
```html
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

<!-- Inline -->
<div class="choices choices--inline">…</div>

<!-- A list works too; its items step aside -->
<ul class="choices">
  <li><label class="choice">…</label></li>
</ul>
```
- **Size** follows the box: `checkbox-input--lg` / `radio-input--lg`, or the `--check-size: lg` flag, widens the gap beside it.
- **Text** matches the text controls beside it (`--choice-font-size`, from `--control-font-size`). The choice sets it because the row is part of the control; a description takes `.small-text`.
- **Compact:** in a compact form, fieldset or `.ui-compact` region, rows are 32px, the text steps to the small-control size and the box to 16px, so choices sit with the compact fields around them. Like a small text control, the row is its own target: above 24px (WCAG 2.5.8), below 48px.

## D. Form
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
     Each hint sits beneath its label; each error beneath its control. -->
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
- The actions are a button group; align them with a `justify-*` utility. In an aligned form they line up with the controls.
