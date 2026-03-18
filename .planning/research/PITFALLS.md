# Domain Pitfalls

**Project:** Mujeeb ur Rahman — Portfolio Revamp
**Domain:** Developer portfolio (Next.js 15 brownfield → Next.js 16 + React 19 + Tailwind v4)
**Researched:** 2026-03-18
**Sources confidence:** HIGH (official Next.js 16 docs, official Tailwind v4 upgrade guide, official React 19 release)

---

## Critical Pitfalls

Mistakes that cause build failures, complete rewrites, or broken deployments.

---

### Pitfall 1: Turbopack Default Breaks Webpack Configs

**What goes wrong:** Next.js 16 makes Turbopack the default bundler for both `next dev` and `next build`. If any installed package or plugin silently adds a `webpack` configuration option, `next build` will fail immediately with an error. This is not always obvious — the webpack config may come from a plugin, not your own `next.config.ts`.

**Why it happens:** Next.js 16 intentionally fails the build rather than silently ignoring a webpack config under Turbopack, to prevent misconfiguration. The `next.config.ts` in this project is currently empty, so it is safe — but adding certain third-party packages (e.g., some Tailwind plugins, bundle analyzers, Sentry webpack plugin) can silently inject webpack config entries.

**Consequences:** Production build fails with no clear user-facing error; CI/CD breaks.

**Warning signs:**
- Build error mentioning "webpack configuration was found but Turbopack is enabled"
- Installing packages that mention `withXXX(nextConfig)` wrapper patterns

**Prevention:**
- Keep `next.config.ts` clean; avoid wrapping with third-party `withXXX()` helpers unless verified Turbopack-compatible
- If webpack is needed for a specific package, add explicit `--webpack` flag to the `build` script only for that package's use case
- Run `next build` immediately after each new package installation to catch config injection early

**Phase:** Dependency Upgrade phase — test build after every package bump

**Confidence:** HIGH — official Next.js 16 docs

---

### Pitfall 2: Tailwind v4 CSS-First Config Breaks All v3 `tailwind.config.ts` Options

**What goes wrong:** Tailwind v4 removes the JavaScript config file as the primary configuration surface. Design tokens (colors, fonts, spacing, breakpoints) must now be defined in CSS using `@theme {}` directives in `globals.css`. The existing `tailwind.config.ts` with custom `colors`, `fontFamily`, `backgroundImage`, and `extend` blocks will be silently ignored unless explicitly re-imported with `@config "../../tailwind.config.ts"` — which is a compatibility bridge, not the recommended path.

**Why it happens:** This is a deliberate architectural shift. Tailwind v4 moved to CSS-first to enable hot reloading of design tokens without rebuilding and to leverage native CSS custom properties.

**Consequences:** All custom colors (`--primary`, brand tokens), custom fonts (`font-ubuntu`, `font-ibmPlexMono`), and custom background images (`bg-about-bg`, `bg-skills-bg`) stop working silently. The site renders with no branding.

**Warning signs:**
- After migration, all custom color classes produce no output
- `bg-about-bg` and `bg-skills-bg` stop applying background images
- Font classes like `font-ubuntu` revert to browser defaults

**Prevention:**
- Translate the entire `tailwind.config.ts` `theme.extend` block into `@theme {}` CSS variables in `globals.css` before removing the JS config
- Use the automated codemod: `npx @tailwindcss/upgrade` (requires Node.js 20+) — it handles 90% of class renames but requires manual review for custom config
- Test every custom utility class still works in the browser before considering migration done

**Phase:** Tailwind v4 Migration phase — must be done before any new component work

**Confidence:** HIGH — official Tailwind v4 upgrade guide at tailwindcss.com/docs/upgrade-guide

---

### Pitfall 3: `tailwindcss-animate` Is Deprecated in v4; Replaced by `tw-animate-css`

**What goes wrong:** Tailwind v4 deprecates `tailwindcss-animate` (the plugin used by shadcn/ui components for enter/exit animations) in favor of `tw-animate-css`. If the project keeps `tailwindcss-animate` after migrating to v4, animation classes on shadcn components (`animate-in`, `fade-in-0`, `zoom-in-95`, etc.) will break silently — components render but without transitions.

**Why it happens:** The plugin API changed between v3 and v4; `tailwindcss-animate` relies on the v3 plugin registration format.

**Consequences:** All shadcn/ui dropdown, tooltip, dialog, and accordion animations disappear. Theme toggle dropdown menu becomes non-animated.

**Warning signs:**
- Console warnings about unrecognised plugin format after v4 migration
- shadcn components appear without enter/exit transitions

**Prevention:**
- Replace `tailwindcss-animate` with `tw-animate-css` as part of the Tailwind v4 migration step
- Update the `globals.css` import: `@import "tw-animate-css"` instead of the plugin registration
- shadcn/ui CLI with v4 initializes with `tw-animate-css` by default — follow the official shadcn Tailwind v4 migration guide at ui.shadcn.com/docs/tailwind-v4

**Phase:** Tailwind v4 Migration phase

**Confidence:** HIGH — shadcn/ui official Tailwind v4 docs

---

### Pitfall 4: Dark Mode Breaks After Tailwind v4 Migration

**What goes wrong:** The `darkMode: "class"` configuration option in `tailwind.config.ts` does not exist in Tailwind v4. Dark mode variant configuration moves to CSS. When combined with `next-themes` (which toggles a `.dark` class on `<html>`), the dark mode utility classes (`dark:bg-background`, `dark:text-foreground`) stop applying entirely after migration because Tailwind v4 doesn't know to look for the `.dark` class by default.

**Why it happens:** Tailwind v4's dark mode is configured via `@custom-variant dark (.dark &)` in the CSS file, not a JS config option.

**Consequences:** After migration, the entire dark mode theme becomes non-functional. The theme toggle button still works (class is added/removed on `<html>`) but no dark styles apply.

**Warning signs:**
- After migration, toggling dark mode has no visual effect
- `dark:` prefixed classes produce no CSS output

**Prevention:** In `globals.css`, add the custom variant declaration explicitly:
```css
@custom-variant dark (&:where(.dark, .dark *));
```
This tells Tailwind v4 to apply `dark:` utilities when a `.dark` ancestor class exists — matching how `next-themes` works.

- Also suppress the Flash of Wrong Theme (FOUT) by adding `suppressHydrationWarning` to the `<html>` tag in `layout.tsx` and ensuring `next-themes` `ThemeProvider` is configured with `attribute="class"` and `defaultTheme="system"`

**Phase:** Tailwind v4 Migration phase

**Confidence:** HIGH — confirmed across Tailwind v4 official discussion #16517, official dark mode docs, and multiple practitioner reports

---

### Pitfall 5: Async Request APIs — Synchronous Access Fully Removed in Next.js 16

**What goes wrong:** Next.js 15 deprecated synchronous access to `cookies()`, `headers()`, `draftMode()`, and route `params`/`searchParams` with warnings. Next.js 16 removes synchronous access entirely — calling them synchronously throws a runtime error. This project's contact form API route (`/api/contact`) uses `headers()` to read the request origin; if written synchronously it will break in production.

**Why it happens:** Next.js 16 fully enforces the async data model that was introduced (with backwards-compat shim) in Next.js 15.

**Consequences:** Contact form API route crashes on every submission. Vercel logs show runtime errors in production.

**Warning signs:**
- Build-time TypeScript errors if using typed imports (`PageProps`, `LayoutProps`) without awaiting
- Development console warnings in Next.js 15 about "sync dynamic API usage"

**Prevention:**
- Run the automated codemod: `npx @next/codemod@canary upgrade latest` — it migrates synchronous API calls to `await` automatically
- Write the contact form API route async-first from the start: `const headersList = await headers()`
- Run `npx next typegen` to generate strongly-typed `PageProps` and `LayoutProps` helpers

**Phase:** Dependency Upgrade phase — must be applied before the upgrade runs

**Confidence:** HIGH — official Next.js 16 upgrade guide

---

### Pitfall 6: ESLint Legacy `.eslintrc.json` Incompatible with ESLint v9+

**What goes wrong:** The current project uses `.eslintrc.json` (eslintrc format). ESLint v9 dropped this format entirely — it will not be read. When upgrading ESLint as part of the dependency upgrade, linting silently stops working or throws a config-not-found error. `next lint` is also removed in Next.js 16 as a command; you must call ESLint directly.

**Why it happens:** ESLint v9 made "flat config" (`eslint.config.js`) the only supported format.

**Consequences:** CI linting passes vacuously (no config = no errors = everything passes); real linting issues go undetected.

**Warning signs:**
- ESLint runs but reports 0 errors on a file with obvious issues
- Warning "No eslint configuration file found" in CI logs

**Prevention:**
- Migrate `.eslintrc.json` to `eslint.config.js` flat format before upgrading ESLint
- `eslint-config-next` supports flat config from Next.js 15.1+; the import is:
  ```js
  import nextPlugin from "@next/eslint-plugin-next"
  ```
- Update `package.json` `lint` script from `next lint` to `eslint .`
- Run the Next.js codemod for this: `npx @next/codemod@canary next-lint-to-eslint-cli .`

**Phase:** Dependency Upgrade phase

**Confidence:** HIGH — official ESLint migration docs, Next.js 16 changelog

---

## Moderate Pitfalls

Mistakes that cause feature regressions or Lighthouse score failures.

---

### Pitfall 7: Hero Image LCP Destroyed by Lazy Loading

**What goes wrong:** Adding `loading="lazy"` (or omitting `priority={true}`) to the hero section profile image — the Largest Contentful Paint element — delays image loading until after the JavaScript runs. This pushes LCP above 2.5s and kills the Lighthouse performance score target of 90+.

**Prevention:**
- The profile `<Image>` in `heroSection.tsx` must have `priority={true}` (no lazy loading)
- Only images below the fold should use default lazy loading
- Set explicit `width` and `height` props to prevent Cumulative Layout Shift (CLS)

**Warning signs:** Lighthouse "Largest Contentful Paint" flagged as red; LCP element is the profile image

**Phase:** Hero Section build phase

**Confidence:** HIGH — confirmed by Next.js image docs and multiple Lighthouse audit reports

---

### Pitfall 8: Background PNG Images Inflate Page Weight and Block Rendering

**What goes wrong:** The existing `aboutBackground.png` and `skillsBackground.png` are applied as CSS `background-image` properties via Tailwind custom classes. CSS background images: (a) cannot be lazy-loaded, (b) are not optimized by Next.js Image component, (c) are typically large PNGs with no WebP conversion, and (d) block section rendering while downloading.

**Prevention:**
- Convert PNG backgrounds to WebP format (typically 30-50% smaller)
- If backgrounds are decorative, replace with CSS gradients or SVG patterns to eliminate the HTTP request entirely
- If image backgrounds are retained, restructure the section to use Next.js `<Image fill>` positioned absolutely with `aria-hidden="true"`, enabling format optimization and lazy loading below the fold

**Warning signs:** Lighthouse "Avoid enormous network payloads" flags background PNGs; "Serve images in next-gen formats" audit fails

**Phase:** Each section revamp phase (About, Skills)

**Confidence:** MEDIUM — official Next.js Image docs, Lighthouse audit pattern

---

### Pitfall 9: Contact Form Spam Without Rate Limiting on Vercel Free Tier

**What goes wrong:** A contact form API route with no rate limiting can be trivially spammed. On Vercel's free tier, each form submission triggers a serverless function invocation (which calls Resend's API to send email). A bot sending 1,000 requests exhausts the free-tier invocation quota and burns through Resend's free-tier daily email limit (100 emails/day on free plan).

**Prevention:**
- Add IP-based rate limiting to the `/api/contact` route before deployment — use Upstash Ratelimit (free tier) with Vercel KV, or a simple in-memory counter for low-traffic portfolios
- Add a honeypot field (invisible input) to the contact form to catch bots without a CAPTCHA UX burden
- Add `email` validation on the server side before calling Resend

**Warning signs:** Sudden spike in Vercel function invocation logs; Resend daily limit exceeded emails

**Phase:** Contact section build phase

**Confidence:** MEDIUM — Vercel community discussions, Resend free-tier docs

---

### Pitfall 10: Resend API Route Timeout on Vercel Free Tier

**What goes wrong:** The Vercel free tier enforces a 10-second maximum duration for serverless functions. Resend's Node.js SDK + `react-email` Tailwind component can push past this limit in edge cases (cold starts + complex email templates), causing the contact form submission to timeout with a 504 error even though the email may or may not have been sent.

**Prevention:**
- Keep the contact email template simple — do not use `@react-email/tailwind` component (it runs Tailwind's full compilation pipeline at runtime)
- Use plain HTML email templates or minimal JSX without the Tailwind email renderer
- Set a client-side timeout (e.g., 8 seconds) with a user-friendly error message
- Consider `react-email` pre-rendered to static HTML at build time rather than at runtime

**Warning signs:** Contact form hangs for 10+ seconds before showing an error; Vercel function logs show `FUNCTION_INVOCATION_TIMEOUT`

**Phase:** Contact section build phase

**Confidence:** MEDIUM — Vercel community reports, confirmed Resend + react-email timeout pattern

---

### Pitfall 11: Metadata Missing Open Graph Images Causes Dead Social Preview Cards

**What goes wrong:** Sharing the portfolio URL on LinkedIn, Twitter/X, or Discord produces a blank preview card with no image, no rich description — just a bare URL. This is the default when `openGraph.images` is omitted from the Next.js Metadata object. For a portfolio targeting employers and clients, this is a significant first-impression failure.

**Why it happens:** The current metadata is minimal: `title: 'Mujeeb Portfolio'`, `description: 'Check out my portfolio'`. No `openGraph`, `twitter`, or structured data.

**Prevention:**
- Add an `opengraph-image.tsx` or static `opengraph-image.png` (1200×630px) to `app/`
- Expand `layout.tsx` Metadata with `openGraph.type: "website"`, `openGraph.images`, `twitter.card: "summary_large_image"`, `keywords`, and `canonical`
- Use Next.js's built-in OG image generation (`ImageResponse` from `next/og`) for a dynamic, branded preview card

**Warning signs:** Paste portfolio URL into LinkedIn post preview — no image appears; "Card preview" tool on Twitter/X shows bare URL

**Phase:** SEO/Polish phase (but metadata should be added before first deployment)

**Confidence:** HIGH — Next.js Metadata API docs, portfolio SEO guides

---

### Pitfall 12: `next/image` Remote Patterns Not Configured for External Sources

**What goes wrong:** The current code uses `src="https://github.com/shadcn.png"` (an external URL) with Next.js `<Image>`. Without `images.remotePatterns` configured in `next.config.ts`, this throws an error in Next.js 16 (the old `images.domains` config is deprecated and removed). Additionally, `images.domains` is deprecated starting Next.js 16.

**Why it happens:** Next.js Image requires explicit allowlisting of external hostnames for security. The empty `next.config.ts` has no such configuration.

**Prevention:**
- Replace the shadcn placeholder with a self-hosted profile image in `public/profile.jpg` — this eliminates the external dependency entirely (recommended)
- If any external image source must be used, configure `images.remotePatterns` in `next.config.ts` with `protocol`, `hostname`, and optionally `pathname`

**Warning signs:** Build error or runtime error: "hostname not configured under images.remotePatterns"

**Phase:** Content/Assets phase (first sprint)

**Confidence:** HIGH — official Next.js 16 image docs

---

## Minor Pitfalls

Mistakes that cause code quality issues or subtle bugs.

---

### Pitfall 13: Tailwind v4 Renamed Shadow and Rounded Utilities Break Existing Classes

**What goes wrong:** Tailwind v4 renamed several utility classes. The most impactful for this codebase:
- `shadow-sm` → `shadow-xs`, `shadow` → `shadow-sm` (shift in scale)
- `rounded-sm` → `rounded-xs`
- `ring` (3px blue) → must now be explicit `ring-3 ring-blue-500` (defaults changed to 1px + currentColor)
- `outline-none` → `outline-hidden`

The codebase uses shadcn/ui components which contain many of these classes. After the Tailwind upgrade codemod runs, manual review is required for anything the codemod missed (dynamically constructed class strings).

**Prevention:**
- Run `npx @tailwindcss/upgrade` first; it renames the known patterns automatically
- Grep for `shadow-sm`, `rounded-sm`, `outline-none`, `ring` (standalone), `flex-shrink-*`, `flex-grow-*`, `overflow-ellipsis` and verify each
- Check that shadcn/ui component files (card, button, dropdown) are updated — the shadcn CLI does not auto-update installed component files

**Warning signs:** Subtle visual regression — shadows appear smaller, rings appear thinner, focus states look wrong

**Phase:** Tailwind v4 Migration phase

**Confidence:** HIGH — official Tailwind v4 upgrade guide

---

### Pitfall 14: `@apply` with Custom Utility Classes Fails in v4 CSS Modules Context

**What goes wrong:** Tailwind v4 changed how `@apply` works in CSS Modules (`.module.css` files). You must use `@reference "../../globals.css"` to make theme tokens available before using `@apply`. If any CSS Module in the project uses `@apply` with custom Tailwind utilities, it will fail silently or throw a build error.

**Prevention:**
- This project uses Tailwind utility classes directly in JSX; avoid introducing CSS Modules with `@apply`
- If CSS modules are needed, add `@reference "../globals.css"` at the top of every `.module.css` file before using `@apply`

**Warning signs:** Build error "Cannot apply unknown utility class" in a `.module.css` file

**Phase:** Tailwind v4 Migration phase

**Confidence:** HIGH — official Tailwind v4 upgrade guide

---

### Pitfall 15: React 19 Ref Handling Changes Break Third-Party Components

**What goes wrong:** React 19 changed how refs work — refs are now passed as regular props instead of being forwarded via `React.forwardRef`. Libraries that used `forwardRef` internally need to be updated. Some older versions of Radix UI primitives or shadcn/ui component wrappers may exhibit TypeScript errors or runtime warnings when refs are used.

**Prevention:**
- Upgrade all Radix UI packages to their latest versions before or alongside the React 19 upgrade
- Check `@types/react` is upgraded to `19.x` to match the React version
- If a TypeScript error appears about ref callback return types, the fix is to not return values from ref callbacks (React 19 rejects this)

**Warning signs:** TypeScript error "Type 'X' is not assignable to type 'Ref<...>'" after React upgrade; runtime warning about `forwardRef` usage

**Phase:** Dependency Upgrade phase

**Confidence:** MEDIUM — React 19 upgrade guide, real-world migration reports

---

### Pitfall 16: Husky v9 Changed Hook Installation — Pre-commit Hooks Silently Break

**What goes wrong:** The project uses `husky@8.0.3`. Husky v9 changed the hook installation method — `husky install` is replaced by `husky init`, and the hook file format changed. Upgrading Husky without updating the `prepare` script and hook files will cause pre-commit hooks to silently stop running (no error, hooks just don't execute).

**Prevention:**
- Upgrade Husky independently: `npm install husky@latest`
- Replace `"prepare": "husky install"` with `"prepare": "husky"` in `package.json`
- Migrate hook files from `.husky/pre-commit` (shell scripts with `npx husky-run`) to the new plain shell script format
- Verify hooks run: `git commit --allow-empty -m "test hooks"`

**Warning signs:** After Husky upgrade, committing files with TypeScript errors succeeds without rejection; `git log` shows commits that should have been blocked

**Phase:** Dependency Upgrade phase

**Confidence:** MEDIUM — Husky v9 migration docs

---

### Pitfall 17: Font Files Shipped for Fonts Never Applied

**What goes wrong:** The existing `GeistVF.woff` and `GeistMonoVF.woff` font files (~100KB each) are loaded in `layout.tsx` but never used by any component — all text uses `font-ubuntu` and `font-ibmPlexMono`. These files are shipped to every visitor with zero visual effect.

**Additionally:** When migrating to Tailwind v4, the font family definitions move from `tailwind.config.ts` to `@theme {}` in `globals.css`. If the migration script copies the Geist font token definitions into `@theme`, the dead font load problem propagates into the new config.

**Prevention:**
- Delete `app/fonts/GeistVF.woff` and `app/fonts/GeistMonoVF.woff`
- Remove `geistSans` and `geistMono` `localFont()` calls from `layout.tsx`
- Remove the `sans`/`mono` font token overrides from the Tailwind config
- Do this before the Tailwind v4 migration so the codemod doesn't copy dead tokens

**Warning signs:** Lighthouse "Reduce unused font files" audit; Network tab shows `GeistVF.woff` downloaded but no text is styled with it

**Phase:** Codebase Cleanup phase (pre-migration)

**Confidence:** HIGH — confirmed in codebase analysis (CONCERNS.md)

---

### Pitfall 18: Download CV Button Is a Non-functional CTA — The Most Prominent Broken Element

**What goes wrong:** The "Download CV" `<Button>` in `heroSection.tsx` has no `href`, no `onClick`, and no PDF in `public/`. Recruiters and clients who click this — often the first thing they try — get nothing. This is the single highest-visibility bug in the current codebase.

**Prevention:**
- Add the actual PDF: `public/mujeeb-resume.pdf`
- Wrap the button with `<a href="/mujeeb-resume.pdf" download>` or use the `asChild` prop pattern:
  ```tsx
  <Button asChild>
    <a href="/mujeeb-resume.pdf" download>Download CV</a>
  </Button>
  ```
- Add `aria-label="Download Mujeeb's resume as PDF"` for accessibility

**Warning signs:** The button is visible and styled but clicking it does nothing; no download dialog appears

**Phase:** Hero Section revamp (immediate — must be in Phase 1)

**Confidence:** HIGH — confirmed in codebase analysis (CONCERNS.md)

---

### Pitfall 19: Scroll-Reveal Animations Cause Layout Shift and CLS Failures

**What goes wrong:** Scroll-reveal animations commonly start sections at `opacity: 0; transform: translateY(20px)` and animate to visible on scroll. If the initial hidden state is applied before hydration, it can cause layout shifts (CLS). If implemented with JavaScript-dependent visibility, sections may briefly flash or be invisible to users with JavaScript disabled or slow connections.

**Prevention:**
- Use CSS-based animations with `@keyframes` and Intersection Observer, not JS-calculated initial positions
- Apply initial hidden state only after the component mounts (`useEffect`) to prevent server-render conflicts
- Use `prefers-reduced-motion` media query to disable animations for users who opt out:
  ```css
  @media (prefers-reduced-motion: reduce) {
    * { animation-duration: 0.01ms !important; }
  }
  ```
- Tailwind v4 includes `motion-safe:` and `motion-reduce:` variants — use these instead of custom media queries

**Warning signs:** Lighthouse CLS score above 0.1; sections visually "jump" on load; animations trigger immediately without scroll context

**Phase:** Animations/Polish phase

**Confidence:** MEDIUM — Lighthouse CLS documentation, accessibility guidelines

---

## Phase-Specific Warnings

| Phase Topic | Likely Pitfall | Mitigation |
|-------------|---------------|------------|
| Dependency Upgrade | Turbopack breaks webpack plugin configs | Run `next build` after every package install |
| Dependency Upgrade | ESLint v9 silently drops `.eslintrc.json` | Migrate to flat config first, before ESLint upgrade |
| Dependency Upgrade | Husky v9 hook format changed | Update `prepare` script and hook files |
| Dependency Upgrade | React 19 ref changes break Radix UI | Upgrade all `@radix-ui/*` to latest before React 19 |
| Tailwind v4 Migration | JS config tokens silently ignored | Translate full `theme.extend` to `@theme {}` CSS |
| Tailwind v4 Migration | Dark mode stops working entirely | Add `@custom-variant dark (&:where(.dark, .dark *))` to globals.css |
| Tailwind v4 Migration | shadcn animations break | Replace `tailwindcss-animate` with `tw-animate-css` |
| Tailwind v4 Migration | Shadow/ring/rounded scale shifts | Run upgrade codemod; manually verify visual output |
| Hero Section | Download CV button is broken | Add PDF to `public/`, use `<a download>` wrapper |
| Hero Section | Profile image hurts LCP | Add `priority={true}` to hero `<Image>` |
| Hero Section | Placeholder image from GitHub CDN | Replace with self-hosted `public/profile.jpg` |
| Contact Section | Form spam with no rate limiting | Add Upstash rate limiting or honeypot field |
| Contact Section | Resend + react-email timeout on Vercel | Use plain HTML email templates, not Tailwind-rendered |
| All Sections | Missing Open Graph metadata | Add `opengraph-image` and expand Metadata object |
| SEO Phase | Thin metadata doesn't rank for developer's name | Full Open Graph, structured data (JSON-LD), keywords |
| Animations Phase | Scroll-reveal causes CLS | Use `motion-safe:` Tailwind variant; test CLS in Lighthouse |
| All Sections | Background PNGs inflate page weight | Convert to WebP or replace with CSS patterns |

---

## Sources

- [Next.js 16 Upgrade Guide](https://nextjs.org/docs/app/guides/upgrading/version-16) — HIGH confidence, official, updated 2026-03-16
- [Tailwind CSS v4 Upgrade Guide](https://tailwindcss.com/docs/upgrade-guide) — HIGH confidence, official
- [shadcn/ui Tailwind v4 Migration Guide](https://ui.shadcn.com/docs/tailwind-v4) — HIGH confidence, official
- [React 19 Upgrade Guide](https://react.dev/blog/2024/04/25/react-19-upgrade-guide) — HIGH confidence, official
- [ESLint v9 Migration Guide](https://eslint.org/docs/latest/use/migrate-to-9.0.0) — HIGH confidence, official
- [Tailwind v4 + next-themes dark mode discussion](https://github.com/tailwindlabs/tailwindcss/discussions/16517) — MEDIUM confidence, community-verified
- [shadcn/ui + Tailwind v4 compatibility discussion](https://github.com/shadcn-ui/ui/discussions/2996) — MEDIUM confidence, community-verified
- [Vercel contact form timeout reports](https://community.vercel.com/t/sending-emails-from-vercel-app-with-resend-limitations/22579) — MEDIUM confidence, community
- Internal codebase analysis: `.planning/codebase/CONCERNS.md` — HIGH confidence, direct code inspection
