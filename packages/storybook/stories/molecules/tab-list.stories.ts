import type { Meta, StoryObj } from '@storybook/html';
import { icon, listClasses, navList, withTabBehaviour, type TabProminence, type TabStyle } from '../_shared/tabs';

interface ListArgs {
  style: TabStyle;
  prominence: TabProminence;
  sm: boolean;
  round: boolean;
  orientation: 'horizontal' | 'vertical' | 'end';
}

const ITEMS = ['Overview', 'Activity', 'Settings', 'Members'];

const orientationClass = (orientation: ListArgs['orientation']) =>
  orientation === 'vertical' ? 'tab-list--vertical' : orientation === 'end' ? 'tab-list--end' : '';

const meta: Meta<ListArgs> = {
  title: 'Molecules/Tab List',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
A row or column of tabs: a \`role="tablist"\` that switches panels (see **Organisms/Tabbed Content**), or a \`<nav>\` of links. The list owns every axis of its tabs and draws one selection indicator that slides to the selected tab.

| Axis | Modifiers | Flag |
| :--- | :--- | :--- |
| Style | (underline), \`--segmented\` | \`--tab-list-style\` |
| Prominence | (default), \`--subtle\` (segmented only), \`--plain\` | \`--tab-list-prominence\` |
| Size | (default), \`--sm\` | \`--tab-list-size\`; a compact container steps to \`--sm\` |
| Corners | (default), \`--round\` | \`--tab-list-corners\` |

Layout: \`--vertical\`, \`--end\` (vertical, on the inline end), \`--scrollable\`, \`--fill\`, \`--floating\`, \`--docked\`, \`--flush\`, \`--tight\`.

**Every variant marks the selected tab at 3:1 or more** (WCAG 1.4.11):

| Style | Default | \`--subtle\` | \`--plain\` |
| :--- | :--- | :--- | :--- |
| Underline | Rule under the list; line indicator | – | No rule; accent line, accent bold text |
| Segmented | Outlined tabs; filled indicator | Tinted tabs; filled indicator | Bare tabs; tint, accent bold text |

- Underline is for navigation and sections; segmented switches a view.
- **Hover** changes the surface, never the text colour.
- **Size:** tabs are 48px. \`--sm\` is 32px with a 48px hit area, unless the product opts into fine-pointer targets.
- **Semantic lists:** \`<ul>\` and \`<li>\` inside the list take \`display: contents\`, so the tabs stay flex items.
- **Without anchor positioning**, the selected tab draws its own line or fill. In forced colours the indicator is \`Highlight\`.

\`\`\`html
<nav class="tab-list tab-list--segmented tab-list--round" aria-label="View">
  <a href="/grid" class="tab" aria-current="page"><span class="tab__text">Grid</span></a>
  <a href="/list" class="tab"><span class="tab__text">List</span></a>
</nav>
\`\`\`
`,
      },
    },
  },
  argTypes: {
    style: { control: 'inline-radio', options: ['underline', 'segmented'] },
    prominence: { control: 'inline-radio', options: ['default', 'subtle', 'plain'], description: '--subtle applies to segmented only' },
    sm: { control: 'boolean', description: '--sm' },
    round: { control: 'boolean', description: '--round' },
    orientation: { control: 'inline-radio', options: ['horizontal', 'vertical', 'end'] },
  },
  args: { style: 'underline', prominence: 'default', sm: false, round: false, orientation: 'horizontal' },
  render: (args) =>
    withTabBehaviour(`
    <div class="demo-stage">
      ${navList('Playground', ITEMS, { ...args, extra: [orientationClass(args.orientation)] })}
    </div>
  `),
};

export default meta;
type Story = StoryObj<ListArgs>;

/**
 * Interactive sandbox. Click a tab to move the indicator.
 */
export const Playground: Story = {};

/**
 * Every style and prominence. The selected tab is always marked at 3:1;
 * plain lists add the accent colour.
 */
export const StyleAndProminence: Story = {
  render: () =>
    withTabBehaviour(`
    <div class="demo-stage stack">
      <span class="sb-demo-tag">underline (default)</span>
      ${navList('Underline', ITEMS)}
      <span class="sb-demo-tag">underline --plain</span>
      ${navList('Underline plain', ITEMS, { prominence: 'plain' })}
      <span class="sb-demo-tag">--segmented</span>
      ${navList('Segmented', ITEMS, { style: 'segmented' })}
      <span class="sb-demo-tag">--segmented --subtle</span>
      ${navList('Segmented subtle', ITEMS, { style: 'segmented', prominence: 'subtle' })}
      <span class="sb-demo-tag">--segmented --plain</span>
      ${navList('Segmented plain', ITEMS, { style: 'segmented', prominence: 'plain' })}
    </div>
  `),
};

/**
 * Round corners on a segmented list; the indicator follows them.
 */
export const Round: Story = {
  render: () =>
    withTabBehaviour(`
    <div class="demo-stage stack">
      ${(['default', 'subtle', 'plain'] as TabProminence[])
        .map((prominence) => navList(`Round ${prominence}`, ITEMS.slice(0, 3), { style: 'segmented', prominence, round: true }))
        .join('')}
    </div>
  `),
};

/**
 * --sm is 32px with a 48px hit area. A compact container (.ui-compact) steps tabs to --sm.
 */
export const Sizes: Story = {
  render: () =>
    withTabBehaviour(`
    <div class="demo-stage stack">
      <span class="sb-demo-tag">default (48px)</span>
      ${navList('Default size', ITEMS)}
      ${navList('Default size segmented', ITEMS, { style: 'segmented' })}
      <span class="sb-demo-tag">--sm (32px, 48px hit area)</span>
      ${navList('Small', ITEMS, { sm: true })}
      ${navList('Small segmented', ITEMS, { style: 'segmented', sm: true })}
      <span class="sb-demo-tag">.ui-compact container</span>
      <div class="ui-compact stack">
        ${navList('Compact', ITEMS)}
        ${navList('Compact segmented', ITEMS, { style: 'segmented' })}
      </div>
    </div>
  `),
};

/**
 * Vertical lists: the rule and indicator sit on the inline end, or on the
 * start with --end (a list on the end side of a layout).
 */
export const Vertical: Story = {
  render: () =>
    withTabBehaviour(`
    <div class="demo-stage grid grid--auto-fit grid--2xs">
      ${navList('Vertical', ITEMS, { extra: ['tab-list--vertical'] })}
      ${navList('Vertical end', ITEMS, { extra: ['tab-list--end'] })}
      ${navList('Vertical plain', ITEMS, { prominence: 'plain', extra: ['tab-list--vertical'] })}
      ${navList('Vertical segmented subtle', ITEMS, { style: 'segmented', prominence: 'subtle', extra: ['tab-list--vertical'] })}
    </div>
  `),
};

/**
 * Set the axes on any container with the flags, and every list inside follows.
 * A modifier on a list beats the flag.
 */
export const ContainerFlags: Story = {
  render: () =>
    withTabBehaviour(`
    <div class="demo-stage stack" style="--tab-list-style: segmented; --tab-list-prominence: subtle; --tab-list-corners: round;">
      <span class="sb-demo-tag">--tab-list-style: segmented; --tab-list-prominence: subtle; --tab-list-corners: round</span>
      ${navList('Flagged', ITEMS.slice(0, 3))}
      <span class="sb-demo-tag">.tab-list--plain beats the flag</span>
      ${navList('Flagged with modifier', ITEMS.slice(0, 3), { prominence: 'plain' })}
    </div>
  `),
};

/**
 * Nested navigation: <ul>/<li> with group labels (.tab-list__content) and
 * disclosure buttons beside the tabs.
 */
export const NestedNavigation: Story = {
  render: () => `
    <div class="demo-stage demo-constrained--sm">
      <nav class="tab-list tab-list--segmented tab-list--subtle tab-list--vertical tab-list--sm" aria-label="Documentation">
        <ul>
          <li>
            <button type="button" class="button button--plain button--sm button--icon" aria-expanded="true" aria-controls="nested-start">
              <span class="sr-only">Getting started</span>${icon('ChevronDown')}
            </button>
            <span class="tab-list__content small-heading">Getting started</span>
            <ul id="nested-start">
              <li><a href="#" class="tab" aria-current="page"><span class="tab__text">Overview</span></a></li>
              <li><a href="#" class="tab"><span class="tab__text">Installation</span></a></li>
              <li><a href="#" class="tab"><span class="tab__text">Design tokens</span></a></li>
            </ul>
          </li>
          <li>
            <button type="button" class="button button--plain button--sm button--icon" aria-expanded="true" aria-controls="nested-components">
              <span class="sr-only">Components</span>${icon('ChevronDown')}
            </button>
            <span class="tab-list__content small-heading">Components</span>
            <ul id="nested-components">
              <li><a href="#" class="tab"><span class="tab__text">Buttons</span></a></li>
              <li><a href="#" class="tab"><span class="tab__text">Tabs</span><span class="status status--sm"><span class="status__text">Updated</span></span></a></li>
            </ul>
          </li>
          <li><a href="#" class="tab"><span class="tab__text">Changelog</span></a></li>
        </ul>
      </nav>
    </div>
  `,
};

/**
 * One row that scrolls, with edges that fade while there is more to see.
 * Without --scrollable a list wraps.
 */
export const Scrollable: Story = {
  render: () =>
    withTabBehaviour(`
    <div class="demo-stage demo-constrained--sm stack">
      <span class="sb-demo-tag">--scrollable</span>
      ${navList('Scrollable', ['Overview', 'Milestones', 'Roadmap', 'Analytics', 'Team members', 'Integrations', 'Audit log', 'Settings'], { extra: ['tab-list--scrollable'] })}
      <span class="sb-demo-tag">default: wraps</span>
      ${navList('Wrapping', ['All topics', 'Accessibility', 'Design tokens', 'Architecture', 'Typography', 'WCAG 2.2'], { style: 'segmented', prominence: 'subtle' })}
    </div>
  `),
};

/**
 * --fill shares the row between the tabs; --tight closes the gap.
 */
export const FillAndTight: Story = {
  render: () =>
    withTabBehaviour(`
    <div class="demo-stage demo-constrained--md stack">
      <span class="sb-demo-tag">--fill</span>
      ${navList('Fill', ['Day', 'Week', 'Month'], { extra: ['tab-list--fill'] })}
      <span class="sb-demo-tag">--segmented --subtle --fill --tight</span>
      ${navList('Fill tight', ['Day', 'Week', 'Month'], { style: 'segmented', prominence: 'subtle', extra: ['tab-list--fill', 'tab-list--tight'] })}
    </div>
  `),
};

/**
 * A floating bar, with corners concentric with its tabs. Add --docked to fix
 * it to the bottom of the viewport.
 */
export const Floating: Story = {
  render: () =>
    withTabBehaviour(`
    <div class="demo-stage stack">
      ${navList('Floating', ['Overview', 'Analytics', 'Reports'], { extra: ['tab-list--floating'] })}
      <nav class="${listClasses({ style: 'segmented', round: true, extra: ['tab-list--floating'] })}" aria-label="App">
        <a href="#" class="tab tab--icon" aria-current="page">${icon('Home')}<span class="tab__text">Home</span></a>
        <a href="#" class="tab tab--icon">${icon('Search')}<span class="tab__text">Search</span></a>
        <a href="#" class="tab tab--icon">${icon('Bell')}<span class="tab__text">Notifications</span></a>
        <a href="#" class="tab tab--icon">${icon('User')}<span class="tab__text">Profile</span></a>
      </nav>
    </div>
  `),
};

/**
 * In a flush card body or flush sidebar, --flush runs the tabs edge to edge
 * and lines their labels up with the surrounding content (--tab-list-inset).
 */
export const Flush: Story = {
  render: () =>
    withTabBehaviour(`
    <div class="demo-stage demo-constrained--sm">
      <article class="card">
        <header class="card__header"><h3 class="card__title small-heading">Workspace</h3></header>
        <div class="card__body card__body--flush">
          ${navList('Workspace', ['Projects', 'Members', 'Billing'], { style: 'segmented', prominence: 'subtle', extra: ['tab-list--vertical', 'tab-list--flush', 'tab-list--tight'] })}
        </div>
      </article>
    </div>
  `),
};
