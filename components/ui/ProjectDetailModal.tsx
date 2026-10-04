'use client'
// components/ui/ProjectDetailModal.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Modal dialog displaying comprehensive, in-depth explanation of a project
// Triggered when a user clicks/touches any project card in the infinite marquee
// ─────────────────────────────────────────────────────────────────────────────
import { useEffect } from 'react'
import type { Project } from '@/lib/types'
import {
  X, GitFork, ExternalLink, Cpu, Eye, Bot, Zap, Tag,
  Terminal, CheckCircle2, Sparkles, Layers
} from 'lucide-react'

const CATEGORY_CONFIG: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  llm:   { label: 'LLM / GenAI', color: '#8b5cf6', icon: Bot },
  cv:    { label: 'Computer Vision', color: '#06b6d4', icon: Eye },
  mlops: { label: 'MLOps & Infrastructure', color: '#10b981', icon: Zap },
  rl:    { label: 'Reinforcement Learning', color: '#f59e0b', icon: Cpu },
  other: { label: 'Other Systems', color: '#64748b', icon: Tag },
}

interface ProjectDetailModalProps {
  project: Project | null
  onClose: () => void
}

export default function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  // Close on Escape key & freeze body scrolling when open
  useEffect(() => {
    if (!project) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [project, onClose])

  if (!project) return null

  const catConfig = CATEGORY_CONFIG[project.category] ?? CATEGORY_CONFIG.other
  const CatIcon = catConfig.icon

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        backgroundColor: 'rgba(5, 5, 8, 0.82)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        animation: 'fade-up 0.25s ease-out forwards',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '680px',
          maxHeight: '90vh',
          overflowY: 'auto',
          backgroundColor: '#0d0d14',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: '24px',
          boxShadow: `0 24px 60px rgba(0, 0, 0, 0.7), 0 0 40px ${catConfig.color}20`,
          padding: 'clamp(24px, 5vw, 36px)',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          color: '#e2e8f0',
        }}
      >
        {/* Top glowing accent bar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '3px',
            background: `linear-gradient(90deg, transparent, ${catConfig.color}, transparent)`,
          }}
        />

        {/* Modal Header: Category + Featured + Close Button */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 12px',
                borderRadius: '20px',
                background: `${catConfig.color}18`,
                border: `1px solid ${catConfig.color}40`,
                color: catConfig.color,
                fontSize: '12px',
                fontWeight: 600,
              }}
            >
              <CatIcon size={13} />
              <span>{catConfig.label}</span>
            </div>

            {project.featured && (
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '4px 10px',
                  borderRadius: '20px',
                  background: 'rgba(99, 102, 241, 0.15)',
                  border: '1px solid rgba(99, 102, 241, 0.35)',
                  color: '#818cf8',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                }}
              >
                <Sparkles size={11} />
                Featured
              </span>
            )}
          </div>

          <button
            onClick={onClose}
            aria-label="Close project details"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              color: '#94a3b8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#ffffff'
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)'
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#94a3b8'
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)'
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Project Title */}
        <div>
          <h2
            id="modal-project-title"
            style={{
              fontSize: 'clamp(22px, 4vw, 28px)',
              fontWeight: 800,
              color: '#f8fafc',
              lineHeight: 1.25,
              marginBottom: '8px',
            }}
          >
            {project.title}
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontSize: '12px', fontFamily: 'JetBrains Mono, monospace' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
            <span>Production-Grade Architecture</span>
          </div>
        </div>

        {/* Metrics Summary Pill */}
        {project.metrics_summary && (
          <div
            style={{
              background: 'rgba(16, 185, 129, 0.08)',
              border: '1px solid rgba(16, 185, 129, 0.25)',
              borderRadius: '12px',
              padding: '14px 16px',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '13px',
              color: '#34d399',
              lineHeight: 1.6,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px', color: '#10b981', fontWeight: 700, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              <Terminal size={12} />
              <span>Benchmark & Telemetry</span>
            </div>
            <div>
              <span style={{ color: '#059669', marginRight: '8px' }}>$</span>
              {project.metrics_summary}
            </div>
          </div>
        )}

        {/* In-Depth Description */}
        <div>
          <h3
            style={{
              fontSize: '13px',
              fontWeight: 700,
              color: '#94a3b8',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '10px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Layers size={14} color={catConfig.color} />
            <span>Overview & Technical Scope</span>
          </h3>
          <p
            style={{
              color: '#cbd5e1',
              fontSize: '15px',
              lineHeight: 1.75,
              whiteSpace: 'pre-line',
            }}
          >
            {project.description}
          </p>
        </div>

        {/* Core Capabilities Checklist */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            borderRadius: '14px',
            padding: '16px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
            <CheckCircle2 size={16} color={catConfig.color} style={{ marginTop: '2px', flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#f1f5f9' }}>Low-Latency Inference</div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>Optimized execution pipelines on accelerated hardware</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
            <CheckCircle2 size={16} color={catConfig.color} style={{ marginTop: '2px', flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#f1f5f9' }}>Scalable Deployment</div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>Containerized microservices built for high-concurrency traffic</div>
            </div>
          </div>
        </div>

        {/* Tech Stack Pills */}
        <div>
          <h3
            style={{
              fontSize: '13px',
              fontWeight: 700,
              color: '#94a3b8',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '10px',
            }}
          >
            Technologies & Frameworks
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {project.tech_stack.map((tech) => (
              <span
                key={tech}
                style={{
                  padding: '6px 12px',
                  borderRadius: '8px',
                  background: 'rgba(99, 102, 241, 0.08)',
                  border: '1px solid rgba(99, 102, 241, 0.2)',
                  color: '#c7d2fe',
                  fontSize: '12px',
                  fontWeight: 600,
                  fontFamily: 'JetBrains Mono, monospace',
                  letterSpacing: '0.02em',
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons Footer */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            marginTop: '8px',
            paddingTop: '20px',
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
          }}
        >
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 18px',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.14)',
                  color: '#f1f5f9',
                  textDecoration: 'none',
                  fontSize: '13px',
                  fontWeight: 600,
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)'
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)'
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.14)'
                }}
              >
                <GitFork size={15} />
                <span>View Source Code</span>
                <ExternalLink size={13} style={{ opacity: 0.7 }} />
              </a>
            )}

            {project.live_demo_url && (
              <a
                href={project.live_demo_url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 18px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                  border: '1px solid rgba(99, 102, 241, 0.5)',
                  color: '#ffffff',
                  textDecoration: 'none',
                  fontSize: '13px',
                  fontWeight: 600,
                  boxShadow: '0 4px 16px rgba(99, 102, 241, 0.35)',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-1px)'
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(99, 102, 241, 0.5)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(99, 102, 241, 0.35)'
                }}
              >
                <ExternalLink size={15} />
                <span>Launch Live Demo</span>
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            style={{
              padding: '10px 20px',
              borderRadius: '10px',
              background: 'transparent',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#94a3b8',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#ffffff'
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#94a3b8'
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'
            }}
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  )
}
