'use client'
// components/sections/Certificates.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Scanned certificate wall with category filter and a full-size viewer
// ─────────────────────────────────────────────────────────────────────────────
import { useState } from 'react'
import Image from 'next/image'
import SectionHeading from '@/components/ui/SectionHeading'
import Lightbox from '@/components/ui/Lightbox'
import { CERTIFICATES, type CertificateKind } from '@/lib/profile'

const FILTERS: { key: 'all' | CertificateKind; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'win', label: 'Wins & recognition' },
  { key: 'participation', label: 'Participation' },
  { key: 'course', label: 'Courses' },
]

export default function Certificates() {
  const [filter, setFilter] = useState<'all' | CertificateKind>('all')
  const [open, setOpen] = useState<number | null>(null)
  const visible = filter === 'all' ? CERTIFICATES : CERTIFICATES.filter((c) => c.kind === filter)

  if (CERTIFICATES.length === 0) return null

  return (
    <section id="certificates" className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
      <SectionHeading
        eyebrow="Certificates"
        title="The paper trail."
        description={`${CERTIFICATES.length} certificates from hackathons, symposiums, workshops and courses. Click any one to view it full size.`}
      />

      <div className="mb-6 flex flex-wrap gap-1.5" role="tablist" aria-label="Filter certificates">
        {FILTERS.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={filter === key}
            onClick={() => setFilter(key)}
            className={`rounded-md px-3 py-1.5 text-xs transition-colors ${
              filter === key
                ? 'bg-accent text-background'
                : 'border border-white/10 text-muted-light hover:text-foreground'
            }`}
          >
            {label}
            <span className="ml-1.5 opacity-60">
              {key === 'all' ? CERTIFICATES.length : CERTIFICATES.filter((c) => c.kind === key).length}
            </span>
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((c) => (
          <button
            key={c.src}
            type="button"
            onClick={() => setOpen(visible.indexOf(c))}
            className="glass-card group flex flex-col overflow-hidden rounded-xl text-left"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-white/[0.03]">
              <Image
                src={`/certificates/${c.src}.webp`}
                alt={c.title}
                fill
                sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
                className="object-contain p-3 transition-transform duration-500 group-hover:scale-[1.04]"
              />
            </div>
            <div className="border-t border-white/[0.06] p-4">
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm font-medium leading-snug text-foreground">{c.title}</p>
                <span className="shrink-0 font-mono text-[11px] text-muted">{c.date}</span>
              </div>
              <p className="mt-1 text-xs text-muted-light">{c.issuer}</p>
            </div>
          </button>
        ))}
      </div>

      {open !== null && visible[open] && (
        <Lightbox
          item={{
            ...visible[open],
            src: `/certificates/${visible[open].src}.webp`,
            caption: `${visible[open].issuer} · ${visible[open].date}`,
          }}
          onClose={() => setOpen(null)}
          onPrev={() => setOpen((i) => (i === null ? i : (i - 1 + visible.length) % visible.length))}
          onNext={() => setOpen((i) => (i === null ? i : (i + 1) % visible.length))}
        />
      )}
    </section>
  )
}
