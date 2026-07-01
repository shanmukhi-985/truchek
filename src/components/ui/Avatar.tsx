/**
 * TruChek — Avatar Component
 * User avatars with fallback initials and status indicators
 */

import React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cn } from "@/lib/utils";

// ============================================================
// TYPES
// ============================================================

interface AvatarProps {
  src?:          string;
  alt?:          string;
  name?:         string;
  size?:         "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  status?:       "online" | "offline" | "busy" | "away";
  className?:    string;
  fallbackClassName?: string;
}

// ============================================================
// SIZE MAP
// ============================================================

const sizeMap = {
  xs:  "w-6 h-6 text-xs",
  sm:  "w-8 h-8 text-xs",
  md:  "w-10 h-10 text-sm",
  lg:  "w-12 h-12 text-base",
  xl:  "w-16 h-16 text-lg",
  "2xl": "w-20 h-20 text-xl",
} as const;

const statusSizeMap = {
  xs:  "w-1.5 h-1.5 -bottom-px -right-px",
  sm:  "w-2 h-2 bottom-0 right-0",
  md:  "w-2.5 h-2.5 bottom-0 right-0",
  lg:  "w-3 h-3 bottom-0 right-0",
  xl:  "w-3.5 h-3.5 bottom-0.5 right-0.5",
  "2xl": "w-4 h-4 bottom-0.5 right-0.5",
} as const;

const statusColorMap = {
  online:  "bg-[#22c55e]",
  offline: "bg-[#475569]",
  busy:    "bg-[#f43f5e]",
  away:    "bg-[#f59e0b]",
} as const;

// ============================================================
// HELPERS
// ============================================================

const getInitials = (name: string): string => {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0]?.charAt(0).toUpperCase() ?? "?";
  return `${parts[0]?.charAt(0) ?? ""}${parts[parts.length - 1]?.charAt(0) ?? ""}`.toUpperCase();
};

const getAvatarColor = (name: string): string => {
  const colors = [
    "from-[#6366f1] to-[#4f46e5]",
    "from-[#8b5cf6] to-[#7c3aed]",
    "from-[#06b6d4] to-[#0891b2]",
    "from-[#22c55e] to-[#16a34a]",
    "from-[#f59e0b] to-[#d97706]",
    "from-[#f43f5e] to-[#e11d48]",
    "from-[#a78bfa] to-[#8b5cf6]",
  ];
  const index = name.charCodeAt(0) % colors.length;
  return colors[index] ?? colors[0]!;
};

// ============================================================
// COMPONENT
// ============================================================

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  name = "User",
  size = "md",
  status,
  className,
  fallbackClassName,
}) => {
  return (
    <div className="relative inline-flex shrink-0">
      <AvatarPrimitive.Root
        className={cn(
          "relative flex shrink-0 overflow-hidden rounded-full",
          sizeMap[size],
          className
        )}
      >
        <AvatarPrimitive.Image
          src={src}
          alt={alt ?? name}
          className="h-full w-full object-cover"
        />
        <AvatarPrimitive.Fallback
          className={cn(
            "flex h-full w-full items-center justify-center rounded-full",
            "bg-gradient-to-br",
            "text-white font-semibold",
            getAvatarColor(name),
            fallbackClassName
          )}
          delayMs={100}
        >
          {getInitials(name)}
        </AvatarPrimitive.Fallback>
      </AvatarPrimitive.Root>

      {/* Status indicator */}
      {status && (
        <span
          className={cn(
            "absolute rounded-full border-2 border-[#09090e]",
            statusSizeMap[size],
            statusColorMap[status]
          )}
          aria-label={`Status: ${status}`}
        />
      )}
    </div>
  );
};

// ============================================================
// AVATAR GROUP
// ============================================================

interface AvatarGroupProps {
  users:     { name: string; src?: string; alt?: string }[];
  max?:      number;
  size?:     AvatarProps["size"];
  className?: string;
}

export const AvatarGroup: React.FC<AvatarGroupProps> = ({
  users,
  max = 5,
  size = "sm",
  className,
}) => {
  const visible  = users.slice(0, max);
  const overflow = users.length - max;

  return (
    <div className={cn("flex items-center", className)}>
      {visible.map((user, i) => (
        <div
          key={i}
          className={cn(
            "-ml-2 first:ml-0",
            "ring-2 ring-[#09090e] rounded-full",
          )}
          style={{ zIndex: visible.length - i }}
        >
          <Avatar {...user} size={size} />
        </div>
      ))}

      {overflow > 0 && (
        <div
          className={cn(
            "-ml-2 ring-2 ring-[#09090e] rounded-full",
            "flex items-center justify-center",
            "bg-white/10 text-[#94a3b8] font-medium",
            sizeMap[size],
          )}
        >
          <span className="text-xs">+{overflow}</span>
        </div>
      )}
    </div>
  );
};
