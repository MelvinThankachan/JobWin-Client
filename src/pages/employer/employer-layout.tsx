import { H1 } from "@/components/ui/typography";
import { Outlet } from "react-router-dom";

const EmployerLayout = () => {
  return (
    <div className="flex flex-col gap-10 items-center justify-center h-screen w-screen">
        <H1>Employer Layout</H1>
      <Outlet />
    </div>
  );
};

export default EmployerLayout;
