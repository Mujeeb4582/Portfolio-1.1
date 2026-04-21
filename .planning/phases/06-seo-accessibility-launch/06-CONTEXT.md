# Phase 6: SEO + Accessibility + Launch - Context

**Gathered:** 2026-03-20
**Status:** Ready for planning

<domain>
## Phase Boundary

Add SEO meta tags, Open Graph social sharing, JSON-LD structured data, image optimization, keyboard navigation, visible focus indicators, WCAG 2.2 AA color contrast, semantic HTML audit, Lighthouse 90+ optimization, and Vercel deployment. This is the final phase before v1.0 launch.

</domain>

<decisions>
## Implementation Decisions

### Claude's Discretion
All design decisions are at Claude's discretion for this phase. The user chose to skip discussion — Phase 6 is primarily technical configuration following web standards and best practices.

Decisions to make during planning/implementation:
- Meta title and description text (SEO-01)
- OG image approach: auto-generated via Next.js `opengraph-image.tsx` or static custom image (SEO-02)
- JSON-LD Person schema fields and content (SEO-03)
- Image optimization strategy: WebP conversion, sizing, lazy loading (SEO-05)
- Focus indicator styling: ring color, width, offset (A11Y-02)
- Color contrast audit approach and any fixes needed (A11Y-03)
- Semantic HTML improvements: heading hierarchy, landmarks, ARIA labels (A11Y-04)
- Vercel project configuration and deployment setup (DEPLOY-01)
- Lighthouse optimization techniques for 90+ score (SEO-04)

### Locked by Requirements
- Meta tags on all pages (SEO-01)
- Open Graph tags with custom OG image (SEO-02)
- JSON-LD structured data with Person schema (SEO-03)
- Lighthouse performance score 90+ (SEO-04)
- Images optimized: WebP, proper sizing, lazy loading (SEO-05)
- Full keyboard navigation (A11Y-01)
- Visible focus indicators (A11Y-02)
- WCAG 2.2 AA color contrast 4.5:1 minimum (A11Y-03)
- Semantic HTML with proper heading hierarchy and landmarks (A11Y-04)
- Vercel deployment configured and functional (DEPLOY-01)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Existing Codebase
- `app/layout.tsx` — Root layout with metadata export, font config, providers
- `app/page.tsx` — Homepage composing all sections
- `app/globals.css` — Theme tokens, CSS variables, color definitions
- `app/lib/constant.ts` — PERSONAL_INFO with name, title, bio for meta content

### Prior Phase Context
- `.planning/phases/01-foundation/01-CONTEXT.md` — Design tokens, brand colors
- `.planning/phases/02-core-sections/02-UI-SPEC.md` — Color system (for contrast audit)

### Project Context
- `.planning/REQUIREMENTS.md` — Phase 6 requirements: SEO-01 to SEO-05, A11Y-01 to A11Y-04, DEPLOY-01
- `.planning/PROJECT.md` — Personal details for JSON-LD schema

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `app/layout.tsx`: Already has a `metadata` export — needs expansion with OG tags
- `app/lib/constant.ts`: PERSONAL_INFO has name, title, email, bio — source for meta content
- Next.js App Router metadata API — use `generateMetadata` or static `metadata` export

### Established Patterns
- Next.js 16 App Router with Turbopack
- `next/image` used throughout — already optimized with lazy loading
- All sections have `id` attributes and `aria-labelledby`
- Three themes (light/dark/midnight_steel) — contrast must pass in all

### Integration Points
- `app/layout.tsx`: Metadata, JSON-LD script tag, OG image route
- `app/opengraph-image.tsx`: New file for dynamic OG image generation (or static in public/)
- `app/robots.ts`: New file for robots.txt
- `app/sitemap.ts`: New file for sitemap.xml
- Vercel: `vercel.json` or dashboard config, environment variables

</code_context>

<specifics>
## Specific Ideas

No specific requirements — follow web standards and Next.js best practices.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 06-seo-accessibility-launch*
*Context gathered: 2026-03-20*
