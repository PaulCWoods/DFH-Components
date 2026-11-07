import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Molecules/Batch Actions',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
The bar shown while items are selected: how many, the actions on them, and a way to clear the selection. A placement and a frame around a summary and a button group.

### Markup
\`\`\`html
<div class="batch-actions" role="group" aria-label="Selected files" hidden>
  <p class="batch-actions__summary small-heading">3 selected</p>
  <hr class="divider" aria-hidden="true">
  <div class="batch-actions__actions button-group buttons-subtle">
    <button type="button" class="button"><span>Export</span></button>
    <button type="button" class="button button--danger"><span>Delete</span></button>
  </div>
  <hr class="divider" aria-hidden="true">
  <button type="button" class="button button--plain button--icon batch-actions__dismiss">
    <svg class="icon" …><use href="#Close"/></svg>
    <span class="sr-only">Clear selection</span>
  </button>
</div>
\`\`\`

- **A group, not a toolbar:** \`role="toolbar"\` promises arrow keys, and the library ships no script.
- **Summary** is text. Announce the count from an empty \`role="status"\` element outside the bar, which a hidden bar can't do for itself. Toggle \`hidden\`; it fades and slides away.
- **Placement:** floating (default, fixed at the bottom centre), \`--docked\`, \`--inline\`. **Prominence:** default, \`--strong\` (inverted), \`--plain\`. Also \`--round\`, \`--compact\` and \`--scrollable\` (one row: the actions scroll with a fade between a fixed summary and dismiss button).

The floating stories sit in a stage with a transform, so the fixed bar stays inside it.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const icon = (name: string) =>
  `<svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#${name}"/></svg>`;

const actions = (cls = 'buttons-subtle', more = false) => `
  <div class="batch-actions__actions button-group ${cls}">
    <button type="button" class="button">${icon('Download')}<span>Export</span></button>
    <button type="button" class="button">${icon('Edit')}<span>Edit</span></button>${more ? `
    <button type="button" class="button">${icon('Duplicate')}<span>Duplicate</span></button>
    <button type="button" class="button">${icon('Share')}<span>Share</span></button>
    <button type="button" class="button">${icon('Print')}<span>Print</span></button>` : ''}
    <button type="button" class="button button--danger">${icon('Delete')}<span>Delete</span></button>
  </div>`;

const dismiss = `
  <button type="button" class="button button--plain button--icon batch-actions__dismiss">
    ${icon('Close')}<span class="sr-only">Clear selection</span>
  </button>`;

const bar = (cls: string, label: string, count = '3 selected', attrs = '', more = false) => `
  <div class="batch-actions${cls ? ` ${cls}` : ''}" role="group" aria-label="${label}"${attrs}>
    <p class="batch-actions__summary small-heading">${count}</p>
    <hr class="divider" aria-hidden="true">
    ${actions('buttons-subtle', more)}
    <hr class="divider" aria-hidden="true">
    ${dismiss}
  </div>`;

/* A transform makes the stage the containing block of the fixed bar */
const stage = (inner: string, note: string) => `
  <div style="transform: translate(0); min-block-size: 14rem; border: 1px dashed currentColor; padding: 1.5rem;">
    <p class="small-text">${note}</p>
    ${inner}
  </div>`;

export const Playground: Story = {
  args: { prominence: 'default', round: false, compact: false, scrollable: false },
  argTypes: {
    prominence: { control: 'inline-radio', options: ['default', 'strong', 'plain'] },
  },
  render: (args) => {
    const cls = [args.prominence !== 'default' && `batch-actions--${args.prominence}`,
      args.round && 'batch-actions--round',
      args.compact && 'batch-actions--compact',
      args.scrollable && 'batch-actions--scrollable'].filter(Boolean).join(' ');
    return stage(bar(cls, 'Selected files', '3 selected', '', args.scrollable), 'Floating: fixed at the bottom centre.');
  },
};

export const Selection: Story = {
  render: () => {
    const files = ['Brief.pdf', 'Moodboard.fig', 'Notes.md', 'Budget.xlsx'];
    const update = `const s=this.closest('[data-demo]');const n=s.querySelectorAll('input:checked').length;const b=s.querySelector('.batch-actions');b.hidden=n===0;if(n)b.querySelector('[role=status]').textContent=n+' selected';`;
    const clear = `const s=this.closest('[data-demo]');s.querySelectorAll('input:checked').forEach(c=>c.checked=false);s.querySelector('.batch-actions').hidden=true;s.querySelector('input').focus();`;
    return `
      <div data-demo style="transform: translate(0); min-block-size: 20rem; padding: 1.5rem;">
        <fieldset class="fieldset">
          <legend class="fieldset__legend small-heading">Files</legend>
          ${files.map((f) => `<label class="choice"><input type="checkbox" class="checkbox-input" onchange="${update}" /><span>${f}</span></label>`).join('')}
        </fieldset>
        <div class="batch-actions batch-actions--round" role="group" aria-label="Selected files" hidden>
          <p class="batch-actions__summary small-heading">0 selected</p>
          <hr class="divider" aria-hidden="true">
          ${actions()}
          <hr class="divider" aria-hidden="true">
          <button type="button" class="button button--plain button--icon batch-actions__dismiss" onclick="${clear}">
            ${icon('Close')}<span class="sr-only">Clear selection</span>
          </button>
        </div>
      </div>`;
  },
};

export const Prominence: Story = {
  render: () => `
    <div class="stack">
      <h3 class="small-heading">Default</h3>
      ${bar('batch-actions--inline', 'Selected files, default')}
      <h3 class="small-heading">--strong</h3>
      ${bar('batch-actions--inline batch-actions--strong', 'Selected files, strong')}
      <h3 class="small-heading">--plain</h3>
      ${bar('batch-actions--inline batch-actions--plain', 'Selected files, plain')}
      <h3 class="small-heading">--round --compact</h3>
      ${bar('batch-actions--inline batch-actions--round batch-actions--compact', 'Selected files, compact')}
    </div>`,
};

export const Scrollable: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Where space is short, `--scrollable` keeps the bar to one row. The count and the dismiss button stay put; the actions between them scroll, and each edge fades only where there is more to see (scroll-driven animations; without them the actions still scroll). Tab reaches every action and scrolls it into view.',
      },
    },
  },
  render: () => `
    <div class="stack">
      <div style="max-inline-size: 26rem;">
        ${bar('batch-actions--inline batch-actions--scrollable', 'Selected files, scrollable', '12 selected', '', true)}
      </div>
      <div style="max-inline-size: 26rem;" dir="rtl">
        ${bar('batch-actions--inline batch-actions--scrollable batch-actions--round', 'Selected files, scrollable, right to left', '12 selected', '', true)}
      </div>
    </div>`,
};

export const DockedInACard: Story = {
  name: 'Docked in a card',
  render: () => `
    <article class="card" style="max-inline-size: 44rem;">
      <header class="card__header"><h3 class="card__title heading">Crop registry</h3></header>
      <div class="card__body">
        <table class="table table--compact" style="inline-size: 100%;">
          <thead>
            <tr><th scope="col"><span class="sr-only">Selected</span></th><th scope="col">Variety</th><th scope="col">Location</th></tr>
          </thead>
          <tbody>
            <tr><td><label class="choice"><input type="checkbox" class="checkbox-input" aria-label="Select Brandywine" checked /></label></td><td>Brandywine</td><td>Bed A-02</td></tr>
            <tr><td><label class="choice"><input type="checkbox" class="checkbox-input" aria-label="Select Genovese" checked /></label></td><td>Genovese basil</td><td>Greenhouse 1</td></tr>
            <tr><td><label class="choice"><input type="checkbox" class="checkbox-input" aria-label="Select Sungold" /></label></td><td>Sungold</td><td>Bed B-04</td></tr>
          </tbody>
        </table>
      </div>
      <div class="batch-actions batch-actions--docked" role="group" aria-label="Selected crops">
        <p class="batch-actions__summary small-heading">2 selected</p>
        <div class="batch-actions__actions button-group">
          <button type="button" class="button button--strong button--accent"><span>Log harvest</span></button>
          <button type="button" class="button button--danger"><span>Remove</span></button>
        </div>
        <button type="button" class="button button--plain batch-actions__dismiss"><span>Deselect all</span></button>
      </div>
    </article>`,
};

export const RightToLeft: Story = {
  name: 'Right to left',
  render: () => `<div dir="rtl">${bar('batch-actions--inline', 'Selected files, right to left')}</div>`,
};
