import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Molecules/Banner Dock',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
Pins a banner to the page edge: site announcements, maintenance notices, consent bars. The dock is placement only. It squares the banner's corners and drops its edge borders through the \`--banner-dock\` flag, and never styles the banner directly.

### Markup
\`\`\`html
<aside class="banner-dock banner-dock--sticky" aria-label="Site notice">
  <div class="wrapper">
    <div class="banner banner--warning">
      <span class="icon-box" aria-hidden="true"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#triangle-exclamation-point"/></svg></span>
      <div class="banner__body"><p class="text">Maintenance on Sunday from 02:00 to 04:00 UTC.</p></div>
      <button type="button" class="button button--icon banner__action">
        <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#x"/></svg>
        <span class="sr-only">Dismiss notice</span>
      </button>
    </div>
  </div>
</aside>
\`\`\`

| Placement | Behaviour |
| :--- | :--- |
| (none) | In flow at the top of the page |
| \`--sticky\` | Sticks to the top on scroll |
| \`--fixed-top\`, \`--fixed-bottom\` | Pinned to the viewport edge |
| \`--floating\` | Inset from the edge; the banner keeps its frame. Combine with a placement. |

- A dock is an \`<aside>\` with a label. It is not an alert: \`role="alert"\` belongs on a region that is in the page before an urgent message arrives.
- Dismiss by setting \`hidden\` on the dock; it slides off its edge, or fades without sliding with reduced motion.
- The demos below draw each dock inside a frame (\`contain: layout\`) so fixed placements stay in the frame.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const icon = (name: string) =>
  `<svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#${name}"/></svg>`;

const iconBox = (name: string) => `<span class="icon-box" aria-hidden="true">${icon(name)}</span>`;

const dismiss = `
  <button type="button" class="button button--icon banner__action" onclick="this.closest('.banner-dock').hidden = true">
    ${icon('x')}
    <span class="sr-only">Dismiss notice</span>
  </button>`;

const page = `
  <div class="stack" style="padding: var(--spacing-breathe);">
    ${Array.from({ length: 6 }, () => '<p class="text text-muted">Page content scrolls beneath the dock.</p>').join('')}
  </div>`;

const frame = (inner: string, label: string) => `
  <div class="stack">
    <h3 class="small-heading">${label}</h3>
    <div tabindex="0" aria-label="${label} demo" style="contain: layout; block-size: 14rem; overflow: auto; border: 1px solid var(--panel-border-color, currentColor);">
      ${inner}
    </div>
  </div>`;

export const Playground: Story = {
  args: { placement: 'sticky', floating: false, intent: 'warning' },
  argTypes: {
    placement: { control: 'inline-radio', options: ['none', 'sticky', 'fixed-top', 'fixed-bottom'] },
    floating: { control: 'boolean' },
    intent: { control: 'select', options: ['info', 'success', 'warning', 'danger'] },
  },
  render: (args) => {
    const classes = [
      'banner-dock',
      args.placement !== 'none' ? `banner-dock--${args.placement}` : '',
      args.floating ? 'banner-dock--floating' : '',
    ].filter(Boolean).join(' ');
    const iconName = { info: 'info', success: 'check', warning: 'triangle-exclamation-point', danger: 'circle-exclamation-point' }[args.intent as string];
    const dock = `
      <aside class="${classes}" aria-label="Site notice">
        <div class="banner banner--${args.intent}">
          ${iconBox(iconName as string)}
          <div class="banner__body"><p class="text">Services will be offline on Sunday from 02:00 to 04:00 UTC.</p></div>
          ${dismiss}
        </div>
      </aside>`;
    return frame(args.placement === 'fixed-bottom' ? page + dock : dock + page, 'Dock');
  },
};

export const Placements: Story = {
  render: () => `
    <div class="stack max-w-lg">
      ${frame(`
        <aside class="banner-dock" aria-label="Release notice">
          <div class="banner banner--info">${iconBox('info')}<div class="banner__body"><p class="text">In flow: scrolls away with the page.</p></div>${dismiss}</div>
        </aside>${page}`, 'In flow (.banner-dock)')}
      ${frame(`
        <aside class="banner-dock banner-dock--sticky" aria-label="Maintenance notice">
          <div class="banner banner--warning">${iconBox('triangle-exclamation-point')}<div class="banner__body"><p class="text">Sticky: stays at the top on scroll.</p></div>${dismiss}</div>
        </aside>${page}`, '.banner-dock--sticky')}
      ${frame(`${page}
        <aside class="banner-dock banner-dock--fixed-bottom" aria-label="Cookie preferences">
          <div class="wrapper">
            <div class="banner">
              <div class="banner__body">
                <p class="text">We use cookies to keep the site working.</p>
                <div class="cluster">
                  <button type="button" class="button"><span>Manage</span></button>
                  <button type="button" class="button button--strong button--accent" onclick="this.closest('.banner-dock').hidden = true"><span>Accept</span></button>
                </div>
              </div>
            </div>
          </div>
        </aside>`, '.banner-dock--fixed-bottom with a wrapper')}
      ${frame(`${page}
        <aside class="banner-dock banner-dock--fixed-bottom banner-dock--floating" aria-label="Update available">
          <div class="banner banner--accent banner--round">${iconBox('info')}<div class="banner__body"><p class="text">A new version is available.</p></div>
            <button type="button" class="button button--strong button--accent banner__action">${icon('rotate-ccw')}<span>Reload</span></button>
          </div>
        </aside>`, '.banner-dock--fixed-bottom.banner-dock--floating')}
    </div>
  `,
};

export const Dismissal: Story = {
  render: () => `
    <div class="stack max-w-lg">
      ${frame(`
        <aside class="banner-dock banner-dock--sticky" aria-label="Outage notice" id="dock-dismiss-demo">
          <div class="banner banner--strong banner--danger">${iconBox('circle-exclamation-point')}<div class="banner__body"><p class="text"><strong>Partial outage:</strong> payments are degraded.</p></div>${dismiss}</div>
        </aside>${page}`, 'Dismiss sets hidden')}
      <button type="button" class="button button--sm" onclick="document.getElementById('dock-dismiss-demo').hidden = false"><span>Show again</span></button>
    </div>
  `,
};
