import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Layout/Bar',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
One row in three zones, a start, a centre and an end, with the centre in the middle of the row whatever the ends hold. For an app or Dialog header, a media player, an editor toolbar or a wizard's footer. A Split or a Cluster lets the middle drift towards the shorter end. Defined in \`layout/bar.css\`.

### Markup
\`\`\`html
<div class="bar">
  <button type="button" class="button button--plain button--icon">…<span class="sr-only">Back</span></button>
  <h2 class="small-heading">Edit bed</h2>
  <button type="button" class="button button--plain button--icon">…<span class="sr-only">Close</span></button>
</div>

<!-- On a Dialog's Card header, or a Header bar -->
<header class="card__header bar">…</header>
<div class="header__bar bar">…</div>
\`\`\`

- **Zones:** the first child is the start, the last the end, any between the centre. Two children are a start and an end; leave a zone empty with an empty element.
- **Narrow:** the ends keep their content's width; the centre moves off-centre only as far as it must, then its text wraps. It's never narrower than its longest word, so nothing overlaps. Add \`truncate\` to cut the centre short instead.
- **A field in the centre:** give the input \`w-full\` and a \`size\` (its width where there's room), and its form \`w-full\` with a cap such as \`max-w-sm\`. A fixed width won't shrink on a phone.
- **Ends that don't fit:** make their Buttons icon-only below a size with a \`hide-labels\` condition, such as \`@max-xl:hide-labels\` on the bar.
- **Height:** never shorter than its targets (\`--spacing-target-min\`).
- **Hooks:** \`--gap\`, \`--align-items\`, set on the bar itself. **Density:** inside a compact region the gap steps down.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const icon = (name: string) => `<svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#${name}"/></svg>`;
const iconButton = (name: string, label: string, cls = 'button--plain') => `<button type="button" class="button ${cls} button--icon">${icon(name)}<span class="sr-only">${label}</span></button>`;
const labelled = (name: string, label: string, cls = '') => `<button type="button" class="button ${cls}">${icon(name)}<span>${label}</span></button>`;

export const DialogHeader: Story = {
  name: 'A Dialog header',
  parameters: { docs: { description: { story: 'Back, the title and Close. The title stays centred although only the ends are Buttons.' } } },
  render: () => `<div class="bar">${iconButton('arrow-left', 'Back')}<h2 class="small-heading">Edit bed</h2>${iconButton('x', 'Close')}</div>`,
};

export const InACard: Story = {
  name: 'On a Card header',
  parameters: { docs: { description: { story: '`bar` on the Card\'s header: the header keeps its padding and the bar lays out its row, as in a Dialog.' } } },
  render: () => `
    <article class="card max-inline-size-sm" aria-labelledby="bed-title">
      <header class="card__header bar">${iconButton('arrow-left', 'Back to beds')}<h2 id="bed-title" class="small-heading">Bed 3</h2>${iconButton('x', 'Close')}</header>
      <div class="card__body"><p class="text">Shade border, north wall. Hellebores, Brunnera and ferns.</p></div>
    </article>`,
};

export const MediaPlayer: Story = {
  name: 'A media player',
  parameters: { docs: { description: { story: 'The controls stay centred however wide the time and the volume are.' } } },
  render: () => `
    <div class="bar">
      <p class="small-text font-mono">1:24 / 3:50</p>
      <div class="button-group" role="group" aria-label="Playback">
        ${iconButton('chevron-first', 'Previous')}
        ${iconButton('play', 'Play', 'button--strong button--accent button--round')}
        ${iconButton('chevron-last', 'Next')}
      </div>
      ${iconButton('volume-2', 'Volume')}
    </div>`,
};

export const WizardFooter: Story = {
  name: 'A wizard footer',
  render: () => `<div class="bar">${labelled('arrow-left', 'Back')}<p class="small-text text-muted">Step 2 of 4</p>${labelled('arrow-right', 'Next', 'button--strong button--accent')}</div>`,
};

export const HeaderBar: Story = {
  name: 'On a Header bar',
  parameters: { docs: { description: { story: '`bar` on a `header__bar`: the menu and the Brand at the start, a search field in the centre, Share at the end. The field is `w-full` with a `size`: it is that wide where there\'s room and shrinks where there isn\'t. Below 64rem the Buttons show only their icons and the Brand only its Mark, so the field keeps room on a phone.' } } },
  render: () => `
    <header class="header">
      <div class="header__bar bar @max-5xl:hide-labels">
        <div class="cluster gap-xs">${iconButton('menu', 'Menu')}<a href="#" class="brand">${icon('brand-design-for-humans').replace('class="icon"', 'class="brand__mark icon"')}<span class="brand__name">Woodland</span></a></div>
        <form role="search" aria-label="Plants" class="max-w-sm w-full">
          <input type="search" class="input input--subtle w-full" size="40" placeholder="Search plants" aria-label="Search plants">
        </form>
        ${labelled('share-2', 'Share')}
      </div>
    </header>`,
};

export const LongCentre: Story = {
  name: 'A long title wraps',
  parameters: { docs: { description: { story: 'Short of room, the centre wraps onto more lines and stays centred between the ends.' } } },
  render: () => `<div class="bar max-inline-size-xs">${iconButton('arrow-left', 'Back')}<h2 class="small-heading">Planting the woodland border this spring</h2>${iconButton('x', 'Close')}</div>`,
};

export const UnevenEnds: Story = {
  name: 'Uneven ends',
  parameters: { docs: { description: { story: 'A wide start and a narrow end: the centre still sits in the middle while there\'s room. Below 48rem the Buttons show only their icons (`max-md:hide-labels`), so the ends fit a phone.' } } },
  render: () => `
    <div class="bar max-md:hide-labels">
      <div class="cluster gap-xs">${labelled('undo-2', 'Undo')}${labelled('redo-2', 'Redo')}</div>
      <h2 class="small-heading">Notes</h2>
      ${iconButton('share-2', 'Share')}
    </div>`,
};

export const StartAndEnd: Story = {
  name: 'A start and an end',
  parameters: { docs: { description: { story: 'Two children are a start and an end.' } } },
  render: () => `<div class="bar">${labelled('arrow-left', 'Back')}${labelled('arrow-right', 'Next', 'button--strong button--accent')}</div>`,
};

export const Compact: Story = {
  parameters: { docs: { description: { story: 'Inside a compact region the gap and the Buttons step down; the bar stays as tall as the target.' } } },
  render: () => `<div class="ui-compact"><div class="bar">${iconButton('arrow-left', 'Back')}<h2 class="small-heading">Edit bed</h2>${iconButton('x', 'Close')}</div></div>`,
};
