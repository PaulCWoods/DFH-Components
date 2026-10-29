import type { Meta, StoryObj } from '@storybook/html';

interface DividerArgs {
  strong: boolean;
  dashed: boolean;
}

const cls = (a: Partial<DividerArgs>) =>
  ['divider', a.strong ? 'divider--strong' : '', a.dashed ? 'divider--dashed' : ''].filter(Boolean).join(' ');

const meta: Meta<DividerArgs> = {
  title: 'Atoms/Divider',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
### Divider

A rule between groups. Organisms (menu, combobox, batch actions, button group) place it; they never restyle it.

| Axis | Values |
| :--- | :--- |
| Orientation | Horizontal (default); vertical when the **direct parent** sets \`--direction: row\` (\`.inline\`, \`.cluster\`, \`.button-group\`, \`.batch-actions\`), or with \`aria-orientation="vertical"\` |
| Prominence | Default (quiet, decorative), \`--strong\` (at least 3:1, for a rule that is the only boundary) |
| Style | Solid, \`--dashed\` |

- \`--direction\` doesn't inherit: a divider deeper inside a row stays horizontal.
- Put \`aria-orientation="vertical"\` on a vertical divider, or \`aria-hidden="true"\` if it is purely decorative.
- In \`<menu>\`, \`<ul>\` or \`<ol>\`: \`<li role="separator" class="divider"></li>\`.
- A bare \`<hr>\` gets a quiet rule from the reset.

\`\`\`html
<hr class="divider">
<div class="button-group">
  <button type="button" class="button"><span>Edit</span></button>
  <hr class="divider" aria-orientation="vertical">
  <button type="button" class="button"><span>Share</span></button>
</div>
\`\`\`
`,
      },
    },
  },
  argTypes: {
    strong: { control: 'boolean', description: '--strong' },
    dashed: { control: 'boolean', description: '--dashed' },
  },
  args: { strong: false, dashed: false },
  render: (args) => `
    <div class="demo-stage stack">
      <p class="text" style="margin: 0;">Above the rule.</p>
      <hr class="${cls(args)}">
      <p class="text" style="margin: 0;">Below the rule.</p>
      <div class="inline">
        <span>Before</span>
        <hr class="${cls(args)}" aria-orientation="vertical">
        <span>After</span>
      </div>
    </div>
  `,
};

export default meta;
type Story = StoryObj<DividerArgs>;

/**
 * Interactive sandbox: horizontal in a stack, vertical in a row.
 */
export const Playground: Story = {};

/**
 * Default (decorative) and --strong (at least 3:1), solid and dashed.
 */
export const Prominence: Story = {
  render: () => `
    <div class="demo-stage stack">
      ${[
        ['default', {}],
        ['--strong', { strong: true }],
        ['--dashed', { dashed: true }],
        ['--strong --dashed', { strong: true, dashed: true }],
      ]
        .map(
          ([label, a]) => `
        <div class="stack" style="--gap: var(--spacing-8);">
          <span class="sb-demo-tag">${label}</span>
          <hr class="${cls(a as Partial<DividerArgs>)}">
        </div>`
        )
        .join('')}
    </div>
  `,
};

/**
 * Vertical comes from the direct parent: .inline, .cluster, .button-group and
 * .batch-actions set --direction: row. A divider nested deeper (here, inside a
 * card in a row) stays horizontal.
 */
export const Orientation: Story = {
  render: () => `
    <div class="demo-stage stack">
      <span class="sb-demo-tag">.cluster</span>
      <div class="cluster">
        <span class="chip"><span class="chip__text">Design</span></span>
        <hr class="divider" aria-orientation="vertical">
        <span class="chip"><span class="chip__text">Code</span></span>
      </div>

      <span class="sb-demo-tag">.button-group</span>
      <div class="button-group buttons-subtle">
        <button type="button" class="button"><span>Edit</span></button>
        <button type="button" class="button"><span>Share</span></button>
        <hr class="divider" aria-orientation="vertical">
        <button type="button" class="button button--danger"><span>Delete</span></button>
      </div>

      <span class="sb-demo-tag">Card inside .inline: the card's divider stays horizontal</span>
      <div class="inline" style="align-items: stretch;">
        <div class="card stack">
          <p class="text" style="margin: 0;">Section one</p>
          <hr class="divider">
          <p class="text" style="margin: 0;">Section two</p>
        </div>
        <hr class="divider" aria-orientation="vertical">
        <p class="text" style="margin: 0;">Beside the card</p>
      </div>
    </div>
  `,
};

/**
 * Organisms place the divider: a menu bleeds it to its edges, a batch actions
 * bar stands it upright.
 */
export const InOrganisms: Story = {
  render: () => `
    <div class="demo-stage stack">
      <menu class="menu" aria-label="Document options" style="max-inline-size: 16rem;">
        <li><button type="button" class="button"><span>Duplicate</span></button></li>
        <li><button type="button" class="button"><span>Export</span></button></li>
        <li role="separator" class="divider"></li>
        <li><button type="button" class="button button--danger"><span>Delete</span></button></li>
      </menu>

      <div class="batch-actions batch-actions--inline" role="group" aria-label="Selected documents">
        <p class="batch-actions__summary small-heading" role="status">3 selected</p>
        <hr class="divider" aria-hidden="true" />
        <div class="batch-actions__actions button-group buttons-subtle">
          <button type="button" class="button"><span>Export</span></button>
        </div>
        <hr class="divider" aria-hidden="true" />
        <button type="button" class="button button--plain batch-actions__dismiss"><span>Clear</span></button>
      </div>
    </div>
  `,
};
