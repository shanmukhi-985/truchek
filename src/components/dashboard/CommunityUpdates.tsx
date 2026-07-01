import { motion } from "framer-motion";
import { ThumbsUp, ArrowRight } from "lucide-react";
import { Card, CardHeader, CardTitle } from "../ui/Card";
import { Avatar } from "../ui/Avatar";
import { COMMUNITY_UPDATES } from "../../data/dashboardData";
import { cn } from "../../utils/cn";

export function CommunityUpdates() {
  return (
    <Card>
      <CardHeader>
        <CardTitle description="Community-powered threat reports">
          Community Updates
        </CardTitle>
        <button className="flex items-center gap-1 text-xs font-medium text-violet-400 hover:text-violet-300 transition-colors">
          View all <ArrowRight className="h-3 w-3" />
        </button>
      </CardHeader>
      <div className="space-y-0.5">
        {COMMUNITY_UPDATES.map((update, i) => (
          <motion.div
            key={update.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors",
              "dark:hover:bg-slate-800/50 hover:bg-slate-50 cursor-pointer"
            )}
          >
            <Avatar name={update.user} size="sm" />
            <div className="flex-1 min-w-0">
              <p className="text-xs dark:text-slate-300 text-slate-700">
                <span className="font-semibold dark:text-white text-slate-900">
                  {update.user}
                </span>{" "}
                {update.action}
              </p>
              <p className="truncate text-[11px] dark:text-slate-500 text-slate-400 mt-0.5">
                {update.target}
              </p>
            </div>
            <div className="flex flex-col items-end gap-1 flex-shrink-0">
              <div className="flex items-center gap-1 text-[11px] dark:text-slate-500 text-slate-400">
                <ThumbsUp className="h-3 w-3" />
                {update.upvotes}
              </div>
              <span className="text-[10px] dark:text-slate-600 text-slate-400">
                {update.time}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  );
}
