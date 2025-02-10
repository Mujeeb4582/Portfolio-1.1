import { LANGUAGE_ICONS, SKILLS } from '@/app/lib/constant'
import { LanguageIcons } from '@/app/ui/languageIcons'
import { SkillsCard } from '@/app/ui/skillsCard'
import { UnderLine } from '@/app/ui/underLine'

export default function SkillsSection() {
  return (
    <div className="relative flex flex-col space-y-4 pb-16 pt-8 text-center">
      <div
        className="absolute inset-0 bg-skills-bg bg-cover bg-center bg-no-repeat"
        style={{ opacity: 0.1 }}
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
        {SKILLS &&
          SKILLS.map((skill) => (
            <SkillsCard
              key={skill.name}
              name={skill.name}
              icon={skill.icon}
              language={skill.languages}
            />
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
