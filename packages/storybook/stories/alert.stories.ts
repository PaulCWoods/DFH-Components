import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Components/Alert',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
**Alert Primitive Component** styles full-width site-wide announcement bars and page-level notification banners.
Unlike multi-item toast stacks, an Alert is a **single, prominent, uncomplicated** message pinned to the top or bottom of the viewport, or floating above page content.

Composes seamlessly with **Banner** for semantic status theming (\`.banner--warning\`, \`.banner--info\`, \`.banner--error\`, \`.banner--success\`) and **Wrapper** for site-width content constraints.

### Canonical Structure
\`\`\`html
<!-- Sticky Top Announcement Bar with Constrained Content -->
<aside class="alert alert--sticky" role="region" aria-label="System Announcement">
  <div class="banner banner--warning" role="none">
    <div class="banner__inner">
      <p><strong>Scheduled Maintenance:</strong> Services will be offline on Sunday from 02:00 to 04:00 UTC.</p>
    </div>
    <button type="button" class="button button--subtle button--icon banner__action" aria-label="Dismiss alert">
      <svg class="icon" aria-hidden="true" focusable="false"><use href="#Close"/></svg>
    </button>
  </div>
</aside>
\`\`\`

### Placement Modifiers
- \`.alert--sticky\` / \`.alert--top\`: Sticks to the top of the scrolling viewport.
- \`.alert--fixed-top\`: Permanently fixed to the top viewport edge.
- \`.alert--fixed-bottom\` / \`.alert--bottom\`: Fixed to the bottom edge (ideal for cookie/consent bars).
- \`.alert--floating\`: Floats over content with viewport padding.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * 1. Sticky Top Announcement Bar
 * Pinned to the top of the viewport with constrained content inside a .wrapper.
 */
export const StickyTopAnnouncement: Story = {
  render: () => `
    <div style="min-block-size: 20rem; position: relative; border: 1px dashed var(--border-color-quiet, #ccc); border-radius: var(--radius-2, 0.5rem); overflow: hidden;">
      <aside class="alert alert--top" style="position: absolute;" role="region" aria-label="System Notice">
        <div class="banner banner--warning s-button:sm" role="none">
          <div class="banner__inner">
            <p><strong class="strong-text">Scheduled maintenance:</strong> Services will undergo maintenance on Sunday from 02:00 to 04:00 UTC.</p>
          </div>
          <button type="button" class="button button--subtle button--icon banner__action" aria-label="Dismiss alert" onclick="this.closest('.alert').classList.add('alert--dismissing')">
            <svg class="icon" aria-hidden="true" focusable="false"><use href="#Close"/></svg>
          </button>
        </div>
      </aside>

      <div style="padding: 5rem 2rem 2rem 2rem;">
        <p style="color: var(--foreground-muted);">Page content continues below the alert bar...</p>
      </div>
    </div>
  `,
};

/**
 * 2. Full-Width Edge-to-Edge Bar
 * Direct banner child inside an unconstrained full-width alert container.
 */
export const FullWidthEdgeToEdge: Story = {
  render: () => `
    <div style="min-block-size: 16rem; position: relative; border: 1px dashed var(--border-color-quiet, #ccc); border-radius: var(--radius-2, 0.5rem); overflow: hidden;">
      <aside class="alert alert--top" style="position: absolute;" role="region" aria-label="Global Notice">
        <div class="banner banner--info s-button:sm" role="none">
          <div class="banner__inner">
            <p><strong class="strong-text">New Release:</strong> Design For Humans component library v2.0 is now available.</p>
          </div>
          <button type="button" class="button button--subtle button--icon banner__action" aria-label="Dismiss notice" onclick="this.closest('.alert').classList.add('alert--dismissing')">
            <svg class="icon" aria-hidden="true" focusable="false"><use href="#Close"/></svg>
          </button>
        </div>
      </aside>
    </div>
  `,
};

/**
 * 3. Bottom Fixed Consent Bar
 * Fixed to the bottom edge with confirmation action buttons.
 */
export const BottomFixedConsentBar: Story = {
  render: () => `
    <div style="min-block-size: 20rem; position: relative; border: 1px dashed var(--border-color-quiet, #ccc); border-radius: var(--radius-2, 0.5rem); overflow: hidden;">
      <div style="padding: 2rem;">
        <p>Page content area above bottom fixed alert...</p>
      </div>

      <aside class="alert alert--bottom" style="position: absolute;" role="region" aria-label="Cookie Preferences">
          <div class="banner s-button:sm" role="none">
            <div class="banner__inner">
              <p>We use essential cookies to ensure our website functions correctly.</p>
            </div>
            <div class="button-group banner__actions">
              <button type="button" class="button button--subtle" onclick="this.closest('.alert').classList.add('alert--dismissing')">
                <span>Manage</span>
              </button>
              <button type="button" class="button button--primary" onclick="this.closest('.alert').classList.add('alert--dismissing')">
                <span>Accept All</span>
              </button>
            </div>
        </div>
      </aside>
    </div>
  `,
};

/**
 * 4. Floating Centered Alert
 * Floats cleanly above page content using a constrained wrapper.
 */
export const FloatingCentered: Story = {
  render: () => `
    <div style="min-block-size: 16rem; position: relative; border: 1px dashed var(--border-color-quiet, #ccc); border-radius: var(--radius-2, 0.5rem); overflow: hidden;">
      <aside class="alert alert--floating" style="position: absolute; inset-block-start: 0; inset-inline: 0;" role="status" aria-live="polite">
        <div class="banner banner--success s-button:sm" style="box-shadow: var(--shadow-md);" role="none">
          <div class="banner__inner">
            <p>Account verified</p>
          </div>
          <button type="button" class="button button--subtle button--icon banner__action" aria-label="Dismiss notification" onclick="this.closest('.alert').classList.add('alert--dismissing')">
            <svg class="icon" aria-hidden="true" focusable="false"><use href="#Check"/></svg>
          </button>
        </div>
      </aside>
    </div>
  `,
};
