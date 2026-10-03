'use client'
// components/sections/DashboardCharts.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Client component — Recharts latency charts for MLOps dashboard
// ─────────────────────────────────────────────────────────────────────────────
import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Legend,
} from 'recharts'
import type { DashboardMetrics } from '@/lib/types'

interface Props {
  metrics: DashboardMetrics
}

const CHART_COLORS = ['#6366f1', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#f43f5e']

// Custom Tooltip
function CustomTooltip({ active, payload, label }: {
  active?: boolean
  payload?: Array<{ value: number; name: string; color: string }>
  label?: string
}) {
  if (!active || !payload?.length) return null
  return (
    <div style={{
      background: 'rgba(13,13,20,0.95)',
      border: '1px solid rgba(99,102,241,0.3)',
      borderRadius: '10px',
      padding: '12px 16px',
      fontFamily: 'JetBrains Mono, monospace',
    }}>
      <p style={{ color: '#64748b', fontSize: '11px', marginBottom: '8px' }}>{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color, fontSize: '13px', fontWeight: 600 }}>
          {p.name}: {typeof p.value === 'number' ? p.value.toFixed(1) : p.value}
          {p.name.toLowerCase().includes('latency') ? ' ms' : ''}
        </p>
      ))}
    </div>
  )
}

export default function DashboardCharts({ metrics }: Props) {
  const { latencyByModel, latencyOverTime } = metrics

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

      {/* ── Latency Over Time (Area Chart) ─────────── */}
      <div className="glass-card" style={{ borderRadius: '16px', padding: '24px' }}>
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ color: '#e2e8f0', fontSize: '16px', fontWeight: 700, marginBottom: '4px' }}>
            Inference Latency Over Time
          </h3>
          <p style={{ color: '#475569', fontSize: '13px' }}>
            Hourly average response time across all model endpoints (ms)
          </p>
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={latencyOverTime} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="latencyGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#6366f1" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis
              dataKey="hour"
              tick={{ fill: '#475569', fontSize: 11, fontFamily: 'JetBrains Mono, monospace' }}
              axisLine={{ stroke: 'rgba(255,255,255,0.06)' }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: '#475569', fontSize: 11, fontFamily: 'JetBrains Mono, monospace' }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${v}ms`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="avg_latency"
              name="Avg Latency"
              stroke="#6366f1"
              strokeWidth={2}
              fill="url(#latencyGrad)"
              dot={false}
              activeDot={{ r: 4, fill: '#6366f1', stroke: '#e2e8f0', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* ── Latency by Model (Bar Chart) ───────────── */}
      <div className="glass-card" style={{ borderRadius: '16px', padding: '24px' }}>
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ color: '#e2e8f0', fontSize: '16px', fontWeight: 700, marginBottom: '4px' }}>
            Average Latency per Model
          </h3>
          <p style={{ color: '#475569', fontSize: '13px' }}>
            Comparative inference performance across deployed model endpoints
          </p>
        </div>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={latencyByModel} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
            <XAxis
              dataKey="model_name"
              tick={{ fill: '#475569', fontSize: 11, fontFamily: 'JetBrains Mono, monospace' }}
              axisLine={{ stroke: 'rgba(255,255,255,0.06)' }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: '#475569', fontSize: 11, fontFamily: 'JetBrains Mono, monospace' }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${v}ms`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="avg_latency"
              name="Avg Latency"
              fill="#8b5cf6"
              radius={[6, 6, 0, 0]}
              maxBarSize={60}
            />
            <Bar
              dataKey="count"
              name="Request Count"
              fill="#06b6d4"
              radius={[6, 6, 0, 0]}
              maxBarSize={60}
            />
            <Legend
              formatter={(value) => (
                <span style={{ color: '#64748b', fontSize: '12px', fontFamily: 'JetBrains Mono, monospace' }}>
                  {value}
                </span>
              )}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
