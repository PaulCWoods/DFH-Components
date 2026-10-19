import type { Meta, StoryObj } from '@storybook/html';

interface CheckRadioArgs {
  type: 'checkbox' | 'radio';
  label: string;
  checked?: boolean;
  disabled?: boolean;
  required?: boolean;
  name?: string;
}

const meta: Meta<CheckRadioArgs> = {
  title: 'Atoms/Check & Radio',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
### Developer & Designer Notes: Checkbox, Radio & Choices Primitives

The **Check & Radio** primitives provide accessible native checkboxes and radio buttons utilizing browser-native mechanics, styled with design tokens via \`accent-color\`, custom sizing, and WCAG 2.2 compliant high-contrast focus rings.
The **Choices** primitive provides flexible vertical and inline flex containers for grouping interactive choice items with zero-JS state synchronizations.

---

#### 1. Canonical Semantic Markup Signatures
AI agents and developers MUST use the following markup structures:

\`\`\`html
<!-- Checkbox in Choice Item -->
<label class="choice" for="cb-terms">
  <input type="checkbox" id="cb-terms" class="checkbox-input" required />
  <span>I accept the accessibility charter</span>
</label>

<!-- Grouped Fieldset of Radio Buttons -->
<fieldset class="fieldset">
  <legend class="legend">Delivery Speed</legend>
  <div class="choices">
    <label class="choice" for="rad-std">
      <input type="radio" id="rad-std" name="delivery" class="radio-input" checked />
      <span>Standard Delivery (3-5 business days)</span>
    </label>
    <label class="choice" for="rad-exp">
      <input type="radio" id="rad-exp" name="delivery" class="radio-input" />
      <span>Express Delivery (Next business day)</span>
    </label>
  </div>
</fieldset>

<!-- Horizontal / Inline Choice Items -->
<div class="choices choices--inline">
  <label class="choice" for="freq-daily">
    <input type="radio" id="freq-daily" name="freq" class="radio-input" checked />
    <span>Daily</span>
  </label>
  <label class="choice" for="freq-weekly">
    <input type="radio" id="freq-weekly" name="freq" class="radio-input" />
    <span>Weekly</span>
  </label>
</div>
\`\`\`

---

#### 2. WCAG 2.2 Conformance Matrix

| Criterion | Level | Implementation Strategy |
| :--- | :---: | :--- |
| **2.5.5 Target Size (Enhanced)** | **AAA** | The enclosing \`<label class="choice">\` acts as an expansive touch target encompassing both the control and its label copy. |
| **2.5.8 Target Size (Minimum)** | **AA** | The standalone input control is calibrated to at least **20px** with surrounding line-height and click margins exceeding 24x24px. |
| **1.4.3 / 1.4.11 Contrast** | **AA** | 4.5:1 text contrast for labels and 3:1 graphical boundaries for checked indicators and borders. |
| **2.4.7 / 2.4.13 Focus Visible** | **AA/AAA** | High-contrast 2px focus ring with 2px offset (\`--focus-ring-width\`, \`--focus-ring-offset\`) on \`:focus-visible\`. |
| **1.3.1 Info and Relationships** | **A** | Grouped options use semantic \`<fieldset>\` and \`<legend>\` to ensure screen readers announce group context. |
| **4.1.2 Name, Role, Value** | **A** | Native \`<input type="checkbox">\` and \`<input type="radio">\` supply platform-standard assistive technology roles and states. |

---

#### 3. CSS Custom Property Contract Table

| Custom Property | Fallback | Intended Purpose |
| :--- | :--- | :--- |
| \`--form-check-size\` | \`--spacing-20\` (1.25rem) | Width and height of the box / circular radio |
| \`--form-check-accent\` | \`--foreground-accent\` (#008076) | Fill and checkmark tint color |
| \`--form-choices-row-gap\` | \`--spacing-8\` (0.5rem) | Vertical row spacing between items in a choices container |
| \`--form-choices-col-gap\` | \`--spacing-16\` (1rem) | Horizontal column spacing for inline choices |
| \`--form-choice-gap\` | \`--spacing-8\` (0.5rem) | Gap between the input marker and text label |
| \`--form-choice-font-size\` | \`--typography-font-size-0\` (1rem) | Label typography size |

---

#### 4. Zero-Class Container Style Queries (\`@container style(...)\`)
Parent containers can adjust layout and density declaratively without modifier classes:

\`\`\`css
/* Example: Dense modal choices list */
.modal-options {
  --ui-density: dense;
  --choices-layout: inline;
}
\`\`\`
`,
      },
    },
  },
  argTypes: {
    type: {
      description: 'Input type (checkbox or radio)',
      control: 'select',
      options: ['checkbox', 'radio'],
      defaultValue: 'checkbox',
    },
    label: {
      description: 'Label text associated with the choice',
      control: 'text',
      defaultValue: 'Enable high-contrast mode for all automated audits',
    },
    checked: {
      description: 'Initial checked state',
      control: 'boolean',
      defaultValue: true,
    },
    disabled: {
      description: 'Disabled interaction state',
      control: 'boolean',
      defaultValue: false,
    },
    required: {
      description: 'HTML5 required validation attribute',
      control: 'boolean',
      defaultValue: false,
    },
  },
  render: (args) => {
    const inputId = 'playground-choice-input';
    const inputClass = args.type === 'radio' ? 'radio-input' : 'checkbox-input';

    return `
      <div class="demo-stage demo-constrained--md">
        <label class="choice" for="${inputId}">
          <input 
            type="${args.type}" 
            id="${inputId}" 
            class="${inputClass}"
            ${args.checked ? 'checked' : ''}
            ${args.disabled ? 'disabled' : ''}
            ${args.required ? 'required' : ''}
          />
          <span>${args.label}</span>
        </label>
      </div>
    `;
  },
};

export default meta;
type Story = StoryObj<CheckRadioArgs>;

/**
 * 1. Playground (Interactive Sandbox)
 * Test interactive toggling, disabled states, and label configurations via Storybook controls.
 */
export const Playground: Story = {
  args: {
    type: 'checkbox',
    label: 'Enable high-contrast mode for all automated audits',
    checked: true,
    disabled: false,
    required: false,
  },
};

/**
 * 2. Anatomy & Structure Breakdown
 * Shows the accessible relationship between Fieldset, Legend, Choice Container, and Choice Items.
 */
export const Anatomy: Story = {
  render: () => `
    <div class="demo-stage demo-constrained--md stack">
      <div class="demo-label">1. Fieldset &rarr; 2. Legend &rarr; 3. Choices Container &rarr; 4. Choice Item (Input + Label)</div>
      
      <fieldset class="fieldset">
        <legend class="legend">Accessible Audit Deliverables</legend>
        <div class="choices">
          <label class="choice" for="anatomy-cb-axe">
            <input type="checkbox" id="anatomy-cb-axe" class="checkbox-input" checked />
            <span>Automated axe-core compliance scanner</span>
          </label>
          <label class="choice" for="anatomy-cb-sr">
            <input type="checkbox" id="anatomy-cb-sr" class="checkbox-input" checked />
            <span>Screen reader verification (VoiceOver & NVDA)</span>
          </label>
          <label class="choice" for="anatomy-cb-keyboard">
            <input type="checkbox" id="anatomy-cb-keyboard" class="checkbox-input" />
            <span>Keyboard tab order and focus trapping validation</span>
          </label>
        </div>
      </fieldset>
    </div>
  `,
};

/**
 * 3. Variants & Layout Patterns
 * Demonstrates Single Checkbox, Vertical Checkbox Group, Radio Group, and Horizontal Inline Choices.
 */
export const Variants: Story = {
  render: () => `
    <div class="demo-stage demo-constrained--md stack">
      <!-- Variant A: Single Agreement Checkbox -->
      <div>
        <div class="demo-label">1. Standalone Agreement Checkbox</div>
        <label class="choice" for="terms-agree">
          <input type="checkbox" id="terms-agree" class="checkbox-input" required />
          <span>I agree to the Digital Accessibility standards and terms of service</span>
        </label>
      </div>

      <hr class="divider" />

      <!-- Variant B: Radio Button Group -->
      <fieldset class="fieldset">
        <legend class="legend">2. Radio Button Selection Group</legend>
        <div class="choices">
          <label class="choice" for="var-radio-unified">
            <input type="radio" id="var-radio-unified" name="figma-strategy" class="radio-input" checked />
            <span>Unified Collection (Single collection token export)</span>
          </label>
          <label class="choice" for="var-radio-modular">
            <input type="radio" id="var-radio-modular" name="figma-strategy" class="radio-input" />
            <span>Modular Enterprise (Color, Viewport, and Structure split)</span>
          </label>
          <label class="choice" for="var-radio-studio">
            <input type="radio" id="var-radio-studio" name="figma-strategy" class="radio-input" />
            <span>Tokens Studio (W3C DTCG Format)</span>
          </label>
        </div>
      </fieldset>

      <hr class="divider" />

      <!-- Variant C: Inline Horizontal Choices -->
      <fieldset class="fieldset">
        <legend class="legend">3. Horizontal Choices (.choices--inline)</legend>
        <div class="choices choices--inline">
          <label class="choice" for="freq-daily">
            <input type="radio" id="freq-daily" name="report-freq" class="radio-input" checked />
            <span>Daily</span>
          </label>
          <label class="choice" for="freq-weekly">
            <input type="radio" id="freq-weekly" name="report-freq" class="radio-input" />
            <span>Weekly</span>
          </label>
          <label class="choice" for="freq-monthly">
            <input type="radio" id="freq-monthly" name="report-freq" class="radio-input" />
            <span>Monthly</span>
          </label>
        </div>
      </fieldset>

      <hr class="divider" />

      <!-- Variant D: Button-Like Choice Radios (Zero-JS) -->
      <div>
        <div class="demo-label">4. Button-Like Choice Radios (Zero-JS)</div>
        <div class="cluster" style="display: flex; gap: var(--spacing-8);">
          <label class="button button--secondary">
            <input type="radio" name="btn-choice-demo" class="visually-hidden" checked />
            <span>Option 1</span>
          </label>
          <label class="button button--secondary">
            <input type="radio" name="btn-choice-demo" class="visually-hidden" />
            <span>Option 2</span>
          </label>
          <label class="button button--secondary">
            <input type="radio" name="btn-choice-demo" class="visually-hidden" />
            <span>Option 3</span>
          </label>
        </div>
      </div>
    </div>
  `,
};

/**
 * 4. State Matrix
 * Side-by-side verification of Unchecked, Checked, Disabled Checked, and Disabled Unchecked states.
 */
export const StateMatrix: Story = {
  render: () => `
    <div class="demo-stage demo-constrained--md stack">
      <div class="demo-label">Checkboxes State Matrix</div>
      <div class="choices">
        <!-- Unchecked -->
        <label class="choice" for="state-cb-unchecked">
          <input type="checkbox" id="state-cb-unchecked" class="checkbox-input" />
          <span>Resting (Unchecked)</span>
        </label>

        <!-- Checked -->
        <label class="choice" for="state-cb-checked">
          <input type="checkbox" id="state-cb-checked" class="checkbox-input" checked />
          <span>Active (Checked)</span>
        </label>

        <!-- Disabled Unchecked -->
        <label class="choice" for="state-cb-dis-unchecked">
          <input type="checkbox" id="state-cb-dis-unchecked" class="checkbox-input" disabled />
          <span>Disabled (Unchecked)</span>
        </label>

        <!-- Disabled Checked -->
        <label class="choice" for="state-cb-dis-checked">
          <input type="checkbox" id="state-cb-dis-checked" class="checkbox-input" checked disabled />
          <span>Disabled (Checked)</span>
        </label>
      </div>

      <hr class="divider" />

      <div class="demo-label">Radio Buttons State Matrix</div>
      <div class="choices">
        <!-- Unchecked Radio -->
        <label class="choice" for="state-rad-un">
          <input type="radio" name="state-rad-grp" id="state-rad-un" class="radio-input" />
          <span>Resting (Unselected Radio)</span>
        </label>

        <!-- Selected Radio -->
        <label class="choice" for="state-rad-sel">
          <input type="radio" name="state-rad-grp" id="state-rad-sel" class="radio-input" checked />
          <span>Selected Radio</span>
        </label>

        <!-- Disabled Radio -->
        <label class="choice" for="state-rad-dis">
          <input type="radio" name="state-rad-grp-dis" id="state-rad-dis" class="radio-input" checked disabled />
          <span>Disabled Selected Radio</span>
        </label>
      </div>
    </div>
  `,
};

/**
 * 5. Sizes & Density (WCAG Target Compliance)
 * Small (16px), Standard (20px), and Large (24px).
 */
export const SizesAndDensity: Story = {
  render: () => `
    <div class="demo-stage demo-constrained--md stack">
      <!-- Small -->
      <div>
        <div class="demo-label">Small (.check-size: sm / 16px marker)</div>
        <div class="choices" style="--form-check-size: var(--spacing-16, 1rem);">
          <label class="choice" for="size-sm-cb">
            <input type="checkbox" id="size-sm-cb" class="checkbox-input" checked />
            <span style="font-size: var(--typography-font-size--1, 0.875rem);">Compact audit checkbox</span>
          </label>
        </div>
      </div>

      <hr class="divider" />

      <!-- Medium (Default) -->
      <div>
        <div class="demo-label">Standard (Default / 20px marker, WCAG 2.5.5 touch surface)</div>
        <div class="choices">
          <label class="choice" for="size-md-cb">
            <input type="checkbox" id="size-md-cb" class="checkbox-input" checked />
            <span>Standard form checkbox</span>
          </label>
        </div>
      </div>

      <hr class="divider" />

      <!-- Large -->
      <div>
        <div class="demo-label">Large (24px marker)</div>
        <div class="choices" style="--form-check-size: var(--spacing-24, 1.5rem);">
          <label class="choice" for="size-lg-cb">
            <input type="checkbox" id="size-lg-cb" class="checkbox-input" checked />
            <span style="font-size: var(--typography-font-size-1, 1.125rem);">Prominent touch checkbox</span>
          </label>
        </div>
      </div>
    </div>
  `,
};

/**
 * 6. Zero-Class Container Style Queries (@container style(...))
 * Demonstrating parent container orchestration for dense forms and inline layout.
 */
export const ZeroClassOrchestration: Story = {
  render: () => `
    <div class="stack demo-constrained--md">
      <!-- Dense Container -->
      <div class="demo-label">Parent: style="--ui-density: dense;"</div>
      <div class="demo-stage stack" style="--ui-density: dense;">
        <div class="choices">
          <label class="choice" for="csq-dense-opt1">
            <input type="checkbox" id="csq-dense-opt1" class="checkbox-input" checked />
            <span>Dense Inspector: Show invisible focus rings</span>
          </label>
          <label class="choice" for="csq-dense-opt2">
            <input type="checkbox" id="csq-dense-opt2" class="checkbox-input" />
            <span>Dense Inspector: Highlight landmark regions</span>
          </label>
        </div>
      </div>

      <!-- Inline Layout Container -->
      <div class="demo-label">Parent: style="--choices-layout: inline;"</div>
      <div class="demo-stage" style="--choices-layout: inline;">
        <div class="choices">
          <label class="choice" for="csq-inline-1">
            <input type="radio" name="csq-in-grp" id="csq-inline-1" class="radio-input" checked />
            <span>Grid View</span>
          </label>
          <label class="choice" for="csq-inline-2">
            <input type="radio" name="csq-in-grp" id="csq-inline-2" class="radio-input" />
            <span>List View</span>
          </label>
          <label class="choice" for="csq-inline-3">
            <input type="radio" name="csq-in-grp" id="csq-inline-3" class="radio-input" />
            <span>Compact View</span>
          </label>
        </div>
      </div>
    </div>
  `,
};

/**
 * 7. Real-World Recipes & UI Compositions
 * Common production patterns: Privacy Consent Preferences card & Multi-Option Survey card.
 */
export const RealWorldRecipes: Story = {
  render: () => `
    <div class="stack demo-constrained--lg">
      <!-- Recipe A: Cookie / Privacy Preferences Card -->
      <div class="card card--bordered">
        <article class="card__content">
          <header class="card__header">
            <h3 class="card__title subheading">Privacy & Data Preferences</h3>
            <p class="card__subtitle">Configure how your data and telemetry is processed</p>
          </header>
          <div class="card__body stack">
            <div class="choices">
              <label class="choice" for="pref-essential" style="align-items: flex-start;">
                <input type="checkbox" id="pref-essential" class="checkbox-input" checked disabled style="margin-top: 2px;" />
                <div>
                  <strong style="display: block;">Essential Functionality</strong>
                  <span style="font-size: var(--typography-font-size--1); color: var(--foreground-muted);">
                    Required for authentication, session security, and accessibility preferences.
                  </span>
                </div>
              </label>

              <hr class="divider" />

              <label class="choice" for="pref-analytics" style="align-items: flex-start;">
                <input type="checkbox" id="pref-analytics" class="checkbox-input" checked style="margin-top: 2px;" />
                <div>
                  <strong style="display: block;">Analytics & Usage Metrics</strong>
                  <span style="font-size: var(--typography-font-size--1); color: var(--foreground-muted);">
                    Helps us identify accessibility regressions and measure performance.
                  </span>
                </div>
              </label>

              <hr class="divider" />

              <label class="choice" for="pref-marketing" style="align-items: flex-start;">
                <input type="checkbox" id="pref-marketing" class="checkbox-input" style="margin-top: 2px;" />
                <div>
                  <strong style="display: block;">Product Announcements & Surveys</strong>
                  <span style="font-size: var(--typography-font-size--1); color: var(--foreground-muted);">
                    Receive quarterly invitations to user research sessions.
                  </span>
                </div>
              </label>
            </div>
          </div>
          <footer class="card__footer" style="display: flex; justify-content: flex-end; gap: var(--spacing-8);">
            <button type="button" class="button button--subtle"><span>Reject Non-Essential</span></button>
            <button type="button" class="button button--primary"><span>Save Preferences</span></button>
          </footer>
        </article>
      </div>

      <!-- Recipe B: Accessibility Audit Scope Selector -->
      <div class="card card--bordered card--translucent">
        <article class="card__content">
          <header class="card__header">
            <h3 class="card__title subheading">New Audit Run Configuration</h3>
            <p class="card__subtitle">Select test suites and output reporting formats</p>
          </header>
          <div class="card__body stack">
            <fieldset class="fieldset">
              <legend class="legend">Automated Verification Engines</legend>
              <div class="choices">
                <label class="choice" for="suite-axe">
                  <input type="checkbox" id="suite-axe" class="checkbox-input" checked />
                  <span>axe-core Rule Engine (v4.10)</span>
                </label>
                <label class="choice" for="suite-contrast">
                  <input type="checkbox" id="suite-contrast" class="checkbox-input" checked />
                  <span>APCA Advanced Perceptual Contrast Algorithm</span>
                </label>
                <label class="choice" for="suite-html5">
                  <input type="checkbox" id="suite-html5" class="checkbox-input" checked />
                  <span>W3C HTML5 Validation Linter</span>
                </label>
              </div>
            </fieldset>

            <fieldset class="fieldset">
              <legend class="legend">Report Format</legend>
              <div class="choices choices--inline">
                <label class="choice" for="fmt-html">
                  <input type="radio" id="fmt-html" name="export-fmt" class="radio-input" checked />
                  <span>HTML Dashboard</span>
                </label>
                <label class="choice" for="fmt-json">
                  <input type="radio" id="fmt-json" name="export-fmt" class="radio-input" />
                  <span>JSON Machine-Readable</span>
                </label>
                <label class="choice" for="fmt-sarif">
                  <input type="radio" id="fmt-sarif" name="export-fmt" class="radio-input" />
                  <span>SARIF (GitHub Code Scanning)</span>
                </label>
              </div>
            </fieldset>
          </div>
          <footer class="card__footer" style="display: flex; justify-content: flex-end; gap: var(--spacing-8);">
            <button type="button" class="button button--subtle"><span>Cancel</span></button>
            <button type="button" class="button button--primary"><span>Start Audit Run</span></button>
          </footer>
        </article>
      </div>
    </div>
  `,
};
