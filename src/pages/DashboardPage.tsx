import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  LogOut,
  Search,
  TrendingUp,
  FileText,
  Bell,
  Settings,
  ChevronDown,
  BarChart3,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Zap,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { ROUTES, APP_NAME, APP_TAGLINE } from '../lib/constants';
import { AuthButton } from '../components/auth/AuthButton';

export function DashboardPage() {
  const { user, logout, isLoading } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate(ROUTES.LOGIN, { replace: true });
  };

  const initials = user?.full_name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || '??';

  return (
    <div className="min-h-screen bg-[#09090b] text-white">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div
          className="absolute -top-60 -left-60 h-[700px] w-[700px] rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, #7c3aed 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        <div
          className="absolute -bottom-40 right-0 h-[500px] w-[500px] rounded-full opacity-8"
          style={{
            background: 'radial-gradient(circle, #2563eb 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* ── Nav ──────────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-30 border-b border-white/[0.06] bg-[#09090b]/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600">
                <ShieldCheck className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm font-semibold text-white">{APP_NAME}</span>
            </div>

            {/* Nav links */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href="#"
                  className="px-3 py-1.5 rounded-lg text-sm text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.05] transition-all"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-2">
              <button className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.05] transition-all">
                <Bell className="h-4 w-4" />
              </button>
              <button className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.05] transition-all">
                <Settings className="h-4 w-4" />
              </button>

              {/* User menu */}
              <div className="relative">
                <button
                  onClick={() => setMenuOpen((v) => !v)}
                  className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-white/[0.05] transition-all"
                >
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 text-xs font-bold text-white">
                    {initials}
                  </div>
                  <span className="hidden sm:block text-sm text-zinc-300 max-w-[120px] truncate">
                    {user?.full_name}
                  </span>
                  <ChevronDown className={`h-3.5 w-3.5 text-zinc-500 transition-transform ${menuOpen ? 'rotate-180' : ''}`} />
                </button>

                {menuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className="absolute right-0 mt-2 w-52 rounded-xl overflow-hidden"
                    style={{
                      background: 'rgba(18,18,20,0.95)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      backdropFilter: 'blur(20px)',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
                    }}
                  >
                    <div className="p-3 border-b border-white/[0.06]">
                      <p className="text-sm font-medium text-white truncate">{user?.full_name}</p>
                      <p className="text-xs text-zinc-500 truncate">{user?.email}</p>
                      <span className="mt-2 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium bg-violet-500/10 text-violet-400">
                        {user?.role}
                      </span>
                    </div>
                    <div className="p-2">
                      <button
                        onClick={handleLogout}
                        disabled={isLoading}
                        className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-all"
                      >
                        <LogOut className="h-4 w-4" />
                        Sign out
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── Main Content ─────────────────────────────────────────────────────── */}
      <main className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        {/* Welcome banner */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div
            className="relative overflow-hidden rounded-2xl p-6 sm:p-8"
            style={{
              background: 'linear-gradient(135deg, rgba(124,58,237,0.12) 0%, rgba(79,70,229,0.08) 100%)',
              border: '1px solid rgba(124,58,237,0.2)',
            }}
          >
            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="text-sm text-violet-400 font-medium">{APP_TAGLINE}</p>
                <h1 className="mt-1 text-2xl sm:text-3xl font-bold text-white">
                  Welcome back, {user?.full_name?.split(' ')[0]}! 👋
                </h1>
                <p className="mt-1.5 text-sm text-zinc-400">
                  {user?.email_verified ? (
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                      Email verified
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-amber-400">
                      <AlertCircle className="h-3.5 w-3.5" />
                      Email not verified
                    </span>
                  )}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <AuthButton fullWidth={false} size="sm">
                  <Zap className="h-4 w-4" />
                  New check
                </AuthButton>
              </div>
            </div>

            {/* Decorative */}
            <div
              className="pointer-events-none absolute right-0 top-0 h-full w-1/3 opacity-20"
              style={{
                background: 'linear-gradient(135deg, transparent, rgba(139,92,246,0.4))',
              }}
            />
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.07 }}
              className="rounded-xl p-5"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-zinc-500 uppercase tracking-wider">{stat.label}</p>
                  <p className="mt-2 text-2xl font-bold text-white">{stat.value}</p>
                </div>
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-lg"
                  style={{ background: stat.iconBg }}
                >
                  <stat.icon className="h-4 w-4" style={{ color: stat.iconColor }} />
                </div>
              </div>
              <p className={`mt-3 text-xs flex items-center gap-1 ${stat.changePositive ? 'text-emerald-400' : 'text-red-400'}`}>
                <TrendingUp className="h-3 w-3" />
                {stat.change}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Search bar */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="relative"
        >
          <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2">
            <Search className="h-4 w-4 text-zinc-500" />
          </div>
          <input
            type="text"
            placeholder="Enter a claim to fact-check... e.g. 'The Earth is flat'"
            className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] py-3.5 pl-11 pr-4 text-sm text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-violet-500/50 focus:shadow-[0_0_0_3px_rgba(139,92,246,0.1)] transition-all"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <AuthButton fullWidth={false} size="sm">Check</AuthButton>
          </div>
        </motion.div>

        {/* Recent checks */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-2xl overflow-hidden"
          style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.07)',
          }}
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-violet-400" />
              <h2 className="text-sm font-medium text-white">Recent Fact Checks</h2>
            </div>
            <button className="text-xs text-violet-400 hover:text-violet-300 transition-colors">
              View all
            </button>
          </div>

          <div className="divide-y divide-white/[0.04]">
            {recentChecks.map((check, i) => (
              <motion.div
                key={check.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.06 }}
                className="flex items-start gap-4 px-6 py-4 hover:bg-white/[0.02] transition-colors cursor-pointer"
              >
                <div className="mt-0.5 flex-shrink-0">
                  {check.verdict === 'true' && <CheckCircle2 className="h-4 w-4 text-emerald-400" />}
                  {check.verdict === 'false' && <XCircle className="h-4 w-4 text-red-400" />}
                  {check.verdict === 'mixed' && <AlertCircle className="h-4 w-4 text-amber-400" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-zinc-200 line-clamp-1">{check.claim}</p>
                  <div className="mt-1 flex items-center gap-3">
                    <span className={`text-xs font-medium capitalize ${
                      check.verdict === 'true' ? 'text-emerald-400' :
                      check.verdict === 'false' ? 'text-red-400' : 'text-amber-400'
                    }`}>
                      {check.verdict === 'true' ? 'Verified' : check.verdict === 'false' ? 'False' : 'Mixed'}
                    </span>
                    <span className="text-xs text-zinc-600">{check.confidence}% confidence</span>
                    <span className="text-xs text-zinc-600">{check.time}</span>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <div className="h-1.5 w-16 rounded-full bg-white/[0.06] overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${check.confidence}%`,
                        background: check.verdict === 'true' ? '#10b981' :
                          check.verdict === 'false' ? '#ef4444' : '#f59e0b',
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Sign out button (bottom) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex justify-center pb-4"
        >
          <AuthButton
            variant="ghost"
            fullWidth={false}
            onClick={handleLogout}
            isLoading={isLoading}
            loadingText="Signing out..."
            size="sm"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </AuthButton>
        </motion.div>
      </main>
    </div>
  );
}

// ── Data ────────────────────────────────────────────────────────────────────────

const navLinks = [
  { label: 'Dashboard' },
  { label: 'My Checks' },
  { label: 'Analytics' },
  { label: 'Reports' },
];

const stats = [
  {
    label: 'Total Checks',
    value: '2,847',
    change: '+12% this week',
    changePositive: true,
    icon: Search,
    iconBg: 'rgba(139,92,246,0.12)',
    iconColor: '#a78bfa',
  },
  {
    label: 'Verified True',
    value: '1,234',
    change: '+8% this week',
    changePositive: true,
    icon: CheckCircle2,
    iconBg: 'rgba(16,185,129,0.12)',
    iconColor: '#34d399',
  },
  {
    label: 'Marked False',
    value: '891',
    change: '+3% this week',
    changePositive: false,
    icon: XCircle,
    iconBg: 'rgba(239,68,68,0.12)',
    iconColor: '#f87171',
  },
  {
    label: 'Reports',
    value: '47',
    change: '+5 this week',
    changePositive: true,
    icon: FileText,
    iconBg: 'rgba(59,130,246,0.12)',
    iconColor: '#60a5fa',
  },
];

const recentChecks = [
  { id: 1, claim: 'Global temperatures have risen 1.1°C since pre-industrial era', verdict: 'true', confidence: 97, time: '2 min ago' },
  { id: 2, claim: 'The moon landing was staged in a Hollywood studio', verdict: 'false', confidence: 99, time: '1 hr ago' },
  { id: 3, claim: 'Electric vehicles produce zero lifecycle emissions', verdict: 'mixed', confidence: 78, time: '3 hr ago' },
  { id: 4, claim: '5G networks cause health problems in humans', verdict: 'false', confidence: 95, time: '5 hr ago' },
  { id: 5, claim: 'Drinking 8 glasses of water daily is scientifically required', verdict: 'mixed', confidence: 61, time: 'Yesterday' },
];


