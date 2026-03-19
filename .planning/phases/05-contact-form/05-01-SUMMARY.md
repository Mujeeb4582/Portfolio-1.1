---
phase: 05-contact-form
plan: "01"
subsystem: ui
tags: [zod, react-hook-form, resend, shadcn, testing, tdd]

requires:
  - phase: 04-navigation-animations
    provides: Vitest + @testing-library/react test infrastructure, setup.ts with global mocks

provides:
  - contactSchema (Zod) with name/email/message/_trap honeypot validation
  - ContactFormData TypeScript type derived from schema
  - Shared schema importable from both client component and API route
  - shadcn Textarea component styled consistently with Input
  - RED-phase test scaffold covering CONT-01 through CONT-05 (11 tests)
  - RESEND_API_KEY env placeholder in .env.local
  - null stub contactSection.tsx for RED-phase import resolution

affects: [05-contact-form Plan 02, app/api/contact/route.ts, app/ui/homepage/contactSection.tsx]

tech-stack:
  added:
    - react-hook-form@7.71.2
    - "@hookform/resolvers@5.2.2"
    - zod@4.3.6
    - resend@6.9.4
    - "@testing-library/user-event@14.6.1 (dev)"
  patterns:
    - Shared Zod schema as single source of truth for client+server validation
    - TDD RED phase with null stub component for deferred implementation
    - shadcn component install via CLI, fallback to manual creation

key-files:
  created:
    - app/lib/schemas/contact.ts
    - app/ui/textarea.tsx
    - app/ui/homepage/contactSection.tsx
    - tests/contact.test.tsx
    - .env.local
  modified:
    - package.json
    - bun.lock

key-decisions:
  - "contactSchema defined in app/lib/schemas/contact.ts (shared module) — eliminates duplicated validation between client form and API route"
  - "contactSection.tsx null stub created for RED-phase import resolution — Vite import-analysis runs before test runtime, so module must exist for schema tests to be GREEN"
  - "@testing-library/user-event added as missing dev dep — required by test scaffold; not in original devDependencies"
  - "RESEND_API_KEY left empty in .env.local — real key requires resend.com/api-keys; onboarding@resend.dev is only valid from address on free tier before domain verification"

patterns-established:
  - "Shared schema pattern: app/lib/schemas/{feature}.ts exports both schema and inferred type — both client and server import from this single file"
  - "RED stub pattern: create null-returning stub component in Plan N so test imports resolve; Plan N+1 replaces the stub with real implementation"

requirements-completed: [CONT-01, CONT-02, CONT-03, CONT-04, CONT-05]

duration: 6min
completed: 2026-03-19
---

# Phase 5 Plan 01: Contact Form Prerequisites Summary

**Zod contactSchema with honeypot field, shadcn Textarea component, and 11-test RED-phase scaffold covering all five CONT requirements**

## Performance

- **Duration:** 6 min
- **Started:** 2026-03-19T14:21:16Z
- **Completed:** 2026-03-19T14:27:06Z
- **Tasks:** 2
- **Files modified:** 7

## Accomplishments

- Installed react-hook-form, @hookform/resolvers, zod, resend as production dependencies and @testing-library/user-event as dev dependency
- Created shared `contactSchema` with name/email/message validation + `_trap` honeypot field and exported `ContactFormData` type
- Scaffolded 11-test RED-phase file: 5 schema tests GREEN, 6 component tests RED (stub returns null)

## Task Commits

Each task was committed atomically:

1. **Task 1: Install dependencies + shadcn Textarea + env placeholder** - `6a047d8` (feat)
2. **Task 2: Shared Zod schema + failing test scaffold (RED phase)** - `d38455b` (test)

## Files Created/Modified

- `app/lib/schemas/contact.ts` — Shared Zod contactSchema + ContactFormData type
- `app/ui/textarea.tsx` — shadcn Textarea component (mirrors Input structure with cn() utility)
- `app/ui/homepage/contactSection.tsx` — null stub for RED-phase import resolution (Plan 02 replaces this)
- `tests/contact.test.tsx` — 11 tests: 5 schema (GREEN) + 6 component (RED), covers CONT-01 to CONT-05
- `.env.local` — Created with `RESEND_API_KEY=` placeholder
- `package.json` — Added react-hook-form, @hookform/resolvers, zod, resend, @testing-library/user-event
- `bun.lock` — Updated lockfile

## Decisions Made

- `contactSection.tsx` null stub created so Vite's `import-analysis` plugin can resolve the import at build time — without the stub, schema tests cannot run even though the schema file exists
- `@testing-library/user-event` added as dev dep (was missing from the project despite being needed by tests referencing userEvent interactions)
- `.env.local` file did not exist before this plan; created fresh with just `RESEND_API_KEY=` placeholder

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Created null stub contactSection.tsx to unblock schema test execution**
- **Found during:** Task 2 (TDD RED phase)
- **Issue:** Vite's `import-analysis` plugin resolves all imports at transform time before test runtime. The `vi.mock()` hoisting cannot intercept this — the entire test file fails with "module not found" before any tests (including schema tests) can run.
- **Fix:** Created `app/ui/homepage/contactSection.tsx` as a null-returning stub component so the import resolves. All component tests still fail RED (stub renders nothing). Schema tests now run GREEN.
- **Files modified:** `app/ui/homepage/contactSection.tsx` (created)
- **Verification:** `bun run test --run tests/contact.test.tsx` → 5 passed (schema), 6 failed (component)
- **Committed in:** d38455b (Task 2 commit)

**2. [Rule 3 - Blocking] Installed missing @testing-library/user-event**
- **Found during:** Task 2 (TDD RED phase)
- **Issue:** `tests/contact.test.tsx` imports `userEvent` from `@testing-library/user-event` but the package was not in devDependencies
- **Fix:** `bun add -d @testing-library/user-event`
- **Files modified:** `package.json`, `bun.lock`
- **Verification:** Import resolves, test file compiles and runs
- **Committed in:** d38455b (Task 2 commit)

---

**Total deviations:** 2 auto-fixed (both Rule 3 — blocking)
**Impact on plan:** Both auto-fixes required for the test scaffold to function. No scope creep — stub will be replaced in Plan 02.

## Issues Encountered

None beyond the two auto-fixed blocking issues documented above.

## User Setup Required

**RESEND_API_KEY must be configured before Plan 02 integration testing:**
1. Go to [resend.com/api-keys](https://resend.com/api-keys) and generate an API key
2. Add the key to `.env.local`: `RESEND_API_KEY=re_xxxxxxxxxxxx`
3. Note: `onboarding@resend.dev` is the only valid `from` address on free tier before domain verification (tracked as a Phase 6 pre-launch blocker in STATE.md)

## Next Phase Readiness

- Plan 02 (ContactSection component + API route) can proceed immediately
- `contactSchema` is importable from `@/app/lib/schemas/contact` in both client and server code
- `Textarea` component is available at `@/app/ui/textarea`
- All 6 component tests are RED and ready to turn GREEN as Plan 02 implements the real component
- RESEND_API_KEY placeholder exists in `.env.local` — developer must fill in real key before email delivery works

---
*Phase: 05-contact-form*
*Completed: 2026-03-19*
