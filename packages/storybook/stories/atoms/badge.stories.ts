import type { Meta, StoryObj } from '@storybook/html';

type Intent = 'neutral' | 'accent' | 'info' | 'danger' | 'warning' | 'success';
type Placement = 'inline' | 'top-end' | 'top-start' | 'bottom-end' | 'bottom-start';

interface BadgeArgs {
  count: string;
  intent: Intent;
  small: boolean;
  dot: boolean;
  placement: Placement;
}

const INTENTS: Intent[] = ['neutral', 'accent', 'info', 'danger', 'warning', 'success'];

const badgeClasses = (intent: Intent, small = false, dot = false, placement: Placement = 'inline') =>
  [
    'badge',
    intent !== 'neutral' ? `badge--${intent}` : '',
    small ? 'badge--sm' : '',
    dot ? 'badge--dot' : '',
    placement !== 'inline' ? `badge--${placement}` : '',
  ]
    .filter(Boolean)
    .join(' ');

const meta: Meta<BadgeArgs> = {
  title: 'Atoms/Badge',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
A count or dot **attached to a host**: a tab, button, nav item or icon. It sits inline after the host's label or in one of its corners.

- State of a thing ("Passed", "Live") is a **Status**.
- A value or tag ("TypeScript") is a **Chip**.
- A keyboard shortcut is a **Kbd**.

| Axis | Modifiers | Container flag |
| :--- | :--- | :--- |
| Intent | neutral (default), \`--accent\`, \`--danger\`, \`--warning\`, \`--success\`, \`--info\` | \`--badge-intent\` |
| Size | default, \`--sm\` | \`--badge-size\` |
| Density | none on the badge; a compact container steps it to \`--sm\` | \`--ui-sizing: compact\` |
| Presentation | \`--dot\` (no count) | |
| Prominence | fixed: always a solid fill | |

Placement: inline by default; \`--top-end\`, \`--top-start\`, \`--bottom-end\`, \`--bottom-start\` pin it to a corner. The corners are logical, so they mirror in right-to-left layouts.

\`\`\`html
<!-- Corner count on an icon button -->
<button type="button" class="button button--icon" aria-label="Notifications, 3 unread">
  <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#bell"/></svg>
  <span class="badge badge--danger badge--sm badge--top-end" aria-hidden="true"><span class="badge__text">3</span></span>
</button>

<!-- Inline count after a tab label -->
<a href="/issues" class="tab">
  <span class="tab__text">Issues</span>
  <span class="badge badge--sm" aria-hidden="true"><span class="badge__text">14</span></span>
  <span class="sr-only">, 14 open</span>
</a>
\`\`\`

#### Accessibility
- The count must be part of the host's accessible name (\`aria-label\` or visually hidden text). Hide the badge itself with \`aria-hidden="true"\` so it isn't announced twice.
- Intent colour carries no meaning alone (WCAG 1.4.1): the host's name says what the count is.
- In forced-colours mode the fill is replaced with an outline.
`,
      },
    },
  },
  argTypes: {
    count: { control: 'text', description: 'Count shown in the badge' },
    intent: { control: 'select', options: INTENTS, description: 'Intent axis' },
    small: { control: 'boolean', description: 'Size: --sm' },
    dot: { control: 'boolean', description: 'Presentation: --dot (no count)' },
    placement: { control: 'select', options: ['inline', 'top-end', 'top-start', 'bottom-end', 'bottom-start'], description: 'Inline or a corner' },
  },
  render: (args) => {
    const badge = `<span class="${badgeClasses(args.intent, args.small, args.dot, args.placement)}" aria-hidden="true">${args.dot ? '' : `<span class="badge__text">${args.count}</span>`}</span>`;
    const name = args.dot ? 'Messages, new' : `Messages, ${args.count} unread`;
    const host =
      args.placement === 'inline'
        ? `<button type="button" class="button" aria-label="${name}"><span>Messages</span>${badge}</button>`
        : `<button type="button" class="button button--icon" aria-label="${name}"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#mail"/></svg>${badge}</button>`;
    return `<div class="sb-demo-stage">${host}</div>`;
  },
};

export default meta;
type Story = StoryObj<BadgeArgs>;

/**
 * Interactive sandbox for every axis.
 */
export const Playground: Story = {
  args: { count: '3', intent: 'danger', small: false, dot: false, placement: 'top-end' },
};

/**
 * Every intent, at both sizes and as a dot. Each sits on a host whose accessible name states the count.
 */
export const IntentsAndSizes: Story = {
  render: () => `
    <div class="sb-demo-stage stack">
      ${[false, true]
        .map(
          (small) => `
        <div class="cluster">
          ${INTENTS.map(
            (intent, i) => `
            <button type="button" class="button" aria-label="Inbox, ${i + 2} unread">
              <span>Inbox</span>
              <span class="${badgeClasses(intent, small)}" aria-hidden="true"><span class="badge__text">${i + 2}</span></span>
            </button>`
          ).join('')}
        </div>`
        )
        .join('')}
      <div class="cluster">
        ${INTENTS.map(
          (intent) => `
          <button type="button" class="button button--icon" aria-label="Updates, new">
            <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#bell"/></svg>
            <span class="${badgeClasses(intent, false, true, 'top-end')}" aria-hidden="true"></span>
          </button>`
        ).join('')}
      </div>
    </div>
  `,
};

/**
 * The four logical corners, and inline placement after a label. Large counts are capped by the author ("99+").
 */
export const Placement: Story = {
  render: () => `
    <div class="sb-demo-stage cluster" style="gap: var(--spacing-32);">
      ${(['top-end', 'top-start', 'bottom-end', 'bottom-start'] as Placement[])
        .map(
          (p) => `
        <button type="button" class="button button--icon" aria-label="Notifications, 99 or more unread">
          <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#bell-filled"/></svg>
          <span class="badge badge--danger badge--sm badge--${p}" aria-hidden="true"><span class="badge__text">99+</span></span>
        </button>`
        )
        .join('')}
      <button type="button" class="button button--subtle" aria-label="Drafts, 12">
        <span>Drafts</span>
        <span class="badge badge--sm" aria-hidden="true"><span class="badge__text">12</span></span>
      </button>
    </div>
  `,
};

/**
 * Counts in context: tabs, a nav list and a selection summary.
 */
export const InContext: Story = {
  render: () => `
    <div class="sb-demo-stage stack">
      <nav class="tab-list" aria-label="Repository sections">
        <a href="#code" class="tab" aria-current="page"><span class="tab__text">Code</span></a>
        <a href="#issues" class="tab"><span class="tab__text">Issues</span> <span class="badge badge--sm" aria-hidden="true"><span class="badge__text">14</span></span><span class="sr-only">, 14 open</span></a>
        <a href="#pulls" class="tab"><span class="tab__text">Pull requests</span> <span class="badge badge--accent badge--sm" aria-hidden="true"><span class="badge__text">3</span></span><span class="sr-only">, 3 open</span></a>
      </nav>
      <div class="cluster">
        <span class="badge badge--accent" aria-hidden="true"><span class="badge__text">3</span></span>
        <span>3 items selected</span>
      </div>
    </div>
  `,
};

/**
 * Container flags set intent and size for every badge inside, with no classes on the badges.
 */
export const ContainerFlags: Story = {
  render: () => `
    <div class="sb-demo-stage cluster" style="--badge-intent: success; --badge-size: sm;">
      <button type="button" class="button" aria-label="Approved, 4"><span>Approved</span><span class="badge" aria-hidden="true"><span class="badge__text">4</span></span></button>
      <button type="button" class="button" aria-label="Merged, 9"><span>Merged</span><span class="badge" aria-hidden="true"><span class="badge__text">9</span></span></button>
      <button type="button" class="button" aria-label="Failed, 1"><span>Failed</span><span class="badge badge--danger" aria-hidden="true"><span class="badge__text">1</span></span></button>
    </div>
  `,
};
