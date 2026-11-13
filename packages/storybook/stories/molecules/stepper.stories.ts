import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Molecules/Stepper',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
The steps of one task: which are done, which is current, which are left. An ordered list of steps, each with an indicator, a title and an optional description.

### Markup
\`\`\`html
<ol class="stepper" aria-label="Registration">
  <li class="stepper__item is-complete">
    <div class="stepper__step">
      <span class="stepper__indicator" aria-hidden="true"><svg class="icon" …><use href="#check"/></svg></span>
      <span class="stepper__title small-heading"><span class="sr-only">Completed: </span>Details</span>
      <span class="stepper__description small-text">Verified</span>
    </div>
  </li>
  <li class="stepper__item" aria-current="step">
    <div class="stepper__step">
      <span class="stepper__indicator micro-heading" aria-hidden="true">2</span>
      <span class="stepper__title small-heading"><span class="sr-only">Current: </span>Agreement</span>
    </div>
  </li>
  <li class="stepper__item">
    <div class="stepper__step">
      <span class="stepper__indicator micro-heading" aria-hidden="true">3</span>
      <span class="stepper__title small-heading">Payment</span>
    </div>
  </li>
</ol>
\`\`\`

- **State:** \`aria-current="step"\` on the current item; \`.is-complete\` and \`.is-invalid\` on others. Never colour alone: the indicator shows a check or warning icon, and the title starts with the state in hidden text, since the indicator is hidden.
- **Steps** are a \`<div>\`, an \`<a>\` for a page the user may revisit, or a \`<button>\` in an in-page wizard. Wrap the list in a \`<nav>\` only when its steps are links.
- **Options:** \`--vertical\`, \`--plain\` (the number or icon without its circle, coloured by state; flag \`--stepper-prominence: plain\`), \`--compact\`. In a narrow row (below 34rem) the descriptions hide; the titles keep the state.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

type Step = { title: string; description?: string; state?: 'complete' | 'current' | 'invalid' };

const icon = (name: string) =>
  `<svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#${name}"/></svg>`;

const said = { complete: 'Completed: ', current: 'Current: ', invalid: 'Needs attention: ' };

const indicator = (s: Step, n: number) =>
  s.state === 'complete' ? `<span class="stepper__indicator" aria-hidden="true">${icon('check')}</span>`
    : s.state === 'invalid' ? `<span class="stepper__indicator" aria-hidden="true">${icon('triangle-exclamation-point')}</span>`
      : `<span class="stepper__indicator micro-heading" aria-hidden="true">${n}</span>`;

const item = (s: Step, n: number, tag = 'div', href = '') => {
  const cls = s.state === 'complete' ? ' is-complete' : s.state === 'invalid' ? ' is-invalid' : '';
  const current = s.state === 'current' ? ' aria-current="step"' : '';
  const open = tag === 'a' ? `a href="${href}#step-${n}"` : tag === 'button' ? `button type="button"${!s.state ? ' disabled' : ''}` : tag;
  return `
    <li class="stepper__item${cls}"${current}>
      <${open} class="stepper__step">
        ${indicator(s, n)}
        <span class="stepper__title small-heading">${s.state ? `<span class="sr-only">${said[s.state]}</span>` : ''}${s.title}</span>
        ${s.description ? `<span class="stepper__description small-text">${s.description}</span>` : ''}
      </${tag}>
    </li>`;
};

const stepper = (steps: Step[], cls = '', label = 'Registration', tag = 'div') =>
  `<ol class="stepper${cls ? ` ${cls}` : ''}" aria-label="${label}">${steps.map((s, i) => item(s, i + 1, tag)).join('')}</ol>`;

const registration: Step[] = [
  { title: 'Details', description: 'Verified', state: 'complete' },
  { title: 'Agreement', description: 'Sign the plot terms', state: 'current' },
  { title: 'Payment', description: 'Sliding scale' },
  { title: 'Review', description: 'Check and submit' },
];

export const Playground: Story = {
  args: { current: 2, plain: false, vertical: false, compact: false, descriptions: true },
  argTypes: { current: { control: { type: 'range', min: 1, max: 4 } } },
  render: (args) => {
    const steps = registration.map((s, i): Step => ({
      title: s.title,
      description: args.descriptions ? s.description : undefined,
      state: i + 1 < args.current ? 'complete' : i + 1 === args.current ? 'current' : undefined,
    }));
    const cls = [args.plain && 'stepper--plain', args.vertical && 'stepper--vertical', args.compact && 'stepper--compact'].filter(Boolean).join(' ');
    return `<div style="max-inline-size: ${args.vertical ? '20rem' : '48rem'};">${stepper(steps, cls)}</div>`;
  },
};

export const States: Story = {
  render: () => `
    <div class="max-w-lg">
      ${stepper([
        { title: 'Identity', description: 'Verified', state: 'complete' },
        { title: 'Soil agreement', description: 'Signature missing', state: 'invalid' },
        { title: 'Annual dues', description: 'In progress', state: 'current' },
        { title: 'Review' },
      ], '', 'Plot registration')}
    </div>`,
};

export const LinkedSteps: Story = {
  name: 'Linked steps',
  render: () => `
    <nav aria-label="Checkout" style="max-inline-size: 40rem;">
      <ol class="stepper" aria-label="Checkout steps">
        ${item({ title: 'Shipping', state: 'complete' }, 1, 'a')}
        ${item({ title: 'Payment', state: 'current' }, 2, 'a')}
        ${item({ title: 'Review' }, 3)}
      </ol>
    </nav>`,
};

export const InPageWizard: Story = {
  name: 'In-page wizard (buttons)',
  render: () => `
    <div style="max-inline-size: 40rem;">
      ${stepper([
        { title: 'Account', state: 'complete' },
        { title: 'Organisation', state: 'current' },
        { title: 'Billing' },
      ], '', 'Set-up wizard', 'button')}
    </div>`,
};

export const Plain: Story = {
  name: 'Plain (no circles)',
  render: () => {
    const steps: Step[] = [
      { title: 'Identity', description: 'Verified', state: 'complete' },
      { title: 'Soil agreement', description: 'Signature missing', state: 'invalid' },
      { title: 'Annual dues', description: 'In progress', state: 'current' },
      { title: 'Review' },
    ];
    return `
      <div class="stack max-w-lg">
        ${stepper(steps, 'stepper--plain', 'Plot registration, plain')}
        <div style="max-inline-size: 20rem;">${stepper(steps, 'stepper--plain stepper--vertical', 'Plot registration, plain vertical')}</div>
      </div>`;
  },
};

export const Vertical: Story = {
  render: () => `
    <div style="max-inline-size: 20rem;">
      ${stepper([
        { title: 'Profile', description: 'Verified', state: 'complete' },
        { title: 'Security keys', description: 'Enrol a passkey', state: 'current' },
        { title: 'Team invites', description: 'Optional' },
      ], 'stepper--vertical', 'Set-up guide')}
    </div>`,
};

export const Compact: Story = {
  render: () => `
    <div class="stack max-w-md">
      ${stepper(registration, 'stepper--compact', 'Registration, compact')}
      ${stepper(registration, 'stepper--compact stepper--vertical', 'Registration, compact vertical')}
    </div>`,
};

export const NarrowContainer: Story = {
  name: 'Narrow container',
  render: () => `<div class="max-w-sm">${stepper(registration, '', 'Registration, narrow')}</div>`,
};

export const RightToLeft: Story = {
  name: 'Right to left',
  render: () => `<div class="max-w-lg" dir="rtl">${stepper(registration, '', 'Registration, right to left')}</div>`,
};
