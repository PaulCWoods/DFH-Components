import type { Meta, StoryObj } from '@storybook/html';
import { enhancePalette, icon, palette, paletteOpener } from './command-palette/palette';

const meta: Meta = {
  title: 'Recipes/App Header',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
The band at the top of an app: brand, main navigation, search, notifications and the account menu, with the same navigation in a drawer when the header is narrow.

**Composes:** skip link (§7), header (§33), tab list (§24), command palette (the Command Palette recipe), popover (§3), menu (§3b), card (§10), avatar and badge (§5, §6), dialog drawer (§2), navigation tree (§16b), breadcrumb (§16).

**Decisions:**
- **The navigation is a plain tab list of links** with \`aria-current="page"\`. It hides when the header is under 48rem wide (\`@max-3xl:hide\`, a container query on the header), and a menu button (\`@3xl:hide\`) opens the same links in a **start-side drawer** (\`.dialog--drawer.dialog--start\`), where navigation lives on a wide screen.
- **The actions' labels hide at the same width** (\`@max-3xl:hide-labels\`); the buttons keep them as their names.
- **Search opens the shared command palette** with \`command="show-modal"\`; ⌘K opens it too.
- **Notifications and the account menu are popovers** anchored to their buttons (\`popovertarget\`). Notifications is a card holding a menu of items; the account menu is a menu with the person's name as its heading. The unread count is a badge on the bell, hidden from assistive tech because the button's name says it.
- **Two rows** are two \`.header__bar\`s in one \`<header>\`: one banner landmark.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const navLinks = [
  ['Overview', true],
  ['Components', false],
  ['Tokens', false],
  ['Guidelines', false],
] as const;

const brand = `
  <a href="#" class="brand">
    ${icon('BrandDesignForHumans', 'brand__mark icon')}<span class="brand__name">Design For Humans</span>
  </a>`;

const tabNav = `
  <nav class="header__nav tab-list tab-list--plain tab-list--scrollable @max-3xl:hide" aria-label="Main">
    <ul>
      ${navLinks.map(([t, cur]) => `<li><a href="#" class="tab"${cur ? ' aria-current="page"' : ''}><span class="tab__text">${t}</span></a></li>`).join('')}
    </ul>
  </nav>`;

const notifications = `
  <button type="button" class="button button--plain button--icon" popovertarget="notifications">
    ${icon('Bell')}<span class="sr-only">Notifications, 2 unread</span>
    <span class="badge badge--danger badge--top-end" aria-hidden="true"><span class="badge__text">2</span></span>
  </button>
  <div id="notifications" popover class="popover popover--end-aligned">
    <section class="card card--compact card--ruled" aria-labelledby="notifications-title">
      <header class="card__header"><h2 id="notifications-title" class="card__title small-heading">Notifications</h2></header>
      <div class="card__body card__body--flush">
        <menu class="menu menu--plain" aria-label="Unread">
          <li><button type="button" class="button">${icon('Upload')}<span class="lockup grow"><span class="small-heading">Figma variables exported</span><span class="small-text text-muted">547 variables, 2 minutes ago</span></span></button></li>
          <li><button type="button" class="button">${icon('Warning')}<span class="lockup grow"><span class="small-heading">Contrast check failed</span><span class="small-text text-muted">Warning text on its tint, 1 hour ago</span></span></button></li>
        </menu>
      </div>
      <footer class="card__footer"><a href="#" class="link small-text">All notifications</a></footer>
    </section>
  </div>`;

const account = `
  <button type="button" class="button button--plain button--icon button--round" popovertarget="account">
    <span class="avatar" aria-hidden="true">AB<span class="badge badge--dot badge--success badge--bottom-end"></span></span>
    <span class="sr-only">Account: Alex Bennett, online</span>
  </button>
  <div id="account" popover class="popover popover--end-aligned">
    <menu class="menu" aria-label="Account">
      <li class="menu__heading">
        <span class="lockup"><span class="small-heading">Alex Bennett</span><span class="small-text text-muted">alex@example.com</span></span>
      </li>
      <li><a href="#" class="button">${icon('User')}<span>Profile</span></a></li>
      <li><a href="#" class="button">${icon('Settings')}<span>Preferences</span><kbd class="kbd">⌘,</kbd></a></li>
      <li role="separator" class="divider"></li>
      <li><button type="button" class="button button--danger">${icon('ArrowEnd')}<span>Sign out</span></button></li>
    </menu>
  </div>`;

const menuButton = `
  <button type="button" class="button button--plain button--icon @3xl:hide" commandfor="nav-drawer" command="show-modal" aria-haspopup="dialog">
    ${icon('Navigation')}<span class="sr-only">Menu</span>
  </button>`;

const drawer = `
  <dialog id="nav-drawer" class="dialog dialog--drawer dialog--start" aria-labelledby="nav-drawer-title">
    <article class="card">
      <header class="card__header">
        <h2 id="nav-drawer-title" class="card__title small-heading">Design For Humans</h2>
        <button type="button" class="button button--plain button--icon" commandfor="nav-drawer" command="close"><span class="sr-only">Close menu</span>${icon('Close')}</button>
      </header>
      <div class="card__body card__body--scrollable">
        <nav class="navigation-tree" aria-labelledby="nav-drawer-title">
          <ul role="list">
            ${navLinks.map(([t, cur]) => `<li><a href="#" class="button"${cur ? ' aria-current="page"' : ''}>${t}</a></li>`).join('')}
          </ul>
        </nav>
      </div>
    </article>
  </dialog>`;

const page = (title: string) => `
  <main id="main" class="wrapper py-lg stack">
    <h1 class="heading">${title}</h1>
    <p class="large-text text-muted">Press Tab to reach the skip link, ⌘K to search, or narrow the frame to swap the navigation for the menu button.</p>
  </main>`;

const header = (extraBar = '') => `
  <a href="#main" class="skip-link">Skip to content</a>
  <header class="header header--sticky header--translucent">
    <div class="header__bar">
      <div class="inline">${menuButton}${brand}</div>
      ${tabNav}
      <div class="cluster gap-xs @max-3xl:hide-labels">
        ${paletteOpener()}
        ${notifications}
        ${account}
      </div>
    </div>
    ${extraBar}
  </header>
  ${drawer}
  ${palette()}`;

const render = (html: string) => () => {
  const el = document.createElement('div');
  el.innerHTML = html;
  enhancePalette(el);
  return el;
};

const click = (selector: string): Story['play'] => async ({ canvasElement }) => {
  canvasElement.querySelector<HTMLElement>(selector)?.click();
};

export const Default: Story = {
  parameters: { docs: { description: { story: 'Wide: the tab list shows. Narrow the frame below 48rem and the menu button replaces it.' } } },
  render: render(`${header()}${page('Overview')}`),
};

export const NavigationDrawer: Story = {
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
    docs: { description: { story: 'The menu button opens the same links in a start-side drawer.' } },
  },
  render: render(`${header()}${page('Overview')}`),
  play: async ({ canvasElement }) => {
    canvasElement.querySelector<HTMLDialogElement>('#nav-drawer')?.showModal();
  },
};

export const Notifications: Story = {
  parameters: { docs: { description: { story: 'The bell opens a card of unread items, anchored to the button and aligned to its end edge.' } } },
  render: render(`${header()}${page('Overview')}`),
  play: click('[popovertarget="notifications"]'),
};

export const AccountMenu: Story = {
  parameters: { docs: { description: { story: 'The avatar opens a menu headed by the person\'s name. Sign out is a danger button with an icon.' } } },
  render: render(`${header()}${page('Overview')}`),
  play: click('[popovertarget="account"]'),
};

export const Search: Story = {
  parameters: { docs: { description: { story: 'Search opens the shared command palette.' } } },
  render: render(`${header()}${page('Overview')}`),
  play: async ({ canvasElement }) => {
    canvasElement.querySelector<HTMLDialogElement>('#cmd-palette')?.showModal();
  },
};

export const TwoRows: Story = {
  parameters: { docs: { description: { story: 'A second bar holds the breadcrumb and the page\'s own actions. One `<header>`, one landmark.' } } },
  render: render(
    `${header(`
    <div class="header__bar">
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <ol class="small-text">
          <li><a href="#" class="link">Components</a></li>
          <li><a href="#" class="link">Molecules</a></li>
          <li aria-current="page"><span>Combobox</span></li>
        </ol>
      </nav>
      <div class="cluster gap-xs @max-3xl:hide-labels">
        <ul class="avatar-group @max-3xl:hide" aria-label="Editing now">
          <li><span class="avatar avatar--sm" role="img" aria-label="Taylor Smith">TS</span></li>
          <li><span class="avatar avatar--sm" role="img" aria-label="Jordan Lee">JL</span></li>
          <li><span class="avatar avatar--sm avatar--count" role="img" aria-label="3 others">+3</span></li>
        </ul>
        <button type="button" class="button button--sm">${icon('Duplicate')}<span>Duplicate</span></button>
        <button type="button" class="button button--sm button--strong button--accent">${icon('Download')}<span>Export</span></button>
      </div>
    </div>`)}${page('Combobox')}`,
  ),
};
