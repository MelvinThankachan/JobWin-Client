import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuthStore from "@/stores/authStore";


export type UserRole = "candidate" | "employer" | "admin";


type AuthGuardProps = {
  children: ReactNode;

  requireAuth: boolean;

  allowedRoles?: UserRole[];
};


const AuthGuard = ({ children, requireAuth, allowedRoles }: AuthGuardProps) => {
  const location = useLocation();
  const user = useAuthStore((state) => state.user);
  const tokens = useAuthStore((state) => state.tokens);
  
  // Check authentication directly from localStorage as a fallback
  let authFromStorage = false;
  try {
    const authStorage = localStorage.getItem('auth-storage');
    if (authStorage) {
      const parsedStorage = JSON.parse(authStorage);
      const storedUser = parsedStorage?.state?.user;
      const storedTokens = parsedStorage?.state?.tokens;
      authFromStorage = !!storedUser && !!storedTokens && !!storedTokens.access && !!storedTokens.refresh;
    }
  } catch (e) {
    console.error('Error reading auth from localStorage:', e);
  }
  
  // Check if user is authenticated with valid tokens
  const isAuthenticated = (!!user && !!tokens && !!tokens.access && !!tokens.refresh) || authFromStorage;
  
  // Log authentication state for debugging
  console.log("AuthGuard - Authentication state:", { 
    isAuthenticated, 
    hasUser: !!user, 
    hasTokens: !!tokens,
    authFromStorage,
    path: location.pathname 
  });
  
  // Handle loading state - can be expanded if needed
  // const isLoading = useAuthStore((state) => state.isLoading);
  // if (isLoading) {
  //   return <div className="flex items-center justify-center h-screen">
  //     <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  //   </div>;
  // }
  

  if (requireAuth && !isAuthenticated) {

    if (location.pathname.startsWith('/winadmin')) {

      return <Navigate to="/winadmin/login" state={{ from: location }} replace />;
    }

    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }
  

  if (requireAuth && isAuthenticated && allowedRoles && allowedRoles.length > 0) {

    const hasRequiredRole = user && allowedRoles.includes(user.role as UserRole);
    
    if (!hasRequiredRole) {

      if (user?.role === "candidate") {
        return <Navigate to="/candidate/dashboard" replace />;
      } else if (user?.role === "employer") {
        return <Navigate to="/employer/dashboard" replace />;
      } else if (user?.role === "admin") {
        return <Navigate to="/winadmin/dashboard" replace />;
      }
      

      return <Navigate to="/" replace />;
    }
  }
  

  if (!requireAuth && isAuthenticated) {

    if (user?.role === "candidate") {
      return <Navigate to="/candidate/dashboard" replace />;
    } else if (user?.role === "employer") {
      return <Navigate to="/employer/dashboard" replace />;
    } else if (user?.role === "admin") {
      return <Navigate to="/winadmin/dashboard" replace />;
    }
    
    return <Navigate to="/" replace />;
  }
  


  if (requireAuth && isAuthenticated && user && !user.is_verified && !location.pathname.includes('/auth/otp')) {

    return <Navigate to="/auth/otp" replace />;
  }
  

  return <>{children}</>;
};

export default AuthGuard;
