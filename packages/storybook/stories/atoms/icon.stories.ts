import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Atoms/Icon',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# Icon & Icon Box Primitives

Accessible inline SVG icon component that scales proportionally with surrounding typography (\`1em × 1em\`), inherits semantic text colors (\`fill: currentColor\`), and automatically mirrors directional glyphs in right-to-left contexts (\`scale: -1 1\`). Composes with \`.icon-box\` for 48px AAA touch targets adhering to WCAG 2.2 standards.

---

### Canonical Semantic Markup Signatures

#### 1. Decorative Inline Icon
\`\`\`html
<!-- Purely decorative icon next to visible text -->
<svg class="icon icon--dir" aria-hidden="true" focusable="false">
  <use href="#ArrowRight"/>
</svg>
\`\`\`

#### 2. Standalone Icon Button with Screen Reader Label
\`\`\`html
<!-- Interactive icon button with mandatory visually-hidden accessible name -->
<button type="button" class="button button--icon" aria-label="Search site">
  <svg class="icon" aria-hidden="true" focusable="false">
    <use href="#Search"/>
  </svg>
</button>
\`\`\`

#### 3. Bounding Touch Box Container
\`\`\`html
<div class="icon-box" aria-hidden="true">
  <svg class="icon" aria-hidden="true" focusable="false">
    <use href="#Bell"/>
  </svg>
</div>
\`\`\`

---

### WCAG 2.2 Conformance Matrix
| Criterion | Level | Status | Architectural Implementation |
| :--- | :--- | :--- | :--- |
| **1.1.1 Non-Text Content** | A | **Pass** | Decorative SVGs carry \`aria-hidden="true"\` and \`focusable="false"\`; interactive icons require \`.visually-hidden\` text or \`aria-label\`. |
| **1.4.3 Contrast (Minimum)** | AA (4.5:1) | **Pass** | Uses \`fill: currentColor\`, inheriting high-contrast tokens from parent text. |
| **Bidirectional Mirroring** | Best Practice | **Pass** | Directional glyphs marked \`.icon--dir\` automatically flip (\`scale: -1 1\`) inside \`[dir="rtl"]\` language boundaries. |
| **2.5.5 Target Size (Enhanced)** | AAA (48×48px) | **Pass** | \`.icon-box\` matches 48px button target dimensions (\`--spacing-target, 3rem\`). |
| **2.5.8 Target Size (Minimum)** | AA (24×24px) | **Pass** | Compact \`.icon-box--sm\` enforces 32px square bounding box. |

---

### CSS Custom Property Token Contract
| CSS Variable | Default Value | Fallback Ladder | Description |
| :--- | :--- | :--- | :--- |
| \`--icon-size\` | \`1em\` | \`1em\` | Proportional glyph width and height relative to font size |
| \`--icon-size-lg\` | \`1.5em\` | \`1.5em\` | Large icon size modifier |
| \`--icon-size-xl\` | \`2em\` | \`2em\` | Extra large icon size modifier |
| \`--_icon-box-size\` | \`var(--icon-box-size)\` | \`var(--spacing-target, 3rem)\` | Touch target bounding box width and height |
| \`--_icon-box-padding\` | \`var(--icon-box-padding)\` | \`var(--button-padding-block, 0.25rem)\` | Inner padding around glyph |
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const KEY_ICONS = [
  'ArrowRight',
  'ArrowLeft',
  'ArrowUpRight',
  'ChevronDown',
  'Check',
  'Close',
  'Info',
  'Warning',
  'Bell',
  'Search',
  'Settings',
  'User',
  'Lock',
  'VolumeOn',
  'VolumeLow',
  'VolumeOff',
  'Muted',
  'Record',
  'Music',
  'Disc',
  'Cognition',
  'Hearing',
  'Mobility',
  'Neurology',
  'Person',
  'Quote',
  'BrandDesignForHumans',
  'BrandBluesky',
  'BrandLinkedIn',
  'BrandMedium',
];

/**
 * 1. Playground
 * Interactive sandbox exploring icon glyphs, sizes, directionality, and colors.
 */
export const Playground: Story = {
  args: {
    iconId: 'ArrowRight',
    isDirectional: true,
    size: 'default',
    dir: 'ltr',
    colorTheme: 'accent',
  },
  argTypes: {
    iconId: {
      name: 'Icon ID',
      control: { type: 'select' },
      options: KEY_ICONS,
      description: 'Vector symbol ID in the SVG sprite.',
    },
    isDirectional: {
      name: 'Directional RTL Mirroring',
      control: { type: 'boolean' },
      description: 'Adds .icon--dir to mirror horizontally in RTL mode.',
    },
    size: {
      name: 'Size Tier',
      control: { type: 'inline-radio' },
      options: ['default', 'lg', 'xl'],
      description: 'Glyph scale relative to font-size (1em, 1.5em, 2em).',
    },
    dir: {
      name: 'Document Direction',
      control: { type: 'inline-radio' },
      options: ['ltr', 'rtl'],
      description: 'Simulates LTR vs RTL context.',
    },
    colorTheme: {
      name: 'Color Theme',
      control: { type: 'select' },
      options: ['current', 'accent', 'success', 'warning', 'danger'],
      description: 'Color token applied to parent container.',
    },
  },
  render: (args) => {
    const sizeClass = args.size === 'lg' ? 'icon--lg' : args.size === 'xl' ? 'icon--xl' : '';
    const dirClass = args.isDirectional ? 'icon--dir' : '';
    const colorVar = args.colorTheme === 'current'
      ? 'currentColor'
      : `var(--foreground-${args.colorTheme})`;

    return `
      <div dir="${args.dir}" style="max-inline-size: 32rem; margin-inline: auto; padding: var(--spacing-24); border: 1px dashed var(--border-color); border-radius: var(--radius-md); text-align: center;">
        <div style="font-size: var(--typography-font-size-2); color: ${colorVar}; display: flex; align-items: center; justify-content: center; gap: var(--spacing-12);">
          <span>Context Text (${args.dir.toUpperCase()})</span>
          <svg class="icon ${sizeClass} ${dirClass}" aria-hidden="true" focusable="false">
            <use href="#${args.iconId}"/>
          </svg>
        </div>
      </div>
    `;
  },
};

/**
 * 2. Anatomy
 * Exploded breakdown highlighting 1em bounding box, vertical-align middle, and RTL scale.
 */
export const Anatomy: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: var(--spacing-24); max-inline-size: 46rem;">
      <div class="demo-card-callout" style="padding: var(--spacing-16); border: 1px dashed var(--border-color); border-radius: var(--radius-md); background: var(--surface-muted);">
        <p style="margin: 0; font-size: var(--typography-font-size--1); color: var(--foreground-muted);">
          <strong>Structural Breakdown:</strong> <code>.icon</code> enforces <code>display: inline-block; inline-size: 1em; block-size: 1em; vertical-align: middle; fill: currentColor;</code>. Directional icons (<code>.icon--dir</code>) automatically mirror (<code>scale: -1 1</code>) under <code>[dir="rtl"]</code>.
        </p>
      </div>

      <div style="padding: var(--spacing-24); border: 2px dashed var(--color-accent); border-radius: var(--radius-md); display: flex; flex-direction: column; gap: var(--spacing-16);">
        <div style="font-size: 2rem; display: flex; align-items: center; gap: var(--spacing-16);">
          <span style="font-size: var(--typography-font-size-1);">1em × 1em Glyphs:</span>
          <div style="outline: 1px dashed var(--color-success); display: inline-flex; padding: 2px;">
            <svg class="icon icon--dir" aria-hidden="true" focusable="false"><use href="#ArrowRight"/></svg>
          </div>
          <div style="outline: 1px dashed var(--color-accent); display: inline-flex; padding: 2px;">
            <svg class="icon" aria-hidden="true" focusable="false"><use href="#Check"/></svg>
          </div>
        </div>

        <div style="font-size: var(--typography-font-size--1); color: var(--foreground-muted);">
          Green box indicates the 1em square bounding boundary scaled from the current font size.
        </div>
      </div>
    </div>
  `,
};

/**
 * 3. Variants
 * Visual gallery showcasing inline scaling, size modifiers, and icon box targets.
 */
export const Variants: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: var(--spacing-32); max-inline-size: 48rem;">
      
      <!-- Variant 1: Size Modifiers -->
      <div>
        <span style="font-size: var(--typography-font-size--1); color: var(--foreground-muted); display: block; margin-block-end: var(--spacing-8);">
          1. Size Modifier Classes (.icon--xs, .icon--sm, .icon, .icon--lg, .icon--xl, .icon--2xl)
        </span>
        <div style="display: flex; flex-wrap: wrap; align-items: center; gap: var(--spacing-24); padding: var(--spacing-16); border: 1px solid var(--border-color); border-radius: var(--radius-md);">
          <div style="display: flex; align-items: center; gap: var(--spacing-8);">
            <svg class="icon icon--xs" aria-hidden="true"><use href="#Bell"/></svg>
            <span style="font-size: var(--typography-font-size--1);">.icon--xs (0.75em)</span>
          </div>
          <div style="display: flex; align-items: center; gap: var(--spacing-8);">
            <svg class="icon icon--sm" aria-hidden="true"><use href="#Bell"/></svg>
            <span style="font-size: var(--typography-font-size--1);">.icon--sm (0.875em)</span>
          </div>
          <div style="display: flex; align-items: center; gap: var(--spacing-8);">
            <svg class="icon" aria-hidden="true"><use href="#Bell"/></svg>
            <span style="font-size: var(--typography-font-size--1);">Default (1em)</span>
          </div>
          <div style="display: flex; align-items: center; gap: var(--spacing-8);">
            <svg class="icon icon--lg" aria-hidden="true"><use href="#Bell"/></svg>
            <span style="font-size: var(--typography-font-size--1);">.icon--lg (1.25em)</span>
          </div>
          <div style="display: flex; align-items: center; gap: var(--spacing-8);">
            <svg class="icon icon--xl" aria-hidden="true"><use href="#Bell"/></svg>
            <span style="font-size: var(--typography-font-size--1);">.icon--xl (1.5em)</span>
          </div>
          <div style="display: flex; align-items: center; gap: var(--spacing-8);">
            <svg class="icon icon--2xl" aria-hidden="true"><use href="#Bell"/></svg>
            <span style="font-size: var(--typography-font-size--1);">.icon--2xl (2em)</span>
          </div>
        </div>
      </div>

      <!-- Semantic Tone Modifiers -->
      <div>
        <span style="font-size: var(--typography-font-size--1); color: var(--foreground-muted); display: block; margin-block-end: var(--spacing-8);">
          1b. Semantic Tone Modifiers (.icon--accent, .icon--success, .icon--warning, .icon--danger, .icon--muted)
        </span>
        <div style="display: flex; flex-wrap: wrap; align-items: center; gap: var(--spacing-24); padding: var(--spacing-16); border: 1px solid var(--border-color); border-radius: var(--radius-md);">
          <div style="display: flex; align-items: center; gap: var(--spacing-8);">
            <svg class="icon icon--accent icon--lg" aria-hidden="true"><use href="#Star"/></svg>
            <span style="font-size: var(--typography-font-size--1);">Accent</span>
          </div>
          <div style="display: flex; align-items: center; gap: var(--spacing-8);">
            <svg class="icon icon--success icon--lg" aria-hidden="true"><use href="#Check"/></svg>
            <span style="font-size: var(--typography-font-size--1);">Success</span>
          </div>
          <div style="display: flex; align-items: center; gap: var(--spacing-8);">
            <svg class="icon icon--warning icon--lg" aria-hidden="true"><use href="#Warning"/></svg>
            <span style="font-size: var(--typography-font-size--1);">Warning</span>
          </div>
          <div style="display: flex; align-items: center; gap: var(--spacing-8);">
            <svg class="icon icon--danger icon--lg" aria-hidden="true"><use href="#Error"/></svg>
            <span style="font-size: var(--typography-font-size--1);">Danger</span>
          </div>
          <div style="display: flex; align-items: center; gap: var(--spacing-8);">
            <svg class="icon icon--muted icon--lg" aria-hidden="true"><use href="#Settings"/></svg>
            <span style="font-size: var(--typography-font-size--1); color: var(--foreground-muted);">Muted</span>
          </div>
        </div>
      </div>

      <!-- Variant 2: RTL Mirroring Comparison -->
      <div>
        <span style="font-size: var(--typography-font-size--1); color: var(--foreground-muted); display: block; margin-block-end: var(--spacing-8);">
          2. Directional Flipping (.icon--dir in LTR vs RTL)
        </span>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr)); gap: var(--spacing-16);">
          <div dir="ltr" class="pd bd rd">
            <strong style="display: block; margin-block-end: var(--spacing-8); font-size: var(--typography-font-size--1);">Left-to-Right (dir="ltr")</strong>
            <div style="display: flex; gap: var(--spacing-12); align-items: center;">
              <span>Forward:</span>
              <svg class="icon icon--dir" aria-hidden="true"><use href="#ArrowRight"/></svg>
              <span>Diagonal:</span>
              <svg class="icon icon--dir" aria-hidden="true"><use href="#ArrowUpRight"/></svg>
            </div>
          </div>
          <div dir="rtl" class="pd bd rd">
            <strong style="display: block; margin-block-end: var(--spacing-8); font-size: var(--typography-font-size--1);">Right-to-Left (dir="rtl") — Mirrored</strong>
            <div style="display: flex; gap: var(--spacing-12); align-items: center;">
              <span>Forward:</span>
              <svg class="icon icon--dir" aria-hidden="true"><use href="#ArrowRight"/></svg>
              <span>Diagonal:</span>
              <svg class="icon icon--dir" aria-hidden="true"><use href="#ArrowUpRight"/></svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Variant 3: Icon Box Container -->
      <div>
        <span style="font-size: var(--typography-font-size--1); color: var(--foreground-muted); display: block; margin-block-end: var(--spacing-8);">
          3. Bounding Touch Box Container (.icon-box vs .icon-box--sm)
        </span>
        <div style="display: flex; gap: var(--spacing-16); align-items: center;">
          <div class="icon-box" style="background: var(--surface-muted); border-radius: var(--radius-md);">
            <svg class="icon" aria-hidden="true"><use href="#Settings"/></svg>
          </div>
          <div class="icon-box icon-box--sm" style="background: var(--surface-muted); border-radius: var(--radius-md);">
            <svg class="icon" aria-hidden="true"><use href="#Settings"/></svg>
          </div>
        </div>
      </div>

    </div>
  `,
};

/**
 * 4. StateMatrix
 * Covers color inheritance across semantic states, inverted dark surface, and high contrast.
 */
export const StateMatrix: Story = {
  render: () => `
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(16rem, 100%), 1fr)); gap: var(--spacing-24); max-inline-size: 52rem;">
      
      <!-- Primary Accent -->
      <div style="padding: var(--spacing-16); border: 1px solid var(--border-color); border-radius: var(--radius-md); color: var(--foreground-accent); display: flex; align-items: center; gap: var(--spacing-12);">
        <svg class="icon" aria-hidden="true"><use href="#Info"/></svg>
        <span style="color: var(--foreground);">Accent Theme</span>
      </div>

      <!-- Success State -->
      <div style="padding: var(--spacing-16); border: 1px solid var(--border-color); border-radius: var(--radius-md); color: var(--foreground-success); display: flex; align-items: center; gap: var(--spacing-12);">
        <svg class="icon" aria-hidden="true"><use href="#Check"/></svg>
        <span style="color: var(--foreground);">Success State</span>
      </div>

      <!-- Warning State -->
      <div style="padding: var(--spacing-16); border: 1px solid var(--border-color); border-radius: var(--radius-md); color: var(--foreground-warning); display: flex; align-items: center; gap: var(--spacing-12);">
        <svg class="icon" aria-hidden="true"><use href="#Warning"/></svg>
        <span style="color: var(--foreground);">Warning Alert</span>
      </div>

      <!-- Inverted Dark Surface -->
      <div class="color-palette-inverted" style="padding: var(--spacing-16); border-radius: var(--radius-md); display: flex; align-items: center; gap: var(--spacing-12);">
        <svg class="icon" aria-hidden="true"><use href="#Lock"/></svg>
        <span>Inverted Surface</span>
      </div>

    </div>
  `,
};

/**
 * 5. SizesAndDensity
 * Demonstrates natural font-size step scaling from micro text to display headings.
 */
export const SizesAndDensity: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: var(--spacing-24); max-inline-size: 46rem;">
      
      <div style="font-size: var(--typography-font-size-3); display: flex; align-items: center; gap: var(--spacing-8);">
        <svg class="icon icon--dir" aria-hidden="true"><use href="#ArrowRight"/></svg>
        <span>Display Step 3</span>
      </div>

      <div style="font-size: var(--typography-font-size-2); display: flex; align-items: center; gap: var(--spacing-8);">
        <svg class="icon icon--dir" aria-hidden="true"><use href="#ArrowRight"/></svg>
        <span>Heading Step 2</span>
      </div>

      <div style="font-size: var(--typography-font-size-1); display: flex; align-items: center; gap: var(--spacing-8);">
        <svg class="icon icon--dir" aria-hidden="true"><use href="#ArrowRight"/></svg>
        <span>Subheading Step 1</span>
      </div>

      <div style="font-size: var(--typography-font-size-0); display: flex; align-items: center; gap: var(--spacing-8);">
        <svg class="icon icon--dir" aria-hidden="true"><use href="#ArrowRight"/></svg>
        <span>Body Base Step 0 (1rem)</span>
      </div>

      <div style="font-size: var(--typography-font-size--1); color: var(--foreground-muted); display: flex; align-items: center; gap: var(--spacing-8);">
        <svg class="icon icon--dir" aria-hidden="true"><use href="#ArrowRight"/></svg>
        <span>Caption Step -1</span>
      </div>

    </div>
  `,
};

/**
 * 6. ZeroClassOrchestration
 * Demonstrates automatic bidirectional RTL reflection without class toggles.
 */
export const ZeroClassOrchestration: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: var(--spacing-24); max-inline-size: 46rem;">
      <div class="demo-card-callout" style="padding: var(--spacing-16); border: 1px dashed var(--border-color); border-radius: var(--radius-md); background: var(--surface-muted);">
        <p style="margin: 0; font-size: var(--typography-font-size--1); color: var(--foreground-muted);">
          <strong>Automatic Bidirectional RTL Mirroring:</strong> By simply adding <code>.icon--dir</code> to an icon, it respects document flow (<code>[dir="rtl"]</code>) automatically via <code>scale: -1 1</code>, requiring zero manual CSS rules per language view.
        </p>
      </div>

      <div style="display: flex; gap: var(--spacing-16); flex-wrap: wrap;">
        <div dir="ltr" style="flex: 1; padding: var(--spacing-16); border: 1px solid var(--border-color); border-radius: var(--radius-md);">
          <strong style="display: block; margin-block-end: var(--spacing-8);">English LTR</strong>
          <a href="#" class="link">
            <span>Next Article</span>
            <svg class="icon icon--dir" aria-hidden="true"><use href="#ArrowRight"/></svg>
          </a>
        </div>

        <div dir="rtl" style="flex: 1; padding: var(--spacing-16); border: 1px solid var(--border-color); border-radius: var(--radius-md);">
          <strong style="display: block; margin-block-end: var(--spacing-8);">Arabic RTL (Mirrored)</strong>
          <a href="#" class="link">
            <span>المقالة التالية</span>
            <svg class="icon icon--dir" aria-hidden="true"><use href="#ArrowRight"/></svg>
          </a>
        </div>
      </div>
    </div>
  `,
};

/**
 * 7. RealWorldRecipes
 * Production patterns: Metric feature card and Action button toolbar.
 */
export const RealWorldRecipes: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: var(--spacing-32); max-inline-size: 52rem;">
      
      <!-- Recipe 1: Metric Highlight Feature Cards with Icon Box -->
      <section style="display: flex; flex-direction: column; gap: var(--spacing-16);">
        <h4 style="font-size: var(--typography-font-size-1); margin: 0;">
          Recipe 1: Dashboard Feature Cards with Icon Box Target
        </h4>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr)); gap: var(--spacing-16);">
          <div class="card card--bordered" style="padding: var(--spacing-16); display: flex; gap: var(--spacing-12); align-items: center;">
            <div class="icon-box" style="background: var(--surface-muted); color: var(--foreground-accent); border-radius: var(--radius-round);">
              <svg class="icon" aria-hidden="true"><use href="#Bell"/></svg>
            </div>
            <div>
              <span style="font-size: var(--typography-font-size--1); color: var(--foreground-muted); display: block;">Notifications</span>
              <strong style="font-size: var(--typography-font-size-1);">1,280</strong>
            </div>
          </div>

          <div class="card card--bordered" style="padding: var(--spacing-16); display: flex; gap: var(--spacing-12); align-items: center;">
            <div class="icon-box" style="background: var(--surface-muted); color: var(--foreground-success); border-radius: var(--radius-round);">
              <svg class="icon" aria-hidden="true"><use href="#Check"/></svg>
            </div>
            <div>
              <span style="font-size: var(--typography-font-size--1); color: var(--foreground-muted); display: block;">Verified Checks</span>
              <strong style="font-size: var(--typography-font-size-1);">99.4%</strong>
            </div>
          </div>
        </div>
      </section>

      <!-- Recipe 2: Button Actions with Trailing Directional Glyphs -->
      <section style="display: flex; flex-direction: column; gap: var(--spacing-16);">
        <h4 style="font-size: var(--typography-font-size-1); margin: 0;">
          Recipe 2: Action Buttons with Trailing Directional Icons
        </h4>
        <div style="display: flex; gap: var(--spacing-12); align-items: center; flex-wrap: wrap;">
          <button type="button" class="button button--primary">
            <span>Continue</span>
            <svg class="icon icon--dir" aria-hidden="true"><use href="#ArrowRight"/></svg>
          </button>

          <button type="button" class="button button--secondary">
            <span>Download Report</span>
            <svg class="icon" aria-hidden="true"><use href="#Download"/></svg>
          </button>

          <button type="button" class="button button--icon" aria-label="Settings configuration">
            <svg class="icon" aria-hidden="true"><use href="#Settings"/></svg>
          </button>
        </div>
      </section>

    </div>
  `,
};
