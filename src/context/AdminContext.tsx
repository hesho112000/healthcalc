import React, { createContext, useCallback, useContext, useEffect } from 'react';

interface AdminContextType {
  isAdmin: boolean;
  disableAdmin: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const disableAdmin = useCallback(() => {
    try {
      ['adminToken', 'healthcalc_admin_password_override', 'dev_mode'].forEach((key) => localStorage.removeItem(key));
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    disableAdmin();
  }, [disableAdmin]);

  return (
    <AdminContext.Provider
      value={{ isAdmin: false, disableAdmin }}
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
