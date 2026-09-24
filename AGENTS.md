# AGENTS.md: Design For Humans Component Library

## Project Context
This project is an accessible, modern, token-driven UI component library combining Web Standards, Figma, and AI-agent workflows.

## Baseline Browser Target
- **Target:** Baseline Widely Available (interoperable across all major engines for 30+ months).
- Modern CSS features (CSS Anchor Positioning, Popover API, native `<dialog>`, container queries) are fully supported and preferred over legacy JavaScript workarounds.

## Mandatory Rules for Component Creation
1. **Never use legacy hacks:** Do not build custom JS popovers, manual height-animating accordion scripts, or untyped clickable divs. Rely on native browser primitives.
2. **Token Compliance:** All colors, spacing, and typography must map to variables defined in `packages/css/src/variables.css`.
3. **Accessibility First:** Every component must include proper ARIA attributes, explicit keyboard handlers, and visible, high-contrast focus rings.