import { API_URL, AUTH_TOKEN_KEY, AUTH_REFRESH_TOKEN_KEY } from '../constants';
import type { ApiError } from '../../types/auth';

// ─── HTTP Client ─────────────────────────────────────────────────────────────────

interface RequestOptions extends RequestInit {
  skipAuth?: boolean;
  skipRefresh?: boolean;
}

class ApiClient {
  private baseUrl: string;
  private isRefreshing = false;
  private refreshSubscribers: Array<(token: string) => void> = [];

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private getAccessToken(): string | null {
    return (
      localStorage.getItem(AUTH_TOKEN_KEY) ||
      sessionStorage.getItem(AUTH_TOKEN_KEY)
    );
  }

  private getRefreshToken(): string | null {
    return (
      localStorage.getItem(AUTH_REFRESH_TOKEN_KEY) ||
      sessionStorage.getItem(AUTH_REFRESH_TOKEN_KEY)
    );
  }

  private onRefreshed(token: string) {
    this.refreshSubscribers.forEach((cb) => cb(token));
    this.refreshSubscribers = [];
  }

  private subscribeTokenRefresh(cb: (token: string) => void) {
    this.refreshSubscribers.push(cb);
  }

  private async refreshAccessToken(): Promise<string> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) throw new Error('No refresh token available');

    const response = await fetch(`${this.baseUrl}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    if (!response.ok) {
      throw new Error('Token refresh failed');
    }

    const data = await response.json();
    const newToken = data.tokens?.access_token || data.access_token;

    // Update stored tokens
    const storage = localStorage.getItem(AUTH_TOKEN_KEY) ? localStorage : sessionStorage;
    storage.setItem(AUTH_TOKEN_KEY, newToken);
    if (data.tokens?.refresh_token) {
      storage.setItem(AUTH_REFRESH_TOKEN_KEY, data.tokens.refresh_token);
    }

    return newToken;
  }

  async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { skipAuth = false, skipRefresh = false, ...fetchOptions } = options;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(fetchOptions.headers as Record<string, string>),
    };

    if (!skipAuth) {
      const token = this.getAccessToken();
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    const url = `${this.baseUrl}${endpoint}`;

    const response = await fetch(url, {
      ...fetchOptions,
      headers,
    });

    // Handle 401 — attempt token refresh
    if (response.status === 401 && !skipAuth && !skipRefresh) {
      if (this.isRefreshing) {
        // Wait for ongoing refresh
        return new Promise((resolve, reject) => {
          this.subscribeTokenRefresh(async (token) => {
            try {
              const retryResponse = await fetch(url, {
                ...fetchOptions,
                headers: { ...headers, Authorization: `Bearer ${token}` },
              });
              resolve(await this.parseResponse<T>(retryResponse));
            } catch (err) {
              reject(err);
            }
          });
        });
      }

      this.isRefreshing = true;
      try {
        const newToken = await this.refreshAccessToken();
        this.isRefreshing = false;
        this.onRefreshed(newToken);

        // Retry original request
        const retryResponse = await fetch(url, {
          ...fetchOptions,
          headers: { ...headers, Authorization: `Bearer ${newToken}` },
        });
        return this.parseResponse<T>(retryResponse);
      } catch (_err) {
        this.isRefreshing = false;
        // Clear auth and redirect to session-expired
        localStorage.removeItem(AUTH_TOKEN_KEY);
        localStorage.removeItem(AUTH_REFRESH_TOKEN_KEY);
        sessionStorage.removeItem(AUTH_TOKEN_KEY);
        sessionStorage.removeItem(AUTH_REFRESH_TOKEN_KEY);
        window.dispatchEvent(new CustomEvent('auth:session-expired'));
        throw this.createError('Session expired. Please log in again.', 'SESSION_EXPIRED', 401);
      }
    }

    return this.parseResponse<T>(response);
  }

  private async parseResponse<T>(response: Response): Promise<T> {
    const contentType = response.headers.get('content-type');
    const isJson = contentType?.includes('application/json');

    if (!response.ok) {
      let errorData: Partial<ApiError> = {};
      if (isJson) {
        try {
          errorData = await response.json();
        } catch {
          // ignore
        }
      }

      const message = errorData.message || this.getDefaultErrorMessage(response.status);
      throw this.createError(message, errorData.code, response.status, errorData.errors);
    }

    if (isJson) {
      return response.json();
    }

    return response.text() as unknown as T;
  }

  private getDefaultErrorMessage(status: number): string {
    const messages: Record<number, string> = {
      400: 'Invalid request. Please check your input.',
      401: 'Authentication required. Please log in.',
      403: 'You do not have permission to perform this action.',
      404: 'The requested resource was not found.',
      409: 'A conflict occurred. This resource may already exist.',
      422: 'Validation failed. Please check your input.',
      429: 'Too many requests. Please try again later.',
      500: 'An internal server error occurred. Please try again.',
      502: 'Service temporarily unavailable. Please try again.',
      503: 'Service temporarily unavailable. Please try again.',
    };
    return messages[status] || 'An unexpected error occurred.';
  }

  private createError(
    message: string,
    code?: string,
    status?: number,
    errors?: Record<string, string[]>
  ): ApiError {
    return { message, code, status, errors };
  }

  // ─── HTTP Methods ──────────────────────────────────────────────────────────────

  get<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  }

  post<T>(endpoint: string, body?: unknown, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  put<T>(endpoint: string, body?: unknown, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  patch<T>(endpoint: string, body?: unknown, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  delete<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  }
}

export const apiClient = new ApiClient(API_URL);
