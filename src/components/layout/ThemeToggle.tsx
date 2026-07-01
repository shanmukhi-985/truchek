import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Monitor, Check } from "lucide-react";
import { cn } from "../../utils/cn";
import { useTheme, type Theme } from "../../contexts/ThemeContext";

const THEME_OPTIONS: { value: Theme; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
];

export function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const CurrentIcon = resolvedTheme === "dark" ? Moon : Sun;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-200",
          "dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800 dark:border dark:border-slate-800",
          "text-slate-500 hover:text-slate-900 hover:bg-slate-100 border border-slate-200",
          open && "dark:bg-slate-800 dark:text-white bg-slate-100 text-slate-900"
        )}
        aria-label={`Theme: ${theme}. Click to change.`}
        aria-expanded={open}
      >
        <CurrentIcon className="h-4 w-4" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -8 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className={cn(
              "absolute right-0 top-11 z-50 w-44 overflow-hidden rounded-2xl shadow-2xl",
              "dark:bg-slate-900 dark:border dark:border-slate-700/60",
              "bg-white border border-slate-200"
            )}
          >
            <div className="p-2 space-y-0.5">
              {THEME_OPTIONS.map(({ value, label, icon: Icon }) => (
                <button
                  key={value}
                  onClick={() => {
                    setTheme(value);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors",
                    theme === value
                      ? "dark:bg-violet-600/15 dark:text-violet-400 bg-violet-50 text-violet-600"
                      : "dark:text-slate-300 dark:hover:bg-slate-800 text-slate-700 hover:bg-slate-100"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span className="flex-1 text-left">{label}</span>
                  {theme === value && <Check className="h-3.5 w-3.5" />}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
