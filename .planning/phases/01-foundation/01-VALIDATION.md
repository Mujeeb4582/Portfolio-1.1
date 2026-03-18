---
phase: 01
slug: foundation
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-18
---

# Phase 01 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vitest + React Testing Library |
| **Config file** | `vitest.config.ts` (none — Wave 0 installs) |
| **Quick run command** | `bun run test` |
| **Full suite command** | `bun run test --run` |
| **Estimated runtime** | ~15 seconds |

---

## Sampling Rate

- **After every task commit:** Run `bunx tsc --noEmit && eslint . --max-warnings 0`
- **After every plan wave:** Run `bun run test --run`
- **Before `/gsd:verify-work`:** Full suite must be green + `bun run build` succeeds
- **Max feedback latency:** 15 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 01-01-01 | 01 | 0 | FOUND-01 | smoke | `bun run build && echo "build OK"` | ❌ W0 | ⬜ pending |
| 01-01-02 | 01 | 0 | FOUND-02 | smoke | `bunx tsc --noEmit` | ❌ W0 | ⬜ pending |
| 01-01-03 | 01 | 0 | FOUND-03 | visual/unit | `vitest run tests/tailwind-tokens.test.ts` | ❌ W0 | ⬜ pending |
| 01-01-04 | 01 | 0 | FOUND-04 | unit | `vitest run tests/shadcn-components.test.tsx` | ❌ W0 | ⬜ pending |
| 01-01-05 | 01 | 0 | FOUND-05 | unit | `vitest run tests/existing-components.test.tsx` | ❌ W0 | ⬜ pending |
| 01-01-06 | 01 | 0 | FOUND-06 | unit | `vitest run tests/dark-mode.test.tsx` | ❌ W0 | ⬜ pending |
| 01-01-07 | 01 | 0 | FOUND-07 | lint | `eslint . --max-warnings 0` | ❌ W0 | ⬜ pending |
| 01-01-08 | 01 | 0 | FOUND-08 | unit | `vitest run tests/constants.test.ts` | ❌ W0 | ⬜ pending |
| 01-01-09 | 01 | 0 | FOUND-09 | type check | `bunx tsc --noEmit` | ❌ W0 | ⬜ pending |
| 01-01-10 | 01 | 0 | NAV-04 | unit | `vitest run tests/theme-toggle.test.tsx` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `package.json` — add `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `@vitejs/plugin-react`, `jsdom` as dev deps
- [ ] `vitest.config.ts` — configure with jsdom environment and Next.js compatibility
- [ ] `tests/setup.ts` — shared test setup importing `@testing-library/jest-dom`
- [ ] `tests/dark-mode.test.tsx` — covers FOUND-06 and NAV-04
- [ ] `tests/constants.test.ts` — covers FOUND-08 (exported arrays have correct shape)
- [ ] `tests/existing-components.test.tsx` — covers FOUND-04 and FOUND-05
- [ ] `tests/shadcn-components.test.tsx` — covers FOUND-04 (theme toggle dropdown renders)
- [ ] `tests/tailwind-tokens.test.ts` — covers FOUND-03 (brand colors resolve)

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Dark mode visual rendering | FOUND-06 | CSS custom properties need visual confirmation | Toggle between light/dark/midnight_steel, verify brand colors render correctly |
| Component visual regression | FOUND-05 | Layout and styling need visual inspection | Compare each section visually before/after migration |
| `bun run dev` hot reload | FOUND-01 | Dev server behavior requires interactive check | Run dev server, make a change, verify hot reload works |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
