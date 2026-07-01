import { cn } from '../../utils/cn';

interface AuthDividerProps {
  label?: string;
  className?: string;
}

export function AuthDivider({ label = 'or', className }: AuthDividerProps) {
  return (
    <div className={cn('relative flex items-center gap-3', className)}>
      <div className="flex-1 h-px bg-white/[0.06]" />
      <span className="text-xs text-zinc-600 uppercase tracking-widest">{label}</span>
      <div className="flex-1 h-px bg-white/[0.06]" />
    </div>
  );
}
