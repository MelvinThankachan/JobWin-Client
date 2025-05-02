import { Link, useLocation, useNavigate } from "react-router-dom";
import GoogleAuthButton from "@/components/auth/google-auth-button";
import LoginForm from "@/components/auth/login-form";
import { H2 } from "@/components/ui/typography";
import { useEffect } from "react";
import { toast } from "sonner";

const LoginPage = () => {
  const location = useLocation();
  const error = location.state?.error;
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      toast.error(error);

      navigate(location.pathname, {
        replace: true,
        state: { ...location.state, error: undefined },
      });
    }
  }, [error, location.pathname, location.state, navigate]);

  return (
    <div className="flex flex-col gap-10">
      <H2 className="text-center">Welcome Back, Dude</H2>

      <GoogleAuthButton />

      <LoginForm />

      <div className="mt-4 text-foreground/50">
        Don&apos;t have an account?
        <span className="text-primary hover:underline">
          <Link to="/auth/signup">Sign up</Link>
        </span>
      </div>
    </div>
  );
};

export default LoginPage;
