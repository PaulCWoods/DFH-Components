# 31. Responsive Helpers
Hide something, its labels, or everything but its accessible name, by a condition (`utilities/responsive-helpers.css`, `utilities/accessibility.css`). One name per condition, in Tailwind's form. The other utilities are in §36.

## A. Actions
| Class | Effect |
| :--- | :--- |
| `.sr-only` (`.visually-hidden`) | Hidden on screen; still read by screen readers, voice control and translation |
| `.hide-labels` | Sets `--ui-labels: hidden`. Buttons and tabs inside show only their icon and keep the text as their accessible name; any `.ui-label` inside is visually hidden |
| `{condition}:hide` | `display: none` while the condition holds |
| `{condition}:hide-labels` | `.hide-labels` while the condition holds |
| `{condition}:sr-only` (`{condition}:visually-hidden`) | `.sr-only` while the condition holds |

Always hidden is the `hidden` attribute (or `.hidden`). The reset keeps `[hidden]` hidden whatever `display` a component sets, except `hidden="until-found"`, which find-in-page can reveal.

## B. Conditions
| Prefix | While |
| :--- | :--- |
| `sm:`, `md:`, `lg:`, `xl:`, `2xl:` | The viewport is at least 40, 48, 64, 80 or 96rem wide |
| `max-sm:` … `max-2xl:` | The viewport is narrower than that |
| `@xs:` … `@7xl:` | The nearest size container is at least the size |
| `@max-xs:` … `@max-7xl:` | The nearest size container is narrower than the size |
| `short:` / `tall:` | The viewport is under / at least 36rem tall |
| `app-locked:` / `app-unlocked:` | `.app--viewport` is locked to the viewport (at least 48rem wide and 36rem tall) / scrolls as a page |

Container sizes (Tailwind's container scale): `xs` 20rem, `sm` 24, `md` 28, `lg` 32, `xl` 36, `2xl` 42, `3xl` 48, `4xl` 56, `5xl` 64, `6xl` 72, `7xl` 80. The grid's container column counts, `.inline-responsive--{size}` and card's `@max-*:card--plain` use the same scale.

## C. Markup
```html
<!-- Icons only below 48rem; the text stays the buttons' accessible names -->
<div class="button-group max-md:hide-labels" role="group" aria-label="Bed actions">
  <button type="button" class="button"><svg class="button__icon icon" aria-hidden="true">…</svg><span>Add plant</span></button>
  <button type="button" class="button"><svg class="button__icon icon" aria-hidden="true">…</svg><span>Share</span></button>
</div>

<!-- A menu button in a narrow header, the navigation in a wide one -->
<header class="header">
  <div class="header__bar">
    <nav class="header__nav @max-3xl:hide" aria-label="Main">…</nav>
    <button type="button" class="button @3xl:hide" popovertarget="site-menu">Menu</button>
  </div>
</header>

<!-- Words read by screen readers but not shown below 48rem -->
<p>Harvest <span class="max-md:sr-only">(rhubarb, chard and kale)</span> due this week</p>
```

## D. Rules
- **Show by hiding:** there is no `show`. To show something only below 48rem, hide it from 48rem: `md:hide`.
- **Prefer a container condition** inside a component, so it adapts wherever it is placed. A container condition needs an ancestor with `container-type: inline-size` (`.container-inline`, `.split`, `.sidebar`, `.header`, `.footer`); without one it never matches.
- **Never hide the only way to do something.** Hide a duplicate (the navigation when a menu button offers the same links), or a label whose icon and accessible name remain.
- **Viewport sizes:** `sm` 40rem, `md` 48rem, `lg` 64rem, `xl` 80rem, `2xl` 96rem (Tailwind's). Media queries use the `width >=` / `width <` range syntax, so the two sides of a breakpoint never overlap.
- **Removed in the utilities pass:** `show` and its conditions; `hide-decor`, `show-decor`, `show-labels`, `flex-auto` and the `.ui-decor` hook; the synonyms (`md:hidden`, `min-md:hide`, `hide--above-md`, `md-max:hide`, `@min-md:hide`, `hide--in-container-below-md` …); the `2xs` and `xs` viewport sizes; the old container sizes (`@sm:` was 40em, `@md:` 48em, `@lg:` 60em); `.sr`; the height scale beyond `short`/`tall`. `lg:` moved from 60em to 64rem.
