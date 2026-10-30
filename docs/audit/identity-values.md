# Identity and values: avatar, lockup and telemetry

Covers the components that show who someone is and what a number is:
- the avatar (`.avatar`, `.avatar-group`): a person's photo, initials or icon;
- the lockup (`.lockup`): a name with a line of detail under it;
- telemetry (`.telemetry`, `.telemetry-group`): a labelled value, such as "Uptime 99.98%".

They are often used together: an avatar beside a lockup is the identity pattern in tables, cards and headers, and telemetry sits in the same headers and dashboards. AGENTS.md already names telemetry for refactoring onto the status, text and icon atoms.

Counts cover Storybook stories, the docs site and `docs/markup/` (together, "Library") and the blog templates. The range lockup (`.range-lockup`) is a form control and isn't covered here. Rendering was checked in headless Chrome 156, light and dark.

## The CSS

| File | Lines | Selectors |
| :--- | ---: | :--- |
| `molecules/avatar.css` | 322 | `.avatar`; `--xs`, `--sm`, `--lg`, `--xl`, `--round`, `--square`, `--accent`, `--placeholder`, `--count` (alias `.avatar-count`); `--status-online`, `-away`, `-busy`, `-offline` and `[data-status]`; `[data-color]` with `attr()`; button and link states on the avatar itself; `.avatar-group`, `--stacked`, `--stackable`, `--crescent` |
| `atoms/button.css` §8 | 40 | `.button--avatar`, which repeats the avatar's status rings on a button |
| `molecules/lockup.css` | 91 | `.lockup`; `--tight`/`--sm`, `--gap`/`--md`, `--loose`/`--lg`, `--start`, `--center`, `--end`, `--horizontal`/`--inline` |
| `molecules/telemetry.css` | 392 | `.telemetry` **and** `.stat-pill`; parts `__icon`, `__content`, `__label`, `__value`, `__unit`, `__trend` (`--positive`, `--negative`, `--neutral`, `[data-trend]`), `__status`; `--compact`/`--sm`, `--lg`/`--card`, `--subtle`, `--bordered`, `--pill`/`--round`, `--stacked`, `--icon-end`/`--icon-right`, `--inline`, `--success`, `--warning`, `--danger`, `--accent` and `[data-status]`; flags `--telemetry-variation`, `--telemetry-density`; `.telemetry-group` **and** `.telemetry-strip`, `--ruled` |

Tier 3: `avatar.*` (15 tokens) and `telemetry.*` (28). Seventeen of the telemetry tokens are typography (`label-font-*`, `value-font-*`), which the token economy rule forbids. Lockup has none. Telemetry has three hex fallbacks, and all three files read Tier 1 spacing and the legacy `--ui-density` flag.

## Usage

| Pattern | Library | Blog |
| :--- | ---: | ---: |
| `.avatar` | 111 | 29 (the overview) |
| `--sm`, `--xs`, `--lg`, `--xl` | 29, 1, 1, 1 | 1, 1, 1, 0 |
| `--count` / `.avatar-count` | 5 / 0 | 0 / 4 |
| `--placeholder`, `--accent`, `--square` | 4, 1, 1 | 0, 1, 1 |
| `data-status` on an avatar or avatar button | 46 | 6 |
| `aria-label` on a plain `<div class="avatar">` | 41 | in the overview |
| `__text`, `__image`, `__fallback`, `avatar-count__text` | 0, 0, 1, 0 | 23, 3, 0, 4 |
| `.button--avatar` | 20 (header, app header, docs site) | 5 |
| `.avatar-group`, `--stacked`, `--crescent`, `--stackable` | 8, 4, 3, 1 | 4, 2, 1, 1 |
| `.lockup` | 35 | 0 |
| `<b>` / `<small>` children | 32 / 35 | 0 |
| `--sm` (spacing), other modifiers | 0 (the story file only) | 0 |
| `.telemetry` | 51 | 19 |
| `__label`, `__value`, `__content`, `__icon`, `__unit`, `__trend` | 52, 52, 30, 24, 14, 11 | 19, 19, 12, 12, 10, 4 |
| `<span>`/`<strong>` markup / `<dt>`/`<dd>` markup | 45 / 22 | all span/strong |
| `--stacked`, `--bordered`, `--card`, `--pill`, `--compact`, `--inline` | 13, 8, 5, 4, 4, 2 | 3, 0, 3, 4, 4, 0 |
| `data-status` on telemetry | 7 | 0 |
| `.telemetry-group`, `.telemetry-strip`, `--ruled` | 16, 1, 3 | 4, 1, 1 |
| `.stat-pill` | 0 | 0 |

## Measurements and checks

- **Avatar sizes** are 24, 32, 48, 64 and 96px with initials at 11, 13, 16, 19 and 23px. A compact container steps each size down one.
- **Status is a coloured ring.** A 2px border in success, warning, danger or muted is the only sign of "online" or "busy" unless the author also writes it into the label. About half the stories do.
- **Avatars are named with `aria-label` on a `<div>`.** A `<div>` has no role, so the label is not exposed. Axe flags two; the other 39 slip through because axe doesn't check every case. Photos inside avatars have their own `alt`, so some avatars are named twice and others not at all.
- **The avatar clips its content** (`overflow: hidden`), so nothing can sit on its edge.
- **Stacked groups overlap by 70%**, and crescent groups by 82% (39px of a 48px avatar). The stack is separated by a small shadow, which disappears on dark surfaces. `--stackable` spreads the stack out on hover only, so keyboard and touch users never see it.
- **Lockup children are browser defaults:** `<b>` at 16px bold, `<small>` at 12.8px, often with `.opacity-muted`, which isn't a token-backed colour.
- **Telemetry labels are 11px uppercase** and never wrap; long labels are cut off with an ellipsis and there's no way to read the rest. Values are 16px bold, or 23px in `--card`.
- **Trend colour** (green or red) repeats the sign on the number ("+12.4%"), so it isn't colour alone; it has hex fallbacks.
- **Telemetry intents** (`--success`, `data-status="online"`) tint only the icon and a 30% border, so they are colour alone.
- **Axe:** 19 stories. `Avatar › Variants` fails `aria-prohibited-attr` in both schemes. `Lockup › In table cells` fails contrast on a warning status (4.13:1), the palette gap already logged.

## Problems found

### Avatar
- **Tier.** An avatar is one indivisible thing (an image, initials or an icon in a shape), so it's an atom; it sits in `molecules/`. The group is the molecule.
- **Size axis.** Five sizes against the shared axis of three (default, `--sm`, `--lg`).
- **Status relies on colour**, and is implemented twice (the avatar and `.button--avatar`).
- **Names don't reach assistive technology** (`aria-label` on a `<div>`).
- **Interactive avatars** come two ways: the avatar styles itself as a button or link (hover, focus, cursor), and `.button--avatar` makes a button look like an avatar. Neither meets the button's target and state contract.
- **Custom colour** reads `data-color` with typed `attr()` and picks text with `contrast-color()`. Where either isn't supported, the text colour is invalid and falls back to inheritance, which can fail contrast on the custom background.
- **Aliases and leftovers:** `.avatar-count`, `--round` (already the default), parts that only the blog uses.

### Lockup
- **Type from the browser**, not the text atoms, and colour from `.opacity-muted`.
- **Six spacing modifiers in three pairs** for a gap that is 0 in nearly every use, alignment modifiers that repeat `text-align`, and `--horizontal`, which is an `.inline`.

### Telemetry
- **Type in the molecule** (label, value, unit and trend each set family, size, weight, spacing and transform), plus 17 typography tokens.
- **Two markups**, `<span>`/`<strong>` and `<dl>`. A label and its value are a term and its description, which only the `<dl>` says.
- **Modifiers cross the axes:** `--card` is a size, padding and type change in one; `--subtle` removes the surface (that's plain); `--bordered` is the default; `--pill` is corners; `--stacked` and `--icon-end` are layout.
- **Intents are colour alone**, and `data-status` is the attribute the badge pass removed elsewhere.
- **Aliases:** `.stat-pill`, `.telemetry-strip`, `--sm`, `--lg`, `--icon-right`, the variation and density flags.

## Where each one ends

- An **avatar** shows who: a photo, initials or an icon, in a shape. It isn't interactive; a button or link that opens a profile contains one.
- An **avatar group** shows several people, spaced or stacked.
- A **lockup** pairs a primary line with a secondary one (a name and an email, a plant and its feed). It holds text atoms and lets them truncate; it has no type of its own.
- **Telemetry** shows a labelled value: a label, a value, optionally an icon, a unit and a trend. A state ("Online") is a status atom; a count on a control is a badge.

## Questions

1. **Avatar is an atom; the group is a molecule.** Move `.avatar` to `atoms/avatar.css` and `.avatar-group` to `molecules/avatar-group.css`. As an atom, the avatar may set its own initials type (as the button does), from avatar tokens. *Recommended: yes.*

2. **Avatar content and names.** An avatar holds an `<img>`, initials as text, or an `.icon`. How it's named depends on what's next to it:
   - beside a visible name (a lockup): decorative, `aria-hidden="true"`, and the image's `alt=""`;
   - on its own, with a photo: the `<img alt="Sam Rivera">` names it;
   - on its own, with initials or an icon: `role="img" aria-label="Sam Rivera"` on the avatar.

   Remove `aria-label` on a plain `<div>`, the `__text`, `__image` and `__fallback` parts, and `avatar-count__text`. *Recommended: yes.*

3. **Status is a badge, not a ring.** Remove the coloured ring (`data-status`, `--status-*`, and the same on `.button--avatar`). Presence is a dot badge pinned to the avatar's corner, `<span class="badge badge--dot badge--success badge--bottom-end" aria-hidden="true">`, and the status is in the accessible name ("Sam Rivera, online") or in visible text beside it. The avatar stops clipping (the image rounds itself), so the dot can sit on the edge. *Recommended: yes.*

4. **Sizes.** Choose one:
   - **(a)** Default 48px, `--sm` 32px and `--lg` 64px, the shared size axis. `--xs` and `--xl` go; a one-off size (a 96px profile portrait, a 24px avatar in a dense table) sets `--avatar-size`. A compact container steps each size down one.
   - **(b)** Keep all five sizes as modifiers.

   *Recommended: (a).* `--xs` and `--xl` have one use each.

5. **Interactive avatars are buttons that contain an avatar.** Remove the avatar's own button and link styles and `.button--avatar`. A clickable avatar is `<button class="button button--plain button--icon button--round" aria-label="Account">` holding an `aria-hidden` avatar. The button gives the 48px target, focus ring, hover and pressed states; a 32px avatar fits inside with room for the ring. Migrates the header, app header and docs-site account menus. *Recommended: yes.*

6. **Avatar appearance.** Keep `--accent` (an accent fill), `--placeholder` (a dashed empty slot) and `--count` ("+3"; `.avatar-count` goes). `--square` stays as the corners option; `--round` goes, since round is the default. Custom colour is `--avatar-bg` with an explicit `--avatar-text`. `contrast-color()` is used only inside `@supports`, and `data-color` with `attr()` goes. *Recommended: yes.*

7. **Avatar group.** `.avatar-group` spaces avatars; `--stacked` overlaps them by one amount (`--avatar-group-overlap`, about a third), and rings each avatar in the surface colour so the edges stay visible on any background. Remove `--crescent` and `--stackable` (hover only). A group of named people is a `<ul class="avatar-group" aria-label="Project members">` of `<li>`s; a group beside a list of names is `aria-hidden`. *Recommended: yes.*

8. **Lockup holds text atoms.** The children take text atoms instead of relying on `<b>` and `<small>`: `<span class="small-heading">Marcus Chen</span>` and `<span class="small-text text-muted">mchen@…</span>`. The lockup keeps a column, `min-inline-size: 0` and one gap token (default 0). Remove the six spacing modifiers, the alignment modifiers (use `.text-center` or `.text-end`) and `--horizontal`/`--inline` (use `.inline`). The avatar-plus-lockup identity becomes a documented pattern in §6b, not a component. *Recommended: yes.*

9. **Telemetry is a description list.** Markup is `<dl class="telemetry-group" aria-label="…">` holding `<div class="telemetry">` items, each with a `<dt>` (an optional `.icon`, then the label) and a `<dd>` (the value, an optional unit and trend). A single metric is a `<dl>` with one item. Remove the `<span>`/`<strong>` form, `__content`, `__label`, `__value` and `__status` (bare `dt` and `dd`), `.stat-pill` and `.telemetry-strip`. The label sits above the value; `--inline` puts it beside the value. `--stacked` (now the default) and `--icon-end` go. *Recommended: yes.*

10. **Telemetry type from the atoms.** The telemetry sets no type except tabular figures on the value. The label takes a text atom. Choose one default for the docs and stories:
    - **(a)** `.small-text text-muted`: sentence case at 13px, and it wraps.
    - **(b)** `.micro-heading`: the uppercase eyebrow look of today, at the atom's size.

    Either way the label wraps; no ellipsis. The value takes `.text` normally or `.heading` for a headline metric, which replaces `--card`/`--lg`. A unit is `<span class="small-text">`. The 17 typography tokens go. *Recommended: (a).*

11. **Trends and states are status atoms.** A trend is `<span class="status status--plain status--success">` with an arrow icon and the signed value ("+12.4%"), and hidden text where the sign isn't enough ("up 12.4% on last week"). Remove `__trend`, its modifiers, `data-trend` and the hex. Remove the telemetry intents and `data-status`; a state such as "Online" is a status atom in the value. *Recommended: yes.*

12. **Telemetry axes.** Prominence: default is the bordered layer surface; `--plain` has no surface (it replaces `--subtle`, and the flag `--telemetry-prominence: plain` replaces `--telemetry-variation`); `--bordered` goes. Corners: `--round` (from `--pill`). Density: `--compact` sets `--ui-sizing: compact` (it replaces `--sm` and `--telemetry-density`). Group: `.telemetry-group` with a gap token, `--ruled` for one bordered strip with dividers. *Recommended: yes.*

13. **Tokens and stories.** Tier 3 is reorganised:
    - `avatar.*`: sizes, radius, border, surfaces, initials type, group gap, overlap and ring;
    - `lockup.gap`;
    - `telemetry.*`: surface, border, radius, padding, gap and compact padding.

    No typography tokens for lockup or telemetry, no hex, no Tier 1 fallbacks, no `--ui-density`. The three story files (1,199 lines) are rewritten to the current shape; Molecules/Avatar becomes Atoms/Avatar plus Molecules/Avatar Group. Usage in stories, recipes, the docs site and the blog overview migrates by script. *Recommended: yes.*

## Migration done

All recommendations taken: question 4 (a), question 10 (a).

### CSS and tokens
- **Avatar** is an atom (`atoms/avatar.css`, 170 lines, from a 322-line molecule shared with the group). It's an inline-flex circle sized by `--avatar-size`: 48px by default, `--sm` 32px, `--lg` 64px. The flag `--avatar-size-step` does the same from a container, and a compact container steps each size down one. `--square` (flag `--avatar-corners: square`) is the only corners option. The avatar sets its own initials type from avatar tokens, as the button does.
  - Looks: `--accent`, `--placeholder` (dashed) and `--count` (tabular figures).
  - A photo is an `<img class="avatar">`, or an `<img>` inside that rounds itself, so a corner badge can overhang.
  - A corner badge is pulled onto the round edge (0.146 of the size; none when square) and ringed in the surface colour.
  - A custom `--avatar-bg` without `--avatar-text` uses `contrast-color()` inside `@supports` only.
  - Removed:
    - `--xs`, `--xl`, `--round`;
    - the parts and `.avatar-count`;
    - `data-status` rings and `data-color`;
    - its own button and link styles, and `.button--avatar` (button.css §8).
- **Avatar group** (`molecules/avatar-group.css`, 48 lines): a list that is spaced by `--avatar-group-gap`. With `--stacked`, each avatar overlaps the one before by `--avatar-group-overlap` (0.33 of its size) and is ringed in `--avatar-group-ring-color`. `--crescent` and `--stackable` are gone.
- **Lockup** (91 → 35 lines): a column with `--lockup-gap` (0) and `min-inline-size: 0`. `span.lockup` is inline-flex. The spacing, alignment and horizontal modifiers are gone; lines take text atoms.
- **Telemetry** (392 → 174 lines): a `<dl>` with bare `dt` and `dd`. The value has tabular figures. Options:
  - `--inline`;
  - `--plain` (flag `--telemetry-prominence: plain`);
  - `--round` (flag `--telemetry-corners: round`);
  - `--compact`.
  
  `.telemetry-group` takes `--ruled`. The 17 typography tokens, the parts, the trend and intent styles, `.telemetry-strip` and `.stat-pill` are gone.
- **Button:** icon-only and collapsed-label buttons no longer visually hide an `.avatar` child; the label padding skips it too. The migrated account buttons were rendering an invisible 1px avatar until this was fixed.
- **Tokens:**
  - `avatar.*` is reorganised to 21 tokens, including sm/lg font sizes, accent, count, group gap, overlap and ring, plus inverted-palette entries;
  - `lockup.gap` is new;
  - `telemetry.*` goes from 28 tokens to 11.

### Markup
- Stories rewritten (1,199 → 497 lines): Atoms/Avatar (moved from Molecules), a new Molecules/Avatar Group, Molecules/Lockup and Molecules/Telemetry. Each has a playground, one story per option, and right to left.
- Migrated by script across stories, recipes, the docs site and `docs/markup`:
  - `button--avatar` became a plain round icon button holding an `aria-hidden` `avatar--sm`, with presence in the button's name;
  - `div.avatar-group` became `ul`/`li`;
  - `data-status` became a dot badge (online success, away warning, busy danger, offline neutral);
  - unnamed avatars became `aria-hidden`; named ones got `role="img"`;
  - `--xs`/`--xl` became `--avatar-size`;
  - the parts and span-wrapped initials were unwrapped;
  - `<b>`/`<small>` lockup lines became `.small-heading` and `.small-text text-muted`.
- Cadence and tally metrics are now `dl.telemetry-group` with text atoms; the sidebar footer identity is an avatar plus a lockup.
- §6, §6b and §30 are rewritten. §32's app header description is updated.

### Found while testing
- Axe on the affected stories, light and dark, found nothing new. Failures that were already there:
  - the warning-status contrast (4.25–4.48), for the palette work;
  - sidebar stories with light backgrounds in dark mode;
  - duplicate banner landmarks in the header demo stories;
  - breadcrumb link contrast on the muted header surface (4.23);
  - command-palette and filter-sidebar `aria-required-attr`;
  - the tally skeleton's empty table headers.

### Blog
- SCSS:
  - new `atoms/_avatar.scss` and `molecules/_avatar-group.scss`;
  - `molecules/_avatar.scss` removed;
  - lockup, telemetry and button regenerated.
- Tier 3: the avatar, lockup and telemetry blocks are replaced, and avatar entries were added to both inverted-palette blocks.
- `_component-library.twig`: the avatar section is migrated (crescent demo dropped, count avatars in groups at full size), the telemetry section is rewritten to the `dl` markup, and the "button with image" uses `img.avatar`.

### Added after the pass
- **Icon gutter** (asked for after review): `.telemetry--icon-start`, or the flag `--telemetry-icon-placement: start`, moves the label's icon into a gutter at the inline-start side of the box. The icon is 24px and centred on the label and value, as the old stacked layout's icon was. It works with `--round`, `--inline`, `--plain`, `--compact` and ruled groups, and in right to left. The icon stays in the `dt` and is positioned absolutely, so the markup and its semantics don't change. New tokens: `telemetry.lead-icon-size` (spacing.24) and `telemetry.lead-icon-gap` (spacing.12).
- **Subtle** (asked for after the palette pass): `.telemetry--subtle`, or `--telemetry-prominence: subtle`, fills the box with the muted surface and drops the border, like the other subtle components. Increased contrast puts the border back. New token: `telemetry.subtle-bg` (surface.muted). The name was free: the old `--subtle` meant plain and went in the pass.
