import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  UserCircle,
  Settings,
  HelpCircle,
  LogOut,
  ChevronDown,
  Shield,
  Zap,
} from "lucide-react";
import { cn } from "../../utils/cn";
import { useAuth } from "../../contexts/AuthContext";
import { Avatar } from "../ui/Avatar";

interface MenuItem {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  path?: string;
  action?: () => void;
  danger?: boolean;
  divider?: boolean;
}

export function UserMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

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

  const handleLogout = () => {
    setOpen(false);
    logout();
    navigate("/login");
  };

  const menuItems: MenuItem[] = [
    { label: "Profile", icon: UserCircle, path: "/profile" },
    { label: "Settings", icon: Settings, path: "/settings" },
    { label: "Help & Support", icon: HelpCircle, path: "/help", divider: true },
    { label: "Logout", icon: LogOut, action: handleLogout, danger: true },
  ];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "flex items-center gap-2 rounded-xl px-2.5 py-1.5 transition-all duration-200",
          "dark:hover:bg-slate-800 dark:border dark:border-slate-800",
          "hover:bg-slate-100 border border-slate-200",
          open && "dark:bg-slate-800 bg-slate-100"
        )}
        aria-expanded={open}
        aria-label="User menu"
      >
        <Avatar name={user?.name} size="sm" online />
        <div className="hidden md:flex flex-col items-start">
          <span className="text-xs font-semibold dark:text-white text-slate-900 leading-tight">
            {user?.name?.split(" ")[0]}
          </span>
          <span className="text-[10px] dark:text-slate-400 text-slate-500">
            Trust Score: {user?.trustScore}
          </span>
        </div>
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 dark:text-slate-400 text-slate-500 transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -8 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className={cn(
              "absolute right-0 top-12 z-50 w-64 overflow-hidden rounded-2xl shadow-2xl",
              "dark:bg-slate-900 dark:border dark:border-slate-700/60",
              "bg-white border border-slate-200"
            )}
          >
            {/* User info */}
            <div className="p-4 border-b dark:border-slate-800 border-slate-100">
              <div className="flex items-center gap-3">
                <Avatar name={user?.name} size="lg" online />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold dark:text-white text-slate-900 truncate">
                    {user?.name}
                  </p>
                  <p className="text-xs dark:text-slate-400 text-slate-500 truncate">
                    {user?.email}
                  </p>
                </div>
              </div>

              {/* Trust Score badge */}
              <div className="mt-3 flex items-center gap-2 rounded-xl dark:bg-slate-800/60 bg-slate-50 p-2.5 border dark:border-slate-700/40 border-slate-200">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/15">
                  <Shield className="h-3.5 w-3.5 text-emerald-400" />
                </div>
                <div>
                  <p className="text-[10px] dark:text-slate-400 text-slate-500 font-medium uppercase tracking-wide">
                    Trust Score
                  </p>
                  <p className="text-sm font-bold text-emerald-400">
                    {user?.trustScore} / 100
                  </p>
                </div>
                <div className="ml-auto flex items-center gap-1 rounded-full bg-violet-500/15 px-2 py-0.5">
                  <Zap className="h-2.5 w-2.5 text-violet-400" />
                  <span className="text-[10px] font-semibold text-violet-400">Pro</span>
                </div>
              </div>
            </div>

            {/* Menu items */}
            <div className="p-2">
              {menuItems.map((item, i) => {
                const Icon = item.icon;
                const content = (
                  <motion.button
                    key={i}
                    onClick={() => {
                      if (item.action) item.action();
                      else if (item.path) {
                        navigate(item.path);
                        setOpen(false);
                      }
                    }}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors text-left",
                      item.danger
                        ? "dark:text-rose-400 dark:hover:bg-rose-500/10 text-rose-500 hover:bg-rose-50"
                        : "dark:text-slate-300 dark:hover:bg-slate-800 text-slate-700 hover:bg-slate-100"
                    )}
                    whileHover={{ x: 2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </motion.button>
                );

                if (item.path) {
                  return (
                    <div key={i}>
                      {item.divider && (
                        <div className="my-1 h-px dark:bg-slate-800 bg-slate-100" />
                      )}
                      <Link to={item.path} onClick={() => setOpen(false)} className="block">
                        <motion.div
                          className={cn(
                            "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors",
                            "dark:text-slate-300 dark:hover:bg-slate-800 text-slate-700 hover:bg-slate-100"
                          )}
                          whileHover={{ x: 2 }}
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        >
                          <Icon className="h-4 w-4" />
                          {item.label}
                        </motion.div>
                      </Link>
                    </div>
                  );
                }

                return (
                  <div key={i}>
                    {item.divider && (
                      <div className="my-1 h-px dark:bg-slate-800 bg-slate-100" />
                    )}
                    {content}
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
