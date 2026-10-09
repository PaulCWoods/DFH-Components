import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Layout Utilities/Cluster',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
**Cluster Primitive (\`.cluster\`)** provides an inline-flex container with automatic wrapping for grouped tags, buttons, chips, and badges.
Defined in \`layout/cluster.css\`.

### Available Classes:
- \`.cluster\`: Wrapping inline-flex container.
- \`.cluster--tight\`: Zero gap between items.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const DefaultCluster: Story = {
  render: () => `
    <div class="stack gap">
      <p class="font-size-sm color-muted">Items automatically wrap onto subsequent lines when space is constrained:</p>
      <div class="cluster wrapper wrapper--sm" style="background: var(--surface-muted); padding: var(--spacing-16); border-radius: var(--radius);">
        <button type="button" class="button button--subtle button--sm"><span>Design Tokens</span></button>
        <button type="button" class="button button--subtle button--sm"><span>WCAG 2.2 AA</span></button>
        <button type="button" class="button button--subtle button--sm"><span>Accessibility</span></button>
        <button type="button" class="button button--subtle button--sm"><span>Native Dialog</span></button>
        <button type="button" class="button button--subtle button--sm"><span>Anchor Positioning</span></button>
        <button type="button" class="button button--subtle button--sm"><span>Fluid Typography</span></button>
      </div>
    </div>
  `,
};
