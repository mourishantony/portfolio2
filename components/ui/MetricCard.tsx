// components/ui/MetricCard.tsx
import type { LucideIcon } from 'lucide-react'

interface MetricCardProps {
  title: string
  value: string
  subtitle?: string
  icon: LucideIcon
  iconColor?: string
  trend?: { value: string; positive: boolean }
  index?: number
}

export default function MetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconColor = '#6366f1',
  trend,
  index = 0,
}: MetricCardProps) {
  return (
    <div
      className="glass-card"
      style={{
        borderRadius: '14px',
        padding: '24px',
        animation: 'fade-up 0.5s ease-out forwards',
        animationDelay: `${index * 0.1}s`,
        opacity: 0,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background glow */}
      <div style={{
        position: 'absolute',
        bottom: '-20px', right: '-20px',
        width: '80px', height: '80px',
        borderRadius: '50%',
        background: `${iconColor}18`,
        filter: 'blur(20px)',
        pointerEvents: 'none',
      }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
        <div style={{
          width: 40, height: 40,
          background: `${iconColor}18`,
          border: `1px solid ${iconColor}30`,
          borderRadius: '10px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon size={18} color={iconColor} />
        </div>
        {trend && (
          <span style={{
            fontSize: '12px',
            fontWeight: 600,
            padding: '3px 8px',
            borderRadius: '20px',
            background: trend.positive ? 'rgba(16,185,129,0.1)' : 'rgba(244,63,94,0.1)',
            color: trend.positive ? '#10b981' : '#f43f5e',
            border: `1px solid ${trend.positive ? 'rgba(16,185,129,0.2)' : 'rgba(244,63,94,0.2)'}`,
          }}>
            {trend.positive ? '↑' : '↓'} {trend.value}
          </span>
        )}
      </div>

      <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '28px', fontWeight: 700, color: '#f1f5f9', letterSpacing: '-0.02em', lineHeight: 1 }}>
        {value}
      </div>
      <div style={{ color: '#e2e8f0', fontSize: '14px', fontWeight: 600, marginTop: '8px' }}>
        {title}
      </div>
      {subtitle && (
        <div style={{ color: '#475569', fontSize: '12px', marginTop: '4px' }}>
          {subtitle}
        </div>
      )}
    </div>
  )
}
