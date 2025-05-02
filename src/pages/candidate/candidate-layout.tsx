import { H1 } from "@/components/ui/typography";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuthStore from "@/stores/authStore";
import NavBar from "@/components/nav-bar";

const CandidateLayout = () => {
  // Use a memoized selector to avoid unnecessary re-renders
  const user = useAuthStore((state) => state.user);
  const location = useLocation();

  if (!user || user.role !== "candidate") {
    // Redirect to login and save current location in state
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
  // if (!user.isVerified) {
  //   // Redirect to verification page
  //   return <Navigate to="/auth/otp" replace />;
  // }
  return (
    <div className="flex flex-col min-h-screen w-full">
      <NavBar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <H1 className="text-2xl font-bold text-primary mb-6">Candidate Dashboard</H1>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default CandidateLayout;
