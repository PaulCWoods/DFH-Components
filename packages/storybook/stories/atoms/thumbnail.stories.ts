import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Atoms/Thumbnail',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
A small picture of a thing: album art, a product shot, a file preview. People take an avatar; an icon on a tint takes an icon box. A thumbnail is never interactive; a button or link that opens the thing contains one.

### Markup
\`\`\`html
<!-- Beside a visible title: decorative -->
<img class="thumbnail" src="album.jpg" alt="" />

<!-- No picture: an icon for the kind of thing -->
<span class="thumbnail" aria-hidden="true">
  <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#eighth-notes"/></svg>
</span>

<!-- A count on its corner: the span holds the picture and the name -->
<span class="thumbnail thumbnail--lg" role="img" aria-label="Fern, 3 new tracks">
  <img src="fern.jpg" alt="" />
  <span class="badge badge--accent badge--top-end" aria-hidden="true"><span class="badge__text">3</span></span>
</span>
\`\`\`

- **Size:** the block size (height): default 48px, \`--sm\` 32px, \`--lg\` 64px (flag \`--thumbnail-size-step\`). A compact container steps each down one. A one-off size sets \`--thumbnail-size\`.
- **Aspect:** square by default; \`--thumbnail-aspect: 4 / 3\` or \`16 / 9\` for previews. The width follows, so a row of mixed shapes lines up. Pictures are cropped to fill (\`object-fit: cover\`).
- **Stretch:** \`--stretch\` fills its container's inline size and keeps the aspect, for a picture in a card canvas or a carousel slide.
- **Corners:** rounded by default, \`--round\` for a circle (flag \`--thumbnail-corners: round\`).
- **Badges:** a count or dot on a corner, hidden from screen readers, with what it means in the name.
- **No picture:** an icon on the tint, which also shows while an image loads.
- **Naming:** \`alt=""\` beside a visible title; a real \`alt\` on its own or when the picture says what the text doesn't.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

/* Stand-in artwork: a two-colour gradient with a shape, as an SVG data URI */
const art = (a: string, b: string, shape = 'circle') => {
  const mark = shape === 'circle'
    ? `<circle cx='60' cy='60' r='28' fill='white' fill-opacity='0.35'/>`
    : `<rect x='30' y='30' width='60' height='60' rx='8' fill='white' fill-opacity='0.35'/>`;
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'><defs><linearGradient id='g' x2='1' y2='1'><stop offset='0' stop-color='${a}'/><stop offset='1' stop-color='${b}'/></linearGradient></defs><rect width='120' height='120' fill='url(%23g)'/>${mark}</svg>`;
  return `data:image/svg+xml,${svg.replace(/#/g, '%23').replace(/</g, '%3C').replace(/>/g, '%3E')}`;
};
const dusk = art('#4338ca', '#db2777');
const fern = art('#065f46', '#84cc16', 'rect');
const ember = art('#9a3412', '#facc15');

const icon = (name: string) => `<svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#${name}"/></svg>`;
const dot = (intent: string) => `<span class="badge badge--dot badge--${intent} badge--top-end" aria-hidden="true"></span>`;

export const Playground: Story = {
  args: { content: 'picture', size: 'default', aspect: '1', round: false, badge: false, compact: false },
  argTypes: {
    content: { control: 'inline-radio', options: ['picture', 'icon'] },
    size: { control: 'inline-radio', options: ['sm', 'default', 'lg'] },
    aspect: { control: 'inline-radio', options: ['1', '4 / 3', '16 / 9'] },
  },
  render: (args) => {
    const cls = [
      'thumbnail',
      args.size !== 'default' ? `thumbnail--${args.size}` : '',
      args.round ? 'thumbnail--round' : '',
    ].filter(Boolean).join(' ');
    const style = args.aspect !== '1' ? ` style="--thumbnail-aspect: ${args.aspect};"` : '';
    const body = args.content === 'picture' ? `<img src="${dusk}" alt="" />` : icon('eighth-notes');
    const badge = args.badge ? dot('success') : '';
    const name = `Celestial Horizon, album art${args.badge ? ', playing' : ''}`;
    return `<div class="${args.compact ? 'ui-compact' : ''}"><span class="${cls}"${style} role="img" aria-label="${name}">${body}${badge}</span></div>`;
  },
};

export const Content: Story = {
  render: () => `
    <div class="cluster">
      <img class="thumbnail" src="${dusk}" alt="Celestial Horizon, album art" />
      <span class="thumbnail" role="img" aria-label="No artwork">${icon('eighth-notes')}</span>
      <span class="thumbnail" role="img" aria-label="Product photo coming soon">${icon('shopping-cart')}</span>
      <span class="thumbnail" role="img" aria-label="Source file">${icon('code-xml')}</span>
    </div>`,
};

export const Sizes: Story = {
  render: () => `
    <div class="cluster">
      <img class="thumbnail thumbnail--sm" src="${dusk}" alt="Small, 32 pixels" />
      <img class="thumbnail" src="${dusk}" alt="Default, 48 pixels" />
      <img class="thumbnail thumbnail--lg" src="${dusk}" alt="Large, 64 pixels" />
      <img class="thumbnail" style="--thumbnail-size: 6rem;" src="${dusk}" alt="96 pixel artwork" />
      <img class="thumbnail" style="--thumbnail-size: 8rem;" src="${dusk}" alt="128 pixel artwork" />
    </div>`,
};

export const Aspect: Story = {
  render: () => `
    <div class="cluster">
      <img class="thumbnail thumbnail--lg" src="${fern}" alt="Square" />
      <img class="thumbnail thumbnail--lg" style="--thumbnail-aspect: 4 / 3;" src="${fern}" alt="Four by three" />
      <img class="thumbnail thumbnail--lg" style="--thumbnail-aspect: 16 / 9;" src="${fern}" alt="Sixteen by nine" />
    </div>`,
};

export const Stretch: Story = {
  parameters: { docs: { description: { story: '`--stretch` fills the inline size and keeps the aspect, so the height follows the width.' } } },
  render: () => `
    <div class="stack max-inline-size-xs">
      <img class="thumbnail thumbnail--stretch" style="--thumbnail-aspect: 16 / 9;" src="${fern}" alt="Sixteen by nine, as wide as its container" />
    </div>`,
};

export const Round: Story = {
  render: () => `
    <div class="cluster">
      <img class="thumbnail thumbnail--lg thumbnail--round" src="${ember}" alt="Ember, single" />
      <span class="thumbnail thumbnail--lg thumbnail--round" role="img" aria-label="No artwork">${icon('disc')}</span>
    </div>`,
};

export const Badges: Story = {
  render: () => `
    <div class="cluster">
      <span class="thumbnail thumbnail--lg" role="img" aria-label="Celestial Horizon, playing"><img src="${dusk}" alt="" />${dot('success')}</span>
      <span class="thumbnail thumbnail--lg" role="img" aria-label="Fern, 3 new tracks">
        <img src="${fern}" alt="" />
        <span class="badge badge--accent badge--top-end" aria-hidden="true"><span class="badge__text">3</span></span>
      </span>
      <span class="thumbnail thumbnail--lg thumbnail--round" role="img" aria-label="Ember, playing"><img src="${ember}" alt="" />${dot('success')}</span>
    </div>`,
};

export const InAList: Story = {
  name: 'In a list',
  render: () => `
    <ul class="stack gap-sm" role="list" aria-label="Queue">
      <li class="inline">
        <img class="thumbnail" src="${dusk}" alt="" />
        <div class="lockup">
          <span class="small-heading">Celestial Horizon</span>
          <span class="small-text text-muted">Aura &amp; Tycho</span>
        </div>
      </li>
      <li class="inline">
        <img class="thumbnail" style="--thumbnail-aspect: 16 / 9;" src="${fern}" alt="" />
        <div class="lockup">
          <span class="small-heading">Studio session</span>
          <span class="small-text text-muted">Video, 4 minutes</span>
        </div>
      </li>
      <li class="inline">
        <span class="thumbnail" aria-hidden="true">${icon('eighth-notes')}</span>
        <div class="lockup">
          <span class="small-heading">Midnight Resonator</span>
          <span class="small-text text-muted">Solar Fields</span>
        </div>
      </li>
    </ul>`,
};

export const InAButton: Story = {
  name: 'In a button',
  render: () => `
    <div class="cluster">
      <button type="button" class="button button--plain button--icon" aria-label="Play Celestial Horizon">
        <img class="thumbnail thumbnail--sm" src="${dusk}" alt="" />
      </button>
    </div>`,
};

export const Compact: Story = {
  render: () => `
    <div class="ui-compact cluster">
      <img class="thumbnail thumbnail--sm" src="${dusk}" alt="Small steps to 32 pixels" />
      <img class="thumbnail" src="${dusk}" alt="Default steps to 32 pixels" />
      <img class="thumbnail thumbnail--lg" src="${dusk}" alt="Large steps to 48 pixels" />
    </div>`,
};

export const RightToLeft: Story = {
  render: () => `
    <div dir="rtl" lang="ar" class="cluster">
      <span class="thumbnail thumbnail--lg" role="img" aria-label="أفق سماوي، قيد التشغيل"><img src="${dusk}" alt="" />${dot('success')}</span>
      <img class="thumbnail thumbnail--lg" style="--thumbnail-aspect: 16 / 9;" src="${fern}" alt="جلسة استوديو" />
    </div>`,
};
