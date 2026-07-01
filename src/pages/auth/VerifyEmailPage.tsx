import { useState, useEffect, useRef } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Loader2, CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import { ROUTES } from '../../lib/constants';
import { mockAuthService } from '../../lib/api/auth.service';
import { AuthLayout } from '../../components/auth/AuthLayout';
import { AuthCard } from '../../components/auth/AuthCard';
import { AuthButton } from '../../components/auth/AuthButton';
import { AuthAlert } from '../../components/auth/AuthAlert';

type VerifyState = 'pending' | 'verifying' | 'success' | 'error';

export function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');
  const email = searchParams.get('email') || '';

  const [state, setState] = useState<VerifyState>(token ? 'verifying' : 'pending');
  const [errorMsg, setErrorMsg] = useState('');
  const [resending, setResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const verified = useRef(false);

  useEffect(() => {
    if (!token || verified.current) return;
    verified.current = true;

    const verify = async () => {
      try {
        await mockAuthService.verifyEmail({ token });
        setState('success');
        setTimeout(() => navigate(ROUTES.VERIFY_EMAIL_SUCCESS, { replace: true }), 1500);
      } catch (err) {
        const e = err as { message?: string };
        setErrorMsg(e.message || 'Email verification failed. The link may have expired.');
        setState('error');
      }
    };

    void verify();
  }, [token, navigate]);

  const handleResend = async () => {
    if (!email) return;
    setResending(true);
    setResendSuccess(false);
    try {
      await mockAuthService.forgotPassword({ email }); // reuse mock delay
      setResendSuccess(true);
    } catch {
      // ignore
    } finally {
      setResending(false);
    }
  };

  // ── Verifying state ──────────────────────────────────────────────────────────
  if (state === 'verifying') {
    return (
      <AuthLayout>
        <AuthCard>
          <div className="py-8 flex flex-col items-center gap-6 text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
              className="flex h-16 w-16 items-center justify-center rounded-full bg-violet-500/10"
            >
              <Loader2 className="h-8 w-8 text-violet-400" />
            </motion.div>
            <div>
              <h2 className="text-2xl font-semibold text-white">Verifying email...</h2>
              <p className="mt-2 text-sm text-zinc-500">Please wait a moment.</p>
            </div>
          </div>
        </AuthCard>
      </AuthLayout>
    );
  }

  // ── Success state ────────────────────────────────────────────────────────────
  if (state === 'success') {
    return (
      <AuthLayout>
        <AuthCard>
          <div className="py-8 flex flex-col items-center gap-6 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 250 }}
              className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10"
            >
              <CheckCircle className="h-8 w-8 text-emerald-400" />
            </motion.div>
            <div>
              <h2 className="text-2xl font-semibold text-white">Email verified!</h2>
              <p className="mt-2 text-sm text-zinc-500">Redirecting to success page...</p>
            </div>
          </div>
        </AuthCard>
      </AuthLayout>
    );
  }

  // ── Error state ──────────────────────────────────────────────────────────────
  if (state === 'error') {
    return (
      <AuthLayout>
        <AuthCard>
          <div className="py-4 text-center space-y-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 250 }}
              className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10"
            >
              <XCircle className="h-8 w-8 text-red-400" />
            </motion.div>

            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-white">Verification failed</h2>
              <p className="text-sm text-zinc-500 leading-relaxed">{errorMsg}</p>
            </div>

            {email && (
              <div className="space-y-3">
                {resendSuccess && (
                  <AuthAlert variant="success" message="A new verification email has been sent!" />
                )}
                <AuthButton
                  variant="secondary"
                  onClick={handleResend}
                  isLoading={resending}
                  loadingText="Sending..."
                >
                  <RefreshCw className="h-4 w-4" />
                  Resend verification email
                </AuthButton>
              </div>
            )}

            <Link to={ROUTES.LOGIN}>
              <AuthButton variant="ghost">Back to login</AuthButton>
            </Link>
          </div>
        </AuthCard>
      </AuthLayout>
    );
  }

  // ── Pending state (no token) ─────────────────────────────────────────────────
  return (
    <AuthLayout>
      <AuthCard>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="py-4 text-center space-y-6"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl"
            style={{
              background: 'rgba(139,92,246,0.12)',
              border: '1px solid rgba(139,92,246,0.2)',
            }}
          >
            <Mail className="h-8 w-8 text-violet-400" />
          </motion.div>

          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-white">Verify your email</h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              We sent a verification link to{' '}
              {email ? (
                <span className="text-zinc-200 font-medium">{email}</span>
              ) : (
                'your email address'
              )}
              . Click the link to activate your account.
            </p>
          </div>

          <div
            className="rounded-xl p-4 text-left"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
            }}
          >
            <p className="text-xs text-zinc-500 leading-relaxed space-y-1">
              <span className="block">1. Check your inbox for a verification email.</span>
              <span className="block">2. Click the "Verify Email" button in the email.</span>
              <span className="block">3. You'll be redirected back to TruChek.</span>
            </p>
          </div>

          {resendSuccess && (
            <AuthAlert variant="success" message="Verification email resent successfully!" />
          )}

          <div className="space-y-3">
            {email && (
              <AuthButton
                variant="secondary"
                onClick={handleResend}
                isLoading={resending}
                loadingText="Sending..."
              >
                <RefreshCw className="h-4 w-4" />
                Resend verification email
              </AuthButton>
            )}
            <Link to={ROUTES.LOGIN} className="block">
              <AuthButton variant="ghost">Back to login</AuthButton>
            </Link>
          </div>
        </motion.div>
      </AuthCard>
    </AuthLayout>
  );
}
