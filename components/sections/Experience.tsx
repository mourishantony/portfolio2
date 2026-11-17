// components/sections/Experience.tsx
// Work experience timeline + education (data in lib/profile.ts)
import { Briefcase, GraduationCap } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import { EDUCATION, EXPERIENCE } from '@/lib/profile'

export default function Experience() {
  if (EXPERIENCE.length === 0 && EDUCATION.length === 0) return null

  return (
    <section id="experience" className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
      <SectionHeading eyebrow="Experience" title="Where I've worked and studied." />

      <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr]">
        <ol className="relative space-y-10 border-l border-white/10 pl-8">
          {EXPERIENCE.map((job) => (
            <li key={`${job.org}-${job.role}`} className="relative">
              <span className="absolute -left-[41px] top-0.5 flex h-[18px] w-[18px] items-center justify-center rounded-full border border-accent/40 bg-background">
                <span className="h-2 w-2 rounded-full bg-accent" />
              </span>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-lg font-medium text-foreground">
                  {job.role} <span className="text-muted-light">· {job.org}</span>
                </h3>
                <p className="font-mono text-xs text-muted">{job.period}</p>
              </div>
              {job.location && <p className="mt-1 text-sm text-muted">{job.location}</p>}
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted-light">
                {job.points.map((pt) => (
                  <li key={pt} className="flex gap-3">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted" />
                    {pt}
                  </li>
                ))}
              </ul>
            </li>
          ))}
          {EXPERIENCE.length === 0 && (
            <li className="flex items-center gap-3 text-sm text-muted-light">
              <Briefcase size={16} /> Open to full-time SDE and AI/ML engineering roles.
            </li>
          )}
        </ol>

        {EDUCATION.length > 0 && (
          <div>
            <h3 className="mb-5 flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-muted">
              <GraduationCap size={16} /> Education
            </h3>
            <div className="space-y-4">
              {EDUCATION.map((ed) => (
                <div key={ed.school} className="glass-card rounded-xl p-5">
                  <p className="font-medium text-foreground">{ed.degree}</p>
                  <p className="mt-1 text-sm text-muted-light">{ed.school}</p>
                  <p className="mt-2 font-mono text-xs text-muted">{ed.period}</p>
                  {ed.detail && <p className="mt-2 text-sm text-muted-light">{ed.detail}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
