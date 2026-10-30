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
- **The split wraps on its own.** Filters come first in the source because they're read first; on a narrow screen they sit above the results.
- **Active filters** are a list of removable chips, each remove button naming its value. The result count is a \`role="status"\` line, so a change is announced.
- **Result cards** link from the title, stretched over the card (\`.link--stretched\`). Stock is a status with text, never colour alone.
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
  `<li><span class="chip chip--subtle"><span class="chip__text">${label}</span><button type="button" class="chip__remove" aria-label="Remove ${label}">${icon('Close')}</button></span></li>`;

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

const filters = (selected: { light: string[]; colours: string[] }) => `
  <form class="card card--compact card--ruled" aria-labelledby="filters-title">
    <header class="card__header">
      <h2 id="filters-title" class="card__title small-heading">Filters</h2>
      <button type="reset" class="button button--plain button--sm">Clear</button>
    </header>
    <div class="card__body card__body--flush">
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
                ${selected.colours.map((c) => `<span class="chip chip--subtle"><span class="chip__text">${c}</span><button type="button" class="chip__remove" aria-label="Remove ${c}">${icon('Close')}</button></span>`).join('')}
              </span>
              <input class="combobox__input" role="combobox" aria-label="Flower colour" aria-expanded="false"
                aria-controls="colour-list" aria-autocomplete="list" autocomplete="off" placeholder="Add a colour" />
            </div>
            <ul id="colour-list" class="combobox__listbox" role="listbox" popover="manual" aria-label="Colours" aria-multiselectable="true">
              ${colours.map((c, i) => `<li id="colour-${i}" class="combobox__option" role="option" aria-selected="${selected.colours.includes(c)}"><span>${c}</span>${icon('Check').replace('class="icon"', 'class="icon combobox__check"')}</li>`).join('')}
            </ul>
          </div>`,
        )}
        ${facet(
          'Height',
          `<div class="field">
            <div class="field__header">
              <label for="height" class="field__label label">Up to</label>
              <output for="height" class="small-text">60 cm</output>
            </div>
            <input id="height" name="height" type="range" class="range" min="10" max="150" step="10" value="60" style="--value: 36%;" />
          </div>`,
          false,
        )}
        ${facet(
          'Availability',
          `<div class="stack gap-xs">
            <label class="switch"><span class="switch__label label">In stock only</span><input type="checkbox" role="switch" class="sr-only" name="stock" checked /><span class="switch__control" aria-hidden="true"><span class="switch__option switch__option--off">Off</span><span class="switch__option switch__option--on">On</span></span></label>
            <label class="switch"><span class="switch__label label">Native species</span><input type="checkbox" role="switch" class="sr-only" name="native" /><span class="switch__control" aria-hidden="true"><span class="switch__option switch__option--off">Off</span><span class="switch__option switch__option--on">On</span></span></label>
          </div>`,
          false,
        )}
      </div>
    </div>
  </form>`;

const plants = [
  ['Epimedium', 'Heart-shaped leaves and spurred spring flowers. Copes with dry shade.', true],
  ['Brunnera', 'Forget-me-not blue flowers over silver-veined leaves.', true],
  ['Pulmonaria', 'Spotted leaves and early flowers that open pink and turn blue.', false],
  ['Tiarella', 'Foamy white spikes in late spring; spreads by runners.', true],
  ['Geranium macrorrhizum', 'Scented, evergreen ground cover with pink flowers.', true],
  ['Polystichum', 'An evergreen shield fern for the back of a shady border.', false],
] as const;

const plantCard = ([name, desc, inStock]: (typeof plants)[number]) => `
  <li>
    <article class="card">
      <header class="card__header">
        <h3 class="card__title small-heading"><a href="#" class="link link--plain link--stretched">${name}</a></h3>
      </header>
      <div class="card__body"><p class="small-text">${desc}</p></div>
      <footer class="card__footer inline inline--between">
        <span class="small-text font-bold">£8.50</span>
        ${inStock ? '<span class="status status--success">' + icon('Check') + '<span class="status__text">In stock</span></span>' : '<span class="status"><span class="status__text">Pre-order</span></span>'}
      </footer>
    </article>
  </li>`;

const skeletonCard = (w: string) => `
  <li>
    <div class="card">
      <header class="card__header"><div class="small-heading"><span class="skeleton skeleton--heading ${w}" aria-hidden="true"></span></div></header>
      <div class="card__body">
        <p class="small-text"><span class="skeleton skeleton--text" aria-hidden="true"></span><span class="skeleton skeleton--text skeleton--w-75" aria-hidden="true"></span></p>
      </div>
      <footer class="card__footer inline inline--between">
        <span class="skeleton skeleton--badge" aria-hidden="true"></span>
        <span class="skeleton skeleton--badge" aria-hidden="true"></span>
      </footer>
    </div>
  </li>`;

const toolbar = (active: string[], count: string) => `
  <div class="inline inline--between">
    <p class="small-text text-muted" role="status">${count}</p>
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

const page = (side: string, results: string) => `
  <a href="#main" class="skip-link">Skip to results</a>
  <header class="header">
    <div class="header__bar">
      <a href="#" class="link link--plain small-heading">Woodland Plants</a>
    </div>
  </header>
  <main id="main" class="wrapper py-lg stack">
    <h1 class="heading">Shade plants</h1>
    <div class="split split--sm">
      <div>${side}</div>
      <div class="stack">${results}</div>
    </div>
  </main>`;

const defaults = { light: ['part', 'shade'], colours: ['Blue', 'White'] };

export const Default: Story = {
  render: () =>
    page(
      filters(defaults),
      `${toolbar(['Part shade', 'Full shade', 'Blue', 'White', 'In stock'], '6 plants')}
      <ul class="grid grid--xs" role="list">${plants.map(plantCard).join('')}</ul>`,
    ),
};

export const NoResults: Story = {
  parameters: { docs: { description: { story: 'Nothing matches: the filters and chips stay, and the empty state offers to clear them.' } } },
  render: () =>
    page(
      filters({ light: ['sun'], colours: ['Yellow'] }),
      `${toolbar(['Full sun', 'Yellow', 'In stock'], 'No plants')}
      <div class="card">
        <div class="card__body">
          <div class="empty-state">
            <div class="empty-state__visual"><span class="icon-box" aria-hidden="true">${icon('Search')}</span></div>
            <div class="empty-state__content">
              <h2 class="empty-state__title small-heading">No plants match these filters</h2>
              <p class="empty-state__description small-text">Few yellow-flowered shade plants like full sun. Remove a filter, or clear them all.</p>
            </div>
            <div class="empty-state__actions">
              <button type="button" class="button button--strong button--accent">Clear filters</button>
            </div>
          </div>
        </div>
      </div>`,
    ),
};

export const Loading: Story = {
  parameters: { docs: { description: { story: 'Results loading: skeleton cards in an `aria-busy` grid; the status line says so.' } } },
  render: () =>
    page(
      filters(defaults),
      `${toolbar(['Part shade', 'Full shade', 'Blue', 'White', 'In stock'], 'Loading plants…')}
      <ul class="grid grid--xs" role="list" aria-busy="true">${['skeleton--w-50', 'skeleton--w-75', 'skeleton--w-50', 'skeleton--w-90', 'skeleton--w-75', 'skeleton--w-50'].map(skeletonCard).join('')}</ul>`,
    ),
};
