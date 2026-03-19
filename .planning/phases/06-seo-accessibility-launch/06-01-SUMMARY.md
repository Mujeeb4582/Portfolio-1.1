---
phase: 06-seo-accessibility-launch
plan: 01
subsystem: seo-metadata
tags: [seo, metadata, opengraph, json-ld, sitemap, robots]
dependency_graph:
  requires: []
  provides: [seo-metadata, og-image, robots-txt, sitemap-xml]
  affects: [app/layout.tsx]
tech_stack:
  added: []
  patterns: [next-metadata-api, next-og-image, app-router-special-routes, json-ld-schema]
key_files:
  created:
    - app/opengraph-image.tsx
    - app/robots.ts
    - app/sitemap.ts
  modified:
    - app/layout.tsx
decisions:
  - "All metadata values sourced from PERSONAL_INFO constant — no hardcoded strings in layout.tsx"
  - "JSON-LD object extracted to module-scope const before RootLayout — avoids inline object creation per render"
  - "opengraph-image.tsx uses brand colors from design system (#1A1E23 bg, #12F7D6 accent, #98FAEC secondary)"
  - "metadataBase set to https://mujeeb.vercel.app — can be updated post-deploy if URL changes"
metrics:
  duration_seconds: 86
  completed_date: "2026-03-20"
  tasks_completed: 2
  files_modified: 4
---

# Phase 6 Plan 01: SEO Metadata and Discoverability Summary

Next.js App Router metadata with expanded title/description/OG tags, dynamic 1200x630 Open Graph image via ImageResponse, JSON-LD Person schema, robots.txt allowing all crawlers, and sitemap.xml listing the portfolio root URL.

## Tasks Completed

| # | Task | Commit | Key Files |
|---|------|--------|-----------|
| 1 | Expand metadata export and add JSON-LD Person schema to layout.tsx | 0af82a8 | app/layout.tsx |
| 2 | Create opengraph-image.tsx, robots.ts, and sitemap.ts | 20b8158 | app/opengraph-image.tsx, app/robots.ts, app/sitemap.ts |

## What Was Built

### Task 1 — layout.tsx metadata expansion
- Replaced minimal `{ title: 'Mujeeb Portfolio', description: 'Check out my portfolio' }` with full metadata object
- Title: `Mujeeb ur Rahman | Full-Stack Web Developer` (from PERSONAL_INFO)
- Description: first 160 chars of PERSONAL_INFO.bio
- Full `openGraph` block: title, description, url, siteName, images (referencing `/opengraph-image`), locale, type
- `twitter` block: `summary_large_image` card
- `metadataBase`: `https://mujeeb.vercel.app`
- JSON-LD Person schema inlined via `<script type="application/ld+json">` in `<head>`: name, jobTitle, email, url, sameAs (GitHub + LinkedIn)

### Task 2 — Special App Router routes
- **opengraph-image.tsx**: Dynamic OG image (1200x630 PNG) using Next.js `ImageResponse`. Dark background (#1A1E23), name in white 64px, title in brand cyan (#12F7D6), tech stack in secondary (#98FAEC). Exports `alt`, `size`, `contentType` as required.
- **robots.ts**: Allows all crawlers (`userAgent: '*', allow: '/'`), references `/sitemap.xml`
- **sitemap.ts**: Lists portfolio root URL with `monthly` changeFrequency and priority `1`

## Verification Results

- `bunx tsc --noEmit`: exits with code 0 (no type errors)
- `bun run build`: completed successfully
- Build output confirms routes: `/opengraph-image`, `/robots.txt`, `/sitemap.xml` all prerendered as static

## Deviations from Plan

None — plan executed exactly as written.

## Self-Check: PASSED

- [x] app/layout.tsx exists and contains openGraph, application/ld+json, metadataBase
- [x] app/opengraph-image.tsx exists with ImageResponse
- [x] app/robots.ts exists with MetadataRoute.Robots
- [x] app/sitemap.ts exists with MetadataRoute.Sitemap
- [x] Commit 0af82a8 exists (Task 1)
- [x] Commit 20b8158 exists (Task 2)
- [x] bun run build succeeds
