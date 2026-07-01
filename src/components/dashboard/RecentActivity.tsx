import { motion } from "framer-motion";
import { ShieldAlert, CheckCircle, Info, ArrowRight } from "lucide-react";
import { Card, CardHeader, CardTitle } from "../ui/Card";
import { RECENT_ACTIVITY } from "../../data/dashboardData";
import { cn } from "../../utils/cn";

const TYPE_CONFIG = {
  threat: { icon: ShieldAlert, color: "text-rose-400", bg: "bg-rose-500/15" },
  success: { icon: CheckCircle, color: "text-emerald-400", bg: "bg-emerald-500/15" },
  info: { icon: Info, color: "text-blue-400", bg: "bg-blue-500/15" },
  warning: { icon: ShieldAlert, color: "text-amber-400", bg: "bg-amber-500/15" },
};

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle description="Latest actions on your account">
          Recent Activity
        </CardTitle>
        <button className="flex items-center gap-1 text-xs font-medium text-violet-400 hover:text-violet-300 transition-colors">
          See all <ArrowRight className="h-3 w-3" />
        </button>
      </CardHeader>
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-[19px] top-2 bottom-2 w-px dark:bg-slate-800 bg-slate-200" />

        <div className="space-y-1">
          {RECENT_ACTIVITY.map((item, i) => {
            const config = TYPE_CONFIG[item.type as keyof typeof TYPE_CONFIG];
            const Icon = config.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                className="flex items-start gap-3 relative pl-1"
              >
                <div
                  className={cn(
                    "flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl ring-2 ring-offset-2",
                    "dark:ring-offset-slate-900/60 ring-offset-white",
                    "dark:ring-slate-800 ring-slate-200",
                    config.bg
                  )}
                >
                  <Icon className={cn("h-4 w-4", config.color)} />
                </div>
                <div className="flex-1 pb-4 min-w-0">
                  <p className="text-xs font-semibold dark:text-slate-200 text-slate-800">
                    {item.action}
                  </p>
                  <p className="mt-0.5 text-xs dark:text-slate-400 text-slate-500 truncate">
                    {item.detail}
                  </p>
                  <p className="mt-1 text-[11px] dark:text-slate-600 text-slate-400">
                    {item.time}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}
