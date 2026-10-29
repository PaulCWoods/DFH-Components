# 31. Responsive Visibility & Adaptive Disclosure Helpers
Design For Humans provides low-specificity (`:where()`) responsive visibility and adaptive disclosure classes using concise Tailwind-style prefixes for both viewport media queries and container queries.

## A. Viewport Media Query Helpers
Used at the page shell / macro layout level (headers, main nav, mobile drawer triggers):
- **Hide on Mobile / Below Breakpoint:** `max-sm:hide` (or `max-md:hide`, `max-lg:hide`, etc.)
- **Hide on Desktop / Above Breakpoint:** `sm:hide` (or `md:hide`, `lg:hide`, etc.)
- **Hide Labels on Mobile:** `max-sm:hide-labels` (or `max-md:hide-labels`)
- **Hide Decorations on Mobile:** `max-sm:hide-decor` (or `max-md:hide-decor`)
- **Auto Flex Basis on Mobile:** `max-sm:flex-auto` (or `max-md:flex-auto`)
- **Accessible Screen Reader Only on Mobile:** `max-sm:sr-only` or `max-sm:visually-hidden`

## B. Container Query Helpers (Container First!)
Preferred for modular components, sidebars, cards, tables, and dialogs:
- **Hide in Narrow Containers:** `@max-sm:hide` (or `@max-md:hide`, `@max-lg:hide`, etc.)
- **Hide in Wide Containers:** `@sm:hide` (or `@md:hide`, `@lg:hide`, etc.)
- **Hide Labels in Narrow Containers:** `@max-sm:hide-labels` (or `@max-md:hide-labels`)
- **Hide Decorations in Narrow Containers:** `@max-sm:hide-decor` (or `@max-md:hide-decor`)
- **Auto Flex Basis in Narrow Containers:** `@max-sm:flex-auto` (or `@max-md:flex-auto`)
- **Accessible Screen Reader Only in Narrow Containers:** `@max-sm:sr-only` or `@max-sm:visually-hidden`

## C. Breakpoint Scale Reference
- `2xs`: `20em` (320px, Mobile Min)
- `xs`: `30em` (480px, Phablet)
- `sm`: `40em` (640px, Small Tablet)
- `md`: `48em` (768px, Tablet / Shell)
- `lg`: `60em` (960px, Small Desktop)
- `xl`: `80em` (1280px, Standard Desktop)
- `2xl`: `96em` (1536px, Large Screen)

## D. Legacy Synonyms (Pending Removal)
The stylesheet still contains synonyms for these helpers. They are removed before v1 (PRINCIPLES §7). Always write the **first** name in each row:
- `sm:hide` ⇄ `sm:hidden`, `min-sm:hide`, `min-sm:hidden`, `hide--above-sm`
- `max-sm:hide` ⇄ `max-sm:hidden`, `sm-max:hide`, `sm-max:hidden`, `hide--below-sm`
- `@sm:hide` ⇄ `@sm:hidden`, `@min-sm:hide`, `@min-sm:hidden`, `hide--in-container-above-sm`
- `@max-sm:hide` ⇄ `@max-sm:hidden`, `@sm-max:hide`, `@sm-max:hidden`, `hide--in-container-below-sm`

---

