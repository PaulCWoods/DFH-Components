import type { Meta, StoryObj } from '@storybook/html';
import component from '../../../../tokens/3-component.json';
import variables from '../../../css/src/variables.css?raw';

/* The first :root block: the default value of every token */
const start = variables.indexOf(':root {');
const root = variables.slice(start, variables.indexOf('\n}', start));
const valueOf = (name: string) => root.match(new RegExp(`^\\s*${name}:\\s*(.+?);\\s*$`, 'm'))?.[1] ?? '';

type Row = { name: string; value: string; description: string };
const rowsOf = (group: Record<string, any>, path: string[]): Row[] =>
  Object.entries(group).flatMap(([key, node]) => {
    if (key.startsWith('$') || !node || typeof node !== 'object') return [];
    const name = `--${[...path, key].join('-')}`;
    return '$value' in node ? [{ name, value: valueOf(name), description: node.$description ?? '' }] : rowsOf(node, [...path, key]);
  });

const names = Object.keys(component).filter((k) => !k.startsWith('$'));

const meta: Meta<{ component: string }> = {
  title: 'Tokens/Component Tokens',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
Each component's Tier 3 tokens, with their defaults as compiled in \`variables.css\`. Set any of them on a container to change the component inside it.
`,
      },
    },
  },
  argTypes: { component: { control: 'select', options: names } },
  args: { component: 'button' },
};

export default meta;
type Story = StoryObj<{ component: string }>;

export const ByComponent: Story = {
  name: 'By component',
  render: ({ component: key }) => `
    <div class="table-container" tabindex="0" role="group" aria-label="${key} tokens">
      <table class="table">
        <caption class="small-text">${key} tokens</caption>
        <thead><tr><th scope="col">Token</th><th scope="col">Default</th><th scope="col">What it does</th></tr></thead>
        <tbody>
          ${rowsOf((component as Record<string, any>)[key] ?? {}, [key]).map((r) => `<tr><td><code>${r.name}</code></td><td><code>${r.value}</code></td><td>${r.description}</td></tr>`).join('')}
        </tbody>
      </table>
    </div>
  `,
};
