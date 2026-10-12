import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

/**
 * Public Supabase client for read-only access to published records (subject to RLS)
 */
let publicClient: SupabaseClient | null = null;
export function getPublicSupabase(): SupabaseClient | null {
  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }
  if (!publicClient) {
    publicClient = createClient(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: false },
    });
  }
  return publicClient;
}

/**
 * Admin Supabase client with Service Role Key (SERVER & CLI SCRIPTS ONLY)
 * Never expose or import in browser code.
 */
let adminClient: SupabaseClient | null = null;
export function getAdminSupabase(): SupabaseClient | null {
  if (!supabaseUrl || !supabaseServiceKey) {
    return null;
  }
  if (!adminClient) {
    adminClient = createClient(supabaseUrl, supabaseServiceKey, {
      auth: { persistSession: false },
    });
  }
  return adminClient;
}
