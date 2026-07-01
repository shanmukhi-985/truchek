import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, ArrowRight, Send } from 'lucide-react';
import { forgotPasswordSchema, type ForgotPasswordSchema } from '../../lib/validations/auth';
import { ROUTES } from '../../lib/constants';
import { mockAuthService } from '../../lib/api/auth.service';
import { AuthLayout } from '../../components/auth/AuthLayout';
import { AuthCard } from '../../components/auth/AuthCard';
import { FormInput } from '../../components/auth/FormInput';
import { AuthButton } from '../../components/auth/AuthButton';
import { AuthAlert } from '../../components/auth/AuthAlert';

export function ForgotPasswordPage() {
  const [success, setSuccess] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  });

  useEffect(() => {
    return () => setApiError(null);
  }, []);

  const onSubmit = async (data: ForgotPasswordSchema) => {
    setApiError(null);
    try {
      await mockAuthService.forgotPassword(data);
      setSubmittedEmail(data.email);
      setSuccess(true);
    } catch (err) {
      const e = err as { message?: string };
      setApiError(e.message || 'Something went wrong. Please try again.');
    }
  };

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
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.15, type: 'spring', stiffness: 250 }}
              className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl"
              style={{
                background: 'rgba(139,92,246,0.12)',
                border: '1px solid rgba(139,92,246,0.2)',
              }}
            >
              <Send className="h-7 w-7 text-violet-400" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-2"
            >
              <h2 className="text-2xl font-semibold text-white">Email sent!</h2>
              <p className="text-sm text-zinc-400 leading-relaxed">
                We've sent a password reset link to{' '}
                <span className="text-zinc-200 font-medium">{submittedEmail}</span>
              </p>
              <p className="text-xs text-zinc-600 mt-3">
                Didn't receive the email? Check your spam folder. The link expires in 1 hour.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-3"
            >
              <AuthButton
                variant="secondary"
                onClick={() => {
                  setSuccess(false);
                  onSubmit({ email: getValues('email') });
                }}
                isLoading={isSubmitting}
                loadingText="Resending..."
              >
                Resend email
              </AuthButton>

              <Link to={ROUTES.LOGIN} className="block">
                <AuthButton variant="ghost">
                  <ArrowLeft className="h-4 w-4" />
                  Back to login
                </AuthButton>
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
          <Link
            to={ROUTES.LOGIN}
            className="mb-6 inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to login
          </Link>

          <h1 className="text-2xl font-semibold text-white tracking-tight">
            Forgot password?
          </h1>
          <p className="mt-2 text-sm text-zinc-500 leading-relaxed">
            No worries. Enter your email and we'll send you a reset link.
          </p>
        </motion.div>

        {apiError && (
          <div className="mb-5">
            <AuthAlert
              variant="error"
              message={apiError}
              onClose={() => setApiError(null)}
            />
          </div>
        )}

        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-y-5"
        >
          <FormInput
            {...register('email')}
            type="email"
            label="Email address"
            placeholder="you@example.com"
            icon={Mail}
            error={errors.email?.message}
            autoComplete="email"
            required
            disabled={isSubmitting}
            hint="Enter the email associated with your account"
          />

          <AuthButton
            type="submit"
            isLoading={isSubmitting}
            loadingText="Sending link..."
          >
            Send reset link
            <ArrowRight className="h-4 w-4" />
          </AuthButton>
        </motion.form>
      </AuthCard>
    </AuthLayout>
  );
}
