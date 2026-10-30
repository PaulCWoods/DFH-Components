import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Layout/App Shell',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
The page shell: header, main and footer in rows, the main row taking the free height so the footer sits at the bottom of a short page. Defined in \`layout/app.css\` and \`layout/main.css\`.

### Markup
\`\`\`html
<body class="app">
  <a href="#main" class="skip-link">Skip to content</a>
  <header class="header">…</header>
  <div class="app__workspace">
    <nav class="sidebar sidebar--sticky" aria-label="Sections">…</nav>
    <main id="main" class="main">
      <div class="wrapper stack">…</div>
    </main>
  </div>
  <footer class="footer">…</footer>
</body>
\`\`\`

| Part | Role |
| :--- | :--- |
| \`.app\` | Places its direct \`<header>\`/\`.header\`, \`<main>\`/\`.main\`/\`.app__workspace\` and \`<footer>\`/\`.footer\` in rows |
| \`.app__workspace\` | Side panes (\`.sidebar\`, \`<aside>\`) beside the main; below 48em they stack, side pane first |
| \`.app--viewport\` | Locks the shell to the screen so panes scroll inside it; unlocks to a scrolling page at small widths or heights |
| \`.main\` | Padding round the content (inline padding drops when its child is a \`.wrapper\`); \`--flush\` for none; \`--viewport\` for panes that scroll inside it (it scrolls itself whenever they don't fit, so it never clips) |

- **Landmarks:** one shell per page. Its \`<header>\` is the banner, its \`<footer>\` the contentinfo, and there is one \`<main>\`. The skip link comes first and takes no row.
- **Small screens:** a sidebar never becomes a drawer on its own. It stacks above the main, or the product hides it and puts the same navigation in a \`.dialog--drawer\` (see Organisms/Sidebar).
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const header = (sticky = false) => `
  <header class="header${sticky ? ' header--sticky' : ''}">
    <div class="header__bar">
      <a href="#" class="link link--plain small-heading">Woodland Plants</a>
      <button type="button" class="button">Sign in</button>
    </div>
  </header>`;

const footer = `
  <footer class="footer">
    <div class="footer__bar">
      <p class="small-text text-muted">© 2026 Woodland Plants</p>
      <nav aria-label="Footer">
        <ul class="cluster small-text" role="list">
          <li><a href="#" class="link">Accessibility</a></li>
          <li><a href="#" class="link">Privacy</a></li>
        </ul>
      </nav>
    </div>
  </footer>`;

const article = (n = 2) => `
  <div class="wrapper stack">
    <h1 class="heading">Shade-loving perennials</h1>
    ${Array.from({ length: n }, (_, i) => `<p class="text">Woodland plants want soil that holds moisture but drains. Dig in leaf mould before planting, and mulch every spring. <a href="#" class="link">Read note ${i + 1}</a></p>`).join('')}
  </div>`;

const sideNav = (extra = '') => `
  <div class="sidebar sidebar--ruled${extra}">
    <div class="sidebar__header"><h2 id="groups" class="micro-heading">Plant groups</h2></div>
    <div class="sidebar__body">
      <nav class="navigation-tree" aria-labelledby="groups">
        <ul role="list">
          <li><a href="#" class="button" aria-current="page">Perennials</a></li>
          <li><a href="#" class="button">Ferns</a></li>
          <li><a href="#" class="button">Grasses</a></li>
          <li><a href="#" class="button">Bulbs</a></li>
        </ul>
      </nav>
    </div>
  </div>`;

export const SiteShell: Story = {
  name: 'Site shell',
  parameters: { docs: { description: { story: 'Header, main and footer. The page is short, so the main takes the free height and the footer sits at the bottom.' } } },
  render: () => `
    <div class="app">
      <a href="#main" class="skip-link">Skip to content</a>
      ${header()}
      <main id="main" class="main">${article(1)}</main>
      ${footer}
    </div>`,
};

export const Workspace: Story = {
  parameters: { docs: { description: { story: 'A sticky sidebar beside the main. Scroll the canvas: the sidebar stays put under the sticky header. Narrow it below 48em: the sidebar stacks above the main.' } } },
  render: () => `
    <div class="app">
      <a href="#main" class="skip-link">Skip to content</a>
      ${header(true)}
      <div class="app__workspace">
        ${sideNav(' sidebar--sticky')}
        <main id="main" class="main">${article(14)}</main>
      </div>
      ${footer}
    </div>`,
};

export const Viewport: Story = {
  parameters: { docs: { description: { story: '`.app--viewport` locks the shell to the screen: the sidebar and the main scroll on their own, and the header and footer stay in view. At small widths or heights it scrolls as a page again.' } } },
  render: () => `
    <div class="app app--viewport">
      <a href="#main" class="skip-link">Skip to content</a>
      ${header()}
      <div class="app__workspace">
        ${sideNav()}
        <main id="main" class="main" tabindex="-1">${article(14)}</main>
      </div>
      ${footer}
    </div>`,
};

const pane = (id: string, title: string, n: number) => `
  <section class="card" aria-labelledby="${id}">
    <header class="card__header"><h2 id="${id}" class="card__title small-heading">${title}</h2></header>
    <div class="card__body card__body--scrollable stack" tabindex="0" aria-labelledby="${id}">
      ${Array.from({ length: n }, (_, i) => `<p class="text">${title} entry ${i + 1}: lift and divide clumps in autumn, and water them in well.</p>`).join('')}
    </div>
  </section>`;

export const ViewportPanes: Story = {
  name: 'Viewport with panes',
  parameters: { docs: { description: { story: '`.main--viewport` holds two panes that scroll on their own while they sit side by side. Narrow the canvas until the split wraps: the panes stack and the main scrolls, so nothing is cut off. Below 48em, or 36em tall, the shell scrolls as a page.' } } },
  render: () => `
    <div class="app app--viewport">
      <a href="#main" class="skip-link">Skip to content</a>
      ${header()}
      <div class="app__workspace">
        ${sideNav()}
        <main id="main" class="main main--viewport">
          <div class="split grow min-h-0" style="--align-items: stretch;">
            ${pane('pane-tasks', 'Tasks', 18)}
            ${pane('pane-notes', 'Notes', 24)}
          </div>
        </main>
      </div>
      ${footer}
    </div>`,
};

