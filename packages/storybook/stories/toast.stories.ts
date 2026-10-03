import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Components/Toast',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
**Toast Primitive Component** provides accessible, non-modal status notifications, live announcements, and floating alert stacks.
Composed directly with the **Banner** primitive for visual structure, theming, and concentric geometry while delegating viewport pinning, top-layer elevation, and stacking to the Toast wrapper.

### Canonical Structure
\`\`\`html
<!-- Toast Stack Container (Anchored to Viewport) -->
<aside class="toast-stack toast-stack--bottom-end" aria-label="Notifications">
  <!-- Individual Toast with Live Region & Composed Banner -->
  <div class="toast" role="status" aria-live="polite">
    <div class="banner banner--success banner--dynamic-corners s-button:sm" role="none">
      <div class="banner__inner">
        <h3 class="subheading--fixed">Success</h3>
        <p>Your settings have been saved.</p>
      </div>
      <button type="button" class="button button--subtle button--icon banner__action" aria-label="Dismiss notification">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false">
          <path d="M18 6 6 18"></path><path d="m6 6 12 12"></path>
        </svg>
      </button>
    </div>
  </div>
</aside>
\`\`\`

### Architectural Highlights & Accessibility Standards
- **Banner Composition:** Reuses all existing \`.banner\` capabilities (\`.banner--success\`, \`.banner--warning\`, \`.banner--error\`, \`.banner--info\`, \`.banner--dynamic-corners\`).
- **Modern Web Popover Support:** Supports native HTML \`popover="manual"\` on \`.toast\` elements to render them into the browser's **Top Layer** without z-index conflicts or focus trapping.
- **DTCG Component Tokens:** Powered by \`--toast-shadow\`, \`--toast-max-width\`, \`--toast-gap\`, \`--toast-offset\`, and \`--toast-transition\`.
- **Live Regions (WCAG 4.1.3):** Non-modal announcements use \`role="status"\` / \`aria-live="polite"\` for informational updates, and \`role="alert"\` / \`aria-live="assertive"\` for urgent errors.
- **Pass-Through Interaction:** \`.toast-stack\` uses \`pointer-events: none;\` while \`.toast\` uses \`pointer-events: auto;\` so background content remains fully interactive.
- **Safe Area Insets:** Stack offsets automatically respect \`env(safe-area-inset-*)\` on mobile screens.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * 1. Default Toast in Bottom-End Stack
 * Demonstrates a single success confirmation toast anchored to the bottom-right corner.
 */
export const Default: Story = {
  render: () => `
    <div style="min-block-size: 16rem; position: relative; border: 1px dashed var(--border-color-quiet, #ccc); border-radius: var(--radius-2, 0.5rem); padding: var(--spacing-2, 2rem); overflow: hidden;">
      <p style="color: var(--foreground-muted);">Page content area (click and scroll freely)...</p>

      <aside class="toast-stack toast-stack--bottom-end" style="position: absolute;" aria-label="Notifications">
        <div class="toast" role="status" aria-live="polite">
          <div class="banner banner--success s-button:sm" role="none">
            <div class="banner__inner">
              <h3 class="subheading--fixed">Settings saved</h3>
              <p>Your preferences have been updated successfully.</p>
            </div>
            <button type="button" class="button button--subtle button--icon banner__action" aria-label="Dismiss notification" onclick="this.closest('.toast').remove()">
              <svg class="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false">
                <path d="M18 6 6 18"></path><path d="m6 6 12 12"></path>
              </svg>
            </button>
          </div>
        </div>
      </aside>
    </div>
  `,
};

/**
 * 2. Multi-Toast Stack with Semantic Variants
 * Shows how multiple toasts stack cleanly with token-governed gap and elevation shadows.
 */
export const SemanticVariantsStack: Story = {
  render: () => `
    <div style="min-block-size: 28rem; position: relative; border: 1px dashed var(--border-color-quiet, #ccc); border-radius: var(--radius-2, 0.5rem); padding: var(--spacing-2, 2rem); overflow: hidden;">
      <p style="color: var(--foreground-muted);">Page preview with stacked toast notifications:</p>

      <aside class="toast-stack toast-stack--bottom-end" style="position: absolute;" aria-label="Notifications">
        <!-- 1. Success Toast -->
        <div class="toast" role="status" aria-live="polite">
          <div class="banner banner--success s-button:sm" role="none">
            <div class="banner__inner">
              <h3 class="subheading--fixed">Project published</h3>
              <p>Your changes are now live to all viewers.</p>
            </div>
            <button type="button" class="button button--subtle button--icon banner__action" aria-label="Dismiss notification" onclick="this.closest('.toast').remove()">
              <svg class="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false">
                <path d="M18 6 6 18"></path><path d="m6 6 12 12"></path>
              </svg>
            </button>
          </div>
        </div>

        <!-- 2. Warning Toast -->
        <div class="toast" role="region" aria-label="Storage Warning">
          <div class="banner banner--warning s-button:sm" role="none">
            <div class="banner__inner">
              <h3 class="subheading--fixed">Storage at 85%</h3>
              <p>Consider archiving older files to free space.</p>
            </div>
            <button type="button" class="button button--subtle button--icon banner__action" aria-label="Dismiss notification" onclick="this.closest('.toast').remove()">
              <svg class="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false">
                <path d="M18 6 6 18"></path><path d="m6 6 12 12"></path>
              </svg>
            </button>
          </div>
        </div>

        <!-- 3. Error Toast -->
        <div class="toast" role="alert" aria-live="assertive">
          <div class="banner banner--error s-button:sm" role="none">
            <div class="banner__inner">
              <h3 class="subheading--fixed">Sync failed</h3>
              <p>Unable to connect to the backup server.</p>
            </div>
            <button type="button" class="button button--primary button--icon banner__action" aria-label="Dismiss error" onclick="this.closest('.toast').remove()">
              <svg class="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false">
                <path d="M18 6 6 18"></path><path d="m6 6 12 12"></path>
              </svg>
            </button>
          </div>
        </div>
      </aside>
    </div>
  `,
};

/**
 * 3. Top Center Banner Toast
 * Commonly used for global system banners or status alerts across the top of the viewport.
 */
export const TopCenter: Story = {
  render: () => `
    <div style="min-block-size: 16rem; position: relative; border: 1px dashed var(--border-color-quiet, #ccc); border-radius: var(--radius-2, 0.5rem); padding: var(--spacing-2, 2rem); overflow: hidden;">
      <aside class="toast-stack toast-stack--top-center" style="position: absolute;" aria-label="System announcements">
        <div class="toast" role="status" aria-live="polite">
          <div class="banner banner--info s-button:sm" role="none">
            <div class="banner__inner">
              <h3 class="subheading--fixed">Scheduled Maintenance</h3>
              <p>System upgrades will occur tonight at 02:00 UTC.</p>
            </div>
            <button type="button" class="button button--subtle button--icon banner__action" aria-label="Dismiss notice" onclick="this.closest('.toast').remove()">
              <svg class="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false">
                <path d="M18 6 6 18"></path><path d="m6 6 12 12"></path>
              </svg>
            </button>
          </div>
        </div>
      </aside>
    </div>
  `,
};

/**
 * 4. Interactive Live Toast Trigger Demo
 * Click buttons to trigger dynamically injected toasts into the stack with automatic dismissal.
 */
export const InteractiveTriggerDemo: Story = {
  render: () => `
    <div>
      <div style="display: flex; flex-wrap: wrap; gap: var(--spacing-0-5, 0.5rem); margin-block-end: var(--spacing-1, 1rem);">
        <button type="button" class="button button--primary" id="btn-trigger-success">
          <span>Trigger Success Toast</span>
        </button>
        <button type="button" class="button button--destructive" id="btn-trigger-error">
          <span>Trigger Error Toast</span>
        </button>
        <button type="button" class="button button--secondary" id="btn-trigger-info">
          <span>Trigger Info Toast</span>
        </button>
      </div>

      <p style="color: var(--foreground-muted); font-size: var(--body-small-font-size, 0.875rem);">
        Click the buttons above to test dynamic toast creation, stacking, smooth entry animations, and manual/auto dismissal.
      </p>

      <aside id="demo-toast-stack" class="toast-stack toast-stack--bottom-end" aria-label="Interactive notifications" style="position: fixed;"></aside>

      <script>
        (function() {
          const stack = document.getElementById('demo-toast-stack');
          if (!stack) return;

          function createToast(title, message, variant) {
            const toast = document.createElement('div');
            toast.className = 'toast';
            toast.setAttribute('role', variant === 'error' ? 'alert' : 'status');
            toast.setAttribute('aria-live', variant === 'error' ? 'assertive' : 'polite');

            const btnClass = variant === 'error' ? 'button button--primary button--icon' : 'button button--subtle button--icon';

            toast.innerHTML = \`
              <div class="banner banner--\${variant} s-button:sm" role="none">
                <div class="banner__inner">
                  <p style="font-weight: var(--font-weight-bold, 700); margin: 0;">\${title}</p>
                  <p style="margin: 0;">\${message}</p>
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

            // Auto dismiss after 5 seconds
            setTimeout(() => {
              if (toast.isConnected) {
                toast.classList.add('toast--dismissing');
                setTimeout(() => toast.remove(), 150);
              }
            }, 5000);
          }

          document.getElementById('btn-trigger-success')?.addEventListener('click', () => {
            createToast('Profile Saved', 'Your profile details were updated.', 'success');
          });

          document.getElementById('btn-trigger-error')?.addEventListener('click', () => {
            createToast('Connection Lost', 'Could not reach the server. Please retry.', 'error');
          });

          document.getElementById('btn-trigger-info')?.addEventListener('click', () => {
            createToast('New Update', 'A new component version is available.', 'info');
          });
        })();
      </script>
    </div>
  `,
};
