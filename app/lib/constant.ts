import { CSSIcon, HTMLIcon, JSIcon, ReactIcon } from '@/app/ui/svgs'
import { Monitor, Smartphone } from 'lucide-react'

export const LANGUAGE_ICONS = [
  { name: 'HTML', color: '#E54F26', icon: HTMLIcon },
  { name: 'CSS', color: '#0C73B9', icon: CSSIcon },
  { name: 'JS', color: '#E7A020', icon: JSIcon },
  { name: 'React', color: '#28A9E0', icon: ReactIcon },
]

export const SKILLS = [
  {
    name: 'Web Development',
    languages: [
      { name: 'HTML' },
      { name: 'CSS' },
      { name: 'JS' },
      { name: 'React' },
    ],
    icon: Monitor,
  },
  {
    name: 'App Development',
    languages: [{ name: 'React Native' }, { name: 'Flutter' }],
    icon: Smartphone,
  },
]
