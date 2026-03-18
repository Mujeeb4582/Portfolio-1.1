# Phase 2: Core Sections - Context

**Gathered:** 2026-03-18
**Status:** Ready for planning

<domain>
## Phase Boundary

Build the Hero, About, Skills, and Experience sections with real portfolio content from `constant.ts`. Each section is a self-contained component rendered in `app/page.tsx`. Existing section components (`heroSection.tsx`, `aboutSection.tsx`, `skillsSection.tsx`) will be rebuilt; `experienceSection.tsx` is new. All content comes from typed constants — no hardcoded strings in components.

</domain>

<decisions>
## Implementation Decisions

### Hero Section
- Split layout: text content on the left, professional photo on the right
- Left side contains: greeting, name, title ("Full-Stack Web Developer"), tagline, CTA buttons, social links row
- Professional photo displayed as a rounded rectangle with a subtle cyan border/glow
- Social links (GitHub, LinkedIn, Email, WhatsApp) displayed as an icon row below the CTA buttons
- Photo uses `/profile.jpg` (already exists in public/)

### Hero CTAs
- Claude's Discretion: CTA button styling (solid vs outlined, color choices) — pick what fits the overall design best
- Two buttons: "Contact Me" (primary) and "Download CV" (secondary)
- Download CV must serve an actual PDF file

### Skills Section
- Category cards with icon grid layout: one card per category (Frontend, Backend, Mobile, LLM/AI, Tools)
- Each card shows category name as heading with a grid of technology icons + names inside
- Brand logos for technology icons (devicon or simple-icons library, e.g., `react-icons/si` or `@iconify/react`)
- No proficiency levels shown — just the skill name and icon
- Responsive grid: 3 columns on desktop, 2 on tablet, 1 on mobile
- Reuse existing Card component from shadcn/ui

### Experience Section
- Vertical timeline layout with connected line and dots on the left, content cards on the right
- Shows career progression: Wonder Crafts, Techiosis, RGX Labs, Microverse (work experience)
- Plus education: Microverse, NUCES-FAST
- Claude's Discretion: detail level per entry (full details vs summary with expand)
- Claude's Discretion: education placement (same timeline or separate subsection)
- Claude's Discretion: timeline visual decoration style (minimal line + dots vs styled with icons)

### About Section
- No photo in the About section (photo is already in hero — avoid duplication)
- Professional bio text with key stats
- Claude's Discretion: layout structure (split, stacked, or other arrangement)
- Claude's Discretion: stats display style (stat cards, inline, or other)
- Stats to show: years of experience, projects completed, technologies mastered

### Claude's Discretion
- CTA button styling and color choices
- Experience detail level and education placement
- Timeline visual decoration
- About section layout and stats presentation
- Section spacing and padding
- Section heading styles (consistent across all four sections)
- Responsive breakpoints and mobile adaptations

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Existing Codebase
- `.planning/codebase/ARCHITECTURE.md` — Component structure, data flow, section composition pattern
- `.planning/codebase/STACK.md` — Current tech stack and configuration
- `.planning/codebase/CONCERNS.md` — Known issues and code quality notes

### Phase 1 Context (carry-forward decisions)
- `.planning/phases/01-foundation/01-CONTEXT.md` — Design tokens (cyan #12F7D6, Inter + JetBrains Mono, three themes), data structure decisions, Brittany Chiang inspiration

### Data Layer (built in Phase 1)
- `app/lib/types.ts` — TypeScript interfaces for Project, Experience, Skill, PersonalInfo, etc.
- `app/lib/constant.ts` — All portfolio data: PERSONAL_INFO, PROJECTS, EXPERIENCE, EDUCATION, SKILLS, NAV_LINKS

### Project Context
- `.planning/PROJECT.md` — Full project context with personal details
- `.planning/REQUIREMENTS.md` — Phase 2 requirements: HERO-01 to HERO-05, ABOUT-01 to ABOUT-03, SKILL-01 to SKILL-03, EXP-01 to EXP-04

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `app/ui/card.tsx`: shadcn Card component — use for skill category cards and experience entries
- `app/ui/button.tsx`: shadcn Button with variants — use for CTA buttons
- `app/ui/avatar.tsx`: shadcn Avatar — could use for hero photo
- `app/lib/utils.ts`: `cn()` helper for Tailwind class merging
- `app/ui/underLine.tsx`: Decorative underline component — available for section headings

### Established Patterns
- Server Components by default; `'use client'` only for interactive elements
- Single-page layout: `app/page.tsx` composes sections from `app/ui/homepage/`
- Static data imported from `app/lib/constant.ts` — no API calls
- Tailwind v4 CSS-first config with `@theme {}` tokens in `globals.css`
- Three themes: light, dark, midnight_steel — all using CSS custom properties

### Integration Points
- `app/page.tsx`: Add ExperienceSection import and render in section order
- `app/ui/homepage/`: All section components live here
- `app/lib/constant.ts`: PERSONAL_INFO, PROJECTS, EXPERIENCE, EDUCATION, SKILLS are the data sources
- `app/globals.css`: Theme tokens for brand colors (#12F7D6, #98FAEC) and fonts (Inter, JetBrains Mono)

</code_context>

<specifics>
## Specific Ideas

- Minimal & clean style inspired by Brittany Chiang's portfolio (carried from Phase 1)
- Cyan (#12F7D6) brand accent is a key identity element — use for timeline dots, card borders, CTA highlights
- Inter for all text, JetBrains Mono for tech badges and code-like elements
- Brand technology logos (not generic Lucide icons) for skill items — makes the skills section visually rich and recognizable

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 02-core-sections*
*Context gathered: 2026-03-18*
