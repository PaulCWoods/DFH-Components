import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Atoms/Text',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# Text & Typography Primitives

Token-driven typographic hierarchy primitives providing modular scale steps (-2 to 8), dual-ratio fluid clamp interpolations, container-query adaptive sizing (\`--cq\`), and locked non-fluid steps (\`--fixed\`). Conforms to WCAG 2.2 Level AA / AAA standards (1.4.8 Visual Presentation, 1.4.12 Text Spacing, 1.4.3 Contrast, and \`text-wrap: balance\` orphan prevention).

---

### Canonical Semantic Markup Signatures

#### 1. Display & Section Headings
\`\`\`html
<!-- Display Title (Step 8, fluid 5.96rem) -->
<h1 class="display-title">Headline Hero</h1>

<!-- Editorial Title (Step 5, fluid 3.052rem) -->
<h2 class="title">Section Title</h2>

<!-- Component Heading (Step 3, fluid 1.953rem) -->
<h3 class="heading">Feature Heading</h3>

<!-- Subheading (Step 1, fluid 1.25rem) -->
<h4 class="subheading">Supporting Subtitle</h4>

<!-- Small Heading (Step 0, 1rem) -->
<h5 class="small-heading">Card Header</h5>

<!-- Micro Heading (Step -1, 0.8rem, uppercase) -->
<p class="micro-heading">Category Eyebrow</p>
\`\`\`

#### 2. Body Text & Modifiers
\`\`\`html
<!-- Large / Lead Paragraph (Step 1) -->
<p class="large-text">Lead introduction copy with elevated line height.</p>

<!-- Standard Body Text (Step 0) -->
<p class="text">Standard paragraph text with comfortable measure and line height.</p>

<!-- Small Annotation / Caption (Step -1) -->
<small class="small-text">Supporting annotation or timestamp.</small>

<!-- Micro Fine-Print (Step -1, compact) -->
<span class="micro-text">Legal fine print or badge subtitle.</span>
\`\`\`

---

### WCAG 2.2 Conformance Matrix
| Criterion | Level | Status | Architectural Implementation |
| :--- | :--- | :--- | :--- |
| **1.4.1 Use of Color** | A | **Pass** | Typographic distinction uses modular weight, scale, tracking, and cases rather than color alone. |
| **1.4.3 Contrast (Minimum)** | AA (4.5:1) | **Pass** | Body and headings inherit \`--foreground\` (>= 4.5:1 on light canvas, >= 7:1 on dark canvas). |
| **1.4.6 Contrast (Enhanced)** | AAA (7:1) | **Pass** | Large text (>= 24px or bold >= 18.66px) exceeds the 3:1 threshold; body exceeds 7:1 against canvas. |
| **1.4.8 Visual Presentation** | AAA | **Pass** | Line spacing exceeds 1.5 in body; paragraph bottom margin exceeds 1.5em; line length capped at 66ch; no justified alignment. |
| **1.4.12 Text Spacing** | AA | **Pass** | Supports user stylesheet overrides for line-height (1.5x), letter-spacing (0.12em), and word-spacing (0.16em) without truncation. |
| **2.4.6 Headings & Labels** | AA | **Pass** | Semantic HTML headings (\`h1\`–\`h6\`) preserve structural tree regardless of visual typography class applied. |
| **Orphan Prevention** | Best Practice | **Pass** | Headings implement native \`text-wrap: balance\` and \`break-after: avoid\` for editorial harmony. |

---

### CSS Custom Property Token Contract
| CSS Variable | Default Value | Fallback Ladder | Description |
| :--- | :--- | :--- | :--- |
| \`--display-title-fluid-font-size\` | \`var(--typography-font-size-fluid-8)\` | \`5.96rem\` | Display title fluid font size |
| \`--title-fluid-font-size\` | \`var(--typography-font-size-fluid-5)\` | \`3.052rem\` | Title fluid font size |
| \`--heading-fluid-font-size\` | \`var(--typography-font-size-fluid-3)\` | \`1.953rem\` | Section heading fluid font size |
| \`--subheading-fluid-font-size\` | \`var(--typography-font-size-fluid-1)\` | \`1.25rem\` | Subheading fluid font size |
| \`--small-heading-fluid-font-size\` | \`var(--body-font-size)\` | \`1rem\` | Small heading font size |
| \`--micro-heading-font-size\` | \`var(--typography-font-size--1)\` | \`0.8rem\` | Micro uppercase eyebrow font size |
| \`--body-font-size\` | \`var(--typography-font-size-fluid-0)\` | \`1rem\` | Standard body font size |
| \`--body-line-height\` | \`var(--typography-line-height-5)\` | \`1.5\` | Standard body copy line height |
| \`--title-line-height\` | \`var(--typography-line-height-1)\` | \`1.1\` | Tight title line height |
| \`--heading-line-height\` | \`var(--typography-line-height-2)\` | \`1.2\` | Heading line height |
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * 1. Playground
 * Interactive sandbox exploring typography presets, scale modes, and weights.
 */
export const Playground: Story = {
  args: {
    preset: 'heading',
    scaling: 'fluid',
    text: 'Design For Humans empowers accessible, token-driven web architecture.',
    tag: 'h2',
    balance: true,
  },
  argTypes: {
    preset: {
      name: 'Typography Preset',
      control: { type: 'select' },
      options: [
        'display-title',
        'title',
        'heading',
        'subheading',
        'small-heading',
        'micro-heading',
        'large-text',
        'text',
        'small-text',
        'micro-text',
      ],
      description: 'The typographic scale preset class.',
    },
    scaling: {
      name: 'Scaling Mode',
      control: { type: 'inline-radio' },
      options: ['fluid', 'cq', 'fixed'],
      description: 'Fluid viewport clamp (default), container query adaptive (.font-sizing-cq), or locked fixed step (.font-sizing-fixed).',
    },
    text: {
      name: 'Text Content',
      control: { type: 'text' },
    },
    tag: {
      name: 'HTML Tag',
      control: { type: 'select' },
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span'],
      description: 'Semantic markup element.',
    },
    balance: {
      name: 'Text Wrap Balance',
      control: { type: 'boolean' },
      description: 'Applies CSS text-wrap: balance.',
    },
  },
  render: (args) => {
    const className = args.preset;
    const utilityClass = args.scaling !== 'fluid' ? `font-sizing-${args.scaling}` : '';
    const balanceStyle = args.balance ? 'text-wrap: balance;' : '';

    return `
      <div class="${utilityClass}" style="max-inline-size: 48rem; margin-inline: auto; padding: var(--spacing-24); background-color: var(--surface-card); border: var(--border-width, 1px) solid var(--border-quiet); border-radius: var(--radius-lg);">
        <p class="micro-heading" style="color: var(--foreground-muted); margin-block-end: var(--spacing-8);">
          Preset: .${className} | Scaling: ${args.scaling} (via .font-sizing-${args.scaling}) | Tag: &lt;${args.tag}&gt;
        </p>
        <${args.tag} class="${className}" style="margin: 0; ${balanceStyle}">
          ${args.text}
        </${args.tag}>
      </div>
    `;
  },
};

/**
 * 2. Anatomy
 * Structural dissection of the typography system, showing font family, modular scale, line-height, letter-spacing, and text-transform.
 */
export const Anatomy: Story = {
  render: () => `
    <div class="stack" style="gap: var(--spacing-24); max-inline-size: 54rem; margin-inline: auto;">
      <div class="card card--bordered" style="padding: var(--spacing-24);">
        <header style="margin-block-end: var(--spacing-16);">
          <span class="badge badge--accent">Anatomy & Spec</span>
          <h3 class="heading" style="margin-block-start: var(--spacing-8);">Typographic Scale Metrics</h3>
          <p class="text" style="color: var(--foreground-muted); margin: 0;">
            Every preset is defined by five orchestrated parameters: family, fluid clamp step, line-height, tracking, and text-transform.
          </p>
        </header>

        <div class="stack" style="gap: var(--spacing-16);">
          <div style="padding: var(--spacing-16); background-color: var(--surface); border-radius: var(--radius-md); border-inline-start: 4px solid var(--foreground-accent);">
            <div class="cluster" style="justify-content: space-between; align-items: baseline; margin-block-end: var(--spacing-4);">
              <span class="micro-heading" style="color: var(--foreground-accent); font-weight: 700;">.display-title</span>
              <span class="badge badge--sm">Fluid Step 8 (5.96rem) &bull; LH 0.95 &bull; Uppercase</span>
            </div>
            <h1 class="display-title" style="margin: 0;">Impact Header</h1>
          </div>

          <div style="padding: var(--spacing-16); background-color: var(--surface); border-radius: var(--radius-md); border-inline-start: 4px solid var(--foreground-accent);">
            <div class="cluster" style="justify-content: space-between; align-items: baseline; margin-block-end: var(--spacing-4);">
              <span class="micro-heading" style="color: var(--foreground-accent); font-weight: 700;">.title</span>
              <span class="badge badge--sm">Fluid Step 5 (3.052rem) &bull; LH 1.1 &bull; Tight Tracking</span>
            </div>
            <h2 class="title" style="margin: 0;">Section Title</h2>
          </div>

          <div style="padding: var(--spacing-16); background-color: var(--surface); border-radius: var(--radius-md); border-inline-start: 4px solid var(--foreground-accent);">
            <div class="cluster" style="justify-content: space-between; align-items: baseline; margin-block-end: var(--spacing-4);">
              <span class="micro-heading" style="color: var(--foreground-accent); font-weight: 700;">.heading</span>
              <span class="badge badge--sm">Fluid Step 3 (1.953rem) &bull; LH 1.2 &bull; Normal Tracking</span>
            </div>
            <h3 class="heading" style="margin: 0;">Component Header</h3>
          </div>

          <div style="padding: var(--spacing-16); background-color: var(--surface); border-radius: var(--radius-md); border-inline-start: 4px solid var(--foreground-accent);">
            <div class="cluster" style="justify-content: space-between; align-items: baseline; margin-block-end: var(--spacing-4);">
              <span class="micro-heading" style="color: var(--foreground-accent); font-weight: 700;">.subheading</span>
              <span class="badge badge--sm">Fluid Step 1 (1.25rem) &bull; LH 1.2 &bull; Normal Tracking</span>
            </div>
            <h4 class="subheading" style="margin: 0;">Article Subheading</h4>
          </div>

          <div style="padding: var(--spacing-16); background-color: var(--surface); border-radius: var(--radius-md); border-inline-start: 4px solid var(--foreground-accent);">
            <div class="cluster" style="justify-content: space-between; align-items: baseline; margin-block-end: var(--spacing-4);">
              <span class="micro-heading" style="color: var(--foreground-accent); font-weight: 700;">.text (Body)</span>
              <span class="badge badge--sm">Fluid Step 0 (1rem) &bull; LH 1.5 &bull; 66ch Max Measure</span>
            </div>
            <p class="text" style="margin: 0;">
              Body copy is mathematically proportioned for reading comfort, utilizing proportional numbers and oldstyle figures in editorial contexts.
            </p>
          </div>
        </div>
      </div>
    </div>
  `,
};

/**
 * 3. Variants
 * Complete showcase of every heading and body typography variant.
 */
export const Variants: Story = {
  render: () => `
    <div class="stack" style="gap: var(--spacing-32); max-inline-size: 54rem; margin-inline: auto;">
      <!-- Heading Scale -->
      <section>
        <span class="badge badge--accent" style="margin-block-end: var(--spacing-8);">Heading Hierarchy</span>
        <h2 class="title" style="margin-block-end: var(--spacing-16);">From Display to Micro Eyebrow</h2>
        
        <div class="stack" style="gap: var(--spacing-24);">
          <div>
            <span class="micro-heading" style="color: var(--foreground-muted);">.display-title (Step 8)</span>
            <h1 class="display-title" style="margin: 0;">Global Impact</h1>
          </div>
          <hr class="divider" />

          <div>
            <span class="micro-heading" style="color: var(--foreground-muted);">.title (Step 5)</span>
            <h2 class="title" style="margin: 0;">Design Systems Architecture</h2>
          </div>
          <hr class="divider" />

          <div>
            <span class="micro-heading" style="color: var(--foreground-muted);">.heading (Step 3)</span>
            <h3 class="heading" style="margin: 0;">Accessible Web Standards</h3>
          </div>
          <hr class="divider" />

          <div>
            <span class="micro-heading" style="color: var(--foreground-muted);">.subheading (Step 1)</span>
            <h4 class="subheading" style="margin: 0;">Dual-Ratio Fluid Typographic Scaling</h4>
          </div>
          <hr class="divider" />

          <div>
            <span class="micro-heading" style="color: var(--foreground-muted);">.small-heading (Step 0)</span>
            <h5 class="small-heading" style="margin: 0;">Card Feature Header</h5>
          </div>
          <hr class="divider" />

          <div>
            <span class="micro-heading" style="color: var(--foreground-muted);">.micro-heading (Step -1 Uppercase)</span>
            <p class="micro-heading" style="margin: 0;">Metadata Eyebrow Label</p>
          </div>
        </div>
      </section>

      <!-- Body Scale & Typographic Utilities -->
      <section>
        <span class="badge badge--accent" style="margin-block-end: var(--spacing-8);">Body & Text Utilities</span>
        <h2 class="title" style="margin-block-end: var(--spacing-16);">Copy Weights and Editorial Presets</h2>

        <div class="stack" style="gap: var(--spacing-24);">
          <div>
            <span class="micro-heading" style="color: var(--foreground-muted);">.large-text (Step 1 Lead Copy)</span>
            <p class="large-text" style="margin: 0;">
              Lead paragraph introducing key themes with elevated font size and proportional line height.
            </p>
          </div>
          <hr class="divider" />

          <div>
            <span class="micro-heading" style="color: var(--foreground-muted);">.text (Step 0 Standard Body)</span>
            <p class="text" style="margin: 0;">
              Standard body text engineered for sustained reading comfort across all viewport densities and device sizes.
            </p>
          </div>
          <hr class="divider" />

          <div>
            <span class="micro-heading" style="color: var(--foreground-muted);">.strong-text</span>
            <p class="strong-text text" style="margin: 0;">
              High-emphasis bold weight text aligned to token font weights.
            </p>
          </div>
          <hr class="divider" />

          <div>
            <span class="micro-heading" style="color: var(--foreground-muted);">.small-text (Step -1 Annotations)</span>
            <p class="small-text" style="margin: 0;">
              Secondary captions, card timestamps, and table column annotations.
            </p>
          </div>
          <hr class="divider" />

          <div>
            <span class="micro-heading" style="color: var(--foreground-muted);">.micro-text (Step -1 Compact)</span>
            <p class="micro-text" style="margin: 0;">
              Fine-print copyright notices, license metadata, and compact disclaimers.
            </p>
          </div>
          <hr class="divider" />

          <div>
            <span class="micro-heading" style="color: var(--foreground-muted);">.code-text &amp; .alt-text</span>
            <p class="text" style="margin: 0;">
              Inline code <code class="code-text">light-dark(#fff, #000)</code> with slashed zeros and <span class="alt-text">alternative typeface font family</span>.
            </p>
          </div>
        </div>
      </section>
    </div>
  `,
};

/**
 * 4. StateMatrix
 * High-contrast mode, dark surfaces, RTL layout, and text spacing compliance (WCAG 1.4.12).
 */
export const StateMatrix: Story = {
  render: () => `
    <div class="stack" style="gap: var(--spacing-24); max-inline-size: 54rem; margin-inline: auto;">
      <!-- On Dark Surface Context -->
      <div class="card card--bordered" style="padding: var(--spacing-24); background-color: var(--surface-dark); color: var(--foreground-on-dark);">
        <span class="badge badge--accent" style="margin-block-end: var(--spacing-8);">Context: Dark Surface</span>
        <h3 class="heading" style="margin: 0 0 var(--spacing-8) 0; color: inherit;">
          High Contrast Dark Mode Typography
        </h3>
        <p class="text" style="margin: 0 0 var(--spacing-16) 0; color: var(--foreground-on-dark);">
          Typography retains crisp contrast ratios exceeding 7:1 against deep dark surfaces without font rendering blurring.
        </p>
        <span class="micro-heading" style="color: var(--foreground-muted);">Token: --foreground-on-dark</span>
      </div>

      <!-- Right to Left (RTL) Bidirectional Support -->
      <div dir="rtl" class="card card--bordered" style="padding: var(--spacing-24); text-align: right;">
        <span class="badge badge--accent" style="margin-block-end: var(--spacing-8);">Context: dir="rtl"</span>
        <h3 class="heading" style="margin: 0 0 var(--spacing-8) 0;">
          التصميم للإنسان: معايير الطباعة والخطوط
        </h3>
        <p class="text" style="margin: 0;">
          تدعم أنظمة الخطوط التوجيه النصي ثنائي الاتجاه بالكامل، وتتكيف المسافات البادئة وحجم الخط بشكل متناغم.
        </p>
      </div>

      <!-- WCAG 1.4.12 Text Spacing Simulation -->
      <div class="card card--bordered" style="padding: var(--spacing-24); line-height: 1.5 !important; letter-spacing: 0.12em !important; word-spacing: 0.16em !important;">
        <span class="badge badge--success" style="margin-block-end: var(--spacing-8);">WCAG 1.4.12 Text Spacing Passed</span>
        <h3 class="heading" style="margin: 0 0 var(--spacing-8) 0;">
          Expanded User Text Spacing
        </h3>
        <p class="text" style="margin: 0;">
          Simulating a bookmarklet with line-height 1.5, letter-spacing 0.12em, and word-spacing 0.16em. The layout flows gracefully without clipping or text overlap.
        </p>
      </div>
    </div>
  `,
};

/**
 * 5. SizesAndDensity
 * Comparison of Fluid clamp scaling vs Container Query scaling (--cq) vs Fixed steps (--fixed).
 */
export const SizesAndDensity: Story = {
  render: () => `
    <div class="stack" style="gap: var(--spacing-24); max-inline-size: 54rem; margin-inline: auto;">
      <!-- Fluid Viewport Mode -->
      <div class="card card--bordered" style="padding: var(--spacing-24);">
        <div class="cluster" style="justify-content: space-between; margin-block-end: var(--spacing-8);">
          <span class="badge badge--accent">1. Fluid Viewport Scale (Default)</span>
          <span class="micro-heading" style="color: var(--foreground-muted);">clamp(1.5625rem, ..., 3.815rem)</span>
        </div>
        <h2 class="title" style="margin: 0 0 var(--spacing-8) 0;">Fluid Title Heading</h2>
        <p class="text" style="margin: 0;">
          Interpolates smoothly across viewports using the dual-ratio fluid scale model (1.2 mobile to 1.25 desktop).
        </p>
      </div>

      <!-- Container Query Mode -->
      <div class="card card--bordered font-sizing-cq" style="padding: var(--spacing-24); container-type: inline-size;">
        <div class="cluster" style="justify-content: space-between; margin-block-end: var(--spacing-8);">
          <span class="badge badge--accent">2. Container Query Scale (.font-sizing-cq)</span>
          <span class="micro-heading" style="color: var(--foreground-muted);">Uses cqi units</span>
        </div>
        <h2 class="title" style="margin: 0 0 var(--spacing-8) 0;">Container Adaptive Title</h2>
        <p class="text" style="margin: 0;">
          Scales relative to the immediate containing element rather than the entire browser viewport width.
        </p>
      </div>

      <!-- Fixed Scale Mode -->
      <div class="card card--bordered font-sizing-fixed" style="padding: var(--spacing-24);">
        <div class="cluster" style="justify-content: space-between; margin-block-end: var(--spacing-8);">
          <span class="badge badge--accent">3. Locked Fixed Step (.font-sizing-fixed)</span>
          <span class="micro-heading" style="color: var(--foreground-muted);">Static 3.052rem (Step 5)</span>
        </div>
        <h2 class="title" style="margin: 0 0 var(--spacing-8) 0;">Fixed Modular Step</h2>
        <p class="text" style="margin: 0;">
          Maintains strict non-fluid sizing, ideal for administrative dashboards and dense data panels.
        </p>
      </div>
    </div>
  `,
};

/**
 * 6. ZeroClassOrchestration
 * Demonstrates zero-class orchestration using container style queries (`--font-sizing: cq / fixed`).
 * Child typography adapts without needing modifier classes on every heading or paragraph.
 */
export const ZeroClassOrchestration: Story = {
  render: () => `
    <div class="stack" style="gap: var(--spacing-24); max-inline-size: 54rem; margin-inline: auto;">
      <div class="card card--bordered" style="padding: var(--spacing-24);">
        <header style="margin-block-end: var(--spacing-16);">
          <span class="badge badge--accent">Container Style Orchestration</span>
          <h3 class="heading" style="margin-block-start: var(--spacing-8);">Zero-Class Typography Switching</h3>
          <p class="text" style="color: var(--foreground-muted); margin: 0;">
            Setting <code>--font-sizing: fixed</code> or <code>--font-sizing: cq</code> on a container cascades down to all standard <code>.title</code>, <code>.heading</code>, and <code>.text</code> elements without manual classes.
          </p>
        </header>

        <!-- Container declaring style query -->
        <div style="--font-sizing: fixed; padding: var(--spacing-16); background-color: var(--surface); border-radius: var(--radius-md); border: 1px dashed var(--border-quiet);">
          <p class="micro-heading" style="color: var(--foreground-accent); margin-block-end: var(--spacing-4);">
            Container style: --font-sizing: fixed;
          </p>
          <h2 class="title" style="margin: 0 0 var(--spacing-8) 0;">Standard .title class</h2>
          <h3 class="heading" style="margin: 0 0 var(--spacing-8) 0;">Standard .heading class</h3>
          <p class="text" style="margin: 0;">
            Automatically evaluates <code>@container style(--font-sizing: fixed)</code> and locks to static scale steps.
          </p>
        </div>
      </div>
    </div>
  `,
};

/**
 * 7. RealWorldRecipes
 * Production UI patterns: Editorial Hero, Stat Metric Banner, and Feature Header Card.
 */
export const RealWorldRecipes: Story = {
  render: () => `
    <div class="stack" style="gap: var(--spacing-32); max-inline-size: 54rem; margin-inline: auto;">
      <!-- Recipe 1: Editorial Article Hero -->
      <section class="card card--bordered" style="padding: var(--spacing-32);">
        <header>
          <div class="cluster" style="gap: var(--spacing-8); margin-block-end: var(--spacing-12);">
            <p class="micro-heading" style="color: var(--foreground-accent); margin: 0;">Design Systems &bull; Architecture</p>
            <span class="badge badge--sm">8 Min Read</span>
          </div>
          <h1 class="display-title" style="margin: 0 0 var(--spacing-16) 0; text-wrap: balance;">
            Building For Humans in the Age of Agents
          </h1>
          <p class="large-text" style="color: var(--foreground-muted); margin: 0 0 var(--spacing-24) 0; max-inline-size: 55ch;">
            Accessibility and modern web standards provide the shared language that allows both human readers and AI agents to comprehend software.
          </p>
          <div class="cluster" style="gap: var(--spacing-12); align-items: center;">
            <div class="avatar" data-status="online" aria-label="Paul Woods">
              <span>PW</span>
            </div>
            <div>
              <p class="strong-text text" style="margin: 0;">Paul Charles Woods</p>
              <p class="small-text" style="color: var(--foreground-muted); margin: 0;">Senior Web Standards Architect</p>
            </div>
          </div>
        </header>
      </section>

      <!-- Recipe 2: Metric Stat Callout Banner -->
      <section class="card card--bordered" style="padding: var(--spacing-24);">
        <div class="cluster" style="justify-content: space-around; text-align: center; gap: var(--spacing-24);">
          <div>
            <p class="display-title" style="margin: 0; color: var(--foreground-accent); font-size: 3.5rem;">100%</p>
            <p class="small-heading" style="margin: var(--spacing-4) 0 0 0;">WCAG 2.2 AA / AAA</p>
            <p class="small-text" style="color: var(--foreground-muted); margin: 0;">Automated axe Verification</p>
          </div>
          <hr class="divider divider--vertical" style="height: 4rem;" />
          <div>
            <p class="display-title" style="margin: 0; color: var(--foreground-accent); font-size: 3.5rem;">$0</p>
            <p class="small-heading" style="margin: var(--spacing-4) 0 0 0;">Figma Free Tier</p>
            <p class="small-text" style="color: var(--foreground-muted); margin: 0;">Native Token Sync</p>
          </div>
          <hr class="divider divider--vertical" style="height: 4rem;" />
          <div>
            <p class="display-title" style="margin: 0; color: var(--foreground-accent); font-size: 3.5rem;">0ms</p>
            <p class="small-heading" style="margin: var(--spacing-4) 0 0 0;">JS Hydration Cost</p>
            <p class="small-text" style="color: var(--foreground-muted); margin: 0;">Native Web Standards</p>
          </div>
        </div>
      </section>

      <!-- Recipe 3: Feature Grid Card -->
      <section class="card card--bordered" style="padding: var(--spacing-24);">
        <div class="cluster" style="align-items: center; gap: var(--spacing-12); margin-block-end: var(--spacing-12);">
          <div class="icon-box icon-box--accent">
            <svg class="icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
          </div>
          <div>
            <p class="micro-heading" style="color: var(--foreground-muted); margin: 0;">Core Principle</p>
            <h3 class="heading" style="margin: 0;">Zero-Specificity (:where) Resets</h3>
          </div>
        </div>
        <p class="text" style="margin: 0 0 var(--spacing-16) 0; color: var(--foreground-muted);">
          All typographic presets leverage the <code>:where()</code> zero-specificity pseudo-class, guaranteeing frictionless composition and seamless local overrides without <code>!important</code> wars.
        </p>
        <a href="#" class="link">
          <span>Read the architecture RFC</span>
        </a>
      </section>
    </div>
  `,
};
