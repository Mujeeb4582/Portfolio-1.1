'use client'
import { useCallback } from 'react'
import Link from 'next/link'
import { Github, Linkedin, Mail, MessageCircle } from 'lucide-react'
import { NAV_LINKS, PERSONAL_INFO } from '@/app/lib/constant'
import { cn } from '@/app/lib/utils'
import { useActiveSection } from '@/app/hooks/use-active-section'
import { ThemeToggle } from '@/app/ui/theme/theme-toggle'

const SOCIAL_LINKS = [
  {
    icon: Github,
    href: PERSONAL_INFO.github,
    label: 'GitHub',
    external: true,
  },
  {
    icon: Linkedin,
    href: PERSONAL_INFO.linkedIn,
    label: 'LinkedIn',
    external: true,
  },
  {
    icon: Mail,
    href: `mailto:${PERSONAL_INFO.email}`,
    label: 'Email',
    external: false,
  },
  {
    icon: MessageCircle,
    href: `https://wa.me/${PERSONAL_INFO.whatsApp.replace(/\D/g, '')}`,
    label: 'WhatsApp',
    external: true,
  },
] as const

export default function SidebarNav() {
  const activeSection = useActiveSection()

  const scrollToSection = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const id = href.replace('#', '')
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
      window.history.pushState(null, '', href)
    }
  }, [])

  return (
    <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24">
      <div>
        {/* Name & title */}
        <h1 className="font-inter text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          <a href="#about" onClick={(e) => scrollToSection(e, '#about')}>
            {PERSONAL_INFO.name}
          </a>
        </h1>
        <h2 className="mt-3 font-inter text-lg font-medium tracking-tight text-foreground sm:text-xl">
          {PERSONAL_INFO.title}
        </h2>
        <p className="mt-4 max-w-xs font-jetbrains text-para-m leading-normal text-muted-foreground">
          {PERSONAL_INFO.bio.slice(0, 140)}...
        </p>

        {/* Navigation — desktop only */}
        <nav className="mt-16 hidden lg:block" aria-label="In-page jump links">
          <ul className="w-max">
            {NAV_LINKS.map((link) => {
              const isActive = link.href === `#${activeSection}`
              return (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className={cn(
                      'group flex items-center py-3 transition-all',
                      isActive ? 'text-foreground' : 'text-muted-foreground'
                    )}
                  >
                    <span
                      className={cn(
                        'mr-4 h-px transition-all group-hover:w-16 group-hover:bg-foreground',
                        isActive ? 'w-16 bg-foreground' : 'w-8 bg-muted-foreground'
                      )}
                    />
                    <span
                      className={cn(
                        'font-inter text-xs font-bold uppercase tracking-widest transition-colors group-hover:text-foreground',
                        isActive ? 'text-foreground' : 'text-muted-foreground'
                      )}
                    >
                      {link.label}
                    </span>
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>

      {/* Bottom: social links + theme toggle */}
      <div className="mt-8 flex items-center gap-5">
      <ul className="ml-1 flex items-center gap-5" aria-label="Social media">
        {SOCIAL_LINKS.map(({ icon: Icon, href, label, external }) => (
          <li key={label}>
            <Link
              href={href}
              aria-label={label}
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="block text-muted-foreground transition-colors hover:text-foreground"
            >
              <Icon className="size-6" aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
      <ThemeToggle />
      </div>
    </header>
  )
}
