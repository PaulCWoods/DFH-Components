import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Molecules/Accordion',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
One disclosure: a native \`<details>\` whose \`<summary>\` names a section and whose content opens below it. The accordion draws the frame, the summary's layout and the state icon; what the summary says is a text atom, and the content is anything.

### Markup
\`\`\`html
<details class="accordion">
  <summary>Watering</summary>
  <p class="text">Water deeply once a week in the first summer.</p>
</details>
\`\`\`

| Axis | Values | Flag |
| :--- | :--- | :--- |
| Prominence | default (border), \`--plain\` (a rule above and below, no inline padding) | \`--accordion-prominence\` |
| Density | default, \`--compact\` | \`--ui-sizing: compact\` |

- **Native behaviour:** Enter and Space open the summary, find-in-page opens a closed accordion that holds the match, and \`name\` on several \`<details>\` allows one open at a time. No script.
- **State icon:** a plus that closes into a minus, at the summary's end. It can't be removed: it is the only visual sign of state.
- **Summary type:** bold body text. A summary with a class takes its type from that class, so give it a text atom.
- **Target:** the summary is at least 48px tall, or the product's fine-pointer target.
- **Groups:** \`.accordion-group\` stacks accordions; \`--joined\` shares their borders. Plain accordions sit one rule apart.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const text = {
  watering: 'Water deeply once a week in the first summer, then only in long dry spells. Shallow, frequent watering keeps roots near the surface.',
  soil: 'Most woodland plants want soil that holds moisture but drains: dig in leaf mould before planting, and mulch every spring.',
  light: 'Dappled shade under deciduous trees suits most of them. Deep, dry shade under conifers suits only a few: epimedium, geranium macrorrhizum.',
};

const item = (summary: string, body: string, attrs = '', cls = '', summaryCls = '') => `
  <details class="accordion${cls ? ` ${cls}` : ''}"${attrs}>
    <summary${summaryCls ? ` class="${summaryCls}"` : ''}>${summary}</summary>
    <p class="text">${body}</p>
  </details>`;

const three = (cls = '', name = '') => {
  const n = name ? ` name="${name}"` : '';
  return `${item('Watering', text.watering, `${n} open`, cls)}${item('Soil', text.soil, n, cls)}${item('Light', text.light, n, cls)}`;
};

export const Playground: Story = {
  args: { prominence: 'default', compact: false, open: false, summary: 'Watering' },
  argTypes: {
    prominence: { control: 'inline-radio', options: ['default', 'plain'] },
  },
  render: (args) => {
    const cls = [args.prominence === 'plain' && 'accordion--plain', args.compact && 'accordion--compact'].filter(Boolean).join(' ');
    return `<div style="max-inline-size: 36rem;">${item(args.summary, text.watering, args.open ? ' open' : '', cls)}</div>`;
  },
};

export const Prominence: Story = {
  render: () => `
    <div class="stack" style="max-inline-size: 36rem;">
      <h3 class="small-heading">Default</h3>
      ${item('Watering', text.watering, ' open')}
      <h3 class="small-heading">--plain</h3>
      <p class="text">A plain accordion has no inline padding, so its summary lines up with this text.</p>
      ${item('Watering', text.watering, ' open', 'accordion--plain')}
    </div>`,
};

export const SummaryContent: Story = {
  name: 'Summary content',
  parameters: {
    docs: {
      description: {
        story: 'A bare summary is bold body text. A text atom on the summary sets its type. A heading inside a summary is valid HTML and puts the section in the page outline, but some screen readers flatten it into the summary\'s name; use it only where the outline needs it. Long summaries wrap before the icon.',
      },
    },
  },
  render: () => `
    <div class="stack" style="max-inline-size: 36rem;">
      ${item('Bare summary', text.watering)}
      ${item('Subheading on the summary', text.watering, '', '', 'subheading')}
      <details class="accordion">
        <summary><h3 class="subheading">A heading in the summary</h3></summary>
        <p class="text">${text.soil}</p>
      </details>
      ${item('A long summary that wraps onto a second line at narrow widths, and wraps before the state icon rather than running under it', text.light)}
    </div>`,
};

export const Groups: Story = {
  parameters: {
    docs: {
      description: {
        story: 'A group stacks accordions with a gap. `--joined` shares their borders. Plain accordions sit one rule apart. `name` allows one open at a time: it hides content people may want to compare, so use it only for long, independent items.',
      },
    },
  },
  render: () => `
    <div class="stack" style="max-inline-size: 36rem;">
      <h3 class="small-heading">Group</h3>
      <div class="accordion-group">${three()}</div>
      <h3 class="small-heading">--joined</h3>
      <div class="accordion-group accordion-group--joined">${three()}</div>
      <h3 class="small-heading">Plain</h3>
      <div class="accordion-group">${three('accordion--plain')}</div>
      <h3 class="small-heading">Exclusive (one open at a time)</h3>
      <div class="accordion-group accordion-group--joined">${three('', 'care')}</div>
    </div>`,
};

export const Compact: Story = {
  parameters: {
    docs: {
      description: {
        story: '`--compact`, or any compact region, steps the padding and text down. The summary keeps a 48px target unless the product has opted into fine-pointer targets.',
      },
    },
  },
  render: () => `
    <div class="stack" style="max-inline-size: 36rem;">
      <div class="accordion-group">${three('accordion--compact')}</div>
      <div class="ui-compact accordion-group">${three('accordion--plain')}</div>
    </div>`,
};

export const ContainerFlags: Story = {
  name: 'Container flags',
  render: () => `
    <div style="max-inline-size: 36rem; --accordion-prominence: plain; --ui-sizing: compact;">
      <div class="accordion-group">${three()}</div>
    </div>`,
};

export const InACard: Story = {
  name: 'In a card',
  parameters: {
    docs: {
      description: {
        story: 'A flush card body sets `--accordion-inset` to the card\'s padding, so plain accordions run edge to edge with their text lined up with the card\'s.',
      },
    },
  },
  render: () => `
    <article class="card" style="max-inline-size: 36rem;">
      <header class="card__header"><h3 class="card__title subheading">Planting guide</h3></header>
      <div class="card__body card__body--flush">
        <div class="accordion-group">${three('accordion--plain')}</div>
      </div>
    </article>`,
};

export const RightToLeft: Story = {
  name: 'Right to left',
  render: () => `
    <div dir="rtl" lang="ar" class="stack" style="max-inline-size: 36rem;">
      ${item('الري', 'اسقِ النباتات بعمق مرة في الأسبوع خلال الصيف الأول.', ' open')}
      ${item('التربة', 'معظم نباتات الغابات تحب تربة تحتفظ بالرطوبة وتصرف الماء.', '', 'accordion--plain')}
    </div>`,
};
