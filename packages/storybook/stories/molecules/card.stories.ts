import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Molecules/Card',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
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
| Chrome | default (the prominence's edge), \`--flat\` (no border, corners or shadow; keeps the fill), \`--bordered\` (a border at any prominence) | \`--card-chrome\` |
| Intent | neutral (default), \`--accent\`, \`--danger\`, \`--warning\`, \`--success\`, \`--info\` (the whole border in the intent colour, with a ring outside it) | \`--card-intent\` |
| Padding | default, \`--flush\` (no padding at the card's edges) | |
| Density | default, \`--compact\` | \`--ui-sizing: compact\` |

- \`--translucent\` is a material that combines with any prominence that has a fill.
- \`--ruled\` draws rules between parts; \`.card__band\` (\`--subtle\`) is a full-width strip between them.
- Dialog and popover set \`--card-prominence: strong\` for the card they hold. A card resets the flag for cards nested inside it.
- One modifier per axis: \`.card--plain.card--bordered\` is an outline, \`.card--subtle.card--flat\` a square tint, \`.card--plain.card--flush\` the content alone.
- Intent marks a state (live, selected, at risk) and is never colour alone: the card says it in words too, usually with a status of the same intent. It draws the border at any prominence or chrome, and its ring sits outside the border, so a card changing state doesn't move its content. A strong card's shadow, and a linked card's hover shadow, take the intent colour.
- \`@max-2xl:\` (below 42rem) and \`@max-md:\` (below 28rem) versions of \`--plain\`, \`--flat\`, \`--bordered\` and \`--flush\` apply while the nearest size container is narrow.

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
    chrome: 'default',
    intent: 'neutral',
    flush: false,
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
    chrome: { control: 'inline-radio', options: ['default', 'flat', 'bordered'] },
    intent: { control: 'inline-radio', options: ['neutral', 'accent', 'danger', 'warning', 'success', 'info'] },
    flush: { control: 'boolean' },
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
      args.chrome !== 'default' ? `card--${args.chrome}` : '',
      args.intent !== 'neutral' ? `card--${args.intent}` : '',
      args.flush ? 'card--flush' : '',
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
            ${args.intent !== 'neutral' ? `<span class="status status--subtle status--${args.intent}"><span class="status__text">${args.intent[0].toUpperCase() + args.intent.slice(1)}</span></span>` : ''}
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
        <p class="card__subtitle small-text">${cls ? `.${cls.replace(/ /g, '.')}` : 'default'}</p>
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
      <div style="background: linear-gradient(135deg, var(--surface-accent-strong), var(--surface-darker)); padding: var(--spacing-16);">
        <article class="card card--strong card--translucent" style="--card-translucency: 25%;">
          <header class="card__header"><h3 class="card__title heading">Translucent</h3></header>
          <div class="card__body"><p class="text">A material on top of any prominence with a fill.</p></div>
        </article>
      </div>
    </div>
  `,
};

export const Chrome: Story = {
  render: () => `
    <div class="grid" style="grid-template-columns: repeat(auto-fit, minmax(min(16rem, 100%), 1fr)); gap: var(--spacing-24);">
      ${prominenceCard('card--flat', 'Flat', 'The card surface with no border, corners or shadow: a panel in a layout.')}
      ${prominenceCard('card--subtle card--flat', 'Subtle and flat', 'A square tint.')}
      ${prominenceCard('card--plain card--bordered', 'Plain and bordered', 'An outline: no surface, a border.')}
      ${prominenceCard('card--subtle card--bordered', 'Subtle and bordered', 'A tint with a border.')}
      ${prominenceCard('card--flush', 'Flush', 'No padding at the edges, for content that brings its own.')}
    </div>
  `,
};

const intentCard = (cls: string, name: string, state: string, intent: string) => `
  <article class="card ${cls}">
    <header class="card__header">
      <hgroup class="card__hgroup">
        <h3 class="card__title heading">${name}</h3>
        <p class="card__subtitle small-text">.${cls.replace(/ /g, '.')}</p>
      </hgroup>
      <span class="status status--subtle${intent === 'neutral' ? '' : ` status--${intent}`}"><span class="status__text">${state}</span></span>
    </header>
    <div class="card__body"><p class="text">The status says the state in words; the edge makes it easy to spot.</p></div>
  </article>
`;

export const Intent: Story = {
  parameters: { docs: { description: { story: 'The border, a ring outside it and (on strong and linked cards) the shadow take the intent colour. The status says the state in words.' } } },
  render: () => `
    <div class="grid" style="grid-template-columns: repeat(auto-fit, minmax(min(16rem, 100%), 1fr)); gap: var(--spacing-24);">
      ${intentCard('card--accent', 'Deck A', 'On air', 'accent')}
      ${intentCard('card--warning', 'Deck B', 'Cued', 'warning')}
      ${intentCard('card--danger', 'Payments', 'Failing', 'danger')}
      ${intentCard('card--success', 'Backups', 'Healthy', 'success')}
      ${intentCard('card--info', 'Release 4.2', 'Scheduled', 'info')}
      ${intentCard('card--subtle card--accent', 'Subtle', 'Selected', 'accent')}
      ${intentCard('card--plain card--accent', 'Plain', 'Selected', 'accent')}
      ${intentCard('card--flat card--accent', 'Flat', 'Selected', 'accent')}
    </div>
    <p class="small-text text-muted" style="margin-block: var(--spacing-24) var(--spacing-16);">Wherever a card has a shadow, the shadow takes the intent colour: a strong card, and a linked card on hover.</p>
    <div class="grid" style="grid-template-columns: repeat(auto-fit, minmax(min(16rem, 100%), 1fr)); gap: var(--spacing-24);">
      ${intentCard('card--strong card--accent', 'Strong', 'On air', 'accent')}
      ${intentCard('card--strong card--danger', 'Strong', 'Failing', 'danger')}
      ${intentCard('card--strong card--success', 'Strong', 'Healthy', 'success')}
      ${intentCard('card--strong', 'Strong, neutral', 'Idle', 'neutral')}
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
    <div class="stack max-w-md">
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
    <p class="small-text text-muted">Each frame is a size container. <code>@max-2xl:card--plain</code> drops the frame below 42rem; drag the corner to resize.</p>
    <div class="container-inline" style="resize: horizontal; overflow: auto; inline-size: 30rem; max-inline-size: 100%; border: 1px dashed var(--border-color-quiet); padding: var(--spacing-8);">
      <article class="card card--strong @max-2xl:card--plain">
        <header class="card__header"><h3 class="card__title heading">Plain while narrow</h3></header>
        <div class="card__body"><p class="text">Gains its border, radius and shadow as the container grows past 42rem.</p></div>
      </article>
    </div>
    <div class="container-inline" style="resize: horizontal; overflow: auto; inline-size: 24rem; max-inline-size: 100%; border: 1px dashed var(--border-color-quiet); padding: var(--spacing-8); margin-block-start: var(--spacing-16);">
      <article class="card @max-md:card--flat @max-md:card--flush">
        <header class="card__header"><h3 class="card__title heading">Flat and flush while narrow</h3></header>
        <div class="card__body"><p class="text">Below 28rem the edge and the outer padding go, so the content runs to the container's edge.</p></div>
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

export const Canvas: Story = {
  parameters: { docs: { description: { story: '`.card__canvas` sits where a thumb would and takes any content: here a carousel of stretched thumbnails. The parts after it take the card\'s padding as they would after a thumb.' } } },
  render: () => `
    <article class="card max-w-sm">
      <div class="card__canvas p-0">
        <ul class="grid grid--carousel p-xs focus-ring focus-ring--inset" role="list" tabindex="0" aria-label="Garden photos">
          <li><img class="thumbnail thumbnail--stretch" style="--thumbnail-aspect: 4 / 3;" src="${img}" alt="The walled garden in May" /></li>
          <li><img class="thumbnail thumbnail--stretch" style="--thumbnail-aspect: 4 / 3;" src="${img}" alt="The orchard after pruning" /></li>
          <li><img class="thumbnail thumbnail--stretch" style="--thumbnail-aspect: 4 / 3;" src="${img}" alt="Seed trays in the glasshouse" /></li>
        </ul>
      </div>
      <header class="card__header"><h3 class="card__title heading">More than one picture</h3></header>
      <div class="card__body"><p class="text">The canvas takes the thumb's place for a carousel, a demo or a chart.</p></div>
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

export const HeaderSecondLine: Story = {
  name: 'Header with a second line',
  render: () => `
    <article class="card max-w-lg">
      <header class="card__header">
        <hgroup class="card__hgroup">
          <h3 class="card__title heading">Queue and schedule</h3>
          <p class="card__subtitle small-text">8 items queued</p>
        </hgroup>
        <button type="button" class="button button--sm"><span>Auto-balance</span></button>
        <div class="card__header-line cluster cluster--between">
          <input type="search" class="input input--sm" placeholder="Search queued items" aria-label="Search items" />
        </div>
      </header>
      <div class="card__body"><p class="text">The queue, below the search.</p></div>
    </article>
  `,
};

export const CardWithBand: Story = {
  name: 'Bands',
  render: () => `
    <article class="card card--ruled max-w-lg">
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
        <p class="sr-only" role="status">Loading team activity…</p>
        <p class="text">
          <span class="skeleton skeleton--text" aria-hidden="true"></span>
          <span class="skeleton skeleton--text skeleton--w-75" aria-hidden="true"></span>
        </p>
      </div>
    </article>
  `,
};

/**
 * A flag on the container and a modifier on the Card set different axes, so
 * both apply: the intent's border shows on a plain and a subtle Card, the
 * flat chrome stays flat on a strong Card.
 */
export const FlagsAndModifiers: Story = {
  name: 'Flags and modifiers',
  render: () => `
    <div class="stack">
      <div class="grid grid--3-col" style="--card-intent: danger;">
        ${['card--plain', 'card--subtle', 'card--strong']
          .map(
            (cls) => `
          <article class="card ${cls}">
            <div class="card__body"><p class="text"><strong>At risk:</strong> .${cls} with the danger flag</p></div>
          </article>`,
          )
          .join('')}
      </div>
      <div class="grid grid--3-col" style="--card-chrome: flat;">
        ${['card--strong', 'card--bordered', 'card--accent']
          .map(
            (cls) => `
          <article class="card ${cls}">
            <div class="card__body"><p class="text">${cls === 'card--accent' ? '<strong>Selected:</strong> ' : ''}.${cls} with the flat flag</p></div>
          </article>`,
          )
          .join('')}
      </div>
    </div>
  `,
};
