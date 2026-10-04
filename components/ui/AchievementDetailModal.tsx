'use client'
// components/ui/AchievementDetailModal.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Modal dialog displaying comprehensive explanation of an achievement/award
// Triggered when a user clicks/touches any achievement badge in the marquee
// ─────────────────────────────────────────────────────────────────────────────
import { useEffect } from 'react'
import type { Achievement } from '@/lib/types'
import { X, Trophy, Medal, Award, Star, Calendar, Sparkles } from 'lucide-react'

const BADGE_CONFIG = {
  gold:   { icon: Trophy, color: '#f59e0b', bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.3)', label: '🥇 Gold Award / 1st Place' },
  silver: { icon: Medal,  color: '#94a3b8', bg: 'rgba(148,163,184,0.12)', border: 'rgba(148,163,184,0.3)', label: '🥈 Silver Medal / Top Benchmark' },
  bronze: { icon: Award,  color: '#cd7c3d', bg: 'rgba(205,124,61,0.12)',  border: 'rgba(205,124,61,0.3)',  label: '🥉 Bronze Honors' },
  award:  { icon: Star,   color: '#8b5cf6', bg: 'rgba(139,92,246,0.12)', border: 'rgba(139,92,246,0.3)', label: '🏆 Academic / Research Recognition' },
}

interface AchievementDetailModalProps {
  achievement: Achievement | null
  onClose: () => void
}

export default function AchievementDetailModal({ achievement, onClose }: AchievementDetailModalProps) {
  useEffect(() => {
    if (!achievement) return

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
  }, [achievement, onClose])

  if (!achievement) return null

  const config = BADGE_CONFIG[achievement.badge_type] ?? BADGE_CONFIG.award
  const Icon = config.icon

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-achievement-title"
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
          maxWidth: '620px',
          maxHeight: '90vh',
          overflowY: 'auto',
          backgroundColor: '#0d0d14',
          border: `1px solid ${config.border}`,
          borderRadius: '24px',
          boxShadow: `0 24px 60px rgba(0, 0, 0, 0.7), 0 0 40px ${config.color}20`,
          padding: 'clamp(24px, 5vw, 36px)',
          display: 'flex',
          flexDirection: 'column',
          gap: '22px',
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
            background: `linear-gradient(90deg, transparent, ${config.color}, transparent)`,
          }}
        />

        {/* Top bar: Badge Label + Close Button */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '5px 14px',
              borderRadius: '20px',
              background: config.bg,
              border: `1px solid ${config.border}`,
              color: config.color,
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
            }}
          >
            <Icon size={14} color={config.color} />
            <span>{config.label}</span>
          </div>

          <button
            onClick={onClose}
            aria-label="Close achievement details"
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

        {/* Big Icon + Title Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
          <div
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '14px',
              background: `${config.color}25`,
              border: `1.5px solid ${config.color}50`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              boxShadow: `0 0 20px ${config.color}30`,
            }}
          >
            <Icon size={26} color={config.color} />
          </div>

          <div>
            <h2
              id="modal-achievement-title"
              style={{
                fontSize: 'clamp(20px, 4vw, 24px)',
                fontWeight: 800,
                color: '#f8fafc',
                lineHeight: 1.3,
                marginBottom: '6px',
              }}
            >
              {achievement.title}
            </h2>

            {achievement.date && (
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#94a3b8', fontSize: '13px', fontFamily: 'JetBrains Mono, monospace' }}>
                <Calendar size={13} color={config.color} />
                <span>
                  {new Date(achievement.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Full Detailed Description */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '16px',
            padding: '20px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px', color: config.color, fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            <Sparkles size={13} />
            <span>Achievement Scope & Impact</span>
          </div>

          <p
            style={{
              color: '#cbd5e1',
              fontSize: '15px',
              lineHeight: 1.8,
              whiteSpace: 'pre-line',
              margin: 0,
            }}
          >
            {achievement.description || 'Awarded in recognition of exceptional machine learning system engineering and implementation.'}
          </p>
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '12px' }}>
          <button
            onClick={onClose}
            style={{
              padding: '10px 22px',
              borderRadius: '10px',
              background: `${config.color}15`,
              border: `1px solid ${config.color}40`,
              color: config.color,
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = `${config.color}25`
              e.currentTarget.style.borderColor = `${config.color}70`
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = `${config.color}15`
              e.currentTarget.style.borderColor = `${config.color}40`
            }}
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  )
}
