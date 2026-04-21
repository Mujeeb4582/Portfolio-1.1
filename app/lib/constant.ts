import { CSSIcon, HTMLIcon, JSIcon, ReactIcon } from '@/app/ui/svgs'
import type {
  AboutParagraph,
  Education,
  Experience,
  NavLink,
  PersonalInfo,
  Project,
  Skill,
} from '@/app/lib/types'

// ---------------------------------------------------------------------------
// Personal Info
// ---------------------------------------------------------------------------

export const PERSONAL_INFO: PersonalInfo = {
  name: 'Mujeeb ur Rahman',
  title: 'Full-Stack Web Developer',
  email: 'mujeeburahman4582@gmail.com',
  whatsApp: '+92-3479334219',
  github: 'https://github.com/Mujeeb4582',
  linkedIn: 'https://linkedin.com/in/mujeeb-ur-rahman',
  bio: 'Full-Stack Web Developer with 4+ years of experience building production-grade web and mobile applications. Specializing in React, Next.js, TypeScript, and React Native. Passionate about clean code, developer experience, and building products that solve real problems.',
  stats: {
    yearsExperience: 4,
    projectsCompleted: 6,
    technologiesUsed: 20,
  },
}

// ---------------------------------------------------------------------------
// About
// ---------------------------------------------------------------------------

export const ABOUT_PARAGRAPHS: AboutParagraph[] = [
  [
    { text: 'Back in 2020, I dove headfirst into web development and discovered a passion for turning complex problems into elegant, user-friendly interfaces. Fast-forward to today, and I’ve had the privilege of building software for a ' },
    { text: 'real estate analytics platform', highlight: true },
    { text: ', a ' },
    { text: 'government enterprise app', highlight: true },
    { text: ', and several ' },
    { text: 'startups', highlight: true },
    { text: '.' },
  ],
  [
    { text: 'My main focus these days is building accessible, pixel-perfect products at ' },
    { text: 'Wonder Crafts', highlight: true, href: 'https://wondercrafts.com' },
    { text: ', where I work on AI-powered tools that help real estate professionals make data-driven decisions. I enjoy building things that live at the intersection of design and engineering — products that look great and are built with solid, maintainable code.' },
  ],
  [
    { text: 'When I’m not at the computer, I’m usually exploring new technologies, contributing to open-source, or experimenting with ' },
    { text: 'LLM integrations', highlight: true },
    { text: ' and ' },
    { text: 'agentic AI workflows', highlight: true },
    { text: '.' },
  ],
]

// ---------------------------------------------------------------------------
// Projects
// ---------------------------------------------------------------------------

export const PROJECTS: Project[] = [
  {
    title: 'Buildable',
    description:
      'AI-powered real estate analytics platform for Dubai with a chat-first agentic interface. Features 40+ tools, automated report generation, and market analysis capabilities.',
    techStack: [
      'Next.js',
      'React',
      'TypeScript',
      'FastAPI',
      'Supabase',
      'PostgreSQL',
      'LiteLLM',
      'Langfuse',
      'Docker',
    ],
    screenshotPath: '/projects/buildable.webp',
    role: 'Full-Stack Web Developer',
    company: 'Wonder Crafts',
    type: 'web',
  },
  {
    title: 'MISA App',
    description:
      "Large-scale enterprise mobile application for Saudi Arabia's Ministry of Investment. Features industrial licensing workflows, secure authentication, and real-time chat.",
    techStack: ['React Native', 'TypeScript', 'Zustand', 'REST APIs'],
    screenshotPath: '/projects/misa.webp',
    role: 'React Native Developer',
    company: 'RGX Labs',
    type: 'mobile',
  },
  {
    title: 'Uber-like App',
    description:
      'Cross-platform ride-hailing mobile application with real-time maps, live location tracking, and dynamic route rendering for both drivers and passengers.',
    techStack: [
      'React Native',
      'TypeScript',
      'Redux',
      'Zustand',
      'Google Maps',
      'Firebase',
    ],
    screenshotPath: '/projects/uber-like.webp',
    role: 'React Native Developer',
    company: 'Techiosis',
    type: 'mobile',
  },
  {
    title: 'Re-View',
    description:
      'Full-stack platform for collecting and organizing user responses to custom questions. Built with a GraphQL API, Hasura, and PostgreSQL for flexible data querying.',
    techStack: [
      'Next.js',
      'TypeScript',
      'Ant Design',
      'Hasura CLI',
      'PostgreSQL',
      'GraphQL',
      'AWS',
    ],
    screenshotPath: '/projects/review.webp',
    role: 'Full-Stack Web Developer',
    company: 'Wonder Crafts',
    type: 'web',
  },
  {
    title: 'LSTN',
    description:
      'AI-powered transcription platform for the media industry. Enables automatic transcription, editing, and management of audio and video content.',
    techStack: [
      'React',
      'Redux',
      'TypeScript',
      'Material-TailwindCSS',
      'Firebase',
      'Node.js',
    ],
    screenshotPath: '/projects/lstn.webp',
    role: 'Full-Stack Web Developer',
    company: 'Wonder Crafts',
    type: 'web',
  },
  {
    title: 'WellShared',
    description:
      'Product promotion platform with a companion Chrome extension for easy product sharing and discovery. Connects users with wellness products and services.',
    techStack: [
      'React',
      'Redux',
      'TypeScript',
      'Material-TailwindCSS',
      'Firebase',
      'Node.js',
    ],
    screenshotPath: '/projects/wellshared.webp',
    role: 'Full-Stack Web Developer',
    company: 'Wonder Crafts',
    type: 'web',
  },
]

// ---------------------------------------------------------------------------
// Experience
// ---------------------------------------------------------------------------

export const EXPERIENCE: Experience[] = [
  {
    company: 'Wonder Crafts',
    role: 'Full-Stack Web Developer',
    dateRange: 'May 2023 – Present',
    location: 'Remote',
    responsibilities: [
      'Built and maintained Buildable, an AI-powered real estate analytics platform with agentic chat interface and 40+ tools',
      'Developed Re-View, LSTN, WellShared, and Routinish — four production applications across web and SaaS domains',
      'Implemented complex data pipelines integrating FastAPI, Supabase, PostgreSQL, and LLM APIs (LiteLLM, Langfuse)',
      'Led technical decisions on architecture, state management, and deployment for cross-functional projects',
    ],
    projects: [
      { title: 'Buildable' },
      { title: 'Re-View' },
      { title: 'LSTN' },
      { title: 'WellShared' },
    ],
  },
  {
    company: 'Techiosis',
    role: 'React Native Developer',
    dateRange: 'May 2025 – Dec 2025',
    location: 'Remote',
    responsibilities: [
      'Built a cross-platform ride-hailing mobile app with real-time maps, live location tracking, and route rendering',
      'Integrated Google Maps SDK for dynamic route visualization and live driver/passenger tracking',
      'Managed complex real-time state with Redux and Zustand for concurrent user updates',
    ],
    projects: [{ title: 'Uber-like App' }],
  },
  {
    company: 'RGX Labs',
    role: 'React Native Developer',
    dateRange: 'Nov 2024 – Apr 2025',
    location: 'Remote',
    responsibilities: [
      "Developed the MISA App — a large-scale enterprise mobile application for Saudi Arabia's Ministry of Investment",
      'Implemented industrial licensing workflows, secure authentication flows, and real-time communication features',
      'Collaborated with cross-functional teams to deliver a complex, multi-module application with strict security requirements',
    ],
    projects: [{ title: 'MISA App' }],
  },
  {
    company: 'Microverse',
    role: 'Mentor (Volunteer)',
    dateRange: 'Nov 2022 – May 2023',
    location: 'Remote',
    responsibilities: [
      'Mentored junior developers in the Microverse remote Full-Stack Web Development Program',
      'Conducted weekly code reviews focused on JavaScript, React, Ruby on Rails, and software design principles',
      'Provided career guidance and technical interview preparation for program graduates',
    ],
    projects: [],
  },
]

// ---------------------------------------------------------------------------
// Education
// ---------------------------------------------------------------------------

export const EDUCATION: Education[] = [
  {
    institution: 'Microverse',
    degree: 'Remote Full-Stack Web Development Program',
    location: 'San Francisco, CA (Remote)',
  },
  {
    institution: 'NUCES-FAST',
    degree: 'Bachelor of Engineering, Electrical Engineering',
    location: 'Pakistan',
    note: "Dean's List",
  },
]

// ---------------------------------------------------------------------------
// Skills
// ---------------------------------------------------------------------------

export const SKILLS: Skill[] = [
  // Frontend — core
  { name: 'React', category: 'Frontend', proficiency: 'core' },
  { name: 'Next.js', category: 'Frontend', proficiency: 'core' },
  { name: 'TypeScript', category: 'Frontend', proficiency: 'core' },
  { name: 'JavaScript', category: 'Frontend', proficiency: 'core' },
  { name: 'HTML5', category: 'Frontend', proficiency: 'core' },
  { name: 'CSS3', category: 'Frontend', proficiency: 'core' },
  { name: 'TailwindCSS', category: 'Frontend', proficiency: 'core' },
  // Frontend — proficient
  { name: 'Redux', category: 'Frontend', proficiency: 'proficient' },
  { name: 'Bootstrap', category: 'Frontend', proficiency: 'proficient' },
  { name: 'shadcn/ui', category: 'Frontend', proficiency: 'proficient' },
  { name: 'Ant Design', category: 'Frontend', proficiency: 'proficient' },
  // Backend — core
  { name: 'Node.js', category: 'Backend', proficiency: 'core' },
  { name: 'PostgreSQL', category: 'Backend', proficiency: 'core' },
  // Backend — proficient
  { name: 'Ruby on Rails', category: 'Backend', proficiency: 'proficient' },
  { name: 'Express.js', category: 'Backend', proficiency: 'proficient' },
  { name: 'Supabase', category: 'Backend', proficiency: 'proficient' },
  { name: 'Firebase', category: 'Backend', proficiency: 'proficient' },
  { name: 'MySQL', category: 'Backend', proficiency: 'proficient' },
  // Backend — familiar
  { name: 'MongoDB', category: 'Backend', proficiency: 'familiar' },
  { name: 'Python', category: 'Backend', proficiency: 'familiar' },
  { name: 'AWS', category: 'Backend', proficiency: 'familiar' },
  { name: 'Ruby', category: 'Backend', proficiency: 'familiar' },
  // Mobile — core
  { name: 'React Native', category: 'Mobile', proficiency: 'core' },
  // LLM/AI — proficient
  { name: 'OpenAI API', category: 'LLM/AI', proficiency: 'proficient' },
  { name: 'Gemini API', category: 'LLM/AI', proficiency: 'proficient' },
  { name: 'LiteLLM', category: 'LLM/AI', proficiency: 'proficient' },
  { name: 'Langfuse', category: 'LLM/AI', proficiency: 'proficient' },
  {
    name: 'Prompt Engineering',
    category: 'LLM/AI',
    proficiency: 'proficient',
  },
  // Tools — core
  { name: 'Git', category: 'Tools', proficiency: 'core' },
  { name: 'GitHub', category: 'Tools', proficiency: 'core' },
  // Tools — proficient
  { name: 'Docker', category: 'Tools', proficiency: 'proficient' },
  { name: 'Cypress', category: 'Tools', proficiency: 'proficient' },
  { name: 'TDD', category: 'Tools', proficiency: 'proficient' },
  // Tools — familiar
  { name: 'Render', category: 'Tools', proficiency: 'familiar' },
  { name: 'Netlify', category: 'Tools', proficiency: 'familiar' },
]

// ---------------------------------------------------------------------------
// Navigation Links
// ---------------------------------------------------------------------------

export const NAV_LINKS: NavLink[] = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
]

// ---------------------------------------------------------------------------
// Language Icons — kept for backward compatibility with skillsCard and languageIcons components
// ---------------------------------------------------------------------------

export const LANGUAGE_ICONS = [
  { name: 'HTML', color: '#E54F26', icon: HTMLIcon },
  { name: 'CSS', color: '#0C73B9', icon: CSSIcon },
  { name: 'JS', color: '#E7A020', icon: JSIcon },
  { name: 'React', color: '#28A9E0', icon: ReactIcon },
]
