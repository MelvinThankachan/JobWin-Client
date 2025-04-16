import JobWinLogo from "@/components/job-win-logo";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, Outlet } from "react-router-dom";

const AuthPageLayout = () => {
  return (
    <div className="flex flex-col items-center justify-center pt-10 p-5 gap-10 min-h-dvh">
      <Link to="/">
        <JobWinLogo />
      </Link>
      {/* <Tabs defaultValue="candidate" className="w-full max-w-lg">
        <TabsList>
          <TabsTrigger value="candidate">Job Seeker</TabsTrigger>
          <TabsTrigger value="employer">Employer</TabsTrigger>
        </TabsList>
        <TabsContent value="candidate">
          <Outlet />
        </TabsContent>
        <TabsContent value="employer">
          <Outlet />
        </TabsContent>
      </Tabs> */}
      <div className="w-full max-w-lg min-h-[75vh] flex items-center">
        <div className="flex-1 items-center">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthPageLayout;
