import type { Meta, StoryObj } from '@storybook/html';

type Prominence = 'default' | 'subtle' | 'plain';
type BlockProminence = 'default' | 'strong' | 'subtle' | 'plain';

interface LinkArgs {
  label: string;
  prominence: Prominence;
}

const PROMINENCES: Prominence[] = ['default', 'subtle', 'plain'];
const BLOCK_PROMINENCES: BlockProminence[] = ['default', 'strong', 'subtle', 'plain'];

const linkClasses = (prominence: Prominence = 'default') =>
  ['link', prominence !== 'default' ? `link--${prominence}` : ''].filter(Boolean).join(' ');

const arrow = `<svg class="block-link__arrow icon icon--dir" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#arrow-right"/></svg>`;

const blockLink = (label: string, mods: string[] = []) => `
  <a href="#" class="${['block-link', ...mods.filter(Boolean)].join(' ')}">
    <span class="block-link__text">${label}</span>${arrow}
  </a>`;

const meta: Meta<LinkArgs> = {
  title: 'Atoms/Link',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
The inline link sits in text and takes the size of that text. The block link is a full-width navigational callout whose label wraps, with a trailing arrow.

| Atom | Axes | Container flags |
| :--- | :--- | :--- |
| \`.link\` | Prominence: default, \`--subtle\`, \`--plain\` | \`--link-prominence\` |
| \`.block-link\` | Prominence: outline, \`--strong\`, \`--subtle\`, \`--plain\`; size: default, \`--sm\` | \`--block-link-prominence\`, \`--block-link-size\` |

- **The underline marks the link** (WCAG 1.4.1): link colour is close to body text. It is drawn at the full link colour and thickens on hover, so no second colour has to pass 4.5:1.
- **\`--plain\`** has no underline at rest. Use it only where context already marks the link (navigation, a list of links, a card title), never in running text.
- **No intent or size.** A destructive action is a \`.button--danger\`; an inline link takes the size of its text.
- **On a dark band**, put \`.color-scheme-dark\` on the band; every token inside, links included, flips.
- **External links**: no space between the text and the icon, and say that it opens a new tab.
- Block link \`--sm\` keeps a 48px hit area unless the product opts into fine-pointer targets; a compact container steps it to \`--sm\`.

\`\`\`html
<p>Read the <a href="/guide" class="link">accessibility guide</a> first.</p>
\`\`\`
`,
      },
    },
  },
  argTypes: {
    label: { control: 'text' },
    prominence: { control: 'inline-radio', options: PROMINENCES },
  },
  render: (args) => `
    <div class="sb-demo-stage sb-demo-constrained--md">
      <p class="text">Read our deep dive on <a href="#" class="${linkClasses(args.prominence)}">${args.label}</a> before you start.</p>
    </div>
  `,
};

export default meta;
type Story = StoryObj<LinkArgs>;

/**
 * Interactive sandbox.
 */
export const Playground: Story = {
  args: { label: 'design token architecture', prominence: 'default' },
};

/**
 * Default and subtle in running text; plain only where context marks the link.
 */
export const Prominence: Story = {
  render: () => `
    <div class="sb-demo-stage sb-demo-constrained--md stack">
      <span class="sb-demo-tag">default</span>
      <p class="text">Read our deep dive on <a href="#" class="link">design token architecture</a> before you start.</p>
      <span class="sb-demo-tag">--subtle: the text colour, still underlined</span>
      <p class="text">Tags: <a href="#" class="link link--subtle">Web standards</a>, <a href="#" class="link link--subtle">CSS variables</a>, <a href="#" class="link link--subtle">Accessibility</a></p>
      <span class="sb-demo-tag">--plain: navigation only, underlined on hover and focus</span>
      <nav aria-label="Footer">
        <ul class="cluster p-0 m-0" role="list">
          <li><a href="#" class="link link--plain">Privacy</a></li>
          <li><a href="#" class="link link--plain">Accessibility statement</a></li>
          <li><a href="#" class="link link--plain">Contact</a></li>
        </ul>
      </nav>
    </div>
  `,
};

/**
 * External link: the icon follows the text with no underlined space, and the link says it opens a new tab.
 */
export const External: Story = {
  render: () => `
    <div class="sb-demo-stage sb-demo-constrained--md">
      <p class="text">Review the official <a href="https://www.w3.org/TR/WCAG22/" class="link" target="_blank" rel="noopener noreferrer">WCAG 2.2 standard<span class="sr-only"> (opens in a new tab)</span><svg class="icon icon--dir" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#arrow-up-right"/></svg></a> for the full list.</p>
    </div>
  `,
};

/**
 * An icon before the text: the Link is a row (.inline), whose gap spaces the
 * icon, so the icon lines up with the heading below.
 */
export const LeadingIcon: Story = {
  render: () => `
    <div class="sb-demo-stage stack max-w-sm">
      <div>
        <a href="#" class="link link--plain inline gap-xs">
          <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#house"/></svg>
          <span>All courses</span>
        </a>
      </div>
      <h2 class="heading">Fundamentally accessible</h2>
    </div>
  `,
};

/**
 * On a dark band, .color-scheme-dark flips every token inside it.
 */
export const OnADarkBand: Story = {
  render: () => `
    <div class="sb-demo-stage sb-demo-constrained--md">
      <div class="color-scheme-dark p-md" style="background: var(--surface-page, Canvas); color: var(--foreground, CanvasText);">
        <p class="text">Subscribe to the <a href="#" class="link">monthly newsletter</a> or follow the <a href="#" class="link link--subtle">RSS feed</a>.</p>
      </div>
    </div>
  `,
};

/**
 * Stretched: the link's ::after covers its nearest positioned ancestor, so the whole row is the target.
 */
export const Stretched: Story = {
  render: () => `
    <div class="sb-demo-stage sb-demo-constrained--md">
      <article class="p-md" style="position: relative; border: 1px solid var(--border-color-muted, currentColor); border-radius: var(--radius, 0.25rem);">
        <h3 class="small-heading"><a href="#" class="link link--plain link--stretched">Colour contrast beyond 4.5:1</a></h3>
        <p class="small-text">The whole box is the target; only the title is the link's name.</p>
      </article>
    </div>
  `,
};

/**
 * Block link prominence.
 */
export const BlockLinkProminence: Story = {
  render: () => `
    <div class="sb-demo-stage sb-demo-constrained--md stack">
      ${BLOCK_PROMINENCES.map((p) => blockLink(`${p === 'default' ? 'Outline (default)' : p}: view the component showcase`, [p !== 'default' ? `block-link--${p}` : ''])).join('')}
    </div>
  `,
};

/**
 * Block link sizes. --sm keeps a 48px hit area; a compact container steps it to --sm.
 */
export const BlockLinkSizes: Story = {
  render: () => `
    <div class="sb-demo-stage sb-demo-constrained--md stack">
      ${blockLink('Default size')}
      ${blockLink('Small (--sm)', ['block-link--sm'])}
      <div class="ui-compact">${blockLink('Compact container')}</div>
      <div style="--block-link-prominence: subtle; --block-link-size: sm;" class="stack">
        <span class="sb-demo-tag">--block-link-prominence: subtle; --block-link-size: sm</span>
        ${blockLink('WCAG 2.2 guidelines')}
        ${blockLink('Design tokens')}
      </div>
    </div>
  `,
};

/**
 * The arrow points and nudges toward the inline end in either direction.
 */
export const BlockLinkDirection: Story = {
  render: () => `
    <div class="sb-demo-stage sb-demo-constrained--md stack">
      <div dir="ltr">${blockLink('Read the full article')}</div>
      <div dir="rtl">${blockLink('اقرأ المقال كاملاً')}</div>
    </div>
  `,
};
