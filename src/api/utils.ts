/**
 * TruChek — API Utility Functions
 */

import type { AxiosResponse } from "axios";
import type { ApiResponse, ApiListResponse } from "@/types/api";
import type { PaginationParams } from "@/types/common";

// ============================================================
// RESPONSE EXTRACTORS
// ============================================================

/** Extract data from standard API envelope */
export const extractData = <T>(response: AxiosResponse<ApiResponse<T>>): T =>
  response.data.data;

/** Extract list data */
export const extractList = <T>(response: AxiosResponse<ApiListResponse<T>>) => ({
  data: response.data.data,
  meta: response.data.meta,
});

// ============================================================
// QUERY STRING BUILDERS
// ============================================================

/** Build pagination query params */
export const buildPaginationParams = (params: PaginationParams): Record<string, string> => ({
  page:   String(params.page),
  limit:  String(params.limit),
  ...(params.cursor ? { cursor: params.cursor } : {}),
});

/** Remove undefined/null values from params object */
export const cleanParams = (
  params: Record<string, string | number | boolean | null | undefined>
): Record<string, string> => {
  return Object.entries(params).reduce<Record<string, string>>(
    (acc, [key, value]) => {
      if (value !== null && value !== undefined && value !== "") {
        acc[key] = String(value);
      }
      return acc;
    },
    {}
  );
};

// ============================================================
// ERROR HELPERS
// ============================================================

/** Check if an error is a specific HTTP status */
export const isHttpError = (error: unknown, status: number): boolean => {
  const axiosError = error as { response?: { status?: number } };
  return axiosError?.response?.status === status;
};

export const isUnauthorized    = (error: unknown) => isHttpError(error, 401);
export const isForbidden       = (error: unknown) => isHttpError(error, 403);
export const isNotFound        = (error: unknown) => isHttpError(error, 404);
export const isServerError     = (error: unknown) => isHttpError(error, 500);
export const isRateLimited     = (error: unknown) => isHttpError(error, 429);

/** Extract error message from API error */
export const getErrorMessage = (error: unknown): string => {
  const axiosError = error as {
    message?: string;
    response?: { data?: { error?: { message?: string } } };
  };
  return (
    axiosError?.response?.data?.error?.message ??
    axiosError?.message ??
    "Something went wrong. Please try again."
  );
};

// ============================================================
// RETRY LOGIC
// ============================================================

/** Exponential backoff delay */
export const backoffDelay = (attempt: number, base = 1000, cap = 30_000): number =>
  Math.min(base * 2 ** attempt, cap);
