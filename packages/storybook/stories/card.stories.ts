import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Components/Card',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
**Card Primitive Component** provides an accessible, token-driven container primitive designed to form the foundational structure for cards, scrollable panels, and dialogs across Design For Humans.

### Canonical Structure
\`\`\`html
<div class="card">
  <div class="card__thumb">
    <img src="..." alt="..." />
  </div>
  <article class="card__content">
    <header class="card__header">
      <hgroup class="card__hgroup">
        <h3 class="card__title"><a href="...">Card Title</a></h3>
        <p class="card__subtitle">Card Subtitle</p>
      </hgroup>
      <button type="button" class="button button--sm button--subtle">
        <span class="visually-hidden">Close</span>
      </button>
    </header>
    <div class="card__body">
      <p>Body copy...</p>
    </div>
    <footer class="card__footer">
      <button type="button" class="button">Action</button>
    </footer>
  </article>
</div>
\`\`\`

### Key Features & Accessibility Standards
- **Container Query Fluid Typography (\`cqi\`):**
  - \`--card-title-font-size: var(--heading-cq-font-size)\`: Smoothly scales using \`clamp()\` based on the card's own container width.
  - \`--card-subtitle-font-size: var(--small-heading-cq-font-size)\`: Subheadings scale proportionally with step 0.
  - \`--card-body-font-size: var(--typography-font-size-0)\`: Reading text remains rock-solid at 1rem (16px) for optimal readability and contrast (WCAG 1.4.4).
- **Sticky Header & Footer Capabilities:**
  - \`.card__header\` and \`.card__footer\` bleed flush to content boundaries via calculated negative margins.
  - Ready for \`position: sticky\` headers and footers for scrollable panels and modal dialogs.
- **Accessible Stretched Link:**
  - Semantic title link (\`.card__title a\`) expands via \`::after { inset: 0; }\`.
  - Secondary buttons and links in \`.card__header\` and \`.card__footer\` stay above the link layer (\`z-index: 2\`).
- **High-Contrast Focus Visible (WCAG 2.4.7 / 2.4.13):**
  - \`&:has(a:focus-visible)\` renders the perimeter focus indicator around the entire card.
- **Reduced Motion Safe Loading State:**
  - \`.card.is-loading\` displays an accessible spinner in default mode and a static \`"Loading"\` label under \`prefers-reduced-motion: reduce\` (WCAG 2.3.3).
- **Dynamic Concentric Radius (\`.card--dynamic-corners\`):**
  - \`--card-radius: calc(min(var(--button-radius), var(--button-min-size)/2) + var(--card-padding) + var(--card-border-width))\`
  - Dynamically aligns outer card boundary curvature with nested button geometry, card padding, and border width for mathematically exact concentric harmony without visual corner pinch.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * 1. Default Article Card
 * Demonstrates the canonical structure: .card > .card__thumb + article.card__content (header.card__header, .card__body, footer.card__footer).
 */
export const Default: Story = {
  render: () => `
    <div style="max-inline-size: 24rem; font-family: var(--body-font-family);">
      <div class="card">
        <div class="card__thumb">
          <img 
            src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80" 
            alt="Geometric architectural structure with clean light-dark contrast" 
            loading="lazy" 
          />
        </div>
        <article class="card__content">
          <header class="card__header">
            <hgroup class="card__hgroup">
              <h3 class="card__title">
                <a href="#">Designing Accessible Design Systems</a>
              </h3>
              <p class="card__subtitle">Web Standards & Token Architecture</p>
            </hgroup>
          </header>
          <div class="card__body">
            <p>
              An exploration into building token-driven UI components that bridge Figma, web standards, and automated assistive technology compliance.
            </p>
          </div>
          <footer class="card__footer">
            <time class="card__date" datetime="2026-09-30">30 September 2026</time>
          </footer>
        </article>
      </div>
    </div>
  `,
};

/**
 * 2. Blog Component Library Example
 * Matches the canonical pattern from designforhumans-blog/templates/_component-library.twig
 * featuring hgroup, a close button in the header, and an action button in the footer.
 */
export const BlogComponentLibraryExample: Story = {
  render: () => `
    <div style="max-inline-size: 24rem; font-family: var(--body-font-family);">
      <div class="card">
        <div class="card__thumb">
          <img 
            src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80" 
            alt="Placeholder card image" 
            loading="lazy" 
          />
        </div>
        <div class="card__content">
          <header class="card__header">
            <hgroup class="card__hgroup">
              <h3 class="card__title"><a href="#">Card Title</a></h3>
              <p class="card__subtitle">Card Subtitle</p>
            </hgroup>
            <button type="button" class="button button--sm button--subtle">
              <svg class="block-link__arrow icon icon--dir" width="32" height="32" aria-hidden="true">
                  <use href="#Close" />
                </svg>
              <span class="visually-hidden">Close</span>
            </button>
          </header>
          <div class="card__body">
            <p>This is a description of the card content.</p>
          </div>
          <footer class="card__footer">
            <button type="button" class="button">Action</button>
          </footer>
        </div>
      </div>
    </div>
  `,
};

/**
 * 3. Loading State
 * Demonstrates .card.is-loading with semi-transparent overlay, wait cursor, disabled links,
 * and a reduced-motion safe spinner.
 */
export const LoadingState: Story = {
  render: () => `
    <div style="max-inline-size: 24rem; font-family: var(--body-font-family);">
      <div class="card is-loading">
        <div class="card__thumb">
          <img 
            src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80" 
            alt="Card loading preview" 
            loading="lazy" 
          />
        </div>
        <article class="card__content">
          <header class="card__header">
            <hgroup class="card__hgroup">
              <h3 class="card__title"><a href="#">Updating Post</a></h3>
              <p class="card__subtitle">Synchronizing Content</p>
            </hgroup>
          </header>
          <div class="card__body">
            <p>Content is currently loading from the headless CMS server.</p>
          </div>
          <footer class="card__footer">
            <button type="button" class="button">Action</button>
          </footer>
        </article>
      </div>
    </div>
  `,
};

/**
 * 4. Container Query Fluid Typography (cqi)
 * Compares the exact same card across 3 different container widths (compact, standard, and wide).
 * Notice how the title and subtitle dynamically scale based on card width!
 */
export const FluidTypographyComparison: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: var(--spacing-2); font-family: var(--body-font-family);">
      <!-- Compact Container (18rem) -->
      <div>
        <span style="font-size: var(--body-small-font-size); color: var(--foreground-muted); display: block; margin-block-end: var(--spacing-0-5);">
          Compact Slot (max-inline-size: 18rem) — Title scales down smoothly via cqi
        </span>
        <div style="max-inline-size: 18rem;">
          <div class="card">
            <article class="card__content">
              <header class="card__header">
                <hgroup class="card__hgroup">
                  <h3 class="card__title"><a href="#">Fluid Typography with cqi Units</a></h3>
                  <p class="card__subtitle">Dynamic scale</p>
                </hgroup>
              </header>
              <div class="card__body">
                <p>The card title scales with container query inline units while body text remains stable at 1rem.</p>
              </div>
              <footer class="card__footer">
                <time datetime="2026-09-30">18rem width</time>
              </footer>
            </article>
          </div>
        </div>
      </div>

      <!-- Standard Container (28rem) -->
      <div>
        <span style="font-size: var(--body-small-font-size); color: var(--foreground-muted); display: block; margin-block-end: var(--spacing-0-5);">
          Standard Slot (max-inline-size: 28rem) — Title interpolates to medium scale
        </span>
        <div style="max-inline-size: 28rem;">
          <div class="card">
            <article class="card__content">
              <header class="card__header">
                <hgroup class="card__hgroup">
                  <h3 class="card__title"><a href="#">Fluid Typography with cqi Units</a></h3>
                  <p class="card__subtitle">Dynamic scale</p>
                </hgroup>
              </header>
              <div class="card__body">
                <p>The card title scales with container query inline units while body text remains stable at 1rem.</p>
              </div>
              <footer class="card__footer">
                <time datetime="2026-09-30">28rem width</time>
              </footer>
            </article>
          </div>
        </div>
      </div>

      <!-- Wide Container (42rem) -->
      <div>
        <span style="font-size: var(--body-small-font-size); color: var(--foreground-muted); display: block; margin-block-end: var(--spacing-0-5);">
          Wide Slot (max-inline-size: 42rem) — Title scales up to full prominent heading
        </span>
        <div style="max-inline-size: 42rem;">
          <div class="card">
            <article class="card__content">
              <header class="card__header">
                <hgroup class="card__hgroup">
                  <h3 class="card__title"><a href="#">Fluid Typography with cqi Units</a></h3>
                  <p class="card__subtitle">Dynamic scale</p>
                </hgroup>
              </header>
              <div class="card__body">
                <p>The card title scales with container query inline units while body text remains stable at 1rem.</p>
              </div>
              <footer class="card__footer">
                <time datetime="2026-09-30">42rem width</time>
              </footer>
            </article>
          </div>
        </div>
      </div>
    </div>
  `,
};

/**
 * 5. Header with Badge & Action Footer
 * Demonstrates a non-media card where the header holds both a title and a badge, and the footer includes an independent action button.
 */
export const WithBadgeAndAction: Story = {
  render: () => `
    <div style="max-inline-size: 26rem; font-family: var(--body-font-family);">
      <div class="card">
        <article class="card__content">
          <header class="card__header">
            <hgroup class="card__hgroup">
              <h3 class="card__title">
                <a href="#">Authentication Settings</a>
              </h3>
              <p class="card__subtitle">Security & Keys</p>
            </hgroup>
            <span class="badge badge--success"><span>Enrolled</span></span>
          </header>
          <div class="card__body">
            <p>
              Two-factor passkey authentication is active. Hardware tokens and biometric devices are synchronized across your team.
            </p>
          </div>
          <footer class="card__footer">
            <span>Updated 2 days ago</span>
            <button type="button" class="button button--subtle">
              <span>Configure</span>
            </button>
          </footer>
        </article>
      </div>
    </div>
  `,
};

/**
 * 6. Sticky Header & Footer Preview (Panel / Dialog Foundation)
 * Demonstrates .card.card--scrollable where .card__header and .card__footer remain sticky while long content in .card__body scrolls beneath them.
 */
export const StickyPanelPreview: Story = {
  render: () => `
    <div style="max-inline-size: 26rem; font-family: var(--body-font-family);">
      <div class="card card--scrollable card--sticky-header card--sticky-footer" style="max-block-size: 30rem">
        <article class="card__content" tabindex="0" aria-label="Scrollable panel content">
          <header class="card__header">
            <hgroup class="card__hgroup">
              <h3 class="card__title">Scrollable Panel Preview</h3>
              <p class="card__subtitle">Sticky Header Active</p>
            </hgroup>
          </header>
          <div class="card__body">
            <p>
              This demonstrates how the flush-bleeding header and footer structure enables seamless sticky headers and footers for panels, dialogs, and drawers.
            </p>
            <p>
              WCAG 2.2 Level AA guidelines require clear visual boundaries, high contrast ratios, and accessible focus states across all interactive elements.
            </p>
            <p>
              Container queries provide true component modularity. Rather than guessing the viewport size, components format themselves according to their available space.
            </p>
            <p>
              Design tokens ensure consistent proportions, fluid clamp calculations, and frictionless Figma synchronization without hardcoded literals.
            </p>
          </div>
          <footer class="card__footer">
            <span>Sticky Footer</span>
            <button type="button" class="button button--primary">
              <span>Save Changes</span>
            </button>
          </footer>
        </article>
      </div>
    </div>
  `,
};

/**
 * 7. Dynamic Concentric Radius (.card--dynamic-corners)
 * Demonstrates the .card--dynamic-corners modifier where --card-radius is calculated dynamically:
 * calc(min(var(--button-radius), var(--button-min-size)/2) + var(--card-padding) + var(--card-border-width))
 * This guarantees concentric curvature harmony between nested action buttons and the outer card boundary.
 */
export const DynamicRadius: Story = {
  args: {
    buttonRadius: 'var(--radius-pill)',
  },
  argTypes: {
    buttonRadius: {
      name: 'Button Radius',
      control: { type: 'select' },
      options: [
        'var(--radius-pill)',
        'var(--radius-xl)',
        'var(--radius-lg)',
        'var(--radius-md)',
        'var(--radius-sm)',
        'var(--radius-none)',
      ],
      description: 'Button radius token driving the outer card concentric curvature.',
    },
  },
  render: (args) => `
    <div style="display: flex; flex-direction: column; gap: var(--spacing-2); font-family: var(--body-font-family); max-inline-size: 60rem;">
      <section>
        <p style="margin-block-end: var(--spacing-0-75); color: var(--foreground-muted); font-size: var(--typography-font-size--1);">
          <strong>Interactive Showcase:</strong> Select a radius token in the Storybook controls above to see the card dynamically adapt its outer curvature to match the nested button's geometry.
        </p>
        <div style="max-inline-size: 26rem;">
          <div class="card card--dynamic-corners" style="--button-radius: ${args.buttonRadius || 'var(--radius-pill)'}; --card-border-width: var(--border-width-1);">
            <article class="card__content">
              <header class="card__header">
                <hgroup class="card__hgroup">
                  <h3 class="card__title">
                    <a href="#">Concentric Alignment</a>
                  </h3>
                  <p class="card__subtitle">Dynamic Formula Driven</p>
                </hgroup>
              </header>
              <div class="card__body">
                <p>
                  Inner button radius plus card padding and border width produces exact concentric alignment, eliminating the visual tension of mismatched corner radii.
                </p>
              </div>
              <footer class="card__footer">
                <span style="font-size: var(--typography-font-size--1); color: var(--foreground-muted);">${args.buttonRadius || 'var(--radius-pill)'}</span>
                <button type="button" class="button button--primary">
                  <span>Action</span>
                </button>
              </footer>
            </article>
          </div>
        </div>
      </section>

      <section>
        <h4 style="margin-block-end: var(--spacing-1); font-size: var(--typography-font-size-1);">
          Concentric Radius Variations
        </h4>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(17rem, 100%), 1fr)); gap: var(--spacing-1);">
          
          <!-- Pill Variant -->
          <div class="card card--dynamic-corners" style="--button-radius: var(--radius-pill); --card-border-width: var(--border-width-1);">
            <article class="card__content">
              <header class="card__header">
                <hgroup class="card__hgroup">
                  <h3 class="card__title"><a href="#">Pill Button</a></h3>
                  <p class="card__subtitle">Capsule Curvature</p>
                </hgroup>
                <span class="badge badge--pill badge--accent"><span>Pill</span></span>
              </header>
              <div class="card__body">
                <p>Caps at half the touch target size + padding for an organic, fully rounded card boundary.</p>
              </div>
              <footer class="card__footer">
                <button type="button" class="button button--primary">
                  <span>Get Started</span>
                </button>
              </footer>
            </article>
          </div>

          <!-- Rounded Variant -->
          <div class="card card--dynamic-corners" style="--button-radius: var(--radius-md); --card-border-width: var(--border-width-1);">
            <article class="card__content">
              <header class="card__header">
                <hgroup class="card__hgroup">
                  <h3 class="card__title"><a href="#">Rounded Button</a></h3>
                  <p class="card__subtitle">Standard Curvature</p>
                </hgroup>
                <span class="badge badge--success"><span>Rounded</span></span>
              </header>
              <div class="card__body">
                <p>Standard UI corner radii with softened exterior boundaries matching internal controls.</p>
              </div>
              <footer class="card__footer">
                <button type="button" class="button button--secondary">
                  <span>Configure</span>
                </button>
              </footer>
            </article>
          </div>

          <!-- Sharp Variant -->
          <div class="card card--dynamic-corners" style="--button-radius: var(--radius-none); --card-border-width: var(--border-width-1);">
            <article class="card__content">
              <header class="card__header">
                <hgroup class="card__hgroup">
                  <h3 class="card__title"><a href="#">Sharp Button</a></h3>
                  <p class="card__subtitle">Technical Curvature</p>
                </hgroup>
                <span class="badge"><span>Sharp</span></span>
              </header>
              <div class="card__body">
                <p>Geometric outline collapsing to pure padding offset for technical dashboards.</p>
              </div>
              <footer class="card__footer">
                <button type="button" class="button button--subtle">
                  <span>Details</span>
                </button>
              </footer>
            </article>
          </div>

        </div>
      </section>
    </div>
  `,
};

/**
 * 8. Card Composition in a Grid
 * Demonstrates that card positioning is handled by standard parent CSS grid layouts or .card-list.
 */
export const InGrid: Story = {
  render: () => `
    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(min(18rem, 100%), 1fr)); gap: var(--spacing-1); font-family: var(--body-font-family); max-inline-size: 60rem;">
      <div class="card">
        <div class="card__thumb">
          <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80" alt="Code editor" />
        </div>
        <article class="card__content">
          <header class="card__header">
            <h3 class="card__title"><a href="#">Native Primitives</a></h3>
          </header>
          <div class="card__body">
            <p>Using native HTML elements to eliminate runtime JavaScript weight.</p>
          </div>
          <footer class="card__footer">
            <time class="card__date" datetime="2026-09-30">Web Standards</time>
          </footer>
        </article>
      </div>

      <div class="card">
        <div class="card__thumb">
          <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80" alt="Circuits" />
        </div>
        <article class="card__content">
          <header class="card__header">
            <h3 class="card__title"><a href="#">Token Architecture</a></h3>
          </header>
          <div class="card__body">
            <p>Single-source-of-truth DTCG design tokens syncing to Figma.</p>
          </div>
          <footer class="card__footer">
            <time class="card__date" datetime="2026-09-30">Design Systems</time>
          </footer>
        </article>
      </div>

      <div class="card">
        <div class="card__thumb">
          <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80" alt="Team meeting" />
        </div>
        <article class="card__content">
          <header class="card__header">
            <h3 class="card__title"><a href="#">Inclusive Workflows</a></h3>
          </header>
          <div class="card__body">
            <p>Empowering autonomous AI coding agents with WCAG 2.2 rules.</p>
          </div>
          <footer class="card__footer">
            <time class="card__date" datetime="2026-09-30">Accessibility</time>
          </footer>
        </article>
      </div>
    </div>
  `,
};
