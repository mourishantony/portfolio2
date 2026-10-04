'use client'
// components/sections/AchievementsShowcase.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Achievements & Awards Showcase with:
// 1. Infinite Scrolling Marquee (Pause on hover/touch, reverse direction)
// 2. Interactive Animated Slider (Prev/Next navigation & dot indicators)
// 3. Responsive Grid view
// ─────────────────────────────────────────────────────────────────────────────
import { useState, useRef } from 'react'
import type { Achievement } from '@/lib/types'
import AchievementBadge from '@/components/ui/AchievementBadge'
import {
  Database, Play, Pause, ChevronLeft, ChevronRight,
  LayoutGrid, Sparkles, SlidersHorizontal
} from 'lucide-react'

interface AchievementsShowcaseProps {
  achievements: Achievement[]
}

type ViewMode = 'marquee' | 'slider' | 'grid'

export default function AchievementsShowcase({ achievements }: AchievementsShowcaseProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('marquee')
  const [isPaused, setIsPaused] = useState(false)
  const [direction, setDirection] = useState<'right' | 'left'>('right') // default right for dynamic counter-scroll
  const [speed, setSpeed] = useState<number>(32) // duration in seconds
  const [sliderIndex, setSliderIndex] = useState(0)

  const sliderRef = useRef<HTMLDivElement>(null)

  if (!achievements || achievements.length === 0) return null

  // Duplicate items so the marquee track has sufficient length
  const marqueeItems = getMarqueeItems(achievements, 8)

  // Scroll handler for slider mode
  const scrollSlider = (dir: 'prev' | 'next') => {
    if (!sliderRef.current) return
    const container = sliderRef.current
    const cardWidth = container.querySelector('.slider-item')?.clientWidth ?? 320
    const scrollAmount = cardWidth + 20
    const newScrollLeft = dir === 'next'
      ? container.scrollLeft + scrollAmount
      : container.scrollLeft - scrollAmount

    container.scrollTo({ left: newScrollLeft, behavior: 'smooth' })
  }

  // Update slider dot index based on scroll position
  const handleSliderScroll = () => {
    if (!sliderRef.current || achievements.length === 0) return
    const container = sliderRef.current
    const cardWidth = container.querySelector('.slider-item')?.clientWidth ?? 320
    const index = Math.round(container.scrollLeft / (cardWidth + 20))
    setSliderIndex(Math.min(Math.max(0, index), achievements.length - 1))
  }

  return (
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
      {/* Section Header & Controls */}
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
            margin: '10px auto 24px',
            lineHeight: 1.6,
          }}
        >
          Competitive hackathons, academic research recognition, and global machine learning benchmarks.
        </p>

        {/* View Mode & Marquee Controls Bar */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            marginTop: '16px',
          }}
        >
          {/* Mode Switcher Tabs */}
          <div
            style={{
              display: 'inline-flex',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '30px',
              padding: '4px',
              gap: '4px',
            }}
          >
            <button
              onClick={() => setViewMode('marquee')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                borderRadius: '20px',
                border: 'none',
                background: viewMode === 'marquee' ? 'linear-gradient(135deg, #f59e0b, #d97706)' : 'transparent',
                color: viewMode === 'marquee' ? '#ffffff' : '#94a3b8',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <Sparkles size={12} />
              <span>Infinite Scroll</span>
            </button>

            <button
              onClick={() => setViewMode('slider')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                borderRadius: '20px',
                border: 'none',
                background: viewMode === 'slider' ? 'linear-gradient(135deg, #f59e0b, #d97706)' : 'transparent',
                color: viewMode === 'slider' ? '#ffffff' : '#94a3b8',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <SlidersHorizontal size={12} />
              <span>Slider</span>
            </button>

            <button
              onClick={() => setViewMode('grid')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                borderRadius: '20px',
                border: 'none',
                background: viewMode === 'grid' ? 'linear-gradient(135deg, #f59e0b, #d97706)' : 'transparent',
                color: viewMode === 'grid' ? '#ffffff' : '#94a3b8',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <LayoutGrid size={12} />
              <span>Grid</span>
            </button>
          </div>

          {/* Marquee Interactive Controls */}
          {viewMode === 'marquee' && (
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '24px',
                padding: '4px 10px',
              }}
            >
              {/* Play / Pause Button */}
              <button
                onClick={() => setIsPaused((prev) => !prev)}
                title={isPaused ? 'Resume auto-scroll' : 'Pause auto-scroll'}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: isPaused ? 'rgba(239,68,68,0.15)' : 'rgba(245,158,11,0.15)',
                  border: isPaused ? '1px solid rgba(239,68,68,0.3)' : '1px solid rgba(245,158,11,0.3)',
                  color: isPaused ? '#f87171' : '#fbbf24',
                  borderRadius: '16px',
                  padding: '5px 12px',
                  fontSize: '11px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                {isPaused ? <Play size={11} /> : <Pause size={11} />}
                <span>{isPaused ? 'Resume' : 'Hover to Pause'}</span>
              </button>

              {/* Direction Switcher */}
              <button
                onClick={() => setDirection((d) => (d === 'left' ? 'right' : 'left'))}
                title="Toggle scroll direction"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#94a3b8',
                  borderRadius: '16px',
                  padding: '5px 10px',
                  fontSize: '11px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                <span>Flow: {direction === 'right' ? '→' : '←'}</span>
              </button>

              {/* Speed Switcher */}
              <button
                onClick={() => setSpeed((s) => (s === 32 ? 18 : s === 18 ? 48 : 32))}
                title="Toggle speed"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#94a3b8',
                  borderRadius: '16px',
                  padding: '5px 10px',
                  fontSize: '11px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontFamily: 'JetBrains Mono, monospace',
                }}
              >
                {speed === 32 ? '1x' : speed === 18 ? '1.8x' : '0.7x'}
              </button>
            </div>
          )}

          {/* Slider Controls */}
          {viewMode === 'slider' && (
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <button
                onClick={() => scrollSlider('prev')}
                aria-label="Previous slide"
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  color: '#f1f5f9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => scrollSlider('next')}
                aria-label="Next slide"
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  color: '#f1f5f9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── Mode 1: Infinite Scrolling Marquee ────────────────────────────── */}
      {viewMode === 'marquee' && (
        <div
          className={`marquee-wrapper ${isPaused ? 'marquee-paused' : ''}`}
          style={{ '--marquee-speed': `${speed}s` } as React.CSSProperties}
        >
          <div className="marquee-content">
            {/* Track 1 */}
            <div
              className={`marquee-track ${direction === 'right' ? 'marquee-track-right' : 'marquee-track-left'}`}
            >
              {marqueeItems.map((ach, i) => (
                <div key={`ach-track1-${ach.id}-${i}`} className="marquee-achievement-card">
                  <AchievementBadge achievement={ach} index={i} animateIn={false} />
                </div>
              ))}
            </div>

            {/* Track 2 (Clone for infinite seamless loop) */}
            <div
              aria-hidden="true"
              className={`marquee-track ${direction === 'right' ? 'marquee-track-right' : 'marquee-track-left'}`}
            >
              {marqueeItems.map((ach, i) => (
                <div key={`ach-track2-${ach.id}-${i}`} className="marquee-achievement-card">
                  <AchievementBadge achievement={ach} index={i} animateIn={false} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Mode 2: Interactive Animated Slider ───────────────────────────── */}
      {viewMode === 'slider' && (
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 clamp(16px, 4vw, 24px)' }}>
          <div className="slider-container">
            <div className="slider-track" ref={sliderRef} onScroll={handleSliderScroll}>
              {achievements.map((ach, i) => (
                <div key={`ach-slide-${ach.id}`} className="slider-item">
                  <AchievementBadge achievement={ach} index={i} animateIn={false} />
                </div>
              ))}
            </div>

            {/* Indicator dots */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '8px',
                marginTop: '20px',
              }}
            >
              {achievements.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to achievement slide ${i + 1}`}
                  onClick={() => {
                    if (!sliderRef.current) return
                    const card = sliderRef.current.querySelectorAll('.slider-item')[i] as HTMLElement
                    if (card) {
                      sliderRef.current.scrollTo({ left: card.offsetLeft - 16, behavior: 'smooth' })
                    }
                  }}
                  style={{
                    width: sliderIndex === i ? '24px' : '8px',
                    height: '8px',
                    borderRadius: '4px',
                    background: sliderIndex === i ? '#f59e0b' : 'rgba(255,255,255,0.2)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Mode 3: Classic Responsive Grid ───────────────────────────────── */}
      {viewMode === 'grid' && (
        <div
          style={{
            maxWidth: '1000px',
            margin: '0 auto',
            padding: '0 clamp(16px, 4vw, 24px)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '16px',
          }}
        >
          {achievements.map((ach, i) => (
            <AchievementBadge key={ach.id} achievement={ach} index={i} animateIn={true} />
          ))}
        </div>
      )}
    </section>
  )
}

function getMarqueeItems<T>(items: T[], minCount = 8): T[] {
  if (items.length === 0) return []
  let result = [...items]
  while (result.length < minCount) {
    result = [...result, ...items]
  }
  return result
}
