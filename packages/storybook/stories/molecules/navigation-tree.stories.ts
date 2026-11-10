import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Molecules/Navigation Tree',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
Nested links to the sections of a site or a page: a docs sidebar, a table of contents. Its items are buttons, as in the menu; the tree makes them plain and full width, and adds nesting, guide lines and the current location.

### Markup
\`\`\`html
<nav class="navigation-tree" aria-label="Documentation">
  <ol>
    <li class="navigation-tree__heading"><h2 class="micro-heading">Guides</h2></li>
    <li><a href="/start" class="button"><span>Getting started</span></a></li>
    <li>
      <a href="/tokens" class="button" aria-current="page"><span>Tokens</span></a>
      <ol>
        <li><a href="/tokens/global" class="button"><span>Global</span></a></li>
        <li><a href="/tokens/semantic" class="button"><span>Semantic</span></a></li>
      </ol>
    </li>
  </ol>
</nav>
\`\`\`

- **Current location:** \`aria-current\` on the link (\`page\` for a site, \`location\` or \`true\` for a table of contents). It shows bold text in the foreground colour, a tint and a square rail inside the button's start edge; other items are regular weight in a quieter colour. Nested lists, guide lines and headings all line up on the item label.
- **Nesting** is nested lists inside the item; in a \`<details>\`, the group collapses. **Dividers** are \`<li role="separator" class="divider">\`. **Headings** are \`<li class="navigation-tree__heading">\` with a text atom.
- **Options:** \`--ruled\` (guide lines beside nested lists), \`--compact\` (32px rows; the button keeps its 48px hit area unless the product opts into fine-pointer targets).
- **Not a menu:** a menu is actions in a popover; a tree is navigation with depth and a current location. **Not a tab list:** tabs switch views of one thing.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

type Node = { label: string; current?: boolean; meta?: string; children?: Node[] };

const docs: Node[] = [
  { label: 'Getting started', children: [
    { label: 'Installation' },
    { label: 'Tokens', current: true, children: [{ label: 'Global' }, { label: 'Semantic' }, { label: 'Component' }] },
  ] },
  { label: 'Components', children: [{ label: 'Atoms' }, { label: 'Molecules' }, { label: 'Organisms' }] },
  { label: 'Accessibility' },
];

const slug = (s: string) => s.toLowerCase().replace(/\s+/g, '-');

const list = (nodes: Node[], current = 'page'): string => `<ol>${nodes.map((n) => `
  <li>
    <a href="#${slug(n.label)}" class="button"${n.current ? ` aria-current="${current}"` : ''}><span>${n.label}</span>${n.meta ?? ''}</a>
    ${n.children ? list(n.children, current) : ''}
  </li>`).join('')}</ol>`;

const tree = (cls: string, label: string, nodes = docs, current = 'page') =>
  `<nav class="navigation-tree${cls ? ` ${cls}` : ''}" aria-label="${label}">${list(nodes, current)}</nav>`;

export const Playground: Story = {
  args: { ruled: true, compact: false },
  render: (args) => `
    <div style="max-inline-size: 18rem;">
      ${tree([args.ruled && 'navigation-tree--ruled', args.compact && 'navigation-tree--compact'].filter(Boolean).join(' '), 'Documentation')}
    </div>`,
};

export const WithHeadings: Story = {
  name: 'With headings',
  render: () => `
    <div style="max-inline-size: 18rem;">
      <nav class="navigation-tree" aria-label="Library">
        <ol>
          <li class="navigation-tree__heading"><h2 class="micro-heading">Foundations</h2></li>
          <li><a href="#colour" class="button"><span>Colour</span></a></li>
          <li><a href="#type" class="button" aria-current="page"><span>Typography</span></a></li>
          <li class="navigation-tree__heading"><h2 class="micro-heading">Components</h2></li>
          <li><a href="#button" class="button"><span>Button</span><span class="status status--plain status--success"><span class="status__text">Stable</span></span></a></li>
          <li><a href="#menu" class="button"><span>Menu</span><span class="status status--plain status--info"><span class="status__text">New</span></span></a></li>
        </ol>
      </nav>
    </div>`,
};

export const TableOfContents: Story = {
  name: 'Table of contents',
  render: () => `
    <div class="max-w-xs">
      <nav class="navigation-tree navigation-tree--ruled navigation-tree--compact" aria-labelledby="toc-heading">
        <ol>
          <li class="navigation-tree__heading"><h2 id="toc-heading" class="micro-heading">On this page</h2></li>
          <li><a href="#overview" class="button"><span>Overview</span></a></li>
          <li>
            <a href="#markup" class="button" aria-current="location"><span>Markup</span></a>
            <ol>
              <li><a href="#current-location" class="button"><span>Current location</span></a></li>
              <li><a href="#nesting" class="button"><span>Nesting</span></a></li>
            </ol>
          </li>
          <li><a href="#options" class="button"><span>Options</span></a></li>
          <li><a href="#accessibility" class="button"><span>Accessibility</span></a></li>
        </ol>
      </nav>
    </div>`,
};

export const InACard: Story = {
  name: 'In a card',
  render: () => `
    <article class="card" style="max-inline-size: 20rem;">
      <header class="card__header"><h3 class="card__title heading">Settings</h3></header>
      <div class="card__body">
        ${tree('', 'Settings', [
          { label: 'Profile' },
          { label: 'Notifications', meta: '<span class="badge badge--sm" aria-hidden="true"><span class="badge__text">3</span></span><span class="sr-only">, 3 unread</span>' },
          { label: 'Security', current: true, children: [{ label: 'Passkeys' }, { label: 'Sessions' }] },
        ])}
      </div>
    </article>`,
};

export const CollapsibleGroups: Story = {
  name: 'Collapsible groups and dividers',
  parameters: {
    docs: {
      description: {
        story: 'A nested list in a `<details>` collapses. After a link to the group\'s page, the summary is the toggle alone, named in hidden text; a group without a page uses its summary as its item. `<li role="separator" class="divider">` separates groups.',
      },
    },
  },
  render: () => `
    <article class="card" style="max-inline-size: 20rem;">
      <header class="card__header"><h3 class="card__title heading">Lessons</h3></header>
      <div class="card__body">
        <nav class="navigation-tree navigation-tree--compact" aria-label="Course lessons">
          <ol>
            <li>
              <a href="/lessons/basics" class="button"><span>Basics</span></a>
              <details open>
                <summary class="button"><span class="sr-only">Lessons in Basics</span></summary>
                <ol>
                  <li><a href="/lessons/basics/headings" class="button" aria-current="page"><span>Headings</span></a></li>
                  <li><a href="/lessons/basics/links" class="button"><span>Links</span></a></li>
                </ol>
              </details>
            </li>
            <li role="separator" class="divider"></li>
            <li>
              <details>
                <summary class="button"><span>Forms</span></summary>
                <ol>
                  <li><a href="/lessons/forms/labels" class="button"><span>Labels</span></a></li>
                  <li><a href="/lessons/forms/errors" class="button"><span>Errors</span></a></li>
                </ol>
              </details>
            </li>
          </ol>
        </nav>
      </div>
    </article>`,
};

export const RuledGroups: Story = {
  name: 'Collapsible groups, ruled',
  render: () => `
    <div style="max-inline-size: 18rem;">
      <nav class="navigation-tree navigation-tree--ruled" aria-label="Documentation, collapsible">
        <ol>
          <li>
            <a href="#start" class="button"><span>Getting started</span></a>
            <details>
              <summary class="button"><span class="sr-only">Pages in Getting started</span></summary>
              <ol>
                <li><a href="#install" class="button"><span>Installation</span></a></li>
              </ol>
            </details>
          </li>
          <li>
            <details open>
              <summary class="button"><span>Components</span></summary>
              <ol>
                <li><a href="#atoms" class="button" aria-current="page"><span>Atoms</span></a></li>
                <li><a href="#molecules" class="button"><span>Molecules</span></a></li>
              </ol>
            </details>
          </li>
          <li role="separator" class="divider"></li>
          <li><a href="#accessibility" class="button"><span>Accessibility</span></a></li>
        </ol>
      </nav>
    </div>`,
};

export const LongLabels: Story = {
  name: 'Long labels wrap',
  render: () => `
    <div style="max-inline-size: 14rem;">
      ${tree('navigation-tree--ruled', 'Long labels', [
        { label: 'Designing accessible colour palettes for dark mode', current: true },
        { label: 'Fluid type', children: [{ label: 'Choosing a minimum and maximum size for every step' }] },
      ])}
    </div>`,
};

export const RightToLeft: Story = {
  name: 'Right to left',
  render: () => `<div dir="rtl" style="max-inline-size: 18rem;">${tree('navigation-tree--ruled', 'Documentation, right to left')}</div>`,
};
