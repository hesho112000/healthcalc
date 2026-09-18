import React, { createContext, useCallback, useContext, useState } from 'react';

// TODO: Replace with server-side admin auth before production.
export const ADMIN_SECRET_KEY: string =
  (import.meta.env.VITE_ADMIN_SECRET_KEY as string | undefined) ?? 'healthcalc-admin-2026-v1';

export const ADMIN_PASSWORD_OVERRIDE_KEY = 'healthcalc_admin_password_override';

export const getAdminSecretKey = (): string => {
  try {
    const override = localStorage.getItem(ADMIN_PASSWORD_OVERRIDE_KEY);
    if (override && override.trim()) return override.trim();
  } catch {
    /* ignore */
  }
  return ADMIN_SECRET_KEY;
};

export const ADMIN_STORAGE_KEY = 'adminToken';

interface AdminContextType {
  isAdmin: boolean;
  adminToken: string | null;
  enableAdmin: (password: string) => boolean;
  disableAdmin: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

const readToken = (): string | null => {
  try {
    return localStorage.getItem(ADMIN_STORAGE_KEY);
  } catch {
    return null;
  }
};

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [adminToken, setAdminToken] = useState<string | null>(readToken);

  const enableAdmin = useCallback((password: string): boolean => {
    if (password !== getAdminSecretKey()) {
      return false;
    }
    try {
      localStorage.setItem(ADMIN_STORAGE_KEY, getAdminSecretKey());
    } catch {
      /* ignore */
    }
    setAdminToken(getAdminSecretKey());
    return true;
  }, []);

  const disableAdmin = useCallback(() => {
    try {
      localStorage.removeItem(ADMIN_STORAGE_KEY);
    } catch {
      /* ignore */
    }
    setAdminToken(null);
  }, []);

  return (
    <AdminContext.Provider
      value={{ isAdmin: adminToken === getAdminSecretKey(), adminToken, enableAdmin, disableAdmin }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = (): AdminContextType => {
  const context = useContext(AdminContext);
  if (!context) throw new Error('useAdmin must be used within an AdminProvider');
  return context;
};

export default AdminProvider;