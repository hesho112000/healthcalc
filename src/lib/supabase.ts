import type { SupabaseClient } from '@supabase/supabase-js';
import { supabaseClient } from './supabaseClient';

if (!supabaseClient) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase: SupabaseClient = supabaseClient;