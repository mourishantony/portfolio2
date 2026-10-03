// app/api/projects/route.ts
// ─────────────────────────────────────────────────────────────────────────────
// POST   /api/projects  — insert a new project (protected)
// DELETE /api/projects  — delete a project by id (protected)
// ─────────────────────────────────────────────────────────────────────────────
import { NextRequest } from 'next/server'
import { verifySession } from '@/lib/auth'
import { serverClient } from '@/lib/supabase'
import { MOCK_PROJECTS } from '@/lib/mock-data'

export async function GET() {
  try {
    const supabase = serverClient()
    if (!supabase) {
      return Response.json({ projects: MOCK_PROJECTS })
    }
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('featured', { ascending: false })
      .order('created_at', { ascending: false })

    if (error) {
      console.error('[GET /api/projects] Supabase error:', error.message)
      return Response.json({ projects: MOCK_PROJECTS, error: error.message })
    }
    return Response.json({ projects: data ?? [] })
  } catch {
    return Response.json({ projects: MOCK_PROJECTS })
  }
}

async function requireAuth(): Promise<Response | null> {
  const isAdmin = await verifySession()
  if (!isAdmin) {
    return Response.json({ error: 'Unauthorized.' }, { status: 401 })
  }
  return null
}

export async function POST(request: NextRequest) {
  const authError = await requireAuth()
  if (authError) return authError

  try {
    const body = await request.json()
    const {
      title, description, github_url, live_demo_url,
      tech_stack, metrics_summary, category, featured,
    } = body

    if (!title || !description || !tech_stack || !category) {
      return Response.json({ error: 'Missing required fields: title, description, tech_stack, category.' }, { status: 400 })
    }

    const supabase = serverClient()
    if (!supabase) {
      return Response.json(
        { error: 'Supabase is not configured. Please add your credentials in .env.local.' },
        { status: 503 }
      )
    }
    const { data, error } = await supabase
      .from('projects')
      .insert([{
        title,
        description,
        github_url:       github_url ?? null,
        live_demo_url:    live_demo_url ?? null,
        tech_stack:       Array.isArray(tech_stack) ? tech_stack : [tech_stack],
        metrics_summary:  metrics_summary ?? null,
        category,
        featured:         featured ?? false,
      }])
      .select()
      .single()

    if (error) {
      console.error('[POST /api/projects] Supabase error:', error.message)
      if (error.code === '42501' || error.message?.includes('row-level security')) {
        return Response.json({
          error: 'Supabase Row-Level Security blocked this operation. Please add your SUPABASE_SERVICE_ROLE_KEY to .env.local (from Supabase Dashboard → Project Settings → API Keys).'
        }, { status: 403 })
      }
      return Response.json({ error: error.message }, { status: 500 })
    }

    return Response.json({ success: true, project: data }, { status: 201 })
  } catch (error) {
    console.error('[POST /api/projects] Error:', error)
    return Response.json({ error: 'Internal server error.' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  const authError = await requireAuth()
  if (authError) return authError

  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return Response.json({ error: 'Missing project id.' }, { status: 400 })
    }

    const supabase = serverClient()
    if (!supabase) {
      return Response.json(
        { error: 'Supabase is not configured. Please add your credentials in .env.local.' },
        { status: 503 }
      )
    }
    const { error } = await supabase.from('projects').delete().eq('id', id)

    if (error) {
      console.error('[DELETE /api/projects] Supabase error:', error.message)
      if (error.code === '42501' || error.message?.includes('row-level security')) {
        return Response.json({
          error: 'Supabase Row-Level Security blocked this deletion. Please add your SUPABASE_SERVICE_ROLE_KEY to .env.local (from Supabase Dashboard → Project Settings → API Keys).'
        }, { status: 403 })
      }
      return Response.json({ error: error.message }, { status: 500 })
    }

    return Response.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('[DELETE /api/projects] Error:', error)
    return Response.json({ error: 'Internal server error.' }, { status: 500 })
  }
}
