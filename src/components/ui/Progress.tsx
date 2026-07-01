/**
 * TruChek — Progress Bar Component
 * Animated progress bars for trust scores and metrics
 */

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// ============================================================
// TYPES
// ============================================================

interface ProgressProps {
  value:       number;          // 0–100
  max?:        number;
  variant?:    "primary" | "success" | "warning" | "danger" | "info" | "gradient";
  size?:       "xs" | "sm" | "md" | "lg";
  label?:      string;
  showValue?:  boolean;
  animated?:   boolean;
  className?:  string;
  trackClassName?: string;
}

// ============================================================
// COLOR MAP
// ============================================================

const variantColorMap = {
  primary:  "#6366f1",
  success:  "#22c55e",
  warning:  "#f59e0b",
  danger:   "#f43f5e",
  info:     "#06b6d4",
  gradient: "linear-gradient(90deg, #6366f1, #8b5cf6, #06b6d4)",
} as const;

// ============================================================
// SIZE MAP
// ============================================================

const sizeMap = {
  xs: "h-1",
  sm: "h-1.5",
  md: "h-2",
  lg: "h-3",
} as const;

// ============================================================
// COMPONENT
// ============================================================

export const Progress: React.FC<ProgressProps> = ({
  value,
  max      = 100,
  variant  = "primary",
  size     = "md",
  label,
  showValue = false,
  animated  = true,
  className,
  trackClassName,
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const color      = variantColorMap[variant];
  const isGradient = variant === "gradient";

  return (
    <div className={cn("w-full", className)}>
      {/* Header */}
      {(label || showValue) && (
        <div className="flex items-center justify-between mb-1.5 gap-2">
          {label && (
            <span className="text-xs text-[#94a3b8] font-medium">{label}</span>
          )}
          {showValue && (
            <span className="text-xs text-[#f1f5f9] font-semibold tabular-nums">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}

      {/* Track */}
      <div
        className={cn(
          "w-full rounded-full bg-white/6 overflow-hidden",
          sizeMap[size],
          trackClassName
        )}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label}
      >
        {/* Fill */}
        <motion.div
          className={cn("h-full rounded-full relative", !isGradient && "")}
          style={{
            background: isGradient ? color : color,
            boxShadow:  isGradient
              ? "0 0 8px rgba(99, 102, 241, 0.4)"
              : `0 0 8px ${color}50`,
          }}
          initial={{ width: "0%" }}
          animate={{ width: `${percentage}%` }}
          transition={
            animated
              ? { type: "spring", stiffness: 120, damping: 20, delay: 0.1 }
              : { duration: 0 }
          }
        >
          {/* Shimmer on gradient */}
          {isGradient && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
        </motion.div>
      </div>
    </div>
  );
};

// ============================================================
// CIRCULAR PROGRESS (Trust Score)
// ============================================================

interface CircularProgressProps {
  value:      number;
  size?:      number;
  stroke?:    number;
  color?:     string;
  trackColor?: string;
  label?:     React.ReactNode;
  className?: string;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  value,
  size       = 80,
  stroke     = 6,
  color      = "#6366f1",
  trackColor = "rgba(255,255,255,0.06)",
  label,
  className,
}) => {
  const radius      = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const percentage  = Math.min(Math.max(value, 0), 100);
  const offset      = circumference - (percentage / 100) * circumference;

  return (
    <div
      className={cn("relative inline-flex items-center justify-center", className)}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90"
      >
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={trackColor}
          strokeWidth={stroke}
        />

        {/* Progress */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.2 }}
          style={{
            filter: `drop-shadow(0 0 6px ${color}80)`,
          }}
        />
      </svg>

      {/* Center label */}
      {label && (
        <div className="absolute inset-0 flex items-center justify-center">
          {label}
        </div>
      )}
    </div>
  );
};
