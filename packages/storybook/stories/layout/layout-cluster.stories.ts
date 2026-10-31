import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Layout/Cluster',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
A row that wraps: tags, statuses, buttons, links. Items keep their own width and are centred on the cross axis; the cluster fills its parent. Defined in \`layout/cluster.css\`.

### Markup
\`\`\`html
<ul class="cluster" role="list">
  <li><span class="chip">Shade</span></li>
  <li><span class="chip">Moist soil</span></li>
</ul>
<div class="cluster cluster--end">
  <button type="button" class="button">Cancel</button>
  <button type="button" class="button button--strong button--accent">Save</button>
</div>
\`\`\`

| Modifier | Effect |
| :--- | :--- |
| \`--between\` | The first and last items at the two ends |
| \`--end\` | Items packed to the end |
| \`--tight\`, \`--cushioned\` | No gap, the cushion step |
| \`--ruled\` | A rule in each gap |

- **Hooks:** \`--gap\`, \`--align-items\`, \`--justify-content\`, set on the cluster itself.
- **Density:** inside a compact region the gap steps down.
- **Lists:** a list cluster loses its markers, so give it \`role="list"\`.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const tags = ['Shade', 'Moist soil', 'Spring flowers', 'Evergreen', 'Ground cover', 'Native', 'Pollinators', 'Deer resistant'];
const tagList = (cls = '') => `
  <ul class="cluster${cls ? ` ${cls}` : ''}" role="list">
    ${tags.map((t) => `<li><span class="chip"><span class="chip__text">${t}</span></span></li>`).join('')}
  </ul>`;

export const Playground: Story = {
  args: { justify: 'start', gap: 'default' },
  argTypes: {
    justify: { control: 'inline-radio', options: ['start', 'between', 'end'] },
    gap: { control: 'inline-radio', options: ['tight', 'default', 'cushioned'] },
  },
  render: (args) => tagList([args.justify !== 'start' && `cluster--${args.justify}`, args.gap !== 'default' && `cluster--${args.gap}`].filter(Boolean).join(' ')),
};

export const Wrapping: Story = {
  parameters: { docs: { description: { story: 'In a narrow column the tags wrap onto new lines; each keeps its width.' } } },
  render: () => `<div class="max-inline-size-sm">${tagList()}</div>`,
};

export const Actions: Story = {
  parameters: { docs: { description: { story: '`--end` packs form actions to the end; they wrap at narrow widths or large text.' } } },
  render: () => `
    <div class="cluster cluster--end">
      <button type="button" class="button">Cancel</button>
      <button type="button" class="button button--strong button--accent">Save planting plan</button>
    </div>`,
};

export const Compact: Story = {
  parameters: { docs: { description: { story: 'In a `.ui-compact` region the gap and the chips step down.' } } },
  render: () => `<div class="ui-compact">${tagList()}</div>`,
};

export const Ruled: Story = {
  parameters: { docs: { description: { story: '`--ruled` draws a rule in each gap, where `rule` is supported. The gap alone still separates the items.' } } },
  render: () => tagList('cluster--ruled'),
};
