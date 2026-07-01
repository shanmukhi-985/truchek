/**
 * TruChek — Application Constants
 */

// ============================================================
// BRAND
// ============================================================

export const APP_NAME        = "TruChek" as const;
export const APP_TAGLINE     = "Think. Check. Trust." as const;
export const APP_DESCRIPTION = "AI-powered Digital Trust Platform. Verify suspicious digital content before you interact with it." as const;
export const APP_VERSION     = "1.0.0" as const;
export const APP_URL         = import.meta.env.VITE_APP_URL ?? "https://truchek.ai";

// ============================================================
// COMPANY
// ============================================================

export const COMPANY_NAME    = "TruChek Technologies" as const;
export const COMPANY_EMAIL   = "support@truchek.ai" as const;
export const PRIVACY_URL     = `${APP_URL}/privacy`;
export const TERMS_URL       = `${APP_URL}/terms`;

// ============================================================
// PAGINATION DEFAULTS
// ============================================================

export const DEFAULT_PAGE_SIZE    = 20 as const;
export const MAX_PAGE_SIZE        = 100 as const;
export const DEFAULT_PAGE         = 1 as const;

// ============================================================
// DEBOUNCE / THROTTLE
// ============================================================

export const DEBOUNCE_SEARCH_MS   = 350 as const;
export const DEBOUNCE_INPUT_MS    = 200 as const;
export const THROTTLE_SCROLL_MS   = 100 as const;

// ============================================================
// TOAST / NOTIFICATION
// ============================================================

export const TOAST_DURATION_DEFAULT = 4000 as const;
export const TOAST_DURATION_SUCCESS = 3000 as const;
export const TOAST_DURATION_ERROR   = 6000 as const;
export const TOAST_MAX_COUNT        = 5 as const;

// ============================================================
// LOCAL STORAGE KEYS
// ============================================================

export const STORAGE_KEYS = {
  THEME:           "truchek:theme",
  SIDEBAR_STATE:   "truchek:sidebar",
  RECENT_SCANS:    "truchek:recent-scans",
  PREFERENCES:     "truchek:preferences",
  ACCESS_TOKEN:    "truchek:access-token",
  REFRESH_TOKEN:   "truchek:refresh-token",
  SESSION_ID:      "truchek:session-id",
  ONBOARDING:      "truchek:onboarding-complete",
} as const;

// ============================================================
// SESSION STORAGE KEYS
// ============================================================

export const SESSION_KEYS = {
  SCAN_DRAFT:      "truchek:scan-draft",
  REDIRECT_URL:    "truchek:redirect-url",
} as const;

// ============================================================
// QUERY KEYS — TanStack Query
// ============================================================

export const QUERY_KEYS = {
  AUTH: {
    ME:         ["auth", "me"],
    SESSION:    ["auth", "session"],
  },
  SCAN: {
    ALL:        ["scans"],
    LIST:       (params?: object) => ["scans", "list", params],
    DETAIL:     (id: string) => ["scans", "detail", id],
    HISTORY:    ["scans", "history"],
  },
  REPORT: {
    ALL:        ["reports"],
    LIST:       (params?: object) => ["reports", "list", params],
    DETAIL:     (id: string) => ["reports", "detail", id],
  },
  USER: {
    PROFILE:    ["user", "profile"],
    SETTINGS:   ["user", "settings"],
  },
  ANALYTICS: {
    OVERVIEW:   ["analytics", "overview"],
    THREATS:    ["analytics", "threats"],
    TRENDS:     ["analytics", "trends"],
  },
  ADMIN: {
    USERS:      ["admin", "users"],
    STATS:      ["admin", "stats"],
    LOGS:       ["admin", "logs"],
  },
} as const;

// ============================================================
// FILE UPLOAD
// ============================================================

export const MAX_FILE_SIZE_MB         = 10 as const;
export const MAX_FILE_SIZE_BYTES      = MAX_FILE_SIZE_MB * 1024 * 1024;
export const ACCEPTED_IMAGE_TYPES     = ["image/jpeg", "image/png", "image/webp", "image/gif"] as const;
export const ACCEPTED_DOCUMENT_TYPES  = ["application/pdf", "text/plain", "application/msword"] as const;

// ============================================================
// ANIMATION CONSTANTS
// ============================================================

export const ANIMATION_DURATION = {
  INSTANT: 0,
  FAST:    0.1,
  NORMAL:  0.2,
  SLOW:    0.3,
  SLOWER:  0.5,
} as const;

// ============================================================
// BREAKPOINTS
// ============================================================

export const BREAKPOINTS = {
  XS:  480,
  SM:  640,
  MD:  768,
  LG:  1024,
  XL:  1280,
  "2XL": 1536,
} as const;

// ============================================================
// Z-INDEX LAYERS
// ============================================================

export const Z_INDEX = {
  DROPDOWN:   50,
  STICKY:     100,
  MODAL:      200,
  OVERLAY:    300,
  DRAWER:     400,
  TOAST:      500,
  TOOLTIP:    600,
  MAX:        9999,
} as const;
