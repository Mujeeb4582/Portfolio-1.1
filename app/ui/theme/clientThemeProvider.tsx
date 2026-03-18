'use client'
import { useState, useEffect } from 'react'
import { ThemeProvider } from 'next-themes'

export function ClientThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return <>{children}</>
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem={true}
      themes={['light', 'dark', 'midnight_steel']}
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  )
}
