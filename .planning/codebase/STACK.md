# Technology Stack

**Analysis Date:** 2026-03-18

## Languages

**Primary:**
- TypeScript ^5 - All application code in `app/` directory
- TSX - React component files throughout `app/ui/`

**Secondary:**
- CSS (via Tailwind utility classes) - Global styles in `app/globals.css`

## Runtime

**Environment:**
- Node.js v22.15.1

**Package Manager:**
- pnpm 10.11.0
- Lockfile: `pnpm-lock.yaml` present (lockfileVersion: 9.0)

## Frameworks

**Core:**
- Next.js 15.0.3 - App Router, React Server Components, file-based routing under `app/`
- React 18 - UI rendering
- React DOM 18 - DOM binding

**Build/Dev:**
- Turbopack - Dev server (`next dev --turbopack` in `package.json`)
- PostCSS ^8 - CSS processing, config in `postcss.config.mjs`
- TypeScript ^5 - Static typing, config in `tsconfig.json`

## UI Library & Styling

**Component System:**
- shadcn/ui - Component primitives installed via `components.json` (style: "default", RSC enabled)
  - Config: `components.json`
  - Component aliases: `@/app/ui` for UI components, `@/app/lib/utils` for utilities

**Radix UI Primitives (underlying shadcn/ui):**
- `@radix-ui/react-avatar` ^1.1.2
- `@radix-ui/react-dropdown-menu` ^2.1.2
- `@radix-ui/react-label` ^2.1.0
- `@radix-ui/react-select` ^2.1.2
- `@radix-ui/react-slot` ^1.1.0

**Styling:**
- Tailwind CSS ^3.4.1 - Utility-first CSS, config in `tailwind.config.ts`
- `tailwindcss-animate` ^1.0.7 - Animation utilities (registered as Tailwind plugin)
- `class-variance-authority` ^0.7.1 - Variant-based class generation for component variants
- `clsx` ^2.1.1 - Conditional class joining
- `tailwind-merge` ^2.5.5 - Merging Tailwind class conflicts; used via `cn()` helper in `app/lib/utils.ts`

**Theming:**
- `next-themes` ^0.4.3 - Dark/light/custom theme switching
  - Provider: `app/ui/theme/clientThemeProvider.tsx`
  - Themes configured: `light`, `dark`, `midnight_steel`
  - Default theme: `midnight_steel`

**Icons:**
- `lucide-react` ^0.462.0 - Icon library (configured as default in `components.json`)

## Fonts

All fonts loaded via `next/font` in `app/layout.tsx`:
- Geist Sans (local) - variable `--font-geist-sans`, source `app/fonts/GeistVF.woff`
- Geist Mono (local) - variable `--font-geist-mono`, source `app/fonts/GeistMonoVF.woff`
- Ubuntu (Google) - variable `--font-ubuntu`, weight 400
- IBM Plex Mono (Google) - variable `--font-ibm-plex-mono`, weight 400

Custom font size tokens defined in `tailwind.config.ts` under two type scales:
- Ubuntu scale: `bg-text-u`, `h1-u`, `h2-u`, `button-u`, `article-u`, `para-u`, `label-u-m`, `label-u-l`
- IBM Plex Mono scale: `number-m`, `h2-m`, `logo-m`, `menu-m`, `media-m`, `para-m`, `code-m`

## Key Dependencies

**Critical:**
- `next` 15.0.3 - Framework providing routing, SSR, RSC, image optimization
- `react` / `react-dom` 18 - UI layer
- `tailwindcss` ^3.4.1 - Primary styling mechanism

**Infrastructure:**
- `typescript` ^5 - Type safety across the codebase
- `postcss` ^8 - Required Tailwind processing step

## Configuration

**TypeScript (`tsconfig.json`):**
- Target: ES2017
- Strict mode: enabled
- Module resolution: `bundler`
- Path alias: `@/*` maps to project root `./`
- Incremental compilation enabled

**Tailwind (`tailwind.config.ts`):**
- Dark mode: `class`-based
- Content scanned: `./pages/**`, `./components/**`, `./app/**`
- CSS variables used for all semantic color tokens
- Custom brand colors: `bg1 #292F36`, `bg2 #1A1E23`, `brand1 #12F7D6`, `brand2 #98FAEC`

**shadcn/ui (`components.json`):**
- Base color: stone
- CSS variables: enabled
- RSC: enabled
- TSX: enabled
- UI output alias: `@/app/ui`

**PostCSS (`postcss.config.mjs`):**
- Single plugin: `tailwindcss`

## Code Quality Tooling

**Linting (`/.eslintrc.json`):**
- Parser: `@typescript-eslint/parser` ^8.16.0
- Extends: `next/core-web-vitals`, `next/typescript`, `prettier`, `plugin:tailwindcss/recommended`
- Plugins: `tailwindcss`, `unused-imports`
- Notable rules:
  - `unused-imports/no-unused-imports`: warn
  - `unused-imports/no-unused-vars`: warn
  - `tailwindcss/no-custom-classname`: off (allows custom tokens)
  - `semi`: off
- `cn()` callees recognized by the Tailwind ESLint plugin

**Formatting (`/.prettierrc.json`):**
- Single quotes
- No semicolons
- 2-space tab width
- Trailing commas: ES5
- Plugins:
  - `@ianvs/prettier-plugin-sort-imports` ^4.4.0 - Auto-sorted imports
  - `prettier-plugin-tailwindcss` ^0.6.9 - Auto-sorted Tailwind class order

**Git Hooks (`/.husky/pre-commit`):**
- Manager: Husky ^8.0.0
- Pre-commit checks run via pnpm:
  1. ESLint (`pnpm run check-lint`)
  2. TypeScript type check (`pnpm run check-types` → `tsc --noEmit`)
- Prettier format check is present but commented out

## Platform Requirements

**Development:**
- Node.js v22+ (v22.15.1 confirmed)
- pnpm 10+ as package manager
- Run: `pnpm dev` (Turbopack dev server)

**Production:**
- Build: `pnpm build` → `next build`
- Start: `pnpm start` → `next start`
- Deployment target: Not explicitly configured (standard Next.js, compatible with Vercel/Node server)

---

*Stack analysis: 2026-03-18*
