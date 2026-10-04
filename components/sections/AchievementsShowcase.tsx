'use client'
// components/sections/AchievementsShowcase.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Achievements & Awards Showcase:
// - Infinite scrolling marquee with auto-pause on hover
// - Interactive click-and-drag / touch-swipe to freely move cards left or right
// - Touching/clicking any card opens a comprehensive in-depth explanation modal
// - No mode buttons, slider controls, or grid toggles
// ─────────────────────────────────────────────────────────────────────────────
import { useState, useRef, useEffect, useCallback } from 'react'
import type { Achievement } from '@/lib/types'
import AchievementBadge from '@/components/ui/AchievementBadge'
import AchievementDetailModal from '@/components/ui/AchievementDetailModal'
import { Database } from 'lucide-react'

interface AchievementsShowcaseProps {
  achievements: Achievement[]
}

export default function AchievementsShowcase({ achievements }: AchievementsShowcaseProps) {
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  const isPausedRef = useRef(false)
  const isDraggingRef = useRef(false)
  const startXRef = useRef(0)
  const startScrollLeftRef = useRef(0)
  const hasMovedRef = useRef(false)
  const singleSetWidthRef = useRef(0)

  if (!achievements || achievements.length === 0) return null

  // Ensure enough copies so wrapping is seamless in both directions
  const duplicateMultiplier = Math.max(4, Math.ceil(12 / achievements.length))
  const duplicatedAchievements = Array.from({ length: duplicateMultiplier }, () => achievements).flat()

  // Measure the exact pixel width of one complete set of achievements
  const measureSetWidth = useCallback(() => {
    if (!trackRef.current || achievements.length === 0) return
    const children = trackRef.current.children
    if (children.length >= achievements.length * 2) {
      const firstCard = children[0] as HTMLElement
      const nextSetCard = children[achievements.length] as HTMLElement
      if (firstCard && nextSetCard) {
        const width = nextSetCard.offsetLeft - firstCard.offsetLeft
        if (width > 0) {
          singleSetWidthRef.current = width
        }
      }
    }
  }, [achievements.length])

  // Setup loop and initial scroll position
  useEffect(() => {
    measureSetWidth()
    const container = containerRef.current
    if (container && singleSetWidthRef.current > 0) {
      if (container.scrollLeft === 0) {
        container.scrollLeft = singleSetWidthRef.current
      }
    }

    const handleResize = () => {
      measureSetWidth()
    }
    window.addEventListener('resize', handleResize)

    // Smooth frame-rate independent auto-scroll loop
    let animId: number
    let lastTime = performance.now()
    const scrollSpeed = 34 // pixels per second

    const animate = (currentTime: number) => {
      const dt = (currentTime - lastTime) / 1000
      lastTime = currentTime

      const cont = containerRef.current
      const W = singleSetWidthRef.current

      if (cont && W > 0) {
        if (!isPausedRef.current && !isDraggingRef.current) {
          cont.scrollLeft += scrollSpeed * dt
        }

        // Seamless wrap in both directions
        if (cont.scrollLeft >= 2 * W) {
          cont.scrollLeft -= W
        } else if (cont.scrollLeft <= 0) {
          cont.scrollLeft += W
        }
      }

      animId = requestAnimationFrame(animate)
    }

    animId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', handleResize)
    }
  }, [achievements.length, measureSetWidth])

  // Mouse drag handling (desktop)
  const handleMouseEnter = () => {
    isPausedRef.current = true
  }

  const handleMouseLeave = () => {
    if (!isDraggingRef.current) {
      isPausedRef.current = false
    }
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true
    setIsDragging(true)
    isPausedRef.current = true
    startXRef.current = e.pageX
    startScrollLeftRef.current = containerRef.current ? containerRef.current.scrollLeft : 0
    hasMovedRef.current = false
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !containerRef.current) return
    const dx = e.pageX - startXRef.current
    if (Math.abs(dx) > 4) {
      hasMovedRef.current = true
    }
    containerRef.current.scrollLeft = startScrollLeftRef.current - dx

    const W = singleSetWidthRef.current
    if (W > 0) {
      if (containerRef.current.scrollLeft >= 2 * W) {
        containerRef.current.scrollLeft -= W
        startXRef.current = e.pageX
        startScrollLeftRef.current = containerRef.current.scrollLeft
      } else if (containerRef.current.scrollLeft <= 0) {
        containerRef.current.scrollLeft += W
        startXRef.current = e.pageX
        startScrollLeftRef.current = containerRef.current.scrollLeft
      }
    }
  }

  const handleMouseUp = () => {
    isDraggingRef.current = false
    setIsDragging(false)
  }

  // Touch drag handling (mobile)
  const handleTouchStart = (e: React.TouchEvent) => {
    isDraggingRef.current = true
    isPausedRef.current = true
    startXRef.current = e.touches[0].pageX
    startScrollLeftRef.current = containerRef.current ? containerRef.current.scrollLeft : 0
    hasMovedRef.current = false
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current || !containerRef.current) return
    const dx = e.touches[0].pageX - startXRef.current
    if (Math.abs(dx) > 4) {
      hasMovedRef.current = true
    }
    containerRef.current.scrollLeft = startScrollLeftRef.current - dx

    const W = singleSetWidthRef.current
    if (W > 0) {
      if (containerRef.current.scrollLeft >= 2 * W) {
        containerRef.current.scrollLeft -= W
        startXRef.current = e.touches[0].pageX
        startScrollLeftRef.current = containerRef.current.scrollLeft
      } else if (containerRef.current.scrollLeft <= 0) {
        containerRef.current.scrollLeft += W
        startXRef.current = e.touches[0].pageX
        startScrollLeftRef.current = containerRef.current.scrollLeft
      }
    }
  }

  const handleTouchEnd = () => {
    isDraggingRef.current = false
    setIsDragging(false)
    setTimeout(() => {
      isPausedRef.current = false
    }, 1500)
  }

  // Card click handler: open detail modal only if user was not actively dragging
  const handleCardClick = (ach: Achievement) => {
    if (!hasMovedRef.current) {
      setSelectedAchievement(ach)
    }
  }

  return (
    <>
      <section
        id="achievements"
        style={{
          padding: 'clamp(48px, 8vw, 96px) 0',
          background: 'rgba(13,13,20,0.5)',
          width: '100%',
          position: 'relative',
          overflow: 'hidden',
          borderTop: '1px solid rgba(255,255,255,0.04)',
          borderBottom: '1px solid rgba(255,255,255,0.04)',
        }}
      >
        {/* Section Header — Clean without mode or control buttons */}
        <div
          style={{
            maxWidth: '1000px',
            margin: '0 auto 36px',
            padding: '0 clamp(16px, 4vw, 24px)',
            textAlign: 'center',
          }}
        >
          {/* Section Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: '20px',
              background: 'rgba(245,158,11,0.1)',
              border: '1px solid rgba(245,158,11,0.2)',
              marginBottom: '16px',
            }}
          >
            <Database size={13} color="#f59e0b" />
            <span
              style={{
                color: '#f59e0b',
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                fontFamily: 'JetBrains Mono, monospace',
              }}
            >
              Recognition
            </span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(26px, 4.5vw, 40px)',
              fontWeight: 800,
              color: '#f1f5f9',
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
            }}
          >
            Achievements & <span className="gradient-text-amber">Awards</span>
          </h2>
          <p
            style={{
              color: '#64748b',
              fontSize: '14px',
              marginTop: '10px',
              maxWidth: '520px',
              margin: '10px auto 0',
              lineHeight: 1.6,
            }}
          >
            Competitive hackathons, academic research recognition, and global machine learning benchmarks.
          </p>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              marginTop: '16px',
              padding: '4px 12px',
              borderRadius: '16px',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              color: '#94a3b8',
              fontSize: '11px',
              fontFamily: 'JetBrains Mono, monospace',
            }}
          >
            <span>Hover to pause · Drag left or right · Tap any card for full details</span>
          </div>
        </div>

        {/* ── Interactive Draggable Infinite Marquee ──────────────────────── */}
        <div className="draggable-marquee-wrapper">
          <div
            ref={containerRef}
            className={`draggable-marquee-container ${isDragging ? 'is-dragging' : ''}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div ref={trackRef} className="draggable-marquee-track">
              {duplicatedAchievements.map((ach, i) => (
                <div
                  key={`marquee-ach-${ach.id}-${i}`}
                  className="marquee-achievement-card"
                  style={{ userSelect: 'none' }}
                >
                  <AchievementBadge
                    achievement={ach}
                    index={i}
                    animateIn={false}
                    onClick={() => handleCardClick(ach)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Detail Explanation Modal */}
      <AchievementDetailModal
        achievement={selectedAchievement}
        onClose={() => setSelectedAchievement(null)}
      />
    </>
  )
}
