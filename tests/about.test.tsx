import { render, screen } from '@testing-library/react'
import AboutSection from '@/app/ui/homepage/aboutSection'

describe('AboutSection', () => {
  it('ABOUT-01: renders bio text from PERSONAL_INFO.bio', () => {
    render(<AboutSection />)
    expect(screen.getByText(/Full-Stack Web Developer with 4\+ years/)).toBeInTheDocument()
  })

  it('ABOUT-02: renders stats with values 4+, 6+, 20+ and correct labels', () => {
    render(<AboutSection />)
    expect(screen.getByText('4+')).toBeInTheDocument()
    expect(screen.getByText('6+')).toBeInTheDocument()
    expect(screen.getByText('20+')).toBeInTheDocument()
    expect(screen.getByText('Years Experience')).toBeInTheDocument()
    expect(screen.getByText('Projects Completed')).toBeInTheDocument()
    expect(screen.getByText('Technologies')).toBeInTheDocument()
  })

  it('ABOUT-03: does NOT render a profile photo in about section', () => {
    render(<AboutSection />)
    const images = screen.queryAllByRole('img')
    images.forEach(img => {
      expect(img).not.toHaveAttribute('src', '/profile.jpg')
    })
  })
})
