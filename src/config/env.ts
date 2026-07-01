/**
 * TruChek — Environment Configuration
 * Typed access to all environment variables with defaults
 */

const getEnv = (key: keyof ImportMetaEnv, fallback = ""): string => {
  const value = import.meta.env[key];
  return (value as string) ?? fallback;
};

export const env = {
  // App
  APP_URL:          getEnv("VITE_APP_URL", "http://localhost:5173"),
  APP_NAME:         getEnv("VITE_APP_NAME", "TruChek"),
  APP_ENV:          getEnv("VITE_APP_ENV", "development") as "development" | "staging" | "production",

  // API
  API_BASE_URL:     getEnv("VITE_API_BASE_URL", "http://localhost:8000"),
  API_VERSION:      getEnv("VITE_API_VERSION", "v1"),

  // Feature Flags
  ENABLE_ANALYTICS: getEnv("VITE_ENABLE_ANALYTICS", "false") === "true",

  // Monitoring
  SENTRY_DSN:       getEnv("VITE_SENTRY_DSN", ""),

  // Computed
  get API_URL() {
    return `${this.API_BASE_URL}/api/${this.API_VERSION}`;
  },

  get IS_DEV() {
    return this.APP_ENV === "development";
  },

  get IS_PROD() {
    return this.APP_ENV === "production";
  },

  get IS_STAGING() {
    return this.APP_ENV === "staging";
  },
} as const;
