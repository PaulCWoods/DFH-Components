import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Components/Stack',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
**Stack, Inline & Cluster Primitive Components** provide fundamental 1-dimensional vertical and horizontal layout flows for grouping and spacing content.
Directly aligned with the Design For Humans layout architecture (\`_stack.scss\`).

### Available Classes
- **\`.stack\`:** Vertical flex column flow with token-driven gap.
- **\`.inline\` / \`.stack--inline\`:** Horizontal flex row flow with natural wrapping.
- **\`.cluster\`:** \`inline-flex\` container for compact, inline groupings of controls, tags, or badges.
- **Modifiers:**
  - \`--tight\`: Sets gap to \`0\`.
  - \`--nowrap\`: Disables flex wrapping (\`flex-wrap: nowrap\`).
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * 1. Vertical Stack (.stack)
 * Standard column flow with consistent token-driven gap.
 */
export const VerticalStack: Story = {
  render: () => `
    <div style="max-inline-size: 24rem; font-family: var(--body-font-family);">
      <div class="stack">
        <div style="background-color: var(--surface-card, #fff); border: 1px solid var(--border-color-quiet, #ccc); border-radius: var(--radius, 0.25rem); padding: var(--spacing-0-75);">
          <strong>First Item</strong>
          <p style="margin: 0; color: var(--foreground-muted);">Stack item content 1</p>
        </div>
        <div style="background-color: var(--surface-card, #fff); border: 1px solid var(--border-color-quiet, #ccc); border-radius: var(--radius, 0.25rem); padding: var(--spacing-0-75);">
          <strong>Second Item</strong>
          <p style="margin: 0; color: var(--foreground-muted);">Stack item content 2</p>
        </div>
        <div style="background-color: var(--surface-card, #fff); border: 1px solid var(--border-color-quiet, #ccc); border-radius: var(--radius, 0.25rem); padding: var(--spacing-0-75);">
          <strong>Third Item</strong>
          <p style="margin: 0; color: var(--foreground-muted);">Stack item content 3</p>
        </div>
      </div>
    </div>
  `,
};

/**
 * 2. Horizontal Inline (.inline / .stack--inline)
 * Standard horizontal row flow with natural wrapping.
 */
export const HorizontalInline: Story = {
  render: () => `
    <div style="max-inline-size: 36rem; font-family: var(--body-font-family);">
      <div class="inline">
        <div style="background-color: var(--surface-card, #fff); border: 1px solid var(--border-color-quiet, #ccc); border-radius: var(--radius, 0.25rem); padding: var(--spacing-0-5) var(--spacing-1);">
          Item One
        </div>
        <div style="background-color: var(--surface-card, #fff); border: 1px solid var(--border-color-quiet, #ccc); border-radius: var(--radius, 0.25rem); padding: var(--spacing-0-5) var(--spacing-1);">
          Item Two
        </div>
        <div style="background-color: var(--surface-card, #fff); border: 1px solid var(--border-color-quiet, #ccc); border-radius: var(--radius, 0.25rem); padding: var(--spacing-0-5) var(--spacing-1);">
          Item Three
        </div>
        <div style="background-color: var(--surface-card, #fff); border: 1px solid var(--border-color-quiet, #ccc); border-radius: var(--radius, 0.25rem); padding: var(--spacing-0-5) var(--spacing-1);">
          Item Four
        </div>
      </div>
    </div>
  `,
};

/**
 * 3. Cluster Primitive (.cluster)
 * Inline-flex flow for compact controls, tags, and badges.
 */
export const Cluster: Story = {
  render: () => `
    <div style="font-family: var(--body-font-family); display: flex; flex-direction: column; gap: var(--spacing-1);">
      <div>
        <p class="micro-heading" style="color: var(--foreground-muted); margin: 0 0 var(--spacing-0-5) 0;">Badge Cluster</p>
        <div class="cluster">
          <span class="badge badge--accent"><span>Design Tokens</span></span>
          <span class="badge badge--success"><span>WCAG 2.2 AAA</span></span>
          <span class="badge badge--warning"><span>W3C DTCG</span></span>
          <span class="badge"><span>Components</span></span>
          <span class="chip">v2.0</span>
        </div>
      </div>

      <div>
        <p class="micro-heading" style="color: var(--foreground-muted); margin: 0 0 var(--spacing-0-5) 0;">Action Cluster</p>
        <div class="cluster">
          <button type="button" class="button button--primary s-button:sm"><span>Save Changes</span></button>
          <button type="button" class="button button--subtle s-button:sm"><span>Cancel</span></button>
        </div>
      </div>
    </div>
  `,
};

/**
 * 4. Modifiers (Tight & NoWrap)
 * Demonstrates zero-gap and nowrap variations.
 */
export const Modifiers: Story = {
  render: () => `
    <div style="font-family: var(--body-font-family); display: flex; flex-direction: column; gap: var(--spacing-1-5, 1.5rem); max-inline-size: 28rem;">
      <div>
        <p class="micro-heading" style="color: var(--foreground-muted); margin: 0 0 var(--spacing-0-5) 0;">.stack .stack--tight (gap: 0)</p>
        <div class="stack stack--tight" style="border: 1px solid var(--border-color-quiet, #ccc); border-radius: var(--radius, 0.25rem); overflow: hidden;">
          <div style="background-color: var(--surface-card, #fff); padding: var(--spacing-0-75); border-block-end: 1px solid var(--border-color-quiet, #ccc);">Row 1</div>
          <div style="background-color: var(--surface-card, #fff); padding: var(--spacing-0-75); border-block-end: 1px solid var(--border-color-quiet, #ccc);">Row 2</div>
          <div style="background-color: var(--surface-card, #fff); padding: var(--spacing-0-75);">Row 3</div>
        </div>
      </div>

      <div>
        <p class="micro-heading" style="color: var(--foreground-muted); margin: 0 0 var(--spacing-0-5) 0;">.inline .inline--nowrap (flex-wrap: nowrap)</p>
        <div class="inline inline--nowrap" style="overflow-x: auto; padding: var(--spacing-0-5); border: 1px dashed var(--border-color-quiet, #ccc);">
          <span class="badge"><span>Tab Option 1</span></span>
          <span class="badge"><span>Tab Option 2</span></span>
          <span class="badge"><span>Tab Option 3</span></span>
          <span class="badge"><span>Tab Option 4</span></span>
          <span class="badge"><span>Tab Option 5</span></span>
          <span class="badge"><span>Tab Option 6</span></span>
        </div>
      </div>
    </div>
  `,
};
