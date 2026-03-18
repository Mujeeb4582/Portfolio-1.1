---
phase: 01-foundation
plan: "02"
subsystem: ui
tags: [tailwindcss, tailwind-v4, shadcn, dark-mode, themes, postcss, tw-animate-css, next-themes]

# Dependency graph
requires:
  - phase: 01-01
    provides: Next.js 16.1.7 + React 19, bun lockfile, simple-git-hooks
provides:
  - Tailwind v4 CSS-first config (@theme {} in globals.css)
  - Dark mode via @custom-variant dark — all dark: classes functional
  - Three-theme system (light, dark, midnight_steel) with CSS variable overrides
  - tw-animate-css replacing tailwindcss-animate (shadcn animations restored)
  - ThemeProvider with system preference auto-detection (defaultTheme=system)
  - suppressHydrationWarning on html tag (required for next-themes)
  - shadcn components updated for v4 class names (outline-hidden, shadow-xs)
affects: [all-phase-2+, component-styling, dark-mode-usage]

# Tech tracking
tech-stack:
  added:
    - tailwindcss@4.2.1 (CSS-first, @theme {} config)
    - "@tailwindcss/postcss@4.2.1 (replaces tailwindcss PostCSS plugin)"
    - tw-animate-css@1.4.0 (replaces tailwindcss-animate for shadcn animations)
  removed:
    - tailwindcss@3.4.x (downgraded from v4 to unblock migration)
    - tailwindcss-animate@1.0.7 (incompatible with Tailwind v4)
    - eslint-plugin-tailwindcss (uses tailwindcss/resolveConfig API removed in v4)
    - prettier-plugin-tailwindcss (removed along with tailwindcss ESLint plugin)
  patterns:
    - "Tailwind v4 CSS-first: all tokens in @theme {} in globals.css, no JS config"
    - "@custom-variant dark (&:where(.dark, .dark *)) — required for next-themes class-based dark mode"
    - "@source not ../.planning — exclude planning docs from Tailwind class scanning"
    - "midnight_steel theme uses CSS variable overrides only (no dark: classes) — Option B approach"
    - "background-image tokens in @theme {} as --background-image-about-bg pattern"

key-files:
  created: []
  modified:
    - app/globals.css (full rewrite — Tailwind v4 @theme {} config)
    - postcss.config.mjs (updated to @tailwindcss/postcss plugin)
    - app/ui/theme/clientThemeProvider.tsx (defaultTheme=system, direct next-themes import)
    - app/layout.tsx (suppressHydrationWarning on html tag)
    - app/ui/button.tsx (outline-none → outline-hidden)
    - app/ui/card.tsx (shadow-sm → shadow-xs)
    - app/ui/dropdown-menu.tsx (outline-none → outline-hidden, all occurrences)
    - app/ui/input.tsx (outline-none → outline-hidden)
    - app/ui/select.tsx (outline-none → outline-hidden)
    - components.json (removed tailwind.config reference)
    - eslint.config.mjs (removed eslint-plugin-tailwindcss — incompatible with v4)
    - package.json (tailwindcss 4.x, @tailwindcss/postcss, tw-animate-css)
  deleted:
    - tailwind.config.ts (tokens migrated to globals.css @theme {})

key-decisions:
  - "Used @source not ../.planning to exclude .planning/research/ARCHITECTURE.md from Tailwind scanning — ARCHITECTURE.md contains bg-[url(...)] in code examples causing Turbopack build failure"
  - "Added --background-image-about-bg and --background-image-skills-bg to @theme {} to preserve bg-about-bg and bg-skills-bg utility classes used in aboutSection.tsx and skillsSection.tsx"
  - "Removed eslint-plugin-tailwindcss because it uses tailwindcss/resolveConfig which is removed in Tailwind v4 — plugin not compatible with v4"
  - "Ran @tailwindcss/upgrade codemod but it only works on v3 projects — since bun added v4 first, codemod refused. Migrated manually following interfaces block in PLAN.md"
  - "midnight_steel theme uses CSS variable overrides only (Option B from RESEARCH.md) — not added to @custom-variant dark selector"

patterns-established:
  - "Pattern 1: All Tailwind tokens in globals.css @theme {} — no tailwind.config.ts"
  - "Pattern 2: Dark mode via @custom-variant dark (&:where(.dark, .dark *)) — must be before @theme {}"
  - "Pattern 3: @source not directive to exclude non-source directories from Tailwind scanning"
  - "Pattern 4: background-image tokens as --background-image-{name} in @theme {} for named bg utilities"

requirements-completed:
  - FOUND-03
  - FOUND-04
  - FOUND-06
  - NAV-04

# Metrics
duration: 14min
completed: 2026-03-18
---

# Phase 01 Plan 02: Tailwind v4 Migration + Dark Mode Summary

**Tailwind CSS v3 → v4 CSS-first config with @theme {}, @custom-variant dark mode fix, tw-animate-css for shadcn animations, and system preference theme detection**

## Performance

- **Duration:** ~14 minutes
- **Started:** 2026-03-18T12:56:15Z
- **Completed:** 2026-03-18T13:10:25Z
- **Tasks:** 2
- **Files modified:** 12

## Accomplishments

- Migrated from Tailwind v3 to v4 CSS-first config — all design tokens now in `app/globals.css @theme {}`
- Fixed dark mode: `@custom-variant dark (&:where(.dark, .dark *))` enables all `dark:` classes with next-themes
- Replaced `tailwindcss-animate` with `tw-animate-css` — shadcn dropdown/dialog animations restored
- Updated ThemeProvider to `defaultTheme="system"` with `enableSystem={true}` (NAV-04 system preference detection)
- Fixed shadcn components for Tailwind v4 renamed utilities (`outline-hidden`, `shadow-xs`)

## Task Commits

Each task was committed atomically:

1. **Task 1: Install Tailwind v4 packages and run migration codemod** - `7a3fc21` (chore)
2. **Task 2: Rewrite globals.css with canonical Tailwind v4 config and fix dark mode** - `480af21` (feat)

## Files Created/Modified

- `app/globals.css` - Full rewrite: @import tailwindcss + tw-animate-css, @source not, @custom-variant dark, @theme {} with all tokens, .dark and .midnight_steel theme blocks
- `postcss.config.mjs` - Updated from `tailwindcss: {}` to `@tailwindcss/postcss: {}`
- `app/ui/theme/clientThemeProvider.tsx` - `defaultTheme="system"`, `enableSystem={true}`, direct `next-themes` import
- `app/layout.tsx` - Added `suppressHydrationWarning` to `<html>` tag
- `app/ui/button.tsx` - `outline-none` → `outline-hidden` (Tailwind v4 rename)
- `app/ui/card.tsx` - `shadow-sm` → `shadow-xs` (Tailwind v4 rename)
- `app/ui/dropdown-menu.tsx` - `outline-none` → `outline-hidden` (all occurrences)
- `app/ui/input.tsx` - `outline-none` → `outline-hidden`
- `app/ui/select.tsx` - `outline-none` → `outline-hidden` (all occurrences)
- `components.json` - Removed `tailwind.config` reference (CSS-first config now)
- `eslint.config.mjs` - Removed `eslint-plugin-tailwindcss` import (incompatible with v4)
- `package.json` - tailwindcss@4.2.1, @tailwindcss/postcss@4.2.1, tw-animate-css@1.4.0; removed tailwindcss-animate
- `tailwind.config.ts` - Deleted (tokens migrated to globals.css @theme {})

## Decisions Made

- Used `@source not ../.planning` in globals.css to exclude `.planning/research/ARCHITECTURE.md` from Tailwind class scanning — ARCHITECTURE.md contains `bg-[url(...)]` in its documentation text which Tailwind v4's auto-detection picked up and generated a `url(...)` CSS class that Turbopack tried to resolve as a module (causing build failure)
- Added `--background-image-about-bg` and `--background-image-skills-bg` tokens to `@theme {}` to preserve the existing `bg-about-bg` and `bg-skills-bg` utility classes used in section components
- Removed `eslint-plugin-tailwindcss` because it calls `tailwindcss/resolveConfig` which is removed in Tailwind v4

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] eslint-plugin-tailwindcss incompatible with Tailwind v4**
- **Found during:** Task 1 (first commit attempt)
- **Issue:** `eslint-plugin-tailwindcss` calls `tailwindcss/resolveConfig` which no longer exists in Tailwind v4 package exports, causing `ERR_PACKAGE_PATH_NOT_EXPORTED` error on every ESLint run
- **Fix:** Removed `eslint-plugin-tailwindcss` and `prettier-plugin-tailwindcss` from package.json and eslint.config.mjs
- **Files modified:** `eslint.config.mjs`, `package.json`, `bun.lock`
- **Verification:** `bun run check-lint` exits with 0 errors (2 expected warnings)
- **Committed in:** 7a3fc21 (Task 1 commit)

**2. [Rule 1 - Bug] Tailwind v4 auto-detection scanning .planning/research/ARCHITECTURE.md**
- **Found during:** Task 2 (build failure investigation)
- **Issue:** Tailwind v4's auto-detection scanned `.planning/research/ARCHITECTURE.md` which contains `bg-[url(...)]` in documentation text. This generated a `.bg-[url(...)] { background-image: url(...); }` CSS rule. Turbopack then tried to resolve `'...'` as a module, causing `Module not found: Can't resolve '...'` build failure
- **Fix:** Added `@source not "../.planning";` directive in globals.css to exclude the .planning directory from Tailwind's class scanning
- **Files modified:** `app/globals.css`
- **Verification:** `bun run build` exits 0 after exclusion
- **Committed in:** 480af21 (Task 2 commit)

**3. [Rule 3 - Blocking] @tailwindcss/upgrade codemod refused to run**
- **Found during:** Task 1 (codemod execution)
- **Issue:** `bunx @tailwindcss/upgrade@next` requires a v3 project to migrate. Since `bun add tailwindcss@^4.2.1` was run first (as instructed), the codemod detected v4 already installed and refused: "The migration tool can only be run on v3 projects"
- **Fix:** Performed manual migration following the interfaces block in PLAN.md — wrote globals.css from the provided template, deleted tailwind.config.ts, updated postcss.config.mjs
- **Files modified:** `app/globals.css`, `postcss.config.mjs`, `tailwind.config.ts` (deleted)
- **Verification:** `bun run build` exits 0
- **Committed in:** 7a3fc21 and 480af21

---

**Total deviations:** 3 auto-fixed (2 bugs, 1 blocking)
**Impact on plan:** All fixes necessary for Tailwind v4 compatibility and build success. No scope creep.

## Issues Encountered

- **tw-animate-css @import path:** Initial test with `@import "tw-animate-css/dist/tw-animate.css"` failed because the package uses "style" condition exports not "default". Resolved by using the bare `@import "tw-animate-css"` which Tailwind's PostCSS plugin resolves correctly via the "style" condition.
- **Codemod order issue:** The plan specified running the upgrade codemod after `bun add tailwindcss@^4`, but the codemod only works on v3 projects. Installing v4 first (as written) blocked the codemod. Manual migration from the PLAN.md interfaces block was equivalent.

## Next Phase Readiness

- Tailwind v4 is operational — all `dark:`, `brand1`, `brand2`, `background`, `foreground` tokens generate correct CSS
- Dark mode toggle functional (theme class changes apply correct CSS variables)
- shadcn components render with correct Tailwind v4 class names and animations
- Ready for Plan 03: Font migration (Inter + JetBrains Mono via next/font/google)
- Ubuntu/IBM Plex Mono fonts still in layout.tsx — Plan 03 removes them

## Self-Check: PASSED

| Check | Result |
|-------|--------|
| app/globals.css exists | FOUND |
| clientThemeProvider.tsx exists | FOUND |
| app/layout.tsx exists | FOUND |
| 01-02-SUMMARY.md exists | FOUND |
| tailwind.config.ts gone | CONFIRMED |
| Task 1 commit 7a3fc21 | FOUND |
| Task 2 commit 480af21 | FOUND |

---
*Phase: 01-foundation*
*Completed: 2026-03-18*
