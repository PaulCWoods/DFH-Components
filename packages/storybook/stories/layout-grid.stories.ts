import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Layout Utilities/Grid',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
**Grid Primitive (\`.grid\`)** creates a fluid, auto-filling 2D CSS Grid using spacing block size tokens for minimum item widths.
Defined in \`layout/grid.css\`.

### Available Classes:
- \`.grid\`: Standard auto-filling grid (default item min-width: 28rem).
- Size Modifiers: \`.grid--2xs\` (16rem), \`.grid--xs\` (20rem), \`.grid--sm\` (24rem), \`.grid--md\` (28rem), \`.grid--lg\` (32rem), \`.grid--xl\` (36rem), \`.grid--2xl\` (40rem).
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const DefaultGrid: Story = {
  render: () => `
    <div class="grid grid--xs">
      <div class="card card--bordered" style="padding: var(--spacing-16);">
        <p class="font-weight-bold">Grid Item 1</p>
        <p class="font-size-sm color-muted">Auto-filling responsive cell.</p>
      </div>
      <div class="card card--bordered" style="padding: var(--spacing-16);">
        <p class="font-weight-bold">Grid Item 2</p>
        <p class="font-size-sm color-muted">Auto-filling responsive cell.</p>
      </div>
      <div class="card card--bordered" style="padding: var(--spacing-16);">
        <p class="font-weight-bold">Grid Item 3</p>
        <p class="font-size-sm color-muted">Auto-filling responsive cell.</p>
      </div>
      <div class="card card--bordered" style="padding: var(--spacing-16);">
        <p class="font-weight-bold">Grid Item 4</p>
        <p class="font-size-sm color-muted">Auto-filling responsive cell.</p>
      </div>
    </div>
  `,
};
