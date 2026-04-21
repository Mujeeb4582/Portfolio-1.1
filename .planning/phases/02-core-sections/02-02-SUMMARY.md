---
phase: 02-core-sections
plan: 02
subsystem: ui
tags: [nextjs, react, tailwindcss, hero-section, server-component, lucide-react]

# Dependency graph
requires:
  - phase: 02-01
    provides: typography tokens (text-h2-u, text-para-m, text-code-m, text-button-u), test stack (vitest + RTL)

provides:
  - Complete hero section with split layout (text left, portrait right)
  - Profile photo at /profile.jpg (placeholder)
  - HERO-01 through HERO-05 requirements satisfied

affects:
  - Phase 02-03 (About section will share heading pattern from hero)
  - Phase 02-04 (Skills/Experience use same layout conventions)
  - Phase 04 (Animations target heroSection structure)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - Server Component hero section (no 'use client')
    - SOCIAL_LINKS constant array with 'as const' for social icon row
    - Button asChild pattern (Radix Slot) for CTA anchor wrapping
    - Native anchor with download attribute for CV download (no JS)

key-files:
  created:
    - public/profile.jpg
  modified:
    - app/ui/homepage/heroSection.tsx

key-decisions:
  - "Used native anchor <a href='/mujeeb-resume.pdf' download='Mujeeb-ur-Rahman-CV.pdf'> inside Button asChild for CV download — avoids JS, works without hydration"
  - "profile.jpg placeholder is a copy of aboutImage.png — must be replaced with real photo before launch"
  - "SOCIAL_LINKS defined as module-level const (not inside component) — computed once at module load, not per render"

patterns-established:
  - "Social icon row: SOCIAL_LINKS constant array with icon, href, label, external — map to Link elements with conditional target/rel"
  - "CTA primary button: bg-brand1 text-black hover:bg-brand1/90 (overrides shadcn default for brand accent color)"

requirements-completed: [HERO-01, HERO-02, HERO-03, HERO-04, HERO-05]

# Metrics
duration: 8min
completed: 2026-03-18
---

# Phase 2 Plan 02: Hero Section Summary

**Split-layout heroSection.tsx rebuilt as Server Component — h1 name, h2 title, PERSONAL_INFO bio, portrait photo with cyan glow, Contact Me + Download CV CTAs, GitHub/LinkedIn/Email/WhatsApp social icons**

## Performance

- **Duration:** ~8 min
- **Started:** 2026-03-18T22:10:00Z
- **Completed:** 2026-03-18T22:13:40Z
- **Tasks:** 1 (TDD: RED already existed, GREEN implemented)
- **Files modified:** 2

## Accomplishments

- Rebuilt heroSection.tsx from scratch — replaced card-based old layout with two-column split layout per UI-SPEC
- All content sourced from PERSONAL_INFO (no hardcoded strings)
- All 5 HERO requirement tests pass (HERO-01 through HERO-05)
- public/profile.jpg created (placeholder copy of aboutImage.png, must be replaced before launch)
- Server Component — no 'use client' directive

## Task Commits

1. **Task 1: Rebuild heroSection.tsx from scratch** - `e40d064` (feat)

## Files Created/Modified

- `app/ui/homepage/heroSection.tsx` - Complete rebuild: split layout, photo, CTAs, social links, all from PERSONAL_INFO
- `public/profile.jpg` - Placeholder hero portrait (copy of aboutImage.png)

## Decisions Made

- Used native `<a href="/mujeeb-resume.pdf" download="Mujeeb-ur-Rahman-CV.pdf">` inside `Button asChild` for CV download — avoids any JS dependency, works server-side
- `SOCIAL_LINKS` array defined at module scope (not inside component body) — computed once at module load, not per render cycle
- Profile photo placeholder is a copy of `aboutImage.png` — real photo must be provided and placed at `public/profile.jpg` before launch

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

Pre-existing TypeScript errors in `app/ui/homepage/skillsSection.tsx` (SiAmazonaws and SiCss3 icon name changes in react-icons) cause `bun run build` to fail. These errors pre-date this plan and are logged in `deferred-items.md` for resolution in Plan 02-03 (Skills section).

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Hero section complete and fully tested (5/5 HERO requirements)
- heroSection.tsx is a Server Component, ready for animation wrappers in Phase 4
- public/profile.jpg placeholder in place — real photo must be provided before launch (tracked in STATE.md blockers)
- Resume PDF blocker (public/mujeeb-resume.pdf) still outstanding — CV download link exists, browser shows 404 until PDF is provided
- Plan 02-03 (Skills section) ready to begin — must also fix skillsSection.tsx icon name errors

---
*Phase: 02-core-sections*
*Completed: 2026-03-18*
