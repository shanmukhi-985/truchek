import { motion } from "framer-motion";
import {
  Mail,
  ShoppingCart,
  Heart,
  Monitor,
  TrendingUp,
  TrendingDown,
  Minus,
} from "lucide-react";
import { Card, CardHeader, CardTitle } from "../ui/Card";
import { POPULAR_SCAM_TYPES } from "../../data/dashboardData";
import { cn } from "../../utils/cn";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Mail,
  ShoppingCart,
  Heart,
  Monitor,
  TrendingUp,
};

const TREND_ICON = {
  up: TrendingUp,
  down: TrendingDown,
  stable: Minus,
};

const TREND_COLOR = {
  up: "text-rose-400",
  down: "text-emerald-400",
  stable: "text-slate-400",
};

export function PopularScamTypes() {
  return (
    <Card>
      <CardHeader>
        <CardTitle description="Most reported scam categories">
          Popular Scam Types
        </CardTitle>
      </CardHeader>
      <div className="space-y-2.5">
        {POPULAR_SCAM_TYPES.map((scam, i) => {
          const Icon = ICON_MAP[scam.icon] ?? Mail;
          const TrendIcon = TREND_ICON[scam.trend];
          const percentage = parseInt(scam.count);
          return (
            <motion.div
              key={scam.name}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              className="flex items-center gap-3"
            >
              <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg dark:bg-slate-800 bg-slate-100">
                <Icon className="h-3.5 w-3.5 dark:text-slate-400 text-slate-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium dark:text-slate-300 text-slate-700 truncate">
                    {scam.name}
                  </span>
                  <div className="flex items-center gap-1 flex-shrink-0 ml-2">
                    <TrendIcon className={cn("h-3 w-3", TREND_COLOR[scam.trend])} />
                    <span className="text-xs font-bold dark:text-slate-200 text-slate-800">
                      {scam.count}
                    </span>
                  </div>
                </div>
                <div className="h-1.5 w-full rounded-full dark:bg-slate-800 bg-slate-200 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ delay: i * 0.06 + 0.2, duration: 0.6, ease: "easeOut" }}
                    className="h-full rounded-full bg-gradient-to-r from-violet-600 to-indigo-500"
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </Card>
  );
}
