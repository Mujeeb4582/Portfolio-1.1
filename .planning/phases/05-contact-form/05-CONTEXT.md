# Phase 5: Contact Form - Context

**Gathered:** 2026-03-19
**Status:** Ready for planning

<domain>
## Phase Boundary

Build a contact form section that lets visitors send Mujeeb a message via email (Resend API) and provides direct contact links (email, WhatsApp, LinkedIn, GitHub). The form has name, email, and message fields with Zod + React Hook Form validation. Replaces the empty `<section id="contact">` placeholder from Phase 4. Includes success/error feedback after submission.

</domain>

<decisions>
## Implementation Decisions

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

### Locked by Requirements
- Form fields: name, email, message (CONT-01)
- Validation: Zod schemas + React Hook Form (CONT-02)
- Email delivery: Resend API via Next.js API route (CONT-03)
- Success/error feedback visible to user (CONT-04)
- Direct contact links: email, WhatsApp, LinkedIn, GitHub (CONT-05)
- Email recipient: mujeeburahman4582@gmail.com

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Data Layer
- `app/lib/constant.ts` — PERSONAL_INFO with email, whatsApp, github, linkedIn URLs
- `app/lib/types.ts` — PersonalInfo interface

### Existing Components & Patterns
- `app/ui/input.tsx` — shadcn Input component (already installed)
- `app/ui/label.tsx` — shadcn Label component (already installed)
- `app/ui/button.tsx` — shadcn Button with variants
- `app/ui/card.tsx` — shadcn Card for form container
- `app/ui/animate-in.tsx` — AnimateIn wrapper for scroll-reveal
- `app/ui/underLine.tsx` — Section heading decoration
- `app/ui/homepage/heroSection.tsx` — Social links pattern (icon row with aria-labels)

### Prior Phase Context
- `.planning/phases/01-foundation/01-CONTEXT.md` — Design tokens, font choices
- `.planning/phases/02-core-sections/02-UI-SPEC.md` — Typography, color, spacing systems
- `.planning/phases/04-navigation-animations/04-CONTEXT.md` — AnimateIn patterns

### Project Context
- `.planning/REQUIREMENTS.md` — Phase 5 requirements: CONT-01 to CONT-05

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `app/ui/input.tsx`: shadcn Input — use for name, email fields
- `app/ui/label.tsx`: shadcn Label — field labels
- `app/ui/button.tsx`: shadcn Button — submit button
- `app/ui/card.tsx`: shadcn Card — form container
- `app/ui/animate-in.tsx`: AnimateIn, StaggerChildren — scroll-reveal wrappers
- `app/ui/underLine.tsx`: Decorative underline for heading
- `app/lib/constant.ts`: PERSONAL_INFO has all contact URLs
- `app/page.tsx`: Empty `<section id="contact">` placeholder ready to be replaced

### Established Patterns
- Server Components by default; form needs `'use client'` for interactivity
- Section heading: h2 + UnderLine centered
- Social/contact icons: Lucide icons with aria-labels (pattern from heroSection)
- Three themes: all form elements must work in light/dark/midnight_steel
- AnimateIn wrappers on section headings and content

### Integration Points
- `app/page.tsx`: Replace `<section id="contact">` placeholder with ContactSection
- `app/api/contact/route.ts`: New API route for Resend email sending
- Need to install: `resend`, `react-hook-form`, `@hookform/resolvers`, `zod`

</code_context>

<specifics>
## Specific Ideas

No specific requirements — open to standard approaches. Follow established patterns from Phases 2-4.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 05-contact-form*
*Context gathered: 2026-03-19*
