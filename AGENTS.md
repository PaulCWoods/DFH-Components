# AGENTS.md: Design For Humans Component Library

## Project Context & Mission
**Design For Humans** is an accessible, modern, token-driven UI component library and design system combining Web Standards, Figma synchronization, and AI-agent workflows.
- **Lead / Author:** Paul Charles Woods (Senior web professional specializing in digital accessibility and web standards).
- **Target Standard:** WCAG 2.2 Level AA / AAA, Baseline Widely Available + Modern Web Standards.

---

## Directory Architecture
```
DFH-Components/
├── tokens/
│   ├── 1-global.json          # Tier 1: Foundation tokens (palettes, scales, units)
│   ├── 2-semantic.json        # Tier 2: Semantic UI tokens (light-dark(), surfaces, focus, shadows)
│   └── 3-component.json       # Tier 3: Component tokens (button, dialog, popover, accordion)
├── packages/
│   ├── css/
│   │   ├── src/
│   │   │   ├── variables.css  # Auto-compiled CSS custom properties (DO NOT edit directly)
│   │   │   ├── index.css      # Core entrypoint importing variables & component styles
│   │   │   ├── utilities/     # Utility classes (accessibility.css: .visually-hidden, .sr-only)
│   │   │   └── components/    # CSS primitive files (button.css, dialog.css, popover.css, accordion.css)
│   ├── figma-sync/
│   │   ├── compile-tokens.js      # Node token compiler (W3C DTCG -> CSS variables)
│   │   ├── export-figma-tokens.js # Figma exporter (Tokens Studio & Honza Toman Variables)
│   │   └── dist/
│   │       ├── tokens-studio/     # Tokens Studio format (figma-tokens.json)
│   │       └── native-variables/  # Native Figma Variables format (unified and modular collections)
│   └── storybook/
│       ├── .storybook/        # Storybook configuration with @storybook/addon-a11y
│       └── stories/           # Component stories with automated axe WCAG checks
└── .agents/
    └── skills/
        ├── modern-web-guidance/   # Chrome web standard best practices
        ├── tokens/SKILL.md        # Detailed token system specification & naming conventions
        └── accessibility/SKILL.md # WCAG 2.2 compliance & auditing rules
```

---

## Canonical Component Markup Signatures for AI Agents
When generating HTML markup for Design For Humans components, AI agents MUST strictly use the following semantic patterns:

### 1. Button Primitive
```html
<!-- Default Button -->
<button type="button" class="button">
  <span>Action Label</span>
</button>

<!-- Primary Button -->
<button type="button" class="button button--primary">
  <span>Primary Action</span>
</button>

<!-- Subtle / Ghost Button -->
<button type="button" class="button button--subtle">
  <span>Subtle Action</span>
</button>

<!-- Destructive Button -->
<button type="button" class="button button--destructive">
  <span>Delete Item</span>
</button>

<!-- With Icon (Trailing) -->
<button type="button" class="button button--primary">
  <span>Get Started</span>
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false">
    <path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path>
  </svg>
</button>

<!-- Icon-Only Button (MANDATORY: use .visually-hidden text for translation & voice control) -->
<button type="button" class="button button--icon">
  <span class="visually-hidden">Search site</span>
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false">
    <circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path>
  </svg>
</button>

<!-- Link Styled as Button (MANDATORY: role="button") -->
<a href="/login" class="button button--primary" role="button">
  <span>Log In</span>
</a>
```

### 2. Modal Dialog Primitive (Native HTML `<dialog>`)
```html
<!-- Trigger Button (Declarative Invoker command="show-modal") -->
<button type="button" class="button button--primary" commandfor="my-dialog" command="show-modal" aria-haspopup="dialog">
  <span>Open Dialog</span>
</button>

<!-- Modal Dialog Container -->
<dialog id="my-dialog" class="dialog" aria-labelledby="dialog-title" aria-describedby="dialog-desc">
  <div class="dialog__header">
    <h2 id="dialog-title" class="dialog__title">Dialog Title</h2>
    <form method="dialog">
      <button type="submit" class="button button--subtle button--icon" commandfor="my-dialog" command="close">
        <span class="visually-hidden">Close dialog</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false">
          <path d="M18 6 6 18"></path><path d="m6 6 12 12"></path>
        </svg>
      </button>
    </form>
  </div>

  <p id="dialog-desc" class="dialog__body">
    Dialog body copy describing the decision or context clearly.
  </p>

  <div class="dialog__footer">
    <form method="dialog" style="display: flex; gap: var(--spacing-0-5);">
      <button type="submit" class="button button--secondary" commandfor="my-dialog" command="close">
        <span>Cancel</span>
      </button>
      <button type="submit" value="confirm" class="button button--primary">
        <span>Confirm</span>
      </button>
    </form>
  </div>
</dialog>
```

### 3. Popover Primitive (Native `popover` + CSS Anchor Positioning)
```html
<!-- Trigger Button with anchor-name and popovertarget -->
<button 
  type="button" 
  class="button button--secondary"
  popovertarget="my-popover"
  style="anchor-name: --my-anchor;"
  aria-haspopup="dialog"
>
  <span>Actions</span>
</button>

<!-- Popover Content tethered with position-anchor -->
<div 
  id="my-popover" 
  popover 
  class="popover popover--anchored"
  style="position-anchor: --my-anchor;"
>
  <p style="margin: 0; font-weight: var(--body-strong-font-weight);">Quick Actions</p>
</div>
```

### 4. Accordion Primitive (Native `<details>` / `<summary>`)
```html
<!-- Standalone Disclosure -->
<details class="accordion">
  <summary>
    <span>Accordion Header</span>
    <span class="accordion__icon" aria-hidden="true"></span>
  </summary>
  <p>Accordion body content.</p>
</details>

<!-- Native Exclusive Group (only one open at a time without JavaScript) -->
<div class="accordion-group">
  <details class="accordion" name="faq-group" open>
    <summary>
      <span>First Question</span>
      <span class="accordion__icon" aria-hidden="true"></span>
    </summary>
    <p>Answer to the first question.</p>
  </details>

  <details class="accordion" name="faq-group">
    <summary>
      <span>Second Question</span>
      <span class="accordion__icon" aria-hidden="true"></span>
    </summary>
    <p>Answer to the second question.</p>
  </details>
</div>
```

### 5. Badge & Chip Primitives
```html
<!-- Default Badge -->
<span class="badge"><span>Standard</span></span>

<!-- Semantic Status Badges -->
<span class="badge badge--accent"><span>Enrolled</span></span>
<span class="badge badge--success"><span>Completed</span></span>
<span class="badge badge--warning"><span>Pending Review</span></span>
<span class="badge badge--danger"><span>Suspended</span></span>

<!-- Pill Badge (Rounded) -->
<span class="badge badge--accent badge--pill"><span>New Release</span></span>

<!-- Metadata Chip -->
<span class="chip">Lesson 04</span>
```

### 6. Input & Form Control Primitives

#### A. Text, Color, and File Inputs
```html
<!-- Base Text Input with Field Wrapper, Label, and Hint -->
<div class="field">
  <label for="user-email" class="field__label">Email Address</label>
  <p id="user-email-hint" class="field__hint">We will never share your email address.</p>
  <input 
    id="user-email" 
    type="email" 
    class="input" 
    placeholder="you@domain.com"
    aria-describedby="user-email-hint"
  />
</div>

<!-- Modern Web Validation: :user-invalid triggers only after interaction/blur -->
<div class="field">
  <label for="user-password" class="field__label">Password</label>
  <input 
    id="user-password" 
    type="password" 
    class="input" 
    required
    placeholder="••••••••••••"
  />
</div>

<!-- Explicit Error State (Accessible ARIA Association) -->
<div class="field">
  <label for="account-id" class="field__label">Account ID</label>
  <input 
    id="account-id" 
    type="text" 
    class="input" 
    aria-invalid="true" 
    aria-describedby="account-id-error"
    value="INVALID-ID"
  />
  <p id="account-id-error" class="field__error" role="alert">
    Account ID must start with "DFH-" followed by 6 digits.
  </p>
</div>

<!-- Input Sizes (sm: 24px WCAG 2.5.8, md: 48px WCAG 2.5.5, lg: 56px) -->
<input type="text" class="input input--sm" placeholder="Compact filter..." />
<input type="text" class="input" placeholder="Standard size..." />
<input type="text" class="input input--lg" placeholder="Large search..." />

<!-- Color & File Inputs -->
<input type="color" class="color-input" value="#00d2c4" />
<input type="file" class="file-input" />
```

#### B. Zero-JS Auto-Growing Textarea (`field-sizing: content`)
```html
<div class="field">
  <label for="feedback" class="field__label">Feedback</label>
  <textarea 
    id="feedback" 
    class="textarea" 
    rows="3" 
    placeholder="Tell us what you think..."
  ></textarea>
</div>

<!-- Textarea starting as single-line and expanding dynamically -->
<textarea class="textarea textarea--one-line" placeholder="Quick comment..."></textarea>
```

#### C. Native & Customizable Select
```html
<!-- Native Accessible Select -->
<div class="field">
  <label for="role-select" class="field__label">Primary Role</label>
  <select id="role-select" class="select">
    <option value="">Select role...</option>
    <option value="lead">Accessibility Lead</option>
    <option value="eng">Design Engineer</option>
  </select>
</div>

<!-- Modern Customizable Select (appearance: base-select) -->
<select class="select select--custom">
  <button type="button">
    <selectedcontent></selectedcontent>
  </button>
  <option value="aa" selected>WCAG 2.2 AA</option>
  <option value="aaa">WCAG 2.2 AAA</option>
</select>
```

#### D. Checkboxes, Radios, Choices & Fieldset
```html
<!-- Choice Items Grouped in Choices Container -->
<fieldset class="fieldset">
  <legend class="legend">Accessible Audit Deliverables</legend>
  <div class="choices">
    <label class="choice" for="cb-axe">
      <input type="checkbox" id="cb-axe" class="checkbox-input" checked />
      <span>Automated axe-core compliance scanner</span>
    </label>
    <label class="choice" for="cb-keyboard">
      <input type="checkbox" id="cb-keyboard" class="checkbox-input" />
      <span>Keyboard navigation review</span>
    </label>
  </div>
</fieldset>

<!-- Horizontal Radio Group -->
<div class="choices choices--horizontal">
  <label class="choice" for="freq-daily">
    <input type="radio" id="freq-daily" name="frequency" class="radio-input" checked />
    <span>Daily</span>
  </label>
  <label class="choice" for="freq-weekly">
    <input type="radio" id="freq-weekly" name="frequency" class="radio-input" />
    <span>Weekly</span>
  </label>
</div>
```

#### E. Complete Form Layout & Submission Bar
```html
<form class="form">
  <div class="field">
    <label for="full-name" class="field__label">Full Name</label>
    <input id="full-name" type="text" class="input" required />
  </div>

  <div class="form__submission form__submission--right">
    <button type="reset" class="button button--subtle">
      <span>Cancel</span>
    </button>
    <button type="submit" class="button button--primary">
      <span>Submit</span>
    </button>
  </div>
</form>
```

---

## Non-Negotiable Rules for AI Agents

### 1. Zero Legacy Hacks — Rely on Native Primitives
- **Overlays & Dialogs:** Use native HTML `<dialog>` with `.showModal()`. Never generate custom `div` modals or JS focus traps.
- **Popovers:** Use the native `popover` attribute (`popover="auto"` or `popover="manual"`) with CSS Anchor Positioning (`position-anchor`, `position-area`, `anchor()`).
- **Interactive Controls:** Always use native semantic elements (`<button type="button">`, `<a href="...">`, `<input>`, `<textarea>`). Never create untyped clickable `<div>` or `<span>` elements.
- **Form Growth & Sizing:** Use `field-sizing: content;` on `<textarea>` instead of manual JavaScript height auto-expansion listeners.
- **Validation Timing:** Use `:user-invalid` and `:user-valid` rather than `:invalid` to prevent premature error styling on pristine/unvisited fields.
- **Animatable Keywords:** Use `interpolate-size: allow-keywords;` on `:root` instead of manual height-measuring JavaScript for expand/collapse transitions.
- **Typography Alignment:** Use `text-box: trim-both cap alphabetic;` for exact typographic bounding boxes without phantom leading.

### 2. Strict Token Compliance & W3C DTCG Standard
- **W3C DTCG Format:** All tokens use `$value`, `$type`, and `$description`. Group-level `$type` inheritance is supported.
- **Never Hardcode Literals:** No raw `#hex`, `rgb()`, `px`, or `rem` in component CSS. Every color, spacing, radius, border, and duration must reference custom properties from `packages/css/src/variables.css`.
- **Semantic Fallbacks in CSS:** When using component tokens, always supply semantic fallbacks: `var(--component-x, var(--<domain>-x))`.
- **Dual-Bridge Strategy (Web & Figma):**
  - Token source (`1-global.json`) contains the pure modular scale (`-2` to `8`) without web math or `fluid-N` clutter.
  - Web compiler (`compile-tokens.js`) generates standard `clamp()` fallbacks plus `@supports (opacity: progress(1px, 0px, 1px))` progressive enhancement.
  - Figma exporter (`export-figma-tokens.js`) converts all tokens to static pixel floats/dimensions and native shadows for $0 free-tier Tokens Studio and Figma Variables.
- **Token Editing:** To add or update tokens, edit `tokens/1-global.json`, `tokens/2-semantic.json`, or `tokens/3-component.json`, then execute:
  ```bash
  npm run build:tokens
  npm run export:figma
  ```
- **Light/Dark Mode:** Never write redundant `.dark-mode` class blocks. Use native `light-dark()` in tokens and rely on `color-scheme: light dark;`.

### 3. Top-Layer Animations
- Elements entering/exiting the top layer (`dialog`, `[popover]`) must use:
  - `@starting-style` for entry animations.
  - `transition-behavior: allow-discrete;` on `display` and `overlay`.
  - Animate `::backdrop` smoothly alongside the dialog.
  - Full `@media (prefers-reduced-motion: reduce)` fallbacks.

### 4. Accessibility First (WCAG 2.2 AA / AAA)
- **High-Contrast Focus Visible:** Every interactive element must display `outline: var(--focus-ring-outline)` with `outline-offset: var(--focus-ring-outline-offset)`.
- **Target Sizes:** Primary buttons and touch targets must meet `--button-min-size: var(--spacing-target)` (`3rem` / `48px`, exceeding WCAG 2.5.5). Small variants must meet at least `24x24px` (WCAG 2.5.8).
- **Automated Axe Audits:** Every Storybook story must pass `@storybook/addon-a11y` without contrast, labeling, or keyboard violations.
- Consult `.agents/skills/accessibility/SKILL.md` for specific ARIA patterns.

---

## Agent Workflow for Creating Components
1. **Check Tokens:** Verify required tokens exist in `tokens/3-component.json`. If missing, add them and run `npm run build:tokens`.
2. **Author CSS:** Create `packages/css/src/components/<component>.css` using `:where()` for low specificity, native CSS nesting with explicit `&` for states and pseudo-classes (`&:hover`, `&:active`, `&:focus-visible`), logical properties (`inline-size`, `block-size`, `padding-inline`, `padding-block`), and standardized section comments. Consult `.agents/skills/tokens/SKILL.md` (Section 4) for full nesting and commenting guidelines.
3. **Register in Entrypoint:** Add `@import './components/<component>.css';` to `packages/css/src/index.css`.
4. **Author Storybook Stories:** Create `packages/storybook/stories/<component>.stories.ts` covering all variants, sizes, states (`hover`, `active`, `disabled`, `aria-disabled`), and verify with `npm run build-storybook --workspace=@design-for-humans/storybook`.