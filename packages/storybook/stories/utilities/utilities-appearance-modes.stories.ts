import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Utilities/Appearance Modes',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Mode classes set a flag that the components inside read; they style nothing themselves. Defined in \`utilities/appearance-modes.css\`.

- \`.elements-subtle\` and \`.elements-plain\` set \`--elements-prominence\`. Every element with that prominence follows it: controls (button, button group, input, select, textarea, combobox, switch), status, chip, kbd, icon box, tab list and telemetry.
- Containers ignore it (card, sidebar, banner, menu, accordion, table, stepper, empty state): set their prominence on the container itself. Links ignore it too, so they keep the underline that sets them apart from text.
- \`.controls-subtle\` and \`.controls-plain\` (\`--controls-prominence\`) reach controls only.
- A component's own modifier class beats the flag.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const icon = (id: string) =>
  `<svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#${id}"/></svg>`;

const sample = (mode: string, label: string) => `
  <article class="card ${mode}" aria-labelledby="mode-${label}">
    <header class="card__header">
      <h3 id="mode-${label}" class="card__title heading">${label}</h3>
      <span class="status status--success"><span class="status__text">Online</span></span>
    </header>
    <div class="card__body stack">
      <p class="small-text text-muted">The card keeps its own look; the elements inside follow the mode.</p>
      <div class="cluster">
        <button type="button" class="button"><span>Button</span></button>
        <button type="button" class="button button--accent"><span>Accent</span></button>
        <span class="chip"><span class="chip__text">Chip</span></span>
        <kbd class="kbd">Esc</kbd>
        <span class="icon-box" aria-hidden="true">${icon('Bell')}</span>
      </div>
      <div class="field">
        <label for="search-${label}" class="field__label label">Search</label>
        <input id="search-${label}" class="input" type="search" placeholder="Title or artist" />
      </div>
      <nav class="tab-list tab-list--segmented tab-list--sm" aria-label="${label} sections">
        <a href="#" class="tab" aria-current="page"><span class="tab__text">Live</span></a>
        <a href="#" class="tab"><span class="tab__text">Queue</span></a>
      </nav>
      <dl class="telemetry-group" aria-label="${label} station">
        <div class="telemetry">
          <dt class="small-text text-muted">Listeners</dt>
          <dd class="small-heading">14,820</dd>
        </div>
        <div class="telemetry">
          <dt class="small-text text-muted">Latency</dt>
          <dd class="small-heading">42<span class="small-text">ms</span></dd>
        </div>
      </dl>
    </div>
  </article>
`;

export const Elements: Story = {
  render: () => `
    <div class="grid grid--3-col" style="--grid-min: 18rem;">
      ${sample('', 'Default')}
      ${sample('elements-subtle', 'Subtle')}
      ${sample('elements-plain', 'Plain')}
    </div>
  `,
};
