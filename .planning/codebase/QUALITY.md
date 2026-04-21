# Code Quality Analysis

**Analysis Date:** 2026-03-18

---

## Code Patterns and Consistency

**Component export style — mixed pattern:**
- Shadcn/ui-derived primitives use named exports: `export { Button, buttonVariants }` in `app/ui/button.tsx`, `export { Card, CardHeader, ... }` in `app/ui/card.tsx`
- Custom feature components use default exports: `export default function HeroSection()` in `app/ui/homepage/heroSection.tsx`, `export default function Navbar()` in `app/ui/navbar.tsx`
- Utility components use named exports: `export const SkillsCard` in `app/ui/skillsCard.tsx`, `export function UnderLine()` in `app/ui/underLine.tsx`

**Principle: default export for page-level/section components; named export for reusable UI primitives and utility components.**

**Data definition:**
- Static site data lives in `app/lib/constant.ts` as named `const` arrays: `LANGUAGE_ICONS`, `SKILLS`
- Some data is duplicated: `heroSection.tsx` lines 14–19 define a local `languages` array identical in shape to the `LANGUAGE_ICONS` entries in `app/lib/constant.ts`. This is a DRY violation — the hero section never imports from constant.ts for its own language badges.
- `professionalMetrics` array in `heroSection.tsx` (lines 21–25) is also defined inline with no corresponding entry in `app/lib/constant.ts`.

**Inline style vs. Tailwind:**
- Two instances of `style={{ opacity: 0.1 }}` in `aboutSection.tsx` (line 7) and `skillsSection.tsx` (line 11) — opacity is expressible as a Tailwind class (`opacity-10`) but is left as inline style.
- `style={{ zIndex: 1 }}` in `aboutSection.tsx` (line 16) — should be `z-[1]` or `z-10`.
- `style={{ color: iconColor }}` in `languageIcons.tsx` (line 22) — dynamic color cannot be a static Tailwind class; this is acceptable.

**Commented-out code:**
- `app/ui/navbar.tsx` lines 8–19: entire navigation link block is commented out. The navbar is currently non-functional for navigation.
- `.husky/pre-commit` lines 7–14: Prettier format check is commented out, meaning format is never enforced at commit time.

---

## TypeScript Usage and Type Safety

**Compiler settings (`tsconfig.json`):**
- `"strict": true` — all strict checks enabled, including `strictNullChecks`, `noImplicitAny`, `strictFunctionTypes`
- `"noEmit": true` — type checking only, no output generation
- `"target": "ES2017"`, `"module": "esnext"`, `"moduleResolution": "bundler"`

**Path alias:** `@/*` maps to project root. All imports use this alias consistently (e.g., `import { cn } from '@/app/lib/utils'`).

**Interface definitions — consistent and explicit:**
- `SkillsCardProps` in `app/ui/skillsCard.tsx` uses a verbose but precise Lucide icon type:
  ```typescript
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  >
  ```
- `LanguageIconsProps` in `app/ui/languageIcons.tsx` uses a loose union type:
  ```typescript
  icon: JSX.Element | React.FC<object>
  ```
  `JSX.Element` as a prop type is a weak pattern — it accepts any rendered element and cannot be rendered again. This should be `React.ReactNode | React.FC<object>` or narrowed to one branch.

**`React.FC` usage:**
- SVG components in `app/ui/svgs/index.tsx` declare `React.FC` without props: `export const HTMLIcon: React.FC = () => { ... }`. No `React.FC` import is present in that file — relies on a global `React` ambient type, which works only because `"allowJs": true` and the project has `@types/react`, but it is not an explicit import.

**No `any` usage detected** across all source files.

**No `@ts-ignore` or `@ts-expect-error` suppression** detected.

---

## Component Reusability

**Reusable primitives (good):**
- `app/ui/button.tsx` — CVA-based Button with `variant` and `size` props, `asChild` Slot support, `forwardRef`
- `app/ui/card.tsx` — `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter` with `forwardRef` and `cn()` className merging
- `app/ui/avatar.tsx` — `Avatar`, `AvatarImage`, `AvatarFallback` wrapping Radix Avatar
- `app/ui/dropdown-menu.tsx` — full Radix DropdownMenu surface
- `app/ui/select.tsx` — full Radix Select surface
- `app/ui/underLine.tsx` — decorative underline, zero props, purely presentational
- `app/ui/skillsCard.tsx` — `SkillsCard` with `name`, `icon`, `language[]`, `langClassName` props
- `app/ui/languageIcons.tsx` — `LanguageIcons` with `icon`, `iconName`, `iconColor` props

**Section components (not reusable — by design):**
- `app/ui/homepage/heroSection.tsx` — hardcoded personal data inline (email, location, job type, URL, name)
- `app/ui/homepage/aboutSection.tsx` — hardcoded biography text inline
- `app/ui/homepage/skillsSection.tsx` — reads from `app/lib/constant.ts` (correct pattern)

**Issue — data coupling in HeroSection:**
`heroSection.tsx` hardcodes all personal data directly in JSX strings. These values (email, location, availability, URL, name, bio blurb) should live in `app/lib/constant.ts` alongside `SKILLS` and `LANGUAGE_ICONS`. The section duplicates the `languages` data shape that already exists in `constant.ts` but never imports it.

**Theme components:**
- `app/ui/theme/theme-provider.tsx` — thin wrapper over `next-themes` `ThemeProvider`
- `app/ui/theme/clientThemeProvider.tsx` — `'use client'` wrapper adding hydration guard via `useState(mounted)`
- `app/ui/theme/theme-toggle.tsx` — `'use client'` dropdown consuming `useTheme`

---

## CSS/Styling Approach

**Method:** Tailwind CSS v3 with custom design tokens, `cn()` utility for class merging.

**`cn()` utility** (`app/lib/utils.ts`):
```typescript
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```
Use `cn()` for all conditional or merged class strings. Never use bare template literals for class merging.

**Custom design tokens defined in `tailwind.config.ts`:**

Colors:
- `brand1`: `#12F7D6` (teal accent)
- `brand2`: `#98FAEC` (lighter teal)
- `bg1`: `#292F36`, `bg2`: `#1A1E23`
- `grey`: `#43454D`
- Language colors: `html`, `css`, `js`, `react` (hex values registered as color names)

Typography scale (custom `fontSize` keys):
- Ubuntu: `bg-text-u`, `h1-u`, `h2-u`, `button-u`, `article-u`, `para-u`, `label-u-m`, `label-u-l`
- IBM Plex Mono: `number-m`, `h2-m`, `logo-m`, `menu-m`, `media-m`, `para-m`, `code-m`

Font families:
- `font-ubuntu` → `var(--font-ubuntu)`
- `font-ibmPlexMono` → `var(--font-ibm-plex-mono)`
- `font-sans` → `var(--font-geist-sans)`
- `font-mono` → `var(--font-geist-mono)`

Background images: `bg-about-bg`, `bg-skills-bg` (registered in `backgroundImage`)

**Theme system:** Three themes (`light`, `dark`, `midnight_steel`) defined as CSS variable sets in `app/globals.css`. The `midnight_steel` theme is the default (`clientThemeProvider.tsx` line 22). Theme switching via `darkMode: ['class']` — Tailwind reads a class on `<html>`.

**Inconsistency — CSS variable syntax error in `globals.css`:**
```css
--card: 213.33, 14.75%, 11.96%;    /* line 70 — comma-separated, not space-separated */
--card-foreground: 213.33, 10.75%, 75.96%;  /* line 71 */
```
All other HSL variables use space separation (e.g., `--background: 210 13% 19%`). These two midnight_steel variables are malformed and will not resolve correctly via `hsl(var(--card))`.

**Prettier sorts Tailwind classes** via `prettier-plugin-tailwindcss`. ESLint validates Tailwind class names via `eslint-plugin-tailwindcss` with `callees: ['cn']`.

**Inline styles present** in three locations:
- `style={{ opacity: 0.1 }}` — `aboutSection.tsx:7`, `skillsSection.tsx:11`
- `style={{ zIndex: 1 }}` — `aboutSection.tsx:16`
These should be converted to Tailwind (`opacity-10`, `z-[1]`).

---

## Testing Coverage

**No tests exist** in this project. There are no `*.test.ts`, `*.test.tsx`, `*.spec.ts`, or `*.spec.tsx` files anywhere outside of `node_modules`.

**No test runner configured:**
- No Jest, Vitest, or Playwright config files present
- No `@testing-library/*` packages in `package.json`
- No test scripts in `package.json` (`scripts` contains only `dev`, `build`, `start`, `lint`, `prepare`, `check-types`, `check-format`, `check-lint`, `format`)

**Coverage: 0%** — no automated testing of any kind.

---

## Linting and Formatting Setup

**Prettier** (`/.prettierrc.json`):
```json
{
  "trailingComma": "es5",
  "tabWidth": 2,
  "semi": false,
  "singleQuote": true,
  "tailwindConfig": "./tailwind.config.ts",
  "plugins": [
    "@ianvs/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss"
  ]
}
```
- No semicolons
- Single quotes
- 2-space indent
- Import order sorted automatically via `@ianvs/prettier-plugin-sort-imports`
- Tailwind classes sorted automatically via `prettier-plugin-tailwindcss`

**ESLint** (`/.eslintrc.json`):
- Extends: `next/core-web-vitals`, `next/typescript`, `prettier`, `plugin:tailwindcss/recommended`
- Parser: `@typescript-eslint/parser` with `ecmaVersion: 2021`
- Key rules:
  - `semi: "off"` — defers to Prettier
  - `tailwindcss/no-custom-classname: "off"` — custom design tokens are allowed
  - `unused-imports/no-unused-imports: "warn"` — warns on unused imports
  - `unused-imports/no-unused-vars: "warn"` — warns on unused variables
  - `@typescript-eslint/no-unused-vars: "off"` — disabled in favour of unused-imports plugin
- Ignore patterns: `node_modules/`, `.next/`, `assets/`, `public/`
- `settings.tailwindcss.callees: ["cn"]` — ESLint knows `cn()` carries Tailwind classes

**Husky pre-commit hook** (`.husky/pre-commit`):
- Runs `pnpm run check-lint` (ESLint) — enforced
- Runs `pnpm run check-types` (TypeScript) — enforced
- `pnpm run check-format` (Prettier) is **commented out** — formatting is never enforced at commit time

**Available scripts:**
```bash
pnpm run lint          # next lint
pnpm run check-types   # tsc --pretty --noEmit
pnpm run check-format  # prettier --check .
pnpm run check-lint    # eslint . --ext ts --ext tsx --ext js
pnpm run format        # prettier --write .
```

**Enforcement gap:** Prettier check is disabled in the pre-commit hook. Developers can commit unformatted code without triggering a failure. Re-enable the `check-format` step in `.husky/pre-commit` to close this gap.

---

## Summary Table

| Area | Status | Notes |
|------|--------|-------|
| TypeScript strict mode | Enabled | `"strict": true` in tsconfig |
| No `any` usage | Clean | Zero `any` in source files |
| Linting | Active | ESLint runs on commit |
| Type checking | Active | `tsc --noEmit` runs on commit |
| Format enforcement | Disabled | Prettier check commented out in pre-commit |
| Testing | None | Zero test files, no test runner configured |
| DRY (data) | Partial | `languages` array duplicated in `heroSection.tsx` vs `constant.ts` |
| Hardcoded content | Present | Personal data hardcoded in `heroSection.tsx`, `aboutSection.tsx` |
| Inline styles | 3 instances | Should be Tailwind classes |
| CSS variable syntax | Bug | Two malformed HSL vars in `midnight_steel` theme |
| Commented-out code | Present | Navbar links, pre-commit format check |
| Loose types | 1 instance | `JSX.Element` in `LanguageIconsProps.icon` |

---

*Quality analysis: 2026-03-18*
