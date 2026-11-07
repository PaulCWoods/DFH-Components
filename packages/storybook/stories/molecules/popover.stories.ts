import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Molecules/Popover',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
A layer anchored to the control that opens it. It holds a card or a menu and draws no surface, padding or type of its own. A short line of text about a control is a tooltip instead.

### Markup
\`\`\`html
<button type="button" class="button" popovertarget="doc-actions">
  <span>Actions</span>
  <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#ChevronDown"/></svg>
</button>

<div id="doc-actions" popover class="popover">
  <div class="card">…</div>
</div>
\`\`\`

- **Opening.** \`popovertarget\` opens it on click; \`interestfor\` opens it on hover and focus, as a hovercard (Chromium only, so a hovercard never holds the only way to reach something). Escape and a click outside close it.
- **Anchoring is automatic.** The invoker is the anchor; no \`anchor-name\` or \`position-anchor\`. A popover opened by script passes its anchor: \`showPopover({ source: button })\`. Without anchor positioning, it opens centred.
- **Placement** (logical, flips when it doesn't fit): below and aligned to the start edge by default, \`--top\`, \`--end-aligned\`, \`--start\`, \`--end\`. Flag: \`--popover-placement\`.
- **Width** is the content's: at least the invoker's, at most \`--popover-max-width\` (24rem). Set the flag where a popover needs more.
- **Height:** a tall card shrinks to the screen; give it \`.card__body--scrollable\` (focusable and named, as on any card) so its body scrolls.
- **Roles.** The popover takes no role, and its invoker no \`aria-haspopup\`. A popover holding a form or several controls under a title may take \`role="dialog"\` with \`aria-labelledby\`; its invoker then says \`aria-haspopup="dialog"\`.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const icon = (name: string) =>
  `<svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#${name}"/></svg>`;

const trigger = (id: string, label: string, extra = '') =>
  `<button type="button" class="button" popovertarget="${id}"${extra}><span>${label}</span>${icon('ChevronDown')}</button>`;

const noteCard = (title: string, text: string) => `
  <article class="card">
    <header class="card__header"><h3 class="card__title heading">${title}</h3></header>
    <div class="card__body"><p class="small-text">${text}</p></div>
  </article>`;

const actionsCard = (id: string) => `
  <article class="card card--compact card--ruled">
    <header class="card__header"><h3 class="card__title heading">Document</h3></header>
    <div class="card__body stack" style="--button-prominence: subtle;">
      <button type="button" class="button">${icon('Duplicate')}<span>Duplicate</span></button>
      <button type="button" class="button">${icon('Download')}<span>Export JSON</span></button>
      <button type="button" class="button button--danger">${icon('Delete')}<span>Delete</span></button>
    </div>
    <footer class="card__footer">
      <button type="button" class="button button--subtle button--sm" popovertarget="${id}" popovertargetaction="hide"><span>Close</span></button>
    </footer>
  </article>`;

/* Room around the trigger so every placement has space */
const stage = (inner: string) => `
  <div class="cluster" style="justify-content: center; align-items: center; min-block-size: 22rem; padding: 6rem 2rem;">
    ${inner}
  </div>`;

export const Playground: Story = {
  args: { placement: 'default', opener: 'click' },
  argTypes: {
    placement: { control: 'inline-radio', options: ['default', 'top', 'end-aligned', 'start', 'end'] },
    opener: { control: 'inline-radio', options: ['click', 'hover'] },
  },
  render: (args) => {
    const cls = ['popover', args.placement !== 'default' ? `popover--${args.placement}` : ''].filter(Boolean).join(' ');
    const attr = args.opener === 'hover' ? 'interestfor="pg-popover"' : 'popovertarget="pg-popover"';
    return stage(`
      <button type="button" class="button button--strong button--accent" ${attr}><span>${args.opener === 'hover' ? 'Hover or focus me' : 'Open popover'}</span></button>
      <div id="pg-popover" popover class="${cls}">
        ${noteCard('Document options', 'Manage configuration and deployment for this artifact.')}
      </div>`);
  },
};

export const Placements: Story = {
  render: () => {
    const row = (dir: string) => ['default', 'top', 'end-aligned', 'start', 'end'].map((p) => {
      const id = `pl-${dir}-${p}`;
      const cls = p === 'default' ? 'popover' : `popover popover--${p}`;
      return `${trigger(id, p === 'default' ? 'Default' : `--${p}`)}
        <div id="${id}" popover class="${cls}">${noteCard(p === 'default' ? 'Default' : `.popover--${p}`, dir === 'rtl' ? 'In right-to-left text, start is the right edge.' : 'Flips when it doesn\'t fit.')}</div>`;
    }).join('');
    return `
      <div class="stack">
        <h3 class="small-heading">Left to right</h3>
        <div class="cluster" style="padding-block: 9rem; justify-content: center;">${row('ltr')}</div>
        <h3 class="small-heading">Right to left</h3>
        <div class="cluster" dir="rtl" style="padding-block: 9rem; justify-content: center;">${row('rtl')}</div>
      </div>`;
  },
};

export const Content: Story = {
  render: () => stage(`
    ${trigger('ct-actions', 'Actions')}
    <div id="ct-actions" popover class="popover">${actionsCard('ct-actions')}</div>

    <button type="button" class="button" popovertarget="ct-settings" aria-haspopup="dialog">${icon('Settings')}<span>Settings</span></button>
    <div id="ct-settings" popover class="popover" role="dialog" aria-labelledby="ct-settings-title">
      <article class="card card--compact card--ruled">
        <header class="card__header"><h3 class="card__title heading" id="ct-settings-title">Preferences</h3></header>
        <div class="card__body stack">
          <div class="switch">
            <label for="pop-contrast" class="switch__label label">High contrast</label>
            <span class="switch__control">
              <input type="checkbox" role="switch" id="pop-contrast" />
              <span class="switch__option switch__option--off" aria-hidden="true">Off</span>
              <span class="switch__option switch__option--on" aria-hidden="true">On</span>
            </span>
          </div>
          <label class="choice"><input type="checkbox" class="checkbox-input" checked /><span>Reduce motion</span></label>
        </div>
        <footer class="card__footer">
          <button type="button" class="button button--strong button--accent button--sm" popovertarget="ct-settings" popovertargetaction="hide"><span>Done</span></button>
        </footer>
      </article>
    </div>
  `),
};

export const Hovercard: Story = {
  render: () => `
    <div style="padding-block: 2rem 16rem; max-inline-size: 36rem;">
      <p class="text">
        Reviewed by <a class="link" href="#jordan" interestfor="hc-jordan">Jordan Lee</a>.
        Hover the name, or focus it, to see the hovercard. Clicking follows the link.
      </p>
      <div id="hc-jordan" popover class="popover">
        <article class="card">
          <header class="card__header">
            <hgroup class="card__hgroup">
              <h3 class="card__title heading">Jordan Lee</h3>
              <p class="card__subtitle small-text">Accessibility lead</p>
            </hgroup>
          </header>
          <div class="card__body"><p class="small-text">Audits the design system against WCAG 2.2 AA and AAA.</p></div>
          <footer class="card__footer"><a class="link" href="#jordan">View profile</a></footer>
        </article>
      </div>
    </div>`,
};

export const Width: Story = {
  render: () => stage(`
    ${trigger('w-short', 'Short content')}
    <div id="w-short" popover class="popover">
      <div class="card card--compact"><div class="card__body"><p class="small-text">At least as wide as the button.</p></div></div>
    </div>

    ${trigger('w-long', 'Long content')}
    <div id="w-long" popover class="popover">${noteCard('Capped', 'Long content wraps at --popover-max-width, 24rem by default, so lines stay a readable length however much text the card holds.')}</div>

    ${trigger('w-wide', 'Raised with the flag')}
    <div id="w-wide" popover class="popover" style="--popover-max-width: 36rem;">${noteCard('Wider', 'This popover sets --popover-max-width: 36rem, for content such as a table or a wide form that needs the room.')}</div>
  `),
};

export const PlacementFlag: Story = {
  name: 'Placement flag',
  render: () => stage(`
    <div class="cluster" style="--popover-placement: end-aligned;">
      ${trigger('pf-region', 'From the region')}
      <div id="pf-region" popover class="popover">${noteCard('Flag', 'Placed by --popover-placement on the region.')}</div>

      ${trigger('pf-modifier', 'Modifier wins')}
      <div id="pf-modifier" popover class="popover popover--top">${noteCard('Modifier', 'A modifier on the popover beats the flag.')}</div>
    </div>
  `),
};

export const Scrolling: Story = {
  render: () => stage(`
    ${trigger('sc-long', 'Release notes')}
    <div id="sc-long" popover class="popover">
      <article class="card card--ruled">
        <header class="card__header"><h3 class="card__title heading">Release notes</h3></header>
        <div class="card__body card__body--scrollable stack" tabindex="0" aria-label="Release notes">
          ${Array.from({ length: 14 }, (_, i) => `<p class="small-text">Change ${i + 1}: tokens, anchoring and transitions updated.</p>`).join('')}
        </div>
        <footer class="card__footer">
          <button type="button" class="button button--sm" popovertarget="sc-long" popovertargetaction="hide"><span>Close</span></button>
        </footer>
      </article>
    </div>
  `),
};
