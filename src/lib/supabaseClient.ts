import type { SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const hasSupabaseConfig = (): boolean => Boolean(supabaseUrl && supabaseAnonKey);

let clientPromise: Promise<SupabaseClient | null> | null = null;

/**
 * Lazily loads `@supabase/supabase-js` so the SDK is excluded from the initial
 * JavaScript bundle and only fetched the first time auth or data access runs.
 * Every caller shares the same client instance.
 */
export const getSupabaseClient = (): Promise<SupabaseClient | null> => {
  if (!hasSupabaseConfig()) return Promise.resolve(null);

  if (!clientPromise) {
    clientPromise = import('@supabase/supabase-js')
      .then(({ createClient }) =>
        createClient(supabaseUrl as string, supabaseAnonKey as string, {
          auth: {
            persistSession: true,
            autoRefreshToken: true,
            detectSessionInUrl: true,
          },
        }),
      )
      .catch((error) => {
        // Allow a later call to retry if the chunk failed to load.
        clientPromise = null;
        throw error;
      });
  }

  return clientPromise;
};
