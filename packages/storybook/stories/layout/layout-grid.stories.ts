import type { Meta, StoryObj } from '@storybook/html';

interface GridArgs {
  size: '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  gap: 'tight' | 'compact' | 'default' | 'comfortable' | 'cushioned';
  modifier: 'none' | 'grid--tight' | 'grid--cushioned' | 'grid--ruled';
  inspectGap: boolean;
  itemCount: number;
}

const meta: Meta<GridArgs> = {
  title: 'Layout/Grid',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
### Developer & Designer Notes: Fluid Responsive Grid Primitive (\`.grid\`)

The **Grid** primitive provides an auto-filling, two-dimensional layout that gracefully adapts to available container space without requiring manual \`@media\` query breakpoints.

Inspired by **Every Layout** (Heydon Pickering & Andy Bell) and modern CSS Grid standards, the Grid uses the mathematical formula:
\`grid-template-columns: repeat(auto-fill, minmax(min(var(--_item-width), 100%), 1fr));\`

This guarantees that grid cells expand to fill available space, wrap into additional rows when space is constrained, and **never trigger horizontal page blowout** on mobile screens smaller than the item's minimum width.

Defined in \`layout/grid.css\`.

---

#### 1. Core Architectural Principles
1. **Zero-Breakpoint Fluidity:** The layout calculates column counts intrinsically based on container width rather than arbitrary viewport breakpoints.
2. **Spacing Block Token Scale:** Column minimum widths map directly to Design For Humans spacing block tokens (\`--spacing-block-2xs\` to \`--spacing-block-2xl\`), ensuring proportional harmony with typography and card sizing.
3. **Zero-Specificity Reset (\`:where()\`)**: Defined using \`:where(.grid)\` (0-0-0 specificity) so custom gap tokens (\`--gap: ...\`) or custom item widths (\`--_item-width: ...\`) override it with zero specificity friction.
4. **Semantic Element Parity:** Automatically strips native list margins, padding, and bullets on semantic lists (\`:where(.grid):where(ol, ul)\`).

---

#### 2. Canonical Semantic Markup Signatures
AI agents and developers MUST use the following semantic patterns:

\`\`\`html
<!-- 1. Semantic Card Catalog Grid -->
<ul class="grid grid--sm" role="list">
  <li>
    <div class="card card--bordered">
      <article class="card__content">
        <header class="card__header"><h4 class="card__title small-heading">Card A</h4></header>
        <div class="card__body"><p>Card content copy...</p></div>
      </article>
    </div>
  </li>
  <li>
    <div class="card card--bordered">
      <article class="card__content">
        <header class="card__header"><h4 class="card__title small-heading">Card B</h4></header>
        <div class="card__body"><p>Card content copy...</p></div>
      </article>
    </div>
  </li>
</ul>

<!-- 2. Dashboard Metric Tiles (Compact xs min-width) -->
<div class="grid grid--xs">
  <div class="card card--bordered padding">...</div>
  <div class="card card--bordered padding">...</div>
  <div class="card card--bordered padding">...</div>
</div>

<!-- 3. Native Ruled 2D Matrix -->
<div class="grid grid--sm grid--ruled">
  <div>Cell 1</div>
  <div>Cell 2</div>
  <div>Cell 3</div>
  <div>Cell 4</div>
</div>
\`\`\`

---

#### 3. Column Minimum Width Scale (\`.grid--*\`)

| Class Modifier | Token Reference | Min Item Width | Recommended Content |
| :--- | :--- | :--- | :--- |
| \`.grid--2xs\` | \`--spacing-block-2xs\` | \`8rem\` (128px) | Avatars, icon tiles, micro metrics |
| \`.grid--xs\` | \`--spacing-block-xs\` | \`16rem\` (256px) | KPI stats, compact filter widgets |
| \`.grid--sm\` | \`--spacing-block-sm\` | \`24rem\` (384px) | Feature cards, blog article previews |
| \`.grid\` / \`.grid--md\` | \`--spacing-block\` | \`36rem\` (576px) | Standard content blocks, forms |
| \`.grid--lg\` | \`--spacing-block-lg\` | \`48rem\` (768px) | Two-column split editorial sections |
| \`.grid--xl\` | \`--spacing-block-xl\` | \`64rem\` (1024px) | Wide media panels, comparison tables |
| \`.grid--2xl\` | \`--spacing-block-2xl\` | \`80rem\` (1280px) | Ultra-wide dashboard layouts |

---

#### 4. Column Count & Responsive Breakpoint Modifiers
While DFH prioritizes intrinsic token widths (\`.grid--xs\` to \`.grid--2xl\`), explicit column counts can be locked unconditionally or activated responsively at viewport or container breakpoints:

| Modifier Class | Viewport / Context | Column Output | Usage Context |
| :--- | :--- | :--- | :--- |
| \`.grid--2-col\` | All viewports | \`repeat(2, 1fr)\` | Unconditional 2-column split |
| \`.grid--3-col\` | All viewports | \`repeat(3, 1fr)\` | Unconditional 3-column split |
| \`.sm:grid--2-col\` / \`@sm:grid--2-col\` | \`> 40em\` (640px) | \`repeat(2, 1fr)\` | Stacks on mobile, 2 columns on small screens |
| \`.md:grid--2-col\` / \`@md:grid--2-col\` | \`> 48em\` (768px) | \`repeat(2, 1fr)\` | Stacks on mobile, 2 columns on tablet/desktop |
| \`.md:grid--3-col\` / \`@md:grid--3-col\` | \`> 48em\` (768px) | \`repeat(3, 1fr)\` | Stacks on mobile, 3 columns on tablet/desktop |
| \`.lg:grid--3-col\` / \`@lg:grid--3-col\` | \`> 60em\` (960px) | \`repeat(3, 1fr)\` | 3 columns on desktop |
| \`.lg:grid--4-col\` / \`@lg:grid--4-col\` | \`> 60em\` (960px) | \`repeat(4, 1fr)\` | 4 columns on desktop |

---

#### 5. WCAG 2.2 Accessibility Guidelines
- **DOM Tab Sequence (WCAG 2.4.3 Focus Order):** In a CSS Grid, tab navigation naturally reads left-to-right, row-by-row in LTR. Ensure cards are authored in logical order.
- **Screen Reader List Structure (WCAG 1.3.1):** When rendering sets of related cards, wrap them in \`<ul class="grid" role="list">\` so assistive technologies announce item counts correctly.
        `,
      },
    },
  },
  args: {
    size: 'xs',
    gap: 'default',
    modifier: 'none',
    inspectGap: false,
    itemCount: 6,
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Minimum item width tier (.grid--*)',
    },
    gap: {
      control: 'select',
      options: ['tight', 'compact', 'default', 'comfortable', 'cushioned'],
      description: 'Two-dimensional gap spacing between cells',
    },
    modifier: {
      control: 'select',
      options: ['none', 'grid--tight', 'grid--cushioned', 'grid--ruled'],
      description: 'Predefined modifier class',
    },
    inspectGap: {
      control: 'boolean',
      description: 'Visual layout inspector: highlights 2D token gap area with purple diagnostic stripes',
    },
    itemCount: {
      control: { type: 'range', min: 2, max: 12, step: 1 },
      description: 'Number of demo cards in the grid',
    },
  },
};

export default meta;
type Story = StoryObj<GridArgs>;

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

    const sizeClass = `grid--${args.size}`;
    const modifierClass = args.modifier !== 'none' ? args.modifier : '';
    const inspectClass = args.inspectGap ? 'sb-demo-inspect-gap' : '';
    const customGap = args.modifier === 'none' && args.gap !== 'default' ? `--gap: ${gapTokenMap[args.gap]};` : '';

    const items = Array.from({ length: args.itemCount }, (_, i) => {
      const idx = i + 1;
      const tintClass = idx % 3 === 1 ? 'sb-demo-box--start' : idx % 3 === 2 ? 'sb-demo-box--center-tint' : 'sb-demo-box--end-tint';
      return `
        <div class="sb-demo-box ${tintClass} padding">
          <p class="font-weight-bold">Cell ${idx}</p>
          <p class="font-size-xs text-muted">Fluid auto-fill cell (min ${args.size}).</p>
        </div>
      `;
    }).join('');

    return `
      <div class="sb-demo-section wrapper wrapper--lg">
        <p class="sb-demo-desc">
          Live Sandbox: Adjust column minimum size, gap tokens, and inspect 2D flow across fluid viewport widths.
        </p>
        <div class="sb-demo-stage sb-demo-stage--lg">
          <div class="grid ${sizeClass} ${modifierClass} ${inspectClass}" style="${customGap}">
            ${items}
          </div>
        </div>
      </div>
    `;
  },
};

/**
 * 2. Column Min-Width Scale Matrix
 */
export const SizingScaleMatrix: Story = {
  render: () => `
    <div class="sb-demo-group wrapper wrapper--lg">
      <div class="sb-demo-section">
        <h3 class="sb-demo-heading">Column Min-Width Scale</h3>
        <p class="sb-demo-desc">
          Compare how cell counts and wrapping behavior adapt based on spacing block width tiers:
        </p>
      </div>

      <div class="stack gap">
        <!-- 2xs (8rem) -->
        <div class="card card--bordered padding">
          <h4 class="font-size-xs font-weight-bold margin-bottom-xs">1. .grid--2xs (min 8rem / 128px)</h4>
          <div class="grid grid--2xs sb-demo-inspect-gap">
            <div class="sb-demo-box sb-demo-box--sm">Tile 1</div>
            <div class="sb-demo-box sb-demo-box--sm">Tile 2</div>
            <div class="sb-demo-box sb-demo-box--sm">Tile 3</div>
            <div class="sb-demo-box sb-demo-box--sm">Tile 4</div>
            <div class="sb-demo-box sb-demo-box--sm">Tile 5</div>
            <div class="sb-demo-box sb-demo-box--sm">Tile 6</div>
          </div>
        </div>

        <!-- xs (16rem) -->
        <div class="card card--bordered padding">
          <h4 class="font-size-xs font-weight-bold margin-bottom-xs">2. .grid--xs (min 16rem / 256px)</h4>
          <div class="grid grid--xs sb-demo-inspect-gap">
            <div class="sb-demo-box sb-demo-box--sm">Widget A</div>
            <div class="sb-demo-box sb-demo-box--sm">Widget B</div>
            <div class="sb-demo-box sb-demo-box--sm">Widget C</div>
          </div>
        </div>

        <!-- sm (24rem) -->
        <div class="card card--bordered padding">
          <h4 class="font-size-xs font-weight-bold margin-bottom-xs">3. .grid--sm (min 24rem / 384px)</h4>
          <div class="grid grid--sm sb-demo-inspect-gap">
            <div class="sb-demo-box sb-demo-box--sm">Card Alpha</div>
            <div class="sb-demo-box sb-demo-box--sm">Card Beta</div>
          </div>
        </div>
      </div>
    </div>
  `,
};

/**
 * 3. Gap Scale Hierarchy
 */
export const GapScaleHierarchy: Story = {
  render: () => `
    <div class="sb-demo-group wrapper wrapper--lg">
      <div class="sb-demo-section">
        <h3 class="sb-demo-heading">2D Gap Scale Comparison</h3>
        <p class="sb-demo-desc">
          Managing both row and column gutters uniformly with tokens.
        </p>
      </div>

      <div class="grid grid--sm">
        <!-- Tight (0) -->
        <div class="card card--bordered">
          <article class="card__content">
            <header class="card__header">
              <h4 class="card__title font-size-sm">1. Tight (0 gap)</h4>
              <p class="card__subtitle font-size-xs"><code>.grid--tight</code></p>
            </header>
            <div class="card__body">
              <div class="grid grid--2xs grid--tight sb-demo-inspect-gap">
                <div class="sb-demo-box sb-demo-box--sm" style="border-radius: 0;">P1</div>
                <div class="sb-demo-box sb-demo-box--sm" style="border-radius: 0;">P2</div>
                <div class="sb-demo-box sb-demo-box--sm" style="border-radius: 0;">P3</div>
                <div class="sb-demo-box sb-demo-box--sm" style="border-radius: 0;">P4</div>
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
              <div class="grid grid--2xs sb-demo-inspect-gap" style="--gap: var(--spacing-8);">
                <div class="sb-demo-box sb-demo-box--sm">T1</div>
                <div class="sb-demo-box sb-demo-box--sm">T2</div>
                <div class="sb-demo-box sb-demo-box--sm">T3</div>
                <div class="sb-demo-box sb-demo-box--sm">T4</div>
              </div>
            </div>
          </article>
        </div>

        <!-- Default (1rem) -->
        <div class="card card--bordered">
          <article class="card__content">
            <header class="card__header">
              <h4 class="card__title font-size-sm">3. Default (1rem)</h4>
              <p class="card__subtitle font-size-xs"><code>.grid</code> (Standard)</p>
            </header>
            <div class="card__body">
              <div class="grid grid--2xs sb-demo-inspect-gap">
                <div class="sb-demo-box sb-demo-box--sm">Cell 1</div>
                <div class="sb-demo-box sb-demo-box--sm">Cell 2</div>
                <div class="sb-demo-box sb-demo-box--sm">Cell 3</div>
                <div class="sb-demo-box sb-demo-box--sm">Cell 4</div>
              </div>
            </div>
          </article>
        </div>

        <!-- Cushioned (4rem) -->
        <div class="card card--bordered">
          <article class="card__content">
            <header class="card__header">
              <h4 class="card__title font-size-sm">4. Cushioned (4rem)</h4>
              <p class="card__subtitle font-size-xs"><code>.grid--cushioned</code></p>
            </header>
            <div class="card__body">
              <div class="grid grid--xs grid--cushioned sb-demo-inspect-gap">
                <div class="sb-demo-box sb-demo-box--sm">Feature A</div>
                <div class="sb-demo-box sb-demo-box--sm">Feature B</div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  `,
};

/**
 * 4. Native Ruled 2D Dividers
 */
export const RuledDividers: Story = {
  render: () => `
    <div class="sb-demo-group wrapper wrapper--md">
      <div class="sb-demo-section">
        <h3 class="sb-demo-heading">Native 2D Dividers via CSS <code>rule</code></h3>
        <p class="sb-demo-desc">
          <code>.grid--ruled</code> renders both column and row divider rules between cells natively without extra border hacks.
        </p>
      </div>

      <div class="card card--bordered padding">
        <h4 class="font-size-sm font-weight-bold margin-bottom-sm">Standard Ruled 2D Grid</h4>
        <div class="grid grid--xs grid--ruled">
          <div class="padding-block-xs">
            <p class="font-weight-bold font-size-sm">Phase 1: Architecture</p>
            <p class="font-size-xs text-muted">Foundational tokens & primitives.</p>
          </div>
          <div class="padding-block-xs">
            <p class="font-weight-bold font-size-sm">Phase 2: Components</p>
            <p class="font-size-xs text-muted">Accessible native controls.</p>
          </div>
          <div class="padding-block-xs">
            <p class="font-weight-bold font-size-sm">Phase 3: Integration</p>
            <p class="font-size-xs text-muted">Figma & agent workflow sync.</p>
          </div>
          <div class="padding-block-xs">
            <p class="font-weight-bold font-size-sm">Phase 4: Auditing</p>
            <p class="font-size-xs text-muted">Automated axe-core compliance.</p>
          </div>
        </div>
      </div>

      <div class="card card--bordered padding">
        <h4 class="font-size-sm font-weight-bold margin-bottom-sm">Tight Ruled Matrix (<code>.grid--ruled.grid--tight</code>)</h4>
        <div class="grid grid--2xs grid--ruled grid--tight">
          <div class="padding-block-xs font-size-xs">WCAG 1.1</div>
          <div class="padding-block-xs font-size-xs">WCAG 1.2</div>
          <div class="padding-block-xs font-size-xs">WCAG 1.3</div>
          <div class="padding-block-xs font-size-xs">WCAG 1.4</div>
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
        <h3 class="sb-demo-heading">Spacing Modifiers (<code>.grid--tight</code>, <code>.grid--cushioned</code>)</h3>
        <p class="sb-demo-desc">
          Set grid gaps across columns and rows using direct modifiers.
        </p>
      </div>

      <div class="grid grid--sm">
        <div class="card card--bordered padding">
          <h4 class="font-size-sm font-weight-bold margin-bottom-sm">Modifier: <code>.grid--tight</code></h4>
          <div class="grid grid--2xs grid--tight sb-demo-inspect-gap">
            <div class="sb-demo-box sb-demo-box--sm">Tile A</div>
            <div class="sb-demo-box sb-demo-box--sm">Tile B</div>
            <div class="sb-demo-box sb-demo-box--sm">Tile C</div>
          </div>
        </div>

        <div class="card card--bordered padding">
          <h4 class="font-size-sm font-weight-bold margin-bottom-sm">Modifier: <code>.grid--cushioned</code></h4>
          <div class="grid grid--xs grid--cushioned sb-demo-inspect-gap">
            <div class="sb-demo-box sb-demo-box--sm">Spacious A</div>
            <div class="sb-demo-box sb-demo-box--sm">Spacious B</div>
          </div>
        </div>
      </div>
    </div>
  `,
};

/**
 * 6. Real-World Recipe: Feature Card Catalog
 */
export const CardCatalog: Story = {
  render: () => `
    <div class="sb-demo-group wrapper wrapper--lg">
      <div class="sb-demo-section">
        <h3 class="sb-demo-heading">Real-World Pattern: Responsive Feature Card Grid</h3>
        <p class="sb-demo-desc">
          Cards automatically wrap into 1, 2, or 3 columns based on container bounds.
        </p>
      </div>

      <ul class="grid grid--sm" role="list">
        <li>
          <div class="card card--bordered">
            <article class="card__content stack">
              <header class="card__header">
                <hgroup class="card__hgroup">
                  <h4 class="card__title small-heading">Design Tokens</h4>
                  <p class="card__subtitle">DTCG Specification</p>
                </hgroup>
                <span class="chip"><span class="chip__text">Tier 1-3</span></span>
              </header>
              <div class="card__body">
                <p class="font-size-sm">
                  Synchronizes palettes, fluid scales, and component properties with Figma Variables and CSS custom properties.
                </p>
              </div>
              <footer class="card__footer">
                <button type="button" class="button button--subtle button--sm"><span>Read Spec</span></button>
              </footer>
            </article>
          </div>
        </li>

        <li>
          <div class="card card--bordered">
            <article class="card__content stack">
              <header class="card__header">
                <hgroup class="card__hgroup">
                  <h4 class="card__title small-heading">WCAG 2.2 Level AAA</h4>
                  <p class="card__subtitle">Digital Accessibility</p>
                </hgroup>
                <span class="status status--success"><span class="status__text">Compliant</span></span>
              </header>
              <div class="card__body">
                <p class="font-size-sm">
                  Rigorous 7:1 text contrast ratios, 3:1 high-contrast focus rings, and zero-JS keyboard accessible controls.
                </p>
              </div>
              <footer class="card__footer">
                <button type="button" class="button button--subtle button--sm"><span>Audit Checklist</span></button>
              </footer>
            </article>
          </div>
        </li>

        <li>
          <div class="card card--bordered">
            <article class="card__content stack">
              <header class="card__header">
                <hgroup class="card__hgroup">
                  <h4 class="card__title small-heading">Layout Primitives</h4>
                  <p class="card__subtitle">Compositional 1D/2D</p>
                </hgroup>
                <span class="chip"><span class="chip__text">Modern CSS</span></span>
              </header>
              <div class="card__body">
                <p class="font-size-sm">
                  Stack, Cluster, Inline, Grid, and Split primitives built on zero-specificity :where() and container queries.
                </p>
              </div>
              <footer class="card__footer">
                <button type="button" class="button button--subtle button--sm"><span>View Primitives</span></button>
              </footer>
            </article>
          </div>
        </li>
      </ul>
    </div>
  `,
};

/**
 * 7. Real-World Recipe: KPI & Metric Tiles
 */
export const MetricTiles: Story = {
  render: () => `
    <div class="sb-demo-group wrapper wrapper--lg">
      <div class="sb-demo-section">
        <h3 class="sb-demo-heading">Real-World Pattern: KPI & Analytics Tiles</h3>
        <p class="sb-demo-desc">
          Using <code>.grid--xs</code> (min 16rem) to build an auto-fitting dashboard statistics row.
        </p>
      </div>

      <div class="grid grid--xs">
        <div class="card card--bordered padding">
          <p class="font-size-xs text-muted font-weight-bold">AXE RULE COVERAGE</p>
          <div class="inline" style="justify-content: space-between; align-items: baseline; margin-top: var(--spacing-8);">
            <p class="font-size-2 font-weight-bold">92 / 92</p>
            <span class="status status--success"><span class="status__text">100%</span></span>
          </div>
        </div>

        <div class="card card--bordered padding">
          <p class="font-size-xs text-muted font-weight-bold">FOCUS CLEARANCE</p>
          <div class="inline" style="justify-content: space-between; align-items: baseline; margin-top: var(--spacing-8);">
            <p class="font-size-2 font-weight-bold">4.8 : 1</p>
            <span class="status status--accent"><span class="status__text">AAA</span></span>
          </div>
        </div>

        <div class="card card--bordered padding">
          <p class="font-size-xs text-muted font-weight-bold">FIGMA TOKEN SYNC</p>
          <div class="inline" style="justify-content: space-between; align-items: baseline; margin-top: var(--spacing-8);">
            <p class="font-size-2 font-weight-bold">489</p>
            <span class="status status--subtle"><span class="status__text">Synced</span></span>
          </div>
        </div>
      </div>
    </div>
  `,
};

/**
 * 8. Comprehensive State & Audit Matrix
 */
export const StateMatrix: Story = {
  render: () => `
    <div class="sb-demo-group wrapper wrapper--lg">
      <div class="sb-demo-section">
        <h3 class="sb-demo-heading">Automated Accessibility & State Verification Matrix</h3>
        <p class="sb-demo-desc">
          Consolidated snapshot testing across all Grid modifiers, gaps, and semantic parent wrappers.
        </p>
      </div>

      <div class="grid grid--sm">
        <div class="card card--bordered padding stack">
          <h4 class="font-size-xs font-weight-bold">Standard Grid (xs)</h4>
          <div class="grid grid--2xs sb-demo-inspect-gap">
            <div class="sb-demo-box sb-demo-box--sm">Alpha</div>
            <div class="sb-demo-box sb-demo-box--sm">Beta</div>
          </div>
        </div>

        <div class="card card--bordered padding stack">
          <h4 class="font-size-xs font-weight-bold">Tight Grid (2xs)</h4>
          <div class="grid grid--2xs grid--tight sb-demo-inspect-gap">
            <div class="sb-demo-box sb-demo-box--sm">Alpha</div>
            <div class="sb-demo-box sb-demo-box--sm">Beta</div>
          </div>
        </div>

        <div class="card card--bordered padding stack">
          <h4 class="font-size-xs font-weight-bold">Ruled Grid (2xs)</h4>
          <div class="grid grid--2xs grid--ruled">
            <div class="padding-block-xs font-size-xs">Alpha</div>
            <div class="padding-block-xs font-size-xs">Beta</div>
          </div>
        </div>

        <div class="card card--bordered padding stack">
          <h4 class="font-size-xs font-weight-bold">Tight Grid (Modifier)</h4>
          <div class="grid grid--2xs grid--tight sb-demo-inspect-gap">
            <div class="sb-demo-box sb-demo-box--sm">Alpha</div>
            <div class="sb-demo-box sb-demo-box--sm">Beta</div>
          </div>
        </div>
      </div>
    </div>
  `,
};

/**
 * 9. Grid Carousel (Horizontal Snap-Scroller)
 * Demonstrating single-row card scroller with scroll-snap and card peeking.
 */
export const GridCarousel: Story = {
  render: () => `
    <div class="sb-demo-group wrapper wrapper--lg">
      <div class="sb-demo-section">
        <h3 class="sb-demo-heading">Grid Carousel (.grid--carousel)</h3>
        <p class="sb-demo-desc">
          Single-row horizontal scroll-snapping card carousel powered by <code>display: grid</code> and <code>grid-auto-flow: column</code>.
          Cards maintain equal heights without wrapping, and trailing cards peek into view to invite horizontal interaction.
        </p>
      </div>

      <!-- Unconditional Snap Carousel -->
      <div class="grid grid--carousel">
        <div class="card card--compact card--bordered card--ruled">
          <article class="card__content">
            <header class="card__header">
              <hgroup class="card__hgroup">
                <h4 class="card__title subheading">Plot Occupancy</h4>
                <p class="card__subtitle text-muted">Spring 2026</p>
              </hgroup>
              <span class="status status--success"><span class="status__text">87.5%</span></span>
            </header>
            <div class="card__body">
              <div class="font-size-2 font-weight-bold font-mono">42 / 48</div>
              <p class="text-muted" style="margin: 0;">Active plot leases</p>
            </div>
          </article>
        </div>

        <div class="card card--compact card--bordered card--ruled">
          <article class="card__content">
            <header class="card__header">
              <hgroup class="card__hgroup">
                <h4 class="card__title subheading">Pending Renewals</h4>
                <p class="card__subtitle text-muted">Action Required</p>
              </hgroup>
              <span class="status status--warning"><span class="status__text">7 Due</span></span>
            </header>
            <div class="card__body">
              <div class="font-size-2 font-weight-bold font-mono">7 Plots</div>
              <p class="text-muted" style="margin: 0;">Awaiting verification</p>
            </div>
          </article>
        </div>

        <div class="card card--compact card--bordered card--ruled">
          <article class="card__content">
            <header class="card__header">
              <hgroup class="card__hgroup">
                <h4 class="card__title subheading">Tool Locker</h4>
                <p class="card__subtitle text-muted">Communal Shed</p>
              </hgroup>
              <span class="status status--danger"><span class="status__text">2 Overdue</span></span>
            </header>
            <div class="card__body">
              <div class="font-size-2 font-weight-bold font-mono">5 Out</div>
              <p class="text-muted" style="margin: 0;">Shared tools borrowed</p>
            </div>
          </article>
        </div>

        <div class="card card--compact card--bordered card--ruled">
          <article class="card__content">
            <header class="card__header">
              <hgroup class="card__hgroup">
                <h4 class="card__title subheading">Cistern Reserve</h4>
                <p class="card__subtitle text-muted">Rainwater Collection</p>
              </hgroup>
              <span class="status status--accent"><span class="status__text">78%</span></span>
            </header>
            <div class="card__body">
              <div class="font-size-2 font-weight-bold font-mono">7,850 L</div>
              <p class="text-muted" style="margin: 0;">Optimal supply</p>
            </div>
          </article>
        </div>

        <div class="card card--compact card--bordered card--ruled">
          <article class="card__content">
            <header class="card__header">
              <hgroup class="card__hgroup">
                <h4 class="card__title subheading">Compost Station</h4>
                <p class="card__subtitle text-muted">Bay 3 Aeration</p>
              </hgroup>
              <span class="status status--success"><span class="status__text">Hot</span></span>
            </header>
            <div class="card__body">
              <div class="font-size-2 font-weight-bold font-mono">140°F</div>
              <p class="text-muted" style="margin: 0;">Active thermophilic phase</p>
            </div>
          </article>
        </div>
      </div>
    </div>
  `,
};

