import { LucideProps } from 'lucide-react'
import React, { ForwardRefExoticComponent, RefAttributes } from 'react'

interface SkillsCardProps {
  name: string
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  >
  language?: {
    name: string
  }[]
  langClassName?: string
}

export const SkillsCard: React.FC<SkillsCardProps> = ({
  name,
  icon,
  language,
  langClassName,
}) => {
  return (
    <div className="flex h-[8.25rem] w-72 flex-col items-center space-y-2 rounded-lg bg-brand2 px-6 py-4 text-bg1">
      <div>{React.createElement(icon)}</div>
      <div className="font-ibmPlexMono text-menu-m">{name}</div>
      <div>
        {language &&
          language.map((lang) => (
            <span
              key={lang.name}
              className={`font-ibmPlexMono text-para-m text-grey ${langClassName}`}
            >
              {lang.name}
              {lang !== language[language.length - 1] && '-'}
            </span>
          ))}
      </div>
    </div>
  )
}
