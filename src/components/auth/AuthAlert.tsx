import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle, Info, XCircle, X } from 'lucide-react';
import { cn } from '../../utils/cn';

type AlertVariant = 'error' | 'success' | 'warning' | 'info';

interface AuthAlertProps {
  variant: AlertVariant;
  message: string;
  onClose?: () => void;
  className?: string;
}

const config: Record<AlertVariant, {
  icon: React.ElementType;
  bg: string;
  border: string;
  text: string;
  iconColor: string;
}> = {
  error: {
    icon: XCircle,
    bg: 'rgba(239,68,68,0.08)',
    border: 'rgba(239,68,68,0.25)',
    text: '#fca5a5',
    iconColor: '#f87171',
  },
  success: {
    icon: CheckCircle,
    bg: 'rgba(16,185,129,0.08)',
    border: 'rgba(16,185,129,0.25)',
    text: '#6ee7b7',
    iconColor: '#34d399',
  },
  warning: {
    icon: AlertCircle,
    bg: 'rgba(245,158,11,0.08)',
    border: 'rgba(245,158,11,0.25)',
    text: '#fcd34d',
    iconColor: '#fbbf24',
  },
  info: {
    icon: Info,
    bg: 'rgba(59,130,246,0.08)',
    border: 'rgba(59,130,246,0.25)',
    text: '#93c5fd',
    iconColor: '#60a5fa',
  },
};

export function AuthAlert({ variant, message, onClose, className }: AuthAlertProps) {
  const cfg = config[variant];
  const Icon = cfg.icon;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -8, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -8, scale: 0.97 }}
        transition={{ duration: 0.25 }}
        className={cn('relative flex items-start gap-3 rounded-xl p-4', className)}
        style={{
          background: cfg.bg,
          border: `1px solid ${cfg.border}`,
        }}
        role="alert"
      >
        <Icon
          className="h-4 w-4 flex-shrink-0 mt-0.5"
          style={{ color: cfg.iconColor }}
        />
        <p className="text-sm leading-relaxed" style={{ color: cfg.text }}>
          {message}
        </p>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="ml-auto flex-shrink-0 text-zinc-500 hover:text-zinc-300 transition-colors"
            aria-label="Dismiss"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
