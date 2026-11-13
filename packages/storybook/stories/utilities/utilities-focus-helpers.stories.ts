import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Utilities/Focus',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Moves the focus ring to a container while a control inside it has keyboard focus, and drops the nested ring so there is one indicator. Defined in \`utilities/focus-helpers.css\`. WCAG 2.4.7 Focus Visible, 2.4.13 Focus Appearance.

| Class | Effect |
| :--- | :--- |
| \`.focus-within\` | The container takes the ring while anything inside has \`:focus-visible\`; the nested ring is dropped. |
| \`.focus-within--input\` | The same, but only for a text control: a button beside it keeps its own ring. |
| \`.focus-within--inset\` | Draws the container's ring inside its edge, for flush or clipped containers. |
| \`.focus-within--border\` | The container's border takes the ring colour too. |
| \`.focus-ring\` | The standard ring on an element the reset doesn't ring, such as a focusable scrolling region. |
| \`.focus-ring--inset\` | Draws an element's own ring inside its edge, for a scrolling region whose edge is clipped or flush with its container. |

- Use the container ring when the controls inside read as one control: a search box with a clear button, a field with a unit.
- Never remove a ring without drawing another. There is no class that only removes one.
- The container ring follows the same tokens as every ring (\`--focus-ring-width\`, \`--focus-ring-color\`, \`--focus-ring-offset\`).

Press <kbd>Tab</kbd> through the examples to see the rings.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const searchIcon = `<svg class="icon text-muted" aria-hidden="true"><use href="#search"></use></svg>`;

export const ContainerRing: Story = {
  parameters: { docs: { description: { story: 'A search box: the input, the clear button and the submit button share one ring on the container.' } } },
  render: () => `
    <form class="inline border rounded-md bg-surface ps-sm max-inline-size-sm focus-within" role="search" aria-label="Plants">
      ${searchIcon}
      <input type="search" class="input input--plain" placeholder="Search plants" aria-label="Search plants" />
      <button type="button" class="button button--plain button--icon" aria-label="Clear">
        <svg class="icon" aria-hidden="true"><use href="#x"></use></svg>
      </button>
      <button type="submit" class="button button--strong button--accent">Search</button>
    </form>`,
};

export const InputOnly: Story = {
  parameters: { docs: { description: { story: '`.focus-within--input`: the container rings for the input; the Copy button keeps its own ring.' } } },
  render: () => `
    <div class="field max-inline-size-sm">
      <label for="share-link" class="field__label label">Share link</label>
      <div class="inline border rounded-md bg-surface ps-sm focus-within--input">
        <input id="share-link" type="text" class="input input--plain" value="https://example.com/beds/3" readonly />
        <button type="button" class="button button--plain">
          <svg class="icon" aria-hidden="true"><use href="#copy"></use></svg>
          <span>Copy</span>
        </button>
      </div>
    </div>`,
};

export const InsetAndBorder: Story = {
  parameters: { docs: { description: { story: 'The ring inside the edge of a flush row, and the border taking the ring colour.' } } },
  render: () => `
    <div class="stack max-inline-size-sm">
      <div class="inline border-y ps-sm focus-within focus-within--inset">
        ${searchIcon}
        <input type="search" class="input input--plain" placeholder="Filter the log" aria-label="Filter the log" />
      </div>
      <div class="inline border rounded-md ps-sm focus-within focus-within--border">
        ${searchIcon}
        <input type="search" class="input input--plain" placeholder="Find a seed" aria-label="Find a seed" />
      </div>
    </div>`,
};

export const StandaloneRing: Story = {
  parameters: { docs: { description: { story: '`.focus-ring` on a scrolling region that takes focus so keyboard users can scroll it.' } } },
  render: () => `
    <div class="card max-inline-size-xs">
      <div class="card__header"><h2 id="sow-title" class="small-heading">Sowing dates</h2></div>
      <div class="card__body max-block-size-2xs overflow-y-auto focus-ring" tabindex="0" role="region" aria-labelledby="sow-title">
        <ul class="stack" role="list">
          ${['Broad beans: February', 'Peas: March', 'Carrots: April', 'Runner beans: May', 'Kale: June', 'Spring cabbage: July', 'Garlic: October'].map((t) => `<li class="small-text">${t}</li>`).join('')}
        </ul>
      </div>
    </div>`,
};

export const InsetRing: Story = {
  name: 'Inset ring',
  parameters: { docs: { description: { story: '`.focus-ring--inset` on a carousel in a flush card canvas: the ring sits inside the edge, where the card would otherwise clip it.' } } },
  render: () => `
    <div class="card max-inline-size-xs">
      <div class="card__canvas p-0">
        <ul class="cluster scroll-fade overflow-x-auto p-xs focus-ring focus-ring--inset" role="list" tabindex="0" aria-label="Sowing months">
          ${['February', 'March', 'April', 'May', 'June', 'July', 'October'].map((t) => `<li class="small-text whitespace-nowrap">${t}</li>`).join('')}
        </ul>
      </div>
      <div class="card__body"><p class="small-text">Scroll the row with the arrow keys once it has focus.</p></div>
    </div>`,
};
