import type { Meta, StoryObj } from '@storybook/html';

interface RangeArgs {
  value: number;
  min: number;
  max: number;
  step: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'success' | 'warning' | 'danger';
  disabled?: boolean;
  label?: string;
  unit?: string;
}

const meta: Meta<RangeArgs> = {
  title: 'Atoms/Range',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
### Developer & Designer Notes: Range Slider Primitive

The **Range** primitive provides an accessible HTML5 \`<input type="range">\` slider styled across browser rendering engines (WebKit, Blink, and Gecko).
Features custom runnable tracks, dynamic progress fill via CSS variable \`--value: X%\`, ergonomic grab thumbs, and full keyboard accessibility meeting WCAG 2.2 AA / AAA standards.

---

#### 1. Canonical Semantic Markup Signature
AI agents and developers MUST use the following markup structure:

\`\`\`html
<div class="field">
  <div class="field__header" style="display: flex; justify-content: space-between; align-items: baseline;">
    <label for="volume-control" class="field__label">Volume Level</label>
    <output for="volume-control" class="field__output" id="vol-readout">65%</output>
  </div>
  <input 
    id="volume-control" 
    type="range" 
    class="range" 
    min="0" 
    max="100" 
    value="65" 
    style="--value: 65%;"
    aria-describedby="vol-readout"
  />
</div>

<!-- Range Lockup Primitive (Action Button + Slider + Numerical Readout) -->
<!-- Note: Renamed from .range-group to .range-lockup to avoid conflict with native <rangegroup> -->
<div class="range-lockup range-lockup--sm">
  <button type="button" class="button button--subtle button--icon button--sm" aria-label="Mute audio">
    <svg class="icon"><use href="#VolumeOn"/></svg>
  </button>
  <input type="range" class="range range--sm" value="85" style="--value: 85%;" aria-label="Volume slider" />
  <output class="range-lockup__output">85%</output>
</div>
\`\`\`

---

#### 2. WCAG 2.2 Conformance Matrix

| Criterion | Level | Implementation Strategy |
| :--- | :---: | :--- |
| **2.5.5 Target Size (Enhanced)** | **AAA** | Default thumb size is **24px** with generous touch padding and grab target scaling on hover/tap. |
| **2.5.8 Target Size (Minimum)** | **AA** | Compact (\`range--sm\`) controls maintain a minimum thumb of **16px** with expanded tap area meeting mobile thresholds. |
| **1.4.3 / 1.4.11 Contrast** | **AA** | 3:1 graphical contrast for active track fill, thumb perimeter, and resting track against surfaces. |
| **2.4.7 / 2.4.13 Focus Visible** | **AA/AAA** | High-contrast focus ring bound to both the range element and thumb: \`--focus-ring-width: 2px solid var(--focus-ring-color)\`. |
| **2.1.1 Keyboard Accessibility** | **A** | Native keyboard support (Arrow keys, Home, End, Page Up, Page Down) with zero JavaScript dependencies. |
| **Cross-Engine Dual Support** | **Standard** | Dedicated styling for both WebKit runnable-tracks and Firefox \`::-moz-range-progress\` / \`::-moz-range-thumb\`. |

---

#### 3. CSS Custom Property Contract Table

| Custom Property | Fallback | Intended Purpose |
| :--- | :--- | :--- |
| \`--_range-track-height\` | \`--spacing-8\` (0.5rem) | Thickness of the horizontal slider bar |
| \`--_range-track-bg\` | \`--surface-muted\` (#E6E4DF) | Inactive track background color |
| \`--_range-thumb-size\` | \`--spacing-24\` (1.5rem) | Circular diameter of the interactive slider handle |
| \`--_range-thumb-bg\` | \`--foreground-accent\` (#008076) | Fill color of the slider thumb handle |
| \`--_range-fill-bg\` | \`--foreground-accent\` (#008076) | Active progress track fill color |
| \`--_range-transition\` | \`--duration-sm\` (200ms) | Hover and press scale micro-animation speed |
| \`--value\` | \`0%\` | Inline CSS custom property driving WebKit progress gradient |

---

#### 4. Zero-Class Container Style Queries (\`@container style(...)\`)
Parent cards or control panels can orchestrate slider sizing and colors without utility classes:

\`\`\`css
/* Example: Dense audio equalizer deck */
.audio-deck {
  --range-size: sm;
  --range-variant: success;
  --ui-density: dense;
}
\`\`\`
`,
      },
    },
  },
  argTypes: {
    value: {
      description: 'Current slider value',
      control: { type: 'range', min: 0, max: 100, step: 1 },
      defaultValue: 60,
    },
    min: {
      description: 'Minimum scale bound',
      control: 'number',
      defaultValue: 0,
    },
    max: {
      description: 'Maximum scale bound',
      control: 'number',
      defaultValue: 100,
    },
    step: {
      description: 'Granular step increment',
      control: 'number',
      defaultValue: 1,
    },
    size: {
      description: 'Slider geometry size variant',
      control: 'select',
      options: ['sm', 'md', 'lg'],
      defaultValue: 'md',
    },
    variant: {
      description: 'Semantic color tint',
      control: 'select',
      options: ['default', 'success', 'warning', 'danger'],
      defaultValue: 'default',
    },
    disabled: {
      description: 'Disabled interaction state',
      control: 'boolean',
      defaultValue: false,
    },
    label: {
      description: 'Associated field label text',
      control: 'text',
      defaultValue: 'Master Audio Output',
    },
    unit: {
      description: 'Measurement unit appended to value',
      control: 'text',
      defaultValue: '%',
    },
  },
  render: (args) => {
    const sizeClass = args.size && args.size !== 'md' ? `range--${args.size}` : '';
    const variantClass = args.variant && args.variant !== 'default' ? `range--${args.variant}` : '';
    const classes = ['range', sizeClass, variantClass].filter(Boolean).join(' ');

    const percentage = Math.round(((args.value - args.min) / (args.max - args.min)) * 100);

    return `
      <div class="demo-stage demo-constrained--md">
        <div class="field">
          <div class="field__header" style="display: flex; justify-content: space-between; align-items: baseline;">
            <label for="range-interactive-demo" class="field__label">${args.label || 'Volume'}</label>
            <output for="range-interactive-demo" class="field__output" id="range-val" style="font-weight: var(--font-weight-bold); font-variant-numeric: tabular-nums;">
              ${args.value}${args.unit || ''}
            </output>
          </div>
          <input 
            id="range-interactive-demo"
            type="range" 
            class="${classes}"
            min="${args.min}" 
            max="${args.max}" 
            step="${args.step}" 
            value="${args.value}"
            ${args.disabled ? 'disabled' : ''}
            style="--value: ${percentage}%;"
            aria-describedby="range-val"
            oninput="this.style.setProperty('--value', ((this.value - this.min)/(this.max - this.min)*100) + '%'); document.getElementById('range-val').textContent = this.value + '${args.unit || ''}';"
          />
        </div>
      </div>
    `;
  },
};

export default meta;
type Story = StoryObj<RangeArgs>;

/**
 * 1. Playground (Interactive Sandbox)
 * Adjust min, max, step, values, sizes, and colors live via Storybook controls.
 */
export const Playground: Story = {
  args: {
    value: 65,
    min: 0,
    max: 100,
    step: 1,
    size: 'md',
    variant: 'default',
    disabled: false,
    label: 'Master Audio Output',
    unit: '%',
  },
};

/**
 * 2. Anatomy & Structure Breakdown
 * Shows the accessible relationship between Label, Live Output Readout, Slider Track, and Thumb.
 */
export const Anatomy: Story = {
  render: () => `
    <div class="demo-stage demo-constrained--md stack">
      <div class="demo-label">1. Field Label &rarr; 2. Output Readout &rarr; 3. Track Fill (--value) &rarr; 4. Grab Thumb</div>
      
      <div class="field">
        <div class="field__header" style="display: flex; justify-content: space-between; align-items: baseline;">
          <label for="anatomy-range" class="field__label">Display Brightness</label>
          <output for="anatomy-range" class="field__output" id="anatomy-range-val" style="font-weight: var(--font-weight-bold);">
            70%
          </output>
        </div>
        <input 
          id="anatomy-range" 
          type="range" 
          class="range" 
          value="70" 
          min="0" 
          max="100" 
          style="--value: 70%;" 
          aria-describedby="anatomy-range-val"
        />
        <p class="field__hint">Adjust screen brightness level for optimal readability in bright rooms.</p>
      </div>
    </div>
  `,
};

/**
 * 3. Variants & Semantic Colors
 * Accent (Default), Success (.range--success), Warning (.range--warning), Danger (.range--danger).
 */
export const Variants: Story = {
  render: () => `
    <div class="demo-stage demo-constrained--md stack">
      <!-- Default Accent -->
      <div class="field">
        <div class="field__header" style="display: flex; justify-content: space-between; align-items: baseline;">
          <label for="var-accent" class="field__label">Default Accent</label>
          <output for="var-accent" class="field__output">65%</output>
        </div>
        <input id="var-accent" type="range" class="range" value="65" min="0" max="100" style="--value: 65%;" />
      </div>

      <hr class="divider" />

      <!-- Success -->
      <div class="field">
        <div class="field__header" style="display: flex; justify-content: space-between; align-items: baseline;">
          <label for="var-success" class="field__label">Success Variant (.range--success)</label>
          <output for="var-success" class="field__output" style="color: var(--foreground-success); font-weight: var(--font-weight-bold);">85%</output>
        </div>
        <input id="var-success" type="range" class="range range--success" value="85" min="0" max="100" style="--value: 85%;" />
      </div>

      <hr class="divider" />

      <!-- Warning -->
      <div class="field">
        <div class="field__header" style="display: flex; justify-content: space-between; align-items: baseline;">
          <label for="var-warning" class="field__label">Warning Variant (.range--warning)</label>
          <output for="var-warning" class="field__output" style="color: var(--foreground-warning); font-weight: var(--font-weight-bold);">45%</output>
        </div>
        <input id="var-warning" type="range" class="range range--warning" value="45" min="0" max="100" style="--value: 45%;" />
      </div>

      <hr class="divider" />

      <!-- Danger -->
      <div class="field">
        <div class="field__header" style="display: flex; justify-content: space-between; align-items: baseline;">
          <label for="var-danger" class="field__label">Danger Variant (.range--danger)</label>
          <output for="var-danger" class="field__output" style="color: var(--foreground-danger); font-weight: var(--font-weight-bold);">20%</output>
        </div>
        <input id="var-danger" type="range" class="range range--danger" value="20" min="0" max="100" style="--value: 20%;" />
      </div>
    </div>
  `,
};

/**
 * 4. Step Increments with Datalist Tick Marks
 * Slider connected to a native `<datalist class="range__scale-ticks">` for discrete scale steps.
 */
export const StepIncrementsWithTicks: Story = {
  render: () => `
    <div class="demo-stage demo-constrained--md stack">
      <div class="field">
        <div class="field__header" style="display: flex; justify-content: space-between; align-items: baseline;">
          <label for="step-range" class="field__label">Text Scale Multiplier</label>
          <output for="step-range" class="field__output" style="font-weight: var(--font-weight-bold);">1.5x</output>
        </div>
        <input 
          id="step-range" 
          type="range" 
          class="range" 
          min="1" 
          max="3" 
          step="0.5" 
          value="1.5" 
          list="scale-ticks"
          style="--value: 25%;"
        />
        <datalist id="scale-ticks" class="range__scale-ticks" style="margin-block-start: var(--spacing-4);">
          <option value="1" label="1.0x"></option>
          <option value="1.5" label="1.5x"></option>
          <option value="2" label="2.0x"></option>
          <option value="2.5" label="2.5x"></option>
          <option value="3" label="3.0x"></option>
        </datalist>
      </div>
    </div>
  `,
};

/**
 * 5. State Matrix
 * Side-by-side verification of Active, Hover, Focus-Visible, and Disabled states.
 */
export const StateMatrix: Story = {
  render: () => `
    <div class="demo-stage demo-constrained--md stack">
      <!-- Active / Resting -->
      <div class="field">
        <div class="field__header" style="display: flex; justify-content: space-between; align-items: baseline;">
          <label for="state-range-active" class="field__label">Resting / Active</label>
          <output for="state-range-active" class="field__output">50%</output>
        </div>
        <input id="state-range-active" type="range" class="range" value="50" min="0" max="100" style="--value: 50%;" />
      </div>

      <!-- Disabled State -->
      <div class="field">
        <div class="field__header" style="display: flex; justify-content: space-between; align-items: baseline;">
          <label for="state-range-disabled" class="field__label">Disabled State (pointer-events: none)</label>
          <output for="state-range-disabled" class="field__output">50% (Locked)</output>
        </div>
        <input id="state-range-disabled" type="range" class="range" value="50" min="0" max="100" disabled style="--value: 50%;" />
        <p class="field__hint">Calibration settings are locked by the administrator.</p>
      </div>
    </div>
  `,
};

/**
 * 6. Sizes & Density (WCAG Target Compliance)
 * Small (4px track / 16px thumb), Standard (8px track / 24px thumb), Large (12px track / 32px thumb).
 */
export const SizesAndDensity: Story = {
  render: () => `
    <div class="demo-stage demo-constrained--md stack">
      <!-- Small -->
      <div class="field">
        <div class="demo-label">Small (.range--sm / 16px thumb, 4px track)</div>
        <input type="range" class="range range--sm" value="30" min="0" max="100" style="--value: 30%;" />
      </div>

      <hr class="divider" />

      <!-- Medium (Default) -->
      <div class="field">
        <div class="demo-label">Standard (.range / 24px thumb, 8px track, WCAG 2.5.5 AAA target)</div>
        <input type="range" class="range" value="50" min="0" max="100" style="--value: 50%;" />
      </div>

      <hr class="divider" />

      <!-- Large -->
      <div class="field">
        <div class="demo-label">Large (.range--lg / 32px thumb, 12px track)</div>
        <input type="range" class="range range--lg" value="75" min="0" max="100" style="--value: 75%;" />
      </div>
    </div>
  `,
};

/**
 * 7. Zero-Class Container Style Queries (@container style(...))
 * Demonstrating parent container orchestration without utility classes.
 */
export const ZeroClassOrchestration: Story = {
  render: () => `
    <div class="stack demo-constrained--md">
      <!-- Dense Deck -->
      <div class="demo-label">Parent: style="--ui-density: dense; --range-variant: success;"</div>
      <div class="demo-stage stack" style="--ui-density: dense; --range-variant: success;">
        <div class="field">
          <div class="field__header" style="display: flex; justify-content: space-between; align-items: baseline;">
            <label for="csq-deck-gain" class="field__label">Gain Control</label>
            <output for="csq-deck-gain" class="field__output">+6 dB</output>
          </div>
          <input id="csq-deck-gain" type="range" class="range" value="70" min="0" max="100" style="--value: 70%;" />
        </div>
      </div>

      <!-- Prominent Warning Container -->
      <div class="demo-label">Parent: style="--range-size: lg; --range-variant: warning;"</div>
      <div class="demo-stage" style="--range-size: lg; --range-variant: warning;">
        <div class="field">
          <div class="field__header" style="display: flex; justify-content: space-between; align-items: baseline;">
            <label for="csq-deck-temp" class="field__label">Thermal Threshold</label>
            <output for="csq-deck-temp" class="field__output">82°C</output>
          </div>
          <input id="csq-deck-temp" type="range" class="range" value="82" min="0" max="100" style="--value: 82%;" />
        </div>
      </div>
    </div>
  `,
};

/**
 * 8. Real-World Recipes & UI Compositions
 * Common production patterns where range sliders control audio, brightness, and accessibility settings.
 */
export const RealWorldRecipes: Story = {
  render: () => `
    <div class="stack demo-constrained--lg">
      <!-- Recipe A: Audio & Media Equalizer Panel -->
      <div class="card card--bordered">
        <article class="card__content">
          <header class="card__header">
            <h3 class="card__title subheading">Audio & Media Equalizer</h3>
            <p class="card__subtitle">Hardware output channel tuning</p>
          </header>
          <div class="card__body stack">
            <div class="field">
              <div class="field__header" style="display: flex; justify-content: space-between; align-items: baseline;">
                <label for="rec-master-vol" class="field__label">Master Output Volume</label>
                <output for="rec-master-vol" class="field__output" style="font-weight: var(--font-weight-bold);">72%</output>
              </div>
              <input id="rec-master-vol" type="range" class="range" value="72" min="0" max="100" style="--value: 72%;" />
            </div>

            <div class="field">
              <div class="field__header" style="display: flex; justify-content: space-between; align-items: baseline;">
                <label for="rec-bass" class="field__label">Bass Boost (Low Frequencies)</label>
                <output for="rec-bass" class="field__output" style="color: var(--foreground-success); font-weight: var(--font-weight-bold);">+4 dB</output>
              </div>
              <input id="rec-bass" type="range" class="range range--success" value="60" min="0" max="100" style="--value: 60%;" />
            </div>

            <div class="field">
              <div class="field__header" style="display: flex; justify-content: space-between; align-items: baseline;">
                <label for="rec-mic" class="field__label">Microphone Gain</label>
                <output for="rec-mic" class="field__output" style="color: var(--foreground-warning); font-weight: var(--font-weight-bold);">85%</output>
              </div>
              <input id="rec-mic" type="range" class="range range--warning" value="85" min="0" max="100" style="--value: 85%;" />
            </div>
          </div>
          <footer class="card__footer" style="display: flex; justify-content: space-between; align-items: center;">
            <button type="button" class="button button--subtle"><span>Reset Equalizer</span></button>
            <button type="button" class="button button--strong button--accent"><span>Apply Settings</span></button>
          </footer>
        </article>
      </div>

      <!-- Recipe B: Accessibility Display Preferences Card -->
      <div class="card card--bordered card--translucent">
        <article class="card__content">
          <header class="card__header">
            <h3 class="card__title subheading">Accessibility Display Preferences</h3>
            <p class="card__subtitle">Custom scaling and visual readability adjustments</p>
          </header>
          <div class="card__body stack">
            <div class="field">
              <div class="field__header" style="display: flex; justify-content: space-between; align-items: baseline;">
                <label for="rec-scale" class="field__label">Text Scale Factor</label>
                <output for="rec-scale" class="field__output" style="font-weight: var(--font-weight-bold);">125%</output>
              </div>
              <input id="rec-scale" type="range" class="range" value="125" min="100" max="200" step="5" style="--value: 25%;" />
              <p class="field__hint">Increases font sizes across all headings, body copy, and UI controls.</p>
            </div>

            <div class="field">
              <div class="field__header" style="display: flex; justify-content: space-between; align-items: baseline;">
                <label for="rec-contrast" class="field__label">Contrast Boost</label>
                <output for="rec-contrast" class="field__output" style="font-weight: var(--font-weight-bold);">100%</output>
              </div>
              <input id="rec-contrast" type="range" class="range" value="100" min="50" max="150" step="5" style="--value: 50%;" />
              <p class="field__hint">Enhances borders and text contrast beyond standard 4.5:1 ratios.</p>
            </div>
          </div>
          <footer class="card__footer" style="display: flex; justify-content: flex-end; gap: var(--spacing-8);">
            <button type="button" class="button button--subtle"><span>Default</span></button>
            <button type="button" class="button button--strong button--accent"><span>Save Preferences</span></button>
          </footer>
        </article>
      </div>
    </div>
  `,
};

/**
 * 9. Range Lockup Primitive (.range-lockup)
 * Unified composite pairing an optional action button (e.g. mute toggle), range slider (.range),
 * and numerical readout (<output> / .range-lockup__output) with seamless focus-within styling,
 * responsive compact/sm sizing, and container queries.
 * Note: Renamed from .range-group to .range-lockup to avoid conflict with the emerging native <rangegroup>.
 */
export const RangeLockup: Story = {
  render: () => `
    <div class="stack demo-constrained--lg gap-lg">
      <!-- Standard Range Lockup -->
      <div class="stack gap-xs">
        <label class="font-size-sm font-weight-medium">Standard Range Lockup</label>
        <div class="range-lockup">
          <button type="button" class="button button--subtle button--icon" aria-label="Mute audio">
            <svg class="icon"><use href="#VolumeOn"/></svg>
          </button>
          <input type="range" class="range" value="75" min="0" max="100" style="--value: 75%;" aria-label="Volume slider" />
          <output class="range-lockup__output">75%</output>
        </div>
      </div>

      <!-- Compact / Dense Sizing (range-lockup--sm) -->
      <div class="stack gap-xs">
        <label class="font-size-sm font-weight-medium">Compact / Dense Sizing (.range-lockup--sm)</label>
        <div class="range-lockup range-lockup--sm" style="max-inline-size: 20rem;">
          <button type="button" class="button button--subtle button--icon button--sm" aria-label="Mute audio">
            <svg class="icon"><use href="#VolumeOn"/></svg>
          </button>
          <input type="range" class="range range--sm" value="85" min="0" max="100" style="--value: 85%;" aria-label="Compact volume slider" />
          <output class="range-lockup__output">85%</output>
        </div>
      </div>

      <!-- Pill & Bordered Variant with :focus-within delegation -->
      <div class="stack gap-xs">
        <label class="font-size-sm font-weight-medium">Surface Pill with Focus-Within (.range-lockup--pill.range-lockup--bordered)</label>
        <div class="range-lockup range-lockup--sm range-lockup--pill range-lockup--bordered" style="max-inline-size: 22rem;">
          <button type="button" class="button button--subtle button--icon button--sm" aria-label="Mute audio">
            <svg class="icon"><use href="#VolumeOn"/></svg>
          </button>
          <input type="range" class="range range--sm" value="50" min="0" max="100" style="--value: 50%;" aria-label="Enclosed volume slider" />
          <output class="range-lockup__output">50%</output>
        </div>
      </div>

      <!-- Full-Width Form Control (.range-lockup--fill) -->
      <div class="stack gap-xs">
        <label class="font-size-sm font-weight-medium">Full-Width Form Control (.range-lockup--fill)</label>
        <div class="range-lockup range-lockup--fill">
          <button type="button" class="button button--subtle button--icon" aria-label="Mute channel">
            <svg class="icon"><use href="#VolumeOn"/></svg>
          </button>
          <input type="range" class="range range--success" value="92" min="0" max="100" style="--value: 92%;" aria-label="Channel gain slider" />
          <output class="range-lockup__output" style="color: var(--foreground-success);">92%</output>
        </div>
      </div>
    </div>
  `,
};

/**
 * Backward compatibility alias for RangeGroup
 */
export const RangeGroup: Story = RangeLockup;
