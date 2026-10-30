import type { Meta, StoryObj } from '@storybook/html';
import { icon, listClasses, withTabBehaviour, type TabStyle } from '../_shared/tabs';

interface TabArgs {
  label: string;
  style: TabStyle;
  asLink: boolean;
  selected: boolean;
  hasIcon: boolean;
  hasBadge: boolean;
  iconOnly: boolean;
  disabled: boolean;
}

/** One tab built from the controls, between two plain siblings. */
const tab = (args: TabArgs) => {
  const tag = args.asLink ? 'a' : 'button';
  const state = args.asLink
    ? `href="#"${args.selected ? ' aria-current="page"' : ''}`
    : `type="button" role="tab" aria-selected="${args.selected}" tabindex="${args.selected ? 0 : -1}"`;
  const disabled = args.disabled ? (args.asLink ? ' aria-disabled="true"' : ' disabled') : '';
  const content = [
    args.hasIcon || args.iconOnly ? icon('Home') : '',
    `<span class="tab__text">${args.label}</span>`,
    args.hasBadge ? '<span class="badge badge--sm" aria-hidden="true"><span class="badge__text">3</span></span><span class="sr-only">, 3 new</span>' : '',
  ].join('');
  return `<${tag} ${state} class="tab${args.iconOnly ? ' tab--icon' : ''}"${disabled}>${content}</${tag}>`;
};

const sibling = (asLink: boolean, label: string, selected = false) =>
  asLink
    ? `<a href="#" class="tab"${selected ? ' aria-current="page"' : ''}><span class="tab__text">${label}</span></a>`
    : `<button type="button" role="tab" class="tab" aria-selected="${selected}" tabindex="${selected ? 0 : -1}"><span class="tab__text">${label}</span></button>`;

const list = (style: TabStyle, asLink: boolean, tabs: string, label = 'Example') =>
  asLink
    ? `<nav class="${listClasses({ style })}" aria-label="${label}">${tabs}</nav>`
    : `<div class="${listClasses({ style })}" role="tablist" aria-label="${label}">${tabs}</div>`;

const meta: Meta<TabArgs> = {
  title: 'Atoms/Tab',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
One tab: a \`<button role="tab">\` in a tablist, or an \`<a>\` in navigation. A tab always lives in a \`.tab-list\`, which sets its style, prominence, size and corners and draws the selection indicator. See **Molecules/Tab List** for the variants.

- **Selected:** \`aria-selected="true"\` in a tablist; \`aria-current\` (any value but \`"false"\`) in navigation. No class is needed.
- **Hover** changes the surface, never the text colour: a 3:1 line under an underline tab, a tint on a segmented tab.
- **Icon-only:** add \`.tab--icon\` and keep the label in \`.tab__text\`; it stays in the accessible name. A tab whose only text is visually hidden is treated as icon-only too.
- **Counts:** hide the badge from assistive technology and spell the count out in visually hidden text.
- **Disabled:** \`disabled\` on a button; \`aria-disabled="true"\` on a link.

\`\`\`html
<nav class="tab-list" aria-label="Sections">
  <a href="/code" class="tab" aria-current="page"><span class="tab__text">Code</span></a>
  <a href="/issues" class="tab"><span class="tab__text">Issues</span></a>
</nav>
\`\`\`
`,
      },
    },
  },
  argTypes: {
    label: { control: 'text' },
    style: { control: 'inline-radio', options: ['underline', 'segmented'], description: 'Set on the list' },
    asLink: { control: 'boolean', description: '<a> in navigation instead of <button role="tab">' },
    selected: { control: 'boolean' },
    hasIcon: { control: 'boolean' },
    hasBadge: { control: 'boolean' },
    iconOnly: { control: 'boolean', description: '.tab--icon' },
    disabled: { control: 'boolean' },
  },
  args: {
    label: 'Overview',
    style: 'underline',
    asLink: false,
    selected: true,
    hasIcon: true,
    hasBadge: false,
    iconOnly: false,
    disabled: false,
  },
  render: (args) => `
    <div class="demo-stage">
      ${list(args.style, args.asLink, tab(args) + sibling(args.asLink, 'Activity', !args.selected && !args.disabled) + sibling(args.asLink, 'Settings'))}
    </div>
  `,
};

export default meta;
type Story = StoryObj<TabArgs>;

/**
 * Interactive sandbox. The tab sits in a list, as it always does.
 */
export const Playground: Story = {};

/**
 * Rest, selected and disabled, in both styles. Click a tab to select it.
 */
export const States: Story = {
  render: () =>
    withTabBehaviour(`
    <div class="demo-stage stack">
      ${(['underline', 'segmented'] as TabStyle[])
        .map(
          (style) => `
        <span class="sb-demo-tag">${style}</span>
        <div class="${listClasses({ style })}" role="tablist" aria-label="${style} states">
          <button type="button" role="tab" class="tab" aria-selected="true" tabindex="0"><span class="tab__text">Selected</span></button>
          <button type="button" role="tab" class="tab" aria-selected="false" tabindex="-1"><span class="tab__text">Rest</span></button>
          <button type="button" role="tab" class="tab" aria-selected="false" tabindex="-1" disabled><span class="tab__text">Disabled</span></button>
        </div>`
        )
        .join('')}
    </div>
  `),
};

/**
 * What a tab can hold: an icon, a count badge, a status, or only an icon.
 */
export const Content: Story = {
  render: () =>
    withTabBehaviour(`
    <div class="demo-stage stack">
      ${(['underline', 'segmented'] as TabStyle[])
        .map(
          (style) => `
        <span class="sb-demo-tag">${style}</span>
        <div class="${listClasses({ style })}" role="tablist" aria-label="${style} content">
          <button type="button" role="tab" class="tab" aria-selected="true" tabindex="0">${icon('Home')}<span class="tab__text">Icon</span></button>
          <button type="button" role="tab" class="tab" aria-selected="false" tabindex="-1">
            <span class="tab__text">Badge</span>
            <span class="badge badge--accent badge--sm" aria-hidden="true"><span class="badge__text">14</span></span><span class="sr-only">, 14 open</span>
          </button>
          <button type="button" role="tab" class="tab" aria-selected="false" tabindex="-1">
            <span class="tab__text">Status</span>
            <span class="status status--sm"><span class="status__text">Beta</span></span>
          </button>
          <button type="button" role="tab" class="tab tab--icon" aria-selected="false" tabindex="-1">${icon('Settings')}<span class="tab__text">Settings</span></button>
        </div>`
        )
        .join('')}
    </div>
  `),
};

/**
 * Labels collapse to icons in a narrow region: .hide-labels on the list, or
 * --ui-labels: hidden on any container. The label stays in the accessible name.
 */
export const HiddenLabels: Story = {
  render: () => `
    <div class="demo-stage stack">
      <nav class="tab-list hide-labels" aria-label="Collapsed navigation">
        <a href="#" class="tab" aria-current="page">${icon('Home')}<span class="tab__text">Feed</span></a>
        <a href="#" class="tab">${icon('Search')}<span class="tab__text">Explore</span></a>
        <a href="#" class="tab">${icon('Bell')}<span class="tab__text">Alerts</span></a>
      </nav>
      <nav class="tab-list tab-list--segmented" style="--ui-labels: hidden;" aria-label="Collapsed segmented navigation">
        <a href="#" class="tab" aria-current="page">${icon('Home')}<span class="tab__text">Feed</span></a>
        <a href="#" class="tab">${icon('Search')}<span class="tab__text">Explore</span></a>
        <a href="#" class="tab">${icon('Bell')}<span class="tab__text">Alerts</span></a>
      </nav>
    </div>
  `,
};
