import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import { Sidebar } from "./Sidebar";
import { TopNav } from "./TopNav";
import { cn } from "../../utils/cn";

export function DashboardLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    const stored = localStorage.getItem("truchek-sidebar-collapsed");
    return stored === "true";
  });
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed((c) => {
      localStorage.setItem("truchek-sidebar-collapsed", String(!c));
      return !c;
    });
  };

  const closeMobile = () => setMobileOpen(false);

  // Close mobile on resize
  useEffect(() => {
    const handler = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return (
    <div
      className={cn(
        "flex h-screen overflow-hidden",
        "dark:bg-slate-950 bg-slate-50"
      )}
    >
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={toggleSidebar}
        mobileOpen={mobileOpen}
        onMobileClose={closeMobile}
      />

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden min-w-0">
        <TopNav onMobileMenuOpen={() => setMobileOpen(true)} />

        <main
          className="flex-1 overflow-y-auto overflow-x-hidden"
          id="main-content"
        >
          <motion.div
            key="page"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="min-h-full"
          >
            <Outlet />
          </motion.div>
        </main>

        {/* Footer */}
        <footer
          className={cn(
            "flex-shrink-0 border-t px-6 py-3",
            "dark:border-slate-800/60 dark:bg-slate-950/80 dark:text-slate-600",
            "border-slate-200/60 bg-white/80 text-slate-400"
          )}
        >
          <div className="flex items-center justify-between text-xs">
            <span>
              © {new Date().getFullYear()} TruChek — Think. Check. Trust.
            </span>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="hover:dark:text-slate-400 hover:text-slate-600 transition-colors"
              >
                Privacy
              </a>
              <a
                href="#"
                className="hover:dark:text-slate-400 hover:text-slate-600 transition-colors"
              >
                Terms
              </a>
              <a
                href="#"
                className="hover:dark:text-slate-400 hover:text-slate-600 transition-colors"
              >
                Status
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
