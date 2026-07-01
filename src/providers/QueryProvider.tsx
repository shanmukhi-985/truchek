/**
 * TruChek — TanStack Query Provider
 * Wraps the app with React Query for server state management
 */

import React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/config/query";

interface QueryProviderProps {
  children: React.ReactNode;
}

export const QueryProvider: React.FC<QueryProviderProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};
