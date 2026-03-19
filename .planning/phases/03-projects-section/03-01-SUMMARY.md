---
phase: 03-projects-section
plan: "01"
subsystem: ui
tags: [next.js, react, typescript, tailwindcss, lucide-react, next-image, vitest]

# Dependency graph
requires:
  - phase: 02-core-sections
    provides: Card, Button, UnderLine components; PROJECTS constant; Project type from types.ts
provides:
  - BrowserFrame: CSS-only browser chrome decoration for web projects
  - PhoneFrame: CSS-only phone bezel decoration for mobile projects
  - ScreenshotPlaceholder: gradient + initials fallback when screenshot is missing
  - ProjectCard: grid card component for PROJECTS[1..5]
  - FeaturedProjectCard: full-width featured variant for PROJECTS[0] (Buildable)
  - ProjectsSection: section root exported default from projectsSection.tsx
affects: [03-02-PLAN (wires ProjectsSection into page.tsx), phase-04-animations (scroll-reveal targets)]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - TDD with vitest — RED (failing import) → GREEN (implementation) → REFACTOR (lint fix)
    - Co-located sub-components pattern: all device frames + cards + section root in one file
    - Conditional device frame rendering via project.type === 'web' ? BrowserFrame : PhoneFrame
    - onError state swap for screenshot placeholder (requires 'use client' at file level)
    - ActionLinks rendered conditionally — omitted entirely when no liveUrl/githubUrl

key-files:
  created:
    - app/ui/homepage/projectsSection.tsx
    - tests/projects.test.tsx
  modified: []

key-decisions:
  - "'use client' at file level (not sub-component level) — co-located components in one file require single client boundary"
  - "ActionLinks component omits projectTitle prop — only liveUrl/githubUrl needed for rendering"
  - "Project title shown in BrowserFrame URL bar from projectTitle prop — produces multiple text matches in tests requiring getAllByText"

patterns-established:
  - "Device frame conditional: project.type === 'web' ? <BrowserFrame> : <PhoneFrame>"
  - "Screenshot fallback: useState(false) + onError={() => setImgError(true)} + conditional ScreenshotPlaceholder"
  - "Action links guard: if (!liveUrl && !githubUrl) return null — no disabled buttons rendered"
  - "Responsive screenshot height via Tailwind classes (h-60 md:h-[400px]) not inline style"

requirements-completed: [PROJ-01, PROJ-02, PROJ-03, PROJ-04, PROJ-05]

# Metrics
duration: 4min
completed: 2026-03-19
---

# Phase 3 Plan 01: Projects Section Component Summary

**CSS-only BrowserFrame + PhoneFrame device decorations with onError screenshot placeholder swap, FeaturedProjectCard (Buildable) and 5 grid ProjectCards driven entirely from PROJECTS constant**

## Performance

- **Duration:** 4 min
- **Started:** 2026-03-19T09:44:57Z
- **Completed:** 2026-03-19T09:49:00Z
- **Tasks:** 1 (TDD: RED + GREEN + REFACTOR)
- **Files modified:** 2

## Accomplishments

- Built `projectsSection.tsx` with 5 co-located sub-components: BrowserFrame, PhoneFrame, ScreenshotPlaceholder, ProjectCard, FeaturedProjectCard
- All 6 projects rendered data-driven from PROJECTS constant — no hardcoded strings
- TDD: 13 passing tests covering PROJ-01 through PROJ-05 acceptance criteria
- TypeScript clean (`bunx tsc --noEmit` zero errors); ESLint clean (zero warnings)

## Task Commits

1. **RED phase: failing tests** - `dc3d19f` (test)
2. **GREEN phase: implementation** - `bfe7c4e` (feat)
3. **REFACTOR: lint fix** - `057008f` (refactor)

## Files Created/Modified

- `app/ui/homepage/projectsSection.tsx` — ProjectsSection (default), BrowserFrame, PhoneFrame, ScreenshotPlaceholder, ProjectCard, FeaturedProjectCard
- `tests/projects.test.tsx` — 13 tests covering PROJ-01 through PROJ-05 requirements

## Decisions Made

- `'use client'` at file level: all sub-components co-located in one file, so a single client boundary covers the entire module. ProjectsSection itself acts as section root but the onError state requirements pull the file into client territory.
- `ActionLinks` component receives only `liveUrl` and `githubUrl` — `projectTitle` was included in original interface but unused in render; removed to eliminate ESLint unused-vars warning.
- Tests use `getAllByText` for project titles because the BrowserFrame URL bar also renders the project title, creating multiple matches for `getByText`.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 2 - Clean Code] Removed unused projectTitle prop from ActionLinks**
- **Found during:** Task 1 (GREEN phase implementation)
- **Issue:** `projectTitle` prop was defined in ActionLinks interface but never used in the component body — ESLint reported unused-vars warning
- **Fix:** Removed the prop from the interface and all call sites
- **Files modified:** `app/ui/homepage/projectsSection.tsx`
- **Verification:** `eslint .` reports zero warnings after fix
- **Committed in:** `057008f` (REFACTOR commit)

---

**Total deviations:** 1 auto-fixed (Rule 2 - clean code)
**Impact on plan:** Trivial fix. No scope change, no behavior change. ActionLinks has no use for projectTitle since it only renders href links.

## Issues Encountered

- Test assertions for project titles required `getAllByText` instead of `getByText` because the BrowserFrame URL bar renders the project title as a second text match. Tests updated to use `getAllByText` in the RED→GREEN iteration.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- `ProjectsSection` is ready to be imported into `app/page.tsx` in Plan 02
- Screenshots in `public/projects/*.webp` are not yet created (STATE.md blocker); ScreenshotPlaceholder fallback activates automatically via onError when images are absent
- Plan 02 wires ProjectsSection after ExperienceSection in page.tsx

## Self-Check: PASSED

- FOUND: app/ui/homepage/projectsSection.tsx
- FOUND: tests/projects.test.tsx
- FOUND: .planning/phases/03-projects-section/03-01-SUMMARY.md
- FOUND: commit dc3d19f (test RED phase)
- FOUND: commit bfe7c4e (feat GREEN phase)
- FOUND: commit 057008f (refactor lint fix)

---
*Phase: 03-projects-section*
*Completed: 2026-03-19*
