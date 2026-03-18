import { render, screen } from '@testing-library/react'
import ExperienceSection from '@/app/ui/homepage/experienceSection'

describe('ExperienceSection', () => {
  it('EXP-01: renders 4 experience entries', () => {
    render(<ExperienceSection />)
    expect(screen.getByText('Wonder Crafts')).toBeInTheDocument()
    expect(screen.getByText('Techiosis')).toBeInTheDocument()
    expect(screen.getByText('RGX Labs')).toBeInTheDocument()
    expect(screen.getByText(/Microverse/)).toBeInTheDocument()
  })

  it('EXP-02: each entry renders role, company, and date range', () => {
    render(<ExperienceSection />)
    expect(screen.getByText('Full-Stack Web Developer')).toBeInTheDocument()
    expect(screen.getByText('May 2023 – Present')).toBeInTheDocument()
    expect(screen.getByText('React Native Developer')).toBeInTheDocument()
    expect(screen.getByText('May 2025 – Dec 2025')).toBeInTheDocument()
  })

  it('EXP-03: Wonder Crafts, Techiosis, RGX Labs, Microverse are all present', () => {
    render(<ExperienceSection />)
    expect(screen.getByText('Wonder Crafts')).toBeInTheDocument()
    expect(screen.getByText('Techiosis')).toBeInTheDocument()
    expect(screen.getByText('RGX Labs')).toBeInTheDocument()
    expect(screen.getAllByText(/Microverse/).length).toBeGreaterThan(0)
  })

  it('EXP-04: education entries for Microverse and NUCES-FAST are present', () => {
    render(<ExperienceSection />)
    expect(screen.getByText('NUCES-FAST')).toBeInTheDocument()
    expect(screen.getByText('Remote Full-Stack Web Development Program')).toBeInTheDocument()
  })
})
