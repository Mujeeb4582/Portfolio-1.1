// app/lib/types.ts
// TypeScript interfaces for all portfolio data structures.
// This is the single source of truth for data shapes.
// All content constants in constant.ts must satisfy these interfaces.

export type SkillCategory = 'Frontend' | 'Backend' | 'Mobile' | 'LLM/AI' | 'Tools'
export type SkillProficiency = 'core' | 'proficient' | 'familiar'
export type ProjectType = 'web' | 'mobile'

export interface ProjectReference {
  title: string
  description?: string
}

export interface Project {
  title: string
  description: string
  techStack: string[]
  screenshotPath: string
  role: string
  company: string
  type: ProjectType
  liveUrl?: string
  githubUrl?: string
  caseStudyUrl?: string
}

export interface Experience {
  company: string
  role: string
  dateRange: string
  location: 'Remote'
  responsibilities: string[]
  projects: ProjectReference[]
}

export interface Education {
  institution: string
  degree: string
  location: string
  note?: string
}

export interface Skill {
  name: string
  category: SkillCategory
  proficiency: SkillProficiency
  icon?: string
}

export interface PersonalStats {
  yearsExperience: number
  projectsCompleted: number
  technologiesUsed: number
}

export interface PersonalInfo {
  name: string
  title: string
  email: string
  whatsApp: string
  github: string
  linkedIn: string
  bio: string
  stats: PersonalStats
}

export interface NavLink {
  label: string
  href: string
}

export interface AboutSegment {
  text: string
  highlight?: boolean
  href?: string
}

export type AboutParagraph = AboutSegment[]
