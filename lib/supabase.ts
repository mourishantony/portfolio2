// lib/supabase.ts
// ─────────────────────────────────────────────────────────────────────────────
// Supabase client factory
//   • serverClient()  — uses SERVICE_ROLE_KEY, bypasses RLS, server-only
//   • browserClient() — uses ANON_KEY, safe for client components
// ─────────────────────────────────────────────────────────────────────────────
import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

/**
 * Server-side Supabase client using the SERVICE ROLE key.
 * Has full database access and bypasses Row Level Security.
 * NEVER import this in a client component.
 */
export function serverClient(): SupabaseClient {
  if (!supabaseUrl || !supabaseServiceRoleKey) {
    throw new Error(
      'Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY env variables.'
    )
  }
  return createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: { persistSession: false },
  })
}

/**
 * Browser-safe Supabase client using the ANON key.
 * Subject to Row Level Security policies.
 * Safe to use in client components.
 */
export function browserClient(): SupabaseClient {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      'Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY env variables.'
    )
  }
  return createClient(supabaseUrl, supabaseAnonKey)
}
