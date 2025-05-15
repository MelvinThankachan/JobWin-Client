import {
  Navigate,
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import React from "react";
import WinAdminDashboard from "./components/winadmin/dashboard";
import WinAdminCandidates from "./components/winadmin/candidates";
import WinAdminEmployers from "./components/winadmin/employers";
import WinAdminLayout from "./components/winadmin/layout";
import { ThemeProvider } from "@/components/theme-provider";
import DarkModeToggle from "./components/dark-mode-toggle";
import Error404Page from "./pages/public/error-404-page";
import AuthPageLayout from "./pages/auth/auth-page-layout";
import LoginPage from "./pages/auth/login-page";
import SignupPage from "./pages/auth/signup-page";
import CandidateLayout from "./pages/candidate/candidate-layout";
import CandidateDashboard from "./pages/candidate/candidate-dashboard";
import EmployerLayout from "./pages/employer/employer-layout";
import EmployerDashboard from "./pages/employer/employer-dashboard";
const EmployerProfile = React.lazy(() => import("./pages/employer/employer-profile"));
import OTPPage from "./pages/auth/otp-page";
import PublicPageLayout from "./pages/public/public-page-layout";
import LandingPage from "./pages/public/landing-page";
import { Toaster } from "./components/ui/sonner";
import AuthGuard from "./components/auth/auth-guard";
import AuthInitializer from "./components/auth/auth-initializer";
import AdminLoginPage from "./pages/admin/admin-login";
import UserDetailPage from "./pages/admin/user-detail";
import SocialAuthPage from "./pages/auth/social-auth-page";

const router = createBrowserRouter([
  {
    path: "/social-auth/callback/:provider",
    element: <SocialAuthPage />,
  },
  {
    path: "/",
    element: (
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div>
          <AuthInitializer />
          <div className="fixed right-5 bottom-5 z-10">
            <DarkModeToggle />
          </div>
          <Toaster position="top-right" />
          <Outlet />
        </div>
      </ThemeProvider>
    ),
    children: [
      {
        element: <PublicPageLayout />,
        children: [
          {
            index: true,
            element: (
              <AuthGuard requireAuth={false}>
                <LandingPage />
              </AuthGuard>
            ),
          },
        ],
      },
      {
        path: "auth",
        element: <AuthPageLayout />,
        children: [
          { index: true, element: <Navigate to="/auth/login" replace /> },
          {
            path: "login",
            element: (
              <AuthGuard requireAuth={false}>
                <LoginPage />
              </AuthGuard>
            ),
          },
          {
            path: "signup",
            element: (
              <AuthGuard requireAuth={false}>
                <SignupPage />
              </AuthGuard>
            ),
          },
          { path: "otp", element: <OTPPage /> },
        ],
      },
      {
        path: "candidate",
        element: (
          <AuthGuard requireAuth={true} allowedRoles={["candidate"]}>
            <CandidateLayout />
          </AuthGuard>
        ),
        children: [
          {
            index: true,
            element: <Navigate to="/candidate/dashboard" replace />,
          },
          { path: "dashboard", element: <CandidateDashboard /> },
        ],
      },
      {
        path: "employer",
        element: (
          <AuthGuard requireAuth={true} allowedRoles={["employer"]}>
            <EmployerLayout />
          </AuthGuard>
        ),
        children: [
          {
            index: true,
            element: <Navigate to="/employer/dashboard" replace />,
          },
          { path: "dashboard", element: <EmployerDashboard /> },
          { path: "profile", element: <EmployerProfile /> },
        ],
      },
      {
        path: "winadmin/login",
        element: (
          <AuthGuard requireAuth={false}>
            <AdminLoginPage />
          </AuthGuard>
        ),
      },
      {
        path: "winadmin",
        element: (
          <AuthGuard requireAuth={true} allowedRoles={["admin"]}>
            <WinAdminLayout />
          </AuthGuard>
        ),
        children: [
          {
            index: true,
            element: <Navigate to="/winadmin/dashboard" replace />,
          },
          { path: "dashboard", element: <WinAdminDashboard /> },
          { path: "candidates", element: <WinAdminCandidates /> },
          { path: "employers", element: <WinAdminEmployers /> },
          { path: "user/:userId", element: <UserDetailPage /> },
        ],
      },
      { path: "*", element: <Error404Page /> },
    ],
  },
]);

const App = () => <RouterProvider router={router} />;

export default App;
