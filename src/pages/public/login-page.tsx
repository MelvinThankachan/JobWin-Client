import LoginPageContent from "@/components/login-page-content";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const LoginPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Tabs defaultValue="candidate" className="w-[500px]">
        <TabsList>
          <TabsTrigger value="candidate">Job Seeker</TabsTrigger>
          <TabsTrigger value="employer">Employer</TabsTrigger>
        </TabsList>
        <TabsContent value="candidate">
          <LoginPageContent />
        </TabsContent>
        <TabsContent value="employer">
          <LoginPageContent />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LoginPage;
