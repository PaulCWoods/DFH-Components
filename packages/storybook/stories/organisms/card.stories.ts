import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Organisms/Card',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# Card Primitive

Composable container foundation providing container-query driven fluid typography (\`cqi\`), mathematically concentric dynamic corner radii, flush header/footer margins for sticky panels, and accessible stretched link boundaries.

---

### Canonical Semantic Markup Signature
\`\`\`html
<!-- Canonical Article Card -->
<div class="card">
  <div class="card__thumb">
    <img src="/image.jpg" alt="Article banner" loading="lazy" />
  </div>
  <article class="card__content">
    <header class="card__header">
      <hgroup class="card__hgroup">
        <h3 class="card__title heading">
          <a href="/post-url" class="card__link">Card Headline</a>
        </h3>
        <p class="card__subtitle subheading text-muted">Supporting Subtitle</p>
      </hgroup>
      <span class="status status--success"><span class="status__text">Live</span></span>
    </header>
    <div class="card__body">
      <p>Card body copy formatted at stable 1rem base size.</p>
    </div>
    <footer class="card__footer">
      <time class="card__date" datetime="2026-10-13">13 October 2026</time>
      <button type="button" class="button button--subtle"><span>Details</span></button>
    </footer>
  </article>
</div>
\`\`\`

---

### WCAG 2.2 Conformance Matrix
| Criterion | Level | Status | Architectural Implementation |
| :--- | :--- | :--- | :--- |
| **1.4.3 Contrast (Minimum)** | AA (4.5:1) | **Pass** | Body text uses \`var(--card-body-color)\` (>= 4.5:1), titles inherit foreground contrast, borders >= 3:1 in high-contrast mode. |
| **1.4.4 Resize Text** | AA (200%) | **Pass** | Body copy stays pinned to \`var(--typography-font-size-0)\` (1rem / 16px) so zoom does not break paragraph legibility. |
| **2.4.7 Focus Visible** | AA | **Pass** | Perimeter focus ring (\`outline\`) wraps the entire outer card boundary when keyboard focus hits \`.card__link\`. |
| **2.4.13 Focus Appearance** | AAA | **Pass** | Outer focus outline uses \`var(--focus-ring-width)\` (2px/3px) with \`var(--focus-ring-offset)\` and 3:1 contrast against backdrop. |
| **2.5.5 Target Size (Enhanced)** | AAA (48×48px) | **Pass** | When \`.card__link\` is used, the clickable hit area spans the entire card boundary via pseudo-element overlay. |
| **2.3.3 Animation from Interactions** | AAA | **Pass** | \`@media (prefers-reduced-motion: reduce)\` disables shadow transitions and replaces spinning loader with static "Loading" text. |

---

### CSS Custom Property Token Contract
| CSS Variable | Default Value | Fallback Ladder | Description |
| :--- | :--- | :--- | :--- |
| \`--card-bg\` | \`var(--surface-card, Canvas)\` | System \`Canvas\` | Card container background surface |
| \`--card-border-color\` | \`var(--panel-border-color)\` | \`currentColor\` | Perimeter border stroke color |
| \`--card-border-width\` | \`var(--panel-border-width, 1px)\` | \`1px\` | Perimeter stroke width (expands under high contrast) |
| \`--card-radius\` | \`var(--panel-radius, 0.25rem)\` | \`0.25rem\` | Corner rounding (overridden dynamically in \`.card--dynamic-corners\`) |
| \`--card-padding\` | \`var(--spacing-breathe)\` | \`1.5rem\` | Outer container internal breathing room |
| \`--card-shadow\` | \`var(--shadow)\` | Multi-layer elevation | Resting drop shadow elevation |
| \`--card-shadow-hover\` | \`var(--shadow-raised)\` | Elevated shadow | Interactive hover elevation when card contains \`.card__link\` |
| \`--card-title-font-size\` | \`var(--heading-cq-font-size)\` | \`clamp(...cqi)\` | Fluid typography calculated dynamically via container width |

---

### Container Query & Atomic Typography Orchestration
- **Container Type:** \`.card__content\` establishes \`container-type: inline-size;\` and \`--font-sizing: cq;\`.
- **Adaptive Fluid Headings:** Typography atoms (\`.heading\`, \`.subheading\`) scale smoothly via \`clamp()\` based on available card inline-width (\`cqi\`), keeping titles proportional across sidebars, 2-column, and 3-column layouts.
- **Scroll-State Container Support:** \`.card--scrollable\` supports \`container-type: scroll-state\` for auto-shadowing sticky headers/footers upon scroll offset.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * 1. Playground
 * Interactive sandbox exposing card modifiers, contents, density, and states.
 */
export const Playground: Story = {
  args: {
    variant: 'default',
    density: 'standard',
    isLoading: false,
    hasThumb: true,
    title: 'Designing Accessible Design Systems',
    subtitle: 'Web Standards & Token Architecture',
    bodyText: 'An exploration into building token-driven UI components that bridge Figma, web standards, and automated assistive technology compliance.',
    actionLabel: 'Read Article',
  },
  argTypes: {
    variant: {
      name: 'Card Variant',
      control: { type: 'select' },
      options: ['default', 'bordered', 'flush', 'ruled', 'translucent', 'dynamic-corners'],
      description: 'Cosmetic and structural modifier class applied to the card.',
    },
    density: {
      name: 'Density Mode',
      control: { type: 'inline-radio' },
      options: ['standard', 'compact'],
      description: 'Controls internal breathing room and heading proportion.',
    },
    isLoading: {
      name: 'Loading State',
      control: { type: 'boolean' },
      description: 'Displays the accessible loading overlay and indicator.',
    },
    hasThumb: {
      name: 'Thumbnail Media',
      control: { type: 'boolean' },
      description: 'Includes top aspect-ratio image media container.',
    },
    title: {
      name: 'Title Text',
      control: { type: 'text' },
    },
    subtitle: {
      name: 'Subtitle Text',
      control: { type: 'text' },
    },
    bodyText: {
      name: 'Body Copy',
      control: { type: 'text' },
    },
    actionLabel: {
      name: 'Action Label',
      control: { type: 'text' },
    },
  },
  render: (args) => {
    const classes = [
      'card',
      args.variant !== 'default' ? `card--${args.variant}` : '',
      args.density === 'compact' ? 'card--compact' : '',
      args.isLoading ? 'is-loading' : '',
    ].filter(Boolean).join(' ');

    return `
      <div style="max-inline-size: 28rem; margin-inline: auto;">
        <div class="${classes}">
          ${args.hasThumb ? `
            <div class="card__thumb">
              <img 
                src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80" 
                alt="Architectural structure preview" 
                loading="lazy" 
              />
            </div>
          ` : ''}
          <article class="card__content">
            <header class="card__header">
              <hgroup class="card__hgroup">
                <h3 class="card__title heading">
                  <a href="#" class="card__link">${args.title}</a>
                </h3>
                <p class="card__subtitle subheading text-muted">${args.subtitle}</p>
              </hgroup>
            </header>
            <div class="card__body">
              <p>${args.bodyText}</p>
            </div>
            <footer class="card__footer" style="display: flex; justify-content: space-between; align-items: center;">
              <time class="card__date" datetime="2026-10-13">13 Oct 2026</time>
              <button type="button" class="button button--strong button--accent button--sm">
                <span>${args.actionLabel}</span>
              </button>
            </footer>
          </article>
        </div>
      </div>
    `;
  },
};

/**
 * 2. Anatomy
 * Exploded breakdown highlighting the semantic hierarchy, container scopes, and roles.
 */
export const Anatomy: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: var(--spacing-24); max-inline-size: 44rem;">
      <div class="demo-card-callout" style="padding: var(--spacing-16); border: 1px dashed var(--border-color); border-radius: var(--radius-md); background: var(--surface-muted);">
        <p style="margin: 0; font-size: var(--typography-font-size--1); color: var(--foreground-muted);">
          <strong>Structural Breakdown:</strong> The card consists of an outer container (<code>.card</code>), an optional media slot (<code>.card__thumb</code>), and a flex content container (<code>article.card__content</code>) housing the header, body, and footer primitives.
        </p>
      </div>

      <div class="card card--bordered" style="outline: 2px dashed var(--color-accent); outline-offset: 4px;">
        <div class="card__thumb" style="position: relative;">
          <img 
            src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80" 
            alt="Source code representation" 
          />
          <span class="sb-demo-tag" style="position: absolute; inset-block-start: var(--spacing-8); inset-inline-start: var(--spacing-8);">
            <span>.card__thumb</span>
          </span>
        </div>

        <article class="card__content" style="background: color-mix(in srgb, var(--surface-card), transparent 20%);">
          <header class="card__header" style="border-block-end: 1px dashed var(--border-color);">
            <hgroup class="card__hgroup">
              <span class="sb-demo-tag" style="align-self: flex-start;"><span>header.card__header</span></span>
              <h3 class="card__title heading">
                <a href="#" class="card__link">.card__title with .card__link</a>
              </h3>
              <p class="card__subtitle subheading text-muted">p.card__subtitle</p>
            </hgroup>
            <span class="status status--success"><span class="status__text">Live</span></span>
          </header>

          <div class="card__body" style="padding-block: var(--spacing-16); border-block-end: 1px dashed var(--border-color);">
            <span class="sb-demo-tag" style="display: inline-block; margin-block-end: var(--spacing-8);"><span>div.card__body</span></span>
            <p style="margin: 0;">
              Container query fluid body container. Negative margins on header and footer ensure flush bleeding edge to edge.
            </p>
          </div>

          <footer class="card__footer" style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <span class="sb-demo-tag"><span>footer.card__footer</span></span>
              <span style="font-size: var(--typography-font-size--1); color: var(--foreground-muted); display: block; margin-block-start: var(--spacing-4);">time.card__date</span>
            </div>
            <button type="button" class="button button--sm">
              <span>Interactive Control</span>
            </button>
          </footer>
        </article>
      </div>
    </div>
  `,
};

/**
 * 3. Variants
 * Visual gallery showcasing default, bordered, flush, ruled, translucent, and dynamic-corners.
 */
export const Variants: Story = {
  render: () => `
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(18rem, 100%), 1fr)); gap: var(--spacing-24);">
      
      <!-- Default Elevation -->
      <div class="card">
        <article class="card__content">
          <header class="card__header">
            <hgroup class="card__hgroup">
              <h3 class="card__title heading">Default Elevation</h3>
              <p class="card__subtitle subheading text-muted">Standard Drop Shadow</p>
            </hgroup>
          </header>
          <div class="card__body">
            <p>Uses <code>--card-shadow</code> with subtle border for high-depth interfaces.</p>
          </div>
          <footer class="card__footer">
            <span class="status"><span class="status__text">Default</span></span>
          </footer>
        </article>
      </div>

      <!-- Bordered -->
      <div class="card card--bordered">
        <article class="card__content">
          <header class="card__header">
            <hgroup class="card__hgroup">
              <h3 class="card__title heading">Bordered</h3>
              <p class="card__subtitle subheading text-muted">Crisp Perimeter Outline</p>
            </hgroup>
          </header>
          <div class="card__body">
            <p>Explicit 1px perimeter border without relying on elevation shadows.</p>
          </div>
          <footer class="card__footer">
            <span class="sb-demo-tag"><span>.card--bordered</span></span>
          </footer>
        </article>
      </div>

      <!-- Ruled Dividers -->
      <div class="card card--bordered card--ruled">
        <article class="card__content">
          <header class="card__header">
            <hgroup class="card__hgroup">
              <h3 class="card__title heading">Ruled Dividers</h3>
              <p class="card__subtitle subheading text-muted">Built-In Section Rules</p>
            </hgroup>
          </header>
          <div class="card__body">
            <p>Divider lines automatically separate header, body, and footer compartments.</p>
          </div>
          <footer class="card__footer">
            <span class="sb-demo-tag"><span>.card--ruled</span></span>
          </footer>
        </article>
      </div>

      <!-- Translucent (Glassmorphic) -->
      <div style="background: linear-gradient(135deg, var(--color-accent-subtle, #0d9488), var(--surface-darker, #111)); padding: var(--spacing-16); border-radius: var(--radius-lg);">
        <div class="card card--bordered card--translucent" style="--card-translucency: 20%; --card-filter: blur(12px);">
          <article class="card__content">
            <header class="card__header">
              <hgroup class="card__hgroup">
                <h3 class="card__title heading">Translucent</h3>
                <p class="card__subtitle subheading text-muted">Glassmorphism Surface</p>
              </hgroup>
            </header>
            <div class="card__body">
              <p>Uses <code>backdrop-filter</code> and <code>color-mix()</code> for layered depth.</p>
            </div>
            <footer class="card__footer">
              <span class="sb-demo-tag"><span>.card--translucent</span></span>
            </footer>
          </article>
        </div>
      </div>

      <!-- Flush (Borderless Flat) -->
      <div class="card card--flush" style="background: var(--surface-muted);">
        <article class="card__content">
          <header class="card__header">
            <hgroup class="card__hgroup">
              <h3 class="card__title heading">Flush Container</h3>
              <p class="card__subtitle subheading text-muted">No Outer Border or Radius</p>
            </hgroup>
          </header>
          <div class="card__body">
            <p>Stripped of outer border-radius and shadow to sit edge-to-edge in sidebars.</p>
          </div>
          <footer class="card__footer">
            <span class="sb-demo-tag"><span>.card--flush</span></span>
          </footer>
        </article>
      </div>

      <!-- Dynamic Corners -->
      <div class="card card--bordered card--dynamic-corners" style="--button-radius: var(--radius-round);">
        <article class="card__content">
          <header class="card__header">
            <hgroup class="card__hgroup">
              <h3 class="card__title heading">Dynamic Corners</h3>
              <p class="card__subtitle subheading text-muted">Concentric Alignment</p>
            </hgroup>
          </header>
          <div class="card__body">
            <p>Outer radius formula adapts to internal button radius + padding.</p>
          </div>
          <footer class="card__footer">
            <button type="button" class="button button--strong button--accent button--round">
              <span>Capsule Action</span>
            </button>
          </footer>
        </article>
      </div>

    </div>
  `,
};

/**
 * 4. StateMatrix
 * Covers resting, hover, keyboard focus-visible on stretched link, active, loading, and high-contrast modes.
 */
export const StateMatrix: Story = {
  render: () => `
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(17rem, 100%), 1fr)); gap: var(--spacing-24);">
      
      <!-- Resting Stretched Link -->
      <div>
        <span style="font-size: var(--typography-font-size--1); color: var(--foreground-muted); display: block; margin-block-end: var(--spacing-8);">
          Resting Linked Card
        </span>
        <div class="card card--bordered">
          <article class="card__content">
            <header class="card__header">
              <h3 class="card__title heading">
                <a href="#" class="card__link">Resting Link</a>
              </h3>
            </header>
            <div class="card__body">
              <p>Spans clickable area across the card via <code>.card__link::after</code>.</p>
            </div>
            <footer class="card__footer">
              <span class="status status--success status--plain"><span class="status__text">Resting</span></span>
            </footer>
          </article>
        </div>
      </div>

      <!-- Keyboard Focus Visible on Perimeter -->
      <div>
        <span style="font-size: var(--typography-font-size--1); color: var(--foreground-muted); display: block; margin-block-end: var(--spacing-8);">
          Focus-Visible (Perimeter Ring)
        </span>
        <div class="card card--bordered" style="outline: var(--focus-ring-width) solid var(--focus-ring-color); outline-offset: var(--focus-ring-offset);">
          <article class="card__content">
            <header class="card__header">
              <h3 class="card__title heading">
                <a href="#" class="card__link" style="text-decoration: underline;">Focused Link</a>
              </h3>
            </header>
            <div class="card__body">
              <p>When link is focused via keyboard, the outline encompasses the outer card border.</p>
            </div>
            <footer class="card__footer">
              <span class="sb-demo-tag"><span>Focus Active</span></span>
            </footer>
          </article>
        </div>
      </div>

      <!-- Loading State -->
      <div>
        <span style="font-size: var(--typography-font-size--1); color: var(--foreground-muted); display: block; margin-block-end: var(--spacing-8);">
          Loading State (.is-loading)
        </span>
        <div class="card card--bordered is-loading">
          <article class="card__content">
            <header class="card__header">
              <h3 class="card__title heading">
                <a href="#" class="card__link">Loading Post</a>
              </h3>
            </header>
            <div class="card__body">
              <p>Content is locked behind overlay with reduced-motion safe spinner indicator.</p>
            </div>
            <footer class="card__footer">
              <button type="button" class="button button--subtle">Action</button>
            </footer>
          </article>
        </div>
      </div>

      <!-- High-Contrast Mode Simulation -->
      <div>
        <span style="font-size: var(--typography-font-size--1); color: var(--foreground-muted); display: block; margin-block-end: var(--spacing-8);">
          High-Contrast Mode (2px Border)
        </span>
        <div class="card" style="border: 2px solid currentColor; box-shadow: none;">
          <article class="card__content">
            <header class="card__header">
              <h3 class="card__title heading">High Contrast</h3>
            </header>
            <div class="card__body">
              <p>Elevations are removed, borders are reinforced to guarantee WCAG 1.4.11 contrast.</p>
            </div>
            <footer class="card__footer">
              <span class="sb-demo-tag"><span>3:1 Border</span></span>
            </footer>
          </article>
        </div>
      </div>

      <!-- Inverted Palette Mode -->
      <div>
        <span style="font-size: var(--typography-font-size--1); color: var(--foreground-muted); display: block; margin-block-end: var(--spacing-8);">
          Inverted Palette (.color-palette-inverted)
        </span>
        <div class="card card--bordered color-palette-inverted">
          <article class="card__content">
            <header class="card__header">
              <h3 class="card__title heading">Inverted Surface</h3>
            </header>
            <div class="card__body">
              <p>Derives <code>--card-bg</code> directly from Tier 3 inverted palette token, preserving clean token inheritance.</p>
            </div>
            <footer class="card__footer">
              <span class="sb-demo-tag"><span>Inverted</span></span>
            </footer>
          </article>
        </div>
      </div>

    </div>
  `,
};

/**
 * 5. SizesAndDensity
 * Demonstrates standard breathing room vs .card--compact and container-query density overrides.
 */
export const SizesAndDensity: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: var(--spacing-24); max-inline-size: 42rem;">
      
      <!-- Standard Density -->
      <div>
        <span style="font-size: var(--typography-font-size--1); color: var(--foreground-muted); display: block; margin-block-end: var(--spacing-8);">
          Standard Density (Padding: var(--spacing-breathe))
        </span>
        <div class="card card--bordered">
          <article class="card__content">
            <header class="card__header">
              <hgroup class="card__hgroup">
                <h3 class="card__title heading">Standard Density</h3>
                <p class="card__subtitle subheading text-muted">Generous internal padding for editorial readability</p>
              </hgroup>
            </header>
            <div class="card__body">
              <p>Standard card padding adapts dynamically to device size while preserving breathing room.</p>
            </div>
            <footer class="card__footer" style="display: flex; justify-content: flex-end;">
              <button type="button" class="button button--strong button--accent"><span>Continue</span></button>
            </footer>
          </article>
        </div>
      </div>

      <!-- Compact Density -->
      <div>
        <span style="font-size: var(--typography-font-size--1); color: var(--foreground-muted); display: block; margin-block-end: var(--spacing-8);">
          Compact Density (.card--compact / --card-density: compact)
        </span>
        <div class="card card--bordered card--compact">
          <article class="card__content">
            <header class="card__header">
              <hgroup class="card__hgroup">
                <h3 class="card__title small-heading">Compact Density</h3>
                <p class="card__subtitle micro-heading text-muted">Tighter margins and 1em heading scale</p>
              </hgroup>
            </header>
            <div class="card__body">
              <p>Ideal for data-dense tables, sidebar widgets, popover cards, and dashboard metrics.</p>
            </div>
            <footer class="card__footer" style="display: flex; justify-content: flex-end;">
              <button type="button" class="button button--sm"><span>Details</span></button>
            </footer>
          </article>
        </div>
      </div>

    </div>
  `,
};

/**
 * 6. ZeroClassOrchestration
 * Demonstrates container-query fluid typography scaling (cqi units) across 3 distinct container widths.
 */
export const ZeroClassOrchestration: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: var(--spacing-24);">
      
      <!-- Slot 1: Narrow Container (18rem) -->
      <div>
        <span style="font-size: var(--typography-font-size--1); color: var(--foreground-muted); display: block; margin-block-end: var(--spacing-8);">
          Narrow Slot (max-inline-size: 18rem) — Title scales down via cqi formula
        </span>
        <div style="max-inline-size: 18rem;">
          <div class="card card--bordered">
            <article class="card__content">
              <header class="card__header">
                <hgroup class="card__hgroup">
                  <h3 class="card__title heading">Fluid cqi Heading</h3>
                  <p class="card__subtitle subheading text-muted">Narrow context</p>
                </hgroup>
              </header>
              <div class="card__body">
                <p>Reading copy stays fixed at 1rem to protect legibility.</p>
              </div>
              <footer class="card__footer">
                <time class="card__date">18rem</time>
              </footer>
            </article>
          </div>
        </div>
      </div>

      <!-- Slot 2: Medium Container (28rem) -->
      <div>
        <span style="font-size: var(--typography-font-size--1); color: var(--foreground-muted); display: block; margin-block-end: var(--spacing-8);">
          Medium Slot (max-inline-size: 28rem) — Title interpolates smoothly
        </span>
        <div style="max-inline-size: 28rem;">
          <div class="card card--bordered">
            <article class="card__content">
              <header class="card__header">
                <hgroup class="card__hgroup">
                  <h3 class="card__title heading">Fluid cqi Heading</h3>
                  <p class="card__subtitle subheading text-muted">Medium context</p>
                </hgroup>
              </header>
              <div class="card__body">
                <p>Reading copy stays fixed at 1rem to protect legibility.</p>
              </div>
              <footer class="card__footer">
                <time class="card__date">28rem</time>
              </footer>
            </article>
          </div>
        </div>
      </div>

      <!-- Slot 3: Wide Container (42rem) -->
      <div>
        <span style="font-size: var(--typography-font-size--1); color: var(--foreground-muted); display: block; margin-block-end: var(--spacing-8);">
          Wide Slot (max-inline-size: 42rem) — Title scales up to full prominent header
        </span>
        <div style="max-inline-size: 42rem;">
          <div class="card card--bordered">
            <article class="card__content">
              <header class="card__header">
                <hgroup class="card__hgroup">
                  <h3 class="card__title heading">Fluid cqi Heading</h3>
                  <p class="card__subtitle subheading text-muted">Wide context</p>
                </hgroup>
              </header>
              <div class="card__body">
                <p>Reading copy stays fixed at 1rem to protect legibility.</p>
              </div>
              <footer class="card__footer">
                <time class="card__date">42rem</time>
              </footer>
            </article>
          </div>
        </div>
      </div>

    </div>
  `,
};

/**
 * 7. RealWorldRecipes
 * Production patterns: Article with thumbnail, Settings feature card, and Sticky scrollable panel.
 */
export const RealWorldRecipes: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: var(--spacing-32); max-inline-size: 52rem;">
      
      <!-- Recipe 1: Production Article Card -->
      <section>
        <h4 style="font-size: var(--typography-font-size-1); margin-block-end: var(--spacing-12);">
          Recipe 1: Editorial Article Card with Thumbnail & Stretched Link
        </h4>
        <div style="max-inline-size: 26rem;">
          <div class="card card--bordered">
            <div class="card__thumb">
              <img 
                src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80" 
                alt="Architecture design" 
                loading="lazy" 
              />
            </div>
            <article class="card__content">
              <header class="card__header">
                <hgroup class="card__hgroup">
                  <h3 class="card__title heading">
                    <a href="#article" class="card__link">Building Accessible Web Components</a>
                  </h3>
                  <p class="card__subtitle subheading text-muted">Modern Web Standards</p>
                </hgroup>
              </header>
              <div class="card__body">
                <p>How zero-JS custom properties, container queries, and native HTML primitives create resilient component ecosystems.</p>
              </div>
              <footer class="card__footer" style="display: flex; justify-content: space-between; align-items: center;">
                <time class="card__date" datetime="2026-10-13">13 Oct 2026</time>
                <span class="chip chip--subtle"><span class="chip__text">Design Systems</span></span>
              </footer>
            </article>
          </div>
        </div>
      </section>

      <!-- Recipe 2: Sticky Scrollable Panel Foundation -->
      <section>
        <h4 style="font-size: var(--typography-font-size-1); margin-block-end: var(--spacing-12);">
          Recipe 2: Sticky Header & Footer Scrollable Panel (Drawer / Dialog Foundation)
        </h4>
        <div class="card card--bordered card--scrollable card--sticky-header card--sticky-footer" style="max-block-size: 20rem; max-inline-size: 30rem;">
          <article class="card__content" tabindex="0" aria-label="Privacy policy review">
            <header class="card__header">
              <hgroup class="card__hgroup">
                <h3 class="card__title heading">Terms & Privacy Review</h3>
                <p class="card__subtitle subheading text-muted">Sticky Header In-Flow</p>
              </hgroup>
            </header>
            <div class="card__body">
              <p>WCAG 2.2 Level AA compliance requires that scrolling regions are reachable via keyboard and clearly indicated visually.</p>
              <p>The card header and footer bleed flush against content boundaries using negative margin calculations, creating seamless sticky app bars.</p>
              <p>Under supported browsers, CSS scroll-state container queries dynamically apply elevation drop shadows as soon as content scrolls under the sticky bars.</p>
              <p>All focusable controls within this panel maintain minimum 48px AAA touch targets and 3:1 focus ring contrast.</p>
            </div>
            <footer class="card__footer" style="display: flex; justify-content: space-between; align-items: center;">
              <span style="font-size: var(--typography-font-size--1); color: var(--foreground-muted);">Section 4 of 4</span>
              <button type="button" class="button button--strong button--accent button--sm">
                <span>Accept Terms</span>
              </button>
            </footer>
          </article>
        </div>
      </section>

    </div>
  `,
};

/**
 * 8. CardWithBand
 * Demonstrating the .card__band interstitial strip for steppers, view switchers, and controls.
 */
export const CardWithBand: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: var(--spacing-24); max-inline-size: 48rem;">
      <div class="card card--bordered card--ruled">
        <article class="card__content">
          <header class="card__header">
            <hgroup class="card__hgroup">
              <h3 class="card__title heading">Project Pipeline</h3>
              <p class="card__subtitle subheading text-muted">With interstitial stepper band</p>
            </hgroup>
            <button type="button" class="button button--subtle button--sm">
              <span>Settings</span>
            </button>
          </header>

          <!-- Interstitial Band between Header and Body -->
          <div class="card__band card__band--subtle">
            <div class="cluster" style="align-items: center; justify-content: space-between; inline-size: 100%;">
              <div class="cluster" style="gap: var(--spacing-8);">
                <span class="status status--accent status--round"><span class="status__text">Step 2 of 4</span></span>
                <span class="micro-heading">Environment Provisioning</span>
              </div>
              <div class="button-group button-group--tight buttons-sm buttons-subtle">
                <button type="button" class="button"><span>Previous</span></button>
                <button type="button" class="button button--strong button--accent"><span>Continue</span></button>
              </div>
            </div>
          </div>

          <div class="card__body">
            <p>The <code>.card__band</code> component provides a dedicated, full-width layout shelf between header and body or body and footer.</p>
            <p>Under <code>.card--ruled</code>, top and bottom dividing lines automatically conform to card boundaries and padding.</p>
          </div>

          <!-- Second Band before Footer -->
          <div class="card__band">
            <span class="small-text text-muted">Estimated completion: 3 minutes remaining</span>
            <span class="status status--success status--plain"><span class="status__text">Runner active</span></span>
          </div>

          <footer class="card__footer" style="display: flex; justify-content: flex-end;">
            <button type="button" class="button button--plain button--sm"><span>View raw logs</span></button>
          </footer>
        </article>
      </div>
    </div>
  `,
};

