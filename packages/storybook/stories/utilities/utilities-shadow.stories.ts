import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Utilities/Shadow',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Elevation from the 3-layer shadow tokens. Defined in \`utilities/shadow.css\`.

| Class | Shadow |
| :--- | :--- |
| \`.shadow-none\` | none |
| \`.shadow-sm\`, \`.shadow-md\` (\`.shadow\`), \`.shadow-lg\` | resting, raised, floating |
| \`.shadow-inner\` | inset |
| \`.shadow-sm-light\` … \`.shadow-inner-light\` | quieter, for plain surfaces |
| \`.shadow-accent\`, \`-success\`, \`-warning\`, \`-danger\` | the shadow tinted with an intent |

- A colour class tints whichever shadow the element has: \`.shadow-md.shadow-accent\`. It resolves the shadow tokens again on the element with its own \`--shadow-color\`, so it also tints a component's own shadow.
- A shadow is never the only sign of an intent (WCAG 1.4.1), and the shadows drop out under forced colours: keep a border where the edge matters.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const tile = (cls: string, text = `.${cls.split(' ').join(' .')}`) =>
  `<div class="bg-card rounded-md p-md ${cls}"><p class="small-text font-mono">${text}</p></div>`;

export const Playground: Story = {
  args: { elevation: 'md', light: false, colour: 'none' },
  argTypes: {
    elevation: { control: 'inline-radio', options: ['none', 'sm', 'md', 'lg', 'inner'] },
    colour: { control: 'inline-radio', options: ['none', 'accent', 'success', 'warning', 'danger'] },
  },
  render: (args) => {
    const cls = [`shadow-${args.elevation}${args.light && args.elevation !== 'none' ? '-light' : ''}`, args.colour !== 'none' && `shadow-${args.colour}`].filter(Boolean).join(' ');
    return `<div class="bg-subtle rounded-lg p-xl"><div class="max-inline-size-xs">${tile(cls)}</div></div>`;
  },
};

export const Elevation: Story = {
  parameters: { docs: { description: { story: 'Each elevation, and its light variant.' } } },
  render: () => `
    <div class="bg-subtle rounded-lg p-lg">
      <div class="grid grid--2xs">
        ${['sm', 'md', 'lg', 'inner'].map((e) => tile(`shadow-${e}`)).join('')}
        ${['sm', 'md', 'lg', 'inner'].map((e) => tile(`shadow-${e}-light`)).join('')}
      </div>
    </div>`,
};

export const Tinted: Story = {
  parameters: { docs: { description: { story: 'An intent tint on a raised tile, with words for the meaning.' } } },
  render: () => `
    <div class="bg-subtle rounded-lg p-lg">
      <div class="grid grid--2xs">
        ${tile('shadow-lg shadow-accent', 'Accent: featured bed')}
        ${tile('shadow-lg shadow-success', 'Success: harvest ready')}
        ${tile('shadow-lg shadow-warning', 'Warning: needs water')}
        ${tile('shadow-lg shadow-danger', 'Danger: blight found')}
      </div>
    </div>`,
};
