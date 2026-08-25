import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api, User, ensureBackend } from '../utils/api';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  backendUp: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (user: User) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const GUEST_USER: User = {
  id: 0,
  name: 'Guest',
  email: '',
  subscription_status: 'free',
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [backendUp, setBackendUp] = useState(true);

  useEffect(() => {
    const init = async () => {
      const up = await ensureBackend();
      setBackendUp(up);

      if (!up) {
        const savedUser = localStorage.getItem('healthcalc-user');
        if (savedUser) {
          try { setUser(JSON.parse(savedUser)); } catch { /* ignore */ }
        }
        setLoading(false);
        return;
      }

      const token = localStorage.getItem('healthcalc-token');
      if (token) {
        api.getProfile()
          .then((data) => {
            setUser(data.user);
            localStorage.setItem('healthcalc-user', JSON.stringify(data.user));
          })
          .catch(() => {
            localStorage.removeItem('healthcalc-token');
          })
          .finally(() => setLoading(false));
      } else {
        setLoading(false);
      }
    };
    init();
  }, []);

  const login = async (email: string, password: string) => {
    const data = await api.login(email, password);
    localStorage.setItem('healthcalc-token', data.token);
    localStorage.setItem('healthcalc-user', JSON.stringify(data.user));
    setUser(data.user);
  };

  const register = async (name: string, email: string, password: string) => {
    const data = await api.register(name, email, password);
    localStorage.setItem('healthcalc-token', data.token);
    localStorage.setItem('healthcalc-user', JSON.stringify(data.user));
    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem('healthcalc-token');
    localStorage.removeItem('healthcalc-user');
    setUser(null);
  };

  const updateUser = (updatedUser: User) => {
    localStorage.setItem('healthcalc-user', JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider value={{ user, loading, backendUp, login, register, logout, updateUser, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
