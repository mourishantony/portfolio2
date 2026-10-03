// app/page.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Home page — Server Component
// Fetches projects + achievements from Supabase server-side (no cache)
// ─────────────────────────────────────────────────────────────────────────────
import type { Metadata } from 'next'
import { serverClient } from '@/lib/supabase'
import type { Project, Achievement } from '@/lib/types'
import { MOCK_PROJECTS, MOCK_ACHIEVEMENTS } from '@/lib/mock-data'
import ProjectCard from '@/components/ui/ProjectCard'
import AchievementBadge from '@/components/ui/AchievementBadge'
import {
  Brain, Cpu, Eye, Zap, ChevronDown,
  GitBranch, Server, Database, Layers, Bot, Sparkles,
} from 'lucide-react'
import HeroCTA from '@/components/sections/HeroCTA'

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

    if (error || !data || data.length === 0) {
      if (error) console.warn('[getProjects] Supabase notice (using fallback data):', error.message)
      return MOCK_PROJECTS
    }
    return (data as Project[]) ?? MOCK_PROJECTS
  } catch (err) {
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

    if (error || !data || data.length === 0) {
      if (error) console.warn('[getAchievements] Supabase notice (using fallback data):', error.message)
      return MOCK_ACHIEVEMENTS
    }
    return (data as Achievement[]) ?? MOCK_ACHIEVEMENTS
  } catch (err) {
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
          paddingTop: '80px',
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
          {/* Status pill */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              borderRadius: '20px',
              background: 'rgba(16,185,129,0.08)',
              border: '1px solid rgba(16,185,129,0.2)',
              marginBottom: '32px',
              animation: 'fade-up 0.5s ease-out forwards',
            }}
          >
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
            <span style={{ color: '#10b981', fontSize: '13px', fontWeight: 600, fontFamily: 'JetBrains Mono, monospace' }}>
              Available for opportunities
            </span>
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
        </div>

        {/* Stats bar */}
        <div
          style={{
            position: 'absolute',
            bottom: '48px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '0',
            animation: 'fade-up 0.6s ease-out 0.5s forwards',
            opacity: 0,
          }}
        >
          {STATS.map(({ value, label }, i) => (
            <div
              key={label}
              style={{
                padding: '12px 32px',
                textAlign: 'center',
                borderRight: i < STATS.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
              }}
            >
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
              <div style={{ color: '#475569', fontSize: '12px', marginTop: '4px' }}>
                {label}
              </div>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div
          style={{
            position: 'absolute',
            bottom: '16px',
            left: '50%',
            transform: 'translateX(-50%)',
            animation: 'float 2s ease-in-out infinite',
            color: '#334155',
          }}
        >
          <ChevronDown size={20} />
        </div>
      </section>

      {/* ═══════════════════════════ PROJECTS ═══════════════════════════ */}
      <section
        id="projects"
        style={{ padding: 'clamp(64px, 10vw, 120px) 24px', maxWidth: '1200px', margin: '0 auto' }}
      >
        {/* Section header */}
        <div style={{ marginBottom: '56px', textAlign: 'center' }}>
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
            Built for Scale
          </h2>
          <p style={{ color: '#64748b', fontSize: '15px', marginTop: '12px', maxWidth: '540px', margin: '12px auto 0' }}>
            End-to-end ML systems from research prototype to production — handling millions of inferences.
          </p>
        </div>

        {/* Projects Grid or Empty State */}
        {projects.length === 0 ? (
          <EmptyProjectsState />
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
              gap: '24px',
            }}
          >
            {projects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        )}
      </section>

      {/* ═══════════════════════════ ACHIEVEMENTS ════════════════════════ */}
      {(achievements.length > 0) && (
        <section
          id="achievements"
          style={{ padding: 'clamp(48px, 8vw, 96px) 24px', background: 'rgba(13,13,20,0.5)' }}
        >
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ marginBottom: '48px', textAlign: 'center' }}>
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
                }}
              >
                Achievements & Awards
              </h2>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '16px',
              }}
            >
              {achievements.map((ach, i) => (
                <AchievementBadge key={ach.id} achievement={ach} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}

// ── Empty state shown when DB has no projects yet ─────────────────────────
function EmptyProjectsState() {
  return (
    <div
      style={{
        textAlign: 'center',
        padding: '80px 24px',
        border: '1px dashed rgba(99,102,241,0.2)',
        borderRadius: '20px',
        background: 'rgba(99,102,241,0.03)',
      }}
    >
      <div
        style={{
          width: 64, height: 64,
          borderRadius: '16px',
          background: 'rgba(99,102,241,0.1)',
          border: '1px solid rgba(99,102,241,0.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 24px',
        }}
      >
        <Brain size={28} color="#6366f1" />
      </div>
      <h3 style={{ color: '#e2e8f0', fontSize: '20px', fontWeight: 700, marginBottom: '8px' }}>
        No projects yet
      </h3>
      <p style={{ color: '#475569', fontSize: '14px', maxWidth: '360px', margin: '0 auto 24px' }}>
        Add your first project via the admin panel. It will appear here instantly — no redeploy needed.
      </p>
      <a
        href="/paapu"
        style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          padding: '10px 20px',
          borderRadius: '8px',
          background: 'rgba(99,102,241,0.1)',
          border: '1px solid rgba(99,102,241,0.25)',
          color: '#818cf8',
          textDecoration: 'none',
          fontSize: '14px',
          fontWeight: 600,
        }}
      >
        <Zap size={14} />
        Add First Project
      </a>
    </div>
  )
}
