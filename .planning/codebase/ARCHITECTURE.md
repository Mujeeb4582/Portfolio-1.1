# Architecture

**Analysis Date:** 2026-03-18

## Pattern Overview

**Overall:** Single-page portfolio application using Next.js App Router with a flat section-based layout pattern.

**Key Characteristics:**
- No client-side routing — single route (`/`) renders all content as stacked sections
- Server Components by default; `'use client'` only used for interactive UI (theme toggle, theme provider, Radix primitives)
- Static data lives in `app/lib/constant.ts` — no API calls, no server-side data fetching
- Theme system built on `next-themes` with three named themes: `light`, `dark`, `midnight_steel`
- UI primitives sourced from shadcn/ui (Radix UI + CVA) and stored under `app/ui/`

## Layers

**Root Layout:**
- Purpose: Wraps the entire app with fonts, global styles, theme provider, and persistent navbar
- Location: `app/layout.tsx`
- Contains: Font registration (Geist, Ubuntu, IBM Plex Mono), `ClientThemeProvider`, `Navbar`
- Depends on: `app/ui/navbar.tsx`, `app/ui/theme/clientThemeProvider.tsx`, `app/globals.css`
- Used by: All pages via Next.js App Router convention

**Page (Homepage):**
- Purpose: Assembles the three visible sections in vertical order
- Location: `app/page.tsx`
- Contains: `HeroSection`, `AboutSection`, `SkillsSection` composed in a flex column
- Depends on: `app/ui/homepage/`
- Used by: App Router renders this at `/`

**Section Components:**
- Purpose: Self-contained page sections, each owning its own markup and internal layout
- Location: `app/ui/homepage/`
- Contains: `heroSection.tsx`, `aboutSection.tsx`, `skillsSection.tsx`
- Depends on: Shared UI primitives (`app/ui/`), constants (`app/lib/constant.ts`)
- Used by: `app/page.tsx`

**Shared UI Primitives:**
- Purpose: Reusable, unstyled-base components adapted from shadcn/ui
- Location: `app/ui/` (flat — not nested under `homepage/`)
- Contains: `avatar.tsx`, `button.tsx`, `card.tsx`, `dropdown-menu.tsx`, `input.tsx`, `label.tsx`, `select.tsx`, `skillsCard.tsx`, `languageIcons.tsx`, `underLine.tsx`
- Depends on: Radix UI primitives, `app/lib/utils.ts` (for `cn()`), `class-variance-authority`
- Used by: Section components and `app/ui/theme/theme-toggle.tsx`

**Theme Layer:**
- Purpose: Hydration-safe theme switching via `next-themes`
- Location: `app/ui/theme/`
- Contains: `clientThemeProvider.tsx` (mount guard), `theme-provider.tsx` (thin wrapper), `theme-toggle.tsx` (dropdown UI)
- Depends on: `next-themes`, `app/ui/button.tsx`, `app/ui/dropdown-menu.tsx`
- Used by: `app/layout.tsx` wraps with `ClientThemeProvider`; `app/ui/navbar.tsx` renders `ThemeToggle`

**Data / Constants:**
- Purpose: Static structured data consumed by section components
- Location: `app/lib/constant.ts`
- Contains: `LANGUAGE_ICONS` array, `SKILLS` array
- Depends on: `app/ui/svgs/index.tsx` (custom SVG icon components), `lucide-react`
- Used by: `app/ui/homepage/skillsSection.tsx`

**Utilities:**
- Purpose: Shared helper for merging Tailwind class names
- Location: `app/lib/utils.ts`
- Contains: `cn()` — combines `clsx` + `tailwind-merge`
- Depends on: `clsx`, `tailwind-merge`
- Used by: All shadcn/ui-based components in `app/ui/`

**SVG Icons:**
- Purpose: Inline custom SVG icons for HTML, CSS, JS, and React
- Location: `app/ui/svgs/index.tsx`
- Contains: `HTMLIcon`, `CSSIcon`, `JSIcon`, `ReactIcon` as typed `React.FC` components
- Depends on: Nothing (pure JSX)
- Used by: `app/lib/constant.ts` (imported into `LANGUAGE_ICONS`)

## Data Flow

**Theme State:**

1. `ClientThemeProvider` in `app/layout.tsx` wraps the entire app
2. It uses a `mounted` guard (`useState` + `useEffect`) to prevent hydration mismatch
3. Once mounted, renders `ThemeProvider` (wraps `next-themes` `NextThemesProvider`)
4. `ThemeToggle` in `Navbar` calls `useTheme()` to read available themes and `setTheme()`
5. Selected theme class (`light` / `dark` / `midnight_steel`) is applied to `<html>` element
6. CSS variables in `app/globals.css` respond to the active class and drive all color tokens

**Section Rendering:**

1. `app/page.tsx` imports and composes the three section components directly
2. `SkillsSection` imports `SKILLS` and `LANGUAGE_ICONS` from `app/lib/constant.ts`
3. Constants reference SVG components from `app/ui/svgs/index.tsx`
4. Section components render using shared UI primitives (`SkillsCard`, `LanguageIcons`, `Card`, `Avatar`, etc.)
5. No props are passed from page to sections — each section is self-contained

**State Management:**
- No global state manager (no Redux, Zustand, Context beyond theme)
- Only state in the app is `mounted: boolean` in `ClientThemeProvider` and theme state inside `next-themes`
- All content data is static — no async fetching, no loading states

## Key Abstractions

**Section Component:**
- Purpose: Represents one full-width portfolio section (hero, about, skills)
- Examples: `app/ui/homepage/heroSection.tsx`, `app/ui/homepage/aboutSection.tsx`, `app/ui/homepage/skillsSection.tsx`
- Pattern: Default export function, self-contained markup, no props accepted from parent

**shadcn/ui Primitive:**
- Purpose: Accessible, composable UI atoms adapted from Radix UI
- Examples: `app/ui/button.tsx`, `app/ui/card.tsx`, `app/ui/avatar.tsx`, `app/ui/dropdown-menu.tsx`
- Pattern: `React.forwardRef` wrapping Radix primitives, class merging via `cn()`, variants via `cva()`

**Custom Display Component:**
- Purpose: Portfolio-specific presentational components with typed props
- Examples: `app/ui/skillsCard.tsx`, `app/ui/languageIcons.tsx`, `app/ui/underLine.tsx`
- Pattern: Named export `React.FC<Props>`, explicit interface for props, Tailwind-only styling

**Static Data Constant:**
- Purpose: Centralizes content arrays so section components stay logic-free
- Examples: `SKILLS`, `LANGUAGE_ICONS` in `app/lib/constant.ts`
- Pattern: `export const NAME = [...]` — typed inline, imported directly by consuming component

## Entry Points

**App Entry:**
- Location: `app/layout.tsx`
- Triggers: Next.js App Router on every request
- Responsibilities: Register fonts as CSS variables, apply global styles, mount theme provider, render persistent `Navbar`, render page `children`

**Homepage:**
- Location: `app/page.tsx`
- Triggers: Request to `/`
- Responsibilities: Assemble `HeroSection`, `AboutSection`, `SkillsSection` in vertical order inside a full-width flex column

## Error Handling

**Strategy:** None implemented — static portfolio with no data fetching or user input paths that could fail.

**Patterns:**
- `AvatarFallback` in `app/ui/avatar.tsx` provides a fallback if avatar image fails to load
- `ClientThemeProvider` renders children without the theme wrapper until mounted, preventing hydration errors

## Cross-Cutting Concerns

**Theming:** CSS custom properties defined per theme class in `app/globals.css`; Tailwind color tokens reference these variables; three themes supported: `light`, `dark`, `midnight_steel` (default)

**Typography:** Four font families registered as CSS variables in `app/layout.tsx` and exposed as Tailwind font utilities (`font-ubuntu`, `font-ibmPlexMono`, `font-sans`, `font-mono`); custom font size scale defined in `tailwind.config.ts`

**Styling:** Tailwind CSS utility-first; custom design tokens (colors `brand1`, `brand2`, `bg1`, `bg2`, `grey`; font sizes `logo-m`, `h2-u`, `code-m`, etc.) defined in `tailwind.config.ts`

**Path Aliases:** `@/` maps to the project root (e.g. `@/app/lib/utils`, `@/app/ui/button`) via `tsconfig.json`

**Validation:** Not applicable — no forms or user input

**Logging:** Not applicable — no server-side logic

---

*Architecture analysis: 2026-03-18*
