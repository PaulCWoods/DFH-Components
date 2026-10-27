import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Atoms/Divider',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# Divider Primitive

Semantic thematic break (\`<hr class="divider">\`) that dynamically adapts between horizontal and vertical orientations via zero-class Container Style Queries (\`@container style(--direction: row)\`), adhering to WCAG 2.2 Level AA / AAA non-text contrast rules.

---

### Canonical Semantic Markup Signatures

#### 1. Horizontal Thematic Break (Default Block Flow)
\`\`\`html
<section>
  <p>First content block.</p>
  <hr class="divider">
  <p>Second content block.</p>
</section>
\`\`\`

#### 2. Vertical Separator (Inside Row Container or Button Group)
\`\`\`html
<div class="button-group" style="--direction: row;">
  <button type="button" class="button"><span>Cut</span></button>
  <button type="button" class="button"><span>Copy</span></button>
  <hr class="divider">
  <button type="button" class="button button--danger"><span>Delete</span></button>
</div>
\`\`\`

---

### WCAG 2.2 Conformance Matrix
| Criterion | Level | Status | Architectural Implementation |
| :--- | :--- | :--- | :--- |
| **1.3.1 Info and Relationships** | A | **Pass** | Semantic HTML5 \`<hr>\` element announces a thematic boundary or paragraph-level transition to screen readers. |
| **1.4.11 Non-Text Contrast** | AA (3:1) | **Pass** | The divider border stroke uses \`var(--rule-color, currentColor)\` meeting >= 3:1 contrast against adjacent surfaces. |
| **Zero-JS Multi-Directional** | Best Practice | **Pass** | Container style query \`@container style(--direction: row)\` converts the divider from horizontal to vertical seamlessly. |
| **High Contrast Mode** | Best Practice | **Pass** | Retains border structure and scales stroke thickness under \`@media (prefers-contrast: more)\`. |

---

### CSS Custom Property Token Contract
| CSS Variable | Default Value | Fallback Ladder | Description |
| :--- | :--- | :--- | :--- |
| \`--divider-border-width\` | \`var(--rule-width, 1px)\` | \`1px\` | Stroke thickness of the divider line |
| \`--divider-border-style\` | \`var(--rule-style, solid)\` | \`solid\` | Line stroke pattern (solid, dashed, dotted) |
| \`--divider-border-color\` | \`var(--rule-color)\` | \`currentColor\` | Separator line stroke color |
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * 1. Playground
 * Interactive sandbox exploring orientation, stroke patterns, and colors.
 */
export const Playground: Story = {
  args: {
    orientation: 'horizontal',
    borderStyle: 'solid',
    borderWidth: '1px',
  },
  argTypes: {
    orientation: {
      name: 'Orientation',
      control: { type: 'inline-radio' },
      options: ['horizontal', 'vertical'],
      description: 'Block-flow horizontal rule vs row-flow vertical rule.',
    },
    borderStyle: {
      name: 'Border Style',
      control: { type: 'select' },
      options: ['solid', 'dashed', 'dotted'],
      description: 'Line stroke texture.',
    },
    borderWidth: {
      name: 'Border Width',
      control: { type: 'select' },
      options: ['1px', '2px', '4px'],
      description: 'Thickness of the divider rule.',
    },
  },
  render: (args) => {
    if (args.orientation === 'vertical') {
      return `
        <div style="max-inline-size: 32rem; margin-inline: auto; padding: var(--spacing-24); border: 1px dashed var(--border-color); border-radius: var(--radius-md);">
          <div style="--direction: row; display: flex; align-items: center; gap: var(--spacing-16); block-size: 3rem;">
            <span>Left Section</span>
            <hr class="divider" style="--divider-border-style: ${args.borderStyle}; --divider-border-width: ${args.borderWidth};">
            <span>Right Section</span>
          </div>
        </div>
      `;
    }

    return `
      <div style="max-inline-size: 36rem; margin-inline: auto; padding: var(--spacing-24); display: flex; flex-direction: column; gap: var(--spacing-16); border: 1px dashed var(--border-color); border-radius: var(--radius-md);">
        <p style="margin: 0;">Preceding paragraph copy representing Section 1.</p>
        <hr class="divider" style="--divider-border-style: ${args.borderStyle}; --divider-border-width: ${args.borderWidth};">
        <p style="margin: 0; color: var(--foreground-muted);">Succeeding paragraph copy representing Section 2.</p>
      </div>
    `;
  },
};

/**
 * 2. Anatomy
 * Exploded breakdown highlighting the semantic hr element, inline-size, and container query attachment.
 */
export const Anatomy: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: var(--spacing-24); max-inline-size: 44rem;">
      <div class="demo-card-callout" style="padding: var(--spacing-16); border: 1px dashed var(--border-color); border-radius: var(--radius-md); background: var(--surface-muted);">
        <p style="margin: 0; font-size: var(--typography-font-size--1); color: var(--foreground-muted);">
          <strong>Structural Breakdown:</strong> <code>&lt;hr class="divider"&gt;</code> has zero default margin and renders <code>border-block-start</code> at 100% inline-width. When wrapped in a container with <code>--direction: row</code>, container style queries automatically switch it to <code>border-inline-start</code> and <code>align-self: stretch</code>.
        </p>
      </div>

      <div style="padding: var(--spacing-24); border: 2px dashed var(--color-accent); border-radius: var(--radius-md);">
        <div style="display: flex; flex-direction: column; gap: var(--spacing-12);">
          <span class="badge badge--sm"><span>Block Context (Horizontal)</span></span>
          <hr class="divider" style="outline: 1px dashed var(--color-success); outline-offset: 2px;">
        </div>

        <div style="margin-block-start: var(--spacing-24); display: flex; flex-direction: column; gap: var(--spacing-12);">
          <span class="badge badge--sm"><span>Row Context (Vertical)</span></span>
          <div style="--direction: row; display: flex; gap: var(--spacing-12); block-size: 2.5rem; align-items: center;">
            <span>Item A</span>
            <hr class="divider" style="outline: 1px dashed var(--color-warning); outline-offset: 2px;">
            <span>Item B</span>
          </div>
        </div>
      </div>
    </div>
  `,
};

/**
 * 3. Variants
 * Visual gallery showcasing solid, dashed, dotted, and colored variants.
 */
export const Variants: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: var(--spacing-32); max-inline-size: 46rem;">
      
      <!-- Variant 1: Solid (Standard) -->
      <div>
        <span style="font-size: var(--typography-font-size--1); color: var(--foreground-muted); display: block; margin-block-end: var(--spacing-8);">
          1. Solid Line (Default)
        </span>
        <hr class="divider">
      </div>

      <!-- Variant 2: Dashed -->
      <div>
        <span style="font-size: var(--typography-font-size--1); color: var(--foreground-muted); display: block; margin-block-end: var(--spacing-8);">
          2. Dashed Texture (--divider-border-style: dashed)
        </span>
        <hr class="divider" style="--divider-border-style: dashed;">
      </div>

      <!-- Variant 3: Dotted -->
      <div>
        <span style="font-size: var(--typography-font-size--1); color: var(--foreground-muted); display: block; margin-block-end: var(--spacing-8);">
          3. Dotted Texture (--divider-border-style: dotted; --divider-border-width: 2px;)
        </span>
        <hr class="divider" style="--divider-border-style: dotted; --divider-border-width: 2px;">
      </div>

      <!-- Variant 4: Accent Colored -->
      <div>
        <span style="font-size: var(--typography-font-size--1); color: var(--foreground-muted); display: block; margin-block-end: var(--spacing-8);">
          4. Accent Brand Color (--divider-border-color: var(--color-accent))
        </span>
        <hr class="divider" style="--divider-border-color: var(--color-accent); --divider-border-width: 2px;">
      </div>

    </div>
  `,
};

/**
 * 4. StateMatrix
 * Covers default surface, inverted theme surface, and high-contrast mode simulations.
 */
export const StateMatrix: Story = {
  render: () => `
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(18rem, 100%), 1fr)); gap: var(--spacing-24); max-inline-size: 52rem;">
      
      <!-- Standard Light Surface -->
      <div class="pd bd rd">
        <span style="font-size: var(--typography-font-size--1); color: var(--foreground-muted); display: block; margin-block-end: var(--spacing-12);">
          Default Canvas Surface
        </span>
        <p style="margin: 0 0 var(--spacing-8);">Section 1</p>
        <hr class="divider">
        <p style="margin: var(--spacing-8) 0 0; color: var(--foreground-muted);">Section 2</p>
      </div>

      <!-- Inverted Dark Surface -->
      <div class="color-palette-inverted" style="padding: var(--spacing-16); border-radius: var(--radius-md);">
        <span style="font-size: var(--typography-font-size--1); opacity: 0.8; display: block; margin-block-end: var(--spacing-12);">
          Inverted Dark Surface
        </span>
        <p style="margin: 0 0 var(--spacing-8);">Dark Section 1</p>
        <hr class="divider">
        <p style="margin: var(--spacing-8) 0 0; opacity: 0.8;">Dark Section 2</p>
      </div>

      <!-- High Contrast Mode Simulation -->
      <div style="padding: var(--spacing-16); border: 2px solid currentColor; border-radius: var(--radius-md);">
        <span style="font-size: var(--typography-font-size--1); color: var(--foreground-muted); display: block; margin-block-end: var(--spacing-12);">
          High-Contrast Mode (2px Reinforced)
        </span>
        <p style="margin: 0 0 var(--spacing-8); font-weight: bold;">Section 1</p>
        <hr class="divider" style="--divider-border-width: 2px; --divider-border-color: currentColor;">
        <p style="margin: var(--spacing-8) 0 0;">Section 2</p>
      </div>

    </div>
  `,
};

/**
 * 5. SizesAndDensity
 * Compares subtle 1px divider with prominent 2px and 4px structural section divisions.
 */
export const SizesAndDensity: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: var(--spacing-24); max-inline-size: 44rem;">
      
      <!-- 1px Subtle -->
      <div>
        <span style="font-size: var(--typography-font-size--1); color: var(--foreground-muted); display: block; margin-block-end: var(--spacing-8);">
          Subtle Compartment (1px)
        </span>
        <hr class="divider" style="--divider-border-width: 1px;">
      </div>

      <!-- 2px Medium -->
      <div>
        <span style="font-size: var(--typography-font-size--1); color: var(--foreground-muted); display: block; margin-block-end: var(--spacing-8);">
          Medium Section Divider (2px)
        </span>
        <hr class="divider" style="--divider-border-width: 2px;">
      </div>

      <!-- 4px Heavy -->
      <div>
        <span style="font-size: var(--typography-font-size--1); color: var(--foreground-muted); display: block; margin-block-end: var(--spacing-8);">
          Heavy Landmark Boundary (4px)
        </span>
        <hr class="divider" style="--divider-border-width: 4px;">
      </div>

    </div>
  `,
};

/**
 * 6. ZeroClassOrchestration
 * Demonstrates zero-JS orientation switching powered by container style queries.
 */
export const ZeroClassOrchestration: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: var(--spacing-24); max-inline-size: 46rem;">
      <div class="demo-card-callout" style="padding: var(--spacing-16); border: 1px dashed var(--border-color); border-radius: var(--radius-md); background: var(--surface-muted);">
        <p style="margin: 0; font-size: var(--typography-font-size--1); color: var(--foreground-muted);">
          <strong>Container Style Queries:</strong> When a parent layout establishes <code>--direction: row</code>, the exact same <code>&lt;hr class="divider"&gt;</code> element automatically morphs into a vertical line stretching the container height without requiring a <code>.divider--vertical</code> modifier class.
        </p>
      </div>

      <div style="--direction: row; display: flex; align-items: center; justify-content: space-around; padding: var(--spacing-16); border: 1px dashed var(--border-color); border-radius: var(--radius-md); block-size: 4rem;">
        <span>Left Metric</span>
        <hr class="divider">
        <span>Middle Metric</span>
        <hr class="divider">
        <span>Right Metric</span>
      </div>
    </div>
  `,
};

/**
 * 7. RealWorldRecipes
 * Production patterns: Editorial Article Break and Toolbar Compartments.
 */
export const RealWorldRecipes: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: var(--spacing-32); max-inline-size: 52rem;">
      
      <!-- Recipe 1: Long-Form Editorial Thematic Break -->
      <section style="display: flex; flex-direction: column; gap: var(--spacing-16);">
        <h4 style="font-size: var(--typography-font-size-1); margin: 0;">
          Recipe 1: Editorial Article Thematic Break
        </h4>
        <div class="card card--bordered" style="padding: var(--spacing-24); display: flex; flex-direction: column; gap: var(--spacing-16);">
          <h3 style="margin: 0;">Design Principles for Humans</h3>
          <p style="margin: 0; line-height: 1.6;">
            Accessibility is the foundation of high-performance web systems. When we prioritize clear semantics and predictable focus indicators, all users benefit.
          </p>
          <hr class="divider">
          <div style="display: flex; justify-content: space-between; align-items: center; font-size: var(--typography-font-size--1); color: var(--foreground-muted);">
            <span>Written by Paul Charles Woods</span>
            <time datetime="2026-10-13">13 October 2026</time>
          </div>
        </div>
      </section>

      <!-- Recipe 2: Toolbar Action Group with Separator -->
      <section style="display: flex; flex-direction: column; gap: var(--spacing-16);">
        <h4 style="font-size: var(--typography-font-size-1); margin: 0;">
          Recipe 2: Action Toolbar with Vertical Divider
        </h4>
        <div class="card card--bordered card--compact" style="padding: var(--spacing-12);">
          <div class="button-group buttons-subtle">
            <button type="button" class="button button--sm"><span>Edit</span></button>
            <button type="button" class="button button--sm"><span>Duplicate</span></button>
            <hr class="divider">
            <button type="button" class="button button--sm button--danger"><span>Delete</span></button>
          </div>
        </div>
      </section>

    </div>
  `,
};
