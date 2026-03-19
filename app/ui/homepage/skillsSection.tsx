// skillsSection.tsx — rebuilt for Phase 2
// Brand icons via react-icons/si (tree-shaken named imports only)
// Skills with no SI icon render text-only with a placeholder square
import { SKILLS } from '@/app/lib/constant'
import type { SkillCategory } from '@/app/lib/types'
import { AnimateIn, StaggerChildren, StaggerItem } from '@/app/ui/animate-in'
import { Card } from '@/app/ui/card'
import {
  SiAntdesign,
  SiBootstrap,
  SiCss,
  SiCypress,
  SiDocker,
  SiExpress,
  SiFirebase,
  SiGit,
  SiGithub,
  SiGooglegemini,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiMysql,
  SiNetlify,
  SiNextdotjs,
  SiNodedotjs,
  SiOpenai,
  SiPostgresql,
  SiPython,
  SiReact,
  SiRedux,
  SiRender,
  SiRuby,
  SiRubyonrails,
  SiShadcnui,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
} from 'react-icons/si'
import { Bot, BrainCircuit, Cloud, FlaskConical, MessageSquareCode, TestTubeDiagonal } from 'lucide-react'
import type { IconType } from 'react-icons'
import type { LucideIcon } from 'lucide-react'

// Static icon map keyed by exact skill name from constant.ts
const SKILL_ICON_MAP: Partial<Record<string, IconType | LucideIcon>> = {
  'React': SiReact,
  'Next.js': SiNextdotjs,
  'TypeScript': SiTypescript,
  'JavaScript': SiJavascript,
  'HTML5': SiHtml5,
  'CSS3': SiCss,
  'TailwindCSS': SiTailwindcss,
  'Redux': SiRedux,
  'Bootstrap': SiBootstrap,
  'shadcn/ui': SiShadcnui,
  'Ant Design': SiAntdesign,
  'Node.js': SiNodedotjs,
  'PostgreSQL': SiPostgresql,
  'Ruby on Rails': SiRubyonrails,
  'Express.js': SiExpress,
  'Supabase': SiSupabase,
  'Firebase': SiFirebase,
  'MySQL': SiMysql,
  'MongoDB': SiMongodb,
  'Python': SiPython,
  'AWS': Cloud,
  'Ruby': SiRuby,
  'React Native': SiReact,
  'OpenAI API': SiOpenai,
  'Gemini API': SiGooglegemini,
  'LiteLLM': Bot,
  'Langfuse': BrainCircuit,
  'Prompt Engineering': MessageSquareCode,
  'Git': SiGit,
  'GitHub': SiGithub,
  'Docker': SiDocker,
  'Cypress': SiCypress,
  'TDD': TestTubeDiagonal,
  'Render': SiRender,
  'Netlify': SiNetlify,
}

const CATEGORY_ORDER: SkillCategory[] = [
  'Frontend',
  'Backend',
  'Mobile',
  'LLM/AI',
  'Tools',
]

export default function SkillsSection() {
  const skillsByCategory = CATEGORY_ORDER.map((category) => ({
    category,
    skills: SKILLS.filter((s) => s.category === category),
  })).filter((group) => group.skills.length > 0)

  return (
    <section
      id="skills"
      aria-label="Skills"
      className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
    >
      {/* Sticky heading — mobile only */}
      <div className="sticky top-0 z-20 -mx-6 mb-4 bg-background/75 px-6 py-5 backdrop-blur-sm lg:sr-only">
        <h2 className="font-inter text-sm font-bold uppercase tracking-widest text-foreground">Skills</h2>
      </div>

      {/* Category card grid */}
      <StaggerChildren className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {skillsByCategory.map(({ category, skills }) => (
          <StaggerItem key={category}>
            <Card className="p-6 transition-colors duration-200 hover:border-brand1/50">
              <h3 className="mb-4 font-inter text-button-u font-bold text-foreground">
                {category}
              </h3>

              {/* Skill icon grid: 3 columns inside each card */}
              <div className="grid grid-cols-3 gap-2">
                {skills.map((skill) => {
                  const Icon = SKILL_ICON_MAP[skill.name]
                  return (
                    <div
                      key={skill.name}
                      className="flex flex-col items-center gap-1"
                    >
                      {Icon ? (
                        <Icon
                          className="size-8 text-brand1"
                          aria-hidden="true"
                        />
                      ) : (
                        <div
                          className="flex size-8 items-center justify-center rounded-sm bg-muted text-xs font-bold text-muted-foreground"
                          aria-hidden="true"
                        >
                          {skill.name.charAt(0)}
                        </div>
                      )}
                      <span className="text-center font-jetbrains text-code-m text-muted-foreground">
                        {skill.name}
                      </span>
                    </div>
                  )
                })}
              </div>
            </Card>
          </StaggerItem>
        ))}
      </StaggerChildren>
    </section>
  )
}
