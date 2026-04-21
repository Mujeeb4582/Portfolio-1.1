import { PERSONAL_INFO } from '@/app/lib/constant'

export default function SiteFooter() {
  return (
    <footer
      aria-label="Site credits"
      className="pb-16 text-sm text-muted-foreground"
    >
      <p className="leading-relaxed">
        Loosely designed in{' '}
        <a
          href="https://www.figma.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-foreground underline decoration-muted-foreground/40 underline-offset-2 transition-colors hover:text-brand1 hover:decoration-brand1"
        >
          Figma
        </a>{' '}
        and coded in{' '}
        <a
          href="https://code.visualstudio.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-foreground underline decoration-muted-foreground/40 underline-offset-2 transition-colors hover:text-brand1 hover:decoration-brand1"
        >
          Visual Studio Code
        </a>{' '}
        by {PERSONAL_INFO.name}. Built with{' '}
        <a
          href="https://nextjs.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-foreground underline decoration-muted-foreground/40 underline-offset-2 transition-colors hover:text-brand1 hover:decoration-brand1"
        >
          Next.js
        </a>{' '}
        and{' '}
        <a
          href="https://tailwindcss.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-foreground underline decoration-muted-foreground/40 underline-offset-2 transition-colors hover:text-brand1 hover:decoration-brand1"
        >
          Tailwind CSS
        </a>
        , deployed on{' '}
        <a
          href="https://vercel.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-foreground underline decoration-muted-foreground/40 underline-offset-2 transition-colors hover:text-brand1 hover:decoration-brand1"
        >
          Vercel
        </a>
        . All text is set in the Inter and JetBrains&nbsp;Mono typefaces.
      </p>
    </footer>
  )
}
