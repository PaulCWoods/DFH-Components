import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Components/Icon',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
**Icon Component Primitive** provides dynamic, accessible inline SVG sizing and automatic bidirectional mirroring directly based on the Design For Humans blog architecture and SVG sprite system (\`icons/icons.html\` & \`icons/icons.svg\`).

### Architectural Highlights
- **Sprite Reference via \`<use href="#id"/>\`:** Icons are instantiated cleanly using SVG \`<use>\` referencing pre-defined vector symbols in the sprite.
- **Fluid Font-Relative Scaling (\`1em × 1em\`):** The icon scales naturally with the surrounding text typography (from micro text to display headings) with no fixed pixel dimensions.
- **Dynamic Theme Color (\`fill: currentColor\`):** Inherits the current text color across all color themes, surfaces, and active states.
- **RTL Directional Flipping (\`scale: -1 1\`):** Directional icons marked with \`.icon--dir\` (or \`.dir\`) automatically flip horizontally when placed inside an RTL language context (\`[dir="rtl"]\`).
- **Accessible Baseline Alignment (\`vertical-align: middle\`):** Aligns seamlessly with adjacent text without breaking typographic bounding boxes.
- **Accessibility:** Purely decorative icons must have \`aria-hidden="true"\` and \`focusable="false"\`.

### Canonical Usage Pattern
\`\`\`html
<svg class="icon icon--dir" width="32" height="32" aria-hidden="true">
  <use href="#ArrowUpRight"/>
</svg>
\`\`\`
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const ALL_SPRITE_ICONS = [
  { id: 'ArrowRight', name: 'Arrow Right', directional: true },
  { id: 'ArrowLeft', name: 'Arrow Left', directional: true },
  { id: 'ArrowUp', name: 'Arrow Up', directional: false },
  { id: 'ArrowDown', name: 'Arrow Down', directional: false },
  { id: 'ArrowUpRight', name: 'Arrow Up Right', directional: true },
  { id: 'ArrowUpLeft', name: 'Arrow Up Left', directional: true },
  { id: 'ArrowStart', name: 'Arrow Start', directional: true },
  { id: 'ArrowEnd', name: 'Arrow End', directional: true },
  { id: 'ArrowTop', name: 'Arrow Top', directional: false },
  { id: 'ArrowBottom', name: 'Arrow Bottom', directional: false },
  { id: 'Check', name: 'Check', directional: false },
  { id: 'Close', name: 'Close', directional: false },
  { id: 'Warning', name: 'Warning', directional: false },
  { id: 'Error', name: 'Error', directional: false },
  { id: 'Info', name: 'Info', directional: false },
  { id: 'Help', name: 'Help', directional: false },
  { id: 'Question', name: 'Question', directional: false },
  { id: 'Progress', name: 'Progress', directional: false },
  { id: 'Search', name: 'Search', directional: false },
  { id: 'Settings', name: 'Settings', directional: false },
  { id: 'User', name: 'User', directional: false },
  { id: 'Lock', name: 'Lock', directional: false },
  { id: 'Unlock', name: 'Unlock', directional: false },
  { id: 'Star', name: 'Star', directional: false },
  { id: 'Starred', name: 'Starred', directional: false },
  { id: 'Bookmark', name: 'Bookmark', directional: false },
  { id: 'Bookmarked', name: 'Bookmarked', directional: false },
  { id: 'Cart', name: 'Cart', directional: false },
  { id: 'Email', name: 'Email', directional: false },
  { id: 'Download', name: 'Download', directional: false },
  { id: 'Print', name: 'Print', directional: false },
  { id: 'Home', name: 'Home', directional: false },
  { id: 'Navigation', name: 'Navigation', directional: false },
  { id: 'Plus', name: 'Plus', directional: false },
  { id: 'Minus', name: 'Minus', directional: false },
  { id: 'Artboard1', name: 'Artboard', directional: false },
];

/**
 * 1. Default Inline Icons
 * Shows sprite icons embedded alongside text, inheriting the font size, line-height, and color of their parent element.
 */
export const Default: Story = {
  render: () => `
    <div style="font-family: var(--body-font-family); display: flex; flex-direction: column; gap: var(--spacing-1);">
      <p style="margin: 0; font-size: var(--body-font-size); line-height: var(--body-line-height);">
        Accessible design system with automated verification 
        <svg class="icon" aria-hidden="true" focusable="false" style="color: var(--foreground-success);"><use href="#Check"/></svg> 
        and high-contrast guidance 
        <svg class="icon icon--dir" aria-hidden="true" focusable="false"><use href="#ArrowRight"/></svg>.
      </p>

      <p style="margin: 0; font-size: var(--body-small-font-size); color: var(--foreground-muted);">
        <svg class="icon" aria-hidden="true" focusable="false"><use href="#Info"/></svg> 
        Secondary caption text scales the icon down automatically to match its 1em bounding box.
      </p>
    </div>
  `,
};

/**
 * 2. Typography Scaling
 * Demonstrates how a single .icon declaration scales proportionally across all typography sizes without pixel distortion.
 */
export const TypographyScaling: Story = {
  render: () => `
    <div style="font-family: var(--body-font-family); display: flex; flex-direction: column; gap: var(--spacing-1);">
      <div style="font-size: var(--title-font-size); font-weight: var(--title-font-weight); display: flex; align-items: center; gap: var(--spacing-0-5);">
        <span>Title Step</span>
        <svg class="icon icon--dir" aria-hidden="true" focusable="false"><use href="#ArrowUpRight"/></svg>
      </div>

      <div style="font-size: var(--heading-font-size); font-weight: var(--heading-font-weight); display: flex; align-items: center; gap: var(--spacing-0-5);">
        <span>Heading Step</span>
        <svg class="icon icon--dir" aria-hidden="true" focusable="false"><use href="#ArrowUpRight"/></svg>
      </div>

      <div style="font-size: var(--body-font-size); display: flex; align-items: center; gap: var(--spacing-0-5);">
        <span>Body Step (1rem)</span>
        <svg class="icon icon--dir" aria-hidden="true" focusable="false"><use href="#ArrowUpRight"/></svg>
      </div>

      <div style="font-size: var(--body-small-font-size); color: var(--foreground-muted); display: flex; align-items: center; gap: var(--spacing-0-5);">
        <span>Small Step</span>
        <svg class="icon icon--dir" aria-hidden="true" focusable="false"><use href="#ArrowUpRight"/></svg>
      </div>
    </div>
  `,
};

/**
 * 3. RTL Language Directional Mirroring
 * Directional icons (.icon--dir / .dir) automatically mirror with scale: -1 1 in right-to-left contexts,
 * while non-directional icons (e.g., checkmarks, info symbols) retain their orientation.
 */
export const RTLMirroring: Story = {
  render: () => `
    <div style="font-family: var(--body-font-family); display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: var(--spacing-1);">
      <!-- Left-to-Right (LTR) Context -->
      <div dir="ltr" style="padding: var(--spacing-1); background-color: var(--surface-card); border: var(--border-default); border-radius: var(--ui-radius);">
        <strong style="display: block; margin-block-end: var(--spacing-0-5); font-size: var(--body-small-font-size); color: var(--foreground-muted);">
          Left-to-Right (dir="ltr")
        </strong>
        <div style="display: flex; gap: var(--spacing-1); align-items: center;">
          <span>Forward:</span>
          <svg class="icon icon--dir" width="32" height="32" aria-hidden="true" focusable="false"><use href="#ArrowRight"/></svg>
          <span>Diagonal:</span>
          <svg class="icon icon--dir" width="32" height="32" aria-hidden="true" focusable="false"><use href="#ArrowUpRight"/></svg>
          <span>Non-directional:</span>
          <svg class="icon" width="32" height="32" aria-hidden="true" focusable="false" style="color: var(--foreground-success);"><use href="#Check"/></svg>
        </div>
      </div>

      <!-- Right-to-Left (RTL) Context -->
      <div dir="rtl" style="padding: var(--spacing-1); background-color: var(--surface-card); border: var(--border-default); border-radius: var(--ui-radius);">
        <strong style="display: block; margin-block-end: var(--spacing-0-5); font-size: var(--body-small-font-size); color: var(--foreground-muted);">
          Right-to-Left (dir="rtl") — Automatically Flipped
        </strong>
        <div style="display: flex; gap: var(--spacing-1); align-items: center;">
          <span>Forward:</span>
          <svg class="icon icon--dir" width="32" height="32" aria-hidden="true" focusable="false"><use href="#ArrowRight"/></svg>
          <span>Diagonal:</span>
          <svg class="icon icon--dir" width="32" height="32" aria-hidden="true" focusable="false"><use href="#ArrowUpRight"/></svg>
          <span>Non-directional:</span>
          <svg class="icon" width="32" height="32" aria-hidden="true" focusable="false" style="color: var(--foreground-success);"><use href="#Check"/></svg>
        </div>
      </div>
    </div>
  `,
};

/**
 * 4. All Icons Gallery (Complete SVG Sprite Collection)
 * Displays every vector symbol available in the Design For Humans sprite collection.
 */
export const AllIcons: Story = {
  render: () => `
    <div style="font-family: var(--body-font-family);">
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); gap: var(--spacing-1);">
        ${ALL_SPRITE_ICONS.map(
          (icon) => `
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: var(--spacing-1); background-color: var(--surface-card); border: var(--border-default); border-radius: var(--ui-radius); text-align: center; gap: var(--spacing-0-5);">
              <svg class="icon ${icon.directional ? 'icon--dir' : ''}" width="32" height="32" aria-hidden="true" focusable="false" style="font-size: 2rem;">
                <use href="#${icon.id}"/>
              </svg>
              <code style="font-size: 11px; color: var(--foreground-muted); word-break: break-all;">#${icon.id}</code>
              ${icon.directional ? '<span style="font-size: 9px; padding: 2px 4px; background-color: var(--surface-accent); color: var(--foreground-accent); border-radius: 4px;">RTL Dir</span>' : ''}
            </div>
          `
        ).join('')}
      </div>
    </div>
  `,
};
