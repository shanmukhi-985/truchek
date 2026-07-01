import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, ShieldAlert, CheckCircle, Info, AlertTriangle, ChevronRight } from "lucide-react";
import { cn } from "../../utils/cn";
import { useNotifications } from "../../contexts/NotificationContext";

const TYPE_ICONS = {
  threat: { icon: ShieldAlert, color: "text-rose-400", bg: "bg-rose-500/15" },
  success: { icon: CheckCircle, color: "text-emerald-400", bg: "bg-emerald-500/15" },
  warning: { icon: AlertTriangle, color: "text-amber-400", bg: "bg-amber-500/15" },
  info: { icon: Info, color: "text-blue-400", bg: "bg-blue-500/15" },
};

export function NotificationDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "relative flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-200",
          "dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800 dark:border dark:border-slate-800",
          "text-slate-500 hover:text-slate-900 hover:bg-slate-100 border border-slate-200",
          open && "dark:bg-slate-800 dark:text-white bg-slate-100 text-slate-900"
        )}
        aria-label={`Notifications ${unreadCount > 0 ? `(${unreadCount} unread)` : ""}`}
        aria-expanded={open}
      >
        <Bell className="h-4 w-4" />
        {unreadCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-violet-600 text-[9px] font-bold text-white"
          >
            {unreadCount > 9 ? "9+" : unreadCount}
          </motion.span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -8 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className={cn(
              "absolute right-0 top-11 z-50 w-[360px] max-w-[calc(100vw-1rem)] overflow-hidden rounded-2xl shadow-2xl",
              "dark:bg-slate-900 dark:border dark:border-slate-700/60",
              "bg-white border border-slate-200"
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b dark:border-slate-800 border-slate-100">
              <div>
                <h3 className="text-sm font-semibold dark:text-white text-slate-900">
                  Notifications
                </h3>
                {unreadCount > 0 && (
                  <p className="text-xs dark:text-slate-400 text-slate-500">
                    {unreadCount} unread
                  </p>
                )}
              </div>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-xs font-medium text-violet-400 hover:text-violet-300 transition-colors"
                >
                  Mark all as read
                </button>
              )}
            </div>

            {/* List */}
            <div className="max-h-[380px] overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 gap-2">
                  <Bell className="h-8 w-8 dark:text-slate-700 text-slate-300" />
                  <p className="text-sm dark:text-slate-500 text-slate-400">No notifications</p>
                </div>
              ) : (
                <div className="p-2 space-y-0.5">
                  {notifications.map((notif) => {
                    const { icon: Icon, color, bg } = TYPE_ICONS[notif.type];
                    return (
                      <motion.button
                        key={notif.id}
                        onClick={() => markAsRead(notif.id)}
                        className={cn(
                          "flex w-full items-start gap-3 rounded-xl p-3 text-left transition-colors",
                          notif.read
                            ? "dark:hover:bg-slate-800/60 hover:bg-slate-50"
                            : "dark:bg-slate-800/40 bg-violet-50/60 dark:hover:bg-slate-800/60 hover:bg-violet-50"
                        )}
                        whileHover={{ x: 2 }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      >
                        <div className={cn("flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg", bg)}>
                          <Icon className={cn("h-4 w-4", color)} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start gap-2">
                            <p className={cn("text-xs font-semibold truncate flex-1", notif.read ? "dark:text-slate-300 text-slate-700" : "dark:text-white text-slate-900")}>
                              {notif.title}
                            </p>
                            {!notif.read && (
                              <span className="flex-shrink-0 h-1.5 w-1.5 rounded-full bg-violet-500 mt-1" />
                            )}
                          </div>
                          <p className="mt-0.5 text-xs dark:text-slate-400 text-slate-500 line-clamp-2">
                            {notif.message}
                          </p>
                          <p className="mt-1 text-[11px] dark:text-slate-600 text-slate-400">
                            {notif.time}
                          </p>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="border-t dark:border-slate-800 border-slate-100 px-4 py-3">
              <button className="flex w-full items-center justify-center gap-1.5 text-xs font-medium text-violet-400 hover:text-violet-300 transition-colors">
                View all notifications
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
