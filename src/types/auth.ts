// ─── Auth Types ────────────────────────────────────────────────────────────────

export type UserRole = 'user' | 'admin' | 'moderator';

export interface User {
  id: string;
  full_name: string;
  email: string;
  email_verified: boolean;
  avatar?: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
  last_login?: string;
}

export interface AuthTokens {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
}

export interface AuthState {
  user: User | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitializing: boolean;
}

// ─── API Request/Response Schemas ──────────────────────────────────────────────

export interface RegisterRequest {
  full_name: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
  remember_me?: boolean;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
}

export interface VerifyEmailRequest {
  token: string;
}

export interface RefreshTokenRequest {
  refresh_token: string;
}

export interface AuthResponse {
  user: User;
  tokens: AuthTokens;
  message?: string;
}

export interface MessageResponse {
  message: string;
  success: boolean;
}

// ─── Form Schemas ───────────────────────────────────────────────────────────────

export interface LoginFormValues {
  email: string;
  password: string;
  remember_me: boolean;
}

export interface SignupFormValues {
  full_name: string;
  email: string;
  password: string;
  confirm_password: string;
  accept_terms: boolean;
}

export interface ForgotPasswordFormValues {
  email: string;
}

export interface ResetPasswordFormValues {
  password: string;
  confirm_password: string;
}

// ─── Error Types ────────────────────────────────────────────────────────────────

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
  errors?: Record<string, string[]>;
}

export type AuthErrorCode =
  | 'INVALID_CREDENTIALS'
  | 'EMAIL_NOT_VERIFIED'
  | 'EMAIL_ALREADY_EXISTS'
  | 'INVALID_TOKEN'
  | 'EXPIRED_TOKEN'
  | 'USER_NOT_FOUND'
  | 'WEAK_PASSWORD'
  | 'NETWORK_ERROR'
  | 'SERVER_ERROR'
  | 'UNAUTHORIZED'
  | 'SESSION_EXPIRED';
