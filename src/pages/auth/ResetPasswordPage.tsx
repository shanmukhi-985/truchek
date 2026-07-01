import { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, ShieldCheck, AlertTriangle } from 'lucide-react';
import { resetPasswordSchema, type ResetPasswordSchema } from '../../lib/validations/auth';
import { ROUTES } from '../../lib/constants';
import { mockAuthService } from '../../lib/api/auth.service';
import { AuthLayout } from '../../components/auth/AuthLayout';
import { AuthCard } from '../../components/auth/AuthCard';
import { PasswordInput } from '../../components/auth/PasswordInput';
import { PasswordStrength } from '../../components/auth/PasswordStrength';
import { AuthButton } from '../../components/auth/AuthButton';
import { AuthAlert } from '../../components/auth/AuthAlert';

export function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');
  const [success, setSuccess] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: '', confirm_password: '' },
    mode: 'onChange',
  });

  const password = watch('password', '');

  // Redirect to forgot password if no token
  useEffect(() => {
    if (!token) {
      navigate(ROUTES.FORGOT_PASSWORD, { replace: true });
    }
  }, [token, navigate]);

  const onSubmit = async (data: ResetPasswordSchema) => {
    if (!token) return;
    setApiError(null);
    try {
      await mockAuthService.resetPassword({ token, password: data.password });
      setSuccess(true);
    } catch (err) {
      const e = err as { message?: string };
      setApiError(e.message || 'Failed to reset password. The link may have expired.');
    }
  };

  if (!token) return null;

  if (success) {
    return (
      <AuthLayout>
        <AuthCard>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="py-4 text-center space-y-6"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.15, type: 'spring', stiffness: 250 }}
              className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10"
            >
              <CheckCircle className="h-8 w-8 text-emerald-400" />
            </motion.div>

            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-white">Password reset!</h2>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Your password has been successfully reset. You can now log in with your new
                password.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Link to={ROUTES.LOGIN}>
                <AuthButton>Continue to login</AuthButton>
              </Link>
            </motion.div>
          </motion.div>
        </AuthCard>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <AuthCard>
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/20 to-indigo-500/20 border border-violet-500/20">
            <ShieldCheck className="h-6 w-6 text-violet-400" />
          </div>
          <h1 className="text-2xl font-semibold text-white tracking-tight">Reset password</h1>
          <p className="mt-2 text-sm text-zinc-500">
            Create a new strong password for your account.
          </p>
        </motion.div>

        {apiError && (
          <div className="mb-5">
            <AuthAlert variant="error" message={apiError} onClose={() => setApiError(null)} />
          </div>
        )}

        {/* Token warning */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.05 }}
          className="mb-5 flex items-start gap-2.5 rounded-lg p-3"
          style={{
            background: 'rgba(245,158,11,0.06)',
            border: '1px solid rgba(245,158,11,0.15)',
          }}
        >
          <AlertTriangle className="h-3.5 w-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-amber-400/80">
            This reset link expires in <strong>1 hour</strong>. Use it promptly.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-y-4"
        >
          <div className="space-y-2">
            <PasswordInput
              {...register('password')}
              label="New password"
              placeholder="Create a strong password"
              error={errors.password?.message}
              autoComplete="new-password"
              required
              disabled={isSubmitting}
            />
            <PasswordStrength password={password} />
          </div>

          <PasswordInput
            {...register('confirm_password')}
            label="Confirm new password"
            placeholder="Repeat your password"
            error={errors.confirm_password?.message}
            autoComplete="new-password"
            required
            disabled={isSubmitting}
          />

          <AuthButton
            type="submit"
            isLoading={isSubmitting}
            loadingText="Resetting password..."
            className="mt-6"
          >
            Reset password
          </AuthButton>
        </motion.form>

        <div className="mt-6 text-center">
          <Link
            to={ROUTES.LOGIN}
            className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to login
          </Link>
        </div>
      </AuthCard>
    </AuthLayout>
  );
}
