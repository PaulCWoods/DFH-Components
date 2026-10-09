import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Components/Text',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
**Text & Headings Component Primitives** apply shared typography presets (font family, size, line-height, font-weight, letter-spacing, and text-transform) for standalone headlines, subheadings, and body copy blocks.

Directly aligned with the Design For Humans typography system (\`_text.scss\`).

### Available Classes
- **Display & Headings:** \`.display-title\`, \`.title\`, \`.heading\`, \`.subheading\`, \`.small-heading\`, \`.micro-heading\`
- **Body & Copy:** \`.text\`, \`.strong-text\`, \`.small-text\`, \`.large-text\`, \`.micro-text\`
- **Scaling Modifiers:**
  - Default: Fluid viewport scaling based on modular scale clamp rules.
  - \`--cq\`: Container-adaptive scaling via container query units (\`cqi\`).
  - \`--fixed\`: Locked non-fluid modular steps.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * 1. Headings Hierarchy
 * Shows all heading levels from display-title down to micro-heading.
 */
export const HeadingsHierarchy: Story = {
  render: () => `
    <div class="stack">
      <div>
        <p class="micro-heading" style="color: var(--foreground-muted); margin: 0 0 var(--spacing-4) 0;">.display-title</p>
        <h1 class="display-title" style="margin: 0;">Display Title</h1>
      </div>

      <hr class="divider" />

      <div>
        <p class="micro-heading" style="color: var(--foreground-muted); margin: 0 0 var(--spacing-4) 0;">.title</p>
        <h2 class="title" style="margin: 0;">Editorial Title</h2>
      </div>

      <hr class="divider" />

      <div>
        <p class="micro-heading" style="color: var(--foreground-muted); margin: 0 0 var(--spacing-4) 0;">.heading</p>
        <h3 class="heading" style="margin: 0;">Section Heading</h3>
      </div>

      <hr class="divider" />

      <div>
        <p class="micro-heading" style="color: var(--foreground-muted); margin: 0 0 var(--spacing-4) 0;">.subheading</p>
        <h4 class="subheading" style="margin: 0;">Article Subheading</h4>
      </div>

      <hr class="divider" />

      <div>
        <p class="micro-heading" style="color: var(--foreground-muted); margin: 0 0 var(--spacing-4) 0;">.small-heading</p>
        <h5 class="small-heading" style="margin: 0;">Small Card Heading</h5>
      </div>

      <hr class="divider" />

      <div>
        <p class="micro-heading" style="color: var(--foreground-muted); margin: 0 0 var(--spacing-4) 0;">.micro-heading</p>
        <h6 class="micro-heading" style="margin: 0;">Category Eyebrow</h6>
      </div>
    </div>
  `,
};

/**
 * 2. Block Text Styles
 * Shows large-text, standard text, strong-text, small-text, and micro-text.
 */
export const BlockTextStyles: Story = {
  render: () => `
    <div class="wrapper wrapper--xl">
      <div class="stack">
        <div>
          <p class="micro-heading" style="color: var(--foreground-muted); margin: 0 0 var(--spacing-4) 0;">.large-text (Lead / Intro)</p>
          <p class="large-text" style="margin: 0;">
            Large text provides high editorial emphasis for lead-in paragraphs, article intros, or hero descriptions.
          </p>
        </div>

        <hr class="divider" />

        <div>
          <p class="micro-heading" style="color: var(--foreground-muted); margin: 0 0 var(--spacing-4) 0;">.text (Standard Body)</p>
          <p class="text" style="margin: 0;">
            Standard body copy styled with token-driven line-height and typographic scale for optimal reading comfort.
          </p>
        </div>

        <hr class="divider" />

        <div>
          <p class="micro-heading" style="color: var(--foreground-muted); margin: 0 0 var(--spacing-4) 0;">.strong-text</p>
          <p class="strong-text text" style="margin: 0;">
            Bold strong emphasis text matching the design system token weight.
          </p>
        </div>

        <hr class="divider" />

        <div>
          <p class="micro-heading" style="color: var(--foreground-muted); margin: 0 0 var(--spacing-4) 0;">.small-text</p>
          <p class="small-text" style="margin: 0;">
            Secondary annotations, meta descriptions, and table captions.
          </p>
        </div>

        <hr class="divider" />

        <div>
          <p class="micro-heading" style="color: var(--foreground-muted); margin: 0 0 var(--spacing-4) 0;">.micro-text</p>
          <p class="micro-text" style="margin: 0;">
            Compact fine-print, timestamps, and compact legal disclaimers.
          </p>
        </div>
      </div>
    </div>
  `,
};

/**
 * 3. Scaling Variants Comparison (Fluid vs Container vs Fixed)
 * Compares fluid viewport scaling, container query scaling (--cq), and fixed scale (--fixed).
 */
export const ScalingVariants: Story = {
  render: () => `
    <div class="stack">
      <div>
        <p class="micro-heading" style="color: var(--foreground-muted); margin: 0 0 var(--spacing-4) 0;">Fluid Viewport Scale (.heading)</p>
        <h3 class="heading" style="margin: 0;">Fluid Heading (Adapts to viewport width)</h3>
      </div>

      <div>
        <p class="micro-heading" style="color: var(--foreground-muted); margin: 0 0 var(--spacing-4) 0;">Container Query Scale (.heading--cq)</p>
        <h3 class="heading heading--cq" style="margin: 0;">Container Heading (Adapts to parent container width)</h3>
      </div>

      <div>
        <p class="micro-heading" style="color: var(--foreground-muted); margin: 0 0 var(--spacing-4) 0;">Fixed Scale (.heading--fixed)</p>
        <h3 class="heading heading--fixed" style="margin: 0;">Fixed Heading (Locked non-fluid modular step)</h3>
      </div>
    </div>
  `,
};
