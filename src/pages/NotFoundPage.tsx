import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "../components/ui/Button";

export function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center dark:bg-slate-950 bg-slate-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        {/* 404 Number */}
        <div className="relative mb-6">
          <div className="text-[120px] font-black leading-none dark:text-slate-800/60 text-slate-200 select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-2xl shadow-violet-500/30">
              <span className="text-2xl">🛡️</span>
            </div>
          </div>
        </div>

        <h1 className="text-2xl font-bold dark:text-white text-slate-900 mb-2">
          Page not found
        </h1>
        <p className="text-sm dark:text-slate-400 text-slate-600 mb-8">
          The page you're looking for doesn't exist or has been moved. Let's get
          you back to safety.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/dashboard">
            <Button variant="primary" icon={<Home className="h-4 w-4" />}>
              Back to Dashboard
            </Button>
          </Link>
          <button onClick={() => window.history.back()}>
            <Button variant="secondary" icon={<ArrowLeft className="h-4 w-4" />}>
              Go Back
            </Button>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
