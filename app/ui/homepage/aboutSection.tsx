import { ABOUT_PARAGRAPHS } from '@/app/lib/constant'
import type { AboutSegment } from '@/app/lib/types'
import { AnimateIn } from '@/app/ui/animate-in'

const HIGHLIGHT_CLASS = 'text-foreground font-medium'
const LINK_CLASS = `${HIGHLIGHT_CLASS} hover:text-brand1 transition-colors`

function Segment({ segment }: { segment: AboutSegment }) {
  if (segment.href) {
    return (
      <a
        href={segment.href}
        target="_blank"
        rel="noopener noreferrer"
        className={LINK_CLASS}
      >
        {segment.text}
      </a>
    )
  }
  if (segment.highlight) {
    return <span className={HIGHLIGHT_CLASS}>{segment.text}</span>
  }
  return <>{segment.text}</>
}

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
          {ABOUT_PARAGRAPHS.map((paragraph, i) => (
            <p key={i} className="text-base leading-relaxed text-muted-foreground">
              {paragraph.map((segment, j) => (
                <Segment key={j} segment={segment} />
              ))}
            </p>
          ))}
        </div>
      </AnimateIn>
    </section>
  )
}
