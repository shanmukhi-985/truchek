/**
 * TruChek — Root Application Provider
 * Composes all providers in correct dependency order
 */

import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./ThemeProvider";
import { QueryProvider } from "./QueryProvider";

interface AppProviderProps {
  children: React.ReactNode;
}

/**
 * AppProvider — composes all application-level providers.
 * Order matters:
 *   1. ThemeProvider  — Sets up CSS vars and DOM classes
 *   2. QueryProvider  — TanStack Query
 *   3. BrowserRouter  — React Router
 */
export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <ThemeProvider defaultTheme="dark">
      <QueryProvider>
        <BrowserRouter>
          {children}
        </BrowserRouter>
      </QueryProvider>
    </ThemeProvider>
  );
};

export { ThemeProvider } from "./ThemeProvider";
export { QueryProvider } from "./QueryProvider";
