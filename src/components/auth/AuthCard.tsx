import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

interface AuthCardProps {
  children: React.ReactNode;
  className?: string;
}

export function AuthCard({ children, className }: AuthCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'relative w-full rounded-2xl p-8',
        'bg-white/[0.03] backdrop-blur-2xl',
        'border border-white/[0.08]',
        'shadow-2xl shadow-black/40',
        className
      )}
    >
      {/* Inner subtle glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl overflow-hidden"
        aria-hidden
      >
        <div
          className="absolute inset-x-0 top-0 h-px"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)',
          }}
        />
      </div>

      {children}
    </motion.div>
  );
}
