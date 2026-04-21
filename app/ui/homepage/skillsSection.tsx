// skillsSection.tsx — rebuilt for Phase 2
// Brand icons via react-icons/si (tree-shaken named imports only)
// Skills with no SI icon render text-only with a placeholder square
import { SKILLS } from '@/app/lib/constant'
import type { SkillCategory } from '@/app/lib/types'
import { AnimateIn, StaggerChildren, StaggerItem } from '@/app/ui/animate-in'
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
import { Bot, BrainCircuit, Cloud, MessageSquareCode, TestTubeDiagonal } from 'lucide-react'
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

      {/* Category groups */}
      <StaggerChildren className="space-y-10">
        {skillsByCategory.map(({ category, skills }) => (
          <StaggerItem key={category}>
            <AnimateIn>
              <h3 className="mb-4 font-inter text-sm font-semibold text-foreground">
                {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => {
                  const Icon = SKILL_ICON_MAP[skill.name]
                  return (
                    <span
                      key={skill.name}
                      className="inline-flex items-center gap-1.5 rounded-full bg-brand1/10 px-3 py-1.5 font-jetbrains text-xs font-medium text-brand1"
                    >
                      {Icon && (
                        <Icon className="size-3.5" aria-hidden="true" />
                      )}
                      {skill.name}
                    </span>
                  )
                })}
              </div>
            </AnimateIn>
          </StaggerItem>
        ))}
      </StaggerChildren>
    </section>
  )
}
