import { AnimateIn } from '@/app/ui/animate-in'

export default function AboutSection() {
  return (
    <section
      id="about"
      aria-label="About me"
      className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
    >
      {/* Sticky heading — mobile only */}
      <div className="sticky top-0 z-20 -mx-6 mb-4 bg-background/75 px-6 py-5 backdrop-blur-sm lg:sr-only">
        <h2 className="text-sm font-bold uppercase tracking-widest text-foreground">About</h2>
      </div>

      <AnimateIn>
        <div className="space-y-4">
          <p className="text-base leading-relaxed text-muted-foreground">
            Back in 2020, I dove headfirst into web development and discovered a passion for
            turning complex problems into elegant, user-friendly interfaces. Fast-forward to today,
            and I&apos;ve had the privilege of building software for a{' '}
            <span className="text-foreground font-medium">real estate analytics platform</span>, a{' '}
            <span className="text-foreground font-medium">government enterprise app</span>, and several{' '}
            <span className="text-foreground font-medium">startups</span>.
          </p>

          <p className="text-base leading-relaxed text-muted-foreground">
            My main focus these days is building accessible, pixel-perfect products at{' '}
            <a href="https://wondercrafts.com" target="_blank" rel="noopener noreferrer" className="text-foreground font-medium hover:text-brand1 transition-colors">
              Wonder Crafts
            </a>
            , where I work on AI-powered tools that help real estate professionals make data-driven
            decisions. I enjoy building things that live at the intersection of design and engineering —
            products that look great and are built with solid, maintainable code.
          </p>

          <p className="text-base leading-relaxed text-muted-foreground">
            When I&apos;m not at the computer, I&apos;m usually exploring new technologies,
            contributing to open-source, or experimenting with{' '}
            <span className="text-foreground font-medium">LLM integrations</span> and{' '}
            <span className="text-foreground font-medium">agentic AI workflows</span>.
          </p>
        </div>
      </AnimateIn>
    </section>
  )
}
