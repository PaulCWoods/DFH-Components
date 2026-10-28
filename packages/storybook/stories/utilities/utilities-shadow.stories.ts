import type { Meta, StoryObj } from '@storybook/html';

interface ShadowUtilArgs {
  shadowClass: 'none' | 'sm' | 'md' | 'lg' | 'inner';
  lightVariant: boolean;
  colorModifier: 'none' | 'accent' | 'aqua' | 'danger' | 'success' | 'warning';
}

const meta: Meta<ShadowUtilArgs> = {
  title: 'Utilities/Shadow & Elevation',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
### Developer & Designer Notes: Shadow & Elevation Utilities

The **Shadow & Elevation** utilities provide zero-specificity (\`:where()\`) classes for applying canonical 3-layer depth levels, subtle light resting variations, and contextual color tint modifiers.

Designed in strict adherence to **WCAG 2.2 Level AA / AAA** standards:
- **1.4.11 Non-Text Contrast:** Subtle diffusion layers delineate container boundaries without solid strokes.
- **Forced Colors Mode:** Automatically collapses to \`none\` in Windows High Contrast / Forced Colors mode.
- **Unstyled Fallback Resilience:** When tokens are missing or fail to load, utilities fall back directly to \`none\`, preserving page readability without broken artifacts.

Defined in \`utilities/shadow.css\` and synchronized with \`_shadow.scss\` in the Design For Humans blog architecture.

---

#### 1. Core Architectural Principles
1. **Zero-Specificity Reset (\`:where()\`)**: Written with 0-0-0 specificity so components and layouts can override them effortlessly without \`!important\`.
2. **Universal Compatibility:** Color tint classes (\`.shadow-accent\`, \`.shadow-aqua\`, \`.shadow-danger\`) set \`--shadow-color\` locally, cascading cleanly through all 3 layers across 100% of browsers including Firefox.
3. **Basic Terminal Fallback:** All utilities fall back cleanly to \`none\` (\`box-shadow: var(--shadow-*, none)\`).

---

#### 2. Canonical Semantic Markup Signatures

\`\`\`html
<!-- 1. Standard Elevated Card with Medium Elevation -->
<div class="card shadow-md bd-sm rounded-md padding">
  <h3 class="card__title subheading">Elevated Surface</h3>
  <p class="small-text text-muted">Uses .shadow-md with clean fallback to none</p>
</div>

<!-- 2. Resting Card with Subtle Light Elevation -->
<div class="card shadow-sm-light bd-sm rounded-md padding">
  <h3 class="card__title subheading">Subtle Light Card</h3>
  <p class="small-text text-muted">Uses .shadow-sm-light</p>
</div>

<!-- 3. Tinted Brand Glow via Contextual Utility -->
<div class="card shadow-md shadow-aqua bd-sm rounded-md padding">
  <h3 class="card__title text-accent">Active Aqua Telemetry</h3>
  <p class="small-text text-muted">Combines .shadow-md and .shadow-aqua</p>
</div>

<!-- 4. Danger Alert Dialog Shadow -->
<dialog class="dialog shadow-lg shadow-danger">
  <div class="card padding">
    <h4>Critical Error</h4>
  </div>
</dialog>
\`\`\`

---

#### 3. Class Mapping Reference

| Utility Class | Alias | Token Reference | Fallback | Intended Use |
| :--- | :--- | :--- | :--- | :--- |
| \`.shadow-none\` | \`.shadow-0\`, \`.no-shadow\` | \`var(--shadow-none)\` | \`none\` | Flat resting surface, reset |
| \`.shadow-sm\` | — | \`var(--shadow-sm)\` | \`none\` | Resting cards, buttons, badges |
| \`.shadow-md\` | \`.shadow\` | \`var(--shadow-md)\` | \`none\` | Elevated cards, dropdowns, popovers |
| \`.shadow-lg\` | \`.shadow-raised\` | \`var(--shadow-lg)\` | \`none\` | Floating dialogs, drawers, toasts |
| \`.shadow-inner\` | \`.shadow-inset\` | \`var(--shadow-inner)\` | \`none\` | Inset wells, pressed states |
| \`.shadow-sm-light\` | — | \`var(--shadow-sm-light)\` | \`none\` | Subtle resting card elevation |
| \`.shadow-md-light\` | \`.shadow-light\` | \`var(--shadow-md-light)\` | \`none\` | Subtle floating card elevation |
| \`.shadow-lg-light\` | — | \`var(--shadow-lg-light)\` | \`none\` | Subtle dialog elevation |
| \`.shadow-inner-light\`| \`.shadow-inset-light\` | \`var(--shadow-inner-light)\`| \`none\` | Subtle inset well |
| \`.shadow-accent\` | — | \`--shadow-color: purple\` | — | Contextual brand purple tint |
| \`.shadow-aqua\` | \`.shadow-teal\` | \`--shadow-color: aqua\` | — | Contextual brand aqua tint |
| \`.shadow-danger\` | \`.shadow-red\` | \`--shadow-color: red\` | — | Contextual error red tint |
| \`.shadow-success\` | \`.shadow-green\` | \`--shadow-color: green\` | — | Contextual verified green tint |
| \`.shadow-warning\` | \`.shadow-amber\` | \`--shadow-color: amber\` | — | Contextual warning amber tint |
`,
      },
    },
  },
  argTypes: {
    shadowClass: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'inner'],
      description: 'Elevation class',
    },
    lightVariant: {
      control: 'boolean',
      description: 'Use light elevation variant (-light)',
    },
    colorModifier: {
      control: 'select',
      options: ['none', 'accent', 'aqua', 'danger', 'success', 'warning'],
      description: 'Contextual color modifier class',
    },
  },
  args: {
    shadowClass: 'md',
    lightVariant: false,
    colorModifier: 'none',
  },
};

export default meta;
type Story = StoryObj<ShadowUtilArgs>;

/**
 * 1. Canonical Elevations (.shadow-sm, .shadow-md, .shadow-lg, .shadow-inner)
 */
export const CanonicalUtilities: Story = {
  render: () => `
    <div class="grid" style="--grid-min-col: 14rem; gap: var(--spacing-24);">
      <article class="card bd-sm padding shadow-none">
        <h4 class="card__title small-heading">.shadow-none</h4>
        <p class="small-text text-muted">Flat surface on canvas</p>
      </article>

      <article class="card bd-sm padding shadow-sm">
        <h4 class="card__title small-heading">.shadow-sm</h4>
        <p class="small-text text-muted">Resting container depth</p>
      </article>

      <article class="card bd-sm padding shadow-md">
        <h4 class="card__title small-heading">.shadow-md</h4>
        <p class="small-text text-muted">Medium elevated depth (.shadow)</p>
      </article>

      <article class="card bd-sm padding shadow-lg">
        <h4 class="card__title small-heading">.shadow-lg</h4>
        <p class="small-text text-muted">High floating depth (.shadow-raised)</p>
      </article>

      <article class="card bd-sm padding shadow-inner" style="background: var(--surface-muted);">
        <h4 class="card__title small-heading">.shadow-inner</h4>
        <p class="small-text text-muted">Recessed well depth (.shadow-inset)</p>
      </article>
    </div>
  `,
};

/**
 * 2. Light Elevation Variants (.shadow-*-light)
 */
export const LightUtilities: Story = {
  render: () => `
    <div class="grid" style="--grid-min-col: 14rem; gap: var(--spacing-24);">
      <article class="card bd-sm padding shadow-sm-light">
        <h4 class="card__title small-heading">.shadow-sm-light</h4>
        <p class="small-text text-muted">Gentle resting card depth</p>
      </article>

      <article class="card bd-sm padding shadow-md-light">
        <h4 class="card__title small-heading">.shadow-md-light</h4>
        <p class="small-text text-muted">Gentle popover depth (.shadow-light)</p>
      </article>

      <article class="card bd-sm padding shadow-lg-light">
        <h4 class="card__title small-heading">.shadow-lg-light</h4>
        <p class="small-text text-muted">Gentle dialog depth</p>
      </article>

      <article class="card bd-sm padding shadow-inner-light" style="background: var(--surface-muted);">
        <h4 class="card__title small-heading">.shadow-inner-light</h4>
        <p class="small-text text-muted">Gentle recessed well depth</p>
      </article>
    </div>
  `,
};

/**
 * 3. Tinted Color Modifiers (.shadow-aqua, .shadow-accent, .shadow-danger, etc.)
 */
export const TintedUtilities: Story = {
  render: () => `
    <div class="grid" style="--grid-min-col: 14rem; gap: var(--spacing-24);">
      <article class="card bd-sm padding shadow-md shadow-aqua" style="border-color: var(--color-aqua-500);">
        <h4 class="card__title text-accent">.shadow-aqua</h4>
        <p class="small-text text-muted"><code>.shadow-md.shadow-aqua</code></p>
      </article>

      <article class="card bd-sm padding shadow-md shadow-accent" style="border-color: var(--color-purple-500);">
        <h4 class="card__title" style="color: var(--color-purple-500);">.shadow-accent</h4>
        <p class="small-text text-muted"><code>.shadow-md.shadow-accent</code></p>
      </article>

      <article class="card bd-sm padding shadow-lg shadow-danger" style="border-color: var(--color-red-500);">
        <h4 class="card__title text-danger">.shadow-danger</h4>
        <p class="small-text text-muted"><code>.shadow-lg.shadow-danger</code></p>
      </article>

      <article class="card bd-sm padding shadow-md shadow-success" style="border-color: var(--color-green-500);">
        <h4 class="card__title text-success">.shadow-success</h4>
        <p class="small-text text-muted"><code>.shadow-md.shadow-success</code></p>
      </article>

      <article class="card bd-sm padding shadow-inner shadow-warning" style="background: var(--surface-muted); border-color: var(--color-amber-500);">
        <h4 class="card__title text-warning">.shadow-warning</h4>
        <p class="small-text text-muted"><code>.shadow-inner.shadow-warning</code></p>
      </article>
    </div>
  `,
};

/**
 * 4. Interactive Shadow Utility Playground
 */
export const Playground: Story = {
  render: (args) => {
    let classes = 'card bd-sm rounded-md padding';

    if (args.shadowClass !== 'none') {
      const suffix = args.lightVariant ? '-light' : '';
      classes += ` shadow-${args.shadowClass}${suffix}`;
    }

    if (args.colorModifier !== 'none') {
      classes += ` shadow-${args.colorModifier}`;
    }

    return `
      <div style="display: flex; justify-content: center; padding-block: var(--spacing-32); background: var(--surface-muted);">
        <article class="${classes}" style="inline-size: 24rem;">
          <header class="card__header">
            <h3 class="card__title subheading">Shadow Sandbox</h3>
          </header>
          <div class="card__body">
            <p><strong>Classes Applied:</strong></p>
            <p><code>.${classes.replace(/ /g, ' .')}</code></p>
          </div>
        </article>
      </div>
    `;
  },
};
