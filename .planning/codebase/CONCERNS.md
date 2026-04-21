# Codebase Concerns

**Analysis Date:** 2026-03-18

---

## Commented-Out / Incomplete Navigation

**Navbar links are fully commented out:**
- Issue: All four navigation links (Home, About, Projects, Contact) in `app/ui/navbar.tsx` lines 8–19 are wrapped in a JSX comment block. The navbar renders nothing but the logo and theme toggle. There are no page routes for `/about`, `/projects`, or `/contact`.
- Files: `app/ui/navbar.tsx`
- Impact: The portfolio has no navigation. Visitors cannot move between sections or pages. The Projects section — a core portfolio requirement — does not exist at all.
- Fix approach: Create route pages under `app/about/`, `app/projects/`, `app/contact/`, then uncomment and replace `href="#"` anchors with `<Link href="/projects">` etc.

---

## Placeholder / Stub Links

**Non-functional "Let's Talk" and website links:**
- Issue: Two interactive elements in `app/ui/homepage/heroSection.tsx` use `href="#"` as their destination — the personal website link (`www.mujeeb.com`, line 52) and the "Let's Talk" mail icon (line 107). These render as clickable but go nowhere.
- Files: `app/ui/homepage/heroSection.tsx`
- Impact: Visitors who try to contact the developer or visit the linked site get a no-op scroll-to-top. For a portfolio, broken contact calls-to-action directly undermine the purpose.
- Fix approach: Replace `href="#"` with `href="mailto:mujeeburahman4582@gmail.com"` for the mail icon and `href="https://www.mujeeb.com"` (with `target="_blank" rel="noopener noreferrer"`) for the website link.

---

## Placeholder Profile Image (GitHub Shadcn Avatar)

**Avatar uses an external third-party placeholder image:**
- Issue: `app/ui/homepage/heroSection.tsx` line 33 sets `src="https://github.com/shadcn.png"` — the shadcn/ui demo avatar. This is a runtime HTTP dependency on an external image that belongs to someone else's GitHub account.
- Files: `app/ui/homepage/heroSection.tsx`
- Impact: The profile photo is not the developer's own. If GitHub's CDN is unavailable or the URL changes, the avatar silently falls back to the "CN" text fallback. It also leaks a third-party request on every page load.
- Fix approach: Replace with a self-hosted image in `public/` (e.g., `public/profile.jpg`) and update `src` to `/profile.jpg`.

---

## Missing Portfolio Sections (Projects, Contact, Experience)

**Core portfolio content sections are absent:**
- Issue: The page only renders three sections: `HeroSection`, `AboutSection`, and `SkillsSection`. Standard portfolio sections — Projects/Work, Experience/Timeline, Contact Form — do not exist anywhere in the codebase.
- Files: `app/page.tsx`, `app/ui/homepage/`
- Impact: The portfolio cannot serve its purpose without a projects showcase. Recruiters and clients have no way to see work samples or reach out via a form.
- Fix approach: Add `app/ui/homepage/projectsSection.tsx`, `app/ui/homepage/contactSection.tsx`, and `app/ui/homepage/experienceSection.tsx`. Wire them into `app/page.tsx`.

---

## Unused UI Components (Input, Label, Select, CardHeader/CardTitle/etc.)

**Several Shadcn/Radix components are installed but never imported in any page or section:**
- Issue:
  - `app/ui/input.tsx` — `Input` component has no import anywhere outside its own file
  - `app/ui/label.tsx` — `Label` component has no import anywhere outside its own file
  - `app/ui/select.tsx` — Entire `Select` family has no import anywhere outside its own file
  - `app/ui/card.tsx` — `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter` are exported but only `Card` is used (in `heroSection.tsx`)
  - `app/ui/dropdown-menu.tsx` — `DropdownMenuCheckboxItem`, `DropdownMenuRadioItem`, `DropdownMenuRadioGroup`, `DropdownMenuLabel`, `DropdownMenuSeparator`, `DropdownMenuShortcut`, `DropdownMenuSubTrigger`, `DropdownMenuSubContent` are exported but only the core menu items are consumed in `theme-toggle.tsx`
- Files: `app/ui/input.tsx`, `app/ui/label.tsx`, `app/ui/select.tsx`, `app/ui/card.tsx`, `app/ui/dropdown-menu.tsx`
- Impact: Dead code that inflates bundle size and creates maintenance surface. Radix `@radix-ui/react-select` and `@radix-ui/react-label` are production dependencies whose only purpose is powering these unused components.
- Fix approach: Either implement a contact form (which would justify `Input`, `Label`, and `Select`), or remove the unused component files and uninstall `@radix-ui/react-label` and `@radix-ui/react-select` from `package.json`.

---

## Geist Fonts Loaded But Never Used in Styling

**Two local Geist fonts are registered in layout but no component applies them:**
- Issue: `app/layout.tsx` loads `GeistVF.woff` and `GeistMonoVF.woff` via `localFont()` and injects `--font-geist-sans` and `--font-geist-mono` CSS variables into the `<body>` className. However, `tailwind.config.ts` maps `font-sans` to `var(--font-geist-sans)` and `font-mono` to `var(--font-geist-mono)`, but no component in the codebase applies `font-sans` or `font-mono` classes — all text uses `font-ubuntu` or `font-ibmPlexMono` explicitly.
- Files: `app/layout.tsx`, `app/fonts/GeistVF.woff`, `app/fonts/GeistMonoVF.woff`, `tailwind.config.ts`
- Impact: Two ~100KB font files are shipped and parsed by the browser on every load with zero visual effect. This is pure wasted payload.
- Fix approach: Remove `geistSans` and `geistMono` from `layout.tsx`, delete `app/fonts/GeistVF.woff` and `app/fonts/GeistMonoVF.woff`, and remove `sans`/`mono` overrides from `tailwind.config.ts` if they remain unused.

---

## Duplicate Language Data Between heroSection and constant.ts

**Language list is defined twice with slightly different shapes:**
- Issue: `app/ui/homepage/heroSection.tsx` lines 14–19 defines a local `languages` array `[{ name, color }]`. `app/lib/constant.ts` defines `LANGUAGE_ICONS` with the same four languages `[{ name, color, icon }]` and `SKILLS` also references the same language names. The hero section's local array duplicates data already in the constants file without using it.
- Files: `app/ui/homepage/heroSection.tsx`, `app/lib/constant.ts`
- Impact: If a new language is added or a name changes, it must be updated in multiple places. The `color` values in `heroSection.tsx` (e.g., `'html'`, `'css'`) reference Tailwind color names while the same values in `constant.ts` are hex strings — the two representations are inconsistent.
- Fix approach: Import `LANGUAGE_ICONS` from `constant.ts` in `heroSection.tsx` and derive the badge list from it, removing the local array.

---

## Inline `style` Used Alongside Tailwind

**Opacity and z-index applied via `style={{}}` instead of Tailwind utilities:**
- Issue: `app/ui/homepage/aboutSection.tsx` line 8 uses `style={{ opacity: 0.1 }}` and line 16 uses `style={{ zIndex: 1 }}`. `app/ui/homepage/skillsSection.tsx` line 12 uses `style={{ opacity: 0.1 }}` the same way. Tailwind has `opacity-10`, `z-0`, `z-10` utilities for these exact values.
- Files: `app/ui/homepage/aboutSection.tsx`, `app/ui/homepage/skillsSection.tsx`
- Impact: Bypasses Tailwind's purging and responsive/variant system. Inconsistent style authoring pattern across the codebase.
- Fix approach: Replace `style={{ opacity: 0.1 }}` with Tailwind class `opacity-10` and `style={{ zIndex: 1 }}` with `z-[1]` (or `z-0`/`z-10` as appropriate).

---

## Commented-Out `--radius` CSS Variable and `borderRadius` Config

**Radius tokens are disabled, breaking the design system contract:**
- Issue: `app/globals.css` line 35 has `/* --radius: 0.5rem; */` commented out. `tailwind.config.ts` lines 76–80 have the `borderRadius` extension block commented out. Shadcn/ui components (`card.tsx`, `button.tsx`, `dropdown-menu.tsx`) use `rounded-lg`, `rounded-md`, `rounded-sm` directly, bypassing any radius token system.
- Files: `app/globals.css`, `tailwind.config.ts`
- Impact: Radius values are hardcoded across every component, making a global radius change require a find-and-replace across all files instead of a single token update.
- Fix approach: Decide on a radius scale, uncomment `--radius` in CSS and the `borderRadius` extension in `tailwind.config.ts`, then update Shadcn components to use the `rounded-lg`/`rounded-md`/`rounded-sm` aliases that map to the token.

---

## SEO: Thin and Generic Metadata

**`<head>` metadata does not help with discoverability:**
- Issue: `app/layout.tsx` lines 31–34 sets `title: 'Mujeeb Portfolio'` and `description: 'Check out my portfolio'`. There is no `openGraph`, `twitter`, `keywords`, `canonical`, or `robots` metadata. No `<link rel="icon">` override exists beyond the default `app/favicon.ico`.
- Files: `app/layout.tsx`
- Impact: Search engines index generic, non-descriptive text. Social sharing produces no preview card. The portfolio will not rank for the developer's name or skills.
- Fix approach: Expand the `Metadata` object with `openGraph` (title, description, images), `twitter` card, and a proper long-form description that includes the developer's name, role, and tech stack.

---

## Accessibility: Missing ARIA Labels and Landmark Roles

**Interactive elements and sections lack accessible names:**
- Issue:
  - `app/ui/navbar.tsx`: The `<nav>` element has no `aria-label` (e.g., `aria-label="Main navigation"`).
  - `app/ui/homepage/heroSection.tsx` line 107: The "Let's Talk" `<Link>` wraps only a `<Mail>` icon with no accessible text — screen readers will read out nothing meaningful.
  - `app/ui/homepage/heroSection.tsx` line 65: The "Download CV" button has no `href` or `download` attribute on the button; it renders a non-functional button that does nothing when clicked.
  - `app/ui/homepage/aboutSection.tsx` line 38: The closing `<p>` tag rendering as `{'<p>'}` is a visual trick but is a `<span>` inside a paragraph — semantically it reads as prose, confusing screen readers.
  - Background image `<div>` elements in `aboutSection.tsx` and `skillsSection.tsx` have no `aria-hidden="true"` despite being purely decorative.
- Files: `app/ui/navbar.tsx`, `app/ui/homepage/heroSection.tsx`, `app/ui/homepage/aboutSection.tsx`, `app/ui/homepage/skillsSection.tsx`
- Fix approach: Add `aria-label` to `<nav>`, `aria-hidden="true"` to decorative divs, visually-hidden text to icon-only links, and wire the CV button to an actual PDF file or `<a>` element.

---

## Download CV Button Has No File Target

**The primary CTA does nothing:**
- Issue: `app/ui/homepage/heroSection.tsx` line 65 renders a `<Button>` with the label "Download CV" but no `onClick`, `href`, or `download` attribute. No CV/resume PDF exists anywhere under `public/`.
- Files: `app/ui/homepage/heroSection.tsx`
- Impact: The most prominent call-to-action on the hero card is completely non-functional. This is the first thing a recruiter or client would try.
- Fix approach: Add a PDF resume to `public/resume.pdf`, then replace the `<Button>` with `<a href="/resume.pdf" download><Button>...</Button></a>` or use `asChild` pattern.

---

## Outdated Dependencies

**Multiple packages are significantly behind their current stable releases:**

| Package | Installed | Latest | Risk |
|---|---|---|---|
| `next` | 15.0.3 | 16.1.7 | Major version behind; security patches missed |
| `react` / `react-dom` | 18.3.1 | 19.2.4 | Major version behind |
| `eslint` | 8.57.0 | 10.0.3 | Two major versions behind |
| `tailwindcss` | 3.4.14 | 4.2.1 | Major version; v4 has breaking config changes |
| `tailwind-merge` | 2.5.5 | 3.5.0 | Major version |
| `@types/node` | 20.17.6 | 25.5.0 | Multiple major versions |
| `@types/react` | 18.3.12 | 19.2.14 | Should match React version |
| `husky` | 8.0.3 | 9.1.7 | Major version; API changed |
| `lucide-react` | 0.462.0 | 0.577.0 | 115 icon versions behind |
| `@typescript-eslint/parser` | 8.16.0 | 8.57.1 | Minor behind but large gap |

- Files: `package.json`
- Impact: `next@15` → `next@16` and `react@18` → `react@19` are major upgrades with breaking changes. `tailwindcss@3` → `tailwindcss@4` requires a config migration. `eslint@8` → `eslint@10` drops legacy config format (`.eslintrc.json` is not supported in ESLint v9+). `husky@8` → `husky@9` changed hook installation.
- Fix approach: Upgrade incrementally. Start with minor/patch updates (`lucide-react`, `@typescript-eslint/parser`, `prettier`). Plan separate migration PRs for `eslint@9+` (requires moving to `eslint.config.js` flat config) and `tailwindcss@4` (requires new CSS-based config).

---

## ESLint Config Uses Legacy Format

**`.eslintrc.json` is not compatible with ESLint v9+:**
- Issue: The project uses `.eslintrc.json` (legacy "eslintrc" config format). ESLint v9 dropped support for this format in favor of `eslint.config.js` (flat config). Currently pinned to `eslint@8.57.0` specifically to avoid this breaking change.
- Files: `.eslintrc.json`, `package.json`
- Impact: Upgrading ESLint to v9 or v10 will break linting entirely until the config is migrated. This creates upgrade paralysis for the entire linting toolchain.
- Fix approach: Migrate `.eslintrc.json` to `eslint.config.js` flat config format before upgrading ESLint. The `eslint-config-next` package has flat config support starting from Next.js 15.1.

---

## `next.config.ts` Is Completely Empty

**No performance or security configuration applied:**
- Issue: `next.config.ts` contains only an empty config object with no options set.
- Files: `next.config.ts`
- Impact: Missing opportunities for: `images.domains` / `remotePatterns` (needed if the shadcn avatar GitHub URL stays), `headers()` for security headers (CSP, X-Frame-Options), and `output: 'export'` or deployment target configuration.
- Fix approach: At minimum add `images.remotePatterns` to allowlist `avatars.githubusercontent.com` (or remove that dependency), and add basic security headers via `headers()`.

---

## `globals.css` Defines Duplicate `body` Rule

**Body font-family is set twice, with the second rule overriding the first silently:**
- Issue: `app/globals.css` line 6 sets `body { font-family: Arial, Helvetica, sans-serif; }` in global scope. Lines 100–102 then override this with `@apply bg-background text-foreground` inside `@layer base`. The explicit `font-family: Arial` on line 6 takes precedence over the Tailwind `font-sans` variable because it sits outside the layer cascade and has higher specificity than layered styles.
- Files: `app/globals.css`
- Impact: The `font-sans` Tailwind token (which maps to `--font-geist-sans`) is silently overridden by `Arial`. Since no component uses `font-sans` anyway, this is currently harmless — but it is a latent bug that would cause confusion if a font-sans component were ever added.
- Fix approach: Remove the top-level `body { font-family: Arial, Helvetica, sans-serif; }` rule entirely. Font family is already controlled through Tailwind utilities and CSS variables.

---

## No Test Coverage

**Zero tests exist anywhere in the project:**
- Issue: No test files (`*.test.*`, `*.spec.*`) are present. No testing framework (`jest`, `vitest`, `playwright`, `cypress`) is installed. No `test` script exists in `package.json`.
- Files: `package.json`
- Impact: Any regression in hero section data, theme switching, or navigation will go undetected until manual review. The CV download CTA, which is currently broken, would have been caught by even a basic smoke test.
- Fix approach: Add `vitest` and `@testing-library/react` for unit/component tests. At minimum write tests for: `HeroSection` renders correct name and email, `ThemeToggle` renders and switches theme, `SkillsCard` renders language list correctly.

---

## Performance: Background Images Loaded as CSS Without Size Hints

**`aboutBackground.png` and `skillsBackground.png` have no lazy loading or size control:**
- Issue: Background images in `app/ui/homepage/aboutSection.tsx` and `app/ui/homepage/skillsSection.tsx` are applied via Tailwind `bg-about-bg` and `bg-skills-bg` classes, which are CSS `background-image` properties. The browser must download these before rendering the sections, with no lazy loading, WebP format, or size optimization. The files are PNGs of unknown size under `public/`.
- Files: `tailwind.config.ts`, `app/ui/homepage/aboutSection.tsx`, `app/ui/homepage/skillsSection.tsx`, `public/aboutBackground.png`, `public/skillsBackground.png`
- Impact: Background PNGs are typically large files. Without Next.js Image Optimization (`<Image>`) or WebP conversion, these inflate initial page load.
- Fix approach: Convert background PNGs to WebP. Alternatively, restructure the sections to use Next.js `<Image>` with `fill` and `objectFit="cover"` positioned absolutely, which enables automatic format optimization and lazy loading.

---

*Concerns audit: 2026-03-18*
