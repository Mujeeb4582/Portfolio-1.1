---
phase: 06-seo-accessibility-launch
plan: 03
subsystem: ui
tags: [next-image, webp, image-optimization, lighthouse, seo]

# Dependency graph
requires:
  - phase: 06-01
    provides: SEO metadata foundation and project card aria attributes
provides:
  - next/image sizes attribute on all project screenshots for correct srcset generation
  - next.config.ts images block with WebP format, 30-day cache TTL, and device/image size arrays
affects: [lighthouse-performance, core-web-vitals]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "next/image fill prop with sizes attribute for container-based responsive images"
    - "next.config.ts images block centralizes all image optimization config"

key-files:
  created: []
  modified:
    - app/ui/homepage/projectsSection.tsx
    - next.config.ts

key-decisions:
  - "Kept fill prop (not explicit width/height) on project images — containers have fixed CSS heights, fill is correct pattern; added sizes for srcset"
  - "BrowserFrame sizes: (max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px — matches 2-col grid layout"
  - "PhoneFrame sizes: (max-width: 768px) 50vw, 280px — matches max-w-[220px] phone bezel constraint"

patterns-established:
  - "All fill-based next/image components must include a sizes attribute for proper srcset generation"

requirements-completed: [SEO-04, SEO-05]

# Metrics
duration: 5min
completed: 2026-03-20
---

# Phase 6 Plan 03: Image Optimization Summary

**next/image sizes attributes added to all project screenshots plus next.config.ts images block with WebP format, 30-day cache TTL, and responsive deviceSizes/imageSizes arrays**

## Performance

- **Duration:** 5 min
- **Started:** 2026-03-19T19:48:19Z
- **Completed:** 2026-03-19T19:53:00Z
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments
- Added `sizes` attribute to BrowserFrame and PhoneFrame next/image components — enables proper WebP srcset generation for responsive delivery
- Configured `next.config.ts` images block with WebP format, 30-day minimumCacheTTL, standard deviceSizes and imageSizes arrays
- `bun run build` completes with no image optimization warnings

## Task Commits

Each task was committed atomically:

1. **Task 1: Audit projectsSection.tsx and migrate any raw img tags to next/image** - `67441ce` (feat)
2. **Task 2: Configure next.config.ts image optimization settings** - `c48a38c` (feat)

## Files Created/Modified
- `app/ui/homepage/projectsSection.tsx` - Added `sizes` prop to BrowserFrame and PhoneFrame Image components
- `next.config.ts` - Added images config block with WebP format, cache TTL, deviceSizes, imageSizes

## Decisions Made
- Kept `fill` prop (not explicit `width`/`height`) — project image containers have fixed CSS heights, `fill` is correct; added `sizes` for srcset
- BrowserFrame `sizes`: matches 2-column responsive grid layout (100vw mobile, 50vw tablet, 600px desktop)
- PhoneFrame `sizes`: matches `max-w-[220px]` phone bezel (50vw mobile, 280px desktop)

## Deviations from Plan

None - plan executed exactly as written. The `projectsSection.tsx` already used `next/image` import and `fill` prop; the only missing piece was `sizes` attributes, which the plan specified.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- Image optimization complete — eliminates "Image missing sizes" Lighthouse warnings
- WebP format configured — all project screenshots served as WebP via next/image runtime
- Ready for Phase 6 Plan 04 (final Lighthouse audit and launch)

---
*Phase: 06-seo-accessibility-launch*
*Completed: 2026-03-20*
