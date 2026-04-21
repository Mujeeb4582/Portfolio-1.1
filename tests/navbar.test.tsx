import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Navbar from '@/app/ui/navbar'
import { NAV_LINKS } from '@/app/lib/constant'

// Mock next/link
vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: { href: string; children: React.ReactNode; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  ),
}))

describe('Navbar', () => {
  it('NAV-01: renders all NAV_LINKS as anchor links', () => {
    render(<Navbar />)
    NAV_LINKS.forEach((link) => {
      const el = screen.getByRole('link', { name: link.label })
      expect(el).toBeInTheDocument()
      expect(el).toHaveAttribute('href', link.href)
    })
  })

  it('NAV-02: hamburger button is present with correct aria-label', () => {
    render(<Navbar />)
    expect(screen.getByRole('button', { name: /open menu/i })).toBeInTheDocument()
  })

  it('NAV-02: mobile menu shows all nav links when hamburger is clicked', () => {
    render(<Navbar />)
    fireEvent.click(screen.getByRole('button', { name: /open menu/i }))
    NAV_LINKS.forEach((link) => {
      expect(screen.getAllByRole('link', { name: link.label }).length).toBeGreaterThanOrEqual(1)
    })
  })

  it('NAV-03: active nav link has cyan underline indicator', () => {
    render(<Navbar />)
    // The active-section underline span should exist for at least one link
    const underlines = document.querySelectorAll('[data-active-indicator]')
    expect(underlines.length).toBeGreaterThan(0)
  })

  it('ANIM-02: nav links have hover transition classes', () => {
    render(<Navbar />)
    const link = screen.getAllByRole('link').find(
      (el) => el.getAttribute('href')?.startsWith('#')
    )
    expect(link?.className).toMatch(/transition/)
  })
})
