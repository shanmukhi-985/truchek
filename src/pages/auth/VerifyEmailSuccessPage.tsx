import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import { ROUTES, APP_NAME } from '../../lib/constants';
import { AuthLayout } from '../../components/auth/AuthLayout';
import { AuthCard } from '../../components/auth/AuthCard';
import { AuthButton } from '../../components/auth/AuthButton';

export function VerifyEmailSuccessPage() {
  return (
    <AuthLayout>
      <AuthCard>
        <div className="py-4 text-center space-y-7">
          {/* Animated success badge */}
          <div className="relative mx-auto w-fit">
            <motion.div
              animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.2, 0.4] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(16,185,129,0.3) 0%, transparent 70%)',
                filter: 'blur(12px)',
              }}
            />
            <motion.div
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 250, damping: 15 }}
              className="relative flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/20"
            >
              <ShieldCheck className="h-10 w-10 text-emerald-400" />
            </motion.div>
          </div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-3"
          >
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="h-4 w-4 text-amber-400" />
              <span className="text-xs font-medium uppercase tracking-widest text-amber-400">
                Account Activated
              </span>
              <Sparkles className="h-4 w-4 text-amber-400" />
            </div>

            <h2 className="text-2xl font-semibold text-white">
              Welcome to {APP_NAME}!
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed max-w-sm mx-auto">
              Your email has been verified. Your account is now fully activated and you're ready
              to start fact-checking.
            </p>
          </motion.div>

          {/* Feature highlights */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-3 gap-3"
          >
            {features.map((f) => (
              <div
                key={f.label}
                className="rounded-xl p-3 text-center space-y-1.5"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                }}
              >
                <span className="text-lg">{f.emoji}</span>
                <p className="text-xs text-zinc-400 leading-tight">{f.label}</p>
              </div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-3"
          >
            <Link to={ROUTES.DASHBOARD}>
              <AuthButton>
                Get started
                <ArrowRight className="h-4 w-4" />
              </AuthButton>
            </Link>

            <Link to={ROUTES.LOGIN} className="block">
              <AuthButton variant="ghost">Sign in to existing account</AuthButton>
            </Link>
          </motion.div>
        </div>
      </AuthCard>
    </AuthLayout>
  );
}

const features = [
  { emoji: '🔍', label: 'AI Fact Checking' },
  { emoji: '📊', label: 'Analytics' },
  { emoji: '🛡️', label: 'Trusted Results' },
];
