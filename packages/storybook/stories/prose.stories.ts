import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Components/Prose',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
**Prose Component Primitive** formats rich text, long-form editorial copy, blog posts, and documentation pages with rhythmic typographic hierarchy.
Directly aligned with the Design For Humans blog architecture (\`_prose.scss\`).

### Canonical Structure
\`\`\`html
<article class="prose">
  <h1>Article Headline</h1>
  <p>Editorial body copy formatted with optimal line length and typographic balance.</p>
  <h2>Section Title</h2>
  <p>Paragraph with an <a href="#">accessible hyperlink</a> and inline <code>code</code>.</p>
  <blockquote>
    <p>A memorable quote with an inset leading border.</p>
  </blockquote>
</article>
\`\`\`

### Architectural Highlights & Accessibility Standards
- **Zero-Specificity Foundation (\`:where()\`)**: Operates seamlessly with the base CSS reset without fighting component overrides.
- **Reading Measure & Rhythm (WCAG 1.4.8)**: Restricts body line length to \`min(66ch, ...)\` for comfortable scanning.
- **Typographic Scale & Balance**: Headings map to modular scale tokens with \`text-wrap: balance\` and \`break-after: avoid\` to prevent orphan text.
- **Advanced Microtypography**: \`hanging-punctuation: first allow-end last\`, \`font-variant-numeric: oldstyle-nums\` on body copy, lining figures on code and lists.
- **Nested List Hierarchy**: Progressive list-style markers (\`disc\` for unordered, \`lower-latin\` and \`lower-roman\` for nested ordered lists).
- **Accessible Links**: Distinct underlines with token-driven \`text-underline-offset\` and \`text-decoration-thickness\`.
- **RTL Support**: Blockquotes dynamically mirror their accent border in \`[dir="rtl"]\` contexts.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * 1. Default Article
 * Comprehensive demonstration of rich editorial content including headings, paragraphs, lists, quotes, code, and figures.
 */
export const Default: Story = {
  render: () => `
    <div style="max-inline-size: 52rem; font-family: var(--body-font-family);">
      <article class="prose">
        <h1>Designing for Humans in the Age of Agents</h1>
        <p>
          Digital accessibility and web standards are not constraints — they are the foundational design principles that allow both human beings and autonomous AI agents to perceive, operate, and understand software.
        </p>

        <h2>The Three-Tier Token Architecture</h2>
        <p>
          Design systems thrive when foundations are cleanly decoupled from semantic context. By separating global palettes from semantic intent and component scoping, applications remain flexible across light and dark color schemes:
        </p>

        <ul>
          <li><strong>Tier 1 Global:</strong> Raw color ramps, modular typography scale, and touch targets.</li>
          <li><strong>Tier 2 Semantic:</strong> Intent-driven surface and foreground tokens using native <code>light-dark()</code>.</li>
          <li><strong>Tier 3 Component:</strong> Scoped custom properties tailored for buttons, cards, dialogs, and banners.</li>
        </ul>

        <blockquote>
          <p>
            When we design for extreme accessibility, we make digital experiences universally superior for all users.
          </p>
        </blockquote>

        <h3>Code Example</h3>
        <p>
          Modern CSS enables zero-JavaScript auto-expanding textareas and native popover tethering:
        </p>

        <pre><code>/* Native Modern CSS */
:where(textarea) {
  field-sizing: content;
  min-block-size: 3lh;
}</code></pre>

        <figure>
          <img 
            src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80" 
            alt="Workspace with laptop, notebook, and clean design instruments"
            loading="lazy"
            style="border-radius: var(--radius); width: 100%;"
          />
          <figcaption>
            <p>Figure 1: Clean token-driven design workspace adhering to WCAG 2.2 standards.</p>
          </figcaption>
        </figure>

        <hr />

        <p class="emoji idea">
          Tip: Always verify color contrast ratios against adjacent background surfaces to guarantee a minimum 4.5:1 ratio.
        </p>
      </article>
    </div>
  `,
};

/**
 * 2. Headings and Hierarchy
 * Demonstrates balanced typographic scaling from h1 down to h6.
 */
export const HeadingsAndHierarchy: Story = {
  render: () => `
    <div style="max-inline-size: 48rem; font-family: var(--body-font-family);">
      <div class="prose">
        <h1>Heading Level 1 (Title)</h1>
        <p>Introductory paragraph describing the primary page subject.</p>

        <h2>Heading Level 2 (Section)</h2>
        <p>Body paragraph under section level 2.</p>

        <h3>Heading Level 3 (Subheading)</h3>
        <p>Body paragraph under subsection level 3.</p>

        <h4>Heading Level 4 (Strong Text)</h4>
        <p>Body paragraph under component block level 4.</p>

        <h5>Heading Level 5 (Small Heading)</h5>
        <p>Body paragraph under micro heading level 5.</p>

        <h6>Heading Level 6 (Small Heading)</h6>
        <p>Body paragraph under micro heading level 6.</p>
      </div>
    </div>
  `,
};

/**
 * 3. Nested Lists and Markers
 * Displays progressive list markers across unordered and ordered levels.
 */
export const ListsAndMarkers: Story = {
  render: () => `
    <div style="max-inline-size: 48rem; font-family: var(--body-font-family);">
      <div class="prose">
        <h2>Unordered Lists</h2>
        <ul>
          <li>First level item with disc marker
            <ul>
              <li>Second level nested item
                <ul>
                  <li>Third level deep nested item</li>
                </ul>
              </li>
            </ul>
          </li>
          <li>Another primary list item</li>
        </ul>

        <h2>Ordered Lists with Hierarchical Markers</h2>
        <ol>
          <li>Standard numeric item (1, 2, 3)
            <ol>
              <li>Nested alphabetic item (a, b, c)
                <ol>
                  <li>Deep nested roman item (i, ii, iii)</li>
                  <li>Second roman numeral item</li>
                </ol>
              </li>
              <li>Second alphabetic item</li>
            </ol>
          </li>
          <li>Second primary ordered item</li>
        </ol>
      </div>
    </div>
  `,
};

/**
 * 4. Quotes and Figures
 * Demonstrates blockquotes with accent borders and figures with captions.
 */
export const QuotesAndFigures: Story = {
  render: () => `
    <div style="max-inline-size: 48rem; font-family: var(--body-font-family);">
      <div class="prose">
        <blockquote>
          <p>
            "Accessibility allows us to build an inclusive web where barriers are eliminated by default, not retrofitted by compromise."
          </p>
        </blockquote>

        <figure>
          <img 
            src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80" 
            alt="Abstract digital network visualization"
            loading="lazy"
            style="border-radius: var(--radius); width: 100%;"
          />
          <figcaption>
            <p>Figure 2: Semantic network structure connecting tokens, styles, and web components.</p>
          </figcaption>
        </figure>
      </div>
    </div>
  `,
};

/**
 * 5. Code and Inline Semantics
 * Shows syntax display, kbd shortcuts, and inline typographic tags.
 */
export const CodeAndSemantics: Story = {
  render: () => `
    <div style="max-inline-size: 48rem; font-family: var(--body-font-family);">
      <div class="prose">
        <p>
          Press <kbd>Cmd</kbd> + <kbd>K</kbd> to open the command palette. You can use <code>light-dark(#fff, #000)</code> for seamless color scheme switching.
        </p>

        <p>
          Inline styles support <strong>strong text</strong>, <em>emphasized text</em>, <small>small side notes</small>, <del>deleted content</del>, <ins>inserted updates</ins>, and chemical formulas like H<sub>2</sub>O or mathematical powers like E = mc<sup>2</sup>.
        </p>

        <pre><code>// Token Compilation Workflow
const tokens = require('./tokens/1-global.json');
const cssOutput = compileDTCGToCSS(tokens);
console.log('Compiled', cssOutput.length, 'tokens');</code></pre>
      </div>
    </div>
  `,
};

/**
 * 6. Emoji Utility Classes
 * Demonstrates accessible decorative emoji markers prefixed via CSS.
 */
export const EmojiUtilities: Story = {
  render: () => `
    <div style="max-inline-size: 48rem; font-family: var(--body-font-family);">
      <div class="prose">
        <p class="emoji check">Audit completed with 100% WCAG 2.2 AA conformance.</p>
        <p class="emoji idea">Tip: Use CSS container queries for component-level responsiveness.</p>
        <p class="emoji warning">Warning: Do not hardcode literal hex values in component CSS.</p>
        <p class="emoji star">Featured: Native HTML &lt;dialog&gt; provides automated focus trapping.</p>
      </div>
    </div>
  `,
};

/**
 * 7. Right to Left (dir="rtl")
 * Demonstrates bidirectional typography and mirrored blockquote borders.
 */
export const RightToLeft: Story = {
  render: () => `
    <div dir="rtl" style="max-inline-size: 48rem; font-family: var(--body-font-family); text-align: right;">
      <article class="prose">
        <h1>تصميم للإنسان: المعايير القياسية للويب</h1>
        <p>
          تعد إمكانية الوصول الرقمي ومعايير الويب من الركائز الأساسية لتوفير تجربة مستخدم استثنائية وسلسة للجميع.
        </p>
        <blockquote>
          <p>
            عندما نصمم مع وضع إمكانية الوصول في الاعتبار، فإننا ننشئ حلولاً أفضل للجميع في كل مكان.
          </p>
        </blockquote>
      </article>
    </div>
  `,
};

/**
 * 8. Container Query Adaptive (.prose--cq)
 * Uses container query fluid typography tokens (--title-cq-font-size, --heading-cq-font-size, etc.)
 * allowing rich prose text to automatically adapt inside narrow columns, cards, sidebars, or split layouts.
 */
export const ContainerQueryAdaptive: Story = {
  render: () => `
    <div style="display: grid; gap: var(--spacing-2);">
      <!-- Narrow Sidebar / Card Context -->
      <div style="container-type: inline-size; padding: var(--spacing-1); background-color: var(--surface-card); border: var(--border-quiet); border-radius: var(--radius); max-width: 24rem;">
        <h4 style="margin-block-end: var(--spacing-0-5); font-size: var(--body-small-font-size); color: var(--foreground-muted); text-transform: uppercase; letter-spacing: 0.05em;">
          Narrow Container Context (Sidebar / Card)
        </h4>
        <div class="prose prose--cq">
          <h2>Container Query Heading</h2>
          <p>
            This article body scales smoothly with <code>cqi</code> units when resized within its parent container.
          </p>
          <ul>
            <li>Nested list item in compact view</li>
            <li>Maintains comfortable proportion</li>
          </ul>
        </div>
      </div>

      <!-- Wider Column Context -->
      <div style="container-type: inline-size; padding: var(--spacing-1); background-color: var(--surface-card); border: var(--border-quiet); border-radius: var(--radius);">
        <h4 style="margin-block-end: var(--spacing-0-5); font-size: var(--body-small-font-size); color: var(--foreground-muted); text-transform: uppercase; letter-spacing: 0.05em;">
          Wider Container Context (Column)
        </h4>
        <div class="prose prose--cq">
          <h2>Container Query Heading</h2>
          <p>
            When more container width is available, font sizes scale up harmoniously while preserving exact typographic measure and hierarchy.
          </p>
          <ul>
            <li>Dynamic fluid scaling without viewport breakpoints</li>
            <li>True modular container encapsulation</li>
          </ul>
        </div>
      </div>
    </div>
  `,
};

/**
 * 9. Fixed Typography (.prose--fixed)
 * Uses fixed, non-fluid typography steps (--typography-font-size-0 through --typography-font-size-3).
 * Ideal for dense interfaces, administrative panels, or components where fixed line heights and font sizes are required.
 */
export const FixedTypography: Story = {
  render: () => `
    <div style="max-inline-size: 48rem; font-family: var(--body-font-family);">
      <article class="prose prose--fixed">
        <h1>Fixed Typography Article (Size 3)</h1>
        <p>
          This prose container uses <code>.prose--fixed</code>. Font sizes do not interpolate fluidly with the viewport or container query units, maintaining fixed scale steps across all screen sizes.
        </p>

        <h2>Fixed Section Heading (Size 2)</h2>
        <p>
          Body copy is locked to <code>--typography-font-size-0</code> (1rem / 16px) with a fixed <code>--prose-vert-space: 1rem</code> rhythm.
        </p>

        <h3>Fixed Subheading (Size 1)</h3>
        <p>
          Ideal for documentation panels, dashboards, and embedded widgets that require consistent sizing regardless of viewport fluctuations.
        </p>

        <ul>
          <li>Fixed line spacing and vertical rhythm</li>
          <li>Standardized paragraph line heights</li>
          <li>Predictable sizing for compact panels</li>
        </ul>
      </article>
    </div>
  `,
};


