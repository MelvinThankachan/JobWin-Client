import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "@/stores/authStore";

const ProtectedRoute = () => {
  const user = useAuthStore((state) => state.user);
  const tokens = useAuthStore((state) => state.tokens);

  if (!user || !tokens) {
    return <Navigate to="/auth/login" replace />;
  }

  if (user && !user.is_verified) {
    return <Navigate to="/auth/otp" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
