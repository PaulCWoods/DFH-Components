import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Organisms/Form',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
Fields and fieldsets in order, then the actions. The form owns the space between them, density for everything inside, and the space before its actions.

### Markup
\`\`\`html
<form class="form">
  <div class="field">…</div>
  <fieldset class="fieldset">…</fieldset>
  <div class="form__actions button-group justify-end">
    <button type="submit" class="button button--strong button--accent"><span>Send</span></button>
  </div>
</form>
\`\`\`

- **Actions** are a button group; align them with a \`justify-*\` utility.
- **Options:** \`--compact\` (one switch for the whole form), \`--aligned\` (labels in one column beside their controls once the form is wider than 32rem, each hint beneath its label and each error beneath its control, except a fieldset's, which stays above its controls; below that, labels stack. Source order doesn't change, so screen readers still meet the error before the control).
- **Layouts** come from the layout primitives: fields side by side are a \`.grid\`; a row of fields and a button is a \`.cluster\`.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const icon = (name: string) =>
  `<svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#${name}"/></svg>`;

const registration = (id: string, cls = '', error = false) => `
  <form class="form${cls ? ` ${cls}` : ''}" onsubmit="event.preventDefault();">
    <div class="field">
      <label for="${id}-name" class="field__label label">Full name</label>
      <input id="${id}-name" class="input" autocomplete="name" required />
    </div>
    <div class="field">
      <label for="${id}-email" class="field__label label">Email address</label>
      <p id="${id}-email-hint" class="field__hint small-text">We only use it for plot news.</p>
      ${error ? `<p id="${id}-email-error" class="field__error small-text">${icon('Warning')}Enter an email address in the correct format, like name@example.com</p>` : ''}
      <input id="${id}-email" type="email" class="input" autocomplete="email" required aria-describedby="${id}-email-hint${error ? ` ${id}-email-error" aria-invalid="true" value="sam@` : ''}" />
    </div>
    <div class="field">
      <label for="${id}-phone" class="field__label label">Phone <span class="text-muted">(optional)</span></label>
      <input id="${id}-phone" type="tel" class="input" autocomplete="tel" />
    </div>
    <fieldset class="fieldset">
      <legend class="fieldset__legend label">Plot size</legend>
      <div class="choices">
        <label class="choice"><input type="radio" class="radio-input" name="${id}-size" value="half" checked /><span>Half plot</span></label>
        <label class="choice"><input type="radio" class="radio-input" name="${id}-size" value="full" /><span>Full plot</span></label>
      </div>
    </fieldset>
    <div class="form__actions button-group">
      <button type="submit" class="button button--strong button--accent"><span>Register</span></button>
      <button type="reset" class="button button--subtle"><span>Clear</span></button>
    </div>
  </form>`;

export const Playground: Story = {
  args: { compact: false, aligned: false, error: false },
  render: (args) => `
    <div style="max-inline-size: ${args.aligned ? '40rem' : '28rem'};">
      ${registration('playground', [args.compact && 'form--compact', args.aligned && 'form--aligned'].filter(Boolean).join(' '), args.error)}
    </div>`,
};

export const Aligned: Story = {
  render: () => `
    <div class="stack">
      <div style="max-inline-size: 40rem;">${registration('aligned', 'form--aligned', true)}</div>
      <p class="small-text text-muted">Below 32rem, the labels stack:</p>
      <div class="max-w-sm">${registration('aligned-narrow', 'form--aligned')}</div>
    </div>`,
};

export const Compact: Story = {
  render: () => `<div class="max-w-sm">${registration('compact', 'form--compact')}</div>`,
};

export const FieldsInAGrid: Story = {
  name: 'Fields in a grid',
  render: () => `
    <form class="form" style="max-inline-size: 40rem;" onsubmit="event.preventDefault();">
      <div class="grid grid--xs">
        <div class="field">
          <label for="grid-first" class="field__label label">First name</label>
          <input id="grid-first" class="input" autocomplete="given-name" />
        </div>
        <div class="field">
          <label for="grid-last" class="field__label label">Last name</label>
          <input id="grid-last" class="input" autocomplete="family-name" />
        </div>
      </div>
      <div class="field">
        <label for="grid-street" class="field__label label">Street</label>
        <input id="grid-street" class="input" autocomplete="address-line1" />
      </div>
      <div class="form__actions button-group justify-end">
        <button type="submit" class="button button--strong button--accent"><span>Save address</span></button>
      </div>
    </form>`,
};

export const InlineForm: Story = {
  name: 'Inline (a cluster)',
  render: () => `
    <form class="cluster" role="search" onsubmit="event.preventDefault();">
      <div class="field field--inline">
        <label for="inline-search" class="field__label label">Find a plot</label>
        <input id="inline-search" type="search" class="input" style="inline-size: 12rem;" />
      </div>
      <button type="submit" class="button button--subtle"><span>Search</span></button>
    </form>`,
};

export const RightToLeft: Story = {
  name: 'Right to left',
  render: () => `<div dir="rtl" style="max-inline-size: 40rem;">${registration('rtl', 'form--aligned')}</div>`,
};
