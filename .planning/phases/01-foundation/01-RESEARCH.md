# Phase 1: Foundation - Research

**Researched:** 2026-03-18
**Domain:** Brownfield Next.js upgrade (15 → 16), React 18 → 19, Tailwind CSS v3 → v4, pnpm → bun, dark mode migration, shadcn/ui re-init, ESLint flat config, TypeScript data layer
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Design Tokens**
- Keep existing cyan brand color (#12F7D6) as primary accent
- Keep brand2 (#98FAEC) as secondary accent
- Keep three themes: light, dark, midnight_steel (default)
- System preference auto-detection with manual toggle
- Standard rounded border radius (0.5rem) — uncomment and wire `--radius` CSS variable
- Migrate all CSS variables and custom colors from `tailwind.config.ts` to Tailwind v4 `@theme {}` directives in `globals.css`

**Font Choices**
- Switch from Ubuntu + IBM Plex Mono to Inter + JetBrains Mono
- Inter: headings, body text, UI elements (via Google Fonts or `next/font`)
- JetBrains Mono: code snippets, tech badges, monospace accents
- Remove unused Geist fonts (GeistVF.woff, GeistMonoVF.woff) from `app/fonts/`
- Update Tailwind font scale tokens to use new font families

**Data Structure**
- All portfolio content lives in `app/lib/constant.ts`
- TypeScript interfaces in `app/lib/types.ts`
- Project interface must include: title, description, techStack (string[]), screenshot path, role, company, type ('web' | 'mobile'), liveUrl?, githubUrl?, caseStudyUrl?
- Experience interface: company, role, dateRange, location ('Remote'), responsibilities (string[]), projects (ProjectReference[])
- Skills organized by category: Frontend, Backend, Mobile, LLM/AI, Tools — each with icon and proficiency
- Personal info: name, title, email, whatsApp, github, linkedIn, bio, stats
- 6 featured projects: Buildable, MISA App, Uber-like App, Re-View, LSTN, WellShared
- Projects visually distinguish web vs mobile using device frames
- Each project card shows: title, description, tech stack badges, screenshot, role + company
- Project links: live demo, GitHub repo, case study (all optional per project)

**Package Manager Migration**
- Clean break: delete `node_modules/` and `pnpm-lock.yaml`, run `bun install` fresh
- Update all `package.json` scripts to use bun-compatible commands
- Remove `pnpm` references from Husky hooks and CI configs

**Git Hooks**
- Claude's Discretion: Choose between Husky v9 or simple-git-hooks — whichever integrates best with bun
- Pre-commit should run: lint check + TypeScript type check
- Update hook commands from `pnpm run` to `bun run`

### Claude's Discretion
- ESLint migration strategy (flat config vs staying on v8 compatibility)
- Exact Tailwind v4 migration approach (manual vs `@tailwindcss/upgrade` CLI)
- Whether to keep `tailwindcss-animate` or switch to `tw-animate-css` for shadcn v4
- Hook solution choice (Husky v9 vs simple-git-hooks)
- Inter font loading strategy (Google Fonts vs bundled via `next/font/google`)

### Deferred Ideas (OUT OF SCOPE)
None — discussion stayed within phase scope
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| FOUND-01 | Upgrade to Next.js 16 with Turbopack and React Compiler enabled | Turbopack is now the default in Next.js 16; no extra config needed. React Compiler is built-in. See Standard Stack section. |
| FOUND-02 | React 19 with all deprecated APIs resolved | React 19.2.4 is current. Main breaking change: `forwardRef` deprecated (pass ref as prop). Run Next.js codemod. |
| FOUND-03 | Tailwind CSS v3 → v4 with CSS-first `@theme {}` config | Full migration path documented in Pitfalls and Code Examples sections. Use `@tailwindcss/upgrade` codemod. |
| FOUND-04 | shadcn/ui updated to v4 with Tailwind v4 compatibility | Re-init with `npx shadcn@latest init`, replace `tailwindcss-animate` with `tw-animate-css`. |
| FOUND-05 | All existing components compile and render correctly after upgrade | Verify by running `bun run build` after each migration step; check TypeScript errors with `bunx tsc --noEmit`. |
| FOUND-06 | Dark mode works with Tailwind v4 `@custom-variant` | Critical: add `@custom-variant dark (&:where(.dark, .dark *))` to `globals.css`. See Pitfall 4 and Code Examples. |
| FOUND-07 | Dead code, unused imports, placeholder content removed | CONCERNS.md catalogues all: Geist fonts, inline styles, duplicate language data, placeholder avatar, commented nav. |
| FOUND-08 | `constant.ts` expanded with all portfolio content | Full data for 6 projects, 4 experience entries, skills by category, personal info. Interfaces from types.ts first. |
| FOUND-09 | TypeScript interfaces for all data structures | Create `app/lib/types.ts` before constant.ts expansion. See Architecture Patterns for full interface shapes. |
| NAV-04 | Theme toggle with system preference auto-detection | next-themes `defaultTheme="system"` + `enableSystem={true}`. Tailwind v4 `@custom-variant` required for dark classes to apply. |
</phase_requirements>

---

## Summary

Phase 1 is a multi-part brownfield upgrade: migrate the package manager from pnpm to bun, upgrade the entire dependency tree (Next.js 15 → 16, React 18 → 19, Tailwind v3 → v4), re-initialize shadcn/ui for Tailwind v4, migrate ESLint config from legacy `.eslintrc.json` to flat `eslint.config.js`, resolve all resulting pitfalls (dark mode breakage, shadcn animation plugin deprecation, async API removal, renamed CSS utilities), clean dead code from the existing codebase, and create the TypeScript data layer (`types.ts` + expanded `constant.ts`) that all subsequent phases depend on.

The upgrade chain has specific sequencing requirements. Tailwind v4 migration must happen before shadcn re-init. ESLint migration must happen before ESLint upgrade (upgrading ESLint while still on `.eslintrc.json` silently breaks linting). Geist fonts must be deleted before the Tailwind v4 codemod runs (so dead tokens are not carried forward). The `@custom-variant dark` declaration in `globals.css` is the single most critical fix — without it, the entire dark mode system is non-functional after migration. This is confirmed in the official Tailwind v4 upgrade docs.

The data layer (`types.ts` first, then `constant.ts`) is Phase 1's second major responsibility. All six sections in Phases 2–4 import their content directly from `constant.ts`. The interfaces must be defined before any constants are populated, and the constants must be populated with real data before any section components can render correct content.

**Primary recommendation:** Execute in strict order — (1) pnpm → bun migration, (2) Next.js + React upgrade with codemod, (3) Tailwind v4 migration with codemod, (4) shadcn re-init, (5) ESLint flat config migration, (6) dead code cleanup, (7) create `types.ts`, (8) expand `constant.ts` with all portfolio data.

---

## Standard Stack

### Core (Target State after Phase 1)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| next | 16.1.7 | App framework | Latest stable; Turbopack default, React Compiler built-in, App Router standard |
| react / react-dom | 19.2.4 | UI runtime | Ships with Next.js 16; Actions API, automatic memoization |
| typescript | 5.9.3 | Type safety | Already present; no version change needed |
| tailwindcss | 4.2.1 | Utility styling | CSS-first config, 5x faster builds, required for shadcn CLI v4 |
| @tailwindcss/postcss | 4.2.1 | PostCSS plugin | Replaces `tailwindcss` PostCSS plugin in v4; must update `postcss.config.mjs` |
| tw-animate-css | 1.4.0 | CSS animations | Replaces deprecated `tailwindcss-animate`; required for shadcn/ui v4 enter/exit animations |
| next-themes | 0.4.6 | Theme switching | Already present; zero-flicker, works with Tailwind v4 `@custom-variant` |
| tailwind-merge | 3.5.0 | Class merging | Upgrade from 2.5.5; `cn()` helper pattern |
| class-variance-authority | 0.7.1 | Variant styling | Already present; shadcn dependency — no change |
| clsx | 2.1.1 | Class joining | Already present; no change |
| lucide-react | 0.577.0 | Icons | Upgrade from 0.462.0; shadcn default icon set |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @types/react | 19.2.14 | React type definitions | Must match React version (upgrade from 18.x to 19.x) |
| @types/react-dom | 19.2.3 | ReactDOM type definitions | Must match React version |
| @types/node | 22.x | Node type definitions | Upgrade from 20.x to match Node.js 22 runtime |
| eslint | 9.x (via eslint-config-next) | Linting | Next.js 16 bundles ESLint; migrate config to flat format first |
| eslint-config-next | 16.1.7 | Next.js lint rules | Must match Next.js version; includes flat config support |
| husky | 9.1.7 | Git hooks | OR use simple-git-hooks 2.13.1 (see discretion section) |
| simple-git-hooks | 2.13.1 | Git hooks (alternative) | Simpler bun integration than Husky v9; recommended over Husky for bun projects |
| prettier | 3.x | Formatting | Already present; keep with current plugins |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| simple-git-hooks | Husky v9 | Husky v9 changed API significantly; simple-git-hooks is lighter and works better with bun's `prepare` script; choose simple-git-hooks |
| `@tailwindcss/upgrade` CLI | Manual migration | Manual is error-prone across 50+ custom tokens; CLI handles 90% of class renames automatically; always run CLI first |
| `next/font/google` for Inter | Google Fonts CDN `<link>` | `next/font/google` bundles font at build time, zero FOUT, no external request at runtime; always use `next/font/google` |

**Installation (target state with bun):**
```bash
# Delete old lockfile and node_modules first
rm -rf node_modules pnpm-lock.yaml

# Install with bun
bun add next@16.1.7 react@19.2.4 react-dom@19.2.4
bun add tailwindcss@^4.2.1 @tailwindcss/postcss@^4.2.1
bun add tw-animate-css tailwind-merge@^3.5.0
bun add -d @types/react@^19.2.14 @types/react-dom@^19.2.3
bun add -d eslint-config-next@^16.1.7 simple-git-hooks@^2.13.1

# Run official Tailwind v4 upgrade codemod (after bun install)
bunx @tailwindcss/upgrade@next

# Re-initialize shadcn/ui for Tailwind v4
bunx shadcn@latest init
```

**Version verification:** All versions above verified against npm registry on 2026-03-18.

---

## Architecture Patterns

### Recommended Project Structure (after Phase 1)

```
app/
├── lib/
│   ├── types.ts          # TypeScript interfaces (Project, Experience, Skill, PersonalInfo)
│   ├── constant.ts       # All portfolio data — single source of truth
│   └── utils.ts          # cn() helper — keep as-is
├── ui/
│   ├── theme/            # clientThemeProvider, theme-provider, theme-toggle
│   ├── svgs/             # Custom SVG icons (keep, expand)
│   ├── homepage/         # Section components (heroSection, aboutSection, skillsSection)
│   ├── button.tsx        # shadcn/ui primitives (re-generated by shadcn CLI)
│   ├── card.tsx
│   ├── dropdown-menu.tsx
│   ├── input.tsx         # Keep — needed for Phase 5 contact form
│   ├── label.tsx         # Keep — needed for Phase 5 contact form
│   └── select.tsx        # Keep — needed for Phase 5 contact form
├── fonts/                # REMOVE GeistVF.woff, GeistMonoVF.woff (dead weight)
├── globals.css           # Tailwind v4 @import, @theme {}, @custom-variant dark
├── layout.tsx            # Inter + JetBrains Mono, suppressHydrationWarning on <html>
└── page.tsx              # Compositor — assembles sections

# Top-level config files
eslint.config.js          # NEW — flat config replaces .eslintrc.json
postcss.config.mjs        # Updated — @tailwindcss/postcss plugin
package.json              # bun scripts, updated dependencies
.husky/ (OR)              # Removed if switching to simple-git-hooks
.simple-git-hooks          # Added if using simple-git-hooks
# REMOVED: tailwind.config.ts (replaced by @theme {} in globals.css)
# REMOVED: .eslintrc.json (replaced by eslint.config.js)
```

### Pattern 1: Tailwind v4 CSS-First Configuration

**What:** All design tokens migrate from `tailwind.config.ts` to `@theme {}` in `globals.css`. The JS config file is deleted entirely after migration.

**When to use:** Always, for this project — Tailwind v4 requires it.

**Example:**
```css
/* app/globals.css */
@import "tailwindcss";
@import "tw-animate-css";

/* Dark mode variant for next-themes class-based switching */
@custom-variant dark (&:where(.dark, .dark *));

@theme {
  /* Brand colors */
  --color-brand1: #12F7D6;
  --color-brand2: #98FAEC;
  --color-bg1: #292F36;
  --color-bg2: #1A1E23;
  --color-grey: #43454D;

  /* shadcn/ui semantic tokens — light theme defaults */
  --color-background: hsl(0 0% 100%);
  --color-foreground: hsl(20 14.3% 4.1%);
  --color-border: hsl(20 5.9% 90%);
  --color-input: hsl(20 5.9% 90%);
  --color-ring: hsl(20 14.3% 4.1%);
  --color-primary: hsl(24 9.8% 10%);
  --color-primary-foreground: hsl(60 9.1% 97.8%);
  /* ... full token set */

  /* Fonts */
  --font-inter: 'Inter', sans-serif;
  --font-jetbrains: 'JetBrains Mono', monospace;

  /* Border radius */
  --radius: 0.5rem;
  --radius-lg: var(--radius);
  --radius-md: calc(var(--radius) - 2px);
  --radius-sm: calc(var(--radius) - 4px);
}

/* Theme-specific overrides */
.dark {
  --color-background: hsl(20 14.3% 4.1%);
  --color-foreground: hsl(60 9.1% 97.8%);
  /* ... */
}

.midnight_steel {
  --color-background: hsl(210 13% 19%);
  --color-foreground: hsl(210 10% 95%);
  --color-bg1: #292F36;
  --color-bg2: #1A1E23;
  /* ... */
}
```

### Pattern 2: TypeScript Interface Definition (types.ts)

**What:** All data shapes defined in one file; consumed by `constant.ts` and section components.

**When to use:** Before any data constants are written.

**Example:**
```typescript
// app/lib/types.ts

export interface Project {
  title: string
  description: string
  techStack: string[]
  screenshotPath: string
  role: string
  company: string
  type: 'web' | 'mobile'
  liveUrl?: string
  githubUrl?: string
  caseStudyUrl?: string
}

export interface ProjectReference {
  title: string
  description?: string
}

export interface Experience {
  company: string
  role: string
  dateRange: string
  location: 'Remote'
  responsibilities: string[]
  projects: ProjectReference[]
}

export interface Skill {
  name: string
  category: 'Frontend' | 'Backend' | 'Mobile' | 'LLM/AI' | 'Tools'
  icon?: React.ComponentType | string
  proficiency: 'core' | 'proficient' | 'familiar'
}

export interface PersonalInfo {
  name: string
  title: string
  email: string
  whatsApp: string
  github: string
  linkedIn: string
  bio: string
  stats: {
    yearsExperience: number
    projectsCompleted: number
    technologiesUsed: number
  }
}
```

### Pattern 3: Font Loading with next/font

**What:** Inter and JetBrains Mono loaded via `next/font/google` (zero external requests at runtime, no FOUT).

**When to use:** All font loading — never use `<link>` tags for Google Fonts.

**Example:**
```typescript
// app/layout.tsx
import { Inter, JetBrains_Mono } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  weight: ['400', '500', '700'],
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}>
        <ClientThemeProvider>
          <Navbar />
          {children}
        </ClientThemeProvider>
      </body>
    </html>
  )
}
```

**Critical:** `suppressHydrationWarning` on `<html>` is required when using `next-themes` — the theme class is added after initial render, causing a React hydration mismatch without it.

### Pattern 4: ESLint Flat Config (eslint.config.js)

**What:** Replace `.eslintrc.json` with flat config format required by ESLint v9+.

**When to use:** ESLint v9+ (which ships with Next.js 16's `eslint-config-next`).

**Example:**
```javascript
// eslint.config.js
import { FlatCompat } from "@eslint/eslintrc"
import js from "@eslint/js"

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
})

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
]

export default eslintConfig
```

**Note:** The `prettier` and `tailwindcss` ESLint plugins must also be migrated to flat config compatible versions. Check `eslint-config-prettier` (v9+) and `eslint-plugin-tailwindcss` (v3.17+ supports flat config).

### Pattern 5: simple-git-hooks (recommended over Husky for bun)

**What:** Lightweight git hooks without the Husky v9 migration complexity. Better bun compatibility.

**When to use:** New bun projects or when migrating away from Husky.

**Example:**
```json
// package.json
{
  "simple-git-hooks": {
    "pre-commit": "bun run check-lint && bun run check-types"
  },
  "scripts": {
    "prepare": "simple-git-hooks",
    "check-types": "bunx tsc --noEmit",
    "check-lint": "eslint .",
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start"
  }
}
```

After installing: `bun run prepare` registers the hooks.

### Anti-Patterns to Avoid

- **Keeping `tailwindcss-animate` after Tailwind v4 migration:** shadcn animations silently break; replace with `tw-animate-css` and `@import "tw-animate-css"` in globals.css.
- **Omitting `@custom-variant dark` from globals.css:** The entire dark mode breaks; no `dark:` classes apply anywhere.
- **Running the Tailwind codemod before deleting Geist fonts:** Dead font tokens get carried forward into the new `@theme {}` block.
- **Upgrading ESLint before migrating to flat config:** Linting silently stops working; `.eslintrc.json` is ignored by ESLint v9+.
- **Leaving `tailwind.config.ts` in place after migration:** Can cause conflicts if `@config` directive is accidentally present; delete it once all tokens are in `globals.css`.
- **Using `<html>` without `suppressHydrationWarning`:** `next-themes` injects class after hydration, causing React hydration mismatch warnings.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Tailwind class merge conflicts | Custom deduplication logic | `tailwind-merge` via `cn()` | Handles specificity edge cases, v4 class name variants, arbitrary values |
| Theme switching without flash | Manual `localStorage` read + cookie trick | `next-themes` | Zero-flicker implementation requires injecting script in `<head>` before React hydration — next-themes does this correctly |
| Font loading without FOUT | `<link>` CDN + `font-display: swap` | `next/font/google` | Next.js bundles fonts at build time, serves from same domain, no layout shift |
| Import sorting | Manual sorting convention | `@ianvs/prettier-plugin-sort-imports` | Already in project; keeps imports deterministic across contributors |
| Tailwind class sorting in JSX | Manual ordering convention | `prettier-plugin-tailwindcss` | Already in project; auto-sorts at save time |
| Git hooks across machines | `chmod +x` scripts + README instructions | `simple-git-hooks` | Hooks installed by `prepare` script on every `bun install` — can't be skipped |

**Key insight:** The migration tooling (`@tailwindcss/upgrade`, `@next/codemod`) handles the bulk of mechanical changes. Custom scripts for token migration or class renames are inferior to the official codemods.

---

## Common Pitfalls

### Pitfall 1: Dark Mode Completely Breaks After Tailwind v4 Migration

**What goes wrong:** After migrating to Tailwind v4, toggling dark mode has no visual effect. All `dark:` prefixed classes produce no CSS output.

**Why it happens:** `darkMode: "class"` in `tailwind.config.ts` is not recognized in Tailwind v4. Dark variant must be explicitly declared in CSS.

**How to avoid:** In `globals.css`, add this line before any other `@theme` or `@layer` declarations:
```css
@custom-variant dark (&:where(.dark, .dark *));
```
This tells Tailwind v4 to apply `dark:` utilities when a `.dark` class exists on any ancestor — which matches how `next-themes` works.

**Warning signs:** Theme toggle button updates the HTML class but no visual change occurs.

**Confidence:** HIGH — official Tailwind v4 docs + Tailwind GitHub discussion #16517.

---

### Pitfall 2: shadcn Animation Classes Break After Tailwind v4 Migration

**What goes wrong:** shadcn/ui components (dropdown, popover, dialog) lose all enter/exit animations. `animate-in`, `fade-in-0`, `zoom-in-95` classes produce no output.

**Why it happens:** `tailwindcss-animate` uses the Tailwind v3 plugin API. It is incompatible with Tailwind v4.

**How to avoid:**
1. Uninstall `tailwindcss-animate`: remove from `package.json`
2. Install `tw-animate-css`: `bun add tw-animate-css`
3. In `globals.css`, add: `@import "tw-animate-css";`
4. Remove any `plugins: [tailwindcssAnimate]` from `tailwind.config.ts` (which will be deleted anyway)

**Warning signs:** shadcn dropdowns open/close without transition; console warns about unknown plugin format.

**Confidence:** HIGH — official shadcn/ui Tailwind v4 migration guide.

---

### Pitfall 3: Next.js 16 Removes Synchronous Async APIs

**What goes wrong:** Any code calling `cookies()`, `headers()`, `params`, or `searchParams` synchronously (without `await`) throws a runtime error.

**Why it happens:** Next.js 15 deprecated but still supported these calls with a warning. Next.js 16 removes the compatibility shim entirely.

**How to avoid:**
- Run `bunx @next/codemod@canary upgrade latest` before upgrading Next.js — it automatically inserts `await` where needed.
- The current codebase has no API routes yet, so this mainly affects any new route handlers written during the upgrade (write them async-first from the start).
- Check `app/layout.tsx` for any synchronous use of params/searchParams in page props.

**Warning signs:** Build-time TypeScript errors about non-awaited async functions; runtime errors in Vercel logs on first API route call.

**Confidence:** HIGH — official Next.js 16 upgrade guide.

---

### Pitfall 4: ESLint v9 Silently Drops `.eslintrc.json`

**What goes wrong:** After upgrading `eslint-config-next` to v16 (which depends on ESLint v9), linting either silently passes all files or throws a config-not-found error.

**Why it happens:** ESLint v9 only reads `eslint.config.js` (flat config format). It ignores `.eslintrc.json` entirely.

**How to avoid:**
- Migrate `.eslintrc.json` to `eslint.config.js` before (or as part of) the dependency upgrade.
- Update `package.json` lint script from `next lint` (removed in Next.js 16) to `eslint .`
- Verify: after migration, intentionally introduce a lint error and confirm it is caught.

**Warning signs:** `eslint .` reports 0 errors on a file with obvious issues; CI passes files it should reject.

**Confidence:** HIGH — official ESLint v9 migration guide; Next.js 16 removes `next lint` command.

---

### Pitfall 5: Geist Font Files Carried Into Tailwind v4 Migration

**What goes wrong:** If `GeistVF.woff` and `GeistMonoVF.woff` are still loaded in `layout.tsx` when the Tailwind v4 codemod runs, the codemod copies `font-sans: var(--font-geist-sans)` and `font-mono: var(--font-geist-mono)` into the new `@theme {}` block — perpetuating dead font tokens that add ~200KB to every page load.

**Why it happens:** The codemod translates all existing `tailwind.config.ts` tokens without filtering dead code.

**How to avoid:**
- Delete `GeistVF.woff` and `GeistMonoVF.woff` from `app/fonts/`
- Remove `geistSans` and `geistMono` `localFont()` calls from `layout.tsx`
- Remove `sans` and `mono` font tokens from `tailwind.config.ts`
- **Do this before running `@tailwindcss/upgrade`**

**Warning signs:** Lighthouse "Eliminate unused font files"; Network tab shows GeistVF.woff downloaded with zero styled text using it.

**Confidence:** HIGH — confirmed via direct codebase analysis in CONCERNS.md.

---

### Pitfall 6: Tailwind v4 Renamed Shadow, Ring, and Rounded Utilities

**What goes wrong:** After v4 migration, subtle visual regressions appear — shadows are smaller, focus rings are thinner, rounded corners appear unstyled.

**Why it happens:** Tailwind v4 shifted the utility scale: `shadow-sm` → `shadow-xs`, `shadow` → `shadow-sm`, `rounded-sm` → `rounded-xs`, `outline-none` → `outline-hidden`, `ring` (3px) → `ring-3` (explicit).

**How to avoid:**
- The `@tailwindcss/upgrade` codemod handles most renames automatically.
- After codemod, grep for `shadow-sm`, `rounded-sm`, `outline-none`, `ring` (standalone) and verify each.
- shadcn/ui component files installed from the old CLI are NOT automatically updated by the codemod — review `button.tsx`, `card.tsx`, `dropdown-menu.tsx` for these patterns after re-initializing shadcn.

**Warning signs:** After migration, focus states look wrong; card shadows look different; rounded corners change.

**Confidence:** HIGH — official Tailwind v4 upgrade guide.

---

### Pitfall 7: Husky v9 API Change Breaks Pre-commit Hooks Silently

**What goes wrong:** After upgrading from Husky v8 to v9, commits that should be blocked by TypeScript errors succeed without rejection.

**Why it happens:** Husky v9 changed both the `prepare` script format and the hook file format. The old hooks continue to exist but are not invoked.

**How to avoid (Husky path):**
- Change `"prepare": "husky install"` → `"prepare": "husky"` in `package.json`
- Migrate hook files to plain shell scripts without the old `husky-run` prefix

**Recommendation:** Switch to `simple-git-hooks` instead. It is lighter, works cleanly with bun's `prepare` script lifecycle, and has no API changes between versions. Uninstall Husky, install `simple-git-hooks`, configure in `package.json`.

**Warning signs:** Committing TypeScript errors succeeds; `git log` shows commits that should have been blocked.

**Confidence:** MEDIUM (Husky path); HIGH (simple-git-hooks recommendation based on bun compatibility).

---

### Pitfall 8: Three-Theme Dark Mode (midnight_steel) Requires Explicit Tailwind Variants

**What goes wrong:** The third theme `midnight_steel` does not have a `dark:` Tailwind variant. Components styled with `dark:` classes will apply their dark styles when the `.midnight_steel` class is on `<html>` only if `midnight_steel` is also covered by the `@custom-variant dark` selector.

**Why it happens:** The `@custom-variant dark (&:where(.dark, .dark *))` selector only covers `.dark`. The `.midnight_steel` theme may need its own variant or be included in the dark selector.

**How to avoid:**
Option A — Include `midnight_steel` in the dark variant:
```css
@custom-variant dark (&:where(.dark, .midnight_steel, .dark *, .midnight_steel *));
```
Option B — Use only CSS variable overrides for `midnight_steel` (no `dark:` classes for it; rely entirely on CSS variable theming through `@layer base` theme blocks).

**Recommendation:** Option B is cleaner. Keep `midnight_steel` purely CSS-variable-driven. Use `dark:` classes only for the `.dark` theme. The existing `globals.css` already has `.midnight_steel` theme block — this pattern should continue in Tailwind v4.

**Warning signs:** `midnight_steel` renders light-theme colors for `dark:` prefixed classes; toggling to `midnight_steel` shows no theming.

**Confidence:** MEDIUM — based on analysis of current codebase theme structure and Tailwind v4 custom-variant documentation.

---

## Code Examples

Verified patterns from official sources and direct codebase analysis:

### Tailwind v4: PostCSS Config Update

```javascript
// postcss.config.mjs
// Source: tailwindcss.com/docs/installation/framework-guides — Next.js guide
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
```

### Tailwind v4: globals.css Base Structure

```css
/* app/globals.css */
/* Source: tailwindcss.com/docs/upgrade-guide */
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:where(.dark, .dark *));

@theme {
  /* Brand tokens */
  --color-brand1: #12F7D6;
  --color-brand2: #98FAEC;
  --color-bg1: #292F36;
  --color-bg2: #1A1E23;
  --color-grey: #43454D;

  /* Typography */
  --font-inter: var(--font-inter-variable), 'Inter', sans-serif;
  --font-jetbrains: var(--font-jetbrains-variable), 'JetBrains Mono', monospace;

  /* Radius tokens */
  --radius: 0.5rem;
  --radius-lg: var(--radius);
  --radius-md: calc(var(--radius) - 2px);
  --radius-sm: calc(var(--radius) - 4px);

  /* shadcn/ui semantic tokens — default (light) */
  --color-background: hsl(0 0% 100%);
  --color-foreground: hsl(20 14.3% 4.1%);
  --color-card: hsl(0 0% 100%);
  --color-card-foreground: hsl(20 14.3% 4.1%);
  --color-primary: hsl(24 9.8% 10%);
  --color-primary-foreground: hsl(60 9.1% 97.8%);
  --color-secondary: hsl(60 4.8% 95.9%);
  --color-secondary-foreground: hsl(24 9.8% 10%);
  --color-muted: hsl(60 4.8% 95.9%);
  --color-muted-foreground: hsl(25 5.3% 44.7%);
  --color-accent: hsl(60 4.8% 95.9%);
  --color-accent-foreground: hsl(24 9.8% 10%);
  --color-destructive: hsl(0 84.2% 60.2%);
  --color-border: hsl(20 5.9% 90%);
  --color-input: hsl(20 5.9% 90%);
  --color-ring: hsl(20 14.3% 4.1%);
}

@layer base {
  .dark {
    --color-background: hsl(20 14.3% 4.1%);
    --color-foreground: hsl(60 9.1% 97.8%);
    /* ... full dark token set */
  }

  .midnight_steel {
    --color-background: hsl(210 13% 19%);
    --color-foreground: hsl(210 10% 95%);
    /* ... midnight_steel token set */
  }

  * {
    @apply border-border;
  }

  body {
    @apply bg-background text-foreground;
  }
}
```

### Tailwind v4 + next-themes: Theme Provider Configuration

```typescript
// app/ui/theme/clientThemeProvider.tsx — updated for Tailwind v4
'use client'
import { useState, useEffect } from 'react'
import { ThemeProvider } from 'next-themes'

export function ClientThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <>{children}</>

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem={true}
      themes={['light', 'dark', 'midnight_steel']}
    >
      {children}
    </ThemeProvider>
  )
}
```

### simple-git-hooks: Full Configuration

```json
// package.json — simple-git-hooks replacing Husky
{
  "scripts": {
    "prepare": "simple-git-hooks",
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "check-types": "bunx tsc --noEmit",
    "check-lint": "eslint .",
    "format": "prettier --write ."
  },
  "simple-git-hooks": {
    "pre-commit": "bun run check-lint && bun run check-types"
  }
}
```

### Next.js 16: Running the Upgrade Codemod

```bash
# Source: nextjs.org/docs/app/guides/upgrading/version-16
# Run BEFORE changing package.json to Next.js 16
bunx @next/codemod@canary upgrade latest
```

This codemod handles: async API insertion, deprecated prop cleanup, TypeScript type updates.

### constant.ts: Expanded Structure Pattern

```typescript
// app/lib/constant.ts — pattern after Phase 1 expansion
import type { Project, Experience, Skill, PersonalInfo } from './types'

export const PERSONAL_INFO: PersonalInfo = {
  name: 'Mujeeb ur Rahman',
  title: 'Full-Stack Web Developer',
  email: 'mujeeburahman4582@gmail.com',
  whatsApp: '+92-3479334219',
  github: 'https://github.com/Mujeeb4582',
  linkedIn: 'https://linkedin.com/in/mujeeb-ur-rahman',
  bio: '...', // real bio text
  stats: {
    yearsExperience: 4,
    projectsCompleted: 6,
    technologiesUsed: 20,
  },
}

export const PROJECTS: Project[] = [
  {
    title: 'Buildable',
    description: 'AI-powered real estate analytics platform for Dubai...',
    techStack: ['Next.js', 'React', 'FastAPI', 'Supabase', 'PostgreSQL', 'LiteLLM', 'Langfuse'],
    screenshotPath: '/projects/buildable.webp',
    role: 'Full-Stack Web Developer',
    company: 'Wonder Crafts',
    type: 'web',
    githubUrl: undefined,
    liveUrl: undefined,
    caseStudyUrl: undefined,
  },
  // ... 5 more projects
]

export const EXPERIENCE: Experience[] = [
  {
    company: 'Wonder Crafts',
    role: 'Full-Stack Web Developer',
    dateRange: 'May 2023 – Present',
    location: 'Remote',
    responsibilities: ['...'],
    projects: [{ title: 'Buildable' }, { title: 'Re-View' }, { title: 'LSTN' }, { title: 'WellShared' }],
  },
  // ... 3 more entries
]

export const SKILLS: Skill[] = [
  { name: 'React', category: 'Frontend', proficiency: 'core' },
  { name: 'Next.js', category: 'Frontend', proficiency: 'core' },
  { name: 'TypeScript', category: 'Frontend', proficiency: 'core' },
  { name: 'OpenAI API', category: 'LLM/AI', proficiency: 'proficient' },
  // ... full skill list
]
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `tailwind.config.ts` JS config | `@theme {}` in `globals.css` | Tailwind v4 (Jan 2025) | Config is now CSS; no JS needed; tokens hot-reload without rebuild |
| `darkMode: "class"` in JS config | `@custom-variant dark` in CSS | Tailwind v4 (Jan 2025) | Must add explicitly; without it, all dark: classes silently fail |
| `tailwindcss-animate` plugin | `tw-animate-css` import | shadcn/ui v4 (2025) | Direct CSS import replaces Tailwind plugin API |
| `postcss.config.mjs`: `tailwindcss` plugin | `@tailwindcss/postcss` plugin | Tailwind v4 | Separate PostCSS package required |
| `next lint` command | `eslint .` command | Next.js 16 | `next lint` removed; ESLint called directly |
| `.eslintrc.json` (eslintrc format) | `eslint.config.js` (flat config) | ESLint v9 (2024) | Legacy format ignored by ESLint v9+ |
| `husky install` in prepare script | `husky` (v9) or `simple-git-hooks` | Husky v9 (2024) | API changed; simple-git-hooks is simpler for bun |
| `React.forwardRef` wrapping | Ref as regular prop | React 19 (Dec 2024) | `forwardRef` deprecated; refs pass through directly |
| `framer-motion` package | `motion` package (`motion/react`) | Motion v11 (2024) | Package renamed; import path changed |

**Deprecated/outdated in this upgrade:**
- `tailwindcss-animate`: deprecated for Tailwind v4; replace with `tw-animate-css`
- `.eslintrc.json`: not read by ESLint v9+; replace with `eslint.config.js`
- `husky install`: Husky v9 changed to `husky init`; better to use `simple-git-hooks` for bun
- `next lint`: removed in Next.js 16; use `eslint .` directly
- `tailwind.config.ts`: replaced by `@theme {}` in CSS; file can be deleted after migration
- `localFont` for Geist fonts: fonts are unused; entire loading code deleted
- `Ubuntu` + `IBM Plex Mono` Google fonts: replaced by `Inter` + `JetBrains Mono`

---

## Open Questions

1. **LinkedIn URL for personal info in constant.ts**
   - What we know: GitHub URL is `https://github.com/Mujeeb4582` (confirmed in PROJECT.md)
   - What's unclear: LinkedIn profile URL — not documented in any planning file
   - Recommendation: Leave `linkedIn: 'https://linkedin.com/in/mujeeb-ur-rahman'` as a placeholder string that the implementer fills in with the real URL before Phase 2 renders it

2. **midnight_steel and the dark: variant coverage**
   - What we know: The project uses three themes; `dark:` Tailwind classes only apply to `.dark` by default with the standard `@custom-variant` declaration
   - What's unclear: Which approach is correct — include `midnight_steel` in the dark custom-variant selector, or rely purely on CSS variable overrides for midnight_steel
   - Recommendation: Use Option B (CSS-variable-only approach for `midnight_steel`). The existing `globals.css` already uses this pattern (.midnight_steel block in `@layer base`). Maintain it in Tailwind v4. Do not add `midnight_steel` to the dark variant selector — it is a separate theme, not a "dark mode variant."

3. **`@tailwindcss/upgrade` codemod scope**
   - What we know: The codemod handles 90% of class renames and config migration automatically
   - What's unclear: Whether it correctly handles the custom `fontSize` scale tokens (Ubuntu/IBM Plex Mono naming convention) and `backgroundImage` tokens
   - Recommendation: After running the codemod, manually verify the `@theme {}` block contains the font size tokens under new names, and that `bg-about-bg` / `bg-skills-bg` background image utilities still work (or are removed as part of dead code cleanup)

---

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | None currently installed — must add in Wave 0 |
| Config file | None — see Wave 0 gaps |
| Quick run command | `bun run test` |
| Full suite command | `bun run test --run` |

**Note:** The project has zero test infrastructure. Wave 0 must scaffold Vitest + React Testing Library before any implementation tasks run.

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| FOUND-01 | `bun run dev` starts without errors on Next.js 16 + Turbopack | smoke | `bun run build && echo "build OK"` | ❌ Wave 0 |
| FOUND-02 | React 19 runs without deprecated API errors | smoke | `bunx tsc --noEmit` | ❌ Wave 0 |
| FOUND-03 | Tailwind v4 `@theme {}` tokens apply (brand1 color renders) | visual/unit | `vitest run tests/tailwind-tokens.test.ts` | ❌ Wave 0 |
| FOUND-04 | shadcn components render without broken animations | unit | `vitest run tests/shadcn-components.test.tsx` | ❌ Wave 0 |
| FOUND-05 | Existing components compile and render without errors | unit | `vitest run tests/existing-components.test.tsx` | ❌ Wave 0 |
| FOUND-06 | Dark mode toggle changes theme class and applies dark styles | unit | `vitest run tests/dark-mode.test.tsx` | ❌ Wave 0 |
| FOUND-07 | No dead imports or unused files present | lint | `eslint . --max-warnings 0` | ❌ Wave 0 |
| FOUND-08 | constant.ts exports all required portfolio data | unit | `vitest run tests/constants.test.ts` | ❌ Wave 0 |
| FOUND-09 | types.ts exports valid TypeScript interfaces (tsc check) | type check | `bunx tsc --noEmit` | ❌ Wave 0 |
| NAV-04 | Theme toggle renders with 3 options; system preference detected | unit | `vitest run tests/theme-toggle.test.tsx` | ❌ Wave 0 |

### Sampling Rate

- **Per task commit:** `bunx tsc --noEmit && eslint . --max-warnings 0`
- **Per wave merge:** `bun run test --run`
- **Phase gate:** Full suite green + `bun run build` succeeds before `/gsd:verify-work`

### Wave 0 Gaps

- [ ] `package.json` — add `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `@vitejs/plugin-react` as dev deps
- [ ] `vitest.config.ts` — configure with jsdom environment and Next.js compatibility
- [ ] `tests/setup.ts` — shared test setup importing `@testing-library/jest-dom`
- [ ] `tests/dark-mode.test.tsx` — covers FOUND-06 and NAV-04
- [ ] `tests/constants.test.ts` — covers FOUND-08 (exported arrays have correct shape)
- [ ] `tests/existing-components.test.tsx` — covers FOUND-04 and FOUND-05
- [ ] `tests/shadcn-components.test.tsx` — covers FOUND-04 (theme toggle dropdown renders)

Framework install:
```bash
bun add -d vitest @testing-library/react @testing-library/jest-dom @vitejs/plugin-react jsdom
```

---

## Sources

### Primary (HIGH confidence)

- [nextjs.org/docs/app/guides/upgrading/version-16](https://nextjs.org/docs/app/guides/upgrading/version-16) — Next.js 16 upgrade guide, async API removal, Turbopack defaults
- [tailwindcss.com/docs/upgrade-guide](https://tailwindcss.com/docs/upgrade-guide) — Tailwind v4 full upgrade guide, renamed utilities, PostCSS changes, @theme syntax
- [ui.shadcn.com/docs/tailwind-v4](https://ui.shadcn.com/docs/tailwind-v4) — shadcn/ui Tailwind v4 migration: `tw-animate-css`, CLI v4 init
- [react.dev/blog/2024/12/05/react-19](https://react.dev/blog/2024/12/05/react-19) — React 19 stable release notes, forwardRef deprecation
- [eslint.org/docs/latest/use/migrate-to-9.0.0](https://eslint.org/docs/latest/use/migrate-to-9.0.0) — ESLint v9 flat config migration
- Internal codebase analysis: `.planning/codebase/CONCERNS.md` — direct code inspection, current package versions confirmed
- Internal codebase analysis: `.planning/codebase/STACK.md` — current dependency tree
- Internal codebase analysis: `.planning/codebase/ARCHITECTURE.md` — component structure and data flow
- Internal research: `.planning/research/PITFALLS.md` — pre-researched migration pitfalls with official source citations
- Internal research: `.planning/research/STACK.md` — target stack with version recommendations
- npm registry (verified 2026-03-18): next@16.1.7, react@19.2.4, tailwindcss@4.2.1, @tailwindcss/postcss@4.2.1, tw-animate-css@1.4.0, next-themes@0.4.6, tailwind-merge@3.5.0, simple-git-hooks@2.13.1, husky@9.1.7, lucide-react@0.577.0, eslint@10.0.3

### Secondary (MEDIUM confidence)

- [github.com/tailwindlabs/tailwindcss/discussions/16517](https://github.com/tailwindlabs/tailwindcss/discussions/16517) — Community-verified `@custom-variant dark` workaround for next-themes + Tailwind v4
- Husky v9 migration notes — format change in hook file structure and `prepare` script

### Tertiary (LOW confidence)

- simple-git-hooks README — bun compatibility notes

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all versions verified against npm registry 2026-03-18
- Architecture: HIGH — based on direct inspection of actual source files in the codebase
- Migration pitfalls: HIGH — sourced from official upgrade guides for each tool; pre-verified in `.planning/research/PITFALLS.md`
- Data layer patterns: HIGH — TypeScript interface shapes derived directly from decisions locked in CONTEXT.md
- Validation architecture: MEDIUM — framework choice (Vitest) is standard for Next.js + bun; specific test commands unverified against a running setup

**Research date:** 2026-03-18
**Valid until:** 2026-04-18 (Next.js and Tailwind release frequently; re-verify versions if planning is delayed more than 30 days)
