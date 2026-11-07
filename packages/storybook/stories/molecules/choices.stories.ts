import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Molecules/Choices',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
A list of checkbox or radio labels. Each \`.choice\` is a \`<label>\` holding the box and its text, and the whole row is the target. The question goes in a fieldset legend.

### Markup
\`\`\`html
<fieldset class="fieldset">
  <legend class="fieldset__legend label">Notifications</legend>
  <div class="choices">
    <label class="choice">
      <input type="checkbox" class="checkbox-input" name="notify" value="email" />
      <span class="choice__label">
        Email
        <span class="small-text text-muted">A weekly digest</span>
      </span>
    </label>
  </div>
</fieldset>
\`\`\`

- **Rows** are at least 48px tall (32px when the product opts into fine-pointer targets) and only as wide as their text. The box sits centred on the first line.
- **Size** follows the box: \`checkbox-input--lg\` / \`radio-input--lg\`, or the \`--check-size: lg\` flag, widens the gap beside it. The text matches the text controls beside it (\`--choice-font-size\`).
- **Descriptions:** \`.choice__label\` with a \`.small-text\` line.
- **Compact:** in a compact form, fieldset or \`.ui-compact\` region, rows are 32px, the text steps to the small-control size and the box to 16px, to match the fields around them.
- **Options:** \`--inline\` (flag \`--choices-layout: inline\`). A \`<ul class="choices">\` works too; its items step aside.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

type Choice = { label: string; description?: string; checked?: boolean; disabled?: boolean };

const choices = (name: string, items: Choice[], o: { type?: 'checkbox' | 'radio'; cls?: string; lg?: boolean } = {}) => {
  const type = o.type ?? 'checkbox';
  return `<div class="choices${o.cls ? ` ${o.cls}` : ''}">${items.map((c) => `
    <label class="choice">
      <input type="${type}" class="${type}-input${o.lg ? ` ${type}-input--lg` : ''}" name="${name}" value="${c.label.toLowerCase()}"${c.checked ? ' checked' : ''}${c.disabled ? ' disabled' : ''} />
      ${c.description
        ? `<span class="choice__label">${c.label}<span class="small-text text-muted">${c.description}</span></span>`
        : `<span>${c.label}</span>`}
    </label>`).join('')}</div>`;
};

const group = (legend: string, body: string) => `
  <fieldset class="fieldset">
    <legend class="fieldset__legend label">${legend}</legend>
    ${body}
  </fieldset>`;

const crops: Choice[] = [{ label: 'Tomatoes', checked: true }, { label: 'Beans' }, { label: 'Squash' }, { label: 'Herbs' }];

export const Playground: Story = {
  args: { type: 'checkbox', inline: false, large: false, descriptions: false, compact: false },
  argTypes: { type: { control: 'inline-radio', options: ['checkbox', 'radio'] } },
  render: (args) => {
    const items = crops.map((c) => ({ ...c, description: args.descriptions ? `Sown in ${c.label === 'Herbs' ? 'pots' : 'beds'}` : undefined }));
    return `<div class="${args.compact ? 'ui-compact' : ''}" style="max-inline-size: 32rem;">
      ${group('What will you grow?', choices('playground', items, { type: args.type, cls: args.inline ? 'choices--inline' : '', lg: args.large }))}
    </div>`;
  },
};

export const Compact: Story = {
  render: () => `
    <form class="form form--compact" style="max-inline-size: 24rem;" onsubmit="event.preventDefault();">
      <div class="field">
        <label for="compact-name" class="field__label label">Full name</label>
        <input id="compact-name" class="input" autocomplete="name" />
      </div>
      ${group('What will you grow?', choices('compact-crops', crops.map((c) => ({ ...c, description: c.label === 'Tomatoes' ? 'Sown in beds' : undefined }))))}
      ${group('Plot size', choices('compact-size', [{ label: 'Half plot', checked: true }, { label: 'Full plot' }], { type: 'radio', cls: 'choices--inline' }))}
    </form>`,
};

export const Radios: Story = {
  render: () => group('Plot size', choices('plot-size', [{ label: 'Half plot', checked: true }, { label: 'Full plot' }, { label: 'Raised bed' }], { type: 'radio' })),
};

export const WithDescriptions: Story = {
  name: 'With descriptions',
  render: () => `<div style="max-inline-size: 28rem;">${group('Notifications', choices('notify', [
    { label: 'Email', description: 'A weekly digest of plot news', checked: true },
    { label: 'Text message', description: 'Only when a frost warning is issued' },
    { label: 'Push', description: 'Unavailable in this browser', disabled: true },
  ]))}</div>`,
};

export const Inline: Story = {
  render: () => group('Watering days', choices('days', ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d, i) => ({ label: d, checked: i % 3 === 0 })), { cls: 'choices--inline' })),
};

export const Large: Story = {
  name: 'Large boxes',
  render: () => group('Plot size', choices('plot-size-lg', [{ label: 'Half plot', checked: true }, { label: 'Full plot' }], { type: 'radio', lg: true })),
};

export const AsAList: Story = {
  name: 'As a list',
  render: () => `
    <fieldset class="fieldset">
      <legend class="fieldset__legend label">Tools to borrow</legend>
      <ul class="choices">
        <li><label class="choice"><input type="checkbox" class="checkbox-input" name="tools" value="spade" /><span>Spade</span></label></li>
        <li><label class="choice"><input type="checkbox" class="checkbox-input" name="tools" value="hoe" /><span>Hoe</span></label></li>
        <li><label class="choice"><input type="checkbox" class="checkbox-input" name="tools" value="wheelbarrow" /><span>Wheelbarrow</span></label></li>
      </ul>
    </fieldset>`,
};

export const Invalid: Story = {
  render: () => `
    <fieldset class="fieldset" aria-describedby="terms-error">
      <legend class="fieldset__legend label">Plot agreement</legend>
      <p id="terms-error" class="field__error small-text"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Warning"/></svg>Agree to the plot terms to continue</p>
      <div class="choices">
        <label class="choice"><input type="checkbox" class="checkbox-input" name="terms" aria-invalid="true" /><span>I agree to the plot terms</span></label>
      </div>
    </fieldset>`,
};

export const LongLabels: Story = {
  name: 'Long labels wrap',
  render: () => `<div style="max-inline-size: 18rem;">${group('Consent', choices('consent', [
    { label: 'I agree that my name and plot number can appear on the shared rota in the shed' },
    { label: 'Send me the newsletter' },
  ]))}</div>`,
};

export const RightToLeft: Story = {
  name: 'Right to left',
  render: () => `<div dir="rtl" style="max-inline-size: 28rem;">${group('What will you grow?', choices('rtl', crops))}</div>`,
};
