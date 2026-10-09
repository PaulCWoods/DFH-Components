import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Utilities/Flex & Layout',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
**Flexbox & Layout Utilities** provide low-specificity (\`:where()\`) classes for 1-dimensional flex layouts, alignments, directions, and gap distributions.
Direct parity with the Design For Humans blog architecture (\`_flex.scss\` & \`_gap.scss\`).

### Available Classes
- **Display:** \`.flex\`, \`.inline-flex\`
- **Direction:** \`.flex-direction-row\`, \`.flex-direction-row-reverse\`, \`.flex-direction-column\`, \`.flex-direction-column-reverse\`
- **Wrap:** \`.flex-wrap\`, \`.flex-nowrap\`
- **Align Items (Cross Axis):** \`.align-items-start\`, \`.align-items-center\`, \`.align-items-end\`, \`.align-items-stretch\`, \`.align-items-baseline\`
- **Justify Content (Main Axis):** \`.justify-content-start\`, \`.justify-content-center\`, \`.justify-content-end\`, \`.justify-content-between\`, \`.justify-content-around\`, \`.justify-content-evenly\`
- **Gap Tokens:** \`.gap\`, \`.gap-0\`, \`.gap-sm\`, \`.gap-lg\`, \`.gap-breathe\`, \`.gap-cushion\`, \`.row-gap-*\`, \`.col-gap-*\`
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * 1. Justify Content Distributions
 */
export const JustifyContent: Story = {
  render: () => `
    <div class="stack gap">
      <div class="stack gap-sm">
        <span class="font-size-sm font-weight-bold text-color-muted">.justify-content-between</span>
        <div class="flex justify-content-between align-items-center padding-sm card card--bordered">
          <span class="badge badge--accent"><span>Left Item</span></span>
          <span class="badge"><span>Center / Right Item</span></span>
        </div>
      </div>

      <div class="stack gap-sm">
        <span class="font-size-sm font-weight-bold text-color-muted">.justify-content-center</span>
        <div class="flex justify-content-center align-items-center gap-sm padding-sm card card--bordered">
          <button type="button" class="button button--subtle"><span>Previous</span></button>
          <button type="button" class="button button--primary"><span>Next</span></button>
        </div>
      </div>

      <div class="stack gap-sm">
        <span class="font-size-sm font-weight-bold text-color-muted">.justify-content-end</span>
        <div class="flex justify-content-end align-items-center gap-sm padding-sm card card--bordered">
          <button type="button" class="button button--subtle"><span>Cancel</span></button>
          <button type="button" class="button button--primary"><span>Save Changes</span></button>
        </div>
      </div>
    </div>
  `,
};

/**
 * 2. Gap Scale Tokens
 */
export const GapScale: Story = {
  render: () => `
    <div class="stack gap">
      <div class="stack gap-sm">
        <span class="font-size-sm font-weight-bold text-color-muted">.gap-sm (calc(--spacing / 2) = 0.5rem)</span>
        <div class="flex gap-sm card card--bordered padding-sm">
          <span class="chip">Item A</span>
          <span class="chip">Item B</span>
          <span class="chip">Item C</span>
        </div>
      </div>

      <div class="stack gap-sm">
        <span class="font-size-sm font-weight-bold text-color-muted">.gap / .gap-md (var(--spacing) = 1rem)</span>
        <div class="flex gap card card--bordered padding-sm">
          <span class="chip">Item A</span>
          <span class="chip">Item B</span>
          <span class="chip">Item C</span>
        </div>
      </div>

      <div class="stack gap-sm">
        <span class="font-size-sm font-weight-bold text-color-muted">.gap-lg (calc(--spacing * 2) = 2rem)</span>
        <div class="flex gap-lg card card--bordered padding-sm">
          <span class="chip">Item A</span>
          <span class="chip">Item B</span>
          <span class="chip">Item C</span>
        </div>
      </div>
    </div>
  `,
};
