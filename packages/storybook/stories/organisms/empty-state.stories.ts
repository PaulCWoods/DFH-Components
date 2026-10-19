import type { Meta, StoryObj } from '@storybook/html';

interface EmptyStateArgs {
  title?: string;
  description?: string;
  status?: 'default' | 'success' | 'warning' | 'error';
  compact?: boolean;
  startAligned?: boolean;
  bordered?: boolean;
  flush?: boolean;
}

const meta: Meta<EmptyStateArgs> = {
  title: 'Organisms/Empty State',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
### Developer & Designer Notes: Empty State Primitive

The **Empty State** primitive is an accessible layout orchestrator designed to communicate system status when a container, search filter, table, or workspace currently contains no data.

Built on the **primitive composition philosophy**, Empty State avoids nested wrapper divs and utility overrides by providing an ergonomic orchestrator that pairs naturally with the library's **Button**, **Icon**, and **Card** primitives.

---

#### 1. Canonical Semantic Markup Signatures
AI agents and developers MUST strictly use the following semantic patterns:

\`\`\`html
<!-- 1. Standalone Empty State -->
<section class="empty-state" aria-labelledby="empty-title">
  <div class="empty-state__visual" aria-hidden="true">
    <svg class="icon"><use href="#Search"/></svg>
  </div>
  <div class="empty-state__content">
    <h3 id="empty-title" class="empty-state__title subheading">No items found</h3>
    <p class="empty-state__description small-text">
      Try adjusting your search criteria or clear your current filters.
    </p>
  </div>
  <div class="empty-state__actions">
    <button type="button" class="button button--primary">
      <span>Create Item</span>
    </button>
    <button type="button" class="button button--subtle">
      <span>Clear Filters</span>
    </button>
  </div>
</section>

<!-- 2. Nested Inside Card Primitive -->
<article class="card card--bordered bg-card" aria-labelledby="card-empty-title">
  <div class="card__content">
    <div class="empty-state empty-state--flush">
      <div class="empty-state__visual" aria-hidden="true">
        <svg class="icon"><use href="#Plus"/></svg>
      </div>
      <div class="empty-state__content">
        <h3 id="card-empty-title" class="empty-state__title">No projects yet</h3>
        <p class="empty-state__description">
          Get started by creating your first project workspace.
        </p>
      </div>
      <div class="empty-state__actions">
        <button type="button" class="button button--primary">
          <span>New Project</span>
        </button>
      </div>
    </div>
  </div>
</article>

<!-- 3. Semantic Status Variants -->
<section class="empty-state empty-state--success" aria-labelledby="status-empty-title">
  <div class="empty-state__visual" aria-hidden="true">
    <svg class="icon"><use href="#Check"/></svg>
  </div>
  <div class="empty-state__content">
    <h3 id="status-empty-title" class="empty-state__title">Sync complete</h3>
    <p class="empty-state__description">All 717 tokens are synchronized.</p>
  </div>
</section>
\`\`\`

---

#### 2. WCAG 2.2 Conformance Matrix

| Criterion | Level | Implementation Strategy |
| :--- | :---: | :--- |
| **1.3.1 Info & Relationships** | **A** | Structured with semantic heading elements (\`<h3>\` / \`<h2>\`) connected via \`aria-labelledby\`, giving screen reader users immediate landmark awareness. |
| **1.4.3 Contrast Minimum** | **AA** | Title and body text strictly exceed 4.5:1 contrast against surface backgrounds; icon wells adapt via \`light-dark()\` and inverted tokens. |
| **2.5.5 / 2.5.8 Target Size** | **AA/AAA** | Action buttons maintain minimum 48px touch targets (or 32px for compact contexts). |
| **Decorative Visuals** | **A** | SVG illustrations and icons are marked \`aria-hidden="true"\` to prevent redundant screen reader announcements. |

---

#### 3. CSS Custom Property Contract Table

| Property | Default Value | Description |
| :--- | :--- | :--- |
| \`--empty-state-padding-block\` | \`var(--spacing-48, 3rem)\` | Container vertical padding |
| \`--empty-state-padding-inline\` | \`var(--spacing-24, 1.5rem)\` | Container horizontal padding |
| \`--empty-state-gap\` | \`var(--spacing-16, 1rem)\` | Vertical gap between visual well, copy, and buttons |
| \`--empty-state-max-width\` | \`28rem\` | Maximum reading width constraint for title and body |
| \`--empty-state-icon-well-size\` | \`4.5rem\` | Diameter of the circular icon container |
| \`--empty-state-icon-well-bg\` | \`var(--surface-muted)\` | Background surface fill for the icon well |
| \`--empty-state-icon-scale\` | \`2.25rem\` | Dimensions of the inner icon |
| \`--empty-state-icon-color\` | \`var(--foreground-muted)\` | Icon stroke and fill color |
| \`--empty-state-icon-well-success-bg\` | \`var(--surface-success)\` | Background for success icon well |
| \`--empty-state-icon-success-color\` | \`var(--foreground-success)\` | Icon stroke/fill for success |
| \`--empty-state-icon-well-warning-bg\` | \`var(--surface-warning)\` | Background for warning icon well |
| \`--empty-state-icon-warning-color\` | \`var(--foreground-warning)\` | Icon stroke/fill for warning |
| \`--empty-state-icon-well-error-bg\` | \`var(--surface-danger)\` | Background for error/danger icon well |
| \`--empty-state-icon-error-color\` | \`var(--foreground-danger)\` | Icon stroke/fill for error/danger |
| \`--empty-state-title-font-size\` | \`var(--typography-font-size-1)\` | Title heading typography size |
| \`--empty-state-title-color\` | \`var(--foreground-default)\` | Title heading text color |
| \`--empty-state-description-color\` | \`var(--foreground-muted)\` | Description body text color |
        `,
      },
    },
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Title heading text',
      defaultValue: 'No results found',
    },
    description: {
      control: 'text',
      description: 'Supporting explanation copy',
      defaultValue: 'We couldn’t find any items matching your search criteria. Try checking for typos or clear active filters.',
    },
    status: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error'],
      description: 'Semantic status variant updating visual well background and icon fill',
    },
    compact: {
      control: 'boolean',
      description: 'Compact density for sidebars, dropdowns, and table cells',
    },
    startAligned: {
      control: 'boolean',
      description: 'Left/Start alignment instead of centered',
    },
    bordered: {
      control: 'boolean',
      description: 'Dashed perimeter border for standalone canvas placement',
    },
    flush: {
      control: 'boolean',
      description: 'Zero padding when nested inside pre-padded containers',
    },
  },
};

export default meta;
type Story = StoryObj<EmptyStateArgs>;

function getEmptyStateClasses(args: EmptyStateArgs): string {
  const classes = ['empty-state'];
  if (args.status && args.status !== 'default') {
    classes.push(`empty-state--${args.status}`);
  }
  if (args.compact) classes.push('empty-state--compact');
  if (args.startAligned) classes.push('empty-state--start');
  if (args.bordered) classes.push('empty-state--bordered');
  if (args.flush) classes.push('empty-state--flush');
  return classes.join(' ');
}

export const Default: Story = {
  args: {
    title: 'No items match your search',
    description: 'We couldn’t find any components or tokens matching your criteria. Try adjusting your search query or reset your active filters.',
    status: 'default',
    compact: false,
    startAligned: false,
    bordered: false,
    flush: false,
  },
  render: (args) => {
    let iconHref = '#Search';
    if (args.status === 'success') iconHref = '#Check';
    else if (args.status === 'warning') iconHref = '#Warning';
    else if (args.status === 'error') iconHref = '#Close';

    return `
    <div style="max-inline-size: 38rem; padding: var(--spacing-24, 1.5rem); background-color: var(--surface); border-radius: var(--radius-md, 0.5rem);">
      <section class="${getEmptyStateClasses(args)}" aria-labelledby="demo-empty-title">
        <div class="empty-state__visual" aria-hidden="true">
          <svg class="icon"><use href="${iconHref}"/></svg>
        </div>
        <div class="empty-state__content">
          <h3 id="demo-empty-title" class="empty-state__title subheading">${args.title}</h3>
          <p class="empty-state__description small-text">${args.description}</p>
        </div>
        <div class="empty-state__actions">
          <button type="button" class="button button--primary">
            <span>Clear Filters</span>
          </button>
          <button type="button" class="button button--subtle">
            <span>View Documentation</span>
          </button>
        </div>
      </section>
    </div>
  `;
  },
};

export const FirstTimeOnboarding: Story = {
  render: () => `
    <div style="max-inline-size: 36rem; padding: var(--spacing-24, 1.5rem); background-color: var(--surface); border-radius: var(--radius-md, 0.5rem);">
      <section class="empty-state" aria-labelledby="onboard-title">
        <div class="empty-state__visual" aria-hidden="true">
          <svg class="icon"><use href="#Plus"/></svg>
        </div>
        <div class="empty-state__content">
          <h3 id="onboard-title" class="empty-state__title subheading">Create your first design system</h3>
          <p class="empty-state__description small-text">
            Start organizing your design tokens, primitives, and composite recipes in a unified, accessible workspace.
          </p>
        </div>
        <div class="empty-state__actions">
          <button type="button" class="button button--primary">
            <svg class="icon" aria-hidden="true" width="20" height="20"><use href="#Plus"/></svg>
            <span>Create New System</span>
          </button>
          <button type="button" class="button button--secondary">
            <svg class="icon" aria-hidden="true" width="20" height="20"><use href="#Upload"/></svg>
            <span>Import DTCG Tokens</span>
          </button>
        </div>
      </section>
    </div>
  `,
};

export const CardCompanion: Story = {
  render: () => `
    <div style="max-inline-size: 30rem; padding: var(--spacing-16, 1rem);">
      <article class="card card--bordered bg-card" aria-labelledby="card-empty-heading">
        <div class="card__content">
          
          <header class="card__header">
            <h3 class="card__title font-size-0 font-bold">Activity Feed</h3>
            <span class="badge badge--sm">Live</span>
          </header>

          <div class="card__body">
            <div class="empty-state empty-state--flush empty-state--compact" aria-labelledby="card-empty-heading">
              <div class="empty-state__visual" aria-hidden="true">
                <svg class="icon"><use href="#Check"/></svg>
              </div>
              <div class="empty-state__content">
                <h4 id="card-empty-heading" class="empty-state__title small-heading">All caught up</h4>
                <p class="empty-state__description micro-text text-muted">
                  There are no pending review tasks or unread notifications in this workspace.
                </p>
              </div>
              <div class="empty-state__actions">
                <button type="button" class="button button--subtle button--sm">
                  <span>Refresh Feed</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </article>
    </div>
  `,
};

export const TableEmptyState: Story = {
  render: () => `
    <div style="max-inline-size: 44rem; padding: var(--spacing-16, 1rem); background-color: var(--surface); border-radius: var(--radius-md, 0.5rem);">
      <div class="table-container">
        <table class="table" style="inline-size: 100%;">
          <thead>
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th>Tier</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colspan="4" style="padding: 0;">
                <div class="empty-state empty-state--compact" style="padding-block: var(--spacing-32, 2rem);" aria-labelledby="table-empty-title">
                  <div class="empty-state__visual" aria-hidden="true">
                    <svg class="icon"><use href="#Search"/></svg>
                  </div>
                  <div class="empty-state__content">
                    <h4 id="table-empty-title" class="empty-state__title small-heading">No matching tokens found</h4>
                    <p class="empty-state__description small-text text-muted">
                      No design tokens match the query <code>--elevation-*</code>.
                    </p>
                  </div>
                  <div class="empty-state__actions">
                    <button type="button" class="button button--subtle button--sm">
                      <span>Clear Search</span>
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
};

export const StartAligned: Story = {
  render: () => `
    <div style="max-inline-size: 26rem; padding: var(--spacing-24, 1.5rem); background-color: var(--surface); border-radius: var(--radius-md, 0.5rem);">
      <section class="empty-state empty-state--start empty-state--compact" aria-labelledby="sidebar-empty-title">
        <div class="empty-state__visual" aria-hidden="true">
          <svg class="icon"><use href="#Search"/></svg>
        </div>
        <div class="empty-state__content">
          <h4 id="sidebar-empty-title" class="empty-state__title small-heading">Filter returned no items</h4>
          <p class="empty-state__description small-text text-muted">
            Try adjusting your category selection or reset search filters.
          </p>
        </div>
        <div class="empty-state__actions">
          <button type="button" class="button button--primary button--sm">
            <span>Reset Category</span>
          </button>
        </div>
      </section>
    </div>
  `,
};

export const BorderedDashed: Story = {
  render: () => `
    <div style="max-inline-size: 34rem; padding: var(--spacing-24, 1.5rem); background-color: var(--surface); border-radius: var(--radius-md, 0.5rem);">
      <section class="empty-state empty-state--bordered" aria-labelledby="bordered-empty-title">
        <div class="empty-state__visual" aria-hidden="true">
          <svg class="icon"><use href="#Upload"/></svg>
        </div>
        <div class="empty-state__content">
          <h3 id="bordered-empty-title" class="empty-state__title subheading">Drop design files here</h3>
          <p class="empty-state__description small-text text-muted">
            Drag and drop JSON token files or SVG symbols to upload them to the library.
          </p>
        </div>
        <div class="empty-state__actions">
          <button type="button" class="button button--secondary">
            <span>Browse Files</span>
          </button>
        </div>
      </section>
    </div>
  `,
};

export const ContainerStyleQuery: Story = {
  render: () => `
    <div class="stack gap-lg" style="max-inline-size: 30rem; padding: var(--spacing-24, 1.5rem); background-color: var(--surface); border-radius: var(--radius-md, 0.5rem);">
      <p class="font-size--1 text-muted">
        Parent container orchestrates <code>--empty-state-density: compact;</code> declaratively without modifying child classes.
      </p>

      <div style="--empty-state-density: compact;" class="card card--bordered padding-md">
        <section class="empty-state" aria-labelledby="csq-empty-title">
          <div class="empty-state__visual" aria-hidden="true">
            <svg class="icon"><use href="#Check"/></svg>
          </div>
          <div class="empty-state__content">
            <h4 id="csq-empty-title" class="empty-state__title small-heading">Container query density</h4>
            <p class="empty-state__description small-text text-muted">
              Compact sizing and reduced padding automatically applied.
            </p>
          </div>
        </section>
      </div>
    </div>
  `,
};

export const SemanticStatusVariants: Story = {
  render: () => `
    <div class="cluster gap-lg align-items-stretch" style="inline-size: 100%;">
      <!-- Success State -->
      <div style="flex: 1; min-inline-size: 18rem; padding: var(--spacing-20, 1.25rem); background-color: var(--surface); border-radius: var(--radius-md, 0.5rem); border: 1px solid var(--border-color-quiet, currentColor);">
        <section class="empty-state empty-state--success empty-state--compact" aria-labelledby="status-success-title">
          <div class="empty-state__visual" aria-hidden="true">
            <svg class="icon"><use href="#Check"/></svg>
          </div>
          <div class="empty-state__content">
            <h3 id="status-success-title" class="empty-state__title small-heading">Sync complete</h3>
            <p class="empty-state__description small-text text-muted">
              All 717 tokens and native variables are fully synchronized with Figma.
            </p>
          </div>
          <div class="empty-state__actions">
            <button type="button" class="button button--secondary button--sm">
              <span>View Report</span>
            </button>
          </div>
        </section>
      </div>

      <!-- Warning State -->
      <div style="flex: 1; min-inline-size: 18rem; padding: var(--spacing-20, 1.25rem); background-color: var(--surface); border-radius: var(--radius-md, 0.5rem); border: 1px solid var(--border-color-quiet, currentColor);">
        <section class="empty-state empty-state--warning empty-state--compact" aria-labelledby="status-warning-title">
          <div class="empty-state__visual" aria-hidden="true">
            <svg class="icon"><use href="#Warning"/></svg>
          </div>
          <div class="empty-state__content">
            <h3 id="status-warning-title" class="empty-state__title small-heading">Subscription expiring</h3>
            <p class="empty-state__description small-text text-muted">
              Your team trial has ended. Renew access to preserve publishing permissions.
            </p>
          </div>
          <div class="empty-state__actions">
            <button type="button" class="button button--secondary button--sm">
              <span>Renew Plan</span>
            </button>
          </div>
        </section>
      </div>

      <!-- Error / Danger State -->
      <div style="flex: 1; min-inline-size: 18rem; padding: var(--spacing-20, 1.25rem); background-color: var(--surface); border-radius: var(--radius-md, 0.5rem); border: 1px solid var(--border-color-quiet, currentColor);">
        <section class="empty-state empty-state--error empty-state--compact" aria-labelledby="status-error-title">
          <div class="empty-state__visual" aria-hidden="true">
            <svg class="icon"><use href="#Close"/></svg>
          </div>
          <div class="empty-state__content">
            <h3 id="status-error-title" class="empty-state__title small-heading">Connection failed</h3>
            <p class="empty-state__description small-text text-muted">
              Unable to load remote repository. Check network connection or credentials.
            </p>
          </div>
          <div class="empty-state__actions">
            <button type="button" class="button button--destructive button--sm">
              <span>Retry Connection</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  `,
};
