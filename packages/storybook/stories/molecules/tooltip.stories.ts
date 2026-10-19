import type { Meta, StoryObj } from '@storybook/html';

interface TooltipArgs {
  text: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  noArrow?: boolean;
  richCard?: boolean;
}

const meta: Meta<TooltipArgs> = {
  title: 'Molecules/Tooltip',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
### Developer & Designer Notes: Tooltip Primitive

The **Tooltip** primitive provides a compact, contextual overlay utilizing native HTML \`[popover="hint"]\`, **Interest Invokers** (\`interestfor\`), and **CSS Anchor Positioning** (\`position-area\`, \`position-try-fallbacks\`).
Adheres to strict WCAG 2.2 AA / AAA standards including **1.4.13 Content on Hover or Focus**, **2.1.1 Keyboard Navigation**, and **1.4.3 Contrast**.

---

#### 1. Canonical Semantic Markup Signatures
AI agents and developers MUST strictly use the following semantic patterns:

\`\`\`html
<!-- 1. Native Interest Invoker & Anchored Tooltip (Baseline Standard) -->
<button 
  type="button" 
  class="button button--icon" 
  interestfor="tip-save"
  popovertarget="tip-save"
  style="anchor-name: --anchor-save;"
>
  <span class="visually-hidden">Save changes</span>
  <svg class="icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
  </svg>
</button>

<div 
  id="tip-save" 
  popover="hint" 
  class="tooltip tooltip--anchored" 
  style="position-anchor: --anchor-save;"
>
  Save changes (⌘S)
</div>

<!-- 2. Directional Positions (.tooltip--bottom, .tooltip--left, .tooltip--right) -->
<div id="tip-btm" popover="hint" class="tooltip tooltip--bottom" style="position-anchor: --my-anchor;">
  Appears below trigger
</div>

<!-- 3. Arrow Opt-Out (.tooltip--no-arrow) -->
<div id="tip-clean" popover="hint" class="tooltip tooltip--no-arrow" style="position-anchor: --my-anchor;">
  Tooltip without pointer arrow
</div>

<!-- 4. Rich Preview Card Tooltip (Composed with Card Primitive) -->
<div id="tip-card" popover="hint" class="tooltip" style="position-anchor: --my-anchor;">
  <div class="card card--compact card--bordered">
    <article class="card__content">
      <header class="card__header"><h4 class="card__title small-heading">Author Bio</h4></header>
      <div class="card__body"><p class="micro-text">Accessibility lead for Design For Humans.</p></div>
    </article>
  </div>
</div>

<!-- 5. Pure CSS Fallback Container (.has-tooltip) -->
<span class="has-tooltip">
  <button type="button" class="button button--subtle"><span>Hover Me</span></button>
  <span class="tooltip" role="tooltip">Contextual explanation</span>
</span>
\`\`\`

---

#### 2. WCAG 2.2 Conformance Matrix

| Criterion | Level | Implementation Strategy |
| :--- | :---: | :--- |
| **1.4.13 Content on Hover or Focus** | **AA** | **Dismissible**: \`Escape\` dismisses the tooltip without moving pointer. **Hoverable**: Pointer can cross to rich card tooltips. **Persistent**: Content stays visible until trigger blur/unhover. |
| **2.1.1 Keyboard Accessibility** | **A** | Automatically displayed on keyboard focus via native focus events or CSS \`:focus-within\`. |
| **1.4.3 Contrast (Minimum)** | **AA / AAA** | High-contrast inverted styling (\`--surface-inverted\` / \`#1a1a1a\` background with \`--foreground-inverted-strong\` / \`#ffffff\` text) exceeds 12:1 contrast. |
| **4.1.2 Name, Role, Value** | **A** | Invoker declared with \`interestfor\` or \`aria-describedby\` pointing to tooltip id. |
| **Position-Aware Flipping** | **Standard** | Native CSS Anchor Positioning automatically flips the arrow via \`@container anchored(fallback: flip-block)\` container queries. |

---

#### 3. CSS Custom Property Contract Table

| Custom Property | Fallback | Intended Purpose |
| :--- | :--- | :--- |
| \`--tooltip-bg\` | \`var(--surface-inverted, #1a1a1a)\` | Tooltip background fill |
| \`--tooltip-color\` | \`var(--foreground-inverted-strong, #ffffff)\` | Text foreground color |
| \`--tooltip-arrow-size\` | \`0.375rem\` (6px) | Dimensions of pointer arrowhead |
| \`--tooltip-font-size\` | \`var(--typography-font-size--1, 0.8rem)\` | Text typography size step |
| \`--tooltip-max-width\` | \`18rem\` | Maximum width before text-wrapping engages |
| \`--tooltip-offset\` | \`var(--spacing-8, 0.5rem)\` | Gap between trigger and tooltip |
| \`--tooltip-padding-block\` | \`var(--spacing-4, 0.25rem)\` | Vertical internal padding |
| \`--tooltip-padding-inline\` | \`var(--spacing-8, 0.5rem)\` | Horizontal internal padding |
| \`--tooltip-radius\` | \`var(--radius-sm, 0.25rem)\` | Corner rounding |
| \`--tooltip-transition\` | \`var(--duration-sm, 150ms)\` | Top-layer entry & exit speed |
`,
      },
    },
  },
  args: {
    text: 'Save document to cloud storage (⌘S)',
    position: 'top',
    noArrow: false,
    richCard: false,
  },
  argTypes: {
    position: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Directional placement relative to anchor trigger',
    },
    noArrow: {
      control: 'boolean',
      description: 'Suppresses the position-aware anchor arrow',
    },
    richCard: {
      control: 'boolean',
      description: 'Wraps rich Card content inside the tooltip overlay',
    },
  },
};

export default meta;
type Story = StoryObj<TooltipArgs>;

/**
 * 1. Playground (Interactive Sandbox)
 */
export const Playground: Story = {
  render: (args) => {
    const tipId = 'pg-tip-demo';
    const anchorName = '--pg-tip-anchor';

    const posClass = args.position && args.position !== 'top' ? `tooltip--${args.position}` : '';
    const arrowClass = args.noArrow ? 'tooltip--no-arrow' : '';
    const classes = ['tooltip', posClass, arrowClass].filter(Boolean).join(' ');

    const innerContent = args.richCard
      ? `
        <div class="card card--compact card--bordered">
          <article class="card__content">
            <header class="card__header"><h4 class="card__title small-heading">Detailed Information</h4></header>
            <div class="card__body"><p class="micro-text">${args.text}</p></div>
          </article>
        </div>
      `
      : args.text;

    return `
      <div class="demo-stage demo-stage--lg" style="min-block-size: 16rem; display: flex; align-items: center; justify-content: center;">
        <button 
          type="button" 
          class="button button--secondary"
          interestfor="${tipId}"
          popovertarget="${tipId}"
          style="anchor-name: ${anchorName};"
          aria-describedby="${tipId}"
        >
          <span>Hover or Focus Trigger</span>
          <svg class="icon" aria-hidden="true"><use href="#ChevronDown"/></svg>
        </button>

        <div 
          id="${tipId}" 
          popover="hint" 
          class="${classes}"
          style="position-anchor: ${anchorName};"
        >
          ${innerContent}
        </div>
      </div>
    `;
  },
};

/**
 * 2. Anatomy (Exploded View of Trigger, Hint Popover & Anchor Arrow)
 */
export const Anatomy: Story = {
  render: () => {
    return `
      <div class="demo-stage demo-stage--lg demo-stage--card">
        <div class="demo-title-group" style="margin-block-end: var(--spacing-16);">
          <h4 class="demo-heading">Tooltip Anatomy & CSS Anchor Arrow Architecture</h4>
          <p class="demo-desc">
            Tooltips use native HTML <code>[popover="hint"]</code> to allow multiple non-modal hints,
            paired with CSS Anchor Positioning for sub-pixel alignment and automated arrow flipping.
          </p>
        </div>

        <div class="stack" style="gap: var(--spacing-24);">
          <div class="cluster" style="align-items: flex-start; gap: var(--spacing-24);">
            <!-- Trigger Element Spec -->
            <div class="demo-box demo-box--pink demo-constrained--xs">
              <span class="demo-label">1. Invoker Element</span>
              <p class="micro-text" style="margin-block: var(--spacing-4);">
                Button or input declaring <code>interestfor="tip-id"</code> and <code>style="anchor-name: --my-anchor;"</code>.
              </p>
              <button type="button" class="button button--icon" style="pointer-events: none;">
                <svg class="icon" aria-hidden="true"><use href="#Settings"/></svg>
              </button>
            </div>

            <!-- Tooltip Container Spec -->
            <div class="demo-box demo-box--blue demo-constrained--xs">
              <span class="demo-label">2. Hint Overlay Shell</span>
              <p class="micro-text" style="margin-block: var(--spacing-4);">
                Native element with <code>popover="hint"</code>, inverted high-contrast background (12:1 contrast), and <code>text-wrap: balance</code>.
              </p>
              <div class="tooltip" style="position: static; opacity: 1; transform: none; display: inline-block;">
                Sample hint copy
              </div>
            </div>

            <!-- Position-Aware Arrow Spec -->
            <div class="demo-box demo-box--green demo-constrained--xs">
              <span class="demo-label">3. Dynamic Arrow</span>
              <p class="micro-text" style="margin-block: var(--spacing-4);">
                Generated via <code>::before</code> pseudo-element. Automatically adjusts coordinates and flips when the tooltip flips via container queries.
              </p>
              <div style="display: flex; justify-content: center; padding: var(--spacing-8);">
                <div style="inline-size: 10px; block-size: 10px; background-color: #1a1a1a; rotate: 45deg;"></div>
              </div>
            </div>
          </div>

          <div class="demo-box demo-box--neutral">
            <span class="demo-label">WCAG 1.4.13 Compliance Requirements</span>
            <p class="micro-text" style="margin-block-start: var(--spacing-4);">
              Users must be able to dismiss the tooltip by pressing <kbd class="kbd">Esc</kbd> without moving the pointer.
              Tooltips must not obscure critical interactive controls without light-dismiss ability.
            </p>
          </div>
        </div>
      </div>
    `;
  },
};

/**
 * 3. Variants (Action Hints, Keyboard Shortcuts & Rich Card Previews)
 */
export const Variants: Story = {
  render: () => {
    return `
      <div class="demo-stage demo-stage--lg" style="padding-block: 6rem;">
        <div class="cluster" style="justify-content: center; gap: var(--spacing-32); flex-wrap: wrap;">
          
          <!-- Variant 1: Icon Button Action Hint -->
          <div>
            <button 
              type="button" 
              class="button button--icon button--secondary"
              interestfor="v-tip-bookmark"
              popovertarget="v-tip-bookmark"
              style="anchor-name: --v-bm-anchor;"
              aria-label="Bookmark this article"
            >
              <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
              </svg>
            </button>
            <div id="v-tip-bookmark" popover="hint" class="tooltip" style="position-anchor: --v-bm-anchor;">
              Bookmark article
            </div>
          </div>

          <!-- Variant 2: Keyboard Shortcut Hint -->
          <div>
            <button 
              type="button" 
              class="button button--secondary"
              interestfor="v-tip-search"
              popovertarget="v-tip-search"
              style="anchor-name: --v-search-anchor;"
            >
              <svg class="icon" aria-hidden="true"><use href="#Search"/></svg>
              <span>Search</span>
            </button>
            <div id="v-tip-search" popover="hint" class="tooltip" style="position-anchor: --v-search-anchor;">
              Quick Search (⌘K)
            </div>
          </div>

          <!-- Variant 3: Tooltip Without Pointer Arrow -->
          <div>
            <button 
              type="button" 
              class="button button--subtle"
              interestfor="v-tip-clean"
              popovertarget="v-tip-clean"
              style="anchor-name: --v-clean-anchor;"
            >
              <span>Clean Hint</span>
            </button>
            <div id="v-tip-clean" popover="hint" class="tooltip tooltip--no-arrow" style="position-anchor: --v-clean-anchor;">
              Clean hint without anchor arrow
            </div>
          </div>

          <!-- Variant 4: Rich Card Preview Tooltip -->
          <div>
            <button 
              type="button" 
              class="button avatar button--avatar button--round"
              interestfor="v-tip-card"
              popovertarget="v-tip-card"
              style="anchor-name: --v-card-anchor;"
              aria-label="Jordan Lee author profile"
            >
              <span>JL</span>
            </button>
            <div id="v-tip-card" popover="hint" class="tooltip tooltip--bottom" style="position-anchor: --v-card-anchor;">
              <div class="card card--compact card--bordered">
                <article class="card__content">
                  <header class="card__header">
                    <div class="avatar" data-status="online"><span>JL</span></div>
                    <hgroup class="card__hgroup">
                      <h4 class="card__title small-heading">Jordan Lee</h4>
                      <p class="card__subtitle">Accessibility Lead</p>
                    </hgroup>
                  </header>
                  <div class="card__body">
                    <p class="micro-text">Author of 14 WCAG 2.2 audit design specs.</p>
                  </div>
                </article>
              </div>
            </div>
          </div>

          <!-- Variant 5: Pure CSS Fallback Container (.has-tooltip) -->
          <span class="has-tooltip">
            <button type="button" class="button button--subtle">
              <span>Pure CSS Hint</span>
            </button>
            <span class="tooltip" role="tooltip">Hover or focus-within fallback</span>
          </span>

        </div>
      </div>
    `;
  },
};

/**
 * 4. State Matrix (Dormant, Open Top-Layer, High-Contrast & Reduced Motion)
 */
export const StateMatrix: Story = {
  render: () => {
    return `
      <div class="demo-stage demo-stage--lg demo-stage--card">
        <div class="demo-title-group" style="margin-block-end: var(--spacing-16);">
          <h4 class="demo-heading">Tooltip States & Accessibility Matrix</h4>
          <p class="demo-desc">
            Visual inspection of dormant, active, high-contrast, and motion-safe rendering modes.
          </p>
        </div>

        <div class="stack" style="gap: var(--spacing-24);">
          <!-- Active State Static Previews -->
          <div class="demo-box demo-box--neutral">
            <span class="demo-label">Visible State Previews (Inverted High-Contrast Canvas)</span>
            <div class="cluster" style="margin-block-start: var(--spacing-12); align-items: center; gap: var(--spacing-24);">
              <div class="tooltip" style="position: static; opacity: 1; transform: none; display: inline-block;">
                Copy link to clipboard (⌘C)
              </div>
              <div class="tooltip" style="position: static; opacity: 1; transform: none; display: inline-block;">
                Delete item permanently (⌫)
              </div>
              <div class="tooltip" style="position: static; opacity: 1; transform: none; display: inline-block;">
                Filter active audits (Alt+F)
              </div>
            </div>
          </div>

          <!-- High Contrast Mode Simulation -->
          <div class="demo-box demo-box--neutral">
            <span class="demo-label">High Contrast Mode (@media (prefers-contrast: more))</span>
            <div class="cluster" style="margin-block-start: var(--spacing-12); align-items: center; gap: var(--spacing-24);">
              <div class="tooltip" style="position: static; opacity: 1; transform: none; display: inline-block; border: 1px solid currentColor;">
                High-contrast explicit border outline
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },
};

/**
 * 5. Sizes & Density (Single Line, Balanced Multi-Line, Rich Card)
 */
export const SizesAndDensity: Story = {
  render: () => {
    return `
      <div class="demo-stage demo-stage--lg demo-stage--card">
        <div class="demo-title-group" style="margin-block-end: var(--spacing-16);">
          <h4 class="demo-heading">Tooltip Sizing & Text Balancing</h4>
          <p class="demo-desc">Automatically hugs content via <code>inline-size: max-content;</code> and wraps with <code>text-wrap: balance;</code>.</p>
        </div>

        <div class="stack" style="gap: var(--spacing-24); align-items: flex-start;">
          <!-- Single-line Snug -->
          <div class="demo-box demo-box--neutral" style="inline-size: 100%;">
            <span class="demo-label">Compact Single-Line (max-content snug fit)</span>
            <div style="margin-block-start: var(--spacing-8);">
              <div class="tooltip" style="position: static; opacity: 1; transform: none; display: inline-block;">
                Bold (⌘B)
              </div>
            </div>
          </div>

          <!-- Balanced Multi-Line -->
          <div class="demo-box demo-box--neutral" style="inline-size: 100%;">
            <span class="demo-label">Balanced Multi-Line (max-width: 18rem with text-wrap: balance)</span>
            <div style="margin-block-start: var(--spacing-8);">
              <div class="tooltip" style="position: static; opacity: 1; transform: none; display: inline-block; max-inline-size: 18rem;">
                Changes will be saved automatically to local cache before deploying to production.
              </div>
            </div>
          </div>

          <!-- Rich Preview Card -->
          <div class="demo-box demo-box--neutral" style="inline-size: 100%;">
            <span class="demo-label">Rich Preview Card Container (.card composition)</span>
            <div style="margin-block-start: var(--spacing-8);">
              <div class="tooltip" style="position: static; opacity: 1; transform: none; display: inline-block;">
                <div class="card card--compact card--bordered" style="inline-size: 16rem;">
                  <article class="card__content">
                    <header class="card__header"><h4 class="card__title small-heading">Repository Spec</h4></header>
                    <div class="card__body"><p class="micro-text">WCAG 2.2 Level AA / AAA design system component.</p></div>
                  </article>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },
};

/**
 * 6. Directional Anchoring (Top, Bottom, Left/Start, Right/End with Dynamic Arrows)
 */
export const DirectionalAnchoring: Story = {
  render: () => {
    return `
      <div class="demo-stage demo-stage--lg" style="padding-block: 8rem;">
        <div class="demo-title-group" style="margin-block-end: var(--spacing-24); text-align: center;">
          <h4 class="demo-heading">Directional Anchor Positioning Gallery</h4>
          <p class="demo-desc">
            Positioned using <code>position-area</code> with arrows pointing back to the trigger center.
          </p>
        </div>

        <div class="cluster" style="justify-content: center; gap: var(--spacing-32); flex-wrap: wrap;">
          <!-- Top (Default) -->
          <div>
            <button type="button" class="button button--secondary" interestfor="tip-dir-top" popovertarget="tip-dir-top" style="anchor-name: --dir-top-anchor;">
              <span>Top (Default)</span>
            </button>
            <div id="tip-dir-top" popover="hint" class="tooltip" style="position-anchor: --dir-top-anchor;">
              Positioned on top
            </div>
          </div>

          <!-- Bottom -->
          <div>
            <button type="button" class="button button--secondary" interestfor="tip-dir-btm" popovertarget="tip-dir-btm" style="anchor-name: --dir-btm-anchor;">
              <span>Bottom</span>
            </button>
            <div id="tip-dir-btm" popover="hint" class="tooltip tooltip--bottom" style="position-anchor: --dir-btm-anchor;">
              Positioned on bottom
            </div>
          </div>

          <!-- Left / Start -->
          <div>
            <button type="button" class="button button--secondary" interestfor="tip-dir-left" popovertarget="tip-dir-left" style="anchor-name: --dir-left-anchor;">
              <span>Left</span>
            </button>
            <div id="tip-dir-left" popover="hint" class="tooltip tooltip--left" style="position-anchor: --dir-left-anchor;">
              Positioned on left
            </div>
          </div>

          <!-- Right / End -->
          <div>
            <button type="button" class="button button--secondary" interestfor="tip-dir-right" popovertarget="tip-dir-right" style="anchor-name: --dir-right-anchor;">
              <span>Right</span>
            </button>
            <div id="tip-dir-right" popover="hint" class="tooltip tooltip--right" style="position-anchor: --dir-right-anchor;">
              Positioned on right
            </div>
          </div>
        </div>
      </div>
    `;
  },
};

/**
 * 7. Real World Recipes (Editor Toolbar, Form Help & Audit Status Badges)
 */
export const RealWorldRecipes: Story = {
  render: () => {
    return `
      <div class="demo-stage demo-stage--lg" style="padding-block: 6rem;">
        <div class="demo-title-group" style="margin-block-end: var(--spacing-24); text-align: center;">
          <h4 class="demo-heading">Real-World Production Tooltip Recipes</h4>
          <p class="demo-desc">High-frequency UI patterns in editing environments and complex forms.</p>
        </div>

        <div class="stack" style="gap: var(--spacing-32); align-items: center;">
          <!-- Recipe 1: Rich Text Editor Action Toolbar -->
          <div class="demo-box demo-box--neutral">
            <span class="demo-label" style="margin-block-end: var(--spacing-8);">Markdown / Rich Text Editor Toolbar</span>
            <div class="button-group button-group--tight buttons-subtle">
              <!-- Bold -->
              <button 
                type="button" 
                class="button button--icon"
                interestfor="rt-bold" 
                popovertarget="rt-bold"
                style="anchor-name: --rt-bold-anchor;"
                aria-label="Format Bold (⌘B)"
              >
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false">
                  <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path>
                  <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path>
                </svg>
              </button>
              <div id="rt-bold" popover="hint" class="tooltip" style="position-anchor: --rt-bold-anchor;">
                Bold (⌘B)
              </div>

              <!-- Italic -->
              <button 
                type="button" 
                class="button button--icon"
                interestfor="rt-italic" 
                popovertarget="rt-italic"
                style="anchor-name: --rt-italic-anchor;"
                aria-label="Format Italic (⌘I)"
              >
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false">
                  <line x1="19" y1="4" x2="10" y2="4"></line>
                  <line x1="14" y1="20" x2="5" y2="20"></line>
                  <line x1="15" y1="4" x2="9" y2="20"></line>
                </svg>
              </button>
              <div id="rt-italic" popover="hint" class="tooltip" style="position-anchor: --rt-italic-anchor;">
                Italic (⌘I)
              </div>

              <!-- Code -->
              <button 
                type="button" 
                class="button button--icon"
                interestfor="rt-code" 
                popovertarget="rt-code"
                style="anchor-name: --rt-code-anchor;"
                aria-label="Inline Code (⌘&#96;)"
              >
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false">
                  <polyline points="16 18 22 12 16 6"></polyline>
                  <polyline points="8 6 2 12 8 18"></polyline>
                </svg>
              </button>
              <div id="rt-code" popover="hint" class="tooltip" style="position-anchor: --rt-code-anchor;">
                Inline Code (⌘&#96;)
              </div>

              <!-- Link -->
              <button 
                type="button" 
                class="button button--icon"
                interestfor="rt-link" 
                popovertarget="rt-link"
                style="anchor-name: --rt-link-anchor;"
                aria-label="Insert Link (⌘K)"
              >
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                </svg>
              </button>
              <div id="rt-link" popover="hint" class="tooltip" style="position-anchor: --rt-link-anchor;">
                Insert Link (⌘K)
              </div>
            </div>
          </div>

          <!-- Recipe 2: Form Field Contextual Help -->
          <div class="demo-box demo-box--neutral demo-constrained--sm">
            <span class="demo-label" style="margin-block-end: var(--spacing-8);">Form Field Contextual Guidance</span>
            <div class="field">
              <div class="field__header">
                <label for="recipe-token" class="field__label">Personal API Token</label>
                <button 
                  type="button" 
                  class="button button--subtle button--icon"
                  interestfor="token-help" 
                  popovertarget="token-help"
                  style="anchor-name: --token-help-anchor; padding: 0; min-block-size: unset; min-inline-size: unset;"
                  aria-label="Token security information"
                >
                  <svg class="icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                  </svg>
                </button>
                <div id="token-help" popover="hint" class="tooltip" style="position-anchor: --token-help-anchor;">
                  Tokens require "repo:read" scope to authenticate automated audits.
                </div>
              </div>
              <input id="recipe-token" type="password" class="input" placeholder="ghp_••••••••••••••••••••" />
            </div>
          </div>

          <!-- Recipe 3: Status Indicator with Micro-Audit Hint -->
          <div class="demo-box demo-box--neutral">
            <span class="demo-label" style="margin-block-end: var(--spacing-8);">Status Badge with Audit Readout</span>
            <div class="cluster" style="gap: var(--spacing-16);">
              <span 
                class="status" 
                data-status="online"
                interestfor="audit-status"
                popovertarget="audit-status"
                style="anchor-name: --audit-status-anchor; cursor: help;"
                tabindex="0"
                role="status"
              >
                WCAG 2.2 AAA Verified
              </span>
              <div id="audit-status" popover="hint" class="tooltip" style="position-anchor: --audit-status-anchor;">
                All 68 axe-core tests passed with 0 violations.
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },
};
