import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, ArrowRight, RefreshCw } from 'lucide-react';
import { ROUTES } from '../../lib/constants';
import { AuthLayout } from '../../components/auth/AuthLayout';
import { AuthCard } from '../../components/auth/AuthCard';
import { AuthButton } from '../../components/auth/AuthButton';

export function SessionExpiredPage() {
  return (
    <AuthLayout>
      <AuthCard>
        <div className="py-4 text-center space-y-6">
          {/* Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -15 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="relative mx-auto w-fit"
          >
            <div
              className="flex h-16 w-16 items-center justify-center rounded-2xl"
              style={{
                background: 'rgba(245,158,11,0.12)',
                border: '1px solid rgba(245,158,11,0.25)',
              }}
            >
              <Clock className="h-8 w-8 text-amber-400" />
            </div>

            {/* Pulse ring */}
            <motion.div
              animate={{ scale: [1, 1.4], opacity: [0.4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
              className="absolute inset-0 rounded-2xl"
              style={{ border: '1px solid rgba(245,158,11,0.4)' }}
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-2"
          >
            <h2 className="text-2xl font-semibold text-white">Session expired</h2>
            <p className="text-sm text-zinc-400 leading-relaxed max-w-xs mx-auto">
              Your session has timed out for security reasons. Please sign in again to continue.
            </p>
          </motion.div>

          {/* Info box */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="rounded-xl p-4"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
            }}
          >
            <p className="text-xs text-zinc-500 leading-relaxed">
              For your security, TruChek automatically ends sessions after a period of inactivity.
              Enable "Remember me" when signing in to stay logged in for longer.
            </p>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-3"
          >
            <Link to={ROUTES.LOGIN}>
              <AuthButton>
                <RefreshCw className="h-4 w-4" />
                Sign in again
              </AuthButton>
            </Link>
            <Link to={ROUTES.HOME} className="block">
              <AuthButton variant="ghost">
                Return to home
                <ArrowRight className="h-4 w-4" />
              </AuthButton>
            </Link>
          </motion.div>
        </div>
      </AuthCard>
    </AuthLayout>
  );
}
