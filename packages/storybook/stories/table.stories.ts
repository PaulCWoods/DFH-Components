import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Components/Table',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
**Table Primitive** provides accessible, responsive, token-driven tabular data layout adhering strictly to WCAG 2.2 standards.

### Canonical Markup Signature
\`\`\`html
<div class="table-container" tabindex="0" role="region" aria-label="Quarterly Financial Summary">
  <table class="table">
    <caption class="table__caption">Quarterly Financial Summary</caption>
    <thead>
      <tr>
        <th scope="col">Category</th>
        <th scope="col" class="table__cell--numeric">Q1</th>
        <th scope="col" class="table__cell--numeric">Q2</th>
        <th scope="col" class="table__cell--numeric">Total</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">Enterprise Revenue</th>
        <td class="table__cell--numeric">$124,500</td>
        <td class="table__cell--numeric">$148,200</td>
        <td class="table__cell--numeric">$272,700</td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <th scope="row">Total</th>
        <td class="table__cell--numeric">$124,500</td>
        <td class="table__cell--numeric">$148,200</td>
        <td class="table__cell--numeric">$272,700</td>
      </tr>
    </tfoot>
  </table>
</div>
\`\`\`

### Accessibility & Architectural Highlights
- **Keyboard-Accessible Responsive Scrolling (WCAG 2.1.1 & 1.4.10)**: The \`.table-container\` wrapper uses \`tabindex="0"\` and \`role="region"\` with an \`aria-label\` so keyboard and screen reader users can scroll wide tables without losing context.
- **Scroll-State Container Queries**: Uses modern \`container-type: scroll-state\` on \`.table-container\` to dynamically project directional depth shadows when sticky headers, footers, or columns are scrolled.
- **Explicit Header Association (WCAG 1.3.1)**: Uses \`scope="col"\` for column headers and \`scope="row"\` for row headers.
- **Tabular Numeric Alignment**: \`.table__cell--numeric\` applies \`font-variant-numeric: tabular-nums lining-nums;\` ensuring aligned decimal places.
- **Shrink-Wrapping & No-Wrap Cell Utilities**: \`.table__cell--fit\` shrink-wraps columns to exact content width; \`.table__cell--long\` prevents undesired wrapping on critical text.
- **Composable Card Integration**: Tables compose seamlessly inside the \`.card\` primitive without needing ad-hoc container classes.
- **Zero-Specificity Integration**: Styled with \`:where()\` for effortless utility and modifier overrides.
- **High-Contrast Support**: Automatically increases border contrast and removes transparent fades in \`@media (prefers-contrast: more)\`.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * 1. Default Accessible Table
 * Standard data table with caption, thead, tbody, tfoot, and numeric alignments.
 */
export const Default: Story = {
  render: () => `
    <div class="wrapper wrapper--2xl">
      <div class="table-container" tabindex="0" role="region" aria-label="Web Accessibility Compliance Audit 2026">
        <table class="table">
          <caption class="table__caption">WCAG 2.2 Conformance Audit Results (Q3 2026)</caption>
          <thead>
            <tr>
              <th scope="col">Component</th>
              <th scope="col">WCAG Criterion</th>
              <th scope="col">Level</th>
              <th scope="col">Status</th>
              <th scope="col" class="table__cell--numeric">Score</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Modal Dialog</th>
              <td>2.1.2 No Keyboard Trap</td>
              <td><span class="badge"><span>Level A</span></span></td>
              <td><span class="badge badge--success"><span>Passed</span></span></td>
              <td class="table__cell--numeric">100%</td>
            </tr>
            <tr>
              <th scope="row">Color System</th>
              <td>1.4.3 Contrast (Minimum)</td>
              <td><span class="badge"><span>Level AA</span></span></td>
              <td><span class="badge badge--success"><span>Passed</span></span></td>
              <td class="table__cell--numeric">100%</td>
            </tr>
            <tr>
              <th scope="row">Touch Targets</th>
              <td>2.5.8 Target Size (Minimum)</td>
              <td><span class="badge"><span>Level AA</span></span></td>
              <td><span class="badge badge--success"><span>Passed</span></span></td>
              <td class="table__cell--numeric">98.4%</td>
            </tr>
            <tr>
              <th scope="row">High Contrast</th>
              <td>1.4.6 Contrast (Enhanced)</td>
              <td><span class="badge badge--accent"><span>Level AAA</span></span></td>
              <td><span class="badge badge--warning"><span>Review</span></span></td>
              <td class="table__cell--numeric">92.0%</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th scope="row" colspan="4">Average Compliance Score</th>
              <td class="table__cell--numeric">97.6%</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  `,
};

/**
 * 2. Composed inside Card (.card)
 * Wrapped inside a .card container showcasing composable design tokens.
 */
export const InsideCard: Story = {
  render: () => `
    <div class="wrapper wrapper--2xl">
      <div class="card">
        <article class="card__content">
          <header class="card__header">
            <hgroup class="card__hgroup">
              <h3 class="card__title">Design Token Scale Factors</h3>
              <p class="card__subtitle">Fluid calculations across mobile and desktop viewports</p>
            </hgroup>
          </header>
          <div class="card__body card__body--flush">
            <div class="table-container" tabindex="0" role="region" aria-label="Design Token Scales" style="margin-block-end: 0;">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">Token Name</th>
                    <th scope="col">CSS Custom Property</th>
                    <th scope="col">Mobile Value</th>
                    <th scope="col">Desktop Value</th>
                    <th scope="col" class="table__cell--numeric">Factor</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row"><code>spacing.fluid</code></th>
                    <td><code>--spacing-fluid</code></td>
                    <td>16px (1rem)</td>
                    <td>21.33px</td>
                    <td class="table__cell--numeric">1.333×</td>
                  </tr>
                  <tr>
                    <th scope="row"><code>spacing.fluid-x2</code></th>
                    <td><code>--spacing-fluid-x2</code></td>
                    <td>16px (1rem)</td>
                    <td>28.44px</td>
                    <td class="table__cell--numeric">1.778×</td>
                  </tr>
                  <tr>
                    <th scope="row"><code>spacing.fluid-x3</code></th>
                    <td><code>--spacing-fluid-x3</code></td>
                    <td>16px (1rem)</td>
                    <td>37.93px</td>
                    <td class="table__cell--numeric">2.370×</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </article>
      </div>
    </div>
  `,
};

/**
 * 3. Striped / Zebra Rows (.table--striped)
 * Alternating row backgrounds for scannability across large tables.
 */
export const StripedRows: Story = {
  render: () => `
    <div class="wrapper wrapper--2xl">
      <div class="table-container" tabindex="0" role="region" aria-label="Subscriber Directory">
        <table class="table table--striped table--hover">
          <caption class="table__caption">Organization Subscriber Directory</caption>
          <thead>
            <tr>
              <th scope="col">Subscriber</th>
              <th scope="col">Organization</th>
              <th scope="col">Plan</th>
              <th scope="col" class="table__cell--numeric">Members</th>
              <th scope="col" class="table__cell--numeric">Monthly MRR</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Paul Woods</th>
              <td>Design For Humans</td>
              <td><span class="badge badge--accent"><span>Enterprise</span></span></td>
              <td class="table__cell--numeric">48</td>
              <td class="table__cell--numeric">$2,400.00</td>
            </tr>
            <tr>
              <th scope="row">Sarah Jenkins</th>
              <td>Standard Web Labs</td>
              <td><span class="badge"><span>Pro</span></span></td>
              <td class="table__cell--numeric">12</td>
              <td class="table__cell--numeric">$600.00</td>
            </tr>
            <tr>
              <th scope="row">Marcus Vance</th>
              <td>A11y Alliance</td>
              <td><span class="badge badge--accent"><span>Enterprise</span></span></td>
              <td class="table__cell--numeric">95</td>
              <td class="table__cell--numeric">$4,750.00</td>
            </tr>
            <tr>
              <th scope="row">Elena Rostova</th>
              <td>Open Source Collective</td>
              <td><span class="badge"><span>Team</span></span></td>
              <td class="table__cell--numeric">6</td>
              <td class="table__cell--numeric">$300.00</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
};



/**
 * 4. Compact Density (.table--compact)
 * Tighter cell padding for data-dense dashboards and administrative tools.
 */
export const CompactDensity: Story = {
  render: () => `
    <div class="wrapper wrapper--2xl">
      <div class="table-container" tabindex="0" role="region" aria-label="Component Status Matrix">
        <table class="table table--compact table--hover">
          <caption class="table__caption">Design System Component Status Matrix</caption>
          <thead>
            <tr>
              <th scope="col">Component</th>
              <th scope="col">Tier</th>
              <th scope="col">Figma Export</th>
              <th scope="col">WCAG Target</th>
              <th scope="col" class="table__cell--numeric">CSS Size</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Button</th>
              <td>Tier 3</td>
              <td><span class="badge badge--success badge--round"><span>Synced</span></span></td>
              <td>Level AAA</td>
              <td class="table__cell--numeric">8.6 kB</td>
            </tr>
            <tr>
              <th scope="row">Dialog</th>
              <td>Tier 3</td>
              <td><span class="badge badge--success badge--round"><span>Synced</span></span></td>
              <td>Level AAA</td>
              <td class="table__cell--numeric">3.2 kB</td>
            </tr>
            <tr>
              <th scope="row">Card</th>
              <td>Tier 3</td>
              <td><span class="badge badge--success badge--round"><span>Synced</span></span></td>
              <td>Level AA</td>
              <td class="table__cell--numeric">16.5 kB</td>
            </tr>
            <tr>
              <th scope="row">Banner</th>
              <td>Tier 3</td>
              <td><span class="badge badge--success badge--round"><span>Synced</span></span></td>
              <td>Level AA</td>
              <td class="table__cell--numeric">5.5 kB</td>
            </tr>
            <tr>
              <th scope="row">Table</th>
              <td>Tier 3</td>
              <td><span class="badge badge--accent badge--round"><span>Active</span></span></td>
              <td>Level AAA</td>
              <td class="table__cell--numeric">4.2 kB</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
};

/**
 * 5. Simple Table (.table--simple)
 * Clean, borderless table design for data that doesn't require heavy visual grouping.
 */

export const SimpleTable: Story = {
  render: () => `
    <div style="font-family: var(--body-font-family);">
      <div class="table-container" tabindex="0" role="region" aria-label="Component Status Matrix">
        <table class="table table--simple">
          <caption class="table__caption">Design System Component Status Matrix</caption>
          <thead>
            <tr>
              <th scope="col">Component</th>
              <th scope="col">Tier</th>
              <th scope="col">Figma Export</th>
              <th scope="col">WCAG Target</th>
              <th scope="col" class="table__cell--numeric">CSS Size</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Button</th>
              <td>Tier 3</td>
              <td><span class="badge badge--success badge--round"><span>Synced</span></span></td>
              <td>Level AAA</td>
              <td class="table__cell--numeric">8.6 kB</td>
            </tr>
            <tr>
              <th scope="row">Dialog</th>
              <td>Tier 3</td>
              <td><span class="badge badge--success badge--round"><span>Synced</span></span></td>
              <td>Level AAA</td>
              <td class="table__cell--numeric">3.2 kB</td>
            </tr>
            <tr>
              <th scope="row">Card</th>
              <td>Tier 3</td>
              <td><span class="badge badge--success badge--round"><span>Synced</span></span></td>
              <td>Level AA</td>
              <td class="table__cell--numeric">16.5 kB</td>
            </tr>
            <tr>
              <th scope="row">Banner</th>
              <td>Tier 3</td>
              <td><span class="badge badge--success badge--round"><span>Synced</span></span></td>
              <td>Level AA</td>
              <td class="table__cell--numeric">5.5 kB</td>
            </tr>
            <tr>
              <th scope="row">Table</th>
              <td>Tier 3</td>
              <td><span class="badge badge--accent badge--round"><span>Active</span></span></td>
              <td>Level AAA</td>
              <td class="table__cell--numeric">4.2 kB</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
};

/**
 * 6. Long Headings (.table--head-cells-long)
 * Heading cells don't wrap.
 */
export const LongColumnNames: Story = {
  render: () => `
    <div style="font-family: var(--body-font-family);">
      <div class="table-container" tabindex="0" role="region" aria-label="Component Status Matrix">
        <table class="table table--head-cells-long">
          <caption class="table__caption">Design System Component Status Matrix</caption>
          <thead>
            <tr>
              <th scope="col">Component Full Name</th>
              <th scope="col">Tier</th>
              <th scope="col">Figma Export Status </th>
              <th scope="col">WCAG Target</th>
              <th scope="col" class="table__cell--numeric">CSS Size</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Button</th>
              <td>Tier 3</td>
              <td><span class="badge badge--success badge--round"><span>Synced</span></span></td>
              <td>Level AAA</td>
              <td class="table__cell--numeric">8.6 kB</td>
            </tr>
            <tr>
              <th scope="row">Dialog</th>
              <td>Tier 3</td>
              <td><span class="badge badge--success badge--round"><span>Synced</span></span></td>
              <td>Level AAA</td>
              <td class="table__cell--numeric">3.2 kB</td>
            </tr>
            <tr>
              <th scope="row">Card</th>
              <td>Tier 3</td>
              <td><span class="badge badge--success badge--round"><span>Synced</span></span></td>
              <td>Level AA</td>
              <td class="table__cell--numeric">16.5 kB</td>
            </tr>
            <tr>
              <th scope="row">Banner</th>
              <td>Tier 3</td>
              <td><span class="badge badge--success badge--round"><span>Synced</span></span></td>
              <td>Level AA</td>
              <td class="table__cell--numeric">5.5 kB</td>
            </tr>
            <tr>
              <th scope="row">Table</th>
              <td>Tier 3</td>
              <td><span class="badge badge--accent badge--round"><span>Active</span></span></td>
              <td>Level AAA</td>
              <td class="table__cell--numeric">4.2 kB</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
};

/**
 * 6. Bordered Grid (.table--bordered)
 * Full horizontal and vertical divider lines for complex financial sheets.
 */
export const BorderedGrid: Story = {
  render: () => `
    <div class="wrapper wrapper--2xl">
      <div class="table-container" tabindex="0" role="region" aria-label="Financial Matrix">
        <table class="table table--bordered">
          <caption class="table__caption">Fiscal Performance Matrix 2026</caption>
          <thead>
            <tr>
              <th scope="col">Region</th>
              <th scope="col" class="table__cell--numeric">Q1 Target</th>
              <th scope="col" class="table__cell--numeric">Q1 Actual</th>
              <th scope="col" class="table__cell--numeric">Q2 Target</th>
              <th scope="col" class="table__cell--numeric">Q2 Actual</th>
              <th scope="col" class="table__cell--center">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">North America</th>
              <td class="table__cell--numeric">$500,000</td>
              <td class="table__cell--numeric">$540,200</td>
              <td class="table__cell--numeric">$520,000</td>
              <td class="table__cell--numeric">$565,100</td>
              <td class="table__cell--center"><span class="badge badge--success"><span>Ahead</span></span></td>
            </tr>
            <tr>
              <th scope="row">Europe & UK</th>
              <td class="table__cell--numeric">$400,000</td>
              <td class="table__cell--numeric">$415,800</td>
              <td class="table__cell--numeric">$420,000</td>
              <td class="table__cell--numeric">$430,400</td>
              <td class="table__cell--center"><span class="badge badge--success"><span>Ahead</span></span></td>
            </tr>
            <tr>
              <th scope="row">Asia Pacific</th>
              <td class="table__cell--numeric">$300,000</td>
              <td class="table__cell--numeric">$290,100</td>
              <td class="table__cell--numeric">$320,000</td>
              <td class="table__cell--numeric">$315,900</td>
              <td class="table__cell--center"><span class="badge badge--warning"><span>On Track</span></span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
};

/**
 * 7. Sortable Headers (.table__sort-button)
 * Interactive column headers with direction indicator icons and aria-sort.
 */
export const SortableHeaders: Story = {
  render: () => `
    <div class="wrapper wrapper--2xl">
      <div class="table-container" tabindex="0" role="region" aria-label="Sortable Repository List">
        <table class="table table--hover">
          <caption class="table__caption">Sortable Design System Packages</caption>
          <thead>
            <tr>
              <th scope="col">
                <button type="button" class="table__sort-button" aria-sort="ascending" aria-label="Sort by package name">
                  <span>Package</span>
                  <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
              </th>
              <th scope="col">
                <button type="button" class="table__sort-button" aria-label="Sort by version">
                  <span>Version</span>
                  <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
              </th>
              <th scope="col" class="table__cell--numeric">
                <button type="button" class="table__sort-button" aria-sort="descending" aria-label="Sort by weekly downloads">
                  <span>Downloads</span>
                  <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
              </th>
              <th scope="col" class="table__cell--center">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row"><code>@design-for-humans/css</code></th>
              <td>v1.4.2</td>
              <td class="table__cell--numeric">14,280</td>
              <td class="table__cell--center">
                <button type="button" class="button button--subtle button--sm">
                  <span>Inspect</span>
                </button>
              </td>
            </tr>
            <tr>
              <th scope="row"><code>@design-for-humans/tokens</code></th>
              <td>v2.1.0</td>
              <td class="table__cell--numeric">28,950</td>
              <td class="table__cell--center">
                <button type="button" class="button button--subtle button--sm">
                  <span>Inspect</span>
                </button>
              </td>
            </tr>
            <tr>
              <th scope="row"><code>@design-for-humans/figma-sync</code></th>
              <td>v1.0.8</td>
              <td class="table__cell--numeric">8,410</td>
              <td class="table__cell--center">
                <button type="button" class="button button--subtle button--sm">
                  <span>Inspect</span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
};

/**
 * 8. Full Sticky Matrix (Header, Footer, First & Last Columns with Shadows)
 * Demonstrates simultaneous multi-axis pinning (.table--sticky-head, .table--sticky-foot, .table--sticky-first-column, .table--sticky-last-column)
 * with .table__cell--fit and .table__cell--long.
 */
export const FullStickyMatrix: Story = {
  render: () => `
    <div class="wrapper wrapper--xl">
      <p class="small-text" style="margin-block-end: var(--spacing-8); color: var(--foreground-muted);">
        Scroll horizontally and vertically. Headers, footers, row labels, and action columns remain pinned with depth border shadows.
      </p>
      <div 
        class="table-container" 
        tabindex="0" 
        role="region" 
        aria-label="Full Sticky Matrix Audit"
        style="max-block-size: 20rem; max-inline-size: 100%; overflow: auto;"
      >
        <table class="table table--sticky-head table--sticky-foot table--sticky-first-column table--sticky-last-column table--striped table--hover">
          <caption class="table__caption">
            WCAG 2.2 Conformance Audit Results (Full Sticky Matrix)
          </caption>
          <thead>
            <tr>
              <th scope="col" class="table__cell--fit">Component</th>
              <th scope="col">WCAG Criterion</th>
              <th scope="col">Description</th>
              <th scope="col" class="table__cell--fit">Level</th>
              <th scope="col" class="table__cell--fit">Status</th>
              <th scope="col" class="table__cell--numeric table__cell--fit">Score</th>
              <th scope="col" class="table__cell--fit table__cell--center">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row" class="table__cell--fit">Modal Dialog</th>
              <td class="table__cell--long">2.1.2 No Keyboard Trap</td>
              <td class="table__cell--long">Modal dialogs must not trap keyboard focus when cycling elements.</td>
              <td class="table__cell--fit"><span class="badge"><span>Level A</span></span></td>
              <td class="table__cell--fit"><span class="badge badge--success"><span>Passed</span></span></td>
              <td class="table__cell--numeric table__cell--fit">100%</td>
              <td class="table__cell--fit table__cell--center">
                <button type="button" class="button button--subtle button--sm"><span>Inspect</span></button>
              </td>
            </tr>
            <tr>
              <th scope="row" class="table__cell--fit">Color System</th>
              <td class="table__cell--long">1.4.3 Contrast (Minimum)</td>
              <td class="table__cell--long">Text and interactive elements must have sufficient contrast.</td>
              <td class="table__cell--fit"><span class="badge"><span>Level AA</span></span></td>
              <td class="table__cell--fit"><span class="badge badge--success"><span>Passed</span></span></td>
              <td class="table__cell--numeric table__cell--fit">100%</td>
              <td class="table__cell--fit table__cell--center">
                <button type="button" class="button button--subtle button--sm"><span>Inspect</span></button>
              </td>
            </tr>
            <tr>
              <th scope="row" class="table__cell--fit">Touch Targets</th>
              <td class="table__cell--long">2.5.8 Target Size (Minimum)</td>
              <td class="table__cell--long">Interactive touch targets must meet minimum size requirements.</td>
              <td class="table__cell--fit"><span class="badge"><span>Level AA</span></span></td>
              <td class="table__cell--fit"><span class="badge badge--success"><span>Passed</span></span></td>
              <td class="table__cell--numeric table__cell--fit">98%</td>
              <td class="table__cell--fit table__cell--center">
                <button type="button" class="button button--subtle button--sm"><span>Inspect</span></button>
              </td>
            </tr>
            <tr>
              <th scope="row" class="table__cell--fit">High Contrast</th>
              <td class="table__cell--long">1.4.6 Contrast (Enhanced)</td>
              <td class="table__cell--long">High contrast mode must provide enhanced contrast for all controls.</td>
              <td class="table__cell--fit"><span class="badge badge--accent"><span>Level AAA</span></span></td>
              <td class="table__cell--fit"><span class="badge badge--warning"><span>Review</span></span></td>
              <td class="table__cell--numeric table__cell--fit">92%</td>
              <td class="table__cell--fit table__cell--center">
                <button type="button" class="button button--subtle button--sm"><span>Inspect</span></button>
              </td>
            </tr>
            <tr>
              <th scope="row" class="table__cell--fit">Focus Visible</th>
              <td class="table__cell--long">2.4.7 Focus Visible</td>
              <td class="table__cell--long">Any keyboard-operable interface has a visible keyboard focus indicator.</td>
              <td class="table__cell--fit"><span class="badge"><span>Level AA</span></span></td>
              <td class="table__cell--fit"><span class="badge badge--success"><span>Passed</span></span></td>
              <td class="table__cell--numeric table__cell--fit">100%</td>
              <td class="table__cell--fit table__cell--center">
                <button type="button" class="button button--subtle button--sm"><span>Inspect</span></button>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th scope="row" class="table__cell--fit">Total Summary</th>
              <td colspan="4" class="table__cell--long">Average overall conformance rate across audited components</td>
              <td class="table__cell--numeric table__cell--fit">97.6%</td>
              <td class="table__cell--fit table__cell--center">
                <span class="badge badge--success"><span>Approved</span></span>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  `,
};

/**
 * 9. Combined Styles Table
 * Demonstrates the use of multiple table styles combined.
 */
export const CombinedStyles: Story = {
  render: () => `
    <div class="wrapper wrapper--xl">
      <p class="small-text" style="margin-block-end: var(--spacing-8); color: var(--foreground-muted);">
        Scroll horizontally and vertically. Headers, footers, row labels, and action columns remain pinned with depth border shadows.
      </p>
      <div 
        class="table-container" 
        tabindex="0" 
        role="region" 
        aria-label="Full Sticky Matrix Audit"
        style="max-block-size: 20rem; max-inline-size: 100%; overflow: auto;"
      >
        <table class="table table--sticky-head table--sticky-foot table--sticky-first-column table--sticky-last-column table--compact table--bordered table--striped table--hover">
          <caption class="table__caption">
            WCAG 2.2 Conformance Audit Results (Full Sticky Matrix)
          </caption>
          <thead>
            <tr>
              <th scope="col" class="table__cell--fit">Component</th>
              <th scope="col">WCAG Criterion</th>
              <th scope="col">Description</th>
              <th scope="col" class="table__cell--fit">Level</th>
              <th scope="col" class="table__cell--fit">Status</th>
              <th scope="col" class="table__cell--numeric table__cell--fit">Score</th>
              <th scope="col" class="table__cell--fit table__cell--center">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row" class="table__cell--fit">Modal Dialog</th>
              <td class="table__cell--long">2.1.2 No Keyboard Trap</td>
              <td class="table__cell--long">Modal dialogs must not trap keyboard focus when cycling elements.</td>
              <td class="table__cell--fit"><span class="badge"><span>Level A</span></span></td>
              <td class="table__cell--fit"><span class="badge badge--success"><span>Passed</span></span></td>
              <td class="table__cell--numeric table__cell--fit">100%</td>
              <td class="table__cell--fit table__cell--center">
                <button type="button" class="button button--subtle button--sm"><span>Inspect</span></button>
              </td>
            </tr>
            <tr>
              <th scope="row" class="table__cell--fit">Color System</th>
              <td class="table__cell--long">1.4.3 Contrast (Minimum)</td>
              <td class="table__cell--long">Text and interactive elements must have sufficient contrast.</td>
              <td class="table__cell--fit"><span class="badge"><span>Level AA</span></span></td>
              <td class="table__cell--fit"><span class="badge badge--success"><span>Passed</span></span></td>
              <td class="table__cell--numeric table__cell--fit">100%</td>
              <td class="table__cell--fit table__cell--center">
                <button type="button" class="button button--subtle button--sm"><span>Inspect</span></button>
              </td>
            </tr>
            <tr>
              <th scope="row" class="table__cell--fit">Touch Targets</th>
              <td class="table__cell--long">2.5.8 Target Size (Minimum)</td>
              <td class="table__cell--long">Interactive touch targets must meet minimum size requirements.</td>
              <td class="table__cell--fit"><span class="badge"><span>Level AA</span></span></td>
              <td class="table__cell--fit"><span class="badge badge--success"><span>Passed</span></span></td>
              <td class="table__cell--numeric table__cell--fit">98%</td>
              <td class="table__cell--fit table__cell--center">
                <button type="button" class="button button--subtle button--sm"><span>Inspect</span></button>
              </td>
            </tr>
            <tr>
              <th scope="row" class="table__cell--fit">High Contrast</th>
              <td class="table__cell--long">1.4.6 Contrast (Enhanced)</td>
              <td class="table__cell--long">High contrast mode must provide enhanced contrast for all controls.</td>
              <td class="table__cell--fit"><span class="badge badge--accent"><span>Level AAA</span></span></td>
              <td class="table__cell--fit"><span class="badge badge--warning"><span>Review</span></span></td>
              <td class="table__cell--numeric table__cell--fit">92%</td>
              <td class="table__cell--fit table__cell--center">
                <button type="button" class="button button--subtle button--sm"><span>Inspect</span></button>
              </td>
            </tr>
            <tr>
              <th scope="row" class="table__cell--fit">Focus Visible</th>
              <td class="table__cell--long">2.4.7 Focus Visible</td>
              <td class="table__cell--long">Any keyboard-operable interface has a visible keyboard focus indicator.</td>
              <td class="table__cell--fit"><span class="badge"><span>Level AA</span></span></td>
              <td class="table__cell--fit"><span class="badge badge--success"><span>Passed</span></span></td>
              <td class="table__cell--numeric table__cell--fit">100%</td>
              <td class="table__cell--fit table__cell--center">
                <button type="button" class="button button--subtle button--sm"><span>Inspect</span></button>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th scope="row" class="table__cell--fit">Total Summary</th>
              <td colspan="4" class="table__cell--long">Average overall conformance rate across audited components</td>
              <td class="table__cell--numeric table__cell--fit">97.6%</td>
              <td class="table__cell--fit table__cell--center">
                <span class="badge badge--success"><span>Approved</span></span>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  `,
};
