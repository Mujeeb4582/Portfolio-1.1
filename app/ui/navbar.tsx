'use client'
import { useState, useEffect, useRef, useCallback } from 'react'

import { AnimatePresence, motion } from 'motion/react'
import { NAV_LINKS } from '@/app/lib/constant'
import { cn } from '@/app/lib/utils'
import { ThemeToggle } from '@/app/ui/theme/theme-toggle'
import { useActiveSection } from '@/app/hooks/use-active-section'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const activeSection = useActiveSection()
  const menuRef = useRef<HTMLDivElement>(null)

  const scrollToSection = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const id = href.replace('#', '')
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
      window.history.pushState(null, '', href)
    }
  }, [])

  // Scroll-aware background
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // Outside-click closes menu
  useEffect(() => {
    if (!isOpen) return
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [isOpen])

  return (
    <>
      <nav
        aria-label="Main navigation"
        className={cn(
          'fixed left-0 right-0 top-0 z-50 px-6 py-4 transition-all duration-300',
          scrolled
            ? 'border-b border-border bg-background/80 shadow-sm backdrop-blur-md'
            : 'bg-transparent'
        )}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          {/* Logo */}
          <a href="#hero" onClick={(e) => scrollToSection(e, '#hero')} className="font-inter text-xl font-bold text-foreground transition-colors hover:text-brand1">
            <span className="text-brand1">M</span>ujeeb
          </a>

          {/* Desktop nav links */}
          <div className="hidden items-center gap-6 md:flex">
            {NAV_LINKS.map((link) => {
              const isActive = link.href === `#${activeSection}`
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={cn(
                    'relative font-inter text-sm font-medium text-foreground transition-colors hover:text-brand1',
                    isActive && 'text-brand1'
                  )}
                >
                  {link.label}
                  <span
                    data-active-indicator
                    className={cn(
                      'absolute -bottom-1 left-0 right-0 h-0.5 bg-brand1 transition-opacity duration-200',
                      isActive ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                </a>
              )
            })}
            <ThemeToggle />
          </div>

          {/* Mobile: ThemeToggle + hamburger */}
          <div className="flex items-center gap-3 md:hidden">
            <ThemeToggle />
            <button
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
              onClick={() => setIsOpen(!isOpen)}
              className="flex flex-col gap-1.5 p-2"
            >
              <span className={cn(
                'block h-0.5 w-6 bg-foreground transition-all duration-300',
                isOpen ? 'translate-y-2 rotate-45' : ''
              )} />
              <span className={cn(
                'block h-0.5 w-6 bg-foreground transition-all duration-300',
                isOpen ? 'opacity-0' : ''
              )} />
              <span className={cn(
                'block h-0.5 w-6 bg-foreground transition-all duration-300',
                isOpen ? '-translate-y-2 -rotate-45' : ''
              )} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-background/95 backdrop-blur-md md:hidden"
          >
            <nav ref={menuRef} className="flex flex-col items-center gap-8">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => { scrollToSection(e, link.href); setIsOpen(false) }}
                  className="font-inter text-2xl font-bold text-foreground transition-colors hover:text-brand1"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
