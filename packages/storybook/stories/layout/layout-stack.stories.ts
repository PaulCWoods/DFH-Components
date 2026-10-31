import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Layout/Stack',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
A column with a gap between its children. Children don't set their own margins; the stack spaces them. Defined in \`layout/stack.css\`.

### Markup
\`\`\`html
<div class="stack">…</div>
<ul class="stack" role="list">…</ul>
\`\`\`

| Modifier | Effect |
| :--- | :--- |
| default | The default gap |
| \`--tight\` | No gap |
| \`--cushioned\` | The cushion step |
| \`--ruled\` | A rule in each gap, where \`rule\` is supported |

- **Hooks:** \`--gap\`, \`--align-items\`, \`--justify-content\`, set on the stack itself. They stay on that element: a nested stack keeps its own gap.
- **Density:** inside a compact region (\`.ui-compact\`, a \`--compact\` container) the gap steps down: the default to the compact step, \`--cushioned\` to the default.
- **Lists:** a \`<ul>\` or \`<ol>\` stack loses its markers, so give it \`role="list"\` (Safari drops list semantics without markers).
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const item = (text: string) => `<div class="card"><div class="card__body"><p class="text">${text}</p></div></div>`;
const plants = ['Brunnera', 'Epimedium', 'Hosta', 'Pulmonaria'];

export const Playground: Story = {
  args: { gap: 'default', ruled: false },
  argTypes: { gap: { control: 'inline-radio', options: ['tight', 'default', 'cushioned'] } },
  render: (args) => {
    const cls = [args.gap !== 'default' && `stack--${args.gap}`, args.ruled && 'stack--ruled'].filter(Boolean).join(' ');
    return `<div class="stack${cls ? ` ${cls}` : ''}">${plants.map(item).join('')}</div>`;
  },
};

export const Gaps: Story = {
  parameters: { docs: { description: { story: 'Tight, default and cushioned gaps.' } } },
  render: () => `
    <div class="grid grid--3-col grid--2xs">
      ${['tight', 'default', 'cushioned'].map((g) => `
        <section class="stack" aria-labelledby="gap-${g}">
          <h2 id="gap-${g}" class="micro-heading">${g === 'default' ? 'Default' : `--${g}`}</h2>
          <div class="stack${g === 'default' ? '' : ` stack--${g}`}">${plants.slice(0, 3).map(item).join('')}</div>
        </section>`).join('')}
    </div>`,
};

export const Compact: Story = {
  parameters: { docs: { description: { story: 'The same stack in a `.ui-compact` region: the gap steps down to the compact step.' } } },
  render: () => `
    <div class="grid grid--2-col grid--xs">
      <section class="stack" aria-labelledby="c-default">
        <h2 id="c-default" class="micro-heading">Default</h2>
        <div class="stack">${plants.slice(0, 3).map(item).join('')}</div>
      </section>
      <section class="stack ui-compact" aria-labelledby="c-compact">
        <h2 id="c-compact" class="micro-heading">In a compact region</h2>
        <div class="stack">${plants.slice(0, 3).map(item).join('')}</div>
      </section>
    </div>`,
};

export const List: Story = {
  parameters: { docs: { description: { story: 'A list stack with `role="list"`, and `--ruled` for a rule between items.' } } },
  render: () => `
    <ol class="stack stack--ruled" role="list">
      <li class="text">Dig in leaf mould before planting.</li>
      <li class="text">Plant in early autumn, while the soil is warm.</li>
      <li class="text">Mulch every spring.</li>
    </ol>`,
};

export const NestedSettings: Story = {
  name: 'Settings stay put',
  parameters: { docs: { description: { story: 'The outer stack sets `--gap` and `--align-items`; the nested stack keeps its own defaults. Set the hooks on the element they belong to.' } } },
  render: () => `
    <div class="stack" style="--gap: var(--spacing-cushion); --align-items: start;">
      <p class="text">The outer stack has a cushion gap and starts its items.</p>
      <div class="stack">
        ${plants.slice(0, 2).map(item).join('')}
      </div>
    </div>`,
};

export const Responsive: Story = {
  parameters: { docs: { description: { story: 'Two `.stack.@2xl:inline` rows in containers of different widths: a column in the narrow one, a row in the wide one.' } } },
  render: () => `
    <div class="grid grid--2-col grid--2xs">
      ${['Narrow', 'Wide'].map((label, i) => `
        <div class="container-inline ${i ? '' : 'max-inline-size-sm'}">
          <div class="stack @2xl:inline">
            <p class="text">${label} container</p>
            <button type="button" class="button button--strong button--accent">Add to border</button>
          </div>
        </div>`).join('')}
    </div>`,
};
