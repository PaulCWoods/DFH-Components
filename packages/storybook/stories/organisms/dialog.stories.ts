import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Organisms/Dialog',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
A native \`<dialog class="dialog">\` opened as a modal: top-layer placement, size, backdrop, motion and the page's scroll lock. The surface is a \`.card\` inside it, and every button in it is an ordinary \`.button\`. A non-modal floating panel is a popover, not a dialog opened with \`show()\`.

### Markup
\`\`\`html
<button type="button" class="button" commandfor="rename-dialog" command="show-modal">
  <span>Rename</span>
</button>

<dialog id="rename-dialog" class="dialog" aria-labelledby="rename-title">
  <article class="card">
    <header class="card__header">
      <h2 id="rename-title" class="card__title heading">Rename plot</h2>
      <button type="button" class="button button--plain button--icon" commandfor="rename-dialog" command="close">
        <span class="sr-only">Close</span>
        <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Close"/></svg>
      </button>
    </header>
    <div class="card__body">…</div>
    <footer class="card__footer justify-end">
      <form method="dialog" class="button-group">
        <button type="submit" value="cancel" class="button"><span>Cancel</span></button>
        <button type="submit" value="save" class="button button--strong button--accent"><span>Save</span></button>
      </form>
    </footer>
  </article>
</dialog>
\`\`\`

| Axis | Values |
| :--- | :--- |
| Placement | centred (default); \`.dialog--top\`; \`.dialog--drawer\` (inline end); \`.dialog--drawer.dialog--start\` (inline start); \`.dialog--bottom\`; \`.dialog--drawer.dialog--bottom\` (a bottom sheet) |
| Scroll | \`.card__body--scrollable\` (the body, between a pinned header and footer); \`.dialog--scrollable\` (the whole card) |

- **Opening and closing.** \`command="show-modal"\` (or \`showModal()\`) opens it; \`command="close"\` on the header's close button and a \`form method="dialog"\` around the footer actions close it, and the submit button's \`value\` becomes the dialog's \`returnValue\`. Escape closes it. \`closedby="any"\` adds light dismiss where supported; leave it off a dialog holding unsaved input.
- **Focus.** The first focusable element takes focus, or the one with \`autofocus\`: the first field of a form, the safe action of a destructive confirmation. Focus returns to the opener on close.
- **Semantics.** Name it with \`aria-labelledby\`. A confirmation that interrupts takes \`role="alertdialog"\` and \`aria-describedby\` on its message. No \`aria-modal\` (\`showModal()\` makes the page inert). \`aria-haspopup="dialog"\` on the opener is optional.
- **Size.** \`--dialog-width\` (36rem) on one dialog or a region; \`--dialog-drawer-width\` for drawers. There are no size modifiers. On a narrow screen a drawer leaves a 3rem strip of the page beside it.
- **Scroll lock.** While a modal is open the page doesn't scroll and keeps its scrollbar gutter.
- **Motion.** Fades and moves in over \`--duration-sm\`; exit mirrors entry. Reduced motion keeps the fade only; more contrast drops the backdrop blur.
- **Without a card** (an image, a video), the dialog draws a card's surface itself.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const icon = (name: string) =>
  `<svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#${name}"/></svg>`;

const opener = (id: string, label: string, cls = 'button') =>
  `<button type="button" class="${cls}" commandfor="${id}" command="show-modal" aria-haspopup="dialog"><span>${label}</span></button>`;

const closeButton = (id: string, label = 'Close') =>
  `<button type="button" class="button button--plain button--icon" commandfor="${id}" command="close"><span class="sr-only">${label}</span>${icon('Close')}</button>`;

const actions = (cancel = 'Cancel', confirm = 'Save', value = 'save') => `
  <footer class="card__footer justify-end">
    <form method="dialog" class="button-group">
      <button type="submit" value="cancel" class="button"><span>${cancel}</span></button>
      <button type="submit" value="${value}" class="button button--strong button--accent"><span>${confirm}</span></button>
    </form>
  </footer>`;

const paragraphs = (n: number) =>
  Array.from(
    { length: n },
    (_, i) =>
      `<p class="text">${i + 1}. Plot holders share the tool locker, the water butts and the compost bays. Return tools clean, close the butt lids after use, and turn the compost on your rota week.</p>`,
  ).join('');

const tree = (label: string) => `
  <nav class="navigation-tree" aria-labelledby="${label}">
    <ul role="list">
      <li><a href="#" class="button" aria-current="page">Plots</a></li>
      <li><a href="#" class="button">Rota</a></li>
      <li><a href="#" class="button">Tool locker</a></li>
      <li><a href="#" class="button">Members</a></li>
    </ul>
  </nav>`;

/* Opens the story's dialog on the canvas so its contents are seen and checked.
   Docs pages don't run play, so the openers stay the way in there. */
const openOnLoad: Story['play'] = async ({ canvasElement }) => {
  canvasElement.querySelector<HTMLDialogElement>('dialog')?.showModal();
};

export const Playground: Story = {
  args: {
    placement: 'centred',
    scroll: 'body',
    lightDismiss: false,
    paragraphs: 6,
  },
  argTypes: {
    placement: { control: 'inline-radio', options: ['centred', 'top', 'bottom', 'drawer end', 'drawer start', 'bottom sheet'] },
    scroll: { control: 'inline-radio', options: ['body', 'whole card'] },
    lightDismiss: { control: 'boolean', description: '`closedby="any"`' },
    paragraphs: { control: { type: 'range', min: 1, max: 20 } },
  },
  render: (args) => {
    const cls = [
      'dialog',
      args.placement === 'top' && 'dialog--top',
      ['drawer end', 'drawer start', 'bottom sheet'].includes(args.placement) && 'dialog--drawer',
      args.placement === 'drawer start' && 'dialog--start',
      ['bottom', 'bottom sheet'].includes(args.placement) && 'dialog--bottom',
      args.scroll === 'whole card' && 'dialog--scrollable',
    ]
      .filter(Boolean)
      .join(' ');
    const bodyScroll = args.scroll === 'body' ? ' card__body--scrollable" tabindex="0" aria-label="Rules' : '';
    return `
      ${opener('playground-dialog', 'Open dialog')}
      <dialog id="playground-dialog" class="${cls}" aria-labelledby="playground-title"${args.lightDismiss ? ' closedby="any"' : ''}>
        <article class="card">
          <header class="card__header">
            <h2 id="playground-title" class="card__title heading">Locker rules</h2>
            ${closeButton('playground-dialog')}
          </header>
          <div class="card__body stack${bodyScroll}">${paragraphs(args.paragraphs)}</div>
          ${actions('Cancel', 'Agree', 'agree')}
        </article>
      </dialog>`;
  },
  play: openOnLoad,
};

export const Confirmation: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'A confirmation interrupts to ask for a decision: `role="alertdialog"`, the message in `aria-describedby`, and `autofocus` on the safe action. The danger action says what it does and carries an icon. `--dialog-width` narrows this one.',
      },
    },
  },
  render: () => `
    ${opener('delete-dialog', 'Delete plot', 'button button--danger')}
    <dialog id="delete-dialog" class="dialog" role="alertdialog" aria-labelledby="delete-title" aria-describedby="delete-message" style="--dialog-width: 28rem;">
      <article class="card">
        <header class="card__header">
          <h2 id="delete-title" class="card__title heading">Delete plot A-14?</h2>
        </header>
        <div class="card__body">
          <p id="delete-message" class="text">Its sowing records and rota weeks go too. This can't be undone.</p>
        </div>
        <footer class="card__footer justify-end">
          <form method="dialog" class="button-group">
            <button type="submit" value="cancel" class="button" autofocus><span>Keep plot</span></button>
            <button type="submit" value="delete" class="button button--strong button--danger">${icon('Delete')}<span>Delete plot</span></button>
          </form>
        </footer>
      </article>
    </dialog>`,
  play: openOnLoad,
};

export const FormDialog: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'The card is the `form method="dialog"`, so Enter in a field submits it. `autofocus` puts focus in the first field. Cancel is a close command rather than a second submit button, so Enter never cancels. The submit button\'s `value` becomes `returnValue`, read here in the `close` event.',
      },
    },
  },
  render: () => `
    <div class="stack">
      <div>${opener('rename-dialog', 'Rename plot')}</div>
      <p id="rename-result" class="small-text text-muted" role="status"></p>
    </div>
    <dialog id="rename-dialog" class="dialog" aria-labelledby="rename-title"
      onclose="document.getElementById('rename-result').textContent = 'returnValue: ' + (this.returnValue || '(none)'); this.returnValue = ''">
      <form method="dialog" class="card">
        <header class="card__header">
          <h2 id="rename-title" class="card__title heading">Rename plot</h2>
          ${closeButton('rename-dialog')}
        </header>
        <div class="card__body">
          <div class="field">
            <label for="plot-name" class="field__label label">Plot name</label>
            <p id="plot-name-hint" class="field__hint small-text">Shown on the rota and the gate board.</p>
            <input id="plot-name" name="name" class="input" value="A-14" required aria-describedby="plot-name-hint" autofocus />
          </div>
        </div>
        <footer class="card__footer justify-end">
          <div class="button-group">
            <button type="button" class="button" commandfor="rename-dialog" command="close"><span>Cancel</span></button>
            <button type="submit" value="save" class="button button--strong button--accent"><span>Save</span></button>
          </div>
        </footer>
      </form>
    </dialog>`,
  play: openOnLoad,
};

export const ScrollingBody: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`.card__body--scrollable`: the header and footer stay put and the body scrolls. The body is focusable and named, so keyboard users can scroll it.',
      },
    },
  },
  render: () => `
    ${opener('rules-dialog', 'Read the rules')}
    <dialog id="rules-dialog" class="dialog" aria-labelledby="rules-title">
      <article class="card">
        <header class="card__header">
          <h2 id="rules-title" class="card__title heading">Site rules</h2>
          ${closeButton('rules-dialog')}
        </header>
        <div class="card__body card__body--scrollable stack" tabindex="0" aria-label="Site rules">${paragraphs(14)}</div>
        ${actions('Cancel', 'Agree', 'agree')}
      </article>
    </dialog>`,
  play: openOnLoad,
};

export const WholeCardScrolls: Story = {
  parameters: {
    docs: {
      description: {
        story: '`.dialog--scrollable`: the header, body and footer scroll as one, for long reading where the actions belong at the end.',
      },
    },
  },
  render: () => `
    ${opener('terms-dialog', 'Read the terms')}
    <dialog id="terms-dialog" class="dialog dialog--scrollable" aria-labelledby="terms-title">
      <article class="card" tabindex="0" aria-label="Terms">
        <header class="card__header">
          <h2 id="terms-title" class="card__title heading">Tenancy terms</h2>
          ${closeButton('terms-dialog')}
        </header>
        <div class="card__body stack">${paragraphs(14)}</div>
        ${actions('Decline', 'Accept', 'accept')}
      </article>
    </dialog>`,
  play: openOnLoad,
};

export const Top: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`.dialog--top`: pinned to the top, so a field stays above an on-screen keyboard and the dialog doesn't move as its content grows.",
      },
    },
  },
  render: () => `
    ${opener('find-dialog', 'Find a plant')}
    <dialog id="find-dialog" class="dialog dialog--top" aria-labelledby="find-title">
      <article class="card">
        <header class="card__header">
          <h2 id="find-title" class="card__title heading">Find a plant</h2>
          ${closeButton('find-dialog')}
        </header>
        <div class="card__body">
          <div class="field">
            <label for="find-input" class="field__label label">Plant name</label>
            <input id="find-input" type="search" class="input" autofocus />
          </div>
        </div>
      </article>
    </dialog>`,
  play: openOnLoad,
};

const settingsDrawer = (id: string, cls: string) => `
  ${opener(id, 'Settings')}
  <dialog id="${id}" class="dialog dialog--drawer${cls}" aria-labelledby="${id}-title">
    <article class="card">
      <header class="card__header">
        <h2 id="${id}-title" class="card__title heading">Settings</h2>
        ${closeButton(id)}
      </header>
      <div class="card__body card__body--scrollable stack" tabindex="0" aria-label="Settings">
        <div class="field">
          <label for="${id}-reminder" class="field__label label">Rota reminder</label>
          <select id="${id}-reminder" class="select">
            <option>The day before</option>
            <option>On the day</option>
            <option>Never</option>
          </select>
        </div>
        ${paragraphs(3)}
      </div>
      ${actions()}
    </article>
  </dialog>`;

export const Bottom: Story = {
  parameters: {
    docs: {
      description: {
        story: '`.dialog--bottom`: a floating dialog pinned near the bottom, within reach of a thumb. An on-screen keyboard can cover it, so use `.dialog--top` for anything with a field.',
      },
    },
  },
  render: () => `
    ${opener('leave-dialog', 'Leave the rota')}
    <dialog id="leave-dialog" class="dialog dialog--bottom" aria-labelledby="leave-title">
      <article class="card">
        <header class="card__header">
          <h2 id="leave-title" class="card__title heading">Leave the rota?</h2>
          ${closeButton('leave-dialog')}
        </header>
        <div class="card__body"><p class="text">Your weeks go back into the shared pool.</p></div>
        ${actions('Stay', 'Leave', 'leave')}
      </article>
    </dialog>`,
  play: openOnLoad,
};

export const DrawerEnd: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`.dialog--drawer`: a full-height panel on the inline end, for settings and details. It slides in from that edge, and leaves a 3rem strip of the page on a narrow screen.',
      },
    },
  },
  render: () => settingsDrawer('settings-drawer', ''),
  play: openOnLoad,
};

export const BottomSheet: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`.dialog--drawer.dialog--bottom`: a drawer on the bottom edge, full width and flush with the bottom edge, as tall as its content, for a short choice on a phone. There is no drag to dismiss.',
      },
    },
  },
  render: () => settingsDrawer('settings-sheet', ' dialog--bottom'),
  play: openOnLoad,
};

export const DrawerStart: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`.dialog--drawer.dialog--start`: the drawer on the inline start, for navigation, where the navigation sits on a wide screen. Opened by a menu button.',
      },
    },
  },
  render: () => `
    <button type="button" class="button button--plain button--icon" commandfor="nav-drawer" command="show-modal" aria-haspopup="dialog">
      <span class="sr-only">Menu</span>${icon('Navigation')}
    </button>
    <dialog id="nav-drawer" class="dialog dialog--drawer dialog--start" aria-labelledby="nav-drawer-title">
      <article class="card">
        <header class="card__header">
          <h2 id="nav-drawer-title" class="card__title heading">Allotment</h2>
          ${closeButton('nav-drawer', 'Close menu')}
        </header>
        <div class="card__body card__body--scrollable">${tree('nav-drawer-title')}</div>
      </article>
    </dialog>`,
  play: openOnLoad,
};

export const RightToLeft: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'In right-to-left text the start drawer opens from the right and slides in from that edge. Nothing in the markup changes but `dir`.',
      },
    },
  },
  render: () => `
    <div dir="rtl" lang="ar">
      <button type="button" class="button button--plain button--icon" commandfor="rtl-drawer" command="show-modal" aria-haspopup="dialog">
        <span class="sr-only">القائمة</span>${icon('Navigation')}
      </button>
      <dialog id="rtl-drawer" class="dialog dialog--drawer dialog--start" aria-labelledby="rtl-drawer-title">
        <article class="card">
          <header class="card__header">
            <h2 id="rtl-drawer-title" class="card__title heading">الحديقة</h2>
            ${closeButton('rtl-drawer', 'إغلاق')}
          </header>
          <div class="card__body card__body--scrollable">
            <nav class="navigation-tree" aria-labelledby="rtl-drawer-title">
              <ul role="list">
                <li><a href="#" class="button" aria-current="page">القطع</a></li>
                <li><a href="#" class="button">المناوبات</a></li>
                <li><a href="#" class="button">الأدوات</a></li>
              </ul>
            </nav>
          </div>
        </article>
      </dialog>
    </div>`,
  play: openOnLoad,
};

export const LightDismiss: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`closedby="any"`: a click on the backdrop closes it, as well as Escape and the buttons. Where it isn\'t supported, Escape and the buttons still work. Leave it off a dialog holding unsaved input.',
      },
    },
  },
  render: () => `
    ${opener('rota-dialog', 'This week\'s rota')}
    <dialog id="rota-dialog" class="dialog" aria-labelledby="rota-title" closedby="any">
      <article class="card">
        <header class="card__header">
          <h2 id="rota-title" class="card__title heading">This week's rota</h2>
          ${closeButton('rota-dialog')}
        </header>
        <div class="card__body">
          <p class="text">Compost: plots A-12 to A-16. Water butts: plot B-3. Gate board: plot C-7.</p>
        </div>
      </article>
    </dialog>`,
  play: openOnLoad,
};

export const WithoutACard: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Content that isn\'t a card, such as a single image, sits straight in the dialog, which then draws a card\'s surface around it.',
      },
    },
  },
  render: () => `
    ${opener('plan-dialog', 'View site plan')}
    <dialog id="plan-dialog" class="dialog" aria-labelledby="plan-title" closedby="any">
      <figure class="stack">
        <figcaption class="inline inline--between">
          <span id="plan-title" class="small-heading">Site plan</span>
          ${closeButton('plan-dialog')}
        </figcaption>
        <svg viewBox="0 0 320 180" role="img" aria-label="Three rows of plots, A to C, with the tool locker by the gate">
          <rect x="1" y="1" width="318" height="178" fill="none" stroke="currentColor" />
          ${['A', 'B', 'C']
      .map(
        (row, r) =>
          [0, 1, 2, 3]
            .map((c) => `<rect x="${20 + c * 60}" y="${20 + r * 50}" width="50" height="40" fill="none" stroke="currentColor" />`)
            .join('') + `<text x="270" y="${45 + r * 50}" fill="currentColor" font-size="14">${row}</text>`,
      )
      .join('')}
        </svg>
      </figure>
    </dialog>`,
  play: openOnLoad,
};
