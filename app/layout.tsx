// app/layout.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Root layout — wraps every page with Navbar, Footer, and global metadata
// ─────────────────────────────────────────────────────────────────────────────
import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: {
    default: 'Mourish Antony C | ML Engineer',
    template: '%s | Mourish Antony C',
  },
  description:
    'Advanced Machine Learning Engineer specializing in LLMs, Generative AI, Computer Vision, MLOps, and Reinforcement Learning. Building production-grade AI systems at scale.',
  keywords: [
    'Machine Learning',
    'MLOps',
    'LLM',
    'Generative AI',
    'Computer Vision',
    'Deep Learning',
    'Reinforcement Learning',
    'AI Engineer',
    'Portfolio',
    'Mourish Antony C',
  ],
  authors: [{ name: 'Mourish Antony C' }],
  creator: 'Mourish Antony C',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Mourish Antony C | ML Engineer',
    description:
      'Full-spectrum ML Engineer building production AI infrastructure, LLMs, and Computer Vision systems.',
    siteName: 'Mourish Antony C Portfolio',
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
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
