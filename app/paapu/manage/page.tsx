'use client'
// app/paapu/manage/page.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Protected CMS panel — view, add, and remove projects and achievements
// Middleware guarantees only authenticated admins reach this page
// ─────────────────────────────────────────────────────────────────────────────
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  Plus, Trash2, LogOut, Database, Activity,
  Trophy, CheckCircle, AlertCircle, ChevronDown, ChevronUp,
  ExternalLink, GitBranch, RefreshCw
} from 'lucide-react'
import type { Project, Achievement } from '@/lib/types'

// ── Types ─────────────────────────────────────────────────────────────────
type Tab = 'projects' | 'achievements' | 'model-log'
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
          background: '#0d0d14',
          border: '1px solid rgba(255,255,255,0.08)',
          color: '#e2e8f0', fontSize: '14px', outline: 'none',
          cursor: 'pointer', fontFamily: 'inherit', boxSizing: 'border-box',
        }}
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
      <p style={{ color: isSuccess ? '#10b981' : '#f43f5e', fontSize: '13px', fontWeight: 500, margin: 0 }}>
        {status.message}
      </p>
    </div>
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

// ── ADD PROJECT FORM ──────────────────────────────────────────────────────
function AddProjectForm({ onProjectAdded }: { onProjectAdded?: (p: Project) => void }) {
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
      const d = await res.json().catch(() => ({}))
      if (res.ok) {
        setStatus({ type: 'success', message: '✅ Project added! It is now live on your portfolio.' })
        if (d.project && onProjectAdded) {
          onProjectAdded(d.project)
        }
        setTitle(''); setDesc(''); setGithub(''); setDemo(''); setTechStack(''); setMetrics('')
        setCategory('llm'); setFeatured(false)
      } else {
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
        <InputField label="GitHub URL" id="proj-github" type="url" placeholder="https://github.com/mourishantony/..." value={github} onChange={setGithub} />
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
      <SubmitBtn loading={loading} label="Save Project" />
    </form>
  )
}

// ── MANAGE & REMOVE PROJECTS SECTION ─────────────────────────────────────
function ManageProjectsTab() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [confirmId, setConfirmId] = useState<string | null>(null)
  const [status, setStatus] = useState<Status>(null)

  async function loadProjects() {
    setLoading(true)
    try {
      const res = await fetch('/api/projects')
      const d = await res.json()
      if (d.projects) {
        setProjects(d.projects)
      }
    } catch {
      setStatus({ type: 'error', message: 'Failed to load projects list.' })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProjects()
  }, [])

  async function handleDelete(id: string) {
    setDeletingId(id)
    setStatus(null)
    try {
      const res = await fetch(`/api/projects?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      })
      if (res.ok) {
        setProjects((prev) => prev.filter((p) => p.id !== id))
        setStatus({ type: 'success', message: '✅ Project successfully removed!' })
      } else {
        const d = await res.json().catch(() => ({}))
        setStatus({ type: 'error', message: d.error ?? 'Failed to delete project.' })
      }
    } catch {
      setStatus({ type: 'error', message: 'Network error while deleting.' })
    } finally {
      setDeletingId(null)
      setConfirmId(null)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Action Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          id="btn-toggle-add-project"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 18px',
            borderRadius: '10px',
            background: showAddForm ? 'rgba(255,255,255,0.06)' : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            border: 'none',
            color: 'white',
            fontSize: '13px',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          {showAddForm ? <ChevronUp size={16} /> : <Plus size={16} />}
          {showAddForm ? 'Hide Add Form' : 'Add New Project'}
        </button>

        <button
          onClick={loadProjects}
          title="Refresh List"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 14px',
            borderRadius: '8px',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            color: '#94a3b8',
            fontSize: '12px',
            cursor: 'pointer',
          }}
        >
          <RefreshCw size={13} /> Refresh
        </button>
      </div>

      <StatusBanner status={status} />

      {/* Collapsible Add Form */}
      {showAddForm && (
        <div style={{
          background: 'rgba(99,102,241,0.03)',
          border: '1px solid rgba(99,102,241,0.2)',
          borderRadius: '16px',
          padding: '24px',
        }}>
          <h3 style={{ color: '#e2e8f0', fontSize: '16px', fontWeight: 700, marginBottom: '16px' }}>
            Add New Project
          </h3>
          <AddProjectForm
            onProjectAdded={(newProj) => {
              setProjects((prev) => [newProj, ...prev])
              setShowAddForm(false)
              setStatus({ type: 'success', message: `✅ Added "${newProj.title}" to portfolio!` })
            }}
          />
        </div>
      )}

      {/* Projects List */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <h3 style={{ color: '#e2e8f0', fontSize: '15px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>Existing Projects</span>
            <span style={{
              background: 'rgba(99,102,241,0.15)',
              color: '#818cf8',
              fontSize: '12px',
              padding: '2px 8px',
              borderRadius: '12px',
              fontFamily: 'JetBrains Mono, monospace',
            }}>
              {projects.length}
            </span>
          </h3>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
            Loading projects…
          </div>
        ) : projects.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '48px 24px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px dashed rgba(255,255,255,0.08)' }}>
            <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '12px' }}>No projects found.</p>
            <button
              onClick={() => setShowAddForm(true)}
              style={{
                background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)',
                color: '#818cf8', padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer',
              }}
            >
              Add First Project
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {projects.map((p) => (
              <div
                key={p.id}
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '12px',
                  padding: '16px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '16px',
                  flexWrap: 'wrap',
                  transition: 'border-color 0.2s',
                }}
              >
                <div style={{ flex: 1, minWidth: '240px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
                    <span style={{ color: '#f1f5f9', fontSize: '15px', fontWeight: 700 }}>
                      {p.title}
                    </span>
                    <span style={{
                      fontSize: '11px',
                      textTransform: 'uppercase',
                      padding: '2px 8px',
                      borderRadius: '6px',
                      background: 'rgba(99,102,241,0.12)',
                      color: '#818cf8',
                      fontWeight: 700,
                      fontFamily: 'JetBrains Mono, monospace',
                    }}>
                      {p.category}
                    </span>
                    {p.featured && (
                      <span style={{
                        fontSize: '11px',
                        padding: '2px 8px',
                        borderRadius: '6px',
                        background: 'rgba(245,158,11,0.12)',
                        color: '#f59e0b',
                        fontWeight: 700,
                      }}>
                        ★ Featured
                      </span>
                    )}
                  </div>
                  <p style={{ color: '#64748b', fontSize: '13px', margin: '0 0 8px 0', lineHeight: 1.4 }}>
                    {p.description ? p.description.slice(0, 100) + (p.description.length > 100 ? '…' : '') : ''}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {p.tech_stack?.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        style={{
                          fontSize: '11px',
                          color: '#94a3b8',
                          background: 'rgba(255,255,255,0.04)',
                          padding: '2px 6px',
                          borderRadius: '4px',
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                    {(p.tech_stack?.length ?? 0) > 4 && (
                      <span style={{ fontSize: '11px', color: '#64748b' }}>
                        +{p.tech_stack.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Remove / Delete Actions */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {confirmId === p.id ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <button
                        onClick={() => handleDelete(p.id)}
                        disabled={deletingId === p.id}
                        style={{
                          background: '#f43f5e',
                          color: 'white',
                          border: 'none',
                          padding: '7px 12px',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: 700,
                          cursor: 'pointer',
                        }}
                      >
                        {deletingId === p.id ? 'Deleting…' : 'Confirm Remove'}
                      </button>
                      <button
                        onClick={() => setConfirmId(null)}
                        style={{
                          background: 'rgba(255,255,255,0.06)',
                          color: '#94a3b8',
                          border: 'none',
                          padding: '7px 10px',
                          borderRadius: '6px',
                          fontSize: '12px',
                          cursor: 'pointer',
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setConfirmId(p.id)}
                      id={`remove-project-${p.id}`}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '7px 12px',
                        borderRadius: '6px',
                        background: 'rgba(244,63,94,0.08)',
                        border: '1px solid rgba(244,63,94,0.2)',
                        color: '#f43f5e',
                        fontSize: '12px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(244,63,94,0.18)'
                        e.currentTarget.style.borderColor = 'rgba(244,63,94,0.4)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(244,63,94,0.08)'
                        e.currentTarget.style.borderColor = 'rgba(244,63,94,0.2)'
                      }}
                    >
                      <Trash2 size={13} />
                      Remove
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// ── MANAGE & REMOVE ACHIEVEMENTS SECTION ─────────────────────────────────
function ManageAchievementsTab() {
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [confirmId, setConfirmId] = useState<string | null>(null)
  const [status, setStatus] = useState<Status>(null)

  async function loadAchievements() {
    setLoading(true)
    try {
      const res = await fetch('/api/achievements')
      const d = await res.json()
      if (d.achievements) {
        setAchievements(d.achievements)
      }
    } catch {
      setStatus({ type: 'error', message: 'Failed to load achievements.' })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadAchievements()
  }, [])

  async function handleDelete(id: string) {
    setDeletingId(id)
    setStatus(null)
    try {
      const res = await fetch(`/api/achievements?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      })
      if (res.ok) {
        setAchievements((prev) => prev.filter((a) => a.id !== id))
        setStatus({ type: 'success', message: '✅ Achievement successfully removed!' })
      } else {
        const d = await res.json().catch(() => ({}))
        setStatus({ type: 'error', message: d.error ?? 'Failed to delete achievement.' })
      }
    } catch {
      setStatus({ type: 'error', message: 'Network error while deleting.' })
    } finally {
      setDeletingId(null)
      setConfirmId(null)
    }
  }

  const badgeIcons: Record<string, string> = {
    gold: '🥇',
    silver: '🥈',
    bronze: '🥉',
    award: '🏆',
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Action Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          id="btn-toggle-add-achievement"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 18px',
            borderRadius: '10px',
            background: showAddForm ? 'rgba(255,255,255,0.06)' : 'linear-gradient(135deg, #f59e0b, #f43f5e)',
            border: 'none',
            color: 'white',
            fontSize: '13px',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          {showAddForm ? <ChevronUp size={16} /> : <Plus size={16} />}
          {showAddForm ? 'Hide Add Form' : 'Add New Achievement'}
        </button>

        <button
          onClick={loadAchievements}
          title="Refresh List"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 14px',
            borderRadius: '8px',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            color: '#94a3b8',
            fontSize: '12px',
            cursor: 'pointer',
          }}
        >
          <RefreshCw size={13} /> Refresh
        </button>
      </div>

      <StatusBanner status={status} />

      {/* Collapsible Add Form */}
      {showAddForm && (
        <div style={{
          background: 'rgba(245,158,11,0.03)',
          border: '1px solid rgba(245,158,11,0.2)',
          borderRadius: '16px',
          padding: '24px',
        }}>
          <h3 style={{ color: '#e2e8f0', fontSize: '16px', fontWeight: 700, marginBottom: '16px' }}>
            Add New Achievement
          </h3>
          <AddAchievementForm
            onAchievementAdded={(newAch) => {
              setAchievements((prev) => [newAch, ...prev])
              setShowAddForm(false)
              setStatus({ type: 'success', message: `✅ Added "${newAch.title}" to portfolio!` })
            }}
          />
        </div>
      )}

      {/* Achievements List */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <h3 style={{ color: '#e2e8f0', fontSize: '15px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>Existing Achievements</span>
            <span style={{
              background: 'rgba(245,158,11,0.15)',
              color: '#f59e0b',
              fontSize: '12px',
              padding: '2px 8px',
              borderRadius: '12px',
              fontFamily: 'JetBrains Mono, monospace',
            }}>
              {achievements.length}
            </span>
          </h3>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
            Loading achievements…
          </div>
        ) : achievements.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '48px 24px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px dashed rgba(255,255,255,0.08)' }}>
            <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '12px' }}>No achievements found.</p>
            <button
              onClick={() => setShowAddForm(true)}
              style={{
                background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.3)',
                color: '#f59e0b', padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer',
              }}
            >
              Add First Achievement
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {achievements.map((a) => (
              <div
                key={a.id}
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '12px',
                  padding: '16px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '16px',
                  flexWrap: 'wrap',
                }}
              >
                <div style={{ flex: 1, minWidth: '240px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span style={{ fontSize: '18px' }}>
                      {badgeIcons[a.badge_type] || '🏆'}
                    </span>
                    <span style={{ color: '#f1f5f9', fontSize: '15px', fontWeight: 700 }}>
                      {a.title}
                    </span>
                    {a.date && (
                      <span style={{
                        fontSize: '11px',
                        color: '#64748b',
                        fontFamily: 'JetBrains Mono, monospace',
                      }}>
                        ({a.date})
                      </span>
                    )}
                  </div>
                  {a.description && (
                    <p style={{ color: '#64748b', fontSize: '13px', margin: 0, lineHeight: 1.4 }}>
                      {a.description}
                    </p>
                  )}
                </div>

                {/* Remove Actions */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {confirmId === a.id ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <button
                        onClick={() => handleDelete(a.id)}
                        disabled={deletingId === a.id}
                        style={{
                          background: '#f43f5e',
                          color: 'white',
                          border: 'none',
                          padding: '7px 12px',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: 700,
                          cursor: 'pointer',
                        }}
                      >
                        {deletingId === a.id ? 'Deleting…' : 'Confirm Remove'}
                      </button>
                      <button
                        onClick={() => setConfirmId(null)}
                        style={{
                          background: 'rgba(255,255,255,0.06)',
                          color: '#94a3b8',
                          border: 'none',
                          padding: '7px 10px',
                          borderRadius: '6px',
                          fontSize: '12px',
                          cursor: 'pointer',
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setConfirmId(a.id)}
                      id={`remove-achievement-${a.id}`}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '7px 12px',
                        borderRadius: '6px',
                        background: 'rgba(244,63,94,0.08)',
                        border: '1px solid rgba(244,63,94,0.2)',
                        color: '#f43f5e',
                        fontSize: '12px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(244,63,94,0.18)'
                        e.currentTarget.style.borderColor = 'rgba(244,63,94,0.4)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(244,63,94,0.08)'
                        e.currentTarget.style.borderColor = 'rgba(244,63,94,0.2)'
                      }}
                    >
                      <Trash2 size={13} />
                      Remove
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// ── ADD ACHIEVEMENT FORM ──────────────────────────────────────────────────
function AddAchievementForm({ onAchievementAdded }: { onAchievementAdded?: (a: Achievement) => void }) {
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
      const d = await res.json().catch(() => ({}))
      if (res.ok) {
        setStatus({ type: 'success', message: '✅ Achievement added! It is now live on the portfolio.' })
        if (d.achievement && onAchievementAdded) {
          onAchievementAdded(d.achievement)
        }
        setTitle(''); setDesc(''); setDate(''); setBadge('award')
      } else {
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
      <SubmitBtn loading={loading} label="Save Achievement" />
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

// ── MAIN MANAGE PAGE ──────────────────────────────────────────────────────
const TABS: { id: Tab; label: string; icon: React.ElementType; color: string; description: string }[] = [
  { id: 'projects',     label: 'Projects',     icon: Database, color: '#6366f1', description: 'View, add, and remove production projects' },
  { id: 'achievements', label: 'Achievements', icon: Trophy,   color: '#f59e0b', description: 'View, add, and remove awards & recognitions' },
  { id: 'model-log',    label: 'Log Inference',icon: Activity, color: '#06b6d4', description: 'Record real-time inference telemetry' },
]

export default function ManagePage() {
  const [activeTab, setActiveTab] = useState<Tab>('projects')
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
      <div style={{ maxWidth: '840px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#f1f5f9', letterSpacing: '-0.02em', marginBottom: '4px' }}>
              Admin Panel
            </h1>
            <p style={{ color: '#475569', fontSize: '14px', fontFamily: 'JetBrains Mono, monospace' }}>
              mourish.ai · content & portfolio management
            </p>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '9px 14px',
                borderRadius: '8px',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: '#94a3b8',
                fontSize: '13px',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              <ExternalLink size={13} /> View Site
            </a>
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

        {/* Content Card */}
        <div
          className="glass-card"
          style={{ borderRadius: '16px', padding: '32px', position: 'relative', overflow: 'hidden' }}
        >
          {/* Top accent line */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
            background: `linear-gradient(90deg, transparent, ${activeConfig.color}, transparent)`,
          }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
            <activeConfig.icon size={18} color={activeConfig.color} />
            <div>
              <h2 style={{ color: '#e2e8f0', fontSize: '17px', fontWeight: 700, margin: 0 }}>
                {activeConfig.label} Management
              </h2>
              <p style={{ color: '#64748b', fontSize: '13px', margin: '2px 0 0 0' }}>
                {activeConfig.description}
              </p>
            </div>
          </div>

          {activeTab === 'projects'     && <ManageProjectsTab />}
          {activeTab === 'achievements' && <ManageAchievementsTab />}
          {activeTab === 'model-log'    && <AddModelLogForm />}
        </div>

        {/* Info footer */}
        <div style={{
          marginTop: '20px', padding: '16px', borderRadius: '10px',
          background: 'rgba(99,102,241,0.05)',
          border: '1px solid rgba(99,102,241,0.12)',
          display: 'flex', alignItems: 'center', gap: '10px',
        }}>
          <CheckCircle size={14} color="#6366f1" style={{ flexShrink: 0 }} />
          <p style={{ color: '#475569', fontSize: '12px', lineHeight: 1.5, margin: 0 }}>
            Projects and achievements added or removed here immediately update on your live portfolio.
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
