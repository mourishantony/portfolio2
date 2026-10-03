// app/api/auth/logout/route.ts
// ─────────────────────────────────────────────────────────────────────────────
// POST /api/auth/logout
// Clears the admin session cookie
// ─────────────────────────────────────────────────────────────────────────────
import { deleteSession } from '@/lib/auth'

export async function POST() {
  try {
    await deleteSession()
    return Response.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('[/api/auth/logout] Error:', error)
    return Response.json({ error: 'Logout failed.' }, { status: 500 })
  }
}
