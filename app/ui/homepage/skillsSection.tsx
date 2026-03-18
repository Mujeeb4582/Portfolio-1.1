// skillsSection.tsx — rebuilt for Phase 2
// Brand icons via react-icons/si (tree-shaken named imports only)
// Skills with no SI icon render text-only with a placeholder square
import { SKILLS } from '@/app/lib/constant'
import type { SkillCategory } from '@/app/lib/types'
import { Card } from '@/app/ui/card'
import { UnderLine } from '@/app/ui/underLine'
import {
  SiBootstrap,
  SiCss,
  SiCypress,
  SiDocker,
  SiExpress,
  SiFirebase,
  SiGit,
  SiGithub,
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
  SiRuby,
  SiRubyonrails,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
} from 'react-icons/si'
import type { IconType } from 'react-icons'

// Static icon map keyed by exact skill name from constant.ts
// Skills not listed here render text-only (graceful fallback)
const SKILL_ICON_MAP: Partial<Record<string, IconType>> = {
  'React': SiReact,
  'Next.js': SiNextdotjs,
  'TypeScript': SiTypescript,
  'JavaScript': SiJavascript,
  'HTML5': SiHtml5,
  'CSS3': SiCss, // SiCss3 not in v5.6.0; SiCss is the correct export
  'TailwindCSS': SiTailwindcss,
  'Redux': SiRedux,
  'Bootstrap': SiBootstrap,
  // shadcn/ui — no SI icon; text-only fallback
  // Ant Design — no SI icon; text-only fallback
  'Node.js': SiNodedotjs,
  'PostgreSQL': SiPostgresql,
  'Ruby on Rails': SiRubyonrails,
  'Express.js': SiExpress,
  'Supabase': SiSupabase,
  'Firebase': SiFirebase,
  'MySQL': SiMysql,
  'MongoDB': SiMongodb,
  'Python': SiPython,
  // AWS — no SI icon in v5.6.0; text-only fallback
  'Ruby': SiRuby,
  'React Native': SiReact, // no dedicated RN icon in SI
  'OpenAI API': SiOpenai,
  // Gemini API — no SI icon; text-only fallback
  // LiteLLM — no SI icon; text-only fallback
  // Langfuse — no SI icon; text-only fallback
  // Prompt Engineering — no SI icon; text-only fallback
  'Git': SiGit,
  'GitHub': SiGithub,
  'Docker': SiDocker,
  'Cypress': SiCypress,
  // TDD — no SI icon; text-only fallback
  // Render — no SI icon; text-only fallback
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
      aria-labelledby="skills-heading"
      className="w-full max-w-6xl px-6 py-12"
    >
      {/* Section heading */}
      <div className="mb-12 flex flex-col items-center gap-3 text-center">
        <h2
          id="skills-heading"
          className="font-inter text-h2-u font-bold text-foreground"
        >
          Skills
        </h2>
        <UnderLine />
      </div>

      {/* Category card grid: 1 col mobile, 2 col tablet, 3 col desktop */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {skillsByCategory.map(({ category, skills }) => (
          <Card key={category} className="p-6">
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
                        className="size-8 rounded-sm bg-muted"
                        aria-hidden="true"
                      />
                    )}
                    <span className="text-center font-jetbrains text-code-m text-muted-foreground">
                      {skill.name}
                    </span>
                  </div>
                )
              })}
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}
