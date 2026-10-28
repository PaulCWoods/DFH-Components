import type { Meta, StoryObj } from '@storybook/html';

interface FieldArgs {
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
}

const meta: Meta<FieldArgs> = {
  title: 'Molecules/Field & Form',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
### Developer & Designer Notes: Field, Fieldset & Form Primitives

The **Field**, **Fieldset**, and **Form** primitives form the structural backbone of accessible forms in Design For Humans.
They unite labels, hints, inputs, outputs, validation errors, and action submission bars into semantic, accessible groupings meeting WCAG 2.2 AA / AAA criteria with zero JavaScript boilerplate.

---

#### 1. Canonical Semantic Markup Signatures
AI agents and developers MUST use the following markup structures:

\`\`\`html
<!-- Canonical Field with Hint and Dynamic Required Indicator -->
<div class="field">
  <label for="user-email" class="field__label">Email Address</label>
  <p id="user-email-hint" class="field__hint">We will never share your personal email.</p>
  <input 
    id="user-email" 
    type="email" 
    class="input" 
    placeholder="you@domain.com"
    aria-describedby="user-email-hint"
    required
  />
</div>

<!-- Field with Header and Character Output Counter -->
<div class="field">
  <div class="field__header">
    <label for="user-bio" class="field__label">Profile Bio</label>
    <output for="user-bio" class="field__output" id="bio-counter">120 / 250</output>
  </div>
  <textarea id="user-bio" class="textarea" rows="3" aria-describedby="bio-counter"></textarea>
</div>

<!-- Semantic Fieldset Group -->
<fieldset class="fieldset">
  <legend class="legend">Accessible Audit Deliverables</legend>
  <div class="choices">
    <label class="choice" for="cb-axe">
      <input type="checkbox" id="cb-axe" class="checkbox-input" checked />
      <span>Automated axe-core compliance scanner</span>
    </label>
  </div>
</fieldset>

<!-- Form with Submission Bar -->
<form class="form">
  <div class="field">...</div>
  <div class="form__submission form__submission--right">
    <button type="reset" class="button button--subtle"><span>Cancel</span></button>
    <button type="submit" class="button button--strong button--accent"><span>Submit</span></button>
  </div>
</form>
\`\`\`

---

#### 2. WCAG 2.2 Conformance Matrix

| Criterion | Level | Implementation Strategy |
| :--- | :---: | :--- |
| **1.3.1 Info and Relationships** | **A** | Explicit association via \`for\` and \`id\` attributes; semantic \`<fieldset>\` and \`<legend>\` grouping for multi-option sets. |
| **3.3.2 Labels or Instructions** | **A** | Every field pairs with a distinct \`<label class="field__label">\`; automatic \`:has(:required)\` injects accessible \`(Required)\` indicator. |
| **3.3.1 Error Identification** | **A** | Connected via \`aria-describedby\` to a live \`<p class="field__error" role="alert">\` or \`<ul class="field__errors" role="alert">\`. |
| **2.5.5 / 2.5.8 Target Size** | **AA/AAA** | Full-width labels expand clickable trigger area; inputs default to 48px target blocks. |
| **Visual Hierarchy & Spacing** | **Standard** | Calibrated logical gap tokens (\`--_field-inner-gap\`, \`--_form-gap\`) maintain consistent visual cadence across viewports. |

---

#### 3. CSS Custom Property Contract Table

| Custom Property | Fallback | Intended Purpose |
| :--- | :--- | :--- |
| \`--field-inner-gap\` | \`--spacing-8\` (0.5rem) | Spacing between label, hint, control, and error within a field |
| \`--label-font-size\` | \`--typography-font-size-0\` (1rem) | Label typography step |
| \`--label-font-weight\` | \`--font-weight-bold\` (700) | Label font weight |
| \`--body-sm-font-size\` | \`--typography-font-size--1\` | Hint and validation error typography size |
| \`--field-error-color\` | \`--foreground-danger\` (#d32f2f) | Live error alert text and icon color |
| \`--form-gap\` | \`--spacing-16\` (1rem) | Vertical gap between successive fields in a form |
| \`--form-submission-gap\` | \`--spacing-16\` (1rem) | Top margin separating fields from the action bar |

---

#### 4. Zero-Class Container Style Queries (\`@container style(...)\`)
Parents can declaratively orchestrate density and action button alignment:

\`\`\`css
/* Example: Dense modal dialog form */
.dialog-form {
  --ui-density: dense;
  --form-submission-align: right;
}
\`\`\`
`,
      },
    },
  },
  argTypes: {
    label: {
      description: 'Field label copy',
      control: 'text',
      defaultValue: 'Account Email',
    },
    hint: {
      description: 'Supporting hint instructions',
      control: 'text',
      defaultValue: 'Used for two-factor authentication and billing notices.',
    },
    error: {
      description: 'Validation error alert message',
      control: 'text',
      defaultValue: '',
    },
    required: {
      description: 'HTML5 required attribute (triggers automatic "(Required)" label indicator)',
      control: 'boolean',
      defaultValue: true,
    },
    disabled: {
      description: 'Disabled state (automatically lowers field opacity)',
      control: 'boolean',
      defaultValue: false,
    },
    placeholder: {
      description: 'Input placeholder copy',
      control: 'text',
      defaultValue: 'you@enterprise.org',
    },
  },
  render: (args) => {
    const fieldId = 'playground-field-demo';
    const hintId = `${fieldId}-hint`;
    const errorId = `${fieldId}-error`;

    const describedBy = [
      args.hint ? hintId : '',
      args.error ? errorId : '',
    ].filter(Boolean).join(' ') || undefined;

    return `
      <div class="demo-stage demo-constrained--md">
        <div class="field">
          <label for="${fieldId}" class="field__label">${args.label}</label>
          ${args.hint ? `<p id="${hintId}" class="field__hint">${args.hint}</p>` : ''}
          <input 
            id="${fieldId}"
            type="email" 
            class="input" 
            placeholder="${args.placeholder || ''}"
            ${args.required ? 'required' : ''}
            ${args.disabled ? 'disabled' : ''}
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
type Story = StoryObj<FieldArgs>;

/**
 * 1. Playground (Interactive Sandbox)
 * Test dynamic labels, hints, validation errors, and required states via Storybook controls.
 */
export const Playground: Story = {
  args: {
    label: 'Account Email',
    hint: 'Used for two-factor authentication and billing notices.',
    error: '',
    required: true,
    disabled: false,
    placeholder: 'you@enterprise.org',
  },
};

/**
 * 2. Anatomy & Structure Breakdown
 * Shows the relationship between Label (with :has(:required) indicator), Hint, Input, and Error Alert.
 */
export const Anatomy: Story = {
  render: () => `
    <div class="demo-stage demo-constrained--md stack container-type-inline-size fields-grid">
      <div class="demo-label">1. Label (with auto Required) &rarr; 2. Hint Copy &rarr; 3. Input &rarr; 4. Live Error Alert</div>
      
      <div class="field">
        <label for="anatomy-field" class="field__label">Full Legal Name</label>
        <p id="anatomy-field-hint" class="field__hint">As printed on your passport or identity card.</p>
        <input 
          id="anatomy-field" 
          type="text" 
          class="input" 
          value="Alex" 
          required 
          aria-invalid="true"
          aria-describedby="anatomy-field-hint anatomy-field-error"
        />
        <p id="anatomy-field-error" class="field__error" role="alert">
          Please enter both your first and last name.
        </p>
      </div>
    </div>
  `,
};

/**
 * 3. Variants & Structural Patterns
 * Demonstrates Vertical Field, Field Header with Output Readout, Inline Field, and Fieldset Group.
 */
export const Variants: Story = {
  render: () => `
    <div class="demo-stage demo-constrained--md stack">
      <!-- 1. Header with Output Readout -->
      <div class="field">
        <div class="demo-label">1. Field with Header and Output Counter</div>
        <div class="field__header">
          <label for="var-bio" class="field__label">Bio Summary</label>
          <output for="var-bio" class="field__output" style="font-weight: var(--font-weight-bold); font-variant-numeric: tabular-nums;">
            140 / 280
          </output>
        </div>
        <textarea id="var-bio" class="textarea" rows="2" placeholder="Write a brief professional summary..."></textarea>
      </div>

      <hr class="divider" />

      <!-- 2. Inline Field Layout -->
      <div>
        <div class="demo-label">2. Inline Field Layout (.inline-field)</div>
        <div class="inline-field">
          <label for="var-inline-qty" class="field__label" style="margin: 0;">Seat Licenses:</label>
          <input id="var-inline-qty" type="number" class="input input--sm" value="5" min="1" max="100" style="inline-size: 5rem;" />
          <span style="font-size: var(--typography-font-size--1); color: var(--foreground-muted);">($40 / user / month)</span>
        </div>
      </div>

      <hr class="divider" />

      <!-- 3. Semantic Fieldset Group -->
      <fieldset class="fieldset">
        <legend class="legend">3. Semantic Fieldset & Legend (.fieldset / .legend)</legend>
        <div class="choices">
          <label class="choice" for="var-opt-email">
            <input type="checkbox" id="var-opt-email" class="checkbox-input" checked />
            <span>Email notifications for audit regressions</span>
          </label>
          <label class="choice" for="var-opt-slack">
            <input type="checkbox" id="var-opt-slack" class="checkbox-input" checked />
            <span>Slack channel broadcast for critical blockers</span>
          </label>
        </div>
      </fieldset>
    </div>
  `,
};

/**
 * 4. State Matrix
 * Side-by-side verification of Resting, Required, Invalid with Multiple Errors, and Disabled fields.
 */
export const StateMatrix: Story = {
  render: () => `
    <div class="demo-stage demo-constrained--md stack">
      <!-- Resting Optional Field -->
      <div class="field">
        <label for="sm-resting" class="field__label">Organization Nickname</label>
        <input id="sm-resting" type="text" class="input" placeholder="e.g. Design Team" />
      </div>

      <!-- Required Field (Automated (Required) text) -->
      <div class="field">
        <label for="sm-required" class="field__label">Primary Contact Email</label>
        <input id="sm-required" type="email" class="input" required placeholder="contact@domain.com" />
      </div>

      <!-- Invalid Field with Multi-Line Errors List -->
      <div class="field">
        <label for="sm-invalid" class="field__label">Workspace Subdomain</label>
        <p id="sm-invalid-hint" class="field__hint">Lowercase alphanumeric characters only, 4-32 length.</p>
        <input 
          id="sm-invalid" 
          type="text" 
          class="input" 
          value="My Invalid Space!" 
          aria-invalid="true" 
          aria-describedby="sm-invalid-hint sm-invalid-errors"
        />
        <ul id="sm-invalid-errors" class="field__errors" role="alert">
          <li>Subdomain cannot contain spaces.</li>
          <li>Subdomain cannot contain punctuation or capital letters.</li>
        </ul>
      </div>

      <!-- Disabled Field (Container automatically drops opacity) -->
      <div class="field">
        <label for="sm-disabled" class="field__label">Tenant Identifier</label>
        <input id="sm-disabled" type="text" class="input" value="TENANT-UK-8492" disabled />
        <p class="field__hint">Assigned permanently during account provisioning.</p>
      </div>
    </div>
  `,
};

/**
 * 5. Sizes & Density (WCAG Target Compliance)
 * Compares standard spacing with dense container query mode.
 */
export const SizesAndDensity: Story = {
  render: () => `
    <div class="demo-stage demo-constrained--md stack">
      <!-- Standard Density -->
      <div class="stack">
        <div class="demo-label">Standard Density (Default Spacing)</div>
        <div class="field">
          <label for="dense-std-name" class="field__label">Full Name</label>
          <input id="dense-std-name" type="text" class="input" placeholder="Standard spacing..." />
        </div>
      </div>

      <hr class="divider" />

      <!-- Dense Mode -->
      <div class="stack" style="--ui-density: dense;">
        <div class="demo-label">Dense Container (--ui-density: dense / Compact spacing & controls)</div>
        <div class="field">
          <label for="dense-comp-name" class="field__label">Full Name</label>
          <input id="dense-comp-name" type="text" class="input input--sm" placeholder="Compact spacing..." />
        </div>
      </div>
    </div>
  `,
};

/**
 * 6. Zero-Class Container Style Queries (@container style(...))
 * Shows how parent containers control submission bar alignment and form spacing declaratively.
 */
export const ZeroClassOrchestration: Story = {
  render: () => `
    <div class="stack demo-constrained--md">
      <!-- Right Aligned Submission Bar -->
      <div class="demo-label">Parent: style="--form-submission-align: right;"</div>
      <div class="demo-stage" style="--form-submission-align: right;">
        <form class="form" onsubmit="return false;">
          <div class="field">
            <label for="csq-right-input" class="field__label">Quick Note</label>
            <input id="csq-right-input" type="text" class="input" placeholder="Enter note..." />
          </div>
          <div class="form__submission">
            <button type="button" class="button button--subtle"><span>Discard</span></button>
            <button type="submit" class="button button--strong button--accent"><span>Save</span></button>
          </div>
        </form>
      </div>

      <!-- Left Aligned Submission Bar -->
      <div class="demo-label">Parent: style="--form-submission-align: left;"</div>
      <div class="demo-stage" style="--form-submission-align: left;">
        <form class="form" onsubmit="return false;">
          <div class="field">
            <label for="csq-left-input" class="field__label">Search Tag</label>
            <input id="csq-left-input" type="text" class="input" placeholder="Filter tags..." />
          </div>
          <div class="form__submission">
            <button type="submit" class="button button--strong button--accent"><span>Search Tag</span></button>
          </div>
        </form>
      </div>
    </div>
  `,
};

/**
 * 7. Real-World Recipes & UI Compositions
 * Complete accessible forms composed with cards, split layouts, selects, textareas, and submission bars.
 */
export const RealWorldRecipes: Story = {
  render: () => `
    <div class="stack demo-constrained--lg">
      <!-- Recipe A: Enterprise User Registration Form -->
      <div class="card card--bordered">
        <article class="card__content">
          <header class="card__header">
            <h3 class="card__title subheading">Create Enterprise Account</h3>
            <p class="card__subtitle">All fields marked with (Required) must be completed to activate your workspace.</p>
          </header>
          <div class="card__body">
            <form class="form" onsubmit="return false;">
              <!-- Split Name Row -->
              <div class="split" style="display: flex; gap: var(--spacing-16); inline-size: 100%;">
                <div class="field" style="flex: 1 1 50%;">
                  <label for="reg-first" class="field__label">First Name</label>
                  <input id="reg-first" type="text" class="input" required value="Ada" />
                </div>
                <div class="field" style="flex: 1 1 50%;">
                  <label for="reg-last" class="field__label">Last Name</label>
                  <input id="reg-last" type="text" class="input" required value="Lovelace" />
                </div>
              </div>

              <!-- Email Field -->
              <div class="field">
                <label for="reg-email" class="field__label">Work Email Address</label>
                <p id="reg-email-hint" class="field__hint">We will send an activation link to this address.</p>
                <input 
                  id="reg-email" 
                  type="email" 
                  class="input" 
                  required 
                  value="ada@analytical-engine.org" 
                  aria-describedby="reg-email-hint"
                />
              </div>

              <!-- Role Select -->
              <div class="field">
                <label for="reg-role" class="field__label">Organizational Role</label>
                <select id="reg-role" class="select" required>
                  <option value="">Select your role...</option>
                  <option value="lead" selected>Digital Accessibility Specialist</option>
                  <option value="eng">Design System Engineer</option>
                  <option value="mgr">Engineering Manager</option>
                </select>
              </div>

              <!-- Project Scope Textarea -->
              <div class="field">
                <label for="reg-scope" class="field__label">Target Compliance Goals</label>
                <p id="reg-scope-hint" class="field__hint">Briefly outline your audit scope or milestones.</p>
                <textarea 
                  id="reg-scope" 
                  class="textarea" 
                  rows="3" 
                  placeholder="Targeting WCAG 2.2 AA certification across mobile and web platforms..."
                  aria-describedby="reg-scope-hint"
                ></textarea>
              </div>

              <!-- Agreement Fieldset -->
              <fieldset class="fieldset">
                <legend class="legend">Terms & Standards</legend>
                <label class="choice" for="reg-terms">
                  <input type="checkbox" id="reg-terms" class="checkbox-input" required checked />
                  <span>I agree to uphold WCAG 2.2 accessibility standards across this project</span>
                </label>
              </fieldset>

              <!-- Submission Bar -->
              <div class="form__submission form__submission--right">
                <button type="reset" class="button button--subtle">
                  <span>Reset</span>
                </button>
                <button type="submit" class="button button--strong button--accent">
                  <span>Complete Registration</span>
                </button>
              </div>
            </form>
          </div>
        </article>
      </div>
    </div>
  `,
};
