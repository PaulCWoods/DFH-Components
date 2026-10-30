import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Layout/Grid',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Columns that fill the width. Items are never narrower than a minimum width, so the grid reflows as space narrows or text is zoomed, without breakpoints. Defined in \`layout/grid.css\`.

### Markup
\`\`\`html
<!-- As many columns as fit at the minimum width -->
<ul class="grid grid--xs" role="list">…</ul>

<!-- At most three columns, never narrower than the minimum -->
<div class="grid grid--3-col">…</div>

<!-- One column, three once the container is wider than 48em -->
<div class="grid @3xl:grid--3-col">…</div>

<!-- One row that scrolls and snaps -->
<ul class="grid grid--carousel grid--xs" role="list">…</ul>
\`\`\`

| Modifier | Effect |
| :--- | :--- |
| default, \`--2xs\` … \`--2xl\` | Auto-fill columns at the block step as a minimum width (default: the base block step) |
| \`--auto-fit\` | Too few items to fill a row share it |
| \`--1-col\` … \`--6-col\` | At most N columns, never narrower than the minimum (the \`2xs\` step unless a size is set) |
| \`@sm:\`, \`@md:\`, \`@lg:\` + \`grid--N-col\` | The column count once the nearest container is wider than 40, 48 or 60em |
| \`--carousel\` | One scrolling row with snap points; \`@max-3xl:grid--carousel\` only in a container narrower than 48rem |
| \`--tight\`, \`--cushioned\`, \`--ruled\` | Gap and rules |

- **Hooks:** \`--gap\`, \`--grid-min\`, set on the grid itself.
- **Density:** inside a compact region the gap steps down.
- **Carousel:** it scrolls with a trackpad, touch or the keyboard once an item inside has focus. If the items have nothing focusable, give the grid \`tabindex="0"\` and an \`aria-label\` so keyboard users can scroll it.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const plants = ['Brunnera', 'Epimedium', 'Hosta', 'Pulmonaria', 'Tiarella', 'Heuchera', 'Polystichum', 'Anemone'];
const card = (name: string) => `
  <li class="card">
    <div class="card__body"><h3 class="card__title small-heading">${name}</h3><p class="small-text text-muted">Shade, moist soil</p></div>
  </li>`;
const list = (cls: string, n = 6) => `<ul class="grid ${cls}" role="list">${plants.slice(0, n).map(card).join('')}</ul>`;

export const Playground: Story = {
  args: { size: 'xs', columns: 'auto' },
  argTypes: {
    size: { control: 'select', options: ['default', '2xs', 'xs', 'sm', 'md'] },
    columns: { control: 'inline-radio', options: ['auto', '2', '3', '4', '6'] },
  },
  render: (args) => list([args.size !== 'default' && `grid--${args.size}`, args.columns !== 'auto' && `grid--${args.columns}-col`].filter(Boolean).join(' '), 8),
};

export const AutoFill: Story = {
  name: 'Auto-fill by width',
  parameters: { docs: { description: { story: '`--xs`: as many columns as fit at 16rem each. Narrow the canvas or zoom in and items reflow.' } } },
  render: () => list('grid--xs'),
};

export const ColumnCount: Story = {
  name: 'Maximum column count',
  parameters: { docs: { description: { story: '`--4-col`: four columns where there is room, fewer as the space narrows, never narrower than the `2xs` step. Add a size (`--xs`) to raise the minimum.' } } },
  render: () => `
    <div class="stack">
      ${list('grid--4-col', 8)}
      ${list('grid--4-col grid--xs', 8)}
    </div>`,
};

export const ContainerColumns: Story = {
  name: 'Container column counts',
  parameters: { docs: { description: { story: '`grid @3xl:grid--3-col` in two containers: one column in the narrow one, three in the wide one.' } } },
  render: () => `
    <div class="stack">
      <div class="container-inline max-inline-size-sm">${list('@3xl:grid--3-col', 3)}</div>
      <div class="container-inline">${list('@3xl:grid--3-col', 3)}</div>
    </div>`,
};

export const Carousel: Story = {
  parameters: { docs: { description: { story: 'One row that scrolls and snaps, with a peek of the next item. Each card holds a link, so the row scrolls as focus moves.' } } },
  render: () => `
    <ul class="grid grid--carousel grid--xs" role="list">
      ${plants.map((p) => `
        <li class="card">
          <div class="card__body"><h3 class="card__title small-heading"><a href="#" class="link link--plain link--stretched">${p}</a></h3><p class="small-text text-muted">Shade, moist soil</p></div>
        </li>`).join('')}
    </ul>`,
};

export const Compact: Story = {
  parameters: { docs: { description: { story: 'In a `.ui-compact` region the gap steps down.' } } },
  render: () => `<div class="ui-compact">${list('grid--xs')}</div>`,
};
