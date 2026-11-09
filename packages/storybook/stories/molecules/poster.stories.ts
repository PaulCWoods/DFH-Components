import type { Meta, StoryObj } from '@storybook/html';
import photo800 from '../../../docs/public/examples/poster-800.jpg';
import photo1600 from '../../../docs/public/examples/poster-1600.jpg';
import photo2400 from '../../../docs/public/examples/poster-2400.jpg';
import clip from '../../../docs/public/examples/poster-clip.webm';

const srcset = `${photo800} 800w, ${photo1600} 1600w, ${photo2400} 2400w`;

const meta: Meta = {
  title: 'Molecules/Poster',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
A picture with content laid over it: a hero, a feature, a promotion. The picture is a real \`<img>\` (or the image in a \`<picture>\`, or a \`<video>\`), cropped to fill. The content sits on a surface that is never more than 25% see-through, so its text reads over any photo.

### Markup
\`\`\`html
<section class="poster" aria-labelledby="hero-title">
  <img class="poster__media" src="hero.webp" srcset="…" sizes="100vw" alt="" fetchpriority="high" />
  <div class="poster__content">
    <div class="stack">
      <h1 class="display-title" id="hero-title">Gardens of Eden</h1>
      <p class="large-text">Design, planting and care for cottage gardens.</p>
      <div class="button-group">
        <a class="button button--strong button--accent" href="/visit">Book a visit</a>
      </div>
    </div>
  </div>
</section>
\`\`\`

- **Prominence:** a translucent panel (default), \`--strong\` (solid panel), \`--subtle\` (scrim over the picture, no panel), \`--plain\` (neither: what sits on it brings its own surface).
- **Content:** a box with padding, a width cap and its surface. A stack inside lays out what it holds.
- **Placement:** start and centre by default; \`--inline-center\`, \`--inline-end\`, \`--block-start\`, \`--block-end\`. The inline padding lines the content up with the site width.
- **Flush:** \`--flush\` makes the content fill the poster and take its padding, for anything you lay out yourself.
- **Stretch:** \`--stretch\` drops the site-width alignment, as the header's and footer's \`--stretch\` do.
- **Focus:** \`--poster-focus\` is where the crop centres (\`object-position\`).
- **Height:** the content sets it; \`--poster-min-size\` (24rem) is the least.
- **Contrast:** the panel and scrim are capped at 25% see-through, solid under more contrast or reduced transparency (a subtle poster then takes a panel), and system colours in forced colours.
- **Colour:** \`.color-scheme-dark\` or \`.color-palette-inverted\` on the poster turns its surface dark.
- **Naming:** \`alt=""\` when the words carry the message; \`fetchpriority="high"\` on the hero, \`loading="lazy"\` further down.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const content = (title = 'Gardens worth coming home to', level = 'h2', titleClass = 'title') => `
    <div class="poster__content">
      <div class="stack">
        <${level} class="${titleClass}">${title}</${level}>
        <p class="large-text">Design, planting and care for cottage gardens, from the first sketch to the first bloom.</p>
        <div class="button-group">
          <a class="button button--strong button--accent" href="#">Book a visit</a>
          <a class="button" href="#">See our gardens</a>
        </div>
      </div>
    </div>`;

const poster = (cls = '', body = content(), style = '') =>
  `<div class="${['poster', cls].filter(Boolean).join(' ')}"${style ? ` style="${style}"` : ''}>
    <img class="poster__media" src="${photo1600}" srcset="${srcset}" sizes="100vw" alt="" />${body}
  </div>`;

export const Playground: Story = {
  args: { prominence: 'default', inline: 'start', block: 'center', scheme: 'page', compact: false },
  argTypes: {
    prominence: { control: 'inline-radio', options: ['default', 'strong', 'subtle', 'plain'] },
    inline: { control: 'inline-radio', options: ['start', 'center', 'end'] },
    block: { control: 'inline-radio', options: ['start', 'center', 'end'] },
    scheme: { control: 'inline-radio', options: ['page', 'dark', 'inverted'] },
  },
  render: (args) => {
    const cls = [
      args.prominence !== 'default' ? `poster--${args.prominence}` : '',
      args.inline !== 'start' ? `poster--inline-${args.inline}` : '',
      args.block !== 'center' ? `poster--block-${args.block}` : '',
      args.scheme === 'dark' ? 'color-scheme-dark' : args.scheme === 'inverted' ? 'color-palette-inverted' : '',
      args.compact ? 'poster--compact' : '',
    ].filter(Boolean).join(' ');
    /* Plain has no surface: its content brings its own */
    const body = args.prominence === 'plain'
      ? `<div class="poster__content"><div class="card card--compact"><h2 class="heading">Gardens worth coming home to</h2><p class="text">Design, planting and care for cottage gardens.</p><div class="button-group"><a class="button button--strong button--accent" href="#">Book a visit</a></div></div></div>`
      : content();
    return poster(cls, body);
  },
};

export const Prominence: Story = {
  render: () => `<div class="stack">
    ${poster('', content('Panel (default)', 'h2', 'heading'))}
    ${poster('poster--strong', content('Solid panel (--strong)', 'h2', 'heading'))}
    ${poster('poster--subtle', content('Scrim (--subtle)', 'h2', 'heading'))}
    ${poster('poster--plain', `<div class="poster__content"><div class="card card--compact"><h2 class="heading">None (--plain), with a card</h2><p class="text">What sits on a plain poster brings its own surface.</p></div></div>`)}
  </div>`,
};

export const Placement: Story = {
  render: () => `<div class="grid grid--3-col gap-md">
    ${['block-start', '', 'block-end'].flatMap((b) => ['', 'inline-center', 'inline-end'].map((i) => {
      const cls = [b && `poster--${b}`, i && `poster--${i}`, 'poster--compact'].filter(Boolean).join(' ');
      return poster(cls, `<div class="poster__content"><p class="small-heading">${b || 'block-center'}, ${i || 'inline-start'}</p></div>`, '--poster-min-size: 14rem;');
    })).join('')}
  </div>`,
};

export const DarkAndInverted: Story = {
  render: () => `<div class="stack">
    ${poster('color-scheme-dark', content('A dark panel'))}
    ${poster('poster--subtle poster--inline-center poster--block-end color-scheme-dark', content('A dark scrim'))}
    ${poster('color-palette-inverted poster--inline-end', content('The inverted palette'))}
  </div>`,
};

export const Focus: Story = {
  render: () => `<div class="grid grid--3-col gap-md">
    ${['0% 50%', '50% 50%', '100% 50%'].map((f) => poster('poster--compact poster--block-end', `<div class="poster__content"><p class="small-text">--poster-focus: ${f}</p></div>`, `--poster-focus: ${f}; --poster-min-size: 16rem;`)).join('')}
  </div>`,
};

export const Flush: Story = {
  render: () => poster('poster--flush poster--subtle color-scheme-dark', `<div class="poster__content">
      <div class="stack gap-lg">
        <h2 class="title">The spring planting list</h2>
        <div class="grid grid--3-col">
          ${['Borders', 'Pots', 'Kitchen garden'].map((t) => `<div class="card card--compact"><h3 class="small-heading">${t}</h3><p class="small-text">Twelve plants we trust, and where each likes to grow.</p></div>`).join('')}
        </div>
      </div>
    </div>`),
};

export const Stretch: Story = {
  parameters: { docs: { description: { story: 'On a screen wider than the site width the content keeps to the padding instead of lining up with the site width. Pair it with a `--stretch` header and footer.' } } },
  render: () => poster('poster--stretch', content('A stretched poster', 'h2', 'heading')),
};

export const Compact: Story = {
  render: () => poster('poster--compact', content('A compact poster', 'h2', 'heading')),
};

export const Hero: Story = {
  render: () => `<section class="poster poster--block-end" aria-labelledby="poster-hero-title" style="--poster-min-size: 70svh;">
    <picture>
      <source srcset="${srcset}" sizes="100vw" />
      <img class="poster__media" src="${photo1600}" alt="" width="2400" height="1601" fetchpriority="high" />
    </picture>
    ${content('Gardens of Eden', 'h1', 'display-title').replace('<h1 class', '<h1 id="poster-hero-title" class')}
  </section>`,
};

/* A video in place of the photo: muted, played once on load and stopped
   within 5 seconds, so it needs no pause control (WCAG 2.2.2). A longer
   or looping video needs a pause button. The photo is its poster frame,
   and what it shows until it plays. Decorative, so hidden from assistive
   technology, as alt="" hides a photo. */
export const Video: Story = {
  render: () => `<div class="poster">
    <video class="poster__media" src="${clip}" poster="${photo1600}" muted autoplay playsinline preload="auto" aria-hidden="true"></video>${content('Watch the garden grow')}
  </div>`,
};
