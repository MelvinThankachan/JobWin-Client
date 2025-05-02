// import { Separator } from "@/components/ui/separator";
// import { SidebarTrigger } from "@/components/ui/sidebar";

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import useAuthStore from "@/stores/authStore";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function SiteHeader() {
  const removeUser = useAuthStore((state) => state.removeUser);
  const navigate = useNavigate();

  const handleLogout = async () => {
    removeUser();
    toast.success("Logged out successfully");
    navigate("/winadmin/login");
  };
  return (
    <header className="flex h-24 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-24">
      <div className="flex w-full items-center justify-between gap-1 px-4 lg:gap-2 lg:px-6">
        {/* <SidebarTrigger className="-ml-1" /> */}
        {/* <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        /> */}
        <h1 className="text-2xl font-medium">WinAdmin</h1>
        <Button
          size="lg"
          variant="destructive"
          className="flex gap-2 items-center"
          onClick={handleLogout}
        >
          <LogOut size={18} />
          Logout
        </Button>
      </div>
    </header>
  );
}
