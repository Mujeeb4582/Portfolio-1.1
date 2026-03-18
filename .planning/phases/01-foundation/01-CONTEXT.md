# Phase 1: Foundation - Context

**Gathered:** 2026-03-18
**Status:** Ready for planning

<domain>
## Phase Boundary

Upgrade the existing Next.js 15 / React 18 / Tailwind v3 portfolio to Next.js 16 + React 19 + Tailwind v4 + shadcn/ui v4. Migrate package manager from pnpm to bun. Resolve all migration pitfalls (dark mode, config format, async APIs). Remove dead code and unused assets. Expand `constant.ts` with all portfolio content (projects, experience, skills, personal info) backed by TypeScript interfaces. Dark mode toggle must work with system preference detection across three themes (light, dark, midnight_steel).

</domain>

<decisions>
## Implementation Decisions

### Design Tokens
- Keep existing cyan brand color (#12F7D6) as primary accent
- Keep brand2 (#98FAEC) as secondary accent
- Keep three themes: light, dark, midnight_steel (default)
- System preference auto-detection with manual toggle
- Standard rounded border radius (0.5rem) — uncomment and wire `--radius` CSS variable
- Migrate all CSS variables and custom colors from `tailwind.config.ts` to Tailwind v4 `@theme {}` directives in `globals.css`

### Font Choices
- Switch from Ubuntu + IBM Plex Mono to **Inter + JetBrains Mono**
- Inter: headings, body text, UI elements (via Google Fonts or `next/font`)
- JetBrains Mono: code snippets, tech badges, monospace accents
- Remove unused Geist fonts (GeistVF.woff, GeistMonoVF.woff) from `app/fonts/`
- Update Tailwind font scale tokens to use new font families

### Data Structure
- All portfolio content lives in `app/lib/constant.ts`
- TypeScript interfaces in `app/lib/types.ts`
- Project interface must include: title, description, techStack (string[]), screenshot path, role, company, type ('web' | 'mobile'), liveUrl?, githubUrl?, caseStudyUrl?
- Experience interface: company, role, dateRange, location ('Remote'), responsibilities (string[]), projects (ProjectReference[])
- Skills organized by category: Frontend, Backend, Mobile, LLM/AI, Tools — each with icon and proficiency
- Personal info: name, title, email, whatsApp, github, linkedIn, bio, stats
- 6 featured projects: Buildable, MISA App, Uber-like App, Re-View, LSTN, WellShared
- Projects visually distinguish web vs mobile using device frames (browser frame for web, phone frame for mobile)
- Each project card shows: title, description, tech stack badges, screenshot, role + company
- Project links: live demo, GitHub repo, case study (all optional per project)

### Package Manager Migration
- Clean break: delete `node_modules/` and `pnpm-lock.yaml`, run `bun install` fresh
- Update all `package.json` scripts to use bun-compatible commands
- Remove `pnpm` references from Husky hooks and CI configs

### Git Hooks
- Claude's Discretion: Choose between Husky v9 or simple-git-hooks — whichever integrates best with bun
- Pre-commit should run: lint check + TypeScript type check
- Update hook commands from `pnpm run` to `bun run`

### Claude's Discretion
- ESLint migration strategy (flat config vs staying on v8 compatibility)
- Exact Tailwind v4 migration approach (manual vs `@tailwindcss/upgrade` CLI)
- Whether to keep `tailwindcss-animate` or switch to `tw-animate-css` for shadcn v4
- Hook solution choice (Husky v9 vs simple-git-hooks)
- Inter font loading strategy (Google Fonts vs bundled via `next/font/google`)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Existing Codebase
- `.planning/codebase/STACK.md` — Current tech stack with exact versions and configuration
- `.planning/codebase/CONCERNS.md` — All known issues to fix during foundation (dead code, unused fonts, broken links, ESLint format)
- `.planning/codebase/ARCHITECTURE.md` — Current component structure and data flow

### Research
- `.planning/research/STACK.md` — Recommended 2025/2026 stack with versions and migration notes
- `.planning/research/PITFALLS.md` — Critical migration pitfalls (Tailwind v4 config, Next.js 16 async APIs, dark mode breakage)
- `.planning/research/SUMMARY.md` — Synthesized research findings

### Project Context
- `.planning/PROJECT.md` — Full project context with personal details, skills, experience, featured projects
- `.planning/REQUIREMENTS.md` — Phase 1 requirements: FOUND-01 through FOUND-09 + NAV-04

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `app/lib/utils.ts`: `cn()` helper for Tailwind class merging — keep and update for Tailwind v4
- `app/ui/theme/clientThemeProvider.tsx`: Theme provider wrapper with hydration fix — update for new themes
- `app/ui/theme/theme-toggle.tsx`: Theme switcher dropdown — update icons and theme list
- `app/lib/constant.ts`: Current data source — expand significantly with all portfolio content

### Established Patterns
- shadcn/ui component pattern: components in `app/ui/`, Radix primitives underneath
- CSS variables for theming in `globals.css`
- `next-themes` for dark mode — needs `@custom-variant` update for Tailwind v4
- Single-page layout: `app/page.tsx` composites sections from `app/ui/homepage/`

### Integration Points
- `app/layout.tsx`: Font imports, theme provider, metadata — major changes needed
- `tailwind.config.ts`: Entire config migrates to CSS `@theme {}` — file may be deleted
- `postcss.config.mjs`: Plugin changes from `tailwindcss` to `@tailwindcss/postcss`
- `package.json`: All dependency versions and scripts change
- `.eslintrc.json`: May need migration to `eslint.config.js` flat config

</code_context>

<specifics>
## Specific Ideas

- Minimal & clean style inspired by Brittany Chiang's portfolio
- Cyan (#12F7D6) brand accent is a key identity element — must be preserved
- Inter font was specifically chosen for its industry-standard, modern UI feel
- Device frames for project screenshots (browser frame for web, phone frame for mobile)
- Bun as package manager is a firm requirement — no npm/pnpm

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 01-foundation*
*Context gathered: 2026-03-18*
