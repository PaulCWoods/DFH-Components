import type { Meta, StoryObj } from '@storybook/html';

interface TextareaArgs {
  label: string;
  placeholder?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  size?: 'sm' | 'md' | 'lg';
  oneLine?: boolean;
  rows?: number;
}

const meta: Meta<TextareaArgs> = {
  title: 'Atoms/Textarea',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
### Developer & Designer Notes: Textarea Primitive

The **Textarea** primitive provides multiline text input powered by native CSS \`field-sizing: content\`. It grows and shrinks automatically with user-entered text without requiring JavaScript resize listeners, mutation observers, or hidden mirror elements.
Built with zero-specificity \`:where()\`, a local private variable manifest (\`--_textarea-*\`), and native style container queries.

---

#### 1. Canonical Semantic Markup Signature
AI agents and developers MUST use the following markup structure:

\`\`\`html
<div class="field">
  <label for="user-feedback" class="field__label">User Feedback</label>
  <p id="user-feedback-hint" class="field__hint">Markdown formatting is supported. Maximum 2,000 characters.</p>
  <textarea 
    id="user-feedback" 
    class="textarea" 
    rows="3" 
    placeholder="Tell us what you think..."
    aria-describedby="user-feedback-hint"
    required
  ></textarea>
</div>
\`\`\`

---

#### 2. WCAG 2.2 Conformance Matrix

| Criterion | Level | Implementation Strategy |
| :--- | :---: | :--- |
| **2.5.5 Target Size (Enhanced)** | **AAA** | Defaults to minimum block size (\`calc(3 * 1lh + padding)\`) ensuring generous clickable area well exceeding 48px. |
| **2.5.8 Target Size (Minimum)** | **AA** | Compact (\`textarea--sm\`) controls maintain minimum touch clearances exceeding the 24x24px threshold. |
| **1.4.3 / 1.4.11 Contrast** | **AA** | 4.5:1 text contrast for typed content and 3:1 graphical boundaries for resting borders, focus rings, and validation indicators. |
| **2.4.7 / 2.4.13 Focus Visible** | **AA/AAA** | High-contrast focus ring (\`--focus-ring-width: 2px solid var(--focus-ring-color)\`, \`--focus-ring-offset: 2px\`) with at least 3:1 contrast against surrounding surfaces. |
| **3.3.1 Error Identification** | **A** | Paired with \`aria-invalid="true"\` and connected via \`aria-describedby\` to a live \`<p class="field__error" role="alert">\`. |
| **Modern Auto-Growth & Validation** | **Standard** | Employs native CSS \`field-sizing: content\` bounded between \`--_textarea-lines-min\` and \`--_textarea-lines-max\`. \`:user-invalid\` only fires after interaction. |

---

#### 3. CSS Custom Property Contract Table

| Custom Property | Fallback | Intended Purpose |
| :--- | :--- | :--- |
| \`--textarea-lines-min\` | \`3\` | Minimum line count before scrolling starts |
| \`--textarea-lines-max\` | \`16\` | Maximum line count before vertical scrollbar engages |
| \`--textarea-bg\` | \`--surface-card\` (#ffffff) | Textarea canvas fill color |
| \`--textarea-border-width\` | \`--border-width\` (1px) | Stroke thickness |
| \`--textarea-border-color\` | \`--border-color-quiet\` (\`currentColor\`) | Resting border stroke color |
| \`--textarea-color\` | \`--foreground\` (\`currentColor\`) | Typed multiline text color |
| \`--textarea-font-size\` | \`--typography-font-size-0\` (1rem) | Text scale step |
| \`--textarea-line-height\` | \`--typography-line-height-4\` (1.5) | Text line height (lh unit driver) |
| \`--textarea-padding-block\` | \`--spacing-8\` (0.5rem) | Vertical inner clearance |
| \`--textarea-padding-inline\` | \`--spacing-16\` (1rem) | Horizontal inner clearance |
| \`--textarea-radius\` | \`--radius\` (0.25rem) | Corner curvature |
| \`--textarea-placeholder-color\` | \`--foreground-muted\` | Accessible placeholder text color |
| \`--textarea-transition\` | \`--duration-sm\` (150ms) | Transition duration for hover and focus |

---

#### 4. Zero-Class Container Style Queries (\`@container style(...)\`)
Parents can declaratively orchestrate textarea sizing, borders, and density without utility classes:

\`\`\`css
/* Example: In-place editable comment row or dense inspector */
.comment-composer {
  --textarea-variation: plain;
  --ui-density: dense;
}
\`\`\`
`,
      },
    },
  },
  argTypes: {
    label: {
      description: 'Associated field label text',
      control: 'text',
      defaultValue: 'User Feedback',
    },
    placeholder: {
      description: 'Helper placeholder text',
      control: 'text',
      defaultValue: 'Tell us how we can improve your accessibility experience...',
    },
    hint: {
      description: 'Supporting hint description',
      control: 'text',
      defaultValue: 'Markdown formatting is supported. Maximum 2,000 characters.',
    },
    error: {
      description: 'Validation error message',
      control: 'text',
      defaultValue: '',
    },
    required: {
      description: 'HTML5 required validation attribute',
      control: 'boolean',
      defaultValue: false,
    },
    disabled: {
      description: 'Disabled interaction state',
      control: 'boolean',
      defaultValue: false,
    },
    readonly: {
      description: 'Read-only state',
      control: 'boolean',
      defaultValue: false,
    },
    size: {
      description: 'Textarea sizing variant',
      control: 'select',
      options: ['sm', 'md', 'lg'],
      defaultValue: 'md',
    },
    oneLine: {
      description: 'Start with 1-line height and expand dynamically on typing',
      control: 'boolean',
      defaultValue: false,
    },
    rows: {
      description: 'Default fallback row count',
      control: 'number',
      defaultValue: 3,
    },
  },
  render: (args) => {
    const textareaId = 'playground-textarea-field';
    const hintId = `${textareaId}-hint`;
    const errorId = `${textareaId}-error`;

    const sizeClass = args.size && args.size !== 'md' ? `textarea--${args.size}` : '';
    const oneLineClass = args.oneLine ? 'textarea--one-line' : '';
    const textareaClasses = ['textarea', sizeClass, oneLineClass].filter(Boolean).join(' ');

    const describedBy = [
      args.hint ? hintId : '',
      args.error ? errorId : '',
    ].filter(Boolean).join(' ') || undefined;

    return `
      <div class="demo-stage demo-constrained--md">
        <div class="field">
          <label for="${textareaId}" class="field__label">
            ${args.label}
          </label>
          ${args.hint ? `<p id="${hintId}" class="field__hint">${args.hint}</p>` : ''}
          <textarea 
            id="${textareaId}"
            class="${textareaClasses}"
            rows="${args.rows || 3}"
            placeholder="${args.placeholder || ''}"
            ${args.required ? 'required' : ''}
            ${args.disabled ? 'disabled' : ''}
            ${args.readonly ? 'readonly' : ''}
            ${describedBy ? `aria-describedby="${describedBy}"` : ''}
            ${args.error ? 'aria-invalid="true"' : ''}
          ></textarea>
          ${args.error ? `
            <p id="${errorId}" class="field__error" role="alert">
              <span>${args.error}</span>
            </p>
          ` : ''}
        </div>
      </div>
    `;
  },
};

export default meta;
type Story = StoryObj<TextareaArgs>;

/**
 * 1. Playground (Interactive Sandbox)
 * Test auto-growth, sizing, states, and validation dynamically with Storybook controls.
 */
export const Playground: Story = {
  args: {
    label: 'User Feedback',
    placeholder: 'Tell us how we can improve your accessibility experience...',
    hint: 'Markdown formatting is supported. Maximum 2,000 characters.',
    error: '',
    required: true,
    disabled: false,
    readonly: false,
    size: 'md',
    oneLine: false,
    rows: 3,
  },
};

/**
 * 2. Anatomy & Structure Breakdown
 * Shows the accessible relationship between Label, Textarea, Hint, and Error elements.
 */
export const Anatomy: Story = {
  render: () => `
    <div class="demo-stage demo-constrained--md stack">
      <div class="demo-label">1. Label &rarr; 2. Textarea (Auto-growth) &rarr; 3. Hint Copy &rarr; 4. Live Error Alert</div>
      
      <div class="field">
        <label for="anatomy-textarea" class="field__label">Project Scope Description</label>
        <p id="anatomy-textarea-hint" class="field__hint">Summarize key deliverables and target milestones.</p>
        <textarea 
          id="anatomy-textarea" 
          class="textarea" 
          rows="3"
          placeholder="e.g. Full audit of WCAG 2.2 AA checkpoints across all form elements..." 
          aria-describedby="anatomy-textarea-hint anatomy-textarea-error"
          aria-invalid="true"
        >Too brief</textarea>
        <p id="anatomy-textarea-error" class="field__error" role="alert">
          Please provide a description of at least 20 characters.
        </p>
      </div>
    </div>
  `,
};

/**
 * 3. Variants & Behaviors
 * Demonstrates standard multiline start, one-line initial expanding textarea, and borderless variations.
 */
export const Variants: Story = {
  render: () => `
    <div class="demo-stage demo-constrained--md stack">
      <!-- Standard Multiline -->
      <div class="field">
        <div class="demo-label">Default Multiline Textarea (rows="3")</div>
        <textarea class="textarea" rows="3" placeholder="Starts at 3 lines of height, expands as content increases..."></textarea>
      </div>

      <hr class="divider" />

      <!-- One-Line Initial Expandable -->
      <div class="field">
        <div class="demo-label">One-Line Initial (.textarea--one-line)</div>
        <textarea class="textarea textarea--one-line" placeholder="Starts as single-line like a text input, expands dynamically on newline..."></textarea>
      </div>

      <hr class="divider" />

      <!-- Plain / Borderless -->
      <div class="field">
        <div class="demo-label">Plain Variation (.textarea--plain)</div>
        <textarea class="textarea textarea--plain" placeholder="Frameless textarea for in-place card note taking..."></textarea>
      </div>

      <hr class="divider" />

      <!-- Flush Variation -->
      <div class="field">
        <div class="demo-label">Flush Variation (.textarea--flush)</div>
        <textarea class="textarea textarea--flush" placeholder="Flush padding edge-to-edge inline composer..."></textarea>
      </div>
    </div>
  `,
};

/**
 * 4. State Matrix
 * Side-by-side verification of Resting, Filled, Invalid, Readonly, and Disabled interaction states.
 */
export const StateMatrix: Story = {
  render: () => `
    <div class="demo-stage demo-constrained--md stack">
      <!-- Resting Empty -->
      <div class="field">
        <label for="state-textarea-resting" class="field__label">Resting (Unfocused)</label>
        <textarea id="state-textarea-resting" class="textarea" placeholder="Resting multiline input..."></textarea>
      </div>

      <!-- Filled Value -->
      <div class="field">
        <label for="state-textarea-filled" class="field__label">Filled Value</label>
        <textarea id="state-textarea-filled" class="textarea">The quick brown fox jumps over the lazy dog. Notice how the textarea expands naturally without vertical scrollbars until reaching the max-lines limit.</textarea>
      </div>

      <!-- Explicit Invalid State -->
      <div class="field">
        <label for="state-textarea-invalid" class="field__label">Invalid State (aria-invalid="true")</label>
        <textarea 
          id="state-textarea-invalid" 
          class="textarea" 
          aria-invalid="true"
          aria-describedby="state-textarea-invalid-error"
        >Contains invalid markdown syntax [missing link</textarea>
        <p id="state-textarea-invalid-error" class="field__error" role="alert">
          Unclosed markdown bracket detected. Please close all tags.
        </p>
      </div>

      <!-- Read-Only State -->
      <div class="field">
        <label for="state-textarea-readonly" class="field__label">Read-Only (Dashed Border)</label>
        <textarea id="state-textarea-readonly" class="textarea" readonly>This audit trail log is archived and cannot be edited. It maintains full selectability and screen reader accessibility.</textarea>
      </div>

      <!-- Disabled State -->
      <div class="field">
        <label for="state-textarea-disabled" class="field__label">Disabled State</label>
        <textarea id="state-textarea-disabled" class="textarea" disabled>Service unavailable. This input is currently disabled.</textarea>
      </div>
    </div>
  `,
};

/**
 * 5. Sizes & Density (WCAG Target Compliance)
 * Small (meets WCAG 2.5.8), Standard (meets WCAG 2.5.5 AAA), and Large.
 */
export const SizesAndDensity: Story = {
  render: () => `
    <div class="demo-stage demo-constrained--md stack">
      <!-- Small -->
      <div class="field">
        <div class="demo-label">Small (.textarea--sm / Compact font and padding)</div>
        <textarea class="textarea textarea--sm" placeholder="Compact annotations and side-panel notes..."></textarea>
      </div>

      <hr class="divider" />

      <!-- Medium (Default) -->
      <div class="field">
        <div class="demo-label">Standard (.textarea / Default 1rem scale)</div>
        <textarea class="textarea" placeholder="Standard responsive comment..."></textarea>
      </div>

      <hr class="divider" />

      <!-- Large -->
      <div class="field">
        <div class="demo-label">Large (.textarea--lg / 1.125rem editorial scale)</div>
        <textarea class="textarea textarea--lg" placeholder="Large editorial copy and article body..."></textarea>
      </div>
    </div>
  `,
};

/**
 * 6. Zero-Class Container Style Queries (@container style(...))
 * Shows how parent containers orchestrate child textarea density and variations without utility classes.
 */
export const ZeroClassOrchestration: Story = {
  render: () => `
    <div class="stack demo-constrained--md">
      <!-- Dense Container -->
      <div class="demo-label">Parent: style="--ui-density: dense;"</div>
      <div class="demo-stage stack" style="--ui-density: dense;">
        <div class="field">
          <label for="csq-dense-notes" class="field__label">Reviewer Quick Notes</label>
          <textarea id="csq-dense-notes" class="textarea" placeholder="Dense reviewer notes scaled automatically..."></textarea>
        </div>
      </div>

      <!-- Plain Variation Container -->
      <div class="demo-label">Parent: style="--textarea-variation: plain;"</div>
      <div class="demo-stage" style="--textarea-variation: plain;">
        <div class="field">
          <label for="csq-plain-draft" class="field__label">In-Place Draft Editor</label>
          <textarea id="csq-plain-draft" class="textarea" placeholder="Borderless inline composer inherits transparent styling..."></textarea>
        </div>
      </div>
    </div>
  `,
};

/**
 * 7. Real-World Recipes & UI Compositions
 * Common production patterns where textarea is composed with avatars, cards, and buttons.
 */
export const RealWorldRecipes: Story = {
  render: () => `
    <div class="stack demo-constrained--lg">
      <!-- Recipe A: Social / Discussion Comment Composer -->
      <div class="card card--bordered">
        <article class="card__content">
          <header class="card__header" style="display: flex; align-items: center; gap: var(--spacing-12);">
            <div class="avatar" aria-label="Alex Morgan"><span>AM</span></div>
            <hgroup class="card__hgroup">
              <h3 class="card__title" style="margin: 0; font-size: var(--typography-font-size-0);">Add a Comment</h3>
              <p class="card__subtitle" style="margin: 0;">Collaborating on Design System Tokens</p>
            </hgroup>
          </header>
          <div class="card__body">
            <div class="field">
              <label for="recipe-comment" class="visually-hidden">Your Comment</label>
              <textarea 
                id="recipe-comment" 
                class="textarea textarea--one-line" 
                placeholder="Write a constructive response or feedback (supports Markdown)..."
              ></textarea>
            </div>
          </div>
          <footer class="card__footer" style="display: flex; justify-content: space-between; align-items: center;">
            <span class="chip">Markdown Supported</span>
            <div style="display: flex; gap: var(--spacing-8);">
              <button type="button" class="button button--subtle"><span>Cancel</span></button>
              <button type="button" class="button button--strong button--accent"><span>Post Comment</span></button>
            </div>
          </footer>
        </article>
      </div>

      <!-- Recipe B: Issue / Bug Reporter Card -->
      <div class="card card--bordered card--translucent">
        <article class="card__content">
          <header class="card__header">
            <h3 class="card__title subheading">Report an Accessibility Defect</h3>
            <p class="card__subtitle">Submit details directly to the accessibility engineering team.</p>
          </header>
          <div class="card__body stack">
            <div class="field">
              <label for="bug-summary" class="field__label">Defect Summary</label>
              <input id="bug-summary" type="text" class="input" placeholder="e.g. Focus ring clipped in mobile viewport" required />
            </div>

            <div class="field">
              <label for="bug-steps" class="field__label">Steps to Reproduce</label>
              <p id="bug-steps-hint" class="field__hint">Include keyboard navigation steps, screen reader used, and browser version.</p>
              <textarea 
                id="bug-steps" 
                class="textarea" 
                rows="4" 
                placeholder="1. Tab to navigation bar&#10;2. Press Enter to open dropdown&#10;3. Observe focus indicator..."
                aria-describedby="bug-steps-hint"
                required
              ></textarea>
            </div>
          </div>
          <footer class="card__footer" style="display: flex; justify-content: flex-end; gap: var(--spacing-8);">
            <button type="button" class="button button--subtle"><span>Discard</span></button>
            <button type="submit" class="button button--strong button--accent"><span>Submit Report</span></button>
          </footer>
        </article>
      </div>
    </div>
  `,
};
