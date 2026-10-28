import type { Meta, StoryObj } from '@storybook/html';

interface LayoutHelpersArgs {
  dimension: 'none' | 'w-full' | 'h-full';
  position: 'static' | 'position-relative' | 'position-absolute' | 'position-sticky';
  overflow: 'visible' | 'overflow-hidden' | 'overflow-clip' | 'overflow-auto' | 'overflow-x-auto' | 'overflow-y-auto';
  isolate: boolean;
}

const meta: Meta<LayoutHelpersArgs> = {
  title: 'Utilities/Dimension, Position & Overflow',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
### Developer & Designer Notes: Dimension, Positioning & Overflow Utilities

The **Dimension, Positioning & Overflow** utilities provide low-specificity (\`:where()\`) classes for element sizing (\`100%\`, \`100dvh\`), positioning contexts (\`relative\`, \`absolute\`, \`sticky\`), stacking context isolation (\`isolation: isolate\`), and overflow containment.

Defined in \`utilities/layout-helpers.css\`.

---

#### 1. Core Architectural Principles
1. **Modern Dynamic Viewport Units (\`100dvh\`):** \`.min-h-screen\` (\`.min-block-screen\`) leverages \`100dvh\` to dynamically accommodate browser address bar shifts on mobile devices.
2. **\`overflow: clip\` vs \`overflow: hidden\`:** Modern web standards prefer \`overflow: clip\` because it enforces strict clipping **without** turning the element into an active scroll container, saving GPU composite memory.
3. **Stacking Context Isolation (\`.isolate\`):** Uses native CSS \`isolation: isolate\` to create a new stacking context without needing outdated \`position: relative; z-index: 0;\` hacks, preventing internal z-index layers from leaking into the parent DOM.
4. **Zero-Specificity Reset (\`:where()\`)**: Completely unopinionated 0-0-0 specificity classes.

---

#### 2. Canonical Semantic Markup Signatures
AI agents and developers MUST use the following semantic patterns:

\`\`\`html
<!-- 1. Sticky Navigation Header -->
<div class="position-relative card card--bordered" style="block-size: 14rem; overflow-y: auto;">
  <div class="position-sticky" style="top: 0; z-index: 1; background: var(--surface-card);">
    <strong>Sticky Header</strong>
  </div>
  <div class="padding">Scrollable body copy...</div>
</div>

<!-- 2. Accessible Horizontally Scrollable Table Container -->
<div class="card card--bordered overflow-x-auto" tabindex="0" aria-label="Deliverables table" role="region">
  <table class="table">...</table>
</div>

<!-- 3. Stacking Isolation Context -->
<div class="isolate card card--bordered padding">
  <!-- Internal elements with z-index will never leak into outer page stacking -->
</div>
\`\`\`

---

#### 3. Utility Classes Map

| Utility Class | Alias | CSS Rule | Purpose |
| :--- | :--- | :--- | :--- |
| \`.w-full\` | \`.inline-full\` | \`inline-size: 100%\` | Forces full available inline width |
| \`.h-full\` | \`.block-full\` | \`block-size: 100%\` | Forces full available block height |
| \`.min-h-screen\`| \`.min-block-screen\` | \`min-block-size: 100dvh\` | Ensures full dynamic viewport coverage |
| \`.position-relative\` | — | \`position: relative\` | Sets positioning coordinate origin |
| \`.position-sticky\` | — | \`position: sticky\` | In-flow stickiness anchored during scrolling |
| \`.overflow-clip\` | — | \`overflow: clip\` | Modern clipping without scroll container overhead |
| \`.overflow-x-auto\` | — | \`overflow-x: auto\` | Horizontal scroll container for wide tables |
| \`.isolate\` | — | \`isolation: isolate\` | Native CSS stacking context boundary |

---

#### 4. WCAG 2.2 Accessibility Guidelines
- **Keyboard Scrollability (WCAG 2.1.1 Keyboard):** Any element using \`.overflow-x-auto\` or \`.overflow-y-auto\` that contains content unreachable by tab navigation MUST include \`tabindex="0"\` and an accessible label (\`aria-label="Table name"\`) so keyboard-only users can scroll via arrow keys.
- **Focus Not Obscured (WCAG 2.4.11 / 2.4.12 Focus Not Obscured - AA/AAA):** When using \`.position-sticky\`, ensure sticky bars do not permanently hide focused interactive controls during scroll.
        `,
      },
    },
  },
  args: {
    dimension: 'none',
    position: 'position-relative',
    overflow: 'overflow-clip',
    isolate: false,
  },
  argTypes: {
    dimension: {
      control: 'select',
      options: ['none', 'w-full', 'h-full'],
      description: 'Sizing constraint utility',
    },
    position: {
      control: 'select',
      options: ['static', 'position-relative', 'position-absolute', 'position-sticky'],
      description: 'Positioning model',
    },
    overflow: {
      control: 'select',
      options: ['visible', 'overflow-hidden', 'overflow-clip', 'overflow-auto', 'overflow-x-auto', 'overflow-y-auto'],
      description: 'Overflow containment strategy',
    },
    isolate: {
      control: 'boolean',
      description: 'Create a standalone stacking context via isolation: isolate',
    },
  },
};

export default meta;
type Story = StoryObj<LayoutHelpersArgs>;

/**
 * 1. Interactive Playground (Live Sandbox)
 */
export const Playground: Story = {
  render: (args) => {
    const dimClass = args.dimension !== 'none' ? args.dimension : '';
    const posClass = args.position !== 'static' ? args.position : '';
    const overClass = args.overflow !== 'visible' ? args.overflow : '';
    const isolateClass = args.isolate ? 'isolate' : '';

    const classes = ['card', 'card--bordered', 'padding', dimClass, posClass, overClass, isolateClass].filter(Boolean).join(' ');

    return `
      <div class="sb-demo-section wrapper wrapper--md">
        <p class="sb-demo-desc">
          Live Sandbox: Test dimensions, positioning models, overflow clipping, and stacking isolation below.
        </p>
        <div class="sb-demo-stage sb-demo-stage--lg" style="block-size: 14rem; position: relative;">
          <div class="${classes}" style="background: var(--surface-card); max-inline-size: 24rem;">
            <h4 class="font-size-sm font-weight-bold">Active Configuration</h4>
            <p class="font-size-xs text-muted margin-top-xs">
              Position: <code>${args.position}</code> &middot; Overflow: <code>${args.overflow}</code> &middot; Isolate: <code>${args.isolate}</code>
            </p>
          </div>
        </div>
      </div>
    `;
  },
};

/**
 * 2. Sticky Positioning in Scrollable Viewport (.position-sticky)
 */
export const StickyPositioning: Story = {
  render: () => `
    <div class="sb-demo-group wrapper wrapper--md">
      <div class="sb-demo-section">
        <h3 class="sb-demo-heading">Sticky Header in Scrollable Container</h3>
        <p class="sb-demo-desc">
          Scroll inside this bounded card to observe the header anchor gracefully to the top edge:
        </p>
      </div>

      <div class="position-relative card card--bordered" style="block-size: 14rem; overflow-y: auto; padding: 0;">
        <div class="position-sticky padding-sm inline" style="top: 0; z-index: 1; background: var(--surface-card); border-bottom: 1px solid var(--border-color-quiet); justify-content: space-between; inline-size: 100%;">
          <span class="font-weight-bold font-size-xs">.position-sticky Header</span>
          <span class="sb-demo-tag">Pinned</span>
        </div>

        <div class="padding stack" style="--gap: var(--spacing-16);">
          <div class="card card--bordered padding-sm">
            <h5 class="font-size-xs font-weight-bold">Section 1: Foundations</h5>
            <p class="font-size-xs text-muted">Global DTCG design tokens and fluid typography.</p>
          </div>
          <div class="card card--bordered padding-sm">
            <h5 class="font-size-xs font-weight-bold">Section 2: Layout Primitives</h5>
            <p class="font-size-xs text-muted">Stack, Cluster, Inline, Grid, Split, and Wrapper.</p>
          </div>
          <div class="card card--bordered padding-sm">
            <h5 class="font-size-xs font-weight-bold">Section 3: Accessibility</h5>
            <p class="font-size-xs text-muted">WCAG 2.2 AA / AAA automated verification.</p>
          </div>
          <div class="card card--bordered padding-sm">
            <h5 class="font-size-xs font-weight-bold">Section 4: Deliverables</h5>
            <p class="font-size-xs text-muted">Storybook stories and Figma synchronized tokens.</p>
          </div>
        </div>
      </div>
    </div>
  `,
};

/**
 * 3. Modern Overflow Strategies (clip vs auto)
 */
export const OverflowStrategies: Story = {
  render: () => `
    <div class="sb-demo-group wrapper wrapper--lg">
      <div class="sb-demo-section">
        <h3 class="sb-demo-heading">Modern Overflow Strategies</h3>
        <p class="sb-demo-desc">
          Comparing strict clipping (<code>.overflow-clip</code>) with keyboard-accessible horizontal scrolling (<code>.overflow-x-auto</code>):
        </p>
      </div>

      <div class="grid grid--sm">
        <!-- overflow-clip -->
        <div class="card card--bordered padding stack">
          <div>
            <h4 class="font-size-sm font-weight-bold">1. Strict Clipping: <code>.overflow-clip</code></h4>
            <p class="font-size-xs text-muted margin-top-xs">
              Clips content strictly at the border box without creating an unnecessary GPU scroll container.
            </p>
          </div>

          <div class="card card--bordered overflow-clip padding-sm" style="max-inline-size: 16rem; position: relative;">
            <div style="inline-size: 24rem; background: var(--surface-muted); padding: var(--spacing-8);">
              <span class="font-size-xs">Wide content clipped neatly at boundary</span>
            </div>
          </div>
        </div>

        <!-- overflow-x-auto (Keyboard Accessible) -->
        <div class="card card--bordered padding stack">
          <div>
            <h4 class="font-size-sm font-weight-bold">2. Horizontal Scroll: <code>.overflow-x-auto</code></h4>
            <p class="font-size-xs text-muted margin-top-xs">
              Includes <code>tabindex="0"</code> so keyboard users can scroll wide tables with arrow keys.
            </p>
          </div>

          <div class="card card--bordered overflow-x-auto padding-sm" tabindex="0" role="region" aria-label="Sample wide content" style="max-inline-size: 16rem;">
            <div style="inline-size: 26rem; background: var(--surface-muted); padding: var(--spacing-8);">
              <span class="font-size-xs">Wide content scrolls with keyboard focus ring</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
};

/**
 * 4. Stacking Context Isolation (.isolate)
 */
export const StackingContextIsolation: Story = {
  render: () => `
    <div class="sb-demo-group wrapper wrapper--md">
      <div class="sb-demo-section">
        <h3 class="sb-demo-heading">Stacking Context Isolation (<code>.isolate</code>)</h3>
        <p class="sb-demo-desc">
          <code>isolation: isolate</code> prevents internal <code>z-index</code> layers from escaping into parent or sibling page contexts.
        </p>
      </div>

      <div class="card card--bordered padding stack" style="--gap: var(--spacing-16);">
        <div class="isolate card card--bordered padding" style="background: var(--surface-card); position: relative;">
          <div class="inline" style="justify-content: space-between;">
            <span class="font-size-sm font-weight-bold">Self-Contained Stacking Context</span>
            <span class="sb-demo-tag">.isolate</span>
          </div>
          <p class="font-size-xs text-muted margin-top-sm">
            Any internal tooltips, menus, or badges rendered with high z-indices remain isolated inside this component boundary.
          </p>
        </div>
      </div>
    </div>
  `,
};

/**
 * 5. Comprehensive State & Audit Matrix
 */
export const StateMatrix: Story = {
  render: () => `
    <div class="sb-demo-group wrapper wrapper--lg">
      <div class="sb-demo-section">
        <h3 class="sb-demo-heading">Automated Accessibility & State Verification Matrix</h3>
        <p class="sb-demo-desc">
          Consolidated snapshot testing across dimension, positioning, and overflow utility classes.
        </p>
      </div>

      <div class="grid grid--sm">
        <div class="card card--bordered padding w-full">
          <span class="font-size-xs">.w-full</span>
        </div>
        <div class="card card--bordered padding overflow-clip">
          <span class="font-size-xs">.overflow-clip</span>
        </div>
        <div class="card card--bordered padding isolate">
          <span class="font-size-xs">.isolate</span>
        </div>
        <div class="card card--bordered padding position-relative">
          <span class="font-size-xs">.position-relative</span>
        </div>
      </div>
    </div>
  `,
};
