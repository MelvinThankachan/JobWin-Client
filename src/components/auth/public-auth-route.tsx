import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "@/stores/authStore";

const PublicAuthRoute = () => {
  const user = useAuthStore((state) => state.user);
  const tokens = useAuthStore((state) => state.tokens);
  const isAuthenticated = !!user && !!tokens;

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

  return <Outlet />;
};

export default PublicAuthRoute;
