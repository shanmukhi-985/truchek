/**
 * TruChek — Axios HTTP Client
 * Configured instance with interceptors for auth, errors, and logging
 */

import axios, { type AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from "axios";
import { axiosConfig } from "@/config/axios";
import { STORAGE_KEYS } from "@/constants/app";
import { env } from "@/config/env";
import type { ApiErrorResponse } from "@/types/api";

// ============================================================
// CREATE AXIOS INSTANCE
// ============================================================

export const apiClient = axios.create(axiosConfig);

// ============================================================
// TOKEN HELPERS
// ============================================================

const getAccessToken = (): string | null =>
  localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);

const getRefreshToken = (): string | null =>
  localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);

const setTokens = (access: string, refresh: string): void => {
  localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, access);
  localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refresh);
};

const clearTokens = (): void => {
  localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
};

// ============================================================
// REQUEST INTERCEPTOR
// ============================================================

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAccessToken();

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Add request ID for tracing
    const requestId = crypto.randomUUID();
    if (config.headers) {
      config.headers["X-Request-ID"] = requestId;
    }

    // Dev logging
    if (env.IS_DEV) {
      console.debug(`[API] ${config.method?.toUpperCase()} ${config.url}`);
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// ============================================================
// RESPONSE INTERCEPTOR
// ============================================================

// Track refresh state to prevent loops
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: unknown) => void;
  reject: (reason: unknown) => void;
}> = [];

const processQueue = (error: AxiosError | null, token: string | null = null): void => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });
  failedQueue = [];
};

apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    if (env.IS_DEV) {
      console.debug(
        `[API] ✓ ${response.config.method?.toUpperCase()} ${response.config.url} — ${response.status}`
      );
    }
    return response;
  },
  async (error: AxiosError<ApiErrorResponse>) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // ---- 401 — Attempt token refresh ----
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token as string}`;
            }
            return apiClient(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = getRefreshToken();

      if (!refreshToken) {
        clearTokens();
        isRefreshing = false;
        // Redirect to login will be handled by router/auth guard
        window.dispatchEvent(new CustomEvent("auth:logout"));
        return Promise.reject(error);
      }

      try {
        const response = await axios.post<{
          data: { accessToken: string; refreshToken: string };
        }>(
          `${env.API_URL}/auth/refresh`,
          { refreshToken },
          { headers: axiosConfig.headers }
        );

        const { accessToken, refreshToken: newRefreshToken } = response.data.data;
        setTokens(accessToken, newRefreshToken);
        processQueue(null, accessToken);

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        }

        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError as AxiosError, null);
        clearTokens();
        window.dispatchEvent(new CustomEvent("auth:logout"));
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // ---- Global Error Handling ----
    const apiError = error.response?.data;

    if (env.IS_DEV) {
      console.error(
        `[API] ✗ ${error.config?.method?.toUpperCase()} ${error.config?.url}`,
        { status: error.response?.status, error: apiError }
      );
    }

    // Normalize error for consistent handling
    const normalizedError = {
      ...error,
      message:
        apiError?.error?.message ??
        error.message ??
        "An unexpected error occurred.",
      code: apiError?.error?.code ?? "UNKNOWN",
    };

    return Promise.reject(normalizedError);
  }
);

export default apiClient;
