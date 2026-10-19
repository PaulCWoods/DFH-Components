import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Atoms/Link',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# Link & Block Link Primitives

Accessible inline hyperlinks and full-width block link callouts conforming to WCAG 2.2 Level AA / AAA standards (explicit typographic underlines, 4.5:1 / 7:1 contrast ratios, 48px touch targets, and external tab notifications).

---

### Canonical Semantic Markup Signatures

#### 1. Standard Inline Link
\`\`\`html
<a href="/guide" class="link">
  <span>Accessibility Standards</span>
</a>
\`\`\`

#### 2. External Link with Accessible Voice Disclaimer
\`\`\`html
<a href="https://www.w3.org" class="link" target="_blank" rel="noopener noreferrer">
  <span>W3C Guidelines</span>
  <span class="visually-hidden"> (opens in a new tab)</span>
  <svg class="icon icon--dir" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
    <polyline points="15 3 21 3 21 9"></polyline>
    <line x1="10" y1="14" x2="21" y2="3"></line>
  </svg>
</a>
\`\`\`

#### 3. Full-Width Block Link Callout
\`\`\`html
<a href="/case-studies/contrast" class="block-link">
  <span class="block-link__text">Color Contrast Beyond 4.5:1</span>
  <svg class="block-link__arrow icon icon--dir" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false">
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
</a>
\`\`\`

---

### WCAG 2.2 Conformance Matrix
| Criterion | Level | Status | Architectural Implementation |
| :--- | :--- | :--- | :--- |
| **1.4.1 Use of Color** | A | **Pass** | Never relies on color alone; renders persistent \`text-decoration-line: underline\` with \`0.25em\` offset clearance. |
| **1.4.3 Contrast (Minimum)** | AA (4.5:1) | **Pass** | Link color (\`--foreground-accent\`) satisfies >= 4.5:1 on light canvas and >= 7:1 (AAA) on dark surfaces. |
| **2.4.7 Focus Visible** | AA | **Pass** | High-contrast 2px focus ring with 2px offset applied on keyboard \`:focus-visible\`. |
| **2.4.13 Focus Appearance** | AAA | **Pass** | Focus indicator maintains 3:1 contrast against surrounding text and background. |
| **2.5.5 Target Size (Enhanced)** | AAA (48×48px) | **Pass** | Block links (\`.block-link\`) enforce minimum 48px touch clearance across entire card bounds. |
| **3.2.5 Change on Request** | AAA | **Pass** | External links opening new tabs include mandatory \`.visually-hidden\` \`(opens in a new tab)\` disclaimer. |
| **2.3.3 Reduced Motion** | AAA | **Pass** | Disables arrow sliding micro-interaction under \`prefers-reduced-motion: reduce\`. |

---

### CSS Custom Property Token Contract
| CSS Variable | Default Value | Fallback Ladder | Description |
| :--- | :--- | :--- | :--- |
| \`--_link-color\` | \`var(--link-color)\` | \`var(--foreground-accent, #008076)\` | Resting inline link text color |
| \`--_link-hover-color\` | \`var(--link-hover-color)\` | \`var(--foreground-accent-hover)\` | Hover link text color |
| \`--_link-underline-offset\` | \`var(--link-underline-offset)\` | \`0.25em\` | Underline baseline clearance distance |
| \`--_link-underline-thickness\` | \`var(--link-underline-thickness)\` | \`1px\` | Underline stroke thickness (expands to 2px in high contrast) |
| \`--_block-link-bg\` | \`var(--block-link-background-color)\` | \`transparent\` | Resting block link container background |
| \`--_block-link-hover-bg\` | \`var(--block-link-hover-background-color)\` | \`var(--surface-accent-strong)\` | Hover surface background fill |
| \`--_block-link-hover-color\` | \`var(--block-link-hover-color)\` | \`var(--foreground-inverted, #fff)\` | Inverted text color on hover fill |
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * 1. Playground
 * Interactive sandbox exploring inline links and block link callouts.
 */
export const Playground: Story = {
  args: {
    mode: 'inline',
    text: 'Explore the Design For Humans accessibility guidelines',
    isExternal: false,
    isSubtle: false,
  },
  argTypes: {
    mode: {
      name: 'Link Type',
      control: { type: 'inline-radio' },
      options: ['inline', 'block'],
      description: 'Standard inline text link vs full-width interactive block card.',
    },
    text: {
      name: 'Link Label',
      control: { type: 'text' },
    },
    isExternal: {
      name: 'External Link',
      control: { type: 'boolean' },
      description: 'Adds new tab target and accessible disclaimer.',
    },
    isSubtle: {
      name: 'Subtle Mode',
      control: { type: 'boolean' },
      description: 'Inherits surrounding text color at rest.',
    },
  },
  render: (args) => {
    if (args.mode === 'block') {
      return `
        <div style="max-inline-size: 36rem; margin-inline: auto;">
          <a href="#" class="block-link">
            <span class="block-link__text">${args.text}</span>
            <svg class="block-link__arrow icon icon--dir" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
        </div>
      `;
    }

    const classes = ['link', args.isSubtle ? 'link--subtle' : ''].filter(Boolean).join(' ');

    return `
      <div style="max-inline-size: 40rem; margin-inline: auto;">
        <p style="margin: 0; line-height: 1.6;">
          Accessible web architecture begins with web standards. 
          <a 
            href="#" 
            class="${classes}"
            ${args.isExternal ? 'target="_blank" rel="noopener noreferrer"' : ''}
          >
            <span>${args.text}</span>
            ${args.isExternal ? `
              <span class="visually-hidden"> (opens in a new tab)</span>
              <svg class="icon icon--dir" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false" style="vertical-align: middle; margin-inline-start: 4px;">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            ` : ''}
          </a> 
          to discover scalable token recipes and compliance automation.
        </p>
      </div>
    `;
  },
};

/**
 * 2. Anatomy
 * Exploded breakdown highlighting underline offsets, arrow micro-interaction anchors, and accessible disclaimers.
 */
export const Anatomy: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: var(--spacing-24); max-inline-size: 46rem;">
      <div class="demo-card-callout" style="padding: var(--spacing-16); border: 1px dashed var(--border-color); border-radius: var(--radius-md); background: var(--surface-muted);">
        <p style="margin: 0; font-size: var(--typography-font-size--1); color: var(--foreground-muted);">
          <strong>Structural Breakdown:</strong> <code>.link</code> enforces explicit underlines with <code>text-underline-offset: 0.25em</code> to ensure descenders never get severed. <code>.block-link</code> establishes a full 48px touch target with a micro-animated trailing arrow.
        </p>
      </div>

      <div style="display: flex; flex-direction: column; gap: var(--spacing-16); padding: var(--spacing-24); border: 2px dashed var(--color-accent); border-radius: var(--radius-md);">
        <div>
          <span class="badge badge--sm" style="display: inline-block; margin-block-end: var(--spacing-8);">
            <span>Inline Link Anatomy</span>
          </span>
          <p style="margin: 0;">
            Text copy with 
            <a href="#" class="link" style="outline: 1px dashed var(--color-success); outline-offset: 2px;">
              <span>&lt;a class="link"&gt; Underlined Anchor &lt;/a&gt;</span>
            </a> 
            demonstrating baseline clearance.
          </p>
        </div>

        <div style="margin-block-start: var(--spacing-12);">
          <span class="badge badge--sm" style="display: inline-block; margin-block-end: var(--spacing-8);">
            <span>Block Link Anatomy</span>
          </span>
          <a href="#" class="block-link" style="outline: 1px dashed var(--color-accent); outline-offset: 2px;">
            <span class="block-link__text">span.block-link__text</span>
            <svg class="block-link__arrow icon icon--dir" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false" style="outline: 1px dashed var(--color-warning);">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
        </div>
      </div>
    </div>
  `,
};

/**
 * 3. Variants
 * Visual gallery showcasing default, subtle, external, on-dark, and block link styles.
 */
export const Variants: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: var(--spacing-32); max-inline-size: 46rem;">
      
      <!-- Variant 1: Default Inline Link -->
      <div>
        <span style="font-size: var(--typography-font-size--1); color: var(--foreground-muted); display: block; margin-block-end: var(--spacing-8);">
          1. Standard Inline Link (.link)
        </span>
        <p style="margin: 0; line-height: 1.6;">
          Read our deep dive on <a href="#" class="link">Design Token Architecture</a> for modern design systems.
        </p>
      </div>

      <!-- Variant 2: External Link with Disclaimer -->
      <div>
        <span style="font-size: var(--typography-font-size--1); color: var(--foreground-muted); display: block; margin-block-end: var(--spacing-8);">
          2. External Link with Mandatory Speech Disclaimer
        </span>
        <p style="margin: 0; line-height: 1.6;">
          Review the official 
          <a href="https://www.w3.org" class="link" target="_blank" rel="noopener noreferrer">
            <span>W3C WCAG 2.2 Standard</span>
            <span class="visually-hidden"> (opens in a new tab)</span>
            <svg class="icon icon--dir" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false" style="vertical-align: middle; margin-inline-start: 4px;">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </a> 
          recommendations.
        </p>
      </div>

      <!-- Variant 3: Subtle Link -->
      <div>
        <span style="font-size: var(--typography-font-size--1); color: var(--foreground-muted); display: block; margin-block-end: var(--spacing-8);">
          3. Subtle Link (.link--subtle — inherits text color at rest)
        </span>
        <p style="margin: 0; line-height: 1.6; color: var(--foreground-muted);">
          Tags: <a href="#" class="link link--subtle">Web Standards</a> • <a href="#" class="link link--subtle">CSS Variables</a> • <a href="#" class="link link--subtle">A11y</a>
        </p>
      </div>

      <!-- Variant 4: Block Link Callout -->
      <div>
        <span style="font-size: var(--typography-font-size--1); color: var(--foreground-muted); display: block; margin-block-end: var(--spacing-8);">
          4. Block Link Callout (.block-link)
        </span>
        <a href="#" class="block-link">
          <span class="block-link__text">View Component Showcase & Live Previews</span>
          <svg class="block-link__arrow icon icon--dir" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </a>
      </div>

    </div>
  `,
};

/**
 * 4. StateMatrix
 * Covers resting, hover, active/pressed, keyboard focus-visible, and high contrast modes.
 */
export const StateMatrix: Story = {
  render: () => `
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(18rem, 100%), 1fr)); gap: var(--spacing-24); max-inline-size: 52rem;">
      
      <!-- Resting Link -->
      <div class="pd bd rd">
        <span style="font-size: var(--typography-font-size--1); color: var(--foreground-muted); display: block; margin-block-end: var(--spacing-8);">
          Resting State
        </span>
        <a href="#" class="link"><span>Resting Hyperlink</span></a>
      </div>

      <!-- Hover State -->
      <div class="pd bd rd">
        <span style="font-size: var(--typography-font-size--1); color: var(--foreground-muted); display: block; margin-block-end: var(--spacing-8);">
          Hover State
        </span>
        <a href="#" class="link" style="color: var(--foreground-accent-hover); text-decoration-color: currentColor;">
          <span>Hovered Hyperlink</span>
        </a>
      </div>

      <!-- Focus Visible State -->
      <div class="pd bd rd">
        <span style="font-size: var(--typography-font-size--1); color: var(--foreground-muted); display: block; margin-block-end: var(--spacing-8);">
          Keyboard Focus-Visible
        </span>
        <a href="#" class="link" style="outline: var(--focus-ring-width) solid var(--focus-ring-color); outline-offset: var(--focus-ring-offset);">
          <span>Focused Hyperlink</span>
        </a>
      </div>

      <!-- High Contrast Mode Simulation -->
      <div class="pd bd rd">
        <span style="font-size: var(--typography-font-size--1); color: var(--foreground-muted); display: block; margin-block-end: var(--spacing-8);">
          High Contrast Mode (2px Underline)
        </span>
        <a href="#" class="link" style="text-decoration-thickness: 2px; font-weight: bold;">
          <span>High Contrast Link</span>
        </a>
      </div>

      <!-- Block Link Resting -->
      <div class="pd bd rd">
        <span style="font-size: var(--typography-font-size--1); color: var(--foreground-muted); display: block; margin-block-end: var(--spacing-8);">
          Block Link Resting
        </span>
        <a href="#" class="block-link" style="padding: var(--spacing-8) var(--spacing-12);">
          <span class="block-link__text">Resting Block</span>
          <svg class="block-link__arrow icon icon--dir" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </a>
      </div>

      <!-- Block Link Hover -->
      <div class="pd bd rd">
        <span style="font-size: var(--typography-font-size--1); color: var(--foreground-muted); display: block; margin-block-end: var(--spacing-8);">
          Block Link Hover Fill
        </span>
        <a href="#" class="block-link" style="padding: var(--spacing-8) var(--spacing-12); background-color: var(--surface-accent-strong); color: var(--foreground-inverted); border-color: var(--surface-accent-strong);">
          <span class="block-link__text">Hovered Block</span>
          <svg class="block-link__arrow icon icon--dir" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false" style="transform: translateX(4px);"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </a>
      </div>

    </div>
  `,
};

/**
 * 5. SizesAndDensity
 * Compares standard typography inline sizing with block link 48px AAA touch targets.
 */
export const SizesAndDensity: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: var(--spacing-24); max-inline-size: 44rem;">
      
      <!-- Inline Text Scale -->
      <div>
        <span style="font-size: var(--typography-font-size--1); color: var(--foreground-muted); display: block; margin-block-end: var(--spacing-8);">
          Inline Typography Sizes (Scales proportionally with surrounding copy)
        </span>
        <div style="display: flex; flex-direction: column; gap: var(--spacing-12);">
          <p style="margin: 0; font-size: var(--typography-font-size-1);">
            Large step 1: <a href="#" class="link">Typography Scaling</a>
          </p>
          <p style="margin: 0; font-size: var(--typography-font-size-0);">
            Body base step 0: <a href="#" class="link">Standard Paragraph Link</a>
          </p>
          <p style="margin: 0; font-size: var(--typography-font-size--1);">
            Small step -1: <a href="#" class="link">Secondary Footnote Link</a>
          </p>
        </div>
      </div>

      <!-- Block Link 48px AAA Target -->
      <div>
        <span style="font-size: var(--typography-font-size--1); color: var(--foreground-muted); display: block; margin-block-end: var(--spacing-8);">
          Block Link (48px Touch Clearance — WCAG 2.5.5 AAA Target)
        </span>
        <a href="#" class="block-link">
          <span class="block-link__text">Full 48px AAA Touch Target</span>
          <svg class="block-link__arrow icon icon--dir" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </a>
      </div>

    </div>
  `,
};

/**
 * 6. ZeroClassOrchestration
 * Demonstrates smooth arrow translateX micro-interaction powered by CSS @property.
 */
export const ZeroClassOrchestration: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: var(--spacing-24); max-inline-size: 46rem;">
      <div class="demo-card-callout" style="padding: var(--spacing-16); border: 1px dashed var(--border-color); border-radius: var(--radius-md); background: var(--surface-muted);">
        <p style="margin: 0; font-size: var(--typography-font-size--1); color: var(--foreground-muted);">
          <strong>CSS @property Smooth Arrow Motion:</strong> <code>@property --_block-link-arrow-move-x</code> enables smooth hardware-accelerated translation of the trailing arrow without causing layout reflow or repaint stutter.
        </p>
      </div>

      <div>
        <span style="font-size: var(--typography-font-size--1); color: var(--foreground-muted); display: block; margin-block-end: var(--spacing-8);">
          Hover over the block link to inspect the smooth trailing arrow slide:
        </span>
        <a href="#" class="block-link">
          <span class="block-link__text">Interactive Arrow Slide Preview</span>
          <svg class="block-link__arrow icon icon--dir" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </a>
      </div>
    </div>
  `,
};

/**
 * 7. RealWorldRecipes
 * Production patterns: Editorial Article Prose and Topic Directory List.
 */
export const RealWorldRecipes: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: var(--spacing-32); max-inline-size: 52rem;">
      
      <!-- Recipe 1: Long-Form Editorial Prose -->
      <section style="display: flex; flex-direction: column; gap: var(--spacing-16);">
        <h4 style="font-size: var(--typography-font-size-1); margin: 0;">
          Recipe 1: Long-Form Editorial Prose with Inline & External Links
        </h4>
        <div class="card card--bordered" style="padding: var(--spacing-24);">
          <p style="margin: 0 0 var(--spacing-16); line-height: 1.7;">
            When designing user interfaces for humans, adhering to <a href="#standards" class="link">WCAG 2.2 Level AA and AAA criteria</a> is not optional. Ensuring that every hyperlink includes an explicit underline prevents colorblind users from missing interactive entry points.
          </p>
          <p style="margin: 0; line-height: 1.7;">
            For comprehensive technical definitions, refer to the <a href="https://w3.org" class="link" target="_blank" rel="noopener noreferrer"><span>W3C Conformance Specification</span><span class="visually-hidden"> (opens in a new tab)</span><svg class="icon icon--dir" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false" style="vertical-align: middle; margin-inline-start: 4px;"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg></a> or explore our <a href="#tokens" class="link link--subtle">design token documentation</a>.
          </p>
        </div>
      </section>

      <!-- Recipe 2: Blog Topic Resource Directory -->
      <section style="display: flex; flex-direction: column; gap: var(--spacing-16);">
        <h4 style="font-size: var(--typography-font-size-1); margin: 0;">
          Recipe 2: Category / Resource Directory (Canonical DFH Blog Pattern)
        </h4>
        <ul style="list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: var(--spacing-8);">
          <li>
            <a href="#contrast" class="block-link">
              <span class="block-link__text">Beyond 4.5:1: Contrast Engineering for Dark Modes</span>
              <svg class="block-link__arrow icon icon--dir" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
          </li>
          <li>
            <a href="#tokens" class="block-link">
              <span class="block-link__text">DTCG 3-Tier Design Tokens Synchronized to Figma</span>
              <svg class="block-link__arrow icon icon--dir" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
          </li>
          <li>
            <a href="#invokers" class="block-link">
              <span class="block-link__text">Zero-JS Native Popovers &amp; Declarative Invokers</span>
              <svg class="block-link__arrow icon icon--dir" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
          </li>
        </ul>
      </section>

    </div>
  `,
};
