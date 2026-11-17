'use client'
// components/sections/Gallery.tsx
// Photo highlights from hackathons and events (data in lib/profile.ts).
// Click a photo to view it full size with its event details.
import { useState } from 'react'
import Image from 'next/image'
import { Expand } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import Lightbox from '@/components/ui/Lightbox'
import { GALLERY } from '@/lib/profile'

export default function Gallery() {
  const [index, setIndex] = useState<number | null>(null)

  if (GALLERY.length === 0) return null

  const step = (d: number) => setIndex((i) => (i === null ? i : (i + d + GALLERY.length) % GALLERY.length))

  return (
    <section id="gallery" className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
      <SectionHeading
        eyebrow="Gallery"
        title="On stage and in the room."
        description="Hackathon finals, project showcases and the teams I've built with. Click a photo to view it full size."
      />

      {/* First photo is the large feature tile; `wide` photos span two columns */}
      <div className="grid auto-rows-[240px] gap-4 sm:grid-cols-2 lg:grid-flow-dense lg:grid-cols-3 lg:auto-rows-[220px]">
        {GALLERY.map((photo, i) => (
          <button
            key={photo.src}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`View ${photo.title}`}
            className={`group relative overflow-hidden rounded-xl border border-white/[0.08] bg-surface text-left ${
              i === 0 ? 'lg:col-span-2 lg:row-span-2' : ''
            } ${photo.wide ? 'lg:col-span-2' : ''}`}
          >
            <Image
              src={photo.src}
              alt={photo.title}
              fill
              sizes={
                i === 0 || photo.wide
                  ? '(min-width: 1024px) 740px, 100vw'
                  : '(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw'
              }
              className="object-cover object-[50%_35%] transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <span className="absolute right-3 top-3 rounded-full bg-black/50 p-1.5 text-white opacity-0 transition-opacity group-hover:opacity-100">
              <Expand size={14} />
            </span>
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 pt-12">
              <span className="block text-sm font-medium text-white">{photo.title}</span>
              <span className="mt-0.5 block text-xs leading-relaxed text-zinc-300">{photo.caption}</span>
            </span>
          </button>
        ))}
      </div>

      {index !== null && (
        <Lightbox
          item={GALLERY[index]}
          onClose={() => setIndex(null)}
          onPrev={() => step(-1)}
          onNext={() => step(1)}
        />
      )}
    </section>
  )
}
