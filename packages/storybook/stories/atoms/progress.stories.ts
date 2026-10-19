import type { Meta, StoryObj } from '@storybook/html';

interface ProgressArgs {
  value?: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'subtle';
  isIndeterminate?: boolean;
  label?: string;
}

const meta: Meta<ProgressArgs> = {
  title: 'Atoms/Progress',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
### Developer & Designer Notes: Progress Primitive

The **Progress** primitive provides accessible, cross-engine progress indicators leveraging native HTML5 \`<progress>\`.
Supports cross-engine styling across WebKit, Blink, and Gecko, responsive sizing tiers, smooth determinate transitions, and accessible indeterminate shimmer animations.
Adheres to strict **WCAG 2.2 AA / AAA** accessibility and contrast standards.

---

#### 1. Canonical Semantic Markup Signatures
AI agents and developers MUST strictly use the following semantic patterns:

\`\`\`html
<!-- 1. Determinate Progress Bar (with Accessible Field Header) -->
<div class="field">
  <div class="field__header">
    <label for="export-progress" class="field__label">Exporting audit report...</label>
    <span class="field__result" id="export-readout">75%</span>
  </div>
  <progress 
    id="export-progress" 
    class="progress" 
    value="75" 
    max="100" 
    aria-describedby="export-readout"
  >
    75%
  </progress>
</div>

<!-- 2. Indeterminate Progress Bar (Zero Value Attribute) -->
<div class="field">
  <div class="field__header">
    <label for="sync-progress" class="field__label">Synchronizing tokens with Figma...</label>
  </div>
  <progress id="sync-progress" class="progress">Loading...</progress>
</div>

<!-- 3. Sizing Modifiers (.progress--sm: 4px, .progress--lg: 16px) -->
<progress class="progress progress--sm" value="30" max="100">30%</progress>
<progress class="progress" value="50" max="100">50%</progress>
<progress class="progress progress--lg" value="80" max="100">80%</progress>

<!-- 4. Semantic Color Modifiers (.progress--success, .progress--warning, .progress--danger) -->
<progress class="progress progress--success" value="100" max="100">100%</progress>
<progress class="progress progress--warning" value="45" max="100">45%</progress>
<progress class="progress progress--danger" value="20" max="100">20%</progress>
\`\`\`

---

#### 2. WCAG 2.2 Conformance Matrix

| Criterion | Level | Implementation Strategy |
| :--- | :---: | :--- |
| **4.1.2 Name, Role, Value** | **A** | Native HTML5 \`<progress>\` exposes \`role="progressbar"\`, \`aria-valuenow\`, and \`aria-valuemax\` directly without JavaScript intervention. |
| **1.3.1 Info & Relationships** | **A** | Associated with explicit \`<label for="...">\` and dynamic readout element using \`aria-describedby\`. |
| **1.4.11 Non-Text Contrast** | **AA** | Fill bar maintains >= 3:1 graphical contrast against track surface and page background. |
| **2.3.3 Reduced Motion** | **AAA** | Shimmer animation disables under \`@media (prefers-reduced-motion: reduce)\`, falling back to static tinted bar. |
| **Cross-Engine Normalization** | **Standard** | Normalized across \`::-webkit-progress-bar\`, \`::-webkit-progress-value\`, and \`::-moz-progress-bar\`. |

---

#### 3. CSS Custom Property Contract Table

| Custom Property | Fallback | Intended Purpose |
| :--- | :--- | :--- |
| \`--progress-height\` | \`var(--spacing-8, 0.5rem)\` | Default progress bar thickness (8px) |
| \`--progress-sm-height\` | \`var(--spacing-4, 0.25rem)\` | Small progress bar thickness (4px) |
| \`--progress-lg-height\` | \`var(--spacing-16, 1rem)\` | Large progress bar thickness (16px) |
| \`--progress-track-bg\` | \`var(--surface-muted, #E6E4DF)\` | Unfilled track background fill |
| \`--progress-fill-bg\` | \`var(--foreground-accent, #008076)\` | Active filled bar color |
| \`--progress-radius\` | \`var(--radius, 0.25rem)\` | Track and bar corner rounding |
| \`--progress-transition\` | \`var(--duration-sm, 200ms)\` | Fill width animation duration |
`,
      },
    },
  },
  args: {
    value: 65,
    max: 100,
    size: 'md',
    variant: 'default',
    isIndeterminate: false,
    label: 'Uploading documentation assets...',
  },
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    max: { control: 'number' },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Thickness sizing tier',
    },
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'danger', 'subtle'],
      description: 'Semantic status fill color',
    },
    isIndeterminate: {
      control: 'boolean',
      description: 'Enables continuous loading shimmer animation',
    },
    label: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<ProgressArgs>;

/**
 * 1. Playground (Interactive Sandbox)
 */
export const Playground: Story = {
  render: (args) => {
    const sizeClass = args.size && args.size !== 'md' ? `progress--${args.size}` : '';
    const variantClass = args.variant && args.variant !== 'default' ? `progress--${args.variant}` : '';
    const classes = ['progress', sizeClass, variantClass].filter(Boolean).join(' ');

    const valueAttr = args.isIndeterminate ? '' : `value="${args.value ?? 65}"`;
    const maxAttr = `max="${args.max ?? 100}"`;
    const labelText = args.label || 'Progress';

    return `
      <div class="demo-stage demo-stage--lg demo-stage--card">
        <div class="field demo-constrained--md" style="margin-inline: auto;">
          <div class="field__header">
            <label for="progress-pg-demo" class="field__label">${labelText}</label>
            ${!args.isIndeterminate ? `<span class="field__result" id="progress-val-text">${args.value ?? 65}%</span>` : ''}
          </div>
          <progress 
            id="progress-pg-demo" 
            class="${classes}" 
            ${valueAttr} 
            ${maxAttr}
            ${!args.isIndeterminate ? 'aria-describedby="progress-val-text"' : ''}
          >
            ${!args.isIndeterminate ? `${args.value ?? 65}%` : 'Loading...'}
          </progress>
        </div>
      </div>
    `;
  },
};

/**
 * 2. Anatomy (Exploded View of Field, Track, Fill & Readout)
 */
export const Anatomy: Story = {
  render: () => {
    return `
      <div class="demo-stage demo-stage--lg demo-stage--card">
        <div class="demo-title-group" style="margin-block-end: var(--spacing-16);">
          <h4 class="demo-heading">Progress Anatomy & Cross-Engine Architecture</h4>
          <p class="demo-desc">
            Constructed with normalized pseudo-elements for consistent rendering across WebKit, Blink, and Gecko.
          </p>
        </div>

        <div class="stack" style="gap: var(--spacing-24);">
          <div class="cluster" style="align-items: flex-start; gap: var(--spacing-24);">
            <!-- Field Header Spec -->
            <div class="demo-box demo-box--pink demo-constrained--xs">
              <span class="demo-label">1. Accessible Header</span>
              <p class="micro-text" style="margin-block: var(--spacing-4);">
                Includes <code>&lt;label for="..."&gt;</code> paired with numeric percentage readout.
              </p>
              <div class="field__header" style="margin-block-start: var(--spacing-8);">
                <span class="field__label micro-text">Task Name</span>
                <span class="field__result micro-text">60%</span>
              </div>
            </div>

            <!-- Track Spec -->
            <div class="demo-box demo-box--blue demo-constrained--xs">
              <span class="demo-label">2. Unfilled Track</span>
              <p class="micro-text" style="margin-block: var(--spacing-4);">
                Styled via <code>--_progress-track-bg</code> and <code>::-webkit-progress-bar</code>.
              </p>
              <div style="background-color: var(--surface-muted); block-size: 8px; border-radius: var(--radius-sm); margin-block-start: var(--spacing-8);"></div>
            </div>

            <!-- Fill Bar Spec -->
            <div class="demo-box demo-box--green demo-constrained--xs">
              <span class="demo-label">3. Dynamic Value Fill</span>
              <p class="micro-text" style="margin-block: var(--spacing-4);">
                Styled via <code>::-webkit-progress-value</code> and <code>::-moz-progress-bar</code> with width transition.
              </p>
              <div style="background-color: var(--foreground-accent); inline-size: 70%; block-size: 8px; border-radius: var(--radius-sm); margin-block-start: var(--spacing-8);"></div>
            </div>
          </div>
        </div>
      </div>
    `;
  },
};

/**
 * 3. Variants (Semantic Status Palettes)
 */
export const Variants: Story = {
  render: () => {
    return `
      <div class="demo-stage demo-stage--lg demo-stage--card">
        <div class="demo-constrained--md" style="margin-inline: auto;">
          <div class="stack" style="gap: var(--spacing-24);">
            
            <!-- Default Accent -->
            <div class="field">
              <div class="field__header">
                <label for="prog-var-def" class="field__label">Accent (Default)</label>
                <span class="field__result">65%</span>
              </div>
              <progress id="prog-var-def" class="progress" value="65" max="100">65%</progress>
            </div>

            <!-- Success -->
            <div class="field">
              <div class="field__header">
                <label for="prog-var-succ" class="field__label">Success (.progress--success)</label>
                <span class="field__result" style="color: var(--foreground-success); font-weight: 700;">100%</span>
              </div>
              <progress id="prog-var-succ" class="progress progress--success" value="100" max="100">100%</progress>
            </div>

            <!-- Warning -->
            <div class="field">
              <div class="field__header">
                <label for="prog-var-warn" class="field__label">Warning (.progress--warning)</label>
                <span class="field__result" style="color: var(--foreground-warning); font-weight: 700;">45%</span>
              </div>
              <progress id="prog-var-warn" class="progress progress--warning" value="45" max="100">45%</progress>
            </div>

            <!-- Danger -->
            <div class="field">
              <div class="field__header">
                <label for="prog-var-dang" class="field__label">Danger (.progress--danger)</label>
                <span class="field__result" style="color: var(--foreground-danger); font-weight: 700;">20%</span>
              </div>
              <progress id="prog-var-dang" class="progress progress--danger" value="20" max="100">20%</progress>
            </div>

            <!-- Subtle -->
            <div class="field">
              <div class="field__header">
                <label for="prog-var-sub" class="field__label">Subtle (.progress--subtle)</label>
                <span class="field__result">50%</span>
              </div>
              <progress id="prog-var-sub" class="progress progress--subtle" value="50" max="100">50%</progress>
            </div>

          </div>
        </div>
      </div>
    `;
  },
};

/**
 * 4. State Matrix (Determinate, Indeterminate & High-Contrast)
 */
export const StateMatrix: Story = {
  render: () => {
    return `
      <div class="demo-stage demo-stage--lg demo-stage--card">
        <div class="demo-title-group" style="margin-block-end: var(--spacing-16);">
          <h4 class="demo-heading">State & Contrast Matrix</h4>
          <p class="demo-desc">
            Compares fixed percentage completion against continuous loading states and high-contrast boundaries.
          </p>
        </div>

        <div class="demo-constrained--md" style="margin-inline: auto;">
          <div class="stack" style="gap: var(--spacing-24);">
            
            <!-- Determinate -->
            <div class="demo-box demo-box--neutral">
              <span class="demo-label" style="margin-block-end: var(--spacing-8);">Determinate State (Explicit Value Attribute)</span>
              <progress class="progress" value="70" max="100">70%</progress>
            </div>

            <!-- Indeterminate -->
            <div class="demo-box demo-box--neutral">
              <span class="demo-label" style="margin-block-end: var(--spacing-8);">Indeterminate State (Omitted Value with Shimmer Animation)</span>
              <progress class="progress">Loading...</progress>
            </div>

            <!-- High Contrast Mode -->
            <div class="demo-box demo-box--neutral">
              <span class="demo-label" style="margin-block-end: var(--spacing-8);">High Contrast Mode (@media (prefers-contrast: more))</span>
              <progress class="progress" value="50" max="100" style="outline: 1px solid currentColor; outline-offset: 1px;">50%</progress>
            </div>

          </div>
        </div>
      </div>
    `;
  },
};

/**
 * 5. Sizes & Density (Small 4px, Default 8px, Large 16px)
 */
export const SizesAndDensity: Story = {
  render: () => {
    return `
      <div class="demo-stage demo-stage--lg demo-stage--card">
        <div class="demo-constrained--md" style="margin-inline: auto;">
          <div class="stack" style="gap: var(--spacing-24);">
            
            <!-- Small -->
            <div class="field">
              <div class="field__header">
                <label for="prog-sz-sm" class="field__label">Compact (4px / .progress--sm)</label>
                <span class="field__result">35%</span>
              </div>
              <progress id="prog-sz-sm" class="progress progress--sm" value="35" max="100">35%</progress>
            </div>

            <!-- Default -->
            <div class="field">
              <div class="field__header">
                <label for="prog-sz-md" class="field__label">Standard (8px / Default)</label>
                <span class="field__result">65%</span>
              </div>
              <progress id="prog-sz-md" class="progress" value="65" max="100">65%</progress>
            </div>

            <!-- Large -->
            <div class="field">
              <div class="field__header">
                <label for="prog-sz-lg" class="field__label">Large (16px / .progress--lg)</label>
                <span class="field__result">85%</span>
              </div>
              <progress id="prog-sz-lg" class="progress progress--lg" value="85" max="100">85%</progress>
            </div>

          </div>
        </div>
      </div>
    `;
  },
};

/**
 * 6. Real World Recipes (File Upload Card, Form Step Tracker & Batch Exporter)
 */
export const RealWorldRecipes: Story = {
  render: () => {
    return `
      <div class="demo-stage demo-stage--lg demo-stage--card">
        <div class="demo-title-group" style="margin-block-end: var(--spacing-24); text-align: center;">
          <h4 class="demo-heading">Real-World Production Recipes</h4>
          <p class="demo-desc">High-frequency progress patterns across administrative interfaces.</p>
        </div>

        <div class="demo-constrained--md" style="margin-inline: auto;">
          <div class="stack" style="gap: var(--spacing-24);">
            
            <!-- Recipe 1: File Upload Task Card -->
            <div class="card card--compact card--bordered">
              <article class="card__content">
                <header class="card__header" style="justify-content: space-between;">
                  <div class="cluster" style="align-items: center; gap: var(--spacing-8);">
                    <svg class="icon" width="24" height="24" aria-hidden="true"><use href="#Download"/></svg>
                    <h4 class="card__title small-heading">design-system-tokens.zip</h4>
                  </div>
                  <span class="field__result" style="font-weight: 700;">84%</span>
                </header>
                <div class="card__body">
                  <progress class="progress" value="84" max="100">84%</progress>
                  <div class="cluster" style="justify-content: space-between; margin-block-start: var(--spacing-8);">
                    <span class="micro-text" style="color: var(--foreground-muted);">4.2 MB of 5.0 MB (1.2 MB/s)</span>
                    <button type="button" class="button button--subtle button--sm" style="padding: 0; min-block-size: unset;">
                      <span>Cancel</span>
                    </button>
                  </div>
                </div>
              </article>
            </div>

            <!-- Recipe 2: Multi-Step Setup Wizard Stepper -->
            <div class="demo-box demo-box--neutral">
              <div class="cluster" style="justify-content: space-between; align-items: center; margin-block-end: var(--spacing-8);">
                <span class="micro-text" style="font-weight: 700;">Onboarding Setup</span>
                <span class="micro-text" style="color: var(--foreground-muted);">Step 3 of 4 (75%)</span>
              </div>
              <progress class="progress progress--sm progress--success" value="75" max="100">75%</progress>
            </div>

            <!-- Recipe 3: Indeterminate Verification Pipeline -->
            <div class="banner banner--info buttons-sm">
              <div class="banner__inner" style="inline-size: 100%;">
                <div class="cluster" style="justify-content: space-between; align-items: center; inline-size: 100%;">
                  <span class="micro-text"><strong>WCAG 2.2 Scan in Progress:</strong> Checking 68 rules...</span>
                  <span class="badge badge--sm badge--round badge--accent"><span>Running</span></span>
                </div>
                <progress class="progress progress--sm" style="margin-block-start: var(--spacing-8);">Scanning...</progress>
              </div>
            </div>

          </div>
        </div>
      </div>
    `;
  },
};
