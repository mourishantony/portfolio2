'use client'
// components/ui/Lightbox.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Full-size image viewer with title + caption underneath.
// Closes on Escape / backdrop click; ←/→ step through when onPrev/onNext given.
// ─────────────────────────────────────────────────────────────────────────────
import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

export interface LightboxItem {
  src: string
  width: number
  height: number
  title: string
  caption: string
}

export default function Lightbox({
  item,
  onClose,
  onPrev,
  onNext,
}: {
  item: LightboxItem
  onClose: () => void
  onPrev?: () => void
  onNext?: () => void
}) {
  // Keyboard controls + lock background scroll while open
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowLeft') onPrev?.()
      else if (e.key === 'ArrowRight') onNext?.()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose, onPrev, onNext])

  // Swipe left/right on touch screens
  const touchX = useRef<number | null>(null)
  const onTouchStart = (e: React.TouchEvent) => (touchX.current = e.touches[0].clientX)
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null) return
    const dx = e.changedTouches[0].clientX - touchX.current
    touchX.current = null
    if (dx > 50) onPrev?.()
    else if (dx < -50) onNext?.()
  }

  // Phones: arrows sit below the photo; larger screens: vertically centred
  const navBtn =
    'absolute bottom-6 z-10 rounded-full sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 border border-white/20 bg-black/60 p-2 text-white hover:bg-white/10'

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      onClick={onClose}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      className="animate-lightbox fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 pb-24 backdrop-blur-sm sm:p-8"
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute right-4 top-4 z-10 rounded-full border border-white/20 bg-black/60 p-2 text-white hover:bg-white/10"
      >
        <X size={20} />
      </button>
      {onPrev && (
        <button
          type="button"
          aria-label="Previous"
          onClick={(e) => {
            e.stopPropagation()
            onPrev()
          }}
          className={`${navBtn} left-3`}
        >
          <ChevronLeft size={22} />
        </button>
      )}
      {onNext && (
        <button
          type="button"
          aria-label="Next"
          onClick={(e) => {
            e.stopPropagation()
            onNext()
          }}
          className={`${navBtn} right-3`}
        >
          <ChevronRight size={22} />
        </button>
      )}

      <figure className="flex max-h-full max-w-5xl flex-col items-center" onClick={(e) => e.stopPropagation()}>
        <Image
          key={item.src}
          src={item.src}
          alt={item.title}
          width={item.width}
          height={item.height}
          sizes="90vw"
          loading="eager"
          className="animate-zoom-in max-h-[70vh] w-auto rounded-lg object-contain sm:max-h-[78vh]"
        />
        <figcaption className="mt-4 max-w-2xl text-center">
          <p className="text-base font-semibold text-white">{item.title}</p>
          <p className="mt-1 text-sm text-zinc-300">{item.caption}</p>
        </figcaption>
      </figure>
    </div>
  )
}
