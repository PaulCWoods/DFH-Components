import type { Meta, StoryObj } from '@storybook/html';
import './cadence/deck.css';

const meta: Meta = {
  title: 'Recipes/Cadence Dashboard',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
A radio station's live desk: an icon rail and a section menu, the station header, the on-air deck, the broadcast queue, and a player docked at the foot of the screen. It is the library's stress test: a full-viewport app shell with two sidebars, a sticky header inside the main area and a fixed footer.

**Composes:** app shell (§19d), sidebar and rail (§34), navigation tree (§16b), header (§33), telemetry (§30), split (§19c), table (§13), status and chip (§5), lockup (§6b), button group (§14), range and range lockup (§7), meter (§25), popover (§3), dialog and drawer (§2), banner (§11), skeleton (§26), tab list (§24), footer (§35).

**The deck** is a card. \`cadence/deck.css\` is this recipe's own CSS, not a library component: it adds the card's on-air or cued edge, the record artwork and the docked player's layout. Everything else is a library part.

**Decisions:**
- **\`.app--viewport\`** locks the shell to the screen; the main area and the queue scroll on their own.
- **Two sidebars on wide screens:** the rail (\`.sidebar--rail\`) for sections and the section's menu. Below 48em both hide (\`max-md:hide\`); a compact header with a menu button takes over, and the menu opens in a **start-side drawer** holding the same navigation tree. The section links move to a floating tab bar of links at the foot, and the docked player hides, because the deck is already in view.
- **Navigation is links** with \`aria-current="page"\`, in the rail, the menu and the tab bar.
- **The docked player** is one row under a position slider that runs its full width: the track at the start, the transport in the true centre, the time and volume at the end.
- **The transport** is a button group of icon buttons, with play as a round, strong accent button; every button is named. The position slider says the time in \`aria-valuetext\`.
- **The queue** is a card holding a sticky-head table; row details open under the row, as in Tally & Sprout.
- **Levels** are \`<meter>\`s with low, high and optimum set, so the browser colours them, and each is named.
- **Buffering** keeps the shell, puts the problem in a warning banner with a retry action, and marks the queue \`aria-busy\`.
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
   Navigation
   -------------------------------------------------------------------------- */
const sections = [
  ['Radio', 'Broadcast', true],
  ['List', 'Schedule', false],
  ['Grid', 'Library', false],
  ['BarChart', 'Analytics', false],
  ['Settings', 'Station settings', false],
] as const;

const avatar = `
  <button type="button" class="button button--plain button--icon button--round">
    <span class="avatar avatar--sm" aria-hidden="true">AM<span class="badge badge--dot badge--success badge--bottom-end"></span></span>
    <span class="sr-only">Account: Alex Morgan, online</span>
  </button>`;

const rail = `
  <div class="sidebar sidebar--rail color-scheme-dark max-md:hide">
    <div class="sidebar__header">
      <a href="#" class="button button--plain button--icon">${icon('BrandDesignForHumans', 'icon icon--stretch')}<span class="sr-only">Cadence home</span></a>
    </div>
    <div class="sidebar__body">
      <nav class="tab-list tab-list--vertical tab-list--segmented tab-list--sm tab-list--subtle" aria-label="Sections">
        <ul>
          ${sections.map(([ic, label, cur]) => `<li><a href="#" class="tab tab--icon"${cur ? ' aria-current="page"' : ''}>${icon(ic)}<span class="sr-only">${label}</span></a></li>`).join('')}
        </ul>
      </nav>
    </div>
    <div class="sidebar__footer">${avatar}</div>
  </div>`;

const menuTree = (labelId: string) => `
  <nav class="navigation-tree" aria-labelledby="${labelId}">
    <ul role="list">
      <li class="navigation-tree__heading"><h3 class="micro-heading">On air</h3></li>
      <li><a href="#" class="button" aria-current="page"><span>Live stream</span></a></li>
      <li><a href="#" class="button"><span>Schedule</span></a></li>
      <li>
        <a href="#" class="button"><span>Playlists</span><span class="badge badge--sm" aria-hidden="true"><span class="badge__text">8</span></span><span class="sr-only">, 8 queued</span></a>
      </li>
      <li><a href="#" class="button"><span>Ad breaks</span></a></li>
      <li class="navigation-tree__heading"><h3 class="micro-heading">Audio</h3></li>
      <li><a href="#" class="button"><span>Processing</span></a></li>
      <li><a href="#" class="button"><span>Ingest</span></a></li>
      <li>
        <a href="#" class="button"><span>Alerts</span><span class="badge badge--danger badge--sm" aria-hidden="true"><span class="badge__text">2</span></span><span class="sr-only">, 2 new</span></a>
      </li>
    </ul>
  </nav>`;

const menuSidebar = `
  <div class="sidebar sidebar--compact ui-compact max-md:hide">
    <div class="sidebar__header">
      <h2 id="menu-title" class="heading">Broadcast</h2>
    </div>
    <div class="sidebar__body">${menuTree('menu-title')}</div>
    <div class="sidebar__footer"><p class="small-text text-muted">Engine 2.4, stream healthy</p></div>
  </div>`;

const menuDrawer = `
  <dialog id="menu-drawer" class="dialog dialog--drawer dialog--start" aria-labelledby="menu-drawer-title">
    <div class="card fine:ui-compact">
      <header class="card__header align-items-center">
        <h2 id="menu-drawer-title" class="card__title heading">Broadcast</h2>
        <button type="button" class="button button--plain button--icon button--sm" commandfor="menu-drawer" command="close"><span class="sr-only">Close menu</span>${icon('Close')}</button>
      </header>
      <div class="card__body card__body--scrollable">${menuTree('menu-drawer-title')}</div>
    </div>
  </dialog>`;

const mobileBar = `
  <header class="header header--compact color-scheme-dark md:hide">
    <div class="header__bar">
      <div class="inline">
        <button type="button" class="button button--plain button--icon button--sm" commandfor="menu-drawer" command="show-modal" aria-haspopup="dialog">${icon('Navigation')}<span class="sr-only">Menu</span></button>
        <a href="#" class="link link--plain small-heading">Cadence</a>
      </div>
      ${avatar}
    </div>
  </header>`;

const tabBar = `
  <nav class="tab-list tab-list--segmented tab-list--round tab-list--floating scroll-fade tab-list--sm tab-list--subtle tab-list--docked md:hide" aria-label="Sections">
    <ul>
      ${sections.map(([ic, label, cur]) => `<li><a href="#" class="tab tab--icon"${cur ? ' aria-current="page"' : ''}>${icon(ic)}<span class="sr-only">${label}</span></a></li>`).join('')}
    </ul>
  </nav>`;

/* --------------------------------------------------------------------------
   Station header
   -------------------------------------------------------------------------- */
const stationHeader = (buffering: boolean) => `
  <header class="header header--compact header--stretch controls-sm controls-subtle header--sticky max-md:hide">
    <div class="header__bar">
      <div class="cluster">
        <label for="station" class="sr-only">Station</label>
        <select id="station" class="select select--subtle">
          <option selected>WDFH 98.5 FM, main studio</option>
          <option>Cadence Chill</option>
        </select>
        ${buffering
    ? `<span class="status status--plain status--warning">${icon('Warning')}<span class="status__text">Reconnecting</span></span>`
    : `<span class="status status--plain status--success">${icon('Record')}<span class="status__text">Live, 320k AAC</span></span>`
  }
      </div>
      <dl class="telemetry-group @max-3xl:hide" aria-label="Station">
        <div class="telemetry telemetry--compact telemetry--inline "><dt class="small-text text-muted">${icon('User')}Listeners</dt><dd class="small-heading">${buffering ? '—' : '14,820'}</dd></div>
        <div class="telemetry telemetry--compact telemetry--inline "><dt class="small-text text-muted">Peak</dt><dd class="small-heading">28,450</dd></div>
        <div class="telemetry telemetry--compact telemetry--inline "><dt class="small-text text-muted">Latency</dt><dd class="small-heading">${buffering ? '250' : '42'}<span class="small-text">ms</span></dd></div>
      </dl>
      <div class="cluster gap-xs @max-6xl:hide-labels">
        <button type="button" class="button button--danger" aria-pressed="false">${icon('Muted')}<span>Mute all</span></button>
        <button type="button" class="button" commandfor="settings" command="show-modal" aria-haspopup="dialog">${icon('Settings')}<span>Stream settings</span></button>
      </div>
    </div>
  </header>`;

/* --------------------------------------------------------------------------
   Deck
   -------------------------------------------------------------------------- */
const trackInfo = (id: string) => `
  <button type="button" class="button button--plain button--icon button--sm" popovertarget="${id}-info">${icon('Info')}<span class="sr-only">Track details</span></button>
  <div id="${id}-info" popover class="popover popover--end-aligned">
    <div class="card card--compact">
      <header class="card__header"><h3 class="card__title small-heading">Celestial Horizon</h3></header>
      <div class="card__body card__body--flush">
        <div class="table-container">
          <table class="table table--compact">
            <caption class="sr-only">Track details</caption>
            <tbody>
              <tr><th scope="row">ISRC</th><td class="font-mono">US-AT2-24-00192</td></tr>
              <tr><th scope="row">Format</th><td>FLAC, 24-bit, 96 kHz</td></tr>
              <tr><th scope="row">Loudness</th><td>−14.2 LUFS</td></tr>
              <tr><th scope="row">Tempo and key</th><td>124 BPM, E minor</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>`;

const transport = (label: string, size = ' button--lg') => `
  <div class="button-group justify-center" role="group" aria-label="${label}">
    <button type="button" class="button button--plain button--icon">${icon('ChevronStart', 'icon icon--dir')}<span class="sr-only">Back to start</span></button>
    <button type="button" class="button button--strong button--accent button--icon button--round${size}">${icon('Pause')}<span class="sr-only">Pause</span></button>
    <button type="button" class="button button--plain button--icon">${icon('ChevronEnd', 'icon icon--dir')}<span class="sr-only">Next track</span></button>
  </div>`;

const position = (id: string) => `
  <div class="stack gap-xs">
    <input id="${id}-position" type="range" class="range range--sm" min="0" max="232" value="134" style="--value: 58%;" aria-label="Position" aria-valuetext="2 minutes 14 seconds of 3 minutes 52 seconds" />
    <div class="inline inline--between small-text font-mono text-muted" aria-hidden="true"><span>2:14</span><span>−1:38</span></div>
  </div>`;

const volume = (id: string) => `
  <div class="range-lockup range-lockup--sm">
    <button type="button" class="button button--plain button--icon button--sm" aria-pressed="false">${icon('VolumeOn')}<span class="sr-only">Mute</span></button>
    <input id="${id}-volume" type="range" class="range" min="0" max="100" value="85" style="--value: 85%;" aria-label="Volume" />
    <output for="${id}-volume" class="range-lockup__output">85%</output>
  </div>`;

const levels = (id: string) => `
  <div class="stack gap-xs" role="group" aria-labelledby="${id}-levels">
    <p id="${id}-levels" class="micro-heading text-muted">Output level</p>
    <div class="inline"><span class="small-text font-mono" aria-hidden="true">L</span><meter class="meter meter--sm grow" min="0" max="100" low="65" high="90" optimum="50" value="82" aria-label="Left">−2.1 dB</meter></div>
    <div class="inline"><span class="small-text font-mono" aria-hidden="true">R</span><meter class="meter meter--sm grow" min="0" max="100" low="65" high="90" optimum="50" value="79" aria-label="Right">−2.8 dB</meter></div>
  </div>`;

const art = (spinning: boolean) =>
  `<div class="deck__art deck__art--vinyl${spinning ? ' is-spinning' : ''}" aria-hidden="true"></div>`;

const deck = (id: string, name: string, state: 'on-air' | 'cue') => `
  <section class="card ${state === 'on-air' ? 'card--strong card--success' : 'card--strong card--warning'}" aria-labelledby="${id}-title">
    <header class="card__header">
      <div class="inline grow">
        ${state === 'on-air'
    ? `<span class="status status--success">${icon('Record')}<span class="status__text">On air</span></span>`
    : `<span class="status status--warning">${icon('Pause')}<span class="status__text">Cued</span></span>`
  }
        <h2 id="${id}-title" class="micro-heading">${name}</h2>
      </div>
      ${trackInfo(id)}
    </header>
    <div class="card__body stack">
      <div class="inline">
        ${art(state === 'on-air')}
        <div class="lockup">
          <span class="small-heading">${state === 'on-air' ? 'Celestial Horizon' : 'Midnight Resonator'}</span>
          <span class="small-text text-muted">${state === 'on-air' ? 'Aura &amp; Tycho' : 'Solar Fields'}</span>
        </div>
      </div>
      ${position(id)}
      ${transport(`${name} transport`)}
      ${volume(id)}
      ${levels(id)}
    </div>
  </section>`;

/* --------------------------------------------------------------------------
   Queue
   -------------------------------------------------------------------------- */
interface Item {
  id: string;
  time: string;
  title: string;
  artist: string;
  type: 'Music' | 'Station ID' | 'Ad';
  length: string;
  status: 'On air' | 'Next' | 'Queued';
  loudness: string;
  format: string;
}

const QUEUE: Item[] = [
  { id: 'q1', time: '11:24', title: 'Celestial Horizon', artist: 'Aura & Tycho', type: 'Music', length: '3:52', status: 'On air', loudness: '−14.2 LUFS', format: 'FLAC 24-bit' },
  { id: 'q2', time: '11:28', title: 'Station ID 98.5', artist: 'Voiceover', type: 'Station ID', length: '0:15', status: 'Next', loudness: '−14.0 LUFS', format: 'WAV 16-bit' },
  { id: 'q3', time: '11:28', title: 'Hyperdrive Pulse', artist: 'Neon Velocity', type: 'Music', length: '4:10', status: 'Queued', loudness: '−13.8 LUFS', format: 'FLAC 24-bit' },
  { id: 'q4', time: '11:32', title: 'Audio Precision Labs', artist: 'Sponsor spot', type: 'Ad', length: '0:30', status: 'Queued', loudness: '−14.1 LUFS', format: 'AAC 320k' },
  { id: 'q5', time: '11:33', title: 'Midnight Resonator', artist: 'Solar Fields', type: 'Music', length: '5:44', status: 'Queued', loudness: '−14.4 LUFS', format: 'FLAC 24-bit' },
];

const typeIcon = { Music: 'Music', 'Station ID': 'Radio', Ad: 'Star' } as const;

const queueStatus = (s: Item['status']) =>
  s === 'On air'
    ? `<span class="status status--success">${icon('Record')}<span class="status__text">On air</span></span>`
    : s === 'Next'
      ? `<span class="status status--accent"><span class="status__text">Next</span></span>`
      : `<span class="status"><span class="status__text">Queued</span></span>`;

const queueRow = (q: Item, expanded: boolean) => `
  <tr>
    <td class="table__cell--nowrap font-mono">${q.time}</td>
    <th scope="row">
      <div class="inline">
        ${icon(typeIcon[q.type], 'icon text-muted')}
        <span class="lockup"><span class="small-heading">${q.title}</span><span class="small-text text-muted">${q.artist}</span></span>
      </div>
    </th>
    <td class="table__cell--nowrap">${q.type}</td>
    <td class="table__cell--numeric font-mono">${q.length}</td>
    <td class="table__cell--nowrap">${queueStatus(q.status)}</td>
    <td class="table__col--actions">
      <button type="button" class="button button--plain button--icon button--sm" aria-expanded="${expanded}" aria-controls="${q.id}-details">
        ${icon(expanded ? 'ChevronUp' : 'ChevronDown')}<span class="sr-only">Details for ${q.title}</span>
      </button>
    </td>
  </tr>
  <tr id="${q.id}-details"${expanded ? '' : ' hidden'}>
    <td colspan="6">
      <dl class="telemetry-group" aria-label="${q.title}">
        <div class="telemetry"><dt class="small-text text-muted">Loudness</dt><dd class="small-heading font-mono">${q.loudness}</dd></div>
        <div class="telemetry"><dt class="small-text text-muted">Format</dt><dd class="small-heading">${q.format}</dd></div>
      </dl>
    </td>
  </tr>`;

const queueHead = `
  <thead>
    <tr>
      <th scope="col">Time</th>
      <th scope="col">Item</th>
      <th scope="col">Type</th>
      <th scope="col" class="table__cell--numeric">Length</th>
      <th scope="col">Status</th>
      <th scope="col" class="table__col--actions"><span class="sr-only">Actions</span></th>
    </tr>
  </thead>`;

const skeletonQueue = () =>
  Array.from(
    { length: 4 },
    () => `
  <tr aria-hidden="true">
    <td><span class="skeleton skeleton--text"></span></td>
    <td><span class="skeleton skeleton--text skeleton--w-75"></span></td>
    <td><span class="skeleton skeleton--text"></span></td>
    <td><span class="skeleton skeleton--text"></span></td>
    <td><span class="skeleton skeleton--badge"></span></td>
    <td></td>
  </tr>`,
  ).join('');

const queue = (buffering: boolean) => `
  <section class="card" aria-labelledby="queue-title">
    <header class="card__header">
      <hgroup class="card__hgroup">
        <h2 id="queue-title" class="card__title subheading">Queue</h2>
        <p class="card__subtitle small-text text-muted" role="status">${buffering ? 'Resynchronising…' : '5 items, 14 minutes 31 seconds'}</p>
      </hgroup>
      <div class="cluster gap-xs max-lg:hide-labels">
        <button type="button" class="button button--sm">${icon('Sortable')}<span>Balance</span></button>
        <button type="button" class="button button--sm button--strong button--accent">${icon('Plus')}<span>Add</span></button>
      </div>
    </header>
    <div class="card__band">
      <div class="cluster w-full">
        <div class="flex-grow-1">
          <label for="queue-search" class="sr-only">Search the queue</label>
          <input id="queue-search" type="search" class="input input--sm w-full" placeholder="Title, artist or ISRC" />
        </div>
        <div class="button-group button-group--joined buttons-sm" role="radiogroup" aria-label="Show">
          ${['All', 'Music', 'Station IDs', 'Ads'].map((t, i) => `<label class="button"><input type="radio" name="queue-type" class="sr-only"${i === 0 ? ' checked' : ''} /><span>${t}</span></label>`).join('')}
        </div>
      </div>
    </div>
    <div class="card__body card__body--flush">
      <div class="table-container" tabindex="0" role="region" aria-label="Queue table"${buffering ? ' aria-busy="true"' : ''}>
        <table class="table table--striped table--hover table--sticky-head">
          ${queueHead}
          <tbody>${buffering ? skeletonQueue() : QUEUE.map((q, i) => queueRow(q, i === 0)).join('')}</tbody>
        </table>
      </div>
    </div>
    <footer class="card__footer small-text text-muted">Automation on. Next ad break at 11:45.</footer>
  </section>`;

/* --------------------------------------------------------------------------
   Dock, settings and page
   -------------------------------------------------------------------------- */
const dock = (buffering: boolean) => `
  <footer class="footer footer--stretch max-md:hide">
    <section aria-labelledby="dock-title">
      <h2 id="dock-title" class="sr-only">Player</h2>
      <input type="range" class="range range--sm deck-dock__position" min="0" max="232" value="134" style="--value: 58%;" aria-label="Position" aria-valuetext="2 minutes 14 seconds of 3 minutes 52 seconds" />
      <div class="footer__bar deck-dock">
        <div class="inline">
          ${art(!buffering)}
          <div class="lockup">
            <span class="small-heading truncate">Celestial Horizon</span>
            <span class="small-text text-muted truncate">${buffering ? 'Paused, waiting to reconnect' : 'Aura &amp; Tycho'}</span>
          </div>
        </div>
        ${transport('Player transport', '')}
        <div class="inline">
          <span class="small-text font-mono text-muted whitespace-nowrap max-lg:hide" aria-hidden="true">2:14 / 3:52</span>
          ${volume('dock')}
        </div>
      </div>
    </section>
  </footer>`;

const settingsDialog = `
  <dialog id="settings" class="dialog" aria-labelledby="settings-title">
    <div class="card card--ruled">
      <header class="card__header">
        <h2 id="settings-title" class="card__title small-heading">Stream settings</h2>
        <button type="button" class="button button--plain button--icon" commandfor="settings" command="close"><span class="sr-only">Close</span>${icon('Close')}</button>
      </header>
      <div class="card__body card__body--scrollable form" tabindex="0" aria-label="Settings">
        <div class="field">
          <label for="set-source" class="field__label label">Audio interface</label>
          <select id="set-source" class="select" autofocus><option>Apollo x8, outputs 1 and 2</option><option>Dante virtual soundcard</option></select>
        </div>
        <div class="field">
          <label for="set-codec" class="field__label label">Codec</label>
          <select id="set-codec" class="select"><option>AAC, 320 kbps</option><option>AAC-HE, 192 kbps</option><option>FLAC</option></select>
        </div>
        <label class="switch"><span class="switch__label label">Loudness normalisation <span class="small-text text-muted">Holds every track at −14 LUFS</span></span><input type="checkbox" role="switch" class="sr-only" checked /><span class="switch__control" aria-hidden="true"><span class="switch__option switch__option--off">Off</span><span class="switch__option switch__option--on">On</span></span></label>
        <label class="switch"><span class="switch__label label">Fall back to the emergency cart <span class="small-text text-muted">When the buffer drops under 10 ms</span></span><input type="checkbox" role="switch" class="sr-only" checked /><span class="switch__control" aria-hidden="true"><span class="switch__option switch__option--off">Off</span><span class="switch__option switch__option--on">On</span></span></label>
        <div class="field">
          <div class="field__header">
            <label for="set-buffer" class="field__label label">Buffer</label>
            <output for="set-buffer" class="small-text">42 ms</output>
          </div>
          <input id="set-buffer" type="range" class="range" min="10" max="250" value="42" style="--value: 13%;" />
        </div>
      </div>
      <footer class="card__footer justify-end">
        <form method="dialog" class="button-group">
          <button type="submit" value="cancel" class="button">Cancel</button>
          <button type="submit" value="save" class="button button--strong button--accent">Save</button>
        </form>
      </footer>
    </div>
  </dialog>`;

const outage = `
  <div class="banner banner--warning">
    <span class="icon-box" aria-hidden="true">${icon('Warning')}</span>
    <div class="banner__body">
      <p class="text font-bold">The stream has stalled</p>
      <p class="small-text">The studio uplink passed 250 ms. The emergency cart starts in 12 seconds.</p>
    </div>
    <button type="button" class="button banner__action">Retry now</button>
  </div>`;

const page = (buffering = false) => `
  <div class="app app--viewport">
    <a href="#main" class="skip-link">Skip to the desk</a>
    ${mobileBar}
    <div class="app__workspace">
      ${rail}
      ${menuSidebar}
      <main id="main" class="main main--viewport main--flush">
        ${stationHeader(buffering)}
        <div class="stack p-cushion">
          <h1 class="sr-only">Live desk</h1>
          ${buffering ? outage : ''}
          <div class="split split--sm">
            ${deck('deck-a', 'Deck A', 'on-air')}
            ${queue(buffering)}
          </div>
        </div>
      </main>
    </div>
    ${dock(buffering)}
    ${tabBar}
    ${menuDrawer}
    ${settingsDialog}
  </div>`;

export const Live: Story = {
  parameters: { docs: { description: { story: 'On air. Narrow the frame below 48em for the compact header, drawer menu and tab bar.' } } },
  render: () => page(),
};

export const Buffering: Story = {
  parameters: { docs: { description: { story: 'The stream has stalled: a warning banner with a retry, the status in the header, and the queue loading.' } } },
  render: () => page(true),
};

export const MenuDrawer: Story = {
  parameters: { docs: { description: { story: 'Narrow screens: the section menu in a start-side drawer.' } } },
  render: () => page(),
  play: async ({ canvasElement }) => {
    canvasElement.querySelector<HTMLDialogElement>('#menu-drawer')?.showModal();
  },
};

export const StreamSettings: Story = {
  parameters: { docs: { description: { story: 'The settings dialog: focus starts on the first field; Cancel and Save submit the footer form.' } } },
  render: () => page(),
  play: async ({ canvasElement }) => {
    canvasElement.querySelector<HTMLDialogElement>('#settings')?.showModal();
  },
};

export const Deck: Story = {
  parameters: {
    layout: 'padded',
    docs: { description: { story: 'The deck alone, on air and cued, side by side. `card--success` and `card--warning` set its edge colour; the status says the same in words.' } },
  },
  render: () => `
    <div class="grid grid--2-col grid--sm">
      ${deck('deck-1', 'Deck A', 'on-air')}
      ${deck('deck-2', 'Deck B', 'cue')}
    </div>`,
};
