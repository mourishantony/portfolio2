// app/api/auth/login/route.ts
// ─────────────────────────────────────────────────────────────────────────────
// POST /api/auth/login
// Validates admin credentials from env vars, creates httpOnly JWT session cookie
// ─────────────────────────────────────────────────────────────────────────────
import { NextRequest } from 'next/server'
import { createSession } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body as { email: string; password: string }

    const adminEmail    = process.env.ADMIN_EMAIL
    const adminPassword = process.env.ADMIN_PASSWORD

    if (!adminEmail || !adminPassword) {
      return Response.json(
        { error: 'Server misconfiguration: admin credentials not set.' },
        { status: 500 }
      )
    }

    // Constant-time comparison is ideal; for a personal portfolio this is fine
    const emailMatch    = email    === adminEmail
    const passwordMatch = password === adminPassword

    if (!emailMatch || !passwordMatch) {
      // Uniform error to avoid email enumeration
      return Response.json(
        { error: 'Invalid credentials.' },
        { status: 401 }
      )
    }

    // Valid credentials — create JWT session cookie
    await createSession()

    return Response.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('[/api/auth/login] Error:', error)
    return Response.json({ error: 'Internal server error.' }, { status: 500 })
  }
}
