import AboutSection from '@/app/ui/homepage/aboutSection'
import HeroSection from '@/app/ui/homepage/heroSection'
import SkillsSection from '@/app/ui/homepage/skillsSection'
import WorkSection from '@/app/ui/homepage/workSection'

export default function Home() {
  return (
    <main className="flex w-full flex-col items-center justify-center">
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <WorkSection />
    </main>
  )
}
