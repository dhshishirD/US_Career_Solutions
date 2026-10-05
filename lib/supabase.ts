'use client';

import { createClient, SupabaseClient } from '@supabase/supabase-js';

let cachedClient: SupabaseClient | null = null;

export function getSupabaseConfig(): { url: string; anonKey: string } | null {
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

  return null;
}

export function saveSupabaseConfig(url: string, anonKey: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('usc_supabase_url', url.trim());
    localStorage.setItem('usc_supabase_anon_key', anonKey.trim());
    cachedClient = null; // reset cached instance
  }
}

export function getSupabase(): SupabaseClient | null {
  if (cachedClient) return cachedClient;

  const config = getSupabaseConfig();
  if (!config) return null;

  try {
    cachedClient = createClient(config.url, config.anonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    });
    return cachedClient;
  } catch (err) {
    console.warn('Failed to initialize Supabase client:', err);
    return null;
  }
}

export async function signInWithGoogleSupabase(redirectTo?: string) {
  const supabase = getSupabase();
  if (!supabase) {
    throw new Error('Supabase configuration missing');
  }

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
