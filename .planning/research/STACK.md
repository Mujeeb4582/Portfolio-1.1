# Technology Stack

**Project:** Mujeeb ur Rahman — Portfolio Revamp
**Researched:** 2026-03-18
**Brownfield upgrade from:** Next.js 15.0.3 / React 18 / Tailwind CSS 3.4.1

---

## Recommended Stack

### Core Framework

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Next.js | `^16.1` | App framework | Latest stable (16.1.7 as of 2026-03-16). Turbopack file-system caching is now stable, React Compiler is built-in and stable, layout deduplication, improved build logging. App Router is the standard; Pages Router is legacy. |
| React | `^19.2` | UI runtime | Next.js 16 ships with React 19.2. Adds Actions API, stable Server Components, useFormStatus, automatic memoization via React Compiler. Backward compatible with React 18 code. |
| TypeScript | `^5.x` | Type safety | Already in project. No change needed. Non-negotiable for any modern Next.js project. |

### Styling

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Tailwind CSS | `^4.x` | Utility styling | Stable since January 22, 2025. CSS-first config (no tailwind.config.js), 5x faster full builds, 100x faster incremental builds. Required for shadcn/ui compatibility in 2026. |
| @tailwindcss/postcss | `^4.x` | PostCSS integration | Replaces the old `tailwindcss` PostCSS plugin in v4. Must update postcss.config.mjs to use this. |

**Migration note:** Tailwind v4 drops `tailwind.config.js`. All theme config moves to your global CSS file via `@theme {}`. Run the official upgrade tool: `npx @tailwindcss/upgrade@next`.

### Component Library

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| shadcn/ui | CLI-driven (no npm package) | UI components | Industry standard for Next.js + Tailwind projects in 2026. CLI v4 (March 2026) auto-detects Tailwind version. Copies source into your codebase — no vendor lock-in, fully customizable. Supports Tailwind v4 natively. |
| Radix UI primitives | auto-managed by shadcn | Accessible primitives | Shadcn uses Radix under the hood. Do not install Radix packages separately — let shadcn CLI manage versions. |
| class-variance-authority | `^0.7` | Variant styling | Already in project. Shadcn depends on it. Keep as-is. |
| clsx + tailwind-merge | `^2.x` each | Class utilities | Already in project. The `cn()` helper pattern is the universal shadcn standard. Keep as-is. |

### Icons

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| lucide-react | `^0.577` | Icons | Already in project. Active development (latest 0.577.0, March 2026). Best icon set for shadcn/ui — same design language. Tree-shakable SVG React components. |

### Animation

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| motion | `^11.x` | Scroll-reveal and hover animations | Framer Motion is now "Motion" (package: `motion`, import from `motion/react`). 30M+ monthly npm downloads, fastest-growing animation library. Hybrid engine: Web Animations API for 120fps hardware-accelerated animations, falls back to JS for spring physics. `whileInView` for scroll reveals, `AnimatePresence` for mount/unmount. Purpose-built for React — no GSAP ceremony needed. |

**Not GSAP:** Overkill for a portfolio. GSAP is better for SVG, Canvas, or WebGL. For subtle scroll reveals and hover effects, Motion is the right tool and integrates natively with React.

**Not tailwindcss-animate alone:** Keep it for simple CSS transitions, but Motion handles any animation requiring timing, sequencing, or viewport triggers.

### Theme System

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| next-themes | `^0.4` | Dark/light mode | Already in project. Zero dependencies, under 1kb, zero-flicker via injected script in `<head>`. Works with Tailwind v4's `@variant dark` approach. No replacement exists that does this better. |

### Contact Form

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Resend | `^4.x` (resend npm) | Transactional email | Developer-first email API. Free tier: 3,000 emails/month, 1 custom domain. First-class Next.js integration via Server Actions or API routes. No backend required — use Next.js Route Handler (`app/api/contact/route.ts`). Official docs: resend.com/docs/send-with-nextjs |
| react-hook-form | `^7.71` | Form state management | Industry standard. Uncontrolled inputs = no re-renders on keystroke. Integrates with Zod via `@hookform/resolvers`. |
| Zod | `^4.x` | Schema validation | Latest major version (4.3.6, July 2025). TypeScript-first. Validates both client-side (react-hook-form) and server-side (API route). Use `@hookform/resolvers/zod` as the bridge. |
| @hookform/resolvers | `^3.x` | RHF + Zod bridge | Required adapter to use Zod schemas with react-hook-form. |

**Not EmailJS:** EmailJS exposes API keys client-side. Resend + Next.js API route keeps the key server-side.

**Not Nodemailer:** Requires an SMTP server. Resend's HTTP API works on Vercel serverless functions without SMTP config.

### SEO

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Next.js Metadata API | built-in | Meta tags, Open Graph, Twitter cards | Native to Next.js App Router. Use `generateMetadata()` in `layout.tsx`. No third-party package needed (next-seo is legacy for Pages Router). |
| JSON-LD structured data | built-in | Rich snippets | Inline `<script type="application/ld+json">` in layout. Use `Person` schema from schema.org. 20-30% higher CTR for results with rich snippets. |

### Code Quality (Already in project — keep all)

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| ESLint + eslint-config-next | `^8.x` / `^16.x` | Linting | Update eslint-config-next to match Next.js 16. |
| Prettier + prettier-plugin-tailwindcss | `^3.x` | Formatting | Keep. Tailwind class sorting still works with v4 after plugin update. |
| Husky | `^9.x` | Git hooks | Upgrade from `^8` to `^9` — v9 changed the setup format. |
| TypeScript | `^5.x` | Type checking | Keep. |

---

## Alternatives Considered

| Category | Recommended | Alternative | Why Not |
|----------|-------------|-------------|---------|
| Animation | motion (Motion) | GSAP | GSAP is for complex SVG/Canvas/timeline work. Overkill for portfolio scroll reveals. Requires manual React lifecycle cleanup. |
| Animation | motion (Motion) | react-spring | Spring-physics API is harder to use for simple scroll reveals. Motion's `whileInView` is more ergonomic. |
| Email | Resend | EmailJS | EmailJS exposes secrets client-side. Resend is server-side, production-grade. |
| Email | Resend | Nodemailer | Nodemailer requires SMTP — doesn't work cleanly on Vercel serverless. |
| Email | Resend | Web3Forms | Web3Forms is acceptable but Resend offers better deliverability and a proper dashboard for monitoring. |
| Styling | Tailwind v4 | Tailwind v3 | v3 is supported but v4 is the current standard. shadcn CLI v4 defaults to v4. Better performance. |
| Components | shadcn/ui | Chakra UI | Chakra requires provider wrapping, opinionated styles. shadcn copies source into your code — zero lock-in. |
| Components | shadcn/ui | Mantine | Same argument — shadcn is lighter and pairs with Tailwind natively. |
| Validation | Zod v4 | Yup | Zod v4 is TypeScript-native, better inference, faster. Yup is legacy by comparison. |
| Icons | lucide-react | heroicons | Both are acceptable. Lucide is already in project and is shadcn's default — keep for consistency. |
| Framework | Next.js 16 | Astro | Astro is excellent for static sites but Mujeeb already has Next.js knowledge and the project uses React patterns. No migration benefit. |

---

## Installation

```bash
# Upgrade core framework
npm install next@latest react@latest react-dom@latest

# Upgrade Tailwind v3 → v4
npm install tailwindcss@latest @tailwindcss/postcss
npm uninstall postcss  # reinstall if needed at same version

# Run official Tailwind upgrade tool (handles config migration)
npx @tailwindcss/upgrade@next

# Animation
npm uninstall framer-motion  # if present
npm install motion

# Contact form
npm install resend react-hook-form zod @hookform/resolvers

# Upgrade dev tooling
npm install -D husky@latest
npm install -D eslint-config-next@latest

# shadcn/ui — use CLI, do not npm install directly
npx shadcn@latest init
# Then add components as needed, e.g.:
npx shadcn@latest add button card badge input label textarea
```

---

## Key Configuration Changes Required

### Tailwind v4 CSS-first config

Replace `tailwind.config.ts` with theme directives in `globals.css`:

```css
@import "tailwindcss";

@theme {
  --color-background: #ffffff;
  --color-foreground: #0a0a0a;
  /* ... custom tokens */
}
```

### PostCSS config

Update `postcss.config.mjs`:

```js
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};
```

### Motion (scroll reveal pattern)

```tsx
import { motion } from 'motion/react';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  viewport={{ once: true }}
>
  {/* section content */}
</motion.div>
```

### Resend contact form (Server Action or Route Handler)

```ts
// app/api/contact/route.ts
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { name, email, message } = await request.json();
  await resend.emails.send({
    from: 'portfolio@yourdomain.com',
    to: 'mujeeburahman4582@gmail.com',
    subject: `Portfolio contact from ${name}`,
    text: message,
  });
}
```

---

## Version Summary (Target State)

| Package | Current | Target |
|---------|---------|--------|
| next | 15.0.3 | ^16.1 |
| react / react-dom | 18 | ^19.2 |
| tailwindcss | ^3.4.1 | ^4.x |
| @tailwindcss/postcss | not installed | ^4.x |
| motion | not installed | ^11.x |
| resend | not installed | ^4.x |
| react-hook-form | not installed | ^7.71 |
| zod | not installed | ^4.x |
| @hookform/resolvers | not installed | ^3.x |
| lucide-react | ^0.462 | ^0.577 |
| next-themes | ^0.4.3 | ^0.4.x (keep) |
| shadcn/ui | via CLI | re-init with v4 |
| husky | ^8 | ^9 |

---

## Sources

- Next.js 16.1 release: [nextjs.org/blog/next-16-1](https://nextjs.org/blog/next-16-1)
- Next.js 16: [nextjs.org/blog/next-16](https://nextjs.org/blog/next-16)
- Tailwind CSS v4.0 announcement: [tailwindcss.com/blog/tailwindcss-v4](https://tailwindcss.com/blog/tailwindcss-v4)
- Tailwind upgrade guide: [tailwindcss.com/docs/upgrade-guide](https://tailwindcss.com/docs/upgrade-guide)
- Tailwind + Next.js install guide: [tailwindcss.com/docs/guides/nextjs](https://tailwindcss.com/docs/guides/nextjs)
- React 19 stable: [react.dev/blog/2024/12/05/react-19](https://react.dev/blog/2024/12/05/react-19)
- Motion (formerly Framer Motion): [motion.dev/docs/react](https://motion.dev/docs/react)
- Motion upgrade guide: [motion.dev/docs/react-upgrade-guide](https://motion.dev/docs/react-upgrade-guide)
- Resend + Next.js: [resend.com/docs/send-with-nextjs](https://resend.com/docs/send-with-nextjs)
- shadcn/ui changelog: [ui.shadcn.com/docs/changelog](https://ui.shadcn.com/docs/changelog)
- react-hook-form npm: [npmjs.com/package/react-hook-form](https://www.npmjs.com/package/react-hook-form)
- Zod v4 release: [zod.dev/v4](https://zod.dev/v4)
- LogRocket animation comparison 2026: [blog.logrocket.com/best-react-animation-libraries](https://blog.logrocket.com/best-react-animation-libraries/)
- next-themes GitHub: [github.com/pacocoursey/next-themes](https://github.com/pacocoursey/next-themes)
