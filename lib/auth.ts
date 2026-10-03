// lib/auth.ts
// ─────────────────────────────────────────────────────────────────────────────
// Session helpers using Jose (JWT) + Next.js cookies() API
// Pattern sourced from Next.js 16 official auth guide
// ─────────────────────────────────────────────────────────────────────────────
import 'server-only'
import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

const SESSION_COOKIE = 'admin_session'
const secretKey = process.env.SESSION_SECRET
if (!secretKey) throw new Error('Missing SESSION_SECRET env variable.')
const encodedKey = new TextEncoder().encode(secretKey)

export type SessionPayload = {
  isAdmin: boolean
  expiresAt: Date
}

// ── Encrypt → signed JWT ───────────────────────────────────────────────────
export async function encrypt(payload: SessionPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey)
}

// ── Decrypt → verify JWT ───────────────────────────────────────────────────
export async function decrypt(
  token: string | undefined = ''
): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, encodedKey, {
      algorithms: ['HS256'],
    })
    return payload as unknown as SessionPayload
  } catch {
    return null
  }
}

// ── Create session cookie ──────────────────────────────────────────────────
export async function createSession(): Promise<void> {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  const token = await encrypt({ isAdmin: true, expiresAt })
  const cookieStore = await cookies()

  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  })
}

// ── Delete session cookie ──────────────────────────────────────────────────
export async function deleteSession(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE)
}

// ── Verify session (used in middleware & server components) ────────────────
export async function verifySession(): Promise<boolean> {
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE)?.value
  if (!token) return false
  const payload = await decrypt(token)
  return payload?.isAdmin === true
}
