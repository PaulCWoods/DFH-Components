import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Utilities/Spacing & Padding',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
**Logical Spacing Utilities** provide token-driven margin and padding classes that adapt seamlessly across bidirectional layouts (LTR & RTL).
Direct parity with the Design For Humans blog architecture (\`_margin.scss\` & \`_padding.scss\`).

### Available Classes
- **Padding:** \`.padding\`, \`.padding-0\`, \`.padding-sm\`, \`.padding-lg\`, \`.padding-breathe\`, \`.padding-cushion\` (Aliases: \`.pd\`, \`.pd-0\`, \`.pd-sm\`, etc.)
- **Padding Inline (Horizontal):** \`.padding-inline\`, \`.padding-inline-sm\`, \`.padding-inline-lg\` (Aliases: \`.px\`, \`.px-sm\`, etc.)
- **Padding Block (Vertical):** \`.padding-block\`, \`.padding-block-sm\`, \`.padding-block-lg\` (Aliases: \`.py\`, \`.py-sm\`, etc.)
- **Padding Directional:** \`.padding-top\` / \`.pt\`, \`.padding-bottom\` / \`.pb\`, \`.padding-left\` / \`.pl\`, \`.padding-right\` / \`.pr\`
- **Margin:** \`.margin\`, \`.margin-0\`, \`.margin-sm\`, \`.margin-lg\`, \`.margin-breathe\` (Aliases: \`.mg\`, \`.mg-0\`, \`.mg-sm\`, etc.)
- **Margin Inline (Horizontal):** \`.margin-inline\`, \`.margin-inline-sm\`, \`.margin-inline-lg\` (Aliases: \`.mx\`, \`.mx-sm\`, etc.)
- **Margin Block (Vertical):** \`.margin-block\`, \`.margin-block-sm\`, \`.margin-block-lg\` (Aliases: \`.my\`, \`.my-sm\`, etc.)
- **Margin Directional:** \`.margin-top\` / \`.mt\`, \`.margin-bottom\` / \`.mb\`, \`.margin-left\` / \`.ml\`, \`.margin-right\` / \`.mr\`
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * 1. Logical Padding Scale
 */
export const PaddingScale: Story = {
  render: () => `
    <div class="stack gap">
      <div class="card card--bordered padding-sm">
        <p class="font-size-sm"><strong>.padding-sm / .pd-sm:</strong> Compact 0.5rem (var(--spacing-8)) all sides</p>
      </div>

      <div class="card card--bordered padding">
        <p class="font-size-sm"><strong>.padding / .pd:</strong> Standard 1rem (var(--spacing-16)) all sides</p>
      </div>

      <div class="card card--bordered padding-lg">
        <p class="font-size-sm"><strong>.padding-lg / .pd-lg:</strong> Generous 2rem (var(--spacing-32)) all sides</p>
      </div>
    </div>
  `,
};

/**
 * 2. Directional Inline & Block Padding
 */
export const DirectionalPadding: Story = {
  render: () => `
    <div class="stack gap">
      <div class="card card--bordered padding-inline padding-block-sm">
        <p class="font-size-sm"><strong>.padding-inline .padding-block-sm:</strong> Horizontal 1rem, Vertical 0.5rem</p>
      </div>
      <div class="card card--bordered padding-inline-lg padding-block">
        <p class="font-size-sm"><strong>.padding-inline-lg .padding-block:</strong> Horizontal 2rem, Vertical 1rem</p>
      </div>
      <div class="card card--bordered padding-top-lg padding-bottom-sm padding-left-md padding-right-md">
        <p class="font-size-sm"><strong>.padding-top-lg .padding-bottom-sm .padding-left-md .padding-right-md:</strong> Explicit individual side padding</p>
      </div>
    </div>
  `,
};

/**
 * 3. Directional Margins
 */
export const DirectionalMargins: Story = {
  render: () => `
    <div class="stack gap">
      <div class="card card--bordered margin-top-md margin-bottom-sm">
        <p class="font-size-sm"><strong>.margin-top-md .margin-bottom-sm:</strong> Top 1rem, Bottom 0.5rem</p>
      </div>
      <div class="card card--bordered margin-left-lg">
        <p class="font-size-sm"><strong>.margin-left-lg / .ml-lg:</strong> Left offset 2rem</p>
      </div>
    </div>
  `,
};
