/**
 * TruChek — 404 Not Found Page
 */

import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Home, ArrowLeft, Search } from "lucide-react";
import { TruChekLogo } from "@/components/common/TruChekLogo";
import { Button } from "@/components/ui/Button";
import { fadeInUpVariants } from "@/lib/animations";

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#09090e] flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Background decoration */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(99,102,241,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
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
          <TruChekLogo size="md" animated />
        </div>

        {/* 404 */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <span
            className="font-display font-extrabold text-[120px] leading-none select-none"
            style={{
              background: "linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(99,102,241,0.04) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              textShadow: "none",
            }}
          >
            404
          </span>
        </motion.div>

        {/* Icon */}
        <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
          <Search className="w-6 h-6 text-[#6366f1]" />
        </div>

        {/* Content */}
        <h1 className="font-display text-2xl font-bold text-[#f1f5f9] mb-3 tracking-tight">
          Page not found
        </h1>
        <p className="text-[#94a3b8] text-base leading-relaxed mb-8 max-w-sm">
          The page you're looking for doesn't exist or has been moved.
          Let's get you back on track.
        </p>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            leftIcon={<ArrowLeft size={16} />}
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>
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
