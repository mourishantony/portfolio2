'use client'
// components/ui/ProjectCard.tsx
import Link from 'next/link'
import { GitFork, ExternalLink, Cpu, Eye, Bot, Zap, Tag } from 'lucide-react'
import type { Project } from '@/lib/types'

const CATEGORY_CONFIG: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  llm:   { label: 'LLM / GenAI',    color: '#8b5cf6', icon: Bot },
  cv:    { label: 'Computer Vision', color: '#06b6d4', icon: Eye },
  mlops: { label: 'MLOps',           color: '#10b981', icon: Zap },
  rl:    { label: 'Reinforcement Learning', color: '#f59e0b', icon: Cpu },
  other: { label: 'Other',           color: '#64748b', icon: Tag },
}

interface ProjectCardProps {
  project: Project
  index: number
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const catConfig = CATEGORY_CONFIG[project.category] ?? CATEGORY_CONFIG.other
  const CatIcon = catConfig.icon

  return (
    <article
      className="glass-card"
      style={{
        borderRadius: '16px',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        animation: 'fade-up 0.5s ease-out forwards',
        animationDelay: `${index * 0.08}s`,
        opacity: 0,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Accent glow top */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, height: '2px',
        background: `linear-gradient(90deg, transparent, ${catConfig.color}, transparent)`,
        opacity: 0.6,
      }} />

      {/* Featured badge */}
      {project.featured && (
        <div style={{
          position: 'absolute',
          top: '16px', right: '16px',
          background: 'rgba(99,102,241,0.15)',
          border: '1px solid rgba(99,102,241,0.3)',
          borderRadius: '6px',
          padding: '2px 8px',
          fontSize: '11px',
          fontWeight: 600,
          color: '#6366f1',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
        }}>
          Featured
        </div>
      )}

      {/* Category badge */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '5px',
          padding: '4px 10px',
          borderRadius: '20px',
          background: `${catConfig.color}15`,
          border: `1px solid ${catConfig.color}30`,
          color: catConfig.color,
          fontSize: '12px',
          fontWeight: 600,
        }}>
          <CatIcon size={12} />
          {catConfig.label}
        </div>
      </div>

      {/* Title & Description */}
      <div>
        <h3 style={{ color: '#e2e8f0', fontSize: '17px', fontWeight: 700, marginBottom: '8px', lineHeight: 1.3 }}>
          {project.title}
        </h3>
        <p style={{ color: '#64748b', fontSize: '13px', lineHeight: 1.7 }}>
          {project.description}
        </p>
      </div>

      {/* Metrics summary */}
      {project.metrics_summary && (
        <div style={{
          background: 'rgba(16,185,129,0.06)',
          border: '1px solid rgba(16,185,129,0.15)',
          borderRadius: '8px',
          padding: '10px 12px',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '12px',
          color: '#10b981',
          lineHeight: 1.5,
        }}>
          <span style={{ color: '#475569', marginRight: '6px' }}>$</span>
          {project.metrics_summary}
        </div>
      )}

      {/* Tech Stack */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
        {project.tech_stack.map((tech) => (
          <span
            key={tech}
            style={{
              padding: '3px 10px',
              borderRadius: '6px',
              background: 'rgba(99,102,241,0.08)',
              border: '1px solid rgba(99,102,241,0.15)',
              color: '#94a3b8',
              fontSize: '11px',
              fontWeight: 500,
              fontFamily: 'JetBrains Mono, monospace',
              letterSpacing: '0.02em',
            }}
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Links */}
      <div style={{ display: 'flex', gap: '10px', marginTop: 'auto' }}>
        {project.github_url && (
          <a
            href={project.github_url}
            target="_blank"
            rel="noopener noreferrer"
            id={`project-github-${project.id}`}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              padding: '8px 14px',
              borderRadius: '8px',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: '#94a3b8',
              textDecoration: 'none',
              fontSize: '12px',
              fontWeight: 600,
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#e2e8f0'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#94a3b8'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
            }}
          >
            <GitFork size={13} />
            Code
          </a>
        )}
        {project.live_demo_url && (
          <a
            href={project.live_demo_url}
            target="_blank"
            rel="noopener noreferrer"
            id={`project-demo-${project.id}`}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              padding: '8px 14px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(139,92,246,0.2))',
              border: '1px solid rgba(99,102,241,0.3)',
              color: '#818cf8',
              textDecoration: 'none',
              fontSize: '12px',
              fontWeight: 600,
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#a5b4fc'
              e.currentTarget.style.borderColor = 'rgba(99,102,241,0.6)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#818cf8'
              e.currentTarget.style.borderColor = 'rgba(99,102,241,0.3)'
            }}
          >
            <ExternalLink size={13} />
            Live Demo
          </a>
        )}
      </div>
    </article>
  )
}
