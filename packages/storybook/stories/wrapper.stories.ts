import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Components/Wrapper',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
**Wrapper Primitive Component** constrains page and section content to the standard site width (\`--site-width\`, default \`75rem\`) and centers it horizontally.
Modifiers adjust alignment and proportional max-width fractions (\`1/2\`, \`1/3\`, \`2/3\`, \`1/4\`, \`3/4\`, \`middle\`).

### Canonical Structure
\`\`\`html
<!-- Default Centered Site-Width Wrapper -->
<div class="wrapper">
  <p>Centered site-width content</p>
</div>

<!-- Proportional Width Fractions -->
<div class="wrapper wrapper--2/3">
  <p>Constrained to 2/3 of site-width</p>
</div>

<!-- Start-Aligned Wrapper -->
<div class="wrapper wrapper--1/2 wrapper--start">
  <p>Left/start-aligned half-width content</p>
</div>
\`\`\`

### Modifiers
- **Width Fractions:** \`.wrapper--1/2\`, \`.wrapper--1/3\`, \`.wrapper--2/3\`, \`.wrapper--1/4\`, \`.wrapper--3/4\`
- **Alignment:** \`.wrapper--start\` (flush start), \`.wrapper--end\` (flush end), \`.wrapper--middle\` (grid vertical centering)
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * 1. Default Centered Wrapper
 * Constrains content to site width and centers horizontally.
 */
export const Default: Story = {
  render: () => `
    <div style="background-color: var(--surface-card, #fff); border: 1px dashed var(--border-color-quiet, #ccc); padding: var(--spacing-1);">
      <div class="wrapper" style="background-color: var(--surface-accent-muted, #e0f7f5); padding: var(--spacing-1); border-radius: var(--radius-2, 0.5rem);">
        <p style="margin: 0; font-weight: var(--font-weight-bold);">Default Centered Wrapper (max-inline-size: var(--site-width))</p>
        <p style="margin: 0; color: var(--foreground-muted);">Automatically centers within any viewport.</p>
      </div>
    </div>
  `,
};

/**
 * 2. Proportional Width Fractions
 * Demonstrates 1/2, 1/3, 2/3, 1/4, and 3/4 content constraints.
 */
export const Fractions: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: var(--spacing-1); background-color: var(--surface-card, #fff); border: 1px dashed var(--border-color-quiet, #ccc); padding: var(--spacing-1);">
      <!-- 1/2 -->
      <div class="wrapper wrapper--1/2" style="background-color: var(--surface-accent-muted, #e0f7f5); padding: var(--spacing-1); border-radius: var(--radius-2, 0.5rem);">
        <p style="margin: 0; font-weight: var(--font-weight-bold);">.wrapper--1/2 (50% of site width)</p>
      </div>

      <!-- 2/3 -->
      <div class="wrapper wrapper--2/3" style="background-color: var(--surface-accent-muted, #e0f7f5); padding: var(--spacing-1); border-radius: var(--radius-2, 0.5rem);">
        <p style="margin: 0; font-weight: var(--font-weight-bold);">.wrapper--2/3 (66.6% of site width)</p>
      </div>

      <!-- 1/3 -->
      <div class="wrapper wrapper--1/3" style="background-color: var(--surface-accent-muted, #e0f7f5); padding: var(--spacing-1); border-radius: var(--radius-2, 0.5rem);">
        <p style="margin: 0; font-weight: var(--font-weight-bold);">.wrapper--1/3 (33.3% of site width)</p>
      </div>

      <!-- 3/4 -->
      <div class="wrapper wrapper--3/4" style="background-color: var(--surface-accent-muted, #e0f7f5); padding: var(--spacing-1); border-radius: var(--radius-2, 0.5rem);">
        <p style="margin: 0; font-weight: var(--font-weight-bold);">.wrapper--3/4 (75% of site width)</p>
      </div>

      <!-- 1/4 -->
      <div class="wrapper wrapper--1/4" style="background-color: var(--surface-accent-muted, #e0f7f5); padding: var(--spacing-1); border-radius: var(--radius-2, 0.5rem);">
        <p style="margin: 0; font-weight: var(--font-weight-bold);">.wrapper--1/4 (25% of site width)</p>
      </div>
    </div>
  `,
};

/**
 * 3. Alignment Modifiers
 * Demonstrates start-aligned and end-aligned constrained wrappers.
 */
export const Alignment: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: var(--spacing-1); background-color: var(--surface-card, #fff); border: 1px dashed var(--border-color-quiet, #ccc); padding: var(--spacing-1);">
      <!-- Start -->
      <div class="wrapper wrapper--1/2 wrapper--start" style="background-color: var(--surface-accent-muted, #e0f7f5); padding: var(--spacing-1); border-radius: var(--radius-2, 0.5rem);">
        <p style="margin: 0; font-weight: var(--font-weight-bold);">.wrapper--1/2 .wrapper--start</p>
        <p style="margin: 0; color: var(--foreground-muted);">Aligned to start edge.</p>
      </div>

      <!-- Centered (Default) -->
      <div class="wrapper wrapper--1/2" style="background-color: var(--surface-accent-muted, #e0f7f5); padding: var(--spacing-1); border-radius: var(--radius-2, 0.5rem);">
        <p style="margin: 0; font-weight: var(--font-weight-bold);">.wrapper--1/2 (Centered)</p>
        <p style="margin: 0; color: var(--foreground-muted);">Centered margin-inline: auto.</p>
      </div>

      <!-- End -->
      <div class="wrapper wrapper--1/2 wrapper--end" style="background-color: var(--surface-accent-muted, #e0f7f5); padding: var(--spacing-1); border-radius: var(--radius-2, 0.5rem);">
        <p style="margin: 0; font-weight: var(--font-weight-bold);">.wrapper--1/2 .wrapper--end</p>
        <p style="margin: 0; color: var(--foreground-muted);">Aligned to end edge.</p>
      </div>
    </div>
  `,
};
