import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuthStore from "@/stores/authStore";

// Define the possible roles in the application
export type UserRole = "candidate" | "employer" | "admin";

// Define the props for the AuthGuard component
type AuthGuardProps = {
  children: ReactNode;
  // If requireAuth is true, user must be authenticated to access the route
  requireAuth: boolean;
  // If allowedRoles is provided, user must have one of these roles to access the route
  allowedRoles?: UserRole[];
};

/**
 * AuthGuard - A unified component for handling authentication and authorization
 * 
 * This component handles three scenarios:
 * 1. Public routes that should redirect authenticated users (like login/signup pages)
 * 2. Protected routes that require authentication (like dashboards)
 * 3. Role-based routes that require specific user roles (like admin pages)
 */
const AuthGuard = ({ children, requireAuth, allowedRoles }: AuthGuardProps) => {
  const location = useLocation();
  const user = useAuthStore((state) => state.user);
  const tokens = useAuthStore((state) => state.tokens);
  
  // Determine if user is authenticated
  const isAuthenticated = !!user && !!tokens;
  
  // Handle loading state - can be expanded if needed
  // const isLoading = useAuthStore((state) => state.isLoading);
  // if (isLoading) {
  //   return <div className="flex items-center justify-center h-screen">
  //     <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  //   </div>;
  // }
  
  // CASE 1: Route requires authentication but user is not authenticated
  if (requireAuth && !isAuthenticated) {
    // Redirect to login page and save the location they were trying to access
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }
  
  // CASE 2: Route requires authentication and specific roles
  if (requireAuth && isAuthenticated && allowedRoles && allowedRoles.length > 0) {
    // Check if user has the required role
    const hasRequiredRole = user && allowedRoles.includes(user.role as UserRole);
    
    if (!hasRequiredRole) {
      // If user doesn't have required role, redirect to their dashboard
      if (user?.role === "candidate") {
        return <Navigate to="/candidate/dashboard" replace />;
      } else if (user?.role === "employer") {
        return <Navigate to="/employer/dashboard" replace />;
      } else if (user?.role === "admin") {
        return <Navigate to="/winadmin/dashboard" replace />;
      }
      
      // Fallback to home page if role is unknown
      return <Navigate to="/" replace />;
    }
  }
  
  // CASE 3: Route is for non-authenticated users (like login) but user is authenticated
  if (!requireAuth && isAuthenticated) {
    // Redirect authenticated users to their dashboard based on role
    if (user?.role === "candidate") {
      return <Navigate to="/candidate/dashboard" replace />;
    } else if (user?.role === "employer") {
      return <Navigate to="/employer/dashboard" replace />;
    } else if (user?.role === "admin") {
      return <Navigate to="/winadmin/dashboard" replace />;
    }
    
    // Fallback to home page if role is unknown
    return <Navigate to="/" replace />;
  }
  
  // CASE 4: User is not verified but trying to access protected routes
  // Special case for OTP page - don't redirect if we're already on the OTP page
  if (requireAuth && isAuthenticated && user && !user.is_verified && !location.pathname.includes('/auth/otp')) {
    // Redirect to OTP verification page
    return <Navigate to="/auth/otp" replace />;
  }
  
  // If all checks pass, render the children
  return <>{children}</>;
};

export default AuthGuard;
