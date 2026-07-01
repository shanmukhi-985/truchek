/**
 * TruChek — Theme Provider
 * Manages dark/light/system theme with persistence and system detection
 */

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { STORAGE_KEYS } from "@/constants/app";
import type { ThemeMode } from "@/types/theme";

// ============================================================
// CONTEXT
// ============================================================

interface ThemeContextValue {
  mode:         ThemeMode;
  resolvedMode: "light" | "dark";
  setMode:      (mode: ThemeMode) => void;
  toggleMode:   () => void;
  isDark:       boolean;
  isLight:      boolean;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

// ============================================================
// HELPERS
// ============================================================

const getSystemTheme = (): "light" | "dark" =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

const getStoredTheme = (): ThemeMode => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.THEME);
    if (stored === "light" || stored === "dark" || stored === "system") {
      return stored;
    }
  } catch {
    // localStorage unavailable
  }
  return "dark"; // Default to dark
};

const applyTheme = (resolved: "light" | "dark"): void => {
  const root = document.documentElement;

  root.classList.remove("light", "dark");
  root.classList.add(resolved);
  root.setAttribute("data-theme", resolved);
  root.style.colorScheme = resolved;
};

// ============================================================
// PROVIDER
// ============================================================

interface ThemeProviderProps {
  children:     React.ReactNode;
  defaultTheme?: ThemeMode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme = "dark",
}) => {
  const [mode, setModeState] = useState<ThemeMode>(() => getStoredTheme() ?? defaultTheme);
  const [systemTheme, setSystemTheme] = useState<"light" | "dark">(() => getSystemTheme());

  // Resolve actual displayed theme
  const resolvedMode = useMemo<"light" | "dark">(
    () => (mode === "system" ? systemTheme : mode),
    [mode, systemTheme]
  );

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handler = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Apply theme to DOM whenever resolved changes
  useEffect(() => {
    applyTheme(resolvedMode);
  }, [resolvedMode]);

  // Persist mode changes
  const setMode = useCallback((newMode: ThemeMode) => {
    setModeState(newMode);
    try {
      localStorage.setItem(STORAGE_KEYS.THEME, newMode);
    } catch {
      // ignore
    }
  }, []);

  const toggleMode = useCallback(() => {
    setMode(resolvedMode === "dark" ? "light" : "dark");
  }, [resolvedMode, setMode]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      mode,
      resolvedMode,
      setMode,
      toggleMode,
      isDark:  resolvedMode === "dark",
      isLight: resolvedMode === "light",
    }),
    [mode, resolvedMode, setMode, toggleMode]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// ============================================================
// HOOK
// ============================================================

export const useTheme = (): ThemeContextValue => {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return ctx;
};
