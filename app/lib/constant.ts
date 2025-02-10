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

export const WORK = [
  {
    name: 'Project 1',
    languages: [
      { name: 'HTML' },
      { name: 'CSS' },
      { name: 'JS' },
      { name: 'React' },
    ],
    icon: Monitor,
    description: 'This is a project description',
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVukrmVSypMEscsW83Ab4Yax36AgUSov1pPw&s',
  },
  {
    name: 'Project 2',
    languages: [{ name: 'React Native' }, { name: 'Flutter' }],
    icon: Smartphone,
    description: 'This is a project description',
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVukrmVSypMEscsW83Ab4Yax36AgUSov1pPw&s',
  },
  {
    name: 'Project 3',
    languages: [{ name: 'HTML' }, { name: 'CSS' }, { name: 'React' }],
    icon: Monitor,
    description: 'This is a new project description',
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVukrmVSypMEscsW83Ab4Yax36AgUSov1pPw&s',
  },
  {
    name: 'Project 4',
    languages: [{ name: 'Node.js' }, { name: 'Express' }, { name: 'MongoDB' }],
    icon: Monitor,
    description: 'This project involves backend development',
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVukrmVSypMEscsW83Ab4Yax36AgUSov1pPw&s',
  },
]
