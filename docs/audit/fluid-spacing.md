# Fluid spacing

The spacing that grows with the viewport (or container): `--spacing-breathe` and `--spacing-cushion` and their container twins. The type pass left this for its own pass (typography answers, 7).

## Today

- **Two systems, one unused.** `fluid.spacing.1` to `.3` in `1-global.json` (1→2rem, 2→3rem, 3→4rem) compile to `--fluid-spacing-1` … `-3`, which nothing reads. The spacing that is used, `--spacing-fluid`, `-x2`, `-x3` and the `--spacing-cq` set, is written by `compile-tokens.js` from literals: base `1rem` (`--spacing-16`), ratio 4/3, steps 1 to 3.
  - `--spacing-fluid`: 16 → 21.3px; `-x2`: 16 → 28.4px; `-x3`: 16 → 37.9px. Every step starts at 16px, so at the smallest width they're all the same.
- **Tier 2 points at CSS, not tokens.** `spacing.breathe` is `var(--spacing-fluid)` and `cushion` is `var(--spacing-fluid-x2)`, as strings. Figma sees no value for them.
- **Range.** The clamps use the type range (25rem to 80rem). That is the right default; it just isn't stated.
- **Use.** breathe 58 places and cushion 93 (card padding, wrapper gutter, main padding, cushioned stack, grid and cluster gaps, margin and padding utilities). `-x3` once; `cq-cushion` and `spacing-cq-x3` nowhere.
- **Modes.** Spacing is fluid by default, while text is fixed by default (PRINCIPLES §4). `.ui-compact` and the compact modes set breathe and cushion to `--spacing` (16px). Nothing makes spacing follow `--font-sizing`: in a `.font-sizing-cq` region the card padding still follows the viewport, not the container.
- **Literal fallbacks:** `var(--spacing-cushion, 2rem)`, `var(--spacing-breathe, 1rem)` in layout and utility CSS.
- **Blog:** builds the same steps in Sass (`$space`, `$space-scale: $perfect-fourth`), so the two match by hand.

## Decided (30 October 2026)

1. **Spacing stays fluid everywhere**, as today. Only the numbers move into the theme.
2. **Every role starts at 16px** on the smallest screens, except a new smaller breathe. Two roles added: `breathe-sm` (12 → 16px) and `cushion-lg` (16 → 37.9px, the old triple step).
3. **Its own Spacing section** in the Token Designer.

## Done (30 October 2026)

- **Theme:** `"space": { "base": "1rem", "ratio": 1.333333, "roles": { "breathe-sm": { "from": "0.75rem", "step": 0 }, "breathe": { "step": 1 }, "cushion": { "step": 2 }, "cushion-lg": { "step": 3 } } }`. A role grows from `from` (the base unless set) at the smallest width to base × ratio^step at the largest, across the type's fluid range.
- **Engine** (`theme-engine/src/space.js`): `spaceSteps`, `spaceFluidBlock` (Tier 1 `fluid.spacing.<role>` as `fluid(min, max)`), `applySpaceRoles` (Tier 2 `spacing.<role>` → `{fluid.spacing.<role>}`, `spacing.cq-<role>` → `{fluid.spacing.cq.<role>}`), `spaceGate` (positive, growing, each role at least the one before at both ends), `spaceCssVars`. `npm run build:space [-- --write]`; Publish writes it too and is blocked by its gate.
- **Compiler:** reads `fluid.spacing` instead of its literals (base 1rem, ratio 4/3). Each role compiles to `--fluid-spacing-<role>` (viewport) and `--fluid-spacing-cq-<role>` (container), with `progress()` versions. The old `--spacing-fluid`, `-x2`, `-x3`, `--spacing-cq` set, the unused `fluid.spacing.1` to `.3`, the `--spacing-fluid()`/`--spacing-cq()` functions and `--_space-ratio` are gone. breathe and cushion compile to the same clamps as before.
- **Compact:** `.ui-compact` and `.fine:ui-compact` set every role to `--spacing`, and `breathe-sm` to `--spacing-sm`, so it stays the smallest.
- **Fallbacks:** the literal fallbacks after the roles (`var(--spacing-cushion, 2rem)` and the rest) are gone.
- **Figma:** the exporter's hard-coded 21, 28 and 38px are gone; the roles come from their `fluid()` steps. Tokens Studio's large-container set now writes a fluid step's largest size: before, it pointed at the global token, which holds only the smallest, so fluid type there also showed its small size (body 16px where it should be 19.2px). Native Variables already had both modes.
- **Designer:** a Spacing section (`#space`): base and ratio (named ratios), each role's start and step with its size at both ends drawn to scale, and the gate. The preview shows the sample UI, and its width control shows the spacing grow.
- **Blog:** keeps its own Sass spacing (`$space`, `$space-scale`). Added `--spacing-breathe-sm` (a 12 → 16px clamp), `--spacing-cushion-lg` (its triple step) and their container twins; the layout and utility CSS synced.
- **Not done:** utilities for the two new roles (`.p-breathe-sm` and so on). Add them when something needs them.
