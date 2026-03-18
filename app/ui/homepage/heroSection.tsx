// heroSection.tsx — rebuilt for Phase 2 split layout design
// Profile photo: /profile.jpg (placeholder until real photo provided — copy of aboutImage.png)
import { PERSONAL_INFO } from '@/app/lib/constant'
import { Button } from '@/app/ui/button'
import { Download, Github, Linkedin, Mail, MessageCircle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const SOCIAL_LINKS = [
  {
    icon: Github,
    href: PERSONAL_INFO.github,
    label: 'GitHub profile',
    external: true,
  },
  {
    icon: Linkedin,
    href: PERSONAL_INFO.linkedIn,
    label: 'LinkedIn profile',
    external: true,
  },
  {
    icon: Mail,
    href: `mailto:${PERSONAL_INFO.email}`,
    label: 'Send email',
    external: false,
  },
  {
    icon: MessageCircle,
    href: `https://wa.me/${PERSONAL_INFO.whatsApp.replace(/\D/g, '')}`,
    label: 'Contact on WhatsApp',
    external: true,
  },
] as const

export default function HeroSection() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-name"
      className="flex min-h-screen w-full max-w-6xl flex-col items-center gap-12 px-6 py-20 md:flex-row md:items-center md:justify-between"
    >
      {/* Left: text content */}
      <div className="flex flex-col gap-6">
        <p className="font-jetbrains text-code-m text-brand1">Hi, my name is</p>

        <div>
          <h1
            id="hero-name"
            className="font-inter text-h2-u font-bold text-foreground"
          >
            {PERSONAL_INFO.name}
          </h1>
          <h2 className="font-inter text-h2-u font-bold text-muted-foreground">
            {PERSONAL_INFO.title}
          </h2>
        </div>

        <p className="max-w-md font-jetbrains text-para-m text-muted-foreground">
          {PERSONAL_INFO.bio}
        </p>

        {/* CTA row */}
        <div className="flex flex-wrap gap-4">
          <Button
            asChild
            className="bg-brand1 font-inter text-button-u font-bold text-black hover:bg-brand1/90"
          >
            <Link href="#contact">Contact Me</Link>
          </Button>

          <Button
            variant="outline"
            asChild
            className="font-inter text-button-u font-bold"
          >
            <a href="/mujeeb-resume.pdf" download="Mujeeb-ur-Rahman-CV.pdf">
              <Download className="mr-2 size-4" />
              Download CV
            </a>
          </Button>
        </div>

        {/* Social links row */}
        <div className="flex gap-2">
          {SOCIAL_LINKS.map(({ icon: Icon, href, label, external }) => (
            <Link
              key={label}
              href={href}
              aria-label={label}
              {...(external
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : {})}
              className="p-2.5 text-muted-foreground transition-colors duration-200 hover:text-brand1"
            >
              <Icon className="size-5" aria-hidden="true" />
            </Link>
          ))}
        </div>
      </div>

      {/* Right: professional photo */}
      <div className="relative shrink-0 overflow-hidden rounded-2xl border-2 border-brand1 shadow-[0_0_24px_rgba(18,247,214,0.25)]">
        <Image
          src="/profile.jpg"
          alt="Mujeeb ur Rahman — Full-Stack Web Developer"
          width={380}
          height={460}
          className="object-cover"
          priority
        />
      </div>
    </section>
  )
}
