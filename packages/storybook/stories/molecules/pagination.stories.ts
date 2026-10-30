import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Molecules/Pagination',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
Moves between the pages of one list: a button group of page links. Pagination makes the number buttons square and adds a gap marker for skipped pages; the group's options and a \`justify-*\` utility set the rest.

### Markup
\`\`\`html
<nav class="pagination button-group buttons-subtle" aria-label="Pagination">
  <a class="button button--icon" href="/page/1">
    <svg class="icon icon--dir" …><use href="#ChevronLeft"/></svg>
    <span class="sr-only">Previous page</span>
  </a>
  <a class="button" href="/page/1"><span>1</span></a>
  <a class="button" href="/page/2" aria-current="page"><span>2</span></a>
  <a class="button" href="/page/3"><span>3</span></a>
  <span class="pagination__gap" aria-hidden="true">…</span>
  <a class="button" href="/page/10"><span>10</span></a>
  <a class="button button--icon" href="/page/3">…<span class="sr-only">Next page</span></a>
</nav>
\`\`\`

- **Current page:** \`aria-current="page"\` on its link. The button shows it as selected; no class.
- **No previous or next page:** a link with no \`href\` and \`aria-disabled="true"\`.
- **Skipped pages:** \`.pagination__gap\`, hidden from screen readers.
- **Page count** ("Page 2 of 10" and a jump form) is a pattern, not a component: see the last story.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const icon = (name: string) =>
  `<svg class="icon icon--dir" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#${name}"/></svg>`;

const prev = (current: number) => current > 1
  ? `<a class="button button--icon" href="#page-${current - 1}">${icon('ChevronLeft')}<span class="sr-only">Previous page</span></a>`
  : `<a class="button button--icon" aria-disabled="true">${icon('ChevronLeft')}<span class="sr-only">Previous page</span></a>`;

const next = (current: number, total: number) => current < total
  ? `<a class="button button--icon" href="#page-${current + 1}">${icon('ChevronRight')}<span class="sr-only">Next page</span></a>`
  : `<a class="button button--icon" aria-disabled="true">${icon('ChevronRight')}<span class="sr-only">Next page</span></a>`;

const page = (n: number, current: number) =>
  `<a class="button" href="#page-${n}"${n === current ? ' aria-current="page"' : ''}><span>${n}</span></a>`;

const gap = '<span class="pagination__gap" aria-hidden="true">…</span>';

/* First, last, and the current page with its neighbours; gaps between */
const pages = (current: number, total: number) => {
  const shown = [...new Set([1, current - 1, current, current + 1, total])].filter((n) => n >= 1 && n <= total).sort((a, b) => a - b);
  return shown.map((n, i) => (i > 0 && n - shown[i - 1] > 1 ? gap : '') + page(n, current)).join('');
};

const pagination = (current: number, total: number, cls = 'buttons-subtle', label = 'Pagination') =>
  `<nav class="pagination button-group ${cls}" aria-label="${label}">${prev(current)}${pages(current, total)}${next(current, total)}</nav>`;

export const Playground: Story = {
  args: { current: 5, total: 12, prominence: 'subtle', small: false, round: false, align: 'start' },
  argTypes: {
    current: { control: { type: 'range', min: 1, max: 12 } },
    prominence: { control: 'inline-radio', options: ['default', 'subtle', 'plain'] },
    align: { control: 'inline-radio', options: ['start', 'center', 'end'] },
  },
  render: (args) => {
    const cls = [args.prominence !== 'default' && `buttons-${args.prominence}`,
      args.small && 'buttons-sm',
      args.round && 'buttons-round',
      args.align !== 'start' && `justify-${args.align}`].filter(Boolean).join(' ');
    return pagination(Math.min(args.current, args.total), args.total, cls);
  },
};

export const FirstAndLastPage: Story = {
  name: 'First and last page',
  render: () => `
    <div class="stack">
      ${pagination(1, 8, 'buttons-subtle', 'Pagination, first page')}
      ${pagination(8, 8, 'buttons-subtle', 'Pagination, last page')}
    </div>`,
};

export const PreviousAndNext: Story = {
  name: 'Previous and next with text',
  render: () => `
    <nav class="pagination button-group justify-between" aria-label="Pagination, previous and next">
      <a class="button" href="#page-1">${icon('ArrowLeft')}<span>Previous</span></a>
      <span class="small-text">Page 2 of 10</span>
      <a class="button" href="#page-3"><span>Next</span>${icon('ArrowRight')}</a>
    </nav>`,
};

export const Joined: Story = {
  render: () => pagination(3, 6, 'button-group--joined', 'Pagination, joined'),
};

export const PageCount: Story = {
  name: 'Page count pattern',
  render: () => `
    <div class="stack">
      ${pagination(2, 10, 'buttons-subtle justify-center', 'Pagination with page count')}
      <div class="cluster cluster--between">
        <p class="small-text text-muted">Page 2 of 10</p>
        <form class="cluster" onsubmit="event.preventDefault();">
          <div class="field field--inline">
            <label for="pg-jump" class="field__label label">Go to page</label>
            <input class="input" type="number" id="pg-jump" name="page" min="1" max="10" value="2" style="inline-size: 5rem;">
          </div>
          <button class="button button--subtle" type="submit"><span>Go</span></button>
        </form>
      </div>
    </div>`,
};

export const RightToLeft: Story = {
  name: 'Right to left',
  render: () => `<div dir="rtl">${pagination(4, 9, 'buttons-subtle', 'Pagination, right to left')}</div>`,
};
