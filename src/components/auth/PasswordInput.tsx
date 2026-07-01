import { useState, forwardRef } from 'react';
import { Eye, EyeOff, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ label, error, hint, className, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    return (
      <div className="space-y-1.5">
        {label && (
          <label className="block text-sm font-medium text-zinc-300">
            {label}
            {props.required && <span className="ml-1 text-violet-400">*</span>}
          </label>
        )}

        <div className="relative group">
          {/* Left icon */}
          <div className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 z-10">
            <Lock
              className={cn(
                'h-4 w-4 transition-colors duration-200',
                isFocused ? 'text-violet-400' : 'text-zinc-500',
                error && 'text-red-400'
              )}
            />
          </div>

          <input
            ref={ref}
            {...props}
            type={showPassword ? 'text' : 'password'}
            onFocus={(e) => {
              setIsFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              props.onBlur?.(e);
            }}
            className={cn(
              'w-full rounded-xl border bg-white/[0.04] pl-10 pr-12 py-3',
              'text-sm text-zinc-100 placeholder:text-zinc-600',
              'outline-none transition-all duration-200',
              'border-white/[0.08]',
              !error && isFocused && 'border-violet-500/60 shadow-[0_0_0_3px_rgba(139,92,246,0.12)]',
              !error && !isFocused && 'hover:border-white/[0.14]',
              error && 'border-red-500/60 shadow-[0_0_0_3px_rgba(239,68,68,0.08)]',
              className
            )}
          />

          {/* Toggle visibility button */}
          <button
            type="button"
            tabIndex={-1}
            onClick={() => setShowPassword((v) => !v)}
            className={cn(
              'absolute right-3.5 top-1/2 -translate-y-1/2',
              'rounded-lg p-0.5',
              'text-zinc-500 hover:text-zinc-300',
              'transition-colors duration-200',
              'focus:outline-none focus:text-zinc-300'
            )}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            <AnimatePresence mode="wait" initial={false}>
              {showPassword ? (
                <motion.div
                  key="hide"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.15 }}
                >
                  <EyeOff className="h-4 w-4" />
                </motion.div>
              ) : (
                <motion.div
                  key="show"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.15 }}
                >
                  <Eye className="h-4 w-4" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Error */}
        <AnimatePresence mode="wait">
          {error && (
            <motion.p
              key="error"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-1.5 text-xs text-red-400"
            >
              <span className="inline-block h-1 w-1 rounded-full bg-red-400 flex-shrink-0" />
              {error}
            </motion.p>
          )}
          {hint && !error && (
            <motion.p
              key="hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs text-zinc-500"
            >
              {hint}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

PasswordInput.displayName = 'PasswordInput';
