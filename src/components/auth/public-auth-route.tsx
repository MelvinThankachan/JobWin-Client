import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "@/stores/authStore";

/**
 * PublicAuthRoute component that only allows unauthenticated users to access auth pages.
 * If a user is already authenticated, they will be redirected to the appropriate dashboard based on their role.
 * Uses a simplified approach to avoid infinite loops.
 */
const PublicAuthRoute = () => {
  // Get user and tokens directly from store using selectors
  const user = useAuthStore((state) => state.user);
  const tokens = useAuthStore((state) => state.tokens);
  
  // Check if user is authenticated (both user and tokens exist)
  const isAuthenticated = !!user && !!tokens;
  
  // If user is authenticated, redirect to appropriate dashboard
  if (isAuthenticated) {
    let redirectPath = "/";
    
    if (user?.role === "candidate") {
      redirectPath = "/candidate/dashboard";
    } else if (user?.role === "employer") {
      redirectPath = "/employer/dashboard";
    } else if (user?.role === "admin") {
      redirectPath = "/winadmin/dashboard";
    }
    
    return <Navigate to={redirectPath} replace />;
  }
  
  // User is not authenticated, allow access to public auth pages
  return <Outlet />;
};

export default PublicAuthRoute;
