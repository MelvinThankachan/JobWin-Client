import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuthStore from "@/stores/authStore";

export default function WinAdminLayout() {
  const user = useAuthStore((state) => state.user);
  const location = useLocation();

  if (!user || user.role !== "winadmin") {
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
  if (!user.isVerified) {
    // Redirect to verification page
    return <Navigate to="/auth/otp" replace />;
  }

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}
