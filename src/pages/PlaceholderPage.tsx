import { motion } from "framer-motion";
import {
  ScanLine,
  History,
  Users,
  Bell,
  Bookmark,
  UserCircle,
  Settings,
  HelpCircle,
  Wrench,
} from "lucide-react";
import { cn } from "../utils/cn";

const PAGE_CONFIG: Record<
  string,
  {
    icon: React.ComponentType<{ className?: string }>;
    color: string;
    bg: string;
    title: string;
    description: string;
    badge?: string;
  }
> = {
  scan: {
    icon: ScanLine,
    color: "text-violet-400",
    bg: "bg-violet-500/15",
    title: "Scan Center",
    description:
      "Detect phishing URLs, malicious text, suspicious QR codes, and more. Powered by AI threat intelligence.",
    badge: "Coming in Phase 4",
  },
  history: {
    icon: History,
    color: "text-blue-400",
    bg: "bg-blue-500/15",
    title: "Scan History",
    description:
      "Review all your past scans, view detailed threat reports, and track your security journey over time.",
    badge: "Coming in Phase 5",
  },
  community: {
    icon: Users,
    color: "text-emerald-400",
    bg: "bg-emerald-500/15",
    title: "Community",
    description:
      "Join thousands of users reporting and verifying threats. Collective intelligence makes everyone safer.",
    badge: "Coming in Phase 6",
  },
  notifications: {
    icon: Bell,
    color: "text-amber-400",
    bg: "bg-amber-500/15",
    title: "Notifications",
    description:
      "Stay informed with real-time threat alerts, scan results, and community activity notifications.",
    badge: "Coming Soon",
  },
  bookmarks: {
    icon: Bookmark,
    color: "text-pink-400",
    bg: "bg-pink-500/15",
    title: "Bookmarks",
    description:
      "Save important scan results, threat reports, and security tips for future reference.",
    badge: "Coming Soon",
  },
  profile: {
    icon: UserCircle,
    color: "text-indigo-400",
    bg: "bg-indigo-500/15",
    title: "Profile",
    description:
      "Manage your identity, reputation score, contribution history, and connected devices.",
    badge: "Coming Soon",
  },
  settings: {
    icon: Settings,
    color: "text-slate-400",
    bg: "bg-slate-500/15",
    title: "Settings",
    description:
      "Customize your security preferences, notification settings, privacy options, and API keys.",
    badge: "Coming Soon",
  },
  help: {
    icon: HelpCircle,
    color: "text-teal-400",
    bg: "bg-teal-500/15",
    title: "Help & Support",
    description:
      "Find answers to common questions, explore tutorials, and contact our support team.",
    badge: "Coming Soon",
  },
};

interface PlaceholderPageProps {
  page: keyof typeof PAGE_CONFIG;
}

export function PlaceholderPage({ page }: PlaceholderPageProps) {
  const config = PAGE_CONFIG[page] ?? {
    icon: Wrench,
    color: "text-slate-400",
    bg: "bg-slate-500/15",
    title: "Coming Soon",
    description: "This page is under construction.",
  };

  const Icon = config.icon;

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="flex flex-col items-center text-center max-w-md"
      >
        {/* Icon */}
        <motion.div
          initial={{ y: 10 }}
          animate={{ y: 0 }}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: 2.5,
            ease: "easeInOut",
          }}
          className={cn(
            "flex h-20 w-20 items-center justify-center rounded-2xl shadow-2xl mb-6",
            config.bg
          )}
        >
          <Icon className={cn("h-10 w-10", config.color)} />
        </motion.div>

        {/* Badge */}
        {config.badge && (
          <span className="mb-4 inline-flex items-center rounded-full border dark:border-violet-500/30 border-violet-200 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-400">
            🚧 {config.badge}
          </span>
        )}

        <h1 className="text-2xl font-bold dark:text-white text-slate-900 mb-3">
          {config.title}
        </h1>
        <p className="text-sm dark:text-slate-400 text-slate-600 leading-relaxed">
          {config.description}
        </p>

        {/* Decorative dots */}
        <div className="mt-8 flex gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="h-2 w-2 rounded-full bg-violet-500/40"
              animate={{ scale: [1, 1.3, 1], opacity: [0.4, 1, 0.4] }}
              transition={{
                repeat: Infinity,
                duration: 1.2,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
