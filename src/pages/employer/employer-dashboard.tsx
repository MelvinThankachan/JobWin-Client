import { H1, H2, P } from "@/components/ui/typography";
import useAuthStore from "@/stores/authStore";
import useEmployerStore from "@/stores/employerStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, Users, LineChart, AlertTriangle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const EmployerDashboard = () => {
  const user = useAuthStore((state) => state.user);
  const userEmail = user?.email;
  const navigate = useNavigate();
  
  const { fetchProfile, isProfileComplete } = useEmployerStore();
  
  // Fetch employer profile on component mount
  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);
  
  const profileCompleted = isProfileComplete();

  return (
    <div className="space-y-6">
      <H1 className="text-2xl font-bold text-primary mb-4">Employer Dashboard</H1>
      <P className="text-gray-600">
        Welcome back, {userEmail || "Employer"}! Here's your recruitment
        overview.
      </P>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
            <Briefcase className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              Job postings currently active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Applicants
            </CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              Candidates who applied
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Engagement</CardTitle>
            <LineChart className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0%</div>
            <p className="text-xs text-muted-foreground">
              Average job view-to-apply rate
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <H2 className="text-xl font-semibold mb-4">Recent Applications</H2>
        <Card>
          <CardContent className="p-6">
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">
                No applications yet. Post a job to start receiving applications.
              </p>
              {!profileCompleted && (
                <Alert className="mb-4 border-amber-500 bg-amber-50">
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                  <AlertDescription className="text-amber-700 ml-2">
                    Please complete your company profile before posting jobs.
                    <Button 
                      variant="link" 
                      className="text-amber-700 font-medium p-0 ml-1 underline"
                      onClick={() => navigate("/employer/profile")}
                    >
                      Complete Profile
                    </Button>
                  </AlertDescription>
                </Alert>
              )}
              <Button disabled={!profileCompleted}>
                Post a Job
                {!profileCompleted && (
                  <span className="ml-2 text-xs">(Requires complete profile)</span>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmployerDashboard;
