import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Molecules/Breadcrumb',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
The trail of ancestors of the current page: a line of links ending in the current page. The breadcrumb lays out the trail and draws the separators; type comes from a text atom on the list, and the links are \`.link\` atoms, made plain.

### Markup
\`\`\`html
<nav class="breadcrumb" aria-label="Breadcrumb">
  <ol class="small-text">
    <li><a class="link" href="/topics">Topics</a></li>
    <li><a class="link" href="/topics/visual-design">Visual design</a></li>
    <li aria-current="page">Modular scale</li>
  </ol>
</nav>
\`\`\`

- **Current page** is the last item with \`aria-current="page"\`: plain text, or a link when the page links to itself.
- **Links** are plain (\`--link-prominence: plain\`): link colour, underlined on hover and focus.
- **Separators** are generated with empty alternative text (\`content: "/" / ""\`), so screen readers skip them. Change the character with \`--breadcrumb-separator\`.
- **Type** is whatever text atom the list carries: \`.small-text\` for most pages.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const trail = ['Home', 'Documentation', 'Components', 'Molecules'];

const crumbs = (depth: number, current: string, cls = 'small-text', label = 'Breadcrumb') => `
  <nav class="breadcrumb" aria-label="${label}">
    <ol class="${cls}">
      ${trail.slice(0, depth - 1).map((t) => `<li><a class="link" href="#${t.toLowerCase()}">${t}</a></li>`).join('')}
      <li aria-current="page">${current}</li>
    </ol>
  </nav>`;

export const Playground: Story = {
  args: { depth: 4, current: 'Breadcrumb', text: 'small-text' },
  argTypes: {
    depth: { control: { type: 'range', min: 2, max: 5 } },
    text: { control: 'inline-radio', options: ['small-text', 'text'] },
  },
  render: (args) => crumbs(args.depth, args.current, args.text),
};

export const CurrentPageAsALink: Story = {
  name: 'Current page as a link',
  render: () => `
    <nav class="breadcrumb" aria-label="Breadcrumb">
      <ol class="small-text">
        <li><a class="link" href="#settings">Settings</a></li>
        <li><a class="link" href="#team">Team</a></li>
        <li><a class="link" href="#permissions" aria-current="page">Permissions</a></li>
      </ol>
    </nav>`,
};

export const Separator: Story = {
  render: () => `
    <div class="stack">
      <div style="--breadcrumb-separator: '›';">${crumbs(3, 'Audio equipment', 'small-text', 'Breadcrumb, chevron separator')}</div>
      <div style="--breadcrumb-separator: '·';">${crumbs(3, 'Audio equipment', 'small-text', 'Breadcrumb, dot separator')}</div>
    </div>`,
};

export const Wrapping: Story = {
  render: () => `
    <div style="max-inline-size: 18rem;">
      <nav class="breadcrumb" aria-label="Breadcrumb, wrapping">
        <ol class="small-text">
          <li><a class="link" href="#system">System</a></li>
          <li><a class="link" href="#packages">packages</a></li>
          <li><a class="link" href="#css">css</a></li>
          <li><a class="link" href="#molecules">src/molecules</a></li>
          <li aria-current="page">breadcrumb.css</li>
        </ol>
      </nav>
    </div>`,
};

export const RightToLeft: Story = {
  name: 'Right to left',
  render: () => `<div dir="rtl">${crumbs(4, 'Breadcrumb', 'small-text', 'Breadcrumb, right to left')}</div>`,
};
