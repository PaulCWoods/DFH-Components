import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Components/Banner',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
**Banner Primitive Component** styles inline status messages, actions, and semantic notification callouts.
Directly aligned with the Design For Humans blog architecture (\`_banner.scss\` & \`_component-library.twig\`).

### Canonical Structure
\`\`\`html
<div class="banner">
  <div class="banner__inner">
    <p>This is a standard banner message.</p>
  </div>
</div>
\`\`\`

### Architectural Highlights & Accessibility Standards
- **Token-Driven Surface & Spacing:** Built on DTCG component tokens (\`--banner-bg\`, \`--banner-padding\`, \`--banner-border\`, \`--banner-radius\`, \`--banner-gap\`).
- **Semantic Color Cascading:** Semantic modifiers (\`.banner--success\`, \`.banner--warning\`, \`.banner--error\`, \`.banner--info\`) cascade background, border, text, and nested button tokens (\`--button-primary-bg\`, \`--link-color\`) automatically.
- **Dynamic Concentric Corners (\`.banner--dynamic-corners\`):** Outer curvature automatically computes from nested button geometry (\`min(var(--button-radius), var(--button-min-size) / 2) + var(--banner-outer-padding) + var(--banner-border-width)\`) to eliminate corner pinch and create harmonious concentric pill containers.
- **Accessible Action Controls:** Icon actions inside banners use \`<span class="visually-hidden">Action</span>\` or \`<span class="visually-hidden">Close</span>\` for full screen-reader and browser translation engine compatibility. Decorative SVGs have \`aria-hidden="true"\` and \`focusable="false"\`.
- **High-Contrast Mode (WCAG 1.4.11 / 2.4.7):** Under \`@media (prefers-contrast: more)\`, borders scale to standard \`--border-width\` (2px).
- **Reduced Motion (WCAG 2.3.3):** Under \`@media (prefers-reduced-motion: reduce)\`, any transitions are removed.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * 1. Default Standard Banner
 * Displays a neutral inline message without action triggers.
 */
export const Default: Story = {
  render: () => `
    <div style="max-inline-size: 48rem; font-family: var(--body-font-family);">
      <div class="banner" role="region" aria-label="Announcement">
        <div class="banner__inner">
          <p>This is a standard banner message.</p>
        </div>
      </div>
    </div>
  `,
};

/**
 * 2. Info Banner
 * Semantic informational banner with surface-danger background, foreground-danger border and text, and a primary Close action button.
 */
export const Info: Story = {
  render: () => `
    <div style="max-inline-size: 48rem; font-family: var(--body-font-family);">
      <div class="banner banner--info" role="alert">
        <div class="banner__inner">
          <p>This is an info banner message.</p>
        </div>
        <button type="button" class="button banner__action">
          <svg class="icon" width="32" height="32" aria-hidden="true" focusable="false">
            <use href="#Close" />
          </svg>
          <span class="visually-hidden">Dismiss info</span>
        </button>
      </div>
    </div>
  `,
};

/**
 * 3. Success Banner
 * Semantic confirmation banner with surface-success background, foreground-success border, and subtle Check action button.
 */
export const Success: Story = {
  render: () => `
    <div style="max-inline-size: 48rem; font-family: var(--body-font-family);">
      <div class="banner banner--success" role="status">
        <div class="banner__inner">
          <p>This is a success banner message.</p>
        </div>
        <button type="button" class="button button--subtle banner__action">
          <svg class="icon" width="32" height="32" aria-hidden="true" focusable="false">
            <use href="#Check" />
          </svg>
          <span class="visually-hidden">Confirm and acknowledge</span>
        </button>
      </div>
    </div>
  `,
};

/**
 * 3. Warning Banner
 * Semantic warning banner with surface-warning background, foreground-warning border, and subtle Check action button.
 */
export const Warning: Story = {
  render: () => `
    <div style="max-inline-size: 48rem; font-family: var(--body-font-family);">
      <div class="banner banner--warning" role="region" aria-label="Warning notification">
        <div class="banner__inner">
          <p>This is a warning banner message.</p>
        </div>
        <button type="button" class="button button--subtle banner__action">
          <svg class="icon" width="32" height="32" aria-hidden="true" focusable="false">
            <use href="#Check" />
          </svg>
          <span class="visually-hidden">Acknowledge warning</span>
        </button>
      </div>
    </div>
  `,
};

/**
 * 4. Error / Danger Banner
 * Semantic alert banner with surface-danger background, foreground-danger border and text, and a primary Close action button.
 */
export const Error: Story = {
  render: () => `
    <div style="max-inline-size: 48rem; font-family: var(--body-font-family);">
      <div class="banner banner--error" role="alert">
        <div class="banner__inner">
          <p>This is an error banner message.</p>
        </div>
        <button type="button" class="button button--primary banner__action">
          <svg class="icon" width="32" height="32" aria-hidden="true" focusable="false">
            <use href="#Close" />
          </svg>
          <span class="visually-hidden">Dismiss error</span>
        </button>
      </div>
    </div>
  `,
};

/**
 * 5. With Subheading and Actions
 * More verbose message containing a subheading, descriptive copy, and a group of Cancel / OK buttons.
 */
export const WithSubheadingAndActions: Story = {
  render: () => `
    <div style="max-inline-size: 48rem; font-family: var(--body-font-family);">
      <div class="banner" role="region" aria-label="Action required">
        <div class="banner__inner">
          <h3 style="margin: 0; font-family: var(--subheading-font-family, inherit); font-size: var(--subheading-font-size, 1.25rem); font-weight: var(--subheading-font-weight, var(--font-weight-bold)); line-height: var(--subheading-line-height, 1.3);">Subheading</h3>
          <p>This is more verbose banner message.</p>
          <div style="display: flex; gap: var(--spacing-0-5); margin-block-start: var(--spacing-0-25);">
            <button type="button" class="button">
              <span>Cancel</span>
            </button>
            <button type="button" class="button button--primary">
              <span>OK</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
};

/**
 * 6. Dynamic Concentric Corners
 * Outer banner curvature adapts mathematically with the nested pill button geometry to maintain perfectly concentric curves.
 */
export const DynamicCorners: Story = {
  render: () => `
    <div style="max-inline-size: 48rem; font-family: var(--body-font-family);">
      <div class="banner banner--dynamic-corners s-button:round" role="region" aria-label="Confirmation">
        <div class="banner__inner">
          <p style="margin: 0; font-size: var(--typography-font-size-1, 1.25rem); font-weight: var(--font-weight-bold);">Continue?</p>
        </div>
        <button type="button" class="button banner__action">
          <svg class="icon" width="32" height="32" aria-hidden="true" focusable="false">
            <use href="#Check" />
          </svg>
          <span class="visually-hidden">Confirm continue</span>
        </button>
      </div>
    </div>
  `,
};

/**
 * 7. All Variants Stack
 * Displays the complete set of banner variants in a vertical stack matching the blog demonstration page (_component-library.twig).
 */
export const AllVariants: Story = {
  render: () => `
    <div style="max-inline-size: 48rem; font-family: var(--body-font-family); display: flex; flex-direction: column; gap: var(--spacing-1);">
      <!-- 1. Standard -->
      <div class="banner" role="region" aria-label="Notification">
        <div class="banner__inner">
          <p>This is a standard banner message.</p>
        </div>
      </div>

      <!-- 2. Success -->
      <div class="banner banner--success" role="status">
        <div class="banner__inner">
          <p>This is a success banner message.</p>
        </div>
        <button type="button" class="button button--subtle banner__action">
          <svg class="icon" width="32" height="32" aria-hidden="true" focusable="false">
            <use href="#Check" />
          </svg>
          <span class="visually-hidden">Action</span>
        </button>
      </div>

      <!-- 3. Warning -->
      <div class="banner banner--warning" role="region" aria-label="Warning">
        <div class="banner__inner">
          <p>This is a warning banner message.</p>
        </div>
        <button type="button" class="button button--subtle banner__action">
          <svg class="icon" width="32" height="32" aria-hidden="true" focusable="false">
            <use href="#Check" />
          </svg>
          <span class="visually-hidden">Action</span>
        </button>
      </div>

      <!-- 4. Error -->
      <div class="banner banner--error" role="alert">
        <div class="banner__inner">
          <p>This is an error banner message.</p>
        </div>
        <button type="button" class="button button--primary banner__action">
          <svg class="icon" width="32" height="32" aria-hidden="true" focusable="false">
            <use href="#Close" />
          </svg>
          <span class="visually-hidden">Close</span>
        </button>
      </div>

      <!-- 5. Verbose with Subheading & Buttons -->
      <div class="banner" role="region" aria-label="Action required">
        <div class="banner__inner">
          <h3 style="margin: 0; font-family: var(--subheading-font-family, inherit); font-size: var(--subheading-font-size, 1.25rem); font-weight: var(--subheading-font-weight, var(--font-weight-bold)); line-height: var(--subheading-line-height, 1.3);">Subheading</h3>
          <p>This is more verbose banner message.</p>
          <div style="display: flex; gap: var(--spacing-0-5); margin-block-start: var(--spacing-0-25);">
            <button type="button" class="button">
              <span>Cancel</span>
            </button>
            <button type="button" class="button button--primary">
              <span>OK</span>
            </button>
          </div>
        </div>
      </div>

      <!-- 6. Dynamic Corners (Pill) -->
      <div class="banner banner--dynamic-corners s-button:round" role="region" aria-label="Confirmation">
        <div class="banner__inner">
          <p style="margin: 0; font-size: var(--typography-font-size-1, 1.25rem); font-weight: var(--font-weight-bold);">Continue?</p>
        </div>
        <button type="button" class="button banner__action">
          <svg class="icon" width="32" height="32" aria-hidden="true" focusable="false">
            <use href="#Check" />
          </svg>
          <span class="visually-hidden">Action</span>
        </button>
      </div>
    </div>
  `,
};
