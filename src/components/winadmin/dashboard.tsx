import { useState, useEffect } from "react";
import { fetchUserCounts } from "@/services/adminService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Briefcase, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

const WinAdminDashboard = () => {
  const [counts, setCounts] = useState<{
    candidateCount: number;
    employerCount: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCounts = async () => {
      try {
        setLoading(true);
        const data = await fetchUserCounts();
        setCounts(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching user counts:", err);
        setError("Failed to load dashboard data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadCounts();
  }, []);

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="text-5xl mb-6">Dashboard</div>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : error ? (
        <div className="text-destructive text-center p-4">{error}</div>
      ) : (
        <div className="grid auto-rows-min gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Link to="/winadmin/candidates">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">
                  Total Candidates
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {counts?.candidateCount || 0}
                </div>
                <p className="text-xs text-muted-foreground">
                  Registered job seekers
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/winadmin/employers">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">
                  Total Employers
                </CardTitle>
                <Briefcase className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {counts?.employerCount || 0}
                </div>
                <p className="text-xs text-muted-foreground">
                  Registered companies
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      )}

      <div className="min-h-[40vh] flex-1 rounded-xl bg-muted/20 md:min-h-min p-6">
        <h2 className="text-xl font-medium mb-4">Recent Activity</h2>
        <p className="text-muted-foreground">
          No recent activities to display.
        </p>
      </div>
    </div>
  );
};

export default WinAdminDashboard;
