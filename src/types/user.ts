/**
 * TruChek — User & Auth Types
 * Types for users, authentication, roles, and permissions
 */

import type { BaseEntity, ID, ISODateString } from "./common";

// ============================================================
// ROLES & PERMISSIONS
// ============================================================

export type UserRole = "guest" | "user" | "premium" | "admin" | "superadmin";

export type Permission =
  | "scan:create"
  | "scan:read"
  | "scan:delete"
  | "report:create"
  | "report:read"
  | "report:vote"
  | "history:read"
  | "analytics:read"
  | "admin:read"
  | "admin:write"
  | "user:manage";

export interface RolePermissions {
  role:        UserRole;
  permissions: Permission[];
  label:       string;
  description: string;
}

// ============================================================
// USER PROFILE
// ============================================================

export interface UserProfile extends BaseEntity {
  email:           string;
  username:        string;
  displayName:     string;
  avatarUrl:       string | null;
  bio?:            string;
  role:            UserRole;
  isEmailVerified: boolean;
  isActive:        boolean;
  lastLoginAt:     ISODateString | null;
  scanCount:       number;
  reportCount:     number;
}

// ============================================================
// USER PREFERENCES
// ============================================================

export interface UserPreferences {
  theme:              "light" | "dark" | "system";
  language:           string;
  timezone:           string;
  notifications: {
    email:            boolean;
    browser:          boolean;
    scanComplete:     boolean;
    threatAlert:      boolean;
    weeklyReport:     boolean;
  };
  privacy: {
    publicProfile:    boolean;
    shareScans:       boolean;
    contributeData:   boolean;
  };
  display: {
    compactMode:      boolean;
    showTrustScore:   boolean;
    showProbability:  boolean;
  };
}

// ============================================================
// AUTH TOKENS
// ============================================================

export interface AuthTokens {
  accessToken:  string;
  refreshToken: string;
  expiresIn:    number;
  tokenType:    "Bearer";
}

export interface DecodedToken {
  sub:      ID;
  email:    string;
  role:     UserRole;
  iat:      number;
  exp:      number;
  jti?:     string;
}

// ============================================================
// AUTH STATE
// ============================================================

export interface AuthState {
  user:           UserProfile | null;
  tokens:         AuthTokens | null;
  isAuthenticated: boolean;
  isLoading:      boolean;
  error:          string | null;
}

// ============================================================
// AUTH REQUEST / RESPONSE
// ============================================================

export interface LoginRequest {
  email:    string;
  password: string;
  remember?: boolean;
}

export interface RegisterRequest {
  email:       string;
  username:    string;
  displayName: string;
  password:    string;
  confirmPassword: string;
}

export interface LoginResponse {
  user:   UserProfile;
  tokens: AuthTokens;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token:           string;
  password:        string;
  confirmPassword: string;
}

// ============================================================
// SESSION
// ============================================================

export interface UserSession {
  id:          ID;
  userId:      ID;
  deviceInfo:  string;
  ipAddress:   string;
  userAgent:   string;
  isActive:    boolean;
  createdAt:   ISODateString;
  expiresAt:   ISODateString;
  lastUsedAt:  ISODateString;
}
