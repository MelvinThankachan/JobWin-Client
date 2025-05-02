import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuthStore from "@/stores/authStore";
import axiosInstance from "@/lib/axiosInstance";

const PublicRoute = () => {
  const { user, tokens } = useAuthStore((state) => ({
    user: state.user,
    tokens: state.tokens,
  }));
  const location = useLocation();
  const [isValidating, setIsValidating] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const validateAuth = async () => {
      // If no tokens or user, not authenticated
      if (!tokens || !user) {
        setIsAuthenticated(false);
        setIsValidating(false);
        return;
      }

      try {
        // Validate token by making a request to a protected endpoint
        await axiosInstance.get("/auth/validate-token/");
        setIsAuthenticated(true);
      } catch (error) {
        // If validation fails, token might be invalid despite refresh attempts
        setIsAuthenticated(false);
      } finally {
        setIsValidating(false);
      }
    };

    validateAuth();
  }, [tokens, user]);

  // Show loading or spinner while validating
  if (isValidating) {
    return <div>Loading...</div>; // You can replace with a proper loading component
  }

  // If user is authenticated, redirect to last page or home
  if (isAuthenticated) {
    // Check if location.state?.from exists, else fallback to "/"
    const from = location.state?.from?.pathname || "/";
    return <Navigate to={from} replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
