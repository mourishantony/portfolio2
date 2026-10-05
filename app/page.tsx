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
  Server, Layers, Bot, Sparkles, ArrowRight,
} from 'lucide-react'
import HeroCTA from '@/components/sections/HeroCTA'
import ProfileSection from '@/components/sections/ProfileSection'
import ProjectsShowcase from '@/components/sections/ProjectsShowcase'
import AchievementsShowcase from '@/components/sections/AchievementsShowcase'
import {
  GithubIcon, LinkedinIcon, XIcon, InstagramIcon, FacebookIcon
} from '@/components/ui/SocialIcons'

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
          paddingTop: '88px',
          paddingBottom: '48px',
        }}
      >
        <style>{`
          .hero-layout-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 36px;
            align-items: center;
            width: 100%;
            max-width: 1240px;
            margin: 0 auto;
            position: relative;
            z-index: 10;
          }
          @media (min-width: 1024px) {
            .hero-layout-grid {
              grid-template-columns: 1.15fr 1fr 0.85fr;
              gap: 36px;
              align-items: center;
              text-align: left;
            }
          }
          .hero-full-name {
            white-space: nowrap !important;
            display: inline-block;
          }
          .hero-cutout-wrapper {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: flex-end;
            margin: 0 auto;
            width: 100%;
            max-width: 440px;
            height: clamp(380px, 48vw, 530px);
            z-index: 10;
          }
          .hero-cutout-aura {
            position: absolute;
            top: 4%;
            left: 50%;
            transform: translateX(-50%);
            width: min(380px, 85vw);
            height: min(380px, 85vw);
            border-radius: 50%;
            background: radial-gradient(circle, rgba(99, 102, 241, 0.45) 0%, rgba(139, 92, 246, 0.25) 45%, transparent 75%);
            filter: blur(40px);
            pointer-events: none;
            z-index: 1;
            animation: glow-pulse 4s ease-in-out infinite;
          }
          .hero-cutout-img {
            position: relative;
            z-index: 2;
            width: auto;
            max-width: 100%;
            height: 100%;
            max-height: 530px;
            object-fit: contain;
            object-position: bottom center;
            display: block;
            filter: drop-shadow(0 20px 45px rgba(0, 0, 0, 0.9)) drop-shadow(0 0 35px rgba(99, 102, 241, 0.25));
            mask-image: linear-gradient(to bottom, black 80%, transparent 100%);
            -webkit-mask-image: linear-gradient(to bottom, black 80%, transparent 100%);
          }
          .hero-floating-badge-top {
            position: absolute;
            top: 14px;
            left: 10px;
            background: rgba(13, 13, 20, 0.88);
            border: 1px solid rgba(99, 102, 241, 0.4);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border-radius: 20px;
            padding: 6px 12px;
            display: flex;
            align-items: center;
            gap: 6px;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
            z-index: 5;
          }
          .hero-floating-badge-bottom {
            position: absolute;
            bottom: 24px;
            right: 10px;
            background: rgba(13, 13, 20, 0.88);
            border: 1px solid rgba(16, 185, 129, 0.4);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border-radius: 20px;
            padding: 6px 12px;
            display: flex;
            align-items: center;
            gap: 6px;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
            z-index: 5;
          }
          .hero-bust-wrapper {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0 auto;
            width: 100%;
          }
          .hero-follow-section {
            display: flex;
            flex-direction: column;
            gap: 10px;
            margin-top: 6px;
          }
          .hero-follow-heading {
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            color: #94a3b8;
            font-family: 'JetBrains Mono', monospace;
          }
          .hero-social-list {
            display: flex;
            align-items: center;
            gap: 8px;
            flex-wrap: wrap;
          }
          .hero-social-icon-btn {
            width: 38px;
            height: 38px;
            border-radius: 10px;
            background: rgba(255, 255, 255, 0.04);
            border: 1px solid rgba(255, 255, 255, 0.08);
            display: flex;
            align-items: center;
            justify-content: center;
            color: #cbd5e1;
            text-decoration: none;
            transition: all 0.2s ease;
          }
          .hero-social-icon-btn:hover {
            background: rgba(99, 102, 241, 0.18);
            border-color: rgba(99, 102, 241, 0.5);
            color: #ffffff;
            transform: translateY(-2px);
            box-shadow: 0 4px 16px rgba(99, 102, 241, 0.35);
          }
          .hero-quick-link {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            color: #818cf8;
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 0.06em;
            text-decoration: none;
            font-family: 'JetBrains Mono', monospace;
            transition: all 0.2s ease;
            margin-top: 4px;
          }
          .hero-quick-link:hover {
            color: #a5b4fc;
            gap: 9px;
          }
        `}</style>
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
            top: '15%', left: '8%',
            width: 340, height: 340,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(99,102,241,0.14) 0%, transparent 70%)',
            animation: 'float 8s ease-in-out infinite',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '15%', right: '8%',
            width: 300, height: 300,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)',
            animation: 'float 10s ease-in-out infinite 2s',
            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '1240px',
            margin: '0 auto',
            padding: '0 24px',
            boxSizing: 'border-box',
          }}
        >
          {/* Top Status pill — centered */}
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                padding: '6px 16px 6px 8px',
                borderRadius: '24px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                animation: 'fade-up 0.5s ease-out forwards',
                maxWidth: '90vw',
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
                <span
                  style={{
                    color: '#e2e8f0',
                    fontSize: '13px',
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                  }}
                >
                  Mourish Antony&nbsp;C
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
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    color: '#10b981',
                    fontSize: '12px',
                    fontWeight: 600,
                    fontFamily: 'JetBrains Mono, monospace',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Available for roles
                </span>
              </div>
            </div>
          </div>

          {/* ── Developer X 3-Column Hero Grid ─────────────────────────── */}
          <div className="hero-layout-grid">
            {/* Left Column: Headline, Bio & CTA */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#818cf8',
                  fontSize: '13px',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  fontFamily: 'JetBrains Mono, monospace',
                }}
              >
                <span style={{ width: 24, height: 2, background: '#6366f1', display: 'inline-block' }} />
                <span>Hello, I&apos;m</span>
              </div>

              <h1
                style={{
                  fontSize: 'clamp(28px, 5.5vw, 56px)',
                  fontWeight: 900,
                  lineHeight: 1.1,
                  letterSpacing: '-0.035em',
                  color: '#f1f5f9',
                  margin: 0,
                }}
              >
                <span className="hero-full-name">Mourish Antony&nbsp;C</span>
                <br />
                <span className="gradient-text">ML Engineer</span>
              </h1>

              <p
                style={{
                  fontSize: 'clamp(14px, 1.8vw, 16px)',
                  color: '#94a3b8',
                  lineHeight: 1.7,
                  margin: 0,
                  maxWidth: '460px',
                }}
              >
                Building production-grade AI systems at scale — from fine-tuned LLMs
                to real-time computer vision pipelines and distributed MLOps infrastructure.
              </p>

              <div style={{ marginTop: '8px' }}>
                <HeroCTA />
              </div>
            </div>

            {/* Center Column: Cutout Body Display (Seamlessly overlapping with website) */}
            <div className="hero-cutout-wrapper">
              {/* Glowing Aura directly behind body */}
              <div className="hero-cutout-aura" />

              {/* Floating Top Status Badge */}
              <div className="hero-floating-badge-top">
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    background: '#10b981',
                    boxShadow: '0 0 8px #10b981',
                    display: 'inline-block',
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontSize: '11px',
                    color: '#10b981',
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    fontFamily: 'JetBrains Mono, monospace',
                    whiteSpace: 'nowrap',
                  }}
                >
                  AVAILABLE FOR ROLES
                </span>
              </div>

              {/* Transparent Cutout Body Image */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/profile-cutout.png"
                alt="Mourish Antony C — ML Engineer"
                className="hero-cutout-img"
              />

              {/* Floating Bottom Skill Pill */}
              <div className="hero-floating-badge-bottom">
                <Sparkles size={13} color="#818cf8" />
                <span
                  style={{
                    fontSize: '11px',
                    color: '#e2e8f0',
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                  }}
                >
                  Production AI & LLMs
                </span>
              </div>
            </div>

            {/* Right Column: About, My Work & Follow Me */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                justifyContent: 'center',
              }}
            >
              {/* About Me snippet */}
              <div>
                <span className="hero-follow-heading">ABOUT ME</span>
                <p
                  style={{
                    color: '#94a3b8',
                    fontSize: '13px',
                    lineHeight: 1.6,
                    margin: '8px 0 10px',
                  }}
                >
                  Full-stack Machine Learning Engineer architecting scalable deep learning systems, agentic workflows, and end-to-end MLOps pipelines.
                </p>
                <a href="#about" className="hero-quick-link">
                  LEARN MORE <ArrowRight size={13} />
                </a>
              </div>

              {/* My Work snippet */}
              <div>
                <span className="hero-follow-heading">MY WORK</span>
                <p
                  style={{
                    color: '#94a3b8',
                    fontSize: '13px',
                    lineHeight: 1.6,
                    margin: '8px 0 10px',
                  }}
                >
                  Explore live interactive models, computer vision architectures, and fine-tuned LLM microservices deployed to production.
                </p>
                <a href="#projects" className="hero-quick-link">
                  BROWSE PORTFOLIO <ArrowRight size={13} />
                </a>
              </div>

              {/* Follow Me with official brand icons */}
              <div className="hero-follow-section">
                <span className="hero-follow-heading">FOLLOW ME</span>
                <div className="hero-social-list">
                  <a
                    href="https://github.com/mourishantony"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hero-social-icon-btn"
                    aria-label="GitHub"
                    title="GitHub"
                  >
                    <GithubIcon size={17} />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/mourishantonyc/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hero-social-icon-btn"
                    aria-label="LinkedIn"
                    title="LinkedIn"
                  >
                    <LinkedinIcon size={17} />
                  </a>
                  <a
                    href="https://x.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hero-social-icon-btn"
                    aria-label="X (Twitter)"
                    title="X (Twitter)"
                  >
                    <XIcon size={16} />
                  </a>
                  <a
                    href="https://instagram.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hero-social-icon-btn"
                    aria-label="Instagram"
                    title="Instagram"
                  >
                    <InstagramIcon size={17} />
                  </a>
                  <a
                    href="https://facebook.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hero-social-icon-btn"
                    aria-label="Facebook"
                    title="Facebook"
                  >
                    <FacebookIcon size={17} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Skill pills */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px',
              justifyContent: 'center',
              marginTop: '44px',
              marginBottom: '32px',
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

          {/* Stats bar */}
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
              marginTop: '28px',
              animation: 'float 2s ease-in-out infinite',
              color: '#475569',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <a href="#about" aria-label="Scroll to about" style={{ color: 'inherit' }}>
              <ChevronDown size={22} />
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

