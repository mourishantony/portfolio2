// lib/types.ts
// ─────────────────────────────────────────────────────────────────────────────
// TypeScript interfaces for all Supabase data shapes
// ─────────────────────────────────────────────────────────────────────────────

export interface Project {
  id: string
  title: string
  description: string
  github_url: string | null
  live_demo_url: string | null
  tech_stack: string[]
  metrics_summary: string | null
  category: 'llm' | 'cv' | 'mlops' | 'rl' | 'other'
  featured: boolean
  created_at: string
}

export interface ModelLog {
  id: string
  model_name: string
  latency_ms: number
  status: 'success' | 'error'
  timestamp: string
}

export interface Achievement {
  id: string
  title: string
  description: string | null
  date: string | null
  badge_type: 'gold' | 'silver' | 'bronze' | 'award'
  created_at: string
}

// Aggregated dashboard stats derived from model_logs
export interface DashboardMetrics {
  totalInferenceRequests: number
  avgLatencyMs: number
  p95LatencyMs: number
  successRate: number
  uniqueModels: number
  latencyByModel: { model_name: string; avg_latency: number; count: number }[]
  latencyOverTime: { hour: string; avg_latency: number; count: number }[]
}

export type ProjectCategory = Project['category']
export type BadgeType = Achievement['badge_type']
