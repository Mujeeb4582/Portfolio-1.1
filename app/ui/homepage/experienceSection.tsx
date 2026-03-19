import { EDUCATION, EXPERIENCE } from '@/app/lib/constant'
import { AnimateIn, StaggerChildren, StaggerItem } from '@/app/ui/animate-in'

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      aria-label="Work experience"
      className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
    >
      {/* Sticky heading — mobile only */}
      <div className="sticky top-0 z-20 -mx-6 mb-4 bg-background/75 px-6 py-5 backdrop-blur-sm lg:sr-only">
        <h2 className="font-inter text-sm font-bold uppercase tracking-widest text-foreground">Experience</h2>
      </div>

      {/* Experience entries — Brittany Chiang style: date left, content right */}
      <StaggerChildren>
        {EXPERIENCE.map((entry) => (
          <StaggerItem key={entry.company}>
            <AnimateIn>
              <div className="group relative mb-2 grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4">
                <header className="z-10 mb-2 mt-1 font-jetbrains text-xs font-semibold uppercase tracking-wide text-muted-foreground sm:col-span-2">
                  {entry.dateRange}
                </header>
                <div className="z-10 sm:col-span-6">
                  <h3 className="font-inter font-medium leading-snug text-foreground">
                    <span>{entry.role}</span>
                    <span className="text-brand1"> · </span>
                    <span className="inline-block font-medium text-brand1">{entry.company}</span>
                  </h3>
                  {entry.responsibilities.length > 0 && (
                    <ul className="mt-2 space-y-1">
                      {entry.responsibilities.map((resp) => (
                        <li key={resp} className="font-jetbrains text-sm leading-normal text-muted-foreground">
                          {resp}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </AnimateIn>
          </StaggerItem>
        ))}
      </StaggerChildren>

      {/* Education */}
      <div className="mt-8 border-t border-border pt-8">
        <h3 className="mb-6 font-inter text-sm font-bold uppercase tracking-widest text-muted-foreground">Education</h3>
        <StaggerChildren>
          {EDUCATION.map((edu) => (
            <StaggerItem key={edu.institution}>
              <AnimateIn>
                <div className="group relative mb-2 grid pb-1 sm:grid-cols-8 sm:gap-8 md:gap-4">
                  <header className="z-10 mb-2 mt-1 font-jetbrains text-xs font-semibold uppercase tracking-wide text-muted-foreground sm:col-span-2">
                    {edu.location}
                  </header>
                  <div className="z-10 sm:col-span-6">
                    <h4 className="font-inter font-medium leading-snug text-foreground">{edu.institution}</h4>
                    <p className="mt-1 font-jetbrains text-sm text-muted-foreground">{edu.degree}</p>
                    {edu.note && <p className="font-jetbrains text-sm text-muted-foreground">{edu.note}</p>}
                  </div>
                </div>
              </AnimateIn>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>

      {/* Resume link */}
      <AnimateIn delay={0.1}>
        <div className="mt-12">
          <a
            href="/mujeeb-resume.pdf"
            download="Mujeeb-ur-Rahman-CV.pdf"
            className="group inline-flex items-center font-inter font-medium leading-tight text-foreground"
          >
            View Full Résumé
            <span className="ml-1 inline-block transition-transform group-hover:translate-x-1">→</span>
          </a>
        </div>
      </AnimateIn>
    </section>
  )
}
