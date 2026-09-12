import React, { createContext, useCallback, useContext, useState } from 'react';

// TODO: Replace with server-side admin auth before production.
export const ADMIN_SECRET_KEY: string =
  (import.meta.env.VITE_ADMIN_SECRET_KEY as string | undefined) ?? 'healthcalc-admin-2026-v1';

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
    if (password !== ADMIN_SECRET_KEY) {
      return false;
    }
    try {
      localStorage.setItem(ADMIN_STORAGE_KEY, ADMIN_SECRET_KEY);
    } catch {
      /* ignore */
    }
    setAdminToken(ADMIN_SECRET_KEY);
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
      value={{ isAdmin: adminToken === ADMIN_SECRET_KEY, adminToken, enableAdmin, disableAdmin }}
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