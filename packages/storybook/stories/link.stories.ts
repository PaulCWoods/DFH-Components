import type { Meta, StoryObj } from '@storybook/html';

interface LinkArgs {
  text: string;
  href: string;
}

const meta: Meta<LinkArgs> = {
  title: 'Components/Link',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
**Link Component Primitives** provide accessible, token-driven inline hyperlinks and interactive card/block links, directly modeling the Design For Humans blog architecture.

### Features & WCAG 2.2 AA / AAA Compliance
- **WCAG 1.4.1 Use of Color:** Standard inline links feature an explicit typographic underline with design-system clearance (\`--underline-offset: 4px\`) and thickness (\`--underline-thickness: 1px\`), ensuring color is never the only visual differentiator.
- **WCAG 1.4.3 & 1.4.6 Contrast:** Achieves >= 4.5:1 (AA) and >= 7:1 (AAA) text contrast against light, dark, and inverted surfaces.
- **WCAG 2.4.7 & 2.4.13 Focus Visible:** Unmistakable 3:1 focus ring (\`--focus-ring-outline\`) with soft radius.
- **Context Schemes:** Automatic or explicit support for default, inverted (\`.link--inverted\`), and on-dark (\`.link--on-dark\`) colorways.
- **Block Link Primitive (\`.block-link\`):** Full-width interactive card/row link with smooth hover fill transitions and micro-animated directional arrows.
        `,
      },
    },
  },
  argTypes: {
    text: { control: 'text', defaultValue: 'Design For Humans web guidelines' },
    href: { control: 'text', defaultValue: '#' },
  },
};

export default meta;
type Story = StoryObj<LinkArgs>;

/**
 * 1. Default Inline Link
 * Demonstrates inline text links inside running paragraph copy with accessible underlines and hover transitions.
 */
export const Default: Story = {
  args: {
    text: 'WCAG 2.2 accessibility checklist',
    href: '#',
  },
  render: (args) => `
    <div class="wrapper wrapper--lg">
      <p class="text" style="margin: 0;">
        Building an accessible digital ecosystem begins with foundational standards. Explore our 
        <a href="${args.href}" class="link"><span>${args.text}</span></a> 
        to learn how to meet Level AA and Level AAA compliance across your components.
      </p>
    </div>
  `,
};

/**
 * 2. Color Schemes & Contexts
 * Compares default, inverted, and on-dark link variants across light, inverted, and dark container backgrounds.
 */
export const ColorSchemes: Story = {
  render: () => `
    <div class="stack">
      <!-- Default Scheme on Standard Card -->
      <div class="card" style="padding: var(--spacing-16);">
        <span class="small-text" style="color: var(--foreground-muted); display: block; margin-block-end: var(--spacing-8);">Default Surface & Scheme</span>
        <p class="text" style="margin: 0;">
          Read our latest article on <a href="#" class="link">modern token architecture</a> for scalable cross-platform UI.
        </p>
      </div>

      <!-- Inverted Context Scheme -->
      <div class="card color-palette-inverted" style="padding: var(--spacing-16);">
        <span class="small-text" style="opacity: 0.8; display: block; margin-block-end: var(--spacing-8);">Inverted Container (.link--inverted)</span>
        <p class="text" style="margin: 0;">
          Contrast notice: Review the <a href="#" class="link link--inverted">accessibility conformance report</a> in full detail.
        </p>
      </div>

      <!-- Dark Container Scheme -->
      <div class="card color-palette-dark" style="padding: var(--spacing-16);">
        <span class="small-text" style="opacity: 0.8; display: block; margin-block-end: var(--spacing-8);">Dark Container (.link--on-dark)</span>
        <p class="text" style="margin: 0;">
          Deep theme footer: Access the <a href="#" class="link link--on-dark">component source repository</a> on GitHub.
        </p>
      </div>
    </div>
  `,
};

/**
 * 3. External Link with Accessible Icon
 * Adheres to WCAG 2.2 best practices: incorporates a visually hidden "(opens in new tab)" disclaimer and aria-hidden icon.
 */
export const ExternalLink: Story = {
  render: () => `
    <div class="wrapper wrapper--lg">
      <p class="text" style="margin: 0;">
        For comprehensive W3C recommendations, visit the official 
        <a href="https://www.w3.org/WAI/standards-guidelines/wcag/" target="_blank" rel="noopener noreferrer" class="link">
          <span>W3C Web Accessibility Initiative</span>
          <span class="visually-hidden"> (opens in a new tab)</span>
          <svg class="icon icon--dir" width="32" height="32" aria-hidden="true" focusable="false">
            <use href="#ArrowUpRight"/>
          </svg>
        </a> 
        portal.
      </p>
    </div>
  `,
};

/**
 * 4. Subtle Link Variant
 * Seamlessly inherits surrounding body color at rest, lighting up on hover, active, or focus.
 */
export const SubtleLink: Story = {
  render: () => `
    <div class="inline">
      <span class="small-text" style="color: var(--foreground-muted);">Published in:</span>
      <a href="#" class="link link--subtle">Design Systems</a>
      <span style="color: var(--foreground-muted);">•</span>
      <a href="#" class="link link--subtle">Accessibility</a>
      <span style="color: var(--foreground-muted);">•</span>
      <a href="#" class="link link--subtle">Web Standards</a>
    </div>
  `,
};

/**
 * 5. Block Link Primitive (Standalone Callout)
 * Full-width interactive card link from the Design For Humans blog, complete with responsive flex layout and directional hover arrow micro-interaction.
 */
export const BlockLink: Story = {
  render: () => `
    <div class="wrapper wrapper--lg">
      <a href="#" class="block-link">
        <span class="block-link__text">Go to accessibility case study</span>
        <svg class="block-link__arrow icon icon--dir" width="32" height="32" aria-hidden="true" focusable="false">
          <use href="#ArrowRight"/>
        </svg>
      </a>
    </div>
  `,
};

/**
 * 6. Block Link Group / Category Directory
 * Canonical pattern from the Design For Humans blog category and topic listings.
 */
export const BlockLinkDirectory: Story = {
  render: () => `
    <div class="wrapper wrapper--lg">
      <h3 class="heading" style="margin-block-start: 0; margin-block-end: var(--spacing-12);">
        Recommended Articles
      </h3>
      <ul class="stack gap-sm" style="list-style: none; margin: 0; padding: 0;">
        <li>
          <a href="#" class="block-link">
            <span class="block-link__text">Color Contrast Beyond 4.5:1</span>
            <svg class="block-link__arrow icon icon--dir" width="32" height="32" aria-hidden="true" focusable="false">
              <use href="#ArrowRight"/>
            </svg>
          </a>
        </li>
        <li>
          <a href="#" class="block-link">
            <span class="block-link__text">Zero-JS Dialogs with Declarative Invokers</span>
            <svg class="block-link__arrow icon icon--dir" width="32" height="32" aria-hidden="true" focusable="false">
              <use href="#ArrowRight"/>
            </svg>
          </a>
        </li>
        <li>
          <a href="#" class="block-link">
            <span class="block-link__text">Fluid Typography and Modular Math</span>
            <svg class="block-link__arrow icon icon--dir" width="32" height="32" aria-hidden="true" focusable="false">
              <use href="#ArrowRight"/>
            </svg>
          </a>
        </li>
      </ul>
    </div>
  `,
};
