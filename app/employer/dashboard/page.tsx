import ProtectedRoute from "@/components/protected-route";
import { H1 } from "@/components/ui/typography";

const dashboard = () => {
  return (
    <ProtectedRoute role="employer">
      <div className="w-screen h-screen flex items-center justify-center ">
        <H1>Employer Dashboard</H1>
      </div>
    </ProtectedRoute>
  );
};

export default dashboard;
