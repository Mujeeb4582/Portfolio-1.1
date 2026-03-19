// experienceSection.tsx — Phase 2 Plan 05
// Vertical timeline: work experience entries + education subsection
import { EDUCATION, EXPERIENCE } from '@/app/lib/constant'
import { AnimateIn, StaggerChildren, StaggerItem } from '@/app/ui/animate-in'
import { Card } from '@/app/ui/card'
import { UnderLine } from '@/app/ui/underLine'

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="w-full max-w-6xl px-6 py-12"
    >
      {/* Section heading */}
      <AnimateIn>
        <div className="mb-12 flex flex-col items-center gap-3 text-center">
          <h2
            id="experience-heading"
            className="font-inter text-h2-u font-bold text-foreground"
          >
            Experience
          </h2>
          <UnderLine />
        </div>
      </AnimateIn>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical connecting line */}
        <div
          className="absolute left-4 top-0 h-full w-0.5 bg-brand1/30"
          aria-hidden="true"
        />

        {/* Work experience entries */}
        <StaggerChildren>
          {EXPERIENCE.map((entry) => (
            <StaggerItem key={entry.company}>
              <div className="relative mb-8 pl-12">
                {/* Circle dot for work entries */}
                <div
                  className="absolute left-2.5 top-3 size-3.5 rounded-full border-2 border-brand1 bg-background"
                  aria-hidden="true"
                />

                <Card className="p-6 transition-colors duration-150 hover:bg-card/80">
                  <h3 className="font-inter text-xl font-bold text-foreground">
                    {entry.role}
                  </h3>
                  <p className="mt-1 font-jetbrains text-code-m text-muted-foreground">
                    <span>{entry.company}</span>
                    <span aria-hidden="true"> &bull; </span>
                    <span>{entry.dateRange}</span>
                  </p>
                  {entry.responsibilities.length > 0 && (
                    <ul className="mt-3 list-disc pl-4 font-jetbrains text-para-m text-foreground">
                      {entry.responsibilities.map((resp) => (
                        <li key={resp} className="mb-1">
                          {resp}
                        </li>
                      ))}
                    </ul>
                  )}
                </Card>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>

        {/* Education separator */}
        <AnimateIn delay={0.1}>
          <div className="relative mb-8 pl-12">
            <div className="flex items-center gap-4">
              <span className="font-inter text-sm font-bold uppercase tracking-widest text-muted-foreground">
                Education
              </span>
              <div className="h-px flex-1 bg-border" />
            </div>
          </div>
        </AnimateIn>

        {/* Education entries */}
        <StaggerChildren>
          {EDUCATION.map((edu) => (
            <StaggerItem key={edu.institution}>
              <div className="relative mb-8 pl-12">
                {/* Square dot for education entries — visually distinct from work */}
                <div
                  className="absolute left-2.5 top-3 size-3.5 rounded-sm border-2 border-brand2 bg-background"
                  aria-hidden="true"
                />

                <Card className="p-6 transition-colors duration-150 hover:bg-card/80">
                  <h3 className="font-inter text-xl font-bold text-foreground">
                    {edu.institution}
                  </h3>
                  <p className="mt-1 font-jetbrains text-code-m text-muted-foreground">
                    {edu.degree}
                  </p>
                  <p className="font-jetbrains text-code-m text-muted-foreground">
                    {edu.location}
                    {edu.note ? ` \u2022 ${edu.note}` : ''}
                  </p>
                </Card>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  )
}
