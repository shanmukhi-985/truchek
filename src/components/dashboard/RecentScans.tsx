import { motion } from "framer-motion";
import { ExternalLink, FileText, QrCode, Link, ArrowRight } from "lucide-react";
import { Card, CardHeader, CardTitle } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { ScoreRing } from "../ui/ScoreRing";
import { RECENT_SCANS } from "../../data/dashboardData";
import { cn } from "../../utils/cn";

const TYPE_ICONS = {
  URL: Link,
  Text: FileText,
  QR: QrCode,
};

const STATUS_BADGE = {
  safe: "success" as const,
  threat: "danger" as const,
  warning: "warning" as const,
};

export function RecentScans() {
  return (
    <Card>
      <CardHeader>
        <CardTitle description="Your latest scanned items">
          Recent Scans
        </CardTitle>
        <button className="flex items-center gap-1 text-xs font-medium text-violet-400 hover:text-violet-300 transition-colors">
          View all <ArrowRight className="h-3 w-3" />
        </button>
      </CardHeader>
      <div className="space-y-0.5">
        {RECENT_SCANS.map((scan, i) => {
          const Icon = TYPE_ICONS[scan.type as keyof typeof TYPE_ICONS];
          return (
            <motion.div
              key={scan.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors group",
                "dark:hover:bg-slate-800/50 hover:bg-slate-50 cursor-pointer"
              )}
            >
              <div
                className={cn(
                  "flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg",
                  scan.status === "safe"
                    ? "bg-emerald-500/10 text-emerald-400"
                    : scan.status === "threat"
                    ? "bg-rose-500/10 text-rose-400"
                    : "bg-amber-500/10 text-amber-400"
                )}
              >
                <Icon className="h-3.5 w-3.5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="truncate text-xs font-medium dark:text-slate-200 text-slate-800">
                  {scan.target}
                </p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[11px] dark:text-slate-500 text-slate-400">
                    {scan.type} · {scan.time}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <ScoreRing score={scan.score} size="sm" />
                <Badge variant={STATUS_BADGE[scan.status]} size="sm">
                  {scan.status}
                </Badge>
                <ExternalLink className="h-3 w-3 dark:text-slate-600 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </Card>
  );
}
