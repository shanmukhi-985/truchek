/**
 * TruChek — Theme Constants
 * Design token values as JavaScript constants
 */

// ============================================================
// COLORS
// ============================================================

export const COLORS = {
  PRIMARY: {
    50:  "#eef2ff",
    100: "#e0e7ff",
    200: "#c7d2fe",
    300: "#a5b4fc",
    400: "#818cf8",
    500: "#6366f1",
    600: "#4f46e5",
    700: "#4338ca",
    800: "#3730a3",
    900: "#312e81",
    950: "#1e1b4b",
  },
  SUCCESS: {
    400: "#4ade80",
    500: "#22c55e",
    600: "#16a34a",
  },
  WARNING: {
    400: "#fbbf24",
    500: "#f59e0b",
    600: "#d97706",
  },
  DANGER: {
    400: "#fb7185",
    500: "#f43f5e",
    600: "#e11d48",
  },
  INFO: {
    400: "#22d3ee",
    500: "#06b6d4",
    600: "#0891b2",
  },
} as const;

// ============================================================
// TYPOGRAPHY SCALE
// ============================================================

export const FONT_SIZES = {
  "2XS": "0.625rem",
  XS:    "0.75rem",
  SM:    "0.875rem",
  BASE:  "1rem",
  LG:    "1.125rem",
  XL:    "1.25rem",
  "2XL": "1.5rem",
  "3XL": "1.875rem",
  "4XL": "2.25rem",
  "5XL": "3rem",
  "6XL": "3.75rem",
  "7XL": "4.5rem",
} as const;

export const FONT_WEIGHTS = {
  THIN:       100,
  EXTRALIGHT: 200,
  LIGHT:      300,
  NORMAL:     400,
  MEDIUM:     500,
  SEMIBOLD:   600,
  BOLD:       700,
  EXTRABOLD:  800,
  BLACK:      900,
} as const;

export const FONT_FAMILIES = {
  SANS:    "Inter, ui-sans-serif, system-ui, -apple-system, sans-serif",
  DISPLAY: "Plus Jakarta Sans, Inter, ui-sans-serif, system-ui, sans-serif",
  MONO:    "JetBrains Mono, Fira Code, ui-monospace, Cascadia Code, monospace",
} as const;

// ============================================================
// SPACING (8pt grid)
// ============================================================

export const SPACING = {
  PX:   "1px",
  0:    "0",
  0.5:  "0.125rem",
  1:    "0.25rem",
  1.5:  "0.375rem",
  2:    "0.5rem",
  2.5:  "0.625rem",
  3:    "0.75rem",
  3.5:  "0.875rem",
  4:    "1rem",
  5:    "1.25rem",
  6:    "1.5rem",
  7:    "1.75rem",
  8:    "2rem",
  9:    "2.25rem",
  10:   "2.5rem",
  12:   "3rem",
  14:   "3.5rem",
  16:   "4rem",
  18:   "4.5rem",
  20:   "5rem",
  24:   "6rem",
  28:   "7rem",
  32:   "8rem",
} as const;

// ============================================================
// BORDER RADIUS
// ============================================================

export const RADIUS = {
  NONE: "0",
  SM:   "0.25rem",
  MD:   "0.5rem",
  LG:   "0.75rem",
  XL:   "1rem",
  "2XL": "1.25rem",
  "3XL": "1.5rem",
  FULL: "9999px",
} as const;

// ============================================================
// SHADOWS
// ============================================================

export const SHADOWS = {
  XS:   "0 1px 2px 0 rgb(0 0 0 / 0.08)",
  SM:   "0 1px 3px 0 rgb(0 0 0 / 0.12), 0 1px 2px -1px rgb(0 0 0 / 0.08)",
  MD:   "0 4px 6px -1px rgb(0 0 0 / 0.15), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  LG:   "0 10px 15px -3px rgb(0 0 0 / 0.2), 0 4px 6px -4px rgb(0 0 0 / 0.12)",
  XL:   "0 20px 25px -5px rgb(0 0 0 / 0.25), 0 8px 10px -6px rgb(0 0 0 / 0.15)",
  "2XL":"0 25px 50px -12px rgb(0 0 0 / 0.4)",
  GLOW: "0 0 20px rgba(99, 102, 241, 0.3), 0 0 60px rgba(99, 102, 241, 0.1)",
} as const;
