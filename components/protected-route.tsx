"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface ProtectedRouteProps {
  children: React.ReactNode;
  role: "candidate" | "employer";
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, role }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const user = localStorage.getItem("user");
    const storedUserRole = user ? JSON.parse(user).role : null;
    console.log(storedUserRole);

    const isValid = !!accessToken && !!user;
    setIsAuthenticated(isValid);
    setUserRole(storedUserRole);

    if (!isValid) {
      window.location.href = "/auth/login";
      //   router.push("/auth/login");
      //   setTimeout(() => {
      //     toast.error("Please login to continue.", {
      //       className: "bg-red-500 text-red",
      //       description: "Redirected to the login page.",
      //     });
      //   }, 1000);
      return;
    }

    if (role === "candidate" && userRole === "employer") {
      window.location.href = "/employer/dashboard";
      //   router.push("/candidate/dashboard");
      //   setTimeout(() => {
      //     toast.error("You are not authorized to access that page.", {
      //       description:
      //         "Please log out and log in as a candidate to access that page.",
      //     });
      //   }, 1000);
    } else if (role === "employer" && userRole === "candidate") {
      window.location.href = "/candidate/dashboard";
      //   router.push("/employer/dashboard");
      //   setTimeout(() => {
      //     toast.error("You are not authorized to access that page.", {
      //       description:
      //         "Please log out and log in as an employer to access that page.",
      //     });
      //   }, 1000);
    }
  }, [router, role]);

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
