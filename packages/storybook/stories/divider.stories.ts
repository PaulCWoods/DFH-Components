import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Components/Divider',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
**Divider Primitive** renders semantic separator lines (\`<hr class="divider">\`) that adapt dynamically via Container Style Queries.

### Responsive Behavior
- **Default (Block/Column Context)**: Renders a horizontal divider rule spanning full width (\`border-block-start\`).
- **Inline / Row Context (\`--direction: row\`)**: Automatically transforms into a full-height vertical separator (\`border-inline-start\`).
`,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Horizontal: Story = {
  render: () => `
    <div class="wrapper wrapper--lg">
      <div class="stack">
        <p class="text" style="margin: 0;">Top section paragraph describing content above the divider line.</p>
        <hr class="divider">
        <p class="text" style="margin: 0; color: var(--foreground-muted);">Bottom section paragraph following the separator rule.</p>
      </div>
    </div>
  `,
};

export const VerticalInRowContainer: Story = {
  render: () => `
    <div style="font-family: var(--body-font-family);">
      <div class="button-group">
        <button type="button" class="button button--subtle"><span>Dashboard</span></button>
        <button type="button" class="button button--subtle"><span>Projects</span></button>
        <hr class="divider">
        <button type="button" class="button button--subtle"><span>Settings</span></button>
      </div>
    </div>
  `,
};
