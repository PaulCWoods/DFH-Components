import type { Meta, StoryObj } from '@storybook/html';

interface SkipLinkArgs {
  label: string;
  floating: boolean;
}

/** Focuses the first skip link in the story, so its open state shows without tabbing. */
const focusFirst: Story['play'] = async ({ canvasElement }) => {
  canvasElement.querySelector<HTMLAnchorElement>('.skip-link')?.focus();
};

const page = (skip: string, id: string) => `
  <div class="demo-stage demo-constrained--md" style="position: relative;">
    ${skip}
    <header class="p-md"><span class="small-text text-color-muted">Site header and navigation</span></header>
    <main id="${id}" tabindex="-1" class="p-md"><p class="text">Main content. Press Tab inside the frame to show the skip link.</p></main>
  </div>`;

const meta: Meta<SkipLinkArgs> = {
  title: 'Atoms/Skip Link',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
### Skip Link

Lets keyboard and screen reader users jump past repeated navigation to the main content (WCAG 2.4.1). Put it first in \`<body>\` and point it at a landmark, such as \`<main id="main">\`.

| Variant | Behaviour |
| :--- | :--- |
| \`.skip-link\` | Full-width bar that opens in the flow on focus |
| \`.skip-link--floating\` | Card in the top-start corner; doesn't move the layout |
| \`.skip-links\` | A \`<nav>\` of several skip links; all of them show while one has focus |

- The focused link is at least 48px tall.
- The focus ring uses the link's text colour, so moving through a group stays visible on the accent fill.
- In forced colours it is drawn in \`Highlight\`.

\`\`\`html
<a href="#main" class="skip-link">Skip to main content</a>
\`\`\`
`,
      },
    },
  },
  argTypes: {
    label: { control: 'text' },
    floating: { control: 'boolean', description: '--floating' },
  },
  render: (args) =>
    page(`<a href="#skip-playground-main" class="skip-link${args.floating ? ' skip-link--floating' : ''}">${args.label}</a>`, 'skip-playground-main'),
  play: focusFirst,
};

export default meta;
type Story = StoryObj<SkipLinkArgs>;

/**
 * Interactive sandbox. The link is focused on load.
 */
export const Playground: Story = {
  args: { label: 'Skip to main content', floating: false },
};

/**
 * In the flow: a full-width bar that pushes the page down while focused.
 */
export const InFlow: Story = {
  render: () => page(`<a href="#skip-flow-main" class="skip-link">Skip to main content</a>`, 'skip-flow-main'),
  play: focusFirst,
};

/**
 * Floating: a card in the top-start corner that doesn't move the layout.
 */
export const Floating: Story = {
  render: () => page(`<a href="#skip-float-main" class="skip-link skip-link--floating">Skip to main content</a>`, 'skip-float-main'),
  play: focusFirst,
};

/**
 * A group of skip links. All show while one has focus; Tab moves between them.
 */
export const Group: Story = {
  render: () =>
    page(
      `<nav class="skip-links" aria-label="Skip links">
        <ul>
          <li><a href="#skip-group-main" class="skip-link">Skip to main content</a></li>
          <li><a href="#skip-group-main" class="skip-link">Skip to navigation</a></li>
          <li><a href="#skip-group-main" class="skip-link">Skip to footer</a></li>
        </ul>
      </nav>`,
      'skip-group-main'
    ),
  play: focusFirst,
};
