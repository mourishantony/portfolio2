'use client'
// components/Footer.tsx
import Link from 'next/link'
import { Brain, Mail } from 'lucide-react'
import {
  GithubIcon, LinkedinIcon, XIcon, InstagramIcon, FacebookIcon
} from '@/components/ui/SocialIcons'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer style={{
      borderTop: '1px solid rgba(255,255,255,0.05)',
      background: 'rgba(5,5,8,0.8)',
      padding: '48px 24px 32px',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', marginBottom: '40px' }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <div style={{
                width: 32, height: 32,
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                borderRadius: '8px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Brain size={16} color="white" />
              </div>
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, fontSize: '14px', color: '#e2e8f0' }}>
                mourish<span style={{ color: '#6366f1' }}>.ai</span>
              </span>
            </div>
            <p style={{ color: '#64748b', fontSize: '13px', lineHeight: '1.6', maxWidth: '240px' }}>
              Full-spectrum ML Engineer building production AI systems at scale.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 style={{ color: '#e2e8f0', fontSize: '13px', fontWeight: 600, marginBottom: '12px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Navigation</h3>
            {[
              { label: 'Home', href: '/' },
              { label: 'About', href: '/#about' },
              { label: 'Projects', href: '/#projects' },
              { label: 'MLOps Dashboard', href: '/dashboard' },
              { label: 'Achievements', href: '/#achievements' },
            ].map(({ label, href }) => (
              <Link key={label} href={href} style={{ display: 'block', color: '#64748b', fontSize: '13px', textDecoration: 'none', marginBottom: '8px', transition: 'color 0.2s' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#6366f1')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#64748b')}
              >{label}</Link>
            ))}
          </div>

          {/* Expertise */}
          <div>
            <h3 style={{ color: '#e2e8f0', fontSize: '13px', fontWeight: 600, marginBottom: '12px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Expertise</h3>
            {['LLMs & GenAI', 'Computer Vision', 'MLOps & Infrastructure', 'Reinforcement Learning', 'Production AI Systems'].map((item) => (
              <p key={item} style={{ color: '#64748b', fontSize: '13px', marginBottom: '8px' }}>{item}</p>
            ))}
          </div>

          {/* Social */}
          <div>
            <h3 style={{ color: '#e2e8f0', fontSize: '13px', fontWeight: 600, marginBottom: '12px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Connect</h3>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {[
                { icon: GithubIcon, href: 'https://github.com/mourishantony', label: 'GitHub' },
                { icon: LinkedinIcon, href: 'https://www.linkedin.com/in/mourishantonyc/', label: 'LinkedIn' },
                { icon: XIcon, href: 'https://x.com/', label: 'X (Twitter)' },
                { icon: InstagramIcon, href: 'https://instagram.com/', label: 'Instagram' },
                { icon: FacebookIcon, href: 'https://facebook.com/', label: 'Facebook' },
                { icon: Mail, href: 'mailto:mourishantonyc@gmail.com', label: 'Email' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  style={{
                    width: 36, height: 36,
                    background: 'rgba(99,102,241,0.08)',
                    border: '1px solid rgba(99,102,241,0.15)',
                    borderRadius: '8px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#64748b',
                    transition: 'all 0.2s',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#6366f1'
                    e.currentTarget.style.borderColor = 'rgba(99,102,241,0.5)'
                    e.currentTarget.style.background = 'rgba(99,102,241,0.15)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#64748b'
                    e.currentTarget.style.borderColor = 'rgba(99,102,241,0.15)'
                    e.currentTarget.style.background = 'rgba(99,102,241,0.08)'
                  }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.05)',
          paddingTop: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '8px',
        }}>
          <p style={{ color: '#475569', fontSize: '12px' }}>
            © {year} Mourish Antony C. Built with Next.js 16 + Supabase.
          </p>
          <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: '#334155' }}>
            v2.0.0 · production
          </p>
        </div>
      </div>
    </footer>
  )
}
