import { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Mail, ArrowRight } from 'lucide-react';
import { loginSchema } from '../../lib/validations/auth';
import type { LoginSchema } from '../../lib/validations/auth';
import { useAuth } from '../../contexts/AuthContext';
import { ROUTES } from '../../lib/constants';
import { AuthLayout } from '../../components/auth/AuthLayout';
import { AuthCard } from '../../components/auth/AuthCard';
import { FormInput } from '../../components/auth/FormInput';
import { PasswordInput } from '../../components/auth/PasswordInput';
import { AuthButton } from '../../components/auth/AuthButton';
import { SocialLoginButton } from '../../components/auth/SocialLoginButton';
import { AuthDivider } from '../../components/auth/AuthDivider';
import { AuthAlert } from '../../components/auth/AuthAlert';

export function LoginPage() {
  const { login, isLoading, error, clearError, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || ROUTES.DASHBOARD;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '', remember_me: false },
  });

  useEffect(() => {
    if (isAuthenticated) navigate(from, { replace: true });
  }, [isAuthenticated, navigate, from]);

  useEffect(() => {
    return () => clearError();
  }, [clearError]);

  const onSubmit = async (data: LoginSchema) => {
    try {
      await login(data, data.remember_me);
      navigate(from, { replace: true });
    } catch {
      // Error is managed by AuthContext
    }
  };

  const loading = isLoading || isSubmitting;

  return (
    <AuthLayout>
      <AuthCard>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8 text-center"
        >
          <h1 className="text-2xl font-semibold text-white tracking-tight">
            Welcome back
          </h1>
          <p className="mt-2 text-sm text-zinc-500">
            Sign in to your TruChek account
          </p>
        </motion.div>

        {/* Error alert */}
        {error && (
          <div className="mb-6">
            <AuthAlert variant="error" message={error.message} onClose={clearError} />
          </div>
        )}

        {/* Social login */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="flex flex-col gap-3 mb-6"
        >
          <SocialLoginButton provider="google" disabled={loading} />
          <SocialLoginButton provider="github" disabled={loading} />
        </motion.div>

        <AuthDivider className="mb-6" />

        {/* Form */}
        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-y-4"
        >
          {/* Email */}
          <FormInput
            {...register('email')}
            type="email"
            label="Email address"
            placeholder="you@example.com"
            icon={Mail}
            error={errors.email?.message}
            autoComplete="email"
            required
            disabled={loading}
          />

          {/* Password */}
          <div className="space-y-1">
            <PasswordInput
              {...register('password')}
              label="Password"
              placeholder="Enter your password"
              error={errors.password?.message}
              autoComplete="current-password"
              required
              disabled={loading}
            />
            <div className="flex justify-end">
              <Link
                to={ROUTES.FORGOT_PASSWORD}
                className="text-xs text-violet-400 hover:text-violet-300 transition-colors"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          {/* Remember me */}
          <label className="flex items-center gap-3 cursor-pointer group">
            <div className="relative">
              <input
                {...register('remember_me')}
                type="checkbox"
                className="peer sr-only"
                disabled={loading}
              />
              <div className="h-4 w-4 rounded border border-white/[0.12] bg-white/[0.04] peer-checked:bg-violet-600 peer-checked:border-violet-600 transition-all duration-200 flex items-center justify-center">
                <svg
                  className="h-2.5 w-2.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity"
                  viewBox="0 0 12 12"
                  fill="none"
                >
                  <path
                    d="M2 6l3 3 5-5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            <span className="text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors">
              Remember me for 7 days
            </span>
          </label>

          {/* Submit */}
          <AuthButton
            type="submit"
            isLoading={loading}
            loadingText="Signing in..."
            className="mt-6"
          >
            Sign in
            <ArrowRight className="h-4 w-4" />
          </AuthButton>
        </motion.form>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-center text-sm text-zinc-500"
        >
          Don't have an account?{' '}
          <Link
            to={ROUTES.SIGNUP}
            className="text-violet-400 hover:text-violet-300 font-medium transition-colors"
          >
            Create account
          </Link>
        </motion.p>
      </AuthCard>
    </AuthLayout>
  );
}
