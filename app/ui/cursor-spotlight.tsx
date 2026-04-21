'use client'
import { useEffect, useRef } from 'react'

export function CursorSpotlight() {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let x = 0
    let y = 0
    let frame = 0

    const apply = () => {
      frame = 0
      const el = ref.current
      if (!el) return
      el.style.background = `radial-gradient(600px at ${x}px ${y}px, rgba(18, 247, 214, 0.06), transparent 80%)`
    }

    const onMove = (e: MouseEvent) => {
      x = e.clientX
      y = e.clientY
      if (!frame) frame = requestAnimationFrame(apply)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-30 hidden transition-opacity duration-300 lg:block"
    />
  )
}
