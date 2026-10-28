import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Molecules/Navigation Tree',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# Navigation Tree Primitive (.navigation-tree / .nav-tree)

Hierarchical list and outline navigation primitive designed specifically for **Tables of Contents (TOC)**, **documentation sidebars**, **sitemaps**, and **nested directory trees**.

Unlike flat \`.tab-list\` switchers, \`.navigation-tree\` natively embraces multi-level nested \`<ol>\` and \`<ul>\` lists with tokenized indentation, continuous hierarchical guide rules (\`.navigation-tree--ruled\`), token-driven active location indicators (\`[aria-current="true"]\`), and container density adaptations.

---

### Canonical Semantic Markup Signatures

#### 1. Table of Contents with Indicator Rail
\`\`\`html
<nav class="navigation-tree navigation-tree--indicator navigation-tree--ruled" aria-label="Table of contents">
  <ol class="navigation-tree__list">
    <li class="navigation-tree__item">
      <a href="#overview" class="navigation-tree__link" aria-current="true">
        <span class="navigation-tree__text">Overview</span>
      </a>
    </li>
    <li class="navigation-tree__item">
      <a href="#playground" class="navigation-tree__link">
        <span class="navigation-tree__text">Interactive Playground</span>
      </a>
      <!-- Nested Level 2 -->
      <ol class="navigation-tree__list">
        <li class="navigation-tree__item">
          <a href="#playground-controls" class="navigation-tree__link">
            <span class="navigation-tree__text">Controls & Options</span>
          </a>
        </li>
      </ol>
    </li>
    <li class="navigation-tree__item">
      <a href="#accessibility" class="navigation-tree__link">
        <span class="navigation-tree__text">Accessibility & WCAG 2.2</span>
        <span class="status status--success status--sm"><span class="status__text">AAA</span></span>
      </a>
    </li>
  </ol>
</nav>
\`\`\`

---

### WCAG 2.2 Conformance Matrix
| Criterion | Level | Status | Architectural Implementation |
| :--- | :--- | :--- | :--- |
| **1.3.1 Info & Relationships** | A | **Pass** | Semantic \`<nav aria-label="...">\` landmarks the navigation outline; nested \`<ol>\` or \`<ul>\` elements communicate structural depth hierarchy directly to assistive technology. |
| **4.1.2 Name, Role, Value** | A | **Pass** | Active location is declared natively via \`aria-current="true"\` (or \`aria-current="page"\`), announcing the user's reading position in the outline. |
| **1.4.3 Contrast (Minimum)** | AA (4.5:1) | **Pass** | Inactive links meet >= 4.5:1 text contrast; active states leverage high-contrast foreground accents (\`--foreground-accent\`) and background tints. |
| **2.4.7 Focus Visible** | AA | **Pass** | Inherits high-contrast 2px focus perimeter with 2px offset on all interactive \`<a>\` links. |

---

### CSS Custom Property Token Contract
| CSS Variable | Default Value | Fallback Ladder | Description |
| :--- | :--- | :--- | :--- |
| \`--_nav-tree-gap\` | \`var(--nav-tree-gap)\` | \`var(--spacing-4, 0.25rem)\` | Vertical spacing between sibling items |
| \`--_nav-tree-indent\` | \`var(--nav-tree-indent)\` | \`var(--spacing-12, 0.75rem)\` | Progressive indentation step for nested sub-lists |
| \`--_nav-tree-line-color\` | \`var(--nav-tree-line-color)\` | \`var(--border-color-quiet)\` | Vertical guide rule border color in \`.navigation-tree--ruled\` |
| \`--_nav-tree-item-min-size\` | \`var(--nav-tree-item-min-size)\` | \`2rem\` | Accessible touch target minimum block size |
| \`--_nav-tree-active-color\` | \`var(--nav-tree-active-color)\` | \`var(--foreground-accent)\` | Text color on \`[aria-current="true"]\` active items |
| \`--_nav-tree-active-border-color\`| \`var(--nav-tree-active-border-color)\` | \`var(--foreground-accent)\` | Left stroke color on \`.navigation-tree--indicator\` active item |
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * Helper to mount interactive click handlers for demo stories
 */
const withInteractiveLinks = (html: string) => {
  const container = document.createElement('div');
  container.innerHTML = html;

  requestAnimationFrame(() => {
    const links = container.querySelectorAll<HTMLElement>('.navigation-tree__link');
    links.forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        links.forEach((l) => l.removeAttribute('aria-current'));
        link.setAttribute('aria-current', 'true');
      });
    });
  });

  return container;
};

/**
 * 1. Table of Contents Outline
 * Standard single & multi-level article outline with active location indicator.
 */
export const TableOfContentsOutline: Story = {
  render: () =>
    withInteractiveLinks(`
    <div class="card card--bordered padding-md" style="max-inline-size: 20rem; background: var(--surface);">
      <div class="micro-heading text-muted margin-bottom-xs">
        <span>On This Page</span>
      </div>
      <nav class="navigation-tree navigation-tree--indicator navigation-tree--compact" aria-label="Table of contents">
        <ol class="navigation-tree__list">
          <li class="navigation-tree__item">
            <a href="#overview" class="navigation-tree__link" aria-current="true">
              <span class="navigation-tree__text">Overview</span>
            </a>
          </li>
          <li class="navigation-tree__item">
            <a href="#playground" class="navigation-tree__link">
              <span class="navigation-tree__text">Interactive Playground</span>
            </a>
            <ol class="navigation-tree__list">
              <li class="navigation-tree__item">
                <a href="#playground-controls" class="navigation-tree__link">
                  <span class="navigation-tree__text">Controls & Density</span>
                </a>
              </li>
              <li class="navigation-tree__item">
                <a href="#playground-code" class="navigation-tree__link">
                  <span class="navigation-tree__text">Live Code Generation</span>
                </a>
              </li>
            </ol>
          </li>
          <li class="navigation-tree__item">
            <a href="#accessibility" class="navigation-tree__link">
              <span class="navigation-tree__text">Accessibility (WCAG 2.2)</span>
            </a>
          </li>
          <li class="navigation-tree__item">
            <a href="#custom-properties" class="navigation-tree__link">
              <span class="navigation-tree__text">Custom Properties</span>
            </a>
          </li>
        </ol>
      </nav>
    </div>
  `),
};

/**
 * 2. Ruled Hierarchy Tree (.navigation-tree--ruled)
 * Continuous vertical guide lines trace parent-child relationships clearly across deep trees.
 */
export const RuledHierarchyTree: Story = {
  render: () =>
    withInteractiveLinks(`
    <div class="card card--bordered padding-md" style="max-inline-size: 24rem; background: var(--surface);">
      <div class="micro-heading text-muted margin-bottom-xs">
        <span>Documentation Topics</span>
      </div>
      <nav class="navigation-tree navigation-tree--ruled" aria-label="Documentation topics">
        <ul class="navigation-tree__list">
          <li class="navigation-tree__item">
            <a href="#getting-started" class="navigation-tree__link">
              <span class="navigation-tree__text">Getting Started</span>
            </a>
            <ul class="navigation-tree__list">
              <li class="navigation-tree__item">
                <a href="#installation" class="navigation-tree__link">
                  <span class="navigation-tree__text">Installation</span>
                </a>
              </li>
              <li class="navigation-tree__item">
                <a href="#token-architecture" class="navigation-tree__link" aria-current="true">
                  <span class="navigation-tree__text">Token Architecture</span>
                </a>
                <ul class="navigation-tree__list">
                  <li class="navigation-tree__item">
                    <a href="#global-tokens" class="navigation-tree__link">
                      <span class="navigation-tree__text">1-Global Tokens</span>
                    </a>
                  </li>
                  <li class="navigation-tree__item">
                    <a href="#semantic-tokens" class="navigation-tree__link">
                      <span class="navigation-tree__text">2-Semantic Tokens</span>
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li class="navigation-tree__item">
            <a href="#components" class="navigation-tree__link">
              <span class="navigation-tree__text">Components Library</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  `),
};

/**
 * 3. With Badges and Metadata
 * Navigation tree nodes supporting atom badges to communicate status, version, or counts.
 */
export const WithBadgesAndMetadata: Story = {
  render: () =>
    withInteractiveLinks(`
    <div class="card card--bordered padding-md" style="max-inline-size: 24rem; background: var(--surface);">
      <nav class="navigation-tree navigation-tree--ruled" aria-label="API Sections">
        <ul class="navigation-tree__list">
          <li class="navigation-tree__item">
            <a href="#atoms" class="navigation-tree__link">
              <span class="navigation-tree__text">Atoms</span>
              <span class="badge badge--sm"><span class="badge__text">17</span></span>
            </a>
            <ul class="navigation-tree__list">
              <li class="navigation-tree__item">
                <a href="#button" class="navigation-tree__link" aria-current="true">
                  <span class="navigation-tree__text">Button</span>
                  <span class="status status--success status--sm"><span class="status__text">AAA</span></span>
                </a>
              </li>
              <li class="navigation-tree__item">
                <a href="#input" class="navigation-tree__link">
                  <span class="navigation-tree__text">Input</span>
                  <span class="chip chip--subtle chip--sm"><span class="chip__text">v2.2</span></span>
                </a>
              </li>
            </ul>
          </li>
          <li class="navigation-tree__item">
            <a href="#molecules" class="navigation-tree__link">
              <span class="navigation-tree__text">Molecules</span>
              <span class="status status--accent status--sm"><span class="status__text">New</span></span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  `),
};

/**
 * 4. Compact Density in Sidebar Context
 * Demonstrates dense layout mode (--ui-sizing: compact) embedded in a sidebar rail.
 */
export const CompactSidebarContext: Story = {
  render: () =>
    withInteractiveLinks(`
    <div class="sidebar sidebar--flush border" style="max-inline-size: 18rem; min-block-size: 22rem; background: var(--surface);">
      <div class="sidebar__scroller py px-sm">
        <span class="navigation-tree__heading micro-heading text-muted">Page Contents</span>
        <nav class="navigation-tree navigation-tree--indicator navigation-tree--compact navigation-tree--flush" aria-label="Page contents">
          <ol class="navigation-tree__list">
            <li class="navigation-tree__item">
              <a href="#sec-1" class="navigation-tree__link" aria-current="true">
                <span class="navigation-tree__text">Executive Summary</span>
              </a>
            </li>
            <li class="navigation-tree__item">
              <a href="#sec-2" class="navigation-tree__link">
                <span class="navigation-tree__text">Design Token Economics</span>
              </a>
              <ol class="navigation-tree__list">
                <li class="navigation-tree__item">
                  <a href="#sec-2-1" class="navigation-tree__link">
                    <span class="navigation-tree__text">Fluid Clamps</span>
                  </a>
                </li>
                <li class="navigation-tree__item">
                  <a href="#sec-2-2" class="navigation-tree__link">
                    <span class="navigation-tree__text">Zero Specificity Cascade</span>
                  </a>
                </li>
              </ol>
            </li>
            <li class="navigation-tree__item">
              <a href="#sec-3" class="navigation-tree__link">
                <span class="navigation-tree__text">Accessibility Checklist</span>
              </a>
            </li>
          </ol>
        </nav>
      </div>
    </div>
  `),
};
