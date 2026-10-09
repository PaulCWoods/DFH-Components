import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Layout Utilities/Split',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
**Split Primitive (\`.split\`)** creates a 2-column layout with a preferred-width sidebar and an auto-expanding main pane.
It wraps automatically into a full-width vertical stack on narrow containers without media queries.
Defined in \`layout/split.css\`.

### Available Classes:
- \`.split\`: Default sidebar (first child) + main pane (last child).
- \`.split--end\` / \`.split--reverse\`: Main pane (first child) + sidebar (last child).
- Sidebar width scales: \`.split--2xs\`, \`.split--xs\`, \`.split--sm\`, \`.split--md\`, \`.split--lg\`.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const DefaultSplit: Story = {
  render: () => `
    <div class="split split--xs" style="background: var(--surface-muted); padding: var(--spacing-16); border-radius: var(--radius);">
      <div class="card card--compact" style="padding: var(--spacing-16);">
        <p class="font-weight-bold font-size-sm">Sidebar</p>
        <p class="font-size-xs color-muted">Fixed preferred basis (20rem / var(--spacing-block-xs)).</p>
      </div>
      <div class="card card--compact" style="padding: var(--spacing-16);">
        <p class="font-weight-bold font-size-sm">Main Expanding Pane</p>
        <p class="font-size-sm">Takes up all remaining width (flex-grow: 999), and wraps beneath the sidebar when space is constrained.</p>
      </div>
    </div>
  `,
};

export const ReverseSplit: Story = {
  render: () => `
    <div class="split split--end split--xs" style="background: var(--surface-muted); padding: var(--spacing-16); border-radius: var(--radius);">
      <div class="card card--compact" style="padding: var(--spacing-16);">
        <p class="font-weight-bold font-size-sm">Main Expanding Content</p>
        <p class="font-size-sm">Primary workspace content on the left.</p>
      </div>
      <div class="card card--compact" style="padding: var(--spacing-16);">
        <p class="font-weight-bold font-size-sm">Trailing Inspector</p>
        <p class="font-size-xs color-muted">Sidebar on the right.</p>
      </div>
    </div>
  `,
};
