'use client'

import { PERSONAL_INFO } from '@/app/lib/constant'
import { contactSchema, type ContactFormData } from '@/app/lib/schemas/contact'
import { AnimateIn } from '@/app/ui/animate-in'
import { Button } from '@/app/ui/button'
import { Input } from '@/app/ui/input'
import { Label } from '@/app/ui/label'
import { Textarea } from '@/app/ui/textarea'

import { zodResolver } from '@hookform/resolvers/zod'
import { Github, Linkedin, Mail, MessageCircle } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

// Module-scope constant — computed once at module load, not per render
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
    label: 'Connect on LinkedIn',
    external: true,
  },
  {
    icon: Github,
    href: PERSONAL_INFO.github,
    label: 'View GitHub profile',
    external: true,
  },
] as const

export default function ContactSection() {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    // Honeypot — silent reject
    if (data._trap) return

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          message: data.message,
        }),
      })

      if (response.ok) {
        setStatus('success')
        reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section
      id="contact"
      aria-label="Contact"
      className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
    >
      {/* Sticky heading — mobile only */}
      <div className="sticky top-0 z-20 -mx-6 mb-4 bg-background/75 px-6 py-5 backdrop-blur-sm lg:sr-only">
        <h2 className="font-inter text-sm font-bold uppercase tracking-widest text-foreground">Contact</h2>
      </div>

      <AnimateIn delay={0.1}>
        <div className="flex flex-col gap-10 md:flex-row">
          {/* Form — two-thirds on desktop */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-1 flex-col gap-5 md:w-2/3"
            noValidate
          >
            {/* Name field */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Your name"
                aria-describedby={errors.name ? 'name-error' : undefined}
                aria-invalid={!!errors.name}
                {...register('name')}
              />
              {errors.name && (
                <p
                  id="name-error"
                  role="alert"
                  className="font-jetbrains text-code-m text-destructive"
                >
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email field */}
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

            {/* Message field */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Your message..."
                className="min-h-[120px]"
                aria-describedby={errors.message ? 'message-error' : undefined}
                aria-invalid={!!errors.message}
                {...register('message')}
              />
              {errors.message && (
                <p
                  id="message-error"
                  role="alert"
                  className="font-jetbrains text-code-m text-destructive"
                >
                  {errors.message.message}
                </p>
              )}
            </div>

            {/* Honeypot — visually hidden, anti-bot */}
            <input
              type="text"
              className="absolute left-[-9999px] opacity-0"
              tabIndex={-1}
              aria-hidden="true"
              autoComplete="off"
              {...register('_trap')}
            />

            {/* Submit button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-brand1 font-inter font-bold text-black hover:bg-brand1/90 sm:w-auto"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>

            {/* Status feedback */}
            {status === 'success' && (
              <p
                role="status"
                className="font-jetbrains text-para-m text-brand1"
              >
                Message sent! I&apos;ll get back to you soon.
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
          </form>

          {/* Contact links — one-third on desktop */}
          <div className="flex flex-col gap-4 md:w-1/3">
            <h3 className="font-inter text-h3-u font-semibold text-foreground">
              Get in Touch
            </h3>
            <p className="font-jetbrains text-para-m text-muted-foreground">
              Feel free to reach out through any of these channels.
            </p>
            <div className="flex flex-col gap-3">
              {CONTACT_LINKS.map(({ icon: Icon, href, label, external }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-3 text-muted-foreground transition-colors duration-200 hover:text-brand1"
                >
                  <Icon className="size-5 shrink-0" aria-hidden="true" />
                  <span className="font-jetbrains text-para-m">{label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </AnimateIn>
    </section>
  )
}

export { ContactSection }
