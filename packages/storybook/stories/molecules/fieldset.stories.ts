import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Molecules/Fieldset',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
Controls that answer one question (an address, a set of choices) under a legend. The fieldset spaces its children; type comes from text atoms on the legend and hint.

### Markup
\`\`\`html
<fieldset class="fieldset" aria-describedby="contact-hint">
  <legend class="fieldset__legend label">How should we contact you?</legend>
  <p id="contact-hint" class="fieldset__hint small-text">Choose all that apply.</p>
  <div class="choices">…</div>
</fieldset>
\`\`\`

- **Hint:** link it with \`aria-describedby\` on the fieldset.
- **Options:** \`--compact\`. A disabled fieldset dims everything in it.
- **A boxed group** is a fieldset inside a \`.card\`.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const choice = (name: string, value: string, type = 'checkbox', checked = false) => `
  <label class="choice">
    <input type="${type}" class="${type}-input" name="${name}" value="${value.toLowerCase()}"${checked ? ' checked' : ''} />
    <span>${value}</span>
  </label>`;

const contact = (id: string, cls = '', attrs = '') => `
  <fieldset class="fieldset${cls ? ` ${cls}` : ''}" aria-describedby="${id}-hint"${attrs}>
    <legend class="fieldset__legend label">How should we contact you?</legend>
    <p id="${id}-hint" class="fieldset__hint small-text">Choose all that apply.</p>
    <div class="choices">
      ${choice(`${id}-contact`, 'Email', 'checkbox', true)}
      ${choice(`${id}-contact`, 'Text message')}
      ${choice(`${id}-contact`, 'Phone')}
    </div>
  </fieldset>`;

const address = (id: string, cls = '') => `
  <fieldset class="fieldset${cls ? ` ${cls}` : ''}">
    <legend class="fieldset__legend label">Address</legend>
    <div class="field">
      <label for="${id}-line1" class="field__label label">Street</label>
      <input id="${id}-line1" class="input" autocomplete="address-line1" />
    </div>
    <div class="field">
      <label for="${id}-town" class="field__label label">Town or city</label>
      <input id="${id}-town" class="input" autocomplete="address-level2" />
    </div>
    <div class="field">
      <label for="${id}-postcode" class="field__label label">Postcode</label>
      <input id="${id}-postcode" class="input" autocomplete="postal-code" style="inline-size: 10rem;" />
    </div>
  </fieldset>`;

export const Playground: Story = {
  args: { compact: false, disabled: false },
  render: (args) => `
    <div style="max-inline-size: 28rem;">
      ${contact('playground', args.compact ? 'fieldset--compact' : '', args.disabled ? ' disabled' : '')}
    </div>`,
};

export const OfFields: Story = {
  name: 'Of fields',
  render: () => `<div style="max-inline-size: 28rem;">${address('address')}</div>`,
};

export const InACard: Story = {
  name: 'In a card',
  render: () => `
    <div class="card" style="max-inline-size: 28rem;">
      <div class="card__body">${contact('card')}</div>
    </div>`,
};

export const Compact: Story = {
  render: () => `<div style="max-inline-size: 24rem;">${address('compact', 'fieldset--compact')}</div>`,
};

export const Disabled: Story = {
  render: () => `<div style="max-inline-size: 28rem;">${contact('disabled', '', ' disabled')}</div>`,
};

export const RightToLeft: Story = {
  name: 'Right to left',
  render: () => `<div dir="rtl" style="max-inline-size: 28rem;">${contact('rtl')}</div>`,
};
