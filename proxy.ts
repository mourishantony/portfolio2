// proxy.ts  (renamed from middleware.ts — Next.js 16 uses proxy.ts)
// ─────────────────────────────────────────────────────────────────────────────
// Proxy: protect /paapu/manage and sub-routes with JWT verification
// Runs at the Edge before every matching request
// ─────────────────────────────────────────────────────────────────────────────
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const SESSION_COOKIE = 'admin_session'
const secretKey = process.env.SESSION_SECRET
const encodedKey = secretKey
  ? new TextEncoder().encode(secretKey)
  : new TextEncoder().encode('fallback-key-replace-this')

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Only protect /paapu/manage and deeper paths
  if (pathname.startsWith('/paapu/manage')) {
    const token = request.cookies.get(SESSION_COOKIE)?.value

    if (!token) {
      return NextResponse.redirect(new URL('/paapu', request.url))
    }

    try {
      await jwtVerify(token, encodedKey, { algorithms: ['HS256'] })
      return NextResponse.next()
    } catch {
      // Token invalid or expired — clear cookie and redirect
      const response = NextResponse.redirect(new URL('/paapu', request.url))
      response.cookies.delete(SESSION_COOKIE)
      return response
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/paapu/manage/:path*'],
}
