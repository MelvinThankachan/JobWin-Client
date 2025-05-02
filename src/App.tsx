import {
  Navigate,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
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
import OTPPage from "./pages/auth/otp-page";
import PublicPageLayout from "./pages/public/public-page-layout";
import LandingPage from "./pages/public/landing-page";
import { Toaster } from "./components/ui/sonner";
import AuthGuard from "./components/auth/auth-guard";
import AdminLoginPage from "./pages/admin/admin-login";
import UserDetailPage from "./pages/admin/user-detail";

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div>
        <div className="fixed right-5 bottom-5 z-10">
          <DarkModeToggle />
        </div>
        <Toaster position="top-right" />
        <BrowserRouter>
          <Routes>
            {/* Public Pages */}
            <Route path="/" element={<PublicPageLayout />}>
              <Route index element={
                <AuthGuard requireAuth={false}>
                  <LandingPage />
                </AuthGuard>
              } />
            </Route>

            {/* Auth Pages - Only accessible to non-authenticated users */}
            <Route path="/auth" element={<AuthPageLayout />}>
              <Route index element={<Navigate to="/auth/login" replace />} />
              <Route path="login" element={
                <AuthGuard requireAuth={false}>
                  <LoginPage />
                </AuthGuard>
              } />
              <Route path="signup" element={
                <AuthGuard requireAuth={false}>
                  <SignupPage />
                </AuthGuard>
              } />
              <Route path="otp" element={<OTPPage />} />
            </Route>

            {/* Candidate Pages - Protected routes requiring authentication */}
            <Route path="/candidate" element={
              <AuthGuard requireAuth={true} allowedRoles={["candidate"]}>
                <CandidateLayout />
              </AuthGuard>
            }>
              <Route index element={<Navigate to="/candidate/dashboard" replace />} />
              <Route path="dashboard" element={<CandidateDashboard />} />
            </Route>

            {/* Employer Pages - Protected routes requiring authentication */}
            <Route path="/employer" element={
              <AuthGuard requireAuth={true} allowedRoles={["employer"]}>
                <EmployerLayout />
              </AuthGuard>
            }>
              <Route index element={<Navigate to="/employer/dashboard" replace />} />
              <Route path="dashboard" element={<EmployerDashboard />} />
            </Route>

            {/* Admin Login Page - Separate from regular login */}
            <Route path="/winadmin/login" element={
              <AuthGuard requireAuth={false}>
                <AdminLoginPage />
              </AuthGuard>
            } />

            {/* WinAdmin Pages - Protected routes requiring authentication */}
            <Route path="/winadmin" element={
              <AuthGuard requireAuth={true} allowedRoles={["admin"]}>
                <WinAdminLayout />
              </AuthGuard>
            }>
              <Route index element={<Navigate to="/winadmin/dashboard" replace />} />
              <Route path="dashboard" element={<WinAdminDashboard />} />
              <Route path="candidates" element={<WinAdminCandidates />} />
              <Route path="employers" element={<WinAdminEmployers />} />
              <Route path="user/:userId" element={<UserDetailPage />} />
            </Route>

            {/* 404 Page */}
            <Route path="*" element={<Error404Page />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
};

export default App;
