'use client'
// components/ui/AchievementBadge.tsx
import { Trophy, Medal, Award, Star } from 'lucide-react'
import type { Achievement } from '@/lib/types'

const BADGE_CONFIG = {
  gold:   { icon: Trophy, color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.25)', label: '🥇 Gold' },
  silver: { icon: Medal,  color: '#94a3b8', bg: 'rgba(148,163,184,0.1)', border: 'rgba(148,163,184,0.25)', label: '🥈 Silver' },
  bronze: { icon: Award,  color: '#cd7c3d', bg: 'rgba(205,124,61,0.1)',  border: 'rgba(205,124,61,0.25)',  label: '🥉 Bronze' },
  award:  { icon: Star,   color: '#8b5cf6', bg: 'rgba(139,92,246,0.1)', border: 'rgba(139,92,246,0.25)', label: '🏆 Award' },
}

interface AchievementBadgeProps {
  achievement: Achievement
  index: number
}

export default function AchievementBadge({ achievement, index }: AchievementBadgeProps) {
  const config = BADGE_CONFIG[achievement.badge_type]
  const Icon = config.icon

  return (
    <div
      style={{
        padding: '20px',
        borderRadius: '12px',
        background: config.bg,
        border: `1px solid ${config.border}`,
        display: 'flex',
        gap: '16px',
        alignItems: 'flex-start',
        animation: 'fade-up 0.5s ease-out forwards',
        animationDelay: `${index * 0.1}s`,
        opacity: 0,
        transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = config.color + '60'
        e.currentTarget.style.boxShadow = `0 0 20px ${config.color}15`
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = config.border
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      <div style={{
        width: 40, height: 40, borderRadius: '10px',
        background: `${config.color}20`,
        border: `1px solid ${config.color}40`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
      }}>
        <Icon size={18} color={config.color} />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '10px', fontWeight: 700, color: config.color, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            {config.label}
          </span>
          {achievement.date && (
            <span style={{ fontSize: '11px', color: '#475569', fontFamily: 'JetBrains Mono, monospace' }}>
              {new Date(achievement.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
            </span>
          )}
        </div>
        <h4 style={{ color: '#e2e8f0', fontSize: '15px', fontWeight: 700, marginBottom: '4px', lineHeight: 1.3 }}>
          {achievement.title}
        </h4>
        {achievement.description && (
          <p style={{ color: '#64748b', fontSize: '13px', lineHeight: 1.6 }}>
            {achievement.description}
          </p>
        )}
      </div>
    </div>
  )
}
