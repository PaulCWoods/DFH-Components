import type { Meta, StoryObj } from '@storybook/html';

interface BatchActionsArgs {
  count: number;
  label: string;
  variant: 'default' | 'contrast' | 'docked' | 'inline' | 'compact';
}

const meta: Meta<BatchActionsArgs> = {
  title: 'Molecules/Batch Actions',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
### Developer & Designer Notes: Batch Actions Primitive

The **Batch Actions** primitive provides a focused, accessible batch operation toolbar (\`role="toolbar"\`) triggered upon multi-item selection in data tables, grids, and card collections.
Composed with **Badge**, **Button**, **Button Group**, and **Icon** atoms, it provides dedicated structural hook classes (\`.batch-actions__summary\`, \`.batch-actions__actions\`, \`.batch-actions__dismiss\`) while strictly respecting the **Organism-Atom Composition Law**.

---

#### 1. Canonical Semantic Markup Signatures

\`\`\`html
<!-- Standard Floating Batch Actions Bar -->
<aside class="batch-actions" role="toolbar" aria-label="Batch actions">
  <!-- Summary Hook: Count Badge + Selection Label -->
  <div class="batch-actions__summary">
    <span class="badge badge--accent badge--round"><span>3</span></span>
    <span class="micro-heading">3 items selected</span>
  </div>

  <hr class="batch-actions__separator" aria-hidden="true" />

  <!-- Actions Hook: Bulk Operations Button Group -->
  <div class="batch-actions__actions">
    <div class="button-group buttons-sm buttons-subtle">
      <button type="button" class="button">
        <svg class="icon" aria-hidden="true" focusable="false"><use href="#Download"/></svg>
        <span>Export</span>
      </button>
      <button type="button" class="button">
        <svg class="icon" aria-hidden="true" focusable="false"><use href="#Edit"/></svg>
        <span>Bulk Edit</span>
      </button>
      <button type="button" class="button button--danger">
        <svg class="icon" aria-hidden="true" focusable="false"><use href="#Delete"/></svg>
        <span>Delete</span>
      </button>
    </div>
  </div>

  <hr class="batch-actions__separator" aria-hidden="true" />

  <!-- Dismiss Hook: Clear Selection Trigger -->
  <div class="batch-actions__dismiss">
    <button type="button" class="button button--subtle button--icon button--sm" aria-label="Clear selection">
      <svg class="icon" aria-hidden="true" focusable="false"><use href="#Close"/></svg>
      <span class="visually-hidden">Clear selection</span>
    </button>
  </div>
</aside>
\`\`\`
`,
      },
    },
  },
  argTypes: {
    count: { control: 'number', defaultValue: 3 },
    label: { control: 'text', defaultValue: '3 items selected' },
    variant: {
      control: 'select',
      options: ['default', 'contrast', 'docked', 'inline', 'compact'],
      defaultValue: 'default',
    },
  },
};

export default meta;
type Story = StoryObj<BatchActionsArgs>;

export const Default: Story = {
  render: () => `
    <div style="min-block-size: 16rem; position: relative; border: 1px dashed var(--border-color); border-radius: var(--panel-radius); padding: var(--spacing-24); background: var(--surface-subtle);">
      <p class="text-muted" style="text-align: center;">Floating batch actions bar anchored to bottom of viewport/container.</p>

      <aside class="batch-actions" role="toolbar" aria-label="Batch actions">
        <div class="batch-actions__summary">
          <span class="badge badge--accent badge--round">
            <span>3</span>
          </span>
          <span class="micro-heading">3 items selected</span>
        </div>

        <hr class="batch-actions__separator" aria-hidden="true" />

        <div class="batch-actions__actions">
          <div class="button-group buttons-sm buttons-subtle">
            <button type="button" class="button">
              <svg class="icon" aria-hidden="true" focusable="false"><use href="#Download"/></svg>
              <span>Export</span>
            </button>
            <button type="button" class="button">
              <svg class="icon" aria-hidden="true" focusable="false"><use href="#Edit"/></svg>
              <span>Edit</span>
            </button>
            <button type="button" class="button button--danger">
              <svg class="icon" aria-hidden="true" focusable="false"><use href="#Delete"/></svg>
              <span>Delete</span>
            </button>
          </div>
        </div>

        <hr class="batch-actions__separator" aria-hidden="true" />

        <div class="batch-actions__dismiss">
          <button type="button" class="button button--subtle button--icon button--sm" aria-label="Clear selection">
            <svg class="icon" aria-hidden="true" focusable="false"><use href="#Close"/></svg>
            <span class="visually-hidden">Clear selection</span>
          </button>
        </div>
      </aside>
    </div>
  `,
};

export const HighContrast: Story = {
  render: () => `
    <div style="min-block-size: 16rem; position: relative; border: 1px dashed var(--border-color); border-radius: var(--panel-radius); padding: var(--spacing-24); background: var(--surface-subtle);">
      <p class="text-muted" style="text-align: center;">High-contrast pill variant for prominent floating visibility.</p>

      <aside class="batch-actions batch-actions--contrast" role="toolbar" aria-label="Batch actions">
        <div class="batch-actions__summary">
          <span class="badge badge--accent badge--round">
            <span>5</span>
          </span>
          <span class="micro-heading" style="color: inherit;">5 plants selected</span>
        </div>

        <hr class="batch-actions__separator" aria-hidden="true" />

        <div class="batch-actions__actions">
          <div class="button-group buttons-sm">
            <button type="button" class="button button--plain" style="color: inherit;">
              <svg class="icon" aria-hidden="true" focusable="false"><use href="#Download"/></svg>
              <span>Export CSV</span>
            </button>
            <button type="button" class="button button--plain" style="color: inherit;">
              <svg class="icon" aria-hidden="true" focusable="false"><use href="#Check"/></svg>
              <span>Mark Watered</span>
            </button>
            <button type="button" class="button button--danger">
              <svg class="icon" aria-hidden="true" focusable="false"><use href="#Delete"/></svg>
              <span>Archive</span>
            </button>
          </div>
        </div>

        <hr class="batch-actions__separator" aria-hidden="true" />

        <div class="batch-actions__dismiss">
          <button type="button" class="button button--plain button--icon button--sm" style="color: inherit;" aria-label="Clear selection">
            <svg class="icon" aria-hidden="true" focusable="false"><use href="#Close"/></svg>
            <span class="visually-hidden">Clear selection</span>
          </button>
        </div>
      </aside>
    </div>
  `,
};

export const DockedInCard: Story = {
  render: () => `
    <div style="max-inline-size: 44rem;">
      <div class="card card--bordered">
        <article class="card__content">
          <header class="card__header">
            <hgroup class="card__hgroup">
              <h3 class="card__title heading">Crop Registry</h3>
              <p class="card__subtitle subheading text-muted">Docked batch actions footer</p>
            </hgroup>
          </header>

          <div class="card__body card__body--flush">
            <table class="table table--compact" style="inline-size: 100%;">
              <thead>
                <tr>
                  <th style="inline-size: 2.5rem;"><input type="checkbox" aria-label="Select all" checked /></th>
                  <th>Variety</th>
                  <th>Location</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr class="table__row--selected">
                  <td><input type="checkbox" aria-label="Select Brandywine" checked /></td>
                  <td><strong>Brandywine Heirloom</strong></td>
                  <td>Bed A-02</td>
                  <td><span class="badge badge--success">Healthy</span></td>
                </tr>
                <tr class="table__row--selected">
                  <td><input type="checkbox" aria-label="Select Genovese" checked /></td>
                  <td><strong>Genovese Basil</strong></td>
                  <td>Greenhouse G-1</td>
                  <td><span class="badge badge--accent">Optimal</span></td>
                </tr>
              </tbody>
            </table>
          </div>

          <footer class="card__footer batch-actions batch-actions--docked" role="toolbar" aria-label="Table batch actions">
            <div class="batch-actions__summary">
              <span class="badge badge--accent badge--round"><span>2</span></span>
              <span class="micro-heading">2 crops selected</span>
            </div>

            <div class="batch-actions__actions">
              <div class="button-group buttons-sm buttons-subtle">
                <button type="button" class="button">
                  <svg class="icon" aria-hidden="true" focusable="false"><use href="#Download"/></svg>
                  <span>Export</span>
                </button>
                <button type="button" class="button button--danger">
                  <svg class="icon" aria-hidden="true" focusable="false"><use href="#Delete"/></svg>
                  <span>Remove</span>
                </button>
              </div>
            </div>

            <div class="batch-actions__dismiss">
              <button type="button" class="button button--subtle button--sm">
                <span>Deselect all</span>
              </button>
            </div>
          </footer>
        </article>
      </div>
    </div>
  `,
};

export const InCardBand: Story = {
  render: () => `
    <div style="max-inline-size: 44rem;">
      <div class="card card--bordered card--ruled">
        <article class="card__content">
          <header class="card__header">
            <hgroup class="card__hgroup">
              <h3 class="card__title heading">Batch Harvest Operations</h3>
              <p class="card__subtitle subheading text-muted">Demonstrating .card__band with inline batch-actions</p>
            </hgroup>
          </header>

          <!-- Interstitial card__band hosting inline batch toolbar -->
          <div class="card__band card__band--subtle">
            <div class="batch-actions batch-actions--inline batch-actions--compact" role="toolbar" aria-label="Batch actions">
              <div class="batch-actions__summary">
                <span class="badge badge--accent badge--round"><span>4</span></span>
                <span class="micro-heading">4 items marked for harvest</span>
              </div>

              <div class="batch-actions__actions">
                <div class="button-group buttons-sm buttons-subtle">
                  <button type="button" class="button button--strong button--accent">
                    <svg class="icon" aria-hidden="true" focusable="false"><use href="#Check"/></svg>
                    <span>Log Harvest</span>
                  </button>
                  <button type="button" class="button">
                    <svg class="icon" aria-hidden="true" focusable="false"><use href="#Download"/></svg>
                    <span>Print QR Tags</span>
                  </button>
                </div>
              </div>

              <div class="batch-actions__dismiss">
                <button type="button" class="button button--subtle button--sm">
                  <span>Cancel</span>
                </button>
              </div>
            </div>
          </div>

          <div class="card__body">
            <p>The <code>.card__band</code> sits seamlessly between the card header and body, fully respecting card rules and edge bleeding while wrapping the batch actions toolbar cleanly.</p>
          </div>
        </article>
      </div>
    </div>
  `,
};
