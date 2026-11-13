import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Layout/Inline',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
A row that doesn't wrap, its items centred on the cross axis. Use it for an icon beside text, a title beside an action, a toolbar. When items should wrap, use \`.cluster\`. Defined in \`layout/inline.css\`.

### Markup
\`\`\`html
<div class="inline">…icon… …text…</div>
<div class="inline inline--between">…title… …action…</div>
\`\`\`

| Modifier | Effect |
| :--- | :--- |
| \`--between\` | The first and last items at the two ends |
| \`--end\` | Items packed to the end |
| \`--tight\`, \`--cushioned\` | No gap, the cushion step |
| \`--ruled\` | A rule in each gap |

- **A column until there is room:** that is a Stack with \`@{size}:inline\`.
- **Hooks:** \`--gap\`, \`--align-items\`, \`--justify-content\`, set on the row itself; nested layouts keep their own.
- **Density:** inside a compact region the gap steps down.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const icon = (name: string) =>
  `<svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#${name}"/></svg>`;

export const Playground: Story = {
  args: { justify: 'start', gap: 'default' },
  argTypes: {
    justify: { control: 'inline-radio', options: ['start', 'between', 'end'] },
    gap: { control: 'inline-radio', options: ['tight', 'default', 'cushioned'] },
  },
  render: (args) => {
    const cls = [args.justify !== 'start' && `inline--${args.justify}`, args.gap !== 'default' && `inline--${args.gap}`].filter(Boolean).join(' ');
    return `
      <div class="inline${cls ? ` ${cls}` : ''}">
        <h2 class="small-heading">Shade border</h2>
        <button type="button" class="button">${icon('square-pen')}<span>Edit</span></button>
      </div>`;
  },
};

export const Distribution: Story = {
  parameters: { docs: { description: { story: 'Default, `--between` and `--end`.' } } },
  render: () => `
    <div class="stack stack--ruled">
      ${['', 'inline--between', 'inline--end'].map((cls) => `
        <div class="inline ${cls}">
          <p class="text">${cls ? `--${cls.split('--')[1]}` : 'Default'}</p>
          <button type="button" class="button button--sm">Water</button>
          <button type="button" class="button button--sm">Feed</button>
        </div>`).join('')}
    </div>`,
};

export const IconAndText: Story = {
  name: 'Icon and text',
  parameters: { docs: { description: { story: 'The commonest use: an icon beside a line of text, centred on it.' } } },
  render: () => `
    <ul class="stack" role="list">
      <li class="inline gap-xs">${icon('sun')}<span class="text">Part shade</span></li>
      <li class="inline gap-xs">${icon('info')}<span class="text">Flowers in April</span></li>
    </ul>`,
};

export const Ruled: Story = {
  parameters: { docs: { description: { story: '`--ruled` draws a rule in each gap, where `rule` is supported. The gap alone still separates the items.' } } },
  render: () => `
    <ul class="inline inline--ruled small-text" role="list">
      <li>Part shade</li>
      <li>Moist soil</li>
      <li>Flowers in spring</li>
    </ul>`,
};
