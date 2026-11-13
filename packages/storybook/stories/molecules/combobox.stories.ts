import type { Meta, StoryObj } from '@storybook/html';
import { enhance } from '../../../docs/src/lib/combobox-demo';

const meta: Meta = {
  title: 'Molecules/Combobox',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
A text field that filters a list of options: single select, or multi-select with chips. The field's frame is the shared text-control base, so it matches an input beside it; the list is a popover anchored to the field, so no card or dialog clips it.

**Choose the simplest control that works:**
- Pick one from a short, known list: \`.select--custom\` (native, no script).
- Suggestions while typing, any value allowed: \`<input list>\` with a \`<datalist>\`.
- Filter a long list, multi-select with chips, rich options: the combobox.

### Markup
\`\`\`html
<div class="field">
  <label for="plant" class="field__label label">Plant</label>
  <div class="combobox">
    <div class="combobox__control">
      <input id="plant" class="combobox__input" role="combobox" aria-expanded="false"
             aria-controls="plant-list" aria-autocomplete="list" autocomplete="off" />
      <button type="button" class="button button--plain button--icon combobox__toggle" tabindex="-1" aria-label="Show plants">
        <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#chevron-down"/></svg>
      </button>
    </div>
    <ul id="plant-list" class="combobox__listbox" role="listbox" popover="manual" aria-label="Plants">
      <li id="plant-1" class="combobox__option" role="option" aria-selected="false">
        <span>Epimedium</span>
        <svg class="icon combobox__check" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#check"/></svg>
      </li>
    </ul>
    <p class="sr-only" role="status"></p>
  </div>
</div>
\`\`\`

**The library ships no script.** The product's script must:
- show the list (\`showPopover()\`) and set \`aria-expanded\` on typing, ArrowDown or the toggle; hide it on Escape, selection or leaving the field;
- filter options (set \`hidden\`) and put the count, or "No results", in the \`role="status"\` element;
- move \`aria-activedescendant\` and \`.is-active\` with ArrowUp and ArrowDown, keeping focus in the input;
- select with Enter or a click: set \`aria-selected\`, fill the input (single) or add a chip (multi);
- in multi-select, remove the last chip on Backspace in an empty input.

The stories run a short demo script so each can be used by keyboard. It is product code, not part of the library.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const story = (html: string) => () => {
  const el = document.createElement('div');
  el.innerHTML = html;
  return enhance(el);
};

/* --------------------------------------------------------------------------
   Markup helpers
   -------------------------------------------------------------------------- */
const icon = (name: string, cls = 'icon') =>
  `<svg class="${cls}" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#${name}"/></svg>`;

const plants = ['Epimedium', 'Brunnera', 'Pulmonaria', 'Geranium macrorrhizum', 'Hellebore', 'Hosta', 'Astilbe', 'Heuchera', 'Tiarella', 'Polystichum'];

const option = (id: string, text: string, selected = false, extra = '') =>
  `<li id="${id}" class="combobox__option" role="option" aria-selected="${selected}"${extra}>${text}${icon('check', 'icon combobox__check')}</li>`;

const toggle = (label: string) =>
  `<button type="button" class="button button--plain button--icon combobox__toggle" tabindex="-1" aria-label="${label}">${icon('chevron-down')}</button>`;

interface Opts {
  id: string;
  label: string;
  cls?: string;
  list?: string;
  value?: string;
  placeholder?: string;
  multi?: boolean;
  start?: string;
  clear?: boolean;
  inputAttrs?: string;
  before?: string;
  listAttrs?: string;
  empty?: boolean;
  listTag?: string;
}

const combobox = (o: Opts) => `
  <div class="combobox${o.cls ? ` ${o.cls}` : ''}">
    <div class="combobox__control">
      ${o.start ? icon(o.start, 'icon combobox__icon-start') : ''}
      ${o.multi ? '<span class="combobox__tags"></span>' : ''}
      <input id="${o.id}" class="combobox__input" role="combobox" aria-expanded="false" aria-controls="${o.id}-list"
        aria-autocomplete="list" autocomplete="off"${o.value ? ` value="${o.value}"` : ''}${o.placeholder ? ` placeholder="${o.placeholder}"` : ''}${o.inputAttrs ?? ''} />
      ${o.clear ? `<button type="button" class="button button--plain button--icon combobox__clear" tabindex="-1" aria-label="Clear">${icon('x')}</button>` : ''}
      ${toggle(`Show ${o.label.toLowerCase()}`)}
    </div>
    <${o.listTag ?? 'ul'} id="${o.id}-list" class="combobox__listbox" role="listbox" popover="manual" aria-label="${o.label}"${o.multi ? ' aria-multiselectable="true"' : ''}${o.listAttrs ?? ''}>
      ${o.list ?? plants.map((p, i) => option(`${o.id}-${i}`, `<span>${p}</span>`, p === o.value)).join('')}
    </${o.listTag ?? 'ul'}>
    ${o.empty ? '<p class="combobox__empty small-text" hidden>No plants match. Try another name.</p>' : ''}
    <p class="sr-only" role="status"></p>
  </div>`;

const field = (o: Opts, hint = '') => `
  <div class="field">
    <label for="${o.id}" class="field__label label">${o.label}</label>
    ${hint}
    ${combobox(o)}
  </div>`;

/* --------------------------------------------------------------------------
   Stories
   -------------------------------------------------------------------------- */
export const Playground: Story = {
  args: { size: 'default', prominence: 'default', round: false },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'default', 'lg'] },
    prominence: { control: 'inline-radio', options: ['default', 'subtle', 'plain'] },
  },
  render: (args) => {
    const cls = [args.size !== 'default' && `combobox--${args.size}`, args.prominence !== 'default' && `combobox--${args.prominence}`, args.round && 'combobox--round'].filter(Boolean).join(' ');
    return story(`<div class="max-w-sm">${field({ id: 'pg', label: 'Plant', cls, placeholder: 'Type to filter' })}</div>`)();
  },
};

export const SingleSelect: Story = {
  name: 'Single select',
  render: story(`
    <div class="stack max-w-sm">
      ${field({ id: 'single', label: 'Plant', value: 'Brunnera', start: 'Search', clear: true })}
    </div>`),
};

export const MultiSelect: Story = {
  name: 'Multi-select with chips',
  parameters: {
    docs: {
      description: {
        story: 'Chosen options become chips before the input; each chip\'s remove button names its value. The list stays open while choosing. Backspace in the empty input removes the last chip.',
      },
    },
  },
  render: story(`
    <div style="max-inline-size: 28rem;">
      ${field({
        id: 'multi',
        label: 'Companion plants',
        multi: true,
        placeholder: 'Add a plant',
        list: plants.map((p, i) => option(`multi-${i}`, `<span>${p}</span>`, i === 0 || i === 2)).join(''),
      })}
    </div>`),
};

export const Groups: Story = {
  parameters: {
    docs: {
      description: {
        story: 'A grouped list is a `<div role="listbox">` of `<ul role="group">`s, each labelled by its first item, so screen readers say which group an option is in. A rule separates the groups.',
      },
    },
  },
  render: story(`
    <div class="max-w-sm">
      ${field({
        id: 'grouped',
        label: 'Plant',
        listTag: 'div',
        list: `
          <ul role="group" aria-labelledby="grouped-g1">
            <li id="grouped-g1" role="presentation" class="combobox__group-label micro-heading">Perennials</li>
            ${option('grouped-1', '<span>Epimedium</span>')}${option('grouped-2', '<span>Brunnera</span>')}${option('grouped-3', '<span>Hellebore</span>')}
          </ul>
          <ul role="group" aria-labelledby="grouped-g2">
            <li id="grouped-g2" role="presentation" class="combobox__group-label micro-heading">Ferns</li>
            ${option('grouped-4', '<span>Polystichum</span>')}${option('grouped-5', '<span>Dryopteris</span>')}
          </ul>`,
      })}
    </div>`),
};

export const RichOptions: Story = {
  name: 'Rich options',
  parameters: {
    docs: {
      description: {
        story: 'A two-line option is a `.lockup` of text atoms. Mark the line the script should put in the input with `data-label`. A disabled option takes `aria-disabled="true"` and says why.',
      },
    },
  },
  render: story(`
    <div style="max-inline-size: 26rem;">
      ${field({
        id: 'rich',
        label: 'Plant',
        list: [
          ['Epimedium', 'Dry shade, 30cm, spring flowers'],
          ['Brunnera', 'Part shade, 40cm, blue flowers'],
          ['Hosta', 'Out of stock until May', true],
          ['Pulmonaria', 'Shade, 25cm, spotted leaves'],
        ].map(([t, d, off], i) => option(`rich-${i}`, `<span class="lockup"><span class="small-heading" data-label>${t}</span><span class="small-text text-muted">${d}</span></span>`, false, off ? ' aria-disabled="true"' : '')).join(''),
      })}
    </div>`),
};

export const StaticList: Story = {
  name: 'Static list',
  parameters: {
    docs: {
      description: {
        story: '`.combobox__listbox--static` is always shown, in flow, with no frame of its own: for a list that is the whole content of a Dialog or panel. Its input keeps `aria-expanded="true"`.',
      },
    },
  },
  render: story(`
    <div class="field" style="max-inline-size: 26rem;">
      <label for="static" class="field__label label">Find a plant</label>
      <div class="combobox">
        <div class="combobox__control">
          ${icon('search', 'icon combobox__icon-start')}
          <input id="static" class="combobox__input" role="combobox" aria-expanded="true" aria-controls="static-list" aria-autocomplete="list" autocomplete="off" />
        </div>
        <ul id="static-list" class="combobox__listbox combobox__listbox--static" role="listbox" aria-label="Matching plants">
          ${plants.map((p, i) => option(`static-${i}`, `<span>${p}</span>`)).join('')}
        </ul>
        <p class="sr-only" role="status"></p>
      </div>
    </div>`),
};

export const NoResults: Story = {
  name: 'No results',
  parameters: {
    docs: {
      description: {
        story: 'Type a name that isn\'t in the list. The visible message appears under the field, and the same news goes to the `role="status"` element, so it is announced.',
      },
    },
  },
  render: story(`<div class="max-w-sm">${field({ id: 'none', label: 'Plant', empty: true, placeholder: 'Try “rose”' })}</div>`),
};

export const SizesAndProminence: Story = {
  name: 'Sizes and prominence',
  parameters: {
    docs: {
      description: {
        story: 'The field is the shared text-control base, so it matches an input of the same size and prominence. Options step down with `--sm` and in compact regions, and stay at least 48px tall.',
      },
    },
  },
  render: story(`
    <div class="stack" style="max-inline-size: 30rem;">
      ${['sm', '', 'lg'].map((s) => `
        <div class="grid grid--auto-fit grid--2xs">
          <input class="input${s ? ` input--${s}` : ''}" aria-label="Input ${s || 'default'}" placeholder="Input ${s || 'default'}" />
          ${combobox({ id: `size-${s || 'md'}`, label: `Plants, ${s || 'default'}`, cls: s ? `combobox--${s}` : '', placeholder: `Combobox ${s || 'default'}` })}
        </div>`).join('')}
      ${['subtle', 'plain'].map((p) => `
        <div class="grid grid--auto-fit grid--2xs">
          <input class="input input--${p}" aria-label="Input ${p}" placeholder="Input ${p}" />
          ${combobox({ id: `prom-${p}`, label: `Plants, ${p}`, cls: `combobox--${p}`, placeholder: `Combobox ${p}` })}
        </div>`).join('')}
      <div class="ui-compact">${field({ id: 'compact', label: 'In a compact region' })}</div>
    </div>`),
};

export const InvalidAndDisabled: Story = {
  name: 'Invalid and disabled',
  render: story(`
    <div class="stack max-w-sm">
      ${field(
        { id: 'invalid', label: 'Plant', value: 'Rose', inputAttrs: ' aria-invalid="true" aria-describedby="invalid-error"' },
        `<p id="invalid-error" class="field__error small-text">${icon('triangle-exclamation-point')} Choose a plant from the list</p>`,
      )}
      ${field({ id: 'disabled', label: 'Plant (locked)', value: 'Brunnera', inputAttrs: ' disabled' })}
    </div>`),
};

export const InAClippingCard: Story = {
  name: 'In a clipping card',
  parameters: {
    docs: {
      description: {
        story: 'The card hides its overflow, but the list is in the top layer, so it opens in full over the card\'s edge. Open it with ArrowDown or the toggle.',
      },
    },
  },
  render: story(`
    <article class="card" style="max-inline-size: 24rem; overflow: hidden;">
      <header class="card__header"><h3 class="card__title subheading">Add to plot</h3></header>
      <div class="card__body">${field({ id: 'clip', label: 'Plant' })}</div>
    </article>`),
};

export const RightToLeft: Story = {
  name: 'Right to left',
  render: story(`
    <div class="max-w-sm" dir="rtl" lang="ar">
      ${field({
        id: 'rtl',
        label: 'النبات',
        start: 'search',
        multi: true,
        list: ['إبيميديوم', 'برونيرا', 'خربق', 'هوستا'].map((p, i) => option(`rtl-${i}`, `<span>${p}</span>`, i === 1)).join(''),
      })}
    </div>`),
};
