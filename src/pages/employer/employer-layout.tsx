import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuthStore from "@/stores/authStore";
import NavBar from "@/components/nav-bar";

const EmployerLayout = () => {
  const user = useAuthStore((state) => state.user);
  const location = useLocation();

  if (!user || user.role !== "employer") {
    return (
      <Navigate
        to="/auth/login"
        state={{
          from: location,
          error: "You are not authorized to access this page.",
        }}
        replace
      />
    );
  }
  if (!user.is_verified) {
    return <Navigate to="/auth/otp" replace />;
  }

  return (
    <div className="flex flex-col min-h-screen w-full">
      <NavBar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          {/* Page content will be rendered here */}
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default EmployerLayout;
