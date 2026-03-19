'use client'
import { useState, useEffect } from 'react'
import { ThemeProvider } from 'next-themes'
import { MotionConfig } from 'motion/react'

export function ClientThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return <>{children}</>
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="midnight_steel"
      enableSystem={false}
      themes={['light', 'dark', 'midnight_steel']}
      disableTransitionOnChange
    >
      <MotionConfig reducedMotion="user">
        {children}
      </MotionConfig>
    </ThemeProvider>
  )
}
