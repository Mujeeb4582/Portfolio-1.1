---
phase: 01-foundation
plan: "03"
subsystem: ui
tags: [eslint, fonts, inter, jetbrains-mono, dead-code, accessibility, next-font]

# Dependency graph
requires:
  - phase: 01-02
    provides: Tailwind v4 CSS-first config, globals.css @theme {} with font variable placeholders
provides:
  - ESLint v9 flat config (eslint.config.js) — lint exits 0 with no warnings or errors
  - Inter + JetBrains Mono fonts loaded via next/font/google with CSS variable injection
  - globals.css font variables using var(--font-inter-variable) and var(--font-jetbrains-variable)
  - Dead code removed: no inline styles, no duplicate language array, no placeholder avatar
  - Accessible navbar with aria-label="Main navigation"
  - mailto: link on "Let's Talk" hero section
affects: [all-phase-2+, component-styling, font-usage]

# Tech tracking
tech-stack:
  added:
    - "@eslint/eslintrc@3.3.5 (enables FlatCompat for legacy eslint config bridging)"
    - "Inter (next/font/google — body font)"
    - "JetBrains Mono (next/font/google — code/monospace font)"
  removed:
    - "eslint.config.mjs (replaced with eslint.config.js)"
    - "Ubuntu font (next/font/google import removed from layout.tsx)"
    - "IBM Plex Mono font (next/font/google import removed from layout.tsx)"
  patterns:
    - "ESLint flat config via direct nextCoreWebVitals/nextTypescript imports (FlatCompat incompatible with eslint-config-next@16 flat arrays)"
    - "next/font/google with variable: '--font-inter' injects --font-inter-variable CSS custom property"
    - "globals.css @theme uses var(--font-inter-variable) to bind next/font injection to Tailwind tokens"
    - "\"type\": \"module\" in package.json enables eslint.config.js as ES module"

key-files:
  created:
    - eslint.config.js (ESLint flat config — replaces eslint.config.mjs)
  modified:
    - app/layout.tsx (Inter + JetBrains Mono font loading, font-inter body class)
    - app/globals.css (font variables updated to var() references from placeholder strings)
    - app/ui/homepage/aboutSection.tsx (opacity-10 class, aria-hidden on decorative div)
    - app/ui/homepage/skillsSection.tsx (opacity-10 class, aria-hidden on decorative div)
    - app/ui/homepage/heroSection.tsx (LANGUAGE_ICONS import, mailto link, /profile.jpg avatar)
    - app/ui/navbar.tsx (aria-label="Main navigation" added)
    - app/ui/theme/clientThemeProvider.tsx (eslint-disable for intentional setMounted pattern)
    - postcss.config.mjs (named export to fix anonymous default export warning)
    - package.json ("type": "module" added, @eslint/eslintrc devDependency)
  deleted:
    - eslint.config.mjs (replaced by eslint.config.js)

key-decisions:
  - "Used direct nextCoreWebVitals/nextTypescript imports instead of FlatCompat — FlatCompat.extends() is for legacy eslintrc configs, not flat config arrays; eslint-config-next@16 exports flat arrays which FlatCompat cannot serialize (circular structure JSON error)"
  - "Added \"type\": \"module\" to package.json to allow eslint.config.js (not .mjs) as ES module"
  - "eslint-disable-next-line for react-hooks/set-state-in-effect in clientThemeProvider — setMounted in useEffect IS the recommended next-themes SSR hydration guard pattern"

patterns-established:
  - "Pattern 5: ESLint flat config imports eslint-config-next exports directly — no FlatCompat needed"
  - "Pattern 6: next/font/google variable option creates --font-{name}-variable CSS custom property picked up by globals.css @theme var() references"

requirements-completed:
  - FOUND-05
  - FOUND-07

# Metrics
duration: 4min
completed: 2026-03-18
---

# Phase 01 Plan 03: ESLint Flat Config + Font Migration + Dead Code Removal Summary

**ESLint flat config (eslint.config.js), Inter/JetBrains Mono via next/font/google, and all dead-code patterns removed — lint, tsc, and build all exit 0**

## Performance

- **Duration:** ~4 minutes
- **Started:** 2026-03-18T13:13:45Z
- **Completed:** 2026-03-18T13:18:00Z
- **Tasks:** 2
- **Files modified:** 9

## Accomplishments

- Migrated ESLint from eslint.config.mjs to eslint.config.js with `"type": "module"` — `bun run check-lint` exits 0
- Replaced Ubuntu + IBM Plex Mono with Inter + JetBrains Mono via next/font/google; globals.css @theme font variables now use `var(--font-inter-variable)` references
- Removed all dead code: inline `style={{ }}` attributes, duplicate `languages` array in heroSection, shadcn placeholder avatar, dead `www.mujeeb.com` link, `href="#"` mail link
- Added accessibility improvements: `aria-hidden` on decorative divs, `aria-label` on navbar, `aria-label` on mailto link

## Task Commits

Each task was committed atomically:

1. **Task 1: Migrate ESLint to flat config** - `6b519db` (chore)
2. **Task 2: Replace fonts and remove dead code** - `bcb6865` (feat)

## Files Created/Modified

- `eslint.config.js` - New flat config using direct nextCoreWebVitals/nextTypescript imports
- `eslint.config.mjs` - Deleted (replaced by eslint.config.js)
- `package.json` - Added `"type": "module"`, added `@eslint/eslintrc@3.3.5` devDependency
- `app/layout.tsx` - Inter + JetBrains_Mono from next/font/google; body class updated to `font-inter`
- `app/globals.css` - Font variables updated from placeholder strings to `var(--font-inter-variable)` references
- `app/ui/homepage/aboutSection.tsx` - `opacity-10` class replaces `style={{ opacity: 0.1 }}`, `aria-hidden="true"` on background div
- `app/ui/homepage/skillsSection.tsx` - `opacity-10` class replaces `style={{ opacity: 0.1 }}`, `aria-hidden="true"` on background div
- `app/ui/homepage/heroSection.tsx` - LANGUAGE_ICONS imported from constant.ts; avatar src set to /profile.jpg; mailto link; removed dead website link
- `app/ui/navbar.tsx` - `aria-label="Main navigation"` added to `<nav>`
- `app/ui/theme/clientThemeProvider.tsx` - eslint-disable for intentional SSR hydration pattern
- `postcss.config.mjs` - Named export to resolve anonymous default export lint warning

## Decisions Made

- **Direct imports over FlatCompat:** `FlatCompat.extends("next/core-web-vitals", ...)` fails with ESLint 8 + eslint-config-next@16 because those exports are already flat config arrays (not legacy eslintrc format). FlatCompat tries to JSON.stringify them for validation, hitting a circular reference. The fix is to import `nextCoreWebVitals` and `nextTypescript` directly and spread them.
- **`"type": "module"` in package.json:** Required to use `eslint.config.js` (not `.mjs`) as an ES module. The plan specified `.js` extension, so this was the correct enabler.
- **eslint-disable for setMounted pattern:** `react-hooks/set-state-in-effect` flags the next-themes recommended SSR hydration guard. Rather than removing the guard (which would cause hydration flash), a targeted line-level disable was added with a comment explaining the intent.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] FlatCompat incompatible with eslint-config-next@16 flat config arrays**
- **Found during:** Task 1 (eslint.config.js creation)
- **Issue:** `FlatCompat.extends("next/core-web-vitals", "next/typescript")` fails with `TypeError: Converting circular structure to JSON` because eslint-config-next@16 exports flat config arrays (which contain plugin references), not legacy eslintrc objects. FlatCompat's validator tries to JSON.stringify these for schema validation and hits a circular reference.
- **Fix:** Used direct imports (`import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'`) and spread them in the config array — the approach that was working in eslint.config.mjs from Plan 01.
- **Files modified:** `eslint.config.js`
- **Verification:** `bun run check-lint` exits 0
- **Committed in:** 6b519db (Task 1 commit)

**2. [Rule 2 - Missing Critical] Added `"type": "module"` to package.json**
- **Found during:** Task 1 (eslint.config.js loading)
- **Issue:** Node.js warned that `eslint.config.js` was not typed as an ES module and was being re-parsed, causing a performance overhead
- **Fix:** Added `"type": "module"` to package.json — required for `.js` files to be treated as ES modules
- **Files modified:** `package.json`
- **Verification:** ESLint loads without module type warning
- **Committed in:** 6b519db (Task 1 commit)

**3. [Rule 1 - Bug] react/no-unescaped-entities in heroSection.tsx**
- **Found during:** Task 2 (lint verification)
- **Issue:** The original heroSection.tsx paragraph text contained a literal apostrophe (`you're`) which triggers `react/no-unescaped-entities` error
- **Fix:** Replaced `'` with `&apos;` in the paragraph text
- **Files modified:** `app/ui/homepage/heroSection.tsx`
- **Verification:** `bun run check-lint` exits 0
- **Committed in:** bcb6865 (Task 2 commit)

---

**Total deviations:** 3 auto-fixed (2 bugs, 1 missing critical)
**Impact on plan:** All auto-fixes necessary for lint to pass and ES module compatibility. No scope creep.

## Issues Encountered

- The plan's target `eslint.config.js` using `FlatCompat` pattern does not work with ESLint 8 + eslint-config-next@16 — see deviation 1 above. The working approach (direct imports) was already established in Plan 01's eslint.config.mjs.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- ESLint, TypeScript, and build are all clean
- Inter and JetBrains Mono fonts are loading via next/font/google (CSS variables injected into body)
- Codebase free of all dead code patterns catalogued in CONCERNS.md
- Ready for Phase 2: Content + Sections (projects, experience, contact sections)
- Blocker: `/profile.jpg` needs to be placed in `public/` for profile avatar to display

## Self-Check: PASSED

| Check | Result |
|-------|--------|
| eslint.config.js exists | FOUND |
| eslint.config.mjs gone | CONFIRMED |
| app/layout.tsx — Inter/JetBrains_Mono | FOUND |
| app/globals.css — var() references | FOUND |
| aboutSection.tsx — no inline styles | CONFIRMED |
| skillsSection.tsx — no inline styles | CONFIRMED |
| heroSection.tsx — LANGUAGE_ICONS import | FOUND |
| heroSection.tsx — mailto link | FOUND |
| heroSection.tsx — /profile.jpg avatar | FOUND |
| navbar.tsx — aria-label | FOUND |
| bun run check-lint exits 0 | CONFIRMED |
| bunx tsc --noEmit exits 0 | CONFIRMED |
| bun run build exits 0 | CONFIRMED |
| Task 1 commit 6b519db | FOUND |
| Task 2 commit bcb6865 | FOUND |

---
*Phase: 01-foundation*
*Completed: 2026-03-18*
