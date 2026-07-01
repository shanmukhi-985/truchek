import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Clock, TrendingUp, Link, FileText, QrCode } from "lucide-react";
import { cn } from "../../utils/cn";

const RECENT_SEARCHES = [
  { id: "r1", query: "paypal.com", type: "URL" },
  { id: "r2", query: "IRS text scam 2024", type: "Text" },
  { id: "r3", query: "amazon delivery phishing", type: "Text" },
];

const TRENDING = [
  { id: "t1", query: "USPS package delivery scam" },
  { id: "t2", query: "Fake crypto investment" },
  { id: "t3", query: "Microsoft tech support fraud" },
];

interface GlobalSearchProps {
  className?: string;
}

export function GlobalSearch({ className }: GlobalSearchProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Keyboard shortcut Ctrl+K / Cmd+K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [open]);

  // Click outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <>
      {/* Trigger */}
      <button
        onClick={() => setOpen(true)}
        className={cn(
          "flex items-center gap-2 rounded-xl border px-3 py-2 transition-all duration-200",
          "dark:bg-slate-900/60 dark:border-slate-700/60 dark:text-slate-400 dark:hover:bg-slate-800/60 dark:hover:border-slate-600/60",
          "bg-slate-100 border-slate-200 text-slate-500 hover:bg-slate-200/60",
          "text-sm cursor-pointer",
          className
        )}
        aria-label="Open search (Ctrl+K)"
      >
        <Search className="h-4 w-4 flex-shrink-0" />
        <span className="hidden sm:inline text-sm">Search...</span>
        <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded-md border px-1.5 py-0.5 text-[10px] font-medium dark:border-slate-700 dark:bg-slate-800/60 border-slate-300 bg-white ml-2">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <div className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[15vh]">
              <motion.div
                ref={containerRef}
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className={cn(
                  "w-full max-w-xl overflow-hidden rounded-2xl shadow-2xl",
                  "dark:bg-slate-900 dark:border dark:border-slate-700/60",
                  "bg-white border border-slate-200"
                )}
              >
                {/* Input */}
                <div className="flex items-center gap-3 px-4 py-3.5 border-b dark:border-slate-800 border-slate-100">
                  <Search className="h-4 w-4 dark:text-slate-400 text-slate-500 flex-shrink-0" />
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search or paste a URL, text, or QR..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="flex-1 bg-transparent text-sm outline-none dark:text-white text-slate-900 dark:placeholder-slate-500 placeholder-slate-400"
                    aria-label="Global search"
                  />
                  {query && (
                    <button
                      onClick={() => setQuery("")}
                      className="dark:text-slate-500 dark:hover:text-slate-300 text-slate-400 hover:text-slate-600 transition-colors"
                      aria-label="Clear search"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                  <kbd className="hidden sm:flex items-center rounded border px-1.5 py-0.5 text-[10px] dark:border-slate-700 dark:text-slate-500 border-slate-200 text-slate-400">
                    ESC
                  </kbd>
                </div>

                {/* Content */}
                <div className="max-h-[360px] overflow-y-auto p-3 space-y-4">
                  {!query ? (
                    <>
                      {/* Recent */}
                      <div>
                        <p className="mb-1.5 px-2 text-[11px] font-semibold uppercase tracking-wider dark:text-slate-500 text-slate-400">
                          Recent Searches
                        </p>
                        <div className="space-y-0.5">
                          {RECENT_SEARCHES.map((item) => (
                            <button
                              key={item.id}
                              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm dark:text-slate-300 dark:hover:bg-slate-800 text-slate-700 hover:bg-slate-100 transition-colors text-left"
                            >
                              <Clock className="h-3.5 w-3.5 dark:text-slate-500 text-slate-400 flex-shrink-0" />
                              <span className="flex-1 truncate">{item.query}</span>
                              <span className="text-[11px] dark:text-slate-500 text-slate-400 rounded-full border dark:border-slate-700 border-slate-200 px-2 py-0.5">
                                {item.type}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Trending */}
                      <div>
                        <p className="mb-1.5 px-2 text-[11px] font-semibold uppercase tracking-wider dark:text-slate-500 text-slate-400">
                          Trending Threats
                        </p>
                        <div className="space-y-0.5">
                          {TRENDING.map((item) => (
                            <button
                              key={item.id}
                              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm dark:text-slate-300 dark:hover:bg-slate-800 text-slate-700 hover:bg-slate-100 transition-colors text-left"
                            >
                              <TrendingUp className="h-3.5 w-3.5 text-violet-400 flex-shrink-0" />
                              <span className="flex-1 truncate">{item.query}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Quick scan */}
                      <div>
                        <p className="mb-1.5 px-2 text-[11px] font-semibold uppercase tracking-wider dark:text-slate-500 text-slate-400">
                          Quick Scan
                        </p>
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            { icon: Link, label: "Scan URL" },
                            { icon: FileText, label: "Scan Text" },
                            { icon: QrCode, label: "Scan QR" },
                          ].map(({ icon: Icon, label }) => (
                            <button
                              key={label}
                              className="flex flex-col items-center gap-1.5 rounded-xl p-3 text-xs dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors border dark:border-slate-800 border-slate-200"
                            >
                              <Icon className="h-4 w-4" />
                              {label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8 gap-2">
                      <Search className="h-8 w-8 dark:text-slate-600 text-slate-300" />
                      <p className="text-sm dark:text-slate-400 text-slate-500">
                        Press Enter to scan: <strong className="dark:text-white text-slate-900">{query}</strong>
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
