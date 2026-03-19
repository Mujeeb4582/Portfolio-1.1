# Phase 04: Navigation + Animations - Research

**Researched:** 2026-03-19
**Domain:** React/Next.js navigation, IntersectionObserver, Motion (framer-motion), CSS scroll behavior
**Confidence:** HIGH

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- Sticky navbar with semi-transparent background and backdrop-blur on scroll
- Brand/logo: "Mujeeb" in bold Inter with cyan accent — text logo, no image
- Desktop: horizontal nav links + ThemeToggle visible
- Links come from `NAV_LINKS` constant in `constant.ts`
- Smooth scroll: CSS `scroll-behavior: smooth` or JS-based
- Active section indicator: Cyan (#12F7D6) underline, uses IntersectionObserver
- Mobile menu: Full-screen overlay, centered nav links, large readable size
- Hamburger: three animated bars → X on open (pure CSS)
- Menu closes on link click, X button, or outside click
- Scroll-reveal: fade-up style (fade in + move 20-30px upward)
- Animation order: section headings first, then cards/content stagger
- Library: Motion (framer-motion) — ANIM-01 requirement mandates this
- prefers-reduced-motion: animations absent or reduced when OS setting enabled

### Claude's Discretion
- Hover effect specifics on buttons and links
- Animation duration and easing
- Stagger delay between animated elements
- Navbar scroll threshold for background change
- Mobile menu animation (fade, slide, scale)
- Breakpoint-specific adjustments

### Deferred Ideas (OUT OF SCOPE)
None — discussion stayed within phase scope
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| NAV-01 | Sticky navbar with smooth-scroll anchor links to all sections | CSS `scroll-smooth` on `<html>`, Next.js `<Link scroll={false}>` for anchor hrefs |
| NAV-02 | Mobile hamburger menu with slide-in (full-screen overlay) navigation | Pure CSS Tailwind rotate/translate for bars→X; `'use client'` for open state; outside-click handler |
| NAV-03 | Active section indicator highlights current section in navbar | `useActiveSection` custom hook with `IntersectionObserver`; state drives cyan underline class |
| ANIM-01 | Subtle scroll-reveal animations using Motion library | `motion` package v12; `<motion.div whileInView>` with `viewport={{ once: true }}`; `'use client'` required |
| ANIM-02 | Hover effects on interactive elements (buttons, cards, links) | Tailwind `transition-*` utilities or Motion `whileHover` prop |
| ANIM-03 | Respects `prefers-reduced-motion` user preference | `<MotionConfig reducedMotion="user">` at layout level wraps all motion components |
| DEPLOY-02 | Responsive design works on mobile, tablet, and desktop | Tailwind breakpoints `md:` for desktop layout; hamburger shown below `md:hidden` threshold |
</phase_requirements>

---

## Summary

This phase rebuilds the navbar shell into a fully functional, interactive navigation component and adds scroll-reveal animations across all portfolio sections. The work splits into two distinct concerns: (1) navigation mechanics (sticky bar, smooth scroll, active indicator, mobile menu), and (2) animation layer (Motion library scroll-reveal, hover effects, reduced-motion compliance).

The existing navbar (`app/ui/navbar.tsx`) is a 24-line shell with only ThemeToggle. It must become a `'use client'` component because it owns scroll state, mobile open/close state, and IntersectionObserver setup. Section components in `app/ui/homepage/` are currently Server Components — the animation wrapper strategy (wrapping with `motion.div` in a thin client boundary) preserves server rendering for content while enabling Motion animations.

The biggest gotcha for this stack is Next.js's `<Link>` component interfering with CSS `scroll-behavior: smooth`. The fix is `<Link href="#section" scroll={false}>` — this lets the CSS handle scrolling. A secondary gotcha is `motion` components requiring `'use client'`; the pattern is a lightweight `<AnimateIn>` wrapper that is a Client Component, while the section itself stays a Server Component.

**Primary recommendation:** Install `motion` package, add `scroll-smooth` to `<html>` in layout, use `<MotionConfig reducedMotion="user">` at the layout level, build a `useActiveSection` custom hook with IntersectionObserver, and create reusable `<AnimateIn>` and `<StaggerChildren>` wrappers for scroll-reveal.

---

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| motion | 12.38.0 | Scroll-reveal, hover animations, exit animations | Industry standard for React animations; `framer-motion` was renamed to `motion`; supports `useReducedMotion`, `MotionConfig`, `whileInView` |
| tailwindcss | ^4.2.1 | Hamburger CSS animation, scroll-smooth, backdrop-blur | Already in project; `scroll-smooth` utility, `backdrop-blur`, `transition-*` all native |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| lucide-react | ^0.577.0 | Menu / X icons for hamburger (if not pure CSS) | Already installed; `Menu` and `X` icons available as fallback |

### Already Installed (no additions needed)
| Package | Version | Status |
|---------|---------|--------|
| next | 16.1.7 | Used for `<Link scroll={false}>` pattern |
| react | 19.2.4 | Hooks: `useState`, `useEffect`, `useRef` |
| tailwindcss | ^4.2.1 | `scroll-smooth`, `backdrop-blur`, `transition-*` |

### New Install Required
```bash
bun add motion
```

**Verified version:** `motion@12.38.0` (as of 2026-03-19 via `npm view motion version`)

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| motion (whileInView) | CSS @keyframes + IntersectionObserver | More setup, less declarative, no spring physics |
| CSS bars→X (pure Tailwind) | Lucide `Menu`/`X` icon swap | Icon swap is simpler but less polished |
| IntersectionObserver (custom hook) | `react-intersection-observer` package | Adds dependency; native API is sufficient for this use case |

---

## Architecture Patterns

### Recommended Project Structure
```
app/
├── ui/
│   ├── navbar.tsx              # Full rebuild — 'use client', owns all nav state
│   └── homepage/
│       ├── heroSection.tsx     # Add section id="hero" (already present)
│       ├── aboutSection.tsx    # Wrap headings/content with <AnimateIn>
│       ├── skillsSection.tsx   # Wrap with <AnimateIn> / <StaggerChildren>
│       ├── experienceSection.tsx
│       └── projectsSection.tsx
├── ui/
│   └── animate-in.tsx          # NEW: reusable 'use client' Motion wrapper
└── hooks/
    └── use-active-section.ts   # NEW: IntersectionObserver hook for active section
```

### Pattern 1: Smooth Scroll Setup

**What:** Add `scroll-smooth` to `<html>` and `scroll={false}` to all anchor `<Link>` components.

**When to use:** Any anchor link that targets a `#section-id`.

```typescript
// app/layout.tsx — add scroll-smooth and data-scroll-behavior
<html lang="en" className="scroll-smooth" data-scroll-behavior="smooth" suppressHydrationWarning>
```

```typescript
// navbar.tsx — anchor links MUST use scroll={false}
import Link from 'next/link'

<Link href="#about" scroll={false} className="...">
  About
</Link>
```

**Why `data-scroll-behavior="smooth"` matters:** Next.js reads this attribute to avoid interfering with scroll restoration on back/forward navigation. Without it, you may see a console warning.

### Pattern 2: Sticky Navbar with Scroll-Aware Background

**What:** useState + scroll event listener to apply backdrop-blur class after scroll threshold.

**When to use:** Navbar needs to detect scroll position to change appearance.

```typescript
'use client'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={cn(
      'fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300',
      scrolled
        ? 'bg-background/80 backdrop-blur-md shadow-sm border-b border-border'
        : 'bg-transparent'
    )}>
      {/* content */}
    </nav>
  )
}
```

**Note:** `{ passive: true }` on the scroll listener is critical for performance — it tells the browser the handler will not call `preventDefault()`.

### Pattern 3: Active Section Detection (IntersectionObserver)

**What:** Custom `useActiveSection` hook observes all sections, returns the ID of the currently visible one.

**When to use:** Drive the cyan underline on the active nav link.

```typescript
// app/hooks/use-active-section.ts
'use client'
import { useState, useEffect } from 'react'
import { NAV_LINKS } from '@/app/lib/constant'

export function useActiveSection(): string {
  const [activeSection, setActiveSection] = useState<string>('')

  useEffect(() => {
    const sectionIds = NAV_LINKS.map((link) => link.href.replace('#', ''))
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[]

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry with the highest intersection ratio
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible.length > 0) {
          setActiveSection(visible[0].target.id)
        }
      },
      {
        rootMargin: '-20% 0px -70% 0px', // trigger when section is in upper 30% of viewport
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return activeSection
}
```

**In navbar, drive the underline:**
```typescript
const activeSection = useActiveSection()

// On each nav link:
const isActive = link.href === `#${activeSection}`
<span className={cn(
  'absolute -bottom-1 left-0 right-0 h-0.5 bg-brand1 transition-opacity duration-200',
  isActive ? 'opacity-100' : 'opacity-0'
)} />
```

### Pattern 4: Mobile Hamburger Menu (Pure CSS bars → X)

**What:** Three `<span>` elements with CSS transitions triggered by `isOpen` state.

**When to use:** Mobile menu toggle (below md breakpoint).

```typescript
// Hamburger icon — spans controlled by isOpen state
<button
  aria-label={isOpen ? 'Close menu' : 'Open menu'}
  aria-expanded={isOpen}
  onClick={() => setIsOpen(!isOpen)}
  className="flex flex-col gap-1.5 p-2 md:hidden"
>
  <span className={cn(
    'block h-0.5 w-6 bg-foreground transition-all duration-300',
    isOpen ? 'translate-y-2 rotate-45' : ''
  )} />
  <span className={cn(
    'block h-0.5 w-6 bg-foreground transition-all duration-300',
    isOpen ? 'opacity-0' : ''
  )} />
  <span className={cn(
    'block h-0.5 w-6 bg-foreground transition-all duration-300',
    isOpen ? '-translate-y-2 -rotate-45' : ''
  )} />
</button>
```

**Full-screen overlay (with outside-click handler):**
```typescript
// Close on outside click
const menuRef = useRef<HTMLDivElement>(null)
useEffect(() => {
  if (!isOpen) return
  const handleClick = (e: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
      setIsOpen(false)
    }
  }
  document.addEventListener('mousedown', handleClick)
  return () => document.removeEventListener('mousedown', handleClick)
}, [isOpen])

// Overlay
{isOpen && (
  <div className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-background/95 backdrop-blur-md md:hidden">
    <nav ref={menuRef} className="flex flex-col items-center gap-8">
      {NAV_LINKS.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          scroll={false}
          onClick={() => setIsOpen(false)}
          className="font-inter text-2xl font-bold text-foreground hover:text-brand1 transition-colors"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  </div>
)}
```

### Pattern 5: Scroll-Reveal with Motion (fade-up)

**What:** `<AnimateIn>` client wrapper component using `motion.div` with `whileInView`.

**When to use:** Wrap section headings and card containers in section components.

```typescript
// app/ui/animate-in.tsx
'use client'
import { motion } from 'motion/react'

interface AnimateInProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

export function AnimateIn({ children, delay = 0, className }: AnimateInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: 'easeOut', delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
```

**Stagger children pattern (for card grids):**
```typescript
// app/ui/animate-in.tsx (add to same file)
export function StaggerChildren({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.1 } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
```

### Pattern 6: Global prefers-reduced-motion (MotionConfig)

**What:** Wrap the app in `<MotionConfig reducedMotion="user">` — all Motion components automatically skip transform/layout animations when OS reduced-motion is on.

**When to use:** Set once at layout level; covers entire app.

```typescript
// app/ui/theme/clientThemeProvider.tsx OR a new providers.tsx
'use client'
import { MotionConfig } from 'motion/react'
import { ThemeProvider } from 'next-themes'

export function ClientThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <MotionConfig reducedMotion="user">
        {children}
      </MotionConfig>
    </ThemeProvider>
  )
}
```

**Important:** `MotionConfig` is a Client Component. Since `clientThemeProvider.tsx` is already `'use client'`, it is the correct place to add this.

### Pattern 7: Section IDs (required for anchor scroll + IntersectionObserver)

All section components MUST have an `id` attribute matching the `NAV_LINKS` hrefs:

| Section Component | Required `id` | NAV_LINKS href |
|-------------------|--------------|----------------|
| `heroSection.tsx` | `id="hero"` | (not in nav, already present) |
| `aboutSection.tsx` | `id="about"` | `#about` |
| `skillsSection.tsx` | `id="skills"` | `#skills` |
| `projectsSection.tsx` | `id="projects"` | `#projects` |
| `experienceSection.tsx` | `id="experience"` | `#experience` |
| Contact section | `id="contact"` | `#contact` (phase 5) |

**Verify in each component** that the `<section id="...">` attribute is present. If absent, add it.

### Anti-Patterns to Avoid
- **Scroll listener without passive flag:** Causes jank. Always use `{ passive: true }`.
- **Using Next.js `<Link>` for anchors without `scroll={false}`:** Next.js Link hijacks scroll and breaks CSS smooth scroll.
- **Wrapping entire section in `'use client'`:** Kills server rendering. Use thin `<AnimateIn>` client wrapper instead.
- **IntersectionObserver without cleanup:** Memory leak. Always return `() => observer.disconnect()`.
- **Motion components without `viewport={{ once: true }}`:** Elements re-animate on scroll out and back. Set `once: true` for portfolio sections.
- **`rootMargin: '-50% 0px -50% 0px'` for active section:** Too strict for short sections like Hero. Use asymmetric margins like `-20% 0px -70% 0px`.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Smooth animation engine with spring physics | Custom CSS keyframes + JS | `motion` (`motion/react`) | Handles interruptible animations, spring physics, GPU compositing |
| prefers-reduced-motion detection | Custom `window.matchMedia` hook | `<MotionConfig reducedMotion="user">` or `useReducedMotion()` from `motion/react` | Already handles SSR, updates on OS setting change |
| Exit animations for mobile overlay | Manually toggling classes with timeout | `AnimatePresence` from `motion/react` | Safely unmounts after exit animation completes |

**Key insight:** Motion's `whileInView` + `viewport={{ once: true }}` is 3 lines vs. 25+ lines of manual IntersectionObserver + state for scroll-reveal. The only manual IntersectionObserver to write is the `useActiveSection` hook for navbar highlighting, which motion does not provide.

---

## Common Pitfalls

### Pitfall 1: Next.js Link Cancels Smooth Scroll
**What goes wrong:** Clicking a nav link scrolls instantly to the section, ignoring `scroll-behavior: smooth`.
**Why it happens:** Next.js `<Link>` has its own scroll management that fires before CSS `scroll-behavior`.
**How to avoid:** Always use `<Link href="#section" scroll={false}>` for same-page anchor links.
**Warning signs:** Instant jump instead of smooth animation on link click.

### Pitfall 2: Motion Components in Server Components
**What goes wrong:** Build error: `"motion" module cannot be used in a Server Component`.
**Why it happens:** `motion/react` uses React hooks internally; Server Components cannot use hooks.
**How to avoid:** All files importing from `motion/react` must have `'use client'` directive at the top. Section components stay Server Components — only the thin `<AnimateIn>` wrapper is client.
**Warning signs:** `Error: Hooks can only be used in Client Components` at build/runtime.

### Pitfall 3: IntersectionObserver Fires Before DOM is Ready
**What goes wrong:** `document.getElementById(id)` returns `null`; observer doesn't observe anything.
**Why it happens:** `useEffect` fires after mount, but in strict mode or with server rendering, sections may not all be painted.
**How to avoid:** The `useEffect` in `useActiveSection` filters out nulls (`.filter(Boolean)`). The effect only runs once on mount — no dependency array items needed.
**Warning signs:** Active section never updates; stays on empty string.

### Pitfall 4: Mobile Menu Body Scroll Bleed
**What goes wrong:** User can still scroll the page content behind the full-screen overlay.
**Why it happens:** The overlay is `fixed` positioned but doesn't prevent `body` scroll.
**How to avoid:** Toggle `overflow-hidden` on `body` when menu is open.
```typescript
useEffect(() => {
  document.body.style.overflow = isOpen ? 'hidden' : ''
  return () => { document.body.style.overflow = '' }
}, [isOpen])
```

### Pitfall 5: Multiple IntersectionObserver Conflicts
**What goes wrong:** Both `useActiveSection` (for nav) and `whileInView` (for animations) observe the same sections. Unexpected behavior.
**Why it happens:** They're independent observers — no conflict by design. Each observer is separate.
**How to avoid:** No action needed; this is fine. Document the pattern so the implementer doesn't combine them thinking there's a conflict.

### Pitfall 6: `motion` Import Path
**What goes wrong:** `import { motion } from 'framer-motion'` works but is the legacy path.
**Why it happens:** `framer-motion` was renamed to `motion` (package) in late 2024.
**How to avoid:** Always import from `'motion/react'`, not `'framer-motion'`.
```typescript
// CORRECT
import { motion, AnimatePresence, MotionConfig } from 'motion/react'
// LEGACY (still works but avoid in new code)
import { motion } from 'framer-motion'
```

---

## Code Examples

### Verified Pattern: MotionConfig at Provider Level
```typescript
// Source: motion.dev/docs/react-motion-config
// app/ui/theme/clientThemeProvider.tsx
'use client'
import { MotionConfig } from 'motion/react'
import { ThemeProvider } from 'next-themes'

export function ClientThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <MotionConfig reducedMotion="user">
        {children}
      </MotionConfig>
    </ThemeProvider>
  )
}
```

### Verified Pattern: whileInView with once
```typescript
// Source: motion.dev/docs/react-motion-component (whileInView prop)
import { motion } from 'motion/react'

// Fires once when element enters viewport; stays visible after
<motion.div
  initial={{ opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.2 }}
  transition={{ duration: 0.5, ease: 'easeOut' }}
>
  {children}
</motion.div>
```

### Verified Pattern: AnimatePresence for Mobile Overlay Exit
```typescript
// Source: motion.dev/docs/react-animate-presence
import { AnimatePresence, motion } from 'motion/react'

<AnimatePresence>
  {isOpen && (
    <motion.div
      key="mobile-menu"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-background/95 backdrop-blur-md"
    >
      {/* links */}
    </motion.div>
  )}
</AnimatePresence>
```

### Verified Pattern: Scroll-Smooth with Next.js Link
```typescript
// Source: mariogiancini.com/implementing-smooth-scroll-behavior-with-tailwind-css-and-nextjs
// layout.tsx
<html lang="en" className="scroll-smooth" data-scroll-behavior="smooth">

// Any anchor Link
<Link href="#about" scroll={false}>About</Link>
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `framer-motion` package | `motion` package (`import from 'motion/react'`) | Late 2024 | Same API, new package name; both work but `motion` is canonical |
| Manual `window.matchMedia` for reduced motion | `<MotionConfig reducedMotion="user">` | 2023 | Single config point; automatically propagates to all children |
| Scroll event listener for active section | `IntersectionObserver` | 2020+ standard | Async, no jank, better performance |
| JS-calculated scroll for anchors | CSS `scroll-behavior: smooth` + `data-scroll-behavior` | Next.js 13+ | Simpler, no JS overhead |

**Deprecated/outdated:**
- `framer-motion` named import: Replaced by `motion/react`. Still works as alias but avoid in new code.
- Scroll event listener for scroll spy: Replaced by IntersectionObserver (async, performant).

---

## Open Questions

1. **Does `clientThemeProvider.tsx` currently use `next-themes` ThemeProvider?**
   - What we know: File exists at `app/ui/theme/clientThemeProvider.tsx`, is `'use client'`, wraps the app.
   - What's unclear: Exact current implementation — may need `MotionConfig` added inside existing wrapper vs. replacing it.
   - Recommendation: Read the file in Wave 1, add `MotionConfig` inside the existing component.

2. **Do existing section components already have `id` attributes?**
   - What we know: `heroSection.tsx` has `id="hero"`. Others unconfirmed from this research.
   - What's unclear: Whether `aboutSection`, `skillsSection`, `experienceSection`, `projectsSection` have section IDs.
   - Recommendation: Plan Wave 1 to audit and add missing `id` attributes before adding animations.

3. **Does `app/page.tsx` need a Contact section placeholder?**
   - What we know: `NAV_LINKS` includes `#contact` but Phase 5 builds the contact form.
   - What's unclear: Whether the `#contact` anchor should exist in Phase 4 (empty section) or Phase 5.
   - Recommendation: Add an empty `<section id="contact" />` placeholder in Phase 4 so the nav link doesn't scroll to nowhere. Phase 5 will fill it.

---

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Vitest 4.x + @testing-library/react 16.x |
| Config file | `vitest.config.ts` (root) |
| Quick run command | `bun test --run tests/navbar.test.tsx` |
| Full suite command | `bun test` |

### Phase Requirements → Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| NAV-01 | Navbar renders all NAV_LINKS as anchor links | unit | `bun test --run tests/navbar.test.tsx` | ❌ Wave 0 |
| NAV-02 | Hamburger button present; mobile menu links rendered | unit | `bun test --run tests/navbar.test.tsx` | ❌ Wave 0 |
| NAV-03 | Active section class applied to matching link | unit (mock IntersectionObserver) | `bun test --run tests/navbar.test.tsx` | ❌ Wave 0 |
| ANIM-01 | AnimateIn wrapper renders children without error | unit | `bun test --run tests/animate-in.test.tsx` | ❌ Wave 0 |
| ANIM-02 | Hover classes present on interactive elements | unit (check className) | `bun test --run tests/navbar.test.tsx` | ❌ Wave 0 |
| ANIM-03 | MotionConfig with reducedMotion="user" present in provider | unit | `bun test --run tests/providers.test.tsx` | ❌ Wave 0 |
| DEPLOY-02 | Section IDs exist for all NAV_LINKS hrefs | unit | `bun test --run tests/sections.test.tsx` | ❌ Wave 0 |

**Note on ANIM-03 testing:** `MotionConfig reducedMotion` is a runtime behavior; unit tests can verify the prop is present in the provider render tree but cannot simulate OS-level reduced motion. ANIM-03 is best verified via manual testing or Playwright with `--force-prefers-reduced-motion`.

**Note on IntersectionObserver in jsdom:** jsdom does not implement `IntersectionObserver`. The `useActiveSection` hook test must mock `IntersectionObserver` globally in `tests/setup.ts`:
```typescript
// tests/setup.ts — add:
const mockIntersectionObserver = vi.fn()
mockIntersectionObserver.mockReturnValue({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
})
window.IntersectionObserver = mockIntersectionObserver
```

### Sampling Rate
- **Per task commit:** `bun test --run tests/navbar.test.tsx`
- **Per wave merge:** `bun test`
- **Phase gate:** Full suite green before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] `tests/navbar.test.tsx` — covers NAV-01, NAV-02, NAV-03, ANIM-02
- [ ] `tests/animate-in.test.tsx` — covers ANIM-01
- [ ] `tests/providers.test.tsx` — covers ANIM-03 (MotionConfig presence)
- [ ] `tests/setup.ts` — add `IntersectionObserver` mock
- [ ] Install: `bun add motion` — motion package not yet in dependencies

---

## Sources

### Primary (HIGH confidence)
- [motion.dev/docs/react](https://motion.dev/docs/react) — Getting started, import paths, `motion/react` canonical import
- [motion.dev/docs/react-use-reduced-motion](https://motion.dev/docs/react-use-reduced-motion) — `useReducedMotion` hook API
- [motion.dev/docs/react-motion-config](https://motion.dev/docs/react-motion-config) — `MotionConfig` with `reducedMotion` prop
- [motion.dev/docs/react-animate-presence](https://motion.dev/docs/react-animate-presence) — `AnimatePresence` exit animations
- [npm view motion version] — confirmed `12.38.0` current as of research date
- [nextjs.org/docs/messages/missing-data-scroll-behavior](https://nextjs.org/docs/messages/missing-data-scroll-behavior) — `data-scroll-behavior` attribute requirement

### Secondary (MEDIUM confidence)
- [mariogiancini.com — Smooth Scroll with Tailwind + Next.js](https://mariogiancini.com/implementing-smooth-scroll-behavior-with-tailwind-css-and-nextjs) — `<Link scroll={false}>` pattern verified against Next.js issue #51721
- [inhaq.com — Framer Motion Complete Guide](https://inhaq.com/blog/framer-motion-complete-guide-react-nextjs-developers) — `whileInView`, `MotionConfig`, `useReducedMotion` code examples
- [thomasledoux.be — Highlighting nav items on scroll](https://www.thomasledoux.be/blog/highlighting-navigation-items-on-scroll) — IntersectionObserver active section pattern
- [builder.io — React Intersection Observer Guide](https://www.builder.io/blog/react-intersection-observer) — Observer lifecycle and cleanup patterns

### Tertiary (LOW confidence)
- WebSearch results on hamburger CSS animations — pattern is well-established (Tailwind rotate/translate) but specific code examples need implementation-time verification

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — `motion` v12.38.0 confirmed via npm registry; patterns from official docs
- Architecture: HIGH — IntersectionObserver, `whileInView`, MotionConfig patterns from official Motion docs and verified community sources
- Pitfalls: HIGH — Next.js Link/smooth-scroll conflict verified via official Next.js docs and issue tracker

**Research date:** 2026-03-19
**Valid until:** 2026-04-18 (30 days — stable libraries)
