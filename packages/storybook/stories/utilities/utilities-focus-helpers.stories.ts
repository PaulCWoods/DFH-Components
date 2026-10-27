import type { Meta, StoryObj } from '@storybook/html';

interface FocusHelperArgs {
  variant: 'default' | 'input-only' | 'inset' | 'border' | 'direct';
  ringWidth: '2px' | '3px' | '4px';
  ringOffset: '0px' | '2px' | '4px';
  ringColor: 'accent' | 'primary' | 'danger';
  showSecondaryAction: boolean;
}

const meta: Meta<FocusHelperArgs> = {
  title: 'Utilities/Focus Helpers',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
### Developer & Designer Notes: Focus Management & Container Ring Utilities

The **Focus Helpers** utilities provide zero-specificity (\`:where()\`) classes for transferring high-contrast keyboard focus indicators to parent containers while automatically eliminating duplicate nested child rings.

Designed in strict accordance with **WCAG 2.2 Level AA / AAA** accessibility standards:
- **2.4.7 Focus Visible (Level A):** Any keyboard-operable interface element has a visible focus indicator.
- **2.4.11 Focus Not Obscured (Minimum) (Level AA):** Focus rings remain unobstructed by adjacent UI elements.
- **2.4.13 Focus Appearance (Level AAA):** Focus rings maintain at least a 2px stroke thickness, an offset separating the perimeter from content, and a contrast ratio of >= 3:1 against adjacent surfaces.
- **Windows High Contrast / Forced Colors Mode:** Leverages system \`AccentColor\` fallbacks to ensure full visibility when custom palette colors are overridden.

Defined in \`utilities/focus-helpers.css\`.

---

#### 1. Core Architectural Principles
1. **Container Ring Delegation via \`:has(:focus-visible)\`:** Unlike traditional \`:focus-within\` (which triggers on mouse clicks), Design For Humans uses \`:has(:focus-visible)\`. The container focus ring illuminates **only** when a keyboard user tabs into an inner interactive element.
2. **Duplicate Ring Suppression:** When a container takes ownership of the focus ring, nested interactive children (\`input\`, \`button\`, \`a\`, \`[tabindex]\`) have their local rings automatically suppressed via \`outline: none !important\` to prevent visually jarring "double-box" indicators.
3. **Target-Specific Scoping (\`.focus-within--input\`):** For compound fields with auxiliary action buttons (e.g. an API key input with an adjacent "Copy" button), \`.focus-within--input\` ensures only the text field delegates to the outer container. Focusing the copy button highlights that specific button in isolation.
4. **Inset Positioning (\`.focus-within--inset\`):** Inverts the outline offset (\`-2px\`) for edge-to-edge containers, listbox options, and cards enclosed in overflow-clipped layouts where outward rings would be cropped.
5. **Zero-Specificity Reset (\`:where()\`)**: Written with 0-0-0 specificity so component-specific themes and custom focus ring tokens override cleanly.

---

#### 2. Comparison With Leading Design Systems

| Feature / System | DFH Focus Helpers | GitHub Primer | Radix Themes | IBM Carbon |
| :--- | :--- | :--- | :--- | :--- |
| **Keyboard Delegation** | \`:has(:focus-visible)\` | Component-specific mixins | Component-specific JS wrapper | Hardcoded parent class |
| **Child Double-Ring Suppression** | Automatic via zero-specificity CSS | Manual per-component overrides | Managed by Radix Root elements | Requires specific markup nesting |
| **Mouse Click Ring Suppression** | Native (only \`:focus-visible\` triggers) | Requires JS focus classes | Built into theme primitives | Triggers unless managed in JS |
| **Inset Ring Modifier** | Native (\`.focus-within--inset\`) | Custom box-shadow workarounds | \`variant="classic"\` | High-contrast token overrides |
| **WCAG 2.4.13 (AAA) Ready** | Standard (>= 2px, 3:1 contrast) | Variable by component | Variable by component | 2px solid boundary |

---

#### 3. Canonical Semantic Markup Signatures
AI agents and developers MUST use the following semantic patterns:

\`\`\`html
<!-- 1. Compound Search Bar with Delegated Container Focus -->
<div class="inline align-items-center gap-sm pd-sm rounded-md border focus-within" style="background-color: var(--surface);">
  <svg class="icon text-color-muted" width="20" height="20" aria-hidden="true" focusable="false"><use href="#Search"/></svg>
  <input type="search" class="input input--plain flex-1" placeholder="Search documentation..." />
  <button type="button" class="button button--subtle button--sm"><span>Search</span></button>
</div>

<!-- 2. Target-Specific Container (Input highlights container, button focuses locally) -->
<div class="inline align-items-center gap-sm pd-sm rounded-md border focus-within--input" style="background-color: var(--surface);">
  <input type="text" class="input input--plain flex-1" value="https://designforhumans.com" readonly />
  <button type="button" class="button button--sm"><span>Copy</span></button>
</div>

<!-- 3. Inset Focus Container for Flush Cards or Dialog Sections -->
<div class="card card--compact card--bordered focus-within focus-within--inset">
  <div class="card__body inline align-items-center justify-content-between">
    <span>Enable Analytics</span>
    <input type="checkbox" role="switch" class="switch" />
  </div>
</div>
\`\`\`

---

#### 4. Token & Utility Reference

| Class | Alias | Target Selector | Purpose |
| :--- | :--- | :--- | :--- |
| \`.focus-within\` | \`.focus-container\`, \`.has-focus-ring\` | \`&:has(:focus-visible)\` | Transfers focus ring to parent on any child keyboard focus |
| \`.focus-within--input\` | \`.focus-input-container\` | \`&:has(:where(input, textarea, select):focus-visible)\` | Scopes container focus strictly to form inputs |
| \`.focus-within--inset\` | \`.focus-ring-inset\` | \`outline-offset: -2px\` | Inverts ring offset to stay within element bounding box |
| \`.focus-within--border\` | \`.focus-border\` | \`border-color: var(--color-focus)\` | Highlights border stroke alongside or in lieu of ring |
| \`.focus-ring\` | — | \`&:focus-visible\` | Applies standard WCAG compliant outline directly to element |
| \`.focus-none\` | \`.focus-ring-none\` | \`&:focus-visible\` | Suppresses outline (use only when alternate indicator exists) |
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'input-only', 'inset', 'border', 'direct'],
      description: 'Focus delegation mode or modifier applied to the container.',
      table: { category: 'Variant' },
    },
    ringWidth: {
      control: 'select',
      options: ['2px', '3px', '4px'],
      description: 'Thickness of the active focus outline (WCAG 2.4.13 requires >= 2px).',
      table: { category: 'Token Tuning' },
    },
    ringOffset: {
      control: 'select',
      options: ['0px', '2px', '4px'],
      description: 'Offset separation between the container boundary and focus indicator.',
      table: { category: 'Token Tuning' },
    },
    ringColor: {
      control: 'select',
      options: ['accent', 'primary', 'danger'],
      description: 'Focus ring color token.',
      table: { category: 'Token Tuning' },
    },
    showSecondaryAction: {
      control: 'boolean',
      description: 'Include an auxiliary action button inside the compound field.',
      table: { category: 'Composition' },
    },
  },
  args: {
    variant: 'default',
    ringWidth: '2px',
    ringOffset: '2px',
    ringColor: 'accent',
    showSecondaryAction: true,
  },
};

export default meta;
type Story = StoryObj<FocusHelperArgs>;

const getRingColorVal = (color: FocusHelperArgs['ringColor']) => {
  switch (color) {
    case 'primary': return 'var(--color-primary, #0066cc)';
    case 'danger': return 'var(--color-danger, #d32f2f)';
    case 'accent':
    default:
      return 'var(--focus-ring-color, AccentColor)';
  }
};

/**
 * 1. Interactive Playground
 * Test focus ring delegation live. Press Tab to move focus into the controls and observe container-level ring behavior.
 */
export const Playground: Story = {
  render: (args) => {
    const classMap: Record<string, string> = {
      default: 'focus-within',
      'input-only': 'focus-within--input',
      inset: 'focus-within focus-within--inset',
      border: 'focus-within--border focus-within',
      direct: 'focus-ring',
    };

    const activeClass = classMap[args.variant] || 'focus-within';
    const ringColorVal = getRingColorVal(args.ringColor);

    return `
      <div class="stack gap-md" style="max-inline-size: 34rem; margin-inline: auto;">
        <div class="card card--bordered padding-sm" style="background: var(--surface-muted);">
          <p class="font-size-sm text-color-muted" style="margin: 0;">
            ⌨️ <strong>Accessibility Test Instructions:</strong> Press <kbd style="padding: 2px 6px; border: 1px solid var(--border-color); border-radius: 4px; background: var(--surface);">Tab</kbd> to focus through the controls below. Notice how the container highlights cleanly without double outlines.
          </p>
        </div>

        <div 
          class="inline align-items-center gap-sm pd-sm rounded-md border ${activeClass}" 
          style="
            background-color: var(--surface);
            --focus-ring-width: ${args.ringWidth};
            --focus-ring-offset: ${args.ringOffset};
            --focus-ring-color: ${ringColorVal};
          "
        >
          <span style="display: flex; align-items: center; justify-content: center; color: var(--foreground-muted);">
            <svg class="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </span>

          <input 
            type="search" 
            class="input input--plain flex-1" 
            placeholder="Search Design For Humans..." 
            aria-label="Playground search"
          />

          ${args.showSecondaryAction ? `
            <button type="button" class="button button--subtle button--sm">
              <span>Filter</span>
            </button>
            <button type="button" class="button button--strong button--accent button--sm">
              <span>Search</span>
            </button>
          ` : `
            <button type="button" class="button button--strong button--accent button--sm">
              <span>Go</span>
            </button>
          `}
        </div>

        <div class="stack gap-xs">
          <p class="font-size-xs text-color-muted">
            <strong>Active Modifier:</strong> <code>.${activeClass.split(' ').join(' .')}</code> | 
            <strong>Stroke:</strong> <code>${args.ringWidth}</code> | 
            <strong>Offset:</strong> <code>${args.ringOffset}</code>
          </p>
        </div>
      </div>
    `;
  },
};

/**
 * 2. Compound Search Bar (.focus-within)
 * Transmits the focus indicator to the rounded container when either the search input or buttons receive focus.
 */
export const CompoundSearchBar: Story = {
  render: () => `
    <div class="stack gap-md" style="max-inline-size: 34rem;">
      <p class="font-size-sm text-color-muted">
        Press <kbd>Tab</kbd> to enter the search bar. The outer container illuminates with a high-contrast ring while nested elements have their default rings cleanly suppressed.
      </p>

      <div class="inline align-items-center gap-sm pd-sm rounded-md border focus-within" style="background-color: var(--surface);">
        <span style="display: flex; align-items: center; color: var(--foreground-muted);">
          <svg class="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </span>
        <input 
          type="search" 
          class="input input--plain flex-1" 
          placeholder="Search components, tokens, or accessibility guidance..." 
          aria-label="Documentation search"
        />
        <button type="button" class="button button--subtle button--sm" aria-label="Clear search input">
          <svg class="icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <button type="button" class="button button--strong button--accent button--sm">
          <span>Search</span>
        </button>
      </div>
    </div>
  `,
};

/**
 * 3. Target-Specific Input Container (.focus-within--input)
 * Only form inputs trigger the outer container outline. Focusing the auxiliary "Copy" button highlights only the button!
 */
export const TargetedInputContainer: Story = {
  render: () => `
    <div class="stack gap-md" style="max-inline-size: 34rem;">
      <div class="card card--bordered padding-sm" style="background: var(--surface-muted);">
        <p class="font-size-sm text-color-muted" style="margin: 0;">
          💡 <strong>Behavioral Contrast:</strong> Press <kbd>Tab</kbd>. When the input is focused, the <em>container</em> receives the ring. Press <kbd>Tab</kbd> again to the "Copy Token" button: now <em>only the button</em> receives the focus ring, preserving clear visual intent.
        </p>
      </div>

      <div class="field">
        <label for="cdn-url" class="field__label">Production CDN Endpoint</label>
        <div class="inline align-items-center gap-sm pd-sm rounded-md border focus-within--input" style="background-color: var(--surface);">
          <svg class="icon text-color-muted" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false">
            <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
            <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
            <line x1="6" y1="6" x2="6.01" y2="6"></line>
            <line x1="6" y1="18" x2="6.01" y2="18"></line>
          </svg>
          <input 
            id="cdn-url" 
            type="text" 
            class="input input--plain flex-1" 
            value="https://cdn.designforhumans.com/v2/tokens.css" 
            readonly 
          />
          <button type="button" class="button button--sm">
            <svg class="icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
            <span>Copy</span>
          </button>
        </div>
      </div>
    </div>
  `,
};

/**
 * 4. Inset Focus Container (.focus-within--inset)
 * Inverts outline-offset to stay within container bounds for edge-to-edge layouts, overflow-clipped items, and cards.
 */
export const InsetFocusContainer: Story = {
  render: () => `
    <div class="stack gap-md" style="max-inline-size: 30rem;">
      <p class="font-size-sm text-color-muted">
        In dialogs or cards with clipped overflow, outward focus rings can get clipped. <code>.focus-within--inset</code> directs the focus ring inward.
      </p>

      <div class="stack gap-sm">
        <div class="card card--bordered card--compact focus-within focus-within--inset" style="overflow: hidden;">
          <div class="card__body inline align-items-center justify-content-between">
            <div>
              <p class="font-weight-bold" style="margin: 0;">Automated axe Scans</p>
              <p class="font-size-xs text-color-muted" style="margin: 0;">Execute WCAG checks on CI build</p>
            </div>
            <label class="switch">
              <input type="checkbox" role="switch" class="visually-hidden" checked />
              <span class="switch__control" aria-hidden="true">
                <span class="switch__option switch__option--off">Off</span>
                <span class="switch__option switch__option--on">On</span>
              </span>
            </label>
          </div>
        </div>

        <div class="card card--bordered card--compact focus-within focus-within--inset" style="overflow: hidden;">
          <div class="card__body inline align-items-center justify-content-between">
            <div>
              <p class="font-weight-bold" style="margin: 0;">Forced Colors Simulation</p>
              <p class="font-size-xs text-color-muted" style="margin: 0;">Emulate Windows High Contrast Mode</p>
            </div>
            <label class="switch">
              <input type="checkbox" role="switch" class="visually-hidden" />
              <span class="switch__control" aria-hidden="true">
                <span class="switch__option switch__option--off">Off</span>
                <span class="switch__option switch__option--on">On</span>
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  `,
};

/**
 * 5. Border Color Elevation (.focus-within--border)
 * Elevates the container border color to var(--color-focus) when focused.
 */
export const BorderHighlightContainer: Story = {
  render: () => `
    <div class="stack gap-md" style="max-inline-size: 34rem;">
      <p class="font-size-sm text-color-muted">
        <code>.focus-within--border</code> shifts the container's border stroke color to <code>var(--color-focus)</code> alongside the focus outline.
      </p>

      <div class="inline align-items-center gap-sm pd-sm rounded-md border-md focus-within--border focus-within" style="background-color: var(--surface);">
        <span style="display: flex; align-items: center; color: var(--foreground-muted);">
          <svg class="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
        </span>
        <input 
          type="email" 
          class="input input--plain flex-1" 
          placeholder="Enter email for audit notification..." 
          aria-label="Email notification"
        />
        <button type="submit" class="button button--strong button--accent button--sm">
          <span>Subscribe</span>
        </button>
      </div>
    </div>
  `,
};

/**
 * 6. Composite Card Link Delegation
 * An interactive card that lights up when its primary callout link is focused via keyboard navigation.
 */
export const CompositeCardDelegation: Story = {
  render: () => `
    <div class="stack gap-md" style="max-inline-size: 32rem;">
      <p class="font-size-sm text-color-muted">
        Press <kbd>Tab</kbd> to focus the card link. The outer card boundary highlights as the interactive target.
      </p>

      <article class="card card--bordered padding focus-within rounded-md" style="transition: border-color var(--transition-fast);">
        <header class="stack gap-xs">
          <div class="inline align-items-center justify-content-between">
            <span class="badge badge--accent">WCAG 2.2 AAA</span>
            <span class="font-size-xs text-color-muted">Updated 2h ago</span>
          </div>
          <h3 class="card__title font-size-md" style="margin-block-start: var(--spacing-4);">
            <a href="#focus-audit" class="link">
              <span>Focus Appearance Compliance Guide</span>
            </a>
          </h3>
        </header>
        <p class="font-size-sm text-color-muted" style="margin-block-start: var(--spacing-8);">
          Comprehensive checklist covering SC 2.4.7, 2.4.11, and 2.4.13 outline thickness, perimeter area, and contrast metrics.
        </p>
      </article>
    </div>
  `,
};

/**
 * 7. Standalone Direct Element Focus & Outline Suppression (.focus-ring & .focus-none)
 * Demonstrates explicit focus rings on custom interactive containers and controlled suppression with accessible replacement.
 */
export const StandaloneFocusUtilities: Story = {
  render: () => `
    <div class="stack gap-lg" style="max-inline-size: 34rem;">
      <!-- Direct Element Focus Ring -->
      <div class="stack gap-xs">
        <h4 class="font-size-sm font-weight-bold">1. Explicit Direct Element Focus Ring (<code>.focus-ring</code>)</h4>
        <p class="font-size-xs text-color-muted">Used for custom keyboard-accessible widgets (e.g. custom tree nodes or card buttons with <code>tabindex="0"</code>).</p>
        
        <div 
          class="padding-sm rounded-md border focus-ring" 
          tabindex="0" 
          role="button" 
          aria-label="Custom selectable card widget"
          style="background: var(--surface); cursor: pointer;"
        >
          <div class="inline align-items-center gap-sm">
            <svg class="icon text-color-accent" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false">
              <polyline points="9 11 12 14 22 4"></polyline>
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
            </svg>
            <div>
              <p class="font-weight-bold font-size-sm" style="margin: 0;">Interactive Custom Item</p>
              <p class="font-size-xs text-color-muted" style="margin: 0;">Press Tab to focus this custom widget</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Outline Suppression with Accessible Contrast Shift -->
      <div class="stack gap-xs">
        <h4 class="font-size-sm font-weight-bold">2. Controlled Outline Suppression (<code>.focus-none</code>)</h4>
        <p class="font-size-xs text-color-muted">
          ⚠️ <strong>WCAG 2.4.7 Caution:</strong> Only use <code>.focus-none</code> when a high-contrast alternative indicator (such as an elevated border or surface color change) is visibly supplied!
        </p>

        <div class="cluster gap-sm">
          <button 
            type="button" 
            class="button focus-none" 
            style="border: 2px solid var(--border-color);"
            onfocus="this.style.borderColor='var(--color-primary, #0066cc)'; this.style.backgroundColor='var(--surface-active);'"
            onblur="this.style.borderColor='var(--border-color)'; this.style.backgroundColor='';"
          >
            <span>Custom Focus Indicator Button</span>
          </button>
        </div>
      </div>
    </div>
  `,
};

/**
 * 8. State Matrix Snapshot (Automated Accessibility Audit)
 * Renders all focus utility patterns side-by-side for visual regression and axe-core compliance testing.
 */
export const StateMatrix: Story = {
  render: () => `
    <div class="stack gap-xl" style="max-inline-size: 54rem;">
      <header class="stack gap-xs">
        <h3 class="font-size-lg font-weight-bold">Focus Helper Utilities State Matrix</h3>
        <p class="font-size-sm text-color-muted">
          Comprehensive snapshot across container delegation, target filtering, inset containment, and border elevation.
        </p>
      </header>

      <div class="grid gap-lg" style="--grid-min-item-width: 24rem;">
        <!-- Matrix Item 1: .focus-within -->
        <div class="card card--bordered padding stack gap-sm">
          <div class="inline align-items-center justify-content-between">
            <span class="badge">.focus-within</span>
            <span class="font-size-xs text-color-muted">Universal Delegation</span>
          </div>
          <div class="inline align-items-center gap-xs pd-xs rounded-md border focus-within" style="background: var(--surface);">
            <input type="text" class="input input--plain flex-1 input--sm" placeholder="Any focused child..." aria-label="Matrix focus within" />
            <button type="button" class="button button--strong button--accent button--sm"><span>Go</span></button>
          </div>
        </div>

        <!-- Matrix Item 2: .focus-within--input -->
        <div class="card card--bordered padding stack gap-sm">
          <div class="inline align-items-center justify-content-between">
            <span class="badge">.focus-within--input</span>
            <span class="font-size-xs text-color-muted">Input Scoped Only</span>
          </div>
          <div class="inline align-items-center gap-xs pd-xs rounded-md border focus-within--input" style="background: var(--surface);">
            <input type="text" class="input input--plain flex-1 input--sm" placeholder="Input triggers, button isolated..." aria-label="Matrix focus within input" />
            <button type="button" class="button button--sm"><span>Action</span></button>
          </div>
        </div>

        <!-- Matrix Item 3: .focus-within--inset -->
        <div class="card card--bordered padding stack gap-sm">
          <div class="inline align-items-center justify-content-between">
            <span class="badge">.focus-within--inset</span>
            <span class="font-size-xs text-color-muted">Inset -2px Offset</span>
          </div>
          <div class="inline align-items-center gap-xs pd-xs rounded-md border focus-within focus-within--inset" style="background: var(--surface);">
            <input type="text" class="input input--plain flex-1 input--sm" placeholder="Inner inset outline..." aria-label="Matrix inset focus" />
            <button type="button" class="button button--subtle button--sm"><span>Save</span></button>
          </div>
        </div>

        <!-- Matrix Item 4: .focus-within--border -->
        <div class="card card--bordered padding stack gap-sm">
          <div class="inline align-items-center justify-content-between">
            <span class="badge">.focus-within--border</span>
            <span class="font-size-xs text-color-muted">Border Color Elevation</span>
          </div>
          <div class="inline align-items-center gap-xs pd-xs rounded-md border-md focus-within--border focus-within" style="background: var(--surface);">
            <input type="text" class="input input--plain flex-1 input--sm" placeholder="Elevated border stroke..." aria-label="Matrix border elevation" />
            <button type="button" class="button button--strong button--accent button--sm"><span>Apply</span></button>
          </div>
        </div>
      </div>
    </div>
  `,
};
