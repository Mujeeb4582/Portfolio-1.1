# Roadmap: Mujeeb ur Rahman — Portfolio Revamp

## Overview

This roadmap transforms a stale brownfield Next.js 15 / React 18 / Tailwind v3 portfolio into a modern, minimal, and launch-ready developer portfolio on the latest stack. Work flows from dependency-first to content-second to polish-last: the migration is de-risked in Phase 1 before any content work touches it, sections are built in Phase 2 and 3, wired together in Phase 4, the contact form isolated in Phase 5, and SEO plus accessibility gatekeep the final deployment in Phase 6.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Foundation** - Upgrade stack to Next.js 16 + React 19 + Tailwind v4, resolve all migration pitfalls, define types and content constants (completed 2026-03-18)
- [x] **Phase 2: Core Sections** - Build Hero, About, Skills, and Experience sections with real content (completed 2026-03-18)
- [x] **Phase 3: Projects Section** - Build the 6 featured project cards with screenshots, tech badges, and links (completed 2026-03-19)
- [ ] **Phase 4: Navigation + Animations** - Wire sticky nav, smooth scroll, active section highlight, mobile menu, and scroll-reveal animations
- [ ] **Phase 5: Contact Form** - Build contact section with Resend email API route and form validation
- [ ] **Phase 6: SEO + Accessibility + Launch** - Apply metadata, Open Graph, JSON-LD, WCAG audit, Lighthouse 90+, and Vercel deploy

## Phase Details

### Phase 1: Foundation
**Goal**: The codebase compiles and runs correctly on Next.js 16 + React 19 + Tailwind v4 with dark mode functional, all migration pitfalls resolved, and all portfolio content defined in typed constants ready for section work
**Depends on**: Nothing (first phase)
**Requirements**: FOUND-01, FOUND-02, FOUND-03, FOUND-04, FOUND-05, FOUND-06, FOUND-07, FOUND-08, FOUND-09, NAV-04
**Success Criteria** (what must be TRUE):
  1. `bun run dev` starts without errors on Next.js 16 with Turbopack and React 19
  2. Dark mode toggle switches correctly between light and dark using Tailwind v4 `@custom-variant`
  3. All existing components render without visual regressions after the upgrade
  4. `constant.ts` contains all real portfolio content (projects, experience, skills, personal info) with TypeScript interfaces
  5. Dead code, placeholder content, and unused files are absent from the project
**Plans**: 4 plans

Plans:
- [ ] 01-01-PLAN.md — pnpm to bun migration + Next.js 16 + React 19 upgrade
- [ ] 01-02-PLAN.md — Tailwind v4 migration + dark mode fix + shadcn re-init
- [ ] 01-03-PLAN.md — ESLint flat config + Inter/JetBrains fonts + dead code cleanup
- [ ] 01-04-PLAN.md — TypeScript interfaces (types.ts) + full constant.ts data population

### Phase 2: Core Sections
**Goal**: Visitors can read Mujeeb's identity, expertise, and career history through fully built Hero, About, Skills, and Experience sections using real content
**Depends on**: Phase 1
**Requirements**: HERO-01, HERO-02, HERO-03, HERO-04, HERO-05, ABOUT-01, ABOUT-02, ABOUT-03, SKILL-01, SKILL-02, SKILL-03, EXP-01, EXP-02, EXP-03, EXP-04
**Success Criteria** (what must be TRUE):
  1. Visitor sees name, title, tagline, professional photo, GitHub/LinkedIn/Email/WhatsApp links, and two CTA buttons on first view
  2. "Download CV" button downloads an actual PDF resume file
  3. Skills section displays all technologies organized by category (Frontend, Backend, Mobile, LLM/AI, Tools) with icons
  4. Experience timeline shows all four roles (Wonder Crafts, Techiosis, RGX Labs, Microverse) plus education in chronological order with dates and responsibilities
  5. About section shows real bio, key stats, and professional photo
**Plans**: 5 plans

Plans:
- [ ] 02-01-PLAN.md — Prerequisites: typography tokens, test scaffold (vitest), react-icons install, placeholder PDF
- [ ] 02-02-PLAN.md — Hero section rebuild: split layout, photo, CTAs, social links (HERO-01 to HERO-05)
- [ ] 02-03-PLAN.md — About section rebuild: bio text, stats grid, no duplicate photo (ABOUT-01 to ABOUT-03)
- [ ] 02-04-PLAN.md — Skills section rebuild: category cards with react-icons/si brand icons (SKILL-01 to SKILL-03)
- [ ] 02-05-PLAN.md — Experience section + page wiring + visual checkpoint (EXP-01 to EXP-04)

### Phase 3: Projects Section
**Goal**: Visitors can browse all 6 featured projects and understand what each one does, what tech was used, and how to see it live or in source
**Depends on**: Phase 2
**Requirements**: PROJ-01, PROJ-02, PROJ-03, PROJ-04, PROJ-05
**Success Criteria** (what must be TRUE):
  1. All 6 projects (Buildable, MISA App, Uber-like App, Re-View, LSTN, WellShared) are visible with title, description, and tech stack badges
  2. Each project card shows a screenshot or preview image
  3. Each project has working links to live demo and/or GitHub repository where available
  4. Web and mobile projects are visually distinguishable from each other
**Plans**: 2 plans

Plans:
- [ ] 03-01-PLAN.md — Build projectsSection.tsx: BrowserFrame + PhoneFrame + ProjectCard + FeaturedProjectCard (PROJ-01 to PROJ-05)
- [ ] 03-02-PLAN.md — Tests + page wiring + visual checkpoint (PROJ-01 to PROJ-05)

### Phase 4: Navigation + Animations
**Goal**: Users can navigate the portfolio smoothly from any device, the active section is clearly indicated, and section content enters with subtle, accessible animations
**Depends on**: Phase 3
**Requirements**: NAV-01, NAV-02, NAV-03, ANIM-01, ANIM-02, ANIM-03, DEPLOY-02
**Success Criteria** (what must be TRUE):
  1. Clicking any navbar link scrolls smoothly to the correct section on desktop and mobile
  2. The navbar highlights the section currently in view as the user scrolls
  3. Mobile hamburger menu opens, shows all links, and closes after selecting one
  4. Section headings and cards animate in on scroll entry (not visible on first load until in view)
  5. Animations are absent or reduced when the OS `prefers-reduced-motion` setting is enabled
**Plans**: 5 plans

Plans:
- [ ] 04-01-PLAN.md — Install motion + MotionConfig + scroll-smooth + useActiveSection hook + test scaffolds
- [ ] 04-02-PLAN.md — Rebuild navbar: sticky, active indicator, mobile hamburger overlay (NAV-01, NAV-02, NAV-03, ANIM-02, DEPLOY-02)
- [ ] 04-03-PLAN.md — AnimateIn + StaggerChildren + StaggerItem wrappers (ANIM-01, ANIM-03)
- [ ] 04-04-PLAN.md — Wire animations into all sections + contact placeholder (ANIM-01, ANIM-02, DEPLOY-02)
- [ ] 04-05-PLAN.md — Visual checkpoint: nav, scroll-reveal, mobile, reduced-motion (all requirements)

### Phase 5: Contact Form
**Goal**: Visitors can send Mujeeb a message directly from the portfolio and reach him through direct contact channels
**Depends on**: Phase 4
**Requirements**: CONT-01, CONT-02, CONT-03, CONT-04, CONT-05
**Success Criteria** (what must be TRUE):
  1. Submitting the contact form with valid data delivers an email to mujeeburahman4582@gmail.com
  2. Submitting with invalid data shows clear, field-level error messages before sending
  3. After submission the user sees a success or error notification
  4. Email, WhatsApp, LinkedIn, and GitHub direct contact links are visible alongside the form
**Plans**: TBD

### Phase 6: SEO + Accessibility + Launch
**Goal**: The portfolio is fully discoverable by search engines and social sharing, meets WCAG 2.2 AA accessibility requirements, scores 90+ on Lighthouse, and is live on Vercel
**Depends on**: Phase 5
**Requirements**: SEO-01, SEO-02, SEO-03, SEO-04, SEO-05, A11Y-01, A11Y-02, A11Y-03, A11Y-04, DEPLOY-01
**Success Criteria** (what must be TRUE):
  1. Sharing the portfolio URL on LinkedIn or Twitter produces a rich preview card with title, description, and image
  2. Lighthouse reports 90+ on Performance, Accessibility, Best Practices, and SEO
  3. All interactive elements are reachable and operable using keyboard-only navigation with visible focus indicators
  4. The portfolio is live at a Vercel URL and auto-deploys on push to main
**Plans**: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5 → 6

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation | 5/5 | Complete   | 2026-03-18 |
| 2. Core Sections | 5/5 | Complete   | 2026-03-18 |
| 3. Projects Section | 2/2 | Complete   | 2026-03-19 |
| 4. Navigation + Animations | 3/5 | In Progress|  |
| 5. Contact Form | 0/TBD | Not started | - |
| 6. SEO + Accessibility + Launch | 0/TBD | Not started | - |

---
*Roadmap created: 2026-03-18*
*Requirements coverage: 47/47 v1 requirements mapped*
*Phase 1 planned: 2026-03-18 — 4 plans across 3 waves*
*Phase 2 planned: 2026-03-18 — 5 plans across 3 waves*
*Phase 3 planned: 2026-03-19 — 2 plans across 2 waves*
*Phase 4 planned: 2026-03-19 — 5 plans across 4 waves*
