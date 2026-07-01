import { motion } from "framer-motion";
import { ShieldAlert, Users, ArrowRight } from "lucide-react";
import { Card, CardHeader, CardTitle } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { THREAT_ALERTS } from "../../data/dashboardData";
import { cn } from "../../utils/cn";

const SEVERITY_CONFIG = {
  critical: { badge: "danger" as const, dot: "bg-rose-500", glow: "shadow-rose-500/20" },
  high: { badge: "warning" as const, dot: "bg-amber-500", glow: "shadow-amber-500/20" },
  medium: { badge: "info" as const, dot: "bg-blue-500", glow: "shadow-blue-500/20" },
  low: { badge: "default" as const, dot: "bg-slate-500", glow: "" },
};

export function ThreatAlerts() {
  return (
    <Card>
      <CardHeader>
        <CardTitle description="Active threat intelligence">
          Latest Threat Alerts
        </CardTitle>
        <button className="flex items-center gap-1 text-xs font-medium text-violet-400 hover:text-violet-300 transition-colors">
          View all <ArrowRight className="h-3 w-3" />
        </button>
      </CardHeader>
      <div className="space-y-3">
        {THREAT_ALERTS.map((alert, i) => {
          const config = SEVERITY_CONFIG[alert.severity];
          return (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className={cn(
                "flex gap-3 rounded-xl border p-3.5 transition-all duration-200",
                "dark:border-slate-800/60 border-slate-200/60",
                "dark:hover:border-slate-700/60 hover:border-slate-300/60",
                "dark:bg-slate-800/20 bg-slate-50/50",
                "cursor-pointer"
              )}
            >
              <div className="flex-shrink-0 pt-0.5">
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-lg shadow-lg",
                    alert.severity === "critical"
                      ? "bg-rose-500/20"
                      : alert.severity === "high"
                      ? "bg-amber-500/20"
                      : "bg-blue-500/20",
                    config.glow
                  )}
                >
                  <ShieldAlert
                    className={cn(
                      "h-4 w-4",
                      alert.severity === "critical"
                        ? "text-rose-400"
                        : alert.severity === "high"
                        ? "text-amber-400"
                        : "text-blue-400"
                    )}
                  />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start gap-2 flex-wrap">
                  <p className="text-xs font-semibold dark:text-slate-100 text-slate-900 flex-1">
                    {alert.title}
                  </p>
                  <Badge variant={config.badge} size="sm" dot>
                    {alert.severity}
                  </Badge>
                </div>
                <p className="mt-1 text-xs dark:text-slate-400 text-slate-500 line-clamp-2">
                  {alert.description}
                </p>
                <div className="mt-2 flex items-center gap-3 text-[11px] dark:text-slate-500 text-slate-400">
                  <span className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {alert.reports.toLocaleString()} reports
                  </span>
                  <span>·</span>
                  <span>{alert.time}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </Card>
  );
}
