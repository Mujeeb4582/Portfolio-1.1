# Deferred Items — Phase 02 Core Sections

## Pre-existing Issues (Out of Scope)

### skillsSection.tsx TypeScript Errors

**Discovered during:** Plan 02-02 (heroSection rebuild)
**Status:** Pre-existing (not introduced by this plan)
**Files:** `app/ui/homepage/skillsSection.tsx`

```
app/ui/homepage/skillsSection.tsx(9,3): error TS2305: Module '"react-icons/si"' has no exported member 'SiAmazonaws'.
app/ui/homepage/skillsSection.tsx(11,3): error TS2724: '"react-icons/si"' has no exported member named 'SiCss3'. Did you mean 'SiCss'?
```

**Root cause:** `SiAmazonaws` was renamed to `SiAmazon` and `SiCss3` was renamed to `SiCss` in recent react-icons versions.
**Fix needed in:** Plan 02-03 (Skills section implementation) — update icon names to match current react-icons/si exports.
**Build impact:** `bun run build` fails due to this error. Will be resolved in Plan 02-03.
