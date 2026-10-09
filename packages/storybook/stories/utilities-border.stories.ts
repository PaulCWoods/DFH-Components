import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Utilities/Border & Radius',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
**Border & Radius Utilities** provide zero-specificity (\`:where()\`) border, style, color, and corner radius helpers using shared tokens.
Defined in \`utilities/border.css\`.

### Available Classes:
- **Base & Sizes:** \`.border\` / \`.bd\`, \`.border-sm\` / \`.bd-sm\`, \`.border-md\` / \`.bd-md\`, \`.border-lg\` / \`.bd-lg\`, \`.border-none\` / \`.bd-0\`.
- **Directional Sides:** \`.border-top\` / \`.bt\`, \`.border-bottom\` / \`.bb\`, \`.border-left\` / \`.bl\`, \`.border-right\` / \`.br\` (+ scales \`-sm\`, \`-md\`, \`-lg\`).
- **Colors:** \`.border-muted\` / \`.bd-muted\`, \`.border-quiet\` / \`.bd-quiet\`.
- **Styles:** \`.border-dashed\` / \`.bd-dashed\`, \`.border-dotted\` / \`.bd-dotted\`, \`.border-double\` / \`.bd-double\`, \`.border-solid\` / \`.bd-solid\`.
- **Corner Radii:** \`.radius\` / \`.rounded\`, \`.radius-none\` / \`.rounded-none\`, \`.radius-sm\` / \`.rounded-sm\`, \`.radius-md\` / \`.rounded-md\`, \`.radius-lg\` / \`.rounded-lg\`, \`.radius-round\` / \`.rounded-full\`.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const BorderSizes: Story = {
  render: () => `
    <div class="stack gap">
      <div class="card bd-sm padding-sm">
        <p class="font-size-sm"><strong>.border-sm / .bd-sm:</strong> 1px solid border</p>
      </div>
      <div class="card bd-md padding-sm">
        <p class="font-size-sm"><strong>.border-md / .bd-md:</strong> 2px solid border</p>
      </div>
      <div class="card bd-lg padding-sm">
        <p class="font-size-sm"><strong>.border-lg / .bd-lg:</strong> 4px solid border</p>
      </div>
    </div>
  `,
};

export const DirectionalAndStyles: Story = {
  render: () => `
    <div class="stack gap">
      <div class="card bb-sm bb-dashed bd-muted padding-sm">
        <p class="font-size-sm"><strong>.bb-sm .bb-dashed .bd-muted:</strong> 1px dashed bottom border in muted color</p>
      </div>
      <div class="card bl-md bd-solid padding-sm">
        <p class="font-size-sm"><strong>.bl-md .bd-solid:</strong> 2px solid left accent border</p>
      </div>
      <div class="card bt-lg bd-muted padding-sm">
        <p class="font-size-sm"><strong>.bt-lg .bd-muted:</strong> 4px solid top banner border</p>
      </div>
    </div>
  `,
};

export const CornerRadii: Story = {
  render: () => `
    <div class="cluster gap">
      <div class="card bd-sm rounded-none padding-sm" style="min-inline-size: 8rem; text-align: center;">
        <p class="font-size-xs">.rounded-none (0)</p>
      </div>
      <div class="card bd-sm rounded-sm padding-sm" style="min-inline-size: 8rem; text-align: center;">
        <p class="font-size-xs">.rounded-sm (2px)</p>
      </div>
      <div class="card bd-sm rounded-md padding-sm" style="min-inline-size: 8rem; text-align: center;">
        <p class="font-size-xs">.rounded-md (4px)</p>
      </div>
      <div class="card bd-sm rounded-lg padding-sm" style="min-inline-size: 8rem; text-align: center;">
        <p class="font-size-xs">.rounded-lg (8px)</p>
      </div>
      <div class="card bd-sm rounded-full padding-sm" style="min-inline-size: 8rem; text-align: center;">
        <p class="font-size-xs">.rounded-full (Pill)</p>
      </div>
    </div>
  `,
};
