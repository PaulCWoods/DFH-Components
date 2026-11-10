---
name: design-principles
description: |
  Visual and interaction design principles applied with Design For Humans: Gestalt grouping (proximity, similarity, common region, continuity, figure and ground), hierarchy and emphasis, usability heuristics, and laws such as Fitts's, Hick's and Jakob's, each tied to what the library already does about it.

  Trigger immediately for:
  - Laying out or critiquing a screen: grouping, hierarchy, alignment, emphasis, white space.
  - Deciding how many options, actions or steps to show.
  - Reviewing a design for usability before building it.
  - Explaining why a layout or interaction works or doesn't.
---

<!-- Design For Humans Components 0.5.2. Updates: https://components.designforhumans.blog/docs/start/skills/ -->

# Design principles

Structure comes first from type, space and alignment, and only then from borders and backgrounds. A box is a tool for a specific job, not a default. These principles say why, and which library mechanism applies each one. For which component to use, load the `composition` skill; for words, the `ui-guidance` skill.

## 1. Grouping (Gestalt)

| Principle | What people perceive | Apply it with |
| :--- | :--- | :--- |
| **Proximity** | Things close together belong together | Gaps from the layout primitives: tighter inside a group (`.stack` with a small gap), wider between groups. Never equal spacing everywhere. |
| **Similarity** | Things that look alike do alike | One look per meaning: every danger action is `--danger`, every Status of one kind looks the same. Don't style two different things alike, or one thing two ways. |
| **Common region** | Things inside a boundary belong together | A Card, a Fieldset or a tinted band, used when proximity isn't enough. Prefer space first; a box is the second tool. |
| **Uniform connectedness** | Joined things are one thing | `.button-group--joined` for one control made of several Buttons; a Stepper's track for steps in order. |
| **Continuity** | The eye follows lines and edges | Align to shared edges: the Wrapper's gutter, the app's landmark padding, a Split's columns. Don't break an edge for decoration. |
| **Figure and ground** | One layer is in front | Elevation from prominence and shadow (`--strong`, `--shadow-md`); a Dialog's backdrop sends the page back. Keep it to two or three layers. |
| **Closure** | People complete partial shapes | A rule or a tint can mark a group with no full border; use `.divider` or `--subtle` over another box. |

## 2. Hierarchy and emphasis

- **One focal point per area:** one heading at the top of the scale, and one strong Button. The **Von Restorff effect** says the different thing is remembered, so spend emphasis on one thing only.
- **Hierarchy from type before colour:** the text atoms give size and weight steps (`.title` → `.heading` → `.small-heading` → `.text` → `.small-text`). Muted text (`.text-muted`) for what's secondary.
- **Prominence is the emphasis axis:**
  - `--strong` draws the eye;
  - the default holds its place;
  - `--subtle` and `--plain` step back.

  Most things should be default or quieter.
- **White space is not waste.** It groups, separates and lets the focal point stand out. Use the fluid roles (`--spacing-breathe`, `--spacing-cushion`) between sections.
- **Line length** for reading stays within roughly 45 to 75 characters (`--body-measure`, Prose).
- **Aesthetic-usability effect:** people forgive a pleasant interface more, so polish matters, but never at the cost of clarity or contrast.

## 3. Laws of interaction

| Law | What it says | Apply it with |
| :--- | :--- | :--- |
| **Fitts's law** | Bigger, closer targets are faster to hit | 48px targets by default; main actions near where attention already is; the drawn control is the whole target. |
| **Hick's law** | More choices take longer | Show the few likely options, and put the rest in a Menu, a Combobox or "More". Use defaults. Progressive disclosure with an Accordion or a Popover. |
| **Jakob's law** | People expect your product to work like the others they use | Conventional placements: the logo links home, search sits in the Header, the main action comes last, close is at the top end. Native elements behave as people expect. |
| **Miller's law** | Working memory holds only a few things | Chunk long numbers and lists, group fields in Fieldsets, and never make people remember something from a previous screen. |
| **Tesler's law** | Complexity can't vanish, only move | Move it to the system: smart defaults, `autocomplete`, formatting input for people rather than rejecting it. |
| **Doherty threshold** | Responses under about 400ms keep people in flow | Instant feedback (pressed states), Skeletons for loading, optimistic updates with undo. |
| **Serial position effect** | First and last items are remembered best | Put the most important navigation items at the ends, and key actions first or last. |
| **Goal-gradient effect** | Effort rises as the goal nears | Show progress in multi-step flows (Stepper, Progress), and keep the last steps short. |
| **Peak-end rule** | Experiences are judged by their peak and their end | Make the end of a flow clear and calm: a confirmation that says what happened and what's next. |
| **Postel's law** | Be liberal in what you accept | Accept "3 nov", "03/11" and "3 November", and spaces in card numbers; never reject a format you could understand. |

## 4. Usability heuristics (Nielsen)

Use these when reviewing a screen:

1. **Visibility of system status:** every action gets feedback; loading, saving and errors are announced (`role="status"`).
2. **Match the real world:** people's words, not the system's; a familiar order.
3. **User control and freedom:** undo, cancel, back. Dialogs close with Escape. Nothing is a dead end.
4. **Consistency and standards:** one look per meaning, conventional placements, native behaviour.
5. **Error prevention:** sensible defaults, constraints in the input type, confirmation only for what can't be undone.
6. **Recognition over recall:** show options rather than make people remember them; keep context visible.
7. **Flexibility and efficiency:** shortcuts (`.kbd` to show them), bulk actions (Batch Actions), and density for experts (`.ui-compact`).
8. **Aesthetic and minimalist design:** no decoration without information. Chrome appears when needed and collapses first.
9. **Help people recognise and recover from errors:** plain words, the cause, the fix, next to the problem.
10. **Help and documentation:** hints in the interface (`.field__hint`) before a help page.

## 5. When principles pull apart

- **Accessibility wins every conflict.**
- **A box versus a boundary:** remove the box, keep the boundary. Use a rule, tint or underline at 3:1.
- **Minimal versus clear:** icon-only only where meaning is obvious, and always with a name.
- **Novel versus predictable:** a new pattern must pass keyboard, zoom, reflow and forced colours, and never move content unexpectedly. When in doubt, use the convention.
- **Dense versus comfortable:** density is the product's choice for its users (`.ui-compact`, `fine:ui-compact`). It never shrinks hit areas on touch.
