import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/app/ui/navbar'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { ClientThemeProvider } from './ui/theme/clientThemeProvider'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  weight: ['400', '500', '700'],
})

export const metadata: Metadata = {
  title: 'Mujeeb Portfolio',
  description: 'Check out my portfolio',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased font-inter`}
      >
        <ClientThemeProvider>
          <Navbar />
          {children}
        </ClientThemeProvider>
      </body>
    </html>
  )
}
