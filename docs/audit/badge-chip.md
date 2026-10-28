# Badge, chip, status and kbd: usage inventory

Oct 27, 2026. This is the first step of the badge and chip pass, done before any CSS changes. It records where every current usage lands under the four definitions agreed below.

## Definitions

| Atom | Job | Axes |
| --- | --- | --- |
| **Badge** | A count or dot **attached to another element** (a tab, button, nav item or avatar), shown in its corner or inline after its label | Intent, size. Prominence is fixed at strong. |
| **Chip** | A token that **represents a value**: a selected option, an active filter, a category or tag. It can be removable (`.chip__remove`). | Size, prominence. No intent. |
| **Status** | The **state of a thing**: text with an optional dot or icon, used in tables, lists and cards | Intent, prominence, size |
| **Kbd** | A key or keyboard shortcut | Size only |

**How to choose:** if it is attached to something, it's a badge. If it sits in the flow and says what state something is in, it's a status. If it's a value someone chose, or could remove, it's a chip.

**Agreed decisions:**
- Pill labels such as "New", "Beta" and "Passed" are statuses with a prominence. There is no fifth "label" atom.
- `data-status` (online, away, busy) means presence, and stays on avatar only. Everywhere else, state is set with intent modifiers.

## Method

A script (`scratchpad/inventory.mjs`, then `inventory2.mjs`) found every element whose class list contains `badge`, `chip`, `status` or `kbd`, plus bare `<kbd>` elements. It searched Storybook stories, the docs site, the component CSS and AGENTS.md. For each element it recorded the text and the enclosing context (button, tab, link, table or list), then applied the rule above:
- corner modifier, or a number inside a tab, button or link → **badge**;
- intent modifier, presence attribute or state word → **status**;
- removable, or a category or metadata word → **chip**.

The 169 cases the rules couldn't settle were classified by hand. The result is a heuristic: expect a few individual calls to change during migration.

Some files are rewritten wholesale in this pass, so their usages are not itemised here: `badge.stories.ts` (57), `chip.stories.ts` (20), `badge.css` and `chip.css` (10 in comments), and AGENTS.md (74).

## Totals (478 usages in 58 files)

| Current class | → Badge | → Status | → Chip | → Kbd | → Story caption | → Other |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| `.badge` (317) | 25 | 147 | 38 | 1 | 99 | 7 |
| `.chip` (62) | | 3 | 59 | | | |
| `.status` (22) | | 22 | | | | |
| `.kbd` / `<kbd>` (77) | | | | 77 | | |

**What this shows:**
- **Only 8% of badges are badges.** Of the 317 `.badge` usages, 25 are attached counts. Nearly half (147) are statuses, and a third (99) are captions in story demos.
- **Story captions are the second-largest group.** Stories use badges to label demo regions: `.card__thumb`, "Fluid Step 5 (3.052rem)", "RTL Mode", `.width-popover`. They aren't library components. Storybook already has demo-only helpers in `.storybook/demo.css` (`.sb-demo-box`, `.sb-demo-container`), so these should become a demo-only class such as `.sb-demo-label`. That would take them out of the library and stop them showing up in axe results as real UI.
- **Chip is already mostly right.** 59 of 62 are tags or removable tokens; the 3 `chip--status` usages become statuses.
- **Kbd is clean.** One `⌘K` written as a badge becomes a `kbd`.

## Questions the inventory raises

1. **What does a status look like by default?** 147 of the incoming statuses are pills: a bordered, tinted badge. The 22 existing `.status` usages are a dot and text. Following the shared prominence axis, I recommend:

   | Prominence | Status rendering | Replaces |
   | --- | --- | --- |
   | Default (outline) | Bordered, tinted pill | `.badge.badge--success` etc. |
   | `--strong` | Solid fill | `.badge--strong` |
   | `--subtle` | Tinted fill, no border | `.badge--subtle` |
   | `--plain` | Dot and text, no surface | Today's `.status` |

   This keeps prominence meaning the same thing on button and status, and most usages stay visually the same. The cost is that the 22 existing `.status` usages become `.status.status--plain`.

2. **Can a badge sit inline instead of in a corner?** Most counts (20 of 25) sit after their host's label: tab counts ("Issues 14"), nav counts and the batch-actions selection count. I recommend that a badge can be either cornered or inline after the label, as long as it belongs to a host.

3. **Should accent be a status intent?** 45 statuses use accent for "New", "Active", "Live" and "Next". PRINCIPLES lists accent as an intent, so it maps directly. Note it for the info decision in the banner pass: several of these ("Updated", "Step 2 of 4") would read as info.

4. **Dot-only statuses.** 17 `.status` elements have no text: deck channel lights, telemetry, sidebar footer. They're valid only when the adjacent text carries the meaning (WCAG 1.4.1). The deck usages follow deck to recipes. I'll check each of the rest during migration.

5. **Icon-only status.** The docs site's `GuidelineCard.astro` uses strong round badges holding a check or cross icon for "Do" and "Don't". These become a strong status with an icon, provided the visible heading says "Do" or "Don't".

6. **Other (7).** Four `DFH` brand marks in header and skip-link stories are logos, not badges; they should be an avatar or the brand icon. Three ordinal markers (1, 2, 3) in `layout-stack.stories.ts` are list numbers; they should be a stepper indicator or plain list markers.

7. **Blog.** `designforhumans-blog` templates have 138 `.badge`, 10 `.chip`, 6 `.status` and 9 `.kbd` usages. They will migrate with the same rules after the library pass, as with button.

## Migration done

### CSS and tokens
- `badge.css` and `chip.css` rewritten; `status.css` and `kbd.css` added and imported after chip in `index.css`.
- `tokens/3-component.json`: badge and chip groups replaced, status and kbd groups added. Tokens rebuilt and the Figma export re-run.
- Text transform now defaults to `none` for status (it was uppercase). It is tokenised (`status.text-transform`), so it can be flipped back.
- Cross-component selectors updated in `button.css`, `tab.css`, `menu.css`, `button-group.css`, `skeleton.css` and `deck.css` (`--chip-variation: simple` became `--chip-prominence: plain`).
- Button's icon-only label hiding now excludes `.badge`, so corner badges show on `.button--icon`.

### Markup
- 392 elements in 55 files rewritten by script, using the buckets above.
- Fixed by hand:
  - docs components (GuidelineCard, Sidebar, index, ExampleCard);
  - the command palette ⌘K, now a nested `.kbd`;
  - the DFH brand marks in the header and skip-link stories, now an `.avatar`;
  - the avatar and app-header doc text.
- The unnamed `.chip__remove` buttons in the filter-sidebar recipe and in the AGENTS.md examples are now named "Remove {value}".
- AGENTS.md §5 rewritten; Legacy table row added.

### Visible changes
- Status text is no longer uppercase.
- Neutral count badges are now strong (solid). Tab counts used to be subtle grey.
- Chips that existed before the pass gained `--subtle`, so they look as they did; the new default chip is the outline.
- The 99 story captions are now `.sb-demo-tag` pills (dashed, muted, mono).

### Axe (static Storybook, light and dark)
- Full run of 479 stories:
  - light: 476 rendered;
  - dark: 478 rendered;
  - the stories that did not render passed on re-run, apart from `utilities-color--playground`, which was already failing.
- Contrast failures involving these atoms went from 33 before the pass to 23 in the full run. After the targeted re-run, only the warning and accent contrast below remain.
- **Still failing, and already failing before the pass:** warning text in light mode. `--foreground-warning` (amber-700, `#a86800`) on canvas or on its own tint measures 4.13–4.25:1. Small bold text needs 4.5:1. The fix is a Tier 2 token change (amber-800 in light), which also affects banner, empty-state and range, so it needs a decision.
- **Borderline:** accent text on the subtle accent tint (`#8553b5` on `#efe7f7`) measures 4.47:1. The same token decision applies.
- `button-name` on `.chip__remove` is fixed.
- No other badge, status, chip or kbd violations.

### Text sub-elements (follow-up)
- `.badge__text`, `.status__text` and `.chip__text` carry `text-box: trim-both cap alphabetic`, so the text centres optically. Trimming has no effect on the flex container itself.
- Chip `padding-block` is now `spacing.8` (`spacing.4` at `--sm`), matching status. The remove button overhangs by `(1cap - 1lh) / 2`, so removable chips are no taller than static ones.
- 327 elements were wrapped by script. Helper-built markup was updated by hand, and so were the dashboard scripts that rewrite status and badge text.
- tab.css: a tab with visible `.tab__text` is no longer treated as icon-only just because it also contains `.visually-hidden` text. That rule removed the gap before inline badges.

### Blog (designforhumans-blog)
- `_badge.scss`, `_chip.scss` and `_button.scss` are re-ported from the library CSS; `_status.scss` and `_kbd.scss` are new and forwarded in `atoms/_index.scss`.
- Selector updates replayed in `_tab.scss`, `_skeleton.scss`, `_menu.scss` and `_button-group.scss`. `_deck.scss` now uses `--chip-prominence: plain`.
- `library/theme/_tier3.scss`: the old uppercase badge and chip tokens are replaced by the badge, status, chip and kbd tokens.
- `_component-library.twig`:
  - the Badges section was rewritten as four sections (Badges, Status, Chips, Keyboard Keys);
  - 122 elements were reclassified by job;
  - 120 more got `__text` wrappers;
  - a broken `<kbg>` tag was fixed.
- Compiled to `web/styles/css/`, the path `_layout.twig` loads. The AGENTS.md command was pointing at `web/styles/`.

### Remaining
- Telemetry and empty-state still use `data-status`, to be fixed in their own passes.
- The docs sidebar links to a `/components/atoms/badge` page that does not exist. It did not exist before this pass either.
- Info now has its own aqua roles (icon pass). The 45 accent statuses ("New", "Active", "Live", "Next") stay accent.

## Badges that stay badges (25)

| Where | Text | Context |
| --- | --- | --- |
| `molecules/navigation-tree.stories.ts:220` | 17 | count in link |
| `molecules/tab-list.stories.ts:66` | 42 | count in link |
| `molecules/batch-actions.stories.ts:30` | 3 | count (flow) |
| `molecules/batch-actions.stories.ts:90` | 3 | count (flow) |
| `molecules/batch-actions.stories.ts:135` | 5 | count (flow) |
| `molecules/batch-actions.stories.ts:214` | 2 | count (flow) |
| `molecules/batch-actions.stories.ts:259` | 4 | count (flow) |
| `molecules/popover.stories.ts:441` | 1 | corner |
| `atoms/tab.stories.ts:99` | 12 | count (flow) |
| `layout/layout-sidebar.stories.ts:1079` | 8 | count in link |
| `recipes/recipe-tally-sprout.stories.ts:319` | 2 | corner |
| `recipes/recipe-tally-sprout.stories.ts:1153` | 0 | count (flow) |
| `recipes/recipe-cadence-dashboard.stories.ts:1012` | 8 Queued | count (link) |
| `recipes/recipe-cadence-dashboard.stories.ts:1043` | 2 | count in link |
| `recipes/recipe-cadence-dashboard.stories.ts:1377` | 0 selected | count (flow) |
| `recipes/recipe-app-header.stories.ts:65` | 3 | corner |
| `recipes/recipe-app-header.stories.ts:193` | 3 | corner |
| `recipes/recipe-app-header.stories.ts:209` | 3 New | count (flow) |
| `recipes/recipe-app-header.stories.ts:643` | 3 | corner |
| `organisms/tabs.stories.ts:43` | 2 | count in button |
| `organisms/tabs.stories.ts:68` | 14 | count in link |
| `organisms/tabs.stories.ts:306` | 3 | count in button |
| `organisms/tabs.stories.ts:900` | 24 | count in link |
| `organisms/tabs.stories.ts:906` | 5 | count in link |
| `organisms/menu.stories.ts:313` | 3 | count in button |

## Statuses from `.badge` (147)

Grouped by the intent they carry today. Each maps to `.status` with the same intent and a prominence from question 1. Empty text means an icon or dot only (see questions 4 and 5).

| Current intent | Usages | Texts |
| --- | ---: | --- |
| success | 68 | AAA, Paid, Healthy, WCAG 1.4.12 Text Spacing Passed, New, (empty), A, +14.2%, On Air, Beta, Live, Passing, Operational, Omega, Stable, Compliant, 100%, 87.5%, Hot, 87.5% Full, ${plot.feeStatus}, In Shed, Live • 320k AAC, -1.8 dB Headroom, 36 Components, WCAG AAA, Ahead, Closed, WCAG {wcagLevel}, Passed |
| accent | 45 | New, Save 20%, Updated, Optimal, Running, AAA, M, Active, Selected: #card-hero-banner, Alpha, 78%, Default, Spring 2026 Season Active, WCAG 2.2 AAA, LIVE, Step 2 of 4, ON AIR, Approved, Next, Live Demo, WCAG AAA, WCAG 2.2 Ready, Featured Prototype |
| warning | 18 | Pending, 72% Used, 2 Live, Gamma, 7 Due, Staging, Action Required, Checked Out, Maintenance, Reconnecting • Buffer Depleted, Auto-Recovery Active, 0 Results, CUED, On Track |
| neutral | 10 | Pro, Status, Nominal, Synced, WCAG 2.2 AAA, ${plot.feeStatus}, Default, Live, AA, {status} |
| danger | 5 | 2 Overdue, 2 Days Overdue, 0 Matches, (empty) |
| template | 1 | ${item.status} |

## Chips from `.badge` (38)

Categories, technologies, versions and metadata. The intent modifiers some of these carry (for example `badge--warning` on "JS") are decoration, not state, and are dropped.

| Where | Text | Current classes |
| --- | --- | --- |
| `molecules/navigation-tree.stories.ts:232` | v2.2 | `badge badge--sm badge--subtle` |
| `molecules/tab-list.stories.ts:411` | v2.4 | `badge badge--sm badge--subtle` |
| `molecules/popover.stories.ts:363` | Design Lead | `badge badge--subtle` |
| `atoms/text.stories.ts:468` | 8 Min Read | `badge badge--sm` |
| `layout/layout-sidebar.stories.ts:245` | v2.0 | `badge badge--sm badge--accent` |
| `layout/layout-sidebar.stories.ts:291` | v2.4 | `badge badge--subtle badge--sm` |
| `layout/layout-sidebar.stories.ts:341` | Core | `badge badge--sm badge--subtle` |
| `layout/layout-cluster.stories.ts:70` | CSS | `badge badge--accent` |
| `layout/layout-cluster.stories.ts:71` | HTML5 | `badge badge--accent` |
| `layout/layout-cluster.stories.ts:221` | HTML5 | `badge badge--accent` |
| `layout/layout-cluster.stories.ts:222` | CSS3 | `badge badge--success` |
| `layout/layout-cluster.stories.ts:223` | ARIA | `badge badge--warning` |
| `layout/layout-cluster.stories.ts:224` | WCAG | `badge badge--danger` |
| `layout/layout-cluster.stories.ts:401` | HTML | `badge badge--accent` |
| `layout/layout-cluster.stories.ts:402` | CSS | `badge badge--success` |
| `layout/layout-cluster.stories.ts:403` | JS | `badge badge--warning` |
| `layout/layout-inline.stories.ts:522` | Architecture | `badge badge--accent badge--sm` |
| `layout/layout-grid.stories.ts:442` | Tier 1-3 | `badge badge--accent` |
| `layout/layout-grid.stories.ts:486` | Modern CSS | `badge badge--warning` |
| `utilities/utilities-spacing-blocks.stories.ts:155` | ${args.dimensionType.toUpperCase()} | `badge badge--accent` |
| `recipes/recipe-tally-sprout.stories.ts:435` | ~18 Days | `badge badge--accent` |
| `recipes/recipe-tally-sprout.stories.ts:666` | ${plot.irrigationZone} | `badge badge--sm badge--accent` |
| `utilities/utilities-responsive-helpers.stories.ts:200` | ${args.containerScoped ? '@container' :  | `badge badge--accent` |
| `utilities/utilities-responsive-helpers.stories.ts:487` | v2.4.0 | `badge badge--accent max-sm:hide` |
| `recipes/recipe-cadence-dashboard.stories.ts:587` | ${item.typeLabel} Stream | `badge badge--sm badge--accent` |
| `recipes/recipe-cadence-dashboard.stories.ts:1196` | ASCAP / BMI | `badge badge--sm` |
| `recipes/recipe-app-header.stories.ts:128` | v2.2 | `badge badge--accent badge--round badge--sm` |
| `recipes/recipe-app-header.stories.ts:585` | v2.2 | `badge badge--accent badge--round badge--sm max-md:hide` |
| `recipes/recipe-command-palette.stories.ts:66` | Component | `badge badge--sm` |
| `recipes/recipe-command-palette.stories.ts:331` | Component | `badge badge--sm` |
| `recipes/recipe-command-palette.stories.ts:341` | Component | `badge badge--sm` |
| `recipes/recipe-command-palette.stories.ts:350` | Component | `badge badge--sm` |
| `recipes/recipe-command-palette.stories.ts:359` | Component | `badge badge--sm` |
| `recipes/recipe-command-palette.stories.ts:368` | Component | `badge badge--sm` |
| `organisms/deck.stories.ts:946` | ANALOG LINE-IN | `badge badge--sm` |
| `docs/components/CodeBlock.astro:28` | {lang.toUpperCase()} | `badge badge--sm badge--subtle` |
| `docs/components/CommandPalette.astro:81` | {item.category} | `badge badge--sm badge--subtle` |
| `docs/components/ComponentHeader.astro:53` | {type} | `badge badge--accent badge--sm` |

## Story captions (99)

Demo labels to move to a Storybook-only class, by file.

| File | Captions |
| --- | ---: |
| `utilities/utilities-responsive-helpers.stories.ts` | 18 |
| `atoms/text.stories.ts` | 14 |
| `molecules/prose.stories.ts` | 12 |
| `utilities/utilities-spacing-blocks.stories.ts` | 11 |
| `organisms/card.stories.ts` | 11 |
| `utilities/utilities-spacing.stories.ts` | 4 |
| `utilities/utilities-border.stories.ts` | 4 |
| `utilities/utilities-typography.stories.ts` | 4 |
| `utilities/utilities-focus-helpers.stories.ts` | 4 |
| `atoms/divider.stories.ts` | 2 |
| `atoms/link.stories.ts` | 2 |
| `atoms/skeleton.stories.ts` | 2 |
| `utilities/utilities-layout-helpers.stories.ts` | 2 |
| `utilities/utilities-flex.stories.ts` | 2 |
| `organisms/tabs.stories.ts` | 2 |
| `organisms/header.stories.ts` | 2 |
| `atoms/skip-link.stories.ts` | 1 |
| `utilities/utilities-color.stories.ts` | 1 |
| `organisms/section.stories.ts` | 1 |

## Per-file breakdown

| File | badge | status | chip | kbd | annotation | other |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| `atoms/divider.stories.ts` |  |  |  |  | 2 |  |
| `atoms/link.stories.ts` |  |  |  |  | 2 |  |
| `atoms/meter.stories.ts` |  | 2 |  |  |  |  |
| `atoms/progress.stories.ts` |  | 1 |  |  |  |  |
| `atoms/skeleton.stories.ts` |  | 1 |  |  | 2 |  |
| `atoms/skip-link.stories.ts` |  |  |  | 2 | 1 | 1 |
| `atoms/tab.stories.ts` | 1 | 3 |  |  |  |  |
| `atoms/text.stories.ts` |  | 1 | 1 |  | 14 |  |
| `atoms/textarea.stories.ts` |  |  | 1 |  |  |  |
| `css/src/organisms/menu.css` |  |  |  | 2 |  |  |
| `docs/components/CodeBlock.astro` |  |  | 1 |  |  |  |
| `docs/components/CommandPalette.astro` |  |  | 1 | 4 |  |  |
| `docs/components/ComponentHeader.astro` |  | 2 | 1 |  |  |  |
| `docs/components/ComponentPlayground.astro` |  | 1 |  | 2 |  |  |
| `docs/components/GuidelineCard.astro` |  | 2 |  |  |  |  |
| `docs/components/Header.astro` |  | 1 |  | 1 |  |  |
| `docs/pages/components/atoms/button.astro` |  | 6 |  | 3 |  |  |
| `docs/pages/components/index.astro` |  | 2 |  |  |  |  |
| `layout/layout-app.stories.ts` |  | 2 |  |  |  |  |
| `layout/layout-cluster.stories.ts` |  | 11 | 23 |  |  |  |
| `layout/layout-grid.stories.ts` |  | 9 | 2 |  |  |  |
| `layout/layout-inline.stories.ts` |  | 18 | 1 |  |  |  |
| `layout/layout-sidebar.stories.ts` | 1 | 14 | 3 |  |  |  |
| `layout/layout-split.stories.ts` |  | 2 |  |  |  |  |
| `layout/layout-stack.stories.ts` |  | 1 | 3 |  |  | 3 |
| `molecules/alert.stories.ts` |  |  |  | 1 |  |  |
| `molecules/batch-actions.stories.ts` | 5 | 2 |  |  |  |  |
| `molecules/lockup.stories.ts` |  | 2 |  |  |  |  |
| `molecules/navigation-tree.stories.ts` | 1 | 3 | 1 |  |  |  |
| `molecules/popover.stories.ts` | 1 | 1 | 1 | 4 |  |  |
| `molecules/prose.stories.ts` |  |  |  | 7 | 12 |  |
| `molecules/tab-list.stories.ts` | 1 | 2 | 1 |  |  |  |
| `molecules/telemetry.stories.ts` |  | 3 |  |  |  |  |
| `molecules/tooltip.stories.ts` |  | 1 |  | 1 |  |  |
| `organisms/card.stories.ts` |  | 6 | 1 |  | 11 |  |
| `organisms/combobox.stories.ts` |  |  | 5 |  |  |  |
| `organisms/deck.stories.ts` |  | 18 | 8 |  |  |  |
| `organisms/dialog.stories.ts` |  |  |  | 1 |  |  |
| `organisms/empty-state.stories.ts` |  | 1 |  |  |  |  |
| `organisms/header.stories.ts` |  | 2 |  |  | 2 | 3 |
| `organisms/menu.stories.ts` | 1 |  |  | 14 |  |  |
| `organisms/section.stories.ts` |  |  |  |  | 1 |  |
| `organisms/table.stories.ts` |  | 10 | 2 |  |  |  |
| `organisms/tabs.stories.ts` | 5 | 4 | 1 |  | 2 |  |
| `recipes/recipe-app-header.stories.ts` | 4 |  | 2 | 14 |  |  |
| `recipes/recipe-cadence-dashboard.stories.ts` | 3 | 10 | 5 |  |  |  |
| `recipes/recipe-command-palette.stories.ts` |  |  | 8 | 17 |  |  |
| `recipes/recipe-filter-sidebar.stories.ts` |  | 8 | 14 |  |  |  |
| `recipes/recipe-tally-sprout.stories.ts` | 2 | 12 | 5 |  |  |  |
| `utilities/utilities-border.stories.ts` |  |  |  |  | 4 |  |
| `utilities/utilities-color.stories.ts` |  | 1 |  |  | 1 |  |
| `utilities/utilities-flex.stories.ts` |  | 1 | 3 |  | 2 |  |
| `utilities/utilities-focus-helpers.stories.ts` |  | 1 |  | 5 | 4 |  |
| `utilities/utilities-layout-helpers.stories.ts` |  |  |  |  | 2 |  |
| `utilities/utilities-responsive-helpers.stories.ts` |  | 3 | 2 |  | 18 |  |
| `utilities/utilities-spacing-blocks.stories.ts` |  | 1 | 1 |  | 11 |  |
| `utilities/utilities-spacing.stories.ts` |  | 1 |  |  | 4 |  |
| `utilities/utilities-typography.stories.ts` |  |  |  |  | 4 |  |
