import { motion } from "framer-motion";
import {
  ScanLine,
  ShieldOff,
  Users,
  Star,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { cn } from "../../utils/cn";
import { STAT_CARDS } from "../../data/dashboardData";

const ICONS = {
  violet: { icon: ScanLine, bg: "bg-violet-500/15", color: "text-violet-400", ring: "ring-violet-500/20" },
  rose: { icon: ShieldOff, bg: "bg-rose-500/15", color: "text-rose-400", ring: "ring-rose-500/20" },
  amber: { icon: Users, bg: "bg-amber-500/15", color: "text-amber-400", ring: "ring-amber-500/20" },
  emerald: { icon: Star, bg: "bg-emerald-500/15", color: "text-emerald-400", ring: "ring-emerald-500/20" },
};

export function StatCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {STAT_CARDS.map((card, index) => {
        const config = ICONS[card.color as keyof typeof ICONS];
        const Icon = config.icon;
        return (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08, type: "spring" as const, stiffness: 300, damping: 25 }}
            whileHover={{ y: -3, scale: 1.01 }}
            className={cn(
              "relative overflow-hidden rounded-2xl border p-5",
              "dark:bg-slate-900/60 dark:border-slate-800/60",
              "bg-white border-slate-200/80 shadow-sm",
              "cursor-default"
            )}
          >
            {/* Background glow */}
            <div
              className={cn(
                "absolute -right-6 -top-6 h-20 w-20 rounded-full blur-2xl opacity-30",
                config.bg
              )}
            />

            <div className="relative flex items-start justify-between">
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-xl ring-1",
                  config.bg,
                  config.ring
                )}
              >
                <Icon className={cn("h-5 w-5", config.color)} />
              </div>
              <div
                className={cn(
                  "flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
                  card.trend === "up"
                    ? "bg-emerald-500/10 text-emerald-400"
                    : "bg-rose-500/10 text-rose-400"
                )}
              >
                {card.trend === "up" ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                {card.change}
              </div>
            </div>

            <div className="relative mt-4">
              <p className="text-2xl font-bold dark:text-white text-slate-900 tabular-nums">
                {card.value}
              </p>
              <p className="mt-0.5 text-sm font-medium dark:text-slate-300 text-slate-700">
                {card.label}
              </p>
              <p className="mt-0.5 text-xs dark:text-slate-500 text-slate-400">
                {card.description}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
