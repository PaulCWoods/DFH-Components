import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Layout/Columns',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Content in newspaper columns (CSS multi-column): it runs down one column and on into the next. For long lists people scan and for print; the Grid sets items in rows. No breakpoints: as many columns fit as there's room for at the minimum width, down to one. Defined in \`layout/columns.css\`.

### Markup
\`\`\`html
<!-- As many columns as fit, each at least 16rem -->
<ul class="columns" role="list">…</ul>

<!-- At most three columns, with rules between -->
<div class="columns columns--3-col columns--ruled">…</div>

<!-- One column, two once the container is 48rem wide -->
<div class="columns @3xl:columns--2-col">…</div>
\`\`\`

| Modifier | Effect |
| :--- | :--- |
| default | As many columns as fit at \`--columns-width\` (16rem) |
| \`--2xs\` … \`--md\` | The minimum column width, from the Grid's block steps |
| \`--2-col\` … \`--4-col\` | At most N columns, never narrower than the minimum |
| \`@xs:\` … \`@7xl:\` + \`columns--N-col\` | The count once the nearest container reaches the size |
| \`--ruled\` | A rule between columns |
| \`--flow\` | Items run on from one column into the next (by default each stays whole) |

- **Hooks:** \`--gap\`, \`--columns-width\`, \`--columns-count\`, set on the columns themselves.
- **Density:** inside a compact region the gap steps down.
- **Utilities:** \`break-inside-avoid\`, \`break-after-avoid\`, \`column-span-all\`.
- **Links one above another:** give each item \`py-xs\`, so they sit 24px apart.
- **Reading order** runs down each column: lists, not running prose on a screen, and never interactive rows.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const plants = ['Astilbe', 'Astrantia', 'Bergenia', 'Brunnera', 'Campanula', 'Digitalis', 'Epimedium', 'Geranium', 'Hellebore', 'Heuchera', 'Hosta', 'Polystichum', 'Pulmonaria', 'Tiarella'];
const list = (cls: string, n = plants.length) => `<ul class="columns ${cls}" role="list">${plants.slice(0, n).map((p) => `<li class="text">${p}</li>`).join('')}</ul>`;

export const Playground: Story = {
  args: { width: 'default', columns: 'auto', ruled: false },
  argTypes: {
    width: { control: 'inline-radio', options: ['2xs', 'default', 'sm', 'md'] },
    columns: { control: 'inline-radio', options: ['auto', '2', '3', '4'] },
    ruled: { control: 'boolean' },
  },
  render: (args) => list([args.width !== 'default' && `columns--${args.width}`, args.columns !== 'auto' && `columns--${args.columns}-col`, args.ruled && 'columns--ruled'].filter(Boolean).join(' ')),
};

export const AsManyAsFit: Story = {
  name: 'As many as fit',
  render: () => list(''),
};

export const NarrowColumns: Story = {
  name: 'Narrow columns',
  parameters: { docs: { description: { story: '`--2xs` for tags or single words.' } } },
  render: () => list('columns--2xs'),
};

export const AtMostTwo: Story = {
  name: 'At most two columns',
  render: () => list('columns--2-col'),
};

export const Ruled: Story = {
  render: () => `
    <nav aria-label="Site map">
      <ul class="columns columns--3-col columns--ruled small-text" role="list">
        ${['Plants', 'Planting guides', 'Garden tours', 'Seed swaps', 'Volunteering', 'Shop', 'Membership', 'Contact us'].map((l) => `<li class="py-xs"><a class="link" href="#${l.toLowerCase().replace(/ /g, '-')}">${l}</a></li>`).join('')}
      </ul>
    </nav>`,
};

export const FromAContainerSize: Story = {
  name: 'From a container size',
  parameters: { docs: { description: { story: 'One column, three once the container is 48rem wide.' } } },
  render: () => `<div class="container-inline">${list('@3xl:columns--3-col')}</div>`,
};

export const GroupsAndHeadings: Story = {
  name: 'Groups and a spanning heading',
  parameters: { docs: { description: { story: 'A heading across every column with `column-span-all`; each letter\'s terms in one element, so they stay together.' } } },
  render: () => `
    <div class="columns columns--3-col">
      <h3 class="small-heading column-span-all mb-xs">Shade plants</h3>
      ${Object.entries({ A: ['Astilbe', 'Astrantia'], B: ['Bergenia', 'Brunnera'], E: ['Epimedium'], H: ['Hellebore', 'Heuchera', 'Hosta'], P: ['Polystichum', 'Pulmonaria'], T: ['Tiarella'] })
        .map(([letter, names]) => `<div class="stack gap-2xs pb-sm"><h4 class="micro-heading">${letter}</h4>${names.map((n) => `<p class="small-text">${n}</p>`).join('')}</div>`)
        .join('')}
    </div>`,
};

export const Flow: Story = {
  parameters: { docs: { description: { story: '`--flow` lets items run on into the next column, as text does; `break-after-avoid` keeps each heading with its paragraph. For print, not for reading on a screen.' } } },
  render: () => `
    <div class="columns columns--2-col columns--flow">
      <h3 class="small-heading break-after-avoid">Planting in shade</h3>
      <p class="text">Most shade plants want soil that holds water without staying wet. Dig in leaf mould before planting, and water through the first summer while the roots find their way.</p>
      <h3 class="small-heading break-after-avoid">Choosing plants</h3>
      <p class="text">Start with the toughest: Epimedium, Brunnera and Geranium macrorrhizum cope with dry shade under trees. Add ferns and Hostas where the soil stays moist.</p>
    </div>`,
};

export const Compact: Story = {
  parameters: { docs: { description: { story: 'Inside a compact region the gap steps down.' } } },
  render: () => `<div class="ui-compact">${list('columns--ruled')}</div>`,
};
