'use client'
// components/sections/Certificates.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Scanned certificate wall with category filter and a full-size viewer
// ─────────────────────────────────────────────────────────────────────────────
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import { CERTIFICATES, type CertificateKind } from '@/lib/profile'

const FILTERS: { key: 'all' | CertificateKind; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'win', label: 'Wins & recognition' },
  { key: 'participation', label: 'Participation' },
  { key: 'course', label: 'Courses' },
]

type Cert = (typeof CERTIFICATES)[number]

export default function Certificates() {
  const [filter, setFilter] = useState<'all' | CertificateKind>('all')
  const [open, setOpen] = useState<Cert | null>(null)
  const visible = filter === 'all' ? CERTIFICATES : CERTIFICATES.filter((c) => c.kind === filter)

  // Close viewer on Escape and lock background scroll while open
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(null)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

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
            onClick={() => setOpen(c)}
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

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={open.title}
          onClick={() => setOpen(null)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
        >
          <button
            type="button"
            aria-label="Close"
            onClick={() => setOpen(null)}
            className="absolute right-4 top-4 rounded-full border border-white/20 bg-black/60 p-2 text-white hover:bg-white/10"
          >
            <X size={20} />
          </button>
          <figure className="flex max-h-full max-w-5xl flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <Image
              src={`/certificates/${open.src}.webp`}
              alt={open.title}
              width={open.width}
              height={open.height}
              sizes="90vw"
              loading="eager"
              className="max-h-[80vh] w-auto rounded-lg object-contain"
            />
            <figcaption className="mt-3 text-center">
              <p className="text-sm font-medium text-white">{open.title}</p>
              <p className="text-xs text-zinc-400">
                {open.issuer} · {open.date}
              </p>
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  )
}
