import type { Meta, StoryObj } from '@storybook/html';

interface MeterArgs {
  value: number;
  min: number;
  max: number;
  low: number;
  high: number;
  optimum: number;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
}

const meta: Meta<MeterArgs> = {
  title: 'Atoms/Meter',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
### Developer & Designer Notes: Meter Primitive

The **Meter** primitive styles scalar measurements within a known range leveraging the native HTML5 \`<meter>\` element.
Unlike \`<progress>\` (which measures task completion, e.g. downloads and uploads), \`<meter>\` represents **gauges and scalar quantities** (e.g. storage utilization, CPU load, quota consumption, battery level, audio decibels).

Features full cross-engine normalization across WebKit, Blink, and Gecko, automated color shifts based on the \`optimum\` target, and strict **WCAG 2.2 AA / AAA** compliance.

---

#### 1. Canonical Semantic Markup Signatures
AI agents and developers MUST strictly use the following semantic patterns:

\`\`\`html
<!-- 1. Scalar Measurement Meter (with Explicit Optimal Zone) -->
<div class="field">
  <div class="field__header">
    <label for="disk-meter" class="field__label">Storage Capacity</label>
    <span class="field__result" id="disk-readout">72 GB of 100 GB</span>
  </div>
  <meter 
    id="disk-meter" 
    class="meter" 
    value="72" 
    min="0" 
    max="100" 
    low="60" 
    high="85" 
    optimum="20"
    aria-describedby="disk-readout"
  >
    72 GB / 100 GB
  </meter>
</div>

<!-- 2. Sizing Modifiers (.meter--sm: 4px, .meter--lg: 16px) -->
<meter class="meter meter--sm" value="30" min="0" max="100" optimum="10">30%</meter>
<meter class="meter" value="50" min="0" max="100" optimum="10">50%</meter>
<meter class="meter meter--lg" value="80" min="0" max="100" optimum="10">80%</meter>

<!-- 3. Explicit Semantic Overrides (.meter--success, .meter--warning, .meter--danger) -->
<meter class="meter meter--success" value="85" min="0" max="100">85%</meter>
<meter class="meter meter--warning" value="60" min="0" max="100">60%</meter>
<meter class="meter meter--danger" value="95" min="0" max="100">95%</meter>
\`\`\`

---

#### 2. WCAG 2.2 Conformance Matrix

| Criterion | Level | Implementation Strategy |
| :--- | :---: | :--- |
| **4.1.2 Name, Role, Value** | **A** | Native HTML5 \`<meter>\` communicates \`role="meter"\`, min, max, and scalar value directly to screen readers. |
| **1.3.1 Info & Relationships** | **A** | Associated via \`<label for="...">\` with an accessible text readout via \`aria-describedby\`. |
| **1.4.11 Non-Text Contrast** | **AA** | Active gauge fills maintain >= 3:1 graphical boundaries against the unfilled track and container surfaces. |
| **Cross-Engine Normalization** | **Standard** | Normalized across WebKit (\`::-webkit-meter-*\`) and Gecko (\`::-moz-meter-*\` and pseudo-classes). |

---

#### 3. CSS Custom Property Contract Table

| Custom Property | Fallback | Intended Purpose |
| :--- | :--- | :--- |
| \`--meter-height\` | \`var(--spacing-8, 0.5rem)\` | Default gauge bar thickness (8px) |
| \`--meter-sm-height\` | \`var(--spacing-4, 0.25rem)\` | Small gauge bar thickness (4px) |
| \`--meter-lg-height\` | \`var(--spacing-16, 1rem)\` | Large gauge bar thickness (16px) |
| \`--meter-track-bg\` | \`var(--surface-muted, #E6E4DF)\` | Unfilled track background fill |
| \`--meter-optimum-bg\` | \`var(--foreground-success, #2e7d32)\` | Color when value is within optimal range |
| \`--meter-suboptimum-bg\` | \`var(--foreground-warning, #ed6c02)\` | Color when value is in sub-optimal warning range |
| \`--meter-critical-bg\` | \`var(--foreground-danger, #d32f2f)\` | Color when value reaches critical threshold |
| \`--meter-radius\` | \`var(--radius, 0.25rem)\` | Outer track corner rounding |
`,
      },
    },
  },
  args: {
    value: 40,
    min: 0,
    max: 100,
    low: 30,
    high: 80,
    optimum: 15,
    size: 'md',
    label: 'Disk Storage Usage',
  },
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    min: { control: 'number' },
    max: { control: 'number' },
    low: { control: 'number' },
    high: { control: 'number' },
    optimum: { control: 'number' },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Thickness sizing tier',
    },
    label: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<MeterArgs>;

/**
 * 1. Playground (Interactive Sandbox)
 */
export const Playground: Story = {
  render: (args) => {
    const sizeClass = args.size && args.size !== 'md' ? `meter--${args.size}` : '';
    const classes = ['meter', sizeClass].filter(Boolean).join(' ');

    return `
      <div class="demo-stage demo-stage--lg demo-stage--card">
        <div class="field demo-constrained--md" style="margin-inline: auto;">
          <div class="field__header">
            <label for="meter-pg-demo" class="field__label">${args.label || 'Scalar Value'}</label>
            <span class="field__result" id="meter-val-text">${args.value} of ${args.max}</span>
          </div>
          <meter 
            id="meter-pg-demo" 
            class="${classes}"
            value="${args.value}" 
            min="${args.min}" 
            max="${args.max}" 
            low="${args.low}" 
            high="${args.high}" 
            optimum="${args.optimum}"
            aria-describedby="meter-val-text"
          >
            ${args.value} / ${args.max}
          </meter>
        </div>
      </div>
    `;
  },
};

/**
 * 2. Anatomy (Exploded View of Low, High & Optimum Thresholds)
 */
export const Anatomy: Story = {
  render: () => {
    return `
      <div class="demo-stage demo-stage--lg demo-stage--card">
        <div class="demo-title-group" style="margin-block-end: var(--spacing-16);">
          <h4 class="demo-heading">Meter Anatomy & Semantic Threshold Engine</h4>
          <p class="demo-desc">
            The browser engine compares <code>value</code> against <code>low</code>, <code>high</code>, and <code>optimum</code>
            to dynamically determine whether the measurement is in an optimum, sub-optimum, or critical state.
          </p>
        </div>

        <div class="stack" style="gap: var(--spacing-24);">
          <div class="cluster" style="align-items: flex-start; gap: var(--spacing-24);">
            <!-- Optimum Spec -->
            <div class="demo-box demo-box--green demo-constrained--xs">
              <span class="demo-label">1. Optimum Zone</span>
              <p class="micro-text" style="margin-block: var(--spacing-4);">
                Value aligns with the <code>optimum</code> attribute. Renders via <code>--meter-optimum-bg</code> (Green).
              </p>
              <div style="background-color: var(--foreground-success); block-size: 8px; border-radius: var(--radius-sm); margin-block-start: var(--spacing-8);"></div>
            </div>

            <!-- Suboptimum Spec -->
            <div class="demo-box demo-box--yellow demo-constrained--xs">
              <span class="demo-label">2. Suboptimum Zone</span>
              <p class="micro-text" style="margin-block: var(--spacing-4);">
                Value is one step away from optimum. Renders via <code>--meter-suboptimum-bg</code> (Amber).
              </p>
              <div style="background-color: var(--foreground-warning); block-size: 8px; border-radius: var(--radius-sm); margin-block-start: var(--spacing-8);"></div>
            </div>

            <!-- Critical Spec -->
            <div class="demo-box demo-box--pink demo-constrained--xs">
              <span class="demo-label">3. Critical Zone</span>
              <p class="micro-text" style="margin-block: var(--spacing-4);">
                Value crosses opposite boundary threshold. Renders via <code>--meter-critical-bg</code> (Red).
              </p>
              <div style="background-color: var(--foreground-danger); block-size: 8px; border-radius: var(--radius-sm); margin-block-start: var(--spacing-8);"></div>
            </div>
          </div>
        </div>
      </div>
    `;
  },
};

/**
 * 3. Variants (Optimum, Warning & Critical Zones)
 */
export const Variants: Story = {
  render: () => {
    return `
      <div class="demo-stage demo-stage--lg demo-stage--card">
        <div class="demo-constrained--md" style="margin-inline: auto;">
          <div class="stack" style="gap: var(--spacing-24);">
            
            <!-- Safe / Optimum -->
            <div class="field">
              <div class="field__header">
                <label for="m-var-opt" class="field__label">Optimum Zone (Safe CPU Load)</label>
                <span class="field__result" style="color: var(--foreground-success); font-weight: 700;">25%</span>
              </div>
              <meter id="m-var-opt" class="meter" value="25" min="0" max="100" low="50" high="80" optimum="20">25%</meter>
            </div>

            <!-- Suboptimum Warning -->
            <div class="field">
              <div class="field__header">
                <label for="m-var-warn" class="field__label">Sub-optimum Zone (Warning Quota)</label>
                <span class="field__result" style="color: var(--foreground-warning); font-weight: 700;">72%</span>
              </div>
              <meter id="m-var-warn" class="meter" value="72" min="0" max="100" low="50" high="80" optimum="20">72%</meter>
            </div>

            <!-- Critical Danger -->
            <div class="field">
              <div class="field__header">
                <label for="m-var-crit" class="field__label">Critical Zone (Out of Storage)</label>
                <span class="field__result" style="color: var(--foreground-danger); font-weight: 700;">94%</span>
              </div>
              <meter id="m-var-crit" class="meter" value="94" min="0" max="100" low="50" high="80" optimum="20">94%</meter>
            </div>

            <!-- Explicit Class Overrides -->
            <div class="field">
              <div class="field__header">
                <label for="m-var-exp" class="field__label">Explicit Override (.meter--danger)</label>
                <span class="field__result" style="color: var(--foreground-danger); font-weight: 700;">Override Active</span>
              </div>
              <meter id="m-var-exp" class="meter meter--danger" value="40" min="0" max="100">40%</meter>
            </div>

          </div>
        </div>
      </div>
    `;
  },
};

/**
 * 4. State Matrix (Optimum, Sub-optimum, Critical & High-Contrast)
 */
export const StateMatrix: Story = {
  render: () => {
    return `
      <div class="demo-stage demo-stage--lg demo-stage--card">
        <div class="demo-title-group" style="margin-block-end: var(--spacing-16);">
          <h4 class="demo-heading">State & Contrast Matrix</h4>
          <p class="demo-desc">Cross-engine verification of threshold coloration and forced-colors outlines.</p>
        </div>

        <div class="demo-constrained--md" style="margin-inline: auto;">
          <div class="stack" style="gap: var(--spacing-24);">
            
            <div class="demo-box demo-box--neutral">
              <span class="demo-label" style="margin-block-end: var(--spacing-8);">Optimum Range</span>
              <meter class="meter" value="20" min="0" max="100" low="50" high="80" optimum="10">20%</meter>
            </div>

            <div class="demo-box demo-box--neutral">
              <span class="demo-label" style="margin-block-end: var(--spacing-8);">Sub-optimum Warning Range</span>
              <meter class="meter" value="65" min="0" max="100" low="50" high="80" optimum="10">65%</meter>
            </div>

            <div class="demo-box demo-box--neutral">
              <span class="demo-label" style="margin-block-end: var(--spacing-8);">Critical Threshold Range</span>
              <meter class="meter" value="90" min="0" max="100" low="50" high="80" optimum="10">90%</meter>
            </div>

            <div class="demo-box demo-box--neutral">
              <span class="demo-label" style="margin-block-end: var(--spacing-8);">High Contrast Mode (@media (prefers-contrast: more))</span>
              <meter class="meter" value="50" min="0" max="100" style="outline: 1px solid currentColor; outline-offset: 1px;">50%</meter>
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
                <label for="meter-sz-sm" class="field__label">Compact (4px / .meter--sm)</label>
                <span class="field__result">30%</span>
              </div>
              <meter id="meter-sz-sm" class="meter meter--sm" value="30" min="0" max="100" optimum="10">30%</meter>
            </div>

            <!-- Default -->
            <div class="field">
              <div class="field__header">
                <label for="meter-sz-md" class="field__label">Standard (8px / Default)</label>
                <span class="field__result">60%</span>
              </div>
              <meter id="meter-sz-md" class="meter" value="60" min="0" max="100" optimum="10">60%</meter>
            </div>

            <!-- Large -->
            <div class="field">
              <div class="field__header">
                <label for="meter-sz-lg" class="field__label">Large (16px / .meter--lg)</label>
                <span class="field__result">85%</span>
              </div>
              <meter id="meter-sz-lg" class="meter meter--lg" value="85" min="0" max="100" optimum="10">85%</meter>
            </div>

          </div>
        </div>
      </div>
    `;
  },
};

/**
 * 6. Real World Recipes (Storage Quota, Password Strength & Server Load)
 */
export const RealWorldRecipes: Story = {
  render: () => {
    return `
      <div class="demo-stage demo-stage--lg demo-stage--card">
        <div class="demo-title-group" style="margin-block-end: var(--spacing-24); text-align: center;">
          <h4 class="demo-heading">Real-World Production Recipes</h4>
          <p class="demo-desc">Scalar monitoring across dashboards, account settings, and security forms.</p>
        </div>

        <div class="demo-constrained--md" style="margin-inline: auto;">
          <div class="stack" style="gap: var(--spacing-24);">
            
            <!-- Recipe 1: Cloud Storage Quota Card -->
            <div class="card card--compact card--bordered">
              <article class="card__content">
                <header class="card__header" style="justify-content: space-between;">
                  <h4 class="card__title small-heading">Cloud Workspace Storage</h4>
                  <span class="badge badge--sm badge--warning"><span>72% Used</span></span>
                </header>
                <div class="card__body">
                  <meter class="meter" value="72" min="0" max="100" low="60" high="85" optimum="20">72%</meter>
                  <div class="cluster" style="justify-content: space-between; margin-block-start: var(--spacing-8);">
                    <span class="micro-text" style="color: var(--foreground-muted);">72.4 GB of 100 GB consumed</span>
                    <a href="#upgrade" class="link micro-text"><span>Upgrade Quota</span></a>
                  </div>
                </div>
              </article>
            </div>

            <!-- Recipe 2: Password Complexity Indicator -->
            <div class="field">
              <label for="pwd-input" class="field__label">Account Password</label>
              <input id="pwd-input" type="password" class="input" value="SecureP@ssw0rd!2026" />
              <div class="field__header" style="margin-block-start: var(--spacing-4);">
                <span class="field__hint">Strength: Strong (14+ characters, special symbols)</span>
                <span class="field__result" style="color: var(--foreground-success); font-weight: 700;">Optimal</span>
              </div>
              <meter class="meter meter--sm" value="95" min="0" max="100" low="40" high="70" optimum="90">95%</meter>
            </div>

            <!-- Recipe 3: Cluster Health Gauge -->
            <div class="demo-box demo-box--neutral">
              <div class="cluster" style="justify-content: space-between; align-items: center; margin-block-end: var(--spacing-8);">
                <div class="cluster" style="gap: var(--spacing-8); align-items: center;">
                  <span class="status" data-status="busy"></span>
                  <span class="micro-text" style="font-weight: 700;">Cluster Worker Node 04</span>
                </div>
                <span class="micro-text" style="color: var(--foreground-danger); font-weight: 700;">91% Utilization</span>
              </div>
              <meter class="meter" value="91" min="0" max="100" low="50" high="80" optimum="20">91%</meter>
            </div>

          </div>
        </div>
      </div>
    `;
  },
};
