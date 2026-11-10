# Agent skills

Each folder is one skill: a `SKILL.md` with a name and a description that says when to load it. `.claude/skills/` links to each one for Claude Code.

There are two audiences.

**Shared skills** are for agents building products with the library, in any project. They stand alone. They link to the docs site (components.designforhumans.blog), never to files in this repo. `npm run build:skills` publishes them with each release at `components.designforhumans.blog/skills/<version>/`, and fails if one points into the repo; the docs page `start/skills.mdx` says how to add them to a project.

| Skill | For |
| :--- | :--- |
| `accessibility` | Accessible markup and CSS with the library: native elements, names, forms, targets, focus, contrast and preferences |
| `tokens` | Using and customising tokens: the roles to build with, component tokens, themes, sizing modes and fallbacks |
| `composition` | Composing screens: which component fits, options before CSS, layout primitives, text atoms, density, narrow screens and states |
| `ui-guidance` | Interface copy and interaction choices: Buttons and links, forms, feedback, dialogs or pages, navigation, tables |
| `design-principles` | Grouping, hierarchy, interaction laws and usability heuristics, each tied to what the library does about it |
| `site-css` | A product's own CSS beside the library: when to write any, layers, selectors, Tier 2 values, its own tokens, comments and formatting |

**Repo skills** are for agents maintaining the library itself. They may point at repo files, scripts and `AGENTS.md`.

| Skill | For |
| :--- | :--- |
| `component-authoring` | Writing the library's component CSS and running a component pass |
| `token-pipeline` | Theme files, the generators and their gates, Tier 3 defaults, the Figma export |
| `css-commenting` | Comments and formatting in the library's CSS |
| `recipe-composition` | The library's recipe stories and Real World pages |
| `docs-style` | How the docs are written: voice, names, component page structure, examples and links |
| `figma` | The Figma library file: pages, naming, variables and their sync, Plugin API quirks |
| `modern-web-guidance` | Current web platform guidance (third-party) |
