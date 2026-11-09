import type { Meta, StoryObj } from '@storybook/html';

interface SkeletonArgs {
  shape: 'text' | 'heading' | 'avatar' | 'button' | 'input' | 'badge' | 'media' | 'none';
  pulse: boolean;
  width: string;
}

const cls = (a: Partial<SkeletonArgs>) =>
  ['skeleton', a.shape && a.shape !== 'none' ? `skeleton--${a.shape}` : '', a.pulse ? 'skeleton--pulse' : '']
    .filter(Boolean)
    .join(' ');

const meta: Meta<SkeletonArgs> = {
  title: 'Atoms/Skeleton',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
A placeholder that holds the space of content still loading, so nothing moves when it arrives.

| Use | Markup |
| :--- | :--- |
| Shape | \`.skeleton\` with \`--text\`, \`--heading\`, \`--avatar\`, \`--button\`, \`--input\`, \`--badge\` or \`--media\` |
| Companion | \`.skeleton\` on \`.avatar\`, \`.button\`, \`.input\`, \`.textarea\`, \`.select\`, \`.badge\`, \`.chip\`, \`.status\` or \`.kbd\`: the atom keeps its box, the skeleton replaces the paint |
| Width | \`--w-50\`, \`--w-75\`, \`--w-90\`; any other with \`--skeleton-width\` (and \`--skeleton-height\` on a bare \`.skeleton\`) |
| Motion | Shimmer (default), \`--pulse\`; \`--skeleton-motion: shimmer \\| pulse \\| none\` on a container |

- **Text lines size from the text atom they sit in.** \`--text\` and \`--heading\` are one line box high with the bar at cap height, so a line inside \`.text\` or \`.heading\` is exactly one of its lines. Hold a heading's place with the atom class on a \`div\`, not a heading element, which would be an empty heading.
- The fill mixes the text colour, so it shows the same on the page, a card or a band. Increased contrast strengthens it; reduced motion stops it; forced colours draws it in \`GrayText\`.
- **Announce loading.** Shapes take \`aria-hidden="true"\`; the region takes \`aria-busy="true"\` and a \`role="status"\` message. When loading ends, set \`aria-busy="false"\` and update or remove the message.

\`\`\`html
<section aria-busy="true" aria-labelledby="feed-title">
  <h2 id="feed-title" class="heading">Activity</h2>
  <p class="sr-only" role="status">Loading activity…</p>
  <div class="small-heading"><span class="skeleton skeleton--heading" aria-hidden="true"></span></div>
  <p class="text">
    <span class="skeleton skeleton--text" aria-hidden="true"></span>
    <span class="skeleton skeleton--text skeleton--w-75" aria-hidden="true"></span>
  </p>
  <button type="button" class="button skeleton" aria-hidden="true" disabled><span>Save</span></button>
</section>
\`\`\`
`,
      },
    },
  },
  argTypes: {
    shape: {
      control: 'select',
      options: ['text', 'heading', 'avatar', 'button', 'input', 'badge', 'media', 'none'],
      description: 'Shape modifier (none: a bare block)',
    },
    pulse: { control: 'boolean', description: '--pulse' },
    width: { control: 'text', description: '--skeleton-width (any length)' },
  },
  args: { shape: 'text', pulse: false, width: '' },
  render: (args) => `
    <div class="sb-demo-stage stack" style="max-inline-size: 32rem;">
      <span class="${cls(args)}" aria-hidden="true" style="${args.width ? `--skeleton-width: ${args.width};` : ''}${args.shape === 'none' ? ' --skeleton-height: 4rem;' : ''}"></span>
    </div>
  `,
};

export default meta;
type Story = StoryObj<SkeletonArgs>;

/**
 * Interactive sandbox: shape, motion and width.
 */
export const Playground: Story = {};

/**
 * Each shape takes the size of the atom it stands in for.
 */
export const Shapes: Story = {
  render: () => `
    <div class="sb-demo-stage stack" style="max-inline-size: 32rem;">
      ${(['text', 'heading', 'avatar', 'button', 'input', 'badge', 'media'] as const)
        .map(
          (shape) => `
        <div class="stack" style="--gap: var(--spacing-8);">
          <span class="sb-demo-tag">--${shape}</span>
          <span class="${cls({ shape })}" aria-hidden="true"></span>
        </div>`
        )
        .join('')}
    </div>
  `,
};

/**
 * Text lines inside text atoms: each skeleton line is one line of the atom
 * around it, so the loaded text replaces it without moving anything.
 */
export const TextInAtoms: Story = {
  render: () => `
    <div class="sb-demo-stage grid grid--auto-fit grid--xs">
      <div class="stack" style="--gap: var(--spacing-8);">
        <span class="sb-demo-tag">Loading</span>
        <div class="heading"><span class="skeleton skeleton--heading" aria-hidden="true"></span></div>
        <p class="text">
          <span class="skeleton skeleton--text" aria-hidden="true"></span>
          <span class="skeleton skeleton--text skeleton--w-90" aria-hidden="true"></span>
          <span class="skeleton skeleton--text skeleton--w-50" aria-hidden="true"></span>
        </p>
        <p class="small-text"><span class="skeleton skeleton--text" aria-hidden="true" style="--skeleton-width: 8rem;"></span></p>
      </div>
      <div class="stack" style="--gap: var(--spacing-8);">
        <span class="sb-demo-tag">Loaded</span>
        <h3 class="heading">Release notes</h3>
        <p class="text">Every atom now takes its size from the scale. Skeleton lines match the text they hold the place of.</p>
        <p class="small-text text-muted">Updated today</p>
      </div>
    </div>
  `,
};

/**
 * On another atom, .skeleton keeps that atom's box and replaces the paint.
 */
export const Companions: Story = {
  render: () => `
    <div class="sb-demo-stage stack">
      ${[
        ['.button', '<button type="button" class="button button--strong button--accent{s}"{a}><span>Save changes</span></button>'],
        ['.status', '<span class="status status--success{s}"{a}><span class="status__text">Published</span></span>'],
        ['.chip', '<span class="chip chip--subtle{s}"{a}><span class="chip__text">TypeScript</span></span>'],
        ['.input', '<input type="text" class="input{s}" value="Alex Morgan"{a} aria-label="Name" />'],
        ['.avatar', '<div class="avatar{s}"{a}>AM</div>'],
      ]
        .map(
          ([label, html]) => `
        <div class="stack" style="--gap: var(--spacing-8);">
          <span class="sb-demo-tag">${label}</span>
          <div class="cluster">
            ${html.replace('{s}', ' skeleton').replace('{a}', label === '.button' || label === '.input' ? ' aria-hidden="true" disabled' : ' aria-hidden="true"').replace(' aria-label="Name"', '')}
            ${html.replace('{s}', '').replace('{a}', '')}
          </div>
        </div>`
        )
        .join('')}
    </div>
  `,
};

/**
 * Shimmer (default) and pulse. A container sets the motion for everything
 * inside with --skeleton-motion; none stops it. Reduced motion stops it too.
 */
export const Motion: Story = {
  render: () => `
    <div class="sb-demo-stage stack" style="max-inline-size: 32rem;">
      <span class="sb-demo-tag">Shimmer (default)</span>
      <p class="text"><span class="skeleton skeleton--text" aria-hidden="true"></span></p>
      <span class="sb-demo-tag">.skeleton--pulse</span>
      <p class="text"><span class="skeleton skeleton--text skeleton--pulse" aria-hidden="true"></span></p>
      <span class="sb-demo-tag">--skeleton-motion: pulse on a container</span>
      <div class="cluster" style="--skeleton-motion: pulse;">
        <span class="skeleton skeleton--avatar" aria-hidden="true"></span>
        <span class="skeleton skeleton--button" aria-hidden="true"></span>
      </div>
      <span class="sb-demo-tag">--skeleton-motion: none on a container</span>
      <div class="cluster" style="--skeleton-motion: none;">
        <span class="skeleton skeleton--avatar" aria-hidden="true"></span>
        <span class="skeleton skeleton--button" aria-hidden="true"></span>
      </div>
    </div>
  `,
};

/**
 * The whole pattern: a busy card with a status message, a header lockup,
 * text lines and a companion button.
 */
export const LoadingCard: Story = {
  render: () => `
    <div class="sb-demo-stage max-w-sm">
      <article class="card" aria-busy="true" aria-labelledby="skeleton-card-title">
        <header class="card__header">
          <span class="skeleton skeleton--avatar" aria-hidden="true"></span>
          <hgroup class="card__hgroup">
            <h3 id="skeleton-card-title" class="card__title small-heading">Team activity</h3>
            <p class="card__subtitle small-text"><span class="skeleton skeleton--text" aria-hidden="true" style="--skeleton-width: 8rem;"></span></p>
          </hgroup>
        </header>
        <div class="card__body">
          <p class="sr-only" role="status">Loading team activity…</p>
          <span class="skeleton skeleton--media" aria-hidden="true"></span>
          <p class="text">
            <span class="skeleton skeleton--text" aria-hidden="true"></span>
            <span class="skeleton skeleton--text skeleton--w-75" aria-hidden="true"></span>
          </p>
        </div>
        <footer class="card__footer">
          <span class="status skeleton" aria-hidden="true"><span class="status__text">Active</span></span>
          <button type="button" class="button button--subtle skeleton" aria-hidden="true" disabled><span>Open</span></button>
        </footer>
      </article>
    </div>
  `,
};
