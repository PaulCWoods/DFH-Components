import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Organisms/Footer',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
The band at the bottom of a page or app: site links, legal text, contact details. On the header's model: the footer draws the band and lays out its rows; what's in a row styles itself. Defined in \`organisms/footer.css\`.

### Markup
\`\`\`html
<footer class="footer">
  <div class="footer__bar">
    <p class="small-text">© 2026 Woodland Plants</p>
    <nav aria-label="Footer">
      <ul class="cluster small-text" role="list">…</ul>
    </nav>
  </div>
</footer>
\`\`\`

- **\`.footer\`** is the band: surface, top border, safe-area padding. Always full width.
- **\`.footer__bar\`** is a row, capped at \`--footer-max-width\` (the site width) and centred, so it lines up with \`.wrapper\`. The last part sits at the end. Two rows are two bars, with a rule between them.
- **\`--compact\`** (or \`max-md:footer--compact\`, \`fine:footer--compact\`) sets \`--ui-sizing: compact\`: the bars' padding and gap tighten and the atoms step down.
- **\`--stacked\`** sets each bar's parts in a column, in source order, at the start: the site links above the legal line.
- **Landmark:** a \`<footer>\` directly in \`<body>\` (or \`.app\`) is the contentinfo: one per page, no \`aria-label\`. Link lists that navigate the site are a \`<nav aria-label>\`.
- **Tokens:** \`--footer-bg\`, \`--footer-border-*\`, \`--footer-padding-block\`, \`--footer-padding-inline\`, \`--footer-gap\`, \`--footer-max-width\`.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const links = (label: string, items: string[]) => `
  <nav class="stack gap-xs" aria-labelledby="f-${label.toLowerCase()}">
    <h2 id="f-${label.toLowerCase()}" class="micro-heading">${label}</h2>
    <ul class="stack gap-xs small-text" role="list">
      ${items.map((i) => `<li><a href="#" class="link">${i}</a></li>`).join('')}
    </ul>
  </nav>`;

export const SiteFooter: Story = {
  name: 'Site footer',
  render: () => `
    <main id="main" class="main"><div class="wrapper"><p class="text">Page content.</p></div></main>
    <footer class="footer">
      <div class="footer__bar">
        <p class="small-text text-muted">© 2026 Woodland Plants</p>
        <nav aria-label="Footer">
          <ul class="cluster small-text" role="list">
            <li><a href="#" class="link">Accessibility</a></li>
            <li><a href="#" class="link">Privacy</a></li>
            <li><a href="#" class="link">Contact</a></li>
          </ul>
        </nav>
      </div>
    </footer>`,
};

export const TwoRows: Story = {
  name: 'Two rows',
  parameters: { docs: { description: { story: 'A row of link lists in a grid, and a row of legal text, with a rule between them.' } } },
  render: () => `
    <main id="main" class="main"><div class="wrapper"><p class="text">Page content.</p></div></main>
    <footer class="footer">
      <div class="footer__bar">
        <div class="grid grid--3-col grid--2xs">
          ${links('Plants', ['Perennials', 'Ferns', 'Grasses'])}
          ${links('Garden', ['Borders', 'Calendar', 'Suppliers'])}
          ${links('About', ['Accessibility', 'Privacy', 'Contact'])}
        </div>
      </div>
      <div class="footer__bar">
        <p class="small-text text-muted">© 2026 Woodland Plants</p>
        <a href="#" class="link small-text">Back to top</a>
      </div>
    </footer>`,
};

export const Stacked: Story = {
  name: 'Stacked',
  parameters: { docs: { description: { story: '`.footer--stacked`: the parts in a column, in source order, at the start. Site links above the legal line.' } } },
  render: () => `
    <main id="main" class="main"><div class="wrapper"><p class="text">Page content.</p></div></main>
    <footer class="footer footer--stacked">
      <div class="footer__bar">
        <nav aria-label="Footer">
          <ul class="cluster small-text" role="list">
            <li><a href="#" class="link">Contact</a></li>
            <li><a href="#" class="link">About</a></li>
          </ul>
        </nav>
        <p class="small-text text-muted">© 2026 Woodland Plants</p>
      </div>
    </footer>`,
};

export const Stretch: Story = {
  parameters: { docs: { description: { story: '`--stretch` drops the width cap on the bars.' } } },
  render: () => `
    <main id="main" class="main"><div class="wrapper"><p class="text">Page content.</p></div></main>
    <footer class="footer footer--stretch">
      <div class="footer__bar">
        <p class="small-text text-muted">© 2026 Woodland Plants</p>
        <nav aria-label="Footer">
          <ul class="cluster small-text" role="list">
            <li><a href="#" class="link">Contact</a></li>
            <li><a href="#" class="link">About</a></li>
          </ul>
        </nav>
      </div>
    </footer>`,
};

export const Compact: Story = {
  parameters: { docs: { description: { story: '`--compact`: the bars\' padding and gap tighten, and the Buttons and text step down. An app\'s action bar.' } } },
  render: () => `
    <main id="main" class="main"><div class="wrapper"><p class="text">Page content.</p></div></main>
    <footer class="footer footer--compact footer--stretch">
      <div class="footer__bar">
        <p class="small-text text-muted">All changes saved</p>
        <div class="button-group">
          <button type="button" class="button">Export</button>
          <button type="button" class="button button--strong button--accent">Save</button>
        </div>
      </div>
    </footer>`,
};
