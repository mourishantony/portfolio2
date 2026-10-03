// app/api/achievements/route.ts
// ─────────────────────────────────────────────────────────────────────────────
// POST   /api/achievements  — insert a new achievement (protected)
// DELETE /api/achievements  — delete by id (protected)
// ─────────────────────────────────────────────────────────────────────────────
import { NextRequest } from 'next/server'
import { verifySession } from '@/lib/auth'
import { serverClient } from '@/lib/supabase'

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
    const { title, description, date, badge_type } = body as {
      title: string
      description?: string
      date?: string
      badge_type: 'gold' | 'silver' | 'bronze' | 'award'
    }

    if (!title || !badge_type) {
      return Response.json(
        { error: 'Missing required fields: title, badge_type.' },
        { status: 400 }
      )
    }

    const validBadges = ['gold', 'silver', 'bronze', 'award']
    if (!validBadges.includes(badge_type)) {
      return Response.json(
        { error: `badge_type must be one of: ${validBadges.join(', ')}` },
        { status: 400 }
      )
    }

    const supabase = serverClient()
    const { data, error } = await supabase
      .from('achievements')
      .insert([{
        title,
        description: description ?? null,
        date:        date ?? null,
        badge_type,
      }])
      .select()
      .single()

    if (error) {
      console.error('[POST /api/achievements] Supabase error:', error.message)
      return Response.json({ error: error.message }, { status: 500 })
    }

    return Response.json({ success: true, achievement: data }, { status: 201 })
  } catch (error) {
    console.error('[POST /api/achievements] Error:', error)
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
      return Response.json({ error: 'Missing achievement id.' }, { status: 400 })
    }

    const supabase = serverClient()
    const { error } = await supabase.from('achievements').delete().eq('id', id)

    if (error) {
      console.error('[DELETE /api/achievements] Supabase error:', error.message)
      return Response.json({ error: error.message }, { status: 500 })
    }

    return Response.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('[DELETE /api/achievements] Error:', error)
    return Response.json({ error: 'Internal server error.' }, { status: 500 })
  }
}
