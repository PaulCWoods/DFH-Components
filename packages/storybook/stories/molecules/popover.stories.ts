import type { Meta, StoryObj } from '@storybook/html';

interface PopoverArgs {
  title: string;
  content: string;
  size?: 'default' | 'lg' | 'xl';
  position?: 'bottom' | 'top' | 'end' | 'bottom-end';
  bordered?: boolean;
  translucent?: boolean;
}

const meta: Meta<PopoverArgs> = {
  title: 'Molecules/Popover',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
### Developer & Designer Notes: Popover Primitive

The **Popover** primitive provides an accessible, non-modal or light-dismiss floating overlay leveraging the native HTML \`[popover]\` attribute and **CSS Anchor Positioning** (\`position-anchor\`, \`position-area\`, \`position-try-fallbacks\`).
Like \`<dialog>\`, Popover acts as a transparent, top-layer positioning wrapper designed to hold composable primitives such as **Card**, **Banner**, and stacked **Button Group**.

---

#### 1. Canonical Semantic Markup Signatures
AI agents and developers MUST strictly use the following semantic patterns:

\`\`\`html
<!-- 1. Anchored Action Menu (Trigger + Popover + Card + Stacked Button Group) -->
<button 
  type="button" 
  class="button" 
  popovertarget="doc-actions" 
  style="anchor-name: --action-anchor;"
  aria-haspopup="dialog"
>
  <span>Document Actions</span>
  <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#ChevronDown"/></svg>
</button>

<div 
  id="doc-actions" 
  popover 
  class="popover popover--anchored" 
  style="position-anchor: --action-anchor;"
>
  <div class="card card--compact card--bordered card--translucent card--ruled">
    <article class="card__content">
      <header class="card__header">
        <h3 class="card__title small-heading">Actions</h3>
      </header>
      <div class="card__body card__body--flush">
        <div class="button-group button-group--tight button-group--stacked buttons-subtle">
          <button type="button" class="button">
            <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Duplicate"/></svg>
            <span>Duplicate File</span>
          </button>
          <button type="button" class="button">
            <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Download"/></svg>
            <span>Export Manifest</span>
          </button>
          <hr class="divider">
          <button type="button" class="button button--danger">
            <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Delete"/></svg>
            <span>Delete File</span>
          </button>
        </div>
      </div>
    </article>
  </div>
</div>

<!-- 2. Sizing Modifiers (.popover--lg, .popover--xl) -->
<div id="large-popover" popover class="popover popover--anchored popover--lg" style="position-anchor: --my-anchor;">
  <!-- 24rem width container -->
</div>

<!-- 3. Directional Anchor Positions (.popover--top, .popover--end, .popover--bottom-end) -->
<div id="top-popover" popover class="popover popover--top" style="position-anchor: --my-anchor;">
  <!-- Positioned above trigger with flip fallback -->
</div>

<!-- 4. Standalone Popover Fallback (without nested Card or Banner) -->
<div id="simple-popover" popover class="popover">
  <p>Quick contextual note rendered directly in standalone popover shell.</p>
</div>
\`\`\`

---

#### 2. WCAG 2.2 Conformance Matrix

| Criterion | Level | Implementation Strategy |
| :--- | :---: | :--- |
| **2.1.1 Keyboard Accessibility** | **A** | Native browser behavior: \`Escape\` triggers light-dismiss automatically without JavaScript event listeners. |
| **2.4.3 Focus Order** | **A** | Focus enters popover content predictably upon interaction; light-dismiss automatically returns focus to the invoking trigger. |
| **4.1.2 Name, Role, Value** | **A** | Invoker declared via native HTML \`popovertarget\` and enhanced with \`aria-haspopup="dialog"\`. |
| **1.4.3 / 1.4.11 Contrast** | **AA / AAA** | Composed Card/Banner surfaces guarantee 4.5:1 text and 3:1 UI borders. Fallback standalone popover provides high-contrast canvas surfaces. |
| **Modern Animation Standards** | **Standard** | Uses top-layer discrete transitions with \`@starting-style\` and \`transition-behavior: allow-discrete;\` (smooth scale and fade without RAF loops). |

---

#### 3. CSS Custom Property Contract Table

| Custom Property | Fallback | Intended Purpose |
| :--- | :--- | :--- |
| \`--popover-bg\` | \`var(--surface-card, Canvas)\` | Standalone popover background fill |
| \`--popover-border-color\` | \`var(--border-quiet, transparent)\` | Standalone border stroke |
| \`--popover-border-width\` | \`var(--border-width, 1px)\` | Border thickness |
| \`--popover-color\` | \`var(--foreground, currentColor)\` | Text foreground color |
| \`--popover-max-width\` | \`var(--spacing-block-xs, 16rem)\` | Default max inline width |
| \`--popover-lg-max-width\` | \`var(--spacing-block-sm, 24rem)\` | Modifer width for \`.popover--lg\` |
| \`--popover-xl-max-width\` | \`var(--spacing-block, 36rem)\` | Modifer width for \`.popover--xl\` |
| \`--popover-offset\` | \`var(--spacing-8, 0.5rem)\` | Distance offset from anchor element |
| \`--popover-cushion\` | \`var(--spacing-cushion, 2rem)\` | Viewport edge padding barrier |
| \`--popover-radius\` | \`var(--radius, 0.25rem)\` | Corner rounding for fallback popover |
| \`--popover-shadow\` | \`var(--shadow-md)\` | Elevation shadow for standalone popover |
| \`--popover-transition\` | \`var(--duration-sm, 150ms)\` | Top-layer entry & exit duration |
`,
      },
    },
  },
  args: {
    title: 'Document Options',
    content: 'Manage configuration and deployment parameters for this artifact.',
    size: 'default',
    position: 'bottom',
    bordered: true,
    translucent: false,
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['default', 'lg', 'xl'],
      description: 'Popover width sizing tier',
    },
    position: {
      control: 'select',
      options: ['bottom', 'top', 'end', 'bottom-end'],
      description: 'CSS Anchor position-area direction',
    },
    bordered: {
      control: 'boolean',
      description: 'Enables explicit border framing on nested card',
    },
    translucent: {
      control: 'boolean',
      description: 'Enables frosted translucent backdrop on nested card',
    },
  },
};

export default meta;
type Story = StoryObj<PopoverArgs>;

/**
 * 1. Playground (Interactive Sandbox)
 */
export const Playground: Story = {
  render: (args) => {
    const popoverId = 'pg-popover-demo';
    const anchorName = '--pg-anchor';

    const sizeClass = args.size && args.size !== 'default' ? `popover--${args.size}` : '';
    const posClass = args.position && args.position !== 'bottom' ? `popover--${args.position}` : 'popover--anchored';
    const cardClasses = [
      'card',
      'card--compact',
      args.bordered ? 'card--bordered' : '',
      args.translucent ? 'card--translucent' : '',
    ]
      .filter(Boolean)
      .join(' ');

    return `
      <div class="demo-stage demo-stage--lg" style="min-block-size: 20rem; display: flex; align-items: center; justify-content: center;">
        <button 
          type="button" 
          class="button button--strong button--accent"
          popovertarget="${popoverId}"
          style="anchor-name: ${anchorName};"
          aria-haspopup="dialog"
        >
          <span>Open Popover</span>
          <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#ChevronDown"/></svg>
        </button>

        <div 
          id="${popoverId}" 
          popover 
          class="popover ${posClass} ${sizeClass}"
          style="position-anchor: ${anchorName};"
        >
          <div class="${cardClasses}">
            <article class="card__content">
              <header class="card__header">
                <h3 class="card__title small-heading">${args.title}</h3>
              </header>
              <div class="card__body">
                <p class="small-text">${args.content}</p>
              </div>
              <footer class="card__footer" style="display: flex; justify-content: flex-end; gap: var(--spacing-8);">
                <button type="button" class="button button--subtle button--sm" popovertarget="${popoverId}" popovertargetaction="hide">
                  <span>Close</span>
                </button>
              </footer>
            </article>
          </div>
        </div>
      </div>
    `;
  },
};

/**
 * 2. Anatomy (Exploded View of Anchor, Wrapper & Composed Primitives)
 */
export const Anatomy: Story = {
  render: () => {
    return `
      <div class="demo-stage demo-stage--lg demo-stage--card">
        <div class="demo-title-group" style="margin-block-end: var(--spacing-16);">
          <h4 class="demo-heading">Popover Anatomy & Top-Layer Architecture</h4>
          <p class="demo-desc">
            The Popover primitive leverages native HTML5 <code>[popover]</code> for top-layer elevation and light-dismiss,
            while CSS Anchor Positioning binds its viewport coordinates to an anchor button.
          </p>
        </div>

        <div class="stack" style="gap: var(--spacing-24);">
          <div class="cluster" style="align-items: flex-start; gap: var(--spacing-24);">
            <!-- Trigger Element Spec -->
            <div class="demo-box demo-box--pink demo-constrained--xs">
              <span class="demo-label">1. Invoker Element</span>
              <p class="small-text" style="margin-block: var(--spacing-4);">
                Button declaring <code>style="anchor-name: --my-anchor;"</code> and <code>popovertarget="popover-id"</code>.
              </p>
              <button type="button" class="button" style="pointer-events: none;">
                <span>Anchor Trigger</span>
                <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#ChevronDown"/></svg>
              </button>
            </div>

            <!-- Popover Shell Spec -->
            <div class="demo-box demo-box--blue demo-constrained--xs">
              <span class="demo-label">2. Popover Wrapper</span>
              <p class="small-text" style="margin-block: var(--spacing-4);">
                Top-layer container with <code>[popover]</code> and <code>style="position-anchor: --my-anchor;"</code>.
                Resets default borders and background.
              </p>
              <div style="padding: var(--spacing-8); border: 1px dashed var(--accent); border-radius: var(--radius-sm); text-align: center;">
                <span class="small-text">Transparent [popover] Host</span>
              </div>
            </div>

            <!-- Composed Card Surface Spec -->
            <div class="demo-box demo-box--green demo-constrained--xs">
              <span class="demo-label">3. Composed Surface</span>
              <p class="small-text" style="margin-block: var(--spacing-4);">
                Nested <code>.card</code> or <code>.banner</code> provides surface color, borders, padding, and hierarchy.
              </p>
              <div class="card card--compact" style="pointer-events: none;">
                <div class="card__content">
                  <header class="card__header"><h5 class="card__title small-heading">Card Content</h5></header>
                </div>
              </div>
            </div>
          </div>

          <div class="demo-box demo-box--neutral">
            <span class="demo-label">Top-Layer Discrete Transitions</span>
            <p class="small-text" style="margin-block-start: var(--spacing-4);">
              Popovers fade and scale cleanly on open/close without JavaScript using:
              <code>@starting-style { opacity: 0; transform: scale(0.96) translateY(-0.25rem); }</code>
              and <code>transition-behavior: allow-discrete;</code>.
            </p>
          </div>
        </div>
      </div>
    `;
  },
};

/**
 * 3. Variants (Functional Compositions with Core Primitives)
 */
export const Variants: Story = {
  render: () => {
    return `
      <div class="demo-stage demo-stage--lg" style="padding-block: 8rem;">
        <div class="cluster" style="justify-content: center; gap: var(--spacing-32); flex-wrap: wrap;">
          
          <!-- Variant 1: Action Menu Popover -->
          <div>
            <button 
              type="button" 
              class="button" 
              popovertarget="v-actions" 
              style="anchor-name: --v-actions-anchor;"
              aria-haspopup="dialog"
            >
              <span>Actions Menu</span>
              <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#ChevronDown"/></svg>
            </button>

            <div id="v-actions" popover class="popover popover--anchored" style="position-anchor: --v-actions-anchor;">
              <div class="card card--compact card--bordered card--translucent card--ruled">
                <article class="card__content">
                  <header class="card__header">
                    <h3 class="card__title small-heading">Document Options</h3>
                  </header>
                  <div class="card__body card__body--flush">
                    <div class="button-group button-group--tight button-group--stacked buttons-subtle">
                      <button type="button" class="button">
                        <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Duplicate"/></svg>
                        <span>Duplicate</span>
                      </button>
                      <button type="button" class="button">
                        <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Download"/></svg>
                        <span>Export JSON</span>
                      </button>
                      <hr class="divider">
                      <button type="button" class="button button--danger">
                        <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Delete"/></svg>
                        <span>Delete Item</span>
                      </button>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </div>

          <!-- Variant 2: User Profile Popover -->
          <div>
            <button 
              type="button" 
              class="button avatar button--avatar button--round"
              popovertarget="v-profile" 
              style="anchor-name: --v-profile-anchor;"
              data-status="online"
              aria-label="View Jordan Lee profile (online)"
            >
              <span aria-hidden="true">JL</span>
            </button>

            <div id="v-profile" popover class="popover popover--anchored popover--lg" style="position-anchor: --v-profile-anchor;">
              <div class="card card--compact">
                <article class="card__content">
                  <header class="card__header">
                    <div class="avatar" data-status="online" aria-label="Jordan Lee (online)">
                      <span aria-hidden="true">JL</span>
                    </div>
                    <hgroup class="card__hgroup">
                      <h3 class="card__title small-heading">Jordan Lee</h3>
                      <p class="card__subtitle small-text text-muted">jordan.lee@dfh.design</p>
                    </hgroup>
                  </header>
                  <div class="card__body">
                    <div class="stack">
                      <div class="cluster">
                        <span class="chip chip--subtle"><span class="chip__text">Design Lead</span></span>
                        <span class="status status--success status--plain"><span class="status__text">Online</span></span>
                      </div>
                      <p class="small-text">
                        Lead accessibility auditor for WCAG 2.2 Level AA / AAA design systems.
                      </p>
                    </div>
                  </div>
                  <footer class="card__footer">
                    <div class="button-group button-group--space-between">
                      <button type="button" class="button button--strong button--accent button--sm"><span>Profile</span></button>
                      <button type="button" class="button button--subtle button--sm"><span>Sign Out</span></button>
                    </div>
                  </footer>
                </article>
              </div>
            </div>
          </div>

          <!-- Variant 3: Preferences / Settings Popover -->
          <div>
            <button 
              type="button" 
              class="button" 
              popovertarget="v-prefs" 
              style="anchor-name: --v-prefs-anchor;"
            >
              <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Settings"/></svg>
              <span>Settings</span>
            </button>

            <div id="v-prefs" popover class="popover popover--anchored popover--lg" style="position-anchor: --v-prefs-anchor;">
              <div class="card card--compact card--ruled">
                <article class="card__content">
                  <header class="card__header">
                    <h3 class="card__title small-heading">Preferences</h3>
                  </header>
                  <div class="card__body">
                    <div class="stack" style="gap: var(--spacing-16);">
                      <label class="switch switch--sm" style="inline-size: 100%;">
                        <span class="switch__label small-text">High Contrast Mode</span>
                        <input type="checkbox" role="switch" class="visually-hidden" />
                        <span class="switch__control" aria-hidden="true">
                          <span class="switch__option switch__option--off">Off</span>
                          <span class="switch__option switch__option--on">On</span>
                        </span>
                      </label>
                      <div class="field">
                        <div class="field__header">
                          <label for="v-scale" class="field__label">UI Scale</label>
                          <output for="v-scale" class="field__output">100%</output>
                        </div>
                        <input id="v-scale" type="range" class="range range--sm" value="50" min="0" max="100" style="--value: 50%;" />
                      </div>
                    </div>
                  </div>
                  <footer class="card__footer card__footer--flush">
                    <div class="button-group button-group--fill-items">
                      <button type="button" class="button button--subtle" popovertarget="v-prefs" popovertargetaction="hide">
                        <span>Done</span>
                      </button>
                    </div>
                  </footer>
                </article>
              </div>
            </div>
          </div>

          <!-- Variant 4: Banner Popover -->
          <div>
            <button 
              type="button" 
              class="button button--icon" 
              popovertarget="v-notice" 
              style="anchor-name: --v-notice-anchor; position: relative;"
              aria-label="View system notifications"
            >
              <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#BellFilled"/></svg>
              <span class="badge badge--danger badge--sm badge--bottom-start">
                <span class="badge__text">1</span>
              </span>
            </button>

            <div id="v-notice" popover class="popover popover--anchored popover--lg" style="position-anchor: --v-notice-anchor;">
              <div class="banner banner--warning buttons-sm" role="status">
                <div class="banner__inner">
                  <h4 class="subheading">Storage Notice</h4>
                  <p>Your team workspace is at 82% capacity.</p>
                  <div class="button-group">
                    <button type="button" class="button button--strong button--accent"><span>Upgrade</span></button>
                    <button type="button" class="button button--subtle" popovertarget="v-notice" popovertargetaction="hide"><span>Dismiss</span></button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Variant 5: Standalone Popover Fallback -->
          <div>
            <button 
              type="button" 
              class="button button--subtle" 
              popovertarget="v-fallback" 
              style="anchor-name: --v-fallback-anchor;"
            >
              <span>Quick Note</span>
            </button>

            <div id="v-fallback" popover class="popover popover--anchored" style="position-anchor: --v-fallback-anchor;">
              <p class="small-text">
                <strong>Standalone Popover:</strong> Styled via <code>--_popover-bg</code> and <code>--_popover-padding</code> directly without a nested Card primitive.
              </p>
            </div>
          </div>

        </div>
      </div>
    `;
  },
};

/**
 * 4. State Matrix (Closed, Open in Top-Layer, Light-Dismiss, High-Contrast)
 */
export const StateMatrix: Story = {
  render: () => {
    return `
      <div class="demo-stage demo-stage--lg demo-stage--card">
        <div class="demo-title-group" style="margin-block-end: var(--spacing-16);">
          <h4 class="demo-heading">Popover State & Lifecycle Matrix</h4>
          <p class="demo-desc">
            States managed natively by HTML5 Top-Layer and CSS pseudoclasses with zero JavaScript event listeners.
          </p>
        </div>

        <div class="stack" style="gap: var(--spacing-24);">
          <!-- Open State Visual Simulation -->
          <div class="demo-box demo-box--neutral">
            <span class="demo-label">Open State (:popover-open in Top Layer)</span>
            <div class="cluster" style="margin-block-start: var(--spacing-12); align-items: flex-start; gap: var(--spacing-24);">
              <div class="popover popover--anchored" style="position: static; opacity: 1; transform: none; pointer-events: auto; inline-size: 18rem;">
                <div class="card card--compact card--bordered">
                  <article class="card__content">
                    <header class="card__header">
                      <h4 class="card__title small-heading">Active Menu Surface</h4>
                    </header>
                    <div class="card__body">
                      <p class="small-text">Rendered on top of all page content via browser top-layer stacking context.</p>
                    </div>
                  </article>
                </div>
              </div>

              <div class="stack demo-constrained--sm">
                <div class="demo-box demo-box--green">
                  <span class="demo-label">Light-Dismiss (Zero JS)</span>
                  <p class="small-text">Clicking anywhere outside the popover or pressing <kbd class="kbd">Esc</kbd> automatically dismisses the element.</p>
                </div>
                <div class="demo-box demo-box--blue">
                  <span class="demo-label">Accessibility Association</span>
                  <p class="small-text">Invoker buttons declare <code>aria-haspopup="dialog"</code> so screen readers announce menu availability.</p>
                </div>
              </div>
            </div>
          </div>

          <!-- High Contrast Mode Simulation -->
          <div class="demo-box demo-box--neutral">
            <span class="demo-label">High Contrast Mode (@media (prefers-contrast: more))</span>
            <div class="cluster" style="margin-block-start: var(--spacing-12); align-items: flex-start; gap: var(--spacing-24);">
              <div class="popover" style="position: static; opacity: 1; transform: none; outline: 2px solid currentColor; outline-offset: 1px; inline-size: 18rem;">
                <p class="small-text" style="padding: var(--spacing-12); margin: 0;">
                  Standalone popovers automatically render an explicit 2px outline in forced-colors / high contrast environments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },
};

/**
 * 5. Sizes & Density (Default 16rem, Large 24rem, Extra Large 36rem)
 */
export const SizesAndDensity: Story = {
  render: () => {
    return `
      <div class="demo-stage demo-stage--lg demo-stage--card">
        <div class="demo-title-group" style="margin-block-end: var(--spacing-16);">
          <h4 class="demo-heading">Popover Width Scales</h4>
          <p class="demo-desc">Configured via CSS custom property overrides or dedicated modifier classes.</p>
        </div>

        <div class="stack" style="gap: var(--spacing-24); align-items: flex-start;">
          <!-- Default -->
          <div class="demo-box demo-box--neutral" style="inline-size: 100%;">
            <span class="demo-label">Standard Size (max-width: 16rem / --spacing-block-xs)</span>
            <div class="popover" style="position: static; opacity: 1; transform: none; margin-block-start: var(--spacing-8);">
              <div class="card card--compact card--bordered">
                <article class="card__content">
                  <header class="card__header"><h4 class="card__title small-heading">Standard Width (16rem)</h4></header>
                  <div class="card__body"><p class="small-text">Ideal for context action menus, select options, and small filters.</p></div>
                </article>
              </div>
            </div>
          </div>

          <!-- Large -->
          <div class="demo-box demo-box--neutral" style="inline-size: 100%;">
            <span class="demo-label">Large Size (.popover--lg: max-width 24rem / --spacing-block-sm)</span>
            <div class="popover popover--lg" style="position: static; opacity: 1; transform: none; margin-block-start: var(--spacing-8);">
              <div class="card card--compact card--bordered">
                <article class="card__content">
                  <header class="card__header"><h4 class="card__title small-heading">Large Width (24rem)</h4></header>
                  <div class="card__body"><p class="small-text">Ideal for user profile summaries, multi-control settings, and notification lists.</p></div>
                </article>
              </div>
            </div>
          </div>

          <!-- Extra Large -->
          <div class="demo-box demo-box--neutral" style="inline-size: 100%;">
            <span class="demo-label">Extra Large Size (.popover--xl: max-width 36rem / --spacing-block)</span>
            <div class="popover popover--xl" style="position: static; opacity: 1; transform: none; margin-block-start: var(--spacing-8);">
              <div class="card card--compact card--bordered">
                <article class="card__content">
                  <header class="card__header"><h4 class="card__title small-heading">Extra Large Width (36rem)</h4></header>
                  <div class="card__body"><p class="small-text">Ideal for rich preview cards, complex data filters, and multi-column menus.</p></div>
                </article>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },
};

/**
 * 6. Directional Anchoring (CSS Anchor Positioning Directions & Fallbacks)
 */
export const DirectionalAnchoring: Story = {
  render: () => {
    return `
      <div class="demo-stage demo-stage--lg" style="padding-block: 10rem;">
        <div class="demo-title-group" style="margin-block-end: var(--spacing-24); text-align: center;">
          <h4 class="demo-heading">CSS Anchor Positioning Directions</h4>
          <p class="demo-desc">
            Leveraging <code>position-area</code> with automatic <code>position-try-fallbacks: flip-block, flip-inline;</code>
          </p>
        </div>

        <div class="cluster" style="justify-content: center; gap: var(--spacing-24); flex-wrap: wrap;">
          <!-- Bottom (Default) -->
          <div>
            <button type="button" class="button" popovertarget="dir-bottom" style="anchor-name: --dir-bottom-btn;">
              <span>Bottom (Default)</span>
            </button>
            <div id="dir-bottom" popover class="popover popover--anchored" style="position-anchor: --dir-bottom-btn;">
              <div class="card card--compact card--bordered">
                <p class="small-text" style="padding: var(--spacing-12); margin: 0;">Anchored to bottom span-right.</p>
              </div>
            </div>
          </div>

          <!-- Top -->
          <div>
            <button type="button" class="button" popovertarget="dir-top" style="anchor-name: --dir-top-btn;">
              <span>Top (.popover--top)</span>
            </button>
            <div id="dir-top" popover class="popover popover--top" style="position-anchor: --dir-top-btn;">
              <div class="card card--compact card--bordered">
                <p class="small-text" style="padding: var(--spacing-12); margin: 0;">Anchored to top span-right.</p>
              </div>
            </div>
          </div>

          <!-- End / Right -->
          <div>
            <button type="button" class="button" popovertarget="dir-end" style="anchor-name: --dir-end-btn;">
              <span>End (.popover--end)</span>
            </button>
            <div id="dir-end" popover class="popover popover--end" style="position-anchor: --dir-end-btn;">
              <div class="card card--compact card--bordered">
                <p class="small-text" style="padding: var(--spacing-12); margin: 0;">Anchored to right span-bottom.</p>
              </div>
            </div>
          </div>

          <!-- Bottom End -->
          <div>
            <button type="button" class="button" popovertarget="dir-bottom-end" style="anchor-name: --dir-bottom-end-btn;">
              <span>Bottom-End (.popover--bottom-end)</span>
            </button>
            <div id="dir-bottom-end" popover class="popover popover--bottom-end" style="position-anchor: --dir-bottom-end-btn;">
              <div class="card card--compact card--bordered">
                <p class="small-text" style="padding: var(--spacing-12); margin: 0;">Anchored to bottom span-left.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },
};

/**
 * 7. Real World Recipes (Context Menu, Filter Panel & Glossary Help Card)
 */
export const RealWorldRecipes: Story = {
  render: () => {
    return `
      <div class="demo-stage demo-stage--lg" style="padding-block: 8rem;">
        <div class="demo-title-group" style="margin-block-end: var(--spacing-24); text-align: center;">
          <h4 class="demo-heading">Real-World Production Recipes</h4>
          <p class="demo-desc">High-frequency UI patterns composed with DFH Design System primitives.</p>
        </div>

        <div class="cluster" style="justify-content: center; gap: var(--spacing-32); flex-wrap: wrap;">
          <!-- Recipe 1: Context Menu / Action Palette -->
          <div>
            <button 
              type="button" 
              class="button button--strong button--accent"
              popovertarget="recipe-ctx" 
              style="anchor-name: --recipe-ctx-btn;"
              aria-haspopup="dialog"
            >
              <span>Manage Record</span>
              <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#ChevronDown"/></svg>
            </button>

            <div id="recipe-ctx" popover class="popover popover--anchored" style="position-anchor: --recipe-ctx-btn;">
              <div class="card card--compact card--bordered card--translucent card--ruled">
                <article class="card__content">
                  <header class="card__header">
                    <h3 class="card__title small-heading">Record Options</h3>
                  </header>
                  <div class="card__body card__body--flush">
                    <div class="button-group button-group--tight button-group--stacked buttons-subtle">
                      <button type="button" class="button" style="justify-content: space-between;">
                        <span class="cluster" style="gap: var(--spacing-8);">
                          <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Duplicate"/></svg>
                          <span>Clone Record</span>
                        </span>
                        <kbd class="kbd">⌘D</kbd>
                      </button>
                      <button type="button" class="button" style="justify-content: space-between;">
                        <span class="cluster" style="gap: var(--spacing-8);">
                          <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Download"/></svg>
                          <span>Export JSON</span>
                        </span>
                        <kbd class="kbd">⌘E</kbd>
                      </button>
                      <hr class="divider">
                      <button type="button" class="button button--danger" style="justify-content: space-between;">
                        <span class="cluster" style="gap: var(--spacing-8);">
                          <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Delete"/></svg>
                          <span>Archive Record</span>
                        </span>
                        <kbd class="kbd">⌫</kbd>
                      </button>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </div>

          <!-- Recipe 2: Quick Filter Dropdown Panel -->
          <div>
            <button 
              type="button" 
              class="button"
              popovertarget="recipe-filter" 
              style="anchor-name: --recipe-filter-btn;"
              aria-haspopup="dialog"
            >
              <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Settings"/></svg>
              <span>Filter Status</span>
            </button>

            <div id="recipe-filter" popover class="popover popover--anchored popover--lg" style="position-anchor: --recipe-filter-btn;">
              <div class="card card--compact card--bordered card--ruled">
                <article class="card__content">
                  <header class="card__header">
                    <h3 class="card__title small-heading">Filter Deliverables</h3>
                  </header>
                  <div class="card__body">
                    <div class="choices">
                      <label class="choice" for="flt-all">
                        <input type="radio" id="flt-all" name="filter-status" class="radio-input" checked />
                        <span>All Items</span>
                      </label>
                      <label class="choice" for="flt-active">
                        <input type="radio" id="flt-active" name="filter-status" class="radio-input" />
                        <span>Active Audits Only</span>
                      </label>
                      <label class="choice" for="flt-archived">
                        <input type="radio" id="flt-archived" name="filter-status" class="radio-input" />
                        <span>Archived Reviews</span>
                      </label>
                    </div>
                  </div>
                  <footer class="card__footer" style="display: flex; justify-content: flex-end; gap: var(--spacing-8);">
                    <button type="button" class="button button--subtle button--sm" popovertarget="recipe-filter" popovertargetaction="hide">
                      <span>Reset</span>
                    </button>
                    <button type="button" class="button button--strong button--accent button--sm" popovertarget="recipe-filter" popovertargetaction="hide">
                      <span>Apply</span>
                    </button>
                  </footer>
                </article>
              </div>
            </div>
          </div>

          <!-- Recipe 3: Glossary / Help Popover Card -->
          <div>
            <button 
              type="button" 
              class="button button--subtle button--icon"
              popovertarget="recipe-help" 
              style="anchor-name: --recipe-help-btn;"
              aria-label="What is WCAG 2.2?"
            >
              <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Check"/></svg>
            </button>

            <div id="recipe-help" popover class="popover popover--anchored popover--lg" style="position-anchor: --recipe-help-btn;">
              <div class="card card--compact card--bordered">
                <article class="card__content">
                  <header class="card__header">
                    <h3 class="card__title small-heading">WCAG 2.2 Standard</h3>
                  </header>
                  <div class="card__body">
                    <p class="small-text">
                      Web Content Accessibility Guidelines (WCAG) 2.2 covers new criteria including 2.5.8 Target Size (Minimum)
                      and 2.4.11 Focus Not Obscured.
                    </p>
                  </div>
                  <footer class="card__footer" style="display: flex; justify-content: space-between; align-items: center;">
                    <a href="https://www.w3.org/WAI/standards-guidelines/wcag/" target="_blank" rel="noopener noreferrer" class="link small-text">
                      <span>Read W3C Spec</span>
                    </a>
                    <button type="button" class="button button--subtle button--sm" popovertarget="recipe-help" popovertargetaction="hide">
                      <span>Got it</span>
                    </button>
                  </footer>
                </article>
              </div>
            </div>
          </div>

        </div>
      </div>
    `;
  },
};
