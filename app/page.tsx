import AboutSection from '@/app/ui/homepage/aboutSection'
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
      {/* Contact placeholder — Phase 5 will replace this with the full ContactSection */}
      <section id="contact" aria-label="Contact" className="w-full py-12" />
    </main>
  )
}
