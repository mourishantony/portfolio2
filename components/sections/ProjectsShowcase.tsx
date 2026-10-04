'use client'
// components/sections/ProjectsShowcase.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Production ML Projects Showcase:
// - Infinite scrolling marquee with auto-pause on hover
// - Interactive click-and-drag / touch-swipe to freely move cards left or right
// - Touching/clicking any card opens a comprehensive in-depth explanation modal
// - No mode buttons, slider controls, or grid toggles
// ─────────────────────────────────────────────────────────────────────────────
import { useState, useRef, useEffect, useCallback } from 'react'
import type { Project } from '@/lib/types'
import ProjectCard from '@/components/ui/ProjectCard'
import ProjectDetailModal from '@/components/ui/ProjectDetailModal'
import { GitBranch, Brain } from 'lucide-react'
import { GithubIcon } from '@/components/ui/SocialIcons'

interface ProjectsShowcaseProps {
  projects: Project[]
}

export default function ProjectsShowcase({ projects }: ProjectsShowcaseProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  const isPausedRef = useRef(false)
  const isDraggingRef = useRef(false)
  const startXRef = useRef(0)
  const startScrollLeftRef = useRef(0)
  const hasMovedRef = useRef(false)
  const singleSetWidthRef = useRef(0)

  // Ensure enough copies so wrapping is seamless in both directions
  const duplicateMultiplier = projects.length > 0 ? Math.max(4, Math.ceil(12 / projects.length)) : 1
  const duplicatedProjects = Array.from({ length: duplicateMultiplier }, () => projects).flat()

  // Measure the exact pixel width of one complete set of projects
  const measureSetWidth = useCallback(() => {
    if (!trackRef.current || projects.length === 0) return
    const children = trackRef.current.children
    if (children.length >= projects.length * 2) {
      const firstCard = children[0] as HTMLElement
      const nextSetCard = children[projects.length] as HTMLElement
      if (firstCard && nextSetCard) {
        const width = nextSetCard.offsetLeft - firstCard.offsetLeft
        if (width > 0) {
          singleSetWidthRef.current = width
        }
      }
    }
  }, [projects.length])

  // Setup loop and initial scroll position
  useEffect(() => {
    if (projects.length === 0) return

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
    const scrollSpeed = 38 // pixels per second

    const animate = (currentTime: number) => {
      const dt = (currentTime - lastTime) / 1000
      lastTime = currentTime

      const cont = containerRef.current
      const W = singleSetWidthRef.current

      if (cont && W > 0) {
        if (!isPausedRef.current && !isDraggingRef.current) {
          cont.scrollLeft += scrollSpeed * dt
        }

        // Seamless wrap in both left and right directions
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
  }, [projects.length, measureSetWidth])

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
  const handleCardClick = (project: Project) => {
    if (!hasMovedRef.current) {
      setSelectedProject(project)
    }
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
    <>
      <section
        id="projects"
        style={{
          padding: 'clamp(56px, 8vw, 110px) 0',
          width: '100%',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Section Header — Clean without mode or control buttons */}
        <div
          style={{
            maxWidth: '1200px',
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
              margin: '12px auto 0',
              lineHeight: 1.6,
            }}
          >
            End-to-end ML systems from research prototype to production — handling millions of inferences.
          </p>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              marginTop: '18px',
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
              {duplicatedProjects.map((project, i) => (
                <div
                  key={`marquee-proj-${project.id}-${i}`}
                  className="marquee-project-card"
                  style={{ userSelect: 'none' }}
                >
                  <ProjectCard
                    project={project}
                    index={i}
                    animateIn={false}
                    onClick={() => handleCardClick(project)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Detail Explanation Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  )
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
