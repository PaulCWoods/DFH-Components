import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Molecules/Breadcrumb',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# Breadcrumb Primitive

Accessible navigational breadcrumb trails with modern speech-alternative slash separators (\`content: "/" / ""\`), ordered list hierarchy (\`<ol>\`), and \`aria-current="page"\` terminal status adhering strictly to WCAG 2.2 Level AA / AAA standards.

---

### Canonical Semantic Markup Signature
\`\`\`html
<nav class="breadcrumb" aria-label="Breadcrumb">
  <ol>
    <li><a class="link" href="/topics">Topics</a></li>
    <li><a class="link" href="/topics/typography">Typography</a></li>
    <li aria-current="page">Modular Scale</li>
  </ol>
</nav>
\`\`\`

---

### WCAG 2.2 Conformance Matrix
| Criterion | Level | Status | Architectural Implementation |
| :--- | :--- | :--- | :--- |
| **1.3.1 Info and Relationships** | A | **Pass** | Semantic \`<nav aria-label="Breadcrumb">\` landmarks the trail; \`<ol>\` communicates linear step ordering to assistive technology. |
| **4.1.2 Name, Role, Value** | A | **Pass** | Terminal leaf node declares \`aria-current="page"\` so screen readers announce current page context unambiguously. |
| **1.4.3 Contrast (Minimum)** | AA (4.5:1) | **Pass** | Active links meet >= 4.5:1 against canvas; current leaf item uses \`var(--_breadcrumb-current-color)\` with bold weight. |
| **2.4.7 Focus Visible** | AA | **Pass** | Inherits high-contrast 2px focus ring with offset on all interactive \`<a>\` links. |
| **Screen Reader Speech Quality** | Best Practice | **Pass** | CSS separator uses modern dual-syntax \`content: "/" / ""\` to suppress repetitive "slash" reading in VoiceOver and NVDA. |

---

### CSS Custom Property Token Contract
| CSS Variable | Default Value | Fallback Ladder | Description |
| :--- | :--- | :--- | :--- |
| \`--_breadcrumb-color\` | \`var(--breadcrumb-color)\` | \`var(--foreground-muted)\` | Inactive item and separator text color |
| \`--_breadcrumb-current-color\` | \`var(--breadcrumb-current-color)\` | \`var(--foreground-strong)\` | Active current page label text color |
| \`--_breadcrumb-current-font-weight\` | \`var(--breadcrumb-current-font-weight)\` | \`var(--font-weight-bold, 700)\` | Typography weight of \`[aria-current="page"]\` item |
| \`--_breadcrumb-font-size\` | \`var(--breadcrumb-font-size)\` | \`var(--typography-font-size--1, 0.875rem)\` | Font size of the breadcrumb trail |
| \`--_breadcrumb-gap\` | \`var(--breadcrumb-gap)\` | \`var(--spacing-8, 0.5rem)\` | Horizontal column gap between crumb items and slashes |
| \`--_breadcrumb-row-gap\` | \`var(--breadcrumb-row-gap)\` | \`var(--spacing-4, 0.25rem)\` | Vertical row gap when items wrap across multiple lines |
| \`--_breadcrumb-separator-color\` | \`var(--breadcrumb-separator-color)\` | \`var(--foreground-muted)\` | Slash decorative separator color |
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * 1. Playground
 * Interactive sandbox exploring trail depth, active page text, and sizing.
 */
export const Playground: Story = {
  args: {
    depth: 4,
    currentPage: 'Responsive Grid Layouts',
    fontSize: 'var(--typography-font-size--1)',
  },
  argTypes: {
    depth: {
      name: 'Trail Depth',
      control: { type: 'select' },
      options: [2, 3, 4, 5],
      description: 'Number of hierarchical trail levels.',
    },
    currentPage: {
      name: 'Current Page Name',
      control: { type: 'text' },
    },
    fontSize: {
      name: 'Font Size Token',
      control: { type: 'select' },
      options: [
        'var(--typography-font-size--2)',
        'var(--typography-font-size--1)',
        'var(--typography-font-size-0)',
      ],
      description: 'Token size applied via --breadcrumb-font-size.',
    },
  },
  render: (args) => {
    const trails = [
      '<li><a class="link" href="/">Home</a></li>',
      '<li><a class="link" href="/docs">Documentation</a></li>',
      '<li><a class="link" href="/docs/components">Components</a></li>',
      '<li><a class="link" href="/docs/components/layout">Layout Primitives</a></li>',
    ];

    const activeList = trails.slice(0, args.depth - 1).join('\n        ');

    return `
      <div style="max-inline-size: 42rem; margin-inline: auto;">
        <nav class="breadcrumb" aria-label="Breadcrumb" style="--breadcrumb-font-size: ${args.fontSize};">
          <ol>
            ${activeList}
            <li aria-current="page">${args.currentPage}</li>
          </ol>
        </nav>
      </div>
    `;
  },
};

/**
 * 2. Anatomy
 * Exploded breakdown highlighting the semantic hierarchy, list structure, and speech-alternative separator.
 */
export const Anatomy: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: var(--spacing-24); max-inline-size: 46rem;">
      <div class="demo-card-callout" style="padding: var(--spacing-16); border: 1px dashed var(--border-color); border-radius: var(--radius-md); background: var(--surface-muted);">
        <p style="margin: 0; font-size: var(--typography-font-size--1); color: var(--foreground-muted);">
          <strong>Structural Breakdown:</strong> Wrapped in <code>&lt;nav class="breadcrumb" aria-label="Breadcrumb"&gt;</code> containing an ordered list (<code>&lt;ol&gt;</code>). Slashes are generated via <code>li:not(:last-child)::after { content: "/" / ""; }</code> with speech-alternative empty string so screen readers skip them.
        </p>
      </div>

      <div style="padding: var(--spacing-24); border: 2px dashed var(--color-accent); border-radius: var(--radius-md);">
        <nav class="breadcrumb" aria-label="Anatomy breakdown">
          <ol>
            <li style="outline: 1px dashed var(--color-success); padding: var(--spacing-2); border-radius: var(--radius-xs);">
              <a class="link" href="#home">li &gt; a.link</a>
            </li>
            <li style="outline: 1px dashed var(--color-success); padding: var(--spacing-2); border-radius: var(--radius-xs);">
              <a class="link" href="#category">Category</a>
            </li>
            <li aria-current="page" style="outline: 1px dashed var(--color-accent); padding: var(--spacing-2); border-radius: var(--radius-xs);">
              li[aria-current="page"]
            </li>
          </ol>
        </nav>
      </div>
    </div>
  `,
};

/**
 * 3. Variants
 * Visual gallery showcasing default trails, deep 5-level nesting, and custom gap spacing.
 */
export const Variants: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: var(--spacing-32); max-inline-size: 46rem;">
      
      <!-- Variant 1: Standard 3-Level Trail -->
      <div>
        <span style="font-size: var(--typography-font-size--1); color: var(--foreground-muted); display: block; margin-block-end: var(--spacing-8);">
          1. Standard 3-Level Hierarchy
        </span>
        <nav class="breadcrumb" aria-label="Standard trail">
          <ol>
            <li><a class="link" href="#products">Products</a></li>
            <li><a class="link" href="#electronics">Electronics</a></li>
            <li aria-current="page">Audio Equipment</li>
          </ol>
        </nav>
      </div>

      <!-- Variant 2: Deep 5-Level Nesting -->
      <div>
        <span style="font-size: var(--typography-font-size--1); color: var(--foreground-muted); display: block; margin-block-end: var(--spacing-8);">
          2. Deep 5-Level Technical Trail
        </span>
        <nav class="breadcrumb" aria-label="Deep trail">
          <ol>
            <li><a class="link" href="#root">System</a></li>
            <li><a class="link" href="#packages">packages</a></li>
            <li><a class="link" href="#css">css</a></li>
            <li><a class="link" href="#components">src/components</a></li>
            <li aria-current="page">breadcrumb.css</li>
          </ol>
        </nav>
      </div>

      <!-- Variant 3: Compact Spacing -->
      <div>
        <span style="font-size: var(--typography-font-size--1); color: var(--foreground-muted); display: block; margin-block-end: var(--spacing-8);">
          3. Compact Tight Gap (--breadcrumb-gap: 0.25rem)
        </span>
        <nav class="breadcrumb" aria-label="Compact trail" style="--breadcrumb-gap: var(--spacing-4);">
          <ol>
            <li><a class="link" href="#settings">Settings</a></li>
            <li><a class="link" href="#team">Team</a></li>
            <li aria-current="page">Permissions</li>
          </ol>
        </nav>
      </div>

    </div>
  `,
};

/**
 * 4. StateMatrix
 * Covers active link states, keyboard focus-visible, and terminal aria-current="page" bold state.
 */
export const StateMatrix: Story = {
  render: () => `
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(18rem, 100%), 1fr)); gap: var(--spacing-24); max-inline-size: 52rem;">
      
      <!-- Resting Links -->
      <div class="pd bd rd">
        <span style="font-size: var(--typography-font-size--1); color: var(--foreground-muted); display: block; margin-block-end: var(--spacing-8);">
          Resting Links State
        </span>
        <nav class="breadcrumb" aria-label="Resting">
          <ol>
            <li><a class="link" href="#">Design</a></li>
            <li aria-current="page">Typography</li>
          </ol>
        </nav>
      </div>

      <!-- Focused Link -->
      <div class="pd bd rd">
        <span style="font-size: var(--typography-font-size--1); color: var(--foreground-muted); display: block; margin-block-end: var(--spacing-8);">
          Keyboard Focus-Visible
        </span>
        <nav class="breadcrumb" aria-label="Focused">
          <ol>
            <li><a class="link" href="#" style="outline: var(--focus-ring-width) solid var(--focus-ring-color); outline-offset: var(--focus-ring-offset);">Design</a></li>
            <li aria-current="page">Typography</li>
          </ol>
        </nav>
      </div>

      <!-- Current Page Terminal State -->
      <div class="pd bd rd">
        <span style="font-size: var(--typography-font-size--1); color: var(--foreground-muted); display: block; margin-block-end: var(--spacing-8);">
          aria-current="page" Bold
        </span>
        <nav class="breadcrumb" aria-label="Terminal">
          <ol>
            <li><a class="link" href="#">Overview</a></li>
            <li aria-current="page">Active Terminal</li>
          </ol>
        </nav>
      </div>

      <!-- High Contrast Mode Simulation -->
      <div class="pd bd rd">
        <span style="font-size: var(--typography-font-size--1); color: var(--foreground-muted); display: block; margin-block-end: var(--spacing-8);">
          High-Contrast Mode (3:1 Contrast)
        </span>
        <nav class="breadcrumb" aria-label="High contrast" style="--_breadcrumb-color: currentColor; --_breadcrumb-current-color: currentColor;">
          <ol>
            <li><a class="link" href="#" style="text-decoration: underline;">Guides</a></li>
            <li aria-current="page" style="font-weight: 800;">High Contrast Page</li>
          </ol>
        </nav>
      </div>

    </div>
  `,
};

/**
 * 5. SizesAndDensity
 * Demonstrates compact, standard, and prominent hero size tiers.
 */
export const SizesAndDensity: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: var(--spacing-24); max-inline-size: 44rem;">
      
      <!-- Compact Size -->
      <div>
        <span style="font-size: var(--typography-font-size--1); color: var(--foreground-muted); display: block; margin-block-end: var(--spacing-8);">
          Compact Size (--breadcrumb-font-size: 0.75rem / step -2)
        </span>
        <nav class="breadcrumb" aria-label="Compact breadcrumbs" style="--breadcrumb-font-size: var(--typography-font-size--2);">
          <ol>
            <li><a class="link" href="#account">Account</a></li>
            <li><a class="link" href="#security">Security</a></li>
            <li aria-current="page">Two-Factor Authentication</li>
          </ol>
        </nav>
      </div>

      <!-- Standard Size -->
      <div>
        <span style="font-size: var(--typography-font-size--1); color: var(--foreground-muted); display: block; margin-block-end: var(--spacing-8);">
          Standard Size (--breadcrumb-font-size: 0.875rem / step -1 — Default)
        </span>
        <nav class="breadcrumb" aria-label="Standard breadcrumbs">
          <ol>
            <li><a class="link" href="#account">Account</a></li>
            <li><a class="link" href="#security">Security</a></li>
            <li aria-current="page">Two-Factor Authentication</li>
          </ol>
        </nav>
      </div>

      <!-- Large Size -->
      <div>
        <span style="font-size: var(--typography-font-size--1); color: var(--foreground-muted); display: block; margin-block-end: var(--spacing-8);">
          Hero Size (--breadcrumb-font-size: 1rem / step 0)
        </span>
        <nav class="breadcrumb" aria-label="Hero breadcrumbs" style="--breadcrumb-font-size: var(--typography-font-size-0);">
          <ol>
            <li><a class="link" href="#account">Account</a></li>
            <li><a class="link" href="#security">Security</a></li>
            <li aria-current="page">Two-Factor Authentication</li>
          </ol>
        </nav>
      </div>

    </div>
  `,
};

/**
 * 6. ZeroClassOrchestration
 * Demonstrates flex-wrap multi-line wrapping behavior when contained in narrow viewports or sidebars.
 */
export const ZeroClassOrchestration: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: var(--spacing-24); max-inline-size: 44rem;">
      <div class="demo-card-callout" style="padding: var(--spacing-16); border: 1px dashed var(--border-color); border-radius: var(--radius-md); background: var(--surface-muted);">
        <p style="margin: 0; font-size: var(--typography-font-size--1); color: var(--foreground-muted);">
          <strong>Responsive Multi-Line Wrapping:</strong> In narrow sidebars or on mobile screens, <code>flex-wrap: wrap</code> combined with <code>column-gap</code> and <code>row-gap</code> guarantees clean wrapping without text collisions or clipping.
        </p>
      </div>

      <div style="max-inline-size: 18rem; padding: var(--spacing-16); border: 1px dashed var(--border-color); border-radius: var(--radius-md);">
        <span style="font-size: var(--typography-font-size--2); color: var(--foreground-muted); display: block; margin-block-end: var(--spacing-8);">
          Constrained Sidebar (18rem Width)
        </span>
        <nav class="breadcrumb" aria-label="Wrapped trail">
          <ol>
            <li><a class="link" href="#knowledge">Knowledge Base</a></li>
            <li><a class="link" href="#frontend">Frontend Engineering</a></li>
            <li><a class="link" href="#accessibility">Accessibility Standards</a></li>
            <li aria-current="page">WCAG 2.2 Conformance Guide</li>
          </ol>
        </nav>
      </div>
    </div>
  `,
};

/**
 * 7. RealWorldRecipes
 * Production patterns: Documentation Article Header and E-Commerce Catalog Navigation.
 */
export const RealWorldRecipes: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: var(--spacing-32); max-inline-size: 52rem;">
      
      <!-- Recipe 1: Documentation Page Header -->
      <section style="display: flex; flex-direction: column; gap: var(--spacing-12); padding-block-end: var(--spacing-24); border-block-end: 1px solid var(--border-color);">
        <nav class="breadcrumb" aria-label="Documentation hierarchy">
          <ol>
            <li><a class="link" href="#docs">Docs</a></li>
            <li><a class="link" href="#primitives">Components</a></li>
            <li aria-current="page">Card Primitive</li>
          </ol>
        </nav>

        <div>
          <h1 style="margin: 0 0 var(--spacing-8); font-size: var(--typography-font-size-3);">
            Card Container Primitive
          </h1>
          <p style="margin: 0; color: var(--foreground-muted); font-size: var(--typography-font-size-0);">
            Foundation container with container query cqi typography and sticky scroll support.
          </p>
        </div>
      </section>

      <!-- Recipe 2: E-Commerce Product Header -->
      <section style="display: flex; flex-direction: column; gap: var(--spacing-12);">
        <nav class="breadcrumb" aria-label="Catalog trail">
          <ol>
            <li><a class="link" href="#store">Store</a></li>
            <li><a class="link" href="#footwear">Footwear</a></li>
            <li><a class="link" href="#trail">Trail Running</a></li>
            <li aria-current="page">Endurance Pro GTX</li>
          </ol>
        </nav>

        <div style="display: flex; justify-content: space-between; align-items: baseline;">
          <h2 style="margin: 0; font-size: var(--typography-font-size-2);">
            Endurance Pro GTX
          </h2>
          <span style="font-size: var(--typography-font-size-1); font-weight: bold;">
            $180.00
          </span>
        </div>
      </section>

    </div>
  `,
};
