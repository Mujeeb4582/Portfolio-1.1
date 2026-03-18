---
phase: 02-core-sections
plan: 05
subsystem: ui
tags: [react, nextjs, tailwind, timeline, experience, education]

# Dependency graph
requires:
  - phase: 02-core-sections
    provides: heroSection, aboutSection, skillsSection, constants (EXPERIENCE, EDUCATION), types
provides:
  - ExperienceSection: vertical timeline with 4 work entries (circle dots) + 2 education entries (square dots)
  - app/page.tsx: composed with all 4 sections (Hero, About, Skills, Experience)
  - All 15 Phase 2 tests green
affects: [03-projects, review, visual-qa]

# Tech tracking
tech-stack:
  added: []
  patterns: [server-component-no-use-client, data-from-constants-only, tailwind-only-no-inline-styles]

key-files:
  created:
    - app/ui/homepage/experienceSection.tsx
  modified:
    - app/page.tsx
    - tests/experience.test.tsx

key-decisions:
  - "ExperienceSection is a Server Component (no use client) — purely presentational, no interactivity needed"
  - "Fixed test EXP-01/EXP-02 bugs: getByText throws on multiple matches; used getAllByText for Microverse and React Native Developer per plan behavior spec"

patterns-established:
  - "Timeline dots: rounded-full + border-brand1 for work entries, rounded-sm + border-brand2 for education entries"
  - "Education separator: text label 'Education' + horizontal divider line, NOT a heading element"

requirements-completed: [EXP-01, EXP-02, EXP-03, EXP-04]

# Metrics
duration: 8min
completed: 2026-03-18
---

# Phase 2 Plan 05: Experience Section Summary

**Vertical timeline with 4 work entries (circle dots, brand1) + 2 education entries (square dots, brand2), completing all Phase 2 sections and passing all 15 tests**

## Performance

- **Duration:** 8 min
- **Started:** 2026-03-18T17:17:54Z
- **Completed:** 2026-03-18T17:25:54Z
- **Tasks:** 2 of 3 (Task 3 is checkpoint:human-verify — pending user approval)
- **Files modified:** 3

## Accomplishments
- Created `app/ui/homepage/experienceSection.tsx` — new Server Component with pure CSS vertical timeline
- Wired all 4 sections (Hero, About, Skills, Experience) into `app/page.tsx`
- All 15 Phase 2 tests pass green: `bun run test --run`
- Build succeeds: `bun run build` completes without TypeScript or compilation errors
- Fixed test file bugs where `getByText` was used for non-unique text values

## Task Commits

Each task was committed atomically:

1. **Task 1: Create experienceSection.tsx — vertical timeline with work + education** - `26ba81b` (feat)
2. **Task 2: Wire all four sections into app/page.tsx and run full test suite** - `a50e898` (feat)

_Task 3 is a checkpoint:human-verify — pending visual approval from user_

## Files Created/Modified
- `app/ui/homepage/experienceSection.tsx` — New server component; timeline with EXPERIENCE + EDUCATION constants; work circle dots (rounded-full border-brand1), education square dots (rounded-sm border-brand2), Education divider separator
- `app/page.tsx` — Added ExperienceSection import and render after SkillsSection
- `tests/experience.test.tsx` — Fixed EXP-01 (getByText → getAllByText for /Microverse/) and EXP-02 (getByText → getAllByText for 'React Native Developer') to match plan behavior spec

## Decisions Made
- ExperienceSection is a Server Component (no `'use client'`) — purely presentational, all content from constants
- Fixed test EXP-01 and EXP-02: plan behavior spec said `getAllByText(/Microverse/)` but test file used `getByText` which throws on multiple matches; also "React Native Developer" appears in two entries so `getByText` throws

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed test EXP-01 and EXP-02 using wrong query variants**
- **Found during:** Task 1 (TDD GREEN phase — tests failed unexpectedly)
- **Issue:** `tests/experience.test.tsx` EXP-01 used `screen.getByText(/Microverse/)` but "Microverse" appears as both a company name AND an education institution (and in responsibility text), causing multiple matches. EXP-02 used `screen.getByText('React Native Developer')` but two entries (Techiosis, RGX Labs) share this role. Plan behavior spec explicitly says `getAllByText(/Microverse/)` for EXP-01 — the test was written inconsistently with the plan spec.
- **Fix:** Changed EXP-01 to `screen.getAllByText(/Microverse/).length).toBeGreaterThan(0)` and EXP-02 to `screen.getAllByText('React Native Developer').length).toBeGreaterThan(0)`
- **Files modified:** `tests/experience.test.tsx`
- **Verification:** All 4 experience tests pass; all 15 total tests pass
- **Committed in:** `26ba81b` (Task 1 commit)

---

**Total deviations:** 1 auto-fixed (Rule 1 - Bug in test file)
**Impact on plan:** Required fix — without it, tests would never pass regardless of component implementation. Plan behavior spec was correct; test implementation was inconsistent with spec.

## Issues Encountered
- `getByText` vs `getAllByText` mismatch in test file — plan spec used `getAllByText` for multi-match cases but test file used `getByText`; discovered during TDD GREEN phase when tests failed unexpectedly after correct component implementation

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- All 4 Phase 2 sections complete and tested (Hero, About, Skills, Experience)
- All 15 Phase 2 tests green
- Build succeeds; ready for visual approval checkpoint
- After checkpoint approval: Phase 3 (Projects section) can begin
- Blocker: 6 WebP project screenshots must be created/provided before Phase 3 begins

---
*Phase: 02-core-sections*
*Completed: 2026-03-18*
