import type { Meta, StoryObj } from '@storybook/html';

interface ButtonArgs {
  label: string;
  variant?: 'default' | 'primary' | 'plain' | 'subtle' | 'destructive' | 'placeholder';
  size: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  ariaDisabled?: boolean;
  isLink?: boolean;
  hasIcon?: boolean;
}

const meta: Meta<ButtonArgs> = {
  title: 'Atoms/Button',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
### Developer & Designer Notes: Button Primitive

The **Button** primitive is the fundamental interactive action element in Design For Humans.
Built with zero-specificity \`:where()\`, a local private variable manifest (\`--_button-*\`), single-source interactive state resolution, and native style container queries.

---

#### 1. Canonical Semantic Markup Signatures
AI agents and developers MUST strictly use the following semantic patterns:

\`\`\`html
<!-- Default Secondary Button (Neutral Outline) -->
<button type="button" class="button">
  <span>Action Label</span>
</button>

<!-- Strong Action Button (High-emphasis filled neutral) -->
<button type="button" class="button button--strong">
  <span>Strong Neutral</span>
</button>

<!-- Strong Accent / Primary Action Button -->
<button type="button" class="button button--strong button--accent">
  <span>Primary Action</span>
</button>

<!-- Plain Action Button (Transparent background, no border) -->
<button type="button" class="button button--plain">
  <span>Plain Action</span>
</button>

<!-- Subtle Action Button (Translucent background, no border) -->
<button type="button" class="button button--subtle">
  <span>Subtle Action</span>
</button>

<!-- Destructive Action Button (Outlined danger) -->
<button type="button" class="button button--danger">
  <span>Delete Item</span>
</button>

<!-- Strong Destructive Action Button (High-emphasis solid danger) -->
<button type="button" class="button button--strong button--danger">
  <span>Delete Record</span>
</button>

<!-- Placeholder / Dashed Outline Action -->
<button type="button" class="button button--placeholder">
  <span>+ Add Item</span>
</button>

<!-- Icon Button (Trailing) -->
<button type="button" class="button button--strong button--accent">
  <span>Get Started</span>
  <svg class="icon icon--dir" aria-hidden="true" focusable="false"><use href="#ArrowRight"/></svg>
</button>

<!-- Icon-Only Button (MANDATORY: use .visually-hidden text for translation & voice control) -->
<button type="button" class="button button--icon">
  <span class="visually-hidden">Search site</span>
  <svg class="icon" aria-hidden="true" focusable="false"><use href="#Search"/></svg>
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

<!-- Link Styled as Button (MANDATORY: role="button") -->
<a href="/login" class="button button--strong button--accent" role="button">
  <span>Log In</span>
</a>
\`\`\`

---

#### 2. WCAG 2.2 Conformance Matrix

| Criterion | Level | Implementation Strategy |
| :--- | :---: | :--- |
| **2.5.5 Target Size (Enhanced)** | **AAA** | Standard (\`md\`) buttons meet **48x48px** minimum block & inline bounds via \`--button-min-size: var(--spacing-target, 3rem)\`. |
| **2.5.8 Target Size (Minimum)** | **AA** | Compact (\`button--sm\`) controls maintain **32px** height, safely exceeding the 24x24px minimum touch target threshold. |
| **1.4.3 / 1.4.11 Contrast** | **AA** | 4.5:1 text contrast for labels and 3:1 graphical boundaries for resting borders and focus rings. |
| **2.4.7 / 2.4.13 Focus Visible** | **AA/AAA** | High-contrast \`:focus-visible\` ring with a 2px offset (\`--focus-ring-offset: 2px\`) providing at least 3:1 contrast against adjacent backgrounds. |
| **4.1.2 Name, Role, Value** | **A** | Icon-only buttons mandate \`<span class="visually-hidden">\` child text for screen readers and speech recognition. |
| **Single-Source State Engine** | **Standard** | Hover, active, focus, and disabled transitions are resolved strictly once in the base primitive using private state variables (\`--_button-hover-*\`, \`--_button-active-*\`). Variants are pure token maps that never duplicate pseudo-classes. |

---

#### 3. CSS Custom Property Contract Table

| Custom Property | Fallback | Intended Purpose |
| :--- | :--- | :--- |
| \`--button-min-size\` | \`--spacing-target\` (3rem / 48px) | Minimum block and inline target size |
| \`--button-bg\` | \`transparent\` | Resting button canvas fill |
| \`--button-border-color\` | \`--border-color-muted\` (\`currentColor\`) | Resting border stroke color |
| \`--button-border-width\` | \`--border-width\` (1px) | Border stroke thickness |
| \`--button-text\` | \`--foreground\` (\`currentColor\`) | Button label text color |
| \`--button-hover-bg\` | \`--foreground\` (\`currentColor\`) | Hover background fill |
| \`--button-hover-border-color\` | \`--foreground\` (\`currentColor\`) | Hover border stroke color |
| \`--button-hover-text\` | \`--surface\` (#ffffff) | Hover label text color |
| \`--button-active-bg\` | \`--foreground-accent-pressed\` (#005f57) | Pressed/active background fill |
| \`--button-active-border-color\` | \`--foreground-accent-pressed\` (#005f57) | Pressed/active border stroke color |
| \`--button-active-text\` | \`--surface\` (#ffffff) | Pressed/active label text color |
| \`--button-padding-block\` | \`--spacing-4\` (0.25rem) | Vertical inner clearance |
| \`--button-padding-inline\` | \`--spacing-16\` (1rem) | Horizontal inner clearance |
| \`--button-radius\` | \`--radius\` (0.25rem) | Corner curvature |
| \`--button-inner-gap\` | \`--spacing-12\` (0.75rem) | Spacing between icon and label |
| \`--button-transition\` | \`--duration-sm\` (150ms) | Hover, focus, and active transition duration |

---

#### 4. Zero-Class Container Style Queries (\`@container style(...)\`)
Parents can declaratively orchestrate button styling across entire sub-trees without adding modifier classes to individual button elements:

\`\`\`css
/* Example: Contextual navigation bar orchestration */
.app-header__actions {
  --button-variation: subtle;
  --button-corners: round;
  --ui-density: dense;
}
\`\`\`
`,
      },
    },
  },
  argTypes: {
    label: {
      description: 'Button text label',
      control: 'text',
      defaultValue: 'Action Label',
    },
    variant: {
      description: 'Cosmetic button variant',
      control: 'select',
      options: ['default', 'primary', 'plain', 'subtle', 'destructive', 'placeholder'],
      defaultValue: 'primary',
    },
    size: {
      description: 'Button sizing variant',
      control: 'select',
      options: ['sm', 'md', 'lg'],
      defaultValue: 'md',
    },
    disabled: {
      description: 'Native HTML disabled state',
      control: 'boolean',
      defaultValue: false,
    },
    ariaDisabled: {
      description: 'Accessible aria-disabled state',
      control: 'boolean',
      defaultValue: false,
    },
    isLink: {
      description: 'Render as anchor link with role="button"',
      control: 'boolean',
      defaultValue: false,
    },
    hasIcon: {
      description: 'Include trailing action icon',
      control: 'boolean',
      defaultValue: false,
    },
  },
  render: (args) => {
    const variantClass = args.variant && args.variant !== 'default' ? `button--${args.variant}` : '';
    const sizeClass = args.size && args.size !== 'md' ? `button--${args.size}` : '';
    const classes = [
      'button',
      variantClass,
      sizeClass,
    ].filter(Boolean).join(' ');

    const iconSvg = `
      <svg class="icon icon--dir" aria-hidden="true" focusable="false">
        <use href="#ArrowRight"/>
      </svg>
    `;

    const content = `
      <span>${args.label || 'Action'}</span>
      ${args.hasIcon ? iconSvg : ''}
    `;

    if (args.isLink) {
      return `
        <div class="demo-stage demo-constrained--md">
          <a 
            href="#" 
            class="${classes}" 
            ${args.ariaDisabled ? 'aria-disabled="true" tabindex="-1"' : ''}
            role="button"
          >
            ${content}
          </a>
        </div>
      `;
    }

    return `
      <div class="demo-stage demo-constrained--md">
        <button 
          type="button" 
          class="${classes}" 
          ${args.disabled ? 'disabled' : ''}
          ${args.ariaDisabled ? 'aria-disabled="true"' : ''}
        >
          ${content}
        </button>
      </div>
    `;
  },
};

export default meta;
type Story = StoryObj<ButtonArgs>;

/**
 * 1. Playground (Interactive Sandbox)
 * Adjust variants, sizes, disabled states, links, and icons via Storybook controls.
 */
export const Playground: Story = {
  args: {
    label: 'Primary Action',
    variant: 'primary',
    size: 'md',
    disabled: false,
    ariaDisabled: false,
    isLink: false,
    hasIcon: true,
  },
};

/**
 * 2. Anatomy & Structure Breakdown
 * Shows the accessible relationship between Touch Target, Inner Label, Trailing Icon, and Focus Ring.
 */
export const Anatomy: Story = {
  render: () => `
    <div class="demo-stage demo-constrained--md stack">
      <div class="demo-label">1. Target Bounds (48px) &rarr; 2. Label Text &rarr; 3. Trailing Icon (aria-hidden) &rarr; 4. High-Contrast Focus Ring</div>
      
      <div class="cluster" style="display: flex; gap: var(--spacing-16); align-items: center;">
        <button type="button" class="button button--strong button--accent">
          <span>Continue Checkout</span>
          <svg class="icon icon--dir" aria-hidden="true" focusable="false">
            <use href="#ArrowRight"/>
          </svg>
        </button>

        <button type="button" class="button button--icon">
          <span class="visually-hidden">Search accessibility database</span>
          <svg class="icon" aria-hidden="true" focusable="false">
            <use href="#Search"/>
          </svg>
        </button>
      </div>
    </div>
  `,
};

/**
 * 3. Variants & Hierarchy (Prominence × Tone Matrix)
 * Demonstrates orthogonal axes: Prominence (Default, Strong, Subtle, Plain) × Tone (Neutral, Accent, Destructive).
 */
export const Variants: Story = {
  render: () => `
    <div class="demo-stage demo-constrained--lg stack">
      <div class="demo-label">1. Prominence Scale (Neutral Tone)</div>
      <div class="cluster" style="display: flex; gap: var(--spacing-12); flex-wrap: wrap;">
        <button type="button" class="button">
          <span>Default (Outline)</span>
        </button>
        <button type="button" class="button button--strong">
          <span>button--strong</span>
        </button>
        <button type="button" class="button button--subtle">
          <span>button--subtle</span>
        </button>
        <button type="button" class="button button--plain">
          <span>button--plain</span>
        </button>
        <button type="button" class="button button--placeholder">
          <span>+ Placeholder</span>
        </button>
      </div>

      <hr class="divider" />

      <div class="demo-label">2. Tone / Intent (Standard Outline Weight)</div>
      <div class="cluster" style="display: flex; gap: var(--spacing-12); flex-wrap: wrap;">
        <button type="button" class="button">
          <span>Neutral Tone</span>
        </button>
        <button type="button" class="button button--accent">
          <span>button--accent</span>
        </button>
        <button type="button" class="button button--danger">
          <svg class="icon" width="20" height="20" aria-hidden="true"><use href="#Delete"/></svg>
          <span>button--danger</span>
        </button>
      </div>

      <hr class="divider" />

      <div class="demo-label">3. High Prominence (Strong) Combinations</div>
      <div class="cluster" style="display: flex; gap: var(--spacing-12); flex-wrap: wrap;">
        <button type="button" class="button button--strong button--accent">
          <span>Strong + Accent (.button--strong button--accent)</span>
        </button>
        <button type="button" class="button button--strong button--danger">
          <svg class="icon" width="20" height="20" aria-hidden="true"><use href="#Delete"/></svg>
          <span>Strong + Destructive</span>
        </button>
        <button type="button" class="button button--strong">
          <span>Strong Neutral</span>
        </button>
      </div>

      <hr class="divider" />

      <div class="demo-label">4. Subtle & Plain Combinations</div>
      <div class="cluster" style="display: flex; gap: var(--spacing-12); flex-wrap: wrap;">
        <button type="button" class="button button--subtle button--accent">
          <svg class="icon" width="20" height="20" aria-hidden="true"><use href="#Check"/></svg>
          <span>Subtle + Accent</span>
        </button>
        <button type="button" class="button button--subtle button--danger">
          <svg class="icon" width="20" height="20" aria-hidden="true"><use href="#Delete"/></svg>
          <span>Subtle + Destructive</span>
        </button>
        <button type="button" class="button button--plain button--accent">
          <span>Plain + Accent</span>
        </button>
        <button type="button" class="button button--plain button--danger">
          <svg class="icon" width="20" height="20" aria-hidden="true"><use href="#Delete"/></svg>
          <span>Plain + Destructive</span>
        </button>
      </div>
    </div>
  `,
};

/**
 * 4. State Matrix
 * Side-by-side verification of Resting, Hover, Active, Focus-Visible, Native Disabled, and ARIA Disabled.
 */
export const StateMatrix: Story = {
  render: () => `
    <div class="demo-stage demo-constrained--lg stack">
      <div class="demo-label">Interactive States (Resting, Active, Disabled, Aria-Disabled)</div>
      <div class="cluster" style="display: flex; gap: var(--spacing-12); flex-wrap: wrap;">
        <!-- Resting -->
        <button type="button" class="button button--strong button--accent">
          <span>Resting</span>
        </button>

        <!-- Selected Toggle -->
        <button type="button" class="button button--strong button--accent is-active">
          <span>Selected / Active</span>
        </button>

        <!-- Native Disabled -->
        <button type="button" class="button button--strong button--accent" disabled>
          <span>Native Disabled</span>
        </button>

        <!-- Aria Disabled (Still focusable for screen readers) -->
        <button type="button" class="button button--strong button--accent" aria-disabled="true">
          <span>Aria Disabled</span>
        </button>

        <!-- Link Button Aria Disabled -->
        <a href="#" class="button" aria-disabled="true" tabindex="-1" role="button">
          <span>Link Aria Disabled</span>
        </a>
      </div>
    </div>
  `,
};

/**
 * 5. Sizes & Density (WCAG Target Compliance)
 * Small (32px, meets WCAG 2.5.8), Medium (48px, meets WCAG 2.5.5 AAA), and Large (56px).
 */
export const SizesAndDensity: Story = {
  render: () => `
    <div class="demo-stage demo-constrained--lg stack">
      <div class="cluster" style="display: flex; gap: var(--spacing-16); align-items: center; flex-wrap: wrap;">
        <!-- Small -->
        <div class="stack" style="align-items: center;">
          <div class="demo-label">Small (.button--sm / 32px height)</div>
          <button type="button" class="button button--strong button--accent button--sm">
            <span>Small Action</span>
          </button>
        </div>

        <!-- Medium (Default) -->
        <div class="stack" style="align-items: center;">
          <div class="demo-label">Standard (.button / 48px WCAG AAA)</div>
          <button type="button" class="button button--strong button--accent">
            <span>Standard Action</span>
          </button>
        </div>

        <!-- Large -->
        <div class="stack" style="align-items: center;">
          <div class="demo-label">Large (.button--lg / 56px height)</div>
          <button type="button" class="button button--strong button--accent button--lg">
            <span>Large Action</span>
          </button>
        </div>
      </div>
    </div>
  `,
};

/**
 * 6. Icon Buttons, Round Shapes & Avatar Buttons
 * Icon-only with accessible hidden text, trailing/leading icons, rounded pills, and avatar actions.
 */
export const IconButtonsAndShapes: Story = {
  render: () => `
    <div class="demo-stage demo-constrained--lg stack">
      <div class="cluster" style="display: flex; gap: var(--spacing-16); align-items: center; flex-wrap: wrap;">
        <!-- Icon-only with .visually-hidden -->
        <button type="button" class="button button--icon">
          <span class="visually-hidden">Search records</span>
          <svg class="icon" aria-hidden="true" focusable="false"><use href="#Search"/></svg>
        </button>

        <!-- Round Action Pill -->
        <button type="button" class="button button--strong button--accent button--round">
          <span>Rounded Pill</span>
        </button>

        <!-- Round Icon Button -->
        <button type="button" class="button button--icon button--round">
          <span class="visually-hidden">Notifications</span>
          <svg class="icon" aria-hidden="true" focusable="false"><use href="#BellFilled"/></svg>
        </button>

        <!-- Avatar Button with Status -->
        <button type="button" class="button button--avatar button--round" data-status="online" aria-label="Alex Morgan profile (online)">
          <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&h=80&q=80" alt="" width="40" height="40" style="object-fit: cover; border-radius: inherit;" />
        </button>
      </div>
    </div>
  `,
};

/**
 * 7. Button-Like Form Controls (Zero-JS Switches & Choices)
 * Native checkboxes and radio choices styled as buttons with zero JavaScript overhead.
 */
export const ButtonLikeFormSwitches: Story = {
  render: () => `
    <div class="demo-stage demo-constrained--lg stack">
      <div class="demo-label">Zero-JS Checkbox Switch & Radio Choices</div>
      <div class="cluster" style="display: flex; gap: var(--spacing-12); flex-wrap: wrap;">
        <!-- Checkbox switch with icon transition -->
        <label class="button">
          <input type="checkbox" class="visually-hidden" />
          <svg class="icon icon--off" aria-hidden="true" focusable="false"><use href="#Close"/></svg>
          <svg class="icon icon--on" aria-hidden="true" focusable="false"><use href="#Check"/></svg>
          <span>Toggle Switch</span>
        </label>

        <!-- Segmented choice radio buttons -->
        <label class="button">
          <input type="radio" name="choice-demo-btn" class="visually-hidden" checked />
          <span>Option A</span>
          <svg class="icon icon--on" aria-hidden="true" focusable="false"><use href="#Check"/></svg>
        </label>
        <label class="button">
          <input type="radio" name="choice-demo-btn" class="visually-hidden" />
          <span>Option B</span>
          <svg class="icon icon--on" aria-hidden="true" focusable="false"><use href="#Check"/></svg>
        </label>
      </div>
    </div>
  `,
};

/**
 * 8. Zero-Class Container Style Queries (@container style(...))
 * Demonstrating parent container orchestration for button variations, shapes, and density without utility classes.
 */
export const ZeroClassOrchestration: Story = {
  render: () => `
    <div class="stack demo-constrained--md">
      <!-- Subtle & Round Navigation -->
      <div class="demo-label">Parent: style="--button-variation: subtle; --button-corners: round;"</div>
      <div class="demo-stage" style="--button-variation: subtle; --button-corners: round;">
        <nav class="cluster" style="display: flex; gap: var(--spacing-8); align-items: center;" aria-label="Demo Navigation">
          <button type="button" class="button"><span>Overview</span></button>
          <button type="button" class="button"><span>Analytics</span></button>
          <button type="button" class="button"><span>Reports</span></button>
          <button type="button" class="button"><span>Settings</span></button>
        </nav>
      </div>

      <!-- Dense Action Toolbar -->
      <div class="demo-label">Parent: style="--ui-density: dense;"</div>
      <div class="demo-stage" style="--ui-density: dense;">
        <div class="cluster" style="display: flex; gap: var(--spacing-8); align-items: center;">
          <button type="button" class="button"><span>Cancel</span></button>
          <button type="button" class="button button--strong button--accent"><span>Save Changes</span></button>
        </div>
      </div>
    </div>
  `,
};

/**
 * 9. Responsive Adaptive Container Queries
 * Toolbar buttons that automatically collapse into icon-only buttons as container inline width shrinks.
 */
export const ResponsiveAdaptive: Story = {
  render: () => `
    <div class="stack demo-constrained--lg">
      <div class="card card--bordered">
        <article class="card__content">
          <header class="card__header">
            <h3 class="card__title subheading">Interactive Responsive Toolbar</h3>
            <p class="card__subtitle">Drag the resize handle on the container below to see buttons collapse labels below 768px</p>
          </header>
          <div class="card__body">
            <div 
              class="container-type-inline-size"
              style="
                resize: horizontal; 
                overflow: auto; 
                border: 2px dashed var(--border-color-accent, #008076); 
                padding: var(--spacing-16); 
                border-radius: var(--radius, 0.25rem); 
                background-color: var(--surface-muted);
                max-inline-size: 100%; 
                min-inline-size: 12rem; 
                inline-size: 34rem;
              "
            >
              <div class="cluster align-items-center justify-content-between" style="display: flex; justify-content: space-between; align-items: center;">
                <strong>Toolbar Actions</strong>
                <div class="cluster align-items-center @max-md:hide-labels" style="display: flex; gap: var(--spacing-8); align-items: center;">
                  <button type="button" class="button" aria-label="Search documentation">
                    <svg class="icon" width="20" height="20" aria-hidden="true" focusable="false"><use href="#Search"/></svg>
                    <span class="button__text">Search</span>
                  </button>
                  <button type="button" class="button button--strong button--accent" aria-label="Create component">
                    <svg class="icon" width="20" height="20" aria-hidden="true" focusable="false"><use href="#Check"/></svg>
                    <span class="button__text">Create</span>
                  </button>
                  <button type="button" class="button button--subtle" aria-label="Export file">
                    <svg class="icon" width="20" height="20" aria-hidden="true" focusable="false"><use href="#Download"/></svg>
                    <span class="button__text">Export</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  `,
};

/**
 * 10. Real-World Recipes & UI Compositions
 * Common production patterns: Dialog footer action bar & Card header action cluster.
 */
export const RealWorldRecipes: Story = {
  render: () => `
    <div class="stack demo-constrained--lg">
      <!-- Recipe A: Modal Dialog Action Bar -->
      <div class="card card--bordered">
        <article class="card__content">
          <header class="card__header">
            <h3 class="card__title heading">Publish Verification Report</h3>
            <p class="card__subtitle">Ready to publish WCAG 2.2 Level AA compliance findings?</p>
          </header>
          <div class="card__body">
            <p>Publishing will notify 14 subscribed team members and generate an immutable audit manifest.</p>
          </div>
          <footer class="card__footer" style="display: flex; justify-content: flex-end; gap: var(--spacing-8);">
            <button type="button" class="button button--subtle">
              <span>Discard</span>
            </button>
            <button type="button" class="button">
              <span>Save as Draft</span>
            </button>
            <button type="button" class="button button--strong button--accent">
              <span>Publish Report</span>
              <svg class="icon icon--dir" aria-hidden="true" focusable="false"><use href="#ArrowRight"/></svg>
            </button>
          </footer>
        </article>
      </div>

      <!-- Recipe B: Destructive Confirmation Action Bar -->
      <div class="card card--bordered card--translucent">
        <article class="card__content">
          <header class="card__header">
            <h3 class="card__title heading" style="color: var(--foreground-danger);">Permanently Delete Project</h3>
            <p class="card__subtitle">This action cannot be undone. All audit runs and history will be deleted.</p>
          </header>
          <footer class="card__footer" style="display: flex; justify-content: flex-end; gap: var(--spacing-8);">
            <button type="button" class="button button--subtle">
              <span>Cancel</span>
            </button>
            <button type="button" class="button button--danger">
              <svg class="icon" width="20" height="20" aria-hidden="true"><use href="#Delete"/></svg>
              <span>Delete Permanently</span>
            </button>
          </footer>
        </article>
      </div>
    </div>
  `,
};
