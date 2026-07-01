import { cn } from "../../utils/cn";

interface AvatarProps {
  src?: string | null;
  name?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
  online?: boolean;
}

const sizes = {
  xs: "h-6 w-6 text-xs",
  sm: "h-8 w-8 text-sm",
  md: "h-9 w-9 text-sm",
  lg: "h-10 w-10 text-base",
  xl: "h-16 w-16 text-xl",
};

const onlineSizes = {
  xs: "h-1.5 w-1.5 -bottom-0 -right-0",
  sm: "h-2 w-2 bottom-0 right-0",
  md: "h-2.5 w-2.5 bottom-0 right-0",
  lg: "h-3 w-3 bottom-0 right-0",
  xl: "h-3.5 w-3.5 bottom-0.5 right-0.5",
};

function getInitials(name?: string): string {
  if (!name) return "?";
  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function getGradient(name?: string): string {
  const gradients = [
    "from-violet-500 to-indigo-600",
    "from-rose-500 to-pink-600",
    "from-emerald-500 to-teal-600",
    "from-amber-500 to-orange-600",
    "from-blue-500 to-cyan-600",
    "from-fuchsia-500 to-purple-600",
  ];
  if (!name) return gradients[0];
  const idx = name.charCodeAt(0) % gradients.length;
  return gradients[idx];
}

export function Avatar({ src, name, size = "md", className, online }: AvatarProps) {
  return (
    <div className={cn("relative flex-shrink-0", className)}>
      {src ? (
        <img
          src={src}
          alt={name ?? "Avatar"}
          className={cn("rounded-full object-cover", sizes[size])}
        />
      ) : (
        <div
          className={cn(
            "flex items-center justify-center rounded-full font-semibold text-white",
            `bg-gradient-to-br ${getGradient(name)}`,
            sizes[size]
          )}
          aria-label={name ?? "User avatar"}
        >
          {getInitials(name)}
        </div>
      )}
      {online !== undefined && (
        <span
          className={cn(
            "absolute block rounded-full border-2 dark:border-slate-900 border-white",
            online ? "bg-emerald-400" : "bg-slate-500",
            onlineSizes[size]
          )}
        />
      )}
    </div>
  );
}
