# Requirements: Mujeeb ur Rahman — Portfolio Revamp

**Defined:** 2026-03-18
**Core Value:** Visitors can immediately understand Mujeeb's capabilities and experience through a clean, professional presentation of his best work

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Foundation & Stack Upgrade

- [x] **FOUND-01**: Project upgrades to Next.js 16 with Turbopack and React Compiler enabled
- [x] **FOUND-02**: Project upgrades to React 19 with all deprecated APIs resolved
- [x] **FOUND-03**: Tailwind CSS migrates from v3 to v4 with CSS-first config (`@theme {}` directives)
- [x] **FOUND-04**: shadcn/ui updates to v4 with Tailwind v4 compatibility
- [x] **FOUND-05**: All existing components compile and render correctly after upgrade
- [x] **FOUND-06**: Dark mode toggle works correctly with Tailwind v4 `@custom-variant`
- [x] **FOUND-07**: Dead code, unused imports, and placeholder content are removed
- [x] **FOUND-08**: Data constants file (`constant.ts`) expanded with all portfolio content (projects, experience, skills, personal info)
- [x] **FOUND-09**: TypeScript interfaces defined for all data structures (Project, Experience, Skill, etc.)

### Navigation

- [x] **NAV-01**: Sticky navbar with smooth-scroll anchor links to all sections
- [x] **NAV-02**: Mobile hamburger menu with slide-in navigation
- [x] **NAV-03**: Active section indicator highlights current section in navbar
- [x] **NAV-04**: Theme toggle (light/dark) works with system preference auto-detection

### Hero Section

- [x] **HERO-01**: Clean, minimal hero with name, title ("Full-Stack Web Developer"), and tagline
- [x] **HERO-02**: Professional avatar/photo with styled presentation
- [x] **HERO-03**: Primary CTA button ("Contact Me") and secondary CTA ("Download CV")
- [x] **HERO-04**: Social links (GitHub, LinkedIn, WhatsApp, Email) visible in hero
- [x] **HERO-05**: Download CV button serves actual PDF resume file

### About Section

- [x] **ABOUT-01**: Professional bio summarizing experience and expertise
- [x] **ABOUT-02**: Key stats/metrics display (years experience, projects completed, technologies)
- [x] **ABOUT-03**: Clean layout with professional image

### Skills Section

- [x] **SKILL-01**: Skills organized by category (Frontend, Backend, Mobile, LLM/AI, Tools)
- [x] **SKILL-02**: Visual skill display with technology icons/logos
- [x] **SKILL-03**: All skills from resume represented accurately

### Projects Section

- [x] **PROJ-01**: 6 featured projects displayed with title, description, and tech stack badges
- [x] **PROJ-02**: Each project shows screenshot/preview image
- [x] **PROJ-03**: Each project links to live demo (if available) and/or GitHub repository
- [x] **PROJ-04**: Projects include: Buildable, MISA App, Uber-like App, Re-View, LSTN, WellShared
- [x] **PROJ-05**: Project cards differentiate between web and mobile projects visually

### Experience Section

- [x] **EXP-01**: Timeline display of work experience in chronological order
- [x] **EXP-02**: Each role shows company, title, date range, and key responsibilities
- [x] **EXP-03**: Experience includes: Wonder Crafts, Techiosis, RGX Labs, Microverse
- [x] **EXP-04**: Education section (Microverse, NUCES-FAST)

### Contact Section

- [x] **CONT-01**: Contact form with name, email, and message fields
- [x] **CONT-02**: Form validation with clear error messages (Zod + React Hook Form)
- [x] **CONT-03**: Form submission sends email via Resend API route
- [x] **CONT-04**: Success/error feedback after form submission
- [x] **CONT-05**: Direct contact links (email, WhatsApp, LinkedIn, GitHub) alongside form

### Animations & Interactions

- [x] **ANIM-01**: Subtle scroll-reveal animations on section entry using Motion library
- [x] **ANIM-02**: Hover effects on interactive elements (buttons, cards, links)
- [x] **ANIM-03**: Respects `prefers-reduced-motion` user preference

### SEO & Performance

- [x] **SEO-01**: Meta tags (title, description) on all pages
- [x] **SEO-02**: Open Graph tags with custom OG image for social sharing
- [x] **SEO-03**: JSON-LD structured data (Person schema)
- [x] **SEO-04**: Lighthouse performance score 90+
- [x] **SEO-05**: Images optimized (WebP format, proper sizing, lazy loading)

### Accessibility

- [x] **A11Y-01**: Full keyboard navigation across all interactive elements
- [x] **A11Y-02**: Visible focus indicators on all focusable elements
- [x] **A11Y-03**: Color contrast ratio meets WCAG 2.2 AA (4.5:1 minimum)
- [x] **A11Y-04**: Semantic HTML with proper heading hierarchy and landmarks

### Deployment

- [x] **DEPLOY-01**: Vercel deployment configured and functional
- [x] **DEPLOY-02**: Responsive design works on mobile, tablet, and desktop

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Enhancements

- **ENH-01**: Blog/articles section with MDX support
- **ENH-02**: Testimonials/recommendations section
- **ENH-03**: Project filtering by technology
- **ENH-04**: Analytics integration (Vercel Analytics or Plausible)
- **ENH-05**: Multi-language support (Urdu, Arabic)
- **ENH-06**: Interactive 3D elements or particle effects

## Out of Scope

| Feature | Reason |
|---------|--------|
| CMS integration | Content is static, managed in code — no need for CMS complexity |
| Backend API (beyond contact) | Portfolio is purely frontend |
| Real-time chat widget | Over-engineered for a portfolio |
| OAuth/authentication | No user accounts needed |
| E-commerce/payments | Not a commercial site |
| Mobile app version | Web-only is sufficient |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| FOUND-01 | Phase 1 | Complete |
| FOUND-02 | Phase 1 | Complete |
| FOUND-03 | Phase 1 | Complete |
| FOUND-04 | Phase 1 | Complete |
| FOUND-05 | Phase 1 | Complete |
| FOUND-06 | Phase 1 | Complete |
| FOUND-07 | Phase 1 | Complete |
| FOUND-08 | Phase 1 | Complete |
| FOUND-09 | Phase 1 | Complete |
| NAV-04 | Phase 1 | Complete |
| HERO-01 | Phase 2 | Complete |
| HERO-02 | Phase 2 | Complete |
| HERO-03 | Phase 2 | Complete |
| HERO-04 | Phase 2 | Complete |
| HERO-05 | Phase 2 | Complete |
| ABOUT-01 | Phase 2 | Complete |
| ABOUT-02 | Phase 2 | Complete |
| ABOUT-03 | Phase 2 | Complete |
| SKILL-01 | Phase 2 | Complete |
| SKILL-02 | Phase 2 | Complete |
| SKILL-03 | Phase 2 | Complete |
| EXP-01 | Phase 2 | Complete |
| EXP-02 | Phase 2 | Complete |
| EXP-03 | Phase 2 | Complete |
| EXP-04 | Phase 2 | Complete |
| PROJ-01 | Phase 3 | Complete |
| PROJ-02 | Phase 3 | Complete |
| PROJ-03 | Phase 3 | Complete |
| PROJ-04 | Phase 3 | Complete |
| PROJ-05 | Phase 3 | Complete |
| NAV-01 | Phase 4 | Complete |
| NAV-02 | Phase 4 | Complete |
| NAV-03 | Phase 4 | Complete |
| ANIM-01 | Phase 4 | Complete |
| ANIM-02 | Phase 4 | Complete |
| ANIM-03 | Phase 4 | Complete |
| DEPLOY-02 | Phase 4 | Complete |
| CONT-01 | Phase 5 | Complete |
| CONT-02 | Phase 5 | Complete |
| CONT-03 | Phase 5 | Complete |
| CONT-04 | Phase 5 | Complete |
| CONT-05 | Phase 5 | Complete |
| SEO-01 | Phase 6 | Complete |
| SEO-02 | Phase 6 | Complete |
| SEO-03 | Phase 6 | Complete |
| SEO-04 | Phase 6 | Complete |
| SEO-05 | Phase 6 | Complete |
| A11Y-01 | Phase 6 | Complete |
| A11Y-02 | Phase 6 | Complete |
| A11Y-03 | Phase 6 | Complete |
| A11Y-04 | Phase 6 | Complete |
| DEPLOY-01 | Phase 6 | Complete |

**Coverage:**
- v1 requirements: 47 total
- Mapped to phases: 47
- Unmapped: 0 ✓

**Phase breakdown:**
- Phase 1 (Foundation): 10 requirements — FOUND-01 through FOUND-09, NAV-04
- Phase 2 (Core Sections): 15 requirements — HERO-01 to HERO-05, ABOUT-01 to ABOUT-03, SKILL-01 to SKILL-03, EXP-01 to EXP-04
- Phase 3 (Projects Section): 5 requirements — PROJ-01 to PROJ-05
- Phase 4 (Navigation + Animations): 7 requirements — NAV-01 to NAV-03, ANIM-01 to ANIM-03, DEPLOY-02
- Phase 5 (Contact Form): 5 requirements — CONT-01 to CONT-05
- Phase 6 (SEO + Accessibility + Launch): 10 requirements — SEO-01 to SEO-05, A11Y-01 to A11Y-04, DEPLOY-01

---
*Requirements defined: 2026-03-18*
*Last updated: 2026-03-18 — traceability finalized after roadmap creation*
