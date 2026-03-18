# Phase 3: Projects Section - Context

**Gathered:** 2026-03-19
**Status:** Ready for planning

<domain>
## Phase Boundary

Display all 6 featured projects (Buildable, MISA App, Uber-like App, Re-View, LSTN, WellShared) in a browsable section with screenshots, tech stack badges, action links, and visual distinction between web and mobile projects. All data comes from `PROJECTS` array in `constant.ts`. This is a new section component (`projectsSection.tsx`) wired into `app/page.tsx`.

</domain>

<decisions>
## Implementation Decisions

### Project Card Layout
- Image/screenshot at the top of each card, content below
- Full info visible without interaction: title, description (2-3 lines), tech stack badges, role + company, action links
- Tech stack displayed as pill badges in JetBrains Mono (monospace font)
- Reuse shadcn Card component
- Claude's Discretion: action link presentation style (icon+text buttons vs icon-only with aria-labels)

### Grid & Browsing Pattern
- Featured + grid layout: first project (Buildable) displayed large/featured at the top, remaining 5 in a 2-column grid below
- All 6 projects visible at once — no pagination or load more
- Responsive: 2 columns desktop, 1 column mobile for the grid portion
- Featured project takes full width

### Web vs Mobile Distinction
- CSS-only device frames (no image assets needed):
  - Web projects: browser chrome decoration (colored dots + URL bar) above the screenshot
  - Mobile projects: phone bezel decoration (notch + rounded corners) around the screenshot
- Project `type` field ('web' | 'mobile') from `constant.ts` determines which frame to render

### Screenshot Handling
- Screenshots referenced via `screenshotPath` field in each Project object
- Claude's Discretion: placeholder strategy for missing screenshots (gradient+initials, generic placeholder, or other)
- Claude's Discretion: hover effects on card images (subtle scale, overlay, or none)

### Claude's Discretion
- Action link presentation (icon+text vs icon-only)
- Screenshot placeholder design
- Card hover effects
- Featured card layout details (how it differs from grid cards)
- Section heading style (consistent with Phase 2 pattern: h2 + UnderLine)
- Card border/shadow styling for each theme

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Data Layer (built in Phase 1)
- `app/lib/types.ts` — Project interface: title, description, techStack, screenshotPath, role, company, type ('web'|'mobile'), liveUrl?, githubUrl?, caseStudyUrl?
- `app/lib/constant.ts` — PROJECTS array with all 6 projects and their data

### Existing Codebase
- `.planning/codebase/ARCHITECTURE.md` — Component structure, section composition pattern
- `.planning/codebase/STACK.md` — Current tech stack

### Prior Phase Context
- `.planning/phases/01-foundation/01-CONTEXT.md` — Design tokens, font decisions, device frame requirement, Brittany Chiang inspiration
- `.planning/phases/02-core-sections/02-CONTEXT.md` — Section patterns, shadcn Card usage, section heading style (h2 + UnderLine)
- `.planning/phases/02-core-sections/02-UI-SPEC.md` — Typography tokens, color system, spacing scale

### Project Context
- `.planning/REQUIREMENTS.md` — Phase 3 requirements: PROJ-01 to PROJ-05

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `app/ui/card.tsx`: shadcn Card component — use for project cards
- `app/ui/button.tsx`: shadcn Button — use for action links
- `app/ui/underLine.tsx`: Decorative underline for section heading
- `app/lib/utils.ts`: `cn()` helper for class merging
- `app/lib/constant.ts`: PROJECTS array already populated with all 6 projects

### Established Patterns
- Server Components by default; no `'use client'` for static display
- Section composition: `app/page.tsx` imports sections from `app/ui/homepage/`
- Section heading: `<h2>` + `<UnderLine />` centered (established in Phase 2)
- Data from constants — no hardcoded strings
- Typography: Inter for headings/body, JetBrains Mono for code/badges
- Brand colors: #12F7D6 (primary accent), #98FAEC (secondary)

### Integration Points
- `app/page.tsx`: Add ProjectsSection import after ExperienceSection
- `app/ui/homepage/projectsSection.tsx`: New file
- `app/lib/constant.ts`: `PROJECTS` is the data source (already has 6 entries with type field)

</code_context>

<specifics>
## Specific Ideas

- Brittany Chiang inspired — clean, minimal project presentation
- Cyan accent for card borders/highlights on hover
- JetBrains Mono for tech stack pill badges — ties back to the skills section aesthetic
- CSS-only device frames are lightweight and theme-aware (no image assets to manage)
- Featured project (Buildable) should feel visually prominent — perhaps larger screenshot, more description space

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 03-projects-section*
*Context gathered: 2026-03-19*
