/**
 * TruChek — Card Component
 * Premium surface container with variants
 */

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const cardVariants = cva(
  [
    "rounded-xl border",
    "transition-all duration-200",
  ],
  {
    variants: {
      variant: {
        default:  "bg-[#111118] border-white/8",
        raised:   "bg-[#16161f] border-white/8 shadow-md",
        glass:    "bg-white/4 backdrop-blur-xl border-white/8",
        outline:  "bg-transparent border-white/12",
        sunken:   "bg-[#07070c] border-white/6",
      },
      padding: {
        none: "p-0",
        sm:   "p-3",
        md:   "p-5",
        lg:   "p-6",
        xl:   "p-8",
      },
      hoverable: {
        true:  "hover:border-white/14 hover:-translate-y-0.5 hover:shadow-lg cursor-pointer",
        false: "",
      },
    },
    defaultVariants: {
      variant:   "default",
      padding:   "md",
      hoverable: false,
    },
  }
);

// ============================================================
// TYPES
// ============================================================

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  action?: React.ReactNode;
}

export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4";
}

// ============================================================
// CARD
// ============================================================

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, hoverable, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ variant, padding, hoverable }), className)}
      {...props}
    >
      {children}
    </div>
  )
);

Card.displayName = "Card";

// ============================================================
// CARD HEADER
// ============================================================

export const CardHeader: React.FC<CardHeaderProps> = ({
  className,
  action,
  children,
  ...props
}) => (
  <div
    className={cn("flex items-start justify-between gap-4 mb-4", className)}
    {...props}
  >
    <div className="min-w-0 flex-1">{children}</div>
    {action && <div className="shrink-0">{action}</div>}
  </div>
);

// ============================================================
// CARD TITLE
// ============================================================

export const CardTitle: React.FC<CardTitleProps> = ({
  as: Tag = "h3",
  className,
  children,
  ...props
}) => (
  <Tag
    className={cn(
      "text-[#f1f5f9] font-semibold text-base leading-tight tracking-tight",
      className
    )}
    {...props}
  >
    {children}
  </Tag>
);

// ============================================================
// CARD DESCRIPTION
// ============================================================

export const CardDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
  className,
  children,
  ...props
}) => (
  <p
    className={cn("text-sm text-[#94a3b8] mt-1 leading-relaxed", className)}
    {...props}
  >
    {children}
  </p>
);

// ============================================================
// CARD CONTENT
// ============================================================

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => (
  <div className={cn("", className)} {...props}>
    {children}
  </div>
);

// ============================================================
// CARD FOOTER
// ============================================================

export const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => (
  <div
    className={cn(
      "flex items-center justify-between gap-4 mt-4 pt-4 border-t border-white/6",
      className
    )}
    {...props}
  >
    {children}
  </div>
);
