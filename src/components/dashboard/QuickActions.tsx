import { motion } from "framer-motion";
import {
  FileText,
  Link,
  QrCode,
  ImageIcon,
  Flag,
  History,
  ArrowRight,
} from "lucide-react";
import { Card, CardHeader, CardTitle } from "../ui/Card";
import { cn } from "../../utils/cn";

const ACTIONS = [
  {
    id: "scan-text",
    label: "Scan Text",
    description: "Paste any suspicious message",
    icon: FileText,
    color: "violet",
    bg: "bg-violet-500/15",
    iconColor: "text-violet-400",
    ring: "ring-violet-500/20",
    hoverBg: "hover:bg-violet-500/20",
  },
  {
    id: "scan-url",
    label: "Scan URL",
    description: "Check any link or website",
    icon: Link,
    color: "blue",
    bg: "bg-blue-500/15",
    iconColor: "text-blue-400",
    ring: "ring-blue-500/20",
    hoverBg: "hover:bg-blue-500/20",
  },
  {
    id: "scan-qr",
    label: "Scan QR",
    description: "Decode and verify QR codes",
    icon: QrCode,
    color: "emerald",
    bg: "bg-emerald-500/15",
    iconColor: "text-emerald-400",
    ring: "ring-emerald-500/20",
    hoverBg: "hover:bg-emerald-500/20",
  },
  {
    id: "upload-image",
    label: "Upload Image",
    description: "Scan screenshots & photos",
    icon: ImageIcon,
    color: "amber",
    bg: "bg-amber-500/15",
    iconColor: "text-amber-400",
    ring: "ring-amber-500/20",
    hoverBg: "hover:bg-amber-500/20",
  },
  {
    id: "community",
    label: "Community Reports",
    description: "View crowd-sourced threats",
    icon: Flag,
    color: "rose",
    bg: "bg-rose-500/15",
    iconColor: "text-rose-400",
    ring: "ring-rose-500/20",
    hoverBg: "hover:bg-rose-500/20",
  },
  {
    id: "history",
    label: "View History",
    description: "Browse your past scans",
    icon: History,
    color: "slate",
    bg: "bg-slate-500/15",
    iconColor: "text-slate-400",
    ring: "ring-slate-500/20",
    hoverBg: "hover:bg-slate-500/20",
  },
];

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle description="Jump to common tasks">
          Quick Actions
        </CardTitle>
      </CardHeader>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {ACTIONS.map((action, i) => {
          const Icon = action.icon;
          return (
            <motion.button
              key={action.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className={cn(
                "group flex flex-col items-start gap-2.5 rounded-xl border p-3.5 text-left transition-all duration-200",
                "dark:border-slate-800/60 border-slate-200/60",
                "dark:bg-slate-800/30 bg-slate-50",
                "dark:hover:border-slate-700 hover:border-slate-300",
                "cursor-pointer"
              )}
              aria-label={action.label}
            >
              <div
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-xl ring-1 transition-colors",
                  action.bg,
                  action.ring,
                  action.hoverBg
                )}
              >
                <Icon className={cn("h-4.5 w-4.5", action.iconColor)} />
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <p className="text-xs font-semibold dark:text-slate-200 text-slate-800">
                    {action.label}
                  </p>
                  <ArrowRight className="h-2.5 w-2.5 dark:text-slate-600 text-slate-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-150" />
                </div>
                <p className="mt-0.5 text-[11px] dark:text-slate-500 text-slate-500 leading-tight">
                  {action.description}
                </p>
              </div>
            </motion.button>
          );
        })}
      </div>
    </Card>
  );
}
