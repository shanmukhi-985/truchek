import React, { createContext, useContext, useState } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: "user" | "admin";
  trustScore: number;
  joinedAt: string;
}

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// Demo user for Phase 3 UI
const DEMO_USER: User = {
  id: "usr_demo_01",
  name: "Alex Morgan",
  email: "alex@truchek.ai",
  avatar: undefined,
  role: "user",
  trustScore: 94,
  joinedAt: "2024-01-15",
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("truchek-user");
    return stored ? JSON.parse(stored) : DEMO_USER; // Demo: always logged in for Phase 3
  });
  const [isLoading, setIsLoading] = useState(false);

  const login = async (_email: string, _password: string) => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setUser(DEMO_USER);
    localStorage.setItem("truchek-user", JSON.stringify(DEMO_USER));
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("truchek-user");
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, login, logout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
