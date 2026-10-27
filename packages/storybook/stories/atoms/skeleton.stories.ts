import type { Meta, StoryObj } from '@storybook/html';

interface SkeletonArgs {
  variant?: 'text' | 'heading' | 'avatar' | 'button' | 'badge' | 'media';
  animation?: 'shimmer' | 'pulse' | 'static';
  width?: string;
}

const meta: Meta<SkeletonArgs> = {
  title: 'Atoms/Skeleton',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
### Developer & Designer Notes: Skeleton Primitive

The **Skeleton** primitive is an accessible placeholder foundation engineered to eliminate **Cumulative Layout Shift (CLS)** and provide immediate visual feedback while asynchronous data loads.

It operates seamlessly in two modes:
1. **Standalone Primitive:** Direct geometric placeholders (\`.skeleton--text\`, \`.skeleton--heading\`, \`.skeleton--avatar\`, \`.skeleton--button\`, \`.skeleton--media\`).
2. **Companion Modifier:** Directly applied to existing library primitives (\`<div class="avatar skeleton">\`, \`<button class="button skeleton">\`, \`<span class="badge skeleton">\`, \`<div class="card skeleton">\`).

---

#### 1. Canonical Semantic Markup Signatures
AI agents and developers MUST strictly use the following semantic patterns:

\`\`\`html
<!-- 1. Text & Heading Placeholders (with aria-hidden="true") -->
<span class="skeleton skeleton--heading" aria-hidden="true"></span>
<span class="skeleton skeleton--text" aria-hidden="true"></span>
<span class="skeleton skeleton--text skeleton--w-75" aria-hidden="true"></span>

<!-- 2. Shape Placeholders -->
<div class="skeleton skeleton--avatar" aria-hidden="true"></div>
<div class="skeleton skeleton--button" aria-hidden="true"></div>
<div class="skeleton skeleton--media" aria-hidden="true"></div>

<!-- 3. Companion Modifier on Existing Primitives -->
<div class="avatar skeleton" aria-hidden="true"></div>
<button type="button" class="button skeleton" aria-hidden="true" disabled>
  <span>Submit</span>
</button>

<!-- 4. Async Loading Container with aria-busy="true" -->
<section aria-busy="true" aria-label="Loading profile content">
  <div class="card">
    <article class="card__content">
      <div class="inline gap-md">
        <div class="skeleton skeleton--avatar" aria-hidden="true"></div>
        <div class="stack gap-xs flex-grow">
          <span class="skeleton skeleton--heading skeleton--w-50" aria-hidden="true"></span>
          <span class="skeleton skeleton--text skeleton--w-25" aria-hidden="true"></span>
        </div>
      </div>
    </article>
  </div>
</section>
\`\`\`

---

#### 2. WCAG 2.2 Conformance Matrix

| Criterion | Level | Implementation Strategy |
| :--- | :---: | :--- |
| **2.3.3 Reduced Motion** | **AAA** | Automatically disables shimmer and pulse animations under \`@media (prefers-reduced-motion: reduce)\`, switching to an accessible static tint. |
| **1.4.3 Contrast Minimum** | **AA** | Base fill uses \`--surface-muted\` with adaptive light-dark() and inverted palette support, ensuring visible contrast against page and card surfaces. |
| **1.4.11 Non-Text Contrast** | **AA** | In Forced Colors / High Contrast mode, renders an explicit 1px \`ButtonBorder\` outline so shapes are distinct. |
| **Screen Reader Semantics** | **A** | Decorative placeholders must have \`aria-hidden="true"\`; loading parent regions use \`aria-busy="true"\` to alert assistive tech. |

---

#### 3. CSS Custom Property Contract Table

| Property | Default Value | Description |
| :--- | :--- | :--- |
| \`--skeleton-bg\` | \`var(--surface-muted)\` | Base placeholder background fill |
| \`--skeleton-shimmer\` | \`light-dark(...)\` | Moving highlight wave sweep tone |
| \`--skeleton-radius\` | \`var(--radius-sm, 0.25rem)\` | Default corner radius for text and block placeholders |
| \`--skeleton-radius-full\` | \`var(--radius-full, 9999px)\` | Circular corner radius for avatars and chips |
| \`--skeleton-duration\` | \`1.6s\` | Shimmer and pulse animation cycle duration |
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['text', 'heading', 'avatar', 'button', 'badge', 'media'],
      description: 'Geometric preset shape',
    },
    animation: {
      control: 'select',
      options: ['shimmer', 'pulse', 'static'],
      description: 'Animation mode (shimmer wave, opacity pulse, or static)',
    },
    width: {
      control: 'text',
      description: 'Inline width override (e.g. 50%, 80%, 12rem)',
    },
  },
};

export default meta;
type Story = StoryObj<SkeletonArgs>;

function getSkeletonClasses(args: SkeletonArgs): string {
  const classes = ['skeleton'];
  if (args.variant && args.variant !== 'text') {
    classes.push(`skeleton--${args.variant}`);
  } else if (args.variant === 'text') {
    classes.push('skeleton--text');
  }
  if (args.animation === 'pulse') classes.push('skeleton--pulse');
  if (args.animation === 'static') classes.push('skeleton--static');
  return classes.join(' ');
}

export const Default: Story = {
  args: {
    variant: 'text',
    animation: 'shimmer',
    width: '100%',
  },
  render: (args) => `
    <div style="max-inline-size: 32rem; padding: var(--spacing-24, 1.5rem); background-color: var(--surface); border-radius: var(--radius-md, 0.5rem);">
      <div class="stack gap-sm" aria-busy="true" aria-label="Loading content">
        <span class="skeleton skeleton--heading skeleton--w-75" aria-hidden="true"></span>
        <span class="${getSkeletonClasses(args)}" style="${args.width ? `max-inline-size: ${args.width};` : ''}" aria-hidden="true"></span>
        <span class="skeleton skeleton--text skeleton--w-90" aria-hidden="true"></span>
        <span class="skeleton skeleton--text skeleton--w-50" aria-hidden="true"></span>
      </div>
    </div>
  `,
};

export const ShapeVariants: Story = {
  render: () => `
    <div class="stack gap-xl" style="max-inline-size: 36rem; padding: var(--spacing-24, 1.5rem); background-color: var(--surface); border-radius: var(--radius-md, 0.5rem);">
      
      <!-- 1. Text & Headings -->
      <div class="stack gap-xs">
        <h3 class="font-bold font-size-0 text-muted">1. Text & Headings</h3>
        <span class="skeleton skeleton--heading skeleton--w-50" aria-hidden="true"></span>
        <span class="skeleton skeleton--text" aria-hidden="true"></span>
        <span class="skeleton skeleton--text skeleton--w-75" aria-hidden="true"></span>
      </div>

      <!-- 2. Circular Avatars -->
      <div class="stack gap-xs">
        <h3 class="font-bold font-size-0 text-muted">2. Circular Avatars</h3>
        <div class="inline gap-md align-items-center">
          <div class="skeleton skeleton--avatar" style="--avatar-size: 2rem;" aria-hidden="true"></div>
          <div class="skeleton skeleton--avatar" aria-hidden="true"></div>
          <div class="skeleton skeleton--avatar" style="--avatar-size: 3.5rem;" aria-hidden="true"></div>
        </div>
      </div>

      <!-- 3. Interactive Controls (Buttons, Inputs, Badges) -->
      <div class="stack gap-xs">
        <h3 class="font-bold font-size-0 text-muted">3. Controls (Buttons, Inputs, Badges)</h3>
        <div class="cluster gap-sm align-items-center">
          <div class="skeleton skeleton--badge" aria-hidden="true"></div>
          <div class="skeleton skeleton--badge" style="inline-size: 6rem;" aria-hidden="true"></div>
          <div class="skeleton skeleton--button" aria-hidden="true"></div>
        </div>
        <div class="skeleton skeleton--input" style="max-inline-size: 20rem;" aria-hidden="true"></div>
      </div>

      <!-- 4. Media & Aspect-Ratio Cards -->
      <div class="stack gap-xs">
        <h3 class="font-bold font-size-0 text-muted">4. Media Banner (16:9 Aspect Ratio)</h3>
        <div class="skeleton skeleton--media" aria-hidden="true"></div>
      </div>

    </div>
  `,
};

export const CardCompositeSkeleton: Story = {
  render: () => `
    <div style="max-inline-size: 24rem; padding: var(--spacing-16, 1rem);">
      <!-- Zero-CLS Card Loading State -->
      <article class="card card--bordered bg-card" aria-busy="true" aria-label="Loading article card">
        <div class="card__content">
          
          <!-- Card Media Placeholder -->
          <div class="skeleton skeleton--media" style="border-radius: var(--radius-sm, 0.25rem);" aria-hidden="true"></div>

          <!-- Card Header Placeholder -->
          <header class="card__header inline gap-sm align-items-center">
            <div class="skeleton skeleton--avatar" aria-hidden="true"></div>
            <div class="stack gap-xs flex-grow">
              <span class="skeleton skeleton--heading skeleton--w-75" style="margin: 0;" aria-hidden="true"></span>
              <span class="skeleton skeleton--text skeleton--w-40" style="margin: 0;" aria-hidden="true"></span>
            </div>
          </header>

          <!-- Card Body Placeholder -->
          <div class="card__body stack gap-xs">
            <span class="skeleton skeleton--text" aria-hidden="true"></span>
            <span class="skeleton skeleton--text skeleton--w-90" aria-hidden="true"></span>
            <span class="skeleton skeleton--text skeleton--w-60" aria-hidden="true"></span>
          </div>

          <!-- Card Footer Placeholder -->
          <footer class="card__footer split align-items-center">
            <div class="skeleton skeleton--badge" aria-hidden="true"></div>
            <div class="skeleton skeleton--button" style="inline-size: 6rem; min-block-size: 2.25rem;" aria-hidden="true"></div>
          </footer>

        </div>
      </article>
    </div>
  `,
};

export const CompanionModifier: Story = {
  render: () => `
    <div class="stack gap-xl" style="max-inline-size: 32rem; padding: var(--spacing-24, 1.5rem); background-color: var(--surface); border-radius: var(--radius-md, 0.5rem);">
      
      <p class="font-size--1 text-muted">
        Demonstrates adding the <code>.skeleton</code> class directly onto existing primitives. Children elements and text are automatically masked, retaining exact primitive geometry.
      </p>

      <!-- 1. Avatar Primitive + .skeleton -->
      <div class="inline gap-md align-items-center">
        <div class="avatar skeleton" aria-hidden="true">
          <span>JD</span>
        </div>
        <div class="stack gap-xs">
          <span class="font-bold font-size-0">Avatar Primitive</span>
          <span class="text-muted font-size--1"><code>&lt;div class="avatar skeleton"&gt;</code></span>
        </div>
      </div>

      <!-- 2. Button Primitive + .skeleton -->
      <div class="inline gap-md align-items-center">
        <button type="button" class="button button--strong button--accent skeleton" aria-hidden="true" disabled>
          <span>Primary Action</span>
        </button>
        <div class="stack gap-xs">
          <span class="font-bold font-size-0">Button Primitive</span>
          <span class="text-muted font-size--1"><code>&lt;button class="button skeleton" disabled&gt;</code></span>
        </div>
      </div>

      <!-- 3. Badge Primitive + .skeleton -->
      <div class="inline gap-md align-items-center">
        <span class="badge skeleton" aria-hidden="true">
          <span>Status</span>
        </span>
        <div class="stack gap-xs">
          <span class="font-bold font-size-0">Badge Primitive</span>
          <span class="text-muted font-size--1"><code>&lt;span class="badge skeleton"&gt;</code></span>
        </div>
      </div>

      <!-- 4. Input Primitive + .skeleton -->
      <div class="inline gap-md align-items-center">
        <input type="text" class="input skeleton" value="Placeholder value" aria-hidden="true" disabled style="max-inline-size: 14rem;" />
        <div class="stack gap-xs">
          <span class="font-bold font-size-0">Input Primitive</span>
          <span class="text-muted font-size--1"><code>&lt;input class="input skeleton" disabled&gt;</code></span>
        </div>
      </div>

    </div>
  `,
};

export const AnimationModes: Story = {
  render: () => `
    <div class="grid grid--3-col gap-lg" style="padding: var(--spacing-24, 1.5rem); background-color: var(--surface); border-radius: var(--radius-md, 0.5rem);">
      
      <!-- 1. Shimmer (Default) -->
      <div class="card card--bordered padding-md stack gap-sm">
        <h4 class="font-bold font-size-0">Shimmer (Default)</h4>
        <p class="font-size--1 text-muted">Moving highlight gradient sweep</p>
        <div class="skeleton skeleton--media" aria-hidden="true"></div>
        <span class="skeleton skeleton--heading skeleton--w-75" aria-hidden="true"></span>
        <span class="skeleton skeleton--text" aria-hidden="true"></span>
        <span class="skeleton skeleton--text skeleton--w-50" aria-hidden="true"></span>
      </div>

      <!-- 2. Pulse Mode (.skeleton--pulse) -->
      <div class="card card--bordered padding-md stack gap-sm">
        <h4 class="font-bold font-size-0">Pulse (.skeleton--pulse)</h4>
        <p class="font-size--1 text-muted">Subtle opacity breathe cycle</p>
        <div class="skeleton skeleton--media skeleton--pulse" aria-hidden="true"></div>
        <span class="skeleton skeleton--heading skeleton--pulse skeleton--w-75" aria-hidden="true"></span>
        <span class="skeleton skeleton--text skeleton--pulse" aria-hidden="true"></span>
        <span class="skeleton skeleton--text skeleton--pulse skeleton--w-50" aria-hidden="true"></span>
      </div>

      <!-- 3. Static Mode (.skeleton--static) -->
      <div class="card card--bordered padding-md stack gap-sm">
        <h4 class="font-bold font-size-0">Static (.skeleton--static)</h4>
        <p class="font-size--1 text-muted">Zero animation fill (print / battery)</p>
        <div class="skeleton skeleton--media skeleton--static" aria-hidden="true"></div>
        <span class="skeleton skeleton--heading skeleton--static skeleton--w-75" aria-hidden="true"></span>
        <span class="skeleton skeleton--text skeleton--static" aria-hidden="true"></span>
        <span class="skeleton skeleton--text skeleton--static skeleton--w-50" aria-hidden="true"></span>
      </div>

    </div>
  `,
};

export const ContainerStyleQuery: Story = {
  render: () => `
    <div class="stack gap-lg" style="max-inline-size: 32rem; padding: var(--spacing-24, 1.5rem); background-color: var(--surface); border-radius: var(--radius-md, 0.5rem);">
      <p class="font-size--1 text-muted">
        Parent containers set <code>--skeleton-animation: pulse;</code> to declaratively configure all descendant skeletons without adding classes to each child.
      </p>

      <div style="--skeleton-animation: pulse;" class="card card--bordered padding-md stack gap-sm">
        <span class="badge badge--accent badge--sm">Container Style Query Active</span>
        <span class="skeleton skeleton--heading skeleton--w-75" aria-hidden="true"></span>
        <span class="skeleton skeleton--text" aria-hidden="true"></span>
        <span class="skeleton skeleton--text skeleton--w-50" aria-hidden="true"></span>
      </div>
    </div>
  `,
};
