---
phase: 04-navigation-animations
plan: "04"
subsystem: animations
tags: [animations, scroll-reveal, hover-effects, contact-placeholder]
dependency_graph:
  requires: [04-02, 04-03]
  provides: [scroll-reveal-all-sections, contact-scroll-target]
  affects: [app/ui/homepage/*.tsx, app/page.tsx]
tech_stack:
  added: []
  patterns: [AnimateIn-wrapper, StaggerChildren-StaggerItem-grid, hover-transition-classes]
key_files:
  created: []
  modified:
    - app/ui/homepage/aboutSection.tsx
    - app/ui/homepage/skillsSection.tsx
    - app/ui/homepage/experienceSection.tsx
    - app/ui/homepage/projectsSection.tsx
    - app/ui/homepage/heroSection.tsx
    - app/page.tsx
decisions:
  - "Server Component boundaries preserved — AnimateIn/StaggerChildren used as thin client wrappers without adding 'use client' to section files"
  - "StaggerItem wraps the outer div in experience entries rather than the Card — preserves absolute positioning of timeline dots"
  - "FeaturedProjectCard wrapped in AnimateIn delay=0.1 (not StaggerItem) — standalone element, not in a grid"
metrics:
  duration: "~5 minutes"
  completed_date: "2026-03-19"
  tasks_completed: 2
  files_modified: 6
---

# Phase 04 Plan 04: Wire AnimateIn Wrappers into All Sections Summary

**One-liner:** Scroll-reveal via AnimateIn/StaggerChildren wired into all 5 sections and contact placeholder added using motion's client boundary pattern to preserve Server Components.

## Objective Achieved

All section components now animate on scroll entry using the AnimateIn and StaggerChildren/StaggerItem wrappers built in Plan 03. Section headings fade-up via AnimateIn, card grids stagger via StaggerChildren, and hover effects are applied to interactive cards. A contact placeholder section with `id="contact"` was added to app/page.tsx so the navbar #contact link has a scroll target.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Add AnimateIn to aboutSection, skillsSection, experienceSection | 9235211 | aboutSection.tsx, skillsSection.tsx, experienceSection.tsx |
| 2 | Add AnimateIn to projectsSection, heroSection; contact placeholder | ae2ca37 | projectsSection.tsx, heroSection.tsx, page.tsx |

## Implementation Details

### Task 1: About, Skills, Experience Sections

**aboutSection.tsx:**
- `AnimateIn` wraps the heading block
- `AnimateIn delay={0.1}` wraps the bio paragraph (preserves `lg:flex-[3]` via `className` prop)
- `StaggerChildren className="grid grid-cols-3 gap-4 lg:flex-[2]"` replaces the plain div for stats grid
- Each stat `Card` wrapped in `StaggerItem` with `hover:border-brand1/60` transition

**skillsSection.tsx:**
- `AnimateIn` wraps the heading block
- `StaggerChildren` replaces the outer category grid div (grid classes passed via `className`)
- Each category `Card` wrapped in `StaggerItem` with `hover:border-brand1/50` transition

**experienceSection.tsx:**
- `AnimateIn` wraps the heading block
- `StaggerChildren` wraps EXPERIENCE map; each entry's outer `div.relative.mb-8.pl-12` wrapped in `StaggerItem`
- `AnimateIn delay={0.1}` wraps the Education separator div
- `StaggerChildren` wraps EDUCATION map; each education entry similarly wrapped in `StaggerItem`
- Cards get `hover:bg-card/80 transition-colors duration-150`

### Task 2: Projects, Hero Sections and Contact Placeholder

**projectsSection.tsx:**
- Already `'use client'` — imported AnimateIn, StaggerChildren, StaggerItem directly
- `AnimateIn` wraps the heading block
- `AnimateIn delay={0.1} className="mb-8"` wraps the FeaturedProjectCard (standalone, not in grid)
- `StaggerChildren className="grid grid-cols-1 gap-6 md:grid-cols-2"` wraps the PROJECTS.slice(1) grid
- Each `ProjectCard` wrapped in `StaggerItem`
- Both `ProjectCard` and `FeaturedProjectCard` Cards get `transition-all duration-200 hover:shadow-lg hover:-translate-y-1`

**heroSection.tsx:**
- Server Component — no `'use client'` added
- `AnimateIn className="flex flex-col gap-6"` wraps the entire left text column (replaces the plain div)
- `AnimateIn delay={0.2} className="relative shrink-0 ..."` wraps the profile image div (all existing classes moved to AnimateIn className prop)

**app/page.tsx:**
- Contact placeholder section added after `<ProjectsSection />`:
  ```tsx
  <section id="contact" aria-label="Contact" className="w-full py-12" />
  ```

## Verification Results

- TypeScript: `bunx tsc --noEmit` exits 0
- Tests: `bunx vitest run` — 37/37 passing (8 test files)
- AnimateIn found in: aboutSection, skillsSection, experienceSection, projectsSection, heroSection
- StaggerChildren found in: aboutSection, skillsSection, experienceSection, projectsSection
- `id="contact"` found in: app/page.tsx
- No `'use client'` added to: aboutSection, skillsSection, experienceSection, heroSection

## Deviations from Plan

None — plan executed exactly as written.

## Self-Check: PASSED

- app/ui/homepage/aboutSection.tsx: exists and contains AnimateIn, StaggerChildren
- app/ui/homepage/skillsSection.tsx: exists and contains AnimateIn, StaggerChildren
- app/ui/homepage/experienceSection.tsx: exists and contains AnimateIn, StaggerChildren
- app/ui/homepage/projectsSection.tsx: exists and contains AnimateIn, StaggerChildren
- app/ui/homepage/heroSection.tsx: exists and contains AnimateIn
- app/page.tsx: exists and contains id="contact"
- Task 1 commit 9235211: present in git log
- Task 2 commit ae2ca37: present in git log
