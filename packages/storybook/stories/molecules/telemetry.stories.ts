import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Molecules/Telemetry',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
A labelled value: "Uptime 99.98%". A description list, so each label is a term and its value the description. The telemetry draws the surface and lays out the parts; type comes from text atoms on them, and the value gets tabular figures.

### Markup
\`\`\`html
<dl class="telemetry-group" aria-label="Station">
  <div class="telemetry">
    <dt class="small-text text-muted"><svg class="icon" …><use href="#Progress"/></svg>Uptime</dt>
    <dd class="small-heading">99.98<span class="small-text">%</span></dd>
  </div>
</dl>
\`\`\`

- **Label** (\`dt\`): a text atom, with an optional leading icon.
- **Value** (\`dd\`): a text atom; a unit is a smaller text atom inside it. Values use tabular figures so they don't jump as they change.
- **Trend or state:** a \`.status--plain\` with an arrow icon and signed text ("+12%") in the value, so it is never colour alone.
- **Options:** \`--icon-start\` (the label's icon moves to a gutter at the start of the box, larger and centred; flag \`--telemetry-icon-placement: start\`), \`--inline\` (label beside value), \`--subtle\` (a tint with no border) and \`--plain\` (no surface, border or padding; flag \`--telemetry-prominence\`), \`--round\` (flag \`--telemetry-corners: round\`), \`--compact\` (or any compact container).
- **Group:** \`.telemetry-group\` is the \`<dl>\`; \`--fill\` grows its items to share the row. A single telemetry is a \`<dl class="telemetry">\` with its \`dt\` and \`dd\` directly inside.
- **Live values:** don't make the group a live region. If a change matters, announce it in a separate \`role="status"\`.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const icon = (name: string) => `<svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#${name}"/></svg>`;

type Metric = { label: string; value: string; unit?: string; icon?: string; trend?: { intent: string; arrow: string; text: string } };

const metric = (m: Metric, o: { cls?: string; value?: string } = {}) => `
  <div class="telemetry${o.cls ? ` ${o.cls}` : ''}">
    <dt class="small-text text-muted">${m.icon ? icon(m.icon) : ''}${m.label}</dt>
    <dd class="${o.value ?? 'small-heading'}">${m.value}${m.unit ? `<span class="small-text">${m.unit}</span>` : ''}${m.trend ? `
      <span class="status status--plain status--${m.trend.intent}">${icon(m.trend.arrow)}${m.trend.text}</span>` : ''}</dd>
  </div>`;

const group = (label: string, items: Metric[], o: { cls?: string; item?: string; value?: string } = {}) =>
  `<dl class="telemetry-group${o.cls ? ` ${o.cls}` : ''}" aria-label="${label}">${items.map((m) => metric(m, { cls: o.item, value: o.value })).join('')}</dl>`;

const station: Metric[] = [
  { label: 'Listeners', value: '14,820', icon: 'User' },
  { label: 'Peak today', value: '28,450', icon: 'Progress' },
  { label: 'Latency', value: '42', unit: 'ms', icon: 'Settings' },
];

const server: Metric[] = [
  { label: 'CPU load', value: '18.4', unit: '%' },
  { label: 'Memory', value: '4.2', unit: 'GB' },
  { label: 'Network in', value: '142', unit: 'MB/s', icon: 'ArrowDown' },
  { label: 'Network out', value: '318', unit: 'MB/s', icon: 'ArrowUp' },
];

export const Playground: Story = {
  args: { iconStart: false, inline: false, prominence: 'default', round: false, compact: false, fill: false, icons: true },
  argTypes: { prominence: { control: 'inline-radio', options: ['default', 'subtle', 'plain'] } },
  render: (args) => {
    const item = [args.iconStart && 'telemetry--icon-start', args.inline && 'telemetry--inline', args.prominence !== 'default' && `telemetry--${args.prominence}`, args.round && 'telemetry--round', args.compact && 'telemetry--compact'].filter(Boolean).join(' ');
    const items = station.map((m) => ({ ...m, icon: args.icons ? m.icon : undefined }));
    return group('Station', items, { cls: args.fill ? 'telemetry-group--fill' : '', item });
  },
};

export const Default: Story = { render: () => group('Station', station) };

export const IconStart: Story = {
  name: 'Icon start',
  render: () => `
    <div class="stack">
      ${group('Station', station, { item: 'telemetry--icon-start' })}
      ${group('Server health', server.filter((m) => m.icon), { item: 'telemetry--icon-start' })}
      ${group('Station', station, { item: 'telemetry--icon-start telemetry--round telemetry--inline' })}
      <div style="--telemetry-icon-placement: start;">${group('Station, set by a container flag', station, { item: 'telemetry--compact' })}</div>
      <div dir="rtl">${group('Station', station, { item: 'telemetry--icon-start' })}</div>
    </div>`,
};

export const Fill: Story = {
  parameters: { docs: { description: { story: '`--fill` grows each item to share the row, as a tab list does.' } } },
  render: () => group('Server health', server, { cls: 'telemetry-group--fill' }),
};

export const Trends: Story = {
  render: () => group('This month', [
    { label: 'Listen hours', value: '128,450', trend: { intent: 'success', arrow: 'TrendUp', text: '+18.2%' } },
    { label: 'Drop-off', value: '3.1', unit: '%', trend: { intent: 'danger', arrow: 'TrendUp', text: '+0.4 pts' } },
    { label: 'Bandwidth', value: '14.8', unit: 'TB', trend: { intent: 'neutral', arrow: 'ArrowRight', text: 'Flat' } },
  ], { value: 'heading' }),
};

export const Inline: Story = {
  render: () => group('Stream encoding', [
    { label: 'Codec', value: 'AAC-LC' },
    { label: 'Bitrate', value: '320', unit: 'kbps' },
    { label: 'Sample rate', value: '48', unit: 'kHz' },
  ], { item: 'telemetry--inline telemetry--round', value: 'small-text font-bold' }),
};

export const Subtle: Story = {
  render: () => group('Station', station, { item: 'telemetry--subtle' }),
};

export const Plain: Story = {
  render: () => group('Connection', [
    { label: 'Ping', value: '12', unit: 'ms' },
    { label: 'Loss', value: '0', unit: '%' },
    { label: 'FPS', value: '60' },
  ], { item: 'telemetry--plain' }),
};

export const Compact: Story = { render: () => group('Station', station, { item: 'telemetry--compact' }) };

export const InACompactRegion: Story = {
  name: 'In a compact region',
  render: () => `<div class="ui-compact">${group('Server health', server, { cls: 'telemetry-group--fill' })}</div>`,
};

export const Single: Story = {
  render: () => `
    <dl class="telemetry">
      <dt class="small-text text-muted">${icon('User')}Listeners</dt>
      <dd class="small-heading">14,820</dd>
    </dl>`,
};

export const WithAState: Story = {
  name: 'With a state',
  render: () => group('Encoder', [
    { label: 'Stream', value: '', trend: { intent: 'success', arrow: 'Check', text: 'Online' } },
    { label: 'Backup', value: '', trend: { intent: 'warning', arrow: 'Warning', text: 'Degraded' } },
  ]),
};

export const RightToLeft: Story = {
  render: () => `<div dir="rtl">${group('Server health', server, { cls: 'telemetry-group--fill' })}</div>`,
};
