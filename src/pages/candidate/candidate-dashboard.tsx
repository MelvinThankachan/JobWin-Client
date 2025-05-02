import { H2, P } from "@/components/ui/typography";
import useAuthStore from "@/stores/authStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BriefcaseBusiness,
  Building2,
  FileSearch,
  AlertTriangle,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const CandidateDashboard = () => {
  const user = useAuthStore((state) => state.user);
  const userEmail = user?.email;
  const isActive = user?.is_active;

  return (
    <div className="space-y-6">
      <P className="text-gray-600">
        Welcome back, {userEmail || "Candidate"}! Here's your job search
        overview.
      </P>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Applied Jobs</CardTitle>
            <FileSearch className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              Applications submitted
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Saved Jobs</CardTitle>
            <BriefcaseBusiness className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              Jobs saved for later
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Companies Following
            </CardTitle>
            <Building2 className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              Companies you're tracking
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <H2 className="text-xl font-semibold mb-4">Recommended Jobs</H2>
        <Card>
          <CardContent className="p-6">
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">
                No job recommendations yet. Complete your profile to get
                personalized recommendations.
              </p>
              {!isActive && (
                <Alert className="mb-4 border-amber-500 bg-amber-50">
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                  <AlertDescription className="text-amber-700 ml-2">
                    Your account is pending activation by an administrator. Some
                    features are limited until activation.
                  </AlertDescription>
                </Alert>
              )}
              <Button disabled={!isActive}>
                Apply Jobs
                {!isActive && (
                  <span className="ml-2 text-xs">(Requires activation)</span>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CandidateDashboard;
