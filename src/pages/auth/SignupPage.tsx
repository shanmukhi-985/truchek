import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { User, Mail, ArrowRight, CheckCircle } from 'lucide-react';
import { signupSchema, type SignupSchema } from '../../lib/validations/auth';
import { useAuth } from '../../contexts/AuthContext';
import { ROUTES } from '../../lib/constants';
import { AuthLayout } from '../../components/auth/AuthLayout';
import { AuthCard } from '../../components/auth/AuthCard';
import { FormInput } from '../../components/auth/FormInput';
import { PasswordInput } from '../../components/auth/PasswordInput';
import { PasswordStrength } from '../../components/auth/PasswordStrength';
import { AuthButton } from '../../components/auth/AuthButton';
import { SocialLoginButton } from '../../components/auth/SocialLoginButton';
import { AuthDivider } from '../../components/auth/AuthDivider';
import { AuthAlert } from '../../components/auth/AuthAlert';

export function SignupPage() {
  const { register: registerUser, isLoading, error, clearError } = useAuth();
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      full_name: '',
      email: '',
      password: '',
      confirm_password: '',
      accept_terms: false,
    },
    mode: 'onChange',
  });

  const password = watch('password', '');

  useEffect(() => {
    return () => clearError();
  }, [clearError]);

  const onSubmit = async (data: SignupSchema) => {
    try {
      const result = await registerUser({
        full_name: data.full_name,
        email: data.email,
        password: data.password,
      });

      if (result.requiresVerification) {
        setSuccess(true);
      } else {
        navigate(ROUTES.DASHBOARD, { replace: true });
      }
    } catch {
      // Error managed by AuthContext
    }
  };

  const loading = isLoading || isSubmitting;

  if (success) {
    return (
      <AuthLayout>
        <AuthCard>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="py-4 text-center space-y-6"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10"
            >
              <CheckCircle className="h-8 w-8 text-emerald-400" />
            </motion.div>

            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-white">Check your inbox</h2>
              <p className="text-sm text-zinc-400 leading-relaxed">
                We've sent a verification link to your email. Click the link to activate your
                account.
              </p>
            </div>

            <div
              className="rounded-xl p-4 text-left"
              style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.15)' }}
            >
              <p className="text-xs text-zinc-400 leading-relaxed">
                <span className="font-medium text-emerald-400">Didn't receive the email?</span>{' '}
                Check your spam folder or{' '}
                <button className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2">
                  resend the verification email
                </button>
                .
              </p>
            </div>

            <Link to={ROUTES.LOGIN}>
              <AuthButton variant="secondary">Back to Login</AuthButton>
            </Link>
          </motion.div>
        </AuthCard>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <AuthCard>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-7 text-center"
        >
          <h1 className="text-2xl font-semibold text-white tracking-tight">Create account</h1>
          <p className="mt-2 text-sm text-zinc-500">Start fact-checking with TruChek</p>
        </motion.div>

        {/* Error */}
        {error && (
          <div className="mb-5">
            <AuthAlert variant="error" message={error.message} onClose={clearError} />
          </div>
        )}

        {/* Social */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
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
          transition={{ delay: 0.15 }}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-y-4"
        >
          <FormInput
            {...register('full_name')}
            type="text"
            label="Full name"
            placeholder="Alex Johnson"
            icon={User}
            error={errors.full_name?.message}
            autoComplete="name"
            required
            disabled={loading}
          />

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

          <div className="space-y-2">
            <PasswordInput
              {...register('password')}
              label="Password"
              placeholder="Create a strong password"
              error={errors.password?.message}
              autoComplete="new-password"
              required
              disabled={loading}
            />
            <PasswordStrength password={password} />
          </div>

          <PasswordInput
            {...register('confirm_password')}
            label="Confirm password"
            placeholder="Repeat your password"
            error={errors.confirm_password?.message}
            autoComplete="new-password"
            required
            disabled={loading}
          />

          {/* Terms */}
          <label className="flex items-start gap-3 cursor-pointer group mt-1">
            <div className="relative mt-0.5 flex-shrink-0">
              <input
                {...register('accept_terms')}
                type="checkbox"
                className="peer sr-only"
                disabled={loading}
              />
              <div
                className={[
                  'h-4 w-4 rounded border transition-all duration-200 flex items-center justify-center',
                  errors.accept_terms
                    ? 'border-red-500/60 bg-red-500/10'
                    : 'border-white/[0.12] bg-white/[0.04] peer-checked:bg-violet-600 peer-checked:border-violet-600',
                ].join(' ')}
              >
                <svg className="h-2.5 w-2.5 text-white" viewBox="0 0 12 12" fill="none">
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
            <span className="text-sm text-zinc-400 leading-relaxed">
              I agree to the{' '}
              <a href="#" className="text-violet-400 hover:text-violet-300 transition-colors">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-violet-400 hover:text-violet-300 transition-colors">
                Privacy Policy
              </a>
            </span>
          </label>
          {errors.accept_terms && (
            <p className="flex items-center gap-1.5 text-xs text-red-400 -mt-2">
              <span className="inline-block h-1 w-1 rounded-full bg-red-400" />
              {errors.accept_terms.message}
            </p>
          )}

          <AuthButton
            type="submit"
            isLoading={loading}
            loadingText="Creating account..."
            className="mt-6"
          >
            Create account
            <ArrowRight className="h-4 w-4" />
          </AuthButton>
        </motion.form>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-center text-sm text-zinc-500"
        >
          Already have an account?{' '}
          <Link to={ROUTES.LOGIN} className="text-violet-400 hover:text-violet-300 font-medium transition-colors">
            Sign in
          </Link>
        </motion.p>
      </AuthCard>
    </AuthLayout>
  );
}
