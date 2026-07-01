/**
 * TruChek — Badge Component
 * Status badges, labels, and tags
 */

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  [
    "inline-flex items-center gap-1.5 font-medium leading-none",
    "rounded-full border",
    "transition-colors duration-200",
  ],
  {
    variants: {
      variant: {
        default:   "bg-white/8 text-[#94a3b8] border-white/10",
        primary:   "bg-[rgba(99,102,241,0.15)] text-[#818cf8] border-[rgba(99,102,241,0.25)]",
        success:   "bg-[rgba(34,197,94,0.12)] text-[#4ade80] border-[rgba(34,197,94,0.2)]",
        warning:   "bg-[rgba(245,158,11,0.12)] text-[#fbbf24] border-[rgba(245,158,11,0.2)]",
        danger:    "bg-[rgba(244,63,94,0.12)] text-[#fb7185] border-[rgba(244,63,94,0.2)]",
        info:      "bg-[rgba(6,182,212,0.12)] text-[#22d3ee] border-[rgba(6,182,212,0.2)]",
        outline:   "bg-transparent text-[#94a3b8] border-white/14",
        solid:     "bg-[#6366f1] text-white border-[#6366f1]",
      },
      size: {
        sm: "text-xs px-2 py-0.5",
        md: "text-xs px-2.5 py-1",
        lg: "text-sm px-3 py-1",
      },
    },
    defaultVariants: {
      variant: "default",
      size:    "md",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  dot?:     boolean;
  dotColor?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant,
  size,
  dot,
  dotColor,
  children,
  ...props
}) => (
  <span
    className={cn(badgeVariants({ variant, size }), className)}
    {...props}
  >
    {dot && (
      <span
        className="w-1.5 h-1.5 rounded-full shrink-0"
        style={{ backgroundColor: dotColor ?? "currentColor" }}
      />
    )}
    {children}
  </span>
);
