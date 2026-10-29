import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Molecules/Prose',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# Prose Molecule Primitive

Rhythmic long-form editorial content container formatting rich text, blog posts, documentation, and technical articles. Operates with zero-specificity (\`:where()\`) resets, native \`hanging-punctuation\`, oldstyle figures, proportional list markers, and responsive vertical rhythm conforming to WCAG 2.2 Level AA / AAA standards (1.4.8 Visual Presentation, 1.4.12 Text Spacing, and 66ch reading measure).

By default, \`.prose\` enforces fixed scale steps (\`--font-sizing: fixed; --vert-spacing: fixed;\`). Sizing seamlessly adapts to fluid or container query scaling when placed in \`.font-sizing-fluid\` or \`.font-sizing-cq\` contexts via modern CSS container style queries.

---

### Canonical Semantic Markup Signatures

#### 1. Editorial Article Container (Default Fixed Scale)
\`\`\`html
<article class="prose">
  <h1>Designing for Humans in the Age of Agents</h1>
  <p>Introductory paragraph formatted with optimal line length and typographic balance.</p>

  <h2>The Three-Tier Token Architecture</h2>
  <p>Paragraph containing an <a href="/tokens">accessible hyperlink</a> and inline <code>code</code>.</p>

  <blockquote>
    <p>Accessibility is the universal baseline that enables comprehension for both humans and AI agents.</p>
  </blockquote>

  <pre><code>/* Token Compilation */
:where(textarea) {
  field-sizing: content;
}</code></pre>
</article>
\`\`\`

#### 2. Scaling & Spacing Modes
\`\`\`html
<!-- Fluid Scaled Prose (via font-sizing utility) -->
<div class="font-sizing-fluid">
  <article class="prose">...</article>
</div>

<!-- Container Query Adaptive Prose (via font-sizing utility) -->
<div class="font-sizing-cq" style="container-type: inline-size;">
  <article class="prose">...</article>
</div>

<!-- Tight Vertical Spacing (Sidebars & Cards) -->
<article class="prose prose--tight">...</article>
\`\`\`

---

### WCAG 2.2 Conformance Matrix
| Criterion | Level | Status | Architectural Implementation |
| :--- | :--- | :--- | :--- |
| **1.4.1 Use of Color** | A | **Pass** | Hyperlinks inside prose enforce persistent underlines with 0.15em offset and distinct typography. |
| **1.4.3 Contrast (Minimum)** | AA (4.5:1) | **Pass** | Prose copy satisfies >= 4.5:1 on light surface and >= 7:1 on dark surfaces (\`--surface-dark\`). |
| **1.4.8 Visual Presentation** | AAA | **Pass** | Line length is restricted to \`min(66ch, 100%)\`; line spacing is 1.5; paragraph margin exceeds 1.5em; no justified text. |
| **1.4.12 Text Spacing** | AA | **Pass** | Survives user stylesheet expansions (line-height 1.5, letter-spacing 0.12em, word-spacing 0.16em) with zero clipping. |
| **2.4.7 Focus Visible** | AA | **Pass** | In-prose links display high-contrast 2px focus ring with 2px offset on \`:focus-visible\`. |
| **2.3.3 Reduced Motion** | AAA | **Pass** | Transitions on hyperlinks and interactive elements respect \`prefers-reduced-motion: reduce\`. |
| **RTL Bidirectional Support** | AAA | **Pass** | Blockquotes and lists automatically mirror logical inline borders and indentations in \`[dir="rtl"]\` mode. |

---

### CSS Custom Property Token Contract
| CSS Variable | Default Value | Fallback Ladder | Description |
| :--- | :--- | :--- | :--- |
| \`--font-sizing\` | \`fixed\` | \`fixed\` | Base font sizing mode (\`fixed\` by default) |
| \`--vert-spacing\` | \`fixed\` | \`fixed\` | Base spacing rhythm (\`fixed\` by default) |
| \`--vert-spacing\` | \`var(--spacing, 1rem)\` | \`1rem\` | Inter-block vertical margin |
| \`--inset-spacing\` | \`var(--prose-inset-space-fixed, 1.5em)\` | \`1.5em\` | List and blockquote indentation |
| \`--prose-body-line-length\` | \`66ch\` | \`66ch\` | Maximum reading measure for body paragraphs |
| \`--prose-link-underline\` | \`underline\` | \`underline\` | Inline hyperlink underline decoration |
| \`--prose-link-underline-offset\` | \`0.15em\` | \`0.15em\` | Baseline clearance distance for underlines |
| \`--prose-blockquote-border-width\` | \`var(--border-width, 1px)\` | \`1px\` | Accent quote leading border stroke |
| \`--prose-hr-thickness\` | \`var(--border-width, 1px)\` | \`1px\` | Horizontal rule stroke |
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * 1. Playground
 * Interactive sandbox toggling spacing modes and rich content elements.
 */
export const Playground: Story = {
  args: {
    scalingMode: 'fixed',
    spacingTight: false,
    showQuote: true,
    showCode: true,
    showFigure: true,
    showList: true,
  },
  argTypes: {
    scalingMode: {
      name: 'Scaling Mode',
      control: { type: 'inline-radio' },
      options: ['fixed', 'fluid', 'cq', 'compact'],
      description: 'Font sizing orchestration mode applied via .font-sizing-* container utilities.',
    },
    spacingTight: {
      name: 'Tight Spacing (.prose--tight)',
      control: { type: 'boolean' },
      description: 'Halves vertical block margins for compact drawer and card layouts.',
    },
    showQuote: {
      name: 'Show Blockquote',
      control: { type: 'boolean' },
    },
    showCode: {
      name: 'Show Code Block',
      control: { type: 'boolean' },
    },
    showFigure: {
      name: 'Show Figure with Caption',
      control: { type: 'boolean' },
    },
    showList: {
      name: 'Show Hierarchical List',
      control: { type: 'boolean' },
    },
  },
  render: (args) => {
    const utilityClass = args.scalingMode !== 'fixed' ? `font-sizing-${args.scalingMode}` : '';
    const tightClass = args.spacingTight ? 'prose--tight' : '';
    const className = ['prose', tightClass].filter(Boolean).join(' ');

    return `
      <div class="${utilityClass}" style="max-inline-size: 52rem; margin-inline: auto; padding: var(--spacing-24); background-color: var(--surface-card); border: var(--border-width, 1px) solid var(--border-quiet); border-radius: var(--radius-lg);">
        <p class="micro-heading" style="color: var(--foreground-muted); margin-block-end: var(--spacing-8);">
          Scaling: ${args.scalingMode} (Default: fixed) | Tight: ${args.spacingTight ? 'Yes (.prose--tight)' : 'No'}
        </p>
        <article class="${className}">
          <h1>Interactive Editorial Prose</h1>
          <p>
            Digital accessibility and web standards are not aesthetic constraints — they are the foundational architecture enabling software comprehension for human beings and autonomous AI agents alike.
          </p>

          <h2>Core Principles of Component Architecture</h2>
          <p>
            When design tokens and zero-specificity styles are combined, applications achieve resilience across themes without fragile CSS selector wars. Explore our <a href="#">token specifications</a> for deep details.
          </p>

          ${args.showList ? `
            <ul>
              <li><strong>Zero-Specificity Foundation:</strong> Powered exclusively by <code>:where()</code>.</li>
              <li><strong>Rhythmic Measure:</strong> Capped at 66 characters per line for optimal scanning.</li>
              <li><strong>Container Queries:</strong> Seamlessly adapts between fixed, fluid, and cq modes.</li>
            </ul>
          ` : ''}

          ${args.showQuote ? `
            <blockquote>
              <p>
                "Accessibility is the universal baseline that enables comprehension for both humans and AI agents."
              </p>
            </blockquote>
          ` : ''}

          ${args.showCode ? `
            <pre><code>/* Pure CSS Zero-JS Layout */
:where(.prose) {
  --font-sizing: fixed;
  --vert-spacing: fixed;
  max-inline-size: min(var(--prose-body-line-length, 66ch), none);
}</code></pre>
          ` : ''}

          ${args.showFigure ? `
            <figure>
              <img 
                src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80" 
                alt="Minimalist design workbench with laptop and notebook" 
                loading="lazy"
                style="border-radius: var(--radius); width: 100%; height: auto;"
              />
              <figcaption>
                <p>Figure 1: Architectural clarity through mathematical scale ratios and standardized token ladders.</p>
              </figcaption>
            </figure>
          ` : ''}

          <p class="emoji check">
            Fully validated with zero axe accessibility violations across all display modes.
          </p>
        </article>
      </div>
    `;
  },
};

/**
 * 2. Anatomy
 * Structural breakdown of editorial typography elements inside the `.prose` container.
 */
export const Anatomy: Story = {
  render: () => `
    <div class="stack" style="gap: var(--spacing-24); max-inline-size: 52rem; margin-inline: auto;">
      <div class="card" style="padding: var(--spacing-24);">
        <header style="margin-block-end: var(--spacing-16);">
          <span class="sb-demo-tag">Prose Anatomy</span>
          <h3 class="heading" style="margin-block-start: var(--spacing-8);">Semantic Hierarchy Breakdown</h3>
          <p class="text" style="color: var(--foreground-muted); margin: 0;">
            The <code>.prose</code> primitive automatically formats native HTML semantic elements with zero utility classes needed on children.
          </p>
        </header>

        <article class="prose">
          <div style="padding: var(--spacing-12); background-color: var(--surface); border-radius: var(--radius-sm); border-inline-start: 3px solid var(--foreground-accent); margin-block-end: var(--spacing-12);">
            <span class="micro-heading" style="color: var(--foreground-accent);">h1 Element &bull; Title Preset</span>
            <h1 style="margin: 0;">Main Editorial Title</h1>
          </div>

          <div style="padding: var(--spacing-12); background-color: var(--surface); border-radius: var(--radius-sm); border-inline-start: 3px solid var(--foreground-accent); margin-block-end: var(--spacing-12);">
            <span class="micro-heading" style="color: var(--foreground-accent);">h2 Element &bull; Heading Preset</span>
            <h2 style="margin: 0;">Major Section Heading</h2>
          </div>

          <div style="padding: var(--spacing-12); background-color: var(--surface); border-radius: var(--radius-sm); border-inline-start: 3px solid var(--foreground-accent); margin-block-end: var(--spacing-12);">
            <span class="micro-heading" style="color: var(--foreground-accent);">p Element &bull; Body Copy with Hyperlink</span>
            <p style="margin: 0;">
              Prose paragraphs utilize <code>hanging-punctuation: first allow-end last</code> and oldstyle proportional numerals for exceptional editorial flow. Here is an <a href="#">inline link</a> demonstration.
            </p>
          </div>

          <div style="padding: var(--spacing-12); background-color: var(--surface); border-radius: var(--radius-sm); border-inline-start: 3px solid var(--foreground-accent);">
            <span class="micro-heading" style="color: var(--foreground-accent);">blockquote Element &bull; Leading Accent Border</span>
            <blockquote style="margin: 0;">
              <p>Blockquotes automatically adopt logical inline borders with calibrated inset padding.</p>
            </blockquote>
          </div>
        </article>
      </div>
    </div>
  `,
};

/**
 * 3. Variants
 * Complete showcase of prose variations: Default Fixed, Fluid Scale, Container Adaptive, and Tight.
 */
export const Variants: Story = {
  render: () => `
    <div class="stack" style="gap: var(--spacing-32); max-inline-size: 54rem; margin-inline: auto;">
      <!-- Variant 1: Default Fixed Scale Prose -->
      <section class="card" style="padding: var(--spacing-24);">
        <span class="sb-demo-tag" style="margin-block-end: var(--spacing-8);">1. Default Fixed Rhythm (.prose)</span>
        <article class="prose">
          <h2>Fixed Scale Rhythm (Default)</h2>
          <p>
            By default, <code>.prose</code> locks text strictly to fixed scale steps (<code>1rem</code> body copy and static heading increments) with predictable spacing:
          </p>
          <ul>
            <li>Fixed vertical space: <code>var(--spacing, 1rem)</code></li>
            <li>Fixed padding inset: <code>var(--prose-inset-space-fixed, 1.5em)</code></li>
          </ul>
        </article>
      </section>

      <!-- Variant 2: Fluid Scaled Prose -->
      <section class="card font-sizing-fluid" style="padding: var(--spacing-24);">
        <span class="sb-demo-tag" style="margin-block-end: var(--spacing-8);">2. Fluid Scaling (.font-sizing-fluid)</span>
        <article class="prose">
          <h2>Fluid Viewport Scaling</h2>
          <p>
            When wrapped in <code>.font-sizing-fluid</code>, prose adapts margins and font scaling smoothly to viewport width using dual-ratio <code>clamp()</code> formulas.
          </p>
          <ul>
            <li>Fluid vertical space: <code>var(--spacing-breathe)</code></li>
            <li>Fluid padding inset: <code>calc(var(--spacing-cushion) * 1.5)</code></li>
          </ul>
        </article>
      </section>

      <!-- Variant 3: Container Query Adaptive -->
      <section class="card font-sizing-cq" style="padding: var(--spacing-24); container-type: inline-size;">
        <span class="sb-demo-tag" style="margin-block-end: var(--spacing-8);">3. Container Adaptive (.font-sizing-cq)</span>
        <article class="prose">
          <h2>Container Query Sizing</h2>
          <p>
            When wrapped in <code>.font-sizing-cq</code>, headings and body scale relative to immediate container width via <code>cqi</code> units — ideal for multi-pane dashboards and split layouts.
          </p>
          <ul>
            <li>Container query vertical space: <code>var(--spacing-cq-breathe)</code></li>
            <li>Zero viewport dependency</li>
          </ul>
        </article>
      </section>

      <!-- Variant 4: Tight Spacing -->
      <section class="card" style="padding: var(--spacing-24);">
        <span class="sb-demo-tag" style="margin-block-end: var(--spacing-8);">4. Compact Rhythm (.prose--tight)</span>
        <article class="prose prose--tight">
          <h2>Compact Spacing for Cards & Drawers</h2>
          <p>
            Halves vertical rhythm margins (<code>calc(var(--spacing) / 2)</code>), ideal for modal explanations, drawers, and dense side panels.
          </p>
        </article>
      </section>

      <!-- Variant 5: Accessible Emoji Markers -->
      <section class="card" style="padding: var(--spacing-24);">
        <span class="sb-demo-tag" style="margin-block-end: var(--spacing-8);">5. Accessible Emoji Callouts</span>
        <article class="prose">
          <p class="emoji check">Audit completed with 100% WCAG 2.2 AA / AAA conformance.</p>
          <p class="emoji idea">Tip: Leverage native CSS container queries for component-level responsiveness.</p>
          <p class="emoji warning">Warning: Never hardcode fixed pixel colors in components.</p>
          <p class="emoji star">Featured: Native HTML dialog provides automatic focus management.</p>
        </article>
      </section>

      <!-- Variant 6: Scoped Boundary Cancellation (.prose-end) -->
      <section class="card" style="padding: var(--spacing-24);">
        <span class="sb-demo-tag" style="margin-block-end: var(--spacing-8);">6. Scoped Boundary Cancellation (.prose-end)</span>
        <article class="prose">
          <h2>Active Prose Section</h2>
          <p>
            This paragraph is formatted inside the <code>@scope (:where(.prose)) to (:where(.prose-end))</code> boundary with standard editorial spacing and measure.
          </p>

          <!-- Cancelled sub-tree -->
          <div class="prose-end" style="margin-block: var(--spacing-16); padding: var(--spacing-16); background-color: var(--surface); border: 1px dashed var(--border-quiet); border-radius: var(--radius-md);">
            <div class="cluster" style="align-items: center; justify-content: space-between;">
              <span class="sb-demo-tag">Opt-Out Sub-tree: .prose-end</span>
              <button type="button" class="button button--sm button--strong button--accent"><span>Interactive Action</span></button>
            </div>
            <p style="margin: var(--spacing-8) 0 0 0; font-size: 0.875rem; color: var(--foreground-muted);">
              Elements inside <code>.prose-end</code> completely escape <code>@scope</code> prose styling, preventing conflicts with complex nested UI components.
            </p>
          </div>

          <p>
            Subsequent editorial content automatically resumes standard prose formatting.
          </p>
        </article>
      </section>
    </div>
  `,
};

/**
 * 4. StateMatrix
 * High contrast mode, dark surface context, and bidirectional RTL layout.
 */
export const StateMatrix: Story = {
  render: () => `
    <div class="stack" style="gap: var(--spacing-24); max-inline-size: 54rem; margin-inline: auto;">
      <!-- Context 1: Dark Surface Container -->
      <div class="card" style="padding: var(--spacing-24); background-color: var(--surface-dark); color: var(--foreground-on-dark);">
        <span class="sb-demo-tag" style="margin-block-end: var(--spacing-8);">Context: Dark Surface Container</span>
        <article class="prose" style="color: inherit;">
          <h2 style="color: inherit;">High Contrast Dark Mode</h2>
          <p style="color: inherit;">
            Prose inherits <code>--foreground-on-dark</code> seamlessly on deep backgrounds while code blocks and quotes retain clear contrast boundaries.
          </p>
          <pre><code>// Dark Mode Code Syntax
const mode = "dark";</code></pre>
        </article>
      </div>

      <!-- Context 2: Right-to-Left (RTL) Layout -->
      <div dir="rtl" class="card" style="padding: var(--spacing-24); text-align: right;">
        <span class="sb-demo-tag" style="margin-block-end: var(--spacing-8);">Context: dir="rtl" Bidirectional</span>
        <article class="prose">
          <h2>تصميم للإنسان: المعايير القياسية للويب</h2>
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
    </div>
  `,
};

/**
 * 5. SizesAndDensity
 * Nested hierarchical lists demonstrating counter sequences and marker typography.
 */
export const SizesAndDensity: Story = {
  render: () => `
    <div class="stack" style="gap: var(--spacing-24); max-inline-size: 54rem; margin-inline: auto;">
      <div class="card" style="padding: var(--spacing-24);">
        <header style="margin-block-end: var(--spacing-16);">
          <span class="sb-demo-tag">Ordered & Unordered Markers</span>
          <h3 class="heading" style="margin-block-start: var(--spacing-8);">Proportional List Hierarchy</h3>
          <p class="text" style="color: var(--foreground-muted); margin: 0;">
            Nested ordered lists cycle through decimal, lower-latin, and lower-roman sequences with lining numerals.
          </p>
        </header>

        <article class="prose">
          <ol>
            <li>First primary numerical item with detailed text explanation.</li>
            <li>
              Second primary numerical item containing nested sub-lists:
              <ol>
                <li>Secondary sub-item styled with lowercase alphabetical marker</li>
                <li>
                  Another secondary item with tertiary sub-nesting:
                  <ol>
                    <li>Tertiary nested item with lowercase roman numerals</li>
                    <li>Final deeply nested numbered requirement</li>
                  </ol>
                </li>
              </ol>
            </li>
            <li>Second primary numerical item</li>
          </ol>
        </article>
      </div>
    </div>
  `,
};

/**
 * 6. ZeroClassOrchestration
 * Pure semantic HTML with zero classes on children, orchestrated via container style queries.
 */
export const ZeroClassOrchestration: Story = {
  render: () => `
    <div class="stack" style="gap: var(--spacing-24); max-inline-size: 54rem; margin-inline: auto;">
      <div class="card" style="padding: var(--spacing-24);">
        <header style="margin-block-end: var(--spacing-16);">
          <span class="sb-demo-tag">Zero-Class Orchestration</span>
          <h3 class="heading" style="margin-block-start: var(--spacing-8);">Pure Semantic HTML Formatting</h3>
          <p class="text" style="color: var(--foreground-muted); margin: 0;">
            No helper classes are required on headings, paragraphs, lists, quotes, or code. Container queries and <code>:where()</code> orchestrate everything automatically.
          </p>
        </header>

        <!-- Container declaring style query -->
        <div style="--vert-spacing: tight; padding: var(--spacing-16); background-color: var(--surface); border-radius: var(--radius-md); border: 1px dashed var(--border-quiet);">
          <p class="micro-heading" style="color: var(--foreground-accent); margin-block-end: var(--spacing-4);">
            Container style: --vert-spacing: tight;
          </p>
          <div class="prose">
            <h3>Standard In-Flow Heading</h3>
            <p>
              Paragraph inside <code>--prose-spacing: tight</code> automatically tightens vertical margins to <code>calc(var(--spacing) / 2)</code> without needing <code>.prose--tight</code> class.
            </p>
            <ul>
              <li>Item in tight spacing mode</li>
              <li>Saves vertical real estate dynamically</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `,
};

/**
 * 7. RealWorldRecipes
 * Production UI recipes: Complete Editorial Blog Post & Technical Documentation Article.
 */
export const RealWorldRecipes: Story = {
  render: () => `
    <div class="stack" style="gap: var(--spacing-32); max-inline-size: 54rem; margin-inline: auto;">
      <!-- Recipe 1: Complete Editorial Blog Post -->
      <section class="card" style="padding: var(--spacing-32);">
        <article class="prose">
          <p class="micro-heading" style="color: var(--foreground-accent); margin-block-end: var(--spacing-4);">
            Architecture RFC &bull; Web Standards
          </p>
          <h1>Designing for Humans in the Age of Autonomous AI Agents</h1>
          <p class="large-text">
            Digital accessibility and web standards are not aesthetic constraints — they are the foundational architecture enabling software comprehension for human beings and autonomous AI agents alike.
          </p>

          <hr />

          <h2>The Three-Tier Token Architecture</h2>
          <p>
            Design systems thrive when foundations are cleanly decoupled from semantic context. By separating global palettes from semantic intent and component scoping, applications remain flexible across light and dark color schemes:
          </p>

          <ul>
            <li><strong>Tier 1 Global:</strong> Raw color ramps, modular typography scale (-2 to 8), and touch targets.</li>
            <li><strong>Tier 2 Semantic:</strong> Intent-driven surface and foreground tokens using native <code>light-dark()</code>.</li>
            <li><strong>Tier 3 Component:</strong> Scoped custom properties tailored for buttons, cards, dialogs, and banners.</li>
          </ul>

          <blockquote>
            <p>
              When we design for extreme accessibility, we make digital experiences universally superior for all users.
            </p>
          </blockquote>

          <h3>Declarative Native Controls</h3>
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
              src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80" 
              alt="Abstract digital network visualization"
              loading="lazy"
              style="border-radius: var(--radius); width: 100%; height: auto;"
            />
            <figcaption>
              <p>Figure 1: Token-driven design architecture connecting semantic styles with accessible web standards.</p>
            </figcaption>
          </figure>

          <p class="emoji idea">
            Tip: Always verify color contrast ratios against adjacent background surfaces to guarantee a minimum 4.5:1 ratio.
          </p>
        </article>
      </section>

      <!-- Recipe 2: Technical API Reference & Documentation -->
      <section class="card" style="padding: var(--spacing-24);">
        <article class="prose prose--tight">
          <p class="micro-heading" style="color: var(--foreground-muted); margin-block-end: var(--spacing-4);">
            API Reference &bull; Keyboard Shortcuts
          </p>
          <h2>Command Palette Interaction Model</h2>
          <p>
            Press <kbd>Cmd</kbd> + <kbd>K</kbd> (or <kbd>Ctrl</kbd> + <kbd>K</kbd> on Windows/Linux) to trigger the universal quick search dialog.
          </p>

          <p>
            Navigation follows roving tabindex: use <kbd>&uarr;</kbd> and <kbd>&darr;</kbd> arrow keys to traverse results, and press <kbd>Enter</kbd> to activate.
          </p>

          <pre><code>// Keyboard Listener Example
window.addEventListener('keydown', (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault();
    openCommandPalette();
  }
});</code></pre>

          <p class="emoji check">
            Meets WCAG 2.1.1 Keyboard and 2.4.7 Focus Visible requirements out of the box.
          </p>
        </article>
      </section>
    </div>
  `,
};
