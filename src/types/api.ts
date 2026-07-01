/**
 * TruChek — API Response Types
 * Standardized shapes for all API communication
 */

import type { PaginationMeta } from "./common";

// ============================================================
// BASE API RESPONSE ENVELOPE
// ============================================================

export interface ApiResponse<T = unknown> {
  success: boolean;
  data: T;
  message?: string;
  timestamp: string;
  requestId?: string;
}

export interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Record<string, string[]>;
    field?: string;
  };
  timestamp: string;
  requestId?: string;
  path?: string;
}

export interface ApiListResponse<T> {
  success: boolean;
  data: T[];
  meta: PaginationMeta;
  timestamp: string;
}

// ============================================================
// HTTP METHODS
// ============================================================

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

// ============================================================
// REQUEST CONFIG
// ============================================================

export interface RequestConfig {
  baseURL?: string;
  timeout?: number;
  headers?: Record<string, string>;
  withCredentials?: boolean;
  signal?: AbortSignal;
}

// ============================================================
// ERROR CODES
// ============================================================

export enum ApiErrorCode {
  // Auth
  UNAUTHORIZED        = "UNAUTHORIZED",
  FORBIDDEN           = "FORBIDDEN",
  TOKEN_EXPIRED       = "TOKEN_EXPIRED",
  INVALID_CREDENTIALS = "INVALID_CREDENTIALS",

  // Resource
  NOT_FOUND           = "NOT_FOUND",
  CONFLICT            = "CONFLICT",
  GONE                = "GONE",

  // Validation
  VALIDATION_ERROR    = "VALIDATION_ERROR",
  INVALID_INPUT       = "INVALID_INPUT",

  // Rate Limiting
  RATE_LIMITED        = "RATE_LIMITED",
  QUOTA_EXCEEDED      = "QUOTA_EXCEEDED",

  // Server
  INTERNAL_ERROR      = "INTERNAL_ERROR",
  SERVICE_UNAVAILABLE = "SERVICE_UNAVAILABLE",
  TIMEOUT             = "TIMEOUT",

  // Unknown
  UNKNOWN             = "UNKNOWN",
}

// ============================================================
// API ENDPOINT REGISTRY (Future modules)
// ============================================================

export const ApiEndpoints = {
  // Health
  HEALTH:     "/health",
  VERSION:    "/version",

  // Auth
  AUTH: {
    LOGIN:          "/auth/login",
    LOGOUT:         "/auth/logout",
    REFRESH:        "/auth/refresh",
    REGISTER:       "/auth/register",
    VERIFY_EMAIL:   "/auth/verify-email",
    FORGOT_PASSWORD:"/auth/forgot-password",
    RESET_PASSWORD: "/auth/reset-password",
    ME:             "/auth/me",
  },

  // Scan
  SCAN: {
    CREATE:         "/scans",
    GET_BY_ID:      (id: string) => `/scans/${id}`,
    LIST:           "/scans",
    DELETE:         (id: string) => `/scans/${id}`,
    HISTORY:        "/scans/history",

    // Scan types
    SMS:            "/scans/sms",
    EMAIL:          "/scans/email",
    WHATSAPP:       "/scans/whatsapp",
    URL:            "/scans/url",
    QR_CODE:        "/scans/qr-code",
    IMAGE:          "/scans/image",
    DOCUMENT:       "/scans/document",
    PHONE:          "/scans/phone",
    SOCIAL:         "/scans/social",
  },

  // Reports
  REPORTS: {
    LIST:           "/reports",
    CREATE:         "/reports",
    GET_BY_ID:      (id: string) => `/reports/${id}`,
    VOTE:           (id: string) => `/reports/${id}/vote`,
  },

  // User
  USER: {
    PROFILE:        "/user/profile",
    UPDATE_PROFILE: "/user/profile",
    SETTINGS:       "/user/settings",
    NOTIFICATIONS:  "/user/notifications",
    AVATAR:         "/user/avatar",
  },

  // Analytics
  ANALYTICS: {
    OVERVIEW:       "/analytics/overview",
    THREATS:        "/analytics/threats",
    TRENDS:         "/analytics/trends",
  },

  // Admin
  ADMIN: {
    USERS:          "/admin/users",
    USER_BY_ID:     (id: string) => `/admin/users/${id}`,
    STATS:          "/admin/stats",
    LOGS:           "/admin/logs",
  },
} as const;
