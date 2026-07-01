import { useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  ScanLine,
  History,
  Users,
  Bell,
  Bookmark,
  UserCircle,
  Settings,
  HelpCircle,
  LogOut,
  ChevronLeft,
  Shield,
  X,
} from "lucide-react";
import { cn } from "../../utils/cn";
import { useAuth } from "../../contexts/AuthContext";
import { useNotifications } from "../../contexts/NotificationContext";
import { Avatar } from "../ui/Avatar";
import { Tooltip } from "../ui/Tooltip";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard,
  ScanLine,
  History,
  Users,
  Bell,
  Bookmark,
  UserCircle,
  Settings,
  HelpCircle,
};

interface NavItem {
  id: string;
  label: string;
  path: string;
  icon: string;
  badge?: number | string;
  dividerAfter?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { id: "dashboard", label: "Dashboard", path: "/dashboard", icon: "LayoutDashboard" },
  { id: "scan", label: "Scan Center", path: "/scan", icon: "ScanLine", badge: "New" },
  { id: "history", label: "Scan History", path: "/history", icon: "History" },
  { id: "community", label: "Community", path: "/community", icon: "Users", badge: 3, dividerAfter: true },
  { id: "notifications", label: "Notifications", path: "/notifications", icon: "Bell" },
  { id: "bookmarks", label: "Bookmarks", path: "/bookmarks", icon: "Bookmark", dividerAfter: true },
  { id: "profile", label: "Profile", path: "/profile", icon: "UserCircle" },
  { id: "settings", label: "Settings", path: "/settings", icon: "Settings", dividerAfter: true },
  { id: "help", label: "Help & Support", path: "/help", icon: "HelpCircle" },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

function SidebarContent({
  collapsed,
  onToggle,
  onMobileClose,
  isMobile = false,
}: {
  collapsed: boolean;
  onToggle: () => void;
  onMobileClose: () => void;
  isMobile?: boolean;
}) {
  const { user, logout } = useAuth();
  const { unreadCount } = useNotifications();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div
        className={cn(
          "flex h-16 flex-shrink-0 items-center border-b dark:border-slate-800/60 border-slate-200/60",
          collapsed && !isMobile ? "justify-center px-4" : "justify-between px-5"
        )}
      >
        <NavLink
          to="/dashboard"
          className="flex items-center gap-2.5 group"
          onClick={isMobile ? onMobileClose : undefined}
        >
          <div className="relative flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 shadow-lg shadow-violet-500/30 group-hover:shadow-violet-500/50 transition-shadow">
            <Shield className="h-4 w-4 text-white" />
          </div>
          <AnimatePresence>
            {(!collapsed || isMobile) && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="flex flex-col leading-none">
                  <span className="text-sm font-bold dark:text-white text-slate-900 tracking-tight">
                    TruChek
                  </span>
                  <span className="text-[10px] dark:text-slate-400 text-slate-500 font-medium">
                    Think. Check. Trust.
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </NavLink>

        {isMobile ? (
          <button
            onClick={onMobileClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800 text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            aria-label="Close sidebar"
          >
            <X className="h-4 w-4" />
          </button>
        ) : (
          <button
            onClick={onToggle}
            className={cn(
              "flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg transition-colors",
              "dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800",
              "text-slate-500 hover:text-slate-900 hover:bg-slate-100",
              collapsed && "rotate-180"
            )}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <ChevronLeft className="h-4 w-4 transition-transform duration-300" />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav
        className="flex-1 overflow-y-auto overflow-x-hidden py-4 no-scrollbar"
        aria-label="Main navigation"
      >
        <div className="space-y-0.5 px-3">
          {NAV_ITEMS.map((item) => {
            const Icon = ICON_MAP[item.icon];
            const badgeCount =
              item.id === "notifications" ? unreadCount : item.badge;

            return (
              <div key={item.id}>
                {collapsed && !isMobile ? (
                  <Tooltip content={item.label} side="right">
                    <NavLink
                      to={item.path}
                      onClick={isMobile ? onMobileClose : undefined}
                      className={({ isActive }) =>
                        cn(
                          "relative flex h-10 w-full items-center justify-center rounded-xl transition-all duration-200 group",
                          isActive
                            ? "bg-violet-600/15 text-violet-400"
                            : "dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800/70 text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                        )
                      }
                      aria-label={item.label}
                    >
                      {({ isActive }) => (
                        <>
                          {isActive && (
                            <span className="absolute left-0 top-1/2 h-4 w-0.5 -translate-y-1/2 rounded-full bg-violet-500" />
                          )}
                          <Icon className="h-5 w-5 flex-shrink-0" />
                          {badgeCount !== undefined && badgeCount !== 0 && (
                            <span className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-violet-600 text-[9px] font-bold text-white">
                              {typeof badgeCount === "number" && badgeCount > 9
                                ? "9+"
                                : badgeCount}
                            </span>
                          )}
                        </>
                      )}
                    </NavLink>
                  </Tooltip>
                ) : (
                  <NavLink
                    to={item.path}
                    onClick={isMobile ? onMobileClose : undefined}
                    className={({ isActive }) =>
                      cn(
                        "relative flex h-10 w-full items-center gap-3 rounded-xl px-3 transition-all duration-200",
                        isActive
                          ? "bg-violet-600/15 text-violet-400 font-medium"
                          : "dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800/70 text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                      )
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {isActive && (
                          <span className="absolute left-0 top-1/2 h-4 w-0.5 -translate-y-1/2 rounded-full bg-violet-500" />
                        )}
                        <Icon className="h-4.5 w-4.5 flex-shrink-0" />
                        <span className="truncate text-sm">{item.label}</span>
                        {badgeCount !== undefined && badgeCount !== 0 && (
                          <span
                            className={cn(
                              "ml-auto flex-shrink-0 rounded-full px-1.5 py-0.5 text-[10px] font-bold leading-none",
                              typeof badgeCount === "string"
                                ? "bg-violet-600/20 text-violet-400"
                                : "bg-violet-600 text-white min-w-[18px] text-center"
                            )}
                          >
                            {typeof badgeCount === "number" && badgeCount > 99
                              ? "99+"
                              : badgeCount}
                          </span>
                        )}
                      </>
                    )}
                  </NavLink>
                )}
                {item.dividerAfter && (
                  <div className="my-2 mx-2 h-px dark:bg-slate-800/60 bg-slate-200/60" />
                )}
              </div>
            );
          })}
        </div>
      </nav>

      {/* User footer */}
      <div className="flex-shrink-0 border-t dark:border-slate-800/60 border-slate-200/60 p-3">
        {collapsed && !isMobile ? (
          <Tooltip content="Logout" side="right">
            <button
              onClick={handleLogout}
              className="flex h-10 w-full items-center justify-center rounded-xl dark:text-slate-400 dark:hover:text-rose-400 dark:hover:bg-rose-500/10 text-slate-500 hover:text-rose-500 hover:bg-rose-50 transition-colors"
              aria-label="Logout"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </Tooltip>
        ) : (
          <div className="flex items-center gap-3">
            <Avatar name={user?.name} size="sm" online />
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-xs font-semibold dark:text-slate-200 text-slate-800">
                {user?.name}
              </p>
              <p className="truncate text-[11px] dark:text-slate-500 text-slate-400">
                {user?.email}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg dark:text-slate-400 dark:hover:text-rose-400 dark:hover:bg-rose-500/10 text-slate-500 hover:text-rose-500 hover:bg-rose-50 transition-colors"
              aria-label="Logout"
              title="Logout"
            >
              <LogOut className="h-3.5 w-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export function Sidebar({
  collapsed,
  onToggle,
  mobileOpen,
  onMobileClose,
}: SidebarProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileOpen) onMobileClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [mobileOpen, onMobileClose]);

  return (
    <>
      {/* Desktop sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 72 : 260 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={cn(
          "hidden lg:flex flex-col flex-shrink-0 h-screen sticky top-0 z-30",
          "dark:bg-slate-950/95 bg-white/95",
          "dark:border-r dark:border-slate-800/60 border-r border-slate-200/60",
          "overflow-hidden"
        )}
      >
        <SidebarContent
          collapsed={collapsed}
          onToggle={onToggle}
          onMobileClose={onMobileClose}
        />
      </motion.aside>

      {/* Mobile backdrop */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            ref={overlayRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={onMobileClose}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={cn(
              "fixed inset-y-0 left-0 z-50 w-[260px] flex flex-col lg:hidden",
              "dark:bg-slate-950 bg-white",
              "dark:border-r dark:border-slate-800/60 border-r border-slate-200/60"
            )}
            aria-label="Mobile navigation"
          >
            <SidebarContent
              collapsed={false}
              onToggle={onToggle}
              onMobileClose={onMobileClose}
              isMobile
            />
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
