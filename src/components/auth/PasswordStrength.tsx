import { motion, AnimatePresence } from 'framer-motion';
import { calculatePasswordStrength } from '../../lib/validations/auth';
import { cn } from '../../utils/cn';

interface PasswordStrengthProps {
  password: string;
  className?: string;
}

export function PasswordStrength({ password, className }: PasswordStrengthProps) {
  const result = calculatePasswordStrength(password);

  if (!password) return null;

  const segments = 4;
  const filledSegments = Math.ceil((result.score / 4) * segments);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.3 }}
        className={cn('space-y-2', className)}
      >
        {/* Strength bars */}
        <div className="flex gap-1.5">
          {Array.from({ length: segments }).map((_, i) => (
            <div
              key={i}
              className="h-1 flex-1 rounded-full overflow-hidden bg-white/[0.06]"
            >
              <motion.div
                className="h-full rounded-full"
                initial={{ width: 0 }}
                animate={{
                  width: i < filledSegments ? '100%' : '0%',
                }}
                transition={{
                  duration: 0.3,
                  delay: i * 0.05,
                  ease: 'easeOut',
                }}
                style={{ backgroundColor: result.color }}
              />
            </div>
          ))}
        </div>

        {/* Label & feedback */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-1.5">
            <span
              className="text-xs font-medium"
              style={{ color: result.color }}
            >
              {result.label}
            </span>
          </div>
          {result.feedback.length > 0 && (
            <p className="text-xs text-zinc-500 text-right leading-relaxed">
              {result.feedback[0]}
            </p>
          )}
        </div>

        {/* Requirements checklist */}
        <RequirementsList password={password} />
      </motion.div>
    </AnimatePresence>
  );
}

interface Requirement {
  label: string;
  test: (pw: string) => boolean;
}

const requirements: Requirement[] = [
  { label: 'At least 8 characters', test: (pw) => pw.length >= 8 },
  { label: 'Uppercase letter (A-Z)', test: (pw) => /[A-Z]/.test(pw) },
  { label: 'Lowercase letter (a-z)', test: (pw) => /[a-z]/.test(pw) },
  { label: 'Number (0-9)', test: (pw) => /[0-9]/.test(pw) },
  { label: 'Special character (!@#$...)', test: (pw) => /[^A-Za-z0-9]/.test(pw) },
];

function RequirementsList({ password }: { password: string }) {
  return (
    <div className="grid grid-cols-1 gap-1">
      {requirements.map((req) => {
        const met = req.test(password);
        return (
          <motion.div
            key={req.label}
            className="flex items-center gap-2"
            animate={{ opacity: met ? 0.9 : 0.5 }}
          >
            <div
              className={cn(
                'h-3.5 w-3.5 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-300',
                met ? 'bg-emerald-500/20' : 'bg-white/[0.06]'
              )}
            >
              {met ? (
                <svg className="h-2 w-2 text-emerald-400" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M2 6l3 3 5-5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <div className="h-1 w-1 rounded-full bg-zinc-600" />
              )}
            </div>
            <span
              className={cn(
                'text-[11px] transition-colors duration-300',
                met ? 'text-emerald-400' : 'text-zinc-500'
              )}
            >
              {req.label}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}
