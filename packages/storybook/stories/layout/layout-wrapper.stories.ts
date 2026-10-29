import type { Meta, StoryObj } from '@storybook/html';

interface WrapperArgs {
  size: 'default' | '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  align: 'center' | 'start' | 'end';
  middle: boolean;
  inspectBounds: boolean;
}

const meta: Meta<WrapperArgs> = {
  title: 'Layout/Wrapper',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
### Developer & Designer Notes: Wrapper Layout Primitive (\`.wrapper\`)

The **Wrapper** primitive (also known as the **Center** primitive in Every Layout) sets maximum inline-size boundaries and automatically centers content on the page horizontally using \`margin-inline: auto\`.

It prevents wide monitors from stretching reading copy into uncomfortably long lines and ensures layouts remain bounded and legible without rigid, fixed-pixel widths.

Defined in \`layout/wrapper.css\`.

---

#### 1. Core Architectural Principles
1. **Fluid Intrinsic Sizing:** Uses \`inline-size: 100%; max-inline-size: var(--wrapper-max-width); margin-inline: auto;\`. On small screens below the boundary, the container is naturally 100% wide. On large viewports, it locks to the designated token boundary.
2. **Spacing Block Scale:** Size tiers (\`.wrapper--2xs\` through \`.wrapper--2xl\`) tie directly to Design For Humans spacing block tokens.
3. **Horizontal Alignment Modifiers:** Use \`.wrapper--start\` to align to the leading edge, or \`.wrapper--end\` to align to the trailing edge.
4. **Vertical Centering (\`.wrapper--middle\`):** Uses \`display: grid; align-content: center; min-block-size: 100%;\` to create centered hero, splash, or authentication views.
5. **Zero-Specificity Reset (\`:where()\`)**: Defined with 0-0-0 specificity for effortless customization.

---

#### 2. Canonical Semantic Markup Signatures
AI agents and developers MUST use the following semantic patterns:

\`\`\`html
<!-- 1. Standard Site Content Wrapper -->
<div class="wrapper wrapper--lg">
  <main>Page main content...</main>
</div>

<!-- 2. Optimal Reading Column (Article / Prose) -->
<article class="wrapper wrapper--sm prose">
  <h1>Accessible Design Systems</h1>
  <p>Long-form editorial copy constrained to optimal line length...</p>
</article>

<!-- 3. Centered Splash / Login Dialog (.wrapper--middle) -->
<div class="sb-demo-frame" style="block-size: 20rem;">
  <div class="wrapper wrapper--xs wrapper--middle">
    <div class="card padding">
      <h3>Sign In</h3>
    </div>
  </div>
</div>
\`\`\`

---

#### 3. Max-Width Scale (\`.wrapper--*\`)

| Class Modifier | Token Reference | Max Inline Size | Ideal Usage |
| :--- | :--- | :--- | :--- |
| \`.wrapper--2xs\` | \`--spacing-block-2xs\` | \`8rem\` (128px) | Micro badges, status alerts |
| \`.wrapper--xs\` | \`--spacing-block-xs\` | \`16rem\` (256px) | Login dialogs, compact modals |
| \`.wrapper--sm\` | \`--spacing-block-sm\` | \`24rem\` (384px) | Reading columns, prose text (60-75ch) |
| \`.wrapper\` / \`.wrapper--md\` | \`--spacing-block\` | \`36rem\` (576px) | Standard articles, feature forms |
| \`.wrapper--lg\` | \`--spacing-block-lg\` | \`48rem\` (768px) | Main application content, card catalogs |
| \`.wrapper--xl\` | \`--spacing-block-xl\` | \`64rem\` (1024px) | Wide dashboards, documentation views |
| \`.wrapper--2xl\` | \`--spacing-block-2xl\` | \`80rem\` (1280px) | Full-width container boundary |

---

#### 4. WCAG 2.2 Accessibility Guidelines
- **Line Length Reflow (WCAG 1.4.8 Visual Presentation - AAA):** Line lengths should not exceed 80 characters (or glyphs). Constraining long-form text with \`.wrapper--sm\` or \`.wrapper--md\` drastically improves readability for neurodivergent and low-vision users.
- **Reflow Without Loss (WCAG 1.4.10 Reflow - AA):** Bounded containers must not cause two-dimensional scrolling at 400% zoom.
        `,
      },
    },
  },
  args: {
    size: 'sm',
    align: 'center',
    middle: false,
    inspectBounds: false,
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['default', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Maximum inline-size boundary tier',
    },
    align: {
      control: 'select',
      options: ['center', 'start', 'end'],
      description: 'Horizontal positioning across the viewport',
    },
    middle: {
      control: 'boolean',
      description: 'Vertical centering within parent container (.wrapper--middle)',
    },
    inspectBounds: {
      control: 'boolean',
      description: 'Visual layout inspector: highlights boundary limits with dashed purple outlines',
    },
  },
};

export default meta;
type Story = StoryObj<WrapperArgs>;

/**
 * 1. Interactive Playground (Live Sandbox)
 */
export const Playground: Story = {
  render: (args) => {
    const sizeClass = args.size !== 'default' ? `wrapper--${args.size}` : '';
    const alignClass = args.align !== 'center' ? `wrapper--${args.align}` : '';
    const middleClass = args.middle ? 'wrapper--middle' : '';
    const inspectClass = args.inspectBounds ? 'sb-demo-inspect-gap' : '';

    const classes = ['wrapper', sizeClass, alignClass, middleClass, inspectClass].filter(Boolean).join(' ');

    return `
      <div class="sb-demo-section wrapper wrapper--lg">
        <p class="sb-demo-desc">
          Live Sandbox: Test max-width tiers, horizontal alignment, and middle vertical centering below.
        </p>
        <div class="sb-demo-stage sb-demo-stage--lg" style="block-size: ${args.middle ? '18rem' : 'auto'};">
          <div class="${classes}">
            <div class="card padding">
              <h4 class="font-size-sm font-weight-bold">Bounded Content Box</h4>
              <p class="font-size-xs text-muted margin-top-xs">
                Active tier: <code>${args.size}</code> &middot; Alignment: <code>${args.align}</code>
              </p>
            </div>
          </div>
        </div>
      </div>
    `;
  },
};

/**
 * 2. Sizing Scale Hierarchy
 */
export const SizingScaleHierarchy: Story = {
  render: () => `
    <div class="sb-demo-group wrapper wrapper--lg">
      <div class="sb-demo-section">
        <h3 class="sb-demo-heading">Max-Width Scale Comparison</h3>
        <p class="sb-demo-desc">
          Visual comparison of available wrapper boundary widths within a wide viewport:
        </p>
      </div>

      <div class="stack gap">
        <div class="wrapper wrapper--xs sb-demo-inspect-gap">
          <div class="card padding"><p class="font-size-xs font-weight-bold">.wrapper--xs (16rem / 256px)</p></div>
        </div>

        <div class="wrapper wrapper--sm sb-demo-inspect-gap">
          <div class="card padding"><p class="font-size-xs font-weight-bold">.wrapper--sm (24rem / 384px)</p></div>
        </div>

        <div class="wrapper wrapper--md sb-demo-inspect-gap">
          <div class="card padding"><p class="font-size-xs font-weight-bold">.wrapper--md (36rem / 576px)</p></div>
        </div>

        <div class="wrapper wrapper--lg sb-demo-inspect-gap">
          <div class="card padding"><p class="font-size-xs font-weight-bold">.wrapper--lg (48rem / 768px)</p></div>
        </div>
      </div>
    </div>
  `,
};

/**
 * 3. Horizontal Alignment Variants
 */
export const HorizontalAlignments: Story = {
  render: () => `
    <div class="sb-demo-group wrapper wrapper--lg">
      <div class="sb-demo-section">
        <h3 class="sb-demo-heading">Horizontal Placements</h3>
        <p class="sb-demo-desc">
          Shift bounded content to the leading edge (<code>.wrapper--start</code>), center (default), or trailing edge (<code>.wrapper--end</code>).
        </p>
      </div>

      <div class="card padding stack" style="--gap: var(--spacing-16);">
        <!-- Start -->
        <div>
          <p class="font-size-xs text-muted margin-bottom-xs">Leading Edge: <code>.wrapper--start</code></p>
          <div class="wrapper wrapper--xs wrapper--start sb-demo-inspect-gap">
            <div class="sb-demo-box sb-demo-box--sm">Left-Aligned</div>
          </div>
        </div>

        <!-- Center -->
        <div>
          <p class="font-size-xs text-muted margin-bottom-xs">Centered: <code>.wrapper</code> (Default)</p>
          <div class="wrapper wrapper--xs sb-demo-inspect-gap">
            <div class="sb-demo-box sb-demo-box--sm">Centered</div>
          </div>
        </div>

        <!-- End -->
        <div>
          <p class="font-size-xs text-muted margin-bottom-xs">Trailing Edge: <code>.wrapper--end</code></p>
          <div class="wrapper wrapper--xs wrapper--end sb-demo-inspect-gap">
            <div class="sb-demo-box sb-demo-box--sm">Right-Aligned</div>
          </div>
        </div>
      </div>
    </div>
  `,
};

/**
 * 4. Vertical & Horizontal Centering Hero (.wrapper--middle)
 */
export const VerticalCenteringHero: Story = {
  render: () => `
    <div class="sb-demo-group wrapper wrapper--md">
      <div class="sb-demo-section">
        <h3 class="sb-demo-heading">Vertical & Horizontal Centering (<code>.wrapper--middle</code>)</h3>
        <p class="sb-demo-desc">
          Uses grid alignment to perfectly center authentication forms, 404 splash cards, and welcome modals within a block container.
        </p>
      </div>

      <div class="sb-demo-frame" style="block-size: 18rem;">
        <div class="wrapper wrapper--xs wrapper--middle">
          <div class="card padding stack" style="--gap: var(--spacing-12); text-align: center;">
            <div class="avatar avatar--placeholder" style="margin-inline: auto;">
              <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#User"/></svg>
            </div>
            <div>
              <h4 class="font-weight-bold font-size-sm">Session Expired</h4>
              <p class="font-size-xs text-muted">Please sign in to continue your audit.</p>
            </div>
            <button type="button" class="button button--strong button--accent button--sm">
              <span>Sign In</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
};

/**
 * 5. Real-World Recipe: Optimal Reading Column
 */
export const OptimalReadingColumn: Story = {
  render: () => `
    <div class="sb-demo-group wrapper wrapper--lg">
      <div class="sb-demo-section">
        <h3 class="sb-demo-heading">Real-World Pattern: Optimal Reading Column</h3>
        <p class="sb-demo-desc">
          Constraining editorial articles with <code>.wrapper--sm</code> satisfies WCAG AAA line length recommendations (~65-75ch).
        </p>
      </div>

      <div class="card padding">
        <article class="wrapper wrapper--sm stack" style="--gap: var(--spacing-16);">
          <hgroup class="stack" style="--gap: var(--spacing-4);">
            <h3 class="font-size-fluid-2 font-weight-bold">Designing for Humans</h3>
            <p class="text-muted font-size-sm">Published by Paul Charles Woods &middot; Oct 2026</p>
          </hgroup>

          <p class="line-height-relaxed font-size-md">
            Accessibility is not a feature or a post-launch compliance checklist. It is the fundamental practice of ensuring that digital interfaces respect human perception, cognitive load, and motor precision across all conditions.
          </p>

          <p class="line-height-relaxed font-size-md">
            By bounding reading columns to predictable inline dimensions, we eliminate the visual disorientation caused by wide monitor stretching, allowing the reader's eye to return effortlessly to the start of each line.
          </p>
        </article>
      </div>
    </div>
  `,
};

/**
 * 6. Comprehensive State & Audit Matrix
 */
export const StateMatrix: Story = {
  render: () => `
    <div class="sb-demo-group wrapper wrapper--lg">
      <div class="sb-demo-section">
        <h3 class="sb-demo-heading">Automated Accessibility & State Verification Matrix</h3>
        <p class="sb-demo-desc">
          Consolidated snapshot testing across all Wrapper modifiers and sizes.
        </p>
      </div>

      <div class="grid grid--sm">
        <div class="card padding stack">
          <h4 class="font-size-xs font-weight-bold">Centered Wrapper (xs)</h4>
          <div class="wrapper wrapper--2xs sb-demo-inspect-gap">
            <div class="sb-demo-box sb-demo-box--sm">Centered</div>
          </div>
        </div>

        <div class="card padding stack">
          <h4 class="font-size-xs font-weight-bold">Start-Aligned Wrapper</h4>
          <div class="wrapper wrapper--2xs wrapper--start sb-demo-inspect-gap">
            <div class="sb-demo-box sb-demo-box--sm">Start</div>
          </div>
        </div>

        <div class="card padding stack">
          <h4 class="font-size-xs font-weight-bold">End-Aligned Wrapper</h4>
          <div class="wrapper wrapper--2xs wrapper--end sb-demo-inspect-gap">
            <div class="sb-demo-box sb-demo-box--sm">End</div>
          </div>
        </div>

        <div class="card padding stack">
          <h4 class="font-size-xs font-weight-bold">Middle-Centered Wrapper</h4>
          <div style="block-size: 6rem;">
            <div class="wrapper wrapper--2xs wrapper--middle sb-demo-inspect-gap">
              <div class="sb-demo-box sb-demo-box--sm">Middle</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
};
