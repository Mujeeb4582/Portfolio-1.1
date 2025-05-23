import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import Navbar from '@/app/ui/navbar'
import { IBM_Plex_Mono, Ubuntu } from 'next/font/google'
import { ClientThemeProvider } from './ui/theme/clientThemeProvider'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

const ubuntu = Ubuntu({
  subsets: ['latin'],
  variable: '--font-ubuntu',
  weight: '400',
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-ibm-plex-mono',
  weight: '400',
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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${ubuntu.variable} ${ibmPlexMono.variable} antialiased`}
      >
        <ClientThemeProvider>
          <Navbar />
          {children}
        </ClientThemeProvider>
      </body>
    </html>
  )
}
