import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Recipes/Tally & Sprout Dashboard',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
An admin dashboard for a community garden: plot occupancy at a glance, a registry of plots with selection and batch actions, a three-step lease form in a dialog, the shared tool locker in a drawer, and a toast after an action. Each story is one state of the page.

**Composes:** app shell (§19d), header (§33), banner dock (§21), card (§10), grid (§19b), status and chip (§5), avatar and lockup (§6, §6b), progress (§25), table (§13), telemetry (§30), button group (§14), batch actions (§18b), empty state (§27), skeleton (§26), dialog and drawer (§2), stepper (§30), field, fieldset and choices (§7b), switch and range (§7), banner (§11), toast (§18).

**Decisions:**
- **The registry is one card.** Its header holds the title and the view switch; a band holds the search and filters; the flush body holds the table, the card grid or the empty state. The result count is a \`role="status"\` line.
- **The view switch** is a joined button group of native radios (§14 C): arrow keys work with no script.
- **Selection** is a checkbox per row, named after the plot. While rows are selected, docked batch actions appear at the foot of the card, their summary a status.
- **Row details** open under the row: a button with \`aria-expanded\` and \`aria-controls\` toggles a hidden row holding a telemetry list.
- **Fee status** is a status with an icon and text, never colour alone.
- **The lease form** is a dialog whose card is the form. A stepper shows the steps; Back and Continue are the product's script, Register submits. Errors put \`aria-invalid\` and a message on each field, and a danger banner at the top links to them.
- **The tool locker** is an end-side drawer of the same card parts, since it's details, not navigation.
- **The toast stack** is a polite live region, opened once with \`showPopover()\`.
- **Loading** keeps the column names and puts skeletons in the body cells only.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const icon = (name: string, cls = 'icon') =>
  `<svg class="${cls}" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#${name}"/></svg>`;

/* --------------------------------------------------------------------------
   Data
   -------------------------------------------------------------------------- */
type Fee = 'Paid' | 'Due' | 'Overdue' | 'Exempt';

interface Plot {
  id: string;
  type: string;
  light: string;
  name: string;
  email: string;
  initials: string;
  fee: Fee;
  ends: string;
  ph: string;
  organic: string;
  crops: string;
  zone: string;
}

const PLOTS: Plot[] = [
  { id: 'A-01', type: 'Raised bed', light: 'Full sun', name: 'Elena Rostova', email: 'elena@example.org', initials: 'ER', fee: 'Paid', ends: '30 Nov 2026', ph: '6.8', organic: '7.4%', crops: 'Tomatoes, basil, marigolds', zone: 'Zone A drip line' },
  { id: 'A-02', type: 'Raised bed', light: 'Full sun', name: 'Marcus Chen', email: 'marcus@example.org', initials: 'MC', fee: 'Paid', ends: '30 Nov 2026', ph: '6.5', organic: '6.9%', crops: 'Peas, chard, kale', zone: 'Zone A drip line' },
  { id: 'B-04', type: 'In ground', light: 'Part shade', name: 'Amina Al-Mansoor', email: 'amina@example.org', initials: 'AA', fee: 'Due', ends: '15 May 2026', ph: '7.1', organic: '8.2%', crops: 'Wild garlic, spinach, radish', zone: 'Zone B sprinkler' },
  { id: 'B-07', type: 'In ground', light: 'Full sun', name: 'Jordan Rivera', email: 'jordan@example.org', initials: 'JR', fee: 'Overdue', ends: '1 Apr 2026', ph: '6.6', organic: '6.1%', crops: 'Beans, carrots, coriander', zone: 'Zone B drip line' },
  { id: 'C-03', type: 'Accessible', light: 'Full sun', name: 'Ruth Vanderberg', email: 'ruth@example.org', initials: 'RV', fee: 'Exempt', ends: '30 Nov 2026', ph: '6.7', organic: '9.0%', crops: 'Strawberries, cucumbers, thyme', zone: 'Zone C wicking bed' },
  { id: 'C-08', type: 'Accessible', light: 'Part shade', name: 'Derrick Thorne', email: 'derrick@example.org', initials: 'DT', fee: 'Paid', ends: '30 Nov 2026', ph: '6.9', organic: '7.8%', crops: 'Peas, peppers, lavender', zone: 'Zone C wicking bed' },
];

const feeStatus = (fee: Fee) =>
  ({
    Paid: `<span class="status status--success">${icon('Check')}<span class="status__text">Paid</span></span>`,
    Due: `<span class="status status--warning">${icon('Warning')}<span class="status__text">Due</span></span>`,
    Overdue: `<span class="status status--danger">${icon('Error')}<span class="status__text">Overdue</span></span>`,
    Exempt: `<span class="status"><span class="status__text">Exempt</span></span>`,
  })[fee];

/* --------------------------------------------------------------------------
   Page frame
   -------------------------------------------------------------------------- */
const header = `
  <header class="header header--sticky">
    <div class="header__bar">
      <div class="cluster">
        <a href="#" class="link link--plain lockup">
          <span class="small-heading">Tally &amp; Sprout</span>
          <span class="small-text text-muted">Plot registry</span>
        </a>
        <div class="max-sm:hide">
          <label for="site" class="sr-only">Garden</label>
          <select id="site" class="select select--sm select--subtle">
            <option selected>Oakridge Commons</option>
            <option>Riverside Meadows</option>
          </select>
        </div>
      </div>
      <div class="cluster gap-xs max-md:hide-labels">
        <button type="button" class="button button--subtle" commandfor="tool-locker" command="show-modal" aria-haspopup="dialog">
          ${icon('Settings')}<span>Tool locker</span><span class="sr-only">, 2 overdue</span>
          <span class="badge badge--danger badge--top-end" aria-hidden="true"><span class="badge__text">2</span></span>
        </button>
        <button type="button" class="button button--strong button--accent" commandfor="lease-dialog" command="show-modal" aria-haspopup="dialog">
          ${icon('Plus')}<span>New lease</span>
        </button>
      </div>
    </div>
  </header>`;

const frostNotice = `
  <aside class="banner-dock" aria-label="Frost warning">
    <div class="wrapper">
      <div class="banner banner--warning">
        <span class="icon-box" aria-hidden="true">${icon('Warning')}</span>
        <div class="banner__body">
          <p class="text"><span class="font-bold">Late frost:</span> −2°C forecast between 02:00 and 06:00 on Wednesday. Cover seedlings in ground beds with fleece.</p>
        </div>
        <button type="button" class="button button--icon banner__action">${icon('Close')}<span class="sr-only">Dismiss notice</span></button>
      </div>
    </div>
  </aside>`;

const metric = (title: string, status: string, value: string, note: string, extra = '') => `
  <article class="card card--compact">
    <header class="card__header">
      <h3 class="card__title small-heading">${title}</h3>
      ${status}
    </header>
    <div class="card__body stack gap-xs">
      <p class="heading font-mono">${value}</p>
      <p class="small-text text-muted">${note}</p>
      ${extra}
    </div>
  </article>`;

const metrics = `
  <section aria-labelledby="metrics-title" class="stack">
    <h2 id="metrics-title" class="sr-only">This season</h2>
    <div class="grid grid--xs">
      ${metric('Occupancy', `<span class="status status--success"><span class="status__text">88% let</span></span>`, '42 / 48', '6 plots resting this season')}
      ${metric('Renewals', `<span class="status status--warning">${icon('Warning')}<span class="status__text">To check</span></span>`, '7', 'Requests waiting for a residency check')}
      ${metric('Tool locker', `<span class="status status--danger">${icon('Error')}<span class="status__text">2 overdue</span></span>`, '5 out', '12 of 17 tools in the shed')}
      ${metric('Rainwater', '', '7,850 L', '78% of 10,000 L, about 18 days', '<progress class="progress" value="78" max="100" aria-label="Rainwater tank"></progress>')}
    </div>
  </section>`;

/* --------------------------------------------------------------------------
   Registry
   -------------------------------------------------------------------------- */
const viewSwitch = (view: 'table' | 'cards') => `
  <div class="button-group button-group--joined buttons-sm max-sm:hide-labels" role="radiogroup" aria-label="View">
    <label class="button">${icon('List')}<input type="radio" name="view" value="table" class="sr-only"${view === 'table' ? ' checked' : ''} /><span>Table</span></label>
    <label class="button">${icon('Grid')}<input type="radio" name="view" value="cards" class="sr-only"${view === 'cards' ? ' checked' : ''} /><span>Cards</span></label>
  </div>`;

const toolbar = (query: string, count: string) => `
  <div class="card__band">
    <div class="cluster">
      <div>
        <label for="plot-search" class="sr-only">Search plots</label>
        <input id="plot-search" type="search" class="input input--sm" placeholder="Plot or name" value="${query}" />
      </div>
      <div>
        <label for="filter-type" class="sr-only">Plot type</label>
        <select id="filter-type" class="select select--sm"><option>All types</option><option>Raised bed</option><option>In ground</option><option>Accessible</option></select>
      </div>
      <div>
        <label for="filter-fee" class="sr-only">Fee</label>
        <select id="filter-fee" class="select select--sm"><option>All fees</option><option>Paid</option><option>Due</option><option>Overdue</option><option>Exempt</option></select>
      </div>
      <p class="small-text text-muted" role="status">${count}</p>
    </div>
  </div>`;

const row = (p: Plot, selected: string[], expanded: string[]) => {
  const open = expanded.includes(p.id);
  return `
  <tr>
    <td class="table__col--index"><label class="choice"><input type="checkbox" class="checkbox-input" aria-label="Select plot ${p.id}"${selected.includes(p.id) ? ' checked' : ''} /></label></td>
    <th scope="row" class="font-mono">${p.id}</th>
    <td>${p.type}</td>
    <td>
      <div class="inline">
        <span class="avatar avatar--sm" aria-hidden="true">${p.initials}</span>
        <span class="lockup"><span class="small-heading">${p.name}</span><span class="small-text text-muted">${p.email}</span></span>
      </div>
    </td>
    <td>${p.light}</td>
    <td class="table__cell--nowrap">${feeStatus(p.fee)}</td>
    <td class="table__cell--nowrap">${p.ends}</td>
    <td class="table__col--actions">
      <button type="button" class="button button--plain button--icon button--sm" aria-expanded="${open}" aria-controls="plot-${p.id}-details">
        ${icon(open ? 'ChevronUp' : 'ChevronDown')}<span class="sr-only">Soil details for plot ${p.id}</span>
      </button>
    </td>
  </tr>
  <tr id="plot-${p.id}-details"${open ? '' : ' hidden'}>
    <td colspan="8">
      <div class="stack gap-xs">
        <dl class="telemetry-group" aria-label="Soil, plot ${p.id}">
          <div class="telemetry"><dt class="small-text text-muted">Soil pH</dt><dd class="small-heading font-mono">${p.ph}</dd></div>
          <div class="telemetry"><dt class="small-text text-muted">Organic matter</dt><dd class="small-heading font-mono">${p.organic}</dd></div>
          <div class="telemetry"><dt class="small-text text-muted">Watering</dt><dd class="small-heading">${p.zone}</dd></div>
        </dl>
        <p class="small-text"><span class="font-bold">Growing:</span> ${p.crops}</p>
      </div>
    </td>
  </tr>`;
};

const tableHead = `
  <thead>
    <tr>
      <th scope="col" class="table__col--index"><label class="choice"><input type="checkbox" class="checkbox-input" aria-label="Select all plots" /></label></th>
      <th scope="col">Plot</th>
      <th scope="col">Type</th>
      <th scope="col">Plot holder</th>
      <th scope="col">Light</th>
      <th scope="col">Fee</th>
      <th scope="col">Lease ends</th>
      <th scope="col" class="table__col--actions"><span class="sr-only">Actions</span></th>
    </tr>
  </thead>`;

const table = (body: string, busy = false) => `
  <div class="table-container" tabindex="0" role="region" aria-label="Plot table"${busy ? ' aria-busy="true"' : ''}>
    <table class="table table--striped table--hover table--sticky-head">
      ${tableHead}
      <tbody>${body}</tbody>
    </table>
  </div>`;

const plotCard = (p: Plot) => `
  <li>
    <article class="card card--compact">
      <header class="card__header">
        <h3 class="card__title small-heading"><a href="#" class="link link--plain link--stretched">Plot ${p.id}</a></h3>
        ${feeStatus(p.fee)}
      </header>
      <div class="card__body stack gap-xs">
        <div class="inline">
          <span class="avatar avatar--sm" aria-hidden="true">${p.initials}</span>
          <span class="lockup"><span class="small-heading">${p.name}</span><span class="small-text text-muted">${p.type}, ${p.light.toLowerCase()}</span></span>
        </div>
        <p class="small-text text-muted">Lease ends ${p.ends}</p>
      </div>
    </article>
  </li>`;

const batchActions = (n: number) => `
  <div class="batch-actions batch-actions--docked" role="group" aria-label="Selected plots">
    <p class="batch-actions__summary small-heading">${n} plots selected</p>
    <div class="batch-actions__actions button-group buttons-subtle max-sm:hide-labels">
      <button type="button" class="button">${icon('Email')}<span>Email notice</span></button>
      <button type="button" class="button">${icon('Download')}<span>Export</span></button>
    </div>
    <button type="button" class="button button--plain button--icon batch-actions__dismiss">${icon('Close')}<span class="sr-only">Clear selection</span></button>
  </div>`;

const emptyResults = (query: string) => `
  <div class="empty-state p-lg">
    <div class="empty-state__visual"><span class="icon-box" aria-hidden="true">${icon('Search')}</span></div>
    <div class="empty-state__content">
      <h3 class="empty-state__title small-heading">No plots match “${query}”</h3>
      <p class="empty-state__description small-text">Check the plot number or name, or clear the search and filters.</p>
    </div>
    <div class="empty-state__actions"><button type="button" class="button">Clear search</button></div>
  </div>`;

const skeletonRows = () =>
  Array.from(
    { length: 5 },
    () => `
  <tr aria-hidden="true">
    <td class="table__col--index"><span class="skeleton skeleton--text"></span></td>
    <td><span class="skeleton skeleton--text"></span></td>
    <td><span class="skeleton skeleton--text skeleton--w-75"></span></td>
    <td><div class="inline"><span class="skeleton skeleton--avatar"></span><span class="skeleton skeleton--text"></span></div></td>
    <td><span class="skeleton skeleton--text skeleton--w-75"></span></td>
    <td><span class="skeleton skeleton--status"></span></td>
    <td><span class="skeleton skeleton--text"></span></td>
    <td></td>
  </tr>`,
  ).join('');

interface RegistryOpts {
  view?: 'table' | 'cards';
  selected?: string[];
  expanded?: string[];
  query?: string;
  loading?: boolean;
}

const registry = ({ view = 'table', selected = [], expanded = [], query = '', loading = false }: RegistryOpts = {}) => {
  const empty = !!query;
  const count = loading ? 'Loading plots…' : empty ? 'No plots' : `${PLOTS.length} plots`;
  const body = loading
    ? table(skeletonRows(), true)
    : empty
      ? emptyResults(query)
      : view === 'table'
        ? table(PLOTS.map((p) => row(p, selected, expanded)).join(''))
        : `<ul class="grid grid--xs p-md" role="list">${PLOTS.map(plotCard).join('')}</ul>`;
  return `
  <section class="card" aria-labelledby="registry-title">
    <header class="card__header">
      <hgroup class="card__hgroup">
        <h2 id="registry-title" class="card__title subheading">Plots</h2>
        <p class="card__subtitle small-text text-muted">Leases, fees and soil records</p>
      </hgroup>
      ${viewSwitch(view)}
    </header>
    ${toolbar(query, count)}
    <div class="card__body card__body--flush">${body}</div>
    ${selected.length ? batchActions(selected.length) : ''}
  </section>`;
};

/* --------------------------------------------------------------------------
   Lease dialog
   -------------------------------------------------------------------------- */
const stepItem = (n: number, title: string, desc: string, state: 'done' | 'current' | 'todo' | 'invalid') => {
  const cls = state === 'done' ? ' is-complete' : state === 'invalid' ? ' is-invalid' : '';
  const ind =
    state === 'done' ? icon('Check') : state === 'invalid' ? icon('Warning') : `${n}`;
  const prefix = state === 'done' ? 'Completed: ' : state === 'current' ? 'Current: ' : state === 'invalid' ? 'Needs attention: ' : '';
  return `
  <li class="stepper__item${cls}"${state === 'current' || state === 'invalid' ? ' aria-current="step"' : ''}>
    <div class="stepper__step">
      <span class="stepper__indicator${state === 'todo' || state === 'current' ? ' micro-heading' : ''}" aria-hidden="true">${ind}</span>
      <span class="stepper__title small-heading">${prefix ? `<span class="sr-only">${prefix}</span>` : ''}${title}</span>
      <span class="stepper__description small-text">${desc}</span>
    </div>
  </li>`;
};

const stepper = (step: number, invalid = false) => {
  const s = (n: number) => (n < step ? 'done' : n === step ? (invalid ? 'invalid' : 'current') : 'todo');
  return `
  <ol class="stepper stepper--compact" aria-label="Lease steps">
    ${stepItem(1, 'Plot holder', 'Plot and contact', s(1))}
    ${stepItem(2, 'Agreement', 'Growing rules', s(2))}
    ${stepItem(3, 'Fee', 'Sliding scale', s(3))}
  </ol>`;
};

const errorSummary = `
  <div class="banner banner--danger" tabindex="-1" aria-labelledby="lease-errors-title">
    <span class="icon-box" aria-hidden="true">${icon('Error')}</span>
    <div class="banner__body">
      <p id="lease-errors-title" class="text font-bold">Two answers need fixing</p>
      <ul class="small-text list">
        <li><a href="#lease-plot" class="link">Choose a plot</a></li>
        <li><a href="#lease-email" class="link">Enter an email address, like name@example.org</a></li>
      </ul>
    </div>
  </div>`;

const fieldError = (id: string, text: string) =>
  `<p id="${id}" class="field__error small-text">${icon('Warning')}${text}</p>`;

const step1 = (errors: boolean) => `
  ${errors ? errorSummary : ''}
  <div class="field">
    <label for="lease-plot" class="field__label label">Plot</label>
    <p id="lease-plot-hint" class="field__hint small-text">Only plots free this season are listed.</p>
    ${errors ? fieldError('lease-plot-error', 'Choose a plot') : ''}
    <select id="lease-plot" class="select" aria-describedby="lease-plot-hint${errors ? ' lease-plot-error' : ''}"${errors ? ' aria-invalid="true"' : ''} autofocus>
      <option value="">Choose a plot</option>
      <option>A-03, raised bed, full sun</option>
      <option>B-02, in ground, part shade</option>
      <option>C-05, accessible, full sun</option>
    </select>
  </div>
  <div class="field">
    <label for="lease-name" class="field__label label">Full name</label>
    <input id="lease-name" class="input" autocomplete="name" value="${errors ? 'Samantha Cruz' : ''}" />
  </div>
  <div class="field">
    <label for="lease-email" class="field__label label">Email</label>
    ${errors ? fieldError('lease-email-error', 'Enter an email address, like name@example.org') : ''}
    <input id="lease-email" type="email" class="input" autocomplete="email" value="${errors ? 'samantha.cruz' : ''}"${errors ? ' aria-invalid="true" aria-describedby="lease-email-error"' : ''} />
  </div>
  <label class="choice">
    <input type="checkbox" class="checkbox-input" name="resident" />
    <span class="choice__label">Lives in Ward 4<span class="small-text text-muted">Residents pay the subsidised rate</span></span>
  </label>`;

const toggle = (label: string, desc: string, checked = true, id = `lease-${label.toLowerCase().replace(/\W+/g, '-')}`) => `
  <div class="switch">
    <div class="switch__label">
      <label for="${id}" class="label">${label}</label>
      <p id="${id}-hint" class="small-text text-muted">${desc}</p>
    </div>
    <span class="switch__control"><input type="checkbox" role="switch" id="${id}" aria-describedby="${id}-hint"${checked ? ' checked' : ''} /><span class="switch__option switch__option--off" aria-hidden="true">Off</span><span class="switch__option switch__option--on" aria-hidden="true">On</span></span>
  </div>`;

const step2 = `
  ${toggle('Organic growing', 'No synthetic pesticides or fertilisers')}
  ${toggle('Compost rota', 'Two hours a month, in return for free compost')}
  <div class="field">
    <div class="field__header">
      <label for="lease-water" class="field__label label">Water allowance</label>
      <output for="lease-water" class="small-text">350 litres a month</output>
    </div>
    <p id="lease-water-hint" class="field__hint small-text">350 litres covers a 10 m² plot in a dry summer.</p>
    <input id="lease-water" type="range" class="range" min="150" max="600" step="25" value="350" style="--value: 44%;" aria-describedby="lease-water-hint" />
  </div>`;

const tier = (value: string, label: string, desc: string, checked = false) => `
  <label class="choice">
    <input type="radio" class="radio-input" name="tier" value="${value}"${checked ? ' checked' : ''} />
    <span class="choice__label">${label}<span class="small-text text-muted">${desc}</span></span>
  </label>`;

const step3 = `
  <fieldset class="fieldset">
    <legend class="fieldset__legend label">Yearly fee</legend>
    <div class="choices">
      ${tier('35', '£35, subsidised', 'Students, over-65s and low-income households')}
      ${tier('85', '£85, standard', 'Includes water and the tool locker', true)}
      ${tier('150', '£150, supporter', 'Helps fund the accessible beds')}
    </div>
  </fieldset>
  <label class="choice">
    <input type="checkbox" class="checkbox-input" checked />
    <span class="choice__label">Shed key deposit, £25<span class="small-text text-muted">Refunded when the key is returned</span></span>
  </label>
  <div class="inline inline--between">
    <p class="text">Due now</p>
    <p class="heading font-mono">£110</p>
  </div>`;

const leaseDialog = (step = 1, errors = false) => `
  <dialog id="lease-dialog" class="dialog" aria-labelledby="lease-title">
    <form method="dialog" class="card card--ruled" novalidate>
      <header class="card__header">
        <h2 id="lease-title" class="card__title small-heading">New lease</h2>
        <button type="button" class="button button--plain button--icon" commandfor="lease-dialog" command="close"><span class="sr-only">Close</span>${icon('Close')}</button>
      </header>
      <div class="card__band">${stepper(step, errors)}</div>
      <div class="card__body card__body--scrollable form" tabindex="0" aria-label="Step ${step} of 3">
        ${step === 1 ? step1(errors) : step === 2 ? step2 : step3}
      </div>
      <footer class="card__footer">
        <div class="button-group grow">
          ${step > 1 ? `<button type="button" class="button button--plain">${icon('ArrowStart', 'icon icon--dir')}<span>Back</span></button>` : ''}
          <button type="button" class="button button-group__end" commandfor="lease-dialog" command="close">Cancel</button>
          ${step < 3 ? '<button type="button" class="button button--strong button--accent">Continue</button>' : '<button type="submit" value="register" class="button button--strong button--accent">Register lease</button>'}
        </div>
      </footer>
    </form>
  </dialog>`;

/* --------------------------------------------------------------------------
   Tool locker drawer
   -------------------------------------------------------------------------- */
const tool = (name: string, status: string, note: string, action = '') => `
  <li>
    <article class="card card--compact">
      <header class="card__header"><h3 class="card__title small-heading">${name}</h3>${status}</header>
      <div class="card__body"><p class="small-text text-muted">${note}</p></div>
      ${action ? `<footer class="card__footer justify-end">${action}</footer>` : ''}
    </article>
  </li>`;

const toolLocker = `
  <dialog id="tool-locker" class="dialog dialog--drawer" aria-labelledby="tool-locker-title">
    <article class="card">
      <header class="card__header">
        <hgroup class="card__hgroup">
          <h2 id="tool-locker-title" class="card__title small-heading">Tool locker</h2>
          <p class="card__subtitle small-text text-muted">Shared tools and who has them</p>
        </hgroup>
        <button type="button" class="button button--plain button--icon" commandfor="tool-locker" command="close"><span class="sr-only">Close</span>${icon('Close')}</button>
      </header>
      <div class="card__body card__body--scrollable stack" tabindex="0" aria-label="Tools">
        <div class="banner banner--info">
          <span class="icon-box" aria-hidden="true">${icon('Info')}</span>
          <div class="banner__body"><p class="text">Shed code this spring: <span class="font-mono font-bold">4812</span>. Scramble the dial when you leave.</p></div>
        </div>
        <ul class="stack gap-sm" role="list">
          ${tool('Broadfork', `<span class="status status--success">${icon('Check')}<span class="status__text">In shed</span></span>`, 'Bay 1, left-hand rack.')}
          ${tool('Wheelbarrow 2', `<span class="status">${icon('User')}<span class="status__text">Out</span></span>`, 'With plot A-04, back today by 17:00.')}
          ${tool('Push seeder', `<span class="status status--danger">${icon('Error')}<span class="status__text">2 days overdue</span></span>`, 'With plot C-02 since Monday.', `<button type="button" class="button button--sm">${icon('Email')}<span>Send a reminder</span></button>`)}
          ${tool('Soil sieve', `<span class="status status--success">${icon('Check')}<span class="status__text">In shed</span></span>`, 'At the east compost bays.')}
        </ul>
      </div>
    </article>
  </dialog>`;

/* --------------------------------------------------------------------------
   Toast
   -------------------------------------------------------------------------- */
const toasts = (show: boolean) => `
  <div id="toasts" class="toast-stack toast-stack--bottom-end" popover="manual" role="status" aria-label="Notifications">
    ${show
    ? `<div class="banner banner--success banner--round toast">
      <span class="icon-box" aria-hidden="true">${icon('Check')}</span>
      <div class="banner__body">
        <p class="text font-bold">Notice sent</p>
        <p class="small-text">Emailed the holders of plots B-04 and B-07.</p>
      </div>
      <button type="button" class="button button--icon banner__action">${icon('Close')}<span class="sr-only">Dismiss</span></button>
    </div>`
    : ''
  }
  </div>`;

/* --------------------------------------------------------------------------
   Page and stories
   -------------------------------------------------------------------------- */
interface PageOpts extends RegistryOpts {
  step?: number;
  errors?: boolean;
  toast?: boolean;
}

const page = (o: PageOpts = {}) => `
  <div class="app">
    <a href="#main" class="skip-link">Skip to content</a>
    ${header}
    ${frostNotice}
    <main id="main" class="main">
      <div class="wrapper py-lg stack">
        <h1 class="heading">Oakridge Commons</h1>
        ${o.loading ? '' : metrics}
        ${registry(o)}
      </div>
    </main>
    ${leaseDialog(o.step, o.errors)}
    ${toolLocker}
    ${toasts(!!o.toast)}
  </div>`;

const open = (id: string): Story['play'] => async ({ canvasElement }) => {
  canvasElement.querySelector<HTMLDialogElement>(`#${id}`)?.showModal();
};

export const Default: Story = {
  parameters: { docs: { description: { story: 'The registry as a table, with plot B-04\'s soil details open.' } } },
  render: () => page({ expanded: ['B-04'] }),
};

export const RowsSelected: Story = {
  parameters: { docs: { description: { story: 'Two rows selected: docked batch actions appear at the foot of the card.' } } },
  render: () => page({ selected: ['B-04', 'B-07'] }),
};

export const CardView: Story = {
  parameters: { docs: { description: { story: 'The view switch set to cards: the same plots in a grid.' } } },
  render: () => page({ view: 'cards' }),
};

export const NoResults: Story = {
  parameters: { docs: { description: { story: 'A search with no matches: the empty state replaces the table; the status line says "No plots".' } } },
  render: () => page({ query: 'greenhouse' }),
};

export const Loading: Story = {
  parameters: { docs: { description: { story: 'Loading: the column names show, skeletons fill the body cells, and the status line says so.' } } },
  render: () => page({ loading: true }),
};

export const LeaseForm: Story = {
  parameters: { docs: { description: { story: 'Step 1 of the lease form. `autofocus` puts focus in the first field.' } } },
  render: () => page({ step: 1 }),
  play: open('lease-dialog'),
};

export const LeaseFormErrors: Story = {
  parameters: { docs: { description: { story: 'Step 1 with errors: each field has `aria-invalid` and a message, the step is marked in the stepper, and a banner links to the fields.' } } },
  render: () => page({ step: 1, errors: true }),
  play: open('lease-dialog'),
};

export const LeaseFormAgreement: Story = {
  parameters: { docs: { description: { story: 'Step 2: switches with descriptions, and a range with its value in an output.' } } },
  render: () => page({ step: 2 }),
  play: open('lease-dialog'),
};

export const LeaseFormFee: Story = {
  parameters: { docs: { description: { story: 'Step 3: a radio fieldset and the total. Register submits the form, closing the dialog with `returnValue` "register".' } } },
  render: () => page({ step: 3 }),
  play: open('lease-dialog'),
};

export const ToolLocker: Story = {
  parameters: { docs: { description: { story: 'The tool locker drawer, from the end side.' } } },
  render: () => page(),
  play: open('tool-locker'),
};

export const Toast: Story = {
  parameters: { docs: { description: { story: 'After a batch email: a success toast in the live stack.' } } },
  render: () => page({ toast: true }),
  play: async ({ canvasElement }) => {
    canvasElement.querySelector<HTMLElement>('#toasts')?.showPopover();
  },
};
