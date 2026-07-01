import { useLocation, Link } from "react-router-dom";
import { Menu, ScanLine, ChevronRight, Home } from "lucide-react";
import { cn } from "../../utils/cn";
import { GlobalSearch } from "./GlobalSearch";
import { NotificationDropdown } from "./NotificationDropdown";
import { ThemeToggle } from "./ThemeToggle";
import { UserMenu } from "./UserMenu";
import { Button } from "../ui/Button";

const ROUTE_META: Record<string, { label: string; parent?: string }> = {
  "/dashboard": { label: "Dashboard" },
  "/scan": { label: "Scan Center", parent: "Dashboard" },
  "/history": { label: "Scan History", parent: "Dashboard" },
  "/community": { label: "Community", parent: "Dashboard" },
  "/notifications": { label: "Notifications", parent: "Dashboard" },
  "/bookmarks": { label: "Bookmarks", parent: "Dashboard" },
  "/profile": { label: "Profile", parent: "Dashboard" },
  "/settings": { label: "Settings", parent: "Dashboard" },
  "/help": { label: "Help & Support", parent: "Dashboard" },
};

interface TopNavProps {
  onMobileMenuOpen: () => void;
}

export function TopNav({ onMobileMenuOpen }: TopNavProps) {
  const { pathname } = useLocation();
  const meta = ROUTE_META[pathname] ?? { label: "TruChek" };

  return (
    <header
      className={cn(
        "sticky top-0 z-20 flex h-16 flex-shrink-0 items-center gap-3 px-4 sm:px-6",
        "dark:bg-slate-950/90 bg-white/90",
        "dark:border-b dark:border-slate-800/60 border-b border-slate-200/60",
        "backdrop-blur-md"
      )}
    >
      {/* Mobile menu button */}
      <button
        onClick={onMobileMenuOpen}
        className={cn(
          "flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl transition-colors lg:hidden",
          "dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800",
          "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
        )}
        aria-label="Open navigation"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Breadcrumb + Title */}
      <div className="flex flex-1 items-center gap-2 min-w-0">
        {meta.parent ? (
          <nav
            className="hidden sm:flex items-center gap-1 text-sm"
            aria-label="Breadcrumb"
          >
            <Link
              to="/dashboard"
              className="flex items-center gap-1 dark:text-slate-500 dark:hover:text-slate-300 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <Home className="h-3.5 w-3.5" />
            </Link>
            <ChevronRight className="h-3.5 w-3.5 dark:text-slate-600 text-slate-300" />
            <span className="dark:text-slate-300 text-slate-700 font-medium truncate">
              {meta.label}
            </span>
          </nav>
        ) : (
          <div className="flex items-center gap-2">
            <h1 className="text-base font-semibold dark:text-white text-slate-900 truncate">
              {meta.label}
            </h1>
          </div>
        )}
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2">
        <GlobalSearch className="hidden sm:flex" />

        {/* Quick scan button */}
        <Button
          variant="primary"
          size="sm"
          icon={<ScanLine className="h-3.5 w-3.5" />}
          className="hidden md:inline-flex"
        >
          Quick Scan
        </Button>

        <div className="flex items-center gap-1.5">
          <ThemeToggle />
          <NotificationDropdown />
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
