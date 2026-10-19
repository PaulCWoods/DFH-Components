import type { Meta, StoryObj } from '@storybook/html';

interface FlexArgs {
  direction: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  wrap: 'nowrap' | 'wrap';
  justify: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  align: 'center' | 'start' | 'end' | 'stretch' | 'baseline';
  gap: '0' | 'sm' | 'default' | 'lg' | 'breathe';
  inspectBounds: boolean;
  itemCount: number;
}

const meta: Meta<FlexArgs> = {
  title: 'Utilities/Flex & Layout',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
### Developer & Designer Notes: Flexbox Layout Utilities

The **Flex** utilities provide zero-specificity (\`:where()\`) classes for 1-dimensional flexbox layouts, alignments, directions, wrapping, and child sizing (\`flex-grow\`, \`flex-shrink\`).

While composition primitives like \`.stack\`, \`.cluster\`, and \`.inline\` should be your first choice for structural architecture, Flex utilities provide surgical fine-tuning for custom component headers, toolbars, and micro-layouts.

Defined in \`utilities/flex.css\` with direct parity in the Design For Humans blog (\`_flex.scss\`).

---

#### 1. Core Architectural Principles
1. **Low-Specificity Utility Classes:** All classes are wrapped in \`:where()\` with 0-0-0 specificity, allowing local component tokens to override them effortlessly.
2. **Main & Cross Axis Orthogonality:** Complete coverage for main-axis distribution (\`.justify-content-*\`) and cross-axis alignment (\`.align-items-*\`).
3. **Fluid Child Sizing:** Utilities like \`.flex-1\` (\`flex: 1\`) and \`.flex-grow-1\` allow individual children to expand and fill available slack space inside an inline row.
4. **Token Gap Integration:** Composes seamlessly with token gap classes (\`.gap-sm\`, \`.gap\`, \`.gap-lg\`).

---

#### 2. Canonical Semantic Markup Signatures
AI agents and developers MUST use the following semantic patterns:

\`\`\`html
<!-- 1. Header Toolbar with Expanding Search (.flex-1) -->
<div class="flex align-items-center gap-sm">
  <span>Brand</span>
  <div class="flex-1">
    <input type="search" class="input w-full" placeholder="Search..." />
  </div>
  <button type="button" class="button button--primary button--sm"><span>Action</span></button>
</div>

<!-- 2. Split Space-Between Alignment -->
<div class="flex justify-content-between align-items-center padding-sm">
  <span class="font-weight-bold">Status</span>
  <span class="badge badge--success"><span>Live</span></span>
</div>

<!-- 3. Vertical Centered Column -->
<div class="flex flex-direction-column align-items-center gap-sm">
  <div class="avatar"><span>DF</span></div>
  <p class="font-weight-bold">Alex Bennett</p>
</div>
\`\`\`

---

#### 3. Axis Alignment & Distribution Contract

| Class Pattern | CSS Rule | Purpose |
| :--- | :--- | :--- |
| \`.justify-content-start\` | \`justify-content: flex-start\` | Packs items toward the leading main axis |
| \`.justify-content-center\` | \`justify-content: center\` | Centers items along the main axis |
| \`.justify-content-end\` | \`justify-content: flex-end\` | Packs items toward the trailing main axis |
| \`.justify-content-between\`| \`justify-content: space-between\` | Distributes items evenly; first at start, last at end |
| \`.align-items-center\` | \`align-items: center\` | Vertically centers items along the cross axis |
| \`.align-items-stretch\`| \`align-items: stretch\` | Stretches children to fill the full cross-axis height |
| \`.flex-1\` | \`flex: 1\` | Allows an item to grow and absorb all available remaining width |

---

#### 4. WCAG 2.2 Accessibility Guidelines
- **Visual Order vs DOM Sequence (WCAG 2.4.3 Focus Order):** Avoid using \`.flex-direction-row-reverse\` or \`.flex-direction-column-reverse\` to reposition interactive elements visually if it conflicts with the logical tab order.
        `,
      },
    },
  },
  args: {
    direction: 'row',
    wrap: 'nowrap',
    justify: 'between',
    align: 'center',
    gap: 'default',
    inspectBounds: false,
    itemCount: 3,
  },
  argTypes: {
    direction: {
      control: 'select',
      options: ['row', 'column', 'row-reverse', 'column-reverse'],
      description: 'Main axis flex direction',
    },
    wrap: {
      control: 'select',
      options: ['nowrap', 'wrap'],
      description: 'Flex wrapping behavior',
    },
    justify: {
      control: 'select',
      options: ['start', 'center', 'end', 'between', 'around', 'evenly'],
      description: 'Main-axis distribution (justify-content-*)',
    },
    align: {
      control: 'select',
      options: ['center', 'start', 'end', 'stretch', 'baseline'],
      description: 'Cross-axis alignment (align-items-*)',
    },
    gap: {
      control: 'select',
      options: ['0', 'sm', 'default', 'lg', 'breathe'],
      description: 'Token gap between flex items',
    },
    inspectBounds: {
      control: 'boolean',
      description: 'Visual layout inspector: highlights flex container bounds with purple diagnostic stripes',
    },
    itemCount: {
      control: { type: 'range', min: 2, max: 6, step: 1 },
      description: 'Number of demo children inside the flex container',
    },
  },
};

export default meta;
type Story = StoryObj<FlexArgs>;

/**
 * 1. Interactive Playground (Live Sandbox)
 */
export const Playground: Story = {
  render: (args) => {
    const dirClass = `flex-direction-${args.direction}`;
    const wrapClass = `flex-${args.wrap}`;
    const justifyClass = `justify-content-${args.justify}`;
    const alignClass = `align-items-${args.align}`;
    const gapClass = args.gap === 'default' ? 'gap' : `gap-${args.gap}`;
    const inspectClass = args.inspectBounds ? 'sb-demo-inspect-gap' : '';

    const classes = ['flex', dirClass, wrapClass, justifyClass, alignClass, gapClass, inspectClass].filter(Boolean).join(' ');

    const items = Array.from({ length: args.itemCount }, (_, i) => {
      const idx = i + 1;
      const tintClass = idx === 1 ? 'sb-demo-box--start' : idx === 2 ? 'sb-demo-box--center-tint' : 'sb-demo-box--end-tint';
      return `
        <div class="sb-demo-box ${tintClass} sb-demo-box--sm">
          <span class="font-weight-bold">Item ${idx}</span>
        </div>
      `;
    }).join('');

    return `
      <div class="sb-demo-section wrapper wrapper--md">
        <p class="sb-demo-desc">
          Live Sandbox: Adjust direction, wrap, main-axis justify, and cross-axis align below.
        </p>
        <div class="sb-demo-stage sb-demo-stage--lg" style="min-block-size: 12rem;">
          <div class="${classes}" style="inline-size: 100%; min-block-size: 8rem;">
            ${items}
          </div>
        </div>
      </div>
    `;
  },
};

/**
 * 2. Main-Axis Justify Content Distributions
 */
export const JustifyContentDistributions: Story = {
  render: () => `
    <div class="sb-demo-group wrapper wrapper--lg">
      <div class="sb-demo-section">
        <h3 class="sb-demo-heading">Main-Axis Distribution Utilities (<code>.justify-content-*</code>)</h3>
        <p class="sb-demo-desc">
          Controlling item positioning and spacing along the horizontal row axis:
        </p>
      </div>

      <div class="stack gap">
        <!-- Between -->
        <div class="card card--bordered padding stack" style="--gap: var(--spacing-4);">
          <p class="font-size-xs font-weight-bold color-muted">.justify-content-between (Split extremes)</p>
          <div class="flex justify-content-between align-items-center sb-demo-inspect-gap padding-sm">
            <span class="badge badge--accent"><span>Start Edge</span></span>
            <span class="badge badge--success"><span>End Edge</span></span>
          </div>
        </div>

        <!-- Center -->
        <div class="card card--bordered padding stack" style="--gap: var(--spacing-4);">
          <p class="font-size-xs font-weight-bold color-muted">.justify-content-center (Centered group)</p>
          <div class="flex justify-content-center align-items-center gap-sm sb-demo-inspect-gap padding-sm">
            <button type="button" class="button button--subtle button--sm"><span>Prev</span></button>
            <button type="button" class="button button--subtle button--sm"><span>Next</span></button>
          </div>
        </div>

        <!-- End -->
        <div class="card card--bordered padding stack" style="--gap: var(--spacing-4);">
          <p class="font-size-xs font-weight-bold color-muted">.justify-content-end (Trailing action bar)</p>
          <div class="flex justify-content-end align-items-center gap-sm sb-demo-inspect-gap padding-sm">
            <button type="button" class="button button--subtle button--sm"><span>Cancel</span></button>
            <button type="button" class="button button--primary button--sm"><span>Save</span></button>
          </div>
        </div>

        <!-- Evenly -->
        <div class="card card--bordered padding stack" style="--gap: var(--spacing-4);">
          <p class="font-size-xs font-weight-bold color-muted">.justify-content-evenly (Equal spacing around and between)</p>
          <div class="flex justify-content-evenly align-items-center sb-demo-inspect-gap padding-sm">
            <span class="chip">Col 1</span>
            <span class="chip">Col 2</span>
            <span class="chip">Col 3</span>
          </div>
        </div>
      </div>
    </div>
  `,
};

/**
 * 3. Cross-Axis Alignment Utilities
 */
export const CrossAxisAlignmentUtilities: Story = {
  render: () => `
    <div class="sb-demo-group wrapper wrapper--lg">
      <div class="sb-demo-section">
        <h3 class="sb-demo-heading">Cross-Axis Alignment (<code>.align-items-*</code>)</h3>
        <p class="sb-demo-desc">
          Controlling vertical positioning within an inline flex row:
        </p>
      </div>

      <div class="grid grid--sm">
        <!-- Center -->
        <div class="card card--bordered padding stack">
          <p class="font-size-xs font-weight-bold color-muted">.align-items-center (Default Centering)</p>
          <div class="flex align-items-center gap-sm sb-demo-inspect-gap padding-sm" style="block-size: 6rem;">
            <div class="avatar" data-status="online"><span>DF</span></div>
            <span class="font-size-sm font-weight-bold">Centered Label</span>
          </div>
        </div>

        <!-- Start -->
        <div class="card card--bordered padding stack">
          <p class="font-size-xs font-weight-bold color-muted">.align-items-start (Top Align)</p>
          <div class="flex align-items-start gap-sm sb-demo-inspect-gap padding-sm" style="block-size: 6rem;">
            <div class="avatar" data-status="online"><span>DF</span></div>
            <span class="font-size-sm font-weight-bold">Top Aligned</span>
          </div>
        </div>

        <!-- End -->
        <div class="card card--bordered padding stack">
          <p class="font-size-xs font-weight-bold color-muted">.align-items-end (Bottom Align)</p>
          <div class="flex align-items-end gap-sm sb-demo-inspect-gap padding-sm" style="block-size: 6rem;">
            <div class="avatar" data-status="online"><span>DF</span></div>
            <span class="font-size-sm font-weight-bold">Bottom Aligned</span>
          </div>
        </div>

        <!-- Stretch -->
        <div class="card card--bordered padding stack">
          <p class="font-size-xs font-weight-bold color-muted">.align-items-stretch (Full Height Stretch)</p>
          <div class="flex align-items-stretch gap-sm sb-demo-inspect-gap padding-sm" style="block-size: 6rem;">
            <div class="sb-demo-box sb-demo-box--sm flex align-items-center">Stretched 1</div>
            <div class="sb-demo-box sb-demo-box--sm flex align-items-center">Stretched 2</div>
          </div>
        </div>
      </div>
    </div>
  `,
};

/**
 * 4. Fluid Child Sizing (.flex-1, .flex-grow-1)
 */
export const FluidChildSizing: Story = {
  render: () => `
    <div class="sb-demo-group wrapper wrapper--lg">
      <div class="sb-demo-section">
        <h3 class="sb-demo-heading">Fluid Child Sizing Utilities (<code>.flex-1</code>)</h3>
        <p class="sb-demo-desc">
          Notice how the middle element with <code>.flex-1</code> expands to absorb all remaining slack space:
        </p>
      </div>

      <div class="card card--bordered padding stack" style="--gap: var(--spacing-16);">
        <div class="flex align-items-center gap-sm">
          <div class="sb-demo-box sb-demo-box--sm">Fixed Start</div>
          <div class="sb-demo-box sb-demo-box--center-tint flex-1 padding-sm text-center">
            <span class="font-weight-bold">.flex-1 (Expands to fill all slack width)</span>
          </div>
          <div class="sb-demo-box sb-demo-box--sm">Fixed End</div>
        </div>

        <!-- Application Header Pattern -->
        <div class="flex align-items-center gap-sm card card--bordered padding-sm" style="background: var(--surface-card);">
          <div class="inline" style="--gap: var(--spacing-8);">
            <div class="avatar avatar--sm" data-status="online"><span>DF</span></div>
            <span class="font-weight-bold font-size-sm">DFH Studio</span>
          </div>

          <div class="flex-1">
            <input type="search" class="input w-full" placeholder="Search components, tokens, stories..." />
          </div>

          <button type="button" class="button button--primary button--sm">
            <span>New Recipe</span>
          </button>
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
          Consolidated snapshot testing across all Flex utility combinations.
        </p>
      </div>

      <div class="grid grid--sm">
        <div class="card card--bordered padding">
          <div class="flex justify-content-between align-items-center">
            <span class="font-size-xs">Left</span>
            <span class="font-size-xs">Right</span>
          </div>
        </div>

        <div class="card card--bordered padding">
          <div class="flex justify-content-center align-items-center gap-sm">
            <span class="font-size-xs">Center 1</span>
            <span class="font-size-xs">Center 2</span>
          </div>
        </div>

        <div class="card card--bordered padding">
          <div class="flex align-items-center gap-sm">
            <span class="font-size-xs">Fixed</span>
            <div class="flex-1 sb-demo-box sb-demo-box--sm text-center font-size-xs">flex-1</div>
          </div>
        </div>
      </div>
    </div>
  `,
};
