import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Utilities/Responsive Visibility',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
**Responsive Visibility Helpers** provide zero-specificity (\`:where()\`) viewport and container visibility toggles.
Defined in \`utilities/responsive-helpers.css\`.

### Available Classes:
- **Unconditional:** \`.hide\` (\`display: none\`).
- **Viewport-Based (@media):**
  - Hide Above: \`.hide--above-2xs\`, \`.hide--above-xs\`, \`.hide--above-sm\`, \`.hide--above-md\`, \`.hide--above-lg\`, \`.hide--above-xl\`, \`.hide--above-2xl\`.
  - Hide Below: \`.hide--below-2xs\`, \`.hide--below-xs\`, \`.hide--below-sm\`, \`.hide--below-md\`, \`.hide--below-lg\`, \`.hide--below-xl\`, \`.hide--below-2xl\`.
- **Container-Based (@container):**
  - Hide in Container Above: \`.hide--in-container-above-2xs\` through \`--2xl\`.
  - Hide in Container Below: \`.hide--in-container-below-2xs\` through \`--2xl\`.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const ViewportVisibility: Story = {
  render: () => `
    <div class="stack gap">
      <div class="card card--bordered padding hide--below-md">
        <p class="font-size-sm"><strong>.hide--below-md:</strong> Visible ONLY on desktop/tablet viewports (width > 48em / 768px).</p>
      </div>
      <div class="card card--bordered padding hide--above-md" style="background: var(--surface-muted);">
        <p class="font-size-sm"><strong>.hide--above-md:</strong> Visible ONLY on mobile viewports (width <= 48em / 768px).</p>
      </div>
    </div>
  `,
};

export const ContainerVisibility: Story = {
  render: () => `
    <div class="container-inline stack gap" style="border: 1px dashed var(--border-color-muted); padding: var(--spacing-16); border-radius: var(--radius);">
      <div class="card bg-success bd-sm bd-success padding hide--in-container-below-sm">
        <p class="font-size-sm"><strong>.hide--in-container-below-sm:</strong> Shown only when container is wider than 40em.</p>
      </div>
      <div class="card bg-danger bd-sm bd-danger padding hide--in-container-above-sm">
        <p class="font-size-sm"><strong>.hide--in-container-above-sm:</strong> Shown only when container is 40em or narrower.</p>
      </div>
    </div>
  `,
};
