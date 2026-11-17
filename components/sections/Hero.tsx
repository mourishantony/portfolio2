// components/sections/Hero.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Above-the-fold intro: greeting + name, roles, CTAs, cutout portrait with
// connected social nodes, and live stats
// ─────────────────────────────────────────────────────────────────────────────
import Image from 'next/image'
import { ArrowRight, Code2, FileText, Mail, Trophy } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/ui/SocialIcons'
import { LINKS, PROFILE } from '@/lib/profile'
import type { GithubStats } from '@/lib/github'

const ROLES = ['AI Engineer', 'ML Engineer', 'Software Engineer']

const NODES = [
  { href: LINKS.github, label: 'GitHub', icon: GithubIcon },
  { href: LINKS.linkedin, label: 'LinkedIn', icon: LinkedinIcon },
  { href: LINKS.leetcode, label: 'LeetCode', icon: Code2 },
]

export default function Hero({ stats }: { stats: GithubStats | null }) {
  const statItems = [
    { value: stats ? `${stats.publicRepos}` : '50+', label: 'Public repositories' },
    { value: stats ? `${stats.followers}` : '50+', label: 'GitHub followers' },
    { value: '90%', label: 'Best held-out model accuracy' },
    { value: '5×', label: 'First-place wins incl. SIH ’25' },
  ]

  return (
    <section className="relative overflow-hidden pt-24 sm:pt-28">
      {/* Decorative glow + flowing lines (no photo background) */}
      <div className="pointer-events-none absolute -left-40 top-20 h-[480px] w-[480px] rounded-full bg-violet-700/20 blur-[140px]" />
      <div className="pointer-events-none absolute right-0 top-40 h-[520px] w-[620px] rounded-full bg-indigo-600/15 blur-[150px]" />
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/3 h-[420px] w-full opacity-40"
        viewBox="0 0 1440 420"
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          <linearGradient id="hero-wave" x1="0" x2="1">
            <stop offset="0" stopColor="#7c3aed" stopOpacity="0" />
            <stop offset="0.5" stopColor="#a78bfa" />
            <stop offset="1" stopColor="#60a5fa" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0, 18, 36, 54].map((o) => (
          <path
            key={o}
            d={`M0 ${260 + o} C 360 ${120 + o}, 620 ${380 - o}, 960 ${200 + o} S 1300 ${120 + o}, 1440 ${180 + o}`}
            stroke="url(#hero-wave)"
            strokeWidth="1"
          />
        ))}
      </svg>

      <div className="relative mx-auto grid max-w-6xl items-end gap-10 px-5 sm:px-8 lg:grid-cols-[1.1fr_1fr]">
        {/* Left: text */}
        <div className="animate-fade-up pb-10 lg:pb-24">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-muted-light">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            {PROFILE.availability}
          </div>

          <p className="text-2xl font-medium text-muted-light sm:text-3xl">Hello, I&apos;m</p>
          <h1 className="mt-2 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            <span className="font-mono text-accent/60">{'{'}</span>
            <span className="gradient-text-animated">{PROFILE.name}</span>
            <span className="font-mono text-accent/60">{'}'}</span>
          </h1>

          {/* Role ladder with connector lines */}
          <ul className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm font-medium text-foreground sm:text-base">
            {ROLES.map((role, i) => (
              <li key={role} className="flex items-center gap-3">
                {i > 0 && (
                  <span className="flex items-center" aria-hidden>
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    <span className="h-px w-6 bg-gradient-to-r from-accent to-accent/20 sm:w-10" />
                    <span className="h-1.5 w-1.5 rounded-full border border-accent" />
                  </span>
                )}
                {role}
              </li>
            ))}
          </ul>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-light sm:text-lg">
            {PROFILE.tagline}
          </p>
          <p className="mt-4 inline-flex items-center gap-2 text-sm text-amber-200/90">
            <Trophy size={15} /> {PROFILE.highlight}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={PROFILE.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-900/40 transition-opacity hover:opacity-90"
            >
              <FileText size={16} /> Download CV
            </a>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-lg border border-accent/50 px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-accent/10"
            >
              See projects <ArrowRight size={16} />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-2 py-3 text-sm font-medium text-muted-light transition-colors hover:text-foreground"
            >
              <Mail size={16} /> Get in touch
            </a>
          </div>

          {/* Phones: social links (the connected nodes beside the portrait are sm+) */}
          <ul className="mt-6 flex items-center gap-3 sm:hidden">
            {NODES.map(({ href, label, icon: Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/[0.03] text-foreground transition-colors hover:border-accent hover:text-accent"
                >
                  <Icon size={18} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: cutout portrait */}
        <div className="animate-fade-up relative mx-auto flex h-[440px] w-full max-w-md items-end justify-center [animation-delay:150ms] sm:h-[540px] lg:h-[620px] lg:max-w-none">
          {/* Glow disc behind the portrait */}
          <div className="absolute bottom-10 left-1/2 aspect-square w-[88%] max-w-[470px] -translate-x-1/2 rounded-full bg-gradient-to-br from-violet-600/70 via-indigo-600/40 to-transparent blur-[2px] animate-glow" />
          <div className="absolute bottom-10 left-1/2 aspect-square w-[88%] max-w-[470px] -translate-x-1/2 rounded-full border border-violet-300/20" />
          {/* Slowly rotating dashed orbit */}
          <div className="absolute bottom-[-0.5rem] left-1/2 aspect-square w-[100%] max-w-[540px] -translate-x-1/2">
            <div className="animate-spin-slow h-full w-full rounded-full border border-dashed border-violet-400/25">
              <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-300 shadow-[0_0_12px_4px_rgba(167,139,250,0.7)]" />
            </div>
          </div>

          <Image
            src="/portrait-hd.webp"
            alt={`Portrait of ${PROFILE.name}`}
            width={900}
            height={1060}
            priority
            sizes="(min-width: 1024px) 540px, 90vw"
            className="relative z-10 h-full w-auto max-w-full object-contain object-bottom [mask-image:linear-gradient(to_bottom,black_85%,transparent)]"
          />

          {/* Connected social nodes */}
          <svg
            aria-hidden
            className="animate-float-slow absolute right-0 top-[18%] z-20 hidden h-[260px] w-[120px] sm:block"
            viewBox="0 0 120 260"
            fill="none"
          >
            <path d="M10 10 L 60 30 L 100 120 L 60 220" stroke="#a78bfa" strokeOpacity="0.5" strokeWidth="1.2" />
            <circle cx="10" cy="10" r="3" fill="#a78bfa" />
          </svg>
          <ul className="animate-float-slow absolute right-0 top-[18%] z-20 hidden h-[260px] w-[120px] sm:block">
            {NODES.map(({ href, label, icon: Icon }, i) => (
              <li
                key={label}
                className="absolute"
                style={{ left: [60, 100, 60][i] - 20, top: [30, 120, 220][i] - 20 }}
              >
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-background/80 text-foreground backdrop-blur transition-colors hover:border-accent hover:text-accent"
                >
                  <Icon size={18} />
                </a>
              </li>
            ))}
          </ul>

          {/* Floating chips */}
          <div className="animate-float absolute bottom-24 left-0 z-20 rounded-xl border border-white/10 bg-background/80 px-3.5 py-2.5 backdrop-blur sm:left-2">
            <p className="text-[11px] uppercase tracking-wider text-muted">Focus</p>
            <p className="text-sm font-medium text-foreground">Computer Vision · FastAPI</p>
          </div>
        </div>
      </div>

      <div className="relative mx-auto max-w-6xl px-5 pb-20 sm:px-8">
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.08] sm:grid-cols-4">
          {statItems.map(({ value, label }) => (
            <div key={label} className="bg-background px-6 py-5">
              <dt className="text-xs text-muted">{label}</dt>
              <dd className="mt-1 font-mono text-2xl font-semibold text-foreground">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
