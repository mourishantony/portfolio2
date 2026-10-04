// app/page.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Home page — Server Component
// Fetches projects + achievements from Supabase server-side (no cache)
// ─────────────────────────────────────────────────────────────────────────────
import type { Metadata } from 'next'
import { serverClient } from '@/lib/supabase'
import type { Project, Achievement } from '@/lib/types'
import { MOCK_PROJECTS, MOCK_ACHIEVEMENTS } from '@/lib/mock-data'
import {
  Cpu, Eye, ChevronDown,
  Server, Layers, Bot, Sparkles,
} from 'lucide-react'
import HeroCTA from '@/components/sections/HeroCTA'
import ProfileSection from '@/components/sections/ProfileSection'
import ProjectsShowcase from '@/components/sections/ProjectsShowcase'
import AchievementsShowcase from '@/components/sections/AchievementsShowcase'

export const metadata: Metadata = {
  title: 'Home',
  description:
    'Mourish Antony C — Advanced ML Engineer specializing in LLMs, Generative AI, Computer Vision, MLOps, and Reinforcement Learning. View my production AI projects and achievements.',
}

// Always fetch fresh data — no stale cache
export const dynamic = 'force-dynamic'

// ── Data Fetching ─────────────────────────────────────────────────────────
async function getProjects(): Promise<Project[]> {
  try {
    const supabase = serverClient()
    if (!supabase) {
      return MOCK_PROJECTS
    }

    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('featured', { ascending: false })
      .order('created_at', { ascending: false })

    if (error) {
      console.warn('[getProjects] Supabase notice (using fallback data):', error.message)
      return MOCK_PROJECTS
    }
    return (data as Project[]) ?? []
  } catch {
    console.warn('[getProjects] Supabase fetch failed, using fallback data.')
    return MOCK_PROJECTS
  }
}

async function getAchievements(): Promise<Achievement[]> {
  try {
    const supabase = serverClient()
    if (!supabase) {
      return MOCK_ACHIEVEMENTS
    }

    const { data, error } = await supabase
      .from('achievements')
      .select('*')
      .order('date', { ascending: false })

    if (error) {
      console.warn('[getAchievements] Supabase notice (using fallback data):', error.message)
      return MOCK_ACHIEVEMENTS
    }
    return (data as Achievement[]) ?? []
  } catch {
    console.warn('[getAchievements] Supabase fetch failed, using fallback data.')
    return MOCK_ACHIEVEMENTS
  }
}

// ── Skill Pills ───────────────────────────────────────────────────────────
const SKILLS = [
  { label: 'Large Language Models', icon: Bot, color: '#8b5cf6' },
  { label: 'Generative AI', icon: Sparkles, color: '#6366f1' },
  { label: 'Computer Vision', icon: Eye, color: '#06b6d4' },
  { label: 'MLOps & Infrastructure', icon: Layers, color: '#10b981' },
  { label: 'Reinforcement Learning', icon: Cpu, color: '#f59e0b' },
  { label: 'Production AI Systems', icon: Server, color: '#f43f5e' },
]

const STATS = [
  { value: '50+', label: 'Models Deployed' },
  { value: '99.9%', label: 'Uptime SLA' },
  { value: '<80ms', label: 'Avg Inference' },
  { value: '10M+', label: 'API Requests' },
]

// ── Page ──────────────────────────────────────────────────────────────────
export default async function HomePage() {
  const [projects, achievements] = await Promise.all([
    getProjects(),
    getAchievements(),
  ])

  return (
    <>
      {/* ═══════════════════════════ HERO ═══════════════════════════════ */}
      <section
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          paddingTop: '96px',
          paddingBottom: '48px',
        }}
      >
        {/* Dot grid background */}
        <div
          className="dot-grid-bg"
          style={{ position: 'absolute', inset: 0, opacity: 0.5 }}
        />
        {/* Radial glow */}
        <div className="hero-glow" style={{ position: 'absolute', inset: 0 }} />

        {/* Animated orbs */}
        <div
          style={{
            position: 'absolute',
            top: '20%', left: '10%',
            width: 300, height: 300,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)',
            animation: 'float 8s ease-in-out infinite',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '20%', right: '10%',
            width: 250, height: 250,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)',
            animation: 'float 10s ease-in-out infinite 2s',
            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            position: 'relative',
            maxWidth: '900px',
            margin: '0 auto',
            padding: '0 24px',
            textAlign: 'center',
          }}
        >
          {/* Profile & Status pill */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              padding: '6px 16px 6px 8px',
              borderRadius: '24px',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              marginBottom: '32px',
              animation: 'fade-up 0.5s ease-out forwards',
            }}
          >
            <a
              href="#about"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                textDecoration: 'none',
              }}
            >
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  overflow: 'hidden',
                  background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1.5px solid rgba(99,102,241,0.6)',
                  boxShadow: '0 0 10px rgba(99,102,241,0.5)',
                  flexShrink: 0,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/profile.jpg"
                  alt="Mourish Antony C"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <span style={{ color: '#e2e8f0', fontSize: '13px', fontWeight: 600 }}>
                Mourish Antony C
              </span>
            </a>

            <div style={{ width: 1, height: 14, background: 'rgba(255,255,255,0.12)' }} />

            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <span
                style={{
                  width: 7, height: 7,
                  borderRadius: '50%',
                  background: '#10b981',
                  boxShadow: '0 0 8px rgba(16,185,129,0.8)',
                  animation: 'glow-pulse 2s ease-in-out infinite',
                  display: 'inline-block',
                }}
              />
              <span style={{ color: '#10b981', fontSize: '12px', fontWeight: 600, fontFamily: 'JetBrains Mono, monospace' }}>
                Available for roles
              </span>
            </div>
          </div>

          {/* Main heading */}
          <h1
            style={{
              fontSize: 'clamp(40px, 7vw, 76px)',
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: '-0.04em',
              color: '#f1f5f9',
              marginBottom: '24px',
              animation: 'fade-up 0.6s ease-out 0.1s forwards',
              opacity: 0,
            }}
          >
            Mourish Antony C
            <br />
            <span className="gradient-text">ML Engineer</span>
          </h1>

          {/* Sub-heading */}
          <p
            style={{
              fontSize: 'clamp(16px, 2.5vw, 20px)',
              color: '#64748b',
              lineHeight: 1.7,
              maxWidth: '680px',
              margin: '0 auto 40px',
              animation: 'fade-up 0.6s ease-out 0.2s forwards',
              opacity: 0,
            }}
          >
            Building production-grade AI systems at scale — from fine-tuned LLMs
            to real-time computer vision pipelines and distributed MLOps infrastructure.
          </p>

          {/* Skill pills */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px',
              justifyContent: 'center',
              marginBottom: '48px',
              animation: 'fade-up 0.6s ease-out 0.3s forwards',
              opacity: 0,
            }}
          >
            {SKILLS.map(({ label, icon: Icon, color }) => (
              <div
                key={label}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '7px',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  background: `${color}10`,
                  border: `1px solid ${color}25`,
                  color: color,
                  fontSize: '13px',
                  fontWeight: 600,
                }}
              >
                <Icon size={13} />
                {label}
              </div>
            ))}
          </div>

          {/* CTA Buttons — client component for interactivity */}
          <HeroCTA />

          {/* Stats bar — in natural flow below CTA buttons */}
          <div className="hero-stats-container">
            {STATS.map(({ value, label }) => (
              <div key={label} className="hero-stat-item">
                <div
                  style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '22px',
                    fontWeight: 700,
                    color: '#6366f1',
                    lineHeight: 1,
                  }}
                >
                  {value}
                </div>
                <div style={{ color: '#64748b', fontSize: '12px', marginTop: '6px', whiteSpace: 'nowrap' }}>
                  {label}
                </div>
              </div>
            ))}
          </div>

          {/* Scroll indicator */}
          <div
            style={{
              marginTop: '32px',
              animation: 'float 2s ease-in-out infinite',
              color: '#334155',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <a href="#about" aria-label="Scroll to about" style={{ color: 'inherit' }}>
              <ChevronDown size={20} />
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════ ABOUT / PROFILE ══════════════════════ */}
      <ProfileSection />

      {/* ═══════════════════════════ PROJECTS ═══════════════════════════ */}
      <ProjectsShowcase projects={projects} />

      {/* ═══════════════════════════ ACHIEVEMENTS ════════════════════════ */}
      <AchievementsShowcase achievements={achievements} />
    </>
  )
}

