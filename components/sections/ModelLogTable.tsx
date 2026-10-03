'use client'
// components/sections/ModelLogTable.tsx
// Client component — table rows use onMouseEnter/onMouseLeave for hover highlight
import type { ModelLog } from '@/lib/types'
import { Database } from 'lucide-react'

interface Props {
  logs: ModelLog[]
  total: number
}

export default function ModelLogTable({ logs, total }: Props) {
  if (logs.length === 0) return null

  return (
    <div className="glass-card" style={{ borderRadius: '16px', marginTop: '32px', overflow: 'hidden' }}>
      <div
        style={{
          padding: '20px 24px',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <Database size={16} color="#6366f1" />
        <h3 style={{ color: '#e2e8f0', fontSize: '15px', fontWeight: 700 }}>
          Recent Inference Logs
        </h3>
        <span
          style={{
            marginLeft: 'auto',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '11px',
            color: '#475569',
          }}
        >
          Showing last {logs.length} of {total.toLocaleString()}
        </span>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
              {['Model', 'Latency (ms)', 'Status', 'Timestamp'].map((h) => (
                <th
                  key={h}
                  style={{
                    padding: '12px 20px',
                    textAlign: 'left',
                    fontSize: '11px',
                    fontWeight: 700,
                    color: '#475569',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    fontFamily: 'JetBrains Mono, monospace',
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {logs.map((log, i) => (
              <tr
                key={log.id}
                style={{
                  borderBottom: '1px solid rgba(255,255,255,0.03)',
                  background: i % 2 === 0 ? 'rgba(255,255,255,0.01)' : 'transparent',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = 'rgba(99,102,241,0.04)')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background =
                    i % 2 === 0 ? 'rgba(255,255,255,0.01)' : 'transparent')
                }
              >
                <td
                  style={{
                    padding: '12px 20px',
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '13px',
                    color: '#94a3b8',
                  }}
                >
                  {log.model_name}
                </td>
                <td
                  style={{
                    padding: '12px 20px',
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '13px',
                    color: log.latency_ms > 200 ? '#f59e0b' : '#10b981',
                    fontWeight: 600,
                  }}
                >
                  {Number(log.latency_ms).toFixed(1)}
                </td>
                <td style={{ padding: '12px 20px' }}>
                  <span
                    style={{
                      padding: '3px 10px',
                      borderRadius: '20px',
                      fontSize: '11px',
                      fontWeight: 700,
                      fontFamily: 'JetBrains Mono, monospace',
                      background:
                        log.status === 'success'
                          ? 'rgba(16,185,129,0.1)'
                          : 'rgba(244,63,94,0.1)',
                      color: log.status === 'success' ? '#10b981' : '#f43f5e',
                      border: `1px solid ${log.status === 'success' ? 'rgba(16,185,129,0.2)' : 'rgba(244,63,94,0.2)'}`,
                    }}
                  >
                    {log.status}
                  </span>
                </td>
                <td
                  style={{
                    padding: '12px 20px',
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '12px',
                    color: '#475569',
                  }}
                >
                  {new Date(log.timestamp).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
