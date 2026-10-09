import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Utilities/Dimension, Position & Overflow',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
**Dimension, Positioning & Overflow Utilities** provide low-specificity (\`:where()\`) helpers for sizing, absolute/relative/sticky positioning, and overflow containment.
Defined in \`utilities/layout-helpers.css\`.

### Available Classes:
- **Dimensions:** \`.w-full\` / \`.inline-full\`, \`.h-full\` / \`.block-full\`, \`.min-h-screen\` / \`.min-block-screen\`.
- **Positioning:** \`.position-relative\`, \`.position-absolute\`, \`.position-sticky\`.
- **Overflow:** \`.overflow-hidden\`, \`.overflow-auto\`, \`.overflow-x-auto\`, \`.overflow-y-auto\`.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const DimensionAndOverflow: Story = {
  render: () => `
    <div class="stack gap">
      <div class="card card--bordered padding w-full">
        <p class="font-size-sm"><strong>.w-full / .inline-full:</strong> Forces inline-size 100%.</p>
      </div>

      <div class="card card--bordered overflow-x-auto padding" style="max-inline-size: 20rem;">
        <div style="inline-size: 30rem; background: var(--surface-muted); padding: var(--spacing-8);">
          <p class="font-size-xs"><strong>.overflow-x-auto:</strong> Wide content scrolls horizontally inside constrained container.</p>
        </div>
      </div>
    </div>
  `,
};

export const StickyPositioning: Story = {
  render: () => `
    <div class="position-relative card card--bordered" style="block-size: 12rem; overflow-y: auto; padding: 0;">
      <div class="position-sticky" style="top: 0; background: var(--surface-translucent, rgba(0,0,0,0.1)); backdrop-filter: blur(8px); padding: var(--spacing-8) var(--spacing-16); border-bottom: 1px solid var(--border-color-quiet);">
        <p class="font-size-xs font-weight-bold">.position-sticky Header</p>
      </div>
      <div class="padding" style="block-size: 20rem;">
        <p class="font-size-sm color-muted">Scroll inside this box to see the sticky header anchor at the top.</p>
      </div>
    </div>
  `,
};
