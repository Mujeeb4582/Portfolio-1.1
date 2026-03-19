import type { Metadata } from 'next'
import './globals.css'
import MobileNav from '@/app/ui/mobile-nav'

import { Inter, JetBrains_Mono } from 'next/font/google'
import { ClientThemeProvider } from './ui/theme/clientThemeProvider'
import { PERSONAL_INFO } from '@/app/lib/constant'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  weight: ['400', '500', '700'],
})

const metadataBase = new URL('https://mujeeb.vercel.app')
const title = `${PERSONAL_INFO.name} | ${PERSONAL_INFO.title}`
const description = PERSONAL_INFO.bio.slice(0, 160)

export const metadata: Metadata = {
  metadataBase,
  title,
  description,
  openGraph: {
    title,
    description,
    url: 'https://mujeeb.vercel.app',
    siteName: PERSONAL_INFO.name,
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: `${PERSONAL_INFO.name} — ${PERSONAL_INFO.title}`,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: PERSONAL_INFO.name,
  jobTitle: PERSONAL_INFO.title,
  email: PERSONAL_INFO.email,
  url: 'https://mujeeb.vercel.app',
  sameAs: [PERSONAL_INFO.github, PERSONAL_INFO.linkedIn],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme')||'midnight_steel';document.documentElement.classList.add(t)}catch(e){}})()`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased font-inter`}
      >
        <ClientThemeProvider>
          <MobileNav />
          {children}
        </ClientThemeProvider>
      </body>
    </html>
  )
}
