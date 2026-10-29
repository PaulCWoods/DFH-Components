import type { Meta, StoryObj } from '@storybook/html';

interface AccordionArgs {
  summary: string;
  content: string;
  open?: boolean;
  variant?: 'default' | 'plain' | 'flush' | 'transparent';
  noIcon?: boolean;
}

const meta: Meta<AccordionArgs> = {
  title: 'Organisms/Accordion',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
### Developer & Designer Notes: Accordion Primitive

The **Accordion** primitive provides accessible disclosure and expandable content sections powered by native HTML \`<details>\` and \`<summary>\` elements.
Features smooth zero-JS height animations using modern CSS \`interpolate-size: allow-keywords\` and \`::details-content\`, exclusive grouping via native \`name="..."\` attributes, orthogonal pseudo-element indicator icons, and style container queries.

---

#### 1. Canonical Semantic Markup Signatures
AI agents and developers MUST strictly use the following semantic patterns:

\`\`\`html
<!-- Standalone Disclosure -->
<details class="accordion">
  <summary>Section Title</summary>
  <p>Collapsible disclosure body copy.</p>
</details>

<!-- Native Exclusive Group (Zero-JS: only one open at a time) -->
<div class="accordion-group">
  <details class="accordion" name="faq-group" open>
    <summary>First Question</summary>
    <p>Answer to the first question.</p>
  </details>
  <details class="accordion" name="faq-group">
    <summary>Second Question</summary>
    <p>Answer to the second question.</p>
  </details>
</div>

<!-- Borderless & Flush Variations -->
<details class="accordion accordion--plain">
  <summary>Plain Accordion</summary>
  <p>Borderless disclosure content.</p>
</details>

<details class="accordion accordion--flush">
  <summary>Flush Accordion</summary>
  <p>Edge-to-edge content without inline padding.</p>
</details>

<!-- Opt-Out: Accordion Without Indicator Icon -->
<details class="accordion accordion--no-icon">
  <summary>Clean Header Without Plus/Minus</summary>
  <p>Content without orthogonal icon pseudo-elements.</p>
</details>
\`\`\`

---

#### 2. WCAG 2.2 Conformance Matrix

| Criterion | Level | Implementation Strategy |
| :--- | :---: | :--- |
| **2.1.1 Keyboard Accessibility** | **A** | Native \`<summary>\` handles Space and Enter keys out of the box with zero JavaScript listeners. |
| **4.1.2 Name, Role, Value** | **A** | Native browser accessibility tree automatically announces disclosure role and \`expanded: true/false\` states. |
| **2.4.7 / 2.4.13 Focus Visible** | **AA/AAA** | Container receives high-contrast focus ring via \`:has(summary:focus-visible)\` with configurable offset. |
| **2.5.5 / 2.5.8 Target Size** | **AA/AAA** | The entire \`<summary>\` bar functions as a full-width interactive tap target exceeding 48px baseline height. |
| **Modern Animation Standards** | **Standard** | Uses CSS \`interpolate-size: allow-keywords\` on \`::details-content\` to animate between \`0\` and \`auto\` height smoothly. |

---

#### 3. CSS Custom Property Contract Table

| Custom Property | Fallback | Intended Purpose |
| :--- | :--- | :--- |
| \`--accordion-bg\` | \`transparent\` | Resting background canvas fill |
| \`--accordion-open-bg\` | \`--surface-card\` (\`transparent\`) | Background canvas fill when open |
| \`--accordion-border-width\` | \`--panel-border-width\` (1px) | Outer border stroke thickness |
| \`--accordion-border-color\` | \`--panel-border-color\` (\`currentColor\`) | Outer border stroke color |
| \`--accordion-padding\` | \`--spacing\` (1rem / 16px) | Inner vertical and horizontal padding |
| \`--accordion-radius\` | \`--panel-radius\` (0.25rem) | Outer perimeter corner curvature |
| \`--accordion-summary-font-size\` | \`--typography-font-size-0\` (1rem) | Summary header label text size |
| \`--accordion-summary-font-weight\` | \`--font-weight-bold\` (700) | Summary header font weight |
| \`--accordion-icon-size\` | \`0.875rem\` | Diameter of the plus/minus orthogonal indicator icon |
| \`--accordion-transition\` | \`--duration-sm\` (150ms) | Expand and collapse transition speed |

---

#### 4. Zero-Class Container Style Queries (\`@container style(...)\`)
Parents can declaratively orchestrate disclosure styling across cards and sections without utility classes:

\`\`\`css
/* Example: Dense flush FAQ sidebar */
.faq-sidebar {
  --accordion-variation: flush;
  --ui-density: dense;
}
\`\`\`
`,
      },
    },
  },
  argTypes: {
    summary: {
      description: 'Header summary text',
      control: 'text',
      defaultValue: 'What makes Design For Humans accessible?',
    },
    content: {
      description: 'Collapsible body content copy',
      control: 'text',
      defaultValue: 'Design For Humans is built strictly on modern W3C web standards, utilizing native browser primitives like &lt;details&gt;, &lt;summary&gt;, and the Popover API for zero-JS accessibility and optimal performance.',
    },
    open: {
      description: 'Initial disclosure open state',
      control: 'boolean',
      defaultValue: false,
    },
    variant: {
      description: 'Cosmetic accordion variant',
      control: 'select',
      options: ['default', 'plain', 'flush', 'transparent'],
      defaultValue: 'default',
    },
    noIcon: {
      description: 'Suppress the orthogonal indicator icon',
      control: 'boolean',
      defaultValue: false,
    },
  },
  render: (args) => {
    const variantClass = args.variant && args.variant !== 'default' ? `accordion--${args.variant}` : '';
    const noIconClass = args.noIcon ? 'accordion--no-icon' : '';
    const classes = ['accordion', variantClass, noIconClass].filter(Boolean).join(' ');

    return `
      <div class="demo-stage demo-constrained--lg">
        <details class="${classes}" ${args.open ? 'open' : ''}>
          <summary>${args.summary}</summary>
          <p style="margin: 0; line-height: 1.6; color: var(--foreground-muted);">
            ${args.content}
          </p>
        </details>
      </div>
    `;
  },
};

export default meta;
type Story = StoryObj<AccordionArgs>;

/**
 * 1. Playground (Interactive Sandbox)
 * Adjust summary titles, body content, variants, and icon flags via Storybook controls.
 */
export const Playground: Story = {
  args: {
    summary: 'What makes Design For Humans accessible?',
    content: 'Design For Humans is built strictly on modern W3C web standards, utilizing native browser primitives like &lt;details&gt;, &lt;summary&gt;, and the Popover API for zero-JS accessibility and optimal performance.',
    open: false,
    variant: 'default',
    noIcon: false,
  },
};

/**
 * 2. Anatomy & Structure Breakdown
 * Shows `<details>`, `<summary>`, orthogonal plus/minus indicator icon, and ::details-content body.
 */
export const Anatomy: Story = {
  render: () => `
    <div class="demo-stage demo-constrained--lg stack">
      <div class="demo-label">1. Container (&lt;details class="accordion"&gt;) &rarr; 2. Summary Header &rarr; 3. Indicator Icon &rarr; 4. Body (::details-content)</div>
      
      <details class="accordion" open>
        <summary>WCAG 2.2 Level AA & AAA Benchmark</summary>
        <p style="margin: 0; line-height: 1.6;">
          Every primitive in the library is subjected to automated axe-core accessibility checks and verified against keyboard navigation, screen reader speech output, and high-contrast color standards.
        </p>
      </details>
    </div>
  `,
};

/**
 * 3. Variants & Hierarchy
 * Demonstrates Default Bordered, Plain, Flush, and Transparent variations.
 */
export const Variants: Story = {
  render: () => `
    <div class="demo-stage demo-constrained--lg stack">
      <!-- 1. Default Bordered -->
      <div>
        <div class="demo-label">1. Default Bordered (.accordion)</div>
        <details class="accordion">
          <summary>Default Bordered Accordion</summary>
          <p style="margin: 0;">Enclosed within standard border stroke and rounded corners.</p>
        </details>
      </div>

      <hr class="divider" />

      <!-- 2. Plain -->
      <div>
        <div class="demo-label">2. Plain Variation (.accordion--plain)</div>
        <details class="accordion accordion--plain">
          <summary>Plain Borderless Accordion</summary>
          <p style="margin: 0;">No outer border or background, ideal for document tables and inline lists.</p>
        </details>
      </div>

      <hr class="divider" />

      <!-- 3. Flush -->
      <div>
        <div class="demo-label">3. Flush Variation (.accordion--flush)</div>
        <details class="accordion accordion--flush">
          <summary>Flush Accordion (Edge-to-Edge)</summary>
          <p style="margin: 0;">Removes horizontal padding for seamless integration in card bodies.</p>
        </details>
      </div>

      <hr class="divider" />

      <!-- 4. Transparent -->
      <div>
        <div class="demo-label">4. Transparent Variation (.accordion--transparent)</div>
        <details class="accordion accordion--transparent">
          <summary>Transparent Accordion</summary>
          <p style="margin: 0;">Maintains borders while keeping background transparent when opened.</p>
        </details>
      </div>

      <hr class="divider" />

      <!-- 5. Without Indicator Icon -->
      <div>
        <div class="demo-label">5. Opt-Out: Without Indicator Icon (.accordion--no-icon)</div>
        <details class="accordion accordion--no-icon">
          <summary>Clean Header Without Plus/Minus Icon</summary>
          <p style="margin: 0;">Suppresses orthogonal pseudo-element indicator icon for custom disclosure designs.</p>
        </details>
      </div>
    </div>
  `,
};

/**
 * 4. Native Exclusive Group (name="...")
 * Native browser functionality: only one disclosure item can be open at a time with zero JavaScript.
 */
export const ExclusiveGroup: Story = {
  render: () => `
    <div class="demo-stage demo-constrained--lg stack">
      <div class="demo-label">Native Exclusive Group (name="faq-group" / Zero JavaScript)</div>
      
      <div class="accordion-group">
        <details class="accordion" name="faq-exclusive" open>
          <summary>How does the native exclusive group work?</summary>
          <p style="margin: 0; line-height: 1.6; color: var(--foreground-muted);">
            By adding the standard HTML5 <code>name="faq-exclusive"</code> attribute to multiple <code>&lt;details&gt;</code> elements, the browser natively ensures only one disclosure item is open at a time—with zero JavaScript event listeners.
          </p>
        </details>

        <details class="accordion" name="faq-exclusive">
          <summary>How does smooth height animation work?</summary>
          <p style="margin: 0; line-height: 1.6; color: var(--foreground-muted);">
            We use CSS <code>interpolate-size: allow-keywords;</code> combined with the <code>::details-content</code> pseudo-element. This allows CSS to smoothly transition <code>block-size: 0</code> to <code>block-size: auto</code> without measuring scrollHeight in JavaScript.
          </p>
        </details>

        <details class="accordion" name="faq-exclusive">
          <summary>Are these components accessible to screen readers?</summary>
          <p style="margin: 0; line-height: 1.6; color: var(--foreground-muted);">
            Yes! Native <code>&lt;summary&gt;</code> has native disclosure semantics built-in, toggling <code>expanded</code> states automatically in the accessibility tree and supporting standard Space and Enter keyboard interactions out of the box.
          </p>
        </details>
      </div>
    </div>
  `,
};

/**
 * 5. Tight Accordion Group (.accordion-group--tight)
 * Accordions stacked with zero gap and joined borders like a segmented card.
 */
export const TightGroup: Story = {
  render: () => `
    <div class="demo-stage demo-constrained--lg stack">
      <div class="demo-label">Tight Group (.accordion-group--tight / Joined Radii & Shared Borders)</div>
      
      <div class="accordion-group accordion-group--tight">
        <details class="accordion" name="tight-group" open>
          <summary>Section 1: Installation & Setup</summary>
          <p style="margin: 0; line-height: 1.6; color: var(--foreground-muted);">
            Run <code>npm install @designforhumans/css</code> to import the core component tokens and stylesheets.
          </p>
        </details>

        <details class="accordion" name="tight-group">
          <summary>Section 2: Token Configuration</summary>
          <p style="margin: 0; line-height: 1.6; color: var(--foreground-muted);">
            Import <code>variables.css</code> or configure DTCG design tokens in your build pipeline.
          </p>
        </details>

        <details class="accordion" name="tight-group">
          <summary>Section 3: Figma Synchronization</summary>
          <p style="margin: 0; line-height: 1.6; color: var(--foreground-muted);">
            Export tokens directly to Tokens Studio and native Figma Variables using <code>npm run export:figma</code>.
          </p>
        </details>
      </div>
    </div>
  `,
};

/**
 * 6. Sizes & Density (WCAG Target Compliance)
 * Compares standard disclosure padding with dense container query mode.
 */
export const SizesAndDensity: Story = {
  render: () => `
    <div class="demo-stage demo-constrained--lg stack">
      <!-- Standard Density -->
      <div>
        <div class="demo-label">Standard Density (1rem / 16px Padding)</div>
        <details class="accordion">
          <summary>Standard Accordion Header</summary>
          <p style="margin: 0;">Standard disclosure spacing with 48px+ touch target on the summary header.</p>
        </details>
      </div>

      <hr class="divider" />

      <!-- Dense Container Query -->
      <div style="--ui-density: dense;">
        <div class="demo-label">Dense Container (--ui-density: dense / Compact 0.5rem Padding)</div>
        <details class="accordion">
          <summary>Compact Inspector Disclosure</summary>
          <p style="margin: 0;">Compact disclosure spacing designed for dense sidebar inspectors and tool panels.</p>
        </details>
      </div>
    </div>
  `,
};

/**
 * 7. Zero-Class Container Style Queries (@container style(...))
 * Demonstrating parent container orchestration without utility classes.
 */
export const ZeroClassOrchestration: Story = {
  render: () => `
    <div class="stack demo-constrained--lg">
      <div class="demo-label">Parent: style="--accordion-variation: flush; --ui-density: dense;"</div>
      <div class="demo-stage" style="--accordion-variation: flush; --ui-density: dense;">
        <div class="accordion-group">
          <details class="accordion" name="csq-faq">
            <summary>Telemetry and Diagnostic Logging</summary>
            <p style="margin: 0; color: var(--foreground-muted);">Logs are retained for 30 days and encrypted at rest.</p>
          </details>
          <details class="accordion" name="csq-faq">
            <summary>Accessibility Conformance Verification</summary>
            <p style="margin: 0; color: var(--foreground-muted);">Automated scans execute on every commit to main.</p>
          </details>
        </div>
      </div>
    </div>
  `,
};

/**
 * 8. Real-World Recipes & UI Compositions
 * Common production patterns: Card FAQ section & Sidebar Settings Inspector.
 */
export const RealWorldRecipes: Story = {
  render: () => `
    <div class="stack demo-constrained--lg">
      <!-- Recipe A: Card FAQ Section -->
      <article class="card">
        <header class="card__header">
          <h3 class="card__title subheading">Frequently Asked Questions</h3>
          <p class="card__subtitle">Everything you need to know about Design For Humans</p>
        </header>
        <div class="card__body card__body--flush">
          <div class="accordion-group accordion-group--tight">
            <details class="accordion accordion--flush" name="card-faq" open>
              <summary>Why use native web primitives instead of JavaScript libraries?</summary>
              <p style="margin: 0; line-height: 1.6; color: var(--foreground-muted);">
                Native primitives have zero runtime bundle overhead, guarantee native assistive technology compatibility, and cannot desynchronize from browser accessibility trees.
              </p>
            </details>

            <details class="accordion accordion--flush" name="card-faq">
              <summary>How does Figma token synchronization work?</summary>
              <p style="margin: 0; line-height: 1.6; color: var(--foreground-muted);">
                Tokens are defined in W3C DTCG format and automatically compiled to CSS custom properties and Figma Variables collections using our Node exporter.
              </p>
            </details>

            <details class="accordion accordion--flush" name="card-faq">
              <summary>Which browsers support interpolate-size?</summary>
              <p style="margin: 0; line-height: 1.6; color: var(--foreground-muted);">
                Modern Chromium browsers support <code>interpolate-size: allow-keywords;</code> today. Non-supporting browsers gracefully open and close instantly with zero layout shift or script errors.
              </p>
            </details>
          </div>
        </div>
        <footer class="card__footer" style="display: flex; justify-content: flex-end;">
          <a href="#" class="button button--subtle" role="button">
            <span>View Full Documentation &rarr;</span>
          </a>
        </footer>
      </article>
    </div>
  `,
};
