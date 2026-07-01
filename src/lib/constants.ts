// ─── App Constants ──────────────────────────────────────────────────────────────

export const APP_NAME = 'TruChek';
export const APP_TAGLINE = 'Think. Check. Trust.';
export const APP_DESCRIPTION = 'AI-powered fact-checking platform';

// ─── API ────────────────────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const API_BASE_URL = (import.meta as any).env?.VITE_API_URL ?? 'http://localhost:8000';
export const API_VERSION = '/api/v1';
export const API_URL = `${API_BASE_URL}${API_VERSION}`;

// ─── Auth ───────────────────────────────────────────────────────────────────────

export const AUTH_TOKEN_KEY = 'truchek_access_token';
export const AUTH_REFRESH_TOKEN_KEY = 'truchek_refresh_token';
export const AUTH_USER_KEY = 'truchek_user';
export const AUTH_REMEMBER_KEY = 'truchek_remember';

export const ACCESS_TOKEN_EXPIRY = 15 * 60 * 1000; // 15 minutes
export const REFRESH_TOKEN_EXPIRY = 7 * 24 * 60 * 60 * 1000; // 7 days

// ─── Routes ─────────────────────────────────────────────────────────────────────

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  VERIFY_EMAIL: '/verify-email',
  VERIFY_EMAIL_SUCCESS: '/verify-email/success',
  SESSION_EXPIRED: '/session-expired',
  UNAUTHORIZED: '/unauthorized',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
} as const;

// ─── Password Strength ──────────────────────────────────────────────────────────

export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_STRENGTH_LABELS = ['Very Weak', 'Weak', 'Fair', 'Strong', 'Very Strong'] as const;
export const PASSWORD_STRENGTH_COLORS = [
  '#ef4444', // red
  '#f97316', // orange
  '#eab308', // yellow
  '#22c55e', // green
  '#10b981', // emerald
] as const;
