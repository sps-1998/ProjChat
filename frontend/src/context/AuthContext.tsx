import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

interface User { id: string; username: string; }
interface AuthContextType {
  user: User | null;
  login: (u: string, p: string) => Promise<void>;
  signup: (u: string, p: string) => Promise<void>;
  logout: () => void;
  token: string | null;
}

const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // On mount, restore from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('auth');
    if (saved) {
      const { user, token } = JSON.parse(saved);
      setUser(user);
      setToken(token);
    }
  }, []);

  const persist = (u: User, t: string) => {
    setUser(u); setToken(t);
    localStorage.setItem('auth', JSON.stringify({ user: u, token: t }));
  };

  const signup = async (username: string, password: string) => {
    const res = await fetch('http://localhost:4000/auth/signup', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    if (!res.ok) throw new Error('Signup failed');
    const { user, token } = await res.json();
    persist(user, token);
  };

  const login = async (username: string, password: string) => {
    const res = await fetch('http://localhost:4000/auth/login', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    if (!res.ok) throw new Error('Login failed');
    const { user, token } = await res.json();
    persist(user, token);
  };

  const logout = () => {
    setUser(null); setToken(null);
    localStorage.removeItem('auth');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
