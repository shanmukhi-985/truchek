import { cn } from "../../utils/cn";

interface ScoreRingProps {
  score: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

export function ScoreRing({
  score,
  size = "md",
  showLabel = true,
  className,
}: ScoreRingProps) {
  const radius = size === "sm" ? 16 : size === "md" ? 22 : 32;
  const stroke = size === "sm" ? 3 : size === "md" ? 3.5 : 5;
  const svgSize = (radius + stroke) * 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const color =
    score >= 80
      ? "#10b981"
      : score >= 60
      ? "#f59e0b"
      : "#f43f5e";

  const textSizes = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-xl",
  };

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg
        width={svgSize}
        height={svgSize}
        viewBox={`0 0 ${svgSize} ${svgSize}`}
        className="-rotate-90"
      >
        <circle
          cx={svgSize / 2}
          cy={svgSize / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke}
          className="text-slate-700/40"
        />
        <circle
          cx={svgSize / 2}
          cy={svgSize / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.6s ease" }}
        />
      </svg>
      {showLabel && (
        <span
          className={cn(
            "absolute font-bold tabular-nums",
            textSizes[size]
          )}
          style={{ color }}
        >
          {score}
        </span>
      )}
    </div>
  );
}
