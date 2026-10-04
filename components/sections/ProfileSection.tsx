'use client'
// components/sections/ProfileSection.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Profile & About Section — displays Mourish's bio, avatar, skills, and links
// ─────────────────────────────────────────────────────────────────────────────
import { useState } from 'react'
import { User, Mail, MapPin, Terminal, CheckCircle2, ArrowUpRight } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/ui/SocialIcons'

export default function ProfileSection() {
  const [imgError, setImgError] = useState(false)

  return (
    <section
      id="about"
      style={{
        padding: 'clamp(56px, 8vw, 120px) clamp(16px, 4vw, 24px)',
        maxWidth: '1200px',
        margin: '0 auto',
        position: 'relative',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      {/* Section Header */}
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
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
          <User size={13} color="#6366f1" />
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
            Profile & Bio
          </span>
        </div>
        <h2
          style={{
            fontSize: 'clamp(28px, 5vw, 44px)',
            fontWeight: 800,
            color: '#f1f5f9',
            letterSpacing: '-0.03em',
            lineHeight: 1.15,
          }}
        >
          About the <span className="gradient-text">Engineer</span>
        </h2>
        <p style={{ color: '#64748b', fontSize: '15px', marginTop: '12px', maxWidth: '580px', margin: '12px auto 0' }}>
          Bridging cutting-edge deep learning research with high-throughput production infrastructure.
        </p>
      </div>

      {/* Main Profile Card Container */}
      <div className="glass-card profile-card-container">
        {/* Ambient Top Highlight */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.6), rgba(139,92,246,0.6), transparent)',
          }}
        />

        <div className="profile-card-grid">
          {/* Left Column: Avatar & Quick Links */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', width: '100%' }}>
            {/* Avatar Container with Glowing Orbit */}
            <div
              style={{
                position: 'relative',
                width: 'clamp(140px, 35vw, 175px)',
                height: 'clamp(140px, 35vw, 175px)',
                marginBottom: '20px',
              }}
            >
              {/* Outer Glow Ring */}
              <div
                style={{
                  position: 'absolute',
                  inset: -6,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(99,102,241,0.5), rgba(139,92,246,0.5), rgba(6,182,212,0.5))',
                  filter: 'blur(10px)',
                  opacity: 0.7,
                  animation: 'glow-pulse 4s ease-in-out infinite',
                }}
              />

              {/* Avatar Frame */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  background: 'linear-gradient(135deg, #13131f, #0d0d14)',
                  border: '3px solid rgba(99,102,241,0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {!imgError ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src="/profile.jpg"
                    alt="Mourish Antony C"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={() => setImgError(true)}
                  />
                ) : (
                  /* Fallback stylized avatar with initials */
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      background: 'radial-gradient(circle at 30% 30%, #2e1065, #0f172a)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#f8fafc',
                      userSelect: 'none',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '44px',
                        fontWeight: 800,
                        background: 'linear-gradient(135deg, #a5b4fc, #c084fc)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      MA
                    </span>
                    <span style={{ fontSize: '11px', color: '#818cf8', fontWeight: 600, letterSpacing: '0.08em', marginTop: 2 }}>
                      ML ENGINEER
                    </span>
                  </div>
                )}
              </div>

              {/* Online Status Badge */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 6,
                  right: 6,
                  background: '#0d0d14',
                  border: '2px solid #050508',
                  borderRadius: '20px',
                  padding: '4px 8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
                }}
              >
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    background: '#10b981',
                    boxShadow: '0 0 8px #10b981',
                    display: 'inline-block',
                  }}
                />
                <span style={{ fontSize: '10px', color: '#10b981', fontWeight: 700, letterSpacing: '0.04em' }}>
                  ONLINE
                </span>
              </div>
            </div>

            {/* Name & Role */}
            <h3 style={{ fontSize: 'clamp(20px, 4vw, 24px)', fontWeight: 800, color: '#f1f5f9', marginBottom: '4px' }}>
              Mourish Antony C
            </h3>
            <p style={{ color: '#818cf8', fontSize: '13px', fontWeight: 600, fontFamily: 'JetBrains Mono, monospace', marginBottom: '8px' }}>
              Advanced Machine Learning Engineer
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748b', fontSize: '12px', marginBottom: '20px' }}>
              <MapPin size={13} color="#64748b" />
              <span>Coimbatore, India · Available Worldwide</span>
            </div>

            {/* Social Links with Balanced Auto-Sizing */}
            <div className="profile-social-buttons">
              <a
                href="https://github.com/mourishantony"
                target="_blank"
                rel="noopener noreferrer"
                id="profile-github-link"
                className="profile-social-btn"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  color: '#e2e8f0',
                }}
              >
                <GithubIcon size={16} />
                <span>GitHub</span>
                <ArrowUpRight size={12} style={{ opacity: 0.6 }} />
              </a>

              <a
                href="https://www.linkedin.com/in/mourishantonyc/"
                target="_blank"
                rel="noopener noreferrer"
                id="profile-linkedin-link"
                className="profile-social-btn"
                style={{
                  background: 'rgba(10,102,194,0.12)',
                  border: '1px solid rgba(10,102,194,0.3)',
                  color: '#60a5fa',
                }}
              >
                <LinkedinIcon size={16} />
                <span>LinkedIn</span>
                <ArrowUpRight size={12} style={{ opacity: 0.6 }} />
              </a>

              <a
                href="mailto:mourishantonyc@gmail.com"
                id="profile-email-link"
                className="profile-social-btn"
                style={{
                  background: 'rgba(99,102,241,0.1)',
                  border: '1px solid rgba(99,102,241,0.25)',
                  color: '#a5b4fc',
                }}
              >
                <Mail size={15} />
                <span>Email</span>
              </a>
            </div>
          </div>

          {/* Right Column: Bio & Core Specializations */}
          <div style={{ width: '100%', minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <Terminal size={15} color="#6366f1" />
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', color: '#6366f1', fontWeight: 700 }}>
                SUMMARY // BIO
              </span>
            </div>

            <h3
              style={{
                fontSize: 'clamp(19px, 3.5vw, 22px)',
                fontWeight: 700,
                color: '#f8fafc',
                lineHeight: 1.4,
                marginBottom: '14px',
              }}
            >
              Building High-Throughput AI Systems & Production Machine Learning Pipelines
            </h3>

            <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: 1.7, marginBottom: '22px' }}>
              I am a Machine Learning Engineer specializing in architecting, fine-tuning, and serving production-grade AI systems.
              My experience spans fine-tuning large language models using parameter-efficient methods (LoRA/QLoRA),
              optimizing multi-modal RAG systems with vector databases, and engineering real-time computer vision inference
              accelerated on NVIDIA GPUs with TensorRT.
            </p>

            {/* Pillars Grid — 1 column on mobile, 2 columns on tablet/desktop */}
            <div className="profile-pillars-grid">
              {[
                {
                  title: 'LLMs & Generative AI',
                  desc: 'PEFT, LoRA fine-tuning, vLLM serving, multi-turn RAG, context length scaling',
                  color: '#8b5cf6',
                },
                {
                  title: 'Computer Vision & Edge',
                  desc: 'YOLOv9, ByteTrack, TensorRT acceleration, CUDA optimizations (<30ms latency)',
                  color: '#06b6d4',
                },
                {
                  title: 'MLOps & Observability',
                  desc: 'Data drift detection, Triton server, automated retraining, latency telemetry',
                  color: '#10b981',
                },
                {
                  title: 'Systems & Scalability',
                  desc: 'Docker, Kubernetes, PyTorch DDP, distributed embeddings, PostgreSQL pgvector',
                  color: '#f59e0b',
                },
              ].map(({ title, desc, color }) => (
                <div
                  key={title}
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: '12px',
                    padding: '12px 14px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px' }}>
                    <CheckCircle2 size={14} color={color} style={{ flexShrink: 0 }} />
                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#e2e8f0' }}>{title}</span>
                  </div>
                  <p style={{ color: '#64748b', fontSize: '12px', lineHeight: 1.5, margin: 0 }}>
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

