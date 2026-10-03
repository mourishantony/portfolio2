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
 * Checks if a key is a real non-placeholder key.
 */
function isValidKey(key: string): boolean {
  if (!key) return false
  if (
    key === 'your_supabase_service_role_key' ||
    key === 'your_supabase_anon_key' ||
    key.startsWith('your_') ||
    key.startsWith('replace_')
  ) {
    return false
  }
  return true
}

/**
 * Checks if Supabase URL and at least one valid key (service role or anon) are configured.
 */
export function isSupabaseConfigured(): boolean {
  if (!supabaseUrl.startsWith('https://') || supabaseUrl.includes('placeholder')) {
    return false
  }
  return isValidKey(supabaseServiceRoleKey) || isValidKey(supabaseAnonKey)
}

/**
 * Checks if the service role key is configured (allows writes bypassing RLS).
 */
export function hasServiceRoleAccess(): boolean {
  return isValidKey(supabaseServiceRoleKey)
}

/**
 * Server-side Supabase client.
 * Uses SERVICE_ROLE_KEY if present (bypasses RLS for full admin operations).
 * Falls back to ANON_KEY for read queries if service role key is not yet set.
 * Returns null if Supabase is completely unconfigured.
 */
export function serverClient(): SupabaseClient | null {
  if (!isSupabaseConfigured()) {
    return null
  }
  const key = isValidKey(supabaseServiceRoleKey) ? supabaseServiceRoleKey : supabaseAnonKey
  return createClient(supabaseUrl, key, {
    auth: { persistSession: false },
    global: {
      fetch: (url, options) => {
        return fetch(url, {
          ...options,
          signal: options?.signal ?? AbortSignal.timeout(5000),
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
    !supabaseUrl.startsWith('https://') ||
    supabaseUrl.includes('placeholder') ||
    !isValidKey(supabaseAnonKey)
  ) {
    return null
  }
  return createClient(supabaseUrl, supabaseAnonKey)
}

