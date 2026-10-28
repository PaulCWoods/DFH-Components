import type { Meta, StoryObj } from '@storybook/html';

interface SidebarArgs {
  variant: 'default' | 'sticky' | 'flush' | 'floating' | 'end';
  hasHeader: boolean;
  hasFooter: boolean;
  isFlush: boolean;
  isSticky: boolean;
  isFloating: boolean;
  isEnd: boolean;
  title: string;
}

const meta: Meta<SidebarArgs> = {
  title: 'Layout/Sidebar',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
### Developer & Designer Notes: Sidebar Layout Primitive (\`.sidebar\` & \`.app__sidebar\`)

The **Sidebar** primitive is a foundational layout component designed for vertical primary navigation, tool palettes, filter drawers, and contextual property inspectors. It features dedicated overscroll containment (\`.sidebar__scroller\`), sticky viewport positioning (\`.sidebar--sticky\`), edge-to-edge flush styling (\`.sidebar--flush\`), and native responsive off-canvas drawer transitions for mobile viewports (\`< 48em\`).

Defined in \`packages/css/src/layout/sidebar.css\`.

---

#### 1. Core Architectural Principles
1. **Zero-Specificity Cascade (\`:where()\`)**: The base container and all sub-elements are wrapped in \`:where(.sidebar, .app__sidebar)\`, guaranteeing zero-specificity \`(0, 0, 0)\` so consumers can easily override geometry or theme tokens without specificity wars.
2. **Dedicated Scrollport (\`.sidebar__scroller\` / \`.sidebar__body\`)**: Uses \`overflow-y: auto\` combined with \`overscroll-behavior: contain\` and \`scrollbar-gutter: stable\` to prevent scroll chaining to the parent page or document viewport.
3. **Structured Anatomy**:
   - \`.sidebar__header\`: Pinned leading bar for workspace switches, search/filter inputs, or mobile dismiss buttons.
   - \`.sidebar__scroller\`: Fluid middle viewport that scrolls independently. Automatically adjusts its block padding when headers or footers are present.
   - \`.sidebar__footer\`: Pinned trailing zone (\`margin-block-start: auto\`) with a subtle top border rule for user profile lockups, version tags, or status indicators.
4. **Sticky Positioning Landmark (\`.sidebar--sticky\`)**: Automatically computes sticky height using modern dynamic viewport units: \`calc(100dvb - var(--_sidebar-header-height))\` with \`inset-block-start: var(--_sidebar-header-height)\`, pinning alongside long scrolling main content without clipping.
5. **Flush Edge-to-Edge Navigation (\`.sidebar--flush\`)**: Removes scroller padding (\`padding: 0\`), allowing child navigation components (such as \`.tab-list--flush\`) to render full-bleed active indicator bars and hover backgrounds against the sidebar border.
6. **Floating Translucent Dock (\`.sidebar--floating\`)**: Provides an elevated glassmorphic panel with \`backdrop-filter: blur(16px)\`, \`border-radius\`, and \`box-shadow\`.
7. **Opposite Edge Anchor (\`.sidebar--end\` / \`.sidebar--right\`)**: Inverts borders from inline-end to inline-start for trailing inspector/properties panels.
8. **Responsive Off-Canvas Drawer (\`< 48em\` / 768px)**: Automatically switches from an in-flow flex item to a fixed off-canvas drawer with smooth GPU transforms (\`transform: translateX(-100%)\` or \`+100%\`) toggled via the \`.is-open\` state class.

---

#### 2. Canonical Semantic Markup Signatures
AI agents and developers MUST strictly use the following semantic patterns:

\`\`\`html
<!-- 1. Standard Sticky Navigation Sidebar with Header & Footer -->
<aside class="sidebar sidebar--sticky" aria-label="Application Navigation">
  <header class="sidebar__header">
    <span class="micro-heading text-muted">Workspace</span>
  </header>

  <div class="sidebar__scroller">
    <nav class="tab-list tab-list--segmented tab-list--subtle tab-list--vertical" aria-label="Main Sections">
      <!-- Nav items -->
    </nav>
  </div>

  <footer class="sidebar__footer">
    <span class="small-text text-muted">v2.4.0</span>
  </footer>
</aside>

<!-- 2. Flush Navigation Sidebar with Edge-to-Edge Tabs -->
<aside class="sidebar sidebar--sticky sidebar--flush" aria-label="Documentation Navigation">
  <div class="sidebar__scroller">
    <nav class="tab-list tab-list--flush tab-list--tight tab-list--sm tab-list--segmented tab-list--subtle tab-list--vertical" aria-label="Docs">
      <ul>
        <li>
          <a href="#overview" class="tab" aria-current="page">
            <span class="tab__text">Overview</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</aside>

<!-- 4. Slim Navigation Rail (.sidebar--rail) -->
<aside class="sidebar sidebar--rail" aria-label="Application Navigation Rail">
  <div class="sidebar__header">
    <a href="#home" class="link inline align-items-center justify-content-center" aria-label="Home">
      <div class="avatar avatar--sm radius-sm" style="--avatar-bg: var(--foreground-accent); --avatar-text: #fff;">
        <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#BrandDesignForHumans"/></svg>
      </div>
    </a>
  </div>
  <div class="sidebar__scroller">
    <nav class="tab-list tab-list--vertical tab-list--plain tab-list--sm" aria-label="Navigation Tiers">
      <ul>
        <li><button type="button" class="tab" aria-current="page" aria-label="Dashboard"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Home"/></svg><span class="visually-hidden">Dashboard</span></button></li>
        <li><button type="button" class="tab" aria-label="Analytics"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#ChartBar"/></svg><span class="visually-hidden">Analytics</span></button></li>
      </ul>
    </nav>
  </div>
  <div class="sidebar__footer flex-direction-column gap-xs">
    <button type="button" class="button button--plain button--icon button--sm" aria-label="Search"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Search"/></svg></button>
    <button type="button" class="button button--avatar button--round" aria-label="User Profile"><span class="avatar avatar--sm radius-round" data-status="online">AM</span></button>
  </div>
</aside>
\`\`\`

---

#### 3. Modifiers & Sub-Elements Reference

| Selector / Class | Purpose & Rendering Behavior |
| :--- | :--- |
| \`.sidebar, .app__sidebar\` | Flex column container establishing an inline container query context (\`container-type: inline-size\`). |
| \`.sidebar__header\` | Fixed top section with automatic bottom half-padding (\`flex-shrink: 0\`). |
| \`.sidebar__scroller\` / \`.sidebar__body\` | Dedicated scroll container with \`overscroll-behavior: contain\` and \`scrollbar-gutter: stable\`. |
| \`.sidebar__footer\` | Fixed bottom section with top border rule and auto top-margin push. |
| \`.sidebar--sticky\` | Pinned sticky landmark offset by \`--sidebar-header-height\` (\`calc(100dvb - var(--_sidebar-header-height))\`). |
| \`.sidebar--flush\` | Clears padding in \`.sidebar__scroller\` for edge-to-edge child elements like \`.tab-list--flush\`. |
| \`.sidebar--rail\` | Ultra-compact icon-first navigation rail (4.5rem / 72px) with centered header/footer and hidden scrollbar. |
| \`.sidebar--end\` / \`.sidebar--right\` | Inverts border to \`border-inline-start\` for trailing tool/inspector panels. |
| \`.sidebar--floating\` | Translucent glassmorphic floating panel with backdrop blur and rounded border. |
| \`.is-open\` | Applied on mobile viewports (\`< 48em\`) to slide the off-canvas drawer into view. |

---

#### 4. Design Tokens & CSS Custom Properties Contract

| Custom Property | Fallback Token | Default Value | Description |
| :--- | :--- | :--- | :--- |
| \`--sidebar-bg\` | \`--surface-card\` | \`Canvas\` | Sidebar background surface color |
| \`--sidebar-border-color\` | \`--app-border-color, --border-color-quiet\` | \`currentColor\` | Inset separator border color |
| \`--sidebar-border-width\` | \`--app-border-width, --border-width\` | \`1px\` | Border rule thickness |
| \`--sidebar-header-height\` | \`--header-height\` | \`3.75rem\` (60px) | Height offset for sticky positioning |
| \`--sidebar-max-width\` | \`--sidebar-width\` | \`18rem\` (288px) | Maximum width of the sidebar |
| \`--sidebar-min-width\` | &mdash; | \`14rem\` (224px) | Minimum width before shrinking |
| \`--sidebar-padding\` | \`--spacing-cushion\` | \`1.25rem\` (20px) | Internal gutter padding for sub-regions |
| \`--sidebar-shadow\` | &mdash; | \`none\` | Box shadow for the sidebar panel |
| \`--sidebar-transition\` | \`--duration-md\` | \`200ms\` | Slide transition duration in mobile drawer mode |
| \`--sidebar-z-index\` | \`--z-index-sticky\` | \`20\` | Stacking context index when sticky |

---

#### 5. WCAG 2.2 Level AA / AAA Accessibility Guidelines
- **Landmark Semantics (WCAG 1.3.1):** Always render the sidebar using an \`<aside>\` landmark or \`<nav>\` element. When multiple landmarks of the same type exist on a page, each **MUST** have an accessible, distinct name via \`aria-label\` (e.g., \`aria-label="Documentation Navigation"\` vs \`aria-label="Properties Inspector"\`).
- **Current Page Indication (WCAG 4.1.2):** Navigation items within the sidebar must convey the currently active page using \`aria-current="page"\`.
- **Hierarchical Tree Disclosures (WCAG 4.1.2 & 2.1.1):** When section toggles are used, use \`<button type="button" aria-expanded="true/false" aria-controls="section-id">\` with an accessible label (e.g. \`<span class="visually-hidden">Toggle Components</span>\`).
- **Focus Order & Visibility (WCAG 2.4.3 & 2.4.7):** Keyboard focus within \`.sidebar__scroller\` is contained naturally; focused links stay within view. In mobile drawer mode, ensure focus is trapped or returned to the trigger upon dismissal.
- **Motion & Contrast Preferences (WCAG 2.3.3 & 1.4.11):** Includes built-in media queries: \`prefers-reduced-motion: reduce\` disables slide transitions (\`--_sidebar-transition: 0s\`), and \`prefers-contrast: more\` increases border thickness to \`2px\`.
        `,
      },
    },
  },
  args: {
    variant: 'default',
    hasHeader: true,
    hasFooter: true,
    isFlush: false,
    isSticky: false,
    isFloating: false,
    isEnd: false,
    title: 'Workspace Navigation',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'sticky', 'flush', 'floating', 'end'],
      description: 'Preconfigured sidebar presentation variant',
    },
    hasHeader: {
      control: 'boolean',
      description: 'Include pinned top header region (.sidebar__header)',
    },
    hasFooter: {
      control: 'boolean',
      description: 'Include pinned bottom footer region (.sidebar__footer)',
    },
    isFlush: {
      control: 'boolean',
      description: 'Zero padding on scrollport for edge-to-edge navigation (.sidebar--flush)',
    },
    isSticky: {
      control: 'boolean',
      description: 'Pin alongside long scrolling main content (.sidebar--sticky)',
    },
    isFloating: {
      control: 'boolean',
      description: 'Elevated translucent card with backdrop blur (.sidebar--floating)',
    },
    isEnd: {
      control: 'boolean',
      description: 'Anchor to trailing edge of layout (.sidebar--end)',
    },
    title: {
      control: 'text',
      description: 'Heading displayed in header region',
    },
  },
};

export default meta;
type Story = StoryObj<SidebarArgs>;

/**
 * 1. Interactive Playground Sandbox
 */
export const Playground: Story = {
  render: (args) => {
    const classList = ['sidebar'];
    if (args.variant === 'sticky' || args.isSticky) classList.push('sidebar--sticky');
    if (args.variant === 'flush' || args.isFlush) classList.push('sidebar--flush');
    if (args.variant === 'floating' || args.isFloating) classList.push('sidebar--floating');
    if (args.variant === 'end' || args.isEnd) classList.push('sidebar--end');

    return `
      <div style="display: flex; min-block-size: 34rem; border: 1px dashed var(--border-color-quiet, #ccc); border-radius: var(--radius-md, 8px); overflow: hidden; background: var(--surface-ground, #f8fafc);">
        ${args.isEnd ? '<div style="flex: 1; padding: var(--spacing-cushion, 1.25rem);"><p class="text-muted font-size-sm">Primary workspace pane...</p></div>' : ''}
        
        <aside class="${classList.join(' ')}" aria-label="${args.title}" style="block-size: 34rem;">
          ${args.hasHeader
        ? `
            <header class="sidebar__header">
              <span class="micro-heading text-muted">${args.title}</span>
              <button type="button" class="button button--subtle button--icon button--sm" aria-label="Filter navigation">
                <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Search"/></svg>
              </button>
            </header>
          `
        : ''
      }

          <div class="sidebar__scroller">
            <nav class="tab-list ${args.isFlush ? 'tab-list--flush tab-list--tight' : ''} tab-list--segmented tab-list--subtle tab-list--vertical" aria-label="Sections">
              <ul>
                <li>
                  <span class="tab-list__content micro-heading text-muted">Core Overview</span>
                  <ul>
                    <li>
                      <a href="#intro" class="tab" aria-current="page" onclick="event.preventDefault();">
                        <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Compass"/></svg>
                        <span class="tab__text">Introduction</span>
                      </a>
                    </li>
                    <li>
                      <a href="#tokens" class="tab" onclick="event.preventDefault();">
                        <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Settings"/></svg>
                        <span class="tab__text">Design Tokens</span>
                        <span class="chip chip--sm"><span class="chip__text">v2.0</span></span>
                      </a>
                    </li>
                    <li>
                      <a href="#accessibility" class="tab" onclick="event.preventDefault();">
                        <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Check"/></svg>
                        <span class="tab__text">Accessibility (WCAG)</span>
                      </a>
                    </li>
                  </ul>
                </li>
                <li class="margin-top">
                  <span class="tab-list__content micro-heading text-muted">Layout Primitives</span>
                  <ul>
                    <li>
                      <a href="#sidebar" class="tab" onclick="event.preventDefault();">
                        <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Layers"/></svg>
                        <span class="tab__text">Sidebar (.sidebar)</span>
                        <span class="status status--success status--sm"><span class="status__text">New</span></span>
                      </a>
                    </li>
                    <li>
                      <a href="#app" class="tab" onclick="event.preventDefault();">
                        <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Home"/></svg>
                        <span class="tab__text">App Shell (.app)</span>
                      </a>
                    </li>
                    <li>
                      <a href="#split" class="tab" onclick="event.preventDefault();">
                        <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Columns"/></svg>
                        <span class="tab__text">Split (.split)</span>
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </nav>
          </div>

          ${args.hasFooter
        ? `
            <footer class="sidebar__footer">
              <div class="inline gap-sm" style="align-items: center;">
                <span class="status status--success status--plain status--sm status--round"></span>
                <span class="small-text text-muted">Design For Humans</span>
              </div>
              <span class="chip chip--subtle chip--sm"><span class="chip__text">v2.4</span></span>
            </footer>
          `
        : ''
      }
        </aside>

        ${!args.isEnd ? '<div style="flex: 1; padding: var(--spacing-cushion, 1.25rem);"><p class="text-muted font-size-sm">Primary workspace pane...</p></div>' : ''}
      </div>
    `;
  },
};

/**
 * 2. Hierarchical Documentation Navigation
 * Canonical documentation sidebar with collapsible groups and badges,
 * composed with .tab-list.tab-list--segmented.tab-list--subtle.tab-list--vertical.
 */
export const HierarchicalNavigation: Story = {
  render: () => `
    <div style="display: flex; block-size: 38rem; border: 1px solid var(--border-color-quiet, #e2e8f0); border-radius: var(--radius-md, 8px); overflow: hidden;">
      <aside class="sidebar sidebar--flush" aria-label="Documentation Navigation" style="inline-size: 19rem;">
        
        <header class="sidebar__header" style="padding: var(--spacing-cushion, 1.25rem) var(--spacing-cushion, 1.25rem) var(--spacing-sm, 0.75rem);">
          <div class="stack" style="--gap: var(--spacing-2, 0.125rem); inline-size: 100%;">
            <span class="micro-heading text-muted">Design System</span>
            <span class="small-heading" style="font-weight: 700;">Documentation</span>
          </div>
        </header>

        <div class="sidebar__scroller">
          <nav class="tab-list tab-list--flush tab-list--tight tab-list--sm tab-list--segmented tab-list--subtle tab-list--vertical" aria-label="Documentation Sections">
            <ul>
              
              <!-- Getting Started Section -->
              <li class="margin-bottom-sm">
                <button type="button" class="button button--plain button--sm button--icon" aria-expanded="true" aria-controls="docs-nav-getting-started">
                  <span class="visually-hidden">Toggle Getting Started</span>
                  <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#ChevronDown"/></svg>
                </button>
                <span class="tab-list__content micro-heading">Getting Started</span>
                <ul id="docs-nav-getting-started">
                  <li>
                    <a href="#overview" class="tab" aria-current="page" onclick="event.preventDefault();">
                      <span class="tab__text">Overview</span>
                    </a>
                  </li>
                  <li>
                    <a href="#composition" class="tab" onclick="event.preventDefault();">
                      <span class="tab__text">Composition Law</span>
                      <span class="chip chip--subtle chip--sm"><span class="chip__text">Core</span></span>
                    </a>
                  </li>
                  <li>
                    <a href="#accessibility" class="tab" onclick="event.preventDefault();">
                      <span class="tab__text">Accessibility (WCAG 2.2)</span>
                      <span class="status status--accent status--sm"><span class="status__text">AAA</span></span>
                    </a>
                  </li>
                </ul>
              </li>

              <!-- Layout Primitives Section -->
              <li class="margin-bottom-sm">
                <button type="button" class="button button--plain button--sm button--icon" aria-expanded="true" aria-controls="docs-nav-layout">
                  <span class="visually-hidden">Toggle Layout Primitives</span>
                  <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#ChevronDown"/></svg>
                </button>
                <span class="tab-list__content micro-heading">Layout Primitives</span>
                <ul id="docs-nav-layout">
                  <li>
                    <a href="#sidebar" class="tab" onclick="event.preventDefault();">
                      <span class="tab__text">Sidebar (.sidebar)</span>
                      <span class="status status--success status--sm"><span class="status__text">New</span></span>
                    </a>
                  </li>
                  <li>
                    <a href="#app" class="tab" onclick="event.preventDefault();">
                      <span class="tab__text">App Shell (.app)</span>
                    </a>
                  </li>
                  <li>
                    <a href="#split" class="tab" onclick="event.preventDefault();">
                      <span class="tab__text">Split (.split)</span>
                    </a>
                  </li>
                  <li>
                    <a href="#grid" class="tab" onclick="event.preventDefault();">
                      <span class="tab__text">Grid (.grid)</span>
                    </a>
                  </li>
                  <li>
                    <a href="#cluster" class="tab" onclick="event.preventDefault();">
                      <span class="tab__text">Cluster & Stack</span>
                    </a>
                  </li>
                </ul>
              </li>

              <!-- Components Section -->
              <li class="margin-bottom-sm">
                <button type="button" class="button button--plain button--sm button--icon" aria-expanded="true" aria-controls="docs-nav-components">
                  <span class="visually-hidden">Toggle Components</span>
                  <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#ChevronDown"/></svg>
                </button>
                <span class="tab-list__content micro-heading">Components</span>
                <ul id="docs-nav-components">
                  <li>
                    <a href="#button" class="tab" onclick="event.preventDefault();">
                      <span class="tab__text">Button Primitive</span>
                    </a>
                  </li>
                  <li>
                    <a href="#tab-list" class="tab" onclick="event.preventDefault();">
                      <span class="tab__text">Tab List (Navigation)</span>
                      <span class="status status--accent status--sm"><span class="status__text">Updated</span></span>
                    </a>
                  </li>
                  <li>
                    <a href="#card" class="tab" onclick="event.preventDefault();">
                      <span class="tab__text">Card & Deck</span>
                    </a>
                  </li>
                  <li>
                    <a href="#dialog" class="tab" onclick="event.preventDefault();">
                      <span class="tab__text">Dialog (Native Modal)</span>
                    </a>
                  </li>
                </ul>
              </li>

            </ul>
          </nav>
        </div>

        <footer class="sidebar__footer">
          <div class="inline gap-sm" style="align-items: center;">
            <svg class="icon text-muted" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Code"/></svg>
            <span class="small-text text-muted">Branch: <code>main</code></span>
          </div>
          <a href="#" class="link small-text" onclick="event.preventDefault();">GitHub &rarr;</a>
        </footer>

      </aside>

      <main class="main padding" style="flex: 1; overflow-y: auto;">
        <div class="stack" style="--gap: var(--spacing-16, 1rem);">
          <h2 class="heading">Documentation Main Content</h2>
          <p class="text text-muted">
            The documentation sidebar uses <code>.sidebar.sidebar--flush</code> to ensure the vertical navigation tabs bleed seamlessly to the inline container edge. The scrollport operates with <code>overscroll-behavior: contain</code> and <code>scrollbar-gutter: stable</code>.
          </p>
        </div>
      </main>
    </div>
  `,
};

/**
 * 3. Flush Edge-to-Edge Navigation
 * Demonstrates the .sidebar--flush modifier for tight, modern IDE-style navigation.
 */
export const FlushEdgeToEdge: Story = {
  render: () => `
    <div style="display: flex; block-size: 30rem; border: 1px solid var(--border-color-quiet, #e2e8f0); border-radius: var(--radius-md, 8px); overflow: hidden;">
      <aside class="sidebar sidebar--flush" aria-label="Project Explorer" style="inline-size: 16rem;">
        
        <header class="sidebar__header">
          <span class="micro-heading text-muted">Explorer</span>
          <div class="inline gap-xs">
            <button type="button" class="button button--plain button--icon button--sm" aria-label="New file">
              <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Plus"/></svg>
            </button>
            <button type="button" class="button button--plain button--icon button--sm" aria-label="Collapse all">
              <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#ChevronStart"/></svg>
            </button>
          </div>
        </header>

        <div class="sidebar__scroller">
          <nav class="tab-list tab-list--flush tab-list--tight tab-list--sm tab-list--segmented tab-list--subtle tab-list--vertical" aria-label="Files">
            <ul>
              <li>
                <span class="tab-list__content micro-heading text-muted">src/layout</span>
                <ul>
                  <li>
                    <a href="#sidebar-css" class="tab" aria-current="page" onclick="event.preventDefault();">
                      <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Code"/></svg>
                      <span class="tab__text">sidebar.css</span>
                      <span class="status status--success status--sm"><span class="status__text">A</span></span>
                    </a>
                  </li>
                  <li>
                    <a href="#app-css" class="tab" onclick="event.preventDefault();">
                      <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Code"/></svg>
                      <span class="tab__text">app.css</span>
                    </a>
                  </li>
                  <li>
                    <a href="#grid-css" class="tab" onclick="event.preventDefault();">
                      <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Code"/></svg>
                      <span class="tab__text">grid.css</span>
                    </a>
                  </li>
                  <li>
                    <a href="#split-css" class="tab" onclick="event.preventDefault();">
                      <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Code"/></svg>
                      <span class="tab__text">split.css</span>
                    </a>
                  </li>
                </ul>
              </li>
              <li class="margin-top">
                <span class="tab-list__content micro-heading text-muted">src/molecules</span>
                <ul>
                  <li>
                    <a href="#tab-list-css" class="tab" onclick="event.preventDefault();">
                      <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Code"/></svg>
                      <span class="tab__text">tab-list.css</span>
                      <span class="status status--accent status--sm"><span class="status__text">M</span></span>
                    </a>
                  </li>
                  <li>
                    <a href="#field-css" class="tab" onclick="event.preventDefault();">
                      <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Code"/></svg>
                      <span class="tab__text">field.css</span>
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>

        <footer class="sidebar__footer">
          <span class="small-text text-muted">UTF-8</span>
          <span class="small-text text-muted">CSS3 Modules</span>
        </footer>

      </aside>

      <main class="padding" style="flex: 1; background: var(--surface-card, #fff);">
        <p class="font-size-sm text-muted">IDE Code Workspace Canvas</p>
      </main>
    </div>
  `,
};

/**
 * 4. With Header, Search & User Profile Footer
 * Full three-region layout featuring an interactive search input in the header
 * and an avatar lockup in the footer.
 */
export const WithHeaderAndFooter: Story = {
  render: () => `
    <div style="display: flex; block-size: 34rem; border: 1px solid var(--border-color-quiet, #e2e8f0); border-radius: var(--radius-md, 8px); overflow: hidden;">
      <aside class="sidebar" aria-label="Application Console" style="inline-size: 18rem;">
        
        <header class="sidebar__header" style="flex-direction: column; align-items: stretch; gap: var(--spacing-sm, 0.75rem);">
          <div class="inline" style="justify-content: space-between; align-items: center;">
            <div class="inline gap-xs" style="align-items: center;">
              <div style="inline-size: 24px; block-size: 24px; border-radius: 6px; background: var(--surface-accent, #6366f1); display: grid; place-items: center; color: white;">
                <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Star"/></svg>
              </div>
              <span class="small-heading" style="font-weight: 700;">Acme Cloud</span>
            </div>
            <button type="button" class="button button--subtle button--icon button--sm" aria-label="Switch organization">
              <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#ChevronDown"/></svg>
            </button>
          </div>

          <div class="field" style="margin: 0;">
            <div class="input-lockup" style="position: relative;">
              <input type="search" class="input input--sm input--subtle" placeholder="Jump to..." aria-label="Quick search navigation" style="inline-size: 100%; padding-inline-start: 2rem;" />
              <svg class="icon text-muted" width="1em" height="1em" style="position: absolute; inset-inline-start: 0.6rem; inset-block-start: 50%; transform: translateY(-50%); pointer-events: none;" aria-hidden="true" focusable="false"><use href="#Search"/></svg>
            </div>
          </div>
        </header>

        <div class="sidebar__scroller">
          <nav class="tab-list tab-list--segmented tab-list--subtle tab-list--vertical" aria-label="Platform">
            <ul>
              <li>
                <a href="#dashboard" class="tab" aria-current="page" onclick="event.preventDefault();">
                  <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Home"/></svg>
                  <span class="tab__text">Dashboard</span>
                </a>
              </li>
              <li>
                <a href="#analytics" class="tab" onclick="event.preventDefault();">
                  <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#ChartBar"/></svg>
                  <span class="tab__text">Analytics</span>
                </a>
              </li>
              <li>
                <a href="#deployments" class="tab" onclick="event.preventDefault();">
                  <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Rocket"/></svg>
                  <span class="tab__text">Deployments</span>
                  <span class="status status--warning status--sm"><span class="status__text">2 Live</span></span>
                </a>
              </li>
              <li>
                <a href="#security" class="tab" onclick="event.preventDefault();">
                  <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Shield"/></svg>
                  <span class="tab__text">Security & Access</span>
                </a>
              </li>
              <li>
                <a href="#settings" class="tab" onclick="event.preventDefault();">
                  <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Settings"/></svg>
                  <span class="tab__text">Settings</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <footer class="sidebar__footer">
          <div class="inline gap-sm" style="align-items: center; min-inline-size: 0;">
            <div class="avatar avatar--sm" aria-hidden="true">
              <span class="avatar__fallback">PW</span>
            </div>
            <div class="stack" style="--gap: 0; min-inline-size: 0;">
              <span class="micro-heading text-ellipsis" style="font-weight: 600;">Paul Woods</span>
              <span class="small-text text-muted text-ellipsis">paul@designforhumans.io</span>
            </div>
          </div>
          <button type="button" class="button button--plain button--icon button--sm" aria-label="User account actions">
            <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#More"/></svg>
          </button>
        </footer>

      </aside>

      <main class="padding" style="flex: 1; background: var(--surface-ground, #fafafa);">
        <p class="font-size-sm text-muted">Cloud Infrastructure Dashboard Main Workspace</p>
      </main>
    </div>
  `,
};

/**
 * 5. Floating Translucent Mode (.sidebar--floating)
 * Elevated glassmorphic dock panel with backdrop blur and border radius.
 */
export const FloatingTranslucent: Story = {
  render: () => `
    <div style="display: flex; block-size: 30rem; border: 1px solid var(--border-color-quiet, #ccc); border-radius: var(--radius-md, 8px); overflow: hidden; background: linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%);">
      <aside class="sidebar sidebar--floating" aria-label="Floating Palette" style="inline-size: 16rem; block-size: calc(100% - 1.5rem);">
        
        <header class="sidebar__header">
          <span class="micro-heading" style="color: currentColor; font-weight: 700;">Toolbox</span>
          <span class="status status--accent status--sm"><span class="status__text">Active</span></span>
        </header>

        <div class="sidebar__scroller">
          <nav class="tab-list tab-list--segmented tab-list--subtle tab-list--vertical" aria-label="Tools">
            <ul>
              <li>
                <a href="#select" class="tab" aria-current="page" onclick="event.preventDefault();">
                  <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Point"/></svg>
                  <span class="tab__text">Select Tool</span>
                </a>
              </li>
              <li>
                <a href="#pen" class="tab" onclick="event.preventDefault();">
                  <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Edit"/></svg>
                  <span class="tab__text">Vector Pen</span>
                </a>
              </li>
              <li>
                <a href="#shapes" class="tab" onclick="event.preventDefault();">
                  <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Box"/></svg>
                  <span class="tab__text">Shapes</span>
                </a>
              </li>
              <li>
                <a href="#typography" class="tab" onclick="event.preventDefault();">
                  <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Type"/></svg>
                  <span class="tab__text">Text Layer</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <footer class="sidebar__footer">
          <button type="button" class="button button--subtle button--sm w-full" style="justify-content: center;">
            <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Plus"/></svg>
            <span>Add Plugin</span>
          </button>
        </footer>

      </aside>

      <main style="flex: 1; padding: 2rem; color: white;">
        <h3 class="heading" style="color: white;">Canvas Studio</h3>
        <p class="text" style="color: rgba(255, 255, 255, 0.8);">
          <code>.sidebar--floating</code> floats above rich media canvases or gradients with built-in backdrop blur.
        </p>
      </main>
    </div>
  `,
};

/**
 * 6. Trailing Inspector Panel (.sidebar--end)
 * Pinned to the trailing inline edge with inverted border rule for properties and metadata.
 */
export const InspectorEndPanel: Story = {
  render: () => `
    <div style="display: flex; block-size: 32rem; border: 1px solid var(--border-color-quiet, #e2e8f0); border-radius: var(--radius-md, 8px); overflow: hidden;">
      
      <main class="padding" style="flex: 1; background: var(--surface-card, #fff); overflow-y: auto;">
        <div class="stack" style="--gap: var(--spacing-12, 0.75rem);">
          <h3 class="heading">Element Canvas</h3>
          <p class="text text-muted">Select an element to inspect and edit its geometry tokens in the trailing sidebar.</p>
          <div style="inline-size: 100%; block-size: 16rem; border: 2px dashed var(--border-color-quiet, #cbd5e1); border-radius: var(--radius-md, 8px); display: grid; place-items: center;">
            <span class="status status--accent status--strong"><span class="status__text">Selected: #card-hero-banner</span></span>
          </div>
        </div>
      </main>

      <aside class="sidebar sidebar--end" aria-label="Properties Inspector" style="inline-size: 20rem;">
        
        <header class="sidebar__header">
          <span class="small-heading" style="font-weight: 700;">Properties</span>
          <button type="button" class="button button--plain button--icon button--sm" aria-label="Close inspector">
            <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Close"/></svg>
          </button>
        </header>

        <div class="sidebar__scroller">
          <div class="stack" style="--gap: var(--spacing-16, 1rem);">
            
            <fieldset class="field" style="border: none; padding: 0; margin: 0;">
              <legend class="micro-heading text-muted margin-bottom-xs">Transform & Dimensions</legend>
              <div class="grid grid--2 gap-xs">
                <div>
                  <label for="prop-w" class="small-text text-muted">Width</label>
                  <input id="prop-w" type="text" class="input input--sm" value="384px" />
                </div>
                <div>
                  <label for="prop-h" class="small-text text-muted">Height</label>
                  <input id="prop-h" type="text" class="input input--sm" value="auto" />
                </div>
              </div>
            </fieldset>

            <fieldset class="field" style="border: none; padding: 0; margin: 0;">
              <legend class="micro-heading text-muted margin-bottom-xs">Layout & Alignment</legend>
              <div class="stack gap-xs">
                <div class="inline gap-xs">
                  <button type="button" class="button button--subtle button--sm button--icon" aria-label="Align left"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#AlignLeft"/></svg></button>
                  <button type="button" class="button button--subtle button--sm button--icon is-active" aria-label="Align center"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#AlignCenter"/></svg></button>
                  <button type="button" class="button button--subtle button--sm button--icon" aria-label="Align right"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#AlignRight"/></svg></button>
                </div>
              </div>
            </fieldset>

            <fieldset class="field" style="border: none; padding: 0; margin: 0;">
              <legend class="micro-heading text-muted margin-bottom-xs">Surface Token</legend>
              <select class="select select--sm" aria-label="Select surface token">
                <option value="surface-card">--surface-card (Default)</option>
                <option value="surface-layer">--surface-layer (Translucent)</option>
                <option value="surface-ground">--surface-ground (Canvas)</option>
              </select>
            </fieldset>

          </div>
        </div>

        <footer class="sidebar__footer">
          <button type="button" class="button button--danger button--subtle button--sm">
            <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Delete"/></svg>
            <span>Delete Layer</span>
          </button>
          <button type="button" class="button button--strong button--accent button--sm">
            <span>Apply</span>
          </button>
        </footer>

      </aside>

    </div>
  `,
};

/**
 * 7. Holy Grail Application Shell Integration
 * Illustrates .sidebar.sidebar--sticky combined with .app, .header, and scrolling .main.
 */
export const AppShellIntegration: Story = {
  render: () => `
    <div class="app" style="block-size: 36rem; border: 1px solid var(--border-color-quiet, #e2e8f0); border-radius: var(--radius-md, 8px); overflow: hidden;">
      
      <!-- Pinned Top Header -->
      <header class="header padding" style="block-size: var(--sidebar-header-height, 3.75rem); display: flex; align-items: center; justify-content: space-between; border-block-end: 1px solid var(--border-color-quiet, #e2e8f0); background: var(--surface-card, #fff);">
        <div class="inline gap-sm" style="align-items: center;">
          <svg class="icon text-accent" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Star"/></svg>
          <span class="small-heading" style="font-weight: 700;">Design For Humans</span>
        </div>
        <div class="inline gap-sm">
          <button type="button" class="button button--subtle button--sm"><span>Docs</span></button>
          <button type="button" class="button button--strong button--accent button--sm"><span>Deploy</span></button>
        </div>
      </header>

      <!-- Main Shell with In-Flow Sidebar + Main Workspace -->
      <div style="display: flex; block-size: calc(100% - 3.75rem); overflow: hidden;">
        
        <aside class="sidebar sidebar--sticky sidebar--flush" aria-label="App Navigation" style="inline-size: 16rem;">
          <div class="sidebar__scroller">
            <nav class="tab-list tab-list--flush tab-list--tight tab-list--sm tab-list--segmented tab-list--subtle tab-list--vertical" aria-label="Primary">
              <ul>
                <li>
                  <a href="#overview" class="tab" aria-current="page" onclick="event.preventDefault();">
                    <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Home"/></svg>
                    <span class="tab__text">Overview</span>
                  </a>
                </li>
                <li>
                  <a href="#activity" class="tab" onclick="event.preventDefault();">
                    <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#ChartBar"/></svg>
                    <span class="tab__text">Live Telemetry</span>
                  </a>
                </li>
                <li>
                  <a href="#clusters" class="tab" onclick="event.preventDefault();">
                    <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Grid"/></svg>
                    <span class="tab__text">Clusters</span>
                  </a>
                </li>
                <li>
                  <a href="#settings" class="tab" onclick="event.preventDefault();">
                    <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Settings"/></svg>
                    <span class="tab__text">Settings</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </aside>

        <main class="main padding" style="flex: 1; overflow-y: auto; background: var(--surface-ground, #fafafa);">
          <div class="stack" style="--gap: var(--spacing-16, 1rem); max-inline-size: 48rem;">
            <header>
              <h1 class="heading">Production Telemetry Dashboard</h1>
              <p class="text text-muted">
                Demonstrating the Holy Grail architecture: top <code>.header</code> is pinned, the left <code>.sidebar--sticky</code> remains anchored, and <code>.main</code> scrolls continuously.
              </p>
            </header>

            <div class="grid grid--3 gap-md">
              <div class="card card--bordered padding stack gap-xs">
                <span class="micro-heading text-muted">Requests / Sec</span>
                <span class="heading" style="font-size: 1.75rem;">12,480</span>
                <span class="status status--success status--sm"><span class="status__text">+14.2%</span></span>
              </div>
              <div class="card card--bordered padding stack gap-xs">
                <span class="micro-heading text-muted">P99 Latency</span>
                <span class="heading" style="font-size: 1.75rem;">18ms</span>
                <span class="status status--accent status--sm"><span class="status__text">Optimal</span></span>
              </div>
              <div class="card card--bordered padding stack gap-xs">
                <span class="micro-heading text-muted">Error Rate</span>
                <span class="heading" style="font-size: 1.75rem;">0.002%</span>
                <span class="status status--subtle status--sm"><span class="status__text">Nominal</span></span>
              </div>
            </div>

            <div class="card card--bordered padding stack gap-sm">
              <h3 class="small-heading">System Log Stream</h3>
              <p class="text text-muted">Scroll down to observe independent main viewport scrolling alongside the pinned sidebar.</p>
              <div style="block-size: 20rem; background: var(--surface-card, #fff); border-radius: var(--radius-sm, 4px); border: 1px solid var(--border-color-quiet, #eee); padding: 1rem;">
                <p class="small-text text-muted">[2026-10-18T00:14:02Z] INFO worker-node-04: Health check passed (0ms)</p>
                <p class="small-text text-muted">[2026-10-18T00:14:15Z] INFO api-gateway: Handled 200 OK /v1/tokens</p>
                <p class="small-text text-muted">[2026-10-18T00:14:30Z] INFO sync-daemon: Figma design tokens synchronized</p>
                <p class="small-text text-muted">[2026-10-18T00:15:00Z] INFO audit-agent: WCAG 2.2 AAA checks completed</p>
              </div>
            </div>

          </div>
        </main>

      </div>
    </div>
  `,
};

/**
 * 8. Responsive Mobile Off-Canvas Drawer
 * Demonstrates the mobile drawer state (< 48em) with .is-open class toggle.
 */
export const MobileDrawerMode: Story = {
  render: () => `
    <div style="position: relative; block-size: 28rem; border: 1px solid var(--border-color-quiet, #e2e8f0); border-radius: var(--radius-md, 8px); overflow: hidden; background: var(--surface-ground, #fafafa); display: flex; flex-direction: column;">
      
      <header class="padding" style="display: flex; align-items: center; justify-content: space-between; background: var(--surface-card, #fff); border-block-end: 1px solid var(--border-color-quiet, #e2e8f0);">
        <button
          type="button"
          class="button button--subtle button--icon"
          id="demo-drawer-toggle"
          aria-expanded="false"
          aria-controls="demo-mobile-sidebar"
          aria-label="Open mobile navigation drawer"
        >
          <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Navigation"/></svg>
        </button>
        <span class="small-heading" style="font-weight: 700;">Mobile Viewport Demo</span>
        <div style="inline-size: 2.25rem;"></div>
      </header>

      <main class="padding" style="flex: 1;">
        <div class="stack gap-sm">
          <p class="text">
            Click the hamburger menu button above to slide the <code>.sidebar</code> off-canvas drawer into view.
          </p>
          <p class="text-muted font-size-sm">
            On viewports narrower than <code>48em</code> (768px), <code>layout/sidebar.css</code> automatically positions <code>.sidebar</code> fixed off-screen with <code>transform: translateX(-100%)</code> and transitions smoothly when <code>.is-open</code> is toggled.
          </p>
        </div>
      </main>

      <!-- Sidebar configured with explicit mobile drawer styling for demo visibility -->
      <aside
        id="demo-mobile-sidebar"
        class="sidebar"
        aria-label="Mobile Navigation"
        style="
          position: absolute;
          inset-block: 0;
          inset-inline-start: 0;
          inline-size: 18rem;
          block-size: 100%;
          transform: translateX(-100%);
          transition: transform 250ms ease;
          box-shadow: var(--card-layer-shadow, 0 10px 30px rgba(0, 0, 0, 0.25));
          z-index: 50;
        "
      >
        <header class="sidebar__header">
          <span class="micro-heading text-muted">Navigation Menu</span>
          <button
            type="button"
            class="button button--subtle button--icon button--sm"
            id="demo-drawer-close"
            aria-label="Close navigation drawer"
          >
            <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Close"/></svg>
          </button>
        </header>

        <div class="sidebar__scroller">
          <nav class="tab-list tab-list--segmented tab-list--subtle tab-list--vertical" aria-label="Mobile Sections">
            <ul>
              <li>
                <a href="#home" class="tab" aria-current="page" onclick="event.preventDefault();">
                  <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Home"/></svg>
                  <span class="tab__text">Home</span>
                </a>
              </li>
              <li>
                <a href="#components" class="tab" onclick="event.preventDefault();">
                  <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Layers"/></svg>
                  <span class="tab__text">Components</span>
                </a>
              </li>
              <li>
                <a href="#tokens" class="tab" onclick="event.preventDefault();">
                  <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Settings"/></svg>
                  <span class="tab__text">Design Tokens</span>
                </a>
              </li>
              <li>
                <a href="#docs" class="tab" onclick="event.preventDefault();">
                  <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#FileText"/></svg>
                  <span class="tab__text">Documentation</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <footer class="sidebar__footer">
          <span class="small-text text-muted">Mobile Mode (48em)</span>
        </footer>
      </aside>

      <script>
        (function() {
          const toggleBtn = document.getElementById('demo-drawer-toggle');
          const closeBtn = document.getElementById('demo-drawer-close');
          const drawer = document.getElementById('demo-mobile-sidebar');

          if (toggleBtn && drawer) {
            toggleBtn.addEventListener('click', () => {
              drawer.style.transform = 'translateX(0)';
              toggleBtn.setAttribute('aria-expanded', 'true');
            });
          }

          if (closeBtn && drawer) {
            closeBtn.addEventListener('click', () => {
              drawer.style.transform = 'translateX(-100%)';
              if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'false');
            });
          }
        })();
      </script>

    </div>
  `,
};

/**
 * 8. NavigationRail (.sidebar--rail)
 * Ultra-compact 4.5rem (72px) permanent icon rail for multi-tiered application navigation.
 */
export const NavigationRail: StoryObj<SidebarArgs> = {
  render: () => `
    <div style="block-size: 32rem; display: flex; border: var(--border-width, 1px) solid var(--border-color-quiet); border-radius: var(--radius-md); overflow: hidden; background-color: var(--surface);">
      <!-- Primary Navigation Rail -->
      <aside class="sidebar sidebar--rail" aria-label="Primary Navigation Rail">
        <header class="sidebar__header">
          <a href="#home" class="link inline align-items-center justify-content-center" aria-label="Home" onclick="event.preventDefault();">
            <div class="avatar avatar--sm radius-sm" style="--avatar-bg: var(--foreground-accent); --avatar-text: #fff;">
              <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#BrandDesignForHumans"/></svg>
            </div>
          </a>
        </header>

        <div class="sidebar__scroller">
          <nav class="tab-list tab-list--vertical tab-list--plain tab-list--sm" aria-label="Navigation Tiers">
            <ul>
              <li>
                <button type="button" class="tab" aria-current="page" aria-label="Broadcast Studio" title="Broadcast Studio">
                  <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Radio"/></svg>
                  <span class="visually-hidden">Broadcast</span>
                </button>
              </li>
              <li>
                <button type="button" class="tab" aria-label="Broadcast Schedule" title="Broadcast Schedule">
                  <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Calendar"/></svg>
                  <span class="visually-hidden">Schedule</span>
                </button>
              </li>
              <li>
                <button type="button" class="tab" aria-label="Media Library" title="Media Library">
                  <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Folder"/></svg>
                  <span class="visually-hidden">Library</span>
                </button>
              </li>
              <li>
                <button type="button" class="tab" aria-label="Telemetry & Analytics" title="Telemetry & Analytics">
                  <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#ChartBar"/></svg>
                  <span class="visually-hidden">Analytics</span>
                </button>
              </li>
              <li>
                <button type="button" class="tab" aria-label="System Settings" title="System Settings">
                  <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Settings"/></svg>
                  <span class="visually-hidden">Settings</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>

        <footer class="sidebar__footer flex-direction-column gap-xs">
          <button type="button" class="button button--plain button--icon button--sm" aria-label="Quick Search">
            <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Search"/></svg>
          </button>
          <button type="button" class="button button--avatar button--round" aria-label="Alex Morgan profile" title="Station Manager Alex Morgan">
            <span class="avatar avatar--sm radius-round" data-status="online">AM</span>
          </button>
        </footer>
      </aside>

      <!-- Submenu Drawer -->
      <aside class="sidebar sidebar--flush" style="min-inline-size: 14rem; max-inline-size: 14rem;" aria-label="Sub-navigation">
        <header class="sidebar__header">
          <h3 class="small-heading margin-0">Broadcast</h3>
        </header>
        <div class="sidebar__scroller">
          <nav class="tab-list tab-list--vertical tab-list--plain tab-list--flush tab-list--sm" aria-label="Submenu">
            <ul>
              <li><a href="#live" class="tab" aria-current="page" onclick="event.preventDefault();"><span class="tab__text">Live Stream</span><span class="status status--success status--sm"><span class="status__text">On Air</span></span></a></li>
              <li><a href="#sched" class="tab" onclick="event.preventDefault();"><span class="tab__text">Schedule & Events</span></a></li>
              <li><a href="#queues" class="tab" onclick="event.preventDefault();"><span class="tab__text">Playlists</span><span class="badge badge--sm"><span class="badge__text">8</span></span></a></li>
              <li><a href="#automation" class="tab" onclick="event.preventDefault();"><span class="tab__text">Automation Carts</span></a></li>
            </ul>
          </nav>
        </div>
      </aside>

      <!-- Main Canvas Preview -->
      <main class="main" style="flex: 1; min-inline-size: 0; padding: var(--spacing-cushion); background-color: var(--surface-card);">
        <h2 class="heading margin-0">Studio Canvas</h2>
        <p class="text-muted">Content canvas expanding across remaining workspace width.</p>
      </main>
    </div>
  `,
};
