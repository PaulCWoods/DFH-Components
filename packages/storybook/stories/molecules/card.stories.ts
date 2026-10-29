import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Molecules/Card',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# Card

A surface with named parts. The card draws its frame (surface, border, radius, shadow) and the geometry of its parts; typography comes from the text atoms, and what goes in the body is content, not part of the card.

### Markup
\`\`\`html
<article class="card">
  <div class="card__thumb"><img src="/image.jpg" alt="" loading="lazy" /></div>
  <header class="card__header">
    <hgroup class="card__hgroup">
      <h3 class="card__title heading">
        <a href="/post" class="link link--plain link--stretched">Card headline</a>
      </h3>
      <p class="card__subtitle small-text">Supporting subtitle</p>
    </hgroup>
  </header>
  <div class="card__body"><p class="text">Body copy.</p></div>
  <footer class="card__footer">
    <time class="small-text text-muted" datetime="2026-10-13">13 October 2026</time>
  </footer>
</article>
\`\`\`

Parts (\`__thumb\`, \`__header\`, \`__band\`, \`__body\`, \`__footer\`) are direct children of \`.card\` and pad themselves, so rules and bands run edge to edge. \`.card__content\` wraps parts only beside a thumbnail in a row card.

### Axes
| Axis | Values | Flag |
| :--- | :--- | :--- |
| Prominence | default (surface and quiet border), \`--strong\` (raised, for floating cards), \`--subtle\` (tint, no border), \`--plain\` (no surface, border or shadow) | \`--card-prominence\` |
| Density | default, \`--compact\` | \`--ui-sizing: compact\` |

- \`--translucent\` is a material that combines with any prominence that has a fill.
- \`--ruled\` draws rules between parts; \`.card__band\` (\`--subtle\`) is a full-width strip between them.
- Dialog and popover set \`--card-prominence: strong\` for the card they hold. A card resets the flag for cards nested inside it.
- \`@max-sm:card--plain\` and \`@max-xs:card--plain\` drop the frame while the nearest size container is narrow.

### Linked card
Put \`.link.link--plain.link--stretched\` in the title. The whole card becomes the target, the focus ring is drawn on the card's perimeter, other controls are lifted above the link, and hover raises the shadow where hover exists.

### Scrolling
\`.card__body--scrollable\`: the body scrolls between a pinned header and footer. \`.card--scrollable\` (or \`--card-scroll: all\`): the whole card scrolls. Make a scroll region focusable and name it.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const img = 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80';

export const Playground: Story = {
  args: {
    prominence: 'default',
    compact: false,
    ruled: false,
    translucent: false,
    hasThumb: true,
    linked: true,
    title: 'Designing accessible design systems',
    subtitle: 'Web standards and token architecture',
    bodyText: 'Building token-driven components that bridge Figma, web standards and assistive technology.',
  },
  argTypes: {
    prominence: { control: 'inline-radio', options: ['default', 'strong', 'subtle', 'plain'] },
    compact: { control: 'boolean' },
    ruled: { control: 'boolean' },
    translucent: { control: 'boolean' },
    hasThumb: { control: 'boolean' },
    linked: { control: 'boolean' },
    title: { control: 'text' },
    subtitle: { control: 'text' },
    bodyText: { control: 'text' },
  },
  render: (args) => {
    const classes = [
      'card',
      args.prominence !== 'default' ? `card--${args.prominence}` : '',
      args.compact ? 'card--compact' : '',
      args.ruled ? 'card--ruled' : '',
      args.translucent ? 'card--translucent' : '',
    ].filter(Boolean).join(' ');
    const title = args.linked
      ? `<a href="#" class="link link--plain link--stretched">${args.title}</a>`
      : args.title;

    return `
      <div style="max-inline-size: 28rem;">
        <article class="${classes}">
          ${args.hasThumb ? `<div class="card__thumb"><img src="${img}" alt="" loading="lazy" /></div>` : ''}
          <header class="card__header">
            <hgroup class="card__hgroup">
              <h3 class="card__title heading">${title}</h3>
              <p class="card__subtitle small-text">${args.subtitle}</p>
            </hgroup>
          </header>
          <div class="card__body"><p class="text">${args.bodyText}</p></div>
          <footer class="card__footer">
            <time class="small-text text-muted" datetime="2026-10-13">13 Oct 2026</time>
            <button type="button" class="button button--subtle button--sm"><span>Save</span></button>
          </footer>
        </article>
      </div>
    `;
  },
};

export const Anatomy: Story = {
  render: () => `
    <div class="stack" style="max-inline-size: 30rem;">
      <article class="card card--ruled">
        <div class="card__thumb"><img src="${img}" alt="" /></div>
        <header class="card__header">
          <hgroup class="card__hgroup">
            <span class="sb-demo-tag"><span>.card__header › .card__hgroup</span></span>
            <h3 class="card__title heading">.card__title</h3>
            <p class="card__subtitle small-text">.card__subtitle</p>
          </hgroup>
          <span class="status status--success"><span class="status__text">Live</span></span>
        </header>
        <div class="card__band card__band--subtle">
          <span class="sb-demo-tag"><span>.card__band--subtle</span></span>
        </div>
        <div class="card__body">
          <span class="sb-demo-tag"><span>.card__body</span></span>
          <p class="text">Each part pads itself, so the rules of a ruled card run edge to edge.</p>
        </div>
        <footer class="card__footer">
          <span class="sb-demo-tag"><span>.card__footer</span></span>
          <button type="button" class="button button--sm"><span>Action</span></button>
        </footer>
      </article>
    </div>
  `,
};

const prominenceCard = (cls: string, name: string, note: string) => `
  <article class="card ${cls}">
    <header class="card__header">
      <hgroup class="card__hgroup">
        <h3 class="card__title heading">${name}</h3>
        <p class="card__subtitle small-text">${cls ? `.${cls}` : 'default'}</p>
      </hgroup>
    </header>
    <div class="card__body"><p class="text">${note}</p></div>
  </article>
`;

export const Prominence: Story = {
  render: () => `
    <div class="grid" style="grid-template-columns: repeat(auto-fit, minmax(min(16rem, 100%), 1fr)); gap: var(--spacing-24);">
      ${prominenceCard('', 'Default', 'Card surface and a quiet border. The common case.')}
      ${prominenceCard('card--strong', 'Strong', 'Raised with a shadow, for cards that float: popovers, menus, dialogs.')}
      ${prominenceCard('card--subtle', 'Subtle', 'A tinted surface with no border.')}
      ${prominenceCard('card--plain', 'Plain', 'No surface, border or shadow. Keeps its padding.')}
      <div style="background: linear-gradient(135deg, var(--surface-color-accent-strong-light), var(--surface-darker)); padding: var(--spacing-16);">
        <article class="card card--strong card--translucent" style="--card-translucency: 25%;">
          <header class="card__header"><h3 class="card__title heading">Translucent</h3></header>
          <div class="card__body"><p class="text">A material on top of any prominence with a fill.</p></div>
        </article>
      </div>
    </div>
  `,
};

export const ProminenceFlag: Story = {
  name: 'Prominence flag',
  render: () => `
    <div class="stack" style="--card-prominence: subtle;">
      <p class="small-text text-muted">This container sets <code>--card-prominence: subtle</code>. The nested card resets to the default.</p>
      <article class="card">
        <header class="card__header"><h3 class="card__title heading">Subtle from the flag</h3></header>
        <div class="card__body">
          <article class="card">
            <div class="card__body"><p class="text">Nested card: default.</p></div>
          </article>
        </div>
      </article>
      <article class="card card--plain">
        <div class="card__body"><p class="text">A modifier on the card beats the flag: plain.</p></div>
      </article>
    </div>
  `,
};

export const LinkedCard: Story = {
  name: 'Linked card',
  render: () => `
    <div class="grid" style="grid-template-columns: repeat(auto-fit, minmax(min(18rem, 100%), 1fr)); gap: var(--spacing-24);">
      <article class="card">
        <div class="card__thumb"><img src="${img}" alt="" loading="lazy" /></div>
        <header class="card__header">
          <h3 class="card__title heading">
            <a href="#article" class="link link--plain link--stretched">Building accessible web components</a>
          </h3>
        </header>
        <div class="card__body"><p class="text">The whole card is the target. Tab to the title to see the ring on the card's edge.</p></div>
        <footer class="card__footer">
          <time class="small-text text-muted" datetime="2026-10-13">13 Oct 2026</time>
          <button type="button" class="button button--subtle button--sm"><span>Save</span></button>
        </footer>
      </article>
    </div>
  `,
};

export const Density: Story = {
  render: () => `
    <div class="stack" style="max-inline-size: 36rem;">
      <article class="card">
        <header class="card__header"><h3 class="card__title heading">Default</h3></header>
        <div class="card__body"><p class="text">Padding from <code>--card-padding</code>.</p></div>
        <footer class="card__footer"><button type="button" class="button"><span>Continue</span></button></footer>
      </article>
      <article class="card card--compact">
        <header class="card__header"><h3 class="card__title heading">Compact</h3></header>
        <div class="card__body"><p class="text">Tighter padding; text and controls inside step down.</p></div>
        <footer class="card__footer"><button type="button" class="button"><span>Continue</span></button></footer>
      </article>
    </div>
  `,
};

export const Responsive: Story = {
  render: () => `
    <p class="small-text text-muted">Each frame is a size container. <code>@max-sm:card--plain</code> drops the frame below 40em; drag the corner to resize.</p>
    <div class="container-inline" style="resize: horizontal; overflow: auto; inline-size: 30rem; max-inline-size: 100%; border: 1px dashed var(--border-color-quiet); padding: var(--spacing-8);">
      <article class="card card--strong @max-sm:card--plain">
        <header class="card__header"><h3 class="card__title heading">Plain while narrow</h3></header>
        <div class="card__body"><p class="text">Gains its border, radius and shadow as the container grows past 40em.</p></div>
      </article>
    </div>
  `,
};

export const MediaRow: Story = {
  name: 'Media row',
  render: () => `
    <article class="card" style="--card-dir: row; max-inline-size: 40rem;">
      <div class="card__thumb" style="flex: 0 0 40%; --card-thumb-aspect-ratio: auto;"><img src="${img}" alt="" /></div>
      <div class="card__content">
        <header class="card__header"><h3 class="card__title heading">Beside the media</h3></header>
        <div class="card__body"><p class="text"><code>.card__content</code> holds the parts beside a thumbnail.</p></div>
      </div>
    </article>
  `,
};

export const Scrolling: Story = {
  render: () => `
    <div class="grid" style="grid-template-columns: repeat(auto-fit, minmax(min(18rem, 100%), 1fr)); gap: var(--spacing-24);">
      <div style="block-size: 18rem;">
        <article class="card card--ruled">
          <header class="card__header"><h3 class="card__title heading">Scrollable body</h3></header>
          <div class="card__body card__body--scrollable stack" tabindex="0" aria-label="Terms">
            <p class="text">The header and footer stay put; only the body scrolls.</p>
            <p class="text">Scrolling regions must be reachable by keyboard, so the body takes <code>tabindex="0"</code> and a name.</p>
            <p class="text">The card fills its container's height where that height is definite.</p>
          </div>
          <footer class="card__footer"><button type="button" class="button button--strong button--accent button--sm"><span>Accept</span></button></footer>
        </article>
      </div>
      <article class="card card--scrollable" style="max-block-size: 18rem;" tabindex="0" aria-label="Release notes">
        <header class="card__header"><h3 class="card__title heading">Whole card scrolls</h3></header>
        <div class="card__body stack">
          <p class="text">Header, body and footer scroll as one.</p>
          <p class="text">Use it for long content in a dialog with <code>.dialog--scrollable</code>.</p>
          <p class="text">The card is the scroll region, so it is focusable and named.</p>
        </div>
        <footer class="card__footer"><span class="small-text text-muted">End of notes</span></footer>
      </article>
    </div>
  `,
};

export const CardWithBand: Story = {
  name: 'Bands',
  render: () => `
    <article class="card card--ruled" style="max-inline-size: 48rem;">
      <header class="card__header">
        <hgroup class="card__hgroup">
          <h3 class="card__title heading">Project pipeline</h3>
          <p class="card__subtitle small-text">With a stepper band</p>
        </hgroup>
        <button type="button" class="button button--subtle button--sm"><span>Settings</span></button>
      </header>
      <div class="card__band card__band--subtle">
        <span class="status status--accent status--round"><span class="status__text">Step 2 of 4</span></span>
        <div class="button-group buttons-sm buttons-subtle">
          <button type="button" class="button"><span>Previous</span></button>
          <button type="button" class="button button--strong button--accent"><span>Continue</span></button>
        </div>
      </div>
      <div class="card__body"><p class="text">A band is a full-width strip between parts. A ruled card rules its bands too.</p></div>
      <div class="card__band">
        <span class="small-text text-muted">About 3 minutes remaining</span>
        <span class="status status--success status--plain"><span class="status__text">Runner active</span></span>
      </div>
      <footer class="card__footer"><button type="button" class="button button--plain button--sm"><span>View logs</span></button></footer>
    </article>
  `,
};

export const Loading: Story = {
  render: () => `
    <article class="card" aria-busy="true" aria-labelledby="loading-card-title" style="max-inline-size: 26rem;">
      <header class="card__header">
        <span class="skeleton skeleton--avatar" aria-hidden="true"></span>
        <hgroup class="card__hgroup">
          <h3 id="loading-card-title" class="card__title heading">Team activity</h3>
          <p class="card__subtitle small-text"><span class="skeleton skeleton--text" aria-hidden="true" style="--skeleton-width: 8rem;"></span></p>
        </hgroup>
      </header>
      <div class="card__body">
        <p class="visually-hidden" role="status">Loading team activity…</p>
        <p class="text">
          <span class="skeleton skeleton--text" aria-hidden="true"></span>
          <span class="skeleton skeleton--text skeleton--w-75" aria-hidden="true"></span>
        </p>
      </div>
    </article>
  `,
};
