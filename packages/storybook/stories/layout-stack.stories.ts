import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Layout Utilities/Stack',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
**Stack Primitive (\`.stack\`)** provides a 1-dimensional vertical column layout with configurable token gaps.
Defined in \`layout/stack.css\`.

### Features:
- Direct 1D vertical column (\`flex-direction: column\`).
- Configurable gap via \`--gap\` or spacing utility tokens.
- Modifiers: \`.stack--tight\` (zero gap).
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => `
    <div class="stack wrapper wrapper--sm" style="background: var(--surface-muted); padding: var(--spacing-16); border-radius: var(--radius);">
      <div class="card card--compact" style="padding: var(--spacing-12);">
        <p class="font-weight-bold">Stack Item 1</p>
        <p class="font-size-sm color-muted">First item in the vertical column.</p>
      </div>
      <div class="card card--compact" style="padding: var(--spacing-12);">
        <p class="font-weight-bold">Stack Item 2</p>
        <p class="font-size-sm color-muted">Second item separated by standard gap.</p>
      </div>
      <div class="card card--compact" style="padding: var(--spacing-12);">
        <p class="font-weight-bold">Stack Item 3</p>
        <p class="font-size-sm color-muted">Third item in the vertical column.</p>
      </div>
    </div>
  `,
};

export const Tight: Story = {
  render: () => `
    <div class="stack stack--tight wrapper wrapper--sm" style="background: var(--surface-muted); padding: var(--spacing-16); border-radius: var(--radius);">
      <div class="card card--compact" style="padding: var(--spacing-12); border-bottom-left-radius: 0; border-bottom-right-radius: 0;">
        <p class="font-weight-bold">Flush Header</p>
      </div>
      <div class="card card--compact" style="padding: var(--spacing-12); border-radius: 0;">
        <p class="font-weight-bold">Flush Middle</p>
      </div>
      <div class="card card--compact" style="padding: var(--spacing-12); border-top-left-radius: 0; border-top-right-radius: 0;">
        <p class="font-weight-bold">Flush Footer</p>
      </div>
    </div>
  `,
};
