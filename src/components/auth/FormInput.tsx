import { useState, forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';
import type { LucideIcon } from 'lucide-react';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  icon?: LucideIcon;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, hint, icon: Icon, className, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
      <div className="space-y-1.5">
        {label && (
          <label className="block text-sm font-medium text-zinc-300">
            {label}
            {props.required && <span className="ml-1 text-violet-400">*</span>}
          </label>
        )}

        <div className="relative">
          {Icon && (
            <div className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 z-10">
              <Icon
                className={cn(
                  'h-4 w-4 transition-colors duration-200',
                  isFocused ? 'text-violet-400' : 'text-zinc-500',
                  error && 'text-red-400'
                )}
              />
            </div>
          )}

          <input
            ref={ref}
            {...props}
            onFocus={(e) => {
              setIsFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              props.onBlur?.(e);
            }}
            className={cn(
              'w-full rounded-xl border bg-white/[0.04] py-3 text-sm',
              'text-zinc-100 placeholder:text-zinc-600',
              'outline-none transition-all duration-200',
              Icon ? 'pl-10 pr-4' : 'px-4',
              'border-white/[0.08]',
              !error && isFocused && 'border-violet-500/60 shadow-[0_0_0_3px_rgba(139,92,246,0.12)]',
              !error && !isFocused && 'hover:border-white/[0.14]',
              error && 'border-red-500/60 shadow-[0_0_0_3px_rgba(239,68,68,0.08)]',
              className
            )}
          />
        </div>

        <AnimatePresence mode="wait">
          {error ? (
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
          ) : hint ? (
            <motion.p
              key="hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs text-zinc-500"
            >
              {hint}
            </motion.p>
          ) : null}
        </AnimatePresence>
      </div>
    );
  }
);

FormInput.displayName = 'FormInput';
