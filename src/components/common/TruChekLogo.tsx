/**
 * TruChek — Logo Component
 * Brand logo with shield mark and wordmark
 */

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// ============================================================
// TYPES
// ============================================================

interface TruChekLogoProps {
  size?:       "xs" | "sm" | "md" | "lg" | "xl";
  variant?:    "full" | "mark" | "wordmark";
  animated?:   boolean;
  className?:  string;
  href?:       string;
}

// ============================================================
// SIZE CONFIG
// ============================================================

const sizeConfig = {
  xs: { mark: 20, font: "text-sm",  gap: "gap-1.5" },
  sm: { mark: 26, font: "text-base", gap: "gap-2" },
  md: { mark: 32, font: "text-lg",  gap: "gap-2.5" },
  lg: { mark: 40, font: "text-xl",  gap: "gap-3" },
  xl: { mark: 52, font: "text-2xl", gap: "gap-3.5" },
} as const;

// ============================================================
// SHIELD MARK SVG
// ============================================================

const ShieldMark: React.FC<{ size: number; animated?: boolean }> = ({
  size,
  animated = false,
}) => {
  const radius = Math.round(size * 0.28);

  return (
    <div
      className="relative flex items-center justify-center rounded-[28%] overflow-hidden shrink-0"
      style={{
        width:      size,
        height:     size,
        background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 60%, #4338ca 100%)",
        boxShadow:  "0 2px 8px rgba(99, 102, 241, 0.4), inset 0 1px 0 rgba(255,255,255,0.15)",
        borderRadius: `${radius}px`,
      }}
    >
      {/* Inner SVG */}
      <svg
        width={size * 0.6}
        height={size * 0.6}
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M12 2.5L4 6.5v5c0 4.8 3.4 9.3 8 10.5 4.6-1.2 8-5.7 8-10.5v-5L12 2.5z"
          fill="rgba(255,255,255,0.18)"
          stroke="rgba(255,255,255,0.9)"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <motion.path
          d="M8.5 12l2.5 2.5 5-5"
          stroke="white"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={animated ? { pathLength: 0, opacity: 0 } : {}}
          animate={animated ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
        />
      </svg>

      {/* Shine overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 60%)",
        }}
      />
    </div>
  );
};

// ============================================================
// COMPONENT
// ============================================================

export const TruChekLogo: React.FC<TruChekLogoProps> = ({
  size     = "md",
  variant  = "full",
  animated = false,
  className,
}) => {
  const cfg = sizeConfig[size];

  if (variant === "mark") {
    return (
      <ShieldMark size={cfg.mark} animated={animated} />
    );
  }

  if (variant === "wordmark") {
    return (
      <span
        className={cn(
          "font-display font-extrabold tracking-tight text-[#f1f5f9]",
          cfg.font,
          className
        )}
      >
        Tru<span className="text-[#6366f1]">Chek</span>
      </span>
    );
  }

  return (
    <div className={cn("flex items-center", cfg.gap, className)}>
      <ShieldMark size={cfg.mark} animated={animated} />
      <div className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display font-extrabold tracking-tight text-[#f1f5f9] leading-none",
            cfg.font
          )}
        >
          Tru<span className="text-[#6366f1]">Chek</span>
        </span>
      </div>
    </div>
  );
};
