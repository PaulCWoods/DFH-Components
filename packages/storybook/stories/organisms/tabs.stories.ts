import type { Meta, StoryObj } from '@storybook/html';
import { icon, tabbedContent, withTabBehaviour, type TabProminence, type TabStyle } from '../_shared/tabs';

interface TabbedArgs {
  style: TabStyle;
  prominence: TabProminence;
  sm: boolean;
  layout: 'default' | 'vertical' | 'end';
}

const panel = (title: string, body: string) =>
  `<div class="stack"><h3 class="small-heading">${title}</h3><p class="text">${body}</p></div>`;

const ACCOUNT = [
  { tab: '<span class="tab__text">Overview</span>', panel: panel('Overview', 'Plan, usage and recent activity for this account.') },
  {
    tab: '<span class="tab__text">Security</span><span class="badge badge--accent badge--sm" aria-hidden="true"><span class="badge__text">2</span></span><span class="sr-only">, 2 to review</span>',
    panel: panel('Security', 'Passkeys, sessions and two-factor authentication.'),
  },
  { tab: '<span class="tab__text">Notifications</span>', panel: panel('Notifications', 'Email and push preferences.') },
  { tab: '<span class="tab__text">Billing</span>', panel: panel('Billing', 'Invoices and payment methods.') },
];

const layoutClass = (layout: TabbedArgs['layout']) => (layout === 'default' ? [] : [`tabbed-content--${layout}`]);

const meta: Meta<TabbedArgs> = {
  title: 'Organisms/Tabbed Content',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
Lays out a tab list and its panels. Layout only: the list and its tabs style themselves (see **Molecules/Tab List**).

| Modifier | Layout |
| :--- | :--- |
| (default) | List above the panels |
| \`.tabbed-content--vertical\` | List beside the panels, on the start; the list becomes vertical |
| \`.tabbed-content--end\` | List beside the panels, on the end |

**Keyboard (WAI-ARIA tabs pattern):** the product supplies it. These stories wire it up:
- one tab in the tab order (roving \`tabindex\`): the selected one;
- arrow keys move between tabs (left and right, or up and down in a vertical list), Home and End jump to the ends;
- each panel has \`tabindex="0"\`, so Tab moves from the list into the panel.

\`\`\`html
<div class="tabbed-content">
  <div class="tab-list" role="tablist" aria-label="Account settings">
    <button type="button" role="tab" id="tab-1" class="tab" aria-selected="true" aria-controls="panel-1">
      <span class="tab__text">Overview</span>
    </button>
    <button type="button" role="tab" id="tab-2" class="tab" aria-selected="false" aria-controls="panel-2" tabindex="-1">
      <span class="tab__text">Security</span>
    </button>
  </div>
  <div id="panel-1" role="tabpanel" class="tab-panel" aria-labelledby="tab-1" tabindex="0">…</div>
  <div id="panel-2" role="tabpanel" class="tab-panel" aria-labelledby="tab-2" tabindex="0" hidden>…</div>
</div>
\`\`\`
`,
      },
    },
  },
  argTypes: {
    style: { control: 'inline-radio', options: ['underline', 'segmented'] },
    prominence: { control: 'inline-radio', options: ['default', 'subtle', 'plain'], description: '--subtle applies to segmented only' },
    sm: { control: 'boolean', description: '--sm' },
    layout: { control: 'inline-radio', options: ['default', 'vertical', 'end'] },
  },
  args: { style: 'underline', prominence: 'default', sm: false, layout: 'default' },
  render: (args) =>
    withTabBehaviour(`
    <div class="demo-stage demo-constrained--md">
      ${tabbedContent('Account settings', ACCOUNT, { ...args, layout: layoutClass(args.layout) })}
    </div>
  `),
};

export default meta;
type Story = StoryObj<TabbedArgs>;

/**
 * Interactive sandbox. Click a tab, or focus one and use the arrow keys.
 */
export const Playground: Story = {};

/**
 * The list above the panels, beside them on the start, and beside them on the end.
 */
export const Layouts: Story = {
  render: () =>
    withTabBehaviour(`
    <div class="demo-stage demo-constrained--md stack">
      <span class="sb-demo-tag">default</span>
      ${tabbedContent('Default layout', ACCOUNT)}
      <span class="sb-demo-tag">--vertical</span>
      ${tabbedContent('Vertical layout', ACCOUNT, { layout: ['tabbed-content--vertical'] })}
      <span class="sb-demo-tag">--end</span>
      ${tabbedContent('End layout', ACCOUNT, { layout: ['tabbed-content--end'] })}
    </div>
  `),
};

/**
 * A segmented list switching between views of the same data.
 */
export const ViewSwitcher: Story = {
  render: () =>
    withTabBehaviour(`
    <div class="demo-stage demo-constrained--md">
      ${tabbedContent(
        'Report view',
        [
          { tab: `${icon('Grid')}<span class="tab__text">Grid</span>`, panel: panel('Grid', 'Reports as cards.') },
          { tab: `${icon('List')}<span class="tab__text">List</span>`, panel: panel('List', 'Reports as rows.') },
          { tab: `${icon('ChartBar')}<span class="tab__text">Chart</span>`, panel: panel('Chart', 'Reports as a bar chart.') },
        ],
        { style: 'segmented', prominence: 'subtle', round: true }
      )}
    </div>
  `),
};

/**
 * Settings in a vertical, plain list: accent and bold mark the selected section.
 */
export const VerticalSettings: Story = {
  render: () =>
    withTabBehaviour(`
    <div class="demo-stage demo-constrained--md">
      ${tabbedContent('Settings', ACCOUNT, { prominence: 'plain', layout: ['tabbed-content--vertical'] })}
    </div>
  `),
};
