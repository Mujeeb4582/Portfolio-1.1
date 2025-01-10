import AboutSection from '@/app/ui/homepage/aboutSection'
import HeroSection from '@/app/ui/homepage/heroSection'

export default function Home() {
  console.log('homepage')
  return (
    <main className="flex w-full flex-col items-center justify-center">
      <HeroSection />
      <AboutSection />
    </main>
  )
}
