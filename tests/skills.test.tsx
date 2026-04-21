import { render, screen } from '@testing-library/react'
import SkillsSection from '@/app/ui/homepage/skillsSection'

describe('SkillsSection', () => {
  it('SKILL-01: renders all 5 category headings', () => {
    render(<SkillsSection />)
    expect(screen.getByText('Frontend')).toBeInTheDocument()
    expect(screen.getByText('Backend')).toBeInTheDocument()
    expect(screen.getByText('Mobile')).toBeInTheDocument()
    expect(screen.getByText('LLM/AI')).toBeInTheDocument()
    expect(screen.getByText('Tools')).toBeInTheDocument()
  })

  it('SKILL-02: renders at least one SVG icon element in the skills section', () => {
    render(<SkillsSection />)
    const svgs = document.querySelectorAll('svg')
    expect(svgs.length).toBeGreaterThan(0)
  })

  it('SKILL-03: renders all 35 skill names', () => {
    render(<SkillsSection />)
    const skillNames = [
      'React', 'Next.js', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'TailwindCSS',
      'Redux', 'Bootstrap', 'shadcn/ui', 'Ant Design',
      'Node.js', 'PostgreSQL', 'Ruby on Rails', 'Express.js', 'Supabase', 'Firebase',
      'MySQL', 'MongoDB', 'Python', 'AWS', 'Ruby',
      'React Native',
      'OpenAI API', 'Gemini API', 'LiteLLM', 'Langfuse', 'Prompt Engineering',
      'Git', 'GitHub', 'Docker', 'Cypress', 'TDD', 'Render', 'Netlify',
    ]
    skillNames.forEach(name => {
      expect(screen.getByText(name)).toBeInTheDocument()
    })
  })
})
