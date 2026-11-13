import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Atoms/Avatar',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
Who someone is: a photo, initials or an icon in a shape. An avatar is never interactive; a button or link that opens a profile contains one.

### Markup
\`\`\`html
<!-- Beside a visible name: decorative -->
<span class="avatar avatar--sm" aria-hidden="true">SR</span>

<!-- On its own with a photo: the alt names it -->
<img class="avatar" src="sam.jpg" alt="Sam Rivera" />

<!-- On its own with initials, plus presence -->
<span class="avatar" role="img" aria-label="Sam Rivera, online">
  SR
  <span class="badge badge--dot badge--success badge--bottom-end" aria-hidden="true"></span>
</span>
\`\`\`

- **Size:** default 48px, \`--sm\` 32px, \`--lg\` 64px (flag \`--avatar-size-step\`). A compact container steps each down one. A one-off size sets \`--avatar-size\`.
- **Corners:** round by default, \`--square\` (flag \`--avatar-corners: square\`).
- **Looks:** \`--accent\`, \`--placeholder\` (an empty slot), \`--count\` ("+3").
- **Colour:** set \`--avatar-bg\` and \`--avatar-text\` together. Where \`contrast-color()\` is supported, a background alone picks its own text colour.
- **Presence** is a dot badge hidden from screen readers, with the state in the name or in visible text, so it is never colour alone.
- **As a control:** \`<button class="avatar">\` or \`<a class="avatar">\`, named in \`.sr-only\` text ("Account, Sam Rivera") with the initials \`aria-hidden\`. It takes a focus ring and a 48px hit area, and no hover look. With the name shown beside it, a button holds both.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const photo = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=128&h=128&q=80`;
const sam = photo('1507003211169-0a1dd7228f2d');
const ade = photo('1534528741775-53994a69daeb');

const user = `<svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#user"/></svg>`;
const dot = (intent: string) => `<span class="badge badge--dot${intent ? ` badge--${intent}` : ''} badge--bottom-end" aria-hidden="true"></span>`;

export const Playground: Story = {
  args: { content: 'initials', size: 'default', square: false, look: 'default', presence: 'none', compact: false },
  argTypes: {
    content: { control: 'inline-radio', options: ['initials', 'photo', 'icon'] },
    size: { control: 'inline-radio', options: ['sm', 'default', 'lg'] },
    look: { control: 'inline-radio', options: ['default', 'accent', 'placeholder', 'count'] },
    presence: { control: 'inline-radio', options: ['none', 'online', 'away', 'busy', 'offline'] },
  },
  render: (args) => {
    const cls = [
      'avatar',
      args.size !== 'default' ? `avatar--${args.size}` : '',
      args.square ? 'avatar--square' : '',
      args.look !== 'default' ? `avatar--${args.look}` : '',
    ].filter(Boolean).join(' ');
    const intents: Record<string, string> = { online: 'success', away: 'warning', busy: 'danger', offline: '' };
    const badge = args.presence !== 'none' ? dot(intents[args.presence]) : '';
    const name = `Sam Rivera${args.presence !== 'none' ? `, ${args.presence}` : ''}`;
    const body = args.look === 'count' ? '+3'
      : args.look === 'placeholder' ? ''
        : args.content === 'photo' ? `<img src="${sam}" alt="" />`
          : args.content === 'icon' ? user
            : 'SR';
    const label = args.look === 'count' ? '3 more people' : args.look === 'placeholder' ? 'Empty seat' : name;
    return `<div class="${args.compact ? 'ui-compact' : ''}"><span class="${cls}" role="img" aria-label="${label}">${body}${badge}</span></div>`;
  },
};

export const Content: Story = {
  render: () => `
    <div class="cluster">
      <span class="avatar" role="img" aria-label="Sam Rivera">SR</span>
      <img class="avatar" src="${ade}" alt="Ade Okafor" />
      <span class="avatar" role="img" aria-label="Guest">${user}</span>
    </div>`,
};

export const Sizes: Story = {
  render: () => `
    <div class="cluster">
      <span class="avatar avatar--sm" role="img" aria-label="Small, 32 pixels">SM</span>
      <span class="avatar" role="img" aria-label="Default, 48 pixels">MD</span>
      <span class="avatar avatar--lg" role="img" aria-label="Large, 64 pixels">LG</span>
      <img class="avatar" style="--avatar-size: 6rem;" src="${sam}" alt="Sam Rivera, a 96 pixel portrait" />
    </div>`,
};

export const Square: Story = {
  render: () => `
    <div class="cluster">
      <span class="avatar avatar--square" role="img" aria-label="Acme Studio">AS</span>
      <img class="avatar avatar--square" src="${ade}" alt="Ade Okafor" />
      <span class="avatar avatar--square" role="img" aria-label="Acme Studio, online">AS${dot('success')}</span>
    </div>`,
};

export const Looks: Story = {
  render: () => `
    <div class="cluster">
      <span class="avatar avatar--accent" role="img" aria-label="Auditor">AU</span>
      <span class="avatar" style="--avatar-bg: var(--color-amber-200, Canvas); --avatar-text: var(--color-amber-900, CanvasText);" role="img" aria-label="Casey Dean">CD</span>
      <span class="avatar avatar--placeholder" role="img" aria-label="Empty seat"></span>
      <span class="avatar avatar--count" role="img" aria-label="3 more people">+3</span>
    </div>`,
};

export const Presence: Story = {
  render: () => `
    <div class="cluster">
      <span class="avatar" role="img" aria-label="Alex Bennett, online">AB${dot('success')}</span>
      <span class="avatar" role="img" aria-label="Jordan Lee, away">JL${dot('warning')}</span>
      <span class="avatar" role="img" aria-label="Morgan Chen, busy">MC${dot('danger')}</span>
      <span class="avatar" role="img" aria-label="Taylor Smith, offline">TS${dot('')}</span>
      <span class="avatar avatar--lg" role="img" aria-label="Sam Rivera, online"><img src="${sam}" alt="" />${dot('success')}</span>
    </div>`,
};

export const AsAControl: Story = {
  name: 'As a control',
  parameters: { docs: { description: { story: 'A `<button>` or `<a>` can be the avatar. It takes a focus ring and a 48px hit area (the small ones too), and no hover look. With the name beside it, a button holds both.' } } },
  render: () => `
    <div class="cluster">
      <button type="button" class="avatar"><img src="${sam}" alt="" />${dot('success')}<span class="sr-only">Account, Sam Rivera, online</span></button>
      <a class="avatar avatar--sm avatar--accent" href="#"><span aria-hidden="true">AO</span><span class="sr-only">Ade Okafor's profile</span></a>
      <button type="button" class="avatar avatar--placeholder">${user}<span class="sr-only">Add a member</span></button>
      <button type="button" class="button button--plain button--round"><span class="avatar avatar--sm" aria-hidden="true">SR</span>Sam Rivera</button>
    </div>`,
};

export const Compact: Story = {
  render: () => `
    <div class="ui-compact cluster">
      <span class="avatar avatar--sm" role="img" aria-label="Small steps to 32 pixels">SM</span>
      <span class="avatar" role="img" aria-label="Default steps to 32 pixels">MD</span>
      <span class="avatar avatar--lg" role="img" aria-label="Large steps to 48 pixels">LG</span>
    </div>`,
};

export const RightToLeft: Story = {
  render: () => `
    <div dir="rtl" lang="ar" class="cluster">
      <span class="avatar" role="img" aria-label="سارة، متصلة">س${dot('success')}</span>
      <img class="avatar" src="${ade}" alt="أديه" />
    </div>`,
};
