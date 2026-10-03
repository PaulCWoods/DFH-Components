import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Components/Breadcrumb',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
**Breadcrumb Primitive** provides accessible navigational trails adhering to WCAG 2.2 Level AA/AAA.

### Accessibility Highlights
- **Semantic Structure**: Uses \`<nav class="breadcrumb" aria-label="Breadcrumb">\` with an ordered list (\`<ol>\`).
- **Active Current Page**: Uses \`aria-current="page"\` on the last item for screen readers and bold emphasis.
- **Speech-Alternative Separator**: Decorative slashes use \`content: "/" / ""\` to prevent redundant screen reader announcements.
`,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => `
    <nav class="breadcrumb" aria-label="Breadcrumb">
      <ol>
        <li><a class="link" href="/topics">Topics</a></li>
        <li><a class="link" href="/topics/visual-design">Visual Design</a></li>
        <li><a class="link" href="/topics/visual-design/typography">Typography</a></li>
        <li aria-current="page">Modular Scale</li>
      </ol>
    </nav>
  `,
};

export const DeepTrail: Story = {
  render: () => `
    <nav class="breadcrumb" aria-label="Breadcrumb">
      <ol>
        <li><a class="link" href="/">Home</a></li>
        <li><a class="link" href="/docs">Documentation</a></li>
        <li><a class="link" href="/docs/components">Components</a></li>
        <li><a class="link" href="/docs/components/navigation">Navigation</a></li>
        <li aria-current="page">Pagination</li>
      </ol>
    </nav>
  `,
};
