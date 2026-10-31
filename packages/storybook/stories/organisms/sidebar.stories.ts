import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Organisms/Sidebar',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
A side panel beside the main content: section navigation, filters, tools. The sidebar draws the panel (surface, edge, sticky) and lays out its parts; what's in them (a navigation tree, a tab list, fields) styles itself. Defined in \`organisms/sidebar.css\`.

### Markup
\`\`\`html
<div class="app__workspace">
  <div class="sidebar sidebar--sticky sidebar--ruled">
    <div class="sidebar__header"><h2 id="groups" class="micro-heading">Plant groups</h2></div>
    <div class="sidebar__body">
      <nav class="navigation-tree" aria-labelledby="groups">…</nav>
    </div>
    <div class="sidebar__footer">…</div>
  </div>
  <main id="main" class="main">…</main>
</div>
\`\`\`

| Axis | Values |
| :--- | :--- |
| Prominence | default (surface and edge), \`--subtle\` (a tint, no edge), \`--plain\` (no surface, no edge), \`--floating\` (inset, rounded, raised) |
| Placement | start (default), \`--end\`; in flow, \`--sticky\` |
| Width | default (\`--sidebar-width\`, 18rem), \`--rail\` (4.5rem, icon buttons) |

- **Parts:** \`__header\`, \`__band\`, \`__body\` (scrolls when the sidebar has a height: sticky, or in an \`.app--viewport\` shell), \`__footer\` (at the bottom). \`--ruled\` draws a rule between them. \`__body--flush\` takes the body's inline padding off, so a flush tab list runs edge to edge with its labels lined up.
- **Sticky:** pinned beside the scrolling page, as tall as the screen less a sticky header (\`--header-height\`, 4rem by default).
- **Small screens:** the sidebar never becomes a drawer on its own. In a workspace it stacks above the main below 48em; or hide it there (\`max-md:hide\`) and put the same navigation in a \`.dialog--drawer\`, opened by a menu button. The dialog is modal, keeps focus inside and closes with Escape, with no script.
- **Semantics:** wrap navigation in a \`<nav>\` labelled by the sidebar's heading; a filter or tool panel is an \`<aside aria-label>\` or a \`<div>\`.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const icon = (name: string) =>
  `<svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#${name}"/></svg>`;

const tree = (label = 'groups') => `
  <nav class="navigation-tree" aria-labelledby="${label}">
    <ul role="list">
      <li><a href="#" class="button" aria-current="page">Perennials</a></li>
      <li><a href="#" class="button">Ferns</a></li>
      <li><a href="#" class="button">Grasses</a></li>
      <li><a href="#" class="button">Bulbs</a></li>
    </ul>
  </nav>`;

const panel = (cls = '', id = 'groups') => `
  <div class="sidebar sidebar--ruled ${cls}">
    <div class="sidebar__header"><h2 id="${id}" class="micro-heading">Plant groups</h2></div>
    <div class="sidebar__body">${tree(id)}</div>
    <div class="sidebar__footer"><a href="#" class="link small-text">Suggest a plant</a></div>
  </div>`;

const main = (n = 2) => `
  <main id="main" class="main">
    <div class="wrapper stack">
      <h1 class="heading">Perennials</h1>
      ${Array.from({ length: n }, (_, i) => `<p class="text">Woodland perennials want soil that holds moisture but drains. Mulch every spring. <a href="#" class="link">Note ${i + 1}</a></p>`).join('')}
    </div>
  </main>`;

export const Playground: Story = {
  args: { prominence: 'default', end: false, ruled: true },
  argTypes: {
    prominence: { control: 'inline-radio', options: ['default', 'subtle', 'plain', 'floating'] },
  },
  render: (args) => {
    const cls = [args.end && 'sidebar--end', args.prominence !== 'default' && `sidebar--${args.prominence}`].filter(Boolean).join(' ');
    const side = panel(cls).replace('sidebar--ruled', args.ruled ? 'sidebar--ruled' : '');
    return `<div class="app__workspace">${args.end ? main() + side : side + main()}</div>`;
  },
};

export const Subtle: Story = {
  render: () => `<div class="app__workspace">${panel('sidebar--subtle')}${main()}</div>`,
};

export const Plain: Story = {
  render: () => `<div class="app__workspace">${panel('sidebar--plain')}${main()}</div>`,
};

export const Sticky: Story = {
  parameters: { docs: { description: { story: 'In an app shell with a sticky header: scroll the canvas and the sidebar stays in view below the header; its body scrolls on its own if it runs long.' } } },
  render: () => `
    <div class="app">
      <a href="#main" class="skip-link">Skip to content</a>
      <header class="header header--sticky">
        <div class="header__bar"><a href="#" class="link link--plain small-heading">Woodland Plants</a><button type="button" class="button">Sign in</button></div>
      </header>
      <div class="app__workspace">
        ${panel('sidebar--sticky')}
        ${main(14)}
      </div>
    </div>`,
};

export const FlushTabList: Story = {
  name: 'Flush tab list',
  parameters: { docs: { description: { story: '`__body--flush` with a vertical, flush tab list: the tabs run edge to edge and their labels line up with the header.' } } },
  render: () => `
    <div class="app__workspace">
      <div class="sidebar sidebar--ruled">
        <div class="sidebar__header"><h2 id="flush-groups" class="micro-heading">Plant groups</h2></div>
        <div class="sidebar__body sidebar__body--flush">
          <nav class="tab-list tab-list--vertical tab-list--plain tab-list--flush" aria-labelledby="flush-groups">
            <ul>
              <li><a href="#" class="tab" aria-current="page"><span class="tab__text">Perennials</span></a></li>
              <li><a href="#" class="tab"><span class="tab__text">Ferns</span></a></li>
              <li><a href="#" class="tab"><span class="tab__text">Grasses</span></a></li>
            </ul>
          </nav>
        </div>
      </div>
      ${main()}
    </div>`,
};

export const Rail: Story = {
  parameters: { docs: { description: { story: '`--rail`: a narrow column of icon buttons. Each has an accessible name; a tooltip shows it on hover and focus.' } } },
  render: () => `
    <div class="app__workspace">
      <nav class="sidebar sidebar--rail" aria-label="Main">
        <div class="sidebar__body">
          <ul class="stack" role="list">
            ${[['Home', 'Home'], ['Search', 'Search'], ['Bookmark', 'Saved plants'], ['Settings', 'Settings']].map(([i, label], n) => `
              <li><a href="#" class="button button--plain button--icon" ${n === 0 ? 'aria-current="page"' : ''} aria-label="${label}">${icon(i)}</a></li>`).join('')}
          </ul>
        </div>
      </nav>
      ${main()}
    </div>`,
};

export const SmallScreens: Story = {
  name: 'Small screens: a drawer',
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
    docs: { description: { story: 'Below 48em the sidebar is hidden (`max-md:hide`) and a menu button in the header opens the same navigation in a `.dialog--drawer`. Widen the canvas to see the sidebar instead.' } },
  },
  render: () => `
    <div class="app">
      <a href="#main" class="skip-link">Skip to content</a>
      <header class="header">
        <div class="header__bar">
          <a href="#" class="link link--plain small-heading">Woodland Plants</a>
          <button type="button" class="button button--plain button--icon md:hide" commandfor="plant-nav" command="show-modal" aria-haspopup="dialog">
            <span class="sr-only">Plant groups</span>${icon('Navigation')}
          </button>
        </div>
      </header>
      <div class="app__workspace">
        ${panel('max-md:hide', 'side-groups')}
        ${main()}
      </div>
      <dialog id="plant-nav" class="dialog dialog--drawer dialog--start" aria-labelledby="drawer-groups">
        <article class="card">
          <header class="card__header">
            <h2 id="drawer-groups" class="card__title small-heading">Plant groups</h2>
            <button type="button" class="button button--plain button--icon" commandfor="plant-nav" command="close"><span class="sr-only">Close</span>${icon('Close')}</button>
          </header>
          <div class="card__body card__body--scrollable">${tree('drawer-groups')}</div>
        </article>
      </dialog>
    </div>`,
};

export const Parts: Story = {
  parameters: { docs: { description: { story: 'A header, a band for a filter or a segmented tab list, a body and a footer. `--ruled` draws a rule between them.' } } },
  render: () => `
    <div class="app__workspace">
      <div class="sidebar sidebar--subtle sidebar--ruled">
        <div class="sidebar__header"><h2 id="parts-types" class="micro-heading">Plant types</h2></div>
        <div class="sidebar__band">
          <div class="field">
            <label for="parts-filter" class="field__label label">Filter</label>
            <input id="parts-filter" type="search" class="input" />
          </div>
        </div>
        <div class="sidebar__body">${tree('parts-types')}</div>
        <div class="sidebar__footer"><a href="#" class="link small-text">Suggest a plant</a></div>
      </div>
      ${main()}
    </div>`,
};

export const Compact: Story = {
  parameters: { docs: { description: { story: '`--compact` takes less padding.' } } },
  render: () => `<div class="app__workspace">${panel('sidebar--compact')}${main()}</div>`,
};
