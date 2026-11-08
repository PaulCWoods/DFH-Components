import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Organisms/Header',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
The band at the top of a page or app that holds the brand, the main navigation and global actions. The header draws the band and lays out its rows; what's in a row (a lockup, a tab list, buttons, a breadcrumb) styles itself.

### Markup
\`\`\`html
<a href="#main" class="skip-link">Skip to content</a>
<header class="header header--sticky">
  <div class="header__bar">
    <a href="/" class="brand"><span class="brand__name">Woodland Plants</span></a>
    <nav class="header__nav tab-list tab-list--plain tab-list--scrollable" aria-label="Main">
      <ul>
        <li><a href="/plants" class="tab" aria-current="page"><span class="tab__text">Plants</span></a></li>
        <li><a href="/borders" class="tab"><span class="tab__text">Borders</span></a></li>
      </ul>
    </nav>
    <button type="button" class="button">Sign in</button>
  </div>
</header>
\`\`\`

| Axis | Values | Flag |
| :--- | :--- | :--- |
| Prominence | default (surface and border), \`--plain\`, \`--translucent\` | none |
| Density | default, \`--compact\` | \`--ui-sizing: compact\` |
| Placement | in flow, \`--sticky\` | none |

- **Rows:** \`.header__bar\` lays out brand, navigation and actions, capped at the site width so it lines up with \`.wrapper\`. \`.header__nav\` takes the free space; what follows sits at the end. Two rows are two bars.
- **Landmark:** a \`<header>\` directly in \`<body>\` (or \`.app\`) is the banner: one per page, after the skip link, no \`aria-label\`. The galleries below use \`<div class="header">\` so each story has one banner.
- **Sticky:** the shadow shows only while the header is stuck. The page's scroll padding keeps focused elements clear of it (WCAG 2.4.11); set \`--header-height\` on \`:root\` if the header is taller than 4rem.
- **Narrow:** the header is a container, so \`@max-3xl:hide\` and \`@3xl:hide\` swap the navigation for a menu button by the header's own width.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const icon = (name: string) =>
  `<svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#${name}"/></svg>`;

const brand = `<a href="#" class="brand"><span class="brand__name">Woodland Plants</span></a>`;

const nav = (id = 'main', label = 'Main') => `
  <nav class="header__nav tab-list tab-list--plain tab-list--scrollable @max-3xl:hide" aria-label="${label}" id="${id}-nav">
    <ul>
      <li><a href="#" class="tab" aria-current="page"><span class="tab__text">Plants</span></a></li>
      <li><a href="#" class="tab"><span class="tab__text">Borders</span></a></li>
      <li><a href="#" class="tab"><span class="tab__text">Calendar</span></a></li>
      <li><a href="#" class="tab"><span class="tab__text">Suppliers</span></a></li>
    </ul>
  </nav>`;

const menuButton = (id = 'main') => `
  <button type="button" class="button button--plain button--icon @3xl:hide" popovertarget="${id}-menu" aria-label="Menu">${icon('Navigation')}</button>
  <div id="${id}-menu" popover class="popover popover--end-aligned">
    <menu class="menu" aria-label="Main">
      <li><a href="#" class="button" aria-current="page">Plants</a></li>
      <li><a href="#" class="button">Borders</a></li>
      <li><a href="#" class="button">Calendar</a></li>
      <li><a href="#" class="button">Suppliers</a></li>
    </menu>
  </div>`;

const actions = (id = 'main') => `
  <div class="cluster gap-xs">
    <button type="button" class="button button--plain button--icon" aria-label="Search">${icon('Search')}</button>
    <button type="button" class="button button--strong button--accent @max-3xl:hide">Sign in</button>
    ${menuButton(id)}
  </div>`;

const siteBar = (id = 'main') => `<div class="header__bar">${brand}${nav(id)}${actions(id)}</div>`;

const content = (paragraphs = 3) => `
  <main id="main" class="wrapper stack py-lg px-md">
    <h1 class="heading">Shade-loving perennials</h1>
    ${Array.from({ length: paragraphs }, (_, i) => `
      <p class="text">Woodland plants want soil that holds moisture but drains. Dig in leaf mould before planting, and mulch every spring. ${i + 1}</p>
      <p><a href="#" class="link">Read about plant ${i + 1}</a></p>`).join('')}
  </main>`;

export const Playground: Story = {
  args: { prominence: 'default', compact: false, sticky: false },
  argTypes: { prominence: { control: 'inline-radio', options: ['default', 'plain', 'translucent'] } },
  render: (args) => {
    const cls = [
      args.prominence !== 'default' && `header--${args.prominence}`,
      args.compact && 'header--compact',
      args.sticky && 'header--sticky',
    ].filter(Boolean).join(' ');
    return `<header class="header${cls ? ` ${cls}` : ''}">${siteBar('play')}</header>${content(args.sticky ? 12 : 1)}`;
  },
};

export const SiteHeader: Story = {
  name: 'Site header',
  parameters: {
    docs: {
      description: {
        story: 'Brand, navigation and actions in one bar. Narrow the canvas: below the header\'s medium width, the navigation and sign-in give way to a menu button that opens a popover.',
      },
    },
  },
  render: () => `
    <a href="#main" class="skip-link">Skip to content</a>
    <header class="header">${siteBar('site')}</header>
    ${content(1)}`,
};

export const TwoRows: Story = {
  name: 'Two rows',
  parameters: {
    docs: {
      description: {
        story: 'Two bars in one `<header>`, with a rule between them. The second holds a breadcrumb and a page action.',
      },
    },
  },
  render: () => `
    <header class="header">
      ${siteBar('rows')}
      <div class="header__bar">
        <nav class="breadcrumb" aria-label="Breadcrumb">
          <ol class="small-text">
            <li><a href="#" class="link">Plants</a></li>
            <li><a href="#" class="link">Perennials</a></li>
            <li aria-current="page">Brunnera</li>
          </ol>
        </nav>
        <button type="button" class="button button--sm">${icon('Edit')}<span>Edit</span></button>
      </div>
    </header>
    ${content(1)}`,
};

export const Sticky: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Scroll the frame: the shadow appears once the header is stuck. Tab back up through the links: each focused link scrolls clear of the header.',
      },
    },
  },
  render: () => `
    <div class="sb-demo-viewport">
      <header class="header header--sticky header--translucent">${siteBar('sticky')}</header>
      ${content(14)}
    </div>`,
};

export const Prominence: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Default has a surface and a bottom border; `--plain` has neither; `--translucent` lets content show through, with a blur (solid under more contrast). These are `<div class="header">` so the story has no banner landmarks.',
      },
    },
  },
  render: () => `
    <div class="stack gap-lg p-md">
      ${['', 'header--plain', 'header--translucent'].map((cls) => `
        <div class="stack gap-xs">
          <p class="micro-heading">${cls ? `--${cls.split('--')[1]}` : 'Default'}</p>
          <div class="header ${cls}">
            <div class="header__bar">${brand}<button type="button" class="button">Sign in</button></div>
          </div>
        </div>`).join('')}
    </div>`,
};

export const CompactAppHeader: Story = {
  name: 'Compact app header',
  parameters: {
    docs: {
      description: {
        story: '`--compact` steps the bar\'s padding, the buttons and the text inside down. A dark header is the `.color-scheme-dark` utility on the band.',
      },
    },
  },
  render: () => `
    <header class="header header--compact color-scheme-dark">
      <div class="header__bar">
        <span class="lockup">
          <a href="#" class="brand"><span class="brand__name">Border planner</span></a>
          <span class="small-text text-muted">Saved 2 minutes ago</span>
        </span>
        <div class="cluster gap-xs">
          <button type="button" class="button button--plain button--icon" aria-label="Undo">${icon('ArrowStart')}</button>
          <button type="button" class="button">${icon('Share')}<span>Share</span></button>
          <button type="button" class="button button--strong button--accent">Publish</button>
        </div>
      </div>
    </header>
    ${content(1)}`,
};

export const RightToLeft: Story = {
  name: 'Right to left',
  render: () => `
    <div dir="rtl" lang="ar">
      <header class="header">
        <div class="header__bar">
          <a href="#" class="brand"><span class="brand__name">نباتات الغابة</span></a>
          <nav class="header__nav tab-list tab-list--plain tab-list--scrollable" aria-label="رئيسي">
            <ul>
              <li><a href="#" class="tab" aria-current="page"><span class="tab__text">النباتات</span></a></li>
              <li><a href="#" class="tab"><span class="tab__text">الأحواض</span></a></li>
              <li><a href="#" class="tab"><span class="tab__text">التقويم</span></a></li>
            </ul>
          </nav>
          <button type="button" class="button button--strong button--accent">تسجيل الدخول</button>
        </div>
      </header>
    </div>`,
};

export const StretchAndPhoneDensity: Story = {
  name: 'Stretch, and compact on a phone',
  parameters: { docs: { description: { story: '`--stretch` drops the width cap on the bars. `max-md:header--compact` steps the Header down below 48rem only. These are `<div class="header">` so the story has no banner landmarks.' } } },
  render: () => `
    <div class="stack gap-lg p-md">
      <div class="header header--stretch">
        <div class="header__bar">${brand}<button type="button" class="button">Sign in</button></div>
      </div>
      <div class="header max-md:header--compact">
        <div class="header__bar">${brand}<button type="button" class="button">Sign in</button></div>
      </div>
    </div>`,
};

const overSidebar = (id: string, density = '') => `
  <div class="app ${density}">
    <div class="header header--flush header--stretch">
      <div class="header__bar">
        <div class="split split--three @3xl:split--sidebar">
          ${brand}
          <form role="search" aria-label="Plants, ${id}">
            <input type="search" class="input input--subtle inline-size-full" placeholder="Search plants" aria-label="Search plants, ${id}">
          </form>
          <div class="cluster cluster--end gap-xs">
            <button type="button" class="button button--plain button--icon">${icon('Bell')}<span class="sr-only">Notifications</span></button>
            <button type="button" class="button">Sign in</button>
          </div>
        </div>
      </div>
    </div>
    <div class="app__workspace">
      <div class="sidebar max-md:hide">
        <div class="sidebar__body">
          <nav class="navigation-tree" aria-label="Sections, ${id}">
            <ol>
              <li><a href="#" class="button" aria-current="page">${icon('Home')}<span>Borders</span></a></li>
              <li><a href="#" class="button">${icon('Calendar')}<span>Calendar</span></a></li>
            </ol>
          </nav>
        </div>
      </div>
      <div class="main p-cushion"><p class="text">The search sits over the main; the brand and the actions over columns as wide as the Sidebar.</p></div>
    </div>
  </div>`;

export const OverASidebar: Story = {
  name: 'Three columns over a Sidebar',
  parameters: {
    docs: {
      description: {
        story: '`--flush` drops the band\'s inline padding (the safe areas stay) and the bar\'s block padding (its height stays). The Split\'s ends take the app\'s sidebar column (`--app-sidebar-width`) from 48em with `@3xl:split--sidebar`, and pad like the Sidebar. In a compact region (`.ui-compact` on the app) the Sidebar and the ends narrow together.',
      },
    },
  },
  render: () => `
    <div class="stack gap-lg">
      ${overSidebar('default')}
      ${overSidebar('compact', 'ui-compact')}
    </div>`,
};
