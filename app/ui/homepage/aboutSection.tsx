import { PERSONAL_INFO } from '@/app/lib/constant'
import { AnimateIn } from '@/app/ui/animate-in'

const STATS = [
  { value: PERSONAL_INFO.stats.yearsExperience, label: 'Years Experience' },
  { value: PERSONAL_INFO.stats.projectsCompleted, label: 'Projects Completed' },
  { value: PERSONAL_INFO.stats.technologiesUsed, label: 'Technologies' },
] as const

export default function AboutSection() {
  return (
    <section
      id="about"
      aria-label="About me"
      className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
    >
      {/* Sticky heading — mobile only */}
      <div className="sticky top-0 z-20 -mx-6 mb-4 bg-background/75 px-6 py-5 backdrop-blur-sm lg:sr-only">
        <h2 className="font-inter text-sm font-bold uppercase tracking-widest text-foreground">About</h2>
      </div>

      <AnimateIn>
        <div className="space-y-4">
          <p className="font-jetbrains text-para-m leading-relaxed text-muted-foreground">
            {PERSONAL_INFO.bio}
          </p>
        </div>
      </AnimateIn>

      {/* Stats */}
      <AnimateIn delay={0.1}>
        <div className="mt-8 grid grid-cols-3 gap-4">
          {STATS.map(({ value, label }) => (
            <div key={label} className="text-center">
              <span className="font-jetbrains text-2xl font-bold text-brand1">{value}+</span>
              <p className="mt-1 font-inter text-xs text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>
      </AnimateIn>
    </section>
  )
}
