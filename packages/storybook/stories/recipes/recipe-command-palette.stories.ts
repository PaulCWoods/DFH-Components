import type { Meta, StoryObj } from '@storybook/html';
import { enhancePalette, palette, paletteOpener, type PaletteState } from './command-palette/palette';

const meta: Meta = {
  title: 'Recipes/Command Palette',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
A search-everything palette: a modal dialog whose card is a combobox with an always-open list. ⌘K or the Search button opens it; typing filters; the arrow keys move through the results; Enter chooses.

**Composes:** dialog (§2), card (§10), combobox with \`.combobox__listbox--static\` (§28), empty state (§27), skeleton (§26), kbd (§5).

**Decisions:**
- **The card is the combobox** (\`.card.combobox\`). The control sits in the card's header and the list in its body, so the options get the combobox's sizes and the card scrolls the body between a pinned header and footer.
- **The list is static**, not a popover: it is the dialog's content, always shown, with \`aria-expanded="true"\` on the input. Groups are \`role="group"\` lists with a label; a rule separates them.
- **Focus stays in the input.** The active option is \`.is-active\` with \`aria-activedescendant\`, as in any combobox. No result is a link or a button.
- **No results** shows an empty state and says "No results" in the status element. **Loading** marks the body \`aria-busy\` with skeleton rows.
- \`closedby="any"\`: a click outside closes it, since it holds nothing to lose.
- **The script is the product's** (\`command-palette/palette.ts\`): filtering, arrow keys, the active option and ⌘K, as §28 E lists. The App Header recipe and the docs site use the same markup.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const render = (state: PaletteState) => () => {
  const el = document.createElement('div');
  el.innerHTML = `${paletteOpener('cmd-palette', 'button')}${palette({ state })}`;
  enhancePalette(el);
  return el;
};

const openOnLoad: Story['play'] = async ({ canvasElement }) => {
  canvasElement.querySelector<HTMLDialogElement>('dialog')?.showModal();
};

export const Default: Story = {
  parameters: { docs: { description: { story: 'Open, with the first result active. Type to filter; ↑ and ↓ move.' } } },
  render: render('results'),
  play: openOnLoad,
};

export const NoResults: Story = {
  parameters: { docs: { description: { story: 'Nothing matches: the list hides itself and the empty state shows.' } } },
  render: render('no-results'),
  play: openOnLoad,
};

export const Loading: Story = {
  parameters: { docs: { description: { story: 'Results loading: skeleton rows in an `aria-busy` body, and "Loading" in the status element.' } } },
  render: render('loading'),
  play: openOnLoad,
};
