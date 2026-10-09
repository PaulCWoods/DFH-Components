import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Utilities/Typography & Color',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
**Typography & Text Utilities** expose classes for the modular font-size scale (-2 to 3), numeric weights, line-heights, logical text alignment, and adaptive semantic text colors.
Direct parity with the Design For Humans blog architecture.

### Available Classes
- **Font Size:** \`.font-size-xs\`, \`.font-size-sm\`, \`.font-size-base\`, \`.font-size-lg\`, \`.font-size-xl\`, \`.font-size-2xl\`
- **Font Weight:** \`.font-weight-regular\`, \`.font-weight-bold\`, \`.font-weight-100\` through \`.font-weight-900\`
- **Text Alignment:** \`.text-align-left\` (start), \`.text-align-center\`, \`.text-align-right\` (end), \`.text-align-justify\`
- **Text Wrapping:** \`.text-wrap-balance\`, \`.text-wrap-pretty\`, \`.white-space-nowrap\`
- **Semantic Text Color:** \`.text-color-accent\`, \`.text-color-muted\`, \`.text-color-success\`, \`.text-color-warning\`, \`.text-color-danger\` (adaptive with Container Style Queries)
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * 1. Type Scale Utilities
 */
export const TypeScale: Story = {
  render: () => `
    <div class="stack gap">
      <div><span class="font-size-xs text-color-muted">.font-size-xs:</span> <span class="font-size-xs">Step -2 (0.75rem / 12px)</span></div>
      <div><span class="font-size-sm text-color-muted">.font-size-sm:</span> <span class="font-size-sm">Step -1 (0.875rem / 14px)</span></div>
      <div><span class="font-size-base text-color-muted">.font-size-base:</span> <span class="font-size-base">Step 0 (1rem / 16px)</span></div>
      <div><span class="font-size-lg text-color-muted">.font-size-lg:</span> <span class="font-size-lg">Step 1 (1.25rem / 20px)</span></div>
      <div><span class="font-size-xl text-color-muted">.font-size-xl:</span> <span class="font-size-xl">Step 2 (1.5rem / 24px)</span></div>
      <div><span class="font-size-2xl text-color-muted">.font-size-2xl:</span> <span class="font-size-2xl">Step 3 (1.75rem / 28px)</span></div>
    </div>
  `,
};

/**
 * 2. Adaptive Text Color Utilities
 */
export const TextColors: Story = {
  render: () => `
    <div class="stack gap">
      <div class="cluster gap-sm">
        <span class="text-color-accent font-weight-bold">.text-color-accent</span>
        <span class="text-color-muted">.text-color-muted</span>
        <span class="text-color-success">.text-color-success</span>
        <span class="text-color-warning">.text-color-warning</span>
        <span class="text-color-danger">.text-color-danger</span>
      </div>
    </div>
  `,
};

/**
 * 3. Font Size Mode Utilities (.font-size-mode-fixed, .font-size-mode-cq, .font-size-mode-fluid)
 * Allows an entire section, card, or application container to switch to fixed font sizing for dense UI layouts.
 */
export const FontSizeModes: Story = {
  render: () => `
    <div class="stack gap-lg">
      <div class="card card--bordered font-size-mode-fixed padding-sm">
        <article class="card__content">
          <header class="card__header">
            <hgroup class="card__hgroup">
              <span class="badge badge--accent badge--sm">.font-size-mode-fixed</span>
              <h3 class="card__title">Dense Application Card (Fixed Typography)</h3>
              <p class="card__subtitle">All headings and body text lock to fixed steps without viewport fluid growth.</p>
            </hgroup>
          </header>
          <div class="card__body">
            <p class="text">Perfect for dense data grids, analytics widgets, sidebars, and desktop dashboard tooling.</p>
          </div>
        </article>
      </div>

      <div class="card card--bordered font-size-mode-fluid padding-sm">
        <article class="card__content">
          <header class="card__header">
            <hgroup class="card__hgroup">
              <span class="badge badge--sm">.font-size-mode-fluid (Default)</span>
              <h3 class="card__title">Editorial Reading Surface (Fluid Typography)</h3>
              <p class="card__subtitle">Headings and body text scale smoothly between mobile and desktop viewports.</p>
            </hgroup>
          </header>
          <div class="card__body">
            <p class="text">Optimal for articles, documentation pages, landing heroes, and responsive content reading.</p>
          </div>
        </article>
      </div>
    </div>
  `,
};
