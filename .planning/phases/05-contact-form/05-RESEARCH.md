# Phase 5: Contact Form - Research

**Researched:** 2026-03-19
**Domain:** React Hook Form + Zod validation, Resend API email delivery, Next.js App Router API route, honeypot spam protection
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- Form fields: name, email, message (CONT-01)
- Validation: Zod schemas + React Hook Form (CONT-02)
- Email delivery: Resend API via Next.js API route (CONT-03)
- Success/error feedback visible to user (CONT-04)
- Direct contact links: email, WhatsApp, LinkedIn, GitHub (CONT-05)
- Email recipient: mujeeburahman4582@gmail.com

### Claude's Discretion
All design decisions are at Claude's discretion for this phase. The user chose to skip discussion and let Claude decide the best approach based on established patterns.

Decisions to make during planning/implementation:
- Form layout (single column, split with contact links, etc.)
- Field arrangement and placeholder text
- Submit button styling (consistent with Phase 2 CTA patterns)
- Validation timing (on blur vs on submit)
- Error display style (inline below fields, toast, etc.)
- Success/error feedback mechanism (toast notification, inline message, etc.)
- Form reset behavior after successful submission
- Loading/submitting state visual indicator
- Direct contact links layout alongside or below the form
- Contact link icon style (consistent with hero social links from Phase 2)
- Section heading style (consistent: h2 + UnderLine pattern)
- AnimateIn wrappers (consistent with Phase 4 patterns)

### Deferred Ideas (OUT OF SCOPE)
None — discussion stayed within phase scope
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| CONT-01 | Contact form with name, email, and message fields | React Hook Form `useForm` + shadcn Input/Textarea + Label components already installed |
| CONT-02 | Form validation with clear error messages (Zod + React Hook Form) | `zodResolver` from `@hookform/resolvers` wires Zod schema to RHF; `formState.errors` exposes per-field messages |
| CONT-03 | Form submission sends email via Resend API route | `app/api/contact/route.ts` POST handler using `resend.emails.send()`; API key via env var |
| CONT-04 | Success/error feedback after form submission | Inline status state variable in client component; conditional rendering of success/error message block below form |
| CONT-05 | Direct contact links (email, WhatsApp, LinkedIn, GitHub) alongside form | PERSONAL_INFO in `constant.ts` already has all URLs; replicate hero social links pattern with Lucide icons |
</phase_requirements>

---

## Summary

Phase 5 is a focused feature phase with well-understood requirements and a locked technology stack. The codebase already provides all UI primitives (Input, Label, Button, Card, AnimateIn, UnderLine) — the implementation work is wiring three new things: React Hook Form + Zod for client-side validation, a Next.js App Router POST route for Resend email delivery, and a `ContactSection` client component that ties them together.

All four contact URLs (email, WhatsApp, LinkedIn, GitHub) are already in `PERSONAL_INFO` in `constant.ts`, and the hero section already demonstrates the exact icon-row pattern to replicate. The `<section id="contact">` placeholder in `app/page.tsx` is ready to swap in `ContactSection`.

No toast library is installed. Feedback should be implemented as an inline status block in the form component — this avoids a new dependency and aligns with the "simple UI" discretion guideline.

**Primary recommendation:** Split layout — form on the left (two-thirds), contact links on the right (one-third) on desktop; stacked on mobile. Inline validation errors per field. Inline success/error block after the submit button. Honeypot hidden field for bot protection. All wrapped in AnimateIn for scroll-reveal consistency.

---

## Standard Stack

### Core (to install)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| `react-hook-form` | 7.71.2 | Form state, registration, submission handling | Zero re-renders per keystroke; de-facto standard for React forms |
| `@hookform/resolvers` | 5.2.2 | Bridges Zod schema to React Hook Form | Official resolver package, prevents duplicated validation logic |
| `zod` | 4.3.6 | Schema-based validation with TypeScript inference | Type-safe validation; infer form types directly from schema |
| `resend` | 6.9.4 | Email delivery Node.js SDK | Locked decision; 3,000/month free tier; server-side only |

### Already Installed (no install needed)
| Library | Version in package.json | Purpose |
|---------|------------------------|---------|
| `lucide-react` | ^0.577.0 | Contact link icons (Mail, MessageCircle, Github, Linkedin) |
| `motion` | ^12.38.0 | AnimateIn scroll-reveal wrappers |
| All shadcn/ui components | installed | Input, Label, Button, Card, UnderLine |

### Not Needed
| Instead of | Could Use | Why Not |
|------------|-----------|---------|
| Sonner/toast | Inline status block | No toast library installed; adding one just for one phase adds unnecessary dependency |
| Server Actions | API route handler | STATE.md explicitly records: "Use Resend for contact email — server-side... API route"; locked decision |
| reCAPTCHA | Honeypot field | STATE.md: "honeypot-only is acceptable fallback for low-traffic portfolio" |

**Installation:**
```bash
bun add react-hook-form @hookform/resolvers zod resend
```

**Version verification (confirmed 2026-03-19):**
```
npm view resend version        → 6.9.4
npm view react-hook-form version → 7.71.2
npm view @hookform/resolvers version → 5.2.2
npm view zod version           → 4.3.6
```

---

## Architecture Patterns

### Recommended Project Structure

```
app/
├── api/
│   └── contact/
│       └── route.ts          # POST handler: validates body, calls Resend
├── ui/
│   └── homepage/
│       └── contactSection.tsx # 'use client'; form + contact links
└── page.tsx                   # Replace <section id="contact"> placeholder
```

No new folders needed beyond `app/api/contact/`.

### Pattern 1: Zod Schema + React Hook Form Registration

**What:** Define a Zod schema, infer the TypeScript type from it, pass `zodResolver(schema)` to `useForm`. Register fields with `register()`. Access per-field errors from `formState.errors`.

**When to use:** Always when form has validation requirements.

```typescript
// Source: @hookform/resolvers docs + react-hook-form docs
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  // honeypot — hidden from real users, checked on server
  _trap: z.string().max(0, 'Bot detected').optional(),
})

type ContactFormData = z.infer<typeof contactSchema>

export function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })
  // ...
}
```

### Pattern 2: Form Submission with Inline Status

**What:** `handleSubmit` calls `onSubmit` only when validation passes. Use a local `status` state for feedback — avoids installing a toast library.

```typescript
// Client component: contactSection.tsx
const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

const onSubmit = async (data: ContactFormData) => {
  // Honeypot guard (redundant but defensive)
  if (data._trap) return

  const res = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (res.ok) {
    setStatus('success')
    reset()
  } else {
    setStatus('error')
  }
}
```

### Pattern 3: Next.js App Router API Route with Resend

**What:** `app/api/contact/route.ts` — a POST handler that reads the body, validates on server with the same Zod schema, checks honeypot, then calls `resend.emails.send()`.

```typescript
// Source: resend.com/docs/send-with-nextjs
// app/api/contact/route.ts
import { Resend } from 'resend'
import { z } from 'zod'

const resend = new Resend(process.env.RESEND_API_KEY)

const bodySchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
  _trap: z.string().max(0).optional(),
})

export async function POST(request: Request) {
  const body = await request.json()
  const parsed = bodySchema.safeParse(body)

  if (!parsed.success) {
    return Response.json({ error: 'Invalid input' }, { status: 400 })
  }

  const { name, email, message, _trap } = parsed.data

  // Honeypot check
  if (_trap) {
    return Response.json({ ok: true }) // Silent reject
  }

  const { data, error } = await resend.emails.send({
    from: 'Portfolio Contact <onboarding@resend.dev>',   // dev/testing sender
    to: ['mujeeburahman4582@gmail.com'],
    replyTo: email,
    subject: `Portfolio message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
  })

  if (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }

  return Response.json({ ok: true, id: data?.id })
}
```

**Key note on `from` address:** The free Resend account allows `onboarding@resend.dev` as the sender for testing before domain verification. For production, a verified domain is required. The STATE.md blocker confirms: "Resend domain verification needed before launch (free tier allows `onboarding@resend.dev` for testing)". The planner must surface this in a task note.

### Pattern 4: Contact Links Row (Replicate Hero Pattern)

**What:** Mirror the `SOCIAL_LINKS` pattern from `heroSection.tsx` exactly. Define links array at module scope, render with Lucide icons + aria-labels.

```typescript
// Source: app/ui/homepage/heroSection.tsx (existing pattern)
import { PERSONAL_INFO } from '@/app/lib/constant'
import { Github, Linkedin, Mail, MessageCircle } from 'lucide-react'

const CONTACT_LINKS = [
  {
    icon: Mail,
    href: `mailto:${PERSONAL_INFO.email}`,
    label: 'Send email',
    external: false,
  },
  {
    icon: MessageCircle,
    href: `https://wa.me/${PERSONAL_INFO.whatsApp.replace(/\D/g, '')}`,
    label: 'Contact on WhatsApp',
    external: true,
  },
  {
    icon: Linkedin,
    href: PERSONAL_INFO.linkedIn,
    label: 'LinkedIn profile',
    external: true,
  },
  {
    icon: Github,
    href: PERSONAL_INFO.github,
    label: 'GitHub profile',
    external: true,
  },
] as const
```

### Pattern 5: Section Structure (Established Convention)

Every section in the codebase follows this structure — the planner must replicate it exactly:

```tsx
<section
  id="contact"
  aria-labelledby="contact-heading"
  className="w-full max-w-4xl px-6 py-12"
>
  {/* Heading block */}
  <AnimateIn>
    <div className="mb-12 flex flex-col items-center gap-3 text-center">
      <h2
        id="contact-heading"
        className="font-inter text-h2-u font-bold text-foreground"
      >
        Contact
      </h2>
      <UnderLine />
    </div>
  </AnimateIn>

  {/* Content */}
  <AnimateIn delay={0.1}>
    {/* form + contact links layout */}
  </AnimateIn>
</section>
```

### Anti-Patterns to Avoid

- **Putting `useForm` in a Server Component:** `react-hook-form` requires `'use client'`. The ContactSection file must have `'use client'` at the top.
- **Hardcoding the API key:** Never write `RESEND_API_KEY` value in source code. Must be `process.env.RESEND_API_KEY` server-side only.
- **Accessing `process.env.RESEND_API_KEY` on the client:** Environment variables without `NEXT_PUBLIC_` prefix are server-only. The `fetch('/api/contact', ...)` pattern keeps the key server-side.
- **Missing `replyTo`:** Without `replyTo: email`, replying to the notification email goes to the sender address (`onboarding@resend.dev`), not the visitor. Always set `replyTo` to the form's email field.
- **Skipping server-side validation:** Client Zod validation can be bypassed via direct API calls. Always re-validate with `safeParse` in the route handler.
- **Using a textarea without a shadcn Textarea component:** The project has shadcn Input but no Textarea component installed. The planner must either use native `<textarea>` styled with the same Tailwind classes as Input, or note that a Textarea shadcn component needs to be added. Checking: shadcn has a Textarea component (`npx shadcn@latest add textarea`).

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Form state management | Custom useState per field | `react-hook-form` `useForm` | Handles dirty/touched/errors/isSubmitting; re-render optimized |
| Validation schema | Manual if/else validators | `zod` schema | Type inference, composable, reusable on server |
| Schema-to-form binding | Manual validation calls | `@hookform/resolvers` `zodResolver` | One resolver call; no glue code |
| Email delivery | SMTP/nodemailer setup | `resend` SDK | Locked decision; handles auth, retries, DKIM |
| Bot protection | Complex rate limiting | Honeypot hidden field | Sufficient for low-traffic portfolio per STATE.md decision |

**Key insight:** The biggest complexity trap in contact forms is forgetting to validate on the server. The same Zod schema defined in the component should be imported or duplicated in the API route — or better, extracted to a shared `app/lib/schemas/contact.ts` file.

---

## Common Pitfalls

### Pitfall 1: `from` Address Not Verified

**What goes wrong:** Resend rejects the email send call with a 403 if the `from` domain is not verified on the account. `onboarding@resend.dev` is the only safe sender on the free tier before domain verification.

**Why it happens:** Users forget the Resend account needs domain DNS verification before custom `from` addresses work.

**How to avoid:** Use `onboarding@resend.dev` as the `from` address in development and in the initial deployment. Document the domain verification step as a pre-launch blocker (already tracked in STATE.md).

**Warning signs:** Resend returns `{ error: { statusCode: 403, message: 'You can only send testing emails...' } }` in the API response.

### Pitfall 2: Environment Variable Missing on Vercel

**What goes wrong:** The `RESEND_API_KEY` env var is not set in Vercel project settings. The API route instantiates `new Resend(undefined)` and all sends fail.

**Why it happens:** Developers set the var in `.env.local` locally but forget to add it to Vercel's environment variable configuration.

**How to avoid:** Add `RESEND_API_KEY` setup as an explicit step in the plan. Create `.env.local.example` with the var name (empty value) as documentation.

**Warning signs:** API route returns 500 with no `data` in the Resend response.

### Pitfall 3: Textarea Not in shadcn Installed Components

**What goes wrong:** The project has `app/ui/input.tsx` (single-line input) but no `app/ui/textarea.tsx`. Using a raw `<textarea>` with custom classes will work but skips the shadcn consistency layer.

**Why it happens:** shadcn Textarea is not installed by default — must be added explicitly.

**How to avoid:** Install with `npx shadcn@latest add textarea` or style a native `<textarea>` with the same classes as Input (identical look). The plan should explicitly include this step.

### Pitfall 4: Forgetting `aria-describedby` on Fields with Errors

**What goes wrong:** Error messages appear visually but are not announced to screen readers, failing WCAG 2.2 AA (Phase 6 requirement).

**Why it happens:** Error `<p>` elements exist in the DOM but are not linked to their field via `aria-describedby`.

**How to avoid:** For each field, wire `aria-describedby={errors.fieldName ? 'fieldName-error' : undefined}` and give the error element `id="fieldName-error"` and `role="alert"`.

### Pitfall 5: `isSubmitting` Not Disabling the Submit Button

**What goes wrong:** Users double-submit the form by clicking twice during the fetch, resulting in duplicate emails.

**Why it happens:** The submit button is not wired to `formState.isSubmitting`.

**How to avoid:** Always render `<Button type="submit" disabled={isSubmitting}>`. Show a loading indicator inside the button (e.g., a spinner or "Sending..." label text) while `isSubmitting` is true.

---

## Code Examples

### Zod Schema (shared between client and server)

```typescript
// app/lib/schemas/contact.ts
import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  _trap: z.string().max(0).optional(),  // honeypot
})

export type ContactFormData = z.infer<typeof contactSchema>
```

### Field Registration with Error Display

```tsx
{/* Example for the email field */}
<div className="flex flex-col gap-1.5">
  <Label htmlFor="email">Email</Label>
  <Input
    id="email"
    type="email"
    placeholder="your@email.com"
    aria-describedby={errors.email ? 'email-error' : undefined}
    aria-invalid={!!errors.email}
    {...register('email')}
  />
  {errors.email && (
    <p
      id="email-error"
      role="alert"
      className="font-jetbrains text-code-m text-destructive"
    >
      {errors.email.message}
    </p>
  )}
</div>
```

### Honeypot Hidden Field

```tsx
{/* Invisible to real users; bots fill it in */}
<input
  type="text"
  tabIndex={-1}
  aria-hidden="true"
  autoComplete="off"
  className="absolute left-[-9999px] opacity-0"
  {...register('_trap')}
/>
```

### Inline Status Block

```tsx
{status === 'success' && (
  <p
    role="status"
    className="font-jetbrains text-para-m text-brand1"
  >
    Message sent! I'll get back to you soon.
  </p>
)}
{status === 'error' && (
  <p
    role="alert"
    className="font-jetbrains text-para-m text-destructive"
  >
    Something went wrong. Please try again or email me directly.
  </p>
)}
```

### API Route (complete)

```typescript
// Source: resend.com/docs/send-with-nextjs
// app/api/contact/route.ts
import { contactSchema } from '@/app/lib/schemas/contact'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const parsed = contactSchema.safeParse(body)
  if (!parsed.success) {
    return Response.json({ error: 'Validation failed' }, { status: 400 })
  }

  const { name, email, message, _trap } = parsed.data
  if (_trap) return Response.json({ ok: true }) // silent honeypot reject

  const { data, error } = await resend.emails.send({
    from: 'Portfolio <onboarding@resend.dev>',
    to: ['mujeeburahman4582@gmail.com'],
    replyTo: email,
    subject: `Portfolio contact from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
  })

  if (error) {
    console.error('[contact route] Resend error:', error)
    return Response.json({ error: 'Failed to send' }, { status: 500 })
  }

  return Response.json({ ok: true, id: data?.id })
}
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Manual `useState` per field | `react-hook-form` useForm | 2020+ | Zero re-render on keystroke, formState built-in |
| Hand-rolled validators | Zod schema with inferred types | 2022+ | TypeScript type and runtime validator from single source |
| `@hookform/resolvers/zod` with separate import | Same pattern, resolvers v5+ | 2024 | Resolvers package v5 — import path unchanged |
| `nodemailer` + SMTP | Resend SDK | 2023+ | No SMTP config, 3,000/month free, reliable delivery |
| Zod v3 `.parse()` throwing | Zod v4 `.safeParse()` returning `{ success, data, error }` | 2025 (Zod v4) | Non-throwing parse; always use `safeParse` in route handlers |

**Deprecated/outdated:**
- `zod` v3 `z.string().nonempty()`: Use `z.string().min(1)` in v4 — `nonempty()` is removed.
- `@hookform/resolvers` < v3: Import paths changed in v3+. Current v5 import is `from '@hookform/resolvers/zod'`.

---

## Open Questions

1. **Textarea component availability**
   - What we know: `app/ui/input.tsx` exists; no `textarea.tsx` found in `app/ui/`
   - What's unclear: Whether to run `npx shadcn@latest add textarea` or manually style a native textarea
   - Recommendation: Install shadcn Textarea (`npx shadcn@latest add textarea`) — keeps the component consistent with Input styling and project patterns. Plan should include this as a Wave 0 task.

2. **`.env.local` setup for development**
   - What we know: `RESEND_API_KEY` must be set; not present in codebase
   - What's unclear: Whether a `.env.local` file already exists with a placeholder
   - Recommendation: Plan includes creating/updating `.env.local` with `RESEND_API_KEY=` and documenting in the plan notes that the developer must add their actual Resend API key.

3. **Resend domain verification timing**
   - What we know: STATE.md documents this as a pre-launch blocker; `onboarding@resend.dev` works for testing
   - What's unclear: Whether domain verification will happen before or after Phase 5 implementation
   - Recommendation: Plan notes that initial testing should use `onboarding@resend.dev`. Domain verification is a Phase 6/launch prerequisite, not a Phase 5 blocker.

---

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Vitest 4.x + @testing-library/react 16.x |
| Config file | `vitest.config.ts` (project root) |
| Quick run command | `bun run test --run tests/contact.test.tsx` |
| Full suite command | `bun run test --run` |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| CONT-01 | Form renders name, email, message fields and a submit button | unit | `bun run test --run tests/contact.test.tsx` | ❌ Wave 0 |
| CONT-02 | Empty submit shows field-level error messages; valid data does not | unit | `bun run test --run tests/contact.test.tsx` | ❌ Wave 0 |
| CONT-03 | On valid submit, POST to `/api/contact` is called with correct payload | unit (fetch mock) | `bun run test --run tests/contact.test.tsx` | ❌ Wave 0 |
| CONT-04 | Success response shows success message; error response shows error message | unit | `bun run test --run tests/contact.test.tsx` | ❌ Wave 0 |
| CONT-05 | Contact links section renders links for email, WhatsApp, LinkedIn, GitHub | unit | `bun run test --run tests/contact.test.tsx` | ❌ Wave 0 |

### Sampling Rate
- **Per task commit:** `bun run test --run tests/contact.test.tsx`
- **Per wave merge:** `bun run test --run`
- **Phase gate:** Full suite green before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] `tests/contact.test.tsx` — covers CONT-01 through CONT-05
- [ ] `app/lib/schemas/contact.ts` — shared Zod schema (needed before both component and API route)
- [ ] `app/ui/textarea.tsx` — shadcn Textarea component (`npx shadcn@latest add textarea`)
- [ ] `.env.local` — `RESEND_API_KEY=` placeholder entry

---

## Sources

### Primary (HIGH confidence)
- Resend official docs (resend.com/docs/send-with-nextjs) — App Router route handler pattern, `emails.send()` signature, `from` address constraint, `replyTo` field
- npm registry (verified 2026-03-19) — confirmed package versions: resend@6.9.4, react-hook-form@7.71.2, @hookform/resolvers@5.2.2, zod@4.3.6
- Codebase inspection — `app/lib/constant.ts` PERSONAL_INFO URLs, `app/ui/homepage/heroSection.tsx` social links pattern, `app/ui/input.tsx` / `card.tsx` / `button.tsx` / `animate-in.tsx` component APIs, `vitest.config.ts`, `tests/setup.ts`

### Secondary (MEDIUM confidence)
- Resend pricing page (resend.com/pricing) — free tier 3,000 emails/month confirmed via WebSearch results
- WebSearch: react-hook-form + zod best practices 2025 — confirms `zodResolver` import path from `@hookform/resolvers/zod`, `formState.errors` per-field pattern

### Tertiary (LOW confidence)
- WebSearch: honeypot implementation for Next.js — confirms hidden input approach; no single authoritative spec

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — npm registry versions verified 2026-03-19; Resend docs confirmed via WebFetch
- Architecture: HIGH — directly derived from existing codebase patterns (heroSection, experienceSection) + official Resend Next.js docs
- Pitfalls: HIGH — Resend `from` address constraint verified via official docs; other pitfalls derived from codebase review
- Validation: HIGH — vitest.config.ts and setup.ts inspected directly; test file list confirmed

**Research date:** 2026-03-19
**Valid until:** 2026-04-19 (30 days — stable libraries)
