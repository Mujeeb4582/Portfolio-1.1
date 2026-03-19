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

      {/* Experience entries — hover reveals card */}
      <StaggerChildren className="group/list">
        {EXPERIENCE.map((entry) => (
          <StaggerItem key={entry.company}>
            <AnimateIn>
              <div className="group relative mb-4 rounded-lg p-4 transition-all lg:hover:bg-card/50 lg:hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:hover:drop-shadow-lg lg:group-hover/list:opacity-50 lg:hover:!opacity-100">
                <div className="grid sm:grid-cols-8 sm:gap-8 md:gap-4">
                  <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground sm:col-span-2">
                    {entry.dateRange}
                  </header>
                  <div className="z-10 sm:col-span-6">
                    <h3 className="font-medium leading-snug text-foreground group-hover:text-brand1 transition-colors">
                      <span>{entry.role}</span>
                      <span className="text-brand1"> · </span>
                      <span className="text-brand1">{entry.company}</span>
                    </h3>
                    {entry.responsibilities.length > 0 && (
                      <ul className="mt-2 space-y-1">
                        {entry.responsibilities.map((resp) => (
                          <li key={resp} className="text-sm leading-normal text-muted-foreground">
                            {resp}
                          </li>
                        ))}
                      </ul>
                    )}
                    {/* Tech tags if projects exist */}
                    {entry.projects && entry.projects.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {entry.projects.map((proj) => (
                          <span
                            key={proj.title}
                            className="rounded-full bg-brand1/10 px-2.5 py-1 font-jetbrains text-xs font-medium text-brand1"
                          >
                            {proj.title}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </AnimateIn>
          </StaggerItem>
        ))}
      </StaggerChildren>

      {/* Education */}
      <div className="mt-8 border-t border-border pt-8">
        <h3 className="mb-6 text-sm font-bold uppercase tracking-widest text-muted-foreground">Education</h3>
        <StaggerChildren className="group/list">
          {EDUCATION.map((edu) => (
            <StaggerItem key={edu.institution}>
              <AnimateIn>
                <div className="group relative mb-4 rounded-lg p-4 transition-all lg:hover:bg-card/50 lg:hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:hover:drop-shadow-lg lg:group-hover/list:opacity-50 lg:hover:!opacity-100">
                  <div className="grid sm:grid-cols-8 sm:gap-8 md:gap-4">
                    <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground sm:col-span-2">
                      {edu.location}
                    </header>
                    <div className="z-10 sm:col-span-6">
                      <h4 className="font-medium leading-snug text-foreground group-hover:text-brand1 transition-colors">{edu.institution}</h4>
                      <p className="mt-1 text-sm text-muted-foreground">{edu.degree}</p>
                      {edu.note && <p className="text-sm text-muted-foreground">{edu.note}</p>}
                    </div>
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
            className="group inline-flex items-center font-medium leading-tight text-foreground hover:text-brand1 transition-colors"
          >
            View Full Résumé
            <span className="ml-1 inline-block transition-transform group-hover:translate-x-1">→</span>
          </a>
        </div>
      </AnimateIn>
    </section>
  )
}
