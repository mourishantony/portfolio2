'use client'
// components/sections/HeroCTA.tsx
// Client component for interactive hero buttons with hover effects
import { ArrowRight, Activity } from 'lucide-react'

export default function HeroCTA() {
  return (
    <div
      style={{
        display: 'flex',
        gap: '16px',
        justifyContent: 'center',
        flexWrap: 'wrap',
        animation: 'fade-up 0.6s ease-out 0.4s forwards',
        opacity: 0,
      }}
    >
      <a
        href="#projects"
        id="hero-view-projects"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '14px 28px',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          color: 'white',
          fontWeight: 700,
          fontSize: '15px',
          textDecoration: 'none',
          boxShadow: '0 0 32px rgba(99,102,241,0.3)',
          transition: 'box-shadow 0.2s, transform 0.2s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = '0 0 48px rgba(99,102,241,0.5)'
          e.currentTarget.style.transform = 'translateY(-2px)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = '0 0 32px rgba(99,102,241,0.3)'
          e.currentTarget.style.transform = 'translateY(0)'
        }}
      >
        View Projects <ArrowRight size={16} />
      </a>
      <a
        href="/dashboard"
        id="hero-view-dashboard"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '14px 28px',
          borderRadius: '12px',
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.1)',
          color: '#94a3b8',
          fontWeight: 600,
          fontSize: '15px',
          textDecoration: 'none',
          transition: 'border-color 0.2s, color 0.2s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'rgba(99,102,241,0.4)'
          e.currentTarget.style.color = '#e2e8f0'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
          e.currentTarget.style.color = '#94a3b8'
        }}
      >
        <Activity size={16} />
        MLOps Dashboard
      </a>
    </div>
  )
}
