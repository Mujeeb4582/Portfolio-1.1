---
phase: 02
slug: core-sections
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-18
---

# Phase 02 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vitest + React Testing Library |
| **Config file** | `vitest.config.ts` (none — Wave 0 installs) |
| **Quick run command** | `bun run test` |
| **Full suite command** | `bun run test --run` |
| **Estimated runtime** | ~10 seconds |

---

## Sampling Rate

- **After every task commit:** Run `bun run test --run tests/{section}.test.tsx`
- **After every plan wave:** Run `bun run test --run`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 10 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 02-01-01 | 01 | 1 | HERO-01 | unit | `bun run test --run tests/hero.test.tsx` | ❌ W0 | ⬜ pending |
| 02-01-02 | 01 | 1 | HERO-02 | unit | `bun run test --run tests/hero.test.tsx` | ❌ W0 | ⬜ pending |
| 02-01-03 | 01 | 1 | HERO-03 | unit | `bun run test --run tests/hero.test.tsx` | ❌ W0 | ⬜ pending |
| 02-01-04 | 01 | 1 | HERO-04 | unit | `bun run test --run tests/hero.test.tsx` | ❌ W0 | ⬜ pending |
| 02-01-05 | 01 | 1 | HERO-05 | unit | `bun run test --run tests/hero.test.tsx` | ❌ W0 | ⬜ pending |
| 02-02-01 | 02 | 1 | ABOUT-01 | unit | `bun run test --run tests/about.test.tsx` | ❌ W0 | ⬜ pending |
| 02-02-02 | 02 | 1 | ABOUT-02 | unit | `bun run test --run tests/about.test.tsx` | ❌ W0 | ⬜ pending |
| 02-02-03 | 02 | 1 | ABOUT-03 | unit | `bun run test --run tests/about.test.tsx` | ❌ W0 | ⬜ pending |
| 02-03-01 | 03 | 1 | SKILL-01 | unit | `bun run test --run tests/skills.test.tsx` | ❌ W0 | ⬜ pending |
| 02-03-02 | 03 | 1 | SKILL-02 | unit | `bun run test --run tests/skills.test.tsx` | ❌ W0 | ⬜ pending |
| 02-03-03 | 03 | 1 | SKILL-03 | unit | `bun run test --run tests/skills.test.tsx` | ❌ W0 | ⬜ pending |
| 02-04-01 | 04 | 2 | EXP-01 | unit | `bun run test --run tests/experience.test.tsx` | ❌ W0 | ⬜ pending |
| 02-04-02 | 04 | 2 | EXP-02 | unit | `bun run test --run tests/experience.test.tsx` | ❌ W0 | ⬜ pending |
| 02-04-03 | 04 | 2 | EXP-03 | unit | `bun run test --run tests/experience.test.tsx` | ❌ W0 | ⬜ pending |
| 02-04-04 | 04 | 2 | EXP-04 | unit | `bun run test --run tests/experience.test.tsx` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `jsdom` — install as dev deps
- [ ] `vitest.config.ts` — create with jsdom environment and Next.js compatibility
- [ ] `tests/setup.ts` — shared jest-dom imports
- [ ] `tests/hero.test.tsx` — covers HERO-01 through HERO-05
- [ ] `tests/about.test.tsx` — covers ABOUT-01 through ABOUT-03
- [ ] `tests/skills.test.tsx` — covers SKILL-01 through SKILL-03
- [ ] `tests/experience.test.tsx` — covers EXP-01 through EXP-04

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Hero split layout visual | HERO-01 | CSS layout needs visual check | Verify text left / photo right on desktop, stacked on mobile |
| Photo styling | HERO-02 | Rounded rectangle + cyan border | Inspect photo has border-radius and cyan glow |
| Skills icon rendering | SKILL-02 | Brand logos need visual confirmation | Check each category card shows recognizable tech logos |
| Timeline visual | EXP-01 | Connected line + dots need visual check | Verify timeline line connects all entries with dots |
| Dark mode appearance | All | Theme-dependent styles | Toggle through light/dark/midnight_steel, verify readability |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 10s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
