/**
 * TruChek — Skeleton Loader Components
 * Premium shimmer skeletons for loading states
 */

import React from "react";
import { cn } from "@/lib/utils";

// ============================================================
// BASE SKELETON
// ============================================================

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  width?:  string | number;
  height?: string | number;
  circle?: boolean;
  rounded?: "sm" | "md" | "lg" | "xl" | "full";
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className,
  width,
  height,
  circle = false,
  rounded = "md",
  style,
  ...props
}) => {
  const roundedMap = {
    sm:   "rounded",
    md:   "rounded-lg",
    lg:   "rounded-xl",
    xl:   "rounded-2xl",
    full: "rounded-full",
  };

  return (
    <div
      className={cn(
        "skeleton",
        circle ? "rounded-full" : roundedMap[rounded],
        className
      )}
      style={{
        width:  width,
        height: height,
        ...style,
      }}
      aria-hidden="true"
      {...props}
    />
  );
};

// ============================================================
// SKELETON TEXT
// ============================================================

interface SkeletonTextProps {
  lines?:    number;
  lastWidth?: string;
  className?: string;
}

export const SkeletonText: React.FC<SkeletonTextProps> = ({
  lines     = 3,
  lastWidth = "60%",
  className,
}) => (
  <div className={cn("flex flex-col gap-2", className)}>
    {Array.from({ length: lines }).map((_, i) => (
      <Skeleton
        key={i}
        height={16}
        width={i === lines - 1 ? lastWidth : "100%"}
      />
    ))}
  </div>
);

// ============================================================
// SKELETON CARD
// ============================================================

export const SkeletonCard: React.FC<{ className?: string }> = ({ className }) => (
  <div
    className={cn(
      "rounded-xl border border-white/8 bg-[#111118] p-5",
      "flex flex-col gap-4",
      className
    )}
  >
    <div className="flex items-center gap-3">
      <Skeleton width={40} height={40} circle />
      <div className="flex flex-col gap-2 flex-1">
        <Skeleton height={16} width="40%" />
        <Skeleton height={12} width="60%" />
      </div>
    </div>
    <SkeletonText lines={3} />
    <div className="flex gap-2 mt-1">
      <Skeleton height={32} width={80} rounded="lg" />
      <Skeleton height={32} width={80} rounded="lg" />
    </div>
  </div>
);

// ============================================================
// SKELETON TABLE ROW
// ============================================================

export const SkeletonTableRow: React.FC<{ columns?: number; className?: string }> = ({
  columns = 4,
  className,
}) => (
  <div
    className={cn(
      "flex items-center gap-4 px-4 py-3 border-b border-white/6",
      className
    )}
  >
    {Array.from({ length: columns }).map((_, i) => (
      <Skeleton
        key={i}
        height={14}
        width={i === 0 ? "30%" : "20%"}
        className="flex-1"
      />
    ))}
  </div>
);
