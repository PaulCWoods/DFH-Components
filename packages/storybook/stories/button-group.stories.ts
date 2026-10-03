import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Components/Button Group',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
**Button Group Primitive** unites related action buttons, segmented toggles, and toolbars into responsive clusters.

### Features
- **Horizontal & Stacked**: \`.button-group\` (horizontal) and \`.button-group--stacked\` (vertical).
- **Stretch Width**: \`.button-group--stretch\` stretches controls across available container width.
- **Divider Support**: Automatically turns \`hr.divider\` vertical when nested via \`@container style(--direction: row)\`.
- **Text & Spacer Items**: \`.button-group__text\` for inline labels and \`.button-group__end\` to push trailing actions.
`,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => `
    <div style="font-family: var(--body-font-family);">
      <div class="button-group">
        <a href="#apple" class="button"><span>Apple</span></a>
        <span class="button"><span>Pear</span></span>
        <hr class="divider">
        <button type="button" class="button button--primary"><span>Orange</span></button>
      </div>
    </div>
  `,
};

export const Stretch: Story = {
  render: () => `
    <div style="max-inline-size: 32rem; font-family: var(--body-font-family);">
      <div class="button-group button-group--stretch">
        <a href="#apple" class="button"><span>Apple</span></a>
        <span class="button"><span>Pear</span></span>
        <button type="button" class="button button-group__end"><span>Orange</span></button>
      </div>
    </div>
  `,
};

export const Stacked: Story = {
  render: () => `
    <div style="max-inline-size: 16rem; font-family: var(--body-font-family);">
      <div class="button-group button-group--stacked">
        <a href="#apple" class="button"><span>Apple</span></a>
        <span class="button"><span>Pear</span></span>
        <hr class="divider">
        <button type="button" class="button button--primary"><span>Orange</span></button>
      </div>
    </div>
  `,
};

export const WithTextAndEndSpacer: Story = {
  render: () => `
    <div style="max-inline-size: 36rem; font-family: var(--body-font-family);">
      <div class="button-group button-group--stretch s-button:subtle">
        <button type="button" class="button"><span>Back</span></button>
        <hr class="divider">
        <span class="button-group__text">Step 2 of 4</span>
        <hr class="divider">
        <button type="button" class="button button-group__end button--primary"><span>Next Step</span></button>
      </div>
    </div>
  `,
};
