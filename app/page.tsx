import AboutSection from '@/app/ui/homepage/aboutSection'
import HeroSection from '@/app/ui/homepage/heroSection'
import SkillsSection from '@/app/ui/homepage/skillsSection'

export default function Home() {
  return (
    <main className="flex w-full flex-col items-center justify-center">
      <HeroSection />
      <AboutSection />
      <SkillsSection />
    </main>
  )
}
