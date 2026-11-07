---
title: Form Controls
tier: atom
summary: The parts people fill in or set, such as text inputs, selects, checkboxes, switches and sliders.
tokens: [input, select, textarea, check, switch, range, range-lockup]
storybook: [atoms-input, atoms-select, atoms-textarea, atoms-checkbox-radio, atoms-switch, atoms-range]
related: [form-composition, button, combobox]
---

# 7. Input & Form Control Primitives
```html playground width=md
<div class="field">
  <label for="default-name" class="field__label label">Your name</label>
  <input id="default-name" type="text" class="input" data-axes autocomplete="name" />
</div>
---
Size: Small=input--sm, Default*, Large=input--lg
Prominence: Default, Subtle=input--subtle, Plain=input--plain
Corners: Rounded, Round=input--round
```

## Purpose
A form is where a page asks the most of someone. The browser already knows a lot about that job: the right on-screen keyboard, autofill, keyboard use, how to tell a screen reader what a control is. Every control here is the native element with a class, so all of that keeps working.

Text inputs, Selects and Textareas share one base, so they line up and change together. The outline and plain prominences keep an edge of at least 3:1, because a field people can't find can't be filled in. Subtle is a tinted field with no border, a choice for dense, familiar forms; its border comes back for people who ask for more contrast and in forced colours. The browser still draws the Checkbox and radio, so they stay legible in forced colours.

Styling is opt-in through classes. A bare `<input>` keeps its browser rendering, so anything you embed from elsewhere isn't restyled by accident.

## When to use
- **Input, textarea:** text people type, one line or several.
- **Select:** one option from a list they don't need to search. To search it, use a [Combobox](28-combobox.md).
- **Checkbox, radio:** several choices, or one of a few, all in view.
- **Switch:** a setting that takes effect at once.
- **Range:** a value where the rough amount matters more than the exact number.

## Rules
- **Classes only.** Bare `<input>`, `<select>` and `<textarea>` keep browser styling.
- **Validation:** invalid styling follows `:user-invalid` and `aria-invalid="true"`; always pair it with a `.field__error` message. Valid fields are not recoloured.
- **One way to validate.** Either let the browser validate (`required`, `type`, `pattern`, and its own messages), or put `novalidate` on the form and show the library's errors with an [error summary](07b-form-composition.md). Never both: people get the browser's bubble and then a second, different message.
- **Hit area:** `--sm` text controls are 32px, and a field can't take a hit-area buffer, so that is also its target. Put touch-facing forms in `fine:ui-compact` rather than using `--sm` directly. Put checkboxes and radios in a `.choice` label.
- **Range fill:** `--value` drives the fill in Blink and WebKit, so a script must update it on `input`.

## Keyboard and screen readers
The browser provides the keys, so don't add key handlers. The exact keys for a Select differ by browser and platform.
- **Tab** moves from control to control, in reading order.
- **A Select** opens with Space or the arrow keys, the arrow keys move through it, Enter chooses and Escape closes.
- **A Checkbox** toggles with Space. So does a Switch, which is a Checkbox with `role="switch"`, and a screen reader announces it as on or off.
- **A group of radios** with one `name` is one Tab stop. The arrow keys move and select within it.
- **A Range** moves with the arrow keys, by larger steps with Page Up and Page Down, and to its ends with Home and End.
- **An `<output>`** is a live region, so a screen reader announces a Range's new value as it changes.
- **Errors and hints** are read with the control through `aria-describedby`. The browser never sets `aria-invalid`: server-rendered or scripted errors must set it themselves.

## Say What's Wrong Beside the Field
An error colour says something is wrong, and the message says what. The icon and the words mean it never relies on colour alone.
```html live width=md
<div class="field">
  <label for="account-id" class="field__label label">Account ID</label>
  <p id="account-id-error" class="field__error small-text"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Warning"/></svg>Account ID must start with "DFH-" followed by 6 digits.</p>
  <input id="account-id" type="text" class="input" aria-invalid="true" aria-describedby="account-id-error" value="INVALID-ID" />
</div>
```

## Put Checkboxes and Radios in a Label
A Checkbox or radio goes in a `.choice` label, so the whole row is the target; a set of them is `.choices` in a [Fieldset](07b-form-composition.md).
```html live width=md
<label class="choice">
  <input type="checkbox" class="checkbox-input" name="terms" />
  <span>I agree to the plot terms</span>
</label>

<!-- Large box -->
<label class="choice">
  <input type="radio" class="radio-input radio-input--lg" name="size" value="full" />
  <span>Full plot</span>
</label>
```

## A Switch Acts at Once
Use a Switch when flipping it changes the setting straight away. If nothing happens until someone submits a form, it's a Checkbox.
```html live width=md
<div class="switch">
  <div class="switch__label">
    <label for="notify" class="label">Notifications</label>
    <p id="notify-hint" class="small-text text-muted">Email and push</p>
  </div>
  <span class="switch__control">
    <input type="checkbox" role="switch" id="notify" aria-describedby="notify-hint" checked />
    <span class="switch__option switch__option--off" aria-hidden="true">Off</span>
    <span class="switch__option switch__option--on" aria-hidden="true">On</span>
  </span>
</div>

<!-- Small, round, danger -->
<div class="switch switch--sm switch--round switch--danger">
  <div class="switch__label">
    <label for="auto-delete" class="label">Delete old drafts automatically</label>
  </div>
  <span class="switch__control">
    <input type="checkbox" role="switch" id="auto-delete" />
    <span class="switch__option switch__option--off" aria-hidden="true">Off</span>
    <span class="switch__option switch__option--on" aria-hidden="true">On</span>
  </span>
</div>
```

Only the control and its label toggle it. The row and the hint don't, so a stray tap while scrolling can't change a setting. The hint is read with the Switch through `aria-describedby`, and the Off and On text is hidden, because the role already says on or off.

## Show a Range's Value
A slider shows roughly where it is, and an `<output>` beside it gives the number.
```html live width=md
<div class="field">
  <div class="field__header">
    <label for="volume-control" class="field__label label">Volume</label>
    <output for="volume-control" class="small-text">65%</output>
  </div>
  <input id="volume-control" type="range" class="range" min="0" max="100" value="65" style="--value: 65%;" />
</div>
```

## Do and Don't
| Do | Don't |
| :--- | :--- |
| Give every control a visible label. | Rely on a placeholder as the label. |
| Use `:user-invalid` or `aria-invalid="true"` with a `.field__error`. | Show an error colour with no message. |
| Set the right `type` and `autocomplete`. | Make people retype what the browser already knows. |
| Put checkboxes and radios in a `.choice` label. | Leave a 20px box as the whole target. |
| Use `.ui-compact` on a dense region. | Add `--sm` to every control in it. |
| Choose browser validation or `novalidate` with library errors. | Show the browser's message and the library's for the same field. |

## Reference
Six atoms: input (with colour and file), select, textarea, checkbox and radio, switch, range. What goes around them (field, Fieldset, choices, form) is in [form composition](07b-form-composition.md).

## Options
| Atom | Axes | Container flags |
| :--- | :--- | :--- |
| `.input`, `.select`, `.textarea` | Size (`--sm`, `--lg`), prominence (outline, `--subtle`, `--plain`), corners (`--round`, not on `.textarea`) | `--input-*`, `--select-*` (`size`, `prominence`, `corners`), `--textarea-*` (`size`, `prominence`) |
| `.checkbox-input`, `.radio-input` | Size (20px, `--lg` 24px) | `--check-size: lg` |
| `.switch` | Size (`--sm`, `--lg`), prominence (`--subtle`, no border until high contrast or forced colours), intent (`--danger`), corners | `--switch-size`, `--switch-prominence`, `--switch-intent`, `--switch-corners` |
| `.color-input` | Size (`--sm`, `--lg`, `--stretch` to fill its container) | |
| `.range` | Size, intent (`--info`, `--success`, `--warning`, `--danger`) | `--range-size`, `--range-intent` |
| `.range-lockup` | Size from `.controls-sm` or `.controls-lg` on it; `--fill` to take the full width | `--range-size`, `--controls-size` |

### Further rules
- **Classes only.** Bare `<input>`, `<select>` and `<textarea>` keep browser styling; the reset gives them back their native rendering.
- **One base for text controls.** `.input`, `.select` and `.textarea` share `atoms/input.css` section 1: the same size, prominence, corners, flags and states.
- Group flags `--controls-size`, `--controls-prominence` and `--controls-corners` reach every control, Buttons included. Group classes: `.controls-sm`, `.controls-lg`, `.controls-subtle`, `.controls-plain`, `.controls-round`. `.elements-subtle` and `.elements-plain` (`--elements-prominence`) reach controls too, along with the other [non-container elements](36-utilities.md). A compact container (`--ui-sizing: compact`) steps controls to `--sm`.
- **Edges.** Outline has a full 3:1 border (`--border-color-control`) and plain keeps its bottom border. Subtle has no border, a deliberate choice: WCAG 1.4.11 doesn't ask a field for a boundary. The border comes back under `prefers-contrast: more` and in forced colours.
- **`--flush`** (text controls) drops the inline padding and the boundary. Use it only inside a bar that draws both, such as a command palette header with `.focus-within`.
- **Hit area:** `--sm` text controls are 32px, matching small Buttons; a Field can't take a hit-area buffer, so this is also its target (above the 24px minimum). Put touch-facing forms in `fine:ui-compact` rather than using `--sm` directly. A Switch and a Range keep a hit area of at least `--spacing-target-min` whatever their visual size (a Switch's checkbox fills its control and reaches out to it). Put checkboxes and radios in a `.choice` label.
- Checkboxes have no intent: a Checkbox has a state, not a Status.

## Text, Colour and File Inputs
```html live width=md
<div class="field">
  <label for="user-email" class="field__label label">Email address</label>
  <p id="user-email-hint" class="field__hint small-text">We will never share your email address.</p>
  <input id="user-email" type="email" class="input" autocomplete="email" aria-describedby="user-email-hint" />
</div>

<!-- Error state -->
<div class="field">
  <label for="account-id" class="field__label label">Account ID</label>
  <p id="account-id-error" class="field__error small-text"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Warning"/></svg>Account ID must start with "DFH-" followed by 6 digits.</p>
  <input id="account-id" type="text" class="input" aria-invalid="true" aria-describedby="account-id-error" value="INVALID-ID" />
</div>

<!-- Size, prominence and corners -->
<div class="field">
  <label for="filter-projects" class="field__label label">Filter projects</label>
  <input id="filter-projects" type="search" class="input input--sm" />
</div>
<div class="field">
  <label for="plot-title" class="field__label label">Plot title</label>
  <input id="plot-title" type="text" class="input input--lg" />
</div>
<div class="field">
  <label for="given-name" class="field__label label">First name</label>
  <input id="given-name" type="text" class="input input--subtle" autocomplete="given-name" />
</div>
<div class="field">
  <label for="family-name" class="field__label label">Last name</label>
  <input id="family-name" type="text" class="input input--plain" autocomplete="family-name" />
</div>
<div class="field">
  <label for="site-search" class="field__label label">Search the site</label>
  <input id="site-search" type="search" class="input input--round" />
</div>

<!-- Colour (--sm, --lg, or --stretch to fill its container) and file -->
<div class="field">
  <label for="brand-colour" class="field__label label">Brand colour</label>
  <input id="brand-colour" type="color" class="color-input" value="#00a39a" />
</div>
<div class="field">
  <label for="attachment" class="field__label label">Attachment</label>
  <input id="attachment" type="file" class="file-input" />
</div>
```

## Textarea (grows with `field-sizing: content`)
```html live width=md
<div class="field">
  <label for="feedback" class="field__label label">Feedback</label>
  <textarea id="feedback" class="textarea"></textarea>
</div>

<!-- Starts at one line and grows; cap the height with --textarea-lines-max -->
<div class="field">
  <label for="comment" class="field__label label">Comment</label>
  <textarea id="comment" class="textarea textarea--one-line"></textarea>
</div>
```

## Select
```html live width=md
<div class="field">
  <label for="role-select" class="field__label label">Primary role</label>
  <select id="role-select" class="select">
    <option value="">Choose a role</option>
    <option value="lead">Accessibility Lead</option>
  </select>
</div>

<!-- Customizable select (appearance: base-select; other browsers show the native select) -->
<div class="field">
  <label for="conformance" class="field__label label">Conformance target</label>
  <select id="conformance" class="select select--custom">
    <button type="button"><selectedcontent></selectedcontent></button>
    <option value="aa" selected>WCAG 2.2 AA</option>
    <option value="aaa">WCAG 2.2 AAA</option>
  </select>
</div>
```

## Range & Range Lockup
`--value` drives the fill in Blink and WebKit; update it on `input`. Gecko draws the fill natively.
```html live width=md
<div class="field">
  <div class="field__header">
    <label for="volume-control" class="field__label label">Volume</label>
    <output for="volume-control" class="small-text">65%</output>
  </div>
  <input id="volume-control" type="range" class="range" min="0" max="100" value="65" style="--value: 65%;" />
</div>

<!-- Size and intent: pair intent with an output that states the value -->
<div class="field">
  <div class="field__header">
    <label for="balance" class="field__label label">Balance</label>
    <output for="balance" class="small-text">30%</output>
  </div>
  <input id="balance" type="range" class="range range--sm" min="0" max="100" value="30" style="--value: 30%;" />
</div>
<div class="field">
  <div class="field__header">
    <label for="disk-use" class="field__label label">Disk use limit</label>
    <output for="disk-use" class="small-text">92%, nearly full</output>
  </div>
  <input id="disk-use" type="range" class="range range--danger" min="0" max="100" value="92" style="--value: 92%;" />
</div>

<!-- Range lockup (molecule): button + range + readout; size it with .controls-sm or .controls-lg -->
<div class="range-lockup controls-sm">
  <button type="button" class="button button--subtle button--icon" aria-pressed="false">
    <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#VolumeOn"/></svg><span class="sr-only">Mute</span>
  </button>
  <input id="lockup-vol" type="range" class="range" min="0" max="100" value="85" style="--value: 85%;" aria-label="Volume" />
  <output for="lockup-vol" class="range-lockup__output small-text font-mono">85%</output>
</div>

<!-- Scale labels under a stepped range: keep aria-valuetext in step with them -->
<div class="field">
  <label for="text-size" class="field__label label">Text size</label>
  <input id="text-size" type="range" class="range" min="0" max="100" step="25" value="50" style="--value: 50%;" aria-valuetext="M" />
  <div class="range__scale-ticks small-text" aria-hidden="true"><span>XS</span><span>S</span><span>M</span><span>L</span><span>XL</span></div>
</div>
```

## Forms
Fields, Fieldsets, choices and the Form itself are in [form composition](07b-form-composition.md).
