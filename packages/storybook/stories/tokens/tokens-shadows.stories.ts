import type { Meta, StoryObj } from '@storybook/html';

interface ShadowArgs {
  elevation: 'none' | 'sm' | 'md' | 'lg' | 'inner';
  variant: 'default' | 'light' | 'custom-purple' | 'custom-rose';
  surface: 'card' | 'base' | 'muted';
}

const meta: Meta<ShadowArgs> = {
  title: 'Tokens/Elevation & Shadows',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Design For Humans implements an ergonomic, token-driven shadow architecture combining **3-layer Gaussian blur stacks**, native **CSS Values and Units Level 5 \`@function\`**, and **100% backward-compatible variable composition**.

Designed in full compliance with **WCAG 2.2 Level AA / AAA** standards:
- **1.4.11 Non-Text Contrast:** Multi-layer shadows provide depth and container boundary definition without requiring heavy solid borders on light and dark canvases.
- **Forced Colors Mode:** In high-contrast or Windows High Contrast mode, shadows collapse cleanly to 0, ensuring no synthetic silhouettes obscure high-contrast content.

Defined across \`tokens/2-semantic.json\` and compiled via \`packages/theme-engine/bin/build-tokens.js\` into \`packages/css/src/variables.css\`.

---

#### 1. Core Architectural Principles
1. **3-Layer Depth Stacks:** Rather than a single harsh drop shadow, each elevation uses 3 stacked layers (key shadow, ambient fill, and perimeter outline) for natural light diffusion.
2. **Decomposed Layer Variables (\`--_shadow-*-layer-[1..3]\`):** Geometric dimensions (\`x\`, \`y\`, \`blur\`, \`spread\`) are isolated from color tinting.
3. **CSS Level 5 \`@function\` Recolorability:** Custom parameterized functions (\`--shadow-sm(--color)\`, \`--shadow-md(--color)\`, \`--shadow-lg(--color)\`, \`--shadow-inner(--color)\`) eliminate the need to duplicate 3-layer CSS values when adding brand color tints.
4. **Contextual Override Fallback:** For browsers that do not yet support \`@function\`, local declaration of \`--shadow-color: [any-color]\` dynamically cascades into \`var(--shadow-md)\` via CSS custom property inheritance.

---

#### 2. Canonical Usage Signatures

\`\`\`css
/* 1. Canonical Semantic Shadow Tokens */
.my-card {
  box-shadow: var(--shadow-sm);
}
.my-popover {
  box-shadow: var(--shadow-md);
}
.my-modal {
  box-shadow: var(--shadow-lg);
}
.my-well {
  box-shadow: var(--shadow-inner);
}

/* 2. Light Tint Variants */
.my-subtle-card {
  box-shadow: var(--shadow-sm-light);
}

/* 3. Universal Fallback via Contextual Variable (100% Browser Support) */
.card--brand-fallback {
  --shadow-color: color-mix(in srgb, var(--color-purple-700), transparent 75%);
  box-shadow: var(--shadow-md);
}

/* 4. Modern CSS @function Recolor with Firefox Safe Fallback */
.card--brand {
  --shadow-color: color-mix(in srgb, var(--color-purple-500), transparent 70%);
  box-shadow: var(--shadow-md); /* Firefox & Older Engines */
  box-shadow: --shadow-md(color-mix(in srgb, var(--color-purple-500), transparent 70%)); /* Modern */
}
\`\`\`

---

#### 3. Cross-Browser Resilience & Firefox Support (@supports)
**Firefox & Pre-Specification Engines:** Mozilla Firefox does not yet support the CSS Values and Units Level 5 \`@function\` at-rule. Without a fallback declaration, writing \`box-shadow: --shadow-md(...)\` causes Firefox to discard the entire property as an invalid value.

To protect against invisible shadows in Firefox, either:
1. Declare \`box-shadow: var(--shadow-md)\` immediately before the \`@function\` call, OR
2. Wrap custom \`@function\` invocations in \`@supports at-rule(@function) { ... }\`, OR
3. Use the contextual variable pattern (\`--shadow-color: ...; box-shadow: var(--shadow-md);\`), which works universally on every modern engine.
`,
      },
    },
  },
  argTypes: {
    elevation: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'inner'],
      description: 'Elevation depth preset',
    },
    variant: {
      control: 'select',
      options: ['default', 'light', 'custom-purple', 'custom-rose'],
      description: 'Shadow color tint variant or @function parameter',
    },
    surface: {
      control: 'select',
      options: ['card', 'base', 'muted'],
      description: 'Background surface for depth evaluation',
    },
  },
  args: {
    elevation: 'md',
    variant: 'default',
    surface: 'card',
  },
};

export default meta;
type Story = StoryObj<ShadowArgs>;

/**
 * 1. Canonical Elevations (sm, md, lg, inner)
 * Displays the core 3-layer resting and elevated depth levels.
 */
export const CanonicalElevations: Story = {
  render: () => `
    <div class="grid" style="--grid-min-col: 15rem; gap: var(--spacing-24);">
      <article class="card p-md" style="box-shadow: var(--shadow-none);">
        <h4 class="card__title small-heading">None (Flat)</h4>
        <p class="small-text text-muted"><code>var(--shadow-none)</code></p>
        <p class="small-text">Resting on canvas with zero elevation projection.</p>
      </article>

      <article class="card p-md" style="box-shadow: var(--shadow-sm);">
        <h4 class="card__title small-heading">Small (sm)</h4>
        <p class="small-text text-muted"><code>var(--shadow-sm)</code></p>
        <p class="small-text">Subtle resting cards, interactive buttons, and badges.</p>
      </article>

      <article class="card p-md" style="box-shadow: var(--shadow-md);">
        <h4 class="card__title small-heading">Medium (md)</h4>
        <p class="small-text text-muted"><code>var(--shadow-md)</code></p>
        <p class="small-text">Elevated cards, popovers, dropdown menus, and hover states.</p>
      </article>

      <article class="card p-md" style="box-shadow: var(--shadow-lg);">
        <h4 class="card__title small-heading">Large (lg)</h4>
        <p class="small-text text-muted"><code>var(--shadow-lg)</code></p>
        <p class="small-text">Modal dialogs, command palettes, notifications, and flyouts.</p>
      </article>

      <article class="card p-md" style="box-shadow: var(--shadow-inner); background: var(--surface-muted);">
        <h4 class="card__title small-heading">Inner (Inset)</h4>
        <p class="small-text text-muted"><code>var(--shadow-inner)</code></p>
        <p class="small-text">Recessed wells, form inputs, pressed buttons, and scroll tracks.</p>
      </article>
    </div>
  `,
};

/**
 * 2. Light Elevation Variants (sm-light, md-light, lg-light, inner-light)
 * Displays low-opacity elevation shadows ideal for whisper-quiet cards on clean surfaces.
 */
export const LightElevations: Story = {
  render: () => `
    <div class="grid" style="--grid-min-col: 15rem; gap: var(--spacing-24);">
      <article class="card p-md" style="box-shadow: var(--shadow-sm-light);">
        <h4 class="card__title small-heading">Small Light</h4>
        <p class="small-text text-muted"><code>var(--shadow-sm-light)</code></p>
        <p class="small-text">Ultra-subtle resting card elevation.</p>
      </article>

      <article class="card p-md" style="box-shadow: var(--shadow-md-light);">
        <h4 class="card__title small-heading">Medium Light</h4>
        <p class="small-text text-muted"><code>var(--shadow-md-light)</code></p>
        <p class="small-text">Gentle popover and card hover elevation.</p>
      </article>

      <article class="card p-md" style="box-shadow: var(--shadow-lg-light);">
        <h4 class="card__title small-heading">Large Light</h4>
        <p class="small-text text-muted"><code>var(--shadow-lg-light)</code></p>
        <p class="small-text">Quiet floating dialog and flyout elevation.</p>
      </article>

      <article class="card p-md" style="box-shadow: var(--shadow-inner-light); background: var(--surface-muted);">
        <h4 class="card__title small-heading">Inner Light</h4>
        <p class="small-text text-muted"><code>var(--shadow-inner-light)</code></p>
        <p class="small-text">Gentle inset well on muted surfaces.</p>
      </article>
    </div>
  `,
};

/**
 * 3. CSS Level 5 @function Dynamic Recoloring
 * Demonstrates the power of native CSS functions to tint multi-layer shadows inline.
 */
export const FunctionRecoloredShadows: Story = {
  render: () => `
    <div class="grid" style="--grid-min-col: 15rem; gap: var(--spacing-24);">

      <!-- Purple Brand using --shadow-md() -->
      <article class="card p-md" style="--shadow-color: color-mix(in srgb, var(--color-purple-500), transparent 70%); box-shadow: var(--shadow-md); box-shadow: --shadow-md(color-mix(in srgb, var(--color-purple-500), transparent 70%)); border-color: var(--color-purple-500);">
        <h4 class="card__title small-heading">Purple Brand</h4>
        <p class="small-text text-muted"><code>--shadow-md(color-mix(...))</code></p>
        <p class="small-text">Brand hero features, premium tiers, and active highlights.</p>
      </article>

      <!-- Danger Red using --shadow-lg() -->
      <article class="card p-md" style="--shadow-color: color-mix(in srgb, var(--color-red-500), transparent 70%); box-shadow: var(--shadow-lg); box-shadow: --shadow-lg(color-mix(in srgb, var(--color-red-500), transparent 70%)); border-color: var(--color-red-500);">
        <h4 class="card__title small-heading">Red Alert</h4>
        <p class="small-text text-muted"><code>--shadow-lg(color-mix(...))</code></p>
        <p class="small-text">Destructive action modals and critical error alerts.</p>
      </article>

      <!-- Inset Amber using --shadow-inner() -->
      <article class="card p-md" style="--shadow-color: color-mix(in srgb, var(--color-amber-500), transparent 70%); box-shadow: var(--shadow-inner); box-shadow: --shadow-inner(color-mix(in srgb, var(--color-amber-500), transparent 70%)); background: var(--surface-muted); border-color: var(--color-amber-500);">
        <h4 class="card__title small-heading">Amber Inset</h4>
        <p class="small-text text-muted"><code>--shadow-inner(color-mix(...))</code></p>
        <p class="small-text">Warning wells, pending review inputs, and caution meters.</p>
      </article>
    </div>
  `,
};

/**
 * 4. Contextual Override Fallback (Universal Compatibility)
 * Demonstrates how older browsers without @function support inherit local --shadow-color overrides.
 */
export const ContextualColorOverride: Story = {
  render: () => `
    <div class="grid" style="--grid-min-col: 15rem; gap: var(--spacing-24);">
      <article class="card p-md" style="--shadow-color: color-mix(in srgb, var(--color-purple-700), transparent 75%); box-shadow: var(--shadow-md); border-color: var(--color-purple-500);">
        <h4 class="card__title small-heading">Contextual Purple</h4>
        <p class="small-text text-muted"><code>--shadow-color: ...; box-shadow: var(--shadow-md);</code></p>
        <p class="small-text">Inherits locally scoped <code>--shadow-color</code> through all 3 layers seamlessly.</p>
      </article>

    </div>
  `,
};

/**
 * 5. Interactive Elevation Playground
 */
export const Playground: Story = {
  render: (args) => {
    let shadowStyle = `box-shadow: var(--shadow-${args.elevation});`;

    if (args.variant === 'light') {
      shadowStyle = `box-shadow: var(--shadow-${args.elevation}-light);`;
    } else if (args.variant === 'custom-purple') {
      shadowStyle = `--shadow-color: color-mix(in srgb, var(--color-purple-500), transparent 70%); box-shadow: var(--shadow-${args.elevation}); box-shadow: --shadow-${args.elevation}(color-mix(in srgb, var(--color-purple-500), transparent 70%)); border-color: var(--color-purple-500);`;
    } else if (args.variant === 'custom-rose') {
      shadowStyle = `--shadow-color: color-mix(in srgb, var(--color-red-500), transparent 70%); box-shadow: var(--shadow-${args.elevation}); box-shadow: --shadow-${args.elevation}(color-mix(in srgb, var(--color-red-500), transparent 70%)); border-color: var(--color-red-500);`;
    }

    return `
      <div style="display: flex; justify-content: center; padding-block: var(--spacing-32); background: var(--surface-${args.surface});">
        <article class="card p-md" style="inline-size: 24rem; ${shadowStyle}">
          <header class="card__header">
            <h3 class="card__title subheading">Elevation Playground</h3>
          </header>
          <div class="card__body">
            <p><strong>Selected Elevation:</strong> <code>${args.elevation}</code></p>
            <p><strong>Variant:</strong> <code>${args.variant}</code></p>
            <p class="small-text text-muted" style="margin-block-start: var(--spacing-12);">
              Inspect this container in DevTools to verify the 3-layer Gaussian blur diffusion.
            </p>
          </div>
        </article>
      </div>
    `;
  },
};
