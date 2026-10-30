import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Organisms/Table',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
A data table: rules, padding, alignment and sticky edges. Cell content is atoms (text atoms, \`.status\`, \`.button\`, \`.lockup\`). Sorting, selection and paging are the page's job; the table styles their states.

### Markup
\`\`\`html
<div class="table-container" tabindex="0" role="region" aria-labelledby="plants">
  <table class="table">
    <caption id="plants" class="small-heading">Plants for dry shade</caption>
    <thead>
      <tr><th scope="col">Plant</th><th scope="col" class="table__cell--numeric">Height (cm)</th></tr>
    </thead>
    <tbody>
      <tr><th scope="row">Epimedium</th><td class="table__cell--numeric">30</td></tr>
    </tbody>
  </table>
</div>
\`\`\`

- **Scroll container:** \`.table-container\` scrolls a wide table. Give it \`tabindex="0"\`, \`role="region"\` and a unique name, so it can be scrolled by keyboard and found.
- **Prominence:** default (rules between rows, a tinted head), \`--plain\` (no rules, no tint, outer cells flush with the text around it). Flag: \`--table-prominence: plain\`.
- **Options:** \`--bordered\` (outer frame and column rules), \`--striped\`, \`--hover\` (only for rows with actions or selection), \`--compact\` (or any compact region).
- **Sticky edges:** \`--sticky-head\`, \`--sticky-foot\`, \`--sticky-first-column\`, \`--sticky-last-column\`, inside a container with a height.
- **Cells:** \`.table__cell--numeric\`, \`--center\`, \`--fit\`, \`--nowrap\`, \`--truncate\`. **Columns** (on a \`<col>\` or header cell): \`.table__col--index\`, \`--xs\` to \`--xl\`, \`--actions\`, \`--fill\`.
- **Caption:** put a text atom on it (\`.small-heading\`), or \`.sr\` to hide it. The table sets no caption type.
- **Sorting:** \`aria-sort\` on the \`<th>\`; a \`.table__sort-button\` inside, named by its text, with \`ChevronsUpDown\` when unsorted and \`ChevronDown\` when sorted.
- **In a card:** a flush card body lines the outer cells up with the card's content (\`--table-inset\`).
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const icon = (name: string) => `<svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#${name}"/></svg>`;

type Plant = { name: string; light: string; height: number; flowers: string; stock: number };
const plants: Plant[] = [
  { name: 'Epimedium', light: 'Dry shade', height: 30, flowers: 'April', stock: 42 },
  { name: 'Geranium macrorrhizum', light: 'Dry shade', height: 40, flowers: 'May to July', stock: 118 },
  { name: 'Brunnera', light: 'Part shade', height: 45, flowers: 'April to May', stock: 7 },
  { name: 'Hosta', light: 'Full shade', height: 60, flowers: 'July', stock: 0 },
  { name: 'Polystichum', light: 'Full shade', height: 75, flowers: 'None', stock: 26 },
];

const head = `
  <thead>
    <tr>
      <th scope="col">Plant</th>
      <th scope="col">Light</th>
      <th scope="col" class="table__cell--numeric">Height (cm)</th>
      <th scope="col">Flowers</th>
      <th scope="col" class="table__cell--numeric">In stock</th>
    </tr>
  </thead>`;

const rows = (list = plants) => list.map((p) => `
    <tr>
      <th scope="row">${p.name}</th>
      <td>${p.light}</td>
      <td class="table__cell--numeric">${p.height}</td>
      <td>${p.flowers}</td>
      <td class="table__cell--numeric">${p.stock}</td>
    </tr>`).join('');

const foot = `
  <tfoot>
    <tr><th scope="row" colspan="4">Total in stock</th><td class="table__cell--numeric">193</td></tr>
  </tfoot>`;

const table = (id: string, caption: string, cls = '', o: { foot?: boolean; style?: string } = {}) => `
  <div class="table-container" tabindex="0" role="region" aria-labelledby="${id}"${o.style ? ` style="${o.style}"` : ''}>
    <table class="table${cls ? ` ${cls}` : ''}">
      <caption id="${id}" class="small-heading">${caption}</caption>
      ${head}
      <tbody>${rows()}</tbody>
      ${o.foot ? foot : ''}
    </table>
  </div>`;

export const Playground: Story = {
  args: { prominence: 'default', bordered: false, striped: false, compact: false, footer: true },
  argTypes: { prominence: { control: 'inline-radio', options: ['default', 'plain'] } },
  render: (args) => {
    const cls = [args.prominence === 'plain' && 'table--plain', args.bordered && 'table--bordered', args.striped && 'table--striped', args.compact && 'table--compact'].filter(Boolean).join(' ');
    return table('pg', 'Plants for shade', cls, { foot: args.footer });
  },
};

export const Prominence: Story = {
  name: 'Prominence and borders',
  render: () => `
    <div class="stack gap-xl">
      ${table('pr-default', 'Default: rules between rows, a tinted head', '', { foot: true })}
      ${table('pr-plain', 'Plain: no rules or tint, outer cells flush', 'table--plain')}
      ${table('pr-bordered', 'Bordered: an outer frame and column rules', 'table--bordered', { foot: true })}
      <div style="--table-prominence: plain;">${table('pr-flag', 'Plain, set by a container flag')}</div>
    </div>`,
};

export const Rows: Story = {
  render: () => `
    <div class="stack gap-xl">
      ${table('rows-striped', 'Striped', 'table--striped')}
      <div class="table-container" tabindex="0" role="region" aria-labelledby="rows-hover">
        <table class="table table--hover">
          <caption id="rows-hover" class="small-heading">Hover, for rows with actions</caption>
          <thead><tr><th scope="col">Plant</th><th scope="col" class="table__cell--numeric">In stock</th><th scope="col" class="table__col--actions"><span class="sr-only">Actions</span></th></tr></thead>
          <tbody>${plants.slice(0, 3).map((p) => `
            <tr><th scope="row">${p.name}</th><td class="table__cell--numeric">${p.stock}</td><td class="table__col--actions"><button type="button" class="button button--subtle button--sm">Reorder<span class="sr-only"> ${p.name}</span></button></td></tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>`,
};

export const Compact: Story = {
  render: () => `
    <div class="stack gap-xl">
      ${table('cp-mod', 'Compact', 'table--compact', { foot: true })}
      <div class="ui-compact">${table('cp-region', 'In a compact region', '', { foot: true })}</div>
    </div>`,
};

export const StickyEdges: Story = {
  name: 'Sticky edges',
  render: () => {
    const many = [...plants, ...plants, ...plants].map((p, i) => ({ ...p, name: `${p.name} ${i + 1}` }));
    return `
      <div class="table-container" tabindex="0" role="region" aria-labelledby="sticky" style="max-block-size: 18rem; max-inline-size: 36rem;">
        <table class="table table--sticky-head table--sticky-foot table--sticky-first-column table--sticky-last-column">
          <caption id="sticky" class="sr-only">Stock by plant, scrollable</caption>
          <thead>
            <tr>
              <th scope="col" class="table__cell--nowrap">Plant</th>
              <th scope="col" class="table__cell--nowrap">Light</th>
              <th scope="col" class="table__cell--numeric">Height (cm)</th>
              <th scope="col" class="table__cell--nowrap">Flowers</th>
              <th scope="col" class="table__cell--nowrap">Supplier</th>
              <th scope="col" class="table__cell--numeric">In stock</th>
            </tr>
          </thead>
          <tbody>${many.map((p) => `
            <tr><th scope="row" class="table__cell--nowrap">${p.name}</th><td class="table__cell--nowrap">${p.light}</td><td class="table__cell--numeric">${p.height}</td><td class="table__cell--nowrap">${p.flowers}</td><td class="table__cell--nowrap">Woodland Nurseries Ltd</td><td class="table__cell--numeric">${p.stock}</td></tr>`).join('')}
          </tbody>
          <tfoot><tr><th scope="row" colspan="5">Total in stock</th><td class="table__cell--numeric">579</td></tr></tfoot>
        </table>
      </div>`;
  },
};

export const Sorting: Story = {
  render: () => `
    <div class="table-container" tabindex="0" role="region" aria-labelledby="sort">
      <table class="table">
        <caption id="sort" class="small-heading">Sorted by height, ascending</caption>
        <thead>
          <tr>
            <th scope="col"><button type="button" class="table__sort-button">Plant${icon('ChevronsUpDown')}</button></th>
            <th scope="col">Light</th>
            <th scope="col" class="table__cell--numeric" aria-sort="ascending"><button type="button" class="table__sort-button">Height (cm)${icon('ChevronDown')}</button></th>
            <th scope="col" class="table__cell--numeric"><button type="button" class="table__sort-button">In stock${icon('ChevronsUpDown')}</button></th>
          </tr>
        </thead>
        <tbody>${plants.map((p) => `
          <tr><th scope="row">${p.name}</th><td>${p.light}</td><td class="table__cell--numeric">${p.height}</td><td class="table__cell--numeric">${p.stock}</td></tr>`).join('')}
        </tbody>
      </table>
    </div>`,
};

export const Columns: Story = {
  name: 'Alignment and columns',
  render: () => `
    <div class="table-container" tabindex="0" role="region" aria-labelledby="cols">
      <table class="table">
        <caption id="cols" class="small-heading">Orders</caption>
        <colgroup>
          <col class="table__col--index">
          <col class="table__col--sm">
          <col class="table__col--fill">
          <col class="table__col--md">
          <col class="table__col--sm">
          <col class="table__col--actions">
        </colgroup>
        <thead>
          <tr>
            <th scope="col" class="table__cell--center">#</th>
            <th scope="col">Order</th>
            <th scope="col">Note</th>
            <th scope="col" class="table__cell--center">Status</th>
            <th scope="col" class="table__cell--numeric">Total</th>
            <th scope="col"><span class="sr-only">Actions</span></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="table__cell--center">1</td>
            <td class="table__cell--nowrap font-mono">ORD-1042</td>
            <td><span class="table__cell--truncate" style="display: block;">Leave by the side gate, behind the water butt, next to the greenhouse</span></td>
            <td class="table__cell--center"><span class="status status--success">${icon('Check')}<span class="status__text">Sent</span></span></td>
            <td class="table__cell--numeric">£48.20</td>
            <td class="table__col--actions"><button type="button" class="button button--subtle button--sm">View<span class="sr-only"> order ORD-1042</span></button></td>
          </tr>
          <tr>
            <td class="table__cell--center">2</td>
            <td class="table__cell--nowrap font-mono">ORD-1043</td>
            <td>Gift wrap</td>
            <td class="table__cell--center"><span class="status">${icon('Progress')}<span class="status__text">Packing</span></span></td>
            <td class="table__cell--numeric">£1,206.00</td>
            <td class="table__col--actions"><button type="button" class="button button--subtle button--sm">View<span class="sr-only"> order ORD-1043</span></button></td>
          </tr>
        </tbody>
      </table>
    </div>`,
};

export const CellContent: Story = {
  name: 'Cell content',
  render: () => `
    <div class="table-container" tabindex="0" role="region" aria-labelledby="content">
      <table class="table">
        <caption id="content" class="small-heading">Team</caption>
        <thead><tr><th scope="col">Person</th><th scope="col">Role</th><th scope="col">Access</th><th scope="col" class="table__col--actions"><span class="sr-only">Actions</span></th></tr></thead>
        <tbody>
          <tr>
            <th scope="row">
              <div class="inline">
                <span class="avatar avatar--sm" aria-hidden="true">MC</span>
                <span class="lockup"><span class="small-heading">Marcus Chen</span><span class="small-text text-muted">mchen@urbanmail.net</span></span>
              </div>
            </th>
            <td><span class="text">Head gardener</span></td>
            <td><span class="status status--accent">${icon('Star')}<span class="status__text">Owner</span></span></td>
            <td class="table__col--actions">
              <div class="button-group">
                <button type="button" class="button button--subtle button--sm">Edit<span class="sr-only"> Marcus Chen</span></button>
                <button type="button" class="button button--subtle button--sm button--danger">Remove<span class="sr-only"> Marcus Chen</span></button>
              </div>
            </td>
          </tr>
          <tr>
            <th scope="row">
              <div class="inline">
                <span class="avatar avatar--sm" aria-hidden="true">AR</span>
                <span class="lockup"><span class="small-heading">Aisha Rahman</span><span class="small-text text-muted">aisha@fernhill.org</span></span>
              </div>
            </th>
            <td><span class="text">Volunteer</span></td>
            <td><span class="status">${icon('User')}<span class="status__text">Member</span></span></td>
            <td class="table__col--actions">
              <div class="button-group">
                <button type="button" class="button button--subtle button--sm">Edit<span class="sr-only"> Aisha Rahman</span></button>
                <button type="button" class="button button--subtle button--sm button--danger">Remove<span class="sr-only"> Aisha Rahman</span></button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>`,
};

export const InACard: Story = {
  name: 'In a card',
  render: () => `
    <article class="card" style="max-inline-size: 40rem;">
      <header class="card__header">
        <h3 class="card__title subheading" id="card-table">Stock</h3>
      </header>
      <div class="card__body card__body--flush">
        <div class="table-container" tabindex="0" role="region" aria-labelledby="card-table">
          <table class="table">
            <thead><tr><th scope="col">Plant</th><th scope="col" class="table__cell--numeric">In stock</th></tr></thead>
            <tbody>${plants.slice(0, 3).map((p) => `<tr><th scope="row">${p.name}</th><td class="table__cell--numeric">${p.stock}</td></tr>`).join('')}</tbody>
          </table>
        </div>
      </div>
      <footer class="card__footer">
        <button type="button" class="button">Export</button>
      </footer>
    </article>`,
};

export const RightToLeft: Story = {
  render: () => `
    <div dir="rtl" lang="ar">
      <div class="table-container" tabindex="0" role="region" aria-labelledby="rtl">
        <table class="table table--bordered">
          <caption id="rtl" class="small-heading">النباتات</caption>
          <thead><tr><th scope="col">النبات</th><th scope="col" class="table__cell--numeric" aria-sort="descending"><button type="button" class="table__sort-button">الارتفاع${icon('ChevronDown')}</button></th></tr></thead>
          <tbody>
            <tr><th scope="row">هوستا</th><td class="table__cell--numeric">60</td></tr>
            <tr><th scope="row">برونيرا</th><td class="table__cell--numeric">45</td></tr>
          </tbody>
        </table>
      </div>
    </div>`,
};
