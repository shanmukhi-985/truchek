/**
 * TruChek — Button Component
 * Premium interactive button with multiple variants and sizes
 */

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";
import { Loader } from "./Loader";

// ============================================================
// VARIANTS
// ============================================================

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2",
    "font-medium whitespace-nowrap select-none",
    "rounded-lg border border-transparent",
    "transition-all duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6366f1] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090e]",
    "disabled:pointer-events-none disabled:opacity-40",
    "cursor-pointer active:scale-[0.97]",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-[#6366f1] text-white border-[#6366f1]",
          "hover:bg-[#4f46e5] hover:border-[#4f46e5]",
          "active:bg-[#4338ca]",
          "shadow-sm hover:shadow-md",
        ],
        secondary: [
          "bg-white/6 text-[#f1f5f9] border-white/10",
          "hover:bg-white/10 hover:border-white/16",
          "active:bg-white/8",
        ],
        outline: [
          "bg-transparent text-[#f1f5f9] border-white/14",
          "hover:bg-white/5 hover:border-white/20",
          "active:bg-white/8",
        ],
        ghost: [
          "bg-transparent text-[#94a3b8] border-transparent",
          "hover:bg-white/6 hover:text-[#f1f5f9]",
          "active:bg-white/8",
        ],
        danger: [
          "bg-[#f43f5e] text-white border-[#f43f5e]",
          "hover:bg-[#e11d48] hover:border-[#e11d48]",
          "active:bg-[#be123c]",
          "shadow-sm",
        ],
        success: [
          "bg-[#22c55e] text-white border-[#22c55e]",
          "hover:bg-[#16a34a] hover:border-[#16a34a]",
          "active:bg-[#15803d]",
        ],
        link: [
          "bg-transparent text-[#6366f1] border-transparent p-0 h-auto",
          "hover:text-[#818cf8] underline-offset-4 hover:underline",
        ],
      },
      size: {
        xs:        "h-7 px-2.5 text-xs rounded-md gap-1.5",
        sm:        "h-8 px-3 text-sm rounded-lg gap-1.5",
        md:        "h-10 px-4 text-sm",
        lg:        "h-11 px-5 text-base",
        xl:        "h-12 px-6 text-base",
        icon:      "h-10 w-10 p-0",
        "icon-sm": "h-8 w-8 p-0",
        "icon-lg": "h-12 w-12 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size:    "md",
    },
  }
);

// ============================================================
// TYPES
// ============================================================

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?:     boolean;
  isLoading?:   boolean;
  loadingText?: string;
  leftIcon?:    React.ReactNode;
  rightIcon?:   React.ReactNode;
}

// ============================================================
// COMPONENT
// ============================================================

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild    = false,
      isLoading  = false,
      loadingText,
      leftIcon,
      rightIcon,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    const isDisabled = disabled || isLoading;

    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={isDisabled}
        aria-busy={isLoading}
        {...props}
      >
        {isLoading ? (
          <Loader size="sm" className="text-current" />
        ) : leftIcon ? (
          <span className="shrink-0">{leftIcon}</span>
        ) : null}

        {isLoading && loadingText ? loadingText : children}

        {!isLoading && rightIcon && (
          <span className="shrink-0">{rightIcon}</span>
        )}
      </Comp>
    );
  }
);

Button.displayName = "Button";
