'use client'
// components/sections/ProjectsShowcase.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Production ML Projects Showcase with:
// 1. Infinite Scrolling Marquee (Pause on hover/touch, direction & speed controls)
// 2. Interactive Animated Slider (Prev/Next navigation & dot indicators)
// 3. Responsive Grid view
// ─────────────────────────────────────────────────────────────────────────────
import { useState, useRef } from 'react'
import type { Project } from '@/lib/types'
import ProjectCard from '@/components/ui/ProjectCard'
import {
  GitBranch, Play, Pause, ChevronLeft, ChevronRight,
  LayoutGrid, Sparkles, SlidersHorizontal, Brain
} from 'lucide-react'
import { GithubIcon } from '@/components/ui/SocialIcons'

interface ProjectsShowcaseProps {
  projects: Project[]
}

type ViewMode = 'marquee' | 'slider' | 'grid'

export default function ProjectsShowcase({ projects }: ProjectsShowcaseProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('marquee')
  const [isPaused, setIsPaused] = useState(false)
  const [direction, setDirection] = useState<'left' | 'right'>('left')
  const [speed, setSpeed] = useState<number>(35) // duration in seconds
  const [sliderIndex, setSliderIndex] = useState(0)

  const sliderRef = useRef<HTMLDivElement>(null)

  // Duplicate items so the marquee track has sufficient length on any screen
  const marqueeItems = getMarqueeItems(projects, 8)

  // Scroll handler for slider mode
  const scrollSlider = (direction: 'prev' | 'next') => {
    if (!sliderRef.current) return
    const container = sliderRef.current
    const cardWidth = container.querySelector('.slider-item')?.clientWidth ?? 350
    const scrollAmount = cardWidth + 20
    const newScrollLeft = direction === 'next'
      ? container.scrollLeft + scrollAmount
      : container.scrollLeft - scrollAmount

    container.scrollTo({ left: newScrollLeft, behavior: 'smooth' })
  }

  // Update slider dot index based on scroll position
  const handleSliderScroll = () => {
    if (!sliderRef.current || projects.length === 0) return
    const container = sliderRef.current
    const cardWidth = container.querySelector('.slider-item')?.clientWidth ?? 350
    const index = Math.round(container.scrollLeft / (cardWidth + 20))
    setSliderIndex(Math.min(Math.max(0, index), projects.length - 1))
  }

  if (projects.length === 0) {
    return (
      <section
        id="projects"
        style={{ padding: 'clamp(56px, 8vw, 120px) clamp(16px, 4vw, 24px)', maxWidth: '1200px', margin: '0 auto' }}
      >
        <EmptyProjectsState />
      </section>
    )
  }

  return (
    <section
      id="projects"
      style={{
        padding: 'clamp(56px, 8vw, 120px) 0',
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Section Header & View Controls Container */}
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto 40px',
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
            background: 'rgba(99,102,241,0.1)',
            border: '1px solid rgba(99,102,241,0.2)',
            marginBottom: '16px',
          }}
        >
          <GitBranch size={13} color="#6366f1" />
          <span
            style={{
              color: '#6366f1',
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              fontFamily: 'JetBrains Mono, monospace',
            }}
          >
            Production Systems
          </span>
        </div>

        <h2
          style={{
            fontSize: 'clamp(28px, 5vw, 44px)',
            fontWeight: 800,
            color: '#f1f5f9',
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
          }}
        >
          Built for <span className="gradient-text">Scale</span>
        </h2>
        <p
          style={{
            color: '#64748b',
            fontSize: '15px',
            marginTop: '12px',
            maxWidth: '540px',
            margin: '12px auto 28px',
            lineHeight: 1.6,
          }}
        >
          End-to-end ML systems from research prototype to production — handling millions of inferences.
        </p>

        {/* View Mode & Marquee Controls Bar */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            marginTop: '20px',
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
                padding: '7px 16px',
                borderRadius: '20px',
                border: 'none',
                background: viewMode === 'marquee' ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : 'transparent',
                color: viewMode === 'marquee' ? '#ffffff' : '#94a3b8',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <Sparkles size={13} />
              <span>Infinite Scroll</span>
            </button>

            <button
              onClick={() => setViewMode('slider')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '7px 16px',
                borderRadius: '20px',
                border: 'none',
                background: viewMode === 'slider' ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : 'transparent',
                color: viewMode === 'slider' ? '#ffffff' : '#94a3b8',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <SlidersHorizontal size={13} />
              <span>Slider</span>
            </button>

            <button
              onClick={() => setViewMode('grid')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '7px 16px',
                borderRadius: '20px',
                border: 'none',
                background: viewMode === 'grid' ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : 'transparent',
                color: viewMode === 'grid' ? '#ffffff' : '#94a3b8',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <LayoutGrid size={13} />
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
                  background: isPaused ? 'rgba(239,68,68,0.15)' : 'rgba(16,185,129,0.15)',
                  border: isPaused ? '1px solid rgba(239,68,68,0.3)' : '1px solid rgba(16,185,129,0.3)',
                  color: isPaused ? '#f87171' : '#34d399',
                  borderRadius: '16px',
                  padding: '5px 12px',
                  fontSize: '11px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                {isPaused ? <Play size={12} /> : <Pause size={12} />}
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
                <span>Flow: {direction === 'left' ? '←' : '→'}</span>
              </button>

              {/* Speed Switcher */}
              <button
                onClick={() => setSpeed((s) => (s === 35 ? 20 : s === 20 ? 55 : 35))}
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
                {speed === 35 ? '1x' : speed === 20 ? '1.8x' : '0.6x'}
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
              className={`marquee-track ${direction === 'left' ? 'marquee-track-left' : 'marquee-track-right'}`}
            >
              {marqueeItems.map((project, i) => (
                <div key={`track1-${project.id}-${i}`} className="marquee-project-card">
                  <ProjectCard project={project} index={i} animateIn={false} />
                </div>
              ))}
            </div>

            {/* Track 2 (Clone for infinite seamless loop) */}
            <div
              aria-hidden="true"
              className={`marquee-track ${direction === 'left' ? 'marquee-track-left' : 'marquee-track-right'}`}
            >
              {marqueeItems.map((project, i) => (
                <div key={`track2-${project.id}-${i}`} className="marquee-project-card">
                  <ProjectCard project={project} index={i} animateIn={false} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Mode 2: Interactive Animated Slider ───────────────────────────── */}
      {viewMode === 'slider' && (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 clamp(16px, 4vw, 24px)' }}>
          <div className="slider-container">
            <div className="slider-track" ref={sliderRef} onScroll={handleSliderScroll}>
              {projects.map((project, i) => (
                <div key={`slide-${project.id}`} className="slider-item">
                  <ProjectCard project={project} index={i} animateIn={false} />
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
              {projects.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to slide ${i + 1}`}
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
                    background: sliderIndex === i ? '#6366f1' : 'rgba(255,255,255,0.2)',
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
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 clamp(16px, 4vw, 24px)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '24px',
          }}
        >
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} animateIn={true} />
          ))}
        </div>
      )}
    </section>
  )
}

// ── Helpers ──────────────────────────────────────────────────────────────────
function getMarqueeItems<T>(items: T[], minCount = 8): T[] {
  if (items.length === 0) return []
  let result = [...items]
  while (result.length < minCount) {
    result = [...result, ...items]
  }
  return result
}

function EmptyProjectsState() {
  return (
    <div
      style={{
        textAlign: 'center',
        padding: '64px 24px',
        border: '1px dashed rgba(99,102,241,0.2)',
        borderRadius: '20px',
        background: 'rgba(99,102,241,0.03)',
        maxWidth: '520px',
        margin: '0 auto',
      }}
    >
      <div
        style={{
          width: 56, height: 56,
          borderRadius: '14px',
          background: 'rgba(99,102,241,0.1)',
          border: '1px solid rgba(99,102,241,0.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 20px',
        }}
      >
        <Brain size={26} color="#6366f1" />
      </div>
      <h3 style={{ color: '#e2e8f0', fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>
        Projects Updating Soon
      </h3>
      <p style={{ color: '#64748b', fontSize: '14px', maxWidth: '380px', margin: '0 auto 20px', lineHeight: 1.6 }}>
        Production ML systems and research projects are currently being prepared. In the meantime, explore my repositories on GitHub.
      </p>
      <a
        href="https://github.com/mourishantony"
        target="_blank"
        rel="noopener noreferrer"
        className="btn-github-empty"
      >
        <GithubIcon size={15} />
        View GitHub Repositories
      </a>
    </div>
  )
}
