import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Atoms/Brand',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
The product's mark and name, as a link home. A whole link on its own: it takes no \`.link\` class.

### Markup
\`\`\`html
<a href="/" class="brand">
  <svg class="brand__mark icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#BrandDesignForHumans"/></svg>
  <span class="brand__name">Design For Humans</span>
</a>
\`\`\`

- **Parts:** either can be left out. A mark alone needs \`.sr-only\` text.
- **Narrow screens:** beside a mark, at 20em and under, the name is hidden visually and still names the link.
- **Density:** a compact container (\`--ui-sizing: compact\`) steps the name and the target down.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const mark = `<svg class="brand__mark icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#BrandDesignForHumans"/></svg>`;

export const MarkAndName: Story = {
  render: () => `<a href="#" class="brand">${mark}<span class="brand__name">Design For Humans</span></a>`,
};

export const NameOnly: Story = {
  render: () => `<a href="#" class="brand"><span class="brand__name">Woodland Plants</span></a>`,
};

export const MarkOnly: Story = {
  render: () => `<a href="#" class="brand">${mark}<span class="sr-only">Design For Humans home</span></a>`,
};

export const MenuButton: Story = {
  name: 'As a menu button',
  render: () => `<button type="button" class="brand">${mark}<span class="sr-only">Menu</span></button>`,
};

export const Compact: Story = {
  render: () => `<div class="ui-compact"><a href="#" class="brand">${mark}<span class="brand__name">Design For Humans</span></a></div>`,
};
