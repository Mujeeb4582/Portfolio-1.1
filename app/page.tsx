import AboutSection from '@/app/ui/homepage/aboutSection'
import { ContactSection } from '@/app/ui/homepage/contactSection'
import ExperienceSection from '@/app/ui/homepage/experienceSection'
import HeroSection from '@/app/ui/homepage/heroSection'
import ProjectsSection from '@/app/ui/homepage/projectsSection'
import SkillsSection from '@/app/ui/homepage/skillsSection'

export default function Home() {
  return (
    <main className="flex w-full flex-col items-center justify-center">
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection />
      <ContactSection />
    </main>
  )
}
