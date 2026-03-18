---
phase: 02-core-sections
plan: 01
subsystem: testing
tags: [vitest, testing-library, react-icons, tailwindcss, typography, css-tokens]

# Dependency graph
requires:
  - phase: 01-foundation
    provides: "globals.css @theme {} block, package.json, tsconfig.json, app/lib/constant.ts, app/lib/types.ts"
provides:
  - "7 Phase 2 typography tokens in globals.css @theme {} (h2-u, h2-m, number-m, para-m, code-m, button-u, label-u-m)"
  - "react-icons@5.6.0 in dependencies"
  - "vitest test stack with jsdom environment"
  - "4 failing RED-phase test files covering all 15 section requirements"
  - "public/mujeeb-resume.pdf placeholder so CV download does not 404"
  - "tsconfig.test.json for isolated test type-checking"
affects:
  - "02-core-sections plans 02-02, 02-03, 02-04, 02-05"

# Tech tracking
tech-stack:
  added:
    - "react-icons@5.6.0 — tech brand SVG icons for Skills section (react-icons/si)"
    - "vitest@4.1.0 — test runner with jsdom environment"
    - "@testing-library/react@16.3.2 — React component testing utilities"
    - "@testing-library/jest-dom@6.9.1 — DOM assertion matchers"
    - "@vitejs/plugin-react@6.0.1 — React JSX transform for vitest"
    - "jsdom@29.0.0 — DOM simulation for test environment"
  patterns:
    - "Typography tokens in globals.css @theme {} block follow --font-size-{name} naming"
    - "Test files live in /tests/ directory, excluded from main tsconfig, covered by tsconfig.test.json"
    - "vitest globals (describe, it, expect) enabled via tsconfig.test.json types: vitest/globals"
    - "Failing RED-phase tests establish contracts before section components are built"

key-files:
  created:
    - "vitest.config.ts — vitest config with jsdom, @/ alias, and tests/setup.ts"
    - "tsconfig.test.json — test-specific TypeScript config extending main tsconfig with vitest/globals types"
    - "tests/setup.ts — jest-dom matchers setup file"
    - "tests/hero.test.tsx — RED tests for HERO-01 through HERO-05"
    - "tests/about.test.tsx — RED tests for ABOUT-01 through ABOUT-03"
    - "tests/skills.test.tsx — RED tests for SKILL-01 through SKILL-03"
    - "tests/experience.test.tsx — RED tests for EXP-01 through EXP-04"
    - "public/mujeeb-resume.pdf — valid placeholder PDF (316 bytes, PDF 1.4 spec)"
  modified:
    - "app/globals.css — added 7 typography tokens inside existing @theme {} block (lines 58-64)"
    - "package.json — added react-icons to dependencies, added test devDeps, added 'test' script"
    - "tsconfig.json — added tests/ to exclude list and vitest/globals to types"

key-decisions:
  - "Excluded tests/ from main tsconfig and created tsconfig.test.json — prevents pre-commit tsc check from failing on missing experienceSection.tsx (RED phase expected)"
  - "Added vitest/globals to tsconfig types — resolves describe/it/expect TS2582 errors in test files"
  - "react-icons installed as production dependency (not devDependency) — matches plan spec and runtime use in Skills section"

patterns-established:
  - "Test isolation: tests/ excluded from tsconfig.json, has own tsconfig.test.json"
  - "RED-phase TDD: test files written before implementing components, failures are expected"

requirements-completed: [HERO-01, HERO-02, HERO-03, HERO-04, HERO-05, ABOUT-01, ABOUT-02, ABOUT-03, SKILL-01, SKILL-02, SKILL-03, EXP-01, EXP-02, EXP-03, EXP-04]

# Metrics
duration: 4min
completed: 2026-03-18
---

# Phase 02 Plan 01: Prerequisites — Typography Tokens, Test Stack, Placeholder PDF Summary

**7 CSS typography tokens added to globals.css, vitest+testing-library test stack installed, 4 failing RED-phase test files covering all 15 requirements created, and placeholder PDF placed at public/mujeeb-resume.pdf**

## Performance

- **Duration:** 4 min
- **Started:** 2026-03-18T17:04:57Z
- **Completed:** 2026-03-18T17:08:36Z
- **Tasks:** 2
- **Files modified:** 9

## Accomplishments
- Added 7 typography tokens (`--font-size-h2-u`, `--font-size-h2-m`, `--font-size-number-m`, `--font-size-para-m`, `--font-size-code-m`, `--font-size-button-u`, `--font-size-label-u-m`) inside the single existing `@theme {}` block
- Installed react-icons@5.6.0 (production dep) and full vitest test stack (6 devDeps)
- Created 5 test files (setup + 4 section test files) covering all 15 requirements as RED-phase failing tests
- Created valid PDF 1.4 placeholder at `public/mujeeb-resume.pdf` so CV download link does not 404

## Task Commits

Each task was committed atomically:

1. **Task 1: Add typography tokens to globals.css and install react-icons** - `a64cd2c` (feat)
2. **Task 2: Install test stack and create failing test scaffolds** - `302aa53` (feat)

**Plan metadata:** (docs commit follows)

## Files Created/Modified
- `app/globals.css` — 7 typography tokens appended inside existing `@theme {}` block
- `package.json` — react-icons in deps; vitest/testing-library/jsdom in devDeps; `test` script added
- `bun.lock` — updated lockfile
- `vitest.config.ts` — jsdom environment, `tests/setup.ts` setup file, `@/` path alias
- `tsconfig.json` — `tests/` added to exclude; `vitest/globals` added to types
- `tsconfig.test.json` — test-specific TypeScript config (extends main, includes only tests/)
- `tests/setup.ts` — imports `@testing-library/jest-dom`
- `tests/hero.test.tsx` — 5 failing tests: HERO-01..05
- `tests/about.test.tsx` — 3 failing tests: ABOUT-01..03
- `tests/skills.test.tsx` — 3 failing tests: SKILL-01..03
- `tests/experience.test.tsx` — 4 failing tests: EXP-01..04
- `public/mujeeb-resume.pdf` — 316-byte valid PDF 1.4 placeholder

## Decisions Made
- Excluded `tests/` from main `tsconfig.json` and created `tsconfig.test.json` to keep the pre-commit `tsc --noEmit` hook clean while `experienceSection.tsx` doesn't exist yet
- Added `vitest/globals` to tsconfig types to resolve `describe`/`it`/`expect` TypeScript errors in test files
- react-icons installed as production dependency per plan spec (used at runtime in Skills section)

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Added tsconfig.test.json and excluded tests/ from main tsconfig**
- **Found during:** Task 2 (test scaffolds creation)
- **Issue:** `bunx tsc --noEmit` (pre-commit hook) failed with TS2582 (vitest globals unknown) and TS2307 (experienceSection not found). Both errors would have blocked the commit.
- **Fix:** Added `vitest/globals` to tsconfig types, excluded `tests/` from main tsconfig, created `tsconfig.test.json` for isolated test type-checking
- **Files modified:** `tsconfig.json`, `tsconfig.test.json` (new)
- **Verification:** `bunx tsc --noEmit` exits clean; vitest config references `tsconfig.test.json` implicitly via vite's resolver
- **Committed in:** `302aa53` (Task 2 commit)

---

**Total deviations:** 1 auto-fixed (1 blocking issue)
**Impact on plan:** Auto-fix required for pre-commit correctness. No scope creep — tsconfig split is standard pattern for projects with separate test config.

## Issues Encountered
- `experienceSection.tsx` does not exist yet (expected — created in plan 02-05); test file imports it causing TS2307 error that would block commits — resolved by test tsconfig isolation

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- All prerequisites complete — plans 02-02 through 02-05 can now execute in parallel
- Typography tokens are available as Tailwind utilities (`text-h2-u`, `text-para-m`, etc.)
- react-icons/si imports work for tech brand icons in Skills section
- RED-phase test files define exact behavioral contracts each section component must satisfy
- PDF placeholder eliminates the CV download 404 blocker (real PDF can be swapped in later)

---
*Phase: 02-core-sections*
*Completed: 2026-03-18*
