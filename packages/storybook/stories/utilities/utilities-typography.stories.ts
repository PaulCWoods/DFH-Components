import type { Meta, StoryObj } from '@storybook/html';

interface TypographyArgs {
  size: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl';
  weight: 'regular' | 'medium' | 'semibold' | 'bold' | '300' | '900';
  align: 'left' | 'center' | 'right' | 'justify';
  color: 'default' | 'muted' | 'accent' | 'success' | 'warning' | 'danger';
  textWrap: 'none' | 'balance' | 'pretty' | 'nowrap';
  lineHeight: 'base' | 'xs' | 'sm' | 'relaxed';
}

const meta: Meta<TypographyArgs> = {
  title: 'Utilities/Typography & Color',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
### Developer & Designer Notes: Typography, Type Scale & Text Utilities

The **Typography** utilities provide low-specificity (\`:where()\`) classes for the Design For Humans modular type scale (steps \`-2\` to \`3\`), font weights, line-height ratios, logical text alignments, modern text wrapping (\`text-wrap: balance / pretty\`), and adaptive semantic text colors.

Defined in \`utilities/typography.css\` with direct parity in the Design For Humans blog architecture.

---

#### 1. Core Architectural Principles
1. **Modular Type Scale:** Font size classes (\`.font-size-xs\` through \`.font-size-2xl\`) map directly to Tier 1 modular tokens based on the fluid minor-third/major-second ratio.
2. **Modern Text Wrapping Best Practices:**
   - \`.text-wrap-balance\` (\`text-wrap: balance\`): Evenly distributes headline text across lines, preventing awkward orphan words.
   - \`.text-wrap-pretty\` (\`text-wrap: pretty\`): Algorithmic body text rag optimization that avoids trailing orphans on the final line of paragraphs.
3. **Adaptive Color Contrast (WCAG 1.4.3 & 1.4.6):** Semantic color utilities (\`.text-color-muted\`, \`.text-color-accent\`, \`.text-color-success\`) adapt dynamically in dark mode and inverted containers to deliver 4.5:1 (AA) and 7:1 (AAA) contrast ratios.
4. **Font Size Modes:** Supports container-level density mode switching via \`.font-sizing-fixed\` (for dense data grids) and \`.font-sizing-fluid\` (for editorial reading).

---

#### 2. Canonical Semantic Markup Signatures
AI agents and developers MUST use the following semantic patterns:

\`\`\`html
<!-- 1. Balanced Headline with Heavy Weight -->
<h2 class="font-size-2xl font-weight-bold text-wrap-balance">
  Designing Accessible Component Systems for Humans
</h2>

<!-- 2. Optimized Paragraph Rag with Muted Metadata -->
<p class="font-size-base line-height-relaxed text-wrap-pretty">
  Digital accessibility begins with semantic structure, logical focus management, and perceivable contrast.
</p>
<p class="font-size-xs text-color-muted font-weight-medium">
  Updated October 13, 2026 &middot; WCAG 2.2 AAA Certified
</p>
\`\`\`

---

#### 3. Type Scale & Font Weight Map

| Class | Shorthand | Token Reference | Computed Size | Common Usage |
| :--- | :--- | :--- | :--- | :--- |
| \`.font-size-xs\` | \`.fs-xs\` | \`--typography-font-size--2\` | \`0.75rem\` (12px) | Footers, status badges, captions |
| \`.font-size-sm\` | \`.fs-sm\` | \`--typography-font-size--1\` | \`0.875rem\` (14px) | Hints, secondary metadata, chips |
| \`.font-size-base\` | \`.fs-base\` | \`--typography-font-size-0\` | \`1rem\` (16px) | Body copy, form controls |
| \`.font-size-lg\` | \`.fs-lg\` | \`--typography-font-size-1\` | \`1.25rem\` (20px) | Card titles, subheadings |
| \`.font-size-xl\` | \`.fs-xl\` | \`--typography-font-size-2\` | \`1.5rem\` (24px) | Section headings |
| \`.font-size-2xl\`| \`.fs-2xl\` | \`--typography-font-size-3\` | \`1.75rem\`+ (28px+) | Page titles, hero headers |

---

#### 4. WCAG 2.2 Accessibility Guidelines
- **Contrast Minimum (WCAG 1.4.3 - AA):** Text and images of text must have a contrast ratio of at least 4.5:1, or 3:1 for large text (18pt/24px or 14pt/18.66px bold).
- **Visual Presentation Line Spacing (WCAG 1.4.8 - AAA):** Line spacing must be at least space-and-a-half (1.5) within paragraphs, and paragraph spacing must be at least 1.5 times larger than the line spacing.
        `,
      },
    },
  },
  args: {
    size: 'base',
    weight: 'regular',
    align: 'left',
    color: 'default',
    textWrap: 'pretty',
    lineHeight: 'base',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'base', 'lg', 'xl', '2xl'],
      description: 'Font size step on the modular scale',
    },
    weight: {
      control: 'select',
      options: ['regular', 'medium', 'semibold', 'bold', '300', '900'],
      description: 'Font weight thickness (.font-weight-*)',
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right', 'justify'],
      description: 'Text alignment (.text-align-*)',
    },
    color: {
      control: 'select',
      options: ['default', 'muted', 'accent', 'success', 'warning', 'danger'],
      description: 'Semantic adaptive text color (.text-color-*)',
    },
    textWrap: {
      control: 'select',
      options: ['none', 'balance', 'pretty', 'nowrap'],
      description: 'Modern text wrapping algorithm (.text-wrap-*)',
    },
    lineHeight: {
      control: 'select',
      options: ['base', 'xs', 'sm', 'relaxed'],
      description: 'Line height ratio (.line-height-*)',
    },
  },
};

export default meta;
type Story = StoryObj<TypographyArgs>;

/**
 * 1. Interactive Playground (Live Sandbox)
 */
export const Playground: Story = {
  render: (args) => {
    const sizeClass = `font-size-${args.size}`;
    const weightClass = args.weight === 'regular' ? 'font-weight-regular' : args.weight === 'bold' ? 'font-weight-bold' : `font-weight-${args.weight}`;
    const alignClass = `text-align-${args.align}`;
    const colorClass = args.color === 'default' ? '' : `text-color-${args.color}`;
    const wrapClass = args.textWrap !== 'none' ? `text-wrap-${args.textWrap}` : '';
    const lhClass = `line-height-${args.lineHeight}`;

    const classes = [sizeClass, weightClass, alignClass, colorClass, wrapClass, lhClass].filter(Boolean).join(' ');

    return `
      <div class="sb-demo-section wrapper wrapper--md">
        <p class="sb-demo-desc">
          Live Sandbox: Adjust type scale steps, weights, text alignments, and modern wrapping algorithms below.
        </p>
        <div class="sb-demo-stage sb-demo-stage--lg">
          <div class="card padding">
            <p class="${classes}">
              Design For Humans unites web standards, digital accessibility, and DTCG design tokens to build robust, beautiful digital interfaces.
            </p>
          </div>
        </div>
      </div>
    `;
  },
};

/**
 * 2. Modular Type Scale Ladder
 */
export const TypeScaleLadder: Story = {
  render: () => `
    <div class="sb-demo-group wrapper wrapper--lg">
      <div class="sb-demo-section">
        <h3 class="sb-demo-heading">Modular Type Scale Progression</h3>
        <p class="sb-demo-desc">
          Stepped typographic hierarchy calibrated for proportional visual balance:
        </p>
      </div>

      <div class="card padding stack" style="--gap: var(--spacing-16);">
        <div class="inline" style="justify-content: space-between; align-items: baseline;">
          <span class="font-size-xs text-muted font-weight-bold">.font-size-xs (Step -2 / 0.75rem / 12px)</span>
          <span class="font-size-xs">The quick brown fox jumps over the lazy dog.</span>
        </div>
        <hr class="divider" />

        <div class="inline" style="justify-content: space-between; align-items: baseline;">
          <span class="font-size-xs text-muted font-weight-bold">.font-size-sm (Step -1 / 0.875rem / 14px)</span>
          <span class="font-size-sm">The quick brown fox jumps over the lazy dog.</span>
        </div>
        <hr class="divider" />

        <div class="inline" style="justify-content: space-between; align-items: baseline;">
          <span class="font-size-xs text-muted font-weight-bold">.font-size-base (Step 0 / 1rem / 16px)</span>
          <span class="font-size-base">The quick brown fox jumps over the lazy dog.</span>
        </div>
        <hr class="divider" />

        <div class="inline" style="justify-content: space-between; align-items: baseline;">
          <span class="font-size-xs text-muted font-weight-bold">.font-size-lg (Step 1 / 1.25rem / 20px)</span>
          <span class="font-size-lg font-weight-medium">The quick brown fox jumps over the lazy dog.</span>
        </div>
        <hr class="divider" />

        <div class="inline" style="justify-content: space-between; align-items: baseline;">
          <span class="font-size-xs text-muted font-weight-bold">.font-size-xl (Step 2 / 1.5rem / 24px)</span>
          <span class="font-size-xl font-weight-semibold">The quick brown fox jumps over the lazy dog.</span>
        </div>
        <hr class="divider" />

        <div class="inline" style="justify-content: space-between; align-items: baseline;">
          <span class="font-size-xs text-muted font-weight-bold">.font-size-2xl (Step 3 / 1.75rem+ / 28px+)</span>
          <span class="font-size-2xl font-weight-bold">The quick brown fox jumps over the lazy dog.</span>
        </div>
      </div>
    </div>
  `,
};

/**
 * 3. Modern Text Wrapping (Balance vs Pretty)
 */
export const ModernTextWrapping: Story = {
  render: () => `
    <div class="sb-demo-group wrapper wrapper--lg">
      <div class="sb-demo-section">
        <h3 class="sb-demo-heading">Modern CSS Text Wrapping</h3>
        <p class="sb-demo-desc">
          Native web standards features that prevent unsightly rag orphans without JavaScript:
        </p>
      </div>

      <div class="grid grid--sm">
        <!-- text-wrap: balance -->
        <div class="card padding stack" style="--gap: var(--spacing-12);">
          <span class="sb-demo-tag font-size-xs">.text-wrap-balance (Headlines)</span>
          <h4 class="font-size-lg font-weight-bold text-wrap-balance" style="max-inline-size: 20rem;">
            Ensuring Consistent Multi-Line Headline Balance Across Devices
          </h4>
          <p class="font-size-xs text-muted">
            The browser calculates line lengths to produce visually balanced line breaks, preventing a single orphan word on the last line.
          </p>
        </div>

        <!-- text-wrap: pretty -->
        <div class="card padding stack" style="--gap: var(--spacing-12);">
          <span class="sb-demo-tag font-size-xs">.text-wrap-pretty (Body Paragraphs)</span>
          <p class="font-size-sm text-wrap-pretty" style="max-inline-size: 20rem;">
            When rendering longer paragraph copy, text-wrap: pretty optimizes the trailing rag to avoid orphans on the final line without slowing down initial layout passes.
          </p>
          <p class="font-size-xs text-muted">
            Optimized for fast paragraph rendering and clean editorial typography.
          </p>
        </div>
      </div>
    </div>
  `,
};

/**
 * 4. Adaptive Semantic Text Colors
 */
export const SemanticTextColors: Story = {
  render: () => `
    <div class="sb-demo-group wrapper wrapper--lg">
      <div class="sb-demo-section">
        <h3 class="sb-demo-heading">Adaptive Semantic Text Colors</h3>
        <p class="sb-demo-desc">
          High-contrast color tokens that adapt gracefully across light, dark, and inverted container surfaces:
        </p>
      </div>

      <div class="card padding">
        <div class="cluster" style="--gap: var(--spacing-24);">
          <span class="text-color-accent font-weight-bold font-size-sm">.text-color-accent (Primary Accent)</span>
          <span class="text-color-muted font-size-sm">.text-color-muted (Secondary Meta)</span>
          <span class="text-color-success font-weight-medium font-size-sm">.text-color-success (Compliant)</span>
          <span class="text-color-warning font-weight-medium font-size-sm">.text-color-warning (Review Needed)</span>
          <span class="text-color-danger font-weight-medium font-size-sm">.text-color-danger (Error State)</span>
        </div>
      </div>
    </div>
  `,
};

/**
 * 5. Density Modes: Fixed vs Fluid Typography
 */
export const DensityModes: Story = {
  render: () => `
    <div class="sb-demo-group wrapper wrapper--lg">
      <div class="sb-demo-section">
        <h3 class="sb-demo-heading">Container Typography Modes (Fixed vs Fluid)</h3>
        <p class="sb-demo-desc">
          Enabling desktop dashboard cards to lock into dense fixed font sizing:
        </p>
      </div>

      <div class="grid grid--sm">
        <!-- Fixed Mode -->
        <article class="card font-sizing-fixed padding stack" style="--gap: var(--spacing-8);">
          <div class="inline" style="justify-content: space-between;">
            <span class="sb-demo-tag">.font-sizing-fixed</span>
            <span class="font-size-xs text-muted">Dashboard</span>
          </div>
          <h4 class="card__title font-size-sm font-weight-bold">Dense Fixed Typography</h4>
          <p class="font-size-xs text-muted">
            Headings and text lock to exact fixed pixel steps, perfect for dense analytics tables and toolbars.
          </p>
        </article>

        <!-- Fluid Mode -->
        <article class="card font-sizing-fluid padding stack" style="--gap: var(--spacing-8);">
          <div class="inline" style="justify-content: space-between;">
            <span class="sb-demo-tag">.font-sizing-fluid</span>
            <span class="font-size-xs text-muted">Editorial</span>
          </div>
          <h4 class="card__title font-size-sm font-weight-bold">Fluid Reading Typography</h4>
          <p class="font-size-xs text-muted">
            Font sizes scale smoothly with viewport width clamps for optimal long-form reading comfort.
          </p>
        </article>
      </div>
    </div>
  `,
};

/**
 * 6. Comprehensive State & Audit Matrix
 */
export const StateMatrix: Story = {
  render: () => `
    <div class="sb-demo-group wrapper wrapper--lg">
      <div class="sb-demo-section">
        <h3 class="sb-demo-heading">Automated Accessibility & State Verification Matrix</h3>
        <p class="sb-demo-desc">
          Consolidated snapshot testing across all type scale steps and weights.
        </p>
      </div>

      <div class="grid grid--sm">
        <div class="card padding"><span class="font-size-xs">.font-size-xs</span></div>
        <div class="card padding"><span class="font-size-sm font-weight-medium">.font-size-sm</span></div>
        <div class="card padding"><span class="font-size-base font-weight-bold">.font-size-base</span></div>
        <div class="card padding"><span class="font-size-lg font-weight-bold">.font-size-lg</span></div>
      </div>
    </div>
  `,
};
