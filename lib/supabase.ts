// lib/supabase.ts
// ─────────────────────────────────────────────────────────────────────────────
// Supabase client factory
//   • serverClient()  — uses SERVICE_ROLE_KEY, bypasses RLS, server-only
//   • browserClient() — uses ANON_KEY, safe for client components
// ─────────────────────────────────────────────────────────────────────────────
import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

/**
 * Checks if Supabase is properly configured with real, non-placeholder credentials.
 */
export function isSupabaseConfigured(): boolean {
  if (!supabaseUrl || !supabaseServiceRoleKey) return false
  if (
    supabaseServiceRoleKey === 'your_supabase_service_role_key' ||
    supabaseServiceRoleKey.startsWith('your_') ||
    supabaseServiceRoleKey.startsWith('replace_')
  ) {
    return false
  }
  if (!supabaseUrl.startsWith('https://') || supabaseUrl.includes('placeholder')) {
    return false
  }
  return true
}

/**
 * Server-side Supabase client using the SERVICE ROLE key.
 * Has full database access and bypasses Row Level Security.
 * NEVER import this in a client component.
 * Returns null if Supabase is not configured or uses placeholder credentials.
 */
export function serverClient(): SupabaseClient | null {
  if (!isSupabaseConfigured()) {
    return null
  }
  return createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: { persistSession: false },
    global: {
      fetch: (url, options) => {
        return fetch(url, {
          ...options,
          signal: options?.signal ?? AbortSignal.timeout(3000),
        })
      },
    },
  })
}

/**
 * Browser-safe Supabase client using the ANON key.
 * Subject to Row Level Security policies.
 * Safe to use in client components.
 */
export function browserClient(): SupabaseClient | null {
  if (
    !supabaseUrl ||
    !supabaseAnonKey ||
    supabaseAnonKey.startsWith('your_') ||
    supabaseAnonKey.startsWith('replace_')
  ) {
    return null
  }
  return createClient(supabaseUrl, supabaseAnonKey)
}

