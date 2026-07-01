/**
 * TruChek — Application Router
 * Scalable routing with lazy loading, guards, and error boundaries
 */

import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";

// ---- Lazy-loaded pages (future phases) ----
// const DashboardPage = lazy(() => import("@/pages/app/DashboardPage"));
// const ScanPage      = lazy(() => import("@/pages/app/ScanPage"));
// const ResultPage    = lazy(() => import("@/pages/app/ResultPage"));
// const HistoryPage   = lazy(() => import("@/pages/app/HistoryPage"));
// const LoginPage     = lazy(() => import("@/pages/auth/LoginPage"));
// const RegisterPage  = lazy(() => import("@/pages/auth/RegisterPage"));

// ---- Foundation pages ----
import { FoundationPage } from "@/pages/FoundationPage";
import { NotFoundPage }   from "@/pages/error/NotFoundPage";
import { ErrorPage }      from "@/pages/error/ErrorPage";
import { LoadingPage }    from "@/pages/LoadingPage";

// ---- Route guards (future) ----
// import { ProtectedRoute } from "./guards/ProtectedRoute";
// import { AdminRoute }     from "./guards/AdminRoute";
// import { GuestOnlyRoute } from "./guards/GuestOnlyRoute";

export const AppRouter: React.FC = () => {
  return (
    <Suspense fallback={<LoadingPage />}>
      <Routes>
        {/* ---- Foundation (Phase 1) ---- */}
        <Route path="/" element={<FoundationPage />} />

        {/* ---- Auth Routes (Phase 2 — placeholder) ---- */}
        <Route path="/auth/*" element={<Navigate to="/" replace />} />

        {/* ---- App Routes (Phase 3+) ---- */}
        <Route path="/app/*" element={<Navigate to="/" replace />} />

        {/* ---- Admin Routes (Phase 4+) ---- */}
        <Route path="/admin/*" element={<Navigate to="/" replace />} />

        {/* ---- Error Routes ---- */}
        <Route path={ROUTES.ERROR.NOT_FOUND}   element={<NotFoundPage />} />
        <Route path={ROUTES.ERROR.SERVER_ERROR} element={<ErrorPage />} />

        {/* ---- 404 Catch-all ---- */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};
