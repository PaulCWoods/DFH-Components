import type { Meta, StoryObj } from '@storybook/html';

const SCREENS: [string, string][] = [['sm', '40rem'], ['md', '48rem'], ['lg', '64rem'], ['xl', '80rem'], ['2xl', '96rem']];
const CONTAINERS: [string, string][] = [
  ['xs', '20rem'], ['sm', '24rem'], ['md', '28rem'], ['lg', '32rem'], ['xl', '36rem'], ['2xl', '42rem'],
  ['3xl', '48rem'], ['4xl', '56rem'], ['5xl', '64rem'], ['6xl', '72rem'], ['7xl', '80rem'],
];

const meta: Meta = {
  title: 'Utilities/Responsive Helpers',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Hide something, its labels, or everything but its accessible name, by a condition. Defined in \`utilities/responsive-helpers.css\` and \`utilities/accessibility.css\`. Markup rules: \`docs/markup/31-responsive-visibility.md\`.

### Actions
| Class | Effect |
| :--- | :--- |
| \`.hidden\` | Hidden always (\`display: none\`); the \`hidden\` attribute is better in markup |
| \`.visually-hidden\` (\`.sr-only\`) | Hidden on screen, still read by screen readers and voice control |
| \`.hide-labels\` | Sets \`--ui-labels: hidden\`: buttons and tabs inside show their icon and keep the text as their accessible name; any \`.ui-label\` inside is visually hidden |
| \`{condition}:hide\` | Hidden while the condition holds |
| \`{condition}:hide-labels\`, \`{condition}:sr-only\` | The other actions, by a condition |

### Conditions
One name per condition, in Tailwind's form. To show something at a size, hide it at the other sizes: \`md:hide\` shows it only below 48rem.

| Prefix | While |
| :--- | :--- |
${SCREENS.map(([n, w]) => `| \`${n}:\` / \`max-${n}:\` | the viewport is at least / less than ${w} wide |`).join('\n')}
| \`@xs:\` … \`@7xl:\` / \`@max-xs:\` … \`@max-7xl:\` | the nearest size container is at least / less than the size |
| \`short:\` / \`tall:\` | the viewport is less than / at least 36rem tall |
| \`app-locked:\` / \`app-unlocked:\` | \`.app--viewport\` is locked to the viewport (at least 48rem wide and 36rem tall) / scrolls as a page |

Container sizes: ${CONTAINERS.map(([n, w]) => `\`${n}\` ${w}`).join(', ')}. A container condition needs an ancestor with \`container-type: inline-size\` (\`.container-inline\`, \`.split\`, \`.sidebar\`, \`.header\`, \`.footer\`); without one it never matches.

- **Prefer a container condition** for anything inside a component: the component then adapts wherever it is placed.
- **Hiding is not removing:** a \`:hide\` element is gone for everyone at that size. Never hide the only way to do something; hide a duplicate, or a label whose icon and accessible name remain.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const tools = (cls: string) => `
  <div class="button-group ${cls}" role="group" aria-label="Bed actions">
    <button type="button" class="button"><svg class="button__icon icon" aria-hidden="true"><use href="#plus"></use></svg><span>Add plant</span></button>
    <button type="button" class="button"><svg class="button__icon icon" aria-hidden="true"><use href="#square-pen"></use></svg><span>Rename</span></button>
    <button type="button" class="button"><svg class="button__icon icon" aria-hidden="true"><use href="#share-2"></use></svg><span>Share</span></button>
  </div>`;

export const Viewport: Story = {
  parameters: { docs: { description: { story: 'Resize the canvas. Below 48rem the labels go and the hint hides; from 48rem the short note hides.' } } },
  render: () => `
    <div class="stack">
      ${tools('max-md:hide-labels')}
      <p class="small-text md:hide">.md:hide: shown below 48rem</p>
      <p class="small-text max-md:hide">.max-md:hide: shown from 48rem</p>
    </div>`,
};

export const Container: Story = {
  parameters: { docs: { description: { story: 'The same toolbar in three containers. Labels go below `@xl` (36rem); the note hides below `@md` (28rem).' } } },
  render: () => `
    <div class="stack">
      ${['xs', 'sm', 'lg'].map((w) => `
        <div class="container-inline max-inline-size-${w} border border-quiet rounded-md p-sm">
          <div class="stack">
            ${tools('@max-xl:hide-labels')}
            <p class="small-text @max-md:hide">.@max-md:hide: room for a note</p>
            <p class="small-text font-mono text-muted">.max-inline-size-${w}</p>
          </div>
        </div>`).join('')}
    </div>`,
};

export const VisuallyHidden: Story = {
  parameters: { docs: { description: { story: 'Text read by screen readers but not shown: always, and below 48rem.' } } },
  render: () => `
    <div class="stack">
      <button type="button" class="button button--icon"><svg class="icon" aria-hidden="true"><use href="#trash"></use></svg><span class="sr-only">Remove Bed 3</span></button>
      <p class="text">Harvest <span class="max-md:sr-only">(rhubarb, chard and kale)</span> due this week</p>
    </div>`,
};

export const Labels: Story = {
  parameters: { docs: { description: { story: '`.hide-labels` on a group and on any element with `.ui-label` text.' } } },
  render: () => `
    <div class="stack">
      ${tools('hide-labels')}
      <p class="hide-labels small-text inline"><svg class="icon" aria-hidden="true"><use href="#bell"></use></svg><span class="ui-label">Reminders on</span></p>
    </div>`,
};
