import type { Meta, StoryObj } from '@storybook/html';

interface SectionArgs {
  title?: string;
  subtitle?: string;
  content?: string;
  flush?: boolean;
  compact?: boolean;
  plain?: boolean;
  hasFooter?: boolean;
}

const meta: Meta<SectionArgs> = {
  title: 'Organisms/Section',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
### Developer & Designer Notes: Section Organism Primitive

The **Section** organism is a structural content sectioning primitive that establishes clear thematic boundaries, anchor scroll-margin clearance, container query contexts, and proportional vertical rhythm.

Adhering strictly to the **Organism-Atom Composition Law**:
* **Organism Role:** Orchestrates layout geometry, logical boundaries, spacing, and scroll-margin clearance. It does **not** hardcode typography properties (\`font-size\`, \`font-family\`, \`font-weight\`).
* **Content Role:** Authored content placed inside (\`<h2>\`, \`<h3>\`, \`<p>\`, or atom \`.heading\`) dictates typography naturally or inherits from the surrounding \`.prose\` molecule.

---

#### 1. Canonical Semantic Markup Signatures

\`\`\`html
<!-- 1. Standard In-Flow Section (Prose / Documentation) -->
<section id="features" class="section" aria-labelledby="features-title">
  <h2 id="features-title">Core Capabilities</h2>
  <p>Design For Humans emphasizes accessibility, token governance, and modern web standards.</p>
  <div class="prose-end">
    <!-- Breakout interactive stage or card grid -->
  </div>
</section>

<!-- 2. Structured Section with Sub-element Hooks -->
<section id="audit" class="section" aria-labelledby="audit-title">
  <header class="section__header">
    <h2 id="audit-title" class="heading">Accessibility Audit</h2>
    <p class="text-muted">Automated WCAG 2.2 Level AAA verification results.</p>
  </header>
  <div class="section__body">
    <!-- Section body content -->
  </div>
  <footer class="section__footer">
    <button type="button" class="button button--strong button--accent">
      <span>Re-run Audit</span>
    </button>
  </footer>
</section>

<!-- 3. Flush Modifier (First section under page header / hero) -->
<section class="section section--flush">
  <h2>Overview</h2>
  <p>Section without top border divider or initial block padding.</p>
</section>
\`\`\`

---

#### 2. WCAG 2.2 Conformance Matrix

| Criterion | Level | Implementation Strategy |
| :--- | :---: | :--- |
| **1.3.1 Info & Relationships** | **A** | Structured with semantic \`<section>\` container elements linked to \`<h2>\` / \`<h3>\` via \`aria-labelledby\`, providing immediate landmark navigation in the screen reader rotor. |
| **2.4.1 Bypass Blocks** | **A** | Pairs with the library's skip-link and Table of Contents navigation; provides distinct landmark regions for fast bypass. |
| **2.4.7 Focus Visible** | **AA** | Anchor navigation respects \`scroll-margin-block-start\` to ensure targeted sections never collide with or hide beneath sticky headers. |
| **1.4.3 Contrast Minimum** | **AA** | Section boundary dividers utilize \`var(--border-subtle)\` ensuring subtle yet perceptible structural demarcation across color schemes. |

---

#### 3. CSS Custom Property Contract Table

| Property | Default Value | Description |
| :--- | :--- | :--- |
| \`--section-spacing\` | \`var(--spacing-cushion, 2rem)\` | Logical vertical padding-block-start and margin-block-end |
| \`--section-border\` | \`var(--border-subtle, 1px solid var(--border-color-muted, currentColor))\` | Top boundary divider rule |
| \`--section-scroll-margin\` | \`calc(var(--header-height, 4rem) + var(--spacing-16, 1rem))\` | Scroll clearance offset for sticky header landmark jumping |
        `,
      },
    },
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Section heading title',
      defaultValue: 'Visual Hierarchy & Prominence',
    },
    subtitle: {
      control: 'text',
      description: 'Optional supporting description copy',
      defaultValue: 'Design For Humans organizes button prominence orthogonally from semantic tone.',
    },
    content: {
      control: 'text',
      description: 'Main body copy or markup',
      defaultValue: 'Every interactive surface should have a single high-emphasis call to action supported by neutral outline and subtle secondary buttons.',
    },
    flush: {
      control: 'boolean',
      description: 'Flush mode: removes top border divider and initial padding-block-start (ideal directly below a header)',
    },
    compact: {
      control: 'boolean',
      description: 'Compact density mode: reduces vertical spacing and declares --ui-sizing: compact',
    },
    plain: {
      control: 'boolean',
      description: 'Plain mode: removes top border rule while preserving spacing rhythm',
    },
    hasFooter: {
      control: 'boolean',
      description: 'Include a section footer with action buttons',
    },
  },
};

export default meta;
type Story = StoryObj<SectionArgs>;

function getSectionClasses(args: SectionArgs): string {
  const classes = ['section'];
  if (args.flush) classes.push('section--flush');
  if (args.compact) classes.push('section--compact');
  if (args.plain) classes.push('section--plain');
  return classes.join(' ');
}

export const Default: Story = {
  args: {
    title: 'Visual Hierarchy & Prominence',
    subtitle: 'Design For Humans organizes button prominence orthogonally from semantic tone.',
    content: 'Every view should feature a clear visual hierarchy with exactly one primary action, supported by outline and subtle secondary actions. This prevents cognitive overload and guides user intention.',
    flush: false,
    compact: false,
    plain: false,
    hasFooter: false,
  },
  render: (args) => `
    <div style="max-inline-size: 56rem; margin-inline: auto; padding-inline: 1rem;">
      <section id="demo-section" class="${getSectionClasses(args)}" aria-labelledby="demo-section-title">
        <header class="section__header">
          <h2 id="demo-section-title" class="heading margin-0">${args.title}</h2>
          ${args.subtitle ? `<p class="text-muted margin-0">${args.subtitle}</p>` : ''}
        </header>
        <div class="section__body">
          <p>${args.content}</p>
          <div class="card card--bordered padding-md margin-block-md">
            <div class="cluster gap-md align-items-center">
              <button type="button" class="button button--strong button--accent">
                <span>Primary Action</span>
              </button>
              <button type="button" class="button">
                <span>Secondary Action</span>
              </button>
              <button type="button" class="button button--subtle">
                <span>Subtle Option</span>
              </button>
            </div>
          </div>
        </div>
        ${args.hasFooter ? `
          <footer class="section__footer">
            <button type="button" class="button button--strong button--accent button--sm">
              <span>Save Changes</span>
            </button>
            <button type="button" class="button button--plain button--sm">
              <span>Dismiss</span>
            </button>
          </footer>
        ` : ''}
      </section>
    </div>
  `,
};

export const Flush: Story = {
  args: {
    ...Default.args,
    title: 'Top Overview Section (Flush)',
    subtitle: 'Demonstrating .section--flush without top border divider or initial padding.',
    flush: true,
  },
  render: Default.render,
};

export const Compact: Story = {
  args: {
    ...Default.args,
    title: 'Compact Density Section',
    subtitle: 'Reduced spacing rhythm and --ui-sizing: compact context for dense utility layouts.',
    compact: true,
    hasFooter: true,
  },
  render: Default.render,
};

export const WithFooterActions: Story = {
  args: {
    ...Default.args,
    title: 'Auditing & System Health',
    subtitle: 'Section featuring an action-oriented .section__footer.',
    hasFooter: true,
  },
  render: Default.render,
};

export const InProseContext: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates the `<section class="section">` primitive inside the `.prose` molecule. Headings and paragraphs are pure semantic HTML without utility classes, and the interactive card uses `.prose-end` to prevent prose rules from bleeding into component internals.',
      },
    },
  },
  render: () => `
    <div style="max-inline-size: 56rem; margin-inline: auto; padding-inline: 1rem;">
      <article class="prose font-sizing-fluid">
        <section id="prose-section-demo" class="section" aria-labelledby="prose-title">
          <h2 id="prose-title">Authored Documentation with Prose & Section</h2>
          <p>
            When placed within an active <code>.prose</code> container, sections seamlessly format native headings,
            paragraphs, and inline semantics without requiring manual utility classes. Vertical rhythm is governed
            automatically by the prose molecule's modular scale.
          </p>
          <p>
            Below, the interactive card uses <code>.prose-end</code> as an isolation boundary, ensuring that button
            geometry and internal card padding remain immune to prose line-heights and text-wrap rules.
          </p>

          <!-- Breakout demo with .prose-end -->
          <div class="prose-end card card--bordered padding-md margin-block-md">
            <div class="inline inline--between align-items-center margin-bottom-sm">
              <span class="font-weight-bold">Breakout Component Stage</span>
              <span class="badge badge--accent badge--sm"><span>Isolated with .prose-end</span></span>
            </div>
            <div class="cluster gap-sm align-items-center">
              <button type="button" class="button button--strong button--accent">
                <span>Confirm Selection</span>
              </button>
              <button type="button" class="button">
                <span>Cancel</span>
              </button>
            </div>
          </div>

          <p>
            Following the breakout component, prose resumes uninterrupted typography flow, hanging punctuation,
            and 66ch reading column limits.
          </p>
        </section>
      </article>
    </div>
  `,
};

export const SequentialSections: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Shows two consecutive sections illustrating natural boundary dividers, scroll-margin clearance, and visual rhythm.',
      },
    },
  },
  render: () => `
    <div style="max-inline-size: 56rem; margin-inline: auto; padding-inline: 1rem;">
      <!-- Section 1 (Flush) -->
      <section id="first-section" class="section section--flush" aria-labelledby="first-title">
        <header class="section__header">
          <h2 id="first-title" class="heading margin-0">1. Architectural Foundation</h2>
          <p class="text-muted margin-0">The entry section directly beneath the page header.</p>
        </header>
        <div class="section__body">
          <p>
            The first section on a page often uses <code>.section--flush</code> to omit the top divider line and initial
            block padding, aligning seamlessly with the page lede or hero.
          </p>
        </div>
      </section>

      <!-- Section 2 (Standard with border divider) -->
      <section id="second-section" class="section" aria-labelledby="second-title">
        <header class="section__header">
          <h2 id="second-title" class="heading margin-0">2. Component Primitives</h2>
          <p class="text-muted margin-0">Notice the subtle top border divider and balanced vertical rhythm.</p>
        </header>
        <div class="section__body">
          <p>
            Subsequent sections introduce a subtle top boundary rule (<code>var(--border-subtle)</code>) and logical
            padding, cleanly separating topics as the reader navigates down the page or via Table of Contents anchors.
          </p>
          <div class="card card--bordered padding-md">
            <div class="cluster gap-sm align-items-center">
              <button type="button" class="button button--strong"><span>Save & Continue</span></button>
              <button type="button" class="button button--subtle"><span>Back</span></button>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
};
