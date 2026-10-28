import type { Meta, StoryObj } from '@storybook/html';

interface ButtonGroupArgs {
  layout?: 'default' | 'tight' | 'stacked' | 'stretch';
  density?: 'default' | 'dense';
}

const meta: Meta<ButtonGroupArgs> = {
  title: 'Molecules/Button Group',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
### Developer & Designer Notes: Button Group Primitive

The **Button Group** primitive is a layout container engineered for grouping related action buttons, segmented controls, and dropdown/context action menus with horizontal, vertical, and full-width layouts.
Built with zero-specificity \`:where()\`, local private variables (\`--_button-group-*\`), joined border radii for tight controls, and native container queries.

---

#### 1. Canonical Semantic Markup Signatures
AI agents and developers MUST strictly use the following semantic patterns:

\`\`\`html
<!-- Standard Horizontal Action Cluster -->
<div class="button-group">
  <button type="button" class="button"><span>Cancel</span></button>
  <button type="button" class="button"><span>Save Draft</span></button>
  <hr class="divider">
  <button type="button" class="button button--strong button--accent"><span>Publish</span></button>
</div>

<!-- Segmented Control with Joined Borders -->
<div class="button-group button-group--tight">
  <button type="button" class="button"><span>Day</span></button>
  <button type="button" class="button is-active"><span>Week</span></button>
  <button type="button" class="button"><span>Month</span></button>
</div>

<!-- Stacked Column Menu (Dropdowns, Context Menus, and Drawers) -->
<div class="button-group button-group--tight button-group--stacked buttons-subtle">
  <button type="button" class="button">
    <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Duplicate"/></svg>
    <span>Duplicate</span>
  </button>
  <button type="button" class="button">
    <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Download"/></svg>
    <span>Export JSON</span>
  </button>
  <hr class="divider">
  <button type="button" class="button button--subtle button--danger">
    <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Delete"/></svg>
    <span>Delete</span>
  </button>
</div>

<!-- Stretched Action Bar with Inline Content and End Spacer -->
<div class="button-group button-group--stretch">
  <button type="button" class="button"><span>Previous</span></button>
  <span class="button-group__content button-group__fill">Step 2 of 5</span>
  <button type="button" class="button button--strong button--accent button-group__end"><span>Next Step</span></button>
</div>
\`\`\`

---

#### 2. WCAG 2.2 Conformance Matrix

| Criterion | Level | Implementation Strategy |
| :--- | :---: | :--- |
| **2.5.5 / 2.5.8 Target Size** | **AA/AAA** | Child buttons preserve standard 48px baseline targets; compact variants preserve minimum 32px targets. |
| **2.4.7 / 2.4.13 Focus Visible** | **AA/AAA** | For tight controls (\`.button-group--tight\`), the focus ring reverses offset (\`outline-offset: -2px\`) to prevent overlapping adjacent buttons. |
| **1.3.1 Info & Relationships** | **A** | Group semantics can be optionally reinforced via \`role="group"\` or \`role="toolbar"\` with descriptive \`aria-label\`. |
| **Divider Auto-Orientation** | **Standard** | \`hr.divider\` elements nested inside \`.button-group\` automatically switch to vertical lines via container-driven logical borders. |

---

#### 3. CSS Custom Property Contract Table

| Custom Property | Fallback | Intended Purpose |
| :--- | :--- | :--- |
| \`--button-group-gap\` | \`--spacing\` (1rem / 16px) | Spacing between buttons in standard groups |
| \`--button-group-tight-gap\` | \`0px\` | Spacing between buttons in tight / segmented groups |
| \`--button-group-divider-width\` | \`--border-width\` (1px) | Stroke thickness of nested dividers |
| \`--button-group-divider-color\` | \`--border-color\` (\`currentColor\`) | Divider stroke color |
| \`--button-group-content-color\` | \`currentColor\` | Text color for \`.button-group__content\` spans |
| \`--button-group-content-font-size\` | \`--typography-font-size-0\` (1rem) | Text size for inline labels |
| \`--button-group-heading-gap\` | \`--spacing-16\` (1rem) | Vertical gap above section headings in stacked menus |

---

#### 4. Zero-Class Container Style Queries (\`@container style(...)\`)
Parents can declaratively orchestrate child button styles in groups:

\`\`\`css
/* Example: Contextual subtle toolbar */
.table-toolbar {
  --button-prominence: subtle;
  --ui-sizing: compact;
}
\`\`\`
`,
      },
    },
  },
  argTypes: {
    layout: {
      description: 'Group layout arrangement',
      control: 'select',
      options: ['default', 'tight', 'stacked', 'stretch'],
      defaultValue: 'default',
    },
    density: {
      description: 'Container query density',
      control: 'select',
      options: ['default', 'dense'],
      defaultValue: 'default',
    },
  },
  render: (args) => {
    const layoutClass = args.layout && args.layout !== 'default' ? `button-group--${args.layout}` : '';
    const densityStyle = args.density === 'dense' ? '--ui-sizing: compact;' : '';

    return `
      <div class="demo-stage demo-constrained--md" style="${densityStyle}">
        <div class="button-group ${layoutClass}">
          <button type="button" class="button"><span>Cancel</span></button>
          <button type="button" class="button"><span>Save Draft</span></button>
          <hr class="divider">
          <button type="button" class="button button--strong button--accent"><span>Publish</span></button>
        </div>
      </div>
    `;
  },
};

export default meta;
type Story = StoryObj<ButtonGroupArgs>;

/**
 * 1. Playground (Interactive Sandbox)
 * Adjust layout orientations, tightness, and density via Storybook controls.
 */
export const Playground: Story = {
  args: {
    layout: 'default',
    density: 'default',
  },
};

/**
 * 2. Anatomy & Structure Breakdown
 * Shows buttons, auto-orienting vertical dividers, inline content labels, and end spacers.
 */
export const Anatomy: Story = {
  render: () => `
    <div class="demo-stage demo-constrained--lg stack">
      <div class="demo-label">1. Action Buttons &rarr; 2. Auto-Orienting Divider &rarr; 3. Text Label &rarr; 4. End Spacer (.button-group__end)</div>
      
      <div class="button-group button-group--stretch" style="inline-size: 100%;">
        <button type="button" class="button"><span>Back</span></button>
        <hr class="divider">
        <span class="button-group__content button-group__fill">Step 3 of 5 (Review Deliverables)</span>
        <hr class="divider">
        <button type="button" class="button button--strong button--accent button-group__end"><span>Continue</span></button>
      </div>
    </div>
  `,
};

/**
 * 3. Variants & Layout Patterns
 * Demonstrates Horizontal Cluster, Segmented Tight Control, Stacked Column Menu, and Ruled Group.
 */
export const Variants: Story = {
  render: () => `
    <div class="demo-stage demo-constrained--lg stack">
      <!-- 1. Standard Horizontal -->
      <div>
        <div class="demo-label">1. Standard Horizontal (.button-group)</div>
        <div class="button-group">
          <button type="button" class="button"><span>Review</span></button>
          <button type="button" class="button"><span>Approve</span></button>
          <hr class="divider">
          <button type="button" class="button button--strong button--accent"><span>Deploy</span></button>
        </div>
      </div>

      <hr class="divider" />

      <!-- 2. Segmented Tight Control -->
      <div>
        <div class="demo-label">2. Segmented Tight Control (.button-group--tight / Joined Radii)</div>
        <div class="button-group button-group--tight">
          <button type="button" class="button is-active"><span>Overview</span></button>
          <button type="button" class="button"><span>Activity</span></button>
          <button type="button" class="button"><span>Audit Logs</span></button>
          <button type="button" class="button"><span>Settings</span></button>
        </div>
      </div>

      <hr class="divider" />

      <!-- 3. Stretched Action Bar -->
      <div>
        <div class="demo-label">3. Full-Width Stretched (.button-group--stretch)</div>
        <div class="button-group button-group--stretch" style="inline-size: 100%;">
          <button type="button" class="button" style="flex: 1 1 auto;"><span>Cancel</span></button>
          <button type="button" class="button button--strong button--accent" style="flex: 1 1 auto;"><span>Submit</span></button>
        </div>
      </div>

      <hr class="divider" />

      <!-- 4. Stacked Column Menu -->
      <div>
        <div class="demo-label">4. Stacked Column Menu (.button-group--stacked)</div>
        <div class="card card--compact card--bordered" style="max-inline-size: 20rem;">
          <div class="card__content">
            <div class="card__body card__body--flush">
              <div class="button-group button-group--tight button-group--stacked buttons-subtle">
                <button type="button" class="button">
                  <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Duplicate"/></svg>
                  <span>Duplicate Item</span>
                </button>
                <button type="button" class="button">
                  <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Download"/></svg>
                  <span>Export Report</span>
                </button>
                <hr class="divider">
                <button type="button" class="button button--subtle button--danger">
                  <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Delete"/></svg>
                  <span>Delete Permanently</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
};

/**
 * 4. State Matrix
 * Side-by-side verification of Active/Selected, Disabled, and Subtle items inside groups.
 */
export const StateMatrix: Story = {
  render: () => `
    <div class="demo-stage demo-constrained--lg stack">
      <div class="demo-label">Item States in Group (Selected, Resting, Disabled)</div>
      <div class="button-group button-group--tight">
        <button type="button" class="button is-active">
          <span>Active View</span>
        </button>
        <button type="button" class="button">
          <span>Standard View</span>
        </button>
        <button type="button" class="button" disabled>
          <span>Disabled View</span>
        </button>
      </div>

      <hr class="divider" />

      <div class="demo-label">Mixed Variants with Divider</div>
      <div class="button-group">
        <button type="button" class="button button--subtle"><span>Cancel</span></button>
        <button type="button" class="button"><span>Save Draft</span></button>
        <hr class="divider">
        <button type="button" class="button button--strong button--accent"><span>Confirm Action</span></button>
      </div>
    </div>
  `,
};

/**
 * 5. Sizes & Density (WCAG Target Compliance)
 * Compares standard button group with compact density mode.
 */
export const SizesAndDensity: Story = {
  render: () => `
    <div class="demo-stage demo-constrained--lg stack">
      <!-- Standard Spacing -->
      <div>
        <div class="demo-label">Standard Density (48px Touch Targets)</div>
        <div class="button-group">
          <button type="button" class="button"><span>Action 1</span></button>
          <button type="button" class="button button--strong button--accent"><span>Action 2</span></button>
        </div>
      </div>

      <hr class="divider" />

      <!-- Dense Container Query -->
      <div style="--ui-sizing: compact;">
        <div class="demo-label">Compact Container (--ui-sizing: compact / 32px visual, 48px hit area)</div>
        <div class="button-group">
          <button type="button" class="button"><span>Action 1</span></button>
          <button type="button" class="button button--strong button--accent"><span>Action 2</span></button>
        </div>
      </div>
    </div>
  `,
};

/**
 * 6. Zero-Class Container Style Queries (@container style(...))
 * Demonstrating parent container orchestration for button styles inside groups.
 */
export const ZeroClassOrchestration: Story = {
  render: () => `
    <div class="stack demo-constrained--md">
      <!-- Subtle Navigation Group -->
      <div class="demo-label">Parent: style="--button-prominence: subtle; --button-corners: round;"</div>
      <div class="demo-stage" style="--button-prominence: subtle; --button-corners: round;">
        <div class="button-group">
          <button type="button" class="button"><span>Summary</span></button>
          <button type="button" class="button"><span>Issues</span></button>
          <button type="button" class="button"><span>Discussions</span></button>
        </div>
      </div>

      <!-- Dense Segmented Toolbar -->
      <div class="demo-label">Parent: style="--ui-sizing: compact;"</div>
      <div class="demo-stage" style="--ui-sizing: compact;">
        <div class="button-group button-group--tight">
          <button type="button" class="button is-active"><span>Grid</span></button>
          <button type="button" class="button"><span>Table</span></button>
          <button type="button" class="button"><span>Kanban</span></button>
        </div>
      </div>
    </div>
  `,
};

/**
 * 7. Real-World Recipes & UI Compositions
 * Common production patterns: Context menu dropdown, step wizard toolbar, and card footer action bar.
 */
export const RealWorldRecipes: Story = {
  render: () => `
    <div class="stack demo-constrained--lg">
      <!-- Recipe A: Floating Context Menu / Dropdown Surface -->
      <div class="card card--bordered card--translucent card--ruled" style="max-inline-size: 18rem; box-shadow: var(--shadow-lg);">
        <article class="card__content">
          <header class="card__header" style="padding-block: var(--spacing-8);">
            <h4 class="card__title" style="font-size: var(--typography-font-size--1); text-transform: uppercase; letter-spacing: 0.05em; color: var(--foreground-muted);">
              File Operations
            </h4>
          </header>
          <div class="card__body card__body--flush">
            <div class="button-group button-group--tight button-group--stacked buttons-subtle">
              <button type="button" class="button">
                <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Duplicate"/></svg>
                <span>Make a Copy</span>
              </button>
              <button type="button" class="button">
                <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Download"/></svg>
                <span>Download Archive</span>
              </button>
              <button type="button" class="button">
                <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Check"/></svg>
                <span>Mark as Reviewed</span>
              </button>
              <hr class="divider">
              <button type="button" class="button button--subtle button--danger">
                <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Delete"/></svg>
                <span>Move to Trash</span>
              </button>
            </div>
          </div>
        </article>
      </div>

      <!-- Recipe B: Multi-Step Form Navigation Bar -->
      <div class="card card--bordered">
        <article class="card__content">
          <div class="card__body">
            <div class="button-group button-group--stretch" style="inline-size: 100%;">
              <button type="button" class="button button--subtle">
                <span>&larr; Back</span>
              </button>
              <hr class="divider">
              <span class="button-group__content button-group__fill" style="font-weight: var(--font-weight-bold);">
                Step 3 of 4: WCAG Checklist
              </span>
              <hr class="divider">
              <button type="button" class="button button--strong button--accent button-group__end">
                <span>Continue &rarr;</span>
              </button>
            </div>
          </div>
        </article>
      </div>
    </div>
  `,
};
