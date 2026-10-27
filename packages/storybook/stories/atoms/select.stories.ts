import type { Meta, StoryObj } from '@storybook/html';

interface SelectArgs {
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  custom?: boolean;
}

const meta: Meta<SelectArgs> = {
  title: 'Atoms/Select',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
### Developer & Designer Notes: Select Primitive

The **Select** primitive supports standard native HTML \`<select>\` elements as well as the modern CSS Customizable Select API (\`appearance: base-select\`) with rich \`::picker(select)\` dropdown surfaces and smooth transition animations.
Built with zero-specificity \`:where()\`, a local private variable manifest (\`--_select-*\`), and native style container queries.

---

#### 1. Canonical Semantic Markup Signature
AI agents and developers MUST use the following markup structure:

\`\`\`html
<!-- Native Accessible Select -->
<div class="field">
  <label for="user-role" class="field__label">Primary Role</label>
  <p id="user-role-hint" class="field__hint">Assigns workspace access permissions.</p>
  <select id="user-role" class="select" aria-describedby="user-role-hint" required>
    <option value="">Select a role...</option>
    <option value="lead">Accessibility Lead</option>
    <option value="eng">Design Engineer</option>
  </select>
</div>

<!-- Modern Customizable Select (appearance: base-select) -->
<div class="field">
  <label for="compliance-tier" class="field__label">Compliance Standard</label>
  <select id="compliance-tier" class="select select--custom">
    <button type="button">
      <selectedcontent></selectedcontent>
    </button>
    <option value="wcag-aa" selected>WCAG 2.2 Level AA</option>
    <option value="wcag-aaa">WCAG 2.2 Level AAA</option>
  </select>
</div>
\`\`\`

---

#### 2. WCAG 2.2 Conformance Matrix

| Criterion | Level | Implementation Strategy |
| :--- | :---: | :--- |
| **2.5.5 Target Size (Enhanced)** | **AAA** | Standard (\`md\`) select defaults to **48px** block size (\`--spacing-target\`) to exceed enhanced touch targets. |
| **2.5.8 Target Size (Minimum)** | **AA** | Compact (\`select--sm\`) controls maintain **32px** height, comfortably exceeding the 24x24px minimum touch target threshold. |
| **1.4.3 / 1.4.11 Contrast** | **AA** | 4.5:1 text contrast for labels and options, and 3:1 graphical boundaries for resting borders and chevron indicators. |
| **2.4.7 / 2.4.13 Focus Visible** | **AA/AAA** | High-contrast focus ring (\`--focus-ring-width: 2px solid var(--focus-ring-color)\`, \`--focus-ring-offset: 2px\`) with at least 3:1 contrast against surfaces. |
| **3.3.1 Error Identification** | **A** | Paired with \`aria-invalid="true"\` and connected via \`aria-describedby\` to a live \`<p class="field__error" role="alert">\`. |
| **Bidirectional RTL Support** | **Standard** | Logical \`padding-inline-end\` and \`--select-picker-icon-pos\` adapt dynamically in \`[dir="rtl"]\` environments. |

---

#### 3. CSS Custom Property Contract Table

| Custom Property | Fallback | Intended Purpose |
| :--- | :--- | :--- |
| \`--select-min-size\` | \`--spacing-target\` (3rem / 48px) | Outer block size matching WCAG touch targets |
| \`--select-bg\` | \`--surface-card\` (#ffffff) | Select canvas fill color |
| \`--select-border-width\` | \`--border-width\` (1px) | Stroke thickness |
| \`--select-border-color\` | \`--border-color-quiet\` (\`currentColor\`) | Resting border stroke color |
| \`--select-color\` | \`--foreground\` (\`currentColor\`) | Option and selected text color |
| \`--select-padding-block\` | \`--spacing-8\` (0.5rem) | Vertical inner clearance |
| \`--select-padding-inline\` | \`--spacing-16\` (1rem) | Horizontal inner clearance |
| \`--select-picker-icon\` | Embedded SVG Chevron | Indicator chevron icon |
| \`--select-picker-icon-size\` | \`0.66rem\` | Indicator chevron display dimension |
| \`--select-radius\` | \`--radius\` (0.25rem) | Corner curvature |
| \`--select-transition\` | \`--duration-sm\` (150ms) | Hover, active, and focus transition duration |

---

#### 4. Zero-Class Container Style Queries (\`@container style(...)\`)
Parents can declaratively orchestrate select styling across toolbars and filter bars without utility classes:

\`\`\`css
/* Example: Dense table filter bar */
.filter-toolbar {
  --select-variation: plain;
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
      defaultValue: 'Target Standard',
    },
    hint: {
      description: 'Supporting hint description',
      control: 'text',
      defaultValue: 'Choose the primary accessibility standard for automated audits.',
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
    size: {
      description: 'Select sizing variant',
      control: 'select',
      options: ['sm', 'md', 'lg'],
      defaultValue: 'md',
    },
    custom: {
      description: 'Use modern Customizable Select API (appearance: base-select)',
      control: 'boolean',
      defaultValue: false,
    },
  },
  render: (args) => {
    const selectId = 'playground-select-field';
    const hintId = `${selectId}-hint`;
    const errorId = `${selectId}-error`;

    const sizeClass = args.size && args.size !== 'md' ? `select--${args.size}` : '';
    const customClass = args.custom ? 'select--custom' : '';
    const selectClasses = ['select', sizeClass, customClass].filter(Boolean).join(' ');

    const describedBy = [
      args.hint ? hintId : '',
      args.error ? errorId : '',
    ].filter(Boolean).join(' ') || undefined;

    return `
      <div class="demo-stage demo-constrained--md">
        <div class="field">
          <label for="${selectId}" class="field__label">
            ${args.label}
          </label>
          ${args.hint ? `<p id="${hintId}" class="field__hint">${args.hint}</p>` : ''}
          ${args.custom ? `
            <select 
              id="${selectId}"
              class="${selectClasses}"
              ${args.required ? 'required' : ''}
              ${args.disabled ? 'disabled' : ''}
              ${describedBy ? `aria-describedby="${describedBy}"` : ''}
              ${args.error ? 'aria-invalid="true"' : ''}
            >
              <button type="button">
                <selectedcontent></selectedcontent>
              </button>
              <option value="">Select standard...</option>
              <option value="wcag-aa" selected>WCAG 2.2 Level AA (Standard)</option>
              <option value="wcag-aaa">WCAG 2.2 Level AAA (Strict)</option>
              <option value="section-508">Section 508 (US Federal)</option>
              <option value="en-301-549">EN 301 549 (EU Public Sector)</option>
            </select>
          ` : `
            <select 
              id="${selectId}"
              class="${selectClasses}"
              ${args.required ? 'required' : ''}
              ${args.disabled ? 'disabled' : ''}
              ${describedBy ? `aria-describedby="${describedBy}"` : ''}
              ${args.error ? 'aria-invalid="true"' : ''}
            >
              <option value="">Select standard...</option>
              <option value="wcag-aa" selected>WCAG 2.2 Level AA (Standard)</option>
              <option value="wcag-aaa">WCAG 2.2 Level AAA (Strict)</option>
              <option value="section-508">Section 508 (US Federal)</option>
              <option value="en-301-549">EN 301 549 (EU Public Sector)</option>
            </select>
          `}
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
type Story = StoryObj<SelectArgs>;

/**
 * 1. Playground (Interactive Sandbox)
 * Adjust props, sizing, validation states, and the modern Customizable Select flag via Storybook controls.
 */
export const Playground: Story = {
  args: {
    label: 'Target Compliance Standard',
    hint: 'Choose the primary accessibility standard for automated audits.',
    error: '',
    required: true,
    disabled: false,
    size: 'md',
    custom: false,
  },
};

/**
 * 2. Anatomy & Structure Breakdown
 * Shows the accessible relationship between Label, Select, Hint, and Error elements.
 */
export const Anatomy: Story = {
  render: () => `
    <div class="demo-stage demo-constrained--md stack">
      <div class="demo-label">1. Label &rarr; 2. Select Control (with integrated chevron) &rarr; 3. Hint Copy &rarr; 4. Live Error Alert</div>
      
      <div class="field">
        <label for="anatomy-select" class="field__label">Primary Language Preference</label>
        <p id="anatomy-select-hint" class="field__hint">Sets your regional locale and translation settings.</p>
        <select 
          id="anatomy-select" 
          class="select" 
          aria-describedby="anatomy-select-hint anatomy-select-error"
          aria-invalid="true"
        >
          <option value="">-- Please select your language --</option>
          <option value="en">English (US / UK)</option>
          <option value="es">Español</option>
          <option value="fr">Français</option>
        </select>
        <p id="anatomy-select-error" class="field__error" role="alert">
          Please make a selection to continue.
        </p>
      </div>
    </div>
  `,
};

/**
 * 3. Variants & Behaviors
 * Demonstrates Native HTML Select, Modern Customizable Select, Plain/Ghost, and Flush variations.
 */
export const Variants: Story = {
  render: () => `
    <div class="demo-stage demo-constrained--md stack">
      <!-- Native Select -->
      <div class="field">
        <div class="demo-label">1. Standard Native Select (.select)</div>
        <select class="select">
          <option value="opt-1">Standard Native Dropdown Option 1</option>
          <option value="opt-2">Standard Native Dropdown Option 2</option>
          <option value="opt-3">Standard Native Dropdown Option 3</option>
        </select>
      </div>

      <hr class="divider" />

      <!-- Modern Customizable Select API -->
      <div class="field">
        <div class="demo-label">2. Modern Customizable Select (.select--custom / appearance: base-select)</div>
        <select class="select select--custom">
          <button type="button">
            <selectedcontent></selectedcontent>
          </button>
          <option value="wcag-aa" selected>WCAG 2.2 Level AA</option>
          <option value="wcag-aaa">WCAG 2.2 Level AAA</option>
          <option value="508">Section 508 Federal Standard</option>
        </select>
      </div>

      <hr class="divider" />

      <!-- Subtle / Translucent -->
      <div class="field">
        <div class="demo-label">3. Subtle Variation (.select--subtle: translucent background & borderless)</div>
        <select class="select select--subtle">
          <option>Filter by Status: Active</option>
          <option>Filter by Status: Pending</option>
          <option>Filter by Status: Resolved</option>
        </select>
      </div>

      <hr class="divider" />

      <!-- Plain / Borderless -->
      <div class="field">
        <div class="demo-label">4. Plain Variation (.select--plain: transparent background & borderless)</div>
        <select class="select select--plain">
          <option>Table View: All Columns</option>
          <option>Table View: Condensed</option>
        </select>
      </div>

      <hr class="divider" />

      <!-- Flush -->
      <div class="field">
        <div class="demo-label">5. Flush Variation (.select--flush: borderless & flush padding)</div>
        <select class="select select--flush">
          <option>Sort by: Most Recent</option>
          <option>Sort by: Highest Priority</option>
        </select>
      </div>
    </div>
  `,
};

/**
 * 4. State Matrix
 * Side-by-side verification of Resting, Selected Value, Invalid State, and Disabled State.
 */
export const StateMatrix: Story = {
  render: () => `
    <div class="demo-stage demo-constrained--md stack">
      <!-- Resting / Placeholder -->
      <div class="field">
        <label for="state-select-resting" class="field__label">Resting (Unselected)</label>
        <select id="state-select-resting" class="select">
          <option value="">Select an option...</option>
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
        </select>
      </div>

      <!-- Filled / Selected -->
      <div class="field">
        <label for="state-select-filled" class="field__label">Selected Value</label>
        <select id="state-select-filled" class="select">
          <option value="lead" selected>Accessibility Lead (Admin)</option>
          <option value="dev">Design Engineer</option>
        </select>
      </div>

      <!-- Explicit Invalid State -->
      <div class="field">
        <label for="state-select-invalid" class="field__label">Invalid State (aria-invalid="true")</label>
        <select 
          id="state-select-invalid" 
          class="select" 
          aria-invalid="true"
          aria-describedby="state-select-invalid-error"
        >
          <option value="">Please select a valid tier...</option>
          <option value="free">Free Tier</option>
        </select>
        <p id="state-select-invalid-error" class="field__error" role="alert">
          This option is deprecated. Please choose an active plan.
        </p>
      </div>

      <!-- Disabled State -->
      <div class="field">
        <label for="state-select-disabled" class="field__label">Disabled State</label>
        <select id="state-select-disabled" class="select" disabled>
          <option selected>Enterprise License (Managed by IT Administrator)</option>
        </select>
      </div>
    </div>
  `,
};

/**
 * 5. Sizes & Density (WCAG Target Compliance)
 * Small (32px, meets WCAG 2.5.8), Standard (48px, meets WCAG 2.5.5 AAA), and Large (56px).
 */
export const SizesAndDensity: Story = {
  render: () => `
    <div class="demo-stage demo-constrained--md stack">
      <!-- Small -->
      <div class="field">
        <div class="demo-label">Small (.select--sm / 32px height, 24px+ WCAG 2.5.8 target)</div>
        <select class="select select--sm">
          <option>Sort by Severity</option>
          <option>Sort by Date</option>
        </select>
      </div>

      <hr class="divider" />

      <!-- Medium (Default) -->
      <div class="field">
        <div class="demo-label">Standard (.select / 48px height, WCAG 2.5.5 AAA Target Size)</div>
        <select class="select">
          <option>WCAG 2.2 Level AA (Default)</option>
          <option>WCAG 2.2 Level AAA (Strict)</option>
        </select>
      </div>

      <hr class="divider" />

      <!-- Large -->
      <div class="field">
        <div class="demo-label">Large (.select--lg / 56px height)</div>
        <select class="select select--lg">
          <option>United Kingdom (GBP £)</option>
          <option>European Union (EUR €)</option>
          <option>United States (USD $)</option>
        </select>
      </div>
    </div>
  `,
};

/**
 * 6. Zero-Class Container Style Queries (@container style(...))
 * Shows how parent containers orchestrate child select density and variations without utility classes.
 */
export const ZeroClassOrchestration: Story = {
  render: () => `
    <div class="stack demo-constrained--md">
      <!-- Dense Container -->
      <div class="demo-label">Parent: style="--ui-density: dense;"</div>
      <div class="demo-stage stack" style="--ui-density: dense;">
        <div class="field">
          <label for="csq-dense-filter" class="field__label">Filter Status</label>
          <select id="csq-dense-filter" class="select">
            <option>All Audits (Active & Completed)</option>
            <option>Pending Verification Only</option>
          </select>
        </div>
      </div>

      <!-- Plain Variation Container -->
      <div class="demo-label">Parent: style="--select-variation: plain;"</div>
      <div class="demo-stage" style="--select-variation: plain;">
        <div class="field">
          <label for="csq-plain-format" class="field__label">Data View Format</label>
          <select id="csq-plain-format" class="select">
            <option>Condensed Table View</option>
            <option>Expanded Card Grid</option>
          </select>
        </div>
      </div>
    </div>
  `,
};

/**
 * 7. Real-World Recipes & UI Compositions
 * Common production patterns combining Select controls with search inputs, cards, and buttons.
 */
export const RealWorldRecipes: Story = {
  render: () => `
    <div class="stack demo-constrained--lg">
      <!-- Recipe A: Filter & Sort Toolbar -->
      <div class="card card--bordered">
        <article class="card__content">
          <header class="card__header">
            <h3 class="card__title subheading">Accessibility Audit Directory</h3>
          </header>
          <div class="card__body">
            <form class="cluster" style="display: flex; gap: var(--spacing-8); align-items: center; flex-wrap: wrap;" onsubmit="return false;">
              <input 
                type="search" 
                class="input input--sm" 
                placeholder="Search checkpoints..." 
                style="flex: 1 1 200px;" 
              />
              <select class="select select--sm" style="flex: 0 0 auto;">
                <option value="all">All Checkpoints</option>
                <option value="contrast">1.4.3 Contrast</option>
                <option value="target">2.5.5 Target Size</option>
                <option value="focus">2.4.7 Focus Visible</option>
              </select>
              <select class="select select--sm" style="flex: 0 0 auto;">
                <option value="date-desc">Newest First</option>
                <option value="severity">Highest Severity</option>
              </select>
              <button type="button" class="button button--sm">
                <span>Reset Filters</span>
              </button>
            </form>
          </div>
        </article>
      </div>

      <!-- Recipe B: Account Localization Card -->
      <div class="card card--bordered card--translucent">
        <article class="card__content">
          <header class="card__header">
            <h3 class="card__title subheading">Regional & Localization Preferences</h3>
            <p class="card__subtitle">Configures timezones, currencies, and default standard benchmarks.</p>
          </header>
          <div class="card__body stack">
            <div class="split" style="display: flex; gap: var(--spacing-16);">
              <div class="field" style="flex: 1 1 50%;">
                <label for="loc-timezone" class="field__label">Default Timezone</label>
                <select id="loc-timezone" class="select">
                  <option selected>UTC+00:00 (London / Dublin)</option>
                  <option>UTC-05:00 (New York / Eastern)</option>
                  <option>UTC+01:00 (Paris / Berlin)</option>
                </select>
              </div>
              <div class="field" style="flex: 1 1 50%;">
                <label for="loc-currency" class="field__label">Billing Currency</label>
                <select id="loc-currency" class="select">
                  <option selected>GBP - British Pound (£)</option>
                  <option>EUR - Euro (€)</option>
                  <option>USD - US Dollar ($)</option>
                </select>
              </div>
            </div>

            <div class="field">
              <label for="loc-standard" class="field__label">Default Automated Test Standard</label>
              <select id="loc-standard" class="select">
                <option selected>WCAG 2.2 Level AA (Strict Conformance)</option>
                <option>WCAG 2.2 Level AAA (High-Contrast & Enhanced Targets)</option>
                <option>Section 508 US Federal Standard</option>
              </select>
            </div>
          </div>
          <footer class="card__footer" style="display: flex; justify-content: flex-end; gap: var(--spacing-8);">
            <button type="button" class="button button--subtle"><span>Cancel</span></button>
            <button type="button" class="button button--strong button--accent"><span>Save Preferences</span></button>
          </footer>
        </article>
      </div>
    </div>
  `,
};
