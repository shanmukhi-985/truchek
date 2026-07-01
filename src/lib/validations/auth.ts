import { z } from 'zod';
import { PASSWORD_MIN_LENGTH } from '../constants';

// ─── Password Schema ─────────────────────────────────────────────────────────────

export const passwordSchema = z
  .string()
  .min(PASSWORD_MIN_LENGTH, `Password must be at least ${PASSWORD_MIN_LENGTH} characters`)
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character');

// ─── Login Schema ────────────────────────────────────────────────────────────────

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(1, 'Password is required'),
  remember_me: z.boolean(),
});

export type LoginSchema = z.infer<typeof loginSchema>;

// ─── Signup Schema ───────────────────────────────────────────────────────────────

export const signupSchema = z
  .object({
    full_name: z
      .string()
      .min(1, 'Full name is required')
      .min(2, 'Full name must be at least 2 characters')
      .max(100, 'Full name must be less than 100 characters')
      .regex(/^[a-zA-Z\s'-]+$/, 'Full name can only contain letters, spaces, hyphens, and apostrophes'),
    email: z
      .string()
      .min(1, 'Email is required')
      .email('Please enter a valid email address'),
    password: passwordSchema,
    confirm_password: z.string().min(1, 'Please confirm your password'),
    accept_terms: z
      .boolean()
      .refine((val) => val === true, 'You must accept the terms and conditions'),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Passwords do not match',
    path: ['confirm_password'],
  });

export type SignupSchema = z.infer<typeof signupSchema>;

// ─── Forgot Password Schema ───────────────────────────────────────────────────────

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
});

export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;

// ─── Reset Password Schema ────────────────────────────────────────────────────────

export const resetPasswordSchema = z
  .object({
    password: passwordSchema,
    confirm_password: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Passwords do not match',
    path: ['confirm_password'],
  });

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;

// ─── Password Strength Calculator ─────────────────────────────────────────────────

export interface PasswordStrengthResult {
  score: 0 | 1 | 2 | 3 | 4;
  label: string;
  color: string;
  percentage: number;
  feedback: string[];
}

export function calculatePasswordStrength(password: string): PasswordStrengthResult {
  if (!password) {
    return { score: 0, label: 'Very Weak', color: '#ef4444', percentage: 0, feedback: [] };
  }

  let score = 0;
  const feedback: string[] = [];

  // Length checks
  if (password.length >= 8) score++;
  else feedback.push('Use at least 8 characters');

  if (password.length >= 12) score++;

  // Character variety
  if (/[A-Z]/.test(password)) score++;
  else feedback.push('Add uppercase letters');

  if (/[a-z]/.test(password)) score++;
  else feedback.push('Add lowercase letters');

  if (/[0-9]/.test(password)) score++;
  else feedback.push('Add numbers');

  if (/[^A-Za-z0-9]/.test(password)) score++;
  else feedback.push('Add special characters (!@#$%^&*)');

  // Normalize to 0-4
  const normalized = Math.min(4, Math.floor(score * 4 / 6)) as 0 | 1 | 2 | 3 | 4;

  const labels = ['Very Weak', 'Weak', 'Fair', 'Strong', 'Very Strong'];
  const colors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#10b981'];
  const percentages = [20, 40, 60, 80, 100];

  return {
    score: normalized,
    label: labels[normalized],
    color: colors[normalized],
    percentage: percentages[normalized],
    feedback,
  };
}
