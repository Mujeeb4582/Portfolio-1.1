# Project Research Summary

**Project:** Mujeeb ur Rahman — Portfolio Revamp (v1.1)
**Domain:** Developer portfolio website — brownfield Next.js upgrade + content/feature revamp
**Researched:** 2026-03-18
**Confidence:** HIGH

## Executive Summary

This is a brownfield upgrade of an existing Next.js 15 / React 18 / Tailwind v3 portfolio into Next.js 16 / React 19 / Tailwind v4, combined with a content revamp (real projects, real bio, real photo) and three new sections (Experience, Contact, improved Projects). The existing codebase has the right high-level architecture — a single-page compositor pattern — but contains several immediate problems: a broken CV download button, placeholder content throughout, unused Geist font files inflating page weight, and inconsistent data duplication between components. These must be resolved before or during the upgrade, not after.

The recommended approach is a dependency-first, content-second, polish-last build order. The upgrade chain (Next.js 16 + React 19 + Tailwind v4) has multiple migration traps that interact with each other — dark mode breaks, shadcn animation breakage, ESLint config format changes, and async API enforcement all occur in the same dependency bump. These must be handled in sequence before any new feature work. Once the foundation is stable, sections are built using the existing self-contained component pattern (each section imports directly from `constant.ts`, no props from `page.tsx`). The contact form is the only server-side runtime needed — everything else is static HTML from Server Components.

The key risks are: (1) the Tailwind v3→v4 migration is the most complex step and has four independent failure modes (dark mode, shadcn animations, config token migration, renamed utility classes); (2) the contact form API route has spam and timeout exposure on Vercel's free tier; (3) missing Open Graph metadata means social sharing produces blank preview cards, hurting first impressions with recruiters. All three are preventable with well-documented mitigations.

---

## Key Findings

### Recommended Stack

The stack is a focused upgrade from the existing toolchain — no technology swaps, only version bumps and gap-fillers. Next.js 16 with React 19 is the target; Turbopack is now the default bundler, which improves build speed but requires keeping `next.config.ts` clean of webpack plugins. Tailwind v4 is a CSS-first architecture shift (no more `tailwind.config.ts`; design tokens move to `@theme {}` in `globals.css`) and is required for shadcn/ui CLI v4 compatibility. The `motion` package (formerly Framer Motion) handles scroll-reveal and hover animations — it is the right tool for portfolio use; GSAP is overkill. Resend handles contact form email via a Next.js Route Handler, keeping the API key server-side (unlike EmailJS).

**Core technologies:**

- **Next.js `^16.1`** — app framework — Turbopack stable, React Compiler built-in, App Router standard
- **React `^19.2`** — UI runtime — shipped with Next.js 16; Actions API, stable Server Components, automatic memoization
- **TypeScript `^5.x`** — type safety — already in project; non-negotiable
- **Tailwind CSS `^4.x`** — utility styling — CSS-first config, 5x faster builds, required for shadcn CLI v4
- **shadcn/ui (CLI)** — component library — re-init with CLI v4; copies source, no vendor lock-in
- **motion `^11.x`** — animations — `whileInView` scroll-reveals, `useReducedMotion` accessibility
- **next-themes `^0.4`** — dark/light mode — already in project; zero-flicker, keep as-is
- **Resend `^4.x`** — transactional email — server-side, 3,000 emails/month free, first-class Next.js support
- **react-hook-form `^7.71` + Zod `^4.x`** — form state + validation — uncontrolled inputs, Zod validates both client and server

**Version delta (current → target):**

| Package | Current | Target |
|---------|---------|--------|
| next | 15.0.3 | ^16.1 |
| react / react-dom | 18 | ^19.2 |
| tailwindcss | ^3.4.1 | ^4.x |
| motion | not installed | ^11.x |
| resend | not installed | ^4.x |
| react-hook-form | not installed | ^7.71 |
| zod | not installed | ^4.x |

---

### Expected Features

The target audience is recruiters, hiring managers, and clients. The hiring manager mental model — "Who are you? What can you do? What have you built? Where have you worked? How do I reach you?" — directly maps to section order.

**Must have (table stakes) — launch-blocking:**

- Hero section with name, title, tagline, CTA buttons (View Work, Download CV, Contact)
- About section with real bio, professional photo (not placeholder)
- Skills section organized by category (Frontend, Backend, Mobile, AI/LLM, Tools) with icons/badges
- Projects section — 6 curated cards with screenshot, description, tech badges, GitHub + demo links
- Experience section — 4-role vertical timeline with company, dates, impact bullets
- Contact section — email form (Resend) + email / WhatsApp / LinkedIn / GitHub direct links
- Sticky navigation with smooth scroll + active section highlight + dark/light mode toggle
- Downloadable CV — functional PDF download button (`public/mujeeb-resume.pdf`)
- SEO basics — Next.js Metadata API, Open Graph, JSON-LD Person schema
- Responsive design — mobile-first, tested at 375px / 768px / 1280px; Lighthouse 90+

**Should have (differentiators):**

- Project impact metrics — quantified outcomes ("40+ AI tools", "government-scale app") per card
- AI/LLM integration highlight — explicit badge/callout for OpenAI, Gemini, Langfuse experience
- Scroll-reveal animations — subtle `whileInView` entrance animations on section headings and cards
- Project tech stack pills/badges — color-coded or icon-based, scannable by technology
- Categorized skills with proficiency grouping — "Core Stack" vs "Proficient" vs "Familiar"
- Project mockup device frames — browser frame for web, phone frame for React Native projects
- Named anchor deep links — each section has stable URL (`/#projects`, `/#contact`)
- Keyboard navigation + WCAG 2.2 AA — focus indicators, skip-to-main, screen reader aria-live

**Defer to post-launch:**

- GitHub contribution graph (requires API + caching complexity)
- Blog/articles section (requires content)
- Testimonials (requires collection)
- Sticky section progress indicator (nice-to-have, low priority)

**Anti-features (do not build):**

- Blog, CMS, testimonials, 3D/WebGL, custom cursor, loading screen, horizontal scrolling, multi-language, real-time GitHub stats, cookie/GDPR banners, login/auth

---

### Architecture Approach

The portfolio uses a single route (`/`) that composes all sections as a stacked flex column — a pure compositor pattern. All section components are Server Components that import their own data directly from `app/lib/constant.ts` (single source of truth). No props flow from `page.tsx` to sections. The only client-side runtime is: `ContactSection` (form state), `ScrollReveal` (animation), `ThemeToggle`, `ClientThemeProvider`, and `Navbar` (active link highlighting). The only server-side runtime is the contact form Route Handler (`app/api/contact/route.ts`). This architecture is already correct — the revamp extends it, does not replace it.

**Major components:**

1. **`app/lib/constant.ts`** — single source of truth for all static content (PERSONAL, SKILLS, PROJECTS, EXPERIENCE); sections import directly, no props chain
2. **`app/lib/types.ts`** — shared TypeScript interfaces (Project, Experience, Skill, ContactInfo); must exist before any section work
3. **`app/ui/homepage/`** — 6 self-contained section components (Hero, About, Skills, Projects, Experience, Contact); each independently movable
4. **`app/ui/animations/ScrollReveal.tsx`** — single reusable Motion wrapper with `useReducedMotion` — centralizes all animation logic
5. **`app/api/contact/route.ts`** — only server runtime; POST handler with Zod validation + Resend SDK
6. **`app/layout.tsx`** — root layout with fonts, ThemeProvider, Navbar; `suppressHydrationWarning` on `<html>` required for Tailwind v4 dark mode

---

### Critical Pitfalls

1. **Tailwind v4 dark mode silently breaks** — `darkMode: "class"` in `tailwind.config.ts` is ignored in v4. Fix: add `@custom-variant dark (&:where(.dark, .dark *))` to `globals.css` before any other migration work.

2. **Tailwind v4 config tokens silently ignored** — the entire `tailwind.config.ts` `theme.extend` block (custom colors, fonts, background images) stops applying. Fix: run `npx @tailwindcss/upgrade` codemod, then translate all tokens to `@theme {}` in `globals.css`, then verify every custom class in the browser.

3. **shadcn animation plugin deprecated in v4** — `tailwindcss-animate` breaks silently; shadcn dropdown/dialog/tooltip animations disappear. Fix: replace with `tw-animate-css` as part of the Tailwind migration, add `@import "tw-animate-css"` to `globals.css`.

4. **Next.js 16 removes synchronous async APIs** — `cookies()`, `headers()`, `params` must be awaited; synchronous calls throw runtime errors. Fix: run `npx @next/codemod@canary upgrade latest` before the upgrade, and write the contact API route async-first from the start.

5. **ESLint v9 silently drops `.eslintrc.json`** — linting stops working entirely without error. Fix: migrate to `eslint.config.js` flat format before upgrading ESLint; update `package.json` lint script from `next lint` to `eslint .`.

6. **Broken CV download button (highest-visibility bug)** — the "Download CV" button has no `href`, no `onClick`, no PDF in `public/`. Fix: add `public/mujeeb-resume.pdf` and wrap with `<a href="/mujeeb-resume.pdf" download>` using the `asChild` pattern.

7. **Hero profile image destroys LCP** — missing `priority={true}` on the above-fold `<Image>` delays the LCP element. Fix: always set `priority={true}` on the hero image; it is the only image on the page that must not be lazy-loaded.

---

## Implications for Roadmap

Based on research, the dependency chain and pitfall risk profile suggest 6 phases in strict order. Each phase unlocks the next — skipping order creates rework.

### Phase 1: Foundation (Upgrade + Cleanup)

**Rationale:** All migration pitfalls (Pitfalls 1–6, 13, 15–17) must be resolved before any new feature code is written. Adding features on top of a broken migration doubles the debugging surface. Cleanup (dead fonts, Pitfall 17; duplicate data, Architecture Anti-Pattern 5) is cheapest to do before new code exists on top of it.

**Delivers:** A building Next.js 16 + React 19 + Tailwind v4 codebase with green CI, ESLint flat config working, dark mode functional, shadcn animations working, `types.ts` and expanded `constant.ts` with real content data, and dead code removed.

**Addresses:** Pre-conditions for all other phases; fixes the Geist font waste; aligns data architecture.

**Avoids:** Pitfalls 1 (Turbopack), 2 (Tailwind config), 3 (shadcn animations), 4 (dark mode), 5 (async APIs), 6 (ESLint), 13 (renamed utilities), 15 (React 19 refs), 16 (Husky v9), 17 (dead fonts).

**Research flag:** No additional research needed — all pitfalls have official mitigation docs.

---

### Phase 2: Core Sections Revamp (Hero, About, Skills, Experience)

**Rationale:** These 4 sections either already exist (Hero, About, Skills) and need real content + visual polish, or are new but follow the established section pattern (Experience). No new architectural patterns required. Must come before Navigation wiring (Phase 4) since nav anchor links need their section `id` targets.

**Delivers:** All 4 sections with real content (real photo, real bio, full tech stack with AI/LLM highlight, 4-role experience timeline), functional CV download, proficiency-grouped skills, impact-quantified experience bullets.

**Addresses:** Table stakes: Hero, About, Skills, Experience. Differentiators: AI/LLM highlight, categorized skills with proficiency grouping, project impact metrics (experience section).

**Avoids:** Pitfall 18 (broken CV download — fix in this phase), Pitfall 7 (hero image LCP — `priority={true}` on profile image), Pitfall 12 (external image hostname — replace with `public/profile.jpg`).

**Research flag:** No additional research needed — established section pattern.

---

### Phase 3: Projects Section

**Rationale:** The most complex new section — requires screenshot assets, ProjectCard component, device mockup frames, and tech badge system. Placed after Phase 2 because `types.ts` (Project interface) and `constant.ts` (PROJECTS array) must be complete first. Hero CTA ("View Work") depends on this section existing.

**Delivers:** 6 curated project cards with optimized WebP screenshots (via `next/image`), tech stack badges, impact metric callouts, GitHub and demo links, device mockup frames for web (browser) and mobile (React Native) projects.

**Addresses:** Table stakes: Projects section. Differentiators: project impact metrics, tech stack pills/badges, device mockup frames.

**Avoids:** Architecture Anti-Pattern 3 (CSS background-image for screenshots — use `<Image>` component), Pitfall 8 (background PNG inflation — use WebP via `next/image`).

**Research flag:** No additional research needed — `next/image` and card layout are well-documented.

---

### Phase 4: Navigation + Animations

**Rationale:** Navigation wiring (anchor links, smooth scroll, active section highlight, mobile hamburger) requires all section `id` attributes to exist — can only be done after Phases 2 and 3. ScrollReveal animations are applied last so animation behavior can be assessed against the complete page layout and CLS checked with Lighthouse.

**Delivers:** Sticky navbar with functional anchor links, mobile hamburger menu, active section highlight via Intersection Observer, smooth CSS scroll, `ScrollReveal` wrapper component applied to section headings and project/experience cards.

**Addresses:** Table stakes: sticky navigation, responsive design (mobile nav). Differentiators: scroll-reveal animations, smooth inter-section transitions.

**Avoids:** Pitfall 19 (scroll-reveal CLS — apply initial hidden state only after mount, use `motion-safe:` Tailwind variant, `useReducedMotion`).

**Research flag:** No additional research needed — Motion `whileInView` pattern is well-documented.

---

### Phase 5: Contact Form + Email

**Rationale:** The contact form is the only server-side runtime. It comes late because the form depends on Input/Label/Select shadcn primitives (installed in Phase 1), and layout must be stable before adding the form section. Email delivery must be tested end-to-end before any deployment.

**Delivers:** ContactSection with React Hook Form + Zod validation, fetch POST to `/api/contact` Route Handler, Resend email delivery to `mujeeburahman4582@gmail.com`, success/error toast feedback, direct contact links (email, WhatsApp, LinkedIn, GitHub), honeypot spam protection.

**Addresses:** Table stakes: contact section with multiple methods. Contact strategy: Resend + `mailto:` + WhatsApp + LinkedIn + GitHub.

**Avoids:** Pitfall 9 (spam — honeypot field + IP rate limiting), Pitfall 10 (Vercel timeout — plain HTML email template, no `@react-email/tailwind` runtime rendering).

**Research flag:** Rate limiting implementation may benefit from a quick Upstash/Vercel KV feasibility check if Upstash free tier constraints are unclear.

---

### Phase 6: SEO + Accessibility + Launch Polish

**Rationale:** SEO metadata is cheapest to write last — it can reference complete, real content (actual project descriptions, actual job titles, real photo for OG image). Accessibility audit requires a complete, stable UI. Lighthouse audits require all content to be present. This phase is the final gate before deployment.

**Delivers:** Expanded Next.js Metadata (Open Graph, Twitter Card, canonical, keywords), JSON-LD Person schema, `opengraph-image.png` (1200x630), WCAG 2.2 AA audit (focus indicators, skip-to-main, aria-live on form, alt text), Lighthouse 90+ on Performance and 100 on Accessibility, Vercel deployment configuration.

**Addresses:** Table stakes: Open Graph / social meta tags, fast load (Lighthouse 90+). Differentiators: JSON-LD structured data, keyboard navigation + WCAG 2.2 AA.

**Avoids:** Pitfall 11 (missing OG image = dead social preview cards), Pitfall 7 (LCP — verify with Lighthouse), Architecture Anti-Pattern 2 (unnecessary client components).

**Research flag:** No additional research needed — Next.js Metadata API is well-documented and JSON-LD Person schema is standard.

---

### Phase Ordering Rationale

- **Dependencies drive order:** Types and constants (Phase 1) precede all section work (Phases 2–3); sections must exist before navigation wiring (Phase 4); contact form comes after layout is stable (Phase 5); SEO is written against complete content (Phase 6).
- **Migration risk is front-loaded:** All Tailwind v4 and Next.js 16 pitfalls are resolved in Phase 1 so they cannot corrupt later feature work.
- **Content before polish:** Real data (photo, bio, projects, resume PDF) must be in place before animations and SEO are applied — metadata and OG images reference real content.
- **The contact API route is isolated:** It has its own risk profile (spam, timeout) and is the only server runtime; isolating it in Phase 5 limits debugging scope.

---

### Research Flags

**Phases needing deeper research during planning:**

- **Phase 5 (Contact):** Upstash Ratelimit free-tier limits and Vercel KV integration complexity — if rate limiting is deemed too complex for a portfolio, a simple honeypot field is the acceptable fallback.

**Phases with standard, well-documented patterns (skip research-phase):**

- **Phase 1 (Foundation):** All pitfall mitigations have official upgrade guides with exact commands.
- **Phase 2 (Core Sections):** Follows existing established section pattern; no new architecture.
- **Phase 3 (Projects):** `next/image`, card grid layout — standard Next.js patterns.
- **Phase 4 (Navigation + Animations):** Motion `whileInView` and CSS smooth scroll — well-documented.
- **Phase 6 (SEO):** Next.js Metadata API and JSON-LD Person schema — official docs cover all cases.

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | All recommendations grounded in official release notes and migration docs. Version numbers verified against npm as of 2026-03-18. |
| Features | HIGH | Based on industry portfolio analysis (Colorlib, Codementor, DEV Community) plus direct knowledge of target audience (recruiters, hiring managers). Feature boundaries are clear. |
| Architecture | HIGH | Based on direct codebase inspection of existing code + official Next.js App Router docs. Patterns are verified against the actual files, not assumptions. |
| Pitfalls | HIGH | 12 of 19 pitfalls rated HIGH confidence (official docs). 7 rated MEDIUM (community-verified across multiple practitioners). No LOW-confidence pitfalls included. |

**Overall confidence:** HIGH

### Gaps to Address

- **Actual project screenshots:** 6 WebP screenshots for `public/projects/` must be created or provided. Architecture assumes they exist; Phase 3 is blocked until they are ready. Plan for this asset creation before Phase 3 begins.
- **Resume PDF:** `public/mujeeb-resume.pdf` must be provided as an actual file. Phase 2 is blocked on this for the CV download button.
- **Resend domain verification:** Resend requires a verified custom domain for sending emails. The free tier allows sending from `onboarding@resend.dev` without domain verification — acceptable for initial testing, but a custom domain (`portfolio@mujeeburrahman.dev` or similar) should be verified before launch.
- **OG image asset:** A 1200x630 Open Graph image must be designed or generated. Next.js `ImageResponse` can generate it programmatically — this is the recommended approach for a developer portfolio.
- **Rate limiting decision:** Whether to implement Upstash Ratelimit or rely on honeypot-only spam protection needs a decision before Phase 5 begins. Honeypot is sufficient for a low-traffic portfolio.

---

## Sources

### Primary (HIGH confidence)

- [Next.js 16 Upgrade Guide](https://nextjs.org/docs/app/guides/upgrading/version-16) — upgrade path, async API removal, Turbopack defaults
- [Next.js 16 Blog Post](https://nextjs.org/blog/next-16) — feature overview, React Compiler, Turbopack stable
- [Tailwind CSS v4 Upgrade Guide](https://tailwindcss.com/docs/upgrade-guide) — config migration, renamed utilities, PostCSS changes
- [Tailwind CSS v4.0 Announcement](https://tailwindcss.com/blog/tailwindcss-v4) — CSS-first config rationale
- [shadcn/ui Tailwind v4 Migration Guide](https://ui.shadcn.com/docs/tailwind-v4) — `tw-animate-css` replacement, CLI v4
- [React 19 Stable Release](https://react.dev/blog/2024/12/05/react-19) — Actions API, Server Components, ref changes
- [React 19 Upgrade Guide](https://react.dev/blog/2024/04/25/react-19-upgrade-guide) — `forwardRef` deprecation, migration steps
- [ESLint v9 Migration Guide](https://eslint.org/docs/latest/use/migrate-to-9.0.0) — flat config format
- [Resend + Next.js Docs](https://resend.com/docs/send-with-nextjs) — Route Handler integration, free-tier limits
- [Motion (Framer Motion) React Docs](https://motion.dev/docs/react) — `whileInView`, `useReducedMotion`, `AnimatePresence`
- [Next.js App Router Project Structure](https://nextjs.org/docs/app/getting-started/project-structure) — official file conventions
- [Next.js Metadata API](https://nextjs.org/docs/app/building-your-application/optimizing/metadata) — Open Graph, Twitter Card, JSON-LD
- Internal codebase analysis (`CONCERNS.md`, `ARCHITECTURE.md`) — direct code inspection, HIGH confidence

### Secondary (MEDIUM confidence)

- [Tailwind v4 + next-themes dark mode discussion](https://github.com/tailwindlabs/tailwindcss/discussions/16517) — `@custom-variant dark` workaround, community-verified
- [LogRocket animation library comparison 2026](https://blog.logrocket.com/best-react-animation-libraries/) — Motion vs GSAP vs react-spring recommendation
- [Colorlib developer portfolios 2026](https://colorlib.com/wp/developer-portfolios/) — feature expectations analysis
- [Vercel contact form timeout reports](https://community.vercel.com/t/sending-emails-from-vercel-app-with-resend-limitations/22579) — 10-second function limit, react-email Tailwind renderer issue
- [Codementor portfolio requirements guide](https://www.codementor.io/learn-programming/12-important-things-to-include-in-web-dev-portfolios) — table stakes validation
- [WCAG 2.2 Compliance Checklist 2025](https://www.allaccessible.org/blog/wcag-22-compliance-checklist-implementation-roadmap) — accessibility requirements

### Tertiary (LOW confidence / general reference)

- [Brittany Chiang portfolio](https://brittanychiang.com/) — design pattern reference (section progress indicator, anchor navigation)
- [Shipixen SEO checklist for developer portfolios](https://shipixen.com/blog/seo-checklist-for-developer-portfolios-and-landing-pages) — structured data CTR impact

---

*Research completed: 2026-03-18*
*Ready for roadmap: yes*
