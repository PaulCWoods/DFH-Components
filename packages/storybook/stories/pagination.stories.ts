import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Components/Pagination',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
**Pagination & Page Count Primitives** provide accessible multi-page dataset controls composing \`.button-group\`, \`.button\`, \`.divider\`, and \`.inline-form\`.

### Patterns
1. **Numeric Page Range**: Compact numbered buttons with active page indicator (\`.button--selected\` + \`aria-current="page"\`) and trailing ellipsis/divider.
2. **Directional Arrow Cluster**: Prev/Next navigation with directional SVGs (\`.icon--dir\`) and textual step indicator (\`.button-group__text\`).
3. **Page Count & Jump Input**: Flexible form with number input for direct jumping.
4. **Page Count & Jump Select**: Accessible drop-down selector for quick jumping.
`,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const NumericPagination: Story = {
  render: () => `
    <div style="display: flex; justify-content: center; font-family: var(--body-font-family);">
      <nav class="pagination button-group s-button:subtle" aria-label="Pagination">
        <span class="button button--selected" aria-current="page"><span>1</span></span>
        <a class="button" href="#page-2"><span>2</span></a>
        <a class="button" href="#page-3"><span>3</span></a>
        <a class="button" href="#page-4"><span>4</span></a>
        <hr class="divider">
        <a class="button" href="#page-100"><span>100</span></a>
      </nav>
    </div>
  `,
};

export const DirectionalControls: Story = {
  render: () => `
    <div style="display: flex; justify-content: center; font-family: var(--body-font-family);">
      <nav class="pagination button-group s-button:subtle" aria-label="Pagination">
        <span aria-disabled="true" class="button">
          <svg class="icon icon--dir" width="24" height="24" aria-hidden="true" focusable="false">
            <use href="#ArrowStart"/>
          </svg>
          <span class="visually-hidden">First page</span>
        </span>
        <span aria-disabled="true" class="button">
          <svg class="icon icon--dir" width="24" height="24" aria-hidden="true" focusable="false">
            <use href="#ArrowLeft"/>
          </svg>
          <span class="visually-hidden">Previous page</span>
        </span>
        <a class="button" href="#page-2">
          <svg class="icon icon--dir" width="24" height="24" aria-hidden="true" focusable="false">
            <use href="#ArrowRight"/>
          </svg>
          <span class="visually-hidden">Next page</span>
        </a>
        <a class="button" href="#page-10">
          <svg class="icon icon--dir" width="24" height="24" aria-hidden="true" focusable="false">
            <use href="#ArrowEnd"/>
          </svg>
          <span class="visually-hidden">Last page</span>
        </a>
        <hr class="divider">
        <span class="button-group__text">Page 1 of 10</span>
      </nav>
    </div>
  `,
};

export const PageCountWithJumpInput: Story = {
  render: () => `
    <div style="max-inline-size: 36rem; margin-inline: auto; font-family: var(--body-font-family);">
      <div class="page-count">
        <p class="page-count__info">Page 2 of 10</p>
        <form class="page-count__jump inline-form" onsubmit="event.preventDefault();">
          <div class="inline-field">
            <label for="page-box" class="field__label">Go to page</label>
            <input class="input" type="number" id="page-box" name="page-box" min="1" max="10" value="2" style="inline-size: 5rem;">
          </div>
          <button class="button" type="submit"><span>Go</span></button>
        </form>
      </div>
    </div>
  `,
};

export const PageCountWithJumpSelect: Story = {
  render: () => `
    <div style="max-inline-size: 36rem; margin-inline: auto; font-family: var(--body-font-family);">
      <div class="page-count">
        <p class="page-count__info">Page 2 of 10</p>
        <form class="page-count__jump inline-form" onsubmit="event.preventDefault();">
          <div class="inline-field">
            <label for="page-select" class="field__label">Go to page</label>
            <select name="page-select" id="page-select" class="select">
              <option value="1">1</option>
              <option value="2" selected>2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>
          <button class="visually-hidden" type="submit"><span>Go</span></button>
        </form>
      </div>
    </div>
  `,
};
