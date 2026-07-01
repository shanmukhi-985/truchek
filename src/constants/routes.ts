/**
 * TruChek — Route Path Constants
 * Centralized route definitions — single source of truth
 */

export const ROUTES = {
  // ---- Public Routes ----
  HOME:              "/",
  ABOUT:             "/about",
  PRICING:           "/pricing",
  CONTACT:           "/contact",
  HOW_IT_WORKS:      "/how-it-works",
  PRIVACY:           "/privacy",
  TERMS:             "/terms",

  // ---- Auth Routes (public, guest-only) ----
  AUTH: {
    LOGIN:           "/auth/login",
    REGISTER:        "/auth/register",
    FORGOT_PASSWORD: "/auth/forgot-password",
    RESET_PASSWORD:  "/auth/reset-password",
    VERIFY_EMAIL:    "/auth/verify-email",
    SSO_CALLBACK:    "/auth/sso/callback",
  },

  // ---- Protected App Routes ----
  APP: {
    DASHBOARD:       "/app/dashboard",
    SCAN: {
      NEW:           "/app/scan",
      SMS:           "/app/scan/sms",
      EMAIL:         "/app/scan/email",
      WHATSAPP:      "/app/scan/whatsapp",
      URL:           "/app/scan/url",
      QR_CODE:       "/app/scan/qr-code",
      IMAGE:         "/app/scan/image",
      DOCUMENT:      "/app/scan/document",
      PHONE:         "/app/scan/phone",
      SOCIAL:        "/app/scan/social",
    },
    RESULT:          (id: string) => `/app/results/${id}`,
    RESULTS:         "/app/results",
    HISTORY:         "/app/history",
    REPORTS: {
      COMMUNITY:     "/app/reports",
      NEW:           "/app/reports/new",
      DETAIL:        (id: string) => `/app/reports/${id}`,
    },
    ANALYTICS:       "/app/analytics",
    SETTINGS: {
      ROOT:          "/app/settings",
      PROFILE:       "/app/settings/profile",
      SECURITY:      "/app/settings/security",
      NOTIFICATIONS: "/app/settings/notifications",
      PREFERENCES:   "/app/settings/preferences",
      API_KEYS:      "/app/settings/api-keys",
    },
    PROFILE:         (username: string) => `/app/users/${username}`,
  },

  // ---- Admin Routes ----
  ADMIN: {
    ROOT:            "/admin",
    DASHBOARD:       "/admin/dashboard",
    USERS:           "/admin/users",
    USER_DETAIL:     (id: string) => `/admin/users/${id}`,
    SCANS:           "/admin/scans",
    REPORTS:         "/admin/reports",
    ANALYTICS:       "/admin/analytics",
    LOGS:            "/admin/logs",
    SETTINGS:        "/admin/settings",
  },

  // ---- Error Routes ----
  ERROR: {
    NOT_FOUND:       "/404",
    SERVER_ERROR:    "/500",
    UNAUTHORIZED:    "/401",
    FORBIDDEN:       "/403",
  },
} as const;

// Shared (public) scan result URL
export const SHARED_RESULT_URL = (token: string) => `/s/${token}`;
