import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Utilities/Position, Overflow & Stacking',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Positioning, overflow, overscroll, isolation, z-index and breaks in columns and print. Defined in \`utilities/layout-helpers.css\`.

| Verbose | Shorthand | Sets |
| :--- | :--- | :--- |
| \`.position-relative\` (static, absolute, fixed, sticky) | \`.relative\` … | \`position\` |
| \`.overflow-hidden\` (visible, clip, auto, scroll) | – | \`overflow\` |
| \`.overflow-x-auto\`, \`-x-hidden\`, \`-y-auto\`, \`-y-hidden\` | – | one axis |
| \`.overscroll-behavior-contain\` (auto, none) | \`.overscroll-contain\` … | \`overscroll-behavior\` |
| \`.overscroll-behavior-block-auto\` (contain, none) | \`.overscroll-y-auto\` … | the block axis |
| \`.overscroll-behavior-inline-auto\` (contain, none) | \`.overscroll-x-auto\` … | the inline axis |
| \`.scrollbar-gutter-stable\`, \`-auto\` | – | \`scrollbar-gutter\` |
| \`.isolation-isolate\` | \`.isolate\` | a new stacking context |
| \`.z-base\`, \`-sticky\`, \`-overlay\`, \`-dialog\`, \`-popover\`, \`-toast\`, \`-tooltip\`, \`.z-auto\` | – | \`z-index\` by role |
| \`.break-inside-avoid\` | – | keeps the element whole in one column or page |
| \`.break-after-avoid\` | – | keeps the element with what follows (a heading with its text) |
| \`.column-span-all\` | – | runs the element across every column |

- **A z-index names a layer**, from \`--z-index-*\`. There are no numbers: an element belongs to the sticky layer or the popover layer, not to 40. Native \`<dialog>\` and \`[popover]\` sit in the top layer and need no z-index.
- **A scrolling region must be reachable by keyboard** (WCAG 2.1.1): if nothing inside it can take focus, give it \`tabindex="0"\`, a \`role="region"\` and a label.
- There are no inset utilities: a component that places itself (a corner badge, a popover, a sticky header) sets its own offsets.
- **Breaks** work in Columns (Layout/Columns) and in print: a Columns keeps its own items whole already, so \`.break-inside-avoid\` is for something nested, or a block in a printed page.
- \`.overscroll-contain\` stops a scrolling panel from scrolling the page behind it when it reaches its end.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const LOG = ['Sowed broad beans', 'Mulched the roses', 'Lifted dahlia tubers', 'Pruned the apple', 'Turned the compost', 'Divided the hostas', 'Netted the brassicas', 'Raked the leaves'];

export const ScrollingRegion: Story = {
  parameters: { docs: { description: { story: 'A panel with a maximum height that scrolls on its own, reachable by keyboard and labelled, with the scroll contained.' } } },
  render: () => `
    <div class="card max-inline-size-xs">
      <div class="card__header"><h2 id="log-title" class="small-heading">Garden log</h2></div>
      <div class="card__body max-block-size-2xs overflow-y-auto overscroll-contain scrollbar-gutter-stable focus-ring" tabindex="0" role="region" aria-labelledby="log-title">
        <ul class="stack" role="list">${LOG.map((l) => `<li class="small-text">${l}</li>`).join('')}</ul>
      </div>
    </div>`,
};

export const Stacking: Story = {
  parameters: { docs: { description: { story: '`.isolate` keeps a component\'s own z-index inside it, so it can\'t rise above a sticky header elsewhere on the page.' } } },
  render: () => `
    <div class="isolate relative bg-subtle rounded-md p-md">
      <div class="card relative z-base"><div class="card__body"><p class="small-text font-mono">.z-base</p></div></div>
      <div class="card relative z-sticky mt-sm"><div class="card__body"><p class="small-text font-mono">.z-sticky, contained by .isolate</p></div></div>
    </div>`,
};

export const ScrollFade: Story = {
  name: 'Scroll fade',
  parameters: { docs: { description: { story: '`.scroll-fade`: one row that scrolls, its edges fading only where there is more to see. Each item is a link, so focus scrolls the row.' } } },
  render: () => `
    <ul class="cluster scroll-fade max-inline-size-xs" role="list">
      ${LOG.map((l) => `<li class="whitespace-nowrap"><a href="#" class="link small-text">${l}</a></li>`).join('')}
    </ul>`,
};

export const Breaks: Story = {
  parameters: { docs: { description: { story: '`.column-span-all` runs the heading across the columns, and `.break-after-avoid` keeps each season\'s heading with its list. There\'s no utility to force a new column: where only one fits, it would add a second and the page would scroll sideways.' } } },
  render: () => `
    <div class="columns columns--2-col">
      <h2 class="small-heading column-span-all mb-sm">Jobs for the year</h2>
      <h3 class="micro-heading break-after-avoid">Spring</h3>
      <ul class="list small-text mb-sm"><li>Sow broad beans</li><li>Mulch the roses</li></ul>
      <h3 class="micro-heading break-after-avoid">Summer</h3>
      <ul class="list small-text mb-sm"><li>Net the brassicas</li><li>Deadhead the dahlias</li></ul>
      <h3 class="micro-heading break-after-avoid">Autumn</h3>
      <ul class="list small-text mb-sm"><li>Lift dahlia tubers</li><li>Rake the leaves</li></ul>
      <h3 class="micro-heading break-after-avoid">Winter</h3>
      <ul class="list small-text"><li>Prune the apple</li><li>Turn the compost</li></ul>
    </div>`,
};
