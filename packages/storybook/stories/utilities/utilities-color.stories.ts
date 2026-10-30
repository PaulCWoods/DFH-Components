import type { Meta, StoryObj } from '@storybook/html';

const SURFACES = ['transparent', 'surface', 'card', 'subtle', 'muted', 'accent', 'success', 'warning', 'danger'];
const DARK = ['inverted', 'dark', 'darker', 'accent-strong'];

const meta: Meta = {
  title: 'Utilities/Colour',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Backgrounds, translucency, text colour and opacity, from the Tier 2 colour roles. Defined in \`utilities/color.css\`. Every value follows the colour scheme through \`light-dark()\`.

| Verbose | Shorthand | Sets |
| :--- | :--- | :--- |
| \`.bg-color-card\` | \`.bg-card\` | the background (also transparent, surface, subtle, muted, inverted, dark, darker, accent, accent-strong, success, warning, danger) |
| \`.bg-translucent-subtle\`, \`.bg-translucent\`, \`.bg-translucent-strong\` | – | the background mixed with transparency, and a blur |
| \`.text-color\` | – | the body text colour |
| \`.text-color-muted\` | \`.text-muted\` | the text colour (also current, transparent, strong, inverted, inverted-strong, on-dark, white, accent, success, warning, danger) |
| \`.opacity-0\`, \`-muted\`, \`-disabled\`, \`-100\` | – | \`opacity\` |

- **Text on a dark background:** pair a dark background with an inverted or on-dark text colour, or use \`.color-scheme-dark\` on the region so everything inside switches.
- **Translucency** mixes the element's own background (set by a \`.bg-*\` class, else the card surface) with transparency, and blurs what is behind it, like the components' \`--translucent\`. It is solid when the user asks for more contrast.
- **Intent colours** (accent, success, warning, danger) never carry the meaning alone (WCAG 1.4.1): add an icon or words, as the components do.
- **Opacity** lowers the contrast of everything inside, text included. Don't use it on text that must stay readable.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const swatch = (cls: string, text = `.${cls.split(' ').join(' .')}`) =>
  `<div class="${cls} border border-quiet rounded-md p-md"><p class="small-text font-mono">${text}</p></div>`;

export const Playground: Story = {
  args: { background: 'card', text: 'default' },
  argTypes: {
    background: { control: 'select', options: SURFACES },
    text: { control: 'select', options: ['default', 'strong', 'muted', 'accent', 'success', 'warning', 'danger'] },
  },
  render: (args) => swatch(`bg-${args.background}${args.text === 'default' ? '' : ` text-${args.text}`}`),
};

export const Backgrounds: Story = {
  parameters: { docs: { description: { story: 'Light surfaces take the body text colour. `inverted` and `accent-strong` flip with the scheme, so they take `.text-inverted`; `dark` and `darker` stay dark, so they take `.text-on-dark`.' } } },
  render: () => `
    <div class="grid grid--2xs">
      ${SURFACES.map((s) => swatch(`bg-${s}`)).join('')}
      ${DARK.map((s) => swatch(`bg-${s} ${s === 'inverted' || s === 'accent-strong' ? 'text-inverted' : 'text-on-dark'}`)).join('')}
    </div>`,
};

export const Translucency: Story = {
  parameters: { docs: { description: { story: 'Three strengths over a tinted background, with and without a background class. Check the contrast of text over whatever shows through.' } } },
  render: () => `
    <div class="bg-accent rounded-lg p-lg">
      <div class="grid grid--2xs">
        ${['bg-translucent-subtle', 'bg-translucent', 'bg-translucent-strong', 'bg-surface bg-translucent'].map((c) => `
          <div class="${c} rounded-md p-md shadow-sm"><p class="small-text font-mono">.${c.split(' ').join(' .')}</p></div>`).join('')}
      </div>
    </div>`,
};

export const TextColours: Story = {
  parameters: { docs: { description: { story: 'Text roles. The intent colours come with an icon and words.' } } },
  render: () => `
    <div class="grid grid--2-col grid--xs">
      <div class="stack">
        <p class="text">.text-color: Body text</p>
        <p class="text text-strong">.text-strong: Emphasis</p>
        <p class="text text-muted">.text-muted: Supporting detail</p>
      </div>
      <ul class="stack" role="list">
        ${[['accent', 'Info', 'Featured: new for spring'], ['success', 'Check', 'Watered this morning'], ['warning', 'Warning', 'Soil drying out'], ['danger', 'Error', 'Frost expected tonight']]
          .map(([c, icon, t]) => `
          <li class="inline text text-${c}">
            <svg class="icon" aria-hidden="true"><use href="#${icon}"></use></svg>
            <span>${t}</span>
          </li>`).join('')}
      </ul>
      <div class="color-scheme-dark bg-surface rounded-md p-md stack">
        <p class="text">.color-scheme-dark: the region switches</p>
        <p class="text text-muted">Muted text stays readable</p>
      </div>
    </div>`,
};

export const Opacity: Story = {
  parameters: { docs: { description: { story: 'Opacity on decorative shapes. It dims text too, so keep it off text that must be read.' } } },
  render: () => `
    <div class="flex gap-md" aria-hidden="true">
      ${['opacity-100', 'opacity-muted', 'opacity-disabled', 'opacity-0'].map((o) => `<div class="size-target rounded-md bg-accent-strong ${o}"></div>`).join('')}
    </div>
    <p class="small-text font-mono mt-sm">.opacity-100 · .opacity-muted · .opacity-disabled · .opacity-0</p>`,
};
