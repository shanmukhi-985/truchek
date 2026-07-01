import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldOff, ArrowLeft, Home } from 'lucide-react';
import { ROUTES } from '../../lib/constants';
import { useAuth } from '../../contexts/AuthContext';
import { AuthLayout } from '../../components/auth/AuthLayout';
import { AuthCard } from '../../components/auth/AuthCard';
import { AuthButton } from '../../components/auth/AuthButton';

export function UnauthorizedPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <AuthLayout>
      <AuthCard>
        <div className="py-4 text-center space-y-6">
          {/* 403 Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="relative mx-auto w-fit"
          >
            <div
              className="flex h-16 w-16 items-center justify-center rounded-2xl"
              style={{
                background: 'rgba(239,68,68,0.12)',
                border: '1px solid rgba(239,68,68,0.25)',
              }}
            >
              <ShieldOff className="h-8 w-8 text-red-400" />
            </div>
          </motion.div>

          {/* Code + message */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-2"
          >
            <p className="text-xs font-mono font-bold uppercase tracking-widest text-red-500">
              Error 403
            </p>
            <h2 className="text-2xl font-semibold text-white">Access denied</h2>
            <p className="text-sm text-zinc-400 leading-relaxed max-w-xs mx-auto">
              You don't have permission to access this resource. Contact your administrator if you
              believe this is a mistake.
            </p>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="space-y-3"
          >
            <AuthButton onClick={() => navigate(-1)} variant="secondary">
              <ArrowLeft className="h-4 w-4" />
              Go back
            </AuthButton>

            <Link to={isAuthenticated ? ROUTES.DASHBOARD : ROUTES.LOGIN} className="block">
              <AuthButton variant="ghost">
                <Home className="h-4 w-4" />
                {isAuthenticated ? 'Go to dashboard' : 'Return to login'}
              </AuthButton>
            </Link>
          </motion.div>
        </div>
      </AuthCard>
    </AuthLayout>
  );
}
