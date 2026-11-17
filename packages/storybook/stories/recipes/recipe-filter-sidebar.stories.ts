import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Recipes/Filter Sidebar',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
A catalogue page: filters in a side pane, results in a grid, with the active filters as removable chips above them.

**Composes:** header (§33), wrapper and split (§19, §19c), card (§10), accordion (§4), fieldset and choices (§7b), combobox with chips (§28), range and switch (§7), chip and status (§5), grid (§19b), empty state (§27), skeleton (§26).

**Decisions:**
- **The filters are one form** in a compact, ruled card, so its controls step down together (\`--ui-sizing: compact\`). Each facet is a plain accordion holding a fieldset; the summary is the visible label and the legend repeats it for screen readers (\`sr-only\`), so the group has a name.
- **On a wide screen the filters are a side pane;** they come first in the source because they're read first. **Below 48rem they move into a start-side drawer** (\`.dialog--drawer.dialog--start\`), opened by a Filters Button beside the count that says how many are on, so the results come straight after the heading. The drawer's footer shows the results and closes it. The pane and the drawer are two copies of the form, so each has its own ids.
- **The results have a heading** (\`sr-only\`, "Results"), so the Card titles sit under an \`h2\` at every width, with the pane hidden too.
- **Active filters** are a list of removable chips, each remove button naming its value. The result count is a \`role="status"\` line, so a change is announced.
- **Result cards** link from the title, stretched over the card (\`.link--stretched\`), and fill their grid cell (\`h-full\`), so a row's cards line up. The title is a subtle link, so the accent is saved for actions. Stock is a status with text, never colour alone: \`status--plain\` for in stock, and the boxed status for the exception, Pre-order.
- **No results** keeps the filters and the chips, and offers to clear them. **Loading** marks the grid \`aria-busy\` with skeleton cards and says so in the status line.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const icon = (name: string) =>
  `<svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#${name}"/></svg>`;

const chip = (label: string) =>
  `<li><span class="chip chip--subtle"><span class="chip__text">${label}</span><button type="button" class="chip__remove" aria-label="Remove ${label}">${icon('x')}</button></span></li>`;

const choice = (name: string, value: string, label: string, checked = false) =>
  `<label class="choice"><input type="checkbox" class="checkbox-input" name="${name}" value="${value}"${checked ? ' checked' : ''} /><span>${label}</span></label>`;

const facet = (title: string, body: string, open = true) => `
  <details class="accordion accordion--plain"${open ? ' open' : ''}>
    <summary>${title}</summary>
    <fieldset class="fieldset pb-sm">
      <legend class="fieldset__legend sr-only">${title}</legend>
      ${body}
    </fieldset>
  </details>`;

const colours = ['White', 'Blue', 'Pink', 'Purple', 'Yellow'];

type Selected = { light: string[]; colours: string[]; stock?: boolean };

/* The facets, with ids prefixed for each copy of the form (p) */
const facets = (selected: Selected, p: string) => `
      <div class="accordion-group">
        ${facet(
  'Light',
  `<div class="choices">
            ${choice('light', 'sun', 'Full sun', selected.light.includes('sun'))}
            ${choice('light', 'part', 'Part shade', selected.light.includes('part'))}
            ${choice('light', 'shade', 'Full shade', selected.light.includes('shade'))}
          </div>`,
)}
        ${facet(
  'Flower colour',
  `<div class="combobox">
            <div class="combobox__control">
              <span class="combobox__tags">
                ${selected.colours.map((c) => `<span class="chip chip--subtle"><span class="chip__text">${c}</span><button type="button" class="chip__remove" aria-label="Remove ${c}">${icon('x')}</button></span>`).join('')}
              </span>
              <input class="combobox__input" role="combobox" aria-label="Flower colour" aria-expanded="false"
                aria-controls="${p}colour-list" aria-autocomplete="list" autocomplete="off" placeholder="Add a colour" />
            </div>
            <ul id="${p}colour-list" class="combobox__listbox" role="listbox" popover="manual" aria-label="Colours" aria-multiselectable="true">
              ${colours.map((c, i) => `<li id="${p}colour-${i}" class="combobox__option" role="option" aria-selected="${selected.colours.includes(c)}"><span>${c}</span>${icon('check').replace('class="icon"', 'class="icon combobox__check"')}</li>`).join('')}
            </ul>
          </div>`,
)}
        ${facet(
  'Height',
  `<div class="field">
            <div class="field__header">
              <label for="${p}height" class="field__label label">Up to</label>
              <output for="${p}height" class="small-text">60 cm</output>
            </div>
            <input id="${p}height" name="height" type="range" class="range" min="10" max="150" step="10" value="60" style="--value: 36%;" />
          </div>`,
  false,
)}
        ${facet(
  'Availability',
  `<div class="stack gap-xs">
            <div class="switch"><label for="${p}filter-stock" class="switch__label label">In stock only</label><span class="switch__control"><input type="checkbox" role="switch" id="${p}filter-stock" name="stock"${selected.stock ? ' checked' : ''} /><span class="switch__option switch__option--off" aria-hidden="true">Off</span><span class="switch__option switch__option--on" aria-hidden="true">On</span></span></div>
            <div class="switch"><label for="${p}filter-native" class="switch__label label">Native species</label><span class="switch__control"><input type="checkbox" role="switch" id="${p}filter-native" name="native" /><span class="switch__option switch__option--off" aria-hidden="true">Off</span><span class="switch__option switch__option--on" aria-hidden="true">On</span></span></div>
          </div>`,
  false,
)}
      </div>`;

/* The side pane on a wide screen */
const filters = (selected: Selected) => `
  <form class="card card--compact card--ruled" aria-labelledby="filters-title">
    <header class="card__header">
      <h2 id="filters-title" class="card__title subheading">Filters</h2>
      <button type="reset" class="button button--subtle button--sm">Clear</button>
    </header>
    <div class="card__body card__body--flush">${facets(selected, '')}</div>
  </form>`;

/* The same form in a drawer on a narrow screen */
const drawer = (selected: Selected, count: string) => `
  <dialog id="filter-drawer" class="dialog dialog--drawer dialog--start" aria-labelledby="filter-drawer-title">
    <form class="card card--compact card--ruled" method="dialog">
      <header class="card__header">
        <h2 id="filter-drawer-title" class="card__title subheading">Filters</h2>
        <button type="button" class="button button--subtle button--icon" commandfor="filter-drawer" command="close">${icon('x')}<span class="sr-only">Close filters</span></button>
      </header>
      <div class="card__body card__body--flush card__body--scrollable">${facets(selected, 'drawer-')}</div>
      <footer class="card__footer inline inline--between">
        <button type="reset" class="button button--plain">Clear</button>
        <button type="submit" class="button button--strong button--accent">Show ${count}</button>
      </footer>
    </form>
  </dialog>`;

const plants = [
  ['Epimedium', 'Heart-shaped leaves and spurred spring flowers. Copes with dry shade.', '£9.50', true],
  ['Brunnera', 'Forget-me-not blue flowers over silver-veined leaves.', '£8.75', true],
  ['Pulmonaria', 'Spotted leaves and early flowers that open pink and turn blue.', '£7.25', false],
  ['Tiarella', 'Foamy white spikes in late spring; spreads by runners.', '£6.95', true],
  ['Geranium macrorrhizum', 'Scented, evergreen ground cover with pink flowers.', '£5.50', true],
  ['Polystichum', 'An evergreen shield fern for the back of a shady border.', '£12.00', false],
] as const;

const plantCard = ([name, desc, price, inStock]: (typeof plants)[number]) => `
  <li>
    <article class="card h-full">
      <header class="card__header">
        <h3 class="card__title subheading"><a href="#" class="link link--subtle link--plain link--stretched">${name}</a></h3>
      </header>
      <div class="card__body"><p class="small-text">${desc}</p></div>
      <footer class="card__footer inline inline--between">
        <span class="small-text font-bold">${price}</span>
        ${inStock ? '<span class="status status--plain status--success">' + icon('check') + '<span class="status__text">In stock</span></span>' : '<span class="status"><span class="status__text">Pre-order</span></span>'}
      </footer>
    </article>
  </li>`;

const skeletonCard = (w: string) => `
  <li>
    <article class="card h-full">
      <header class="card__header"><div class="small-heading"><span class="skeleton skeleton--heading ${w}" aria-hidden="true"></span></div></header>
      <div class="card__body">
        <p class="small-text"><span class="skeleton skeleton--text" aria-hidden="true"></span><span class="skeleton skeleton--text skeleton--w-75" aria-hidden="true"></span></p>
      </div>
      <footer class="card__footer inline inline--between">
        <span class="skeleton skeleton--status" aria-hidden="true"></span>
        <span class="skeleton skeleton--status" aria-hidden="true"></span>
      </footer>
    </article>
  </li>`;

const toolbar = (active: string[], count: string) => `
  <div class="inline inline--between">
    <div class="inline gap-sm">
      <button type="button" class="button button--sm md:hide" commandfor="filter-drawer" command="show-modal">${icon('Filter')}<span>Filters</span>${active.length ? `<span class="badge"><span class="badge__text">${active.length}</span></span><span class="sr-only">on</span>` : ''}</button>
      <p class="small-text text-muted" role="status">${count}</p>
    </div>
    <div class="field field--inline">
      <label for="sort" class="field__label label">Sort</label>
      <select id="sort" class="select select--sm">
        <option>Name</option>
        <option>Height</option>
        <option>Price</option>
      </select>
    </div>
  </div>
  ${active.length ? `<ul class="cluster gap-xs" aria-label="Active filters">${active.map(chip).join('')}</ul>` : ''}`;

const page = (side: string, results: string, drawerHtml: string) => `
  <a href="#main" class="skip-link">Skip to results</a>
  <header class="header">
    <div class="header__bar max-md:hide-labels">
      <a href="#" class="brand"><span class="brand__name">Woodland Plants</span></a>
      <a href="#" class="button button--plain">${icon('shopping-cart')}<span>Basket</span><span class="sr-only">, 2 items</span><span class="badge badge--top-end" aria-hidden="true"><span class="badge__text">2</span></span></a>
    </div>
  </header>
  <main id="main" class="wrapper py-lg stack">
    <h1 class="heading">Shade plants</h1>
    <div class="split split--sm">
      <div class="max-md:hide">${side}</div>
      <div class="stack">
        <h2 class="sr-only">Results</h2>
        ${results}
      </div>
    </div>
  </main>
  ${drawerHtml}`;

const defaults: Selected = { light: ['part', 'shade'], colours: ['Blue', 'White'] };

export const Default: Story = {
  render: () =>
    page(
      filters(defaults),
      `${toolbar(['Part shade', 'Full shade', 'Blue', 'White'], '6 plants')}
      <ul class="grid grid--xs" role="list">${plants.map(plantCard).join('')}</ul>`,
      drawer(defaults, '6 plants'),
    ),
};

export const NoResults: Story = {
  parameters: { docs: { description: { story: 'Nothing matches: the filters and chips stay, and the empty state offers to clear them.' } } },
  render: () =>
    page(
      filters({ light: ['sun'], colours: ['Yellow'], stock: true }),
      `${toolbar(['Full sun', 'Yellow', 'In stock'], 'No plants')}
      <div class="card">
        <div class="card__body">
          <div class="empty-state">
            <div class="empty-state__visual"><span class="icon-box" aria-hidden="true">${icon('search')}</span></div>
            <div class="empty-state__content">
              <h2 class="empty-state__title subheading">No plants match these filters</h2>
              <p class="empty-state__description small-text">Few yellow-flowered shade plants like full sun. Remove a filter, or clear them all.</p>
            </div>
            <div class="empty-state__actions">
              <button type="button" class="button button--strong button--accent">Clear filters</button>
            </div>
          </div>
        </div>
      </div>`,
      drawer({ light: ['sun'], colours: ['Yellow'], stock: true }, 'no plants'),
    ),
};

export const Loading: Story = {
  parameters: { docs: { description: { story: 'Results loading: skeleton cards in an `aria-busy` grid; the status line says so.' } } },
  render: () =>
    page(
      filters(defaults),
      `${toolbar(['Part shade', 'Full shade', 'Blue', 'White'], 'Loading plants…')}
      <ul class="grid grid--xs" role="list" aria-busy="true">${['skeleton--w-50', 'skeleton--w-75', 'skeleton--w-50', 'skeleton--w-90', 'skeleton--w-75', 'skeleton--w-50'].map(skeletonCard).join('')}</ul>`,
      drawer(defaults, 'plants'),
    ),
};

export const FiltersDrawer: Story = {
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
    docs: { description: { story: 'Below 48rem the Filters Button opens the same form in a start-side drawer. Its footer clears the filters or shows the results.' } },
  },
  render: Default.render,
  play: async ({ canvasElement }) => {
    canvasElement.querySelector<HTMLDialogElement>('#filter-drawer')?.showModal();
  },
};
