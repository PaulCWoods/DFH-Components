import type { Meta, StoryObj } from '@storybook/html';
import logoLight from '../../../docs/public/examples/brand-logo.svg';
import logoDark from '../../../docs/public/examples/brand-logo-dark.svg';
import markLight from '../../../docs/public/examples/brand-mark.svg';
import markDark from '../../../docs/public/examples/brand-mark-dark.svg';

const meta: Meta = {
  title: 'Atoms/Brand',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
The product's logo and name, as a link home. A whole link on its own: it takes no \`.link\` class.

### Markup
\`\`\`html
<a href="/" class="brand">
  <svg class="brand__mark icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#brand-design-for-humans"/></svg>
  <span class="brand__name">Design For Humans</span>
</a>

<!-- A Logo, with the Mark to stand in for it, in light and dark versions -->
<a href="/" class="brand">
  <img class="brand__logo dark:hide" src="logo.svg" alt="" width="271" height="32">
  <img class="brand__logo light:hide" src="logo-dark.svg" alt="" width="271" height="32">
  <img class="brand__mark dark:hide" src="mark.svg" alt="" width="32" height="32">
  <img class="brand__mark light:hide" src="mark-dark.svg" alt="" width="32" height="32">
  <span class="brand__name">Plant Finder</span>
</a>
\`\`\`

- **Parts:** any can be left out. Without a Name, name the link with \`.sr-only\` text.
- **Logo:** \`.brand__logo\`, an \`<img>\` or \`<svg>\`, as tall as \`--brand-mark-size\`. Beside it the Mark is hidden, waiting to stand in.
- **Mark alone:** with no Name or Logo beside it, the Mark is a Button's size (\`--brand-mark-alone-size\`), stepping down with Buttons in a compact container.
- **Narrow containers:** at 20em and under (a phone, a Sidebar rail), a Brand with a Mark shows the Mark alone; the Name is hidden visually and still names the link.
- **Light and dark:** a single-colour SVG in \`currentColor\` follows \`--brand-color\`. Two files take \`dark:hide\` (the light one) and \`light:hide\` (the dark one).
- **Labels hidden:** \`hide-labels\` or a condition's (\`max-md:hide-labels\`), on the Brand or a region around it, shows the Mark alone at a Button's size, as Buttons show only their icons.
- **Images are decorative:** \`alt=""\` or \`aria-hidden\`; the Name names the link.
- **Density:** a compact container (\`--ui-sizing: compact\`) steps the name and the target down.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const mark = `<svg class="brand__mark icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#brand-design-for-humans"/></svg>`;

export const MarkAndName: Story = {
  render: () => `<a href="#" class="brand">${mark}<span class="brand__name">Design For Humans</span></a>`,
};

export const NameOnly: Story = {
  render: () => `<a href="#" class="brand"><span class="brand__name">Woodland Plants</span></a>`,
};

export const MarkOnly: Story = {
  render: () => `<a href="#" class="brand">${mark}<span class="sr-only">Design For Humans home</span></a>`,
};

export const MenuButton: Story = {
  name: 'As a menu button',
  render: () => `<button type="button" class="brand">${mark}<span class="sr-only">Menu</span></button>`,
};

export const Compact: Story = {
  render: () => `<div class="ui-compact"><a href="#" class="brand">${mark}<span class="brand__name">Design For Humans</span></a></div>`,
};

export const CompactMarkAlone: Story = {
  name: 'Compact, Mark on its own',
  parameters: { docs: { description: { story: 'A Mark on its own is a Button\'s size, so in a compact container it steps down with the Buttons beside it.' } } },
  render: () => `
    <div class="ui-compact cluster">
      <a href="#" class="brand">${mark}<span class="sr-only">Design For Humans home</span></a>
      <button type="button" class="button button--icon"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#search"/></svg><span class="sr-only">Search</span></button>
    </div>`,
};

const logo = `<img class="brand__logo dark:hide" src="${logoLight}" alt="" width="271" height="32"><img class="brand__logo light:hide" src="${logoDark}" alt="" width="271" height="32"><img class="brand__mark dark:hide" src="${markLight}" alt="" width="32" height="32"><img class="brand__mark light:hide" src="${markDark}" alt="" width="32" height="32">`;

export const LogoAndName: Story = {
  name: 'Logo and name',
  parameters: { docs: { description: { story: 'A company Logo beside the product\'s Name. The Mark is in the markup too, hidden until there\'s no room for the Logo.' } } },
  render: () => `<a href="#" class="brand">${logo}<span class="brand__name">Plant Finder</span></a>`,
};

export const LogoOnly: Story = {
  name: 'Logo only',
  render: () => `<a href="#" class="brand">${logo}<span class="sr-only">Woodland home</span></a>`,
};

export const LightAndDark: Story = {
  name: 'Light and dark versions',
  parameters: { docs: { description: { story: '`dark:hide` on the light files and `light:hide` on the dark ones. A dark band (`.color-scheme-dark`) or an inverted palette shows the dark versions.' } } },
  render: () => `
    <div class="stack">
      <div class="p-md"><a href="#light" class="brand">${logo}<span class="brand__name">Plant Finder</span></a></div>
      <div class="color-scheme-dark bg-surface p-md"><a href="#dark" class="brand">${logo}<span class="brand__name">Plant Finder</span></a></div>
    </div>`,
};

export const CurrentColour: Story = {
  name: 'Logo in the Brand colour',
  parameters: { docs: { description: { story: 'An SVG drawn in `currentColor` takes `--brand-color`, and its hover and dark-mode colours, with no second file.' } } },
  render: () => `
    <a href="#" class="brand">
      <svg class="brand__logo" viewBox="0 0 132 32" width="132" height="32" aria-hidden="true" focusable="false">
        <rect width="32" height="32" rx="7" fill="currentColor"/>
        <text x="41" y="23" font-size="19" font-weight="700" fill="currentColor">Woodland</text>
      </svg>
      <span class="brand__name">Plant Finder</span>
    </a>`,
};

export const MarkStandsIn: Story = {
  name: 'Mark standing in, in a narrow container',
  parameters: { docs: { description: { story: 'In a container 20em wide or less, such as a Sidebar rail, the Mark replaces the Logo at a Button\'s size; the Name is hidden visually and still names the link.' } } },
  render: () => `<div class="container-inline max-inline-size-xs"><a href="#" class="brand">${logo}<span class="brand__name">Plant Finder</span></a></div>`,
};

export const LabelsHidden: Story = {
  name: 'Labels hidden',
  parameters: { docs: { description: { story: '`max-md:hide-labels` shows the Mark alone below 48rem, at a Button\'s size, as Buttons in the same region show only their icons. Here `hide-labels` shows it at every width.' } } },
  render: () => `<a href="#" class="brand hide-labels">${logo}<span class="brand__name">Plant Finder</span></a>`,
};
