import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import { APP_NAME, APP_TAGLINE, ROUTES } from '../../lib/constants';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#09090b] flex">
      {/* ── Ambient Background ─────────────────────────────────────────────────── */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        {/* Top-left glow */}
        <div
          className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, #7c3aed 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        {/* Bottom-right glow */}
        <div
          className="absolute -bottom-40 -right-20 h-[500px] w-[500px] rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, #2563eb 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        {/* Center subtle glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[800px] w-[800px] rounded-full opacity-5"
          style={{
            background: 'radial-gradient(circle, #8b5cf6 0%, transparent 60%)',
            filter: 'blur(100px)',
          }}
        />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* ── Left Panel (Illustration) — hidden on mobile ────────────────────── */}
      <div className="hidden lg:flex lg:w-[45%] xl:w-[40%] flex-col justify-between p-12 relative">
        {/* Logo */}
        <Link to={ROUTES.HOME} className="flex items-center gap-3 group w-fit">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 shadow-lg shadow-violet-500/20"
          >
            <ShieldCheck className="h-5 w-5 text-white" />
          </motion.div>
          <span className="text-lg font-semibold text-white tracking-tight">{APP_NAME}</span>
        </Link>

        {/* Illustration */}
        <div className="flex-1 flex flex-col items-center justify-center py-12 relative">
          <AuthIllustration />
        </div>

        {/* Tagline */}
        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-widest text-violet-400">
            {APP_TAGLINE}
          </p>
          <p className="text-sm text-zinc-500 max-w-xs leading-relaxed">
            Advanced AI-powered fact verification. Trusted by researchers, journalists, and
            organizations worldwide.
          </p>
        </div>
      </div>

      {/* ── Right Panel (Form) ───────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-8 lg:p-12 relative z-10">
        {/* Mobile logo */}
        <div className="lg:hidden flex items-center gap-2.5 mb-8">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600">
            <ShieldCheck className="h-4 w-4 text-white" />
          </div>
          <span className="text-base font-semibold text-white">{APP_NAME}</span>
        </div>

        <div className="w-full max-w-[420px]">
          {children}
        </div>
      </div>
    </div>
  );
}

// ─── Auth Illustration ─────────────────────────────────────────────────────────

function AuthIllustration() {
  return (
    <div className="relative w-full max-w-sm">
      {/* Main card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative rounded-2xl p-6 overflow-hidden"
        style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          backdropFilter: 'blur(20px)',
        }}
      >
        {/* Card header */}
        <div className="flex items-center gap-2 mb-4">
          <div className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
          <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
          <div className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
          <div className="ml-auto flex items-center gap-1.5 text-xs text-zinc-500">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Live
          </div>
        </div>

        {/* Fact check items */}
        {factItems.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.15, duration: 0.5 }}
            className="flex items-start gap-3 mb-3 last:mb-0"
          >
            <div
              className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-[10px] font-bold"
              style={{
                background: item.verified
                  ? 'rgba(16, 185, 129, 0.15)'
                  : 'rgba(239, 68, 68, 0.15)',
                color: item.verified ? '#10b981' : '#ef4444',
              }}
            >
              {item.verified ? '✓' : '✗'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-zinc-300 leading-relaxed line-clamp-2">{item.claim}</p>
              <div className="mt-1 flex items-center gap-2">
                <div className="h-1 flex-1 rounded-full bg-zinc-800 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.confidence}%` }}
                    transition={{ delay: 0.6 + i * 0.15, duration: 0.8, ease: 'easeOut' }}
                    className="h-full rounded-full"
                    style={{
                      background: item.verified
                        ? 'linear-gradient(90deg, #10b981, #34d399)'
                        : 'linear-gradient(90deg, #ef4444, #f87171)',
                    }}
                  />
                </div>
                <span className="text-[10px] text-zinc-500">{item.confidence}%</span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Floating stat cards */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        className="absolute -top-4 -right-4 rounded-xl px-4 py-3 text-center"
        style={{
          background: 'rgba(139,92,246,0.15)',
          border: '1px solid rgba(139,92,246,0.3)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <p className="text-xl font-bold text-violet-300">99.2%</p>
        <p className="text-[10px] text-zinc-400">Accuracy</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.1, duration: 0.5 }}
        className="absolute -bottom-4 -left-4 rounded-xl px-4 py-3 text-center"
        style={{
          background: 'rgba(16,185,129,0.15)',
          border: '1px solid rgba(16,185,129,0.3)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <p className="text-xl font-bold text-emerald-300">2.4M+</p>
        <p className="text-[10px] text-zinc-400">Facts Checked</p>
      </motion.div>
    </div>
  );
}

const factItems = [
  {
    claim: 'Global temperatures have risen 1.1°C since pre-industrial era',
    verified: true,
    confidence: 97,
  },
  {
    claim: 'The moon landing was staged in a Hollywood studio',
    verified: false,
    confidence: 99,
  },
  {
    claim: 'Electric vehicles produce zero lifecycle emissions',
    verified: false,
    confidence: 78,
  },
];
