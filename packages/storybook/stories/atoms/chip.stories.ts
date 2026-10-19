import type { Meta, StoryObj } from '@storybook/html';

interface ChipArgs {
  label: string;
  variant: 'default' | 'plain';
  size: 'default' | 'sm';
  dismissible: boolean;
  status?: 'online' | 'away' | 'busy' | 'none';
}

const meta: Meta<ChipArgs> = {
  title: 'Atoms/Chip',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
### Developer & Designer Notes: Chip & Live Status Primitives

The **Chip & Status** primitives provide accessible metadata tags, removable filter chips, and live presence dots (\`.status\`).
Designed to comply with **WCAG 2.2 Level AA / AAA** standards:
- **1.4.3 Contrast (Minimum):** High contrast status colors and readable metadata copy.
- **2.5.8 Target Size:** Dismiss triggers inside chips provide sufficient clickable area with clear focus rings.
- **Semantic Separation:** Chips are dedicated tags and removable filter elements; unlike badges, chips stay simple without \`--strong\` or \`--subtle\` variants.
- **Plain Modifier:** \`.chip--plain\` (with backward-compatible alias \`.chip--simple\`) removes padding and background for clean, unboxed text tags.

---

#### 1. Canonical Semantic Markup Signatures
\`\`\`html
<!-- 1. Standard Padded Tag Chip -->
<span class="chip"><span>TypeScript</span></span>

<!-- 2. Dismissible Chip (Combobox / Active Filters) -->
<span class="chip">
  <span>Design Systems</span>
  <button type="button" class="chip__remove" aria-label="Remove Design Systems tag">
    <svg class="icon" width="16" height="16" aria-hidden="true"><use href="#Close"/></svg>
  </button>
</span>

<!-- 3. Plain Tag Chip (.chip--plain) -->
<span class="chip chip--plain">Lesson 04</span>
<span class="chip chip--plain chip--status" data-status="online">Online</span>

<!-- 4. Standalone Live Status Indicator (.status) -->
<span class="status" data-status="online">System Operational</span>
<span class="status" data-status="away">Idle</span>
<span class="status" data-status="busy">Do Not Disturb</span>
\`\`\`
`,
      },
    },
  },
  args: {
    label: 'TypeScript',
    variant: 'default',
    size: 'default',
    dismissible: false,
    status: 'none',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'plain'],
      description: 'Chip visual format (padded background vs unboxed text)',
    },
    size: {
      control: 'select',
      options: ['default', 'sm'],
      description: 'Chip sizing tier',
    },
    dismissible: {
      control: 'boolean',
      description: 'Whether chip contains a remove trigger button',
    },
    status: {
      control: 'select',
      options: ['none', 'online', 'away', 'busy'],
      description: 'Live presence status indicator dot',
    },
  },
};

export default meta;
type Story = StoryObj<ChipArgs>;

/**
 * 1. Playground
 */
export const Playground: Story = {
  render: (args) => {
    const variantClass = args.variant === 'plain' ? 'chip--plain' : '';
    const sizeClass = args.size === 'sm' ? 'chip--sm' : '';
    const statusClass = args.status && args.status !== 'none' ? 'chip--status' : '';
    const statusAttr = args.status && args.status !== 'none' ? `data-status="${args.status}"` : '';

    const classes = ['chip', variantClass, sizeClass, statusClass].filter(Boolean).join(' ');

    const removeBtn = args.dismissible
      ? `<button type="button" class="chip__remove" aria-label="Remove ${args.label}">
          <svg class="icon" width="16" height="16" aria-hidden="true"><use href="#Close"/></svg>
        </button>`
      : '';

    return `
      <div class="demo-stage demo-stage--lg demo-stage--card" style="display: flex; justify-content: center; align-items: center; min-block-size: 10rem;">
        <span class="${classes}" ${statusAttr}>
          <span>${args.label || 'Chip'}</span>
          ${removeBtn}
        </span>
      </div>
    `;
  },
};

/**
 * 2. Variants (Padded, Dismissible, Plain)
 */
export const Variants: Story = {
  render: () => {
    return `
      <div class="demo-stage demo-stage--lg demo-stage--card">
        <div class="demo-title-group" style="margin-block-end: var(--spacing-24);">
          <h4 class="demo-heading">Chip Formats</h4>
          <p class="demo-desc">Tags, removable filter chips, and plain text metadata indicators.</p>
        </div>

        <div class="stack" style="gap: var(--spacing-24);">
          <!-- Padded Chips -->
          <div>
            <span class="demo-label" style="margin-block-end: var(--spacing-8);">1. Standard Padded Chips (.chip)</span>
            <div class="cluster" style="align-items: center; gap: var(--spacing-8);">
              <span class="chip"><span>TypeScript</span></span>
              <span class="chip"><span>Design Systems</span></span>
              <span class="chip"><span>WCAG 2.2 AAA</span></span>
            </div>
          </div>

          <!-- Dismissible Filter Chips -->
          <div>
            <span class="demo-label" style="margin-block-end: var(--spacing-8);">2. Dismissible Chips with Remove Trigger (.chip__remove)</span>
            <div class="cluster" style="align-items: center; gap: var(--spacing-8);">
              <span class="chip">
                <span>React Aria</span>
                <button type="button" class="chip__remove" aria-label="Remove React Aria">
                  <svg class="icon" width="16" height="16" aria-hidden="true"><use href="#Close"/></svg>
                </button>
              </span>
              <span class="chip">
                <span>Color Contrast</span>
                <button type="button" class="chip__remove" aria-label="Remove Color Contrast">
                  <svg class="icon" width="16" height="16" aria-hidden="true"><use href="#Close"/></svg>
                </button>
              </span>
              <span class="chip">
                <span>Section 508</span>
                <button type="button" class="chip__remove" aria-label="Remove Section 508">
                  <svg class="icon" width="16" height="16" aria-hidden="true"><use href="#Close"/></svg>
                </button>
              </span>
            </div>
          </div>

          <!-- Plain Chips -->
          <div>
            <span class="demo-label" style="margin-block-end: var(--spacing-8);">3. Plain Chips (.chip--plain / .chip--simple)</span>
            <div class="cluster" style="align-items: center; gap: var(--spacing-12);">
              <span class="chip chip--plain">Lesson 04</span>
              <span class="chip chip--plain">12 min read</span>
              <span class="chip chip--plain chip--status" data-status="online">Synchronized</span>
              <span class="chip chip--plain">WCAG 2.2 AA</span>
            </div>
          </div>
        </div>
      </div>
    `;
  },
};

/**
 * 3. Live Status Indicators (.status)
 */
export const LiveStatus: Story = {
  render: () => {
    return `
      <div class="demo-stage demo-stage--lg demo-stage--card">
        <div class="demo-title-group" style="margin-block-end: var(--spacing-16);">
          <h4 class="demo-heading">Live Status Dot Indicators (.status)</h4>
          <p class="demo-desc">Presence dots driven by <code>[data-status]</code> attributes.</p>
        </div>

        <div class="cluster" style="align-items: center; gap: var(--spacing-24);">
          <span class="status" data-status="online">Online</span>
          <span class="status" data-status="away">Away</span>
          <span class="status" data-status="busy">Busy / Do Not Disturb</span>
        </div>
      </div>
    `;
  },
};
