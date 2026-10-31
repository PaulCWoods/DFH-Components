import type { Meta, StoryObj } from '@storybook/html';

type Atom =
  | 'display-title'
  | 'title'
  | 'heading'
  | 'subheading'
  | 'small-heading'
  | 'micro-heading'
  | 'large-text'
  | 'text'
  | 'small-text';
type Mode = 'fixed' | 'fluid' | 'cq' | 'compact';

interface TextArgs {
  atom: Atom;
  mode: Mode;
  content: string;
  muted: boolean;
}

/** Every atom, largest first, with the element it usually sits on and its step of the scale. */
const STEPS: { atom: Atom; tag: string; step: string; sample: string }[] = [
  { atom: 'display-title', tag: 'h1', step: '5 (fluid 5–8)', sample: 'Design for humans' },
  { atom: 'title', tag: 'h1', step: '3 (fluid 3–5)', sample: 'Accessible by default' },
  { atom: 'heading', tag: 'h2', step: '2 (fluid 2–3)', sample: 'Section heading' },
  { atom: 'subheading', tag: 'h3', step: '1', sample: 'Sub-section heading' },
  { atom: 'small-heading', tag: 'h4', step: '0', sample: 'Card and panel heading' },
  { atom: 'micro-heading', tag: 'p', step: '−1, uppercase', sample: 'Eyebrow label' },
  { atom: 'large-text', tag: 'p', step: '1', sample: 'A lead paragraph introduces the page and sets its tone.' },
  { atom: 'text', tag: 'p', step: '0', sample: 'Body copy for reading. It is held to a comfortable measure so long lines stay easy to follow.' },
  { atom: 'small-text', tag: 'p', step: '−1', sample: 'Hints, captions and metadata.' },
];

const MODES: { mode: Mode; cls: string; note: string }[] = [
  { mode: 'fixed', cls: '', note: 'fixed (default)' },
  { mode: 'fluid', cls: 'font-sizing-fluid', note: '.font-sizing-fluid' },
  { mode: 'cq', cls: 'font-sizing-cq', note: '.font-sizing-cq' },
  { mode: 'compact', cls: 'font-sizing-compact', note: '.font-sizing-compact' },
];

const modeClass = (mode: Mode) => MODES.find((m) => m.mode === mode)?.cls ?? '';

const sample = (atom: Atom, tag: string, content: string, muted = false) =>
  `<${tag} class="${atom}${muted ? ' text-muted' : ''}" style="margin: 0;">${content}</${tag}>`;

const meta: Meta<TextArgs> = {
  title: 'Atoms/Text',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
Typography presets, one step of the modular scale each. Put the class on the element whose meaning fits (an \`h2\` can look like a \`.small-heading\`); the class sets the look, the element sets the outline.

| Class | Job | Step |
| :--- | :--- | :--- |
| \`.display-title\` | Hero and cover titles | 5 (fluid 5–8) |
| \`.title\` | Page titles | 3 (fluid 3–5) |
| \`.heading\` | Section headings | 2 (fluid 2–3) |
| \`.subheading\` | Sub-section headings | 1 |
| \`.small-heading\` | Card and panel headings | 0 |
| \`.micro-heading\` | Uppercase eyebrow and group labels | −1 |
| \`.large-text\` | Lead paragraphs | 1 |
| \`.text\` | Body copy | 0 |
| \`.small-text\` | Hints, captions, metadata | −1 |

**Sizing modes.** Every atom is **fixed** by default. A container switches the mode for everything inside:

| Mode | Set with | Effect |
| :--- | :--- | :--- |
| fixed | (default), \`.font-sizing-fixed\` | One step at every width |
| fluid | \`.font-sizing-fluid\` | Grows with the viewport |
| cq | \`.font-sizing-cq\` on a container with \`container-type: inline-size\` | Grows with the container |
| compact | \`.font-sizing-compact\`, \`.ui-compact\`, any \`--compact\` container | One step down |

Dialogs, menus, comboboxes, empty states and steppers set \`cq\` themselves.

- Headings balance their lines; body text uses \`text-wrap: pretty\`.
- \`.text\` and \`.large-text\` stop at \`--body-measure\` (66ch). Set \`--body-measure: none\` on a container to lift it.
- Muted text: \`.text-muted\` (or \`.text-color-muted\`). 5.70:1 on the page in light mode, 6.83:1 in dark.
- Bold and other families come from utilities: \`.font-bold\`, \`.font-serif\`, \`.font-mono\`.

\`\`\`html
<p class="micro-heading text-muted">Release notes</p>
<h2 class="heading">What changed</h2>
<p class="text">Body copy for reading.</p>
<p class="small-text text-muted">Updated 2 days ago</p>
\`\`\`
`,
      },
    },
  },
  argTypes: {
    atom: { control: 'select', options: STEPS.map((s) => s.atom) },
    mode: { control: 'inline-radio', options: MODES.map((m) => m.mode), description: 'Set on the container' },
    content: { control: 'text' },
    muted: { control: 'boolean', description: '.text-muted' },
  },
  args: { atom: 'heading', mode: 'fixed', content: 'The quick brown fox jumps over the lazy dog', muted: false },
  render: (args) => {
    const step = STEPS.find((s) => s.atom === args.atom)!;
    return `
      <div class="sb-demo-stage ${modeClass(args.mode)}" style="container-type: inline-size;">
        ${sample(args.atom, step.tag, args.content, args.muted)}
      </div>
    `;
  },
};

export default meta;
type Story = StoryObj<TextArgs>;

/**
 * Interactive sandbox. Pick an atom and the mode its container sets.
 */
export const Playground: Story = {};

/**
 * Every atom at its default (fixed) size, largest first.
 */
export const Scale: Story = {
  render: () => `
    <div class="sb-demo-stage stack">
      ${STEPS.map(
        (s) => `
        <div class="stack" style="--gap: var(--spacing-4);">
          <span class="sb-demo-tag">.${s.atom} · step ${s.step}</span>
          ${sample(s.atom, 'p', s.sample)}
        </div>`
      ).join('')}
    </div>
  `,
};

/**
 * The same headings and body text in each mode. Resize the window to see fluid
 * change; cq follows the 24rem container instead, so it stays small here.
 */
export const SizingModes: Story = {
  render: () => `
    <div class="sb-demo-stage grid grid--auto-fit grid--xs">
      ${MODES.map(
        (m) => `
        <section class="stack ${m.cls}" style="container-type: inline-size; max-inline-size: 24rem;" aria-label="${m.mode} mode">
          <span class="sb-demo-tag">${m.note}</span>
          <p class="title" style="margin: 0;">Title</p>
          <p class="heading" style="margin: 0;">Heading</p>
          <p class="small-heading" style="margin: 0;">Small heading</p>
          <p class="text" style="margin: 0;">Body copy for reading.</p>
          <p class="small-text text-muted" style="margin: 0;">Small text</p>
        </section>`
      ).join('')}
    </div>
  `,
};

/**
 * Container mode in a narrow and a wide container: each sizes to its own width.
 */
export const ContainerMode: Story = {
  render: () => `
    <div class="sb-demo-stage stack">
      ${['18rem', '48rem']
        .map(
          (w) => `
        <section class="font-sizing-cq stack" style="container-type: inline-size; inline-size: min(${w}, 100%); border: 1px dashed var(--border-color-quiet); padding: var(--spacing-16);" aria-label="Container ${w} wide">
          <span class="sb-demo-tag">${w} container</span>
          <p class="display-title" style="margin: 0;">Display</p>
          <p class="heading" style="margin: 0;">Section heading</p>
          <p class="text" style="margin: 0;">Body copy grows with the container, not the window.</p>
        </section>`
        )
        .join('')}
    </div>
  `,
};

/**
 * A compact card steps every atom inside it down one step, titles included.
 */
export const Compact: Story = {
  render: () => `
    <div class="sb-demo-stage grid grid--auto-fit grid--xs">
      ${['', 'card--compact']
        .map(
          (c) => `
        <article class="card ${c}">
          <header class="card__header">
            <hgroup class="card__hgroup">
              <p class="micro-heading text-muted">${c ? '.card--compact' : 'Default card'}</p>
              <h2 class="card__title title">Quarterly report</h2>
            </hgroup>
          </header>
          <div class="card__body stack">
            <p class="text">Revenue grew in every region, led by subscriptions.</p>
            <p class="small-text text-muted">Updated 2 days ago</p>
          </div>
        </article>`
        )
        .join('')}
    </div>
  `,
};

/**
 * A typical composition: eyebrow, heading, lead, body and metadata, with muted text.
 */
export const Composition: Story = {
  render: () => `
    <article class="sb-demo-stage stack" aria-labelledby="text-composition-title">
      <p class="micro-heading text-muted" style="margin: 0;">Release notes</p>
      <h2 id="text-composition-title" class="heading" style="margin: 0;">Text atoms are fixed by default</h2>
      <p class="large-text" style="margin: 0;">Containers decide when type grows with the viewport or the container, or steps down.</p>
      <p class="text" style="margin: 0;">Each atom takes one step of the scale. Put <code>.font-sizing-fluid</code> on an article to let its headings grow on wide screens, or <code>.font-sizing-cq</code> on a container to size type to the container.</p>
      <p class="small-text text-muted" style="margin: 0;">Published 28 October 2026 · <span class="font-bold">3 minute read</span></p>
    </article>
  `,
};

/**
 * `.list`: a bulleted or numbered list outside prose, with prose's indent and
 * item spacing, so its markers sit inside a card's padding. A text atom on the
 * list sets its type.
 */
export const Lists: Story = {
  render: () => `
    <div class="grid grid--2-col grid--xs gap-md" style="max-inline-size: 48rem;">
      <article class="card">
        <header class="card__header"><h3 class="card__title small-heading">Bulleted</h3></header>
        <div class="card__body stack gap-sm">
          <p class="text">This rewrites the color tokens:</p>
          <ul class="list small-text">
            <li><code class="font-mono">tokens/theme.json</code></li>
            <li><code class="font-mono">tokens/1-global.json</code>, the ramps
              <ul>
                <li>Nested items indent again</li>
              </ul>
            </li>
            <li><code class="font-mono">tokens/2-semantic.json</code>, the roles</li>
          </ul>
        </div>
      </article>
      <article class="card">
        <header class="card__header"><h3 class="card__title small-heading">Numbered</h3></header>
        <div class="card__body">
          <ol class="list text">
            <li>Choose a curve
              <ol>
                <li>Then a lower-latin step</li>
              </ol>
            </li>
            <li>Check the contrast</li>
            <li>Publish</li>
          </ol>
        </div>
      </article>
    </div>
  `,
};
