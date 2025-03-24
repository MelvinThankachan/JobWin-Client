import SignupPageContent from "@/components/signup-page-content";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SignupPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Tabs defaultValue="candidate" className="w-[500px]">
        <TabsList>
          <TabsTrigger value="candidate">Job Seeker</TabsTrigger>
          <TabsTrigger value="employer">Employer</TabsTrigger>
        </TabsList>
        <TabsContent value="candidate">
          <SignupPageContent />
        </TabsContent>
        <TabsContent value="employer">
          <SignupPageContent />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SignupPage;
