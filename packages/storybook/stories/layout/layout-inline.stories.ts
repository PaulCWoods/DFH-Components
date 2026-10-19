import type { Meta, StoryObj } from '@storybook/html';

interface InlineArgs {
  variant: 'inline' | 'inline-responsive';
  breakpoint: '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  gap: 'tight' | 'compact' | 'default' | 'comfortable' | 'cushioned';
  justify: 'flex-start' | 'center' | 'flex-end' | 'space-between';
  align: 'center' | 'stretch' | 'flex-start' | 'flex-end';
  modifier: 'none' | 'inline--tight' | 'inline--cushioned' | 'inline--ruled' | 'inline--between';
  inspectGap: boolean;
  itemCount: number;
}

const meta: Meta<InlineArgs> = {
  title: 'Layout/Inline & Responsive',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
### Developer & Designer Notes: Inline & Responsive Switcher Primitives

The **Inline** primitive (\`.inline\`) provides a 1-dimensional horizontal row layout with centered alignment (\`align-items: center\`).
The **Responsive Inline** primitive (\`.inline-responsive--*\`) acts as a container-driven **Switcher**: it stacks vertically by default on narrow containers and automatically flips into an inline horizontal row once its parent container exceeds a specified threshold.

Defined in \`layout/inline.css\`.

---

#### 1. Core Architectural Principles
1. **True 1D Horizontal Row (\`.inline\`):** Elements stay in a single horizontal flow (\`flex-wrap: nowrap; flex-direction: row;\`) with vertical centering, perfect for avatar lockups, breadcrumbs, icon + label pairs, and compact metadata rows.
2. **Container-Driven Switcher (\`.inline-responsive--*\`):** Avoids fragile viewport-only \`@media\` queries by leveraging CSS Container Queries (\`@container (width > ...)\`). A component will adapt whether it's placed in a full-width page layout or inside a narrow sidebar column.
3. **Zero-Specificity Reset (\`:where()\`)**: Defined using \`:where(.inline, .inline-responsive)\` (0-0-0 specificity) so inline custom properties (\`--gap: ...\`) or utility classes override values with zero resistance.
4. **Semantic Element Parity:** Automatically strips native list margins, padding, and bullets on semantic lists (\`:where(.inline, .inline-responsive):where(ul, ol)\`).

---

#### 2. Canonical Semantic Markup Signatures
AI agents and developers MUST use the following semantic patterns:

\`\`\`html
<!-- 1. Inline Icon + Label Pairing -->
<div class="inline" style="--gap: var(--spacing-8);">
  <svg class="icon" aria-hidden="true"><use href="#Check"/></svg>
  <span>WCAG 2.2 Level AA Conformance</span>
</div>

<!-- 2. Avatar + Metadata Lockup -->
<div class="inline" style="--gap: var(--spacing-12);">
  <div class="avatar" data-status="online"><span>AB</span></div>
  <div>
    <p class="font-weight-bold">Alex Bennett</p>
    <p class="font-size-xs color-muted">Lead Accessibility Engineer</p>
  </div>
</div>

<!-- 3. Responsive Switcher Header (Stack on Mobile, Row on Desktop) -->
<div class="container-inline">
  <div class="inline-responsive inline-responsive--md" style="justify-content: space-between;">
    <div>
      <h3>Audit Summary</h3>
      <p>Component library status</p>
    </div>
    <div class="cluster">
      <button type="button" class="button button--subtle"><span>Export</span></button>
      <button type="button" class="button button--primary"><span>Generate Report</span></button>
    </div>
  </div>
</div>

<!-- 4. Native Ruled Navigation Row -->
<div class="inline inline--ruled">
  <a href="#overview" class="link"><span>Overview</span></a>
  <a href="#tokens" class="link"><span>Tokens</span></a>
  <a href="#components" class="link"><span>Components</span></a>
</div>

<!-- 5. Distributed / Between Row (.inline--between) -->
<div class="inline inline--between">
  <span>Left Label / Heading</span>
  <span class="badge badge--success"><span>Live</span></span>
</div>
\`\`\`

---

#### 3. Container Breakpoint Scale (\`.inline-responsive--*\`)

| Class Modifier | Min Container Width | Typical Usage |
| :--- | :--- | :--- |
| \`.inline-responsive--2xs\` | \`20em\` (320px) | Ultra-compact cards, micro-widgets |
| \`.inline-responsive--xs\` | \`30em\` (480px) | Compact form actions, mobile headers |
| \`.inline-responsive--sm\` | \`40em\` (640px) | Dialog headers, sidebar toolbars |
| \`.inline-responsive--md\` | \`48em\` (768px) | Main application bars, content cards |
| \`.inline-responsive--lg\` | \`60em\` (960px) | Site navigation bars, complex toolbars |
| \`.inline-responsive--xl\` | \`80em\` (1280px) | Wide dashboard headers |
| \`.inline-responsive--2xl\` | \`96em\` (1536px) | Ultra-wide analytics split rows |

---

#### 4. WCAG 2.2 Accessibility Guidelines
- **Logical Flow (WCAG 1.3.2 Meaningful Sequence):** The visual transition from vertical stack to horizontal row preserves the underlying DOM sequence, ensuring screen reader focus and tab navigation are never disoriented.
- **Minimum Target Areas (WCAG 2.5.8):** Even in tight inline configurations, touch targets must maintain at least 24×24px bounding boxes.
        `,
      },
    },
  },
  args: {
    variant: 'inline',
    breakpoint: 'md',
    gap: 'default',
    justify: 'flex-start',
    align: 'center',
    modifier: 'none',
    inspectGap: false,
    itemCount: 4,
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['inline', 'inline-responsive'],
      description: 'Fixed horizontal flow (.inline) vs container-adaptive switcher (.inline-responsive)',
    },
    breakpoint: {
      control: 'select',
      options: ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Container query width threshold for .inline-responsive--*',
    },
    gap: {
      control: 'select',
      options: ['tight', 'compact', 'default', 'comfortable', 'cushioned'],
      description: 'Horizontal token gap spacing',
    },
    justify: {
      control: 'select',
      options: ['flex-start', 'center', 'flex-end', 'space-between'],
      description: 'Main-axis distribution',
    },
    align: {
      control: 'select',
      options: ['center', 'stretch', 'flex-start', 'flex-end'],
      description: 'Cross-axis item alignment',
    },
    modifier: {
      control: 'select',
      options: ['none', 'inline--tight', 'inline--cushioned', 'inline--ruled', 'inline--between'],
      description: 'Predefined modifier class',
    },
    inspectGap: {
      control: 'boolean',
      description: 'Visual layout inspector: highlights token gap area with purple diagnostic stripes',
    },
    itemCount: {
      control: { type: 'range', min: 2, max: 8, step: 1 },
      description: 'Number of demo items in the row',
    },
  },
};

export default meta;
type Story = StoryObj<InlineArgs>;

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

    const isResponsive = args.variant === 'inline-responsive';
    const baseClass = isResponsive ? `inline-responsive inline-responsive--${args.breakpoint}` : 'inline';
    const modifierClass = args.modifier !== 'none' ? args.modifier : '';
    const inspectClass = args.inspectGap ? 'sb-demo-inspect-gap' : '';
    const customGap = args.modifier === 'none' && args.gap !== 'default' ? `--gap: ${gapTokenMap[args.gap]};` : '';
    const customJustify = args.justify !== 'flex-start' ? `justify-content: ${args.justify};` : '';
    const customAlign = args.align !== 'center' ? `align-items: ${args.align};` : '';
    const inlineStyles = [customGap, customJustify, customAlign].filter(Boolean).join(' ');

    const items = Array.from({ length: args.itemCount }, (_, i) => {
      const idx = i + 1;
      const tintClass = idx === 1 ? 'sb-demo-box--start' : idx === 2 ? 'sb-demo-box--center-tint' : 'sb-demo-box--end-tint';
      return `
        <div class="sb-demo-box ${tintClass} sb-demo-box--sm">
          <span class="font-weight-bold">Node ${idx}</span>
        </div>
      `;
    }).join('');

    return `
      <div class="sb-demo-section wrapper wrapper--md">
        <p class="sb-demo-desc">
          Live Sandbox: Switch between fixed <code>.inline</code> and adaptive <code>.inline-responsive</code>, customize gaps, and test container-query threshold behavior below.
        </p>
        <div class="sb-demo-stage sb-demo-stage--lg" style="container-type: inline-size;">
          <div class="${baseClass} ${modifierClass} ${inspectClass}" style="${inlineStyles}; inline-size: 100%;">
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
          Inline horizontal spacing adapts predictably across predefined tokens.
        </p>
      </div>

      <div class="grid grid--sm">
        <!-- Tight (0) -->
        <div class="card card--bordered">
          <article class="card__content">
            <header class="card__header">
              <h4 class="card__title font-size-sm">1. Tight (0 gap)</h4>
              <p class="card__subtitle font-size-xs"><code>.inline--tight</code></p>
            </header>
            <div class="card__body">
              <div class="inline inline--tight sb-demo-inspect-gap">
                <button type="button" class="button button--subtle"><span>Prev</span></button>
                <button type="button" class="button button--subtle"><span>Next</span></button>
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
              <div class="inline sb-demo-inspect-gap" style="--gap: var(--spacing-8);">
                <div class="avatar" data-status="online"><span>DF</span></div>
                <span class="font-size-sm font-weight-bold">Design For Humans</span>
              </div>
            </div>
          </article>
        </div>

        <!-- Default (1rem) -->
        <div class="card card--bordered">
          <article class="card__content">
            <header class="card__header">
              <h4 class="card__title font-size-sm">3. Default (1rem)</h4>
              <p class="card__subtitle font-size-xs"><code>.inline</code> (Standard)</p>
            </header>
            <div class="card__body">
              <div class="inline sb-demo-inspect-gap">
                <span class="badge badge--accent"><span>Active</span></span>
                <span class="badge badge--success"><span>Passing</span></span>
                <span class="badge badge--warning"><span>Pending</span></span>
              </div>
            </div>
          </article>
        </div>

        <!-- Cushioned (4rem) -->
        <div class="card card--bordered">
          <article class="card__content">
            <header class="card__header">
              <h4 class="card__title font-size-sm">4. Cushioned (4rem)</h4>
              <p class="card__subtitle font-size-xs"><code>.inline--cushioned</code></p>
            </header>
            <div class="card__body">
              <div class="inline inline--cushioned sb-demo-inspect-gap">
                <div class="sb-demo-box sb-demo-box--sm">Metric A</div>
                <div class="sb-demo-box sb-demo-box--sm">Metric B</div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  `,
};

/**
 * 3. Responsive Container Switcher
 */
export const ResponsiveContainerSwitcher: Story = {
  render: () => `
    <div class="sb-demo-group wrapper wrapper--lg">
      <div class="sb-demo-section">
        <h3 class="sb-demo-heading">Container-Driven Adaptive Switcher (<code>.inline-responsive--*</code>)</h3>
        <p class="sb-demo-desc">
          Notice how the element starts as a vertical stack on narrow containers, and automatically snaps into an inline row when the container exceeds <strong>40em (640px)</strong>:
        </p>
      </div>

      <div class="stack gap">
        <!-- Constrained narrow container (Simulated Mobile / Sidebar) -->
        <div class="card card--bordered padding" style="max-inline-size: 24rem; container-type: inline-size;">
          <p class="font-size-xs font-weight-bold color-muted margin-bottom-sm">Narrow Container (&lt; 48em): Stacks Vertically</p>
          <div class="inline-responsive inline-responsive--sm sb-demo-inspect-gap" style="justify-content: space-between;">
            <div>
              <p class="font-weight-bold font-size-sm">Sprint Milestone 4</p>
              <p class="font-size-xs color-muted">WCAG AAA verification</p>
            </div>
            <div class="cluster" style="--gap: var(--spacing-8);">
              <button type="button" class="button button--subtle button--sm"><span>Details</span></button>
              <button type="button" class="button button--primary button--sm"><span>Sign Off</span></button>
            </div>
          </div>
        </div>

        <!-- Wide container (Simulated Desktop / Main Content) -->
        <div class="card card--bordered padding" style="max-inline-size: 54rem; container-type: inline-size;">
          <p class="font-size-xs font-weight-bold color-muted margin-bottom-sm">Wide Container (&gt; 48em): Flows Horizontally</p>
          <div class="inline-responsive inline-responsive--sm sb-demo-inspect-gap" style="justify-content: space-between;">
            <div>
              <p class="font-weight-bold font-size-sm">Sprint Milestone 4</p>
              <p class="font-size-xs color-muted">WCAG AAA verification</p>
            </div>
            <div class="cluster" style="--gap: var(--spacing-8);">
              <button type="button" class="button button--subtle button--sm"><span>Details</span></button>
              <button type="button" class="button button--primary button--sm"><span>Sign Off</span></button>
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
          <code>.inline--ruled</code> inserts vertical hairline separators between flow items without extra border styling.
        </p>
      </div>

      <div class="card card--bordered padding">
        <h4 class="font-size-sm font-weight-bold margin-bottom-sm">Standard Ruled Navigation Row</h4>
        <div class="inline inline--ruled">
          <a href="#" class="link" onclick="event.preventDefault();"><span>Dashboard</span></a>
          <a href="#" class="link" onclick="event.preventDefault();"><span>Security</span></a>
          <a href="#" class="link" onclick="event.preventDefault();"><span>Preferences</span></a>
          <a href="#" class="link" onclick="event.preventDefault();"><span>Audit History</span></a>
        </div>
      </div>

      <div class="card card--bordered padding">
        <h4 class="font-size-sm font-weight-bold margin-bottom-sm">Tight Ruled Segmented Control (<code>.inline--ruled.inline--tight</code>)</h4>
        <div class="inline inline--ruled inline--tight">
          <button type="button" class="button button--subtle" style="border-radius: 0;"><span>Day</span></button>
          <button type="button" class="button button--subtle" style="border-radius: 0;"><span>Week</span></button>
          <button type="button" class="button button--subtle" style="border-radius: 0;"><span>Month</span></button>
          <button type="button" class="button button--subtle" style="border-radius: 0;"><span>Year</span></button>
        </div>
      </div>
    </div>
  `,
};

/**
 * 5. Space-Between Distributed Row (.inline--between)
 */
export const Between: Story = {
  render: () => `
    <div class="sb-demo-group wrapper wrapper--md stack">
      <div class="sb-demo-section">
        <h3 class="sb-demo-heading">Space-Between Distributed Rows (<code>.inline--between</code>)</h3>
        <p class="sb-demo-desc">
          Distributes items across the full inline width (<code>inline-size: 100%; justify-content: space-between;</code>). 
          Ideal for header bars, label-and-value telemetry rows, and card actions without invoking macro multi-column sidebars.
        </p>
      </div>

      <div class="card card--bordered padding stack">
        <h4 class="font-size-xs font-weight-bold text-muted">Widget Header Bar</h4>
        <div class="inline inline--between">
          <div class="inline align-items-center" style="--gap: var(--spacing-8);">
            <span class="status" data-status="online" aria-hidden="true"></span>
            <strong>Primary Node Status</strong>
          </div>
          <div class="inline align-items-center" style="--gap: var(--spacing-8);">
            <span class="badge badge--success badge--sm"><span>Operational</span></span>
            <button type="button" class="button button--subtle button--icon button--sm" aria-label="Refresh node">
              <svg class="icon"><use href="#ArrowRight"/></svg>
            </button>
          </div>
        </div>
      </div>

      <div class="card card--bordered padding stack">
        <h4 class="font-size-xs font-weight-bold text-muted">Key-Value Telemetry Rows</h4>
        <div class="stack" style="--gap: var(--spacing-8);">
          <div class="inline inline--between">
            <span class="color-muted font-size-sm">Volume Level</span>
            <output class="font-size-sm font-bold">85%</output>
          </div>
          <div class="inline inline--between">
            <span class="color-muted font-size-sm">Audio Headroom</span>
            <output class="font-size-sm color-success font-bold">-1.8 dB</output>
          </div>
          <div class="inline inline--between">
            <span class="color-muted font-size-sm">Active Listeners</span>
            <output class="font-size-sm font-bold">1,248</output>
          </div>
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
        <h3 class="sb-demo-heading">Spacing Modifiers (<code>.inline--tight</code>, <code>.inline--cushioned</code>)</h3>
        <p class="sb-demo-desc">
          Apply tight or cushioned spacing to inline rows using direct modifiers.
        </p>
      </div>

      <div class="grid grid--sm">
        <div class="card card--bordered padding">
          <h4 class="font-size-sm font-weight-bold margin-bottom-sm">Modifier: <code>.inline--tight</code></h4>
          <div class="inline inline--tight sb-demo-inspect-gap">
            <span class="badge badge--accent"><span>Alpha</span></span>
            <span class="badge badge--success"><span>Beta</span></span>
            <span class="badge badge--warning"><span>Gamma</span></span>
          </div>
        </div>

        <div class="card card--bordered padding">
          <h4 class="font-size-sm font-weight-bold margin-bottom-sm">Modifier: <code>.inline--cushioned</code></h4>
          <div class="inline inline--cushioned sb-demo-inspect-gap">
            <div class="sb-demo-box sb-demo-box--sm">Spacious 1</div>
            <div class="sb-demo-box sb-demo-box--sm">Spacious 2</div>
          </div>
        </div>
      </div>
    </div>
  `,
};

/**
 * 6. Real-World Recipe: Identity & Avatar Lockup
 */
export const IdentityLockup: Story = {
  render: () => `
    <div class="sb-demo-group wrapper wrapper--sm">
      <div class="sb-demo-section">
        <h3 class="sb-demo-heading">Real-World Pattern: User Identity Lockup</h3>
        <p class="sb-demo-desc">
          Centering an avatar, user name, status dot, and role badge on a single row.
        </p>
      </div>

      <div class="card card--bordered padding">
        <div class="inline" style="justify-content: space-between; inline-size: 100%;">
          <div class="inline" style="--gap: var(--spacing-12);">
            <div class="avatar" data-status="online" aria-label="Jordan Lee (Online)">
              <span>JL</span>
            </div>
            <div>
              <div class="inline" style="--gap: var(--spacing-8);">
                <span class="font-weight-bold font-size-sm">Jordan Lee</span>
                <span class="status" data-status="online">Online</span>
              </div>
              <p class="font-size-xs color-muted">Lead Design Engineer</p>
            </div>
          </div>

          <button type="button" class="button button--subtle button--icon" aria-label="User actions">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false">
              <circle cx="12" cy="12" r="1"></circle>
              <circle cx="12" cy="5" r="1"></circle>
              <circle cx="12" cy="19" r="1"></circle>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `,
};

/**
 * 7. Real-World Recipe: Metadata Breadcrumb Row
 */
export const MetadataBreadcrumbRow: Story = {
  render: () => `
    <div class="sb-demo-group wrapper wrapper--md">
      <div class="sb-demo-section">
        <h3 class="sb-demo-heading">Real-World Pattern: Inline Article Metadata</h3>
        <p class="sb-demo-desc">
          A compact row combining publish dates, reading duration, and category tags.
        </p>
      </div>

      <div class="card card--bordered padding">
        <div class="inline inline--ruled" style="--gap: var(--spacing-12); font-size: var(--typography-font-size--1);">
          <span class="color-muted">October 13, 2026</span>
          <span class="color-muted">8 min read</span>
          <span class="badge badge--accent badge--sm"><span>Architecture</span></span>
          <a href="#" class="link link--subtle font-size-xs" onclick="event.preventDefault();"><span>Discuss (14)</span></a>
        </div>
      </div>
    </div>
  `,
};

/**
 * 8. Semantic Navigation List
 */
export const SemanticNavigationList: Story = {
  render: () => `
    <div class="sb-demo-group wrapper wrapper--md">
      <div class="sb-demo-section">
        <h3 class="sb-demo-heading">Semantic List Reset (<code>&lt;ul class="inline"&gt;</code>)</h3>
        <p class="sb-demo-desc">
          Removes default list margins and markers while preserving accessible list semantics for screen readers.
        </p>
      </div>

      <div class="card card--bordered padding">
        <nav aria-label="Section tabs">
          <ul class="inline" style="--gap: var(--spacing-16);">
            <li><a href="#" class="link" onclick="event.preventDefault();"><strong>1. Overview</strong></a></li>
            <li><a href="#" class="link" onclick="event.preventDefault();"><span>2. Architecture</span></a></li>
            <li><a href="#" class="link" onclick="event.preventDefault();"><span>3. Tokens</span></a></li>
            <li><a href="#" class="link" onclick="event.preventDefault();"><span>4. Compliance</span></a></li>
          </ul>
        </nav>
      </div>
    </div>
  `,
};

/**
 * 9. Comprehensive State & Audit Matrix
 */
export const StateMatrix: Story = {
  render: () => `
    <div class="sb-demo-group wrapper wrapper--lg">
      <div class="sb-demo-section">
        <h3 class="sb-demo-heading">Automated Accessibility & State Verification Matrix</h3>
        <p class="sb-demo-desc">
          Consolidated snapshot testing across all Inline modifiers, gaps, and responsive container switchers.
        </p>
      </div>

      <div class="grid grid--sm">
        <div class="card card--bordered padding stack">
          <h4 class="font-size-xs font-weight-bold">Standard Inline</h4>
          <div class="inline sb-demo-inspect-gap">
            <span class="badge badge--accent"><span>Alpha</span></span>
            <span class="badge badge--success"><span>Beta</span></span>
          </div>
        </div>

        <div class="card card--bordered padding stack">
          <h4 class="font-size-xs font-weight-bold">Tight Inline</h4>
          <div class="inline inline--tight sb-demo-inspect-gap">
            <span class="badge badge--accent"><span>Alpha</span></span>
            <span class="badge badge--success"><span>Beta</span></span>
          </div>
        </div>

        <div class="card card--bordered padding stack">
          <h4 class="font-size-xs font-weight-bold">Ruled Inline</h4>
          <div class="inline inline--ruled">
            <span class="padding-inline-xs font-size-xs">Alpha</span>
            <span class="padding-inline-xs font-size-xs">Beta</span>
          </div>
        </div>

        <div class="card card--bordered padding stack">
          <h4 class="font-size-xs font-weight-bold">Distributed Inline (.inline--between)</h4>
          <div class="inline inline--between sb-demo-inspect-gap">
            <span class="badge badge--accent"><span>Alpha</span></span>
            <span class="badge badge--success"><span>Omega</span></span>
          </div>
        </div>

        <div class="card card--bordered padding stack" style="container-type: inline-size;">
          <h4 class="font-size-xs font-weight-bold">Responsive Switcher (.inline-responsive--sm)</h4>
          <div class="inline-responsive inline-responsive--sm sb-demo-inspect-gap">
            <span class="badge badge--accent"><span>Alpha</span></span>
            <span class="badge badge--success"><span>Beta</span></span>
          </div>
        </div>
      </div>
    </div>
  `,
};
