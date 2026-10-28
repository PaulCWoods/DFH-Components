import type { Meta, StoryObj } from '@storybook/html';

interface AppShellArgs {
  flushMain: boolean;
  hasFooter: boolean;
  withSidebar: boolean;
}

const meta: Meta<AppShellArgs> = {
  title: 'Layout/App & Main Shell',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
### Developer & Designer Notes: Application Shell Primitives (\`.app\` & \`.main\`)

The **App** (\`.app\`) and **Main** (\`.main\`) primitives deliver a responsive 3-row Holy Grail application frame utilizing modern dynamic viewport units (\`100dvb\`) and zero-specificity (\`:where()\`) CSS Grid.

Defined in \`layout/app.css\` and \`layout/main.css\`.

---

#### 1. Core Architectural Principles
1. **Dynamic Viewport Height (\`100dvb\`):** Uses modern dynamic viewport units (\`100dvb\`) to automatically accommodate collapsing browser chrome and mobile virtual keyboards without jarring page jumps.
2. **Automatic Landmark Grid Areas:** Elements naturally map to their designated grid areas via semantic tag matching:
   - \`:is(header, .header, .header-container)\` &rarr; \`grid-area: header\`
   - \`:is(main, .main)\` &rarr; \`grid-area: main\`
   - \`:is(footer, .footer)\` &rarr; \`grid-area: footer\`
3. **Cushioned vs Flush Landmarks (\`.main\`, \`.main--flush\`):** The \`.main\` primitive provides accessible token padding (\`var(--spacing-cushion, 1rem)\`) by default, while \`.main--flush\` clears padding for full-bleed data tables, map canvases, or nested \`.split\` sidebars.
4. **Independent Scrolling:** The shell manages internal viewport overflow (\`overflow: auto\`), keeping headers and footers pinned while allowing the central workspace to scroll cleanly.

---

#### 2. Canonical Semantic Markup Signatures
AI agents and developers MUST use the following semantic patterns:

\`\`\`html
<!-- 1. Standard Holy Grail Application Shell -->
<div class="app">
  <header class="header">
    <nav aria-label="Primary navigation">...</nav>
  </header>

  <main class="main" id="main-content">
    <div class="stack">...</div>
  </main>

  <footer class="footer">
    <p>System status</p>
  </footer>
</div>

<!-- 2. Application Shell with Nested Split Sidebar -->
<div class="app">
  <header class="header">...</header>

  <main class="main main--flush">
    <div class="split split--xs" style="block-size: 100%;">
      <aside class="padding">Sidebar nav...</aside>
      <div class="padding">Primary workspace...</div>
    </div>
  </main>
</div>

<!-- 3. Dual-Sidebar Application Shell (.app__workspace) -->
<div class="app app--viewport">
  <header class="header header--sticky">
    <nav aria-label="Global navigation">...</nav>
  </header>

  <div class="app__workspace">
    <aside class="sidebar sidebar--rail" aria-label="Main Navigation">...</aside>
    <aside class="sidebar" aria-label="Sub-navigation">...</aside>
    <main class="main" id="main-content">
      <div class="prose">...</div>
    </main>
  </div>

  <footer class="footer">
    <p>Persistent dock or system status</p>
  </footer>
</div>
\`\`\`

---

#### 3. Grid Areas & Landmark Contract

| Element Selector | Grid Area | Height / Behavior |
| :--- | :--- | :--- |
| \`header, .header, .header-container\` | \`header\` | \`auto\` (in-flow intrinsic height) |
| \`.app__workspace, .workspace\` | \`main\` | \`1fr\` (orchestrates sidebars and main content side-by-side) |
| \`main, .main\` | \`main\` | \`1fr\` (fills remaining vertical height, in \`.app\` or \`.app__workspace\`) |
| \`footer, .footer\` | \`footer\` | \`auto\` (in-flow intrinsic height) |

---

#### 4. Design Tokens & Landmark Theming Contract
Major application landmarks (\`.header\`, \`.sidebar\`, \`.footer\`) share unified semantic fallbacks (\`--app-border-width\` and \`--app-border-color\`), allowing developers and designers to theme the borders across all shell boundaries in a single declaration:

| Custom Property | Semantic Token Fallback | Default Value | Description |
| :--- | :--- | :--- | :--- |
| \`--app-border-width\` | \`var(--border-width)\` | \`2px\` (or \`1px\` thin) | Master perimeter stroke thickness for all major app landmarks |
| \`--app-border-color\` | \`var(--border-color-quiet)\` | \`currentColor\` (with alpha) | Master perimeter stroke color for all major app landmarks |
| \`--app-border-style\` | \`solid\` | \`solid\` | Master stroke style for all major app landmarks |
| \`--header-border-width\` | \`var(--app-border-width)\` | \`var(--border-width, 1px)\` | Header bottom border width |
| \`--header-border-color\` | \`var(--app-border-color)\` | \`var(--border-color-quiet)\` | Header bottom border color |
| \`--sidebar-border-width\` | \`var(--app-border-width)\` | \`var(--border-width, 1px)\` | Sidebar perimeter border width |
| \`--sidebar-border-color\` | \`var(--app-border-color)\` | \`var(--border-color-quiet)\` | Sidebar perimeter border color |
| \`--footer-border-width\` | \`var(--app-border-width)\` | \`var(--border-width, 1px)\` | Footer top border width |
| \`--footer-border-color\` | \`var(--app-border-color)\` | \`var(--border-color-quiet)\` | Footer top border color |

---

#### 5. WCAG 2.2 Accessibility Guidelines
- **Bypass Blocks (WCAG 2.4.1 Skip Link):** Always place a \`<a href="#main-content" class="skip-link">\` at the very beginning of the document body so keyboard and screen reader users can jump directly over headers to \`<main id="main-content">\`.
- **Landmark Semantics (WCAG 1.3.1):** Assistive technologies rely on \`<header>\` (\`banner\`), \`<main>\` (\`main\`), and \`<footer>\` (\`contentinfo\`) to announce major landmark zones.
        `,
      },
    },
  },
  args: {
    flushMain: false,
    hasFooter: true,
    withSidebar: false,
  },
  argTypes: {
    flushMain: {
      control: 'boolean',
      description: 'Zero padding on <main> for full-bleed maps, split sidebars, or tables (.main--flush)',
    },
    hasFooter: {
      control: 'boolean',
      description: 'Toggle persistent application footer landmark',
    },
    withSidebar: {
      control: 'boolean',
      description: 'Nest a .split sidebar inside the main workspace',
    },
  },
};

export default meta;
type Story = StoryObj<AppShellArgs>;

/**
 * 1. Interactive Playground (Live Sandbox)
 */
export const Playground: Story = {
  render: (args) => {
    const mainClass = args.flushMain ? 'main main--flush' : 'main';

    const mainContent = args.withSidebar
      ? `
        <div class="split split--xs" style="block-size: 100%;">
          <aside class="card card--bordered padding stack" style="--gap: var(--spacing-12); border-radius: 0; border-top: none; border-bottom: none; border-inline-start: none;">
            <p class="font-weight-bold font-size-sm">Sidebar Nav</p>
            <nav class="stack" style="--gap: var(--spacing-8);">
              <a href="#" class="link" onclick="event.preventDefault();"><span>Overview</span></a>
              <a href="#" class="link" onclick="event.preventDefault();"><span>Audit Rules</span></a>
              <a href="#" class="link" onclick="event.preventDefault();"><span>Token Studio</span></a>
            </nav>
          </aside>
          <div class="padding stack" style="--gap: var(--spacing-16);">
            <h3 class="font-size-md font-weight-bold">Primary Application Workspace</h3>
            <p class="font-size-sm text-muted">Nested .split sidebar inside .main--flush application shell.</p>
          </div>
        </div>
      `
      : `
        <div class="stack" style="--gap: var(--spacing-16);">
          <div>
            <h3 class="font-size-md font-weight-bold">Dashboard Main Workspace</h3>
            <p class="font-size-sm text-muted">Main application area with automatic token cushion padding.</p>
          </div>
          <div class="grid grid--xs">
            <div class="sb-demo-box sb-demo-box--sm"><p class="font-weight-bold">Widget A</p></div>
            <div class="sb-demo-box sb-demo-box--sm"><p class="font-weight-bold">Widget B</p></div>
          </div>
        </div>
      `;

    const footerElement = args.hasFooter
      ? `
        <footer class="footer font-size-xs text-muted" style="text-align: center;">
          <span>Design For Humans &middot; WCAG 2.2 AA / AAA Certified Application Shell</span>
        </footer>
      `
      : '';

    return `
      <div class="sb-demo-section wrapper wrapper--lg">
        <p class="sb-demo-desc">
          Live Sandbox: Simulating a 100dvb application shell inside an isolated preview frame.
        </p>
        <div class="sb-demo-frame sb-demo-frame--app">
          <div class="app">
            <header class="header padding-sm">
              <div class="inline" style="justify-content: space-between;">
                <div class="inline" style="--gap: var(--spacing-8);">
                  <div class="avatar avatar--sm" data-status="online"><span>DF</span></div>
                  <span class="font-weight-bold font-size-sm">Application Shell</span>
                </div>
                <div class="inline" style="--gap: var(--spacing-8);">
                  <button type="button" class="button button--subtle button--sm"><span>Settings</span></button>
                  <button type="button" class="button button--strong button--accent button--sm"><span>Deploy</span></button>
                </div>
              </div>
            </header>

            <main class="${mainClass}">
              ${mainContent}
            </main>

            ${footerElement}
          </div>
        </div>
      </div>
    `;
  },
};

/**
 * 2. Standard Holy Grail Shell
 */
export const HolyGrailShell: Story = {
  render: () => `
    <div class="sb-demo-group wrapper wrapper--lg">
      <div class="sb-demo-section">
        <h3 class="sb-demo-heading">Holy Grail Application Shell</h3>
        <p class="sb-demo-desc">
          3-row structure pinning the header and footer landmarks with automatic scroll containment in the central workspace.
        </p>
      </div>

      <div class="sb-demo-frame sb-demo-frame--app">
        <div class="app">
          <header class="padding-sm" style="background: var(--surface-card); border-bottom: 1px solid var(--border-color-quiet);">
            <div class="inline" style="justify-content: space-between;">
              <span class="font-weight-bold font-size-sm">Header Landmark (auto height)</span>
              <span class="status status--success"><span class="status__text">Live</span></span>
            </div>
          </header>

          <main class="main">
            <div class="stack" style="--gap: var(--spacing-16);">
              <h4 class="font-weight-bold font-size-md">Central Main Landmark (1fr height)</h4>
              <p class="font-size-sm text-muted">
                Main workspace automatically absorbs all available vertical height using CSS Grid (<code>grid-template-rows: auto 1fr auto</code>).
              </p>
            </div>
          </main>

          <footer class="padding-sm font-size-xs text-muted" style="background: var(--surface-card); border-top: 1px solid var(--border-color-quiet); text-align: center;">
            Footer Landmark (auto height)
          </footer>
        </div>
      </div>
    </div>
  `,
};

/**
 * 3. Shell with Nested Split Sidebar
 */
export const ShellWithSplitSidebar: Story = {
  render: () => `
    <div class="sb-demo-group wrapper wrapper--lg">
      <div class="sb-demo-section">
        <h3 class="sb-demo-heading">Application Shell with Nested <code>.split</code> Sidebar</h3>
        <p class="sb-demo-desc">
          Using <code>.main--flush</code> allows a nested <code>.split</code> container to run edge-to-edge from header to footer.
        </p>
      </div>

      <div class="sb-demo-frame sb-demo-frame--app">
        <div class="app">
          <header class="padding-sm" style="background: var(--surface-card); border-bottom: 1px solid var(--border-color-quiet);">
            <div class="inline" style="justify-content: space-between;">
              <span class="font-weight-bold font-size-sm">Audit Studio</span>
              <button type="button" class="button button--subtle button--sm"><span>Help</span></button>
            </div>
          </header>

          <main class="main main--flush">
            <div class="split split--xs" style="block-size: 100%;">
              <aside class="padding stack" style="--gap: var(--spacing-12); background: var(--surface-card); border-inline-end: 1px solid var(--border-color-quiet);">
                <p class="font-weight-bold font-size-sm">Navigation Index</p>
                <nav class="stack" style="--gap: var(--spacing-8);">
                  <a href="#" class="link" onclick="event.preventDefault();"><span>Overview</span></a>
                  <a href="#" class="link" onclick="event.preventDefault();"><span>Design Tokens</span></a>
                  <a href="#" class="link" onclick="event.preventDefault();"><span>WCAG Checklist</span></a>
                </nav>
              </aside>

              <div class="padding stack" style="--gap: var(--spacing-16);">
                <h4 class="font-weight-bold font-size-md">Workspace Panel</h4>
                <p class="font-size-sm text-muted">
                  Full-height content area with independent scroll capabilities.
                </p>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  `,
};

/**
 * 4. Full-Bleed Canvas / Map Shell (.main--flush)
 */
export const FullBleedCanvas: Story = {
  render: () => `
    <div class="sb-demo-group wrapper wrapper--lg">
      <div class="sb-demo-section">
        <h3 class="sb-demo-heading">Full-Bleed Canvas Shell (<code>.main--flush</code>)</h3>
        <p class="sb-demo-desc">
          Ideal for design canvases, code editors, or interactive data visualizations.
        </p>
      </div>

      <div class="sb-demo-frame sb-demo-frame--app">
        <div class="app">
          <header class="padding-sm" style="background: var(--surface-card); border-bottom: 1px solid var(--border-color-quiet);">
            <span class="font-weight-bold font-size-sm">Editor Bar</span>
          </header>

          <main class="main main--flush" style="display: flex; align-items: center; justify-content: center; background: repeating-linear-gradient(45deg, var(--surface), var(--surface) 10px, var(--surface-card) 10px, var(--surface-card) 20px);">
            <div class="card card--bordered padding stack" style="text-align: center; max-inline-size: 20rem;">
              <h4 class="font-weight-bold font-size-sm">Edge-to-Edge Canvas</h4>
              <p class="font-size-xs text-muted">Zero margin/padding restrictions.</p>
            </div>
          </main>
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
          Consolidated snapshot testing across all Application Shell modifiers and structures.
        </p>
      </div>

      <div class="grid grid--sm">
        <div class="card card--bordered padding stack">
          <h4 class="font-size-xs font-weight-bold">Standard Holy Grail Shell</h4>
          <div style="block-size: 10rem; position: relative; overflow: hidden; border: 1px dashed var(--border-color-quiet);">
            <div class="app">
              <header style="background: var(--surface-card); padding: 4px; font-size: 10px;">Header</header>
              <main class="main" style="padding: 8px; font-size: 11px;">Main Content</main>
              <footer style="background: var(--surface-card); padding: 4px; font-size: 10px;">Footer</footer>
            </div>
          </div>
        </div>

        <div class="card card--bordered padding stack">
          <h4 class="font-size-xs font-weight-bold">Flush Main Shell</h4>
          <div style="block-size: 10rem; position: relative; overflow: hidden; border: 1px dashed var(--border-color-quiet);">
            <div class="app">
              <header style="background: var(--surface-card); padding: 4px; font-size: 10px;">Header</header>
              <main class="main main--flush" style="padding: 0; font-size: 11px; background: var(--surface-muted);">Flush Canvas</main>
              <footer style="background: var(--surface-card); padding: 4px; font-size: 10px;">Footer</footer>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
};

/**
 * 6. WorkspaceShell (.app__workspace)
 * Modern dual-sidebar application layout orchestrating a slim navigation rail,
 * a contextual sub-navigation drawer, and an auto-expanding main canvas.
 */
export const WorkspaceShell: Story = {
  render: () => `
    <div style="block-size: 32rem; border: var(--border-width, 1px) solid var(--border-color-quiet); border-radius: var(--radius-md); overflow: hidden;">
      <div class="app app--viewport">
        <!-- Persistent Top Header -->
        <header class="header header--sticky padding-block-xs padding-inline-sm" style="border-block-end: 1px solid var(--border-color-quiet); background: var(--surface-card);">
          <div class="inline justify-content-between align-items-center inline-full">
            <div class="inline align-items-center gap-xs">
              <div class="avatar avatar--sm radius-sm" style="--avatar-bg: var(--foreground-accent); --avatar-text: #fff;">
                <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#BrandDesignForHumans"/></svg>
              </div>
              <strong class="font-size-sm">Console Workspace</strong>
            </div>
            <span class="status status--success status--sm"><span class="status__text">Live</span></span>
          </div>
        </header>

        <!-- App Workspace (.app__workspace) -->
        <div class="app__workspace">
          <!-- Primary Navigation Rail -->
          <aside class="sidebar sidebar--rail" aria-label="Main Navigation">
            <div class="sidebar__scroller">
              <nav class="tab-list tab-list--vertical tab-list--plain tab-list--sm" aria-label="Primary">
                <ul>
                  <li><a href="#dashboard" class="tab tab--icon" aria-current="page" onclick="event.preventDefault();"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Radio"/></svg><span class="tab__text">Dashboard</span></a></li>
                  <li><a href="#analytics" class="tab tab--icon" onclick="event.preventDefault();"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#ChartBar"/></svg><span class="tab__text">Analytics</span></a></li>
                  <li><a href="#settings" class="tab tab--icon" onclick="event.preventDefault();"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Settings"/></svg><span class="tab__text">Settings</span></a></li>
                </ul>
              </nav>
            </div>
          </aside>

          <!-- Contextual Submenu Sidebar -->
          <aside class="sidebar sidebar--flush" style="min-inline-size: 14rem; max-inline-size: 14rem;" aria-label="Sub-navigation">
            <header class="sidebar__header">
              <span class="micro-heading text-muted">Studio Sections</span>
            </header>
            <div class="sidebar__scroller">
              <nav class="tab-list tab-list--vertical tab-list--plain tab-list--flush tab-list--sm" aria-label="Studio sections">
                <ul>
                  <li><a href="#overview" class="tab" aria-current="page" onclick="event.preventDefault();"><span class="tab__text">Live Feed</span></a></li>
                  <li><a href="#channels" class="tab" onclick="event.preventDefault();"><span class="tab__text">Channels</span></a></li>
                  <li><a href="#logs" class="tab" onclick="event.preventDefault();"><span class="tab__text">System Logs</span></a></li>
                </ul>
              </nav>
            </div>
          </aside>

          <!-- Main Content Canvas -->
          <main class="main" style="padding: var(--spacing-cushion); background: var(--surface);">
            <div class="stack gap-sm">
              <h2 class="heading margin-0">Workspace Main Canvas</h2>
              <p class="text-muted margin-0">Orchestrated with zero-specificity layout primitives (.app, .app__workspace, .sidebar--rail, .main).</p>
            </div>
          </main>
        </div>

        <!-- Persistent Bottom Footer -->
        <footer class="footer padding-block-2xs padding-inline-sm" style="border-block-start: 1px solid var(--border-color-quiet); background: var(--surface-card);">
          <small class="text-muted font-size-2xs">System Status: All services operational</small>
        </footer>
      </div>
    </div>
  `,
};
