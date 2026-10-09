import type { Meta, StoryObj } from '@storybook/html';

interface BadgeArgs {
  label: string;
  variant: 'default' | 'accent' | 'success' | 'warning' | 'danger' | 'subtle';
  round: boolean;
}

const meta: Meta<BadgeArgs> = {
  title: 'Components/Badge & Chip',
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text', defaultValue: 'Status' },
    variant: {
      control: 'select',
      options: ['default', 'accent', 'success', 'warning', 'danger', 'subtle'],
      defaultValue: 'default',
    },
    round: { control: 'boolean', defaultValue: false },
  },
  render: (args) => {
    const classes = [
      'badge',
      args.variant !== 'default' ? `badge--${args.variant}` : '',
      args.round ? 'badge--round' : '',
    ]
      .filter(Boolean)
      .join(' ');

    return `<span class="${classes}"><span>${args.label || 'Status'}</span></span>`;
  },
};

export default meta;
type Story = StoryObj<BadgeArgs>;

export const Default: Story = {
  args: {
    label: 'Standard',
    variant: 'default',
    round: false,
  },
};

export const Accent: Story = {
  args: {
    label: 'Enrolled',
    variant: 'accent',
    round: false,
  },
};

export const Success: Story = {
  args: {
    label: 'Completed',
    variant: 'success',
    round: false,
  },
};

export const Warning: Story = {
  args: {
    label: 'Pending Review',
    variant: 'warning',
    round: false,
  },
};

export const Danger: Story = {
  args: {
    label: 'Suspended',
    variant: 'danger',
    round: false,
  },
};

export const Round: Story = {
  args: {
    label: 'Round Shape',
    variant: 'accent',
    round: true,
  },
};

export const AllBadges: Story = {
  render: () => `
    <div class="stack">
      <div class="cluster align-items-center">
        <span class="badge"><span>Default</span></span>
        <span class="badge badge--accent"><span>Accent</span></span>
        <span class="badge badge--success"><span>Success</span></span>
        <span class="badge badge--warning"><span>Warning</span></span>
        <span class="badge badge--danger"><span>Danger</span></span>
        <span class="badge badge--subtle"><span>Subtle</span></span>
        <span class="badge badge--accent badge--round"><span>Round Badge</span></span>
        <span class="badge badge--sm badge--accent badge--round"><span>Small Round</span></span>
      </div>

      <div class="cluster">
        <span class="badge" data-status="online"><span>Online</span></span>
        <span class="badge" data-status="away"><span>Away</span></span>
        <span class="badge" data-status="busy"><span>Busy</span></span>
      </div>
    </div>
  `,
};

export const StatusIndicators: Story = {
  render: () => `
    <div class="stack">
      <div class="cluster">
        <span class="status" data-status="online">Active System</span>
        <span class="status" data-status="away">Idle Session</span>
        <span class="status" data-status="busy">High Load</span>
        <span class="status" data-status="offline">Offline</span>
      </div>
      <div class="cluster">
        <span class="chip chip--status" data-status="online">Online</span>
        <span class="chip chip--status" data-status="away">Away</span>
        <span class="chip chip--status" data-status="busy">Do Not Disturb</span>
      </div>
    </div>
  `,
};

export const CornerPlacement: Story = {
  render: () => `
    <div class="cluster" style="padding: var(--spacing-24); gap: var(--spacing-32);">
      <!-- Button with unread notification badge (Top-Right) -->
      <button type="button" class="button button--icon" style="position: relative;" aria-label="Notifications (3 unread)">
        <svg class="icon" width="24" height="24" aria-hidden="true" focusable="false"><use href="#BellFilled"/></svg>
        <span class="badge badge--danger badge--sm badge--round badge--top-right-corner">
          <span>3</span>
        </span>
      </button>

      <!-- Cart Button with item count badge (Top-Right) -->
      <button type="button" class="button button--icon" style="position: relative;" aria-label="Shopping cart (12 items)">
        <svg class="icon" width="24" height="24" aria-hidden="true" focusable="false"><use href="#Cart"/></svg>
        <span class="badge badge--accent badge--sm badge--round badge--top-right-corner">
          <span>12</span>
        </span>
      </button>

      <!-- Mail Button with new message dot badge (Bottom-Left) -->
      <button type="button" class="button button--icon" style="position: relative;" aria-label="Inbox (1 new message)">
        <svg class="icon" width="24" height="24" aria-hidden="true" focusable="false"><use href="#Email"/></svg>
        <span class="badge badge--success badge--sm badge--round badge--bottom-left-corner">
          <span>1</span>
        </span>
      </button>
    </div>
  `,
};

export const Chips: Story = {
  render: () => `
    <div class="cluster">
      <span class="chip">Lesson 04</span>
      <span class="chip">In Progress</span>
      <span class="chip">12 min read</span>
      <span class="chip">WCAG 2.2</span>
    </div>
  `,
};
