// app/layout.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Root layout — wraps every page with Navbar, Footer, and global metadata
// ─────────────────────────────────────────────────────────────────────────────
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const geistSans = Geist({ subsets: ['latin'], variable: '--font-geist-sans' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' })

const DESCRIPTION =
  'Mourish Antony C — Software Engineer and AI/ML Engineer building computer vision systems, deep-learning models and the backend services that ship them.'

export const metadata: Metadata = {
  metadataBase: new URL('https://mourishantonyc.vercel.app'),
  title: {
    default: 'Mourish Antony C | Software & AI/ML Engineer',
    template: '%s | Mourish Antony C',
  },
  description: DESCRIPTION,
  keywords: [
    'Software Engineer',
    'SDE',
    'AI Engineer',
    'ML Engineer',
    'Machine Learning',
    'Computer Vision',
    'Deep Learning',
    'FastAPI',
    'Python',
    'Mourish Antony C',
  ],
  authors: [{ name: 'Mourish Antony C', url: 'https://github.com/mourishantony' }],
  creator: 'Mourish Antony C',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Mourish Antony C | Software & AI/ML Engineer',
    description: DESCRIPTION,
    siteName: 'Mourish Antony C',
    images: ['/profile.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="antialiased min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
