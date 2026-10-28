import type { Meta, StoryObj } from '@storybook/html';

interface ClusterArgs {
  gap: 'tight' | 'compact' | 'default' | 'comfortable' | 'cushioned';
  justify: 'flex-start' | 'center' | 'flex-end' | 'space-between';
  align: 'center' | 'stretch' | 'flex-start' | 'flex-end' | 'baseline';
  modifier: 'none' | 'cluster--tight' | 'cluster--cushioned' | 'cluster--ruled';
  inspectGap: boolean;
  itemCount: number;
}

const meta: Meta<ClusterArgs> = {
  title: 'Layout/Cluster',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
### Developer & Designer Notes: Cluster Layout Primitive (\`.cluster\`)

The **Cluster** primitive is an inline-flex, row-wrapping layout container designed for groups of variable-width elements that must sit horizontally alongside each other and wrap naturally across lines when container space is constrained.

Inspired by **Every Layout** (Heydon Pickering & Andy Bell) and modern Web Standards, the Cluster provides predictable, two-dimensional spacing across rows and columns without negative margin hacks or fragile floating clearfixes.

Defined in \`layout/cluster.css\`.

---

#### 1. Core Architectural Principles
1. **Intrinsic Inline Wrapping:** Uses \`display: inline-flex; flex-wrap: wrap;\` so elements preserve their natural intrinsic widths (labels, badges, action buttons, tags) and automatically wrap to new lines as container bounds contract.
2. **Dual-Axis Gap Control:** Spacing between siblings on both horizontal and vertical axes is managed completely by CSS \`gap\`.
3. **Zero-Specificity Reset (\`:where()\`)**: Defined using \`:where(.cluster)\` (0-0-0 specificity) so custom gap tokens (\`--gap: var(--spacing-8)\`) or alignment utilities override it effortlessly.
4. **Semantic Element Parity:** Automatically clears default margins, paddings, and bullet styling when used directly on semantic lists (\`:where(.cluster):where(ul, ol)\`).

---

#### 2. Canonical Semantic Markup Signatures
AI agents and developers MUST use the following semantic patterns:

\`\`\`html
<!-- 1. Standard Button / Action Cluster -->
<div class="cluster">
  <button type="button" class="button button--strong button--accent"><span>Publish</span></button>
  <button type="button" class="button"><span>Save Draft</span></button>
  <button type="button" class="button button--subtle"><span>Cancel</span></button>
</div>

<!-- 2. Tag & Chip Cloud with Compact Gap -->
<div class="cluster" style="--gap: var(--spacing-8);">
  <span class="chip chip--subtle"><span class="chip__text">Design Tokens</span></span>
  <span class="chip chip--subtle"><span class="chip__text">WCAG 2.2 AA</span></span>
  <span class="chip chip--subtle"><span class="chip__text">Accessibility</span></span>
</div>

<!-- 3. Button-Like Radio Group Choices (Zero-JS) -->
<div class="cluster" style="--gap: var(--spacing-8);" role="radiogroup" aria-label="Export format">
  <label class="button">
    <input type="radio" name="fmt" class="visually-hidden" checked />
    <span>JSON</span>
  </label>
  <label class="button">
    <input type="radio" name="fmt" class="visually-hidden" />
    <span>CSS</span>
  </label>
</div>

<!-- 4. Semantic Filter / Tag List -->
<ul class="cluster" aria-label="Category tags">
  <li><a href="/topics/css" class="chip"><span class="chip__text">CSS</span></a></li>
  <li><a href="/topics/html" class="chip"><span class="chip__text">HTML5</span></a></li>
</ul>

<!-- 5. Native Ruled Dividers Between Items -->
<div class="cluster cluster--ruled">
  <span>Overview</span>
  <span>Analytics</span>
  <span>Settings</span>
</div>
\`\`\`

---

#### 3. Token & Custom Property Contract

| Custom Property | Fallback Token | Description |
| :--- | :--- | :--- |
| \`--_gap\` | \`var(--gap, var(--spacing, 1rem))\` | Active horizontal and vertical gap between wrapped cluster items |
| \`--gap\` | \`var(--spacing, 1rem)\` | Author-level custom spacing override |
| \`--justify-content\` | \`normal\` | Main-axis alignment (\`flex-start\`, \`center\`, \`flex-end\`, \`space-between\`) |
| \`--align-items\` | \`stretch\` | Cross-axis item alignment (\`center\`, \`stretch\`, \`flex-start\`) |
| \`--rule-width\` | \`1px\` | Divider stroke thickness in \`.cluster--ruled\` |
| \`--rule-color\` | \`currentColor\` | Divider stroke color in \`.cluster--ruled\` |

---

#### 4. WCAG 2.2 Accessibility Guidelines
- **DOM Reading Order (WCAG 1.3.2 Meaningful Sequence):** Items inside a \`.cluster\` wrap naturally in reading order. Never use \`flex-direction: row-reverse\` to move actions visually unless the underlying DOM sequence also matches the intended tab order.
- **Target Size (WCAG 2.5.8 Target Size Minimum):** Interactive items inside a cluster (tags, buttons) must maintain at least 24×24px bounding target areas, with standard buttons using \`--spacing-target: 44px / 48px\`.
        `,
      },
    },
  },
  args: {
    gap: 'default',
    justify: 'flex-start',
    align: 'center',
    modifier: 'none',
    inspectGap: false,
    itemCount: 6,
  },
  argTypes: {
    gap: {
      control: 'select',
      options: ['tight', 'compact', 'default', 'comfortable', 'cushioned'],
      description: 'Horizontal and vertical token gap scale',
    },
    justify: {
      control: 'select',
      options: ['flex-start', 'center', 'flex-end', 'space-between'],
      description: 'Main-axis distribution across the container',
    },
    align: {
      control: 'select',
      options: ['center', 'stretch', 'flex-start', 'flex-end', 'baseline'],
      description: 'Cross-axis item alignment',
    },
    modifier: {
      control: 'select',
      options: ['none', 'cluster--tight', 'cluster--cushioned', 'cluster--ruled'],
      description: 'Predefined layout modifier class',
    },
    inspectGap: {
      control: 'boolean',
      description: 'Visual layout inspector: highlights token gap area with purple diagnostic stripes',
    },
    itemCount: {
      control: { type: 'range', min: 3, max: 12, step: 1 },
      description: 'Number of demo items inside the cluster',
    },
  },
};

export default meta;
type Story = StoryObj<ClusterArgs>;

/**
 * 1. Interactive Playground (Live Sandbox)
 */
export const Playground: Story = {
  render: (args) => {
    const gapTokenMap: Record<string, string> = {
      tight: '0',
      compact: 'var(--spacing-8, 0.5rem)',
      default: 'var(--spacing, 1rem)',
      comfortable: 'var(--spacing-24, 1.5rem)',
      cushioned: 'var(--spacing-cushion, 4rem)',
    };

    const modifierClass = args.modifier !== 'none' ? args.modifier : '';
    const inspectClass = args.inspectGap ? 'sb-demo-inspect-gap' : '';
    const customGap = args.modifier === 'none' && args.gap !== 'default' ? `--gap: ${gapTokenMap[args.gap]};` : '';
    const customJustify = args.justify !== 'flex-start' ? `justify-content: ${args.justify};` : '';
    const customAlign = args.align !== 'stretch' ? `align-items: ${args.align};` : '';
    const inlineStyles = [customGap, customJustify, customAlign].filter(Boolean).join(' ');

    const sampleLabels = [
      'Accessibility', 'WCAG 2.2 AAA', 'Tokens Studio', 'Figma Variables',
      'Anchor Positioning', 'Zero Specificity', 'Fluid Typography', 'Top-Layer Dialog',
      'Container Queries', 'Color Contrast', 'Light-Dark', 'CSS Rule'
    ];

    const items = Array.from({ length: args.itemCount }, (_, i) => {
      const label = sampleLabels[i % sampleLabels.length];
      const isEven = i % 2 === 0;
      return `
        <button type="button" class="button ${isEven ? 'button--subtle' : ''}">
          <span>${label}</span>
        </button>
      `;
    }).join('');

    return `
      <div class="sb-demo-section wrapper wrapper--md">
        <p class="sb-demo-desc">
          Live Sandbox: Resize your browser or adjust gap tokens, alignment, and diagnostic overlays using the controls panel below.
        </p>
        <div class="sb-demo-stage sb-demo-stage--lg">
          <div class="cluster ${modifierClass} ${inspectClass}" style="${inlineStyles}; inline-size: 100%;">
            ${items}
          </div>
        </div>
      </div>
    `;
  },
};

/**
 * 2. Token Gap Scale Hierarchy
 */
export const GapScaleHierarchy: Story = {
  render: () => `
    <div class="sb-demo-group wrapper wrapper--lg">
      <div class="sb-demo-section">
        <h3 class="sb-demo-heading">Gap Scale Comparison</h3>
        <p class="sb-demo-desc">
          The cluster primitive scales cleanly from tightly connected toolbars to spacious editorial chip sets.
        </p>
      </div>

      <div class="grid grid--sm">
        <!-- Tight (0) -->
        <div class="card card--bordered">
          <article class="card__content">
            <header class="card__header">
              <h4 class="card__title font-size-sm">1. Tight (0 gap)</h4>
              <p class="card__subtitle font-size-xs"><code>.cluster--tight</code></p>
            </header>
            <div class="card__body">
              <div class="cluster cluster--tight sb-demo-inspect-gap">
                <span class="chip"><span class="chip__text">HTML5</span></span>
                <span class="chip"><span class="chip__text">CSS3</span></span>
                <span class="chip"><span class="chip__text">ARIA</span></span>
                <span class="chip"><span class="chip__text">WCAG</span></span>
              </div>
            </div>
          </article>
        </div>

        <!-- Compact (0.5rem) -->
        <div class="card card--bordered">
          <article class="card__content">
            <header class="card__header">
              <h4 class="card__title font-size-sm">2. Compact (0.5rem)</h4>
              <p class="card__subtitle font-size-xs"><code>--gap: var(--spacing-8)</code></p>
            </header>
            <div class="card__body">
              <div class="cluster sb-demo-inspect-gap" style="--gap: var(--spacing-8);">
                <span class="chip chip--subtle"><span class="chip__text">Tokens</span></span>
                <span class="chip chip--subtle"><span class="chip__text">Themes</span></span>
                <span class="chip chip--subtle"><span class="chip__text">Scales</span></span>
                <span class="chip chip--subtle"><span class="chip__text">Colors</span></span>
              </div>
            </div>
          </article>
        </div>

        <!-- Default (1rem) -->
        <div class="card card--bordered">
          <article class="card__content">
            <header class="card__header">
              <h4 class="card__title font-size-sm">3. Default (1rem)</h4>
              <p class="card__subtitle font-size-xs"><code>.cluster</code> (Standard)</p>
            </header>
            <div class="card__body">
              <div class="cluster sb-demo-inspect-gap">
                <button type="button" class="button"><span>Accept</span></button>
                <button type="button" class="button button--subtle"><span>Decline</span></button>
                <button type="button" class="button button--subtle"><span>Options</span></button>
              </div>
            </div>
          </article>
        </div>

        <!-- Cushioned (4rem) -->
        <div class="card card--bordered">
          <article class="card__content">
            <header class="card__header">
              <h4 class="card__title font-size-sm">4. Cushioned (4rem)</h4>
              <p class="card__subtitle font-size-xs"><code>.cluster--cushioned</code></p>
            </header>
            <div class="card__body">
              <div class="cluster cluster--cushioned sb-demo-inspect-gap">
                <div class="sb-demo-box sb-demo-box--sm">Cluster A</div>
                <div class="sb-demo-box sb-demo-box--sm">Cluster B</div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  `,
};

/**
 * 3. Main-Axis Justification (Distribution)
 */
export const JustificationVariants: Story = {
  render: () => `
    <div class="sb-demo-group wrapper wrapper--lg">
      <div class="sb-demo-section">
        <h3 class="sb-demo-heading">Main-Axis Distribution (<code>justify-content</code>)</h3>
        <p class="sb-demo-desc">
          Controlling horizontal positioning of cluster items across the container boundary.
        </p>
      </div>

      <div class="stack gap">
        <!-- Start -->
        <div class="card card--bordered padding">
          <h4 class="font-size-xs font-weight-bold margin-bottom-xs">flex-start (Default Left-Aligned)</h4>
          <div class="cluster" style="justify-content: flex-start; inline-size: 100%;">
            <button type="button" class="button"><span>Alpha</span></button>
            <button type="button" class="button"><span>Beta</span></button>
            <button type="button" class="button"><span>Gamma</span></button>
          </div>
        </div>

        <!-- Center -->
        <div class="card card--bordered padding">
          <h4 class="font-size-xs font-weight-bold margin-bottom-xs">center (Balanced Centering)</h4>
          <div class="cluster" style="justify-content: center; inline-size: 100%;">
            <button type="button" class="button"><span>Alpha</span></button>
            <button type="button" class="button"><span>Beta</span></button>
            <button type="button" class="button"><span>Gamma</span></button>
          </div>
        </div>

        <!-- End -->
        <div class="card card--bordered padding">
          <h4 class="font-size-xs font-weight-bold margin-bottom-xs">flex-end (Trailing Actions)</h4>
          <div class="cluster" style="justify-content: flex-end; inline-size: 100%;">
            <button type="button" class="button button--subtle"><span>Cancel</span></button>
            <button type="button" class="button button--strong button--accent"><span>Confirm Action</span></button>
          </div>
        </div>

        <!-- Space Between -->
        <div class="card card--bordered padding">
          <h4 class="font-size-xs font-weight-bold margin-bottom-xs">space-between (Header / Toolbar Split)</h4>
          <div class="cluster" style="justify-content: space-between; align-items: center; inline-size: 100%;">
            <div class="cluster" style="--gap: var(--spacing-8);">
              <span class="status status--accent"><span class="status__text">Active</span></span>
              <span class="font-size-sm font-weight-bold">Audit 2026-Q4</span>
            </div>
            <div class="cluster" style="--gap: var(--spacing-8);">
              <button type="button" class="button button--subtle"><span>Export</span></button>
              <button type="button" class="button button--strong button--accent"><span>Run Scan</span></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
};

/**
 * 4. Native Ruled Dividers
 */
export const RuledDividers: Story = {
  render: () => `
    <div class="sb-demo-group wrapper wrapper--md">
      <div class="sb-demo-section">
        <h3 class="sb-demo-heading">Native Dividers via CSS <code>rule</code></h3>
        <p class="sb-demo-desc">
          <code>.cluster--ruled</code> injects vertical dividers between cluster items without requiring manual pipe (<code>|</code>) or border hacks.
        </p>
      </div>

      <div class="card card--bordered padding">
        <h4 class="font-size-sm font-weight-bold margin-bottom-sm">Standard Ruled Cluster</h4>
        <div class="cluster cluster--ruled" style="align-items: center;">
          <button type="button" class="button button--subtle"><span>Overview</span></button>
          <button type="button" class="button button--subtle"><span>Analytics</span></button>
          <button type="button" class="button button--subtle"><span>Settings</span></button>
          <button type="button" class="button button--subtle"><span>Audit Logs</span></button>
        </div>
      </div>

      <div class="card card--bordered padding">
        <h4 class="font-size-sm font-weight-bold margin-bottom-sm">Tight Ruled Toolbar (<code>.cluster--ruled.cluster--tight</code>)</h4>
        <div class="cluster cluster--ruled cluster--tight">
          <button type="button" class="button button--subtle" style="border-radius: 0;"><span>Mon</span></button>
          <button type="button" class="button button--subtle" style="border-radius: 0;"><span>Tue</span></button>
          <button type="button" class="button button--subtle" style="border-radius: 0;"><span>Wed</span></button>
          <button type="button" class="button button--subtle" style="border-radius: 0;"><span>Thu</span></button>
          <button type="button" class="button button--subtle" style="border-radius: 0;"><span>Fri</span></button>
        </div>
      </div>
    </div>
  `,
};

/**
 * 5. Scoped Container Modifiers
 */
export const ScopedModifiers: Story = {
  render: () => `
    <div class="sb-demo-group wrapper wrapper--md">
      <div class="sb-demo-section">
        <h3 class="sb-demo-heading">Spacing Modifiers (<code>.cluster--tight</code>, <code>.cluster--cushioned</code>)</h3>
        <p class="sb-demo-desc">
          Apply tight or cushioned gaps to clusters using direct modifiers.
        </p>
      </div>

      <div class="grid grid--sm">
        <div class="card card--bordered padding">
          <h4 class="font-size-sm font-weight-bold margin-bottom-sm">Modifier: <code>.cluster--tight</code></h4>
          <div class="cluster cluster--tight sb-demo-inspect-gap">
            <span class="chip"><span class="chip__text">HTML</span></span>
            <span class="chip"><span class="chip__text">CSS</span></span>
            <span class="chip"><span class="chip__text">JS</span></span>
          </div>
        </div>

        <div class="card card--bordered padding">
          <h4 class="font-size-sm font-weight-bold margin-bottom-sm">Modifier: <code>.cluster--cushioned</code></h4>
          <div class="cluster cluster--cushioned sb-demo-inspect-gap">
            <div class="sb-demo-box sb-demo-box--sm">Spacious A</div>
            <div class="sb-demo-box sb-demo-box--sm">Spacious B</div>
          </div>
        </div>
      </div>
    </div>
  `,
};

/**
 * 6. Real-World Recipe: Filter Facet Chips
 */
export const TagAndChipCloud: Story = {
  render: () => `
    <div class="sb-demo-group wrapper wrapper--md">
      <div class="sb-demo-section">
        <h3 class="sb-demo-heading">Real-World Pattern: Filter Facets & Tags</h3>
        <p class="sb-demo-desc">
          Variable-width tags and chips flow effortlessly within constrained containers, wrapping neatly across lines.
        </p>
      </div>

      <div class="card card--bordered padding">
        <div class="stack" style="--gap: var(--spacing-12);">
          <div class="cluster" style="justify-content: space-between; align-items: center;">
            <p class="font-size-sm font-weight-bold">Active Filters</p>
            <button type="button" class="button button--subtle font-size-xs"><span>Clear All</span></button>
          </div>

          <div class="cluster" style="--gap: var(--spacing-8);">
            <span class="status status--success status--plain"><span class="status__text">Accessibility Lead</span></span>
            <span class="chip chip--subtle"><span class="chip__text">WCAG 2.2 AA</span></span>
            <span class="chip chip--subtle"><span class="chip__text">Figma Variables</span></span>
            <span class="chip chip--subtle"><span class="chip__text">Baseline 2026</span></span>
            <span class="chip chip--subtle"><span class="chip__text">Zero-Specificity</span></span>
            <span class="chip chip--subtle"><span class="chip__text">Tokens Studio</span></span>
            <span class="chip chip--subtle"><span class="chip__text">High Contrast Focus</span></span>
            <span class="chip chip--subtle"><span class="chip__text">Top-Layer Transitions</span></span>
          </div>
        </div>
      </div>
    </div>
  `,
};

/**
 * 7. Real-World Recipe: Action Toolbar & Card Footer
 */
export const ActionToolbar: Story = {
  render: () => `
    <div class="sb-demo-group wrapper wrapper--sm">
      <div class="sb-demo-section">
        <h3 class="sb-demo-heading">Real-World Pattern: Responsive Action Toolbar</h3>
        <p class="sb-demo-desc">
          Aligning primary, secondary, and subtle buttons in a cluster ensures they collapse gracefully on smaller viewports.
        </p>
      </div>

      <div class="card card--bordered padding">
        <div class="stack" style="--gap: var(--spacing-16);">
          <div>
            <h4 class="font-size-md font-weight-bold">Automated axe Conformance Scan</h4>
            <p class="font-size-sm text-muted margin-top-xs">
              Runs 92 automated accessibility rules against Storybook components to detect color contrast, missing labels, and ARIA role issues.
            </p>
          </div>

          <div class="cluster" style="justify-content: flex-end; align-items: center; --gap: var(--spacing-8);">
            <button type="button" class="button button--subtle">
              <span>View Logs</span>
            </button>
            <button type="button" class="button">
              <span>Configure Rules</span>
            </button>
            <button type="button" class="button button--strong button--accent">
              <span>Start Full Audit</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
};

/**
 * 8. Real-World Recipe: Zero-JS Button-Like Radio Group
 */
export const ButtonRadioGroup: Story = {
  render: () => `
    <div class="sb-demo-group wrapper wrapper--md">
      <div class="sb-demo-section">
        <h3 class="sb-demo-heading">Real-World Pattern: Button-Like Choice Group</h3>
        <p class="sb-demo-desc">
          Zero-JS segmented choices clustered together. Uses native <code>&lt;input type="radio"&gt;</code> wrapped inside <code>&lt;label class="button"&gt;</code>.
        </p>
      </div>

      <div class="card card--bordered padding">
        <fieldset class="fieldset">
          <legend class="legend">Target Conformance Tier</legend>
          <div class="cluster" style="--gap: var(--spacing-8);">
            <label class="button">
              <input type="radio" name="demo-audit-level" class="visually-hidden" />
              <span>WCAG 2.1 AA</span>
            </label>
            <label class="button">
              <input type="radio" name="demo-audit-level" class="visually-hidden" checked />
              <span>WCAG 2.2 AA</span>
              <svg class="icon icon--on" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Check"/></svg>
            </label>
            <label class="button">
              <input type="radio" name="demo-audit-level" class="visually-hidden" />
              <span>WCAG 2.2 AAA</span>
            </label>
          </div>
        </fieldset>
      </div>
    </div>
  `,
};

/**
 * 9. Semantic Navigation List
 */
export const SemanticNavigationList: Story = {
  render: () => `
    <div class="sb-demo-group wrapper wrapper--md">
      <div class="sb-demo-section">
        <h3 class="sb-demo-heading">Semantic List Reset (<code>&lt;ul class="cluster"&gt;</code>)</h3>
        <p class="sb-demo-desc">
          Removes default list margins and markers while preserving accessible list role tree semantics for assistive technologies.
        </p>
      </div>

      <div class="card card--bordered padding">
        <nav aria-label="Footer topics">
          <ul class="cluster" style="--gap: var(--spacing-16);">
            <li><a href="#" class="link" onclick="event.preventDefault();"><span>Design Tokens</span></a></li>
            <li><a href="#" class="link" onclick="event.preventDefault();"><span>Accessibility</span></a></li>
            <li><a href="#" class="link" onclick="event.preventDefault();"><span>Layout Primitives</span></a></li>
            <li><a href="#" class="link" onclick="event.preventDefault();"><span>Components</span></a></li>
            <li><a href="#" class="link" onclick="event.preventDefault();"><span>GitHub Repository</span></a></li>
          </ul>
        </nav>
      </div>
    </div>
  `,
};

/**
 * 10. Comprehensive State & Audit Matrix
 */
export const StateMatrix: Story = {
  render: () => `
    <div class="sb-demo-group wrapper wrapper--lg">
      <div class="sb-demo-section">
        <h3 class="sb-demo-heading">Automated Accessibility & State Verification Matrix</h3>
        <p class="sb-demo-desc">
          Consolidated snapshot testing across all Cluster modifiers, gaps, and semantic parent wrappers.
        </p>
      </div>

      <div class="grid grid--sm">
        <div class="card card--bordered padding stack">
          <h4 class="font-size-xs font-weight-bold">Standard Cluster</h4>
          <div class="cluster sb-demo-inspect-gap">
            <span class="status status--accent"><span class="status__text">Alpha</span></span>
            <span class="status status--success"><span class="status__text">Beta</span></span>
            <span class="status status--warning"><span class="status__text">Gamma</span></span>
          </div>
        </div>

        <div class="card card--bordered padding stack">
          <h4 class="font-size-xs font-weight-bold">Tight Cluster</h4>
          <div class="cluster cluster--tight sb-demo-inspect-gap">
            <span class="status status--accent"><span class="status__text">Alpha</span></span>
            <span class="status status--success"><span class="status__text">Beta</span></span>
            <span class="status status--warning"><span class="status__text">Gamma</span></span>
          </div>
        </div>

        <div class="card card--bordered padding stack">
          <h4 class="font-size-xs font-weight-bold">Ruled Cluster</h4>
          <div class="cluster cluster--ruled">
            <span class="padding-inline-xs font-size-xs">Alpha</span>
            <span class="padding-inline-xs font-size-xs">Beta</span>
            <span class="padding-inline-xs font-size-xs">Gamma</span>
          </div>
        </div>

        <div class="card card--bordered padding stack">
          <h4 class="font-size-xs font-weight-bold">Tight Cluster (Modifier)</h4>
          <div class="cluster cluster--tight sb-demo-inspect-gap">
            <span class="status status--accent"><span class="status__text">Alpha</span></span>
            <span class="status status--success"><span class="status__text">Beta</span></span>
            <span class="status status--warning"><span class="status__text">Gamma</span></span>
          </div>
        </div>
      </div>
    </div>
  `,
};
