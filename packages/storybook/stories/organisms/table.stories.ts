import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Organisms/Table',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
## Table Primitive

Accessible, token-driven tabular data foundation featuring keyboard-accessible responsive containers (\`tabindex="0"\`), CSS scroll-state container queries for dynamic depth drop shadows, semantic header scopes (\`scope="col"\` / \`scope="row"\`), tabular numeric alignments, and multi-axis sticky pinning adhering to WCAG 2.2 Level AA / AAA standards.

---

### Canonical Semantic Markup Signature
\`\`\`html
<div class="table-container" tabindex="0" role="region" aria-label="Quarterly Financial Summary">
  <table class="table table--striped table--hover">
    <caption class="table__caption">Quarterly Financial Summary</caption>
    <thead>
      <tr>
        <th scope="col" class="table__col--fill">Category</th>
        <th scope="col" class="table__col--sm table__col--num">Q1</th>
        <th scope="col" class="table__col--sm table__col--num">Q2</th>
        <th scope="col" class="table__col--sm table__col--num">Total</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">Enterprise Revenue</th>
        <td class="table__col--num">$124,500</td>
        <td class="table__col--num">$148,200</td>
        <td class="table__col--num">$272,700</td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <th scope="row">Total</th>
        <td class="table__col--num">$124,500</td>
        <td class="table__col--num">$148,200</td>
        <td class="table__col--num">$272,700</td>
      </tr>
    </tfoot>
  </table>
</div>
\`\`\`

---

### Token-Driven Column Sizing Utilities (\`.table__col--*\`)
Eliminates inline \`style="inline-size: ..."\` on \`<col>\`, \`<th>\`, and \`<td>\` elements with tokenized widths and table-layout flex/fixed behaviors:
- \`.table__col--index\` / \`.table__col--counter\`: 2.5rem (40px) centered row number / checkbox column.
- \`.table__col--xs\`: 4rem (64px) extra small column (badges, ISO codes).
- \`.table__col--sm\`: 6rem (96px) small column (time, duration, short status).
- \`.table__col--md\`: 8rem (128px) medium column (status badges, dates, category).
- \`.table__col--lg\`: 12rem (192px) large column (usernames, email).
- \`.table__col--xl\`: 16rem (256px) extra large column (titles, descriptions).
- \`.table__col--actions\`: 6.5rem (104px) end-aligned action buttons / toolbar.
- \`.table__col--fill\` / \`.table__col--expand\`: 100% fluid flexible column.
- \`.table__col--fit\`: Shrink-wraps column to exact content width (\`min-content\`).
- \`.table__col--num\` / \`.table__col--numeric\`: Tabular numeric alignment (\`text-align: end; tabular-nums\`).

---

### Column Sizing & Alignment Best Practices (Industry Guidance)

Following data table UX and accessibility standards (NN/g, GOV.UK, Carbon, USWDS):

| Data Type | Primary Class | Alignment | Sizing Strategy | Industry UX Rationale |
| :--- | :--- | :--- | :--- | :--- |
| **Identifiers / Codes** | \`.table__col--fit\` | Left / Start (\`font-mono\`) | Shrink-wrap (\`min-content\`) | **Never wrap IDs** (e.g. \`#A-01\`, SKUs, UUIDs). Wrapping breaks visual recognition and scanning. |
| **Dates & Times** | \`.table__col--fit\` | Left or Numeric (\`font-mono\`) | Shrink-wrap (\`nowrap\`) | **Never wrap dates** across lines (e.g. \`30\` / \`Nov 2026\`). Multi-line dates cause severe misreading. |
| **Status Badges / Chips** | \`.table__col--fit.table__col--center\` | Center | Shrink-wrap or \`.table__col--md\` | Centering applies **when a cell contains only a badge** to align its optical center. If paired with multi-line descriptive text, keep start-aligned. |
| **Numeric & Measures** | \`.table__col--num\` / \`.table__cell--numeric\` | Right / End (\`tabular-nums\`) | Fit or Fixed (\`.table__col--sm\`) | Right-alignment aligns digits and decimal points vertically, enabling instant magnitude comparison. |
| **Text & Descriptions** | \`.table__col--fill\` / \`.table__col--lg\` | Left / Start | Fluid flexible (\`100%\`) or truncated | Left-alignment follows natural Western reading order along the vertical left-edge anchor. |
| **Row Selection / Index** | \`.table__col--index\` | Center | Fixed 2.5rem (40px) | Provides predictable hit target for checkboxes and sequence numerals. |
| **Actions & Menus** | \`.table__col--fit.table__cell--center\` | Center or Right (\`end\`) | Shrink-wrap (\`min-content\`) | Keeps action buttons anchored tightly to row boundaries. **Header must use \`<span class="visually-hidden">Actions</span>\`** to eliminate visual clutter while preserving WCAG 1.3.1 accessible naming. |


---

### WCAG 2.2 Conformance Matrix
| Criterion | Level | Status | Architectural Implementation |
| :--- | :--- | :--- | :--- |
| **1.3.1 Info and Relationships** | A | **Pass** | Semantic \`<caption>\`, \`<thead>\`, \`<tbody>\`, \`<tfoot>\`, \`<th scope="col">\`, and \`<th scope="row">\` establish unambiguous data cell associations. |
| **2.1.1 Keyboard** | A | **Pass** | Outer \`.table-container\` declares \`tabindex="0"\` and \`role="region"\` so keyboard users can scroll wide tables without mouse interaction. |
| **1.4.10 Reflow** | AA | **Pass** | Prevents horizontal page blowout down to 320px viewport widths while keeping tabular content accessible. |
| **2.4.7 Focus Visible** | AA | **Pass** | Scroll container and sort buttons receive prominent 2px focus indicators on keyboard \`:focus-visible\`. |
| **Tabular Numbers** | Best Practice | **Pass** | \`.table__cell--numeric\` applies \`font-variant-numeric: tabular-nums lining-nums\` ensuring proportional digit alignments. |
| **High Contrast Mode** | Best Practice | **Pass** | \`@media (prefers-contrast: more)\` automatically reinforces 2px cell borders and eliminates translucent fades. |

---

### CSS Custom Property Token Contract
| CSS Variable | Default Value | Fallback Ladder | Description |
| :--- | :--- | :--- | :--- |
| \`--_table-bg\` | \`var(--table-bg)\` | \`transparent\` | Base table background color |
| \`--_table-border-color\` | \`var(--table-border-color)\` | \`var(--panel-border-color)\` | Perimeter border stroke color |
| \`--_table-cell-padding-block\` | \`var(--table-cell-padding-block)\` | \`0.75rem\` (12px) | Standard cell vertical breathing room |
| \`--_table-cell-padding-inline\` | \`var(--table-cell-padding-inline)\` | \`1rem\` (16px) | Standard cell horizontal padding |
| \`--_table-row-stripe-bg\` | \`var(--table-row-stripe-bg)\` | \`var(--surface-translucent)\` | Alternating zebra row background |
| \`--_table-row-hover-bg\` | \`var(--table-row-hover-bg)\` | \`var(--surface-translucent-strong)\` | Row hover highlight fill |
| \`--_table-cell-sticky-bg\` | \`var(--table-cell-sticky-bg)\` | \`Canvas\` | Pinned sticky header/column solid surface fill |
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * 1. Playground
 * Interactive sandbox exploring table modifiers, density, sticky columns, and stripes.
 */
export const Playground: Story = {
  args: {
    variant: 'striped',
    density: 'standard',
    isHoverable: true,
    stickyHeader: true,
    stickyFirstCol: true,
  },
  argTypes: {
    variant: {
      name: 'Variant',
      control: { type: 'select' },
      options: ['default', 'striped', 'bordered', 'simple'],
      description: 'Cosmetic style of rows and grid dividers.',
    },
    density: {
      name: 'Density Mode',
      control: { type: 'inline-radio' },
      options: ['standard', 'compact'],
      description: 'Standard 12px/16px padding vs compact 8px/12px data table density.',
    },
    isHoverable: {
      name: 'Row Hover Highlight',
      control: { type: 'boolean' },
      description: 'Enables .table--hover interactive row fills.',
    },
    stickyHeader: {
      name: 'Sticky Header',
      control: { type: 'boolean' },
      description: 'Pins thead on vertical scrolling.',
    },
    stickyFirstCol: {
      name: 'Sticky First Column',
      control: { type: 'boolean' },
      description: 'Pins first row label on horizontal scrolling.',
    },
  },
  render: (args) => {
    const classes = [
      'table',
      args.variant !== 'default' ? `table--${args.variant}` : '',
      args.density === 'compact' ? 'table--compact' : '',
      args.isHoverable ? 'table--hover' : '',
      args.stickyHeader ? 'table--sticky-head' : '',
      args.stickyFirstCol ? 'table--sticky-first-column' : '',
    ].filter(Boolean).join(' ');

    return `
      <div class="wrapper wrapper--2xl">
        <div 
          class="table-container" 
          tabindex="0" 
          role="region" 
          aria-label="Interactive Financial Matrix"
          style="max-block-size: 22rem; overflow: auto;"
        >
          <table class="${classes}">
            <caption class="table__caption">Fiscal Performance Matrix 2026</caption>
            <thead>
              <tr>
                <th scope="col" class="table__cell--fit">Region</th>
                <th scope="col" class="table__cell--numeric">Q1 Target</th>
                <th scope="col" class="table__cell--numeric">Q1 Actual</th>
                <th scope="col" class="table__cell--numeric">Q2 Target</th>
                <th scope="col" class="table__cell--numeric">Q2 Actual</th>
                <th scope="col" class="table__cell--center">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" class="table__cell--fit">North America</th>
                <td class="table__cell--numeric">$500,000</td>
                <td class="table__cell--numeric">$540,200</td>
                <td class="table__cell--numeric">$520,000</td>
                <td class="table__cell--numeric">$565,100</td>
                <td class="table__cell--center"><span class="badge badge--success"><span>Ahead</span></span></td>
              </tr>
              <tr>
                <th scope="row" class="table__cell--fit">Europe & UK</th>
                <td class="table__cell--numeric">$400,000</td>
                <td class="table__cell--numeric">$415,800</td>
                <td class="table__cell--numeric">$420,000</td>
                <td class="table__cell--numeric">$430,400</td>
                <td class="table__cell--center"><span class="badge badge--success"><span>Ahead</span></span></td>
              </tr>
              <tr>
                <th scope="row" class="table__cell--fit">Asia Pacific</th>
                <td class="table__cell--numeric">$300,000</td>
                <td class="table__cell--numeric">$290,100</td>
                <td class="table__cell--numeric">$320,000</td>
                <td class="table__cell--numeric">$315,900</td>
                <td class="table__cell--center"><span class="badge badge--warning"><span>On Track</span></span></td>
              </tr>
              <tr>
                <th scope="row" class="table__cell--fit">Latin America</th>
                <td class="table__cell--numeric">$150,000</td>
                <td class="table__cell--numeric">$162,400</td>
                <td class="table__cell--numeric">$160,000</td>
                <td class="table__cell--numeric">$175,000</td>
                <td class="table__cell--center"><span class="badge badge--success"><span>Ahead</span></span></td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <th scope="row" class="table__cell--fit">Total Summary</th>
                <td class="table__cell--numeric">$1,350,000</td>
                <td class="table__cell--numeric">$1,408,500</td>
                <td class="table__cell--numeric">$1,420,000</td>
                <td class="table__cell--numeric">$1,486,400</td>
                <td class="table__cell--center"><span class="badge badge--accent"><span>Approved</span></span></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    `;
  },
};

/**
 * 2. Anatomy
 * Exploded breakdown highlighting the semantic hierarchy, caption, header scopes, and tabular cells.
 */
export const Anatomy: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: var(--spacing-24); max-inline-size: 54rem;">
      <div class="demo-card-callout" style="padding: var(--spacing-16); border: 1px dashed var(--border-color); border-radius: var(--radius-md); background: var(--surface-muted);">
        <p style="margin: 0; font-size: var(--typography-font-size--1); color: var(--foreground-muted);">
          <strong>Structural Breakdown:</strong> <code>.table-container[tabindex="0"][role="region"]</code> encloses the table to ensure keyboard-accessible scrollability. <code>caption.table__caption</code> provides context for screen readers, while <code>th[scope="col"]</code> and <code>th[scope="row"]</code> guarantee unambiguous cell association.
        </p>
      </div>

      <div style="padding: var(--spacing-16); border: 2px dashed var(--color-accent); border-radius: var(--radius-md);">
        <div class="table-container" tabindex="0" role="region" aria-label="Anatomy breakdown">
          <table class="table">
            <caption class="table__caption" style="outline: 1px dashed var(--color-accent); outline-offset: 2px;">
              caption.table__caption (Pinned Landmark)
            </caption>
            <thead>
              <tr style="outline: 1px dashed var(--color-success);">
                <th scope="col">th[scope="col"]</th>
                <th scope="col" class="table__cell--numeric">th.table__cell--numeric</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" style="outline: 1px dashed var(--color-warning);">th[scope="row"]</th>
                <td class="table__cell--numeric" style="outline: 1px dashed var(--border-color);">td.table__cell--numeric</td>
              </tr>
            </tbody>
            <tfoot>
              <tr style="outline: 1px dashed var(--color-accent);">
                <th scope="row">tfoot &gt; th[scope="row"]</th>
                <td class="table__cell--numeric">tfoot &gt; td</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  `,
};

/**
 * 3. Variants
 * Visual gallery showcasing default, striped/zebra, bordered grid, simple, and multi-axis sticky tables.
 */
export const Variants: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: var(--spacing-32); max-inline-size: 54rem;">
      
      <!-- Variant 1: Striped Rows -->
      <div>
        <span style="font-size: var(--typography-font-size--1); color: var(--foreground-muted); display: block; margin-block-end: var(--spacing-8);">
          1. Alternating Striped Rows (.table--striped / .table--zebra)
        </span>
        <div class="table-container" tabindex="0" role="region" aria-label="Striped table demo">
          <table class="table table--striped table--hover">
            <thead>
              <tr>
                <th scope="col">User</th>
                <th scope="col">Role</th>
                <th scope="col" class="table__cell--numeric">Logins</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Alex Morgan</th>
                <td>Lead Engineer</td>
                <td class="table__cell--numeric">142</td>
              </tr>
              <tr>
                <th scope="row">Jordan Lee</th>
                <td>Accessibility Specialist</td>
                <td class="table__cell--numeric">89</td>
              </tr>
              <tr>
                <th scope="row">Taylor Swift</th>
                <td>Product Designer</td>
                <td class="table__cell--numeric">64</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Variant 2: Bordered Grid -->
      <div>
        <span style="font-size: var(--typography-font-size--1); color: var(--foreground-muted); display: block; margin-block-end: var(--spacing-8);">
          2. Bordered Grid (.table--bordered)
        </span>
        <div class="table-container" tabindex="0" role="region" aria-label="Bordered table demo">
          <table class="table table--bordered">
            <thead>
              <tr>
                <th scope="col">Environment</th>
                <th scope="col">Status</th>
                <th scope="col" class="table__cell--numeric">Uptime</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Production</th>
                <td><span class="badge badge--success"><span>Healthy</span></span></td>
                <td class="table__cell--numeric">99.99%</td>
              </tr>
              <tr>
                <th scope="row">Staging</th>
                <td><span class="badge badge--accent"><span>Active</span></span></td>
                <td class="table__cell--numeric">99.85%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Variant 3: Simple Table -->
      <div>
        <span style="font-size: var(--typography-font-size--1); color: var(--foreground-muted); display: block; margin-block-end: var(--spacing-8);">
          3. Minimalist Simple Table (.table--simple)
        </span>
        <div class="table-container" tabindex="0" role="region" aria-label="Simple table demo">
          <table class="table table--simple">
            <thead>
              <tr>
                <th scope="col">Metric</th>
                <th scope="col" class="table__cell--numeric">Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Total Subscriptions</th>
                <td class="table__cell--numeric">1,420</td>
              </tr>
              <tr>
                <th scope="row">Monthly Recurring Revenue</th>
                <td class="table__cell--numeric">$28,400.00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  `,
};

/**
 * 4. StateMatrix
 * Covers resting rows, hover states, focused sort buttons, focused scroll containers, and high-contrast modes.
 */
export const StateMatrix: Story = {
  render: () => `
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(22rem, 100%), 1fr)); gap: var(--spacing-24); max-inline-size: 54rem;">
      
      <!-- Resting & Hover States -->
      <div class="pd bd rd">
        <span style="font-size: var(--typography-font-size--1); color: var(--foreground-muted); display: block; margin-block-end: var(--spacing-8);">
          Row Hover Highlight (.table--hover)
        </span>
        <div class="table-container" tabindex="0" role="region" aria-label="Hover demo">
          <table class="table table--hover">
            <tbody>
              <tr><th scope="row">Resting Row</th><td class="table__cell--numeric">$100</td></tr>
              <tr style="background-color: var(--surface-translucent-strong);"><th scope="row">Hovered Active Row</th><td class="table__cell--numeric">$250</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Sort Button Focus State -->
      <div class="pd bd rd">
        <span style="font-size: var(--typography-font-size--1); color: var(--foreground-muted); display: block; margin-block-end: var(--spacing-8);">
          Sort Button Focus-Visible
        </span>
        <div class="table-container" tabindex="0" role="region" aria-label="Sort focus demo">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">
                  <button type="button" class="table__sort-button" style="outline: var(--focus-ring-width) solid var(--focus-ring-color); outline-offset: -2px;">
                    <span>Sort Focused</span>
                    <svg class="icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" style="opacity: 1;"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </button>
                </th>
              </tr>
            </thead>
          </table>
        </div>
      </div>

      <!-- Scroll Container Focus-Visible -->
      <div class="pd bd rd">
        <span style="font-size: var(--typography-font-size--1); color: var(--foreground-muted); display: block; margin-block-end: var(--spacing-8);">
          Scroll Container Focus-Visible
        </span>
        <div class="table-container" tabindex="0" role="region" aria-label="Container focus demo" style="outline: var(--focus-ring-width) solid var(--focus-ring-color); outline-offset: var(--focus-ring-offset);">
          <table class="table">
            <tbody>
              <tr><th scope="row">Keyboard Scroll Focused</th><td class="table__cell--numeric">Tab Target</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- High Contrast Mode Simulation -->
      <div class="pd bd rd">
        <span style="font-size: var(--typography-font-size--1); color: var(--foreground-muted); display: block; margin-block-end: var(--spacing-8);">
          High-Contrast Mode (Solid 2px Borders)
        </span>
        <div class="table-container" tabindex="0" role="region" aria-label="High contrast demo">
          <table class="table" style="--_table-inner-border-width: 2px; border-block-end: 2px solid currentColor;">
            <thead>
              <tr style="border-block-end: 2px solid currentColor;"><th scope="col">Header</th><th scope="col" class="table__cell--numeric">Total</th></tr>
            </thead>
            <tbody>
              <tr><th scope="row">2px High Contrast</th><td class="table__cell--numeric">100%</td></tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  `,
};

/**
 * 5. SizesAndDensity
 * Compares standard 12px/16px padding with compact 8px/12px data table density.
 */
export const SizesAndDensity: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: var(--spacing-32); max-inline-size: 52rem;">
      
      <!-- Standard Density -->
      <div>
        <span style="font-size: var(--typography-font-size--1); color: var(--foreground-muted); display: block; margin-block-end: var(--spacing-8);">
          Standard Density (Padding: 0.75rem / 1rem)
        </span>
        <div class="table-container" tabindex="0" role="region" aria-label="Standard density">
          <table class="table table--striped">
            <thead><tr><th scope="col">Item</th><th scope="col" class="table__cell--numeric">Quantity</th></tr></thead>
            <tbody>
              <tr><th scope="row">Standard Spaced Row</th><td class="table__cell--numeric">42</td></tr>
              <tr><th scope="row">Generous Touch Clearance</th><td class="table__cell--numeric">18</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Compact Density -->
      <div>
        <span style="font-size: var(--typography-font-size--1); color: var(--foreground-muted); display: block; margin-block-end: var(--spacing-8);">
          Compact Density (.table--compact / --ui-density: dense)
        </span>
        <div class="table-container" tabindex="0" role="region" aria-label="Compact density">
          <table class="table table--compact table--striped">
            <thead><tr><th scope="col">Item</th><th scope="col" class="table__cell--numeric">Quantity</th></tr></thead>
            <tbody>
              <tr><th scope="row">Tight Data Dashboard Row</th><td class="table__cell--numeric">42</td></tr>
              <tr><th scope="row">Maximized Screen Efficiency</th><td class="table__cell--numeric">18</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Compact (Small) Size -->
      <div>
        <span style="font-size: var(--typography-font-size--1); color: var(--foreground-muted); display: block; margin-block-end: var(--spacing-8);">
          Compact Density (.table--sm / --ui-sizing: compact)
        </span>
        <div class="table-container" tabindex="0" role="region" aria-label="Compact density">
          <table class="table table--sm table--striped">
            <thead><tr><th scope="col">Item</th><th scope="col" class="table__cell--numeric">Quantity</th></tr></thead>
            <tbody>
              <tr><th scope="row">Tight Data Dashboard Row</th><td class="table__cell--numeric">42</td></tr>
              <tr><th scope="row">Maximized Screen Efficiency</th><td class="table__cell--numeric">18</td></tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  `,
};

/**
 * 6. ZeroClassOrchestration
 * Demonstrates CSS scroll-state container query automatic drop shadows on sticky headers and columns.
 */
export const ZeroClassOrchestration: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: var(--spacing-24); max-inline-size: 52rem;">
      <div class="demo-card-callout" style="padding: var(--spacing-16); border: 1px dashed var(--border-color); border-radius: var(--radius-md); background: var(--surface-muted);">
        <p style="margin: 0; font-size: var(--typography-font-size--1); color: var(--foreground-muted);">
          <strong>Scroll-State Container Queries:</strong> <code>.table-container</code> specifies <code>container-type: scroll-state</code>. As soon as the user scrolls, <code>@container table-container scroll-state(scrollable: block-start)</code> dynamically projects an elevation drop shadow beneath the sticky header without requiring JavaScript scroll event listeners.
        </p>
      </div>

      <div class="table-container" tabindex="0" role="region" aria-label="Scroll state demo" style="max-block-size: 14rem; overflow: auto; border: 1px solid var(--border-color); border-radius: var(--radius-md);">
        <table class="table table--sticky-head table--striped">
          <thead>
            <tr><th scope="col">Component</th><th scope="col">Spec</th><th scope="col" class="table__cell--numeric">Status</th></tr>
          </thead>
          <tbody>
            <tr><th scope="row">Button</th><td>WCAG 2.2 AAA</td><td class="table__cell--numeric">Pass</td></tr>
            <tr><th scope="row">Dialog</th><td>WCAG 2.2 AA</td><td class="table__cell--numeric">Pass</td></tr>
            <tr><th scope="row">Card</th><td>WCAG 2.2 AA</td><td class="table__cell--numeric">Pass</td></tr>
            <tr><th scope="row">Table</th><td>WCAG 2.2 AAA</td><td class="table__cell--numeric">Pass</td></tr>
            <tr><th scope="row">Tabs</th><td>WCAG 2.2 AAA</td><td class="table__cell--numeric">Pass</td></tr>
            <tr><th scope="row">Popover</th><td>WCAG 2.2 AA</td><td class="table__cell--numeric">Pass</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
};

/**
 * 7. RealWorldRecipes
 * Production patterns: Card Flush Integration and Full Multi-Axis Sticky Table.
 */
export const RealWorldRecipes: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: var(--spacing-32); max-inline-size: 56rem;">
      
      <!-- Recipe 1: Seamless Card Integration -->
      <section style="display: flex; flex-direction: column; gap: var(--spacing-12);">
        <h4 class="small-heading">
          Recipe 1: Table inside Card (.card__body--flush)
        </h4>
        <div class="card card--bordered">
          <article class="card__content">
            <header class="card__header">
              <hgroup class="card__hgroup">
                <h3 class="card__title subheading">Quarterly Revenue Summary</h3>
                <p class="card__subtitle">Aggregated cloud subscription billings</p>
              </hgroup>
            </header>
            <div class="card__body card__body--flush">
              <div class="table-container" tabindex="0" role="region" aria-label="Card table">
                <table class="table table--striped table--hover">
                  <thead>
                    <tr>
                      <th scope="col">Product Tier</th>
                      <th scope="col">Active Tenants</th>
                      <th scope="col" class="table__cell--numeric">MRR</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">Enterprise Fleet</th>
                      <td>128</td>
                      <td class="table__cell--numeric">$128,000.00</td>
                    </tr>
                    <tr>
                      <th scope="row">Professional Team</th>
                      <td>412</td>
                      <td class="table__cell--numeric">$41,200.00</td>
                    </tr>
                    <tr>
                      <th scope="row">Starter Developer</th>
                      <td>1,050</td>
                      <td class="table__cell--numeric">$10,500.00</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <th scope="row">Grand Total</th>
                      <td>1,590</td>
                      <td class="table__cell--numeric">$179,700.00</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
            <footer class="card__footer" style="display: flex; justify-content: flex-end; gap: var(--spacing-8);">
              <button type="button" class="button button--subtle"><span>Export CSV</span></button>
              <button type="button" class="button button--strong button--accent"><span>Generate Invoice</span></button>
            </footer>
          </article>
        </div>
      </section>

      <!-- Recipe 2: Multi-Axis Sticky Financial Sheet -->
      <section style="display: flex; flex-direction: column; gap: var(--spacing-12);">
        <h4 class="small-heading">
          Recipe 2: Multi-Axis Pinned Spreadsheet Table
        </h4>
        <div class="table-container" tabindex="0" role="region" aria-label="Pinned spreadsheet" style="max-block-size: 18rem; overflow: auto; border: 1px solid var(--border-color); border-radius: var(--radius-md);">
          <table class="table table--sticky-head table--sticky-foot table--sticky-first-column table--sticky-last-column table--striped table--hover">
            <thead>
              <tr>
                <th scope="col" class="table__cell--fit">Account</th>
                <th scope="col" class="table__cell--long">Department</th>
                <th scope="col" class="table__cell--long">Cost Center</th>
                <th scope="col" class="table__cell--numeric">Q1</th>
                <th scope="col" class="table__cell--numeric">Q2</th>
                <th scope="col" class="table__cell--numeric">Q3</th>
                <th scope="col" class="table__cell--numeric">Q4</th>
                <th scope="col" class="table__cell--fit table__cell--center"><span class="visually-hidden">Action</span></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" class="table__cell--fit">Global Infra</th>
                <td class="table__cell--long">Engineering & DevOps</td>
                <td class="table__cell--long">CC-ENG-01</td>
                <td class="table__cell--numeric">$45,000</td>
                <td class="table__cell--numeric">$48,000</td>
                <td class="table__cell--numeric">$52,000</td>
                <td class="table__cell--numeric">$55,000</td>
                <td class="table__cell--fit table__cell--center">
                  <button type="button" class="button button--subtle button--sm"><span>Edit</span></button>
                </td>
              </tr>
              <tr>
                <th scope="row" class="table__cell--fit">Design Systems</th>
                <td class="table__cell--long">Product Experience</td>
                <td class="table__cell--long">CC-DS-04</td>
                <td class="table__cell--numeric">$18,000</td>
                <td class="table__cell--numeric">$19,500</td>
                <td class="table__cell--numeric">$21,000</td>
                <td class="table__cell--numeric">$22,500</td>
                <td class="table__cell--fit table__cell--center">
                  <button type="button" class="button button--subtle button--sm"><span>Edit</span></button>
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <th scope="row" class="table__cell--fit">Consolidated</th>
                <td colspan="2" class="table__cell--long">Total Operating Expenditure</td>
                <td class="table__cell--numeric">$63,000</td>
                <td class="table__cell--numeric">$67,500</td>
                <td class="table__cell--numeric">$73,000</td>
                <td class="table__cell--numeric">$77,500</td>
                <td class="table__cell--fit table__cell--center">
                  <span class="badge badge--success"><span>Closed</span></span>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </section>

    </div>
  `,
};

/**
 * 7. Token-Driven Column Sizing Helpers (`.table__col--*`)
 * Demonstrates tokenized column width classes (`.table__col--index`, `.table__col--sm`,
 * `.table__col--fill`, `.table__col--md`, `.table__col--actions`, `.table__col--num`) eliminating inline styles.
 */
export const ColumnSizing: Story = {
  render: () => `
    <div class="stack demo-constrained--lg gap-lg">
      <div class="table-container" tabindex="0" role="region" aria-label="Media asset queue with token column sizing">
        <table class="table table--striped table--hover">
          <caption class="table__caption">Media Broadcast Queue (Token-Driven Column Widths)</caption>
          <thead>
            <tr>
              <th scope="col" class="table__col--index"><span class="visually-hidden">Position</span>#</th>
              <th scope="col" class="table__col--sm">Time</th>
              <th scope="col" class="table__col--fill">Asset Title</th>
              <th scope="col" class="table__col--sm">Type</th>
              <th scope="col" class="table__col--sm table__col--num">Duration</th>
              <th scope="col" class="table__col--md">Status</th>
              <th scope="col" class="table__col--actions"><span class="visually-hidden">Actions</span></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="table__col--index text-muted">1</td>
              <td class="font-mono font-size-xs text-muted">10:45 AM</td>
              <td>
                <div class="stack gap-none">
                  <span class="font-size-sm font-weight-medium">Solaris Horizon</span>
                  <span class="font-size-xs text-muted">Aethelgard</span>
                </div>
              </td>
              <td><span class="chip chip--sm"><span>Music</span></span></td>
              <td class="table__col--num font-mono font-size-xs text-muted">03:52</td>
              <td><span class="badge badge--success badge--sm"><span>Live</span></span></td>
              <td class="table__col--actions">
                <button type="button" class="button button--subtle button--icon button--sm" aria-label="More actions">
                  <svg class="icon"><use href="#ChevronDown"/></svg>
                </button>
              </td>
            </tr>
            <tr>
              <td class="table__col--index text-muted">2</td>
              <td class="font-mono font-size-xs text-muted">10:49 AM</td>
              <td>
                <div class="stack gap-none">
                  <span class="font-size-sm font-weight-medium">Station ID: Neon Morning</span>
                  <span class="font-size-xs text-muted">WDFH Production</span>
                </div>
              </td>
              <td><span class="chip chip--sm"><span>Stager</span></span></td>
              <td class="table__col--num font-mono font-size-xs text-muted">00:15</td>
              <td><span class="badge badge--accent badge--sm"><span>Next</span></span></td>
              <td class="table__col--actions">
                <button type="button" class="button button--subtle button--icon button--sm" aria-label="More actions">
                  <svg class="icon"><use href="#ChevronDown"/></svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
};

