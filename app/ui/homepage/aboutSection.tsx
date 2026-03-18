// aboutSection.tsx — rebuilt for Phase 2
// Layout: Two-column on desktop (bio left / stats right), stacked on mobile
// No photo — hero already shows the portrait
import { PERSONAL_INFO } from '@/app/lib/constant'
import { Card } from '@/app/ui/card'
import { UnderLine } from '@/app/ui/underLine'

const STATS = [
  {
    value: PERSONAL_INFO.stats.yearsExperience,
    label: 'Years Experience',
  },
  {
    value: PERSONAL_INFO.stats.projectsCompleted,
    label: 'Projects Completed',
  },
  {
    value: PERSONAL_INFO.stats.technologiesUsed,
    label: 'Technologies',
  },
] as const

export default function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="w-full max-w-6xl px-6 py-12"
    >
      {/* Section heading */}
      <div className="mb-12 flex flex-col items-center gap-3 text-center">
        <h2
          id="about-heading"
          className="font-inter text-h2-u font-bold text-foreground"
        >
          About Me
        </h2>
        <UnderLine />
      </div>

      {/* Content: bio left, stats right on desktop */}
      <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-16">
        {/* Bio */}
        <div className="lg:flex-[3]">
          <p className="font-jetbrains text-para-m leading-relaxed text-foreground">
            {PERSONAL_INFO.bio}
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-3 gap-4 lg:flex-[2]">
          {STATS.map(({ value, label }) => (
            <Card
              key={label}
              className="flex flex-col items-center border border-brand1/30 bg-card p-4"
            >
              <span className="font-jetbrains text-number-m font-bold text-brand1">
                {value}+
              </span>
              <span className="mt-1 text-center font-inter text-label-u-m text-muted-foreground">
                {label}
              </span>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
