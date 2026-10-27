import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Organisms/Header',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Header Landmark Primitive

Semantic top-level header and navigation landmark with sticky positioning (\`position: sticky\`), glassmorphic backdrop filtering (\`backdrop-filter\`), safe area insets (\`env(safe-area-inset-*)\`), and token-driven bottom borders adhering to WCAG 2.2 Level AA / AAA.

---

### Canonical Semantic Markup Signature
\`\`\`html
<header class="header header--sticky header--translucent" style="padding-block: var(--spacing-8);">
  <div class="wrapper" style="display: flex; justify-content: space-between; align-items: center;">
    <div style="display: flex; gap: var(--spacing-12); align-items: center;">
      <span class="badge badge--round badge--accent"><span>DFH</span></span>
      <strong style="font-size: var(--typography-font-size-1);">Design For Humans</strong>
    </div>

    <nav class="tabs" aria-label="Main Navigation">
      <ul class="tab-list">
        <li><a href="/docs" class="tab" aria-current="page"><span class="tab__text">Docs</span></a></li>
        <li><a href="/components" class="tab"><span class="tab__text">Components</span></a></li>
        <li><a href="/tokens" class="tab"><span class="tab__text">Tokens</span></a></li>
      </ul>
    </nav>

    <div style="display: flex; gap: var(--spacing-8); align-items: center;">
      <button type="button" class="button button--subtle button--icon" aria-label="Search">
        <svg class="icon" width="20" height="20" aria-hidden="true" focusable="false"><use href="#Search"/></svg>
      </button>
      <button type="button" class="button button--strong button--accent button--sm">
        <span>Get Started</span>
      </button>
    </div>
  </div>
</header>
\`\`\`

---

### WCAG 2.2 Conformance Matrix
| Criterion | Level | Status | Architectural Implementation |
| :--- | :--- | :--- | :--- |
| **1.3.1 Info and Relationships** | A | **Pass** | Semantic \`<header class="header">\` establishes top-level banner landmark for assistive technologies. |
| **2.4.1 Bypass Blocks** | A | **Pass** | Works seamlessly with \`.skip-link\` rendered immediately before the header element in the DOM. |
| **2.4.7 Focus Visible** | AA | **Pass** | Interactive buttons and links inside header receive high-contrast 2px focus indicators. |
| **1.4.3 Contrast (Minimum)** | AA (4.5:1) | **Pass** | Foreground text and subtle borders maintain compliant contrast against solid and translucent backgrounds. |
| **High Contrast Mode** | Best Practice | **Pass** | \`@media (prefers-contrast: more)\` automatically disables translucency and reinforces the bottom border to 2px. |
| **Safe Area Insets** | Best Practice | **Pass** | Automatically applies \`env(safe-area-inset-*)\` so hardware notches never obscure branding or actions. |

---

### CSS Custom Property Token Contract
| CSS Variable | Default Value | Fallback Ladder | Description |
| :--- | :--- | :--- | :--- |
| \`--_header-bg\` | \`var(--header-bg)\` | \`var(--surface-card, Canvas)\` | Solid background surface color |
| \`--_header-border-color\` | \`var(--header-border-color)\` | \`var(--app-border-color, var(--border-color-quiet))\` | Bottom separator border line color |
| \`--_header-border-width\` | \`var(--header-border-width)\` | \`var(--app-border-width, var(--border-width, 1px))\` | Bottom border stroke thickness |
| \`--_header-padding-inline\` | \`var(--header-padding-inline)\` | \`var(--spacing-cushion, 1rem)\` | Horizontal side gutter spacing |
| \`--_header-padding-block\` | \`var(--header-padding-block)\` | \`0px\` | Vertical block spacing padding |
| \`--_header-z-index\` | \`var(--header-z-index)\` | \`var(--z-index-sticky, 100)\` | Sticky stacking context z-index |
| \`--_header-backdrop-filter\` | \`var(--header-backdrop-filter)\` | \`blur(8px)\` | Translucent glassmorphism blur formula |
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * 1. Playground
 * Interactive sandbox exploring sticky behavior, translucency, and branding.
 */
export const Playground: Story = {
  args: {
    isSticky: true,
    isTranslucent: true,
    isBorderless: false,
    colorScheme: 'default',
    siteTitle: 'Design For Humans',
  },
  argTypes: {
    isSticky: {
      name: 'Sticky Header',
      control: { type: 'boolean' },
      description: 'Pins header to top of viewport.',
    },
    isTranslucent: {
      name: 'Translucent Glassmorphism',
      control: { type: 'boolean' },
      description: 'Enables backdrop-filter blur over scrolling content.',
    },
    isBorderless: {
      name: 'Borderless',
      control: { type: 'boolean' },
      description: 'Removes bottom border.',
    },
    colorScheme: {
      name: 'Color Scheme',
      control: { type: 'inline-radio' },
      options: ['default', 'inverted'],
      description: 'Standard card surface vs inverted dark theme.',
    },
    siteTitle: {
      name: 'Site Title',
      control: { type: 'text' },
    },
  },
  render: (args) => {
    const classes = [
      'header',
      args.isSticky ? 'header--sticky' : '',
      args.isTranslucent ? 'header--translucent' : '',
      args.isBorderless ? 'header--borderless' : '',
      args.colorScheme === 'inverted' ? 'color-palette-inverted' : '',
    ].filter(Boolean).join(' ');

    return `
      <div style="min-block-size: 140vh; background: var(--surface-muted);">
        <header class="${classes}" style="padding-block: var(--spacing-12);">
          <div class="wrapper" style="display: flex; justify-content: space-between; align-items: center; max-inline-size: 72rem; margin-inline: auto; padding-inline: var(--spacing-16);">
            <div style="display: flex; gap: var(--spacing-12); align-items: center;">
              <span class="badge badge--round badge--accent"><span>DFH</span></span>
              <strong style="font-size: var(--typography-font-size-1);">${args.siteTitle}</strong>
            </div>

            <nav aria-label="Main Navigation" style="display: flex; gap: var(--spacing-8);">
              <a href="#" class="button button--subtle button--sm" aria-current="page"><span>Overview</span></a>
              <a href="#" class="button button--subtle button--sm"><span>Components</span></a>
              <a href="#" class="button button--subtle button--sm"><span>Tokens</span></a>
            </nav>

            <div style="display: flex; gap: var(--spacing-8); align-items: center;">
              <button type="button" class="button button--strong button--accent button--sm">
                <span>Deploy</span>
              </button>
            </div>
          </div>
        </header>

        <div style="max-inline-size: 54rem; margin-inline: auto; padding: var(--spacing-32) var(--spacing-16);">
          <div class="card card--bordered">
            <article class="card__content">
              <header class="card__header">
                <h2 class="card__title heading">Viewport Scroll Simulation</h2>
              </header>
              <div class="card__body">
                <p>Scroll down this canvas to observe the sticky header's positioning and translucent glassmorphism blur over this card's content.</p>
              </div>
            </article>
          </div>
        </div>
      </div>
    `;
  },
};

/**
 * 2. Anatomy
 * Exploded breakdown highlighting safe area insets, sticky bounds, and inner wrapper alignment.
 */
export const Anatomy: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: var(--spacing-24); max-inline-size: 48rem; padding: var(--spacing-16);">
      <div class="demo-card-callout" style="padding: var(--spacing-16); border: 1px dashed var(--border-color); border-radius: var(--radius-md); background: var(--surface-muted);">
        <p style="margin: 0; font-size: var(--typography-font-size--1); color: var(--foreground-muted);">
          <strong>Structural Breakdown:</strong> <code>&lt;header class="header"&gt;</code> establishes <code>container-type: inline-size</code> and applies safe area insets via <code>padding-inline</code>. Children are organized within a centered <code>.wrapper</code> or flex container.
        </p>
      </div>

      <div style="border: 2px dashed var(--color-accent); border-radius: var(--radius-md); overflow: hidden;">
        <header class="header" style="border-block-end: 2px dashed var(--color-accent); padding-block: var(--spacing-12);">
          <div style="display: flex; justify-content: space-between; align-items: center; padding-inline: var(--spacing-16);">
            <div style="outline: 1px dashed var(--color-success); padding: var(--spacing-4); border-radius: var(--radius-xs);">
              <span>Brand slot</span>
            </div>
            <div style="outline: 1px dashed var(--color-accent); padding: var(--spacing-4); border-radius: var(--radius-xs);">
              <span>&lt;nav&gt; Primary Navigation</span>
            </div>
            <div style="outline: 1px dashed var(--color-success); padding: var(--spacing-4); border-radius: var(--radius-xs);">
              <span>Actions slot</span>
            </div>
          </div>
        </header>

        <div style="padding: var(--spacing-16); background: var(--surface-card);">
          <span class="badge badge--sm"><span>Page Body Flow</span></span>
          <p style="margin: var(--spacing-8) 0 0; color: var(--foreground-muted); font-size: var(--typography-font-size--1);">
            Header automatically stacks above body landmarks with sticky z-index.
          </p>
        </div>
      </div>
    </div>
  `,
};

/**
 * 3. Variants
 * Visual gallery showcasing default, sticky translucent, borderless, and inverted themes.
 */
export const Variants: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: var(--spacing-32); max-inline-size: 52rem; padding: var(--spacing-16);">
      
      <!-- Variant 1: Standard In-Flow Header -->
      <div>
        <span style="font-size: var(--typography-font-size--1); color: var(--foreground-muted); display: block; margin-block-end: var(--spacing-8);">
          1. Standard In-Flow Header (.header)
        </span>
        <div style="border: 1px solid var(--border-color); border-radius: var(--radius-md); overflow: hidden;">
          <header class="header" style="padding-block: var(--spacing-12);">
            <div style="display: flex; justify-content: space-between; align-items: center; padding-inline: var(--spacing-16);">
              <strong>Standard In-Flow</strong>
              <div style="display: flex; gap: var(--spacing-8);">
                <button type="button" class="button button--subtle button--sm">Features</button>
                <button type="button" class="button button--strong button--accent button--sm">Sign In</button>
              </div>
            </div>
          </header>
        </div>
      </div>

      <!-- Variant 2: Borderless Header -->
      <div>
        <span style="font-size: var(--typography-font-size--1); color: var(--foreground-muted); display: block; margin-block-end: var(--spacing-8);">
          2. Borderless Header (.header.header--borderless)
        </span>
        <div style="border: 1px solid var(--border-color); border-radius: var(--radius-md); overflow: hidden; background: var(--surface-muted);">
          <header class="header header--borderless" style="padding-block: var(--spacing-12); background: transparent;">
            <div style="display: flex; justify-content: space-between; align-items: center; padding-inline: var(--spacing-16);">
              <strong>Seamless Borderless</strong>
              <button type="button" class="button button--subtle button--sm">Explore</button>
            </div>
          </header>
        </div>
      </div>

      <!-- Variant 3: Inverted Palette Theme -->
      <div>
        <span style="font-size: var(--typography-font-size--1); color: var(--foreground-muted); display: block; margin-block-end: var(--spacing-8);">
          3. Inverted Palette Dark Header (.header.color-palette-inverted)
        </span>
        <div style="border: 1px solid var(--border-color); border-radius: var(--radius-md); overflow: hidden;">
          <header class="header color-palette-inverted" style="padding-block: var(--spacing-12);">
            <div style="display: flex; justify-content: space-between; align-items: center; padding-inline: var(--spacing-16);">
              <span style="font-weight: bold;">Dark Surface</span>
              <div style="display: flex; gap: var(--spacing-8);">
                <button type="button" class="button button--subtle button--sm" style="color: inherit;">Docs</button>
                <button type="button" class="button button--strong button--accent button--sm">Dashboard</button>
              </div>
            </div>
          </header>
        </div>
      </div>

    </div>
  `,
};

/**
 * 4. StateMatrix
 * Covers resting in-flow, sticky pinned, interactive child focus rings, and high-contrast modes.
 */
export const StateMatrix: Story = {
  render: () => `
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(20rem, 100%), 1fr)); gap: var(--spacing-24); max-inline-size: 52rem; padding: var(--spacing-16);">
      
      <!-- Resting State -->
      <div style="border: 1px solid var(--border-color); border-radius: var(--radius-md); overflow: hidden;">
        <span style="font-size: var(--typography-font-size--1); color: var(--foreground-muted); display: block; padding: var(--spacing-12); background: var(--surface-muted); border-block-end: 1px solid var(--border-color);">
          Resting Solid Surface
        </span>
        <header class="header" style="padding-block: var(--spacing-12);">
          <div style="display: flex; justify-content: space-between; align-items: center; padding-inline: var(--spacing-16);">
            <span>Resting</span>
            <span class="status" data-status="online">Online</span>
          </div>
        </header>
      </div>

      <!-- Focus Ring State on Interactive Child -->
      <div style="border: 1px solid var(--border-color); border-radius: var(--radius-md); overflow: hidden;">
        <span style="font-size: var(--typography-font-size--1); color: var(--foreground-muted); display: block; padding: var(--spacing-12); background: var(--surface-muted); border-block-end: 1px solid var(--border-color);">
          Focus-Visible on Action
        </span>
        <header class="header" style="padding-block: var(--spacing-12);">
          <div style="display: flex; justify-content: space-between; align-items: center; padding-inline: var(--spacing-16);">
            <span>Focus State</span>
            <button type="button" class="button button--strong button--accent button--sm" style="outline: var(--focus-ring-width) solid var(--focus-ring-color); outline-offset: var(--focus-ring-offset);">
              <span>Focused Action</span>
            </button>
          </div>
        </header>
      </div>

      <!-- High Contrast Mode Simulation -->
      <div style="border: 1px solid var(--border-color); border-radius: var(--radius-md); overflow: hidden;">
        <span style="font-size: var(--typography-font-size--1); color: var(--foreground-muted); display: block; padding: var(--spacing-12); background: var(--surface-muted); border-block-end: 1px solid var(--border-color);">
          High-Contrast Mode (2px Border, 0% Translucency)
        </span>
        <header class="header" style="padding-block: var(--spacing-12); border-block-end: 2px solid currentColor;">
          <div style="display: flex; justify-content: space-between; align-items: center; padding-inline: var(--spacing-16);">
            <strong style="font-weight: 800;">High Contrast Header</strong>
            <span class="badge badge--contrast"><span>3:1</span></span>
          </div>
        </header>
      </div>

    </div>
  `,
};

/**
 * 5. SizesAndDensity
 * Compares standard cushion gutters with flush edge-to-edge layouts.
 */
export const SizesAndDensity: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: var(--spacing-24); max-inline-size: 48rem; padding: var(--spacing-16);">
      
      <!-- Standard Padding -->
      <div>
        <span style="font-size: var(--typography-font-size--1); color: var(--foreground-muted); display: block; margin-block-end: var(--spacing-8);">
          Standard Cushion Padding (--header-padding-inline: 1rem)
        </span>
        <div style="border: 1px solid var(--border-color); border-radius: var(--radius-md); overflow: hidden;">
          <header class="header" style="padding-block: var(--spacing-12);">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span>Standard Cushion</span>
              <button type="button" class="button button--subtle button--sm">Action</button>
            </div>
          </header>
        </div>
      </div>

      <!-- Flush No Inline Padding -->
      <div>
        <span style="font-size: var(--typography-font-size--1); color: var(--foreground-muted); display: block; margin-block-end: var(--spacing-8);">
          Flush Edge-to-Edge Layout (.header--flush)
        </span>
        <div style="border: 1px solid var(--border-color); border-radius: var(--radius-md); overflow: hidden;">
          <header class="header header--flush" style="padding-block: var(--spacing-12);">
            <div style="display: flex; justify-content: space-between; align-items: center; padding-inline: var(--spacing-24);">
              <span>Custom Wrapper Managed Margins</span>
              <button type="button" class="button button--subtle button--sm">Action</button>
            </div>
          </header>
        </div>
      </div>

    </div>
  `,
};

/**
 * 6. ZeroClassOrchestration
 * Demonstrates responsive safe-area inset padding support.
 */
export const ZeroClassOrchestration: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: var(--spacing-24); max-inline-size: 48rem; padding: var(--spacing-16);">
      <div class="demo-card-callout" style="padding: var(--spacing-16); border: 1px dashed var(--border-color); border-radius: var(--radius-md); background: var(--surface-muted);">
        <p style="margin: 0; font-size: var(--typography-font-size--1); color: var(--foreground-muted);">
          <strong>Container-Type Inline Size & Safe Area Insets:</strong> <code>.header</code> declares <code>container-type: inline-size</code> and automatically incorporates <code>padding-inline-start: calc(var(--_header-padding-inline) + var(--safe-area-inset-left))</code> for notch-safe device margins.
        </p>
      </div>

      <div style="border: 1px solid var(--border-color); border-radius: var(--radius-md); overflow: hidden;">
        <header class="header" style="padding-block: var(--spacing-12); --safe-area-inset-left: 2rem; --safe-area-inset-right: 2rem;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span>Notch Inset Aware (2rem virtual sensor island simulation)</span>
            <button type="button" class="button button--strong button--accent button--sm">Profile</button>
          </div>
        </header>
      </div>
    </div>
  `,
};

/**
 * 7. RealWorldRecipes
 * Production patterns: Full Application Header and Multi-Tier App Bar Container.
 */
export const RealWorldRecipes: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: var(--spacing-32); max-inline-size: 54rem; padding: var(--spacing-16);">
      
      <!-- Recipe 1: Production SaaS Header with Search & Avatar -->
      <section style="display: flex; flex-direction: column; gap: var(--spacing-12);">
        <h4 style="font-size: var(--typography-font-size-1); margin: 0;">
          Recipe 1: Full-Featured Application Header
        </h4>
        <div style="border: 1px solid var(--border-color); border-radius: var(--radius-md); overflow: hidden;">
          <header class="header header--sticky header--translucent" style="padding-block: var(--spacing-12);">
            <div style="display: flex; justify-content: space-between; align-items: center; padding-inline: var(--spacing-16);">
              <div style="display: flex; gap: var(--spacing-16); align-items: center;">
                <span class="badge badge--round badge--accent"><span>DFH</span></span>
                <strong style="font-size: var(--typography-font-size-1);">Cloud Console</strong>
              </div>

              <div style="display: flex; gap: var(--spacing-8); align-items: center;">
                <button type="button" class="button button--subtle button--icon" aria-label="Search items">
                  <svg class="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </button>
                <button type="button" class="button button--avatar button--round" data-status="online" aria-label="User profile">
                  <span style="font-weight: bold; font-size: 0.75rem;">PW</span>
                </button>
              </div>
            </div>
          </header>
          <div style="padding: var(--spacing-24); background: var(--surface-card);">
            <p style="margin: 0; color: var(--foreground-muted);">Application dashboard workspace content.</p>
          </div>
        </div>
      </section>

      <!-- Recipe 2: Multi-Tier Sub-Header Container -->
      <section style="display: flex; flex-direction: column; gap: var(--spacing-12);">
        <h4 style="font-size: var(--typography-font-size-1); margin: 0;">
          Recipe 2: Multi-Tier Header Container (.header-container)
        </h4>
        <div style="border: 1px solid var(--border-color); border-radius: var(--radius-md); overflow: hidden;">
          <div class="header-container">
            <!-- Top App Bar -->
            <header class="header" style="padding-block: var(--spacing-12);">
              <div style="display: flex; justify-content: space-between; align-items: center; padding-inline: var(--spacing-16);">
                <strong>Enterprise Hub</strong>
                <span class="chip chip--status" data-status="online">System Operational</span>
              </div>
            </header>
            
            <!-- Secondary Navigation Tier -->
            <header class="header header--borderless" style="padding-block: var(--spacing-8); background: var(--surface-muted); border-block-end: 1px solid var(--border-color);">
              <div style="padding-inline: var(--spacing-16);">
                <nav class="breadcrumb" aria-label="Subheader breadcrumb">
                  <ol>
                    <li><a class="link" href="#clusters">Clusters</a></li>
                    <li><a class="link" href="#eu-west">eu-west-1</a></li>
                    <li aria-current="page">Production-DB</li>
                  </ol>
                </nav>
              </div>
            </header>
          </div>
          <div style="padding: var(--spacing-24); background: var(--surface-card);">
            <p style="margin: 0; color: var(--foreground-muted);">Cluster inspection console.</p>
          </div>
        </div>
      </section>

    </div>
  `,
};
