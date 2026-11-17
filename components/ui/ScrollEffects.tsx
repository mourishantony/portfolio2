'use client'
// components/ui/ScrollEffects.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Scroll progress bar + reveal-on-scroll for every section below the fold.
// Targets each section's direct children and the items of its grids/lists,
// staggering siblings. Replays whenever content scrolls back in from below.
// Uses data attributes so React re-renders don't undo it, and never hides
// elements already on screen at load (no flash).
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

    // ── Reveal on scroll (replays every time content enters from below) ──
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const observers: IntersectionObserver[] = []
    if (!reduce && 'IntersectionObserver' in window) {
      // Show: element is meaningfully inside the viewport
      const show = new IntersectionObserver(
        (entries) => {
          // Stagger siblings that enter together (e.g. a row of cards)
          const batch = new Map<Element | null, number>()
          for (const e of entries) {
            const el = e.target as HTMLElement
            if (!e.isIntersecting || el.dataset.reveal !== 'hidden') continue
            const n = batch.get(el.parentElement) ?? 0
            batch.set(el.parentElement, n + 1)
            el.style.setProperty('--reveal-delay', `${Math.min(n, 5) * 90}ms`)
            el.dataset.reveal = 'shown'
          }
        },
        { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
      )
      // Reset: element has fully left through the bottom (user scrolled back up),
      // so it animates again on the next scroll down. Leaving through the top
      // keeps it visible, so scrolling up never shows empty space.
      const reset = new IntersectionObserver((entries) => {
        for (const e of entries) {
          if (e.isIntersecting || e.boundingClientRect.top <= 0) continue
          ;(e.target as HTMLElement).dataset.reveal = 'hidden'
        }
      })
      observers.push(show, reset)

      const fold = window.innerHeight
      document.querySelectorAll<HTMLElement>(TARGETS).forEach((el) => {
        if (el.dataset.reveal) return
        el.dataset.reveal = el.getBoundingClientRect().top < fold ? 'shown' : 'hidden'
        show.observe(el)
        reset.observe(el)
      })
    }

    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
      observers.forEach((o) => o.disconnect())
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
