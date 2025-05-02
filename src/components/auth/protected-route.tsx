import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "@/stores/authStore";

/**
 * ProtectedRoute component that checks if the user is authenticated and verified.
 * If not, redirects to the login page or OTP page as appropriate.
 * Uses a simplified approach to avoid infinite loops.
 */
const ProtectedRoute = () => {
  // Get user and tokens directly from store using selectors
  const user = useAuthStore((state) => state.user);
  const tokens = useAuthStore((state) => state.tokens);
  
  // If no user or no tokens, redirect to login
  if (!user || !tokens) {
    return <Navigate to="/auth/login" replace />;
  }
  
  // If user exists but is not verified, redirect to OTP page
  if (user && !user.is_verified) {
    return <Navigate to="/auth/otp" replace />;
  }
  
  // User is authenticated and verified, render the protected content
  return <Outlet />;
};

export default ProtectedRoute;
