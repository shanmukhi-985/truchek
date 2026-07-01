import React, {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import type { User, AuthTokens, ApiError } from '../types/auth';
import {
  storeTokens,
  storeUser,
  clearAuthStorage,
  getStoredUser,
  getStoredToken,
  isRemembered,
  mockAuthService,
  authService,
  USE_MOCK,
} from '../lib/api/auth.service';
import type { LoginRequest, RegisterRequest } from '../types/auth';

// ─── Types ───────────────────────────────────────────────────────────────────────

interface AuthContextValue {
  user: User | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitializing: boolean;
  error: ApiError | null;
  login: (data: LoginRequest, remember?: boolean) => Promise<void>;
  register: (data: RegisterRequest) => Promise<{ requiresVerification: boolean }>;
  logout: () => Promise<void>;
  clearError: () => void;
  refreshUser: () => Promise<void>;
}

// ─── Context ─────────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextValue | null>(null);

// ─── Provider ────────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [tokens, setTokens] = useState<AuthTokens | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);
  const initRef = useRef(false);

  const service = USE_MOCK ? mockAuthService : authService;

  // ─── Initialize Auth State ─────────────────────────────────────────────────────

  useEffect(() => {
    if (initRef.current) return;
    initRef.current = true;

    const initAuth = async () => {
      try {
        const storedToken = getStoredToken();
        const storedUser = getStoredUser();

        if (storedToken && storedUser) {
          setUser(storedUser);
          setTokens({
            access_token: storedToken,
            refresh_token: '',
            token_type: 'Bearer',
            expires_in: 900,
          });

          // Optionally validate token with backend
          try {
            const freshUser = await service.getMe();
            setUser(freshUser);
            const remembered = isRemembered();
            storeUser(freshUser, remembered);
          } catch {
            // If validation fails, keep stored user for now
          }
        }
      } catch (_err) {
        clearAuthStorage();
      } finally {
        setIsInitializing(false);
      }
    };

    void initAuth();
  }, [service]);

  // ─── Listen for session expiry events ─────────────────────────────────────────

  useEffect(() => {
    const handleSessionExpired = () => {
      setUser(null);
      setTokens(null);
      clearAuthStorage();
    };

    window.addEventListener('auth:session-expired', handleSessionExpired);
    return () => window.removeEventListener('auth:session-expired', handleSessionExpired);
  }, []);

  // ─── Auth Actions ─────────────────────────────────────────────────────────────

  const login = useCallback(async (data: LoginRequest, remember = false) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await service.login(data);
      const { user: authUser, tokens: authTokens } = response;

      storeTokens(authTokens, remember || !!data.remember_me);
      storeUser(authUser, remember || !!data.remember_me);

      setUser(authUser);
      setTokens(authTokens);
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError);
      throw apiError;
    } finally {
      setIsLoading(false);
    }
  }, [service]);

  const register = useCallback(async (data: RegisterRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await service.register(data);
      const { user: authUser, tokens: authTokens } = response;

      // Don't log in immediately if email verification required
      const requiresVerification = !authUser.email_verified;

      if (!requiresVerification) {
        storeTokens(authTokens, false);
        storeUser(authUser, false);
        setUser(authUser);
        setTokens(authTokens);
      }

      return { requiresVerification };
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError);
      throw apiError;
    } finally {
      setIsLoading(false);
    }
  }, [service]);

  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      await service.logout();
    } finally {
      setUser(null);
      setTokens(null);
      clearAuthStorage();
      setIsLoading(false);
    }
  }, [service]);

  const clearError = useCallback(() => setError(null), []);

  const refreshUser = useCallback(async () => {
    try {
      const freshUser = await service.getMe();
      setUser(freshUser);
      const remembered = isRemembered();
      storeUser(freshUser, remembered);
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError);
    }
  }, [service]);

  // ─── Context Value ────────────────────────────────────────────────────────────

  const value: AuthContextValue = {
    user,
    tokens,
    isAuthenticated: !!user && !!tokens,
    isLoading,
    isInitializing,
    error,
    login,
    register,
    logout,
    clearError,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────────

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}

export { AuthContext };
