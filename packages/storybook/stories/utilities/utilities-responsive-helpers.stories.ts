import type { Meta, StoryObj } from '@storybook/html';

interface ResponsiveArgs {
  containerWidth: '24em' | '36em' | '48em' | '60em' | '100%';
  breakpoint: '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  visibilityMode: 'hide-below' | 'hide-above' | 'hide-labels' | 'hide-decor';
  containerScoped: boolean;
}

const meta: Meta<ResponsiveArgs> = {
  title: 'Utilities/Responsive Visibility',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
### Developer & Designer Notes: Responsive Visibility & Container Query Utilities

The **Responsive Visibility Helpers** provide low-specificity (\`:where()\`) classes for conditionally hiding, revealing, or adapting UI elements based on **container inline dimensions** (\`@container\`) or **viewport media breakpoints** (\`@media\`).

Engineered for modern modular design systems and **WCAG 2.2 Level AA / AAA** compliance:
- **1.4.10 Reflow (Level AA):** Content reflows seamlessly down to 320px (\`20em\`) without clipping, content truncation, or horizontal two-dimensional scrollbars.
- **1.3.1 Info and Relationships (Level A):** When text labels are collapsed via \`.hide-labels\` or \`--ui-labels: hidden\`, accessible names are preserved in the accessibility tree via \`.ui-label\` or \`.button__text\` accessible clipping.
- **4.1.2 Name, Role, Value (Level A):** Interactive controls maintain full screen reader announcements regardless of visual visibility state.

Defined in \`utilities/responsive-helpers.css\`.

---

#### 1. Core Architectural Principles
1. **Container Queries First (\`@container\`):** Components are often embedded inside narrow layout regions (sidebars, dialogs, split columns, grid cards) on wide screens. Relying solely on viewport media queries breaks modularity. Design For Humans container visibility utilities (\`.@max-sm:hide\`, \`.@sm:hide\`) adapt directly to the element's parent container width.
2. **Accessible Label Disclosure (\`--ui-labels: hidden\`):** Instead of removing DOM nodes or maintaining duplicate mobile markup, \`.@max-sm:hide-labels\` activates container style queries (\`@container style(--ui-labels: hidden)\`). Buttons and tabs gracefully collapse their textual labels into screen-reader-only accessible nodes with zero layout recalculation overhead.
3. **Pure Decorative Hiding (\`--ui-decor: hidden\`):** Purely decorative accessories (icons, glyphs, chevrons) can be hidden conditionally via \`.hide-decor\` / \`--ui-decor: hidden\` using zero-cost \`display: none\`.
4. **Zero-Specificity Reset (\`:where()\`):** Written with 0-0-0 specificity so component-level styles and theme overrides apply without specificity escalation.
5. **Standard Modular Breakpoint Scale:** Both container and viewport queries share the identical 7-tier scale: \`2xs\` (20em / 320px), \`xs\` (30em / 480px), \`sm\` (40em / 640px), \`md\` (48em / 768px), \`lg\` (60em / 960px), \`xl\` (80em / 1280px), and \`2xl\` (96em / 1536px).
6. **Flexible Synonym Cascade:** Supported synonyms allow developers and AI agents to reach for common alternatives (\`:hide\` vs \`:hidden\`, \`min-sm:\` vs \`sm:\`, \`sm-max:\` vs \`max-sm:\`) without syntax errors.

---

#### 2. Comparison With Leading Design Systems

| Feature / System | DFH Responsive Helpers | Tailwind CSS | GitHub Primer | Radix Themes |
| :--- | :--- | :--- | :--- | :--- |
| **Primary Paradigm** | Container Queries (\`@max-md:hide\`) + Media (\`max-md:hide\`) | Viewport Media Queries (\`md:hidden\`) | Hybrid (\`@media\` + \`@container\`) | Viewport Props (\`display={{ initial: 'none', md: 'block' }}\`) |
| **Component Portability** | Adapts when placed in narrow sidebars on desktop | Fails in narrow sidebars on desktop | Supported via \`.container-query\` | Bound to viewport |
| **Adaptive Label Collapse** | Native \`--ui-labels: hidden\` zero-DOM change | Requires duplicate markup | Requires custom JavaScript | Requires custom component logic |
| **Accessibility Preservation** | Accessible text retained automatically | Manual \`sr-only\` pairing required | Manual pairing | Manual pairing |
| **Specificity Model** | Zero-specificity (\`:where()\`) | Standard utility specificity | Standard utility specificity | Inline / atomic style props |

---

#### 3. Canonical Semantic Markup Signatures
AI agents and developers MUST use the following semantic patterns:

\`\`\`html
<!-- 1. Container Query Scoped Visibility (Primary: @max-*:hide or @*:hide) -->
<div class="container-inline">
  <!-- Hidden when the container drops to 48em (768px) or below -->
  <button type="button" class="button @max-md:hide">
    <span>Secondary Action</span>
  </button>
</div>

<!-- 2. Progressive Label Disclosure (Zero-JS, zero-DOM changes) -->
<div class="container-inline">
  <div class="cluster gap-sm @max-md:hide-labels">
    <button type="button" class="button button--primary">
      <svg class="icon" width="20" height="20" aria-hidden="true"><use href="#Check"/></svg>
      <span class="button__text">Approve Order</span>
    </button>
  </div>
</div>

<!-- 3. Viewport Media Query Scoped Visibility (Page shell level only) -->
<header class="header">
  <!-- Mobile drawer toggle: visible only on mobile screens <= 48em -->
  <button type="button" class="button button--icon md:hide" aria-label="Open menu">
    <svg class="icon"><use href="#Menu"/></svg>
  </button>
  <!-- Desktop global nav: hidden on mobile screens <= 48em -->
  <nav class="max-md:hide" aria-label="Main navigation">...</nav>
</header>
\`\`\`

---

#### 4. Breakpoint Scale & Utility Class Reference

| Breakpoint | EM Value | Pixel Equiv | Viewport Hide Below (Mobile) | Viewport Hide Above (Desktop) | Container Hide Below | Container Hide Labels |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **2xs** | \`20em\` | 320px | \`max-2xs:hide\` | \`2xs:hide\` | \`@max-2xs:hide\` | \`@max-2xs:hide-labels\` |
| **xs** | \`30em\` | 480px | \`max-xs:hide\` | \`xs:hide\` | \`@max-xs:hide\` | \`@max-xs:hide-labels\` |
| **sm** | \`40em\` | 640px | \`max-sm:hide\` | \`sm:hide\` | \`@max-sm:hide\` | \`@max-sm:hide-labels\` |
| **md** | \`48em\` | 768px | \`max-md:hide\` | \`md:hide\` | \`@max-md:hide\` | \`@max-md:hide-labels\` |
| **lg** | \`60em\` | 960px | \`max-lg:hide\` | \`lg:hide\` | \`@max-lg:hide\` | \`@max-lg:hide-labels\` |
| **xl** | \`80em\` | 1280px | \`max-xl:hide\` | \`xl:hide\` | \`@max-xl:hide\` | \`@max-xl:hide-labels\` |
| **2xl** | \`96em\` | 1536px | \`max-2xl:hide\` | \`2xl:hide\` | \`@max-2xl:hide\` | \`@max-2xl:hide-labels\` |

> **Synonyms:** In addition to the primary forms above, the library supports common agent and developer synonyms:
> - \`sm:hidden\`, \`min-sm:hide\`, \`min-sm:hidden\`, \`hide--above-sm\`
> - \`max-sm:hidden\`, \`sm-max:hide\`, \`sm-max:hidden\`, \`hide--below-sm\`
> - \`@sm:hidden\`, \`@min-sm:hide\`, \`@min-sm:hidden\`, \`hide--in-container-above-sm\`
> - \`@max-sm:hidden\`, \`@sm-max:hide\`, \`@sm-max:hidden\`, \`hide--in-container-below-sm\`

---

#### 5. Viewport Height Breakpoints & Semantic Aliases

For viewport height adaptability (e.g. inside \`.app--viewport\` shells that unlock below \`36em\`), Design For Humans provides direct height media utilities:

| Height Breakpoint | EM Value | Pixel Equiv | Hide Below (Short Screens) | Hide Above (Tall Screens) | Semantic Alias |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **h-2xs** | \`20em\` | 320px | \`max-h-2xs:hide\` | \`h-2xs:hide\` | &mdash; |
| **h-xs** | \`30em\` | 480px | \`max-h-xs:hide\` | \`h-xs:hide\` | &mdash; |
| **h-sm** | \`36em\` | 576px | \`max-h-sm:hide\` / \`short:hide\` | \`h-sm:hide\` / \`tall:hide\` | \`short\` / \`tall\` |
| **h-md** | \`48em\` | 768px | \`max-h-md:hide\` | \`h-md:hide\` | &mdash; |
| **h-lg** | \`60em\` | 960px | \`max-h-lg:hide\` | \`h-lg:hide\` | &mdash; |
| **h-xl** | \`80em\` | 1280px | \`max-h-xl:hide\` | \`h-xl:hide\` | &mdash; |
| **h-2xl** | \`96em\` | 1536px | \`max-h-2xl:hide\` | \`h-2xl:hide\` | &mdash; |

---

#### 6. Viewport Shell Adaptive Helpers (\`.app--viewport\` Sync)

Synchronized directly with the macro unlock media query used by \`.app--viewport\` and \`.app__workspace\`: \`(width <= 48em) or (height <= 36em)\`:
- **\`.app-unlocked:show\` / \`.unlocked:show\`:** Visible on mobile viewports OR short screens (hidden on desktop locked viewports). Perfect for mobile header bars, floating tabs, and mobile drawer toggles.
- **\`.app-locked:show\` / \`.locked:show\`:** Visible ONLY when the desktop shell is locked (width > 48em AND height > 36em). Perfect for desktop navigation rails and permanent sidebar panels.
        `,
      },
    },
  },
  argTypes: {
    containerWidth: {
      control: 'select',
      options: ['24em', '36em', '48em', '60em', '100%'],
      description: 'Simulated inline-size of the container harness.',
      table: { category: 'Interactive Resizing' },
    },
    breakpoint: {
      control: 'select',
      options: ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Target breakpoint threshold.',
      table: { category: 'Visibility Tuning' },
    },
    visibilityMode: {
      control: 'select',
      options: ['hide-below', 'hide-above', 'hide-labels', 'hide-decor'],
      description: 'Visibility adaptation mode applied to the target item.',
      table: { category: 'Visibility Tuning' },
    },
    containerScoped: {
      control: 'boolean',
      description: 'Whether to use Container Queries (@container) instead of Viewport Media Queries (@media).',
      table: { category: 'Scope' },
    },
  },
  args: {
    containerWidth: '36em',
    breakpoint: 'md',
    visibilityMode: 'hide-below',
    containerScoped: true,
  },
};

export default meta;
type Story = StoryObj<ResponsiveArgs>;

/**
 * 1. Interactive Playground
 * Resize the container harness using the controls to see container-query visibility and icon-only collapsing in real time.
 */
export const Playground: Story = {
  render: (args) => {
    let appliedClass = '';

    if (args.visibilityMode === 'hide-below') {
      appliedClass = args.containerScoped 
        ? `@max-${args.breakpoint}:hide` 
        : `max-${args.breakpoint}:hide`;
    } else if (args.visibilityMode === 'hide-above') {
      appliedClass = args.containerScoped 
        ? `@${args.breakpoint}:hide` 
        : `${args.breakpoint}:hide`;
    } else if (args.visibilityMode === 'hide-labels') {
      appliedClass = args.containerScoped 
        ? `@max-${args.breakpoint}:hide-labels` 
        : `max-${args.breakpoint}:hide-labels`;
    } else {
      appliedClass = args.containerScoped 
        ? `@max-${args.breakpoint}:hide-decor` 
        : `max-${args.breakpoint}:hide-decor`;
    }

    return `
      <div class="stack gap-md" style="max-inline-size: 54rem; margin-inline: auto;">
        <!-- Status Bar -->
        <div class="card card--bordered padding-sm inline align-items-center justify-content-between" style="background: var(--surface-muted);">
          <div class="inline align-items-center gap-sm">
            <span class="badge badge--accent">${args.containerScoped ? '@container' : '@media'}</span>
            <span class="font-size-sm">Active Class: <code>.${appliedClass}</code></span>
          </div>
          <span class="font-size-xs text-color-muted">Container Target: <strong>${args.containerWidth}</strong></span>
        </div>

        <!-- Resizable Container Harness -->
        <div 
          class="container-inline stack gap-md pd-md rounded-md border" 
          style="
            inline-size: ${args.containerWidth}; 
            max-inline-size: 100%; 
            margin-inline: auto; 
            background: var(--surface);
            transition: inline-size var(--transition-fast, 0.2s ease);
            border-style: dashed;
          "
        >
          <div class="inline align-items-center justify-content-between border-b pb-xs">
            <span class="font-size-xs font-weight-bold text-color-muted">CONTAINER BOUNDARY: ${args.containerWidth}</span>
            <span class="font-size-xs text-color-muted">Breakpoint: ${args.breakpoint}</span>
          </div>

          <!-- Target Card inside container -->
          <div class="card card--bordered padding stack gap-sm ${args.visibilityMode === 'icons-only' ? appliedClass : ''}">
            <div class="inline align-items-center justify-content-between">
              <h4 class="card__title font-size-md" style="margin: 0;">Responsive Action Toolbar</h4>
              <span class="badge">Adaptive Component</span>
            </div>

            <p class="font-size-sm text-color-muted" style="margin: 0;">
              This component adapts its child elements based on its parent container's inline width.
            </p>

            <div class="cluster gap-sm align-items-center ${args.visibilityMode === 'icons-only' ? appliedClass : ''}">
              <!-- Always visible primary action -->
              <button type="button" class="button button--primary">
                <svg class="icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
                <span class="button__text">Publish</span>
              </button>

              <!-- Conditionally hidden / adaptive action -->
              <button type="button" class="button button--secondary ${args.visibilityMode !== 'icons-only' ? appliedClass : ''}">
                <svg class="icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false">
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                  <polyline points="17 21 17 13 7 13 7 21"></polyline>
                  <polyline points="7 3 7 8 15 8"></polyline>
                </svg>
                <span class="button__text">Save Draft</span>
              </button>

              <!-- Conditionally hidden tertiary action -->
              <button type="button" class="button button--subtle ${args.visibilityMode !== 'icons-only' ? appliedClass : ''}">
                <svg class="icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
                <span class="button__text">Discard</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  },
};

/**
 * 2. Container Queries vs Viewport Queries Comparison
 * Demonstrates why container queries succeed in sidebars and split views while viewport queries fail.
 */
export const ContainerVsViewportComparison: Story = {
  render: () => `
    <div class="stack gap-xl" style="max-inline-size: 54rem;">
      <header class="stack gap-xs">
        <h3 class="font-size-lg font-weight-bold">Container Queries (@container) vs Viewport Queries (@media)</h3>
        <p class="font-size-sm text-color-muted">
          On large desktop screens, a 300px sidebar is narrow, but the viewport is wide. Viewport queries assume everything on a desktop display has desktop space, causing overflowing broken sidebars!
        </p>
      </header>

      <div class="split gap-lg" style="--split-min-width: 18rem;">
        <!-- Left: Narrow Sidebar Column with Container Query (Succeeds!) -->
        <div class="container-inline stack gap-sm" style="flex: 1; max-inline-size: 22rem;">
          <div class="card card--bordered padding stack gap-sm" style="background: var(--surface);">
            <div class="inline align-items-center justify-content-between">
              <span class="badge badge--success">Container Query (@container)</span>
              <span class="font-size-xs text-color-muted">~20em width</span>
            </div>
            <p class="font-weight-bold font-size-sm" style="margin: 0;">Sidebar with .@max-md:hide</p>
            <p class="font-size-xs text-color-muted" style="margin: 0;">
              Correctly detects its <em>own</em> narrow container width and hides non-essential buttons cleanly.
            </p>
            <div class="cluster gap-xs">
              <button type="button" class="button button--primary button--sm"><span>Save</span></button>
              <button type="button" class="button button--secondary button--sm @max-md:hide"><span>Export</span></button>
              <button type="button" class="button button--subtle button--sm @max-md:hide"><span>History</span></button>
            </div>
          </div>
        </div>

        <!-- Right: Narrow Sidebar Column with Viewport Query (Fails!) -->
        <div class="stack gap-sm" style="flex: 1; max-inline-size: 22rem;">
          <div class="card card--bordered padding stack gap-sm" style="background: var(--surface-muted);">
            <div class="inline align-items-center justify-content-between">
              <span class="badge badge--danger">Viewport Media Query (@media)</span>
              <span class="font-size-xs text-color-muted">Viewport > 48em</span>
            </div>
            <p class="font-weight-bold font-size-sm" style="margin: 0;">Sidebar with .max-md:hide</p>
            <p class="font-size-xs text-color-muted" style="margin: 0;">
              Checks the <em>entire browser window</em> (desktop). All 3 buttons remain forced into the narrow column!
            </p>
            <div class="cluster gap-xs">
              <button type="button" class="button button--primary button--sm"><span>Save</span></button>
              <button type="button" class="button button--secondary button--sm max-md:hide"><span>Export</span></button>
              <button type="button" class="button button--subtle button--sm max-md:hide"><span>History</span></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
};

/**
 * 3. Progressive Disclosure Toolbar (.hide-labels)
 * Automatically collapses button text labels to screen-reader-accessible icons using CSS container style queries.
 */
export const ProgressiveDisclosureToolbar: Story = {
  render: () => `
    <div class="stack gap-lg" style="max-inline-size: 54rem;">
      <header class="stack gap-xs">
        <h4 class="font-size-md font-weight-bold">Zero-JS Adaptive Label Disclosure (<code>.@max-md:hide-labels</code>)</h4>
        <p class="font-size-sm text-color-muted">
          When the parent container drops below 48em (768px), <code>--ui-labels: hidden</code> activates. Child buttons collapse their text labels into visually hidden screen reader text with zero DOM mutation.
        </p>
      </header>

      <div class="stack gap-md">
        <!-- Wide Container (Full Labels) -->
        <div class="container-inline card card--bordered padding stack gap-sm">
          <span class="font-size-xs font-weight-bold text-color-muted">1. WIDE CONTAINER (Above 48em threshold):</span>
          <div class="cluster gap-sm align-items-center @max-md:hide-labels">
            <button type="button" class="button button--primary">
              <svg class="icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span class="button__text">Approve Audit</span>
            </button>
            <button type="button" class="button button--secondary">
              <svg class="icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              <span class="button__text">Download Report</span>
            </button>
            <button type="button" class="button button--subtle">
              <svg class="icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false">
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
              </svg>
              <span class="button__text">Configure</span>
            </button>
          </div>
        </div>

        <!-- Narrow Container (Automatically Collapses to Icon-Only) -->
        <div class="container-inline card card--bordered padding stack gap-sm" style="max-inline-size: 24rem;">
          <span class="font-size-xs font-weight-bold text-color-muted">2. NARROW CONTAINER (Below 48em threshold):</span>
          <div class="cluster gap-sm align-items-center @max-md:hide-labels">
            <button type="button" class="button button--primary" aria-label="Approve Audit">
              <svg class="icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span class="button__text">Approve Audit</span>
            </button>
            <button type="button" class="button button--secondary" aria-label="Download Report">
              <svg class="icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              <span class="button__text">Download Report</span>
            </button>
            <button type="button" class="button button--subtle" aria-label="Configure">
              <svg class="icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false">
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
              </svg>
              <span class="button__text">Configure</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
};

/**
 * 4. Responsive Table Column Hiding
 * Gracefully hides non-critical columns on smaller containers to prevent awkward horizontal table scrolling.
 */
export const ResponsiveTableColumns: Story = {
  render: () => `
    <div class="stack gap-md" style="max-inline-size: 54rem;">
      <p class="font-size-sm text-color-muted">
        In complex data tables, low-priority columns can hide automatically when container inline space is restricted, complying with WCAG 1.4.10 Reflow.
      </p>

      <div class="container-inline card card--bordered" style="overflow-x: auto;">
        <table class="table" style="inline-size: 100%; border-collapse: collapse;">
          <thead>
            <tr style="border-block-end: 1px solid var(--border-color); text-align: left;">
              <th style="padding: var(--spacing-12);">Component</th>
              <th style="padding: var(--spacing-12);">Status</th>
              <th class="@max-sm:hide" style="padding: var(--spacing-12);">Category</th>
              <th class="@max-md:hide" style="padding: var(--spacing-12);">WCAG Level</th>
              <th class="@max-lg:hide" style="padding: var(--spacing-12);">Last Audited</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-block-end: 1px solid var(--border-color-muted);">
              <td style="padding: var(--spacing-12); font-weight: bold;">Dialog</td>
              <td style="padding: var(--spacing-12);"><span class="badge badge--success">Passing</span></td>
              <td class="@max-sm:hide" style="padding: var(--spacing-12);">Overlay</td>
              <td class="@max-md:hide" style="padding: var(--spacing-12);">WCAG 2.2 AAA</td>
              <td class="@max-lg:hide" style="padding: var(--spacing-12); color: var(--foreground-muted);">Today</td>
            </tr>
            <tr style="border-block-end: 1px solid var(--border-color-muted);">
              <td style="padding: var(--spacing-12); font-weight: bold;">Popover</td>
              <td style="padding: var(--spacing-12);"><span class="badge badge--success">Passing</span></td>
              <td class="@max-sm:hide" style="padding: var(--spacing-12);">Floating</td>
              <td class="@max-md:hide" style="padding: var(--spacing-12);">WCAG 2.2 AA</td>
              <td class="@max-lg:hide" style="padding: var(--spacing-12); color: var(--foreground-muted);">Yesterday</td>
            </tr>
            <tr>
              <td style="padding: var(--spacing-12); font-weight: bold;">Accordion</td>
              <td style="padding: var(--spacing-12);"><span class="badge badge--success">Passing</span></td>
              <td class="@max-sm:hide" style="padding: var(--spacing-12);">Disclosure</td>
              <td class="@max-md:hide" style="padding: var(--spacing-12);">WCAG 2.2 AAA</td>
              <td class="@max-lg:hide" style="padding: var(--spacing-12); color: var(--foreground-muted);">2 days ago</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
};

/**
 * 5. Viewport Layout Shell Visibility (.max-md:hide & .md:hide)
 * Used at the top-level application shell for coordinating mobile drawer toggles and desktop navigation bars.
 */
export const ViewportLayoutShell: Story = {
  render: () => `
    <div class="stack gap-md" style="max-inline-size: 54rem;">
      <p class="font-size-sm text-color-muted">
        For macro layout chrome (like application headers and drawer toggles), viewport media queries coordinate global mobile vs desktop presentation.
      </p>

      <header class="card card--bordered padding inline align-items-center justify-content-between" style="background: var(--surface);">
        <!-- Brand Lockup -->
        <div class="inline align-items-center gap-sm">
          <button type="button" class="button button--subtle button--icon md:hide" aria-label="Open mobile navigation menu">
            <svg class="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
          <strong class="font-size-md">Design For Humans</strong>
        </div>

        <!-- Desktop Navigation Bar (Hidden on Mobile) -->
        <nav class="cluster gap-md max-md:hide" aria-label="Desktop primary navigation">
          <a href="#docs" class="link"><span>Documentation</span></a>
          <a href="#components" class="link"><span>Components</span></a>
          <a href="#tokens" class="link"><span>Tokens</span></a>
          <a href="#a11y" class="link"><span>Accessibility</span></a>
        </nav>

        <!-- Right Action Cluster -->
        <div class="inline align-items-center gap-xs">
          <span class="badge badge--accent max-sm:hide">v2.4.0</span>
          <button type="button" class="button button--primary button--sm">
            <span>Log In</span>
          </button>
        </div>
      </header>
    </div>
  `,
};

/**
 * 6. State Matrix Snapshot (Automated Accessibility Audit)
 * Visual snapshot of container query and media query breakpoint classes.
 */
export const StateMatrix: Story = {
  render: () => `
    <div class="stack gap-xl" style="max-inline-size: 54rem;">
      <header class="stack gap-xs">
        <h3 class="font-size-lg font-weight-bold">Responsive Helpers State Matrix</h3>
        <p class="font-size-sm text-color-muted">
          Automated snapshot verifying visibility toggles and layout stability across breakpoints.
        </p>
      </header>

      <div class="container-inline stack gap-md pd-md rounded-md border" style="background: var(--surface);">
        <h4 class="font-size-sm font-weight-bold">Container Query Breakpoint Thresholds</h4>
        <div class="stack gap-xs">
          <div class="card card--bordered padding-xs inline align-items-center justify-content-between @max-2xs:hide">
            <code>.@max-2xs:hide</code>
            <span class="badge">Above 20em (320px)</span>
          </div>
          <div class="card card--bordered padding-xs inline align-items-center justify-content-between @max-xs:hide">
            <code>.@max-xs:hide</code>
            <span class="badge">Above 30em (480px)</span>
          </div>
          <div class="card card--bordered padding-xs inline align-items-center justify-content-between @max-sm:hide">
            <code>.@max-sm:hide</code>
            <span class="badge">Above 40em (640px)</span>
          </div>
          <div class="card card--bordered padding-xs inline align-items-center justify-content-between @max-md:hide">
            <code>.@max-md:hide</code>
            <span class="badge">Above 48em (768px)</span>
          </div>
          <div class="card card--bordered padding-xs inline align-items-center justify-content-between @max-lg:hide">
            <code>.@max-lg:hide</code>
            <span class="badge">Above 60em (960px)</span>
          </div>
        </div>
      </div>
    </div>
  `,
};

/**
 * 7. Viewport Height Shell Visibility (.short:hide, .short:show, .app-unlocked:show, .app-locked:show)
 * Orchestrates macro layout visibility based on viewport height, preventing vertical collapse in app--viewport shells.
 */
export const ViewportHeightShell: Story = {
  render: () => `
    <div class="stack gap-md" style="max-inline-size: 54rem;">
      <p class="font-size-sm text-color-muted">
        When the viewport height shrinks (e.g. height &le; 36em / 576px on laptops, split-screen desktop, or mobile landscape),
        <code>app--viewport</code> unlocks to natural scrolling. Use <code>.short:hide</code>, <code>.tall:show</code>,
        or <code>.app-unlocked:show</code> / <code>.app-locked:show</code> to adapt navigation chrome seamlessly.
      </p>

      <div class="stack gap-sm pd-md border rounded-md" style="background: var(--surface);">
        <!-- State Indicators -->
        <div class="inline align-items-center justify-content-between pd-sm bg-subtle rounded-sm">
          <span class="font-weight-bold">Current Screen Height State:</span>
          <span class="badge badge--success short:hide">Tall Screen (> 36em / 576px)</span>
          <span class="badge badge--warning tall:hide">Short Screen (&le; 36em / 576px)</span>
        </div>

        <!-- Demonstration Elements -->
        <div class="card card--bordered padding-sm inline align-items-center justify-content-between short:hide">
          <div class="inline align-items-center gap-xs">
            <span class="badge badge--accent">.short:hide</span>
            <span>Desktop Expanded Panel (Hidden on Short Viewports &le; 36em)</span>
          </div>
          <span class="badge badge--success">Visible Now</span>
        </div>

        <div class="card card--bordered padding-sm inline align-items-center justify-content-between short:show">
          <div class="inline align-items-center gap-xs">
            <span class="badge badge--accent">.short:show</span>
            <span>Compact Navigation Bar (Visible ONLY on Short Viewports &le; 36em)</span>
          </div>
          <span class="badge badge--warning">Visible Now</span>
        </div>

        <div class="card card--bordered padding-sm inline align-items-center justify-content-between app-unlocked:show">
          <div class="inline align-items-center gap-xs">
            <span class="badge badge--accent">.app-unlocked:show</span>
            <span>Adaptive Mobile/Short Topbar (Visible on Mobile OR Short Viewport)</span>
          </div>
          <span class="badge badge--accent">Unlocked Mode</span>
        </div>

        <div class="card card--bordered padding-sm inline align-items-center justify-content-between app-locked:show">
          <div class="inline align-items-center gap-xs">
            <span class="badge badge--accent">.app-locked:show</span>
            <span>Desktop Locked Full Rail (Visible ONLY on Wide AND Tall Desktop)</span>
          </div>
          <span class="badge badge--accent">Locked Mode</span>
        </div>
      </div>
    </div>
  `,
};

