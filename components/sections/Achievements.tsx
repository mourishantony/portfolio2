// components/sections/Achievements.tsx
// Awards, hackathons and certifications (from Supabase / lib/mock-data.ts)
import { Award, Medal, Trophy } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import type { Achievement, BadgeType } from '@/lib/types'

const BADGE: Record<BadgeType, { icon: typeof Award; className: string }> = {
  gold: { icon: Trophy, className: 'text-amber-300' },
  silver: { icon: Medal, className: 'text-zinc-300' },
  bronze: { icon: Medal, className: 'text-orange-300' },
  award: { icon: Award, className: 'text-accent' },
}

function formatDate(date: string | null) {
  if (!date) return null
  const d = new Date(date)
  return Number.isNaN(d.getTime())
    ? date
    : d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

export default function Achievements({ achievements }: { achievements: Achievement[] }) {
  if (achievements.length === 0) return null

  return (
    <section id="achievements" className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
      <SectionHeading eyebrow="Achievements" title="Recognition & certifications." />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {achievements.map((a) => {
          const { icon: Icon, className } = BADGE[a.badge_type] ?? BADGE.award
          return (
            <div key={a.id} className="glass-card rounded-xl p-5">
              <div className="flex items-center justify-between">
                <Icon size={20} className={className} />
                {a.date && <span className="font-mono text-xs text-muted">{formatDate(a.date)}</span>}
              </div>
              <h3 className="mt-4 font-medium leading-snug text-foreground">{a.title}</h3>
              {a.description && (
                <p className="mt-2 text-sm leading-relaxed text-muted-light">{a.description}</p>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
