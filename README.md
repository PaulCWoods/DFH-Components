# Design For Humans Components

An accessible, token-driven CSS component library: native HTML, cascade layers, container queries and no JavaScript. Every theme is built from one file and checked before it ships: contrast in light, dark and high contrast, the type scale, and target sizes.

**Docs:** [components.designforhumans.blog](https://components.designforhumans.blog/)

## Use it

Link the published stylesheet (and a theme's stylesheet after it, if you use one), then write native HTML with the library's classes:

```html
<link rel="stylesheet" href="https://components.designforhumans.blog/css/0.5.3/dfh-components.css">
<button type="button" class="button button--strong button--accent">Save changes</button>
```

[Start](https://components.designforhumans.blog/docs/start/) covers the icons, themes and your own styles.

## What's here

| Folder | What it is |
| :--- | :--- |
| `packages/css` | The library: atoms, molecules, organisms, layout and utilities, in cascade layers |
| `packages/theme-engine` | Builds a theme into tokens and runs the gates; the theme format and sub-brands |
| `tokens/` | The themes and the three token tiers they build |
| `packages/docs` | The docs site (Astro) |
| `packages/storybook` | Every component, variant and state, with axe on each story |
| `.agents/skills` | Skills for AI agents: the shared ones ship with each release |

## Work on it

```sh
npm install
npm run storybook        # http://localhost:6006
npm run docs             # http://localhost:4321
npm run build:themes     # build and check every theme
npm run test:theme       # the theme engine's tests
```

`AGENTS.md` has every command, the gates and the rules for changing the library. `docs/PRINCIPLES.md` outranks it.

## Licence

MIT, © 2026 Paul Charles Woods: see `LICENSE`. The third-party `modern-web-guidance` skill keeps its Apache 2.0 licence, in its folder. [What's free](https://components.designforhumans.blog/docs/start/free/) explains what's free and what's planned.
