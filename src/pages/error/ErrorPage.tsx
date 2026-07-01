/**
 * TruChek — 500 Server Error Page
 */

import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Home, RefreshCw, AlertTriangle } from "lucide-react";
import { TruChekLogo } from "@/components/common/TruChekLogo";
import { Button } from "@/components/ui/Button";
import { fadeInUpVariants } from "@/lib/animations";

interface ErrorPageProps {
  error?:   Error | null;
  reset?:   () => void;
}

export const ErrorPage: React.FC<ErrorPageProps> = ({ error, reset }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#09090e] flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(244,63,94,0.05) 0%, transparent 70%)",
        }}
      />

      <motion.div
        className="relative z-10 flex flex-col items-center text-center max-w-lg"
        variants={fadeInUpVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Logo */}
        <div className="mb-10">
          <TruChekLogo size="md" />
        </div>

        {/* Icon */}
        <div className="w-16 h-16 rounded-2xl bg-[rgba(244,63,94,0.1)] border border-[rgba(244,63,94,0.2)] flex items-center justify-center mb-6">
          <AlertTriangle className="w-7 h-7 text-[#f43f5e]" />
        </div>

        {/* Content */}
        <h1 className="font-display text-2xl font-bold text-[#f1f5f9] mb-3 tracking-tight">
          Something went wrong
        </h1>
        <p className="text-[#94a3b8] text-base leading-relaxed mb-4 max-w-sm">
          An unexpected error occurred. Our team has been notified.
          Please try again or return home.
        </p>

        {/* Error details (dev) */}
        {error && (
          <div className="w-full max-w-sm mb-6 p-3 rounded-lg bg-[rgba(244,63,94,0.06)] border border-[rgba(244,63,94,0.15)] text-left">
            <p className="text-xs font-mono text-[#fb7185] truncate">
              {error.message}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-3">
          {reset && (
            <Button
              variant="outline"
              leftIcon={<RefreshCw size={16} />}
              onClick={reset}
            >
              Try Again
            </Button>
          )}
          <Button
            variant="primary"
            leftIcon={<Home size={16} />}
            onClick={() => navigate("/")}
          >
            Home
          </Button>
        </div>
      </motion.div>
    </div>
  );
};
