# 1. Button Primitive
Reference implementation of the shared axes. Intent (`--accent`, `--danger`) sets a tone; prominence (`--strong`, `--subtle`, `--plain`, default outline) decides where the tone is applied, so any pairing works from two single-axis classes. Container flags: `--button-prominence`, `--button-intent`, `--button-size`, `--button-corners`; group classes `.buttons-strong|subtle|plain|sm|lg|round` set them. The shared `--controls-prominence`, `--controls-size` and `--controls-corners` flags (and `.controls-*` classes) also reach buttons (§7). A compact container (`--ui-sizing: compact`) steps buttons to `--sm`. Every size keeps a 48px hit area via `::after` unless the product opts into fine-pointer targets with `:root { --spacing-target-min: var(--spacing-target-sm); }`. Recolour hooks (undefined by default): `--button-color`, `--button-color-hover`, `--button-color-pressed`, `--button-color-border`, `--button-on-color`.

```html
<!-- Default Button (Outline Neutral) -->
<button type="button" class="button">
  <span>Action Label</span>
</button>

<!-- Strong Button (High-emphasis filled neutral; selected states .is-active, aria-current (not "false"), :checked and aria-pressed="true" render as strong, unless a pressed button shows its own .icon--on check. A menu or navigation tree shows a current link as a tint.) -->
<button type="button" class="button button--strong">
  <span>Strong Action</span>
</button>

<!-- Strong Accent Button (High-emphasis solid brand action; replaces legacy .button--primary) -->
<button type="button" class="button button--strong button--accent">
  <span>Primary Action</span>
</button>

<!-- Subtle Button (Translucent background, no border) -->
<button type="button" class="button button--subtle">
  <span>Subtle Action</span>
</button>

<!-- Plain Button (Transparent background, no border) -->
<button type="button" class="button button--plain">
  <span>Plain Action</span>
</button>

<!-- Danger Button (Outlined danger; always pair with an icon or text) -->
<button type="button" class="button button--danger">
  <span>Delete Item</span>
</button>

<!-- Strong Danger Button (High-emphasis solid danger) -->
<button type="button" class="button button--strong button--danger">
  <span>Delete Record</span>
</button>

<!-- Subtle Danger Button -->
<button type="button" class="button button--subtle button--danger">
  <span>Remove</span>
</button>

<!-- Placeholder / Dashed Outline Button -->
<button type="button" class="button button--placeholder">
  <span>+ Add Item</span>
</button>

<!-- With Icon (Trailing) -->
<button type="button" class="button button--strong button--accent">
  <span>Get Started</span>
  <svg class="icon icon--dir" width="1em" height="1em" aria-hidden="true" focusable="false">
    <use href="#ArrowRight"/>
  </svg>
</button>

<!-- Icon-Only Button (MANDATORY: use .visually-hidden text for translation & voice control) -->
<button type="button" class="button button--icon">
  <span class="sr-only">Search site</span>
  <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false">
    <use href="#Search"/>
  </svg>
</button>

<!-- Avatar Button -->
<button type="button" class="button button--plain button--icon button--round" aria-label="Alex Morgan profile"><span class="avatar avatar--sm" aria-hidden="true"><img src="https://example.com/avatar.jpg" alt="" /></span></button>

<!-- Button-Like Checkbox Toggle Switch (Zero-JS state management) -->
<label class="button">
  <input type="checkbox" class="sr-only" />
  <svg class="icon icon--off" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Close"/></svg>
  <svg class="icon icon--on" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Check"/></svg>
  <span>Switch</span>
</label>

<!-- Button-Like Radio Group Choices -->
<div class="cluster">
  <label class="button">
    <input type="radio" name="choice-demo" class="sr-only" checked />
    <span>Choice 1</span>
    <svg class="icon icon--on" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Check"/></svg>
  </label>
  <label class="button">
    <input type="radio" name="choice-demo" class="sr-only" />
    <span>Choice 2</span>
    <svg class="icon icon--on" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Check"/></svg>
  </label>
</div>

<!-- Link Styled as Button (MANDATORY: role="button") -->
<a href="/login" class="button button--strong button--accent" role="button">
  <span>Log In</span>
</a>

<!-- Persistently Labeled Button (Opts out of container style(--ui-labels: hidden) text collapsing) -->
<button type="button" class="button button--labeled">
  <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Plus"/></svg>
  <span>Add Record</span>
</button>
```

