import type { Meta, StoryObj } from '@storybook/html';

interface AlertArgs {
  message: string;
  placement: 'top' | 'sticky' | 'fixed-top' | 'bottom' | 'floating';
  variant: 'default' | 'info' | 'success' | 'warning' | 'error';
  hasAction: boolean;
  actionText?: string;
}

const meta: Meta<AlertArgs> = {
  title: 'Molecules/Alert',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
### Developer & Designer Notes: Alert Primitive

The **Alert** primitive styles full-width site-level announcement bars, global notices, and floating notification banners.
Unlike multi-item toast queues, an Alert represents a **single, prominent, high-priority notification** pinned to the top or bottom of the viewport, or floating above page content.
Composes seamlessly with **Banner** for semantic status colors and **Wrapper** for site-width constraints.

---

#### 1. Canonical Semantic Markup Signatures
AI agents and developers MUST strictly use the following semantic patterns:

\`\`\`html
<!-- 1. Sticky Top Announcement Bar (Sticks to top of viewport) -->
<aside class="alert alert--sticky" role="region" aria-label="System Announcement">
  <div class="banner banner--warning buttons-sm" role="none">
    <div class="banner__inner">
      <p><strong>Scheduled Maintenance:</strong> Services will undergo maintenance on Sunday from 02:00 to 04:00 UTC.</p>
    </div>
    <button type="button" class="button button--subtle button--icon banner__action" aria-label="Dismiss alert">
      <svg class="icon" aria-hidden="true" focusable="false"><use href="#Close"/></svg>
      <span class="visually-hidden">Dismiss</span>
    </button>
  </div>
</aside>

<!-- 2. Bottom Fixed Consent / Cookie Bar (.alert--bottom) -->
<aside class="alert alert--bottom" role="region" aria-label="Cookie Preferences">
  <div class="banner buttons-sm" role="none">
    <div class="banner__inner">
      <p>We use essential cookies to ensure our website functions correctly.</p>
    </div>
    <div class="button-group banner__action">
      <button type="button" class="button button--subtle"><span>Preferences</span></button>
      <button type="button" class="button button--strong button--accent"><span>Accept All</span></button>
    </div>
  </div>
</aside>

<!-- 3. Floating Centered Alert (.alert--floating) -->
<aside class="alert alert--floating" role="status" aria-live="polite">
  <div class="banner banner--success buttons-sm" role="none">
    <div class="banner__inner">
      <p>Account verification email sent successfully.</p>
    </div>
    <button type="button" class="button button--subtle button--icon banner__action" aria-label="Close">
      <svg class="icon" aria-hidden="true"><use href="#Check"/></svg>
    </button>
  </div>
</aside>
\`\`\`

---

#### 2. WCAG 2.2 Conformance Matrix

| Criterion | Level | Implementation Strategy |
| :--- | :---: | :--- |
| **2.4.1 Bypass Blocks** | **A** | Pinned top alerts must appear before \`<main>\` or within \`<header>\` without obstructing top \`.skip-link\` navigation. |
| **4.1.3 Status Messages** | **AA** | Declares \`role="region"\` with \`aria-label\` for persistent notices, or \`role="alert"\` / \`role="status"\` with \`aria-live="polite"\` for dynamic notices. |
| **1.4.3 / 1.4.11 Contrast** | **AA / AAA** | Composed with Banner primitive ensuring >= 4.5:1 text and >= 3:1 graphical boundaries. |
| **2.3.3 Animation from Interactions** | **AAA** | Dismissal animations (\`.alert--dismissing\`) collapse cleanly and disable transforms in \`@media (prefers-reduced-motion: reduce)\`. |

---

#### 3. CSS Custom Property Contract Table

| Custom Property | Fallback | Intended Purpose |
| :--- | :--- | :--- |
| \`--_alert-action-align\` | \`center\` | Vertical alignment of action buttons within banner |
| \`--_alert-border-width\` | \`var(--border-width, 1px)\` | Border thickness for high-contrast frames |
| \`--_alert-padding-block\` | \`var(--spacing-8, 0.5rem)\` | Floating alert container vertical padding |
| \`--_alert-padding-inline\` | \`var(--spacing-16, 1rem)\` | Floating alert container horizontal padding |
| \`--_alert-transition\` | \`var(--duration-sm, 150ms)\` | Dismissal slide & fade duration |
| \`--_alert-z-index\` | \`var(--z-index-sticky, 100)\` | Viewport stacking elevation |
`,
      },
    },
  },
  args: {
    message: 'Scheduled maintenance: Services will undergo maintenance on Sunday from 02:00 to 04:00 UTC.',
    placement: 'sticky',
    variant: 'warning',
    hasAction: true,
    actionText: 'Dismiss',
  },
  argTypes: {
    placement: {
      control: 'select',
      options: ['sticky', 'fixed-top', 'bottom', 'floating'],
      description: 'Viewport placement strategy',
    },
    variant: {
      control: 'select',
      options: ['default', 'info', 'success', 'warning', 'error'],
      description: 'Semantic status theme',
    },
    hasAction: {
      control: 'boolean',
      description: 'Includes dismiss or confirmation action button',
    },
  },
};

export default meta;
type Story = StoryObj<AlertArgs>;

/**
 * 1. Playground (Interactive Sandbox)
 */
export const Playground: Story = {
  render: (args) => {
    const placementClass = args.placement === 'sticky' ? 'alert--sticky' : `alert--${args.placement}`;
    const variantClass = args.variant !== 'default' ? `banner--${args.variant}` : '';

    return `
      <div class="demo-frame" style="block-size: 18rem; position: relative; overflow: hidden;">
        <aside class="alert ${placementClass}" style="position: absolute;" role="region" aria-label="Announcement">
          <div class="banner ${variantClass} buttons-sm" role="none">
            <div class="banner__inner">
              <p>${args.message}</p>
            </div>
            ${args.hasAction
        ? `
                  <button type="button" class="button button--subtle button--icon banner__action" aria-label="Dismiss alert" onclick="this.closest('.alert').classList.add('alert--dismissing')">
                    <svg class="icon" aria-hidden="true" focusable="false"><use href="#Close"/></svg>
                    <span class="visually-hidden">Dismiss</span>
                  </button>
                `
        : ''
      }
          </div>
        </aside>

        <div style="padding: 5rem 2rem 2rem 2rem;">
          <p class="micro-text" style="color: var(--foreground-muted);">
            Main viewport page content area rendered underneath alert container.
          </p>
        </div>
      </div>
    `;
  },
};

/**
 * 2. Anatomy (Exploded View of Pin Layer, Banner Host & Action Alignment)
 */
export const Anatomy: Story = {
  render: () => {
    return `
      <div class="demo-stage demo-stage--lg demo-stage--card">
        <div class="demo-title-group" style="margin-block-end: var(--spacing-16);">
          <h4 class="demo-heading">Alert Anatomy & Composition Layering</h4>
          <p class="demo-desc">
            The Alert primitive orchestrates viewport placement and dismissal transitions, while composing
            the Banner primitive for internal layout and status theming.
          </p>
        </div>

        <div class="stack" style="gap: var(--spacing-24);">
          <div class="cluster" style="align-items: flex-start; gap: var(--spacing-24);">
            <!-- Viewport Positioning Host Spec -->
            <div class="demo-box demo-box--pink demo-constrained--xs">
              <span class="demo-label">1. Viewport Layer (.alert)</span>
              <p class="micro-text" style="margin-block: var(--spacing-4);">
                Controls <code>position: sticky</code> or <code>fixed</code>, stacking context (<code>z-index: 100</code>), and edge pinning.
              </p>
              <div style="border: 1px dashed var(--accent); padding: var(--spacing-8); border-radius: var(--radius-sm); text-align: center;">
                <span class="micro-text">Viewport Pin Host</span>
              </div>
            </div>

            <!-- Composed Banner Spec -->
            <div class="demo-box demo-box--blue demo-constrained--xs">
              <span class="demo-label">2. Composed Banner (.banner)</span>
              <p class="micro-text" style="margin-block: var(--spacing-4);">
                Under edge-to-edge alerts, <code>.banner</code> automatically resets border-radius to 0 and removes side borders.
              </p>
              <div style="border: 1px dashed #2d4268; padding: var(--spacing-8); border-radius: var(--radius-sm); text-align: center;">
                <span class="micro-text">Edge-to-Edge Banner</span>
              </div>
            </div>

            <!-- Dismissal State Spec -->
            <div class="demo-box demo-box--green demo-constrained--xs">
              <span class="demo-label">3. Dismissal State (.alert--dismissing)</span>
              <p class="micro-text" style="margin-block: var(--spacing-4);">
                Smoothly slides upward (or downward for bottom alerts) via <code>transform: translateY(-100%)</code> with 0 opacity.
              </p>
              <div style="margin-block-start: var(--spacing-8); text-align: center;">
                <kbd class="kbd">transition: transform</kbd>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },
};

/**
 * 3. Variants (Sticky Top, Full-Width Fixed, Bottom Consent & Floating Centered)
 */
export const Variants: Story = {
  render: () => {
    return `
      <div class="demo-stage demo-stage--lg demo-stage--card">
        <div class="stack" style="gap: var(--spacing-24);">
          
          <!-- Variant 1: Sticky Top Announcement -->
          <div class="demo-box demo-box--neutral">
            <span class="demo-label" style="margin-block-end: var(--spacing-8);">1. Sticky Top Announcement (.alert--sticky)</span>
            <div class="demo-frame" style="block-size: 12rem; position: relative; overflow: hidden;">
              <aside class="alert alert--top" style="position: absolute;" role="region" aria-label="Maintenance Notice">
                <div class="banner banner--warning buttons-sm" role="none">
                  <span class="icon-box" aria-hidden="true"><svg class="icon"><use href="#Warning"/></svg></span>
                  <div class="banner__inner">
                    <p><strong>Scheduled Maintenance:</strong> Cloud databases will upgrade Sunday at 02:00 UTC.</p>
                  </div>
                  <button type="button" class="button button--subtle button--icon banner__action" aria-label="Dismiss alert">
                    <svg class="icon" aria-hidden="true"><use href="#Close"/></svg>
                    <span class="visually-hidden">Dismiss</span>
                  </button>
                </div>
              </aside>
              <div style="padding: 4rem 1.5rem 1rem 1.5rem;"><p class="micro-text">Scrolling page body...</p></div>
            </div>
          </div>

          <!-- Variant 2: Full-Width Fixed Top -->
          <div class="demo-box demo-box--neutral">
            <span class="demo-label" style="margin-block-end: var(--spacing-8);">2. Full-Width Fixed Top (.alert--fixed-top)</span>
            <div class="demo-frame" style="block-size: 12rem; position: relative; overflow: hidden;">
              <aside class="alert alert--top" style="position: absolute;" role="region" aria-label="Release Notice">
                <div class="banner banner--info buttons-sm" role="none">
                  <span class="icon-box" aria-hidden="true"><svg class="icon"><use href="#Info"/></svg></span>
                  <div class="banner__inner">
                    <p><strong>New Release:</strong> DFH Components v2.4 with automated axe-core compliance.</p>
                  </div>
                  <button type="button" class="button button--subtle button--icon banner__action" aria-label="Dismiss alert">
                    <svg class="icon" aria-hidden="true"><use href="#Close"/></svg>
                    <span class="visually-hidden">Dismiss</span>
                  </button>
                </div>
              </aside>
              <div style="padding: 4rem 1.5rem 1rem 1.5rem;"><p class="micro-text">Scrolling page body...</p></div>
            </div>
          </div>

          <!-- Variant 3: Bottom Fixed Consent Bar -->
          <div class="demo-box demo-box--neutral">
            <span class="demo-label" style="margin-block-end: var(--spacing-8);">3. Bottom Fixed Consent Bar (.alert--bottom)</span>
            <div class="demo-frame" style="block-size: 14rem; position: relative; overflow: hidden;">
              <div style="padding: 1.5rem;"><p class="micro-text">Main viewport content area...</p></div>
              <aside class="alert alert--bottom" style="position: absolute;" role="region" aria-label="Cookie Preferences">
                <div class="banner buttons-sm" role="none">
                  <div class="banner__inner">
                    <p>We use essential cookies to maintain security and session state.</p>
                  </div>
                  <div class="button-group banner__action">
                    <button type="button" class="button button--subtle"><span>Preferences</span></button>
                    <button type="button" class="button button--strong button--accent"><span>Accept All</span></button>
                  </div>
                </div>
              </aside>
            </div>
          </div>

          <!-- Variant 4: Floating Centered Alert -->
          <div class="demo-box demo-box--neutral">
            <span class="demo-label" style="margin-block-end: var(--spacing-8);">4. Floating Centered Alert (.alert--floating)</span>
            <div class="demo-frame" style="block-size: 12rem; position: relative; overflow: hidden;">
              <aside class="alert alert--floating" style="position: absolute; inset-block-start: 0; inset-inline: 0;" role="status">
                <div class="banner banner--success buttons-sm" style="box-shadow: var(--shadow-md);" role="none">
                  <span class="icon-box" aria-hidden="true"><svg class="icon"><use href="#Check"/></svg></span>
                  <div class="banner__inner">
                    <p>Audit results synchronized to production repository.</p>
                  </div>
                  <button type="button" class="button button--subtle button--icon banner__action" aria-label="Dismiss alert">
                    <svg class="icon" aria-hidden="true"><use href="#Close"/></svg>
                    <span class="visually-hidden">Dismiss</span>
                  </button>
                </div>
              </aside>
            </div>
          </div>

        </div>
      </div>
    `;
  },
};

/**
 * 4. State Matrix (Active in Viewport vs Dismissing State)
 */
export const StateMatrix: Story = {
  render: () => {
    return `
      <div class="demo-stage demo-stage--lg demo-stage--card">
        <div class="demo-title-group" style="margin-block-end: var(--spacing-16);">
          <h4 class="demo-heading">Alert Dismissal & Contrast States</h4>
          <p class="demo-desc">
            Shows active in-flow alerts alongside animated slide-out dismissal states.
          </p>
        </div>

        <div class="stack" style="gap: var(--spacing-24);">
          <div class="demo-box demo-box--neutral">
            <span class="demo-label">Interactive Dismissal Simulation (Click Close to Slide Out)</span>
            <div class="demo-frame" style="block-size: 10rem; position: relative; overflow: hidden; margin-block-start: var(--spacing-8);">
              <aside id="demo-alert-dismiss" class="alert alert--top" style="position: absolute;" role="region" aria-label="Notice">
                <div class="banner banner--warning buttons-sm" role="none">
                  <div class="banner__inner">
                    <p>Click the close button to trigger <code>.alert--dismissing</code> animation.</p>
                  </div>
                  <button 
                    type="button" 
                    class="button button--subtle button--icon banner__action" 
                    aria-label="Dismiss"
                    onclick="document.getElementById('demo-alert-dismiss').classList.add('alert--dismissing')"
                  >
                    <svg class="icon" aria-hidden="true"><use href="#Close"/></svg>
                  </button>
                </div>
              </aside>
              <div style="padding: 4rem 1.5rem; text-align: center;">
                <button 
                  type="button" 
                  class="button button--sm"
                  onclick="document.getElementById('demo-alert-dismiss').classList.remove('alert--dismissing')"
                >
                  <span>Reset Alert</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },
};

/**
 * 5. Sizes & Density (Edge-to-Edge Full Width vs Constrained Wrapper)
 */
export const SizesAndDensity: Story = {
  render: () => {
    return `
      <div class="demo-stage demo-stage--lg demo-stage--card">
        <div class="demo-title-group" style="margin-block-end: var(--spacing-16);">
          <h4 class="demo-heading">Alert Density & Width Modes</h4>
          <p class="demo-desc">Unconstrained edge-to-edge banners versus constrained floating announcements.</p>
        </div>

        <div class="stack" style="gap: var(--spacing-24);">
          <!-- Full Width Edge to Edge -->
          <div class="demo-box demo-box--neutral">
            <span class="demo-label">Edge-to-Edge Unconstrained Banner</span>
            <aside class="alert" style="margin-block-start: var(--spacing-8);" role="region" aria-label="Edge to edge">
              <div class="banner banner--info buttons-sm">
                <div class="banner__inner">
                  <p class="micro-text">Fills 100% of viewport width without perimeter rounding.</p>
                </div>
              </div>
            </aside>
          </div>

          <!-- Constrained Floating Banner -->
          <div class="demo-box demo-box--neutral">
            <span class="demo-label">Constrained Centered Floating Alert (.alert--floating)</span>
            <aside class="alert alert--floating" style="margin-block-start: var(--spacing-8);" role="region" aria-label="Constrained">
              <div class="banner banner--success buttons-sm demo-constrained--sm" style="margin-inline: auto;">
                <div class="banner__inner">
                  <p class="micro-text">Constrained width with perimeter rounding and drop shadow.</p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    `;
  },
};

/**
 * 6. Real World Recipes (Outage Notice, Cookie Consent & Verification Callout)
 */
export const RealWorldRecipes: Story = {
  render: () => {
    return `
      <div class="demo-stage demo-stage--lg demo-stage--card">
        <div class="demo-title-group" style="margin-block-end: var(--spacing-24); text-align: center;">
          <h4 class="demo-heading">Real-World Production Recipes</h4>
          <p class="demo-desc">High-frequency announcement bars across global web properties.</p>
        </div>

        <div class="stack" style="gap: var(--spacing-24);">
          <!-- Recipe 1: Global Site Outage Banner -->
          <div class="demo-frame" style="block-size: 12rem; position: relative; overflow: hidden;">
            <aside class="alert alert--top" style="position: absolute;" role="alert">
              <div class="banner banner--error buttons-sm" role="none">
                <span class="icon-box" aria-hidden="true"><svg class="icon"><use href="#Warning"/></svg></span>
                <div class="banner__inner">
                  <p><strong>Partial Outage:</strong> Payment processing is currently degraded. Engineers are investigating.</p>
                </div>
                <a href="#status" class="link micro-text banner__action" style="align-self: center;"><span>Status Page</span></a>
              </div>
            </aside>
          </div>

          <!-- Recipe 2: Cookie / Telemetry Consent Bar -->
          <div class="demo-frame" style="block-size: 14rem; position: relative; overflow: hidden;">
            <aside class="alert alert--bottom" style="position: absolute;" role="region" aria-label="Cookie Preferences">
              <div class="banner buttons-sm" role="none">
                <div class="banner__inner">
                  <p><strong>Your Privacy Choices:</strong> We use cookies to verify design system accessibility performance.</p>
                </div>
                <div class="button-group banner__action">
                  <button type="button" class="button button--subtle"><span>Reject Non-Essential</span></button>
                  <button type="button" class="button button--strong button--accent"><span>Accept All</span></button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    `;
  },
};
