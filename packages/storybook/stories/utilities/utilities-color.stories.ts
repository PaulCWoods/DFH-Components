import type { Meta, StoryObj } from '@storybook/html';

interface ColorArgs {
  bgSurface: 'card' | 'muted' | 'translucent' | 'inverted' | 'dark' | 'darker' | 'accent' | 'success' | 'warning' | 'danger';
  textColor: 'default' | 'strong' | 'muted' | 'inverted' | 'inverted-strong' | 'on-dark' | 'white' | 'accent' | 'success' | 'warning' | 'danger';
  translucency: 'none' | 'subtle' | 'quiet' | 'half' | 'strong' | 'stronger';
  blurred: boolean;
}

const meta: Meta<ColorArgs> = {
  title: 'Utilities/Color',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
### Developer & Designer Notes: Background & Text Color Utilities

The **Color** utilities provide low-specificity (\`:where()\`) classes for semantic surface backgrounds, glassmorphism translucencies, backdrop blurs, and adaptive text colors.

Designed in strict compliance with **WCAG 2.2 Level AA / AAA** standards:
- **1.4.3 Contrast (Minimum):** Semantic foreground and surface pairs guarantee at least 4.5:1 text contrast on both light and dark themes.
- **1.4.6 Contrast (Enhanced):** High-contrast tokens exceed 7:1 for critical notifications and alerts.
- **Unstyled Fallback Resilience:** When design token systems fail to load, utilities fall back directly to native CSS system colors (\`Canvas\`, \`CanvasText\`, \`Highlight\`, \`currentColor\`), ensuring the page remains fully functional and legible rather than breaking into unreadable states.

Defined in \`utilities/color.css\` and synchronized with \`_color.scss\` in the Design For Humans blog architecture.

---

#### 1. Core Architectural Principles
1. **Zero-Specificity Reset (\`:where()\`)**: Written with 0-0-0 specificity so components and layouts can override them effortlessly without \`!important\`.
2. **System Color Fallbacks:**
   - Backgrounds fall back to \`Canvas\` or \`Highlight\`.
   - Foregrounds fall back to \`CanvasText\`, \`LinkText\`, \`GrayText\`, or \`currentColor\`.
3. **Translucency Scales:** Standardized glassmorphism steps (\`10%\`, \`33%\`, \`50%\`, \`70%\`, \`90%\`) dynamically blended via \`color-mix(in srgb, ..., transparent var(--translucency-*))\`.
4. **Dual Expressive & Compact Aliases:** Supports both descriptive names (\`.bg-color-muted\`, \`.text-color-accent\`) and concise shorthands (\`.bg-muted\`, \`.text-color-accent\`).

---

#### 2. Canonical Semantic Markup Signatures

\`\`\`html
<!-- 1. Semantic Card Surface with Muted Secondary Text -->
<div class="bg-card bd-sm rounded-md padding">
  <h3 class="text-color font-size-lg">Surface Card</h3>
  <p class="text-color-muted font-size-sm">Secondary metadata on resting canvas</p>
</div>

<!-- 2. Glassmorphic Translucent Floating Container -->
<div class="bg-card bg-effect-translucent-half bg-blurred bd-sm rounded-lg padding shadow-md">
  <p class="text-color">Floating frosted glass overlay</p>
</div>

<!-- 3. Status Badges & Alerts with Contrast-Safe Colors -->
<div class="bg-success padding-sm rounded-sm">
  <span class="text-color-success font-weight-bold">Active Deployment</span>
</div>
\`\`\`

---

#### 3. Class Mapping Reference

| Category | Expressive Class | Compact Alias | Token Reference | Fallback |
| :--- | :--- | :--- | :--- | :--- |
| **Canvas** | \`.bg-color\` | \`.bg\` | \`var(--surface)\` | \`Canvas\` |
| **Card** | \`.bg-color-card\` | \`.bg-card\` | \`var(--surface-card)\` | \`Canvas\` |
| **Muted** | \`.bg-color-muted\` | \`.bg-muted\` | \`var(--surface-muted)\` | \`Canvas\` |
| **Translucent** | \`.bg-color-translucent\` | \`.bg-translucent\` | \`var(--surface-translucent)\` | \`Canvas\` |
| **Inverted** | \`.bg-color-inverted\` | \`.bg-inverted\` | \`var(--surface-inverted)\` | \`Canvas\` |
| **Dark / Darker** | \`.bg-color-dark\`, \`.darker\` | \`.bg-dark\`, \`.bg-darker\` | \`var(--surface-dark)\` | \`Canvas\` |
| **Accent** | \`.bg-color-accent\` | \`.bg-accent\` | \`var(--surface-accent)\` | \`Highlight\` |
| **Success** | \`.bg-color-success\` | \`.bg-success\` | \`var(--surface-success)\` | \`Highlight\` |
| **Warning** | \`.bg-color-warning\` | \`.bg-warning\` | \`var(--surface-warning)\` | \`Highlight\` |
| **Danger** | \`.bg-color-danger\` | \`.bg-danger\` | \`var(--surface-danger)\` | \`Highlight\` |
| **Text Default** | \`.text-color\` | \`.text-color\` | \`var(--foreground)\` | \`CanvasText\` |
| **Text Strong** | \`.text-color-strong\` | \`.text-strong\` | \`var(--foreground-strong)\` | \`CanvasText\` |
| **Text Muted** | \`.text-color-muted\` | \`.text-muted\` | \`var(--foreground-muted)\` | \`GrayText\` |
| **Text Inverted** | \`.text-color-inverted\` | \`.text-inverted\` | \`var(--foreground-inverted)\` | \`CanvasText\` |
| **Text Inverted Strong** | \`.text-color-inverted-strong\` | \`.text-inverted-strong\` | \`var(--foreground-inverted-strong)\` | \`CanvasText\` |
| **Text On Dark** | \`.text-color-on-dark\` | \`.text-on-dark\` | \`var(--foreground-on-dark)\` | \`white\` |
| **Text White** | \`.text-color-white\` | \`.text-white\` | \`var(--foreground-white)\` | \`white\` |
| **Text Accent** | \`.text-color-accent\` | \`.text-accent\` | \`var(--foreground-accent)\` | \`LinkText\` |
| **Text Danger** | \`.text-color-danger\` | \`.text-danger\` | \`var(--foreground-danger)\` | \`Red\` |
| **Text Success** | \`.text-color-success\` | \`.text-success\` | \`var(--foreground-success)\` | \`Green\` |
| **Text Warning** | \`.text-color-warning\` | \`.text-warning\` | \`var(--foreground-warning)\` | \`Yellow\` |
`,
      },
    },
  },
  argTypes: {
    bgSurface: {
      control: 'select',
      options: ['card', 'muted', 'translucent', 'inverted', 'dark', 'darker', 'accent', 'success', 'warning', 'danger'],
      description: 'Background surface helper',
    },
    textColor: {
      control: 'select',
      options: ['default', 'strong', 'muted', 'inverted', 'inverted-strong', 'on-dark', 'white', 'accent', 'success', 'warning', 'danger'],
      description: 'Text color helper',
    },
    translucency: {
      control: 'select',
      options: ['none', 'subtle', 'quiet', 'half', 'strong', 'stronger'],
      description: 'Background translucency percentage effect',
    },
    blurred: {
      control: 'boolean',
      description: 'Apply backdrop-filter: var(--surface-layer-filter)',
    },
  },
  args: {
    bgSurface: 'card',
    textColor: 'default',
    translucency: 'none',
    blurred: false,
  },
};

export default meta;
type Story = StoryObj<ColorArgs>;

/**
 * 1. Background Surfaces
 * Displays the core semantic resting, elevated, brand, and status background colors.
 */
export const BackgroundSurfaces: Story = {
  render: () => `
    <div class="grid" style="--grid-min-col: 14rem; gap: var(--spacing-16);">
      <div class="bg-card bd-sm rounded-md padding">
        <strong class="text-color">.bg-card</strong>
        <p class="text-color-muted font-size-xs">Primary container resting fill</p>
      </div>

      <div class="bg-muted bd-sm rounded-md padding">
        <strong class="text-color">.bg-muted</strong>
        <p class="text-color-muted font-size-xs">Subtle recessed surface fill</p>
      </div>

      <div class="bg-translucent bd-sm rounded-md padding">
        <strong class="text-color">.bg-translucent</strong>
        <p class="text-color-muted font-size-xs">Gentle interactive hover tint</p>
      </div>

      <div class="bg-inverted bd-sm rounded-md padding">
        <strong class="text-color-inverted">.bg-inverted</strong>
        <p class="text-color-inverted font-size-xs">High-contrast inverse fill</p>
      </div>

      <div class="bg-dark bd-sm rounded-md padding">
        <strong class="text-color-on-dark">.bg-dark</strong>
        <p class="text-color-on-dark font-size-xs">Deep dark container fill</p>
      </div>

      <div class="bg-darker bd-sm rounded-md padding">
        <strong class="text-color-on-dark">.bg-darker</strong>
        <p class="text-color-on-dark font-size-xs">Darkest background fill</p>
      </div>

      <div class="bg-accent bd-sm rounded-md padding">
        <strong class="text-color">.bg-accent</strong>
        <p class="font-size-xs" style="color: var(--color-white); opacity: 0.9;">Solid brand accent fill</p>
      </div>

      <div class="bg-success bd-sm rounded-md padding">
        <strong class="text-color">.bg-success</strong>
        <p class="text-color-muted font-size-xs">Confirmed status banner fill</p>
      </div>

      <div class="bg-warning bd-sm rounded-md padding">
        <strong class="text-color">.bg-warning</strong>
        <p class="text-color-muted font-size-xs">Cautionary review banner fill</p>
      </div>

      <div class="bg-danger bd-sm rounded-md padding">
        <strong class="text-color">.bg-danger</strong>
        <p class="text-color-muted font-size-xs">Destructive error banner fill</p>
      </div>
    </div>
  `,
};

/**
 * 2. Translucent Glassmorphism & Backdrop Blur
 * Demonstrates translucent overlays positioned above rich photographic canvases.
 */
export const TranslucentGlassmorphism: Story = {
  render: () => `
    <div style="position: relative; padding: var(--spacing-32); border-radius: var(--radius-lg); background: #1a1a2e url('https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1600&q=80') center/cover no-repeat; overflow: hidden;">
      <div class="grid" style="--grid-min-col: 13rem; gap: var(--spacing-16); position: relative; z-index: 1;">
        <div class="bg-card bg-effect-translucent-subtle bg-blurred-sm bd-sm rounded-md padding shadow-sm">
          <strong class="text-color">Subtle (10%)</strong>
          <p class="text-color-muted font-size-xs"><code>.bg-effect-translucent-subtle</code></p>
          <p class="text-color-muted font-size-xs"><code>.bg-blurred-sm</code></p>
          <p class="text-color font-size-xs">High opacity frosted glass</p>
        </div>

        <div class="bg-card bg-effect-translucent-quiet bg-blurred-md bd-sm rounded-md padding shadow-sm">
          <strong class="text-color">Quiet (33%)</strong>
          <p class="text-color-muted font-size-xs"><code>.bg-effect-translucent-quiet</code></p>
          <p class="text-color-muted font-size-xs"><code>.bg-blurred-md</code></p>
          <p class="text-color font-size-xs">Balanced translucent panel</p>
        </div>

        <div class="bg-card bg-effect-translucent-half bg-blurred-lg bd-sm rounded-md padding shadow-md">
          <strong class="text-color">Half (50%)</strong>
          <p class="text-color-muted font-size-xs"><code>.bg-effect-translucent-half</code></p>
          <p class="text-color-muted font-size-xs"><code>.bg-blurred-lg</code></p>
          <p class="text-color font-size-xs">50/50 translucency blend</p>
        </div>

        <div class="bg-card bg-effect-translucent-strong bg-blurred-xl bd-sm rounded-md padding shadow-md">
          <strong class="text-color">Strong (70%)</strong>
          <p class="text-color-muted font-size-xs"><code>.bg-effect-translucent-strong</code></p>
          <p class="text-color-muted font-size-xs"><code>.bg-blurred-xl</code></p>
          <p class="text-color font-size-xs">Deep background reveal</p>
        </div>

        <div class="bg-card bg-effect-translucent-stronger bg-blurred-xl bd-sm rounded-md padding shadow-lg">
          <strong class="text-color">Stronger (90%)</strong>
          <p class="text-color-muted font-size-xs"><code>.bg-effect-translucent-stronger</code></p>
          <p class="text-color-muted font-size-xs"><code>.bg-blurred-xl</code></p>
          <p class="text-color font-size-xs">Ghost overlay with blur</p>
        </div>
      </div>
    </div>
  `,
};

/**
 * 3. Text & Foreground Colors
 * Demonstrates accessible typography color variants across surfaces.
 */
export const TextColors: Story = {
  render: () => `
    <div class="stack" style="gap: var(--spacing-16);">
      <div class="grid" style="--grid-min-col: 16rem; gap: var(--spacing-16);">
        <article class="card bd-sm padding">
          <h4 class="text-color font-size-lg">Primary (<code>.text-color</code>)</h4>
          <p class="text-color font-size-sm">Primary text body with standard luminance contrast against the canvas.</p>
        </article>

        <article class="card bd-sm padding">
          <h4 class="text-color-strong font-size-lg">High Emphasis (<code>.text-color-strong</code>)</h4>
          <p class="text-color-strong font-size-sm">Highest emphasis foreground text for headings and key metrics.</p>
        </article>

        <article class="card bd-sm padding">
          <h4 class="text-color-muted font-size-lg">Muted (<code>.text-color-muted</code>)</h4>
          <p class="text-color-muted font-size-sm">Secondary metadata, timestamps, captions, and quiet labels.</p>
        </article>

        <article class="card bd-sm padding">
          <h4 class="text-color-accent font-size-lg">Brand Accent (<code>.text-color-accent</code>)</h4>
          <p class="text-color-accent font-size-sm">Brand teal text, high-interest feature labels, and primary link highlights.</p>
        </article>
      </div>

      <div class="grid" style="--grid-min-col: 16rem; gap: var(--spacing-16);">
        <article class="card bd-sm padding">
          <h4 class="text-color-success font-size-lg">Success (<code>.text-color-success</code>)</h4>
          <p class="text-color-success font-size-sm">Confirmed status metrics, approved reviews, and verified badges.</p>
        </article>

        <article class="card bd-sm padding">
          <h4 class="text-color-warning font-size-lg">Warning (<code>.text-color-warning</code>)</h4>
          <p class="text-color-warning font-size-sm">Pending reviews, expiring sessions, and cautionary messages.</p>
        </article>

        <article class="card bd-sm padding">
          <h4 class="text-color-danger font-size-lg">Danger (<code>.text-color-danger</code>)</h4>
          <p class="text-color-danger font-size-sm">Critical errors, failed audits, and destructive confirmations.</p>
        </article>
      </div>

      <!-- Inverted & On-Dark Surfaces -->
      <div class="grid" style="--grid-min-col: 16rem; gap: var(--spacing-16);">
        <article class="bg-inverted bd-sm rounded-md padding">
          <h4 class="text-color-inverted font-size-lg">Inverted (<code>.text-color-inverted</code>)</h4>
          <p class="text-color-inverted font-size-sm">Adaptive foreground for inverted and high-contrast surfaces.</p>
        </article>

        <article class="bg-inverted bd-sm rounded-md padding">
          <h4 class="text-color-inverted-strong font-size-lg">Inverted Strong (<code>.text-color-inverted-strong</code>)</h4>
          <p class="text-color-inverted-strong font-size-sm">Maximum contrast inverted text for calls-to-action on dark tiles.</p>
        </article>

        <article class="bg-dark bd-sm rounded-md padding">
          <h4 class="text-color-on-dark font-size-lg">On Dark (<code>.text-color-on-dark</code>)</h4>
          <p class="text-color-on-dark font-size-sm">Calibrated white text specifically designed for dark containers.</p>
        </article>

        <article class="bg-darker bd-sm rounded-md padding">
          <h4 class="text-color-white font-size-lg">White (<code>.text-color-white</code>)</h4>
          <p class="text-color-white font-size-sm">Pure white text token utility for deep dark panels and video overlays.</p>
        </article>
      </div>
    </div>
  `,
};

/**
 * 4. Interactive Color Playground
 */
export const Playground: Story = {
  render: (args) => {
    let bgClasses = `bg-${args.bgSurface}`;
    if (args.translucency !== 'none') {
      bgClasses += ` bg-effect-translucent-${args.translucency}`;
    }
    if (args.blurred) {
      bgClasses += ' bg-blurred';
    }

    let textClass = 'text';
    if (args.color - textColor !== 'default') {
      textClass = `text-${args.color - textColor}`;
    }

    return `
      <div style="padding: var(--spacing-32); background: linear-gradient(135deg, var(--color-purple-600), var(--color-aqua-600)); border-radius: var(--radius-lg);">
        <div class="${bgClasses} bd-sm rounded-md padding shadow-md" style="max-inline-size: 26rem; margin-inline: auto;">
          <h3 class="${textClass} font-size-xl">Interactive Color Sandbox</h3>
          <p class="${textClass} font-size-sm" style="margin-block-start: var(--spacing-8);">
            Demonstrates <code>.${bgClasses.replace(/ /g, ' .')}</code> combined with <code>.${textClass}</code>.
          </p>
          <div class="cluster" style="margin-block-start: var(--spacing-16);">
            <span class="badge bd-sm">Canvas fallback</span>
            <span class="badge bd-sm">WCAG 2.2 AAA</span>
          </div>
        </div>
      </div>
    `;
  },
};
