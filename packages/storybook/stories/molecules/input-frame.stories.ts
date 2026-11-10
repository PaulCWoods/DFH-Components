import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Molecules/Input Frame',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
A text field with buttons beside it inside one control: show a password, clear a search. The frame is the shared text-control base, so it takes the Input's sizes, looks and flags, draws the border and focus ring, and takes its states from the input inside it.

### Markup
\`\`\`html
<div class="input-frame">
  <input type="password" id="password" class="input-frame__input" autocomplete="current-password" />
  <button type="button" class="button button--plain button--icon" aria-controls="password" aria-pressed="false">
    <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#View" /></svg>
    <span class="sr-only">Show password</span>
  </button>
</div>
\`\`\`

- **The library ships no script.** To show a password, switch the field's \`type\` between \`password\` and \`text\`, set \`aria-pressed\`, and swap the icon (\`View\`, \`Hide\`).
- **Targets:** the buttons fit inside the field and keep a 48px hit area; a tap anywhere else lands in the field.
- **Modifiers** are the Input's: \`input--sm\`, \`input--lg\`, \`input--subtle\`, \`input--plain\`, \`input--round\`, on the frame.
`,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const icon = (name: string) => `<svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#${name}" /></svg>`;

const password = (id: string, o: { cls?: string; shown?: boolean; invalid?: boolean; disabled?: boolean; label?: string } = {}) => `
  <div class="field">
    <label for="${id}" class="field__label label">${o.label ?? 'Password'}</label>
    <div class="input-frame ${o.cls ?? ''}">
      <input type="${o.shown ? 'text' : 'password'}" id="${id}" class="input-frame__input" autocomplete="current-password" value="${o.shown ? 'hunter2-potatoes' : ''}"${o.invalid ? ` aria-invalid="true" aria-describedby="${id}-error"` : ''}${o.disabled ? ' disabled' : ''} />
      <button type="button" class="button button--plain button--icon" aria-controls="${id}" aria-pressed="${o.shown ? 'true' : 'false'}"${o.disabled ? ' disabled' : ''}>
        ${icon(o.shown ? 'Hide' : 'View')}<span class="sr-only">Show password</span>
      </button>
    </div>
    ${o.invalid ? `<p id="${id}-error" class="field__error small-text">${icon('Warning')}Enter your password</p>` : ''}
  </div>`;

export const Password: Story = {
  render: () => `<div class="max-w-sm">${password('password')}</div>`,
};

export const States: Story = {
  parameters: { docs: { description: { story: 'Shown (the field is text, the button pressed), invalid and disabled. The frame takes each state from its input.' } } },
  render: () => `
    <div class="stack max-w-sm">
      ${password('password-shown', { shown: true, label: 'Shown' })}
      ${password('password-invalid', { invalid: true, label: 'Invalid' })}
      ${password('password-disabled', { disabled: true, label: 'Disabled' })}
    </div>`,
};

export const Sizes: Story = {
  parameters: { docs: { description: { story: 'The Input\'s sizes and looks, on the frame. A compact region steps it to small.' } } },
  render: () => `
    <div class="stack max-w-sm">
      ${password('password-sm', { cls: 'input--sm', label: 'Small' })}
      ${password('password-lg', { cls: 'input--lg', label: 'Large' })}
      ${password('password-subtle', { cls: 'input--subtle', label: 'Subtle' })}
      ${password('password-round', { cls: 'input--round', label: 'Round' })}
      <div class="ui-compact">${password('password-compact', { label: 'Compact region' })}</div>
    </div>`,
};

export const Search: Story = {
  parameters: { docs: { description: { story: 'Any button that acts on the field: a search with clear and submit.' } } },
  render: () => `
    <form class="max-w-sm" role="search" onsubmit="event.preventDefault();">
      <label for="search-plants" class="sr-only">Search plants</label>
      <div class="input-frame input--round">
        <input type="search" id="search-plants" class="input-frame__input" value="Hellebore" />
        <button type="button" class="button button--plain button--icon" aria-controls="search-plants">${icon('Close')}<span class="sr-only">Clear search</span></button>
        <button type="submit" class="button button--plain button--icon">${icon('Search')}<span class="sr-only">Search</span></button>
      </div>
    </form>`,
};
