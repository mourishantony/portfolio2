// app/api/model-logs/route.ts
// ─────────────────────────────────────────────────────────────────────────────
// POST /api/model-logs — insert a new inference log entry (protected)
// ─────────────────────────────────────────────────────────────────────────────
import { NextRequest } from 'next/server'
import { verifySession } from '@/lib/auth'
import { serverClient } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  const isAdmin = await verifySession()
  if (!isAdmin) {
    return Response.json({ error: 'Unauthorized.' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { model_name, latency_ms, status } = body as {
      model_name: string
      latency_ms: number
      status: string
    }

    if (!model_name || latency_ms == null) {
      return Response.json(
        { error: 'Missing required fields: model_name, latency_ms.' },
        { status: 400 }
      )
    }

    if (isNaN(latency_ms) || latency_ms < 0) {
      return Response.json(
        { error: 'latency_ms must be a non-negative number.' },
        { status: 400 }
      )
    }

    const supabase = serverClient()
    if (!supabase) {
      return Response.json(
        { error: 'Supabase is not configured. Please add your credentials in .env.local.' },
        { status: 503 }
      )
    }
    const { data, error } = await supabase
      .from('model_logs')
      .insert([{
        model_name,
        latency_ms,
        status: status ?? 'success',
      }])
      .select()
      .single()

    if (error) {
      console.error('[POST /api/model-logs] Supabase error:', error.message)
      return Response.json({ error: error.message }, { status: 500 })
    }

    return Response.json({ success: true, log: data }, { status: 201 })
  } catch (error) {
    console.error('[POST /api/model-logs] Error:', error)
    return Response.json({ error: 'Internal server error.' }, { status: 500 })
  }
}
