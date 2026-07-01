/**
 * TruChek — Loader Component
 * Animated loading spinner with premium feel
 */

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// ============================================================
// TYPES
// ============================================================

interface LoaderProps {
  size?:    "xs" | "sm" | "md" | "lg" | "xl";
  variant?: "spin" | "pulse" | "dots" | "bars";
  className?: string;
  label?:   string;
}

// ============================================================
// SIZE MAP
// ============================================================

const sizeMap = {
  xs: "w-3 h-3",
  sm: "w-4 h-4",
  md: "w-6 h-6",
  lg: "w-8 h-8",
  xl: "w-12 h-12",
} as const;

const strokeSizeMap = {
  xs: 2.5,
  sm: 2.5,
  md: 2,
  lg: 2,
  xl: 1.5,
} as const;

// ============================================================
// SPIN LOADER
// ============================================================

const SpinLoader: React.FC<{ size: keyof typeof sizeMap; className?: string }> = ({
  size,
  className,
}) => (
  <motion.svg
    className={cn(sizeMap[size], "text-current", className)}
    viewBox="0 0 24 24"
    fill="none"
    animate={{ rotate: 360 }}
    transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
  >
    <circle
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth={strokeSizeMap[size]}
      strokeLinecap="round"
      opacity={0.2}
    />
    <path
      d="M12 2a10 10 0 0 1 10 10"
      stroke="currentColor"
      strokeWidth={strokeSizeMap[size]}
      strokeLinecap="round"
    />
  </motion.svg>
);

// ============================================================
// DOTS LOADER
// ============================================================

const DotsLoader: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn("flex items-center gap-1", className)}>
    {[0, 1, 2].map((i) => (
      <motion.div
        key={i}
        className="w-1.5 h-1.5 rounded-full bg-current"
        animate={{ opacity: [0.4, 1, 0.4], y: [0, -4, 0] }}
        transition={{
          duration:   0.8,
          repeat:     Infinity,
          ease:       "easeInOut",
          delay:      i * 0.15,
        }}
      />
    ))}
  </div>
);

// ============================================================
// PULSE LOADER
// ============================================================

const PulseLoader: React.FC<{ size: keyof typeof sizeMap; className?: string }> = ({
  size,
  className,
}) => (
  <motion.div
    className={cn(
      sizeMap[size],
      "rounded-full bg-[#6366f1]",
      className
    )}
    animate={{
      scale:   [1, 1.2, 1],
      opacity: [0.7, 1, 0.7],
    }}
    transition={{
      duration: 1.2,
      repeat:   Infinity,
      ease:     "easeInOut",
    }}
  />
);

// ============================================================
// BARS LOADER
// ============================================================

const BarsLoader: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn("flex items-end gap-0.5 h-5", className)}>
    {[0, 1, 2, 3].map((i) => (
      <motion.div
        key={i}
        className="w-1 bg-current rounded-full"
        animate={{ height: ["30%", "100%", "30%"] }}
        transition={{
          duration: 0.9,
          repeat:   Infinity,
          ease:     "easeInOut",
          delay:    i * 0.15,
        }}
      />
    ))}
  </div>
);

// ============================================================
// MAIN COMPONENT
// ============================================================

export const Loader: React.FC<LoaderProps> = ({
  size    = "md",
  variant = "spin",
  className,
  label,
}) => {
  const spinner = (() => {
    switch (variant) {
      case "dots":  return <DotsLoader className={className} />;
      case "pulse": return <PulseLoader size={size} className={className} />;
      case "bars":  return <BarsLoader className={className} />;
      default:      return <SpinLoader size={size} className={className} />;
    }
  })();

  return (
    <div
      role="status"
      aria-label={label ?? "Loading..."}
      className="inline-flex items-center gap-2"
    >
      {spinner}
      {label && (
        <span className="text-sm text-[#94a3b8]">{label}</span>
      )}
    </div>
  );
};

// ============================================================
// PAGE LOADER (full-screen)
// ============================================================

interface PageLoaderProps {
  label?: string;
}

export const PageLoader: React.FC<PageLoaderProps> = ({ label = "Loading..." }) => (
  <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#09090e] z-50 gap-4">
    {/* Logo mark */}
    <motion.div
      className="relative flex items-center justify-center"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#6366f1] to-[#4f46e5] flex items-center justify-center shadow-lg shadow-[rgba(99,102,241,0.3)]">
        <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-white">
          <path
            d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.25C17.25 22.15 21 17.25 21 12V7l-9-5z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="rgba(255,255,255,0.15)"
          />
          <path
            d="M9 12l2 2 4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Pulse rings */}
      <motion.div
        className="absolute inset-0 rounded-2xl border border-[#6366f1]/30"
        animate={{ scale: [1, 1.4], opacity: [0.6, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
      />
      <motion.div
        className="absolute inset-0 rounded-2xl border border-[#6366f1]/20"
        animate={{ scale: [1, 1.7], opacity: [0.4, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut", delay: 0.4 }}
      />
    </motion.div>

    {/* Brand */}
    <motion.div
      className="flex flex-col items-center gap-1"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <span className="font-display font-bold text-xl text-[#f1f5f9] tracking-tight">
        TruChek
      </span>
      <span className="text-xs text-[#475569]">{label}</span>
    </motion.div>

    {/* Progress bar */}
    <motion.div
      className="w-48 h-0.5 bg-white/6 rounded-full overflow-hidden mt-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <motion.div
        className="h-full bg-gradient-to-r from-transparent via-[#6366f1] to-transparent"
        animate={{ x: ["-100%", "200%"] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  </div>
);
