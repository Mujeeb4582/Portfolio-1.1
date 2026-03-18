import { render, screen } from '@testing-library/react'
import HeroSection from '@/app/ui/homepage/heroSection'

describe('HeroSection', () => {
  it('HERO-01: renders name "Mujeeb ur Rahman" and title "Full-Stack Web Developer"', () => {
    render(<HeroSection />)
    expect(screen.getByText('Mujeeb ur Rahman')).toBeInTheDocument()
    expect(screen.getByText('Full-Stack Web Developer')).toBeInTheDocument()
  })

  it('HERO-02: renders hero photo with src="/profile.jpg"', () => {
    render(<HeroSection />)
    const img = screen.getByAltText('Mujeeb ur Rahman — Full-Stack Web Developer')
    expect(img).toBeInTheDocument()
  })

  it('HERO-03: renders "Contact Me" and "Download CV" CTA buttons', () => {
    render(<HeroSection />)
    expect(screen.getByText('Contact Me')).toBeInTheDocument()
    expect(screen.getByText('Download CV')).toBeInTheDocument()
  })

  it('HERO-04: social links render with correct aria-labels', () => {
    render(<HeroSection />)
    expect(screen.getByLabelText('GitHub profile')).toBeInTheDocument()
    expect(screen.getByLabelText('LinkedIn profile')).toBeInTheDocument()
    expect(screen.getByLabelText('Send email')).toBeInTheDocument()
    expect(screen.getByLabelText('Contact on WhatsApp')).toBeInTheDocument()
  })

  it('HERO-05: Download CV anchor has href="/mujeeb-resume.pdf" and download attribute', () => {
    render(<HeroSection />)
    const link = screen.getByRole('link', { name: /download cv/i })
    expect(link).toHaveAttribute('href', '/mujeeb-resume.pdf')
    expect(link).toHaveAttribute('download')
  })
})
