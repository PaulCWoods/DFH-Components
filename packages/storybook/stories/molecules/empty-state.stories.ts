import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Molecules/Empty State',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
The block shown where content would be when there is none: a search or filter miss, a first use, a cleared queue, a region that failed to load. The empty state lays out a visual, a title, a description and actions; the parts are atoms that style themselves.

### Markup
\`\`\`html
<div class="empty-state">
  <div class="empty-state__visual">
    <span class="icon-box" aria-hidden="true">
      <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Search"/></svg>
    </span>
  </div>
  <div class="empty-state__content">
    <h3 class="empty-state__title subheading">No plants match “fern”</h3>
    <p class="empty-state__description small-text">Check the spelling, or clear the filters.</p>
  </div>
  <div class="empty-state__actions">
    <button type="button" class="button">Clear filters</button>
  </div>
</div>
\`\`\`

| Axis | Values | Flag |
| :--- | :--- | :--- |
| Prominence | default (no frame, no padding), \`--subtle\` (dashed, tinted, padded) | none |
| Density | default, \`--compact\` | \`--ui-sizing: compact\` |
| Intent | neutral, \`--accent\`, \`--info\`, \`--success\`, \`--warning\`, \`--danger\` | \`--icon-box-intent\` |
| Alignment | centred, \`--start\` | none |

- **Not a landmark.** A \`<div>\`; a \`<section>\` only when it is the whole content of a page or panel. The heading level fits the outline; the class sets the size.
- **Announcing:** when a search or filter empties a list, put the news in a \`role="status"\` element that is already on the page. The empty state isn't a live region.
- **Visual:** an \`.icon-box\`, made large, subtle and round by the empty state (small when compact), or an illustration.
- **Intent** tints the icon box. The icon and the title must still say what it means.
- **Writing:** the title says what is empty, the description says why or what to do next, and there is at most one primary action.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const icon = (name: string) =>
  `<svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#${name}"/></svg>`;

interface Parts {
  cls?: string;
  glyph?: string;
  title: string;
  description: string;
  actions?: string;
  tag?: string;
  titleCls?: string;
}

const emptyState = ({ cls = '', glyph = 'Search', title, description, actions = '', tag = 'h3', titleCls = 'subheading' }: Parts) => `
  <div class="empty-state${cls ? ` ${cls}` : ''}">
    <div class="empty-state__visual">
      <span class="icon-box" aria-hidden="true">${icon(glyph)}</span>
    </div>
    <div class="empty-state__content">
      <${tag} class="empty-state__title ${titleCls}">${title}</${tag}>
      <p class="empty-state__description small-text">${description}</p>
    </div>
    ${actions ? `<div class="empty-state__actions">${actions}</div>` : ''}
  </div>`;

const searchMiss = (cls = '', titleCls = 'subheading') =>
  emptyState({
    cls,
    titleCls,
    title: 'No plants match “fern”',
    description: 'Check the spelling, or clear the filters to see all 40 plants.',
    actions: '<button type="button" class="button">Clear filters</button>',
  });

export const Playground: Story = {
  args: {
    title: 'No plants match “fern”',
    description: 'Check the spelling, or clear the filters to see all 40 plants.',
    intent: 'neutral',
    subtle: false,
    compact: false,
    start: false,
  },
  argTypes: {
    intent: { control: 'select', options: ['neutral', 'accent', 'info', 'success', 'warning', 'danger'] },
  },
  render: (args) => {
    const cls = [
      args.intent !== 'neutral' && `empty-state--${args.intent}`,
      args.subtle && 'empty-state--subtle',
      args.compact && 'empty-state--compact',
      args.start && 'empty-state--start',
    ]
      .filter(Boolean)
      .join(' ');
    const glyph = { neutral: 'Search', accent: 'Star', info: 'Info', success: 'Check', warning: 'Warning', danger: 'Error' }[args.intent as string];
    return `<div style="max-inline-size: 36rem;">${emptyState({
      cls,
      glyph,
      title: args.title,
      description: args.description,
      actions: '<button type="button" class="button">Clear filters</button>',
    })}</div>`;
  },
};

export const SearchMiss: Story = {
  name: 'Search miss',
  parameters: {
    docs: {
      description: {
        story: 'Type a name that matches nothing. The status line above the results is on the page from the start, so its change is announced; the empty state replaces the list without being announced itself.',
      },
    },
  },
  render: () => {
    const plants = ['Brunnera', 'Epimedium', 'Hellebore', 'Pulmonaria', 'Tiarella'];
    setTimeout(() => {
      const root = document.getElementById('search-demo');
      if (!root || root.dataset.ready) return;
      root.dataset.ready = 'true';
      const input = root.querySelector('input') as HTMLInputElement;
      const list = root.querySelector('ul') as HTMLUListElement;
      const empty = root.querySelector('.empty-state') as HTMLElement;
      const status = root.querySelector('[role="status"]') as HTMLElement;
      const title = empty.querySelector('.empty-state__title') as HTMLElement;
      const update = () => {
        const q = input.value.trim().toLowerCase();
        let shown = 0;
        list.querySelectorAll('li').forEach((li) => {
          const match = li.textContent!.toLowerCase().includes(q);
          li.hidden = !match;
          if (match) shown += 1;
        });
        list.hidden = shown === 0;
        empty.hidden = shown > 0;
        title.textContent = `No plants match “${input.value.trim()}”`;
        status.textContent = shown ? `${shown} of ${plants.length} plants` : 'No plants match';
      };
      input.addEventListener('input', update);
      root.querySelector('.empty-state .button')!.addEventListener('click', () => {
        input.value = '';
        update();
        input.focus();
      });
    });
    return `
      <div id="search-demo" class="stack" style="max-inline-size: 30rem;">
        <div class="field">
          <label for="plant-search" class="field__label label">Search plants</label>
          <input id="plant-search" type="search" class="input" value="fern" autocomplete="off" />
        </div>
        <p role="status" class="small-text text-muted">No plants match</p>
        <ul class="stack" hidden>${plants.map((p) => `<li hidden>${p}</li>`).join('')}</ul>
        ${searchMiss()}
      </div>`;
  },
};

export const FirstUse: Story = {
  name: 'First use',
  parameters: {
    docs: {
      description: {
        story: 'A first-use state shows the action that fills it. One primary action; anything else is secondary.',
      },
    },
  },
  render: () => `
    <div style="max-inline-size: 36rem;">
      ${emptyState({
        glyph: 'Plus',
        cls: 'empty-state--accent',
        tag: 'h2',
        title: 'Plan your first border',
        description: 'Add plants to a border to see when it flowers and what it needs through the year.',
        actions: `
          <button type="button" class="button button--strong button--accent">${icon('Plus')}<span>New border</span></button>
          <button type="button" class="button">${icon('Upload')}<span>Import a plant list</span></button>`,
      })}
    </div>`,
};

export const Intents: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Intent tints the icon box and colours its icon. Colour is never the only signal: each icon and title says what happened. An error that leaves a region empty offers a retry; a page-level error is a banner with `role="alert"`.',
      },
    },
  },
  render: () => `
    <div class="grid grid--auto-fit grid--2xs gap-lg">
      ${emptyState({ cls: 'empty-state--success', glyph: 'Check', title: 'All caught up', description: 'No plants need watering today.' })}
      ${emptyState({ cls: 'empty-state--info', glyph: 'Info', title: 'Nothing scheduled', description: 'Tasks you add for this week appear here.' })}
      ${emptyState({ cls: 'empty-state--warning', glyph: 'Warning', title: 'No recent readings', description: 'The soil sensor last reported 3 days ago.' })}
      ${emptyState({
        cls: 'empty-state--danger',
        glyph: 'Error',
        title: 'Couldn’t load your plants',
        description: 'The connection dropped. Your list is safe.',
        actions: '<button type="button" class="button">Try again</button>',
      })}
    </div>`,
};

export const Subtle: Story = {
  name: 'Subtle (drop zone)',
  parameters: {
    docs: {
      description: {
        story: '`--subtle` draws a dashed, tinted frame with padding: a slot waiting for content, or a drop zone. The default has no frame or padding.',
      },
    },
  },
  render: () => `
    <div style="max-inline-size: 36rem;">
      ${emptyState({
        cls: 'empty-state--subtle',
        glyph: 'Upload',
        title: 'Add photos of this border',
        description: 'Drop JPEG or PNG files here, up to 10MB each.',
        actions: '<button type="button" class="button">Choose files</button>',
      })}
    </div>`,
};

export const InACard: Story = {
  name: 'In a card',
  parameters: {
    docs: {
      description: {
        story: 'The card body supplies the padding. A compact empty state suits a small card.',
      },
    },
  },
  render: () => `
    <div class="grid grid--auto-fit grid--2xs gap-lg">
      <article class="card">
        <header class="card__header"><h3 class="card__title small-heading">Watering</h3></header>
        <div class="card__body">
          ${emptyState({ cls: 'empty-state--success', glyph: 'Check', tag: 'h4', title: 'All caught up', description: 'Nothing needs watering until Thursday.' })}
        </div>
      </article>
      <article class="card">
        <header class="card__header"><h3 class="card__title small-heading">Recent activity</h3></header>
        <div class="card__body">
          ${emptyState({ cls: 'empty-state--compact', glyph: 'Bell', tag: 'h4', titleCls: 'small-heading', title: 'No activity yet', description: 'Changes to your borders show here.' })}
        </div>
      </article>
    </div>`,
};

export const InATable: Story = {
  name: 'In a table',
  parameters: {
    docs: {
      description: {
        story: 'One row with a cell spanning every column. The header row stays, so the columns are still named.',
      },
    },
  },
  render: () => `
    <div class="table-container" tabindex="0" role="region" aria-labelledby="stock-caption" style="max-inline-size: 44rem;">
      <table class="table">
        <caption id="stock-caption" class="small-heading">Plants in stock</caption>
        <thead>
          <tr>
            <th scope="col">Plant</th>
            <th scope="col">Position</th>
            <th scope="col" class="table__cell--numeric">Height (cm)</th>
            <th scope="col" class="table__cell--numeric">In stock</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colspan="4">
              ${emptyState({
                cls: 'empty-state--compact padding-block-lg',
                tag: 'p',
                titleCls: 'small-heading',
                title: 'No plants match “fern”',
                description: 'Check the spelling, or clear the filters.',
                actions: '<button type="button" class="button">Clear filters</button>',
              })}
            </td>
          </tr>
        </tbody>
      </table>
    </div>`,
};

export const Compact: Story = {
  parameters: {
    docs: {
      description: {
        story: '`--compact`, or any compact region (`.ui-compact`), steps the text, the icon box and the buttons down. `--start` aligns to the start edge, for a narrow sidebar.',
      },
    },
  },
  render: () => `
    <div class="cluster gap-lg items-start">
      <div style="inline-size: 16rem;">${searchMiss('empty-state--compact', 'small-heading')}</div>
      <aside class="ui-compact card" style="inline-size: 16rem;" aria-label="Filters">
        <div class="card__body">${searchMiss('empty-state--start', 'small-heading')}</div>
      </aside>
    </div>`,
};

export const RightToLeft: Story = {
  name: 'Right to left',
  render: () => `
    <div dir="rtl" lang="ar" class="grid grid--auto-fit grid--2xs gap-lg">
      ${emptyState({
        title: 'لا توجد نباتات مطابقة',
        description: 'تحقق من الإملاء، أو امسح عوامل التصفية.',
        actions: '<button type="button" class="button">مسح عوامل التصفية</button>',
      })}
      ${emptyState({
        cls: 'empty-state--start empty-state--subtle',
        glyph: 'Upload',
        title: 'أضف صوراً',
        description: 'اسحب الملفات وأفلتها هنا.',
        actions: '<button type="button" class="button">اختر ملفات</button>',
      })}
    </div>`,
};
