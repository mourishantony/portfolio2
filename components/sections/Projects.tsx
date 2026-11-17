'use client'
// components/sections/Projects.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Featured projects (large cards) + filterable grid of the rest
// ─────────────────────────────────────────────────────────────────────────────
import { useState } from 'react'
import { ArrowUpRight, ExternalLink } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import { GithubIcon } from '@/components/ui/SocialIcons'
import { LINKS } from '@/lib/profile'
import type { Project, ProjectCategory } from '@/lib/types'

const CATEGORY_LABEL: Record<ProjectCategory, string> = {
  llm: 'LLM / GenAI',
  cv: 'Computer Vision',
  mlops: 'ML Systems',
  rl: 'Reinforcement Learning',
  other: 'Software',
}

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="flex items-center gap-1">
      {project.github_url && (
        <a
          href={project.github_url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title} source code`}
          className="rounded-md p-2 text-muted-light transition-colors hover:bg-white/[0.06] hover:text-foreground"
        >
          <GithubIcon size={17} />
        </a>
      )}
      {project.live_demo_url && (
        <a
          href={project.live_demo_url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title} live demo`}
          className="rounded-md p-2 text-muted-light transition-colors hover:bg-white/[0.06] hover:text-foreground"
        >
          <ExternalLink size={17} />
        </a>
      )}
    </div>
  )
}

function TechList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {items.map((t) => (
        <li key={t} className="rounded bg-white/[0.05] px-2 py-0.5 font-mono text-[11px] text-muted-light">
          {t}
        </li>
      ))}
    </ul>
  )
}

export default function Projects({ projects }: { projects: Project[] }) {
  const featured = projects.filter((p) => p.featured)
  const rest = projects.filter((p) => !p.featured)

  const categories = ['all', ...new Set(rest.map((p) => p.category))] as ('all' | ProjectCategory)[]
  const [filter, setFilter] = useState<'all' | ProjectCategory>('all')
  const visible = filter === 'all' ? rest : rest.filter((p) => p.category === filter)

  return (
    <section id="projects" className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
      <SectionHeading
        eyebrow="Projects"
        title="Selected work."
        description="Production-minded ML and software projects — each with source code on GitHub."
      />

      <div className="grid gap-5 md:grid-cols-2">
        {featured.map((p) => (
          <article key={p.id} className="glass-card flex flex-col rounded-2xl p-6 sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <p className="font-mono text-xs uppercase tracking-wider text-accent">
                {CATEGORY_LABEL[p.category]}
              </p>
              <ProjectLinks project={p} />
            </div>
            <h3 className="mt-2 text-xl font-semibold tracking-tight text-foreground">{p.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-light">{p.description}</p>
            {p.metrics_summary && (
              <p className="mt-4 rounded-lg border border-accent/20 bg-accent/[0.06] px-3.5 py-2.5 text-xs leading-relaxed text-violet-100">
                {p.metrics_summary}
              </p>
            )}
            <div className="mt-auto pt-5">
              <TechList items={p.tech_stack} />
            </div>
          </article>
        ))}
      </div>

      {rest.length > 0 && (
        <>
          <div className="mt-16 mb-6 flex flex-wrap items-center justify-between gap-4">
            <h3 className="text-lg font-medium text-foreground">More projects</h3>
            <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Filter projects">
              {categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  role="tab"
                  aria-selected={filter === c}
                  onClick={() => setFilter(c)}
                  className={`rounded-md px-3 py-1.5 text-xs transition-colors ${
                    filter === c
                      ? 'bg-foreground text-background'
                      : 'border border-white/10 text-muted-light hover:text-foreground'
                  }`}
                >
                  {c === 'all' ? 'All' : CATEGORY_LABEL[c]}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((p) => (
              <article key={p.id} className="glass-card flex flex-col rounded-xl p-5">
                <div className="flex items-start justify-between gap-3">
                  <h4 className="font-medium leading-snug text-foreground">{p.title}</h4>
                  <ProjectLinks project={p} />
                </div>
                <p className="mt-2 line-clamp-4 text-sm leading-relaxed text-muted-light">{p.description}</p>
                <div className="mt-auto pt-4">
                  <TechList items={p.tech_stack.slice(0, 4)} />
                </div>
              </article>
            ))}
          </div>
        </>
      )}

      <div className="mt-10 text-center">
        <a
          href={`${LINKS.github}?tab=repositories`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-muted-light transition-colors hover:text-foreground"
        >
          See all repositories on GitHub <ArrowUpRight size={15} />
        </a>
      </div>
    </section>
  )
}
