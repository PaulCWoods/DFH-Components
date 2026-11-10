import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Molecules/Prose',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
Styles bare HTML (CMS and Markdown output) so it reads like the rest of the library without classes. \`.prose-end\` ends the scope, so a card or widget inside an article keeps its own styles.

### Markup
\`\`\`html
<article class="prose">
  <h1>Title</h1>
  <p>Text with a <a href="/guide">link</a>.</p>
  <div class="prose-end">…a widget…</div>
</article>
\`\`\`

- **Type:** each element takes the type of the text atom it stands for: \`h1\` a title, \`h2\` a heading, \`h3\` a subheading, \`h4\`–\`h6\` a small heading, text blocks body text, \`small\` and captions small text. A text atom on an element wins (\`<p class="small-text">\`).
- **Sizing:** prose follows the sizing mode around it. Put \`.font-sizing-fluid\` or \`.font-sizing-cq\` on the prose or a region; the rhythm between blocks follows too. Compact (\`.ui-compact\`, \`.font-sizing-compact\`) halves the rhythm.
- **Links:** a bare link is a \`.link\`. \`--link-prominence: subtle\` on the prose makes links body-coloured.
- **Every element** in scope takes the prose look, whatever its classes (a CMS's, such as WordPress's \`wp-block-list\`). Components (\`ul.cluster\`, \`.table\`, \`.divider\`) go in a \`.prose-end\`.
- **Code blocks** are a dark band in both themes and wrap long lines. Inline code has a subtle tint.
- **Measure:** text blocks stop at \`--body-measure\` (66ch). The wrapper sets the column width.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const article = `
  <h1>Planting a shade garden</h1>
  <p>Most gardens have a corner the sun never reaches. Rather than fight it, plant for it: ferns, hostas and woodland bulbs thrive in 3 to 4 hours of dappled light, and need about 30% less water than a sunny border.</p>
  <h2>Start with the soil</h2>
  <p>Shade under trees is usually dry. Dig in leaf mould before you plant, and read the <a href="#soil">soil guide</a> if your ground is heavy clay.</p>
  <h3>What to buy</h3>
  <ul>
    <li>Leaf mould or composted bark</li>
    <li>A slow-release feed
      <ul>
        <li>Organic, if you grow vegetables nearby</li>
      </ul>
    </li>
    <li>Mulch for the first summer</li>
  </ul>
  <h4>Before you plant</h4>
  <p>Water each pot until it stops bubbling. <small>Plants sold in peat dry out fastest.</small></p>`;

export const Playground: Story = {
  args: { sizing: 'inherit', subtleLinks: false, bodySerif: false },
  argTypes: { sizing: { control: 'inline-radio', options: ['inherit', 'fluid', 'cq', 'compact'] } },
  render: (args) => {
    const cls = (args.sizing === 'inherit' ? '' : ` font-sizing-${args.sizing}`) + (args.bodySerif ? ' prose--body-alt' : '');
    const style = args.subtleLinks ? ' style="--link-prominence: subtle;"' : '';
    return `<div style="container-type: inline-size;"><article class="prose${cls}"${style}>${article}</article></div>`;
  },
};

export const BodySerif: Story = {
  name: 'Body serif',
  parameters: { docs: { description: { story: '`--body-alt`: paragraphs and lists in the alternate body family; headings keep theirs.' } } },
  render: () => `<div style="container-type: inline-size;"><article class="prose prose--body-alt">${article}</article></div>`,
};

export const Lead: Story = {
  parameters: { docs: { description: { story: '`--lead`: the first paragraph takes the type of `.large-text`, for a lead that comes from a CMS and can\'t carry a class.' } } },
  render: () => `<div style="container-type: inline-size;"><article class="prose prose--lead prose--body-alt font-sizing-fluid">${article}</article></div>`,
};

export const TextAndHeadings: Story = {
  name: 'Text and headings',
  render: () => `
    <article class="prose">
      ${article}
      <h5>Small heading (h5)</h5>
      <p>Text with <strong>strong</strong>, <em>emphasis with <em>nested</em> emphasis</em>, <u>an annotation</u>, <del>a deletion</del> and <ins>an insertion</ins>, H<sub>2</sub>O and E = mc<sup>2</sup>, <kbd>Ctrl</kbd> + <kbd>S</kbd>, and <code>inline code</code>.</p>
      <p class="small-text">A paragraph with a text atom: <code>p.small-text</code> keeps its small size inside prose.</p>
    </article>`,
};

export const Links: Story = {
  render: () => `
    <div class="stack">
      <article class="prose">
        <p>A bare link in prose is a <a href="#a">link atom</a>: link colour, an underline that thickens on hover, and the focus ring.</p>
      </article>
      <article class="prose" style="--link-prominence: subtle;">
        <p>With <code>--link-prominence: subtle</code> on the prose, <a href="#b">links</a> are body-coloured and the underline marks them.</p>
      </article>
    </div>`,
};

export const Lists: Story = {
  render: () => `
    <article class="prose">
      <ol>
        <li>Clear the bed
          <ol>
            <li>Lift the turf
              <ol>
                <li>Stack it upside down to rot</li>
                <li>Use it as loam next year</li>
              </ol>
            </li>
            <li>Fork out roots</li>
          </ol>
        </li>
        <li>Dig in leaf mould</li>
        <li>Plant and water</li>
      </ol>
      <dl>
        <dt>Dappled shade</dt>
        <dd>Light filtered through a canopy for most of the day.</dd>
        <dt>Deep shade</dt>
        <dd>Less than two hours of direct sun, often under evergreens.</dd>
      </dl>
    </article>`,
};

export const QuotesAndRules: Story = {
  name: 'Quotes and rules',
  render: () => `
    <article class="prose">
      <p>Gertrude Jekyll wrote about shade as a gift rather than a problem.</p>
      <blockquote>
        <p>The love of gardening is a seed once sown that never dies.</p>
      </blockquote>
      <hr>
      <p>A bare <code>hr</code> uses the divider tokens, so it matches <code>.divider</code>.</p>
    </article>`,
};

export const Code: Story = {
  render: () => `
    <article class="prose">
      <p>Let a textarea grow with its content using <code>field-sizing</code>:</p>
      <pre><code>:where(textarea) {
  field-sizing: content;
  min-block-size: 3lh;
}

/* Long lines wrap rather than scroll: a very long comment that runs on past the edge of the column to show the wrapping. */</code></pre>
    </article>`,
};

export const Figures: Story = {
  render: () => `
    <article class="prose">
      <p>The border in its second spring.</p>
      <figure>
        <img src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&amp;q=60" alt="Ferns and hostas under a birch tree" width="800" height="533" loading="lazy">
        <figcaption>Figure 1: Ferns, hostas and Solomon's seal under a silver birch.</figcaption>
      </figure>
      <p>The text after a figure keeps the same rhythm.</p>
    </article>`,
};

export const Tables: Story = {
  render: () => `
    <article class="prose">
      <table>
        <caption>Plants for dry shade</caption>
        <thead>
          <tr><th scope="col">Plant</th><th scope="col">Height</th><th scope="col">Flowers</th></tr>
        </thead>
        <tbody>
          <tr><th scope="row">Epimedium</th><td>30cm</td><td>April</td></tr>
          <tr><th scope="row">Geranium macrorrhizum</th><td>40cm</td><td>May to July</td></tr>
          <tr><th scope="row">Brunnera</th><td>45cm</td><td>April to May</td></tr>
        </tbody>
      </table>
      <p>A wide table needs a <code>.table</code> in a scroll wrapper (§13).</p>
    </article>`,
};

export const SizingModes: Story = {
  name: 'Sizing modes',
  render: () => {
    const sample = `<h2>Start with the soil</h2><p>Shade under trees is usually dry. Dig in leaf mould before you plant.</p><p>Water each pot until it stops bubbling.</p>`;
    return `
      <div class="stack">
        <p class="small-heading">Fixed (default)</p>
        <article class="prose">${sample}</article>
        <p class="small-heading">Fluid</p>
        <article class="prose font-sizing-fluid">${sample}</article>
        <p class="small-heading">Container (cq)</p>
        <div style="container-type: inline-size; max-inline-size: 30rem;"><article class="prose font-sizing-cq">${sample}</article></div>
        <p class="small-heading">In a compact region</p>
        <div class="ui-compact"><article class="prose">${sample}</article></div>
      </div>`;
  },
};

export const ProseEnd: Story = {
  name: 'Prose end',
  render: () => `
    <article class="prose">
      <h2>Ending the scope</h2>
      <p>Everything inside <code>.prose-end</code> is outside prose: no margins, no element type.</p>
      <div class="prose-end">
        <article class="card">
          <header class="card__header">
            <h3 class="card__title small-heading">A card in an article</h3>
          </header>
          <div class="card__body">
            <p class="text">Its heading and text take their atoms, not the prose look. <a class="link" href="#c">Its links</a> need a class.</p>
          </div>
        </article>
      </div>
      <p>Prose carries on after it.</p>
    </article>`,
};

export const RightToLeft: Story = {
  render: () => `
    <article class="prose" dir="rtl" lang="ar">
      <h2>ابدأ بالتربة</h2>
      <p>الظل تحت الأشجار عادة ما يكون جافًا. أضف السماد الورقي قبل الزراعة، واقرأ <a href="#d">دليل التربة</a>.</p>
      <ul>
        <li>سماد ورقي</li>
        <li>غطاء للتربة</li>
      </ul>
      <blockquote><p>الحديقة تعلم الصبر.</p></blockquote>
      <pre><code>:where(textarea) { field-sizing: content; }</code></pre>
    </article>`,
};
