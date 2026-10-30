import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Molecules/Tooltip',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
A short line of plain text about a control, shown while the control is hovered or focused. Anything richer, or anything with a link or button in it, is a popover opened with \`interestfor\` (a hovercard).

### Markup
\`\`\`html
<!-- Label: the tooltip repeats the button's name -->
<button type="button" class="button button--icon" interestfor="tip-bold" aria-keyshortcuts="Meta+B">
  <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Bold"/></svg>
  <span class="sr-only">Bold</span>
</button>
<div id="tip-bold" popover="hint" class="tooltip" aria-hidden="true">Bold ⌘B</div>

<!-- Description: extra text about the control -->
<button type="button" class="button" interestfor="tip-publish" aria-describedby="tip-publish"><span>Publish</span></button>
<div id="tip-publish" popover="hint" class="tooltip">Sends the post to all 1,204 subscribers</div>
\`\`\`

- **\`interestfor\` only.** No \`popovertarget\`: a click would close the tooltip and announce the button as a toggle. Tooltips appear in Chromium browsers; elsewhere nothing shows, so a tooltip never holds the only copy of what it says.
- **Label or description.** A tooltip that repeats the control's name takes \`aria-hidden="true"\`, and the name stays in the button. A tooltip that adds information is pointed to with \`aria-describedby\`, so screen readers get it in every browser. No \`role="tooltip"\`.
- **Triggers** are buttons and links: \`interestfor\` does nothing on other elements.
- **WCAG 1.4.13.** The pointer can move onto the tooltip without it closing, and Escape closes it.
- **Placement** (logical, flips when it doesn't fit): above by default, \`--bottom\`, \`--start\`, \`--end\`. Flag: \`--tooltip-placement\`. \`--no-arrow\` drops the arrow.
- **Type** is the small-text step, so it follows \`--font-sizing\`.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const icon = (name: string) =>
  `<svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#${name}"/></svg>`;

/* A label tooltip on an icon button */
const iconTip = (id: string, iconName: string, name: string, tip: string, cls = '', keys = '') => `
  <button type="button" class="button button--icon" interestfor="${id}"${keys ? ` aria-keyshortcuts="${keys}"` : ''}>
    ${icon(iconName)}<span class="sr-only">${name}</span>
  </button>
  <div id="${id}" popover="hint" class="tooltip${cls ? ` ${cls}` : ''}" aria-hidden="true">${tip}</div>`;

/* A description tooltip on a text button */
const textTip = (id: string, label: string, tip: string, cls = '') => `
  <button type="button" class="button" interestfor="${id}" aria-describedby="${id}"><span>${label}</span></button>
  <div id="${id}" popover="hint" class="tooltip${cls ? ` ${cls}` : ''}">${tip}</div>`;

const stage = (inner: string, dir = '') => `
  <div class="cluster"${dir ? ` dir="${dir}"` : ''} style="justify-content: center; align-items: center; gap: var(--spacing-48, 3rem); padding: 4rem 2rem;">
    ${inner}
  </div>`;

export const Playground: Story = {
  args: { kind: 'description', placement: 'default', arrow: true },
  argTypes: {
    kind: { control: 'inline-radio', options: ['label', 'description'] },
    placement: { control: 'inline-radio', options: ['default', 'bottom', 'start', 'end'] },
    arrow: { control: 'boolean' },
  },
  render: (args) => {
    const cls = [args.placement !== 'default' ? `tooltip--${args.placement}` : '', args.arrow ? '' : 'tooltip--no-arrow'].filter(Boolean).join(' ');
    return stage(args.kind === 'label'
      ? iconTip('pg-tip', 'Duplicate', 'Duplicate', 'Duplicate', cls)
      : textTip('pg-tip', 'Publish', 'Sends the post to all 1,204 subscribers', cls));
  },
};

export const LabelAndDescription: Story = {
  name: 'Label and description',
  render: () => `
    <div class="stack" style="max-inline-size: 40rem;">
      <h3 class="small-heading">Label: icon buttons</h3>
      <p class="small-text">The tooltip repeats the name, so it is hidden from screen readers. Shortcuts go in <code>aria-keyshortcuts</code>.</p>
      <div class="cluster" role="group" aria-label="Formatting" style="padding-block: 2.5rem 0;">
        ${iconTip('lb-bold', 'Bold', 'Bold', 'Bold ⌘B', '', 'Meta+B')}
        ${iconTip('lb-italic', 'Italic', 'Italic', 'Italic ⌘I', '', 'Meta+I')}
        ${iconTip('lb-link', 'Link', 'Insert link', 'Insert link ⌘K', '', 'Meta+K')}
      </div>
      <h3 class="small-heading">Description: extra information</h3>
      <p class="small-text">The button points <code>aria-describedby</code> at the tooltip, so the text reaches screen readers in every browser.</p>
      <div class="cluster" style="padding-block: 2.5rem 0;">
        ${textTip('ds-publish', 'Publish', 'Sends the post to all 1,204 subscribers')}
        ${textTip('ds-archive', 'Archive', 'Hidden from readers; you can restore it later')}
      </div>
    </div>`,
};

export const Placements: Story = {
  render: () => {
    const row = (dir: string) => stage(['default', 'bottom', 'start', 'end'].map((p) =>
      textTip(`pl-${dir}-${p}`, p === 'default' ? 'Default' : `--${p}`, p === 'default' ? 'Above, centred' : `.tooltip--${p}`, p === 'default' ? '' : `tooltip--${p}`)).join(''), dir);
    return `
      <div class="stack">
        <h3 class="small-heading">Left to right</h3>
        ${row('ltr')}
        <h3 class="small-heading">Right to left</h3>
        ${row('rtl')}
        <h3 class="small-heading">Set by a container</h3>
        <div style="--tooltip-placement: bottom;">${stage(textTip('pl-flag', 'Flag', 'A container set --tooltip-placement: bottom'))}</div>
        <h3 class="small-heading">No arrow</h3>
        ${stage(textTip('pl-noarrow', 'No arrow', 'A tooltip without its arrow', 'tooltip--no-arrow'))}
      </div>`;
  },
};

export const InContext: Story = {
  render: () => `
    <div class="stack" style="max-inline-size: 32rem;">
      <article class="card">
        <header class="card__header">
          <h3 class="card__title heading">API token</h3>
        </header>
        <div class="card__body stack">
          <p class="small-text">Tokens grant full access to your workspace. The tooltip adds detail; the text here already says what matters.</p>
          <div class="cluster">
            ${textTip('ctx-rotate', 'Rotate token', 'Issues a new token; the old one stops working in 24 hours')}
            ${iconTip('ctx-copy', 'Copy', 'Copy token', 'Copy token')}
          </div>
        </div>
      </article>
    </div>`,
};
