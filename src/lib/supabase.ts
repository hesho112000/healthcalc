import type { SupabaseClient } from '@supabase/supabase-js';
import { getSupabaseClient } from './supabaseClient';

/**
 * Resolves the shared Supabase client, loading the SDK on first use.
 * Throws when the environment variables are missing, matching the previous
 * eager implementation but without pulling the SDK into the initial bundle.
 */
export const getSupabase = async (): Promise<SupabaseClient> => {
  const client = await getSupabaseClient();
  if (!client) {
    throw new Error('Missing Supabase environment variables');
  }
  return client;
};
