import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Molecules/Pagination',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# Pagination & Page Count Primitives

Accessible dataset navigation composing \`.button-group\`, \`.button\`, \`.divider\`, and zero-JS dynamic-growing form inputs (\`field-sizing: content\`) for page sequences, directional steppers, and direct jump controls adhering to WCAG 2.2 Level AA / AAA.

---

### Canonical Semantic Markup Signatures

#### 1. Numeric Pagination Cluster
\`\`\`html
<nav class="pagination button-group buttons-subtle" aria-label="Pagination">
  <span class="button button--selected" aria-current="page"><span>1</span></span>
  <a class="button" href="#2"><span>2</span></a>
  <a class="button" href="#3"><span>3</span></a>
  <a class="button" href="#4"><span>4</span></a>
  <hr class="divider">
  <a class="button" href="#10"><span>10</span></a>
</nav>
\`\`\`

#### 2. Page Count & Jump Bar
\`\`\`html
<div class="page-count">
  <p class="page-count__info">Page 2 of 10</p>
  <form class="page-count__jump inline-form">
    <div class="inline-field">
      <label for="page-jump" class="field__label">Go to page</label>
      <input class="input" type="number" id="page-jump" name="page" min="1" max="10" value="2">
    </div>
    <button class="button" type="submit"><span>Go</span></button>
  </form>
</div>
\`\`\`

---

### WCAG 2.2 Conformance Matrix
| Criterion | Level | Status | Architectural Implementation |
| :--- | :--- | :--- | :--- |
| **1.3.1 Info and Relationships** | A | **Pass** | Semantic \`<nav aria-label="Pagination">\` encapsulates controls; \`<hr class="divider">\` indicates skipped ranges. |
| **4.1.2 Name, Role, Value** | A | **Pass** | Current active page uses \`aria-current="page"\`; disabled boundary buttons use \`aria-disabled="true"\`. |
| **1.4.3 Contrast (Minimum)** | AA (4.5:1) | **Pass** | Active and subtle button states guarantee >= 4.5:1 contrast in light and dark modes. |
| **2.4.7 Focus Visible** | AA | **Pass** | Every clickable numeric button and directional control inherits high-contrast 2px focus ring. |
| **2.5.5 Target Size (Enhanced)** | AAA (48×48px) | **Pass** | Standard pagination buttons enforce \`min-block-size: 3rem\` (48px) and touch target clearance. |
| **2.5.8 Target Size (Minimum)** | AA (24×24px) | **Pass** | Compact pagination buttons enforce \`min-block-size: 2rem\` (32px), comfortably exceeding AA requirements. |
| **Icon Accessibility** | Best Practice | **Pass** | Directional icon buttons include mandatory \`.visually-hidden\` text ("Previous page", "Next page"). |

---

### CSS Custom Property Token Contract
| CSS Variable | Default Value | Fallback Ladder | Description |
| :--- | :--- | :--- | :--- |
| \`--button-padding-inline\` | \`var(--spacing-4, 0.25rem)\` | \`0.25rem\` | Horizontal button padding for compact numeric squares |
| \`--button-group-gap\` | \`calc(var(--spacing) / 2)\` | \`0.5rem\` | Spacing between sibling page buttons |
| \`--divider-width\` | \`var(--border-width, 1px)\` | \`1px\` | Width of the vertical range separator line |
| \`--divider-color\` | \`var(--border-color-quiet)\` | \`currentColor\` | Range divider stroke color |
| \`--pagination-justify-content\` | \`flex-start\` | \`flex-start\` | Layout alignment (center, flex-end, space-between) |
| \`--page-count-font-size\` | \`var(--typography-font-size-0)\` | \`1rem\` | Reading size for page summary readout |
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * 1. Playground
 * Interactive sandbox exploring current page, total pages, and jump bar composition.
 */
export const Playground: Story = {
  args: {
    currentPage: 2,
    totalPages: 10,
    size: 'standard',
    alignment: 'center',
    showJumpForm: true,
  },
  argTypes: {
    currentPage: {
      name: 'Current Page',
      control: { type: 'select' },
      options: [1, 2, 3, 4, 10],
      description: 'Active page index.',
    },
    totalPages: {
      name: 'Total Pages',
      control: { type: 'number' },
      defaultValue: 10,
    },
    size: {
      name: 'Size Tier',
      control: { type: 'inline-radio' },
      options: ['standard', 'sm'],
      description: 'Standard 48px AAA buttons vs compact 32px AA.',
    },
    alignment: {
      name: 'Alignment',
      control: { type: 'select' },
      options: ['flex-start', 'center', 'flex-end', 'space-between'],
      description: 'Justify content positioning.',
    },
    showJumpForm: {
      name: 'Show Jump Form',
      control: { type: 'boolean' },
      description: 'Includes input jump bar below.',
    },
  },
  render: (args) => {
    const isSm = args.size === 'sm';
    const btnClass = isSm ? 'button button--sm' : 'button';
    const grpClass = isSm ? 'button-group button-group--sm buttons-subtle' : 'button-group buttons-subtle';

    const renderPageBtn = (num: number) => {
      const isCurrent = num === args.currentPage;
      if (isCurrent) {
        return `<span class="${btnClass} button--selected" aria-current="page"><span>${num}</span></span>`;
      }
      return `<a class="${btnClass}" href="#page-${num}"><span>${num}</span></a>`;
    };

    return `
      <div style="max-inline-size: 46rem; margin-inline: auto; display: flex; flex-direction: column; gap: var(--spacing-16);">
        <nav class="pagination ${grpClass}" aria-label="Pagination demo" style="--pagination-justify-content: ${args.alignment};">
          <a class="${btnClass}" href="#prev" aria-label="Previous page">
            <svg class="icon dir" aria-hidden="true" focusable="false">
              <use href="#ChevronLeft"/>
            </svg>
            <span class="visually-hidden">Previous page</span>
          </a>
          ${renderPageBtn(1)}
          ${renderPageBtn(2)}
          ${renderPageBtn(3)}
          ${renderPageBtn(4)}
          <hr class="divider">
          ${renderPageBtn(args.totalPages)}
          <a class="${btnClass}" href="#next" aria-label="Next page">
            <svg class="icon dir" aria-hidden="true" focusable="false">
              <use href="#ChevronRight"/>
            </svg>
            <span class="visually-hidden">Next page</span>
          </a>
        </nav>

        ${args.showJumpForm ? `
          <div class="page-count" style="justify-content: ${args.alignment};">
            <p class="page-count__info">Page ${args.currentPage} of ${args.totalPages}</p>
            <form class="page-count__jump inline-form" onsubmit="event.preventDefault();">
              <div class="inline-field">
                <label for="demo-jump" class="field__label">Go to page</label>
                <input class="input ${isSm ? 'input--sm' : ''}" type="number" id="demo-jump" name="page" min="1" max="${args.totalPages}" value="${args.currentPage}">
              </div>
              <button class="${btnClass}" type="submit"><span>Go</span></button>
            </form>
          </div>
        ` : ''}
      </div>
    `;
  },
};

/**
 * 2. Anatomy
 * Exploded breakdown highlighting the semantic landmarks, active page state, and dividers.
 */
export const Anatomy: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: var(--spacing-24); max-inline-size: 46rem;">
      <div class="demo-card-callout" style="padding: var(--spacing-16); border: 1px dashed var(--border-color); border-radius: var(--radius-md); background: var(--surface-muted);">
        <p style="margin: 0; font-size: var(--typography-font-size--1); color: var(--foreground-muted);">
          <strong>Structural Breakdown:</strong> Composed of <code>&lt;nav class="pagination button-group buttons-subtle"&gt;</code>. The active page is represented by a non-link <code>span.button.button--selected[aria-current="page"]</code>, disconnected intervals are separated by <code>hr.divider</code>, and step summaries use <code>.page-count</code>.
        </p>
      </div>

      <div style="padding: var(--spacing-24); border: 2px dashed var(--color-accent); border-radius: var(--radius-md); display: flex; flex-direction: column; gap: var(--spacing-16);">
        <nav class="pagination button-group buttons-subtle" aria-label="Anatomy breakdown">
          <span class="button" aria-disabled="true" style="outline: 1px dashed var(--color-danger);">
            <svg class="icon dir" aria-hidden="true" focusable="false">
              <use href="#ChevronLeft"/>
            </svg>
            <span class="visually-hidden">Previous (disabled)</span>
          </span>

          <span class="button button--selected" aria-current="page" style="outline: 2px dashed var(--color-success);">
            <span>aria-current="page"</span>
          </span>

          <a class="button" href="#2" style="outline: 1px dashed var(--border-color);">
            <span>a.button</span>
          </a>

          <hr class="divider" style="outline: 1px dashed var(--color-accent);">

          <a class="button" href="#10"><span>10</span></a>

          <a class="button" href="#next">
            <svg class="icon dir" aria-hidden="true" focusable="false">
              <use href="#ChevronRight"/>
            </svg>
            <span class="visually-hidden">Next</span>
          </a>
        </nav>
      </div>
    </div>
  `,
};

/**
 * 3. Variants
 * Showcases numeric cluster, directional controls, compact pills, and jump bars.
 */
export const Variants: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: var(--spacing-32); max-inline-size: 46rem;">
      
      <!-- Variant 1: Pure Numeric Cluster -->
      <div>
        <span style="font-size: var(--typography-font-size--1); color: var(--foreground-muted); display: block; margin-block-end: var(--spacing-8);">
          1. Numbered Sequence with Truncation Divider
        </span>
        <nav class="pagination button-group buttons-subtle" aria-label="Numbered sequence">
          <span class="button button--selected" aria-current="page"><span>1</span></span>
          <a class="button" href="#2"><span>2</span></a>
          <a class="button" href="#3"><span>3</span></a>
          <a class="button" href="#4"><span>4</span></a>
          <hr class="divider">
          <a class="button" href="#50"><span>50</span></a>
        </nav>
      </div>

      <!-- Variant 2: Directional Prev / Next Only -->
      <div>
        <span style="font-size: var(--typography-font-size--1); color: var(--foreground-muted); display: block; margin-block-end: var(--spacing-8);">
          2. Directional Stepper with Step Counter
        </span>
        <nav class="pagination button-group buttons-subtle" aria-label="Directional stepper">
          <span class="button" aria-disabled="true">
            <svg class="icon dir" aria-hidden="true" focusable="false">
              <use href="#ChevronLeft"/>
            </svg>
            <span class="visually-hidden">Previous page</span>
          </span>
          <span class="button-group__content" style="padding-inline: var(--spacing-8); font-size: var(--typography-font-size--1);">
            Page 1 of 12
          </span>
          <a class="button" href="#next">
            <svg class="icon dir" aria-hidden="true" focusable="false">
              <use href="#ChevronRight"/>
            </svg>
            <span class="visually-hidden">Next page</span>
          </a>
        </nav>
      </div>

      <!-- Variant 3: Page Count Jump Bar with Select -->
      <div>
        <span style="font-size: var(--typography-font-size--1); color: var(--foreground-muted); display: block; margin-block-end: var(--spacing-8);">
          3. Page Count with Native Quick Select
        </span>
        <div class="page-count">
          <p class="page-count__info">Showing 10 of 100 items</p>
          <form class="page-count__jump inline-form" onsubmit="event.preventDefault();">
            <div class="inline-field">
              <label for="jump-select" class="field__label">Jump</label>
              <select id="jump-select" class="select select--sm">
                <option value="1" selected>Page 1</option>
                <option value="2">Page 2</option>
                <option value="3">Page 3</option>
                <option value="4">Page 4</option>
              </select>
            </div>
          </form>
        </div>
      </div>

    </div>
  `,
};

/**
 * 4. StateMatrix
 * Demonstrates resting, selected, hover, focus-visible, and disabled states.
 */
export const StateMatrix: Story = {
  render: () => `
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(18rem, 100%), 1fr)); gap: var(--spacing-24); max-inline-size: 52rem;">
      
      <!-- Selected State -->
      <div class="pd bd rd">
        <span style="font-size: var(--typography-font-size--1); color: var(--foreground-muted); display: block; margin-block-end: var(--spacing-8);">
          Active Page (.button--selected)
        </span>
        <div class="pagination button-group buttons-subtle">
          <span class="button button--selected" aria-current="page"><span>1</span></span>
        </div>
      </div>

      <!-- Inactive Clickable Page -->
      <div class="pd bd rd">
        <span style="font-size: var(--typography-font-size--1); color: var(--foreground-muted); display: block; margin-block-end: var(--spacing-8);">
          Inactive Page (a.button)
        </span>
        <div class="pagination button-group buttons-subtle">
          <a class="button" href="#2"><span>2</span></a>
        </div>
      </div>

      <!-- Focus Visible State -->
      <div class="pd bd rd">
        <span style="font-size: var(--typography-font-size--1); color: var(--foreground-muted); display: block; margin-block-end: var(--spacing-8);">
          Keyboard Focus-Visible
        </span>
        <div class="pagination button-group buttons-subtle">
          <a class="button" href="#3" style="outline: var(--focus-ring-width) solid var(--focus-ring-color); outline-offset: var(--focus-ring-offset);">
            <span>3</span>
          </a>
        </div>
      </div>

      <!-- Disabled Boundary State -->
      <div class="pd bd rd">
        <span style="font-size: var(--typography-font-size--1); color: var(--foreground-muted); display: block; margin-block-end: var(--spacing-8);">
          Disabled Boundary ([aria-disabled="true"])
        </span>
        <div class="pagination button-group buttons-subtle">
          <span class="button" aria-disabled="true" style="opacity: 0.5; pointer-events: none;">
            <svg class="icon dir" aria-hidden="true" focusable="false">
              <use href="#ChevronLeft"/>
            </svg>
            <span class="visually-hidden">Previous</span>
          </span>
        </div>
      </div>

      <!-- High Contrast Mode Simulation -->
      <div class="pd bd rd">
        <span style="font-size: var(--typography-font-size--1); color: var(--foreground-muted); display: block; margin-block-end: var(--spacing-8);">
          High-Contrast Mode (Solid 2px Borders)
        </span>
        <div class="pagination button-group buttons-subtle">
          <span class="button" style="border: 2px solid currentColor; font-weight: bold;"><span>1</span></span>
          <a class="button" href="#2" style="border: 2px solid currentColor;"><span>2</span></a>
        </div>
      </div>

    </div>
  `,
};

/**
 * 5. SizesAndDensity
 * Compares standard 48px AAA touch targets with compact 32px AA buttons.
 */
export const SizesAndDensity: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: var(--spacing-24); max-inline-size: 46rem;">
      
      <!-- Standard Size -->
      <div>
        <span style="font-size: var(--typography-font-size--1); color: var(--foreground-muted); display: block; margin-block-end: var(--spacing-8);">
          Standard Size (48px Touch Targets — WCAG 2.5.5 AAA Target)
        </span>
        <nav class="pagination button-group buttons-subtle" aria-label="Standard pagination">
          <span class="button button--selected" aria-current="page"><span>1</span></span>
          <a class="button" href="#2"><span>2</span></a>
          <a class="button" href="#3"><span>3</span></a>
          <hr class="divider">
          <a class="button" href="#10"><span>10</span></a>
        </nav>
      </div>

      <!-- Compact Size -->
      <div>
        <span style="font-size: var(--typography-font-size--1); color: var(--foreground-muted); display: block; margin-block-end: var(--spacing-8);">
          Compact Size (.button-group--sm / 32px Targets — WCAG 2.5.8 AA Target)
        </span>
        <nav class="pagination button-group button-group--sm buttons-subtle" aria-label="Compact pagination">
          <span class="button button--sm button--selected" aria-current="page"><span>1</span></span>
          <a class="button button--sm" href="#2"><span>2</span></a>
          <a class="button button--sm" href="#3"><span>3</span></a>
          <hr class="divider">
          <a class="button button--sm" href="#10"><span>10</span></a>
        </nav>
      </div>

    </div>
  `,
};

/**
 * 6. ZeroClassOrchestration
 * Demonstrates zero-JS dynamic content-fitting field sizing on jump number inputs.
 */
export const ZeroClassOrchestration: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: var(--spacing-24); max-inline-size: 46rem;">
      <div class="demo-card-callout" style="padding: var(--spacing-16); border: 1px dashed var(--border-color); border-radius: var(--radius-md); background: var(--surface-muted);">
        <p style="margin: 0; font-size: var(--typography-font-size--1); color: var(--foreground-muted);">
          <strong>Zero-JS Dynamic Input Sizing:</strong> The jump number input inside <code>.page-count</code> utilizes <code>field-sizing: content</code>. The input automatically expands or contracts to fit the exact digit length (e.g. "5" vs "1250") without arbitrary fixed widths or JavaScript listeners.
        </p>
      </div>

      <div class="page-count" style="padding: var(--spacing-16); border: 1px dashed var(--border-color); border-radius: var(--radius-md);">
        <p class="page-count__info">Dataset: 1,420 entries across 142 pages</p>
        <form class="page-count__jump inline-form" onsubmit="event.preventDefault();">
          <div class="inline-field">
            <label for="dyn-page" class="field__label">Go to page</label>
            <input class="input" type="number" id="dyn-page" name="page" min="1" max="142" value="42">
          </div>
          <button class="button button--subtle" type="submit"><span>Go</span></button>
        </form>
      </div>
    </div>
  `,
};

/**
 * 7. RealWorldRecipes
 * Production compositions: Complete Data Table Footer Bar and Minimal Mobile Stepper.
 */
export const RealWorldRecipes: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: var(--spacing-32); max-inline-size: 52rem;">
      
      <!-- Recipe 1: Production Data Table Footer Bar -->
      <section style="display: flex; flex-direction: column; gap: var(--spacing-16);">
        <h4 style="font-size: var(--typography-font-size-1); margin: 0;">
          Recipe 1: Full-Featured Data Table Footer
        </h4>
        <div class="card card--bordered card--compact" style="padding: var(--spacing-16);">
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: var(--spacing-16);">
            <div class="page-count" style="inline-size: auto;">
              <p class="page-count__info" style="font-size: var(--typography-font-size--1);">
                Showing <strong>21–30</strong> of <strong>140</strong> results
              </p>
            </div>

            <nav class="pagination button-group button-group--sm buttons-subtle" aria-label="Table pagination">
              <a class="button button--sm" href="#prev" aria-label="Previous">
                <svg class="icon dir" aria-hidden="true" focusable="false">
                  <use href="#ChevronLeft"/>
                </svg>
                <span class="visually-hidden">Previous</span>
              </a>
              <a class="button button--sm" href="#1"><span>1</span></a>
              <a class="button button--sm" href="#2"><span>2</span></a>
              <span class="button button--sm button--selected" aria-current="page"><span>3</span></span>
              <a class="button button--sm" href="#4"><span>4</span></a>
              <hr class="divider">
              <a class="button button--sm" href="#14"><span>14</span></a>
              <a class="button button--sm" href="#next" aria-label="Next">
                <svg class="icon dir" aria-hidden="true" focusable="false">
                  <use href="#ChevronRight"/>
                </svg>
                <span class="visually-hidden">Next</span>
              </a>
            </nav>

            <form class="inline-form" onsubmit="event.preventDefault();">
              <div class="inline-field">
                <label for="table-jump" class="field__label" style="font-size: var(--typography-font-size--1);">Jump</label>
                <input class="input input--sm" type="number" id="table-jump" min="1" max="14" value="3">
              </div>
              <button class="button button--sm button--subtle" type="submit"><span>Go</span></button>
            </form>
          </div>
        </div>
      </section>

      <!-- Recipe 2: Minimalist Mobile Stepper -->
      <section style="display: flex; flex-direction: column; gap: var(--spacing-16);">
        <h4 style="font-size: var(--typography-font-size-1); margin: 0;">
          Recipe 2: Mobile Compact Stepper
        </h4>
        <div style="max-inline-size: 20rem; padding: var(--spacing-12); border: 1px solid var(--border-color); border-radius: var(--radius-md);">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <button type="button" class="button button--subtle button--sm">
              <svg class="icon dir" aria-hidden="true" focusable="false">
                <use href="#ChevronLeft"/>
              </svg>
              <span>Prev</span>
            </button>
            <span style="font-size: var(--typography-font-size--1); color: var(--foreground-muted); font-weight: 500;">
              Page 3 of 10
            </span>
            <button type="button" class="button button--subtle button--sm">
              <span>Next</span>
              <svg class="icon dir" aria-hidden="true" focusable="false">
                <use href="#ChevronRight"/>
              </svg>
            </button>
          </div>
        </div>
      </section>

    </div>
  `,
};
