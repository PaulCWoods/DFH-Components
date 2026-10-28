import type { Meta, StoryObj } from '@storybook/html';

interface KbdArgs {
  keys: string;
  small: boolean;
}

const kbd = (keys: string, small = false) => {
  const parts = keys.split('+').map((k) => k.trim()).filter(Boolean);
  const cls = small ? 'kbd kbd--sm' : 'kbd';
  return parts.length > 1
    ? `<kbd class="${cls}">${parts.map((k) => `<kbd>${k}</kbd>`).join('')}</kbd>`
    : `<kbd class="${cls}">${parts[0] ?? ''}</kbd>`;
};

const meta: Meta<KbdArgs> = {
  title: 'Atoms/Kbd',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
### Kbd

A keyboard key or shortcut. It has no intent and no prominence.

| Axis | Modifiers | Container flag |
| :--- | :--- | :--- |
| Size | default, \`--sm\` | \`--kbd-size\` |
| Density | none on the key; a compact container steps it to \`--sm\` | \`--ui-sizing: compact\` |

A combination nests one \`<kbd>\` per key inside an outer \`.kbd\`, which then acts as a wrapper.

\`\`\`html
<kbd class="kbd">Esc</kbd>
<kbd class="kbd"><kbd>⌘</kbd><kbd>K</kbd></kbd>

<!-- On a control: also expose the shortcut to assistive technology -->
<button type="button" class="button" aria-keyshortcuts="Meta+K">
  <span>Search</span>
  <kbd class="kbd"><kbd>⌘</kbd><kbd>K</kbd></kbd>
</button>
\`\`\`
`,
      },
    },
  },
  argTypes: {
    keys: { control: 'text', description: 'Keys, joined with + for a combination' },
    small: { control: 'boolean', description: 'Size: --sm' },
  },
  render: (args) => `<div class="demo-stage">${kbd(args.keys, args.small)}</div>`,
};

export default meta;
type Story = StoryObj<KbdArgs>;

/**
 * Interactive sandbox.
 */
export const Playground: Story = {
  args: { keys: '⌘ + K', small: false },
};

/**
 * Single keys and combinations at both sizes.
 */
export const KeysAndCombinations: Story = {
  render: () => `
    <div class="demo-stage stack">
      ${[false, true]
        .map(
          (small) => `
        <div class="cluster align-items-center">
          ${['Esc', 'Enter', '↑', '↓', '⌘ + K', 'Shift + ⌘ + P', 'Ctrl + Alt + Delete'].map((k) => kbd(k, small)).join('')}
        </div>`
        )
        .join('')}
    </div>
  `,
};

/**
 * Shortcuts on controls, with aria-keyshortcuts so the shortcut is not only visual.
 */
export const OnControls: Story = {
  render: () => `
    <div class="demo-stage stack">
      <button type="button" class="button" aria-keyshortcuts="Meta+K">
        <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Search"/></svg>
        <span>Search</span>
        ${kbd('⌘ + K', true)}
      </button>
      <p class="small-text">Press ${kbd('Esc')} to close, or ${kbd('Enter')} to confirm.</p>
    </div>
  `,
};
