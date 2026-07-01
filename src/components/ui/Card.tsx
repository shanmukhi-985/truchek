import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
  padding?: "none" | "sm" | "md" | "lg";
  glass?: boolean;
}

export function Card({
  children,
  className,
  hover = false,
  onClick,
  padding = "md",
  glass = false,
}: CardProps) {
  const paddings = {
    none: "",
    sm: "p-4",
    md: "p-5",
    lg: "p-6",
  };

  const base = cn(
    "rounded-2xl border transition-all duration-200",
    "dark:bg-slate-900/60 dark:border-slate-800/60",
    "light:bg-white light:border-slate-200/80",
    glass && "glass-dark",
    paddings[padding],
    hover &&
      "cursor-pointer dark:hover:bg-slate-800/60 dark:hover:border-slate-700/60 hover:shadow-lg",
    onClick && "cursor-pointer",
    className
  );

  if (hover || onClick) {
    return (
      <motion.div
        className={base}
        onClick={onClick}
        whileHover={{ y: -2, scale: 1.005 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        {children}
      </motion.div>
    );
  }

  return <div className={base}>{children}</div>;
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function CardHeader({ children, className }: CardHeaderProps) {
  return (
    <div className={cn("mb-4 flex items-center justify-between", className)}>
      {children}
    </div>
  );
}

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
  description?: string;
}

export function CardTitle({ children, className, description }: CardTitleProps) {
  return (
    <div>
      <h3
        className={cn(
          "text-sm font-semibold dark:text-slate-100 text-slate-800",
          className
        )}
      >
        {children}
      </h3>
      {description && (
        <p className="mt-0.5 text-xs dark:text-slate-400 text-slate-500">
          {description}
        </p>
      )}
    </div>
  );
}
