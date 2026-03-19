'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Github, ExternalLink } from 'lucide-react'
import { PROJECTS } from '@/app/lib/constant'
import type { Project } from '@/app/lib/types'
import { Card } from '@/app/ui/card'
import { Button } from '@/app/ui/button'
import { UnderLine } from '@/app/ui/underLine'
import { cn } from '@/app/lib/utils'

// ---------------------------------------------------------------------------
// ScreenshotPlaceholder — shown when image fails to load (onError swap)
// ---------------------------------------------------------------------------

function ScreenshotPlaceholder({ title }: { title: string }) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-muted to-muted/50">
      <div className="flex size-16 items-center justify-center rounded-full border-2 border-brand1/30 bg-background">
        <span className="text-xl font-bold text-brand1">{title[0]}</span>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// BrowserFrame — CSS-only browser chrome decoration for web projects
// ---------------------------------------------------------------------------

interface BrowserFrameProps {
  projectTitle: string
  screenshotPath: string
  containerClassName?: string
  showPlaceholder: boolean
  onImageError: () => void
}

function BrowserFrame({
  projectTitle,
  screenshotPath,
  containerClassName,
  showPlaceholder,
  onImageError,
}: BrowserFrameProps) {
  return (
    <div className="rounded-t-lg overflow-hidden">
      {/* Browser chrome bar */}
      <div className="flex h-7 items-center gap-2 bg-muted px-3">
        <span className="size-2.5 rounded-full bg-[#FF5F56]" aria-hidden="true" />
        <span className="size-2.5 rounded-full bg-[#FFBD2E]" aria-hidden="true" />
        <span className="size-2.5 rounded-full bg-[#27C93F]" aria-hidden="true" />
        <div className="ml-2 flex-1 rounded bg-background/50 px-2 py-1 text-[10px] text-muted-foreground font-mono truncate">
          {projectTitle}
        </div>
      </div>
      {/* Screenshot container */}
      <div className={cn('relative overflow-hidden group', containerClassName)}>
        {showPlaceholder ? (
          <ScreenshotPlaceholder title={projectTitle} />
        ) : (
          <Image
            src={screenshotPath}
            alt={`${projectTitle} — web application screenshot`}
            fill
            className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
            onError={onImageError}
          />
        )}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// PhoneFrame — CSS-only phone bezel decoration for mobile projects
// ---------------------------------------------------------------------------

interface PhoneFrameProps {
  projectTitle: string
  screenshotPath: string
  containerClassName?: string
  showPlaceholder: boolean
  onImageError: () => void
}

function PhoneFrame({
  projectTitle,
  screenshotPath,
  containerClassName,
  showPlaceholder,
  onImageError,
}: PhoneFrameProps) {
  return (
    <div className="mx-auto max-w-[220px] rounded-[2rem] border-4 border-muted bg-muted p-1 shadow-inner">
      <div className="overflow-hidden rounded-[1.5rem]">
        {/* Notch bar */}
        <div className="flex h-8 items-center justify-center bg-muted">
          <div className="h-3 w-16 rounded-full bg-background/30" aria-hidden="true" />
        </div>
        {/* Screenshot container */}
        <div className={cn('relative overflow-hidden group', containerClassName)}>
          {showPlaceholder ? (
            <ScreenshotPlaceholder title={projectTitle} />
          ) : (
            <Image
              src={screenshotPath}
              alt={`${projectTitle} — mobile application screenshot`}
              fill
              className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
              onError={onImageError}
            />
          )}
        </div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// ActionLinks — rendered only when liveUrl or githubUrl exist
// ---------------------------------------------------------------------------

function ActionLinks({
  liveUrl,
  githubUrl,
  projectTitle,
}: {
  liveUrl?: string
  githubUrl?: string
  projectTitle: string
}) {
  if (!liveUrl && !githubUrl) return null

  return (
    <div className="flex gap-4">
      {liveUrl && (
        <Button variant="outline" size="sm" asChild>
          <a href={liveUrl} target="_blank" rel="noopener noreferrer">
            <ExternalLink size={14} aria-hidden="true" />
            Live Demo
            <span className="sr-only">(opens in new tab)</span>
          </a>
        </Button>
      )}
      {githubUrl && (
        <Button variant="outline" size="sm" asChild>
          <a href={githubUrl} target="_blank" rel="noopener noreferrer">
            <Github size={14} aria-hidden="true" />
            View on GitHub
            <span className="sr-only">(opens in new tab)</span>
          </a>
        </Button>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// ProjectCard — grid card for PROJECTS[1..5]
// ---------------------------------------------------------------------------

function ProjectCard({ project }: { project: Project }) {
  const [imgError, setImgError] = useState(false)

  const frameContainerClass = project.type === 'web'
    ? 'h-40 md:h-[200px]'
    : 'h-40 md:h-[160px]'

  return (
    <Card
      className={cn(
        'border border-border hover:border-brand1 transition-colors duration-200 flex flex-col'
      )}
    >
      {/* Device frame at top */}
      {project.type === 'web' ? (
        <BrowserFrame
          projectTitle={project.title}
          screenshotPath={project.screenshotPath}
          containerClassName={frameContainerClass}
          showPlaceholder={imgError}
          onImageError={() => setImgError(true)}
        />
      ) : (
        <PhoneFrame
          projectTitle={project.title}
          screenshotPath={project.screenshotPath}
          containerClassName={frameContainerClass}
          showPlaceholder={imgError}
          onImageError={() => setImgError(true)}
        />
      )}

      {/* Card content */}
      <div className="flex flex-col gap-3 p-4 flex-1">
        <h3 className="text-xl font-bold font-inter text-foreground">{project.title}</h3>
        <p className="font-jetbrains text-code-m text-muted-foreground">
          {project.role} at {project.company}
        </p>
        <p className="font-jetbrains text-para-m text-foreground line-clamp-3">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mt-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="font-jetbrains rounded-full bg-muted px-2 py-1 text-code-m text-muted-foreground"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="mt-auto">
          <ActionLinks
            liveUrl={project.liveUrl}
            githubUrl={project.githubUrl}
            projectTitle={project.title}
          />
        </div>
      </div>
    </Card>
  )
}

// ---------------------------------------------------------------------------
// FeaturedProjectCard — full-width featured variant for PROJECTS[0] (Buildable)
// ---------------------------------------------------------------------------

function FeaturedProjectCard({ project }: { project: Project }) {
  const [imgError, setImgError] = useState(false)

  return (
    <Card
      className={cn(
        'border border-border border-t-2 border-t-brand1 hover:border-brand1 transition-colors duration-200 flex flex-col md:flex-row overflow-hidden'
      )}
    >
      {/* Screenshot side */}
      <div className="md:w-1/2">
        <BrowserFrame
          projectTitle={project.title}
          screenshotPath={project.screenshotPath}
          containerClassName="h-60 md:h-[400px]"
          showPlaceholder={imgError}
          onImageError={() => setImgError(true)}
        />
      </div>

      {/* Content side */}
      <div className="flex flex-col gap-4 p-6 md:w-1/2">
        <h3 className="text-xl font-bold font-inter text-foreground">{project.title}</h3>
        <p className="font-jetbrains text-code-m text-muted-foreground">
          {project.role} at {project.company}
        </p>
        <p className="font-jetbrains text-para-m text-foreground">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="font-jetbrains rounded-full bg-muted px-2 py-1 text-code-m text-muted-foreground"
            >
              {tech}
            </span>
          ))}
        </div>
        <ActionLinks
          liveUrl={project.liveUrl}
          githubUrl={project.githubUrl}
          projectTitle={project.title}
        />
      </div>
    </Card>
  )
}

// ---------------------------------------------------------------------------
// ProjectsSection — section root (default export)
// ---------------------------------------------------------------------------

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="w-full max-w-6xl px-6 py-12"
    >
      {/* Section heading */}
      <div className="mb-12 flex flex-col items-center gap-3 text-center">
        <h2
          id="projects-heading"
          className="font-inter text-h2-u font-bold text-foreground"
        >
          Projects
        </h2>
        <UnderLine />
      </div>

      {/* Featured project (Buildable) */}
      <div className="mb-8">
        <FeaturedProjectCard project={PROJECTS[0]} />
      </div>

      {/* Projects grid — remaining 5 projects */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {PROJECTS.slice(1).map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  )
}
