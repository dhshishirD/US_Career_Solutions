'use client';

import { createClient, SupabaseClient } from '@supabase/supabase-js';

let cachedClient: SupabaseClient | null = null;

// Official Supabase credentials provided by project administrator
const DEFAULT_SUPABASE_URL = 'https://vfozkewdnelkgsluntex.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY = 'sb_publishable_0N-bsiW8Zxqiri5FEEoRoQ_x0naDUwt';

export function getSupabaseConfig(): { url: string; anonKey: string } {
  const envUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const envKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (envUrl && envKey) {
    return { url: envUrl, anonKey: envKey };
  }

  if (typeof window !== 'undefined') {
    const localUrl = localStorage.getItem('usc_supabase_url');
    const localKey = localStorage.getItem('usc_supabase_anon_key');
    if (localUrl && localKey) {
      return { url: localUrl, anonKey: localKey };
    }
  }

  // Fallback to configured project credentials
  return {
    url: DEFAULT_SUPABASE_URL,
    anonKey: DEFAULT_SUPABASE_ANON_KEY
  };
}

export function saveSupabaseConfig(url: string, anonKey: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('usc_supabase_url', url.trim());
    localStorage.setItem('usc_supabase_anon_key', anonKey.trim());
    cachedClient = null; // reset cached instance
  }
}

export function getSupabase(): SupabaseClient {
  if (cachedClient) return cachedClient;

  const config = getSupabaseConfig();

  cachedClient = createClient(config.url, config.anonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    }
  });
  return cachedClient;
}

export async function signInWithGoogleSupabase(redirectTo?: string) {
  const supabase = getSupabase();
  const callbackUrl = redirectTo || `${window.location.origin}/auth/callback`;

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: callbackUrl,
      queryParams: {
        access_type: 'offline',
        prompt: 'consent'
      }
    }
  });

  if (error) {
    throw error;
  }

  return data;
}

export async function signOutSupabase() {
  const supabase = getSupabase();
  if (supabase) {
    await supabase.auth.signOut();
  }
}
