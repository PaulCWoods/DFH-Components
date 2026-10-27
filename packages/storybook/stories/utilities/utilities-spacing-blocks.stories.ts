import type { Meta, StoryObj } from '@storybook/html';

interface SpacingBlockArgs {
  dimensionType: 'square' | 'width' | 'height';
  size: 'unit' | 'target' | '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'fill' | 'stretch';
  semanticAlias: 'none' | 'popover' | 'sidebar' | 'dialog' | 'prose' | 'wide' | 'shell';
}

const meta: Meta<SpacingBlockArgs> = {
  title: 'Utilities/Spacing Blocks',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
### Developer & Designer Notes: Spacing Block & Dimension Utilities

The **Spacing Block** utilities provide zero-specificity (\`:where()\`) classes for macro logical dimensions, square block presets, semantic width aliases (popovers, sidebars, dialogs, prose, shells), and blowout-safe constraints.

Designed in strict compliance with **WCAG 2.2 Level AA / AAA** accessibility standards:
- **2.5.5 Target Size (Enhanced) (Level AAA):** \`.block-target\` provides the canonical 48×48px (\`3rem\`) touch bounding box.
- **2.5.8 Target Size (Minimum) (Level AA):** Minimum 24×24px tap boundaries.
- **1.4.10 Reflow (Level AA):** \`min-inline-size\` and \`max-inline-size\` utilities incorporate \`min(..., 100%)\` to prevent horizontal viewport blowout on mobile displays down to 320px.
- **1.4.8 Visual Presentation (Level AAA):** \`.width-prose\` (\`48rem\` / 768px) enforces an optimal line length (~65–75 characters) for cognitive ease and readability.

Defined in \`utilities/spacing-blocks.css\`.

---

#### 1. Core Architectural Principles
1. **Macro Logical Dimensions:** While \`spacing.css\` governs micro padding and margins (4px to 64px), \`spacing-blocks.css\` governs macro element dimensions (128px to 1280px) for layout primitives, cards, sidebars, and dialogs.
2. **Semantic Width Aliases:** Developers and AI agents can choose between numeric scale steps (\`.width-sm\`, \`.width-md\`) and expressive architectural aliases (\`.width-popover\`, \`.width-sidebar\`, \`.width-dialog\`, \`.width-prose\`, \`.width-shell\`).
3. **Blowout-Proof Constraints (\`min(..., 100%)\`):** Constraining width with \`min-inline-size: min(var(--spacing-block-sm), 100%)\` ensures elements occupy their designated width on wide screens while safely contracting to 100% on narrow mobile screens without triggering horizontal scrollbars.
4. **Logical Properties Exclusively:** All rules utilize \`inline-size\` and \`block-size\` to ensure complete compatibility with vertical writing modes and bidirectional LTR/RTL layouts.
5. **Zero-Specificity Reset (\`:where()\`)**: Written with 0-0-0 specificity so components, layout primitives, and inline styles override predictably.

---

#### 2. Comparison With Leading Design Systems

| Feature / System | DFH Spacing Blocks | Tailwind CSS | GitHub Primer | Every Layout |
| :--- | :--- | :--- | :--- | :--- |
| **Macro Hierarchy** | Tier 2 \`--spacing-block-*\` scale | Arbitrary \`w-*\` utility scale | Grid column utility classes | Fluid intrinsic sizing |
| **Semantic Aliases** | \`.width-popover\`, \`.width-sidebar\`, \`.width-dialog\`, \`.width-prose\` | \`max-w-prose\`, \`max-w-screen-*\` | Component-specific styling | Primitive component roles |
| **Blowout Protection** | Built-in \`min(..., 100%)\` on min/max | Requires manual \`max-w-full\` | Manual overflow containment | Algorithmic flex-basis min |
| **WCAG 2.5.5 Target** | Dedicated \`.block-target\` (48×48px) | Requires manual \`w-12 h-12\` | \`min-width: 48px\` on buttons | Not formalized as a token |
| **Specificity Model** | Zero-specificity (\`:where()\`) | Standard utility specificity | Standard utility specificity | CSS custom properties |

---

#### 3. Canonical Semantic Markup Signatures
AI agents and developers MUST use the following semantic patterns:

\`\`\`html
<!-- 1. Semantic Dropdown / Popover Width (16rem / 256px) -->
<div class="card card--bordered width-popover padding-sm">
  <ul class="stack gap-xs">...</ul>
</div>

<!-- 2. Accessible Optimal Reading Column (48rem / 768px, WCAG AAA) -->
<article class="prose width-prose margin-inline-auto padding">
  <h1>Readable Article</h1>
  <p>Constrained to optimal reading width to prevent eye fatigue.</p>
</article>

<!-- 3. Accessible Touch Target Bounding Box (48×48px, WCAG 2.5.5) -->
<button type="button" class="button block-target button--icon" aria-label="Settings">
  <svg class="icon"><use href="#Settings"/></svg>
</button>

<!-- 4. Blowout-Safe Sidebar Container -->
<aside class="width-sidebar min-width-sm max-width-full padding">
  <nav aria-label="Sidebar navigation">...</nav>
</aside>
\`\`\`

---

#### 4. Spacing Block Scale & Semantic Alias Reference

| Size Tier | Token Reference | Computed Dimension | Semantic Alias | Typical UI Application |
| :--- | :--- | :--- | :--- | :--- |
| **unit** | \`--spacing\` | 1rem (16px) | — | Micro icon box, spacing anchor |
| **target** | \`--spacing-target\` | 3rem (48px) | — | Touch targets (WCAG 2.5.5 Level AAA) |
| **2xs** | \`--spacing-block-2xs\` | 8rem (128px) | — | Avatar thumbnail, compact banner media |
| **xs** | \`--spacing-block-xs\` | 16rem (256px) | \`.width-popover\` | Dropdowns, menus, tooltips, flyout popovers |
| **sm** | \`--spacing-block-sm\` | 24rem (384px) | \`.width-sidebar\` | Navigation drawers, filter sidebars |
| **md** | \`--spacing-block\` | 36rem (576px) | \`.width-dialog\` | Modal dialogs, standard cards, forms |
| **lg** | \`--spacing-block-lg\` | 48rem (768px) | \`.width-prose\` | Optimal reading column (~65–75ch) |
| **xl** | \`--spacing-block-xl\` | 64rem (1024px) | \`.width-wide\` | Wide data views, split canvas regions |
| **2xl** | \`--spacing-block-2xl\` | 80rem (1280px) | \`.width-shell\` | Maximum application shell boundary |
| **fill** | \`100%\` | Fluid container size | — | Fills available parent dimension |
| **stretch** | \`stretch\` | Flex / Grid stretch | — | Intrinsic boundary expansion |
| **viewport** | \`100vi\` / \`100dvh\` | Dynamic viewport | — | Full screen viewport canvas |
        `,
      },
    },
  },
  argTypes: {
    dimensionType: {
      control: 'select',
      options: ['square', 'width', 'height'],
      description: 'Which dimension utility family to demonstrate.',
      table: { category: 'Dimension Family' },
    },
    size: {
      control: 'select',
      options: ['unit', 'target', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', 'fill', 'stretch'],
      description: 'Size scale tier.',
      table: { category: 'Scale Tier' },
    },
    semanticAlias: {
      control: 'select',
      options: ['none', 'popover', 'sidebar', 'dialog', 'prose', 'wide', 'shell'],
      description: 'Optional semantic alias class to apply.',
      table: { category: 'Semantic Alias' },
    },
  },
  args: {
    dimensionType: 'width',
    size: 'sm',
    semanticAlias: 'none',
  },
};

export default meta;
type Story = StoryObj<SpacingBlockArgs>;

/**
 * 1. Interactive Playground
 * Test square blocks, width presets, and semantic aliases live with interactive controls.
 */
export const Playground: Story = {
  render: (args) => {
    let appliedClass = '';

    if (args.semanticAlias !== 'none') {
      appliedClass = `width-${args.semanticAlias}`;
    } else {
      if (args.dimensionType === 'square') {
        appliedClass = `block-${args.size}`;
      } else if (args.dimensionType === 'width') {
        appliedClass = `width-${args.size}`;
      } else {
        appliedClass = `height-${args.size}`;
      }
    }

    return `
      <div class="stack gap-md" style="max-inline-size: 100%;">
        <!-- Status Bar -->
        <div class="card card--bordered padding-sm inline align-items-center justify-content-between" style="background: var(--surface-muted);">
          <div class="inline align-items-center gap-sm">
            <span class="badge badge--accent">${args.dimensionType.toUpperCase()}</span>
            <span class="font-size-sm">Active Class: <code>.${appliedClass}</code></span>
          </div>
          <span class="font-size-xs text-color-muted">Family: <strong>${args.dimensionType}</strong></span>
        </div>

        <!-- Render Container -->
        <div class="card card--bordered padding stack gap-sm" style="overflow-x: auto; background: var(--surface);">
          <div 
            class="${appliedClass} card card--bordered padding-sm stack gap-xs" 
            style="
              background: var(--surface-active); 
              border: 2px dashed var(--border-color-accent);
              max-inline-size: 100%;
            "
          >
            <div class="inline align-items-center justify-content-between">
              <strong class="font-size-sm">.${appliedClass}</strong>
              <span class="badge badge--sm">Live Element</span>
            </div>
            <p class="font-size-xs text-color-muted" style="margin: 0;">
              Logical dimension dynamically applied via Design For Humans token scale.
            </p>
          </div>
        </div>
      </div>
    `;
  },
};

/**
 * 2. Square Block Scale (.block-*)
 * Visualizes the square block ladder from micro unit (16px) and WCAG 2.5.5 touch target (48px) up to 2XS, XS, and SM blocks.
 */
export const SquareBlockScale: Story = {
  render: () => `
    <div class="stack gap-xl" style="max-inline-size: 54rem;">
      <header class="stack gap-xs">
        <h3 class="font-size-lg font-weight-bold">Square Block Scale (.block-*)</h3>
        <p class="font-size-sm text-color-muted">
          Square blocks apply equal <code>inline-size</code> and <code>block-size</code> for icons, avatars, touch targets, and preview frames.
        </p>
      </header>

      <div class="cluster gap-md align-items-end">
        <!-- 1. Unit (16px) -->
        <div class="stack gap-xs align-items-center">
          <div class="block-unit rounded-sm border" style="background: var(--surface-muted);" title="16px"></div>
          <code class="font-size-xs">.block-unit</code>
          <span class="font-size-xs text-color-muted">16px</span>
        </div>

        <!-- 2. Target (48px - WCAG 2.5.5 AAA) -->
        <div class="stack gap-xs align-items-center">
          <div class="block-target rounded-md border inline align-items-center justify-content-center" style="background: var(--surface-active);" title="48px">
            <svg class="icon text-color-accent" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false">
              <circle cx="12" cy="12" r="10"></circle>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
          </div>
          <code class="font-size-xs">.block-target</code>
          <span class="font-size-xs text-color-muted">48px (AAA)</span>
        </div>

        <!-- 3. 2XS (128px) -->
        <div class="stack gap-xs align-items-center">
          <div class="block-2xs rounded-md border inline align-items-center justify-content-center" style="background: var(--surface);" title="128px">
            <span class="font-size-sm font-weight-bold">128×128</span>
          </div>
          <code class="font-size-xs">.block-2xs</code>
          <span class="font-size-xs text-color-muted">8rem / 128px</span>
        </div>

        <!-- 4. XS (256px) -->
        <div class="stack gap-xs align-items-center">
          <div class="block-xs rounded-md border inline align-items-center justify-content-center" style="background: var(--surface);" title="256px">
            <span class="font-size-md font-weight-bold">256×256</span>
          </div>
          <code class="font-size-xs">.block-xs</code>
          <span class="font-size-xs text-color-muted">16rem / 256px</span>
        </div>
      </div>
    </div>
  `,
};

/**
 * 3. Semantic Width Hierarchy (.width-*)
 * Real-world UI compositions demonstrating each semantic architectural alias.
 */
export const SemanticWidthHierarchy: Story = {
  render: () => `
    <div class="stack gap-xl" style="max-inline-size: 54rem;">
      <header class="stack gap-xs">
        <h3 class="font-size-lg font-weight-bold">Semantic Width Hierarchy</h3>
        <p class="font-size-sm text-color-muted">
          Semantic width aliases allow developers to build menus, sidebars, modals, and readable articles without arbitrary pixel values.
        </p>
      </header>

      <div class="stack gap-lg">
        <!-- 1. .width-popover (16rem / 256px) -->
        <div class="stack gap-xs">
          <div class="inline align-items-center gap-sm">
            <span class="badge badge--accent">.width-popover / .width-xs</span>
            <span class="font-size-xs text-color-muted">16rem (256px) — Menus, Dropdowns, Flyouts</span>
          </div>
          <div class="card card--bordered width-popover padding-sm" style="background: var(--surface);">
            <div class="stack gap-xs">
              <span class="font-size-xs font-weight-bold text-color-muted">QUICK ACTIONS</span>
              <button type="button" class="button button--subtle button--sm inline justify-content-start"><span>Duplicate Item</span></button>
              <button type="button" class="button button--subtle button--sm inline justify-content-start"><span>Export JSON</span></button>
              <button type="button" class="button button--danger button--sm inline justify-content-start"><span>Delete</span></button>
            </div>
          </div>
        </div>

        <!-- 2. .width-sidebar (24rem / 384px) -->
        <div class="stack gap-xs">
          <div class="inline align-items-center gap-sm">
            <span class="badge badge--accent">.width-sidebar / .width-sm</span>
            <span class="font-size-xs text-color-muted">24rem (384px) — Navigation & Filter Sidebars</span>
          </div>
          <aside class="card card--bordered width-sidebar padding stack gap-sm" style="background: var(--surface);">
            <h4 class="font-size-md font-weight-bold" style="margin: 0;">Filters Sidebar</h4>
            <div class="field">
              <label for="filter-status" class="field__label">Status</label>
              <select id="filter-status" class="select select--sm">
                <option>All Items</option>
                <option>Active</option>
                <option>Archived</option>
              </select>
            </div>
            <button type="button" class="button button--strong button--accent button--sm"><span>Apply Filters</span></button>
          </aside>
        </div>

        <!-- 3. .width-dialog (36rem / 576px) -->
        <div class="stack gap-xs">
          <div class="inline align-items-center gap-sm">
            <span class="badge badge--accent">.width-dialog / .width-md</span>
            <span class="font-size-xs text-color-muted">36rem (576px) — Modal Dialogs & Settings Cards</span>
          </div>
          <div class="card card--bordered width-dialog padding stack gap-md" style="background: var(--surface);">
            <header class="inline align-items-center justify-content-between border-b pb-sm">
              <h4 class="font-size-md font-weight-bold" style="margin: 0;">Confirm Deployment</h4>
              <span class="badge badge--warning">Staging</span>
            </header>
            <p class="font-size-sm text-color-muted" style="margin: 0;">
              Are you sure you want to deploy release v2.4.0 to the staging environment? All automated axe accessibility scans must pass before promoting to production.
            </p>
            <footer class="inline justify-content-end gap-sm">
              <button type="button" class="button"><span>Cancel</span></button>
              <button type="button" class="button button--strong button--accent"><span>Confirm</span></button>
            </footer>
          </div>
        </div>

        <!-- 4. .width-prose (48rem / 768px, WCAG 1.4.8 AAA) -->
        <div class="stack gap-xs">
          <div class="inline align-items-center gap-sm">
            <span class="badge badge--accent">.width-prose / .width-lg</span>
            <span class="font-size-xs text-color-muted">48rem (768px) — Optimal Reading Column (~65-75ch, WCAG AAA)</span>
          </div>
          <article class="card card--bordered width-prose padding stack gap-sm" style="background: var(--surface);">
            <h3 class="font-size-lg font-weight-bold" style="margin: 0;">Accessible Typography Reading Comfort</h3>
            <p class="font-size-sm" style="line-height: 1.6; margin: 0;">
              WCAG 2.2 Success Criterion 1.4.8 recommends line lengths between 60 and 80 characters. Constraining body prose with <code>.width-prose</code> guarantees that text lines do not stretch across ultrawide monitors, preventing eye strain and cognitive disorientation for neurodivergent and low-vision readers.
            </p>
          </article>
        </div>
      </div>
    </div>
  `,
};

/**
 * 4. Blowout-Safe Constraints (.min-width-* & .max-width-*)
 * Demonstrates how min(..., 100%) prevents elements from overflowing narrow parent containers on mobile displays.
 */
export const BlowoutSafeConstraints: Story = {
  render: () => `
    <div class="stack gap-xl" style="max-inline-size: 54rem;">
      <header class="stack gap-xs">
        <h3 class="font-size-lg font-weight-bold">Blowout-Safe Width Constraints</h3>
        <p class="font-size-sm text-color-muted">
          <code>.min-width-*</code> and <code>.max-width-*</code> utilities evaluate <code>min(var(--spacing-block-*), 100%)</code> to safely clamp within parent bounds on mobile viewports.
        </p>
      </header>

      <div class="stack gap-md">
        <!-- Wide Container -->
        <div class="card card--bordered padding stack gap-xs">
          <span class="font-size-xs font-weight-bold text-color-muted">1. WIDE CONTAINER (Element achieves full 24rem width):</span>
          <div class="card card--bordered min-width-sm padding-sm" style="background: var(--surface-muted);">
            <code>.min-width-sm</code> (24rem / 384px)
          </div>
        </div>

        <!-- Narrow Container Simulation (Simulating 300px mobile viewport) -->
        <div class="card card--bordered padding stack gap-xs" style="max-inline-size: 18rem;">
          <span class="font-size-xs font-weight-bold text-color-muted">2. NARROW CONTAINER (300px / 18rem - Clamps to 100% without blowout!):</span>
          <div class="card card--bordered min-width-sm padding-sm" style="background: var(--surface-active); border-color: var(--border-color-accent);">
            <code>.min-width-sm</code> (Clamped to 100% of parent)
          </div>
        </div>
      </div>
    </div>
  `,
};

/**
 * 5. Height Utilities & Flex Growth (.height-* & .size-grow)
 * Demonstrates height presets and automatic flex space absorption.
 */
export const HeightAndFlexGrowth: Story = {
  render: () => `
    <div class="stack gap-xl" style="max-inline-size: 54rem;">
      <header class="stack gap-xs">
        <h3 class="font-size-lg font-weight-bold">Height Utilities & Flex Growth (.height-* & .size-grow)</h3>
        <p class="font-size-sm text-color-muted">
          Use <code>.height-*</code> for consistent block-size containers, and <code>.size-grow</code> for flexible space absorption.
        </p>
      </header>

      <div class="inline gap-md" style="block-size: 12rem;">
        <!-- Fixed Height 2XS Block -->
        <div class="card card--bordered height-2xs width-xs padding-sm stack justify-content-between" style="background: var(--surface);">
          <span class="badge">.height-2xs</span>
          <span class="font-size-xs text-color-muted">Fixed 128px block-size</span>
        </div>

        <!-- Flex Growth (.size-grow) -->
        <div class="card card--bordered height-fill size-grow padding-sm stack justify-content-between" style="background: var(--surface-active); border-style: dashed;">
          <div class="inline align-items-center justify-content-between">
            <span class="badge badge--accent">.size-grow</span>
            <span class="font-size-xs text-color-muted">flex-grow: 1</span>
          </div>
          <p class="font-size-xs text-color-muted" style="margin: 0;">
            Absorbs remaining available inline space dynamically within the flex row.
          </p>
        </div>
      </div>
    </div>
  `,
};

/**
 * 6. State Matrix Snapshot (Automated Accessibility Audit)
 * Visual snapshot of all spacing block tiers and semantic width presets.
 */
export const StateMatrix: Story = {
  render: () => `
    <div class="stack gap-xl" style="max-inline-size: 54rem;">
      <header class="stack gap-xs">
        <h3 class="font-size-lg font-weight-bold">Spacing Blocks State Matrix</h3>
        <p class="font-size-sm text-color-muted">
          Comprehensive snapshot across square blocks, semantic widths, and constraints for automated axe testing.
        </p>
      </header>

      <div class="grid gap-md" style="--grid-min-item-width: 16rem;">
        <!-- Matrix 1: block-target -->
        <div class="card card--bordered padding stack gap-xs">
          <span class="badge">.block-target</span>
          <div class="block-target border rounded-md inline align-items-center justify-content-center" style="background: var(--surface);">
            <span class="font-size-xs">48px</span>
          </div>
        </div>

        <!-- Matrix 2: width-popover -->
        <div class="card card--bordered padding stack gap-xs">
          <span class="badge">.width-popover</span>
          <div class="width-popover border padding-xs rounded-md" style="background: var(--surface); max-inline-size: 100%;">
            <span class="font-size-xs">256px / 16rem</span>
          </div>
        </div>

        <!-- Matrix 3: width-sidebar -->
        <div class="card card--bordered padding stack gap-xs">
          <span class="badge">.width-sidebar</span>
          <div class="width-sidebar border padding-xs rounded-md" style="background: var(--surface); max-inline-size: 100%;">
            <span class="font-size-xs">384px / 24rem</span>
          </div>
        </div>

        <!-- Matrix 4: width-dialog -->
        <div class="card card--bordered padding stack gap-xs">
          <span class="badge">.width-dialog</span>
          <div class="width-dialog border padding-xs rounded-md" style="background: var(--surface); max-inline-size: 100%;">
            <span class="font-size-xs">576px / 36rem</span>
          </div>
        </div>
      </div>
    </div>
  `,
};
