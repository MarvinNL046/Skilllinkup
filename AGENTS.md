<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## SEO reference workflow

For SEO strategy, internal linking, content intent and SEO-related CTA work, consult the user's Obsidian SEO vault before making assumptions, especially when uncertain. Locate the active vault through the local Obsidian configuration rather than assuming a machine-specific path.

Start with `SEO/00 SEO Playbook (index).md` and read the relevant notes, especially `19 TOFU MOFU BOFU - funnel page types.md`, `21 Internal linking - hub and spoke.md` and `13 On-page SEO checklist (80+ items).md`. State which notes informed meaningful changes. Treat the notes as reference material; verify uncertain or time-sensitive search-engine requirements against current official documentation. Preserve established English search intent and recovered URLs unless the task explicitly changes them.

## Shared actions

Use `Button` from `src/components/ui/button.tsx` for action buttons and `Button asChild` around navigation links styled as buttons. Use its `variant` and `size` props; do not add page-specific button colors, borders, shadows, font styles or hover overrides. Page CSS may control placement and width. `WaitlistButton` and `ContactButton` compose this shared component and expose variants for their callers.

Primary background, hover and label colors live only in the `--action-*` tokens in `src/styles/tokens.css`. Use `--action-link-text` for readable action links on white surfaces, not the lighter button background. Clerk and remaining legacy template controls use adapters to those same tokens. Keep real review/favorite stars; avoid decorative sparkles in the interface.
