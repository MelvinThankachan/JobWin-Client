import { H1 } from "@/components/ui/typography";
import { Outlet } from "react-router-dom";

const CandidateLayout = () => {
  return (
    <div className="flex flex-col gap-10 items-center justify-center h-screen w-screen">
        <H1>Candidate Layout</H1>
      <Outlet />
    </div>
  );
};

export default CandidateLayout;
