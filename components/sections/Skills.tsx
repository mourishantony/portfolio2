// components/sections/Skills.tsx
// Grouped technical skills
import SectionHeading from '@/components/ui/SectionHeading'
import { SKILLS } from '@/lib/profile'

export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
      <SectionHeading
        eyebrow="Skills"
        title="Tools I use to ship."
        description="From data and model training to APIs, frontends and deployment."
      />

      <div className="overflow-hidden rounded-xl border border-white/[0.08]">
        {SKILLS.map(({ group, items }, i) => (
          <div
            key={group}
            className={`grid gap-3 px-6 py-5 sm:grid-cols-[200px_1fr] sm:items-center ${
              i > 0 ? 'border-t border-white/[0.06]' : ''
            }`}
          >
            <p className="text-sm font-medium text-foreground">{group}</p>
            <ul className="flex flex-wrap gap-2">
              {items.map((s) => (
                <li
                  key={s}
                  className="rounded-md border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 font-mono text-xs text-muted-light"
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
