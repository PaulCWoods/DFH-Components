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
│   │   │   ├── index.css      # Core entrypoint importing layout, components & utilities
│   │   │   ├── layout/        # 1D/2D layout primitives (cluster.css, grid.css, inline.css, split.css, stack.css, wrapper.css)
│   │   │   ├── components/    # CSS primitive files (button.css, dialog.css, popover.css, accordion.css, etc.)
│   │   │   ├── utilities/     # Utility classes (spacing.css, border.css, typography.css, accessibility.css, responsive-helpers.css)
│   │   │   └── overrides.css  # Custom extension layer for project-specific overrides
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
        ├── accessibility/SKILL.md # WCAG 2.2 compliance & auditing rules
        ├── recipe-composition/    # Decision-making heuristics & composite pattern guide
        └── css-commenting/        # CSS maintenance and block (/* */) commenting guide
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

<!-- Placeholder / Dashed Outline Button -->
<button type="button" class="button button--placeholder">
  <span>+ Add Item</span>
</button>

<!-- With Icon (Trailing) -->
<button type="button" class="button button--primary">
  <span>Get Started</span>
  <svg class="icon icon--dir" aria-hidden="true" focusable="false">
    <use href="#ArrowRight"/>
  </svg>
</button>

<!-- Icon-Only Button (MANDATORY: use .visually-hidden text for translation & voice control) -->
<button type="button" class="button button--icon">
  <span class="visually-hidden">Search site</span>
  <svg class="icon" aria-hidden="true" focusable="false">
    <use href="#Search"/>
  </svg>
</button>

<!-- Avatar Button -->
<button type="button" class="button button--avatar button--round" aria-label="Alex Morgan profile">
  <img src="https://example.com/avatar.jpg" alt="" width="40" height="40" style="object-fit: cover; border-radius: inherit;" />
</button>

<!-- Button-Like Checkbox Toggle Switch (Zero-JS state management) -->
<label class="button">
  <input type="checkbox" class="visually-hidden" />
  <svg class="icon icon--off" aria-hidden="true" focusable="false"><use href="#Close"/></svg>
  <svg class="icon icon--on" aria-hidden="true" focusable="false"><use href="#Check"/></svg>
  <span>Switch</span>
</label>

<!-- Button-Like Radio Group Choices -->
<div class="cluster">
  <label class="button">
    <input type="radio" name="choice-demo" class="visually-hidden" checked />
    <span>Choice 1</span>
    <svg class="icon icon--on" aria-hidden="true" focusable="false"><use href="#Check"/></svg>
  </label>
  <label class="button">
    <input type="radio" name="choice-demo" class="visually-hidden" />
    <span>Choice 2</span>
    <svg class="icon icon--on" aria-hidden="true" focusable="false"><use href="#Check"/></svg>
  </label>
</div>

<!-- Link Styled as Button (MANDATORY: role="button") -->
<a href="/login" class="button button--primary" role="button">
  <span>Log In</span>
</a>
```

### 2. Modal Dialog Primitive (Native HTML `<dialog>` composed with `.card`)
```html
<!-- Trigger Button (Declarative Invoker command="show-modal") -->
<button type="button" class="button button--primary" commandfor="my-dialog" command="show-modal" aria-haspopup="dialog">
  <span>Open Dialog</span>
</button>

<!-- Modal Dialog Container (Native positioning & top-layer transitions) -->
<dialog id="my-dialog" class="dialog" aria-labelledby="dialog-title" aria-describedby="dialog-desc">
  <div class="card">
    <article class="card__content">
      <header class="card__header">
        <hgroup class="card__hgroup">
          <h2 id="dialog-title" class="card__title">Dialog Title</h2>
          <p class="card__subtitle">Supporting Subtitle</p>
        </hgroup>
        <form method="dialog">
          <button type="submit" class="button button--subtle button--icon" commandfor="my-dialog" command="close">
            <span class="visually-hidden">Close dialog</span>
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false">
              <path d="M18 6 6 18"></path><path d="m6 6 12 12"></path>
            </svg>
          </button>
        </form>
      </header>

      <div class="card__body">
        <p id="dialog-desc">
          Dialog body copy describing the decision or context clearly.
        </p>
      </div>

      <footer class="card__footer" style="justify-content: flex-end;">
        <form method="dialog" style="display: flex; gap: var(--spacing-8);">
          <button type="submit" class="button button--secondary" commandfor="my-dialog" command="close">
            <span>Cancel</span>
          </button>
          <button type="submit" value="confirm" class="button button--primary">
            <span>Confirm</span>
          </button>
        </form>
      </footer>
    </article>
  </div>
</dialog>
```

### 3. Popover Primitive (Native `popover` + CSS Anchor Positioning composed with `.card` or `.banner`)
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
  <svg class="icon" width="24" height="24" aria-hidden="true" focusable="false">
    <use href="#ChevronDown"/>
  </svg>
</button>

<!-- Popover Wrapper tethered with position-anchor (Composed with Ruled Translucent Card & Stacked Button Group) -->
<div 
  id="my-popover" 
  popover 
  class="popover popover--anchored"
  style="position-anchor: --my-anchor; min-inline-size: 16rem;"
>
  <div class="card card--compact card--bordered card--translucent card--ruled">
    <article class="card__content">
      <header class="card__header">
        <h3 class="card__title">Quick Actions</h3>
      </header>
      <div class="card__body card__body--flush">
        <div class="button-group button-group--tight button-group--stacked s-button:subtle">
          <button type="button" class="button">
            <svg class="icon" width="24" height="24" aria-hidden="true" focusable="false"><use href="#Duplicate"/></svg>
            <span>Duplicate</span>
          </button>
          <button type="button" class="button">
            <svg class="icon" width="24" height="24" aria-hidden="true" focusable="false"><use href="#Download"/></svg>
            <span>Export JSON</span>
          </button>
          <hr class="divider">
          <button type="button" class="button button--subtle-destructive">
            <svg class="icon" width="24" height="24" aria-hidden="true" focusable="false"><use href="#Delete"/></svg>
            <span>Delete Item</span>
          </button>
        </div>
      </div>
    </article>
  </div>
</div>
```

### 4. Accordion Primitive (Native `<details>` / `<summary>`)
```html
<!-- Standalone Disclosure (Indicator generated automatically via ::before and ::after pseudo-elements) -->
<details class="accordion">
  <summary>Accordion Header</summary>
  <p>Accordion body content.</p>
</details>

<!-- Plain, Flush & Transparent Disclosures -->
<details class="accordion accordion--plain">
  <summary>Plain Accordion (No Border)</summary>
  <p>Borderless disclosure content.</p>
</details>

<details class="accordion accordion--flush">
  <summary>Flush Accordion (Edge to Edge)</summary>
  <p>Flush disclosure content.</p>
</details>

<details class="accordion accordion--transparent">
  <summary>Transparent Accordion</summary>
  <p>Transparent disclosure content.</p>
</details>

<!-- Opt-Out: Accordion Without Indicator Icon -->
<details class="accordion accordion--no-icon">
  <summary>Accordion Without Indicator Icon</summary>
  <p>Content without plus/minus icon.</p>
</details>

<!-- Native Exclusive Group (only one open at a time without JavaScript) -->
<div class="accordion-group">
  <details class="accordion" name="faq-group" open>
    <summary>First Question</summary>
    <p>Answer to the first question.</p>
  </details>

  <details class="accordion" name="faq-group">
    <summary>Second Question</summary>
    <p>Answer to the second question.</p>
  </details>
</div>

<!-- Group Opt-Out: No Indicator Icons on any child disclosures -->
<div class="accordion-group accordion-group--no-icons">
  <details class="accordion" name="faq-clean">
    <summary>Item Without Icon</summary>
    <p>Clean disclosure content.</p>
  </details>
</div>
```

### 5. Badge & Chip Primitives & Status Indicators
```html
<!-- Default Badge -->
<span class="badge"><span>Standard</span></span>

<!-- Semantic Status Badges (via class or data-status) -->
<span class="badge badge--accent"><span>Enrolled</span></span>
<span class="badge badge--success" data-status="online"><span>Online</span></span>
<span class="badge badge--warning" data-status="away"><span>Pending</span></span>
<span class="badge badge--danger" data-status="busy"><span>Busy</span></span>

<!-- Round & Small Badges -->
<span class="badge badge--accent badge--round"><span>New Release</span></span>
<span class="badge badge--danger badge--sm badge--round"><span>3</span></span>

<!-- Corner Notification Badges (Anchored to relative buttons or action containers) -->
<!-- NOTE: Do NOT place corner badges inside .avatar (which uses overflow: hidden). For avatars, use [data-status] color rings -->
<button type="button" class="button button--icon" style="position: relative;" aria-label="Notifications (1 unread)">
  <svg class="icon" width="24" height="24" aria-hidden="true"><use href="#BellFilled"/></svg>
  <span class="badge badge--danger badge--sm badge--round badge--top-right-corner">
    <span>1</span>
  </span>
</button>

<!-- Live Status Indicators (with zero-JS indicator dot) -->
<span class="status" data-status="online">Online</span>
<span class="status" data-status="away">Away</span>
<span class="status" data-status="busy">Do Not Disturb</span>
<span class="status" data-status="offline">Offline</span>

<!-- Metadata Chip -->
<span class="chip">Lesson 04</span>
<span class="chip chip--status" data-status="online">Online</span>
```

### 6. Avatar Primitive & Avatar Groups
```html
<!-- Initials Avatar with Live Status Indicator Ring -->
<div class="avatar" data-status="online" aria-label="Alex Bennett (online)">
  <span>AB</span>
</div>

<!-- Photo Image Avatar -->
<div class="avatar" data-status="away">
  <img src="https://example.com/avatar.jpg" alt="User profile photo" loading="lazy" />
</div>

<!-- Avatar Button (Interactive) -->
<button type="button" class="button button--avatar button--round" data-status="online" aria-label="Jordan Lee profile">
  <img src="https://example.com/avatar.jpg" alt="" width="40" height="40" style="object-fit: cover; border-radius: inherit;" />
</button>

<!-- Icon Fallback Avatar -->
<div class="avatar" aria-label="User profile">
  <svg class="icon" aria-hidden="true" focusable="false"><use href="#User"/></svg>
</div>

<!-- Placeholder / Add User Avatar -->
<div class="avatar avatar--placeholder" aria-label="Add team member">
  <svg class="icon" aria-hidden="true" focusable="false"><use href="#User"/></svg>
</div>

<!-- Custom Colored Avatar via inline tokens -->
<div class="avatar" style="--avatar-bg: #e50914; --avatar-text: #ffffff;" aria-label="Alex Bennett">
  <span>AB</span>
</div>

<!-- Inline Avatar Group with Counter -->
<div class="avatar-group" aria-label="Project team">
  <div class="avatar" aria-label="Alex Bennett"><span>AB</span></div>
  <div class="avatar" aria-label="Taylor Smith"><span>TS</span></div>
  <div class="avatar" aria-label="Jordan Lee"><span>JL</span></div>
  <div class="avatar" aria-label="5 additional team members"><span>+5</span></div>
</div>

<!-- Stacked Crescent Avatar Group (Layered pile with counter on top) -->
<div class="avatar-group avatar-group--stacked avatar-group--crescent" aria-label="5 active members">
  <div class="avatar" aria-hidden="true"></div>
  <div class="avatar" aria-hidden="true"></div>
  <div class="avatar" aria-hidden="true"></div>
  <div class="avatar" aria-hidden="true"></div>
  <div class="avatar" aria-label="5 members"><span>5</span></div>
</div>
```

### 7. Input & Form Control Primitives

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
<div class="choices choices--inline">
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

#### E. Segmented Toggle Switch Primitive (`role="switch"`)
```html
<!-- Default Switch (Zero-JS state management via CSS :has(:checked)) -->
<label class="switch">
  <span class="switch__label">Notifications</span>
  <input type="checkbox" role="switch" class="visually-hidden" />
  <span class="switch__control" aria-hidden="true">
    <span class="switch__option switch__option--off">Off</span>
    <span class="switch__option switch__option--on">On</span>
  </span>
</label>

<!-- Active / Checked Switch -->
<label class="switch">
  <span class="switch__label">Dark Mode</span>
  <input type="checkbox" role="switch" class="visually-hidden" checked />
  <span class="switch__control" aria-hidden="true">
    <span class="switch__option switch__option--off">Off</span>
    <span class="switch__option switch__option--on">On</span>
  </span>
</label>

<!-- Compact Switch -->
<label class="switch switch--sm">
  <span class="switch__label">Compact Filter</span>
  <input type="checkbox" role="switch" class="visually-hidden" checked />
  <span class="switch__control" aria-hidden="true">
    <span class="switch__option switch__option--off">Off</span>
    <span class="switch__option switch__option--on">On</span>
  </span>
</label>
```

#### F. Range Slider Input Primitive (`<input type="range">`)
```html
<!-- Interactive Range Slider with Output Readout -->
<div class="field">
  <div class="field__header">
    <label for="volume-control" class="field__label">Volume Level</label>
    <output for="volume-control" class="field__output" id="vol-readout">65%</output>
  </div>
  <input 
    id="volume-control" 
    type="range" 
    class="range" 
    min="0" 
    max="100" 
    value="65" 
    style="--value: 65%;"
    aria-describedby="vol-readout"
  />
</div>

<!-- Range Sizing (.range--sm: 4px/16px, .range--lg: 12px/32px) -->
<input type="range" class="range range--sm" value="30" min="0" max="100" style="--value: 30%;" />
<input type="range" class="range" value="50" min="0" max="100" style="--value: 50%;" />
<input type="range" class="range range--lg" value="75" min="0" max="100" style="--value: 75%;" />

<!-- Semantic Color Range Sliders -->
<input type="range" class="range range--success" value="85" min="0" max="100" style="--value: 85%;" />
<input type="range" class="range range--warning" value="45" min="0" max="100" style="--value: 45%;" />
<input type="range" class="range range--danger" value="20" min="0" max="100" style="--value: 20%;" />
```

#### G. Complete Form Layout & Submission Bar
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

### 7. Skip Link Primitive (WCAG 2.4.1 Bypass Blocks)
```html
<!-- Canonical Top Banner Skip Link (Placed at the very top of <body>) -->
<a href="#main" class="skip-link">
  <span>Skip to main content</span>
</a>

<!-- Floating Round Skip Link Variant -->
<a href="#main" class="skip-link skip-link--floating">
  <span>Skip to main content</span>
</a>

<!-- Grouped Multiple Destinations (Semantic <nav> and <ul>/<li> list) -->
<nav class="skip-links" aria-label="Skip links">
  <ul>
    <li>
      <a href="#main" class="skip-link">
        <span>Skip to main content</span>
      </a>
    </li>
    <li>
      <a href="#navigation" class="skip-link">
        <span>Skip to navigation</span>
      </a>
    </li>
    <li>
      <a href="#footer" class="skip-link">
        <span>Skip to footer</span>
      </a>
    </li>
  </ul>
</nav>
```

### 8. Link & Block Link Primitives

#### A. Inline Hyperlinks
```html
<!-- Default Inline Link -->
<a href="/accessibility" class="link">
  <span>Accessibility Standards</span>
</a>

<!-- Inverted Context Link -->
<a href="/report" class="link link--inverted">
  <span>Conformance Report</span>
</a>

<!-- On-Dark Context Link -->
<a href="/github" class="link link--on-dark">
  <span>GitHub Repository</span>
</a>

<!-- Subtle Link (inherits color at rest, lights up on interaction) -->
<a href="/category/design" class="link link--subtle">
  <span>Design Systems</span>
</a>

<!-- External Link (MANDATORY: .visually-hidden disclaimer + aria-hidden .icon) -->
<a href="https://www.w3.org" class="link" target="_blank" rel="noopener noreferrer">
  <span>W3C Guidelines</span>
  <span class="visually-hidden"> (opens in a new tab)</span>
  <svg class="icon icon--dir" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
    <polyline points="15 3 21 3 21 9"></polyline>
    <line x1="10" y1="14" x2="21" y2="3"></line>
  </svg>
</a>
```

#### B. Block Links (Cards & Directory Callouts)
```html
<!-- Standalone Block Link Callout with micro-animated trailing arrow -->
<a href="/case-studies/contrast" class="block-link">
  <span class="block-link__text">Color Contrast Beyond 4.5:1</span>
  <svg class="block-link__arrow icon icon--dir" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false">
    <line x1="7" y1="17" x2="17" y2="7"></line>
    <polyline points="7 7 17 7 17 17"></polyline>
  </svg>
</a>

<!-- Category / Resource List of Block Links -->
<ul style="list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: var(--spacing-8);">
  <li>
    <a href="/topics/wcag" class="block-link">
      <span class="block-link__text">WCAG 2.2 Guidelines</span>
      <svg class="block-link__arrow icon icon--dir" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false">
        <line x1="7" y1="17" x2="17" y2="7"></line>
        <polyline points="7 7 17 7 17 17"></polyline>
      </svg>
    </a>
  </li>
</ul>
```

### 9. Icon Primitive
```html
<!-- Standard Inline Icon (scales dynamically with surrounding text font-size) -->
<svg class="icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
  <circle cx="12" cy="12" r="10"></circle>
</svg>

<!-- Directional Icon (automatically mirrors with scale: -1 1 in [dir="rtl"] contexts) -->
<svg class="icon icon--dir" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
  <line x1="5" y1="12" x2="19" y2="12"></line>
  <polyline points="12 5 19 12 12 19"></polyline>
</svg>
```

### 10. Card Primitive

#### A. Full Composable Card with Media (Full-Card Link via `.card__link`)
```html
<div class="card">
  <div class="card__thumb">
    <img 
      src="https://example.com/cover.jpg" 
      alt="Descriptive label for screen readers" 
      loading="lazy" 
    />
  </div>
  <article class="card__content">
    <header class="card__header">
      <hgroup class="card__hgroup">
        <h3 class="card__title">
          <a href="/articles/my-post" class="card__link">Article Headline</a>
        </h3>
        <p class="card__subtitle">Supporting Subtitle</p>
      </hgroup>
    </header>
    <div class="card__body">
      <p>Short summary paragraph describing the content clearly.</p>
    </div>
    <footer class="card__footer">
      <time class="card__date" datetime="2026-09-30">30 September 2026</time>
    </footer>
  </article>
</div>
```

#### B. Content Card with Badge & Action Button
```html
<div class="card">
  <article class="card__content">
    <header class="card__header">
      <hgroup class="card__hgroup">
        <h3 class="card__title">
          <a href="/settings/security" class="card__link">Security Settings</a>
        </h3>
        <p class="card__subtitle">Two-Factor Authentication</p>
      </hgroup>
      <span class="badge badge--success"><span>Active</span></span>
    </header>
    <div class="card__body">
      <p>Manage passkeys, hardware tokens, and two-factor authentication.</p>
    </div>
    <footer class="card__footer">
      <span>Updated 2 days ago</span>
      <button type="button" class="button button--subtle">
        <span>Configure</span>
      </button>
    </footer>
  </article>
</div>
```

#### C. Card Composition in CSS Grid
```html
<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(min(18rem, 100%), 1fr)); gap: var(--spacing-16);">
  <div class="card">
    <div class="card__thumb">
      <img src="https://example.com/thumb.jpg" alt="" loading="lazy" />
    </div>
    <article class="card__content">
      <header class="card__header">
        <h3 class="card__title"><a href="/post-1" class="card__link">Card Title</a></h3>
      </header>
      <div class="card__body">
        <p>Card body copy.</p>
      </div>
      <footer class="card__footer">
        <time datetime="2026-09-30">30 September 2026</time>
      </footer>
    </article>
  </div>
</div>
#### D. Card with Dynamic Concentric Radius (`.card--dynamic-corners`)
```html
<!-- Outer card radius aligns mathematically with nested button curvature:
     --card-radius: calc(min(var(--button-radius), var(--button-min-size)/2) + var(--card-padding) + var(--card-border-width)) -->
<div class="card card--dynamic-corners" style="--button-radius: var(--radius-round);">
  <article class="card__content">
    <header class="card__header">
      <h3 class="card__title"><a href="/plan">Concentric Plan</a></h3>
    </header>
    <div class="card__body">
      <p>Card outer boundary curves harmoniously with the round action button below.</p>
    </div>
    <footer class="card__footer">
      <button type="button" class="button button--primary">
        <span>Get Started</span>
      </button>
    </footer>
  </article>
</div>
```

### 11. Banner Primitive

#### A. Standard Banner
```html
<div class="banner" role="region" aria-label="Notification">
  <div class="banner__inner">
    <p>This is a standard banner message.</p>
  </div>
</div>
```

#### B. Semantic Status Banners with Action Buttons
```html
<!-- Success Banner with Subtle Check Action -->
<div class="banner banner--success" role="status">
  <div class="banner__inner">
    <p>This is a success banner message.</p>
  </div>
  <button type="button" class="button button--subtle banner__action">
    <svg class="icon" width="32" height="32" aria-hidden="true" focusable="false">
      <use href="#Check" />
    </svg>
    <span class="visually-hidden">Action</span>
  </button>
</div>

<!-- Warning Banner with Subtle Check Action -->
<div class="banner banner--warning" role="region" aria-label="Warning">
  <div class="banner__inner">
    <p>This is a warning banner message.</p>
  </div>
  <button type="button" class="button button--subtle banner__action">
    <svg class="icon" width="32" height="32" aria-hidden="true" focusable="false">
      <use href="#Check" />
    </svg>
    <span class="visually-hidden">Action</span>
  </button>
</div>

<!-- Error / Danger Banner with Primary Dismiss Action -->
<div class="banner banner--error" role="alert">
  <div class="banner__inner">
    <p>This is an error banner message.</p>
  </div>
  <button type="button" class="button button--primary banner__action">
    <svg class="icon" width="32" height="32" aria-hidden="true" focusable="false">
      <use href="#Close" />
    </svg>
    <span class="visually-hidden">Close</span>
  </button>
</div>
```

#### C. Verbose Banner with Subheading and Button Actions
```html
<div class="banner" role="region" aria-label="Action required">
  <div class="banner__inner">
    <h3 class="subheading">Subheading</h3>
    <p>This is more verbose banner message.</p>
    <div style="display: flex; gap: var(--spacing-8);">
      <button type="button" class="button">
        <span>Cancel</span>
      </button>
      <button type="button" class="button button--primary">
        <span>OK</span>
      </button>
    </div>
  </div>
</div>
```

#### D. Dynamic Concentric Corners Banner (`.banner--dynamic-corners`)
```html
<!-- Outer curvature scales concentrically with nested round action button:
     --banner-radius: calc(min(var(--button-radius), var(--button-min-size)/2) + var(--banner-outer-padding) + var(--banner-border-width)) -->
<div class="banner banner--dynamic-corners s-button:round" role="region" aria-label="Confirmation">
  <div class="banner__inner">
    <p style="font-size: var(--typography-font-size-1); font-weight: var(--font-weight-bold);">Continue?</p>
  </div>
  <button type="button" class="button banner__action">
    <svg class="icon" width="32" height="32" aria-hidden="true" focusable="false">
      <use href="#Check" />
    </svg>
    <span class="visually-hidden">Action</span>
  </button>
</div>
```

### 12. Prose Primitive (Rich Text & Editorial Layout)

#### A. Standard Article Prose
```html
<article class="prose">
  <h1>Main Article Title</h1>
  <p>Editorial paragraph formatted with balanced line-lengths and proportional numbers.</p>
  
  <h2>Section Heading</h2>
  <p>Paragraph containing an <a href="/guide">accessible hyperlink</a> and inline <code>code sample</code>.</p>
  
  <blockquote>
    <p>A memorable editorial blockquote with inset leading accent border.</p>
  </blockquote>

  <ul>
    <li>First key takeaway item</li>
    <li>Second key takeaway item</li>
  </ul>
</article>
```

#### B. Code Syntax Block inside Prose
```html
<div class="prose">
  <pre><code>:where(textarea) {
  field-sizing: content;
  min-block-size: 3lh;
}</code></pre>
</div>
```

#### C. Figure with Caption
```html
<div class="prose">
  <figure>
    <img src="https://example.com/figure.jpg" alt="Descriptive accessible text" loading="lazy" />
    <figcaption>
      <p>Figure 1: Token architecture and responsive layout.</p>
    </figcaption>
  </figure>
</div>
```

#### D. Container-Responsive Prose (`.prose--cq`)
```html
<!-- Automatically adapts typography to parent container size via container query fluid units (cqi) -->
<div style="container-type: inline-size;">
  <article class="prose prose--cq">
    <h2>Container-Adaptive Section</h2>
    <p>Body copy scales seamlessly according to container width, ideal for cards and sidebars.</p>
  </article>
</div>
```

#### E. Fixed Typography Prose (`.prose--fixed`)
```html
<!-- Uses fixed, non-fluid modular scale steps without fluid viewport or container interpolation -->
<article class="prose prose--fixed">
  <h1>Fixed Title (Size 3)</h1>
  <p>Body paragraphs fixed to 1rem (Size 0) with a locked 1rem vertical rhythm.</p>
  <h2>Fixed Section Heading (Size 2)</h2>
  <h3>Fixed Subheading (Size 1)</h3>
</article>
```

### 13. Table Primitive

#### A. Standard Data Table with Accessible Scroll Container
```html
<div class="table-container" tabindex="0" role="region" aria-label="Quarterly Financial Results">
  <table class="table">
    <caption class="table__caption">Quarterly Financial Results (Q3 2026)</caption>
    <thead>
      <tr>
        <th scope="col">Department</th>
        <th scope="col" class="table__cell--numeric">Budget</th>
        <th scope="col" class="table__cell--numeric">Actual</th>
        <th scope="col" class="table__cell--numeric">Variance</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">Engineering</th>
        <td class="table__cell--numeric">$120,000</td>
        <td class="table__cell--numeric">$114,500</td>
        <td class="table__cell--numeric">-$5,500</td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <th scope="row">Total</th>
        <td class="table__cell--numeric">$120,000</td>
        <td class="table__cell--numeric">$114,500</td>
        <td class="table__cell--numeric">-$5,500</td>
      </tr>
    </tfoot>
  </table>
</div>
```

#### B. Table Composed inside Card with Striped Rows
```html
<div class="card">
  <div class="card__body" style="padding: 0;">
    <div class="table-container" tabindex="0" role="region" aria-label="User Directory" style="margin-block-end: 0;">
      <table class="table table--striped table--hover">
        <thead>
          <tr>
            <th scope="col" class="table__cell--fit">User</th>
            <th scope="col">Role</th>
            <th scope="col" class="table__cell--fit">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row" class="table__cell--fit">Paul Woods</th>
            <td>Design Engineer</td>
            <td class="table__cell--fit"><span class="badge badge--success"><span>Active</span></span></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
```

#### C. Sortable Header Table
```html
<div class="table-container" tabindex="0" role="region" aria-label="Package Registry">
  <table class="table table--hover">
    <thead>
      <tr>
        <th scope="col">
          <button type="button" class="table__sort-button" aria-sort="ascending" aria-label="Sort by package name">
            <span>Package</span>
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
        </th>
        <th scope="col" class="table__cell--numeric">
          <button type="button" class="table__sort-button" aria-sort="descending" aria-label="Sort by downloads">
            <span>Downloads</span>
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row"><code>@design-for-humans/css</code></th>
        <td class="table__cell--numeric">14,280</td>
      </tr>
    </tbody>
  </table>
</div>
```

#### D. Full Sticky Matrix Table (.table--sticky-*)
```html
<div class="table-container" tabindex="0" role="region" aria-label="Audit Matrix" style="max-block-size: 20rem; overflow: auto;">
  <table class="table table--sticky-head table--sticky-footer table--sticky-first-column table--sticky-last-column table--striped">
    <caption class="table__caption">WCAG 2.2 Conformance Audit Results</caption>
    <thead>
      <tr>
        <th scope="col" class="table__cell--fit">Component</th>
        <th scope="col">WCAG Criterion</th>
        <th scope="col">Description</th>
        <th scope="col" class="table__cell--fit">Level</th>
        <th scope="col" class="table__cell--fit table__cell--center">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row" class="table__cell--fit">Modal Dialog</th>
        <td class="table__cell--long">2.1.2 No Keyboard Trap</td>
        <td class="table__cell--long">Modal dialogs must not trap keyboard focus when cycling elements.</td>
        <td class="table__cell--fit"><span class="badge"><span>Level A</span></span></td>
        <td class="table__cell--fit table__cell--center">
          <button type="button" class="button button--subtle button--sm"><span>Inspect</span></button>
        </td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <th scope="row" class="table__cell--fit">Summary</th>
        <td colspan="3" class="table__cell--long">All core components passing compliance</td>
        <td class="table__cell--fit table__cell--center"><span class="badge badge--success"><span>Passed</span></span></td>
      </tr>
    </tfoot>
  </table>
</div>
```

#### E. Flush Table (.table--flush)
```html
<div class="table-container" tabindex="0" role="region" aria-label="Flush Alignment Summary">
  <table class="table table--flush">
    <caption class="table__caption">Editorial Aligned Table</caption>
    <thead>
      <tr>
        <th scope="col">Component</th>
        <th scope="col" class="table__cell--numeric">Score</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">Button</th>
        <td class="table__cell--numeric">100%</td>
      </tr>
    </tbody>
  </table>
</div>
```

### 14. Button Group Primitive

#### A. Standard Button Group with Divider & Text Content
```html
<div class="button-group">
  <a href="/prev" class="button"><span>Previous</span></a>
  <span class="button-group__content button-group__fill">Step 2 of 4</span>
  <hr class="divider">
  <button type="button" class="button button--primary"><span>Next</span></button>
</div>
```

#### B. Full-Width Fill & Stacked Button Groups
```html
<!-- Fill (Stretches buttons across container width) -->
<div class="button-group button-group--stretch">
  <a href="/drafts" class="button"><span>Drafts</span></a>
  <span class="button"><span>Published</span></span>
  <button type="button" class="button button-group__end button--primary"><span>Create</span></button>
</div>

<!-- Stacked & Ruled (Vertical column listbox / menu with section headings & auto-pushed trailing badges) -->
<div class="button-group button-group--stacked button-group--ruled s-button:subtle-tint" role="listbox" aria-label="Action Menu">
  <h3 class="button-group__content micro-heading text-muted">Primary Actions</h3>
  <button type="button" class="button" role="option">
    <svg class="icon" width="20" height="20" aria-hidden="true"><use href="#Share"/></svg>
    <span class="button__text">Share Document</span>
    <span class="badge badge--sm"><span>New</span></span>
  </button>
  <button type="button" class="button" role="option">
    <svg class="icon" width="20" height="20" aria-hidden="true"><use href="#Duplicate"/></svg>
    <span class="button__text">Duplicate</span>
    <kbd class="kbd">⌘D</kbd>
  </button>
  <h3 class="button-group__content micro-heading text-muted">Danger Zone</h3>
  <button type="button" class="button button--destructive" role="option">
    <svg class="icon" width="20" height="20" aria-hidden="true"><use href="#Delete"/></svg>
    <span class="button__text">Delete Permanently</span>
  </button>
</div>
```

### 15. Divider Primitive

#### A. Horizontal Divider (Default Stack/Block Context)
```html
<hr class="divider">
```

#### B. Vertical Divider (Inside Row Container via Container Style Queries)
```html
<!-- Automatically adopts vertical border-inline-start when container has --direction: row -->
<div class="button-group">
  <button type="button" class="button button--subtle"><span>Dashboard</span></button>
  <hr class="divider">
  <button type="button" class="button button--subtle"><span>Settings</span></button>
</div>
```

### 16. Breadcrumb Primitive

```html
<nav class="breadcrumb" aria-label="Breadcrumb">
  <ol>
    <li><a class="link" href="/topics">Topics</a></li>
    <li><a class="link" href="/topics/visual-design">Visual Design</a></li>
    <li aria-current="page">Modular Scale</li>
  </ol>
</nav>
```

### 17. Pagination & Page Count Primitives

#### A. Numbered Pagination Cluster (.pagination + .button-group)
```html
<nav class="pagination button-group s-button:subtle" aria-label="Pagination">
  <span class="button button--selected" aria-current="page"><span>1</span></span>
  <a class="button" href="/page/2"><span>2</span></a>
  <a class="button" href="/page/3"><span>3</span></a>
  <hr class="divider">
  <a class="button" href="/page/10"><span>10</span></a>
</nav>
```

#### B. Directional Navigation with Text Indicator
```html
<nav class="pagination button-group s-button:subtle" aria-label="Pagination">
  <span aria-disabled="true" class="button">
    <svg class="icon icon--dir" width="24" height="24" aria-hidden="true" focusable="false">
      <use href="#ArrowLeft"/>
    </svg>
    <span class="visually-hidden">Previous page</span>
  </span>
  <hr class="divider">
  <span class="button-group__content">Page 1 of 10</span>
  <hr class="divider">
  <a class="button" href="/page/2">
    <svg class="icon icon--dir" width="24" height="24" aria-hidden="true" focusable="false">
      <use href="#ArrowRight"/>
    </svg>
    <span class="visually-hidden">Next page</span>
  </a>
</nav>
```

#### C. Page Count with Jump Form (.page-count + .inline-form + .inline-field)
```html
<!-- Jump via Number Input -->
<div class="page-count">
  <p class="page-count__info">Page 2 of 10</p>
  <form class="page-count__jump inline-form">
    <div class="inline-field">
      <label for="page-jump-input" class="field__label">Go to page</label>
      <input class="input" type="number" id="page-jump-input" name="page" min="1" max="10" value="2" style="inline-size: 5rem;">
    </div>
    <button class="button button--subtle" type="submit"><span>Go</span></button>
  </form>
</div>

<!-- Jump via Select Menu -->
<div class="page-count">
  <p class="page-count__info">Page 2 of 10</p>
  <form class="page-count__jump inline-form">
    <div class="inline-field">
      <label for="page-jump-select" class="field__label">Go to page</label>
      <select id="page-jump-select" name="page" class="select">
        <option value="1">1</option>
        <option value="2" selected>2</option>
        <option value="3">3</option>
      </select>
    </div>
    <button class="button button--subtle" type="submit"><span>Go</span></button>
  </form>
</div>
```

### 18. Toast Primitive (Live Region Status Stacks Composed with Banner)

#### A. Toast Stack Container with Composed Success Toast
```html
<!-- Toast Stack Container (Anchored to Viewport Corner) -->
<aside class="toast-stack toast-stack--bottom-end" aria-label="Notifications">
  <div class="toast" role="status" aria-live="polite">
    <div class="banner banner--success banner--dynamic-corners s-button:round" role="none">
      <div class="banner__inner">
        <p><strong>Settings saved</strong></p>
        <p>Your preferences have been updated successfully.</p>
      </div>
      <button type="button" class="button button--subtle button--icon banner__action" aria-label="Dismiss notification">
        <svg class="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false">
          <path d="M18 6 6 18"></path><path d="m6 6 12 12"></path>
        </svg>
      </button>
    </div>
  </div>
</aside>
```

#### B. Urgent Alert Toast (Assertive Live Region)
```html
<div class="toast" role="alert" aria-live="assertive">
  <div class="banner banner--error banner--dynamic-corners s-button:round" role="none">
    <div class="banner__inner">
      <p><strong>Connection Lost</strong></p>
      <p>Unable to sync changes to server.</p>
    </div>
    <button type="button" class="button button--primary button--icon banner__action" aria-label="Dismiss error">
      <svg class="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false">
        <path d="M18 6 6 18"></path><path d="m6 6 12 12"></path>
      </svg>
    </button>
  </div>
</div>
```

#### C. Toast Stack Placement Modifiers
```html
<!-- Available stack placements: -->
<aside class="toast-stack toast-stack--bottom-end"></aside>
<aside class="toast-stack toast-stack--bottom-start"></aside>
<aside class="toast-stack toast-stack--bottom-center"></aside>
<aside class="toast-stack toast-stack--top-end"></aside>
<aside class="toast-stack toast-stack--top-start"></aside>
<aside class="toast-stack toast-stack--top-center"></aside>
```

### 19. Wrapper Primitive (Content Width Constraints & Alignment)

#### A. Standard Centered Site-Width Wrapper
```html
<div class="wrapper">
  <h1>Page Title</h1>
  <p>Centered content constrained to standard site width (--site-width / 75rem).</p>
</div>
```

#### B. Size Scale & Alignments
```html
<!-- Large Block Width Constraint (40rem) -->
<div class="wrapper wrapper--lg">
  <article>Constrained editorial article content.</article>
</div>

<!-- BrandMedium Block Width Aligned to Start (30rem) -->
<div class="wrapper wrapper--md wrapper--start">
  <p>Left-aligned medium-width content.</p>
</div>

<!-- Vertically Centered Grid Wrapper -->
<div class="wrapper wrapper--middle">
  <div class="card">Vertically and horizontally centered card.</div>
</div>
```

#### C. Split / Sidebar Layout Primitive (`.split`)
```html
<!-- 2-Column Responsive Layout: Sidebar on start, main content auto-expanding on end -->
<div class="split split--sm">
  <aside class="card">
    <h3>Sidebar Filters</h3>
  </aside>
  <main class="stack">
    <h2>Main Content Area</h2>
  </main>
</div>

<!-- Reverse Split: Main content on start, inspector sidebar on end -->
<div class="split split--sm split--end">
  <main class="stack">
    <h2>Main Editor</h2>
  </main>
  <aside class="card">
    <h3>Inspector Panel</h3>
  </aside>
</div>
```

### 20. Text & Heading Primitives (Typography Presets)

#### A. Standalone Headings Hierarchy
```html
<h1 class="display-title">Display Title</h1>
<h2 class="title">Editorial Title</h2>
<h3 class="heading">Section Heading</h3>
<h4 class="subheading">Article Subheading</h4>
<h5 class="small-heading">Card Subheading</h5>
<span class="micro-heading">Category Eyebrow</span>
```

#### B. Block Text Styles
```html
<p class="large-text">Editorial lead-in paragraph text.</p>
<p class="text">Standard body paragraph styled with design system line-height and font scale.</p>
<p class="strong-text text">Emphasized body text with strong token weight.</p>
<p class="small-text">Secondary caption, timestamp, or form hint.</p>
<p class="micro-text">Compact legal disclaimer or fine-print.</p>
```

#### C. Adaptive & Fixed Scaling Modifiers
```html
<!-- Container-adaptive scaling (cqi units) -->
<h2 class="title title--cq">Container Adaptive Title</h2>
<h3 class="heading heading--cq">Container Adaptive Heading</h3>
<p class="text text--cq">Container Adaptive Body</p>

<!-- Fixed non-fluid scale steps (locked rem units) -->
<h2 class="title title--fixed">Fixed Scale Title</h2>
<h3 class="heading heading--fixed">Fixed Scale Heading</h3>
<p class="text text--fixed">Fixed Scale Body</p>
```

### 21. Alert Primitive (Full-Width Site Announcements & Pinned Banners)

#### A. Sticky Top Announcement Bar with Constrained Content
```html
<aside class="alert alert--sticky" role="region" aria-label="System Notice">
  <div class="wrapper">
    <div class="banner banner--warning s-button:sm" role="none">
      <div class="banner__inner">
        <h3 class="subheading--fixed">Scheduled Maintenance</h3>
        <p>Services will undergo maintenance on Sunday from 02:00 to 04:00 UTC.</p>
      </div>
      <button type="button" class="button button--subtle button--icon banner__action" aria-label="Dismiss alert">
        <svg class="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false">
          <path d="M18 6 6 18"></path><path d="m6 6 12 12"></path>
        </svg>
      </button>
    </div>
  </div>
</aside>
```

#### B. Full-Width Edge-to-Edge System Bar
```html
<aside class="alert alert--top" role="region" aria-label="Global Announcement">
  <div class="banner banner--info s-button:sm" role="none">
    <div class="banner__inner">
      <p><strong>New Release:</strong> Component library v2.0 is now available.</p>
    </div>
    <button type="button" class="button button--subtle button--icon banner__action" aria-label="Dismiss announcement">
      <svg class="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false">
        <path d="M18 6 6 18"></path><path d="m6 6 12 12"></path>
      </svg>
    </button>
  </div>
</aside>
```

#### C. Bottom Fixed Consent Bar
```html
<aside class="alert alert--bottom" role="region" aria-label="Cookie Preferences">
  <div class="wrapper">
    <div class="banner s-button:sm" role="none">
      <div class="banner__inner">
        <p>We use cookies to ensure optimal site functionality.</p>
      </div>
      <div style="display: flex; gap: var(--spacing-8); align-self: center;">
        <button type="button" class="button button--subtle"><span>Manage</span></button>
        <button type="button" class="button button--primary"><span>Accept All</span></button>
      </div>
    </div>
  </div>
</aside>
```

### 22. Stack, Inline & Cluster Primitives (1D Layout Flows)

#### A. Vertical Stack (.stack)
```html
<div class="stack">
  <div class="card">First Card</div>
  <div class="card">Second Card</div>
</div>
```

#### B. Horizontal Inline Flow (.inline / .stack--inline)
```html
<div class="inline">
  <button type="button" class="button">Option 1</button>
  <button type="button" class="button">Option 2</button>
  <button type="button" class="button">Option 3</button>
</div>
```

#### C. Cluster Primitive (.cluster)
```html
<div class="cluster">
  <span class="badge badge--accent">Design Tokens</span>
  <span class="badge badge--success">WCAG AAA</span>
  <span class="chip">v2.0</span>
</div>
```

#### D. Modifiers (--tight, --nowrap)
```html
<!-- Zero gap stack -->
<div class="stack stack--tight">
  <div>Item 1</div>
  <div>Item 2</div>
</div>

<!-- Non-wrapping inline row -->
<div class="inline inline--nowrap">
  <span>Tag 1</span>
  <span>Tag 2</span>
</div>
```

### 23. Tooltip Primitive (Native Popover & CSS Anchor Positioning)

#### A. Interactive Control with Native Interest Invoker / Anchor Tooltip
```html
<!-- Trigger Button with native interestfor, popovertarget fallback, and anchor-name -->
<button 
  type="button" 
  class="button button--icon button--primary"
  interestfor="tip-save"
  popovertarget="tip-save"
  style="anchor-name: --anchor-save;"
>
  <span class="visually-hidden">Save Document</span>
  <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false">
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
    <polyline points="17 21 17 13 7 13 7 21"></polyline>
    <polyline points="7 3 7 8 15 8"></polyline>
  </svg>
</button>

<!-- Native Inverted Popover Tooltip -->
<div 
  id="tip-save" 
  popover="hint" 
  class="tooltip"
  style="position-anchor: --anchor-save;"
>
  Save document (⌘S)
</div>
```

#### B. Directional Positioning Modifiers
```html
<!-- Top (Default) -->
<div id="tip-top" popover="hint" class="tooltip" style="position-anchor: --anchor-top;">
  Appears above
</div>

<!-- Bottom -->
<div id="tip-bottom" popover="hint" class="tooltip tooltip--bottom" style="position-anchor: --anchor-bottom;">
  Appears below
</div>

<!-- Left / Start -->
<div id="tip-left" popover="hint" class="tooltip tooltip--left" style="position-anchor: --anchor-left;">
  Appears to start
</div>

<!-- Right / End -->
<div id="tip-right" popover="hint" class="tooltip tooltip--right" style="position-anchor: --anchor-right;">
  Appears to end
</div>
```

### 24. Tabs Primitive (Accessible Tablist & Navigation Tabs)

#### A. Interactive WAI-ARIA Tablist with Panels
```html
<div class="tabs">
  <div class="tabs__list" role="tablist" aria-label="Account Settings">
    <button type="button" role="tab" id="tab-1" class="tab" aria-selected="true" aria-controls="panel-1" tabindex="0">
      <span class="tab__text">Overview</span>
    </button>
    <button type="button" role="tab" id="tab-2" class="tab" aria-selected="false" aria-controls="panel-2" tabindex="-1">
      <span class="tab__text">Security</span>
      <span class="badge badge--round badge--accent"><span>2</span></span>
    </button>
  </div>

  <div id="panel-1" role="tabpanel" class="tabs__panel" aria-labelledby="tab-1" tabindex="0">
    <p>Overview panel content.</p>
  </div>
  <div id="panel-2" role="tabpanel" class="tabs__panel" aria-labelledby="tab-2" tabindex="0" hidden>
    <p>Security panel content.</p>
  </div>
</div>
```

#### B. Semantic Navigation Tabs
```html
<nav class="tabs" aria-label="Repository sections">
  <ul class="tabs__list">
    <li><a href="/repo/code" class="tab" aria-current="page"><span class="tab__text">Code</span></a></li>
    <li><a href="/repo/issues" class="tab"><span class="tab__text">Issues</span> <span class="badge badge--subtle"><span>14</span></span></a></li>
    <li><a href="/repo/pulls" class="tab"><span class="tab__text">Pull Requests</span></a></li>
  </ul>
</nav>
```

#### C. Button / Segmented & Round Round Tabs (.tabs--buttons, .tabs--round)
```html
<!-- Button / Segmented Tabs -->
<nav class="tabs tabs--buttons" aria-label="Button tabs">
  <ul class="tabs__list">
    <li><a href="/code" class="tab" aria-current="page"><span class="tab__text">Code</span></a></li>
    <li><a href="/issues" class="tab"><span class="tab__text">Issues</span></a></li>
  </ul>
</nav>

<!-- Round Round Button Tabs -->
<nav class="tabs tabs--buttons tabs--round" aria-label="Round tabs">
  <ul class="tabs__list">
    <li><a href="/monthly" class="tab" aria-current="page"><span class="tab__text">Monthly</span></a></li>
    <li><a href="/annual" class="tab"><span class="tab__text">Annual</span></a></li>
  </ul>
</nav>
```

#### D. Vertical Tabs Layout (.tabs--vertical)
```html
<div class="tabs tabs--vertical">
  <div class="tabs__list" role="tablist" aria-label="Settings Categories">
    <button type="button" role="tab" id="vtab-general" class="tab" aria-selected="true" aria-controls="vpanel-general">
      <span class="tab__text">General</span>
    </button>
    <button type="button" role="tab" id="vtab-security" class="tab" aria-selected="false" aria-controls="vpanel-security">
      <span class="tab__text">Security</span>
    </button>
  </div>

  <div id="vpanel-general" role="tabpanel" class="tabs__panel" aria-labelledby="vtab-general" tabindex="0">
    <p>General configuration settings.</p>
  </div>
  <div id="vpanel-security" role="tabpanel" class="tabs__panel" aria-labelledby="vtab-security" tabindex="0" hidden>
    <p>Passkeys and security controls.</p>
  </div>
</div>
```

### 25. Progress & Meter Primitives

#### A. Progress Primitive (Task Completion Indicator)
```html
<!-- Determinate Progress in Field Wrapper with Label and Readout -->
<div class="field">
  <div class="field__header">
    <label for="upload-progress" class="field__label">Uploading asset...</label>
    <span class="field__result" id="upload-val">68%</span>
  </div>
  <progress 
    id="upload-progress" 
    class="progress" 
    value="68" 
    max="100" 
    aria-describedby="upload-val"
  >
    68%
  </progress>
</div>

<!-- Small / Compact Progress -->
<progress class="progress progress--sm" value="45" max="100">45%</progress>

<!-- Large Progress -->
<progress class="progress progress--lg" value="85" max="100">85%</progress>

<!-- Indeterminate Animated Progress (Background Task / Live Region) -->
<div class="field">
  <label for="sync-progress" class="field__label">Syncing data with cloud...</label>
  <progress id="sync-progress" class="progress" aria-busy="true">Syncing...</progress>
</div>

<!-- Semantic Status Variants -->
<progress class="progress progress--success" value="100" max="100">100%</progress>
<progress class="progress progress--warning" value="40" max="100">40%</progress>
<progress class="progress progress--danger" value="20" max="100">20%</progress>
```

#### B. Meter Primitive (Scalar Range & Gauge Measurement)
```html
<!-- Storage Quota Gauge (Native Optimum / Safe Range) -->
<div class="field">
  <div class="field__header">
    <label for="disk-meter" class="field__label">Server Disk Usage</label>
    <span class="field__result" id="disk-val">25 GB of 100 GB</span>
  </div>
  <meter 
    id="disk-meter" 
    class="meter" 
    value="25" 
    min="0" 
    max="100" 
    low="60" 
    high="85" 
    optimum="20"
    aria-describedby="disk-val"
  >
    25 GB
  </meter>
</div>

<!-- Sub-Optimum Warning Range (Automatic color calculation) -->
<meter class="meter" value="72" min="0" max="100" low="60" high="85" optimum="20">72 GB</meter>

<!-- Critical Danger Range (Automatic color calculation) -->
<meter class="meter" value="94" min="0" max="100" low="60" high="85" optimum="20">94 GB</meter>

<!-- Password Strength Meter -->
<div class="field">
  <label for="pwd-field" class="field__label">Password</label>
  <input id="pwd-field" type="password" class="input" value="SuperSecure#Pass2026!" />
  <div style="inline-size: 100%; margin-block-start: var(--spacing-4);">
    <span class="field__hint" id="pwd-strength">Strength: Strong</span>
    <meter id="pwd-meter" class="meter meter--sm" value="4" min="0" max="4" low="2" high="3" optimum="4" aria-labelledby="pwd-strength">4 of 4</meter>
  </div>
</div>
```

### 13. Component Recipes & Composed Patterns
When building complex UI features (menus, settings panels, user cards, notifications), AI agents MUST compose primitive components instead of introducing custom inline styles or bespoke wrappers.

#### A. Anchored Context Menu Recipe
Composes `.popover.popover--anchored` + `.card.card--compact.card--bordered.card--translucent.card--ruled` + `.card__body.card__body--flush` + `.button-group.button-group--tight.button-group--stacked.s-button:subtle`:
```html
<button 
  type="button" 
  class="button button--secondary" 
  popovertarget="menu-popover" 
  style="anchor-name: --menu-anchor;"
  aria-haspopup="dialog"
>
  <span>Actions</span>
  <svg class="icon" width="24" height="24" aria-hidden="true"><use href="#ChevronDown"/></svg>
</button>

<div id="menu-popover" popover class="popover popover--anchored" style="position-anchor: --menu-anchor; min-inline-size: 16rem;">
  <div class="card card--compact card--bordered card--translucent card--ruled">
    <article class="card__content">
      <header class="card__header">
        <h3 class="card__title">Document Options</h3>
      </header>
      <div class="card__body card__body--flush">
        <div class="button-group button-group--tight button-group--stacked s-button:subtle">
          <button type="button" class="button">
            <svg class="icon" width="24" height="24" aria-hidden="true"><use href="#Duplicate"/></svg>
            <span>Duplicate</span>
          </button>
          <button type="button" class="button">
            <svg class="icon" width="24" height="24" aria-hidden="true"><use href="#Download"/></svg>
            <span>Export JSON</span>
          </button>
          <hr class="divider">
          <button type="button" class="button button--subtle-destructive">
            <svg class="icon" width="24" height="24" aria-hidden="true"><use href="#Delete"/></svg>
            <span>Delete File</span>
          </button>
        </div>
      </div>
    </article>
  </div>
</div>
```

#### B. User Profile Card & Status Flyout Recipe
Composes `.avatar` with `data-status`, `.badge`, `.status`, and `.button-group--space-between`:
```html
<div class="card card--compact card--bordered card--translucent">
  <article class="card__content">
    <header class="card__header">
      <div class="avatar" data-status="online" aria-label="Jordan Lee (online)">
        <span aria-hidden="true">JL</span>
      </div>
      <hgroup class="card__hgroup">
        <h3 class="card__title">Jordan Lee</h3>
        <p class="card__subtitle">jordan.lee@dfh.design</p>
      </hgroup>
    </header>
    <div class="card__body">
      <div class="stack">
        <div class="cluster">
          <span class="badge badge--subtle"><span>Design Lead</span></span>
          <span class="status" data-status="online">Online</span>
        </div>
        <p class="micro-text">
          Lead accessibility auditor for WCAG 2.2 Level AA / AAA design systems.
        </p>
      </div>
    </div>
    <footer class="card__footer">
      <div class="button-group button-group--space-between">
        <button type="button" class="button button--primary s-button:sm"><span>View Profile</span></button>
        <button type="button" class="button button--subtle s-button:sm"><span>Sign Out</span></button>
      </div>
    </footer>
  </article>
</div>
```

#### C. Settings / Preferences Flyout Recipe
Composes `.switch.switch--sm`, `.range.range--sm`, `.field`, and `.button-group--fill-items`:
```html
<div class="card card--compact card--bordered card--translucent card--ruled" style="min-inline-size: 20rem;">
  <article class="card__content">
    <header class="card__header">
      <h3 class="card__title">Preferences</h3>
    </header>
    <div class="card__body">
      <div class="stack">
        <label class="switch switch--sm" style="inline-size: 100%;">
          <span class="switch__label micro-text">High Contrast Mode</span>
          <input type="checkbox" role="switch" class="visually-hidden" />
          <span class="switch__control" aria-hidden="true">
            <span class="switch__option switch__option--off">Off</span>
            <span class="switch__option switch__option--on">On</span>
          </span>
        </label>
        <div class="field">
          <div class="field__header">
            <label for="font-scale-slider" class="field__label">UI Scale</label>
            <output for="font-scale-slider" class="field__output">100%</output>
          </div>
          <input id="font-scale-slider" type="range" class="range range--sm" value="50" min="0" max="100" style="--value: 50%;" />
        </div>
      </div>
    </div>
    <footer class="card__footer card__footer--flush">
      <div class="button-group button-group--fill-items">
        <button type="button" class="button button--subtle"><span>Done</span></button>
      </div>
    </footer>
  </article>
</div>
```

#### D. Application Header & Global Navigation Landmark Recipe
Composes `.skip-link` + `.header.header--sticky.header--translucent` + `.flex.justify-content-between.align-items-center` + `.cluster` + `.button--subtle` (`aria-current="page"`) + `.badge--top-right-corner` + `button.button--avatar` (`[data-status]`) + anchored `.popover`:
```html
<!-- In-Flow Landmark Skip Link -->
<a href="#main" class="skip-link"><span>Skip to main content</span></a>

<!-- Global Header Landmark -->
<header class="header header--sticky header--translucent padding-block-sm">
  <div class="wrapper flex align-items-center justify-content-between">
    <!-- Brand -->
    <a href="/" class="link link--subtle flex align-items-center gap-sm font-weight-bold font-size-lg" style="text-decoration: none; color: inherit;">
      <svg class="icon" width="24" height="24" aria-hidden="true"><use href="#Share"/></svg>
      <span>Design For Humans</span>
    </a>

    <!-- Primary Nav -->
    <nav aria-label="Primary navigation" class="cluster gap-sm">
      <ul class="cluster gap-sm">
        <li><a href="#dashboard" class="button button--subtle" aria-current="page"><span>Dashboard</span></a></li>
        <li><a href="#components" class="button button--subtle"><span>Components</span></a></li>
        <li><a href="#audit" class="button button--subtle"><span>Audit</span></a></li>
      </ul>
    </nav>

    <!-- Actions -->
    <div class="cluster align-items-center gap-sm">
      <!-- Search Trigger -->
      <button type="button" class="button button--subtle flex align-items-center gap-sm" aria-label="Search documentation (Press Cmd+K)">
        <svg class="icon" width="20" height="20" aria-hidden="true"><use href="#Search"/></svg>
        <span class="font-size-sm text-color-muted">Search...</span>
        <span class="chip chip--sm">⌘K</span>
      </button>

      <!-- Notifications -->
      <button type="button" class="button button--icon button--subtle" style="position: relative;" aria-label="Notifications (3 unread)">
        <svg class="icon" width="24" height="24" aria-hidden="true"><use href="#BellFilled"/></svg>
        <span class="badge badge--danger badge--sm badge--round badge--top-right-corner"><span>3</span></span>
      </button>

      <!-- User Avatar Trigger & Anchored Popover -->
      <button type="button" class="button avatar button--avatar button--round" popovertarget="header-user-popover" style="anchor-name: --header-user-anchor;" data-status="online" aria-haspopup="dialog" aria-label="Account menu (online)">
        <span>AB</span>
      </button>

      <div id="header-user-popover" popover class="popover popover--anchored" style="position-anchor: --header-user-anchor; min-inline-size: 18rem;">
        <div class="card card--compact card--bordered card--translucent card--ruled">
          <article class="card__content">
            <header class="card__header">
              <div class="avatar" data-status="online"><span>AB</span></div>
              <hgroup class="card__hgroup">
                <h3 class="card__title">Alex Bennett</h3>
                <p class="card__subtitle">alex.bennett@dfh.design</p>
              </hgroup>
            </header>
            <div class="card__body card__body--flush">
              <div class="button-group button-group--tight button-group--stacked s-button:subtle">
                <button type="button" class="button"><svg class="icon" width="20" height="20" aria-hidden="true"><use href="#User"/></svg><span>Profile</span></button>
                <button type="button" class="button"><svg class="icon" width="20" height="20" aria-hidden="true"><use href="#Settings"/></svg><span>Settings</span></button>
              </div>
            </div>
            <footer class="card__footer card__footer--flush">
              <div class="button-group button-group--tight button-group--stacked s-button:subtle">
                <button type="button" class="button button--subtle-destructive"><span>Sign Out</span></button>
              </div>
            </footer>
          </article>
        </div>
      </div>
    </div>
  </div>
</header>
```

#### E. Command Palette / Search Modal
Composes `.dialog` + `.card.card--flush` + `.card__header.focus-within` + `.input--flush.focus-none` + `.button-group.button-group--stacked.button-group--ruled.s-button:subtle-tint`:
```html
<dialog id="cmd-palette" class="dialog" aria-labelledby="cmd-title">
  <div class="card card--flush bg-card max-w-2xl">
    <article class="card__content">
      
      <!-- Search Bar Header with Focus Delegation -->
      <header class="card__header inline gap-sm focus-within">
        <h2 id="cmd-title" class="visually-hidden">Search components</h2>
        <span class="icon-box">
          <svg class="icon text-muted" width="24" height="24" aria-hidden="true"><use href="#Search"/></svg>
        </span>
        <input 
          type="search" 
          class="input input--flush focus-none flex-grow" 
          placeholder="Search components, tokens, documentation..."
          aria-label="Search"
        />
        <button type="button" class="button button--subtle button--icon" commandfor="cmd-palette" command="close">
          <span class="visually-hidden">Close</span>
          <svg class="icon" width="20" height="20" aria-hidden="true"><use href="#Close"/></svg>
        </button>
      </header>

      <!-- Filtered Suggestion Stack with Ruled Button Group -->
      <div class="card__body card__body--flush overflow-y-auto" style="max-block-size: 24rem;">
        <div class="button-group button-group--stacked button-group--ruled s-button:subtle-tint" role="listbox" aria-label="Navigation suggestions">
          
          <h3 class="button-group__content micro-heading text-muted">UI Components</h3>
          <a href="#button" class="button button--subtle" role="option">
            <svg class="icon" width="20" height="20" aria-hidden="true"><use href="#Share"/></svg>
            <span class="button__text">Button Primitive</span>
            <span class="badge badge--sm"><span>Component</span></span>
          </a>
          <a href="#switch" class="button button--subtle" role="option">
            <svg class="icon" width="20" height="20" aria-hidden="true"><use href="#Check"/></svg>
            <span class="button__text">Switch Toggle</span>
            <span class="badge badge--sm"><span>Component</span></span>
          </a>

          <h3 class="button-group__content micro-heading text-muted">Design Tokens</h3>
          <a href="#colors" class="button button--subtle" role="option">
            <svg class="icon" width="20" height="20" aria-hidden="true"><use href="#Settings"/></svg>
            <span class="button__text">Color Palettes & Semantic Schemes</span>
            <span class="chip">Tier 2</span>
          </a>
        </div>
      </div>

      <!-- Action Footer with Keyboard Shortcuts -->
      <footer class="card__footer split bg-subtle text-muted font-size--1">
        <div class="cluster gap-sm">
          <span class="inline gap-xs"><kbd class="kbd">↑</kbd><kbd class="kbd">↓</kbd> Navigate</span>
          <span class="inline gap-xs"><kbd class="kbd">↵</kbd> Select</span>
          <span class="inline gap-xs"><kbd class="kbd">ESC</kbd> Close</span>
        </div>
        <span>Design For Humans v2.2</span>
      </footer>

    </article>
  </div>
</dialog>
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

### 5. Local Private Variables Manifest (`--_<component>-*`)
- In component stylesheets, define all local fallback ladders at the top of the base `:where(.<component>)` selector using the private `--_<component>-*` prefix.
- Modifiers (`.<component>--flush`, `.<component>--plain`, etc.) should re-assign private variables rather than repeating complex selector declarations or nested resets.
- Child elements and pseudo-elements must consume `var(--_<component>-*)` directly.

---

## Agent Workflow for Creating Components
1. **Check Tokens:** Verify required tokens exist in `tokens/3-component.json`. If missing, add them and run `npm run build:tokens`.
2. **Author CSS:** Create `packages/css/src/components/<component>.css` using `:where()` for low specificity, local private variables manifest (`--_<component>-*`), native CSS nesting with explicit `&` for states and pseudo-classes (`&:hover`, `&:active`, `&:focus-visible`), logical properties (`inline-size`, `block-size`, `padding-inline`, `padding-block`), and standardized section comments. Consult `.agents/skills/tokens/SKILL.md` (Section 4) and `.agents/skills/css-commenting/SKILL.md` for full guidelines.
3. **Register in Entrypoint:** Add `@import './components/<component>.css';` to `packages/css/src/index.css`.
4. **Author Storybook Stories:** Create `packages/storybook/stories/<component>.stories.ts` covering all variants, sizes, states (`hover`, `active`, `disabled`, `aria-disabled`), and verify with `npm run build-storybook --workspace=@design-for-humans/storybook`.