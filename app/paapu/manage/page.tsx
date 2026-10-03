'use client'
// app/paapu/manage/page.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Protected CMS panel — add projects, model logs, achievements
// Middleware guarantees only authenticated admins reach this page
// ─────────────────────────────────────────────────────────────────────────────
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Plus, Trash2, LogOut, Database, Activity,
  Trophy, CheckCircle, AlertCircle, ChevronDown,
} from 'lucide-react'

// ── Types ─────────────────────────────────────────────────────────────────
type Tab = 'project' | 'model-log' | 'achievement'
type Status = { type: 'success' | 'error'; message: string } | null

// ── Helpers ───────────────────────────────────────────────────────────────
function InputField({
  label, id, type = 'text', placeholder, required, value, onChange,
}: {
  label: string; id: string; type?: string; placeholder?: string
  required?: boolean; value: string; onChange: (v: string) => void
}) {
  return (
    <div>
      <label
        htmlFor={id}
        style={{ display: 'block', color: '#94a3b8', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}
      >
        {label}{required && <span style={{ color: '#f43f5e', marginLeft: 3 }}>*</span>}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: '100%', padding: '10px 14px', borderRadius: '8px',
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          color: '#e2e8f0', fontSize: '14px', outline: 'none',
          transition: 'border-color 0.2s', fontFamily: 'inherit', boxSizing: 'border-box',
        }}
        onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(99,102,241,0.5)')}
        onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
      />
    </div>
  )
}

function TextAreaField({
  label, id, placeholder, required, value, onChange,
}: {
  label: string; id: string; placeholder?: string
  required?: boolean; value: string; onChange: (v: string) => void
}) {
  return (
    <div>
      <label
        htmlFor={id}
        style={{ display: 'block', color: '#94a3b8', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}
      >
        {label}{required && <span style={{ color: '#f43f5e', marginLeft: 3 }}>*</span>}
      </label>
      <textarea
        id={id}
        placeholder={placeholder}
        required={required}
        rows={3}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: '100%', padding: '10px 14px', borderRadius: '8px',
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          color: '#e2e8f0', fontSize: '14px', outline: 'none', resize: 'vertical',
          transition: 'border-color 0.2s', fontFamily: 'inherit', boxSizing: 'border-box',
        }}
        onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(99,102,241,0.5)')}
        onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
      />
    </div>
  )
}

function SelectField({
  label, id, required, value, onChange, options,
}: {
  label: string; id: string; required?: boolean; value: string
  onChange: (v: string) => void; options: { value: string; label: string }[]
}) {
  return (
    <div>
      <label
        htmlFor={id}
        style={{ display: 'block', color: '#94a3b8', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}
      >
        {label}{required && <span style={{ color: '#f43f5e', marginLeft: 3 }}>*</span>}
      </label>
      <select
        id={id}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: '100%', padding: '10px 14px', borderRadius: '8px',
          background: 'rgba(13,13,20,0.9)',
          border: '1px solid rgba(255,255,255,0.08)',
          color: '#e2e8f0', fontSize: '14px', outline: 'none',
          transition: 'border-color 0.2s', fontFamily: 'inherit', boxSizing: 'border-box',
          cursor: 'pointer',
        }}
        onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(99,102,241,0.5)')}
        onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  )
}

// ── Status Banner ─────────────────────────────────────────────────────────
function StatusBanner({ status }: { status: Status }) {
  if (!status) return null
  const isSuccess = status.type === 'success'
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '10px',
      padding: '12px 16px', borderRadius: '10px', marginBottom: '20px',
      background: isSuccess ? 'rgba(16,185,129,0.08)' : 'rgba(244,63,94,0.08)',
      border: `1px solid ${isSuccess ? 'rgba(16,185,129,0.2)' : 'rgba(244,63,94,0.2)'}`,
    }}>
      {isSuccess
        ? <CheckCircle size={15} color="#10b981" />
        : <AlertCircle size={15} color="#f43f5e" />
      }
      <p style={{ color: isSuccess ? '#10b981' : '#f43f5e', fontSize: '13px', fontWeight: 500 }}>
        {status.message}
      </p>
    </div>
  )
}

// ── ADD PROJECT FORM ──────────────────────────────────────────────────────
function AddProjectForm() {
  const [title, setTitle]           = useState('')
  const [description, setDesc]      = useState('')
  const [github, setGithub]         = useState('')
  const [demo, setDemo]             = useState('')
  const [techStack, setTechStack]   = useState('')
  const [metrics, setMetrics]       = useState('')
  const [category, setCategory]     = useState('llm')
  const [featured, setFeatured]     = useState(false)
  const [status, setStatus]         = useState<Status>(null)
  const [loading, setLoading]       = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setStatus(null)
    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title, description,
          github_url: github || null,
          live_demo_url: demo || null,
          tech_stack: techStack.split(',').map((t) => t.trim()).filter(Boolean),
          metrics_summary: metrics || null,
          category,
          featured,
        }),
      })
      if (res.ok) {
        setStatus({ type: 'success', message: '✅ Project added! It\'s live on your portfolio now.' })
        setTitle(''); setDesc(''); setGithub(''); setDemo(''); setTechStack(''); setMetrics('')
        setCategory('llm'); setFeatured(false)
      } else {
        const d = await res.json().catch(() => ({}))
        setStatus({ type: 'error', message: d.error ?? 'Failed to add project.' })
      }
    } catch {
      setStatus({ type: 'error', message: 'Network error.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <StatusBanner status={status} />
      <InputField label="Project Title" id="proj-title" required placeholder="GPT-4 Fine-tuning Pipeline" value={title} onChange={setTitle} />
      <TextAreaField label="Description" id="proj-desc" required placeholder="Describe what this project does, its scale, and impact..." value={description} onChange={setDesc} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <InputField label="GitHub URL" id="proj-github" type="url" placeholder="https://github.com/..." value={github} onChange={setGithub} />
        <InputField label="Live Demo URL" id="proj-demo" type="url" placeholder="https://demo.example.com" value={demo} onChange={setDemo} />
      </div>
      <InputField
        label="Tech Stack (comma-separated)"
        id="proj-tech"
        required
        placeholder="PyTorch, Hugging Face, FastAPI, Docker, K8s"
        value={techStack}
        onChange={setTechStack}
      />
      <InputField
        label="Metrics Summary (terminal style)"
        id="proj-metrics"
        placeholder="Achieves 98.2% accuracy · 3.2× faster than baseline · serving 10K req/day"
        value={metrics}
        onChange={setMetrics}
      />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <SelectField
          label="Category" id="proj-cat" required value={category} onChange={setCategory}
          options={[
            { value: 'llm',   label: '🤖 LLM / Generative AI' },
            { value: 'cv',    label: '👁 Computer Vision' },
            { value: 'mlops', label: '⚡ MLOps' },
            { value: 'rl',    label: '🎮 Reinforcement Learning' },
            { value: 'other', label: '🔬 Other' },
          ]}
        />
        <div style={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '2px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
            <input
              id="proj-featured"
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              style={{ width: 16, height: 16, accentColor: '#6366f1', cursor: 'pointer' }}
            />
            <span style={{ color: '#94a3b8', fontSize: '13px', fontWeight: 600 }}>Mark as Featured</span>
          </label>
        </div>
      </div>
      <SubmitBtn loading={loading} label="Add Project" />
    </form>
  )
}

// ── ADD MODEL LOG FORM ────────────────────────────────────────────────────
function AddModelLogForm() {
  const [modelName, setModelName] = useState('')
  const [latency, setLatency]     = useState('')
  const [logStatus, setLogStatus] = useState('success')
  const [status, setStatus]       = useState<Status>(null)
  const [loading, setLoading]     = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setStatus(null)
    try {
      const res = await fetch('/api/model-logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model_name: modelName, latency_ms: parseFloat(latency), status: logStatus }),
      })
      if (res.ok) {
        setStatus({ type: 'success', message: '✅ Model log added! Dashboard will reflect this immediately.' })
        setModelName(''); setLatency(''); setLogStatus('success')
      } else {
        const d = await res.json().catch(() => ({}))
        setStatus({ type: 'error', message: d.error ?? 'Failed to add log.' })
      }
    } catch {
      setStatus({ type: 'error', message: 'Network error.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <StatusBanner status={status} />
      <InputField label="Model Name" id="log-model" required placeholder="gpt-4-finetuned-v2" value={modelName} onChange={setModelName} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <InputField label="Latency (ms)" id="log-latency" type="number" required placeholder="142.5" value={latency} onChange={setLatency} />
        <SelectField
          label="Status" id="log-status" required value={logStatus} onChange={setLogStatus}
          options={[
            { value: 'success', label: '✅ Success' },
            { value: 'error',   label: '❌ Error' },
          ]}
        />
      </div>
      <SubmitBtn loading={loading} label="Log Inference" />
    </form>
  )
}

// ── ADD ACHIEVEMENT FORM ──────────────────────────────────────────────────
function AddAchievementForm() {
  const [title, setTitle]       = useState('')
  const [desc, setDesc]         = useState('')
  const [date, setDate]         = useState('')
  const [badge, setBadge]       = useState('award')
  const [status, setStatus]     = useState<Status>(null)
  const [loading, setLoading]   = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setStatus(null)
    try {
      const res = await fetch('/api/achievements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description: desc || null, date: date || null, badge_type: badge }),
      })
      if (res.ok) {
        setStatus({ type: 'success', message: '✅ Achievement added! It\'s live on the portfolio.' })
        setTitle(''); setDesc(''); setDate(''); setBadge('award')
      } else {
        const d = await res.json().catch(() => ({}))
        setStatus({ type: 'error', message: d.error ?? 'Failed to add achievement.' })
      }
    } catch {
      setStatus({ type: 'error', message: 'Network error.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <StatusBanner status={status} />
      <InputField label="Achievement Title" id="ach-title" required placeholder="1st Place — IEEE AI Hackathon 2025" value={title} onChange={setTitle} />
      <TextAreaField label="Description" id="ach-desc" placeholder="Brief description of what you achieved..." value={desc} onChange={setDesc} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <InputField label="Date" id="ach-date" type="date" value={date} onChange={setDate} />
        <SelectField
          label="Badge Type" id="ach-badge" required value={badge} onChange={setBadge}
          options={[
            { value: 'gold',   label: '🥇 Gold' },
            { value: 'silver', label: '🥈 Silver' },
            { value: 'bronze', label: '🥉 Bronze' },
            { value: 'award',  label: '🏆 Award / Recognition' },
          ]}
        />
      </div>
      <SubmitBtn loading={loading} label="Add Achievement" />
    </form>
  )
}

function SubmitBtn({ loading, label }: { loading: boolean; label: string }) {
  return (
    <button
      type="submit"
      disabled={loading}
      style={{
        padding: '12px',
        borderRadius: '10px',
        background: loading ? 'rgba(99,102,241,0.4)' : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
        border: 'none',
        color: 'white',
        fontSize: '14px',
        fontWeight: 700,
        cursor: loading ? 'not-allowed' : 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        boxShadow: loading ? 'none' : '0 0 20px rgba(99,102,241,0.25)',
        transition: 'all 0.2s',
      }}
    >
      {loading ? (
        <span style={{
          width: 14, height: 14,
          border: '2px solid rgba(255,255,255,0.3)',
          borderTop: '2px solid white',
          borderRadius: '50%',
          display: 'inline-block',
          animation: 'spin 0.8s linear infinite',
        }} />
      ) : (
        <Plus size={15} />
      )}
      {loading ? 'Saving…' : label}
    </button>
  )
}

// ── MAIN PAGE ─────────────────────────────────────────────────────────────
const TABS: { id: Tab; label: string; icon: React.ElementType; color: string }[] = [
  { id: 'project',     label: 'Add Project',     icon: Database,  color: '#6366f1' },
  { id: 'model-log',  label: 'Log Inference',    icon: Activity,  color: '#06b6d4' },
  { id: 'achievement', label: 'Add Achievement',  icon: Trophy,    color: '#f59e0b' },
]

export default function ManagePage() {
  const [activeTab, setActiveTab] = useState<Tab>('project')
  const [logoutLoading, setLogoutLoading] = useState(false)
  const router = useRouter()

  async function handleLogout() {
    setLogoutLoading(true)
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/paapu')
  }

  const activeConfig = TABS.find((t) => t.id === activeTab)!

  return (
    <div style={{ minHeight: '100vh', paddingTop: '80px', padding: '88px 24px 48px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#f1f5f9', letterSpacing: '-0.02em', marginBottom: '4px' }}>
              Admin Panel
            </h1>
            <p style={{ color: '#475569', fontSize: '14px', fontFamily: 'JetBrains Mono, monospace' }}>
              mourish.ai · content management
            </p>
          </div>
          <button
            onClick={handleLogout}
            disabled={logoutLoading}
            id="admin-logout"
            style={{
              display: 'flex', alignItems: 'center', gap: '7px',
              padding: '9px 16px',
              borderRadius: '8px',
              background: 'rgba(244,63,94,0.08)',
              border: '1px solid rgba(244,63,94,0.2)',
              color: '#f43f5e',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            <LogOut size={14} />
            {logoutLoading ? 'Logging out…' : 'Log Out'}
          </button>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
          {TABS.map(({ id, label, icon: Icon, color }) => {
            const isActive = activeTab === id
            return (
              <button
                key={id}
                id={`tab-${id}`}
                onClick={() => setActiveTab(id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  padding: '10px 18px',
                  borderRadius: '10px',
                  border: `1px solid ${isActive ? `${color}40` : 'rgba(255,255,255,0.06)'}`,
                  background: isActive ? `${color}12` : 'rgba(255,255,255,0.02)',
                  color: isActive ? color : '#64748b',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                <Icon size={15} />
                {label}
              </button>
            )
          })}
        </div>

        {/* Form Card */}
        <div
          className="glass-card"
          style={{ borderRadius: '16px', padding: '32px', position: 'relative', overflow: 'hidden' }}
        >
          {/* Top accent */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
            background: `linear-gradient(90deg, transparent, ${activeConfig.color}, transparent)`,
          }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
            <activeConfig.icon size={18} color={activeConfig.color} />
            <h2 style={{ color: '#e2e8f0', fontSize: '17px', fontWeight: 700 }}>
              {activeConfig.label}
            </h2>
          </div>

          {activeTab === 'project'     && <AddProjectForm />}
          {activeTab === 'model-log'   && <AddModelLogForm />}
          {activeTab === 'achievement' && <AddAchievementForm />}
        </div>

        {/* Info footer */}
        <div style={{
          marginTop: '20px', padding: '16px', borderRadius: '10px',
          background: 'rgba(99,102,241,0.05)',
          border: '1px solid rgba(99,102,241,0.12)',
          display: 'flex', alignItems: 'center', gap: '10px',
        }}>
          <CheckCircle size={14} color="#6366f1" style={{ flexShrink: 0 }} />
          <p style={{ color: '#475569', fontSize: '12px', lineHeight: 1.5 }}>
            All changes are written directly to Supabase and reflected on your portfolio instantly.
            No redeploy needed — the site uses <code style={{ fontFamily: 'JetBrains Mono, monospace', color: '#6366f1', fontSize: '11px' }}>force-dynamic</code> rendering.
          </p>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
