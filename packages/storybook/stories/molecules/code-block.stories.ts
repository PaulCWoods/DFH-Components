import type { Meta, StoryObj } from '@storybook/html';

const LONG = `:where(.fern) {
  /* Plant it where the soil stays damp through the driest weeks of summer, under deciduous trees */
  color: var(--foreground, CanvasText);
}`;

const block = (modifiers = '', label = 'CSS', controls = '<button type="button" class="button"><span>Copy code</span></button>') => {
  const wraps = modifiers.includes('wrap');
  return `<div class="code-block ${modifiers}">
    <div class="code-block__bar"><span class="small-text">${label}</span>${controls}</div>
    <pre class="code-block__code"${wraps ? '' : ` tabindex="0" role="group" aria-label="${label} code"`}><code>${LONG}</code></pre>
  </div>`;
};

const meta: Meta = {
  title: 'Molecules/Code Block',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
Code to read and copy, under a bar that names the language and holds its controls. A dark band in both themes. Long lines scroll, or wrap with \`--wrap\`. The library ships no script, so copying is the product's.
`,
      },
    },
  },
};
export default meta;
type Story = StoryObj;

export const Default: Story = { render: () => block() };

export const Wrap: Story = {
  name: 'Long lines wrap',
  render: () => block('code-block--wrap', 'CSS, wrapping'),
};

export const NoBar: Story = {
  name: 'Without a bar',
  render: () => `<div class="code-block"><pre class="code-block__code" tabindex="0" role="group" aria-label="Plain code"><code>${LONG}</code></pre></div>`,
};

export const SeveralControls: Story = {
  name: 'Several controls',
  render: () => block('', 'CSS, controls', `<div class="cluster gap-xs">
    <button type="button" class="button"><span>Wrap lines</span></button>
    <button type="button" class="button"><span>Copy code</span></button>
  </div>`),
};

export const Compact: Story = { render: () => block('code-block--compact', 'CSS, compact') };

export const InAccordion: Story = {
  name: 'In a flush Accordion',
  render: () => `<details class="accordion accordion--flush" open>
    <summary>Code</summary>
    ${block('code-block--flush', 'CSS, in an Accordion')}
  </details>`,
};

export const InProse: Story = {
  name: 'In Prose',
  render: () => `<div class="prose">
    <p>A Code Block ends the Prose's scope, so it needs no <code>.prose-end</code>.</p>
    ${block('', 'CSS, in Prose')}
    <p>Prose carries on after it.</p>
  </div>`,
};

export const RightToLeft: Story = {
  name: 'Right to left',
  render: () => `<div dir="rtl">${block('', 'CSS, right to left')}</div>`,
};
