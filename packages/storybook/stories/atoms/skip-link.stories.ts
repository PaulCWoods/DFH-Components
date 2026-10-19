import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Atoms/Skip Link',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# Skip Link Primitive

Accessible landmark bypass mechanism allowing keyboard, switch, and screen reader users to skip repetitive global navigation and jump directly to primary page content (WCAG 2.4.1 Bypass Blocks).

---

### Canonical Semantic Markup Signatures

#### 1. In-Flow Top Banner Skip Link (Canonical DFH Pattern)
\`\`\`html
<!-- Placed immediately after <body> before any header or navigation -->
<a href="#main" class="skip-link">
  <span>Skip to main content</span>
</a>
\`\`\`

#### 2. Floating Corner Pill
\`\`\`html
<a href="#main" class="skip-link skip-link--floating">
  <span>Skip to main content</span>
</a>
\`\`\`

#### 3. Grouped Multi-Landmark Destination List
\`\`\`html
<nav class="skip-links" aria-label="Skip links">
  <ul>
    <li><a href="#main" class="skip-link"><span>Skip to main content</span></a></li>
    <li><a href="#navigation" class="skip-link"><span>Skip to navigation</span></a></li>
    <li><a href="#footer" class="skip-link"><span>Skip to footer</span></a></li>
  </ul>
</nav>
\`\`\`

---

### WCAG 2.2 Conformance Matrix
| Criterion | Level | Status | Architectural Implementation |
| :--- | :--- | :--- | :--- |
| **2.4.1 Bypass Blocks** | A | **Pass** | Mandatory bypass mechanism jumping keyboard focus directly to target landmark container with \`tabindex="-1"\`. |
| **2.4.7 Focus Visible** | AA | **Pass** | Expanded banner displays high-contrast 2px focus ring on \`:focus-visible\`. |
| **2.4.13 Focus Appearance** | AAA | **Pass** | Inset negative offset (\`calc(var(--focus-ring-offset) * -2)\`) ensures focus ring is never clipped by the top of the browser viewport. |
| **2.5.5 Target Size (Enhanced)** | AAA (48×48px) | **Pass** | Expanded banner enforces \`min-block-size: 3rem\` (48px) for high touch/pointer accessibility. |
| **1.4.3 / 1.4.6 Contrast** | AAA (7:1) | **Pass** | Inverted high-contrast text on \`--surface-accent-strong\` produces > 7:1 ratio; \`:visited\` state is overridden to prevent color degradation. |
| **2.3.3 Reduced Motion** | AAA | **Pass** | \`@media (prefers-reduced-motion: reduce)\` disables expansion transitions and floating slide animations. |

---

### CSS Custom Property Token Contract
| CSS Variable | Default Value | Fallback Ladder | Description |
| :--- | :--- | :--- | :--- |
| \`--skip-link-background-color\` | \`var(--surface-accent-strong)\` | \`#008076\` | Surface color of expanded skip banner |
| \`--skip-link-text\` | \`var(--foreground-inverted)\` | \`#ffffff\` | Text color on banner (guaranteed high contrast) |
| \`--skip-link-min-size\` | \`var(--spacing-target, 3rem)\` | \`3rem\` (48px) | Minimum block size when focused (WCAG 2.5.5) |
| \`--skip-link-font-size\` | \`var(--typography-font-size-0)\` | \`1rem\` | Reading font size |
| \`--skip-link-transition\` | \`var(--duration-sm, 150ms)\` | \`150ms\` | Smooth reveal expansion timing |
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * 1. Playground
 * Interactive sandbox exploring skip link labels, target landmarks, and styling.
 */
export const Playground: Story = {
  args: {
    variant: 'banner',
    label: 'Skip to main content',
    targetId: 'main-content-demo',
  },
  argTypes: {
    variant: {
      name: 'Variant',
      control: { type: 'inline-radio' },
      options: ['banner', 'floating'],
      description: 'Full-width top banner vs floating corner card.',
    },
    label: {
      name: 'Link Label',
      control: { type: 'text' },
    },
    targetId: {
      name: 'Target Landmark ID',
      control: { type: 'text' },
    },
  },
  render: (args) => {
    const isFloating = args.variant === 'floating';
    const linkClass = isFloating ? 'skip-link skip-link--floating' : 'skip-link';

    return `
      <div style="border: 1px solid var(--border-color); border-radius: var(--radius-md); overflow: hidden; position: relative;">
        <!-- Skip Link -->
        <a href="#${args.targetId}" class="${linkClass}">
          <span>${args.label}</span>
        </a>

        <div style="padding: var(--spacing-16); background: var(--surface-muted); display: flex; justify-content: space-between; align-items: center; border-block-end: 1px solid var(--border-color);">
          <span style="font-size: var(--typography-font-size--1); color: var(--foreground-muted);">
            ⌨️ Press <kbd style="background: var(--surface-card); border: 1px solid var(--border-color); padding: 2px 6px; border-radius: 4px;">Tab</kbd> or click to focus
          </span>
          <button type="button" class="button button--subtle button--sm" onclick="document.querySelector('.${isFloating ? 'skip-link--floating' : 'skip-link'}')?.focus()">
            <span>Trigger Focus State</span>
          </button>
        </div>

        <header style="padding: var(--spacing-16); border-block-end: 1px solid var(--border-color); display: flex; gap: var(--spacing-16); align-items: center;">
          <strong style="font-size: var(--typography-font-size-1);">Site Header Landmark</strong>
          <nav aria-label="Mock navigation" style="display: flex; gap: var(--spacing-8);">
            <a href="#" class="button button--subtle button--sm">Nav Item 1</a>
            <a href="#" class="button button--subtle button--sm">Nav Item 2</a>
          </nav>
        </header>

        <main id="${args.targetId}" tabindex="-1" style="padding: var(--spacing-24); outline: none;">
          <h3 style="margin-block-start: 0;">Main Landmark Container (#${args.targetId})</h3>
          <p style="margin: 0; color: var(--foreground-muted);">
            Activating the skip link directs keyboard focus immediately past the header and into this container.
          </p>
        </main>
      </div>
    `;
  },
};

/**
 * 2. Anatomy
 * Exploded breakdown highlighting in-flow zero height, expansion mechanics, and inset focus ring.
 */
export const Anatomy: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: var(--spacing-24); max-inline-size: 46rem;">
      <div class="demo-card-callout" style="padding: var(--spacing-16); border: 1px dashed var(--border-color); border-radius: var(--radius-md); background: var(--surface-muted);">
        <p style="margin: 0; font-size: var(--typography-font-size--1); color: var(--foreground-muted);">
          <strong>Structural Breakdown:</strong> At rest, <code>.skip-link</code> has <code>block-size: 0; overflow: hidden;</code> so it causes zero layout shift for sighted mouse users. On <code>:focus</code>, it expands to <code>min-block-size: 3rem</code> with an inset focus ring (<code>outline-offset: -4px</code>) so the outline never clips at the top of the screen.
        </p>
      </div>

      <div style="border: 2px dashed var(--color-accent); border-radius: var(--radius-md); overflow: hidden;">
        <div style="padding: var(--spacing-8); background: var(--surface-muted); border-block-end: 1px dashed var(--border-color); font-size: var(--typography-font-size--2); color: var(--foreground-muted);">
          Expanded Inspection View:
        </div>
        
        <a href="#anat-target" class="skip-link" style="block-size: auto; min-block-size: 3rem; outline: var(--focus-ring-width) solid var(--focus-ring-color); outline-offset: -4px;">
          <span>a.skip-link &gt; span (Inset Focus Indicator)</span>
        </a>

        <div style="padding: var(--spacing-16);">
          <span class="badge badge--sm"><span>Target Landmark</span></span>
          <p style="margin: var(--spacing-8) 0 0; color: var(--foreground-muted); font-size: var(--typography-font-size--1);">
            Target container must have <code>tabindex="-1"</code> so it can receive programmatic focus without polluting tab order.
          </p>
        </div>
      </div>
    </div>
  `,
};

/**
 * 3. Variants
 * Visual gallery comparing top banner, floating pill, and multiple landmark destinations.
 */
export const Variants: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: var(--spacing-32); max-inline-size: 46rem;">
      
      <!-- Variant 1: Full-Width Top Banner (Expanded Static) -->
      <div>
        <span style="font-size: var(--typography-font-size--1); color: var(--foreground-muted); display: block; margin-block-end: var(--spacing-8);">
          1. In-Flow Top Banner (.skip-link)
        </span>
        <div style="border: 1px solid var(--border-color); border-radius: var(--radius-md); overflow: hidden;">
          <a href="#v1-main" class="skip-link" style="block-size: auto; min-block-size: 3rem;">
            <span>Skip to main content</span>
          </a>
          <div style="padding: var(--spacing-16);">
            <p style="margin: 0; color: var(--foreground-muted); font-size: var(--typography-font-size--1);">
              Full-width edge-to-edge banner expanding across the site header.
            </p>
          </div>
        </div>
      </div>

      <!-- Variant 2: Floating Pill (.skip-link--floating) -->
      <div>
        <span style="font-size: var(--typography-font-size--1); color: var(--foreground-muted); display: block; margin-block-end: var(--spacing-8);">
          2. Floating Corner Card (.skip-link.skip-link--floating)
        </span>
        <div style="border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: var(--spacing-16); position: relative; min-block-size: 140px; background: var(--surface-card);">
          <a href="#v2-main" class="skip-link skip-link--floating" style="position: static; transform: none; opacity: 1; pointer-events: auto; display: inline-flex;">
            <span>Skip to main content</span>
          </a>
          <p style="margin: var(--spacing-12) 0 0; color: var(--foreground-muted); font-size: var(--typography-font-size--1);">
            Discrete elevated card pinned to the top-start corner.
          </p>
        </div>
      </div>

      <!-- Variant 3: Grouped Destinations (.skip-links) -->
      <div>
        <span style="font-size: var(--typography-font-size--1); color: var(--foreground-muted); display: block; margin-block-end: var(--spacing-8);">
          3. Multi-Landmark Grouped Destinations (nav.skip-links)
        </span>
        <div style="border: 1px solid var(--border-color); border-radius: var(--radius-md); overflow: hidden;">
          <nav class="skip-links" aria-label="Skip landmarks" style="block-size: auto;">
            <ul>
              <li>
                <a href="#v3-main" class="skip-link" style="block-size: auto; min-block-size: 2.75rem;">
                  <span>Skip to main content</span>
                </a>
              </li>
              <li>
                <a href="#v3-nav" class="skip-link" style="block-size: auto; min-block-size: 2.75rem; background-color: color-mix(in srgb, var(--surface-accent-strong), black 15%);">
                  <span>Skip to main navigation</span>
                </a>
              </li>
              <li>
                <a href="#v3-footer" class="skip-link" style="block-size: auto; min-block-size: 2.75rem; background-color: color-mix(in srgb, var(--surface-accent-strong), black 30%);">
                  <span>Skip to footer landmarks</span>
                </a>
              </li>
            </ul>
          </nav>
          <div style="padding: var(--spacing-16);">
            <p style="margin: 0; color: var(--foreground-muted); font-size: var(--typography-font-size--1);">
              Allows power users to bypass directly to specific secondary landmarks.
            </p>
          </div>
        </div>
      </div>

    </div>
  `,
};

/**
 * 4. StateMatrix
 * Covers resting hidden state, expanded focus state, focus-visible inset ring, and high-contrast modes.
 */
export const StateMatrix: Story = {
  render: () => `
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(18rem, 100%), 1fr)); gap: var(--spacing-24); max-inline-size: 52rem;">
      
      <!-- Resting State -->
      <div class="pd bd rd">
        <span style="font-size: var(--typography-font-size--1); color: var(--foreground-muted); display: block; margin-block-end: var(--spacing-8);">
          Resting State (Hidden, 0 Height)
        </span>
        <div style="padding: var(--spacing-12); background: var(--surface-muted); border-radius: var(--radius-sm);">
          <span style="font-size: var(--typography-font-size--2); color: var(--foreground-muted);">[Skip Link hidden above content]</span>
        </div>
      </div>

      <!-- Focused State -->
      <div class="pd bd rd">
        <span style="font-size: var(--typography-font-size--1); color: var(--foreground-muted); display: block; margin-block-end: var(--spacing-8);">
          Focused State (Expanded)
        </span>
        <a href="#" class="skip-link" style="block-size: auto; min-block-size: 2.5rem; text-decoration: underline;">
          <span>Skip to main content</span>
        </a>
      </div>

      <!-- Inset Focus Ring -->
      <div class="pd bd rd">
        <span style="font-size: var(--typography-font-size--1); color: var(--foreground-muted); display: block; margin-block-end: var(--spacing-8);">
          Focus-Visible (Negative Inset Offset)
        </span>
        <a href="#" class="skip-link" style="block-size: auto; min-block-size: 2.5rem; outline: 2px solid white; outline-offset: -4px;">
          <span>Focus Ring Inset</span>
        </a>
      </div>

      <!-- High Contrast Mode Simulation -->
      <div class="pd bd rd">
        <span style="font-size: var(--typography-font-size--1); color: var(--foreground-muted); display: block; margin-block-end: var(--spacing-8);">
          High-Contrast Mode (Solid Perimeter)
        </span>
        <a href="#" class="skip-link" style="block-size: auto; min-block-size: 2.5rem; border: 2px solid currentColor; outline: none;">
          <span>High Contrast Skip</span>
        </a>
      </div>

    </div>
  `,
};

/**
 * 5. SizesAndDensity
 * Demonstrates standard 48px touch targets and compact sizes.
 */
export const SizesAndDensity: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: var(--spacing-24); max-inline-size: 44rem;">
      
      <!-- Standard 48px Target -->
      <div>
        <span style="font-size: var(--typography-font-size--1); color: var(--foreground-muted); display: block; margin-block-end: var(--spacing-8);">
          Standard Size (min-block-size: 3rem / 48px — WCAG 2.5.5 AAA Target)
        </span>
        <div style="border: 1px solid var(--border-color); border-radius: var(--radius-md); overflow: hidden;">
          <a href="#" class="skip-link" style="block-size: auto; min-block-size: 3rem;">
            <span>Skip to main content</span>
          </a>
        </div>
      </div>

      <!-- Compact Size -->
      <div>
        <span style="font-size: var(--typography-font-size--1); color: var(--foreground-muted); display: block; margin-block-end: var(--spacing-8);">
          Compact Size (--skip-link-min-size: 2.5rem / 40px)
        </span>
        <div style="border: 1px solid var(--border-color); border-radius: var(--radius-md); overflow: hidden;">
          <a href="#" class="skip-link" style="block-size: auto; min-block-size: 2.5rem; font-size: var(--typography-font-size--1);">
            <span>Skip to main content</span>
          </a>
        </div>
      </div>

    </div>
  `,
};

/**
 * 6. ZeroClassOrchestration
 * Demonstrates safe area insets on mobile display notches and islands.
 */
export const ZeroClassOrchestration: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: var(--spacing-24); max-inline-size: 46rem;">
      <div class="demo-card-callout" style="padding: var(--spacing-16); border: 1px dashed var(--border-color); border-radius: var(--radius-md); background: var(--surface-muted);">
        <p style="margin: 0; font-size: var(--typography-font-size--1); color: var(--foreground-muted);">
          <strong>Mobile Notch & Island Safety:</strong> The padding on <code>.skip-link</code> integrates <code>env(safe-area-inset-left)</code> and <code>env(safe-area-inset-right)</code> automatically, ensuring centered typography never clips underneath device sensor cutouts.
        </p>
      </div>

      <div style="border: 1px solid var(--border-color); border-radius: var(--radius-md); overflow: hidden;">
        <a href="#" class="skip-link" style="block-size: auto; min-block-size: 3rem; padding-inline: calc(var(--spacing-16) + 2rem);">
          <span>Safe-Area Notch Inset Aware Banner</span>
        </a>
      </div>
    </div>
  `,
};

/**
 * 7. RealWorldRecipes
 * Production patterns: Complete Application Layout with Landmark Target Navigation.
 */
export const RealWorldRecipes: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: var(--spacing-32); max-inline-size: 52rem;">
      
      <!-- Recipe 1: Production Application Shell Layout -->
      <section style="display: flex; flex-direction: column; gap: var(--spacing-16);">
        <h4 style="font-size: var(--typography-font-size-1); margin: 0;">
          Recipe 1: Accessible Web Application Shell with Top Landmark Skip
        </h4>
        
        <div class="card card--bordered" style="overflow: hidden; padding: 0;">
          <!-- Top Banner Skip Link -->
          <a href="#app-main-content" class="skip-link">
            <span>Skip to main content</span>
          </a>

          <div style="padding: var(--spacing-12); background: var(--surface-muted); border-block-end: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: var(--typography-font-size--2); color: var(--foreground-muted);">
              Press <kbd>Tab</kbd> or click button to test:
            </span>
            <button type="button" class="button button--subtle button--sm" onclick="document.querySelector('.card .skip-link')?.focus()">
              <span>Focus Skip Link</span>
            </button>
          </div>

          <!-- Application Header -->
          <header style="padding: var(--spacing-16); border-block-end: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center;">
            <div style="display: flex; gap: var(--spacing-12); align-items: center;">
              <span class="badge badge--round badge--accent"><span>DFH</span></span>
              <strong>Component System</strong>
            </div>
            <nav aria-label="Global links" style="display: flex; gap: var(--spacing-8);">
              <a href="#" class="link link--subtle">Components</a>
              <a href="#" class="link link--subtle">Accessibility</a>
              <a href="#" class="link link--subtle">GitHub</a>
            </nav>
          </header>

          <!-- Main Landmark -->
          <main id="app-main-content" tabindex="-1" style="padding: var(--spacing-24); outline: none;">
            <h2 style="margin-block-start: 0; font-size: var(--typography-font-size-2);">
              Main Landmark Canvas
            </h2>
            <p style="margin: 0; color: var(--foreground-muted); line-height: 1.6;">
              When the user presses Enter on "Skip to main content", browser focus moves smoothly into this <code>&lt;main&gt;</code> element without forcing the user to tab through every header link.
            </p>
          </main>

          <footer style="padding: var(--spacing-16); border-block-start: 1px solid var(--border-color); font-size: var(--typography-font-size--1); color: var(--foreground-muted);">
            &copy; 2026 Design For Humans. Level AA &amp; AAA Conformance.
          </footer>
        </div>
      </section>

    </div>
  `,
};
