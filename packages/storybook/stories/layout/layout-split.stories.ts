import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Layout/Split',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Two panes side by side: a side pane at its preferred width and a main pane that takes the rest. When the main pane would be narrower than its minimum, the panes wrap and each takes the full width. No breakpoint is needed, and it works at any zoom. Defined in \`layout/split.css\`.

### Markup
\`\`\`html
<div class="split split--xs">
  <nav aria-label="Sections">…side…</nav>
  <div>…main…</div>
</div>
\`\`\`

| Modifier | Effect |
| :--- | :--- |
| \`--2xs\` … \`--2xl\` | The side pane's width (default \`--xs\`, 16rem) |
| \`@xs:\` … \`@7xl:\` + \`split--{width}\` | The side pane's width once the nearest container reaches the size (\`@5xl:\` is 64rem) |
| \`--end\` | The side pane is last |
| \`--nowrap\` | Never wrap: the side pane keeps its width, the main shrinks |
| \`--three\` | Start, centre and end panes in one row |
| \`--tight\`, \`--ruled\` | No gap; a rule in the gap |

- **Hooks:** \`--gap\`, \`--align-items\` (default \`flex-start\`; \`stretch\` for equal-height panes), \`--split-side-width\`, \`--split-main-min-width\` (default 24rem), \`--split-start-width\` and \`--split-end-width\` (for \`--three\`).
- **Density:** inside a compact region the gap steps down to the default.
- **Source order** is reading order: put the side pane first only when it comes first when read (navigation, filters). Use \`--end\` rather than reordering with CSS.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const sideNav = (label = 'Plant groups') => `
  <nav class="card" aria-label="${label}">
    <div class="card__body">
      <ul class="stack" role="list">
        <li><a href="#" class="link" aria-current="page">Perennials</a></li>
        <li><a href="#" class="link">Ferns</a></li>
        <li><a href="#" class="link">Grasses</a></li>
      </ul>
    </div>
  </nav>`;
const main = `
  <div class="stack">
    <h2 class="subheading">Perennials</h2>
    <p class="text">Woodland perennials want soil that holds moisture but drains. Dig in leaf mould before planting, and mulch every spring.</p>
  </div>`;

export const Playground: Story = {
  args: { width: 'xs', end: false, nowrap: false, ruled: false },
  argTypes: { width: { control: 'select', options: ['2xs', 'xs', 'sm', 'md'] } },
  render: (args) => {
    const cls = [`split--${args.width}`, args.end && 'split--end', args.nowrap && 'split--nowrap', args.ruled && 'split--ruled'].filter(Boolean).join(' ');
    return `<div class="split ${cls}">${args.end ? main + sideNav() : sideNav() + main}</div>`;
  },
};

export const Wrapping: Story = {
  parameters: { docs: { description: { story: 'The same split in a narrow column: the main pane would be narrower than 24rem, so the panes stack.' } } },
  render: () => `
    <div class="stack">
      <div class="split">${sideNav('Plant groups, wide')}${main}</div>
      <div class="max-inline-size-sm"><div class="split">${sideNav('Plant groups, narrow')}${main}</div></div>
    </div>`,
};

export const ContainerWidths: Story = {
  name: 'Container widths',
  parameters: { docs: { description: { story: '`split--2xs @3xl:split--xs @5xl:split--sm`: the side pane widens as its container grows (8rem, 16rem from 48rem, 24rem from 64rem). Each container here is a `.container-inline` of a different width.' } } },
  render: () => `
    <div class="stack">
      ${['max-w-md', 'max-w-lg', 'max-w-xl'].map((w, i) => `
        <div class="container-inline ${w}">
          <div class="split split--2xs @3xl:split--xs @5xl:split--sm split--nowrap">${sideNav('Plant groups ' + (i + 1))}${main}</div>
        </div>`).join('')}
    </div>`,
};

export const End: Story = {
  parameters: { docs: { description: { story: '`--end`: the side pane comes last, in reading order and on screen.' } } },
  render: () => `
    <div class="split split--end split--xs">
      ${main}
      <aside class="card" aria-label="Planting notes"><div class="card__body"><p class="small-text">Plant in early autumn.</p></div></aside>
    </div>`,
};

export const Three: Story = {
  name: 'Three panes',
  parameters: { docs: { description: { story: '`--three` with start and end widths set by the hooks.' } } },
  render: () => `
    <div class="split split--three" style="--split-start-width: 12rem; --split-end-width: 14rem;">
      ${sideNav()}
      ${main}
      <aside class="card" aria-label="Planting notes"><div class="card__body"><p class="small-text">Plant in early autumn.</p></div></aside>
    </div>`,
};

export const EqualHeight: Story = {
  name: 'Equal-height panes, no gap',
  parameters: { docs: { description: { story: '`--align-items: stretch` makes the panes equal in height; `--tight` removes the gap.' } } },
  render: () => `<div class="split split--tight split--xs" style="--align-items: stretch;">${sideNav()}${main}</div>`,
};

export const Nested: Story = {
  name: 'A split inside a pane',
  parameters: { docs: { description: { story: 'A split can\'t be a pane of another split, so the inner one is wrapped in a plain `<div>`, which becomes the pane.' } } },
  render: () => `
    <div class="split split--xs">
      ${sideNav()}
      <div>
        <div class="split split--end split--2xs">
          ${main}
          <aside class="card" aria-label="Planting notes"><div class="card__body"><p class="small-text">Plant in early autumn.</p></div></aside>
        </div>
      </div>
    </div>`,
};
