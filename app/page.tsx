import AboutSection from '@/app/ui/homepage/aboutSection'
import ExperienceSection from '@/app/ui/homepage/experienceSection'
import ProjectsSection from '@/app/ui/homepage/projectsSection'
import SiteFooter from '@/app/ui/homepage/siteFooter'
import SkillsSection from '@/app/ui/homepage/skillsSection'
import SidebarNav from '@/app/ui/sidebar-nav'

export default function Home() {
  return (
    <div className="mx-auto min-h-screen max-w-7xl px-6 md:px-12 lg:px-24">
      <div className="lg:flex lg:justify-between lg:gap-4">
        {/* Left: sticky sidebar with name, title, bio, nav, socials */}
        <SidebarNav />

        {/* Right: scrollable content */}
        <main id="content" className="pt-24 lg:w-1/2 lg:py-24">
          <AboutSection />
          <SkillsSection />
          <ExperienceSection />
          <ProjectsSection />
          <SiteFooter />
        </main>
      </div>
    </div>
  )
}
