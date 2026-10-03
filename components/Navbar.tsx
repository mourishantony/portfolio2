'use client'
// components/Navbar.tsx
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X, Brain, BarChart3, Mail } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/ui/SocialIcons'

const navLinks = [
  { label: 'About', href: '/#about' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Achievements', href: '/#achievements' },
  { label: 'Dashboard', href: '/dashboard' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: 'all 0.3s ease',
        background: scrolled
          ? 'rgba(5,5,8,0.85)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled
          ? '1px solid rgba(99,102,241,0.12)'
          : '1px solid transparent',
      }}
    >
      <nav
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <div style={{
            width: 36, height: 36,
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            borderRadius: '10px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 16px rgba(99,102,241,0.4)',
          }}>
            <Brain size={18} color="white" />
          </div>
          <span style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontWeight: 700,
            fontSize: '15px',
            color: '#e2e8f0',
            letterSpacing: '-0.02em',
          }}>
            mourish<span style={{ color: '#6366f1' }}>.ai</span>
          </span>
        </Link>

        {/* Desktop nav links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }} className="hidden-mobile">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                color: '#94a3b8',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: 500,
                transition: 'color 0.2s',
                letterSpacing: '0.01em',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#e2e8f0')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#94a3b8')}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Social icons + CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }} className="hidden-mobile">
          {[
            { icon: GithubIcon, href: 'https://github.com/mourishantony', label: 'GitHub' },
            { icon: LinkedinIcon, href: 'https://www.linkedin.com/in/mourishantonyc/', label: 'LinkedIn' },
            { icon: Mail, href: 'mailto:mourishantonyc@gmail.com', label: 'Email' },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              style={{
                color: '#94a3b8',
                transition: 'color 0.2s, transform 0.2s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#e2e8f0'
                e.currentTarget.style.transform = 'translateY(-1px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#94a3b8'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <Icon size={18} />
            </a>
          ))}
          <Link
            href="/dashboard"
            style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '13px',
              fontWeight: 600,
              boxShadow: '0 0 20px rgba(99,102,241,0.25)',
              transition: 'box-shadow 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 0 32px rgba(99,102,241,0.5)')}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '0 0 20px rgba(99,102,241,0.25)')}
          >
            <BarChart3 size={14} />
            MLOps Dashboard
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ color: '#94a3b8', background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
          className="show-mobile"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          background: 'rgba(5,5,8,0.97)',
          borderTop: '1px solid rgba(99,102,241,0.15)',
          padding: '16px 24px 24px',
        }}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                display: 'block',
                padding: '12px 0',
                color: '#94a3b8',
                textDecoration: 'none',
                fontSize: '15px',
                fontWeight: 500,
                borderBottom: '1px solid rgba(255,255,255,0.04)',
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/dashboard"
            onClick={() => setMenuOpen(false)}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              marginTop: '16px',
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: 600,
            }}
          >
            <BarChart3 size={15} />
            MLOps Dashboard
          </Link>

          {/* Mobile social links */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '20px',
            marginTop: '20px', paddingTop: '16px',
            borderTop: '1px solid rgba(255,255,255,0.06)',
          }}>
            <a href="https://github.com/mourishantony" target="_blank" rel="noopener noreferrer" aria-label="GitHub" style={{ color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', textDecoration: 'none' }}>
              <GithubIcon size={16} /> GitHub
            </a>
            <a href="https://www.linkedin.com/in/mourishantonyc/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" style={{ color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', textDecoration: 'none' }}>
              <LinkedinIcon size={16} /> LinkedIn
            </a>
            <a href="mailto:mourishantonyc@gmail.com" aria-label="Email" style={{ color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', textDecoration: 'none' }}>
              <Mail size={16} /> Email
            </a>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </header>
  )
}
