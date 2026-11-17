'use client'
// components/Navbar.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Sticky top navigation with blur-on-scroll and a mobile menu
// ─────────────────────────────────────────────────────────────────────────────
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/ui/SocialIcons'
import { LINKS, PROFILE } from '@/lib/profile'

const NAV_LINKS = [
  { label: 'About', href: '/#about' },
  { label: 'Experience', href: '/#experience' },
  { label: 'Skills', href: '/#skills' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Awards', href: '/#achievements' },
  { label: 'Certificates', href: '/#certificates' },
  { label: 'Gallery', href: '/#gallery' },
  { label: 'Contact', href: '/#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? 'border-b border-white/[0.06] bg-background/80 backdrop-blur-md'
          : 'border-b border-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="font-mono text-sm font-semibold tracking-tight text-foreground">
          mourish<span className="text-accent">.</span>dev
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="rounded-md px-3 py-2 text-sm text-muted-light transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 lg:flex">
          <a
            href={LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="rounded-md p-2 text-muted-light transition-colors hover:text-foreground"
          >
            <GithubIcon size={18} />
          </a>
          <a
            href={LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="rounded-md p-2 text-muted-light transition-colors hover:text-foreground"
          >
            <LinkedinIcon size={18} />
          </a>
          <a
            href={PROFILE.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-500 px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Résumé
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="rounded-md p-2 text-muted-light lg:hidden"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/[0.06] px-5 pb-6 pt-2 lg:hidden">
          <ul className="flex flex-col">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-base text-muted-light hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <a
            href={PROFILE.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block rounded-lg bg-gradient-to-r from-violet-600 to-indigo-500 px-4 py-2 text-sm font-semibold text-white"
          >
            Résumé
          </a>
          <div className="mt-4 flex gap-4 text-muted-light">
            <a href={LINKS.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <GithubIcon size={20} />
            </a>
            <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <LinkedinIcon size={20} />
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
