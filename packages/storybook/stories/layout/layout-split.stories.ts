import type { Meta, StoryObj } from '@storybook/html';

interface SplitArgs {
  placement: 'start' | 'end';
  sidebarSize: '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  gap: 'tight' | 'compact' | 'default' | 'comfortable' | 'cushioned';
  variant: 'wrapping' | 'nowrap' | 'three';
  modifier: 'none' | 'split--tight' | 'split--cushioned' | 'split--ruled';
  inspectGap: boolean;
}

const meta: Meta<SplitArgs> = {
  title: 'Layout/Split',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
### Developer & Designer Notes: Split & Sidebar Layout Primitive (\`.split\`)

The **Split** primitive creates an intrinsically responsive two-column layout consisting of a preferred-width sidebar and an auto-expanding main workspace pane.

Inspired by **Every Layout** (Heydon Pickering & Andy Bell) and modern CSS Flexbox/Container Query standards, the Split uses a mathematically balanced \`flex-grow\` relationship:
- **Sidebar:** \`flex-basis: var(--split-sidebar-width); flex-grow: 1;\`
- **Main Pane:** \`flex-basis: 0; flex-grow: 999; min-inline-size: min(var(--split-main-min-width), 100%);\`

When available width exceeds the sum of the sidebar and the main pane's minimum threshold, the two columns sit side-by-side with the main pane expanding to fill all available room.
When space is constrained, the main pane gracefully **drops beneath the sidebar into a vertical stack** without requiring hardcoded viewport media queries.

Defined in \`layout/split.css\`.

---

#### 1. Core Architectural Principles
1. **Intrinsically Responsive (Zero-Breakpoint):** Automatically stacks when container space drops below \`(sidebar-width + main-min-width)\`.
2. **Flexible Sidebar Widths:** Supports 7 standardized spacing block tiers (\`.split--2xs\` through \`.split--2xl\`).
3. **Start or End Sidebar:** Place the sidebar at the leading edge (navigation) or trailing edge (inspector/properties pane via \`.split--end\`).
4. **Triple Split Layout (\`.split--three\`):** 3-column orchestrator (Fixed Start &middot; Fluid Center &middot; Fixed End) perfect for application headers, action toolbars, and search bars.
5. **Zero-Specificity Reset (\`:where()\`)**: Completely author-overridable without specificity fights.

---

#### 2. Canonical Semantic Markup Signatures
AI agents and developers MUST use the following semantic patterns:

\`\`\`html
<!-- 1. Leading Navigation Sidebar + Main Workspace -->
<div class="split split--xs">
  <aside class="card card--bordered padding">
    <nav aria-label="Documentation sections">...</nav>
  </aside>
  <main class="card card--bordered padding">
    <article>...</article>
  </main>
</div>

<!-- 2. Trailing Inspector / Properties Sidebar -->
<div class="split split--end split--xs">
  <main class="card card--bordered padding">
    <h3>Canvas Workspace</h3>
  </main>
  <aside class="card card--bordered padding">
    <h4>Inspector Properties</h4>
  </aside>
</div>

<!-- 3. Triple Split Application Header Bar -->
<header class="split split--three split--sm">
  <div class="inline"><a href="/" class="font-weight-bold">Brand</a></div>
  <div><input type="search" class="input w-full" placeholder="Search..." /></div>
  <div class="cluster" style="justify-content: flex-end;">
    <button type="button" class="button button--strong button--accent"><span>Profile</span></button>
  </div>
</header>
\`\`\`

---

#### 3. Sidebar Width Scale (\`.split--*\`)

| Class Modifier | Token Reference | Sidebar Width | Main Min-Width |
| :--- | :--- | :--- | :--- |
| \`.split--2xs\` | \`--spacing-block-2xs\` | \`8rem\` (128px) | \`16rem\` (256px) |
| \`.split--xs\` | \`--spacing-block-xs\` | \`16rem\` (256px) | \`24rem\` (384px) |
| \`.split--sm\` | \`--spacing-block-sm\` | \`24rem\` (384px) | \`32rem\` (512px) |
| \`.split\` / \`.split--md\` | \`--spacing-block\` | \`36rem\` (576px) | \`40rem\` (640px) |
| \`.split--lg\` | \`--spacing-block-lg\` | \`48rem\` (768px) | \`48rem\` (768px) |
| \`.split--xl\` | \`--spacing-block-xl\` | \`64rem\` (1024px) | \`56rem\` (896px) |
| \`.split--2xl\` | \`--spacing-block-2xl\` | \`80rem\` (1280px) | \`64rem\` (1024px) |

---

#### 4. WCAG 2.2 Accessibility Guidelines
- **Landmark Semantics (WCAG 1.3.1):** When using \`.split\` for page layouts, structure the elements using semantic landmarks: \`<nav>\` or \`<aside>\` for sidebars and \`<main>\` for the primary pane.
- **Reading Order (WCAG 2.4.3 Focus Order):** When using \`.split--end\`, ensure the primary reading content in \`<main>\` precedes the secondary inspector in the DOM sequence.
        `,
      },
    },
  },
  args: {
    placement: 'start',
    sidebarSize: 'xs',
    gap: 'default',
    variant: 'wrapping',
    modifier: 'none',
    inspectGap: false,
  },
  argTypes: {
    placement: {
      control: 'select',
      options: ['start', 'end'],
      description: 'Sidebar position: start (left) vs end (right via .split--end)',
    },
    sidebarSize: {
      control: 'select',
      options: ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Sidebar preferred width tier (.split--*)',
    },
    gap: {
      control: 'select',
      options: ['tight', 'compact', 'default', 'comfortable', 'cushioned'],
      description: 'Gutter spacing between columns',
    },
    variant: {
      control: 'select',
      options: ['wrapping', 'nowrap', 'three'],
      description: 'Layout behavior: auto-wrapping, rigid .split--nowrap, or 3-column .split--three',
    },
    modifier: {
      control: 'select',
      options: ['none', 'split--tight', 'split--cushioned', 'split--ruled'],
      description: 'Predefined modifier class',
    },
    inspectGap: {
      control: 'boolean',
      description: 'Visual layout inspector: highlights column gap area with purple diagnostic stripes',
    },
  },
};

export default meta;
type Story = StoryObj<SplitArgs>;

/**
 * 1. Interactive Playground (Live Sandbox)
 */
export const Playground: Story = {
  render: (args) => {
    const gapTokenMap: Record<string, string> = {
      tight: '0',
      compact: 'var(--spacing-8, 0.5rem)',
      default: 'var(--spacing-cushion, 1.5rem)',
      comfortable: 'var(--spacing-24, 1.5rem)',
      cushioned: 'var(--spacing-cushion, 4rem)',
    };

    const sizeClass = `split--${args.sidebarSize}`;
    const placementClass = args.placement === 'end' ? 'split--end' : '';
    const variantClass = args.variant === 'nowrap' ? 'split--nowrap' : args.variant === 'three' ? 'split--three' : '';
    const modifierClass = args.modifier !== 'none' ? args.modifier : '';
    const inspectClass = args.inspectGap ? 'sb-demo-inspect-gap' : '';
    const customGap = args.modifier === 'none' && args.gap !== 'default' ? `--gap: ${gapTokenMap[args.gap]};` : '';

    const isThree = args.variant === 'three';

    const content = isThree
      ? `
        <div class="sb-demo-box sb-demo-box--start padding" style="min-inline-size: 10rem;">
          <p class="font-weight-bold font-size-sm">Start Column</p>
          <p class="font-size-xs text-muted">Fixed / auto width</p>
        </div>
        <div class="sb-demo-box sb-demo-box--center-tint padding">
          <p class="font-weight-bold font-size-sm">Center Main Pane</p>
          <p class="font-size-xs text-muted">Fills remaining available width</p>
        </div>
        <div class="sb-demo-box sb-demo-box--end-tint padding" style="min-inline-size: 10rem;">
          <p class="font-weight-bold font-size-sm">End Column</p>
          <p class="font-size-xs text-muted">Fixed / auto width</p>
        </div>
      `
      : args.placement === 'end'
        ? `
        <div class="sb-demo-box sb-demo-box--center-tint padding">
          <p class="font-weight-bold font-size-sm">Main Workspace Pane</p>
          <p class="font-size-xs text-muted">Expands dynamically with flex-grow: 999.</p>
        </div>
        <div class="sb-demo-box sb-demo-box--end-tint padding">
          <p class="font-weight-bold font-size-sm">Trailing Sidebar</p>
          <p class="font-size-xs text-muted">Basis: ${args.sidebarSize} tier</p>
        </div>
      `
        : `
        <div class="sb-demo-box sb-demo-box--start padding">
          <p class="font-weight-bold font-size-sm">Leading Sidebar</p>
          <p class="font-size-xs text-muted">Basis: ${args.sidebarSize} tier</p>
        </div>
        <div class="sb-demo-box sb-demo-box--center-tint padding">
          <p class="font-weight-bold font-size-sm">Main Workspace Pane</p>
          <p class="font-size-xs text-muted">Expands dynamically with flex-grow: 999.</p>
        </div>
      `;

    return `
      <div class="sb-demo-section wrapper wrapper--lg">
        <p class="sb-demo-desc">
          Live Sandbox: Test sidebar placement, sizing scale, and fluid auto-wrapping as container width narrows.
        </p>
        <div class="sb-demo-stage sb-demo-stage--lg" style="container-type: inline-size;">
          <div class="split ${sizeClass} ${placementClass} ${variantClass} ${modifierClass} ${inspectClass}" style="${customGap}; inline-size: 100%;">
            ${content}
          </div>
        </div>
      </div>
    `;
  },
};

/**
 * 2. Sidebar Sizing Scale Hierarchy
 */
export const SidebarSizingHierarchy: Story = {
  render: () => `
    <div class="sb-demo-group wrapper wrapper--lg">
      <div class="sb-demo-section">
        <h3 class="sb-demo-heading">Sidebar Width Scale Comparison</h3>
        <p class="sb-demo-desc">
          From micro icon columns to generous documentation navigation panels.
        </p>
      </div>

      <div class="stack gap">
        <!-- 2xs (8rem) -->
        <div class="card card--bordered padding" style="container-type: inline-size;">
          <h4 class="font-size-xs font-weight-bold margin-bottom-xs">1. Narrow: .split--2xs (8rem / 128px)</h4>
          <div class="split split--2xs sb-demo-inspect-gap">
            <div class="sb-demo-box sb-demo-box--sm">Rail (8rem)</div>
            <div class="sb-demo-box sb-demo-box--sm">Main Workspace Pane</div>
          </div>
        </div>

        <!-- xs (16rem) -->
        <div class="card card--bordered padding" style="container-type: inline-size;">
          <h4 class="font-size-xs font-weight-bold margin-bottom-xs">2. Compact: .split--xs (16rem / 256px)</h4>
          <div class="split split--xs sb-demo-inspect-gap">
            <div class="sb-demo-box sb-demo-box--sm">Filter Sidebar (16rem)</div>
            <div class="sb-demo-box sb-demo-box--sm">Main Workspace Pane</div>
          </div>
        </div>

        <!-- sm (24rem) -->
        <div class="card card--bordered padding" style="container-type: inline-size;">
          <h4 class="font-size-xs font-weight-bold margin-bottom-xs">3. Standard: .split--sm (24rem / 384px)</h4>
          <div class="split split--sm sb-demo-inspect-gap">
            <div class="sb-demo-box sb-demo-box--sm">Nav Panel (24rem)</div>
            <div class="sb-demo-box sb-demo-box--sm">Main Workspace Pane</div>
          </div>
        </div>
      </div>
    </div>
  `,
};

/**
 * 3. Leading vs Trailing Placement
 */
export const PlacementStartVsEnd: Story = {
  render: () => `
    <div class="sb-demo-group wrapper wrapper--lg">
      <div class="sb-demo-section">
        <h3 class="sb-demo-heading">Sidebar Placement: Leading vs Trailing</h3>
        <p class="sb-demo-desc">
          Standard sidebar on the left (navigation) vs <code>.split--end</code> on the right (inspector/details).
        </p>
      </div>

      <div class="grid grid--sm">
        <!-- Leading Sidebar -->
        <div class="card card--bordered padding stack" style="container-type: inline-size;">
          <h4 class="font-size-xs font-weight-bold">Leading Sidebar (Default)</h4>
          <div class="split split--xs sb-demo-inspect-gap">
            <div class="sb-demo-box sb-demo-box--sm">Navigation</div>
            <div class="sb-demo-box sb-demo-box--sm">Article Body</div>
          </div>
        </div>

        <!-- Trailing Sidebar -->
        <div class="card card--bordered padding stack" style="container-type: inline-size;">
          <h4 class="font-size-xs font-weight-bold">Trailing Sidebar (<code>.split--end</code>)</h4>
          <div class="split split--end split--xs sb-demo-inspect-gap">
            <div class="sb-demo-box sb-demo-box--sm">Article Body</div>
            <div class="sb-demo-box sb-demo-box--sm">Table of Contents</div>
          </div>
        </div>
      </div>
    </div>
  `,
};

/**
 * 4. Triple Split Layout (.split--three)
 */
export const TripleSplitLayout: Story = {
  render: () => `
    <div class="sb-demo-group wrapper wrapper--lg">
      <div class="sb-demo-section">
        <h3 class="sb-demo-heading">Triple Split Layout (<code>.split--three</code>)</h3>
        <p class="sb-demo-desc">
          3-column orchestrator: Fixed start column, fluid auto-expanding center column, and fixed end column.
        </p>
      </div>

      <div class="card card--bordered padding">
        <div class="split split--three split--2xs" style="align-items: center; --gap: var(--spacing-16);">
          <!-- Start: Logo & Brand -->
          <div class="inline" style="--gap: var(--spacing-8);">
            <div class="avatar" data-status="online"><span>DF</span></div>
            <span class="font-weight-bold font-size-sm">Design For Humans</span>
          </div>

          <!-- Center: Fluid Search Input -->
          <div>
            <input type="search" class="input w-full" placeholder="Search tokens, components, guides..." />
          </div>

          <!-- End: Actions & Avatar -->
          <div class="cluster" style="justify-content: flex-end; --gap: var(--spacing-8);">
            <button type="button" class="button button--subtle button--icon" aria-label="Notifications">
              <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Bell"/></svg>
            </button>
            <button type="button" class="button button--strong button--accent button--sm">
              <span>Deploy</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
};

/**
 * 5. Native Ruled Dividers
 */
export const RuledDividers: Story = {
  render: () => `
    <div class="sb-demo-group wrapper wrapper--lg">
      <div class="sb-demo-section">
        <h3 class="sb-demo-heading">Native Dividers via CSS <code>rule</code></h3>
        <p class="sb-demo-desc">
          <code>.split--ruled</code> inserts vertical hairline column separators between the sidebar and the main pane.
        </p>
      </div>

      <div class="card card--bordered padding" style="container-type: inline-size;">
        <div class="split split--xs split--ruled" style="--gap: var(--spacing-24);">
          <div class="stack" style="--gap: var(--spacing-8);">
            <p class="font-weight-bold font-size-sm">Sidebar Index</p>
            <a href="#" class="link" onclick="event.preventDefault();"><span>Design Tokens</span></a>
            <a href="#" class="link" onclick="event.preventDefault();"><span>Layout Primitives</span></a>
            <a href="#" class="link" onclick="event.preventDefault();"><span>Components</span></a>
          </div>

          <div>
            <h4 class="font-weight-bold">Main Workspace Pane</h4>
            <p class="font-size-sm text-muted margin-top-xs">
              Notice the native vertical rule separator dividing the columns without extra border styles.
            </p>
          </div>
        </div>
      </div>
    </div>
  `,
};

/**
 * 6. Real-World Recipe: Filter Sidebar + Catalog
 */
export const FilterSidebarRecipe: Story = {
  render: () => `
    <div class="sb-demo-group wrapper wrapper--lg">
      <div class="sb-demo-section">
        <h3 class="sb-demo-heading">Real-World Pattern: Filter Sidebar + Catalog Grid</h3>
        <p class="sb-demo-desc">
          On wide screens, the filters sit as a sticky column; on narrow screens, they naturally stack above the results.
        </p>
      </div>

      <div class="split split--xs" style="--gap: var(--spacing-24);">
        <!-- Sidebar Filter Pane -->
        <aside class="card card--bordered padding stack" style="--gap: var(--spacing-16);">
          <div class="cluster" style="justify-content: space-between; align-items: center;">
            <p class="font-weight-bold font-size-sm">Filters</p>
            <button type="button" class="button button--subtle font-size-xs"><span>Reset</span></button>
          </div>

          <fieldset class="fieldset">
            <legend class="legend">Standard Level</legend>
            <div class="choices stack" style="--gap: var(--spacing-8);">
              <label class="choice" for="flt-aa">
                <input type="checkbox" id="flt-aa" class="checkbox-input" checked />
                <span>WCAG 2.2 AA</span>
              </label>
              <label class="choice" for="flt-aaa">
                <input type="checkbox" id="flt-aaa" class="checkbox-input" checked />
                <span>WCAG 2.2 AAA</span>
              </label>
            </div>
          </fieldset>
        </aside>

        <!-- Main Catalog Results -->
        <main class="stack" style="--gap: var(--spacing-16);">
          <div class="cluster" style="justify-content: space-between; align-items: center;">
            <p class="font-size-sm text-muted">Showing <strong>3</strong> matching deliverables</p>
            <button type="button" class="button button--subtle button--sm"><span>Sort by Date</span></button>
          </div>

          <ul class="grid grid--xs" role="list">
            <li>
              <div class="card card--bordered padding stack" style="--gap: var(--spacing-8);">
                <span class="status status--success"><span class="status__text">Passing</span></span>
                <h5 class="font-weight-bold font-size-sm">Color Contrast Matrix</h5>
                <p class="font-size-xs text-muted">Zero failures across light-dark palettes.</p>
              </div>
            </li>
            <li>
              <div class="card card--bordered padding stack" style="--gap: var(--spacing-8);">
                <span class="status status--success"><span class="status__text">Passing</span></span>
                <h5 class="font-weight-bold font-size-sm">Focus Indicators</h5>
                <p class="font-size-xs text-muted">High-contrast 3:1 focus ring clearance.</p>
              </div>
            </li>
          </ul>
        </main>
      </div>
    </div>
  `,
};

/**
 * 7. Comprehensive State & Audit Matrix
 */
export const StateMatrix: Story = {
  render: () => `
    <div class="sb-demo-group wrapper wrapper--lg">
      <div class="sb-demo-section">
        <h3 class="sb-demo-heading">Automated Accessibility & State Verification Matrix</h3>
        <p class="sb-demo-desc">
          Consolidated snapshot testing across all Split modifiers, gaps, and placements.
        </p>
      </div>

      <div class="grid grid--sm">
        <div class="card card--bordered padding stack" style="container-type: inline-size;">
          <h4 class="font-size-xs font-weight-bold">Standard Split (xs)</h4>
          <div class="split split--2xs sb-demo-inspect-gap">
            <div class="sb-demo-box sb-demo-box--sm">Sidebar</div>
            <div class="sb-demo-box sb-demo-box--sm">Main Pane</div>
          </div>
        </div>

        <div class="card card--bordered padding stack" style="container-type: inline-size;">
          <h4 class="font-size-xs font-weight-bold">Reverse Split (.split--end)</h4>
          <div class="split split--end split--2xs sb-demo-inspect-gap">
            <div class="sb-demo-box sb-demo-box--sm">Main Pane</div>
            <div class="sb-demo-box sb-demo-box--sm">Sidebar</div>
          </div>
        </div>

        <div class="card card--bordered padding stack" style="container-type: inline-size;">
          <h4 class="font-size-xs font-weight-bold">Tight Split</h4>
          <div class="split split--2xs split--tight sb-demo-inspect-gap">
            <div class="sb-demo-box sb-demo-box--sm">Sidebar</div>
            <div class="sb-demo-box sb-demo-box--sm">Main Pane</div>
          </div>
        </div>

        <div class="card card--bordered padding stack" style="container-type: inline-size;">
          <h4 class="font-size-xs font-weight-bold">Ruled Split</h4>
          <div class="split split--2xs split--ruled">
            <div class="sb-demo-box sb-demo-box--sm">Sidebar</div>
            <div class="sb-demo-box sb-demo-box--sm">Main Pane</div>
          </div>
        </div>
      </div>
    </div>
  `,
};
