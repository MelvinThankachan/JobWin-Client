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
      if (!tokens || !user) {
        setIsAuthenticated(false);
        setIsValidating(false);
        return;
      }

      try {
        await axiosInstance.get("/auth/validate-token/");
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setIsValidating(false);
      }
    };

    validateAuth();
  }, [tokens, user]);

  if (isValidating) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    const from = location.state?.from?.pathname || "/";
    return <Navigate to={from} replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
