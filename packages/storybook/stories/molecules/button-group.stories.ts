import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Molecules/Button Group',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# Button Group

A set of related buttons laid out together: a row by default, or a column. The group lays the buttons out; they keep their own look. It has no alignment options: a \`justify-*\` utility on the group, or the layout around it, decides where the buttons sit. Rows of actions with headings and shortcuts are a menu.

### Markup
\`\`\`html
<div class="button-group">
  <button type="button" class="button"><span>Save draft</span></button>
  <button type="button" class="button button--strong button--accent"><span>Publish</span></button>
</div>

<div class="button-group button-group--joined" role="radiogroup" aria-label="Range">
  <label class="button"><input type="radio" name="range" class="visually-hidden" checked><span>Day</span></label>
  <label class="button"><input type="radio" name="range" class="visually-hidden"><span>Week</span></label>
</div>
\`\`\`

- **Options:** \`--joined\` (one control), \`--vertical\` (full-width buttons), \`--fill\` (the buttons share the width), \`--ruled\` (rules between buttons where gap decorations are supported), \`--compact\`. \`__end\` pushes itself and what follows to the end.
- **Button looks** come from the buttons: \`.buttons-strong\`, \`.buttons-subtle\`, \`.buttons-plain\`, \`.buttons-sm\`, \`.buttons-round\` set them for the whole group.
- **Roles.** A group whose buttons share a purpose takes \`role="group"\` and a label; exclusive choices are radios in a \`role="radiogroup"\`. Not \`role="toolbar"\`, which promises arrow keys.
- **Joined** keeps every border; the hovered, selected or focused button rises so its border and focus ring show in full.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const icon = (name: string) =>
  `<svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#${name}"/></svg>`;

const radios = (name: string, labels: string[]) =>
  labels.map((l, i) => `<label class="button"><input type="radio" name="${name}" value="${l.toLowerCase()}" class="visually-hidden"${i === 0 ? ' checked' : ''} /><span>${l}</span></label>`).join('');

export const Playground: Story = {
  args: { joined: false, vertical: false, fill: false, ruled: false, compact: false, prominence: 'default', round: false },
  argTypes: {
    prominence: { control: 'inline-radio', options: ['default', 'strong', 'subtle', 'plain'] },
  },
  render: (args) => {
    const cls = ['button-group',
      args.joined && 'button-group--joined',
      args.vertical && 'button-group--vertical',
      args.fill && 'button-group--fill',
      args.ruled && 'button-group--ruled',
      args.compact && 'button-group--compact',
      args.prominence !== 'default' && `buttons-${args.prominence}`,
      args.round && 'buttons-round'].filter(Boolean).join(' ');
    return `
      <div style="max-inline-size: 32rem;">
        <div class="${cls}" role="group" aria-label="Document">
          <button type="button" class="button">${icon('Duplicate')}<span>Duplicate</span></button>
          <button type="button" class="button">${icon('Download')}<span>Export</span></button>
          <button type="button" class="button">${icon('Share')}<span>Share</span></button>
        </div>
      </div>`;
  },
};

export const Joined: Story = {
  render: () => `
    <div class="stack">
      <h3 class="small-heading">Exclusive choice: radios</h3>
      <div class="button-group button-group--joined" role="radiogroup" aria-label="Range">${radios('range', ['Day', 'Week', 'Month', 'Year'])}</div>

      <h3 class="small-heading">Toggles: aria-pressed</h3>
      <div class="button-group button-group--joined" role="group" aria-label="Text style">
        <button type="button" class="button button--icon" aria-pressed="true">${icon('Bold')}<span class="visually-hidden">Bold</span></button>
        <button type="button" class="button button--icon" aria-pressed="false">${icon('Italic')}<span class="visually-hidden">Italic</span></button>
        <button type="button" class="button button--icon" aria-pressed="false">${icon('Link')}<span class="visually-hidden">Link</span></button>
      </div>

      <h3 class="small-heading">Subtle, round and compact</h3>
      <div class="cluster">
        <div class="button-group button-group--joined buttons-subtle" role="radiogroup" aria-label="View">${radios('view-subtle', ['Grid', 'List', 'Board'])}</div>
        <div class="button-group button-group--joined buttons-round" role="radiogroup" aria-label="Layout">${radios('view-round', ['Grid', 'List', 'Board'])}</div>
        <div class="button-group button-group--joined button-group--compact" role="radiogroup" aria-label="Density">${radios('view-compact', ['Grid', 'List', 'Board'])}</div>
      </div>

      <h3 class="small-heading">Vertical</h3>
      <div class="button-group button-group--joined button-group--vertical" role="radiogroup" aria-label="Plan" style="max-inline-size: 16rem;">${radios('plan', ['Monthly', 'Yearly', 'Lifetime'])}</div>

      <h3 class="small-heading">Right to left</h3>
      <div dir="rtl" class="button-group button-group--joined buttons-round" role="radiogroup" aria-label="Range, right to left">${radios('range-rtl', ['Day', 'Week', 'Month'])}</div>
    </div>`,
};

export const Layout: Story = {
  render: () => `
    <div class="stack" style="max-inline-size: 36rem;">
      <h3 class="small-heading">Vertical: full-width buttons, content centred</h3>
      <div class="button-group button-group--vertical" style="max-inline-size: 20rem;">
        <button type="button" class="button button--strong button--accent">${icon('Email')}<span>Continue with email</span></button>
        <button type="button" class="button">${icon('Lock')}<span>Continue with a passkey</span></button>
        <button type="button" class="button button--plain"><span>Other options</span></button>
      </div>

      <h3 class="small-heading">Fill: the buttons share the width</h3>
      <div class="button-group button-group--fill">
        <button type="button" class="button"><span>Cancel</span></button>
        <button type="button" class="button button--strong button--accent"><span>Submit</span></button>
      </div>

      <h3 class="small-heading">End part and text</h3>
      <div class="button-group">
        <button type="button" class="button"><span>Back</span></button>
        <span class="small-text">Step 3 of 4</span>
        <button type="button" class="button button--strong button--accent button-group__end"><span>Next</span></button>
      </div>

      <h3 class="small-heading">Aligned with a utility</h3>
      <div class="button-group justify-end">
        <button type="button" class="button button--subtle"><span>Cancel</span></button>
        <button type="button" class="button button--strong button--accent"><span>Save</span></button>
      </div>

      <h3 class="small-heading">Ruled, with a divider</h3>
      <div class="button-group button-group--ruled buttons-plain" role="group" aria-label="Edit">
        <button type="button" class="button"><span>Cut</span></button>
        <button type="button" class="button"><span>Copy</span></button>
        <button type="button" class="button"><span>Paste</span></button>
      </div>
      <div class="button-group buttons-subtle" role="group" aria-label="File">
        <button type="button" class="button"><span>Edit</span></button>
        <button type="button" class="button"><span>Share</span></button>
        <hr class="divider" aria-orientation="vertical">
        <button type="button" class="button button--danger">${icon('Delete')}<span>Delete</span></button>
      </div>
    </div>`,
};

export const Density: Story = {
  render: () => `
    <div class="stack">
      <h3 class="small-heading">Default: 48px targets</h3>
      <div class="button-group">
        <button type="button" class="button"><span>Review</span></button>
        <button type="button" class="button button--strong button--accent"><span>Approve</span></button>
      </div>
      <h3 class="small-heading">--compact: smaller buttons and gaps</h3>
      <div class="button-group button-group--compact">
        <button type="button" class="button"><span>Review</span></button>
        <button type="button" class="button button--strong button--accent"><span>Approve</span></button>
      </div>
      <h3 class="small-heading">Inside a .ui-compact region</h3>
      <div class="ui-compact">
        <div class="button-group">
          <button type="button" class="button"><span>Review</span></button>
          <button type="button" class="button button--strong button--accent"><span>Approve</span></button>
        </div>
      </div>
    </div>`,
};
