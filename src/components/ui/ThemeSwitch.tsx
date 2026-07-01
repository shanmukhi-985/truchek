/**
 * TruChek — Theme Switch Component
 * Premium animated theme toggle
 */

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";
import { cn } from "@/lib/utils";
import type { ThemeMode } from "@/types/theme";

// ============================================================
// ICON TOGGLE (Simple sun/moon)
// ============================================================

interface ThemeToggleProps {
  className?: string;
  size?:      "sm" | "md" | "lg";
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  className,
  size = "md",
}) => {
  const { isDark, toggleMode } = useTheme();

  const sizeMap = {
    sm: { wrapper: "w-8 h-8", icon: 14 },
    md: { wrapper: "w-9 h-9", icon: 16 },
    lg: { wrapper: "w-10 h-10", icon: 18 },
  };

  const s = sizeMap[size];

  return (
    <button
      onClick={toggleMode}
      className={cn(
        "relative flex items-center justify-center rounded-lg",
        "bg-white/6 hover:bg-white/10 border border-white/10 hover:border-white/16",
        "transition-all duration-200",
        "text-[#94a3b8] hover:text-[#f1f5f9]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6366f1]",
        "cursor-pointer",
        s.wrapper,
        className
      )}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      type="button"
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.span
            key="moon"
            initial={{ scale: 0.5, opacity: 0, rotate: -30 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.5, opacity: 0, rotate: 30 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
          >
            <Moon size={s.icon} />
          </motion.span>
        ) : (
          <motion.span
            key="sun"
            initial={{ scale: 0.5, opacity: 0, rotate: 30 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.5, opacity: 0, rotate: -30 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
          >
            <Sun size={s.icon} />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
};

// ============================================================
// THEME SELECTOR (3-option)
// ============================================================

interface ThemeSelectorProps {
  className?: string;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({ className }) => {
  const { mode, setMode } = useTheme();

  const options: { value: ThemeMode; icon: React.ReactNode; label: string }[] = [
    { value: "light",  icon: <Sun size={14} />,     label: "Light" },
    { value: "dark",   icon: <Moon size={14} />,    label: "Dark" },
    { value: "system", icon: <Monitor size={14} />, label: "System" },
  ];

  return (
    <div
      className={cn(
        "flex items-center gap-0.5 p-0.5",
        "rounded-lg bg-white/6 border border-white/8",
        className
      )}
      role="radiogroup"
      aria-label="Select theme"
    >
      {options.map((opt) => {
        const isActive = mode === opt.value;

        return (
          <button
            key={opt.value}
            onClick={() => setMode(opt.value)}
            type="button"
            role="radio"
            aria-checked={isActive}
            aria-label={`${opt.label} theme`}
            className={cn(
              "relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-md",
              "text-xs font-medium",
              "transition-all duration-200",
              "cursor-pointer",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6366f1]",
              isActive
                ? "text-[#f1f5f9]"
                : "text-[#475569] hover:text-[#94a3b8]"
            )}
          >
            {isActive && (
              <motion.div
                layoutId="theme-selector-indicator"
                className="absolute inset-0 rounded-md bg-white/10 border border-white/12"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              {opt.icon}
              {opt.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};
