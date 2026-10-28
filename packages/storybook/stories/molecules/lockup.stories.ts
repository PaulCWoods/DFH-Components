import type { Meta, StoryObj } from '@storybook/html';

interface LockupArgs {
  title: string;
  subtitle: string;
  gap: string;
}

const meta: Meta<LockupArgs> = {
  title: 'Molecules/Lockup',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
### Developer & Designer Notes: Lockup Component Primitive

The **Lockup** primitive is a minimal micro-container for paired typographic elements (e.g. \`<b>\` and \`<small>\`, or \`<strong>\` and \`<span>\`).
Designed to eliminate repetitive utility classes and noise across tables, cards, identity rows, and list items.

#### Architectural Principles:
- **Zero-Child Styling:** Does not touch or override \`<b>\` or \`<small>\`. Browsers natively style \`<b>\` as bold and \`<small>\` as smaller text (~0.8em / 0.875rem), allowing them to inherit contextual colors and font scales automatically.
- **Micro-Layout Containment:** Uses \`display: flex; flex-direction: column; justify-content: center; min-inline-size: 0;\` to stack lines vertically while ensuring flex/grid containers correctly handle text overflow and ellipsis.
- **Inline Adaptation:** \`:where(span.lockup)\` switches to \`display: inline-flex\` for inline flow contexts.
- **Custom Spacing:** Accepts \`--lockup-gap\` (defaults to \`0\`, using native typographic line-height leading).

---

#### Canonical Component Markup Signatures

\`\`\`html
<!-- 1. Standalone Data Pair (Table Cell or Card) -->
<div class="lockup">
  <b>Full Sun</b>
  <small>Mycorrhizal Fungi + Leaf Mulch</small>
</div>

<!-- 2. User Identity Lockup (Composed with .inline & .avatar) -->
<div class="inline align-items-center">
  <div class="avatar avatar--sm" aria-hidden="true"><span>MC</span></div>
  <div class="lockup">
    <b>Marcus Chen</b>
    <small>mchen.gardens@urbanmail.net</small>
  </div>
</div>

<!-- 3. Inline Span Lockup -->
<span class="lockup">
  <b>Plot #12</b>
  <small>Raised Bed</small>
</span>
\`\`\`
`,
      },
    },
  },
  argTypes: {
    title: { control: 'text', description: 'Primary bold/title text' },
    subtitle: { control: 'text', description: 'Secondary detail or caption text' },
    gap: { control: 'text', description: 'CSS variable --lockup-gap' },
  },
  args: {
    title: 'Marcus Chen',
    subtitle: 'mchen.gardens@urbanmail.net',
    gap: '0',
  },
};

export default meta;
type Story = StoryObj<LockupArgs>;

/**
 * 1. Default (Standalone Lockup)
 */
export const Default: Story = {
  render: (args) => `
    <div class="lockup" style="${args.gap !== '0' ? `--lockup-gap: ${args.gap};` : ''}">
      <b>${args.title}</b>
      <small>${args.subtitle}</small>
    </div>
  `,
};

/**
 * 2. User Identity Lockup
 * Composed horizontally with .inline and .avatar.
 */
export const Identity: Story = {
  render: () => `
    <div class="stack" style="--gap: var(--spacing-16); max-inline-size: 24rem;">
      <div class="inline align-items-center">
        <div class="avatar avatar--sm" aria-label="Marcus Chen"><span>MC</span></div>
        <div class="lockup">
          <b>Marcus Chen</b>
          <small>mchen.gardens@urbanmail.net</small>
        </div>
      </div>

      <div class="inline align-items-center">
        <div class="avatar avatar--sm" data-status="online" aria-label="Elena Rostova (online)"><span>ER</span></div>
        <div class="lockup">
          <b>Elena Rostova</b>
          <small>Plot Steward & Lead Horticulturist</small>
        </div>
      </div>

      <div class="inline align-items-center">
        <div class="avatar avatar--sm" style="--avatar-bg: var(--color-green-700, #00875a); color: #fff;" aria-hidden="true">🌱</div>
        <div class="lockup">
          <b>Oakridge Commons</b>
          <small>48 Active Micro-Allotments</small>
        </div>
      </div>
    </div>
  `,
};

/**
 * 3. Table Data Cells
 * Demonstrates lockup replacing nested divs and font utilities in table columns.
 */
export const InTableCells: Story = {
  render: () => `
    <table class="table table--bordered table--hover" style="max-inline-size: 40rem;">
      <thead>
        <tr>
          <th scope="col" class="table__col--sm">Plot</th>
          <th scope="col">Gardener</th>
          <th scope="col">Sunlight & Soil</th>
          <th scope="col" class="table__col--sm">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong class="font-mono text-accent">A-12</strong></td>
          <td>
            <div class="inline align-items-center" style="--gap: var(--spacing-8);">
              <div class="avatar avatar--sm" aria-hidden="true"><span>MC</span></div>
              <div class="lockup">
                <b>Marcus Chen</b>
                <small>mchen.gardens@urbanmail.net</small>
              </div>
            </div>
          </td>
          <td>
            <div class="lockup">
              <b>Full Sun</b>
              <small>Mycorrhizal Fungi + Leaf Mulch</small>
            </div>
          </td>
          <td><span class="status status--success"><span class="status__text">Paid</span></span></td>
        </tr>
        <tr>
          <td><strong class="font-mono text-accent">B-04</strong></td>
          <td>
            <div class="inline align-items-center" style="--gap: var(--spacing-8);">
              <div class="avatar avatar--sm" aria-hidden="true"><span>SP</span></div>
              <div class="lockup">
                <b>Sunita Patel</b>
                <small>spatel.civic@sunnyside.org</small>
              </div>
            </div>
          </td>
          <td>
            <div class="lockup">
              <b>Partial Shade</b>
              <small>Hardwood Biochar + Aged Manure</small>
            </div>
          </td>
          <td><span class="status status--warning"><span class="status__text">Pending</span></span></td>
        </tr>
      </tbody>
    </table>
  `,
};

/**
 * 4. Truncation in Constrained Layouts
 * Testing min-inline-size: 0 containment with ellipsis text-overflow.
 */
export const Truncated: Story = {
  render: () => `
    <div class="card card--bordered padding" style="max-inline-size: 16rem;">
      <div class="lockup">
        <b>Very Long Project Name That Might Wrap</b>
        <small style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
          Extremely long soil amendment description with lots of mycorrhizal spores and inoculants
        </small>
      </div>
    </div>
  `,
};

/**
 * 5. Custom Gap Spacing
 * Overriding --lockup-gap when looser vertical flow is preferred.
 */
export const CustomGap: Story = {
  render: () => `
    <div class="cluster" style="gap: var(--spacing-24);">
      <div class="lockup">
        <b>Default Gap (0)</b>
        <small>Compact natural leading</small>
      </div>

      <div class="lockup" style="--lockup-gap: var(--spacing-4, 0.25rem);">
        <b>Looser Gap (--spacing-4)</b>
        <small>Explicit 4px separation</small>
      </div>

      <div class="lockup" style="--lockup-gap: var(--spacing-8, 0.5rem);">
        <b>Wide Gap (--spacing-8)</b>
        <small>Generous 8px separation</small>
      </div>
    </div>
  `,
};
