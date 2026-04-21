# Phase 4: Navigation + Animations - Context

**Gathered:** 2026-03-19
**Status:** Ready for planning

<domain>
## Phase Boundary

Add smooth-scroll navigation with active section indicator, mobile hamburger menu, and scroll-reveal animations to the existing portfolio sections. The navbar (`app/ui/navbar.tsx`) is currently a shell with only ThemeToggle — it needs a full rebuild. All section IDs and nav links come from `NAV_LINKS` in `constant.ts`. Responsive design must work across mobile, tablet, and desktop.

</domain>

<decisions>
## Implementation Decisions

### Navbar Design
- Sticky at top with semi-transparent background and backdrop-blur on scroll
- Brand/logo area shows "Mujeeb" (or similar short name) in bold Inter with cyan accent — text logo, no image
- Desktop: horizontal nav links + ThemeToggle visible
- Links come from `NAV_LINKS` constant in `constant.ts`
- Smooth scroll to target section on link click (CSS `scroll-behavior: smooth` or JS-based)

### Active Section Indicator
- Cyan (#12F7D6) underline below the active nav link
- Transitions smoothly between links as user scrolls through sections
- Uses IntersectionObserver to detect which section is in viewport

### Mobile Menu
- Full-screen overlay with centered nav links
- Hamburger icon: three animated bars that transition to X on open (pure CSS)
- Menu closes on: link click, X button, or outside click
- Dark overlay background, links in large readable size

### Scroll-Reveal Animations
- Fade-up style: elements fade in while moving 20-30px upward
- Animate: section headings first, then cards/content stagger in
- Library: Motion (framer-motion) — required by ANIM-01 requirement
- Respects `prefers-reduced-motion`: animations absent or reduced when OS setting enabled (ANIM-03)

### Hover Effects (ANIM-02)
- Claude's Discretion: hover effects on interactive elements (buttons, cards, links)
- Keep consistent with existing card hover patterns from Phase 2/3

### Responsive Design (DEPLOY-02)
- Claude's Discretion: breakpoint handling for all sections
- Navbar collapses to hamburger on mobile (< 768px)
- All existing sections must remain responsive

### Claude's Discretion
- Hover effect specifics on buttons and links
- Animation duration and easing
- Stagger delay between animated elements
- Navbar scroll threshold for background change
- Mobile menu animation (fade, slide, scale)
- Breakpoint-specific adjustments

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Data Layer
- `app/lib/constant.ts` — NAV_LINKS array (section names + href anchors)
- `app/lib/types.ts` — NavLink interface

### Existing Components
- `app/ui/navbar.tsx` — Current shell navbar (needs full rebuild)
- `app/ui/theme/theme-toggle.tsx` — ThemeToggle component (preserve in rebuilt navbar)
- `app/ui/theme/clientThemeProvider.tsx` — Theme provider wrapper

### Prior Phase Context
- `.planning/phases/01-foundation/01-CONTEXT.md` — Design tokens, Brittany Chiang inspiration
- `.planning/phases/02-core-sections/02-UI-SPEC.md` — Typography tokens, color system, spacing scale
- `.planning/phases/03-projects-section/03-UI-SPEC.md` — Card hover patterns

### Project Context
- `.planning/REQUIREMENTS.md` — Phase 4 requirements: NAV-01 to NAV-03, ANIM-01 to ANIM-03, DEPLOY-02

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `app/ui/theme/theme-toggle.tsx`: ThemeToggle dropdown — must be preserved in rebuilt navbar
- `app/lib/constant.ts`: NAV_LINKS array with section names and hrefs
- `app/lib/utils.ts`: `cn()` helper for conditional classes
- `app/ui/button.tsx`: shadcn Button — available for nav link styling

### Established Patterns
- Server Components by default; `'use client'` needed for navbar (scroll state, mobile menu toggle)
- `app/page.tsx` composes sections with IDs for anchor linking
- Sections already have heading patterns (h2 + UnderLine) that can serve as animation targets
- Three themes (light/dark/midnight_steel) — navbar must work with all

### Integration Points
- `app/ui/navbar.tsx`: Full rebuild — currently only has ThemeToggle
- `app/layout.tsx`: Navbar is rendered here, wraps entire app
- `app/page.tsx`: Section components need `id` attributes for anchor scroll targets
- Each section component in `app/ui/homepage/`: May need wrapper for scroll-reveal animation

</code_context>

<specifics>
## Specific Ideas

- Brittany Chiang inspired — minimal, clean navbar with subtle blur effect
- Cyan underline for active section matches the brand accent usage throughout the site
- Full-screen mobile overlay is dramatic but clean — centered large links
- Animated hamburger bars → X adds a polished touch
- Motion (framer-motion) is the industry standard for React animations — good ecosystem support

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 04-navigation-animations*
*Context gathered: 2026-03-19*
