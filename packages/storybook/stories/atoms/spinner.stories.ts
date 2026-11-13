import type { Meta, StoryObj } from '@storybook/html';

interface SpinnerArgs {
  size: 'default' | 'sm' | 'lg';
  intent: 'none' | 'accent' | 'info' | 'success' | 'warning' | 'danger';
}

const spinner = (extra = '') =>
  `<svg class="icon spinner${extra ? ` ${extra}` : ''}" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#loader-circle"/></svg>`;

const meta: Meta<SpinnerArgs> = {
  title: 'Atoms/Spinner',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
An Icon that turns, for work in progress whose result can't be shown yet.

| Use | Markup |
| :--- | :--- |
| Spinner | \`<svg class="icon spinner" aria-hidden="true"><use href="#loader-circle"/></svg>\` |
| Size and colour | The Icon's: \`.icon--sm\`, \`.icon--lg\`, \`--icon-size\`, an intent, or the text around it |
| In a Button | Put it in the Button; it shows only with \`.is-busy\` (see Button › Busy) |
| Speed | \`--spinner-duration\` (one turn), \`--spinner-reduced-duration\` (under reduced motion) |

- **It says nothing.** It is always \`aria-hidden\`; a \`role="status"\` region says what is happening and how it ended.
- **Reduced motion slows it, never stops it:** a still Spinner looks broken.
- Use a Skeleton when the layout of what's coming is known, and a Progress bar when the amount left is.
`,
      },
    },
  },
  argTypes: {
    size: { control: 'select', options: ['default', 'sm', 'lg'], description: 'Icon size' },
    intent: {
      control: 'select',
      options: ['none', 'accent', 'info', 'success', 'warning', 'danger'],
      description: 'Icon intent (otherwise the text colour)',
    },
  },
  args: { size: 'default', intent: 'none' },
  render: (args) => `
    <div class="sb-demo-stage cluster">
      ${spinner([args.size !== 'default' ? `icon--${args.size}` : '', args.intent !== 'none' ? `icon--${args.intent}` : ''].filter(Boolean).join(' '))}
      <p class="text" role="status">Loading plants…</p>
    </div>
  `,
};

export default meta;
type Story = StoryObj<SpinnerArgs>;

/**
 * Interactive sandbox: size and intent.
 */
export const Playground: Story = {};

/**
 * The Spinner takes the size of the text it sits in, like any Icon.
 */
export const BesideText: Story = {
  render: () => `
    <div class="sb-demo-stage stack">
      <p class="small-text cluster">${spinner()}<span role="status">Checking availability…</span></p>
      <p class="text cluster">${spinner()}<span role="status">Loading plants…</span></p>
      <p class="heading cluster">${spinner()}<span role="status">Preparing your report…</span></p>
    </div>
  `,
};

/**
 * In place of content whose shape isn't known yet, with a status line that
 * a screen reader announces.
 */
export const InARegion: Story = {
  render: () => `
    <div class="sb-demo-stage">
      <section class="card" aria-busy="true" aria-labelledby="results-title">
        <header class="card__header">
          <h2 id="results-title" class="small-heading">Search results</h2>
        </header>
        <div class="card__body cluster">
          ${spinner('icon--lg')}
          <p class="text" role="status">Searching the catalogue…</p>
        </div>
      </section>
    </div>
  `,
};

/**
 * Reloading content that's already there: `aria-busy="true"` makes the
 * region recede until it's done, and the status line, outside it, says why.
 */
export const Reloading: Story = {
  render: () => `
    <div class="sb-demo-stage stack">
      <p class="small-text cluster">${spinner()}<span role="status">Updating watering times…</span></p>
      <section class="card" aria-busy="true" aria-labelledby="watering-title">
        <header class="card__header">
          <h2 id="watering-title" class="small-heading">Watering</h2>
        </header>
        <div class="card__body">
          <p class="text">Monstera: every 7 days. Fiddle-leaf fig: every 10 days.</p>
        </div>
      </section>
    </div>
  `,
};
