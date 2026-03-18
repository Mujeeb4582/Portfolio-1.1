import { LANGUAGE_ICONS, SKILLS } from '@/app/lib/constant'
import type { SkillCategory } from '@/app/lib/types'
import { LanguageIcons } from '@/app/ui/languageIcons'
import { UnderLine } from '@/app/ui/underLine'

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
    <div className="relative flex flex-col space-y-4 pb-16 pt-8 text-center">
      <div
        className="absolute inset-0 bg-skills-bg bg-cover bg-center bg-no-repeat opacity-10"
        aria-hidden="true"
      ></div>
      <div className="flex flex-col items-center space-y-4">
        <div className="flex w-[8.875rem] flex-col items-center">
          <h3 className="text-center font-ubuntu text-h1-u text-brand1">
            Skills
          </h3>
          <UnderLine />
        </div>
        <p className="w-[21.375rem] font-ibmPlexMono text-para-m">
          I am striving to never stop learning and improving
        </p>
      </div>
      <div className="flex flex-col items-center space-y-8">
        {skillsByCategory.map((group) => (
          <div key={group.category} className="flex h-auto w-72 flex-col items-center space-y-2 rounded-lg bg-brand2 px-6 py-4 text-bg1">
            <div className="font-ibmPlexMono text-menu-m">{group.category}</div>
            <div className="flex flex-wrap justify-center gap-1">
              {group.skills.map((skill) => (
                <span key={skill.name} className="font-ibmPlexMono text-para-m text-grey">
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 justify-center gap-4 pt-20">
        {LANGUAGE_ICONS &&
          LANGUAGE_ICONS.map((item) => (
            <LanguageIcons
              key={item.name}
              icon={item.icon}
              iconName={item.name}
              iconColor={item.color}
            />
          ))}
      </div>
    </div>
  )
}
