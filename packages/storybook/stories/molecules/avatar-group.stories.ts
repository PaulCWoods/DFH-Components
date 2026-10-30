import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Molecules/Avatar Group',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
Several people: avatars in a row, spaced or stacked. A group of named people is a labelled list; a group shown beside a list of their names is \`aria-hidden\`.

### Markup
\`\`\`html
<ul class="avatar-group avatar-group--stacked" aria-label="Project members">
  <li><span class="avatar" role="img" aria-label="Sam Rivera">SR</span></li>
  <li><img class="avatar" src="ade.jpg" alt="Ade Okafor" /></li>
  <li><span class="avatar avatar--count" role="img" aria-label="3 more members">+3</span></li>
</ul>
\`\`\`

- **Options:** \`--stacked\`. Each avatar overlaps the one before by \`--avatar-group-overlap\` (a share of its size, 0.33 by default) and is ringed in the surface colour. On another surface, set \`--avatar-group-ring-color\` to it.
- **Size** comes from the avatars: put \`--avatar-size-step: sm\` on the group, or a size modifier on each.
- **"+N"** is an \`.avatar--count\`. If it opens the full list, it goes in a button whose name says so.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const photo = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=128&h=128&q=80`;
const people = [
  `<span class="avatar" role="img" aria-label="Sam Rivera">SR</span>`,
  `<img class="avatar" src="${photo('1534528741775-53994a69daeb')}" alt="Ade Okafor" />`,
  `<span class="avatar avatar--accent" role="img" aria-label="Morgan Chen">MC</span>`,
  `<img class="avatar" src="${photo('1507003211169-0a1dd7228f2d')}" alt="Jordan Lee" />`,
];
const more = `<span class="avatar avatar--count" role="img" aria-label="3 more members">+3</span>`;

const group = (cls = '', style = '', label = 'Project members') =>
  `<ul class="avatar-group${cls ? ` ${cls}` : ''}" aria-label="${label}"${style ? ` style="${style}"` : ''}>
    ${[...people, more].map((p) => `<li>${p}</li>`).join('')}
  </ul>`;

export const Playground: Story = {
  args: { stacked: true, size: 'default', overlap: 0.33 },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'default', 'lg'] },
    overlap: { control: { type: 'range', min: 0, max: 0.6, step: 0.05 } },
  },
  render: (args) => group(
    args.stacked ? 'avatar-group--stacked' : '',
    `--avatar-group-overlap: ${args.overlap};${args.size !== 'default' ? ` --avatar-size-step: ${args.size};` : ''}`,
  ),
};

export const Spaced: Story = { render: () => group() };

export const Stacked: Story = { render: () => group('avatar-group--stacked') };

export const Small: Story = { render: () => group('avatar-group--stacked', '--avatar-size-step: sm;') };

export const OnASurface: Story = {
  name: 'On a surface',
  render: () => `
    <div class="card card--subtle" style="--avatar-group-ring-color: var(--surface-muted, Canvas); max-inline-size: 20rem;">
      <div class="card__body">${group('avatar-group--stacked')}</div>
    </div>`,
};

export const WithAMoreButton: Story = {
  name: 'With a "more" button',
  render: () => `
    <ul class="avatar-group avatar-group--stacked" aria-label="Project members">
      ${people.map((p) => `<li>${p}</li>`).join('')}
      <li>
        <button type="button" class="button button--plain button--icon button--round" aria-label="Show all 7 members">
          <span class="avatar avatar--count" aria-hidden="true">+3</span>
        </button>
      </li>
    </ul>`,
};

export const RightToLeft: Story = {
  render: () => `<div dir="rtl">${group('avatar-group--stacked')}</div>`,
};
