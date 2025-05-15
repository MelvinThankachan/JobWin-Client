import { H1, P } from "@/components/ui/typography";
import AdminLoginForm from "@/components/auth/admin-login-form";
import { Card, CardContent } from "@/components/ui/card";
import JobWinLogo from "@/components/job-win-logo";
import { Link } from "react-router-dom";

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 md:p-8">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center space-y-2 text-center mb-8">
            <Link to="/">
              <JobWinLogo />
            </Link>
            <H1 className="text-2xl font-bold">Admin Login</H1>
            <P className="text-sm text-muted-foreground">
              Sign in to access the admin dashboard
            </P>
          </div>

          <AdminLoginForm />
        </CardContent>
      </Card>
    </div>
  );
}
