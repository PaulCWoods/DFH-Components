import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Layout Utilities/Wrapper',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
**Wrapper Layout Container (\`.wrapper\`)** centers content horizontally with max-inline-size boundaries and size token modifiers.
Defined in \`layout/wrapper.css\`.

### Available Classes:
- \`.wrapper\`: Centered container with site default max-width (\`75rem\`).
- Size Scales: \`.wrapper--2xs\` (16rem), \`.wrapper--xs\` (20rem), \`.wrapper--sm\` (24rem), \`.wrapper--md\` (28rem), \`.wrapper--lg\` (32rem), \`.wrapper--xl\` (36rem), \`.wrapper--2xl\` (40rem).
- Alignment Modifiers: \`.wrapper--start\` (left-aligned), \`.wrapper--end\` (right-aligned), \`.wrapper--middle\` (vertically centered).
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const DefaultWrapper: Story = {
  render: () => `
    <div class="stack gap">
      <div class="wrapper wrapper--xs" style="background: var(--surface-muted); padding: var(--spacing-16); border-radius: var(--radius); border: 1px dashed var(--border-color-muted);">
        <p class="font-weight-bold font-size-sm">.wrapper--xs (20rem / 320px)</p>
        <p class="font-size-xs color-muted">Compact dialog / form wrapper.</p>
      </div>

      <div class="wrapper wrapper--sm" style="background: var(--surface-muted); padding: var(--spacing-16); border-radius: var(--radius); border: 1px dashed var(--border-color-muted);">
        <p class="font-weight-bold font-size-sm">.wrapper--sm (24rem / 384px)</p>
        <p class="font-size-xs color-muted">Narrow reading column or login modal.</p>
      </div>

      <div class="wrapper wrapper--md" style="background: var(--surface-muted); padding: var(--spacing-16); border-radius: var(--radius); border: 1px dashed var(--border-color-muted);">
        <p class="font-weight-bold font-size-sm">.wrapper--md (28rem / 448px)</p>
        <p class="font-size-xs color-muted">Standard article or content panel.</p>
      </div>
    </div>
  `,
};
