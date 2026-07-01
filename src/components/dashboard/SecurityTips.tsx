import { motion } from "framer-motion";
import { Link, KeyRound, Mail, Lightbulb } from "lucide-react";
import { Card, CardHeader, CardTitle } from "../ui/Card";
import { SECURITY_TIPS } from "../../data/dashboardData";
import { cn } from "../../utils/cn";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Link,
  KeyRound,
  Mail,
};

const CATEGORY_COLORS: Record<string, string> = {
  URLs: "text-violet-400 bg-violet-500/10",
  Passwords: "text-emerald-400 bg-emerald-500/10",
  Email: "text-blue-400 bg-blue-500/10",
};

export function SecurityTips() {
  return (
    <Card>
      <CardHeader>
        <CardTitle description="Stay safe with expert guidance">
          Security Tips
        </CardTitle>
        <Lightbulb className="h-4 w-4 text-amber-400" />
      </CardHeader>
      <div className="space-y-3">
        {SECURITY_TIPS.map((tip, i) => {
          const Icon = ICON_MAP[tip.icon] ?? Link;
          const catColor = CATEGORY_COLORS[tip.category] ?? "text-slate-400 bg-slate-500/10";
          return (
            <motion.div
              key={tip.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className={cn(
                "flex gap-3 rounded-xl border p-3.5",
                "dark:border-slate-800/60 border-slate-200/60",
                "dark:bg-slate-800/20 bg-slate-50/50",
                "hover:dark:border-slate-700/60 hover:border-slate-300/60 transition-colors"
              )}
            >
              <div className={cn("flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg", catColor.split(" ")[1])}>
                <Icon className={cn("h-4 w-4", catColor.split(" ")[0])} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-xs font-semibold dark:text-slate-200 text-slate-800">
                    {tip.title}
                  </p>
                  <span className={cn("ml-auto text-[10px] font-medium rounded-full px-2 py-0.5", catColor)}>
                    {tip.category}
                  </span>
                </div>
                <p className="mt-1 text-xs dark:text-slate-400 text-slate-500 leading-relaxed">
                  {tip.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </Card>
  );
}
