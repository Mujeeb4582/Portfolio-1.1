# Phase 2: Core Sections - Research

**Researched:** 2026-03-18
**Domain:** Next.js 16 / React 19 / Tailwind v4 portfolio section components (Hero, About, Skills, Experience)
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Hero Section**
- Split layout: text content on the left, professional photo on the right
- Left side contains: greeting, name, title ("Full-Stack Web Developer"), tagline, CTA buttons, social links row
- Professional photo displayed as a rounded rectangle with a subtle cyan border/glow
- Social links (GitHub, LinkedIn, Email, WhatsApp) displayed as an icon row below the CTA buttons
- Photo uses `/profile.jpg` (already exists in public/)

**Hero CTAs**
- Two buttons: "Contact Me" (primary) and "Download CV" (secondary)
- Download CV must serve an actual PDF file

**Skills Section**
- Category cards with icon grid layout: one card per category (Frontend, Backend, Mobile, LLM/AI, Tools)
- Each card shows category name as heading with a grid of technology icons + names inside
- Brand logos for technology icons using `react-icons/si` or `@iconify/react`
- No proficiency levels shown — just the skill name and icon
- Responsive grid: 3 columns on desktop, 2 on tablet, 1 on mobile
- Reuse existing Card component from shadcn/ui

**Experience Section**
- Vertical timeline layout with connected line and dots on the left, content cards on the right
- Shows career progression: Wonder Crafts, Techiosis, RGX Labs, Microverse (work experience)
- Plus education: Microverse, NUCES-FAST

**About Section**
- No photo in the About section (photo is already in hero — avoid duplication)
- Professional bio text with key stats
- Stats to show: years of experience, projects completed, technologies mastered

### Claude's Discretion
- CTA button styling and color choices
- Experience detail level and education placement
- Timeline visual decoration
- About section layout and stats presentation
- Section spacing and padding
- Section heading styles (consistent across all four sections)
- Responsive breakpoints and mobile adaptations

### Deferred Ideas (OUT OF SCOPE)
None — discussion stayed within phase scope
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| HERO-01 | Clean, minimal hero with name, title ("Full-Stack Web Developer"), and tagline | Split layout pattern; PERSONAL_INFO.name, title, bio from constant.ts |
| HERO-02 | Professional avatar/photo with styled presentation | Next.js `<Image>` component for `/profile.jpg`; rounded rectangle + cyan border via Tailwind |
| HERO-03 | Primary CTA "Contact Me" and secondary CTA "Download CV" | Button component with `asChild` + Slot pattern for anchor wrapping |
| HERO-04 | Social links (GitHub, LinkedIn, WhatsApp, Email) visible in hero | lucide-react icons; PERSONAL_INFO.github/linkedIn/email/whatsApp |
| HERO-05 | Download CV button serves actual PDF resume file | `<a href="/mujeeb-resume.pdf" download>` wrapping Button via `asChild` |
| ABOUT-01 | Professional bio summarizing experience and expertise | PERSONAL_INFO.bio from constant.ts; text-only layout, no photo |
| ABOUT-02 | Key stats/metrics display (years, projects, technologies) | PERSONAL_INFO.stats object; stat card pattern |
| ABOUT-03 | Clean layout with professional image | CONTEXT.md: no photo in about; bio + stats only |
| SKILL-01 | Skills organized by category | SKILLS array already grouped by SkillCategory in constant.ts |
| SKILL-02 | Visual skill display with technology icons/logos | react-icons/si package for brand SVG icons |
| SKILL-03 | All skills from resume represented accurately | 35 skills across 5 categories already in constant.ts |
| EXP-01 | Timeline display of work experience in chronological order | CSS-only vertical timeline: left line + dots + right cards |
| EXP-02 | Each role shows company, title, date range, and responsibilities | EXPERIENCE array typed interface in constant.ts |
| EXP-03 | Experience includes Wonder Crafts, Techiosis, RGX Labs, Microverse | All 4 entries present in EXPERIENCE constant |
| EXP-04 | Education section (Microverse, NUCES-FAST) | EDUCATION array with 2 entries present in constant.ts |
</phase_requirements>

---

## Summary

Phase 2 builds four self-contained section components on top of the Phase 1 foundation. The stack is fully established: Next.js 16 / React 19 / Tailwind v4 CSS-first config / shadcn/ui. All data is already typed and populated in `app/lib/constant.ts` — the sections are purely presentational consumers of that data.

The main new dependency is an icon library for technology brand logos in the Skills section. `react-icons` (v5.6.0) provides the `si` (Simple Icons) namespace which covers all 35 technologies in the skills list. It is a tree-shaken ES module library that works cleanly with Next.js Server Components when icons are imported by name. No icon is stored on `Skill.icon` — instead, a static icon map keyed by skill name lives in the skills section component.

The experience timeline and CV download are the two pieces with non-trivial implementation concerns. The timeline is built entirely with Tailwind CSS (no external library needed). The CV download requires the PDF to be placed at `public/mujeeb-resume.pdf` — the CONCERNS.md flags this as a known blocker.

**Primary recommendation:** Use `react-icons/si` for brand icons, implement the timeline with pure CSS (no library), and wire the CV download as an `<a download>` via Button's `asChild` prop.

---

## Standard Stack

### Core (already installed — Phase 1)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| next | 16.1.7 | Framework, Image optimization, App Router | Already installed and configured |
| react / react-dom | 19.2.4 | UI rendering | Already installed |
| tailwindcss | ^4.2.1 | Styling with CSS-first `@theme {}` config | Already installed |
| lucide-react | ^0.577.0 | Social link icons (GitHub, LinkedIn, Mail, MessageCircle) | Already installed |
| class-variance-authority | ^0.7.1 | Button/Card variant system | Already installed |
| next-themes | ^0.4.6 | Three-theme support | Already installed |

### New Dependency

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| react-icons | 5.6.0 | Simple Icons (si) for tech brand logos in skills section | Tree-shaken; `si` namespace covers all 35 skills; SSR-safe named imports |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| react-icons/si | @iconify/react 6.0.2 | Iconify has more icons but requires a runtime API call or bundled JSON; react-icons tree-shakes at import level, zero runtime overhead |
| react-icons/si | Custom SVGs (like existing HTMLIcon etc.) | Custom SVGs are high effort (35+ icons); react-icons is the standard solution |
| react-icons/si | devicon CSS classes | Devicon requires a CDN CSS link; react-icons is npm-native and SSR-safe |

**Installation:**
```bash
bun add react-icons
```

**Version verification (run before implementing):**
```bash
npm view react-icons version
# Confirmed: 5.6.0 (2026-03-18)
```

---

## Architecture Patterns

### Recommended Project Structure

```
app/
├── ui/
│   └── homepage/
│       ├── heroSection.tsx       # REBUILD — split layout, photo, CTAs, social links
│       ├── aboutSection.tsx      # REBUILD — bio text, stats cards, no photo
│       ├── skillsSection.tsx     # REBUILD — category cards with brand icons
│       └── experienceSection.tsx # NEW — vertical timeline + education subsection
├── lib/
│   ├── constant.ts               # Data source (PERSONAL_INFO, SKILLS, EXPERIENCE, EDUCATION)
│   ├── types.ts                  # TypeScript interfaces
│   └── utils.ts                  # cn() helper
└── page.tsx                      # Add ExperienceSection import + render
```

### Pattern 1: Server Component Section (No Props)

All four section components follow this pattern from ARCHITECTURE.md:

```typescript
// Self-contained, no props from parent — imports constants directly
import { PERSONAL_INFO } from '@/app/lib/constant'

export default function HeroSection() {
  return (
    <section id="hero" aria-labelledby="hero-heading">
      {/* markup */}
    </section>
  )
}
```

- No `'use client'` directive needed — sections are Server Components
- Static data imported directly from constants, no props
- Semantic `<section>` with `id` anchor and `aria-labelledby`

### Pattern 2: CV Download — Button asChild with Anchor

The existing Button has `asChild` support via `@radix-ui/react-slot`. Use it for the download link:

```typescript
// Correct — wraps <a> with download attribute using asChild
<Button variant="outline" asChild>
  <a href="/mujeeb-resume.pdf" download="Mujeeb-ur-Rahman-CV.pdf">
    <Download className="size-4" />
    Download CV
  </a>
</Button>
```

Do NOT use a bare `<Button>` with onClick for a file download — that requires client component overhead for no reason.

### Pattern 3: Social Icon Links

Use lucide-react icons already installed. Map PERSONAL_INFO fields to href:

```typescript
const SOCIAL_LINKS = [
  { icon: Github, href: PERSONAL_INFO.github, label: 'GitHub profile' },
  { icon: Linkedin, href: PERSONAL_INFO.linkedIn, label: 'LinkedIn profile' },
  { icon: Mail, href: `mailto:${PERSONAL_INFO.email}`, label: 'Email Mujeeb' },
  { icon: MessageCircle, href: `https://wa.me/${PERSONAL_INFO.whatsApp.replace(/\D/g, '')}`, label: 'WhatsApp' },
]
```

All links open in `target="_blank" rel="noopener noreferrer"` except mailto.

### Pattern 4: Hero Photo — Next.js Image

Use `next/image` `<Image>` component, not `<Avatar>`:

```typescript
import Image from 'next/image'

<div className="relative overflow-hidden rounded-2xl border-2 border-brand1 shadow-[0_0_20px_rgba(18,247,214,0.3)]">
  <Image
    src="/profile.jpg"
    alt="Mujeeb ur Rahman — Full-Stack Web Developer"
    width={400}
    height={500}
    className="object-cover"
    priority  // above-the-fold — always eager-load hero image
  />
</div>
```

The existing `Avatar` component uses Radix's AvatarPrimitive which is `'use client'` — avoid it for the hero photo. Use `<Image>` directly (Server Component safe, optimized).

### Pattern 5: Skills Section — Icon Map

Since `Skill.icon` is an optional string (name lookup, not component reference) per Phase 1 decisions, create a static icon map in the skills section:

```typescript
import { SiReact, SiNextdotjs, SiTypescript } from 'react-icons/si'
import type { IconType } from 'react-icons'

const SKILL_ICON_MAP: Record<string, IconType> = {
  'React': SiReact,
  'Next.js': SiNextdotjs,
  'TypeScript': SiTypescript,
  // ... all 35 skills
}
```

For skills with no Simple Icon (e.g., "Prompt Engineering", "TDD"), render the skill name text only without an icon — graceful fallback.

### Pattern 6: Experience Timeline — Pure CSS

Vertical timeline using Tailwind pseudo-elements and positioning. No external library.

```
┌─────────────────────────────────────┐
│  ●  Wonder Crafts           May 2023│
│  │  Full-Stack Web Developer        │
│  │  May 2023 – Present             │
│  │  • Built Buildable...            │
│  │                                  │
│  ●  Techiosis               May 2025│
│  │  React Native Developer          │
...
│  ─  EDUCATION ─────────────────────│
│  □  Microverse                      │
│  □  NUCES-FAST                      │
└─────────────────────────────────────┘
```

CSS implementation:
```typescript
<div className="relative">
  {/* Vertical connecting line */}
  <div className="absolute left-4 top-0 h-full w-0.5 bg-brand1/30" aria-hidden="true" />

  {EXPERIENCE.map((entry) => (
    <div key={entry.company} className="relative mb-8 pl-12">
      {/* Timeline dot */}
      <div className="absolute left-2.5 top-2 size-3 rounded-full border-2 border-brand1 bg-background" />
      {/* Content card */}
      <Card className="p-6">
        <h3>{entry.role}</h3>
        <p>{entry.company} • {entry.dateRange}</p>
        <ul>{entry.responsibilities.map(r => <li key={r}>{r}</li>)}</ul>
      </Card>
    </div>
  ))}
</div>
```

Education entries placed below work experience in same timeline but with a visual separator (divider + "Education" label). Use square dots instead of circle dots to differentiate education from work.

### Pattern 7: Section Heading (Consistent Across All Sections)

All four sections use this heading pattern — consistent visual identity:

```typescript
function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-12 flex flex-col items-center gap-3 text-center">
      <h2 className="font-inter text-h2-u">{children}</h2>
      <UnderLine />
    </div>
  )
}
```

The existing `UnderLine` component from `app/ui/underLine.tsx` provides the cyan dot-line-dot decoration. Reuse it for all section headings.

### Anti-Patterns to Avoid

- **Hardcoded strings in components:** All content comes from `constant.ts`. No name, bio, company, or date strings in component files.
- **`'use client'` on section components:** The sections have no interactivity — they are Server Components. Only add `'use client'` if a specific child needs it (none do in this phase).
- **`<Avatar>` for hero photo:** Avatar is Radix-based and `'use client'`. Use `<Image>` from `next/image` for the hero portrait.
- **`style={{ opacity: 0.1 }}`:** Use Tailwind `opacity-10` class instead (existing concern in aboutSection.tsx and skillsSection.tsx).
- **Local data arrays in components:** The existing `heroSection.tsx` defines a local `professionalMetrics` array — this pattern is acceptable only for derived display data. Primary content must come from constants.
- **Importing all of react-icons:** Always import named exports `from 'react-icons/si'` to enable tree-shaking. Never import `from 'react-icons'`.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Tech brand icons | Custom SVG components for 35 technologies | `react-icons/si` | 35 custom SVGs = 35 files, maintenance burden, react-icons already has them all |
| CV file download | JavaScript download logic | `<a href="/mujeeb-resume.pdf" download>` | Native HTML handles it; no JS needed |
| Timeline layout | External library (react-vertical-timeline, etc.) | Pure Tailwind CSS positioning | Tailwind is sufficient; external libs add bundle weight for simple layout |
| Button anchor wrapping | `<a>` styled to look like a button | `<Button asChild>` + `<a>` | shadcn's `asChild`/Slot pattern is the canonical approach |
| Section anchors | Hash routing library | `id` attributes on `<section>` elements | Scroll-to works with native anchor href="#section-id" |
| Font classes | Inline `style={{ fontFamily }}` | Tailwind `font-inter` / `font-jetbrains` | CSS variables from `next/font` are already wired to Tailwind tokens in globals.css |

**Key insight:** This phase is entirely presentational. Every problem it faces has a solved, lightweight solution in the existing stack.

---

## Common Pitfalls

### Pitfall 1: profile.jpg Missing from public/

**What goes wrong:** The hero image renders as broken / fallback text "MR".
**Why it happens:** The CONTEXT.md and CONCERNS.md both note that `/profile.jpg` already exists — but the public/ directory listing shows no `profile.jpg`. Only `aboutImage.png`, `aboutBackground.png`, `skillsBackground.png` are present.
**How to avoid:** The planner MUST include a task to place `profile.jpg` in `public/` (or update the path) before the hero section task is considered complete. This is a real-content blocker.
**Warning signs:** AvatarFallback text renders instead of photo.

### Pitfall 2: resume PDF Missing from public/

**What goes wrong:** CV download button clicks silently fail or 404.
**Why it happens:** STATE.md explicitly lists `[Phase 2]: Resume PDF (public/mujeeb-resume.pdf) must be provided before CV download button works` as a known blocker.
**How to avoid:** Create a placeholder PDF at `public/mujeeb-resume.pdf` so the download link functions. Document in the plan that the real PDF must be swapped in before launch.
**Warning signs:** Browser 404 on `/mujeeb-resume.pdf`.

### Pitfall 3: react-icons SSR Render Warning

**What goes wrong:** React warns about server/client mismatch when using react-icons.
**Why it happens:** Some icon libraries inject dynamic className or SVG attributes differently on server vs client.
**How to avoid:** Import react-icons icons by name in Server Components — this is safe. The `react-icons/si` package exports plain SVG components, no client-only APIs. Do NOT dynamically import icons by string key (e.g., `const Icon = icons[skill.icon]` where `icons` is built client-side).
**Warning signs:** Hydration mismatch warning in dev console.

### Pitfall 4: Skill Icon Map — Mismatched Names

**What goes wrong:** Some skills in `constant.ts` don't have matching Simple Icons.
**Why it happens:** Simple Icons uses exact brand names; our skills use informal names ("React Native" → `SiReact` not `SiReactnative`; "Next.js" → `SiNextdotjs`; "Node.js" → `SiNodedotjs`; "shadcn/ui" → no icon in SI).
**How to avoid:** Build the icon map manually with verified SI names. For skills with no icon match, render without icon (text-only graceful fallback).
**Known mismatches in this skill list:**
- `"shadcn/ui"` — no SI icon; render text only
- `"Prompt Engineering"` — no SI icon; render text only
- `"TDD"` — no SI icon; render text only
- `"React Native"` → `SiReact` (no dedicated RN icon in SI)
- `"Ruby on Rails"` → `SiRubyonrails`
- `"LiteLLM"` → no SI icon; render text only
- `"Langfuse"` → no SI icon; render text only

### Pitfall 5: Hero Section Complete Rebuild

**What goes wrong:** Implementer tries to patch the existing heroSection.tsx instead of rebuilding.
**Why it happens:** The existing component has wrong layout (card-based mobile layout, not split desktop), hardcoded strings, and non-functional buttons.
**How to avoid:** The plan should specify "rebuild heroSection.tsx from scratch" not "update heroSection.tsx". The old code has structural debt (local language array, placeholder metrics, broken Download CV, no social links) that makes patching more error-prone than rewriting.
**Warning signs:** Keeping the old card-based layout structure while adding new content.

### Pitfall 6: Inline style Usage

**What goes wrong:** ESLint/Tailwind conventions violated; harder to make theme-responsive.
**Why it happens:** Existing aboutSection.tsx and skillsSection.tsx use `style={{ opacity: 0.1 }}` and `style={{ zIndex: 1 }}`.
**How to avoid:** When rebuilding these sections, replace all inline styles with Tailwind utilities: `opacity-10`, `z-[1]`, etc. Use `style={{}}` only for truly dynamic values (e.g., a variable color from data).

### Pitfall 7: Duplicate font-jetbrains Variable Name

**What goes wrong:** TypeScript error or wrong font rendered.
**Why it happens:** `app/layout.tsx` sets `variable: '--font-jetbrains'` on the JetBrains Mono font. In `globals.css`, `--font-jetbrains` is used as `var(--font-jetbrains-variable)` inside the `--font-jetbrains` token. The variable name from `next/font` and the `@theme` token name are both `--font-jetbrains`.
**How to avoid:** The layout already correctly sets `variable: '--font-jetbrains'` and globals.css references it as `var(--font-jetbrains-variable)`. Keep using `font-jetbrains` Tailwind class. Do not change these values.

---

## Code Examples

### Hero — Split Layout Skeleton

```typescript
// Server Component — no 'use client' needed
import { PERSONAL_INFO } from '@/app/lib/constant'
import { Button } from '@/app/ui/button'
import { UnderLine } from '@/app/ui/underLine'
import { Github, Linkedin, Mail, MessageCircle, Download } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="flex min-h-screen w-full max-w-6xl flex-col items-center gap-12 px-6 py-20 md:flex-row md:items-center md:justify-between"
      aria-labelledby="hero-name"
    >
      {/* Left: text content */}
      <div className="flex flex-col gap-6">
        <p className="font-jetbrains text-brand1">Hi, my name is</p>
        <h1 id="hero-name" className="font-inter text-h2-u">
          {PERSONAL_INFO.name}
        </h1>
        <h2 className="font-inter text-h2-u text-muted-foreground">
          {PERSONAL_INFO.title}
        </h2>
        <p className="max-w-md font-jetbrains text-para-m">{PERSONAL_INFO.bio}</p>
        {/* CTAs */}
        <div className="flex gap-4">
          <Button asChild>
            <Link href="#contact">Contact Me</Link>
          </Button>
          <Button variant="outline" asChild>
            <a href="/mujeeb-resume.pdf" download="Mujeeb-ur-Rahman-CV.pdf">
              <Download className="size-4" />
              Download CV
            </a>
          </Button>
        </div>
        {/* Social links */}
        <div className="flex gap-4">
          <Link href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile">
            <Github className="size-5 text-muted-foreground hover:text-brand1 transition-colors" />
          </Link>
          {/* LinkedIn, Email, WhatsApp ... */}
        </div>
      </div>
      {/* Right: photo */}
      <div className="relative shrink-0 overflow-hidden rounded-2xl border-2 border-brand1 shadow-[0_0_24px_rgba(18,247,214,0.25)]">
        <Image
          src="/profile.jpg"
          alt="Mujeeb ur Rahman"
          width={380}
          height={460}
          className="object-cover"
          priority
        />
      </div>
    </section>
  )
}
```

### Skills — Icon Map Pattern

```typescript
import {
  SiReact, SiNextdotjs, SiTypescript, SiJavascript,
  SiHtml5, SiCss3, SiTailwindcss, SiRedux,
  SiNodedotjs, SiPostgresql, SiRubyonrails,
  SiExpress, SiSupabase, SiFirebase, SiMysql,
  SiMongodb, SiPython, SiAmazonaws, SiRuby,
  SiDocker, SiGit, SiGithub, SiCypress,
  SiOpenai, SiBootstrap,
} from 'react-icons/si'
import type { IconType } from 'react-icons'

const SKILL_ICON_MAP: Partial<Record<string, IconType>> = {
  'React': SiReact,
  'Next.js': SiNextdotjs,
  'TypeScript': SiTypescript,
  'JavaScript': SiJavascript,
  'HTML5': SiHtml5,
  'CSS3': SiCss3,
  'TailwindCSS': SiTailwindcss,
  'Redux': SiRedux,
  'Bootstrap': SiBootstrap,
  'Node.js': SiNodedotjs,
  'PostgreSQL': SiPostgresql,
  'Ruby on Rails': SiRubyonrails,
  'Express.js': SiExpress,
  'Supabase': SiSupabase,
  'Firebase': SiFirebase,
  'MySQL': SiMysql,
  'MongoDB': SiMongodb,
  'Python': SiPython,
  'AWS': SiAmazonaws,
  'Ruby': SiRuby,
  'React Native': SiReact, // no dedicated RN icon in SI
  'OpenAI API': SiOpenai,
  'Docker': SiDocker,
  'Git': SiGit,
  'GitHub': SiGithub,
  'Cypress': SiCypress,
  // No icon: 'shadcn/ui', 'Ant Design', 'Prompt Engineering', 'LiteLLM', 'Langfuse', 'TDD', 'Render', 'Netlify', 'Gemini API', 'Zustand'
}
```

### Experience Timeline Dot

```typescript
// Work experience dot (circle)
<div className="absolute left-3 top-3 size-3.5 rounded-full border-2 border-brand1 bg-background" aria-hidden="true" />

// Education dot (square, visually distinct)
<div className="absolute left-3 top-3 size-3.5 rounded-sm border-2 border-brand2 bg-background" aria-hidden="true" />
```

### About — Stats Card Pattern

```typescript
import { PERSONAL_INFO } from '@/app/lib/constant'

const stats = [
  { value: PERSONAL_INFO.stats.yearsExperience, label: 'Years Experience' },
  { value: PERSONAL_INFO.stats.projectsCompleted, label: 'Projects Completed' },
  { value: PERSONAL_INFO.stats.technologiesUsed, label: 'Technologies' },
]

// Stat grid
<div className="grid grid-cols-3 gap-4">
  {stats.map(({ value, label }) => (
    <div key={label} className="flex flex-col items-center rounded-lg border border-brand1/30 bg-card p-4">
      <span className="font-jetbrains text-number-m text-brand1">{value}+</span>
      <span className="font-inter text-label-u-m text-muted-foreground text-center">{label}</span>
    </div>
  ))}
</div>
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Tailwind `dark:` variant | `@custom-variant dark` in globals.css | Tailwind v4 | Multi-theme support via CSS class names, not just `dark` |
| `tailwind.config.ts` tokens | `@theme {}` in globals.css | Tailwind v4 | CSS-first config; no JS config file needed |
| Radix Avatar for photos | `next/image <Image>` | Best practice | Image optimization, Server Component safe |
| Custom SVG per icon | `react-icons/si` named import | Pre-existing pattern | Tree-shaking, maintained set |
| `style={{ opacity: 0.1 }}` | Tailwind `opacity-10` class | Project cleanup needed | Theme-responsive, lintable |
| Hardcoded strings in components | Data from `constant.ts` | Phase 1 established | Single source of truth |

**Deprecated/outdated in this codebase:**
- `app/ui/skillsCard.tsx`: Custom skill card component from pre-Phase-1 code. Phase 2 uses shadcn `Card` directly per CONTEXT.md decision.
- `app/ui/languageIcons.tsx`: The `LanguageIcons` display component with inline SVGs. Phase 2 replaces with `react-icons/si` map. The `LANGUAGE_ICONS` constant is kept for backward compatibility per Phase 1 decision but not used in rebuilt sections.
- `heroSection.tsx` local `professionalMetrics` array: Replaced by `PERSONAL_INFO.stats` from constant.ts.
- `heroSection.tsx` `<Avatar>` usage: Replaced by `<Image>` from next/image.

---

## Open Questions

1. **profile.jpg — does it actually exist?**
   - What we know: CONTEXT.md says "Photo uses `/profile.jpg` (already exists in public/)". The actual `public/` directory listing shows NO `profile.jpg`.
   - What's unclear: Either the file was added after the architecture scan, or it still needs to be created/placed.
   - Recommendation: Plan must include a task to verify/place `profile.jpg` in `public/` as the first prerequisite step. If absent, use a placeholder until the real photo is provided.

2. **Simple Icons coverage for Zustand, Gemini API, Ant Design**
   - What we know: `react-icons/si` does not have `SiZustand`, `SiGemini` (as of v5.6.0), or `SiAntdesign`.
   - What's unclear: Whether newer react-icons versions (post-5.6.0) have added these.
   - Recommendation: For unmatched icons, render skill name text with a generic square/dot placeholder. Do not block the section on icon coverage.

3. **About section layout — split vs stacked**
   - What we know: CONTEXT.md marks this as Claude's Discretion. No photo. Bio + stats.
   - Recommendation: Use a two-column layout on desktop (bio left, stats grid right) collapsing to single column on mobile. Stats grid is 3 columns (years / projects / technologies).

---

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | None installed — Wave 0 must set up vitest + @testing-library/react |
| Config file | none — see Wave 0 |
| Quick run command | `bun run test` (after setup) |
| Full suite command | `bun run test --run` (after setup) |

### Phase Requirements to Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| HERO-01 | HeroSection renders name and title | unit | `bun run test --run tests/hero.test.tsx` | Wave 0 |
| HERO-02 | Hero photo `<Image>` renders with src="/profile.jpg" | unit | `bun run test --run tests/hero.test.tsx` | Wave 0 |
| HERO-03 | Two CTA buttons present (Contact Me, Download CV) | unit | `bun run test --run tests/hero.test.tsx` | Wave 0 |
| HERO-04 | Social link hrefs match PERSONAL_INFO values | unit | `bun run test --run tests/hero.test.tsx` | Wave 0 |
| HERO-05 | Download CV anchor has correct href and download attribute | unit | `bun run test --run tests/hero.test.tsx` | Wave 0 |
| ABOUT-01 | AboutSection renders PERSONAL_INFO.bio text | unit | `bun run test --run tests/about.test.tsx` | Wave 0 |
| ABOUT-02 | Stats display 4+, 6+, 20+ values | unit | `bun run test --run tests/about.test.tsx` | Wave 0 |
| ABOUT-03 | No `<img>` or `<Image>` with profile photo in About | unit | `bun run test --run tests/about.test.tsx` | Wave 0 |
| SKILL-01 | All 5 category headings present | unit | `bun run test --run tests/skills.test.tsx` | Wave 0 |
| SKILL-02 | At least one SVG icon rendered per category with icons | unit | `bun run test --run tests/skills.test.tsx` | Wave 0 |
| SKILL-03 | All 35 skill names rendered | unit | `bun run test --run tests/skills.test.tsx` | Wave 0 |
| EXP-01 | 4 experience entries rendered in order | unit | `bun run test --run tests/experience.test.tsx` | Wave 0 |
| EXP-02 | Each entry has company, role, dateRange text | unit | `bun run test --run tests/experience.test.tsx` | Wave 0 |
| EXP-03 | Wonder Crafts, Techiosis, RGX Labs, Microverse all present | unit | `bun run test --run tests/experience.test.tsx` | Wave 0 |
| EXP-04 | Microverse and NUCES-FAST in education output | unit | `bun run test --run tests/experience.test.tsx` | Wave 0 |

### Sampling Rate

- **Per task commit:** `bun run test --run tests/{section}.test.tsx`
- **Per wave merge:** `bun run test --run`
- **Phase gate:** Full suite green before `/gsd:verify-work`

### Wave 0 Gaps

- [ ] `vitest` and `@testing-library/react` not installed — install: `bun add -D vitest @testing-library/react @testing-library/jest-dom jsdom`
- [ ] `vitest.config.ts` — create with jsdom environment
- [ ] `tests/hero.test.tsx` — covers HERO-01 through HERO-05
- [ ] `tests/about.test.tsx` — covers ABOUT-01 through ABOUT-03
- [ ] `tests/skills.test.tsx` — covers SKILL-01 through SKILL-03
- [ ] `tests/experience.test.tsx` — covers EXP-01 through EXP-04
- [ ] `tests/setup.ts` — shared jest-dom imports

---

## Sources

### Primary (HIGH confidence)

- Direct codebase inspection (`app/lib/constant.ts`, `app/lib/types.ts`, `app/globals.css`, `app/layout.tsx`, `app/page.tsx`, existing section components) — confirmed all data structures, theme tokens, font variables, and component patterns
- `.planning/codebase/ARCHITECTURE.md` — confirmed section composition pattern, Server Component defaults, data flow
- `.planning/codebase/STACK.md` — confirmed exact installed versions (Next.js 16.1.7, React 19.2.4, Tailwind ^4.2.1, lucide-react ^0.577.0)
- `.planning/codebase/CONCERNS.md` — confirmed broken Download CV, missing profile.jpg issue, inline style anti-patterns
- `.planning/phases/02-core-sections/02-CONTEXT.md` — locked decisions and discretion areas
- `package.json` — confirmed bun as package manager, simple-git-hooks, all dependency versions
- `npm view react-icons version` — confirmed v5.6.0 (2026-03-18)
- `npm view @iconify/react version` — confirmed v6.0.2 for comparison

### Secondary (MEDIUM confidence)

- react-icons package README (via npm registry) — confirmed `si` namespace covers Simple Icons brand logos, tree-shaken ES module exports

### Tertiary (LOW confidence)

- Simple Icons coverage for specific skill names (Zustand, Gemini API, Ant Design, Langfuse, LiteLLM) — not individually verified against react-icons v5.6.0 SI exports; flag as "may need text-only fallback"

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all core libraries directly verified in package.json; only react-icons is new addition, version confirmed via npm registry
- Architecture: HIGH — section patterns directly read from existing codebase and ARCHITECTURE.md
- Data content: HIGH — constant.ts fully inspected; all 35 skills, 4 experience entries, 2 education entries confirmed
- Pitfalls: HIGH — profile.jpg absence confirmed by direct public/ directory listing; PDF blocker confirmed in STATE.md; inline style issues confirmed in CONCERNS.md
- Icon coverage: MEDIUM — react-icons/si covers ~28/35 skills; exact SI icon names for 7 skills not individually verified

**Research date:** 2026-03-18
**Valid until:** 2026-04-18 (stable stack, 30-day validity)
