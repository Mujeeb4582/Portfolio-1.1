# Architecture Patterns: Modern Developer Portfolio

**Domain:** Single-page developer portfolio (Next.js App Router, static content)
**Researched:** 2026-03-18
**Confidence:** HIGH — grounded in existing codebase analysis + verified patterns

---

## Recommended Architecture

The existing codebase already uses the right top-level pattern: a single route (`/`) that renders all sections
as a stacked, full-width flex column. The revamp preserves this structure and extends it — adding three missing
sections, wiring navigation to section IDs, and introducing a Server Action for the contact form.

```
app/
  layout.tsx                  ← Root layout: fonts, theme provider, persistent Navbar
  page.tsx                    ← Composes all 6 sections in order
  globals.css                 ← CSS variables per theme, base styles
  api/
    contact/
      route.ts                ← Server Action / API route for contact form email (Resend)
  lib/
    constant.ts               ← All static content data (skills, projects, experience, personal)
    utils.ts                  ← cn() helper
    types.ts                  ← Shared TypeScript interfaces (Project, Experience, Skill, etc.)
  ui/
    navbar.tsx                ← Fixed/sticky top nav with anchor links + ThemeToggle
    homepage/
      heroSection.tsx         ← Name, title, CTA buttons, social links, avatar
      aboutSection.tsx        ← Bio, background, professional image
      skillsSection.tsx       ← Tech stack grouped by category
      projectsSection.tsx     ← 6 project cards with image, tech, links
      experienceSection.tsx   ← Timeline of 4 work experiences
      contactSection.tsx      ← Contact form + direct links
    theme/
      clientThemeProvider.tsx ← Mount guard, wraps ThemeProvider
      theme-provider.tsx      ← next-themes NextThemesProvider wrapper
      theme-toggle.tsx        ← Dropdown UI for theme switching
    svgs/
      index.tsx               ← Custom inline SVG icons (HTML, CSS, JS, React)
    primitives/               ← (rename from flat app/ui/) shadcn/ui atoms
      avatar.tsx
      button.tsx
      card.tsx
      dropdown-menu.tsx
      input.tsx
      label.tsx
      badge.tsx               ← New: for tech stack tags on project cards
    animations/
      ScrollReveal.tsx        ← Reusable Framer Motion whileInView wrapper
public/
  profile.jpg                 ← Developer photo (self-hosted)
  resume.pdf                  ← Actual CV for download
  projects/                   ← Project screenshots (optimized WebP)
    buildable.webp
    misa.webp
    uber-like.webp
    re-view.webp
    lstn.webp
    wellshared.webp
```

---

## Component Boundaries

| Component | Responsibility | Communicates With |
|-----------|---------------|-------------------|
| `app/layout.tsx` | Fonts, global styles, ThemeProvider, Navbar | All pages via Next.js convention |
| `app/page.tsx` | Composes 6 sections in vertical order | All section components |
| `Navbar` | Fixed navigation, anchor scroll links, ThemeToggle | ThemeToggle; receives no props |
| `HeroSection` | Identity, avatar, primary CTAs (Download CV, contact jump) | `constant.ts` (personal data) |
| `AboutSection` | Bio paragraph, professional image, background context | `constant.ts` (bio data) |
| `SkillsSection` | Tech stack grouped into Frontend/Backend/Mobile/LLM/Tools | `constant.ts` (SKILLS array) |
| `ProjectsSection` | 6 project cards with image, description, tech tags, links | `constant.ts` (PROJECTS array) |
| `ExperienceSection` | Vertical timeline: 4 jobs with dates, roles, descriptions | `constant.ts` (EXPERIENCE array) |
| `ContactSection` | Form (name, email, message) + direct contact links | `app/api/contact/route.ts` |
| `ScrollReveal` | Wraps any child with Framer Motion `whileInView` fade-in | Used by section components |
| `app/api/contact/route.ts` | POST handler, validates payload, calls Resend API | Resend (external), ContactSection |
| `app/lib/constant.ts` | Single source of truth for all static content | All section components |
| `app/lib/types.ts` | Shared TS interfaces: Project, Experience, Skill, ContactInfo | constant.ts, section components |

**Isolation rule:** Section components own their own markup and internal layout. They receive no props from
`page.tsx`. All data is pulled directly from `constant.ts`. This keeps `page.tsx` as a pure compositor.

---

## Data Flow

### Static Content (All sections except Contact)

```
app/lib/constant.ts
  ↓ named exports (PERSONAL, SKILLS, PROJECTS, EXPERIENCE)
Section components (import directly)
  ↓ render
page.tsx (composes sections)
  ↓
Browser (static HTML + hydration)
```

No props chain. No global state. No API calls. Each section is independently responsible for importing what
it needs. This is intentional — adding or reordering a section does not require touching other sections.

### Theme State

```
ClientThemeProvider (app/layout.tsx)
  ↓ wraps entire app
ThemeProvider (next-themes NextThemesProvider)
  ↓ sets class on <html> element
CSS variables in globals.css respond to class (light / dark / midnight_steel)
  ↓ drives all color tokens via Tailwind CSS vars
ThemeToggle (Navbar) → calls useTheme().setTheme() to trigger switch
```

`mounted` guard in `ClientThemeProvider` prevents hydration mismatch — this pattern must be preserved when
upgrading to Tailwind v4, which changes how CSS variables are declared but not the mount pattern itself.

### Contact Form

```
ContactSection (Client Component, 'use client')
  ↓ user fills form
React Hook Form (client-side validation with Zod schema)
  ↓ onSubmit → fetch POST to /api/contact
app/api/contact/route.ts (Next.js Route Handler)
  ↓ server-side validation (Zod)
  ↓ Resend SDK → sends email to mujeeburahman4582@gmail.com
  ↓ returns { success: boolean, error?: string }
ContactSection → shows toast notification (success / error)
```

The contact API route is the only server-side runtime in this otherwise static portfolio. All other sections
are Server Components — no `'use client'` needed anywhere else.

### Navigation Scroll

```
Navbar anchor links (href="#section-id")
  ↓ CSS: html { scroll-behavior: smooth } in globals.css
  ↓ Next.js Link with scroll={false} prevents page-level scroll reset
Section containers have id="hero" | "about" | "skills" | "projects" | "experience" | "contact"
```

No JavaScript scroll library needed — pure CSS `scroll-behavior: smooth` plus native anchor links is
sufficient and zero-bundle-cost. The one known gap is Safari, which historically had issues; the fallback
is instant jump (acceptable, not broken).

### Scroll Reveal Animations

```
ScrollReveal component (Client Component, wraps Framer Motion motion.div)
  ↓ uses whileInView={{ opacity: 1, y: 0 }} + initial={{ opacity: 0, y: 20 }}
  ↓ useReducedMotion() disables animation when user prefers reduced motion
Section components wrap their primary content block in <ScrollReveal>
  ↓ Framer Motion triggers animation when element enters viewport
```

`ScrollReveal` is a single reusable wrapper component. Section components do not import Framer Motion
directly — they use `ScrollReveal`. This keeps animation logic centralized and easy to disable globally.

---

## Patterns to Follow

### Pattern 1: Self-Contained Section Components

**What:** Each section imports its own data from `constant.ts` and accepts no props from `page.tsx`.

**When:** Always — for all 6 section components.

**Why:** Keeps `page.tsx` as a pure compositor (6 lines). Sections are independently movable, testable, and
replaceable. Adding a new section = add one file + one import in `page.tsx`.

**Example:**
```typescript
// app/ui/homepage/projectsSection.tsx
import { PROJECTS } from '@/app/lib/constant'
import { ProjectCard } from '@/app/ui/homepage/projectCard'

export default function ProjectsSection() {
  return (
    <section id="projects" className="...">
      {PROJECTS.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </section>
  )
}
```

### Pattern 2: Typed Static Data in constant.ts

**What:** All content (personal info, skills, projects, experience) lives in `app/lib/constant.ts` as typed
arrays and objects, with interfaces defined in `app/lib/types.ts`.

**When:** Any time content would otherwise be hardcoded inline in a component.

**Why:** Single source of truth. Adding a project = one entry in the PROJECTS array, no component changes.
Keeps components logic-free and content-free — just shape-rendering.

**Example:**
```typescript
// app/lib/types.ts
export interface Project {
  id: string
  title: string
  description: string
  techStack: string[]
  imageUrl: string
  liveUrl?: string
  githubUrl?: string
  featured: boolean
}

// app/lib/constant.ts
export const PROJECTS: Project[] = [
  {
    id: 'buildable',
    title: 'Buildable',
    description: 'AI-powered real estate analytics platform for Dubai...',
    techStack: ['Next.js 15', 'React 19', 'FastAPI', 'Supabase', 'LiteLLM'],
    imageUrl: '/projects/buildable.webp',
    liveUrl: undefined,
    githubUrl: undefined,
    featured: true,
  },
  // ...
]
```

### Pattern 3: Server Components by Default, Client Only When Needed

**What:** All section components remain Server Components (no `'use client'`). Only add `'use client'` to
components that require browser APIs, event handlers, or React state.

**When:** Only `ContactSection`, `ScrollReveal`, `ThemeToggle`, `ClientThemeProvider`, and `Navbar` (if it
needs active-link highlighting via `usePathname`) need `'use client'`.

**Why:** Server Components ship zero JavaScript for their own code. For a static portfolio, most sections
have zero interactivity — they should stay on the server.

### Pattern 4: Reusable ScrollReveal Wrapper

**What:** A single `ScrollReveal` client component wraps Framer Motion logic. Section components import it
without knowing Framer Motion exists.

**Why:** Centralizes animation configuration. `useReducedMotion()` is handled once. Swapping Framer Motion
for another library means editing one file, not six.

**Example:**
```typescript
// app/ui/animations/ScrollReveal.tsx
'use client'
import { motion, useReducedMotion } from 'framer-motion'

interface Props {
  children: React.ReactNode
  delay?: number
  className?: string
}

export function ScrollReveal({ children, delay = 0, className }: Props) {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) return <div className={className}>{children}</div>

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
```

### Pattern 5: Contact Form with Server Action / Route Handler

**What:** Contact form uses React Hook Form (client-side) + Zod (validation) + fetch POST to
`/api/contact/route.ts` (server-side Resend call). No third-party form service needed.

**Why:** Keeps API key server-side (never exposed to browser). Resend provides reliable email delivery with
a generous free tier (100 emails/day). Zod validates on both client and server for defense in depth.

---

## Anti-Patterns to Avoid

### Anti-Pattern 1: Inline Hardcoded Content in Section Components

**What:** Writing project titles, descriptions, job history directly in JSX markup.

**Why bad:** To add or edit a project, you must dig into component code. DRY violation — content is spread
across files. Future CMS migration is harder if data is scattered.

**Instead:** Everything goes through `constant.ts`. Components only render shape.

### Anti-Pattern 2: Client Components for Static Sections

**What:** Putting `'use client'` on HeroSection, AboutSection, SkillsSection, ProjectsSection, or
ExperienceSection to use useState/useEffect when no interactivity is needed.

**Why bad:** Adds unnecessary JavaScript payload. These sections need no browser state — they're pure HTML.

**Instead:** Keep static sections as Server Components. Only ContactSection (form) and ScrollReveal
(animation) need client execution.

### Anti-Pattern 3: CSS background-image for Project Screenshots

**What:** Using Tailwind `bg-[url(...)]` or inline style `background-image` for project thumbnails.

**Why bad:** Browser cannot lazy-load, optimize format, or size-hint CSS background images. Each
unoptimized PNG adds 50–300KB to page load. Lighthouse will penalize this.

**Instead:** Use Next.js `<Image>` component for all project thumbnails. Provides automatic WebP conversion,
lazy loading, and `sizes` attribute for responsive delivery.

### Anti-Pattern 4: Multiple Separate Routes for Portfolio Sections

**What:** Creating `app/about/page.tsx`, `app/projects/page.tsx`, `app/contact/page.tsx` as separate Next.js
pages.

**Why bad:** Single-page portfolios scroll between sections — routing to new pages breaks the UX pattern
and requires full page navigations. The existing navbar concern (links commented out) is best fixed by
anchor links, not separate routes.

**Instead:** Keep everything on the single `/` route. Add `id` attributes to each `<section>`. Use anchor
links (`href="#projects"`) in the navbar.

### Anti-Pattern 5: Duplicating Content Data Between Components

**What:** The existing `heroSection.tsx` defines a local `languages` array that duplicates `LANGUAGE_ICONS`
from `constant.ts`. The two arrays are inconsistent (Tailwind color names vs hex strings).

**Why bad:** Adding a language requires updating two files. Data shape inconsistency causes bugs and
confusion.

**Instead:** Import from `constant.ts` in every component. Remove the local array in `heroSection.tsx`.

---

## Build Order (Phase Dependencies)

The recommended build order follows dependency relationships — each phase unlocks the next.

```
Phase 1: Foundation
  ├── Upgrade dependencies (Next.js, React 19, Tailwind v4, ESLint flat config)
  ├── Create app/lib/types.ts (interfaces that all later phases depend on)
  ├── Expand app/lib/constant.ts (PERSONAL, SKILLS, PROJECTS, EXPERIENCE data)
  └── Fix globals.css + tailwind.config.ts (remove dead code, enable radius tokens)

Phase 2: Core Sections (revamp existing 3 + add Experience)
  ├── Revamp HeroSection (real photo, functional CV download, real links)
  ├── Revamp AboutSection (real bio, professional image)
  ├── Revamp SkillsSection (full tech stack, grouped categories, remove duplicate data)
  └── Add ExperienceSection (new — timeline from EXPERIENCE constant)
      Note: No new architectural patterns needed — follows existing section pattern

Phase 3: Projects Section (most complex new section)
  ├── Add public/projects/*.webp (screenshots)
  ├── Build ProjectCard component (image, tech badges, links)
  └── Build ProjectsSection (grid layout, maps PROJECTS array)
      Note: Depends on Phase 1 types and constants being complete

Phase 4: Navigation + Animations
  ├── Wire Navbar anchor links (id attributes on sections, smooth scroll CSS)
  ├── Add mobile-responsive hamburger menu to Navbar
  └── Add ScrollReveal component + apply to section headings/cards
      Note: Can only be done after all sections exist (need the id targets)

Phase 5: Contact + Email
  ├── Install Resend SDK, set up env var RESEND_API_KEY
  ├── Build app/api/contact/route.ts (Route Handler with Zod validation)
  ├── Build ContactSection (React Hook Form, fetch POST, toast feedback)
  └── Test email delivery end-to-end
      Note: Input/Label/Select primitives (currently unused) justify their existence here

Phase 6: SEO + Polish
  ├── Expand Metadata in layout.tsx (OpenGraph, Twitter card, canonical)
  ├── Add structured data (JSON-LD Person schema)
  ├── Accessibility audit (ARIA labels, alt text, keyboard nav)
  ├── Lighthouse audit (target 90+ Performance, 100 Accessibility)
  └── Vercel deployment configuration
```

**Why this order:**
- Types and constants (Phase 1) must precede all content sections (Phases 2–3) — sections import from them
- All sections must exist before navigation wiring (Phase 4) — anchor links need their target `id` attributes
- Contact form (Phase 5) needs Input/Label primitives already installed, and comes after layout is stable
- SEO (Phase 6) is cheapest to do last — metadata can reference complete, real content

---

## Scalability Considerations

This is a static personal portfolio. Scalability here means "maintainability over time, not traffic volume."

| Concern | Current State | Target State |
|---------|--------------|--------------|
| Adding a project | Requires editing `constant.ts` | Edit `constant.ts` only — no component changes |
| Changing bio/copy | Inline in component JSX | Edit `constant.ts` PERSONAL object only |
| Adding a theme | Add CSS vars + tailwind class | Add class to `next-themes` themes array |
| Changing email service | N/A (no email) | Swap Resend import in one route handler |
| Adding a blog later | New route `app/blog/page.tsx` | App Router handles it; no disruption to `app/page.tsx` |
| CMS migration | Not needed for v1 | constants.ts structure maps 1:1 to typical CMS content models |

The `constant.ts` → section component pattern intentionally mirrors how a headless CMS would work. If content
volume grows to warrant a CMS (Contentlayer, Sanity, Notion API), the migration is a swap of the data source,
not a rewrite of components.

---

## Sources

- [Next.js App Router Project Structure](https://nextjs.org/docs/app/getting-started/project-structure) — official, HIGH confidence
- [Next.js Linking and Navigating (anchor links)](https://nextjs.org/docs/app/getting-started/linking-and-navigating) — official, HIGH confidence
- [Send emails with Next.js — Resend](https://resend.com/nextjs) — official, HIGH confidence
- [Framer Motion scroll animations](https://www.framer.com/motion/scroll-animations/) — official, HIGH confidence
- [Next.js Server Actions and Mutations](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations) — official, HIGH confidence
- [Smooth scroll with Tailwind and Next.js](https://mariogiancini.com/implementing-smooth-scroll-behavior-with-tailwind-css-and-nextjs) — MEDIUM confidence
- Existing codebase analysis (`app/lib/constant.ts`, `app/page.tsx`, `app/ui/homepage/*.tsx`, `.planning/codebase/ARCHITECTURE.md`, `.planning/codebase/CONCERNS.md`) — HIGH confidence (direct inspection)

---

*Architecture research: 2026-03-18*
