// components/sections/About.tsx
// Short professional summary + the four areas I work across
import { Eye, FlaskConical, Sparkles, Server } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import { FOCUS_AREAS, PROFILE } from '@/lib/profile'

const ICONS = [Eye, FlaskConical, Sparkles, Server]

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
      <SectionHeading eyebrow="About" title="Engineer first, model builder second." />

      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
        <div className="space-y-5 text-base leading-relaxed text-muted-light">
          {PROFILE.summary.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {FOCUS_AREAS.map(({ title, desc }, i) => {
            const Icon = ICONS[i % ICONS.length]
            return (
              <div key={title} className="glass-card rounded-xl p-5">
                <Icon size={20} className="text-accent" />
                <h3 className="mt-4 font-medium text-foreground">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-light">{desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
