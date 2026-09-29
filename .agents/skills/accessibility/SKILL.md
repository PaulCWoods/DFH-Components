---
name: accessibility
description: |
  WCAG 2.2 Level AA/AAA compliance rules, accessible semantics, high-contrast focus rings, touch targets, and native HTML primitives for Design For Humans.

  Trigger immediately for:
  - Accessibility audits or questions on WCAG 2.2 Level AA / AAA standards.
  - Interactive element semantics: Buttons, links, dialogs, popovers, disclosures.
  - Focus indicator styling (:focus-visible, 3:1 contrast, offset).
  - Touch target sizing (minimum 24x24px, recommended 48x48px).
  - Screen reader & keyboard patterns (ARIA roles, states, keyboard navigation).
  - prefers-reduced-motion and prefers-contrast media queries.
---

# Design For Humans: Accessibility (a11y) Skill & Standards

## Philosophy
Accessibility is a core architectural pillar of **Design For Humans**, not an afterthought. Every component must achieve **WCAG 2.2 Level AA** compliance minimum, with Level AAA targets for contrast and touch targets where applicable.

---

## Non-Negotiable Standards

### 1. Focus Visible & Appearance (WCAG 2.4.7 & 2.4.13)
- Never use `outline: none` without providing an explicit, high-contrast `:focus-visible` ring.
- All interactive elements must use:
  ```css
  :focus-visible {
    outline: var(--focus-ring-outline);
    outline-offset: var(--focus-ring-outline-offset);
  }
  ```
- Contrast ratio of the focus indicator against adjacent background colors must be **at least 3:1**.

### 2. Target Size Compliance (WCAG 2.5.5 & 2.5.8)
- **Minimum Target Size (WCAG 2.5.8 Level AA):** Interactive targets must be at least `24x24px`.
- **Enhanced Target Size (WCAG 2.5.5 Level AAA):** Default interactive targets should meet `44x44px` or `48x48px` (using `--button-min-size: var(--spacing-target)` which resolves to `3rem` / `48px`).

### 3. Native Primitives Over Custom JS Hacks
- **Modal Dialogs:** Use the native HTML `<dialog>` element with `.showModal()`. Never build custom JavaScript `div` modal wrappers or manual focus traps. Native `<dialog>` handles focus trapping, Escape dismissal, and accessibility tree visibility automatically.
- **Popovers:** Use the native `popover` attribute (`popover="auto"` or `popover="manual"`) with CSS Anchor Positioning. Do not use legacy Popper.js or manual DOM measurement scripts.
- **Buttons:** Always use `<button type="button">` or `<button type="submit">`. Never use `<div onclick>` or `<a href="#">` for actions that do not navigate to a new URL.

### 4. Text Contrast (WCAG 1.4.3 & 1.4.6)
- Normal text: Minimum **4.5:1** contrast against background.
- Large text (>= 1.5rem / 24px or bold >= 1.25rem / 20px): Minimum **3:1** contrast.
- UI components & borders (WCAG 1.4.11): Minimum **3:1** contrast.
- High Contrast mode: Always support `@media (prefers-contrast: more)` by increasing border visibility and text contrast.

### 5. Motion Reduction (WCAG 2.3.3)
- Always provide `@media (prefers-reduced-motion: reduce)` overrides.
- Transition durations must fall back to `var(--duration-0)` (`0s`).
- Remove aggressive scale or translation animations on reduced motion.

### 6. Semantic Labeling, Translation, & ARIA Rules
- **Rule of ARIA:** If you can use a native HTML element or attribute with the semantics and behavior you require already built in, do so.
- **Icon-Only Controls:** Prefer real DOM text wrapped in `<span class="visually-hidden">Action description</span>` (or `.sr-only`) over `aria-label`. Unlike attribute values, DOM text nodes are reliably translated by in-browser translation engines (Google Translate, Safari Translate, DeepL) and reliably matched by voice control software.
- **SVGs inside buttons/links:** Must have `aria-hidden="true"` and `focusable="false"`.
- **Skip to Content Links (WCAG 2.4.1):** Use `<a href="#main" class="visually-hidden visually-hidden--focusable">Skip to main content</a>` so keyboard users can bypass repetitive navigation blocks.
- **Dialogs:** Must have `aria-labelledby` referencing their title heading and `aria-describedby` referencing their description.
- **Disabled buttons:** Support both native `:disabled` and `aria-disabled="true"`.
