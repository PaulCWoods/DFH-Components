# Announcements: banner, alert and toast

Covers the components that carry a message to the reader:
- the banner molecule (`.banner`), the one visual for an announcement (PRINCIPLES §3);
- the alert placement container (`.alert`), which pins a banner to the page edge;
- the toast stack and toast (`.toast-stack`, `.toast`), which float banners in a viewport corner.

PRINCIPLES already decides that alert is a role, not a component: "Banner is the visual; alert is a role on it." This pass makes the CSS match that decision.

Counts cover Storybook stories, the docs site, `docs/markup/` (together, "Library") and the blog templates.

## The CSS

| File | Lines | Selectors |
| :--- | ---: | :--- |
| `molecules/banner.css` | 349 | `.banner` and 15 modifiers (`--subtle`, `--strong`, `--accent`, `--info`, `--success`, `--warning`, `--danger`, `--error`, `--compact`, `--dense`, `--flush`, `--dynamic-corners`, `--round`, `--ruled`, `--action-align-center`); parts `__inner`, `__action`, `__thumb`; 6 rules that style `.alert` placements |
| `molecules/alert.css` | 157 | `.alert`, `--sticky`, `--top`, `--fixed-top`, `--bottom`, `--fixed-bottom`, `--floating`, `--compact`, `--dense`, `--dismissing`; restyles `.banner` |
| `molecules/toast.css` | 230 | `.toast-stack` and 6 placements; `.toast`, `--dismissing`, `[popover].toast`; one keyframe |

Tier 3: `banner.*` (10 tokens), `alert.*` (6), `toast.*` (6). The CSS also reads `--banner-sm-*` (4 names) and `--alert-sm-*` (2), which have no tokens.

## Usage

| Class | Library | Blog |
| :--- | ---: | ---: |
| `.banner` | 136 | 31 |
| `.banner__inner` | 82 | 21 |
| `.banner__action` | 44 | 18 |
| `.banner__thumb` | 4 | 0 |
| `--success`, `--warning`, `--info` | 19, 18, 16 | 4, 4, 6 |
| `--error` / `--danger` | 9 / 2 | 4 / 0 |
| `--accent` | 0 | 0 |
| `--subtle`, `--strong` | 6, 6 | 4, 5 |
| `--dynamic-corners` | 16 | 1 |
| `--round`, `--ruled` | 3, 1 | 1, 1 |
| `--compact`, `--dense`, `--flush`, `--action-align-center` | 0, 0, 0, 0 | 1, 0, 0, 1 |
| `.alert` (class) | 25 | 2 |
| `.alert--floating`, `--bottom`, `--top`, `--sticky`, `--fixed-top`, `--fixed-bottom` | 6, 6, 5, 4, 1, 0 | 0, 0, 1, 0, 0, 0 |
| `.alert--dismissing` | 6 | 1 |
| `.alert__visual`, `__title`, `__description`, `__content`, `.alert--warning` (no CSS) | 1 each | 0 |
| `.toast-stack` | 22 | 0 |
| `.toast-stack--bottom-end`, `--top-end`, `--top-center`, others | 9, 3, 3, 1 each | 0 |
| `.toast`, `.toast--dismissing` | 16, 5 | 3, 0 |

Roles on banners in the library: `role="none"` 25, `role="region"` 20, `role="status"` 8, `role="alert"` 7. Banners carry `buttons-sm` (25 times) and `buttons-round` (4); neither class does anything there. `.buttons-sm` no longer exists, and `.buttons-round` only works inside a button group.

## Measurements

Prominence matrix story, against the page (`--surface`). Text is the body copy on the banner.

| | Light: surface vs page | Light: border | Light: text | Dark: surface vs page | Dark: border | Dark: text |
| :--- | ---: | ---: | ---: | ---: | ---: | ---: |
| Default, neutral | 1.08 | 2.36 | 8.26 | 1.23 | 4.49 | 16.14 |
| Default, info / success / warning / error | 1.01 | 1.74 / 1.90 / 1.52 / 2.30 | 7.6–7.7 | 1.00–1.11 | 3.06–5.42 | 13–14.6 |
| `--subtle`, any intent | 1.00–1.01 | none | 7.6–7.7 | 1.00–1.10 | none | 13–14.5 |
| `--strong`, neutral | 7.65 | none | 8.33 | 13.17 | none | 16.43 |
| `--strong`, info / success / warning / error | 6.26 / 5.30 / 4.15 / 5.67 | none | 6.82 / 5.77 / **4.52** / 6.17 | 8.3–10.3 | none | 10.4–12.9 |

- **The intent tints have no lightness contrast.** Default and subtle intent banners sit at 1.00 to 1.01:1 against the page in light mode. The tints differ from the page by hue, not lightness; the default translucency washed out even that. (Corrected after migration: once opaque, the tints are clearly distinct. See "Migration done".)
- **Intent is often colour alone.** 42 of the 77 banners with an intent have no leading icon and no live role (WCAG 1.4.1). With the tints this faint, they show almost no intent at all.
- Strong warning text is 4.52:1 in light mode. It passes AA for body text, but only just.
- Every banner, strong ones included, has `backdrop-filter: blur(8px)` because translucency is the default.

## Problems found

### Banner
- **Axes.** Prominence is default, `--subtle` and `--strong`, with no `--plain` and no flags. Intent has six values with `--error` as an alias of `--danger`. There is no `--banner-prominence` or `--banner-intent` flag, so a container can't set them.
- **Material.** Translucency and a backdrop blur are on by default. Card made translucency an opt-in material in the surfaces pass.
- **Corners.** `--dynamic-corners` computes a radius concentric with the action button. `--round` makes a pill (9999px), which breaks on a banner that wraps to two lines. Both are about the corners axis, and the markup pairs them with `buttons-round`, which does nothing.
- **Leftovers:** `--dense` (alias), `--flush` (0 uses; placement squares the edges), `--action-align-center` (a class for one token), `--ruled` (uses the experimental `rule` property; 2 uses).
- **`__thumb`** uses negative margins to bleed an image to the edge. A banner with media and parts is a card in a row (`--card-dir: row`).
- **`__inner`** is a vague name. Card calls the same part `__body`.
- **Tokens.**
  - `--banner-sm-*` are read but never defined (the compact names are `--card-compact-*` in card).
  - The compact query still reads the legacy `--ui-density: dense`.
  - Fallbacks reach Tier 1 (`--spacing-4`, `--spacing-8`, `--spacing-block-2xs`) and end in hex literals (`#ffffff`, `#00875a`, `#d32f2f`, `#b06000`, `#008076`).
- **Reach-in.** Section 7 of `banner.css` styles `.alert` placements, so banner and alert import each other's names (inventory finding 10). PRINCIPLES forbids this.
- **Markup.** Examples use bare `<p>` with inline font styles, `.subheading` for titles and an inline-styled `div` for action groups.

### Alert
- **Name.** The class `.alert` sits on an `<aside role="region">` holding a banner with `role="none"`. The class says "alert"; the role never does. Readers will expect `.alert` to announce.
- **Duplicate placements.** `--top` is the same rule as `--sticky`. `--bottom` is the same as `--fixed-bottom`.
- **Restyles the banner.** It sets `display: inline-flex` on the banner (also set in `banner.css`) and the banner's action alignment.
- **`--compact`, `--dense`** change only the floating padding. Density belongs to `.ui-compact`.
- **Dismissal** is a JS-added class (`--dismissing`) that slides the bar away but leaves it in the page and the accessibility tree.
- **Undefined parts.** `alert__visual`, `__title`, `__description`, `__content` and `.alert--warning` appear in one story with no CSS behind them.

### Toast
- **Wrapper.** Each toast is a `.toast` holding a `.banner role="none"`. The wrapper sets one thing on the banner (its shadow) and carries the role.
- **Live region.** The role is on each toast (`role="status" aria-live="polite"`). A live region must already be in the page when its content changes. A toast inserted with its own role is announced unreliably. `aria-live="polite"` on `role="status"` is redundant.
- **Layer.** The stack is `position: fixed` with a z-index. An open modal dialog sits in the top layer above it and makes the page inert, so a toast raised while a dialog is open is hidden behind the backdrop and can't be dismissed.
- **Dismissal** is a JS class plus a `setTimeout` in the story markup. There is no guidance on auto-dismiss timing (WCAG 2.2.1) beyond a line in the story docs.
- **Tokens.** `toast.max-width` is a literal `28rem`. Fallbacks reach Tier 1 (`--spacing-12`, `--spacing-16`). The stack sets `--_banner-gap`, another component's private variable.
- **`--banner-dynamic-corners`** is used on 16 toasts, so the corners question below decides toast's look too.

## Where banner ends and card begins

A banner is **one message with an intent**, laid out in one row: an optional icon, the message and optional actions. It has no named parts beyond that.

A card is a **surface with named parts**: header, body, footer, bands, media. A promotion with an image, a notice with a title, body and a footer of controls, or anything without a message is a card.

## Questions

1. **Banner prominence on the shared axis.** Map it as card does, with one difference: strong fills, because a banner's strong form is the urgent one, not the floating one.

   | Modifier | Look |
   | :--- | :--- |
   | (default) | Intent tint and intent border |
   | `--subtle` | Intent tint, no border |
   | `--strong` | Filled with the intent colour, inverted text |
   | `--plain` (new) | No surface or border: icon and text only, for a message inside a form or a card |

   Flags: `--banner-prominence`, `--banner-intent`. The tints (`--surface-{intent}`) need to be visible: at 1.01:1 they're not. Fixing that is a Tier 2 change and joins the palette item in the backlog. *Recommended: yes.* (After migration: not needed; see "Migration done".)

2. **Intent never by colour alone.** `--danger` is the one name (`--error` goes; 13 uses). Every banner with a non-neutral intent starts with an icon (`<svg class="icon">` as the first child, `aria-hidden`), or states the intent in its text. The markup file and stories make this the rule, and the migration adds icons to the 42 banners without one. Generating the icon in CSS is possible but would bypass the sprite. *Recommended: icon in markup.*

3. **Translucency is opt-in.** Default banners are opaque with no backdrop blur. `.banner--translucent` is the material, as on card. *Recommended: yes.*

4. **Parts.** Rename `__inner` to `__body` to match card (103 uses migrated by script). Keep `__action` for a button or a group of buttons; a group uses `.cluster`, not inline styles. A banner title uses a text atom (`.heading` or `.text.font-bold`); the banner sets no type. *Recommended: yes.*

5. **Remove `__thumb`.** A banner with media is a card in a row. The 4 uses move to `.card` with `--card-dir: row`. *Recommended: yes.*

6. **Corners.** Choose one:
   - **(a)** `.banner--round` (flag `--banner-corners: round`) rounds the banner's buttons and draws the frame concentric with them, which is what `--dynamic-corners` + `buttons-round` meant to do. It never becomes a pill, so it works on two lines. `--dynamic-corners` goes.
   - **(b)** Concentric corners always; no modifier.
   - **(c)** Keep both modifiers and tidy the CSS.

   *Recommended: (a).*

7. **Trim.** Remove `--dense`, `--flush`, `--action-align-center` (set `--banner-action-align`), `--ruled` and the `buttons-sm` / `buttons-round` classes from banner markup (the banner already makes its buttons small and subtle). `--compact` sets `--ui-sizing: compact` and reads `--banner-compact-*` tokens. *Recommended: yes.*

8. **The placement container.** Choose one:
   - **(a)** Rename `.alert` to `.banner-dock`, beside `.toast-stack`, so no class claims to be an alert. Placements: `--sticky` (top, sticks on scroll), `--fixed-top`, `--fixed-bottom`, `--floating`; the duplicates `--top` and `--bottom` go, as do `--compact`, `--dense` and the undefined `alert__*` parts. The dock squares the banner's edges by setting banner flags; `banner.css` no longer mentions it.
   - **(b)** Keep the name `.alert` with the same clean-up.

   *Recommended: (a).* Using `.alert` beside `role="alert"` invites the mistake PRINCIPLES rules out.

9. **Toast structure and live region.** `.toast` goes on the banner itself (`<div class="banner banner--success toast">`); the wrapper and `role="none"` go. The stack is the live region: it is in the page from the start with `role="status"` (polite) and a label, and toasts are added to it. An urgent toast goes in a second stack with `role="alert"`. The stack opens as `popover="manual"`, so it sits in the top layer above an open dialog; the pass checks that its buttons stay reachable then. *Recommended: yes.*

10. **Dismissal without state classes.** A dismissed banner or dock gets `hidden`; a toast is removed or hidden with `hidePopover()`. Exit animations run from CSS with `transition-behavior: allow-discrete` and `@starting-style`, and reduced motion turns them off. `--dismissing` goes from alert and toast. The docs set the timing rule: a toast with an action never dismisses itself; others stay at least 5 seconds and pause while hovered or focused (WCAG 2.2.1). *Recommended: yes.*

11. **Roles.** An in-flow banner takes no role (drops 20 `region` landmarks and 25 `role="none"`). `role="status"` or `role="alert"` go only on a region that is in the page before its message arrives. A dock is an `<aside>` with a label. The markup file explains this. *Recommended: yes.*

All approved as recommended.

## Migration done

### CSS and tokens
- **`molecules/banner.css` rewritten** (349 → 337 lines).
  - Intent and prominence follow the status atom's pattern: intent modifiers set tones (`--_banner-tone`, `-tint`, `-subtle-tint`, `-tone-border`, `-solid`), and prominence modifiers choose from them, so the classes combine in any order.
  - Flags `--banner-prominence`, `--banner-intent`, `--banner-corners` and `--banner-dock` are declared before the modifiers.
  - Opaque by default; `.banner--translucent` is the material.
  - `--round` draws the frame concentric with small round buttons.
  - Density is applied before prominence so a plain banner stays flush.
  - Dismissal is `[hidden]` with an `allow-discrete` fade; entry uses `@starting-style`.
  - No Tier 1 references and no hex fallbacks remain. `banner.css` no longer mentions `.alert`.
- **`molecules/alert.css` became `molecules/banner-dock.css`** (157 → 105 lines).
  - Placements: in flow, `--sticky`, `--fixed-top`, `--fixed-bottom` and `--floating`.
  - It sets `--banner-dock: top | bottom | none` and `--banner-action-align`, and never selects `.banner`.
  - `[hidden]` slides it off its edge.
- **`molecules/toast.css` rewritten** (230 → 136 lines).
  - The stack resets the popover UA box.
  - Placements are private-variable maps (6 rules → 3).
  - The stack sets `--banner-shadow` for its toasts; `.toast` sits on the banner.
  - Entry uses `@starting-style`; exit is `[hidden]`.
- **`molecules/popover.css`** excludes `.toast-stack` instead of `.toast` from its bare-`[popover]` rules.
- **Tokens.**
  - `banner.*` rewritten: `padding`, `body-padding`, `strong-bg`, `transition` and `compact.*`. `subtle-bg` is now `{surface.muted}`, because `{surface.subtle}` matched the page.
  - `alert.*` became `banner-dock.*`.
  - `toast.max-width` is `{spacing.448}`.
- **`layout/app.css`** no longer puts `.alert` in the aside area.

- **Follow-up (icon box):**
  - The intent icon sits in an `.icon-box`, and the banner sets `--icon-box-sm-min-size` to the small button's size, so the box and the buttons stay equal.
  - Icon box and actions share one alignment, `--banner-align` (start by default; a dock sets centre). It replaces `--banner-action-align` and `--banner-icon-align`.
  - A bare `.icon` in a banner is no longer styled.

### Markup
- Stories: `banner.stories.ts` and `toast.stories.ts` rewritten; `alert.stories.ts` became `banner-dock.stories.ts`.
  - The toast playground opens a real `popover="manual"` stack and runs the 5-second timer with pause on hover and focus.
  - Static demos sit in a `contain: layout` frame.
- Recipes:
  - Tally-sprout: dock, three intent icons, and a toast unwrapped into a live popover stack with a hover- and focus-aware timer.
  - Cadence: an undefined `.alert__*` block became a banner.
  - Popover story: role dropped and icon added.
- `docs/markup/11-banner.md` and `18-toast.md` rewritten; `21-alert-placement.md` became `21-banner-dock.md`. AGENTS.md has the legacy row and links; PRINCIPLES has the updated rule and two decisions.
- **Blog:**
  - `_banner.scss`, `_banner-dock.scss` (was `_alert.scss`) and `_toast.scss` regenerated, `_popover.scss` exclusion updated, and Tier 3 banner and dock tokens rewritten.
  - The Banners, Banner dock and Toast sections of `_component-library.twig` rewritten.
  - The `_contact.twig` flash messages became banners with icons. Recompiled.

### Checks
- **Axe:** 25 stories (banner, banner dock, toast, popover, tally-sprout, cadence), light and dark. One finding: the warning status atom in cadence's buffering state, at 4.25:1 (the palette backlog item; not a banner).
- **Screenshots** confirmed:
  - prominence × intent in both schemes;
  - dock placements (in flow, sticky, fixed bottom with a wrapper, floating);
  - the toast stack;
  - compact density and round corners, including a two-line round banner.

### Measurements after migration
| | Light | Dark |
| :--- | ---: | ---: |
| Intent icon on its banner (default, subtle, plain) | 4.12–5.67 | 8.3–11.2 |
| Neutral subtle surface vs page (was 1.00) | 1.17 | 1.30 |
| Strong warning text | 4.52 | 12.87 |

- The intent tints have about 1.01:1 lightness contrast against the page, but differ clearly in hue once the banner is opaque; the translucent default had been washing them out. The icon now carries the intent for everyone, so no Tier 2 change is needed and nothing joins the palette backlog.
- **Popover above a modal dialog:** tested in Chrome. A `popover="manual"` element outside an open modal dialog is inert even when drawn above it, while one inside the dialog works. The rule is therefore that a dialog holds its own stack. The markup file and stories say so.
- **`[hidden]` exit transitions** work against the reset's `display: none !important` (Chrome, measured mid-transition).

### Left for later
- Popover and tooltip still mention `.banner` in their `:has()` checks; the floating-layers pass decides whether a banner belongs in a popover.
- The docs site links to `/components/molecules/banner`, which has no page.

