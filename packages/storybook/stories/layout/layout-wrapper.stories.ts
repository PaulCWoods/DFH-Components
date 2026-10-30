import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Layout/Wrapper',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
Centres content and caps its width. A gutter on each side keeps the content off the screen edge; the cap applies to the content, so a wrapped page lines up with a header bar at any width. Defined in \`layout/wrapper.css\`.

### Markup
\`\`\`html
<main id="main" class="main">
  <div class="wrapper stack">…</div>
</main>
\`\`\`

| Modifier | Effect |
| :--- | :--- |
| default | Capped at the site width (\`--wrapper-max-width\`) |
| \`--2xs\` … \`--2xl\` | Capped at a block step |
| \`--start\`, \`--end\` | Aligned to one side |
| \`--middle\` | Content centred vertically in the space the wrapper is given |

- **Gutter:** \`--wrapper-gutter\` (the cushion step). A wrapper inside a wrapper has none of its own. A \`.main\` whose child is a wrapper drops its own inline padding, so the inset isn't doubled.
- **Not for components:** to cap a card or a form, use a \`max-width-*\` utility; a wrapper's gutter would pad the card.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const prose = `
  <h1 class="heading">Shade-loving perennials</h1>
  <p class="text">Woodland plants want soil that holds moisture but drains. Dig in leaf mould before planting, and mulch every spring.</p>`;

export const Default: Story = {
  parameters: { docs: { description: { story: 'A header bar and a wrapped page: their content lines up at every width. Narrow the canvas: the gutter keeps the text off the edge.' } } },
  render: () => `
    <header class="header">
      <div class="header__bar">
        <a href="#" class="link link--plain small-heading">Woodland Plants</a>
        <button type="button" class="button">Sign in</button>
      </div>
    </header>
    <main id="main" class="main">
      <div class="wrapper stack">${prose}</div>
    </main>`,
};

export const Sizes: Story = {
  parameters: { docs: { description: { story: 'Sizes cap the content at a block step: `--sm` for a sign-in form, `--lg` for reading.' } } },
  render: () => `
    <div class="stack py-lg">
      ${['sm', 'md', 'lg', 'xl'].map((s) => `
        <div class="wrapper wrapper--${s}">
          <div class="card"><div class="card__body"><p class="text">.wrapper--${s}</p></div></div>
        </div>`).join('')}
    </div>`,
};

export const Alignment: Story = {
  parameters: { docs: { description: { story: '`--start` and `--end` keep the cap but sit on one side.' } } },
  render: () => `
    <div class="stack py-lg">
      ${['start', 'end'].map((a) => `
        <div class="wrapper wrapper--sm wrapper--${a}">
          <div class="card"><div class="card__body"><p class="text">.wrapper--${a}</p></div></div>
        </div>`).join('')}
    </div>`,
};

export const Middle: Story = {
  parameters: { docs: { description: { story: '`--middle` centres a sign-in form in the space it is given (here, a screen-tall app shell).' } } },
  render: () => `
    <div class="app">
      <main id="main" class="main">
        <div class="wrapper wrapper--sm wrapper--middle">
          <form class="card" aria-labelledby="sign-in">
            <div class="card__header"><h1 id="sign-in" class="card__title small-heading">Sign in</h1></div>
            <div class="card__body stack">
              <div class="field">
                <label class="field__label label" for="email">Email</label>
                <input class="input" id="email" type="email" autocomplete="email">
              </div>
              <button type="submit" class="button button--strong button--accent">Continue</button>
            </div>
          </form>
        </div>
      </main>
    </div>`,
};
