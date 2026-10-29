import type { Meta, StoryObj } from '@storybook/html';

interface SpacingArgs {
  property: 'padding' | 'padding-inline' | 'padding-block' | 'margin' | 'margin-inline' | 'margin-block';
  step: '0' | '2xs' | 'xs' | 'sm' | 'default' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'breathe' | 'cushion';
  useShorthand: boolean;
  showBoxModel: boolean;
}

const meta: Meta<SpacingArgs> = {
  title: 'Utilities/Spacing & Padding',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
### Developer & Designer Notes: Logical Spacing & Padding Utilities

The **Spacing** utilities provide token-driven margin, padding, and gap classes built on CSS Logical Properties (\`padding-inline\`, \`padding-block\`, \`margin-inline\`, \`margin-block\`, \`padding-start\`, \`padding-end\`, \`margin-start\`, \`margin-end\`).

By using logical properties instead of physical directions (\`left\`, \`right\`), layouts naturally mirror across bidirectional writing modes (LTR & RTL) without requiring duplicate CSS rules or locale hacks.

Defined in \`utilities/spacing.css\` with direct parity in the Design For Humans blog (\`_margin.scss\` & \`_padding.scss\`).

---

#### 1. Core Architectural Principles
1. **Logical By Default:** Standardizes on inline (horizontal) and block (vertical) axes to ensure internationalization and bidirectional compatibility. Ergonomic aliases (\`.padding-start\`, \`.padding-end\`, \`.margin-start\`, \`.margin-end\`) provide clean logical alternatives to physical directions.
2. **Explicit \`-md\` & Default Parity:** Every base spacing class has an explicit \`-md\` synonym (e.g., \`.padding\` & \`.padding-md\`, \`.padding-start\` & \`.padding-start-md\`, \`.gap\` & \`.gap-md\`, \`.col-gap\` & \`.col-gap-md\`).
3. **Fine-Grained \`-xs\` Scale:** High-density UI layouts and tight micro-components leverage \`-xs\` tiers (\`var(--spacing-4, 0.25rem)\`) across margins, paddings, and gaps.
4. **Token Harmony:** Maps directly to Design For Humans spacing scale tokens (\`--spacing-2\`, \`--spacing-4\`, \`--spacing-8\`, \`--spacing-16\`, \`--spacing-32\`, \`--spacing-48\`, \`--spacing-64\`, \`--spacing-128\`, and fluid \`--spacing-breathe\`).
5. **Dual Syntax (Longhand & Shorthand):** Full descriptive classes (\`.padding-inline-sm\`) and compact shorthand aliases (\`.px-sm\`, \`.pl-xs\`, \`.mr-md\`) share identical zero-specificity (\`:where()\`) definitions.
6. **Zero-Specificity Reset (\`:where()\`)**: Written with 0-0-0 specificity, allowing local component tokens to override utilities cleanly when necessary.

---

#### 2. Canonical Semantic Markup Signatures
AI agents and developers MUST use the following semantic patterns:

\`\`\`html
<!-- 1. All-Sides Token Padding (Standard & Explicit -md) -->
<div class="card padding">
  <span>Standard 1rem (16px) padding all sides</span>
</div>
<div class="card padding-md">
  <span>Explicit -md synonym (1rem / 16px)</span>
</div>

<!-- 2. Fine-Grained XS Spacing -->
<div class="card padding-xs">
  <span>Tight 0.25rem (4px) micro-component padding</span>
</div>

<!-- 3. Directional Logical Aliases -->
<div class="card padding-start-md padding-end-xs">
  <span>Start: 1rem (16px), End: 0.25rem (4px)</span>
</div>

<!-- 4. Logical Inline & Block Padding -->
<div class="card padding-inline-md padding-block-sm">
  <span>Horizontal 1rem, Vertical 0.5rem</span>
</div>

<!-- 5. Shorthand Alias Parity (.px, .py, .pd, .mx, .my, .mg, .pl, .pr, .ml, .mr) -->
<div class="card px-lg py-sm">
  <span>Horizontal 2rem, Vertical 0.5rem (compact syntax)</span>
</div>

<!-- 6. Fluid Breathe Cushioning (Editorial) -->
<section class="padding-breathe">
  <h2>Fluid Hero Section</h2>
</section>
\`\`\`

---

#### 3. Token Scale & Shorthand Alias Map

| Longhand Class | Shorthand Alias | Token Reference | Computed Value | Ideal Usage |
| :--- | :--- | :--- | :--- | :--- |
| \`.padding-0\` | \`.pd-0\` | \`0\` | \`0px\` | Flush resets, edge-to-edge media |
| \`.padding-2xs\` | \`.pd-2xs\` | \`--spacing-2\` | \`0.125rem\` (2px) | Ultra-fine border clearance, micro offsets |
| \`.padding-xs\` | \`.pd-xs\` | \`--spacing-4\` | \`0.25rem\` (4px) | Tight badges, fine-grained icon offsets, dense tags |
| \`.padding-sm\` | \`.pd-sm\` | \`--spacing-8\` | \`0.5rem\` (8px) | Compact list items, badges, table cells |
| \`.padding\` / \`.padding-md\` | \`.pd\` / \`.pd-md\` | \`--spacing-16\` | \`1rem\` (16px) | Standard cards, panels, inputs (\`-md\` synonym) |
| \`.padding-lg\` | \`.pd-lg\` | \`--spacing-32\` | \`2rem\` (32px) | Spacious cards, dialog containers |
| \`.padding-xl\` | \`.pd-xl\` | \`--spacing-48\` | \`3rem\` (48px) | Prominent landmark padding, header blocks |
| \`.padding-2xl\` | \`.pd-2xl\` | \`--spacing-64\` | \`4rem\` (64px) | Hero callouts, spacious module containers |
| \`.padding-3xl\` | \`.pd-3xl\` | \`--spacing-128\` | \`8rem\` (128px) | Major tier section dividers, splash breaks |
| \`.padding-breathe\` | \`.pd-fl\` | \`--spacing-breathe\` | \`fluid clamp()\` | Editorial hero sections, page margins |
| \`.padding-cushion\` | \`.pd-cq\` | \`--spacing-cushion\` | \`fluid clamp() x2\` | Deep section dividers, landing splash |

---

#### 4. WCAG 2.2 Accessibility Guidelines
- **Target Size Clearance (WCAG 2.5.8):** Adequate margin and padding ensures interactive controls maintain the required 24×24px minimum bounding box without encroaching on neighboring tap targets.
- **Cognitive Density & Scannability:** Neurodivergent users benefit significantly from generous padding (\`.padding-lg\` or \`.padding-breathe\`), which reduces visual clutter and delineates distinct information zones.
        `,
      },
    },
  },
  args: {
    property: 'padding',
    step: 'default',
    useShorthand: false,
    showBoxModel: true,
  },
  argTypes: {
    property: {
      control: 'select',
      options: ['padding', 'padding-inline', 'padding-block', 'margin', 'margin-inline', 'margin-block'],
      description: 'Spacing direction / property axis',
    },
    step: {
      control: 'select',
      options: ['0', '2xs', 'xs', 'sm', 'default', 'md', 'lg', 'xl', '2xl', '3xl', 'breathe', 'cushion'],
      description: 'Token scale tier',
    },
    useShorthand: {
      control: 'boolean',
      description: 'Use shorthand alias (.pd, .px, .py, .mg, .mx, .my) instead of descriptive class',
    },
    showBoxModel: {
      control: 'boolean',
      description: 'Highlight margin (amber tint) and padding (green tint) box model zones',
    },
  },
};

export default meta;
type Story = StoryObj<SpacingArgs>;

/**
 * 1. Interactive Playground (Live Sandbox)
 */
export const Playground: Story = {
  render: (args) => {
    const shorthandPrefixMap: Record<string, string> = {
      padding: 'pd',
      'padding-inline': 'px',
      'padding-block': 'py',
      margin: 'mg',
      'margin-inline': 'mx',
      'margin-block': 'my',
    };

    const longhandPrefix = args.property;
    const shorthandPrefix = shorthandPrefixMap[args.property];

    let suffix = '';
    if (args.step === '0') suffix = '-0';
    else if (args.step === '2xs') suffix = '-2xs';
    else if (args.step === 'xs') suffix = '-xs';
    else if (args.step === 'sm') suffix = '-sm';
    else if (args.step === 'md') suffix = '-md';
    else if (args.step === 'lg') suffix = '-lg';
    else if (args.step === 'xl') suffix = '-xl';
    else if (args.step === '2xl') suffix = '-2xl';
    else if (args.step === '3xl') suffix = '-3xl';
    else if (args.step === 'breathe') suffix = '-breathe';
    else if (args.step === 'cushion') suffix = '-cushion';

    const activeClass = args.useShorthand
      ? `${shorthandPrefix}${suffix}`
      : `${longhandPrefix}${suffix}`;

    const boxModelStyles = args.showBoxModel
      ? `
        background-color: light-dark(#e6f4ea, #193224);
        outline: 1.5px dashed light-dark(#34a853, #81c995);
      `
      : '';

    return `
      <div class="sb-demo-section wrapper wrapper--md">
        <p class="sb-demo-desc">
          Live Sandbox: Test token tiers, direction axes, and shorthand aliases below.
        </p>
        <div class="sb-demo-stage sb-demo-stage--lg" style="background: repeating-linear-gradient(45deg, var(--surface), var(--surface) 8px, var(--surface-card) 8px, var(--surface-card) 16px);">
          <div class="card ${activeClass}" style="${boxModelStyles}; position: relative;">
            <div style="background: var(--surface-card); padding: var(--spacing-8); border-radius: var(--radius-sm); text-align: center;">
              <p class="font-weight-bold font-size-sm">Active Class: <code>.${activeClass}</code></p>
              <p class="font-size-xs text-muted margin-top-xs">
                Property: <code>${args.property}</code> &middot; Step: <code>${args.step}</code>
              </p>
            </div>
          </div>
        </div>
      </div>
    `;
  },
};

/**
 * 2. Padding Scale Hierarchy
 */
export const PaddingScaleHierarchy: Story = {
  render: () => `
    <div class="sb-demo-group wrapper wrapper--lg">
      <div class="sb-demo-section">
        <h3 class="sb-demo-heading">Padding Scale Comparison</h3>
        <p class="sb-demo-desc">
          Green-tinted inspection zones illustrate internal padding expansion across all 4 sides:
        </p>
      </div>

      <div class="grid grid--sm">
        <!-- 0 -->
        <article class="card">
          <header class="card__header">
            <h4 class="card__title font-size-sm">1. Zero (.padding-0 / .pd-0)</h4>
            <p class="card__subtitle font-size-xs">0px</p>
          </header>
          <div class="card__body padding-0" style="background: light-dark(#e6f4ea, #193224);">
            <div class="sb-demo-box sb-demo-box--sm" style="border-radius: 0;">Flush Content</div>
          </div>
        </article>

        <!-- xs (0.25rem) -->
        <article class="card">
          <header class="card__header">
            <h4 class="card__title font-size-sm">2. Extra Compact (.padding-xs / .pd-xs)</h4>
            <p class="card__subtitle font-size-xs">0.25rem (4px)</p>
          </header>
          <div class="card__body padding-xs" style="background: light-dark(#e6f4ea, #193224);">
            <div class="sb-demo-box sb-demo-box--sm">XS Content</div>
          </div>
        </article>

        <!-- sm (0.5rem) -->
        <article class="card">
          <header class="card__header">
            <h4 class="card__title font-size-sm">3. Compact (.padding-sm / .pd-sm)</h4>
            <p class="card__subtitle font-size-xs">0.5rem (8px)</p>
          </header>
          <div class="card__body padding-sm" style="background: light-dark(#e6f4ea, #193224);">
            <div class="sb-demo-box sb-demo-box--sm">Compact Content</div>
          </div>
        </article>

        <!-- default / md (1rem) -->
        <article class="card">
          <header class="card__header">
            <h4 class="card__title font-size-sm">4. Standard (.padding / .padding-md / .pd / .pd-md)</h4>
            <p class="card__subtitle font-size-xs">1rem (16px)</p>
          </header>
          <div class="card__body padding" style="background: light-dark(#e6f4ea, #193224);">
            <div class="sb-demo-box sb-demo-box--sm">Standard Content</div>
          </div>
        </article>

        <!-- lg (2rem) -->
        <article class="card">
          <header class="card__header">
            <h4 class="card__title font-size-sm">5. Generous (.padding-lg / .pd-lg)</h4>
            <p class="card__subtitle font-size-xs">2rem (32px)</p>
          </header>
          <div class="card__body padding-lg" style="background: light-dark(#e6f4ea, #193224);">
            <div class="sb-demo-box sb-demo-box--sm">Spacious Content</div>
          </div>
        </article>
      </div>
    </div>
  `,
};

/**
 * 3. Logical Directional Spacing
 */
export const LogicalDirectionalSpacing: Story = {
  render: () => `
    <div class="sb-demo-group wrapper wrapper--lg">
      <div class="sb-demo-section">
        <h3 class="sb-demo-heading">Logical Axis Distribution (Inline vs Block)</h3>
        <p class="sb-demo-desc">
          Controlling horizontal (<code>-inline</code>) and vertical (<code>-block</code>) padding independently:
        </p>
      </div>

      <div class="grid grid--sm">
        <!-- Inline Only -->
        <div class="card padding stack">
          <h4 class="font-size-xs font-weight-bold">Horizontal Only: <code>.padding-inline-lg</code> (<code>.px-lg</code>)</h4>
          <div class="padding-inline-lg" style="background: light-dark(#e6f4ea, #193224); outline: 1px dashed #34a853;">
            <div class="sb-demo-box sb-demo-box--sm">2rem Left &amp; Right</div>
          </div>
        </div>

        <!-- Block Only -->
        <div class="card padding stack">
          <h4 class="font-size-xs font-weight-bold">Vertical Only: <code>.padding-block-lg</code> (<code>.py-lg</code>)</h4>
          <div class="padding-block-lg" style="background: light-dark(#e6f4ea, #193224); outline: 1px dashed #34a853;">
            <div class="sb-demo-box sb-demo-box--sm">2rem Top &amp; Bottom</div>
          </div>
        </div>

        <!-- Asymmetric Mix -->
        <div class="card padding stack">
          <h4 class="font-size-xs font-weight-bold">Asymmetric: <code>.px-lg.py-sm</code></h4>
          <div class="padding-inline-lg padding-block-sm" style="background: light-dark(#e6f4ea, #193224); outline: 1px dashed #34a853;">
            <div class="sb-demo-box sb-demo-box--sm">Horizontal 2rem, Vertical 0.5rem</div>
          </div>
        </div>
      </div>
    </div>
  `,
};

/**
 * 4. Margin Offsets
 */
export const MarginOffsets: Story = {
  render: () => `
    <div class="sb-demo-group wrapper wrapper--lg">
      <div class="sb-demo-section">
        <h3 class="sb-demo-heading">Margin Spacing Utilities</h3>
        <p class="sb-demo-desc">
          Amber-tinted inspection zones illustrate external margins separating containers:
        </p>
      </div>

      <div class="card padding">
        <div style="background: light-dark(#fef7e0, #382e18); padding: var(--spacing-8); outline: 1px dashed #fbbc04;">
          <p class="font-size-xs text-muted font-weight-bold">Amber Zone = Outer Margin Clearance</p>
          <div class="card margin-top-lg margin-bottom-sm padding-sm" style="background: var(--surface-card);">
            <p class="font-size-xs"><code>.margin-top-lg.margin-bottom-sm</code> (<code>.mt-lg.mb-sm</code>)</p>
          </div>
        </div>
      </div>
    </div>
  `,
};

/**
 * 5. Bidirectional RTL Demonstration
 */
export const BidirectionalRTLDemo: Story = {
  render: () => `
    <div class="sb-demo-group wrapper wrapper--lg">
      <div class="sb-demo-section">
        <h3 class="sb-demo-heading">Bidirectional LTR & RTL Natural Mirroring</h3>
        <p class="sb-demo-desc">
          Because <code>.padding-inline</code> relies on CSS logical properties, it flips automatically in Right-To-Left (RTL) mode with zero extra styles:
        </p>
      </div>

      <div class="grid grid--sm">
        <!-- LTR -->
        <div class="card padding stack" dir="ltr">
          <span class="sb-demo-tag font-size-xs">LTR Mode</span>
          <div class="card padding-inline-lg padding-block-sm">
            <p class="font-size-sm"><strong>Left-To-Right:</strong> Start is on the left.</p>
          </div>
        </div>

        <!-- RTL -->
        <div class="card padding stack" dir="rtl">
          <span class="sb-demo-tag font-size-xs">RTL Mode (dir="rtl")</span>
          <div class="card padding-inline-lg padding-block-sm">
            <p class="font-size-sm"><strong>Right-To-Left:</strong> Start is on the right.</p>
          </div>
        </div>
      </div>
    </div>
  `,
};

/**
 * 6. Real-World Recipe: Card Density Variations
 */
export const CardDensityVariations: Story = {
  render: () => `
    <div class="sb-demo-group wrapper wrapper--lg">
      <div class="sb-demo-section">
        <h3 class="sb-demo-heading">Real-World Pattern: Card Density Tiers</h3>
        <p class="sb-demo-desc">
          Applying spacing utility classes directly to cards to configure information density:
        </p>
      </div>

      <div class="grid grid--sm">
        <!-- Compact -->
        <article class="card padding-sm stack" style="--gap: var(--spacing-4);">
          <header class="card__header">
            <h4 class="card__title font-size-sm">Compact Density</h4>
            <span class="sb-demo-tag">Dense</span>
          </header>
          <div class="card__body">
            <p class="font-size-xs text-muted">Using .padding-sm for data-dense grids.</p>
          </div>
        </article>

        <!-- Standard -->
        <article class="card padding stack" style="--gap: var(--spacing-8);">
          <header class="card__header">
            <h4 class="card__title font-size-sm">Standard Density</h4>
            <span class="status status--accent status--sm"><span class="status__text">Default</span></span>
          </header>
          <div class="card__body">
            <p class="font-size-xs text-muted">Using .padding for general application content.</p>
          </div>
        </article>

        <!-- Spacious -->
        <article class="card padding-lg stack" style="--gap: var(--spacing-12);">
          <header class="card__header">
            <h4 class="card__title font-size-sm">Spacious Density</h4>
            <span class="sb-demo-tag">Relaxed</span>
          </header>
          <div class="card__body">
            <p class="font-size-xs text-muted">Using .padding-lg for editorial highlights.</p>
          </div>
        </article>
      </div>
    </div>
  `,
};

/**
 * 7. Comprehensive State & Audit Matrix
 */
export const StateMatrix: Story = {
  render: () => `
    <div class="sb-demo-group wrapper wrapper--lg">
      <div class="sb-demo-section">
        <h3 class="sb-demo-heading">Automated Accessibility & State Verification Matrix</h3>
        <p class="sb-demo-desc">
          Consolidated snapshot testing across all spacing and padding utility tiers.
        </p>
      </div>

      <div class="grid grid--sm">
        <div class="card padding-xs">
          <span class="font-size-xs">.padding-xs</span>
        </div>
        <div class="card padding-sm">
          <span class="font-size-xs">.padding-sm</span>
        </div>
        <div class="card padding-md">
          <span class="font-size-xs">.padding-md (.padding)</span>
        </div>
        <div class="card padding-lg">
          <span class="font-size-xs">.padding-lg</span>
        </div>
        <div class="card padding-start-md padding-end-xs">
          <span class="font-size-xs">.padding-start-md.padding-end-xs</span>
        </div>
        <div class="card padding-inline-lg padding-block-sm">
          <span class="font-size-xs">.px-lg.py-sm</span>
        </div>
      </div>
    </div>
  `,
};
