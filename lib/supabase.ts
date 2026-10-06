'use client';

import { createClient, SupabaseClient } from '@supabase/supabase-js';

let cachedClient: SupabaseClient | null = null;

// Official Supabase credentials for US Career Solutions project (gsshpnbyrwgrjpvksmag)
const DEFAULT_SUPABASE_URL = 'https://gsshpnbyrwgrjpvksmag.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdzc2hwbmJ5cndncmpwdmtzbWFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEyNjIxNzYsImV4cCI6MjEwNjgzODE3Nn0.baKofIt8ics7KANawAYYC3UcL1Wz5esjroQ3uhM6B_A';
export const GOOGLE_CLIENT_ID = '260193044309-vst2pf45p1iigsbivdv6vng7stn2nl3s.apps.googleusercontent.com';

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
      if (localUrl.includes('vfozkewdnelkgsluntex')) {
        localStorage.removeItem('usc_supabase_url');
        localStorage.removeItem('usc_supabase_anon_key');
      } else {
        return { url: localUrl, anonKey: localKey };
      }
    }
  }

  return {
    url: DEFAULT_SUPABASE_URL,
    anonKey: DEFAULT_SUPABASE_ANON_KEY
  };
}

export function saveSupabaseConfig(url: string, anonKey: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('usc_supabase_url', url.trim());
    localStorage.setItem('usc_supabase_anon_key', anonKey.trim());
    cachedClient = null;
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

export async function signInWithGoogleIdToken(idToken: string) {
  const supabase = getSupabase();
  const { data, error } = await supabase.auth.signInWithIdToken({
    provider: 'google',
    token: idToken
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
