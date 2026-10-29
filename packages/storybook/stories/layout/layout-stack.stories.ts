import type { Meta, StoryObj } from '@storybook/html';

interface StackArgs {
  gap: 'tight' | 'compact' | 'default' | 'comfortable' | 'cushioned';
  align: 'stretch' | 'flex-start' | 'center' | 'flex-end';
  modifier: 'none' | 'stack--tight' | 'stack--cushioned' | 'stack--ruled';
  inspectGap: boolean;
  itemCount: number;
}

const meta: Meta<StackArgs> = {
  title: 'Layout/Stack',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
### Developer & Designer Notes: Stack Layout Primitive (\`.stack\`)

The **Stack** primitive is a 1-dimensional vertical layout orchestrator that injects token-driven space between child elements. 
Inspired by **Every Layout** (Heydon Pickering & Andy Bell) and modern Web Standards, the Stack solves the fundamental problem of vertical flow without resorting to arbitrary margin overrides or wrapper-div bloat.

Defined in \`layout/stack.css\`.

---

#### 1. Core Architectural Principles
1. **Flow Over Margins:** Elements do not declare their own vertical margins (\`margin-block-end\`). Instead, the parent \`.stack\` container manages spacing between siblings via CSS \`gap\`.
2. **Zero-Specificity Reset (\`:where()\`)**: The base rule is defined using \`:where(.stack)\` with 0-0-0 specificity. Utility classes (\`.margin-*\`) or inline CSS custom properties (\`--gap: ...\`) can effortlessly override it when needed.
3. **Semantic Element Parity:** Automatically strips native list margins, padding, and markers from \`:where(.stack):where(ul, ol)\` without requiring extra reset classes.
4. **Dividers Without Extra Markup:** Supports native CSS \`rule\` via \`.stack--ruled\`, rendering hair-line separators between flow elements without polluting the DOM with decorative \`<hr>\` elements.

---

#### 2. Canonical Semantic Markup Signatures
AI agents and developers MUST use the following semantic patterns:

\`\`\`html
<!-- Standard Vertical Stack -->
<div class="stack">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>

<!-- Flush / Tight Stack (0 Gap) -->
<div class="stack stack--tight">
  <div>Flush Item 1</div>
  <div>Flush Item 2</div>
</div>

<!-- Ruled Stack (Dividers Between Items) -->
<div class="stack stack--ruled">
  <div>Divided Section A</div>
  <div>Divided Section B</div>
</div>

<!-- Ordered Step List -->
<ol class="stack">
  <li>Step 1: Configure Environment</li>
  <li>Step 2: Install Design Tokens</li>
  <li>Step 3: Render Components</li>
</ol>

<!-- Accessible Form Stack -->
<form class="form stack">
  <div class="field">...</div>
  <div class="field">...</div>
  <div class="form__submission">...</div>
</form>
\`\`\`

---

#### 3. Token & Custom Property Contract

| Custom Property | Fallback Token | Description |
| :--- | :--- | :--- |
| \`--_gap\` | \`var(--gap, var(--spacing, 1rem))\` | Active vertical spacing between stack items |
| \`--gap\` | \`var(--spacing, 1rem)\` | Author-level custom spacing override |
| \`--align-items\` | \`stretch\` | Cross-axis item alignment (stretch, start, center, end) |
| \`--justify-content\` | \`normal\` | Main-axis distribution |
| \`--rule-width\` | \`1px\` | Divider stroke thickness in \`.stack--ruled\` |
| \`--rule-color\` | \`currentColor\` | Divider stroke color in \`.stack--ruled\` |

---

#### 4. WCAG 2.2 Accessibility Guidelines
- **DOM & Tab Order Parity (WCAG 2.4.3 Focus Order):** Children inside a \`.stack\` must follow a logical, natural document reading order. Never use \`flex-direction: column-reverse\` to move actions visually above their context.
- **Accessible Lists (WCAG 1.3.1 Info and Relationships):** When grouping sequential steps, use \`<ol class="stack">\`. When grouping navigation links or option items, use \`<ul class="stack">\`.
        `,
      },
    },
  },
  args: {
    gap: 'default',
    align: 'stretch',
    modifier: 'none',
    inspectGap: false,
    itemCount: 3,
  },
  argTypes: {
    gap: {
      control: 'select',
      options: ['tight', 'compact', 'default', 'comfortable', 'cushioned'],
      description: 'Vertical token gap scale',
    },
    align: {
      control: 'select',
      options: ['stretch', 'flex-start', 'center', 'flex-end'],
      description: 'Cross-axis item alignment (align-items)',
    },
    modifier: {
      control: 'select',
      options: ['none', 'stack--tight', 'stack--cushioned', 'stack--ruled'],
      description: 'Predefined layout modifier class',
    },
    inspectGap: {
      control: 'boolean',
      description: 'Visual layout inspector: highlights token gap area with purple diagnostic stripes',
    },
    itemCount: {
      control: { type: 'range', min: 2, max: 6, step: 1 },
      description: 'Number of demo items inside the stack',
    },
  },
};

export default meta;
type Story = StoryObj<StackArgs>;

/**
 * 1. Interactive Playground (Live Sandbox)
 */
export const Playground: Story = {
  render: (args) => {
    const gapTokenMap: Record<string, string> = {
      tight: '0',
      compact: 'var(--spacing-8, 0.5rem)',
      default: 'var(--spacing, 1rem)',
      comfortable: 'var(--spacing-24, 1.5rem)',
      cushioned: 'var(--spacing-cushion, 4rem)',
    };

    const modifierClass = args.modifier !== 'none' ? args.modifier : '';
    const inspectClass = args.inspectGap ? 'sb-demo-inspect-gap' : '';
    const customGap = args.modifier === 'none' && args.gap !== 'default' ? `--gap: ${gapTokenMap[args.gap]};` : '';
    const customAlign = args.align !== 'stretch' ? `align-items: ${args.align};` : '';
    const inlineStyles = [customGap, customAlign].filter(Boolean).join(' ');

    const items = Array.from({ length: args.itemCount }, (_, i) => {
      const idx = i + 1;
      const tintClass = idx === 1 ? 'sb-demo-box--start' : idx === 2 ? 'sb-demo-box--center-tint' : 'sb-demo-box--end-tint';
      return `
        <div class="sb-demo-box ${tintClass} padding">
          <p class="font-weight-bold">Stack Item ${idx}</p>
          <p class="font-size-xs text-muted">In-flow stacked element with automatic token spacing.</p>
        </div>
      `;
    }).join('');

    return `
      <div class="sb-demo-section wrapper wrapper--md">
        <p class="sb-demo-desc">
          Live Sandbox: Adjust gap tokens, cross-axis alignment, and inspection overlays using the controls panel below.
        </p>
        <div class="sb-demo-stage sb-demo-stage--lg">
          <div class="stack ${modifierClass} ${inspectClass}" style="${inlineStyles}">
            ${items}
          </div>
        </div>
      </div>
    `;
  },
};

/**
 * 2. Token Gap Scale Hierarchy
 */
export const GapScaleHierarchy: Story = {
  render: () => `
    <div class="sb-demo-group wrapper wrapper--lg">
      <div class="sb-demo-section">
        <h3 class="sb-demo-heading">Gap Scale Comparison</h3>
        <p class="sb-demo-desc">
          The stack layout adapts cleanly across different token increments to support everything from dense data tables to spacious editorial layouts.
        </p>
      </div>

      <div class="grid grid--sm">
        <!-- Tight (0) -->
        <article class="card">
          <header class="card__header">
            <h4 class="card__title font-size-sm">1. Tight (0 gap)</h4>
            <p class="card__subtitle font-size-xs"><code>.stack--tight</code></p>
          </header>
          <div class="card__body">
            <div class="stack stack--tight sb-demo-inspect-gap">
              <div class="sb-demo-box sb-demo-box--sm">Flush Header</div>
              <div class="sb-demo-box sb-demo-box--sm">Flush Body</div>
              <div class="sb-demo-box sb-demo-box--sm">Flush Footer</div>
            </div>
          </div>
        </article>

        <!-- Compact (0.5rem) -->
        <article class="card">
          <header class="card__header">
            <h4 class="card__title font-size-sm">2. Compact (0.5rem)</h4>
            <p class="card__subtitle font-size-xs"><code>--gap: var(--spacing-8)</code></p>
          </header>
          <div class="card__body">
            <div class="stack sb-demo-inspect-gap" style="--gap: var(--spacing-8);">
              <div class="sb-demo-box sb-demo-box--sm">List Item 1</div>
              <div class="sb-demo-box sb-demo-box--sm">List Item 2</div>
              <div class="sb-demo-box sb-demo-box--sm">List Item 3</div>
            </div>
          </div>
        </article>

        <!-- Default (1rem) -->
        <article class="card">
          <header class="card__header">
            <h4 class="card__title font-size-sm">3. Default (1rem)</h4>
            <p class="card__subtitle font-size-xs"><code>.stack</code> (Standard)</p>
          </header>
          <div class="card__body">
            <div class="stack sb-demo-inspect-gap">
              <div class="sb-demo-box sb-demo-box--sm">Standard Item A</div>
              <div class="sb-demo-box sb-demo-box--sm">Standard Item B</div>
              <div class="sb-demo-box sb-demo-box--sm">Standard Item C</div>
            </div>
          </div>
        </article>

        <!-- Cushioned (4rem) -->
        <article class="card">
          <header class="card__header">
            <h4 class="card__title font-size-sm">4. Cushioned (4rem)</h4>
            <p class="card__subtitle font-size-xs"><code>.stack--cushioned</code></p>
          </header>
          <div class="card__body">
            <div class="stack stack--cushioned sb-demo-inspect-gap">
              <div class="sb-demo-box sb-demo-box--sm">Chapter 1</div>
              <div class="sb-demo-box sb-demo-box--sm">Chapter 2</div>
            </div>
          </div>
        </article>
      </div>
    </div>
  `,
};

/**
 * 3. Native Ruled Dividers
 */
export const RuledDividers: Story = {
  render: () => `
    <div class="sb-demo-group wrapper wrapper--md">
      <div class="sb-demo-section">
        <h3 class="sb-demo-heading">Native Dividers via CSS <code>rule</code></h3>
        <p class="sb-demo-desc">
          <code>.stack--ruled</code> injects hair-line borders between children without requiring extra <code>&lt;hr&gt;</code> elements in the DOM.
        </p>
      </div>

      <div class="card padding">
        <h4 class="font-size-sm font-weight-bold margin-bottom-sm">Standard Ruled Stack</h4>
        <div class="stack stack--ruled">
          <div class="padding-block-sm">
            <p class="font-weight-bold">Section 1: Architectural Foundations</p>
            <p class="font-size-xs text-muted">Design token scales and zero-specificity resets.</p>
          </div>
          <div class="padding-block-sm">
            <p class="font-weight-bold">Section 2: Component Primitives</p>
            <p class="font-size-xs text-muted">Accessible native controls and top-layer dialogues.</p>
          </div>
          <div class="padding-block-sm">
            <p class="font-weight-bold">Section 3: Composite Recipes</p>
            <p class="font-size-xs text-muted">Command palettes, filter sidebars, and app headers.</p>
          </div>
        </div>
      </div>

      <div class="card padding">
        <h4 class="font-size-sm font-weight-bold margin-bottom-sm">Tight Ruled List (<code>.stack--ruled.stack--tight</code>)</h4>
        <div class="stack stack--ruled stack--tight">
          <div class="padding-block-xs font-size-sm">System Metric 1: Contrast Ratio (WCAG AAA)</div>
          <div class="padding-block-xs font-size-sm">System Metric 2: Keyboard Tab Clearance (3:1 focus ring)</div>
          <div class="padding-block-xs font-size-sm">System Metric 3: Minimum Target Area (24×24px Level AA)</div>
        </div>
      </div>
    </div>
  `,
};

/**
 * 4. Scoped Container Modifiers
 */
export const ScopedModifiers: Story = {
  render: () => `
    <div class="sb-demo-group wrapper wrapper--md">
      <div class="sb-demo-section">
        <h3 class="sb-demo-heading">Spacing Modifiers (<code>.stack--tight</code>, <code>.stack--cushioned</code>)</h3>
        <p class="sb-demo-desc">
          Adjust inter-element vertical rhythm using direct modifier classes.
        </p>
      </div>

      <div class="grid grid--sm">
        <div class="card padding">
          <h4 class="font-size-sm font-weight-bold margin-bottom-sm">Modifier: <code>.stack--tight</code></h4>
          <div class="stack stack--tight sb-demo-inspect-gap">
            <div class="sb-demo-box sb-demo-box--sm">Nested Item A</div>
            <div class="sb-demo-box sb-demo-box--sm">Nested Item B</div>
            <div class="sb-demo-box sb-demo-box--sm">Nested Item C</div>
          </div>
        </div>

        <div class="card padding">
          <h4 class="font-size-sm font-weight-bold margin-bottom-sm">Modifier: <code>.stack--cushioned</code></h4>
          <div class="stack stack--cushioned sb-demo-inspect-gap">
            <div class="sb-demo-box sb-demo-box--sm">Spacious Topic 1</div>
            <div class="sb-demo-box sb-demo-box--sm">Spacious Topic 2</div>
          </div>
        </div>
      </div>
    </div>
  `,
};

/**
 * 5. Real-World Composition: Accessible Form Stack
 */
export const FormComposition: Story = {
  render: () => `
    <div class="sb-demo-group wrapper wrapper--sm">
      <div class="sb-demo-section">
        <h3 class="sb-demo-heading">Real-World Pattern: Form Controls</h3>
        <p class="sb-demo-desc">
          <code>&lt;form class="form stack"&gt;</code> seamlessly distributes labels, inputs, hints, and submit buttons with zero margin hacks.
        </p>
      </div>

      <div class="card padding">
        <form class="form stack" onsubmit="event.preventDefault();">
          <div class="field">
            <label for="stack-user-name" class="field__label">Full Name</label>
            <input id="stack-user-name" type="text" class="input" placeholder="Alex Bennett" required />
          </div>

          <div class="field">
            <label for="stack-user-email" class="field__label">Email Address</label>
            <p id="stack-user-email-hint" class="field__hint">Used for audit report delivery.</p>
            <input 
              id="stack-user-email" 
              type="email" 
              class="input" 
              placeholder="alex@example.com" 
              aria-describedby="stack-user-email-hint" 
              required 
            />
          </div>

          <fieldset class="fieldset">
            <legend class="legend">Audit Preferences</legend>
            <div class="choices stack" style="--gap: var(--spacing-8);">
              <label class="choice" for="cb-wcag">
                <input type="checkbox" id="cb-wcag" class="checkbox-input" checked />
                <span>Verify WCAG 2.2 AA Conformance</span>
              </label>
              <label class="choice" for="cb-contrast">
                <input type="checkbox" id="cb-contrast" class="checkbox-input" checked />
                <span>Automate Color Contrast Scanner</span>
              </label>
            </div>
          </fieldset>

          <div class="form__submission form__submission--right">
            <button type="reset" class="button button--subtle">
              <span>Reset</span>
            </button>
            <button type="submit" class="button button--strong button--accent">
              <span>Save Settings</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
};

/**
 * 6. Real-World Composition: Card Content Stack
 */
export const CardContentComposition: Story = {
  render: () => `
    <div class="sb-demo-group wrapper wrapper--sm">
      <div class="sb-demo-section">
        <h3 class="sb-demo-heading">Real-World Pattern: Card Content Flow</h3>
        <p class="sb-demo-desc">
          Composing a <code>.card</code> with an inner <code>.stack</code> to maintain balanced vertical rhythm.
        </p>
      </div>

      <article class="card stack">
        <header class="card__header">
          <hgroup class="card__hgroup">
            <h4 class="card__title small-heading">Design System Tokens</h4>
            <p class="card__subtitle">DTCG 3-Tier Architecture</p>
          </hgroup>
          <span class="status status--success"><span class="status__text">Stable</span></span>
        </header>

        <div class="card__body stack" style="--gap: var(--spacing-12);">
          <p>
            Tokens synchronize typography, colors, and spatial units between Figma Variables, Tokens Studio, and native CSS custom properties.
          </p>
          <div class="cluster">
            <span class="chip chip--subtle"><span class="chip__text">Tier 1: Global</span></span>
            <span class="chip chip--subtle"><span class="chip__text">Tier 2: Semantic</span></span>
            <span class="chip chip--subtle"><span class="chip__text">Tier 3: Component</span></span>
          </div>
        </div>

        <footer class="card__footer" style="justify-content: flex-end;">
          <button type="button" class="button">
            <span>View Specification</span>
          </button>
        </footer>
      </article>
    </div>
  `,
};

/**
 * 7. Semantic List Resets
 */
export const SemanticLists: Story = {
  render: () => `
    <div class="sb-demo-group wrapper wrapper--md">
      <div class="sb-demo-section">
        <h3 class="sb-demo-heading">Semantic List Resets (<code>ol.stack</code>, <code>ul.stack</code>)</h3>
        <p class="sb-demo-desc">
          Zero-specificity resets remove browser default margins, paddings, and bullet markers while preserving semantic tree accessibility.
        </p>
      </div>

      <div class="grid grid--sm">
        <!-- Ordered Steps -->
        <div class="card padding">
          <h4 class="font-size-sm font-weight-bold margin-bottom-sm">Ordered Steps (<code>&lt;ol class="stack"&gt;</code>)</h4>
          <ol class="stack" style="--gap: var(--spacing-8);">
            <li class="sb-demo-box sb-demo-box--row">
              <span class="sb-demo-tag">1</span>
              <span>Define Design Tokens</span>
            </li>
            <li class="sb-demo-box sb-demo-box--row">
              <span class="sb-demo-tag">2</span>
              <span>Compile CSS Custom Properties</span>
            </li>
            <li class="sb-demo-box sb-demo-box--row">
              <span class="sb-demo-tag">3</span>
              <span>Test with Automated axe Scanner</span>
            </li>
          </ol>
        </div>

        <!-- Unordered Navigation List -->
        <div class="card padding">
          <h4 class="font-size-sm font-weight-bold margin-bottom-sm">Unordered Actions (<code>&lt;ul class="stack"&gt;</code>)</h4>
          <ul class="stack" style="--gap: var(--spacing-8);">
            <li>
              <a href="#" class="block-link" onclick="event.preventDefault();">
                <span>Accessibility Audits</span>
              </a>
            </li>
            <li>
              <a href="#" class="block-link" onclick="event.preventDefault();">
                <span>Figma Variables Sync</span>
              </a>
            </li>
            <li>
              <a href="#" class="block-link" onclick="event.preventDefault();">
                <span>Component Documentation</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  `,
};

/**
 * 8. Cross-Axis Alignments
 */
export const CrossAxisAlignment: Story = {
  render: () => `
    <div class="sb-demo-group wrapper wrapper--lg">
      <div class="sb-demo-section">
        <h3 class="sb-demo-heading">Cross-Axis Alignments (<code>align-items</code>)</h3>
        <p class="sb-demo-desc">
          Controlling horizontal sizing and alignment of children within the vertical flow column.
        </p>
      </div>

      <div class="grid grid--xs">
        <!-- Stretch -->
        <div class="card padding">
          <h4 class="font-size-xs font-weight-bold margin-bottom-xs">stretch (Default)</h4>
          <div class="stack" style="align-items: stretch;">
            <div class="sb-demo-box sb-demo-box--sm">Full Width</div>
            <div class="sb-demo-box sb-demo-box--sm">Stretches Edge to Edge</div>
          </div>
        </div>

        <!-- Flex Start -->
        <div class="card padding">
          <h4 class="font-size-xs font-weight-bold margin-bottom-xs">flex-start (Intrinsic)</h4>
          <div class="stack" style="align-items: flex-start;">
            <div class="sb-demo-box sb-demo-box--sm">Short</div>
            <div class="sb-demo-box sb-demo-box--sm">Intrinsic Size</div>
          </div>
        </div>

        <!-- Center -->
        <div class="card padding">
          <h4 class="font-size-xs font-weight-bold margin-bottom-xs">center</h4>
          <div class="stack" style="align-items: center;">
            <div class="sb-demo-box sb-demo-box--sm">Centered</div>
            <div class="sb-demo-box sb-demo-box--sm">Horizontally Balanced</div>
          </div>
        </div>

        <!-- Flex End -->
        <div class="card padding">
          <h4 class="font-size-xs font-weight-bold margin-bottom-xs">flex-end</h4>
          <div class="stack" style="align-items: flex-end;">
            <div class="sb-demo-box sb-demo-box--sm">Right-Aligned</div>
            <div class="sb-demo-box sb-demo-box--sm">Trailing Edge</div>
          </div>
        </div>
      </div>
    </div>
  `,
};

/**
 * 9. Comprehensive State & Audit Matrix
 */
export const StateMatrix: Story = {
  render: () => `
    <div class="sb-demo-group wrapper wrapper--lg">
      <div class="sb-demo-section">
        <h3 class="sb-demo-heading">Automated Accessibility & State Verification Matrix</h3>
        <p class="sb-demo-desc">
          Consolidated snapshot testing across all Stack modifiers, gaps, and semantic parent wrappers.
        </p>
      </div>

      <div class="grid grid--sm">
        <div class="card padding stack">
          <h4 class="font-size-xs font-weight-bold">Standard Stack</h4>
          <div class="stack sb-demo-inspect-gap">
            <div class="sb-demo-box sb-demo-box--sm">Alpha</div>
            <div class="sb-demo-box sb-demo-box--sm">Beta</div>
          </div>
        </div>

        <div class="card padding stack">
          <h4 class="font-size-xs font-weight-bold">Tight Stack</h4>
          <div class="stack stack--tight sb-demo-inspect-gap">
            <div class="sb-demo-box sb-demo-box--sm">Alpha</div>
            <div class="sb-demo-box sb-demo-box--sm">Beta</div>
          </div>
        </div>

        <div class="card padding stack">
          <h4 class="font-size-xs font-weight-bold">Ruled Stack</h4>
          <div class="stack stack--ruled">
            <div class="padding-block-xs font-size-xs">Alpha</div>
            <div class="padding-block-xs font-size-xs">Beta</div>
          </div>
        </div>

        <div class="card padding stack">
          <h4 class="font-size-xs font-weight-bold">Tight Stack (Modifier)</h4>
          <div class="stack stack--tight sb-demo-inspect-gap">
            <div class="sb-demo-box sb-demo-box--sm">Alpha</div>
            <div class="sb-demo-box sb-demo-box--sm">Beta</div>
          </div>
        </div>
      </div>
    </div>
  `,
};
