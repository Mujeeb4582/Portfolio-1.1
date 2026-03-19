'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { NAV_LINKS } from '@/app/lib/constant'
import { cn } from '@/app/lib/utils'
import { ThemeToggle } from '@/app/ui/theme/theme-toggle'

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)
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
      {/* Mobile top bar — hidden on desktop */}
      <nav
        aria-label="Mobile navigation"
        className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between bg-background/80 px-6 py-4 backdrop-blur-md lg:hidden"
      >
        <a
          href="#about"
          onClick={(e) => scrollToSection(e, '#about')}
          className="font-inter text-lg font-bold text-foreground"
        >
          <span className="text-brand1">M</span>ujeeb
        </a>

        <div className="flex items-center gap-3">
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
      </nav>

      {/* Full-screen overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-background/95 backdrop-blur-md lg:hidden"
          >
            <nav ref={menuRef} aria-label="Mobile navigation" className="flex flex-col items-center gap-8">
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
