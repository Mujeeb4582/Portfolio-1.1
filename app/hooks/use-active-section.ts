'use client'
import { useState, useEffect } from 'react'
import { NAV_LINKS } from '@/app/lib/constant'

export function useActiveSection(): string {
  const [activeSection, setActiveSection] = useState<string>('')

  useEffect(() => {
    const sectionIds = NAV_LINKS.map((link) => link.href.replace('#', ''))
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[]

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible.length > 0) {
          setActiveSection(visible[0].target.id)
        }
      },
      {
        rootMargin: '-10% 0px -40% 0px',
        threshold: [0, 0.1, 0.25, 0.5],
      }
    )

    sections.forEach((section) => observer.observe(section))

    return () => {
      observer.disconnect()
    }
  }, [])

  return activeSection
}
