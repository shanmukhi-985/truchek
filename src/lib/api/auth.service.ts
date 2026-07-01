import { apiClient } from './client';
import {
  AUTH_TOKEN_KEY,
  AUTH_REFRESH_TOKEN_KEY,
  AUTH_USER_KEY,
  AUTH_REMEMBER_KEY,
} from '../constants';
import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  VerifyEmailRequest,
  MessageResponse,
  User,
  AuthTokens,
} from '../../types/auth';

// ─── Token Storage ────────────────────────────────────────────────────────────────

export function storeTokens(tokens: AuthTokens, remember: boolean): void {
  const storage = remember ? localStorage : sessionStorage;
  storage.setItem(AUTH_TOKEN_KEY, tokens.access_token);
  storage.setItem(AUTH_REFRESH_TOKEN_KEY, tokens.refresh_token);
  if (remember) {
    localStorage.setItem(AUTH_REMEMBER_KEY, 'true');
  }
}

export function storeUser(user: User, remember: boolean): void {
  const storage = remember ? localStorage : sessionStorage;
  storage.setItem(AUTH_USER_KEY, JSON.stringify(user));
}

export function clearAuthStorage(): void {
  [AUTH_TOKEN_KEY, AUTH_REFRESH_TOKEN_KEY, AUTH_USER_KEY, AUTH_REMEMBER_KEY].forEach((key) => {
    localStorage.removeItem(key);
    sessionStorage.removeItem(key);
  });
}

export function getStoredUser(): User | null {
  const raw =
    localStorage.getItem(AUTH_USER_KEY) ||
    sessionStorage.getItem(AUTH_USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
}

export function getStoredToken(): string | null {
  return (
    localStorage.getItem(AUTH_TOKEN_KEY) ||
    sessionStorage.getItem(AUTH_TOKEN_KEY)
  );
}

export function isRemembered(): boolean {
  return localStorage.getItem(AUTH_REMEMBER_KEY) === 'true';
}

// ─── Auth API Service ─────────────────────────────────────────────────────────────

export const authService = {
  /**
   * Register a new user
   */
  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/register', data, {
      skipAuth: true,
    });
    return response;
  },

  /**
   * Login with email/password
   */
  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/login', data, {
      skipAuth: true,
    });
    return response;
  },

  /**
   * Logout
   */
  async logout(): Promise<void> {
    try {
      await apiClient.post<void>('/auth/logout');
    } catch {
      // Always clear local storage even if API call fails
    } finally {
      clearAuthStorage();
    }
  },

  /**
   * Refresh access token
   */
  async refreshToken(refreshToken: string): Promise<AuthTokens> {
    const response = await apiClient.post<{ tokens: AuthTokens }>('/auth/refresh', {
      refresh_token: refreshToken,
    }, { skipAuth: true, skipRefresh: true });
    return response.tokens;
  },

  /**
   * Get current user profile
   */
  async getMe(): Promise<User> {
    return apiClient.get<User>('/auth/me');
  },

  /**
   * Send forgot password email
   */
  async forgotPassword(data: ForgotPasswordRequest): Promise<MessageResponse> {
    return apiClient.post<MessageResponse>('/auth/forgot-password', data, {
      skipAuth: true,
    });
  },

  /**
   * Reset password with token
   */
  async resetPassword(data: ResetPasswordRequest): Promise<MessageResponse> {
    return apiClient.post<MessageResponse>('/auth/reset-password', data, {
      skipAuth: true,
    });
  },

  /**
   * Verify email with token
   */
  async verifyEmail(data: VerifyEmailRequest): Promise<MessageResponse> {
    return apiClient.post<MessageResponse>('/auth/verify-email', data, {
      skipAuth: true,
    });
  },

  /**
   * Resend verification email
   */
  async resendVerification(email: string): Promise<MessageResponse> {
    return apiClient.post<MessageResponse>('/auth/resend-verification', { email }, {
      skipAuth: true,
    });
  },
};

// ─── Mock Auth Service (for frontend-only demo) ────────────────────────────────────

export const mockAuthService = {
  /**
   * Simulate API delay
   */
  delay: (ms: number) => new Promise((resolve) => setTimeout(resolve, ms)),

  /**
   * Mock register
   */
  async register(data: RegisterRequest): Promise<AuthResponse> {
    await this.delay(1500);

    // Simulate duplicate email
    const existingEmails = ['test@example.com', 'admin@truchek.io'];
    if (existingEmails.includes(data.email)) {
      throw {
        message: 'An account with this email already exists.',
        code: 'EMAIL_ALREADY_EXISTS',
        status: 409,
      };
    }

    const user: User = {
      id: crypto.randomUUID(),
      full_name: data.full_name,
      email: data.email,
      email_verified: false,
      role: 'user',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const tokens: AuthTokens = {
      access_token: `mock_access_${Date.now()}`,
      refresh_token: `mock_refresh_${Date.now()}`,
      token_type: 'Bearer',
      expires_in: 900,
    };

    return { user, tokens, message: 'Account created successfully. Please verify your email.' };
  },

  /**
   * Mock login
   */
  async login(data: LoginRequest): Promise<AuthResponse> {
    await this.delay(1200);

    // Simulate invalid credentials
    if (data.password === 'wrongpassword') {
      throw {
        message: 'Invalid email or password. Please try again.',
        code: 'INVALID_CREDENTIALS',
        status: 401,
      };
    }

    const user: User = {
      id: 'usr_demo_001',
      full_name: 'Alex Johnson',
      email: data.email,
      email_verified: true,
      role: 'user',
      created_at: '2024-01-01T00:00:00Z',
      updated_at: new Date().toISOString(),
      last_login: new Date().toISOString(),
    };

    const tokens: AuthTokens = {
      access_token: `mock_access_${Date.now()}`,
      refresh_token: `mock_refresh_${Date.now()}`,
      token_type: 'Bearer',
      expires_in: 900,
    };

    return { user, tokens };
  },

  /**
   * Mock logout
   */
  async logout(): Promise<void> {
    await this.delay(300);
    clearAuthStorage();
  },

  /**
   * Mock forgot password
   */
  async forgotPassword(_data: ForgotPasswordRequest): Promise<MessageResponse> {
    await this.delay(1500);
    return {
      message: 'If an account exists with this email, you will receive a password reset link.',
      success: true,
    };
  },

  /**
   * Mock reset password
   */
  async resetPassword(_data: ResetPasswordRequest): Promise<MessageResponse> {
    await this.delay(1500);
    return {
      message: 'Your password has been reset successfully.',
      success: true,
    };
  },

  /**
   * Mock verify email
   */
  async verifyEmail(_data: VerifyEmailRequest): Promise<MessageResponse> {
    await this.delay(1000);
    return {
      message: 'Email verified successfully.',
      success: true,
    };
  },

  /**
   * Mock get me
   */
  async getMe(): Promise<User> {
    await this.delay(500);
    const stored = getStoredUser();
    if (!stored) throw { message: 'Unauthorized', status: 401 };
    return stored;
  },
};

// Export the active service (mock for demo, real for production)
export const USE_MOCK = true; // Set to false when backend is ready
