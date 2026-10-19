import type { Meta, StoryObj } from '@storybook/html';

interface BadgeArgs {
  label: string;
  tone: 'neutral' | 'accent' | 'success' | 'warning' | 'danger';
  prominence: 'default' | 'strong' | 'subtle' | 'plain';
  size: 'default' | 'sm';
  round: boolean;
}

const meta: Meta<BadgeArgs> = {
  title: 'Atoms/Badge',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
### Developer & Designer Notes: Badge Primitive

The **Badge** primitive provides accessible status indicators, notification counters, and keyboard key callouts (\`.kbd\`).
Designed to comply with **WCAG 2.2 Level AA / AAA** standards:
- **1.4.3 Contrast (Minimum):** Every semantic tone variant (neutral, accent, success, warning, danger) delivers high contrast against its matching text color.
- **1.4.11 Non-Text Contrast:** Explicit borders adapt in \`@media (prefers-contrast: more)\` to maintain 3:1 graphical boundaries.
- **Typographic Precision:** Uses CSS \`text-box: trim-both cap alphabetic\` to vertically center badge copy without ad-hoc line-height hacks.
- **Keyboard Keys (\`.kbd\`):** Built directly into the badge primitive with monospaced subtle styling for hotkeys and shortcut sequences.

---

#### 1. Prominence × Tone Orthogonal Matrix
Badges follow the same orthogonal design language as buttons:
- **Default:** 1px border with a subtle translucent tinted background.
- **Strong (\`.badge--strong\`):** High-emphasis solid tone fill with inverted high-contrast white text.
- **Subtle (\`.badge--subtle\`):** Translucent tinted background with no border.
- **Plain (\`.badge--plain\`):** Borderless and background-free, displaying only the colored typography.

\`\`\`html
<!-- Default Prominence (1px border + subtle translucent tint) -->
<span class="badge"><span>Neutral</span></span>
<span class="badge badge--accent"><span>Accent</span></span>
<span class="badge badge--success"><span>Success</span></span>
<span class="badge badge--warning"><span>Warning</span></span>
<span class="badge badge--danger"><span>Danger</span></span>

<!-- Strong Prominence (Solid fill) -->
<span class="badge badge--strong"><span>Strong Neutral</span></span>
<span class="badge badge--accent badge--strong"><span>Strong Accent</span></span>
<span class="badge badge--success badge--strong"><span>Strong Success</span></span>
<span class="badge badge--warning badge--strong"><span>Strong Warning</span></span>
<span class="badge badge--danger badge--strong"><span>Strong Danger</span></span>

<!-- Subtle Prominence (No border, retains translucent background) -->
<span class="badge badge--subtle"><span>Subtle Neutral</span></span>
<span class="badge badge--accent badge--subtle"><span>Subtle Accent</span></span>
<span class="badge badge--danger badge--subtle"><span>Subtle Danger</span></span>

<!-- Plain Prominence (No border, no background) -->
<span class="badge badge--plain"><span>Plain Neutral</span></span>
<span class="badge badge--accent badge--plain"><span>Plain Accent</span></span>

<!-- Pill / Round & Small Modifiers -->
<span class="badge badge--accent badge--round"><span>New Feature</span></span>
<span class="badge badge--danger badge--sm badge--round"><span>3</span></span>

<!-- Keyboard Key Primitive (.kbd) -->
<kbd class="kbd">⌘K</kbd>
<kbd class="kbd">Esc</kbd>
\`\`\`
`,
      },
    },
  },
  args: {
    label: 'Verified',
    tone: 'accent',
    prominence: 'default',
    size: 'default',
    round: false,
  },
  argTypes: {
    tone: {
      control: 'select',
      options: ['neutral', 'accent', 'success', 'warning', 'danger'],
      description: 'Semantic status color theme',
    },
    prominence: {
      control: 'select',
      options: ['default', 'strong', 'subtle', 'plain'],
      description: 'Visual weight and surface treatment',
    },
    size: {
      control: 'select',
      options: ['default', 'sm'],
      description: 'Size scaling tier',
    },
    round: {
      control: 'boolean',
      description: 'Pill / rounded corner geometry',
    },
  },
};

export default meta;
type Story = StoryObj<BadgeArgs>;

/**
 * 1. Playground (Interactive Sandbox)
 */
export const Playground: Story = {
  render: (args) => {
    const toneClass = args.tone !== 'neutral' ? `badge--${args.tone}` : '';
    const prominenceClass = args.prominence !== 'default' ? `badge--${args.prominence}` : '';
    const sizeClass = args.size === 'sm' ? 'badge--sm' : '';
    const roundClass = args.round ? 'badge--round' : '';

    const classes = ['badge', toneClass, prominenceClass, sizeClass, roundClass].filter(Boolean).join(' ');

    return `
      <div class="demo-stage demo-stage--lg demo-stage--card" style="display: flex; justify-content: center; align-items: center; min-block-size: 10rem;">
        <span class="${classes}">
          <span>${args.label || 'Badge'}</span>
        </span>
      </div>
    `;
  },
};

/**
 * 2. Prominence Matrix (Strong, Default, Subtle, Plain × All Tones)
 */
export const ProminenceMatrix: Story = {
  render: () => {
    return `
      <div class="demo-stage demo-stage--lg demo-stage--card">
        <div class="demo-title-group" style="margin-block-end: var(--spacing-24);">
          <h4 class="demo-heading">Orthogonal Prominence × Tone Matrix</h4>
          <p class="demo-desc">
            Badges share the exact same prominence vocabulary as buttons: <code>--strong</code>, default, <code>--subtle</code>, and <code>--plain</code>.
          </p>
        </div>

        <div class="stack" style="gap: var(--spacing-24);">
          <!-- 1. Strong Badges -->
          <div>
            <span class="demo-label" style="margin-block-end: var(--spacing-8);">1. Strong Prominence (.badge--strong — Solid tone fill)</span>
            <div class="cluster" style="align-items: center; gap: var(--spacing-12);">
              <span class="badge badge--strong"><span>Neutral</span></span>
              <span class="badge badge--accent badge--strong"><span>Accent</span></span>
              <span class="badge badge--success badge--strong"><span>Success</span></span>
              <span class="badge badge--warning badge--strong"><span>Warning</span></span>
              <span class="badge badge--danger badge--strong"><span>Danger</span></span>
            </div>
          </div>

          <!-- 2. Default Badges -->
          <div>
            <span class="demo-label" style="margin-block-end: var(--spacing-8);">2. Default Prominence (1px border + translucent tint)</span>
            <div class="cluster" style="align-items: center; gap: var(--spacing-12);">
              <span class="badge"><span>Neutral</span></span>
              <span class="badge badge--accent"><span>Accent</span></span>
              <span class="badge badge--success"><span>Success</span></span>
              <span class="badge badge--warning"><span>Warning</span></span>
              <span class="badge badge--danger"><span>Danger</span></span>
            </div>
          </div>

          <!-- 3. Subtle Badges -->
          <div>
            <span class="demo-label" style="margin-block-end: var(--spacing-8);">3. Subtle Prominence (.badge--subtle — Borderless translucent tint)</span>
            <div class="cluster" style="align-items: center; gap: var(--spacing-12);">
              <span class="badge badge--subtle"><span>Neutral</span></span>
              <span class="badge badge--accent badge--subtle"><span>Accent</span></span>
              <span class="badge badge--success badge--subtle"><span>Success</span></span>
              <span class="badge badge--warning badge--subtle"><span>Warning</span></span>
              <span class="badge badge--danger badge--subtle"><span>Danger</span></span>
            </div>
          </div>

          <!-- 4. Plain Badges -->
          <div>
            <span class="demo-label" style="margin-block-end: var(--spacing-8);">4. Plain Prominence (.badge--plain — Borderless, transparent fill)</span>
            <div class="cluster" style="align-items: center; gap: var(--spacing-12);">
              <span class="badge badge--plain"><span>Neutral</span></span>
              <span class="badge badge--accent badge--plain"><span>Accent</span></span>
              <span class="badge badge--success badge--plain"><span>Success</span></span>
              <span class="badge badge--warning badge--plain"><span>Warning</span></span>
              <span class="badge badge--danger badge--plain"><span>Danger</span></span>
            </div>
          </div>
        </div>
      </div>
    `;
  },
};

/**
 * 3. Round & Pill Shapes (.badge--round)
 */
export const RoundPills: Story = {
  render: () => {
    return `
      <div class="demo-stage demo-stage--lg demo-stage--card">
        <div class="demo-title-group" style="margin-block-end: var(--spacing-16);">
          <h4 class="demo-heading">Pill & Circular Badges (.badge--round)</h4>
          <p class="demo-desc">High-contrast notification indicators and feature labels.</p>
        </div>

        <div class="stack" style="gap: var(--spacing-16);">
          <div class="cluster" style="align-items: center; gap: var(--spacing-12);">
            <span class="badge badge--round"><span>Standard Pill</span></span>
            <span class="badge badge--accent badge--round"><span>New Feature</span></span>
            <span class="badge badge--success badge--strong badge--round"><span>Audit Passed</span></span>
            <span class="badge badge--warning badge--subtle badge--round"><span>In Review</span></span>
            <span class="badge badge--danger badge--strong badge--round"><span>3 Blockers</span></span>
          </div>

          <div class="cluster" style="align-items: center; gap: var(--spacing-12);">
            <span class="badge badge--sm badge--round"><span>1</span></span>
            <span class="badge badge--sm badge--accent badge--strong badge--round"><span>12</span></span>
            <span class="badge badge--sm badge--danger badge--strong badge--round"><span>99+</span></span>
          </div>
        </div>
      </div>
    `;
  },
};

/**
 * 4. Keyboard Key Primitive (<kbd class="kbd">)
 */
export const KeyboardKeys: Story = {
  render: () => {
    return `
      <div class="demo-stage demo-stage--lg demo-stage--card">
        <div class="demo-title-group" style="margin-block-end: var(--spacing-16);">
          <h4 class="demo-heading">Keyboard Key Primitive (&lt;kbd class="kbd"&gt;)</h4>
          <p class="demo-desc">Integrated monospaced key indicator sharing badge layout geometry.</p>
        </div>

        <div class="stack" style="gap: var(--spacing-12);">
          <div class="cluster" style="align-items: center; gap: var(--spacing-8);">
            <kbd class="kbd">⌘</kbd>
            <kbd class="kbd">K</kbd>
            <span class="micro-text">Open Command Palette</span>
          </div>
          <div class="cluster" style="align-items: center; gap: var(--spacing-8);">
            <kbd class="kbd">⌘</kbd>
            <kbd class="kbd">Shift</kbd>
            <kbd class="kbd">P</kbd>
            <span class="micro-text">Show All Commands</span>
          </div>
          <div class="cluster" style="align-items: center; gap: var(--spacing-8);">
            <kbd class="kbd">Esc</kbd>
            <span class="micro-text">Dismiss Active Top Layer</span>
          </div>
        </div>
      </div>
    `;
  },
};

/**
 * 5. Corner Notification Badges
 */
export const CornerBadges: Story = {
  render: () => {
    return `
      <div class="demo-stage demo-stage--lg demo-stage--card">
        <div class="demo-title-group" style="margin-block-end: var(--spacing-16);">
          <h4 class="demo-heading">Corner Notification Anchors</h4>
          <p class="demo-desc">Pill badges pinned to corners of relative action buttons.</p>
        </div>

        <div class="cluster" style="gap: var(--spacing-32); justify-content: center; padding-block: var(--spacing-16);">
          <!-- Bell with Danger Count -->
          <button type="button" class="button button--icon" style="position: relative;" aria-label="Notifications (3 unread)">
            <svg class="icon" width="24" height="24" aria-hidden="true" focusable="false"><use href="#BellFilled"/></svg>
            <span class="badge badge--danger badge--strong badge--sm badge--round badge--top-right-corner">
              <span>3</span>
            </span>
          </button>

          <!-- Cart with Accent Count -->
          <button type="button" class="button button--icon" style="position: relative;" aria-label="Shopping Cart (12 items)">
            <svg class="icon" width="24" height="24" aria-hidden="true" focusable="false"><use href="#Cart"/></svg>
            <span class="badge badge--accent badge--strong badge--sm badge--round badge--top-right-corner">
              <span>12</span>
            </span>
          </button>

          <!-- Mail with Subtle Count -->
          <button type="button" class="button button--icon" style="position: relative;" aria-label="Inbox (1 new alert)">
            <svg class="icon" width="24" height="24" aria-hidden="true" focusable="false"><use href="#Email"/></svg>
            <span class="badge badge--success badge--strong badge--sm badge--round badge--bottom-left-corner">
              <span>1</span>
            </span>
          </button>
        </div>
      </div>
    `;
  },
};
