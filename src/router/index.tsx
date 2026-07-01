import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { ROUTES } from '../lib/constants';

// Pages
import { LoginPage } from '../pages/auth/LoginPage';
import { SignupPage } from '../pages/auth/SignupPage';
import { ForgotPasswordPage } from '../pages/auth/ForgotPasswordPage';
import { ResetPasswordPage } from '../pages/auth/ResetPasswordPage';
import { VerifyEmailPage } from '../pages/auth/VerifyEmailPage';
import { VerifyEmailSuccessPage } from '../pages/auth/VerifyEmailSuccessPage';
import { SessionExpiredPage } from '../pages/auth/SessionExpiredPage';
import { UnauthorizedPage } from '../pages/auth/UnauthorizedPage';
import { AuthLoadingScreen } from '../pages/auth/AuthLoadingScreen';
import { DashboardPage } from '../pages/DashboardPage';

// Guards
import { ProtectedRoute, GuestRoute } from '../components/auth/ProtectedRoute';

const router = createBrowserRouter([
  // ── Root redirect ─────────────────────────────────────────────────────────────
  {
    path: ROUTES.HOME,
    element: <Navigate to={ROUTES.DASHBOARD} replace />,
  },

  // ── Guest-only routes (redirect to dashboard if authenticated) ────────────────
  {
    path: ROUTES.LOGIN,
    element: (
      <GuestRoute>
        <LoginPage />
      </GuestRoute>
    ),
  },
  {
    path: ROUTES.SIGNUP,
    element: (
      <GuestRoute>
        <SignupPage />
      </GuestRoute>
    ),
  },
  {
    path: ROUTES.FORGOT_PASSWORD,
    element: (
      <GuestRoute>
        <ForgotPasswordPage />
      </GuestRoute>
    ),
  },
  {
    path: ROUTES.RESET_PASSWORD,
    element: <ResetPasswordPage />,
  },

  // ── Email verification (accessible to all) ────────────────────────────────────
  {
    path: ROUTES.VERIFY_EMAIL,
    element: <VerifyEmailPage />,
  },
  {
    path: ROUTES.VERIFY_EMAIL_SUCCESS,
    element: <VerifyEmailSuccessPage />,
  },

  // ── Error / info pages ────────────────────────────────────────────────────────
  {
    path: ROUTES.SESSION_EXPIRED,
    element: <SessionExpiredPage />,
  },
  {
    path: ROUTES.UNAUTHORIZED,
    element: <UnauthorizedPage />,
  },

  // ── Protected routes (require authentication) ─────────────────────────────────
  {
    path: ROUTES.DASHBOARD,
    element: (
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    ),
  },
  {
    path: ROUTES.PROFILE,
    element: (
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    ),
  },

  // ── Auth loading (for debugging) ──────────────────────────────────────────────
  {
    path: '/loading',
    element: <AuthLoadingScreen />,
  },

  // ── 404 fallback ──────────────────────────────────────────────────────────────
  {
    path: '*',
    element: <Navigate to={ROUTES.LOGIN} replace />,
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
