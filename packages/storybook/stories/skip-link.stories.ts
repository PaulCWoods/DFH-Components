import type { Meta, StoryObj } from '@storybook/html';

interface SkipLinkArgs {
  label: string;
  targetId: string;
}

const meta: Meta<SkipLinkArgs> = {
  title: 'Components/Skip Link',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
**Skip Link Primitive** provides keyboard, switch, and screen reader users a mechanism to bypass repetitive navigation landmarks and jump directly to landmark page content (WCAG 2.4.1 Bypass Blocks).

### Architecture & Design For Humans Standards
- **In-Flow Top Banner:** By default, \`.skip-link\` sits at the very top of the page structure (\`block-size: 0; overflow: hidden;\`). When focused, it smoothly expands into an attention-grabbing, high-contrast banner (\`surface.accent-strong\` + \`foreground.inverted\`).
- **WCAG 2.4.1 (Level A):** Mandatory landmark skip mechanism.
- **WCAG 2.4.7 & 2.4.13 (Level AA/AAA):** High-contrast focus ring with negative offset (\`calc(var(--focus-ring-outline-offset) * -2)\`), pulling the ring inward so it never clips against viewport edges.
- **WCAG 2.5.5 (Level AAA):** Minimum 48px touch target (\`--skip-link-min-size: var(--spacing-target)\`).
- **Safe Area Inset Aware:** Inset padding handles notch/island areas on mobile devices (\`env(safe-area-inset-left)\` / \`env(safe-area-inset-right)\`).
- **Visited State Contrast:** Retains \`--foreground-inverted\` on \`:visited\` so links never turn low-contrast purple.
        `,
      },
    },
  },
  argTypes: {
    label: { control: 'text', defaultValue: 'Skip to main content' },
    targetId: { control: 'text', defaultValue: 'main' },
  },
};

export default meta;
type Story = StoryObj<SkipLinkArgs>;

/**
 * Default Top Banner Skip Link (Canonical DFH Blog Pattern).
 * Click the "Focus Skip Link" button or press Tab to see the high-contrast banner expand from the top.
 */
export const Default: Story = {
  args: {
    label: 'Skip to main content',
    targetId: 'main',
  },
  render: (args) => `
    <div class="card" style="overflow: hidden; padding: 0;">
      <!-- In-Flow Top Banner Skip Link -->
      <a href="#${args.targetId}" class="skip-link">
        <span>${args.label}</span>
      </a>

      <!-- Site Wrapper -->
      <div style="padding: var(--spacing-16);">
        <!-- Instructions for Reviewers -->
        <div class="card" style="margin-block-end: var(--spacing-16); background-color: var(--surface-translucent);">
          <div class="inline" style="justify-content: space-between; width: 100%;">
            <span class="small-text">⌨️ Press <kbd style="background: var(--surface-card); border: var(--border); padding: 2px 6px; border-radius: 4px;">Tab</kbd> to focus the Skip Link</span>
            <button type="button" class="button button--subtle button--sm" onclick="document.querySelector('.skip-link')?.focus()">
              <span>Focus Skip Link</span>
            </button>
          </div>
        </div>

        <!-- Repetitive Header & Navigation -->
        <header class="card" style="margin-block-end: var(--spacing-16);">
          <nav aria-label="Main Navigation" class="inline">
            <strong class="title">Design For Humans</strong>
            <a href="#" class="button button--subtle button--sm">Articles</a>
            <a href="#" class="button button--subtle button--sm">Guides</a>
            <a href="#" class="button button--subtle button--sm">About</a>
          </nav>
        </header>

        <!-- Main Content Landmark -->
        <main id="${args.targetId}" tabindex="-1" class="card" style="outline: none;">
          <h2 class="heading" style="margin-block-start: 0;">Main Landmark (#${args.targetId})</h2>
          <p class="text" style="color: var(--foreground-muted); margin-block-end: 0;">
            Activating the Skip Link bypasses the header navigation and directs keyboard focus directly to this main article container.
          </p>
        </main>
      </div>
    </div>
  `,
};

/**
 * Static Banner Preview.
 * Renders the skip link in its expanded state to inspect color contrast, typography, and inset focus indicators.
 */
export const BannerVisiblePreview: Story = {
  render: () => `
    <div class="card" style="overflow: hidden; padding: 0;">
      <a href="#main" class="skip-link" style="block-size: auto; min-block-size: var(--spacing-target);">
        <span>Skip to main content</span>
      </a>

      <div style="padding: var(--spacing-24);">
        <p class="text" style="color: var(--foreground-muted); margin: 0;">
          This banner uses <code>--surface-accent-strong</code> for high visibility and <code>--foreground-inverted</code> for WCAG AAA contrast.
        </p>
      </div>
    </div>
  `,
};

/**
 * Floating / Anchored Round Modifier (.skip-link--floating).
 * For layouts preferring a corner card overlay rather than an in-flow full-width banner.
 */
export const FloatingPill: Story = {
  render: () => `
    <div class="card" style="min-block-size: 260px; position: relative;">
      <!-- Floating Skip Link -->
      <a href="#main-floating" class="skip-link skip-link--floating">
        <span>Skip to main content</span>
      </a>

      <div style="margin-block-end: var(--spacing-16);">
        <button type="button" class="button button--subtle button--sm" onclick="document.querySelector('.skip-link--floating')?.focus()">
          <span>Focus Floating Skip Link</span>
        </button>
      </div>

      <main id="main-floating" tabindex="-1" class="card" style="outline: none;">
        <h3 class="heading" style="margin-block-start: 0;">Main Landmark</h3>
        <p class="text" style="margin-block-end: 0; color: var(--foreground-muted);">
          Floating round slides down from the top-start corner when focused.
        </p>
      </main>
    </div>
  `,
};

/**
 * Multiple Skip Destinations (.skip-links).
 * Allows users to choose between skipping to Main Content, Navigation, or Footer landmarks.
 */
export const MultipleDestinations: Story = {
  render: () => `
    <div class="card" style="overflow: hidden; padding: 0;">
      <!-- Grouped Skip Links Container (Semantic Nav & List) -->
      <nav class="skip-links" aria-label="Skip links">
        <ul>
          <li>
            <a href="#dest-main" class="skip-link">
              <span>Skip to main content</span>
            </a>
          </li>
          <li>
            <a href="#dest-nav" class="skip-link">
              <span>Skip to navigation</span>
            </a>
          </li>
          <li>
            <a href="#dest-footer" class="skip-link">
              <span>Skip to footer</span>
            </a>
          </li>
        </ul>
      </nav>

      <div style="padding: var(--spacing-16);">
        <div style="margin-block-end: var(--spacing-16);">
          <button type="button" class="button button--subtle button--sm" onclick="document.querySelector('.skip-links .skip-link')?.focus()">
            <span>Focus First Landmark Link</span>
          </button>
        </div>

        <nav id="dest-nav" tabindex="-1" class="card" style="margin-block-end: var(--spacing-16); outline: none;">
          <strong>Navigation Landmark (#dest-nav)</strong>
        </nav>

        <main id="dest-main" tabindex="-1" class="card" style="margin-block-end: var(--spacing-16); outline: none;">
          <h3 class="heading" style="margin-block-start: 0;">Main Content (#dest-main)</h3>
          <p class="text" style="color: var(--foreground-muted); margin-block-end: 0;">Primary article content.</p>
        </main>

        <footer id="dest-footer" tabindex="-1" class="card" style="outline: none;">
          <strong>Footer Landmark (#dest-footer)</strong>
        </footer>
      </div>
    </div>
  `,
};
