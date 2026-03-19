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
        <h2 className="text-sm font-bold uppercase tracking-widest text-foreground">Contact</h2>
      </div>

      {/* Intro text */}
      <AnimateIn>
        <p className="mb-8 text-base leading-relaxed text-muted-foreground">
          I&apos;m always open to new opportunities and interesting projects. Whether you have a
          question or just want to say hi, feel free to reach out and I&apos;ll get back to you
          as soon as I can.
        </p>
      </AnimateIn>

      {/* Contact links — horizontal row */}
      <AnimateIn delay={0.05}>
        <div className="mb-10 flex flex-wrap gap-3">
          {CONTACT_LINKS.map(({ icon: Icon, href, label, external }) => (
            <a
              key={label}
              href={href}
              target={external ? '_blank' : undefined}
              rel={external ? 'noopener noreferrer' : undefined}
              className="inline-flex items-center gap-2 rounded-full bg-brand1/10 px-4 py-2 text-sm font-medium text-brand1 transition-colors hover:bg-brand1/20"
            >
              <Icon className="size-4" aria-hidden="true" />
              {label}
            </a>
          ))}
        </div>
      </AnimateIn>

      {/* Contact form */}
      <AnimateIn delay={0.1}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5"
          noValidate
        >
          <div className="grid gap-5 sm:grid-cols-2">
            {/* Name */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="name" className="text-sm text-muted-foreground">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Your name"
                aria-describedby={errors.name ? 'name-error' : undefined}
                aria-invalid={!!errors.name}
                className="bg-card/50 border-border"
                {...register('name')}
              />
              {errors.name && (
                <p id="name-error" role="alert" className="text-xs text-destructive">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email" className="text-sm text-muted-foreground">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                aria-describedby={errors.email ? 'email-error' : undefined}
                aria-invalid={!!errors.email}
                className="bg-card/50 border-border"
                {...register('email')}
              />
              {errors.email && (
                <p id="email-error" role="alert" className="text-xs text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          {/* Message */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="message" className="text-sm text-muted-foreground">Message</Label>
            <Textarea
              id="message"
              placeholder="Your message..."
              className="min-h-[120px] bg-card/50 border-border"
              aria-describedby={errors.message ? 'message-error' : undefined}
              aria-invalid={!!errors.message}
              {...register('message')}
            />
            {errors.message && (
              <p id="message-error" role="alert" className="text-xs text-destructive">
                {errors.message.message}
              </p>
            )}
          </div>

          {/* Honeypot */}
          <input
            type="text"
            className="absolute left-[-9999px] opacity-0"
            tabIndex={-1}
            aria-hidden="true"
            autoComplete="off"
            {...register('_trap')}
          />

          {/* Submit */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-brand1 font-medium text-black hover:bg-brand1/90 sm:w-auto"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </Button>

          {/* Status feedback */}
          {status === 'success' && (
            <p role="status" className="text-sm text-brand1">
              Message sent! I&apos;ll get back to you soon.
            </p>
          )}
          {status === 'error' && (
            <p role="alert" className="text-sm text-destructive">
              Something went wrong. Please try again or email me directly.
            </p>
          )}
        </form>
      </AnimateIn>
    </section>
  )
}

export { ContactSection }
