import type { Meta, StoryObj } from '@storybook/html';

interface ToastArgs {
  title: string;
  message: string;
  variant: 'default' | 'info' | 'success' | 'warning' | 'error';
  placement: 'bottom-end' | 'bottom-start' | 'bottom-center' | 'top-end' | 'top-start' | 'top-center';
  hasAction: boolean;
  actionLabel?: string;
}

const meta: Meta<ToastArgs> = {
  title: 'Molecules/Toast',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
### Developer & Designer Notes: Toast Primitive

The **Toast** primitive provides accessible, non-modal status notifications, live announcements, and floating alert stacks.
Composed directly with the **Banner** primitive for internal structure, typography, and status theming, while delegating viewport anchoring, pass-through interaction, and stacking animations to the Toast wrapper.
Supports both classic DOM stacking and modern native HTML **Top Layer** via \`popover="manual"\`.

---

#### 1. Canonical Semantic Markup Signatures
AI agents and developers MUST strictly use the following semantic patterns:

\`\`\`html
<!-- 1. Toast Stack Container (Anchored to Viewport) -->
<aside class="toast-stack toast-stack--bottom-end" aria-label="Notifications">
  <!-- Individual Toast with Live Region & Composed Banner -->
  <div class="toast" role="status" aria-live="polite">
    <div class="banner banner--success banner--dynamic-corners buttons-sm" role="none">
      <div class="banner__inner">
        <h4 class="subheading">Project Published</h4>
        <p>Your changes are now live to all reviewers.</p>
      </div>
      <button type="button" class="button button--subtle button--icon banner__action" aria-label="Dismiss notification">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false">
          <path d="M18 6 6 18"></path><path d="m6 6 12 12"></path>
        </svg>
        <span class="visually-hidden">Dismiss</span>
      </button>
    </div>
  </div>
</aside>

<!-- 2. Actionable Toast with Undo Trigger -->
<div class="toast" role="status" aria-live="polite">
  <div class="banner banner--info buttons-sm" role="none">
    <div class="banner__inner" style="flex-direction: row; align-items: center; justify-content: space-between;">
      <p>Artifact removed from index.</p>
      <button type="button" class="button"><span>Undo</span></button>
    </div>
  </div>
</div>

<!-- 3. Modern Top-Layer Native Popover Toast -->
<div id="popover-toast" popover="manual" class="toast">
  <div class="banner banner--success buttons-sm">
    <div class="banner__inner"><p>Saved to cloud storage.</p></div>
  </div>
</div>
\`\`\`

---

#### 2. WCAG 2.2 Conformance Matrix

| Criterion | Level | Implementation Strategy |
| :--- | :---: | :--- |
| **4.1.3 Status Messages** | **AA** | Non-modal updates declare \`role="status"\` and \`aria-live="polite"\`. Urgent errors declare \`role="alert"\` and \`aria-live="assertive"\`. |
| **2.2.1 Timing Adjustable** | **A** | Automated dismissal timers must afford sufficient reading time (minimum 5s) and must provide an explicit, focusable dismiss button. |
| **2.4.7 Focus Visible** | **AA** | Dismiss buttons feature high-contrast 3:1 focus rings with 2px offsets. |
| **Pass-Through Interaction** | **Standard** | \`.toast-stack\` uses \`pointer-events: none;\` and child \`.toast\` uses \`pointer-events: auto;\`, preserving background interactivity. |
| **2.3.3 Reduced Motion** | **AAA** | Slide-in keyframes disable under \`@media (prefers-reduced-motion: reduce)\`. |

---

#### 3. CSS Custom Property Contract Table

| Custom Property | Fallback | Intended Purpose |
| :--- | :--- | :--- |
| \`--toast-z-index\` | \`1000\` | Viewport stacking elevation |
| \`--toast-max-width\` | \`28rem\` | Maximum horizontal toast card width |
| \`--toast-gap\` | \`var(--spacing-12, 0.75rem)\` | Distance between stacked toasts |
| \`--toast-offset\` | \`var(--spacing-16, 1rem)\` | Margin gap from viewport edges |
| \`--toast-shadow\` | \`var(--shadow-md)\` | Drop shadow elevation |
| \`--toast-transition\` | \`var(--duration-sm, 150ms)\` | Entry slide and exit fade duration |
| \`--toast-timefunc\` | \`ease-in-out\` | Animation easing curve |
`,
      },
    },
  },
  args: {
    title: 'Settings Saved',
    message: 'Your preferences have been synchronized across all active sessions.',
    variant: 'success',
    placement: 'bottom-end',
    hasAction: true,
    actionLabel: 'Dismiss',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'info', 'success', 'warning', 'error'],
      description: 'Semantic status theme',
    },
    placement: {
      control: 'select',
      options: ['bottom-end', 'bottom-start', 'bottom-center', 'top-end', 'top-start', 'top-center'],
      description: 'Viewport stacking corner/edge',
    },
    hasAction: {
      control: 'boolean',
      description: 'Includes dismiss trigger',
    },
  },
};

export default meta;
type Story = StoryObj<ToastArgs>;

/**
 * 1. Playground (Interactive Sandbox)
 */
export const Playground: Story = {
  render: (args) => {
    const variantClass = args.variant !== 'default' ? `banner--${args.variant}` : '';
    const placementClass = `toast-stack--${args.placement}`;
    const liveRole = args.variant === 'error' ? 'alert' : 'status';
    const livePolite = args.variant === 'error' ? 'assertive' : 'polite';

    return `
      <div class="demo-frame" style="block-size: 20rem; position: relative; overflow: hidden;">
        <div style="padding: 2rem;">
          <p class="micro-text" style="color: var(--foreground-muted);">
            Interactive page content area underneath the toast stack.
          </p>
        </div>

        <aside class="toast-stack ${placementClass}" style="position: absolute;" aria-label="Notifications">
          <div class="toast" role="${liveRole}" aria-live="${livePolite}">
            <div class="banner ${variantClass} buttons-sm" role="none">
              <div class="banner__inner">
                ${args.title ? `<h4 class="subheading">${args.title}</h4>` : ''}
                <p>${args.message}</p>
              </div>
              ${args.hasAction
        ? `
                    <button type="button" class="button button--subtle button--icon banner__action" aria-label="Dismiss notification" onclick="this.closest('.toast').classList.add('toast--dismissing'); setTimeout(() => this.closest('.toast').remove(), 150);">
                      <svg class="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false">
                        <path d="M18 6 6 18"></path><path d="m6 6 12 12"></path>
                      </svg>
                      <span class="visually-hidden">Dismiss</span>
                    </button>
                  `
        : ''
      }
            </div>
          </div>
        </aside>
      </div>
    `;
  },
};

/**
 * 2. Anatomy (Exploded View of Stack, Live Region & Composed Banner)
 */
export const Anatomy: Story = {
  render: () => {
    return `
      <div class="demo-stage demo-stage--lg demo-stage--card">
        <div class="demo-title-group" style="margin-block-end: var(--spacing-16);">
          <h4 class="demo-heading">Toast Anatomy & Pass-Through Stacking Architecture</h4>
          <p class="demo-desc">
            Dual-layer architecture: transparent viewport anchor (<code>.toast-stack</code>) with interactive items (<code>.toast</code>).
          </p>
        </div>

        <div class="stack" style="gap: var(--spacing-24);">
          <div class="cluster" style="align-items: flex-start; gap: var(--spacing-24);">
            <!-- Viewport Stack Spec -->
            <div class="demo-box demo-box--pink demo-constrained--xs">
              <span class="demo-label">1. Viewport Stack (.toast-stack)</span>
              <p class="micro-text" style="margin-block: var(--spacing-4);">
                Fixed viewport anchor with <code>pointer-events: none;</code>, safe area offsets, and automated flex vertical stacking.
              </p>
              <div style="border: 1px dashed var(--accent); padding: var(--spacing-8); border-radius: var(--radius-sm); text-align: center;">
                <span class="micro-text">Transparent Fixed Host</span>
              </div>
            </div>

            <!-- Toast Item Spec -->
            <div class="demo-box demo-box--blue demo-constrained--xs">
              <span class="demo-label">2. Toast Item (.toast)</span>
              <p class="micro-text" style="margin-block: var(--spacing-4);">
                Interactive node (<code>pointer-events: auto;</code>) declaring <code>role="status"</code> and slide-in keyframes.
              </p>
              <div style="border: 1px dashed #2d4268; padding: var(--spacing-8); border-radius: var(--radius-sm); text-align: center;">
                <span class="micro-text">Interactive Live Node</span>
              </div>
            </div>

            <!-- Composed Banner Spec -->
            <div class="demo-box demo-box--green demo-constrained--xs">
              <span class="demo-label">3. Composed Banner (.banner)</span>
              <p class="micro-text" style="margin-block: var(--spacing-4);">
                Renders typography, status themes, drop shadow, and dismiss buttons with concentric curvature.
              </p>
              <div style="margin-block-start: var(--spacing-8);">
                <div class="banner banner--success buttons-sm" style="pointer-events: none;">
                  <div class="banner__inner"><p class="micro-text">Success Banner</p></div>
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
 * 3. Variants (Multi-Toast Semantic Stack)
 */
export const Variants: Story = {
  render: () => {
    return `
      <div class="demo-frame" style="block-size: 28rem; position: relative; overflow: hidden;">
        <div style="padding: 2rem;">
          <p class="micro-text" style="color: var(--foreground-muted);">
            Stacked multi-toast notifications preview:
          </p>
        </div>

        <aside class="toast-stack toast-stack--bottom-end" style="position: absolute;" aria-label="Notifications">
          <!-- 1. Success Toast -->
          <div class="toast" role="status" aria-live="polite">
            <div class="banner banner--success buttons-sm" role="none">
              <div class="banner__inner">
                <h4 class="subheading">Project Published</h4>
                <p>Your changes are now live to all viewers.</p>
              </div>
              <button type="button" class="button button--subtle button--icon banner__action" aria-label="Dismiss" onclick="this.closest('.toast').remove()">
                <svg class="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
              </button>
            </div>
          </div>

          <!-- 2. Warning Toast -->
          <div class="toast" role="region" aria-label="Storage Warning">
            <div class="banner banner--warning buttons-sm" role="none">
              <div class="banner__inner">
                <h4 class="subheading">Storage at 85%</h4>
                <p>Consider archiving older files to free space.</p>
              </div>
              <button type="button" class="button button--subtle button--icon banner__action" aria-label="Dismiss" onclick="this.closest('.toast').remove()">
                <svg class="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
              </button>
            </div>
          </div>

          <!-- 3. Error Toast -->
          <div class="toast" role="alert" aria-live="assertive">
            <div class="banner banner--error buttons-sm" role="none">
              <div class="banner__inner">
                <h4 class="subheading">Sync Failed</h4>
                <p>Unable to connect to the automated verification endpoint.</p>
              </div>
              <button type="button" class="button button--danger button--icon banner__action" aria-label="Dismiss error" onclick="this.closest('.toast').remove()">
                <svg class="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
              </button>
            </div>
          </div>
        </aside>
      </div>
    `;
  },
};

/**
 * 4. State Matrix (Keyframe Slide-In, Dismissing State & High Contrast)
 */
export const StateMatrix: Story = {
  render: () => {
    return `
      <div class="demo-stage demo-stage--lg demo-stage--card">
        <div class="demo-title-group" style="margin-block-end: var(--spacing-16);">
          <h4 class="demo-heading">Toast State & Animation Matrix</h4>
          <p class="demo-desc">
            Visual inspection of resting, dismissing, and high-contrast rendering modes.
          </p>
        </div>

        <div class="stack" style="gap: var(--spacing-24);">
          <div class="demo-box demo-box--neutral">
            <span class="demo-label">1. Resting Interactive State</span>
            <div style="margin-block-start: var(--spacing-8);">
              <div class="toast" style="max-inline-size: 24rem;">
                <div class="banner banner--info buttons-sm">
                  <div class="banner__inner"><p class="micro-text">Standard resting toast notification.</p></div>
                </div>
              </div>
            </div>
          </div>

          <div class="demo-box demo-box--neutral">
            <span class="demo-label">2. Dismissing State (.toast--dismissing)</span>
            <p class="micro-text" style="margin-block: var(--spacing-4);">
              Fades out and scales down via <code>transform: scale(0.95); opacity: 0;</code> before removal.
            </p>
            <div style="margin-block-start: var(--spacing-8);">
              <div class="toast toast--dismissing" style="max-inline-size: 24rem; display: inline-block;">
                <div class="banner banner--warning buttons-sm">
                  <div class="banner__inner"><p class="micro-text">Dismissing toast collapsing.</p></div>
                </div>
              </div>
            </div>
          </div>

          <div class="demo-box demo-box--neutral">
            <span class="demo-label">3. High Contrast Mode (@media (prefers-contrast: more))</span>
            <div style="margin-block-start: var(--spacing-8);">
              <div class="toast" style="max-inline-size: 24rem; outline: 1px solid currentColor;">
                <div class="banner banner--success buttons-sm">
                  <div class="banner__inner"><p class="micro-text">High-contrast explicit perimeter outline.</p></div>
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
 * 5. Placement Modes (Bottom-End, Bottom-Start, Top-End, Top-Center)
 */
export const PlacementModes: Story = {
  render: () => {
    return `
      <div class="demo-stage demo-stage--lg demo-stage--card">
        <div class="demo-title-group" style="margin-block-end: var(--spacing-24); text-align: center;">
          <h4 class="demo-heading">Viewport Placement Modes</h4>
          <p class="demo-desc">Supports all 6 screen quadrant anchors.</p>
        </div>

        <div class="cluster" style="justify-content: center; gap: var(--spacing-24); flex-wrap: wrap;">
          <!-- Top Center -->
          <div class="demo-frame demo-constrained--xs" style="block-size: 14rem; position: relative;">
            <span class="demo-label" style="padding: var(--spacing-8);">.toast-stack--top-center</span>
            <aside class="toast-stack toast-stack--top-center" style="position: absolute; inline-size: 90%;">
              <div class="toast"><div class="banner banner--info buttons-sm"><div class="banner__inner"><p class="micro-text">Top Center Notice</p></div></div></div>
            </aside>
          </div>

          <!-- Top End -->
          <div class="demo-frame demo-constrained--xs" style="block-size: 14rem; position: relative;">
            <span class="demo-label" style="padding: var(--spacing-8);">.toast-stack--top-end</span>
            <aside class="toast-stack toast-stack--top-end" style="position: absolute; inline-size: 90%;">
              <div class="toast"><div class="banner banner--success buttons-sm"><div class="banner__inner"><p class="micro-text">Top End Notice</p></div></div></div>
            </aside>
          </div>

          <!-- Bottom End (Default) -->
          <div class="demo-frame demo-constrained--xs" style="block-size: 14rem; position: relative;">
            <span class="demo-label" style="padding: var(--spacing-8);">.toast-stack--bottom-end</span>
            <aside class="toast-stack toast-stack--bottom-end" style="position: absolute; inline-size: 90%;">
              <div class="toast"><div class="banner banner--warning buttons-sm"><div class="banner__inner"><p class="micro-text">Bottom End Notice</p></div></div></div>
            </aside>
          </div>
        </div>
      </div>
    `;
  },
};

/**
 * 6. Real World Recipes (Dynamic Dispatcher & Actionable Undo Toast)
 */
export const RealWorldRecipes: Story = {
  render: () => {
    return `
      <div class="demo-stage demo-stage--lg demo-stage--card">
        <div class="demo-title-group" style="margin-block-end: var(--spacing-24); text-align: center;">
          <h4 class="demo-heading">Real-World Interactive Toast Recipes</h4>
          <p class="demo-desc">Live notification queue with animated insertion and automated dismissal.</p>
        </div>

        <div class="stack" style="gap: var(--spacing-24); align-items: center;">
          <!-- Recipe 1: Dynamic Interactive Dispatcher -->
          <div class="demo-box demo-box--neutral demo-constrained--md">
            <span class="demo-label" style="margin-block-end: var(--spacing-12);">Interactive Notification Dispatcher</span>
            <div class="cluster" style="gap: var(--spacing-12); margin-block-end: var(--spacing-16);">
              <button type="button" class="button button--strong button--accent button--sm" id="btn-demo-success">
                <span>Trigger Success</span>
              </button>
              <button type="button" class="button button--danger button--sm" id="btn-demo-error">
                <span>Trigger Error</span>
              </button>
              <button type="button" class="button button--sm" id="btn-demo-info">
                <span>Trigger Info</span>
              </button>
            </div>
            <p class="micro-text" style="color: var(--foreground-muted);">
              Clicking a button adds a live toast to the stack. Toasts auto-dismiss after 5 seconds or on close.
            </p>
          </div>

          <!-- Simulated Viewport Frame for Toast Stack -->
          <div class="demo-frame demo-constrained--md" style="block-size: 18rem; position: relative; overflow: hidden;">
            <div style="padding: 1.5rem;">
              <p class="micro-text" style="color: var(--foreground-muted);">Simulated browser viewport:</p>
            </div>
            <aside id="live-demo-stack" class="toast-stack toast-stack--bottom-end" style="position: absolute;" aria-label="Notifications"></aside>
          </div>

          <!-- Script for Dynamic Injection -->
          <script>
            (function() {
              const stack = document.getElementById('live-demo-stack');
              if (!stack) return;

              function addToast(title, msg, variant) {
                const toast = document.createElement('div');
                toast.className = 'toast';
                toast.setAttribute('role', variant === 'error' ? 'alert' : 'status');
                toast.setAttribute('aria-live', variant === 'error' ? 'assertive' : 'polite');

                const btnClass = variant === 'error' ? 'button button--danger button--icon' : 'button button--subtle button--icon';

                toast.innerHTML = \`
                  <div class="banner banner--\${variant} buttons-sm" role="none">
                    <div class="banner__inner">
                      <p style="font-weight: 700; margin: 0;">\${title}</p>
                      <p style="margin: 0;">\${msg}</p>
                    </div>
                    <button type="button" class="\${btnClass} banner__action" aria-label="Dismiss notification">
                      <svg class="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false">
                        <path d="M18 6 6 18"></path><path d="m6 6 12 12"></path>
                      </svg>
                    </button>
                  </div>
                \`;

                toast.querySelector('button').addEventListener('click', () => {
                  toast.classList.add('toast--dismissing');
                  setTimeout(() => toast.remove(), 150);
                });

                stack.appendChild(toast);

                setTimeout(() => {
                  if (toast.isConnected) {
                    toast.classList.add('toast--dismissing');
                    setTimeout(() => toast.remove(), 150);
                  }
                }, 5000);
              }

              document.getElementById('btn-demo-success')?.addEventListener('click', () => {
                addToast('Changes Published', 'WCAG audit report deployed to staging.', 'success');
              });

              document.getElementById('btn-demo-error')?.addEventListener('click', () => {
                addToast('Upload Failed', 'Network connection timed out. Please retry.', 'error');
              });

              document.getElementById('btn-demo-info')?.addEventListener('click', () => {
                addToast('Update Available', 'DFH Component Library v2.4 released.', 'info');
              });
            })();
          </script>
        </div>
      </div>
    `;
  },
};
