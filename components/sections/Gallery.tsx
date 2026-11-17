// components/sections/Gallery.tsx
// Photo highlights from hackathons and events (data in lib/profile.ts)
import Image from 'next/image'
import SectionHeading from '@/components/ui/SectionHeading'
import { GALLERY } from '@/lib/profile'

export default function Gallery() {
  if (GALLERY.length === 0) return null

  return (
    <section id="gallery" className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
      <SectionHeading
        eyebrow="Gallery"
        title="On stage and in the room."
        description="Hackathon finals, project showcases and the teams I've built with."
      />

      {/* First photo is the large feature tile; last (a wide group shot) spans two columns */}
      <div className="grid auto-rows-[240px] gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:auto-rows-[220px]">
        {GALLERY.map((photo, i) => (
          <figure
            key={photo.src}
            className={`group relative overflow-hidden rounded-xl border border-white/[0.08] bg-surface ${
              i === 0 ? 'lg:col-span-2 lg:row-span-2' : ''
            } ${i === GALLERY.length - 1 ? 'lg:col-span-2' : ''}`}
          >
            <Image
              src={photo.src}
              alt={photo.title}
              fill
              sizes={i === 0 ? '(min-width: 1024px) 740px, 100vw' : '(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw'}
              className="object-cover object-[50%_35%] transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 pt-12">
              <p className="text-sm font-medium text-white">{photo.title}</p>
              <p className="mt-0.5 text-xs leading-relaxed text-zinc-300">{photo.caption}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
