import { motion } from "framer-motion";
import { Shield, Zap } from "lucide-react";
import { StatCards } from "../components/dashboard/StatCards";
import { ChartsGrid } from "../components/dashboard/Charts";
import { RecentScans } from "../components/dashboard/RecentScans";
import { ThreatAlerts } from "../components/dashboard/ThreatAlerts";
import { QuickActions } from "../components/dashboard/QuickActions";
import { RecentActivity } from "../components/dashboard/RecentActivity";
import { SecurityTips } from "../components/dashboard/SecurityTips";
import { CommunityUpdates } from "../components/dashboard/CommunityUpdates";
import { PopularScamTypes } from "../components/dashboard/PopularScamTypes";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "../components/ui/Button";
import { cn } from "../utils/cn";

export function DashboardPage() {
  const { user } = useAuth();
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto">
      {/* Hero Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={cn(
          "relative overflow-hidden rounded-2xl border px-6 py-6",
          "dark:bg-gradient-to-br dark:from-violet-950/60 dark:via-slate-900/80 dark:to-indigo-950/60 dark:border-violet-500/20",
          "bg-gradient-to-br from-violet-50 via-white to-indigo-50 border-violet-200/60",
          "shadow-lg shadow-violet-500/10"
        )}
      >
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-violet-500/10 blur-3xl" />
          <div className="absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-indigo-500/10 blur-3xl" />
        </div>

        <div className="relative flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 shadow-lg shadow-violet-500/30">
                <Shield className="h-4 w-4 text-white" />
              </div>
              <span className="text-xs font-medium dark:text-violet-300 text-violet-600 uppercase tracking-wider">
                Security Dashboard
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold dark:text-white text-slate-900">
              {greeting}, {user?.name?.split(" ")[0]}! 👋
            </h1>
            <p className="mt-1 text-sm dark:text-slate-400 text-slate-600">
              Your digital shield is active. Stay protected today.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <div className="rounded-xl border dark:bg-slate-900/60 dark:border-slate-700/60 bg-white/80 border-slate-200/60 px-4 py-2.5 text-center">
              <p className="text-[10px] uppercase tracking-wider dark:text-slate-500 text-slate-400 font-medium">
                Trust Score
              </p>
              <p className="text-xl font-bold text-emerald-400">{user?.trustScore}</p>
            </div>
            <Button
              variant="primary"
              size="md"
              icon={<Zap className="h-4 w-4" />}
            >
              Run Scan
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Stat Cards */}
      <StatCards />

      {/* Charts */}
      <section>
        <h2 className="mb-4 text-sm font-semibold dark:text-slate-200 text-slate-800">
          Analytics Overview
        </h2>
        <ChartsGrid />
      </section>

      {/* Main Grid */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Quick Actions - full width on mobile, 1 col on large */}
        <div className="lg:col-span-1">
          <QuickActions />
        </div>

        {/* Recent Scans - 2 cols on large */}
        <div className="lg:col-span-2">
          <RecentScans />
        </div>
      </div>

      {/* Second row */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
        <ThreatAlerts />
        <RecentActivity />
        <SecurityTips />
      </div>

      {/* Third row */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <CommunityUpdates />
        <PopularScamTypes />
      </div>
    </div>
  );
}
