# Agent skills

Each folder is one skill: a `SKILL.md` with a name and a description that says when to load it. `.claude/skills/` links to each one for Claude Code.

There are two audiences.

**Shared skills** are for agents building products with the library, in any project. They stand alone. They link to the docs site (components.designforhumans.blog), never to files in this repo, and will ship with the library.

| Skill | For |
| :--- | :--- |
| `accessibility` | Accessible markup and CSS with the library: native elements, names, forms, targets, focus, contrast and preferences |
| `tokens` | Using and customising tokens: the roles to build with, component tokens, themes, sizing modes and fallbacks |

**Repo skills** are for agents maintaining the library itself. They may point at repo files, scripts and `AGENTS.md`.

| Skill | For |
| :--- | :--- |
| `component-authoring` | Writing the library's component CSS and running a component pass |
| `token-pipeline` | Theme files, the generators and their gates, Tier 3 defaults, the Figma export |
| `css-commenting` | Comment banners and grouping in the library's CSS |
| `recipe-composition` | Composing recipes from library components |
| `modern-web-guidance` | Current web platform guidance (third-party) |
