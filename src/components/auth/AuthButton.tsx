import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { cn } from '../../utils/cn';

interface AuthButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  loadingText?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: React.ReactNode;
}

export function AuthButton({
  isLoading,
  loadingText,
  variant = 'primary',
  size = 'md',
  fullWidth = true,
  children,
  className,
  disabled,
  ...props
}: AuthButtonProps) {
  const isDisabled = disabled || isLoading;

  return (
    <motion.button
      whileHover={{ scale: isDisabled ? 1 : 1.01 }}
      whileTap={{ scale: isDisabled ? 1 : 0.99 }}
      {...(props as React.ComponentProps<typeof motion.button>)}
      disabled={isDisabled}
      className={cn(
        'relative flex items-center justify-center gap-2 rounded-xl font-medium',
        'transition-all duration-200 focus:outline-none',
        'disabled:cursor-not-allowed',

        // Sizes
        size === 'sm' && 'px-4 py-2 text-sm',
        size === 'md' && 'px-5 py-3 text-sm',
        size === 'lg' && 'px-6 py-3.5 text-base',

        // Width
        fullWidth && 'w-full',

        // Variants
        variant === 'primary' && [
          'bg-gradient-to-r from-violet-600 to-indigo-600',
          'text-white',
          'shadow-lg shadow-violet-500/20',
          'hover:from-violet-500 hover:to-indigo-500',
          'hover:shadow-violet-500/30',
          'focus:ring-2 focus:ring-violet-500/40',
          'disabled:from-violet-600/50 disabled:to-indigo-600/50 disabled:shadow-none',
        ],

        variant === 'secondary' && [
          'bg-white/[0.06] border border-white/[0.1]',
          'text-zinc-200',
          'hover:bg-white/[0.09] hover:border-white/[0.16]',
          'focus:ring-2 focus:ring-white/10',
          'disabled:opacity-50',
        ],

        variant === 'ghost' && [
          'text-zinc-400',
          'hover:text-zinc-200 hover:bg-white/[0.05]',
          'focus:ring-2 focus:ring-white/10',
          'disabled:opacity-50',
        ],

        className
      )}
    >
      {isLoading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>{loadingText || 'Loading...'}</span>
        </>
      ) : (
        children
      )}
    </motion.button>
  );
}
