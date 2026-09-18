import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import type { Session, User as SupabaseUser } from '@supabase/supabase-js';
import { ADMIN_STORAGE_KEY, getAdminSecretKey } from './AdminContext';

export const ENABLE_PHONE_AUTH = false;

export const isAdmin = (): boolean => {
  try {
    return (
      localStorage.getItem('dev_mode') === 'ADMIN_2026' ||
      localStorage.getItem(ADMIN_STORAGE_KEY) === getAdminSecretKey()
    );
  } catch {
    return false;
  }
};

export const activateAdmin = (): void => {
  localStorage.setItem('dev_mode', 'ADMIN_2026');
};

export const deactivateAdmin = (): void => {
  localStorage.removeItem('dev_mode');
};

export type SubscriptionStatus = 'free' | 'basic' | 'pro' | 'elite';

export interface AuthUser {
  id: string;
  email: string | null;
  name: string | null;
  subscription_status: SubscriptionStatus;
  subscription_end_date?: string | null;
  created_at?: string | null;
}

export const hasPremiumAccess = (user: AuthUser | null): boolean => {
  const status = user?.subscription_status;
  return status === 'pro' || status === 'elite' || isAdmin();
};

interface AuthContextType {
  user: AuthUser | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithPhone: (phone: string) => Promise<void>;
  verifyOtp: (phone: string, token: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (user: AuthUser) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const buildAuthUser = async (supabaseUser: SupabaseUser): Promise<AuthUser> => {
  let name: string | null = null;
  const metaName = supabaseUser.user_metadata?.name ?? supabaseUser.user_metadata?.full_name;
  if (typeof metaName === 'string' && metaName.trim()) name = metaName.trim();
  let subscription_status: SubscriptionStatus = 'free';
  let subscription_end_date: string | null = null;
  let created_at: string | null = supabaseUser.created_at ?? null;

  try {
    const { data } = await supabase
      .from('profiles')
      .select('full_name, created_at')
      .eq('id', supabaseUser.id)
      .maybeSingle();
    if (data?.full_name && typeof data.full_name === 'string') name = data.full_name;
    if (data?.created_at) created_at = data.created_at;
  } catch {
    /* ignore */
  }

  try {
    const { data } = await supabase
      .from('subscriptions')
      .select('tier, status, expires_at')
      .eq('user_id', supabaseUser.id)
      .order('started_at', { ascending: false })
      .limit(1)
      .maybeSingle();
    if (data?.tier && data.status !== 'cancelled') {
      subscription_status = data.tier as SubscriptionStatus;
    }
    if (data?.expires_at) subscription_end_date = data.expires_at;
  } catch {
    /* ignore */
  }

  return {
    id: supabaseUser.id,
    email: supabaseUser.email ?? null,
    name,
    subscription_status,
    subscription_end_date,
    created_at,
  };
};

const ensureProfile = async (id: string, name: string | null): Promise<void> => {
  try {
    const { data } = await supabase.from('profiles').select('id').eq('id', id).maybeSingle();
    if (data) return;
    await supabase
      .from('profiles')
      .upsert({ id, full_name: name ?? null, updated_at: new Date().toISOString() }, { onConflict: 'id' });
  } catch {
    /* ignore */
  }
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      const { data } = await supabase.auth.getSession();
      if (!mounted) return;
      setSession(data.session);
      if (data.session?.user) {
        const built = await buildAuthUser(data.session.user);
        if (mounted) setUser(built);
        void ensureProfile(data.session.user.id, built.name);
      }
      if (mounted) setLoading(false);
    };
    void init();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, nextSession) => {
      if (!mounted) return;
      setSession(nextSession);
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED' || event === 'USER_UPDATED' || event === 'INITIAL_SESSION') {
        if (nextSession?.user) {
          const built = await buildAuthUser(nextSession.user);
          if (mounted) setUser(built);
          void ensureProfile(nextSession.user.id, built.name);
        }
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      }
      if (mounted) setLoading(false);
    });

    return () => {
      mounted = false;
      authListener.subscription.unsubscribe();
    };
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    setSession(data.session);
    if (data.user) {
      setUser(await buildAuthUser(data.user));
    }
  }, []);

  const signUp = useCallback(async (name: string, email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name, full_name: name } },
    });
    if (error) throw error;
    if (data.session) setSession(data.session);
    if (data.user) {
      setUser(await buildAuthUser(data.user));
      void ensureProfile(data.user.id, name || null);
    }
  }, []);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
  }, []);

  const signInWithGoogle = useCallback(async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}${import.meta.env.BASE_URL}`,
      },
    });
    if (error) throw error;
  }, []);

  const signInWithPhone = useCallback(async (phone: string) => {
    const { error } = await supabase.auth.signInWithOtp({ phone });
    if (error) throw error;
  }, []);

  const verifyOtp = useCallback(async (phone: string, token: string) => {
    const { data, error } = await supabase.auth.verifyOtp({ phone, token, type: 'sms' });
    if (error) throw error;
    setSession(data.session);
    if (data.user) {
      setUser(await buildAuthUser(data.user));
      void ensureProfile(data.user.id, (data.user.user_metadata?.name as string | undefined) ?? null);
    }
  }, []);

  const login = signIn;
  const register = signUp;
  const logout = useCallback(() => {
    void signOut();
  }, [signOut]);

  const updateUser = useCallback((updatedUser: AuthUser) => {
    setUser(updatedUser);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        signIn,
        signUp,
        signOut,
        signInWithGoogle,
        signInWithPhone,
        verifyOtp,
        login,
        register,
        logout,
        updateUser,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};