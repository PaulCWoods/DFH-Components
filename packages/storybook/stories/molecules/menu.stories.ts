import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Molecules/Menu',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
A list of actions, usually opened from a button in a popover: buttons and links in rows, with optional headings and dividers. Its items are buttons; the menu makes them plain and full width, with their content at the start and a trailing shortcut, badge or status at the end. It never restyles them, so items keep the button's targets, intent and focus ring.

### Markup
\`\`\`html
<button type="button" class="button" popovertarget="doc-menu"><span>Options</span></button>

<div id="doc-menu" popover class="popover">
  <menu class="menu" aria-label="Document options">
    <li class="menu__heading"><h3 class="micro-heading">Document</h3></li>
    <li>
      <button type="button" class="button">
        <svg class="icon" …><use href="#Duplicate"/></svg>
        <span>Duplicate</span>
        <kbd class="kbd">⌘D</kbd>
      </button>
    </li>
    <li role="separator" class="divider"></li>
    <li><button type="button" class="button button--danger"><span>Delete document</span></button></li>
  </menu>
</div>
\`\`\`

- **No ARIA menu roles.** It is a list, and Tab moves through it. \`role="menu"\` promises arrow keys and typeahead, which need a script the library doesn't ship; the popover already gives Escape and light dismiss.
- **Checkable items** are buttons with \`aria-pressed\` and a check icon with \`.icon--on\`.
- **Current page:** a link with \`aria-current="page"\` shows as a tint.
- **Current item:** a link to the current page has \`aria-current="page"\` and shows bold, with a tint and a rail at its start (Highlight in forced colours).
- **Prominence:** default, \`--strong\` (raised; a popover sets \`--menu-prominence: strong\`), \`--subtle\`, \`--plain\`. Also \`--compact\`, \`--translucent\` and \`--ruled\`.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const icon = (name: string, cls = '') =>
  `<svg class="icon${cls ? ` ${cls}` : ''}" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#${name}"/></svg>`;

const item = (iconName: string, label: string, meta = '', cls = '') =>
  `<li><button type="button" class="button${cls ? ` ${cls}` : ''}">${iconName ? icon(iconName) : ''}<span>${label}</span>${meta}</button></li>`;

/* Places are links; the current one has aria-current and shows a rail */
const link = (iconName: string, label: string, meta = '', current = '') =>
  `<li><a href="#${label.toLowerCase()}" class="button"${current ? ` aria-current="${current}"` : ''}>${icon(iconName)}<span>${label}</span>${meta}</a></li>`;

const kbd = (k: string) => `<kbd class="kbd">${k}</kbd>`;

const documentItems = `
  <li class="menu__heading"><h3 class="micro-heading">Document</h3></li>
  ${item('Edit', 'Rename', kbd('⌘R'))}
  ${item('Duplicate', 'Duplicate', kbd('⌘D'))}
  ${item('Download', 'Export JSON', kbd('⇧⌘E'))}
  <li role="separator" class="divider"></li>
  ${item('Delete', 'Delete document', kbd('⌫'), 'button--danger')}`;

export const Playground: Story = {
  args: { prominence: 'default', compact: false, translucent: false, ruled: false },
  argTypes: {
    prominence: { control: 'inline-radio', options: ['default', 'strong', 'subtle', 'plain'] },
  },
  render: (args) => {
    const cls = ['menu',
      args.prominence !== 'default' && `menu--${args.prominence}`,
      args.compact && 'menu--compact',
      args.translucent && 'menu--translucent',
      args.ruled && 'menu--ruled'].filter(Boolean).join(' ');
    return `
      <div style="max-inline-size: 18rem;">
        <menu class="${cls}" aria-label="Document options">${documentItems}</menu>
      </div>`;
  },
};

export const InAPopover: Story = {
  name: 'In a popover',
  render: () => `
    <div class="cluster" style="justify-content: center; min-block-size: 24rem; align-items: start; padding-block: 2rem;">
      <button type="button" class="button" popovertarget="mn-actions"><span>Actions</span>${icon('ChevronDown')}</button>
      <div id="mn-actions" popover class="popover">
        <menu class="menu" aria-label="Document options">${documentItems}</menu>
      </div>

      <button type="button" class="button" popovertarget="mn-glass"><span>Translucent</span>${icon('ChevronDown')}</button>
      <div id="mn-glass" popover class="popover popover--end-aligned">
        <menu class="menu menu--translucent menu--compact" aria-label="Quick actions">
          ${item('Copy', 'Copy link', kbd('⌘C'))}
          ${item('Share', 'Share', kbd('⇧⌘S'))}
          <li><button type="button" class="button" disabled>${icon('Lock')}<span>Lock editing</span></button></li>
        </menu>
      </div>
    </div>`,
};

export const Prominence: Story = {
  render: () => {
    const menu = (cls: string, label: string) => `
      <div class="stack" style="gap: 0.5rem;">
        <h3 class="small-heading">${label}</h3>
        <menu class="${cls}" aria-label="${label}">
          ${link('User', 'Profile', '', 'page')}
          ${link('Bell', 'Notifications', '<span class="status"><span class="status__text">3 new</span></span>')}
          ${link('Settings', 'Settings', kbd('⌘,'))}
        </menu>
      </div>`;
    return `
      <div class="cluster" style="align-items: start; gap: 2rem;">
        ${menu('menu', 'Default')}
        ${menu('menu menu--strong', '--strong')}
        ${menu('menu menu--subtle', '--subtle')}
        ${menu('menu menu--plain', '--plain')}
      </div>`;
  },
};

export const CheckableItems: Story = {
  render: () => `
    <div style="max-inline-size: 18rem;">
      <menu class="menu" aria-label="View">
        <li class="menu__heading"><h3 class="micro-heading">View</h3></li>
        <li><button type="button" class="button" aria-pressed="true" onclick="this.setAttribute('aria-pressed', this.getAttribute('aria-pressed') !== 'true')">${icon('Check', 'icon--on')}<span>Line numbers</span></button></li>
        <li><button type="button" class="button" aria-pressed="true" onclick="this.setAttribute('aria-pressed', this.getAttribute('aria-pressed') !== 'true')">${icon('Check', 'icon--on')}<span>Word wrap</span></button></li>
        <li><button type="button" class="button" aria-pressed="false" onclick="this.setAttribute('aria-pressed', this.getAttribute('aria-pressed') !== 'true')">${icon('Check', 'icon--on')}<span>Minimap</span></button></li>
      </menu>
    </div>`,
};

export const LinksInACard: Story = {
  name: 'Links in a card',
  render: () => `
    <article class="card" style="max-inline-size: 20rem;">
      <header class="card__header"><h3 class="card__title heading">Account</h3></header>
      <nav class="card__body" aria-label="Account">
        <menu class="menu menu--plain menu--ruled">
          <li><a href="#profile" class="button" aria-current="page">${icon('User')}<span>Profile</span></a></li>
          <li><a href="#billing" class="button">${icon('Clipboard')}<span>Billing</span><span class="status status--warning status--plain"><span class="status__text">Due</span></span></a></li>
          <li><a href="#security" class="button">${icon('Lock')}<span>Security</span></a></li>
        </menu>
      </nav>
    </article>`,
};

export const RightToLeft: Story = {
  name: 'Right to left',
  render: () => `
    <div dir="rtl" style="max-inline-size: 18rem;">
      <menu class="menu" aria-label="Document options, right to left">${documentItems}</menu>
    </div>`,
};
