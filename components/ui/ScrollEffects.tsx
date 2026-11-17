'use client'
// components/ui/ScrollEffects.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Scroll progress bar + reveal-on-scroll for every section below the fold.
// Targets each section's direct children and the items of its grids/lists,
// staggering siblings. Uses data attributes so React re-renders don't undo it,
// and only hides elements that start below the viewport (no flash on load).
// ─────────────────────────────────────────────────────────────────────────────
import { useEffect, useRef } from 'react'

const TARGETS = 'section[id] > *, section[id] .grid > *, section[id] ol > li, section[id] ul > li'

export default function ScrollEffects() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // ── Progress bar ──
    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight
        if (barRef.current) barRef.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    // ── Reveal on scroll ──
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let observer: IntersectionObserver | undefined
    const pending = new Set<HTMLElement>()
    if (!reduce && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          // Stagger siblings that enter together (e.g. a row of cards)
          const batch = new Map<Element | null, number>()
          for (const e of entries) {
            if (!e.isIntersecting) continue
            const el = e.target as HTMLElement
            const n = batch.get(el.parentElement) ?? 0
            batch.set(el.parentElement, n + 1)
            el.style.setProperty('--reveal-delay', `${Math.min(n, 5) * 90}ms`)
            el.dataset.reveal = 'shown'
            pending.delete(el)
            observer?.unobserve(el)
          }
          // Anything jumped past (nav link, fast scroll) shows without animating
          for (const el of pending) {
            if (el.getBoundingClientRect().bottom >= 0) continue
            el.dataset.reveal = 'done'
            pending.delete(el)
            observer?.unobserve(el)
          }
        },
        { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
      )
      const fold = window.innerHeight
      document.querySelectorAll<HTMLElement>(TARGETS).forEach((el) => {
        if (el.dataset.reveal || el.getBoundingClientRect().top < fold) return
        el.dataset.reveal = 'hidden'
        pending.add(el)
        observer!.observe(el)
      })
    }

    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
      observer?.disconnect()
      // Never leave content hidden if this unmounts mid-scroll
      document.querySelectorAll<HTMLElement>('[data-reveal="hidden"]').forEach((el) => (el.dataset.reveal = 'shown'))
    }
  }, [])

  return (
    <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5">
      <div
        ref={barRef}
        className="h-full origin-left bg-gradient-to-r from-violet-500 via-fuchsia-400 to-sky-400 shadow-[0_0_12px_rgba(167,139,250,0.8)]"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  )
}
