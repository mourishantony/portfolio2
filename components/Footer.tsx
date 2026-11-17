// components/Footer.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Site footer — copyright and profile links
// ─────────────────────────────────────────────────────────────────────────────
import { Mail } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/ui/SocialIcons'
import { LINKS, PROFILE } from '@/lib/profile'

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06]">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 text-sm text-muted sm:flex-row sm:px-8">
        <p>
          © {new Date().getFullYear()} {PROFILE.name}. Built with Next.js & Tailwind CSS.
        </p>
        <div className="flex items-center gap-4">
          <a href={LINKS.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-foreground">
            <GithubIcon size={17} />
          </a>
          <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-foreground">
            <LinkedinIcon size={17} />
          </a>
          <a href={LINKS.email} aria-label="Email" className="hover:text-foreground">
            <Mail size={17} />
          </a>
        </div>
      </div>
    </footer>
  )
}
