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
- **Text & Spacer Items**: \`.button-group__content\` for inline labels and \`.button-group__end\` to push trailing actions.
`,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => `
    <div class="button-group">
      <a href="#apple" class="button"><span>Apple</span></a>
      <span class="button"><span>Pear</span></span>
      <hr class="divider">
      <button type="button" class="button button--primary"><span>Orange</span></button>
    </div>
  `,
};

export const Stretch: Story = {
  render: () => `
    <div class="wrapper wrapper--lg">
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
    <div class="wrapper wrapper--xs">
      <div class="button-group button-group--stacked">
        <a href="#apple" class="button"><span>Apple</span></a>
        <span class="button"><span>Pear</span></span>
        <hr class="divider">
        <button type="button" class="button button--primary"><span>Orange</span></button>
      </div>
    </div>
  `,
};

export const TightMenuList: Story = {
  render: () => `
    <div class="wrapper wrapper--sm">
      <div class="card card--compact card--bordered">
        <div class="card__body card__body--flush">
          <div class="button-group button-group--tight button-group--stacked s-button:subtle">
            <button type="button" class="button">
              <svg class="icon" width="24" height="24" aria-hidden="true" focusable="false"><use href="#Duplicate"/></svg>
              <span>Duplicate</span>
            </button>
            <button type="button" class="button">
              <svg class="icon" width="24" height="24" aria-hidden="true" focusable="false"><use href="#Download"/></svg>
              <span>Export</span>
            </button>
            <hr class="divider">
            <button type="button" class="button button--subtle-destructive">
              <svg class="icon" width="24" height="24" aria-hidden="true" focusable="false"><use href="#Delete"/></svg>
              <span>Delete</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
};

export const FillItems: Story = {
  render: () => `
    <div class="wrapper wrapper--lg">
      <div class="button-group button-group--fill-items s-button:subtle">
        <button type="button" class="button"><span>Cancel</span></button>
        <button type="button" class="button button--primary"><span>Confirm</span></button>
      </div>
    </div>
  `,
};

export const WithTextAndEndSpacer: Story = {
  render: () => `
    <div class="wrapper wrapper--lg">
      <div class="button-group button-group--stretch s-button:subtle">
        <button type="button" class="button"><span>Back</span></button>
        <hr class="divider">
        <span class="button-group__content button-group__fill">Step 2 of 4</span>
        <hr class="divider">
        <button type="button" class="button button--primary"><span>Next Step</span></button>
      </div>
    </div>
  `,
};
