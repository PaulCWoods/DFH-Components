import type { Meta, StoryObj } from '@storybook/html';
// @ts-expect-error: plain ES module without types
import { buildPalette, check, hexToOklch, lightnesses, STEPS } from '../../../theme-engine/src/index.js';
import theme from '../../../../tokens/theme.json';
import global from '../../../../tokens/1-global.json';
import semantic from '../../../../tokens/2-semantic.json';

const meta: Meta<{ curve: string }> = {
  title: 'Tokens/Colour',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
The Tier 1 colour ramps, built by the theme engine (\`packages/theme-engine\`) from \`tokens/theme.json\`.

Each hue starts from a picked colour; its hue and chroma make the 500 step. One lightness curve, shared by every hue, runs from the light end (100) to the dark end (900), so the same step has the same lightness, and nearly the same contrast, in every hue. The contrast gate checks every Tier 2 pairing in light and dark.

**Current** is \`tokens/1-global.json\` as it stands; **generated** is what \`npm run build:palette -- --write\` would write. Once written, the two match.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<{ curve: string }>;


type Swatch = { hex: string };
type Ramp = Record<string, Swatch>;

const CURVES = [theme.curve, 'soft-s', 'cubic-bezier(0.3, 0.05, 0.7, 0.85)', 's', 'linear'].filter((c, i, a) => a.indexOf(c) === i);
const build = (curve: string): Record<string, Ramp> => buildPalette({ ...theme, curve });

/* Try another curve before editing tokens/theme.json */
const curveArg = {
  args: { curve: theme.curve },
  argTypes: { curve: { control: 'select', options: CURVES, description: 'The shared lightness curve' } },
};
const current: Record<string, Ramp> = Object.fromEntries(
  Object.entries(global.color as Record<string, any>)
    .filter(([, v]) => v && typeof v === 'object' && !('$value' in v))
    .map(([hue, ramp]) => [hue, Object.fromEntries(Object.entries(ramp as Record<string, any>).filter(([k]) => !k.startsWith('$')).map(([k, v]) => [k, { hex: v.$value }]))]),
);

const order = (steps: string[]) => [...steps].sort((a, b) => Number(a) - Number(b));
const L = (hex: string) => Math.round(hexToOklch(hex).l * 100);

const swatchRow = (label: string, ramp: Ramp) => `
  <li class="stack gap-2xs">
    <p class="micro-heading text-muted">${label}</p>
    <ol role="list" style="display: grid; grid-template-columns: repeat(${Object.keys(ramp).length}, minmax(0, 1fr)); gap: 2px;">
      ${order(Object.keys(ramp))
        .map((step) => {
          const hex = ramp[step].hex.toLowerCase();
          return `<li class="stack gap-2xs small-text font-mono">
            <span aria-hidden="true" style="background: ${hex}; block-size: 3rem; border-radius: 0.25rem;"></span>
            <span class="font-bold">${step}</span>
            <span>${hex}</span>
            <span class="text-muted">L ${L(hex)}</span>
          </li>`;
        })
        .join('')}
    </ol>
  </li>`;

export const Ramps: Story = {
  ...curveArg,
  parameters: { docs: { description: { story: 'Each hue as it is today and as the theme generates it. L is OKLCH lightness ×100: generated ramps share it step for step.' } } },
  render: ({ curve }) => {
    const generated = build(curve);
    return `
    <div class="stack gap-lg">
      ${Object.keys(generated)
        .map(
          (hue) => `
        <section class="stack gap-xs" aria-labelledby="ramp-${hue}">
          <h2 id="ramp-${hue}" class="subheading">${hue} <span class="small-text text-muted">picked colour ${theme.hues[hue].seed}</span></h2>
          <ul class="stack gap-xs" role="list">
            ${current[hue] ? swatchRow('Current', current[hue]) : ''}
            ${swatchRow('Generated', generated[hue])}
          </ul>
        </section>`,
        )
        .join('')}
    </div>`;
  },
};

/* The curve: generated lightness against each current hue */
export const Curve: Story = {
  ...curveArg,
  parameters: { docs: { description: { story: `The shared lightness curve (the thick line) against each hue's current lightness (thin lines). Where the thin lines spread apart, the same step gives a different contrast in each hue.` } } },
  render: ({ curve }) => {
    const w = 640;
    const h = 320;
    const pad = 40;
    const x = (i: number) => pad + (i * (w - 2 * pad)) / (STEPS.length - 1);
    const y = (l: number) => pad + (1 - l) * (h - 2 * pad);
    const line = (ls: number[]) => ls.map((l, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(l).toFixed(1)}`).join(' ');
    const shared = lightnesses({ curve, ends: theme.ends });
    const hues = Object.keys(current).filter((hue) => hue !== 'neutral');
    return `
      <figure class="stack gap-xs">
        <svg viewBox="0 0 ${w} ${h}" role="img" aria-labelledby="curve-title" style="max-inline-size: 40rem; inline-size: 100%;">
          <title id="curve-title">OKLCH lightness by step: the shared curve against today's hues</title>
          ${[0.2, 0.4, 0.6, 0.8, 1].map((l) => `<line x1="${pad}" x2="${w - pad}" y1="${y(l)}" y2="${y(l)}" stroke="currentColor" stroke-opacity="0.15" /><text x="${pad - 8}" y="${y(l) + 4}" text-anchor="end" font-size="11" fill="currentColor">${l * 100}</text>`).join('')}
          ${STEPS.map((s: string, i: number) => `<text x="${x(i)}" y="${h - pad + 18}" text-anchor="middle" font-size="11" fill="currentColor">${s}</text>`).join('')}
          ${hues.map((hue) => `<path d="${line(STEPS.map((s: string) => hexToOklch(current[hue][s].hex).l))}" fill="none" stroke="${current[hue]['500'].hex}" stroke-width="1.5" />`).join('')}
          <path d="${line(shared)}" fill="none" stroke="currentColor" stroke-width="4" />
        </svg>
        <figcaption class="small-text text-muted">Thin lines, each in its hue: ${hues.join(', ')} today. Thick line: the generated curve, the same for every hue.</figcaption>
      </figure>`;
  },
};

const status = (pass: boolean, gated: boolean) =>
  pass
    ? '<span class="status status--success"><span class="status__text">Pass</span></span>'
    : gated
      ? '<span class="status status--danger"><span class="status__text">Fail</span></span>'
      : '<span class="status"><span class="status__text">Reported</span></span>';

/* Strips the current Tier 1 ramps out of the palette lookup, so `check` reads them from global */
const before = check({ semantic, global, palette: {} });

/* The pair as a picture: the ratio beside it is the information, so the
   sample is an image that may show a failing pair without being one */
const sample = (r: any) =>
  `<svg width="72" height="32" role="img" aria-label="Sample: ${r.fgHex} on ${r.bgHex}">
    <rect x="1" y="1" width="70" height="30" rx="4" fill="${r.bgHex}" ${r.fg.startsWith('border') ? `stroke="${r.fgHex}" stroke-width="2"` : ''} />
    ${r.fg.startsWith('border') ? '' : `<text x="36" y="21" text-anchor="middle" font-size="14" font-weight="600" fill="${r.fgHex}">Aa</text>`}
  </svg>`;

const pairingTable = (after: any, mode: 'light' | 'dark') => {
  const rows = after.rows.filter((r: any) => r.mode === mode);
  return `
    <div class="table-container" tabindex="0" role="region" aria-label="${mode} mode pairings">
      <table class="table table--compact table--striped table--sticky-head">
        <caption class="small-heading text-start">${mode === 'light' ? 'Light' : 'Dark'} mode</caption>
        <thead>
          <tr>
            <th scope="col">Pairing</th>
            <th scope="col">Sample</th>
            <th scope="col" class="table__cell--numeric">Current</th>
            <th scope="col" class="table__cell--numeric">Generated</th>
            <th scope="col" class="table__cell--numeric">APCA Lc</th>
            <th scope="col">Needs</th>
            <th scope="col">Result</th>
          </tr>
        </thead>
        <tbody>
          ${rows
            .map((r: any) => {
              const was = before.rows.find((b: any) => b.mode === mode && b.fg === r.fg && b.bg === r.bg);
              return `<tr>
                <th scope="row"><span class="small-text font-mono">${r.fg}</span><br /><span class="small-text font-mono text-muted">on ${r.bg}</span></th>
                <td>${sample(r)}</td>
                <td class="table__cell--numeric font-mono">${was ? `${was.ratio.toFixed(2)}${was.gated && !was.pass ? ' ✕' : ''}` : '–'}</td>
                <td class="table__cell--numeric font-mono">${r.ratio.toFixed(2)}</td>
                <td class="table__cell--numeric font-mono">${r.apca.toFixed(0)}</td>
                <td class="table__cell--nowrap">${r.min}:1${r.gated ? '' : ' (reported)'}</td>
                <td>${status(r.pass, r.gated)}</td>
              </tr>`;
            })
            .join('')}
        </tbody>
      </table>
    </div>`;
};

export const Pairings: Story = {
  ...curveArg,
  parameters: { docs: { description: { story: 'Every Tier 2 pairing the gate checks, today and generated. Text and inverted text need 4.5:1 and fail the build below it; intent borders are reported against 3:1. ✕ marks a pairing that fails today.' } } },
  render: ({ curve }) => {
    const after = check({ semantic, global, palette: build(curve) });
    const worst = Math.min(...after.rows.filter((x: any) => x.gated).map((x: any) => x.ratio));
    return `
    <div class="stack gap-lg">
      <p class="text" role="status">Today ${before.failures.length} gated pairings fail. With <code class="font-mono">${curve}</code>, ${after.failures.length} fail; the lowest gated pairing is ${worst.toFixed(2)}:1.</p>
      ${pairingTable(after, 'light')}
      ${pairingTable(after, 'dark')}
    </div>`;
  },
};
