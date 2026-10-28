import type { Meta, StoryObj } from '@storybook/html';

interface TelemetryArgs {
  label: string;
  value: string;
  unit: string;
  trend: string;
  trendDirection: 'positive' | 'negative' | 'neutral' | 'none';
  icon: string;
  variant: 'default' | 'subtle' | 'bordered' | 'pill' | 'card';
  size: 'default' | 'compact';
  status: 'none' | 'online' | 'warning' | 'busy' | 'offline';
  stacked: boolean;
}

const meta: Meta<TelemetryArgs> = {
  title: 'Molecules/Telemetry',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
### Developer & Designer Notes: Telemetry & Stat Pill Primitives

The **Telemetry** primitive provides compact metric pills, stat counters, and multi-metric dashboard strips.
Designed for high-density audio consoles, operational telemetry bars, and analytics dashboards.

#### WCAG 2.2 Level AA / AAA Compliance:
- **1.4.3 Contrast (Minimum):** All telemetry labels and numerical values meet 4.5:1 / 7:1 contrast ratios against light and dark surfaces.
- **1.4.11 Non-Text Contrast:** Integrated 1px / 2px borders, status rings, and icons maintain 3:1 contrast against container backdrops.
- **Semantic Flexibility:** Supports both \`<div>\`/\`<span>\`/\`<strong>\` and native HTML5 \`<dl>\`/\`<dt>\`/\`<dd>\` definition lists for optimal screen reader key-value pairing.
- **Tabular Numerics:** Values strictly utilize \`font-variant-numeric: tabular-nums\` to avoid horizontal layout jank during live telemetry readouts.

---

#### Canonical Component Markup Signatures

\`\`\`html
<!-- 1. Standard Telemetry Metric Pill -->
<div class="telemetry">
  <svg class="telemetry__icon icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#User"/></svg>
  <div class="telemetry__content">
    <span class="telemetry__label">Listeners</span>
    <strong class="telemetry__value">14,820</strong>
  </div>
</div>

<!-- 2. Metric with Unit & Trend -->
<div class="telemetry">
  <div class="telemetry__content">
    <span class="telemetry__label">Buffer Latency</span>
    <strong class="telemetry__value">42<span class="telemetry__unit">ms</span></strong>
  </div>
  <span class="telemetry__trend" data-trend="positive" aria-label="Improved by 4 milliseconds">
    <svg class="icon font-size-xs" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#ArrowDown"/></svg>
    -4ms
  </span>
</div>

<!-- 3. Semantic Definition List Telemetry Strip -->
<dl class="telemetry-group telemetry-strip--ruled" aria-label="Station live metrics">
  <div class="telemetry">
    <dt class="telemetry__label">Listeners</dt>
    <dd class="telemetry__value">14,820</dd>
  </div>
  <div class="telemetry">
    <dt class="telemetry__label">Peak Today</dt>
    <dd class="telemetry__value">28,450</dd>
  </div>
  <div class="telemetry">
    <dt class="telemetry__label">Uptime</dt>
    <dd class="telemetry__value">99.98%</dd>
  </div>
</dl>

<!-- 4. Dashboard KPI Stat Card (.telemetry--card .telemetry--stacked) -->
<div class="telemetry telemetry--card telemetry--stacked">
  <svg class="telemetry__icon icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#ArrowUpRight"/></svg>
  <div class="telemetry__content">
    <span class="telemetry__label">Monthly Recurring Revenue</span>
    <strong class="telemetry__value">$48,290</strong>
    <span class="telemetry__trend telemetry__trend--positive">
      +14.2% vs last month
    </span>
  </div>
</div>
\`\`\`
`,
      },
    },
  },
  argTypes: {
    label: { control: 'text', description: 'Metric title / label' },
    value: { control: 'text', description: 'Numerical or formatted readout value' },
    unit: { control: 'text', description: 'Optional unit suffix (ms, %, GB, etc.)' },
    trend: { control: 'text', description: 'Trend percentage or delta change text' },
    trendDirection: {
      control: { type: 'select' },
      options: ['none', 'positive', 'negative', 'neutral'],
      description: 'Trend semantic indicator color',
    },
    icon: {
      control: { type: 'select' },
      options: ['User', 'Progress', 'Circle', 'Settings', 'Record', 'Upload', 'ArrowUp', 'ArrowDown', 'None'],
      description: 'Leading SVG sprite icon symbol',
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'subtle', 'bordered', 'pill', 'card'],
      description: 'Visual container styling',
    },
    size: {
      control: { type: 'select' },
      options: ['default', 'compact'],
      description: 'Density scale',
    },
    status: {
      control: { type: 'select' },
      options: ['none', 'online', 'warning', 'busy', 'offline'],
      description: 'Status intent highlight color',
    },
    stacked: { control: 'boolean', description: 'Stack label and value vertically' },
  },
  args: {
    label: 'Listeners',
    value: '14,820',
    unit: '',
    trend: '+12.4%',
    trendDirection: 'positive',
    icon: 'User',
    variant: 'default',
    size: 'default',
    status: 'none',
    stacked: false,
  },
};

export default meta;
type Story = StoryObj<TelemetryArgs>;

/**
 * 1. Interactive Playground
 */
export const Playground: Story = {
  render: (args) => {
    const classes = [
      'telemetry',
      args.variant === 'subtle' ? 'telemetry--subtle' : '',
      args.variant === 'bordered' ? 'telemetry--bordered' : '',
      args.variant === 'pill' ? 'telemetry--pill' : '',
      args.variant === 'card' ? 'telemetry--card' : '',
      args.size === 'compact' ? 'telemetry--compact' : '',
      args.stacked ? 'telemetry--stacked' : '',
    ]
      .filter(Boolean)
      .join(' ');

    const statusAttr = args.status !== 'none' ? `data-status="${args.status}"` : '';
    const hasIcon = args.icon && args.icon !== 'None';
    const hasTrend = args.trend && args.trendDirection !== 'none';

    return `
      <div style="padding: 2rem; display: flex; justify-content: center; align-items: center; background-color: var(--surface);">
        <div class="${classes}" ${statusAttr}>
          ${hasIcon ? `<svg class="telemetry__icon icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#${args.icon}"/></svg>` : ''}
          <div class="telemetry__content">
            <span class="telemetry__label">${args.label}</span>
            <strong class="telemetry__value">${args.value}${args.unit ? `<span class="telemetry__unit">${args.unit}</span>` : ''}</strong>
          </div>
          ${
            hasTrend
              ? `<span class="telemetry__trend" data-trend="${args.trendDirection}">${args.trend}</span>`
              : ''
          }
        </div>
      </div>
    `;
  },
};

/**
 * 2. Cadence Station Header Telemetry Strip
 * Demonstrates the exact metrics strip needed for live broadcast telemetry.
 */
export const QuickMetricsStrip: Story = {
  render: () => `
    <div style="padding: 2rem; background-color: var(--surface);">
      <div class="telemetry-group" role="region" aria-label="Station live metrics">
        
        <!-- Active Listeners -->
        <div class="telemetry">
          <svg class="telemetry__icon icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#User"/></svg>
          <div class="telemetry__content">
            <span class="telemetry__label">Listeners</span>
            <strong class="telemetry__value">14,820</strong>
          </div>
        </div>

        <!-- Peak Today -->
        <div class="telemetry">
          <svg class="telemetry__icon icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Progress"/></svg>
          <div class="telemetry__content">
            <span class="telemetry__label">Peak</span>
            <strong class="telemetry__value">28,450</strong>
          </div>
        </div>

        <!-- Broadcast Uptime -->
        <div class="telemetry" data-status="online">
          <svg class="telemetry__icon icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Circle"/></svg>
          <div class="telemetry__content">
            <span class="telemetry__label">Uptime</span>
            <strong class="telemetry__value">99.98%</strong>
          </div>
        </div>

        <!-- Buffer Latency with Unit -->
        <div class="telemetry">
          <svg class="telemetry__icon icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Settings"/></svg>
          <div class="telemetry__content">
            <span class="telemetry__label">Latency</span>
            <strong class="telemetry__value">42<span class="telemetry__unit">ms</span></strong>
          </div>
        </div>

      </div>
    </div>
  `,
};

/**
 * 3. Ruled Telemetry Strip
 * Segmented multi-item strip sharing a single perimeter with integrated dividers.
 */
export const RuledTelemetryStrip: Story = {
  render: () => `
    <div style="padding: 2rem; background-color: var(--surface);">
      <div class="telemetry-strip telemetry-strip--ruled" role="region" aria-label="Server health telemetry">
        
        <div class="telemetry">
          <svg class="telemetry__icon icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Progress"/></svg>
          <div class="telemetry__content">
            <span class="telemetry__label">CPU Load</span>
            <strong class="telemetry__value">18.4%</strong>
          </div>
        </div>

        <div class="telemetry">
          <svg class="telemetry__icon icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Upload"/></svg>
          <div class="telemetry__content">
            <span class="telemetry__label">Memory</span>
            <strong class="telemetry__value">4.2<span class="telemetry__unit">GB</span></strong>
          </div>
        </div>

        <div class="telemetry">
          <svg class="telemetry__icon icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#ArrowDown"/></svg>
          <div class="telemetry__content">
            <span class="telemetry__label">Network In</span>
            <strong class="telemetry__value">142<span class="telemetry__unit">MB/s</span></strong>
          </div>
        </div>

        <div class="telemetry">
          <svg class="telemetry__icon icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#ArrowUp"/></svg>
          <div class="telemetry__content">
            <span class="telemetry__label">Network Out</span>
            <strong class="telemetry__value">318<span class="telemetry__unit">MB/s</span></strong>
          </div>
        </div>

      </div>
    </div>
  `,
};

/**
 * 4. Semantic Definition List Semantics
 * Accessible key-value pairs using HTML5 `<dl>`, `<dt>`, and `<dd>`.
 */
export const DefinitionListSemantics: Story = {
  render: () => `
    <div style="padding: 2rem; background-color: var(--surface);">
      <dl class="telemetry-group" aria-label="Stream encoding specifications">
        
        <div class="telemetry telemetry--pill">
          <dt class="telemetry__label">
            <svg class="telemetry__icon icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Check"/></svg>
            Codec
          </dt>
          <dd class="telemetry__value">AAC-LC</dd>
        </div>

        <div class="telemetry telemetry--pill">
          <dt class="telemetry__label">Bitrate</dt>
          <dd class="telemetry__value">320<span class="telemetry__unit">kbps</span></dd>
        </div>

        <div class="telemetry telemetry--pill">
          <dt class="telemetry__label">Sample Rate</dt>
          <dd class="telemetry__value">48<span class="telemetry__unit">kHz</span></dd>
        </div>

        <div class="telemetry telemetry--pill">
          <dt class="telemetry__label">Channels</dt>
          <dd class="telemetry__value">Stereo (2.0)</dd>
        </div>

      </dl>
    </div>
  `,
};

/**
 * 5. Telemetry with Trends & Status Indicators
 * Highlights growth, warnings, and live service health.
 */
export const WithTrendsAndStatuses: Story = {
  render: () => `
    <div style="padding: 2rem; display: flex; flex-direction: column; gap: var(--spacing-16); background-color: var(--surface);">
      
      <!-- Trend indicators -->
      <div class="telemetry-group">
        <div class="telemetry">
          <div class="telemetry__content">
            <span class="telemetry__label">Concurrent Streams</span>
            <strong class="telemetry__value">3,492</strong>
          </div>
          <span class="telemetry__trend" data-trend="positive">+8.4%</span>
        </div>

        <div class="telemetry">
          <div class="telemetry__content">
            <span class="telemetry__label">Error Rate</span>
            <strong class="telemetry__value">0.02%</strong>
          </div>
          <span class="telemetry__trend" data-trend="positive">-0.05%</span>
        </div>

        <div class="telemetry">
          <div class="telemetry__content">
            <span class="telemetry__label">Packet Drop</span>
            <strong class="telemetry__value">1.4%</strong>
          </div>
          <span class="telemetry__trend" data-trend="negative">+0.8%</span>
        </div>
      </div>

      <!-- Semantic status ring variations -->
      <div class="telemetry-group">
        <div class="telemetry" data-status="online">
          <span class="status status--success status--plain"></span>
          <div class="telemetry__content">
            <span class="telemetry__label">Primary Transcoder</span>
            <strong class="telemetry__value">Healthy</strong>
          </div>
        </div>

        <div class="telemetry" data-status="warning">
          <span class="status status--warning status--plain"></span>
          <div class="telemetry__content">
            <span class="telemetry__label">Secondary Sync</span>
            <strong class="telemetry__value">Syncing</strong>
          </div>
        </div>

        <div class="telemetry" data-status="offline">
          <span class="status status--danger status--plain"></span>
          <div class="telemetry__content">
            <span class="telemetry__label">Tertiary Cart</span>
            <strong class="telemetry__value">Offline</strong>
          </div>
        </div>
      </div>

    </div>
  `,
};

/**
 * 6. Dashboard KPI Stat Cards (.telemetry--card)
 * Larger stacked cards designed for overview grids and executive dashboards.
 */
export const CardMetricsDashboard: Story = {
  render: () => `
    <div style="padding: 2rem; background-color: var(--surface);">
      <div class="grid grid--3-col" style="--grid-gap: var(--spacing-16);">
        
        <div class="telemetry telemetry--card telemetry--stacked">
          <svg class="telemetry__icon icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Progress"/></svg>
          <div class="telemetry__content">
            <span class="telemetry__label">Total Listen Hours</span>
            <strong class="telemetry__value" style="font-size: var(--typography-font-size-2);">128,450<span class="telemetry__unit">hrs</span></strong>
            <span class="telemetry__trend telemetry__trend--positive">
              +18.2% vs previous period
            </span>
          </div>
        </div>

        <div class="telemetry telemetry--card telemetry--stacked">
          <svg class="telemetry__icon icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Record"/></svg>
          <div class="telemetry__content">
            <span class="telemetry__label">Avg Session Duration</span>
            <strong class="telemetry__value" style="font-size: var(--typography-font-size-2);">48.2<span class="telemetry__unit">mins</span></strong>
            <span class="telemetry__trend telemetry__trend--positive">
              +4.1 mins longer
            </span>
          </div>
        </div>

        <div class="telemetry telemetry--card telemetry--stacked">
          <svg class="telemetry__icon icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#ArrowUp"/></svg>
          <div class="telemetry__content">
            <span class="telemetry__label">CDN Bandwidth</span>
            <strong class="telemetry__value" style="font-size: var(--typography-font-size-2);">14.8<span class="telemetry__unit">TB</span></strong>
            <span class="telemetry__trend telemetry__trend--neutral">
              Within monthly budget
            </span>
          </div>
        </div>

      </div>
    </div>
  `,
};

/**
 * 7. Compact Density & Inline Variations
 * Ultra-compact pills for dense toolbars and inline readouts.
 */
export const CompactAndInline: Story = {
  render: () => `
    <div style="padding: 2rem; display: flex; flex-direction: column; gap: var(--spacing-16); background-color: var(--surface);">
      
      <!-- Compact pills -->
      <div class="telemetry-group">
        <div class="telemetry telemetry--compact">
          <span class="telemetry__label">FPS</span>
          <strong class="telemetry__value">60</strong>
        </div>

        <div class="telemetry telemetry--compact">
          <span class="telemetry__label">Ping</span>
          <strong class="telemetry__value">12<span class="telemetry__unit">ms</span></strong>
        </div>

        <div class="telemetry telemetry--compact">
          <span class="telemetry__label">Loss</span>
          <strong class="telemetry__value">0%</strong>
        </div>
      </div>

      <!-- Inline side-by-side layout -->
      <div class="telemetry-group">
        <div class="telemetry telemetry--inline">
          <div class="telemetry__content">
            <span class="telemetry__label">Station Buffer:</span>
            <strong class="telemetry__value">4.0s</strong>
          </div>
        </div>

        <div class="telemetry telemetry--inline">
          <div class="telemetry__content">
            <span class="telemetry__label">Bitrate:</span>
            <strong class="telemetry__value">320 kbps</strong>
          </div>
        </div>
      </div>

    </div>
  `,
};
