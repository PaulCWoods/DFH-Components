import type { Meta, StoryObj } from '@storybook/html';

interface InputArgs {
  label: string;
  placeholder?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  size?: 'sm' | 'md' | 'lg';
  type?: 'text' | 'email' | 'password' | 'number' | 'search';
}

const meta: Meta<InputArgs> = {
  title: 'Atoms/Input',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
### Developer & Designer Notes: Input Primitive

The **Input** primitive provides accessible text-like inputs, color pickers, and file inputs engineered to meet WCAG 2.2 AA / AAA standards with zero JavaScript overhead.
Built with zero-specificity \`:where()\`, a local private variable manifest (\`--_input-*\`), and native style container queries.

---

#### 1. Canonical Semantic Markup Signature
AI agents and developers MUST use the following markup structure:

\`\`\`html
<div class="field">
  <label for="user-email" class="field__label">Email Address</label>
  <p id="user-email-hint" class="field__hint">We will only use this for billing receipts.</p>
  <input 
    id="user-email" 
    type="email" 
    class="input" 
    placeholder="you@domain.com"
    aria-describedby="user-email-hint"
    required
  />
</div>
\`\`\`

---

#### 2. WCAG 2.2 Conformance Matrix

| Criterion | Level | Implementation Strategy |
| :--- | :---: | :--- |
| **2.5.5 Target Size (Enhanced)** | **AAA** | Standard (\`md\`) inputs default to **48px** block size (\`--spacing-target\`) to exceed enhanced touch targets. |
| **2.5.8 Target Size (Minimum)** | **AA** | Compact (\`input--sm\`) controls maintain **32px** height, exceeding the 24x24px minimum touch target threshold with ample inline padding. |
| **1.4.3 / 1.4.11 Contrast** | **AA** | 4.5:1 text contrast for values and 3:1 graphical boundaries for resting borders, focus rings, and validation indicators. |
| **2.4.7 / 2.4.13 Focus Visible** | **AA/AAA** | High-contrast focus ring (\`--focus-ring-width: 2px solid var(--focus-ring-color)\`, \`--focus-ring-offset: 2px\`) with at least 3:1 contrast. |
| **3.3.1 Error Identification** | **A** | Paired with \`aria-invalid="true"\` and connected via \`aria-describedby\` to a live \`<p class="field__error" role="alert">\`. |
| **Modern Interaction Validation** | **Standard** | \`:user-invalid\` and \`:user-valid\` pseudo-classes only evaluate *after* user interaction and blur, preventing premature red borders on load. |

---

#### 3. CSS Custom Property Contract Table

| Custom Property | Fallback | Intended Purpose |
| :--- | :--- | :--- |
| \`--input-min-size\` | \`--spacing-target\` (3rem / 48px) | Outer block size matching WCAG touch target |
| \`--input-bg\` | \`--surface-card\` | Input canvas fill color |
| \`--input-border-width\` | \`--border-width\` (2px) | Outline stroke thickness |
| \`--input-border-color\` | \`--border-color-quiet\` (\`currentColor\`) | Resting border stroke color |
| \`--input-color\` | \`--foreground\` (\`currentColor\`) | Typed text color |
| \`--input-padding-block\` | \`--spacing-8\` (0.5rem) | Vertical inner clearance |
| \`--input-padding-inline\` | \`--spacing-16\` (1rem) | Horizontal inner clearance |
| \`--input-radius\` | \`--radius\` (0.5rem) | Corner curvature |
| \`--input-placeholder-color\` | \`--foreground-muted\` | Accessible placeholder text color |
| \`--input-transition\` | \`--duration-sm\` (150ms) | Focus, hover, and validation transition speed |

---

#### 4. Zero-Class Container Style Queries (\`@container style(...)\`)
Parents can declaratively orchestrate input styling across forms without utility classes:

\`\`\`css
/* Example: Dense toolbar or search drawer */
.search-sidebar {
  --input-variation: plain;
  --input-corners: round;
  --ui-density: dense;
}
\`\`\`
`,
      },
    },
  },
  argTypes: {
    label: {
      description: 'Associated field label text',
      control: 'text',
      defaultValue: 'Email Address',
    },
    placeholder: {
      description: 'Helper placeholder text',
      control: 'text',
      defaultValue: 'you@domain.com',
    },
    hint: {
      description: 'Supporting hint description',
      control: 'text',
      defaultValue: 'We will never share your personal email.',
    },
    error: {
      description: 'Validation error message',
      control: 'text',
      defaultValue: '',
    },
    required: {
      description: 'HTML5 required validation attribute',
      control: 'boolean',
      defaultValue: false,
    },
    disabled: {
      description: 'Disabled interaction state',
      control: 'boolean',
      defaultValue: false,
    },
    readonly: {
      description: 'Read-only state',
      control: 'boolean',
      defaultValue: false,
    },
    size: {
      description: 'Input sizing variant',
      control: 'select',
      options: ['sm', 'md', 'lg'],
      defaultValue: 'md',
    },
    type: {
      description: 'Native HTML input type',
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'search'],
      defaultValue: 'email',
    },
  },
  render: (args) => {
    const inputId = 'playground-input-field';
    const hintId = `${inputId}-hint`;
    const errorId = `${inputId}-error`;

    const sizeClass = args.size && args.size !== 'md' ? `input--${args.size}` : '';
    const inputClasses = ['input', sizeClass].filter(Boolean).join(' ');

    const describedBy = [
      args.hint ? hintId : '',
      args.error ? errorId : '',
    ].filter(Boolean).join(' ') || undefined;

    return `
      <div class="demo-stage demo-constrained--md">
        <div class="field">
          <label for="${inputId}" class="field__label">
            ${args.label}
          </label>
          ${args.hint ? `<p id="${hintId}" class="field__hint">${args.hint}</p>` : ''}
          <input 
            id="${inputId}"
            type="${args.type || 'text'}"
            class="${inputClasses}"
            placeholder="${args.placeholder || ''}"
            ${args.required ? 'required' : ''}
            ${args.disabled ? 'disabled' : ''}
            ${args.readonly ? 'readonly' : ''}
            ${describedBy ? `aria-describedby="${describedBy}"` : ''}
            ${args.error ? 'aria-invalid="true"' : ''}
          />
          ${args.error ? `
            <p id="${errorId}" class="field__error" role="alert">
              <span>${args.error}</span>
            </p>
          ` : ''}
        </div>
      </div>
    `;
  },
};

export default meta;
type Story = StoryObj<InputArgs>;

/**
 * 1. Playground (Interactive Sandbox)
 * Adjust props, types, validation states, and sizes using the controls table below.
 */
export const Playground: Story = {
  args: {
    label: 'Primary Email',
    placeholder: 'alex@enterprise.org',
    hint: 'Used for two-factor login verification.',
    error: '',
    required: true,
    disabled: false,
    readonly: false,
    size: 'md',
    type: 'email',
  },
};

/**
 * 2. Anatomy & Structure Breakdown
 * Shows the semantic relationship between Label, Input, Hint, and Error elements.
 */
export const Anatomy: Story = {
  render: () => `
    <div class="demo-stage demo-constrained--md stack">
      <div class="demo-label">1. Label &rarr; 2. Input Primitive &rarr; 3. Hint Copy &rarr; 4. Live Error Alert</div>
      
      <div class="field">
        <label for="anatomy-input" class="field__label">Full Legal Name</label>
        <p id="anatomy-hint" class="field__hint">As printed on your passport or national ID card.</p>
        <input 
          id="anatomy-input" 
          type="text" 
          class="input" 
          placeholder="e.g. Maya Angelou" 
          aria-describedby="anatomy-hint anatomy-error"
          aria-invalid="true"
          value="M."
        />
        <p id="anatomy-error" class="field__error" role="alert">
          Please enter at least two words for your full name.
        </p>
      </div>
    </div>
  `,
};

/**
 * 3. State Matrix
 * Side-by-side verification of Resting, Active, Focus, Valid, Invalid, Readonly, and Disabled states.
 */
export const StateMatrix: Story = {
  render: () => `
    <div class="demo-stage demo-constrained--md stack">
      <!-- Resting Empty -->
      <div class="field">
        <label for="state-resting" class="field__label">Resting (Unfocused)</label>
        <input id="state-resting" type="text" class="input" placeholder="Resting placeholder..." />
      </div>

      <!-- Filled with Value -->
      <div class="field">
        <label for="state-filled" class="field__label">Filled Value</label>
        <input id="state-filled" type="text" class="input" value="Jordan Lee" />
      </div>

      <!-- Explicit Invalid State -->
      <div class="field">
        <label for="state-invalid" class="field__label">Invalid State (aria-invalid="true")</label>
        <input 
          id="state-invalid" 
          type="email" 
          class="input" 
          value="invalid-email-format" 
          aria-invalid="true"
          aria-describedby="state-invalid-error"
        />
        <p id="state-invalid-error" class="field__error" role="alert">
          Please include an "@" in the email address.
        </p>
      </div>

      <!-- Read-Only State -->
      <div class="field">
        <label for="state-readonly" class="field__label">Read-Only (Dashed Border)</label>
        <input id="state-readonly" type="text" class="input" value="API-KEY-789-SECURE" readonly />
      </div>

      <!-- Disabled State -->
      <div class="field">
        <label for="state-disabled" class="field__label">Disabled State</label>
        <input id="state-disabled" type="text" class="input" value="system_locked@domain.com" disabled />
      </div>
    </div>
  `,
};

/**
 * 4. Sizes & Density (WCAG Target Compliance)
 * Small (32px, meets WCAG 2.5.8), Standard (48px, meets WCAG 2.5.5 AAA), and Large (56px).
 */
export const SizesAndDensity: Story = {
  render: () => `
    <div class="demo-stage demo-constrained--md stack">
      <!-- Small -->
      <div class="field">
        <div class="demo-label">Small (.input--sm / 32px height, 24px+ WCAG 2.5.8 target)</div>
        <input type="text" class="input input--sm" placeholder="Compact table filter..." />
      </div>

      <hr class="divider" />

      <!-- Medium (Default) -->
      <div class="field">
        <div class="demo-label">Standard (.input / 48px height, WCAG 2.5.5 AAA Target Size)</div>
        <input type="text" class="input" placeholder="Standard form input..." />
      </div>

      <hr class="divider" />

      <!-- Large -->
      <div class="field">
        <div class="demo-label">Large (.input--lg / 56px height)</div>
        <input type="text" class="input input--lg" placeholder="Large prominent search input..." />
      </div>
    </div>
  `,
};

/**
 * 5. Zero-Class Container Style Queries (@container style(...))
 * Shows how parent containers orchestrate child input density and shapes without utility classes.
 */
export const ZeroClassOrchestration: Story = {
  render: () => `
    <div class="stack demo-constrained--md">
      <!-- Dense Container -->
      <div class="demo-label">Parent: style="--ui-density: dense;"</div>
      <div class="demo-stage stack" style="--ui-density: dense;">
        <div class="field">
          <label for="csq-dense-first" class="field__label">First Name</label>
          <input id="csq-dense-first" type="text" class="input" placeholder="Dense input..." />
        </div>
        <div class="field">
          <label for="csq-dense-last" class="field__label">Last Name</label>
          <input id="csq-dense-last" type="text" class="input" placeholder="Dense input..." />
        </div>
      </div>

      <!-- Pill & Plain Search Container -->
      <div class="demo-label">Parent: style="--input-variation: plain; --input-corners: round;"</div>
      <div class="demo-stage" style="--input-variation: plain; --input-corners: round;">
        <input type="search" class="input" placeholder="Search knowledge base..." />
      </div>
    </div>
  `,
};

/**
 * 6. Plain & Subtle Variations
 * Borderless transparent (.input--plain) and translucent background (.input--subtle) variations.
 */
export const Variations: Story = {
  render: () => `
    <div class="demo-stage demo-constrained--md stack">
      <div class="field">
        <div class="demo-label">Standard Bordered Input</div>
        <input type="text" class="input" placeholder="Standard input..." />
      </div>

      <hr class="divider" />

      <div class="field">
        <div class="demo-label">Plain Input (.input--plain: transparent background & borderless)</div>
        <input type="text" class="input input--plain" placeholder="Plain input..." />
      </div>

      <hr class="divider" />

      <div class="field">
        <div class="demo-label">Subtle Input (.input--subtle: translucent background & borderless)</div>
        <input type="text" class="input input--subtle" placeholder="Subtle input..." />
      </div>

      <hr class="divider" />

      <div class="field">
        <div class="demo-label">Contextual Parent Container (.controls-subtle or .inputs-subtle)</div>
        <div class="controls-subtle stack">
          <input type="text" class="input" placeholder="Contextually subtle input 1..." />
          <input type="text" class="input" placeholder="Contextually subtle input 2..." />
        </div>
      </div>
    </div>
  `,
};

/**
 * 7. Color & File Input Primitives
 * Specialized native input elements using the same DFH design tokens.
 */
export const ColorAndFileInputs: Story = {
  render: () => `
    <div class="demo-stage demo-constrained--md stack">
      <div class="field">
        <label for="color-accent" class="field__label">Theme Accent Color</label>
        <p class="field__hint">Native system color picker with accessible round swatch.</p>
        <input id="color-accent" type="color" class="color-input" value="#008076" />
      </div>

      <hr class="divider" />

      <div class="field">
        <label for="file-document" class="field__label">Document Attachment</label>
        <p class="field__hint">Native file picker with DFH button styling.</p>
        <input id="file-document" type="file" class="file-input" />
      </div>
    </div>
  `,
};

/**
 * 7. Real-World Recipes & UI Compositions
 * Common production patterns where input controls are composed with headers, cards, and buttons.
 */
export const RealWorldRecipes: Story = {
  render: () => `
    <div class="stack demo-constrained--lg">
      <!-- Recipe A: Search Bar with Button -->
      <div class="card card--bordered">
        <article class="card__content">
          <header class="card__header">
            <h3 class="card__title subheading">Search Documentation</h3>
          </header>
          <div class="card__body">
            <form class="inline" style="display: flex; gap: var(--spacing-8);" onsubmit="return false;">
              <input 
                type="search" 
                class="input" 
                placeholder="Search components, tokens, or accessibility rules..." 
                style="flex: 1 1 auto;" 
              />
              <button type="submit" class="button button--primary">
                <span>Search</span>
              </button>
            </form>
          </div>
        </article>
      </div>

      <!-- Recipe B: Account Settings Form Card -->
      <div class="card card--bordered card--translucent">
        <article class="card__content">
          <header class="card__header">
            <h3 class="card__title subheading">Profile Details</h3>
            <p class="card__subtitle">Update your personal account information.</p>
          </header>
          <div class="card__body stack">
            <div class="split" style="display: flex; gap: var(--spacing-16);">
              <div class="field" style="flex: 1 1 50%;">
                <label for="recipe-first" class="field__label">First Name</label>
                <input id="recipe-first" type="text" class="input" value="Alex" required />
              </div>
              <div class="field" style="flex: 1 1 50%;">
                <label for="recipe-last" class="field__label">Last Name</label>
                <input id="recipe-last" type="text" class="input" value="Morgan" required />
              </div>
            </div>

            <div class="field">
              <label for="recipe-email" class="field__label">Email Address</label>
              <input id="recipe-email" type="email" class="input" value="alex.morgan@company.org" required />
            </div>
          </div>
          <footer class="card__footer" style="display: flex; justify-content: flex-end; gap: var(--spacing-8);">
            <button type="button" class="button button--subtle"><span>Cancel</span></button>
            <button type="button" class="button button--primary"><span>Save Changes</span></button>
          </footer>
        </article>
      </div>
    </div>
  `,
};
