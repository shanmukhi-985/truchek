import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, Shield, ArrowRight, Mail, Lock } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "../../components/ui/Button";
import { cn } from "../../utils/cn";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch {
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen dark:bg-slate-950 bg-slate-50">
      {/* Left panel */}
      <div className="hidden lg:flex flex-col justify-between w-[45%] bg-gradient-to-br from-violet-950 via-slate-900 to-indigo-950 p-10 relative overflow-hidden">
        {/* Decorations */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-violet-600/20 blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 h-48 w-48 rounded-full bg-indigo-600/20 blur-3xl" />
        </div>

        <div className="relative flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 shadow-lg">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <div>
            <span className="text-base font-bold text-white">TruChek</span>
            <p className="text-[10px] text-slate-400">Think. Check. Trust.</p>
          </div>
        </div>

        <div className="relative">
          <blockquote className="text-3xl font-bold text-white leading-tight mb-6">
            "The internet is safer when we verify before we trust."
          </blockquote>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-violet-400 to-indigo-500 flex items-center justify-center text-white font-bold text-sm">
              TC
            </div>
            <div>
              <p className="text-sm font-medium text-white">TruChek Team</p>
              <p className="text-xs text-slate-400">Security Intelligence Platform</p>
            </div>
          </div>
        </div>

        <div className="relative flex gap-6">
          {[["12,847", "Scans Today"], ["3,291", "Threats Blocked"], ["94%", "Accuracy"]].map(([val, label]) => (
            <div key={label}>
              <p className="text-xl font-bold text-white">{val}</p>
              <p className="text-xs text-slate-400">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div className="flex flex-1 items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm"
        >
          {/* Logo on mobile */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 shadow-lg">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold dark:text-white text-slate-900">TruChek</span>
          </div>

          <div className="mb-8">
            <h1 className="text-2xl font-bold dark:text-white text-slate-900">
              Welcome back
            </h1>
            <p className="mt-1 text-sm dark:text-slate-400 text-slate-600">
              Sign in to your TruChek account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-xs font-medium dark:text-slate-300 text-slate-700 mb-1.5">
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 dark:text-slate-500 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className={cn(
                    "w-full rounded-xl border py-2.5 pl-9 pr-4 text-sm outline-none transition-all",
                    "dark:bg-slate-900/60 dark:border-slate-700/60 dark:text-white dark:placeholder-slate-500",
                    "dark:focus:border-violet-500 dark:focus:ring-1 dark:focus:ring-violet-500/30",
                    "bg-white border-slate-200 text-slate-900 placeholder-slate-400",
                    "focus:border-violet-500 focus:ring-1 focus:ring-violet-500/30"
                  )}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-medium dark:text-slate-300 text-slate-700">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs text-violet-400 hover:text-violet-300 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 dark:text-slate-500 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className={cn(
                    "w-full rounded-xl border py-2.5 pl-9 pr-10 text-sm outline-none transition-all",
                    "dark:bg-slate-900/60 dark:border-slate-700/60 dark:text-white dark:placeholder-slate-500",
                    "dark:focus:border-violet-500 dark:focus:ring-1 dark:focus:ring-violet-500/30",
                    "bg-white border-slate-200 text-slate-900 placeholder-slate-400",
                    "focus:border-violet-500 focus:ring-1 focus:ring-violet-500/30"
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 dark:text-slate-500 dark:hover:text-slate-300 text-slate-400 hover:text-slate-600 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs text-rose-400 bg-rose-500/10 rounded-lg px-3 py-2"
              >
                {error}
              </motion.p>
            )}

            <Button
              type="submit"
              variant="primary"
              fullWidth
              loading={isLoading}
              icon={<ArrowRight className="h-4 w-4" />}
              iconPosition="right"
            >
              Sign in
            </Button>
          </form>

          {/* Demo hint */}
          <div className="mt-4 rounded-xl border dark:border-slate-800 border-slate-200 dark:bg-slate-900/40 bg-slate-50 px-4 py-3">
            <p className="text-xs dark:text-slate-400 text-slate-500">
              <span className="font-medium dark:text-slate-300 text-slate-700">Demo:</span>{" "}
              Any email & password will sign you in for Phase 3 preview.
            </p>
          </div>

          <p className="mt-6 text-center text-sm dark:text-slate-500 text-slate-500">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-violet-400 hover:text-violet-300 transition-colors"
            >
              Sign up free
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
