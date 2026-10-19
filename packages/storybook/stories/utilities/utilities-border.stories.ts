import type { Meta, StoryObj } from '@storybook/html';

interface BorderArgs {
  size: 'none' | 'sm' | 'default' | 'md' | 'lg';
  style: 'solid' | 'dashed' | 'dotted' | 'double';
  color: 'default' | 'muted' | 'quiet' | 'accent' | 'success' | 'warning' | 'danger';
  radius: 'none' | 'sm' | 'default' | 'md' | 'lg' | 'round';
}

const meta: Meta<BorderArgs> = {
  title: 'Utilities/Border & Radius',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
### Developer & Designer Notes: Border, Stroke & Corner Radius Utilities

The **Border & Radius** utilities provide zero-specificity (\`:where()\`) classes for strokes, dividing lines, color variants, and rounded corner geometry.

Designed in full compliance with **WCAG 2.2 Level AA / AAA** standards:
- **1.4.11 Non-Text Contrast:** Boundaries and outlines maintain at least a 3:1 contrast ratio against adjacent surfaces.
- **Forced Colors Mode:** Borders and rules automatically adapt to system-defined high-contrast highlight colors.

Defined in \`utilities/border.css\`.

---

#### 1. Core Architectural Principles
1. **Token Synchronization:** Stroke widths map directly to Design For Humans tokens (\`--border-width-1\`, \`--border-width-2\`, \`--border-width-4\`). Corner radii map to \`--radius-sm\`, \`--radius\`, \`--radius-md\`, \`--radius-lg\`, and \`--radius-round\`.
2. **Dual Syntax (Longhand & Shorthand):** Supports both expressive classes (\`.border-sm\`, \`.radius-round\`) and compact utility aliases (\`.bd-sm\`, \`.rounded-full\`).
3. **Directional Sides:** Granular top (\`.border-top\` / \`.bt\`), bottom (\`.border-bottom\` / \`.bb\`), left (\`.border-left\` / \`.bl\`), and right (\`.border-right\` / \`.br\`) stroke classes.
4. **Zero-Specificity Reset (\`:where()\`)**: Written with 0-0-0 specificity.

---

#### 2. Canonical Semantic Markup Signatures
AI agents and developers MUST use the following semantic patterns:

\`\`\`html
<!-- 1. Standard Bordered Card with Token Radius -->
<div class="card bd-sm rounded-md padding">
  <span>1px border with medium 4px rounded corners</span>
</div>

<!-- 2. Block Callout with Accent Leading Border -->
<div class="card bl-md bd-solid padding-sm" style="border-left-color: var(--border-color-accent);">
  <p class="font-weight-bold">Important Notice</p>
</div>

<!-- 3. Pill / Full-Round Action Badge -->
<span class="badge bd-sm rounded-full padding-inline-sm">
  <span>Rounded Pill Badge</span>
</span>
\`\`\`

---

#### 3. Token Scale & Shorthand Alias Map

| Longhand Class | Shorthand Alias | Token Reference | Computed Value | Description |
| :--- | :--- | :--- | :--- | :--- |
| \`.border-sm\` | \`.bd-sm\` | \`--border-width-1\` | \`1px solid\` | Hairline card border |
| \`.border\` | \`.bd\` | \`--border-width\` | \`1px solid\` | Standard element stroke |
| \`.border-md\` | \`.bd-md\` | \`--border-width-2\` | \`2px solid\` | Focus rings, active tabs |
| \`.border-lg\` | \`.bd-lg\` | \`--border-width-4\` | \`4px solid\` | Blockquote sidebars, heavy accents |
| \`.radius-sm\` | \`.rounded-sm\` | \`--radius-sm\` | \`2px\` | Compact badge / input corners |
| \`.radius\` | \`.rounded\` | \`--radius\` | \`4px\` | Standard button / card corners |
| \`.radius-md\` | \`.rounded-md\` | \`--radius-md\` | \`6px\` | Dialog / modal card corners |
| \`.radius-lg\` | \`.rounded-lg\` | \`--radius-lg\` | \`8px\` | Spacious surface containers |
| \`.radius-round\`| \`.rounded-full\` | \`--radius-round\` | \`9999px\` | Circular avatars, pill badges |

---

#### 4. WCAG 2.2 Accessibility Guidelines
- **Perceivable Boundaries (WCAG 1.4.11):** Bounding boxes for form controls and interactive items must be visibly distinct against page backgrounds. Use \`.border-muted\` or \`.border-sm\` to provide sufficient boundary contrast.
        `,
      },
    },
  },
  args: {
    size: 'sm',
    style: 'solid',
    color: 'default',
    radius: 'default',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['none', 'sm', 'default', 'md', 'lg'],
      description: 'Border stroke thickness (.border-*)',
    },
    style: {
      control: 'select',
      options: ['solid', 'dashed', 'dotted', 'double'],
      description: 'Border stroke style (.border-*)',
    },
    color: {
      control: 'select',
      options: ['default', 'muted', 'quiet', 'accent', 'success', 'warning', 'danger'],
      description: 'Border color tier (.border-*)',
    },
    radius: {
      control: 'select',
      options: ['none', 'sm', 'default', 'md', 'lg', 'round'],
      description: 'Corner radius rounding tier (.radius-*)',
    },
  },
};

export default meta;
type Story = StoryObj<BorderArgs>;

/**
 * 1. Interactive Playground (Live Sandbox)
 */
export const Playground: Story = {
  render: (args) => {
    const sizeClass = args.size === 'none' ? 'border-none' : args.size === 'default' ? 'border' : `border-${args.size}`;
    const styleClass = `border-${args.style}`;
    const colorClass = args.color === 'default' ? '' : `border-${args.color}`;
    const radiusClass = args.radius === 'default' ? 'radius' : `radius-${args.radius}`;

    const classes = ['card', sizeClass, styleClass, colorClass, radiusClass, 'padding'].filter(Boolean).join(' ');

    return `
      <div class="sb-demo-section wrapper wrapper--md">
        <p class="sb-demo-desc">
          Live Sandbox: Test stroke thickness, dashed/dotted styles, semantic colors, and corner radius geometry below.
        </p>
        <div class="sb-demo-stage sb-demo-stage--lg" style="display: flex; justify-content: center; align-items: center; min-block-size: 10rem;">
          <div class="${classes}" style="background: var(--surface-card); text-align: center; min-inline-size: 16rem;">
            <p class="font-weight-bold font-size-sm">Active Border Box</p>
            <p class="font-size-xs color-muted margin-top-xs">
              Size: <code>${args.size}</code> &middot; Style: <code>${args.style}</code> &middot; Radius: <code>${args.radius}</code>
            </p>
          </div>
        </div>
      </div>
    `;
  },
};

/**
 * 2. Border Stroke Thickness Scale
 */
export const StrokeThicknessScale: Story = {
  render: () => `
    <div class="sb-demo-group wrapper wrapper--lg">
      <div class="sb-demo-section">
        <h3 class="sb-demo-heading">Stroke Thickness Scale</h3>
        <p class="sb-demo-desc">
          Comparing available border stroke widths:
        </p>
      </div>

      <div class="grid grid--sm">
        <div class="card border-sm padding stack" style="--gap: var(--spacing-4);">
          <span class="badge badge--subtle badge--sm">1px</span>
          <h4 class="font-size-sm font-weight-bold">.border-sm (1px)</h4>
          <p class="font-size-xs color-muted">Standard subtle perimeter stroke.</p>
        </div>

        <div class="card border-md padding stack" style="--gap: var(--spacing-4);">
          <span class="badge badge--accent badge--sm">2px</span>
          <h4 class="font-size-sm font-weight-bold">.border-md (2px)</h4>
          <p class="font-size-xs color-muted">Medium emphasize, tabs, selected states.</p>
        </div>

        <div class="card border-lg padding stack" style="--gap: var(--spacing-4);">
          <span class="badge badge--success badge--sm">4px</span>
          <h4 class="font-size-sm font-weight-bold">.border-lg (4px)</h4>
          <p class="font-size-xs color-muted">Heavy blockquote or callout stroke.</p>
        </div>
      </div>
    </div>
  `,
};

/**
 * 3. Corner Radius Geometry Scale
 */
export const CornerRadiusScale: Story = {
  render: () => `
    <div class="sb-demo-group wrapper wrapper--lg">
      <div class="sb-demo-section">
        <h3 class="sb-demo-heading">Corner Radius Scale</h3>
        <p class="sb-demo-desc">
          Curvature progression from sharp right angles to full rounded pills:
        </p>
      </div>

      <div class="cluster" style="--gap: var(--spacing-16);">
        <div class="card border-sm radius-none padding-sm text-center" style="min-inline-size: 7rem;">
          <p class="font-size-xs font-weight-bold">.radius-none</p>
          <span class="font-size-xs color-muted">0px</span>
        </div>

        <div class="card border-sm radius-sm padding-sm text-center" style="min-inline-size: 7rem;">
          <p class="font-size-xs font-weight-bold">.radius-sm</p>
          <span class="font-size-xs color-muted">2px</span>
        </div>

        <div class="card border-sm radius padding-sm text-center" style="min-inline-size: 7rem;">
          <p class="font-size-xs font-weight-bold">.radius</p>
          <span class="font-size-xs color-muted">4px</span>
        </div>

        <div class="card border-sm radius-md padding-sm text-center" style="min-inline-size: 7rem;">
          <p class="font-size-xs font-weight-bold">.radius-md</p>
          <span class="font-size-xs color-muted">6px</span>
        </div>

        <div class="card border-sm radius-lg padding-sm text-center" style="min-inline-size: 7rem;">
          <p class="font-size-xs font-weight-bold">.radius-lg</p>
          <span class="font-size-xs color-muted">8px</span>
        </div>

        <div class="card border-sm radius-round padding-sm text-center" style="min-inline-size: 7rem;">
          <p class="font-size-xs font-weight-bold">.radius-round</p>
          <span class="font-size-xs color-muted">Pill 9999px</span>
        </div>
      </div>
    </div>
  `,
};

/**
 * 4. Stroke Style Variants (Dashed, Dotted, Double)
 */
export const StrokeStyleVariants: Story = {
  render: () => `
    <div class="sb-demo-group wrapper wrapper--lg">
      <div class="sb-demo-section">
        <h3 class="sb-demo-heading">Stroke Styles (Solid, Dashed, Dotted, Double)</h3>
        <p class="sb-demo-desc">
          Configuring border stroke patterns for placeholders and subtle dividers:
        </p>
      </div>

      <div class="grid grid--xs">
        <div class="card border-sm border-solid padding-sm text-center">
          <p class="font-size-xs font-weight-bold">.border-solid</p>
          <span class="font-size-xs color-muted">Standard</span>
        </div>

        <div class="card border-sm border-dashed padding-sm text-center">
          <p class="font-size-xs font-weight-bold">.border-dashed</p>
          <span class="font-size-xs color-muted">Upload Dropzone</span>
        </div>

        <div class="card border-sm border-dotted padding-sm text-center">
          <p class="font-size-xs font-weight-bold">.border-dotted</p>
          <span class="font-size-xs color-muted">Tooltip Anchor</span>
        </div>

        <div class="card border-lg border-double padding-sm text-center">
          <p class="font-size-xs font-weight-bold">.border-double</p>
          <span class="font-size-xs color-muted">Decorative</span>
        </div>
      </div>
    </div>
  `,
};

/**
 * 5. Real-World Recipe: Callout Banner with Leading Border
 */
export const CalloutBannerRecipe: Story = {
  render: () => `
    <div class="sb-demo-group wrapper wrapper--md">
      <div class="sb-demo-section">
        <h3 class="sb-demo-heading">Real-World Pattern: Accent Callout Banner</h3>
        <p class="sb-demo-desc">
          Using <code>.bl-lg</code> (4px left border) to create accessible editorial callout boxes:
        </p>
      </div>

      <div class="stack gap">
        <!-- Accent Info -->
        <div class="card border-none padding-sm" style="border-inline-start: 4px solid var(--border-color-accent); background: var(--surface-card);">
          <div class="inline" style="--gap: var(--spacing-8);">
            <svg class="icon color-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
            <p class="font-weight-bold font-size-sm">Figma Variables Sync</p>
          </div>
          <p class="font-size-xs color-muted margin-top-xs">
            Exported to both Tokens Studio and Native Figma Variables collections automatically.
          </p>
        </div>

        <!-- Success Complete -->
        <div class="card border-none padding-sm" style="border-inline-start: 4px solid var(--border-color-success); background: var(--surface-card);">
          <div class="inline" style="--gap: var(--spacing-8);">
            <svg class="icon color-success" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <p class="font-weight-bold font-size-sm">WCAG 2.2 AAA Audit Passed</p>
          </div>
          <p class="font-size-xs color-muted margin-top-xs">
            All 92 automated axe rules evaluated with zero accessibility violations.
          </p>
        </div>
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
          Consolidated snapshot testing across all border sizes, styles, and radii.
        </p>
      </div>

      <div class="grid grid--sm">
        <div class="card border-sm padding-sm"><span class="font-size-xs">.border-sm</span></div>
        <div class="card border-md padding-sm"><span class="font-size-xs">.border-md</span></div>
        <div class="card border-sm border-dashed padding-sm"><span class="font-size-xs">.border-dashed</span></div>
        <div class="card border-sm radius-round padding-sm"><span class="font-size-xs">.radius-round</span></div>
      </div>
    </div>
  `,
};
