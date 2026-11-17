// components/sections/Contact.tsx
// Closing call-to-action with direct contact links
import { ArrowUpRight, Code2, Mail } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/ui/SocialIcons'
import { LINKS, PROFILE } from '@/lib/profile'

const CHANNELS = [
  { label: 'Email', value: PROFILE.email, href: LINKS.email, icon: Mail },
  { label: 'LinkedIn', value: 'in/mourishantonyc', href: LINKS.linkedin, icon: LinkedinIcon },
  { label: 'GitHub', value: '@mourishantony', href: LINKS.github, icon: GithubIcon },
  { label: 'LeetCode', value: 'mourish_antony_c', href: LINKS.leetcode, icon: Code2 },
]

export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-surface px-6 py-14 sm:px-12">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />

        <div className="relative grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-accent">Contact</p>
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Let&apos;s build something useful.
            </h2>
            <p className="mt-4 max-w-md text-muted-light">
              I&apos;m looking for SDE, AI Engineer and ML Engineer opportunities. The fastest way to
              reach me is email.
            </p>
            <a
              href={LINKS.email}
              className="mt-8 inline-flex items-center gap-2 rounded-md bg-foreground px-5 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
            >
              <Mail size={16} /> {PROFILE.email}
            </a>
          </div>

          <ul className="divide-y divide-white/[0.06] rounded-xl border border-white/[0.08] bg-background/60">
            {CHANNELS.map(({ label, value, href, icon: Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith('mailto:') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-white/[0.03]"
                >
                  <Icon size={18} className="text-muted-light" />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-muted">{label}</p>
                    <p className="truncate text-sm text-foreground">{value}</p>
                  </div>
                  <ArrowUpRight size={16} className="text-muted transition-colors group-hover:text-foreground" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
