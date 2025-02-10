'use client'

import { ThemeProvider } from '@/app/ui/theme/theme-provider'
import { useEffect, useState } from 'react'

export function ClientThemeProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <>{children}</> // Prevent hydration mismatch
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="midnight_steel"
      enableSystem
      themes={['light', 'dark', 'midnight_steel']}
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  )
}
