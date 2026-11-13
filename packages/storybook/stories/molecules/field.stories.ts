import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Molecules/Field',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
One control with its label, and optionally a hint, an error and an output. The field orders and spaces the parts; type comes from text atoms on them.

### Markup
\`\`\`html
<div class="field">
  <label for="email" class="field__label label">Email address</label>
  <p id="email-hint" class="field__hint small-text">We only use it to reply.</p>
  <p id="email-error" class="field__error small-text">
    <svg class="icon" …><use href="#triangle-exclamation-point"/></svg>
    Enter an email address in the correct format, like name@example.com
  </p>
  <input id="email" type="email" class="input" aria-describedby="email-hint email-error" aria-invalid="true" />
</div>
\`\`\`

- **Order:** label, hint, error, control. The error comes before the control, so a screen-reader user hears it before reaching the field.
- **Errors** are linked with \`aria-describedby\`, and the control takes \`aria-invalid="true"\`. No role: a script that inserts an error after the page loads may add \`role="alert"\`. The Warning icon means the error is never colour alone.
- **Required and optional** are written in the label, never generated. Mark the fewer case, usually "(optional)".
- **Header:** \`.field__header\` puts the label and an \`<output>\` or a link at either end.
- **Options:** \`--inline\` (the label beside its control). A disabled control dims its label and itself; the hint, error and output stay readable.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const icon = (name: string) =>
  `<svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#${name}"/></svg>`;

type FieldOpts = { label: string; hint?: string; error?: string; optional?: boolean; control?: (id: string, describedby: string, invalid: boolean) => string; cls?: string };

const field = (id: string, o: FieldOpts) => {
  const describedby = [o.hint && `${id}-hint`, o.error && `${id}-error`].filter(Boolean).join(' ');
  const control = o.control
    ? o.control(id, describedby, !!o.error)
    : `<input id="${id}" type="text" class="input"${describedby ? ` aria-describedby="${describedby}"` : ''}${o.error ? ' aria-invalid="true"' : ''} />`;
  return `
    <div class="field${o.cls ? ` ${o.cls}` : ''}">
      <label for="${id}" class="field__label label">${o.label}${o.optional ? ' <span class="text-muted">(optional)</span>' : ''}</label>
      ${o.hint ? `<p id="${id}-hint" class="field__hint small-text">${o.hint}</p>` : ''}
      ${o.error ? `<p id="${id}-error" class="field__error small-text">${icon('triangle-exclamation-point')}${o.error}</p>` : ''}
      ${control}
    </div>`;
};

export const Playground: Story = {
  args: { label: 'Plot number', hint: 'It’s on your allotment letter, like A-14.', error: '', optional: false, inline: false, compact: false, disabled: false },
  render: (args) => `
    <div class="${args.compact ? 'ui-compact' : ''}" style="max-inline-size: 28rem;">
      ${field('playground', {
        label: args.label,
        hint: args.hint || undefined,
        error: args.error || undefined,
        optional: args.optional,
        cls: args.inline ? 'field--inline' : '',
        control: (id, d, invalid) => `<input id="${id}" type="text" class="input"${d ? ` aria-describedby="${d}"` : ''}${invalid ? ' aria-invalid="true"' : ''}${args.disabled ? ' disabled' : ''} />`,
      })}
    </div>`,
};

export const Anatomy: Story = {
  render: () => `
    <div class="stack" style="max-inline-size: 28rem;">
      ${field('anatomy-label', { label: 'Full name' })}
      ${field('anatomy-hint', { label: 'Plot number', hint: 'It’s on your allotment letter, like A-14.' })}
      ${field('anatomy-optional', { label: 'Phone', optional: true, hint: 'For urgent plot issues only.' })}
    </div>`,
};

export const Errors: Story = {
  render: () => `
    <div class="stack" style="max-inline-size: 28rem;">
      ${field('error-email', {
        label: 'Email address',
        hint: 'We only use it to reply.',
        error: 'Enter an email address in the correct format, like name@example.com',
        control: (id, d) => `<input id="${id}" type="email" class="input" value="sam@" aria-describedby="${d}" aria-invalid="true" />`,
      })}
      ${field('error-plot', {
        label: 'Plot size',
        error: 'Choose a plot size',
        control: (id, d) => `<select id="${id}" class="select" aria-describedby="${d}" aria-invalid="true"><option value="">Choose…</option><option>Half plot</option><option>Full plot</option></select>`,
      })}
      ${field('error-notes', {
        label: 'What will you grow?',
        error: 'Tell us at least one crop',
        control: (id, d) => `<textarea id="${id}" class="textarea" aria-describedby="${d}" aria-invalid="true"></textarea>`,
      })}
    </div>`,
};

export const SeveralErrors: Story = {
  name: 'Several errors',
  render: () => `
    <div class="field" style="max-inline-size: 28rem;">
      <label for="several-password" class="field__label label">Password</label>
      <ul id="several-password-error" class="field__error small-text">
        <li>Use at least 12 characters</li>
        <li>Use a word that isn't your email address</li>
      </ul>
      <input id="several-password" type="password" class="input" aria-describedby="several-password-error" aria-invalid="true" />
    </div>`,
};

export const WithHeader: Story = {
  name: 'With a header',
  render: () => `
    <div class="stack" style="max-inline-size: 28rem;">
      <div class="field">
        <div class="field__header">
          <label for="header-range" class="field__label label">Watering reminder</label>
          <output for="header-range" class="small-text">Every 3 days</output>
        </div>
        <input id="header-range" type="range" class="range" min="1" max="7" value="3" />
      </div>
      <div class="field">
        <div class="field__header">
          <label for="header-password" class="field__label label">Password</label>
          <a href="#reset" class="link small-text">Forgot your password?</a>
        </div>
        <input id="header-password" type="password" class="input" autocomplete="current-password" />
      </div>
    </div>`,
};

export const Inline: Story = {
  render: () => `
    <div class="stack">
      ${field('inline-qty', {
        label: 'Seed packets',
        cls: 'field--inline',
        control: (id) => `<input id="${id}" type="number" class="input" min="1" value="2" style="inline-size: 6rem;" />`,
      })}
      ${field('inline-error', {
        label: 'Seed packets',
        cls: 'field--inline',
        error: 'Enter a number from 1 to 10',
        control: (id, d) => `<input id="${id}" type="number" class="input" value="40" aria-describedby="${d}" aria-invalid="true" style="inline-size: 6rem;" />`,
      })}
    </div>`,
};

export const Disabled: Story = {
  render: () => `
    <div style="max-inline-size: 28rem;">
      ${field('disabled', {
        label: 'Plot number',
        hint: 'Assigned by the committee.',
        control: (id, d) => `<input id="${id}" type="text" class="input" value="A-14" aria-describedby="${d}" disabled />`,
      })}
    </div>`,
};

export const Compact: Story = {
  render: () => `
    <div class="ui-compact stack max-w-sm">
      ${field('compact-name', { label: 'Full name' })}
      ${field('compact-plot', { label: 'Plot number', hint: 'Like A-14.', error: 'Enter a plot number' })}
    </div>`,
};

export const RightToLeft: Story = {
  name: 'Right to left',
  render: () => `
    <div dir="rtl" class="stack" style="max-inline-size: 28rem;">
      ${field('rtl-email', { label: 'Email address', hint: 'We only use it to reply.', error: 'Enter an email address' })}
      ${field('rtl-inline', { label: 'Seed packets', cls: 'field--inline', control: (id) => `<input id="${id}" type="number" class="input" value="2" style="inline-size: 6rem;" />` })}
    </div>`,
};
