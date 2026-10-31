import type { Meta, StoryObj } from '@storybook/html';

type Size = 'default' | 'sm' | 'lg';
type Intent = 'neutral' | 'accent' | 'info' | 'success' | 'warning' | 'danger';

interface IconArgs {
  glyph: string;
  size: Size;
  intent: Intent;
  directional: boolean;
}

const SIZES: Size[] = ['sm', 'default', 'lg'];
const INTENTS: Intent[] = ['neutral', 'accent', 'info', 'success', 'warning', 'danger'];

const INTENT_ICON: Record<Intent, string> = {
  neutral: 'Edit',
  accent: 'Star',
  info: 'Info',
  success: 'Check',
  warning: 'Warning',
  danger: 'Error',
};

const iconClasses = (size: Size = 'default', intent: Intent = 'neutral', directional = false) =>
  [
    'icon',
    size !== 'default' ? `icon--${size}` : '',
    intent !== 'neutral' ? `icon--${intent}` : '',
    directional ? 'icon--dir' : '',
  ]
    .filter(Boolean)
    .join(' ');

const icon = (glyph: string, classes = 'icon') =>
  `<svg class="${classes}" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#${glyph}"/></svg>`;

/** Every symbol id in the sprite that Storybook inlines into the page. */
const spriteIds = () => Array.from(document.querySelectorAll('svg symbol[id]')).map((s) => s.id);

const meta: Meta<IconArgs> = {
  title: 'Atoms/Icon',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
A glyph from the sprite (\`icons/icons.svg\`, one filled family). It is sized in \`em\`, so it follows the text around it, and coloured by the text (\`currentColor\`). Use an icon only where it speeds recognition (PRINCIPLES §6).

| Axis | Modifiers | Notes |
| :--- | :--- | :--- |
| Size | default (\`1em\`), \`--sm\`, \`--lg\` | Any other size: set \`--icon-size\` or the font size |
| Intent | text colour (default), \`--accent\`, \`--info\`, \`--success\`, \`--warning\`, \`--danger\` | Sets \`color\`, so fills and strokes both follow |

Also \`--dir\` (mirrors in right-to-left text) and \`--disclosure\` (rotates with the nearest \`[aria-expanded]\`).

\`\`\`html
<svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Check"/></svg>
<svg class="icon icon--dir" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#ArrowRight"/></svg>
\`\`\`

### Icon box

A fixed square frame that lines an icon up with controls: 48px, \`--sm\` 32px, \`--lg\` 64px. Prominence is plain or \`--subtle\`; corners can be \`--round\`. Flags: \`--icon-box-size\`, \`--icon-box-prominence\`, \`--icon-box-corners\`. A compact container steps it to \`--sm\`.

#### Accessibility
- Decorative icons (beside text, or inside a named control) take \`aria-hidden="true" focusable="false"\`.
- A meaningful standalone icon takes \`role="img"\` and \`aria-label\`, or its control carries the name.
- \`width="1em" height="1em"\` keeps the glyph text-sized if CSS fails to load.
- An intent colour never carries meaning alone (WCAG 1.4.1).
`,
      },
    },
  },
  argTypes: {
    glyph: { control: 'text', description: 'Sprite symbol id' },
    size: { control: 'inline-radio', options: ['default', 'sm', 'lg'], description: 'Size axis' },
    intent: { control: 'select', options: INTENTS, description: 'Intent axis' },
    directional: { control: 'boolean', description: '--dir: mirror in right-to-left text' },
  },
  render: (args) => `
    <div class="sb-demo-stage">
      <p class="text">${icon(args.glyph, iconClasses(args.size, args.intent, args.directional))} Icon beside text</p>
    </div>
  `,
};

export default meta;
type Story = StoryObj<IconArgs>;

/**
 * Interactive sandbox.
 */
export const Playground: Story = {
  args: { glyph: 'ArrowRight', size: 'default', intent: 'neutral', directional: true },
};

/**
 * Every glyph in the sprite, with its id. Glyphs referenced in markup but missing from this list render blank.
 */
export const Gallery: Story = {
  render: () => `
    <div class="sb-demo-stage">
      <ul class="grid grid--6-col">
        ${spriteIds()
          .map(
            (id) => `
          <li class="stack items-center" style="--gap: var(--spacing-4); padding-block: var(--spacing-8);">
            <span class="heading">${icon(id)}</span>
            <code class="small-text">${id}</code>
          </li>`
          )
          .join('')}
      </ul>
    </div>
  `,
};

/**
 * Icons follow the text they sit in. --sm and --lg step relative to it.
 */
export const SizesWithText: Story = {
  render: () => `
    <div class="sb-demo-stage stack">
      ${['small-text', 'small-text', 'text', 'small-heading', 'heading', 'title']
        .map(
          (preset) => `
        <p class="${preset}" style="margin: 0;">
          ${SIZES.map((s) => icon('Bell', iconClasses(s))).join(' ')}
          <span class="sb-demo-tag">${preset}</span>
        </p>`
        )
        .join('')}
    </div>
  `,
};

/**
 * Intent colours, always paired with text that says the same thing.
 */
export const Intents: Story = {
  render: () => `
    <div class="sb-demo-stage cluster">
      ${INTENTS.map(
        (i) => `<span class="inline" style="--gap: var(--spacing-4);">${icon(INTENT_ICON[i], iconClasses('default', i))}<span class="small-text">${i}</span></span>`
      ).join('')}
    </div>
  `,
};

/**
 * --dir mirrors directional glyphs in right-to-left text. Non-directional glyphs never mirror.
 */
export const Direction: Story = {
  render: () => `
    <div class="sb-demo-stage stack">
      ${['ltr', 'rtl']
        .map(
          (dir) => `
        <div dir="${dir}" class="cluster">
          <span class="sb-demo-tag">${dir}</span>
          <a href="#next" class="link"><span>${dir === 'rtl' ? 'التالي' : 'Next'}</span> ${icon('ArrowRight', 'icon icon--dir')}</a>
          <span>${icon('ChevronRight', 'icon icon--dir')} ${icon('ArrowEnd', 'icon icon--dir')}</span>
          <span>${icon('Search')} ${icon('Check')}</span>
        </div>`
        )
        .join('')}
    </div>
  `,
};

/**
 * Icon boxes: three sizes, plain or subtle, square or round.
 */
export const IconBox: Story = {
  render: () => `
    <div class="sb-demo-stage stack">
      ${['', 'icon-box--subtle', 'icon-box--subtle icon-box--round']
        .map(
          (mods) => `
        <div class="cluster">
          ${['icon-box--sm', '', 'icon-box--lg']
            .map((size) => `<span class="${['icon-box', size, mods].filter(Boolean).join(' ')}" aria-hidden="true">${icon('Bell')}</span>`)
            .join('')}
          <span class="sb-demo-tag">${mods || 'plain'}</span>
        </div>`
        )
        .join('')}
      <div class="cluster" style="--ui-sizing: compact;">
        <span class="icon-box icon-box--subtle" aria-hidden="true">${icon('Bell')}</span>
        <span class="sb-demo-tag">--ui-sizing: compact</span>
      </div>
    </div>
  `,
};

/**
 * Intent colours the icon, and a subtle box takes the intent's tint. The text
 * beside it says what it means.
 */
export const IconBoxIntents: Story = {
  render: () => `
    <div class="sb-demo-stage stack">
      ${INTENTS.map(
        (intent) => `
        <div class="inline">
          <span class="${['icon-box', 'icon-box--subtle', intent === 'neutral' ? '' : `icon-box--${intent}`].filter(Boolean).join(' ')}" aria-hidden="true">${icon('Bell')}</span>
          <span class="text">Reminder, ${intent}</span>
        </div>`
      ).join('')}
    </div>
  `,
};

/**
 * --disclosure points down when the nearest [aria-expanded] is true, and to the
 * inline end when false.
 */
export const Disclosure: Story = {
  render: () => `
    <div class="sb-demo-stage cluster">
      <button type="button" class="button" aria-expanded="false">${icon('ChevronDown', 'icon icon--disclosure')}<span>Closed</span></button>
      <button type="button" class="button" aria-expanded="true">${icon('ChevronDown', 'icon icon--disclosure')}<span>Open</span></button>
    </div>
  `,
};

/**
 * Decorative and meaningful icons.
 */
export const Accessibility: Story = {
  render: () => `
    <div class="sb-demo-stage stack">
      <p class="text">${icon('Check', 'icon icon--success')} Saved. <span class="sb-demo-tag">decorative: the text carries the meaning</span></p>
      <p class="text">
        <button type="button" class="button button--icon" aria-label="Search">${icon('Search')}</button>
        <span class="sb-demo-tag">decorative: the button carries the name</span>
      </p>
      <p class="text">
        <svg class="icon icon--warning" width="1em" height="1em" role="img" aria-label="Warning"><use href="#Warning"/></svg>
        Disk 92% full
        <span class="sb-demo-tag">meaningful: role="img" with a label</span>
      </p>
    </div>
  `,
};
