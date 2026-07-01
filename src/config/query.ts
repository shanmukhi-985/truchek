/**
 * TruChek — TanStack Query Configuration
 */

import { QueryClient } from "@tanstack/react-query";

export const queryConfig = {
  defaultOptions: {
    queries: {
      staleTime:          1000 * 60 * 5,    // 5 minutes
      gcTime:             1000 * 60 * 10,   // 10 minutes (formerly cacheTime)
      retry:              (failureCount: number, error: unknown) => {
        const axiosError = error as { response?: { status?: number } };
        // Don't retry on auth errors
        if (axiosError?.response?.status === 401) return false;
        if (axiosError?.response?.status === 403) return false;
        if (axiosError?.response?.status === 404) return false;
        return failureCount < 2;
      },
      retryDelay:         (attemptIndex: number) =>
        Math.min(1000 * 2 ** attemptIndex, 30_000),
      refetchOnWindowFocus:   false,
      refetchOnReconnect:     true,
      refetchOnMount:         true,
    },
    mutations: {
      retry: 0,
    },
  },
} as const;

export const queryClient = new QueryClient(queryConfig);
