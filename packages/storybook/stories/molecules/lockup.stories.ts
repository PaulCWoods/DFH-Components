import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Molecules/Lockup',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
A primary line with a secondary one under it: a name and an email, a plot and its soil. The lockup stacks its lines and lets them truncate; type comes from text atoms on the lines.

### Markup
\`\`\`html
<span class="lockup">
  <span class="small-heading">Marcus Chen</span>
  <span class="small-text text-muted">mchen@urbanmail.net</span>
</span>

<!-- Identity: a decorative avatar beside a lockup -->
<div class="inline">
  <span class="avatar avatar--sm" aria-hidden="true">MC</span>
  <span class="lockup">
    <span class="small-heading">Marcus Chen</span>
    <span class="small-text text-muted">mchen@urbanmail.net</span>
  </span>
</div>
\`\`\`

- **Lines** take any text atom; the lockup sets no type. Add \`.truncate\` to a line to clip it with an ellipsis.
- **Alignment:** \`.text-center\` or \`.text-end\` on the lockup.
- **Spacing:** \`--lockup-gap\` (none by default; the lines' own leading spaces them).
- **Inline:** a \`<span class="lockup">\` is inline-flex, so it can sit in a sentence or a button.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const lockup = (primary: string, secondary: string, o: { cls?: string; truncate?: boolean } = {}) => `
  <span class="lockup${o.cls ? ` ${o.cls}` : ''}">
    <span class="small-heading${o.truncate ? ' truncate' : ''}">${primary}</span>
    <span class="small-text text-muted${o.truncate ? ' truncate' : ''}">${secondary}</span>
  </span>`;

const identity = (initials: string, name: string, email: string, truncate = false) => `
  <div class="inline" style="min-inline-size: 0;">
    <span class="avatar avatar--sm" aria-hidden="true">${initials}</span>
    ${lockup(name, email, { truncate })}
  </div>`;

export const Playground: Story = {
  args: { primary: 'Full sun', secondary: 'Mycorrhizal fungi and leaf mulch', align: 'start', gap: '0px' },
  argTypes: { align: { control: 'inline-radio', options: ['start', 'center', 'end'] } },
  render: (args) => `
    <span class="lockup${args.align !== 'start' ? ` text-${args.align}` : ''}" style="--lockup-gap: ${args.gap}; inline-size: min(20rem, 100%);">
      <span class="small-heading">${args.primary}</span>
      <span class="small-text text-muted">${args.secondary}</span>
    </span>`,
};

export const Identity: Story = {
  render: () => `
    <div class="stack">
      ${identity('MC', 'Marcus Chen', 'mchen@urbanmail.net')}
      <div class="inline">
        <span class="avatar" aria-hidden="true">SP</span>
        <span class="lockup">
          <span class="heading">Sunita Patel</span>
          <span class="text text-muted">Plot coordinator</span>
        </span>
      </div>
    </div>`,
};

export const Aligned: Story = {
  render: () => `
    <div class="stack" style="inline-size: min(20rem, 100%);">
      ${lockup('Plot A-12', 'Raised bed', { cls: 'text-center' })}
      ${lockup('Plot B-04', 'In-ground', { cls: 'text-end' })}
    </div>`,
};

export const InATable: Story = {
  name: 'In a table',
  render: () => `
    <div class="table-container" tabindex="0" role="region" aria-label="Plots"><table class="table table--bordered" style="max-inline-size: 40rem;">
      <thead>
        <tr><th scope="col">Plot</th><th scope="col">Gardener</th><th scope="col">Sun and soil</th></tr>
      </thead>
      <tbody>
        <tr>
          <td class="font-mono">A-12</td>
          <td>${identity('MC', 'Marcus Chen', 'mchen@urbanmail.net')}</td>
          <td>${lockup('Full sun', 'Mycorrhizal fungi and leaf mulch')}</td>
        </tr>
        <tr>
          <td class="font-mono">B-04</td>
          <td>${identity('SP', 'Sunita Patel', 'spatel@sunnyside.org')}</td>
          <td>${lockup('Partial shade', 'Biochar and aged manure')}</td>
        </tr>
      </tbody>
    </table></div>`,
};

export const Truncated: Story = {
  render: () => `
    <div style="inline-size: 12rem; border: 1px dashed currentColor; padding: 0.5rem;">
      ${identity('AW', 'Alexandria Wolfeschlegelsteinhausen', 'alexandria.wolfeschlegelsteinhausen@longdomain.example', true)}
    </div>`,
};

export const Gap: Story = {
  render: () => `<span class="lockup" style="--lockup-gap: 0.5rem;"><span class="small-heading">Harvest due</span><span class="small-text text-muted">In 12 days</span></span>`,
};

export const RightToLeft: Story = {
  render: () => `<div dir="rtl" lang="ar">${identity('م', 'مروان شن', 'marwan@example.org')}</div>`,
};
