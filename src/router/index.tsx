import { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { DashboardLayout } from "../components/layout/DashboardLayout";
import { useAuth } from "../contexts/AuthContext";


// Lazy loaded pages
const DashboardPage = lazy(() =>
  import("../pages/DashboardPage").then((m) => ({ default: m.DashboardPage }))
);
const LoginPage = lazy(() =>
  import("../pages/auth/LoginPage").then((m) => ({ default: m.LoginPage }))
);
const PlaceholderPage = lazy(() =>
  import("../pages/PlaceholderPage").then((m) => ({ default: m.PlaceholderPage }))
);
const NotFoundPage = lazy(() =>
  import("../pages/NotFoundPage").then((m) => ({ default: m.NotFoundPage }))
);

function PageLoader() {
  return (
    <div className="p-6 space-y-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="h-32 rounded-2xl dark:bg-slate-800/40 bg-slate-200/40 animate-pulse" />
      ))}
    </div>
  );
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
}

function SuspenseWrapper({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<PageLoader />}>{children}</Suspense>;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: "/login",
    element: (
      <SuspenseWrapper>
        <PublicRoute>
          <LoginPage />
        </PublicRoute>
      </SuspenseWrapper>
    ),
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "dashboard",
        element: (
          <SuspenseWrapper>
            <DashboardPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: "scan",
        element: (
          <SuspenseWrapper>
            <PlaceholderPage page="scan" />
          </SuspenseWrapper>
        ),
      },
      {
        path: "history",
        element: (
          <SuspenseWrapper>
            <PlaceholderPage page="history" />
          </SuspenseWrapper>
        ),
      },
      {
        path: "community",
        element: (
          <SuspenseWrapper>
            <PlaceholderPage page="community" />
          </SuspenseWrapper>
        ),
      },
      {
        path: "notifications",
        element: (
          <SuspenseWrapper>
            <PlaceholderPage page="notifications" />
          </SuspenseWrapper>
        ),
      },
      {
        path: "bookmarks",
        element: (
          <SuspenseWrapper>
            <PlaceholderPage page="bookmarks" />
          </SuspenseWrapper>
        ),
      },
      {
        path: "profile",
        element: (
          <SuspenseWrapper>
            <PlaceholderPage page="profile" />
          </SuspenseWrapper>
        ),
      },
      {
        path: "settings",
        element: (
          <SuspenseWrapper>
            <PlaceholderPage page="settings" />
          </SuspenseWrapper>
        ),
      },
      {
        path: "help",
        element: (
          <SuspenseWrapper>
            <PlaceholderPage page="help" />
          </SuspenseWrapper>
        ),
      },
    ],
  },
  {
    path: "*",
    element: (
      <SuspenseWrapper>
        <NotFoundPage />
      </SuspenseWrapper>
    ),
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
