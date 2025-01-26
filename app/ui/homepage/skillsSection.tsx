import { Monitor, Smartphone } from 'lucide-react'
import { LanguageIcons } from '../languageIcons'
import { SkillsCard } from '../skillsCard'
import { CSSIcon, HTMLIcon, JSIcon, ReactIcon } from '../svgs'
import { UnderLine } from '../underLine'

export default function SkillsSection() {
  const languageIcons = [
    { name: 'HTML', color: '#E54F26', icon: HTMLIcon },
    { name: 'CSS', color: '#0C73B9', icon: CSSIcon },
    { name: 'JS', color: '#E7A020', icon: JSIcon },
    { name: 'React', color: '#28A9E0', icon: ReactIcon },
  ]

  const skills = [
    {
      name: 'Web Development',
      languages: [
        { name: 'HTML' },
        { name: 'CSS' },
        { name: 'JS' },
        { name: 'React' },
      ],
      icon: <Monitor />,
    },
    {
      name: 'App Development',
      languages: [{ name: 'React Native' }, { name: 'Flutter' }],
      icon: <Smartphone />,
    },
  ]

  return (
    <div className="relative flex flex-col space-y-4 pb-16 pt-8 text-center">
      <div
        className="bg-skills-bg absolute inset-0 bg-cover bg-center bg-no-repeat"
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
        {skills &&
          skills.map((skill) => (
            <SkillsCard
              key={skill.name}
              name={skill.name}
              icon={skill.icon}
              language={skill.languages}
            />
          ))}
      </div>
      <div className="grid grid-cols-2 justify-center gap-4 pt-20">
        {languageIcons &&
          languageIcons.map((item) => (
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
